import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./redux/store";
import Main from "./container/Main";
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import Report from "./container/content/Report/Report";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {cleanUpInvolvement, fetchInvolvement} from "./redux/reducer/involvementReducer";
import Involvement, {action as sendReportAction} from "./container/content/Involvement/Involvement";
import Overview, {loader as involvementsLoader, action as editInvolvementAction} from "./container/content/Overview/Overview";

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
                element: <Involvement action={'create'}/>,
                action: sendReportAction,
                loader: () => {
                    store.dispatch(cleanUpInvolvement([]))
                }
            },
            {
                path: "/involvement/:involvementId/edit",
                element: <Involvement action={'edit'}/>,
                action: sendReportAction,
                loader: ({params}) => {
                    store.dispatch(fetchInvolvement(params.involvementId))
                }
            },
            {
                path: "/report",
                element: <Report/>
            },
            {
                path: "/overview",
                element: <Overview/>,
                loader: involvementsLoader,
                action: editInvolvementAction
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
