import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.js";



it("should render", () => {
    render(<Card />)
})

it("should match snapshot", () => {
    const { asFragment } = render(<Card />)

    expect(asFragment()).toMatchSnapshot()
})