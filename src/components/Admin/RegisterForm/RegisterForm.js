import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { LockOutlined , MailOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    //name:"",
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });

  const [formValid, setFormValid] = useState({
    // name:false,
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });
    }
  };

  const inputValidation = e => {
    const { type, name } = e.target;

    // if (type === "name") {
    //   setFormValid({ ...formValid, [name]: minLengthValidation(e.target) });
    // }


    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }

    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }

    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = async e => {
    e.preventDefault();
    
    
    // const nameVal = inputs.name;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if ( !emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales"
        });
      } else {
        const result = await signUpApi(inputs);

        if (!result.ok) {
          notification["error"]({
            message: result.message
          });
        } else {
          notification["success"]({
            message: result.message
          });
          RegisterForm();
        }
      }
    }
  };

  const RegisterForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.lenght; i++) {
      inputs[i].classlist.remove("success");
      inputs[i].classlist.remove("error");
    }

    setInputs({
      // name: "",
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });

    setFormValid({
      // name: false,
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });
  };

  return (
    
    <Form className="register-form" onSubmit={register} onChange={changeForm}>
          <Form.Item>
        <Input
          prefix={
            <MailOutlined
              className="Icono"
              type="user"
              style={{ color: "rgba(0,0,0,.25)",  position: "relative", fontSize: 22, top:6 , left: 5, }}
            />
          }
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      
      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="Icono"
              type="lock"
              style={{ color: "rgba(0,0,0,.25)", position: "relative", fontSize: 22, top:6 , left: 5, }}
            />
          }
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>

      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="Icono"
              type="lock"
              style={{ color: "rgba(0,0,0,.25)", position: "relative", fontSize: 22, top:6 , left: 5, }}
            />
          }
          type="password"
          name="repeatPassword"
          placeholder="Repetir Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>

      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leido y Acepto la politica de privacidad.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          className="register-form__button"
          onClick={register}
        >
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
