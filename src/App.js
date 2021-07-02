import React, { useContext } from 'react';
import ToDo from './components/todo/todo';
import NavBar from './components/todo/navigation';
import { If, Else, Then } from 'react-if';
import Auth from './components/auth/auth.js';
import SettingProvider from './components/context/setting';
import { LoginContext } from './components/auth/setting';


const EditLink = () => {
	return (
		<Auth capability="update">
			<span>Edit</span>
		</Auth>
	);
};

const DeleteLink = () => {
	return (
		<Auth capability="delete">
			<span>Delete</span>
		</Auth>
	);
};
const App = () => {

	const loginContext = useContext(LoginContext);
	return (
		<>
			<NavBar />
			<EditLink />
			<DeleteLink />
			<If condition={loginContext.loggedIn}>
				<Then>
					<SettingProvider>
						<ToDo />
					</SettingProvider>
				</Then>
				<Else>
					<div></div>
				</Else>
			</If>
			
		</>
	);

}

export default App;