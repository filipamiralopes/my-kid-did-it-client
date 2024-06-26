import React from 'react'
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>My Kid Did It</h1>
      <h3>Custom embroidery</h3>
      <Link to="/canvas"><h5>Live design!</h5></Link>
    </div>
  )
}

export default HomePage