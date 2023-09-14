const stars = 100;
const peaks = 7;

// Stars
const starSVG = document.getElementById("stars");

for (let i = 0; i < stars; i++) {
	const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	const cy = Math.random();
	star.setAttribute("fill", `rgba(255, 255, 255, ${1 - cy})`);
	star.setAttribute("cx", Math.random());
	star.setAttribute("cy", cy);
	star.setAttribute("r", 0.001);
	starSVG.appendChild(star);
}

// Mountains
const mountainSVG = document.getElementById("mountains");
const backgroundMountain = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
const foregroundMountain = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

const backgroundPoints = [ "0,1", "0,0.7" ];
const foregroundPoints = [ "0,1", "0,0.75" ];
for (let i = 0; i < peaks; i++) {
	backgroundPoints.push(`${(i + 1) / (peaks + 1)},${0.7 * Math.random()}`);
	foregroundPoints.push(`${(i + 1) / (peaks + 1)},${0.7 * Math.random() + 0.05}`);
}
backgroundPoints.push("1,0.7", "1,1");
foregroundPoints.push("1,0.75", "1,1");

backgroundMountain.setAttribute("fill", "var(--mountain-background)");
foregroundMountain.setAttribute("fill", "var(--mountain-foreground)");
backgroundMountain.setAttribute("points", backgroundPoints.join(" "));
foregroundMountain.setAttribute("points", foregroundPoints.join(" "));
mountainSVG.appendChild(backgroundMountain);
mountainSVG.appendChild(foregroundMountain);
