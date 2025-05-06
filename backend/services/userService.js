const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { poolPromise, sql } = require('../models/beanModel');

exports.register = async ({ user_email, user_name, user_password }) => {
  try {
    const pool = await poolPromise;

    // Check if username already exists
    const existingUser = await pool.request()
      .input('user_name', sql.NVarChar, user_name)
      .query(`SELECT 1 FROM UserDetails WHERE user_name = @user_name`);

    if (existingUser.recordset.length > 0) {
      throw new Error('Username already taken. Please choose a different one.');      
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);
    const user_id = uuidv4();

    await pool.request()
      .input('user_id', sql.UniqueIdentifier, user_id)
      .input('user_email', sql.NVarChar, user_email)
      .input('user_name', sql.NVarChar, user_name)
      .input('user_password', sql.NVarChar, hashedPassword)
      .input('role', sql.NVarChar, 'user')
      .query(`
        INSERT INTO UserDetails (user_id, user_email, user_name, user_password, role)
        VALUES (@user_id, @user_email, @user_name, @user_password, @role)
      `);
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw new Error(error.message || 'Failed to register user. Please try again later.');
  }
};


exports.login = async ({ user_name, user_password }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_name', sql.NVarChar, user_name)
      .query(`SELECT * FROM UserDetails WHERE user_name = @user_name`);

    const user = result.recordset[0];
    if (!user) {
      throw new Error('Username or Password is incorrect');
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      throw new Error('Authentication failed, username or password is incorrect');
    }

    return jwt.sign(
      { user_name: user.user_name, role: user.role,user_id: user.user_id },
      'authlogin',
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.message || 'Login failed. Please try again later.');
  }
};
