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
	return string.match(/^[0-9]{4}$/) !== null;
}
