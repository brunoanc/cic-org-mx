<script lang="ts">
    import { onMount, tick } from "svelte";
    import OrgNode from "./OrgNode.svelte";

    let { node } = $props();

    let childrenContainer: HTMLDivElement | undefined = $state();
    let lineLeft = $state(0);
    let lineWidth = $state(0);

    // Actualiza las líneas horizontales del organigrama basado en la posición de cada hijo
    async function updateLine() {
        await tick();
        if (!childrenContainer || !node.children?.length) return;

        const children = Array.from(childrenContainer.children)
            .filter(el => el.classList.contains("child")) as HTMLElement[];

        if (children.length < 2) {
            lineLeft = 0;
            lineWidth = 0;
            return;
        }

        const containerRect = childrenContainer.getBoundingClientRect();
        const firstRect = children[0].getBoundingClientRect();
        const lastRect = children[children.length - 1].getBoundingClientRect();

        const startX = (firstRect.left + firstRect.width / 2 - containerRect.left);
        const endX = (lastRect.left + lastRect.width / 2 - containerRect.left);

        lineLeft = startX;
        lineWidth = endX - startX;
    }

    onMount(() => {
        updateLine();

        // Trazar líneas de nuevo en cada actualización de tamaño
        window.addEventListener("resize", updateLine);
        return () => window.removeEventListener("resize", updateLine);
    });

    // Trazar líneas en cada actualización de datos
    $effect(() => {
        node;
        updateLine();
    });
</script>

<style>
    .org-node {
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 4px solid var(--pink-color);
        border-radius: 0.5rem;
        padding: 0.5rem;
        background: #fff;
        min-width: 5vw;
        max-width: 10vw;
        box-shadow: 0 4px 3px rgba(0,0,0,0.1);
    }

    .card img {
        width: 6vw;
        height: 6vw;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.5rem;
    }

    .card p {
        font-family: "Montserrat";
        font-size: 0.5rem;
        font-weight: bold;
        color: var(--blue-color);
        text-align: center;
        white-space: pre-line;
    }

    .children {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        position: relative;
        gap: 1.5vw;
    }

    .children.single::before {
        display: none;
    }

    .child {
        position: relative;
        padding-top: 1rem;
    }

    .child::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 1rem;
        background: var(--pink-color);
    }

    .line-down {
        width: 4px;
        height: 2rem;
        background: var(--pink-color);
        position: relative;
        margin: 0 auto;
    }

    .custom-line {
        position: absolute;
        top: 0;
        height: 4px;
        background: var(--pink-color);
    }

    @media (max-width: 680px) {
        .children {
            flex-direction: column;
            gap: 1.5vh;
        }

        .card {
            width: 80vw;
            max-width: unset;
        }

        .child {
            padding-top: 0;
        }

        .card img {
            width: 20vw;
            height: 20vw;
        }

        .card p {
            font-size: 1rem;
        }
    }
</style>

<div class="org-node">
    <div class="card">
        {#if node.image}
            {#if Array.isArray(node.image)}
                {#each node.image as img}
                    <img src={img} alt={node.name}>
                {/each}
            {:else}
                <img src={node.image} alt={node.name}>
            {/if}
        {/if}

        <p>{node.name}</p>
    </div>

    {#if node.children}
        <div class="line-down"></div>

        <div class="children {node.children.length > 1 ? "multi" : "single"}" bind:this={childrenContainer}>
            <div class="custom-line" style="left: {lineLeft}px; width: {lineWidth}px;"></div>

            {#each node.children as child}
                <div class="child">
                    <OrgNode node={child}></OrgNode>
                </div>
            {/each}
        </div>
    {/if}
</div>
