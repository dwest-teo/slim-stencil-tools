/**
 * @description
 * Utility function to check http response status on Fetch API requests
 */
export default function fetchStatus(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
