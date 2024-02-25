import React from "react";
import "./style.css";
import data from "../constants/data.js";
import Items from "./Items.jsx";
import useTree from "../hooks/useTree.js";

const Explorer = () => {
	const { insertNode, deleteNode } = useTree(data);

	return (
		<div className="container">
			<Items data={data} insertNew={insertNode} deleteCurr={deleteNode} />
		</div>
	);
};

export default Explorer;
