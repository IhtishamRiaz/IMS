import { createContext, useState, useContext } from "react";

export const MyContext = createContext({});

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountsRow, setSelectedAccountsRow] = useState()

  return (
    <MyContext.Provider value={
      {
        auth,
        setAuth,
        accounts,
        setAccounts,
        selectedAccountsRow,
        setSelectedAccountsRow
      }
    }>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;