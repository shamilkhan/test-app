import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../store";

const useToken = () => {
  //@ts-ignore
  const token = useSelector((store: AppStore) => store.user.token);

  return token;
};

export default useToken;
