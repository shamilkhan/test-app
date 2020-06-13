import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import TimeComponent from "../index";

describe("<TimeComponent />", () => {
  it("TimeStamp rendered in document", () => {
    const TIME_STAMP = 12345667;
    const { getByText } = render(
      <TimeComponent isConnected timestamp={TIME_STAMP} />
    );
    const node = getByText(TIME_STAMP.toString());
    expect(node).toBeInTheDocument();
  });
  it("SnapShot", () => {
    const tree = renderer
      .create(<TimeComponent isConnected timestamp={111111111} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
