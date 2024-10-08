import UserList from "./components/UserList.jsx";
import ProductList from "./components/ProductList.jsx";

import './App.css'

function App() {

  return (
    <>
      <main className='px-5 py-10
       md:py-7
       lg:px-[200px]'
      >
        <h1 className="text-3xl font-bold text-center mb-10">CRUD Redux Toolkit</h1>
        <UserList/>
        <br/>
        <hr/>
        <ProductList/>
      </main>
    </>
  )
}

export default App
