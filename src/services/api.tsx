import axios from "axios";

const api = axios.create({
    baseURL: 'http://connectabil-nestjs-heroku.herokuapp.com/'
});

export default api;