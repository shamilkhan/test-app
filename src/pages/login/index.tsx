//@ts-nocheck
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "antd";
import { login } from "../../store/user/";
import "./index.scss";

type LoginParams = {
  username: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm();
  const [isLoginProcess, setisLoginProcess] = useState(false);

  const onLogin = useCallback(({ token }) => dispatch(login({ token })), []);

  //@ts-ignore
  const onSubmit = ({ username, password }: LoginParams) => {
    setisLoginProcess(true);
    fetch(`${process.env.REACT_APP_API_SERVICE}login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        let token = null;
        //@ts-ignore
        for (var pair of res.headers.entries()) {
          token = pair[1];
        }
        if (token) {
          onLogin({ token });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setisLoginProcess(false));
  };

  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <Controller
        as={<Input />}
        type="text"
        placeholder="username"
        name="username"
        className="login-form__item"
        control={control}
        rules={{ required: true }}
      />
      <Controller
        as={<Input.Password />}
        className="login-form__item"
        type="password"
        name="password"
        placeholder="password"
        control={control}
        rules={{ required: true }}
      />
      <Button
        className="login-form__item"
        loading={isLoginProcess}
        htmlType="submit"
        type="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default React.memo(Login);
