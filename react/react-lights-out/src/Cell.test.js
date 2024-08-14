import React from "react";
import Cell from "./Cell";
import { render } from "@testing-library/react";


it("should render", () => {
    render(<Cell isLit={true} />)
})
it("should match snapshot", () => {
    const { isFragment } = render
    expect(isFragment).toMatchSnapshot()
})