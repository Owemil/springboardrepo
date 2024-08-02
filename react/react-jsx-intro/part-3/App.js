function App() {
    return (
        <div>
            <Person name="Johhny Test" age={11} hobbies={["playing with dog", "annoying siblings", "riding scooter"]} />
            <Person name="Susan Test" age={14} hobbies={["playing with dog", "annoying siblings", "making things"]} />
            <Person name="hugh Test" age={40} hobbies={["playing with dog", "cleaning", "making meatloafs"]} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))