import Task from "../database/model/task.js";
const updateCheckbox = async (req, res) => {
  console.log(req.params.collectionId);
  console.log(req.body);
  const objectId = req.params.collectionId;
  const { newStatusVal } = req.body;
  try {
    const findAndUpdateField = await Task.findByIdAndUpdate(objectId, {
      status: newStatusVal,
    });
    console.log(findAndUpdateField);
    res.status(200).json({});
  } catch (error) {
    console.log("error while updating checkbox", error);
  }
};

export default updateCheckbox;
