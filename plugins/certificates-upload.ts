import type { IncomingMessage, ServerResponse } from "node:http";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

const ROUTE = "/__certificates";
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_BODY_BYTES = Math.ceil(MAX_FILE_BYTES * 1.4) + 64 * 1024;
const CATEGORIES = ["certificate", "award", "education", "photo"];
const FILE_TYPES: Record<string, { ext: string; matches: (b: Buffer) => boolean }> = {
  "image/jpeg": { ext: "jpg", matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  "image/png": { ext: "png", matches: (b) => b.subarray(0, 4).toString("hex") === "89504e47" },
  "image/webp": {
    ext: "webp",
    matches: (b) => b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP",
  },
  "application/pdf": { ext: "pdf", matches: (b) => b.subarray(0, 4).toString() === "%PDF" },
};

type Item = Record<string, string | undefined> & { id: string; file?: string };

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new HttpError(413, "File is too large (max 10 MB)."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const text = (value: unknown, label: string, max: number, required = false) => {
  const v = typeof value === "string" ? value.trim() : "";
  if (required && !v) throw new HttpError(400, `${label} is required.`);
  if (v.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`);
  return v || undefined;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "certificate";

/**
 * Dev-only API used by the "Add item" dialog on the Certificates page.
 * Saves uploads to public/certificates/ and records them in src/data/certificates.json
 * so they can be committed and deployed with the rest of the site.
 */
export default function certificatesUpload(): Plugin {
  let root = process.cwd();

  return {
    name: "certificates-upload",
    apply: "serve",
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      const dataFile = path.join(root, "src/data/certificates.json");
      const uploadDir = path.join(root, "public/certificates");

      const load = async (): Promise<Item[]> => JSON.parse(await readFile(dataFile, "utf8"));
      const save = (items: Item[]) => writeFile(dataFile, `${JSON.stringify(items, null, 2)}\n`);

      server.middlewares.use(ROUTE, async (req, res) => {
        try {
          const origin = req.headers.origin;
          if (origin && new URL(origin).host !== req.headers.host) {
            throw new HttpError(403, "Cross-origin requests are not allowed.");
          }

          if (req.method === "POST") {
            if (!req.headers["content-type"]?.startsWith("application/json")) {
              throw new HttpError(415, "Expected JSON.");
            }
            const body = JSON.parse(await readBody(req));
            const match = /^data:([\w/+.-]+);base64,(.+)$/s.exec(String(body.dataUrl ?? ""));
            const type = match && FILE_TYPES[match[1]];
            if (!match || !type) throw new HttpError(400, "Upload a JPG, PNG, WEBP or PDF file.");
            const bytes = Buffer.from(match[2], "base64");
            if (bytes.length > MAX_FILE_BYTES) throw new HttpError(413, "File is too large (max 10 MB).");
            if (!type.matches(bytes)) throw new HttpError(400, "The file content does not match its type.");

            const category = String(body.category);
            if (!CATEGORIES.includes(category)) throw new HttpError(400, "Choose a valid category.");
            const credentialUrl = text(body.credentialUrl, "Credential link", 300);
            if (credentialUrl && !/^https?:\/\//i.test(credentialUrl)) {
              throw new HttpError(400, "Credential link must start with http:// or https://.");
            }

            const title = text(body.title, "Title", 120, true)!;
            const id = `${slugify(title)}-${Date.now().toString(36)}`;
            const fileName = `${id}.${type.ext}`;
            await mkdir(uploadDir, { recursive: true });
            await writeFile(path.join(uploadDir, fileName), bytes);

            const item: Item = {
              id,
              title,
              issuer: text(body.issuer, "Issuer", 120, true),
              date: text(body.date, "Date", 40),
              category,
              description: text(body.description, "Description", 500),
              credentialUrl,
              file: `/certificates/${fileName}`,
            };
            const items = [item, ...(await load())];
            await save(items);
            send(res, 201, { items });
            return;
          }

          if (req.method === "DELETE") {
            const id = decodeURIComponent((req.url ?? "").replace(/^\/+/, ""));
            const items = await load();
            const item = items.find((i) => i.id === id);
            if (!item) throw new HttpError(404, "Item not found.");
            if (item.file?.startsWith("/certificates/")) {
              await unlink(path.join(uploadDir, path.basename(item.file))).catch(() => undefined);
            }
            const next = items.filter((i) => i.id !== id);
            await save(next);
            send(res, 200, { items: next });
            return;
          }

          throw new HttpError(405, "Method not allowed.");
        } catch (error) {
          const status = error instanceof HttpError ? error.status : 400;
          send(res, status, { error: error instanceof Error ? error.message : "Upload failed." });
        }
      });
    },
  };
}
