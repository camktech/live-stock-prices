$(document).ready(() => {
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

  var chart = Chartt('chart1', 'AAPL', salePricePoints.aapl, true)
  var chart2 = Chartt('chart2', 'FB', salePricePoints.fb, true)
  var chart3 = Chartt('chart3', 'GOOGL', salePricePoints.googl, true)

  var updateChart = function(){
    for(let symbol in salePricePoints){
      salePricePoints[symbol].push({x: new Date(), y: lastSalePrices[symbol], markerSize: 2})
      if(salePricePoints[symbol].length > maxPointsShown){
        salePricePoints[symbol].shift();
      }
    }
    chart.render();
    chart2.render();
    chart3.render();
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
      socket.emit('unsubscribe', 'aapl,fb,googl');
    });
  });

});