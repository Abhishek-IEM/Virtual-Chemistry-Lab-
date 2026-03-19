import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.response.use(
  res => res,
  err => {
    // If not on login/signup, redirect to login on 401
    const publicPaths = ['/login', '/signup', '/forgot-password', '/reset-password']
    const isPublic = publicPaths.some(path => window.location.pathname.startsWith(path))

    if (err.response?.status === 401 && !isPublic) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
