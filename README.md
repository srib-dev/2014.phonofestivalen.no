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

## GitHub Pages

The site is published at:

- https://srib-dev.github.io/2014.phonofestivalen.no/

Pushes to `main` deploy via `.github/workflows/pages.yml`. `.nojekyll` tells GitHub not to run Jekyll.

### Custom domain

To serve the site at `2014.phonofestivalen.no`:

1. Add a `CNAME` file in the repository root containing that hostname.
2. In **Settings → Pages**, set the custom domain to `2014.phonofestivalen.no`.
3. Point DNS at GitHub Pages (A records for an apex domain, or a CNAME to `srib-dev.github.io` for a subdomain).
