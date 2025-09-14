<script lang="ts">
    import { page } from "$app/state";
    import { _, locale } from "svelte-i18n";
    import { navColor } from "$lib/stores/nav-color";

    navColor.set("#07446E");

    // Tipos de datos para procesar documentos de Sanity
    type Multilingual<T> = {
        en: T,
        es: T,
        fr: T
    };

    type DocumentoUnprocessed = {
        titulo: Multilingual<string>,
        documento: string
    };

    type Documento = {
        nombre: string,
        documento: string
    };

    // Transformar query raw de Sanity en array de Talleres
    function transformarDocumento(data: DocumentoUnprocessed[], lang: string) {
        return data.map(item => ({
            nombre: item.titulo[lang as keyof Multilingual<string>],
            documento: item.documento
        })) as Documento[];
    }

    const documentos = $derived(transformarDocumento(page.data.documentos, $locale ?? "es"));
</script>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10vh;
    }

    a {
        font-family: "Montserrat";
        font-size: 1rem;
        color: var(--blue-color);
        margin: 1vh 0;
        text-align: center;
    }

    a:visited {
        color: var(--blue-color);
    }
</style>

<div>
    {#each documentos as doc}
        <a href={doc.documento} target="_blank" rel="noopener noreferrer">
            {doc.nombre}
        </a>
    {/each}
</div>
