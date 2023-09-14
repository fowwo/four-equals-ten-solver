/**
 * Formats and displays the given expressions.
 * @param {String[]} expressions - The expressions to display.
 */
export function listExpressions(expressions) {
	const ul = document.querySelector("ul");
	ul.innerHTML = "";
	if (expressions.length === 0) return;

	for (const solution of expressions) {
		const li = document.createElement("li");
		let string = "";
		for (const c of solution.replace(/\*/g, "×").replace(/\//g, "÷")) {
			const names = { "+": "addition", "-": "subtraction", "×": "multiplication", "÷": "division" };
			if (c in names) {
				const span = document.createElement("span");
				span.classList.add(names[c]);
				span.style.color = `var(--${names[c]})`;
				span.innerText = c;
				string += span.outerHTML;
				li.classList.add(names[c]);
			} else {
				string += c;
			}
		}
		li.innerHTML = string;
		ul.appendChild(li);
	}
}

/**
 * Displays the number of visible solutions.
 */
export function updateSolutionCount() {
	const message = document.querySelector("p");
	const count = countVisibleSolutions();
	if (count > 0) {
		message.innerText = `${count} solution${count === 1 ? "" : "s"} found`;
		message.style.color = "#8f8";
	} else {
		message.innerText = "No solutions found";
		message.style.color = "#f88";
	}
}

/**
 * Counts the number of visible solutions.
 */
function countVisibleSolutions() {
	const solutions = document.querySelector("ul").children;
	if (solutions.length === 0) return 0;

	const operatorInputs = [ ...document.getElementById("operations").children ];
	const illegalOperations = operatorInputs.filter(x => !x.checked).map(x => x.id);
	if (illegalOperations.length === 0) return solutions.length;

	let count = 0;
	for (const solution of solutions) {
		if ([ ...solution.classList ].every(operation => !illegalOperations.includes(operation))) {
			count++;
		}
	}
	return count;
}
