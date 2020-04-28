import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import { EditFilled , StopFilled  , DeleteFilled } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/original.png";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);

  return (
    <div className="list-users">
      <div className="list-users_switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UsersActive usersActive={usersActive} />
      ) : (
        <UsersInactive />
      )}
    </div>
  );
}

function UsersActive(props) {
  const { usersActive } = props;

  return (
    <List
      className="users.active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Editar Usuario")}
            >
              <EditFilled />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <StopFilled />
            </Button>,
            <Button
            type="danger"
            onClick={() => console.log("Eliminar Usuario")} 
            >
              <DeleteFilled />
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`
        ${user.name ? user.name : "..."}
        ${user.lastname ? user.lastname : "..."}
        `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UsersInactive() {
  return <h3>Lista De Usuarios Inactivos</h3>;
}
