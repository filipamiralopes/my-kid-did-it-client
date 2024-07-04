import "./HomePage.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import kidDrawingImg from "../../assets/kid-drawing.jpeg";
import productsImg from "../../assets/products.jpeg";
import dadImg from "../../assets/happy-dad-kid.jpeg";
import shipOrderImg from "../../assets/ship-order.jpeg";

const steps = [
  {
    label: "Let your kiddo be a Picasso",
    imgPath: kidDrawingImg,
  },
  {
    label: "Choose your product",
    imgPath: productsImg,
  },
  {
    label: "We produce and ship your order",
    imgPath: shipOrderImg,
  },
  {
    label: "Enjoy your child's art",
    imgPath: dadImg,
  },
];

const HomePage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <div className="home-page-container">
        <div className="headers">
          <h1>Customize</h1>
          <p>
            Make your kid's masterpieces unforgettable <br />
            with custom prints
          </p>
          <div className="start-drawing-button">
            <Link to="/canvas">
              <button>Start drawing</button>
            </Link>
          </div>
        </div>
        <div className="carousel">
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
              }}
            >
              <Typography>{steps[activeStep].label}</Typography>
            </Paper>
            <Box
              component="img"
              sx={{
                // height: 255,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                width: "100%",
              }}
              src={steps[activeStep].imgPath}
              alt={steps[activeStep].label}
            />
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  sx={{ color: "#242424"}}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: "#242424"}}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default HomePage;
