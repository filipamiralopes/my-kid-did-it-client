import "./PreviewPage.css";

import React from "react";

const PreviewPage = ({ currentOrder }) => {

  if (!currentOrder.mergedImg) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={currentOrder?.mergedImg} alt="order to preview" />
    </div>
  );
};

export default PreviewPage;
