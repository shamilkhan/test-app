//@ts-nocheck
import React, { Suspense } from "react";
import useToken from "./custom-hooks/use-token";
import "./App.css";
import 'antd/dist/antd.css';

const LoginPage = React.lazy(() => import("./pages/login"));
const TimeDataPage = React.lazy(() => import("./pages/time-data"));

function App() {
  const token = useToken();

  return (
    <div className="App">
      {token ? (
        <Suspense fallback={() => <div>loading</div>}>
          <TimeDataPage />
        </Suspense>
      ) : (
        <Suspense fallback={() => <div>loading</div>}>
          <LoginPage />
        </Suspense>
      )}
    </div>
  );
}

export default App;
