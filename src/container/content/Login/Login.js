import {Form, Navigate, useActionData} from "react-router-dom";
import Input from "../Signin/Input/Input";
import {useEffect} from "react";
import {authUser} from "../../http/sendData";
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {setToken} from "../../../helpers/token/token";

export async function action({request}) {
    const formData = await request.formData();

    return await authUser(formData)
        .then(response => {
            return response.data;
        })
}

export default () => {
    const userData = useActionData();
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if(userData) {
            const expiresMinutes = Math.floor(
                Date.parse(userData.data.attributes.token.expires_at) / 1000 / 60
            );

            signIn(
                {
                    token: userData.data.attributes.token.access_token,
                    expiresIn: expiresMinutes,
                    tokenType: 'Bearer',
                    authState: userData.data.attributes.user
                }
            );

            setToken(userData.data.attributes.token.access_token);
        }
    }, [userData])

    return (
        <>
            {
                isAuth() && <Navigate to={'/involvement'}/>
            }
            <div className='flex flex-col place-items-center'>
                <div>
                    <h1 className='font-serif font-bold text-2xl mt-5'>
                        Log in
                    </h1>
                </div>
                <Form method='post'>
                    <Input
                        id='username'
                        name='Email'
                        type='email'
                        isEmpty={true}
                    />
                    <Input
                        id='password'
                        name='Password'
                        type='password'
                        isEmpty={true}
                        minLength={8}
                    />
                    <button className='m-2 p-4 rounded hover:bg-gray-100 border-gray-400 bg-gray-400' type='submit'>
                        Log in
                    </button>
                </Form>
            </div>
        </>
    )
}
