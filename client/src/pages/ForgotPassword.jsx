import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../api/axios'
import './Auth.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      const res = await api.post('/auth/forgot-password', { email })
      setMessage(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
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
          <h1>Reset Password</h1>
          <p>We'll send you a link to get back into your account</p>
        </div>

        {message ? (
          <div className="success-banner">
            <p>📧 {message}</p>
            <p style={{ marginTop: 10, fontSize: 13, color: '#8b949e' }}>
              Check your inbox (and spam folder) for the reset link.
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="scientist@lab.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? <div className="spinner" style={{ width: 18, height: 18, border: '2px solid #0d1117' }} /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          Suddenly remembered? <Link to="/login" className="auth-link">Back to Login</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
