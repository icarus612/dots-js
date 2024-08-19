import anime from 'animejs';

const createDelay = (target, time) => 3.5 * time / target.children.length * n;

const findLinearSplit = (e) => (e[1] + e[0]) / 2;

const findTarget = (po, el) => {
	let start = document.querySelector(po).getBoundingClientRect()
	let element = el.getBoundingClientRect()
	let x = ((start.left + start.right) / 2 - (element.left + element.right) / 2);
	let y = ((start.top + start.bottom) / 2 - (element.top + element.bottom) / 2);
	return [x, y]
}


const translate = ({
	location,
	time,
	curve,
	isSplit = false
}) => {
	let [start, end] = location
	let translation = {
		value: location,
		duration: time * 3,
		easing: "linear",
	}

	if (isSplit) {
		if (curve === "linear") {
			translation.duration = time * 1.5;
		} else {
			const toTitle = curve.charAt(0).toUpperCase() + curve.slice(1);
			translation.easing = `easeInOut${toTitle}`;
			translation.delay = time * 1.5;
		}
	} else {
		if (curve === "linear") {
			translation.duration = time;
			translation.delay = time * 1.5;
		} else {
			const toTitle = curve.charAt(0).toUpperCase() + curve.slice(1);
			translation.easing = `easeInOut${toTitle}`;
		}

	}
	return translation;
}



const fillColor = ({ target, time, svg }) => {
	let el = svg.children
	for (let i = 0; i < svg.children.length; i++) {
		target[i].style.fill = e[0];
		target[i].style.backgroundColor = e[0];
	}

	let obj = [
		{
			value: e[0],
			duration: (time * 1.5) / e.length,
			easing: "linear",
			delay: anime.stagger(t / 2)
		},
	]

	for (let i = 1; i < e.length; i++) {
		obj.push({
			value: e[i],
			duration: (time * 1.5) / e.length,
			easing: "linear",
			delay: time / e.length
		});
	}
	return obj;
}

const animate = (e, t, svg, mvX, mvY, crv, clr, d) => {

	let animation = anime.timeline({

	}).add({
		targets: svg.children[e],
		translateX: translate(mvX, t, crv, ax === "x"),
		translateY: translate(mvY, t, crv, ax === "y"),
		fill: fillColor(clr, t, svg),
		backgroundColor: fillColor(clr, t, svg),
		complete: function (anim) {
			try {
				animate.reset()
				animate(e, t, svg, mvX, mvY, crv, clr, 0)
			} catch (err) {
				console.error(err)
			}
		},
	}, d);

	return animation;

}

const loopThrough = (e) => {
	for (let i = 0; i < e.children.length; i++) {
		let distX = [];
		let distY = [];
		if (typeof params.start === "string") {
			let start = findTarget(params.start, e.children[i]);
			distX[0] = start[0];
			distY[0] = start[1];
		} else {
			distX[0] = params.start[0];
			distY[0] = params.start[1];
		}
		if (typeof params.end === "string") {
			let end = findTarget(params.end, e.children[i]);
			distX[1] = end[0];
			distY[1] = end[1];
		} else {
			distX[1] = params.end[0];
			distY[1] = params.end[1];
		}
		animation(i, params.time, e, distX, distY, params.curve, params.color, createLoopDelay(e, params.time, i))
	}
}

export const dots = (params) => {
	const {
		targets,
		curve,
		time,
	} = params || {}

	if (typeof params.target.length == 'undefined') {
		loopThrough(params.target)
	} else {
		for (let j = 0; j < params.target.length; j++) {
			loopThrough(params.target[j])
		}
	}
}
