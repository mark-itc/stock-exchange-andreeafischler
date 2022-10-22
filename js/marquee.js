  class Marquee {
    constructor() {
      this.limit = 17
      this.symbol = ""
      this.price = ""
     this.loadAPIList()
    }
   
    async loadAPIList() {
        const marqueeUI = document.getElementById('marquee')
        const results = await this.getAPICompanyList();
        
       
        const dataSymbol = results.map((dataSymbol, index) => {
         
          return dataSymbol.symbol
        })

        const dataPrice = results.map((dataPrice, index) => { 
          return dataPrice.price
        })
        

        this.symbol = dataSymbol.join(' ')
        this.price  = dataPrice.join(' ')

        
         
        const symbolCompany = document.createElement('span')
        symbolCompany.setAttribute('id', 'symbol-company')
        symbolCompany.classList.add('text-dark')
        
         
       
        console.log('symbol company', symbolCompany)

        
        marqueeUI.appendChild(symbolCompany);
        
      
    }

    async getAPICompanyList() {
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${this.limit}`
        const response = await fetch(url)
        const results = await response.json()
        return results;
  }


}

// const marqueeInstance = new Marquee();