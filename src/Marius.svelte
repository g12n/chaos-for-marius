<script>
	import { onMount, afterUpdate } from 'svelte';
	import {createGridPts} from "./lib.js";
	import math, {mapRange,radToDeg} from 'canvas-sketch-util/math';
	import {dist,rotate,add} from 'gl-vec2';
	import pld from 'point-line-distance';

	export let canvas
	export let size=1024;

	let context
	let hue
	export	let steps = 4;
	export let name;
	export let angle = 0.5 * 2 * Math.PI;
	export let spread = 0.25;

	let x = 0;
	let y = 0;
	let cx = 0; 
	let cy = 0;
	let cw = 0; 
	let ch = 0;

	$: offset = size/12;	
	$: name = `chaos4marius-${steps}_columns-angle_${Math.round(radToDeg(angle))}-spread_${Math.round(spread*100)}-${size}x${size}`
	
	let square = (cx=100 , cy=10, size=100, rot=0) => {
		let sides = 4;
		let radius = size*Math.sqrt(2) /2;
		let step =  (2*Math.PI)/sides;
		let startRadians = (0.25*Math.PI)+ rot;
		let path = `M ${cx + radius * Math.cos(startRadians)},${cy + radius * Math.sin(startRadians)} `;
		for (let i = 0; i<= sides; i++ ){
        	const angle = step * i + startRadians;
			path += `L ${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)} `;		
		}
		path +="Z"
		return new Path2D(path)
	}

	let render = () =>{
		context = canvas.getContext('2d');
		context.fillStyle="#330011";
		context.lineWidth = size/200;
		context.fillRect(0,0,size,size);

		let boundsWidth = size-2*offset;
		let cellSize = boundsWidth/steps*0.65;
		let topLeft = [offset,offset]
		let bottomRight = [size-offset, size-offset]
		let center = [size/2, size/2];

	

		//let line = Line.fromAngle(center, angle, size);

		let a = [-size,0,0];
		rotate(a,a,angle);
		add(a,a,center)
		let b = [size,0,0];
		rotate(b,b,angle);
		add(b,b,center)

		let gridPoints = createGridPts([offset,offset,boundsWidth,boundsWidth], steps, steps, [0.5,0.5]);
		
		gridPoints.map(point =>{
			let distance = pld(point, a, b)
			let [x,y] = point;
			let distTL = dist(topLeft,point);
			let distBR = dist(topLeft,bottomRight)

			let hue = parseInt(Math.random()*40);
			hue = mapRange(distTL, 0, distBR, 0, 40, true);
			let lightness = mapRange(distTL, 0, distBR, 30, 60, true);
			context.fillStyle= `hsl(${hue}, 100%, ${lightness}%)`;
			
			let variability = mapRange(distance, 0, size*spread, 1, 0, true);			
			let rotation = mapRange(Math.random(), 0, 1, variability*0.25*-Math.PI, variability* 0.25*Math.PI, true);
			let sizeOffset=  mapRange(Math.random()*variability, 0, 1, 0, 0 , true);
			context.fill(square(x, y,cellSize+sizeOffset,rotation))
 			rotation = mapRange(Math.random(), 0, 1, variability*0.25*-Math.PI, variability* 0.25*Math.PI, true);			
			sizeOffset=  mapRange(Math.random()*variability, 0, 1, cellSize/2, cellSize/2 , true);
			context.strokeStyle= `hsla(${hue}, 100%, ${lightness+30}%,${variability})`;
			context.stroke(square(x, y,cellSize-sizeOffset,rotation))
		})
	}
	
	onMount(render)
	afterUpdate(render)

	
	function updateAngle(x,y){

		let {top, left, width, height} = canvas.getBoundingClientRect();
		let cx = left+(width/2)
		let cy = top+(height/2)

		
		let distance = dist([cx,cy],[x,y])
		spread = (1 - (distance/ (width/2))).toFixed(2)
		spread = Math.max(spread,0.05)

		angle = Math.atan2(cy - y, cx - x)
		angle = angle < 0 ? Math.PI + angle : angle
		angle = angle.toFixed(2)
	}
	
	function handleMousemove(event) {
		updateAngle(event.clientX, event.clientY)
	}

	function handleMouseup(event) {
		document.body.style.cursor='default'
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}
	
	function handleMousedown(event){
		document.body.style.cursor='ew-resize'
		updateAngle(event.clientX, event.clientY)
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}

	function handleTouchMove(event) {
		
		let touchobj = event.changedTouches[0]; // erster Finger
		console.log(touchobj.clientX,touchobj.clientY)
		updateAngle(touchobj.clientX, touchobj.clientY)
	}

	function handleTouchUp(event) {
		console.log("touchUp")
		document.body.style.cursor='default'
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchUp);
	}

	function handleTouchdown(event){
		let touchobj = event.touches[0]; // erster Finger
		console.log(touchobj.clientX,touchobj.clientY)
		updateAngle(touchobj.clientX, touchobj.clientY)
		console.log("touchdown")
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchUp);
	}

	

	

</script>
<canvas on:mousedown={handleMousedown}  on:touchstart={handleTouchdown} bind:this={canvas} width={size} height={size}  />