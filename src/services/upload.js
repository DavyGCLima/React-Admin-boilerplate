import axios from 'axios';

const uploadApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

//TODO token config here, see: https://blog.rocketseat.com.br/reactjs-autenticacao/

export default uploadApi;
