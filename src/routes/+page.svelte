<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { mobileInterface } from "$lib/stores/mobile-interface";
    import { prefersReducedMotion } from "svelte/motion";
    import { _ } from "svelte-i18n";
    import Typewriter from "svelte-typewriter";
    import { navColor } from "$lib/stores/nav-color";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";

    let numeros = {
        "Colaboradores": 19,
        "Patrocinadores": 32,
        "Alumnos CIC": 117,
        "Proyectos anuales": 7,
        "Cursos de verano": 12,
        "Festivales": 26
    };

    let colaboradores = {
        "cufa": "Centro Universitario en Formación Artística",
        "enoma": "Laboratorio de Análisis Clínicos Enoma",
        "zoe": "Zoe Spa y Rehabilitación",
        "secretos-chiapas": "Secretos de Chiapas",
        "aapp": "Asesoría y Promotoría Profesional en Ciencia, Arte y Cultura",
        "rashid": "Clínica Dental Rashid",
        "co-cufa": "Compañía CUFA",
        "agiat": "Joyería AgiaT",
        "asociacion-jap": "Asociación México-Japonesa de Chiapas",
        "audiomusica": "Audio y Música Tapachula",
        "baby-center": "Baby Center",
        "barchen": "Bärchen Tapachula",
        "diseno-natural": "Diseño Natural Tapachula",
        "hotel-tapachula": "Hotel Tapachula",
        "salvador-dali": "Instituto American Integral Salvador Dalí",
        "noticias-chiapas": "Noticias de Chiapas",
        "prados-descanso": "Prados del Descanso Cementerio",
        "rok": "ROK La Quemada Pollos",
        "satel": "SATEL Telecomunicaciones",
        "selarom": "Selarom",
        "sta-lu": "Sta. Lu Productos Artesanales",
        "studio-gt": "Studio GT",
        "laguna": "Tortillerías Laguna de Cabildo y Escolleras"
    }

    // Se actualiza cuando la primera animación de typewriter acaba para empezar con la segunda
    let secondAnimDisabled = $state(true);
    let finishedTypeAnim = $state(false);
    let colorObserver: IntersectionObserver;
    let columns = $derived($mobileInterface ? 2 : 3);

    // Color inicial del navbar
    navColor.set("transparent");

    onMount(() => {
        // Actualizar color del navbar al bajar
        const sentinel = document.getElementById("nav-sentinel")!;

        colorObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                navColor.set("transparent");
            } else {
                navColor.set("#07446E");
            }
        }, {
            root: null,
            threshold: 0
        });

        colorObserver.observe(sentinel);
    });

    onDestroy(() => {
        if (colorObserver) {
            colorObserver.disconnect();
        }
    });
</script>

<svelte:head>
    <script type="application/ld+json">
        {
            "@context" : "https://schema.org",
            "@type" : "WebSite",
            "name" : "Complejo Integral de Cultura",
            "url" : "https://cic.org.mx"
        }
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "image": "https://cic.org.mx/img/index/banner.webp",
            "url": "https://cic.org.mx",
            "logo": "https://cic.org.mx/logos/cic.svg",
            "name": "Complejo Integral de Cultura",
            "description": "Somos una organización comprometida con el desarrollo integral de la sociedad a través del arte y la cultura.",
            "email": "complejointegral@cic.org.mx"
        }
    </script>
</svelte:head>

<style>
    #banner-principal {
        background-color: #544c76;
        background-image: url("/img/index/banner.webp");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    #banner-principal figure {
        margin-top: 10vh;
    }

    #banner-principal img {
        width: auto;
    }

    @media (min-width: 821px) {
        #banner-principal img {
            height: 40vh;
        }
    }

    @media (max-width: 820px) {
        #banner-principal img {
            height: 30vh;
        }
    }

    #nav-sentinel {
        height: 1px;
        width: 100%;
    }

    #eslogan {
        height: 25vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #eslogan div, #eslogan p {
        margin: 0;
        text-align: center;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 1.4rem;
        color: var(--blue-color);
        margin: 0 10vw;
    }

    #eslogan b {
        font-size: 2rem;
    }

    @media (max-width: 680px) {
        #eslogan div, #eslogan p {
            margin: 0 20vw;
        }
    }

    #testimonio {
        background-color: var(--pink-color);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #testimonio-texto {
        flex: 4;
        margin: 0 4vw;
        display: flex;
        flex-direction: column;
    }

    #testimonio-texto p {
        margin: 0;
    }

    #testimonio-frase {
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: #FFFFFF;
        padding-bottom: 1rem;
    }

    #testimonio-persona {
        font-family: "Montserrat";
        font-size: 1rem;
        color: #FFFFFF;
    }

    #testimonio-imagen {
        margin: 0 4vw;
        flex: 1;
    }

    #testimonio-imagen img {
        border-radius: 12px;
        height: 30vh;
        width: 30vh;
        object-fit: cover;
        margin: 4vh 0;
    }

    @media (max-width: 680px) {
        #testimonio {
            flex-direction: column;
        }

        #testimonio-texto {
            flex: unset;
            margin: 4vh 8vw;
        }

        #testimonio-imagen img {
            width: 84vw;
            height: 84vw;
            margin: 0 0 4vh 0;
        }
    }

    #cic-numeros {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 5vw;
        margin: 4vh 0 6vh 0;
    }

    #numeros-title {
        position: relative;
    }

    #numeros-title h2 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2rem;
        color: var(--blue-color);
        margin: 0;
    }

    #numeros-title h2:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--pink-color);
    }

    #numeros-grid {
        width: 100%;
        margin-top: 6vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 10vh;
        column-gap: 2vw;
        grid-auto-rows: auto;
    }

    .numeros-elem {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .numeros-elem figure {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    .numeros-elem img {
        width: 10vw;
        max-height: 15vh;
    }

    .numeros-elem p {
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: var(--blue-color);
        margin: 0;
    }

    .numeros-number {
        font-weight: bold;
        font-size: 3rem !important;
    }

    @media (max-width: 680px) {
        #numeros-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .numeros-elem img {
            width: unset;
            max-height: unset;
            max-width: 30vw;
            height: 10vh;
        }
    }

    #dona-ahora {
        background-color: var(--pink-color);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #dona-imagen {
        margin: 0 4vw 0 10vw;
        flex: 1;
    }

    #dona-imagen img {
        border-radius: 12px;
        width: min(50vh, 40vw);
        height: min(50vh, 40vw);
        object-fit: cover;
        margin: 4vh 0;
    }

    #dona-texto {
        flex: 4;
        margin: 0 4vw;
        display: flex;
        flex-direction: column;
    }

    #dona-texto h2 {
        margin: 0;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 1.8rem;
        color: #FFFFFF;
        padding-bottom: 1rem; 
    }

    #dona-texto p {
        margin: 0;
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: #FFFFFF;
        padding-bottom: 1rem;
    }

    /*#dona-ahora a {
        cursor: pointer;
        background-color: var(--blue-color);
        border-color: transparent;
        border-radius: 12px;
        font-family: "Montserrat";
        font-size: 1rem;
        font-weight: bold;
        color: #FFFFFF;
        height: 5vh;
        text-align: center;
        line-height: 5vh;
        text-decoration: none;
        width: fit-content;
    }

    #dona-ahora a span {
        margin: 0 2vw;
    }

    #dona-ahora a:hover {
        opacity: 0.8;
    }*/

    @media (max-width: 680px) {
        #dona-ahora {
            flex-direction: column;
        }

        #dona-texto {
            width: 84vw;
            flex: unset;
            margin: 4vh 0;
        }


        #dona-imagen {
            margin: 0;
        }

        #dona-imagen img {
            max-width: unset;
            max-height: unset;
            width: 84vw;
            height: 84vw;
            margin: 4vh 0 0 0;
        }

        /*#dona-ahora a {
            font-size: 1.4rem;
        }

        #dona-ahora a span {
            margin: 0 5vw;
        }*/
    }

    #colaboradores {
        width: 90vw;
        padding: 0 5vw;
        margin: 6vh 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 10vh;
        column-gap: 10vw;
        grid-auto-rows: auto;
    }

    #colaboradores figure {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    #colaboradores img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: 680px) {
        #colaboradores {
            grid-template-columns: repeat(2, 1fr);
        }

        #colaboradores img {
            width: unset;
            max-height: unset;
            max-width: 30vw;
            height: 10vh;
        }
    }
</style>

<article id="banner-principal">
    <figure>
        <img src="/logos/cic.svg" alt="Logo de CIC.">
    </figure>
    <h1 style="display: none;">{$_("index.cic")}</h1>
    <div id="nav-sentinel"></div>
</article>

<article id="eslogan">
    {#if prefersReducedMotion.current || finishedTypeAnim}
        <p>
            <b>{$_("index.eslogan.parte1")}</b>
            <br>
            {$_("index.eslogan.parte2")}
        </p>
    {:else}
        <div>
            <Typewriter on:done={() => secondAnimDisabled = false} interval={30}>
                <b>{$_("index.eslogan.parte1")}</b>
            </Typewriter>
            <Typewriter on:done={() => finishedTypeAnim = true} disabled={secondAnimDisabled} interval={30}>
                <span>{$_("index.eslogan.parte2")}</span>
            </Typewriter>
        </div>
        
    {/if}
</article>

<article id="testimonio">
    <section id="testimonio-imagen">
        <figure>
            <img src="/img/organigrama/norma-cabrera-galvez.webp" alt={$_("index.testimonio.imagen")} width="3120" height="4160">
        </figure>
    </section>
    <section id="testimonio-texto">
        <p id="testimonio-frase" use:fadeInAnim>
            <i>{$_("index.testimonio.texto")}</i>
        </p>
        <p id="testimonio-persona" use:fadeInAnim>
            <b>{$_("index.testimonio.nombre")}</b>
            <br>
            {$_("index.testimonio.puesto")}
        </p>
    </section>
</article>

<article id="cic-numeros">
    <section id="numeros-title">
        <h2>{$_("index.numeros.titulo")}</h2>
    </section>

    <section id="numeros-grid">
        {#each Object.entries(numeros) as [ nombre, cantidad ]}
            <div use:fadeInAnim class="numeros-elem">
                <figure>
                    <img src="/img/index/numeros/{nombre.toLowerCase().split(" ")[0]}.svg" alt="{$_("index.numeros.imagenes")} {nombre}.">
                </figure>
                <p class="numeros-number">{cantidad}</p>
                <p>{$_(`index.numeros.categorias.${nombre.toLowerCase().replaceAll(" ", "")}`)}</p>
            </div>
        {/each}
    </section>
</article>

<article id="dona-ahora">
    <section id="dona-imagen">
        <figure>
            <img src="/img/index/dona-ahora.webp" alt={$_("index.donar.imagen")} width="3024" height="4032">
        </figure>
    </section>

    <section id="dona-texto">
        <h2 id="dona-titulo" use:fadeInAnim>
            {$_("index.donar.titulo")}
        </h2>
        <p id="dona-subtitulo" use:fadeInAnim>
            {$_("index.donar.texto.parte1")}
            <br>
            {$_("index.donar.texto.parte2")}
        </p>
        <!--<a href="/"><span>{$_("navegacion.donaAhora")}</span></a>-->
    </section>
</article>

<article id="colaboradores">
    {#if Object.keys(colaboradores).length % columns == 0}
        {#each Object.entries(colaboradores) as [ imagen, nombre ]}
            <figure>
                <img src="/img/index/colaboradores/{imagen}.webp" alt="{$_("index.colaboradores.logos")} {nombre}." use:fadeInAnim>
            </figure>
        {/each}
    {:else if Object.keys(colaboradores).length % columns == 2}
        {#each Object.entries(colaboradores).slice(0, -2) as [ imagen, nombre ]}
            <figure>
                <img src="/img/index/colaboradores/{imagen}.webp" alt="{$_("index.colaboradores.logos")} {nombre}." use:fadeInAnim>
            </figure>
        {/each}

        <figure style="grid-column: 1 / span 3;">
            <img style="max-width: 33%;" src="/img/index/colaboradores/{Object.keys(colaboradores).at(-2)}.webp" alt="{$_("index.colaboradores.logos")} {Object.values(colaboradores).at(-2)}." use:fadeInAnim>
            <img style="max-width: 33%;"  src="/img/index/colaboradores/{Object.keys(colaboradores).at(-1)}.webp" alt="{$_("index.colaboradores.logos")} {Object.values(colaboradores).at(-1)}." use:fadeInAnim>
        </figure>
    {:else if Object.keys(colaboradores).length % columns == 1}
        {#each Object.entries(colaboradores).slice(0, -1) as [ imagen, nombre ]}
            <figure>
                <img src="/img/index/colaboradores/{imagen}.webp" alt="{$_("index.colaboradores.logos")} {nombre}." use:fadeInAnim>
            </figure>
        {/each}

        <figure style="grid-column: {columns == 3 ? 2 : 1} / span {columns == 3 ? 1 : 2};">
            <img src="/img/index/colaboradores/{Object.keys(colaboradores).at(-1)}.webp" alt="{$_("index.colaboradores.logos")} {Object.values(colaboradores).at(-1)}." use:fadeInAnim>
        </figure>
    {/if}
</article>
