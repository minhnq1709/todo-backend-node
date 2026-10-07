// import { test } from '@jest/globals';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_V1 = '/api/v1';
const API_V2 = '/api/v2';
const API_V3 = '/api/v3';

// FR-01: Registration
test('AC-01-01: POST /auth/register successful', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email: 'test1@gmail.com',
            password: 'TestPassword123!@#'
        })
    });

    expect(res.status).toBe(200);
});

test('AC-01-02: POST /auth/register with used email', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email: 'test@gmail.com',
            password: 'TestPassword123!@#'
        })
    });

    expect(res.status).toBe(400);
});

test('AC-01-05: POST /auth/register with invalid email or password', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email: 'testgmail.com',
            password: '1!@#'
        })
    });

    expect(res.status).toBe(400);
});

// FR-02: Sign in
// FR-03: Create task
test('AC-03-01: POST /todos no token', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'title': 'test' })
    });
    expect(res.status).toBe(401);
});

test('AC-03-02: POST /todos with valid token', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer testToken'
        },
        body: JSON.stringify({ 'title': 'test' })
    });

    expect(res.status).toBe(201);
    const resJson = await res.json();

    expect(resJson).toHaveProperty('id');
    expect(resJson).toHaveProperty('status');
});

test('AC-03-03: POST /todos with a valid token and empty body {}', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer testToken'
        },
        body: JSON.stringify({ 'title': 'test' })
    });
});



// FR-04: View one task's details
// FR-05: List tasks
// FR-06: Update a task
// FR-07: Delete a task
// FR-08: View account's details

