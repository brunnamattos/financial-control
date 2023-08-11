export default function Card(props) {
  return (
    <div className={`card ${props.color}`}>
      {props.childrens}
      <span className="card-title">{props.title}</span>
      <span className="card-value">
        R$ {props.totalValue ? props.totalValue : "0,00"}
      </span>
    </div>
  );
}
