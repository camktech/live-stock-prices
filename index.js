$(document).ready(() => {
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

  var chart = Chart('chart', 'Real-Time Sale Prices', salePricePoints, true)

  var updateChart = function(){
    let date = new Date();
    for(let symbol in salePricePoints){
      // salePricePoints[symbol].push({x: date, y: lastSalePrices[symbol] + (Math.random() * 1.4), markerSize: 4})
      salePricePoints[symbol].push({x: date, y: lastSalePrices[symbol], markerSize: 4})
      if(salePricePoints[symbol].length > maxPointsShown){
        salePricePoints[symbol].shift();
      }
    }
    $('#current-time').text(getTime(date));
    if(salePricePoints.aapl[0])
      $('#last-time').text(getTime(new Date(salePricePoints.aapl[0].x)));
    chart.render();
  }

  function updatePrices(data){
    let symbol = data.symbol.toLowerCase();
    lastSalePrices[symbol] = parseFloat(data['lastSalePrice']);
  }

  function updateDate(){
    let date = new Date();
    let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let dateNumber = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let dateText = `${weekdays[date.getDay()]} ${month}/${dateNumber}/${date.getFullYear()}`;
    $('#date').text(dateText);
  }

  function getTime(date){
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${date.getHours()}:${minutes}:${seconds}`;
  }


  const socket = io('https://ws-api.iextrading.com/1.0/tops');
  socket.on('message', (m) => {
    updatePrices(JSON.parse(m));
  });

  socket.on('connect', () => {
    console.log('connected');
    setInterval(() => {updateChart()}, 1000);
    setInterval(() => {updateDate()}, 60000);
    updateDate();
    socket.emit('subscribe', 'aapl,fb,googl');
    $('#connect').click(() => {
      socket.emit('subscribe', 'aapl,fb,googl');
    });

    $('#disconnect').click(() => {
      socket.emit('unsubscribe', 'aapl,fb,googl');
    });
  });

});