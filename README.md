# zenflow-build-js-lib

A zero-config opinionated and awesome build system for portable js libs

[![Build Status](https://travis-ci.org/zenflow/zenflow-build-js-lib.svg?branch=master)](https://travis-ci.org/zenflow/zenflow-build-js-lib)
[![npm version](https://badge.fury.io/js/zenflow-build-js-lib.svg)](https://www.npmjs.com/packages/zenflow-build-js-lib)
[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-build-js-lib.svg)](https://greenkeeper.io/)
![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Rules
   - Entry point must be `src/index.js`
   - Dist files must be specified in `package.json`:
     - "main" for cjs format
     - "module" for es format
     - "browser" for umd format
     - all must be inside `dist/`
   - "homepage" and "license" must be specified in `package.json`
