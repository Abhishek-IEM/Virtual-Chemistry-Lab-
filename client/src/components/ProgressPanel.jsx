import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProgressPanel.css'

const ProgressPanel = ({ experiment, currentStep, completedSteps, done, saving }) => {
  const [tutorQuery, setTutorQuery] = useState(null) // 'what', 'next', 'explain'

  const handleTutorClick = (queryType) => {
    setTutorQuery(tutorQuery === queryType ? null : queryType)
  }

  return (
    <div className="progress-panel glass-card">
      <div className="panel-header">
        <span className="panel-icon">📈</span>
        <h3>Progress</h3>
      </div>

      <div className="progress-meta">
        <div className="progress-text">
          <span>{done ? experiment.steps.length : completedSteps.length}</span> / {experiment.steps.length} Steps
        </div>
        <div className="progress-bar-bg">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(done ? experiment.steps.length : completedSteps.length) / experiment.steps.length * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="steps-list">
        {experiment.steps.map((step, idx) => {
          const isDone = completedSteps.includes(idx) || done
          const isCurrent = currentStep === idx && !done

          return (
            <div key={step.id} className={`step-item ${isDone ? 'step-item--done' : ''} ${isCurrent ? 'step-item--current' : ''}`}>
              <div className="step-marker">
                {isDone ? '✓' : idx + 1}
              </div>
              <div className="step-content">
                <div className="step-text">{step.instruction}</div>
              </div>
            </div>
          )
        })}
      </div>

      {saving && (
        <div className="saving-indicator">
          <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
          <span>Saving progress...</span>
        </div>
      )}

      {/* AI Tutor Section */}
      <div className="ai-tutor-section">
        <div className="tutor-header">
          <span className="tutor-icon">🤖</span>
          <span>AI Lab Tutor</span>
        </div>

        <div className="tutor-questions">
          <button className={`tutor-btn ${tutorQuery === 'what' ? 'active' : ''}`} onClick={() => handleTutorClick('what')}>
            What is this experiment?
          </button>
          <button className={`tutor-btn ${tutorQuery === 'next' ? 'active' : ''}`} onClick={() => handleTutorClick('next')}>
            What should I do next?
          </button>
          <button className={`tutor-btn ${tutorQuery === 'explain' ? 'active' : ''}`} onClick={() => handleTutorClick('explain')}>
            Explain the reaction
          </button>
        </div>

        <AnimatePresence>
          {tutorQuery && (
            <motion.div
              className="tutor-response glass-card"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{experiment.aiTutor[tutorQuery]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}

export default ProgressPanel
