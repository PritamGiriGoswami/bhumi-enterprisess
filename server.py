from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os


EXTENSION_MAP = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".js": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
}

CACHE_MAX_AGE = {
    ".jpg": "31536000",
    ".jpeg": "31536000",
    ".png": "31536000",
    ".gif": "31536000",
    ".webp": "31536000",
    ".svg": "31536000",
    ".ico": "31536000",
    ".js": "31536000",
    ".css": "31536000",
    ".html": "0",
    ".json": "0",
}


class CachingHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        path = self.translate_path(self.path)
        _, ext = os.path.splitext(path)
        ext = ext.lower()
        max_age = CACHE_MAX_AGE.get(ext, "0")
        self.send_header("Cache-Control", f"public, max-age={max_age}, must-revalidate")
        self.send_header("Connection", "keep-alive")
        super().end_headers()

    def guess_type(self, path):
        _, ext = os.path.splitext(path)
        return EXTENSION_MAP.get(ext.lower()) or super().guess_type(path)


HOST = "127.0.0.1"
PORT = 8000

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), CachingHTTPRequestHandler)
    print(f"Bhumi Enterprises site running at http://{HOST}:{PORT}")
    print(f"Serving with caching headers enabled")
    server.serve_forever()
