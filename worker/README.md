# AXIA Demo OpenAI Proxy

Cloudflare Worker that proxies OpenAI Assistants API requests from the public GitHub Pages demos. The API key is stored as a Cloudflare secret and never exposed in client-side code.

## Setup

### 1. Install Wrangler

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

### 3. Deploy the Worker

```bash
cd worker
npm install
npm run deploy
```

This deploys to `https://axia-demo-proxy.<your-subdomain>.workers.dev`.

### 4. Set the API Key Secret

```bash
wrangler secret put OPENAI_API_KEY
```

Paste your new OpenAI project key when prompted.

### 5. Update Demo HTML

In both `demos/fundguard/index.html` and `demos/valley/index.html`, update the `PROXY_URL`:

```js
const PROXY_URL = 'https://axia-demo-proxy.<your-subdomain>.workers.dev';
```

Replace `<your-subdomain>` with your actual Cloudflare Workers subdomain.

## Architecture

```
Browser (GitHub Pages)  ──>  Cloudflare Worker  ──>  OpenAI API
  No API key                  Injects API key         Processes request
```

## Security

- Only requests from `https://axia-security.github.io` and localhost are allowed (CORS)
- Only specific OpenAI Assistants API paths are proxied (threads, messages, runs, files)
- The API key is stored as a Cloudflare secret, not in source code
- GET and POST methods only

## Local Development

```bash
cd worker
npx wrangler dev
```

This starts a local dev server. Set `OPENAI_API_KEY` in a `.dev.vars` file:

```
OPENAI_API_KEY=sk-proj-your-key-here
```

Never commit `.dev.vars`.
