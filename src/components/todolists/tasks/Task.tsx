import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, Flex, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {TaskType} from "../../redux/tasksReducer";
import EditableText from "../../EditableText";

export const Task = ({
                         id,
                         task,
                         removeTask,
                         changeTaskTitle,
                         changeTaskStatus
                     }: {
    id: string,
    task: TaskType,
    removeTask: (taskId: string, id: string) => void,
    changeTaskTitle: (id: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
}) => {


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

    return (
        <Flex key={id} justifyContent='space-between' alignItems='center'>
            <Checkbox isChecked={task.isDone} onChange={onChangeHandler}/>
            <EditableText text={task.title} onChange={onChangeTaskTitle} checked={task.isDone}/>
            <IconButton aria-label='Delete item' icon={<DeleteIcon/>} onClick={() => removeTask(task.id, id)}/>
        </Flex>
    );
};
