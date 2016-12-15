import { bcClient } from './Base';

/**
 * @description
 * Fetch product data by id, render with specified template
 * @param {Number} productId
 * @param {String} component
 */
// eslint-disable-next-line import/prefer-default-export
export const getProduct = (productId, component = 'product') => bcClient({
  url: `/products.php?productId=${productId}`,
  component,
});
