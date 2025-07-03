import Task from "../database/model/task.js";
const fetchTask = async (req, res) => {
  try {
    const task = await Task.find();
    if (!task) {
      res.status(404).json({ message: "no task found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("error while fetching task", error);
  }
};
export default fetchTask;
