import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: '/',
    element: App()
  },
  {
    path:'/:pokeId',
    element:<h1>Datos</h1>
  }

])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router = {router}>

  </RouterProvider>
)
