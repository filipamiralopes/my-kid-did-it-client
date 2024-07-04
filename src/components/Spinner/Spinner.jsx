import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <div>
      <Box sx={{ display: "flex" ,justifyContent: "center", mt: 10}}>
        <CircularProgress sx={{ color: "#242424" }} />
      </Box>
    </div>
  );
}
