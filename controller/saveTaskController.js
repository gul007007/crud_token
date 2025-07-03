import Task from "../database/model/task.js";
const saveTask = async (req, res) => {
  // console.log('req.body',req.body);
  // console.log('req.user',req.user);
  const { taskTitle } = req.body;
  const { _id } = req.user;

  if (!taskTitle || !_id) {
    res.status(404).json({ message: "send task again, try logging again" });
    return;
  }

  try {
    const newTask = new Task({ taskOwner: _id, taskTitle });
    const saving_task = await newTask.save();
    console.log("task saving ", saving_task);

    res.status(201).json({message: 'Task created!'})

  } catch (error) {
    console.log("error while saving task", error);
  }
};
export default saveTask;
