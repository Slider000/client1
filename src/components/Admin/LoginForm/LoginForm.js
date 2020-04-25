import React, { useState } from "react";
import { Form, Input, Button, notification, Result } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await signInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refrshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refrshToken);

      notification["success"]({
        message: "Login correcto."
      });

      window.location.href = "/admin";


    }

    console.log(result);
  };

  return (
    <Form className="login-from" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined
              className="Icono"
              type="lock"
              style={{
                color: "rgba(0,0,0,.25)",
                position: "relative",
                fontSize: 24,
                top: 1,
                left: 0,
              }}
            />
          }
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="login-form__imput"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="Icono"
              type="lock"
              style={{
                color: "rgba(0,0,0,.25)",
                position: "relative",
                fontSize: 24,
                top: 1,
                left: 0,
              }}
            />
          }
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__imput"
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="login-form__button"
          onClick={login}
        >
          {" "}
          Entrar{" "}
        </Button>
      </Form.Item>
    </Form>
  );
}
