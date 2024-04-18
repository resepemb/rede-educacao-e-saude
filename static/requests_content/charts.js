import define1 from "/d/ff90685a875a43ac.js?v=3&resolutions=e51eb9b22f4aea47@1494";

function _1(md){return(
md`# Charts`
)}

async function _2(md,FileAttachment){return(
md`A collection of importable, *ready-to-use* chart controllers.  
All charts support patterns (through [\`CanvasPatterns\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern)) and custom color palletes.  
Made with [Chart.js](https://www.chartjs.org).

[<img width="600px" src="${await FileAttachment(
  "charts.png"
).url()}" />](#pieAnchor)

**Overview** 
  * [\`Pie and Doughnut charts\`](#pie_doughnut_anchor)
    - [\`Pie\`](#pieAnchor)
    - [\`Doughnut\`](#doughnutAnchor)
  * [\`Bar charts\`](#barAnchor)
    - [\`Vertical\`](#verticalBarAnchor)
    - [\`Horizontal\`](#horizontalBarAnchor)
    - [\`Stacked vertical\`](#stackedBarAnchor)
    - [\`Stacked horizontal\`](#stackedHorizontalBarAnchor)
  * [\`Line charts\`](#linesAnchor)
    - [\`Basic\`](#basicAnchor)
    - [\`Filled\`](#filledAnchor)
    - [\`Stacked\`](#stackedLineAnchor)


  * [\`Customization\`](#customization)
    - [\`Colors\`](#customizeColors)
      - [\`Pre-defined color schemes\`](#predefinedColorSchemes)
      - [\`Custom array of colors and patterns\`](#customColorArray)
    - [\`Width / Height \`](#customizeSize)
    - [\`Datalabels\`](#datalabels)
    - [\`Axis labels\`](#axislabels)
    - [\`Other dataset properties, chart options, and labels\`](#datasetProperties)
    - [\`What about mixed charts? Other plugins? Feature {insert_feature}?\`](#whatAbout)
    
`
)}

function _pie_doughnut_anchor(md){return(
md`___
## Pie and Doughnut charts`
)}

function _pieAnchor(md){return(
md`### Pie`
)}

function _5(md){return(
md`
\`\`\`js
import { pie } from '@chrispahm/charts'

pie([
  { name: "D", value: 0.448 },
  { name: "C", value: 0.308 },
  { name: "E", value: 0.130 },
  { name: "B", value: 0.093 },
  { name: "A", value: 0.014 }
])
\`\`\`
`
)}

function _6(pie,dataset){return(
pie(dataset)
)}

function _7(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) as a background color:`
)}

function _8(pie,patterns){return(
pie({
  data: [
    { name: 'A', value: 0.1 },
    { name: 'B', value: 0.25 },
    { name: 'C', value: 0.65 }
  ],
  colorScheme: [patterns[5], '#bf9b83', '#386887'],
  datasetOptions: {
    borderWidth: 3
  },
  pattern: true
})
)}

function _9(md){return(
md`For generating patterns based on a colour value, the [patternomaly](https://www.npmjs.com/package/patternomaly) library may be used.`
)}

function _10(html){return(
html`
<span style="background-color: black; color: white; padding: 0px 5px 0px 5px; font-family: sans-serif;"><b>A CHART TITLE</b></span>
<br>
<span style="font-family: sans-serif; font-size: 12px;">(VALUES IN PERCENT)</span>
`
)}

function _11(pie,pattern){return(
pie({
  data: [
    {
      name: "Others",
      value: 0.101
    },
    {
      name: "Group A",
      value: 0.303
    },
    {
      name: "Group B",
      value: 0.302
    },
    {
      name: "Group C",
      value: 0.292
    }
  ],
  colorScheme: [
    pattern.draw("line", "#E4D2BD"),
    "#C4B0A0",
    "#B6B7B1",
    "#6c6c89"
  ],
  pattern: true,
  width: 350,
  datasetOptions: {
    borderWidth: 1
  },
  options: {
    rotation: -0.25 * Math.PI,
    plugins: {
      outlabels: {
        backgroundColor: "white",
        padding: {
          top: 2,
          right: 2,
          bottom: 2,
          left: 10
        },
        text: function (context) {
          const index = context.dataIndex;
          const label = context.labels[index];
          const value = context.dataset.data[index]; // you can get the percentages with context.percent;
          return `${label.toUpperCase()}\n${Math.round(value * 1000) / 10}`;
        },
        lineColor: "black",
        lineWidth: 0.25,
        color: "black",
        offsetLine: 8,
        font: {
          resizable: false,
          titleStyle: "italic",
          titleSize: 10,
          style: "bold"
        },
        textAlign: "left"
      }
    }
  }
})
)}

function _pie(d3,DOM,fac,Chart,merge){return(
function pie(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData
    };
  }
  // fill with defaults
  chartData.labelField = chartData.labelField || 'name';
  chartData.valueField = chartData.valueField || 'value';
  if (chartData.colorScheme && !Array.isArray(chartData.colorScheme)) {
    chartData.colorScheme = d3[chartData.colorScheme];
  } else if (!chartData.colorScheme) {
    chartData.colorScheme = d3.schemeTableau10;
  }
  chartData.width = chartData.width || 320;
  chartData.height = chartData.height || 320;
  chartData.options = chartData.options || {};

  const chartDefaults = {
    responsive: false,
    zoomOutPercentage: 50, // makes chart 40% smaller (50% by default, if the preoprty is undefined)
    plugins: {
      legend: false,
      outlabels: {
        text: '%l: %p',
        color: 'white',
        backgroundColor(context) {
          var index = context.dataIndex;
          var color = context.dataset.backgroundColor[index];
          if (chartData.pattern) {
            const canvas = DOM.canvas(50, 50);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 50, 50);
            console.log(context.dataset);
            return fac.getColor(canvas).hex;
          }
          return color;
        },
        lineColor(context) {
          var index = context.dataIndex;
          var color = context.dataset.backgroundColor[index];
          if (chartData.pattern) {
            const canvas = DOM.canvas(50, 50);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 50, 50);
            console.log(context.dataset);
            return fac.getColor(canvas).hex;
          }
          return color;
        },
        stretch: 35,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        }
      },
      datalabels: false
    }
  };

  let c = DOM.canvas(chartData.width, chartData.height);

  new Chart(c.getContext("2d"), {
    type: chartData.type || 'outlabeledPie',
    data: {
      labels: chartData.data.map(d => d[chartData.labelField]),
      datasets: [
        {
          backgroundColor: chartData.colorScheme,
          data: chartData.data.map(d => d[chartData.valueField]),
          ...chartData.datasetOptions
        }
      ]
    },
    options: merge(chartDefaults, chartData.options)
  });

  return c;
}
)}

function _doughnutAnchor(md){return(
md`___

### Doughnut`
)}

function _14(md){return(
md`
\`\`\`js
import { doughnut } from '@chrispahm/charts'

doughnut([
  { name: "D", value: 0.448 },
  { name: "C", value: 0.308 },
  { name: "E", value: 0.130 },
  { name: "B", value: 0.093 },
  { name: "A", value: 0.014 }
])
\`\`\`
`
)}

function _15(doughnut,dataset){return(
doughnut(dataset)
)}

function _16(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) as a background color:`
)}

function _17(doughnut,patterns){return(
doughnut({
  data: [
    { name: 'A', value: 0.1 },
    { name: 'B', value: 0.25 },
    { name: 'C', value: 0.65 }
  ],
  colorScheme: [patterns[5], '#bf9b83', '#386887'],
  pattern: true
})
)}

function _doughnut(pie){return(
function doughnut(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      type: 'outlabeledDoughnut'
    };
  } else {
    chartData.type = 'outlabeledDoughnut';
  }
  return pie(chartData);
}
)}

function _barAnchor(md){return(
md`___

## Bar charts`
)}

function _verticalBarAnchor(md){return(
md`### Vertical`
)}

function _21(md){return(
md`
\`\`\`js
import { bar } from '@chrispahm/charts'

bar([
  { name: "Category 1", 'Dataset 1': 423, 'Dataset 2': 212 },
  { name: "Category 2", 'Dataset 1': 250, 'Dataset 2': -80 },
  { name: "Category 3", 'Dataset 1': 40, 'Dataset 2': 510 }
])
\`\`\`
`
)}

function _22(verticalBar,datasetBars){return(
verticalBar(datasetBars)
)}

function _horizontalBarAnchor(md){return(
md`___
### Horizontal`
)}

function _24(md){return(
md`
\`\`\`js
import { horizontalBar } from '@chrispahm/charts'

horizontalBar([
  { name: "Category 1", 'Dataset 1': 423, 'Dataset 2': 212 },
  { name: "Category 2", 'Dataset 1': 250, 'Dataset 2': -80 },
  { name: "Category 3", 'Dataset 1': 40, 'Dataset 2': 510 }
])
\`\`\`
`
)}

function _25(horizontalBar,datasetBars){return(
horizontalBar(datasetBars)
)}

function _stackedBarAnchor(md){return(
md`___
### Stacked vertical`
)}

function _27(md){return(
md`
\`\`\`js
import { stackedBar } from '@chrispahm/charts'

stackedBar([
  { name: "Category 1", 'Dataset 1': 423, 'Dataset 2': 212 },
  { name: "Category 2", 'Dataset 1': 250, 'Dataset 2': -80 },
  { name: "Category 3", 'Dataset 1': 40, 'Dataset 2': 510 }
])
\`\`\`
`
)}

function _28(stackedBar,datasetBars){return(
stackedBar(datasetBars)
)}

function _29(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) as a background color:`
)}

function _30(stackedBar,datasetBars,patterns){return(
stackedBar({
  data: datasetBars,
  colorScheme: ['#CA5860', patterns[9]],
  datasetOptions: {
    borderColor: '#f5f5f5'
  }
})
)}

function _stackedHorizontalBarAnchor(md){return(
md`___
### Stacked horizontal`
)}

function _32(md){return(
md`
\`\`\`js
import { stackedHorizontalBar } from '@chrispahm/charts'

stackedHorizontalBar([
  { name: "Category 1", 'Dataset 1': 423, 'Dataset 2': 212 },
  { name: "Category 2", 'Dataset 1': 250, 'Dataset 2': -80 },
  { name: "Category 3", 'Dataset 1': 40, 'Dataset 2': 510 }
])
\`\`\`
`
)}

function _33(stackedHorizontalBar,datasetBars){return(
stackedHorizontalBar(datasetBars)
)}

function _34(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) as a background color:`
)}

function _35(stackedHorizontalBar,datasetBars,patterns){return(
stackedHorizontalBar({
  data: datasetBars,
  colorScheme: ['#3E6C8A', patterns[5]],
  datasetOptions: {
    borderColor: '#ececec'
  }
})
)}

function _stackedHorizontalBar(bar){return(
function stackedHorizontalBar(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      type: 'horizontalBar',
      width: 320,
      height: 200,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  } else {
    chartData.type = 'horizontalBar';
    if (!chartData.width) chartData.width = 320;
    if (!chartData.height) chartData.height = 200;
    chartData.options = {
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      },
      ...chartData.options
    };
  }
  return bar(chartData);
}
)}

function _stackedBar(bar){return(
function stackedBar(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  } else {
    chartData.options = {
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      },
      ...chartData.options
    };
  }
  return bar(chartData);
}
)}

function _horizontalBar(bar){return(
function horizontalBar(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      type: 'horizontalBar',
      width: 320,
      height: 200
    };
  } else {
    chartData.type = 'horizontalBar';
    if (!chartData.width) chartData.width = 320;
    if (!chartData.height) chartData.height = 200;
  }
  return bar(chartData);
}
)}

function _verticalBar(bar){return(
function verticalBar(chartData) {
  return bar(chartData);
}
)}

function _bar(d3,DOM,Chart,merge){return(
function bar(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData
    };
  }
  // fill with defaults
  chartData.labelField = chartData.labelField || 'name';
  if (chartData.colorScheme && !Array.isArray(chartData.colorScheme)) {
    chartData.colorScheme = d3[chartData.colorScheme];
  } else if (!chartData.colorScheme) {
    chartData.colorScheme = d3.schemeTableau10;
  }
  chartData.width = chartData.width || 320;
  chartData.height = chartData.height || 320;
  chartData.options = chartData.options || {};

  const chartDefaults = {
    responsive: false,
    plugins: {
      datalabels: false
    }
  };

  if (chartData.options.responsive === undefined) {
    chartData.options.responsive = false;
  }
  if (chartData.options.plugins === undefined) {
    chartData.options.plugins = {
      datalabels: false
    };
  } else if (chartData.options.plugins.datalabels === undefined) {
    chartData.options.plugins.datalabels = false;
  }

  let c = DOM.canvas(chartData.width, chartData.height);

  new Chart(c.getContext("2d"), {
    type: chartData.type || 'bar',
    data: {
      labels: chartData.data.map(d => d[chartData.labelField]),
      datasets: Object.keys(chartData.data[0])
        .filter(
          key => key !== chartData.labelField && !isNaN(chartData.data[0][key])
        )
        .map((key, i) => {
          const datasetOptions = {
            borderWidth: 3,
            borderColor: 'white',
            ...chartData.datasetOptions
          };

          return {
            backgroundColor: chartData.colorScheme[i],
            data: chartData.data.map(d => d[key]),
            label: key,
            ...datasetOptions
          };
        })
    },
    options: merge(chartDefaults, chartData.options)
  });

  return c;
}
)}

function _linesAnchor(md){return(
md`___

## Line charts`
)}

function _basicAnchor(md){return(
md`### Basic`
)}

function _43(md){return(
md`
\`\`\`js
import { line } from '@chrispahm/charts'

line([
  { name: "Category 1", 'Dataset 1': 612, 'Dataset 2': 23 },
  { name: "Category 2", 'Dataset 1': 312, 'Dataset 2': 720 },
  { name: "Category 3", 'Dataset 1': 520, 'Dataset 2': 583 }
])
\`\`\`
`
)}

function _44(line,datasetLines){return(
line(datasetLines)
)}

function _filledAnchor(md){return(
md`___
### Filled

\`\`\`js
import { filledLine } from '@chrispahm/charts'

filledLine([
  { name: "Category 1", 'Dataset 1': 612, 'Dataset 2': 23 },
  { name: "Category 2", 'Dataset 1': 312, 'Dataset 2': 720 },
  { name: "Category 3", 'Dataset 1': 520, 'Dataset 2': 583 }
])
\`\`\`
`
)}

function _46(filledLine,datasetLines){return(
filledLine(datasetLines)
)}

function _47(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) as a background color:`
)}

function _48(filledLine,datasetLines,patterns){return(
filledLine({
  data: datasetLines,
  colorScheme: [patterns[2], patterns[3]],
  datasetOptions: {
    borderColor: 'brown',
    pointBackgroundColor: 'white'
  },
  pattern: true
})
)}

function _stackedLineAnchor(md){return(
md`___
### Stacked

\`\`\`js
import { stackedLine } from '@chrispahm/charts'

stackedLine([
  { name: "Category 1", 'Dataset 1': 612, 'Dataset 2': 23 },
  { name: "Category 2", 'Dataset 1': 312, 'Dataset 2': 720 },
  { name: "Category 3", 'Dataset 1': 520, 'Dataset 2': 583 }
])
\`\`\`
`
)}

function _50(stackedLine,datasetLines){return(
stackedLine(datasetLines)
)}

function _51(md){return(
md`Using a [\`CanvasPattern\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern):`
)}

function _52(stackedLine,datasetLines,patterns){return(
stackedLine({
  data: datasetLines,
  colorScheme: [patterns[2], patterns[3]],
  datasetOptions: {
    borderColor: 'brown',
    pointBackgroundColor: 'white'
  },
  pattern: true
})
)}

function _stackedLine(line){return(
function stackedLine(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      stacked: true,
      fill: true,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    };
  } else {
    chartData.stacked = true;
    chartData.fill = true;
    chartData.options = {
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      },
      ...chartData.options
    };
  }
  return line(chartData);
}
)}

function _filledLine(line){return(
function filledLine(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData,
      fill: true
    };
  } else {
    chartData.fill = true;
  }
  return line(chartData);
}
)}

function _line(d3,DOM,Chart,hexToRGB,merge){return(
function line(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData
    };
  }
  // fill with defaults
  chartData.labelField = chartData.labelField || 'name';

  if (chartData.colorScheme && !Array.isArray(chartData.colorScheme)) {
    chartData.colorScheme = d3[chartData.colorScheme];
  } else if (!chartData.colorScheme) {
    chartData.colorScheme = d3.schemeTableau10;
  }
  console.log(Array.isArray(chartData.colorScheme));
  chartData.width = chartData.width || 320;
  chartData.height = chartData.height || 320;
  chartData.options = chartData.options || {};

  const chartDefaults = {
    responsive: false,
    plugins: {
      datalabels: false
    }
  };

  if (chartData.options.responsive === undefined) {
    chartData.options.responsive = false;
  }
  if (chartData.options.plugins === undefined) {
    chartData.options.plugins = {
      datalabels: false
    };
  } else if (chartData.options.plugins.datalabels === undefined) {
    chartData.options.plugins.datalabels = false;
  }

  let c = DOM.canvas(chartData.width, chartData.height);

  new Chart(c.getContext("2d"), {
    type: 'line',
    data: {
      labels: chartData.data.map(d => d[chartData.labelField]),
      datasets: Object.keys(chartData.data[0])
        .filter(
          key => key !== chartData.labelField && !isNaN(chartData.data[0][key])
        )
        .map((key, i) => {
          const gradient = c
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);
          if (!chartData.pattern) {
            gradient.addColorStop(0, hexToRGB(chartData.colorScheme[i], 0.5));
            gradient.addColorStop(0.5, hexToRGB(chartData.colorScheme[i], 0.2));
            gradient.addColorStop(1, hexToRGB(chartData.colorScheme[i], 0.01));
          }

          let backgroundColor = gradient;
          if (chartData.stacked && !chartData.pattern)
            backgroundColor = hexToRGB(chartData.colorScheme[i], 0.85);
          if (chartData.pattern) backgroundColor = chartData.colorScheme[i];

          const datasetOptions = {
            borderWidth: 3,
            radius: 4,
            pointBackgroundColor: chartData.stacked
              ? chartData.colorScheme[i]
              : 'white',
            borderColor: chartData.stacked ? 'white' : chartData.colorScheme[i],
            ...chartData.datasetOptions
          };

          return {
            backgroundColor: backgroundColor,
            fill: chartData.fill || false,
            data: chartData.data.map(d => d[key]),
            label: key,
            ...datasetOptions
          };
        })
    },
    options: merge(chartDefaults, chartData.options)
  });

  return c;
}
)}

function _linePattern(DOM,Chart,patterns){return(
function linePattern(chartData) {
  if (Array.isArray(chartData)) {
    chartData = {
      data: chartData
    };
  }
  // fill with defaults
  chartData.labelField = chartData.labelField || 'name';

  chartData.width = chartData.width || 350;
  chartData.height = chartData.height || 350;
  chartData.options = chartData.options || {
    responsive: false,
    plugins: {
      datalabels: false
    }
  };

  if (chartData.options.responsive === undefined) {
    chartData.options.responsive = false;
  }
  if (chartData.options.plugins === undefined) {
    chartData.options.plugins = {
      datalabels: false
    };
  } else if (chartData.options.plugins.datalabels === undefined) {
    chartData.options.plugins.datalabels = false;
  }
  let c = DOM.canvas(chartData.width, chartData.height);

  new Chart(c.getContext("2d"), {
    type: 'line',
    data: {
      labels: chartData.data.map(d => d[chartData.labelField]),
      datasets: Object.keys(chartData.data[0])
        .filter(
          key => key !== chartData.labelField && !isNaN(chartData.data[0][key])
        )
        .map((key, i) => {
          return {
            backgroundColor: patterns[i + 9],
            // fill: chartData.fill || true,
            borderWidth: 3,
            radius: 4,
            pointBackgroundColor: patterns[i + 5],
            borderColor: 'white',
            data: chartData.data.map(d => d[key]),
            label: key
          };
        })
    },
    options: chartData.options
  });

  return c;
}
)}

function _customization(md){return(
md`___

## Customization`
)}

function _58(md){return(
md`All charts allow for additional customization. Instead of just passing an array of objects (like we are doing in most of the examples above), we may **pass an object** with additional styling info.  
The following section will cover the available options in detail:`
)}

function _customizeColors(md){return(
md`### Colors`
)}

function _predefinedColorSchemes(md){return(
md`#### Pre-defined d3 color schemes`
)}

function _61(md){return(
md`You may use any of the [\`d3-scale-chromatic\`](https://github.com/d3/d3-scale-chromatic#categorical) categorial color schemes by passing the color schemes name as a string in the \`colorScheme\` property `
)}

function _62(pie,dataset){return(
pie({
  data: dataset,
  colorScheme: 'schemePastel1'
})
)}

function _customColorArray(md){return(
md`#### Custom color array`
)}

function _64(md){return(
md`You may also pass an array of colors in the \`colorScheme\` property.`
)}

function _65(doughnut,dataset){return(
doughnut({
  data: dataset,
  // color array copied from https://observablehq.com/@makio135/give-me-colors
  colorScheme: ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"]
})
)}

function _66(md){return(
md`The color array may also include [\`CanvasPatterns\`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern).     
In this case, make sure to pass \`pattern: true\` as well.`
)}

function _67(bar,patterns){return(
bar({
  data: [
    { name: "Category 1", "Dataset 1": 423, "Dataset 2": 0, "Dataset 3": 0 },
    { name: "Category 2", "Dataset 1": 0, "Dataset 2": 350, "Dataset 3": 0 },
    { name: "Category 3", "Dataset 1": 0, "Dataset 2": 0, "Dataset 3": 20 }
  ],
  // color array copied from https://observablehq.com/@makio135/give-me-colors
  // patterns by RJ Andrews https://github.com/infowetrust/albumcolors
  colorScheme: [patterns[3], "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
  pattern: true
})
)}

function _68(doughnut,dataset,patterns){return(
doughnut({
  data: dataset,
  // color array copied from https://observablehq.com/@makio135/give-me-colors
  // patterns by RJ Andrews https://github.com/infowetrust/albumcolors
  colorScheme: [patterns[3], "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
  pattern: true
})
)}

function _customizeSize(md){return(
md`___

### Width / Height`
)}

function _70(md){return(
md`You may pass a custom width and/or height ([Number](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number)) to the chart instance`
)}

function _71(stackedHorizontalBar,datasetBars,width){return(
stackedHorizontalBar({
  data: datasetBars,
  width: width,
  height: 150
})
)}

function _datalabels(md){return(
md`___

### Adding datalabels`
)}

function _73(md){return(
md`For the available bar/line chart label configuration options, see [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/samples/scriptable/interactions.html). 

For pie/doughnut charts, please refer to the options outlined in the [charjs-plugin-piechart-outlables](https://piechart-outlabels.netlify.app) plugin.`
)}

function _74(stackedBar,datasetBars){return(
stackedBar({
  data: datasetBars,
  datasetOptions: {
    datalabels: {
      anchor(context) {
        const value = context.dataset.data[context.dataIndex];
        return value > 100 ? 'end' : 'center';
      },
      align(context) {
        const value = context.dataset.data[context.dataIndex];
        return value > 100 ? 'start' : 'center';
      }
    }
  },
  options: {
    plugins: {
      datalabels: {
        color: 'white',
        display: function(context) {
          return context.dataset.data[context.dataIndex] > 20;
        },
        font: {
          weight: 'bold'
        },
        formatter: Math.round
      }
    }
  }
})
)}

function _axislabels(md){return(
md`___

### Axis labels`
)}

function _76(verticalBar,datasetBars){return(
verticalBar({
  data: datasetBars,
  options: {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Expenditures (€/y)'
          }
        }
      ]
    }
  }
})
)}

function _datasetProperties(md){return(
md`___

### Dataset properties, chart options, and data labels

If you'd like to change settings such as the border width / color etc you may pass these in the \`datasetOptions\` property. The properties are applied to **all** datasets.   
All available options are listed in the official [Chart.js documentation](https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties) for the respective chart type.
`
)}

function _78(filledLine,datasetLines,patterns){return(
filledLine({
  data: datasetLines,
  colorScheme: ['rgba(255,255,180,0.7)', patterns[8]],
  datasetOptions: {
    borderColor: '#e0d496',
    borderWidth: 5,
    pointBackgroundColor: '#fcf281',
    pointHitRadius: 25,
    pointHoverRadius: 0,
    pointRadius: 0
  },
  options: {
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    }
  },
  pattern: true
})
)}

function _79(md){return(
md`Especially for the / doughnut charts it may be necessary to alter the labels to show values instead of percentages. The following example shows how to do that (together with some other options):`
)}

function _80(pie,patterns){return(
pie({
  data: [
    { name: 'A', value: 120 },
    { name: 'B', value: 270 },
    { name: 'C', value: 653 }
  ],
  width: 420,
  colorScheme: [patterns[10], '#bf9b83', '#386887'],
  datasetOptions: {
    borderWidth: 3
  },
  pattern: true,
  options: {
    zoomOutPercentage: 60,
    plugins: {
      outlabels: {
        text: 'Arc %l\'s value: $%v'
      }
    }
  }
})
)}

function _whatAbout(md){return(
md`___

### What about mixed charts? Other plugins? Feature {insert_feature}?

The main purpose of this collection is to allow for creating a super quick ***initial visualization*** of a dataset.  

If this is not your main concern, creating more sophisticated charts is perfectly doable using [Chart.js](https://www.chartjs.org/), [d3](https://observablehq.com/@d3/gallery), and [vega-lite](https://vega.github.io/vega-lite/examples/#single-view-plots) (among other charting libaries) directly.


`
)}

function _82(md){return(
md`___

## Datasets, color patterns, and libraries
`
)}

function _patterns(patternsWithUrls,DOM,base64Strings)
{
  const promises = patternsWithUrls.map((svgString, i) => {
    // if (i > 0) return;
    let c = DOM.canvas(350, 350);

    var img = new Image();
    let resolve, reject;
    const promise = new Promise((y, n) => ((resolve = y), (reject = n)));
    img.onerror = reject;
    img.onload = function() {
      var canvas = DOM.canvas(50, 50); //html`<canvas>`;
      var ctx = canvas.getContext("2d");
      var pattern = ctx.createPattern(img, 'repeat');

      // set the fillstyle to that pattern
      ctx.fillStyle = pattern;
      // fill a rectangle with the pattern
      ctx.fillRect(0, 0, 50, 50);
      resolve(pattern);
    };
    img.src = base64Strings[i];
    return promise;
  });
  const result = Promise.all(promises);
  return result;
}


function _base64Strings(patternsWithUrls,rasterize){return(
Promise.all(
  patternsWithUrls.map(string => rasterize(string, 50, 4))
)
)}

function _patternUrls(){return(
[
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.16-1883.31-2.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.03-1881.12-1.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.15-1886.18-1.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.15-1886.18-2.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.21-1881.14-1.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.21-1881.14-2.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.21-1881.14-3.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.21-1881.14-4.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.18-1900.28-5.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.06-1880.07-6.svg',
  'https://raw.githubusercontent.com/infowetrust/albumcolors/master/SVG/Dec.03-1881.12-2.svg'
]
)}

function _patternsWithUrls(patternUrls)
{
  const promises = patternUrls.map(url => fetch(url).then(res => res.text()));
  return Promise.all(promises);
}


function _rasterize(html,DOM,XMLSerializer){return(
function rasterize(svgString, size, interpolation) {
  const svg = html`${svgString}`;
  svg.setAttribute('width', size * interpolation);
  svg.setAttribute('height', size * interpolation);

  let resolve, reject;
  const promise = new Promise((y, n) => ((resolve = y), (reject = n)));
  const image = new Image();
  image.onerror = reject;
  image.onload = () => {
    const context = DOM.context2d(size * interpolation, size * interpolation);
    for (let i = 0; i < interpolation; i++) {
      for (let j = 0; j < interpolation; j++) {
        context.drawImage(image, i * size, j * size, size, size);
      }
    }
    resolve(context.canvas.toDataURL("image/png"));
  };
  const serializedSVG = new XMLSerializer().serializeToString(svg);
  const base64Data = window.btoa(serializedSVG);
  const imgsrc = `data:image/svg+xml;base64,${base64Data}`;
  image.src = imgsrc;

  return promise;
}
)}

function _dataset(){return(
[
  { name: "D", value: 0.4485981308411215 },
  { name: "C", value: 0.308411214953271 },
  { name: "E", value: 0.1308411214953271 },
  { name: "B", value: 0.09345794392523364 },
  { name: "A", value: 0.014018691588785047 }
]
)}

function _datasetBars(){return(
[
  { name: "Category 1", 'Dataset 1': 423, 'Dataset 2': 212 },
  { name: "Category 2", 'Dataset 1': 250, 'Dataset 2': 20 },
  { name: "Category 3", 'Dataset 1': 450, 'Dataset 2': 51 }
]
)}

function _datasetLines(){return(
[
  { name: "Category 1", 'Dataset 1': 612, 'Dataset 2': 23 },
  { name: "Category 2", 'Dataset 1': 312, 'Dataset 2': 720 },
  { name: "Category 3", 'Dataset 1': 520, 'Dataset 2': 583 }
]
)}

function _merge(){return(
function merge(target, source) {
  const isObject = obj => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = merge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}
)}

function _92(concious_analytics,html){return(
concious_analytics(html`<a href>`.href)
)}

function _hexToRGB(){return(
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
)}

function _pattern(require){return(
require('patternomaly')
)}

function _d3(require){return(
require('d3@6')
)}

function _fac(FastAverageColor){return(
new FastAverageColor()
)}

function _FastAverageColor(require){return(
require("fast-average-color@7.0.0")
)}

async function _Chart(require,addOutlabels,addDatalabels)
{
  let Chart = (window.Chart = await require('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.js'));
  // add plugin outlabels
  Chart = addOutlabels(Chart);
  // add plugin Datalabels
  Chart = addDatalabels(Chart);
  return Chart;
}


function _addOutlabels(){return(
function addOutlabels(Chart) {
  /*!
   * chartjs-plugin-piechart-outlabels
   * http://chartjs.org/
   * Version: 0.1.3
   *
   * Copyright 2020 Neckster
   * Released under the MIT license
   * https://github.com/Neckster/chartjs-plugin-piechart-outlabels/blob/master/LICENSE
   */

  var helpers = Chart.helpers;

  var helpers$1 = helpers.merge(helpers, {
    // @todo move this method in Chart.helpers.canvas.toFont (deprecates helpers.fontString)
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
    toFontString: function(font) {
      if (
        !font ||
        helpers.isNullOrUndef(font.size) ||
        helpers.isNullOrUndef(font.family)
      ) {
        return null;
      }

      return (
        (font.style ? font.style + ' ' : '') +
        (font.weight ? font.weight + ' ' : '') +
        font.size +
        'px ' +
        font.family
      );
    },

    // @todo move this in Chart.helpers.canvas.textSize
    // @todo cache calls of measureText if font doesn't change?!
    textSize: function(ctx, lines, font) {
      var items = [].concat(lines);
      var ilen = items.length;
      var prev = ctx.font;
      var width = 0;
      var i;

      ctx.font = font.string;

      for (i = 0; i < ilen; ++i) {
        width = Math.max(ctx.measureText(items[i]).width, width);
      }

      ctx.font = prev;

      return {
        height: ilen * font.lineHeight,
        width: width
      };
    },

    // @todo move this method in Chart.helpers.options.toFont
    parseFont: function(value, height) {
      var global = Chart.defaults.global;
      var size = helpers.valueOrDefault(value.size, global.defaultFontSize);
      var titleSize = helpers.valueOrDefault(
        value.titleSize,
        global.defaultFontSize
      );

      if (value.resizable) {
        size = this.adaptTextSizeToHeight(height, value.minSize, value.maxSize);
        titleSize = this.adaptTextSizeToHeight(
          height,
          value.minSize,
          value.maxSize
        );
      }

      var font = {
        family: helpers.valueOrDefault(value.family, global.defaultFontFamily),
        lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
        size: size,
        style: helpers.valueOrDefault(value.style, global.defaultFontStyle),
        weight: helpers.valueOrDefault(value.weight, null),
        string: ''
      };

      var title = {
        family: helpers.valueOrDefault(
          value.titleFamily,
          global.defaultFontFamily
        ),
        lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
        size: titleSize,
        style: helpers.valueOrDefault(
          value.titleStyle,
          global.defaultFontStyle
        ),
        weight: helpers.valueOrDefault(value.titleWeight, null),
        string: ''
      };

      font.string = helpers.toFontString(font);
      font.titleString = helpers.toFontString(title);

      return font;
    },

    adaptTextSizeToHeight: function(height, min, max) {
      var size = (height / 100) * 2.5;
      if (min && size < min) {
        return min;
      }
      if (max && size > max) {
        return max;
      }
      return size;
    }
  });

  /**
   * @module Options
   */

  var defaults = {
    LABEL_KEY: '$outlabels',

    /**
     * The color used to draw the background of the label rect.
     * @member {String|Array|Function|null}
     * @default null (adaptive background)
     */
    backgroundColor: function(context) {
      return context.dataset.backgroundColor;
    },

    /**
     * The color used to draw the border of the label rect.
     * @member {String|Array|Function|null}
     * @default null (adaptive border color)
     */
    borderColor: function(context) {
      return context.dataset.backgroundColor;
    },

    /**
     * The color used to draw the line between label and arc of the chart.
     * @member {String|Array|Function|null}
     * @default null (adaptive line color)
     */
    lineColor: function(context) {
      return context.dataset.backgroundColor;
    },

    /**
     * The border radius used to add rounded corners to the label rect.
     * @member {Number|Array|Function}
     * @default 0 (not rounded)
     */
    borderRadius: 0,

    /**
     * The border width of the surrounding frame.
     * @member {Number|Array|Function}
     * @default 0 (no border)
     */
    borderWidth: 0,

    /**
     * The width (thickness) of the line between label and chart arc.
     * @member {Number|Array|Function}
     * @default 2
     */
    lineWidth: 2,

    /**
     * The color used to draw the label text.
     * @member {String|Array|Function}
     * @default white
     */
    color: 'white',

    /**
     * Whether to display labels global (boolean) or per data (function)
     * @member {Boolean|Array|Function}
     * @default true
     */
    display: true,

    /**
     * The font options used to draw the label text.
     * @member {Object|Array|Function}
     * @prop {Boolean} font.family - defaults to Chart.defaults.global.defaultFontFamily
     * @prop {Boolean} font.size - defaults to Chart.defaults.global.defaultFontSize
     * @prop {Boolean} font.style - defaults to Chart.defaults.global.defaultFontStyle
     * @prop {Boolean} font.weight - defaults to 'normal'
     * @prop {Boolean} font.maxSize - defaults to undefined (unlimited)
     * @prop {Boolean} font.minSize - defaults to undefined (unlimited)
     * @prop {Boolean} font.resizable - defaults to true
     * @default Chart.defaults.global.defaultFont.*
     */
    font: {
      family: undefined,
      size: undefined,
      style: undefined,
      weight: null,
      maxSize: null,
      minSize: null,
      resizable: true
    },

    /**
     * The line height (in pixel) to use for multi-lines labels.
     * @member {Number|Array|Function|undefined}
     * @default 1.2
     */
    lineHeight: 1.2,

    /**
     * The padding (in pixels) to apply between the text and the surrounding frame.
     * @member {Number|Object|Array|Function}
     * @prop {Number} padding.top - Space above the text.
     * @prop {Number} padding.right - Space on the right of the text.
     * @prop {Number} padding.bottom - Space below the text.
     * @prop {Number} padding.left - Space on the left of the text.
     * @default 4 (all values)
     */
    padding: {
      top: 4,
      right: 4,
      bottom: 4,
      left: 4
    },

    /**
     * Text alignment for multi-lines labels ('left'|'right'|'start'|'center'|'end').
     * @member {String|Array|Function}
     * @default 'center'
     */
    textAlign: 'center',

    /**
     * The length of the line between label and chart arc.
     * @member {Number|Array|Function|undefined}
     * @default 40
     */
    stretch: 40,

    /**
     * The text of the label.
     * @member {String}
     * @default '%l %p' (label name and value percentage)
     */
    text: '%l %p',

    /**
     * The level of zoom (out) for pie/doughnut chart in percent.
     * @member {Number}
     * @default 50 (%)
     */
    zoomOutPercentage: 50,

    /**
     * The count of numbers after the point separator for float values of percent property
     * @member {Number}
     * @default 1
     */
    percentPrecision: 1,

    /**
     * The count of numbers after the point separator for float values of value property
     * @member {Number}
     * @default 3
     */
    valuePrecision: 3
  };

  var outlabeledCharts = {
    init: function() {
      /* HOTFIX: fix trunc function for IE-11 */
      if (!Math.trunc) {
        Math.trunc = function(v) {
          v = +v;
          return v - (v % 1) || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
        };
      }

      Chart.defaults.outlabeledDoughnut = Chart.defaults.doughnut;
      Chart.defaults.outlabeledPie = Chart.defaults.pie;

      var customUpdate = function(reset) {
        Chart.controllers.doughnut.prototype.update.call(this);
        var me = this;
        var meta = me.getMeta();
        var zoomOutPercentage =
          me.chart.options.zoomOutPercentage || defaults.zoomOutPercentage;

        me.outerRadius *= 1 - zoomOutPercentage / 100;
        me.innerRadius *= 1 - zoomOutPercentage / 100;

        Chart.helpers.each(meta.data, function(arc, index) {
          me.updateElement(arc, index, reset);
        });
      };

      var customDoughnut = Chart.controllers.doughnut.extend({
        update: customUpdate
      });

      var customPie = Chart.controllers.pie.extend({
        update: customUpdate
      });

      Chart.controllers.outlabeledPie = customPie;
      Chart.controllers.outlabeledDoughnut = customDoughnut;
    }
  };

  var positioners = {
    center: function(arc, stretch, offset = 0) {
      var angle = (arc.startAngle + arc.endAngle) / 2;
      var cosA = Math.cos(angle);
      var sinA = Math.sin(angle);
      var d = arc.outerRadius;

      var stretchedD = d + stretch;
      return {
        x: arc.x + cosA * stretchedD,
        y: arc.y + sinA * stretchedD,
        d: stretchedD,
        arc: arc,
        anchor: {
          x: arc.x + cosA * (d + offset),
          y: arc.y + sinA * (d + offset)
        },
        copy: {
          x: arc.x + cosA * stretchedD,
          y: arc.y + sinA * stretchedD
        }
      };
    },

    moveFromAnchor: function(center, dist) {
      var arc = center.arc;
      var d = center.d;
      var angle = (arc.startAngle + arc.endAngle) / 2;
      var cosA = Math.cos(angle);
      var sinA = Math.sin(angle);

      d += dist;

      return {
        x: arc.x + cosA * d,
        y: arc.y + sinA * d,
        d: d,
        arc: arc,
        anchor: center.anchor,
        copy: {
          x: arc.x + cosA * d,
          y: arc.y + sinA * d
        }
      };
    }
  };

  var helpers$2 = Chart.helpers;
  var LABEL_KEY = defaults.LABEL_KEY;

  var classes = {
    OutLabel: function(el, index, ctx, config, context) {
      var resolve = Chart.helpers.options.resolve;
      // Check whether the label should be displayed
      if (!resolve([config.display, true], context, index)) {
        throw new Error('Label display property is set to false.');
      }
      // Init text
      var value = context.dataset.data[index];
      var label = context.labels[index];
      var text = resolve([config.text, defaults.text], context, index);

      /* Replace label marker */
      text = text.replace(/%l/gi, label);

      /* Replace value marker with possible precision value */
      (text.match(/%v\.?(\d*)/gi) || [])
        .map(function(val) {
          var prec = val.replace(/%v\./gi, '');
          if (prec.length) {
            return +prec;
          }
          return config.valuePrecision || defaults.valuePrecision;
        })
        .forEach(function(val) {
          text = text.replace(/%v\.?(\d*)/i, value.toFixed(val));
        });

      /* Replace percent marker with possible precision value */
      (text.match(/%p\.?(\d*)/gi) || [])
        .map(function(val) {
          var prec = val.replace(/%p\./gi, '');
          if (prec.length) {
            return +prec;
          }
          return config.percentPrecision || defaults.percentPrecision;
        })
        .forEach(function(val) {
          text = text.replace(
            /%p\.?(\d*)/i,
            (context.percent * 100).toFixed(val) + '%'
          );
        });

      // Count lines
      var lines = text.match(/[^\r\n]+/g);

      // If no lines => nothng to display
      if (!lines || !lines.length) {
        throw new Error('No text to show.');
      }

      // Remove unnecessary spaces
      for (var i = 0; i < lines.length; ++i) {
        lines[i] = lines[i].trim();
      }

      /* ===================== CONSTRUCTOR ==================== */
      this.init = function(text, lines) {
        // If everything ok -> begin initializing
        this.encodedText = config.text;
        this.text = text;
        this.lines = lines;
        this.label = label;
        this.value = value;
        this.ctx = ctx;

        // Init style
        this.style = {
          backgroundColor: resolve(
            [config.backgroundColor, defaults.backgroundColor, 'black'],
            context,
            index
          ),
          borderColor: resolve(
            [config.borderColor, defaults.borderColor, 'black'],
            context,
            index
          ),
          borderRadius: resolve([config.borderRadius, 0], context, index),
          borderWidth: resolve([config.borderWidth, 0], context, index),
          lineWidth: resolve([config.lineWidth, 2], context, index),
          lineColor: resolve(
            [config.lineColor, defaults.lineColor, 'black'],
            context,
            index
          ),
          color: resolve([config.color, 'white'], context, index),
          font: helpers$2.parseFont(
            resolve([config.font, { resizable: true }]),
            ctx.canvas.style.height.slice(0, -2)
          ),
          padding: helpers$2.options.toPadding(
            resolve([config.padding, 0], context, index)
          ),
          textAlign: resolve([config.textAlign, 'left'], context, index)
        };

        this.stretch = resolve([config.stretch, 40], context, index);
        this.offsetLine = resolve([config.offsetLine, 0], context, index);
        this.size = helpers$2.textSize(ctx, this.lines, this.style.font);

        this.offsetStep = this.size.width / 20;
        this.offset = {
          x: 0,
          y: 0
        };
        this.predictedOffset = this.offset;

        var angle =
          -((el._model.startAngle + el._model.endAngle) / 2) / Math.PI;
        var val = Math.abs(angle - Math.trunc(angle));

        if (val > 0.45 && val < 0.55) {
          this.predictedOffset.x = 0;
        } else if (angle <= 0.45 && angle >= -0.45) {
          this.predictedOffset.x = this.size.width / 2;
        } else if (angle >= -1.45 && angle <= -0.55) {
          this.predictedOffset.x = -this.size.width / 2;
        }
      };

      this.init(text, lines);

      /* COMPUTING RECTS PART */
      this.computeLabelRect = function() {
        var width = this.textRect.width + 2 * this.style.borderWidth;
        var height = this.textRect.height + 2 * this.style.borderWidth;

        var x =
          this.textRect.x - this.style.padding.left - this.style.borderWidth;
        var y =
          this.textRect.y - this.style.padding.top - this.style.borderWidth;

        width += this.style.padding.width;
        height += this.style.padding.height;

        return {
          x: x,
          y: y,
          width: width,
          height: height
        };
      };

      this.computeTextRect = function() {
        return {
          x: this.center.x - this.size.width / 2,
          y: this.center.y - this.size.height / 2,
          width: this.size.width,
          height: this.size.height
        };
      };

      this.getPoints = function() {
        return [
          {
            x: this.labelRect.x,
            y: this.labelRect.y
          },
          {
            x: this.labelRect.x + this.labelRect.width,
            y: this.labelRect.y
          },
          {
            x: this.labelRect.x + this.labelRect.width,
            y: this.labelRect.y + this.labelRect.height
          },
          {
            x: this.labelRect.x,
            y: this.labelRect.y + this.labelRect.height
          }
        ];
      };

      this.containsPoint = function(point, offset) {
        if (!offset) {
          offset = 5;
        }

        return (
          this.labelRect.x - offset <= point.x &&
          point.x <= this.labelRect.x + this.labelRect.width + offset &&
          this.labelRect.y - offset <= point.y &&
          point.y <= this.labelRect.y + this.labelRect.height + offset
        );
      };

      /* ======================= DRAWING ======================= */
      // Draw label text
      this.drawText = function() {
        var align = this.style.textAlign;
        var font = this.style.font;
        var lh = font.lineHeight;
        var color = this.style.color;
        var ilen = this.lines.length;
        var x, y, idx;

        if (!ilen || !color) {
          return;
        }

        x = this.textRect.x;
        y = this.textRect.y + lh / 2;

        if (align === 'center') {
          x += this.textRect.width / 2;
        } else if (align === 'end' || align === 'right') {
          x += this.textRect.width;
        }

        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'middle';

        for (idx = 0; idx < ilen; ++idx) {
          if (this.lines.length > 1 && idx === 0) {
            this.ctx.font = this.style.font.titleString;
          } else {
            this.ctx.font = this.style.font.string;
          }

          this.ctx.fillText(
            this.lines[idx],
            Math.round(x),
            Math.round(y),
            Math.round(this.textRect.width)
          );

          y += lh;
        }
      };

      // Draw label box
      this.drawLabel = function() {
        ctx.beginPath();
        helpers$2.canvas.roundedRect(
          this.ctx,
          Math.round(this.labelRect.x),
          Math.round(this.labelRect.y),
          Math.round(this.labelRect.width),
          Math.round(this.labelRect.height),
          this.style.borderRadius
        );
        this.ctx.closePath();

        if (this.style.backgroundColor) {
          this.ctx.fillStyle = this.style.backgroundColor || 'black';
          this.ctx.fill();
        }

        if (this.style.borderColor && this.style.borderWidth) {
          this.ctx.strokeStyle = this.style.borderColor;
          this.ctx.lineWidth = this.style.borderWidth;
          this.ctx.lineJoin = 'miter';
          this.ctx.stroke();
        }
      };

      this.drawLine = function() {
        this.ctx.save();

        this.ctx.strokeStyle = this.style.lineColor;
        this.ctx.lineWidth = this.style.lineWidth;
        this.ctx.lineJoin = 'miter';
        this.ctx.beginPath();
        this.ctx.moveTo(this.center.anchor.x, this.center.anchor.y);
        this.ctx.lineTo(this.center.copy.x, this.center.copy.y);
        this.ctx.stroke();

        this.ctx.restore();
      };

      this.draw = function() {
        this.drawLabel();
        this.drawText();
      };

      this.update = function(view, elements, max) {
        this.center = positioners.center(view, this.stretch, this.offsetLine);
        this.moveLabelToOffset();

        this.center.x += this.offset.x;
        this.center.y += this.offset.y;

        var valid = false;

        while (!valid) {
          this.textRect = this.computeTextRect();
          this.labelRect = this.computeLabelRect();
          var rectPoints = this.getPoints();

          valid = true;

          for (var e = 0; e < max; ++e) {
            var element = elements[e][LABEL_KEY];
            if (!element) {
              continue;
            }

            var elPoints = element.getPoints();

            for (var p = 0; p < rectPoints.length; ++p) {
              if (element.containsPoint(rectPoints[p])) {
                valid = false;
                break;
              }

              if (this.containsPoint(elPoints[p])) {
                valid = false;
                break;
              }
            }
          }

          if (!valid) {
            this.center = positioners.moveFromAnchor(this.center, 1);
            this.center.x += this.offset.x;
            this.center.y += this.offset.y;
          }
        }
      };

      this.moveLabelToOffset = function() {
        if (
          this.predictedOffset.x <= 0 &&
          this.offset.x > this.predictedOffset.x
        ) {
          this.offset.x -= this.offsetStep;
          if (this.offset.x <= this.predictedOffset.x) {
            this.offset.x = this.predictedOffset.x;
          }
        } else if (
          this.predictedOffset.x >= 0 &&
          this.offset.x < this.predictedOffset.x
        ) {
          this.offset.x += this.offsetStep;
          if (this.offset.x >= this.predictedOffset.x) {
            this.offset.x = this.predictedOffset.x;
          }
        }
      };
    }
  };

  outlabeledCharts.init();

  Chart.defaults.global.plugins.outlabels = defaults;

  var LABEL_KEY$1 = defaults.LABEL_KEY;

  function configure(dataset, options) {
    var override = dataset.outlabels;
    var config = {};

    if (override === false) {
      return null;
    }
    if (override === true) {
      override = {};
    }

    return helpers$1.merge(config, [options, override]);
  }

  Chart.plugins.register({
    id: 'outlabels',

    resize: function(chart, size, options) {
      chart.sizeChanged = true;
    },

    afterDatasetUpdate: function(chart, args, options) {
      var labels = chart.config.data.labels;
      var dataset = chart.data.datasets[args.index];
      var config = configure(dataset, options);
      var display = config && config.display;
      var elements = args.meta.data || [];
      var ctx = chart.ctx;
      var el, label, percent, newLabel, context, i;

      ctx.save();

      for (i = 0; i < elements.length; ++i) {
        el = elements[i];
        label = el[LABEL_KEY$1];
        percent = dataset.data[i] / args.meta.total;
        newLabel = null;

        if (display && el && !el.hidden) {
          try {
            context = {
              chart: chart,
              dataIndex: i,
              dataset: dataset,
              labels: labels,
              datasetIndex: args.index,
              percent: percent
            };
            newLabel = new classes.OutLabel(el, i, ctx, config, context);
          } catch (e) {
            newLabel = null;
          }
        }

        if (
          label &&
          newLabel &&
          !chart.sizeChanged &&
          label.label === newLabel.label &&
          label.encodedText === newLabel.encodedText
        ) {
          newLabel.offset = label.offset;
        }

        el[LABEL_KEY$1] = newLabel;
      }

      ctx.restore();
      chart.sizeChanged = false;
    },
    afterDatasetDraw: function(chart, args) {
      var elements = args.meta.data || [];
      var ctx = chart.ctx;
      var el, label, index;

      for (var i = 0; i < 2 * elements.length; ++i) {
        index = i < elements.length ? i : i - elements.length;

        el = elements[index];
        label = el[LABEL_KEY$1];
        if (!label) {
          continue;
        }

        if (i < elements.length) {
          label.update(el._view, elements, i);
          label.drawLine(ctx);
        } else {
          label.draw(ctx);
        }
      }
    }
  });
  return Chart;
}
)}

function _addDatalabels(){return(
function addDatalabels(Chart) {
  /*!
   * chartjs-plugin-datalabels v0.7.0
   * https://chartjs-plugin-datalabels.netlify.com
   * (c) 2019 Chart.js Contributors
   * Released under the MIT license
   */

  var helpers = Chart.helpers;

  var devicePixelRatio = (function() {
    if (typeof window !== 'undefined') {
      if (window.devicePixelRatio) {
        return window.devicePixelRatio;
      }

      // devicePixelRatio is undefined on IE10
      // https://stackoverflow.com/a/20204180/8837887
      // https://github.com/chartjs/chartjs-plugin-datalabels/issues/85
      var screen = window.screen;
      if (screen) {
        return (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);
      }
    }

    return 1;
  })();

  var utils = {
    // @todo move this in Chart.helpers.toTextLines
    toTextLines: function(inputs) {
      var lines = [];
      var input;

      inputs = [].concat(inputs);
      while (inputs.length) {
        input = inputs.pop();
        if (typeof input === 'string') {
          lines.unshift.apply(lines, input.split('\n'));
        } else if (Array.isArray(input)) {
          inputs.push.apply(inputs, input);
        } else if (!helpers.isNullOrUndef(inputs)) {
          lines.unshift('' + input);
        }
      }

      return lines;
    },

    // @todo move this method in Chart.helpers.canvas.toFont (deprecates helpers.fontString)
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
    toFontString: function(font) {
      if (
        !font ||
        helpers.isNullOrUndef(font.size) ||
        helpers.isNullOrUndef(font.family)
      ) {
        return null;
      }

      return (
        (font.style ? font.style + ' ' : '') +
        (font.weight ? font.weight + ' ' : '') +
        font.size +
        'px ' +
        font.family
      );
    },

    // @todo move this in Chart.helpers.canvas.textSize
    // @todo cache calls of measureText if font doesn't change?!
    textSize: function(ctx, lines, font) {
      var items = [].concat(lines);
      var ilen = items.length;
      var prev = ctx.font;
      var width = 0;
      var i;

      ctx.font = font.string;

      for (i = 0; i < ilen; ++i) {
        width = Math.max(ctx.measureText(items[i]).width, width);
      }

      ctx.font = prev;

      return {
        height: ilen * font.lineHeight,
        width: width
      };
    },

    // @todo move this method in Chart.helpers.options.toFont
    parseFont: function(value) {
      var global = Chart.defaults.global;
      var size = helpers.valueOrDefault(value.size, global.defaultFontSize);
      var font = {
        family: helpers.valueOrDefault(value.family, global.defaultFontFamily),
        lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
        size: size,
        style: helpers.valueOrDefault(value.style, global.defaultFontStyle),
        weight: helpers.valueOrDefault(value.weight, null),
        string: ''
      };

      font.string = utils.toFontString(font);
      return font;
    },

    /**
     * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
     * @todo move this method in Chart.helpers.bound
     * https://doc.qt.io/qt-5/qtglobal.html#qBound
     */
    bound: function(min, value, max) {
      return Math.max(min, Math.min(value, max));
    },

    /**
     * Returns an array of pair [value, state] where state is:
     * * -1: value is only in a0 (removed)
     * *  1: value is only in a1 (added)
     */
    arrayDiff: function(a0, a1) {
      var prev = a0.slice();
      var updates = [];
      var i, j, ilen, v;

      for (i = 0, ilen = a1.length; i < ilen; ++i) {
        v = a1[i];
        j = prev.indexOf(v);

        if (j === -1) {
          updates.push([v, 1]);
        } else {
          prev.splice(j, 1);
        }
      }

      for (i = 0, ilen = prev.length; i < ilen; ++i) {
        updates.push([prev[i], -1]);
      }

      return updates;
    },

    /**
     * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
     */
    rasterize: function(v) {
      return Math.round(v * devicePixelRatio) / devicePixelRatio;
    }
  };

  function orient(point, origin) {
    var x0 = origin.x;
    var y0 = origin.y;

    if (x0 === null) {
      return { x: 0, y: -1 };
    }
    if (y0 === null) {
      return { x: 1, y: 0 };
    }

    var dx = point.x - x0;
    var dy = point.y - y0;
    var ln = Math.sqrt(dx * dx + dy * dy);

    return {
      x: ln ? dx / ln : 0,
      y: ln ? dy / ln : -1
    };
  }

  function aligned(x, y, vx, vy, align) {
    switch (align) {
      case 'center':
        vx = vy = 0;
        break;
      case 'bottom':
        vx = 0;
        vy = 1;
        break;
      case 'right':
        vx = 1;
        vy = 0;
        break;
      case 'left':
        vx = -1;
        vy = 0;
        break;
      case 'top':
        vx = 0;
        vy = -1;
        break;
      case 'start':
        vx = -vx;
        vy = -vy;
        break;
      case 'end':
        // keep natural orientation
        break;
      default:
        // clockwise rotation (in degree)
        align *= Math.PI / 180;
        vx = Math.cos(align);
        vy = Math.sin(align);
        break;
    }

    return {
      x: x,
      y: y,
      vx: vx,
      vy: vy
    };
  }

  // Line clipping (Cohen–Sutherland algorithm)
  // https://en.wikipedia.org/wiki/Cohen–Sutherland_algorithm

  var R_INSIDE = 0;
  var R_LEFT = 1;
  var R_RIGHT = 2;
  var R_BOTTOM = 4;
  var R_TOP = 8;

  function region(x, y, rect) {
    var res = R_INSIDE;

    if (x < rect.left) {
      res |= R_LEFT;
    } else if (x > rect.right) {
      res |= R_RIGHT;
    }
    if (y < rect.top) {
      res |= R_TOP;
    } else if (y > rect.bottom) {
      res |= R_BOTTOM;
    }

    return res;
  }

  function clipped(segment, area) {
    var x0 = segment.x0;
    var y0 = segment.y0;
    var x1 = segment.x1;
    var y1 = segment.y1;
    var r0 = region(x0, y0, area);
    var r1 = region(x1, y1, area);
    var r, x, y;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!(r0 | r1) || r0 & r1) {
        // both points inside or on the same side: no clipping
        break;
      }

      // at least one point is outside
      r = r0 || r1;

      if (r & R_TOP) {
        x = x0 + ((x1 - x0) * (area.top - y0)) / (y1 - y0);
        y = area.top;
      } else if (r & R_BOTTOM) {
        x = x0 + ((x1 - x0) * (area.bottom - y0)) / (y1 - y0);
        y = area.bottom;
      } else if (r & R_RIGHT) {
        y = y0 + ((y1 - y0) * (area.right - x0)) / (x1 - x0);
        x = area.right;
      } else if (r & R_LEFT) {
        y = y0 + ((y1 - y0) * (area.left - x0)) / (x1 - x0);
        x = area.left;
      }

      if (r === r0) {
        x0 = x;
        y0 = y;
        r0 = region(x0, y0, area);
      } else {
        x1 = x;
        y1 = y;
        r1 = region(x1, y1, area);
      }
    }

    return {
      x0: x0,
      x1: x1,
      y0: y0,
      y1: y1
    };
  }

  function compute(range, config) {
    var anchor = config.anchor;
    var segment = range;
    var x, y;

    if (config.clamp) {
      segment = clipped(segment, config.area);
    }

    if (anchor === 'start') {
      x = segment.x0;
      y = segment.y0;
    } else if (anchor === 'end') {
      x = segment.x1;
      y = segment.y1;
    } else {
      x = (segment.x0 + segment.x1) / 2;
      y = (segment.y0 + segment.y1) / 2;
    }

    return aligned(x, y, range.vx, range.vy, config.align);
  }

  var positioners = {
    arc: function(vm, config) {
      var angle = (vm.startAngle + vm.endAngle) / 2;
      var vx = Math.cos(angle);
      var vy = Math.sin(angle);
      var r0 = vm.innerRadius;
      var r1 = vm.outerRadius;

      return compute(
        {
          x0: vm.x + vx * r0,
          y0: vm.y + vy * r0,
          x1: vm.x + vx * r1,
          y1: vm.y + vy * r1,
          vx: vx,
          vy: vy
        },
        config
      );
    },

    point: function(vm, config) {
      var v = orient(vm, config.origin);
      var rx = v.x * vm.radius;
      var ry = v.y * vm.radius;

      return compute(
        {
          x0: vm.x - rx,
          y0: vm.y - ry,
          x1: vm.x + rx,
          y1: vm.y + ry,
          vx: v.x,
          vy: v.y
        },
        config
      );
    },

    rect: function(vm, config) {
      var v = orient(vm, config.origin);
      var x = vm.x;
      var y = vm.y;
      var sx = 0;
      var sy = 0;

      if (vm.horizontal) {
        x = Math.min(vm.x, vm.base);
        sx = Math.abs(vm.base - vm.x);
      } else {
        y = Math.min(vm.y, vm.base);
        sy = Math.abs(vm.base - vm.y);
      }

      return compute(
        {
          x0: x,
          y0: y + sy,
          x1: x + sx,
          y1: y,
          vx: v.x,
          vy: v.y
        },
        config
      );
    },

    fallback: function(vm, config) {
      var v = orient(vm, config.origin);

      return compute(
        {
          x0: vm.x,
          y0: vm.y,
          x1: vm.x,
          y1: vm.y,
          vx: v.x,
          vy: v.y
        },
        config
      );
    }
  };

  var helpers$1 = Chart.helpers;
  var rasterize = utils.rasterize;

  function boundingRects(model) {
    var borderWidth = model.borderWidth || 0;
    var padding = model.padding;
    var th = model.size.height;
    var tw = model.size.width;
    var tx = -tw / 2;
    var ty = -th / 2;

    return {
      frame: {
        x: tx - padding.left - borderWidth,
        y: ty - padding.top - borderWidth,
        w: tw + padding.width + borderWidth * 2,
        h: th + padding.height + borderWidth * 2
      },
      text: {
        x: tx,
        y: ty,
        w: tw,
        h: th
      }
    };
  }

  function getScaleOrigin(el) {
    var horizontal = el._model.horizontal;
    var scale = el._scale || (horizontal && el._xScale) || el._yScale;

    if (!scale) {
      return null;
    }

    if (scale.xCenter !== undefined && scale.yCenter !== undefined) {
      return { x: scale.xCenter, y: scale.yCenter };
    }

    var pixel = scale.getBasePixel();
    return horizontal ? { x: pixel, y: null } : { x: null, y: pixel };
  }

  function getPositioner(el) {
    if (el instanceof Chart.elements.Arc) {
      return positioners.arc;
    }
    if (el instanceof Chart.elements.Point) {
      return positioners.point;
    }
    if (el instanceof Chart.elements.Rectangle) {
      return positioners.rect;
    }
    return positioners.fallback;
  }

  function drawFrame(ctx, rect, model) {
    var bgColor = model.backgroundColor;
    var borderColor = model.borderColor;
    var borderWidth = model.borderWidth;

    if (!bgColor && (!borderColor || !borderWidth)) {
      return;
    }

    ctx.beginPath();

    helpers$1.canvas.roundedRect(
      ctx,
      rasterize(rect.x) + borderWidth / 2,
      rasterize(rect.y) + borderWidth / 2,
      rasterize(rect.w) - borderWidth,
      rasterize(rect.h) - borderWidth,
      model.borderRadius
    );

    ctx.closePath();

    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fill();
    }

    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'miter';
      ctx.stroke();
    }
  }

  function textGeometry(rect, align, font) {
    var h = font.lineHeight;
    var w = rect.w;
    var x = rect.x;
    var y = rect.y + h / 2;

    if (align === 'center') {
      x += w / 2;
    } else if (align === 'end' || align === 'right') {
      x += w;
    }

    return {
      h: h,
      w: w,
      x: x,
      y: y
    };
  }

  function drawTextLine(ctx, text, cfg) {
    var shadow = ctx.shadowBlur;
    var stroked = cfg.stroked;
    var x = rasterize(cfg.x);
    var y = rasterize(cfg.y);
    var w = rasterize(cfg.w);

    if (stroked) {
      ctx.strokeText(text, x, y, w);
    }

    if (cfg.filled) {
      if (shadow && stroked) {
        // Prevent drawing shadow on both the text stroke and fill, so
        // if the text is stroked, remove the shadow for the text fill.
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y, w);

      if (shadow && stroked) {
        ctx.shadowBlur = shadow;
      }
    }
  }

  function drawText(ctx, lines, rect, model) {
    var align = model.textAlign;
    var color = model.color;
    var filled = !!color;
    var font = model.font;
    var ilen = lines.length;
    var strokeColor = model.textStrokeColor;
    var strokeWidth = model.textStrokeWidth;
    var stroked = strokeColor && strokeWidth;
    var i;

    if (!ilen || (!filled && !stroked)) {
      return;
    }

    // Adjust coordinates based on text alignment and line height
    rect = textGeometry(rect, align, font);

    ctx.font = font.string;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = model.textShadowBlur;
    ctx.shadowColor = model.textShadowColor;

    if (filled) {
      ctx.fillStyle = color;
    }
    if (stroked) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
    }

    for (i = 0, ilen = lines.length; i < ilen; ++i) {
      drawTextLine(ctx, lines[i], {
        stroked: stroked,
        filled: filled,
        w: rect.w,
        x: rect.x,
        y: rect.y + rect.h * i
      });
    }
  }

  var Label = function(config, ctx, el, index) {
    var me = this;

    me._config = config;
    me._index = index;
    me._model = null;
    me._rects = null;
    me._ctx = ctx;
    me._el = el;
  };

  helpers$1.extend(Label.prototype, {
    /**
     * @private
     */
    _modelize: function(display, lines, config, context) {
      var me = this;
      var index = me._index;
      var resolve = helpers$1.options.resolve;
      var font = utils.parseFont(resolve([config.font, {}], context, index));
      var color = resolve(
        [config.color, Chart.defaults.global.defaultFontColor],
        context,
        index
      );

      return {
        align: resolve([config.align, 'center'], context, index),
        anchor: resolve([config.anchor, 'center'], context, index),
        area: context.chart.chartArea,
        backgroundColor: resolve(
          [config.backgroundColor, null],
          context,
          index
        ),
        borderColor: resolve([config.borderColor, null], context, index),
        borderRadius: resolve([config.borderRadius, 0], context, index),
        borderWidth: resolve([config.borderWidth, 0], context, index),
        clamp: resolve([config.clamp, false], context, index),
        clip: resolve([config.clip, false], context, index),
        color: color,
        display: display,
        font: font,
        lines: lines,
        offset: resolve([config.offset, 0], context, index),
        opacity: resolve([config.opacity, 1], context, index),
        origin: getScaleOrigin(me._el),
        padding: helpers$1.options.toPadding(
          resolve([config.padding, 0], context, index)
        ),
        positioner: getPositioner(me._el),
        rotation:
          resolve([config.rotation, 0], context, index) * (Math.PI / 180),
        size: utils.textSize(me._ctx, lines, font),
        textAlign: resolve([config.textAlign, 'start'], context, index),
        textShadowBlur: resolve([config.textShadowBlur, 0], context, index),
        textShadowColor: resolve(
          [config.textShadowColor, color],
          context,
          index
        ),
        textStrokeColor: resolve(
          [config.textStrokeColor, color],
          context,
          index
        ),
        textStrokeWidth: resolve([config.textStrokeWidth, 0], context, index)
      };
    },

    update: function(context) {
      var me = this;
      var model = null;
      var rects = null;
      var index = me._index;
      var config = me._config;
      var value, label, lines;

      // We first resolve the display option (separately) to avoid computing
      // other options in case the label is hidden (i.e. display: false).
      var display = helpers$1.options.resolve(
        [config.display, true],
        context,
        index
      );

      if (display) {
        value = context.dataset.data[index];
        label = helpers$1.valueOrDefault(
          helpers$1.callback(config.formatter, [value, context]),
          value
        );
        lines = helpers$1.isNullOrUndef(label) ? [] : utils.toTextLines(label);

        if (lines.length) {
          model = me._modelize(display, lines, config, context);
          rects = boundingRects(model);
        }
      }

      me._model = model;
      me._rects = rects;
    },

    geometry: function() {
      return this._rects ? this._rects.frame : {};
    },

    rotation: function() {
      return this._model ? this._model.rotation : 0;
    },

    visible: function() {
      return this._model && this._model.opacity;
    },

    model: function() {
      return this._model;
    },

    draw: function(chart, center) {
      var me = this;
      var ctx = chart.ctx;
      var model = me._model;
      var rects = me._rects;
      var area;

      if (!this.visible()) {
        return;
      }

      ctx.save();

      if (model.clip) {
        area = model.area;
        ctx.beginPath();
        ctx.rect(
          area.left,
          area.top,
          area.right - area.left,
          area.bottom - area.top
        );
        ctx.clip();
      }

      ctx.globalAlpha = utils.bound(0, model.opacity, 1);
      ctx.translate(rasterize(center.x), rasterize(center.y));
      ctx.rotate(model.rotation);

      drawFrame(ctx, rects.frame, model);
      drawText(ctx, model.lines, rects.text, model);

      ctx.restore();
    }
  });

  var helpers$2 = Chart.helpers;

  var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991; // eslint-disable-line es/no-number-minsafeinteger
  var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991; // eslint-disable-line es/no-number-maxsafeinteger

  function rotated(point, center, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var cx = center.x;
    var cy = center.y;

    return {
      x: cx + cos * (point.x - cx) - sin * (point.y - cy),
      y: cy + sin * (point.x - cx) + cos * (point.y - cy)
    };
  }

  function projected(points, axis) {
    var min = MAX_INTEGER;
    var max = MIN_INTEGER;
    var origin = axis.origin;
    var i, pt, vx, vy, dp;

    for (i = 0; i < points.length; ++i) {
      pt = points[i];
      vx = pt.x - origin.x;
      vy = pt.y - origin.y;
      dp = axis.vx * vx + axis.vy * vy;
      min = Math.min(min, dp);
      max = Math.max(max, dp);
    }

    return {
      min: min,
      max: max
    };
  }

  function toAxis(p0, p1) {
    var vx = p1.x - p0.x;
    var vy = p1.y - p0.y;
    var ln = Math.sqrt(vx * vx + vy * vy);

    return {
      vx: (p1.x - p0.x) / ln,
      vy: (p1.y - p0.y) / ln,
      origin: p0,
      ln: ln
    };
  }

  var HitBox = function() {
    this._rotation = 0;
    this._rect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
  };

  helpers$2.extend(HitBox.prototype, {
    center: function() {
      var r = this._rect;
      return {
        x: r.x + r.w / 2,
        y: r.y + r.h / 2
      };
    },

    update: function(center, rect, rotation) {
      this._rotation = rotation;
      this._rect = {
        x: rect.x + center.x,
        y: rect.y + center.y,
        w: rect.w,
        h: rect.h
      };
    },

    contains: function(point) {
      var me = this;
      var margin = 1;
      var rect = me._rect;

      point = rotated(point, me.center(), -me._rotation);

      return !(
        point.x < rect.x - margin ||
        point.y < rect.y - margin ||
        point.x > rect.x + rect.w + margin * 2 ||
        point.y > rect.y + rect.h + margin * 2
      );
    },

    // Separating Axis Theorem
    // https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
    intersects: function(other) {
      var r0 = this._points();
      var r1 = other._points();
      var axes = [toAxis(r0[0], r0[1]), toAxis(r0[0], r0[3])];
      var i, pr0, pr1;

      if (this._rotation !== other._rotation) {
        // Only separate with r1 axis if the rotation is different,
        // else it's enough to separate r0 and r1 with r0 axis only!
        axes.push(toAxis(r1[0], r1[1]), toAxis(r1[0], r1[3]));
      }

      for (i = 0; i < axes.length; ++i) {
        pr0 = projected(r0, axes[i]);
        pr1 = projected(r1, axes[i]);

        if (pr0.max < pr1.min || pr1.max < pr0.min) {
          return false;
        }
      }

      return true;
    },

    /**
     * @private
     */
    _points: function() {
      var me = this;
      var rect = me._rect;
      var angle = me._rotation;
      var center = me.center();

      return [
        rotated({ x: rect.x, y: rect.y }, center, angle),
        rotated({ x: rect.x + rect.w, y: rect.y }, center, angle),
        rotated({ x: rect.x + rect.w, y: rect.y + rect.h }, center, angle),
        rotated({ x: rect.x, y: rect.y + rect.h }, center, angle)
      ];
    }
  });

  function coordinates(view, model, geometry) {
    var point = model.positioner(view, model);
    var vx = point.vx;
    var vy = point.vy;

    if (!vx && !vy) {
      // if aligned center, we don't want to offset the center point
      return { x: point.x, y: point.y };
    }

    var w = geometry.w;
    var h = geometry.h;

    // take in account the label rotation
    var rotation = model.rotation;
    var dx =
      Math.abs((w / 2) * Math.cos(rotation)) +
      Math.abs((h / 2) * Math.sin(rotation));
    var dy =
      Math.abs((w / 2) * Math.sin(rotation)) +
      Math.abs((h / 2) * Math.cos(rotation));

    // scale the unit vector (vx, vy) to get at least dx or dy equal to
    // w or h respectively (else we would calculate the distance to the
    // ellipse inscribed in the bounding rect)
    var vs = 1 / Math.max(Math.abs(vx), Math.abs(vy));
    dx *= vx * vs;
    dy *= vy * vs;

    // finally, include the explicit offset
    dx += model.offset * vx;
    dy += model.offset * vy;

    return {
      x: point.x + dx,
      y: point.y + dy
    };
  }

  function collide(labels, collider) {
    var i, j, s0, s1;

    // IMPORTANT Iterate in the reverse order since items at the end of the
    // list have an higher weight/priority and thus should be less impacted
    // by the overlapping strategy.

    for (i = labels.length - 1; i >= 0; --i) {
      s0 = labels[i].$layout;

      for (j = i - 1; j >= 0 && s0._visible; --j) {
        s1 = labels[j].$layout;

        if (s1._visible && s0._box.intersects(s1._box)) {
          collider(s0, s1);
        }
      }
    }

    return labels;
  }

  function compute$1(labels) {
    var i, ilen, label, state, geometry, center;

    // Initialize labels for overlap detection
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      label = labels[i];
      state = label.$layout;

      if (state._visible) {
        geometry = label.geometry();
        center = coordinates(label._el._model, label.model(), geometry);
        state._box.update(center, geometry, label.rotation());
      }
    }

    // Auto hide overlapping labels
    return collide(labels, function(s0, s1) {
      var h0 = s0._hidable;
      var h1 = s1._hidable;

      if ((h0 && h1) || h1) {
        s1._visible = false;
      } else if (h0) {
        s0._visible = false;
      }
    });
  }

  var layout = {
    prepare: function(datasets) {
      var labels = [];
      var i, j, ilen, jlen, label;

      for (i = 0, ilen = datasets.length; i < ilen; ++i) {
        for (j = 0, jlen = datasets[i].length; j < jlen; ++j) {
          label = datasets[i][j];
          labels.push(label);
          label.$layout = {
            _box: new HitBox(),
            _hidable: false,
            _visible: true,
            _set: i,
            _idx: j
          };
        }
      }

      // TODO New `z` option: labels with a higher z-index are drawn
      // of top of the ones with a lower index. Lowest z-index labels
      // are also discarded first when hiding overlapping labels.
      labels.sort(function(a, b) {
        var sa = a.$layout;
        var sb = b.$layout;

        return sa._idx === sb._idx ? sb._set - sa._set : sb._idx - sa._idx;
      });

      this.update(labels);

      return labels;
    },

    update: function(labels) {
      var dirty = false;
      var i, ilen, label, model, state;

      for (i = 0, ilen = labels.length; i < ilen; ++i) {
        label = labels[i];
        model = label.model();
        state = label.$layout;
        state._hidable = model && model.display === 'auto';
        state._visible = label.visible();
        dirty |= state._hidable;
      }

      if (dirty) {
        compute$1(labels);
      }
    },

    lookup: function(labels, point) {
      var i, state;

      // IMPORTANT Iterate in the reverse order since items at the end of
      // the list have an higher z-index, thus should be picked first.

      for (i = labels.length - 1; i >= 0; --i) {
        state = labels[i].$layout;

        if (state && state._visible && state._box.contains(point)) {
          return labels[i];
        }
      }

      return null;
    },

    draw: function(chart, labels) {
      var i, ilen, label, state, geometry, center;

      for (i = 0, ilen = labels.length; i < ilen; ++i) {
        label = labels[i];
        state = label.$layout;

        if (state._visible) {
          geometry = label.geometry();
          center = coordinates(label._el._view, label.model(), geometry);
          state._box.update(center, geometry, label.rotation());
          label.draw(chart, center);
        }
      }
    }
  };

  var helpers$3 = Chart.helpers;

  var formatter = function(value) {
    if (helpers$3.isNullOrUndef(value)) {
      return null;
    }

    var label = value;
    var keys, klen, k;
    if (helpers$3.isObject(value)) {
      if (!helpers$3.isNullOrUndef(value.label)) {
        label = value.label;
      } else if (!helpers$3.isNullOrUndef(value.r)) {
        label = value.r;
      } else {
        label = '';
        keys = Object.keys(value);
        for (k = 0, klen = keys.length; k < klen; ++k) {
          label += (k !== 0 ? ', ' : '') + keys[k] + ': ' + value[keys[k]];
        }
      }
    }

    return '' + label;
  };

  /**
   * IMPORTANT: make sure to also update tests and TypeScript definition
   * files (`/test/specs/defaults.spec.js` and `/types/options.d.ts`)
   */

  var defaults = {
    align: 'center',
    anchor: 'center',
    backgroundColor: null,
    borderColor: null,
    borderRadius: 0,
    borderWidth: 0,
    clamp: false,
    clip: false,
    color: undefined,
    display: true,
    font: {
      family: undefined,
      lineHeight: 1.2,
      size: undefined,
      style: undefined,
      weight: null
    },
    formatter: formatter,
    labels: undefined,
    listeners: {},
    offset: 4,
    opacity: 1,
    padding: {
      top: 4,
      right: 4,
      bottom: 4,
      left: 4
    },
    rotation: 0,
    textAlign: 'start',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    textShadowBlur: 0,
    textShadowColor: undefined
  };

  /**
   * @see https://github.com/chartjs/Chart.js/issues/4176
   */

  var helpers$4 = Chart.helpers;
  var EXPANDO_KEY = '$datalabels';
  var DEFAULT_KEY = '$default';

  function configure(dataset, options) {
    var override = dataset.datalabels;
    var listeners = {};
    var configs = [];
    var labels, keys;

    if (override === false) {
      return null;
    }
    if (override === true) {
      override = {};
    }

    options = helpers$4.merge({}, [options, override]);
    labels = options.labels || {};
    keys = Object.keys(labels);
    delete options.labels;

    if (keys.length) {
      keys.forEach(function(key) {
        if (labels[key]) {
          configs.push(
            helpers$4.merge({}, [options, labels[key], { _key: key }])
          );
        }
      });
    } else {
      // Default label if no "named" label defined.
      configs.push(options);
    }

    // listeners: {<event-type>: {<label-key>: <fn>}}
    listeners = configs.reduce(function(target, config) {
      helpers$4.each(config.listeners || {}, function(fn, event) {
        target[event] = target[event] || {};
        target[event][config._key || DEFAULT_KEY] = fn;
      });

      delete config.listeners;
      return target;
    }, {});

    return {
      labels: configs,
      listeners: listeners
    };
  }

  function dispatchEvent(chart, listeners, label) {
    if (!listeners) {
      return;
    }

    var context = label.$context;
    var groups = label.$groups;
    var callback;

    if (!listeners[groups._set]) {
      return;
    }

    callback = listeners[groups._set][groups._key];
    if (!callback) {
      return;
    }

    if (helpers$4.callback(callback, [context]) === true) {
      // Users are allowed to tweak the given context by injecting values that can be
      // used in scriptable options to display labels differently based on the current
      // event (e.g. highlight an hovered label). That's why we update the label with
      // the output context and schedule a new chart render by setting it dirty.
      chart[EXPANDO_KEY]._dirty = true;
      label.update(context);
    }
  }

  function dispatchMoveEvents(chart, listeners, previous, label) {
    var enter, leave;

    if (!previous && !label) {
      return;
    }

    if (!previous) {
      enter = true;
    } else if (!label) {
      leave = true;
    } else if (previous !== label) {
      leave = enter = true;
    }

    if (leave) {
      dispatchEvent(chart, listeners.leave, previous);
    }
    if (enter) {
      dispatchEvent(chart, listeners.enter, label);
    }
  }

  function handleMoveEvents(chart, event) {
    var expando = chart[EXPANDO_KEY];
    var listeners = expando._listeners;
    var previous, label;

    if (!listeners.enter && !listeners.leave) {
      return;
    }

    if (event.type === 'mousemove') {
      label = layout.lookup(expando._labels, event);
    } else if (event.type !== 'mouseout') {
      return;
    }

    previous = expando._hovered;
    expando._hovered = label;
    dispatchMoveEvents(chart, listeners, previous, label);
  }

  function handleClickEvents(chart, event) {
    var expando = chart[EXPANDO_KEY];
    var handlers = expando._listeners.click;
    var label = handlers && layout.lookup(expando._labels, event);
    if (label) {
      dispatchEvent(chart, handlers, label);
    }
  }

  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/108
  function invalidate(chart) {
    if (chart.animating) {
      return;
    }

    // `chart.animating` can be `false` even if there is animation in progress,
    // so let's iterate all animations to find if there is one for the `chart`.
    var animations = Chart.animationService.animations;
    for (var i = 0, ilen = animations.length; i < ilen; ++i) {
      if (animations[i].chart === chart) {
        return;
      }
    }

    // No render scheduled: trigger a "lazy" render that can be canceled in case
    // of hover interactions. The 1ms duration is a workaround to make sure an
    // animation is created so the controller can stop it before any transition.
    chart.render({ duration: 1, lazy: true });
  }

  Chart.defaults.global.plugins.datalabels = defaults;

  var plugin = {
    id: 'datalabels',

    beforeInit: function(chart) {
      chart[EXPANDO_KEY] = {
        _actives: []
      };
    },

    beforeUpdate: function(chart) {
      var expando = chart[EXPANDO_KEY];
      expando._listened = false;
      expando._listeners = {}; // {<event-type>: {<dataset-index>: {<label-key>: <fn>}}}
      expando._datasets = []; // per dataset labels: [Label[]]
      expando._labels = []; // layouted labels: Label[]
    },

    afterDatasetUpdate: function(chart, args, options) {
      var datasetIndex = args.index;
      var expando = chart[EXPANDO_KEY];
      var labels = (expando._datasets[datasetIndex] = []);
      var visible = chart.isDatasetVisible(datasetIndex);
      var dataset = chart.data.datasets[datasetIndex];
      var config = configure(dataset, options);
      var elements = args.meta.data || [];
      var ctx = chart.ctx;
      var i, j, ilen, jlen, cfg, key, el, label;

      ctx.save();

      for (i = 0, ilen = elements.length; i < ilen; ++i) {
        el = elements[i];
        el[EXPANDO_KEY] = [];

        if (visible && el && !el.hidden && !el._model.skip) {
          for (j = 0, jlen = config.labels.length; j < jlen; ++j) {
            cfg = config.labels[j];
            key = cfg._key;

            label = new Label(cfg, ctx, el, i);
            label.$groups = {
              _set: datasetIndex,
              _key: key || DEFAULT_KEY
            };
            label.$context = {
              active: false,
              chart: chart,
              dataIndex: i,
              dataset: dataset,
              datasetIndex: datasetIndex
            };

            label.update(label.$context);
            el[EXPANDO_KEY].push(label);
            labels.push(label);
          }
        }
      }

      ctx.restore();

      // Store listeners at the chart level and per event type to optimize
      // cases where no listeners are registered for a specific event.
      helpers$4.merge(expando._listeners, config.listeners, {
        merger: function(event, target, source) {
          target[event] = target[event] || {};
          target[event][args.index] = source[event];
          expando._listened = true;
        }
      });
    },

    afterUpdate: function(chart, options) {
      chart[EXPANDO_KEY]._labels = layout.prepare(
        chart[EXPANDO_KEY]._datasets,
        options
      );
    },

    // Draw labels on top of all dataset elements
    // https://github.com/chartjs/chartjs-plugin-datalabels/issues/29
    // https://github.com/chartjs/chartjs-plugin-datalabels/issues/32
    afterDatasetsDraw: function(chart) {
      layout.draw(chart, chart[EXPANDO_KEY]._labels);
    },

    beforeEvent: function(chart, event) {
      // If there is no listener registered for this chart, `listened` will be false,
      // meaning we can immediately ignore the incoming event and avoid useless extra
      // computation for users who don't implement label interactions.
      if (chart[EXPANDO_KEY]._listened) {
        switch (event.type) {
          case 'mousemove':
          case 'mouseout':
            handleMoveEvents(chart, event);
            break;
          case 'click':
            handleClickEvents(chart, event);
            break;
          default:
        }
      }
    },

    afterEvent: function(chart) {
      var expando = chart[EXPANDO_KEY];
      var previous = expando._actives;
      var actives = (expando._actives = chart.lastActive || []); // public API?!
      var updates = utils.arrayDiff(previous, actives);
      var i, ilen, j, jlen, update, label, labels;

      for (i = 0, ilen = updates.length; i < ilen; ++i) {
        update = updates[i];
        if (update[1]) {
          labels = update[0][EXPANDO_KEY] || [];
          for (j = 0, jlen = labels.length; j < jlen; ++j) {
            label = labels[j];
            label.$context.active = update[1] === 1;
            label.update(label.$context);
          }
        }
      }

      if (expando._dirty || updates.length) {
        layout.update(expando._labels);
        invalidate(chart);
      }

      delete expando._dirty;
    }
  };

  // TODO Remove at version 1, we shouldn't automatically register plugins.
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/42
  Chart.plugins.register(plugin);
  return Chart;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["charts.png", {url: "https://static.observableusercontent.com/files/e36cf4d7ed6922a7fac3f0953b774c27d67218d4577872a75f1883dd9b2ba56e92cd37f6f0d9201edf2d590e7198754b6769b9586bc5c7fbdf0a93cf0c2fdf29", mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md","FileAttachment"], _2);
  main.variable(observer("pie_doughnut_anchor")).define("pie_doughnut_anchor", ["md"], _pie_doughnut_anchor);
  main.variable(observer("pieAnchor")).define("pieAnchor", ["md"], _pieAnchor);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["pie","dataset"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["pie","patterns"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["html"], _10);
  main.variable(observer()).define(["pie","pattern"], _11);
  main.variable(observer("pie")).define("pie", ["d3","DOM","fac","Chart","merge"], _pie);
  main.variable(observer("doughnutAnchor")).define("doughnutAnchor", ["md"], _doughnutAnchor);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["doughnut","dataset"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["doughnut","patterns"], _17);
  main.variable(observer("doughnut")).define("doughnut", ["pie"], _doughnut);
  main.variable(observer("barAnchor")).define("barAnchor", ["md"], _barAnchor);
  main.variable(observer("verticalBarAnchor")).define("verticalBarAnchor", ["md"], _verticalBarAnchor);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["verticalBar","datasetBars"], _22);
  main.variable(observer("horizontalBarAnchor")).define("horizontalBarAnchor", ["md"], _horizontalBarAnchor);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["horizontalBar","datasetBars"], _25);
  main.variable(observer("stackedBarAnchor")).define("stackedBarAnchor", ["md"], _stackedBarAnchor);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["stackedBar","datasetBars"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["stackedBar","datasetBars","patterns"], _30);
  main.variable(observer("stackedHorizontalBarAnchor")).define("stackedHorizontalBarAnchor", ["md"], _stackedHorizontalBarAnchor);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["stackedHorizontalBar","datasetBars"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["stackedHorizontalBar","datasetBars","patterns"], _35);
  main.variable(observer("stackedHorizontalBar")).define("stackedHorizontalBar", ["bar"], _stackedHorizontalBar);
  main.variable(observer("stackedBar")).define("stackedBar", ["bar"], _stackedBar);
  main.variable(observer("horizontalBar")).define("horizontalBar", ["bar"], _horizontalBar);
  main.variable(observer("verticalBar")).define("verticalBar", ["bar"], _verticalBar);
  main.variable(observer("bar")).define("bar", ["d3","DOM","Chart","merge"], _bar);
  main.variable(observer("linesAnchor")).define("linesAnchor", ["md"], _linesAnchor);
  main.variable(observer("basicAnchor")).define("basicAnchor", ["md"], _basicAnchor);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["line","datasetLines"], _44);
  main.variable(observer("filledAnchor")).define("filledAnchor", ["md"], _filledAnchor);
  main.variable(observer()).define(["filledLine","datasetLines"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["filledLine","datasetLines","patterns"], _48);
  main.variable(observer("stackedLineAnchor")).define("stackedLineAnchor", ["md"], _stackedLineAnchor);
  main.variable(observer()).define(["stackedLine","datasetLines"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["stackedLine","datasetLines","patterns"], _52);
  main.variable(observer("stackedLine")).define("stackedLine", ["line"], _stackedLine);
  main.variable(observer("filledLine")).define("filledLine", ["line"], _filledLine);
  main.variable(observer("line")).define("line", ["d3","DOM","Chart","hexToRGB","merge"], _line);
  main.variable(observer("linePattern")).define("linePattern", ["DOM","Chart","patterns"], _linePattern);
  main.variable(observer("customization")).define("customization", ["md"], _customization);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("customizeColors")).define("customizeColors", ["md"], _customizeColors);
  main.variable(observer("predefinedColorSchemes")).define("predefinedColorSchemes", ["md"], _predefinedColorSchemes);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer()).define(["pie","dataset"], _62);
  main.variable(observer("customColorArray")).define("customColorArray", ["md"], _customColorArray);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer()).define(["doughnut","dataset"], _65);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["bar","patterns"], _67);
  main.variable(observer()).define(["doughnut","dataset","patterns"], _68);
  main.variable(observer("customizeSize")).define("customizeSize", ["md"], _customizeSize);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer()).define(["stackedHorizontalBar","datasetBars","width"], _71);
  main.variable(observer("datalabels")).define("datalabels", ["md"], _datalabels);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer()).define(["stackedBar","datasetBars"], _74);
  main.variable(observer("axislabels")).define("axislabels", ["md"], _axislabels);
  main.variable(observer()).define(["verticalBar","datasetBars"], _76);
  main.variable(observer("datasetProperties")).define("datasetProperties", ["md"], _datasetProperties);
  main.variable(observer()).define(["filledLine","datasetLines","patterns"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer()).define(["pie","patterns"], _80);
  main.variable(observer("whatAbout")).define("whatAbout", ["md"], _whatAbout);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("patterns")).define("patterns", ["patternsWithUrls","DOM","base64Strings"], _patterns);
  main.variable(observer("base64Strings")).define("base64Strings", ["patternsWithUrls","rasterize"], _base64Strings);
  main.variable(observer("patternUrls")).define("patternUrls", _patternUrls);
  main.variable(observer("patternsWithUrls")).define("patternsWithUrls", ["patternUrls"], _patternsWithUrls);
  main.variable(observer("rasterize")).define("rasterize", ["html","DOM","XMLSerializer"], _rasterize);
  main.variable(observer("dataset")).define("dataset", _dataset);
  main.variable(observer("datasetBars")).define("datasetBars", _datasetBars);
  main.variable(observer("datasetLines")).define("datasetLines", _datasetLines);
  main.variable(observer("merge")).define("merge", _merge);
  main.variable(observer()).define(["concious_analytics","html"], _92);
  const child1 = runtime.module(define1);
  main.import("concious_analytics", child1);
  main.variable(observer("hexToRGB")).define("hexToRGB", _hexToRGB);
  main.variable(observer("pattern")).define("pattern", ["require"], _pattern);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("fac")).define("fac", ["FastAverageColor"], _fac);
  main.variable(observer("FastAverageColor")).define("FastAverageColor", ["require"], _FastAverageColor);
  main.variable(observer("Chart")).define("Chart", ["require","addOutlabels","addDatalabels"], _Chart);
  main.variable(observer("addOutlabels")).define("addOutlabels", _addOutlabels);
  main.variable(observer("addDatalabels")).define("addDatalabels", _addDatalabels);
  return main;
}
