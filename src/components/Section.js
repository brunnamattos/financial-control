export default function Section(props) {
  return (
    <div className="section">
      <span className="section-title">{props.title}</span>
      {props.childrens}
    </div>
  );
}
