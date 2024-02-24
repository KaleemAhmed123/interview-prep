// for only one event listener
const container = document.querySelector("#box-container");
const boxes = document.querySelectorAll(".box");

let queue = [];

container.addEventListener("click", function (e) {
	let idx = e.target.dataset.index;

	if (idx) {
		queue.push(idx);
		// box[idx] will return that pertcular box
		boxes[idx].classList.add("active");
	}

	if (queue.length === 7) {
		let timer = 1;

		while (queue.length > 0) {
			let idx = queue.shift();
			setTimeout(() => {
				boxes[idx].classList.remove("active");
			}, timer * 1000);
			timer++;
		}
	}
});
