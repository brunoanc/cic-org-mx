<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";

    const languages = [
        { code: "es", emoji: "🇲🇽" },
        { code: "en", emoji: "🇺🇸" },
        { code: "fr", emoji: "🇫🇷" }
    ];
</script>

<style>
    nav {
        position: fixed;
        top: 0;
        width: calc(100% - 4vw);
        z-index: 9;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 2vh 2vw;
    }

    @media (prefers-reduced-motion: no-preference) {
        nav {
            transition: background-color 200ms linear;
        }
    }

    nav section {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #navbar-logo {
        flex: 1;
        justify-content: left;
    }

    #navbar-logo img {
        width: auto;
        height: 4.5vh;
    }

    #navbar-links {
        flex: 3;
        justify-content: space-around;
    }

    #navbar-links a {
        cursor: pointer;
        font-family: "Montserrat";
        font-size: 1rem;
        font-weight: bold;
        color: #FFFFFF;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        position: relative;
    }

    #navbar-links a:visited {
        color: #FFFFFF;
    }

    #navbar-links a::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #FFFFFF;
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        #navbar-links a:hover::after {
            transform: scaleX(1);
        }
    }

    #navbar-donar {
        flex: 1;
        justify-content: right;
    }

    #navbar-donar select {
        height: 5vh;
        border-radius: 12px;
        background-color: #FFFFFF;
        border: none;
        margin-right: 1vw;
        font-family: "Twemoji Country Flags";
        font-size: 1rem;
        cursor: pointer;
    }

    #navbar-donar select:hover{
        opacity: 0.8;
    }

    #navbar-donar select option {
        font-family: "Twemoji Country Flags";
    }

    /*#navbar-donar a {
        cursor: pointer;
        background-color: var(--pink-color);
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
    }

    #navbar-donar a span {
        margin: 0 1vw;
    }

    #navbar-donar a:hover {
        opacity: 0.8;
    }*/
</style>

<!-- Desktop navbar -->
<nav style="background-color: {$navColor};">
    <section id="navbar-logo">
        <a href="/">
            <figure>
                <img src="/logos/cic-solo-blanco.svg" alt={$_("logo")}>
            </figure>
        </a>
    </section>
    <section id="navbar-links">
        <a href="/sobre-nosotros">
            {$_("navegacion.sobreNosotros")}
        </a>
        <a href="/talleres">
            {$_("navegacion.talleres")}
        </a>
        <a href="/eventos">
            {$_("navegacion.eventos")}
        </a>
        <a href="/becas">
            {$_("navegacion.becas")}
        </a>
        <!--<a href="/">
            {$_("navegacion.noticias")}
        </a>-->
    </section>
    <section id="navbar-donar">
        <select name="lenguaje"bind:value={$locale}>
            {#each languages as { code, emoji }}
                <option value={code}>&nbsp;{emoji}</option>
            {/each}
        </select>
        <!--<a href="/"><span>{$_("navegacion.donaAhora")}</span></a>-->
    </section>
</nav>
