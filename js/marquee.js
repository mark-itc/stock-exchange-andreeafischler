  class Marquee {
    constructor() {
     this.limit = 20
     this.loadMarquee = this.loadMarquee.bind(this)
     this.getAPICompanyList = this.getAPICompanyList.bind(this)
    }
   
    async loadMarquee() {
        const results = await this.getAPICompanyList();
        this.createMarquee(results)
        }

    createMarquee(companies) {
      const marqueeElement = document.getElementById('marquee')
      
      companies.forEach(company=> {
      const symboleSpan = document.createElement('span')
      symboleSpan.innerHTML = company.symbol
      symboleSpan.style.paddingLeft = '10px'

      const priceSpan = document.createElement('span')
      priceSpan.innerHTML = `$${company.price}`
      priceSpan.classList.add('text-success')
      priceSpan.style.paddingRight = "20px"
    
      marqueeElement.appendChild(symboleSpan)
      marqueeElement.appendChild(priceSpan)
    
      
      })
      return marqueeElement
    }

    async getAPICompanyList() {
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${this.limit}`
        const response = await fetch(url)
        const results = await response.json()
        return results;
  }

  }
const marqueeInstance = new Marquee();
marqueeInstance.loadMarquee();