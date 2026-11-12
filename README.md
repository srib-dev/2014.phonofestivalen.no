# 2014.phonofestivalen.no

Recreation of the 2014 Phonofestivalen page, using resources from Internet Archive.

## Run locally

This is a static site (HTML, CSS, and JavaScript). No build step is required.

From the repository root, serve the files with a simple HTTP server and open the site in your browser.

### Python (built in on most systems)

```bash
cd /path/to/2014.phonofestivalen.no
python3 -m http.server 8000
```

Then visit [http://localhost:8000/](http://localhost:8000/) (homepage: `index.html`).

### Node.js

If you have Node installed:

```bash
npx --yes serve .
```

Or with `http-server`:

```bash
npx --yes http-server -p 8000
```

### Opening files directly

You can also open `index.html` in a browser via the file manager. A local server is preferable so links and assets behave like they did on the original site.
