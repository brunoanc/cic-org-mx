<script lang="ts">
    import { _ } from "svelte-i18n";
    import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<style>
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--blue-color);
        margin-top: auto;
    }

    #footer-top {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 4vh 0;
    }

    #border {
        width: 2px;
        background-color: var(--pink-color);
        margin: 3vh 0;
    }

    #logo-redes {
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }

    #navegacion {
        flex: 8;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    figure {
        margin: 0;
        display: flex;
    }

    #logo-redes img {
        width: 60%;
        height: auto;
        margin: auto;
    }

    #links-redes {
        width: 60%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 2vh;
    }

    #links-redes a {
        font-size: 1.2rem;
        color: #FFFFFF;
    }

    #links-redes a:hover {
        opacity: 0.8;
    }

    #links-redes a:visited {
        color: #FFFFFF;
    }

    ul {
        list-style: none;
        padding: 0;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
    }

    li {
        font-family: "Montserrat";
        font-size: 1rem;
        font-weight: bold;
        color: var(--pink-color);
    }

    li:before {
        content: "⟶";
        padding-right: 1ch;
    }

    li a {
        color: #FFFFFF;
        text-decoration: none;
        display: inline-block;
        position: relative;
    }

    li a:visited {
        color: #FFFFFF;
    }

    li a::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #FFFFFF;
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        li a:hover::after {
            transform: scaleX(1);
        }
    }

    #copyright {
        margin: 0 10vw 2vh 10vw;
        font-family: "Montserrat";
        font-size: 1rem;
        color: #FFFFFF;
        text-align: center;
    }

    @media (max-width: 680px) {
        #footer-top {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #border {
            height: 2px;
            background-color: var(--pink-color);
            width: 80%;
            margin: 2vh 0;
        }

        #logo-redes {
            flex: unset;
        }

        #navegacion {
            flex: unset;
            width: 100%;
            justify-content: space-evenly;
        }

        #links-redes a {
            font-size: 2rem;
        }

        ul {
            margin: 0;
        }

        li a {
            font-size: 1.2rem;
            line-height: 2rem;
        }
    }
</style>

<footer>
    <article id="footer-top">
        <section id="logo-redes">
            <figure>
                <img src="/logos/cic-blanco.svg" alt={$_("logo")}>
            </figure>

            <section id="links-redes">
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=61572131561809" aria-label="Facebook">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/cic_cufa" aria-label="Instagram">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/complejo-integral-de-cultura-cic-098622348" aria-label="Linkedin">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/5219626225328" aria-label="WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="mailto:complejointegral@cic.org.mx" aria-label="Email">
                    <i class="fa-solid fa-envelope"></i>
                </a>
            </section>
        </section>

        <div id="border"></div>

        <section id="navegacion">
            <ul>
                <li><a href="/">{$_("navegacion.inicio")}</a></li>
                <li><a href="/sobre-nosotros">{$_("navegacion.sobreNosotros")}</a></li>
                <li><a href="/talleres">{$_("navegacion.talleres")}</a></li>
                <li><a href="/eventos">{$_("navegacion.eventos")}</a></li>
            </ul>

            <ul>
                <li><a href="/becas">{$_("navegacion.becas")}</a></li>
                <!--<li><a href="/">{$_("navegacion.noticias")}</a></li>-->
                <!--<li><a href="/">{$_("navegacion.donaAhora")}</a></li>-->
                <li><a href="/preguntas-frecuentes">{$_("navegacion.preguntasFrecuentes")}</a></li>
                <li><a href="/organigrama">{$_("navegacion.organigrama")}</a></li>
                <li><a href="/transparencia">{$_("navegacion.transparencia")}</a></li>
            </ul>
        </section>
    </article>

    <article id="copyright">
        &copy; {new Date().getFullYear()} CIC. {$_("footer.derechos")} &mdash; {$_("footer.copyright")}
    </article>
</footer>
