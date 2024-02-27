/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Text, Box, Image, Flex, Button, Spacer } from "@chakra-ui/react";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { API } from "../../libs/axios";
import { SET_FOLLOW } from "../../store/RootReducer";
import { IFollow } from "../../interface/IFollow";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types/RootState";
const SuggestedFollowing = (props: IFollow) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.data);

  async function handleFollow(id: number, followedUserId: number, isFollowed: boolean) {
    try {
      if (!isFollowed) {
        const response = await API.post(`/follow/`, {
          followedUserId: followedUserId,
        });
        dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
        // console.log("berhasil follow!", response.data)
      } else {
        const response = await API.delete(`/follow/${followedUserId}`);
        dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
        console.log("berhasil unfollow!", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card w="90%" h="30%" m="0 auto" bgColor="#262626" color="white" borderRadius="10px" p="10px">
        <Text>Suggested for you</Text>
        <Flex alignItems="center" mt="10px">
          <Image src={props.photo_profile} borderRadius="full" boxSize="40px" mr="10px" />
          <Flex alignItems="center">
            <Box>
              <Text fontSize="small">{props.full_name}</Text>
              <Text fontSize="xs" color="grey">
                {props.username}
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Button size="xs" border="1px" borderRadius={"full"} bgColor={"#1d1d1d"} color="white" onClick={() => handleFollow(props.id, props.userId, props.isFollowed)}>
            {props.isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Flex>
      </Card>

      <Card w="90%" h="30%" m="0 auto" bgColor="#262626" color="white" borderRadius="10px" p="10px" mt="13px">
        <Box>
          <Flex gap="5px" alignItems="center">
            <Text fontSize="small"> Develepod By Arya Perdana Irawan</Text> <TbPointFilled /> <FaGithub />
            <CiLinkedin /> <FaFacebook /> <CiInstagram />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default SuggestedFollowing;
