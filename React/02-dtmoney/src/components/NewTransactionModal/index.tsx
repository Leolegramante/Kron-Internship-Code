import { FormEvent, useState} from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/close.svg'
import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'

import { Container, TransactionsStyleContainer, RadioBox } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="reac-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionsStyleContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit'); }}
            activeColor='green'
            isActive={type === 'deposit'}
          >
            <img src={incomeImage} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor='red'
            onClick={() => { setType('withdraw'); }}
          >
            <img src={outcomeImage} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionsStyleContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>

    </Modal>
  )
}


