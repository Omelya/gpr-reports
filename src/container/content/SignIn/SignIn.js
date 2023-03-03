import {Form, Navigate, useActionData} from "react-router-dom";
import Input from "./Input/Input";
import convertDate from "../../../helpers/date/convertDate";
import InputSelect from "./Input/InputSelect";
import React, {useEffect} from "react";
import {sendUser} from "../../http/sendData";
import {useIsAuthenticated, useSignIn} from 'react-auth-kit';
import {setToken} from "../../../helpers/token/token";
import {Button} from "@mui/material";
import Container from "@mui/material/Container";

export async function action({request}) {
    const formData = await request.formData();

    return sendUser(formData)
        .then(response => {
            return response.data;
        });
}

const SignIn = () => {
    const userData = useActionData();
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();
    const date = convertDate(Date.now());

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
                        Sign in
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
                    <Input
                        id='password_confirmation'
                        name='Confirm password'
                        isEmpty={true}
                        minLength={8}
                    />
                    <Input
                        id='first_name'
                        name='First name'
                        isEmpty={true}
                    />
                    <Input
                        id='last_name'
                        name='Last name'
                        isEmpty={true}
                    />
                    <Input
                        id='father_name'
                        name='Father name'
                        isEmpty={true}
                    />
                    <Input
                        id='birthday'
                        name='Birthday'
                        type='date'
                        value={date}
                        isEmpty={true}
                    />
                    <InputSelect
                        id='position'
                        name='Position'
                        isEmpty={true}
                    />
                    <InputSelect
                        id='rank'
                        name='Rank'
                        isEmpty={true}
                    />
                    <Container>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large">
                            Sign in
                        </Button>
                    </Container>
                </Form>
            </div>
        </>
    )
}

export default SignIn;
