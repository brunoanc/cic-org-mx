import type { PageLoad } from "./$types";
import { client } from "$lib/sanity";

export const load: PageLoad = async () => {
    const query = `
        *[_type == "transparencia"]{
        _createdAt,
        titulo,
        "documento": documento.asset->url
        } | order(_createdAt asc)
    `;

    const documentos = await client.fetch(query);

    return {
        title: "Documentos de transparencia - CIC",
        description: "",
        documentos: documentos
    };
};
