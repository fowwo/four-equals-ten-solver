/**
 * Formats and displays the given expressions.
 * @param {String[]} expressions - The expressions to display.
 */
export function listExpressions(expressions) {
	const ul = document.querySelector("ul");
	ul.innerHTML = "";
	if (expressions.length === 0) return;

	for (const solution of expressions) {
		let string = "";
		for (const c of solution.replace(/\*/g, "×").replace(/\//g, "÷")) {
			const names = { "+": "addition", "-": "subtraction", "×": "multiplication", "÷": "division" };
			string += c in names ? `<span class="operator" style="color:var(--${names[c]})">${c}</span>` : c;
		}
		const li = document.createElement("li");
		li.innerHTML = string;
		ul.appendChild(li);
	}
}

/**
 * Displays the given number as the solution count.
 * @param {Number} x - The number to display.
 */
export function setSolutionCount(x) {
	const message = document.querySelector("p");
	if (x > 0) {
		message.innerText = `${x} solution${x === 1 ? "" : "s"} found`;
		message.style.color = "#8f8";
	} else {
		message.innerText = "No solutions found";
		message.style.color = "#f88";
	}
}
