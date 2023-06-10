import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import { Flex, Input, Text} from '@chakra-ui/react'

type EditableTextType = {
    text: string;
    onChange: (newTitle: string) => void;
    checked?:boolean
};

const EditableText = memo(({text, onChange, checked}: EditableTextType) => {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(text);

    const editModeHandler = () => {
        setIsEdit(true);
    };
    const activateViewHandler = () => {
        setIsEdit(false);
        onChange(title);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       if(e.currentTarget.value !== '') setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            activateViewHandler();
        }
    };

    return isEdit ? (
        <Input
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewHandler}
            onKeyPress={onKeyPressHandler}
            autoFocus
        />
    ) : (<Flex width='150px' >
            <Text textDecoration={checked ? 'line-through' : 'none'} color={checked ? 'gray' : 'black'} wordBreak='break-all'  onDoubleClick={editModeHandler}>{text}</Text>
        </Flex>
    );
});

export default EditableText;
