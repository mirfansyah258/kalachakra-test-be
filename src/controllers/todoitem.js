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
  getAllById: async (req, res) => {
    const { id } = req.params
    
    try {
      const detail = await TodoList.findByPk(id)
      if (detail.get()) {
        const data = await TodoItem.findAll({
          where: {
            activity_id: id
          },
          order: [
            ['created_at', 'DESC']
          ]
        })

        return res.send({ ...detail.get(), data })
      }
      return res.status(404).send({ error: `Todo Item with id ${id} is not found` })
    } catch (error) {
      console.error('getById error', error);
      return res.status(400).send({ error })
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const { activity_id, item_name, priority } = req.body

    if (!activity_id) return res.status(400).send({ error: "Activity ID is required" })
    if (!item_name) return res.status(400).send({ error: "Item Name is required" })
    if (!priority) return res.status(400).send({ error: "Priority is required" })

    try {
      const check = await TodoList.findAll({ where: { id: activity_id } })
      if (check.length) {
        const data = await TodoItem.update({ activity_id, item_name, priority }, { where: { id }, returning: true })
        return res.send(data[1][0])
      }
      return res.status(404).send({ error: "Activity ID is not exist" })
    } catch (error) {
      console.error('update error', error);
      return res.status(400).send(error)
    }
  },
}