const e=()=>{const e=Array.from(document.querySelectorAll(".pager ~ ol > li")),t=document.querySelector(".pager > b").textContent.trim(),n=document.querySelector("p.res:nth-child(2n)").textContent.trim().replaceAll('"',""),r=()=>{const e=document.getElementById("rkd-download");0===Array.from(document.querySelectorAll(".rkd-checkbox")).filter((e=>e.checked)).length?(e.setAttribute("disabled","disabled"),e.innerHTML="Нечего скачивать",e.setAttribute("title","Выберите примеры, которые хотите скачать")):(e.removeAttribute("title"),e.removeAttribute("disabled"),e.innerHTML="⬇ Скачать выбранное")},o=()=>{const e=Array.from(document.querySelectorAll(".rkd-checkbox")),t=e.filter((e=>e.checked));return t.length>0&&t.length!==e.length};"kwic"===new URLSearchParams(window.location.search).get("out")||((()=>{const t=document.createElement("style");t.innerHTML="\n            .content.narrow {\n                max-width: 50rem;\n                margin: 0 auto;\n            }\n\n            .pager ~ ol ul {\n                padding-left: 0;\n            }\n\n            .pager ~ ol li table td:first-child {\n                display: flex;\n            }\n\n            .rkd {\n                position: sticky;\n                top: 1rem;\n                left: 1rem;\n                display: inline-flex;\n                background: white;\n                padding: 1rem;\n                border: 1px solid rgba(0, 0, 0, .5);\n                border-radius: 5px;\n                font-family: sans-serif;\n                font-size: small;\n            }\n\n            .rkd-checkbox {\n                width: 20px;\n                height: 20px;\n            }\n\n            .rkd button {\n                cursor: pointer;\n            }\n\n            #rkd-download {\n                margin-right: 1rem;\n            }\n\n            #rkd-download:disabled {\n                cursor: help;\n            }\n\n            #rkd-narrow {\n                margin-left: 1rem;\n            }\n        ",document.head.appendChild(t);const n=document.createElement("div");n.classList.add("rkd"),n.innerHTML='\n            <button type="button" id="rkd-download"></button>\n\n            <span>\n                <button type="button" id="rkd-all">\n                    Выделить все\n                </button>\n                <button type="button" id="rkd-none">\n                    Снять выделение\n                </button>\n                <label>\n                    <input type="checkbox" id="rkd-narrow">\n                    Узкая страница\n                </label>\n            </span>\n        ';const r=document.querySelector(".pager");r.parentNode.insertBefore(n,r.nextSibling),e.forEach((e=>{const t=e.querySelector("tr"),n=t.firstChild,r=document.createElement("input");r.setAttribute("type","checkbox"),r.setAttribute("title","Скачать этот пример"),r.classList.add("rkd-checkbox");const o=document.createElement("td");o.appendChild(r),t.insertBefore(o,n)}))})(),document.getElementById("rkd-download").addEventListener("click",(()=>{const r=`\n            <ol>\n                ${e.filter((e=>{const t=e.querySelector(".rkd-checkbox");return t&&t.checked})).map((e=>({heading:e.querySelector("span.b-doc-expl").textContent.trim(),text:e.querySelector("li").textContent.replace("[омонимия снята]","").replace("[омонимия не снята]","").replace("←…→","").trim().replaceAll(n,`<b>${n}</b>`)}))).map((e=>`\n            <li>\n                <p><b>${e.heading}</b></p>\n                <p>${e.text}</p>\n            </li>\n        `)).join("\n")}\n            </ol>\n        `,o=`${n} (стр. ${t}).html`;((e,t,n)=>{const r=new Blob([e],{type:t}),o=document.createElement("a");o.download=n,o.href=URL.createObjectURL(r),o.dataset.downloadurl=[t,o.download,o.href].join(":"),o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o),setTimeout((()=>URL.revokeObjectURL(o.href)),1500)})(`\n    <!DOCTYPE html>\n    <html lang="ru">\n\n    <head>\n        <meta charset="utf-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n\n        <title>${o}</title>\n        <style>\n            body {\n                max-width: 50rem;\n                line-height: 1.5;\n                margin: 3rem auto;\n            }\n        </style>\n    </head>\n\n    <body>\n        ${r}\n    </body>\n\n    </html>\n`,"text/html",o)})),Array.from(document.querySelectorAll(".rkd-checkbox")).forEach((e=>{e.addEventListener("change",r)})),r(),document.getElementById("rkd-all").addEventListener("click",(()=>{if(o()){if(!confirm("Выделить все?"))return}Array.from(document.querySelectorAll(".rkd-checkbox")).forEach((e=>e.checked=!0)),r()})),document.getElementById("rkd-none").addEventListener("click",(()=>{if(o()){if(!confirm("Снять выделение?"))return}Array.from(document.querySelectorAll(".rkd-checkbox")).forEach((e=>e.checked=!1)),r()})),document.getElementById("rkd-narrow").addEventListener("change",(e=>{window.localStorage.setItem("rkd-narrow",e.target.checked?"true":"false"),document.querySelector(".content").classList.toggle("narrow",e.target.checked)})),(()=>{const e="true"===window.localStorage.getItem("rkd-narrow");document.getElementById("rkd-narrow").checked=e,document.querySelector(".content").classList.toggle("narrow",e)})())};"interactive"===document.readyState||"complete"===document.readyState?e():document.addEventListener("DOMContentLoaded",e);