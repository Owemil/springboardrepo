function App() {
    return (
        <div>
            <Tweet username="test1" name="Jeff Testerson" date="Apr 25th, 2020, 03:36 AM" msg="this is BUT a test" />
            <Tweet username="test2" name="Bill Testerson" date="Jan 15th, 2021, 12:34 AM" msg="this is ONLY a test" />
            <Tweet username="test3" name="Duff Testerson" date="Mar 8th, 2022, 08:34 AM" msg="this is  JUST a test" />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))