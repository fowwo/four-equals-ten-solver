import solve from "./solve.js";
import { listExpressions, setSolutionCount } from "./display.js";

const numberInput = document.getElementById("number");
const operatorInputs = document.getElementById("operations").children;

numberInput.onkeydown = handleInput;
numberInput.onchange = () => {
	if (isFourDigits(numberInput.value)) {
		numberInput.setAttribute("data-value", numberInput.value);
		const solutions = solve(numberInput.value, getOperations());
		listExpressions(solutions);
		setSolutionCount(solutions.length);
		numberInput.blur();
	} else {
		// Reset to the previous value if invalid.
		numberInput.value = numberInput.getAttribute("data-value");
	}
};

for (const operator of operatorInputs) {
	operator.onchange = () => {
		if (!isFourDigits(numberInput.value)) return;

		const solutions = solve(numberInput.value, getOperations());
		listExpressions(solutions);
		setSolutionCount(solutions.length);
	}
}

/**
 * Restricts the input to digits.
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {Boolean} Whether or not the key is a digit.
 */
function handleInput(event) {
	const key = event.keyCode;
	return !(
		   (key >= 48 && key <= 57)  // 0 - 9
		|| (key >= 96 && key <= 105) // 0 - 9 (Number Pad)
	) ? inputFilter(event) : true;
}

/**
 * Restricts the input to certain keys that can edit text input.
 * - Backspace
 * - Enter
 * - End
 * - Home
 * - Arrow Keys
 * - Delete
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {Boolean} Whether or not the key passes the filter.
 */
function inputFilter(event) {
	const key = event.keyCode;
	if (!(
		   key === 8                // Backspace
		|| key === 9                // Tab
		|| key === 13               // Enter
		|| key === 35               // End
		|| key === 36               // Home
		|| (key >= 37 && key <= 40) // Arrow Keys
		|| key === 46               // Delete
	)) {
		event.preventDefault();
		return false;
	}
	return true;
}

/**
 * Checks if the given string consists of four digits.
 * @param {String} string - A string.
 * @returns {Boolean} Whether or not the string consists of four digits.
 */
function isFourDigits(string) {
	return /^[0-9]{4}$/.test(string);
}

/**
 * Returns a list of all selected operations.
 * @returns {String[]} The selected operations.
 */
function getOperations() {
	const [ addition, subtraction, multiplication, division ] = operatorInputs;
	return [
		[ addition, "+" ],
		[ subtraction, "-" ],
		[ multiplication, "*" ],
		[ division, "/" ]
	].filter(x => x[0].checked).map(x => x[1]);
}
