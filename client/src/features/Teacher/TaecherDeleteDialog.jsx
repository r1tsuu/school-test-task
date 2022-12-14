import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const TeacherDeleteDialog = ({
  name,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Ви дійсно хочете видалити викладача {name}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Ні</Button>
        <LoadingButton loading={isLoading} onClick={onSubmit}>
          Так
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
