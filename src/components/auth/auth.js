import React, { useContext } from 'react';
import { LoginContext } from './setting';
import { If } from 'react-if';

const Auth = (props) => {
	const loginContext = useContext(LoginContext);
	let render = false;
	try {
		render =
			loginContext.loggedIn && props.capability
				? loginContext.user.capabilities.includes(props.capability)
				: false;
	} catch (error) {
		console.log('NOT AUTHORIZED', error.message);
	}
	return <If condition={render}>{props.children}</If>;
};

export default Auth;