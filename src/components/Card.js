export default function Card(props) {
  console.log(props);
  return (
    <div className="card">
      <svg-icon
        className={`icon-arrow-right-${props.color}`}
        src="../assets/icons/arrow-right.svg"
      ></svg-icon>
      <span className="card-title">{props.title}</span>
      <span className="card-value">{props.value}</span>
    </div>
  );
}
