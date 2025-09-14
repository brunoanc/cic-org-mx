<script lang="ts">
    import { _, json } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";
    import OrgNode from "$lib/components/OrgNode.svelte";

    navColor.set("#07446E");
</script>

<svelte:head>
    <style>
        body {
            min-height: 100vh;
        }
    </style>
</svelte:head>

<style>
    .org-chart-wrapper {
        width: 100vw;
        overflow: hidden;
        padding: 2rem;
        box-sizing: border-box;
        white-space: nowrap;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .org-chart {
        position: relative;
        display: inline-block;
        transform-origin: top center;
    }

    #orgchart-title {
        width: 100%;
        margin: 2vh 0 2vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #orgchart-title h1 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2rem;
        color: var(--blue-color);
        margin: 0;
        position: relative;
    }

    #orgchart-title h1::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--pink-color);
        bottom: -5px;
        left: 0;
    }
</style>

<article id="orgchart-title">
    <h1>{$_("organigrama.titulo")}</h1>
</article>

<div class="org-chart-wrapper">
    <div class="org-chart">
        {#await $json("organigrama.datos") then datos}
            <OrgNode node={datos}></OrgNode>
        {/await}
    </div>
</div>
