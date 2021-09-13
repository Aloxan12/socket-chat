import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {io} from "socket.io-client";

//const socket = io("http://localhost:3009")

function App() {
    const [messages, setMessages] = useState([
        {message: 'Hello, Vika', id: v1(), user: {id: v1(), name: 'Alex'}},
        {message: 'Hello, Alex', id: v1(), user: {id: v1(), name: 'Viktoria'}}
    ])

    useEffect(() => {

    }, [])

    return (
        <div className='App'>
            <div>
                <div
                    style={{
                        border: '1px solid',
                        padding: '20px',
                        width: '300px',
                        height: '300px',
                        overflow: 'scroll'
                    }}>
                    {messages.map(m => {
                        return (
                            <div>
                                <b>{m.user.name}:</b> {m.message}
                                <hr/>
                            </div>
                        )
                    })}
                </div>
                <textarea></textarea>
                <button>send</button>
            </div>
        </div>
    );
}

export default App;
