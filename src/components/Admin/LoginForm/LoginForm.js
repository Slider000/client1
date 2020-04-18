import React, {useState} from "react";
import { Form,  Input, Button, notification } from "antd";
import { UserOutlined , LockOutlined } from "@ant-design/icons";
import {signInApi} from "../../../api/user";

import "./LoginForm.scss";

export default function LoginForm() {

   const [inputs , setInputs] = useState({
       email:"",
       password:"",
   });

   const changeForm = e => {
    setInputs({
        ...inputs,
        [e.target.name ]: e.target.value
    });
   };

   const login = e => {
       e.preventDefault();

       signInApi(inputs);

      
   };


  return (
      <Form className="login-from" onChange = {changeForm} onSubmit={login}>
          <Form.Item>
              <Input
                   prefix={
                    <UserOutlined  className="Icono"type="lock" style={{ color: "rgba(0,0,0,.25)" ,  position: "relative", fontSize: 24, top:1 , left: 0,}} /> }
                 type="email"
                 name="email"
                 placeholder="Correo Electronico"
                 className="login-form__imput"
              />

          </Form.Item>
          <Form.Item>
              <Input
                   prefix={
                    <LockOutlined  className="Icono"type="lock" style={{ color: "rgba(0,0,0,.25)",  position: "relative", fontSize: 24, top:1 , left: 0, }} /> }
                 type="password"
                 name="password"
                 placeholder="Contraseña"
                 className="login-form__imput"
              />

          </Form.Item>
          <Form.Item>
              <Button htmlType="submit" className="login-form__button" onClick={login}> Entrar </Button>
          </Form.Item>

      </Form>
  )
}
