import React, {ChangeEvent, useCallback, useState} from 'react';
import {Checkbox, Flex, IconButton, Tooltip} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {TaskType} from "../../redux/tasksReducer";
import EditableText from "../../EditableText";

export const Task = ({
                         id,
                         task,
                         removeTask,
                         changeTaskTitle,
                         changeTaskStatus,
                     }: {
    id: string,
    task: TaskType,
    removeTask: (taskId: string, id: string) => void,
    changeTaskTitle: (id: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
}) => {

    const [isEditTask, setIsEditTask] = useState(false)


    const onChangeTaskTitle = (title: string) => {
        changeTaskTitle(id, task.id, title)
    }
    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(
                id,
                task.id,
                event.currentTarget.checked,
            ),
        [changeTaskStatus, id, task.id]
    );

    const editItemTitle = (value: boolean) => {
        setIsEditTask(value)
    }
    return (
        <Flex key={id} justifyContent='space-between' alignItems='center' gap={3}>
            <Flex gap={2}>
                <Checkbox isChecked={task.isDone} onChange={onChangeHandler} colorScheme='green' size='lg'/>
                <Flex width='240px'>
                    <EditableText text={task.title} onChange={onChangeTaskTitle} checked={task.isDone}
                                  editItemTitle={editItemTitle} isEdit={isEditTask}/>
                </Flex>
            </Flex>
            <Flex gap={1}>
                {!isEditTask ? <Tooltip label='Edit task'>
                    <IconButton aria-label='Edit item' icon={<EditIcon/>} onClick={() => editItemTitle(true)}/>
                </Tooltip> : <Tooltip label='Save task'>
                    <IconButton aria-label='Save item' icon={<CheckIcon/>}/>
                </Tooltip>}

                <Tooltip label='Delete task'>
                    <IconButton aria-label='Delete item' icon={<DeleteIcon/>} onClick={() => removeTask(task.id, id)}/>
                </Tooltip>
            </Flex>
        </Flex>
    );
};
