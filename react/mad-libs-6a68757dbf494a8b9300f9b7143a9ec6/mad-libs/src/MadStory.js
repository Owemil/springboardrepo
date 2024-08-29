import React from "react";
/**
 *  MadStory component takes two props.
 * 
 * Story which is the array in state that has our story pieces
 * 
 * reset which is a simple function for reseting states
 */
function MadStory({ story, reset }) {

    return (
        <div className="MadStory">
            <p>there was a {story[0].color} {story[0].noun} who loved a {story[0].adjective} {story[0].noun2}</p>
            <button onClick={reset}>reset</button>
        </div>
    )
}

export default MadStory