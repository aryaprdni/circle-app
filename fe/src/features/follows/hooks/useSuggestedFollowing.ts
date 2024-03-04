import { useDispatch, useSelector } from "react-redux";
import { API, setAuthToken } from "../../../libs/axios";
import { GET_USERS, SET_FOLLOW } from "../../../store/RootReducer";
import { useEffect } from "react";
import { RootState } from "../../../store/types/RootState";

export function useSuggestedFollowing() {
  setAuthToken(localStorage.token);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const userLogin = useSelector((state: RootState) => state.auth);

  async function getUsers() {
    try {
      const response = await API.get("/users");
      dispatch(GET_USERS(response.data));
      // console.log("get all users: ", response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleFollow(id: number, followingUserId: number, is_following: boolean) {
    try {
      dispatch(SET_FOLLOW({ id: id, is_following: !is_following }));

      if (!is_following) {
        const response = await API.post(`/follow`, {
          followingUserId: followingUserId,
        });
        console.log("berhasil unfollow!", response.data);
        getUsers();
      } else {
        const response = await API.delete(`/follow/${followingUserId}`);
        console.log("berhasil unfollow!", response.data);
        getUsers();
      }
    } catch (error) {
      console.error("error", error);
      dispatch(SET_FOLLOW({ id: id, is_following: is_following }));
      throw error;
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.users.filter((user: any) => user.is_following === false && user.id !== userLogin.data.id);

  return {
    users: filteredUsers,
    handleFollow,
  };
}
