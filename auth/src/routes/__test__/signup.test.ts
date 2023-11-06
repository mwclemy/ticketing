import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful singup', async () => {
    return request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('returns 400 when email is invalid', async () => {
    return request(app).post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400)
})

it('returns 400 when password is invalid', async () => {
    return request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400)
})

it('returns 400 with missing password and email', async () => {
    await request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400)

    return request(app).post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400)
})

it('disallows duplicated email', async () => {
    await request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    return request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('sets a cookie upon successful signup', async () => {
    const response = await request(app).post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
    expect(response.get('Set-Cookie')).toBeDefined()

})


