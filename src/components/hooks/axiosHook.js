import axios from 'axios';
import {SettingContext} from '../context/setting'
import {useContext} from 'react';
import { LoginContext } from './../auth/setting';




const useAjax = (url) => {

	const settingContext = useContext(SettingContext)
	const loginContext = useContext(LoginContext);

	let config = {
		headers: {
			mode: 'cors',
			cache: 'no-cache',
			'Content-Type': 'application/json',
		},
	};

	const fetchingData = async (id, method = 'get', item) => {
		if (method === 'get') {
			const results = await axios[method](url, config);
			settingContext.setItems([...results.data.results]);
			settingContext.setList([...results.data.results]);
		}

		if (
			method === 'post' &&
			loginContext.user.user.capabilities.includes('create')
		) {
			item.due = new Date();
			const results = await axios[method](url, item, config);
			settingContext.setItems([...settingContext.items, results.data]);
		}

		if (
			method === 'put' &&
			loginContext.user.user.capabilities.includes('update')
		) {
			let item = settingContext.items.filter((i) => i._id === id)[0] || {};

			if (item._id) {
				item.complete = !item.complete;
				const results = await axios[method](`${url}/${id}`, item, config);
				settingContext.setItems(
					settingContext.items.map((listItem) =>
						listItem._id === item._id ? results.data : listItem,
					),
				);
			}
		}

		if (
			method === 'delete' &&
			loginContext.user.user.capabilities.includes('delete')
		) {
			let item = settingContext.items.find((i) => i._id === id) || {};

			if (item._id) {
				const results = await axios[method](`${url}/${id}`, config);
				settingContext.setItems(
					settingContext.items.filter(
						(listItem) => listItem._id !== results.data._id,
					),
				);
			}
		}
	}
	return fetchingData;
};

export default useAjax;