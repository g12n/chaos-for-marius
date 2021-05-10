<script>
	import Marius from './Marius.svelte'
	import Input from './Input.svelte'
	import 'file-saver';
	import {radToDeg,degToRad} from 'canvas-sketch-util/math';
	let name;
	let size = 1024;
	let steps=12;
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
	:global(*){
		box-sizing: border-box;
	}
	:global(canvas){
		display:block;
		width:80%;
		max-width: 80vmin;
		margin: 5vmin  auto;
		border: 1vmin solid #fff;
		box-shadow: 1vmin 2vmin 30px rgba(0,0,0,0.4);
		touch-action: none;
	}
	:global(body){
		display: grid;
		grid-template-columns: 1fr;

		grid-template-rows: auto 1fr;
		align-items: start;
	}

	@media (min-width:400px) {
		:global(body){
			grid-template-columns: 3fr 1fr;
			align-items: center;
		}
	}

	.ui{
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		justify-content: start;
		grid-gap: 1rem;
		padding: 2rem;
	}
	button{
		grid-column: span 2;
	}
	p{font-size: 0.8rem; text-align: center;
		grid-column: span 2;}
</style>
<div>
<Marius size={size} bind:angle={angle} bind:spread={spread} bind:canvas={canvas} bind:name={name} steps={steps}/>

</div>
<div class="ui">
	<Input label="w" bind:value={size} min={400} max={3000} step={8}/>
	<Input label="c" bind:value={steps} min={3} max={24}/>
	<button on:click={save}>Download Image</button>
</div>

