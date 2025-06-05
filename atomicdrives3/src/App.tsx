import "./App.css";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import { aimlIcons } from "./data";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg,rgb(62, 15, 77), rgb(62, 15, 77), rgb(125, 54, 149))",
          py: 4,
          px: 2,
        }}
      >
        {/* Parent Flex Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: "1200px",
            gap: 4,
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={100}
              textAlign="center"
              sx={{ color: "white" }}
            >
              Hire Top AI/ML Top Talent in One Day!
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: "white" }}>
              Powered by Our AI/ML Atomic Marketplace and Recruitment
              drive-as-a-Service.
            </Typography>

            {/* Icons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 4,
                mt: 3,
              }}
            >
              {aimlIcons.map((icon, index) => (
                <Box
                  key={icon.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 100,
                  }}
                >
                  {index < 4 && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1 }}
                    >
                      {icon.label}
                    </Typography>
                  )}
                  <img
                    src={icon.src}
                    alt={icon.label}
                    style={{ width: 80, height: 80 }}
                  />
                  {index >= 4 && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mt: 1 }}
                    >
                      {icon.label}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
            <br />
            <br />
            <Typography variant="subtitle2" sx={{ mt: 1, color: "#39ff14" }}>
              Don't Miss Our Next Wave of AI/ML Talent!
            </Typography>
          </Box>

          {/* Right Section (Form) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={50}
              textAlign="center"
              sx={{ mb: 2, color: "white" }}
            >
              Register for Drive
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 8,
                width: "100%",
                background:
                  "linear-gradient(180deg,rgb(87, 20, 120), rgb(87, 20, 120), rgb(163, 120, 177))",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, color: "blue" }}
                display="flex"
              >
                You can reach us at anytime!
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
                noValidate
                autoComplete="off"
              >
                {[
                  "Full Name",
                  "Designation",
                  "Company",
                  "Verify Email ID",
                  "Phone Number",
                  "Hiring For Role",
                  "Drive Date",
                ].map((placeholder) => (
                  <TextField
                    key={placeholder}
                    variant="outlined"
                    placeholder={placeholder}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 0.5,
                      },
                      borderRadius: 5,
                    }}
                    InputProps={{ sx: { borderRadius: 8 } }}
                  />
                ))}
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 5,
                    color: "white",
                    background:
                      "linear-gradient(180deg, rgb(215, 151, 230), rgb(84, 52, 100), rgb(95, 144, 172))",
                    "&:hover": {
                      background:
                        "linear-gradient(180deg, rgb(195, 131, 210), rgb(74, 42, 90), rgb(85, 134, 162))",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
