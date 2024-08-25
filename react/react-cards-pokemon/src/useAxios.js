import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";

function useAxios(URL) {
    const [array, setArray] = useState([]);

    const addArray = name => {
        const pokemon = async name => {
            const response = await axios.get(URL + `${name}/`);
            setArray(array => [...array, { ...response.data, id: uuid() }]);
        }

        const drawCard = async () => {
            const response = await axios.get(URL);
            setArray(array => [...array, { ...response.data, id: uuid() }])
        }
        (typeof (name) == `string`) ? pokemon(name) : drawCard()
        // if (typeof (name) != `string`) {
        //     const response = await axios.get(URL);
        //     setArray(array => [...array, { ...response.data, id: uuid() }]);
        // } else if (typeof (name) == `string`) {
        //     const response = await axios.get(URL + `${name}/`);
        //     setArray(array => [...array, { ...response.data, id: uuid() }]);
        // }

    };

    const resetArray = () => setArray([])

    return [array, addArray, resetArray]
}

export default useAxios