import { useState, useEffect } from "react";
import Card from "../Card";
import { useFinance } from "../../context/FinanceContext";

export default function Filters() {
  const { state } = useFinance();

  const [currentBalance, setCurrentBalance] = useState(0);
  const [incomeValue, setIncomeValue] = useState(0);
  const [outcomeValue, setOutcomeValue] = useState(0);

  const getIncomeOrOutcome = (type) => {
    const typeArr = state.transactions.filter(
      (transaction) => transaction.type === type
    );

    const reducedType = typeArr.reduce(
      (acc, current) => acc + current.value,
      0
    );

    type === "Receita"
      ? setIncomeValue(reducedType)
      : setOutcomeValue(reducedType);
  };

  useEffect(() => {
    getIncomeOrOutcome("Receita");
    getIncomeOrOutcome("Despesa");
  }, [state]);

  useEffect(
    () => setCurrentBalance(incomeValue - outcomeValue),
    [incomeValue, outcomeValue]
  );

  return (
    <section className="dashboard">
      <span className="section-title">Dashboard</span>

      <div className="cards">
        <Card title="Saldo atual" color="blue" value={currentBalance} />
        <Card title="Receitas" color="green" value={incomeValue} />
        <Card title="Despesas" color="red" value={outcomeValue} />
      </div>
    </section>
  );
}
