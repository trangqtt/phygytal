import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader = ({ open = false }) => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default BackdropLoader
