const Tasks = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Tasks.create(task)

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {
        const tasks = await Tasks.findAll({raw: true})

        res.render('tasks/all', {tasks})
    }
}