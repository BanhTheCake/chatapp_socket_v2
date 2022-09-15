import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const InputBox = ({ handleSendMessage = () => {}, setInputBox }) => {

    const currentUserTextToUsername = useSelector((state) => state.user.currentUserTextTo.textToUsername)

    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const [heightBase] = useState(40);
    // const [rows, setRows] = useState(1);

    const handleInput = (e) => {
        setInput(e.target.value);
        // textarea auto size

        inputRef.current.style.height = `${heightBase}px`;
        const scrollHeight = inputRef.current.scrollHeight
        inputRef.current.style.height = `${scrollHeight < heightBase ? heightBase : scrollHeight}px`;

        // const splitRow = (e.target.value).split('\n') || []
        // const rows = splitRow.length
        // setRows(rows)
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            handleClickBtn();
        }
    };

    const handleClickBtn = () => {
        setInputBox(input);
        setInput('');
        handleSendMessage(input);
        inputRef.current.style.height = `${heightBase}px`;
        // setRows(1);
    };

    return (
        <>
            <HStack w={'full'} p={'3'}>
                <InputGroup size="md">
                    <Textarea
                        ref={inputRef}
                        pr="6rem"
                        type="text"
                        placeholder="Type message ..."
                        w={'full'}
                        boxShadow={'base'}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handlePressEnter}
                        minH={'unset'}
                        resize={'none'}
                        overflow={'hidden'}
                        isDisabled={!currentUserTextToUsername}
                        // rows={rows}
                    />
                    <InputRightElement width="4.5rem" p={'4px'} h={'40px'}>
                        <Button
                            h={'30px'}
                            size="md"
                            colorScheme={'whatsapp'}
                            onClick={handleClickBtn}
                            isDisabled={!currentUserTextToUsername}
                        >
                            Send
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </HStack>
        </>
    );
};

export default InputBox;
