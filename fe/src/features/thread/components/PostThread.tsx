/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, Image, Input, Flex, Button } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useThreads } from "../hooks/useThread";

const Content = () => {
  const { handlePost, fileInputRef, handleChange } = useThreads();
  // console.log(postThread);

  return (
    <Box color="white" bgColor="#1d1d1d" w={"100%"}>
      <Box color="white" bgColor="#1d1d1d" p="10px">
        <Heading mb="20px" ml="10%">
          Home
        </Heading>
        <Flex alignItems="center" gap="20px" justifyContent="center">
          <Image src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" borderRadius="full" boxSize="40px" mr="10px" />

          <Input maxW="50%" border="none" placeholder="What is happening?!" onChange={handleChange} name="content" />

          <Input name="image" id="image-upload" type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleChange} />

          <label htmlFor="image-upload">
            <LuImagePlus fontSize="30px" color="green" />
          </label>

          <Button bg="green" color="white" borderRadius="20px" onClick={handlePost}>
            Post
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Content;
