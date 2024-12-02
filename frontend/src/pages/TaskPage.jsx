// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getTasks, createTask, updateTask, deleteTask } from '../api';
// import { convertDateFormat } from '../helper/formateDate';

// const TaskScreen = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [task, setTask] = useState(null);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('low');
//     const [status, setStatus] = useState('pending');

//     useEffect(() => {
//         if (id) {
//             const fetchTask = async () => {
//                 const token = localStorage.getItem('token');
//                 const tasks = await getTasks(token);
//                 const task = tasks.find(t => t._id === id);
//                 // const formattedDate = convertDateFormat(task.due_date)

//                 if (task) {
//                     setTask(task);
//                     setTitle(task.title);
//                     setDescription(task.description);
//                     setDueDate(task.due_date);
//                     setPriority(task.priority);
//                     setStatus(task.status);
//                 }
//             };
//             fetchTask();
//         }
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');

//         const taskData = {
//             title,
//             description,
//             due_date: dueDate,
//             priority,
//             status,
//         };
//         console.log(id,"id sads")
//             if(id){
//                 await updateTask(id, taskData, token);
//             }else{
//             await createTask(taskData, token);
//             }
//             navigate('/');

//     };

//     const handleCancel = async () => {

//         navigate('/');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     {id ? 'Edit Task' : 'Create Task'}
//                 </h2>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div>
//                             <label htmlFor="title" className="sr-only">Title</label>
//                             <input
//                                 id="title"
//                                 name="title"
//                                 type="text"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Title"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="description" className="sr-only">Description</label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Description"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="dueDate" className="sr-only">Due Date</label>
//                             <input
//                                 id="dueDate"
//                                 name="dueDate"
//                                 type="date"
//                                 value={dueDate}
//                                 onChange={(e) => setDueDate(e.target.value)}
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Due Date"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="priority" className="sr-only">Priority</label>
//                             <select
//                                 id="priority"
//                                 name="priority"
//                                 value={priority}
//                                 onChange={(e) => setPriority(e.target.value)}
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                             >
//                                 <option value="low">Low</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="high">High</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label htmlFor="status" className="sr-only">Status</label>
//                             <select
//                                 id="status"
//                                 name="status"
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                             >
//                                 <option value="pending">Pending</option>
//                                 <option value="completed">Completed</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <button
//                             type="submit"

//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Save
//                         </button>

//                             <button
//                                 type="button"
//                                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                                 onClick={handleCancel}

//                             >
//                                 Cancel
//                             </button>

//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TaskScreen;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask } from "../api";
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const TaskScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem("token");
        const tasks = await getTasks(token);
        const task = tasks.find((t) => t._id === id);
        if (task) {
          setTask(task);
          setTitle(task.title);
          setDescription(task.description);
          setDueDate(task.due_date);
          setPriority(task.priority);
          setStatus(task.status);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const taskData = {
      title,
      description,
      due_date: dueDate,
      priority,
      status,
    };

    if (id) {
      await updateTask(id, taskData, token);
    } else {
      await createTask(taskData, token);
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {id ? "Edit Task" : "Create Task"}
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              size="small"
            />
            <TextField
              fullWidth
              size="small"
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              size="small"
              fullWidth
              label="Due Date"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <FormControl
              size="small"
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              size="small"
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </StyledForm>
        </Box>
      </Container>
    </Box>
  );
};

export default TaskScreen;
