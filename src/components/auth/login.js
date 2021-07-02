import React, { useContext, useState } from 'react';
import { If, Else, Then } from 'react-if';
import { LoginContext } from './setting';

const Login = () => {
    const loginContext = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function changeUsername(e) {
        setUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        loginContext.login(username, password);
    }

    return (
        <If condition={loginContext.loggedIn}>
            <Then>
                <button style={{borderRadius :'50px',width:'10%',height:'40px' ,marginLeft:'80%'}} onClick={loginContext.logout}>Log Out</button>
            </Then>
            <Else>
                <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Enter Username" onChange={changeUsername}
					 style={{borderRadius :'50px' , width:'30%'}}/>
					<input type="password"	name="password" placeholder="Enter password" onChange={changePassword}  style={{borderRadius :'50px' , width:'30%'}}/>

                    <button style={{borderRadius :'50px',width:'18%',height:'40px' }}>Signin</button>
                </form>
            </Else>
        </If>
    );
};

export default Login;