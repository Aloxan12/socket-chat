import React, {useEffect, useRef, useState} from 'react';
import style from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {
    createConnection,
    destroyConnection,
    MessagesType,
    sendMessage,
    setClientName,
    typeMessage, UserType
} from "../../store/chatReducer";



function App() {
    const dispatch = useDispatch()
    const messages = useSelector<AppStateType, Array<MessagesType>>(state => state.chat.messages)
    const typingUsers = useSelector<AppStateType, Array<UserType>>(state => state.chat.typingUsers)

    //const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('Alex')
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    useEffect(() => {
        dispatch(createConnection());

        return ()=>{
            dispatch(destroyConnection());
        }
    }, [])

    useEffect(() => {
        if (isAutoScrollActive) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const messageAnchorRef = useRef<HTMLDivElement>(null)

    return (
        <div className={style.App}>
            <div className={style.chatBlock}>
                <div
                    className={style.chatWrap}
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
                    {messages.map((m: MessagesType) => {
                        return (
                            <div key={m.id}>
                                <b>{m.user.name}:</b> {m.message}
                                <hr/>
                            </div>
                        )
                    })}
                    {typingUsers.map((u: UserType) => {
                        return (
                            <div key={u.id}>
                                <b>{u.name}:</b> ...
                                <hr/>
                            </div>
                        )
                    })}
                    <div ref={messageAnchorRef}></div>
                </div>
                <div className={style.sendName}>
                    <input value={name} onChange={(e) => {
                        setName(e.currentTarget.value)
                    }}/>
                    <button onClick={() => {
                        dispatch(setClientName(name))
                        setName('')
                    }}>Send Name
                    </button>
                </div>
                <div className={style.sendMessage}>
                    <textarea
                        value={message}
                        onKeyPress={()=>{
                            dispatch(typeMessage())
                        }}
                        onChange={(e) => {
                        setMessage(e.currentTarget.value)
                    }}
                    ></textarea>
                    <button onClick={() => {
                        dispatch(sendMessage(message))
                        setMessage('')
                    }}>Send message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
