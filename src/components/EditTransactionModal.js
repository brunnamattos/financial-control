import React, { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import FinanceProvider from "../context/FinanceContext";

const EditTransactionModal = ({ transaction, onClose }) => {
  const { dispatch } = useFinance();

  const [editedTransaction, setEditedTransaction] = useState({
    paid: transaction.paid,
    type: transaction.type,
    category: transaction.category,
    value: transaction.value,
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setEditedTransaction({
      paid: transaction.paid,
      type: transaction.type,
      category: transaction.category,
      value: transaction.value,
    });
  }, [transaction]);

  const handleEditTransaction = () => {
    if (!editedTransaction.category || !editedTransaction.value) {
      setErrorMsg("Todos os campos são obrigatórios");
      return;
    }

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: {
        id: transaction.id,
        updatedTransaction: editedTransaction,
      },
    });

    onClose();
  };

  const handleCategoryChange = (event) => {
    setEditedTransaction({
      ...editedTransaction,
      category: event.target.value,
    });
    setErrorMsg("");
  };

  return (
    <FinanceProvider>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Editar Transação</h2>
            <button onClick={onClose}>Fechar</button>
          </div>
          <div className="modal-body">
            <label>
              Pago:
              <input
                type="checkbox"
                checked={editedTransaction.paid}
                onChange={() =>
                  setEditedTransaction({
                    ...editedTransaction,
                    paid: !editedTransaction.paid,
                  })
                }
              />
            </label>
            <label>
              Tipo:
              <select
                value={editedTransaction.type}
                onChange={(e) =>
                  setEditedTransaction({
                    ...editedTransaction,
                    type: e.target.value,
                  })
                }
              >
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </label>
            <label>
              Categoria:
              <input
                type="text"
                value={editedTransaction.category}
                onChange={handleCategoryChange}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                value={editedTransaction.value}
                onChange={(e) =>
                  setEditedTransaction({
                    ...editedTransaction,
                    value: e.target.value,
                  })
                }
              />
            </label>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
          <div className="modal-footer">
            <button onClick={handleEditTransaction}>Salvar</button>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default EditTransactionModal;
