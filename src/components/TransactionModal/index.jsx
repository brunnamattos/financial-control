import React, { useState } from "react";
import { Plus, X } from "lucide-react";

import "./style.css";

const TransactionModal = (props) => {
  const {
    transaction = {
      paid: false,
      type: "Receita",
      category: "",
      value: "",
    },
    onClose = () => undefined,
    onSave = () => undefined,
    error = "",
  } = props;

  const [transactionState, setTransactionState] = useState(transaction);

  return (
    <div>
      <div className="modal-background"></div>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <X className="close-icon" onClick={() => onClose()} />

            <div className="plus-icon-wrapper">
              <Plus />
            </div>

            <h2>
              {transactionState.id ? "Editar transação" : "Nova transação"}
            </h2>
          </div>

          <div className="modal-body">
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <label>
                Tipo:
                <select
                  value={transactionState.type}
                  onChange={(e) =>
                    setTransactionState((prevState) => ({
                      ...prevState,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </select>
              </label>
            </div>

            <div className="input-group">
              <input
                className="text-input"
                type="text"
                placeholder="Categoria"
                value={transactionState.category}
                onChange={(e) =>
                  setTransactionState((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
              />
              <label className="label-input">Categoria</label>
            </div>

            <div className="input-group">
              <input
                className="text-input"
                type="number"
                placeholder="Valor"
                value={transactionState.value}
                onChange={(e) =>
                  setTransactionState((prevState) => ({
                    ...prevState,
                    value: e.target.value,
                  }))
                }
              />
              <label className="label-input">Valor</label>
            </div>
            <div className="input-group checkbox">
              <input
                type="checkbox"
                className="switch"
                checked={transactionState.paid}
                onChange={() =>
                  setTransactionState((prevState) => ({
                    ...prevState,
                    paid: !transactionState.paid,
                  }))
                }
              />
              <label className="label-input">Transação paga ou feita</label>
            </div>
          </div>

          <footer className="modal-footer">
            <button
              className="update-button"
              onClick={() => onSave(transactionState)}
            >
              {transactionState.id ? "Atualizar transação" : "Criar transação"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
