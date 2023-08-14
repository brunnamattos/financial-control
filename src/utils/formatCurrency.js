export const formatCurrency = (value) => {
  try {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } catch (e) {
    return "-";
  }
};
