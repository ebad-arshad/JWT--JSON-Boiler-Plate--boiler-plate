import axios from 'axios'
import React from 'react'

const Dashboard = () => {

  const logOutBtn = () => {
    localStorage.clear('token')
    window.location.reload()
  }

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={logOutBtn}>Log out</button>
    </div>
  )
}

export default Dashboard