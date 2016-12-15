/**
 * @description
 * Utility function to create an image URL from a Stencil image "data" attribute and size string
 * @param {String} data
 * @param {String} size
 */
const imageUrl = (data, size) => data.replace('{:size}', size);

export default imageUrl;
