import React, { useCallback, useEffect, useState } from "react";
import useToken from "../../custom-hooks/use-token";
import LoadingComponent from "../../shared/loading-component";
import Logout from "./logout";
import TimeComponent from "./time-component";

import "./index.scss";

const TimeData = () => {
  const token = useToken();
  //@ts-ignore
  let socket: WebSocket = null;
  let connectionAb = new AbortController();
  const [wsUrl, setWsUrl] = useState("");
  const [serverDate, setServerDate] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);

  /**@description Get connection string  Effect */
  useEffect(() => {
    getConnectionUrl();
  }, [isConnected]);

  /**@description Connect to WS server */
  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [wsUrl]);

  /**@description Clear all side-effects on unmount */
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
      connectionAb.abort();
    };
  }, []);

  const getConnectionUrl = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_SERVICE}subscribe`, {
      signal: connectionAb.signal,
      headers: {
        "x-test-app-jwt-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWsUrl(data.url);
      })
      .catch((err) => console.log("subscribe error is", err));
  }, []);

  const connect = () => {
    if (!wsUrl) return;
    if (socket) {
      socket.close();
    }
    socket = new WebSocket(wsUrl);
    socket.onopen = (e) => {
      console.log("Socket open connection");
      setIsConnected(true);
      socket.onmessage = (e: MessageEvent) => {
        setServerDate(JSON.parse(e.data)["server_time"]);
      };
      socket.onclose = () => {
        setIsConnected(false);
      };
    };
  };

  return (
    <div className="time-data">
      {Boolean(serverDate) && (
        <TimeComponent isConnected={isConnected} timestamp={serverDate} />
      )}
      {isConnected || (
        <div className="time-data__loader">
          <LoadingComponent />
        </div>
      )}
      <Logout />
    </div>
  );
};

export default React.memo(TimeData);
