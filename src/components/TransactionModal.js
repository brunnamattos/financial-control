import React, { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import FinanceProvider from "../context/FinanceContext";

const TransactionModal = ({ transaction, onClose }) => {
  const [paid, setPaid] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState(null);

  const { dispatch } = useFinance();

  useEffect(() => {
    if (transaction) {
      setPaid(transaction.paid);
      setType(transaction.type);
      setCategory(transaction.category);
      setValue(transaction.value.toString());
    }
  }, [transaction]);

  const handleUpdateTransaction = () => {
    if (!paid || !category || !value) {
      setFormError("Todos os campos são obrigatórios");
      return;
    }

    const updatedTransaction = {
      ...transaction,
      paid,
      type,
      category,
      value: parseFloat(value),
    };

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: { id: transaction.id, updatedTransaction },
    });
    onClose();
  };

  return (
    <FinanceProvider>
      <div className="transaction-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Editar transação</h2>
            <button className="close-button" onClick={onClose}>
              Fechar
            </button>
          </div>
          <div className="modal-body">
            {formError && <p className="error-message">{formError}</p>}
            <div className="input-group">
              <label>
                Transação paga:
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={() => setPaid(!paid)}
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Tipo:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
              </label>
            </div>
            <div className="input-group">
              <label>
                Categoria:
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Valor:
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="update-button"
              onClick={() => handleUpdateTransaction(transaction)}
            >
              Atualizar transação
            </button>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default TransactionModal;
