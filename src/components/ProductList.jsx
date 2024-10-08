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
import { addProduct, deleteProduct, getProducts, updateProduct } from "../redux/productsSlice.js";


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
  /**
   * Simulate delete
   * @param {number} id - Product id
   */
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({id: id}))
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(res => {
        alert('Product was deleted');
      })
      .catch(e => {
        alert('Ok Houston, we have a problem. Product did not deleted')
        console.error(e);
      })
  };


  return (
    <>
      <h2 className='text-3xl font-bold text-center mb-10 mt-5'>CRUD Productos</h2>
      <h2 className='text-2xl text-center'>Lista de Productos</h2>

      <ul>
        {products.data.map(product => (
          <li key={product.id} style={{marginBottom: '15px', listStyle: "none"}}>

            <div className="grid grid-cols-2">
              {editedProduct.id === product.id && editedProduct.isEdited ?
                <>
                  <input type="text" className='input w-[40%]'
                         value={editProduct.name ?? product.name}
                         onChange={(e) => setEditProduct({
                           id: product.id,
                           name: e.target.value,
                           price: product.price
                         })}
                  />
                  <div className='text-end'>
                    <button className='btn-primary mr-5' onClick={handleUpdateProduct}>
                      Actualizar
                    </button>
                    <button className='btn-secondary' onClick={() => setEditedProduct({id: null, isEdited: false})}>
                      Cancelar
                    </button>
                  </div>
                </>
                : <>
                  <span>{product.name} - ${product.price}</span>
                  <div className='text-end'>
                    <button className='btn-secondary mr-5' onClick={() => setEditedProduct({id: product.id, isEdited: true})}>
                      Editar
                    </button>
                    <button className='btn-danger' onClick={()=> handleDeleteProduct(product.id)}>
                      Eliminar
                    </button>
                  </div>
                </>

              }
            </div>


          </li>
        ))}
      </ul>

      <aside className='flex justify-center items-center mt-10'>
        <input type="text" className='input w-[50%] mb-2'
               placeholder='Nombre del producto'
               value={newProductName}
               onChange={(e) => setNewProductName(e.target.value)}
        />
        <button className='btn-primary ml-5' onClick={handleCreateProduct} disabled={!newProductName}>
          Agregar Producto
        </button>
      </aside>


    </>
  );
}