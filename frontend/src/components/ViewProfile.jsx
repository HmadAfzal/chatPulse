import React from 'react'
import { IoEyeSharp } from "react-icons/io5";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

  } from '@chakra-ui/react'
const ViewProfile = ({name, email}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
   
    <div className='bg-[#489893] rounded-md cursor-pointer px-3 py-2 hover:bg-[#4da39d]'onClick={onOpen}>
          <IoEyeSharp size={22} />
        </div>

<Modal isOpen={isOpen} onClose={onClose} >
<ModalOverlay  />
<ModalContent bg={'#4da39d'} color={'black'}>
  <ModalHeader>User Info</ModalHeader>
  <ModalCloseButton />
  <ModalBody>
  <div className='flex flex-col items-center justify-center pt-6 pb-12 gap-4'>
    <h1 className='text-3xl'>Name: <span>{name}</span></h1>
    <p>Email: <span>{email}</span></p>
  </div>
  </ModalBody>
</ModalContent>
</Modal> 

</>
  )
}

export default ViewProfile
