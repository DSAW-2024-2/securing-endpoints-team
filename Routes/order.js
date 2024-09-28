const express = require('express');
const router = express.Router();

let orders = [ {
    id: 1,
    userId: "2",
    productId: "201",
    quantity: 3,
    status: "pendiente",
    date: new Date("2024-09-16T10:30:00.000Z")
  },
  {
    id: 2,
    userId: "5",
    productId: "202",
    quantity: 1,
    status: "completado",
    date: new Date("2024-09-16T12:15:00.000Z")
  },
  {
    id: 3,
    userId: "3",
    productId: "203",
    quantity: 5,
    status: "enviado",
    date: new Date("2024-09-17T09:45:00.000Z")
  },
  {
    id: 4,
    userId: "1",
    productId: "204",
    quantity: 2,
    status: "pendiente",
    date: new Date("2024-09-17T11:00:00.000Z")
  },
  {
    id: 5,
    userId: "4",
    productId: "205",
    quantity: 4,
    status: "cancelado",
    date: new Date("2024-09-17T12:30:00.000Z")
  }];
  
let orderId = 1;

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const { userId, productId, quantity, status } = req.body;

  if (!userId || !productId || !quantity || !status) {
    return res.status(400).json({ error: 'Todos los campos (userId, productId, quantity, status) son requeridos' });
  }

  const newOrder = {
    id: orderId++,        
    userId,                
    productId,             
    quantity,              
    status,                
    date: new Date()       
  };

  orders.push(newOrder);
  res.status(201).json(newOrder); 
});

router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  res.json(order);
});

module.exports = router;