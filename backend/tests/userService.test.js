const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../models/beanModel');

const mockQuery = jest.fn();
const mockInput = jest.fn().mockReturnThis();
const mockRequest = { input: mockInput, query: mockQuery };

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../mocks/beanModel', () => {

    const mPool = { request: () => mockRequest };
    return {
        sql: {
            NVarChar: 'NVarChar',
            UniqueIdentifier: 'UniqueIdentifier'
        },
        poolPromise: Promise.resolve(mPool)
    };
});

describe('userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {            
            mockQuery
                .mockResolvedValueOnce({ recordset: [] }) // No existing user
                .mockResolvedValueOnce(); // Successful insert

            bcrypt.hash.mockResolvedValue('hashedpassword');

            await expect(userService.register({
                user_email: 'test@example.com',
                user_name: 'newuser',
                user_password: 'password123'
            })).resolves.toBeUndefined();

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        });

        it('should throw error if username exists', async () => {
            mockQuery.mockResolvedValueOnce({ recordset: [{}] }); // User exists

            await expect(userService.register({
                user_email: 'vaefsda@bmail.com',
                user_name: 'Test123',
                user_password: '$2b$10$LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG'
            })).rejects.toThrow('Username already taken');
        });
    });

    describe('login', () => {
        it('should login successfully and return token', async () => {
            const user = {
                user_name: 'Test123',
                user_password: '$2b$10$LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG',
                user_id: '0A323D98-585D-49D4-B80F-0DB055CE4A83',
                role: 'user'
            };
            const mockRequest = (await poolPromise).request();
            mockQuery.mockResolvedValue({ recordset: [user] });

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockedtoken');

            const token = await userService.login({
                user_name: 'Test123',
                user_password: '$2b$10$LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG'
            });

            expect(token).toBe('mockedtoken');
            expect(jwt.sign).toHaveBeenCalledWith(
                { user_name: user.user_name, role: user.role, user_id: user.user_id },
                'authlogin',
                { expiresIn: '1h' }
            );
        });

        it('should throw error if user not found', async () => {
            const mockRequest = (await poolPromise).request();
            mockQuery.mockResolvedValue({ recordset: [] });

            await expect(userService.login({
                user_name: 'Test12345',
                user_password: 'LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG'
            })).rejects.toThrow('Username or Password is incorrect');
        });

        it('should throw error if password is incorrect', async () => {
            const user = {
                user_name: 'Test123',
                user_password: 'LvEk0IgrsfFU8lLn2QmNt'
            };
            const mockRequest = (await poolPromise).request();
            mockQuery.mockResolvedValue({ recordset: [user] });

            bcrypt.compare.mockResolvedValue(false);

            await expect(userService.login({
                user_name: 'Test123',
                user_password: 'LvEk0IgrsfFU8lLn2QmNt.q0yX.UIGI0eUBJaI.62A6qmI8GHBnyG'
            })).rejects.toThrow('Authentication failed, username or password is incorrect');
        });
    });
});
