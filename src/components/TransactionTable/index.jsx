import "./style.css";
import React, { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import { CheckCircle2, FileEdit, Trash2, AlertCircle } from "lucide-react";
import TransactionModal from "../TransactionModal";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import DeleteModal from "../DeleteModal";
import Filters from "../Filters";

const TransactionTable = () => {
  const { state, dispatch } = useFinance();
  const transactions = state.transactions;
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentBodyOverflowStyle = document.body.style.overflow;

    currentBodyOverflowStyle === "hidden"
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  }, [selectedTransaction, selectedIdToDelete]);

  const handlePayTransaction = (transaction) => {
    const updatedTransaction = { ...transaction, paid: true };

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: updatedTransaction,
    });
  };

  const handleDeleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    setSelectedIdToDelete(null);
  };

  const handleEditTransaction = (transaction) => {
    const { paid, category, value, type } = transaction;

    if (!category || !value) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    const transactionObj = {
      ...transaction,
      paid,
      type,
      category,
      value: parseFloat(value),
    };

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: transactionObj,
    });

    setSelectedTransaction(null);
  };

  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const types = [...new Set(transactions.map((obj) => obj.type))];
  const categories = [...new Set(transactions.map((obj) => obj.category))];

  const filterTypeAndCategory = (transaction) => {
    const filterTypePassed = !filterType || transaction.type === filterType;
    const filterCategoryPassed =
      !filterCategory || transaction.category === filterCategory;
    return filterTypePassed && filterCategoryPassed;
  };

  const filteredTransactions = transactions.filter(filterTypeAndCategory);

  const calculateSumFilteredValues = (type) => {
    return filteredTransactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + transaction.value, 0);
  };

  const sumIncomeValue = calculateSumFilteredValues("Receita");
  const sumOutcomeValue = calculateSumFilteredValues("Despesa");
  const currentBalance = sumIncomeValue - sumOutcomeValue;

  return (
    <>
      {transactions
        .filter(filterTypeAndCategory)
        .map((transaction) => console.log(transaction))}
      <div className="transaction-table">
        <div className="total-values-table">
          <div className="total-value-table">
            <span className="title">Total de entradas:</span>
            <span className="value-green">
              {formatCurrency(sumIncomeValue)}
            </span>
          </div>
          <div className="total-value-table">
            <span className="title">Total de saídas:</span>
            <span className="value-red">{formatCurrency(sumOutcomeValue)}</span>
          </div>
          <div className="total-value-table">
            <span className="title">Balanço total:</span>
            <span className="value-blue">{formatCurrency(currentBalance)}</span>
          </div>
        </div>
        <Filters
          types={types}
          categories={categories}
          filterType={filterType}
          setFilterType={setFilterType}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
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
            {transactions.filter(filterTypeAndCategory).map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  {transaction.paid ? (
                    <CheckCircle2 className="btn-icon btn-icon-green paid-icon" />
                  ) : (
                    <AlertCircle className="btn-icon btn-icon-red paid-icon" />
                  )}
                </td>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.category}</td>
                <td
                  className={`${
                    transaction.type === "Receita" ? "value-green" : "value-red"
                  }`}
                >
                  {transaction.type === "Receita" ? "" : "-"}
                  {formatCurrency(transaction.value)}
                </td>

                <td>
                  {!transaction.paid && (
                    <CheckCircle2
                      className="btn-icon green"
                      onClick={() => handlePayTransaction(transaction)}
                    />
                  )}

                  <FileEdit
                    onClick={() => setSelectedTransaction(transaction)}
                    className="btn-icon blue"
                  />

                  <Trash2
                    onClick={() => setSelectedIdToDelete(transaction.id)}
                    className="btn-icon red"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <TransactionModal
          error={error}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
          onSave={(transaction) => handleEditTransaction(transaction)}
        />
      )}

      {selectedIdToDelete && (
        <DeleteModal
          onDelete={() => handleDeleteTransaction(selectedIdToDelete)}
          onClose={() => setSelectedIdToDelete(null)}
        />
      )}
    </>
  );
};

export default TransactionTable;
