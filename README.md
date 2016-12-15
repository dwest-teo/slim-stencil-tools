# slim-stencil-tools

A lightweight and modern alternative utility library for Bigcommerce Stencil themes
<!-- [![Travis build status](http://img.shields.io/travis/dwest-teo/slim-stencil-tools.svg?style=flat)](https://travis-ci.org/dwest-teo/slim-stencil-tools)
[![Code Climate](https://codeclimate.com/github/dwest-teo/slim-stencil-tools/badges/gpa.svg)](https://codeclimate.com/github/dwest-teo/slim-stencil-tools)
[![Test Coverage](https://codeclimate.com/github/dwest-teo/slim-stencil-tools/badges/coverage.svg)](https://codeclimate.com/github/dwest-teo/slim-stencil-tools) -->
[![devDependency Status](https://david-dm.org/dwest-teo/slim-stencil-tools/dev-status.svg)](https://david-dm.org/dwest-teo/slim-stencil-tools#info=devDependencies)
[![npm](https://img.shields.io/npm/v/slim-stencil-tools.svg)](https://www.npmjs.com/package/slim-stencil-tools)
[![npm](https://img.shields.io/npm/l/slim-stencil-tools.svg)](https://www.npmjs.com/package/slim-stencil-tools)

### About
This library is a lightweight, jQuery-free alternative to Bigcommerce's standard [Stencil Utils](https://stencil.bigcommerce.com/docs/the-stencil-utils-package) package.  slim-stencil-tools is NOT a direct replacement for Stencil Utils, but rather a leaner API client designed for usecases where some of Stencil Utils' functionality isn't needed (ie- a React/Redux implementation that doesn't need the default Events system or jQuery dependency).  Primarily, slim-stencil-tools facilitates the basic HTTP functionality required for a Stencil theme.

slim-stencil-tools also makes it easier to retrieve JSON data from the Stencil API if desired.  Although some features of slim-stencil-utils were designed with React components in mind, it does not require any framework or dependencies to function (although you'll probably want to use some polyfills, read on for details).

### Documentation
slim-stencil-tools is written in ES6 and transpiled via babel to run in the browser.  The standard Stencil theme's Webpack setup will allow you to include this library as a module.

#### Installation
* Run `npm install --save slim-stencil-tools` to install the package and save it as a dependency.
* Import the appropriate parts of the library where needed in your code.  For example, if you need access to the library's Cart API functions in a file:
```javascript
  import { Cart as CartApi } from 'slim-stencil-tools';
```

#### Usage
slim-stencil-tools is split up into several exports that can be used in your modules as needed.  Some of the included functions allow you to specify a "component" that will be receiving the retrieved data.  This allows you to leverage Stencil's custom Handlebars templates to specify the contents and shape of the JSON data returned.  To use this functionality, you'll need to do the following:
* Create a directory for your custom "data" templates.  This directory should be a child of the "templates/components" directory in your Stencil theme.  slim-stencil-tools assumes this directory will be named "data", but you can specify another name using the `componentPath` property of the optional `opts` object on relevant functions.
* Create a new layout file for your "data" templates.  In your Stencil theme's "templates/layout" directory, create a new file "data.html" containing the following:
```javascript
  {{#block "data_objects"}}{{/block}}
```
* Create individual "data" templates for each data retrieval function, specifying the data you require.  These templates will all go in the "templates/components/data" directory, and all need to be named with a common suffix.  The suffix defaults to "-data", but can be specified using the `componentSuffix` property of the optional `opts` object on relevant functions.  For example, here's a file creating a JSON object `cart`, saved as "templates/components/data/cart-data.html":
```javascript
  {{inject "cart" cart}}

  {{#partial "data_objects"}}
    {{jsContext}}
  {{/partial}}

  {{> layout/data}}
```
Using Stencil's Handlebars helpers, you can also create smaller named variables for only the parts of the Stencil object you need in a given component, reducing the amount of data to be downloaded.  For example, if you only need to retrieve a category's description, you could use a data template like this, saved as "templates/components/data/category-data.html":
```javascript
  {{inject "categoryDescription" category.description}}

  {{#partial "data_objects"}}
    {{jsContext}}
  {{/partial}}

  {{> layout/data}}
```
* Now you can use slim-stencil-tools to retrieve JSON data from Bigcommerce.  This makes it trivial to render data on the client-side using something like React, rather than being stuck working with pre-rendered HTML.


##### Base
```javascript
  import { Base as BaseApi } from 'slim-stencil-tools';
```

The Base import is the underlying API function used by slim-stencil-tools.  In most cases, you won't need to import it directly, but you can if you need to add or extend functionality.

##### Cart
```javascript
  import { Cart as CartApi } from 'slim-stencil-tools';
```

The Cart import contains all functions related to retrieving and manipulating data within the cart.

###### getCartContent(component, opts)
Retrieves the current content of the cart according to the specified data component.  `opts` object is optional and can be used to override the default `componentPath` and `componentSuffix` attributes.
```javascript
  const data = CartApi.getCartContent('cart');
```

###### addToCart(formData)
Adds a product to the cart using a FormData object as per the default product page form.
```javascript
  const productForm = document.querySelector('#product-page-form');
  const formData = new FormData(productForm);
  CartApi.addToCart(formData);
```

###### removeFromCart(itemId)
Removes a product from the cart by item id (the cart-specific item id, NOT product id).
```javascript
  CartApi.removeFromCart(itemToRemove);
```

###### updateCartQty(opts)
Change the quantity of a product in the cart.  `opts` object accepts properties `itemId` and `qty`.
```javascript
  const changeQty = {
    itemId: 1234,
    qty: 3,
  };
  CartApi.updateCartQty(changeQty);
```

###### submitCouponCode(code)
Submit a coupon or gift certificate code.
```javascript
  CartApi.submitCouponCode('muchsavings');
```

###### getShippingEstimate(opts)
Retrieve a shipping estimate for items in the cart.  Example coming soon.

###### submitShippingEstimate(params)
Submit selected shipping estimate.  Example coming soon.

##### Page
```javascript
  import { Page as PageApi } from 'slim-stencil-tools';
```

The Page import contains a function that allows you to fetch a page by URL and render it to a specified Handlebars template file or a "data" component yielding JSON as described above.  Example coming soon.

##### Product
```javascript
  import { Product as ProductApi } from 'slim-stencil-tools';
```

###### getProduct(productId, component, opts)
Retrieve product data by product id and render it to a specified "data" component, yielding JSON.  `opts` object is optional and can be used to override the default `componentPath` and `componentSuffix` attributes.
```javascript
  ProductApi.getProduct(12345, 'quick-view');
```

##### imageUrl
```javascript
  import { imageUrl } from 'slim-stencil-tools';
```

The `imageUrl` function is a utility function that creates a URL string from a Stencil image "data" attribute and a supplied size string.
```javascript
  const url = imageUrl(imageData, '600x600');
```

### Notes
slim-stencil-tools uses modern JavaScript APIs and capabilities that might not be supported in older browsers, specifically ES6 promises and the Fetch API.  You'll likely need to polyfill for best browser support.  The standard stencil theme's dependencies includes babel-polyfill which should take care of the ES6 promises, but here's a [great alternative](https://github.com/stefanpenner/es6-promise) just in case you aren't using babel-polyfill.

As for the Fetch API, here's the recommended [polyfill from GitHub](https://github.com/github/fetch).

#### Important
Please note that in some places slim-stencil-tools' usage of the Fetch API does require the use of HTTPS to avoid CORS issues.  For the best experience, you probably need to be using Bigcommerce's "Site-wide HTTPS" feature.  In your store's admin area, look under Store Setup/Store Settings/HTTPS to see if you have this feature enabled, or to see details on how to enable it.

### License

[MIT](https://opensource.org/licenses/MIT). © 2016 Donny West

[![Built With Swag](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)
