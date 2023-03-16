const app = require('../app')
const request = require('supertest');

describe('Todo Unit Test', () => {
    test('Add Todo Successfully', (done) => {
        const newTodo = {
            title: "Todo"
        }
        
        request(app)
            .post('/api/v1/todo/add')
            .send(newTodo)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body.message).toBe('Todo created!')
                done()
            })
            .catch(done)
    })

    test('Get All List Todo', (done) => {
        request(app)
        .get('/api/v1/todo')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.data.length).toBe(5) // check based on all data in first page
            done()
        }).catch(done)
    })

    test('Get Detail Todo', (done) => {
        request(app)
            .get(`/api/v1/todo/1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              expect(response.body.data.title).toBe("Task 1")
              done()
            }).catch(done)
      })

    test('Edit Todo', (done) => {
        const id = 1
        const updatedTodo = {
            title: "Todo 1 Updated",
        }
        
        request(app)
            .put(`/api/v1/todo/${id}`)
            .send(updatedTodo)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toBe('Todo updated!')
                expect(response.body.data).toHaveProperty('title', 'Todo 1 Updated')
                done()
            })
            .catch(done)
    })

    test('Delete Todo', (done) => {
        const id = 1

        request(app)
            .delete(`/api/v1/todo/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toBe("Todo deleted!")
                done()
        })
        .catch(done)
    })
}) 