<script lang="ts">
	import type { ControlType } from "./Types";
	import { Tag, Style } from "./Types";
	import Control from "./Control.svelte";
    import { v4 as uuidv4 } from "uuid";
	
	let controls: ControlType[] = [
		{ id: "1", tag: Tag.Paragraph, text: "lalala", styles: [Style.Bold], selected: false},
		{ id: "2", tag: Tag.Paragraph, text: "lelelele", styles: [], selected: true},
	]

	function getSelectedControl(): ControlType {
		return controls.find(c => c.selected);
	}

	function selectById(id: string) {
        controls = controls.map(c => {
			c.selected = c.id === id;
			return c;
		});
    }

	function toggleStyle(control: ControlType, style: Style) {
		if (control.styles.indexOf(style) >= 0) {
			control.styles = control.styles.filter(s => s !== style);
		} else {
			control.styles = [...control.styles, style];
		}
	}

	function handleBold() {
		const selectedControl = getSelectedControl();
		toggleStyle(selectedControl, Style.Bold)
		controls = controls;
	}

	function handleItalic() {
		const selectedControl = getSelectedControl();
		toggleStyle(selectedControl, Style.Italic)
		controls = controls;
	}

	function handleUnderscore() {
		const selectedControl = getSelectedControl();
		if (!selectedControl) return;
		toggleStyle(selectedControl, Style.Underscore);
		controls = controls;
	}

	function handleHeader() {
		const selectedControl = getSelectedControl();
		selectedControl.tag = Tag.Header;
		controls = controls;
	}

	function handleParagraph() {
		const selectedControl = getSelectedControl();
		selectedControl.tag = Tag.Paragraph;
		controls = controls;
	}

	function handleControlSelected(event: CustomEvent) {
		selectById(event.detail.id);
	}

    function handleFinishEditing(event: CustomEvent) {
        const newControl: ControlType = {
            id: uuidv4(),
            tag: Tag.Paragraph,
            text: "",
            styles: [],
            selected: false
        };

        controls = [...controls, newControl];

        selectById(newControl.id);
    }

    function handleRemoveControl(event: CustomEvent) {
        if (controls.length === 1) return;
        controls = controls.filter(c => c.id !== event.detail.id);
        
        const lastControl = controls[controls.length-1];

        selectById(lastControl.id);
    }

	function handleMainKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key.toLowerCase() === "b") {
			handleBold();
		}
		else if (e.ctrlKey && e.key.toLowerCase() === "i") {
			handleItalic();
		}
		else if (e.ctrlKey && e.key.toLowerCase() === "u") {
			handleUnderscore();
		}
	}
    

</script>

<main on:keydown={handleMainKeyDown}>
	<section id="controls">
		<button on:click={handleBold}>Bold</button>
		<button on:click={handleItalic}>Italic</button>
		<button on:click={handleUnderscore}>Underscore</button>
		<button on:click={handleHeader}>Header</button>
		<button on:click={handleParagraph}>Paragraph</button>
	</section>
	
	<section id="text-editor">
		{#each controls as control}
			<Control control={control}
                     on:controlSelected={handleControlSelected}
                     on:finishEditing={handleFinishEditing}
                     on:removeControl={handleRemoveControl} />
		{/each}
	</section>
</main>

<style>
	main {
		background: rgba(250, 251, 252, 0.85);
		font-size: 16px;
		font-family: sans-serif;
		max-width: 900px;
		width: 75%;
		height: 75%;
		margin: 50px 60px;
		padding: 10px;
		border-radius: 3px;
		
		box-shadow: 6px 6px 5px rgba(72, 72, 72, 0.75);
	}

	#controls {
		padding-bottom: 6px;
		border-bottom: 1px solid #484848;
	}
</style>