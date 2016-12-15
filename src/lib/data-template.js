/**
 * @description
 * Simple function to build data template path string
 * @param {Object} obj
 */
const dataTemplate = (path, component, suffix) => (
  `${path}/${component.toLowerCase()}-${suffix}`
);

export default dataTemplate;
