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
import { addProduct, getProducts, updateProduct } from "../redux/productsSlice.js";


export default function ProductList() {
  /** @type {productsState} products **/
  const products = useSelector(state => state.products)
  const dispatch = useDispatch();
  const [newProductName, setNewProductName] = useState(/**@type {string}*/'');
  const [editProduct, setEditProduct] = useState(/**@type {{id: number|null, name: string|null, price: number|null}} */ {})
  const [editedProduct, setEditedProduct] = useState(/**@type {{id: number|null, isEdited: boolean}} */{
    id: null,
    isEdited: false
  });

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
        alert('Product was created')
        setNewProductName('');
      }).catch(e => {
      alert('Ok Houston, we have a problem. Product did not created')
      console.error(e);
    });
  };
  /**
   * Simulate update product with use redux
   */
  const handleUpdateProduct = () => {
    dispatch(updateProduct(editProduct));
    axios.put(`http://localhost:3001/products/${editProduct.id}`, editProduct)
      .then(res => {
        setEditedProduct({id: null, isEdited: false})
        setEditProduct({id: null, name: null, price: null});
        alert('Product was updated')
      })
      .catch(e =>{
        alert('Ok Houston, we have a problem. Product did not updated')
        console.error(e);
      })
  };
  const handleDeleteProduct = () => {

  };

  return (
    <>
      <h2>CRUD Productos</h2>
      <h3>Lista de Productos</h3>
      <ul>
        {products.data.map(product => (
          <li key={product.id} style={{marginBottom: '15px', listStyle: "none"}}>

            <div style={{display: "flex", justifyContent: 'space-around'}}>
              {editedProduct.id === product.id && editedProduct.isEdited ?
                <>
                  <input type="text"
                         value={editProduct.name ?? product.name}
                         onChange={(e) => setEditProduct({
                           id: product.id,
                           name: e.target.value,
                           price: product.price
                         })}
                  />
                  <div style={{display: "flex", gap: '10px'}}>
                    <button onClick={handleUpdateProduct}>
                      Actualizar
                    </button>
                    <button onClick={() => setEditedProduct({id: null, isEdited: false})}>
                      Cancelar
                    </button>
                  </div>
                </>
                : <>
                  <span>{product.name} - ${product.price}</span>
                  <div style={{display: "flex", gap: '10px'}}>
                    <button onClick={() => setEditedProduct({id: product.id, isEdited: true})}>
                      Editar
                    </button>
                    <button>Eliminar</button>
                  </div>
                </>

              }
            </div>


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