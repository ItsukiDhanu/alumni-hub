# Performance Optimizations Applied

- Enabled Next.js image optimization and bundle analyzer in `next.config.js`.
- Added script to compress SVGs in `public/` (`scripts/compress-images.js`).
- Provided instructions for bundle analysis (`scripts/analyze-bundle.md`).
- Tailwind CSS is already purging unused styles (v4).
- Fonts are optimized via Next.js font loader.
- Code splitting and lazy loading are handled by Next.js automatically.

## Next Steps
- Run `npm install @next/bundle-analyzer imagemin imagemin-svgo --save-dev` to enable all optimizations.
- Run `node scripts/compress-images.js` to compress SVGs.
- Run `ANALYZE=true npm run build` to analyze bundle size.
