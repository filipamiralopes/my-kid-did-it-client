import React, { useState, useEffect } from 'react';
import "./AnimatedPrice.css"; // We'll create this CSS file next

const AnimatedText = ({ show, price }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000); // Adjust time as needed
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return <div className="animated-text"> €{price} 💸</div>;
};

export default AnimatedText;