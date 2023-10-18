import Axios from 'axios';

export const editBlog = async (blogId, updatedData) => {
  try {
    const res = await Axios.put(`http://localhost:5000/api/blogs/${blogId}`, updatedData);
    return res.data; 
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const res = await Axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
    return res.data; 
  } catch (error) {
    throw error;
  }
};
