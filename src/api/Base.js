import fetchStatus from '../lib/fetch-status';

const defaultOpts = {
  url: '',
  method: 'GET',
  actionName: '',
  component: null,
  remote: false,
  reqUrl: false,
  formData: null,
  params: {},
  config: {},
  headers: {},
};

const buildParams = (obj) => {
  const str = Object.keys(obj).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  ).join('&');

  return str;
};

// eslint-disable-next-line import/prefer-default-export
export const bcClient = (opts = defaultOpts) => {
  const options = Object.assign({}, defaultOpts, opts);
  const data = options.formData ? options.formData : buildParams(options.params);
  const url = options.remote ? `/remote/v1${options.url}` : options.url;
  const reqUrl = options.reqUrl ? `${url}?${data}` : url;

  return new Promise((resolve, reject) => {
    fetch(reqUrl, {
      method: options.method,
      headers: {
        ...options.headers,
        'stencil-config': options.config ? JSON.stringify(options.config) : '{}',
        'stencil-options': options.component ? JSON.stringify({
          render_with: `data/${options.component.toLowerCase()}-data`,
        }) : '{}',
      },
      body: options.method === 'GET' ? null : data,
      credentials: 'include',
    }).then(fetchStatus)
      .then(response => response.json())
      .then(res => resolve(options.remote ? res.data : JSON.parse(res)))
    .catch(error => reject(new Error(error)));
  });
};
