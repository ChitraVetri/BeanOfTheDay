const { poolPromise, sql } = require('../models/beanModel');

exports.getAll = async (user) => {
    try {
        const pool = await poolPromise;
        // Create a request and input parameters explicitly
        const request = pool.request()
            .input('user_name', sql.NVarChar, user); // Bind the input parameter explicitly        /

        // Run the query
        const result = await request.query('SELECT * FROM CartDetails WHERE user_name = @user_name');
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
            .input('bean_price', sql.VarChar, bean_price)
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

exports.update = async ({ Id, Name, Cost, User }) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bean_id', sql.VarChar, Id)
            .input('bean_name', sql.VarChar, Name)
            .input('bean_price', sql.VarChar, Cost)
            .input('bean_quantity', sql.Int, 1)
            .input('user_name', sql.VarChar, User)
            .query(`
        MERGE CartDetails AS target
        USING (SELECT @bean_id AS bean_id) AS source
        ON (target.bean_id = source.bean_id) and target.user_name = @user_name
        WHEN MATCHED THEN 
          UPDATE SET 
            bean_quantity = target.bean_quantity + @bean_quantity,
            bean_name = @bean_name,
            bean_price = @bean_price
        WHEN NOT MATCHED THEN 
          INSERT (bean_id, bean_name, bean_quantity, bean_price, user_name)
          VALUES (@bean_id, @bean_name, @bean_quantity, @bean_price, @user_name);
      `);
        return result.rowsAffected;
    } catch (err) {
        console.error('Error in update service:', err);
        throw err;
    }
};

exports.updateQuantity = async (id, quantity, user) => {
    try {
        const pool = await poolPromise;       
        await pool.request()
            .input('bean_id', sql.VarChar, id)
            .input('bean_quantity', sql.Int, quantity)
            .input('user_name', sql.VarChar, user)
            .query(`
          IF EXISTS (SELECT 1 FROM CartDetails WHERE bean_id = @bean_id and user_name = @user_name)
            UPDATE CartDetails SET bean_quantity = @bean_quantity WHERE bean_id = @bean_id and user_name = @user_name          
        `);
    } catch (err) {
        console.error('Error in updateQuantity service:', err);
        throw err;
    }
};

exports.totalQuantity = async (user) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_name', sql.VarChar, user)
            .query(`
                SELECT ISNULL(SUM(bean_quantity), 0) AS totalQuantity 
                FROM CartDetails 
                WHERE user_name = @user_name
            `);
        return result.recordset[0].totalQuantity;
    } catch (err) {
        console.error('Error in totalQuantity service:', err);
        throw err;
    }
};

exports.delete = async (beanId, user) => {
    try {
        console.log("beanId",beanId)
        console.log("user",user)    
        const pool = await poolPromise;
        const result = await pool.request()
            .input('bean_id', sql.VarChar, beanId)
            .input('user_name', sql.NVarChar, user)
            .query('DELETE FROM CartDetails WHERE bean_id = @bean_id and user_name = @user_name');
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error in delete service:', err);
        throw err;
    }
};
