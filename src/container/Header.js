import {
    Link
} from "react-router-dom";
import logo from '../logo.svg.png';
import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import {setToken} from "../helpers/token/token";

function Header() {
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()

    return (
        <div className='bg-gray-400 rounded flex place-items-center justify-between'>
            <div className='p-2'>
                <Link to='/'>
                    <img className='max-h-14' src={logo} alt='logo'/>
                </Link>
            </div>
            {
                isAuthenticated() &&
                <>
                    <div className='flex flex-wrap content-center'>
                        <div className='p-2'>
                            <Link to='/involvement'>
                                Внести дані по виїзду
                            </Link>
                        </div>
                        <div className='p-2'>
                            <Link to='/report'>
                                Звіт
                            </Link>
                        </div>
                        <div className='p-2'>
                            <Link to='/overview'>
                                Загальні відомості
                            </Link>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='p-2'>
                            <Link to='/my-page'>
                                Мій профіль
                            </Link>
                        </div>
                        <div className='p-2'>
                            <button onClick={() => {
                                signOut();
                                setToken();
                            }}>Вийти</button>
                        </div>
                    </div>
                </>
            }
            {
                !isAuthenticated() &&
                <div className='flex'>
                    <div className='p-2'>
                        <Link to='/signin'>
                            Зареєструватися
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link to='/login'>
                            Увійти
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default Header
