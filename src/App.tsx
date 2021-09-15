import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io('http://localhost:3900/')

//const socket = io('https://fast-brushlands-44568.herokuapp.com/')

function App() {
    const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('Alex')
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    useEffect(() => {
        socket.on('init-messages-published', (messages: any) => {
            setMessages(messages);
        })
        socket.on('new-message-sent', (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message])
        })
    }, [])

    useEffect(() => {
        if (isAutoScrollActive) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const messageAnchorRef = useRef<HTMLDivElement>(null)

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
                    }}
                    onScroll={(e) => {
                        let element = e.currentTarget
                        const maxScrollPosition = element.scrollHeight - element.clientHeight

                        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
                            setIsAutoScrollActive(true)
                        } else {
                            setIsAutoScrollActive(false)
                        }
                        setLastScrollTop(element.scrollTop)
                    }}>
                    {messages.map(m => {
                        return (
                            <div key={m.id}>
                                <b>{m.user.name}:</b> {m.message}
                                <hr/>
                            </div>
                        )
                    })}
                    <div ref={messageAnchorRef}></div>
                </div>
                <div>
                    <input value={name} onChange={(e) => {
                        setName(e.currentTarget.value)
                    }}/>
                    <button onClick={() => {
                        socket.emit('client-name-sent', name)
                        setName('')
                    }}>send Name
                    </button>
                </div>
                <div>
                    <textarea value={message} onChange={(e) => {
                        setMessage(e.currentTarget.value)
                    }}></textarea>
                    <button onClick={() => {
                        socket.emit('client-message-sent', message)
                        setMessage('')
                    }}>send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
