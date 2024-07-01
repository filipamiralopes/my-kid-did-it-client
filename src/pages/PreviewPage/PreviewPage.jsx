import "./PreviewPage.css"

import React from 'react'

const PreviewPage = ({currentOrder}) => {
  return (
    <div>
        <img src={currentOrder?.mergedImg} alt="order to preview"/>
    </div>
  )
}

export default PreviewPage