function Tweet(props) {
    const { username, name, date, msg } = props
    return (
        <div className="tweet">
            <h2>{name}</h2>
            <h3>{username}</h3>
            <p>{msg} <br /> <small>{date}</small> </p>


        </div>
    )
}