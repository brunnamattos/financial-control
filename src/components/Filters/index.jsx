import "./style.css";
import { ArrowRightLeft, Blocks } from "lucide-react";

export default function Filters(props) {
  const {
    types = [],
    categories = [],
    filterType = "",
    setFilterType = "",
    filterCategory = "",
    setFilterCategory = "",
  } = props;

  return (
    <div className="filters">
      <div className="filter category">
        <div className="filter-title">
          <Blocks className="icon-filter" />
          <span>Categorias</span>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter transaction">
        <div className="filter-title">
          <ArrowRightLeft className="icon-filter" />
          <span>Tipo de transação</span>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Todas as transações</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
