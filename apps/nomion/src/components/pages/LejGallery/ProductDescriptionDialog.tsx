import Button from "@/components/common/Button/Button";
import LineText from "@/components/common/LineText";
import { CloseIcon } from "@/components/common/icons";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { FC } from "react";
import parse from "html-react-parser";
import { styled } from '@mui/material/styles';

export type ProductDescriptionDialogProps = {
  isViewMoreDescription: boolean;
  onCloseViewMore(): void;
  description: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper	': {
    backgroundColor: "#000000"
  },
  '& .MuiDialogContent-root	': {
    paddingTop: "80px",
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  },
}));

const ProductDescriptionDialog: FC<ProductDescriptionDialogProps> = (props) => {
  const { isViewMoreDescription, onCloseViewMore, description } = props

  return (
    <BootstrapDialog
      open={isViewMoreDescription}
      fullScreen
    >
      <DialogContent>
        <div className="flex w-full justify-end">
          <IconButton
            className="h-[35px] w-[35px] bg-[#454545]"
            onClick={onCloseViewMore}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <LineText content="ý nghĩa" />
        <div className="craftmen-quote max-h-[180px] overflow-y-scroll pr-[5px] text-justify text-[16px] font-light italic leading-[20px] text-[#8c8c8c]">
          {parse(description)}
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ProductDescriptionDialog;
