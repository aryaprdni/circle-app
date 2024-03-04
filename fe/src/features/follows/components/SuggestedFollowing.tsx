/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Text, Box, Button, Spacer, Avatar, Flex } from "@chakra-ui/react";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { IUserSearch } from "../../../interface/IAuth";
import { useSuggestedFollowing } from "../hooks/useSuggestedFollowing";

const SuggestedFollowing = () => {
  const { users, handleFollow } = useSuggestedFollowing();
  console.log("data", users);
  return (
    <>
      <Card
        w="90%"
        h="13rem"
        m="0 auto"
        bgColor="#262626"
        color="white"
        borderRadius="10px"
        p="10px"
        overflowY={"scroll"}
        overflowX="hidden"
        css={{
          "::-webkit-scrollbar": {
            width: "0.5em",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#4F4F4F",
            borderRadius: "4px",
          },
        }}
      >
        <Text mb={"8px"}>Suggested for you</Text>
        {users.map((user: IUserSearch, index: number) => (
          <Flex alignItems="center" mt="10px" key={index}>
            <Avatar src={user.profile_picture} borderRadius="full" boxSize="40px" mr="10px" />
            <Flex alignItems="center">
              <Box>
                <Text fontSize="small">{user.full_name}</Text>
                <Text fontSize="xs" color="grey">
                  {user.username}
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Button size="xs" border="1px" borderRadius={"full"} bgColor={"#1d1d1d"} color="white" onClick={() => handleFollow(user.id, user.userId, user.is_following)}>
              {user.is_following ? "Following" : "Follow"}
            </Button>
          </Flex>
        ))}
      </Card>

      <Card w="90%" h="30%" m="0 auto" bgColor="#262626" color="white" borderRadius="10px" p="10px" mt="13px">
        <Box>
          <Flex gap="5px" alignItems="center">
            <Text fontSize="small"> Developed By Arya Perdana Irawan</Text> <TbPointFilled /> <FaGithub />
            <CiLinkedin /> <FaFacebook /> <CiInstagram />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default SuggestedFollowing;
