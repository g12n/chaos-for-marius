<script>
	import  mexp from 'math-expression-evaluator';
    import { afterUpdate } from 'svelte';

	export var label = "x";
	export var value = 50;
	export var min = 0;
	export var max = 1000;
	export var step = 1;
	
	$: input = value;
	
	let x = 0;
	let dx = 0;
	let scrobbing = false;

	
	function handleMousemove(event) {
		dx =  event.clientX - x;
		x = event.clientX;
		let v = value + (dx * step);
		value = Math.max(min,Math.min(max,v));
        input = value;
	}
	
	function handleMouseup(event) {
		document.body.style.cursor='default'
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}
	
	
	function handleMousedown(event){
		document.body.style.cursor='ew-resize'
		x = event.clientX;
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}
	
	function handleChange (event) {
		let v = mexp.eval(`${input}`);
		value = 	value = Math.max(min,Math.min(max,v)); 
		input = value;
	}
</script>

<label>
	<span on:mousedown={handleMousedown}>{label}</span>
	<input on:change={handleChange} type="text" bind:value={input}/>
</label>

<style>
	label{
		display: grid; 
		grid-template-columns: 1.5em 1fr;
		align-items: center;
		border-radius: 2px;
	}	
	
	label:hover{outline: 1px solid #ddd}
	
	label:focus-within{
	outline: 2px solid #00aaff
    }
	span { 
		user-select: none;
		cursor: ew-resize;
	}
	input, span{
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
		line-height:1.5rem;
		margin:0;
		border:none;
		outline: none;
	}
	input{
		padding: 0.25rem 0.5rem;
		box-sizing: border-box;
		display: block; 
		width: 100%;
    }
	
</style>