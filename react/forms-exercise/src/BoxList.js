import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";

function BoxList() {
    const INITIAL_STATE =
        [
            {
                height: "100px",
                width: "100px",
                backgroundColor: "purple"
            }
        ]
    const [boxData, setBoxData] = useState(INITIAL_STATE)

    const addBox = (newItem) => {
        setBoxData(box => ([...box, { ...newItem }]))
    }

    return (
        <>
            <NewBoxForm addBox={addBox} />
            {boxData.map(box => {
                return (
                    <Box
                        height={box.height}
                        width={box.width}
                        backgroundColor={box.backgroundColor}
                        key={uuid()}
                    />)
            })}
        </>
    )
}

export default BoxList