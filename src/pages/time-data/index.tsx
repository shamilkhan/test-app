import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { logout } from "../../store/user";
import useToken from "../../custom-hooks/use-token";
import LoadingComponent from "../../shared/loading-component";

import "./index.scss";

const TimeData = () => {
  const dispatch = useDispatch();
  const token = useToken();

  const [wsUrl, setWsUrl] = useState("");
  const [serverDate, setServerDate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnectionUrl();
  }, []);

  useEffect(() => {
    connect();
  }, [wsUrl]);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const getConnectionUrl = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_SERVICE}subscribe`, {
      headers: {
        "x-test-app-jwt-token": token,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setWsUrl(data.url);
      });
  }, []);

  const connect = () => {
    if (!wsUrl) return;
    let socket = new WebSocket(wsUrl);
    socket.onopen = (e) => {
      setIsConnected(true);
      socket.onmessage = (e: MessageEvent) => {
        console.log(e);
        setServerDate(JSON.parse(e.data)["server_time"]);
      };
      socket.onclose = () => setIsConnected(false);
    };
  };

  return (
    <div className="time-data">
      {serverDate && (
        <div className="time-data__value">
          <div className="time-data__icon">🕔</div>
          <div className="time-data__timestamp">{serverDate}</div>
        </div>
      )}
      {isConnected || (
        <div className="time-data__loader">
          <LoadingComponent />
        </div>
      )}
      <Button
        onClick={onLogout}
        type="primary"
        htmlType="button"
        className="time-data__logout"
      >
        Logout
      </Button>
    </div>
  );
};

export default TimeData;
