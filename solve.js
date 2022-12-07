function solve(numbers, operations = [ "+", "-", "*", "/" ]) {

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
		}
	
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
	return expressions.filter((expression) => eval(expression) === 10);
}
