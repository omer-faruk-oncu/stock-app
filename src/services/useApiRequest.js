//import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";

const useApiRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosToken, axiosPublic } = useAxios();
  //const { token } = useSelector((state) => state.auth);

  const login = async (userData) => {
    //   const BASE_URL = "https://11143.fullstack.clarusway.com"

    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userData
      // );
      const { data } = await axiosPublic.post("/auth/login/", userData);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login başarısız oldu");
      console.log(error);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users`,
      //   userInfo
      // );
      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Kayıt işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Kayıt başarısız oldu");
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: {Authorization: `Token ${token}`},
      // });
      await axiosToken.get("/auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout işlemi başarılı");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout işlemi başarısız oldu");
      console.log(error);
    }
  };

  return { login, register, logout };
};

export default useApiRequest;
