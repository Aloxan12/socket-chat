import {api} from "../api/api";

export type UserType ={
    id: string,
    name: string
}
export type MessagesType = {
    message: string,
    id: string,
    user: UserType
}

const initialState = {
    messages: [] as MessagesType[],
    typingUsers: [] as UserType[],
}
type ActionType = ReturnType<typeof messagesReceived> | ReturnType<typeof newMessageReceived> | ReturnType<typeof typingUserAdded>

export const chatReducer = (state = initialState, action: ActionType)=>{
    switch (action.type){
        case 'messages-received':{
          return {...state, messages: action.messages}
        }
        case 'new-message-received':{
            return {...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter((u: UserType) => u.id !== action.message.user.id)
            }
        }
        case 'typing-user-added':{
            return {...state,
                typingUsers: [...state.typingUsers.filter((u: UserType)=> u.id !== action.user.id), action.user]}
        }
        default:
            return state
    }
}

export const messagesReceived = (messages: MessagesType[])=>({type:'messages-received', messages}as const)
export const newMessageReceived = (message: any)=>({type:'new-message-received', message}as const)
export const typingUserAdded = (user: UserType)=>({type:'typing-user-added', user}as const)


export const createConnection = () => (dispatch: any)=>{
    api.createConnection()
    api.subscribe((messages: MessagesType[])=>{
        dispatch(messagesReceived(messages))
        },
        (message: any)=>{
        dispatch(newMessageReceived(message))
        },
        (user: UserType)=>{
        dispatch(typingUserAdded(user))
        })
}
export const setClientName =(name: string)=>(dispatch: any)=>{
    api.sendName(name)
}
export const sendMessage =(message: string)=>(dispatch: any)=>{
    api.sendMessage(message)
}
export const typeMessage =()=>(dispatch: any)=>{
    api.typeMessage()
}
export const destroyConnection =()=> (dispatch: any)=>{
    api.destroyConnection()
}
