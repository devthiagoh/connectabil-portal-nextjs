import axios from "axios";

const api = axios.create({
    baseURL: 'https://connectabil-nestjs-heroku.herokuapp.com/'
});

export default api;