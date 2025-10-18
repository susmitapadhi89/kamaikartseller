import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";

// Confirmation Modal Component
export const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Yes, delete it",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          maxWidth: "500px",
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center" }}>
        <DeleteIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="h6" component="span" fontWeight="bold">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 3 }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: "8px", px: 3 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ borderRadius: "8px", px: 3 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
