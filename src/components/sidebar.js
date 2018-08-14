import React from 'react'

const Sidebar = ({ visible, onExit }) => {
  return (
    <div id="sidebar" 
      className={ visible ? 'visible' : 'collapsed'} 
      onClick={onExit}>
      <h1 style={{color: 'darkmagenta', margin: '0.5em auto', width: '60%', fontWeight: '800'}}>
        Cosmic 
        <span style={{ display: 'block' }}>Byte</span>
      </h1>
      <ul className="sidebar-links">
        <li className="sidebar-primary">Startups</li>
        <li className="sidebar-primary">Enterprise</li>
        <li className="sidebar-primary">Mobile</li>
        <li className="sidebar-primary">Security</li>
        <li className="sidebar-divider">---</li>
        <li className="sidebar-secondary">About</li>
        <li className="sidebar-secondary">All</li>
      </ul>
    </div>
  )
}

export default Sidebar