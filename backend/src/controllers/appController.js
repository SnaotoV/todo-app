import ApiError from "../api-error";
import appService from '../services/appService';

let add = async (req, res) => {
    try {
        let data = req.body.data;
        let resService = await appService.addTodo(data);
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let update = async (req, res) => {
    try {
        let data = req.body.data;
        let resService = await appService.updateTodo(data);
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let getAll=async(req,res)=>{
    try {
        let resService = await appService.getData();
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let deleteTodo=async(req,res)=>{
    try {
        let id = req.params.id;
        let resService = await appService.deleteData(id);
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
module.exports = {
   add,
   getAll,
   update,
   deleteTodo
}