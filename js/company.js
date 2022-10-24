 class CompanyInfo {
    constructor() {
       
    }

 async getCompanyInfo() {
      try{
        this.createCompanySpinner();
        const urlParams = new URLSearchParams(window.location.search);
        const symbol = urlParams.get('symbol');

        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/${symbol}`
        const response = await fetch(url);
        const results = await response.json();
        this.removeCompanySpinner();
        return results;

      } catch(e){
        return false;
      }
    }
    
   async printCompanyDetails(company){
        const results = await this.getCompanyInfo()

        results.forEach((company) => {
         const companyName = document.getElementById('companyName')
         companyName.innerHTML = company.companyName
         

        const companyLogo = document.getElementById('logo') 
        companyLogo.src = `${company.image}`
       
        const symbolCompany = document.getElementById('symbol')
        symbolCompany.innerHTML = `(${company.symbol})`

        const companyWebsite = document.getElementById('website')
        companyWebsite.setAttribute('href', `${company.website}` )
        companyWebsite.innerHTML = company.website

        const companyDescription = document.getElementById('description')
        companyDescription.innerHTML = company.description
        
        const stockPrice = document.getElementById('stock-price')
        stockPrice.innerHTML = `Stock price: ${company.currency} ${company.price}`

        const stockChangeUI = document.getElementById('stock-change-price')
        const stockChange = (company.changes).toFixed(2)
        if(stockChange >= 0) {
          stockChangeUI.classList.add('text-success')
        } else {
          stockChangeUI.classList.add('text-danger')
        }
        stockChangeUI.innerHTML = `(${stockChange}%)`
        })
        
    }
    createCompanySpinner() {
        const spinnerCompany = document.getElementById('company-spinner')
        spinnerCompany.classList.add('spinner-grow', 'text-info')
    
        
    }
    removeCompanySpinner(){
        const spinnerCompany = document.getElementById('company-spinner');
        spinnerCompany.classList.remove('spinner-grow', 'text-info')
       }

     

}

const companyInfo = new CompanyInfo()
companyInfo.printCompanyDetails();

