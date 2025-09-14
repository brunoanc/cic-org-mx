<script lang="ts">
    import { page } from "$app/state";
    import { _, locale } from "svelte-i18n";
    import { PortableText } from "@portabletext/svelte";
    import type { InputValue } from "@portabletext/svelte";
    import { navColor } from "$lib/stores/nav-color";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";

    navColor.set("#07446E");

    type Multilingual<T> = {
        en: T,
        es: T,
        fr: T
    };

    type BecaUnprocessed = {
        titulo: Multilingual<string>,
        descripcion: Multilingual<InputValue>,
        convocatoria: string,
        formulario: string,
        images: Array<string>
    };

    type Beca = {
        nombre: string,
        descripcion: InputValue | undefined,
        convocatoria: string,
        formulario: string,
        images: Array<string>
    };

    // Transformar query raw de Sanity en array de Becas
    function transformBeca(data: BecaUnprocessed[], lang: string) {
        return data.map(item => ({
            nombre: item.titulo[lang as keyof Multilingual<string>],
            descripcion: item.descripcion[lang as keyof Multilingual<InputValue>],
            convocatoria: item.convocatoria,
            formulario: item.formulario,
            images: item.images
        })) as Beca[];
    }

    const becas = $derived(transformBeca(page.data.becas, $locale ?? "es"));
</script>

<style>
    #becas-title {
        width: 100%;
        margin-top: 6vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #becas-title h1 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2rem;
        color: var(--blue-color);
        margin: 0;
        position: relative;
    }

    #becas-title h1::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--pink-color);
        bottom: -5px;
        left: 0;
    }

    #becas-title p {
        margin: 4vh 0 0 0;
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: var(--blue-color);
        max-width: 800px;
    }

    #becas-listado {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 6vh 0;
        gap: 5vh;
    }

    .beca-card {
        width: 86vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 28px;
        padding: 4vh 5vw;
        gap: 5vw;
        color: #FFFFFF;
    }

    .beca-card figure {
        flex: 1;
        max-width: 40vw;
    }

    .beca-card img {
        width: 100%;
        border-radius: 12px;
        object-fit: cover;
        max-height: 35vh;
    }

    .beca-info {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .beca-info h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .beca-info, .beca-info p {
        font-family: "Montserrat";
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }

    .beca-info > a {
        background-color: #FFFFFF;
        color: var(--blue-color);
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 1rem;
        border-radius: 12px;
        text-align: center;
        text-decoration: none;
        padding: 1rem 2rem;
        width: fit-content;
        transition: opacity 0.3s ease;
    }

    .beca-info > a:hover {
        opacity: 0.8;
    }

    .beca-info p a {
        color: #FFFFFF;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .beca-card {
            flex-direction: column;
            padding: 4vh 6vw;
        }

        .beca-card figure {
            max-width: 100%;
        }

        .beca-card img {
            max-height: unset;
            height: auto;
        }

        .beca-info {
            width: 100%;
        }
    }
</style>

<article id="becas-title">
    <h1>{$_("becas.titulo")}</h1>
    <p>{$_("becas.descripcion")}</p>
</article>

<article id="becas-listado">
    {#each becas as beca, i}
        <section use:fadeInAnim class="beca-card" style="background-color: {i % 2 === 0 ? "var(--pink-color)" : "var(--blue-color)"}">
            <figure>
                {#each beca.images as image}
                    <img src={image} alt="Imagen representativa del programa {beca.nombre}.">
                {/each}
            </figure>

            <div class="beca-info">
                <h2>{beca.nombre}</h2>

                <PortableText value={beca.descripcion}></PortableText>

                <p>
                    {$_("becas.masInfo")} <a href={beca.convocatoria} target="_blank" rel="noopener noreferrer">{$_("becas.masInfoLink")}</a>.
                </p>

                <a href={beca.formulario} target="_blank" rel="noopener noreferrer">
                    {$_("becas.aplicar")}
                </a>
            </div>
        </section>
    {/each}
</article>
