<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { isLoading } from "svelte-i18n";
    import { page } from "$app/state";
    import DesktopNav from "$lib/components/DesktopNav.svelte";
    import MobileNav from "$lib/components/MobileNav.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { mobileInterface } from "$lib/stores/mobile-interface";
    import "$lib/i18n";

    let { children } = $props();
    let mediaQuery: MediaQueryList;

    function mediaQueryHandler(ev: MediaQueryListEvent) {
        mobileInterface.set(ev.matches);
    }

    onMount(() => {
        mediaQuery = window.matchMedia("(max-width: 680px)");
        mobileInterface.set(mediaQuery.matches);
        mediaQuery.addEventListener("change", mediaQueryHandler);
    });

    onDestroy(() => {
        mediaQuery?.removeEventListener("change", mediaQueryHandler);
    });
</script>

<style>
    @media (min-width: 821px) {
        #mobile-nav {
            display: none;
        }
    }

    @media (max-width: 820px) {
        #desktop-nav {
            display: none;
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        :global(.reveal) {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        :global(.reveal.visible) {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

<svelte:head>
    <title>{page.data.title}</title>
    <meta name="description" content={page.data.description}>
    <link rel="canonical" href="https://cic.org.mx{page.url.pathname == "/" ? "" : page.url.pathname}">

    <meta property="og:title" content="{page.data.title}">
    <meta property="og:image" content="https://cic.org.mx/img/banner.png">
    <meta property="og:description" content="{page.data.description}">
    <meta property="og:site_name" content="Complejo Integral de Cultura">
</svelte:head>

{#if !$isLoading}
    <header id="desktop-nav">
        <DesktopNav></DesktopNav>
    </header>

    <header id="mobile-nav">
        <MobileNav></MobileNav>
    </header>

    <main class:body-index-style={page.url.pathname == "/"}>
        {@render children()}
    </main>

    <Footer></Footer>
{/if}
