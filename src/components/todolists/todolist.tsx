import React, {useCallback, useState} from 'react';
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
    Tooltip,
    Text
} from "@chakra-ui/react";
import EditableText from "../EditableText";
import {CloseIcon, EditIcon} from "@chakra-ui/icons";
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
                             changeFilter,
                             removeCompletedTasks
                         }: {
    id: string
    tasks: Array<TaskType>
    filter: string
    title: string
    changeTodolistTitle: (id: string, title: string) => void
    removeTodolist: (id: string) => void
    addTask: (id: string, title: string) => void
    removeTask: (taskId: string, id: string) => void
    changeTaskTitle: (id: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    changeFilter: (value: 'all' | 'active' | 'completed', todolistId: string) => void
    removeCompletedTasks: (id: string) => void
}) => {

    const [isEditTodolist, setIsEditTodolist] = useState(false)

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
    let activeTasks = (tasksForTodolist || []).filter((task) => !task.isDone);

    const addTaskHandler = (title: string) => {
        addTask(id, title)
    }
    const changeFilterHandler = useCallback(
        (value: 'all' | 'active' | 'completed') => {
            changeFilter(value, id);
        },
        [changeFilter, id],
    );
    const removeCompletedTasksHandler = useCallback(() => {
        removeCompletedTasks(id)
    }, [removeCompletedTasks, id])


    const editItemTitle = (value: boolean) => {
        setIsEditTodolist(value)
    }

    return (
        <Card height='100%' width='400px'>
            <CardHeader>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Heading size='md'>
                        <Flex width='270px'>
                            <EditableText text={title} onChange={onChangeTodolistTitleHandler}
                                          editItemTitle={editItemTitle}
                                          isEdit={isEditTodolist}/>
                        </Flex>
                    </Heading>
                    <Flex>
                        <Tooltip label='Edit todolist'>
                            <IconButton aria-label='Edit item' icon={<EditIcon/>} onClick={() => editItemTitle(!isEditTodolist)}/>
                        </Tooltip>
                        <Tooltip label='Delete todolist'>
                            <IconButton aria-label='Delete item' icon={<CloseIcon/>}
                                        onClick={() => removeTodolist(id)}/>
                        </Tooltip>
                    </Flex>

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
                    <Flex direction={'column'} gap={3}>
                        <Flex justifyContent='space-between'>
                            <Button width='100px' variant={filter === 'all' ? 'outline' : 'solid'}
                                    border={filter === 'all' ? '1px solid gray' : 'none'}
                                    onClick={() => changeFilterHandler('all')}>All</Button>
                            <Button width='100px' variant={filter === 'active' ? 'outline' : 'solid'}
                                    border={filter === 'active' ? '1px solid gray' : 'none'}
                                    onClick={() => changeFilterHandler('active')}>Active</Button>
                            <Button width='100px' variant={filter === 'completed' ? 'outline' : 'solid'}
                                    border={filter === 'completed' ? '1px solid gray' : 'none'}
                                    onClick={() => changeFilterHandler('completed')}>Completed</Button>
                        </Flex>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Text>{activeTasks.length} times left</Text>
                            <Button onClick={() => removeCompletedTasksHandler()}>Clear completed</Button>
                        </Flex>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
};
