import "./style.css";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Card(props) {
  const { color = "", title = "", value = 0 } = props;

  return (
    <div className={`card ${color}`}>
      <span className="card-title">{title}</span>
      <span className="card-value">{formatCurrency(value)}</span>
    </div>
  );
}
