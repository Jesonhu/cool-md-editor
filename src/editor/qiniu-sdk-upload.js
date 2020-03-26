import request from '../util/http';

const BASE_API_URL = 'http://127.0.0.1:3001/api/qiniu';
const apiUrl = {
  getToken: BASE_API_URL + '/get_token'
}

/**
 * 七牛 SDK 方式上传
 * (前端直接上传到七牛云服务器方式)
 */
class QiniuUplaod {
  constructor(options = {}) {
    this.initData(options);
  }

  initData(options) {
    this.qiniuOptions = Object.assign({
      token: '',
      baseUrl: '',
      config: {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z1
      },
      putExtra: {
        fname: "",
        params: {},
        mimeType: null
      }
    }, options);
    
    const self = this;
    this.fetchGetToken()
      .then(res => {
        const resData = res;
        const { status, data } = resData;
        if (status) {
          self.qiniuOptions.token = data.token;
          self.qiniuOptions.baseUrl = data.domain;
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchGetToken() {
    const url = this.qiniuOptions.tokenApiUrl || apiUrl.getToken;
    return new Promise((resolve, reject) => {
      request.ajax({
        url: url,
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    })
  }

  /**
   * 获取存储区域的地址
   * 
   * @see https://developer.qiniu.com/kodo/manual/1671/region-endpoint
   */
  getRegionUrl(mark) {
    const clientMap = {
      /** 华东 */
      'z0': '//upload.qiniup.com',
      /** 华北 */
      'z1': '//upload-z1.qiniup.com',
      /** 华南 */
      'z2': '//upload-z2.qiniup.com',
      /** 北美 */
      'na0': '//upload-na0.qiniup.com',
      /** 东南亚 */
      'as0': '//upload-as0.qiniup.com'
    }
    return clientMap[mark] || '';
  }

  /**
   * 
   * @see doc: https://developer.qiniu.com/kodo/sdk/1283/javascript
   */
  uploadWithSDK(file, key) {
    const token = this.qiniuOptions.token;
    const putExtra = this.qiniuOptions.putExtra;
    const config = this.qiniuOptions.config;

    putExtra.params["x:name"] = key;
    // putExtra.params["x:name"] = key.split(".")[0];

    // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
    var error = function(err) {
    };

    var complete = function(res) {
      if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
        consoel.log('===== complete ===== res:  %o', res);
      }
    };

    var next = function(response) {}

    var subObject = { 
      next: next,
      error: error,
      complete: complete
    };
    let subscription;
    let observable;
    // 调用sdk上传接口获得相应的observable，控制上传和暂停
    observable = qiniu.upload(file, key, token, putExtra, config);

    // 上传
    subscription = observable.subscribe(subObject);
    // 暂停上传
    // subscription.unsubscribe();
  }

  /**
   * base64格式的图片上传.
   * 
   * @see https://developer.qiniu.com/kodo/kb/1326/how-to-upload-photos-to-seven-niuyun-base64-code
   */
  putb64(base64) {
    const pic = this.base64encode(base64);
    const token = this.qiniuOptions.token;
    const fileSize = this.getBase64Size(base64);
    const regionUrl = this.getRegionUrl(this.qiniuOptions.region);
    const url = `${regionUrl}/putb64/${fileSize}`;
    const self = this;

    return new Promise((resolve, reject) => {
      request.ajax({
        url: url,
        type: 'POST',
        data: pic,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': `UpToken ${token}`
        },
        success: function(res) {
          console.log('domain', self.qiniuOptions);
          resolve({ domain: self.qiniuOptions.baseUrl, hash: res.hash });
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }

  /** 
   * 获取 base64 图片的大小.
   * 
   * @see https://blog.csdn.net/chenyejunjun/article/details/54924355
   */
  getBase64Size(base64url) {
    //获取base64图片大小，返回MB数字
    var str = base64url.replace('data:image/png;base64,', '');
    var equalIndex = str.indexOf('=');
    if(str.indexOf('=')>0) {
        str=str.substring(0, equalIndex);
    }
    // 原来的字符流大小，单位为字节
    var strLength=str.length;
    // 计算后得到的文件流大小，单位为字节
    var fileLength=parseInt(strLength-(strLength/8)*2);

    return fileLength;

    // 由字节转换为MB
    // var size = "";
    // size = (fileLength/(1024 * 1024)).toFixed(2);
    // var sizeStr = size + "";                        //转成字符串
    // var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    // var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    // if(dou == "00"){                                //判断后两位是否为00，如果是则删除00                
    //     return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    // }
    // return parseInt(size);
  }

  /**
   * URL安全的Base64编码
   */
  base64encode(base64url) {
    const str1 = base64url.replace('data:image/png;base64,', '')
    return str1;

    // const str1 = base64url.replace('data:image/png;base64,', '')
    // const str2 = str1.replace(/\+/g, '-')
    // return str2.replace(/\//g, '_');

    // *把头部的data:image/png;base64,去掉。（注意：base64后面的逗号也去掉）*/
    // return base64url.replace('data:image/png;base64,', '');
  }
}

export default QiniuUplaod;