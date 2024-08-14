import React from "react";
import Board from "./Board";
import Cell from "./Cell";
import { render, fireEvent } from "@testing-library/react";

it("should render", () => {
    render(<Board nrows={5} ncols={5} chanceLightStartsOn={100.00} />)
})

it("should match snapshot", () => {
    const { isFragment } = render
    expect(isFragment).toMatchSnapshot()
})

it("should handle clicks", () => {
    const { getByTestId } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={100.00} />)
    const cell1 = getByTestId("1-2")
    const cell2 = getByTestId("1-3")
    const cell3 = getByTestId("1-1")
    const cell4 = getByTestId("0-2")
    const cell5 = getByTestId("2-2")

    fireEvent.click(cell1)

    expect(cell1).toHaveClass("Cell")
    expect(cell2).toHaveClass("Cell")
    expect(cell3).toHaveClass("Cell")
    expect(cell4).toHaveClass("Cell")
    expect(cell5).toHaveClass("Cell")
})

it("should handle winning", () => {
    const { getByText, toHaveClass } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0.00} />)
    const h1 = getByText("You Win!")

    expect(h1).toHaveClass("Winner")
})