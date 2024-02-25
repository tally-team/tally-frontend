import axios from "axios";

type Item = {
  name: string,
  cost: number,
  people: string[]
};

type Transaction = {
  items: Item[],
  tax: number,
  tip: number,
  party: string[]
};

export const getUsers = async () => {
  const { data } = await axios.get('http://localhost:8080/api/users')
  return data;
}

export const submitTransaction = async (transaction: Transaction) => {
  const { data } = await axios.post('http://localhost:8080/api/transactionBreakdown', transaction)
  return data;
}