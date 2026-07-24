


// external bib

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from "react-redux";



export default function BasicButtons({  date,loadingHH }) {

  const weather = useSelector((state)=>{
    return state.weather.weather
  })


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#002b7a",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          width: "60%",
          minWidth: 250,
          maxWidth: 500,
          backgroundColor: "#2157bb",
        }}
      >
        <CardContent>
          {/* Title  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom sx={{ fontSize: 30 }} color="primary">
              Algeria
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: 20, marginLeft: 2 }}
              color="primary"
            >
              {date}
            </Typography>
          </Box>
          {/* --Title--  */}
          <hr color="white" />

          {/* DEGRES and ICONS*/}
          <Box>
            {/* DEGRES */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* LEFT: temperature + icon */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {loadingHH ? (<CircularProgress aria-label="Loading…" />) : ("")}
                   
                  <Typography
                    color="primary"
                    variant="h2"
                    sx={{ m: 0, lineHeight: 1 }}
                  >
                    {weather.temper}
                  </Typography>
                  

                  

                  <img src={weather.icon}/>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    color="secondary"
                    variant="h6"
                    sx={{ m: 0, lineHeight: 1 }}
                  >
                    Max : {weather.max}
                  </Typography>
                  <Typography
                    color="secondary"
                    variant="h6"
                    sx={{ m: 0, lineHeight: 1 }}
                  >
                    Minimum : {weather.min}
                  </Typography>
                </Box>
              </Box>

              {/* RIGHT: another cloud */}
              <CloudIcon sx={{ fontSize: 150, color: "white" }} />
            </Box>
            {/* --DEGRES and ICONS-- */}
          </Box>
        </CardContent>
      </Card>

      {/* Button */}
      {/* <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: "10px"
        }}
      >
        <Button variant="text">Arabic</Button>
      </Box> */}

      {/* --Button-- */}
    </Box>
  );
}
