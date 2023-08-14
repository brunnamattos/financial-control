const FinanceReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const updatedTransactions = [...state.transactions, action.payload];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

      // console.log({transactions: [...state.transactions, action.payload]});

      return {...state, transactions: [...state.transactions, action.payload]};

    case "DELETE_TRANSACTION":
      const filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      localStorage.setItem(
        "transactions",
        JSON.stringify(filteredTransactions)
      );
      return { ...state, transactions: filteredTransactions };

    case "EDIT_TRANSACTION":
      const editedTransactions = state.transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, ...action.payload };
        }
        return transaction;
      });
      localStorage.setItem("transactions", JSON.stringify(editedTransactions));
      return { ...state, transactions: editedTransactions };

    case "PAY_TRANSACTION":
      const updatedTransactionsPay = state.transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, paid: true };
        }
        return transaction;
      });
      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactionsPay)
      );
      return { ...state, transactions: updatedTransactionsPay };

    case "INITIALIZE_TRANSACTIONS":
      return { ...state, transactions: action.payload };

    default:
      return state;
  }
};

export default FinanceReducer;
