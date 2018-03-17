# zenflow-build-js-lib

A minimal-config opinionated and awesome build system for portable js libs

[![Build Status](https://travis-ci.org/zenflow/zenflow-build-js-lib.svg?branch=master)](https://travis-ci.org/zenflow/zenflow-build-js-lib)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![npm version](https://badge.fury.io/js/zenflow-build-js-lib.svg)](https://www.npmjs.com/packages/zenflow-build-js-lib)
[![Dependencies Status](https://david-dm.org/zenflow/zenflow-build-js-lib.svg)](https://david-dm.org/zenflow/zenflow-build-js-lib)
[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-build-js-lib.svg)](https://greenkeeper.io/)
![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Facts

- entry point will be `src/index.js`
- global export name will be camelized package name
- "dependencies" and "peerDependencies" package fields define externals

## Rules

- `package.json` fields must be as such:
  - "main": `dist/${pkg.name}.cjs.js`
  - "module": `dist/${pkg.name}.es.js`
  - "browser": `dist/${pkg.name}.umd.js`
- other required `package.json` fields:
  - "homepage"
  - "license"

## Configs

In your `package.json`, at `pkg.zenflowConfig.build` add any of the following options:

- `globals`: Object mapping external package names to their global export names (i.e. "react-dom" -> "ReactDOM")
