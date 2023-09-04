import { createContext, useState, useContext } from "react";

export const MyContext = createContext({});

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [accounts, setAccounts] = useState([]);

  return (
    <MyContext.Provider value={{ auth, setAuth, accounts, setAccounts }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;