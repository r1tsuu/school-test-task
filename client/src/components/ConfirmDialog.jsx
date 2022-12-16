import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Ні</Button>
        <Button onClick={onConfirm}>Так</Button>
      </DialogActions>
    </Dialog>
  );
};
