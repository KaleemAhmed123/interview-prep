import React, { useState, useEffect, useRef } from "react";
import "../counter/style.css";

export default function Counter() {
	let timerId = useRef(null);
	const [count, setCount] = useState(0);
	const [start, setStart] = useState(false);

	useEffect(() => {
		if (start) {
			timerId = setInterval(() => {
				setCount((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			clearInterval(timerId);
		};
	}, [start, count]);

	return (
		<div className="container">
			<h1>count is: {count}</h1>
			<div className="btn-container">
				<button
					className={`btn btn-start ${!start ? "" : "active"}`}
					onClick={() => setStart(true)}
				>
					Start
				</button>
				<button
					className={`btn btn-stop ${start ? "" : "active"}`}
					onClick={() => {
						clearInterval(timerId);
						setStart(false);
					}}
				>
					Stop
				</button>
				<button
					className={`btn btn-reset`}
					onClick={() => {
						clearInterval(timerId);
						setCount(0);
						setStart(false);
					}}
				>
					Reset
				</button>
			</div>
			<h3 className="build-by">Build by @kaleem ahmed</h3>
		</div>
	);
}
