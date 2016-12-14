import fetchStatus from '../lib/fetch-status';

// eslint-disable-next-line import/prefer-default-export
export const getPage = (url, template) => new Promise((resolve, reject) => {
  fetch(url, {
    headers: {
      'stencil-config': '{}',
      'stencil-options': JSON.stringify({ render_with: template }),
    },
    credentials: 'include',
  }).then(fetchStatus)
  .then(response => response.json())
  .then(res => resolve(JSON.parse(res)))
  .catch(error => reject(new Error(error)));
});
