const { Client } = require('pg');

async function dropDb() {
  const dbName = 'mptc-poc';
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Connect to the default database first
    password: 'postgres',
    port: 5432,
  });

  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();

    console.log(`Dropping database: ${dbName}`);
    await client.query(`DROP DATABASE IF EXISTS "${dbName}";`);

    console.log('Database drop successful');
  } catch (error) {
    console.error('Error dropping database:', error);
  } finally {
    await client.end();
  }
}

dropDb();
