const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'Alexander Gomez', email: 'alexanderg@gmail.com', age: 30 },
    { id: 2, name: 'Tomas Pérez', email: 'tomas.pe@gmail.com', age: 25 },
    { id: 3, name: 'Carlos Pinzon', email: 'pinzon.carlos@gmail.com', age: 40 },
    { id: 4, name: 'John Silva', email: 'j.silvas@gmail.com', age: 76 },
    { id: 5, name: 'Ximena Rodiguez', email: 'ximenarodriguez89@gmail.com', age: 32 }
  ];

 router.get('/', (req, res) => {
    res.status(200).json({ data: users });
  });
  
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId); 
  
    if (user) {
      res.status(200).json({ data: user }); 
    } else {
      res.status(404).json({ error: 'User not found' });
    }
});

router.post('/', (req, res) => {
    const {id, name, email, age} = req.body;
    if (!id || !name || !email || !age) {
        res.status(400).send({error: 'Complete data is required'});
    }

    const newUser = { id: users.length + 1, name, email, age };
    users.push(newUser);
    res.status(201).send(newUser);
});

router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } 

  const { name, email, age } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    res.status(200).json({ message: 'User updated', data: user });
});

router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId); 
  
    if (user) {
        users = users.filter(u => u.id !== userId);
        res.status(200).json({ message: 'Deleted User', data: user });
    } else {
      res.status(404).json({ error: 'User was not found' });
    }
  });

module.exports = router;