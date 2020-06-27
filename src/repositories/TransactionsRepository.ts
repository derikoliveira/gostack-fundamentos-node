import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getTotalValue(type: 'income' | 'outcome'): number {
    const value = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === type) {
        return accumulator + transaction.value;
      }
      return accumulator;
    }, 0);
    return value;
  }

  public getBalance(): Balance {
    const income = this.getTotalValue('income');
    const outcome = this.getTotalValue('outcome');
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
