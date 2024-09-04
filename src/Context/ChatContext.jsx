import propTypes from 'prop-types';
import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
     const [room, setRoom] = useState('');
     const [oppositeUser, setOppositeUser] = useState({});
     const [newMessage, setNewMessage] = useState();

     return (
          <ChatContext.Provider value={{ room, setRoom, oppositeUser, setOppositeUser, newMessage, setNewMessage }}>
               {children}
          </ChatContext.Provider>
     );
}

ChatProvider.propTypes = {
     children: propTypes.any
}