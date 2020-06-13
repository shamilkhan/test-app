//@ts-nocheck
import React from "react";
import loadable from "@loadable/component";
import useToken from "./custom-hooks/use-token";
import "./App.css";
import "antd/dist/antd.css";

const LoginPage = loadable(() => import("./pages/login"));
const TimeDataPage = loadable(() => import("./pages/time-data"));

function App() {
  const token = useToken();
  return <div className="App">{token ? <TimeDataPage /> : <LoginPage />}</div>;
}

export default App;
