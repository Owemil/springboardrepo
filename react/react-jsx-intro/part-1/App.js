function App() {
    return (
        <div>
            <FirstComponent />
            <NameComponent name="johnny test" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))