export default function Card(props) {
  return (
    <div className={`card ${props.color}`}>
      <span className="card-title">{props.title}</span>
      <span className="card-value">R$ {props.transaction ? props.transaction : "0,00"}</span>
    </div>
  );
}
