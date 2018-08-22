function Chartt(id, title, salePricePoints, showXLabels){
  let options = {
    title:{
      text: title
    },
    type: 'line',
    axisY: {
      includeZero: false,
    },
    toolTip: {
      contentFormatter: function (e) {
        // return CanvasJS.formatDate(e.entries[0].dataPoint.x, "hh:mm:ss");
        return "$" + e.entries[0].dataPoint.y;
      }
    },
    data: [
     {
      type: 'line',
      dataPoints: salePricePoints
    },
    ]
  };

  if(showXLabels){
    options.options = {
      scales: {
        xAxes: [{
          time: {
            unit: 'second'
          },
        }]
      }
    };

    options.axisX = {
      labelAngle: -45,
      labelFontSize: 10,
      tickThickness: 1,
      labelAutoFit: false,
      valueFormatString: 'hh:mm:ss'
    };
  }

  return new CanvasJS.Chart(id, options);
}