import MongoDB from '../config/mongo.config';
import TodoModel from '../models/todoModel';
let addTodo = async (data) => {
    let resData = {};
    if (data) {
        let Todo = new TodoModel(MongoDB.client);
            let resModel = await Todo.create(data);
            if (resModel) {
                resData.errCode = 0;
                resData.value = resModel;
            }
    }
    return resData
}
let updateTodo = async (data) => {
    let resData = {};
    if (data) {
        let Todo = new TodoModel(MongoDB.client);
            let resModel = await Todo.updated(data);
            if (resModel) {
                resData.errCode = 0;
                resData.value = "Đăng ký thành công";
            }
    }
    return resData
}
let getData= async()=>{
    let resData = {};
    let Todo = new TodoModel(MongoDB.client);
    resData.value = await Todo.find();
    return resData

}
let deleteData=async(data)=>{
    let resData = {};
    let Todo = new TodoModel(MongoDB.client);
    resData.value = await Todo.delete(data);
    return resData
}
module.exports = {
    addTodo,
    getData,
    updateTodo,
    deleteData
}