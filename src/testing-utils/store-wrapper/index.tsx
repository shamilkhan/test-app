import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../store";

window.matchMedia = window.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  };
};

type Props = {
  children: ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Wrapper;
