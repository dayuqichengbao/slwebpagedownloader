define('amd_modules/@baidu/video-meeting/dist/index', [
    'require',
    'san',
    'tslib'
], function (require, t, e) {
    return function (t) {
        var e = {};
        function n(a) {
            if (e[a])
                return e[a].exports;
            var i = e[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return t[a].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
        }
        return n.m = t, n.c = e, n.d = function (t, e, a) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: a
            });
        }, n.r = function (t) {
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 });
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e)
                return t;
            if (4 & e && 'object' == typeof t && t && t.__esModule)
                return t;
            var a = Object.create(null);
            if (n.r(a), Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    value: t
                }), 2 & e && 'string' != typeof t)
                for (var i in t)
                    n.d(a, i, function (e) {
                        return t[e];
                    }.bind(null, i));
            return a;
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t['default'];
            } : function () {
                return t;
            };
            return n.d(e, 'a', e), e;
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, n.p = '', n(n.s = 36);
    }([
        function (e, n) {
            e.exports = t;
        },
        function (t, e, n) {
            var a;
            (a = function () {
                'use strict';
                function e(t) {
                    '@babel/helpers - typeof';
                    return (e = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (t) {
                        return typeof t;
                    } : function (t) {
                        return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
                    })(t);
                }
                var a = n(0).defineComponent;
                function i(t, e) {
                    for (var n = {}, a = 0; a < e.length; a++)
                        o(n, e[a]);
                    var i = t.initData;
                    t.initData = i ? function () {
                        return o({}, i.call(this), { $style: n });
                    } : function () {
                        return n;
                    };
                }
                function o(t) {
                    if (null === t || t === undefined)
                        throw new TypeError('Cannot convert undefined or null to object');
                    for (var e = Object(t), n = 1; n < arguments.length; n++) {
                        var a = arguments[n];
                        if (null !== a && a !== undefined)
                            for (var i in a)
                                Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
                    }
                    return e;
                }
                t.exports = function (t, n, o) {
                    for (var r = function (t) {
                                var e = [t];
                                'function' == typeof t && (e.push(t.prototype), t.prototype.constructor && e.push(t.prototype.constructor.prototype));
                                return e;
                            }(t), s = 0; s < r.length; s++)
                        n && ('string' == typeof n ? r[s].template = n : n instanceof Array ? r[s].aPack = n : r[s].aNode = n), o.length && i(r[s], o);
                    return 'object' === e(t) ? a(t) : t;
                };
            }.apply(e, [])) === undefined || (t.exports = a);
        },
        function (t, e, n) {
            'use strict';
            var a = function () {
                    var t;
                    return function () {
                        return void 0 === t && (t = Boolean(window && document && document.all && !window.atob)), t;
                    };
                }(), i = function () {
                    var t = {};
                    return function (e) {
                        if ('undefined' == typeof t[e]) {
                            var n = document.querySelector(e);
                            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                                try {
                                    n = n.contentDocument.head;
                                } catch (a) {
                                    n = null;
                                }
                            t[e] = n;
                        }
                        return t[e];
                    };
                }(), o = [];
            function r(t) {
                for (var e = -1, n = 0; n < o.length; n++)
                    if (o[n].identifier === t) {
                        e = n;
                        break;
                    }
                return e;
            }
            function s(t, e) {
                for (var n = {}, a = [], i = 0; i < t.length; i++) {
                    var s = t[i], c = e.base ? s[0] + e.base : s[0], l = n[c] || 0, p = ''.concat(c, ' ').concat(l);
                    n[c] = l + 1;
                    var d = r(p), u = {
                            css: s[1],
                            media: s[2],
                            sourceMap: s[3]
                        };
                    -1 !== d ? (o[d].references++, o[d].updater(u)) : o.push({
                        identifier: p,
                        updater: h(u, e),
                        references: 1
                    }), a.push(p);
                }
                return a;
            }
            function c(t) {
                var e = document.createElement('style'), a = t.attributes || {};
                if ('undefined' == typeof a.nonce) {
                    var o = n.nc;
                    o && (a.nonce = o);
                }
                if (Object.keys(a).forEach(function (t) {
                        e.setAttribute(t, a[t]);
                    }), 'function' == typeof t.insert)
                    t.insert(e);
                else {
                    var r = i(t.insert || 'head');
                    if (!r)
                        throw new Error('Couldn\'t find a style target. This probably means that the value for the \'insert\' parameter is invalid.');
                    r.appendChild(e);
                }
                return e;
            }
            var l = function () {
                var t = [];
                return function (e, n) {
                    return t[e] = n, t.filter(Boolean).join('\n');
                };
            }();
            function p(t, e, n, a) {
                var i = n ? '' : a.media ? '@media '.concat(a.media, ' {').concat(a.css, '}') : a.css;
                if (t.styleSheet)
                    t.styleSheet.cssText = l(e, i);
                else {
                    var o = document.createTextNode(i), r = t.childNodes;
                    r[e] && t.removeChild(r[e]), r.length ? t.insertBefore(o, r[e]) : t.appendChild(o);
                }
            }
            var d = null, u = 0;
            function h(t, e) {
                var n, a, i;
                if (e.singleton) {
                    var o = u++;
                    n = d || (d = c(e)), a = p.bind(null, n, o, !1), i = p.bind(null, n, o, !0);
                } else
                    n = c(e), a = function (t, e, n) {
                        var a = n.css, i = n.media, o = n.sourceMap;
                        if (i ? t.setAttribute('media', i) : t.removeAttribute('media'), o && btoa && (a += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), ' */')), t.styleSheet)
                            t.styleSheet.cssText = a;
                        else {
                            for (; t.firstChild;)
                                t.removeChild(t.firstChild);
                            t.appendChild(document.createTextNode(a));
                        }
                    }.bind(null, n, e), i = function () {
                        !function (t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t);
                        }(n);
                    };
                return a(t), function (e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                            return;
                        a(t = e);
                    } else
                        i();
                };
            }
            t.exports = function (t, e) {
                (e = e || {}).singleton || 'boolean' == typeof e.singleton || (e.singleton = a());
                var n = s(t = t || [], e);
                return function (t) {
                    if (t = t || [], '[object Array]' === Object.prototype.toString.call(t)) {
                        for (var a = 0; a < n.length; a++) {
                            var i = r(n[a]);
                            o[i].references--;
                        }
                        for (var c = s(t, e), l = 0; l < n.length; l++) {
                            var p = r(n[l]);
                            0 === o[p].references && (o[p].updater(), o.splice(p, 1));
                        }
                        n = c;
                    }
                };
            };
        },
        function (t, e, n) {
            var a;
            (a = function () {
                'use strict';
                t.exports = function (t) {
                    var e = [];
                    return e.toString = function () {
                        return this.map(function (e) {
                            var n = function (t, e) {
                                var n = t[1] || '', a = t[3];
                                if (!a)
                                    return n;
                                if (e && 'function' == typeof btoa) {
                                    var i = function (t) {
                                            var e = btoa(unescape(encodeURIComponent(JSON.stringify(t)))), n = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(e);
                                            return '/*# '.concat(n, ' */');
                                        }(a), o = a.sources.map(function (t) {
                                            return '/*# sourceURL='.concat(a.sourceRoot || '').concat(t, ' */');
                                        });
                                    return [n].concat(o).concat([i]).join('\n');
                                }
                                return [n].join('\n');
                            }(e, t);
                            return e[2] ? '@media '.concat(e[2], ' {').concat(n, '}') : n;
                        }).join('');
                    }, e.i = function (t, n, a) {
                        'string' == typeof t && (t = [[
                                null,
                                t,
                                ''
                            ]]);
                        var i = {};
                        if (a)
                            for (var o = 0; o < this.length; o++) {
                                var r = this[o][0];
                                null != r && (i[r] = !0);
                            }
                        for (var s = 0; s < t.length; s++) {
                            var c = [].concat(t[s]);
                            a && i[c[0]] || (n && (c[2] ? c[2] = ''.concat(n, ' and ').concat(c[2]) : c[2] = n), e.push(c));
                        }
                    }, e;
                };
            }.apply(e, [])) === undefined || (t.exports = a);
        },
        function (t, n) {
            t.exports = e;
        },
        function (t, e, n) {
            var a, i;
            a = [
                e,
                n(47),
                n(51),
                n(55),
                n(62),
                n(16),
                n(66),
                n(70)
            ], (i = function (t, e, n, a, i, o, r, s) {
                'use strict';
                function c(t) {
                    return t && t.__esModule ? t : { 'default': t };
                }
                Object.defineProperty(t, '__esModule', { value: !0 }), Object.defineProperty(t, 'Select', {
                    enumerable: !0,
                    get: function () {
                        return e['default'];
                    }
                }), Object.defineProperty(t, 'Toast', {
                    enumerable: !0,
                    get: function () {
                        return n['default'];
                    }
                }), Object.defineProperty(t, 'Popup', {
                    enumerable: !0,
                    get: function () {
                        return a['default'];
                    }
                }), Object.defineProperty(t, 'Button', {
                    enumerable: !0,
                    get: function () {
                        return i['default'];
                    }
                }), Object.defineProperty(t, 'Checkbox', {
                    enumerable: !0,
                    get: function () {
                        return o['default'];
                    }
                }), Object.defineProperty(t, 'Input', {
                    enumerable: !0,
                    get: function () {
                        return r['default'];
                    }
                }), Object.defineProperty(t, 'Calendar', {
                    enumerable: !0,
                    get: function () {
                        return s['default'];
                    }
                }), e = c(e), n = c(n), a = c(a), i = c(i), o = c(o), r = c(r), s = c(s);
            }.apply(e, a)) === undefined || (t.exports = i);
        },
        function (t, e, n) {
            var a = n(1), i = [n(44)], o = n(46), r = n(12)['default'];
            t.exports = n(12), t.exports['default'] = a(r, o, i);
        },
        function (t, e, n) {
            var a = n(1), i = [n(87)], o = n(89), r = n(24)['default'];
            t.exports = n(24), t.exports['default'] = a(r, o, i);
        },
        function (t, e, n) {
            'use strict';
            n.r(e), n.d(e, 'Headers', function () {
                return p;
            }), n.d(e, 'Request', function () {
                return v;
            }), n.d(e, 'Response', function () {
                return b;
            }), n.d(e, 'DOMException', function () {
                return _;
            }), n.d(e, 'fetch', function () {
                return w;
            });
            var a = 'undefined' != typeof globalThis && globalThis || 'undefined' != typeof self && self || void 0 !== a && a, i = {
                    searchParams: 'URLSearchParams' in a,
                    iterable: 'Symbol' in a && 'iterator' in Symbol,
                    blob: 'FileReader' in a && 'Blob' in a && function () {
                        try {
                            return new Blob(), !0;
                        } catch (t) {
                            return !1;
                        }
                    }(),
                    formData: 'FormData' in a,
                    arrayBuffer: 'ArrayBuffer' in a
                };
            if (i.arrayBuffer)
                var o = [
                        '[object Int8Array]',
                        '[object Uint8Array]',
                        '[object Uint8ClampedArray]',
                        '[object Int16Array]',
                        '[object Uint16Array]',
                        '[object Int32Array]',
                        '[object Uint32Array]',
                        '[object Float32Array]',
                        '[object Float64Array]'
                    ], r = ArrayBuffer.isView || function (t) {
                        return t && o.indexOf(Object.prototype.toString.call(t)) > -1;
                    };
            function s(t) {
                if ('string' != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || '' === t)
                    throw new TypeError('Invalid character in header field name');
                return t.toLowerCase();
            }
            function c(t) {
                return 'string' != typeof t && (t = String(t)), t;
            }
            function l(t) {
                var e = {
                    next: function () {
                        var e = t.shift();
                        return {
                            done: e === undefined,
                            value: e
                        };
                    }
                };
                return i.iterable && (e[Symbol.iterator] = function () {
                    return e;
                }), e;
            }
            function p(t) {
                this.map = {}, t instanceof p ? t.forEach(function (t, e) {
                    this.append(e, t);
                }, this) : Array.isArray(t) ? t.forEach(function (t) {
                    this.append(t[0], t[1]);
                }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
                    this.append(e, t[e]);
                }, this);
            }
            function d(t) {
                if (t.bodyUsed)
                    return Promise.reject(new TypeError('Already read'));
                t.bodyUsed = !0;
            }
            function u(t) {
                return new Promise(function (e, n) {
                    t.onload = function () {
                        e(t.result);
                    }, t.onerror = function () {
                        n(t.error);
                    };
                });
            }
            function h(t) {
                var e = new FileReader(), n = u(e);
                return e.readAsArrayBuffer(t), n;
            }
            function f(t) {
                if (t.slice)
                    return t.slice(0);
                var e = new Uint8Array(t.byteLength);
                return e.set(new Uint8Array(t)), e.buffer;
            }
            function m() {
                return this.bodyUsed = !1, this._initBody = function (t) {
                    this.bodyUsed = this.bodyUsed, this._bodyInit = t, t ? 'string' == typeof t ? this._bodyText = t : i.blob && Blob.prototype.isPrototypeOf(t) ? this._bodyBlob = t : i.formData && FormData.prototype.isPrototypeOf(t) ? this._bodyFormData = t : i.searchParams && URLSearchParams.prototype.isPrototypeOf(t) ? this._bodyText = t.toString() : i.arrayBuffer && i.blob && function (t) {
                        return t && DataView.prototype.isPrototypeOf(t);
                    }(t) ? (this._bodyArrayBuffer = f(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : i.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(t) || r(t)) ? this._bodyArrayBuffer = f(t) : this._bodyText = t = Object.prototype.toString.call(t) : this._bodyText = '', this.headers.get('content-type') || ('string' == typeof t ? this.headers.set('content-type', 'text/plain;charset=UTF-8') : this._bodyBlob && this._bodyBlob.type ? this.headers.set('content-type', this._bodyBlob.type) : i.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'));
                }, i.blob && (this.blob = function () {
                    var t = d(this);
                    if (t)
                        return t;
                    if (this._bodyBlob)
                        return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                    if (this._bodyFormData)
                        throw new Error('could not read FormData body as blob');
                    return Promise.resolve(new Blob([this._bodyText]));
                }, this.arrayBuffer = function () {
                    if (this._bodyArrayBuffer) {
                        var t = d(this);
                        return t || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer));
                    }
                    return this.blob().then(h);
                }), this.text = function () {
                    var t = d(this);
                    if (t)
                        return t;
                    if (this._bodyBlob)
                        return function (t) {
                            var e = new FileReader(), n = u(e);
                            return e.readAsText(t), n;
                        }(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(function (t) {
                            for (var e = new Uint8Array(t), n = new Array(e.length), a = 0; a < e.length; a++)
                                n[a] = String.fromCharCode(e[a]);
                            return n.join('');
                        }(this._bodyArrayBuffer));
                    if (this._bodyFormData)
                        throw new Error('could not read FormData body as text');
                    return Promise.resolve(this._bodyText);
                }, i.formData && (this.formData = function () {
                    return this.text().then(y);
                }), this.json = function () {
                    return this.text().then(JSON.parse);
                }, this;
            }
            p.prototype.append = function (t, e) {
                t = s(t), e = c(e);
                var n = this.map[t];
                this.map[t] = n ? n + ', ' + e : e;
            }, p.prototype['delete'] = function (t) {
                delete this.map[s(t)];
            }, p.prototype.get = function (t) {
                return t = s(t), this.has(t) ? this.map[t] : null;
            }, p.prototype.has = function (t) {
                return this.map.hasOwnProperty(s(t));
            }, p.prototype.set = function (t, e) {
                this.map[s(t)] = c(e);
            }, p.prototype.forEach = function (t, e) {
                for (var n in this.map)
                    this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
            }, p.prototype.keys = function () {
                var t = [];
                return this.forEach(function (e, n) {
                    t.push(n);
                }), l(t);
            }, p.prototype.values = function () {
                var t = [];
                return this.forEach(function (e) {
                    t.push(e);
                }), l(t);
            }, p.prototype.entries = function () {
                var t = [];
                return this.forEach(function (e, n) {
                    t.push([
                        n,
                        e
                    ]);
                }), l(t);
            }, i.iterable && (p.prototype[Symbol.iterator] = p.prototype.entries);
            var g = [
                'DELETE',
                'GET',
                'HEAD',
                'OPTIONS',
                'POST',
                'PUT'
            ];
            function v(t, e) {
                if (!(this instanceof v))
                    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                var n = (e = e || {}).body;
                if (t instanceof v) {
                    if (t.bodyUsed)
                        throw new TypeError('Already read');
                    this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new p(t.headers)), this.method = t.method, this.mode = t.mode, this.signal = t.signal, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0);
                } else
                    this.url = String(t);
                if (this.credentials = e.credentials || this.credentials || 'same-origin', !e.headers && this.headers || (this.headers = new p(e.headers)), this.method = function (t) {
                        var e = t.toUpperCase();
                        return g.indexOf(e) > -1 ? e : t;
                    }(e.method || this.method || 'GET'), this.mode = e.mode || this.mode || null, this.signal = e.signal || this.signal, this.referrer = null, ('GET' === this.method || 'HEAD' === this.method) && n)
                    throw new TypeError('Body not allowed for GET or HEAD requests');
                if (this._initBody(n), !('GET' !== this.method && 'HEAD' !== this.method || 'no-store' !== e.cache && 'no-cache' !== e.cache)) {
                    var a = /([?&])_=[^&]*/;
                    if (a.test(this.url))
                        this.url = this.url.replace(a, '$1_=' + new Date().getTime());
                    else {
                        this.url += (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
                    }
                }
            }
            function y(t) {
                var e = new FormData();
                return t.trim().split('&').forEach(function (t) {
                    if (t) {
                        var n = t.split('='), a = n.shift().replace(/\+/g, ' '), i = n.join('=').replace(/\+/g, ' ');
                        e.append(decodeURIComponent(a), decodeURIComponent(i));
                    }
                }), e;
            }
            function b(t, e) {
                if (!(this instanceof b))
                    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
                e || (e = {}), this.type = 'default', this.status = e.status === undefined ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = 'statusText' in e ? e.statusText : '', this.headers = new p(e.headers), this.url = e.url || '', this._initBody(t);
            }
            v.prototype.clone = function () {
                return new v(this, { body: this._bodyInit });
            }, m.call(v.prototype), m.call(b.prototype), b.prototype.clone = function () {
                return new b(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new p(this.headers),
                    url: this.url
                });
            }, b.error = function () {
                var t = new b(null, {
                    status: 0,
                    statusText: ''
                });
                return t.type = 'error', t;
            };
            var x = [
                301,
                302,
                303,
                307,
                308
            ];
            b.redirect = function (t, e) {
                if (-1 === x.indexOf(e))
                    throw new RangeError('Invalid status code');
                return new b(null, {
                    status: e,
                    headers: { location: t }
                });
            };
            var _ = a.DOMException;
            try {
                new _();
            } catch (A) {
                (_ = function (t, e) {
                    this.message = t, this.name = e;
                    var n = Error(t);
                    this.stack = n.stack;
                }).prototype = Object.create(Error.prototype), _.prototype.constructor = _;
            }
            function w(t, e) {
                return new Promise(function (n, o) {
                    var r = new v(t, e);
                    if (r.signal && r.signal.aborted)
                        return o(new _('Aborted', 'AbortError'));
                    var s = new XMLHttpRequest();
                    function l() {
                        s.abort();
                    }
                    s.onload = function () {
                        var t = {
                            status: s.status,
                            statusText: s.statusText,
                            headers: function (t) {
                                var e = new p();
                                return t.replace(/\r?\n[\t ]+/g, ' ').split('\r').map(function (t) {
                                    return 0 === t.indexOf('\n') ? t.substr(1, t.length) : t;
                                }).forEach(function (t) {
                                    var n = t.split(':'), a = n.shift().trim();
                                    if (a) {
                                        var i = n.join(':').trim();
                                        e.append(a, i);
                                    }
                                }), e;
                            }(s.getAllResponseHeaders() || '')
                        };
                        t.url = 'responseURL' in s ? s.responseURL : t.headers.get('X-Request-URL');
                        var e = 'response' in s ? s.response : s.responseText;
                        setTimeout(function () {
                            n(new b(e, t));
                        }, 0);
                    }, s.onerror = function () {
                        setTimeout(function () {
                            o(new TypeError('Network request failed'));
                        }, 0);
                    }, s.ontimeout = function () {
                        setTimeout(function () {
                            o(new TypeError('Network request failed'));
                        }, 0);
                    }, s.onabort = function () {
                        setTimeout(function () {
                            o(new _('Aborted', 'AbortError'));
                        }, 0);
                    }, s.open(r.method, function (t) {
                        try {
                            return '' === t && a.location.href ? a.location.href : t;
                        } catch (e) {
                            return t;
                        }
                    }(r.url), !0), 'include' === r.credentials ? s.withCredentials = !0 : 'omit' === r.credentials && (s.withCredentials = !1), 'responseType' in s && (i.blob ? s.responseType = 'blob' : i.arrayBuffer && r.headers.get('Content-Type') && -1 !== r.headers.get('Content-Type').indexOf('application/octet-stream') && (s.responseType = 'arraybuffer')), !e || 'object' != typeof e.headers || e.headers instanceof p ? r.headers.forEach(function (t, e) {
                        s.setRequestHeader(e, t);
                    }) : Object.getOwnPropertyNames(e.headers).forEach(function (t) {
                        s.setRequestHeader(t, c(e.headers[t]));
                    }), r.signal && (r.signal.addEventListener('abort', l), s.onreadystatechange = function () {
                        4 === s.readyState && r.signal.removeEventListener('abort', l);
                    }), s.send('undefined' == typeof r._bodyInit ? null : r._bodyInit);
                });
            }
            w.polyfill = !0, a.fetch || (a.fetch = w, a.Headers = p, a.Request = v, a.Response = b);
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0, e.getBrowser = void 0, e.getBrowser = function () {
                var t = navigator.userAgent.toLowerCase(), e = {
                        type: '',
                        versions: 0
                    }, n = {
                        IE: 'ActiveXObject' in window,
                        Chrome: t.indexOf('chrome') > -1 && t.indexOf('safari') > -1,
                        Firefox: t.indexOf('firefox') > -1,
                        Opera: t.indexOf('opera') > -1,
                        Safari: t.indexOf('safari') > -1 && -1 == t.indexOf('chrome'),
                        Edge: t.indexOf('edge') > -1,
                        QQBrowser: /qqbrowser/.test(t),
                        WeixinBrowser: /MicroMessenger/i.test(t)
                    };
                for (var a in n)
                    if (n[a]) {
                        var i = '';
                        if ('IE' == a)
                            i = t.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
                        else if ('Chrome' === a) {
                            for (var o in navigator.mimeTypes)
                                'application/360softmgrplugin' == navigator.mimeTypes[o].type && (a = '360');
                            i = t.match(/chrome\/([\d.]+)/)[1];
                        } else
                            'Firefox' === a ? i = t.match(/firefox\/([\d.]+)/)[1] : 'Opera' === a ? i = t.match(/opera\/([\d.]+)/)[1] : 'Safari' === a ? i = t.match(/version\/([\d.]+)/)[1] : 'Edge' === a ? i = t.match(/edge\/([\d.]+)/)[1] : 'QQBrowser' === a && (i = t.match(/qqbrowser\/([\d.]+)/)[1]);
                        e.type = a, e.versions = parseInt(i);
                    }
                return e;
            };
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(40)), r = a.__importDefault(n(83)), s = a.__importDefault(n(90)), c = a.__importDefault(n(97)), l = a.__importDefault(n(105)), p = a.__importDefault(n(109)), d = a.__importDefault(n(117)), u = a.__importDefault(n(121)), h = n(5), f = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            status: 1,
                            meetInfo: null,
                            showViews: !0,
                            entry: null,
                            meetData: null,
                            type: '',
                            orderData: null,
                            preStack: [],
                            bsToken: '',
                            isLogin: '',
                            netError: !1,
                            flowType: '',
                            event: null
                        };
                    }, e.prototype.onHide = function () {
                        this.data.set('netError', !1);
                    }, e.prototype.updateStatus = function (t) {
                        if (t && t.value >= 0) {
                            var e = t.value, n = this.data.get('preStack');
                            this.data.set('status', e), 0 === e ? this.setStack('clear') : e === n[n.length - 2] ? this.setStack('del') : this.setStack('add');
                        }
                    }, e.prototype.setStack = function (t) {
                        var e = this.data.get('preStack'), n = this.data.get('status');
                        'add' === t ? (e.push(n), this.data.set('preStack', e)) : 'del' === t ? e.length > 1 && (e.pop(), this.data.set('preStack', e)) : this.data.set('preStack', []);
                    }, e.prototype.attached = function () {
                        var t = this.data.get('entry');
                        this.setStack('add'), this.bindEvent(t);
                    }, e.prototype.logSend = function (t) {
                        var e = t.modName, n = t.evtName;
                        this.data.get('event').fire(e, n);
                    }, e.prototype.bindEvent = function (t) {
                        var e = this, n = this;
                        'backflow' !== n.data.get('type') && (t.off('click').on('click', function (t) {
                            var a = e.data.get('showViews');
                            n.data.set('showViews', !a), 0 !== e.data.get('status') || a || e.updateStatus({ value: 1 }), t.stopPropagation();
                        }), this.hideViews());
                    }, e.prototype.hideViews = function () {
                        var t = this, e = this.data.get('showViews'), n = this.el, a = !1;
                        document.addEventListener('mousedown', function (e) {
                            t.contains(n, e.target) && (a = !0);
                        }), document.addEventListener('click', function (i) {
                            t.contains(document.getElementById('passport-login-pop'), i.target) || t.contains(document.getElementsByClassName('pop-mask')[0], i.target) || (t.contains(n, i.target) || !e || a ? a = !1 : (t.data.set('showViews', !1), a = !1));
                        }), document.querySelector('#kw').addEventListener('focus', function () {
                            t.data.set('showViews', !1);
                        });
                    }, e.prototype.contains = function (t, e) {
                        for (var n = e; n;) {
                            if (n === t)
                                return !0;
                            n = n.parentNode;
                        }
                        return !1;
                    }, e.prototype.orderMeetEvent = function (t) {
                        if (t.meetMsg) {
                            var e = this.getSimpleMeetData(t.meetMsg);
                            t.meetData = e;
                        }
                        t.bsToken = this.data.get('bsToken'), this.data.set('orderData', t), this.updateStatus({ value: 5 });
                    }, e.prototype.modifyMeetEvent = function (t) {
                        this.data.set('orderData', t), this.updateStatus({ value: 5 });
                    }, e.prototype.getSimpleMeetData = function (t) {
                        return {
                            roomName: t.name,
                            boxChecked: !!t.needPasswd,
                            openPassInput: !!t.needPasswd,
                            description: t.description,
                            partner: t.partner,
                            canOpenMeet: {
                                title: !0,
                                pass: !0,
                                desc: !0
                            }
                        };
                    }, e.prototype.createQuickMeet = function (t) {
                        this.updateStatus({ value: 3 }), t.type = 0, this.data.set('meetData', t);
                    }, e.prototype.openManageMeet = function () {
                        this.updateStatus({ value: 6 });
                    }, e.prototype.startMeetEvent = function (t) {
                        this.data.set('meetInfo', t), this.updateStatus({ value: 4 });
                    }, e.prototype.orderIntoMidpage = function (t) {
                        var e = {
                            type: 1,
                            data: t
                        };
                        this.data.set('meetData', e), this.updateStatus({ value: 3 });
                    }, e.components = {
                        'v-demo': o['default'],
                        'meet-midpage': r['default'],
                        'open-meet': s['default'],
                        'order-meet': c['default'],
                        'manage-meet': p['default'],
                        'compat-tip': d['default'],
                        'start-meet': l['default'],
                        'page-error': u['default'],
                        'c-toast': h.Toast
                    }, e.computed = {
                        memberName: function () {
                            var t = this.data.get('showViews'), e = document.getElementsByTagName('html')[0];
                            t ? (this.data.get('event').fire('superman:videomeeting', 'opendialogClick'), e.className += ' no-scroll') : e.setAttribute('class', e.getAttribute('class').replace(' no-scroll', ''));
                        },
                        errorPos: function () {
                            return {
                                position: 'fixed',
                                bottom: '331px',
                                right: '179px',
                                'z-index': '1000'
                            };
                        }
                    }, e.messages = {
                        exitMeet: function (t) {
                            this.updateStatus(t), this.data.set('showViews', !1);
                        },
                        hideMeet: function (t) {
                            var e = t.value;
                            this.data.set('showViews', e);
                        },
                        openFeedback: function (t) {
                            this.updateStatus(t);
                        },
                        openManage: function (t) {
                            this.updateStatus(t);
                        },
                        goback: function (t) {
                            var e = this.data.get('preStack'), n = e[e.length - 2];
                            this.updateStatus({ value: n });
                        },
                        disconnectedError: function (t) {
                            this.data.set('netError', !0);
                        }
                    }, e;
                }(i.Component);
            e['default'] = f;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return { text: 'video-meeting' };
                    }, e.components = { 'v-header': o['default'] }, e;
                }(i.Component);
            e['default'] = r;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = n(5), r = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            needBack: !0,
                            title: '',
                            closeType: '',
                            status: 0,
                            exit: !1,
                            clearMedia: !1
                        };
                    }, e.prototype.exitMeet = function () {
                        window.localStorage.getItem('video-meet-never') ? this.dispatch('exitMeet', 0) : this.data.set('exit', !0);
                    }, e.prototype.hideMeet = function () {
                        this.dispatch('hideMeet', !1);
                    }, e.prototype.goBack = function () {
                        if (this.data.get('clearMedia'))
                            this.fire('mediaGoback', null);
                        else {
                            var t = this.data.get('status');
                            this.dispatch('goback', t);
                        }
                    }, e.prototype.cancel = function (t) {
                        this.data.set('exit', !1), t.never && window.localStorage.setItem('video-meet-never', '1');
                    }, e.prototype.confirm = function (t) {
                        this.data.set('exit', !1), t.never && window.localStorage.setItem('video-meet-never', '1'), this.data.get('clearMedia') ? this.fire('mediaExit', null) : this.dispatch('exitMeet', 0);
                    }, e.components = { 'c-popup': o.Popup }, e;
                }(i.Component);
            e['default'] = r;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            name: '',
                            index: 0,
                            selecting: !1,
                            alignX: 'left',
                            alignY: 'top',
                            columns: 3,
                            dataList: [],
                            style: '',
                            width: '',
                            columnWidth: '',
                            selIndex: 0,
                            maxHeight: ''
                        };
                    }, e.prototype.attached = function () {
                        window.addEventListener ? window.addEventListener('click', this.closeBoard.bind(this)) : window.attachEvent('onclick', this.closeBoard.bind(this));
                    }, e.prototype.detached = function () {
                        window.removeEventListener ? window.removeEventListener('click', this.closeBoard.bind(this)) : window.detachEvent('onclick', this.closeBoard.bind(this));
                    }, e.prototype.collectValue = function (t, e) {
                        this.fire('change', {
                            data: t,
                            index: e
                        }), this.data.set('selIndex', e);
                    }, e.prototype.nothing = function (t) {
                        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    }, e.prototype.openBoard = function (t) {
                        var e = this, n = this.data.get('selecting');
                        this.nextTick(function () {
                            return !n && e.data.set('selecting', !0);
                        }), this.fire('boardopen', {});
                    }, e.prototype.choose = function (t, e, n) {
                        this.nothing(t), this.collectValue(e, n), this.closeBoard(t);
                    }, e.prototype.closeBoard = function (t) {
                        this.data.get('selecting') && this.data.set('selecting', !1);
                    }, e.computed = {
                        column: function () {
                            var t = this.data.get('columns');
                            return Math.min(Math.max(t, 1), 3);
                        },
                        selIndex: function () {
                            return this.data.get('index');
                        },
                        value: function () {
                            var t = this.data.get('selIndex'), e = this.data.get('dataList')[t];
                            return e && e.name || e;
                        },
                        list: function () {
                            for (var t = this.data.get('dataList'), e = this.data.get('column'), n = [], a = 0; a < t.length; a += e)
                                n.push(t.slice(a, a + e));
                            return n;
                        },
                        maxHeightStyle: function () {
                            var t = this.data.get('maxHeight');
                            return t ? 'height:' + t + ';overflow:scroll;' : '';
                        }
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e.disappearTimer = null, e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            zindex: 10,
                            pos: null,
                            duration: 2000
                        };
                    }, e.prototype.attached = function () {
                        this.show(), this.hide();
                    }, e.prototype.show = function () {
                        var t = this.data.get('zindex'), e = this.data.get('pos'), n = [
                                'z-index:' + t + ';',
                                'opacity: 1;'
                            ].join(''), a = '';
                        if (e)
                            for (var i in e)
                                a += i + ':' + e[i] + ';';
                        else {
                            var o = this.el;
                            a = [
                                'left: 50%;top: 50%;',
                                'margin-top: -' + o.clientHeight / 2 + 'px;',
                                'margin-left:-' + o.clientWidth / 2 + 'px;'
                            ].join('');
                        }
                        n += a;
                        var r = this;
                        setTimeout(function () {
                            r.fire('show', 'show'), r.data.set('customStyle', n);
                        }, 20);
                    }, e.prototype.hide = function () {
                        var t = this.el, e = this, n = this.data.get('duration');
                        this.disappearTimer = setTimeout(function () {
                            t.style.opacity = '0', setTimeout(function () {
                                t.style.zIndex = '-1', e.fire('hide', 'hide');
                            }, 310);
                        }, n);
                    }, e.prototype.detached = function () {
                        clearTimeout(this.disappearTimer);
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(16)), r = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            title: '',
                            subTitle: '',
                            always: !1,
                            defaultBtnText: '取消',
                            primaryBtnText: '确认',
                            never: !1,
                            color: 'rgba(0, 0, 0, 0.5)',
                            posX: '0',
                            posY: '0',
                            style: '',
                            zIndex: 0
                        };
                    }, e.prototype.setState = function (t) {
                        this.data.set('never', t.checked);
                    }, e.prototype.close = function (t) {
                        this.fire('close', { from: t });
                    }, e.prototype.cancel = function () {
                        this.fire('cancel', { never: this.data.get('never') }), this.close('cancel');
                    }, e.prototype.confirm = function () {
                        this.fire('confirm', { never: this.data.get('never') }), this.close('confirm');
                    }, e.components = { 'c-checkbox': o['default'] }, e;
                }(i.Component);
            e['default'] = r;
        },
        function (t, e, n) {
            var a = n(1), i = [n(59)], o = n(61), r = n(17)['default'];
            t.exports = n(17), t.exports['default'] = a(r, o, i);
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            value: '',
                            name: '',
                            label: '',
                            checked: !1,
                            disabled: !1,
                            bgColor: '',
                            innerColor: ''
                        };
                    }, e.prototype.change = function (t) {
                        var e = (t.target || t.srcElement).checked;
                        this.data.set('currentValue', e), this.fire('change', {
                            checked: e,
                            value: this.data.get('value'),
                            name: this.data.get('name')
                        });
                    }, e.computed = {
                        currentValue: function () {
                            return this.data.get('checked');
                        },
                        propertyVal: function () {
                            var t = {}, e = this.data.get('value');
                            return e && (t.value = e), this.data.get('checked') && (t.checked = 'checked'), t;
                        }
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            size: 'medium',
                            type: 'primary',
                            icon: '',
                            text: ''
                        };
                    }, e.prototype.inited = function () {
                        'big' === this.data.get('size') && this.data.set('size', 'auto');
                    }, e.prototype.buttonClick = function (t) {
                        this.fire('click', t);
                    }, e.computed = {
                        btnSize: function () {
                            var t = this.data.get('size');
                            return 'big' === t || 'medium' === t || 'large' === t ? '' : 'c-btn-' + t;
                        },
                        btnType: function () {
                            return 'c-btn-' + this.data.get('type');
                        }
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12
                ], o = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            value: '',
                            placeholder: '',
                            type: 'input',
                            widthSize: '',
                            heightSize: '',
                            specialSize: 0,
                            waterMark: {
                                imgUrlOnce: '//',
                                imgUrlTwice: '//'
                            },
                            params: {},
                            isFocus: !1,
                            clearable: !1,
                            clickClear: !1
                        };
                    }, e.prototype.clearInput = function () {
                        this.data.set('clickClear', !0), this.data.set('value', '');
                    }, e.prototype.inputSpecialSize = function () {
                        var t = this.sourceSlotNameProps ? this.sourceSlotNameProps.length : 0, e = this.data.get('clearable'), n = this.data.get('inputWidthSize') - 22 - 26 * t - 26 * (e ? 1 : 0), a = this.data.get('specialSize');
                        return a ? { width: a + 'px' } : { width: n + 'px' };
                    }, e.prototype.getInput = function () {
                        return this.ref('input') || this.ref('textarea');
                    }, e.prototype.clickWaterMark = function () {
                        this.getInput().focus(), this.data.set('isFocus', !0);
                    }, e.prototype.handleInput = function (t) {
                        this.fire('input', t);
                    }, e.prototype.handleFocus = function (t) {
                        this.data.set('isFocus', !0), this.fire('focus', t);
                    }, e.prototype.handleBlur = function (t) {
                        this.data.get('clickClear') ? (this.getInput().focus(), this.data.set('clickClear', !1)) : (this.data.set('isFocus', !1), this.fire('blur', t));
                    }, e.computed = {
                        inputWidthSize: function () {
                            parseInt(this.data.get('widthSize'), 10);
                            var t = i[this.data.get('widthSize') - 1];
                            return 32 * t + 16 * (t - 1);
                        },
                        inputHeightSize: function () {
                            var t = this.data.get('heightSize');
                            return 'input' === this.data.get('type') ? 'input-height-' + (t || 'mini') : 'textarea-height-large';
                        },
                        waterMarkStyle: function () {
                            var t = this.data.get('waterMark');
                            return '//' === t.imgUrlOnce && '//' === t.imgUrlTwice ? '' : [
                                'background:url(' + t.imgUrlOnce + ') no-repeat center;',
                                'background:url(' + t.imgUrlTwice + ') no-repeat center / contain;'
                            ].join('');
                        }
                    }, e;
                }(n(0).Component);
            e['default'] = o;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(74)), r = a.__importDefault(n(78)), s = n(82), c = [
                    '日',
                    '一',
                    '二',
                    '三',
                    '四',
                    '五',
                    '六'
                ], l = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            col: 4,
                            icon: '&#xe669;',
                            selectDate: new Date(),
                            firstDayOfWeek: 7,
                            checkAvailableBeforeNowDay: 0,
                            checkAvailableAfterNowDay: 0,
                            date: new Date(),
                            showCheckDate: !1,
                            renderTbody: []
                        };
                    }, e.prototype.dateChange = function () {
                        var t = this.data.get('selectDate');
                        t = new Date(t.setHours(0, 0, 0, 0));
                        var e = this.data.get('selectDateYear'), n = this.data.get('selectDateMonth'), a = this.data.get('selectDateDay'), i = this.data.get('selectDateWeek');
                        this.fire('change', {
                            selectDate: t,
                            selectDateYear: e,
                            selectDateMonth: n,
                            selectDateDay: a,
                            selectDateWeek: i
                        });
                    }, e.prototype.stopPop = function (t) {
                        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    }, e.prototype.checkDateOpen = function () {
                        var t = this, e = this.data.get('showCheckDate');
                        this.nextTick(function () {
                            return !e && t.data.set('showCheckDate', !0);
                        });
                    }, e.prototype.checkDateClose = function () {
                        this.data.get('showCheckDate') && this.data.set('showCheckDate', !1);
                    }, e.prototype.range = function (t) {
                        return Array.apply(null, { length: t }).map(function (t, e) {
                            return e;
                        });
                    }, e.prototype.toNestedArr = function (t) {
                        return this.range(t.length / 7).map(function (e, n) {
                            var a = 7 * n;
                            return t.slice(a, a + 7);
                        });
                    }, e.prototype.getFirstDayOfMonth = function (t) {
                        var e = new Date(t.getTime());
                        return e.setDate(1), e.getDay();
                    }, e.prototype.getPrevMonthLastDays = function (t, e) {
                        if (e <= 0)
                            return [];
                        var n = new Date(t.getTime());
                        n.setDate(0);
                        var a = n.getDate();
                        return this.range(e).map(function (t, n) {
                            return a - (e - n - 1);
                        });
                    }, e.prototype.getMonthDays = function (t) {
                        var e = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
                        return this.range(e).map(function (t, e) {
                            return e + 1;
                        });
                    }, e.prototype.getNowClass = function (t) {
                        var e = t.text, n = t.type, a = this.data.get('date'), i = this.data.get('selectDate'), o = parseInt('' + a.getFullYear() + (a.getMonth() + 1)), r = parseInt('' + i.getFullYear() + (i.getMonth() + 1));
                        return 'current' === n && o === r && e === a.getDate();
                    }, e.prototype.getSelectClass = function (t) {
                        var e = t.text, n = t.type, a = this.data.get('selectDate');
                        return 'current' === n && e === a.getDate();
                    }, e.prototype.pickDay = function (t) {
                        var e = this, n = t.text;
                        if ('current' === t.type) {
                            var a = new Date(), i = this.data.get('selectDate');
                            a.setFullYear(i.getFullYear(), i.getMonth(), n), this.data.set('selectDate', a), this.checkDateClose(), this.nextTick(function () {
                                e.rows(), e.dateChange();
                            });
                        }
                    }, e.prototype.getLastDay = function (t, e) {
                        return new Date(t, e, 0).getDate();
                    }, e.prototype.changeMonth = function (t) {
                        var e = this, n = (new Date(), this.data.get('checkAvailableBeforeNowDay')), a = this.data.get('checkAvailableAfterNowDay'), i = new Date(n), o = new Date(a), r = this.data.get('selectDate'), s = new Date(new Date(r.getTime()).setDate(0)), c = new Date(r.getFullYear(), r.getMonth() + 1, 1), l = this.data.get('selectDate'), p = new Date().getDate();
                        'prevMonth' === t ? (p = this.getLastDay(s.getFullYear(), s.getMonth() + 1), l = r.getDate() >= p ? new Date(s.setDate(p)) : new Date(s.setDate(r.getDate())), n && s.getFullYear() === i.getFullYear() && s.getMonth() === i.getMonth() && (l = r.getDate() <= i.getDate() ? new Date(i.setDate(i.getDate())) : new Date(i.setDate(r.getDate())))) : 'nextMonth' === t && (p = this.getLastDay(c.getFullYear(), c.getMonth() + 1), l = r.getDate() >= p ? new Date(c.setDate(p)) : new Date(c.setDate(r.getDate())), a && c.getFullYear() === o.getFullYear() && c.getMonth() === o.getMonth() && (l = (r.getDate(), o.getDate(), new Date(o.setDate(o.getDate()))))), this.data.set('selectDate', l), this.nextTick(function () {
                            e.rows();
                        });
                    }, e.prototype.checkPreOrCur = function (t) {
                        var e = this.data.get('checkAvailableBeforeNowDay'), n = new Date(e), a = n.getFullYear(), i = n.getMonth() + 1, o = this.data.get('checkAvailableAfterNowDay'), r = new Date(o), s = r.getFullYear(), c = r.getMonth() + 1, l = this.data.get('selectDate'), p = l.getFullYear(), d = l.getMonth() + 1;
                        if (e) {
                            if (a > p)
                                return {
                                    text: t,
                                    type: 'prev'
                                };
                            if (a === p) {
                                if (i > d)
                                    return {
                                        text: t,
                                        type: 'prev'
                                    };
                                if (i === d && t < n.getDate())
                                    return {
                                        text: t,
                                        type: 'prev'
                                    };
                            }
                        }
                        if (o) {
                            if (s < p)
                                return {
                                    text: t,
                                    type: 'prev'
                                };
                            if (s === p) {
                                if (c < d)
                                    return {
                                        text: t,
                                        type: 'prev'
                                    };
                                if (c === d && t > r.getDate())
                                    return {
                                        text: t,
                                        type: 'prev'
                                    };
                            }
                        }
                        return {
                            text: t,
                            type: 'current'
                        };
                    }, e.prototype.rows = function () {
                        var t = this, e = [], n = this.data.get('selectDate'), i = this.data.get('realFirstDayOfWeek');
                        i = 'number' == typeof i ? i : 1;
                        var o = this.getFirstDayOfMonth(n);
                        o = 0 === o ? 7 : o;
                        var r = this.getPrevMonthLastDays(n, o - i).map(function (t) {
                                return {
                                    text: t,
                                    type: 'prev'
                                };
                            }), s = this.getMonthDays(n).map(function (e) {
                                return t.checkPreOrCur(e);
                            });
                        e = a.__spreadArrays(r, s);
                        var c = this.range(42 - e.length).map(function (t, e) {
                            return {
                                text: e + 1,
                                type: 'next'
                            };
                        });
                        e = e.concat(c), this.data.set('renderTbody', this.toNestedArr(e));
                    }, e.prototype.attached = function () {
                        var t = this;
                        s.addEventListener(window, 'click', this.checkDateClose.bind(this)), this.rows(), this.watch('selectDate', function (e) {
                            t.rows();
                        }), this.watch('checkAvailableBeforeNowDay', function (e) {
                            t.rows();
                        }), this.watch('checkAvailableAfterNowDay', function (e) {
                            t.rows();
                        });
                    }, e.prototype.detached = function () {
                        s.removeEventListener(window, 'click', this.checkDateClose.bind(this));
                    }, e.components = {
                        'c-row': o['default'],
                        'c-span': r['default']
                    }, e.computed = {
                        realFirstDayOfWeek: function () {
                            var t = this.data.get('firstDayOfWeek');
                            return t < 1 || t > 6 ? 0 : Math.floor(t);
                        },
                        weekDays: function () {
                            var t = this.data.get('realFirstDayOfWeek');
                            return 'number' != typeof t || 0 === t ? c.slice() : c.slice(t).concat(c.slice(0, t));
                        },
                        selectDateYear: function () {
                            return this.data.get('selectDate').getFullYear();
                        },
                        selectDateMonth: function () {
                            return this.data.get('selectDate').getMonth() + 1;
                        },
                        selectDateDay: function () {
                            return this.data.get('selectDate').getDate();
                        },
                        selectDateWeek: function () {
                            var t = this.data.get('selectDate');
                            return c[t.getDay()];
                        },
                        hideLeftBtn: function () {
                            var t = this.data.get('checkAvailableBeforeNowDay'), e = this.data.get('selectDate'), n = new Date(t);
                            return !(!t || e.getFullYear() !== n.getFullYear() || e.getMonth() !== n.getMonth());
                        },
                        hideRightBtn: function () {
                            var t = this.data.get('checkAvailableAfterNowDay'), e = this.data.get('selectDate'), n = new Date(t);
                            return !(!t || e.getFullYear() !== n.getFullYear() || e.getMonth() !== n.getMonth());
                        }
                    }, e;
                }(i.Component);
            e['default'] = l;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            type: '',
                            vericalAlign: ''
                        };
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return { col: '' };
                    }, e.computed = {
                        colName: function () {
                            var t = this.data.get('col');
                            return t ? 'c-span' + t : '';
                        }
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = a.__importDefault(n(7)), s = n(5), c = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            pasteShow: !1,
                            meetInfo: null,
                            shareInfo: '',
                            copyInit: !1
                        };
                    }, e.prototype.processMeetInfo = function () {
                        var t, e = this.data.get('meetInfo').data, n = e.url, a = this.getDuration(e.duration), i = e.name, o = this.processDate(e.startTime, e.endTime), r = e.description, s = e.roomowner;
                        e.needPasswd && (t = e.passwd);
                        var c = e.partner;
                        this.data.set('shareInfo', {
                            name: i,
                            meetTime: o,
                            duration: a,
                            meetUrl: n,
                            description: r,
                            passwd: t,
                            partner: c,
                            owner: s
                        });
                    }, e.prototype.getDuration = function (t) {
                        var e = '30分钟', n = t / 60;
                        return n > 0.5 && (e = n + '小时'), e;
                    }, e.prototype.processDate = function (t, e) {
                        return t.date === e.date ? t.date + ' ' + t.time + '-' + e.time : t.date + ' ' + t.time + '-' + e.date + ' ' + e.time;
                    }, e.prototype.attached = function () {
                        this.processMeetInfo();
                    }, e.prototype.startMeet = function () {
                        var t = this, e = this, n = this.data.get('meetInfo').data, a = this.data.get('shareInfo');
                        fetch('/home/meeting/data/detail?&r=' + n.roomTag, { method: 'get' }).then(function (t) {
                            return t.json();
                        }).then(function (t) {
                            if (0 === t.errno) {
                                var i = t.data, o = {
                                        startTime: i.startTime.time,
                                        startDateArr: i.startTime.date.split('/'),
                                        duration: i.duration,
                                        endTime: i.endTime.time,
                                        endDateArr: i.endTime.date.split('/'),
                                        name: i.name,
                                        jumpUrl: t.jumpUrl,
                                        jumpInfo: t.jumpInfo,
                                        roomowner: a.owner,
                                        r: n.roomTag,
                                        joinStatus: i.joinStatus
                                    };
                                a.passwd && (o.passwd = a.passwd), e.fire('meetStart', o);
                            }
                        }, function (e) {
                            t.dispatch('disconnectedError', !0);
                        });
                    }, e.prototype.share = function () {
                        var t, e, n = this.data.get('shareInfo'), a = '';
                        n.partner && n.partner.length > 0 && (a = '参会人\uFF1A' + n.partner.join('\uFF1B')), document.querySelector('#copyInput') || ((t = document.createElement('textarea')).style.opacity = '0', t.value = n.owner + ' 邀请您参加百度视频云会议\n会议主题\uFF1A ' + n.name + '\n会议时间\uFF1A ' + n.meetTime, a && (t.value += '\n' + a), t.value += n.passwd ? '\n参会密码\uFF1A ' + n.passwd : '', t.value += n.description ? '\n会议描述\uFF1A' + n.description : '', t.value += '\n请点击下方链接参加会议\uFF1A\n' + n.meetUrl, t.contentEditable = !0, t.setAttribute('id', 'copyInput'));
                        var i = this.ref('quickContent');
                        if (!this.data.get('copyInit')) {
                            i.appendChild(t), t.select();
                            var o = void 0, r = void 0;
                            r = document.getSelection(), (o = document.createRange()).selectNode(t), r.addRange(o), t.setSelectionRange(0, t.value.length);
                        }
                        e = document.execCommand('copy'), this.data.set('copyInit', !0), e && this.data.set('pasteShow', !0);
                    }, e.prototype.switchToast = function () {
                        this.data.set('pasteShow', !1);
                    }, e.components = {
                        'v-header': o['default'],
                        'v-foot': r['default'],
                        'c-btn': s.Button,
                        'c-toast': s.Toast
                    }, e.computed = {
                        pastePos: function () {
                            return {
                                top: '211px',
                                left: '147px'
                            };
                        },
                        meetType: function () {
                            return [
                                '快速会议',
                                '预约会议'
                            ][this.data.get('meetInfo').type];
                        }
                    }, e;
                }(i.Component);
            e['default'] = c;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            text: '',
                            tipText: '',
                            type: ''
                        };
                    }, e.prototype.footEvent = function (t) {
                        'video-manage' === t ? this.dispatch('openManage', 6) : 'feedback' === t && (this.logSend({
                            modName: 'superman:videomeeting',
                            evtName: 'feedbackClick'
                        }), this.dispatch('openFeedback', 2));
                    }, e.prototype.logSend = function (t) {
                        this.fire('logSend', t);
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = a.__importDefault(n(7)), s = a.__importDefault(n(26)), c = n(5), l = n(8), p = n(9), d = [
                    '麦克风和摄像头',
                    '麦克风',
                    '摄像头'
                ], u = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            meetInfo: {
                                startTime: '',
                                startDate: '',
                                endTime: '',
                                endDate: '',
                                name: ''
                            },
                            choice: {
                                live: !1,
                                liveStatus: '',
                                voice: !0,
                                voiceStatus: '',
                                info: !0
                            },
                            canstartMeet: {
                                name: !0,
                                pass: !1,
                                info: !0,
                                limit: !0
                            },
                            liveStreamFlag: null,
                            voiceStreamFlag: null,
                            type: '',
                            timeSpan: '',
                            submitBtn: '开启会议',
                            warn: {
                                nameText: '请输入参会人姓名',
                                passText: '请输入6位数字密码'
                            },
                            boxChecked: !1,
                            errorMsg: {
                                title: '',
                                sub1: '',
                                sub2: ''
                            }
                        };
                    }, e.prototype.chooseLimits = function (t) {
                        var e = this, n = t.name, a = 'choice.' + n;
                        if (t.checked) {
                            if ('info' === t.name) {
                                try {
                                    this.data.set('choice.info', !0), this.data.set('boxChecked', !0), window.localStorage.setItem('has-checked', '1');
                                } catch (i) {
                                }
                                this.updateBtn();
                            }
                            this.data.set(a, !0), 'live' === n ? this.showVideo() : 'voice' === n && this.showVoice();
                        } else {
                            if ('info' === t.name)
                                try {
                                    this.data.set('choice.info', !1), this.data.set('boxChecked', !1), window.localStorage.setItem('has-checked', '0');
                                } catch (i) {
                                }
                            this.data.set(a, !1), this.nextTick(function () {
                                e.changeLimit(n);
                            }), this.updateBtn(), this.stopMedia(n);
                        }
                    }, e.prototype.changeLimit = function (t) {
                        var e = this.data.get('choice');
                        this.data.get('liveState'), this.data.get('voiceState');
                        if (e.voice || e.live) {
                            if ('live' === t) {
                                if (this.data.set('noLimit', !!e.voiceStatus), !e.voiceStatus)
                                    return void this.showVoice();
                            } else if ('voice' === t && (this.data.set('noLimit', !!e.liveStatus), !e.liveStatus))
                                return void this.showVideo();
                        } else
                            this.data.set('noLimit', !1);
                        this.handleErrorMsg(e);
                    }, e.prototype.attached = function () {
                        var t = '';
                        try {
                            t = window.localStorage.getItem('has-checked');
                        } catch (n) {
                            t = '';
                        }
                        t && '1' === t ? (this.data.set('boxChecked', !0), this.data.set('canstartMeet.info', !0)) : (this.data.set('boxChecked', !1), this.data.set('canstartMeet.info', !1));
                        this.data.get('type');
                        this.showVoice();
                        var e = this.data.get('meetInfo');
                        this.data.set('input.name', e.roomowner), 0 === e.joinStatus ? (this.data.set('submitBtn', '会议未开始'), this.data.set('canstartMeet.limit', !1)) : 5 === e.joinStatus && (this.data.set('submitBtn', '会议已结束'), this.data.set('canstartMeet.limit', !1));
                    }, e.prototype.showVideo = function () {
                        this.ref('videoMedia').style = 'display:block', this.openVideo('live');
                    }, e.prototype.showVoice = function () {
                        this.ref('voiceMedia').style = 'display:block', this.openVideo('voice');
                    }, e.prototype.updateBtn = function () {
                        var t = this.data.get('boxChecked'), e = this.data.get('canstartMeet'), n = this.data.get('choice');
                        this.data.get('warn.name');
                        e.info ? n.info || this.data.set('canstartMeet.info', !1) : t && n.info ? this.data.set('canstartMeet.info', !0) : this.data.set('canstartMeet.info', !1);
                    }, e.prototype.stopMedia = function (t) {
                        this.data.get('choice');
                        var e = this.data.get(t + 'StreamFlag');
                        e && (e.getTracks().forEach(function (t) {
                            t.stop();
                        }), ('live' === t ? this.ref('videoMedia') : this.ref('voiceMedia')).style = 'display:none');
                    }, e.prototype.clearMedia = function (t) {
                        this.stopMedia('voice'), this.stopMedia('live'), 'back' === t ? this.dispatch('goback', 0) : this.dispatch('exitMeet', 0);
                    }, e.prototype.openVideo = function (t) {
                        var e, n = this, a = this, i = (this.data.get('noLimit'), {
                                audio: 'voice' === t,
                                video: 'live' === t && {
                                    width: 320,
                                    height: 128
                                }
                            });
                        e = 'live' === t ? document.querySelector('.videoMedia') : document.querySelector('.voiceMedia'), navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(i).then(function (a) {
                            n.data.set('noLimit', !1), n.data.set(t + 'StreamFlag', a), e.srcObject = a, e.onloadedmetadata = function () {
                                e.play();
                            };
                        })['catch'](function (e) {
                            n.enumerateDevices(t, e.toString()), a.stopMedia('live'), a.stopMedia('voice'), n.data.set('noLimit', !0);
                        }) : this.data.set('noLimit', !0);
                    }, e.prototype.enumerateDevices = function (t, e) {
                        var n = this.data.get('choice');
                        switch (e) {
                        case 'NotFoundError: Requested device not found':
                            n[t + 'Status'] = 'notFound';
                            break;
                        case 'NotAllowedError: Permission denied':
                            n[t + 'Status'] = 'noPermission';
                            break;
                        case 'NotAllowedError: Permission denied by system':
                            n[t + 'Status'] = 'notFound';
                        }
                        this.handleErrorMsg(n);
                    }, e.prototype.handleErrorMsg = function (t) {
                        t.voice && t.live && t.voiceStatus && t.liveStatus ? this.setErrorMsg(t.voiceStatus, 0) : t.voice && t.voiceStatus ? this.setErrorMsg(t.voiceStatus, 1) : t.live && t.liveStatus && this.setErrorMsg(t.liveStatus, 2);
                    }, e.prototype.setErrorMsg = function (t, e) {
                        var n = d[e], a = {
                                notFound: {
                                    title: '未检测到可用设备',
                                    sub1: '未检测到可用' + n + '\uFF0C请您插入' + n + '设备后重试\u3002',
                                    sub2: '为保证您的参会体验\uFF0C建议开启' + n + '入会\u3002'
                                },
                                noPermission: {
                                    title: n + '未授权',
                                    sub1: '需要许可才能访问您的' + n + '\u3002单击浏览器地址中的' + n + '按钮\uFF0C并允许访问',
                                    sub2: '如Mac系统授权后仍无法使用\uFF0C请打开\u3010系统偏好设置\u3011-> \u3010安全性与隐私\u3011->\u3010隐私\u3011选项中确认\u3010摄像头\u3011\u3010麦克风\u3011\u3010屏幕录制\u3011已经勾选上浏览器访问授权\uFF0C确认以上操作后点击刷新重试\u3002'
                                }
                            };
                        this.data.set('errorMsg', a[t]);
                    }, e.prototype.blurInput = function (t, e) {
                        if (t) {
                            var n = t.target;
                            if ('name' === e) {
                                if (!n.value)
                                    return void this.limitName(t);
                                this.checkName(n, e);
                            }
                        }
                    }, e.prototype.checkName = function (t, e, n) {
                        var a = this, i = t.value, o = this;
                        l.fetch('/home/meeting/data/checkword?word=' + i, { method: 'get' }).then(function (t) {
                            return t.json();
                        }).then(function (t) {
                            0 !== t.errno ? (a.data.set('warn.' + e, !0), a.data.set('canstartMeet.' + e, !1)) : (a.data.set('warn.' + e, !1), a.data.set('canstartMeet.' + e, !0), a.data.set('input.' + e, i), n && n.call(o)), a.data.set('input.nameChecked', !0);
                        }, function (t) {
                            a.dispatch('disconnectedError', !0);
                        });
                    }, e.prototype.intoMeet = function () {
                        var t = this, e = this.data.get('input.name'), n = this, a = p.getBrowser(), i = this.data.get('meetInfo'), o = n.data.get('type'), r = n.data.get('passwd');
                        if (e)
                            return 'Chrome' === a.type && a.versions >= 72 || 'Firefox' === a.type && a.versions >= 75 ? void setTimeout(function () {
                                var a = t.data.get('canstartMeet');
                                if ('backflow' === o)
                                    if (i.needPasswd && '0' !== i.needPasswd) {
                                        if (!r)
                                            return;
                                        r.length < 6 ? t.passStatus(!1) : a.name && a.info && a.pass && a.limit ? n.jumpUrl() : a.name || t.checkName({ value: e }, 'name', t.buildJumpUrl);
                                    } else
                                        a.name && a.info && a.limit ? n.jumpUrl() : a.name || t.checkName({ value: e }, 'name', t.buildJumpUrl);
                                else
                                    a.name && a.info && a.limit ? n.jumpUrl('exit') : a.name || t.data.get('input.nameChecked') || n.checkName({ value: e }, 'name', t.buildJumpUrl);
                            }, 300) : (n.stopMedia('voice'), n.stopMedia('live'), n.dispatch('exitMeet', 0), void window.open('/home/meeting/show/join?r=' + i.r));
                    }, e.prototype.jumpUrl = function (t) {
                        this.stopMedia('voice'), this.stopMedia('live'), 'exit' === t && this.dispatch('exitMeet', 0), this.buildJumpUrl();
                    }, e.prototype.buildJumpUrl = function () {
                        var t = this.data.get('meetInfo'), e = (this.data.get('choice'), this.data.get('liveState')), n = this.data.get('voiceState'), a = this.data.get('input.name'), i = (this.ref('meetPass'), this.data.get('passwd')), o = this.data.get('type'), r = t.jumpUrl + '?', s = t.jumpInfo, c = {
                                r: t.r,
                                f: 'bd',
                                aid: s.aid,
                                token: s.token,
                                name: a,
                                microphone: !1,
                                camera: !1
                            };
                        for (var l in ((i || t.passwd) && (c.s = i || t.passwd), n && (c.microphone = !0), e && (c.camera = !0), c))
                            r += l + '=' + c[l] + '&';
                        r = r.substring(0, r.length - 1), 'backflow' === o ? window.location.href = r : window.open(r);
                    }, e.prototype.limitName = function (t) {
                        t ? (t.target.value ? this.data.set('canstartMeet.name', !0) : (this.data.set('input.name', ''), this.data.set('warn.name', !1), this.data.set('canstartMeet.name', !1)), this.data.set('input.nameChecked', !1)) : (this.data.set('input.name', ''), this.data.set('warn.name', !1), this.data.set('canstartMeet.name', !1));
                    }, e.prototype.limitPass = function (t) {
                        if (t) {
                            var e = t.target;
                            e && e.value && e.length < 6 && this.passStatus(!1);
                        }
                    }, e.prototype.passStatus = function (t) {
                        this.data.set('warn.pass', !t), this.data.set('canstartMeet.pass', t);
                    }, e.prototype.processPassShow = function (t) {
                        if (t) {
                            var e = t.target, n = e ? e.value : '';
                            if (!n)
                                return this.data.set('passwd', ''), this.data.set('warn.pass', !1), void this.data.set('canstartMeet.pass', !1);
                            /.*[a-zA-Z\u4e00-\u9fa5]+.*$/.test(n) ? this.passStatus(!1) : (this.passStatus(!0), this.data.set('passwd', n));
                        }
                    }, e.components = {
                        'v-header': o['default'],
                        'v-foot': r['default'],
                        'c-btn': c.Button,
                        'c-checkbox': c.Checkbox,
                        'c-input': c.Input,
                        'v-warn': s['default']
                    }, e.computed = {
                        liveState: function () {
                            var t = this.data.get('choice');
                            return t.live && !t.liveStatus;
                        },
                        voiceState: function () {
                            var t = this.data.get('choice');
                            return t.voice && !t.voiceStatus;
                        },
                        timeSpan: function () {
                            var t = this.data.get('meetInfo.duration'), e = t / 60;
                            return e >= 1 ? e + '小时' : t + '分钟';
                        },
                        checkboxType: function () {
                            return 'backflow' === this.data.get('type') ? 'transparent' : '';
                        },
                        btnUseful: function () {
                            var t = this.data.get('canstartMeet'), e = this.data.get('meetInfo.needPasswd');
                            return e && '0' !== e ? t.name && t.info && t.limit && t.pass : t.name && t.info && t.limit;
                        }
                    }, e;
                }(i.Component);
            e['default'] = u;
        },
        function (t, e, n) {
            var a = n(1), i = [n(94)], o = n(96), r = n(27)['default'];
            t.exports = n(27), t.exports['default'] = a(r, o, i);
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return { text: '请重新输入' };
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = a.__importDefault(n(7)), s = a.__importDefault(n(26)), c = a.__importDefault(n(101)), l = n(5), p = n(8), d = [
                    '日',
                    '一',
                    '二',
                    '三',
                    '四',
                    '五',
                    '六'
                ], u = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            openPassInput: !1,
                            showsug: !1,
                            passShow: !0,
                            roomName: '',
                            startTime: '',
                            endTime: '',
                            passwd: '',
                            roomPartner: [],
                            canOpenMeet: {
                                title: !1,
                                pass: !0,
                                desc: !0
                            },
                            orderData: {
                                startIndex: 0,
                                endIndex: 1
                            },
                            startSelectList: [],
                            endSelectList: [],
                            startCalData: {
                                calObj: null,
                                limitBefore: new Date(),
                                limitAfter: 0
                            },
                            startCalDate: new Date(),
                            endCalData: {
                                calObj: null,
                                limitBefore: new Date().getTime() + 3600000,
                                limitAfter: new Date().getTime() + 90000000,
                                initShow: new Date()
                            },
                            showPlaceholder: !0,
                            roomId: '',
                            updatePasswd: 0,
                            modifyMeet: !1,
                            boxChecked: !1,
                            description: '',
                            partner: [],
                            inputStatus: {
                                title: !1,
                                desc: !1
                            },
                            warn: {
                                titleText: '请重新输入会议主题',
                                passText: '请输入6位数字密码',
                                descText: '请重新输入会议详情'
                            }
                        };
                    }, e.prototype.attached = function () {
                        var t = this;
                        this.initPartner(), this.initCalDate(), p.fetch('/home/meeting/data/meeting', { method: 'get' }).then(function (t) {
                            return t.json();
                        }).then(function (e) {
                            if (0 === e.errno) {
                                var n = e.data.mailList;
                                t.data.set('mailList', n);
                            }
                        }, function (e) {
                            t.dispatch('disconnectedError', !0);
                        });
                    }, e.prototype.initCalDate = function () {
                        var t = this.data.get('endCalData').initShow || new Date(), e = this.data.get('startCalDate') || new Date(), n = this.data.get('orderData'), a = n.startIndex || 0, i = n.endIndex || 0, o = this.data.get('passwd');
                        this.data.get('openPassInput') && (this.ref('passinput').value = o);
                        this.data.set('startTime', n.startSelectList[a]), this.data.set('endTime', n.endSelectList[i]), this.data.set('startCalData.calObj', this.calParser(e)), this.data.set('endCalData.calObj', this.calParser(t));
                    }, e.prototype.trimDate = function (t) {
                        return t.map(function (t) {
                            return 0 === parseInt(t.slice(0, 1)) ? t.substr(1) : t;
                        });
                    }, e.prototype.calParser = function (t) {
                        return {
                            selectDate: t,
                            selectDateYear: new Date(t).getFullYear(),
                            selectDateMonth: new Date(t).getMonth() + 1,
                            selectDateDay: new Date(t).getDate(),
                            selectDateWeek: d[new Date(t).getDay()]
                        };
                    }, e.prototype.initPartner = function () {
                        var t = this.data.get('partner');
                        if (t.length > 0) {
                            this.data.set('showPlaceholder', !1);
                            var e = this.ref('sugRef');
                            t.map(function (t) {
                                e.insertPartner(t);
                            });
                        }
                    }, e.prototype.setPartner = function (t) {
                        this.data.set('partner', t);
                    }, e.prototype.checkAvailableCal = function () {
                        var t, e, n = this.data.get('startCalData.calObj');
                        n ? (t = new Date(n.selectDate.getTime() + 1800000), e = n.selectDate.getTime() + 86400000) : (t = new Date(new Date().getTime() + 1800000), e = new Date().getTime() + 86400000), this.data.set('endCalData.limitBefore', t), this.data.set('endCalData.initShow', t), this.data.set('endCalData.calObj', {
                            selectDate: t,
                            selectDateDay: t.getDate(),
                            selectDateMonth: t.getMonth() + 1,
                            selectDateYear: t.getFullYear()
                        }), this.data.set('endCalData.limitAfter', e), this.data.set('orderData.endIndex', 1);
                    }, e.prototype.openPass = function (t) {
                        if ('passwd' === t.name) {
                            var e = this.data.get('openPassInput'), n = this.data.get('updatePasswd'), a = this.data.get('modifyMeet');
                            this.data.set('openPassInput', !e), t.checked || (this.data.set('passwd', ''), this.data.set('warn.pass', !1)), a && 0 === n && (this.data.set('updatePasswd', 1), this.clearPasswdInput());
                        }
                    }, e.prototype.clearPasswdInput = function () {
                        this.ref('passinput').value = '', this.data.set('passwd', ''), this.data.set('passShow', !0);
                    }, e.prototype.getValue = function (t) {
                        if (t) {
                            var e = t.target;
                            e.value && (this.data.set('roomName', e.value), this.checkName(e.value));
                        }
                    }, e.prototype.checkDesc = function (t) {
                        if (t) {
                            var e = t.target;
                            e.value && this.checkName(e.value, 'desc');
                        }
                    }, e.prototype.updateDesc = function (t) {
                        t && (t.target.value || (this.data.set('warn.desc', !1), this.data.set('canOpenMeet.desc', !0)));
                    }, e.prototype.switchPass = function (t) {
                        var e = 'show' === t, n = this.ref('passinput'), a = this.data.get('passwd'), i = this.data.get('updatePasswd');
                        if (this.data.get('modifyMeet') && 0 === i)
                            return this.data.set('updatePasswd', 1), n.value = '', this.data.set('passwd', ''), void n.focus();
                        this.data.set('passShow', e), a && (n.value = 'show' != t ? a.replace(/./g, '*') : a);
                    }, e.prototype.processPassFocus = function () {
                        var t = this.data.get('updatePasswd');
                        this.data.get('modifyMeet') && 0 === t && (this.data.set('updatePasswd', 1), this.clearPasswdInput());
                    }, e.prototype.passStatus = function (t) {
                        this.data.set('warn.pass', !t), this.data.set('canOpenMeet.pass', t);
                    }, e.prototype.limitPass = function () {
                        var t = this.ref('passinput').value;
                        if (t && t.length < 6)
                            return this.passStatus(!1), !1;
                    }, e.prototype.processPassShow = function (t) {
                        var e = this.ref('passinput'), n = e.value;
                        if (n) {
                            if (/.*[a-zA-Z\u4e00-\u9fa5]+.*$/.test(n))
                                return this.passStatus(!1), !1;
                            if (!(n.length > 6))
                                if (this.passStatus(!0), this.data.get('passShow'))
                                    this.data.set('passwd', n);
                                else {
                                    var a = this.data.get('passwd');
                                    if (a.length > n.length)
                                        a = (a = a.substring(0, n.length - 1)).substring(0, 6), this.data.set('passwd', a);
                                    else {
                                        var i = n.split('*');
                                        a += i[i.length - 1], e.value = n.replace(/./g, '*'), a = a.substring(0, 6), this.data.set('passwd', a);
                                    }
                                }
                        } else
                            this.data.set('passwd', '');
                    }, e.prototype.openSelect = function (t) {
                        var e = document.body.getAttribute('class');
                        document.body.setAttribute('class', e + ' video-scroll');
                    }, e.prototype.updateDataList = function (t, e) {
                        var n = this.data.get(t + 'CalData.calObj'), a = new Date(), i = (this.data.get('startSelectList'), this.updateTime('start')), o = this.updateTime('end'), r = [], s = [];
                        if (n.selectDateYear !== a.getFullYear() || n.selectDateMonth !== a.getMonth() + 1 || n.selectDateDay !== a.getDate()) {
                            var c = this.isOneDay();
                            'start' === t ? ('cal' !== e ? (s = this.formatEndList(i, !0), o = this.updateTime('end', s[1], 1)) : (i = this.updateTime('start', '0:00', 1), o = this.updateTime('end', '1:00', 1), r = this.formatStartList(i, 1), s = this.formatEndList(i, !0), this.data.set('orderData.startSelectList', r), this.data.set('orderData.startIndex', 0)), this.data.set('orderData.endSelectList', s), 'cal' !== e && o.hour > i.hour || i.hour === o.hour && o.minutes > i.minutes ? this.data.set('orderData.endIndex', s.indexOf(o.time)) : this.data.set('orderData.endIndex', 1)) : (c ? (r = this.formatEndList(i, !0), this.data.set('orderData.endIndex', 1)) : (r = this.formatEndList(i, !1), this.data.set('orderData.endIndex', 0)), this.data.set('orderData.endSelectList', r));
                        } else {
                            var l = a.getHours(), p = a.getMinutes();
                            'cal' === e ? (i = this.updateTime('start', l + ':' + p), 'start' === t ? (r = this.formatStartList(i, 1), s = this.formatEndList(i, !0), this.data.set('orderData.startSelectList', r), this.data.set('orderData.startIndex', 0), this.data.set('orderData.endSelectList', s)) : (s = this.formatEndList(i, !0), this.data.set('orderData.endSelectList', s))) : (s = this.formatEndList(i, !0), this.data.set('orderData.endSelectList', s), s.length > 1 && '23:00' !== i.time ? this.data.set('orderData.endIndex', 1) : this.data.set('orderData.endIndex', 0), this.data.set('endTime', s[1]));
                        }
                    }, e.prototype.formatStartList = function (t, e) {
                        var n = t, a = [], i = n.hour;
                        n.minutes;
                        for (var o = i; o < 24; o++)
                            o > i || 0 === i ? (a.push(o + ':00'), a.push(o + ':30')) : n.minutes <= 30 && o === i && a.push(o + ':30');
                        return a;
                    }, e.prototype.formatEndList = function (t, e) {
                        var n = t.hour, a = t.minutes, i = e;
                        !a && i && 23 !== n || (n += 1);
                        var o = [];
                        return 24 === n && (i = !1, this.updateEndCal()), i ? (o = this.timeLoop(n, 24), a || o.shift()) : (o = this.timeLoop(0, n), a || o.pop()), o;
                    }, e.prototype.updateEndCal = function () {
                        this.data.get('endCalData');
                        var t = this.data.get('startCalData').calObj, e = new Date(t.selectDate.getTime() + 86400000), n = this.calParser(e), a = new Date(n.selectDateYear + '/' + n.selectDateMonth + '/' + n.selectDateDay + ' 00:00:00');
                        this.data.set('endCalData.limitBefore', a), this.data.set('endCalData.initShow', a), this.data.set('endCalData.calObj', n);
                    }, e.prototype.timeLoop = function (t, e) {
                        for (var n = [], a = t; a < e; a++)
                            n.push(a + ':00'), n.push(a + ':30');
                        return n;
                    }, e.prototype.updateTime = function (t, e, n) {
                        var a;
                        e ? (a = e, this.data.set(t + 'Time', e)) : a = this.data.get(t + 'Time');
                        var i = a.split(':');
                        return i ? {
                            hour: Number(i[0]),
                            minutes: Number(i[1]),
                            time: a
                        } : null;
                    }, e.prototype.isOneDay = function () {
                        var t = this.data.get('startCalData.calObj'), e = this.data.get('endCalData.calObj');
                        return t || (t = { selectDateDay: new Date().getDate() }), t.selectDateDay === e.selectDateDay;
                    }, e.prototype.upDateMeet = function (t) {
                        var e = this, n = this.data.get('updatePasswd');
                        this.data.get('modifyMeet') && 0 === n && t.set('passwd', ''), t.append('roomId', this.data.get('roomId')), t.append('updatePasswd', n);
                        var a = this;
                        p.fetch('/home/meeting/submit/update', {
                            method: 'post',
                            body: t
                        }).then(function (t) {
                            return t.json();
                        }).then(function (t) {
                            0 === t.errno && (t.data.url = a.data.get('url'), t.data.passwd = e.data.get('passwd'), t.data.roomTag = a.data.get('roomTag'), a.fire('intoMidpage', t.data));
                        }, function (t) {
                            e.dispatch('disconnectedError', !0);
                        });
                    }, e.prototype.openMeet = function () {
                        var t = this, e = this.data.get('modifyMeet'), n = this.data.get('roomName'), a = this.data.get('description'), i = this.data.get('inputStatus');
                        n && !i.title && this.checkName(n), a && !i.desc && this.checkName(a, 'desc'), setTimeout(function () {
                            var i = t.data.get('canOpenMeet');
                            if (i.title && i.pass && i.desc) {
                                var o = new FormData(), r = t.getTimeStamp('start'), s = t.getTimeStamp('end'), c = t;
                                o.append('roomName', n), o.append('startTime', '' + r), o.append('endTime', '' + s), o.append('passwd', t.data.get('passwd')), a && o.append('description', t.data.get('description')), t.data.get('partner') && t.data.get('partner').length && o.append('roomPartner', JSON.stringify(t.data.get('partner'))), o.append('bsToken', t.data.get('orderData.bsToken')), e ? t.upDateMeet(o) : p.fetch('/home/meeting/submit/order', {
                                    method: 'post',
                                    body: o
                                }).then(function (t) {
                                    return t.json();
                                }).then(function (e) {
                                    0 === e.errno && (e.data.passwd = t.data.get('passwd'), c.fire('intoMidpage', e.data));
                                }, function (e) {
                                    t.dispatch('disconnectedError', !0);
                                });
                            }
                        }, 300);
                    }, e.prototype.getTimeStamp = function (t) {
                        var e = this.data.get(t + 'CalData').calObj, n = this.data.get(t + 'Time');
                        if (e && n) {
                            var a = e.selectDateYear + '/' + e.selectDateMonth + '/' + e.selectDateDay;
                            return new Date(a + ' ' + n).getTime() / 1000;
                        }
                        return 'start' === t ? Math.floor(new Date().getTime() / 1000) : Math.floor((new Date().getTime() + 3600000) / 1000);
                    }, e.prototype.checkName = function (t, e) {
                        var n = this;
                        e || (e = 'title'), p.fetch('/home/meeting/data/checkword?word=' + t, { method: 'get' }).then(function (t) {
                            return t.json();
                        }).then(function (t) {
                            0 !== t.errno ? (n.data.set('warn.' + e, !0), n.data.set('canOpenMeet.' + e, !1), n.data.set('inputStatus.' + e, !1)) : (n.data.set('canOpenMeet.' + e, !0), n.data.set('warn.' + e, !1), n.data.set('inputStatus.' + e, !0));
                        }, function (t) {
                            n.dispatch('disconnectedError', !0);
                        });
                    }, e.prototype.chooseDate = function (t, e) {
                        'start' === e ? (this.data.set('startCalData.calObj', t), this.checkAvailableCal(), this.updateDataList('start', 'cal')) : (this.data.set('endCalData.calObj', t), this.updateDataList('end', 'cal'));
                    }, e.prototype.chooseTime = function (t, e) {
                        this.data.set('orderData.' + e + 'Index', t.index), 'start' === e ? (this.data.set('startTime', t.data), this.updateDataList('start', 'sel')) : this.data.set('endTime', t.data);
                    }, e.prototype.limitName = function (t) {
                        t && (t.target.value ? this.data.set('canOpenMeet.title', !0) : this.data.set('warn.title', !1));
                    }, e.components = {
                        'v-header': o['default'],
                        'v-foot': r['default'],
                        'c-input': l.Input,
                        'c-btn': l.Button,
                        'c-checkbox': l.Checkbox,
                        'c-cal': l.Calendar,
                        'c-select': l.Select,
                        'v-warn': s['default'],
                        'v-sug': c['default']
                    }, e;
                }(i.Component);
            e['default'] = u;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            showPlaceholder: !0,
                            mailList: null,
                            emails: null,
                            partner: [],
                            inputStatus: !1
                        };
                    }, e.prototype.processSug = function () {
                        this.ref('emailInput').focus();
                    }, e.prototype.inputFocus = function () {
                        var t = this.ref('emailInput');
                        t.value && -1 !== t.value.indexOf('@') && this.data.set('showsug', !0), this.data.set('showPlaceholder', !1), this.hideSug();
                    }, e.prototype.startInput = function (t) {
                        var e, n = this.data.get('mailList'), a = this.ref('emailInput').value;
                        if (a) {
                            this.data.set('inputStatus', !0);
                            var i = a.split('@');
                            if (i.length > 1) {
                                var o = i[0], r = i[1];
                                if (r) {
                                    var s = this.findMatchMail(r, o);
                                    e = 0 === s.length ? [a] : s;
                                } else
                                    e = n.map(function (t) {
                                        return o + '@' + t;
                                    });
                                this.data.set('emails', e), this.data.set('showsug', !0);
                            } else
                                this.data.set('showsug', !1);
                        } else
                            this.data.set('inputStatus', !1);
                    }, e.prototype.findMatchMail = function (t, e) {
                        for (var n = this.data.get('mailList'), a = [], i = 0; i < n.length; i++)
                            0 === n[i].indexOf(t) && a.push(e + '@' + n[i]);
                        return a;
                    }, e.prototype.defineEmail = function (t) {
                        13 === t.keyCode && this.insertPartner(t.target.value);
                    }, e.prototype.emailInputBlur = function () {
                        this.ref('emailInput').value || (document.querySelector('.selectSugOpt') || this.data.set('showPlaceholder', !0), this.data.set('inputStatus', !1));
                    }, e.prototype.hideSug = function () {
                        var t = this, e = t.ref('sugList'), n = t.ref('emailWrapper');
                        document.querySelector('.v-container').addEventListener('click', function (a) {
                            t.contains(e, a.target) || t.contains(n, a.target) || t.data.set('showsug', !1);
                        });
                    }, e.prototype.insertPartner = function (t) {
                        var e = this, n = this.ref('sugWrapper'), a = document.createElement('div'), i = document.createElement('span'), o = document.createElement('i'), r = this.data.get('partner');
                        this.data.set('inputStatus', !1), a.setAttribute('class', 'selectSugOpt'), i.setAttribute('class', 'selectSugVal'), i.innerText = t.split('@')[0], o.setAttribute('class', 'c-icon selectSugIcon c-color-gray2'), o.innerHTML = '&#xe610;', a.appendChild(i), a.appendChild(o), n.appendChild(a);
                        var s = this.ref('emailInput');
                        s.value = '', s.blur();
                        document.querySelectorAll('.selectSugIcon');
                        var c = document.querySelectorAll('.selectSugOpt');
                        r.push(t), e.data.set('partner', r), e.fire('setPartner', e.data.get('partner')), c.forEach(function (t) {
                            t.onclick = function (t) {
                                if ('I' === t.target.nodeName) {
                                    var n = t.target.parentNode, a = t.target.parentNode.childNodes[0].textContent;
                                    r = r.filter(function (t) {
                                        if (-1 === t.indexOf(a))
                                            return t;
                                    }), e.data.set('partner', r), n.remove(), e.fire('setPartner', e.data.get('partner')), document.querySelector('.selectSugOpt') || s.value || e.data.set('showPlaceholder', !0);
                                }
                                t.stopPropagation(), t.preventDefault();
                            };
                        }), e.data.set('showsug', !1);
                    }, e.prototype.contains = function (t, e) {
                        for (var n = e; n;) {
                            if (n === t)
                                return !0;
                            n = n.parentNode;
                        }
                        return !1;
                    }, e;
                }(n(0).Component);
            e['default'] = i;
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = a.__importDefault(n(7)), s = n(5), c = n(8), l = n(31), p = n(9), d = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            showFeedBack: !0,
                            errorWarn: !1,
                            isLogin: '',
                            instance: null
                        };
                    }, e.prototype.logSend = function (t) {
                        this.fire('logSend', t);
                    }, e.prototype.quickMeet = function () {
                        var t = this;
                        if (this.logSend({
                                modName: 'superman:videomeeting',
                                evtName: 'quickMeetClick'
                            }), this.data.get('isLogin')) {
                            var e = new FormData(), n = this.data.get('bsToken');
                            e.append('start', '1'), e.append('bsToken', n), c.fetch('/home/meeting/submit/quickstart', {
                                method: 'post',
                                body: e
                            }).then(function (t) {
                                return t.json();
                            }).then(function (e) {
                                0 === e.errno && e.data ? t.fire('quickmeet', e) : 2009 === e.errno && t.data.set('errorWarn', !0);
                            })['catch'](function (e) {
                                t.dispatch('disconnectedError', !0);
                            });
                        } else
                            l.bdsLogin();
                    }, e.prototype.orderMeet = function () {
                        if (this.logSend({
                                modName: 'superman:videomeeting',
                                evtName: 'orderMeetClick'
                            }), this.data.get('isLogin')) {
                            var t = this.selectListInit('Start'), e = this.selectListInit('End'), n = {
                                    startSelectList: t,
                                    endSelectList: e,
                                    endIndex: e.length > 1 ? 1 : 0
                                };
                            this.fire('orderMeet', n);
                        } else
                            l.bdsLogin();
                    }, e.prototype.selectListInit = function (t) {
                        var e, n = [], a = (e = 'Start' === t ? new Date() : new Date(new Date().getTime() + 1800000)).getHours();
                        e.getMinutes() > 30 && (a += 1);
                        for (var i = a; i < 24; i++)
                            i > e.getHours() && n.push(i + ':00'), n.push(i + ':30');
                        return n;
                    }, e.prototype.meetManage = function () {
                        this.logSend({
                            modName: 'superman:videomeeting',
                            evtName: 'meetManageClick'
                        }), this.data.get('isLogin') ? this.fire('manageMeet', null) : l.bdsLogin();
                    }, e.prototype.lessThanIE9 = function () {
                        var t = navigator.userAgent;
                        if (t.indexOf('compatible') > -1 && t.indexOf('MSIE') > -1 && (new RegExp('MSIE (\\d+\\.\\d+);').test(t), parseFloat(RegExp.$1) <= 9))
                            return !0;
                        return !1;
                    }, e.prototype.inited = function () {
                        this.data.set('showFeedBack', !this.lessThanIE9());
                    }, e.prototype.showTips = function () {
                        var t = p.getBrowser();
                        return !('Chrome' === t.type && t.versions >= 72 || 'Firefox' === t.type && t.versions >= 75);
                    }, e.prototype.switchToast = function () {
                        this.data.set('errorWarn', !1);
                    }, e.components = {
                        'v-header': o['default'],
                        'v-foot': r['default'],
                        'c-btn': s.Button,
                        'c-toast': s.Toast
                    }, e.computed = {
                        pastePos: function () {
                            return {
                                top: '211px',
                                left: '105px'
                            };
                        }
                    }, e;
                }(i.Component);
            e['default'] = d;
        },
        function (t, e, n) {
            'use strict';
            function a() {
                fetch('/home/meeting/data/meeting', { method: 'get' }).then(function (t) {
                    return t.json();
                }).then(function (t) {
                    0 === t.errno && t.bindInfo && (1 === t.bindInfo.isBindPhone ? window.location.reload() : $.getScript('//passport.baidu.com/passApi/js/uni_armorwidget_wrapper.js', function () {
                        passport.pop.ArmorWidget('bindmobile', {
                            token: t.bindInfo.bindToken,
                            title: '绑定手机',
                            msg: '',
                            auth_title: '绑定手机',
                            auth_msg: '为了保证您的帐号安全\uFF0C绑定手机前请先进行安全验证',
                            onSubmitSuccess: function (t, e) {
                                window.location.reload(!0);
                            },
                            onSubmitFail: function (t, e) {
                            }
                        }).show();
                    }));
                });
            }
            e.__esModule = !0, e.bdsLogin = e.login = void 0, e.login = function (t) {
                return new Promise(function (e, n) {
                    $.getScript('//passport.baidu.com/passApi/js/uni_login_wrapper.js', function () {
                        t = passport.pop.init({
                            loginVersion: 'v4',
                            apiOpt: {
                                staticPage: window.location.protocol + '//www.baidu.com/cache/user/html/v3Jump.html',
                                product: 'pcbaidumeeting',
                                u: 'http://passport.baidu.com/',
                                memberPass: !0,
                                safeFlag: 0
                            },
                            cache: !0,
                            forgetLink: 'https://passport.baidu.com/?getpass_index',
                            registerLink: 'https://passport.baidu.com/v2/?reg&tpl=&u=',
                            authsite: [],
                            tangram: !0,
                            onLoginSuccess: function (e) {
                                e.returnValue = !1, a(), t.hide();
                            }
                        }), e(t);
                    });
                });
            }, e.bdsLogin = function () {
                bds && bds.se && bds.se.login && bds.se.login.open(function () {
                    a();
                });
            };
        },
        function (t, e, n) {
            'use strict';
            e.__esModule = !0;
            var a = n(4), i = n(0), o = a.__importDefault(n(6)), r = n(5), s = a.__importDefault(n(113)), c = [
                    '日',
                    '一',
                    '二',
                    '三',
                    '四',
                    '五',
                    '六'
                ], l = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e.trimWhitespace = 'all', e;
                    }
                    return a.__extends(e, t), e.prototype.initData = function () {
                        return {
                            meetStatus: 0,
                            myMeet: -1,
                            myMeetList: [
                                {
                                    name: '全部',
                                    value: -1
                                },
                                {
                                    name: '我发起的',
                                    value: 0
                                },
                                {
                                    name: '我参与�