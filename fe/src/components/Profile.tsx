import { Box, Text, Image, Button, Heading, Flex, Card } from "@chakra-ui/react";
const Profile = () => {
  return (
    <Card h="40%" color="white" p="20px" bgColor="#1d1d1d">
      <Card w="98%" borderRadius="10px" bgColor="#262626" p="10px" m="0 auto" color="white">
        <Text mb="15px">My Profile</Text>
        <Box>
          <Image
            src="https://media.istockphoto.com/id/1494104649/id/foto/chatbot-ai-konsep-digital-kecerdasan-buatan.jpg?s=1024x1024&w=is&k=20&c=JU4Q9gPcCn1qanWWp2SQX15gFNPN_3T-uyiKEs99BCs="
            alt="Kepo"
            borderRadius="lg"
            objectFit="cover"
            maxH="20"
            width="100%"
            backdropFilter="blur(8px)"
            filter="blur(1px)"
          />
          <Image
            borderRadius="full"
            boxSize="70px"
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Dan Abramov"
            pos="absolute"
            top="33%"
            right="70%"
            border="3px solid #3c4445"
          />
        </Box>
        <Button m="15px 0 0 230px" size="xs" border="1px" borderRadius={"full"} bgColor={"#1d1d1d"} color="white">
          Edit Profile
        </Button>
        <Heading size="md">Arya Perdana Irawan</Heading>
        <Text fontSize="xs" color="grey" mt="5px">
          @clocky
        </Text>
        <Text fontSize="small" mt="3px">
          Mau beli trek bank
        </Text>
        <Flex mt="7px">
          <Flex gap="5px" mr="10px">
            <Text>291</Text>
            <Text>Following</Text>
          </Flex>
          <Flex gap="5px">
            <Text>1.2k</Text>
            <Text>Followers</Text>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
};

export default Profile;
