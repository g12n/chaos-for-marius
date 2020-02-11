<script>
	import { onMount, afterUpdate } from 'svelte';
	import {Line, Pt, Create, Group, Bound} from 'pts';
	import math from 'canvas-sketch-util/math';
	export let canvas
	export let size=1024;
	let context
	let hue
	export	let steps = 4;
	export let name;
	export let angle = 0.5 * 2 * Math.PI;
	export let spread = 0.25;

	$: squareSize = size/steps;
	$: randomDisplacement = squareSize/6;
	$: rotateMultiplier = 30;
	

	$: offset = size/12;

	
	$: name = `chaos4marius-${steps}_columns-angle_${Math.round(math.radToDeg(angle))}-spread_${Math.round(spread*100)}-${size}x${size}`
	
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
		
		let bounds = Bound.fromGroup(Group.fromArray([[offset,offset],[size-offset,size-offset]]));

		let line = Line.fromAngle(bounds.center, angle, size);
		let linePath = new Path2D(`M${line[0].x} ${line[0].y} L ${line[1].x} ${line[1].y}`)
		//context.stroke(linePath)
		
		let cellSize = bounds.width/steps*0.65;
		let gridPoints = Create.gridPts (bounds, steps, steps, [0.5,0.5]);
		
		gridPoints.map(point =>{
			context.strokeStyle="#fff";
			let hue = parseInt(Math.random()*40);

			hue = math.mapRange(point.magnitude(), 0, bounds.bottomRight.magnitude(), 0, 40, true);
			let lightness = math.mapRange(point.magnitude(), 0, bounds.bottomRight.magnitude(), 30, 60, true);
			context.fillStyle= `hsl(${hue}, 100%, ${lightness}%)`;
			let distance = Line.distanceFromPt ( line, point );
			let variability = math.mapRange(distance, 0, size*spread, 1, 0, true);			
			let rotation = math.mapRange(Math.random(), 0, 1, variability*0.25*-Math.PI, variability* 0.25*Math.PI, true);
			let sizeOffset=  math.mapRange(Math.random()*variability, 0, 1, 0, 0 , true);

		  context.fill(square(point.x, point.y,cellSize+sizeOffset,rotation))
 			rotation = math.mapRange(Math.random(), 0, 1, variability*0.25*-Math.PI, variability* 0.25*Math.PI, true);			
			sizeOffset=  math.mapRange(Math.random()*variability, 0, 1, cellSize/2, cellSize/2 , true);
			
			context.strokeStyle= `hsla(${hue}, 100%, ${lightness+30}%,${variability})`;
			
			
			context.stroke(square(point.x, point.y,cellSize-sizeOffset,rotation))
		})

		
	}
	
	onMount(render)
	afterUpdate(render)
</script>
<canvas bind:this={canvas} width={size} height={size}  />
