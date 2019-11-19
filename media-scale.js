window.onload = function() {
  const region = document.getElementById('region')
  const shares = document.getElementById('shares')
  const articleList = document.getElementById('article-list')
  const articleContainer = articleList.parentNode

  document.addEventListener('change', evt => {
    const url = `https://disinfo.quaidorsay.fr/api/media-scale/1.0/around?region=${region.value}&shares=${shares.value}`

    if (region.value && shares.value) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const articles = Object.keys(data).map(key => ({
            media: key,
      			title: data[key].title,
            url: data[key].url,
            date: data[key].date,
      		}))

          while (articleList.firstChild) {
             articleList.removeChild(articleList.firstChild);
          }

          if (articles.length) {
            articles.forEach(article => {
              let el = document.createElement('li')
              el.classList.add('article')
              el.innerHTML = `<h3><a href="${article.url}">${article.title}</a></h3><div class="meta"><span class="media">${article.media}</span> published on <time datetime="${article.date}">${article.date}</time></div>`
              articleList.appendChild(el)
              articleContainer.classList.remove('hidden')
            })
          }
        })
    }
  })
}
