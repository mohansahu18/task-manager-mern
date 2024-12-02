import { TaskModel as Task } from "../models/tasks.js";

export const taskController = {
    getTasks: async (req, res) => {
        try {
            const tasks = await Task.find({ user: req.user.id });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Error fetching tasks", error: error.message });
        }
    },

    getTask: async (req, res) => {
        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "Error fetching task", error: error.message });
        }
    },

    createTask: async (req, res) => {
        try {
            const { title, description, due_date, priority, status } = req.body;

            if (!title || !description || !due_date || !priority) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const task = new Task({
                title,
                description,
                due_date,
                priority,
                status: status || 'pending',
                user: req.user.id
            });

            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: "Error creating task", error: error.message });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { title, description, due_date, priority, status } = req.body;

            const task = await Task.findOneAndUpdate(
                { _id: req.params.id, user: req.user.id },
                { title, description, due_date, priority, status },
                { new: true, runValidators: true }
            );

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "Error updating task", error: error.message });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: "Error deleting task", error: error.message });
        }
    },

    toggleTaskStatus: async (req, res) => {
        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            task.status = task.status === 'pending' ? 'completed' : 'pending';
            await task.save();
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "Error toggling task status", error: error.message });
        }
    }
};