import React, { useEffect, useState } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    codigo: '',
    nome: '',
    marca: '',
    preco: '',
  });
const updateTable = () => {
  fetch('http://3.21.207.77:5000/products')
  .then((response) => response.json())
  .then((data) => setProducts(data))
  .catch((error) => console.error(error));
}
  useEffect(() => {
    updateTable()
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const codigo = formData.get('codigo');
    const nome = formData.get('nome');
    const marca = formData.get('marca');
    const preco = formData.get('preco');

    const requestOptions = {
      method: editProductId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, nome, marca, preco }),
    };

    const url = editProductId
      ? `http://3.21.207.77:5000/products/${editProductId}`
      : 'http://3.21.207.77:5000/products';

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (editProductId) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editProductId ? data : product
            )
          );
          setEditProductId(null);
        } else {
          setProducts((prevProducts) => [...prevProducts, data]);
        }
        setEditProductData({
          codigo: '',
          nome: '',
          marca: '',
          preco: '',
        });
        updateTable()
      })
      .catch((error) => console.error(error));
  }

  function handleRemoveProduct(productId) {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
  
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
  
    fetch(`http://3.21.207.77:5000/products/${productId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        } else {
          throw new Error('Failed to delete product');
        }
      })
      .then(() => updateTable())
      .catch((error) => console.error(error));
  }
  
  function handleEditProduct(product) {
    setEditProductId(product.id);
    setEditProductData({
      codigo: product.codigo,
      nome: product.nome,
      marca: product.marca,
      preco: product.preco,
    });
  }

  return (
    <div>
      <h1>Product Management</h1>

      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.codigo}</td>
              <td>{product.nome}</td>
              <td>{product.marca}</td>
              <td>{product.preco}</td>
              <td>
                <button onClick={() => handleRemoveProduct(product.id)}>
                Remover
                </button>
                <button onClick={() => handleEditProduct(product)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Adicionar/Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={editProductData.codigo}
          onChange={(event) =>
            setEditProductData({
              ...editProductData,
              codigo: event.target.value,
            })
          }
        />

        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={editProductData.nome}
          onChange={(event) =>
            setEditProductData({
              ...editProductData,
              nome: event.target.value,
            })
          }
        />

        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={editProductData.marca}
          onChange={(event) =>
            setEditProductData({
              ...editProductData,
              marca: event.target.value,
            })
          }
        />

        <label htmlFor="preco">Preço:</label>
        <input
          type="text"
          id="preco"
          name="preco"
          value={editProductData.preco}
          onChange={(event) =>
            setEditProductData({
              ...editProductData,
              preco: event.target.value,
            })
          }
        />

        <button type="submit">
          {editProductId ? 'Editar Produto' : 'Adicionar Produto'}
        </button>
      </form>
    </div>
  );
}

export default ProductManagement;
