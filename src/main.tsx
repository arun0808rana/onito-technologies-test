import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root.tsx";
import './index.css'

import ErrorPage from "./error-page.tsx";
import UserForm from './routes/userForm/UserForm.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user-form",
        element: <UserForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
