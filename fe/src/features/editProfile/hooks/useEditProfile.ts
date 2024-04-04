/* eslint-disable @typescript-eslint/no-explicit-any */
// useEditProfile.js
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { API, setAuthToken } from "../../../libs/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { AUTH_UPDATE } from "../../../store/RootReducer";
import { toast } from "react-toastify";

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

  const profilePictureInputRef = useRef<HTMLInputElement>(null);
  const backgroundPictureInputRef = useRef<HTMLInputElement>(null);

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
      formData.append("full_name", form.full_name);
      formData.append("username", form.username);
      formData.append("bio", form.bio);
      
      if (form.profile_picture) {
        formData.append("profile_picture", form.profile_picture);
      }

      if (form.profile_description) {
        formData.append("profile_description", form.profile_description);
      }

      const response = await API.patch(`/user/edit-profile`, formData);
      const updatedUserData = response.data;
      console.log(response.data);
      dispatch(AUTH_UPDATE(updatedUserData));
      localStorage.setItem("profileUpdated", "true");

      window.location.reload();
    } catch (error) {
      console.log("Error edit profile :", error);
    }
  }

  window.onload = function() {
    const profileUpdated = localStorage.getItem("profileUpdated");
    if (profileUpdated === "true") {
      localStorage.removeItem("profileUpdated");
      toast.success("Profile updated successfully");
    }
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      full_name: user.data.full_name || "",
      username: user.data.username || "",
      bio: user.data.bio || "",
      profile_picture: user.data.profile_picture || null,
      profile_description: user.data.profile_description || null,
    }));
  }, [user.data]);
  

  return {
    handleChange,
    handleEditProfile,
    profilePictureInputRef,
    backgroundPictureInputRef,
    form,
    setForm 
  };
}
