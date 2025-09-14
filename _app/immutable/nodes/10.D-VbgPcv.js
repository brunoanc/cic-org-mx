import{c as v}from"../chunks/BT0gCgyI.js";import"../chunks/DsnmJJEf.js";import{p as g,f as l,b as c,c as $,K as r,aI as b,r as m,d as h,t as y,e as x}from"../chunks/BX2_hQti.js";import{n as k,e as z,i as C,a as j}from"../chunks/CWCUhBwG.js";import{s as q}from"../chunks/DIMkd9SZ.js";import{s as A,a as D}from"../chunks/DywlzWfm.js";import{p as I}from"../chunks/BlXtxVpC.js";const O=async()=>({title:"Documentos de transparencia - CIC",description:"",documentos:await v.fetch(`
        *[_type == "transparencia"]{
        _createdAt,
        titulo,
        "documento": documento.asset->url
        } | order(_createdAt asc)
    `)}),G=Object.freeze(Object.defineProperty({__proto__:null,load:O},Symbol.toStringTag,{value:"Module"}));var S=l('<a target="_blank" rel="noopener noreferrer" class="svelte-zgk0la"> </a>'),w=l('<div class="svelte-zgk0la"></div>');function H(s,n){g(n,!0);const u=()=>D(j,"$locale",p),[p,i]=A();k.set("#07446E");function d(a,t){return a.map(e=>({nombre:e.titulo[t],documento:e.documento}))}const f=b(()=>d(I.data.documentos,u()??"es"));var o=w();z(o,21,()=>r(f),C,(a,t)=>{var e=S(),_=h(e,!0);m(e),y(()=>{q(e,"href",r(t).documento),x(_,r(t).nombre)}),c(a,e)}),m(o),c(s,o),$(),i()}export{H as component,G as universal};
