import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
export const getAllPost = async () => {
  try {
    const response = await axios.get(`${API_URL}posts`);
    return response.data;
  } catch (error) {
    throw new Error('Hubo un problema al obtener los post.');
  }
};
