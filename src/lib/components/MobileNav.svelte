<script lang="ts">
    import { _, locale } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";

    let menuOpen = $state(false);

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
        width: 100%;
        z-index: 9;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 2vh 0;
    }

    @media (prefers-reduced-motion: no-preference) {
        nav {
            transition: background-color 200ms linear;
        }
    }

    .navbar-logo {
        padding-left: 5vw;
    }

    .navbar-logo img {
        width: auto;
        height: 3vh;
    }

    nav ul {
        z-index: 10;
        padding: 0;
    }

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background-color: #FFFFFF;
    }

    #nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: -105%;
        top: 5rem;
        flex-direction: column;
        width: 100%;
        border-radius: 24px;
        text-align: center;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 5px 2px var(--blue-color);
    }

    @media (prefers-reduced-motion: no-preference) {
        #nav-menu {
            transition: 0.3s;
        }
    }

    .nav-item {
        margin: 2.5rem 0;
        list-style: none;
        width: 100%;
    }

    .nav-item a {
        font-family: "Montserrat";
        font-size: 1.6rem;
        font-weight: bold;
        color: var(--blue-color);
        text-decoration: none;
        display: inline-block;
        position: relative;
    }

    .nav-item a::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--blue-color);
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        .nav-item a:hover::after {
            transform: scaleX(1);
        }
    }

    /*#dona-ahora {
        margin: 2.5rem 0;
        list-style: none;
        width: auto;
        background-color: var(--pink-color);
        border-radius: 12px;
    }

    #dona-ahora a {
        font-family: "Montserrat";
        font-size: 1.6rem;
        font-weight: bold;
        text-decoration: none;
        display: block;
        margin: 0 5vw;
        color: #FFFFFF;
        line-height: 5vh;
    }

    #dona-ahora a:hover {
        opacity: 0.8;
    }*/

    #nav-menu.active {
        left: 0;
    }

    #right {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #right select {
        height: 4vh;
        border-radius: 12px;
        background-color: #FFFFFF;
        border: none;
        font-family: "Twemoji Country Flags";
        font-size: 1rem;
    }

    #right select option {
        font-family: "Twemoji Country Flags";
    }

    #hamburger {
        border: none;
        background-color: transparent;
        display: block;
        cursor: pointer;
        padding: 0 5vw;
    }

    @media (prefers-reduced-motion: no-preference) {
        #hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }

        #hamburger.active .bar:nth-child(1) {
            -webkit-transform: translateY(8px) rotate(45deg);
            transform: translateY(8px) rotate(45deg);
        }

        #hamburger.active .bar:nth-child(3) {
            -webkit-transform: translateY(-8px) rotate(-45deg);
            transform: translateY(-8px) rotate(-45deg);
        }
    }
</style>

<!-- Mobile / small screen navbar -->
<nav style="background-color: {$navColor};">
    <a href="/" onclick={() => menuOpen = false}>
        <figure class="navbar-logo">
            <img src="/logos/cic-solo-blanco.svg" alt={$_("logo")}>
        </figure>
    </a>
    <ul id="nav-menu" class={menuOpen ? "active" : ""}>
        <li class="nav-item">
            <a href="/" onclick={() => menuOpen = false}>{$_("navegacion.inicio")}</a>
        </li>
        <li class="nav-item">
            <a href="/sobre-nosotros" onclick={() => menuOpen = false}>{$_("navegacion.sobreNosotros")}</a>
        </li>
        <li class="nav-item">
            <a href="/talleres" onclick={() => menuOpen = false}>{$_("navegacion.talleres")}</a>
        </li>
        <li class="nav-item">
            <a href="/eventos" onclick={() => menuOpen = false}>{$_("navegacion.eventos")}</a>
        </li>
        <li class="nav-item">
            <a href="/becas" onclick={() => menuOpen = false}>{$_("navegacion.becas")}</a>
        </li>
        <!--<li class="nav-item">
            <a href="/" onclick={() => menuOpen = false}>{$_("navegacion.noticias")}</a>
        </li>-->
        <!--<li id="dona-ahora">
            <a href="/" onclick={() => menuOpen = false}>{$_("navegacion.donaAhora")}</a>
        </li>-->
    </ul>
    <section id="right">
        <select name="lenguaje" bind:value={$locale}>
            {#each languages as { code, emoji }}
                <option value={code}>&nbsp;{emoji}</option>
            {/each}
        </select>
        <button id="hamburger" class={menuOpen ? "active" : ""} onclick={() => menuOpen = !menuOpen} aria-label={$_("navegacion.menu")}>
            <span class="bar" style="margin: 0 auto;"></span>
            <span class="bar" style="margin: 5px auto;"></span>
            <span class="bar" style="margin: 0 auto;"></span>
        </button>
    </section>
</nav>
