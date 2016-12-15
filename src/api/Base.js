import fetchStatus from '../lib/fetch-status';
import buildParams from '../lib/build-params';
import dataTemplate from '../lib/data-template';

/**
 * @description
 * Default options object to be merged with user specified options
 * @param {String} url
 * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
 * @param {String} componentPath
 * @param {String} componentSuffix
 * @param {String} component
 * @param {Boolean} remote
 * @param {Boolean} reqUrl
 * @param {FormData} formData
 * @param {Object} params
 * @param {Object} config
 * @param {Object} headers
 */
const defaultOpts = {
  url: '',
  method: 'GET',
  componentPath: 'data',
  componentSuffix: 'data',
  component: null,
  remote: false,
  reqUrl: false,
  formData: null,
  params: {},
  config: {},
  headers: {},
};

/**
 * @description
 * Base BigCommerce API client function
 * @param {Object} opts
 */
// eslint-disable-next-line import/prefer-default-export
export const bcClient = (opts = defaultOpts) => {
  const options = Object.assign({}, defaultOpts, opts);
  const data = options.formData ? options.formData : buildParams(options.params);
  const url = options.remote ? `/remote/v1${options.url}` : options.url;
  const reqUrl = options.reqUrl ? `${url}?${data}` : url;
  const template = options.component
    ? dataTemplate(options.componentPath, options.component, options.componentSuffix)
    : null;

  return new Promise((resolve, reject) => {
    fetch(reqUrl, {
      method: options.method,
      headers: {
        ...options.headers,
        'stencil-config': options.config
          ? JSON.stringify(options.config)
          : '{}',
        'stencil-options': options.component
          ? JSON.stringify({ render_with: template })
          : '{}',
      },
      body: options.method === 'GET' ? null : data,
      credentials: 'include',
    }).then(fetchStatus)
      .then(response => response.json())
      .then(res => resolve(options.remote ? res.data : JSON.parse(res)))
    .catch(error => reject(new Error(error)));
  });
};
