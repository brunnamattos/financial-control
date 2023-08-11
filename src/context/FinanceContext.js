import React, { createContext, useContext, useReducer, useEffect } from 'react';
import FinanceReducer from './FinanceReducer';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

const FinanceProvider = ({ children }) => {
  const initialState = {
    transactions: [],
  };

  const [state, dispatch] = useReducer(FinanceReducer, initialState);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      dispatch({ type: 'INITIALIZE_TRANSACTIONS', payload: storedTransactions });
    }
  }, []);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceProvider;