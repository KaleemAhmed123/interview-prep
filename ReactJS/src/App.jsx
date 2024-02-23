import "./App.css";
import Accordian from "./Components/Accordian/Accordian";
import RandColor from "./Components/randomColorGenerator/RandColor";
import Slider from "./Components/slider/Slider";
import Ratings from "./Components/starRating/Ratings";
function App() {
	return (
		<div>
			{/* <Accordian /> */}
			{/* <RandColor /> */}
			{/* <Ratings count={10} /> */}
			<Slider />
		</div>
	);
}

export default App;
