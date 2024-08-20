const { TodoList } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const list = await TodoList.findAll({
        order: [
          ['created_at', 'DESC']
        ]
      })

      return res.send(list);
    } catch (error) {
      console.error('getAll error', error);
      return res.status(400).send(error)
    }
  },
  getById: async (req, res) => {
    const { id } = req.params
    console.log('id', id);
    
    try {
      const data = await TodoList.findByPk(id)
      if (data) {
        return res.send(data)
      } else {
        return res.status(404).send({ error: `TodoList with id ${id} is not found` })
      }
    } catch (error) {
      console.error('getById error', error);
      return res.status(400).send({ error })
    }
  },
  create: async (req, res) => {
    const { activity_name } = req.body
    if (!activity_name) return res.status(400).send({ error: "Activity Name is required" })
    try {
      const data = await TodoList.create({ activity_name })
      return res.status(201).send(data)
    } catch (error) {
      console.error('create error', error);
      return res.status(400).send(error)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const { activity_name } = req.body

    if (!activity_name) return res.status(400).send({ error: "Activity Name is required" })
    try {
      const data = await TodoList.update({ activity_name }, { where: { id }, returning: true })
      return res.send(data[1][0])
    } catch (error) {
      console.error('create error', error);
      return res.status(400).send(error)
    }
  },
}