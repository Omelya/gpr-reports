import React from "react";
import {Form, Navigate, useActionData} from "react-router-dom";
import Input from "../SignIn/Input/Input";
import {useEffect, useState} from "react";
import {authUser} from "../../http/sendData";
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {setToken} from "../../../helpers/token/token";
import {Alert, AlertTitle, Button, Typography} from "@mui/material";
import Container from "@mui/material/Container";

export async function action({request}) {
    const formData = await request.formData();

    return await authUser(formData)
        .then(response => {
            return response.data;
        })
        .catch((error) => {
            return JSON.parse(error.request.response);
        })
}

const Login = () => {
    const userData = useActionData();
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();
    const [errorMessage, setError] = useState('');

    useEffect(() => {
        if(userData?.data) {
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

        if (userData?.message) {
            setError(userData.message);
        }
    }, [userData])

    return (
        <>
            {
                isAuth() && <Navigate to={'/involvement'}/>
            }
            <div className='flex flex-col place-items-center'>
                <Typography variant="h5" component="h5" sx={{
                    fontWeight: "bold",
                    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
                }}>
                    Log in
                </Typography>

                {
                    errorMessage &&
                    <Alert severity="error" onClose={() => {setError('')}}>
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                }

                <Form method='post'>
                    <Input
                        id='username'
                        name='Email'
                        type='email'
                        isEmpty={false}
                    />
                    <Input
                        id='password'
                        name='Password'
                        type='password'
                        isEmpty={false}
                        minLength={8}
                    />
                    <Container>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large">
                            Log in
                        </Button>
                    </Container>
                </Form>
            </div>
        </>
    )
}

export default Login;
