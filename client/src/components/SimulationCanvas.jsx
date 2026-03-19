import { motion, AnimatePresence } from 'framer-motion'
import './SimulationCanvas.css'

const SimulationCanvas = ({ experimentId, simState, currentStep, done }) => {

  const renderSimulation = () => {
    switch (experimentId) {
      case 'acid-base-titration':
        return <TitrationSim state={simState} done={done} />
      case 'ph-testing-indicators':
        return <PhTestingSim state={simState} done={done} />
      case 'precipitation-reaction':
        return <PrecipitationSim state={simState} done={done} />
      case 'neutralization-reaction':
        return <NeutralizationSim state={simState} done={done} />
      case 'filtration-precipitate':
        return <FiltrationSim state={simState} done={done} />
      case 'chemical-mixing-reactions':
        return <ChemicalMixingSim state={simState} done={done} />
      default:
        return null
    }
  }

  return (
    <div className="simulation-canvas">
      <div className="sim-label">🔬 Lab Workspace</div>
      <div className="sim-workspace">
        {renderSimulation()}
      </div>
    </div>
  )
}

/* ─── Titration Simulation ─── */
const TitrationSim = ({ state, done }) => (
  <div className="sim-scene">
    {/* Burette */}
    <div className="burette-container">
      <div className="burette-clamp" />
      <div className="burette">
        <div className="burette-body glass-vessel">
          <div className="burette-liquid" style={{
            height: state.hasNaOH ? `${30 + state.drops * 2}%` : '0%',
            background: 'linear-gradient(180deg, #a8d5ff, #6bb8ff)',
            transition: 'height 1s ease'
          }} />
        </div>
        <div className="burette-tip" />
      </div>
      {/* Drip animation */}
      <AnimatePresence>
        {state.hasNaOH && (
          <motion.div
            className="drip"
            key="drip"
            initial={{ y: 0, opacity: 1, scaleY: 0.5 }}
            animate={{ y: 100, opacity: [1, 1, 0], scaleY: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>
    </div>

    {/* Flask */}
    <div className="flask-container">
      <div className="flask">
        <div className="flask-neck" />
        <div className="flask-body glass-vessel">
          <motion.div
            className="flask-liquid"
            animate={{
              height: state.hasHCl ? '55%' : '10%',
              backgroundColor: state.color,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Indicator drops */}
          {state.hasIndicator && (
            <div className="indicator-drops">
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} className="indicator-dot"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
          {/* Bubbles */}
          {done && [1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="bubble"
              initial={{ y: 0, opacity: 0.8, x: Math.random() * 20 - 10 }}
              animate={{ y: -60, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </div>
      <div className="flask-stand" />
    </div>

    {/* Labels */}
    {state.hasHCl && <div className="sim-label-small sim-label--hcl">HCl (aq)</div>}
    {state.hasNaOH && <div className="sim-label-small sim-label--naoh">NaOH</div>}
    {done && <motion.div className="endpoint-label" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>✓ Equivalence Point Reached!</motion.div>}
  </div>
)

/* ─── pH Testing Simulation ─── */
const PhTestingSim = ({ state, done }) => (
  <div className="sim-scene sim-scene--centered">
    <div className="test-tube-rack">
      {['Acidic (pH 2)', 'Neutral (pH 7)', 'Basic (pH 12)'].map((label, i) => {
        const colors = ['#ff4444', '#44ff88', '#4444ff']
        const heights = ['60%', '60%', '60%']
        return (
          <div key={i} className="test-tube-wrapper">
            <div className="test-tube glass-vessel">
              <motion.div
                className="test-tube-liquid"
                animate={{
                  height: state.volume > 0 ? heights[i] : '0%',
                  backgroundColor: state.hasIndicator ? colors[i] : '#e8f4f8',
                }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            </div>
            <div className="test-tube-label">{label}</div>
          </div>
        )
      })}
    </div>
    {state.hasIndicator && (
      <motion.div className="ph-color-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="ph-strip">
          {['#ff0000','#ff6600','#ffcc00','#ccff00','#00ff88','#00ccff','#0044ff','#8800ff'].map((c,i) => (
            <div key={i} style={{ background: c, flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', bottom: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'var(--text-muted)' }}>{i+1}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 20 }}>pH Scale 1–14</div>
      </motion.div>
    )}
  </div>
)

/* ─── Precipitation Simulation ─── */
const PrecipitationSim = ({ state, done }) => (
  <div className="sim-scene">
    <div className="flask-container">
      <div className="flask">
        <div className="flask-neck" />
        <div className="flask-body glass-vessel">
          <motion.div
            className="flask-liquid"
            animate={{
              height: state.volume > 0 ? '50%' : '10%',
              backgroundColor: state.color,
            }}
            transition={{ duration: 0.8 }}
          />
          {/* Precipitate */}
          <AnimatePresence>
            {state.hasPrecipitate && (
              <motion.div
                className="precipitate"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: '16%', opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="precipitate-particle" style={{
                    left: `${Math.random() * 90}%`,
                    bottom: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`
                  }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flask-stand" />
    </div>
    {state.hasPrecipitate && (
      <motion.div className="endpoint-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        ⬇️ AgCl↓ White Precipitate Formed
      </motion.div>
    )}
  </div>
)

/* ─── Neutralization Simulation ─── */
const NeutralizationSim = ({ state, done }) => (
  <div className="sim-scene">
    <div className="beaker-container">
      <div className="beaker glass-vessel">
        <motion.div
          className="beaker-liquid"
          animate={{
            height: state.volume > 0 ? '60%' : '0%',
            backgroundColor: state.color,
          }}
          transition={{ duration: 0.8 }}
        />
        {/* pH meter probe */}
        {state.ph !== 7 && (
          <div className="ph-probe">
            <div className="ph-probe-wire" />
            <div className="ph-probe-tip" />
          </div>
        )}
        {done && [1, 2, 3, 4].map(i => (
          <motion.div key={i} className="bubble" style={{ left: `${20 + i * 20}%` }}
            initial={{ y: 0, opacity: 0.8 }}
            animate={{ y: -80, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
      <div className="beaker-stand" />
    </div>
    <div className="ph-display glass-card" style={{ borderColor: state.ph === 7 ? 'rgba(0,255,136,0.4)' : 'var(--border-glass)' }}>
      <div className="ph-value" style={{ color: getPhColor(state.ph) }}>
        pH {state.ph.toFixed(1)}
      </div>
      <div className="ph-label" style={{ color: state.ph === 7 ? 'var(--neon-green)' : 'var(--text-secondary)' }}>
        {state.ph === 7 ? '✓ Neutral' : state.ph < 7 ? 'Acidic' : 'Basic'}
      </div>
    </div>
  </div>
)

/* ─── Filtration Simulation ─── */
const FiltrationSim = ({ state, done }) => (
  <div className="sim-scene sim-scene--centered">
    <div className="filtration-setup">
      {/* Funnel */}
      <div className="funnel-container">
        <div className="funnel">
          <div className="funnel-top glass-vessel">
            {state.filtrationDone && (
              <motion.div className="funnel-liquid" initial={{ height: '50%' }} animate={{ height: '5%' }} transition={{ duration: 2, ease: 'easeIn' }} style={{ background: '#98c8d4' }} />
            )}
            {/* Filter paper visual */}
            <div className="filter-paper" />
            {state.precipitateFiltered && <div className="filtered-residue">AgCl</div>}
          </div>
          <div className="funnel-stem" />
        </div>
      </div>
      {/* Drip to beaker */}
      {state.filtrationDone && (
        <motion.div className="filtrate-drip"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {/* Beaker */}
      <div className="small-beaker glass-vessel">
        <motion.div
          className="beaker-liquid"
          animate={{ height: state.filtrationDone ? '40%' : '0%', backgroundColor: '#d4eef5' }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
        />
      </div>
    </div>
    {done && <motion.div className="endpoint-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ Filtration Complete! Clear filtrate collected.</motion.div>}
  </div>
)

/* ─── Chemical Mixing Simulation ─── */
const ChemicalMixingSim = ({ state, done }) => (
  <div className="sim-scene">
    <div className="flask-container">
      <div className="flask">
        <div className="flask-neck" />
        <div className="flask-body glass-vessel">
          <motion.div className="flask-liquid"
            animate={{ height: state.volume > 0 ? '55%' : '10%', backgroundColor: state.color }}
            transition={{ duration: 0.8 }}
          />
          {/* Bubbles from heating */}
          <AnimatePresence>
            {state.bubbles && [1,2,3,4,5].map(i => (
              <motion.div key={i} className="bubble"
                style={{ left: `${15 + i * 14}%`, width: 6 + i * 2, height: 6 + i * 2 }}
                initial={{ y: 0, opacity: 0.9 }}
                animate={{ y: -120, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </AnimatePresence>
          {/* Copper deposits */}
          {state.chemicalB && (
            <motion.div className="copper-deposit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      </div>
      {/* Heater */}
      {state.heated && (
        <motion.div className="heater"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="heater-coil" />
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="heat-wave"
              animate={{ scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      )}
      <div className="flask-stand" />
    </div>
    {state.chemicalB && !state.chemicalA && null}
    {state.chemicalB && <motion.div className="endpoint-label sim-label--reaction" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Zn + CuSO₄ → ZnSO₄ + Cu↓
    </motion.div>}
  </div>
)

const getPhColor = (ph) => {
  if (ph <= 3) return '#ff4444'
  if (ph <= 5) return '#ffaa00'
  if (ph === 7) return '#00ff88'
  if (ph <= 9) return '#00ccff'
  return '#8800ff'
}

export default SimulationCanvas
