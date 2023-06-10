import {v1} from "uuid";

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};
export type TaskType = {
    todolistId: string;
    id: string;
    title: string;
    isDone: boolean
}
export type TasksActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: TasksActionsType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId] || [];
            stateCopy[action.payload.todolistId] = [{
                id: v1(),
                todolistId: action.payload.todolistId,
                title: action.payload.title,
                isDone: false
            }, ...tasks];
            return stateCopy;
        }
        case 'REMOVE-TASKS':
            console.log(action.todolistId)
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId
                        ? {
                            ...t,
                            title: action.newTaskTitle,
                        }
                        : t,
                ),
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId
                        ? {
                            ...t,
                            isDone: action.isDone,
                        }
                        : t,
                ),
            };
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        },
    } as const;
};
export const removeTasksAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASKS',
        todolistId,
        taskId,
    } as const;
};
export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        todolistId,
        newTaskTitle,
    } as const;
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId,
    } as const;
};