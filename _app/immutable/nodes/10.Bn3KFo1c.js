import{r as e}from"../chunks/rlieBAMJ.js";import{B as t,C as n,O as r,Z as i,at as a,dt as o,ft as s,gt as c,j as l,k as u,ot as d,q as f,rt as p,u as m,w as h}from"../chunks/CJAei1do.js";import"../chunks/CP97kCR3.js";import{a as g,t as _}from"../chunks/C3Hj-5mA.js";import{t as v}from"../chunks/B3yRhEkI.js";import{t as y}from"../chunks/0FDFfm_12.js";var b=e({load:()=>x}),x=async()=>({title:`Documentos de transparencia - CIC`,description:``,documentos:await y.fetch(`
        *[_type == "transparencia"]{
        _createdAt,
        titulo,
        "documento": documento.asset->url
        } | order(_createdAt asc)
    `)}),S=l(`<a target="_blank" rel="noopener noreferrer" class="svelte-zgk0la"> </a>`),C=l(`<div class="svelte-zgk0la"></div>`);function w(e,l){s(l,!0);let y=()=>d(g,`$locale`,b),[b,x]=a();_.set(`#07446E`);function w(e,t){return e.map(e=>({nombre:e.titulo[t],documento:e.documento}))}let T=p(()=>w(v.data.documentos,y()??`es`));var E=C();n(E,21,()=>t(T),h,(e,n)=>{var a=S(),o=i(a,!0);c(a),f(()=>{m(a,`href`,t(n).documento),r(o,t(n).nombre)}),u(e,a)}),c(E),u(e,E),o(),x()}export{w as component,b as universal};