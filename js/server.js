//Server without ExpressJS
const http = require('http');
const url = require('url');
const mysql = require('mysql');
const port = 3000;
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'NA11!!du',
database: 'test'
});
db.connect(err => {
if (err) {
console.error('Error connecting to the database:', err);
return;
}
console.log('Connected to the MySQL database.');
});
const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const method = req.method;
const path = parsedUrl.pathname;
if (method === 'GET' && path === '/items') {
const query = 'SELECT * FROM items';
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching items:', err);
res.statusCode = 500;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Internal server error' }));
return;
}
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(results));
});
}
else if (method === 'POST' && path === '/items') {
let body = '';
req.on('data', chunk => {
body += chunk.toString();
});
req.on('end', () => {
const { id, itemInfo } = JSON.parse(body);
const query = 'INSERT INTO items (id, itemInfo) VALUES (?, ?)';
db.query(query, [id, itemInfo], (err, result) => {
if (err) {
console.error('Error creating the item:', err);
res.statusCode = 500;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Internal server error' }));
return;
}
res.statusCode = 201;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Item created successfully', id
}));
});
});
}
else if (method === 'PUT' && path === '/items') {
let body = '';
req.on('data', chunk => {
body += chunk.toString();
});
req.on('end', () => {
const { id, itemInfo } = JSON.parse(body);
const query = 'UPDATE items SET name = ? WHERE id = ?';
db.query(query, [itemInfo, id], (err, result) => {
if (err) {
console.error('Error updating the item:', err);
res.statusCode = 500;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Internal server error' }));
return;
}
if (result.affectedRows === 0) {
res.statusCode = 404;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Item not found' }));
return;
}
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Item updated successfully'
}));
});
});
}
else if (method === 'DELETE' && path === '/items') {
let body = '';
req.on('data', chunk => {
body += chunk.toString();
});
req.on('end', () => {
const { id } = JSON.parse(body);
const query = 'DELETE FROM items WHERE id = ?';
db.query(query, [id], (err, result) => {
if (err) {
console.error('Error deleting the item:', err);
res.statusCode = 500;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Internal server error' }));
}
return;
if (result.affectedRows === 0) {
res.statusCode = 404;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Item not found' }));
return;
}
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Item deleted successfully'
}));
});
});
}
else {
res.statusCode = 404;
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: 'Not found' }));
}
});
server.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});
//Server with Express
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'NA11!!du',
database: 'test'
});
db.connect(err => {
if (err) {
console.error('Error connecting to the database:', err);
return;
}
console.log('Connected to the MySQL database.');
});
app.get('/items', (req, res) => {
const query = 'SELECT * FROM items';
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching items:', err);
res.status(500).json({ message: 'Internal server error' });
return;
}
res.status(200).json(results);
});
});
app.post('/items/:id', (req, res) => {
const { id } = req.params;
const { name } = req.body;
const query = 'INSERT INTO items (id, name) VALUES (?, ?)';
db.query(query, [id, name], (err, result) => {
if (err) {
console.error('Error creating the item:', err);
res.status(500).json({ message: 'Internal server error' });
return;
}
res.status(201).json({ message: 'Item created successfully', id
});
});
});
app.put('/items/:id', (req, res) => {
const { id } = req.params;
const { name } = req.body;
const query = 'UPDATE items SET name = ? WHERE id = ?';
db.query(query, [name, id], (err, result) => {
if (err) {
console.error('Error updating the item:', err);
res.status(500).json({ message: 'Internal server error' });
return;
}
if (result.affectedRows === 0) {
res.status(404).json({ message: 'Item not found' });
return;
}
res.status(200).json({ message: 'Item updated successfully' });
});
});
app.delete('/items/:id', (req, res) => {
const { id } = req.params;
const query = 'DELETE FROM items WHERE id = ?';
db.query(query, [id], (err, result) => {
if (err) {
console.error('Error deleting the item:', err);
res.status(500).json({ message: 'Internal server error' });
return;
}
if (result.affectedRows === 0) {
res.status(404).json({ message: 'Item not found' });
return;
}
res.status(200).json({ message: 'Item deleted successfully' });
});
});
app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});
