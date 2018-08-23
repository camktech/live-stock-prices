function Chart(id, title, salePricePoints, showXLabels){
  let aaplColor = "#33cc33", 
    googlColor = "#cc4444", 
    fbColor = "#048ba8";

  let options = {
    type: 'line',
    backgroundColor: '#eee',
    axisY: [
      {
        tickColor: aaplColor,
        labelFontColor: aaplColor,
        labelFontSize: 12,
        prefix: '$',
        includeZero: false,
        gridThickness: 0,
        gridColor: aaplColor,
        labelFormatter: (e) => {
          return `${parseFloat(e.value).toFixed(2)}`
        }
      },
      {
        tickColor: googlColor,
        labelFontColor: googlColor,
        labelFontSize: 12,
        prefix: '$',
        includeZero: false,
        gridThickness: 0,
        gridColor: googlColor,
        labelFormatter: (e) => {
          return `${parseFloat(e.value).toFixed(2)}`
        }
      },
      {
        tickColor: fbColor,
        labelFontColor: fbColor,
        labelFontSize: 12,
        prefix: '$',
        includeZero: false,
        gridThickness: 0,
        gridColor: fbColor,
        labelFormatter: (e) => {
          return `${parseFloat(e.value).toFixed(2)}`
        }
      }
    ],
    legend: {
      verticalAlign: "top"
    },
    toolTip: {
      contentFormatter: function (e) {
        let date = new Date(e.entries[0].dataPoint.x);
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        let content = `<div style='width:100%; text-align:center; font-weight:bold;'>${date.getHours()}:${minutes}:${seconds}</div>`;

        e.entries.forEach((e) => {
          content += "<div><span style='color: " + e.dataSeries.color + "; display:inline-block; width:70px;'>" + e.dataSeries.name + ":</span> <span>$" + parseFloat(e.dataPoint.y).toFixed(2) + "</span></div>";
        });

        return content;
      },
      shared: true
    },
    data: [
      {
        type: 'line',
        dataPoints: salePricePoints.aapl,
        axisYIndex: 0,
        showInLegend: true,
        name: 'AAPL',
        color: aaplColor
      },
      {
        type: 'line',
        dataPoints: salePricePoints.googl,
        axisYIndex: 1,
        showInLegend: true,
        name: 'GOOGL',
        color: googlColor
      },
      {
        type: 'line',
        dataPoints: salePricePoints.fb,
        axisYIndex: 2,
        showInLegend: true,
        name: 'FB',
        color: fbColor
      }
    ]
  };

  if(showXLabels){
    // options.options = {
    //   scales: {
    //     xAxes: [{
    //       time: {
    //         unit: 'second'
    //       },
    //     }]
    //   }
    // };

    options.axisX = {
      // labelAngle: -45,
      labelFontSize: 0,
      tickThickness: 0,
      margin: 20
      // labelAutoFit: false,
      // valueFormatString: 'hh:mm:ss'
    };
  }

  return new CanvasJS.Chart(id, options);
}