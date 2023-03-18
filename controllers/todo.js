const { Todo } = require('../models');

class TodoController {
    static healthCheck(req, res, next) {
        res.status(200).json({message: "Hello World"})
    }
    
    static index (req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({data})
            })
            .catch(err => {
                next(err)
            })
    }

    static add (req, res, next) {
        Todo.create({
            title: req.body.title
        })
        .then(data => {
            res.status(201).json({data, message: "Todo created!"})
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong", error: err})
        })
    }

    static detail (req, res, next){
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (!data){
                res.status(404).json({message: 'Todo not found!'})
            } else {
                res.status(200).json({data})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong", error: err})
        })
    }

    static edit (req, res, next) {
        const updatedTodo = {
            title: req.body.title
        }

        Todo.findByPk(req.params.id)
            .then(data => {
                if (!data){
                    throw ({status: 404, msg: "Data not found"})
                } else {
                    return Todo.update(updatedTodo, {where: {id: req.params.id}})
                }
            })
            .then(data => {
                res.status(200).json({data: updatedTodo, message: 'Todo updated!'})
            })
            .catch(err => {
                res.status(500).json({message: "Something went wrong", error: err})
            })
    }

    static delete (req, res, next) {
        Todo.findByPk(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).json({status: 404, message: 'Todo not found!'})
                } else {
                    return Todo.destroy({where: {id: req.params.id}})
                }
            })
            .then(data => {
                res.status(200).json({message: 'Todo deleted!'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController;