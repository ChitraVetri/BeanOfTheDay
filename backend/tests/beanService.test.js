const { poolPromise } = require('../models/beanModel');
const beanService = require('../services/beanService');

// Mock the pool and request chain
const mockQuery = jest.fn();
const mockInput = jest.fn(() => ({ query: mockQuery }));
const mockRequest = jest.fn(() => ({ input: mockInput, query: mockQuery }));
//const mockPool = { request: mockRequest };

// Mock poolPromise to return the mock pool
jest.mock('../mocks/beanModel', () => {
    const originalModule = jest.requireActual('../models/beanModel');
    return {
        ...originalModule,
        poolPromise: Promise.resolve({ request: mockRequest }),
        sql: {
            VarChar: 'VarChar',
            NVarChar: 'NVarChar',
            Int: 'Int',
            Decimal: () => 'Decimal',
            Date: 'Date',
            Transaction: jest.fn().mockImplementation(() => ({
                begin: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn(),
                request: jest.fn(() => ({
                    input: jest.fn().mockReturnThis(),
                    query: jest.fn(),
                })),
            }))
        },
    };
});



describe('Bean Service', () => {
    beforeEach(() => {
        jest.resetModules();         // 💥 Clears module cache
        jest.clearAllMocks();        // ✅ Clears mock usage data        
    });

    test('getAllBeans returns all beans', async () => {
        const mockBeans = [{ Id: '1', Name: 'Arabica' }];
        const pool = await poolPromise;
        pool.request = jest.fn(() => ({
            query: jest.fn().mockResolvedValue({ recordset: mockBeans })
        }));

        const result = await beanService.getAllBeans();
        expect(result).toEqual(mockBeans);
    });

    test('getBeanById returns correct bean', async () => {
        const beanId = '123';
        const mockBean = { Id: beanId, Name: 'Robusta' };
        const pool = await poolPromise;
        pool.request = jest.fn(() => ({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [mockBean] })
        }));

        const result = await beanService.getBeanById(beanId);
        expect(result).toEqual(mockBean);
    });


    //     const mockTransaction = {
    //         begin: jest.fn(),
    //         commit: jest.fn(),
    //         rollback: jest.fn(),
    //         request: jest.fn(() => ({
    //             input: jest.fn().mockReturnThis(),
    //             query: jest.fn()
    //         }))
    //     };

    //     sql.Transaction.mockImplementation(() => mockTransaction);

    //     mockTransaction.request().query
    //         .mockResolvedValueOnce({ recordset: [{ Id: 101 }] }) // Insert order
    //         .mockResolvedValueOnce({}) // Insert order item
    //         .mockResolvedValueOnce({}); // Delete from cart

    //     const result = await beanService.createOrder('user123', [{
    //         bean_id: 'B1',
    //         bean_name: 'Test Bean',
    //         bean_quantity: 2,
    //         bean_price: '£10',
    //         user_name: 'user123'
    //     }], 20.0);

    //     expect(result.orderId).toBe(101);
    //     expect(result.total).toBe(20.0);
    //     expect(mockTransaction.commit).toHaveBeenCalled();
    // });
});

describe('getBeanOfTheDay', () => {
    it('should return today\'s bean if already set', async () => {
        const mockPool = await poolPromise;

        // Setup mocked results
        const todayBean = { bean_id: 'abc123' };
        const beanDetails = [{ Id: 'abc123', Name: 'TestBean' }];

        // Mock check for today's bean
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [todayBean] }),
        });

        // Mock bean fetch by ID
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: beanDetails }),
        });

        const result = await beanService.getBeanOfTheDay();

        expect(result).toEqual(beanDetails[0]);
    });
    it('should select a new bean (excluding yesterday\'s) and insert it', async () => {
        const mockPool = await poolPromise;

        // Step 1: No bean set today
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [] }),
        });

        // Step 2: All beans available
        const allBeans = [
            { id: 'id1', Id: 'id1', Name: 'A' },
            { id: 'id2', Id: 'id2', Name: 'B' }
        ];
        mockPool.request.mockReturnValueOnce({
            query: jest.fn().mockResolvedValue({ recordset: allBeans }),
        });

        // Step 3: Yesterday's bean exists
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [{ bean_id: 'id1' }] }),
        });

        // Step 4: Insert new bean of the day
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({}),
        });

        const result = await beanService.getBeanOfTheDay();

        expect(['id2']).toContain(result.Id);
    });
    it('should throw error if no beans are available', async () => {
        const mockPool = await poolPromise;

        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [] }),
        });

        mockPool.request.mockReturnValueOnce({
            query: jest.fn().mockResolvedValue({ recordset: [] }),
        });

        await expect(beanService.getBeanOfTheDay()).rejects.toThrow('No beans available.');
    });
    it('should throw error if only yesterday\'s bean exists', async () => {
        const mockPool = await poolPromise;

        // No bean set today
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [] }),
        });

        // All beans (only one)
        const allBeans = [{ id: 'id1', Id: 'id1', Name: 'OnlyBean' }];
        mockPool.request.mockReturnValueOnce({
            query: jest.fn().mockResolvedValue({ recordset: allBeans }),
        });

        // Yesterday’s bean is same
        mockPool.request.mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [{ bean_id: 'id1' }] }),
        });

        await expect(beanService.getBeanOfTheDay()).rejects.toThrow('Only one bean available. Cannot ensure uniqueness.');
    });
});