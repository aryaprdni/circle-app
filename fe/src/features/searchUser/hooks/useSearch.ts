import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { GET_USERS } from "../../../store/RootReducer";
import { API, setAuthToken } from "../../../libs/axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IUserSearch } from "../../../interface/IAuth";

export function useSearchUsers() {
  setAuthToken(localStorage.token);
  const dispatch = useDispatch();
  const searchUsers = useSelector((state: RootState) => state.users);
  const [search, setSearch] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<IUserSearch[]>([]);
  const auth = useSelector((state: RootState) => state.auth);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);

    if (search === "") {
      setFilteredResults(searchUsers.users.filter((user) => user.id !== auth?.data.id));
    } else if (auth) {
      const filteredUsers = searchUsers.users.filter((user: IUserSearch) => {
        return user.id !== auth.data.id && Object.values(user).join("").toLowerCase().includes(search.toLowerCase());
      });
      setFilteredResults(filteredUsers);
    } else {
      setFilteredResults(searchUsers.users);
    }
  };

  async function getSearchUsers() {
    try {
      const response = await API.get("/users");
      dispatch(GET_USERS(response.data.data));
    } catch (error) {
      console.error("Error fetching search users:", error);
    }
  }

  useEffect(() => {
    getSearchUsers();
  }, []);

  return {
    getSearchUsers,
    searchUsers,
    handleSearch,
    filteredResults,
  };
}
