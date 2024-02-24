import React, { useState } from "react";
import "./box.css";
const BOX = [1, 2, 3, 4, 0, -1, 7, 8, 9];

const BoxClicker = () => {
	const [boxQueue, setBoxQueue] = useState([]);

	const changeColor = (i) => {
		setBoxQueue(...boxQueue, i);
		if (boxQueue === 7) {
		}
	};

	const generateGrid = () => {
		return BOX.map((i) => {
			if (i !== 0 && i !== -1) {
				return (
					<div onClick={() => changeColor(i)} key={i} className="box "></div>
				);
			}
			return <div key={i}></div>;
		});
	};

	return (
		<div className="outer">
			<div className="grid">{generateGrid()}</div>
		</div>
	);
};

export default BoxClicker;
