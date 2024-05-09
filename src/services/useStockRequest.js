

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchStart, firmSuccess, fetchFail, createFirmSuccess, updateFirmSuccess } from "../features/firmSlice";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const getFirms = async () => {
    
    dispatch(fetchStart()); 
    try {
      const { data } = await axiosToken.get("/firms"); 
      // console.log(data);
      dispatch(firmSuccess(data));
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); 
    }
  };

  const createFirm = async (firmInfo) => {
    
    dispatch(fetchStart()); 
    try {
      const { data } = await axiosToken.post("/firms/", firmInfo); 
       console.log(data);
      dispatch(createFirmSuccess(data));
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); 
    }
  };



  const updateFirm = async (id, firmInfo) => {
    
    dispatch(fetchStart()); 
    try {
      const { data } = await axiosToken.put(`/firms/${id}`, firmInfo); 
       console.log(data);
      dispatch(updateFirmSuccess(data));
      getFirms();
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail()); 
    }
  };


  const firmDelete = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.delete(`/firms/${id}`);
      dispatch(firmSuccess(data));
      getFirms(); 
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { getFirms, firmDelete, createFirm, updateFirm }; 
};

export default useStockRequest;
