import express from 'express';
import mysql from 'mysql'

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'XpenceTrack',
    password: 'XpenceTrack',
    database: 'XpenceTrack'
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});