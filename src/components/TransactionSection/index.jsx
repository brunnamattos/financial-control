import "./style.css";
import React, { useState, useEffect } from "react";
import TransactionTable from "../TransactionTable";
import TransactionModal from "../TransactionModal";
import { useFinance } from "../../context/FinanceContext";
import uuid from "react-uuid";
import { ListPlus } from "lucide-react";

const TransactionSection = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useFinance();

  useEffect(() => {
    const currentBodyOverflowStyle = document.body.style.overflow;

    currentBodyOverflowStyle === "auto"
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isTransactionModalOpen]);

  const handleCreateTransaction = (transaction) => {
    const { paid, category, value, type } = transaction;

    if (!category || !value) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    const newId = uuid();

    const transactionObj = {
      id: newId,
      date: new Date(),
      paid,
      type,
      category,
      value: parseFloat(value),
    };

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transactionObj,
    });

    setIsTransactionModalOpen(false);
  };

  return (
    <section className="transactions">
      <span className="section-title">Transações</span>

      <div className="table-actions">
        <button
          className="new-transaction-button"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <span>Nova Transação</span>
          <ListPlus className="icon" />
        </button>
      </div>
      <TransactionTable />

      {isTransactionModalOpen && (
        <TransactionModal
          error={error}
          onSave={(transaction) => handleCreateTransaction(transaction)}
          onClose={() => setIsTransactionModalOpen(false)}
        />
      )}
    </section>
  );
};

export default TransactionSection;
