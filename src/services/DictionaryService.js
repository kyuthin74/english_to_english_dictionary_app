import axios from 'axios';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const DictionaryService = {
  getWordDefinition: async (word) => {
    try {
      const response = await axios.get(`${API_URL}${word}`);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching word definition:', error);
      throw error;
    }
  },
}; 