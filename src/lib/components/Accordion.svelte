<script lang="ts">
    import { fadeInAnim } from "$lib/actions/fadeInAnim";
    import { onMount } from "svelte";

    let { preguntas, color } = $props();

    onMount(async () => {
        // Importar bootstrap dinámicamente
        await import("bootstrap");
    });
</script>

<style>
    :global {
        @import "bootstrap/dist/css/bootstrap.min.css";
    }

    #accordion-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1.6rem;
        text-align: justify;
    }

    .accordion {
        width: 90%;
        font-family: "Montserrat";
    }

    .accordion-button:not(.collapsed), .accordion-button.collapsed {
        color: #f0f0f0;
    }

    .accordion-button:not(.collapsed)::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 16 16'%3e%3cpath fill-rule='evenodd' d='M1.646 11.354a.5.5 0 0 0 .708 0L8 5.707l5.646 5.647a.5.5 0 0 0 .708-.708l-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 0 .708z'/%3e%3c/svg%3e");
    }

    .accordion-button.collapsed::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 16 16'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }

    .accordion-body {
        color: var(--blue-color);
    }
</style>

<div use:fadeInAnim id="accordion-container" class="mb-3">
    <div class="accordion" id="accordion">

        {#each { length: preguntas.length }, i}
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed {color == "var(--pink-color)" ? "focus-ring focus-ring-danger" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{i}" aria-expanded="false" aria-controls="collapseOne" style="background-color: {color};">
                        {preguntas[i].pregunta}
                    </button>
                </h2>

                <div id="collapse{i}" class="accordion-collapse collapse" data-bs-parent="#accordion">
                    <div class="accordion-body">
                        {@html preguntas[i].respuesta}
                    </div>
                </div>
            </div>
        {/each}

    </div>
</div>
