// const apiKey = env.process.APIKEY
//let publishedAt = moment(item['publishedAt']).fromNow()
//
const pageSize = 10
let page = 1;
let newsList = []
const callApi = async(page) => {
    let url = `https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&page=${page}&country=us&apiKey=249bf4912ae946d8a6e66405c3c10690`
    let data = await fetch(url)
    let result = await data.json()
    newsList = newsList.concat(result.articles)
    render(newsList)
}

callApi(page)

let storyNumber = 0;
let result = []
const render = (list) => {
    let newsHTML = list.map((item, index) => {
        let publishedAt = moment(item['publishedAt']).fromNow()
        return `
    <div id="newsListArea">
    <div class="card mb-3" style="max-width: 800px;">
    <div class="row no-gutters">
      <div class="col-md-4">
      <a href="${item.url}"><img src="${item.urlToImage}" class="card-img luke-image" alt="news-image" ></a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><a href="${item.url}">${item.title}</a></h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">
          <small class="text-muted">${item.author}</small>
          <small class="text-muted">${item.source.name}</small>
          <small class="text-muted">${publishedAt}</small>
          </p>
          </div>
      </div>
    </div>
  </div>
    </div>`
    })
    storyNumber += 1
    document.getElementById("number").innerHTML = ` loaded ${storyNumber * pageSize}s `
    document.getElementById("newsListArea").innerHTML = newsHTML
}


const loadMore = () => {
    page++
    callApi(page)
    return
}