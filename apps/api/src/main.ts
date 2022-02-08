import { ShoppingListItem } from '@shopping-list/api-interfaces';
import * as express from 'express';
import * as mysql from 'mysql';

const app = express();
app.use(express.json());
const connect = () => {
  const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shopping-list',
  });
  connection.connect();
  return connection;
};

/**
 * Load shopping list.
 */
app.get('/api/shopping-list', (req, res) => {
  const connection = connect();
  connection.query(
    'SELECT * FROM `shopping-list`.`items` AS `solution`;',
    function (err, rows) {
      if (err) throw err;
      const data: ShoppingListItem[] = [];
      rows.forEach((element) => {
        data.push({ ...element } as ShoppingListItem);
      });
      res.json(data);
    }
  );
  connection.end();
});

/**
 * Add new item to shopping list.
 */
app.post('/api/shopping-list', (req, res) => {
  const connection = connect();
  connection.query(
    'INSERT INTO `shopping-list`.`items` ( `name`, `description`, `quantity` ) VALUES ( ?, ?, ?);',
    [req.body.name, req.body.description, req.body.quantity],
    (err) => {
      if (err) throw err;
      res.json({ status: 1, message: 'Success' });
    }
  )
  connection.end();
});

/**
 * Update existing item in shopping list.
 */
app.put('/api/shopping-list/:id', (req, res) => {
  const connection = connect();
  connection.query(
    'UPDATE `shopping-list`.`items` SET `name`=?, `description`=?, `quantity`=?, `purchased`=? WHERE `id`=?;',
    [req.body.name, req.body.description, req.body.quantity, req.body.purchased, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ status: 1, message: 'Success' });
    }
  );
  connection.end();
});

/**
 * Delete item from shopping list.
 */
app.delete('/api/shopping-list/:id', (req, res) => {
  const connection = connect();
  connection.query(
    'DELETE FROM `shopping-list`.`items` WHERE `id`=?;',
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ status: 1, message: 'Success' });
    }
  );
  connection.end();
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
