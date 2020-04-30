import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/original.png";

import "./EditUserFrom.scss";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg , image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item >
            <Input 
              prefix={<UserOutlined  style={{ color: "#ABB2B9 "}}/>  }
              placeholder="Nombre"
              defaultValue={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "#ABB2B9 ",}} />}
            placeholder="Apellidos"
            defaultValue={userData.lastname}
            onChange={(e) =>
              setUserData({ ...userData, lastname: e.target.value })
            }
          />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
        <Form.Item>
          <Input
            prefix={<MailOutlined style={{ color: "#ABB2B9 ",}} />}
            placeholder="Correo Electronico"
            defaultValue={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
          <Select
            placeholder="Selecciona un rol"
            onChange={(e) => setUserData({ ...userData, role: e })}
            defaultValue={userData.role}
          >
            <Option value="admin">Administrador</Option>
            <Option value="editor">Editor</Option>
            <Option value="reviewr">Revisor</Option>
          </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined  style={{ color: "#ABB2B9 ",}}/>}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined  style={{ color: "#ABB2B9 ",}}/>}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={updateUser}
        >
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
