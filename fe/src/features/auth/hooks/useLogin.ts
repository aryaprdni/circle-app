import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../../interface/IAuth";
import { API } from "../../../libs/axios";
import { AUTH_LOGIN } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<ILogin>({
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await API.post("/user/login", form);
      dispatch(AUTH_LOGIN(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return { handleChange, handleLogin };
}
