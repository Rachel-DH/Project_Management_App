import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({

    name: "tasks",
    initialState: { list: [] },
    reducers: {

        createTask: (state, action) => {
            const { idProject, title, description, priority, dueDate } = action.payload;
            const newTask = {
                id: Date.now().toString(),
                idProject,
                title,
                description,
                status: "To Do",
                priority: priority || 2,
                dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL')
            };
            state.list.push(newTask);
        },

        updateTask: (state, action) => {
            const { id, title, description, priority, dueDate, status } = action.payload;
            const currentTask = state.list.find(task => task.id === id);
            if (currentTask) {
                currentTask.title = title ?? currentTask.title;
                currentTask.description = description ?? currentTask.description;
                currentTask.priority = priority ?? currentTask.priority;
                currentTask.dueDate = dueDate ?? currentTask.dueDate;
                currentTask.status = status ?? currentTask.status; // הוספנו תמיכה בעדכון סטטוס
            }
        },
        
        deleteTask: (state, action) => {
            state.list = state.list.filter(task => task.id !== action.payload);
        }
    }
});


export const { createTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
