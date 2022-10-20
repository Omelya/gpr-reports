import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from "./container/Main";
import Involvement, {action as sendReportAction} from "./container/content/Involvement";
import Report from "./container/content/Report";
import Overview, {loader as involvementLoader} from "./container/content/Overview";
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Main/>
            },
            {
                path: "/involvement",
                element: <Involvement/>,
                action: sendReportAction
            },
            {
                path: "/report",
                element: <Report/>,
            },
            {
                path: "/overview",
                element: <Overview/>,
                loader: involvementLoader
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
