import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import loadingGif from "../assets/loading.gif";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import FirmModal from "../components/FirmModal";
import EditFirmModal from "../components/EditFirmModal";

const Firms = () => {
  const { getFirms, firmDelete } = useStockRequest();
  const { firms, loading, error } = useSelector((state) => state.firms);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  //const [open, setOpen] = useState(false);

  useEffect(() => {
    getFirms();
  }, []);
  const handleEdit = (firm) => {
    setSelectedFirm(firm);
    setEditOpen(true);
  };

  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>FIRMS</h1>

      {loading && <img src={loadingGif} alt="gif" width={250} />}

      {error && (
        <Typography variant="h4" color="error" component="div">
          Oops Somehing went wrong
        </Typography>
      )}

      {selectedFirm && (
        <EditFirmModal
          firm={selectedFirm}
          open={editOpen}
          setOpen={setEditOpen}
        />
      )}

      <FirmModal />

      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {firms?.map((item) => (
          <Card
            key={item._id}
            sx={{
              maxWidth: 300,
              m: 5,
              maxHeight: 600,
              textAlign: "center",
              boxShadow: "2px 2px 10px black",
            }}
          >
            <Typography gutterBottom variant="h5" component="div" mt={2} p={2}>
              {item?.name}
            </Typography>
            <CardMedia
              component="img"
              height="250"
              image={item?.image}
              alt="img"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item?.address}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item?.phone}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button size="small" onClick={() => firmDelete(item._id)}>
                🗑Delete
              </Button>

              <Button
                size="small"
                href={item?.url}
                target="_blank"
                onClick={() => handleEdit(item)}
              >
                🖊Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Firms;
