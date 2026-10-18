# Portfolio AI assistant

This Cloudflare Worker is the private backend for the static portfolio chat. It sends visitor questions to the OpenAI Responses API, keeps the API key on the server, limits requests to 12 per minute per visitor IP, accepts only the configured website origins, and caps message sizes and conversation history.

## Deploy

1. Install Wrangler or use `npx wrangler`, then sign in to Cloudflare:

   ```sh
   npx wrangler login
   ```

2. From this folder, deploy the Worker:

   ```sh
   npx wrangler deploy
   ```

3. Add your OpenAI API key as an encrypted Cloudflare Worker secret. Wrangler prompts for the value; do not paste it into website files or commit it:

   ```sh
   npx wrangler secret put OPENAI_API_KEY
   ```

   This uses OpenAI API billing, which is separate from a ChatGPT subscription.

4. Copy the deployed Worker URL from Wrangler’s output, append `/chat`, and set it as `window.PORTFOLIO_CHAT_ENDPOINT` in `js/chat-config.js`. Publish the static site again.

The allowed website origin and model are set in `wrangler.jsonc`. Add any custom domain origin there before deploying. For local preview, the configured localhost origins are already allowed.

Until the Worker URL and secret are configured, the site clearly identifies the AI as disconnected and only the existing basic portfolio guide is available.
