import "./App.css";
import Accordian from "./Components/Accordian/Accordian";
import BoxClicker from "./Components/boxClicker/BoxClicker";
import Explorer from "./Components/file-explorer/Components/Explorer";
import RandColor from "./Components/randomColorGenerator/RandColor";
import Slider from "./Components/slider/Slider";
import Ratings from "./Components/starRating/Ratings";
import Counter from "./Components/counter/Layer";
function App() {
	return (
		<div>
			{/* <Accordian /> */}
			{/* <RandColor /> */}
			{/* <Ratings count={10} /> */}
			{/* <Slider /> */}
			{/* <BoxClicker /> */}
			{/* <Explorer /> */}
			<Counter />
		</div>
	);
}

export default App;
