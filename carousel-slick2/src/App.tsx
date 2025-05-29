import { useRef } from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import BusinessIcon from "./images/BussinessIcon.svg";
import LogoBadge from "./images/LogoBadge.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import data from "./Data";

const App = () => {
  const sliderRef = useRef<Slider>(null);
  const isMobile = useMediaQuery("(max-width:450px)");

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, //hides default arrows
    // accessibility: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <>
      {/* button view more aligned at top right. */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        width="100%"
        sx={{ mt: 6 }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            backgroundColor: "purple",
            color: "#fff",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#7b1fa2" },
            width: 40,
            height: 40,
            minWidth: 40,
            minHeight: 40,
            boxShadow: 2,
            flexShrink: 0,
          }}
          aria-label="previous"
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          flex={1}
          maxWidth="1200px"
          width="100%"
          overflow="hidden"
          sx={{ position: "relative", pt: 4 }}
        >
          <Slider ref={sliderRef} {...settings}>
            {data.map((item) => (
              <div key={item.id} className="slick-slide-gap">
                <Box
                  sx={{ position: "relative", width: "100%", height: isMobile ? 325 : 250, top: isMobile ? 0 : -11, mb: 2, }}
                >
                  {/* Tilted Border codee */}
                  <Box 
                    sx ={{
                      position: 'absolute',
                      top: isMobile ? 2 : 8,
                      left: isMobile ? -7 : -15,
                      width: '100%', height: '100%',
                      border: '2px solid #9C27B0',
                      borderRadius: 5,
                      transform: isMobile ? 'rotate(-1deg)' : 'rotate(-3deg)',
                      zIndex: 1,
                      pointerEvents: 'none',
                      boxSizing: 'border-box',
                      background: 'transparent',
                    }}
                  />
                  <Card
                    sx={{
                      maxWidth: isMobile ? 350 : 800,
                      width: "100%",
                      margin: "0 auto",
                      borderRadius: 5,
                      overflow: "visible",
                      zIndex: 2,
                      position: "relative",
                      height: isMobile ? 320 : 250,
                      display: "flex",
                      flexDirection: "column",
                      background: 'transparent',
                      boxShadow: 2,
                      opacity: 0.95
                    }}
                  >
                    <CardContent
                      sx={{
                        background:
                          "linear-gradient(160deg,rgb(133, 129, 235) 0%,rgb(80, 77, 167) 50%,rgb(152, 40, 172) 100%)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        flex: 1,
                        padding: isMobile ? 1 : 0,
                        width: "100%",
                        boxSizing: "border-box",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      {isMobile ? (
                        //mobile layout codde
                        <>
                        <Box 
                          sx={{
                            position:"absolute",
                            top: -21,
                            //right
                            //left
                            background:
                              "linear-gradient(160deg,rgb(133, 129, 235) 0%,rgb(80, 77, 167) 50%,rgb(152, 40, 172) 100%)",
                            borderRadius: "50%",
                            boxShadow: 2,
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 3,
                            border: "8px solid black",
                            pointerEvents: "none",
                          }}
                        >
                          <img 
                            src={BusinessIcon}
                            alt="Business"
                            style={{ width: 20 }}
                          />
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1} mt={4.5}>
                          <Typography variant="h6">{item.jobTitle}</Typography>
                          <Box
                            sx={{
                              position: "relative",
                              width: 50,
                              height: 50,
                            }}
                          >
                            <img
                              src={LogoBadge}
                              alt="Logo badge"
                              style={{
                                width: 50,
                                height: 50,
                                margin: "0 auto",
                                display: "block",
                              }}
                            />
                            <img
                              src={item.logo}
                              alt="company logo"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: 25,
                                height: 25,
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                              }}
                            />
                          </Box>
                          <Typography sx={{ fontSize: "12px" }}>
                            <WorkOutlineOutlinedIcon
                              sx={{ fontSize: "12px" }}
                            />{" "}
                            Experience: {item.experience}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <LocationOnOutlinedIcon sx={{ fontSize: "12px" }} />{" "}
                            Location: {item.location}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <BusinessCenterOutlinedIcon
                              sx={{ fontSize: "12px" }}
                            />{" "}
                            Job Type: {item.jobType}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <DateRangeOutlinedIcon sx={{ fontSize: "12px" }} />{" "}
                            Drive Date: {item.driveDate}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                            {item.skills &&
                              item.skills.map((skill: string) => (
                                <Chip
                                  key={skill}
                                  label={skill}
                                  variant="filled"
                                  sx={{
                                    backgroundColor: '#e3f2fd',
                                    color: '#4F8EF7',
                                    fontSize: "9px",
                                    "& .MuiChip-label": {
                                      fontSize: "9px",
                                    },
                                    height: 20,
                                  }}
                                />
                              ))}
                          </Box>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            sx={{
                              fontSize: "9px",
                              textTransform: "none",
                              // alignSelf: "flex-end",
                              mt: 1,
                              p: 0.4,
                              minWidth: 180,
                              width: '100%',
                            }}
                          >
                            Enroll As A Jobseeker
                          </Button>
                        </Box>
                        </>
                      ) : (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{ mt: 5 }}
                      >
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Typography variant="h6">{item.jobTitle}</Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <WorkOutlineOutlinedIcon
                              sx={{ fontSize: "12px" }}
                            />{" "}
                            Experience: {item.experience}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <LocationOnOutlinedIcon sx={{ fontSize: "12px" }} />{" "}
                            Location: {item.location}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <BusinessCenterOutlinedIcon
                              sx={{ fontSize: "12px" }}
                            />{" "}
                            Job Type: {item.jobType}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            <DateRangeOutlinedIcon sx={{ fontSize: "12px" }} />{" "}
                            Drive Date: {item.driveDate}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                            {item.skills &&
                              item.skills.map((skill: string) => (
                                <Chip
                                  key={skill}
                                  label={skill}
                                  variant="filled"
                                  sx={{
                                    backgroundColor: '#e3f2fd',
                                    color: '#4F8EF7',
                                    fontSize: "9px",
                                    "& .MuiChip-label": {
                                      fontSize: "9px",
                                    },
                                    height: 20,
                                  }}
                                />
                              ))}
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            position: "absolute",
                            top: -21,
                            right: -22,
                            background:
                              "linear-gradient(160deg,rgb(133, 129, 235) 0%,rgb(80, 77, 167) 50%,rgb(152, 40, 172) 100%)",
                            borderRadius: "50%",
                            boxShadow: 2,
                            width: 64,
                            height: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            border: "8px solid black",
                            pointerEvents: "none",
                          }}
                        >
                          <img
                            src={BusinessIcon}
                            alt="Business"
                            style={{ width: 30 }}
                          />
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={2}
                          sx={{
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: 100,
                              height: 100,
                            }}
                          >
                            <img
                              src={LogoBadge}
                              alt="Logo badge"
                              style={{
                                width: 100,
                                height: 100,
                                margin: "0 auto",
                                display: "block",
                              }}
                            />
                            <img
                              src={item.logo}
                              alt="company logo"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: 32,
                                height: 32,
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                              }}
                            />
                          </Box>

                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            sx={{
                              fontSize: "9px",
                              textTransform: "none",
                              alignSelf: "flex-end",
                              mt: 1,
                              p: 0.4,
                            }}
                          >
                            Enroll As A Jobseeker
                          </Button>
                        </Box>
                      </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
                
              </div>
            ))}
          </Slider>
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: "purple",
            color: "#fff",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#7b1fa2" },
            width: 40,
            height: 40,
            minWidth: 40,
            minHeight: 40,
            boxShadow: 2,
            flexShrink: 0,
          }}
          aria-label="next"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default App;
