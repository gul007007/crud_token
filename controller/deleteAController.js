import  Task from "../database/model/task.js"
const deleteController = async(req,res)=>{
    console.log('req', req.params.id);
    
    const deleteResponse = await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({res: "Task delete!"})
};
export default deleteController;