import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quatily-management-poc.herokuapp.com/',
});

const headers = {
    Authorization: `Bearer ${localStorage.getItem('@QualityManagement:token')}`
}

export { api, headers }