import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = personObject => {
  return axios.post(baseUrl, personObject);
};

const remove =(id) => {
return axios.delete(`${baseUrl}/${id}`)
}
const update =(id, personObject) =>{
  return axios.put(`${baseUrl}/${id}`, personObject)
}

export default {
  getAll,
  create,
  remove,
  update
};
