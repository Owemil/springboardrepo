import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */
function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([])
  const [seenJokes, setSeenJokes] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function fetchJokes() {
    async function getJokes() {
      try {

        if (jokes.length === numJokesToGet) {
          if (!localStorage.jokes)
            localStorage.setItem("jokes", JSON.stringify(jokes))
          setIsLoading(loading => !loading);
          return
        }

        if (localStorage.jokes) {
          const localJokes = JSON.parse(localStorage.getItem("jokes"))
          setJokes(() => ([...localJokes]))
          setIsLoading(loading => !loading)
          return
        }

        console.log(jokes)
        if (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let joke = res.data;

          if (!seenJokes.has(joke.id)) {
            setSeenJokes(oldSeen => new Set([...oldSeen, joke.id]));
            setJokes(oldJokes => ([...oldJokes, { ...joke, votes: 0 }]));
          } else {
            console.log("duplicate found!");
          }

        }
      } catch (err) {
        console.error(err);
      }
    }
    getJokes()
  }, [jokes, numJokesToGet, seenJokes])

  /* empty joke list, set to loading state, and then call getJokes */

  const generateNewJokes = () => {
    localStorage.removeItem("jokes")
    setIsLoading(loading => !loading)
    setJokes(() => ([]))
  }

  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    setIsLoading(loading => !loading)
    setJokes(jokes => (jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    )
    ));
  }

  /* render: either loading spinner or list of sorted jokes. */

  let sortedJokes = jokes.sort((a, b) => b.votes - a.votes);


  return (
    <>
      {isLoading ?
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
        :
        <div className="JokeList">
          <button
            className="JokeList-getmore"
            onClick={generateNewJokes}
          >
            Get New Jokes
          </button>

          {sortedJokes.map(j => (
            <Joke
              text={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={vote}
            />
          ))}
        </div>}
    </>

  );
}

export default JokeList;
