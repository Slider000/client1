import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUsersApi } from "../../../api/user";

import "./Users.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    getUsersApi(token).then(response=> {
      console.log(response);
    });
  }, [token]);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
    </div>
  );
}
