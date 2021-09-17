import React from 'react'
import './ProgressBar.css'

function ProgressBar({ percent }) {
  // let percent = 40

  return (
    <div className="progress-bar-boundary">
      <div style={{ width: `${percent}%` }}>{percent}</div>
    </div>
  )
}

export default ProgressBar
