import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionModal from "./TransactionModal";
import FinanceProvider from "../context/FinanceContext";

const TransactionTable = () => {
  const { state, dispatch } = useFinance();
  const transactions = state.transactions;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handlePayTransaction = (transaction) => {
    const updatedTransaction = { ...transaction, paid: true };
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: { id: transaction.id, updatedTransaction },
    });
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTransaction(null);
    setEditModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
  };

  return (
    <FinanceProvider>
      <div>
        {editModalOpen && (
          <TransactionModal
            transaction={selectedTransaction}
            onClose={closeEditModal}
          />
        )}
        <table>
          <thead>
            <tr>
              <th>Situação</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  {transaction.paid ? (
                    <img
                      src={require("../assets/icons/check.svg")}
                      alt="Pago"
                    />
                  ) : (
                    <img
                      src={require("../assets/icons/warning.svg")}
                      alt="Não Pago"
                    />
                  )}
                </td>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.category}</td>
                <td>
                  {transaction.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {!transaction.paid && (
                    <button onClick={() => handlePayTransaction(transaction)}>
                      <img
                        src={require("../assets/icons/check.svg")}
                        alt="Pagar"
                      />
                    </button>
                  )}
                  <button onClick={() => openEditModal(transaction)}>
                    <img
                      src={require("../assets/icons/edit.svg")}
                      alt="Editar"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <img
                      src={require("../assets/icons/delete.svg")}
                      alt="Excluir"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FinanceProvider>
  );
};

export default TransactionTable;
