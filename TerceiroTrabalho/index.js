const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = 'URL_DA_API_SUPABASE';
const supabaseUrl = 'https://miwulomfvmchnfgdkmvx.supabase.co';
// const supabaseKey = 'CHAVE_PÚBLICA_SUPABASE';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pd3Vsb21mdm1jaG5mZ2RrbXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxOTIxNjgsImV4cCI6MTk5OTc2ODE2OH0.4w7xFhwVyVV9WrUFjPrlztjMJvJbspsSST8_aQ7Tgd8';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  res.render('index', { products });
});

app.post('/products', async (req, res) => {
  const { codigo, nome, marca, preco } = req.body;

  console.log(req.body)

  const { data, error } = await supabase
    .from('products')
    .insert([{ codigo, nome, marca, preco }]);

  res.redirect('/');
});

app.get('/products/:id/edit', async (req, res) => {
  const id = req.params.id;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  res.render('edit', { product });
});

app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const { codigo, nome, marca, preco } = req.body;

  const { data, error } = await supabase
    .from('products')
    .update({ codigo, nome, marca, preco })
    .eq('id', id);

  res.redirect('/');
});

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
