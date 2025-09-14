<script lang="ts">
    import { _, json } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";
    import Accordion from "$lib/components/Accordion.svelte";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";

    navColor.set("#07446E");
</script>

<style>
    #transparencia-info {
        width: 100%;
        margin: 6vh 0 2vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: "Montserrat";
        color: var(--blue-color);
    }

    #transparencia-info h1 {
        font-weight: bold;
        font-size: 2rem;
        margin: 0;
        position: relative;
    }

    #transparencia-info p {
        font-size: 1rem;
        margin: 2vh 0;
    }

    #ultimaAct {
        color: var(--pink-color);
    }

    #transparencia-texto {
        background-color: var(--pink-color);
        margin: 0 5vw;
        border-radius: 12px;
    }

    #transparencia-texto p {
        margin: 5vh 5vw;
        color: #ffffff;
    }

    #transparencia-info h1::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--pink-color);
        bottom: -5px;
        left: 0;
    }

    #contacto {
        margin: 2vh 0 6vh 0;
        text-align: center;
        font-family: "Montserrat";
        color: var(--blue-color);
        font-size: 1rem;
        margin: 6vh 5vw;
    }
</style>

<article id="transparencia-info">
    <h1>{$_("transparencia.titulo")}</h1>
    <p id="ultimaAct"><b>{$_("transparencia.ultimaActualizacion")}</b></p>

    <div use:fadeInAnim id="transparencia-texto">
        <p>
            {@html $_("transparencia.info")}
        </p>
    </div>
</article>

{#await $json("transparencia.secciones") then secciones}
    <Accordion preguntas={secciones} color="var(--blue-color)"></Accordion>
{/await}

<p id="contacto">
    Contacto para solicitud de documentos financieros y declaraciones enviar un correo a <a href="mailto:transparencia@cic.org.mx">transparencia@cic.org.mx</a>.
</p>
