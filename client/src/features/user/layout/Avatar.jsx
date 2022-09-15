import {
    Box,
    Button,
    Circle,
    Heading,
    HStack,
    Image,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserImage } from '../userSlice';

const templateAvatar = [
    'https://images.unsplash.com/photo-1662578108849-6f75d4f8c280?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1662577207603-b37e19471763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1662572314679-32bdaf079b79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzN3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1659535969472-3f4e2ad3a0be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
];

const Avatar = () => {

  const [activeImg, setActiveImg] = useState(null)

  const isLoading = useSelector(state => state.user.isLoading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickImg = (index) => {
    setActiveImg(index)
  }

  const handleClickSave = () => {
    console.log(activeImg);
      if (activeImg === null) return;
    dispatch(setUserImage(templateAvatar[activeImg]))
    .unwrap()
    .then(() => {
        console.log('here');
        return navigate('/')
    })
    .catch(() => {
        return navigate('/login')
    })
  }

  return (
      <VStack p={8} bg={'gray.700'} color={'whiteAlpha.900'} h={'100vh'} justifyContent={'center'}>
          <Heading mb={8} >Set Avatar For You</Heading>
          <HStack maxW={'fit-content'} spacing={8} sx={{ marginBottom: '2rem !important' }}>
              {templateAvatar &&
                  templateAvatar.map((item, index) => {
                      return (
                          <Box key={item + index} onClick={() => handleClickImg(index)}>
                              <Circle
                                  size="100px"
                                  overflow={'hidden'}
                                  cursor={'pointer'}
                                  border={'6px solid transparent'}
                                  sx={activeImg === index && { border: '6px solid #6c5ce7', transition: 'all 0.1s linear' }}
                              >
                                  <Image
                                      w={'full'}
                                      h={'full'}
                                      objectFit={'cover'}
                                      src={item}
                                      alt="Avatar"
                                  />
                              </Circle>
                          </Box>
                      );
                  })}
          </HStack>
          <Button isLoading={isLoading} colorScheme={'whatsapp'} onClick={handleClickSave}>Set Avatar</Button>
      </VStack>
  );
};

export default Avatar;
