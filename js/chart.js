const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Stock Price History',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

function createChartSpinner() {
    const spinnerCompany = document.getElementById('chart-spinner')
    spinnerCompany.classList.add('spinner-grow', 'text-danger')

};

function removeChartSpinner(){
    const spinnerCompany = document.getElementById('chart-spinner');
    spinnerCompany.classList.remove('spinner-grow', 'text-danger')
   }


function updateChart() {
    async function fetchHistoricalData() {
        createChartSpinner();
        const urlParams = new URLSearchParams(window.location.search);
        const symbol = urlParams.get('symbol');
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    
        const response = await fetch(url);
        const results = await response.json();
        removeChartSpinner();
        return results;
    }
    fetchHistoricalData().then(results => {
        const date = results.historical.reverse().map((date) => { 
            return date.date
        });

        const value = results.historical.reverse().map((value) => {
         return value.close
        }) 
        myChart.config.data.labels = date
        myChart.config.data.datasets[0].data = value;
        myChart.update();
    })

   }
  
updateChart();







