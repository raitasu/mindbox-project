import React, {useCallback} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Stack,
    StackDivider,
    Tooltip
} from "@chakra-ui/react";
import EditableText from "../EditableText";
import {CloseIcon} from "@chakra-ui/icons";
import {AddItemForm} from "../AdditemForm";
import {TaskType} from "../redux/tasksReducer";
import {Task} from "./tasks/Task";

export const Todolist = ({
                             id,
                             tasks,
                             filter,
                             title,
                             changeTodolistTitle,
                             removeTodolist,
                             addTask,
                             removeTask,
                             changeTaskTitle,
                             changeTaskStatus,
                             changeFilter
                         }: {
    id: string,
    tasks: Array<TaskType>,
    filter: string,
    title: string,
    changeTodolistTitle: (id: string, title: string) => void,
    removeTodolist: (id: string) => void,
    addTask: (id: string, title: string) => void
    removeTask: (taskId: string, id: string) => void
    changeTaskTitle: (id: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    changeFilter: (value: 'all' | 'active' | 'completed', todolistId: string) => void
}) => {


    const onChangeTodolistTitleHandler = useCallback(
        (newTitle: string) => {
            changeTodolistTitle(id, newTitle);
        },
        [changeTodolistTitle, id],
    );
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks ? tasks.filter((el) => !el.isDone) : []
    }
    if (filter === "completed") {
        tasksForTodolist = tasks ? tasks.filter((el) => el.isDone) : []
    }

    const addTaskHandler = (title: string) => {
        addTask(id, title)
    }
    const changeFilterHandler = useCallback(
        (value: 'all' | 'active' | 'completed') => {
            changeFilter(value, id);
        },
        [changeFilter, id],
    );
    return (
        <Card height='100%'>
            <CardHeader>
                <Flex justifyContent='space-between' alignItems='center'> <Heading size='md'>
                    <EditableText text={title} onChange={onChangeTodolistTitleHandler}/>
                </Heading>
                    <Tooltip label='Delete todolist'>
                        <IconButton aria-label='Delete item' icon={<CloseIcon/>} onClick={() => removeTodolist(id)}/>
                    </Tooltip>
                </Flex>

            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='3'>
                    <AddItemForm addItem={addTaskHandler} placeholder='Add task'/>
                    {(tasksForTodolist || []).map((task) => {
                        return <Task
                            key={task.id}
                            id={id}
                            task={task}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                        />
                    })}
                    <Flex justifyContent='space-around'>
                        <Button variant={filter === 'all' ? 'outline' : 'solid'}
                                onClick={() => changeFilterHandler('all')}>All</Button>
                        <Button variant={filter === 'active' ? 'outline' : 'solid'}
                                onClick={() => changeFilterHandler('active')}>Active</Button>
                        <Button variant={filter === 'completed' ? 'outline' : 'solid'}
                                onClick={() => changeFilterHandler('completed')}>Completed</Button>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
};
