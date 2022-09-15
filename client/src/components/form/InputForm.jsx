import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React from 'react';

const InputForm = ({ name, label = '', type = 'text', register, errors }) => {
    return (
        <FormControl mb={4} isInvalid={errors[name]?.message}>
            <Input
                type={`${type}`}
                placeholder={`${label || name}`}
                size={'lg'}
                boxShadow={'xs'}
                _placeholder={{textTransform: 'capitalize'}}
                {...register(name)}
            />
            <FormErrorMessage pl={2}>
                {errors[name]?.message}
            </FormErrorMessage>
        </FormControl>
    );
};

export default InputForm;
