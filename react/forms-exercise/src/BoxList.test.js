import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";



it("should render", () => {
    render(<BoxList />)
})

it("should match snapshot", () => {
    const { asFragment } = render(<BoxList />)

    expect(asFragment).toMatchSnapshot
})

it("should add new Boxes", () => {
    const { getByLabelText, queryByText, getByTestId } = render(<BoxList />)

    const heightInput = getByLabelText("height:");
    const widthInput = getByLabelText("width:");
    const colorInput = getByLabelText("backgroundColor:");
    const submitBtn = queryByText("Submit")

    // fill out the form
    fireEvent.change(heightInput, { target: { value: "100px" } });
    fireEvent.change(widthInput, { target: { value: "100px" } });
    fireEvent.change(colorInput, { target: { value: "teal" } });
    fireEvent.click(submitBtn);

    // item exists!
    expect(getByTestId("100px_teal")).toBeInTheDocument()
})