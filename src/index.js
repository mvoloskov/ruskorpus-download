import download from './download'
import htmlify from './htmlify'

const start = () => {
    
    const list = Array.from(document.querySelectorAll('.pager ~ ol > li'))
    const pageNumber = document.querySelector('.pager > b').textContent.trim()
    const word = document.querySelector('p.res:nth-child(2n)').textContent.trim().replaceAll(`"`, ``)
    const results = list.map(node => {
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
    const filename = `${word} (стр. ${pageNumber}).html`
    const resultsHTML = htmlify(filename, resultsHtml)
    download(resultsHTML, 'text/html', filename)
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    start()
} else {
    document.addEventListener('DOMContentLoaded', start)
}
