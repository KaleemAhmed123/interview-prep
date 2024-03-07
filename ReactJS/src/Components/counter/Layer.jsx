import { useState } from "react";
import Counter from "./Counter";

export default function App() {
	const [show, setShow] = useState(true);
	const toggle = () => setShow(!show);

	return (
		<div className="App">
			<button
				onClick={toggle}
				className={`btn btn-show ${show ? "active" : ""}`}
			>
				{show ? "hide" : "show"}
			</button>
			{show && <Counter />}
		</div>
	);
}
