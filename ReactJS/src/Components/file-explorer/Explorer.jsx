import React from "react";
import "./style.css";
import data from "./data.js";
import Items from "./Items.jsx";

const Explorer = () => {
	return (
		<div>
			<Items data={data} />
		</div>
	);
};

export default Explorer;
