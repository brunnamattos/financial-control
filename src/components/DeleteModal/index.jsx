import { Trash2, X } from "lucide-react";

import "./style.css";

const TransactionModal = (props) => {
  const { onClose = () => undefined, onDelete = () => undefined } = props;

  return (
    <div>
      <div className="modal-background"></div>
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <X className="close-icon" onClick={() => onClose()} />

            <div className="delete-icon-wrapper">
              <Trash2 />
            </div>

            <h2>Deletar Transação</h2>
          </div>

          <div className="modal-body">
            <span>Tem certeza que deseja excluir a transação?</span>
          </div>

          <footer className="modal-footer">
            <button className="update-button" onClick={() => onDelete()}>
              Deletar transação
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
