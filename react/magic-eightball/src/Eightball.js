import React, { useState, useEffect } from "react"
import EightballCount from "./Eightball_count"
import './Eightball.css';

function Eightball(props) {
  const answers = props.answers
  const rand = Math.floor(Math.random() * answers.length)


  const { msg, color } = answers[rand]
  const [answer, setAnswer] = useState("Think about a question")
  const [background, setBackground] = useState("black")
  const [gldCount, setGldCount] = useState(0)
  const [grnCount, setGrnCount] = useState(0)
  const [redCount, setRedCount] = useState(0)

  const handleClick = (msg, color) => {
    setAnswer(msg)
    setBackground(color)
    if (color === "goldenrod") {
      setGldCount(gldCount + 1)
    } else if (color === "green") {
      setGrnCount(grnCount + 1)
    } else {
      setRedCount(redCount + 1)
    }
  }

  const handleReset = () => {
    setAnswer("Think about a question")
    setBackground("black")
    setGldCount(0)
    setGrnCount(0)
    setRedCount(0)

  }

  useEffect(() => {
    document.querySelector(".eightball").style.backgroundColor = background
    document.querySelector(".eightball_count").style.borderColor = background
  }, [background])

  return (
    <>

      <h1 className="eightball_banner">Commune with the Magic Eightball..</h1>
      <button className="Eightball_reset" onClick={handleReset} >Reset</button>
      <EightballCount gldCount={gldCount} grnCount={grnCount} redCount={redCount} />
      <div onClick={() => handleClick(msg, color)} className="eightball">
        <p className="eightball_text">{answer}</p>
      </div>
    </>
  )
}

export default Eightball;

