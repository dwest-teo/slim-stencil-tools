/**
 * @description
 * Simple function to convert object to url params if FormData isn't being used
 * @param {Object} obj
 */
const buildParams = (obj) => {
  const str = Object.keys(obj).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  ).join('&');

  return str;
};

export default buildParams;
