/**
 * @description
 * Utility function to create an image URL from a Stencil image "data" attribute and size string
 * @param {String} data
 * @param {String} size
 */
export default function imageUrl(data, size) {
  return data.replace('{:size}', size);
}
