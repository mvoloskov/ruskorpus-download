import download from './download'
import htmlify from './htmlify'

const start = () => {

    const list = Array.from(document.querySelectorAll('.pager ~ ol > li'))
    const pageNumber = document.querySelector('.pager > b').textContent.trim()
    const word = document.querySelector('p.res:nth-child(2n)').textContent.trim().replaceAll(`"`, ``)

    const pollute = () => {
        const style = document.createElement('style')
        style.innerHTML = `
            .pager ~ ol ul {
                padding-left: 0;
            }

            .pager ~ ol li table td:first-child {
                display: flex;
            }

            .rkd {
                position: sticky;
                top: 1rem;
                left: 1rem;
            }

            #rkd-download {
                cursor: pointer;
            }

            #rkd-download:disabled {
                cursor: help;
            }
        `
        document.head.appendChild(style)

        const rkd = document.createElement('div')
        rkd.classList.add('rkd')
        rkd.innerHTML = `
            <button type="button" id="rkd-download">
                Скачать выбранное
            </button>
        `
        const pager = document.querySelector('.pager')
        const pagerParent = pager.parentNode
        pagerParent.insertBefore(rkd, pager.nextSibling)

        list.forEach(elem => {
            const tr = elem.querySelector('tr')
            const firstTd = tr.firstChild
            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('title', 'Скачать этот пример')
            checkbox.classList.add('rkd-checkbox')
            const td = document.createElement('td')
            td.appendChild(checkbox)
            tr.insertBefore(td, firstTd)
        })
    }

    const manageButtonState = () => {
        const button = document.getElementById('rkd-download')
        const checkboxes = Array.from(document.querySelectorAll('.rkd-checkbox'))
        const checked = checkboxes.filter(checkbox => checkbox.checked)
        if (checked.length === 0) {
            button.setAttribute('disabled', 'disabled')
            button.innerHTML = 'Нечего скачивать'
            button.setAttribute('title', 'Выберите примеры, которые хотите скачать')
        } else {
            button.removeAttribute('title')
            button.removeAttribute('disabled')
            button.innerHTML = 'Скачать выбранное'
        }
    }

    const getResults = () => {
        const results = list
        .filter(node => {
            const checkbox = node.querySelector('.rkd-checkbox')
            return checkbox && checkbox.checked
        })
        .map(node => {
            const heading = node.querySelector('span.b-doc-expl').textContent.trim()
            const text = node.querySelector('li').textContent
                .replace('[омонимия снята]', '')
                .replace('[омонимия не снята]', '')
                .replace('←…→', '')
                .trim()
                .replaceAll(word, `<b>${word}</b>`)
            return { heading, text }
        })
    
        const resultsInnerHtml = results.map(result => `
            <li>
                <p><b>${result.heading}</b></p>
                <p>${result.text}</p>
            </li>
        `)
    
        const resultsHtml = `
            <ol>
                ${resultsInnerHtml.join('\n')}
            </ol>
        `

        return resultsHtml
    }

    const downloadFile = () => {
        const results = getResults()
        const filename = `${word} (стр. ${pageNumber}).html`
        const resultsHTML = htmlify(filename, results)
        download(resultsHTML, 'text/html', filename)
    }

    pollute()
    document.getElementById('rkd-download').addEventListener('click', downloadFile)
    Array.from(document.querySelectorAll('.rkd-checkbox')).forEach(node => {
        node.addEventListener('change', manageButtonState)
    })
    manageButtonState()
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    start()
} else {
    document.addEventListener('DOMContentLoaded', start)
}
