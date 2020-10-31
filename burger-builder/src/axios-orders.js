import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-77b5d.firebaseio.com/",
});

export default instance;
