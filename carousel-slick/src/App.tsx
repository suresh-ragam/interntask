import { useRef } from "react";
import Slider from "react-slick";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import data from "./Data";

const App = () => {
  const sliderRef = useRef<Slider>(null);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, //hides default arrows
    // accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <>
      <h2>Success Stories</h2>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        gap={1}
        width='100%'
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

        <Box flex={1} maxWidth="1200px" width='100%' overflow='hidden'>
          <Slider ref={sliderRef} {...settings}>
            {data.map((item) => (
              <div key={item.id} className="slick-slide-gap">
                <Card
                  sx={{
                    maxWidth: 300,
                    margin: "0 auto",
                    borderRadius: 6,
                    overflow: "hidden",
                    boxShadow: 4,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "rgb(58, 60, 58)",
                        color: "rgb(54, 255,54)",
                        px: 2,
                        py: 0.5,
                        borderRadius: "16px",
                        fontSize: "0.90rem",
                        fontWeight: 700,
                        letterSpacing: 1,
                        zIndex: 2,
                        boxShadow: 1,
                        pointerEvents: "none",
                      }}
                    >
                      Success
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.src}
                    alt={item.alt}
                    sx={{
                      objectFit: "cover",
                    }}
                  />

                  <CardContent
                    sx={{
                      background:
                        "linear-gradient(155deg, #330a50 0%,rgb(77, 31, 109) 50%, #8027b8 100%)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "150px",
                    }}
                  >
                    <Typography variant="h6">{item.date_title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      {item.name_title}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ mt: 1.5, opacity: 0.8 }}
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="h6">{item.designation}</Typography>
                  </CardContent>
                </Card>
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
            width: 48,
            height: 48,
            boxShadow: 2,
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
