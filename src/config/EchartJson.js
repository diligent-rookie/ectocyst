import echarts from 'echarts'
export const LineEchart = (linedata) => {
  let totaldata = parseInt(linedata[0].totalMemorySize / 1024)
  var useddata = []
  linedata.map((item) => {
    useddata[useddata.length] = +((item.usedMemory / 1024).toFixed(2))
  })
  let option = {
    title: {
      text: '近5分钟内电脑的使用情况',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#CCC'
      },
      left: '6%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      },
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 10,
      formatter: function (params) {
        return '当前时间前 ' + params[0].name + ' 分钟' + '<br>' +
          '内存使用 ' + params[0].value + ' G'
      },
      textStyle: {
        color: '#eee',
        lineHeight: 10
      }
    },
    legend: {
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ['已使用内存'],
      right: '4%',
      textStyle: {
        fontSize: 12,
        color: '#F1F1F3'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      name: 'min',
      nameTextStyle: {
        color: '#fff',
        align: 'left'
      },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#57617B'
        }
      },
      data: [
        0.5, 1, 1.5, 2, 2.5,
        3, 3.5, 4, 4.5, 5
      ]
    }],
    yAxis: [{
      type: 'value',
      name: 'G',
      max: totaldata,
      min: 0,
      nameTextStyle: {
        color: '#fff',
        align: 'left'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#57617B'
        }
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14
        }
      },
      splitLine: {
        lineStyle: {
          color: '#57617B'
        }
      }
    }],
    series: [
      {
        name: '已使用内存',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(239,113,100,0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 136, 212, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(239,113,100)'
          }
        },
        data: useddata
      }
    ]
  }
  return option
}
export const MapEchart = (geodata) => {
  // console.log(geodata)
  let labels = [
    {name: '连通状态', id: 'link'},
    {name: '失连状态', id: 'notlink'}
  ]
  let colors = ['#0fff17', '#ffff17']
  // 数据格式处理
  let GeoData = {
    'link': [],
    'notlink': []
  }
  geodata.map((item, idx) => {
    item.status === 2 ? GeoData['notlink'][GeoData['notlink'].length] = {
      name: item.stationName,
      value: [item.longitude, item.latitude],
      id: item.id
    } : GeoData['link'][GeoData['link'].length] = {
      name: item.stationName,
      value: [item.longitude, item.latitude],
      id: item.id
    }
  })
  var series = labels.map((item, idx) => {
    var name = item.name
    var data = GeoData[item.id]
    var color = colors[idx]
    return {
      name: name,
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 3,
      symbol: 'circle',
      symbolSize: 10,
      showLegendSymbol: true,
      rippleEffect: {
        brushType: 'stroke',
        period: 10,
        scale: 3
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          offset: [1, 6],
          show: true,
          textStyle: {
            color: color
          }
        }
      },
      itemStyle: {
        normal: {
          show: true,
          color: color
        }
      },
      data: data
    }
  })
  function area (name, color) {
    let a = {
      name: name,
      selected: true,
      itemStyle: {
        emphasis: {
          areaColor: color,
          borderColor: '#29D4ED',
          borderWidth: 2
        }
      }
    }
    return a
  }
  let option = {
    title: {
      text: '台站信息展示',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return '城市名称：' + params.data.name + '<br>' +
          '坐标显示：' + params.data.value
      }
    },

    legend: {
      orient: 'vertical',
      right: 10,
      top: 20,
      data: ['连通状态', '失连状态'],
      textStyle: {
        color: '#fff',
        fontSize: 18
      },
      selected: {
        '连通状态': true,
        '失连状态': true,
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: true,
          color: '#fff',
          fontSize: 16
        }
      },
      roam: true,
      center: [98.2, 34.91],
      zoom: 5,
      scaleLimit: {
        min: 1,
        max: 10,
      },
      itemStyle: {
        normal: {
          areaColor: '#0A193A',
          borderColor: '#0A193A'
        },
        emphasis: {
          areaColor: 'rgba(41,212,237,0.1)'
        }
      },
      regions: [area('新疆', 'rgba(41,212,237,0.1)'),
        area('甘肃', 'rgba(41,212,237,0.1)'),
        area('青海', 'rgba(41,212,237,0.5)'),
        area('西藏', 'rgba(41,212,237,0.1)'),
        area('四川', 'rgba(41,212,237,0.1)')
      ]

    },
    series: series

  }
  return option
}
