function Person(props) {
    const name = (props.name.length > 8) ? props.name.slice(0, 7) : name
    const vote = (props.age >= 18) ? "please go vote!" : "you must be 18"
    const { hobbies, age } = props

    return (
        <div>
            <h3>{vote}</h3>
            <p>Learn some info about this person
                <br />
                <br />
                Hi, I'm {name} and I'm {age}!
                <br />
                My hobbies include: <ul>{hobbies.map(h => (<li>{h}</li>))}</ul>
            </p>
        </div>
    )
}