import "./style.css";
import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { CheckCircle2, FileEdit, Trash2, AlertCircle } from "lucide-react";
import TransactionModal from "../TransactionModal";
import FinanceProvider from "../../context/FinanceContext";
import { parseISO, format } from "date-fns";
import { transformToCurrency } from "../../utils/TransformToCurrency";

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

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setEditModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  const transformDate = (date) => format(parseISO(date), "dd/MM/yyyy");

  return (
    <FinanceProvider>
      <div>
        {editModalOpen && (
          <TransactionModal
            transaction={selectedTransaction}
            onClose={handleCloseModal}
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
                <td>{transaction.paid ? <CheckCircle2 className="btn-icon btn-icon-green"/> : <AlertCircle  className="btn-icon btn-icon-red"/>}</td>
                <td>{transformDate(transaction.date)}</td>
                <td>{transaction.category}</td>
                <td>{transformToCurrency(transaction.value)}</td>
                <td>
                  {!transaction.paid && (
                    <CheckCircle2
                      className="btn-icon green"
                      onClick={() => handlePayTransaction(transaction)}
                    />
                  )}
                  <FileEdit
                    className="btn-icon blue"
                    onClick={() => handleOpenModal(transaction)}
                  />
                  <Trash2
                    className="btn-icon red"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  />
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
