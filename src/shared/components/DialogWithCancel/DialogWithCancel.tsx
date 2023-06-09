import { PropsWithChildren } from "react";
import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

export interface DialogWithCancelProps {
  isOpen: boolean;
  close: (e: any) => void;
}

const DialogWithCancel = ({
  isOpen,
  close,
  children,
}: PropsWithChildren<DialogWithCancelProps>) => {
  return (
    <Dialog
      open={isOpen}
      maxWidth="xl"
      fullWidth
      onClose={(e, reason) => {
        if (reason === "escapeKeyDown") close(e);
      }}
    >
      <DialogContent data-testid="dialog-content">
        <Box display="flex" justifyContent="flex-end">
          <IconButton color="primary" onClick={(e) => close(e)}>
            <Close />
          </IconButton>
        </Box>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithCancel;
