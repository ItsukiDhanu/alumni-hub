# How to Analyze Your Next.js Bundle

1. Install the bundle analyzer:
   ```bash
   npm install @next/bundle-analyzer --save-dev
   ```
2. Add the config (already added as `next.config.js`).
3. Build with analysis:
   ```bash
   ANALYZE=true npm run build
   ```
4. Open the generated report to review bundle size and optimize further.
