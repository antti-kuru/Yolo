const Notification = ({message}) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 32,
        background: 'lightgray',
        
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

export default Notification