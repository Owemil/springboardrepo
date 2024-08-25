import React, { useState } from "react";

function useFlip() {
    const [state, setState] = useState(true)

    const handleFlip = () => {
        setState(state => !state)
    }
    return [state, handleFlip]
}

export default useFlip