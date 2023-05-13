import axios from "axios";
// API: https://viacep.com.br/ws/NumeroCepAqui/json

/*
Retornos da API:
"cep": "",
"logradouro": "",
"complemento": "",
"bairro": "",
"localidade": "",
"uf": "",
"ibge": "",
"gia": "",
"ddd": "",
"siafi": ""
}
*/

const api = axios.create({
   baseURL: 'https://viacep.com.br/ws',
})

export default api;
