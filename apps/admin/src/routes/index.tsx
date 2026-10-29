import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { Admin } from '../components/admin';
import LoginPage from '../pages/login/Login';
import Organization from '../pages/organization';
import Products from '../components/Product';
import EditPage from '../components/Webpages/EditPage';
import EditProduct from '../components/Product/EditProduct';
import ListTheme from '../components/Theme';
import EditTheme from '../components/Theme/EditTheme';
import DigitalAsset from '../components/DigitalAsset';
import Pages from '../components/Webpages';
import CreateOrganization from '../components/Organization/CreateOrganization';
import EditOrganization from '../components/Organization/EditOrganization';
import CreateProduct from '../components/Product/CreateProduct';
import CreatePage from '../components/Webpages/CreatePage';
import CreateTheme from '../components/Theme/CreateTheme';
import CreateAuthorModal from '../components/Author/CreateAuthor';
import Authors from '../components/Author';
import EditAuthor from '../components/Author/EditAuthor';
import ListCollection from '../components/Collections/ListCollection';
import CreateCollection from '../components/Collections/CreateCollection';
import EditCollection from '../components/Collections/EditCollection';
import CreateTag from '../components/Tags/CreateTag';
import TasgList from '../components/Tags/TagList';
import EditTag from '../components/Tags/EditTag';
import ListProductModel from '../components/ProductModels/ListProductModel';
import CreateProductModel from '../components/ProductModels/CreateProductModel';
import EditProductModel from '../components/ProductModels/EditProductModel';

export enum UserRole {
  USER = 'USER',
  ORG_ADMIN = 'ORG_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export const router = createBrowserRouter([
  {
    path: '/login', 
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Admin />,
    children: [
      {
        path: '',
        element: <Navigate to="/products" replace={true} />,
      },
      {
        path: 'products',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Products />,
          },
          {
            path: 'create',
            element: <CreateProduct />,
          },
          {
            path: 'edit/:id',
            element: <EditProduct />,
          },
        ],
      },
      {
        path: 'themes',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <ListTheme />,
          },
          {
            path: 'create',
            element: <CreateTheme />,
          },
          {
            path: 'edit/:id',
            element: <EditTheme />,
          },
        ],
      },
      {
        path: 'digitals',
        element: <DigitalAsset />,
      },
      {
        path: 'authors',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Authors />,
          },
          {
            path: 'create',
            element: <CreateAuthorModal />,
          },
          {
            path: 'edit/:id',
            element: <EditAuthor />,
          },
        ],
      },
      {
        path: 'pages',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Pages />,
          },
          {
            path: 'create',
            element: <CreatePage />,
          },
          {
            path: 'edit/:id',
            element: <EditPage />,
          },
        ],
      },
      {
        path: 'models',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <ListProductModel />,
          },
          {
            path: 'create',
            element: <CreateProductModel />,
          },
          {
            path: 'edit/:id',
            element: <EditProductModel />,
          },
        ],
      },
      {
        path: 'collections',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <ListCollection />,
          },
          {
            path: 'create',
            element: <CreateCollection />,
          },
          {
            path: 'edit/:id',
            element: <EditCollection />,
          },
        ],
      },
      {
        path: 'tags',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <TasgList />,
          },
          {
            path: 'create',
            element: <CreateTag />,
          },
          {
            path: 'edit/:id',
            element: <EditTag />,
          },
        ],
      },
      {
        path: 'organizations',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Organization />,
          },
          {
            path: 'create',
            element: <CreateOrganization />,
          },
          {
            path: 'edit/:id',
            element: <EditOrganization />,
          },
        ],
      },
    ],
  },
]);
