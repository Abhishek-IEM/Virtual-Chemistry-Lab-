import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get('/user/profile')
      setUser(res.data.user)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const signup = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password })
    setUser(res.data.user)
    return res.data
  }

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    setUser(res.data.user)
    return res.data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  const updateUser = (updatedData) => {
    setUser(prev => prev ? ({ ...prev, ...updatedData }) : null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
