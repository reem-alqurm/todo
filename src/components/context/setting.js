import React, { useState } from 'react';

export const SettingContext = React.createContext();

function SettingProvider(props) {
    const [list, setList] = useState([]);
	const [items, setItems] = useState([]);
	const [itemsNum, setItemsNum] = useState(3);
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(0);
	const [sortType, setSortType] = useState(false);
	const [disable, setDisable] = useState(false);


    const state = {
		list,
		setList,
		items,
		setItems,
		itemsNum,
		setItemsNum,
		sortType,
		setSortType,
		page,
		setPage,
		offset,
		setOffset,
		disable,
		setDisable,
	};

    return (
        <SettingContext.Provider value={state} >
            {props.children}
        </SettingContext.Provider>
    )
}

export default SettingProvider;