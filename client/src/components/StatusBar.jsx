import { motion } from 'framer-motion'
import './StatusBar.css'

const StatusBar = ({ ph, volume, instruction }) => {
  return (
    <div className="status-bar glass-card">
      <div className="status-metrics">
        <div className="metric">
          <span className="metric-label">pH Level</span>
          <div className="metric-value">
            <span style={{ color: getPhColor(ph) }}>{ph.toFixed(1)}</span>
          </div>
        </div>

        <div className="metric">
          <span className="metric-label">Volume</span>
          <div className="metric-value">
            <span>{volume}</span> <span className="unit">mL</span>
          </div>
        </div>
      </div>

      <div className="status-instruction">
        <span className="instruction-icon">📋</span>
        <motion.span
          key={instruction}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="instruction-text"
        >
          {instruction}
        </motion.span>
      </div>
    </div>
  )
}

const getPhColor = (ph) => {
  if (ph <= 3) return '#ff4444'
  if (ph <= 5) return '#ffaa00'
  if (ph === 7) return '#00ff88'
  if (ph <= 9) return '#00ccff'
  return '#8800ff'
}

export default StatusBar
