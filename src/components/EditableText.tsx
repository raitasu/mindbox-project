import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Flex, Input, Text} from '@chakra-ui/react'

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

    const editModeHandler = () => {
        setIsEditMode(true);
    };
    const activateViewHandler = () => {
        if (title.trim() !== '') {
            editItemTitle(false)
            setIsEditMode(false)
            onChange(title);
        }
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '' && event.key === "Enter") {
            activateViewHandler();
        }
    };
    return isEditMode || isEdit ? (
        <Input
            variant='filled'
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewHandler}
            onKeyPress={onKeyPressHandler}
            autoFocus
            width='100%'
        />
    ) : (<Flex>
            <Text textDecoration={checked ? 'line-through' : 'none'} color={checked ? 'gray' : 'black'}
                  wordBreak='break-all' onDoubleClick={editModeHandler}>{text}</Text>
        </Flex>
    );
});

export default EditableText;
