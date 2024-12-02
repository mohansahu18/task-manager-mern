import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TaskModal({ task, setShowModal }) {
  console.log("modaltask status:", task.status);
  console.log("modaltask title:", task);

  return (
    <Dialog
      open={true}
      onClose={() => setShowModal(false)}
      maxWidth="sm"
      fullWidth
    >
      <Paper elevation={3}>
        <DialogTitle>
          <Typography variant="h5" component="div" fontWeight="bold">
            Title - {task.title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
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
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Typography variant="body1">
              {" "}
              description - {task.description}
            </Typography>
            <Box>
              <Typography variant="body1">
                {" "}
                due date - {task.due_date.split("T")[0]}
              </Typography>
              <Chip
                label={task.status}
                color={task.status === "completed" ? "success" : "warning"}
                sx={{ alignSelf: "flex-start" }}
              />
            </Box>
          </Box>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default TaskModal;
