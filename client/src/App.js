import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');

  const [idEdited, setIdEdited] = useState('');
  const [nameEdited, setNameEdited] = useState('');
  const [priceEdited, setPriceEdited] = useState('');
  const [descriptionEdited, setDescriptionEdited] = useState('');
  const [expirationEdited, setExpirationEdited] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [])

  function addUser() {
    fetch('http://localhost:3001/products', {
      method: "POST",
      body: JSON.stringify({ name, price, description, expiration }),
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => setProducts([...products, data]))
  }

  function loadUser( _id, name, price, description, expiration ) {
    setIdEdited(_id);
    setNameEdited(name);
    setPriceEdited(price);
    setDescriptionEdited(description);
    setExpirationEdited(new Intl.DateTimeFormat('fr-CA').format(new Date(expiration)));
  }

  function editUser() {
    fetch(`http://localhost:3001/products/${idEdited}`, {
      method: "PUT",
      body: JSON.stringify({ name: nameEdited, price: priceEdited, description: descriptionEdited, expiration: expirationEdited }),
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      })
    })

    const productsFiltered = products.filter(product => product._id !== idEdited);
    productsFiltered.push({
      _id: idEdited, name: nameEdited, price: priceEdited, description: descriptionEdited, expiration: expirationEdited
    });
    setProducts(productsFiltered);
  }

  function deleteUser(id) {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json'
      })
    })

    const productsFiltered = products.filter(product => product._id !== id);
    setProducts(productsFiltered);
  }

  return (
    <div className="App">
      <div className="default">
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" placeholder="Data de vencimento" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
        <button onClick={addUser}>Adicionar produto</button>
      </div>

      <div className="default">
        <input type="text" placeholder="Nome" value={nameEdited} onChange={(e) => setNameEdited(e.target.value)} />
        <input type="number" placeholder="Preço" value={priceEdited} onChange={(e) => setPriceEdited(e.target.value)} />
        <input type="text" placeholder="Descrição" value={descriptionEdited} onChange={(e) => setDescriptionEdited(e.target.value)} />
        <input type="date" placeholder="Data de vencimento" value={expirationEdited} onChange={(e) => setExpirationEdited(e.target.value)} />
        <button onClick={editUser}>Editar produto</button>
      </div>
      <div className="default">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Data de vencimento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(product.expiration))}</td>
                <td>
                  <button onClick={() => loadUser(product._id, product.name, product.price, product.description, product.expiration)}>Editar</button>
                  <button onClick={() => deleteUser(product._id)} >Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
