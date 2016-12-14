import { bcClient } from './Base';

export const getCartContent = () => new Promise((resolve, reject) => {
  bcClient({
    url: '/cart.php',
    component: 'cart',
  }).then(response => resolve(response))
  .catch(error => reject(new Error(error)));
});

export const addToCart = (formData) => new Promise((resolve, reject) => {
  bcClient({
    url: '/cart/add',
    method: 'POST',
    remote: true,
    formData,
  }).then(response => resolve(response))
  .catch(error => reject(new Error(error)));
});

export const removeFromCart = (itemId) => {
  const removeFromCartData = new FormData();
  removeFromCartData.append('items[0][id]', itemId);
  removeFromCartData.append('items[0][quantity]', 0);

  return new Promise((resolve, reject) => {
    bcClient({
      url: '/cart/update',
      method: 'POST',
      remote: true,
      formData: removeFromCartData,
    }).then(response => {
      if (response.status === 'succeed') {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch(error => reject(new Error(error)));
  });
};

export const updateCartQty = (opts) => {
  const updateQtyCartData = new FormData();
  updateQtyCartData.append('items[0][id]', opts.itemId);
  updateQtyCartData.append('items[0][quantity]', opts.qty);

  return new Promise((resolve, reject) => {
    bcClient({
      url: '/cart/update',
      method: 'POST',
      remote: true,
      formData: updateQtyCartData,
    }).then(response => {
      if (response.status === 'succeed') {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch(error => reject(new Error(error)));
  });
};

export const getShippingEstimate = (opts) => new Promise((resolve, reject) => {
  bcClient({
    url: '/shipping-quote',
    method: 'GET',
    remote: true,
    reqUrl: true,
    params: opts,
  }).then(response => {
    if (response.status !== 'failed') {
      resolve(response);
    } else {
      reject(response);
    }
  }).catch(error => reject(new Error(error)));
});

export const submitShippingEstimate = (params) => new Promise((resolve, reject) => {
  bcClient({
    url: '/shipping-quote',
    method: 'POST',
    remote: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  }).then(response => {
    if (response.status !== 'failed') {
      resolve(response);
    } else {
      reject(response);
    }
  }).catch(error => reject(new Error(error)));
});

export const submitCouponCode = (code) => new Promise((resolve, reject) => {
  bcClient({
    url: '/apply-code',
    method: 'POST',
    remote: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: { code },
  }).then(response => {
    if (response.status !== 'failed') {
      resolve(response);
    } else {
      reject(response);
    }
  }).catch(error => reject(new Error(error)));
});
