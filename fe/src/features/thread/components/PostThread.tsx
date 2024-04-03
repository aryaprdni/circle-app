/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, FormControl, Input, Flex, Button, Avatar } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useThreads } from "../hooks/useThread";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";

const Content = () => {
  const { handlePost, fileInputRef, handleChange, data } = useThreads();
  // console.log(postThread);
  console.log(console.log("data", data));
  const user = useSelector((state: RootState) => state.auth);

  return (
    <Box color="white" bgColor="#1d1d1d" w={"100%"}>
      <Box color="white" bgColor="#1d1d1d" p="10px">
        <Heading mb="20px" ml="10%">
          Home
        </Heading>
        <Flex alignItems="center" gap="20px" justifyContent="center">
          <form onSubmit={handlePost} encType="multipart/form-data">
            <FormControl display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"20px"}>
              <Avatar src={user.data.profile_picture ?? ""} borderRadius="full" boxSize="40px" mr="10px" />

              <Input maxW="50%" border="none" placeholder="What is happening?!" onChange={handleChange} name="content" value={data.content} />

              <Input name="image" id="image-upload" type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleChange} accept="image/*" />

              <label htmlFor="image-upload">
                <LuImagePlus fontSize="30px" color="green" />
              </label>

              <Button bg="green" color="white" borderRadius="20px" type={"submit"}>
                Post
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};

export default Content;
