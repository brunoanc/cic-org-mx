import type { PageLoad } from "./$types";
import { client } from "$lib/sanity";

export const load: PageLoad = async () => {
    const query = `*[_type == "beca"]{
        _createdAt,
        titulo,
        descripcion,
        "convocatoria": convocatoria.asset->url,
        formulario,
        "images": images[].asset->url
        } | order(_createdAt desc)
    `;

    const becas = await client.fetch(query);

    return {
        title: "Becas - CIC",
        description: "Conoce las oportunidades de apoyo económico para acceder a educación artística y cultural.",
        becas: becas
    };
};
