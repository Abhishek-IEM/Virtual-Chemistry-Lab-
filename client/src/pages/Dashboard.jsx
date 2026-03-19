import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ExperimentCard from '../components/ExperimentCard'
import api from '../api/axios'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const [experiments, setExperiments] = useState([])
  const [completedIds, setCompletedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/experiments')
        setExperiments(res.data.experiments)
      } catch {
        addToast('Failed to load experiments', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
    addToast('Logged out successfully', 'info')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header glass-card">
        <div className="header-left">
          <div className="header-logo">
            <span>⚗️</span>
            <span className="header-title neon-text">Virtual Chemistry Lab</span>
          </div>
        </div>

        <div className="header-right">
          <motion.div
            className="points-badge"
            key={user?.totalPoints}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
          >
            <span>⚡</span>
            <span>{user?.totalPoints || 0} pts</span>
          </motion.div>

          <div className="user-info">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="user-avatar" />
            ) : (
              <div className="user-avatar user-avatar--placeholder">
                {user?.name?.[0] || '?'}
              </div>
            )}
            <span className="user-name">{user?.name}</span>
          </div>

          <button className="btn btn--glass btn--sm" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <motion.section
        className="dashboard-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>
          Welcome back, <span className="neon-text">{user?.name?.split(' ')[0]}</span>! 👋
        </h1>
        <p>
          {completedIds.length === 0
            ? 'Start your first experiment and begin your chemistry journey!'
            : `You've completed ${completedIds.length} of ${experiments.length} experiments. Keep going!`}
        </p>

        <div className="hero-stats">
          <div className="stat-card glass-card">
            <span className="stat-value neon-text">{user?.totalPoints || 0}</span>
            <span className="stat-label">Total Points</span>
          </div>
          <div className="stat-card glass-card">
            <span className="stat-value" style={{ color: 'var(--neon-green)' }}>
              {experiments.filter(e => e.completed).length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card glass-card">
            <span className="stat-value" style={{ color: 'var(--neon-orange)' }}>
              {experiments.filter(e => !e.completed).length}
            </span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
      </motion.section>

      {/* Experiments Grid */}
      <section className="experiments-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          🧪 Available Experiments
        </motion.h2>

        {loading ? (
          <div className="loading-screen" style={{ minHeight: '300px' }}>
            <div className="spinner"></div>
            <p>Loading experiments...</p>
          </div>
        ) : (
          <motion.div
            className="experiments-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiments.map((exp, idx) => (
              <ExperimentCard
                key={exp.id}
                experiment={exp}
                completed={exp.completed}
                index={idx}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>🧪 Virtual Chemistry Lab — Learn chemistry through interactive simulations</p>
      </footer>
    </div>
  )
}

export default Dashboard
