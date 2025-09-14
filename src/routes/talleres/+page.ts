import type { PageLoad } from "./$types";
import { client } from "$lib/sanity";

export const load: PageLoad = async () => {
    const query = `
        *[_type == "taller"]{
        _createdAt,
        slug,
        titulo,
        duracion,
        descripcion,
        "image": image.asset->url
        } | order(_createdAt asc)
    `;

    const talleres = await client.fetch(query);

    return {
        title: "Talleres - CIC",
        description: "Conoce nuestra selección de talleres en diversas disciplinas artísticas.",
        talleres: talleres
    };
};
