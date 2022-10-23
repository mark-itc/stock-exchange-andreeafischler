class Exchange {
    constructor(exchangeObject) {
        
    this.name   = exchangeObject.name;
    this.symbol = exchangeObject.symbol;
    
    }
 createExchangeList() {
        const container = document.getElementById('list-container')
        const listWrapper = document.createElement('div')
        listWrapper.classList.add('list-group-item')
        const exchangeList = document.createElement('a')
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${this.symbol}`
        fetch(url).then(response => {
            return response.json();
        }).then(result => {
            const companyLogo = result[0].image
            const companyLogoUI = document.createElement('img')
            companyLogoUI.setAttribute('style', 'width:30px')
            companyLogoUI.src = companyLogo
            
            const stockChange = (result[0].changes).toFixed(2)
            const stockChangeUI = document.createElement('span')
            stockChangeUI.setAttribute('id', 'stock-Change')
            if(stockChange >= 0) {
                stockChangeUI.classList.add('text-success')
            } else {
                stockChangeUI.classList.add('text-danger')
            }
            stockChangeUI.innerHTML = `(${stockChange}%)`
            
            exchangeList.setAttribute('href', `/company.html?symbol=${this.symbol}`)
            exchangeList.setAttribute('id', 'company-list')
            exchangeList.classList.add('mx-3','text-primary')
            exchangeList.innerHTML = `${this.name} (${this.symbol})`

            listWrapper.appendChild(companyLogoUI)
            listWrapper.appendChild(exchangeList)
            listWrapper.appendChild(stockChangeUI)
            container.appendChild(listWrapper)
            
        }).catch(err => {
            console.error(err)
        })
        return exchangeList
    }

}

class ExchangeSearch {
    constructor() {
        this.query = document.getElementById('search-input').value;
        this.limit = 10;
        this.exchange = "NASDAQ";
        this.createSpinner();
        this.runExchangeSearch();
    }

   async runExchangeSearch() {
        const results = await this.getExchange();
        const container = document.getElementById('list-container')
        container.innerHTML = "";

        const exchangeObject = [];

        results.forEach((item) => {
        const exchange = new Exchange(item)
        exchangeObject.push(exchange);
        const list = exchange.createExchangeList()
        this.removeSpinner()
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
        return results
    }
catch(e) {
   return [];
  }
 
}
}

const searchResult = document.getElementById('search-form')
 searchResult.addEventListener('submit', (e) => {
 e.preventDefault();
 const exchangeSearch = new ExchangeSearch()  
})

