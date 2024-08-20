const { TodoItem, TodoList } = require("../models");

module.exports = {
  create: async (req, res) => {
    const { activity_id, item_name, priority } = req.body

    if (!activity_id) return res.status(400).send({ error: "Activity ID is required" })
    if (!item_name) return res.status(400).send({ error: "Item Name is required" })
    if (!priority) return res.status(400).send({ error: "Priority is required" })

    try {
      const check = await TodoList.findAll({ where: { id: activity_id } })
      if (check.length) {
        const data = await TodoItem.create({ activity_id, item_name, priority })
        return res.status(201).send(data)
      }
      return res.status(404).send({ error: "Activity ID is not exist" })
    } catch (error) {
      console.error('create error', error);
      return res.status(400).send(error)
    }
  },
}