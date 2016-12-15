/**
 * @description
 * Utility function to check http response status on Fetch API requests
 */
const fetchStatus = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export default fetchStatus;
