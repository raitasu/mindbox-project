import {v1} from "uuid";


export type TodolistsActionsType = AddTodolistType
export type AddTodolistType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
export type TodolistType = {
    id: string,
    title: string,
    filter: 'all' | 'active' | 'completed';
};
const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state = initialState, action: TodolistsActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.payload.todolistId,
                title: action.payload.newTodolistTitle,
                filter: "all",
            }]
        case 'REMOVE-TODOLIST':
            return state.filter((td) => td.id !== action.payload.todolistId);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((td) =>
                td.id === action.payload.todolistId
                    ? {
                        ...td,
                        filter: action.payload.filterValue,
                    }
                    : td,
            );
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((td) =>
                td.id === action.payload.todolistId
                    ? {
                        ...td,
                        title: action.payload.newTodolistTitle,
                    }
                    : td,
            );
        default:
            return state
    }
};

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todolistId: v1(),
        },
    } as const;
};

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId,
        },
    } as const;
};

export const changeTodolistFilterAC = (todolistId: string, filterValue: 'all' | 'completed' | 'active') => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filterValue,
        },
    } as const;
};

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTodolistTitle,
        },
    } as const;
};