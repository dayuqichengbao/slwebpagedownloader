import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.vue");import { ref } from "/node_modules/.vite/deps/vue.js?v=24286f37"


const _sfc_main = {
  __name: 'App',
  setup(__props, { expose: __expose }) {
  __expose();

const url = ref('https://www.baidu.com')

const tools = [
  'History',
  'Settings',
  'Queue',
  'Log',
  'File',
  'Folder',
  'Download',
  'Next',
  'Pause',
  'Stop'
]

const __returned__ = { url, tools, ref }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

}
import { createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, vModelText as _vModelText, withDirectives as _withDirectives, createStaticVNode as _createStaticVNode } from "/node_modules/.vite/deps/vue.js?v=24286f37"

const _hoisted_1 = { class: "app-container" }
const _hoisted_2 = { class: "control-panel" }
const _hoisted_3 = { class: "toolbar" }
const _hoisted_4 = { class: "url-input" }
const _hoisted_5 = { class: "table" }

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createCommentVNode(" 左侧：网页展示区 "),
    _cache[6] || (_cache[6] = _createElementVNode("div", { class: "web-panel" }, [
      _createElementVNode("div", { class: "browser-bar" }, [
        _createElementVNode("div", { class: "window-controls" }, [
          _createElementVNode("span", { class: "dot red" }),
          _createElementVNode("span", { class: "dot yellow" }),
          _createElementVNode("span", { class: "dot green" })
        ]),
        _createElementVNode("div", { class: "address-bar" }, [
          _createElementVNode("span", { class: "lock" }, "🔒"),
          _createElementVNode("span", { class: "url-text" }, "https://www.baidu.com")
        ])
      ]),
      _createElementVNode("iframe", {
        class: "webview",
        src: "https://www.baidu.com",
        frameborder: "0"
      })
    ], -1 /* CACHED */)),
    _createCommentVNode(" 右侧：操作区 "),
    _createElementVNode("div", _hoisted_2, [
      _createCommentVNode(" 顶部工具栏 "),
      _createElementVNode("div", _hoisted_3, [
        (_openBlock(), _createElementBlock(_Fragment, null, _renderList($setup.tools, (item) => {
          return _createElementVNode("div", {
            class: "tool-item",
            key: item
          }, _toDisplayString(item), 1 /* TEXT */)
        }), 64 /* STABLE_FRAGMENT */))
      ]),
      _createCommentVNode(" URL 输入 "),
      _createElementVNode("div", _hoisted_4, [
        _withDirectives(_createElementVNode("input", {
          type: "text",
          placeholder: "https://www.example.com",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.url) = $event))
        }, null, 512 /* NEED_PATCH */), [
          [_vModelText, $setup.url]
        ]),
        _cache[1] || (_cache[1] = _createElementVNode("button", { class: "primary-btn" }, "Download", -1 /* CACHED */))
      ]),
      _createCommentVNode(" 统计信息 "),
      _cache[4] || (_cache[4] = _createStaticVNode("<div class=\"stats\" data-v-7a7a37b1><div class=\"stat-item\" data-v-7a7a37b1>Level: 0</div><div class=\"stat-item\" data-v-7a7a37b1>Files Downloaded: 0</div><div class=\"stat-item\" data-v-7a7a37b1>Files Remaining: 0</div><div class=\"stat-item\" data-v-7a7a37b1>Errors: 0</div></div>", 1)),
      _createCommentVNode(" 下载列表 "),
      _createElementVNode("div", _hoisted_5, [
        _cache[3] || (_cache[3] = _createE