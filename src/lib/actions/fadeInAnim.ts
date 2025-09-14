import type { Action } from "svelte/action";

let animObserver: IntersectionObserver | null = null;

function getObserver() {
    if (!animObserver) {
        animObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0.65) {
                    entry.target.classList.add("visible");
                }
                else if (entry.intersectionRatio < 0.25) {
                    entry.target.classList.remove("visible");
                }
            });
        }, {
            threshold: [0,  0.1, 0.25, 0.5, 0.75, 1],
        });
    }

    return animObserver;
}

export const fadeInAnim: Action<HTMLElement> = (node) => {
    node.classList.add("reveal");

    const obs = getObserver();
    obs.observe(node);

    return {
        destroy() {
            if (obs) {
                obs.unobserve(node);
            }
        }
    };
};
