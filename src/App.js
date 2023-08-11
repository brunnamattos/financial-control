import { useState, useEffect } from "react";
import "./style.css";
import Menu from "./components/Menu";
import Section from "./components/Section";
import Card from "./components/Card";
import moment from "moment";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);

    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      date: moment().format('YYYY-MM-DD'),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const editTransaction = (idx, updatedTransaction) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[idx] = updatedTransaction;
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (idx) => {
    const updatedTransactions = transactions.filter((_, i) => i !== idx);
    setTransactions(updatedTransactions);
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
    };
    setCategories([...categories, newCategory]);
  };

  const editCategory = (index, updatedCategory) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategory;
    setCategories(updatedCategories);
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
  };



  return (
    <div>
      Hello, World!
      <Menu />
      <main>
        <Section title="Dashboard">
          <Card title="Saldo atual" color="blue" value="R$350.000,00" />
          <Card title="Receitas" color="green" value="R$5.000,00" />
          <Card title="Despesas" color="red" value="R$4.000,00" />
        </Section>
        <Section title="Transações recentes"></Section>
      </main>
    </div>
  );
}
