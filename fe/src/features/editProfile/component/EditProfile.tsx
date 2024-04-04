// EditProfile.jsx
import { Card, FormControl, FormLabel, Input, Image, Text, Avatar, Flex, Divider, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { useEditProfile } from "../hooks/useEditProfile";
import { LuImagePlus } from "react-icons/lu";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.auth);
  const { handleEditProfile, handleChange, profilePictureInputRef, backgroundPictureInputRef, form } = useEditProfile();

  return (
    <form encType="multipart/form-data" onSubmit={handleEditProfile}>
      <FormControl>
        <Text mt={"20px"} mb={"20px"} color={"White"}>
          My Profile
        </Text>
        <Card bgColor="#262626" p={"20px"}>
          <Box>
            <Image src={user.data.profile_description?? ""} fallbackSrc="https://via.placeholder.com/150" borderRadius="lg" h={"150px"} width="100%" />

            <Box
              background={"#3c4445"}
              width={"40px"}
              height={"40px"}
              cursor={"pointer"}
              position={"absolute"}
              top={"25%"}
              left={"50%"}
              borderRadius={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"3px solid #3c4445"}
            >
              <label htmlFor="profile_description">
                <LuImagePlus fontSize="30px" color="green" />
              </label>

              <Input name="profile_description" id="profile_description" type="file" style={{ display: "none" }} ref={backgroundPictureInputRef} onChange={handleChange} accept="image/*" />
            </Box>
          </Box>
          <Box cursor={"pointer"}>
            <Avatar borderRadius="full" boxSize="70px" src={user.data.profile_picture ?? ""} position={"relative"} top={"-30px"} left={"25px"} border="3px solid #3c4445" />

            <Input name="profile_picture" id="profile_picture" type="file" style={{ display: "none" }} ref={profilePictureInputRef} onChange={handleChange} accept="image/*" />

            <Box backgroundColor={"3c4445"} position={"absolute"} top={"52%"} left={"18%"} borderRadius={"100%"} textAlign={"center"} display={"flex"} justifyContent={"center"} alignItems={"center"} border={"3px solid #3c4445"}>
              <label htmlFor="profile_picture">
                <LuImagePlus fontSize="25px" color="green" />
              </label>
            </Box>
          </Box>

          <Flex flexDirection={"column"} color={"white"} mt="-25px" gap={"4px"}>
            <Text fontSize={"xl"}>{user.data.full_name}</Text>
            <Text fontSize={"md"} color={"grey"}>
              @{user.data.username}
            </Text>
            <Text>{user.data.bio}</Text>
            <Flex gap={"10px"}>
              <Flex>{user.data.followings_count} Following</Flex>
              <Flex>{user.data.followers_count} Follower</Flex>
            </Flex>
          </Flex>
        </Card>
        <Divider orientation="horizontal" mt={"20px"} mb={"20px"} />
        
        <Box mb={"50px"}>
          <Flex gap={"8px"} flexDirection={"column"}>
            <FormLabel color={"white"}>Username</FormLabel>
            <Input id="username" type="text" name="username" value={form.username} color={"white"} onChange={handleChange} />
            <FormLabel color={"white"}>Fullname</FormLabel>
            <Input id="full_name" type="text" name="full_name" value={form.full_name} color={"white"} onChange={handleChange} />
            <FormLabel color={"white"}>Bio</FormLabel>
            <Input id="bio" type="text" name="bio" color={"white"} value={form.bio} onChange={handleChange} />
            <Button m="15px auto" color="black" width={"140px"} type="submit">
              Edit profile
            </Button>
          </Flex>
        </Box>
      </FormControl>
    </form>
  );
};

export default EditProfile;
