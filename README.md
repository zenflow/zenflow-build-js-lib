# zenflow-build-js-lib

[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-build-js-lib.svg)](https://greenkeeper.io/)

A zero-config opinionated and awesome build system for portable js libs

## Rules
   - Entry point must be `src/index.js`
   - Dist files must be specified in `package.json`:
     - "main" for cjs format
     - "module" for es format
     - "browser" for umd format
     - all must be inside `dist/`
   - "homepage" and "license" must be specified in `package.json`
