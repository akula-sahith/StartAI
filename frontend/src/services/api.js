import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8007',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workspaceService = {
  // Create a new startup workspace (creation/optimization mode)
  createWorkspace: async (data) => {
    const response = await api.post('/workspace', data);
    return response.data;
  },

  // Get details of an existing workspace
  getWorkspace: async (id) => {
    const response = await api.get(`/workspace/${id}`);
    return response.data;
  },

  // Upload pitch deck/financial document and run advanced optimization analysis
  uploadPDF: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload-startup-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
