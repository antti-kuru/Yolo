const Error = ({message}) => {
    const notificationStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 32,
        
    }

    if (message === null){
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Error