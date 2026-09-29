import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Note: intentionally not using <StrictMode> — its dev-only double
// invocation of effects corrupts GSAP ScrollTrigger pin measurements
// (each pinned section's spacer height gets computed twice, producing
// wrong scroll offsets). Production builds never double-invoke anyway.
createRoot(document.getElementById('root')).render(<App />)
