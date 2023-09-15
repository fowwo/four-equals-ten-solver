/**
 * Finds all solutions for the given numbers and allowed operations.
 * @param {Number[]} numbers - An array containing four numbers.
 * @param {String[]} operations - An array of valid operations. `[ "+", "-", "*", "/" ]` by default.
 * @returns {String[]} An array of all expressions that evaluate to 10.
 */
export default function solve(numbers, operations = [ "+", "-", "*", "/" ]) {

	function permutations(list) {
		const add = (permutations, item) => {
			const list = [];
			for (var perm of permutations) {
				for (var j = 0; j <= perm.length; j++) {
					const copy = perm.slice();
					copy.splice(j, 0, item);
					list.push(copy);
				}
			}
			return list;
		};

		let permutations = [[ list[0] ]];
		for (var i = 1; i < list.length; i++) {
			permutations = add(permutations, list[i]);
		}
		return permutations;
	}

	// Number permutations
	const nPermutations = new Set(permutations(numbers).map(x => x.join("")));

	// Operator permutations (with repetition)
	let oPermutations = operations.map(x => [ x ]);
	for (let i = 0; i < 2; i++) {
		const temp = [];
		for (const perm of oPermutations) {
			for (const x of operations) {
				const copy = perm.slice();
				copy.push(x);
				temp.push(copy);
			}
		}
		oPermutations = temp;
	}

	// Expressions (without parentheses)
	const iPermutations = [];
	for (const nPerm of nPermutations) {
		for (const oPerm of oPermutations) {
			let string = "";
			for (let i = 0; i < 7; i++) {
				string += i % 2 ? oPerm[(i - 1) / 2] : nPerm[i / 2];
			}
			iPermutations.push(string);
		}
	}

	// Parentheses
	const pPermutations = [];
	for (const a of [ 0, 2, 4 ]) {
		for (const b of [ 3, 5, 7 ]) {
			if (b - a > 1 && b - a !== 7) pPermutations.push([ a, b ]);
		}
	}

	// Expressions
	const expressions = [ ...iPermutations ];
	for (const iPerm of iPermutations) {
		for (const pPerm of pPermutations) {
			let string = iPerm;
			const [ a, b ] = pPerm;
			string = `${string.slice(0, a)}(${string.slice(a)}`;
			string = `${string.slice(0, b + 1)})${string.slice(b + 1)}`;
			expressions.push(string);
		}
	}

	// Evaluate
	return expressions.filter((expression) => {
		const value = evaluate(expression);
		if (!value) return false;
		const [ a, b ] = value;
		return a === b * 10;
	});
}

/**
 * Evaluates the given expression.
 * @param {String} expression - The expression to evaluate.
 * @returns {[ Number, Number ] | null} The numerator and denominator of the evaluation,
 * or `null` if division by zero occurs.
 */
function evaluate(expression) {
	let terms, operators;

	// Evaluate parenthesis first (if any)
	const x = expression.indexOf("(");
	const y = expression.indexOf(")");
	if (x !== y) {
		const value = evaluate(expression.slice(x + 1, y));
		if (!value) return null;

		const left = expression.slice(0, x);
		const right = expression.slice(y + 1);
		const leftTerms = (left.match(/[0-9]+/g) ?? []).map(x => [ parseInt(x), 1 ]);
		const leftOperators = left.match(/[\+\-\*\/]/g) ?? [];
		const rightTerms = (right.match(/[0-9]+/g) ?? []).map(x => [ parseInt(x), 1 ]);
		const rightOperators = right.match(/[\+\-\*\/]/g) ?? [];

		terms = [ ...leftTerms, value, ...rightTerms ];
		operators = leftOperators.concat(rightOperators);
	} else {
		terms = expression.match(/[0-9]+/g).map(x => [ parseInt(x), 1 ]);
		operators = expression.match(/[\+\-\*\/]/g);
	}

	// Multiplication and division
	for (let i = 0; i < operators.length; i++) {
		let [ xa, xb ] = terms[i];
		let [ ya, yb ] = terms[i + 1];
		switch (operators[i]) {
			case "/":
				if (ya === 0) return null;
				[ ya, yb ] = [ yb, ya ];
			case "*":
				terms[i] = [ xa * ya, xb * yb ];
				terms.splice(i + 1, 1);
				operators.splice(i, 1);
				i--;
		}
	}

	// Addition and subtraction
	let [ a, b ] = terms[0];
	for (const [ i, operator ] of operators.entries()) {
		let [ x, y ] = terms[i + 1];
		if (operator === "-") x *= -1;
		a = a * y + b * x;
		b *= y;
	}

	return [ a, b ];
}
