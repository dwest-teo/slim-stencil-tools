import { bcClient } from './Base';

/**
 * @description
 * Retrieve cart data
 * @param {String} component
 * @param {Object} opts
 */
export const getCartContent = (component = 'cart', opts = {}) => new Promise((resolve, reject) => {
  bcClient({
    url: '/cart.php',
    component,
    ...opts,
  }).then(response => resolve(response))
  .catch(error => reject(new Error(error)));
});

/**
 * @description
 * Add product to cart using FormData formatted per Cornerstone's default product page
 * @param {FormData} formData
 */
export const addToCart = (formData) => new Promise((resolve, reject) => {
  bcClient({
    url: '/cart/add',
    method: 'POST',
    remote: true,
    formData,
  }).then(response => resolve(response))
  .catch(error => reject(new Error(error)));
});

/**
 * @description
 * Remove product from cart by id
 * @param {String} itemId
 */
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

/**
 * @description
 * Change quantity in cart by id & qty
 * @param {Object} opts
 */
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

/**
 * @description
 * Get shipping estimate for items in cart
 * @param {Object} opts
 */
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

/**
 * @description
 * Submit selected shipping estimate
 * @param {Object} params
 */
export const submitShippingEstimate = (methodId) => new Promise((resolve, reject) => {
  bcClient({
    url: '/shipping-quote',
    method: 'POST',
    remote: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      shipping_method: methodId,
    },
  }).then(response => {
    if (response.status !== 'failed') {
      resolve(response);
    } else {
      reject(response);
    }
  }).catch(error => reject(new Error(error)));
});

/**
 * @description
 * Submit coupon or gift certificate code
 * @param {String} code
 */
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
