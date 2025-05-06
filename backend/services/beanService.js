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

exports.getBeanById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Id', sql.VarChar, id.trim())
      .query('SELECT * FROM Beans WHERE Id = @Id');
    return result.recordset[0];
  } catch (err) {
    console.error('Error in getBeanById service:', err);
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
    WHERE Name COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @query
       OR Country COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @query
       OR Colour COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @query
  `);
  return result.recordset;
};
// This code defines a function `searchBeans` that allows searching for beans in the database based on a query string. It uses parameterized queries to prevent SQL injection attacks and returns the matching records from the `Beans` table. The search is performed on multiple columns: `name`, `origin`, and `flavor_profile`, allowing for flexible search capabilities.

exports.createOrder = async (userId, items, total) => {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);  
  try {
    await transaction.begin();

    // Insert into Orders table
    const orderResult = await transaction.request()
      .input('User', sql.VarChar, userId)
      .input('Total', sql.Decimal(10, 2), total)
      .query(`
                INSERT INTO Orders (UserId, TotalAmount, OrderDate)
                OUTPUT INSERTED.Id
                VALUES (@User, @Total, GETDATE())
            `);

    const orderId = orderResult.recordset[0].Id;

    // Insert order items
    for (const item of items) {
      await transaction.request()
        .input('OrderId', sql.Int, orderId)
        .input('ProductId', sql.VarChar, item.bean_id)
        .input('ProductName', sql.VarChar, item.bean_name)
        .input('Quantity', sql.Int, item.bean_quantity)
        .input('Cost', sql.VarChar, item.bean_price)
        .query(`
                    INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price,ProductName)
                    VALUES (@OrderId, @ProductId, @Quantity, @Cost, @ProductName)
                `);

      // ✅ Clear cart for the user
      await transaction.request()
        .input('bean_id', sql.VarChar, item.bean_id)
        .input('user_name', sql.NVarChar, item.user_name)
        .query(`DELETE FROM CartDetails WHERE bean_id = @bean_id and user_name = @user_name`);
    }
    // Commit the transaction
    await transaction.commit();

    return { orderId, userId, items, total };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
