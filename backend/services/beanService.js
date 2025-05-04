const { poolPromise, sql } = require('../models/beanModel');

exports.getAllBeans = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Beans');
    return result.recordset;
  } catch (err) {
    console.error('Error in getAllBeans service:', err);
    throw err;
  }
};

exports.getBeanOfTheDay = async () => {
  try {
    const pool = await poolPromise;
    const today = new Date().toISOString().split('T')[0];

    // Check if Bean of the Day is already set for today
    const checkResult = await pool
      .request()
      .input('date', sql.Date, today)
      .query('SELECT * FROM BeanOfTheDay WHERE date = @date');

    if (checkResult.recordset.length > 0) {
      const beanId = checkResult.recordset[0].bean_id;
      const beanResult = await pool
        .request()
        .input('id', sql.VarChar, beanId)
        .query('SELECT * FROM Beans WHERE Id = @id');
      return beanResult.recordset[0];
    }

    // Ensure there are beans available
    const beansResult = await pool.request().query('SELECT * FROM Beans');
    const beans = beansResult.recordset;
    if (beans.length === 0) throw new Error('No beans available.');

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let yesterdayBeanId;
    const yesterdayResult = await pool
      .request()
      .input('date', sql.Date, yesterday)
      .query('SELECT * FROM BeanOfTheDay WHERE date = @date');

      if (yesterdayResult.recordset.length > 0) {
        yesterdayBeanId = yesterdayResult.recordset[0].bean_id;
      }
      
      const filteredBeans = yesterdayBeanId
        ? beans.filter(bean => bean.id !== yesterdayBeanId)
        : beans;

    if (filteredBeans.length === 0) throw new Error('Only one bean available. Cannot ensure uniqueness.');

    // Randomly select a new Bean of the Day
    const randomIndex = Math.floor(Math.random() * filteredBeans.length);
    const selectedBean = filteredBeans[randomIndex];

    if (!selectedBean) {
      throw new Error('No valid bean selected for the day.');
    }

    // Insert the selected Bean of the Day into the database
    await pool
      .request()
      .input('date', sql.Date, today)
      .input('bean_id', sql.VarChar, selectedBean.Id)
      .query('INSERT INTO BeanOfTheDay (date, bean_id) VALUES (@date, @bean_id)');

    return selectedBean;
  } catch (err) {
    console.error('Error in getBeanOfTheDay service:', err);
    throw err;
  }
};
// This code defines the bean service functions for fetching all beans and the bean of the day from the database. It uses async/await for handling asynchronous operations and includes error handling to log any issues that arise during database queries. The functions interact with a SQL Server database using the `mssql` package, which is a popular choice for Node.js applications that need to connect to SQL Server databases.
// The `getAllBeans` function retrieves all beans from the `Beans` table, while the `getBeanOfTheDay` function checks if a bean of the day has already been set for today. If not, it randomly selects a bean from the available beans, ensuring that it is not the same as yesterday's bean of the day. The selected bean is then inserted into the `BeanOfTheDay` table for today's date.

exports.searchBeans = async (queryStr) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input('query', sql.NVarChar, `%${queryStr}%`)
    .query(`
      SELECT * FROM Beans
      WHERE Name LIKE @query
         OR Country LIKE @query
         OR Colour LIKE @query
    `);

  return result.recordset;
};
// This code defines a function `searchBeans` that allows searching for beans in the database based on a query string. It uses parameterized queries to prevent SQL injection attacks and returns the matching records from the `Beans` table. The search is performed on multiple columns: `name`, `origin`, and `flavor_profile`, allowing for flexible search capabilities.

exports.placeOrder = async (order) => {
  const pool = await poolPromise;
  const { name, address, bean } = order;

  // Insert the order into the database
  await pool
    .request()
    .input('name', sql.NVarChar, name)
    .input('address', sql.NVarChar, address)
    .input('bean', sql.NVarChar, bean)
    .query(`
      INSERT INTO Orders (name, address, bean)
      VALUES (@name, @address, @bean)
    `);
};
// This code defines a function `placeOrder` that inserts a new order into the database. It takes an order object containing the customer's name, address, and the bean they wish to order. The function uses parameterized queries to prevent SQL injection attacks and ensures that the data is safely inserted into the `Orders` table in the database.
