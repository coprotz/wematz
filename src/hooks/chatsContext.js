import { createContext, useReducer, useState } from "react";
import { useAuth } from "./useAuth";
import useData from "./useData";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {

    const { users } = useData()
    const { user } = useAuth()
    const cuUser = users?.find(u => u.id === user?.uid)
    const [active, setActive] = useState(null) 

    // console.log('user', user?.uid)
    // console.log('cuUser', cuUser?.id)

    const INITIAL_STATE = {
        chatId: 'null',
        isUser: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type){
            case "CHANGE_USER":
                return {
                    isUser: action.payload,
                    chatId: cuUser?.id > action.payload?.uid ? cuUser?.id + action.payload?.uid : action.payload?.uid + cuUser?.id,
                };

            default:
                return state
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

return (
    <ChatContext.Provider value={{ data:state, dispatch, active, setActive }}>
        {children}
    </ChatContext.Provider>
)

}

// export { ChatContext, ChatContextProvider }