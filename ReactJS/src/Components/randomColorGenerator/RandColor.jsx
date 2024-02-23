import React, { useState, useEffect } from "react";
import "./style.css";

const RandColor = () => {
	const [color, setColor] = useState("");
	const [isHex, setIsHex] = useState(false);

	const hexValues = [
		"0",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
	];
	const randomUtil = (size) => {
		return Math.floor(Math.random() * size);
	};

	const hexGenerator = () => {
		let str = "#";
		for (let i = 0; i < 6; i++) {
			str += hexValues[randomUtil(15)];
		}
		setColor(str);
	};

	const rgbGenerator = () => {
		let red = randomUtil(255);
		let green = randomUtil(255);
		let blue = randomUtil(255);

		let rgb = `rgb(${red},${green},${blue})`;
		setColor(rgb);
	};

	useEffect(() => {
		if (isHex) hexGenerator();
		else rgbGenerator();
	}, [isHex]);

	return (
		<div className="body" style={{ backgroundColor: color }}>
			<div className="wrapper">
				<div className="btn-container">
					<button onClick={() => setIsHex(true)}>HEX Color</button>
					<button onClick={() => setIsHex(false)}>RGB Color</button>
					<button onClick={() => (isHex ? hexGenerator() : rgbGenerator())}>
						Generate Color
					</button>
				</div>
				<div className="color-box">
					<span style={{ display: "block" }}>
						{isHex ? "Hex color " : "RGB color"}
					</span>
					<span>{color}</span>
				</div>
			</div>
		</div>
	);
};

export default RandColor;
