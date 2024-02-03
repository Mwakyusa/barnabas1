const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost:3000',
  database: 'hms',
  password: '2002',
  port: 5432,
});

// Routes
app.get('/', async (req, res) => {
  const students = await pool.query('SELECT * FROM students');
  res.render('index', { students: students.rows });
});

app.get('/bookings', async (req, res) => {
  const bookings = await pool.query('SELECT * FROM book_hostel');
  res.render('bookings', { bookings: bookings.rows });
});

app.get('/hostel-status', async (req, res) => {
  const hostelStatus = await pool.query('SELECT * FROM hostel_status');
  res.render('hostel-status', { hostelStatus: hostelStatus.rows });
});

app.get('/dashboard', async (req, res) => {
  const dashboardData = await pool.query('SELECT * FROM dashboard');
  res.render('dashboard', { dashboardData: dashboardData.rows[0] });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
