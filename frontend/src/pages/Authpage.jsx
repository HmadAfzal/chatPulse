import { React, useState } from "react";
import {Box, Container,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Signup from "../components/Signup";
import Login from "../components/Login";
const Authpage = () => {
  return (
    <Container maxW='lg' minH={'100vh'} className='flex pt-16 justify-center'>
<Box w={'full'}>
  <h1 className='text-5xl font-bold py-5 px-8 text-center text-black bg-[#68d391] w-full rounded-xl my-8'> ChatPulse</h1>
  <Box className=" w-full bg-[#68d391]  rounded-xl py-6 px-8">
      <Tabs variant='soft-rounded' isFitted  colorScheme="green">
  <TabList>
    <Tab>SignUp</Tab>
    <Tab>Login</Tab>
  </TabList>
  <TabPanels className="pt-12">
    <TabPanel>
     <Signup/>
    </TabPanel>
    <TabPanel>
     <Login/>
    </TabPanel>
  </TabPanels>
</Tabs>
  </Box>


</Box>
  </Container>
  )
}

export default Authpage
