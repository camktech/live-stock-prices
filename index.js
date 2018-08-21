$(document).ready(() => {
  // $.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5', (data) => {
  //   console.log(data)
  // });

// var dps = [{dataPoints: []}, {dataPoints: []}];
// var aaplPrices = [];
// var googlPrices = [];
// var fbPrices = [];
var lastSalePrices = {
  aapl: null,
  googl: null,
  fb: null
}
var salePricePoints = {
  aapl: [],
  googl: [],
  fb: []
}
var maxPointsShown = 20;
var chart = new CanvasJS.Chart('chart', {
  title:{
    text: 'AAPL'
  },
  axisY: {
    includeZero: false,
    scaleBreaks: {
      autoCalculate: false,
      // collapsibleThreshold: "10%",
      type: "wavy",
      customBreaks: [
        {
        startValue: 174,
        endValue: 216,
        type: "wavy"
        },
        {
        startValue: 220,
        endValue: 1220,
        type: "wavy"
        }
      ],
    }
  },
  axisX: {
    labelAngle: -45,
    labelAutoFit: false,
    valueFormatString: 'hh:mm:ss'
  },
  data: [
    {
      type: 'line',
      dataPoints: salePricePoints.aapl
    },
    {
      type: 'line',
      dataPoints: salePricePoints.googl
    },
    {
      type: 'line',
      dataPoints: salePricePoints.fb
    }
  ],
      options: {
        scales: {
            xAxes: [{
                time: {
                  unit: 'second'
                },
            }]
        }
    }
});

var updateChart = function(){
  // let y = parseFloat(data['lastSalePrice']).toFixed(2);
  let now = new Date();
  let x = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`
  console.log(salePricePoints)
  for(let symbol in salePricePoints){
    // console.log(salePricePoints[symbol])
    salePricePoints[symbol].push({x: new Date(), t: new Date(), y: lastSalePrices[symbol]})
    if(salePricePoints[symbol].length > maxPointsShown){
      salePricePoints[symbol].shift();
    }
  }
  chart.render();
  console.log('updateChart')
}

function updatePrices(data){
  let symbol = data.symbol.toLowerCase();
  lastSalePrices[symbol] = parseFloat(data['lastSalePrice']);
}


  const socket = io('https://ws-api.iextrading.com/1.0/tops');
  socket.on('message', (m) => {
    updatePrices(JSON.parse(m));
    console.log('message')
    console.log(m)

  });

  socket.on('connect', () => {
    console.log('connected');
    setInterval(() => {updateChart()}, 1000);
    // $('#connect').click(() => {
      // socket.emit('subscribe', 'aapl');
      socket.emit('subscribe', 'aapl,fb,googl');
    // });

    $('#disconnect').click(() => {
      socket.emit('unsubscribe', 'aapl, fb, googl');
    });
  });

});