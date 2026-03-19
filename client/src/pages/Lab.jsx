import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getExperiment } from '../experiments/definitions'
import SimulationCanvas from '../components/SimulationCanvas'
import EquipmentPanel from '../components/EquipmentPanel'
import ProgressPanel from '../components/ProgressPanel'
import StatusBar from '../components/StatusBar'
import api from '../api/axios'
import './Lab.css'

const Lab = () => {
  const { experimentId } = useParams()
  const navigate = useNavigate()
  const { updateUser } = useAuth()
  const { addToast } = useToast()

  const experiment = getExperiment(experimentId)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [simState, setSimState] = useState({
    hasHCl: false,
    hasIndicator: false,
    hasNaOH: false,
    drops: 0,
    ph: experimentId === 'acid-base-titration' ? 1 : experimentId === 'neutralization-reaction' ? 2 : 7,
    color: '#e8f4f8',
    volume: 0,
    hasPrecipitate: false,
    bubbles: false,
    filtrationDone: false,
    precipitateFiltered: false,
    chemicalA: false,
    chemicalB: false,
    heated: false,
  })
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!experiment) navigate('/dashboard')
  }, [experiment])

  const handleAction = useCallback((action) => {
    if (done) return
    const expected = experiment?.steps[currentStep]?.action
    if (action !== expected) {
      addToast(`⚠️ Wrong step! Try: ${experiment?.steps[currentStep]?.hint}`, 'warning')
      return
    }

    // Update simulation state based on action
    setSimState(prev => {
      let next = { ...prev }
      switch (action) {
        case 'add-hcl':       next.hasHCl = true; next.volume = 25; next.ph = 1; next.color = '#e8f4f8'; break
        case 'add-indicator': next.hasIndicator = true; next.color = '#f5f5f5'; break
        case 'add-naoh':      next.hasNaOH = true; next.drops = 1; next.ph = 5; break
        case 'endpoint':      next.ph = 8.5; next.color = '#ffb3de'; next.drops = 25; break
        case 'fill-tube':     next.volume = 10; next.color = '#e8f4f8'; break
        case 'observe':       next.color = getPhColor(next.ph); break
        case 'record':        break
        case 'add-agno3':     next.volume = 15; next.color = '#d4f0ec'; break
        case 'add-nacl':      next.hasPrecipitate = true; next.color = '#b8e8e0'; break
        case 'observe-precipitate': break
        case 'add-acid':      next.ph = 2; next.color = '#ffcccc'; next.volume = 20; break
        case 'measure-ph':    break
        case 'add-base':      next.ph = 7; next.color = '#ccffcc'; break
        case 'achieve-neutral': next.ph = 7; next.color = '#b3ffb3'; break
        case 'setup-funnel':  break
        case 'pour-mixture':  next.filtrationDone = true; break
        case 'collect-filtrate': break
        case 'observe-result': next.precipitateFiltered = true; break
        case 'add-chemical-a': next.chemicalA = true; next.color = '#3399ff'; next.volume = 20; break
        case 'add-chemical-b': next.chemicalB = true; next.color = '#ccaa44'; break
        case 'heat':          next.heated = true; next.bubbles = true; break
        case 'collect-gas':   next.bubbles = false; break
        default: break
      }
      return next
    })

    const newCompleted = [...completedSteps, currentStep]
    setCompletedSteps(newCompleted)

    if (currentStep + 1 >= experiment.steps.length) {
      // All steps done!
      setDone(true)
      handleCompletion()
    } else {
      setCurrentStep(prev => prev + 1)
      addToast('✓ Step complete! Proceed to next step.', 'success')
    }
  }, [currentStep, completedSteps, done, experiment])

  const handleCompletion = async () => {
    setSaving(true)
    try {
      const res = await api.post('/experiments/complete', { experimentId })
      const { totalPoints, completedExperiments, alreadyCompleted, message } = res.data
      updateUser({ points: totalPoints, completedExperiments })
      setTimeout(() => addToast(message, alreadyCompleted ? 'info' : 'success'), 500)
    } catch {
      addToast('Experiment complete! (offline mode)', 'info')
    } finally {
      setSaving(false)
    }
  }

  if (!experiment) return null

  return (
    <div className="lab-page">
      {/* Top navigation */}
      <div className="lab-nav">
        <button className="btn btn--glass btn--sm" onClick={() => navigate('/dashboard')}>
          ← Dashboard
        </button>
        <div className="lab-nav-title">
          <span>{experiment.icon}</span>
          <span>{experiment.title}</span>
        </div>
        <div className="lab-nav-badge badge badge--points">⚡ {experiment.points} pts</div>
      </div>

      {/* Status Bar */}
      <StatusBar
        ph={simState.ph}
        volume={simState.volume}
        instruction={done ? '🎉 Experiment Complete!' : experiment.steps[currentStep]?.instruction}
      />

      {/* Main 3-Panel Layout */}
      <div className="lab-layout">
        {/* Left: Equipment Panel */}
        <EquipmentPanel
          experiment={experiment}
          currentAction={experiment.steps[currentStep]?.action}
          onAction={handleAction}
          disabled={done}
        />

        {/* Center: Simulation */}
        <div className="lab-center">
          <SimulationCanvas
            experimentId={experimentId}
            simState={simState}
            currentStep={currentStep}
            done={done}
          />
        </div>

        {/* Right: Progress + AI Tutor */}
        <ProgressPanel
          experiment={experiment}
          currentStep={currentStep}
          completedSteps={completedSteps}
          done={done}
          saving={saving}
          onGoToDashboard={() => navigate('/dashboard')}
        />
      </div>

      {/* Completion Overlay */}
      <AnimatePresence>
        {done && (
          <motion.div
            className="completion-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="completion-card glass-card"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            >
              <div className="completion-icon">🎉</div>
              <h2>Experiment Complete!</h2>
              <p>You've successfully completed <strong>{experiment.title}</strong></p>
              <div className="completion-points">
                <span>⚡</span>
                <span>+{experiment.points} points earned</span>
              </div>
              <div className="completion-actions">
                <button className="btn btn--glass" onClick={() => { setDone(false); setCurrentStep(0); setCompletedSteps([]); setSimState({ hasHCl: false, hasIndicator: false, hasNaOH: false, drops: 0, ph: 7, color: '#e8f4f8', volume: 0, hasPrecipitate: false, bubbles: false, filtrationDone: false, precipitateFiltered: false, chemicalA: false, chemicalB: false, heated: false }); }}>
                  🔄 Redo
                </button>
                <button className="btn btn--primary" onClick={() => navigate('/dashboard')}>
                  🏠 Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper: pH to color
const getPhColor = (ph) => {
  if (ph <= 1) return '#ff0000'
  if (ph <= 3) return '#ff6600'
  if (ph <= 5) return '#ffcc00'
  if (ph <= 6) return '#ccff00'
  if (ph === 7) return '#00ff88'
  if (ph <= 9) return '#00ccff'
  if (ph <= 11) return '#0044ff'
  return '#8800ff'
}

export default Lab
