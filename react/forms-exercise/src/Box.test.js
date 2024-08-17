import React from "react";
import Box from "./Box";
import { render } from "@testing-library/react";

it("should render", () => {
    render(<Box height="100px" width="100px" backgroundColor="purple" />)
})

it("should match snapshot", () => {
    const { asFragment } = render(<Box height="100px" width="100px" backgroundColor="purple" />)

    expect(asFragment).toMatchSnapshot
})
