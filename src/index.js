import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./redux/store";
import Main from "./container/Main";
import {Provider} from "react-redux";
import {RequireAuth} from 'react-auth-kit'
import reportWebVitals from './reportWebVitals';
import Report from "./container/content/Report/Report";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {cleanUpInvolvement, fetchInvolvement} from "./redux/reducer/involvementReducer";
import Involvement, {action as sendReportAction} from "./container/content/Involvement/Involvement";
import Overview, {loader as involvementsLoader, action as editInvolvementAction} from "./container/content/Overview/Overview";
import Login, {action as authUser} from "./container/content/Login/Login";
import Signin, {action as userCreateAction} from "./container/content/Signin/Signin";
import {AuthProvider} from "react-auth-kit";
import MyPage from "./container/content/MyPage/MyPage";

window.token = document.cookie.split('; ').find(item => item.startsWith('_auth'))?.split('=')[1];

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
                element: <RequireAuth loginPath={'/login'} children={<Involvement action={'create'}/>}/>,
                action: sendReportAction,
                loader: () => {
                    store.dispatch(cleanUpInvolvement([]))
                }
            },
            {
                path: "/involvement/:involvementId/edit",
                element: <RequireAuth loginPath={'/login'} children={<Involvement action={'edit'}/>}/>,
                action: sendReportAction,
                loader: ({params}) => {
                    store.dispatch(fetchInvolvement(params.involvementId))
                }
            },
            {
                path: "/report",
                element: <RequireAuth loginPath={'/login'} children={<Report/>}/>
            },
            {
                path: "/overview",
                element: <RequireAuth loginPath={'/login'} children={<Overview/>}/>,
                loader: involvementsLoader,
                action: editInvolvementAction
            },
            {
                path: "/login",
                element: <Login/>,
                action: authUser
            },
            {
                path: "/signin",
                element: <Signin/>,
                action: userCreateAction
            },
            {
                path: "/my-page",
                element: <MyPage/>,
                action: authUser
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AuthProvider
                authType = {'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "http:"}
            >
                <RouterProvider router={router}/>
            </AuthProvider>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
