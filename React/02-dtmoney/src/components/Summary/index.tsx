import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'
import totalImage from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();


  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.depositis += transaction.amount;
      acc.total += transaction.amount;
      console.log(transaction.amount, transaction.type)
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    depositis: 0,
    withdraws: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="Simbolo de entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.depositis)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImage} alt="Simbolo de saidas" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div>
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Simbolo de total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}