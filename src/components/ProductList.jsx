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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getProducts } from "../redux/productsSlice.js";


export default function ProductList() {
  /** @type {productsState} products **/
  const products = useSelector(state => state.products)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => {
        console.log('FLAG>>', res.data)
        dispatch(getProducts(res.data))
      })
      .catch(err => console.error(err))

    // axios.post('http://localhost:3001/products', {id: 30, name: 'Producto 30', price: 3000})
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err))

  }, [dispatch]);

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
        <input type="text"/>
        <button>Agregar Producto</button>
      </aside>
    </>
  );
}