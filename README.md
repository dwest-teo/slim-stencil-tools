# slim-stencil-tools

A lightweight and modern alternative utility library for Bigcommerce Stencil themes
<!-- [![Travis build status](http://img.shields.io/travis/dwest-teo/slim-stencil-tools.svg?style=flat)](https://travis-ci.org/dwest-teo/slim-stencil-tools)
[![Code Climate](https://codeclimate.com/github/dwest-teo/slim-stencil-tools/badges/gpa.svg)](https://codeclimate.com/github/dwest-teo/slim-stencil-tools)
[![Test Coverage](https://codeclimate.com/github/dwest-teo/slim-stencil-tools/badges/coverage.svg)](https://codeclimate.com/github/dwest-teo/slim-stencil-tools) -->
[![devDependency Status](https://david-dm.org/dwest-teo/slim-stencil-tools/dev-status.svg)](https://david-dm.org/dwest-teo/slim-stencil-tools#info=devDependencies)
[![npm](https://img.shields.io/npm/v/slim-stencil-tools.svg)](https://www.npmjs.com/package/slim-stencil-tools)
[![npm](https://img.shields.io/npm/l/slim-stencil-tools.svg)](https://www.npmjs.com/package/slim-stencil-tools)

### Usage
This library is a lightweight, jQuery-free alternative to Bigcommerce's standard [Stencil Utils](https://stencil.bigcommerce.com/docs/the-stencil-utils-package) package.  slim-stencil-tools is NOT a direct replacement for Stencil Utils, but rather a leaner API client designed for usecases where some of Stencil Utils' functionality isn't needed (ie- a React/Redux implementation that doesn't need the default PageManager or Events system).  Complete details on what is and isn't included follow in the documentation.

### Documentation
Complete documentation is coming soon.  Seriously, really soon...like by December 16, 2016!

### Notes
slim-stencil-tools uses modern JavaScript APIs and capabilities that might not be supported in older browsers, specifically ES6 promises and the Fetch API.  You'll likely need to polyfill for best browser support.  The standard stencil theme's dependencies includes babel-polyfill which should take care of the ES6 promises, but here's a [great alternative](https://github.com/stefanpenner/es6-promise) just in case you aren't using babel-polyfill.

As for the Fetch API, here's the recommended [polyfill from GitHub](https://github.com/github/fetch).

#### Important
Please note that in some places slim-stencil-tools' usage of the Fetch API does require the use of HTTPS to avoid CORS issues.  For the best experience, you probably need to be using Bigcommerce's "Site-wide HTTPS" feature.  In your store's admin area, look under Store Setup/Store Settings/HTTPS to see if you have this feature enabled, or to see details on how to enable it.

### License

[MIT](https://opensource.org/licenses/MIT). © 2016 Donny West

[![Built With Swag](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)
