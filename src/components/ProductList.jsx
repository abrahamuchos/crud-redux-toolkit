/**
 * @typedef {Object} productsState
 * @property {products} data
 */
/**
 * @typedef {Array<product>} products
 */
/**
 * @typedef {object} product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProduct, getProducts } from "../redux/productsSlice.js";


export default function ProductList() {
  /** @type {productsState} products **/
  const products = useSelector(state => state.products)
  const dispatch = useDispatch();
  const [newProductName, setNewProductName] = useState(/**@type {string}*/'');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => {
        dispatch(getProducts(res.data))
      })
      .catch(err => console.error(err))

  }, [dispatch]);

  /**
   * Simulate create new product with use redux
   */
  const handleCreateProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: newProductName,
      price: 0
    }
    dispatch(addProduct(newProduct));
    //Send to backend
    axios.post('http://localhost:3001/products', newProduct)
      .then(res => {
        console.log('Successful')
        setNewProductName('');
      }).catch(e => {
      console.error('Error => ', e);
    });
  };
  const handleUpdateProduct = () => {

  };
  const handleDeleteProduct = () => {

  };

  return (
    <>
      <h2>CRUD Productos</h2>
      <h3>Lista de Productos</h3>
      <ul>
        {products.data.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <aside>
        <input type="text"
               value={newProductName}
               onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={handleCreateProduct} disabled={!newProductName}>
          Agregar Producto
        </button>
      </aside>
    </>
  );
}