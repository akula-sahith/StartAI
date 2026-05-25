import axios from 'axios';
import { getAuth } from 'firebase/auth';

const api = axios.create({
  baseURL: 'http://localhost:8007',
  headers: {
    'Content-Type': 'application/json',
  },
});

// =============================================
// REQUEST INTERCEPTOR — Attach Firebase JWT
// =============================================
api.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to attach auth token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =============================================
// RESPONSE INTERCEPTOR — Handle 401 responses
// =============================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — redirect to login
      const auth = getAuth();
      auth.signOut().then(() => {
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);

// =============================================
// WORKSPACE SERVICE
// =============================================
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

  // Get all workspaces for the current authenticated user
  getMyWorkspaces: async () => {
    const response = await api.get('/my-workspaces');
    return response.data;
  },

  // Get authenticated user info
  getMe: async () => {
    const response = await api.get('/me');
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
