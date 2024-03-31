<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
=======
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { API, setAuthToken } from "../../../libs/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { AUTH_UPDATE } from "../../../store/RootReducer";

export function useEditProfile() {
  setAuthToken(localStorage.token);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // console.log(id);

<<<<<<< HEAD
  const [form, setForm] = React.useState<Record<string, any>>({
    full_name: user.data.full_name,
    username: user.data.username,
    bio: user.data.bio,
    profile_picture: user,
=======
  const [form, setForm] = React.useState<any>({
    full_name: user.data.full_name,
    username: user.data.username,
    bio: user.data.bio,
    profile_picture: "",
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
    profile_description: "",
  });

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  async function handleEditProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", form.full_name || "");
      formData.append("username", form.username || "");
      formData.append("bio", form.bio || "");
      formData.append("profile_picture", form.profile_picture as File);
      formData.append("profile_description", form.profile_description as File);
      // console.log("data", form);
      // console.log("formData", formData);

      const response = await API.patch(`/user/edit-profile`, formData);
<<<<<<< HEAD
      console.log("response", response.data);
=======
      // console.log("response", response.data);
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
      dispatch(AUTH_UPDATE(form));
    } catch (error) {
      console.log("Error edit profile :", error);
    }
  }

  useEffect(() => {
    setForm({
      full_name: user.data.full_name || "",
      username: user.data.username || "",
      bio: user.data.bio || "",
      profile_picture: "",
      profile_description: user.data.profile_description || null,
    });
  }, [user.data]);

  return {
    handleChange,
    handleEditProfile,
    fileInputRef,
    form,
  };
}
