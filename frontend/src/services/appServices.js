import axios from "../axios";
let addTodoData = (data)=>{
    return axios.post('/todo',{data});
}
let checkTodo = (data)=>{
    return axios.put(`/todo/${data._id}`,{data})
}
let getData = ()=>{
    return axios.get('/todo');
}
let deleteData = (data)=>{
    return axios.delete(`/todo/${data._id}`);
}
export {
    addTodoData,
    checkTodo,
    getData,
    deleteData
}