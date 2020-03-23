import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

export const CTX = React.createContext()

const initState = {
    general: [
        { from: 'James', msg: 'hello' },
        { from: 'Whitney', msg: 'hello' },
        { from: 'Josh', msg: 'hello' },
    ],
    topic2: [
        { from: 'Luke', msg: 'hello' },
        { from: 'PrisonMike', msg: 'hello' },
        { from: 'aaron', msg: 'hello' },
    ]
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    },

                ]
            }
        default:
            return state
    }
}



let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
}



export default function MessageStore(props) {

    const [profile, profileChanger] = useState({})

    useEffect(() => {
        if (!profile.first_name) {
            axios.get('/api/user').then(res => {
                console.log(res)
                profileChanger({ ...res.data })

            }).catch(err => console.log(err))
        }
    }, [])

    console.log(profile)



    const [allchats, dispatch] = React.useReducer(reducer, initState)

    if (!socket) {
        socket = io(':4450')
        socket.on('chat message', function (msg) {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
        })
    }

    console.log(profile)
    const user = profile.first_name



    return (
        <CTX.Provider value={{ allchats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}