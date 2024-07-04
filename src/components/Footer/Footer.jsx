import "./Footer.css";
import AppBar from "@mui/material/AppBar";

const Footer = () => {
  return (
    <div className="footer">
      <a
        href="https://github.com/filipamiralopes/my-kid-did-it-client"
        target="_blank"
      >
        <p id="rights-reserved">©2024 MyKidDidIt. All rights reserved</p>
      </a>
      <p>
        <a href="https://www.linkedin.com/in/filipamiralopes/" target="_blank">
          Contact Us
        </a>
        &ensp;&ensp;&ensp; FAQs &ensp;&ensp;&ensp; Terms and
        Conditions&ensp;&ensp;
      </p>
    </div>
  );
};

export default Footer;
