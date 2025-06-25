const mysql = require('mysql2/promise');

async function test() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goldencourier'
  });

  const [rows] = await connection.query('SELECT 1 + 1 AS result');
  console.log('MySQL test result:', rows);
  await connection.end();
}

test().catch(console.error);