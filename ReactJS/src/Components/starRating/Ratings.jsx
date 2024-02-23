import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./style.css";

const Ratings = () => {
	const [hover, setHover] = useState(0);
	const [star, setStar] = useState(0);

	console.log(hover, star);

	return (
		<div className="main">
			{[1, 2, 3, 4, 5].map((num) => (
				<FaStar
					className={num <= (hover || star) ? "active" : ""}
					key={num}
					onClick={() => setStar(num)}
					onMouseEnter={() => setHover(num)}
					onMouseLeave={() => setHover(star)}
					size={40}
				/>
			))}
		</div>
	);
};

export default Ratings;
