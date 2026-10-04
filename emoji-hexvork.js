/**
 * Hexvork Emoji Pack for Artalk / HexID
 *
 * 使用方式：
 * 1. 独立引入脚本：
 *    <script src="https://cdn.jsdmirror.com/gh/Hexvork/HexID-JS@main/emoji-hexvork.js"></script>
 *    若页面已引入 HexID / Artalk，脚本会自动作为插件注入，无需修改 HexID.js 核心代码；
 * 2. 在 Artalk.init 配置中直接调用：
 *    Artalk.init({
 *      emoticons: [
 *        '/emoticons/default.json',
 *        window.HexvorkEmoticons
 *      ]
 *    });
 * 3. 模块化环境引入：
 *    import hexvorkEmoticons from './emoji-hexvork.js';
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var pack = factory();
    root.HexvorkEmoticons = pack;
    root.HexvorkEmoji = pack;

    // 自动接入 Artalk 插件机制（支持在 HexID.js 之前或之后加载）
    root.ArtalkPlugins = root.ArtalkPlugins || {};
    root.ArtalkPlugins.HexvorkEmoticons = function (ctx) {
      if (!ctx || typeof ctx.getConf !== 'function') return;
      var conf = ctx.getConf();
      var emoticons = conf.emoticons;
      if (!emoticons) {
        emoticons = [];
      } else if (!Array.isArray(emoticons)) {
        emoticons = [emoticons];
      } else {
        emoticons = emoticons.slice();
      }

      // 避免重复挂载
      var exists = emoticons.some(function (item) {
        return item && (item === pack || item.name === pack.name);
      });
      if (!exists) {
        emoticons.unshift(pack);
        ctx.updateConf({ emoticons: emoticons });
      }
    };

    if (root.Artalk && typeof root.Artalk.use === 'function') {
      root.Artalk.use(root.ArtalkPlugins.HexvorkEmoticons);
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  var CDN_PREFIX = 'https://cdn.jsdmirror.com/gh/Hexvork/HexID-JS@main/emoticons/Hexvork/';
  var EMOJIS = [
    'hexvork-smile',
    'hexvork-happy',
    'hexvork-laugh',
    'hexvork-delighted',
    'hexvork-thumbsup',
    'hexvork-cheer',
    'hexvork-shocked',
    'hexvork-panic',
    'hexvork-confused',
    'hexvork-thinking',
    'hexvork-unhappy',
    'hexvork-puzzled',
    'hexvork-fish',
    'hexvork-calm',
    'hexvork-proud',
    'hexvork-victory',
    'hexvork-angry',
    'hexvork-pout',
    'hexvork-sad',
    'hexvork-cry',
    'hexvork-bawl',
    'hexvork-jail',
    'hexvork-shy',
    'hexvork-sweat',
    'hexvork-gun',
    'hexvork-sigh',
    'hexvork-fight',
    'hexvork-frozen',
    'hexvork-cool',
    'hexvork-smirk',
    'hexvork-dizzy',
    'hexvork-eat',
    'hexvork-exhausted',
    'hexvork-wave',
    'hexvork-celebrate',
    'hexvork-sleep'
  ];

  var items = EMOJIS.map(function (key) {
    return {
      key: key,
      val: CDN_PREFIX + key + '.webp'
    };
  });

  return {
    name: 'Hexvork',
    type: 'image',
    items: items
  };
});
