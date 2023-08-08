import axios from "axios";

const getUsers = async () => {
  const { data } = await axios.get('http://localhost:8080/api/users')
  return data;
}

export default {
  getUsers
}