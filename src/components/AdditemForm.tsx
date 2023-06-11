import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Flex, FormControl, Text, Input, IconButton, Tooltip} from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'

export type AddItemFormType = {
    addItem: (title: string) => void;
    placeholder?: string
};

export const AddItemForm = React.memo(({addItem, placeholder}: AddItemFormType) => {
    let [title, setTitle] = useState("");
    let [isError, setIsError] = useState<boolean>(false);

    const errorMessage = "Title is required!";
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (isError) {
            setIsError(false);
        }
        setTitle(event.currentTarget.value);
    };

    const onClickAddTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddTask();
        }
    };
    return (
        <FormControl isInvalid={isError}>
            <Flex gap={3}>
                <Flex flexDirection='column' width='100%'>
                    <Input placeholder={placeholder || 'Title'} value={title} onChange={onChangeTitle}
                           onKeyPress={onKeyPressHandler} focusBorderColor='green'/>
                    {isError && <Text color='red'>{errorMessage}</Text>}
                </Flex>
                <Tooltip label={placeholder}>
                    <IconButton aria-label='Add item' icon={<AddIcon/>} onClick={onClickAddTask}/>
                </Tooltip>

            </Flex>

        </FormControl>
    );
});

