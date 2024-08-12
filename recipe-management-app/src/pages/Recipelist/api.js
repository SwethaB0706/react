const API_KEY =''
const API_URL = "https://api.pexels.com/v1/search";

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}?query=${encodeURIComponent(query)}&per_page=1&page=${page}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }

    const data = await response.json();
    return data.photos[0]?.src?.large || "";
  } catch (error) {
    console.error("Error fetching images:", error);
    return "";
  }
};
