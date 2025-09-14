<script lang="ts">
    import { page } from "$app/state";
    import { _, locale } from "svelte-i18n";
    import { PortableText } from "@portabletext/svelte";
    import type { InputValue } from "@portabletext/svelte";
    import { navColor } from "$lib/stores/nav-color";
    import { fadeInAnim } from "$lib/actions/fadeInAnim";
    import Modal from "$lib/components/Modal.svelte";

    navColor.set("#07446E");

    let showModal = $state(false);
    let seleccionado = $state(0);

    // Tipos de datos para procesar talleres de Sanity
    type Multilingual<T> = {
        en: T,
        es: T,
        fr: T
    };

    type TallerUnprocessed = {
        titulo: Multilingual<string>,
        duracion: Multilingual<string>,
        descripcion: Multilingual<InputValue>,
        image: string
    };

    type Taller = {
        nombre: string,
        duracion: string,
        descripcion: InputValue | undefined,
        image: string
    };

    // Transformar query raw de Sanity en array de Talleres
    function transformTaller(data: TallerUnprocessed[], lang: string) {
        return data.map(item => ({
            nombre: item.titulo[lang as keyof Multilingual<string>],
            duracion: item.duracion[lang as keyof Multilingual<string>],
            descripcion: item.descripcion[lang as keyof Multilingual<InputValue>],
            image: item.image
        })) as Taller[];
    }

    async function submitContactForm(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            workshop: formData.get("workshop"),
            message: formData.get("message")
        };

        const res = await fetch("/api/contact.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert($_("talleres.contactForm.mensajeExito"));
            form.reset();
        }
        else {
            alert($_("talleres.contactForm.mensajeError"));
        }
    }

    // Abrir y cerrar modal con información de talleres
    function openModal(tallerIndex: number) {
        seleccionado = tallerIndex;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    const talleres = $derived(transformTaller(page.data.talleres, $locale ?? "es"));
</script>

<style>
    #talleres-title, #talleres-title section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #talleres-title {
        width: 100%;
        margin-top: 6vh;
    }

    #talleres-title section {
        width: fit-content;
    }

    #talleres-title section {
        position: relative;
    }

    #talleres-title h1 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2rem;
        color: var(--blue-color);
        margin: 0;
    }

    #talleres-title p {
        margin: 0;
        font-family: "Montserrat";
        font-size: 1.2rem;
        color: var(--blue-color);
        margin: 4vh 2vw 0 2vw;
        text-align: center;
    }

    #talleres-title h1:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--pink-color);
    }

    #talleres-permanentes {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5vh;
    }

    #talleres-permanentes section {
        margin-bottom: 8vh;
        width: 95%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-radius: 28px;
    }

    .taller-permanente {
        width: 28vw;
        height: 45vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 26px 26px 24px 24px;
        background-color: #FFFFFF;
        margin: 2vh 0;
    }

    .taller-permanente figure {
        width: 100%;
        height: 40vh;
    }

    .taller-permanente img {
        width: 100%;
        height: 35vh;
        object-fit: cover;
        border-radius: 24px 24px 0 0;
    }

    .taller-permanente button {
        border: none;
        background-color: transparent;
        display: inline-block;
        cursor: pointer;
        font-family: "Archivo Black";
        font-weight: normal;
        color: var(--blue-color);
        font-size: 1.2rem;
        line-height: 1.5rem;
        margin: 3vh 0 3vh 0;
        position: relative;
    }

    .taller-permanente button::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--pink-color);
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        .taller-permanente button:hover::after {
            transform: scaleX(1);
        }
    }

    @media (max-width: 680px) {
        #talleres-permanentes section {
            flex-direction: column;
        }

        .taller-permanente {
            width: 80vw;
        }
    }

    #modal-taller {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #modal-taller-titulo {
        align-self: center;
        position: relative;
        width: fit-content;
    }

    #modal-taller h2 {
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 1.5rem;
        color: var(--blue-color);
        margin: 0;
        text-align: center;
    }

    #modal-taller h2:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--pink-color);
    }

    #modal-taller p {
        margin: 0;
        font-family: "Montserrat";
        font-size: 1rem;
        color: var(--blue-color);
        margin: 2vh 0 0 0;
    }

    #contact-form-article {
        width: 85%;
        margin: 0 auto 5vh auto;
        background-color: var(--blue-color);
        border-radius: 28px;
        padding: 4vh 5vw;
    }

    #contact-form-article h2 {
        color: white;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 1.5rem;
        text-align: center;
    }

    #contact-form {
        display: flex;
        flex-direction: column;
        gap: 2vh;
        font-family: "Montserrat";
    }

    #contact-form > div {
        display: flex;
        flex-direction: column;
    }

    #contact-form label {
        color: white;
        margin-bottom: 0.5vh;
        font-weight: bold;
    }

    #contact-form input,
    #contact-form select,
    #contact-form textarea {
        padding: 1vh 1vw;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-family: "Montserrat";
        background-color: #FFFFFF;
    }

    #contact-form input:focus,
    #contact-form select:focus,
    #contact-form textarea:focus {
        outline: 2px solid var(--pink-color);
    }

    .submit-button {
        align-self: center;
        color: white;
        font-family: "Archivo Black";
        font-weight: normal;
        font-size: 1.2rem;
        border: none;
        border-radius: 20px;
        padding: 1vh 2vw;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover {
        opacity: 0.8;
    }
</style>

<article id="talleres-title">
    <section>
        <h1>{$_("talleres.talleresPermanentes")}</h1>
    </section>

    <section>
        <p>
            {$_("talleres.subtituloTalleresPermanentes")}
        </p>
    </section>
</article>

<article id="talleres-permanentes">
    {#each { length: Math.ceil(talleres.length / 3) }, i}
        <section style="background-color: {i % 2 == 0 ? "var(--pink-color)" : "var(--blue-color)"};">

            {#each talleres.slice(i * 3, (i + 1) * 3).entries() as [index, taller]}
                <div use:fadeInAnim class="taller-permanente">
                    <figure>
                        <img src={taller.image} alt={taller.nombre}>
                    </figure>

                    <button onclick={() => openModal(i * 3 + index)}>
                        {taller.nombre}
                    </button>
                </div>
            {/each}

        </section>
    {/each}
</article>

<article id="contact-form-article" style="background-color: {Math.ceil(talleres.length / 3) % 2 == 0 ? "var(--pink-color)" : "var(--blue-color)"};">
    <h2>
        {$_("talleres.contactForm.titulo")}
    </h2>

    <form use:fadeInAnim id="contact-form" onsubmit={submitContactForm}>
        <div>
            <label for="name">{$_("talleres.contactForm.nombre")}</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="phone">{$_("talleres.contactForm.celular")}</label>
            <input type="phone" id="phone" name="phone" required>
        </div>

        <div>
            <label for="email">{$_("talleres.contactForm.correo")}</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div>
            <label for="workshop">{$_("talleres.contactForm.tallerInteres")}</label>
            <select id="workshop" name="workshop" required>
                <option value="">{$_("talleres.contactForm.seleccionaTaller")}</option>

                {#each talleres as taller}
                    <option value={taller.nombre}>{taller.nombre}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="message">{$_("talleres.contactForm.mensaje")}</label>
            <textarea id="message" name="message" rows="4" required></textarea>
        </div>

        <button type="submit" class="submit-button" style="background-color: {Math.ceil(talleres.length / 3) % 2 == 0 ? "var(--blue-color)" : "var(--pink-color)"};">{$_("talleres.contactForm.enviar")}</button>
    </form>
</article>

<Modal open={showModal} onClose={closeModal}>
    <article id="modal-taller">
        <section id="modal-taller-titulo">
            <h2>{$_("talleres.prefijo")} {talleres[seleccionado].nombre} {$_("talleres.sufijo")} ({talleres[seleccionado].duracion})</h2>
        </section>

        <p>
            <PortableText value={talleres[seleccionado].descripcion}></PortableText>
        </p>
    </article>
</Modal>
