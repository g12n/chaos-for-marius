<script>
	import Marius from './Marius.svelte'
	 import 'file-saver';
	 	import math from 'canvas-sketch-util/math';

	let name;
	let size = 1024;
	let steps=16;
	let canvas;
	let hue=100;
	let spread = 0.15;
	let angle = 0.25 * Math.PI;
	
	let save = () =>{
		let now = new Date();
		let fileName = `${name}.png`
		canvas.toBlob(function(blob) {
  	  		saveAs(blob, fileName);
		});
	}

</script>

<style>
	:global(body){
		padding: 0; 
		margin: 0;
		background: #456;
		color: #fff;
	}
	:global(canvas){
		display:block;
		width:70vmin;
		height: 70vmin;
		margin: 5vmin  auto;
		border: 1vmin solid #fff;
		box-shadow: 1vmin 2vmin 30px rgba(0,0,0,0.4)
	}
	.ui{
		display: flex; 
		flex-direction: column;
		padding: 2rem;
	}
	p{font-size: 1.2rem; text-align: center;}
</style>

<Marius size={size} angle={angle} spread={spread} bind:canvas={canvas} bind:name={name} steps={steps}/>

<p>{name}</p>
<div class="ui">
<label>
<input	type="range" bind:value={size} min={400} max={3000} />
	{size}&times;{size}px
</label>
<label>
<input	type="range" bind:value={steps} min={3} max={24} />
		{steps} Columns
</label>
<label>
<input	type="range" bind:value={spread} min={0.1} max={1} step="0.01" />
		{Math.round(spread*100)}%
</label>
<label>
<input	type="range" bind:value={angle} min={0} max={2*Math.PI} step={math.degToRad(1)} />
		{Math.round(math.radToDeg(angle))}°
</label>
<button on:click={save}>Download Image</button>
</div>

