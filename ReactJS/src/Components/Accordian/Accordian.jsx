import React, { useState } from "react";
import "./style.css";
import data from "./data";

const Accordion = () => {
	const [selected, setSelected] = useState(null);
	const [isMultiOn, setisMultiOn] = useState(false);
	const [multiArray, setMultiArray] = useState([]);

	const handleMulti = () => {
		// to stop prev values
		setMultiArray([]);
		setSelected(null);

		setisMultiOn(!isMultiOn);
	};

	const handleSingle = (currId) => {
		setSelected(currId === selected ? null : currId);
	};

	const handleMultiple = (currId) => {
		let copy = [...multiArray];
		let idx = multiArray.indexOf(currId);

		if (idx === -1) {
			copy.push(currId);
			setMultiArray(copy);
		} else {
			copy.splice(idx, 1);
			setMultiArray(copy);
		}
	};

	console.log(isMultiOn);
	console.log(selected, multiArray);

	return (
		<div className="wrapper">
			<div className="accordion">
				<button onClick={handleMulti}>Enable Multi Select</button>
				<span className="on">{isMultiOn ? "ON" : "OFF "}</span>
				{data?.map((elm) => (
					<div className="item" key={elm.id}>
						<div
							onClick={
								isMultiOn
									? () => handleMultiple(elm.id)
									: () => handleSingle(elm.id)
							}
							className="header"
						>
							<h2>{elm.question}</h2>
							<span>+</span>
						</div>

						{isMultiOn &&
							multiArray.map(
								(id) => id === elm.id && <p key={id}>{elm.answer}</p>
							)}
						{!isMultiOn && selected === elm.id && (
							<p key={elm.id}>{elm.answer}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Accordion;
