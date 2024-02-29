import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, Avatar, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { GET_FOLLOWS, SET_FOLLOW_STATE } from "../../../store/RootReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { IFollow } from "../../../interface/IFollow";
import { useEffect } from "react";
import { API } from "../../../libs/axios";

const PageFollows = () => {
  const dispatch = useDispatch();
  const followState = useSelector((state: RootState) => state.follow.followState);
  const follows = useSelector((state: RootState) => state.follow.follows);
  console.log("pagefollows follows", follows);

  async function getFollowData() {
    const response = await API.get(`/follow?type=${followState}`);
    console.log("response", response);
    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowData();
  }, [followState]);

  return (
    <Box>
      <Tabs isFitted>
        <TabList color={"white"}>
          <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>Followers</Tab>
          <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>Followings</Tab>
        </TabList>

        <TabPanels color={"white"}>
          <TabPanel>
            {follows.map((follow: IFollow, index: number) => (
              <Flex key={index} gap={5} mb={5} alignItems={"center"}>
                <Avatar size="md" src={follow.profile_picture} />
                <Box color="white">
                  <Text fontSize="md">{follow.full_name}</Text>
                  <Text color="grey" fontSize="xs">
                    @{follow.username}
                  </Text>
                  <Text fontSize="xs">{follow.bio}</Text>
                </Box>
                <Spacer />
                <Button colorScheme="teal" size="sm">
                  Follow
                </Button>
              </Flex>
            ))}
          </TabPanel>
          <TabPanel>
            {follows.map((follow: IFollow, index: number) => (
              <Flex key={index} gap={5} mb={5} alignItems={"center"}>
                <Avatar size="md" src={follow.profile_picture} />
                <Box color="white">
                  <Text fontSize="md">{follow.full_name}</Text>
                  <Text color="grey" fontSize="xs">
                    @{follow.username}
                  </Text>
                  <Text fontSize="xs">{follow.bio}</Text>
                </Box>
                <Spacer />
                <Button colorScheme="teal" size="sm">
                  Following
                </Button>
              </Flex>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default PageFollows;
