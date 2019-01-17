/**
 * 代理配置
 * @param {string[]} list
 * @param {string} target
 * @returns
 */
function GetList(list, target) {
  return Object.assign(
    ...list.map(t => ({
      [t]: {
        target: target,
        changeOrigin: true,
        secure: false //true/false, if you want to verify the SSL Certs
      }
    }))
  )
}

let target_url = 'https://easy-mock.com/mock/5a5ee2dcdec01f1bea369ae4';

const pages = [
  '/**/*.aspx',
  '/**/*.ashx',
  '/**/*.axd',
  '/log/',
];

module.exports = {
  '/api/': {
    target: target_url,
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '/element-demo/'
    }
  },
  ...GetList(pages, target_url)
}