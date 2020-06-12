import React, { useCallback, useEffect, useState } from "react";
import useToken from "../../custom-hooks/use-token";
import LoadingComponent from "../../shared/loading-component";
import Logout from "./logout";
import TimeComponent from "./time-component";

import "./index.scss";

const TimeData = () => {
  const token = useToken();

  const [wsUrl, setWsUrl] = useState("");
  const [serverDate, setServerDate] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnectionUrl();
  }, []);

  useEffect(() => {
    connect();
  }, [wsUrl]);

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
      {Boolean(serverDate) && <TimeComponent timestamp={serverDate} />}
      {isConnected || (
        <div className="time-data__loader">
          <LoadingComponent />
        </div>
      )}
      <Logout />
    </div>
  );
};

export default TimeData;
