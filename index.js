const express = require('express')
const db = require('@supabase/supabase-js')
// const bodyparser = require('body-parser')

const app = express()
app.use(express.json())
// app.use(bodyparser)

app.listen(3000, () => {
  console.log('Iniciando o serviço')
})

const supabase = db.createClient('https://yiqrbxzppqxlhrlhehqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcXJieHpwcHF4bGhybGhlaHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0Njk4NzUsImV4cCI6MTk5ODA0NTg3NX0._zUs66zVsuuhTy0-8cF_CMchWnGoQfyrE8ebTGz4_DM')

app.get('/', (req, res) => {
  res.send('hello')
})

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*')
  res.send(data)
})

// Rota para buscar um usuário pelo ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('users').select('*').eq('id', id)
  res.send(data)
})

// Rota para criar um usuário
app.post('/users', async (req, res) => {
  // const { nome } = req.body.nome
  //   const { endereco } = req.body.endereco
  //   const { telefone } = req.body.telefone
  //   const { email } = req.body.email

const { error } = await supabase.from('users').insert({ nome:req.body.nome, endereco:req.body.endereco, telefone:req.body.telefone, email:req.body.email });
  res.send(error)
})

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { nome, endereco, telefone, email } = req.body
  const { data, error } = await supabase.from('users').update({ nome, endereco, telefone, email }).eq('id', id)
  res.send(data)
})

// Rota para excluir um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('users').delete().eq('id', id)
  res.send(data)
})