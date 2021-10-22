import {io, Socket} from "socket.io-client";
import {MessagesType, UserType} from "../store/chatReducer";


//const socket = io('http://localhost:3900/')

export const api = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io('https://fast-brushlands-44568.herokuapp.com/')
        //this.socket = io('http://localhost:3500/')
    },
    subscribe(initMessagesHandler: (messages: MessagesType[]) => void,
              newInitMessageHandler: (message: string) => void,
              userTypingHandler: (user: UserType) => void){

        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent', newInitMessageHandler)
        this.socket?.on('user-typing', userTypingHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name: string){
        this.socket?.emit('client-name-sent', name)
    },
    sendMessage(message: string){
        this.socket?.emit('client-message-sent', message, (error: string | null)=>{
            if(error) alert(error)
        })
    },
    typeMessage(){
        this.socket?.emit('client-typed')
    }
}
