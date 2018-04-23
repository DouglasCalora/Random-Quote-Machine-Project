var App = function() {
  var elementMensage = document.getElementById('random-mensagem')
  var badge = document.getElementById('badge')
  var footer = document.getElementById('footer')
  var sentence = ''
  var randomCategoriy = '' 
  
  // consome api
  this.getSentenceFromApi = function(callback) {
    var request = new XMLHttpRequest()
  // faz algo quando api é carregada  
    request.onload = function() {
      var response = JSON.parse(request.response)

      callback(response)
    }
    
    request.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/?count=2')
    request.setRequestHeader('X-Mashape-Key', 'wQb7frEwYemshVONMLHsEBO0WlLWp12aCYyjsnrPxGE2vWFC6u')
    request.send()
  }

  // função que mostra carregando toda vez que nova frase é chamada
  this.showLoader = function() {
    elementMensage.innerHTML = 'Carregando...'
    badge.innerHTML = ''
    footer.innerHTML = 'Carregando...'
  }

  // função que direciona frase gerada para twitter
  this.twitterUrl = function() {
    return 'https://twitter.com/intent/tweet?hashtags=' + encodeURIComponent(randomCategory) + '&text=' + encodeURIComponent(sentence)
  }

  // pega função gerada e mostra no html
  this.getSentence = function() {
    this.showLoader()

    this.getSentenceFromApi(function(response) {
      elementMensage.innerHTML = response.quote
      footer.innerHTML = response.author
      badge.innerHTML = "#" + response.category
      sentence = response.quote + " - " + response.author
      randomCategory = response.category;
    })
    
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var app = new App()
  var generateSentenceButton = document.querySelector('.generate-sentence')
  var twitterButton = document.querySelector('.twitter-button')

  app.getSentence()

  generateSentenceButton.addEventListener('click', function() {
    app.getSentence()
  })

  twitterButton.addEventListener('click', function() {
    this.href = app.twitterUrl()
  })
})