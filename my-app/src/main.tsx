import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider  } from 'react-router'


import Home from './routes/Home'
import Produtos from './routes/Produtos'
import EditarProdutos from './routes/EditarProdutos'
import Error from './routes/Error'
import App from './App'



const router = createBrowserRouter([
  {path: '/', element: <App/>, errorElement: <Error/>, children: [
    {path: '/', element: <Home/>},
    {path: 'produtos', element: <Produtos/>},
    {path: 'editar-produto/:id', element: <EditarProdutos/>},
  ]}
])  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router}/>
=======
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
>>>>>>> 6297e0eb8938deb46580367324062d7af745b4f4
  </StrictMode>,
)
