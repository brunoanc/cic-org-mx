<script lang="ts">
    import { _ } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";

    navColor.set("#07446E");

    const tiposEventos = [
        {
            categoria: "festivales",
            icono: "fa-solid fa-masks-theater",
            ejemplos: ["Festival Internacional de la Música", "Festival de Danza", "Festival de Teatro Independiente"]
        },
        {
            categoria: "producciones",
            icono: "fa-solid fa-clapperboard", 
            ejemplos: ["Izapa Romance", "Abusos", "¿Cuál es tu reflejo? Imágenes?"]
        },
        {
            categoria: "educativos",
            icono: "fa-solid fa-chalkboard-user",
            ejemplos: ["Curso de Verano Arte & Expresión", "Clases Muestra", "Talleres Especializados"]
        },
        {
            categoria: "comunitarios",
            icono: "fa-solid fa-people-group",
            ejemplos: ["Día Internacional de la Danza", "Demostraciones Familiares", "Muestras de Arte Tapachulteco"]
        }
    ];

    const impactoNumeros = [
        { numero: 26, concepto: "festivales" },
        { numero: 10, concepto: "producciones" },
        { numero: 149, concepto: "eventos" },
        { numero: (25320).toLocaleString(), concepto: "asistentes" }
    ];
</script>

<style>
    #eventos-banner {
        background: linear-gradient(135deg, var(--pink-color) 0%, var(--blue-color) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 6vh 5vw;
        color: #FFFFFF;
        margin-top: 2vh;
    }

    #eventos-banner h1 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 3rem;
        margin: 0 0 2vh 0;
    }

    #eventos-mision {
        width: 90vw;
        padding: 6vh 5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        text-align: center;
    }

    #eventos-mision p {
        font-family: "Montserrat";
        font-size: 1.2rem;
        line-height: 1.7;
        margin: 0;
        max-width: 900px;
        color: var(--blue-color);
    }

    #eventos-mision strong {
        color: var(--pink-color);
        font-weight: bold;
    }

    #tipos-eventos {
        width: 86vw;
        padding: 6vh 7vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--pink-color);
    }

    #tipos-eventos h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.5rem;
        color: #FFFFFF;
        margin: 0 0 6vh 0;
        text-align: center;
        position: relative;
    }

    #tipos-eventos h2::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        background-color: var(--blue-color);
        bottom: -5px;
        left: 0;
    }

    #eventos-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4vh 4vw;
        width: 100%;
    }

    .evento-card {
        background-color: #FFFFFF;
        border: 3px solid var(--pink-color);
        border-radius: 20px;
        padding: 4vh 3vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .evento-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(159, 50, 107, 0.2);
    }

    .evento-card i {
        width: 80px;
        height: 80px;
        font-size: 75px;
        color: var(--blue-color);
        object-fit: contain;
        margin-bottom: 2vh;
    }

    .evento-card h3 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--blue-color);
        margin: 0 0 2vh 0;
    }

    .evento-card p {
        font-family: "Montserrat";
        font-size: 1rem;
        color: var(--blue-color);
        margin: 0 0 2vh 0;
        line-height: 1.5;
    }

    .ejemplos-lista {
        font-family: "Montserrat";
        font-size: 0.9rem;
        color: var(--pink-color);
        font-style: italic;
        margin: 0;
    }

    #arte-transformacion {
        width: 90vw;
        padding: 6vh 5vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #arte-transformacion h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.8rem;
        color: #FFFFFF;
        margin: 0 0 3vh 0;
        color: var(--blue-color);
    }

    #arte-transformacion p {
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: #FFFFFF;
        margin: 0;
        max-width: 800px;
        line-height: 1.6;
        color: var(--blue-color);
    }

    #impacto-numeros {
        width: 86vw;
        padding: 6vh 7vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--blue-color);
    }

    #impacto-numeros h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.5rem;
        color: #FFFFFF;
        margin: 0 0 6vh 0;
        text-align: center;
        position: relative;
    }

    #impacto-numeros h2::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        background-color: var(--pink-color);
        bottom: -5px;
        left: 0;
    }

    #numeros-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4vh 2vw;
        width: 100%;
    }

    .numero-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .numero-valor {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 3.5rem;
        color: #FFFFFF;
        margin: 0;
        line-height: 1;
    }

    .numero-concepto {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--pink-color);
        margin: 1vh 0 0 0;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    #colaboracion-cufa {
        width: 100%;
        display: flex;
        align-items: stretch;
    }

    #colaboracion-imagen {
        flex: 1;
        background-image: url("/img/eventos/cufa.webp");
        background-size: cover;
        background-position: center;
        min-height: 50vh;
    }

    #colaboracion-texto {
        flex: 1;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 6vw;
        margin: 5vh 0;
    }

    #colaboracion-texto h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 2.3rem;
        margin: 0 0 3vh 0;
        color: var(--pink-color);
    }

    #colaboracion-texto p {
        font-family: "Montserrat";
        font-size: 1.2rem;
        margin: 0 0 3vh 0;
        line-height: 1.6;
        color: var(--blue-color);
    }

    #colaboracion-texto p:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        #eventos-banner h1 {
            font-size: 2.5rem;
        }

        #eventos-grid {
            grid-template-columns: 1fr;
            gap: 4vh;
        }

        #numeros-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 4vh 4vw;
        }

        #colaboracion-cufa {
            flex-direction: column;
        }

        #colaboracion-imagen {
            min-height: 40vh;
        }

        #colaboracion-texto {
            padding: 4vh 6vw;
        }

        .numero-valor {
            font-size: 2.8rem;
        }
    }

    @media (max-width: 680px) {
        #eventos-banner {
            padding: 4vh 8vw;
        }

        #tipos-eventos {
            padding: 4vh 7vw;
        }

        #tipos-eventos h2,
        #impacto-numeros h2 {
            font-size: 2rem;
        }

        #arte-transformacion h2 {
            font-size: 2.2rem;
        }

        #colaboracion-texto h2 {
            font-size: 1.8rem;
        }
    }
</style>

<article id="eventos-banner">
    <h1 use:fadeInAnim>{$_("eventos.titulo")}</h1>
</article>

<article id="eventos-mision">
    <p use:fadeInAnim>
        <strong>{$_("eventos.mision.parte1")}</strong> {$_("eventos.mision.parte2")} 
        <strong>{$_("eventos.mision.parte3")}</strong> {$_("eventos.mision.parte4")}
    </p>
</article>

<article id="tipos-eventos">
    <h2 use:fadeInAnim>{$_("eventos.tipos.titulo")}</h2>

    <section id="eventos-grid">
        {#each tiposEventos as tipo}
            <div use:fadeInAnim class="evento-card">
                <i class={tipo.icono}></i>
                
                <h3>{$_(`eventos.tipos.${tipo.categoria}.nombre`)}</h3>
                
                <p>{$_(`eventos.tipos.${tipo.categoria}.descripcion`)}</p>
                
                <p class="ejemplos-lista">
                    {$_("eventos.tipos.ejemplos")}: {tipo.ejemplos.join(", ")}
                </p>
            </div>
        {/each}
    </section>
</article>

<article id="arte-transformacion">
    <h2 use:fadeInAnim>
        {$_("eventos.arte.titulo.parte1")} <i>{$_("eventos.arte.titulo.parte2")}</i>
    </h2>
    <p use:fadeInAnim>{$_("eventos.arte.descripcion")}</p>
</article>

<article id="impacto-numeros">
    <h2 use:fadeInAnim>{$_("eventos.impacto.titulo")}</h2>

    <section id="numeros-grid">
        {#each impactoNumeros as item}
            <div use:fadeInAnim class="numero-item">
                <p class="numero-valor">{item.numero}</p>
                <p class="numero-concepto">{$_(`eventos.impacto.conceptos.${item.concepto}`)}</p>
            </div>
        {/each}
    </section>
</article>

<article id="colaboracion-cufa">
    <section id="colaboracion-imagen"></section>
    
    <section id="colaboracion-texto">
        <h2 use:fadeInAnim>
            {$_("eventos.colaboracion.titulo.parte1")} <i>{$_("eventos.colaboracion.titulo.parte2")}</i>
        </h2>
        
        <p use:fadeInAnim>{$_("eventos.colaboracion.descripcion1")}</p>
        
        <p use:fadeInAnim>{$_("eventos.colaboracion.descripcion2")}</p>
        
        <p use:fadeInAnim>{$_("eventos.colaboracion.descripcion3")}</p>
    </section>
</article>
