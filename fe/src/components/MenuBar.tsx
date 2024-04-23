import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text, Container, Spacer, useBreakpointValue } from "@chakra-ui/react";
import { RiUserSearchFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { AUTH_LOGOUT } from "../store/RootReducer";
import { useDispatch } from "react-redux";

const MenuBar = () => {
  const Menubar = useBreakpointValue({ base: "auto", lg: "90vh" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    dispatch(AUTH_LOGOUT());
    navigate("/login");
  }

  return (
    <>
      <Container>
        <Flex flexDirection={{ base: "row", md: "row", lg: "column", xl: "column" }} justify={"space-between"} gap={4} minHeight={Menubar}>
          <Box color="green" as="b" ml="30px" display={{ base: "none", lg: "block", xl: "block" }} fontSize={{base: "3xl", lg: "5xl", xl: "5xl"}}>
            circle
          </Box>

          <NavLink to="/">
            <Flex display="flex" flexDirection="row" alignItems="center" color="white" ml="30px">
              <FaHome fontSize={"20px"}/>
              <Text ml="10px" display={{ base: "none", lg: "block", xl: "block" }}>
                Home
              </Text>
            </Flex>
          </NavLink>

          <NavLink to="/search">
            <Flex display="flex" flexDirection="row" alignItems="center" color="white" ml="30px">
              <RiUserSearchFill fontSize={"20px"}/>
              <Text ml="10px" display={{ base: "none", lg: "block", xl: "block" }}>
                Search{" "}
              </Text>
            </Flex>
          </NavLink>

          <NavLink to="/follows">
            <Flex display="flex" flexDirection="row" alignItems="center" color="white" ml="30px">
              <FaHeart fontSize={"20px"}/>
              <Text ml="10px" display={{ base: "none", lg: "block", xl: "block" }}>
                Follows{" "}
              </Text>
            </Flex>
          </NavLink>

          <NavLink to="/profile">
            <Flex display="flex" flexDirection="row" alignItems="center" color="white" ml="30px">
              <CgProfile fontSize={"20px"}/>
              <Text ml="10px" display={{ base: "none", lg: "block", xl: "block" }}>
                Profile{" "}
              </Text>
            </Flex>
          </NavLink>

          <Button w="100%" borderRadius="20px" bg="green" color="white" display={{ base: "none", lg: "block", xl: "block" }}>
            Create Post
          </Button>

          <Spacer />

          <NavLink to="/login" onClick={handleLogout}>
            <Flex alignItems="center" color="white" ml="30px">
              <CiLogout fontSize="30px" />
              <Text ml="10px" fontSize="1xl" display={{ base: "none", lg: "block", xl: "block" }}>
                Logout
              </Text>
            </Flex>
          </NavLink>
        </Flex>
      </Container>
    </>
  );
};

export default MenuBar;
