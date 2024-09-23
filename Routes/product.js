const express = require('express');
const router = express.Router();

const products = [ 
    {
    id: 1,
    name: "burger",
    price: "20",
    category: 2
  },
  {
    id: 2,
    name: "soda",
    price: "10",
    category: 1
  },
  {
    id: 3,
    name: "chips",
    price: "5",
    category: 3
  },
  {
    id: 4,
    name: "fries",
    price: "6",
    category: 3
  },
  {
    id: 5,
    name: "gummies",
    price: "3",
    category: 4
  }];

router.get('/', (req, res) => {
    res.status(200).json({ data: products });
});
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(u => u.id === productId);

    if (product) {
        res.status(200).json({ data: product }); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
  });


router.post('/', (req, res) => {
    const {id, name, price, category} = req.body;
    if (!id || !name || !price || !category) {
        res.status(400).send({error: 'Complete data is required'});
    }
        const newProduct = { id: products.length + 1, name, price, category };
        products.push(newProduct);
        res.status(201).send(newProduct);
});

router.put('/:id', (req, res) => {
    const product = products.find(u => u.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } 

    const { name, price, category } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;

    res.status(200).json({ message: 'Product updated', data: product });
});

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(u => u.id === productId); 
  
    if (product) {
        products = products.filter(u => u.id !== productId);
        res.status(200).json({ message: 'Deleted Product', data: product });
    } else {
      res.status(404).json({ error: 'Product was not found' });
    }
});

module.exports = router;