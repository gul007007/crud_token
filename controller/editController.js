import Task from "../database/model/task.js";
const editTaskController = async (req, res) => {
  const document_id = req.params.currentId;
  const { newTaskVal } = req.body;
  console.log(document_id,newTaskVal);
  if(!document_id || !newTaskVal) {
    res.status(404).json({message: 'id or new task value is not reaching to backend'});
    return;
  }

  const updateEditedTask = await Task.findByIdAndUpdate(document_id,{taskTitle: newTaskVal});
  res.status(200).json();
};
export default editTaskController;
