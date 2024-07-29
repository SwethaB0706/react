// api.js
const API_KEY = 'NJBE7fEJftJyZ6vL8YhMYRQ9s2TCyuaYSGD7DMmoCo7ScpkjJkidDO92'; // Replace with your Pexels API Key
const API_URL = 'https://api.pexels.com/v1/search';

export const fetchImages = async (query) => {
  try {
    const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data.photos[0]?.src?.large || '';
  } catch (error) {
    console.error('Error fetching images:', error);
    return '';
  }
};
