/**
 * AXIA Demo OpenAI Proxy — Cloudflare Worker
 *
 * Proxies OpenAI Assistants API requests from the public GitHub Pages demos.
 * The OpenAI API key is stored as a Cloudflare secret (never in source code).
 *
 * Allowed endpoints:
 *   POST   /v1/threads
 *   POST   /v1/threads/:id/messages
 *   POST   /v1/threads/:id/runs
 *   GET    /v1/threads/:id/runs/:runId
 *   GET    /v1/threads/:id/messages
 *   POST   /v1/files
 */

const ALLOWED_ORIGINS = [
  'https://axia-security.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

// Match allowed OpenAI API paths
const ALLOWED_PATHS = [
  /^\/v1\/threads$/,
  /^\/v1\/threads\/thread_[a-zA-Z0-9]+\/messages$/,
  /^\/v1\/threads\/thread_[a-zA-Z0-9]+\/runs$/,
  /^\/v1\/threads\/thread_[a-zA-Z0-9]+\/runs\/run_[a-zA-Z0-9]+$/,
  /^\/v1\/threads\/thread_[a-zA-Z0-9]+\/messages\??.*$/,
  /^\/v1\/files$/,
];

function isOriginAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

function isPathAllowed(path) {
  return ALLOWED_PATHS.some(pattern => pattern.test(path));
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, OpenAI-Beta',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);
    const path = url.pathname + url.search;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      if (isOriginAllowed(origin)) {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      return new Response('Forbidden', { status: 403 });
    }

    // Origin check
    if (!isOriginAllowed(origin)) {
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Path check
    const pathOnly = url.pathname;
    if (!isPathAllowed(pathOnly)) {
      return new Response(JSON.stringify({ error: 'Path not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Method check
    if (!['GET', 'POST'].includes(request.method)) {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build proxied request to OpenAI
    const openaiUrl = `https://api.openai.com${path}`;

    const proxyHeaders = new Headers();
    proxyHeaders.set('Authorization', `Bearer ${env.OPENAI_API_KEY}`);

    // Forward Content-Type (important for file uploads vs JSON)
    const contentType = request.headers.get('Content-Type');
    if (contentType) {
      proxyHeaders.set('Content-Type', contentType);
    }

    // Forward OpenAI-Beta header
    const betaHeader = request.headers.get('OpenAI-Beta');
    if (betaHeader) {
      proxyHeaders.set('OpenAI-Beta', betaHeader);
    }

    const proxyInit = {
      method: request.method,
      headers: proxyHeaders,
    };

    // Forward body for POST requests
    if (request.method === 'POST') {
      proxyInit.body = request.body;
      // Don't set duplex unless streaming
      proxyInit.duplex = 'half';
    }

    try {
      const response = await fetch(openaiUrl, proxyInit);

      // Clone response and add CORS headers
      const responseHeaders = new Headers(response.headers);
      Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error', message: err.message }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin),
        },
      });
    }
  },
};
