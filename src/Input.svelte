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
    let y = 0;
	let dx = 0;
	let scrobbing = false;

    let showTipp = false;
    let scrubbing = false
	

    function updateValue(newX){

        let dx =  parseInt(newX - x);
        x = newX;
        let v = value + (dx * step);
		value = Math.max(min,Math.min(max,v));
        input = value;
    }


	function handleMousemove(event) {
        y = event.clientY;
		updateValue(event.clientX)
	}
	
	function handleMouseup(event) {
		document.body.style.cursor='default'
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
        showTipp = false;
        scrubbing = false;
	}
	
	function handleMousedown(event){
        scrubbing = true;
		document.body.style.cursor='ew-resize'
        y = event.clientY;
        x = event.clientX;
        updateValue(event.clientX)
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}
	
	function handleChange (event) {
		let v = mexp.eval(`${input}`);
		value = value = Math.max(min,Math.min(max,v)); 
		input = value;
	}


    function handleTouchMove(event) {
		let touchobj = event.changedTouches[0]; // erster Finger
        y = touchobj.clientY;
		updateValue(touchobj.clientX)
	}

	function handleTouchUp(event) {
		document.body.style.cursor='default'
        showTipp = false;
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchUp);
	}

	function handleTouchdown(event){
		let touchobj = event.touches[0]; // erster Finger
        y = touchobj.clientY;
        showTipp = true;
		updateValue(touchobj.clientX)

		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchUp);
	}



</script>

<label class={scrubbing ? "scrubbing": "" } on:touchstart={handleTouchdown}>
	<span  on:mousedown={handleMousedown}>{label}</span>
	<input on:change={handleChange} type="text" bind:value={input}/>
</label>
{#if showTipp}
    <div class="tooltip" style="--x:{x}px;--y:{y}px"><span>{value}</span></div>
{/if}
<style>
    .tooltip{
        width: 80px;
        height: 80px;
        background-color: rgba(0,0,0,0.2);
        position: fixed;
        left: var(--x); 
        top: var(--y); 
        transform: translate(-50%,-50%);
        border-radius: 50%;
        touch-action: none;
        
    }
    .tooltip span{
        position: absolute;
        top:-2em;
        left: 50%;
        transform: translate(-50%,0);
        touch-action: none;
       
    }
	label{
		display: grid; 
		grid-template-columns: 1.5em 1fr;
		align-items: center;
		border-radius: 4px;
        background: #fff;
        color: #000
	}	
	
	label:hover{
        box-shadow: 0 0 0 1px #0af;
    }
	
	label:focus-within, 
    label.scrubbing{
        box-shadow: 0 0 0 3px #0af;
        color: #0af
    }
    label.scrubbing input{
        cursor: ew-resize;;
    }
	span { 
		user-select: none;
		cursor: ew-resize;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
	}
	input, span{
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
		line-height:1.5rem;
		margin:0;
		border:none;
		outline: none;
        border-radius: 4px;
	}
	input{
		padding: 0.25rem 0.5rem;
		box-sizing: border-box;
		display: block; 
		width: 100%;
    }
	
</style>