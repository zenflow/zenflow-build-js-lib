<a name="3.0.0"></a>
# [3.0.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v2.1.1...v3.0.0) (2018-03-29)


### Features

* **babel:** use a modified version of the projects babel configuration ([c7f946b](https://github.com/zenflow/zenflow-build-js-lib/commit/c7f946b))


### BREAKING CHANGES

* **babel:** Now, no presets or plugins are applied by default. You must install them and configure them in .babelrc yourself

<a name="2.1.1"></a>
## [2.1.1](https://github.com/zenflow/zenflow-build-js-lib/compare/v2.1.0...v2.1.1) (2018-03-29)


### Bug Fixes

* **babel:** fix exported config to be a custom preset ([24b1c8e](https://github.com/zenflow/zenflow-build-js-lib/commit/24b1c8e))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v2.0.1...v2.1.0) (2018-03-29)


### Features

* **babel:** expose babel config as `zenflow-build-js-lib/babel` ([403dd8d](https://github.com/zenflow/zenflow-build-js-lib/commit/403dd8d))

<a name="2.0.1"></a>
## [2.0.1](https://github.com/zenflow/zenflow-build-js-lib/compare/v2.0.0...v2.0.1) (2018-03-24)


### Bug Fixes

* **package:** update slash to version 2.0.0 ([#13](https://github.com/zenflow/zenflow-build-js-lib/issues/13)) ([eac5b0b](https://github.com/zenflow/zenflow-build-js-lib/commit/eac5b0b))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v1.0.0...v2.0.0) (2018-03-23)


### Features

* **cli:** combine --minify and --sourcemap switches into --prod switch ([c02c3ea](https://github.com/zenflow/zenflow-build-js-lib/commit/c02c3ea))


### BREAKING CHANGES

* **cli:** --prod switch replaces --minify and --sourcemap

<a name="0.4.2"></a>
## [0.4.2](https://github.com/zenflow/zenflow-build-js-lib/compare/v0.4.1...v0.4.2) (2018-03-17)


### Bug Fixes

* **config:** only build formats for which a file is defined in package.json ([5f3cf95](https://github.com/zenflow/zenflow-build-js-lib/commit/5f3cf95))

<a name="0.4.1"></a>
## [0.4.1](https://github.com/zenflow/zenflow-build-js-lib/compare/v0.4.0...v0.4.1) (2018-03-17)


### Bug Fixes

* **banner:** dont require homepage and license, just print it when available ([994d674](https://github.com/zenflow/zenflow-build-js-lib/commit/994d674))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v0.3.0...v0.4.0) (2018-03-17)


### Features

* **config:** remove need for any config ([3baa905](https://github.com/zenflow/zenflow-build-js-lib/commit/3baa905))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v0.2.0...v0.3.0) (2018-03-17)


### Features

* **cli:** make --minify and --sourcemap opt-in options ([852e499](https://github.com/zenflow/zenflow-build-js-lib/commit/852e499))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/zenflow/zenflow-build-js-lib/compare/v0.1.1...v0.2.0) (2018-03-16)


### Features

* **babel:** enable object-rest-spread and class-properties ([c137b6e](https://github.com/zenflow/zenflow-build-js-lib/commit/c137b6e))
