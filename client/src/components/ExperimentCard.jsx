import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ExperimentCard.css'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const ExperimentCard = ({ experiment, completed, index }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      className={`exp-card glass-card ${completed ? 'exp-card--completed' : ''}`}
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
    >
      {/* Completed ribbon */}
      {completed && (
        <div className="completed-ribbon">✓ Completed</div>
      )}

      <div className="exp-card-header">
        <span className="exp-icon">{experiment.icon || '🧪'}</span>
        <div className="exp-badges">
          <span className={`badge badge--${experiment.difficulty.toLowerCase()}`}>
            {experiment.difficulty}
          </span>
          <span className="badge badge--points">
            ⚡ {experiment.points} pts
          </span>
        </div>
      </div>

      <div className="exp-card-body">
        <h3 className="exp-title">{experiment.title}</h3>
        <p className="exp-description">{experiment.description}</p>

        <div className="exp-meta">
          <span className="exp-meta-item">
            <span>⏱️</span>
            <span>{experiment.duration}</span>
          </span>
          <span className="exp-meta-item">
            <span>📋</span>
            <span>{experiment.steps?.length || 4} steps</span>
          </span>
        </div>
      </div>

      <div className="exp-card-footer">
        <motion.button
          className={`btn exp-btn ${completed ? 'btn--glass' : 'btn--primary'}`}
          onClick={() => navigate(`/lab/${experiment.id}`)}
          whileTap={{ scale: 0.97 }}
        >
          {completed ? '🔄 Redo Experiment' : '🚀 Start Experiment'}
        </motion.button>
      </div>

      {/* Hover glow */}
      <div className="exp-card-glow" />
    </motion.div>
  )
}

export default ExperimentCard
