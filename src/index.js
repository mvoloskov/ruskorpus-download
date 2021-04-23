import download from './download'

const start = () => {
  
  const list = Array.from(document.querySelectorAll('.pager ~ ol > li'))
  const word = document.querySelector('p.res:nth-child(2n)').textContent.trim().replaceAll(`"`, ``)
  const results = list.map(node => {
    const heading = node.querySelector('span.b-doc-expl').textContent.trim()
    const text = node.querySelector('li').textContent.trim()
      .replace('\n\n             \n            [омонимия снята]\n            \n\n\n             \n             ←…→', '')
      .replace('\n\n             \n            [омонимия не снята]\n            \n\n\n             \n             ←…→', '')
      .replace('\n             ', '')
      // .replaceAll(word, `<b>${word}</b>`)
      .replaceAll(word, `[${word}]`)
    return { heading, text }
  })

  // console.log(word, results[0])

  // const resultsInnerHtml = results.map(result => `
  //   <li>
  //     <p><b>${result.heading}</b></p>
  //     <p>${result.text}</p>
  //   </li>
  // `)

  // const resultsHtml = `
  //   <ol>
  //     ${resultsInnerHtml.join('\n')}
  //   </ol>
  // `

  const resultsText = results.map(result => `${result.heading}\n\t${result.text}\n`).join('\n')
  download(resultsText, 'text/txt', 'results.txt')
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  start()
} else {
  document.addEventListener('DOMContentLoaded', start)
}
