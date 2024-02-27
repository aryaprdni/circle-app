import { useState, ChangeEvent } from "react";
import { IRegister } from "../../../interface/IAuth";
import { API } from "../../../libs/axios";

export function useRegister() {
  const [form, setForm] = useState<IRegister>({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      await API.post("/user/register", form);
    } catch (error) {
      console.log(error);
    }
  }

  return { handleChange, handleRegister };
}
