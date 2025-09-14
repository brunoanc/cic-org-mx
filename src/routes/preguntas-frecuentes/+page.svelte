<script lang="ts">
    import { _, json } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";
    import Accordion from "$lib/components/Accordion.svelte";

    navColor.set("#07446E");
</script>

<style>
    #faq-title {
        width: 100%;
        margin: 6vh 0 8vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #faq-title h1 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2rem;
        color: var(--blue-color);
        margin: 0;
        position: relative;
    }

    #faq-title h1::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--pink-color);
        bottom: -5px;
        left: 0;
    }

    #margin {
        height: 6vh;
    }
</style>

<article id="faq-title">
    <h1>{$_("preguntas-frecuentes.titulo")}</h1>
</article>

{#await $json("preguntas-frecuentes.preguntas") then preguntas}
    <Accordion preguntas={preguntas} color="var(--pink-color)"></Accordion>
{/await}

<div id="margin"></div>
