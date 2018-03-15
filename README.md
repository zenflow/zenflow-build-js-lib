# zenflow-build-js-lib
A standard build for js libs

## Rules
   - Entry point must be `src/index.js`
   - Dist files must be specified in `package.json`:
     - "main" for cjs format
     - "module" for es format
     - "browser" for umd format
     - all must be inside `dist/`
   - "homepage" and "license" must be specified in `package.json`
