<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import Paragraph from './Paragraph.svelte';

    import type { ControlType } from "./Types";
    import { renderControlClasses } from "./Types";

    export let control: ControlType;

    let controlElement: HTMLElement;

    function setCursorPosToEnd() {
        if (control.text.length > 0) {
            const setpos = document.createRange();
            const set = window.getSelection();

            setpos.setStart(controlElement.childNodes[0], control.text.length);

            setpos.collapse();

            set.removeAllRanges();

            set.addRange(setpos);
        }
    }

    $: {
        if (control.selected && controlElement) {
            setCursorPosToEnd();
            controlElement.focus();
        }
    }

    const dispatch = createEventDispatcher();

    function selectControl() {
        dispatch('controlSelected', {
            id: control.id
        });
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            dispatch('finishEditing');
            event.preventDefault();
        }
        else if (event.key === "Backspace" && control.text === "") {
            dispatch("removeControl", { id: control.id });
            event.preventDefault();
        }
    }
</script>

<p bind:this={controlElement}
   contenteditable="true" 
   class="{renderControlClasses(control)}"
   aria-selected="{control.selected}"
   on:focus="{selectControl}"
   on:keydown={handleKeyDown}
   bind:textContent={control.text} >


</p>

