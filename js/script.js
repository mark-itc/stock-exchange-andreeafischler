class Exchange {
    constructor(exchangeObject) {
    this.name   = exchangeObject.name;
    this.symbol = exchangeObject.symbol;
    }
    createExchangeList() {
        const exchangeList = document.createElement('a')
        exchangeList.setAttribute('href', `/company.html?symbol=${this.symbol}`)
        exchangeList.classList.add('list-group-item', 'text-primary')
        exchangeList.innerHTML = `${this.name} (${this.symbol})`
        return exchangeList
    }
    
}

class ExchangeSearch {
    constructor() {
        this.query = "";
        this.limit = 10;
        this.exchange = "NASDAQ";
        const searchResult = document.getElementById('search-form')
        searchResult.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createSpinner();
            this.runExchangeSearch();
        })
    }

   async runExchangeSearch() {
        this.query = document.getElementById('search-input').value
        const results = await this.getExchange();
        const container = document.getElementById('list-container')
        
        const exchangeObject = [];

        results.forEach((item) => {
        const exchange = new Exchange(item)
        exchangeObject.push(exchange);
        const list = exchange.createExchangeList()
        container.appendChild(list)
   }) 
    
  }
  createSpinner() {
    const spinner = document.getElementById('spinner')
    spinner.classList.add('spinner-grow', 'spinner-grow-sm')
    
}
  removeSpinner(){
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('spinner-grow', 'spinner-grow-sm')
   }
  async getExchange() {
    try {
        
        const url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?' + 'query=' + this.query + '&limit=' + this.limit + '&exchange=' + this.exchange
        const response = await fetch(url);
        const results = await response.json();
        this.removeSpinner()
        return results
    }
catch(e) {
   return []; 

  }
  
}

 
}

const exchangeSearch = new ExchangeSearch()

   