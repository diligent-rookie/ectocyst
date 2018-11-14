import echarts from 'echarts'
export const LineEchart = (linedata) => {
  let totaldata = parseInt(linedata[0].totalMemorySize / 1024)
  let useddata = []
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
  let labels = ['连通状态', '失连状态']
  let colors = ['#000', '#fff']
  // 数据格式处理
  let GeoData = {
    '连通状态': [],
    '失连状态': []
  }
  geodata.map((item, idx) => {
    item.status === 2 ? GeoData['失连状态'][GeoData['失连状态'].length] = {
      name: item.stationName,
      value: [item.longitude, item.latitude]
    } : GeoData['连通状态'][GeoData['连通状态'].length] = {
      name: item.stationName,
      value: [item.longitude, item.latitude]
    }
  })
  console.log('地图数据', GeoData)
  var series = labels.map((item, idx) => {
    var name = item
    var data = GeoData[name]
    var color = colors[idx]
    console.log('单个数据', data)
    return {

      // name: name,
      // type: 'effectScatter',
      // // coordinateSystem: 'bmap',
      // data: data,
      // showEffectOn: 'render',
      // rippleEffect: {
      //   brushType: 'stroke'
      // },
      // itemStyle: {
      //   normal: {
      //     color: color
      //   }
      // }
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 3,
      symbol: 'circle',
      symbolSize: 5,
      showLegendSymbol: true,
      rippleEffect: {
        brushType: 'stroke',
        period: 5,
        scale: 7
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
    legend: {
      orient: 'vertical',
      icon: 'circle',
      bottom: '50',
      left: '10',
      color: colors,
      backgroundColor: 'rgba(255,255,255,0.8)',
      data: [{
        name: '连通状态',
        textStyle: {
          color: '#000'
        }
      }, {
        name: '失连状态',
        textStyle: {
          color: '#fff'
        }
      }],
      formatter: function (name) {
        console.log('图例')
        return '状态 ' + name
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return '城市名称：' + params.data.name + '<br>' +
          '坐标显示：' + params.data.value
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
      center: [92.8, 36.81],
      zoom: 2,
      scaleLimit: {
        min: 1,
        max: 5,
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
    // series: [
    //   {
    //     type: 'effectScatter',
    //     coordinateSystem: 'geo',
    //     showEffectOn: 'render',
    //     zlevel: 3,
    //     symbol: 'circle',
    //     symbolSize: 5,
    //     rippleEffect: {
    //       brushType: 'stroke',
    //       period: 5,
    //       scale: 7
    //     },
    //     label: {
    //       normal: {
    //         formatter: '{b}',
    //         position: 'right',
    //         offset: [1, 6],
    //         show: true,
    //         textStyle: {
    //           color: '#FF8600'
    //         }
    //       }
    //     },
    //     itemStyle: {
    //       normal: {
    //         show: true,
    //         color: '#FF8600'
    //       }
    //     },
    //     data: GeoData
    //   }
    // ]

  }
  return option
}
