import React, {useCallback} from 'react';
import {Header} from './components/header';
import {ChakraProvider, Flex} from '@chakra-ui/react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./components/redux/store";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistType
} from "./components/redux/todolistsReducer";
import {AddItemForm} from "./components/AdditemForm";
import {Todolist} from "./components/todolists/todolist";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, removeCompletedTasksAC,
    removeTasksAC,
    TasksStateType
} from "./components/redux/tasksReducer";


export const App = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistType>>(
        (state) => state.todolists,
    );
    const tasks = useSelector<AppStateType, TasksStateType>((state) => state.tasks);
    const addTodolist = useCallback(
        (title: string) => {
            let action = addTodolistAC(title);
            dispatch(action);
        },
        [dispatch],
    );
    const removeTodolist = useCallback(
        (todolistId: string) => {
            let action = removeTodolistAC(todolistId);
            dispatch(action);
        },
        [dispatch],
    );
    const changeTodolistTitle = useCallback(
        (todolistId: string, newTitle: string) => {
            let action = changeTodolistTitleAC(todolistId, newTitle);
            dispatch(action);
        },
        [dispatch],
    );
    const addTask = useCallback(
        (id: string, title: string) => {
            dispatch(addTaskAC(id, title));
        },
        [dispatch],
    );
    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            let action = removeTasksAC(taskId, todolistId);
            dispatch(action);
        },
        [dispatch],
    );
    const changeTitleTask = useCallback(
        (todolistId: string, taskId: string, newTitle: string) => {
            let action = changeTaskTitleAC(taskId, newTitle, todolistId);
            dispatch(action);
        },
        [dispatch],
    );
    const changeTaskStatus = useCallback(
        (todolistId: string, taskId: string, isDone: boolean) => {
            dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
        },
        [dispatch],
    );
    const changeFilter = useCallback(
        (value: 'all' | 'active' | 'completed', todolistId: string) => {
            let action = changeTodolistFilterAC(todolistId, value);
            dispatch(action);
        },
        [dispatch],
    );

    const removeCompletedTasks = useCallback((todolistId: string) => {
        let action = removeCompletedTasksAC(todolistId)
        dispatch(action)
    }, [dispatch])


    return (
        <ChakraProvider>
            <Header/>
            <Flex justifyContent='center'>
                <Flex m='20px'>
                    <AddItemForm addItem={addTodolist} placeholder={'Add todolist'}/>
                </Flex>
            </Flex>
            <Flex gap={7} flexWrap={'wrap'} justifyContent='space-around'>
                {todolists.map((todolist) => {
                    return <Todolist key={todolist.id} tasks={tasks[todolist.id]}
                                     filter={todolist.filter} id={todolist.id} title={todolist.title}
                                     removeTodolist={removeTodolist}
                                     changeTodolistTitle={changeTodolistTitle}
                                     addTask={addTask}
                                     removeTask={removeTask}
                                     changeTaskTitle={changeTitleTask}
                                     changeTaskStatus={changeTaskStatus}
                                     changeFilter={changeFilter}
                                     removeCompletedTasks={removeCompletedTasks}
                    />
                })}
            </Flex>
        </ChakraProvider>
    );
}

