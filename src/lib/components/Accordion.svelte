<script lang="ts">
    import { slide } from "svelte/transition";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";

    type AccordionItem = {
        pregunta: string;
        respuesta: string;
    };

    function isAccordionItem(value: unknown): value is AccordionItem {
        return typeof value === "object"
            && value !== null
            && "pregunta" in value
            && "respuesta" in value
            && typeof value.pregunta === "string"
            && typeof value.respuesta === "string";
    }

    let { preguntas, color }: { preguntas: unknown; color: string } = $props();

    let openIndex = $state<number | null>(null);
    let items = $derived(Array.isArray(preguntas) ? preguntas.filter(isAccordionItem) : []);

    function toggleItem(index: number) {
        openIndex = openIndex === index ? null : index;
    }
</script>

<style>
    #accordion-container {
        --accordion-accent: var(--pink-color);
        width: 100%;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        line-height: 1.6rem;
        text-align: justify;
    }

    .accordion {
        width: min(90%, 68rem);
        font-family: "Montserrat";
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .accordion-item {
        border: 2px solid var(--accordion-accent);
        border-radius: 1rem;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0 0.85rem 2rem rgba(7, 68, 110, 0.08);
    }

    .accordion-item h2 {
        margin: 0;
    }

    .accordion-trigger {
        width: 100%;
        border: none;
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        font: inherit;
        font-size: 1rem;
        font-weight: 700;
        color: #f0f0f0;
        text-align: left;
        cursor: pointer;
        transition: filter 0.2s ease;
    }

    .accordion-trigger:hover {
        filter: brightness(1.05);
    }

    .accordion-trigger:focus-visible {
        outline: 3px solid #ffffff;
        outline-offset: -3px;
        box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--accordion-accent) 55%, white);
    }

    .accordion-label {
        flex: 1;
    }

    .accordion-trigger::after {
        content: "";
        flex-shrink: 0;
        width: 0.7rem;
        height: 0.7rem;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: translateY(-0.15rem) rotate(45deg);
        transition: transform 0.2s ease;
    }

    .accordion-item.open .accordion-trigger::after {
        transform: translateY(0.15rem) rotate(-135deg);
    }

    .accordion-content {
        border-top: 1px solid color-mix(in srgb, var(--accordion-accent) 25%, white);
        background: linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%);
    }

    .accordion-body {
        padding: 1.1rem 1.25rem 1.25rem;
        color: var(--blue-color);
    }

    .accordion-body :global(*:first-child) {
        margin-top: 0;
    }

    .accordion-body :global(*:last-child) {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        .accordion {
            width: 92%;
            gap: 0.85rem;
        }

        .accordion-trigger {
            padding: 0.95rem 1rem;
        }

        .accordion-body {
            padding: 1rem;
        }
    }
</style>

<div use:fadeInAnim id="accordion-container" style={`--accordion-accent: ${color};`}>
    <div class="accordion">
        {#each items as pregunta, i}
            <div class:open={openIndex === i} class="accordion-item">
                <h2>
                    <button
                        class="accordion-trigger"
                        type="button"
                        aria-expanded={openIndex === i}
                        aria-controls={`accordion-panel-${i}`}
                        onclick={() => toggleItem(i)}
                        style={`background-color: ${color};`}
                    >
                        <span class="accordion-label">{pregunta.pregunta}</span>
                    </button>
                </h2>

                {#if openIndex === i}
                    <div
                        id={`accordion-panel-${i}`}
                        class="accordion-content"
                        role="region"
                        aria-label={pregunta.pregunta}
                        transition:slide={{ duration: 220 }}
                    >
                        <div class="accordion-body">
                            {@html pregunta.respuesta}
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
