import React from "react";

function EightballCount(props) {
    const { gldCount, grnCount, redCount } = props
    return (
        <>
            <div className="eightball_count">
                <h3>Color Count</h3>
                <p>goldenrod:{gldCount}</p>
                <p>green:{grnCount}</p>
                <p>red:{redCount}</p>
            </div>
        </>
    )
}

export default EightballCount;