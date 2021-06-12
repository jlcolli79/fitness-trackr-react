export const apiFetch = async (endpoint, headers) => {
  try {
    const response = await fetch(endpoint, headers);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
