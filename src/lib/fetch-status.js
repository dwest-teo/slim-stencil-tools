export default function fetchStatus(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
