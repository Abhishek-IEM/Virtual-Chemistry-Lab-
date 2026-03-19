import { motion } from 'framer-motion'
import './EquipmentPanel.css'

const EquipmentPanel = ({ experiment, currentAction, onAction, disabled }) => {

  const handleDragStart = (e, action) => {
    e.dataTransfer.setData('action', action)
  }

  // Map experiment equipment string to display label and icon
  const getEqInfo = (id) => {
    const map = {
      'pipette': { label: 'Pipette', icon: '🧪', act: 'add-hcl' },
      'hcl': { label: 'HCl Solution', icon: '🫙', act: 'add-hcl' },
      'indicator': { label: 'Indicator', icon: '💧', act: experiment.id === 'acid-base-titration' ? 'add-indicator' : 'add-indicator' }, // Handles phenolphthalein & universal
      'burette': { label: 'Burette', icon: '🌡️', act: 'add-naoh' },
      'naoh': { label: 'NaOH Solution', icon: '🫙', act: 'add-naoh' },
      'flask': { label: 'Flask', icon: '⚗️', act: 'none' },

      'test-tube': { label: 'Test Tubes', icon: '🧪', act: 'none' },
      'sample': { label: 'Sample Solution', icon: '🫙', act: 'fill-tube' },
      'color-chart': { label: 'Record pH', icon: '📊', act: 'record' },

      'agno3': { label: 'AgNO₃ Solution', icon: '🫙', act: 'add-agno3' },
      'nacl': { label: 'NaCl Solution', icon: '🫙', act: 'add-nacl' },
      'stirrer': { label: 'Observe', icon: '👁️', act: 'observe-precipitate' },

      'beaker': { label: 'Beaker', icon: '🥛', act: 'none' },
      'acid': { label: 'Acid Solution', icon: '🫙', act: 'add-acid' },
      'base': { label: 'Add Base', icon: '💧', act: 'add-base' },
      'ph-meter': { label: 'pH Meter', icon: '📟', act: 'measure-ph' },

      'funnel': { label: 'Funnel', icon: '🔻', act: 'setup-funnel' },
      'filter-paper': { label: 'Filter Paper', icon: '📄', act: 'setup-funnel' },
      'mixture': { label: 'Pour Mixture', icon: '🫗', act: 'pour-mixture' },

      'chemical-a': { label: 'CuSO₄ (Blue)', icon: '🟦', act: 'add-chemical-a' },
      'chemical-b': { label: 'Zn Powder', icon: '🌫️', act: 'add-chemical-b' },
      'heater': { label: 'Heater', icon: '🔥', act: 'heat' },
    }
    // Custom fallbacks for specific explicit actions
    if (id === 'observe') return { label: 'Observe', icon: '👁️', act: 'observe' }
    if (id === 'endpoint') return { label: 'Add Drop', icon: '💧', act: 'endpoint' }
    if (id === 'achieve-neutral') return { label: 'Achieve Neutral', icon: '⚖️', act: 'achieve-neutral' }
    if (id === 'collect-filtrate') return { label: 'Collect Filtrate', icon: '🫙', act: 'collect-filtrate' }
    if (id === 'observe-result') return { label: 'Examine', icon: '🔍', act: 'observe-result' }
    if (id === 'collect-gas') return { label: 'Gas Collector', icon: '🎈', act: 'collect-gas' }
    if (id === 'record') return { label: 'Record Obs.', icon: '✍️', act: 'record' }

    return map[id] || { label: id, icon: '📦', act: id }
  }

  // Derive interactive buttons directly from steps if equipment array is missing exact actions
  const actionKeys = experiment.steps.map(s => s.action)
  // Ensure we render the required actions even if equipment list is short
  const allActions = Array.from(new Set([...experiment.equipment, ...actionKeys]))

  return (
    <div className="eq-panel glass-card">
      <div className="panel-header">
        <span className="panel-icon">🧰</span>
        <h3>Lab Equipment</h3>
      </div>
      <p className="eq-subtitle">Click items to interact</p>

      <div className="eq-grid">
        {allActions.map((item, idx) => {
          const info = getEqInfo(item)
          if (info.act === 'none') return null

          const isNext = currentAction === info.act
          return (
            <motion.button
              key={idx}
              className={`eq-item ${isNext ? 'eq-item--highlight' : ''}`}
              onClick={() => onAction(info.act)}
              disabled={disabled}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              draggable={!disabled}
              onDragStart={(e) => handleDragStart(e, info.act)}
            >
              <div className="eq-item-icon">{info.icon}</div>
              <div className="eq-item-label">{info.label}</div>
              {isNext && <div className="eq-indicator"></div>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default EquipmentPanel
