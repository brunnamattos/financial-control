export default function getTotalTransactions(props) {
  const entradas = props.entradas;
  const saidas = props.saidas;
  let totalEntradas;
  let totalSaidas;

  if (entradas) {
    totalEntradas = entradas.reduce(getTotalEntradas, 0);
    function getTotalEntradas(totalEntradas, item) {
      return totalEntradas + item.value;
    }
  } else {
    totalEntradas = 0;
  }

  if (saidas) {
    totalSaidas = saidas.reduce(getTotalSaidas, 0);
    function getTotalSaidas(totalSaidas, item) {
      return totalSaidas + item.value;
    }
  } else {
    totalSaidas = 0;
  }

  return {
    totalEntradas,
    totalSaidas,
    totalTransactions: totalEntradas - totalSaidas,
  };
}
