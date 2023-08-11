import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import EditTransactionModal from "./EditTransactionModal";
import TransactionModal from "./TransactionModal";
import FinanceProvider, { useFinance } from "../context/FinanceContext";

const TransactionSection = () => {
  const { state } = useFinance();
  const transactions = state.transactions;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const openTransactionModal = () => {
    setTransactionModalOpen(true);
  };

  return (
    <FinanceProvider>
      <section className="transactions">
        <button
          className="new-transaction-button"
          onClick={openTransactionModal}
        >
          Nova Transação
        </button>
        <TransactionTable
          transactions={transactions}
          openEditModal={openEditModal}
        />
        {editModalOpen && (
          <EditTransactionModal
            transaction={selectedTransaction}
            onClose={() => setEditModalOpen(false)}
          />
        )}
        {transactionModalOpen && (
          <TransactionModal onClose={() => setTransactionModalOpen(false)} />
        )}
      </section>
    </FinanceProvider>
  );
};

export default TransactionSection;
