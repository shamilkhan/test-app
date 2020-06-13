import React from "react";
import Wrapper from "../../../testing-utils/store-wrapper";
import { render, fireEvent } from "@testing-library/react";
import Login from "../index";

describe("<Login/>", () => {
  it("Render in Login Button in DOM ", () => {
    const { getByText } = render(<Login />, { wrapper: Wrapper });
    const submitButtom = getByText("Login");
    expect(submitButtom).toBeInTheDocument();
  });
  it("Rendered Inputs", () => {
    const { getByPlaceholderText } = render(<Login />, { wrapper: Wrapper });
    const usernameNode = getByPlaceholderText("username");
    expect(usernameNode).toBeInTheDocument();
    expect(usernameNode.type).toBe("text");
    const passwordNode = getByPlaceholderText("password");
    expect(passwordNode.type).toBe("password");
    expect(passwordNode).toBeInTheDocument();
  });
  it("reaction to change Event", () => {
    const { getByPlaceholderText } = render(<Login />, { wrapper: Wrapper });
    const usernameNode = getByPlaceholderText("username");
    expect(usernameNode.value).toBe("");
    /**@description Fill input */
    fireEvent.change(usernameNode, {
      target: { value: "Sam" },
    });
    expect(usernameNode.value).toBe("Sam");
  });
  it("test submit", () => {
    const { getByPlaceholderText, getByText } = render(<Login />, { wrapper: Wrapper });
    const usernameNode = getByPlaceholderText("username");
    const passwordNode = getByPlaceholderText("password");
    const submitButtom = getByText("Login");
    /**@description Fill Username */
    fireEvent.change(usernameNode, {
      target: { value: "Sam" },
    });
    /**@description Fill Password */
    fireEvent.change(passwordNode, {
      target: { value: "12345" },
    });
    fireEvent.click(submitButtom);
  });
});
