// __mocks__/beanModel.js
const mockRequest = {
  input: jest.fn().mockReturnThis(),
  query: jest.fn().mockResolvedValue({ recordset: [] }),
};

const mockPool = {
  request: jest.fn(() => mockRequest),
};

module.exports = {
  poolPromise: Promise.resolve(mockPool),
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


