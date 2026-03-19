const request = require('supertest');
const mongoose = require('mongoose');

const { setupMongo, teardownMongo } = require('./utils/setupMongo');

let app;

jest.setTimeout(60000);

beforeAll(async () => {
	await setupMongo();

	// Require after env is set so backend index.js connects to the in-memory DB.
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	app = require('../index');
	// Wait for mongoose connection triggered by backend/index.js.
	await mongoose.connection.asPromise();
});

afterAll(async () => {
	await teardownMongo();
});

const registerUser = async ({ fullName, email, password }) => {
	return request(app).post('/api/v1/auth/register').send({
		fullName,
		email,
		password,
		profileImageUrl: null,
	});
};

const loginUser = async ({ email, password }) => {
	return request(app).post('/api/v1/auth/login').send({ email, password });
};

const addIncome = async (token, body) => {
	return request(app)
		.post('/api/v1/income/add')
		.set('Authorization', `Bearer ${token}`)
		.send(body);
};

const addExpense = async (token, body) => {
	return request(app)
		.post('/api/v1/expense/add')
		.set('Authorization', `Bearer ${token}`)
		.send(body);
};

const deleteIncome = async (token, id) => {
	return request(app)
		.delete(`/api/v1/income/${id}`)
		.set('Authorization', `Bearer ${token}`);
};

const deleteExpense = async (token, id) => {
	return request(app)
		.delete(`/api/v1/expense/${id}`)
		.set('Authorization', `Bearer ${token}`);
};

describe('Security/correctness integration tests', () => {
	test('register does not return password hash', async () => {
		const res = await registerUser({
			fullName: 'User A',
			email: 'usera@example.com',
			password: 'password123',
		});

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('token');
		expect(res.body).toHaveProperty('user');
		expect(res.body.user).not.toHaveProperty('password');
	});

	test('login succeeds for valid credentials and fails generically for invalid password', async () => {
		const loginSuccess = await loginUser({
			email: 'usera@example.com',
			password: 'password123',
		});
		expect(loginSuccess.status).toBe(200);
		expect(loginSuccess.body).toHaveProperty('token');
		expect(loginSuccess.body).toHaveProperty('user');
		expect(loginSuccess.body.user).not.toHaveProperty('password');

		const loginFail = await loginUser({
			email: 'usera@example.com',
			password: 'wrongpassword',
		});
		expect(loginFail.status).toBe(400);
		expect(loginFail.body).toHaveProperty('message');
		expect(typeof loginFail.body.message).toBe('string');
	});

	test('amount=0 and invalid inputs: income validation', async () => {
		const reg = await registerUser({
			fullName: 'User Income',
			email: 'income@example.com',
			password: 'password123',
		});
		const token = reg.body.token;

		const ok = await addIncome(token, {
			source: 'Salary',
			amount: 0,
			date: '2026-03-18',
			icon: '💰',
		});
		expect(ok.status).toBe(200);

		const invalidAmount = await addIncome(token, {
			source: 'Salary',
			amount: 'abc',
			date: '2026-03-18',
			icon: '💰',
		});
		expect(invalidAmount.status).toBe(400);
		expect(invalidAmount.body).toHaveProperty('message');

		const invalidDate = await addIncome(token, {
			source: 'Salary',
			amount: 10,
			date: 'not-a-date',
			icon: '💰',
		});
		expect(invalidDate.status).toBe(400);
		expect(invalidDate.body).toHaveProperty('message');
	});

	test('amount=0 and invalid inputs: expense validation', async () => {
		const reg = await registerUser({
			fullName: 'User Expense',
			email: 'expense@example.com',
			password: 'password123',
		});
		const token = reg.body.token;

		const ok = await addExpense(token, {
			category: 'Food',
			amount: 0,
			date: '2026-03-18',
			icon: '🍕',
		});
		expect(ok.status).toBe(200);

		const invalidAmount = await addExpense(token, {
			category: 'Food',
			amount: 'abc',
			date: '2026-03-18',
			icon: '🍕',
		});
		expect(invalidAmount.status).toBe(400);
		expect(invalidAmount.body).toHaveProperty('message');

		const invalidDate = await addExpense(token, {
			category: 'Food',
			amount: 10,
			date: 'not-a-date',
			icon: '🍕',
		});
		expect(invalidDate.status).toBe(400);
		expect(invalidDate.body).toHaveProperty('message');
	});

	test('ownership scoped deletes only delete records owned by the token user', async () => {
		const userA = await registerUser({
			fullName: 'Owner A',
			email: 'ownera@example.com',
			password: 'password123',
		});
		const userB = await registerUser({
			fullName: 'Owner B',
			email: 'ownerb@example.com',
			password: 'password123',
		});

		const tokenA = userA.body.token;
		const tokenB = userB.body.token;

		const inc = await addIncome(tokenA, {
			source: 'Salary',
			amount: 10,
			date: '2026-03-18',
			icon: '💰',
		});
		const incomeId = inc.body.newIncome._id;

		const exp = await addExpense(tokenA, {
			category: 'Food',
			amount: 20,
			date: '2026-03-18',
			icon: '🍕',
		});
		const expenseId = exp.body.newExpense._id;

		const incomeDeleteWrongUser = await deleteIncome(tokenB, incomeId);
		expect(incomeDeleteWrongUser.status).toBe(404);
		expect(incomeDeleteWrongUser.body).toHaveProperty('message');

		const expenseDeleteWrongUser = await deleteExpense(tokenB, expenseId);
		expect(expenseDeleteWrongUser.status).toBe(404);
		expect(expenseDeleteWrongUser.body).toHaveProperty('message');

		const incomeDeleteInvalidId = await deleteIncome(tokenA, 'invalid-id');
		expect(incomeDeleteInvalidId.status).toBe(400);
		expect(incomeDeleteInvalidId.body).toHaveProperty('message');
	});

	test('excel download returns an xlsx payload', async () => {
		const reg = await registerUser({
			fullName: 'Excel User',
			email: 'excel@example.com',
			password: 'password123',
		});
		const token = reg.body.token;

		const res = await request(app)
			.get('/api/v1/income/downloadexcel')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(res.headers['content-type']).toContain('spreadsheetml.sheet');
		let payloadBuffer;
		if (Buffer.isBuffer(res.body)) {
			payloadBuffer = res.body;
		} else if (
			res.body &&
			res.body.type === 'Buffer' &&
			Array.isArray(res.body.data)
		) {
			payloadBuffer = Buffer.from(res.body.data);
		} else if (typeof res.text === 'string') {
			payloadBuffer = Buffer.from(res.text);
		} else {
			payloadBuffer = null;
		}

		expect(payloadBuffer).not.toBeNull();
		expect(payloadBuffer.length).toBeGreaterThan(0);
	});

	test('upload endpoint requires auth and enforces file size limit', async () => {
		const noToken = await request(app)
			.post('/api/v1/auth/test-upload')
			.attach('image', Buffer.from('123'), 'small.jpg');

		expect(noToken.status).toBe(401);

		const tokenUser = await registerUser({
			fullName: 'Upload User',
			email: 'upload@example.com',
			password: 'password123',
		});
		const token = tokenUser.body.token;

		// 4MB buffer (multer limit is 3MB)
		const bigBuffer = Buffer.alloc(4 * 1024 * 1024, 0);
		const tooLarge = await request(app)
			.post('/api/v1/auth/test-upload')
			.set('Authorization', `Bearer ${token}`)
			.attach('image', bigBuffer, {
				filename: 'big.jpg',
				contentType: 'image/jpeg',
			});

		expect(tooLarge.status).toBe(413);
		expect(tooLarge.body).toHaveProperty('message');
	});
});

