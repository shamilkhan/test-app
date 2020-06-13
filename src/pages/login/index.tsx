//@ts-nocheck
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Form, FormItemProps } from "antd";
import { login } from "../../store/user/";
import "./index.scss";

type LoginParams = {
  username: string;
  password: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoginProcess, setisLoginProcess] = useState(false);
  const [formItemProps, setFormItemsProps] = useState<FormItemProps>({});

  const onValuesChange = () => {
    if(Object.keys(formItemProps).length) {
      setFormItemsProps({});
    }
  }

  const onLogin = useCallback(({ token }) => dispatch(login({ token })), []);

  //@ts-ignore
  const onSubmit = ({ username, password }: LoginParams) => {
    setisLoginProcess(true);
    fetch(`${process.env.REACT_APP_API_SERVICE}login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status === 401) {
          return setFormItemsProps({
            validateStatus: "error",
            help: "incorrect username/password",
          });
        }
        let token;
        for (const [key, value] of res.headers.entries()) {
          if (key === "x-test-app-jwt-token") {
            token = value;
          }
        }
        if (token) {
          onLogin({ token });
        }
      })
      // .catch((err) => console.error(err))
      .finally(() => setisLoginProcess(false));
  };

  return (
    <Form
      onValuesChange={onValuesChange}
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        {...formItemProps}
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          type="text"
          placeholder="username"
          name="username"
        />
      </Form.Item>
      <Form.Item
        {...formItemProps}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          type="password"
          name="password"
          placeholder="password"
        />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoginProcess} htmlType="submit" type="primary">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(Login);
