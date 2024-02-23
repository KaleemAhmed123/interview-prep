import React, { useState, useEffect } from "react";
import "./style.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const url = "https://picsum.photos/v2/list?page=1&limit=5";

const Slider = () => {
	const [images, setImages] = useState([]);
	const [currSlide, setCurrSlide] = useState(0);
	const [err, setErr] = useState("");

	const handleNext = () => {
		setCurrSlide(currSlide === images.length - 1 ? 0 : currSlide + 1);
	};

	const handlePrev = () => {
		setCurrSlide(currSlide === 0 ? images.length - 1 : currSlide - 1);
	};

	async function fetchImage(url) {
		try {
			const resp = await fetch(url);
			const data = await resp.json();

			if (data) setImages(data);
		} catch (error) {
			setErr(error.message);
		}
	}

	useEffect(() => {
		if (url) fetchImage(url);
	}, []);

	if (err) {
		return <p>{err}</p>;
	}

	return (
		<div className="wrapper">
			<div className="container">
				<FaArrowCircleLeft
					className="leftIcon"
					onClick={handlePrev}
					size={35}
				/>
				{images?.map((src, idx) => (
					<img
						className={idx !== currSlide ? "hide" : ""}
						src={src.download_url}
						key={src.id}
						alt={`Slide ${idx}`}
					/>
				))}
				<FaArrowCircleRight
					className="rightIcon"
					onClick={handleNext}
					size={35}
				/>
				<div className="indicator-container">
					{images.map((src, idx) => (
						<button
							key={idx}
							className={`indicator ${idx === currSlide ? "active" : ""}`}
							onClick={() => setCurrSlide(idx)}
						></button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
