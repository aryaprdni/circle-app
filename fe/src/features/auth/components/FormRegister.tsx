import { Box, Button, Card, Container, Flex, Heading, Input, Text } from "@chakra-ui/react";

const Register = () => {
  return (
    <Container display={"flex"} alignItems={"center"} justifyContent={"center"} h="100vh">
      <Card p={4} w={"300px"}>
        <Box>
          <Flex justifyContent={"center"}>
            <Heading color="green" my={4}>
              Circle
            </Heading>
          </Flex>
        </Box>
        <Text fontWeight="bold" textAlign={"center"}>
          Create Account Circle
        </Text>
        <Flex direction={"column"} gap={2} mt={2}>
          <Input borderColor={"black"} placeholder="fullname" name="full_name" />
          <Input borderColor={"black"} placeholder="email" name="email" />
          <Input borderColor={"black"} placeholder="password" type="password" name="password" />
        </Flex>
        <Button mt={3} bg={"green"} textColor={"white"} type="submit">
          Create
        </Button>

        <Flex fontSize={15} mt={1} gap="2px">
          <Text>Already have an account?</Text>
          <Text color={"green"} textDecoration={"underline"}>
            Login
          </Text>
        </Flex>
      </Card>
    </Container>
  );
};

export default Register;
