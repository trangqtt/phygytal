import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader = ({ isOpen = false }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader
