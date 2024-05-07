import React, { useEffect } from "react";
import useStockRequest from "../services/useStockRequest";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";

const Firms = () => {
  const { getFirms } = useStockRequest();
  const { firms, loading, error } = useSelector((state) => state.firm);

  useEffect(() => {
    getFirms();
  }, []);

  return (
    <>
      {/* {loading && <img src={loadingGif} alt="gif" />} */}

      {/* {error && (
        <Typography variant="h4" color="error" component="div">
          Oops Somehing went wrong
        </Typography>
      )} */}

      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {firms?.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 345, m: 5, maxHeight: 600 }}>
            <CardMedia
              component="img"
              height="250"
                image={item?.image}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" href={item?.id} target="_blank">
                Detail
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Firms;
