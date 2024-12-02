import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, updateTaskStatus, deleteTask } from "../api.js";
import TaskModal from "../components/Modal/TaskModal.jsx";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const tasks = await getTasks(token);
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const filteredArray = filterArray(tasks, status?.value, priority?.value);
      setSortedTasks(filteredArray);
    } else {
      setSortedTasks([]);
    }
  }, [priority, status, tasks]);

  const handleClickTask = (task) => {
    setShowModal(true);
    setTaskSelected(task);
  };

  const handleTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem("token");
    await updateTaskStatus(taskId, newStatus, token);
    const updatedTasks = await getTasks(token);
    setTasks(updatedTasks);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    await deleteTask(taskId, token);
    const updatedTasks = await getTasks(token);
    setTasks(updatedTasks);
  };

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  const handleReset = () => {
    setPriority(null);
    setStatus(null);
  };

  const filterArray = (arr, status, priority) => {
    return arr.filter((item) => {
      const statusMatch = !status || item.status === status;
      const priorityMatch = !priority || item.priority === priority;
      return statusMatch && priorityMatch;
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Tasks
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Filter:</Typography>
            <Autocomplete
              value={priority}
              onChange={(event, newValue) => {
                setPriority(newValue);
              }}
              options={priorityOptions}
              renderInput={(params) => (
                <TextField {...params} label="Priority" />
              )}
              sx={{ width: 200 }}
            />
            <Autocomplete
              value={status}
              onChange={(event, newValue) => {
                setStatus(newValue);
              }}
              options={statusOptions}
              renderInput={(params) => <TextField {...params} label="Status" />}
              sx={{ width: 200 }}
            />
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset Filter
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/task")}
            >
              Create Task
            </Button>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography align="center">No tasks</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sortedTasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell onClick={() => handleClickTask(task)}>
                      {task.title}
                    </TableCell>
                    <TableCell>{task.due_date.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Autocomplete
                        value={statusOptions.find(
                          (option) => option.value === task.status
                        )}
                        onChange={(event, newValue) =>
                          handleTaskStatus(task._id, newValue?.value)
                        }
                        options={statusOptions}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: 200 }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          task.priority === "high"
                            ? "error.main"
                            : task.priority === "medium"
                            ? "warning.main"
                            : "success.main",
                        fontWeight: "bold",
                      }}
                    >
                      {task.priority}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Read More">
                        <IconButton
                          onClick={() => handleClickTask(task)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => navigate(`/task/${task._id}`)}
                          color="secondary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(task._id);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {showModal && (
        <TaskModal setShowModal={setShowModal} task={taskSelected} />
      )}
    </Box>
  );
};

export default HomeScreen;
