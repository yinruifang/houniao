//对获取数据的封装
//api地址
const apiurl = "https://www.51houniao.com";

//优化，获取数据时显示提示
const pagedata = {
  get(callback, url) {
    uni.showLoading({
      title: '加载中...',
    })
    uni.request({
      url: apiurl + url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //隐藏提示
        uni.hideLoading();
        callback('success', res);
      },
      fail: function (err) {
        console.log(err);
      }

    })
  },
  post(callback, url, data) {
    uni.showLoading({
      title: '加载中...',
    })
    uni.request({
      url: apiurl + url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //隐藏提示
        uni.hideLoading();
        callback('success', res);
      },
      fail: function (err) {
        console.log(err);
      }

    })
  }
}

//输出
module.exports = {
  apidata: pagedata
}