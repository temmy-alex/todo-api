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

    
    test('Get all list', (done) => {
        request(app)
            .get('/api/v1/todo')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
            expect(response.body.data.length).toBe(3)
            done()
        }).catch(done)
    })
   
    test('Get Detail Todo', (done) => {
        request(app)
            .get(`/api/v1/todo/1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              expect(response.body.data.title).toBe("Todo 1")
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
        const id = 100

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