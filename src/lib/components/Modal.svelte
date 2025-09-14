<script lang="ts">
    import { _ } from "svelte-i18n";

    let { open, onClose, children } = $props();
</script>

<style>
    #modal-parent {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #backdrop {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    #modal {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        min-width: 300px;
        margin: 0 10vw;
        max-height: 80vh;
        overflow: scroll;
        width: fit-content;
        z-index: 2;
    }

    @media (max-width: 680px) {
        #modal {
            margin: 0 5vw;
        }
    }

    button {
        margin-top: 2vh;
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

    button span {
        margin: 0 1vw;
    }

    button:hover {
        opacity: 0.8;
    }
</style>
  
{#if open}
    <div id="modal-parent">
        <div id="backdrop" onclick={onClose} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? onClose() : null}></div>

        <div id="modal">
            {@render children()}
            <button onclick={onClose}><span>{$_("cerrar")}</span></button>
        </div>
    </div>
{/if}
