import ClassifyPage from "../page/ClassifyPage";
import CountPage from "../page/CountPage";
import HomePage from "../page/HomePage";
import MainPage from "../page/MainPage";
import { createBrowserRouter, redirect } from "react-router";

const routes = [
  {
    path: '/',
    Component: MainPage,
    children: [
      {
        index: true,
        loader: () => redirect('/home'),
      },
      {
        path: 'home',
        Component: HomePage
      },
      {
        path: 'count',
        Component: CountPage
      },
      {
        path: 'classify',
        Component: ClassifyPage
      }
    ]
  }
];

export default createBrowserRouter(routes);
