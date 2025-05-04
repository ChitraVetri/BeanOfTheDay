const { poolPromise, sql } = require('../models/beanModel');

exports.getAll = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM CartDetails');
        return result.recordset;
    } catch (err) {
        console.error('Error in getAll service:', err);
        throw err;
    }
};

exports.create = async ({ bean_id, bean_name, bean_quantity, bean_price, user_name }) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bean_id', sql.VarChar, bean_id)
            .input('bean_name', sql.VarChar, bean_name)
            .input('bean_quantity', sql.Int, bean_quantity)
            .input('bean_price', sql.Decimal(10, 2), bean_price)
            .input('user_name', sql.NVarChar, user_name)
            .query(`
        INSERT INTO CartDetails (bean_id, bean_name, bean_quantity, bean_price,user_name)
        VALUES (@bean_id, @bean_name, @bean_quantity, @bean_price,@user_name)
      `);
        return result.rowsAffected;
    } catch (err) {
        console.error('Error in create service:', err);
        throw err;
    }
};

exports.update = async ({ bean_id, bean_quantity, bean_name, bean_price }) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bean_id', sql.VarChar, bean_id)
            .input('bean_name', sql.VarChar, bean_name)
            .input('bean_price', sql.Decimal(10, 2), bean_price)
            .input('bean_quantity', sql.Int, bean_quantity)
            .query(`
        MERGE CartDetails AS target
        USING (SELECT @bean_id AS bean_id) AS source
        ON (target.bean_id = source.bean_id)
        WHEN MATCHED THEN 
          UPDATE SET 
            bean_quantity = target.bean_quantity + @bean_quantity,
            bean_name = @bean_name,
            bean_price = @bean_price
        WHEN NOT MATCHED THEN 
          INSERT (bean_id, bean_name, bean_quantity, bean_price)
          VALUES (@bean_id, @bean_name, @bean_quantity, @bean_price);
      `);
        return result.rowsAffected;
    } catch (err) {
        console.error('Error in update service:', err);
        throw err;
    }
};

exports.totalQuantity = async (user_name) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_name', sql.NVarChar, user_name)
            .query('SELECT SUM(bean_quantity) AS totalQuantity FROM CartDetails WHERE user_name = @user_name');        
        return result.recordset[0].totalQuantity || 0;
    } catch (err) {
        console.error('Error in totalQuantity service:', err);
        throw err;
    }
};

exports.delete = async (beanId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bean_id', sql.VarChar, beanId)
            .query('DELETE FROM CartDetails WHERE bean_id = @bean_id');
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error in delete service:', err);
        throw err;
    }
};
