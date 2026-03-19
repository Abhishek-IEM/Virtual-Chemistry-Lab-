import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import './Auth.css'

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }
    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters')
    }

    setLoading(true)
    try {
      const res = await api.post('/auth/reset-password', { 
        token, 
        email, 
        newPassword: formData.password 
      })
      alert(res.data.message)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1 style={{ color: '#ff7b72' }}>Invalid link</h1>
            <p>This password reset link is missing required parameters. Please check your email again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-glow-2" />
      
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="auth-header">
          <h1>New Password</h1>
          <p>Resetting password for: <strong>{email}</strong></p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <div className="input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                className="auth-input" 
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="auth-input" 
              placeholder="Repeat new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <div className="spinner" style={{ width: 18, height: 18, border: '2px solid #0d1117' }} /> : 'Change Password'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default ResetPassword
