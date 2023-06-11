import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Flex, FormControl, Input, Text} from '@chakra-ui/react'

type EditableTextType = {
    text: string;
    onChange: (newTitle: string) => void;
    checked?: boolean
    isEdit?: boolean
    editItemTitle: (value: boolean) => void
};

const EditableText = memo(({text, onChange, checked, editItemTitle, isEdit}: EditableTextType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(text);
    const [isError, setIsError] = useState(false);
    const errorMessage = "Title is required!";

    const editModeHandler = () => {
        setIsEditMode(true);
    };
    const activateViewHandler = () => {
        if (title.trim() !== '') {
            editItemTitle(false)
            setIsEditMode(false)
            onChange(title);
            setIsError(false)
        } else {
            setIsError(true)
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '' && event.key === "Enter") {
            activateViewHandler();
            setIsError(false)
        } else {
            setIsError(true)
        }
    };
    return isEditMode || isEdit ? (
        <FormControl isInvalid={isError}>
            <Input
                variant='filled'
                value={title}
                onChange={onChangeHandler}
                onBlur={activateViewHandler}
                onKeyPress={onKeyPressHandler}
                autoFocus
                width='100%'
                placeholder={isError ? errorMessage : ''}
                _placeholder={{
                    color: 'red'
                }}
            />
            {/*{isError && <Text color='red'>{errorMessage}</Text>}*/}
        </FormControl>
    ) : (<Flex>
            <Text textDecoration={checked ? 'line-through' : 'none'} color={checked ? 'gray' : 'black'}
                  wordBreak='break-all' onDoubleClick={editModeHandler}>{text}</Text>
        </Flex>
    );
});

export default EditableText;
