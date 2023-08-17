import { createContext, useState, useContext } from "react";

export const MyContext = createContext({});

const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({ userId: 'ihtisham', role: 'user' });

    return (
        <MyContext.Provider value={{ auth, setAuth }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => {
    const context = useContext(MyContext);
    return context;
};

export default ContextProvider;