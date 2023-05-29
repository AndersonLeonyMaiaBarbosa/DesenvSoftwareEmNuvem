const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(express.json());
app.use(cors());

const supabaseUrl = 'https://miwulomfvmchnfgdkmvx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pd3Vsb21mdm1jaG5mZ2RrbXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTIxNjgsImV4cCI6MTk5OTc2ODE2OH0.4w7xFhwVyVV9WrUFjPrlztjMJvJbspsSST8_aQ7Tgd8';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/products', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const { data, error } = await supabase.from('products').insert([product]);

    if (error) {
      throw new Error(error.message);
    }

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const { data, error } = await supabase
      .from('products')
      .update(updatedProduct)
      .match({ id });

    if (error) {
      throw new Error(error.message);
    }

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('products')
      .delete()
      .match({ id });

    if (error) {
      throw new Error(error.message);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});