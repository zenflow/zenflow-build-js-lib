# zenflow-build-js-lib

A minimal-config opinionated and awesome build system for portable js libs

[![Build Status](https://travis-ci.org/zenflow/zenflow-build-js-lib.svg?branch=master)](https://travis-ci.org/zenflow/zenflow-build-js-lib)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![npm version](https://badge.fury.io/js/zenflow-build-js-lib.svg)](https://www.npmjs.com/packages/zenflow-build-js-lib)
[![Dependencies Status](https://david-dm.org/zenflow/zenflow-build-js-lib.svg)](https://david-dm.org/zenflow/zenflow-build-js-lib)
[![Greenkeeper badge](https://badges.greenkeeper.io/zenflow/zenflow-build-js-lib.svg)](https://greenkeeper.io/)
[![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/zenflow/zenflow-build-js-lib/blob/master/CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- convention over configuration
- rollup
- babel, babel-preset-env, babel-preset-react
- cjs es & umd formats
- pretty banners with package name & version, filename, homepage & license
- `--minify` option
- `--sourcemaps` option

## Conventions

- entry point will be `src/index.js`
- externals (non-bundled imports) will be `"dependencies"` and `"peerDependencies"`
- package `"main"` refers to cjs format file (optional)
- package `"module"` refers to es format file (optional)
- package `"browser"` refers to umd format file (optional)
- global export name will be camelized package name
- global import names will be camelized package names *unless* specified in `pkg.zenflowConfig.build.globals` option in `package.json`

## CLI

Simply `zenflow-build-js-lib [--minify] [--sourcemap]`

## Configs

This project strives to eliminate as much configuration as possible, but sometimes it's needed.

In your `package.json`, at `pkg.zenflowConfig.build`, add any of the following options:

- `"globals"` - Object mapping external package names to their global export names (e.g. `{"react-dom": "ReactDOM"}`)

## Example

package.json

```json
{
  "name": "example",
  "version": "1.0.0",
  "main": "dist/example.cjs.js",
  "module": "dist/example.es.js",
  "browser": "dist/example.umd.js",
  "files": [
    "dist/**/*"
  ],
  "homepage": "HOMEPAGE",
  "license": "LICENSE",
  "scripts": {
    "build": "zenflow-build-js-lib --minify --sourcemap"
  },
  "devDependencies": {
    "zenflow-build-js-lib": "^1.0.0"
  },
  "zenflowConfig": {
    "build": {
      "globals": {
        "react-dom": "ReactDOM"
      }
    }
  }
}

```
