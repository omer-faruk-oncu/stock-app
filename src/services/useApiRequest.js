import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useApiRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userData) => {
    //   const BASE_URL = "https://11143.fullstack.clarusway.com"

    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login başarısız oldu");
      console.log(error);
    }
  };

  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users`,
        userData
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Kayıt işlemi başarılı");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Kayıt başarısız oldu");
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout işlemi başarılı");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout işlemi başarısız oldu");
      console.log(error);
    }
  };

  return { login, register, logout };
};

export default useApiRequest;
