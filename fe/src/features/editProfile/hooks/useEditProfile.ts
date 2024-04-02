/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { API, setAuthToken } from "../../../libs/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { AUTH_UPDATE } from "../../../store/RootReducer";

export function useEditProfile() {
  setAuthToken(localStorage.token);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState<Record<string, any>>({
    full_name: user.data.full_name,
    username: user.data.username,
    bio: user.data.bio,
    profile_picture: null,
    profile_description: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function handleEditProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", form.full_name || "");
      formData.append("username", form.username || "");
      formData.append("bio", form.bio || "");
      formData.append("profile_picture", form.profile_picture as File);

      const response = await API.patch(`/user/edit-profile`, formData);
      const updateData = response.data;
      dispatch(AUTH_UPDATE(updateData));
    } catch (error) {
      console.log("Error edit profile :", error);
    }
  }

  async function handleEditBackground(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_description", form.profile_description as File);
      const response = await API.patch(`/user/edit-background`, formData);
      console.log("response", response.data);
    } catch (error) {
      console.log("Error edit profile background :", error);
    }
  }

  useEffect(() => {
    setForm({
      full_name: user.data.full_name || "",
      username: user.data.username || "",
      bio: user.data.bio || "",
      profile_picture: null,
      profile_description: user.data.profile_description || null,
    });
  }, [user.data]);

  return {
    handleChange,
    handleEditProfile,
    handleEditBackground,
    fileInputRef,
    form,
  };
}
