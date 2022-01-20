import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'


export default function ErrorPage() {
    // const [ socket, setSocket ] = useState()
    const socket = useSelector(state => state.socket)
    
    useEffect(() => {
        console.log(socket)
    })
    // useEffect(() => {
        // const s = io('http://localhost:3001')
        // console.log(s)

        // s.on('connect', () => {
        //     setSocket( s )
        // })
    //     // s.on('connect', () => {
    //     //     console.log(`You connected with id: ${s.id}`)
    //     //     // send custom event to server say-hello, msg parameter
    //     //     s.emit('say-hello', `Hello there from ${s.id}!`)
    //     //     s.on('recieve-message', msg => {
    //     //         console.log(msg)
    //     //     })
    //     // })
    // }, [])

    // useEffect(() => {
    //     if (!socket) {return}
    //     console.log(socket)
    // }, [socket])

    // function handleClick () {
    //     // sends join-room event with room parameter, sent with call back function that the server can call upon the client
    //     socket.emit('join-room', "room", msg => {
    //         console.log(msg)
    //     })

    //     // connect to socket connection
    //     socket.connect()
    //     // disconnect from socket connection
    //     socket.connect()
    // }
    
    
    return (
        <div>
            Page not found
        </div>
    )
}
