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
import {fetchInvolvement} from "./redux/reducer/involvementReducer";
import Involvement, {action as sendReportAction} from "./container/content/Involvement/Involvement";
import Overview, {loader as involvementsLoader, action as editInvolvementAction} from "./container/content/Overview/Overview";
import Login, {action as authUser} from "./container/content/Login/Login";
import SignIn, {action as userCreateAction} from "./container/content/SignIn/SignIn";
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
                element: <RequireAuth loginPath={'/login'}><Involvement action={'create'}/></RequireAuth>,
                action: sendReportAction,
            },
            {
                path: "/involvement/:involvementId/edit",
                element: <RequireAuth loginPath={'/login'}><Involvement action={'edit'}/></RequireAuth>,
                action: sendReportAction,
                loader: ({params}) => {
                    store.dispatch(fetchInvolvement(params.involvementId))
                    return true;
                }
            },
            {
                path: "/report",
                element: <RequireAuth loginPath={'/login'}><Report/></RequireAuth>
            },
            {
                path: "/overview",
                element: <RequireAuth loginPath={'/login'}><Overview/></RequireAuth>,
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
                element: <SignIn/>,
                action: userCreateAction
            },
            {
                path: "/my-page",
                element: <RequireAuth loginPath={'/login'}><MyPage/></RequireAuth>,
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
