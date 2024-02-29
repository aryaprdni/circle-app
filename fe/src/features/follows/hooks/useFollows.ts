import { useDispatch } from "react-redux";
import { API } from "../../../libs/axios";
import { GET_USERS } from "../../../store/RootReducer";
import { useEffect } from "react";

export default function useFollows() {
  const dispatch = useDispatch();

  async function getSuggestedFollowing() {
    try {
      const response = await API.get("/users");
      console.log("response", response);
      dispatch(GET_USERS(response.data.data));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getSuggestedFollowing();
  }, []);

  return {
    getSuggestedFollowing,
  };
}
