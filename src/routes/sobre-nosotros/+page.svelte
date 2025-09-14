<script lang="ts">
    import { _ } from "svelte-i18n";
    import { browser } from "$app/environment";
    import { navColor } from "$lib/stores/nav-color";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";
    import { type EmblaCarouselType } from "embla-carousel";
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import Autoplay from "embla-carousel-autoplay";

    let activeNumber = $state(0);

    let emblaApi: EmblaCarouselType;
    let options = {
        loop: true
    };
    let plugins = [
        Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            breakpoints: {
                "(prefers-reduced-motion: reduce)": { jump: true }
            }
        })
    ];

    function onemblaInit(ev: CustomEvent<EmblaCarouselType>) {
        emblaApi = ev.detail;
        emblaApi.on("select", () => activeNumber = emblaApi.selectedScrollSnap());
    }

    navColor.set("#07446E");
</script>

<style>
    #quienes-somos {
        width: 86vw;
        padding: 2vh 7vw 4vh 7vw;
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    #quienes-somos figure {
        height: 100%;
    }

    #quienes-somos img {
        border-radius: 12px;
        width: min(50vh, 40vw);
        height: 100%;
        object-fit: cover;
    }

    #quienes-somos-text {
        background-color: var(--pink-color);
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin-left: 2vw;
        padding: 0 10vw 0 4vw;
        border-radius: 12px;
    }

    #quienes-somos-text h1 {
        margin: 5vh 0 2vh 0;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.5rem;
    }

    #quienes-somos-text p {
        margin: 0 0 5vh 0;
        font-family: "Montserrat";
        font-size: 1.2rem;
    }

    #estamos-comprometidos {
        width: 90vw;
        font-family: "Montserrat";
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--blue-color);
        color: #FFFFFF;
        text-align: center;
        padding: 0 5vw;
    }

    .mision-vision {
        width: 86vw;
        padding: 4vh 7vw;
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .mision-vision-image {
        z-index: 2;
        margin-right: -4vw;
    }

    .mision-vision-image figure {
        height: calc(100% - 8vh);
        margin: 4vh 0 4vh 0;
    }

    .mision-vision-image img {
        border-radius: 12px;
        width: min(50vh, 35vw);
        height: 100%;
        object-fit: cover;
    }

    .mision-vision-text {
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin-left: 2vw;
        padding: 0 8vw 0 5vw;
        border-radius: 12px;
    }

    .mision-vision-text h2 {
        margin: 5vh 0 2vh 0;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.3rem;
    }

    .mision-vision-text p {
        margin: 0 0 5vh 0;
        font-family: "Montserrat";
        font-size: 1.2rem;
    }

    #arte-accion {
        width: 90vw;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--pink-color);
        color: #FFFFFF;
        text-align: center;
        padding: 0 5vw;
    }

    #arte-accion p {
        margin: 2vh 0;
    }

    #valores {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 4vh 0;
    }

    #valores h2 {
        width: 90vw;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.5rem;
        align-items: center;
        background-color: var(--blue-color);
        color: #FFFFFF;
        text-align: center;
        padding: 2vh 5vw;
        margin: 0 0 4vh 0;
    }

    .valor {
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: var(--pink-color);
        border: 2px solid var(--pink-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        opacity: 0.5;
    }

    .valor h3 {
        font-weight: bold;
        margin: 0;
        padding: 3vh 1vw 0 1vw;
    }

    .valor p {
        margin: 0;
        padding: 2vh 1vw 3vh 1vw;
    }

    .valor.active {
        opacity: 1 !important;
    }

    .embla {
        width: 100vw;
        overflow: hidden;
    }

    .embla__container {
        display: flex;
    }

    .embla__slide {
        flex: 0 0 32%;
        min-width: 0;
    }

    @media (max-width: 680px) {
        #quienes-somos {
            flex-direction: column;
            align-items: center;
            padding: 2vh 7vw;
        }

        #quienes-somos-image {
            width: 100%;
        }

        #quienes-somos figure {
            width: 100%;
        }

        #quienes-somos img {
            border-radius: 12px;
            height: auto;
            width: 100%;
        }

        #quienes-somos-text {
            margin-left: 0;
        }

        .mision-vision {
            flex-direction: column;
            align-items: center;
            padding: 2vh 7vw;
        }

        .mision-vision-image {
            margin-right: 0;
            margin-bottom: -4vh;
            width: calc(100% - 12vw);
        }

        .mision-vision figure {
            width: 100%;
            margin: 0;
        }

        .mision-vision img {
            border-radius: 12px;
            height: auto;
            width: 100%;
        }

        .mision-vision-text {
            margin-left: 0;
        }

        #valores {
            margin: 0 0 4vh 0;
        }

        .embla__slide {
            flex: 0 0 99%;
            min-width: 0;
        }
    }
</style>

<article id="quienes-somos">
    <section id="quienes-somos-image">
        <figure>
            <img src="/img/quienes-somos/quienes-somos.webp" alt={$_("quienes-somos.quienes-somos.imagen")} width="4032" height="2218">
        </figure>
    </section>

    <section id="quienes-somos-text">
        <h1 use:fadeInAnim>
            {$_("quienes-somos.quienes-somos.titulo")}
        </h1>

        <p use:fadeInAnim>
            {$_("quienes-somos.quienes-somos.descripcion.parte1")}
            <br><br>
            {$_("quienes-somos.quienes-somos.descripcion.parte2")}
        </p>
    </section>
</article>

<article id="estamos-comprometidos">
    <p>
        <strong>{$_("quienes-somos.estamos-comprometidos.parte1")}</strong>
        <br><br>
        {$_("quienes-somos.estamos-comprometidos.parte2")}
    </p>
</article>

<article class="mision-vision">
    <section class="mision-vision-image">
        <figure>
            <img src="/img/quienes-somos/mision.webp" alt={$_("quienes-somos.mision.imagen")} width="1280" height="720">
        </figure>
    </section>

    <section class="mision-vision-text" style="background-color: var(--pink-color);">
        <h2 use:fadeInAnim>
            {$_("quienes-somos.mision.titulo.parte1")} <u>{$_("quienes-somos.mision.titulo.parte2")}</u>
        </h2>

        <p use:fadeInAnim>
            {$_("quienes-somos.mision.descripcion")}
        </p>
    </section>
</article>

<article id="arte-accion">
    <p>
        {$_("quienes-somos.arte-accion.parte1")} <u>{$_("quienes-somos.arte-accion.parte2")}</u> {$_("quienes-somos.arte-accion.parte3")} <u>{$_("quienes-somos.arte-accion.parte4")}</u>
    </p>
</article>

<article class="mision-vision">
    <section class="mision-vision-image">
        <figure>
            <img src="/img/quienes-somos/vision.webp" alt={$_("quienes-somos.vision.imagen")} width="6000" height="4000">
        </figure>
    </section>

    <section class="mision-vision-text" style="background-color: var(--blue-color);">
        <h2 use:fadeInAnim>
            {$_("quienes-somos.vision.titulo.parte1")} <u>{$_("quienes-somos.vision.titulo.parte2")}</u>
        </h2>

        <p use:fadeInAnim>
            {$_("quienes-somos.vision.descripcion")}
        </p>
    </section>
</article>

<article id="valores">
    <h2>{$_("quienes-somos.valores.titulo.parte1")} <u>{$_("quienes-somos.valores.titulo.parte2")}</u></h2>

    {#if browser}
        <div class="embla" use:emblaCarouselSvelte={{ options, plugins }} onemblaInit={onemblaInit}>
            <div class="embla__container">
                {#each { length: $_("quienes-somos.valores.valores").length }, i}
                    <div class="embla__slide valor" class:active={activeNumber == i}>
                        <h3>{$_(`quienes-somos.valores.valores.${i}.valor`)}</h3>
                        <p>{$_(`quienes-somos.valores.valores.${i}.descripcion`)}</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</article>
