import React from 'react'
import io from 'socket.io-client'

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

    const [allchats, dispatch] = React.useReducer(reducer, initState)

    if (!socket) {
        socket = io(':4450')
        socket.on('chat message', function (msg) {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
        })
    }

    const user = 'aaron' + Math.random(100).toFixed(2)



    return (
        <CTX.Provider value={{ allchats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}