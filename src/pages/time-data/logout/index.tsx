import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { logout } from "../../../store/user";

const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => dispatch(logout()), []);

  return (
    <Button
      onClick={onLogout}
      type="primary"
      htmlType="button"
      className="time-data__logout"
    >
      Logout
    </Button>
  );
};

export default React.memo(Logout);
