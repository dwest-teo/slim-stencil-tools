import { bcClient } from './Base';

// eslint-disable-next-line import/prefer-default-export
export const getProduct = (productId) => bcClient({
  url: `/products.php?productId=${productId}`,
  component: 'product',
});
