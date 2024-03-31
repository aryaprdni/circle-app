/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Follows from "./pages/Follows";
import Search from "./pages/Search";
import { API, setAuthToken } from "./libs/axios";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "./store/RootReducer";
import Main from "./layouts";
import { toast } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function testNotification() {
    toast.info(
      <p>
        New threads are available! <a href="/">Check it out!</a>
      </p>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }

  useEffect(() => {
    const sse = new EventSource("http://localhost:3000/api/v1/notification");

    async function getRealtimeData(data: any) {
      if (!data) {
        console.error("Null pointer exception: data is null or undefined");
        return;
      }
      try {
        console.log("Ini datanya cuy:", data);
        testNotification();
      } catch (error) {
        console.error("Unhandled exception in getRealtimeData:", error);
      }
    }

    sse.onopen = (e) => console.log("berhasil connect ! : ", e);
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      console.log("Error SSE bro!");
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  async function checkAuth() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/user/check");
      dispatch(AUTH_CHECK(response.data));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    } else {
      checkAuth();
    }
  }, []);

  function isNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  }

  function isLogin() {
    if (localStorage.token) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  }

  return (
    <Routes>
      <Route path="/" element={isNotLogin()}>
        <Route
          path="/"
          element={
            <Main>
              <Home />
            </Main>
          }
        />
        <Route
          path="/profile"
          element={
            <Main>
              <Profile />
            </Main>
          }
        />
        <Route
          path="/follows"
          element={
            <Main>
              <Follows />
            </Main>
          }
        />
        <Route
          path="/search"
          element={
            <Main>
              <Search />
            </Main>
          }
        />
        <Route
          path="/threads/:id"
          element={
            <Main>
              <Detail />
            </Main>
          }
        />
      </Route>

      <Route path="/" element={isLogin()}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
