import axios from "axios";

const baseUrl = "/api/persons";

function getAll() {
  const request = axios.get(baseUrl).then((response) => response.data);

  return request;
}

function create(newData) {
  const request = axios
    .post(baseUrl, newData)
    .then((response) => response.data);

  return request;
}

function update(id, newData) {
  const request = axios
    .put(`${baseUrl}/${id}`, newData)
    .then((res) => res.data);

  return request;
}

function remove(id) {
  axios.delete(`${baseUrl}/${id}`);
}

export default {
  getAll,
  create,
  update,
  remove,
};
