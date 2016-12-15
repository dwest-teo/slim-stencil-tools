import { bcClient } from './Base';

/**
 * @description
 * Fetch a page by URL, render with specified template
 * @param {String} url
 * @param {String} component
 * @param {Object} opts
 */
// eslint-disable-next-line import/prefer-default-export
export const getPage = (url, component, opts = {}) => new Promise((resolve, reject) => {
  bcClient({
    url,
    component,
    ...opts,
  }).then(response => resolve(response))
  .catch(error => reject(new Error(error)));
});
