var aE = Object.defineProperty;
var Eh = (e) => {
  throw TypeError(e);
};
var oE = (e, t, r) => t in e ? aE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Yn = (e, t, r) => oE(e, typeof t != "symbol" ? t + "" : t, r), Lc = (e, t, r) => t.has(e) || Eh("Cannot " + r);
var ue = (e, t, r) => (Lc(e, t, "read from private field"), r ? r.call(e) : t.get(e)), sr = (e, t, r) => t.has(e) ? Eh("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), It = (e, t, r, n) => (Lc(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), Er = (e, t, r) => (Lc(e, t, "access private method"), r);
import Or, { ipcMain as Dr, dialog as zy, clipboard as cE, shell as lE, app as bs, BrowserWindow as Ky, WebContentsView as uE } from "electron";
import fn from "fs";
import fE from "constants";
import Bs from "stream";
import bu from "util";
import Wy from "assert";
import De from "path";
import Mo from "child_process";
import Yy from "events";
import Gs from "crypto";
import Xy from "tty";
import xo from "os";
import dn from "url";
import dE from "string_decoder";
import Jy from "zlib";
import hE from "http";
import { fileURLToPath as pE } from "node:url";
import ce from "node:path";
import ae from "node:fs";
import Ne from "node:process";
import { promisify as tt, isDeepStrictEqual as wh } from "node:util";
import _n from "node:crypto";
import bh from "node:assert";
import Qy from "node:os";
import "node:events";
import "node:stream";
var pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var hr = {}, Gn = {}, gt = {};
gt.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, s) => i != null ? n(i) : r(s)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
gt.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Ur = fE, mE = process.cwd, to = null, yE = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return to || (to = mE.call(process)), to;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Sh = process.chdir;
  process.chdir = function(e) {
    to = null, Sh.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Sh);
}
var gE = $E;
function $E(e) {
  Ur.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = o(e.stat), e.fstat = o(e.fstat), e.lstat = o(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, p, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), yE === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(p, h, v) {
      var m = Date.now(), _ = 0;
      l(p, h, function y(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(h, function(T, D) {
              T && T.code === "ENOENT" ? l(p, h, y) : v(w);
            });
          }, _), _ < 100 && (_ += 10);
          return;
        }
        v && v(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(p, h, v, m, _, y) {
      var w;
      if (y && typeof y == "function") {
        var T = 0;
        w = function(D, x, X) {
          if (D && D.code === "EAGAIN" && T < 10)
            return T++, l.call(e, p, h, v, m, _, w);
          y.apply(this, arguments);
        };
      }
      return l.call(e, p, h, v, m, _, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, p, h, v, m) {
      for (var _ = 0; ; )
        try {
          return l.call(e, u, p, h, v, m);
        } catch (y) {
          if (y.code === "EAGAIN" && _ < 10) {
            _++;
            continue;
          }
          throw y;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, p, h) {
      l.open(
        u,
        Ur.O_WRONLY | Ur.O_SYMLINK,
        p,
        function(v, m) {
          if (v) {
            h && h(v);
            return;
          }
          l.fchmod(m, p, function(_) {
            l.close(m, function(y) {
              h && h(_ || y);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, p) {
      var h = l.openSync(u, Ur.O_WRONLY | Ur.O_SYMLINK, p), v = !0, m;
      try {
        m = l.fchmodSync(h, p), v = !1;
      } finally {
        if (v)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return m;
    };
  }
  function r(l) {
    Ur.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, p, h, v) {
      l.open(u, Ur.O_SYMLINK, function(m, _) {
        if (m) {
          v && v(m);
          return;
        }
        l.futimes(_, p, h, function(y) {
          l.close(_, function(w) {
            v && v(y || w);
          });
        });
      });
    }, l.lutimesSync = function(u, p, h) {
      var v = l.openSync(u, Ur.O_SYMLINK), m, _ = !0;
      try {
        m = l.futimesSync(v, p, h), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(v);
          } catch {
          }
        else
          l.closeSync(v);
      }
      return m;
    }) : l.futimes && (l.lutimes = function(u, p, h, v) {
      v && process.nextTick(v);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(u, p, h) {
      return l.call(e, u, p, function(v) {
        f(v) && (v = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, p) {
      try {
        return l.call(e, u, p);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function s(l) {
    return l && function(u, p, h, v) {
      return l.call(e, u, p, h, function(m) {
        f(m) && (m = null), v && v.apply(this, arguments);
      });
    };
  }
  function a(l) {
    return l && function(u, p, h) {
      try {
        return l.call(e, u, p, h);
      } catch (v) {
        if (!f(v)) throw v;
      }
    };
  }
  function o(l) {
    return l && function(u, p, h) {
      typeof p == "function" && (h = p, p = null);
      function v(m, _) {
        _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return p ? l.call(e, u, p, v) : l.call(e, u, v);
    };
  }
  function c(l) {
    return l && function(u, p) {
      var h = p ? l.call(e, u, p) : l.call(e, u);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ph = Bs.Stream, vE = _E;
function _E(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Ph.call(this);
    var s = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), o = 0, c = a.length; o < c; o++) {
      var f = a[o];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        s._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        s.emit("error", l), s.readable = !1;
        return;
      }
      s.fd = u, s.emit("open", u), s._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Ph.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var s = Object.keys(i), a = 0, o = s.length; a < o; a++) {
      var c = s[a];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var EE = bE, wE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function bE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: wE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Ce = fn, SE = gE, PE = vE, TE = EE, ma = bu, Qe, yo;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Qe = Symbol.for("graceful-fs.queue"), yo = Symbol.for("graceful-fs.previous")) : (Qe = "___graceful-fs.queue", yo = "___graceful-fs.previous");
function RE() {
}
function eg(e, t) {
  Object.defineProperty(e, Qe, {
    get: function() {
      return t;
    }
  });
}
var jn = RE;
ma.debuglog ? jn = ma.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (jn = function() {
  var e = ma.format.apply(ma, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ce[Qe]) {
  var NE = pt[Qe] || [];
  eg(Ce, NE), Ce.close = function(e) {
    function t(r, n) {
      return e.call(Ce, r, function(i) {
        i || Th(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, yo, {
      value: e
    }), t;
  }(Ce.close), Ce.closeSync = function(e) {
    function t(r) {
      e.apply(Ce, arguments), Th();
    }
    return Object.defineProperty(t, yo, {
      value: e
    }), t;
  }(Ce.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    jn(Ce[Qe]), Wy.equal(Ce[Qe].length, 0);
  });
}
pt[Qe] || eg(pt, Ce[Qe]);
var $t = Su(TE(Ce));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ce.__patched && ($t = Su(Ce), Ce.__patched = !0);
function Su(e) {
  SE(e), e.gracefulify = Su, e.createReadStream = x, e.createWriteStream = X;
  var t = e.readFile;
  e.readFile = r;
  function r(I, re, H) {
    return typeof re == "function" && (H = re, re = null), W(I, re, H);
    function W(Q, k, L, q) {
      return t(Q, k, function(j) {
        j && (j.code === "EMFILE" || j.code === "ENFILE") ? Xn([W, [Q, k, L], j, q || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(I, re, H, W) {
    return typeof H == "function" && (W = H, H = null), Q(I, re, H, W);
    function Q(k, L, q, j, G) {
      return n(k, L, q, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Xn([Q, [k, L, q, j], V, G || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = a);
  function a(I, re, H, W) {
    return typeof H == "function" && (W = H, H = null), Q(I, re, H, W);
    function Q(k, L, q, j, G) {
      return s(k, L, q, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Xn([Q, [k, L, q, j], V, G || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var o = e.copyFile;
  o && (e.copyFile = c);
  function c(I, re, H, W) {
    return typeof H == "function" && (W = H, H = 0), Q(I, re, H, W);
    function Q(k, L, q, j, G) {
      return o(k, L, q, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Xn([Q, [k, L, q, j], V, G || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(I, re, H) {
    typeof re == "function" && (H = re, re = null);
    var W = l.test(process.version) ? function(L, q, j, G) {
      return f(L, Q(
        L,
        q,
        j,
        G
      ));
    } : function(L, q, j, G) {
      return f(L, q, Q(
        L,
        q,
        j,
        G
      ));
    };
    return W(I, re, H);
    function Q(k, L, q, j) {
      return function(G, V) {
        G && (G.code === "EMFILE" || G.code === "ENFILE") ? Xn([
          W,
          [k, L, q],
          G,
          j || Date.now(),
          Date.now()
        ]) : (V && V.sort && V.sort(), typeof q == "function" && q.call(this, G, V));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = PE(e);
    y = p.ReadStream, T = p.WriteStream;
  }
  var h = e.ReadStream;
  h && (y.prototype = Object.create(h.prototype), y.prototype.open = w);
  var v = e.WriteStream;
  v && (T.prototype = Object.create(v.prototype), T.prototype.open = D), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return y;
    },
    set: function(I) {
      y = I;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(I) {
      T = I;
    },
    enumerable: !0,
    configurable: !0
  });
  var m = y;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return m;
    },
    set: function(I) {
      m = I;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return _;
    },
    set: function(I) {
      _ = I;
    },
    enumerable: !0,
    configurable: !0
  });
  function y(I, re) {
    return this instanceof y ? (h.apply(this, arguments), this) : y.apply(Object.create(y.prototype), arguments);
  }
  function w() {
    var I = this;
    le(I.path, I.flags, I.mode, function(re, H) {
      re ? (I.autoClose && I.destroy(), I.emit("error", re)) : (I.fd = H, I.emit("open", H), I.read());
    });
  }
  function T(I, re) {
    return this instanceof T ? (v.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function D() {
    var I = this;
    le(I.path, I.flags, I.mode, function(re, H) {
      re ? (I.destroy(), I.emit("error", re)) : (I.fd = H, I.emit("open", H));
    });
  }
  function x(I, re) {
    return new e.ReadStream(I, re);
  }
  function X(I, re) {
    return new e.WriteStream(I, re);
  }
  var Y = e.open;
  e.open = le;
  function le(I, re, H, W) {
    return typeof H == "function" && (W = H, H = null), Q(I, re, H, W);
    function Q(k, L, q, j, G) {
      return Y(k, L, q, function(V, O) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? Xn([Q, [k, L, q, j], V, G || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  return e;
}
function Xn(e) {
  jn("ENQUEUE", e[0].name, e[1]), Ce[Qe].push(e), Pu();
}
var ya;
function Th() {
  for (var e = Date.now(), t = 0; t < Ce[Qe].length; ++t)
    Ce[Qe][t].length > 2 && (Ce[Qe][t][3] = e, Ce[Qe][t][4] = e);
  Pu();
}
function Pu() {
  if (clearTimeout(ya), ya = void 0, Ce[Qe].length !== 0) {
    var e = Ce[Qe].shift(), t = e[0], r = e[1], n = e[2], i = e[3], s = e[4];
    if (i === void 0)
      jn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      jn("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var o = Date.now() - s, c = Math.max(s - i, 1), f = Math.min(c * 1.2, 100);
      o >= f ? (jn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Ce[Qe].push(e);
    }
    ya === void 0 && (ya = setTimeout(Pu, 0));
  }
}
(function(e) {
  const t = gt.fromCallback, r = $t, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, s, a, o, c, f) {
    return typeof f == "function" ? r.read(i, s, a, o, c, f) : new Promise((l, u) => {
      r.read(i, s, a, o, c, (p, h, v) => {
        if (p) return u(p);
        l({ bytesRead: h, buffer: v });
      });
    });
  }, e.write = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, s, ...a) : new Promise((o, c) => {
      r.write(i, s, ...a, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, s, ...a) : new Promise((o, c) => {
      r.writev(i, s, ...a, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Gn);
var Tu = {}, tg = {};
const OE = De;
tg.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(OE.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const rg = Gn, { checkPath: ng } = tg, ig = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Tu.makeDir = async (e, t) => (ng(e), rg.mkdir(e, {
  mode: ig(t),
  recursive: !0
}));
Tu.makeDirSync = (e, t) => (ng(e), rg.mkdirSync(e, {
  mode: ig(t),
  recursive: !0
}));
const AE = gt.fromPromise, { makeDir: IE, makeDirSync: Fc } = Tu, jc = AE(IE);
var pr = {
  mkdirs: jc,
  mkdirsSync: Fc,
  // alias
  mkdirp: jc,
  mkdirpSync: Fc,
  ensureDir: jc,
  ensureDirSync: Fc
};
const CE = gt.fromPromise, sg = Gn;
function DE(e) {
  return sg.access(e).then(() => !0).catch(() => !1);
}
var Hn = {
  pathExists: CE(DE),
  pathExistsSync: sg.existsSync
};
const yi = $t;
function kE(e, t, r, n) {
  yi.open(e, "r+", (i, s) => {
    if (i) return n(i);
    yi.futimes(s, t, r, (a) => {
      yi.close(s, (o) => {
        n && n(a || o);
      });
    });
  });
}
function LE(e, t, r) {
  const n = yi.openSync(e, "r+");
  return yi.futimesSync(n, t, r), yi.closeSync(n);
}
var ag = {
  utimesMillis: kE,
  utimesMillisSync: LE
};
const Si = Gn, He = De, FE = bu;
function jE(e, t, r) {
  const n = r.dereference ? (i) => Si.stat(i, { bigint: !0 }) : (i) => Si.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function UE(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Si.statSync(a, { bigint: !0 }) : (a) => Si.lstatSync(a, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: s, destStat: null };
    throw a;
  }
  return { srcStat: s, destStat: n };
}
function ME(e, t, r, n, i) {
  FE.callbackify(jE)(e, t, n, (s, a) => {
    if (s) return i(s);
    const { srcStat: o, destStat: c } = a;
    if (c) {
      if (Hs(o, c)) {
        const f = He.basename(e), l = He.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: o, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (o.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!o.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return o.isDirectory() && Ru(e, t) ? i(new Error(Vo(e, t, r))) : i(null, { srcStat: o, destStat: c });
  });
}
function xE(e, t, r, n) {
  const { srcStat: i, destStat: s } = UE(e, t, n);
  if (s) {
    if (Hs(i, s)) {
      const a = He.basename(e), o = He.basename(t);
      if (r === "move" && a !== o && a.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ru(e, t))
    throw new Error(Vo(e, t, r));
  return { srcStat: i, destStat: s };
}
function og(e, t, r, n, i) {
  const s = He.resolve(He.dirname(e)), a = He.resolve(He.dirname(r));
  if (a === s || a === He.parse(a).root) return i();
  Si.stat(a, { bigint: !0 }, (o, c) => o ? o.code === "ENOENT" ? i() : i(o) : Hs(t, c) ? i(new Error(Vo(e, r, n))) : og(e, t, a, n, i));
}
function cg(e, t, r, n) {
  const i = He.resolve(He.dirname(e)), s = He.resolve(He.dirname(r));
  if (s === i || s === He.parse(s).root) return;
  let a;
  try {
    a = Si.statSync(s, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (Hs(t, a))
    throw new Error(Vo(e, r, n));
  return cg(e, t, s, n);
}
function Hs(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ru(e, t) {
  const r = He.resolve(e).split(He.sep).filter((i) => i), n = He.resolve(t).split(He.sep).filter((i) => i);
  return r.reduce((i, s, a) => i && n[a] === s, !0);
}
function Vo(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Ii = {
  checkPaths: ME,
  checkPathsSync: xE,
  checkParentPaths: og,
  checkParentPathsSync: cg,
  isSrcSubdir: Ru,
  areIdentical: Hs
};
const Rt = $t, Ss = De, VE = pr.mkdirs, qE = Hn.pathExists, BE = ag.utimesMillis, Ps = Ii;
function GE(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Ps.checkPaths(e, t, "copy", r, (i, s) => {
    if (i) return n(i);
    const { srcStat: a, destStat: o } = s;
    Ps.checkParentPaths(e, a, t, "copy", (c) => c ? n(c) : r.filter ? lg(Rh, o, e, t, r, n) : Rh(o, e, t, r, n));
  });
}
function Rh(e, t, r, n, i) {
  const s = Ss.dirname(r);
  qE(s, (a, o) => {
    if (a) return i(a);
    if (o) return go(e, t, r, n, i);
    VE(s, (c) => c ? i(c) : go(e, t, r, n, i));
  });
}
function lg(e, t, r, n, i, s) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, s) : s(), (a) => s(a));
}
function HE(e, t, r, n, i) {
  return n.filter ? lg(go, e, t, r, n, i) : go(e, t, r, n, i);
}
function go(e, t, r, n, i) {
  (n.dereference ? Rt.stat : Rt.lstat)(t, (a, o) => a ? i(a) : o.isDirectory() ? QE(o, e, t, r, n, i) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? zE(o, e, t, r, n, i) : o.isSymbolicLink() ? tw(e, t, r, n, i) : o.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : o.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function zE(e, t, r, n, i, s) {
  return t ? KE(e, r, n, i, s) : ug(e, r, n, i, s);
}
function KE(e, t, r, n, i) {
  if (n.overwrite)
    Rt.unlink(r, (s) => s ? i(s) : ug(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function ug(e, t, r, n, i) {
  Rt.copyFile(t, r, (s) => s ? i(s) : n.preserveTimestamps ? WE(e.mode, t, r, i) : qo(r, e.mode, i));
}
function WE(e, t, r, n) {
  return YE(e) ? XE(r, e, (i) => i ? n(i) : Nh(e, t, r, n)) : Nh(e, t, r, n);
}
function YE(e) {
  return (e & 128) === 0;
}
function XE(e, t, r) {
  return qo(e, t | 128, r);
}
function Nh(e, t, r, n) {
  JE(t, r, (i) => i ? n(i) : qo(r, e, n));
}
function qo(e, t, r) {
  return Rt.chmod(e, t, r);
}
function JE(e, t, r) {
  Rt.stat(e, (n, i) => n ? r(n) : BE(t, i.atime, i.mtime, r));
}
function QE(e, t, r, n, i, s) {
  return t ? fg(r, n, i, s) : ZE(e.mode, r, n, i, s);
}
function ZE(e, t, r, n, i) {
  Rt.mkdir(r, (s) => {
    if (s) return i(s);
    fg(t, r, n, (a) => a ? i(a) : qo(r, e, i));
  });
}
function fg(e, t, r, n) {
  Rt.readdir(e, (i, s) => i ? n(i) : dg(s, e, t, r, n));
}
function dg(e, t, r, n, i) {
  const s = e.pop();
  return s ? ew(e, s, t, r, n, i) : i();
}
function ew(e, t, r, n, i, s) {
  const a = Ss.join(r, t), o = Ss.join(n, t);
  Ps.checkPaths(a, o, "copy", i, (c, f) => {
    if (c) return s(c);
    const { destStat: l } = f;
    HE(l, a, o, i, (u) => u ? s(u) : dg(e, r, n, i, s));
  });
}
function tw(e, t, r, n, i) {
  Rt.readlink(t, (s, a) => {
    if (s) return i(s);
    if (n.dereference && (a = Ss.resolve(process.cwd(), a)), e)
      Rt.readlink(r, (o, c) => o ? o.code === "EINVAL" || o.code === "UNKNOWN" ? Rt.symlink(a, r, i) : i(o) : (n.dereference && (c = Ss.resolve(process.cwd(), c)), Ps.isSrcSubdir(a, c) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Ps.isSrcSubdir(c, a) ? i(new Error(`Cannot overwrite '${c}' with '${a}'.`)) : rw(a, r, i)));
    else
      return Rt.symlink(a, r, i);
  });
}
function rw(e, t, r) {
  Rt.unlink(t, (n) => n ? r(n) : Rt.symlink(e, t, r));
}
var nw = GE;
const ot = $t, Ts = De, iw = pr.mkdirsSync, sw = ag.utimesMillisSync, Rs = Ii;
function aw(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Rs.checkPathsSync(e, t, "copy", r);
  return Rs.checkParentPathsSync(e, n, t, "copy"), ow(i, e, t, r);
}
function ow(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Ts.dirname(r);
  return ot.existsSync(i) || iw(i), hg(e, t, r, n);
}
function cw(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return hg(e, t, r, n);
}
function hg(e, t, r, n) {
  const s = (n.dereference ? ot.statSync : ot.lstatSync)(t);
  if (s.isDirectory()) return mw(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return lw(s, e, t, r, n);
  if (s.isSymbolicLink()) return $w(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function lw(e, t, r, n, i) {
  return t ? uw(e, r, n, i) : pg(e, r, n, i);
}
function uw(e, t, r, n) {
  if (n.overwrite)
    return ot.unlinkSync(r), pg(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function pg(e, t, r, n) {
  return ot.copyFileSync(t, r), n.preserveTimestamps && fw(e.mode, t, r), Nu(r, e.mode);
}
function fw(e, t, r) {
  return dw(e) && hw(r, e), pw(t, r);
}
function dw(e) {
  return (e & 128) === 0;
}
function hw(e, t) {
  return Nu(e, t | 128);
}
function Nu(e, t) {
  return ot.chmodSync(e, t);
}
function pw(e, t) {
  const r = ot.statSync(e);
  return sw(t, r.atime, r.mtime);
}
function mw(e, t, r, n, i) {
  return t ? mg(r, n, i) : yw(e.mode, r, n, i);
}
function yw(e, t, r, n) {
  return ot.mkdirSync(r), mg(t, r, n), Nu(r, e);
}
function mg(e, t, r) {
  ot.readdirSync(e).forEach((n) => gw(n, e, t, r));
}
function gw(e, t, r, n) {
  const i = Ts.join(t, e), s = Ts.join(r, e), { destStat: a } = Rs.checkPathsSync(i, s, "copy", n);
  return cw(a, i, s, n);
}
function $w(e, t, r, n) {
  let i = ot.readlinkSync(t);
  if (n.dereference && (i = Ts.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = ot.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return ot.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (s = Ts.resolve(process.cwd(), s)), Rs.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (ot.statSync(r).isDirectory() && Rs.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return vw(i, r);
  } else
    return ot.symlinkSync(i, r);
}
function vw(e, t) {
  return ot.unlinkSync(t), ot.symlinkSync(e, t);
}
var _w = aw;
const Ew = gt.fromCallback;
var Ou = {
  copy: Ew(nw),
  copySync: _w
};
const Oh = $t, yg = De, Se = Wy, Ns = process.platform === "win32";
function gg(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Oh[r], r = r + "Sync", e[r] = e[r] || Oh[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Au(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Se(e, "rimraf: missing path"), Se.strictEqual(typeof e, "string", "rimraf: path should be a string"), Se.strictEqual(typeof r, "function", "rimraf: callback function required"), Se(t, "rimraf: invalid options argument provided"), Se.strictEqual(typeof t, "object", "rimraf: options should be object"), gg(t), Ah(e, t, function i(s) {
    if (s) {
      if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Ah(e, t, i), a);
      }
      s.code === "ENOENT" && (s = null);
    }
    r(s);
  });
}
function Ah(e, t, r) {
  Se(e), Se(t), Se(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Ns)
      return Ih(e, t, n, r);
    if (i && i.isDirectory())
      return ro(e, t, n, r);
    t.unlink(e, (s) => {
      if (s) {
        if (s.code === "ENOENT")
          return r(null);
        if (s.code === "EPERM")
          return Ns ? Ih(e, t, s, r) : ro(e, t, s, r);
        if (s.code === "EISDIR")
          return ro(e, t, s, r);
      }
      return r(s);
    });
  });
}
function Ih(e, t, r, n) {
  Se(e), Se(t), Se(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (s, a) => {
      s ? n(s.code === "ENOENT" ? null : r) : a.isDirectory() ? ro(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Ch(e, t, r) {
  let n;
  Se(e), Se(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? no(e, t, r) : t.unlinkSync(e);
}
function ro(e, t, r, n) {
  Se(e), Se(t), Se(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? ww(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function ww(e, t, r) {
  Se(e), Se(t), Se(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let s = i.length, a;
    if (s === 0) return t.rmdir(e, r);
    i.forEach((o) => {
      Au(yg.join(e, o), t, (c) => {
        if (!a) {
          if (c) return r(a = c);
          --s === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function $g(e, t) {
  let r;
  t = t || {}, gg(t), Se(e, "rimraf: missing path"), Se.strictEqual(typeof e, "string", "rimraf: path should be a string"), Se(t, "rimraf: missing options"), Se.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ns && Ch(e, t, n);
  }
  try {
    r && r.isDirectory() ? no(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ns ? Ch(e, t, n) : no(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    no(e, t, n);
  }
}
function no(e, t, r) {
  Se(e), Se(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      bw(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function bw(e, t) {
  if (Se(e), Se(t), t.readdirSync(e).forEach((r) => $g(yg.join(e, r), t)), Ns) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var Sw = Au;
Au.sync = $g;
const $o = $t, Pw = gt.fromCallback, vg = Sw;
function Tw(e, t) {
  if ($o.rm) return $o.rm(e, { recursive: !0, force: !0 }, t);
  vg(e, t);
}
function Rw(e) {
  if ($o.rmSync) return $o.rmSync(e, { recursive: !0, force: !0 });
  vg.sync(e);
}
var Bo = {
  remove: Pw(Tw),
  removeSync: Rw
};
const Nw = gt.fromPromise, _g = Gn, Eg = De, wg = pr, bg = Bo, Dh = Nw(async function(t) {
  let r;
  try {
    r = await _g.readdir(t);
  } catch {
    return wg.mkdirs(t);
  }
  return Promise.all(r.map((n) => bg.remove(Eg.join(t, n))));
});
function kh(e) {
  let t;
  try {
    t = _g.readdirSync(e);
  } catch {
    return wg.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Eg.join(e, r), bg.removeSync(r);
  });
}
var Ow = {
  emptyDirSync: kh,
  emptydirSync: kh,
  emptyDir: Dh,
  emptydir: Dh
};
const Aw = gt.fromCallback, Sg = De, Zr = $t, Pg = pr;
function Iw(e, t) {
  function r() {
    Zr.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  Zr.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const s = Sg.dirname(e);
    Zr.stat(s, (a, o) => {
      if (a)
        return a.code === "ENOENT" ? Pg.mkdirs(s, (c) => {
          if (c) return t(c);
          r();
        }) : t(a);
      o.isDirectory() ? r() : Zr.readdir(s, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function Cw(e) {
  let t;
  try {
    t = Zr.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Sg.dirname(e);
  try {
    Zr.statSync(r).isDirectory() || Zr.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Pg.mkdirsSync(r);
    else throw n;
  }
  Zr.writeFileSync(e, "");
}
var Dw = {
  createFile: Aw(Iw),
  createFileSync: Cw
};
const kw = gt.fromCallback, Tg = De, Xr = $t, Rg = pr, Lw = Hn.pathExists, { areIdentical: Ng } = Ii;
function Fw(e, t, r) {
  function n(i, s) {
    Xr.link(i, s, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  Xr.lstat(t, (i, s) => {
    Xr.lstat(e, (a, o) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (s && Ng(o, s)) return r(null);
      const c = Tg.dirname(t);
      Lw(c, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        Rg.mkdirs(c, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function jw(e, t) {
  let r;
  try {
    r = Xr.lstatSync(t);
  } catch {
  }
  try {
    const s = Xr.lstatSync(e);
    if (r && Ng(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = Tg.dirname(t);
  return Xr.existsSync(n) || Rg.mkdirsSync(n), Xr.linkSync(e, t);
}
var Uw = {
  createLink: kw(Fw),
  createLinkSync: jw
};
const en = De, us = $t, Mw = Hn.pathExists;
function xw(e, t, r) {
  if (en.isAbsolute(e))
    return us.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = en.dirname(t), i = en.join(n, e);
    return Mw(i, (s, a) => s ? r(s) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : us.lstat(e, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), r(o)) : r(null, {
      toCwd: e,
      toDst: en.relative(n, e)
    })));
  }
}
function Vw(e, t) {
  let r;
  if (en.isAbsolute(e)) {
    if (r = us.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = en.dirname(t), i = en.join(n, e);
    if (r = us.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = us.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: en.relative(n, e)
    };
  }
}
var qw = {
  symlinkPaths: xw,
  symlinkPathsSync: Vw
};
const Og = $t;
function Bw(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Og.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function Gw(e, t) {
  let r;
  if (t) return t;
  try {
    r = Og.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Hw = {
  symlinkType: Bw,
  symlinkTypeSync: Gw
};
const zw = gt.fromCallback, Ag = De, Yt = Gn, Ig = pr, Kw = Ig.mkdirs, Ww = Ig.mkdirsSync, Cg = qw, Yw = Cg.symlinkPaths, Xw = Cg.symlinkPathsSync, Dg = Hw, Jw = Dg.symlinkType, Qw = Dg.symlinkTypeSync, Zw = Hn.pathExists, { areIdentical: kg } = Ii;
function eb(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Yt.lstat(t, (i, s) => {
    !i && s.isSymbolicLink() ? Promise.all([
      Yt.stat(e),
      Yt.stat(t)
    ]).then(([a, o]) => {
      if (kg(a, o)) return n(null);
      Lh(e, t, r, n);
    }) : Lh(e, t, r, n);
  });
}
function Lh(e, t, r, n) {
  Yw(e, t, (i, s) => {
    if (i) return n(i);
    e = s.toDst, Jw(s.toCwd, r, (a, o) => {
      if (a) return n(a);
      const c = Ag.dirname(t);
      Zw(c, (f, l) => {
        if (f) return n(f);
        if (l) return Yt.symlink(e, t, o, n);
        Kw(c, (u) => {
          if (u) return n(u);
          Yt.symlink(e, t, o, n);
        });
      });
    });
  });
}
function tb(e, t, r) {
  let n;
  try {
    n = Yt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const o = Yt.statSync(e), c = Yt.statSync(t);
    if (kg(o, c)) return;
  }
  const i = Xw(e, t);
  e = i.toDst, r = Qw(i.toCwd, r);
  const s = Ag.dirname(t);
  return Yt.existsSync(s) || Ww(s), Yt.symlinkSync(e, t, r);
}
var rb = {
  createSymlink: zw(eb),
  createSymlinkSync: tb
};
const { createFile: Fh, createFileSync: jh } = Dw, { createLink: Uh, createLinkSync: Mh } = Uw, { createSymlink: xh, createSymlinkSync: Vh } = rb;
var nb = {
  // file
  createFile: Fh,
  createFileSync: jh,
  ensureFile: Fh,
  ensureFileSync: jh,
  // link
  createLink: Uh,
  createLinkSync: Mh,
  ensureLink: Uh,
  ensureLinkSync: Mh,
  // symlink
  createSymlink: xh,
  createSymlinkSync: Vh,
  ensureSymlink: xh,
  ensureSymlinkSync: Vh
};
function ib(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const s = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
}
function sb(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Iu = { stringify: ib, stripBom: sb };
let Pi;
try {
  Pi = $t;
} catch {
  Pi = fn;
}
const Go = gt, { stringify: Lg, stripBom: Fg } = Iu;
async function ab(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Pi, n = "throws" in t ? t.throws : !0;
  let i = await Go.fromCallback(r.readFile)(e, t);
  i = Fg(i);
  let s;
  try {
    s = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return s;
}
const ob = Go.fromPromise(ab);
function cb(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Pi, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Fg(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function lb(e, t, r = {}) {
  const n = r.fs || Pi, i = Lg(t, r);
  await Go.fromCallback(n.writeFile)(e, i, r);
}
const ub = Go.fromPromise(lb);
function fb(e, t, r = {}) {
  const n = r.fs || Pi, i = Lg(t, r);
  return n.writeFileSync(e, i, r);
}
var db = {
  readFile: ob,
  readFileSync: cb,
  writeFile: ub,
  writeFileSync: fb
};
const ga = db;
var hb = {
  // jsonfile exports
  readJson: ga.readFile,
  readJsonSync: ga.readFileSync,
  writeJson: ga.writeFile,
  writeJsonSync: ga.writeFileSync
};
const pb = gt.fromCallback, fs = $t, jg = De, Ug = pr, mb = Hn.pathExists;
function yb(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = jg.dirname(e);
  mb(i, (s, a) => {
    if (s) return n(s);
    if (a) return fs.writeFile(e, t, r, n);
    Ug.mkdirs(i, (o) => {
      if (o) return n(o);
      fs.writeFile(e, t, r, n);
    });
  });
}
function gb(e, ...t) {
  const r = jg.dirname(e);
  if (fs.existsSync(r))
    return fs.writeFileSync(e, ...t);
  Ug.mkdirsSync(r), fs.writeFileSync(e, ...t);
}
var Cu = {
  outputFile: pb(yb),
  outputFileSync: gb
};
const { stringify: $b } = Iu, { outputFile: vb } = Cu;
async function _b(e, t, r = {}) {
  const n = $b(t, r);
  await vb(e, n, r);
}
var Eb = _b;
const { stringify: wb } = Iu, { outputFileSync: bb } = Cu;
function Sb(e, t, r) {
  const n = wb(t, r);
  bb(e, n, r);
}
var Pb = Sb;
const Tb = gt.fromPromise, yt = hb;
yt.outputJson = Tb(Eb);
yt.outputJsonSync = Pb;
yt.outputJSON = yt.outputJson;
yt.outputJSONSync = yt.outputJsonSync;
yt.writeJSON = yt.writeJson;
yt.writeJSONSync = yt.writeJsonSync;
yt.readJSON = yt.readJson;
yt.readJSONSync = yt.readJsonSync;
var Rb = yt;
const Nb = $t, Ml = De, Ob = Ou.copy, Mg = Bo.remove, Ab = pr.mkdirp, Ib = Hn.pathExists, qh = Ii;
function Cb(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  qh.checkPaths(e, t, "move", r, (s, a) => {
    if (s) return n(s);
    const { srcStat: o, isChangingCase: c = !1 } = a;
    qh.checkParentPaths(e, o, t, "move", (f) => {
      if (f) return n(f);
      if (Db(t)) return Bh(e, t, i, c, n);
      Ab(Ml.dirname(t), (l) => l ? n(l) : Bh(e, t, i, c, n));
    });
  });
}
function Db(e) {
  const t = Ml.dirname(e);
  return Ml.parse(t).root === t;
}
function Bh(e, t, r, n, i) {
  if (n) return Uc(e, t, r, i);
  if (r)
    return Mg(t, (s) => s ? i(s) : Uc(e, t, r, i));
  Ib(t, (s, a) => s ? i(s) : a ? i(new Error("dest already exists.")) : Uc(e, t, r, i));
}
function Uc(e, t, r, n) {
  Nb.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : kb(e, t, r, n) : n());
}
function kb(e, t, r, n) {
  Ob(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (s) => s ? n(s) : Mg(e, n));
}
var Lb = Cb;
const xg = $t, xl = De, Fb = Ou.copySync, Vg = Bo.removeSync, jb = pr.mkdirpSync, Gh = Ii;
function Ub(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = Gh.checkPathsSync(e, t, "move", r);
  return Gh.checkParentPathsSync(e, i, t, "move"), Mb(t) || jb(xl.dirname(t)), xb(e, t, n, s);
}
function Mb(e) {
  const t = xl.dirname(e);
  return xl.parse(t).root === t;
}
function xb(e, t, r, n) {
  if (n) return Mc(e, t, r);
  if (r)
    return Vg(t), Mc(e, t, r);
  if (xg.existsSync(t)) throw new Error("dest already exists.");
  return Mc(e, t, r);
}
function Mc(e, t, r) {
  try {
    xg.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Vb(e, t, r);
  }
}
function Vb(e, t, r) {
  return Fb(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Vg(e);
}
var qb = Ub;
const Bb = gt.fromCallback;
var Gb = {
  move: Bb(Lb),
  moveSync: qb
}, hn = {
  // Export promiseified graceful-fs:
  ...Gn,
  // Export extra methods:
  ...Ou,
  ...Ow,
  ...nb,
  ...Rb,
  ...pr,
  ...Gb,
  ...Cu,
  ...Hn,
  ...Bo
}, zn = {}, an = {}, qe = {}, on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.CancellationError = on.CancellationToken = void 0;
const Hb = Yy;
class zb extends Hb.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Vl());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, s) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          s(new Vl());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, s, (o) => {
        a = o;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
on.CancellationToken = zb;
class Vl extends Error {
  constructor() {
    super("cancelled");
  }
}
on.CancellationError = Vl;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.newError = Kb;
function Kb(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var mt = {}, ql = { exports: {} }, $a = { exports: {} }, xc, Hh;
function Wb() {
  if (Hh) return xc;
  Hh = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, s = n * 365.25;
  xc = function(l, u) {
    u = u || {};
    var p = typeof l;
    if (p === "string" && l.length > 0)
      return a(l);
    if (p === "number" && isFinite(l))
      return u.long ? c(l) : o(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function a(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var p = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * s;
          case "weeks":
          case "week":
          case "w":
            return p * i;
          case "days":
          case "day":
          case "d":
            return p * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function o(l) {
    var u = Math.abs(l);
    return u >= n ? Math.round(l / n) + "d" : u >= r ? Math.round(l / r) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= n ? f(l, u, n, "day") : u >= r ? f(l, u, r, "hour") : u >= t ? f(l, u, t, "minute") : u >= e ? f(l, u, e, "second") : l + " ms";
  }
  function f(l, u, p, h) {
    var v = u >= p * 1.5;
    return Math.round(l / p) + " " + h + (v ? "s" : "");
  }
  return xc;
}
var Vc, zh;
function qg() {
  if (zh) return Vc;
  zh = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = o, n.enable = s, n.enabled = c, n.humanize = Wb(), n.destroy = l, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let p = 0;
      for (let h = 0; h < u.length; h++)
        p = (p << 5) - p + u.charCodeAt(h), p |= 0;
      return n.colors[Math.abs(p) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let p, h = null, v, m;
      function _(...y) {
        if (!_.enabled)
          return;
        const w = _, T = Number(/* @__PURE__ */ new Date()), D = T - (p || T);
        w.diff = D, w.prev = p, w.curr = T, p = T, y[0] = n.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        let x = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, (Y, le) => {
          if (Y === "%%")
            return "%";
          x++;
          const I = n.formatters[le];
          if (typeof I == "function") {
            const re = y[x];
            Y = I.call(w, re), y.splice(x, 1), x--;
          }
          return Y;
        }), n.formatArgs.call(w, y), (w.log || n.log).apply(w, y);
      }
      return _.namespace = u, _.useColors = n.useColors(), _.color = n.selectColor(u), _.extend = i, _.destroy = n.destroy, Object.defineProperty(_, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (v !== n.namespaces && (v = n.namespaces, m = n.enabled(u)), m),
        set: (y) => {
          h = y;
        }
      }), typeof n.init == "function" && n.init(_), _;
    }
    function i(u, p) {
      const h = n(this.namespace + (typeof p > "u" ? ":" : p) + u);
      return h.log = this.log, h;
    }
    function s(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const p = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of p)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(u, p) {
      let h = 0, v = 0, m = -1, _ = 0;
      for (; h < u.length; )
        if (v < p.length && (p[v] === u[h] || p[v] === "*"))
          p[v] === "*" ? (m = v, _ = h, v++) : (h++, v++);
        else if (m !== -1)
          v = m + 1, _++, h = _;
        else
          return !1;
      for (; v < p.length && p[v] === "*"; )
        v++;
      return v === p.length;
    }
    function o() {
      const u = [
        ...n.names,
        ...n.skips.map((p) => "-" + p)
      ].join(",");
      return n.enable(""), u;
    }
    function c(u) {
      for (const p of n.skips)
        if (a(u, p))
          return !1;
      for (const p of n.names)
        if (a(u, p))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Vc = e, Vc;
}
var Kh;
function Yb() {
  return Kh || (Kh = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = s, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (p) => {
        p !== "%%" && (l++, p === "%c" && (u = l));
      }), c.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = qg()(t);
    const { formatters: o } = e.exports;
    o.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }($a, $a.exports)), $a.exports;
}
var va = { exports: {} }, qc, Wh;
function Xb() {
  return Wh || (Wh = 1, qc = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), qc;
}
var Bc, Yh;
function Jb() {
  if (Yh) return Bc;
  Yh = 1;
  const e = xo, t = Xy, r = Xb(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function s(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function a(c, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function o(c) {
    const f = a(c, c && c.isTTY);
    return s(f);
  }
  return Bc = {
    supportsColor: o,
    stdout: s(a(!0, t.isatty(1))),
    stderr: s(a(!0, t.isatty(2)))
  }, Bc;
}
var Xh;
function Qb() {
  return Xh || (Xh = 1, function(e, t) {
    const r = Xy, n = bu;
    t.init = l, t.log = o, t.formatArgs = s, t.save = c, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const p = Jb();
      p && (p.stderr || p).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((p) => /^debug_/i.test(p)).reduce((p, h) => {
      const v = h.substring(6).toLowerCase().replace(/_([a-z])/g, (_, y) => y.toUpperCase());
      let m = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(m) ? m = !0 : /^(no|off|false|disabled)$/i.test(m) ? m = !1 : m === "null" ? m = null : m = Number(m), p[v] = m, p;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function s(p) {
      const { namespace: h, useColors: v } = this;
      if (v) {
        const m = this.color, _ = "\x1B[3" + (m < 8 ? m : "8;5;" + m), y = `  ${_};1m${h} \x1B[0m`;
        p[0] = y + p[0].split(`
`).join(`
` + y), p.push(_ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        p[0] = a() + h + " " + p[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function o(...p) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...p) + `
`);
    }
    function c(p) {
      p ? process.env.DEBUG = p : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(p) {
      p.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let v = 0; v < h.length; v++)
        p.inspectOpts[h[v]] = t.inspectOpts[h[v]];
    }
    e.exports = qg()(t);
    const { formatters: u } = e.exports;
    u.o = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, u.O = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts);
    };
  }(va, va.exports)), va.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ql.exports = Yb() : ql.exports = Qb();
var Zb = ql.exports, zs = {};
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.ProgressCallbackTransform = void 0;
const eS = Bs;
class tS extends eS.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
zs.ProgressCallbackTransform = tS;
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.DigestTransform = mt.HttpExecutor = mt.HttpError = void 0;
mt.createHttpError = Gl;
mt.parseJson = lS;
mt.configureRequestOptionsFromUrl = Gg;
mt.configureRequestUrl = ku;
mt.safeGetHeader = gi;
mt.configureRequestOptions = vo;
mt.safeStringifyJson = _o;
const rS = Gs, nS = Zb, iS = fn, sS = Bs, Bl = dn, aS = on, Jh = Ci, oS = zs, En = (0, nS.default)("electron-builder");
function Gl(e, t = null) {
  return new Du(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + _o(e.headers), t);
}
const cS = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class Du extends Error {
  constructor(t, r = `HTTP error: ${cS.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
mt.HttpError = Du;
function lS(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class ci {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new aS.CancellationToken(), n) {
    vo(t);
    const i = n == null ? void 0 : JSON.stringify(n), s = i ? Buffer.from(i) : void 0;
    if (s != null) {
      En(i);
      const { headers: a, ...o } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": s.length,
          ...a
        },
        ...o
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(s));
  }
  doApiRequest(t, r, n, i = 0) {
    return En.enabled && En(`Request: ${_o(t)}`), r.createPromise((s, a, o) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, s, a, i, n);
        } catch (l) {
          a(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, a, t.timeout), this.addRedirectHandlers(c, t, a, i, (f) => {
        this.doApiRequest(f, r, n, i).then(s).catch(a);
      }), n(c, a), o(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, s) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, s, a, o) {
    var c;
    if (En.enabled && En(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${_o(r)}`), t.statusCode === 404) {
      s(Gl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = f >= 300 && f < 400, u = gi(t, "location");
    if (l && u != null) {
      if (a > this.maxRedirects) {
        s(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(ci.prepareRedirectUrlOptions(u, r), n, o, a).then(i).catch(s);
      return;
    }
    t.setEncoding("utf8");
    let p = "";
    t.on("error", s), t.on("data", (h) => p += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = gi(t, "content-type"), v = h != null && (Array.isArray(h) ? h.find((m) => m.includes("json")) != null : h.includes("json"));
          s(Gl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(p)) : p}
          `));
        } else
          i(p.length === 0 ? null : p);
      } catch (h) {
        s(h);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, s) => {
      const a = [], o = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      ku(t, o), vo(o), this.doDownload(o, {
        destination: null,
        options: r,
        onCancel: s,
        callback: (c) => {
          c == null ? n(Buffer.concat(a)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(u);
          }), c.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (s) => {
      if (s.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${s.statusCode}: ${s.statusMessage}`));
        return;
      }
      s.on("error", r.callback);
      const a = gi(s, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(ci.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? fS(r, s) : r.responseHandler(s, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (s) => {
      this.doDownload(s, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Gg(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const s = ci.reconstructOriginalUrl(r), a = Bg(t, r);
      ci.isCrossOriginRedirect(s, a) && (En.enabled && En(`Given the cross-origin redirect (from ${s.host} to ${a.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", s = t.path || "/";
    return new Bl.URL(`${r}//${n}${i}${s}`);
  }
  static isCrossOriginRedirect(t, r) {
    if (t.hostname.toLowerCase() !== r.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && r.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(r.port))
      return !1;
    if (t.protocol !== r.protocol)
      return !0;
    const n = t.port, i = r.port;
    return n !== i;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof Du && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
mt.HttpExecutor = ci;
function Bg(e, t) {
  try {
    return new Bl.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", s = `${n}//${r}${i}`;
    return new Bl.URL(e, s);
  }
}
function Gg(e, t) {
  const r = vo(t), n = Bg(e, t);
  return ku(n, r), r;
}
function ku(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Hl extends sS.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, rS.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Jh.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Jh.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
mt.DigestTransform = Hl;
function uS(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function gi(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function fS(e, t) {
  if (!uS(gi(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = gi(t, "content-length");
    a != null && r.push(new oS.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Hl(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Hl(e.options.sha2, "sha256", "hex"));
  const i = (0, iS.createWriteStream)(e.destination);
  r.push(i);
  let s = t;
  for (const a of r)
    a.on("error", (o) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(o);
    }), s = s.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function vo(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function _o(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.MemoLazy = void 0;
class dS {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Hg(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Ho.MemoLazy = dS;
function Hg(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), s = Object.keys(t);
    return i.length === s.length && i.every((a) => Hg(e[a], t[a]));
  }
  return e === t;
}
var Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.githubUrl = hS;
Ks.githubTagPrefix = pS;
Ks.getS3LikeProviderBaseUrl = mS;
function hS(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function pS(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function mS(e) {
  const t = e.provider;
  if (t === "s3")
    return yS(e);
  if (t === "spaces")
    return gS(e);
  throw new Error(`Not supported provider: ${t}`);
}
function yS(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return zg(t, e.path);
}
function zg(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function gS(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return zg(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
Lu.retry = Kg;
const $S = on;
async function Kg(e, t) {
  var r;
  const { retries: n, interval: i, backoff: s = 0, attempt: a = 0, shouldRetry: o, cancellationToken: c = new $S.CancellationToken() } = t;
  try {
    return await e();
  } catch (f) {
    if (await Promise.resolve((r = o == null ? void 0 : o(f)) !== null && r !== void 0 ? r : !0) && n > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + s * a)), await Kg(e, { ...t, retries: n - 1, attempt: a + 1 });
    throw f;
  }
}
var Fu = {};
Object.defineProperty(Fu, "__esModule", { value: !0 });
Fu.parseDn = vS;
function vS(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const s = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && s.set(r, n);
      break;
    }
    const o = e[a];
    if (t) {
      if (o === '"') {
        t = !1;
        continue;
      }
    } else {
      if (o === '"') {
        t = !0;
        continue;
      }
      if (o === "\\") {
        a++;
        const c = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(c) ? n += e[a] : (a++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && o === "=") {
        r = n, n = "";
        continue;
      }
      if (o === "," || o === ";" || o === "+") {
        r !== null && s.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (o === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let c = a;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += o;
  }
  return s;
}
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.nil = Ti.UUID = void 0;
const Wg = Gs, Yg = Ci, _S = "options.name must be either a string or a Buffer", Qh = (0, Wg.randomBytes)(16);
Qh[0] = Qh[0] | 1;
const io = {}, ve = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  io[t] = e, ve[e] = t;
}
class Mn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Mn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return ES(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = wS(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (io[t[14] + t[15]] & 240) >> 4,
        variant: Zh((io[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Zh((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Yg.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = io[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Ti.UUID = Mn;
Mn.OID = Mn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Zh(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var ds;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(ds || (ds = {}));
function ES(e, t, r, n, i = ds.ASCII) {
  const s = (0, Wg.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Yg.newError)(_S, "ERR_INVALID_UUID_NAME");
  s.update(n), s.update(e);
  const o = s.digest();
  let c;
  switch (i) {
    case ds.BINARY:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = o;
      break;
    case ds.OBJECT:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = new Mn(o);
      break;
    default:
      c = ve[o[0]] + ve[o[1]] + ve[o[2]] + ve[o[3]] + "-" + ve[o[4]] + ve[o[5]] + "-" + ve[o[6] & 15 | r] + ve[o[7]] + "-" + ve[o[8] & 63 | 128] + ve[o[9]] + "-" + ve[o[10]] + ve[o[11]] + ve[o[12]] + ve[o[13]] + ve[o[14]] + ve[o[15]];
      break;
  }
  return c;
}
function wS(e) {
  return ve[e[0]] + ve[e[1]] + ve[e[2]] + ve[e[3]] + "-" + ve[e[4]] + ve[e[5]] + "-" + ve[e[6]] + ve[e[7]] + "-" + ve[e[8]] + ve[e[9]] + "-" + ve[e[10]] + ve[e[11]] + ve[e[12]] + ve[e[13]] + ve[e[14]] + ve[e[15]];
}
Ti.nil = new Mn("00000000-0000-0000-0000-000000000000");
var Ws = {}, Xg = {};
(function(e) {
  (function(t) {
    t.parser = function(E, g) {
      return new n(E, g);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(E, g) {
      if (!(this instanceof n))
        return new n(E, g);
      var M = this;
      s(M), M.q = M.c = "", M.bufferCheckPosition = t.MAX_BUFFER_LENGTH, M.opt = g || {}, M.opt.lowercase = M.opt.lowercase || M.opt.lowercasetags, M.looseCase = M.opt.lowercase ? "toLowerCase" : "toUpperCase", M.tags = [], M.closed = M.closedRoot = M.sawRoot = !1, M.tag = M.error = null, M.strict = !!E, M.noscript = !!(E || M.opt.noscript), M.state = I.BEGIN, M.strictEntities = M.opt.strictEntities, M.ENTITIES = M.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), M.attribList = [], M.opt.xmlns && (M.ns = Object.create(m)), M.opt.unquotedAttributeValues === void 0 && (M.opt.unquotedAttributeValues = !E), M.trackPosition = M.opt.position !== !1, M.trackPosition && (M.position = M.line = M.column = 0), H(M, "onready");
    }
    Object.create || (Object.create = function(E) {
      function g() {
      }
      g.prototype = E;
      var M = new g();
      return M;
    }), Object.keys || (Object.keys = function(E) {
      var g = [];
      for (var M in E) E.hasOwnProperty(M) && g.push(M);
      return g;
    });
    function i(E) {
      for (var g = Math.max(t.MAX_BUFFER_LENGTH, 10), M = 0, A = 0, C = r.length; A < C; A++) {
        var F = E[r[A]].length;
        if (F > g)
          switch (r[A]) {
            case "textNode":
              Q(E);
              break;
            case "cdata":
              W(E, "oncdata", E.cdata), E.cdata = "";
              break;
            case "script":
              W(E, "onscript", E.script), E.script = "";
              break;
            default:
              L(E, "Max buffer length exceeded: " + r[A]);
          }
        M = Math.max(M, F);
      }
      var B = t.MAX_BUFFER_LENGTH - M;
      E.bufferCheckPosition = B + E.position;
    }
    function s(E) {
      for (var g = 0, M = r.length; g < M; g++)
        E[r[g]] = "";
    }
    function a(E) {
      Q(E), E.cdata !== "" && (W(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (W(E, "onscript", E.script), E.script = "");
    }
    n.prototype = {
      end: function() {
        q(this);
      },
      write: N,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var o;
    try {
      o = require("stream").Stream;
    } catch {
      o = function() {
      };
    }
    o || (o = function() {
    });
    var c = t.EVENTS.filter(function(E) {
      return E !== "error" && E !== "end";
    });
    function f(E, g) {
      return new l(E, g);
    }
    function l(E, g) {
      if (!(this instanceof l))
        return new l(E, g);
      o.apply(this), this._parser = new n(E, g), this.writable = !0, this.readable = !0;
      var M = this;
      this._parser.onend = function() {
        M.emit("end");
      }, this._parser.onerror = function(A) {
        M.emit("error", A), M._parser.error = null;
      }, this._decoder = null, c.forEach(function(A) {
        Object.defineProperty(M, "on" + A, {
          get: function() {
            return M._parser["on" + A];
          },
          set: function(C) {
            if (!C)
              return M.removeAllListeners(A), M._parser["on" + A] = C, C;
            M.on(A, C);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(o.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(E) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E)) {
        if (!this._decoder) {
          var g = dE.StringDecoder;
          this._decoder = new g("utf8");
        }
        E = this._decoder.write(E);
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, l.prototype.end = function(E) {
      return E && E.length && this.write(E), this._parser.end(), !0;
    }, l.prototype.on = function(E, g) {
      var M = this;
      return !M._parser["on" + E] && c.indexOf(E) !== -1 && (M._parser["on" + E] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, E), M.emit.apply(M, A);
      }), o.prototype.on.call(M, E, g);
    };
    var u = "[CDATA[", p = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", m = { xml: h, xmlns: v }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function D(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function x(E) {
      return E === '"' || E === "'";
    }
    function X(E) {
      return E === ">" || D(E);
    }
    function Y(E, g) {
      return E.test(g);
    }
    function le(E, g) {
      return !Y(E, g);
    }
    var I = 0;
    t.STATE = {
      BEGIN: I++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: I++,
      // leading whitespace
      TEXT: I++,
      // general stuff
      TEXT_ENTITY: I++,
      // &amp and such.
      OPEN_WAKA: I++,
      // <
      SGML_DECL: I++,
      // <!BLARG
      SGML_DECL_QUOTED: I++,
      // <!BLARG foo "bar
      DOCTYPE: I++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: I++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: I++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: I++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: I++,
      // <!-
      COMMENT: I++,
      // <!--
      COMMENT_ENDING: I++,
      // <!-- blah -
      COMMENT_ENDED: I++,
      // <!-- blah --
      CDATA: I++,
      // <![CDATA[ something
      CDATA_ENDING: I++,
      // ]
      CDATA_ENDING_2: I++,
      // ]]
      PROC_INST: I++,
      // <?hi
      PROC_INST_BODY: I++,
      // <?hi there
      PROC_INST_ENDING: I++,
      // <?hi "there" ?
      OPEN_TAG: I++,
      // <strong
      OPEN_TAG_SLASH: I++,
      // <strong /
      ATTRIB: I++,
      // <a
      ATTRIB_NAME: I++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: I++,
      // <a foo _
      ATTRIB_VALUE: I++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: I++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: I++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: I++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: I++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: I++,
      // <foo bar=&quot
      CLOSE_TAG: I++,
      // </a
      CLOSE_TAG_SAW_WHITE: I++,
      // </a   >
      SCRIPT: I++,
      // <script> ...
      SCRIPT_ENDING: I++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(E) {
      var g = t.ENTITIES[E], M = typeof g == "number" ? String.fromCharCode(g) : g;
      t.ENTITIES[E] = M;
    });
    for (var re in t.STATE)
      t.STATE[t.STATE[re]] = re;
    I = t.STATE;
    function H(E, g, M) {
      E[g] && E[g](M);
    }
    function W(E, g, M) {
      E.textNode && Q(E), H(E, g, M);
    }
    function Q(E) {
      E.textNode = k(E.opt, E.textNode), E.textNode && H(E, "ontext", E.textNode), E.textNode = "";
    }
    function k(E, g) {
      return E.trim && (g = g.trim()), E.normalize && (g = g.replace(/\s+/g, " ")), g;
    }
    function L(E, g) {
      return Q(E), E.trackPosition && (g += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), g = new Error(g), E.error = g, H(E, "onerror", g), E;
    }
    function q(E) {
      return E.sawRoot && !E.closedRoot && j(E, "Unclosed root tag"), E.state !== I.BEGIN && E.state !== I.BEGIN_WHITESPACE && E.state !== I.TEXT && L(E, "Unexpected end"), Q(E), E.c = "", E.closed = !0, H(E, "onend"), n.call(E, E.strict, E.opt), E;
    }
    function j(E, g) {
      if (typeof E != "object" || !(E instanceof n))
        throw new Error("bad call to strictFail");
      E.strict && L(E, g);
    }
    function G(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var g = E.tags[E.tags.length - 1] || E, M = E.tag = { name: E.tagName, attributes: {} };
      E.opt.xmlns && (M.ns = g.ns), E.attribList.length = 0, W(E, "onopentagstart", M);
    }
    function V(E, g) {
      var M = E.indexOf(":"), A = M < 0 ? ["", E] : E.split(":"), C = A[0], F = A[1];
      return g && E === "xmlns" && (C = "xmlns", F = ""), { prefix: C, local: F };
    }
    function O(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var g = V(E.attribName, !0), M = g.prefix, A = g.local;
        if (M === "xmlns")
          if (A === "xml" && E.attribValue !== h)
            j(
              E,
              "xml: prefix must be bound to " + h + `
Actual: ` + E.attribValue
            );
          else if (A === "xmlns" && E.attribValue !== v)
            j(
              E,
              "xmlns: prefix must be bound to " + v + `
Actual: ` + E.attribValue
            );
          else {
            var C = E.tag, F = E.tags[E.tags.length - 1] || E;
            C.ns === F.ns && (C.ns = Object.create(F.ns)), C.ns[A] = E.attribValue;
          }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, W(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function b(E, g) {
      if (E.opt.xmlns) {
        var M = E.tag, A = V(E.tagName);
        M.prefix = A.prefix, M.local = A.local, M.uri = M.ns[A.prefix] || "", M.prefix && !M.uri && (j(
          E,
          "Unbound namespace prefix: " + JSON.stringify(E.tagName)
        ), M.uri = A.prefix);
        var C = E.tags[E.tags.length - 1] || E;
        M.ns && C.ns !== M.ns && Object.keys(M.ns).forEach(function(lt) {
          W(E, "onopennamespace", {
            prefix: lt,
            uri: M.ns[lt]
          });
        });
        for (var F = 0, B = E.attribList.length; F < B; F++) {
          var K = E.attribList[F], J = K[0], se = K[1], de = V(J, !0), _e = de.prefix, ke = de.local, Oe = _e === "" ? "" : M.ns[_e] || "", Ee = {
            name: J,
            value: se,
            prefix: _e,
            local: ke,
            uri: Oe
          };
          _e && _e !== "xmlns" && !Oe && (j(
            E,
            "Unbound namespace prefix: " + JSON.stringify(_e)
          ), Ee.uri = _e), E.tag.attributes[J] = Ee, W(E, "onattribute", Ee);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!g, E.sawRoot = !0, E.tags.push(E.tag), W(E, "onopentag", E.tag), g || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = I.SCRIPT : E.state = I.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function P(E) {
      if (!E.tagName) {
        j(E, "Weird empty close tag."), E.textNode += "</>", E.state = I.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = I.SCRIPT;
          return;
        }
        W(E, "onscript", E.script), E.script = "";
      }
      var g = E.tags.length, M = E.tagName;
      E.strict || (M = M[E.looseCase]());
      for (var A = M; g--; ) {
        var C = E.tags[g];
        if (C.name !== A)
          j(E, "Unexpected close tag");
        else
          break;
      }
      if (g < 0) {
        j(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = I.TEXT;
        return;
      }
      E.tagName = M;
      for (var F = E.tags.length; F-- > g; ) {
        var B = E.tag = E.tags.pop();
        E.tagName = E.tag.name, W(E, "onclosetag", E.tagName);
        var K = {};
        for (var J in B.ns)
          K[J] = B.ns[J];
        var se = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && B.ns !== se.ns && Object.keys(B.ns).forEach(function(de) {
          var _e = B.ns[de];
          W(E, "onclosenamespace", { prefix: de, uri: _e });
        });
      }
      g === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = I.TEXT;
    }
    function S(E) {
      var g = E.entity, M = g.toLowerCase(), A, C = "";
      return E.ENTITIES[g] ? E.ENTITIES[g] : E.ENTITIES[M] ? E.ENTITIES[M] : (g = M, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), A = parseInt(g, 16), C = A.toString(16)) : (g = g.slice(1), A = parseInt(g, 10), C = A.toString(10))), g = g.replace(/^0+/, ""), isNaN(A) || C.toLowerCase() !== g || A < 0 || A > 1114111 ? (j(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(A));
    }
    function d(E, g) {
      g === "<" ? (E.state = I.OPEN_WAKA, E.startTagPosition = E.position) : D(g) || (j(E, "Non-whitespace before first tag."), E.textNode = g, E.state = I.TEXT);
    }
    function $(E, g) {
      var M = "";
      return g < E.length && (M = E.charAt(g)), M;
    }
    function N(E) {
      var g = this;
      if (this.error)
        throw this.error;
      if (g.closed)
        return L(
          g,
          "Cannot write after close. Assign an onready handler."
        );
      if (E === null)
        return q(g);
      typeof E == "object" && (E = E.toString());
      for (var M = 0, A = ""; A = $(E, M++), g.c = A, !!A; )
        switch (g.trackPosition && (g.position++, A === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
          case I.BEGIN:
            if (g.state = I.BEGIN_WHITESPACE, A === "\uFEFF")
              continue;
            d(g, A);
            continue;
          case I.BEGIN_WHITESPACE:
            d(g, A);
            continue;
          case I.TEXT:
            if (g.sawRoot && !g.closedRoot) {
              for (var F = M - 1; A && A !== "<" && A !== "&"; )
                A = $(E, M++), A && g.trackPosition && (g.position++, A === `
` ? (g.line++, g.column = 0) : g.column++);
              g.textNode += E.substring(F, M - 1);
            }
            A === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = I.OPEN_WAKA, g.startTagPosition = g.position) : (!D(A) && (!g.sawRoot || g.closedRoot) && j(g, "Text data outside of root node."), A === "&" ? g.state = I.TEXT_ENTITY : g.textNode += A);
            continue;
          case I.SCRIPT:
            A === "<" ? g.state = I.SCRIPT_ENDING : g.script += A;
            continue;
          case I.SCRIPT_ENDING:
            A === "/" ? g.state = I.CLOSE_TAG : (g.script += "<" + A, g.state = I.SCRIPT);
            continue;
          case I.OPEN_WAKA:
            if (A === "!")
              g.state = I.SGML_DECL, g.sgmlDecl = "";
            else if (!D(A)) if (Y(_, A))
              g.state = I.OPEN_TAG, g.tagName = A;
            else if (A === "/")
              g.state = I.CLOSE_TAG, g.tagName = "";
            else if (A === "?")
              g.state = I.PROC_INST, g.procInstName = g.procInstBody = "";
            else {
              if (j(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                var C = g.position - g.startTagPosition;
                A = new Array(C).join(" ") + A;
              }
              g.textNode += "<" + A, g.state = I.TEXT;
            }
            continue;
          case I.SGML_DECL:
            if (g.sgmlDecl + A === "--") {
              g.state = I.COMMENT, g.comment = "", g.sgmlDecl = "";
              continue;
            }
            g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = I.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + A, g.sgmlDecl = "") : (g.sgmlDecl + A).toUpperCase() === u ? (W(g, "onopencdata"), g.state = I.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + A).toUpperCase() === p ? (g.state = I.DOCTYPE, (g.doctype || g.sawRoot) && j(
              g,
              "Inappropriately located doctype declaration"
            ), g.doctype = "", g.sgmlDecl = "") : A === ">" ? (W(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = I.TEXT) : (x(A) && (g.state = I.SGML_DECL_QUOTED), g.sgmlDecl += A);
            continue;
          case I.SGML_DECL_QUOTED:
            A === g.q && (g.state = I.SGML_DECL, g.q = ""), g.sgmlDecl += A;
            continue;
          case I.DOCTYPE:
            A === ">" ? (g.state = I.TEXT, W(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += A, A === "[" ? g.state = I.DOCTYPE_DTD : x(A) && (g.state = I.DOCTYPE_QUOTED, g.q = A));
            continue;
          case I.DOCTYPE_QUOTED:
            g.doctype += A, A === g.q && (g.q = "", g.state = I.DOCTYPE);
            continue;
          case I.DOCTYPE_DTD:
            A === "]" ? (g.doctype += A, g.state = I.DOCTYPE) : A === "<" ? (g.state = I.OPEN_WAKA, g.startTagPosition = g.position) : x(A) ? (g.doctype += A, g.state = I.DOCTYPE_DTD_QUOTED, g.q = A) : g.doctype += A;
            continue;
          case I.DOCTYPE_DTD_QUOTED:
            g.doctype += A, A === g.q && (g.state = I.DOCTYPE_DTD, g.q = "");
            continue;
          case I.COMMENT:
            A === "-" ? g.state = I.COMMENT_ENDING : g.comment += A;
            continue;
          case I.COMMENT_ENDING:
            A === "-" ? (g.state = I.COMMENT_ENDED, g.comment = k(g.opt, g.comment), g.comment && W(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + A, g.state = I.COMMENT);
            continue;
          case I.COMMENT_ENDED:
            A !== ">" ? (j(g, "Malformed comment"), g.comment += "--" + A, g.state = I.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = I.DOCTYPE_DTD : g.state = I.TEXT;
            continue;
          case I.CDATA:
            for (var F = M - 1; A && A !== "]"; )
              A = $(E, M++), A && g.trackPosition && (g.position++, A === `
` ? (g.line++, g.column = 0) : g.column++);
            g.cdata += E.substring(F, M - 1), A === "]" && (g.state = I.CDATA_ENDING);
            continue;
          case I.CDATA_ENDING:
            A === "]" ? g.state = I.CDATA_ENDING_2 : (g.cdata += "]" + A, g.state = I.CDATA);
            continue;
          case I.CDATA_ENDING_2:
            A === ">" ? (g.cdata && W(g, "oncdata", g.cdata), W(g, "onclosecdata"), g.cdata = "", g.state = I.TEXT) : A === "]" ? g.cdata += "]" : (g.cdata += "]]" + A, g.state = I.CDATA);
            continue;
          case I.PROC_INST:
            A === "?" ? g.state = I.PROC_INST_ENDING : D(A) ? g.state = I.PROC_INST_BODY : g.procInstName += A;
            continue;
          case I.PROC_INST_BODY:
            if (!g.procInstBody && D(A))
              continue;
            A === "?" ? g.state = I.PROC_INST_ENDING : g.procInstBody += A;
            continue;
          case I.PROC_INST_ENDING:
            A === ">" ? (W(g, "onprocessinginstruction", {
              name: g.procInstName,
              body: g.procInstBody
            }), g.procInstName = g.procInstBody = "", g.state = I.TEXT) : (g.procInstBody += "?" + A, g.state = I.PROC_INST_BODY);
            continue;
          case I.OPEN_TAG:
            Y(y, A) ? g.tagName += A : (G(g), A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : (D(A) || j(g, "Invalid character in tag name"), g.state = I.ATTRIB));
            continue;
          case I.OPEN_TAG_SLASH:
            A === ">" ? (b(g, !0), P(g)) : (j(
              g,
              "Forward-slash in opening tag not followed by >"
            ), g.state = I.ATTRIB);
            continue;
          case I.ATTRIB:
            if (D(A))
              continue;
            A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : Y(_, A) ? (g.attribName = A, g.attribValue = "", g.state = I.ATTRIB_NAME) : j(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME:
            A === "=" ? g.state = I.ATTRIB_VALUE : A === ">" ? (j(g, "Attribute without value"), g.attribValue = g.attribName, O(g), b(g)) : D(A) ? g.state = I.ATTRIB_NAME_SAW_WHITE : Y(y, A) ? g.attribName += A : j(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              g.state = I.ATTRIB_VALUE;
            else {
              if (D(A))
                continue;
              j(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", W(g, "onattribute", {
                name: g.attribName,
                value: ""
              }), g.attribName = "", A === ">" ? b(g) : Y(_, A) ? (g.attribName = A, g.state = I.ATTRIB_NAME) : (j(g, "Invalid attribute name"), g.state = I.ATTRIB);
            }
            continue;
          case I.ATTRIB_VALUE:
            if (D(A))
              continue;
            x(A) ? (g.q = A, g.state = I.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || L(g, "Unquoted attribute value"), g.state = I.ATTRIB_VALUE_UNQUOTED, g.attribValue = A);
            continue;
          case I.ATTRIB_VALUE_QUOTED:
            if (A !== g.q) {
              A === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_Q : g.attribValue += A;
              continue;
            }
            O(g), g.q = "", g.state = I.ATTRIB_VALUE_CLOSED;
            continue;
          case I.ATTRIB_VALUE_CLOSED:
            D(A) ? g.state = I.ATTRIB : A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : Y(_, A) ? (j(g, "No whitespace between attributes"), g.attribName = A, g.attribValue = "", g.state = I.ATTRIB_NAME) : j(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_VALUE_UNQUOTED:
            if (!X(A)) {
              A === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_U : g.attribValue += A;
              continue;
            }
            O(g), A === ">" ? b(g) : g.state = I.ATTRIB;
            continue;
          case I.CLOSE_TAG:
            if (g.tagName)
              A === ">" ? P(g) : Y(y, A) ? g.tagName += A : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = I.SCRIPT) : (D(A) || j(g, "Invalid tagname in closing tag"), g.state = I.CLOSE_TAG_SAW_WHITE);
            else {
              if (D(A))
                continue;
              le(_, A) ? g.script ? (g.script += "</" + A, g.state = I.SCRIPT) : j(g, "Invalid tagname in closing tag.") : g.tagName = A;
            }
            continue;
          case I.CLOSE_TAG_SAW_WHITE:
            if (D(A))
              continue;
            A === ">" ? P(g) : j(g, "Invalid characters in closing tag");
            continue;
          case I.TEXT_ENTITY:
          case I.ATTRIB_VALUE_ENTITY_Q:
          case I.ATTRIB_VALUE_ENTITY_U:
            var B, K;
            switch (g.state) {
              case I.TEXT_ENTITY:
                B = I.TEXT, K = "textNode";
                break;
              case I.ATTRIB_VALUE_ENTITY_Q:
                B = I.ATTRIB_VALUE_QUOTED, K = "attribValue";
                break;
              case I.ATTRIB_VALUE_ENTITY_U:
                B = I.ATTRIB_VALUE_UNQUOTED, K = "attribValue";
                break;
            }
            if (A === ";") {
              var J = S(g);
              g.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(J) ? (g.entity = "", g.state = B, g.write(J)) : (g[K] += J, g.entity = "", g.state = B);
            } else Y(g.entity.length ? T : w, A) ? g.entity += A : (j(g, "Invalid character in entity name"), g[K] += "&" + g.entity + A, g.entity = "", g.state = B);
            continue;
          default:
            throw new Error(g, "Unknown state: " + g.state);
        }
      return g.position >= g.bufferCheckPosition && i(g), g;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var E = String.fromCharCode, g = Math.floor, M = function() {
        var A = 16384, C = [], F, B, K = -1, J = arguments.length;
        if (!J)
          return "";
        for (var se = ""; ++K < J; ) {
          var de = Number(arguments[K]);
          if (!isFinite(de) || // `NaN`, `+Infinity`, or `-Infinity`
          de < 0 || // not a valid Unicode code point
          de > 1114111 || // not a valid Unicode code point
          g(de) !== de)
            throw RangeError("Invalid code point: " + de);
          de <= 65535 ? C.push(de) : (de -= 65536, F = (de >> 10) + 55296, B = de % 1024 + 56320, C.push(F, B)), (K + 1 === J || C.length > A) && (se += E.apply(null, C), C.length = 0);
        }
        return se;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: M,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = M;
    }();
  })(e);
})(Xg);
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.XElement = void 0;
Ws.parseXml = TS;
const bS = Xg, _a = Ci;
class Jg {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, _a.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!PS(t))
      throw (0, _a.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, _a.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, _a.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (ep(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => ep(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Ws.XElement = Jg;
const SS = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function PS(e) {
  return SS.test(e);
}
function ep(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function TS(e) {
  let t = null;
  const r = bS.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const s = new Jg(i.name);
    if (s.attributes = i.attributes, t === null)
      t = s;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(s);
    }
    n.push(s);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const s = n[n.length - 1];
    s.value = i, s.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = u;
  var t = on;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Ci;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = mt;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Ho;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var s = zs;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var a = Ks;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return a.githubTagPrefix;
  } });
  var o = Lu;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return o.retry;
  } });
  var c = Fu;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var f = Ti;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var l = Ws;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(p) {
    return p == null ? [] : Array.isArray(p) ? p : [p];
  }
})(qe);
var Ze = {}, ju = {}, Zt = {};
function Qg(e) {
  return typeof e > "u" || e === null;
}
function RS(e) {
  return typeof e == "object" && e !== null;
}
function NS(e) {
  return Array.isArray(e) ? e : Qg(e) ? [] : [e];
}
function OS(e, t) {
  var r, n, i, s;
  if (t)
    for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1)
      i = s[r], e[i] = t[i];
  return e;
}
function AS(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function IS(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Zt.isNothing = Qg;
Zt.isObject = RS;
Zt.toArray = NS;
Zt.repeat = AS;
Zt.isNegativeZero = IS;
Zt.extend = OS;
function Zg(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Os(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Zg(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Os.prototype = Object.create(Error.prototype);
Os.prototype.constructor = Os;
Os.prototype.toString = function(t) {
  return this.name + ": " + Zg(this, t);
};
var Ys = Os, ss = Zt;
function Gc(e, t, r, n, i) {
  var s = "", a = "", o = Math.floor(i / 2) - 1;
  return n - t > o && (s = " ... ", t = n - o + s.length), r - n > o && (a = " ...", r = n + o - a.length), {
    str: s + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + s.length
    // relative position
  };
}
function Hc(e, t) {
  return ss.repeat(" ", t - e.length) + e;
}
function CS(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], s, a = -1; s = r.exec(e.buffer); )
    i.push(s.index), n.push(s.index + s[0].length), e.position <= s.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var o = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(a - c < 0); c++)
    f = Gc(
      e.buffer,
      n[a - c],
      i[a - c],
      e.position - (n[a] - n[a - c]),
      u
    ), o = ss.repeat(" ", t.indent) + Hc((e.line - c + 1).toString(), l) + " | " + f.str + `
` + o;
  for (f = Gc(e.buffer, n[a], i[a], e.position, u), o += ss.repeat(" ", t.indent) + Hc((e.line + 1).toString(), l) + " | " + f.str + `
`, o += ss.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(a + c >= i.length); c++)
    f = Gc(
      e.buffer,
      n[a + c],
      i[a + c],
      e.position - (n[a] - n[a + c]),
      u
    ), o += ss.repeat(" ", t.indent) + Hc((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return o.replace(/\n$/, "");
}
var DS = CS, tp = Ys, kS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], LS = [
  "scalar",
  "sequence",
  "mapping"
];
function FS(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function jS(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (kS.indexOf(r) === -1)
      throw new tp('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = FS(t.styleAliases || null), LS.indexOf(this.kind) === -1)
    throw new tp('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var vt = jS, Xi = Ys, zc = vt;
function rp(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(s, a) {
      s.tag === n.tag && s.kind === n.kind && s.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function US() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function zl(e) {
  return this.extend(e);
}
zl.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof zc)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new Xi("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(s) {
    if (!(s instanceof zc))
      throw new Xi("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new Xi("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new Xi("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(s) {
    if (!(s instanceof zc))
      throw new Xi("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(zl.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = rp(i, "implicit"), i.compiledExplicit = rp(i, "explicit"), i.compiledTypeMap = US(i.compiledImplicit, i.compiledExplicit), i;
};
var e0 = zl, MS = vt, t0 = new MS("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), xS = vt, r0 = new xS("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), VS = vt, n0 = new VS("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), qS = e0, i0 = new qS({
  explicit: [
    t0,
    r0,
    n0
  ]
}), BS = vt;
function GS(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function HS() {
  return null;
}
function zS(e) {
  return e === null;
}
var s0 = new BS("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: GS,
  construct: HS,
  predicate: zS,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), KS = vt;
function WS(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function YS(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function XS(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var a0 = new KS("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: WS,
  construct: YS,
  predicate: XS,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), JS = Zt, QS = vt;
function ZS(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function eP(e) {
  return 48 <= e && e <= 55;
}
function tP(e) {
  return 48 <= e && e <= 57;
}
function rP(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!ZS(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!eP(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!tP(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function nP(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function iP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !JS.isNegativeZero(e);
}
var o0 = new QS("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: rP,
  construct: nP,
  predicate: iP,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), c0 = Zt, sP = vt, aP = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function oP(e) {
  return !(e === null || !aP.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function cP(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var lP = /^[-+]?[0-9]+e/;
function uP(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (c0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), lP.test(r) ? r.replace("e", ".e") : r;
}
function fP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || c0.isNegativeZero(e));
}
var l0 = new sP("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: oP,
  construct: cP,
  predicate: fP,
  represent: uP,
  defaultStyle: "lowercase"
}), u0 = i0.extend({
  implicit: [
    s0,
    a0,
    o0,
    l0
  ]
}), f0 = u0, dP = vt, d0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), h0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function hP(e) {
  return e === null ? !1 : d0.exec(e) !== null || h0.exec(e) !== null;
}
function pP(e) {
  var t, r, n, i, s, a, o, c = 0, f = null, l, u, p;
  if (t = d0.exec(e), t === null && (t = h0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (s = +t[4], a = +t[5], o = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), p = new Date(Date.UTC(r, n, i, s, a, o, c)), f && p.setTime(p.getTime() - f), p;
}
function mP(e) {
  return e.toISOString();
}
var p0 = new dP("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: hP,
  construct: pP,
  instanceOf: Date,
  represent: mP
}), yP = vt;
function gP(e) {
  return e === "<<" || e === null;
}
var m0 = new yP("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: gP
}), $P = vt, Uu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function vP(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, s = Uu;
  for (r = 0; r < i; r++)
    if (t = s.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function _P(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, s = Uu, a = 0, o = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)), a = a << 6 | s.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)) : r === 18 ? (o.push(a >> 10 & 255), o.push(a >> 2 & 255)) : r === 12 && o.push(a >> 4 & 255), new Uint8Array(o);
}
function EP(e) {
  var t = "", r = 0, n, i, s = e.length, a = Uu;
  for (n = 0; n < s; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = s % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function wP(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var y0 = new $P("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: vP,
  construct: _P,
  predicate: wP,
  represent: EP
}), bP = vt, SP = Object.prototype.hasOwnProperty, PP = Object.prototype.toString;
function TP(e) {
  if (e === null) return !0;
  var t = [], r, n, i, s, a, o = e;
  for (r = 0, n = o.length; r < n; r += 1) {
    if (i = o[r], a = !1, PP.call(i) !== "[object Object]") return !1;
    for (s in i)
      if (SP.call(i, s))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(s) === -1) t.push(s);
    else return !1;
  }
  return !0;
}
function RP(e) {
  return e !== null ? e : [];
}
var g0 = new bP("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: TP,
  construct: RP
}), NP = vt, OP = Object.prototype.toString;
function AP(e) {
  if (e === null) return !0;
  var t, r, n, i, s, a = e;
  for (s = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], OP.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    s[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function IP(e) {
  if (e === null) return [];
  var t, r, n, i, s, a = e;
  for (s = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), s[t] = [i[0], n[i[0]]];
  return s;
}
var $0 = new NP("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: AP,
  construct: IP
}), CP = vt, DP = Object.prototype.hasOwnProperty;
function kP(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (DP.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function LP(e) {
  return e !== null ? e : {};
}
var v0 = new CP("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: kP,
  construct: LP
}), Mu = f0.extend({
  implicit: [
    p0,
    m0
  ],
  explicit: [
    y0,
    g0,
    $0,
    v0
  ]
}), Rn = Zt, _0 = Ys, FP = DS, jP = Mu, cn = Object.prototype.hasOwnProperty, Eo = 1, E0 = 2, w0 = 3, wo = 4, Kc = 1, UP = 2, np = 3, MP = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, xP = /[\x85\u2028\u2029]/, VP = /[,\[\]\{\}]/, b0 = /^(?:!|!!|![a-z\-]+!)$/i, S0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ip(e) {
  return Object.prototype.toString.call(e);
}
function dr(e) {
  return e === 10 || e === 13;
}
function Un(e) {
  return e === 9 || e === 32;
}
function Nt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function li(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function qP(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function BP(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function GP(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function sp(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function HP(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function P0(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var T0 = new Array(256), R0 = new Array(256);
for (var Jn = 0; Jn < 256; Jn++)
  T0[Jn] = sp(Jn) ? 1 : 0, R0[Jn] = sp(Jn);
function zP(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || jP, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function N0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = FP(r), new _0(t, r);
}
function ie(e, t) {
  throw N0(e, t);
}
function bo(e, t) {
  e.onWarning && e.onWarning.call(null, N0(e, t));
}
var ap = {
  YAML: function(t, r, n) {
    var i, s, a;
    t.version !== null && ie(t, "duplication of %YAML directive"), n.length !== 1 && ie(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && ie(t, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), a = parseInt(i[2], 10), s !== 1 && ie(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && bo(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, s;
    n.length !== 2 && ie(t, "TAG directive accepts exactly two arguments"), i = n[0], s = n[1], b0.test(i) || ie(t, "ill-formed tag handle (first argument) of the TAG directive"), cn.call(t.tagMap, i) && ie(t, 'there is a previously declared suffix for "' + i + '" tag handle'), S0.test(s) || ie(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      ie(t, "tag prefix is malformed: " + s);
    }
    t.tagMap[i] = s;
  }
};
function nn(e, t, r, n) {
  var i, s, a, o;
  if (t < r) {
    if (o = e.input.slice(t, r), n)
      for (i = 0, s = o.length; i < s; i += 1)
        a = o.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || ie(e, "expected valid JSON character");
    else MP.test(o) && ie(e, "the stream contains non-printable characters");
    e.result += o;
  }
}
function op(e, t, r, n) {
  var i, s, a, o;
  for (Rn.isObject(r) || ie(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, o = i.length; a < o; a += 1)
    s = i[a], cn.call(t, s) || (P0(t, s, r[s]), n[s] = !0);
}
function ui(e, t, r, n, i, s, a, o, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && ie(e, "nested arrays are not supported inside keys"), typeof i == "object" && ip(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && ip(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (f = 0, l = s.length; f < l; f += 1)
        op(e, t, s[f], r);
    else
      op(e, t, s, r);
  else
    !e.json && !cn.call(r, i) && cn.call(t, i) && (e.line = a || e.line, e.lineStart = o || e.lineStart, e.position = c || e.position, ie(e, "duplicated mapping key")), P0(t, i, s), delete r[i];
  return t;
}
function xu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : ie(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ue(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Un(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (dr(i))
      for (xu(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && bo(e, "deficient indentation"), n;
}
function zo(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Nt(r)));
}
function Vu(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Rn.repeat(`
`, t - 1));
}
function KP(e, t, r) {
  var n, i, s, a, o, c, f, l, u = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), Nt(h) || li(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), Nt(i) || r && li(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", s = a = e.position, o = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Nt(i) || r && li(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Nt(n))
        break;
    } else {
      if (e.position === e.lineStart && zo(e) || r && li(h))
        break;
      if (dr(h))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Ue(e, !1, -1), e.lineIndent >= t) {
          o = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    o && (nn(e, s, a, !1), Vu(e, e.line - c), s = a = e.position, o = !1), Un(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return nn(e, s, a, !1), e.result ? !0 : (e.kind = u, e.result = p, !1);
}
function WP(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (nn(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else dr(r) ? (nn(e, n, i, !0), Vu(e, Ue(e, !1, t)), n = i = e.position) : e.position === e.lineStart && zo(e) ? ie(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  ie(e, "unexpected end of the stream within a single quoted scalar");
}
function YP(e, t) {
  var r, n, i, s, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return nn(e, r, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (nn(e, r, e.position, !0), o = e.input.charCodeAt(++e.position), dr(o))
        Ue(e, !1, t);
      else if (o < 256 && T0[o])
        e.result += R0[o], e.position++;
      else if ((a = BP(o)) > 0) {
        for (i = a, s = 0; i > 0; i--)
          o = e.input.charCodeAt(++e.position), (a = qP(o)) >= 0 ? s = (s << 4) + a : ie(e, "expected hexadecimal character");
        e.result += HP(s), e.position++;
      } else
        ie(e, "unknown escape sequence");
      r = n = e.position;
    } else dr(o) ? (nn(e, r, n, !0), Vu(e, Ue(e, !1, t)), r = n = e.position) : e.position === e.lineStart && zo(e) ? ie(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  ie(e, "unexpected end of the stream within a double quoted scalar");
}
function XP(e, t) {
  var r = !0, n, i, s, a = e.tag, o, c = e.anchor, f, l, u, p, h, v = /* @__PURE__ */ Object.create(null), m, _, y, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    l = 93, h = !1, o = [];
  else if (w === 123)
    l = 125, h = !0, o = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Ue(e, !0, t), w = e.input.charCodeAt(e.position), w === l)
      return e.position++, e.tag = a, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = o, !0;
    r ? w === 44 && ie(e, "expected the node content, but found ','") : ie(e, "missed comma between flow collection entries"), _ = m = y = null, u = p = !1, w === 63 && (f = e.input.charCodeAt(e.position + 1), Nt(f) && (u = p = !0, e.position++, Ue(e, !0, t))), n = e.line, i = e.lineStart, s = e.position, Ri(e, t, Eo, !1, !0), _ = e.tag, m = e.result, Ue(e, !0, t), w = e.input.charCodeAt(e.position), (p || e.line === n) && w === 58 && (u = !0, w = e.input.charCodeAt(++e.position), Ue(e, !0, t), Ri(e, t, Eo, !1, !0), y = e.result), h ? ui(e, o, v, _, m, y, n, i, s) : u ? o.push(ui(e, null, v, _, m, y, n, i, s)) : o.push(m), Ue(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  ie(e, "unexpected end of the stream within a flow collection");
}
function JP(e, t) {
  var r, n, i = Kc, s = !1, a = !1, o = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Kc === i ? i = u === 43 ? np : UP : ie(e, "repeat of a chomping mode identifier");
    else if ((l = GP(u)) >= 0)
      l === 0 ? ie(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? ie(e, "repeat of an indentation width identifier") : (o = t + l - 1, a = !0);
    else
      break;
  if (Un(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (Un(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!dr(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (xu(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!a || e.lineIndent < o) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > o && (o = e.lineIndent), dr(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < o) {
      i === np ? e.result += Rn.repeat(`
`, s ? 1 + c : c) : i === Kc && s && (e.result += `
`);
      break;
    }
    for (n ? Un(u) ? (f = !0, e.result += Rn.repeat(`
`, s ? 1 + c : c)) : f ? (f = !1, e.result += Rn.repeat(`
`, c + 1)) : c === 0 ? s && (e.result += " ") : e.result += Rn.repeat(`
`, c) : e.result += Rn.repeat(`
`, s ? 1 + c : c), s = !0, a = !0, c = 0, r = e.position; !dr(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    nn(e, r, e.position, !1);
  }
  return !0;
}
function cp(e, t) {
  var r, n = e.tag, i = e.anchor, s = [], a, o = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ie(e, "tab characters must not be used in indentation")), !(c !== 45 || (a = e.input.charCodeAt(e.position + 1), !Nt(a)))); ) {
    if (o = !0, e.position++, Ue(e, !0, -1) && e.lineIndent <= t) {
      s.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Ri(e, t, w0, !1, !0), s.push(e.result), Ue(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      ie(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = s, !0) : !1;
}
function QP(e, t, r) {
  var n, i, s, a, o, c, f = e.tag, l = e.anchor, u = {}, p = /* @__PURE__ */ Object.create(null), h = null, v = null, m = null, _ = !1, y = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ie(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), s = e.line, (w === 63 || w === 58) && Nt(n))
      w === 63 ? (_ && (ui(e, u, p, h, v, null, a, o, c), h = v = m = null), y = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : ie(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (a = e.line, o = e.lineStart, c = e.position, !Ri(e, r, E0, !1, !0))
        break;
      if (e.line === s) {
        for (w = e.input.charCodeAt(e.position); Un(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), Nt(w) || ie(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (ui(e, u, p, h, v, null, a, o, c), h = v = m = null), y = !0, _ = !1, i = !1, h = e.tag, v = e.result;
        else if (y)
          ie(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (y)
        ie(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === s || e.lineIndent > t) && (_ && (a = e.line, o = e.lineStart, c = e.position), Ri(e, t, wo, !0, i) && (_ ? v = e.result : m = e.result), _ || (ui(e, u, p, h, v, m, a, o, c), h = v = m = null), Ue(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === s || e.lineIndent > t) && w !== 0)
      ie(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && ui(e, u, p, h, v, null, a, o, c), y && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), y;
}
function ZP(e) {
  var t, r = !1, n = !1, i, s, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && ie(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (s = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : ie(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Nt(a); )
      a === 33 && (n ? ie(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), b0.test(i) || ie(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    s = e.input.slice(t, e.position), VP.test(s) && ie(e, "tag suffix cannot contain flow indicator characters");
  }
  s && !S0.test(s) && ie(e, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    ie(e, "tag name is malformed: " + s);
  }
  return r ? e.tag = s : cn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + s : i === "!" ? e.tag = "!" + s : i === "!!" ? e.tag = "tag:yaml.org,2002:" + s : ie(e, 'undeclared tag handle "' + i + '"'), !0;
}
function eT(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && ie(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Nt(r) && !li(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && ie(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function tT(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Nt(n) && !li(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && ie(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), cn.call(e.anchorMap, r) || ie(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ue(e, !0, -1), !0;
}
function Ri(e, t, r, n, i) {
  var s, a, o, c = 1, f = !1, l = !1, u, p, h, v, m, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, s = a = o = wo === r || w0 === r, n && Ue(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; ZP(e) || eT(e); )
      Ue(e, !0, -1) ? (f = !0, o = s, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : o = !1;
  if (o && (o = f || i), (c === 1 || wo === r) && (Eo === r || E0 === r ? m = t : m = t + 1, _ = e.position - e.lineStart, c === 1 ? o && (cp(e, _) || QP(e, _, m)) || XP(e, m) ? l = !0 : (a && JP(e, m) || WP(e, m) || YP(e, m) ? l = !0 : tT(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && ie(e, "alias node should not have any properties")) : KP(e, m, Eo === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = o && cp(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && ie(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, p = e.implicitTypes.length; u < p; u += 1)
      if (v = e.implicitTypes[u], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (cn.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, h = e.typeMap.multi[e.kind || "fallback"], u = 0, p = h.length; u < p; u += 1)
        if (e.tag.slice(0, h[u].tag.length) === h[u].tag) {
          v = h[u];
          break;
        }
    v || ie(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && ie(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ie(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function rT(e) {
  var t = e.position, r, n, i, s = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (Ue(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (s = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Nt(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && ie(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Un(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !dr(a));
        break;
      }
      if (dr(a)) break;
      for (r = e.position; a !== 0 && !Nt(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && xu(e), cn.call(ap, n) ? ap[n](e, n, i) : bo(e, 'unknown document directive "' + n + '"');
  }
  if (Ue(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ue(e, !0, -1)) : s && ie(e, "directives end mark is expected"), Ri(e, e.lineIndent - 1, wo, !1, !0), Ue(e, !0, -1), e.checkLineBreaks && xP.test(e.input.slice(t, e.position)) && bo(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && zo(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ue(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    ie(e, "end of the stream or a document separator is expected");
  else
    return;
}
function O0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new zP(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, ie(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    rT(r);
  return r.documents;
}
function nT(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = O0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, s = n.length; i < s; i += 1)
    t(n[i]);
}
function iT(e, t) {
  var r = O0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new _0("expected a single document in the stream, but found more");
  }
}
ju.loadAll = nT;
ju.load = iT;
var A0 = {}, Ko = Zt, Xs = Ys, sT = Mu, I0 = Object.prototype.toString, C0 = Object.prototype.hasOwnProperty, qu = 65279, aT = 9, As = 10, oT = 13, cT = 32, lT = 33, uT = 34, Kl = 35, fT = 37, dT = 38, hT = 39, pT = 42, D0 = 44, mT = 45, So = 58, yT = 61, gT = 62, $T = 63, vT = 64, k0 = 91, L0 = 93, _T = 96, F0 = 123, ET = 124, j0 = 125, ct = {};
ct[0] = "\\0";
ct[7] = "\\a";
ct[8] = "\\b";
ct[9] = "\\t";
ct[10] = "\\n";
ct[11] = "\\v";
ct[12] = "\\f";
ct[13] = "\\r";
ct[27] = "\\e";
ct[34] = '\\"';
ct[92] = "\\\\";
ct[133] = "\\N";
ct[160] = "\\_";
ct[8232] = "\\L";
ct[8233] = "\\P";
var wT = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], bT = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ST(e, t) {
  var r, n, i, s, a, o, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
    a = n[i], o = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), c = e.compiledTypeMap.fallback[a], c && C0.call(c.styleAliases, o) && (o = c.styleAliases[o]), r[a] = o;
  return r;
}
function PT(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Xs("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Ko.repeat("0", n - t.length) + t;
}
var TT = 1, Is = 2;
function RT(e) {
  this.schema = e.schema || sT, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Ko.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ST(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Is : TT, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function lp(e, t) {
  for (var r = Ko.repeat(" ", t), n = 0, i = -1, s = "", a, o = e.length; n < o; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = o) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (s += r), s += a;
  return s;
}
function Wl(e, t) {
  return `
` + Ko.repeat(" ", e.indent * t);
}
function NT(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Po(e) {
  return e === cT || e === aT;
}
function Cs(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== qu || 65536 <= e && e <= 1114111;
}
function up(e) {
  return Cs(e) && e !== qu && e !== oT && e !== As;
}
function fp(e, t, r) {
  var n = up(e), i = n && !Po(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== D0 && e !== k0 && e !== L0 && e !== F0 && e !== j0) && e !== Kl && !(t === So && !i) || up(t) && !Po(t) && e === Kl || t === So && i
  );
}
function OT(e) {
  return Cs(e) && e !== qu && !Po(e) && e !== mT && e !== $T && e !== So && e !== D0 && e !== k0 && e !== L0 && e !== F0 && e !== j0 && e !== Kl && e !== dT && e !== pT && e !== lT && e !== ET && e !== yT && e !== gT && e !== hT && e !== uT && e !== fT && e !== vT && e !== _T;
}
function AT(e) {
  return !Po(e) && e !== So;
}
function as(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function U0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var M0 = 1, Yl = 2, x0 = 3, V0 = 4, si = 5;
function IT(e, t, r, n, i, s, a, o) {
  var c, f = 0, l = null, u = !1, p = !1, h = n !== -1, v = -1, m = OT(as(e, 0)) && AT(as(e, e.length - 1));
  if (t || a)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = as(e, c), !Cs(f))
        return si;
      m = m && fp(f, l, o), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = as(e, c), f === As)
        u = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        c - v - 1 > n && e[v + 1] !== " ", v = c);
      else if (!Cs(f))
        return si;
      m = m && fp(f, l, o), l = f;
    }
    p = p || h && c - v - 1 > n && e[v + 1] !== " ";
  }
  return !u && !p ? m && !a && !i(e) ? M0 : s === Is ? si : Yl : r > 9 && U0(e) ? si : a ? s === Is ? si : Yl : p ? V0 : x0;
}
function CT(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Is ? '""' : "''";
    if (!e.noCompatMode && (wT.indexOf(t) !== -1 || bT.test(t)))
      return e.quotingType === Is ? '"' + t + '"' : "'" + t + "'";
    var s = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s), o = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return NT(e, f);
    }
    switch (IT(
      t,
      o,
      e.indent,
      a,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case M0:
        return t;
      case Yl:
        return "'" + t.replace(/'/g, "''") + "'";
      case x0:
        return "|" + dp(t, e.indent) + hp(lp(t, s));
      case V0:
        return ">" + dp(t, e.indent) + hp(lp(DT(t, a), s));
      case si:
        return '"' + kT(t) + '"';
      default:
        throw new Xs("impossible error: invalid scalar style");
    }
  }();
}
function dp(e, t) {
  var r = U0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), s = i ? "+" : n ? "" : "-";
  return r + s + `
`;
}
function hp(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function DT(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, pp(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", s, a; a = r.exec(e); ) {
    var o = a[1], c = a[2];
    s = c[0] === " ", n += o + (!i && !s && c !== "" ? `
` : "") + pp(c, t), i = s;
  }
  return n;
}
function pp(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, s, a = 0, o = 0, c = ""; n = r.exec(e); )
    o = n.index, o - i > t && (s = a > i ? a : o, c += `
` + e.slice(i, s), i = s + 1), a = o;
  return c += `
`, e.length - i > t && a > i ? c += e.slice(i, a) + `
` + e.slice(a + 1) : c += e.slice(i), c.slice(1);
}
function kT(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = as(e, i), n = ct[r], !n && Cs(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || PT(r);
  return t;
}
function LT(e, t, r) {
  var n = "", i = e.tag, s, a, o;
  for (s = 0, a = r.length; s < a; s += 1)
    o = r[s], e.replacer && (o = e.replacer.call(r, String(s), o)), (Ar(e, t, o, !1, !1) || typeof o > "u" && Ar(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function mp(e, t, r, n) {
  var i = "", s = e.tag, a, o, c;
  for (a = 0, o = r.length; a < o; a += 1)
    c = r[a], e.replacer && (c = e.replacer.call(r, String(a), c)), (Ar(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Ar(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Wl(e, t)), e.dump && As === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = s, e.dump = i || "[]";
}
function FT(e, t, r) {
  var n = "", i = e.tag, s = Object.keys(r), a, o, c, f, l;
  for (a = 0, o = s.length; a < o; a += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = s[a], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), Ar(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ar(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function jT(e, t, r, n) {
  var i = "", s = e.tag, a = Object.keys(r), o, c, f, l, u, p;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Xs("sortKeys must be a boolean or a function");
  for (o = 0, c = a.length; o < c; o += 1)
    p = "", (!n || i !== "") && (p += Wl(e, t)), f = a[o], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), Ar(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && As === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, u && (p += Wl(e, t)), Ar(e, t + 1, l, !0, u) && (e.dump && As === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p));
  e.tag = s, e.dump = i || "{}";
}
function yp(e, t, r) {
  var n, i, s, a, o, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, s = 0, a = i.length; s < a; s += 1)
    if (o = i[s], (o.instanceOf || o.predicate) && (!o.instanceOf || typeof t == "object" && t instanceof o.instanceOf) && (!o.predicate || o.predicate(t))) {
      if (r ? o.multi && o.representName ? e.tag = o.representName(t) : e.tag = o.tag : e.tag = "?", o.represent) {
        if (c = e.styleMap[o.tag] || o.defaultStyle, I0.call(o.represent) === "[object Function]")
          n = o.represent(t, c);
        else if (C0.call(o.represent, c))
          n = o.represent[c](t, c);
        else
          throw new Xs("!<" + o.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Ar(e, t, r, n, i, s, a) {
  e.tag = null, e.dump = r, yp(e, r, !1) || yp(e, r, !0);
  var o = I0.call(e.dump), c = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = o === "[object Object]" || o === "[object Array]", u, p;
  if (l && (u = e.duplicates.indexOf(r), p = u !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && t > 0) && (i = !1), p && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && p && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), o === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (jT(e, t, e.dump, i), p && (e.dump = "&ref_" + u + e.dump)) : (FT(e, t, e.dump), p && (e.dump = "&ref_" + u + " " + e.dump));
    else if (o === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? mp(e, t - 1, e.dump, i) : mp(e, t, e.dump, i), p && (e.dump = "&ref_" + u + e.dump)) : (LT(e, t, e.dump), p && (e.dump = "&ref_" + u + " " + e.dump));
    else if (o === "[object String]")
      e.tag !== "?" && CT(e, e.dump, t, s, c);
    else {
      if (o === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Xs("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function UT(e, t) {
  var r = [], n = [], i, s;
  for (Xl(e, r, n), i = 0, s = n.length; i < s; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(s);
}
function Xl(e, t, r) {
  var n, i, s;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, s = e.length; i < s; i += 1)
        Xl(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1)
        Xl(e[n[i]], t, r);
}
function MT(e, t) {
  t = t || {};
  var r = new RT(t);
  r.noRefs || UT(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ar(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
A0.dump = MT;
var q0 = ju, xT = A0;
function Bu(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ze.Type = vt;
Ze.Schema = e0;
Ze.FAILSAFE_SCHEMA = i0;
Ze.JSON_SCHEMA = u0;
Ze.CORE_SCHEMA = f0;
Ze.DEFAULT_SCHEMA = Mu;
Ze.load = q0.load;
Ze.loadAll = q0.loadAll;
Ze.dump = xT.dump;
Ze.YAMLException = Ys;
Ze.types = {
  binary: y0,
  float: l0,
  map: n0,
  null: s0,
  pairs: $0,
  set: v0,
  timestamp: p0,
  bool: a0,
  int: o0,
  merge: m0,
  omap: g0,
  seq: r0,
  str: t0
};
Ze.safeLoad = Bu("safeLoad", "load");
Ze.safeLoadAll = Bu("safeLoadAll", "loadAll");
Ze.safeDump = Bu("safeDump", "dump");
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.Lazy = void 0;
class VT {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Wo.Lazy = VT;
var Jl = { exports: {} };
const qT = "2.0.0", B0 = 256, BT = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, GT = 16, HT = B0 - 6, zT = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Yo = {
  MAX_LENGTH: B0,
  MAX_SAFE_COMPONENT_LENGTH: GT,
  MAX_SAFE_BUILD_LENGTH: HT,
  MAX_SAFE_INTEGER: BT,
  RELEASE_TYPES: zT,
  SEMVER_SPEC_VERSION: qT,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const KT = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Xo = KT;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Yo, s = Xo;
  t = e.exports = {};
  const a = t.re = [], o = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [p, n]
  ], v = (_) => {
    for (const [y, w] of h)
      _ = _.split(`${y}*`).join(`${y}{0,${w}}`).split(`${y}+`).join(`${y}{1,${w}}`);
    return _;
  }, m = (_, y, w) => {
    const T = v(y), D = u++;
    s(_, D, y), l[_] = D, c[D] = y, f[D] = T, a[D] = new RegExp(y, w ? "g" : void 0), o[D] = new RegExp(T, w ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), m("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${p}+`), m("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), m("FULL", `^${c[l.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), m("LOOSE", `^${c[l.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), m("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), m("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", c[l.COERCE], !0), m("COERCERTLFULL", c[l.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Jl, Jl.exports);
var Js = Jl.exports;
const WT = Object.freeze({ loose: !0 }), YT = Object.freeze({}), XT = (e) => e ? typeof e != "object" ? WT : e : YT;
var Gu = XT;
const gp = /^[0-9]+$/, G0 = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = gp.test(e), n = gp.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, JT = (e, t) => G0(t, e);
var H0 = {
  compareIdentifiers: G0,
  rcompareIdentifiers: JT
};
const Ea = Xo, { MAX_LENGTH: $p, MAX_SAFE_INTEGER: wa } = Yo, { safeRe: ba, t: Sa } = Js, QT = Gu, { compareIdentifiers: Wc } = H0;
let ZT = class ar {
  constructor(t, r) {
    if (r = QT(r), t instanceof ar) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > $p)
      throw new TypeError(
        `version is longer than ${$p} characters`
      );
    Ea("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? ba[Sa.LOOSE] : ba[Sa.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > wa || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > wa || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > wa || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < wa)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Ea("SemVer.compare", this.version, this.options, t), !(t instanceof ar)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ar(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ar || (t = new ar(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ar || (t = new ar(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Ea("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Wc(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ar || (t = new ar(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Ea("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Wc(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? ba[Sa.PRERELEASELOOSE] : ba[Sa.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]), Wc(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var _t = ZT;
const vp = _t, e1 = (e, t, r = !1) => {
  if (e instanceof vp)
    return e;
  try {
    return new vp(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Di = e1;
const t1 = Di, r1 = (e, t) => {
  const r = t1(e, t);
  return r ? r.version : null;
};
var n1 = r1;
const i1 = Di, s1 = (e, t) => {
  const r = i1(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var a1 = s1;
const _p = _t, o1 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new _p(
      e instanceof _p ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var c1 = o1;
const Ep = Di, l1 = (e, t) => {
  const r = Ep(e, null, !0), n = Ep(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const s = i > 0, a = s ? r : n, o = s ? n : r, c = !!a.prerelease.length;
  if (!!o.prerelease.length && !c) {
    if (!o.patch && !o.minor)
      return "major";
    if (o.compareMain(a) === 0)
      return o.minor && !o.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var u1 = l1;
const f1 = _t, d1 = (e, t) => new f1(e, t).major;
var h1 = d1;
const p1 = _t, m1 = (e, t) => new p1(e, t).minor;
var y1 = m1;
const g1 = _t, $1 = (e, t) => new g1(e, t).patch;
var v1 = $1;
const _1 = Di, E1 = (e, t) => {
  const r = _1(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var w1 = E1;
const wp = _t, b1 = (e, t, r) => new wp(e, r).compare(new wp(t, r));
var er = b1;
const S1 = er, P1 = (e, t, r) => S1(t, e, r);
var T1 = P1;
const R1 = er, N1 = (e, t) => R1(e, t, !0);
var O1 = N1;
const bp = _t, A1 = (e, t, r) => {
  const n = new bp(e, r), i = new bp(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Hu = A1;
const I1 = Hu, C1 = (e, t) => e.sort((r, n) => I1(r, n, t));
var D1 = C1;
const k1 = Hu, L1 = (e, t) => e.sort((r, n) => k1(n, r, t));
var F1 = L1;
const j1 = er, U1 = (e, t, r) => j1(e, t, r) > 0;
var Jo = U1;
const M1 = er, x1 = (e, t, r) => M1(e, t, r) < 0;
var zu = x1;
const V1 = er, q1 = (e, t, r) => V1(e, t, r) === 0;
var z0 = q1;
const B1 = er, G1 = (e, t, r) => B1(e, t, r) !== 0;
var K0 = G1;
const H1 = er, z1 = (e, t, r) => H1(e, t, r) >= 0;
var Ku = z1;
const K1 = er, W1 = (e, t, r) => K1(e, t, r) <= 0;
var Wu = W1;
const Y1 = z0, X1 = K0, J1 = Jo, Q1 = Ku, Z1 = zu, eR = Wu, tR = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Y1(e, r, n);
    case "!=":
      return X1(e, r, n);
    case ">":
      return J1(e, r, n);
    case ">=":
      return Q1(e, r, n);
    case "<":
      return Z1(e, r, n);
    case "<=":
      return eR(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var W0 = tR;
const rR = _t, nR = Di, { safeRe: Pa, t: Ta } = Js, iR = (e, t) => {
  if (e instanceof rR)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Pa[Ta.COERCEFULL] : Pa[Ta.COERCE]);
  else {
    const c = t.includePrerelease ? Pa[Ta.COERCERTLFULL] : Pa[Ta.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return nR(`${n}.${i}.${s}${a}${o}`, t);
};
var sR = iR;
let aR = class {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
};
var oR = aR, Yc, Sp;
function tr() {
  if (Sp) return Yc;
  Sp = 1;
  const e = /\s+/g;
  class t {
    constructor(L, q) {
      if (q = i(q), L instanceof t)
        return L.loose === !!q.loose && L.includePrerelease === !!q.includePrerelease ? L : new t(L.raw, q);
      if (L instanceof s)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = q, this.loose = !!q.loose, this.includePrerelease = !!q.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((j) => this.parseRange(j.trim())).filter((j) => j.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const j = this.set[0];
        if (this.set = this.set.filter((G) => !m(G[0])), this.set.length === 0)
          this.set = [j];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && _(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const q = this.set[L];
          for (let j = 0; j < q.length; j++)
            j > 0 && (this.formatted += " "), this.formatted += q[j].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(L) {
      const j = ((this.options.includePrerelease && h) | (this.options.loose && v)) + ":" + L, G = n.get(j);
      if (G)
        return G;
      const V = this.options.loose, O = V ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      L = L.replace(O, W(this.options.includePrerelease)), a("hyphen replace", L), L = L.replace(c[f.COMPARATORTRIM], l), a("comparator trim", L), L = L.replace(c[f.TILDETRIM], u), a("tilde trim", L), L = L.replace(c[f.CARETTRIM], p), a("caret trim", L);
      let b = L.split(" ").map(($) => w($, this.options)).join(" ").split(/\s+/).map(($) => H($, this.options));
      V && (b = b.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(c[f.COMPARATORLOOSE])))), a("range list", b);
      const P = /* @__PURE__ */ new Map(), S = b.map(($) => new s($, this.options));
      for (const $ of S) {
        if (m($))
          return [$];
        P.set($.value, $);
      }
      P.size > 1 && P.has("") && P.delete("");
      const d = [...P.values()];
      return n.set(j, d), d;
    }
    intersects(L, q) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((j) => y(j, q) && L.set.some((G) => y(G, q) && j.every((V) => G.every((O) => V.intersects(O, q)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new o(L, this.options);
        } catch {
          return !1;
        }
      for (let q = 0; q < this.set.length; q++)
        if (Q(this.set[q], L, this.options))
          return !0;
      return !1;
    }
  }
  Yc = t;
  const r = oR, n = new r(), i = Gu, s = Qo(), a = Xo, o = _t, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: p
  } = Js, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: v } = Yo, m = (k) => k.value === "<0.0.0-0", _ = (k) => k.value === "", y = (k, L) => {
    let q = !0;
    const j = k.slice();
    let G = j.pop();
    for (; q && j.length; )
      q = j.every((V) => G.intersects(V, L)), G = j.pop();
    return q;
  }, w = (k, L) => (k = k.replace(c[f.BUILD], ""), a("comp", k, L), k = X(k, L), a("caret", k), k = D(k, L), a("tildes", k), k = le(k, L), a("xrange", k), k = re(k, L), a("stars", k), k), T = (k) => !k || k.toLowerCase() === "x" || k === "*", D = (k, L) => k.trim().split(/\s+/).map((q) => x(q, L)).join(" "), x = (k, L) => {
    const q = L.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return k.replace(q, (j, G, V, O, b) => {
      a("tilde", k, j, G, V, O, b);
      let P;
      return T(G) ? P = "" : T(V) ? P = `>=${G}.0.0 <${+G + 1}.0.0-0` : T(O) ? P = `>=${G}.${V}.0 <${G}.${+V + 1}.0-0` : b ? (a("replaceTilde pr", b), P = `>=${G}.${V}.${O}-${b} <${G}.${+V + 1}.0-0`) : P = `>=${G}.${V}.${O} <${G}.${+V + 1}.0-0`, a("tilde return", P), P;
    });
  }, X = (k, L) => k.trim().split(/\s+/).map((q) => Y(q, L)).join(" "), Y = (k, L) => {
    a("caret", k, L);
    const q = L.loose ? c[f.CARETLOOSE] : c[f.CARET], j = L.includePrerelease ? "-0" : "";
    return k.replace(q, (G, V, O, b, P) => {
      a("caret", k, G, V, O, b, P);
      let S;
      return T(V) ? S = "" : T(O) ? S = `>=${V}.0.0${j} <${+V + 1}.0.0-0` : T(b) ? V === "0" ? S = `>=${V}.${O}.0${j} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.0${j} <${+V + 1}.0.0-0` : P ? (a("replaceCaret pr", P), V === "0" ? O === "0" ? S = `>=${V}.${O}.${b}-${P} <${V}.${O}.${+b + 1}-0` : S = `>=${V}.${O}.${b}-${P} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.${b}-${P} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? O === "0" ? S = `>=${V}.${O}.${b}${j} <${V}.${O}.${+b + 1}-0` : S = `>=${V}.${O}.${b}${j} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.${b} <${+V + 1}.0.0-0`), a("caret return", S), S;
    });
  }, le = (k, L) => (a("replaceXRanges", k, L), k.split(/\s+/).map((q) => I(q, L)).join(" ")), I = (k, L) => {
    k = k.trim();
    const q = L.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return k.replace(q, (j, G, V, O, b, P) => {
      a("xRange", k, j, G, V, O, b, P);
      const S = T(V), d = S || T(O), $ = d || T(b), N = $;
      return G === "=" && N && (G = ""), P = L.includePrerelease ? "-0" : "", S ? G === ">" || G === "<" ? j = "<0.0.0-0" : j = "*" : G && N ? (d && (O = 0), b = 0, G === ">" ? (G = ">=", d ? (V = +V + 1, O = 0, b = 0) : (O = +O + 1, b = 0)) : G === "<=" && (G = "<", d ? V = +V + 1 : O = +O + 1), G === "<" && (P = "-0"), j = `${G + V}.${O}.${b}${P}`) : d ? j = `>=${V}.0.0${P} <${+V + 1}.0.0-0` : $ && (j = `>=${V}.${O}.0${P} <${V}.${+O + 1}.0-0`), a("xRange return", j), j;
    });
  }, re = (k, L) => (a("replaceStars", k, L), k.trim().replace(c[f.STAR], "")), H = (k, L) => (a("replaceGTE0", k, L), k.trim().replace(c[L.includePrerelease ? f.GTE0PRE : f.GTE0], "")), W = (k) => (L, q, j, G, V, O, b, P, S, d, $, N) => (T(j) ? q = "" : T(G) ? q = `>=${j}.0.0${k ? "-0" : ""}` : T(V) ? q = `>=${j}.${G}.0${k ? "-0" : ""}` : O ? q = `>=${q}` : q = `>=${q}${k ? "-0" : ""}`, T(S) ? P = "" : T(d) ? P = `<${+S + 1}.0.0-0` : T($) ? P = `<${S}.${+d + 1}.0-0` : N ? P = `<=${S}.${d}.${$}-${N}` : k ? P = `<${S}.${d}.${+$ + 1}-0` : P = `<=${P}`, `${q} ${P}`.trim()), Q = (k, L, q) => {
    for (let j = 0; j < k.length; j++)
      if (!k[j].test(L))
        return !1;
    if (L.prerelease.length && !q.includePrerelease) {
      for (let j = 0; j < k.length; j++)
        if (a(k[j].semver), k[j].semver !== s.ANY && k[j].semver.prerelease.length > 0) {
          const G = k[j].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Yc;
}
var Xc, Pp;
function Qo() {
  if (Pp) return Xc;
  Pp = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], p = l.match(u);
      if (!p)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new o(p[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new o(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Xc = t;
  const r = Gu, { safeRe: n, t: i } = Js, s = W0, a = Xo, o = _t, c = tr();
  return Xc;
}
const cR = tr(), lR = (e, t, r) => {
  try {
    t = new cR(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Zo = lR;
const uR = tr(), fR = (e, t) => new uR(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var dR = fR;
const hR = _t, pR = tr(), mR = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new pR(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new hR(n, r));
  }), n;
};
var yR = mR;
const gR = _t, $R = tr(), vR = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new $R(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new gR(n, r));
  }), n;
};
var _R = vR;
const Jc = _t, ER = tr(), Tp = Jo, wR = (e, t) => {
  e = new ER(e, t);
  let r = new Jc("0.0.0");
  if (e.test(r) || (r = new Jc("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((a) => {
      const o = new Jc(a.semver.version);
      switch (a.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!s || Tp(o, s)) && (s = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), s && (!r || Tp(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var bR = wR;
const SR = tr(), PR = (e, t) => {
  try {
    return new SR(e, t).range || "*";
  } catch {
    return null;
  }
};
var TR = PR;
const RR = _t, Y0 = Qo(), { ANY: NR } = Y0, OR = tr(), AR = Zo, Rp = Jo, Np = zu, IR = Wu, CR = Ku, DR = (e, t, r, n) => {
  e = new RR(e, n), t = new OR(t, n);
  let i, s, a, o, c;
  switch (r) {
    case ">":
      i = Rp, s = IR, a = Np, o = ">", c = ">=";
      break;
    case "<":
      i = Np, s = CR, a = Rp, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (AR(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, p = null;
    if (l.forEach((h) => {
      h.semver === NR && (h = new Y0(">=0.0.0")), u = u || h, p = p || h, i(h.semver, u.semver, n) ? u = h : a(h.semver, p.semver, n) && (p = h);
    }), u.operator === o || u.operator === c || (!p.operator || p.operator === o) && s(e, p.semver))
      return !1;
    if (p.operator === c && a(e, p.semver))
      return !1;
  }
  return !0;
};
var Yu = DR;
const kR = Yu, LR = (e, t, r) => kR(e, t, ">", r);
var FR = LR;
const jR = Yu, UR = (e, t, r) => jR(e, t, "<", r);
var MR = UR;
const Op = tr(), xR = (e, t, r) => (e = new Op(e, r), t = new Op(t, r), e.intersects(t, r));
var VR = xR;
const qR = Zo, BR = er;
var GR = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const a = e.sort((l, u) => BR(l, u, r));
  for (const l of a)
    qR(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const o = [];
  for (const [l, u] of n)
    l === u ? o.push(l) : !u && l === a[0] ? o.push("*") : u ? l === a[0] ? o.push(`<=${u}`) : o.push(`${l} - ${u}`) : o.push(`>=${l}`);
  const c = o.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const Ap = tr(), Xu = Qo(), { ANY: Qc } = Xu, Ji = Zo, Ju = er, HR = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Ap(e, r), t = new Ap(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const a = KR(i, s, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, zR = [new Xu(">=0.0.0-0")], Ip = [new Xu(">=0.0.0")], KR = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Qc) {
    if (t.length === 1 && t[0].semver === Qc)
      return !0;
    r.includePrerelease ? e = zR : e = Ip;
  }
  if (t.length === 1 && t[0].semver === Qc) {
    if (r.includePrerelease)
      return !0;
    t = Ip;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Cp(i, h, r) : h.operator === "<" || h.operator === "<=" ? s = Dp(s, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && s) {
    if (a = Ju(i.semver, s.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !Ji(h, String(i), r) || s && !Ji(h, String(s), r))
      return null;
    for (const v of t)
      if (!Ji(h, String(v), r))
        return !1;
    return !0;
  }
  let o, c, f, l, u = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, p = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && s.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (o = Cp(i, h, r), o === h && o !== i)
          return !1;
      } else if (i.operator === ">=" && !Ji(i.semver, String(h), r))
        return !1;
    }
    if (s) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Dp(s, h, r), c === h && c !== s)
          return !1;
      } else if (s.operator === "<=" && !Ji(s.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (s || i) && a !== 0)
      return !1;
  }
  return !(i && f && !s && a !== 0 || s && l && !i && a !== 0 || p || u);
}, Cp = (e, t, r) => {
  if (!e)
    return t;
  const n = Ju(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Dp = (e, t, r) => {
  if (!e)
    return t;
  const n = Ju(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var WR = HR;
const Zc = Js, kp = Yo, YR = _t, Lp = H0, XR = Di, JR = n1, QR = a1, ZR = c1, eN = u1, tN = h1, rN = y1, nN = v1, iN = w1, sN = er, aN = T1, oN = O1, cN = Hu, lN = D1, uN = F1, fN = Jo, dN = zu, hN = z0, pN = K0, mN = Ku, yN = Wu, gN = W0, $N = sR, vN = Qo(), _N = tr(), EN = Zo, wN = dR, bN = yR, SN = _R, PN = bR, TN = TR, RN = Yu, NN = FR, ON = MR, AN = VR, IN = GR, CN = WR;
var X0 = {
  parse: XR,
  valid: JR,
  clean: QR,
  inc: ZR,
  diff: eN,
  major: tN,
  minor: rN,
  patch: nN,
  prerelease: iN,
  compare: sN,
  rcompare: aN,
  compareLoose: oN,
  compareBuild: cN,
  sort: lN,
  rsort: uN,
  gt: fN,
  lt: dN,
  eq: hN,
  neq: pN,
  gte: mN,
  lte: yN,
  cmp: gN,
  coerce: $N,
  Comparator: vN,
  Range: _N,
  satisfies: EN,
  toComparators: wN,
  maxSatisfying: bN,
  minSatisfying: SN,
  minVersion: PN,
  validRange: TN,
  outside: RN,
  gtr: NN,
  ltr: ON,
  intersects: AN,
  simplifyRange: IN,
  subset: CN,
  SemVer: YR,
  re: Zc.re,
  src: Zc.src,
  tokens: Zc.t,
  SEMVER_SPEC_VERSION: kp.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: kp.RELEASE_TYPES,
  compareIdentifiers: Lp.compareIdentifiers,
  rcompareIdentifiers: Lp.rcompareIdentifiers
}, Qs = {}, To = { exports: {} };
To.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, s = 2, a = 9007199254740991, o = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", p = "[object Error]", h = "[object Function]", v = "[object GeneratorFunction]", m = "[object Map]", _ = "[object Number]", y = "[object Null]", w = "[object Object]", T = "[object Promise]", D = "[object Proxy]", x = "[object RegExp]", X = "[object Set]", Y = "[object String]", le = "[object Symbol]", I = "[object Undefined]", re = "[object WeakMap]", H = "[object ArrayBuffer]", W = "[object DataView]", Q = "[object Float32Array]", k = "[object Float64Array]", L = "[object Int8Array]", q = "[object Int16Array]", j = "[object Int32Array]", G = "[object Uint8Array]", V = "[object Uint8ClampedArray]", O = "[object Uint16Array]", b = "[object Uint32Array]", P = /[\\^$.*+?()[\]{}|]/g, S = /^\[object .+?Constructor\]$/, d = /^(?:0|[1-9]\d*)$/, $ = {};
  $[Q] = $[k] = $[L] = $[q] = $[j] = $[G] = $[V] = $[O] = $[b] = !0, $[o] = $[c] = $[H] = $[l] = $[W] = $[u] = $[p] = $[h] = $[m] = $[_] = $[w] = $[x] = $[X] = $[Y] = $[re] = !1;
  var N = typeof pt == "object" && pt && pt.Object === Object && pt, E = typeof self == "object" && self && self.Object === Object && self, g = N || E || Function("return this")(), M = t && !t.nodeType && t, A = M && !0 && e && !e.nodeType && e, C = A && A.exports === M, F = C && N.process, B = function() {
    try {
      return F && F.binding && F.binding("util");
    } catch {
    }
  }(), K = B && B.isTypedArray;
  function J(R, U) {
    for (var z = -1, te = R == null ? 0 : R.length, Pe = 0, he = []; ++z < te; ) {
      var Le = R[z];
      U(Le, z, R) && (he[Pe++] = Le);
    }
    return he;
  }
  function se(R, U) {
    for (var z = -1, te = U.length, Pe = R.length; ++z < te; )
      R[Pe + z] = U[z];
    return R;
  }
  function de(R, U) {
    for (var z = -1, te = R == null ? 0 : R.length; ++z < te; )
      if (U(R[z], z, R))
        return !0;
    return !1;
  }
  function _e(R, U) {
    for (var z = -1, te = Array(R); ++z < R; )
      te[z] = U(z);
    return te;
  }
  function ke(R) {
    return function(U) {
      return R(U);
    };
  }
  function Oe(R, U) {
    return R.has(U);
  }
  function Ee(R, U) {
    return R == null ? void 0 : R[U];
  }
  function lt(R) {
    var U = -1, z = Array(R.size);
    return R.forEach(function(te, Pe) {
      z[++U] = [Pe, te];
    }), z;
  }
  function Be(R, U) {
    return function(z) {
      return R(U(z));
    };
  }
  function yr(R) {
    var U = -1, z = Array(R.size);
    return R.forEach(function(te) {
      z[++U] = te;
    }), z;
  }
  var gr = Array.prototype, Ot = Function.prototype, kt = Object.prototype, $r = g["__core-js_shared__"], kr = Ot.toString, wt = kt.hasOwnProperty, ih = function() {
    var R = /[^.]+$/.exec($r && $r.keys && $r.keys.IE_PROTO || "");
    return R ? "Symbol(src)_1." + R : "";
  }(), sh = kt.toString, c_ = RegExp(
    "^" + kr.call(wt).replace(P, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ah = C ? g.Buffer : void 0, ca = g.Symbol, oh = g.Uint8Array, ch = kt.propertyIsEnumerable, l_ = gr.splice, mn = ca ? ca.toStringTag : void 0, lh = Object.getOwnPropertySymbols, u_ = ah ? ah.isBuffer : void 0, f_ = Be(Object.keys, Object), Oc = Wn(g, "DataView"), zi = Wn(g, "Map"), Ac = Wn(g, "Promise"), Ic = Wn(g, "Set"), Cc = Wn(g, "WeakMap"), Ki = Wn(Object, "create"), d_ = $n(Oc), h_ = $n(zi), p_ = $n(Ac), m_ = $n(Ic), y_ = $n(Cc), uh = ca ? ca.prototype : void 0, Dc = uh ? uh.valueOf : void 0;
  function yn(R) {
    var U = -1, z = R == null ? 0 : R.length;
    for (this.clear(); ++U < z; ) {
      var te = R[U];
      this.set(te[0], te[1]);
    }
  }
  function g_() {
    this.__data__ = Ki ? Ki(null) : {}, this.size = 0;
  }
  function $_(R) {
    var U = this.has(R) && delete this.__data__[R];
    return this.size -= U ? 1 : 0, U;
  }
  function v_(R) {
    var U = this.__data__;
    if (Ki) {
      var z = U[R];
      return z === n ? void 0 : z;
    }
    return wt.call(U, R) ? U[R] : void 0;
  }
  function __(R) {
    var U = this.__data__;
    return Ki ? U[R] !== void 0 : wt.call(U, R);
  }
  function E_(R, U) {
    var z = this.__data__;
    return this.size += this.has(R) ? 0 : 1, z[R] = Ki && U === void 0 ? n : U, this;
  }
  yn.prototype.clear = g_, yn.prototype.delete = $_, yn.prototype.get = v_, yn.prototype.has = __, yn.prototype.set = E_;
  function vr(R) {
    var U = -1, z = R == null ? 0 : R.length;
    for (this.clear(); ++U < z; ) {
      var te = R[U];
      this.set(te[0], te[1]);
    }
  }
  function w_() {
    this.__data__ = [], this.size = 0;
  }
  function b_(R) {
    var U = this.__data__, z = ua(U, R);
    if (z < 0)
      return !1;
    var te = U.length - 1;
    return z == te ? U.pop() : l_.call(U, z, 1), --this.size, !0;
  }
  function S_(R) {
    var U = this.__data__, z = ua(U, R);
    return z < 0 ? void 0 : U[z][1];
  }
  function P_(R) {
    return ua(this.__data__, R) > -1;
  }
  function T_(R, U) {
    var z = this.__data__, te = ua(z, R);
    return te < 0 ? (++this.size, z.push([R, U])) : z[te][1] = U, this;
  }
  vr.prototype.clear = w_, vr.prototype.delete = b_, vr.prototype.get = S_, vr.prototype.has = P_, vr.prototype.set = T_;
  function gn(R) {
    var U = -1, z = R == null ? 0 : R.length;
    for (this.clear(); ++U < z; ) {
      var te = R[U];
      this.set(te[0], te[1]);
    }
  }
  function R_() {
    this.size = 0, this.__data__ = {
      hash: new yn(),
      map: new (zi || vr)(),
      string: new yn()
    };
  }
  function N_(R) {
    var U = fa(this, R).delete(R);
    return this.size -= U ? 1 : 0, U;
  }
  function O_(R) {
    return fa(this, R).get(R);
  }
  function A_(R) {
    return fa(this, R).has(R);
  }
  function I_(R, U) {
    var z = fa(this, R), te = z.size;
    return z.set(R, U), this.size += z.size == te ? 0 : 1, this;
  }
  gn.prototype.clear = R_, gn.prototype.delete = N_, gn.prototype.get = O_, gn.prototype.has = A_, gn.prototype.set = I_;
  function la(R) {
    var U = -1, z = R == null ? 0 : R.length;
    for (this.__data__ = new gn(); ++U < z; )
      this.add(R[U]);
  }
  function C_(R) {
    return this.__data__.set(R, n), this;
  }
  function D_(R) {
    return this.__data__.has(R);
  }
  la.prototype.add = la.prototype.push = C_, la.prototype.has = D_;
  function Lr(R) {
    var U = this.__data__ = new vr(R);
    this.size = U.size;
  }
  function k_() {
    this.__data__ = new vr(), this.size = 0;
  }
  function L_(R) {
    var U = this.__data__, z = U.delete(R);
    return this.size = U.size, z;
  }
  function F_(R) {
    return this.__data__.get(R);
  }
  function j_(R) {
    return this.__data__.has(R);
  }
  function U_(R, U) {
    var z = this.__data__;
    if (z instanceof vr) {
      var te = z.__data__;
      if (!zi || te.length < r - 1)
        return te.push([R, U]), this.size = ++z.size, this;
      z = this.__data__ = new gn(te);
    }
    return z.set(R, U), this.size = z.size, this;
  }
  Lr.prototype.clear = k_, Lr.prototype.delete = L_, Lr.prototype.get = F_, Lr.prototype.has = j_, Lr.prototype.set = U_;
  function M_(R, U) {
    var z = da(R), te = !z && eE(R), Pe = !z && !te && kc(R), he = !z && !te && !Pe && vh(R), Le = z || te || Pe || he, Ge = Le ? _e(R.length, String) : [], Ke = Ge.length;
    for (var Ae in R)
      wt.call(R, Ae) && !(Le && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Ae == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Pe && (Ae == "offset" || Ae == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      he && (Ae == "buffer" || Ae == "byteLength" || Ae == "byteOffset") || // Skip index properties.
      Y_(Ae, Ke))) && Ge.push(Ae);
    return Ge;
  }
  function ua(R, U) {
    for (var z = R.length; z--; )
      if (mh(R[z][0], U))
        return z;
    return -1;
  }
  function x_(R, U, z) {
    var te = U(R);
    return da(R) ? te : se(te, z(R));
  }
  function Wi(R) {
    return R == null ? R === void 0 ? I : y : mn && mn in Object(R) ? K_(R) : Z_(R);
  }
  function fh(R) {
    return Yi(R) && Wi(R) == o;
  }
  function dh(R, U, z, te, Pe) {
    return R === U ? !0 : R == null || U == null || !Yi(R) && !Yi(U) ? R !== R && U !== U : V_(R, U, z, te, dh, Pe);
  }
  function V_(R, U, z, te, Pe, he) {
    var Le = da(R), Ge = da(U), Ke = Le ? c : Fr(R), Ae = Ge ? c : Fr(U);
    Ke = Ke == o ? w : Ke, Ae = Ae == o ? w : Ae;
    var At = Ke == w, xt = Ae == w, et = Ke == Ae;
    if (et && kc(R)) {
      if (!kc(U))
        return !1;
      Le = !0, At = !1;
    }
    if (et && !At)
      return he || (he = new Lr()), Le || vh(R) ? hh(R, U, z, te, Pe, he) : H_(R, U, Ke, z, te, Pe, he);
    if (!(z & i)) {
      var Lt = At && wt.call(R, "__wrapped__"), Ft = xt && wt.call(U, "__wrapped__");
      if (Lt || Ft) {
        var jr = Lt ? R.value() : R, _r = Ft ? U.value() : U;
        return he || (he = new Lr()), Pe(jr, _r, z, te, he);
      }
    }
    return et ? (he || (he = new Lr()), z_(R, U, z, te, Pe, he)) : !1;
  }
  function q_(R) {
    if (!$h(R) || J_(R))
      return !1;
    var U = yh(R) ? c_ : S;
    return U.test($n(R));
  }
  function B_(R) {
    return Yi(R) && gh(R.length) && !!$[Wi(R)];
  }
  function G_(R) {
    if (!Q_(R))
      return f_(R);
    var U = [];
    for (var z in Object(R))
      wt.call(R, z) && z != "constructor" && U.push(z);
    return U;
  }
  function hh(R, U, z, te, Pe, he) {
    var Le = z & i, Ge = R.length, Ke = U.length;
    if (Ge != Ke && !(Le && Ke > Ge))
      return !1;
    var Ae = he.get(R);
    if (Ae && he.get(U))
      return Ae == U;
    var At = -1, xt = !0, et = z & s ? new la() : void 0;
    for (he.set(R, U), he.set(U, R); ++At < Ge; ) {
      var Lt = R[At], Ft = U[At];
      if (te)
        var jr = Le ? te(Ft, Lt, At, U, R, he) : te(Lt, Ft, At, R, U, he);
      if (jr !== void 0) {
        if (jr)
          continue;
        xt = !1;
        break;
      }
      if (et) {
        if (!de(U, function(_r, vn) {
          if (!Oe(et, vn) && (Lt === _r || Pe(Lt, _r, z, te, he)))
            return et.push(vn);
        })) {
          xt = !1;
          break;
        }
      } else if (!(Lt === Ft || Pe(Lt, Ft, z, te, he))) {
        xt = !1;
        break;
      }
    }
    return he.delete(R), he.delete(U), xt;
  }
  function H_(R, U, z, te, Pe, he, Le) {
    switch (z) {
      case W:
        if (R.byteLength != U.byteLength || R.byteOffset != U.byteOffset)
          return !1;
        R = R.buffer, U = U.buffer;
      case H:
        return !(R.byteLength != U.byteLength || !he(new oh(R), new oh(U)));
      case l:
      case u:
      case _:
        return mh(+R, +U);
      case p:
        return R.name == U.name && R.message == U.message;
      case x:
      case Y:
        return R == U + "";
      case m:
        var Ge = lt;
      case X:
        var Ke = te & i;
        if (Ge || (Ge = yr), R.size != U.size && !Ke)
          return !1;
        var Ae = Le.get(R);
        if (Ae)
          return Ae == U;
        te |= s, Le.set(R, U);
        var At = hh(Ge(R), Ge(U), te, Pe, he, Le);
        return Le.delete(R), At;
      case le:
        if (Dc)
          return Dc.call(R) == Dc.call(U);
    }
    return !1;
  }
  function z_(R, U, z, te, Pe, he) {
    var Le = z & i, Ge = ph(R), Ke = Ge.length, Ae = ph(U), At = Ae.length;
    if (Ke != At && !Le)
      return !1;
    for (var xt = Ke; xt--; ) {
      var et = Ge[xt];
      if (!(Le ? et in U : wt.call(U, et)))
        return !1;
    }
    var Lt = he.get(R);
    if (Lt && he.get(U))
      return Lt == U;
    var Ft = !0;
    he.set(R, U), he.set(U, R);
    for (var jr = Le; ++xt < Ke; ) {
      et = Ge[xt];
      var _r = R[et], vn = U[et];
      if (te)
        var _h = Le ? te(vn, _r, et, U, R, he) : te(_r, vn, et, R, U, he);
      if (!(_h === void 0 ? _r === vn || Pe(_r, vn, z, te, he) : _h)) {
        Ft = !1;
        break;
      }
      jr || (jr = et == "constructor");
    }
    if (Ft && !jr) {
      var ha = R.constructor, pa = U.constructor;
      ha != pa && "constructor" in R && "constructor" in U && !(typeof ha == "function" && ha instanceof ha && typeof pa == "function" && pa instanceof pa) && (Ft = !1);
    }
    return he.delete(R), he.delete(U), Ft;
  }
  function ph(R) {
    return x_(R, nE, W_);
  }
  function fa(R, U) {
    var z = R.__data__;
    return X_(U) ? z[typeof U == "string" ? "string" : "hash"] : z.map;
  }
  function Wn(R, U) {
    var z = Ee(R, U);
    return q_(z) ? z : void 0;
  }
  function K_(R) {
    var U = wt.call(R, mn), z = R[mn];
    try {
      R[mn] = void 0;
      var te = !0;
    } catch {
    }
    var Pe = sh.call(R);
    return te && (U ? R[mn] = z : delete R[mn]), Pe;
  }
  var W_ = lh ? function(R) {
    return R == null ? [] : (R = Object(R), J(lh(R), function(U) {
      return ch.call(R, U);
    }));
  } : iE, Fr = Wi;
  (Oc && Fr(new Oc(new ArrayBuffer(1))) != W || zi && Fr(new zi()) != m || Ac && Fr(Ac.resolve()) != T || Ic && Fr(new Ic()) != X || Cc && Fr(new Cc()) != re) && (Fr = function(R) {
    var U = Wi(R), z = U == w ? R.constructor : void 0, te = z ? $n(z) : "";
    if (te)
      switch (te) {
        case d_:
          return W;
        case h_:
          return m;
        case p_:
          return T;
        case m_:
          return X;
        case y_:
          return re;
      }
    return U;
  });
  function Y_(R, U) {
    return U = U ?? a, !!U && (typeof R == "number" || d.test(R)) && R > -1 && R % 1 == 0 && R < U;
  }
  function X_(R) {
    var U = typeof R;
    return U == "string" || U == "number" || U == "symbol" || U == "boolean" ? R !== "__proto__" : R === null;
  }
  function J_(R) {
    return !!ih && ih in R;
  }
  function Q_(R) {
    var U = R && R.constructor, z = typeof U == "function" && U.prototype || kt;
    return R === z;
  }
  function Z_(R) {
    return sh.call(R);
  }
  function $n(R) {
    if (R != null) {
      try {
        return kr.call(R);
      } catch {
      }
      try {
        return R + "";
      } catch {
      }
    }
    return "";
  }
  function mh(R, U) {
    return R === U || R !== R && U !== U;
  }
  var eE = fh(/* @__PURE__ */ function() {
    return arguments;
  }()) ? fh : function(R) {
    return Yi(R) && wt.call(R, "callee") && !ch.call(R, "callee");
  }, da = Array.isArray;
  function tE(R) {
    return R != null && gh(R.length) && !yh(R);
  }
  var kc = u_ || sE;
  function rE(R, U) {
    return dh(R, U);
  }
  function yh(R) {
    if (!$h(R))
      return !1;
    var U = Wi(R);
    return U == h || U == v || U == f || U == D;
  }
  function gh(R) {
    return typeof R == "number" && R > -1 && R % 1 == 0 && R <= a;
  }
  function $h(R) {
    var U = typeof R;
    return R != null && (U == "object" || U == "function");
  }
  function Yi(R) {
    return R != null && typeof R == "object";
  }
  var vh = K ? ke(K) : B_;
  function nE(R) {
    return tE(R) ? M_(R) : G_(R);
  }
  function iE() {
    return [];
  }
  function sE() {
    return !1;
  }
  e.exports = rE;
})(To, To.exports);
var DN = To.exports;
Object.defineProperty(Qs, "__esModule", { value: !0 });
Qs.DownloadedUpdateHelper = void 0;
Qs.createTempUpdateFile = UN;
const kN = Gs, LN = fn, Fp = DN, Pn = hn, hs = De;
class FN {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return hs.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Fp(this.versionInfo, r) && Fp(this.fileInfo.info, n.info) && await (0, Pn.pathExists)(t) ? t : null;
    const s = await this.getValidCachedUpdateFile(n, i);
    return s === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = s, s);
  }
  async setDownloadedFile(t, r, n, i, s, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: s,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, Pn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Pn.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Pn.pathExists)(n))
      return null;
    let s;
    try {
      s = await (0, Pn.readJson)(n);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), r.info(l), null;
    }
    if (!((s == null ? void 0 : s.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== s.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const o = hs.join(this.cacheDirForPendingUpdate, s.fileName);
    if (!await (0, Pn.pathExists)(o))
      return r.info("Cached update file doesn't exist"), null;
    const c = await jN(o);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = s, o);
  }
  getUpdateInfoFile() {
    return hs.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Qs.DownloadedUpdateHelper = FN;
function jN(e, t = "sha512", r = "base64", n) {
  return new Promise((i, s) => {
    const a = (0, kN.createHash)(t);
    a.on("error", s).setEncoding(r), (0, LN.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", s).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function UN(e, t, r) {
  let n = 0, i = hs.join(t, e);
  for (let s = 0; s < 3; s++)
    try {
      return await (0, Pn.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = hs.join(t, `${n++}-${e}`);
    }
  return i;
}
var ec = {}, Qu = {};
Object.defineProperty(Qu, "__esModule", { value: !0 });
Qu.getAppCacheDir = xN;
const el = De, MN = xo;
function xN() {
  const e = (0, MN.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || el.join(e, "AppData", "Local") : process.platform === "darwin" ? t = el.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || el.join(e, ".cache"), t;
}
Object.defineProperty(ec, "__esModule", { value: !0 });
ec.ElectronAppAdapter = void 0;
const jp = De, VN = Qu;
class qN {
  constructor(t = Or.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? jp.join(process.resourcesPath, "app-update.yml") : jp.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, VN.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
ec.ElectronAppAdapter = qN;
var J0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = qe;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Or.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(s) {
      super(), this.proxyLoginCallback = s, this.cachedSession = null;
    }
    async download(s, a, o) {
      return await o.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: o.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(s, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: a,
          options: o,
          onCancel: l,
          callback: (p) => {
            p == null ? c(a) : f(p);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(s, a) {
      s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const o = Or.net.request({
        ...s,
        session: this.cachedSession
      });
      return o.on("response", a), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
    }
    addRedirectHandlers(s, a, o, c, f) {
      s.on("redirect", (l, u, p) => {
        s.abort(), c > this.maxRedirects ? o(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(p, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(J0);
var Zs = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.newBaseUrl = BN;
rr.newUrlFromBase = GN;
rr.getChannelFilename = HN;
const Q0 = dn;
function BN(e) {
  const t = new Q0.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function GN(e, t, r = !1) {
  const n = new Q0.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function HN(e) {
  return `${e}.yml`;
}
var Me = {}, zN = "[object Symbol]", Z0 = /[\\^$.*+?()[\]{}|]/g, KN = RegExp(Z0.source), WN = typeof pt == "object" && pt && pt.Object === Object && pt, YN = typeof self == "object" && self && self.Object === Object && self, XN = WN || YN || Function("return this")(), JN = Object.prototype, QN = JN.toString, Up = XN.Symbol, Mp = Up ? Up.prototype : void 0, xp = Mp ? Mp.toString : void 0;
function ZN(e) {
  if (typeof e == "string")
    return e;
  if (tO(e))
    return xp ? xp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function eO(e) {
  return !!e && typeof e == "object";
}
function tO(e) {
  return typeof e == "symbol" || eO(e) && QN.call(e) == zN;
}
function rO(e) {
  return e == null ? "" : ZN(e);
}
function nO(e) {
  return e = rO(e), e && KN.test(e) ? e.replace(Z0, "\\$&") : e;
}
var e$ = nO;
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.Provider = void 0;
Me.findFile = cO;
Me.parseUpdateInfo = lO;
Me.getFileList = t$;
Me.resolveFiles = uO;
const ln = qe, iO = Ze, sO = dn, Ro = rr, aO = e$;
class oO {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const s = (0, Ro.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Ro.newUrlFromBase)(`${t.pathname.replace(new RegExp(aO(n), "g"), r)}.blockmap`, i ? new sO.URL(i) : t), s];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, ln.configureRequestUrl)(t, n), n;
  }
}
Me.Provider = oO;
function cO(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, ln.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((a) => a.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), s = (n = i.find((a) => [a.url.pathname, a.info.url].some((o) => o.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return s || (r == null ? e[0] : e.find((a) => !r.some((o) => a.url.pathname.toLowerCase().endsWith(`.${o.toLowerCase()}`))));
}
function lO(e, t, r) {
  if (e == null)
    throw (0, ln.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, iO.load)(e);
  } catch (i) {
    throw (0, ln.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function t$(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, ln.newError)(`No files provided: ${(0, ln.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function uO(e, t, r = (n) => n) {
  const i = t$(e).map((o) => {
    if (o.sha2 == null && o.sha512 == null)
      throw (0, ln.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ln.safeStringifyJson)(o)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Ro.newUrlFromBase)(r(o.url), t),
      info: o
    };
  }), s = e.packages, a = s == null ? null : s[process.arch] || s.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Ro.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(Zs, "__esModule", { value: !0 });
Zs.GenericProvider = void 0;
const Vp = qe, tl = rr, rl = Me;
class fO extends rl.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, tl.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, tl.getChannelFilename)(this.channel), r = (0, tl.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, rl.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Vp.HttpError && i.statusCode === 404)
          throw (0, Vp.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((s, a) => {
            try {
              setTimeout(s, 1e3 * n);
            } catch (o) {
              a(o);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, rl.resolveFiles)(t, this.baseUrl);
  }
}
Zs.GenericProvider = fO;
var tc = {}, rc = {};
Object.defineProperty(rc, "__esModule", { value: !0 });
rc.BitbucketProvider = void 0;
const qp = qe, nl = rr, il = Me;
class dO extends il.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: s } = t;
    this.baseUrl = (0, nl.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${s}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new qp.CancellationToken(), r = (0, nl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, nl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, il.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, qp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, il.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
rc.BitbucketProvider = dO;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
un.GitHubProvider = un.BaseGitHubProvider = void 0;
un.computeReleaseNotes = n$;
const Tr = qe, fi = X0, hO = dn, di = rr, Ql = Me, sl = /\/tag\/([^/]+)$/;
class r$ extends Ql.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, di.newBaseUrl)((0, Tr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, di.newBaseUrl)((0, Tr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
un.BaseGitHubProvider = r$;
class pO extends r$ {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, s;
    const a = new Tr.CancellationToken(), o = await this.httpRequest((0, di.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), c = (0, Tr.parseXml)(o);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = fi.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          l = sl.exec(f.element("link").attribute("href"))[1];
        else
          for (const y of c.getElements("entry")) {
            const w = sl.exec(y.element("link").attribute("href"));
            if (w === null)
              continue;
            const T = w[1], D = ((n = fi.prerelease(T)) === null || n === void 0 ? void 0 : n[0]) || null, x = !_ || ["alpha", "beta"].includes(_), X = D !== null && !["alpha", "beta"].includes(String(D));
            if (x && !X && !(_ === "beta" && D === "alpha")) {
              l = T;
              break;
            }
            if (D && D === _) {
              l = T;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(a);
        for (const _ of c.getElements("entry"))
          if (sl.exec(_.element("link").attribute("href"))[1] === l) {
            f = _;
            break;
          }
      }
    } catch (_) {
      throw (0, Tr.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${o}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Tr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, p = "", h = "";
    const v = async (_) => {
      p = (0, di.getChannelFilename)(_), h = (0, di.newUrlFromBase)(this.getBaseDownloadPath(String(l), p), this.baseUrl);
      const y = this.createRequestOptions(h);
      try {
        return await this.executor.request(y, a);
      } catch (w) {
        throw w instanceof Tr.HttpError && w.statusCode === 404 ? (0, Tr.newError)(`Cannot find ${p} in the latest release artifacts (${h}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = fi.prerelease(l)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((s = fi.prerelease(l)) === null || s === void 0 ? void 0 : s[0]))), u = await v(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        u = await v(this.getDefaultChannelName());
      else
        throw _;
    }
    const m = (0, Ql.parseUpdateInfo)(u, p, h);
    return m.releaseName == null && (m.releaseName = f.elementValueOrEmpty("title")), m.releaseNotes == null && (m.releaseNotes = n$(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ...m
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, di.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new hO.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Tr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Ql.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
un.GitHubProvider = pO;
function Bp(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function n$(e, t, r, n) {
  if (!t)
    return Bp(n);
  const i = [];
  for (const s of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
    fi.lt(e, a) && i.push({
      version: a,
      note: Bp(s)
    });
  }
  return i.sort((s, a) => fi.rcompare(s.version, a.version));
}
var nc = {};
Object.defineProperty(nc, "__esModule", { value: !0 });
nc.GitLabProvider = void 0;
const ut = qe, al = dn, mO = e$, Ra = rr, ol = Me;
class yO extends ol.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, r, n) {
    super({
      ...n,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = r, this.cachedLatestVersion = null;
    const s = t.host || "gitlab.com";
    this.baseApiUrl = (0, Ra.newBaseUrl)(`https://${s}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new ut.CancellationToken(), r = (0, Ra.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const p = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, h = await this.httpRequest(r, p, t);
      if (!h)
        throw (0, ut.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(h);
    } catch (p) {
      throw (0, ut.newError)(`Unable to find latest release on GitLab (${r}): ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let s = null, a = "", o = null;
    const c = async (p) => {
      a = (0, Ra.getChannelFilename)(p);
      const h = n.assets.links.find((m) => m.name === a);
      if (!h)
        throw (0, ut.newError)(`Cannot find ${a} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      o = new al.URL(h.direct_asset_url);
      const v = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const m = await this.httpRequest(o, v, t);
        if (!m)
          throw (0, ut.newError)(`Empty response from ${o}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return m;
      } catch (m) {
        throw m instanceof ut.HttpError && m.statusCode === 404 ? (0, ut.newError)(`Cannot find ${a} in the latest release artifacts (${o}): ${m.stack || m.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : m;
      }
    };
    try {
      s = await c(this.channel);
    } catch (p) {
      if (this.channel !== this.getDefaultChannelName())
        s = await c(this.getDefaultChannelName());
      else
        throw p;
    }
    if (!s)
      throw (0, ut.newError)(`Unable to parse channel data from ${a}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, ol.parseUpdateInfo)(s, a, o);
    f.releaseName == null && (f.releaseName = n.name), f.releaseNotes == null && (f.releaseNotes = n.description || null);
    const l = /* @__PURE__ */ new Map();
    for (const p of n.assets.links)
      l.set(this.normalizeFilename(p.name), p.direct_asset_url);
    const u = {
      tag: i,
      assets: l,
      ...f
    };
    return this.cachedLatestVersion = u, u;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of t.links)
      r.set(this.normalizeFilename(n.name), n.direct_asset_url);
    return r;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, r) {
    const n = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
    for (const i of n) {
      const s = t.get(i);
      if (s)
        return new al.URL(s);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new ut.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const s = (0, Ra.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const a = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, o = await this.httpRequest(s, a, r);
        if (o)
          return JSON.parse(o);
      } catch (a) {
        if (a instanceof ut.HttpError && a.statusCode === 404)
          continue;
        throw (0, ut.newError)(`Unable to find release ${i} on GitLab (${s}): ${a.stack || a.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, ut.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const r = {};
    return t != null && (t.startsWith("Bearer") ? r.authorization = t : r["PRIVATE-TOKEN"] = t), r;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const r = await this.fetchReleaseInfoByVersion(t);
    return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, r, n) {
    let i = null, s = null;
    const a = await this.getVersionInfoForBlockMap(r);
    a && (i = this.findBlockMapInAssets(a, n));
    const o = await this.getVersionInfoForBlockMap(t);
    if (o) {
      const c = n.replace(new RegExp(mO(r), "g"), t);
      s = this.findBlockMapInAssets(o, c);
    }
    return [s, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const s = t.pathname.split("/").pop() || "", [a, o] = await this.findBlockMapUrlsFromAssets(r, n, s);
      if (!o)
        throw (0, ut.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!a)
        throw (0, ut.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [a, o];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, ol.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((a) => t.assets.has(a)), s = i ? t.assets.get(i) : void 0;
      if (!s)
        throw (0, ut.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new al.URL(s),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
nc.GitLabProvider = yO;
var ic = {};
Object.defineProperty(ic, "__esModule", { value: !0 });
ic.KeygenProvider = void 0;
const Gp = qe, cl = rr, ll = Me;
class gO extends ll.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, cl.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Gp.CancellationToken(), r = (0, cl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, cl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, ll.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Gp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ll.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
ic.KeygenProvider = gO;
var sc = {};
Object.defineProperty(sc, "__esModule", { value: !0 });
sc.PrivateGitHubProvider = void 0;
const Qn = qe, $O = Ze, vO = De, Hp = dn, zp = rr, _O = un, EO = Me;
class wO extends _O.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Qn.CancellationToken(), r = (0, zp.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((o) => o.name === r);
    if (i == null)
      throw (0, Qn.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const s = new Hp.URL(i.url);
    let a;
    try {
      a = (0, $O.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
    } catch (o) {
      throw o instanceof Qn.HttpError && o.statusCode === 404 ? (0, Qn.newError)(`Cannot find ${r} in the latest release artifacts (${s}): ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : o;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, zp.newUrlFromBase)(n, this.baseUrl);
    try {
      const s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? s.find((a) => a.prerelease) || s[0] : s;
    } catch (s) {
      throw (0, Qn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, EO.getFileList)(t).map((r) => {
      const n = vO.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((s) => s != null && s.name === n);
      if (i == null)
        throw (0, Qn.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Hp.URL(i.url),
        info: r
      };
    });
  }
}
sc.PrivateGitHubProvider = wO;
Object.defineProperty(tc, "__esModule", { value: !0 });
tc.isUrlProbablySupportMultiRangeRequests = i$;
tc.createClient = NO;
const Na = qe, bO = rc, Kp = Zs, SO = un, PO = nc, TO = ic, RO = sc;
function i$(e) {
  return !e.includes("s3.amazonaws.com");
}
function NO(e, t, r) {
  if (typeof e == "string")
    throw (0, Na.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return s == null ? new SO.GitHubProvider(i, t, r) : new RO.PrivateGitHubProvider(i, t, s, r);
    }
    case "bitbucket":
      return new bO.BitbucketProvider(e, t, r);
    case "gitlab":
      return new PO.GitLabProvider(e, t, r);
    case "keygen":
      return new TO.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Kp.GenericProvider({
        provider: "generic",
        url: (0, Na.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Kp.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && i$(i.url)
      });
    }
    case "custom": {
      const i = e, s = i.updateProvider;
      if (!s)
        throw (0, Na.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new s(i, t, r);
    }
    default:
      throw (0, Na.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ac = {}, ea = {}, ki = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.OperationKind = void 0;
Kn.computeOperations = OO;
var kn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(kn || (Kn.OperationKind = kn = {}));
function OO(e, t, r) {
  const n = Yp(e.files), i = Yp(t.files);
  let s = null;
  const a = t.files[0], o = [], c = a.name, f = n.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: p, checksumToOldSize: h } = IO(n.get(c), f.offset, r);
  let v = a.offset;
  for (let m = 0; m < l.checksums.length; v += l.sizes[m], m++) {
    const _ = l.sizes[m], y = l.checksums[m];
    let w = p.get(y);
    w != null && h.get(y) !== _ && (r.warn(`Checksum ("${y}") matches, but size differs (old: ${h.get(y)}, new: ${_})`), w = void 0), w === void 0 ? (u++, s != null && s.kind === kn.DOWNLOAD && s.end === v ? s.end += _ : (s = {
      kind: kn.DOWNLOAD,
      start: v,
      end: v + _
      // oldBlocks: null,
    }, Wp(s, o, y, m))) : s != null && s.kind === kn.COPY && s.end === w ? s.end += _ : (s = {
      kind: kn.COPY,
      start: w,
      end: w + _
      // oldBlocks: [checksum]
    }, Wp(s, o, y, m));
  }
  return u > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${u} changed blocks`), o;
}
const AO = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Wp(e, t, r, n) {
  if (AO && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const s = [i.start, i.end, e.start, e.end].reduce((a, o) => a < o ? a : o);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${kn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - s} until ${i.end - s} and ${e.start - s} until ${e.end - s}`);
    }
  }
  t.push(e);
}
function IO(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let s = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const o = e.checksums[a], c = e.sizes[a], f = i.get(o);
    if (f === void 0)
      n.set(o, s), i.set(o, c);
    else if (r.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      r.debug(`${o} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    s += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Yp(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(ki, "__esModule", { value: !0 });
ki.DataSplitter = void 0;
ki.copyData = s$;
const Oa = qe, CO = fn, DO = Bs, kO = Kn, Xp = Buffer.from(`\r
\r
`);
var Yr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Yr || (Yr = {}));
function s$(e, t, r, n, i) {
  const s = (0, CO.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  s.on("error", n), s.once("end", i), s.pipe(t, {
    end: !1
  });
}
class LO extends DO.Writable {
  constructor(t, r, n, i, s, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = s, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = Yr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Oa.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Yr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Yr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Yr.BODY)
          this.readState = Yr.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Oa.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const o = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (o < a)
            await this.copyExistingData(o, a);
          else if (o > a)
            throw (0, Oa.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Yr.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, s = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, s), this.remainingPartDataCount = n - (s - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const s = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== kO.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        s$(a, this.out, this.options.oldFileFd, i, () => {
          t++, s();
        });
      };
      s();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(Xp, r);
    if (n !== -1)
      return n + Xp.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Oa.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((s, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), s();
      });
    });
  }
}
ki.DataSplitter = LO;
var oc = {};
Object.defineProperty(oc, "__esModule", { value: !0 });
oc.executeTasksUsingMultipleRangeRequests = FO;
oc.checkIsRangesSupported = eu;
const Zl = qe, Jp = ki, Qp = Kn;
function FO(e, t, r, n, i) {
  const s = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const o = a + 1e3;
    jO(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, o),
      oldFileFd: n
    }, r, () => s(o), i);
  };
  return s;
}
function jO(e, t, r, n, i) {
  let s = "bytes=", a = 0;
  const o = /* @__PURE__ */ new Map(), c = [];
  for (let u = t.start; u < t.end; u++) {
    const p = t.tasks[u];
    p.kind === Qp.OperationKind.DOWNLOAD && (s += `${p.start}-${p.end - 1}, `, o.set(a, u), a++, c.push(p.end - p.start));
  }
  if (a <= 1) {
    const u = (p) => {
      if (p >= t.end) {
        n();
        return;
      }
      const h = t.tasks[p++];
      if (h.kind === Qp.OperationKind.COPY)
        (0, Jp.copyData)(h, r, t.oldFileFd, i, () => u(p));
      else {
        const v = e.createRequestOptions();
        v.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const m = e.httpExecutor.createRequest(v, (_) => {
          _.on("error", i), eu(_, i) && (_.pipe(r, {
            end: !1
          }), _.once("end", () => u(p)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
      }
    };
    u(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = s.substring(0, s.length - 2);
  const l = e.httpExecutor.createRequest(f, (u) => {
    if (!eu(u, i))
      return;
    const p = (0, Zl.safeGetHeader)(u, "content-type"), h = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(p);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${p}"`));
      return;
    }
    const v = new Jp.DataSplitter(r, t, o, h[1] || h[2], c, n);
    v.on("error", i), u.pipe(v), u.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function eu(e, t) {
  if (e.statusCode >= 400)
    return t((0, Zl.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Zl.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var cc = {};
Object.defineProperty(cc, "__esModule", { value: !0 });
cc.ProgressDifferentialDownloadCallbackTransform = void 0;
const UO = Bs;
var hi;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(hi || (hi = {}));
class MO extends UO.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = hi.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == hi.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = hi.COPY;
  }
  beginRangeDownload() {
    this.operationType = hi.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
cc.ProgressDifferentialDownloadCallbackTransform = MO;
Object.defineProperty(ea, "__esModule", { value: !0 });
ea.DifferentialDownloader = void 0;
const Qi = qe, ul = hn, xO = fn, VO = ki, qO = dn, Aa = Kn, Zp = oc, BO = cc;
class GO {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, Qi.configureRequestUrl)(this.options.newUrl, t), (0, Qi.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, Aa.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let s = 0, a = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === Aa.OperationKind.DOWNLOAD ? s += f : a += f;
    }
    const o = this.blockAwareFileInfo.size;
    if (s + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== o)
      throw new Error(`Internal error, size mismatch: downloadSize: ${s}, copySize: ${a}, newSize: ${o}`);
    return n.info(`Full: ${em(o)}, To download: ${em(s)} (${Math.round(s / (o / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, ul.close)(i.descriptor).catch((s) => {
      this.logger.error(`cannot close file "${i.path}": ${s}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((s) => {
      try {
        this.logger.error(`cannot close files: ${s}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, ul.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, ul.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const s = (0, xO.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, o) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const y = [];
        let w = 0;
        for (const D of t)
          D.kind === Aa.OperationKind.DOWNLOAD && (y.push(D.end - D.start), w += D.end - D.start);
        const T = {
          expectedByteCounts: y,
          grandTotal: w
        };
        f = new BO.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), c.push(f);
      }
      const l = new Qi.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), s.on("finish", () => {
        s.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (y) {
            o(y);
            return;
          }
          a(void 0);
        });
      }), c.push(s);
      let u = null;
      for (const y of c)
        y.on("error", o), u == null ? u = y : u = u.pipe(y);
      const p = c[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, Zp.executeTasksUsingMultipleRangeRequests)(this, t, p, n, o), h(0);
        return;
      }
      let v = 0, m = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const _ = this.createRequestOptions();
      _.redirect = "manual", h = (y) => {
        var w, T;
        if (y >= t.length) {
          this.fileMetadataBuffer != null && p.write(this.fileMetadataBuffer), p.end();
          return;
        }
        const D = t[y++];
        if (D.kind === Aa.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, VO.copyData)(D, p, n, o, () => h(y));
          return;
        }
        const x = `bytes=${D.start}-${D.end - 1}`;
        _.headers.range = x, (T = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || T === void 0 || T.call(w, `download range: ${x}`), f && f.beginRangeDownload();
        const X = this.httpExecutor.createRequest(_, (Y) => {
          Y.on("error", o), Y.on("aborted", () => {
            o(new Error("response has been aborted by the server"));
          }), Y.statusCode >= 400 && o((0, Qi.createHttpError)(Y)), Y.pipe(p, {
            end: !1
          }), Y.once("end", () => {
            f && f.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => h(y), 1e3)) : h(y);
          });
        });
        X.on("redirect", (Y, le, I) => {
          this.logger.info(`Redirect to ${HO(I)}`), m = I, (0, Qi.configureRequestUrl)(new qO.URL(m), _), X.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(X, o), X.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let s = 0;
    if (await this.request(i, (a) => {
      a.copy(n, s), s += a.length;
    }), s !== n.length)
      throw new Error(`Received data length ${s} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const s = this.httpExecutor.createRequest(t, (a) => {
        (0, Zp.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
    });
  }
}
ea.DifferentialDownloader = GO;
function em(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function HO(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ac, "__esModule", { value: !0 });
ac.GenericDifferentialDownloader = void 0;
const zO = ea;
class KO extends zO.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
ac.GenericDifferentialDownloader = KO;
var pn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = qe;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(s) {
      this.emitter = s;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(s) {
      n(this.emitter, "login", s);
    }
    progress(s) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, s);
    }
    updateDownloaded(s) {
      n(this.emitter, e.UPDATE_DOWNLOADED, s);
    }
    updateCancelled(s) {
      n(this.emitter, "update-cancelled", s);
    }
  }
  e.UpdaterSignal = r;
  function n(i, s, a) {
    i.on(s, a);
  }
})(pn);
Object.defineProperty(an, "__esModule", { value: !0 });
an.NoOpLogger = an.AppUpdater = void 0;
const ft = qe, WO = Gs, YO = xo, XO = Yy, Vt = hn, JO = Ze, fl = Wo, qt = De, Tn = X0, tm = Qs, QO = ec, rm = J0, ZO = Zs, dl = tc, hl = Jy, eA = ac, Zn = pn;
class Zu extends XO.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, ft.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, ft.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, rm.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new a$();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new fl.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Zn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (s) => this.checkIfUpdateSupported(s), this._isUserWithinRollout = (s) => this.isStagingMatch(s), this.clientPromise = null, this.stagingUserIdPromise = new fl.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new fl.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (s) => {
      this._logger.error(`Error: ${s.stack || s.message}`);
    }), r == null ? (this.app = new QO.ElectronAppAdapter(), this.httpExecutor = new rm.ElectronHttpExecutor((s, a) => this.emit("login", s, a))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Tn.parse)(n);
    if (i == null)
      throw (0, ft.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = tA(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new ZO.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, dl.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, dl.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = Zu.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Or.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, a = ft.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${a}, user id: ${i}`), a < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Tn.parse)(t.version);
    if (r == null)
      throw (0, ft.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Tn.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const s = (0, Tn.gt)(r, n), a = (0, Tn.lt)(r, n);
    return s ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, YO.release)();
    if (r)
      try {
        if ((0, Tn.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, dl.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new ft.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, ft.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new ft.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, ft.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof ft.CancellationError))
        try {
          this.dispatchError(i);
        } catch (s) {
          this._logger.warn(`Cannot dispatch error event: ${s.stack || s}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Zn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, JO.load)(await (0, Vt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = qt.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Vt.readFile)(t, "utf-8");
      if (ft.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = ft.UUID.v5((0, WO.randomBytes)(4096), ft.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Vt.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = qt.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new tm.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Zn.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (w) => this.emit(Zn.DOWNLOAD_PROGRESS, w));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, s = i.version, a = r.packageInfo;
    function o() {
      const w = decodeURIComponent(t.fileInfo.url.pathname);
      return w.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? qt.basename(w) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), f = c.cacheDirForPendingUpdate;
    await (0, Vt.mkdir)(f, { recursive: !0 });
    const l = o();
    let u = qt.join(f, l);
    const p = a == null ? null : qt.join(f, `package-${s}${qt.extname(a.path) || ".7z"}`), h = async (w) => {
      await c.setDownloadedFile(u, p, i, r, l, w), await t.done({
        ...i,
        downloadedFile: u
      });
      const T = qt.join(f, "current.blockmap");
      return await (0, Vt.pathExists)(T) && await (0, Vt.copyFile)(T, qt.join(c.cacheDir, "current.blockmap")), p == null ? [u] : [u, p];
    }, v = this._logger, m = await c.validateDownloadedPath(u, i, r, v);
    if (m != null)
      return u = m, await h(!1);
    const _ = async () => (await c.clear().catch(() => {
    }), await (0, Vt.unlink)(u).catch(() => {
    })), y = await (0, tm.createTempUpdateFile)(`temp-${l}`, f, v);
    try {
      await t.task(y, n, p, _), await (0, ft.retry)(() => (0, Vt.rename)(y, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (w) => w instanceof Error && /^EBUSY:/.test(w.message) ? !0 : (v.warn(`Cannot rename temp file to final file: ${w.message || w.stack}`), !1)
      });
    } catch (w) {
      throw await _(), w instanceof ft.CancellationError && (v.info("cancelled"), this.emit("update-cancelled", i)), w;
    }
    return v.info(`New version ${s} has been downloaded to ${u}`), await h(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, s) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = r.updateInfoAndProvider.provider, o = await a.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const c = async (v) => {
        const m = await this.httpExecutor.downloadToBuffer(v, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (m == null || m.length === 0)
          throw new Error(`Blockmap "${v.href}" is empty`);
        try {
          return JSON.parse((0, hl.gunzipSync)(m).toString());
        } catch (_) {
          throw new Error(`Cannot parse blockmap "${v.href}", error: ${_}`);
        }
      }, f = {
        newUrl: t.url,
        oldFile: qt.join(this.downloadedUpdateHelper.cacheDir, s),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Zn.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (v) => this.emit(Zn.DOWNLOAD_PROGRESS, v));
      const l = async (v, m) => {
        const _ = qt.join(m, "current.blockmap");
        await (0, Vt.outputFile)(_, (0, hl.gzipSync)(JSON.stringify(v)));
      }, u = async (v) => {
        const m = qt.join(v, "current.blockmap");
        try {
          if (await (0, Vt.pathExists)(m))
            return JSON.parse((0, hl.gunzipSync)(await (0, Vt.readFile)(m)).toString());
        } catch (_) {
          this._logger.warn(`Cannot parse blockmap "${m}", error: ${_}`);
        }
        return null;
      }, p = await c(o[1]);
      await l(p, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let h = await u(this.downloadedUpdateHelper.cacheDir);
      return h == null && (h = await c(o[0])), await new eA.GenericDifferentialDownloader(t.info, this.httpExecutor, f).download(h, p), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
an.AppUpdater = Zu;
function tA(e) {
  const t = (0, Tn.prerelease)(e);
  return t != null && t.length > 0;
}
class a$ {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
an.NoOpLogger = a$;
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.BaseUpdater = void 0;
const nm = Mo, rA = an;
class nA extends rA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Or.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, s = n == null ? null : n.downloadedFileInfo;
    if (i == null || s == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: s.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, nm.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: s, status: a, stdout: o, stderr: c } = i;
    if (s != null)
      throw this._logger.error(c), s;
    if (a != null && a !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${a}`);
    return o.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((s, a) => {
      try {
        const o = { stdio: i, env: n, detached: !0 }, c = (0, nm.spawn)(t, r, o);
        c.on("error", (f) => {
          a(f);
        }), c.unref(), c.pid !== void 0 && s(!0);
      } catch (o) {
        a(o);
      }
    });
  }
}
zn.BaseUpdater = nA;
var Ds = {}, ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
ta.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const ei = hn, iA = ea, sA = Jy;
class aA extends iA.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = o$(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await oA(this.options.oldFile), i);
  }
}
ta.FileWithEmbeddedBlockMapDifferentialDownloader = aA;
function o$(e) {
  return JSON.parse((0, sA.inflateRawSync)(e).toString());
}
async function oA(e) {
  const t = await (0, ei.open)(e, "r");
  try {
    const r = (await (0, ei.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, ei.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, ei.read)(t, i, 0, i.length, r - n.length - i.length), await (0, ei.close)(t), o$(i);
  } catch (r) {
    throw await (0, ei.close)(t), r;
  }
}
Object.defineProperty(Ds, "__esModule", { value: !0 });
Ds.AppImageUpdater = void 0;
const im = qe, sm = Mo, cA = hn, lA = fn, Zi = De, uA = zn, fA = ta, dA = Me, am = pn;
class hA extends uA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, dA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, im.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, a, i, r, t)) && await this.httpExecutor.download(n.url, i, s), await (0, cA.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, s) {
    try {
      const a = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: s.requestHeaders,
        cancellationToken: s.cancellationToken
      };
      return this.listenerCount(am.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(am.DOWNLOAD_PROGRESS, o)), await new fA.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, im.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, lA.unlinkSync)(r);
    let n;
    const i = Zi.basename(r), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Zi.basename(s) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = Zi.join(Zi.dirname(r), Zi.basename(s)), (0, sm.execFileSync)("mv", ["-f", s, n]), n !== r && this.emit("appimage-filename-updated", n);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, sm.execFileSync)(n, [], { env: a })), !0;
  }
}
Ds.AppImageUpdater = hA;
var ks = {}, Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
Li.LinuxUpdater = void 0;
const pA = zn;
class mA extends pA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: r } = this.app, n = `"${r} would like to update"`, i = this.sudoWithArgs(n);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let s = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (s = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${s}/bin/bash`, "-c", `'${t.join(" ")}'${s}`]);
  }
  sudoWithArgs(t) {
    const r = this.determineSudoCommand(), n = [r];
    return /kdesudo/i.test(r) ? (n.push("--comment", t), n.push("-c")) : /gksudo/i.test(r) ? n.push("--message", t) : /pkexec/i.test(r) && n.push("--disable-internal-agent"), n;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const r of t)
      if (this.hasCommand(r))
        return r;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var r;
    const n = (r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || r === void 0 ? void 0 : r.trim();
    if (n)
      return n;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
Li.LinuxUpdater = mA;
Object.defineProperty(ks, "__esModule", { value: !0 });
ks.DebUpdater = void 0;
const yA = Me, om = pn, gA = Li;
class ef extends gA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, yA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(om.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(om.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const n = ["dpkg", "apt"], i = this.detectPackageManager(n);
    try {
      ef.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (s) {
      return this.dispatchError(s), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    var s;
    if (t === "dpkg")
      try {
        n(["dpkg", "-i", r]);
      } catch (a) {
        i.warn((s = a.message) !== null && s !== void 0 ? s : a), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        r
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
ks.DebUpdater = ef;
var Ls = {};
Object.defineProperty(Ls, "__esModule", { value: !0 });
Ls.PacmanUpdater = void 0;
const cm = pn, $A = Me, vA = Li;
class tf extends vA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, $A.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(cm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(cm.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      tf.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (n) {
      return this.dispatchError(n), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n) {
    var i;
    try {
      r(["pacman", "-U", "--noconfirm", t]);
    } catch (s) {
      n.warn((i = s.message) !== null && i !== void 0 ? i : s), n.warn("pacman installation failed, attempting to update package database and retry");
      try {
        r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", t]);
      } catch (a) {
        throw n.error("Retry after pacman -Sy failed"), a;
      }
    }
  }
}
Ls.PacmanUpdater = tf;
var Fs = {};
Object.defineProperty(Fs, "__esModule", { value: !0 });
Fs.RpmUpdater = void 0;
const lm = pn, _A = Me, EA = Li;
class rf extends EA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, _A.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(lm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(lm.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      rf.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (s) {
      return this.dispatchError(s), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    if (t === "zypper")
      return n(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
    if (t === "dnf")
      return n(["dnf", "install", "--nogpgcheck", "-y", r]);
    if (t === "yum")
      return n(["yum", "install", "--nogpgcheck", "-y", r]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), n(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
Fs.RpmUpdater = rf;
var js = {};
Object.defineProperty(js, "__esModule", { value: !0 });
js.MacUpdater = void 0;
const um = qe, pl = hn, wA = fn, fm = De, bA = hE, SA = an, PA = Me, dm = Mo, hm = Gs;
class TA extends SA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Or.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let s = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), s = (0, dm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${s})`);
    } catch (u) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const p = (0, dm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${p}`), a = a || p;
    } catch (u) {
      n.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    a = a || process.arch === "arm64" || s;
    const o = (u) => {
      var p;
      return u.url.pathname.includes("arm64") || ((p = u.info.url) === null || p === void 0 ? void 0 : p.includes("arm64"));
    };
    a && r.some(o) ? r = r.filter((u) => a === o(u)) : r = r.filter((u) => !o(u));
    const c = (0, PA.findFile)(r, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, um.newError)(`ZIP file not provided: ${(0, um.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (u, p) => {
        const h = fm.join(this.downloadedUpdateHelper.cacheDir, l), v = () => (0, pl.pathExistsSync)(h) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        v() && (m = await this.differentialDownloadInstaller(c, t, u, f, l)), m && await this.httpExecutor.download(c.url, u, p);
      },
      done: async (u) => {
        if (!t.disableDifferentialDownload)
          try {
            const p = fm.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, pl.copyFile)(u.downloadedFile, p);
          } catch (p) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${p.message}`);
          }
        return this.updateDownloaded(c, u);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, pl.stat)(i)).size, a = this._logger, o = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${o})`), this.server = (0, bA.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${o})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${o})`);
    });
    const c = (f) => {
      const l = f.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((f, l) => {
      const u = (0, hm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), p = Buffer.from(`autoupdater:${u}`, "ascii"), h = `/${(0, hm.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (v, m) => {
        const _ = v.url;
        if (a.info(`${_} requested`), _ === "/") {
          if (!v.headers.authorization || v.headers.authorization.indexOf("Basic ") === -1) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), a.warn("No authenthication info");
            return;
          }
          const T = v.headers.authorization.split(" ")[1], D = Buffer.from(T, "base64").toString("ascii"), [x, X] = D.split(":");
          if (x !== "autoupdater" || X !== u) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const Y = Buffer.from(`{ "url": "${c(this.server)}${h}" }`);
          m.writeHead(200, { "Content-Type": "application/json", "Content-Length": Y.length }), m.end(Y);
          return;
        }
        if (!_.startsWith(h)) {
          a.warn(`${_} requested, but not supported`), m.writeHead(404), m.end();
          return;
        }
        a.info(`${h} requested by Squirrel.Mac, pipe ${i}`);
        let y = !1;
        m.on("finish", () => {
          y || (this.nativeUpdater.removeListener("error", l), f([]));
        });
        const w = (0, wA.createReadStream)(i);
        w.on("error", (T) => {
          try {
            m.end();
          } catch (D) {
            a.warn(`cannot end response: ${D}`);
          }
          y = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${T}`));
        }), m.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": s
        }), w.pipe(m);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${o})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${o})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${p.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : f([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
js.MacUpdater = TA;
var Us = {}, nf = {};
Object.defineProperty(nf, "__esModule", { value: !0 });
nf.verifySignature = NA;
const pm = qe, c$ = Mo, RA = xo, mm = De;
function l$(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function NA(e, t, r) {
  return new Promise((n, i) => {
    const s = t.replace(/'/g, "''");
    r.info(`Verifying signature ${s}`), (0, c$.execFile)(...l$(`"Get-AuthenticodeSignature -LiteralPath '${s}' | ConvertTo-Json -Compress"`, 20 * 1e3), (a, o, c) => {
      var f;
      try {
        if (a != null || c) {
          ml(r, a, c, i), n(null);
          return;
        }
        const l = OA(o);
        if (l.Status === 0) {
          try {
            const v = mm.normalize(l.Path), m = mm.normalize(t);
            if (r.info(`LiteralPath: ${v}. Update Path: ${m}`), v !== m) {
              ml(r, new Error(`LiteralPath of ${v} is different than ${m}`), c, i), n(null);
              return;
            }
          } catch (v) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = v.message) !== null && f !== void 0 ? f : v.stack}`);
          }
          const p = (0, pm.parseDn)(l.SignerCertificate.Subject);
          let h = !1;
          for (const v of e) {
            const m = (0, pm.parseDn)(v);
            if (m.size ? h = Array.from(m.keys()).every((y) => m.get(y) === p.get(y)) : v === p.get("CN") && (r.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (p, h) => p === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (l) {
        ml(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function OA(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function ml(e, t, r, n) {
  if (AA()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, c$.execFileSync)(...l$("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function AA() {
  const e = RA.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Us, "__esModule", { value: !0 });
Us.NsisUpdater = void 0;
const Ia = qe, ym = De, IA = zn, CA = ta, gm = pn, DA = Me, kA = hn, LA = nf, $m = dn;
class FA extends IA.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, LA.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, DA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, s, a, o) => {
        const c = n.packageInfo, f = c != null && a != null;
        if (f && t.disableWebInstaller)
          throw (0, Ia.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, Ia.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, s);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await o(), (0, Ia.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, c, a, r))
          try {
            await this.httpExecutor.download(new $m.URL(c.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, kA.unlink)(a);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const s = () => {
      this.spawnLog(ym.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), s(), !0) : (this.spawnLog(r, n).catch((a) => {
      const o = a.code;
      this._logger.info(`Cannot run installer: error code: ${o}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), o === "UNKNOWN" || o === "EACCES" ? s() : o === "ENOENT" ? Or.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const s = {
        newUrl: new $m.URL(r.path),
        oldFile: ym.join(this.downloadedUpdateHelper.cacheDir, Ia.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(gm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(gm.DOWNLOAD_PROGRESS, a)), await new CA.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "win32";
    }
    return !1;
  }
}
Us.NsisUpdater = FA;
(function(e) {
  var t = pt && pt.__createBinding || (Object.create ? function(_, y, w, T) {
    T === void 0 && (T = w);
    var D = Object.getOwnPropertyDescriptor(y, w);
    (!D || ("get" in D ? !y.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return y[w];
    } }), Object.defineProperty(_, T, D);
  } : function(_, y, w, T) {
    T === void 0 && (T = w), _[T] = y[w];
  }), r = pt && pt.__exportStar || function(_, y) {
    for (var w in _) w !== "default" && !Object.prototype.hasOwnProperty.call(y, w) && t(y, _, w);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = hn, i = De;
  var s = zn;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return s.BaseUpdater;
  } });
  var a = an;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var o = Me;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return o.Provider;
  } });
  var c = Ds;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var f = ks;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var l = Ls;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = Fs;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var p = js;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return p.MacUpdater;
  } });
  var h = Us;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return h.NsisUpdater;
  } }), r(pn, e);
  let v;
  function m() {
    if (process.platform === "win32")
      v = new Us.NsisUpdater();
    else if (process.platform === "darwin")
      v = new js.MacUpdater();
    else {
      v = new Ds.AppImageUpdater();
      try {
        const _ = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(_))
          return v;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const y = (0, n.readFileSync)(_).toString().trim();
        switch (console.info("Found package-type:", y), y) {
          case "deb":
            v = new ks.DebUpdater();
            break;
          case "rpm":
            v = new Fs.RpmUpdater();
            break;
          case "pacman":
            v = new Ls.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (_) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", _.message);
      }
    }
    return v;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => v || m()
  });
})(hr);
const xn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, u$ = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), f$ = 1e6, jA = (e) => e >= "0" && e <= "9";
function d$(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= f$;
  }
  return !1;
}
function yl(e, t) {
  return u$.has(e) ? !1 : (e && d$(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function UA(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  const t = [];
  let r = "", n = "start", i = !1, s = 0;
  for (const a of e) {
    if (s++, i) {
      r += a, i = !1;
      continue;
    }
    if (a === "\\") {
      if (n === "index")
        throw new Error(`Invalid character '${a}' in an index at position ${s}`);
      if (n === "indexEnd")
        throw new Error(`Invalid character '${a}' after an index at position ${s}`);
      i = !0, n = n === "start" ? "property" : n;
      continue;
    }
    switch (a) {
      case ".": {
        if (n === "index")
          throw new Error(`Invalid character '${a}' in an index at position ${s}`);
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (!yl(r, t))
          return [];
        r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error(`Invalid character '${a}' in an index at position ${s}`);
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (n === "property" || n === "start") {
          if ((r || n === "property") && !yl(r, t))
            return [];
          r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          if (r === "")
            r = (t.pop() || "") + "[]", n = "property";
          else {
            const o = Number.parseInt(r, 10);
            !Number.isNaN(o) && Number.isFinite(o) && o >= 0 && o <= Number.MAX_SAFE_INTEGER && o <= f$ && r === String(o) ? t.push(o) : t.push(r), r = "", n = "indexEnd";
          }
          break;
        }
        if (n === "indexEnd")
          throw new Error(`Invalid character '${a}' after an index at position ${s}`);
        r += a;
        break;
      }
      default: {
        if (n === "index" && !jA(a))
          throw new Error(`Invalid character '${a}' in an index at position ${s}`);
        if (n === "indexEnd")
          throw new Error(`Invalid character '${a}' after an index at position ${s}`);
        n === "start" && (n = "property"), r += a;
      }
    }
  }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (!yl(r, t))
        return [];
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function lc(e) {
  if (typeof e == "string")
    return UA(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [r, n] of e.entries()) {
      if (typeof n != "string" && typeof n != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${r}, got ${typeof n}`);
      if (typeof n == "number" && !Number.isFinite(n))
        throw new TypeError(`Path segment at index ${r} must be a finite number, got ${n}`);
      if (u$.has(n))
        return [];
      typeof n == "string" && d$(n) ? t.push(Number.parseInt(n, 10)) : t.push(n);
    }
    return t;
  }
  return [];
}
function vm(e, t, r) {
  if (!xn(e) || typeof t != "string" && !Array.isArray(t))
    return r === void 0 ? e : r;
  const n = lc(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (e = e[s], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Ca(e, t, r) {
  if (!xn(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const n = e, i = lc(t);
  if (i.length === 0)
    return e;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    if (s === i.length - 1)
      e[a] = r;
    else if (!xn(e[a])) {
      const c = typeof i[s + 1] == "number";
      e[a] = c ? [] : {};
    }
    e = e[a];
  }
  return n;
}
function MA(e, t) {
  if (!xn(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = lc(t);
  if (r.length === 0)
    return !1;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (n === r.length - 1)
      return Object.hasOwn(e, i) ? (delete e[i], !0) : !1;
    if (e = e[i], !xn(e))
      return !1;
  }
}
function gl(e, t) {
  if (!xn(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = lc(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!xn(e) || !(n in e))
      return !1;
    e = e[n];
  }
  return !0;
}
const Jr = Qy.homedir(), sf = Qy.tmpdir(), { env: pi } = Ne, xA = (e) => {
  const t = ce.join(Jr, "Library");
  return {
    data: ce.join(t, "Application Support", e),
    config: ce.join(t, "Preferences", e),
    cache: ce.join(t, "Caches", e),
    log: ce.join(t, "Logs", e),
    temp: ce.join(sf, e)
  };
}, VA = (e) => {
  const t = pi.APPDATA || ce.join(Jr, "AppData", "Roaming"), r = pi.LOCALAPPDATA || ce.join(Jr, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ce.join(r, e, "Data"),
    config: ce.join(t, e, "Config"),
    cache: ce.join(r, e, "Cache"),
    log: ce.join(r, e, "Log"),
    temp: ce.join(sf, e)
  };
}, qA = (e) => {
  const t = ce.basename(Jr);
  return {
    data: ce.join(pi.XDG_DATA_HOME || ce.join(Jr, ".local", "share"), e),
    config: ce.join(pi.XDG_CONFIG_HOME || ce.join(Jr, ".config"), e),
    cache: ce.join(pi.XDG_CACHE_HOME || ce.join(Jr, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ce.join(pi.XDG_STATE_HOME || ce.join(Jr, ".local", "state"), e),
    temp: ce.join(sf, t, e)
  };
};
function BA(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), Ne.platform === "darwin" ? xA(e) : Ne.platform === "win32" ? VA(e) : qA(e);
}
const Mr = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    return e.apply(void 0, i).catch(r);
  };
}, wr = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    try {
      return e.apply(void 0, i);
    } catch (s) {
      return r(s);
    }
  };
}, GA = 250, xr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, a = i.interval ?? GA, o = Date.now() + s;
    return function c(...f) {
      return e.apply(void 0, f).catch((l) => {
        if (!r(l) || Date.now() >= o)
          throw l;
        const u = Math.round(a * Math.random());
        return u > 0 ? new Promise((h) => setTimeout(h, u)).then(() => c.apply(void 0, f)) : c.apply(void 0, f);
      });
    };
  };
}, Vr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, a = Date.now() + s;
    return function(...c) {
      for (; ; )
        try {
          return e.apply(void 0, c);
        } catch (f) {
          if (!r(f) || Date.now() >= a)
            throw f;
          continue;
        }
    };
  };
}, mi = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!mi.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !HA && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!mi.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!mi.isNodeError(e))
      throw e;
    if (!mi.isChangeErrorOk(e))
      throw e;
  }
}, Da = {
  onError: mi.onChangeError
}, Ct = {
  onError: () => {
  }
}, HA = Ne.getuid ? !Ne.getuid() : !1, rt = {
  isRetriable: mi.isRetriableError
}, st = {
  attempt: {
    /* ASYNC */
    chmod: Mr(tt(ae.chmod), Da),
    chown: Mr(tt(ae.chown), Da),
    close: Mr(tt(ae.close), Ct),
    fsync: Mr(tt(ae.fsync), Ct),
    mkdir: Mr(tt(ae.mkdir), Ct),
    realpath: Mr(tt(ae.realpath), Ct),
    stat: Mr(tt(ae.stat), Ct),
    unlink: Mr(tt(ae.unlink), Ct),
    /* SYNC */
    chmodSync: wr(ae.chmodSync, Da),
    chownSync: wr(ae.chownSync, Da),
    closeSync: wr(ae.closeSync, Ct),
    existsSync: wr(ae.existsSync, Ct),
    fsyncSync: wr(ae.fsync, Ct),
    mkdirSync: wr(ae.mkdirSync, Ct),
    realpathSync: wr(ae.realpathSync, Ct),
    statSync: wr(ae.statSync, Ct),
    unlinkSync: wr(ae.unlinkSync, Ct)
  },
  retry: {
    /* ASYNC */
    close: xr(tt(ae.close), rt),
    fsync: xr(tt(ae.fsync), rt),
    open: xr(tt(ae.open), rt),
    readFile: xr(tt(ae.readFile), rt),
    rename: xr(tt(ae.rename), rt),
    stat: xr(tt(ae.stat), rt),
    write: xr(tt(ae.write), rt),
    writeFile: xr(tt(ae.writeFile), rt),
    /* SYNC */
    closeSync: Vr(ae.closeSync, rt),
    fsyncSync: Vr(ae.fsyncSync, rt),
    openSync: Vr(ae.openSync, rt),
    readFileSync: Vr(ae.readFileSync, rt),
    renameSync: Vr(ae.renameSync, rt),
    statSync: Vr(ae.statSync, rt),
    writeSync: Vr(ae.writeSync, rt),
    writeFileSync: Vr(ae.writeFileSync, rt)
  }
}, zA = "utf8", _m = 438, KA = 511, WA = {}, YA = Ne.geteuid ? Ne.geteuid() : -1, XA = Ne.getegid ? Ne.getegid() : -1, JA = 1e3, QA = !!Ne.getuid;
Ne.getuid && Ne.getuid();
const Em = 128, ZA = (e) => e instanceof Error && "code" in e, wm = (e) => typeof e == "string", $l = (e) => e === void 0, eI = Ne.platform === "linux", h$ = Ne.platform === "win32", af = ["SIGHUP", "SIGINT", "SIGTERM"];
h$ || af.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
eI && af.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class tI {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (h$ && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? Ne.kill(Ne.pid, "SIGTERM") : Ne.kill(Ne.pid, t));
      }
    }, this.hook = () => {
      Ne.once("exit", () => this.exit());
      for (const t of af)
        try {
          Ne.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const rI = new tI(), nI = rI.register, at = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = at.truncate(t(e));
    return n in at.store ? at.get(e, t, r) : (at.store[n] = r, [n, () => delete at.store[n]]);
  },
  purge: (e) => {
    at.store[e] && (delete at.store[e], st.attempt.unlink(e));
  },
  purgeSync: (e) => {
    at.store[e] && (delete at.store[e], st.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in at.store)
      at.purgeSync(e);
  },
  truncate: (e) => {
    const t = ce.basename(e);
    if (t.length <= Em)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Em;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
nI(at.purgeSyncAll);
function p$(e, t, r = WA) {
  if (wm(r))
    return p$(e, t, { encoding: r });
  const i = { timeout: r.timeout ?? JA };
  let s = null, a = null, o = null;
  try {
    const c = st.attempt.realpathSync(e), f = !!c;
    e = c || e, [a, s] = at.get(e, r.tmpCreate || at.create, r.tmpPurge !== !1);
    const l = QA && $l(r.chown), u = $l(r.mode);
    if (f && (l || u)) {
      const p = st.attempt.statSync(e);
      p && (r = { ...r }, l && (r.chown = { uid: p.uid, gid: p.gid }), u && (r.mode = p.mode));
    }
    if (!f) {
      const p = ce.dirname(e);
      st.attempt.mkdirSync(p, {
        mode: KA,
        recursive: !0
      });
    }
    o = st.retry.openSync(i)(a, "w", r.mode || _m), r.tmpCreated && r.tmpCreated(a), wm(t) ? st.retry.writeSync(i)(o, t, 0, r.encoding || zA) : $l(t) || st.retry.writeSync(i)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? st.retry.fsyncSync(i)(o) : st.attempt.fsync(o)), st.retry.closeSync(i)(o), o = null, r.chown && (r.chown.uid !== YA || r.chown.gid !== XA) && st.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== _m && st.attempt.chmodSync(a, r.mode);
    try {
      st.retry.renameSync(i)(a, e);
    } catch (p) {
      if (!ZA(p) || p.code !== "ENAMETOOLONG")
        throw p;
      st.retry.renameSync(i)(a, at.truncate(e));
    }
    s(), a = null;
  } finally {
    o && st.attempt.closeSync(o), a && at.purge(a);
  }
}
var tu = { exports: {} }, m$ = {}, Qt = {}, Ni = {}, ra = {}, fe = {}, Ms = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((T, D) => `${T}${D}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((T, D) => (D instanceof r && (T[D.str] = (T[D.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(y, ...w) {
    const T = [y[0]];
    let D = 0;
    for (; D < w.length; )
      o(T, w[D]), T.push(y[++D]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function a(y, ...w) {
    const T = [h(y[0])];
    let D = 0;
    for (; D < w.length; )
      T.push(s), o(T, w[D]), T.push(s, h(y[++D]));
    return c(T), new n(T);
  }
  e.str = a;
  function o(y, w) {
    w instanceof n ? y.push(...w._items) : w instanceof r ? y.push(w) : y.push(u(w));
  }
  e.addCodeArg = o;
  function c(y) {
    let w = 1;
    for (; w < y.length - 1; ) {
      if (y[w] === s) {
        const T = f(y[w - 1], y[w + 1]);
        if (T !== void 0) {
          y.splice(w - 1, 3, T);
          continue;
        }
        y[w++] = "+";
      }
      w++;
    }
  }
  function f(y, w) {
    if (w === '""')
      return y;
    if (y === '""')
      return w;
    if (typeof y == "string")
      return w instanceof r || y[y.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${y.slice(0, -1)}${w}"` : w[0] === '"' ? y.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(y instanceof r))
      return `"${y}${w.slice(1)}`;
  }
  function l(y, w) {
    return w.emptyStr() ? y : y.emptyStr() ? w : a`${y}${w}`;
  }
  e.strConcat = l;
  function u(y) {
    return typeof y == "number" || typeof y == "boolean" || y === null ? y : h(Array.isArray(y) ? y.join(",") : y);
  }
  function p(y) {
    return new n(h(y));
  }
  e.stringify = p;
  function h(y) {
    return JSON.stringify(y).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function v(y) {
    return typeof y == "string" && e.IDENTIFIER.test(y) ? new n(`.${y}`) : i`[${y}]`;
  }
  e.getProperty = v;
  function m(y) {
    if (typeof y == "string" && e.IDENTIFIER.test(y))
      return new n(`${y}`);
    throw new Error(`CodeGen: invalid export name: ${y}, use explicit $id name mapping`);
  }
  e.getEsmExportName = m;
  function _(y) {
    return new n(y.toString());
  }
  e.regexpCode = _;
})(Ms);
var ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Ms;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = s;
  const a = (0, t._)`\n`;
  class o extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new s(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(f), { prefix: h } = p, v = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let m = this._values[h];
      if (m) {
        const w = m.get(v);
        if (w)
          return w;
      } else
        m = this._values[h] = /* @__PURE__ */ new Map();
      m.set(v, p);
      const _ = this._scope[h] || (this._scope[h] = []), y = _.length;
      return _[y] = l.ref, p.setValue(l, { property: h, itemIndex: y }), p;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, p) {
      let h = t.nil;
      for (const v in f) {
        const m = f[v];
        if (!m)
          continue;
        const _ = u[v] = u[v] || /* @__PURE__ */ new Map();
        m.forEach((y) => {
          if (_.has(y))
            return;
          _.set(y, n.Started);
          let w = l(y);
          if (w) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${T} ${y} = ${w};${this.opts._n}`;
          } else if (w = p == null ? void 0 : p(y))
            h = (0, t._)`${h}${w}${this.opts._n}`;
          else
            throw new r(y);
          _.set(y, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(ru);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Ms, r = ru;
  var n = Ms;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = ru;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, $) {
      return this;
    }
  }
  class a extends s {
    constructor(d, $, N) {
      super(), this.varKind = d, this.name = $, this.rhs = N;
    }
    render({ es5: d, _n: $ }) {
      const N = d ? r.varKinds.var : this.varKind, E = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${E};` + $;
    }
    optimizeNames(d, $) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, d, $)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends s {
    constructor(d, $, N) {
      super(), this.lhs = d, this.rhs = $, this.sideEffects = N;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, $) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, d, $), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(d, this.rhs);
    }
  }
  class c extends o {
    constructor(d, $, N, E) {
      super(d, N, E), this.op = $;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class p extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, $) {
      return this.code = k(this.code, d, $), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce(($, N) => $ + N.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let $ = d.length;
      for (; $--; ) {
        const N = d[$].optimizeNodes();
        Array.isArray(N) ? d.splice($, 1, ...N) : N ? d[$] = N : d.splice($, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, $) {
      const { nodes: N } = this;
      let E = N.length;
      for (; E--; ) {
        const g = N[E];
        g.optimizeNames(d, $) || (L(d, g.names), N.splice(E, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => W(d, $.names), {});
    }
  }
  class v extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class m extends h {
  }
  class _ extends v {
  }
  _.kind = "else";
  class y extends v {
    constructor(d, $) {
      super($), this.condition = d;
    }
    render(d) {
      let $ = `if(${this.condition})` + super.render(d);
      return this.else && ($ += "else " + this.else.render(d)), $;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let $ = this.else;
      if ($) {
        const N = $.optimizeNodes();
        $ = this.else = Array.isArray(N) ? new _(N) : N;
      }
      if ($)
        return d === !1 ? $ instanceof y ? $ : $.nodes : this.nodes.length ? this : new y(q(d), $ instanceof y ? [$] : $.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, $) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(d, $), !!(super.optimizeNames(d, $) || this.else))
        return this.condition = k(this.condition, d, $), this;
    }
    get names() {
      const d = super.names;
      return Q(d, this.condition), this.else && W(d, this.else.names), d;
    }
  }
  y.kind = "if";
  class w extends v {
  }
  w.kind = "for";
  class T extends w {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iteration = k(this.iteration, d, $), this;
    }
    get names() {
      return W(super.names, this.iteration.names);
    }
  }
  class D extends w {
    constructor(d, $, N, E) {
      super(), this.varKind = d, this.name = $, this.from = N, this.to = E;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: N, from: E, to: g } = this;
      return `for(${$} ${N}=${E}; ${N}<${g}; ${N}++)` + super.render(d);
    }
    get names() {
      const d = Q(super.names, this.from);
      return Q(d, this.to);
    }
  }
  class x extends w {
    constructor(d, $, N, E) {
      super(), this.loop = d, this.varKind = $, this.name = N, this.iterable = E;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iterable = k(this.iterable, d, $), this;
    }
    get names() {
      return W(super.names, this.iterable.names);
    }
  }
  class X extends v {
    constructor(d, $, N) {
      super(), this.name = d, this.args = $, this.async = N;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  X.kind = "func";
  class Y extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  Y.kind = "return";
  class le extends v {
    render(d) {
      let $ = "try" + super.render(d);
      return this.catch && ($ += this.catch.render(d)), this.finally && ($ += this.finally.render(d)), $;
    }
    optimizeNodes() {
      var d, $;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
    }
    optimizeNames(d, $) {
      var N, E;
      return super.optimizeNames(d, $), (N = this.catch) === null || N === void 0 || N.optimizeNames(d, $), (E = this.finally) === null || E === void 0 || E.optimizeNames(d, $), this;
    }
    get names() {
      const d = super.names;
      return this.catch && W(d, this.catch.names), this.finally && W(d, this.finally.names), d;
    }
  }
  class I extends v {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  I.kind = "catch";
  class re extends v {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  re.kind = "finally";
  class H {
    constructor(d, $ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new m()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, $) {
      const N = this._extScope.value(d, $);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(d, $) {
      return this._extScope.getValue(d, $);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, $, N, E) {
      const g = this._scope.toName($);
      return N !== void 0 && E && (this._constants[g.str] = N), this._leafNode(new a(d, g, N)), g;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, $, N) {
      return this._def(r.varKinds.const, d, $, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, $, N) {
      return this._def(r.varKinds.let, d, $, N);
    }
    // `var` declaration with optional assignment
    var(d, $, N) {
      return this._def(r.varKinds.var, d, $, N);
    }
    // assignment code
    assign(d, $, N) {
      return this._leafNode(new o(d, $, N));
    }
    // `+=` code
    add(d, $) {
      return this._leafNode(new c(d, e.operators.ADD, $));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new p(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const $ = ["{"];
      for (const [N, E] of d)
        $.length > 1 && $.push(","), $.push(N), (N !== E || this.opts.es5) && ($.push(":"), (0, t.addCodeArg)($, E));
      return $.push("}"), new t._Code($);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, $, N) {
      if (this._blockNode(new y(d)), $ && N)
        this.code($).else().code(N).endIf();
      else if ($)
        this.code($).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new y(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(y, _);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new T(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, N, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const M = this._scope.toName(d);
      return this._for(new D(g, M, $, N), () => E(M));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, N, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const M = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${M}.length`, (A) => {
          this.var(g, (0, t._)`${M}[${A}]`), N(g);
        });
      }
      return this._for(new x("of", E, g, $), () => N(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, N, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, N);
      const g = this._scope.toName(d);
      return this._for(new x("in", E, g, $), () => N(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new f(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new Y();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(d, $, N) {
      if (!$ && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new le();
      if (this._blockNode(E), this.code(d), $) {
        const g = this.name("e");
        this._currNode = E.catch = new I(g), $(g);
      }
      return N && (this._currNode = E.finally = new re(), this.code(N)), this._endBlockNode(I, re);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new u(d));
    }
    // start self-balancing block
    block(d, $) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock($), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const $ = this._blockStarts.pop();
      if ($ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - $;
      if (N < 0 || d !== void 0 && N !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${d} expected`);
      return this._nodes.length = $, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, $ = t.nil, N, E) {
      return this._blockNode(new X(d, $, N)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(X);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, $) {
      const N = this._currNode;
      if (N instanceof d || $ && N instanceof $)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${$ ? `${d.kind}/${$.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const $ = this._currNode;
      if (!($ instanceof y))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = $.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const $ = this._nodes;
      $[$.length - 1] = d;
    }
  }
  e.CodeGen = H;
  function W(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) + (d[$] || 0);
    return S;
  }
  function Q(S, d) {
    return d instanceof t._CodeOrName ? W(S, d.names) : S;
  }
  function k(S, d, $) {
    if (S instanceof t.Name)
      return N(S);
    if (!E(S))
      return S;
    return new t._Code(S._items.reduce((g, M) => (M instanceof t.Name && (M = N(M)), M instanceof t._Code ? g.push(...M._items) : g.push(M), g), []));
    function N(g) {
      const M = $[g.str];
      return M === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], M);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((M) => M instanceof t.Name && d[M.str] === 1 && $[M.str] !== void 0);
    }
  }
  function L(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) - (d[$] || 0);
  }
  function q(S) {
    return typeof S == "boolean" || typeof S == "number" || S === null ? !S : (0, t._)`!${P(S)}`;
  }
  e.not = q;
  const j = b(e.operators.AND);
  function G(...S) {
    return S.reduce(j);
  }
  e.and = G;
  const V = b(e.operators.OR);
  function O(...S) {
    return S.reduce(V);
  }
  e.or = O;
  function b(S) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${P(d)} ${S} ${P($)}`;
  }
  function P(S) {
    return S instanceof t.Name ? S : (0, t._)`(${S})`;
  }
})(fe);
var Z = {};
Object.defineProperty(Z, "__esModule", { value: !0 });
Z.checkStrictMode = Z.getErrorPath = Z.Type = Z.useFunc = Z.setEvaluated = Z.evaluatedPropsToName = Z.mergeEvaluated = Z.eachItem = Z.unescapeJsonPointer = Z.escapeJsonPointer = Z.escapeFragment = Z.unescapeFragment = Z.schemaRefOrVal = Z.schemaHasRulesButRef = Z.schemaHasRules = Z.checkUnknownRules = Z.alwaysValidSchema = Z.toHash = void 0;
const we = fe, iI = Ms;
function sI(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Z.toHash = sI;
function aI(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (y$(e, t), !g$(t, e.self.RULES.all));
}
Z.alwaysValidSchema = aI;
function y$(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || _$(e, `unknown keyword: "${s}"`);
}
Z.checkUnknownRules = y$;
function g$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Z.schemaHasRules = g$;
function oI(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Z.schemaHasRulesButRef = oI;
function cI({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, we._)`${r}`;
  }
  return (0, we._)`${e}${t}${(0, we.getProperty)(n)}`;
}
Z.schemaRefOrVal = cI;
function lI(e) {
  return $$(decodeURIComponent(e));
}
Z.unescapeFragment = lI;
function uI(e) {
  return encodeURIComponent(of(e));
}
Z.escapeFragment = uI;
function of(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Z.escapeJsonPointer = of;
function $$(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Z.unescapeJsonPointer = $$;
function fI(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Z.eachItem = fI;
function bm({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, a, o) => {
    const c = a === void 0 ? s : a instanceof we.Name ? (s instanceof we.Name ? e(i, s, a) : t(i, s, a), a) : s instanceof we.Name ? (t(i, a, s), s) : r(s, a);
    return o === we.Name && !(c instanceof we.Name) ? n(i, c) : c;
  };
}
Z.mergeEvaluated = {
  props: bm({
    mergeNames: (e, t, r) => e.if((0, we._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, we._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, we._)`${r} || {}`).code((0, we._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, we._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, we._)`${r} || {}`), cf(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: v$
  }),
  items: bm({
    mergeNames: (e, t, r) => e.if((0, we._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, we._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, we._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, we._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function v$(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, we._)`{}`);
  return t !== void 0 && cf(e, r, t), r;
}
Z.evaluatedPropsToName = v$;
function cf(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, we._)`${t}${(0, we.getProperty)(n)}`, !0));
}
Z.setEvaluated = cf;
const Sm = {};
function dI(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Sm[t.code] || (Sm[t.code] = new iI._Code(t.code))
  });
}
Z.useFunc = dI;
var nu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(nu || (Z.Type = nu = {}));
function hI(e, t, r) {
  if (e instanceof we.Name) {
    const n = t === nu.Num;
    return r ? n ? (0, we._)`"[" + ${e} + "]"` : (0, we._)`"['" + ${e} + "']"` : n ? (0, we._)`"/" + ${e}` : (0, we._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, we.getProperty)(e).toString() : "/" + of(e);
}
Z.getErrorPath = hI;
function _$(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Z.checkStrictMode = _$;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
const nt = fe, pI = {
  // validation function arguments
  data: new nt.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new nt.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new nt.Name("instancePath"),
  parentData: new nt.Name("parentData"),
  parentDataProperty: new nt.Name("parentDataProperty"),
  rootData: new nt.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new nt.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new nt.Name("vErrors"),
  // null or array of validation errors
  errors: new nt.Name("errors"),
  // counter of validation errors
  this: new nt.Name("this"),
  // "globals"
  self: new nt.Name("self"),
  scope: new nt.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new nt.Name("json"),
  jsonPos: new nt.Name("jsonPos"),
  jsonLen: new nt.Name("jsonLen"),
  jsonPart: new nt.Name("jsonPart")
};
Dt.default = pI;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = fe, r = Z, n = Dt;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: y }) => y ? (0, t.str)`"${_}" keyword must be ${y} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, y = e.keywordError, w, T) {
    const { it: D } = _, { gen: x, compositeRule: X, allErrors: Y } = D, le = u(_, y, w);
    T ?? (X || Y) ? c(x, le) : f(D, (0, t._)`[${le}]`);
  }
  e.reportError = i;
  function s(_, y = e.keywordError, w) {
    const { it: T } = _, { gen: D, compositeRule: x, allErrors: X } = T, Y = u(_, y, w);
    c(D, Y), x || X || f(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function a(_, y) {
    _.assign(n.default.errors, y), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(y, () => _.assign((0, t._)`${n.default.vErrors}.length`, y), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function o({ gen: _, keyword: y, schemaValue: w, data: T, errsCount: D, it: x }) {
    if (D === void 0)
      throw new Error("ajv implementation error");
    const X = _.name("err");
    _.forRange("i", D, n.default.errors, (Y) => {
      _.const(X, (0, t._)`${n.default.vErrors}[${Y}]`), _.if((0, t._)`${X}.instancePath === undefined`, () => _.assign((0, t._)`${X}.instancePath`, (0, t.strConcat)(n.default.instancePath, x.errorPath))), _.assign((0, t._)`${X}.schemaPath`, (0, t.str)`${x.errSchemaPath}/${y}`), x.opts.verbose && (_.assign((0, t._)`${X}.schema`, w), _.assign((0, t._)`${X}.data`, T));
    });
  }
  e.extendErrors = o;
  function c(_, y) {
    const w = _.const("err", y);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function f(_, y) {
    const { gen: w, validateName: T, schemaEnv: D } = _;
    D.$async ? w.throw((0, t._)`new ${_.ValidationError}(${y})`) : (w.assign((0, t._)`${T}.errors`, y), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function u(_, y, w) {
    const { createErrors: T } = _.it;
    return T === !1 ? (0, t._)`{}` : p(_, y, w);
  }
  function p(_, y, w = {}) {
    const { gen: T, it: D } = _, x = [
      h(D, w),
      v(_, w)
    ];
    return m(_, y, x), T.object(...x);
  }
  function h({ errorPath: _ }, { instancePath: y }) {
    const w = y ? (0, t.str)`${_}${(0, r.getErrorPath)(y, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: _, it: { errSchemaPath: y } }, { schemaPath: w, parentSchema: T }) {
    let D = T ? y : (0, t.str)`${y}/${_}`;
    return w && (D = (0, t.str)`${D}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, D];
  }
  function m(_, { params: y, message: w }, T) {
    const { keyword: D, data: x, schemaValue: X, it: Y } = _, { opts: le, propertyName: I, topSchemaRef: re, schemaPath: H } = Y;
    T.push([l.keyword, D], [l.params, typeof y == "function" ? y(_) : y || (0, t._)`{}`]), le.messages && T.push([l.message, typeof w == "function" ? w(_) : w]), le.verbose && T.push([l.schema, X], [l.parentSchema, (0, t._)`${re}${H}`], [n.default.data, x]), I && T.push([l.propertyName, I]);
  }
})(ra);
Object.defineProperty(Ni, "__esModule", { value: !0 });
Ni.boolOrEmptySchema = Ni.topBoolOrEmptySchema = void 0;
const mI = ra, yI = fe, gI = Dt, $I = {
  message: "boolean schema is false"
};
function vI(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? E$(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(gI.default.data) : (t.assign((0, yI._)`${n}.errors`, null), t.return(!0));
}
Ni.topBoolOrEmptySchema = vI;
function _I(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), E$(e)) : r.var(t, !0);
}
Ni.boolOrEmptySchema = _I;
function E$(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, mI.reportError)(i, $I, void 0, t);
}
var xe = {}, Vn = {};
Object.defineProperty(Vn, "__esModule", { value: !0 });
Vn.getRules = Vn.isJSONType = void 0;
const EI = ["string", "number", "integer", "boolean", "null", "object", "array"], wI = new Set(EI);
function bI(e) {
  return typeof e == "string" && wI.has(e);
}
Vn.isJSONType = bI;
function SI() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Vn.getRules = SI;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.shouldUseRule = Rr.shouldUseGroup = Rr.schemaHasRulesForType = void 0;
function PI({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && w$(e, n);
}
Rr.schemaHasRulesForType = PI;
function w$(e, t) {
  return t.rules.some((r) => b$(e, r));
}
Rr.shouldUseGroup = w$;
function b$(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Rr.shouldUseRule = b$;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.reportTypeError = xe.checkDataTypes = xe.checkDataType = xe.coerceAndCheckDataType = xe.getJSONTypes = xe.getSchemaTypes = xe.DataType = void 0;
const TI = Vn, RI = Rr, NI = ra, pe = fe, S$ = Z;
var $i;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})($i || (xe.DataType = $i = {}));
function OI(e) {
  const t = P$(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
xe.getSchemaTypes = OI;
function P$(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(TI.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
xe.getJSONTypes = P$;
function AI(e, t) {
  const { gen: r, data: n, opts: i } = e, s = II(t, i.coerceTypes), a = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, RI.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const o = lf(t, n, i.strictNumbers, $i.Wrong);
    r.if(o, () => {
      s.length ? CI(e, t, s) : uf(e);
    });
  }
  return a;
}
xe.coerceAndCheckDataType = AI;
const T$ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function II(e, t) {
  return t ? e.filter((r) => T$.has(r) || t === "array" && r === "array") : [];
}
function CI(e, t, r) {
  const { gen: n, data: i, opts: s } = e, a = n.let("dataType", (0, pe._)`typeof ${i}`), o = n.let("coerced", (0, pe._)`undefined`);
  s.coerceTypes === "array" && n.if((0, pe._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, pe._)`${i}[0]`).assign(a, (0, pe._)`typeof ${i}`).if(lf(t, i, s.strictNumbers), () => n.assign(o, i))), n.if((0, pe._)`${o} !== undefined`);
  for (const f of r)
    (T$.has(f) || f === "array" && s.coerceTypes === "array") && c(f);
  n.else(), uf(e), n.endIf(), n.if((0, pe._)`${o} !== undefined`, () => {
    n.assign(i, o), DI(e, o);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, pe._)`${a} == "number" || ${a} == "boolean"`).assign(o, (0, pe._)`"" + ${i}`).elseIf((0, pe._)`${i} === null`).assign(o, (0, pe._)`""`);
        return;
      case "number":
        n.elseIf((0, pe._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, pe._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, pe._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, pe._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, pe._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, pe._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, pe._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, pe._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(o, (0, pe._)`[${i}]`);
    }
  }
}
function DI({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, pe._)`${t} !== undefined`, () => e.assign((0, pe._)`${t}[${r}]`, n));
}
function iu(e, t, r, n = $i.Correct) {
  const i = n === $i.Correct ? pe.operators.EQ : pe.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, pe._)`${t} ${i} null`;
    case "array":
      s = (0, pe._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, pe._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = a((0, pe._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = a();
      break;
    default:
      return (0, pe._)`typeof ${t} ${i} ${e}`;
  }
  return n === $i.Correct ? s : (0, pe.not)(s);
  function a(o = pe.nil) {
    return (0, pe.and)((0, pe._)`typeof ${t} == "number"`, o, r ? (0, pe._)`isFinite(${t})` : pe.nil);
  }
}
xe.checkDataType = iu;
function lf(e, t, r, n) {
  if (e.length === 1)
    return iu(e[0], t, r, n);
  let i;
  const s = (0, S$.toHash)(e);
  if (s.array && s.object) {
    const a = (0, pe._)`typeof ${t} != "object"`;
    i = s.null ? a : (0, pe._)`!${t} || ${a}`, delete s.null, delete s.array, delete s.object;
  } else
    i = pe.nil;
  s.number && delete s.integer;
  for (const a in s)
    i = (0, pe.and)(i, iu(a, t, r, n));
  return i;
}
xe.checkDataTypes = lf;
const kI = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, pe._)`{type: ${e}}` : (0, pe._)`{type: ${t}}`
};
function uf(e) {
  const t = LI(e);
  (0, NI.reportError)(t, kI);
}
xe.reportTypeError = uf;
function LI(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, S$.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
uc.assignDefaults = void 0;
const ti = fe, FI = Z;
function jI(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Pm(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => Pm(e, s, i.default));
}
uc.assignDefaults = jI;
function Pm(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: a } = e;
  if (r === void 0)
    return;
  const o = (0, ti._)`${s}${(0, ti.getProperty)(t)}`;
  if (i) {
    (0, FI.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, ti._)`${o} === undefined`;
  a.useDefaults === "empty" && (c = (0, ti._)`${c} || ${o} === null || ${o} === ""`), n.if(c, (0, ti._)`${o} = ${(0, ti.stringify)(r)}`);
}
var ur = {}, ge = {};
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.validateUnion = ge.validateArray = ge.usePattern = ge.callValidateCode = ge.schemaProperties = ge.allSchemaProperties = ge.noPropertyInData = ge.propertyInData = ge.isOwnProperty = ge.hasPropFunc = ge.reportMissingProp = ge.checkMissingProp = ge.checkReportMissingProp = void 0;
const Te = fe, ff = Z, qr = Dt, UI = Z;
function MI(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(hf(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Te._)`${t}` }, !0), e.error();
  });
}
ge.checkReportMissingProp = MI;
function xI({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Te.or)(...n.map((s) => (0, Te.and)(hf(e, t, s, r.ownProperties), (0, Te._)`${i} = ${s}`)));
}
ge.checkMissingProp = xI;
function VI(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ge.reportMissingProp = VI;
function R$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Te._)`Object.prototype.hasOwnProperty`
  });
}
ge.hasPropFunc = R$;
function df(e, t, r) {
  return (0, Te._)`${R$(e)}.call(${t}, ${r})`;
}
ge.isOwnProperty = df;
function qI(e, t, r, n) {
  const i = (0, Te._)`${t}${(0, Te.getProperty)(r)} !== undefined`;
  return n ? (0, Te._)`${i} && ${df(e, t, r)}` : i;
}
ge.propertyInData = qI;
function hf(e, t, r, n) {
  const i = (0, Te._)`${t}${(0, Te.getProperty)(r)} === undefined`;
  return n ? (0, Te.or)(i, (0, Te.not)(df(e, t, r))) : i;
}
ge.noPropertyInData = hf;
function N$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ge.allSchemaProperties = N$;
function BI(e, t) {
  return N$(t).filter((r) => !(0, ff.alwaysValidSchema)(e, t[r]));
}
ge.schemaProperties = BI;
function GI({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: a }, o, c, f) {
  const l = f ? (0, Te._)`${e}, ${t}, ${n}${i}` : t, u = [
    [qr.default.instancePath, (0, Te.strConcat)(qr.default.instancePath, s)],
    [qr.default.parentData, a.parentData],
    [qr.default.parentDataProperty, a.parentDataProperty],
    [qr.default.rootData, qr.default.rootData]
  ];
  a.opts.dynamicRef && u.push([qr.default.dynamicAnchors, qr.default.dynamicAnchors]);
  const p = (0, Te._)`${l}, ${r.object(...u)}`;
  return c !== Te.nil ? (0, Te._)`${o}.call(${c}, ${p})` : (0, Te._)`${o}(${p})`;
}
ge.callValidateCode = GI;
const HI = (0, Te._)`new RegExp`;
function zI({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Te._)`${i.code === "new RegExp" ? HI : (0, UI.useFunc)(e, i)}(${r}, ${n})`
  });
}
ge.usePattern = zI;
function KI(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return a(() => t.assign(o, !1)), o;
  }
  return t.var(s, !0), a(() => t.break()), s;
  function a(o) {
    const c = t.const("len", (0, Te._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: ff.Type.Num
      }, s), t.if((0, Te.not)(s), o);
    });
  }
}
ge.validateArray = KI;
function WI(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ff.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, o);
    t.assign(a, (0, Te._)`${a} || ${o}`), e.mergeValidEvaluated(l, o) || t.if((0, Te.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
ge.validateUnion = WI;
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.validateKeywordUsage = ur.validSchemaType = ur.funcKeywordCode = ur.macroKeywordCode = void 0;
const dt = fe, Nn = Dt, YI = ge, XI = ra;
function JI(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: a } = e, o = t.macro.call(a.self, i, s, a), c = O$(r, n, o);
  a.opts.validateSchema !== !1 && a.self.validateSchema(o, !0);
  const f = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: dt.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
ur.macroKeywordCode = JI;
function QI(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: a, $data: o, it: c } = e;
  eC(c, t);
  const f = !o && t.compile ? t.compile.call(c.self, s, a, c) : t.validate, l = O$(n, i, f), u = n.let("valid");
  e.block$data(u, p), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function p() {
    if (t.errors === !1)
      m(), t.modifying && Tm(e), _(() => e.error());
    else {
      const y = t.async ? h() : v();
      t.modifying && Tm(e), _(() => ZI(e, y));
    }
  }
  function h() {
    const y = n.let("ruleErrs", null);
    return n.try(() => m((0, dt._)`await `), (w) => n.assign(u, !1).if((0, dt._)`${w} instanceof ${c.ValidationError}`, () => n.assign(y, (0, dt._)`${w}.errors`), () => n.throw(w))), y;
  }
  function v() {
    const y = (0, dt._)`${l}.errors`;
    return n.assign(y, null), m(dt.nil), y;
  }
  function m(y = t.async ? (0, dt._)`await ` : dt.nil) {
    const w = c.opts.passContext ? Nn.default.this : Nn.default.self, T = !("compile" in t && !o || t.schema === !1);
    n.assign(u, (0, dt._)`${y}${(0, YI.callValidateCode)(e, l, w, T)}`, t.modifying);
  }
  function _(y) {
    var w;
    n.if((0, dt.not)((w = t.valid) !== null && w !== void 0 ? w : u), y);
  }
}
ur.funcKeywordCode = QI;
function Tm(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, dt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function ZI(e, t) {
  const { gen: r } = e;
  r.if((0, dt._)`Array.isArray(${t})`, () => {
    r.assign(Nn.default.vErrors, (0, dt._)`${Nn.default.vErrors} === null ? ${t} : ${Nn.default.vErrors}.concat(${t})`).assign(Nn.default.errors, (0, dt._)`${Nn.default.vErrors}.length`), (0, XI.extendErrors)(e);
  }, () => e.error());
}
function eC({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function O$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, dt.stringify)(r) });
}
function tC(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ur.validSchemaType = tC;
function rC({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const a = i.dependencies;
  if (a != null && a.some((o) => !Object.prototype.hasOwnProperty.call(e, o)))
    throw new Error(`parent schema must have dependencies of ${s}: ${a.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const c = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
ur.validateKeywordUsage = rC;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.extendSubschemaMode = sn.extendSubschemaData = sn.getSubschema = void 0;
const lr = fe, A$ = Z;
function nC(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, lr._)`${e.schemaPath}${(0, lr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, lr._)`${e.schemaPath}${(0, lr.getProperty)(t)}${(0, lr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, A$.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: a,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
sn.getSubschema = nC;
function iC(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, p = o.let("data", (0, lr._)`${t.data}${(0, lr.getProperty)(r)}`, !0);
    c(p), e.errorPath = (0, lr.str)`${f}${(0, A$.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, lr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof lr.Name ? i : o.let("data", i, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  s && (e.dataTypes = s);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
sn.extendSubschemaData = iC;
function sC(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
sn.extendSubschemaMode = sC;
var Xe = {}, fc = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, s;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, s[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var a = s[i];
      if (!e(t[a], r[a])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, I$ = { exports: {} }, tn = I$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  so(t, n, i, e, "", e);
};
tn.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
tn.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
tn.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
tn.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function so(e, t, r, n, i, s, a, o, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, a, o, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in tn.arrayKeywords)
          for (var p = 0; p < u.length; p++)
            so(e, t, r, u[p], i + "/" + l + "/" + p, s, i, l, n, p);
      } else if (l in tn.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            so(e, t, r, u[h], i + "/" + l + "/" + aC(h), s, i, l, n, h);
      } else (l in tn.keywords || e.allKeys && !(l in tn.skipKeywords)) && so(e, t, r, u, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, a, o, c, f);
  }
}
function aC(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var oC = I$.exports;
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.getSchemaRefs = Xe.resolveUrl = Xe.normalizeId = Xe._getFullPath = Xe.getFullPath = Xe.inlineRef = void 0;
const cC = Z, lC = fc, uC = oC, fC = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function dC(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !su(e) : t ? C$(e) <= t : !1;
}
Xe.inlineRef = dC;
const hC = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function su(e) {
  for (const t in e) {
    if (hC.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(su) || typeof r == "object" && su(r))
      return !0;
  }
  return !1;
}
function C$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !fC.has(r) && (typeof e[r] == "object" && (0, cC.eachItem)(e[r], (n) => t += C$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function D$(e, t = "", r) {
  r !== !1 && (t = vi(t));
  const n = e.parse(t);
  return k$(e, n);
}
Xe.getFullPath = D$;
function k$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Xe._getFullPath = k$;
const pC = /#\/?$/;
function vi(e) {
  return e ? e.replace(pC, "") : "";
}
Xe.normalizeId = vi;
function mC(e, t, r) {
  return r = vi(r), e.resolve(t, r);
}
Xe.resolveUrl = mC;
const yC = /^[a-z_][-a-z0-9._]*$/i;
function gC(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = vi(e[r] || t), s = { "": i }, a = D$(n, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return uC(e, { allKeys: !0 }, (u, p, h, v) => {
    if (v === void 0)
      return;
    const m = a + p;
    let _ = s[v];
    typeof u[r] == "string" && (_ = y.call(this, u[r])), w.call(this, u.$anchor), w.call(this, u.$dynamicAnchor), s[p] = _;
    function y(T) {
      const D = this.opts.uriResolver.resolve;
      if (T = vi(_ ? D(_, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let x = this.refs[T];
      return typeof x == "string" && (x = this.refs[x]), typeof x == "object" ? f(u, x.schema, T) : T !== vi(m) && (T[0] === "#" ? (f(u, o[T], T), o[T] = u) : this.refs[T] = m), T;
    }
    function w(T) {
      if (typeof T == "string") {
        if (!yC.test(T))
          throw new Error(`invalid anchor "${T}"`);
        y.call(this, `#${T}`);
      }
    }
  }), o;
  function f(u, p, h) {
    if (p !== void 0 && !lC(u, p))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
Xe.getSchemaRefs = gC;
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getData = Qt.KeywordCxt = Qt.validateFunctionCode = void 0;
const L$ = Ni, Rm = xe, pf = Rr, No = xe, $C = uc, ps = ur, vl = sn, ne = fe, oe = Dt, vC = Xe, Nr = Z, es = ra;
function _C(e) {
  if (U$(e) && (M$(e), j$(e))) {
    bC(e);
    return;
  }
  F$(e, () => (0, L$.topBoolOrEmptySchema)(e));
}
Qt.validateFunctionCode = _C;
function F$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, ne._)`${oe.default.data}, ${oe.default.valCxt}`, n.$async, () => {
    e.code((0, ne._)`"use strict"; ${Nm(r, i)}`), wC(e, i), e.code(s);
  }) : e.func(t, (0, ne._)`${oe.default.data}, ${EC(i)}`, n.$async, () => e.code(Nm(r, i)).code(s));
}
function EC(e) {
  return (0, ne._)`{${oe.default.instancePath}="", ${oe.default.parentData}, ${oe.default.parentDataProperty}, ${oe.default.rootData}=${oe.default.data}${e.dynamicRef ? (0, ne._)`, ${oe.default.dynamicAnchors}={}` : ne.nil}}={}`;
}
function wC(e, t) {
  e.if(oe.default.valCxt, () => {
    e.var(oe.default.instancePath, (0, ne._)`${oe.default.valCxt}.${oe.default.instancePath}`), e.var(oe.default.parentData, (0, ne._)`${oe.default.valCxt}.${oe.default.parentData}`), e.var(oe.default.parentDataProperty, (0, ne._)`${oe.default.valCxt}.${oe.default.parentDataProperty}`), e.var(oe.default.rootData, (0, ne._)`${oe.default.valCxt}.${oe.default.rootData}`), t.dynamicRef && e.var(oe.default.dynamicAnchors, (0, ne._)`${oe.default.valCxt}.${oe.default.dynamicAnchors}`);
  }, () => {
    e.var(oe.default.instancePath, (0, ne._)`""`), e.var(oe.default.parentData, (0, ne._)`undefined`), e.var(oe.default.parentDataProperty, (0, ne._)`undefined`), e.var(oe.default.rootData, oe.default.data), t.dynamicRef && e.var(oe.default.dynamicAnchors, (0, ne._)`{}`);
  });
}
function bC(e) {
  const { schema: t, opts: r, gen: n } = e;
  F$(e, () => {
    r.$comment && t.$comment && V$(e), NC(e), n.let(oe.default.vErrors, null), n.let(oe.default.errors, 0), r.unevaluated && SC(e), x$(e), IC(e);
  });
}
function SC(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, ne._)`${r}.evaluated`), t.if((0, ne._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ne._)`${e.evaluated}.props`, (0, ne._)`undefined`)), t.if((0, ne._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ne._)`${e.evaluated}.items`, (0, ne._)`undefined`));
}
function Nm(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, ne._)`/*# sourceURL=${r} */` : ne.nil;
}
function PC(e, t) {
  if (U$(e) && (M$(e), j$(e))) {
    TC(e, t);
    return;
  }
  (0, L$.boolOrEmptySchema)(e, t);
}
function j$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function U$(e) {
  return typeof e.schema != "boolean";
}
function TC(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && V$(e), OC(e), AC(e);
  const s = n.const("_errs", oe.default.errors);
  x$(e, s), n.var(t, (0, ne._)`${s} === ${oe.default.errors}`);
}
function M$(e) {
  (0, Nr.checkUnknownRules)(e), RC(e);
}
function x$(e, t) {
  if (e.opts.jtd)
    return Om(e, [], !1, t);
  const r = (0, Rm.getSchemaTypes)(e.schema), n = (0, Rm.coerceAndCheckDataType)(e, r);
  Om(e, r, !n, t);
}
function RC(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Nr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function NC(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Nr.checkStrictMode)(e, "default is ignored in the schema root");
}
function OC(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, vC.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function AC(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function V$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, ne._)`${oe.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const a = (0, ne.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, ne._)`${oe.default.self}.opts.$comment(${s}, ${a}, ${o}.schema)`);
  }
}
function IC(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, ne._)`${oe.default.errors} === 0`, () => t.return(oe.default.data), () => t.throw((0, ne._)`new ${i}(${oe.default.vErrors})`)) : (t.assign((0, ne._)`${n}.errors`, oe.default.vErrors), s.unevaluated && CC(e), t.return((0, ne._)`${oe.default.errors} === 0`));
}
function CC({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof ne.Name && e.assign((0, ne._)`${t}.props`, r), n instanceof ne.Name && e.assign((0, ne._)`${t}.items`, n);
}
function Om(e, t, r, n) {
  const { gen: i, schema: s, data: a, allErrors: o, opts: c, self: f } = e, { RULES: l } = f;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, Nr.schemaHasRulesButRef)(s, l))) {
    i.block(() => G$(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || DC(e, t), i.block(() => {
    for (const p of l.rules)
      u(p);
    u(l.post);
  });
  function u(p) {
    (0, pf.shouldUseGroup)(s, p) && (p.type ? (i.if((0, No.checkDataType)(p.type, a, c.strictNumbers)), Am(e, p), t.length === 1 && t[0] === p.type && r && (i.else(), (0, No.reportTypeError)(e)), i.endIf()) : Am(e, p), o || i.if((0, ne._)`${oe.default.errors} === ${n || 0}`));
  }
}
function Am(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, $C.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, pf.shouldUseRule)(n, s) && G$(e, s.keyword, s.definition, t.type);
  });
}
function DC(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (kC(e, t), e.opts.allowUnionTypes || LC(e, t), FC(e, e.dataTypes));
}
function kC(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      q$(e.dataTypes, r) || mf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), UC(e, t);
  }
}
function LC(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && mf(e, "use allowUnionTypes to allow union type keyword");
}
function FC(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, pf.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((a) => jC(t, a)) && mf(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function jC(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function q$(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function UC(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    q$(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function mf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Nr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class B$ {
  constructor(t, r, n) {
    if ((0, ps.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Nr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", H$(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, ps.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", oe.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, ne.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, ne.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, ne._)`${r} !== undefined && (${(0, ne.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? es.reportExtraError : es.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, es.reportError)(this, this.def.$dataError || es.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, es.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = ne.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = ne.nil, r = ne.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: a } = this;
    n.if((0, ne.or)((0, ne._)`${i} === undefined`, r)), t !== ne.nil && n.assign(t, !0), (s.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== ne.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, ne.or)(a(), o());
    function a() {
      if (n.length) {
        if (!(r instanceof ne.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, ne._)`${(0, No.checkDataTypes)(c, r, s.opts.strictNumbers, No.DataType.Wrong)}`;
      }
      return ne.nil;
    }
    function o() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ne._)`!${c}(${r})`;
      }
      return ne.nil;
    }
  }
  subschema(t, r) {
    const n = (0, vl.getSubschema)(this.it, t);
    (0, vl.extendSubschemaData)(n, this.it, t), (0, vl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return PC(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Nr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Nr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, ne.Name)), !0;
  }
}
Qt.KeywordCxt = B$;
function G$(e, t, r, n) {
  const i = new B$(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, ps.funcKeywordCode)(i, r) : "macro" in r ? (0, ps.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, ps.funcKeywordCode)(i, r);
}
const MC = /^\/(?:[^~]|~0|~1)*$/, xC = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function H$(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return oe.default.rootData;
  if (e[0] === "/") {
    if (!MC.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = oe.default.rootData;
  } else {
    const f = xC.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (i = f[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (s = r[t - l], !i)
      return s;
  }
  let a = s;
  const o = i.split("/");
  for (const f of o)
    f && (s = (0, ne._)`${s}${(0, ne.getProperty)((0, Nr.unescapeJsonPointer)(f))}`, a = (0, ne._)`${a} && ${s}`);
  return a;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
Qt.getData = H$;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
class VC extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
na.default = VC;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
const _l = Xe;
let qC = class extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, _l.resolveUrl)(t, r, n), this.missingSchema = (0, _l.normalizeId)((0, _l.getFullPath)(t, this.missingRef));
  }
};
Fi.default = qC;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.resolveSchema = ht.getCompilingSchema = ht.resolveRef = ht.compileSchema = ht.SchemaEnv = void 0;
const Bt = fe, BC = na, wn = Dt, Xt = Xe, Im = Z, GC = Qt;
let dc = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Xt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
ht.SchemaEnv = dc;
function yf(e) {
  const t = z$.call(this, e);
  if (t)
    return t;
  const r = (0, Xt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, a = new Bt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let o;
  e.$async && (o = a.scopeValue("Error", {
    ref: BC.default,
    code: (0, Bt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: wn.default.data,
    parentData: wn.default.parentData,
    parentDataProperty: wn.default.parentDataProperty,
    dataNames: [wn.default.data],
    dataPathArr: [Bt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Bt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Bt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Bt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, GC.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const u = a.toString();
    l = `${a.scopeRefs(wn.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${wn.default.self}`, `${wn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: u, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: m } = f;
      h.evaluated = {
        props: v instanceof Bt.Name ? void 0 : v,
        items: m instanceof Bt.Name ? void 0 : m,
        dynamicProps: v instanceof Bt.Name,
        dynamicItems: m instanceof Bt.Name
      }, h.source && (h.source.evaluated = (0, Bt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
ht.compileSchema = yf;
function HC(e, t, r) {
  var n;
  r = (0, Xt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = WC.call(this, e, r);
  if (s === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    a && (s = new dc({ schema: a, schemaId: o, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = zC.call(this, s);
}
ht.resolveRef = HC;
function zC(e) {
  return (0, Xt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : yf.call(this, e);
}
function z$(e) {
  for (const t of this._compilations)
    if (KC(t, e))
      return t;
}
ht.getCompilingSchema = z$;
function KC(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function WC(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || hc.call(this, e, t);
}
function hc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Xt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Xt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return El.call(this, r, e);
  const s = (0, Xt.normalizeId)(n), a = this.refs[s] || this.schemas[s];
  if (typeof a == "string") {
    const o = hc.call(this, e, a);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : El.call(this, r, o);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || yf.call(this, a), s === (0, Xt.normalizeId)(t)) {
      const { schema: o } = a, { schemaId: c } = this.opts, f = o[c];
      return f && (i = (0, Xt.resolveUrl)(this.opts.uriResolver, i, f)), new dc({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return El.call(this, r, a);
  }
}
ht.resolveSchema = hc;
const YC = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function El(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Im.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !YC.has(o) && f && (t = (0, Xt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Im.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Xt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = hc.call(this, n, o);
  }
  const { schemaId: a } = this.opts;
  if (s = s || new dc({ schema: r, schemaId: a, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const XC = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", JC = "Meta-schema for $data reference (JSON AnySchema extension proposal)", QC = "object", ZC = [
  "$data"
], eD = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, tD = !1, rD = {
  $id: XC,
  description: JC,
  type: QC,
  required: ZC,
  properties: eD,
  additionalProperties: tD
};
var gf = {}, pc = { exports: {} };
const nD = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), K$ = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function W$(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const iD = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Cm(e) {
  return e.length = 0, !0;
}
function sD(e, t, r) {
  if (e.length) {
    const n = W$(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function aD(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let s = !1, a = !1, o = sD;
  for (let c = 0; c < e.length; c++) {
    const f = e[c];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (s === !0 && (a = !0), !o(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (s = !0), n.push(":");
        continue;
      } else if (f === "%") {
        if (!o(i, n, r))
          break;
        o = Cm;
      } else {
        i.push(f);
        continue;
      }
  }
  return i.length && (o === Cm ? r.zone = i.join("") : a ? n.push(i.join("")) : n.push(W$(i))), r.address = n.join(""), r;
}
function Y$(e) {
  if (oD(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = aD(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function oD(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function cD(e) {
  let t = e;
  const r = [];
  let n = -1, i = 0;
  for (; i = t.length; ) {
    if (i === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (i === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (i === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function lD(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function uD(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!K$(r)) {
      const n = Y$(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var X$ = {
  nonSimpleDomain: iD,
  recomposeAuthority: uD,
  normalizeComponentEncoding: lD,
  removeDotSegments: cD,
  isIPv4: K$,
  isUUID: nD,
  normalizeIPv6: Y$
};
const { isUUID: fD } = X$, dD = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function J$(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Q$(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Z$(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function hD(e) {
  return e.secure = J$(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function pD(e) {
  if ((e.port === (J$(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function mD(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(dD);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, s = $f(i);
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function yD(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, s = $f(i);
  s && (e = s.serialize(e, t));
  const a = e, o = e.nss;
  return a.path = `${n || t.nid}:${o}`, t.skipEscape = !0, a;
}
function gD(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !fD(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function $D(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const ev = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Q$,
    serialize: Z$
  }
), vD = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: ev.domainHost,
    parse: Q$,
    serialize: Z$
  }
), ao = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: hD,
    serialize: pD
  }
), _D = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: ao.domainHost,
    parse: ao.parse,
    serialize: ao.serialize
  }
), ED = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: mD,
    serialize: yD,
    skipNormalize: !0
  }
), wD = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: gD,
    serialize: $D,
    skipNormalize: !0
  }
), Oo = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: ev,
    https: vD,
    ws: ao,
    wss: _D,
    urn: ED,
    "urn:uuid": wD
  }
);
Object.setPrototypeOf(Oo, null);
function $f(e) {
  return e && (Oo[
    /** @type {SchemeName} */
    e
  ] || Oo[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var bD = {
  SCHEMES: Oo,
  getSchemeHandler: $f
};
const { normalizeIPv6: SD, removeDotSegments: os, recomposeAuthority: PD, normalizeComponentEncoding: ka, isIPv4: TD, nonSimpleDomain: RD } = X$, { SCHEMES: ND, getSchemeHandler: tv } = bD;
function OD(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  fr(Ir(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Ir(fr(e, t), t)), e;
}
function AD(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = rv(Ir(e, n), Ir(t, n), n, !0);
  return n.skipEscape = !0, fr(i, n);
}
function rv(e, t, r, n) {
  const i = {};
  return n || (e = Ir(fr(e, r), r), t = Ir(fr(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = os(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = os(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = os(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = os(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function ID(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = fr(ka(Ir(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = fr(ka(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = fr(ka(Ir(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = fr(ka(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function fr(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], s = tv(n.scheme || r.scheme);
  s && s.serialize && s.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const a = PD(r);
  if (a !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(a), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!s || !s.absolutePath) && (o = os(o)), a === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), i.push(o);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const CD = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Ir(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let i = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const s = e.match(CD);
  if (s) {
    if (n.scheme = s[1], n.userinfo = s[3], n.host = s[4], n.port = parseInt(s[5], 10), n.path = s[6] || "", n.query = s[7], n.fragment = s[8], isNaN(n.port) && (n.port = s[5]), n.host)
      if (TD(n.host) === !1) {
        const c = SD(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const a = tv(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!a || !a.unicodeSupport) && n.host && (r.domainHost || a && a.domainHost) && i === !1 && RD(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (o) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + o;
      }
    (!a || a && !a.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), a && a.parse && a.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const vf = {
  SCHEMES: ND,
  normalize: OD,
  resolve: AD,
  resolveComponent: rv,
  equal: ID,
  serialize: fr,
  parse: Ir
};
pc.exports = vf;
pc.exports.default = vf;
pc.exports.fastUri = vf;
var nv = pc.exports;
Object.defineProperty(gf, "__esModule", { value: !0 });
const iv = nv;
iv.code = 'require("ajv/dist/runtime/uri").default';
gf.default = iv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Qt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = fe;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = na, i = Fi, s = Vn, a = ht, o = fe, c = Xe, f = xe, l = Z, u = rD, p = gf, h = (O, b) => new RegExp(O, b);
  h.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], m = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), _ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, y = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function T(O) {
    var b, P, S, d, $, N, E, g, M, A, C, F, B, K, J, se, de, _e, ke, Oe, Ee, lt, Be, yr, gr;
    const Ot = O.strict, kt = (b = O.code) === null || b === void 0 ? void 0 : b.optimize, $r = kt === !0 || kt === void 0 ? 1 : kt || 0, kr = (S = (P = O.code) === null || P === void 0 ? void 0 : P.regExp) !== null && S !== void 0 ? S : h, wt = (d = O.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (N = ($ = O.strictSchema) !== null && $ !== void 0 ? $ : Ot) !== null && N !== void 0 ? N : !0,
      strictNumbers: (g = (E = O.strictNumbers) !== null && E !== void 0 ? E : Ot) !== null && g !== void 0 ? g : !0,
      strictTypes: (A = (M = O.strictTypes) !== null && M !== void 0 ? M : Ot) !== null && A !== void 0 ? A : "log",
      strictTuples: (F = (C = O.strictTuples) !== null && C !== void 0 ? C : Ot) !== null && F !== void 0 ? F : "log",
      strictRequired: (K = (B = O.strictRequired) !== null && B !== void 0 ? B : Ot) !== null && K !== void 0 ? K : !1,
      code: O.code ? { ...O.code, optimize: $r, regExp: kr } : { optimize: $r, regExp: kr },
      loopRequired: (J = O.loopRequired) !== null && J !== void 0 ? J : w,
      loopEnum: (se = O.loopEnum) !== null && se !== void 0 ? se : w,
      meta: (de = O.meta) !== null && de !== void 0 ? de : !0,
      messages: (_e = O.messages) !== null && _e !== void 0 ? _e : !0,
      inlineRefs: (ke = O.inlineRefs) !== null && ke !== void 0 ? ke : !0,
      schemaId: (Oe = O.schemaId) !== null && Oe !== void 0 ? Oe : "$id",
      addUsedSchema: (Ee = O.addUsedSchema) !== null && Ee !== void 0 ? Ee : !0,
      validateSchema: (lt = O.validateSchema) !== null && lt !== void 0 ? lt : !0,
      validateFormats: (Be = O.validateFormats) !== null && Be !== void 0 ? Be : !0,
      unicodeRegExp: (yr = O.unicodeRegExp) !== null && yr !== void 0 ? yr : !0,
      int32range: (gr = O.int32range) !== null && gr !== void 0 ? gr : !0,
      uriResolver: wt
    };
  }
  class D {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...T(b) };
      const { es5: P, lines: S } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: m, es5: P, lines: S }), this.logger = W(b.logger);
      const d = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), x.call(this, _, b, "NOT SUPPORTED"), x.call(this, y, b, "DEPRECATED", "warn"), this._metaOpts = re.call(this), b.formats && le.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && I.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), Y.call(this), b.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: P, schemaId: S } = this.opts;
      let d = u;
      S === "id" && (d = { ...u }, d.id = d.$id, delete d.$id), P && b && this.addMetaSchema(d, d[S], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: P } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[P] || b : void 0;
    }
    validate(b, P) {
      let S;
      if (typeof b == "string") {
        if (S = this.getSchema(b), !S)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        S = this.compile(b);
      const d = S(P);
      return "$async" in S || (this.errors = S.errors), d;
    }
    compile(b, P) {
      const S = this._addSchema(b, P);
      return S.validate || this._compileSchemaEnv(S);
    }
    compileAsync(b, P) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: S } = this.opts;
      return d.call(this, b, P);
      async function d(A, C) {
        await $.call(this, A.$schema);
        const F = this._addSchema(A, C);
        return F.validate || N.call(this, F);
      }
      async function $(A) {
        A && !this.getSchema(A) && await d.call(this, { $ref: A }, !0);
      }
      async function N(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (C) {
          if (!(C instanceof i.default))
            throw C;
          return E.call(this, C), await g.call(this, C.missingSchema), N.call(this, A);
        }
      }
      function E({ missingSchema: A, missingRef: C }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${C} cannot be resolved`);
      }
      async function g(A) {
        const C = await M.call(this, A);
        this.refs[A] || await $.call(this, C.$schema), this.refs[A] || this.addSchema(C, A, P);
      }
      async function M(A) {
        const C = this._loading[A];
        if (C)
          return C;
        try {
          return await (this._loading[A] = S(A));
        } finally {
          delete this._loading[A];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, P, S, d = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const N of b)
          this.addSchema(N, void 0, S, d);
        return this;
      }
      let $;
      if (typeof b == "object") {
        const { schemaId: N } = this.opts;
        if ($ = b[N], $ !== void 0 && typeof $ != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return P = (0, c.normalizeId)(P || $), this._checkUnique(P), this.schemas[P] = this._addSchema(b, S, P, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, P, S = this.opts.validateSchema) {
      return this.addSchema(b, P, !0, S), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, P) {
      if (typeof b == "boolean")
        return !0;
      let S;
      if (S = b.$schema, S !== void 0 && typeof S != "string")
        throw new Error("$schema must be a string");
      if (S = S || this.opts.defaultMeta || this.defaultMeta(), !S)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(S, b);
      if (!d && P) {
        const $ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error($);
        else
          throw new Error($);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let P;
      for (; typeof (P = X.call(this, b)) == "string"; )
        b = P;
      if (P === void 0) {
        const { schemaId: S } = this.opts, d = new a.SchemaEnv({ schema: {}, schemaId: S });
        if (P = a.resolveSchema.call(this, d, b), !P)
          return;
        this.refs[b] = P;
      }
      return P.validate || this._compileSchemaEnv(P);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const P = X.call(this, b);
          return typeof P == "object" && this._cache.delete(P.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const P = b;
          this._cache.delete(P);
          let S = b[this.opts.schemaId];
          return S && (S = (0, c.normalizeId)(S), delete this.schemas[S], delete this.refs[S]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const P of b)
        this.addKeyword(P);
      return this;
    }
    addKeyword(b, P) {
      let S;
      if (typeof b == "string")
        S = b, typeof P == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), P.keyword = S);
      else if (typeof b == "object" && P === void 0) {
        if (P = b, S = P.keyword, Array.isArray(S) && !S.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, S, P), !P)
        return (0, l.eachItem)(S, ($) => L.call(this, $)), this;
      j.call(this, P);
      const d = {
        ...P,
        type: (0, f.getJSONTypes)(P.type),
        schemaType: (0, f.getJSONTypes)(P.schemaType)
      };
      return (0, l.eachItem)(S, d.type.length === 0 ? ($) => L.call(this, $, d) : ($) => d.type.forEach((N) => L.call(this, $, d, N))), this;
    }
    getKeyword(b) {
      const P = this.RULES.all[b];
      return typeof P == "object" ? P.definition : !!P;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: P } = this;
      delete P.keywords[b], delete P.all[b];
      for (const S of P.rules) {
        const d = S.rules.findIndex(($) => $.keyword === b);
        d >= 0 && S.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, P) {
      return typeof P == "string" && (P = new RegExp(P)), this.formats[b] = P, this;
    }
    errorsText(b = this.errors, { separator: P = ", ", dataVar: S = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((d) => `${S}${d.instancePath} ${d.message}`).reduce((d, $) => d + P + $);
    }
    $dataMetaSchema(b, P) {
      const S = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const d of P) {
        const $ = d.split("/").slice(1);
        let N = b;
        for (const E of $)
          N = N[E];
        for (const E in S) {
          const g = S[E];
          if (typeof g != "object")
            continue;
          const { $data: M } = g.definition, A = N[E];
          M && A && (N[E] = V(A));
        }
      }
      return b;
    }
    _removeAllSchemas(b, P) {
      for (const S in b) {
        const d = b[S];
        (!P || P.test(S)) && (typeof d == "string" ? delete b[S] : d && !d.meta && (this._cache.delete(d.schema), delete b[S]));
      }
    }
    _addSchema(b, P, S, d = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
      let N;
      const { schemaId: E } = this.opts;
      if (typeof b == "object")
        N = b[E];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let g = this._cache.get(b);
      if (g !== void 0)
        return g;
      S = (0, c.normalizeId)(N || S);
      const M = c.getSchemaRefs.call(this, b, S);
      return g = new a.SchemaEnv({ schema: b, schemaId: E, meta: P, baseId: S, localRefs: M }), this._cache.set(g.schema, g), $ && !S.startsWith("#") && (S && this._checkUnique(S), this.refs[S] = g), d && this.validateSchema(b, !0), g;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : a.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const P = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, b);
      } finally {
        this.opts = P;
      }
    }
  }
  D.ValidationError = n.default, D.MissingRefError = i.default, e.default = D;
  function x(O, b, P, S = "error") {
    for (const d in O) {
      const $ = d;
      $ in b && this.logger[S](`${P}: option ${d}. ${O[$]}`);
    }
  }
  function X(O) {
    return O = (0, c.normalizeId)(O), this.schemas[O] || this.refs[O];
  }
  function Y() {
    const O = this.opts.schemas;
    if (O)
      if (Array.isArray(O))
        this.addSchema(O);
      else
        for (const b in O)
          this.addSchema(O[b], b);
  }
  function le() {
    for (const O in this.opts.formats) {
      const b = this.opts.formats[O];
      b && this.addFormat(O, b);
    }
  }
  function I(O) {
    if (Array.isArray(O)) {
      this.addVocabulary(O);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in O) {
      const P = O[b];
      P.keyword || (P.keyword = b), this.addKeyword(P);
    }
  }
  function re() {
    const O = { ...this.opts };
    for (const b of v)
      delete O[b];
    return O;
  }
  const H = { log() {
  }, warn() {
  }, error() {
  } };
  function W(O) {
    if (O === !1)
      return H;
    if (O === void 0)
      return console;
    if (O.log && O.warn && O.error)
      return O;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(O, b) {
    const { RULES: P } = this;
    if ((0, l.eachItem)(O, (S) => {
      if (P.keywords[S])
        throw new Error(`Keyword ${S} is already defined`);
      if (!Q.test(S))
        throw new Error(`Keyword ${S} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(O, b, P) {
    var S;
    const d = b == null ? void 0 : b.post;
    if (P && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: $ } = this;
    let N = d ? $.post : $.rules.find(({ type: g }) => g === P);
    if (N || (N = { type: P, rules: [] }, $.rules.push(N)), $.keywords[O] = !0, !b)
      return;
    const E = {
      keyword: O,
      definition: {
        ...b,
        type: (0, f.getJSONTypes)(b.type),
        schemaType: (0, f.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? q.call(this, N, E, b.before) : N.rules.push(E), $.all[O] = E, (S = b.implements) === null || S === void 0 || S.forEach((g) => this.addKeyword(g));
  }
  function q(O, b, P) {
    const S = O.rules.findIndex((d) => d.keyword === P);
    S >= 0 ? O.rules.splice(S, 0, b) : (O.rules.push(b), this.logger.warn(`rule ${P} is not defined`));
  }
  function j(O) {
    let { metaSchema: b } = O;
    b !== void 0 && (O.$data && this.opts.$data && (b = V(b)), O.validateSchema = this.compile(b, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function V(O) {
    return { anyOf: [O, G] };
  }
})(m$);
var _f = {}, Ef = {}, wf = {};
Object.defineProperty(wf, "__esModule", { value: !0 });
const DD = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
wf.default = DD;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.callRef = Cr.getValidate = void 0;
const kD = Fi, Dm = ge, St = fe, ri = Dt, km = ht, La = Z, LD = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: a, opts: o, self: c } = n, { root: f } = s;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = km.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new kD.default(n.opts.uriResolver, i, r);
    if (l instanceof km.SchemaEnv)
      return p(l);
    return h(l);
    function u() {
      if (s === f)
        return oo(e, a, s, s.$async);
      const v = t.scopeValue("root", { ref: f });
      return oo(e, (0, St._)`${v}.validate`, f, f.$async);
    }
    function p(v) {
      const m = sv(e, v);
      oo(e, m, v, v.$async);
    }
    function h(v) {
      const m = t.scopeValue("schema", o.code.source === !0 ? { ref: v, code: (0, St.stringify)(v) } : { ref: v }), _ = t.name("valid"), y = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: St.nil,
        topSchemaRef: m,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(y), e.ok(_);
    }
  }
};
function sv(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, St._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Cr.getValidate = sv;
function oo(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: a, schemaEnv: o, opts: c } = s, f = c.passContext ? ri.default.this : St.nil;
  n ? l() : u();
  function l() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const v = i.let("valid");
    i.try(() => {
      i.code((0, St._)`await ${(0, Dm.callValidateCode)(e, t, f)}`), h(t), a || i.assign(v, !0);
    }, (m) => {
      i.if((0, St._)`!(${m} instanceof ${s.ValidationError})`, () => i.throw(m)), p(m), a || i.assign(v, !1);
    }), e.ok(v);
  }
  function u() {
    e.result((0, Dm.callValidateCode)(e, t, f), () => h(t), () => p(t));
  }
  function p(v) {
    const m = (0, St._)`${v}.errors`;
    i.assign(ri.default.vErrors, (0, St._)`${ri.default.vErrors} === null ? ${m} : ${ri.default.vErrors}.concat(${m})`), i.assign(ri.default.errors, (0, St._)`${ri.default.vErrors}.length`);
  }
  function h(v) {
    var m;
    if (!s.opts.unevaluated)
      return;
    const _ = (m = r == null ? void 0 : r.validate) === null || m === void 0 ? void 0 : m.evaluated;
    if (s.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (s.props = La.mergeEvaluated.props(i, _.props, s.props));
      else {
        const y = i.var("props", (0, St._)`${v}.evaluated.props`);
        s.props = La.mergeEvaluated.props(i, y, s.props, St.Name);
      }
    if (s.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (s.items = La.mergeEvaluated.items(i, _.items, s.items));
      else {
        const y = i.var("items", (0, St._)`${v}.evaluated.items`);
        s.items = La.mergeEvaluated.items(i, y, s.items, St.Name);
      }
  }
}
Cr.callRef = oo;
Cr.default = LD;
Object.defineProperty(Ef, "__esModule", { value: !0 });
const FD = wf, jD = Cr, UD = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  FD.default,
  jD.default
];
Ef.default = UD;
var bf = {}, Sf = {};
Object.defineProperty(Sf, "__esModule", { value: !0 });
const Ao = fe, Br = Ao.operators, Io = {
  maximum: { okStr: "<=", ok: Br.LTE, fail: Br.GT },
  minimum: { okStr: ">=", ok: Br.GTE, fail: Br.LT },
  exclusiveMaximum: { okStr: "<", ok: Br.LT, fail: Br.GTE },
  exclusiveMinimum: { okStr: ">", ok: Br.GT, fail: Br.LTE }
}, MD = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ao.str)`must be ${Io[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ao._)`{comparison: ${Io[e].okStr}, limit: ${t}}`
}, xD = {
  keyword: Object.keys(Io),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: MD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ao._)`${r} ${Io[t].fail} ${n} || isNaN(${r})`);
  }
};
Sf.default = xD;
var Pf = {};
Object.defineProperty(Pf, "__esModule", { value: !0 });
const ms = fe, VD = {
  message: ({ schemaCode: e }) => (0, ms.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, ms._)`{multipleOf: ${e}}`
}, qD = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: VD,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, a = t.let("res"), o = s ? (0, ms._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}` : (0, ms._)`${a} !== parseInt(${a})`;
    e.fail$data((0, ms._)`(${n} === 0 || (${a} = ${r}/${n}, ${o}))`);
  }
};
Pf.default = qD;
var Tf = {}, Rf = {};
Object.defineProperty(Rf, "__esModule", { value: !0 });
function av(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Rf.default = av;
av.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Tf, "__esModule", { value: !0 });
const On = fe, BD = Z, GD = Rf, HD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, On.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, On._)`{limit: ${e}}`
}, zD = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: HD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? On.operators.GT : On.operators.LT, a = i.opts.unicode === !1 ? (0, On._)`${r}.length` : (0, On._)`${(0, BD.useFunc)(e.gen, GD.default)}(${r})`;
    e.fail$data((0, On._)`${a} ${s} ${n}`);
  }
};
Tf.default = zD;
var Nf = {};
Object.defineProperty(Nf, "__esModule", { value: !0 });
const KD = ge, Co = fe, WD = {
  message: ({ schemaCode: e }) => (0, Co.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Co._)`{pattern: ${e}}`
}, YD = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: WD,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, a = s.opts.unicodeRegExp ? "u" : "", o = r ? (0, Co._)`(new RegExp(${i}, ${a}))` : (0, KD.usePattern)(e, n);
    e.fail$data((0, Co._)`!${o}.test(${t})`);
  }
};
Nf.default = YD;
var Of = {};
Object.defineProperty(Of, "__esModule", { value: !0 });
const ys = fe, XD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, ys.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, ys._)`{limit: ${e}}`
}, JD = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: XD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? ys.operators.GT : ys.operators.LT;
    e.fail$data((0, ys._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Of.default = JD;
var Af = {};
Object.defineProperty(Af, "__esModule", { value: !0 });
const ts = ge, gs = fe, QD = Z, ZD = {
  message: ({ params: { missingProperty: e } }) => (0, gs.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, gs._)`{missingProperty: ${e}}`
}, ek = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: ZD,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: a } = e, { opts: o } = a;
    if (!s && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (a.allErrors ? f() : l(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const m of r)
        if ((h == null ? void 0 : h[m]) === void 0 && !v.has(m)) {
          const _ = a.schemaEnv.baseId + a.errSchemaPath, y = `required property "${m}" is not defined at "${_}" (strictRequired)`;
          (0, QD.checkStrictMode)(a, y, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || s)
        e.block$data(gs.nil, u);
      else
        for (const h of r)
          (0, ts.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || s) {
        const v = t.let("valid", !0);
        e.block$data(v, () => p(h, v)), e.ok(v);
      } else
        t.if((0, ts.checkMissingProp)(e, r, h)), (0, ts.reportMissingProp)(e, h), t.else();
    }
    function u() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, ts.noPropertyInData)(t, i, h, o.ownProperties), () => e.error());
      });
    }
    function p(h, v) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(v, (0, ts.propertyInData)(t, i, h, o.ownProperties)), t.if((0, gs.not)(v), () => {
          e.error(), t.break();
        });
      }, gs.nil);
    }
  }
};
Af.default = ek;
var If = {};
Object.defineProperty(If, "__esModule", { value: !0 });
const $s = fe, tk = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, $s.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, $s._)`{limit: ${e}}`
}, rk = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: tk,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? $s.operators.GT : $s.operators.LT;
    e.fail$data((0, $s._)`${r}.length ${i} ${n}`);
  }
};
If.default = rk;
var Cf = {}, ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const ov = fc;
ov.code = 'require("ajv/dist/runtime/equal").default';
ia.default = ov;
Object.defineProperty(Cf, "__esModule", { value: !0 });
const wl = xe, We = fe, nk = Z, ik = ia, sk = {
  message: ({ params: { i: e, j: t } }) => (0, We.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, We._)`{i: ${e}, j: ${t}}`
}, ak = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: sk,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: a, it: o } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = s.items ? (0, wl.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, We._)`${a} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, We._)`${r}.length`), m = t.let("j");
      e.setParams({ i: v, j: m }), t.assign(c, !0), t.if((0, We._)`${v} > 1`, () => (u() ? p : h)(v, m));
    }
    function u() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function p(v, m) {
      const _ = t.name("item"), y = (0, wl.checkDataTypes)(f, _, o.opts.strictNumbers, wl.DataType.Wrong), w = t.const("indices", (0, We._)`{}`);
      t.for((0, We._)`;${v}--;`, () => {
        t.let(_, (0, We._)`${r}[${v}]`), t.if(y, (0, We._)`continue`), f.length > 1 && t.if((0, We._)`typeof ${_} == "string"`, (0, We._)`${_} += "_"`), t.if((0, We._)`typeof ${w}[${_}] == "number"`, () => {
          t.assign(m, (0, We._)`${w}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, We._)`${w}[${_}] = ${v}`);
      });
    }
    function h(v, m) {
      const _ = (0, nk.useFunc)(t, ik.default), y = t.name("outer");
      t.label(y).for((0, We._)`;${v}--;`, () => t.for((0, We._)`${m} = ${v}; ${m}--;`, () => t.if((0, We._)`${_}(${r}[${v}], ${r}[${m}])`, () => {
        e.error(), t.assign(c, !1).break(y);
      })));
    }
  }
};
Cf.default = ak;
var Df = {};
Object.defineProperty(Df, "__esModule", { value: !0 });
const au = fe, ok = Z, ck = ia, lk = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, au._)`{allowedValue: ${e}}`
}, uk = {
  keyword: "const",
  $data: !0,
  error: lk,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, au._)`!${(0, ok.useFunc)(t, ck.default)}(${r}, ${i})`) : e.fail((0, au._)`${s} !== ${r}`);
  }
};
Df.default = uk;
var kf = {};
Object.defineProperty(kf, "__esModule", { value: !0 });
const cs = fe, fk = Z, dk = ia, hk = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, cs._)`{allowedValues: ${e}}`
}, pk = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: hk,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, fk.useFunc)(t, dk.default));
    let l;
    if (o || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", s);
      l = (0, cs.or)(...i.map((v, m) => p(h, m)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", s, (h) => t.if((0, cs._)`${f()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, v) {
      const m = i[v];
      return typeof m == "object" && m !== null ? (0, cs._)`${f()}(${r}, ${h}[${v}])` : (0, cs._)`${r} === ${m}`;
    }
  }
};
kf.default = pk;
Object.defineProperty(bf, "__esModule", { value: !0 });
const mk = Sf, yk = Pf, gk = Tf, $k = Nf, vk = Of, _k = Af, Ek = If, wk = Cf, bk = Df, Sk = kf, Pk = [
  // number
  mk.default,
  yk.default,
  // string
  gk.default,
  $k.default,
  // object
  vk.default,
  _k.default,
  // array
  Ek.default,
  wk.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  bk.default,
  Sk.default
];
bf.default = Pk;
var Lf = {}, ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.validateAdditionalItems = void 0;
const An = fe, ou = Z, Tk = {
  message: ({ params: { len: e } }) => (0, An.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, An._)`{limit: ${e}}`
}, Rk = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Tk,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ou.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    cv(e, n);
  }
};
function cv(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: a } = e;
  a.items = !0;
  const o = r.const("len", (0, An._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, An._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ou.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, An._)`${o} <= ${t.length}`);
    r.if((0, An.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, o, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: ou.Type.Num }, f), a.allErrors || r.if((0, An.not)(f), () => r.break());
    });
  }
}
ji.validateAdditionalItems = cv;
ji.default = Rk;
var Ff = {}, Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
Ui.validateTuple = void 0;
const Lm = fe, co = Z, Nk = ge, Ok = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return lv(e, "additionalItems", t);
    r.items = !0, !(0, co.alwaysValidSchema)(r, t) && e.ok((0, Nk.validateArray)(e));
  }
};
function lv(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: a, it: o } = e;
  l(i), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = co.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), f = n.const("len", (0, Lm._)`${s}.length`);
  r.forEach((u, p) => {
    (0, co.alwaysValidSchema)(o, u) || (n.if((0, Lm._)`${f} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: p, errSchemaPath: h } = o, v = r.length, m = v === u.minItems && (v === u.maxItems || u[t] === !1);
    if (p.strictTuples && !m) {
      const _ = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, co.checkStrictMode)(o, _, p.strictTuples);
    }
  }
}
Ui.validateTuple = lv;
Ui.default = Ok;
Object.defineProperty(Ff, "__esModule", { value: !0 });
const Ak = Ui, Ik = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Ak.validateTuple)(e, "items")
};
Ff.default = Ik;
var jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
const Fm = fe, Ck = Z, Dk = ge, kk = ji, Lk = {
  message: ({ params: { len: e } }) => (0, Fm.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Fm._)`{limit: ${e}}`
}, Fk = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Lk,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, Ck.alwaysValidSchema)(n, t) && (i ? (0, kk.validateAdditionalItems)(e, i) : e.ok((0, Dk.validateArray)(e)));
  }
};
jf.default = Fk;
var Uf = {};
Object.defineProperty(Uf, "__esModule", { value: !0 });
const Ut = fe, Fa = Z, jk = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ut.str)`must contain at least ${e} valid item(s)` : (0, Ut.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ut._)`{minContains: ${e}}` : (0, Ut._)`{minContains: ${e}, maxContains: ${t}}`
}, Uk = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: jk,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let a, o;
    const { minContains: c, maxContains: f } = n;
    s.opts.next ? (a = c === void 0 ? 1 : c, o = f) : a = 1;
    const l = t.const("len", (0, Ut._)`${i}.length`);
    if (e.setParams({ min: a, max: o }), o === void 0 && a === 0) {
      (0, Fa.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && a > o) {
      (0, Fa.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Fa.alwaysValidSchema)(s, r)) {
      let m = (0, Ut._)`${l} >= ${a}`;
      o !== void 0 && (m = (0, Ut._)`${m} && ${l} <= ${o}`), e.pass(m);
      return;
    }
    s.items = !0;
    const u = t.name("valid");
    o === void 0 && a === 1 ? h(u, () => t.if(u, () => t.break())) : a === 0 ? (t.let(u, !0), o !== void 0 && t.if((0, Ut._)`${i}.length > 0`, p)) : (t.let(u, !1), p()), e.result(u, () => e.reset());
    function p() {
      const m = t.name("_valid"), _ = t.let("count", 0);
      h(m, () => t.if(m, () => v(_)));
    }
    function h(m, _) {
      t.forRange("i", 0, l, (y) => {
        e.subschema({
          keyword: "contains",
          dataProp: y,
          dataPropType: Fa.Type.Num,
          compositeRule: !0
        }, m), _();
      });
    }
    function v(m) {
      t.code((0, Ut._)`${m}++`), o === void 0 ? t.if((0, Ut._)`${m} >= ${a}`, () => t.assign(u, !0).break()) : (t.if((0, Ut._)`${m} > ${o}`, () => t.assign(u, !1).break()), a === 1 ? t.assign(u, !0) : t.if((0, Ut._)`${m} >= ${a}`, () => t.assign(u, !0)));
    }
  }
};
Uf.default = Uk;
var mc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = fe, r = Z, n = ge;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = s(c);
      a(c, f), o(c, l);
    }
  };
  function s({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const p = Array.isArray(c[u]) ? f : l;
      p[u] = c[u];
    }
    return [f, l];
  }
  function a(c, f = c.schema) {
    const { gen: l, data: u, it: p } = c;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const v in f) {
      const m = f[v];
      if (m.length === 0)
        continue;
      const _ = (0, n.propertyInData)(l, u, v, p.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: m.length,
        deps: m.join(", ")
      }), p.allErrors ? l.if(_, () => {
        for (const y of m)
          (0, n.checkReportMissingProp)(c, y);
      }) : (l.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, m, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function o(c, f = c.schema) {
    const { gen: l, data: u, keyword: p, it: h } = c, v = l.name("valid");
    for (const m in f)
      (0, r.alwaysValidSchema)(h, f[m]) || (l.if(
        (0, n.propertyInData)(l, u, m, h.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: p, schemaProp: m }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = o, e.default = i;
})(mc);
var Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const uv = fe, Mk = Z, xk = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, uv._)`{propertyName: ${e.propertyName}}`
}, Vk = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: xk,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, Mk.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, s), t.if((0, uv.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Mf.default = Vk;
var yc = {};
Object.defineProperty(yc, "__esModule", { value: !0 });
const ja = ge, zt = fe, qk = Dt, Ua = Z, Bk = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, zt._)`{additionalProperty: ${e.additionalProperty}}`
}, Gk = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Bk,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Ua.alwaysValidSchema)(a, r))
      return;
    const f = (0, ja.allSchemaProperties)(n.properties), l = (0, ja.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, zt._)`${s} === ${qk.default.errors}`);
    function u() {
      t.forIn("key", i, (_) => {
        !f.length && !l.length ? v(_) : t.if(p(_), () => v(_));
      });
    }
    function p(_) {
      let y;
      if (f.length > 8) {
        const w = (0, Ua.schemaRefOrVal)(a, n.properties, "properties");
        y = (0, ja.isOwnProperty)(t, w, _);
      } else f.length ? y = (0, zt.or)(...f.map((w) => (0, zt._)`${_} === ${w}`)) : y = zt.nil;
      return l.length && (y = (0, zt.or)(y, ...l.map((w) => (0, zt._)`${(0, ja.usePattern)(e, w)}.test(${_})`))), (0, zt.not)(y);
    }
    function h(_) {
      t.code((0, zt._)`delete ${i}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Ua.alwaysValidSchema)(a, r)) {
        const y = t.name("valid");
        c.removeAdditional === "failing" ? (m(_, y, !1), t.if((0, zt.not)(y), () => {
          e.reset(), h(_);
        })) : (m(_, y), o || t.if((0, zt.not)(y), () => t.break()));
      }
    }
    function m(_, y, w) {
      const T = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: Ua.Type.Str
      };
      w === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, y);
    }
  }
};
yc.default = Gk;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const Hk = Qt, jm = ge, bl = Z, Um = yc, zk = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Um.default.code(new Hk.KeywordCxt(s, Um.default, "additionalProperties"));
    const a = (0, jm.allSchemaProperties)(r);
    for (const u of a)
      s.definedProperties.add(u);
    s.opts.unevaluated && a.length && s.props !== !0 && (s.props = bl.mergeEvaluated.props(t, (0, bl.toHash)(a), s.props));
    const o = a.filter((u) => !(0, bl.alwaysValidSchema)(s, r[u]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const u of o)
      f(u) ? l(u) : (t.if((0, jm.propertyInData)(t, i, u, s.opts.ownProperties)), l(u), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return s.opts.useDefaults && !s.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
xf.default = zk;
var Vf = {};
Object.defineProperty(Vf, "__esModule", { value: !0 });
const Mm = ge, Ma = fe, xm = Z, Vm = Z, Kk = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: a } = s, o = (0, Mm.allSchemaProperties)(r), c = o.filter((m) => (0, xm.alwaysValidSchema)(s, r[m]));
    if (o.length === 0 || c.length === o.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof Ma.Name) && (s.props = (0, Vm.evaluatedPropsToName)(t, s.props));
    const { props: u } = s;
    p();
    function p() {
      for (const m of o)
        f && h(m), s.allErrors ? v(m) : (t.var(l, !0), v(m), t.if(l));
    }
    function h(m) {
      for (const _ in f)
        new RegExp(m).test(_) && (0, xm.checkStrictMode)(s, `property ${_} matches pattern ${m} (use allowMatchingProperties)`);
    }
    function v(m) {
      t.forIn("key", n, (_) => {
        t.if((0, Ma._)`${(0, Mm.usePattern)(e, m)}.test(${_})`, () => {
          const y = c.includes(m);
          y || e.subschema({
            keyword: "patternProperties",
            schemaProp: m,
            dataProp: _,
            dataPropType: Vm.Type.Str
          }, l), s.opts.unevaluated && u !== !0 ? t.assign((0, Ma._)`${u}[${_}]`, !0) : !y && !s.allErrors && t.if((0, Ma.not)(l), () => t.break());
        });
      });
    }
  }
};
Vf.default = Kk;
var qf = {};
Object.defineProperty(qf, "__esModule", { value: !0 });
const Wk = Z, Yk = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Wk.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
qf.default = Yk;
var Bf = {};
Object.defineProperty(Bf, "__esModule", { value: !0 });
const Xk = ge, Jk = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Xk.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Bf.default = Jk;
var Gf = {};
Object.defineProperty(Gf, "__esModule", { value: !0 });
const lo = fe, Qk = Z, Zk = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, lo._)`{passingSchemas: ${e.passing}}`
}, eL = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Zk,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, a = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      s.forEach((l, u) => {
        let p;
        (0, Qk.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, lo._)`${c} && ${a}`).assign(a, !1).assign(o, (0, lo._)`[${o}, ${u}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(o, u), p && e.mergeEvaluated(p, lo.Name);
        });
      });
    }
  }
};
Gf.default = eL;
var Hf = {};
Object.defineProperty(Hf, "__esModule", { value: !0 });
const tL = Z, rL = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, a) => {
      if ((0, tL.alwaysValidSchema)(n, s))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
Hf.default = rL;
var zf = {};
Object.defineProperty(zf, "__esModule", { value: !0 });
const Do = fe, fv = Z, nL = {
  message: ({ params: e }) => (0, Do.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Do._)`{failingKeyword: ${e.ifClause}}`
}, iL = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: nL,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, fv.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = qm(n, "then"), s = qm(n, "else");
    if (!i && !s)
      return;
    const a = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(o, f("then", l), f("else", l));
    } else i ? t.if(o, f("then")) : t.if((0, Do.not)(o), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const p = e.subschema({ keyword: l }, o);
        t.assign(a, o), e.mergeValidEvaluated(p, a), u ? t.assign(u, (0, Do._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function qm(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, fv.alwaysValidSchema)(e, r);
}
zf.default = iL;
var Kf = {};
Object.defineProperty(Kf, "__esModule", { value: !0 });
const sL = Z, aL = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, sL.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Kf.default = aL;
Object.defineProperty(Lf, "__esModule", { value: !0 });
const oL = ji, cL = Ff, lL = Ui, uL = jf, fL = Uf, dL = mc, hL = Mf, pL = yc, mL = xf, yL = Vf, gL = qf, $L = Bf, vL = Gf, _L = Hf, EL = zf, wL = Kf;
function bL(e = !1) {
  const t = [
    // any
    gL.default,
    $L.default,
    vL.default,
    _L.default,
    EL.default,
    wL.default,
    // object
    hL.default,
    pL.default,
    dL.default,
    mL.default,
    yL.default
  ];
  return e ? t.push(cL.default, uL.default) : t.push(oL.default, lL.default), t.push(fL.default), t;
}
Lf.default = bL;
var Wf = {}, Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.dynamicAnchor = void 0;
const Sl = fe, SL = Dt, Bm = ht, PL = Cr, TL = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => dv(e, e.schema)
};
function dv(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Sl._)`${SL.default.dynamicAnchors}${(0, Sl.getProperty)(t)}`, s = n.errSchemaPath === "#" ? n.validateName : RL(e);
  r.if((0, Sl._)`!${i}`, () => r.assign(i, s));
}
Mi.dynamicAnchor = dv;
function RL(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: s, localRefs: a, meta: o } = t.root, { schemaId: c } = n.opts, f = new Bm.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: s, localRefs: a, meta: o });
  return Bm.compileSchema.call(n, f), (0, PL.getValidate)(e, f);
}
Mi.default = TL;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.dynamicRef = void 0;
const Gm = fe, NL = Dt, Hm = Cr, OL = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => hv(e, e.schema)
};
function hv(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const s = t.slice(1);
  if (i.allErrors)
    a();
  else {
    const c = r.let("valid", !1);
    a(c), e.ok(c);
  }
  function a(c) {
    if (i.schemaEnv.root.dynamicAnchors[s]) {
      const f = r.let("_v", (0, Gm._)`${NL.default.dynamicAnchors}${(0, Gm.getProperty)(s)}`);
      r.if(f, o(f, c), o(i.validateName, c));
    } else
      o(i.validateName, c)();
  }
  function o(c, f) {
    return f ? () => r.block(() => {
      (0, Hm.callRef)(e, c), r.let(f, !0);
    }) : () => (0, Hm.callRef)(e, c);
  }
}
xi.dynamicRef = hv;
xi.default = OL;
var Yf = {};
Object.defineProperty(Yf, "__esModule", { value: !0 });
const AL = Mi, IL = Z, CL = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, AL.dynamicAnchor)(e, "") : (0, IL.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Yf.default = CL;
var Xf = {};
Object.defineProperty(Xf, "__esModule", { value: !0 });
const DL = xi, kL = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, DL.dynamicRef)(e, e.schema)
};
Xf.default = kL;
Object.defineProperty(Wf, "__esModule", { value: !0 });
const LL = Mi, FL = xi, jL = Yf, UL = Xf, ML = [LL.default, FL.default, jL.default, UL.default];
Wf.default = ML;
var Jf = {}, Qf = {};
Object.defineProperty(Qf, "__esModule", { value: !0 });
const zm = mc, xL = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: zm.error,
  code: (e) => (0, zm.validatePropertyDeps)(e)
};
Qf.default = xL;
var Zf = {};
Object.defineProperty(Zf, "__esModule", { value: !0 });
const VL = mc, qL = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, VL.validateSchemaDeps)(e)
};
Zf.default = qL;
var ed = {};
Object.defineProperty(ed, "__esModule", { value: !0 });
const BL = Z, GL = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, BL.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
ed.default = GL;
Object.defineProperty(Jf, "__esModule", { value: !0 });
const HL = Qf, zL = Zf, KL = ed, WL = [HL.default, zL.default, KL.default];
Jf.default = WL;
var td = {}, rd = {};
Object.defineProperty(rd, "__esModule", { value: !0 });
const Kr = fe, Km = Z, YL = Dt, XL = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Kr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, JL = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: XL,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: s } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: a, props: o } = s;
    o instanceof Kr.Name ? t.if((0, Kr._)`${o} !== true`, () => t.forIn("key", n, (u) => t.if(f(o, u), () => c(u)))) : o !== !0 && t.forIn("key", n, (u) => o === void 0 ? c(u) : t.if(l(o, u), () => c(u))), s.props = !0, e.ok((0, Kr._)`${i} === ${YL.default.errors}`);
    function c(u) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), a || t.break();
        return;
      }
      if (!(0, Km.alwaysValidSchema)(s, r)) {
        const p = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: Km.Type.Str
        }, p), a || t.if((0, Kr.not)(p), () => t.break());
      }
    }
    function f(u, p) {
      return (0, Kr._)`!${u} || !${u}[${p}]`;
    }
    function l(u, p) {
      const h = [];
      for (const v in u)
        u[v] === !0 && h.push((0, Kr._)`${p} !== ${v}`);
      return (0, Kr.and)(...h);
    }
  }
};
rd.default = JL;
var nd = {};
Object.defineProperty(nd, "__esModule", { value: !0 });
const In = fe, Wm = Z, QL = {
  message: ({ params: { len: e } }) => (0, In.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, In._)`{limit: ${e}}`
}, ZL = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: QL,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, s = i.items || 0;
    if (s === !0)
      return;
    const a = t.const("len", (0, In._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: s }), e.fail((0, In._)`${a} > ${s}`);
    else if (typeof r == "object" && !(0, Wm.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, In._)`${a} <= ${s}`);
      t.if((0, In.not)(c), () => o(c, s)), e.ok(c);
    }
    i.items = !0;
    function o(c, f) {
      t.forRange("i", f, a, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Wm.Type.Num }, c), i.allErrors || t.if((0, In.not)(c), () => t.break());
      });
    }
  }
};
nd.default = ZL;
Object.defineProperty(td, "__esModule", { value: !0 });
const eF = rd, tF = nd, rF = [eF.default, tF.default];
td.default = rF;
var id = {}, sd = {};
Object.defineProperty(sd, "__esModule", { value: !0 });
const Fe = fe, nF = {
  message: ({ schemaCode: e }) => (0, Fe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Fe._)`{format: ${e}}`
}, iF = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: nF,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: a, it: o } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = o;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const v = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), m = r.const("fDef", (0, Fe._)`${v}[${a}]`), _ = r.let("fType"), y = r.let("format");
      r.if((0, Fe._)`typeof ${m} == "object" && !(${m} instanceof RegExp)`, () => r.assign(_, (0, Fe._)`${m}.type || "string"`).assign(y, (0, Fe._)`${m}.validate`), () => r.assign(_, (0, Fe._)`"string"`).assign(y, m)), e.fail$data((0, Fe.or)(w(), T()));
      function w() {
        return c.strictSchema === !1 ? Fe.nil : (0, Fe._)`${a} && !${y}`;
      }
      function T() {
        const D = l.$async ? (0, Fe._)`(${m}.async ? await ${y}(${n}) : ${y}(${n}))` : (0, Fe._)`${y}(${n})`, x = (0, Fe._)`(typeof ${y} == "function" ? ${D} : ${y}.test(${n}))`;
        return (0, Fe._)`${y} && ${y} !== true && ${_} === ${t} && !${x}`;
      }
    }
    function h() {
      const v = u.formats[s];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [m, _, y] = T(v);
      m === t && e.pass(D());
      function w() {
        if (c.strictSchema === !1) {
          u.logger.warn(x());
          return;
        }
        throw new Error(x());
        function x() {
          return `unknown format "${s}" ignored in schema at path "${f}"`;
        }
      }
      function T(x) {
        const X = x instanceof RegExp ? (0, Fe.regexpCode)(x) : c.code.formats ? (0, Fe._)`${c.code.formats}${(0, Fe.getProperty)(s)}` : void 0, Y = r.scopeValue("formats", { key: s, ref: x, code: X });
        return typeof x == "object" && !(x instanceof RegExp) ? [x.type || "string", x.validate, (0, Fe._)`${Y}.validate`] : ["string", x, Y];
      }
      function D() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Fe._)`await ${y}(${n})`;
        }
        return typeof _ == "function" ? (0, Fe._)`${y}(${n})` : (0, Fe._)`${y}.test(${n})`;
      }
    }
  }
};
sd.default = iF;
Object.defineProperty(id, "__esModule", { value: !0 });
const sF = sd, aF = [sF.default];
id.default = aF;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.contentVocabulary = Oi.metadataVocabulary = void 0;
Oi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Oi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(_f, "__esModule", { value: !0 });
const oF = Ef, cF = bf, lF = Lf, uF = Wf, fF = Jf, dF = td, hF = id, Ym = Oi, pF = [
  uF.default,
  oF.default,
  cF.default,
  (0, lF.default)(!0),
  hF.default,
  Ym.metadataVocabulary,
  Ym.contentVocabulary,
  fF.default,
  dF.default
];
_f.default = pF;
var ad = {}, gc = {};
Object.defineProperty(gc, "__esModule", { value: !0 });
gc.DiscrError = void 0;
var Xm;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Xm || (gc.DiscrError = Xm = {}));
Object.defineProperty(ad, "__esModule", { value: !0 });
const ai = fe, cu = gc, Jm = ht, mF = Fi, yF = Z, gF = {
  message: ({ params: { discrError: e, tagName: t } }) => e === cu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ai._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, $F = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: gF,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: a } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, ai._)`${r}${(0, ai.getProperty)(o)}`);
    t.if((0, ai._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: cu.DiscrError.Tag, tag: f, tagName: o })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const v in h)
        t.elseIf((0, ai._)`${f} === ${v}`), t.assign(c, u(h[v]));
      t.else(), e.error(!1, { discrError: cu.DiscrError.Mapping, tag: f, tagName: o }), t.endIf();
    }
    function u(h) {
      const v = t.name("valid"), m = e.subschema({ keyword: "oneOf", schemaProp: h }, v);
      return e.mergeEvaluated(m, ai.Name), v;
    }
    function p() {
      var h;
      const v = {}, m = y(i);
      let _ = !0;
      for (let D = 0; D < a.length; D++) {
        let x = a[D];
        if (x != null && x.$ref && !(0, yF.schemaHasRulesButRef)(x, s.self.RULES)) {
          const Y = x.$ref;
          if (x = Jm.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, Y), x instanceof Jm.SchemaEnv && (x = x.schema), x === void 0)
            throw new mF.default(s.opts.uriResolver, s.baseId, Y);
        }
        const X = (h = x == null ? void 0 : x.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof X != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        _ = _ && (m || y(x)), w(X, D);
      }
      if (!_)
        throw new Error(`discriminator: "${o}" must be required`);
      return v;
      function y({ required: D }) {
        return Array.isArray(D) && D.includes(o);
      }
      function w(D, x) {
        if (D.const)
          T(D.const, x);
        else if (D.enum)
          for (const X of D.enum)
            T(X, x);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function T(D, x) {
        if (typeof D != "string" || D in v)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        v[D] = x;
      }
    }
  }
};
ad.default = $F;
var od = {};
const vF = "https://json-schema.org/draft/2020-12/schema", _F = "https://json-schema.org/draft/2020-12/schema", EF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, wF = "meta", bF = "Core and Validation specifications meta-schema", SF = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], PF = [
  "object",
  "boolean"
], TF = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", RF = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, NF = {
  $schema: vF,
  $id: _F,
  $vocabulary: EF,
  $dynamicAnchor: wF,
  title: bF,
  allOf: SF,
  type: PF,
  $comment: TF,
  properties: RF
}, OF = "https://json-schema.org/draft/2020-12/schema", AF = "https://json-schema.org/draft/2020-12/meta/applicator", IF = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, CF = "meta", DF = "Applicator vocabulary meta-schema", kF = [
  "object",
  "boolean"
], LF = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, FF = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, jF = {
  $schema: OF,
  $id: AF,
  $vocabulary: IF,
  $dynamicAnchor: CF,
  title: DF,
  type: kF,
  properties: LF,
  $defs: FF
}, UF = "https://json-schema.org/draft/2020-12/schema", MF = "https://json-schema.org/draft/2020-12/meta/unevaluated", xF = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, VF = "meta", qF = "Unevaluated applicator vocabulary meta-schema", BF = [
  "object",
  "boolean"
], GF = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, HF = {
  $schema: UF,
  $id: MF,
  $vocabulary: xF,
  $dynamicAnchor: VF,
  title: qF,
  type: BF,
  properties: GF
}, zF = "https://json-schema.org/draft/2020-12/schema", KF = "https://json-schema.org/draft/2020-12/meta/content", WF = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, YF = "meta", XF = "Content vocabulary meta-schema", JF = [
  "object",
  "boolean"
], QF = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, ZF = {
  $schema: zF,
  $id: KF,
  $vocabulary: WF,
  $dynamicAnchor: YF,
  title: XF,
  type: JF,
  properties: QF
}, ej = "https://json-schema.org/draft/2020-12/schema", tj = "https://json-schema.org/draft/2020-12/meta/core", rj = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, nj = "meta", ij = "Core vocabulary meta-schema", sj = [
  "object",
  "boolean"
], aj = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, oj = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, cj = {
  $schema: ej,
  $id: tj,
  $vocabulary: rj,
  $dynamicAnchor: nj,
  title: ij,
  type: sj,
  properties: aj,
  $defs: oj
}, lj = "https://json-schema.org/draft/2020-12/schema", uj = "https://json-schema.org/draft/2020-12/meta/format-annotation", fj = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, dj = "meta", hj = "Format vocabulary meta-schema for annotation results", pj = [
  "object",
  "boolean"
], mj = {
  format: {
    type: "string"
  }
}, yj = {
  $schema: lj,
  $id: uj,
  $vocabulary: fj,
  $dynamicAnchor: dj,
  title: hj,
  type: pj,
  properties: mj
}, gj = "https://json-schema.org/draft/2020-12/schema", $j = "https://json-schema.org/draft/2020-12/meta/meta-data", vj = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, _j = "meta", Ej = "Meta-data vocabulary meta-schema", wj = [
  "object",
  "boolean"
], bj = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, Sj = {
  $schema: gj,
  $id: $j,
  $vocabulary: vj,
  $dynamicAnchor: _j,
  title: Ej,
  type: wj,
  properties: bj
}, Pj = "https://json-schema.org/draft/2020-12/schema", Tj = "https://json-schema.org/draft/2020-12/meta/validation", Rj = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, Nj = "meta", Oj = "Validation vocabulary meta-schema", Aj = [
  "object",
  "boolean"
], Ij = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, Cj = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, Dj = {
  $schema: Pj,
  $id: Tj,
  $vocabulary: Rj,
  $dynamicAnchor: Nj,
  title: Oj,
  type: Aj,
  properties: Ij,
  $defs: Cj
};
Object.defineProperty(od, "__esModule", { value: !0 });
const kj = NF, Lj = jF, Fj = HF, jj = ZF, Uj = cj, Mj = yj, xj = Sj, Vj = Dj, qj = ["/properties"];
function Bj(e) {
  return [
    kj,
    Lj,
    Fj,
    jj,
    Uj,
    t(this, Mj),
    xj,
    t(this, Vj)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, qj) : n;
  }
}
od.default = Bj;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = m$, n = _f, i = ad, s = od, a = "https://json-schema.org/draft/2020-12/schema";
  class o extends r.default {
    constructor(h = {}) {
      super({
        ...h,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: h, meta: v } = this.opts;
      v && (s.default.call(this, h), this.refs["http://json-schema.org/schema"] = a);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv2020 = o, e.exports = t = o, e.exports.Ajv2020 = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  var c = Qt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var f = fe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var l = na;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = Fi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(tu, tu.exports);
var Gj = tu.exports, lu = { exports: {} }, pv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(H, W) {
    return { validate: H, compare: W };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), f),
    "date-time": t(p(!0), h),
    "iso-time": t(c(), l),
    "iso-date-time": t(p(), v),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: y,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: re,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: T,
    // signed 32 bit integer
    int32: { type: "number", validate: X },
    // signed 64 bit integer
    int64: { type: "number", validate: Y },
    // C-type float
    float: { type: "number", validate: le },
    // C-type double
    double: { type: "number", validate: le },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, v),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(H) {
    return H % 4 === 0 && (H % 100 !== 0 || H % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(H) {
    const W = n.exec(H);
    if (!W)
      return !1;
    const Q = +W[1], k = +W[2], L = +W[3];
    return k >= 1 && k <= 12 && L >= 1 && L <= (k === 2 && r(Q) ? 29 : i[k]);
  }
  function a(H, W) {
    if (H && W)
      return H > W ? 1 : H < W ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(H) {
    return function(Q) {
      const k = o.exec(Q);
      if (!k)
        return !1;
      const L = +k[1], q = +k[2], j = +k[3], G = k[4], V = k[5] === "-" ? -1 : 1, O = +(k[6] || 0), b = +(k[7] || 0);
      if (O > 23 || b > 59 || H && !G)
        return !1;
      if (L <= 23 && q <= 59 && j < 60)
        return !0;
      const P = q - b * V, S = L - O * V - (P < 0 ? 1 : 0);
      return (S === 23 || S === -1) && (P === 59 || P === -1) && j < 61;
    };
  }
  function f(H, W) {
    if (!(H && W))
      return;
    const Q = (/* @__PURE__ */ new Date("2020-01-01T" + H)).valueOf(), k = (/* @__PURE__ */ new Date("2020-01-01T" + W)).valueOf();
    if (Q && k)
      return Q - k;
  }
  function l(H, W) {
    if (!(H && W))
      return;
    const Q = o.exec(H), k = o.exec(W);
    if (Q && k)
      return H = Q[1] + Q[2] + Q[3], W = k[1] + k[2] + k[3], H > W ? 1 : H < W ? -1 : 0;
  }
  const u = /t|\s/i;
  function p(H) {
    const W = c(H);
    return function(k) {
      const L = k.split(u);
      return L.length === 2 && s(L[0]) && W(L[1]);
    };
  }
  function h(H, W) {
    if (!(H && W))
      return;
    const Q = new Date(H).valueOf(), k = new Date(W).valueOf();
    if (Q && k)
      return Q - k;
  }
  function v(H, W) {
    if (!(H && W))
      return;
    const [Q, k] = H.split(u), [L, q] = W.split(u), j = a(Q, L);
    if (j !== void 0)
      return j || f(k, q);
  }
  const m = /\/|:/, _ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function y(H) {
    return m.test(H) && _.test(H);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function T(H) {
    return w.lastIndex = 0, w.test(H);
  }
  const D = -2147483648, x = 2 ** 31 - 1;
  function X(H) {
    return Number.isInteger(H) && H <= x && H >= D;
  }
  function Y(H) {
    return Number.isInteger(H);
  }
  function le() {
    return !0;
  }
  const I = /[^\\]\\Z/;
  function re(H) {
    if (I.test(H))
      return !1;
    try {
      return new RegExp(H), !0;
    } catch {
      return !1;
    }
  }
})(pv);
var mv = {}, uu = { exports: {} }, yv = {}, br = {}, bn = {}, sa = {}, ye = {}, xs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((T, D) => `${T}${D}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((T, D) => (D instanceof r && (T[D.str] = (T[D.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(y, ...w) {
    const T = [y[0]];
    let D = 0;
    for (; D < w.length; )
      o(T, w[D]), T.push(y[++D]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function a(y, ...w) {
    const T = [h(y[0])];
    let D = 0;
    for (; D < w.length; )
      T.push(s), o(T, w[D]), T.push(s, h(y[++D]));
    return c(T), new n(T);
  }
  e.str = a;
  function o(y, w) {
    w instanceof n ? y.push(...w._items) : w instanceof r ? y.push(w) : y.push(u(w));
  }
  e.addCodeArg = o;
  function c(y) {
    let w = 1;
    for (; w < y.length - 1; ) {
      if (y[w] === s) {
        const T = f(y[w - 1], y[w + 1]);
        if (T !== void 0) {
          y.splice(w - 1, 3, T);
          continue;
        }
        y[w++] = "+";
      }
      w++;
    }
  }
  function f(y, w) {
    if (w === '""')
      return y;
    if (y === '""')
      return w;
    if (typeof y == "string")
      return w instanceof r || y[y.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${y.slice(0, -1)}${w}"` : w[0] === '"' ? y.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(y instanceof r))
      return `"${y}${w.slice(1)}`;
  }
  function l(y, w) {
    return w.emptyStr() ? y : y.emptyStr() ? w : a`${y}${w}`;
  }
  e.strConcat = l;
  function u(y) {
    return typeof y == "number" || typeof y == "boolean" || y === null ? y : h(Array.isArray(y) ? y.join(",") : y);
  }
  function p(y) {
    return new n(h(y));
  }
  e.stringify = p;
  function h(y) {
    return JSON.stringify(y).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function v(y) {
    return typeof y == "string" && e.IDENTIFIER.test(y) ? new n(`.${y}`) : i`[${y}]`;
  }
  e.getProperty = v;
  function m(y) {
    if (typeof y == "string" && e.IDENTIFIER.test(y))
      return new n(`${y}`);
    throw new Error(`CodeGen: invalid export name: ${y}, use explicit $id name mapping`);
  }
  e.getEsmExportName = m;
  function _(y) {
    return new n(y.toString());
  }
  e.regexpCode = _;
})(xs);
var fu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = xs;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = s;
  const a = (0, t._)`\n`;
  class o extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new s(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(f), { prefix: h } = p, v = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let m = this._values[h];
      if (m) {
        const w = m.get(v);
        if (w)
          return w;
      } else
        m = this._values[h] = /* @__PURE__ */ new Map();
      m.set(v, p);
      const _ = this._scope[h] || (this._scope[h] = []), y = _.length;
      return _[y] = l.ref, p.setValue(l, { property: h, itemIndex: y }), p;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, p) {
      let h = t.nil;
      for (const v in f) {
        const m = f[v];
        if (!m)
          continue;
        const _ = u[v] = u[v] || /* @__PURE__ */ new Map();
        m.forEach((y) => {
          if (_.has(y))
            return;
          _.set(y, n.Started);
          let w = l(y);
          if (w) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${T} ${y} = ${w};${this.opts._n}`;
          } else if (w = p == null ? void 0 : p(y))
            h = (0, t._)`${h}${w}${this.opts._n}`;
          else
            throw new r(y);
          _.set(y, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(fu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = xs, r = fu;
  var n = xs;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = fu;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, $) {
      return this;
    }
  }
  class a extends s {
    constructor(d, $, N) {
      super(), this.varKind = d, this.name = $, this.rhs = N;
    }
    render({ es5: d, _n: $ }) {
      const N = d ? r.varKinds.var : this.varKind, E = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${E};` + $;
    }
    optimizeNames(d, $) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, d, $)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends s {
    constructor(d, $, N) {
      super(), this.lhs = d, this.rhs = $, this.sideEffects = N;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, $) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, d, $), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(d, this.rhs);
    }
  }
  class c extends o {
    constructor(d, $, N, E) {
      super(d, N, E), this.op = $;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class p extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, $) {
      return this.code = k(this.code, d, $), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce(($, N) => $ + N.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let $ = d.length;
      for (; $--; ) {
        const N = d[$].optimizeNodes();
        Array.isArray(N) ? d.splice($, 1, ...N) : N ? d[$] = N : d.splice($, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, $) {
      const { nodes: N } = this;
      let E = N.length;
      for (; E--; ) {
        const g = N[E];
        g.optimizeNames(d, $) || (L(d, g.names), N.splice(E, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => W(d, $.names), {});
    }
  }
  class v extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class m extends h {
  }
  class _ extends v {
  }
  _.kind = "else";
  class y extends v {
    constructor(d, $) {
      super($), this.condition = d;
    }
    render(d) {
      let $ = `if(${this.condition})` + super.render(d);
      return this.else && ($ += "else " + this.else.render(d)), $;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let $ = this.else;
      if ($) {
        const N = $.optimizeNodes();
        $ = this.else = Array.isArray(N) ? new _(N) : N;
      }
      if ($)
        return d === !1 ? $ instanceof y ? $ : $.nodes : this.nodes.length ? this : new y(q(d), $ instanceof y ? [$] : $.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, $) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(d, $), !!(super.optimizeNames(d, $) || this.else))
        return this.condition = k(this.condition, d, $), this;
    }
    get names() {
      const d = super.names;
      return Q(d, this.condition), this.else && W(d, this.else.names), d;
    }
  }
  y.kind = "if";
  class w extends v {
  }
  w.kind = "for";
  class T extends w {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iteration = k(this.iteration, d, $), this;
    }
    get names() {
      return W(super.names, this.iteration.names);
    }
  }
  class D extends w {
    constructor(d, $, N, E) {
      super(), this.varKind = d, this.name = $, this.from = N, this.to = E;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: N, from: E, to: g } = this;
      return `for(${$} ${N}=${E}; ${N}<${g}; ${N}++)` + super.render(d);
    }
    get names() {
      const d = Q(super.names, this.from);
      return Q(d, this.to);
    }
  }
  class x extends w {
    constructor(d, $, N, E) {
      super(), this.loop = d, this.varKind = $, this.name = N, this.iterable = E;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, $) {
      if (super.optimizeNames(d, $))
        return this.iterable = k(this.iterable, d, $), this;
    }
    get names() {
      return W(super.names, this.iterable.names);
    }
  }
  class X extends v {
    constructor(d, $, N) {
      super(), this.name = d, this.args = $, this.async = N;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  X.kind = "func";
  class Y extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  Y.kind = "return";
  class le extends v {
    render(d) {
      let $ = "try" + super.render(d);
      return this.catch && ($ += this.catch.render(d)), this.finally && ($ += this.finally.render(d)), $;
    }
    optimizeNodes() {
      var d, $;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), ($ = this.finally) === null || $ === void 0 || $.optimizeNodes(), this;
    }
    optimizeNames(d, $) {
      var N, E;
      return super.optimizeNames(d, $), (N = this.catch) === null || N === void 0 || N.optimizeNames(d, $), (E = this.finally) === null || E === void 0 || E.optimizeNames(d, $), this;
    }
    get names() {
      const d = super.names;
      return this.catch && W(d, this.catch.names), this.finally && W(d, this.finally.names), d;
    }
  }
  class I extends v {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  I.kind = "catch";
  class re extends v {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  re.kind = "finally";
  class H {
    constructor(d, $ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...$, _n: $.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new m()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, $) {
      const N = this._extScope.value(d, $);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(d, $) {
      return this._extScope.getValue(d, $);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, $, N, E) {
      const g = this._scope.toName($);
      return N !== void 0 && E && (this._constants[g.str] = N), this._leafNode(new a(d, g, N)), g;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, $, N) {
      return this._def(r.varKinds.const, d, $, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, $, N) {
      return this._def(r.varKinds.let, d, $, N);
    }
    // `var` declaration with optional assignment
    var(d, $, N) {
      return this._def(r.varKinds.var, d, $, N);
    }
    // assignment code
    assign(d, $, N) {
      return this._leafNode(new o(d, $, N));
    }
    // `+=` code
    add(d, $) {
      return this._leafNode(new c(d, e.operators.ADD, $));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new p(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const $ = ["{"];
      for (const [N, E] of d)
        $.length > 1 && $.push(","), $.push(N), (N !== E || this.opts.es5) && ($.push(":"), (0, t.addCodeArg)($, E));
      return $.push("}"), new t._Code($);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, $, N) {
      if (this._blockNode(new y(d)), $ && N)
        this.code($).else().code(N).endIf();
      else if ($)
        this.code($).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new y(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(y, _);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new T(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, N, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const M = this._scope.toName(d);
      return this._for(new D(g, M, $, N), () => E(M));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, N, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const M = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${M}.length`, (A) => {
          this.var(g, (0, t._)`${M}[${A}]`), N(g);
        });
      }
      return this._for(new x("of", E, g, $), () => N(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, N, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, N);
      const g = this._scope.toName(d);
      return this._for(new x("in", E, g, $), () => N(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new f(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new Y();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(d, $, N) {
      if (!$ && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new le();
      if (this._blockNode(E), this.code(d), $) {
        const g = this.name("e");
        this._currNode = E.catch = new I(g), $(g);
      }
      return N && (this._currNode = E.finally = new re(), this.code(N)), this._endBlockNode(I, re);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new u(d));
    }
    // start self-balancing block
    block(d, $) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock($), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const $ = this._blockStarts.pop();
      if ($ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - $;
      if (N < 0 || d !== void 0 && N !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${d} expected`);
      return this._nodes.length = $, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, $ = t.nil, N, E) {
      return this._blockNode(new X(d, $, N)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(X);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, $) {
      const N = this._currNode;
      if (N instanceof d || $ && N instanceof $)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${$ ? `${d.kind}/${$.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const $ = this._currNode;
      if (!($ instanceof y))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = $.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const $ = this._nodes;
      $[$.length - 1] = d;
    }
  }
  e.CodeGen = H;
  function W(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) + (d[$] || 0);
    return S;
  }
  function Q(S, d) {
    return d instanceof t._CodeOrName ? W(S, d.names) : S;
  }
  function k(S, d, $) {
    if (S instanceof t.Name)
      return N(S);
    if (!E(S))
      return S;
    return new t._Code(S._items.reduce((g, M) => (M instanceof t.Name && (M = N(M)), M instanceof t._Code ? g.push(...M._items) : g.push(M), g), []));
    function N(g) {
      const M = $[g.str];
      return M === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], M);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((M) => M instanceof t.Name && d[M.str] === 1 && $[M.str] !== void 0);
    }
  }
  function L(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) - (d[$] || 0);
  }
  function q(S) {
    return typeof S == "boolean" || typeof S == "number" || S === null ? !S : (0, t._)`!${P(S)}`;
  }
  e.not = q;
  const j = b(e.operators.AND);
  function G(...S) {
    return S.reduce(j);
  }
  e.and = G;
  const V = b(e.operators.OR);
  function O(...S) {
    return S.reduce(V);
  }
  e.or = O;
  function b(S) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${P(d)} ${S} ${P($)}`;
  }
  function P(S) {
    return S instanceof t.Name ? S : (0, t._)`(${S})`;
  }
})(ye);
var ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
const be = ye, Hj = xs;
function zj(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
ee.toHash = zj;
function Kj(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (gv(e, t), !$v(t, e.self.RULES.all));
}
ee.alwaysValidSchema = Kj;
function gv(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || Ev(e, `unknown keyword: "${s}"`);
}
ee.checkUnknownRules = gv;
function $v(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
ee.schemaHasRules = $v;
function Wj(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
ee.schemaHasRulesButRef = Wj;
function Yj({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, be._)`${r}`;
  }
  return (0, be._)`${e}${t}${(0, be.getProperty)(n)}`;
}
ee.schemaRefOrVal = Yj;
function Xj(e) {
  return vv(decodeURIComponent(e));
}
ee.unescapeFragment = Xj;
function Jj(e) {
  return encodeURIComponent(cd(e));
}
ee.escapeFragment = Jj;
function cd(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
ee.escapeJsonPointer = cd;
function vv(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
ee.unescapeJsonPointer = vv;
function Qj(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
ee.eachItem = Qj;
function Qm({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, a, o) => {
    const c = a === void 0 ? s : a instanceof be.Name ? (s instanceof be.Name ? e(i, s, a) : t(i, s, a), a) : s instanceof be.Name ? (t(i, a, s), s) : r(s, a);
    return o === be.Name && !(c instanceof be.Name) ? n(i, c) : c;
  };
}
ee.mergeEvaluated = {
  props: Qm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, be._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, be._)`${r} || {}`).code((0, be._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, be._)`${r} || {}`), ld(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: _v
  }),
  items: Qm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, be._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, be._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function _v(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, be._)`{}`);
  return t !== void 0 && ld(e, r, t), r;
}
ee.evaluatedPropsToName = _v;
function ld(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, be._)`${t}${(0, be.getProperty)(n)}`, !0));
}
ee.setEvaluated = ld;
const Zm = {};
function Zj(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Zm[t.code] || (Zm[t.code] = new Hj._Code(t.code))
  });
}
ee.useFunc = Zj;
var du;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(du || (ee.Type = du = {}));
function eU(e, t, r) {
  if (e instanceof be.Name) {
    const n = t === du.Num;
    return r ? n ? (0, be._)`"[" + ${e} + "]"` : (0, be._)`"['" + ${e} + "']"` : n ? (0, be._)`"/" + ${e}` : (0, be._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, be.getProperty)(e).toString() : "/" + cd(e);
}
ee.getErrorPath = eU;
function Ev(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
ee.checkStrictMode = Ev;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
const it = ye, tU = {
  // validation function arguments
  data: new it.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new it.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new it.Name("instancePath"),
  parentData: new it.Name("parentData"),
  parentDataProperty: new it.Name("parentDataProperty"),
  rootData: new it.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new it.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new it.Name("vErrors"),
  // null or array of validation errors
  errors: new it.Name("errors"),
  // counter of validation errors
  this: new it.Name("this"),
  // "globals"
  self: new it.Name("self"),
  scope: new it.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new it.Name("json"),
  jsonPos: new it.Name("jsonPos"),
  jsonLen: new it.Name("jsonLen"),
  jsonPart: new it.Name("jsonPart")
};
mr.default = tU;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ye, r = ee, n = mr;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: y }) => y ? (0, t.str)`"${_}" keyword must be ${y} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, y = e.keywordError, w, T) {
    const { it: D } = _, { gen: x, compositeRule: X, allErrors: Y } = D, le = u(_, y, w);
    T ?? (X || Y) ? c(x, le) : f(D, (0, t._)`[${le}]`);
  }
  e.reportError = i;
  function s(_, y = e.keywordError, w) {
    const { it: T } = _, { gen: D, compositeRule: x, allErrors: X } = T, Y = u(_, y, w);
    c(D, Y), x || X || f(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function a(_, y) {
    _.assign(n.default.errors, y), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(y, () => _.assign((0, t._)`${n.default.vErrors}.length`, y), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function o({ gen: _, keyword: y, schemaValue: w, data: T, errsCount: D, it: x }) {
    if (D === void 0)
      throw new Error("ajv implementation error");
    const X = _.name("err");
    _.forRange("i", D, n.default.errors, (Y) => {
      _.const(X, (0, t._)`${n.default.vErrors}[${Y}]`), _.if((0, t._)`${X}.instancePath === undefined`, () => _.assign((0, t._)`${X}.instancePath`, (0, t.strConcat)(n.default.instancePath, x.errorPath))), _.assign((0, t._)`${X}.schemaPath`, (0, t.str)`${x.errSchemaPath}/${y}`), x.opts.verbose && (_.assign((0, t._)`${X}.schema`, w), _.assign((0, t._)`${X}.data`, T));
    });
  }
  e.extendErrors = o;
  function c(_, y) {
    const w = _.const("err", y);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function f(_, y) {
    const { gen: w, validateName: T, schemaEnv: D } = _;
    D.$async ? w.throw((0, t._)`new ${_.ValidationError}(${y})`) : (w.assign((0, t._)`${T}.errors`, y), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function u(_, y, w) {
    const { createErrors: T } = _.it;
    return T === !1 ? (0, t._)`{}` : p(_, y, w);
  }
  function p(_, y, w = {}) {
    const { gen: T, it: D } = _, x = [
      h(D, w),
      v(_, w)
    ];
    return m(_, y, x), T.object(...x);
  }
  function h({ errorPath: _ }, { instancePath: y }) {
    const w = y ? (0, t.str)`${_}${(0, r.getErrorPath)(y, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: _, it: { errSchemaPath: y } }, { schemaPath: w, parentSchema: T }) {
    let D = T ? y : (0, t.str)`${y}/${_}`;
    return w && (D = (0, t.str)`${D}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, D];
  }
  function m(_, { params: y, message: w }, T) {
    const { keyword: D, data: x, schemaValue: X, it: Y } = _, { opts: le, propertyName: I, topSchemaRef: re, schemaPath: H } = Y;
    T.push([l.keyword, D], [l.params, typeof y == "function" ? y(_) : y || (0, t._)`{}`]), le.messages && T.push([l.message, typeof w == "function" ? w(_) : w]), le.verbose && T.push([l.schema, X], [l.parentSchema, (0, t._)`${re}${H}`], [n.default.data, x]), I && T.push([l.propertyName, I]);
  }
})(sa);
var ey;
function rU() {
  if (ey) return bn;
  ey = 1, Object.defineProperty(bn, "__esModule", { value: !0 }), bn.boolOrEmptySchema = bn.topBoolOrEmptySchema = void 0;
  const e = sa, t = ye, r = mr, n = {
    message: "boolean schema is false"
  };
  function i(o) {
    const { gen: c, schema: f, validateName: l } = o;
    f === !1 ? a(o, !1) : typeof f == "object" && f.$async === !0 ? c.return(r.default.data) : (c.assign((0, t._)`${l}.errors`, null), c.return(!0));
  }
  bn.topBoolOrEmptySchema = i;
  function s(o, c) {
    const { gen: f, schema: l } = o;
    l === !1 ? (f.var(c, !1), a(o)) : f.var(c, !0);
  }
  bn.boolOrEmptySchema = s;
  function a(o, c) {
    const { gen: f, data: l } = o, u = {
      gen: f,
      keyword: "false schema",
      data: l,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(u, n, void 0, c);
  }
  return bn;
}
var Ve = {}, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.getRules = qn.isJSONType = void 0;
const nU = ["string", "number", "integer", "boolean", "null", "object", "array"], iU = new Set(nU);
function sU(e) {
  return typeof e == "string" && iU.has(e);
}
qn.isJSONType = sU;
function aU() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
qn.getRules = aU;
var Sr = {}, ty;
function wv() {
  if (ty) return Sr;
  ty = 1, Object.defineProperty(Sr, "__esModule", { value: !0 }), Sr.shouldUseRule = Sr.shouldUseGroup = Sr.schemaHasRulesForType = void 0;
  function e({ schema: n, self: i }, s) {
    const a = i.RULES.types[s];
    return a && a !== !0 && t(n, a);
  }
  Sr.schemaHasRulesForType = e;
  function t(n, i) {
    return i.rules.some((s) => r(n, s));
  }
  Sr.shouldUseGroup = t;
  function r(n, i) {
    var s;
    return n[i.keyword] !== void 0 || ((s = i.definition.implements) === null || s === void 0 ? void 0 : s.some((a) => n[a] !== void 0));
  }
  return Sr.shouldUseRule = r, Sr;
}
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.reportTypeError = Ve.checkDataTypes = Ve.checkDataType = Ve.coerceAndCheckDataType = Ve.getJSONTypes = Ve.getSchemaTypes = Ve.DataType = void 0;
const oU = qn, cU = wv(), lU = sa, me = ye, bv = ee;
var _i;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(_i || (Ve.DataType = _i = {}));
function uU(e) {
  const t = Sv(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Ve.getSchemaTypes = uU;
function Sv(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(oU.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ve.getJSONTypes = Sv;
function fU(e, t) {
  const { gen: r, data: n, opts: i } = e, s = dU(t, i.coerceTypes), a = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, cU.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const o = ud(t, n, i.strictNumbers, _i.Wrong);
    r.if(o, () => {
      s.length ? hU(e, t, s) : fd(e);
    });
  }
  return a;
}
Ve.coerceAndCheckDataType = fU;
const Pv = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function dU(e, t) {
  return t ? e.filter((r) => Pv.has(r) || t === "array" && r === "array") : [];
}
function hU(e, t, r) {
  const { gen: n, data: i, opts: s } = e, a = n.let("dataType", (0, me._)`typeof ${i}`), o = n.let("coerced", (0, me._)`undefined`);
  s.coerceTypes === "array" && n.if((0, me._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, me._)`${i}[0]`).assign(a, (0, me._)`typeof ${i}`).if(ud(t, i, s.strictNumbers), () => n.assign(o, i))), n.if((0, me._)`${o} !== undefined`);
  for (const f of r)
    (Pv.has(f) || f === "array" && s.coerceTypes === "array") && c(f);
  n.else(), fd(e), n.endIf(), n.if((0, me._)`${o} !== undefined`, () => {
    n.assign(i, o), pU(e, o);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, me._)`${a} == "number" || ${a} == "boolean"`).assign(o, (0, me._)`"" + ${i}`).elseIf((0, me._)`${i} === null`).assign(o, (0, me._)`""`);
        return;
      case "number":
        n.elseIf((0, me._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, me._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, me._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, me._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, me._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, me._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, me._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, me._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(o, (0, me._)`[${i}]`);
    }
  }
}
function pU({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, me._)`${t} !== undefined`, () => e.assign((0, me._)`${t}[${r}]`, n));
}
function hu(e, t, r, n = _i.Correct) {
  const i = n === _i.Correct ? me.operators.EQ : me.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, me._)`${t} ${i} null`;
    case "array":
      s = (0, me._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, me._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = a((0, me._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = a();
      break;
    default:
      return (0, me._)`typeof ${t} ${i} ${e}`;
  }
  return n === _i.Correct ? s : (0, me.not)(s);
  function a(o = me.nil) {
    return (0, me.and)((0, me._)`typeof ${t} == "number"`, o, r ? (0, me._)`isFinite(${t})` : me.nil);
  }
}
Ve.checkDataType = hu;
function ud(e, t, r, n) {
  if (e.length === 1)
    return hu(e[0], t, r, n);
  let i;
  const s = (0, bv.toHash)(e);
  if (s.array && s.object) {
    const a = (0, me._)`typeof ${t} != "object"`;
    i = s.null ? a : (0, me._)`!${t} || ${a}`, delete s.null, delete s.array, delete s.object;
  } else
    i = me.nil;
  s.number && delete s.integer;
  for (const a in s)
    i = (0, me.and)(i, hu(a, t, r, n));
  return i;
}
Ve.checkDataTypes = ud;
const mU = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, me._)`{type: ${e}}` : (0, me._)`{type: ${t}}`
};
function fd(e) {
  const t = yU(e);
  (0, lU.reportError)(t, mU);
}
Ve.reportTypeError = fd;
function yU(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, bv.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var rs = {}, ry;
function gU() {
  if (ry) return rs;
  ry = 1, Object.defineProperty(rs, "__esModule", { value: !0 }), rs.assignDefaults = void 0;
  const e = ye, t = ee;
  function r(i, s) {
    const { properties: a, items: o } = i.schema;
    if (s === "object" && a)
      for (const c in a)
        n(i, c, a[c].default);
    else s === "array" && Array.isArray(o) && o.forEach((c, f) => n(i, f, c.default));
  }
  rs.assignDefaults = r;
  function n(i, s, a) {
    const { gen: o, compositeRule: c, data: f, opts: l } = i;
    if (a === void 0)
      return;
    const u = (0, e._)`${f}${(0, e.getProperty)(s)}`;
    if (c) {
      (0, t.checkStrictMode)(i, `default is ignored for: ${u}`);
      return;
    }
    let p = (0, e._)`${u} === undefined`;
    l.useDefaults === "empty" && (p = (0, e._)`${p} || ${u} === null || ${u} === ""`), o.if(p, (0, e._)`${u} = ${(0, e.stringify)(a)}`);
  }
  return rs;
}
var Gt = {}, $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
$e.validateUnion = $e.validateArray = $e.usePattern = $e.callValidateCode = $e.schemaProperties = $e.allSchemaProperties = $e.noPropertyInData = $e.propertyInData = $e.isOwnProperty = $e.hasPropFunc = $e.reportMissingProp = $e.checkMissingProp = $e.checkReportMissingProp = void 0;
const Re = ye, dd = ee, Gr = mr, $U = ee;
function vU(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(pd(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Re._)`${t}` }, !0), e.error();
  });
}
$e.checkReportMissingProp = vU;
function _U({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Re.or)(...n.map((s) => (0, Re.and)(pd(e, t, s, r.ownProperties), (0, Re._)`${i} = ${s}`)));
}
$e.checkMissingProp = _U;
function EU(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
$e.reportMissingProp = EU;
function Tv(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Re._)`Object.prototype.hasOwnProperty`
  });
}
$e.hasPropFunc = Tv;
function hd(e, t, r) {
  return (0, Re._)`${Tv(e)}.call(${t}, ${r})`;
}
$e.isOwnProperty = hd;
function wU(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} !== undefined`;
  return n ? (0, Re._)`${i} && ${hd(e, t, r)}` : i;
}
$e.propertyInData = wU;
function pd(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} === undefined`;
  return n ? (0, Re.or)(i, (0, Re.not)(hd(e, t, r))) : i;
}
$e.noPropertyInData = pd;
function Rv(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
$e.allSchemaProperties = Rv;
function bU(e, t) {
  return Rv(t).filter((r) => !(0, dd.alwaysValidSchema)(e, t[r]));
}
$e.schemaProperties = bU;
function SU({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: a }, o, c, f) {
  const l = f ? (0, Re._)`${e}, ${t}, ${n}${i}` : t, u = [
    [Gr.default.instancePath, (0, Re.strConcat)(Gr.default.instancePath, s)],
    [Gr.default.parentData, a.parentData],
    [Gr.default.parentDataProperty, a.parentDataProperty],
    [Gr.default.rootData, Gr.default.rootData]
  ];
  a.opts.dynamicRef && u.push([Gr.default.dynamicAnchors, Gr.default.dynamicAnchors]);
  const p = (0, Re._)`${l}, ${r.object(...u)}`;
  return c !== Re.nil ? (0, Re._)`${o}.call(${c}, ${p})` : (0, Re._)`${o}(${p})`;
}
$e.callValidateCode = SU;
const PU = (0, Re._)`new RegExp`;
function TU({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Re._)`${i.code === "new RegExp" ? PU : (0, $U.useFunc)(e, i)}(${r}, ${n})`
  });
}
$e.usePattern = TU;
function RU(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return a(() => t.assign(o, !1)), o;
  }
  return t.var(s, !0), a(() => t.break()), s;
  function a(o) {
    const c = t.const("len", (0, Re._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: dd.Type.Num
      }, s), t.if((0, Re.not)(s), o);
    });
  }
}
$e.validateArray = RU;
function NU(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, dd.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, o);
    t.assign(a, (0, Re._)`${a} || ${o}`), e.mergeValidEvaluated(l, o) || t.if((0, Re.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
$e.validateUnion = NU;
var ny;
function OU() {
  if (ny) return Gt;
  ny = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.validateKeywordUsage = Gt.validSchemaType = Gt.funcKeywordCode = Gt.macroKeywordCode = void 0;
  const e = ye, t = mr, r = $e, n = sa;
  function i(p, h) {
    const { gen: v, keyword: m, schema: _, parentSchema: y, it: w } = p, T = h.macro.call(w.self, _, y, w), D = f(v, m, T);
    w.opts.validateSchema !== !1 && w.self.validateSchema(T, !0);
    const x = v.name("valid");
    p.subschema({
      schema: T,
      schemaPath: e.nil,
      errSchemaPath: `${w.errSchemaPath}/${m}`,
      topSchemaRef: D,
      compositeRule: !0
    }, x), p.pass(x, () => p.error(!0));
  }
  Gt.macroKeywordCode = i;
  function s(p, h) {
    var v;
    const { gen: m, keyword: _, schema: y, parentSchema: w, $data: T, it: D } = p;
    c(D, h);
    const x = !T && h.compile ? h.compile.call(D.self, y, w, D) : h.validate, X = f(m, _, x), Y = m.let("valid");
    p.block$data(Y, le), p.ok((v = h.valid) !== null && v !== void 0 ? v : Y);
    function le() {
      if (h.errors === !1)
        H(), h.modifying && a(p), W(() => p.error());
      else {
        const Q = h.async ? I() : re();
        h.modifying && a(p), W(() => o(p, Q));
      }
    }
    function I() {
      const Q = m.let("ruleErrs", null);
      return m.try(() => H((0, e._)`await `), (k) => m.assign(Y, !1).if((0, e._)`${k} instanceof ${D.ValidationError}`, () => m.assign(Q, (0, e._)`${k}.errors`), () => m.throw(k))), Q;
    }
    function re() {
      const Q = (0, e._)`${X}.errors`;
      return m.assign(Q, null), H(e.nil), Q;
    }
    function H(Q = h.async ? (0, e._)`await ` : e.nil) {
      const k = D.opts.passContext ? t.default.this : t.default.self, L = !("compile" in h && !T || h.schema === !1);
      m.assign(Y, (0, e._)`${Q}${(0, r.callValidateCode)(p, X, k, L)}`, h.modifying);
    }
    function W(Q) {
      var k;
      m.if((0, e.not)((k = h.valid) !== null && k !== void 0 ? k : Y), Q);
    }
  }
  Gt.funcKeywordCode = s;
  function a(p) {
    const { gen: h, data: v, it: m } = p;
    h.if(m.parentData, () => h.assign(v, (0, e._)`${m.parentData}[${m.parentDataProperty}]`));
  }
  function o(p, h) {
    const { gen: v } = p;
    v.if((0, e._)`Array.isArray(${h})`, () => {
      v.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${h} : ${t.default.vErrors}.concat(${h})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(p);
    }, () => p.error());
  }
  function c({ schemaEnv: p }, h) {
    if (h.async && !p.$async)
      throw new Error("async keyword in sync schema");
  }
  function f(p, h, v) {
    if (v === void 0)
      throw new Error(`keyword "${h}" failed to compile`);
    return p.scopeValue("keyword", typeof v == "function" ? { ref: v } : { ref: v, code: (0, e.stringify)(v) });
  }
  function l(p, h, v = !1) {
    return !h.length || h.some((m) => m === "array" ? Array.isArray(p) : m === "object" ? p && typeof p == "object" && !Array.isArray(p) : typeof p == m || v && typeof p > "u");
  }
  Gt.validSchemaType = l;
  function u({ schema: p, opts: h, self: v, errSchemaPath: m }, _, y) {
    if (Array.isArray(_.keyword) ? !_.keyword.includes(y) : _.keyword !== y)
      throw new Error("ajv implementation error");
    const w = _.dependencies;
    if (w != null && w.some((T) => !Object.prototype.hasOwnProperty.call(p, T)))
      throw new Error(`parent schema must have dependencies of ${y}: ${w.join(",")}`);
    if (_.validateSchema && !_.validateSchema(p[y])) {
      const D = `keyword "${y}" value is invalid at path "${m}": ` + v.errorsText(_.validateSchema.errors);
      if (h.validateSchema === "log")
        v.logger.error(D);
      else
        throw new Error(D);
    }
  }
  return Gt.validateKeywordUsage = u, Gt;
}
var Pr = {}, iy;
function AU() {
  if (iy) return Pr;
  iy = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.extendSubschemaMode = Pr.extendSubschemaData = Pr.getSubschema = void 0;
  const e = ye, t = ee;
  function r(s, { keyword: a, schemaProp: o, schema: c, schemaPath: f, errSchemaPath: l, topSchemaRef: u }) {
    if (a !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (a !== void 0) {
      const p = s.schema[a];
      return o === void 0 ? {
        schema: p,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${s.errSchemaPath}/${a}`
      } : {
        schema: p[o],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(a)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${s.errSchemaPath}/${a}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (c !== void 0) {
      if (f === void 0 || l === void 0 || u === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: f,
        topSchemaRef: u,
        errSchemaPath: l
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Pr.getSubschema = r;
  function n(s, a, { dataProp: o, dataPropType: c, data: f, dataTypes: l, propertyName: u }) {
    if (f !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: p } = a;
    if (o !== void 0) {
      const { errorPath: v, dataPathArr: m, opts: _ } = a, y = p.let("data", (0, e._)`${a.data}${(0, e.getProperty)(o)}`, !0);
      h(y), s.errorPath = (0, e.str)`${v}${(0, t.getErrorPath)(o, c, _.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${o}`, s.dataPathArr = [...m, s.parentDataProperty];
    }
    if (f !== void 0) {
      const v = f instanceof e.Name ? f : p.let("data", f, !0);
      h(v), u !== void 0 && (s.propertyName = u);
    }
    l && (s.dataTypes = l);
    function h(v) {
      s.data = v, s.dataLevel = a.dataLevel + 1, s.dataTypes = [], a.definedProperties = /* @__PURE__ */ new Set(), s.parentData = a.data, s.dataNames = [...a.dataNames, v];
    }
  }
  Pr.extendSubschemaData = n;
  function i(s, { jtdDiscriminator: a, jtdMetadata: o, compositeRule: c, createErrors: f, allErrors: l }) {
    c !== void 0 && (s.compositeRule = c), f !== void 0 && (s.createErrors = f), l !== void 0 && (s.allErrors = l), s.jtdDiscriminator = a, s.jtdMetadata = o;
  }
  return Pr.extendSubschemaMode = i, Pr;
}
var Je = {}, Nv = { exports: {} }, rn = Nv.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  uo(t, n, i, e, "", e);
};
rn.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
rn.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
rn.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
rn.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function uo(e, t, r, n, i, s, a, o, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, a, o, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in rn.arrayKeywords)
          for (var p = 0; p < u.length; p++)
            uo(e, t, r, u[p], i + "/" + l + "/" + p, s, i, l, n, p);
      } else if (l in rn.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            uo(e, t, r, u[h], i + "/" + l + "/" + IU(h), s, i, l, n, h);
      } else (l in rn.keywords || e.allKeys && !(l in rn.skipKeywords)) && uo(e, t, r, u, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, a, o, c, f);
  }
}
function IU(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var CU = Nv.exports;
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.getSchemaRefs = Je.resolveUrl = Je.normalizeId = Je._getFullPath = Je.getFullPath = Je.inlineRef = void 0;
const DU = ee, kU = fc, LU = CU, FU = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function jU(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !pu(e) : t ? Ov(e) <= t : !1;
}
Je.inlineRef = jU;
const UU = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function pu(e) {
  for (const t in e) {
    if (UU.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(pu) || typeof r == "object" && pu(r))
      return !0;
  }
  return !1;
}
function Ov(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !FU.has(r) && (typeof e[r] == "object" && (0, DU.eachItem)(e[r], (n) => t += Ov(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Av(e, t = "", r) {
  r !== !1 && (t = Ei(t));
  const n = e.parse(t);
  return Iv(e, n);
}
Je.getFullPath = Av;
function Iv(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Je._getFullPath = Iv;
const MU = /#\/?$/;
function Ei(e) {
  return e ? e.replace(MU, "") : "";
}
Je.normalizeId = Ei;
function xU(e, t, r) {
  return r = Ei(r), e.resolve(t, r);
}
Je.resolveUrl = xU;
const VU = /^[a-z_][-a-z0-9._]*$/i;
function qU(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Ei(e[r] || t), s = { "": i }, a = Av(n, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return LU(e, { allKeys: !0 }, (u, p, h, v) => {
    if (v === void 0)
      return;
    const m = a + p;
    let _ = s[v];
    typeof u[r] == "string" && (_ = y.call(this, u[r])), w.call(this, u.$anchor), w.call(this, u.$dynamicAnchor), s[p] = _;
    function y(T) {
      const D = this.opts.uriResolver.resolve;
      if (T = Ei(_ ? D(_, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let x = this.refs[T];
      return typeof x == "string" && (x = this.refs[x]), typeof x == "object" ? f(u, x.schema, T) : T !== Ei(m) && (T[0] === "#" ? (f(u, o[T], T), o[T] = u) : this.refs[T] = m), T;
    }
    function w(T) {
      if (typeof T == "string") {
        if (!VU.test(T))
          throw new Error(`invalid anchor "${T}"`);
        y.call(this, `#${T}`);
      }
    }
  }), o;
  function f(u, p, h) {
    if (p !== void 0 && !kU(u, p))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
Je.getSchemaRefs = qU;
var sy;
function $c() {
  if (sy) return br;
  sy = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.getData = br.KeywordCxt = br.validateFunctionCode = void 0;
  const e = rU(), t = Ve, r = wv(), n = Ve, i = gU(), s = OU(), a = AU(), o = ye, c = mr, f = Je, l = ee, u = sa;
  function p(C) {
    if (x(C) && (Y(C), D(C))) {
      _(C);
      return;
    }
    h(C, () => (0, e.topBoolOrEmptySchema)(C));
  }
  br.validateFunctionCode = p;
  function h({ gen: C, validateName: F, schema: B, schemaEnv: K, opts: J }, se) {
    J.code.es5 ? C.func(F, (0, o._)`${c.default.data}, ${c.default.valCxt}`, K.$async, () => {
      C.code((0, o._)`"use strict"; ${w(B, J)}`), m(C, J), C.code(se);
    }) : C.func(F, (0, o._)`${c.default.data}, ${v(J)}`, K.$async, () => C.code(w(B, J)).code(se));
  }
  function v(C) {
    return (0, o._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${C.dynamicRef ? (0, o._)`, ${c.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function m(C, F) {
    C.if(c.default.valCxt, () => {
      C.var(c.default.instancePath, (0, o._)`${c.default.valCxt}.${c.default.instancePath}`), C.var(c.default.parentData, (0, o._)`${c.default.valCxt}.${c.default.parentData}`), C.var(c.default.parentDataProperty, (0, o._)`${c.default.valCxt}.${c.default.parentDataProperty}`), C.var(c.default.rootData, (0, o._)`${c.default.valCxt}.${c.default.rootData}`), F.dynamicRef && C.var(c.default.dynamicAnchors, (0, o._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      C.var(c.default.instancePath, (0, o._)`""`), C.var(c.default.parentData, (0, o._)`undefined`), C.var(c.default.parentDataProperty, (0, o._)`undefined`), C.var(c.default.rootData, c.default.data), F.dynamicRef && C.var(c.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function _(C) {
    const { schema: F, opts: B, gen: K } = C;
    h(C, () => {
      B.$comment && F.$comment && Q(C), re(C), K.let(c.default.vErrors, null), K.let(c.default.errors, 0), B.unevaluated && y(C), le(C), k(C);
    });
  }
  function y(C) {
    const { gen: F, validateName: B } = C;
    C.evaluated = F.const("evaluated", (0, o._)`${B}.evaluated`), F.if((0, o._)`${C.evaluated}.dynamicProps`, () => F.assign((0, o._)`${C.evaluated}.props`, (0, o._)`undefined`)), F.if((0, o._)`${C.evaluated}.dynamicItems`, () => F.assign((0, o._)`${C.evaluated}.items`, (0, o._)`undefined`));
  }
  function w(C, F) {
    const B = typeof C == "object" && C[F.schemaId];
    return B && (F.code.source || F.code.process) ? (0, o._)`/*# sourceURL=${B} */` : o.nil;
  }
  function T(C, F) {
    if (x(C) && (Y(C), D(C))) {
      X(C, F);
      return;
    }
    (0, e.boolOrEmptySchema)(C, F);
  }
  function D({ schema: C, self: F }) {
    if (typeof C == "boolean")
      return !C;
    for (const B in C)
      if (F.RULES.all[B])
        return !0;
    return !1;
  }
  function x(C) {
    return typeof C.schema != "boolean";
  }
  function X(C, F) {
    const { schema: B, gen: K, opts: J } = C;
    J.$comment && B.$comment && Q(C), H(C), W(C);
    const se = K.const("_errs", c.default.errors);
    le(C, se), K.var(F, (0, o._)`${se} === ${c.default.errors}`);
  }
  function Y(C) {
    (0, l.checkUnknownRules)(C), I(C);
  }
  function le(C, F) {
    if (C.opts.jtd)
      return q(C, [], !1, F);
    const B = (0, t.getSchemaTypes)(C.schema), K = (0, t.coerceAndCheckDataType)(C, B);
    q(C, B, !K, F);
  }
  function I(C) {
    const { schema: F, errSchemaPath: B, opts: K, self: J } = C;
    F.$ref && K.ignoreKeywordsWithRef && (0, l.schemaHasRulesButRef)(F, J.RULES) && J.logger.warn(`$ref: keywords ignored in schema at path "${B}"`);
  }
  function re(C) {
    const { schema: F, opts: B } = C;
    F.default !== void 0 && B.useDefaults && B.strictSchema && (0, l.checkStrictMode)(C, "default is ignored in the schema root");
  }
  function H(C) {
    const F = C.schema[C.opts.schemaId];
    F && (C.baseId = (0, f.resolveUrl)(C.opts.uriResolver, C.baseId, F));
  }
  function W(C) {
    if (C.schema.$async && !C.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function Q({ gen: C, schemaEnv: F, schema: B, errSchemaPath: K, opts: J }) {
    const se = B.$comment;
    if (J.$comment === !0)
      C.code((0, o._)`${c.default.self}.logger.log(${se})`);
    else if (typeof J.$comment == "function") {
      const de = (0, o.str)`${K}/$comment`, _e = C.scopeValue("root", { ref: F.root });
      C.code((0, o._)`${c.default.self}.opts.$comment(${se}, ${de}, ${_e}.schema)`);
    }
  }
  function k(C) {
    const { gen: F, schemaEnv: B, validateName: K, ValidationError: J, opts: se } = C;
    B.$async ? F.if((0, o._)`${c.default.errors} === 0`, () => F.return(c.default.data), () => F.throw((0, o._)`new ${J}(${c.default.vErrors})`)) : (F.assign((0, o._)`${K}.errors`, c.default.vErrors), se.unevaluated && L(C), F.return((0, o._)`${c.default.errors} === 0`));
  }
  function L({ gen: C, evaluated: F, props: B, items: K }) {
    B instanceof o.Name && C.assign((0, o._)`${F}.props`, B), K instanceof o.Name && C.assign((0, o._)`${F}.items`, K);
  }
  function q(C, F, B, K) {
    const { gen: J, schema: se, data: de, allErrors: _e, opts: ke, self: Oe } = C, { RULES: Ee } = Oe;
    if (se.$ref && (ke.ignoreKeywordsWithRef || !(0, l.schemaHasRulesButRef)(se, Ee))) {
      J.block(() => E(C, "$ref", Ee.all.$ref.definition));
      return;
    }
    ke.jtd || G(C, F), J.block(() => {
      for (const Be of Ee.rules)
        lt(Be);
      lt(Ee.post);
    });
    function lt(Be) {
      (0, r.shouldUseGroup)(se, Be) && (Be.type ? (J.if((0, n.checkDataType)(Be.type, de, ke.strictNumbers)), j(C, Be), F.length === 1 && F[0] === Be.type && B && (J.else(), (0, n.reportTypeError)(C)), J.endIf()) : j(C, Be), _e || J.if((0, o._)`${c.default.errors} === ${K || 0}`));
    }
  }
  function j(C, F) {
    const { gen: B, schema: K, opts: { useDefaults: J } } = C;
    J && (0, i.assignDefaults)(C, F.type), B.block(() => {
      for (const se of F.rules)
        (0, r.shouldUseRule)(K, se) && E(C, se.keyword, se.definition, F.type);
    });
  }
  function G(C, F) {
    C.schemaEnv.meta || !C.opts.strictTypes || (V(C, F), C.opts.allowUnionTypes || O(C, F), b(C, C.dataTypes));
  }
  function V(C, F) {
    if (F.length) {
      if (!C.dataTypes.length) {
        C.dataTypes = F;
        return;
      }
      F.forEach((B) => {
        S(C.dataTypes, B) || $(C, `type "${B}" not allowed by context "${C.dataTypes.join(",")}"`);
      }), d(C, F);
    }
  }
  function O(C, F) {
    F.length > 1 && !(F.length === 2 && F.includes("null")) && $(C, "use allowUnionTypes to allow union type keyword");
  }
  function b(C, F) {
    const B = C.self.RULES.all;
    for (const K in B) {
      const J = B[K];
      if (typeof J == "object" && (0, r.shouldUseRule)(C.schema, J)) {
        const { type: se } = J.definition;
        se.length && !se.some((de) => P(F, de)) && $(C, `missing type "${se.join(",")}" for keyword "${K}"`);
      }
    }
  }
  function P(C, F) {
    return C.includes(F) || F === "number" && C.includes("integer");
  }
  function S(C, F) {
    return C.includes(F) || F === "integer" && C.includes("number");
  }
  function d(C, F) {
    const B = [];
    for (const K of C.dataTypes)
      S(F, K) ? B.push(K) : F.includes("integer") && K === "number" && B.push("integer");
    C.dataTypes = B;
  }
  function $(C, F) {
    const B = C.schemaEnv.baseId + C.errSchemaPath;
    F += ` at "${B}" (strictTypes)`, (0, l.checkStrictMode)(C, F, C.opts.strictTypes);
  }
  class N {
    constructor(F, B, K) {
      if ((0, s.validateKeywordUsage)(F, B, K), this.gen = F.gen, this.allErrors = F.allErrors, this.keyword = K, this.data = F.data, this.schema = F.schema[K], this.$data = B.$data && F.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, l.schemaRefOrVal)(F, this.schema, K, this.$data), this.schemaType = B.schemaType, this.parentSchema = F.schema, this.params = {}, this.it = F, this.def = B, this.$data)
        this.schemaCode = F.gen.const("vSchema", A(this.$data, F));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, B.schemaType, B.allowUndefined))
        throw new Error(`${K} value must be ${JSON.stringify(B.schemaType)}`);
      ("code" in B ? B.trackErrors : B.errors !== !1) && (this.errsCount = F.gen.const("_errs", c.default.errors));
    }
    result(F, B, K) {
      this.failResult((0, o.not)(F), B, K);
    }
    failResult(F, B, K) {
      this.gen.if(F), K ? K() : this.error(), B ? (this.gen.else(), B(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(F, B) {
      this.failResult((0, o.not)(F), void 0, B);
    }
    fail(F) {
      if (F === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(F), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(F) {
      if (!this.$data)
        return this.fail(F);
      const { schemaCode: B } = this;
      this.fail((0, o._)`${B} !== undefined && (${(0, o.or)(this.invalid$data(), F)})`);
    }
    error(F, B, K) {
      if (B) {
        this.setParams(B), this._error(F, K), this.setParams({});
        return;
      }
      this._error(F, K);
    }
    _error(F, B) {
      (F ? u.reportExtraError : u.reportError)(this, this.def.error, B);
    }
    $dataError() {
      (0, u.reportError)(this, this.def.$dataError || u.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, u.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(F) {
      this.allErrors || this.gen.if(F);
    }
    setParams(F, B) {
      B ? Object.assign(this.params, F) : this.params = F;
    }
    block$data(F, B, K = o.nil) {
      this.gen.block(() => {
        this.check$data(F, K), B();
      });
    }
    check$data(F = o.nil, B = o.nil) {
      if (!this.$data)
        return;
      const { gen: K, schemaCode: J, schemaType: se, def: de } = this;
      K.if((0, o.or)((0, o._)`${J} === undefined`, B)), F !== o.nil && K.assign(F, !0), (se.length || de.validateSchema) && (K.elseIf(this.invalid$data()), this.$dataError(), F !== o.nil && K.assign(F, !1)), K.else();
    }
    invalid$data() {
      const { gen: F, schemaCode: B, schemaType: K, def: J, it: se } = this;
      return (0, o.or)(de(), _e());
      function de() {
        if (K.length) {
          if (!(B instanceof o.Name))
            throw new Error("ajv implementation error");
          const ke = Array.isArray(K) ? K : [K];
          return (0, o._)`${(0, n.checkDataTypes)(ke, B, se.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function _e() {
        if (J.validateSchema) {
          const ke = F.scopeValue("validate$data", { ref: J.validateSchema });
          return (0, o._)`!${ke}(${B})`;
        }
        return o.nil;
      }
    }
    subschema(F, B) {
      const K = (0, a.getSubschema)(this.it, F);
      (0, a.extendSubschemaData)(K, this.it, F), (0, a.extendSubschemaMode)(K, F);
      const J = { ...this.it, ...K, items: void 0, props: void 0 };
      return T(J, B), J;
    }
    mergeEvaluated(F, B) {
      const { it: K, gen: J } = this;
      K.opts.unevaluated && (K.props !== !0 && F.props !== void 0 && (K.props = l.mergeEvaluated.props(J, F.props, K.props, B)), K.items !== !0 && F.items !== void 0 && (K.items = l.mergeEvaluated.items(J, F.items, K.items, B)));
    }
    mergeValidEvaluated(F, B) {
      const { it: K, gen: J } = this;
      if (K.opts.unevaluated && (K.props !== !0 || K.items !== !0))
        return J.if(B, () => this.mergeEvaluated(F, o.Name)), !0;
    }
  }
  br.KeywordCxt = N;
  function E(C, F, B, K) {
    const J = new N(C, B, F);
    "code" in B ? B.code(J, K) : J.$data && B.validate ? (0, s.funcKeywordCode)(J, B) : "macro" in B ? (0, s.macroKeywordCode)(J, B) : (B.compile || B.validate) && (0, s.funcKeywordCode)(J, B);
  }
  const g = /^\/(?:[^~]|~0|~1)*$/, M = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function A(C, { dataLevel: F, dataNames: B, dataPathArr: K }) {
    let J, se;
    if (C === "")
      return c.default.rootData;
    if (C[0] === "/") {
      if (!g.test(C))
        throw new Error(`Invalid JSON-pointer: ${C}`);
      J = C, se = c.default.rootData;
    } else {
      const Oe = M.exec(C);
      if (!Oe)
        throw new Error(`Invalid JSON-pointer: ${C}`);
      const Ee = +Oe[1];
      if (J = Oe[2], J === "#") {
        if (Ee >= F)
          throw new Error(ke("property/index", Ee));
        return K[F - Ee];
      }
      if (Ee > F)
        throw new Error(ke("data", Ee));
      if (se = B[F - Ee], !J)
        return se;
    }
    let de = se;
    const _e = J.split("/");
    for (const Oe of _e)
      Oe && (se = (0, o._)`${se}${(0, o.getProperty)((0, l.unescapeJsonPointer)(Oe))}`, de = (0, o._)`${de} && ${se}`);
    return de;
    function ke(Oe, Ee) {
      return `Cannot access ${Oe} ${Ee} levels up, current level is ${F}`;
    }
  }
  return br.getData = A, br;
}
var xa = {}, ay;
function md() {
  if (ay) return xa;
  ay = 1, Object.defineProperty(xa, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return xa.default = e, xa;
}
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
const Pl = Je;
class BU extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Pl.resolveUrl)(t, r, n), this.missingSchema = (0, Pl.normalizeId)((0, Pl.getFullPath)(t, this.missingRef));
  }
}
Vi.default = BU;
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.resolveSchema = Tt.getCompilingSchema = Tt.resolveRef = Tt.compileSchema = Tt.SchemaEnv = void 0;
const Ht = ye, GU = md(), Sn = mr, Jt = Je, oy = ee, HU = $c();
class vc {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Jt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Tt.SchemaEnv = vc;
function yd(e) {
  const t = Cv.call(this, e);
  if (t)
    return t;
  const r = (0, Jt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, a = new Ht.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let o;
  e.$async && (o = a.scopeValue("Error", {
    ref: GU.default,
    code: (0, Ht._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Sn.default.data,
    parentData: Sn.default.parentData,
    parentDataProperty: Sn.default.parentDataProperty,
    dataNames: [Sn.default.data],
    dataPathArr: [Ht.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ht.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ht.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ht._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, HU.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const u = a.toString();
    l = `${a.scopeRefs(Sn.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${Sn.default.self}`, `${Sn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: u, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: m } = f;
      h.evaluated = {
        props: v instanceof Ht.Name ? void 0 : v,
        items: m instanceof Ht.Name ? void 0 : m,
        dynamicProps: v instanceof Ht.Name,
        dynamicItems: m instanceof Ht.Name
      }, h.source && (h.source.evaluated = (0, Ht.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
Tt.compileSchema = yd;
function zU(e, t, r) {
  var n;
  r = (0, Jt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = YU.call(this, e, r);
  if (s === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    a && (s = new vc({ schema: a, schemaId: o, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = KU.call(this, s);
}
Tt.resolveRef = zU;
function KU(e) {
  return (0, Jt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : yd.call(this, e);
}
function Cv(e) {
  for (const t of this._compilations)
    if (WU(t, e))
      return t;
}
Tt.getCompilingSchema = Cv;
function WU(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function YU(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || _c.call(this, e, t);
}
function _c(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Jt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Jt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Tl.call(this, r, e);
  const s = (0, Jt.normalizeId)(n), a = this.refs[s] || this.schemas[s];
  if (typeof a == "string") {
    const o = _c.call(this, e, a);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : Tl.call(this, r, o);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || yd.call(this, a), s === (0, Jt.normalizeId)(t)) {
      const { schema: o } = a, { schemaId: c } = this.opts, f = o[c];
      return f && (i = (0, Jt.resolveUrl)(this.opts.uriResolver, i, f)), new vc({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return Tl.call(this, r, a);
  }
}
Tt.resolveSchema = _c;
const XU = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Tl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, oy.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !XU.has(o) && f && (t = (0, Jt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, oy.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Jt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = _c.call(this, n, o);
  }
  const { schemaId: a } = this.opts;
  if (s = s || new vc({ schema: r, schemaId: a, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const JU = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", QU = "Meta-schema for $data reference (JSON AnySchema extension proposal)", ZU = "object", e2 = [
  "$data"
], t2 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, r2 = !1, n2 = {
  $id: JU,
  description: QU,
  type: ZU,
  required: e2,
  properties: t2,
  additionalProperties: r2
};
var gd = {};
Object.defineProperty(gd, "__esModule", { value: !0 });
const Dv = nv;
Dv.code = 'require("ajv/dist/runtime/uri").default';
gd.default = Dv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = $c();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ye;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = md(), i = Vi, s = qn, a = Tt, o = ye, c = Je, f = Ve, l = ee, u = n2, p = gd, h = (O, b) => new RegExp(O, b);
  h.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], m = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), _ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, y = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function T(O) {
    var b, P, S, d, $, N, E, g, M, A, C, F, B, K, J, se, de, _e, ke, Oe, Ee, lt, Be, yr, gr;
    const Ot = O.strict, kt = (b = O.code) === null || b === void 0 ? void 0 : b.optimize, $r = kt === !0 || kt === void 0 ? 1 : kt || 0, kr = (S = (P = O.code) === null || P === void 0 ? void 0 : P.regExp) !== null && S !== void 0 ? S : h, wt = (d = O.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (N = ($ = O.strictSchema) !== null && $ !== void 0 ? $ : Ot) !== null && N !== void 0 ? N : !0,
      strictNumbers: (g = (E = O.strictNumbers) !== null && E !== void 0 ? E : Ot) !== null && g !== void 0 ? g : !0,
      strictTypes: (A = (M = O.strictTypes) !== null && M !== void 0 ? M : Ot) !== null && A !== void 0 ? A : "log",
      strictTuples: (F = (C = O.strictTuples) !== null && C !== void 0 ? C : Ot) !== null && F !== void 0 ? F : "log",
      strictRequired: (K = (B = O.strictRequired) !== null && B !== void 0 ? B : Ot) !== null && K !== void 0 ? K : !1,
      code: O.code ? { ...O.code, optimize: $r, regExp: kr } : { optimize: $r, regExp: kr },
      loopRequired: (J = O.loopRequired) !== null && J !== void 0 ? J : w,
      loopEnum: (se = O.loopEnum) !== null && se !== void 0 ? se : w,
      meta: (de = O.meta) !== null && de !== void 0 ? de : !0,
      messages: (_e = O.messages) !== null && _e !== void 0 ? _e : !0,
      inlineRefs: (ke = O.inlineRefs) !== null && ke !== void 0 ? ke : !0,
      schemaId: (Oe = O.schemaId) !== null && Oe !== void 0 ? Oe : "$id",
      addUsedSchema: (Ee = O.addUsedSchema) !== null && Ee !== void 0 ? Ee : !0,
      validateSchema: (lt = O.validateSchema) !== null && lt !== void 0 ? lt : !0,
      validateFormats: (Be = O.validateFormats) !== null && Be !== void 0 ? Be : !0,
      unicodeRegExp: (yr = O.unicodeRegExp) !== null && yr !== void 0 ? yr : !0,
      int32range: (gr = O.int32range) !== null && gr !== void 0 ? gr : !0,
      uriResolver: wt
    };
  }
  class D {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...T(b) };
      const { es5: P, lines: S } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: m, es5: P, lines: S }), this.logger = W(b.logger);
      const d = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), x.call(this, _, b, "NOT SUPPORTED"), x.call(this, y, b, "DEPRECATED", "warn"), this._metaOpts = re.call(this), b.formats && le.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && I.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), Y.call(this), b.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: P, schemaId: S } = this.opts;
      let d = u;
      S === "id" && (d = { ...u }, d.id = d.$id, delete d.$id), P && b && this.addMetaSchema(d, d[S], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: P } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[P] || b : void 0;
    }
    validate(b, P) {
      let S;
      if (typeof b == "string") {
        if (S = this.getSchema(b), !S)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        S = this.compile(b);
      const d = S(P);
      return "$async" in S || (this.errors = S.errors), d;
    }
    compile(b, P) {
      const S = this._addSchema(b, P);
      return S.validate || this._compileSchemaEnv(S);
    }
    compileAsync(b, P) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: S } = this.opts;
      return d.call(this, b, P);
      async function d(A, C) {
        await $.call(this, A.$schema);
        const F = this._addSchema(A, C);
        return F.validate || N.call(this, F);
      }
      async function $(A) {
        A && !this.getSchema(A) && await d.call(this, { $ref: A }, !0);
      }
      async function N(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (C) {
          if (!(C instanceof i.default))
            throw C;
          return E.call(this, C), await g.call(this, C.missingSchema), N.call(this, A);
        }
      }
      function E({ missingSchema: A, missingRef: C }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${C} cannot be resolved`);
      }
      async function g(A) {
        const C = await M.call(this, A);
        this.refs[A] || await $.call(this, C.$schema), this.refs[A] || this.addSchema(C, A, P);
      }
      async function M(A) {
        const C = this._loading[A];
        if (C)
          return C;
        try {
          return await (this._loading[A] = S(A));
        } finally {
          delete this._loading[A];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, P, S, d = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const N of b)
          this.addSchema(N, void 0, S, d);
        return this;
      }
      let $;
      if (typeof b == "object") {
        const { schemaId: N } = this.opts;
        if ($ = b[N], $ !== void 0 && typeof $ != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return P = (0, c.normalizeId)(P || $), this._checkUnique(P), this.schemas[P] = this._addSchema(b, S, P, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, P, S = this.opts.validateSchema) {
      return this.addSchema(b, P, !0, S), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, P) {
      if (typeof b == "boolean")
        return !0;
      let S;
      if (S = b.$schema, S !== void 0 && typeof S != "string")
        throw new Error("$schema must be a string");
      if (S = S || this.opts.defaultMeta || this.defaultMeta(), !S)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(S, b);
      if (!d && P) {
        const $ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error($);
        else
          throw new Error($);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let P;
      for (; typeof (P = X.call(this, b)) == "string"; )
        b = P;
      if (P === void 0) {
        const { schemaId: S } = this.opts, d = new a.SchemaEnv({ schema: {}, schemaId: S });
        if (P = a.resolveSchema.call(this, d, b), !P)
          return;
        this.refs[b] = P;
      }
      return P.validate || this._compileSchemaEnv(P);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const P = X.call(this, b);
          return typeof P == "object" && this._cache.delete(P.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const P = b;
          this._cache.delete(P);
          let S = b[this.opts.schemaId];
          return S && (S = (0, c.normalizeId)(S), delete this.schemas[S], delete this.refs[S]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const P of b)
        this.addKeyword(P);
      return this;
    }
    addKeyword(b, P) {
      let S;
      if (typeof b == "string")
        S = b, typeof P == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), P.keyword = S);
      else if (typeof b == "object" && P === void 0) {
        if (P = b, S = P.keyword, Array.isArray(S) && !S.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, S, P), !P)
        return (0, l.eachItem)(S, ($) => L.call(this, $)), this;
      j.call(this, P);
      const d = {
        ...P,
        type: (0, f.getJSONTypes)(P.type),
        schemaType: (0, f.getJSONTypes)(P.schemaType)
      };
      return (0, l.eachItem)(S, d.type.length === 0 ? ($) => L.call(this, $, d) : ($) => d.type.forEach((N) => L.call(this, $, d, N))), this;
    }
    getKeyword(b) {
      const P = this.RULES.all[b];
      return typeof P == "object" ? P.definition : !!P;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: P } = this;
      delete P.keywords[b], delete P.all[b];
      for (const S of P.rules) {
        const d = S.rules.findIndex(($) => $.keyword === b);
        d >= 0 && S.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, P) {
      return typeof P == "string" && (P = new RegExp(P)), this.formats[b] = P, this;
    }
    errorsText(b = this.errors, { separator: P = ", ", dataVar: S = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((d) => `${S}${d.instancePath} ${d.message}`).reduce((d, $) => d + P + $);
    }
    $dataMetaSchema(b, P) {
      const S = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const d of P) {
        const $ = d.split("/").slice(1);
        let N = b;
        for (const E of $)
          N = N[E];
        for (const E in S) {
          const g = S[E];
          if (typeof g != "object")
            continue;
          const { $data: M } = g.definition, A = N[E];
          M && A && (N[E] = V(A));
        }
      }
      return b;
    }
    _removeAllSchemas(b, P) {
      for (const S in b) {
        const d = b[S];
        (!P || P.test(S)) && (typeof d == "string" ? delete b[S] : d && !d.meta && (this._cache.delete(d.schema), delete b[S]));
      }
    }
    _addSchema(b, P, S, d = this.opts.validateSchema, $ = this.opts.addUsedSchema) {
      let N;
      const { schemaId: E } = this.opts;
      if (typeof b == "object")
        N = b[E];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let g = this._cache.get(b);
      if (g !== void 0)
        return g;
      S = (0, c.normalizeId)(N || S);
      const M = c.getSchemaRefs.call(this, b, S);
      return g = new a.SchemaEnv({ schema: b, schemaId: E, meta: P, baseId: S, localRefs: M }), this._cache.set(g.schema, g), $ && !S.startsWith("#") && (S && this._checkUnique(S), this.refs[S] = g), d && this.validateSchema(b, !0), g;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : a.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const P = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, b);
      } finally {
        this.opts = P;
      }
    }
  }
  D.ValidationError = n.default, D.MissingRefError = i.default, e.default = D;
  function x(O, b, P, S = "error") {
    for (const d in O) {
      const $ = d;
      $ in b && this.logger[S](`${P}: option ${d}. ${O[$]}`);
    }
  }
  function X(O) {
    return O = (0, c.normalizeId)(O), this.schemas[O] || this.refs[O];
  }
  function Y() {
    const O = this.opts.schemas;
    if (O)
      if (Array.isArray(O))
        this.addSchema(O);
      else
        for (const b in O)
          this.addSchema(O[b], b);
  }
  function le() {
    for (const O in this.opts.formats) {
      const b = this.opts.formats[O];
      b && this.addFormat(O, b);
    }
  }
  function I(O) {
    if (Array.isArray(O)) {
      this.addVocabulary(O);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in O) {
      const P = O[b];
      P.keyword || (P.keyword = b), this.addKeyword(P);
    }
  }
  function re() {
    const O = { ...this.opts };
    for (const b of v)
      delete O[b];
    return O;
  }
  const H = { log() {
  }, warn() {
  }, error() {
  } };
  function W(O) {
    if (O === !1)
      return H;
    if (O === void 0)
      return console;
    if (O.log && O.warn && O.error)
      return O;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(O, b) {
    const { RULES: P } = this;
    if ((0, l.eachItem)(O, (S) => {
      if (P.keywords[S])
        throw new Error(`Keyword ${S} is already defined`);
      if (!Q.test(S))
        throw new Error(`Keyword ${S} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(O, b, P) {
    var S;
    const d = b == null ? void 0 : b.post;
    if (P && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: $ } = this;
    let N = d ? $.post : $.rules.find(({ type: g }) => g === P);
    if (N || (N = { type: P, rules: [] }, $.rules.push(N)), $.keywords[O] = !0, !b)
      return;
    const E = {
      keyword: O,
      definition: {
        ...b,
        type: (0, f.getJSONTypes)(b.type),
        schemaType: (0, f.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? q.call(this, N, E, b.before) : N.rules.push(E), $.all[O] = E, (S = b.implements) === null || S === void 0 || S.forEach((g) => this.addKeyword(g));
  }
  function q(O, b, P) {
    const S = O.rules.findIndex((d) => d.keyword === P);
    S >= 0 ? O.rules.splice(S, 0, b) : (O.rules.push(b), this.logger.warn(`rule ${P} is not defined`));
  }
  function j(O) {
    let { metaSchema: b } = O;
    b !== void 0 && (O.$data && this.opts.$data && (b = V(b)), O.validateSchema = this.compile(b, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function V(O) {
    return { anyOf: [O, G] };
  }
})(yv);
var $d = {}, vd = {}, _d = {};
Object.defineProperty(_d, "__esModule", { value: !0 });
const i2 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
_d.default = i2;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.callRef = Bn.getValidate = void 0;
const s2 = Vi, cy = $e, Pt = ye, ni = mr, ly = Tt, Va = ee, a2 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: a, opts: o, self: c } = n, { root: f } = s;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = ly.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new s2.default(n.opts.uriResolver, i, r);
    if (l instanceof ly.SchemaEnv)
      return p(l);
    return h(l);
    function u() {
      if (s === f)
        return fo(e, a, s, s.$async);
      const v = t.scopeValue("root", { ref: f });
      return fo(e, (0, Pt._)`${v}.validate`, f, f.$async);
    }
    function p(v) {
      const m = kv(e, v);
      fo(e, m, v, v.$async);
    }
    function h(v) {
      const m = t.scopeValue("schema", o.code.source === !0 ? { ref: v, code: (0, Pt.stringify)(v) } : { ref: v }), _ = t.name("valid"), y = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Pt.nil,
        topSchemaRef: m,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(y), e.ok(_);
    }
  }
};
function kv(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Pt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Bn.getValidate = kv;
function fo(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: a, schemaEnv: o, opts: c } = s, f = c.passContext ? ni.default.this : Pt.nil;
  n ? l() : u();
  function l() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const v = i.let("valid");
    i.try(() => {
      i.code((0, Pt._)`await ${(0, cy.callValidateCode)(e, t, f)}`), h(t), a || i.assign(v, !0);
    }, (m) => {
      i.if((0, Pt._)`!(${m} instanceof ${s.ValidationError})`, () => i.throw(m)), p(m), a || i.assign(v, !1);
    }), e.ok(v);
  }
  function u() {
    e.result((0, cy.callValidateCode)(e, t, f), () => h(t), () => p(t));
  }
  function p(v) {
    const m = (0, Pt._)`${v}.errors`;
    i.assign(ni.default.vErrors, (0, Pt._)`${ni.default.vErrors} === null ? ${m} : ${ni.default.vErrors}.concat(${m})`), i.assign(ni.default.errors, (0, Pt._)`${ni.default.vErrors}.length`);
  }
  function h(v) {
    var m;
    if (!s.opts.unevaluated)
      return;
    const _ = (m = r == null ? void 0 : r.validate) === null || m === void 0 ? void 0 : m.evaluated;
    if (s.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (s.props = Va.mergeEvaluated.props(i, _.props, s.props));
      else {
        const y = i.var("props", (0, Pt._)`${v}.evaluated.props`);
        s.props = Va.mergeEvaluated.props(i, y, s.props, Pt.Name);
      }
    if (s.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (s.items = Va.mergeEvaluated.items(i, _.items, s.items));
      else {
        const y = i.var("items", (0, Pt._)`${v}.evaluated.items`);
        s.items = Va.mergeEvaluated.items(i, y, s.items, Pt.Name);
      }
  }
}
Bn.callRef = fo;
Bn.default = a2;
Object.defineProperty(vd, "__esModule", { value: !0 });
const o2 = _d, c2 = Bn, l2 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  o2.default,
  c2.default
];
vd.default = l2;
var Ed = {}, wd = {};
Object.defineProperty(wd, "__esModule", { value: !0 });
const ko = ye, Hr = ko.operators, Lo = {
  maximum: { okStr: "<=", ok: Hr.LTE, fail: Hr.GT },
  minimum: { okStr: ">=", ok: Hr.GTE, fail: Hr.LT },
  exclusiveMaximum: { okStr: "<", ok: Hr.LT, fail: Hr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Hr.GT, fail: Hr.LTE }
}, u2 = {
  message: ({ keyword: e, schemaCode: t }) => (0, ko.str)`must be ${Lo[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ko._)`{comparison: ${Lo[e].okStr}, limit: ${t}}`
}, f2 = {
  keyword: Object.keys(Lo),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: u2,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ko._)`${r} ${Lo[t].fail} ${n} || isNaN(${r})`);
  }
};
wd.default = f2;
var bd = {};
Object.defineProperty(bd, "__esModule", { value: !0 });
const vs = ye, d2 = {
  message: ({ schemaCode: e }) => (0, vs.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, vs._)`{multipleOf: ${e}}`
}, h2 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: d2,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, a = t.let("res"), o = s ? (0, vs._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}` : (0, vs._)`${a} !== parseInt(${a})`;
    e.fail$data((0, vs._)`(${n} === 0 || (${a} = ${r}/${n}, ${o}))`);
  }
};
bd.default = h2;
var Sd = {}, Pd = {};
Object.defineProperty(Pd, "__esModule", { value: !0 });
function Lv(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Pd.default = Lv;
Lv.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Sd, "__esModule", { value: !0 });
const Cn = ye, p2 = ee, m2 = Pd, y2 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Cn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Cn._)`{limit: ${e}}`
}, g2 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: y2,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Cn.operators.GT : Cn.operators.LT, a = i.opts.unicode === !1 ? (0, Cn._)`${r}.length` : (0, Cn._)`${(0, p2.useFunc)(e.gen, m2.default)}(${r})`;
    e.fail$data((0, Cn._)`${a} ${s} ${n}`);
  }
};
Sd.default = g2;
var Td = {};
Object.defineProperty(Td, "__esModule", { value: !0 });
const $2 = $e, Fo = ye, v2 = {
  message: ({ schemaCode: e }) => (0, Fo.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Fo._)`{pattern: ${e}}`
}, _2 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: v2,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, a = s.opts.unicodeRegExp ? "u" : "", o = r ? (0, Fo._)`(new RegExp(${i}, ${a}))` : (0, $2.usePattern)(e, n);
    e.fail$data((0, Fo._)`!${o}.test(${t})`);
  }
};
Td.default = _2;
var Rd = {};
Object.defineProperty(Rd, "__esModule", { value: !0 });
const _s = ye, E2 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, _s.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, _s._)`{limit: ${e}}`
}, w2 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: E2,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? _s.operators.GT : _s.operators.LT;
    e.fail$data((0, _s._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Rd.default = w2;
var Nd = {};
Object.defineProperty(Nd, "__esModule", { value: !0 });
const ns = $e, Es = ye, b2 = ee, S2 = {
  message: ({ params: { missingProperty: e } }) => (0, Es.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Es._)`{missingProperty: ${e}}`
}, P2 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: S2,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: a } = e, { opts: o } = a;
    if (!s && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (a.allErrors ? f() : l(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const m of r)
        if ((h == null ? void 0 : h[m]) === void 0 && !v.has(m)) {
          const _ = a.schemaEnv.baseId + a.errSchemaPath, y = `required property "${m}" is not defined at "${_}" (strictRequired)`;
          (0, b2.checkStrictMode)(a, y, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || s)
        e.block$data(Es.nil, u);
      else
        for (const h of r)
          (0, ns.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || s) {
        const v = t.let("valid", !0);
        e.block$data(v, () => p(h, v)), e.ok(v);
      } else
        t.if((0, ns.checkMissingProp)(e, r, h)), (0, ns.reportMissingProp)(e, h), t.else();
    }
    function u() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, ns.noPropertyInData)(t, i, h, o.ownProperties), () => e.error());
      });
    }
    function p(h, v) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(v, (0, ns.propertyInData)(t, i, h, o.ownProperties)), t.if((0, Es.not)(v), () => {
          e.error(), t.break();
        });
      }, Es.nil);
    }
  }
};
Nd.default = P2;
var Od = {};
Object.defineProperty(Od, "__esModule", { value: !0 });
const ws = ye, T2 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, ws.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, ws._)`{limit: ${e}}`
}, R2 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: T2,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? ws.operators.GT : ws.operators.LT;
    e.fail$data((0, ws._)`${r}.length ${i} ${n}`);
  }
};
Od.default = R2;
var Ad = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const Fv = fc;
Fv.code = 'require("ajv/dist/runtime/equal").default';
aa.default = Fv;
Object.defineProperty(Ad, "__esModule", { value: !0 });
const Rl = Ve, Ye = ye, N2 = ee, O2 = aa, A2 = {
  message: ({ params: { i: e, j: t } }) => (0, Ye.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ye._)`{i: ${e}, j: ${t}}`
}, I2 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: A2,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: a, it: o } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = s.items ? (0, Rl.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, Ye._)`${a} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, Ye._)`${r}.length`), m = t.let("j");
      e.setParams({ i: v, j: m }), t.assign(c, !0), t.if((0, Ye._)`${v} > 1`, () => (u() ? p : h)(v, m));
    }
    function u() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function p(v, m) {
      const _ = t.name("item"), y = (0, Rl.checkDataTypes)(f, _, o.opts.strictNumbers, Rl.DataType.Wrong), w = t.const("indices", (0, Ye._)`{}`);
      t.for((0, Ye._)`;${v}--;`, () => {
        t.let(_, (0, Ye._)`${r}[${v}]`), t.if(y, (0, Ye._)`continue`), f.length > 1 && t.if((0, Ye._)`typeof ${_} == "string"`, (0, Ye._)`${_} += "_"`), t.if((0, Ye._)`typeof ${w}[${_}] == "number"`, () => {
          t.assign(m, (0, Ye._)`${w}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ye._)`${w}[${_}] = ${v}`);
      });
    }
    function h(v, m) {
      const _ = (0, N2.useFunc)(t, O2.default), y = t.name("outer");
      t.label(y).for((0, Ye._)`;${v}--;`, () => t.for((0, Ye._)`${m} = ${v}; ${m}--;`, () => t.if((0, Ye._)`${_}(${r}[${v}], ${r}[${m}])`, () => {
        e.error(), t.assign(c, !1).break(y);
      })));
    }
  }
};
Ad.default = I2;
var Id = {};
Object.defineProperty(Id, "__esModule", { value: !0 });
const mu = ye, C2 = ee, D2 = aa, k2 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, mu._)`{allowedValue: ${e}}`
}, L2 = {
  keyword: "const",
  $data: !0,
  error: k2,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, mu._)`!${(0, C2.useFunc)(t, D2.default)}(${r}, ${i})`) : e.fail((0, mu._)`${s} !== ${r}`);
  }
};
Id.default = L2;
var Cd = {};
Object.defineProperty(Cd, "__esModule", { value: !0 });
const ls = ye, F2 = ee, j2 = aa, U2 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, ls._)`{allowedValues: ${e}}`
}, M2 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: U2,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, F2.useFunc)(t, j2.default));
    let l;
    if (o || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", s);
      l = (0, ls.or)(...i.map((v, m) => p(h, m)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", s, (h) => t.if((0, ls._)`${f()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, v) {
      const m = i[v];
      return typeof m == "object" && m !== null ? (0, ls._)`${f()}(${r}, ${h}[${v}])` : (0, ls._)`${r} === ${m}`;
    }
  }
};
Cd.default = M2;
Object.defineProperty(Ed, "__esModule", { value: !0 });
const x2 = wd, V2 = bd, q2 = Sd, B2 = Td, G2 = Rd, H2 = Nd, z2 = Od, K2 = Ad, W2 = Id, Y2 = Cd, X2 = [
  // number
  x2.default,
  V2.default,
  // string
  q2.default,
  B2.default,
  // object
  G2.default,
  H2.default,
  // array
  z2.default,
  K2.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  W2.default,
  Y2.default
];
Ed.default = X2;
var Dd = {}, qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.validateAdditionalItems = void 0;
const Dn = ye, yu = ee, J2 = {
  message: ({ params: { len: e } }) => (0, Dn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Dn._)`{limit: ${e}}`
}, Q2 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: J2,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, yu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    jv(e, n);
  }
};
function jv(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: a } = e;
  a.items = !0;
  const o = r.const("len", (0, Dn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Dn._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, yu.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, Dn._)`${o} <= ${t.length}`);
    r.if((0, Dn.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, o, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: yu.Type.Num }, f), a.allErrors || r.if((0, Dn.not)(f), () => r.break());
    });
  }
}
qi.validateAdditionalItems = jv;
qi.default = Q2;
var kd = {}, Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
Bi.validateTuple = void 0;
const uy = ye, ho = ee, Z2 = $e, eM = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Uv(e, "additionalItems", t);
    r.items = !0, !(0, ho.alwaysValidSchema)(r, t) && e.ok((0, Z2.validateArray)(e));
  }
};
function Uv(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: a, it: o } = e;
  l(i), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = ho.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), f = n.const("len", (0, uy._)`${s}.length`);
  r.forEach((u, p) => {
    (0, ho.alwaysValidSchema)(o, u) || (n.if((0, uy._)`${f} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: p, errSchemaPath: h } = o, v = r.length, m = v === u.minItems && (v === u.maxItems || u[t] === !1);
    if (p.strictTuples && !m) {
      const _ = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, ho.checkStrictMode)(o, _, p.strictTuples);
    }
  }
}
Bi.validateTuple = Uv;
Bi.default = eM;
Object.defineProperty(kd, "__esModule", { value: !0 });
const tM = Bi, rM = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, tM.validateTuple)(e, "items")
};
kd.default = rM;
var Ld = {};
Object.defineProperty(Ld, "__esModule", { value: !0 });
const fy = ye, nM = ee, iM = $e, sM = qi, aM = {
  message: ({ params: { len: e } }) => (0, fy.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, fy._)`{limit: ${e}}`
}, oM = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: aM,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, nM.alwaysValidSchema)(n, t) && (i ? (0, sM.validateAdditionalItems)(e, i) : e.ok((0, iM.validateArray)(e)));
  }
};
Ld.default = oM;
var Fd = {};
Object.defineProperty(Fd, "__esModule", { value: !0 });
const Mt = ye, qa = ee, cM = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Mt.str)`must contain at least ${e} valid item(s)` : (0, Mt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Mt._)`{minContains: ${e}}` : (0, Mt._)`{minContains: ${e}, maxContains: ${t}}`
}, lM = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: cM,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let a, o;
    const { minContains: c, maxContains: f } = n;
    s.opts.next ? (a = c === void 0 ? 1 : c, o = f) : a = 1;
    const l = t.const("len", (0, Mt._)`${i}.length`);
    if (e.setParams({ min: a, max: o }), o === void 0 && a === 0) {
      (0, qa.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && a > o) {
      (0, qa.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, qa.alwaysValidSchema)(s, r)) {
      let m = (0, Mt._)`${l} >= ${a}`;
      o !== void 0 && (m = (0, Mt._)`${m} && ${l} <= ${o}`), e.pass(m);
      return;
    }
    s.items = !0;
    const u = t.name("valid");
    o === void 0 && a === 1 ? h(u, () => t.if(u, () => t.break())) : a === 0 ? (t.let(u, !0), o !== void 0 && t.if((0, Mt._)`${i}.length > 0`, p)) : (t.let(u, !1), p()), e.result(u, () => e.reset());
    function p() {
      const m = t.name("_valid"), _ = t.let("count", 0);
      h(m, () => t.if(m, () => v(_)));
    }
    function h(m, _) {
      t.forRange("i", 0, l, (y) => {
        e.subschema({
          keyword: "contains",
          dataProp: y,
          dataPropType: qa.Type.Num,
          compositeRule: !0
        }, m), _();
      });
    }
    function v(m) {
      t.code((0, Mt._)`${m}++`), o === void 0 ? t.if((0, Mt._)`${m} >= ${a}`, () => t.assign(u, !0).break()) : (t.if((0, Mt._)`${m} > ${o}`, () => t.assign(u, !1).break()), a === 1 ? t.assign(u, !0) : t.if((0, Mt._)`${m} >= ${a}`, () => t.assign(u, !0)));
    }
  }
};
Fd.default = lM;
var Mv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ye, r = ee, n = $e;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = s(c);
      a(c, f), o(c, l);
    }
  };
  function s({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const p = Array.isArray(c[u]) ? f : l;
      p[u] = c[u];
    }
    return [f, l];
  }
  function a(c, f = c.schema) {
    const { gen: l, data: u, it: p } = c;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const v in f) {
      const m = f[v];
      if (m.length === 0)
        continue;
      const _ = (0, n.propertyInData)(l, u, v, p.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: m.length,
        deps: m.join(", ")
      }), p.allErrors ? l.if(_, () => {
        for (const y of m)
          (0, n.checkReportMissingProp)(c, y);
      }) : (l.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, m, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function o(c, f = c.schema) {
    const { gen: l, data: u, keyword: p, it: h } = c, v = l.name("valid");
    for (const m in f)
      (0, r.alwaysValidSchema)(h, f[m]) || (l.if(
        (0, n.propertyInData)(l, u, m, h.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: p, schemaProp: m }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = o, e.default = i;
})(Mv);
var jd = {};
Object.defineProperty(jd, "__esModule", { value: !0 });
const xv = ye, uM = ee, fM = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, xv._)`{propertyName: ${e.propertyName}}`
}, dM = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: fM,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, uM.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, s), t.if((0, xv.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
jd.default = dM;
var Ec = {};
Object.defineProperty(Ec, "__esModule", { value: !0 });
const Ba = $e, Kt = ye, hM = mr, Ga = ee, pM = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Kt._)`{additionalProperty: ${e.additionalProperty}}`
}, mM = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: pM,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Ga.alwaysValidSchema)(a, r))
      return;
    const f = (0, Ba.allSchemaProperties)(n.properties), l = (0, Ba.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, Kt._)`${s} === ${hM.default.errors}`);
    function u() {
      t.forIn("key", i, (_) => {
        !f.length && !l.length ? v(_) : t.if(p(_), () => v(_));
      });
    }
    function p(_) {
      let y;
      if (f.length > 8) {
        const w = (0, Ga.schemaRefOrVal)(a, n.properties, "properties");
        y = (0, Ba.isOwnProperty)(t, w, _);
      } else f.length ? y = (0, Kt.or)(...f.map((w) => (0, Kt._)`${_} === ${w}`)) : y = Kt.nil;
      return l.length && (y = (0, Kt.or)(y, ...l.map((w) => (0, Kt._)`${(0, Ba.usePattern)(e, w)}.test(${_})`))), (0, Kt.not)(y);
    }
    function h(_) {
      t.code((0, Kt._)`delete ${i}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Ga.alwaysValidSchema)(a, r)) {
        const y = t.name("valid");
        c.removeAdditional === "failing" ? (m(_, y, !1), t.if((0, Kt.not)(y), () => {
          e.reset(), h(_);
        })) : (m(_, y), o || t.if((0, Kt.not)(y), () => t.break()));
      }
    }
    function m(_, y, w) {
      const T = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: Ga.Type.Str
      };
      w === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, y);
    }
  }
};
Ec.default = mM;
var Ud = {};
Object.defineProperty(Ud, "__esModule", { value: !0 });
const yM = $c(), dy = $e, Nl = ee, hy = Ec, gM = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && hy.default.code(new yM.KeywordCxt(s, hy.default, "additionalProperties"));
    const a = (0, dy.allSchemaProperties)(r);
    for (const u of a)
      s.definedProperties.add(u);
    s.opts.unevaluated && a.length && s.props !== !0 && (s.props = Nl.mergeEvaluated.props(t, (0, Nl.toHash)(a), s.props));
    const o = a.filter((u) => !(0, Nl.alwaysValidSchema)(s, r[u]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const u of o)
      f(u) ? l(u) : (t.if((0, dy.propertyInData)(t, i, u, s.opts.ownProperties)), l(u), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return s.opts.useDefaults && !s.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
Ud.default = gM;
var Md = {};
Object.defineProperty(Md, "__esModule", { value: !0 });
const py = $e, Ha = ye, my = ee, yy = ee, $M = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: a } = s, o = (0, py.allSchemaProperties)(r), c = o.filter((m) => (0, my.alwaysValidSchema)(s, r[m]));
    if (o.length === 0 || c.length === o.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof Ha.Name) && (s.props = (0, yy.evaluatedPropsToName)(t, s.props));
    const { props: u } = s;
    p();
    function p() {
      for (const m of o)
        f && h(m), s.allErrors ? v(m) : (t.var(l, !0), v(m), t.if(l));
    }
    function h(m) {
      for (const _ in f)
        new RegExp(m).test(_) && (0, my.checkStrictMode)(s, `property ${_} matches pattern ${m} (use allowMatchingProperties)`);
    }
    function v(m) {
      t.forIn("key", n, (_) => {
        t.if((0, Ha._)`${(0, py.usePattern)(e, m)}.test(${_})`, () => {
          const y = c.includes(m);
          y || e.subschema({
            keyword: "patternProperties",
            schemaProp: m,
            dataProp: _,
            dataPropType: yy.Type.Str
          }, l), s.opts.unevaluated && u !== !0 ? t.assign((0, Ha._)`${u}[${_}]`, !0) : !y && !s.allErrors && t.if((0, Ha.not)(l), () => t.break());
        });
      });
    }
  }
};
Md.default = $M;
var xd = {};
Object.defineProperty(xd, "__esModule", { value: !0 });
const vM = ee, _M = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, vM.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
xd.default = _M;
var Vd = {};
Object.defineProperty(Vd, "__esModule", { value: !0 });
const EM = $e, wM = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: EM.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Vd.default = wM;
var qd = {};
Object.defineProperty(qd, "__esModule", { value: !0 });
const po = ye, bM = ee, SM = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, po._)`{passingSchemas: ${e.passing}}`
}, PM = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: SM,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, a = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      s.forEach((l, u) => {
        let p;
        (0, bM.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, po._)`${c} && ${a}`).assign(a, !1).assign(o, (0, po._)`[${o}, ${u}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(o, u), p && e.mergeEvaluated(p, po.Name);
        });
      });
    }
  }
};
qd.default = PM;
var Bd = {};
Object.defineProperty(Bd, "__esModule", { value: !0 });
const TM = ee, RM = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, a) => {
      if ((0, TM.alwaysValidSchema)(n, s))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
Bd.default = RM;
var Gd = {};
Object.defineProperty(Gd, "__esModule", { value: !0 });
const jo = ye, Vv = ee, NM = {
  message: ({ params: e }) => (0, jo.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, jo._)`{failingKeyword: ${e.ifClause}}`
}, OM = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: NM,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Vv.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = gy(n, "then"), s = gy(n, "else");
    if (!i && !s)
      return;
    const a = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(o, f("then", l), f("else", l));
    } else i ? t.if(o, f("then")) : t.if((0, jo.not)(o), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const p = e.subschema({ keyword: l }, o);
        t.assign(a, o), e.mergeValidEvaluated(p, a), u ? t.assign(u, (0, jo._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function gy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Vv.alwaysValidSchema)(e, r);
}
Gd.default = OM;
var Hd = {};
Object.defineProperty(Hd, "__esModule", { value: !0 });
const AM = ee, IM = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, AM.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Hd.default = IM;
Object.defineProperty(Dd, "__esModule", { value: !0 });
const CM = qi, DM = kd, kM = Bi, LM = Ld, FM = Fd, jM = Mv, UM = jd, MM = Ec, xM = Ud, VM = Md, qM = xd, BM = Vd, GM = qd, HM = Bd, zM = Gd, KM = Hd;
function WM(e = !1) {
  const t = [
    // any
    qM.default,
    BM.default,
    GM.default,
    HM.default,
    zM.default,
    KM.default,
    // object
    UM.default,
    MM.default,
    jM.default,
    xM.default,
    VM.default
  ];
  return e ? t.push(DM.default, LM.default) : t.push(CM.default, kM.default), t.push(FM.default), t;
}
Dd.default = WM;
var zd = {}, Kd = {};
Object.defineProperty(Kd, "__esModule", { value: !0 });
const je = ye, YM = {
  message: ({ schemaCode: e }) => (0, je.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, je._)`{format: ${e}}`
}, XM = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: YM,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: a, it: o } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = o;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const v = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), m = r.const("fDef", (0, je._)`${v}[${a}]`), _ = r.let("fType"), y = r.let("format");
      r.if((0, je._)`typeof ${m} == "object" && !(${m} instanceof RegExp)`, () => r.assign(_, (0, je._)`${m}.type || "string"`).assign(y, (0, je._)`${m}.validate`), () => r.assign(_, (0, je._)`"string"`).assign(y, m)), e.fail$data((0, je.or)(w(), T()));
      function w() {
        return c.strictSchema === !1 ? je.nil : (0, je._)`${a} && !${y}`;
      }
      function T() {
        const D = l.$async ? (0, je._)`(${m}.async ? await ${y}(${n}) : ${y}(${n}))` : (0, je._)`${y}(${n})`, x = (0, je._)`(typeof ${y} == "function" ? ${D} : ${y}.test(${n}))`;
        return (0, je._)`${y} && ${y} !== true && ${_} === ${t} && !${x}`;
      }
    }
    function h() {
      const v = u.formats[s];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [m, _, y] = T(v);
      m === t && e.pass(D());
      function w() {
        if (c.strictSchema === !1) {
          u.logger.warn(x());
          return;
        }
        throw new Error(x());
        function x() {
          return `unknown format "${s}" ignored in schema at path "${f}"`;
        }
      }
      function T(x) {
        const X = x instanceof RegExp ? (0, je.regexpCode)(x) : c.code.formats ? (0, je._)`${c.code.formats}${(0, je.getProperty)(s)}` : void 0, Y = r.scopeValue("formats", { key: s, ref: x, code: X });
        return typeof x == "object" && !(x instanceof RegExp) ? [x.type || "string", x.validate, (0, je._)`${Y}.validate`] : ["string", x, Y];
      }
      function D() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, je._)`await ${y}(${n})`;
        }
        return typeof _ == "function" ? (0, je._)`${y}(${n})` : (0, je._)`${y}.test(${n})`;
      }
    }
  }
};
Kd.default = XM;
Object.defineProperty(zd, "__esModule", { value: !0 });
const JM = Kd, QM = [JM.default];
zd.default = QM;
var Ai = {};
Object.defineProperty(Ai, "__esModule", { value: !0 });
Ai.contentVocabulary = Ai.metadataVocabulary = void 0;
Ai.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Ai.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty($d, "__esModule", { value: !0 });
const ZM = vd, ex = Ed, tx = Dd, rx = zd, $y = Ai, nx = [
  ZM.default,
  ex.default,
  (0, tx.default)(),
  rx.default,
  $y.metadataVocabulary,
  $y.contentVocabulary
];
$d.default = nx;
var Wd = {}, wc = {};
Object.defineProperty(wc, "__esModule", { value: !0 });
wc.DiscrError = void 0;
var vy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(vy || (wc.DiscrError = vy = {}));
Object.defineProperty(Wd, "__esModule", { value: !0 });
const oi = ye, gu = wc, _y = Tt, ix = Vi, sx = ee, ax = {
  message: ({ params: { discrError: e, tagName: t } }) => e === gu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, oi._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, ox = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: ax,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: a } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, oi._)`${r}${(0, oi.getProperty)(o)}`);
    t.if((0, oi._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: gu.DiscrError.Tag, tag: f, tagName: o })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const v in h)
        t.elseIf((0, oi._)`${f} === ${v}`), t.assign(c, u(h[v]));
      t.else(), e.error(!1, { discrError: gu.DiscrError.Mapping, tag: f, tagName: o }), t.endIf();
    }
    function u(h) {
      const v = t.name("valid"), m = e.subschema({ keyword: "oneOf", schemaProp: h }, v);
      return e.mergeEvaluated(m, oi.Name), v;
    }
    function p() {
      var h;
      const v = {}, m = y(i);
      let _ = !0;
      for (let D = 0; D < a.length; D++) {
        let x = a[D];
        if (x != null && x.$ref && !(0, sx.schemaHasRulesButRef)(x, s.self.RULES)) {
          const Y = x.$ref;
          if (x = _y.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, Y), x instanceof _y.SchemaEnv && (x = x.schema), x === void 0)
            throw new ix.default(s.opts.uriResolver, s.baseId, Y);
        }
        const X = (h = x == null ? void 0 : x.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof X != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        _ = _ && (m || y(x)), w(X, D);
      }
      if (!_)
        throw new Error(`discriminator: "${o}" must be required`);
      return v;
      function y({ required: D }) {
        return Array.isArray(D) && D.includes(o);
      }
      function w(D, x) {
        if (D.const)
          T(D.const, x);
        else if (D.enum)
          for (const X of D.enum)
            T(X, x);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function T(D, x) {
        if (typeof D != "string" || D in v)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        v[D] = x;
      }
    }
  }
};
Wd.default = ox;
const cx = "http://json-schema.org/draft-07/schema#", lx = "http://json-schema.org/draft-07/schema#", ux = "Core schema meta-schema", fx = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, dx = [
  "object",
  "boolean"
], hx = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, px = {
  $schema: cx,
  $id: lx,
  title: ux,
  definitions: fx,
  type: dx,
  properties: hx,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = yv, n = $d, i = Wd, s = px, a = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(s, a) : s;
      this.addMetaSchema(v, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = $c();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var l = ye;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var u = md();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var p = Vi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(uu, uu.exports);
var mx = uu.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = mx, r = ye, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, s = {
    message: ({ keyword: o, schemaCode: c }) => (0, r.str)`should be ${i[o].okStr} ${c}`,
    params: ({ keyword: o, schemaCode: c }) => (0, r._)`{comparison: ${i[o].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(o) {
      const { gen: c, data: f, schemaCode: l, keyword: u, it: p } = o, { opts: h, self: v } = p;
      if (!h.validateFormats)
        return;
      const m = new t.KeywordCxt(p, v.RULES.all.format.definition, "format");
      m.$data ? _() : y();
      function _() {
        const T = c.scopeValue("formats", {
          ref: v.formats,
          code: h.code.formats
        }), D = c.const("fmt", (0, r._)`${T}[${m.schemaCode}]`);
        o.fail$data((0, r.or)((0, r._)`typeof ${D} != "object"`, (0, r._)`${D} instanceof RegExp`, (0, r._)`typeof ${D}.compare != "function"`, w(D)));
      }
      function y() {
        const T = m.schema, D = v.formats[T];
        if (!D || D === !0)
          return;
        if (typeof D != "object" || D instanceof RegExp || typeof D.compare != "function")
          throw new Error(`"${u}": format "${T}" does not define "compare" function`);
        const x = c.scopeValue("formats", {
          key: T,
          ref: D,
          code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(T)}` : void 0
        });
        o.fail$data(w(x));
      }
      function w(T) {
        return (0, r._)`${T}.compare(${f}, ${l}) ${i[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = a;
})(mv);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = pv, n = mv, i = ye, s = new i.Name("fullFormats"), a = new i.Name("fastFormats"), o = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(f, l, r.fullFormats, s), f;
    const [u, p] = l.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, s], h = l.formats || r.formatNames;
    return c(f, h, u, p), l.keywords && (0, n.default)(f), f;
  };
  o.get = (f, l = "full") => {
    const p = (l === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!p)
      throw new Error(`Unknown format "${f}"`);
    return p;
  };
  function c(f, l, u, p) {
    var h, v;
    (h = (v = f.opts.code).formats) !== null && h !== void 0 || (v.formats = (0, i._)`require("ajv-formats/dist/formats").${p}`);
    for (const m of l)
      f.addFormat(m, u[m]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(lu, lu.exports);
var yx = lu.exports;
const gx = /* @__PURE__ */ Zy(yx), $x = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !vx(i, s) && n || Object.defineProperty(e, r, s);
}, vx = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, _x = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Ex = (e, t) => `/* Wrapped ${e}*/
${t}`, wx = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), bx = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Sx = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = Ex.bind(null, n, t.toString());
  Object.defineProperty(i, "name", bx);
  const { writable: s, enumerable: a, configurable: o } = wx;
  Object.defineProperty(e, "toString", { value: i, writable: s, enumerable: a, configurable: o });
};
function Px(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    $x(e, t, i, r);
  return _x(e, t), Sx(e, t, n), e;
}
const Ey = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: s = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, o, c;
  const f = function(...l) {
    const u = this, p = () => {
      a = void 0, o && (clearTimeout(o), o = void 0), s && (c = e.apply(u, l));
    }, h = () => {
      o = void 0, a && (clearTimeout(a), a = void 0), s && (c = e.apply(u, l));
    }, v = i && !a;
    return clearTimeout(a), a = setTimeout(p, r), n > 0 && n !== Number.POSITIVE_INFINITY && !o && (o = setTimeout(h, n)), v && (c = e.apply(u, l)), c;
  };
  return Px(f, e), f.cancel = () => {
    a && (clearTimeout(a), a = void 0), o && (clearTimeout(o), o = void 0);
  }, f;
};
var $u = { exports: {} };
const Tx = "2.0.0", qv = 256, Rx = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Nx = 16, Ox = qv - 6, Ax = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var bc = {
  MAX_LENGTH: qv,
  MAX_SAFE_COMPONENT_LENGTH: Nx,
  MAX_SAFE_BUILD_LENGTH: Ox,
  MAX_SAFE_INTEGER: Rx,
  RELEASE_TYPES: Ax,
  SEMVER_SPEC_VERSION: Tx,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Ix = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Sc = Ix;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = bc, s = Sc;
  t = e.exports = {};
  const a = t.re = [], o = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [p, n]
  ], v = (_) => {
    for (const [y, w] of h)
      _ = _.split(`${y}*`).join(`${y}{0,${w}}`).split(`${y}+`).join(`${y}{1,${w}}`);
    return _;
  }, m = (_, y, w) => {
    const T = v(y), D = u++;
    s(_, D, y), l[_] = D, c[D] = y, f[D] = T, a[D] = new RegExp(y, w ? "g" : void 0), o[D] = new RegExp(T, w ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), m("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${p}+`), m("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), m("FULL", `^${c[l.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), m("LOOSE", `^${c[l.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), m("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), m("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", c[l.COERCE], !0), m("COERCERTLFULL", c[l.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})($u, $u.exports);
var oa = $u.exports;
const Cx = Object.freeze({ loose: !0 }), Dx = Object.freeze({}), kx = (e) => e ? typeof e != "object" ? Cx : e : Dx;
var Yd = kx;
const wy = /^[0-9]+$/, Bv = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = wy.test(e), n = wy.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Lx = (e, t) => Bv(t, e);
var Gv = {
  compareIdentifiers: Bv,
  rcompareIdentifiers: Lx
};
const za = Sc, { MAX_LENGTH: by, MAX_SAFE_INTEGER: Ka } = bc, { safeRe: Wa, t: Ya } = oa, Fx = Yd, { compareIdentifiers: Ol } = Gv;
let jx = class or {
  constructor(t, r) {
    if (r = Fx(r), t instanceof or) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > by)
      throw new TypeError(
        `version is longer than ${by} characters`
      );
    za("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Wa[Ya.LOOSE] : Wa[Ya.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Ka || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ka || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ka || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < Ka)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (za("SemVer.compare", this.version, this.options, t), !(t instanceof or)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new or(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof or || (t = new or(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof or || (t = new or(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (za("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ol(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof or || (t = new or(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (za("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ol(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Wa[Ya.PRERELEASELOOSE] : Wa[Ya.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]), Ol(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Et = jx;
const Sy = Et, Ux = (e, t, r = !1) => {
  if (e instanceof Sy)
    return e;
  try {
    return new Sy(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Gi = Ux;
const Mx = Gi, xx = (e, t) => {
  const r = Mx(e, t);
  return r ? r.version : null;
};
var Vx = xx;
const qx = Gi, Bx = (e, t) => {
  const r = qx(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Gx = Bx;
const Py = Et, Hx = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Py(
      e instanceof Py ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var zx = Hx;
const Ty = Gi, Kx = (e, t) => {
  const r = Ty(e, null, !0), n = Ty(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const s = i > 0, a = s ? r : n, o = s ? n : r, c = !!a.prerelease.length;
  if (!!o.prerelease.length && !c) {
    if (!o.patch && !o.minor)
      return "major";
    if (o.compareMain(a) === 0)
      return o.minor && !o.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var Wx = Kx;
const Yx = Et, Xx = (e, t) => new Yx(e, t).major;
var Jx = Xx;
const Qx = Et, Zx = (e, t) => new Qx(e, t).minor;
var e3 = Zx;
const t3 = Et, r3 = (e, t) => new t3(e, t).patch;
var n3 = r3;
const i3 = Gi, s3 = (e, t) => {
  const r = i3(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var a3 = s3;
const Ry = Et, o3 = (e, t, r) => new Ry(e, r).compare(new Ry(t, r));
var nr = o3;
const c3 = nr, l3 = (e, t, r) => c3(t, e, r);
var u3 = l3;
const f3 = nr, d3 = (e, t) => f3(e, t, !0);
var h3 = d3;
const Ny = Et, p3 = (e, t, r) => {
  const n = new Ny(e, r), i = new Ny(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Xd = p3;
const m3 = Xd, y3 = (e, t) => e.sort((r, n) => m3(r, n, t));
var g3 = y3;
const $3 = Xd, v3 = (e, t) => e.sort((r, n) => $3(n, r, t));
var _3 = v3;
const E3 = nr, w3 = (e, t, r) => E3(e, t, r) > 0;
var Pc = w3;
const b3 = nr, S3 = (e, t, r) => b3(e, t, r) < 0;
var Jd = S3;
const P3 = nr, T3 = (e, t, r) => P3(e, t, r) === 0;
var Hv = T3;
const R3 = nr, N3 = (e, t, r) => R3(e, t, r) !== 0;
var zv = N3;
const O3 = nr, A3 = (e, t, r) => O3(e, t, r) >= 0;
var Qd = A3;
const I3 = nr, C3 = (e, t, r) => I3(e, t, r) <= 0;
var Zd = C3;
const D3 = Hv, k3 = zv, L3 = Pc, F3 = Qd, j3 = Jd, U3 = Zd, M3 = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return D3(e, r, n);
    case "!=":
      return k3(e, r, n);
    case ">":
      return L3(e, r, n);
    case ">=":
      return F3(e, r, n);
    case "<":
      return j3(e, r, n);
    case "<=":
      return U3(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Kv = M3;
const x3 = Et, V3 = Gi, { safeRe: Xa, t: Ja } = oa, q3 = (e, t) => {
  if (e instanceof x3)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Xa[Ja.COERCEFULL] : Xa[Ja.COERCE]);
  else {
    const c = t.includePrerelease ? Xa[Ja.COERCERTLFULL] : Xa[Ja.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return V3(`${n}.${i}.${s}${a}${o}`, t);
};
var B3 = q3;
class G3 {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var H3 = G3, Al, Oy;
function ir() {
  if (Oy) return Al;
  Oy = 1;
  const e = /\s+/g;
  class t {
    constructor(L, q) {
      if (q = i(q), L instanceof t)
        return L.loose === !!q.loose && L.includePrerelease === !!q.includePrerelease ? L : new t(L.raw, q);
      if (L instanceof s)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = q, this.loose = !!q.loose, this.includePrerelease = !!q.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((j) => this.parseRange(j.trim())).filter((j) => j.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const j = this.set[0];
        if (this.set = this.set.filter((G) => !m(G[0])), this.set.length === 0)
          this.set = [j];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && _(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const q = this.set[L];
          for (let j = 0; j < q.length; j++)
            j > 0 && (this.formatted += " "), this.formatted += q[j].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(L) {
      const j = ((this.options.includePrerelease && h) | (this.options.loose && v)) + ":" + L, G = n.get(j);
      if (G)
        return G;
      const V = this.options.loose, O = V ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      L = L.replace(O, W(this.options.includePrerelease)), a("hyphen replace", L), L = L.replace(c[f.COMPARATORTRIM], l), a("comparator trim", L), L = L.replace(c[f.TILDETRIM], u), a("tilde trim", L), L = L.replace(c[f.CARETTRIM], p), a("caret trim", L);
      let b = L.split(" ").map(($) => w($, this.options)).join(" ").split(/\s+/).map(($) => H($, this.options));
      V && (b = b.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(c[f.COMPARATORLOOSE])))), a("range list", b);
      const P = /* @__PURE__ */ new Map(), S = b.map(($) => new s($, this.options));
      for (const $ of S) {
        if (m($))
          return [$];
        P.set($.value, $);
      }
      P.size > 1 && P.has("") && P.delete("");
      const d = [...P.values()];
      return n.set(j, d), d;
    }
    intersects(L, q) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((j) => y(j, q) && L.set.some((G) => y(G, q) && j.every((V) => G.every((O) => V.intersects(O, q)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new o(L, this.options);
        } catch {
          return !1;
        }
      for (let q = 0; q < this.set.length; q++)
        if (Q(this.set[q], L, this.options))
          return !0;
      return !1;
    }
  }
  Al = t;
  const r = H3, n = new r(), i = Yd, s = Tc(), a = Sc, o = Et, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: p
  } = oa, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: v } = bc, m = (k) => k.value === "<0.0.0-0", _ = (k) => k.value === "", y = (k, L) => {
    let q = !0;
    const j = k.slice();
    let G = j.pop();
    for (; q && j.length; )
      q = j.every((V) => G.intersects(V, L)), G = j.pop();
    return q;
  }, w = (k, L) => (k = k.replace(c[f.BUILD], ""), a("comp", k, L), k = X(k, L), a("caret", k), k = D(k, L), a("tildes", k), k = le(k, L), a("xrange", k), k = re(k, L), a("stars", k), k), T = (k) => !k || k.toLowerCase() === "x" || k === "*", D = (k, L) => k.trim().split(/\s+/).map((q) => x(q, L)).join(" "), x = (k, L) => {
    const q = L.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return k.replace(q, (j, G, V, O, b) => {
      a("tilde", k, j, G, V, O, b);
      let P;
      return T(G) ? P = "" : T(V) ? P = `>=${G}.0.0 <${+G + 1}.0.0-0` : T(O) ? P = `>=${G}.${V}.0 <${G}.${+V + 1}.0-0` : b ? (a("replaceTilde pr", b), P = `>=${G}.${V}.${O}-${b} <${G}.${+V + 1}.0-0`) : P = `>=${G}.${V}.${O} <${G}.${+V + 1}.0-0`, a("tilde return", P), P;
    });
  }, X = (k, L) => k.trim().split(/\s+/).map((q) => Y(q, L)).join(" "), Y = (k, L) => {
    a("caret", k, L);
    const q = L.loose ? c[f.CARETLOOSE] : c[f.CARET], j = L.includePrerelease ? "-0" : "";
    return k.replace(q, (G, V, O, b, P) => {
      a("caret", k, G, V, O, b, P);
      let S;
      return T(V) ? S = "" : T(O) ? S = `>=${V}.0.0${j} <${+V + 1}.0.0-0` : T(b) ? V === "0" ? S = `>=${V}.${O}.0${j} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.0${j} <${+V + 1}.0.0-0` : P ? (a("replaceCaret pr", P), V === "0" ? O === "0" ? S = `>=${V}.${O}.${b}-${P} <${V}.${O}.${+b + 1}-0` : S = `>=${V}.${O}.${b}-${P} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.${b}-${P} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? O === "0" ? S = `>=${V}.${O}.${b}${j} <${V}.${O}.${+b + 1}-0` : S = `>=${V}.${O}.${b}${j} <${V}.${+O + 1}.0-0` : S = `>=${V}.${O}.${b} <${+V + 1}.0.0-0`), a("caret return", S), S;
    });
  }, le = (k, L) => (a("replaceXRanges", k, L), k.split(/\s+/).map((q) => I(q, L)).join(" ")), I = (k, L) => {
    k = k.trim();
    const q = L.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return k.replace(q, (j, G, V, O, b, P) => {
      a("xRange", k, j, G, V, O, b, P);
      const S = T(V), d = S || T(O), $ = d || T(b), N = $;
      return G === "=" && N && (G = ""), P = L.includePrerelease ? "-0" : "", S ? G === ">" || G === "<" ? j = "<0.0.0-0" : j = "*" : G && N ? (d && (O = 0), b = 0, G === ">" ? (G = ">=", d ? (V = +V + 1, O = 0, b = 0) : (O = +O + 1, b = 0)) : G === "<=" && (G = "<", d ? V = +V + 1 : O = +O + 1), G === "<" && (P = "-0"), j = `${G + V}.${O}.${b}${P}`) : d ? j = `>=${V}.0.0${P} <${+V + 1}.0.0-0` : $ && (j = `>=${V}.${O}.0${P} <${V}.${+O + 1}.0-0`), a("xRange return", j), j;
    });
  }, re = (k, L) => (a("replaceStars", k, L), k.trim().replace(c[f.STAR], "")), H = (k, L) => (a("replaceGTE0", k, L), k.trim().replace(c[L.includePrerelease ? f.GTE0PRE : f.GTE0], "")), W = (k) => (L, q, j, G, V, O, b, P, S, d, $, N) => (T(j) ? q = "" : T(G) ? q = `>=${j}.0.0${k ? "-0" : ""}` : T(V) ? q = `>=${j}.${G}.0${k ? "-0" : ""}` : O ? q = `>=${q}` : q = `>=${q}${k ? "-0" : ""}`, T(S) ? P = "" : T(d) ? P = `<${+S + 1}.0.0-0` : T($) ? P = `<${S}.${+d + 1}.0-0` : N ? P = `<=${S}.${d}.${$}-${N}` : k ? P = `<${S}.${d}.${+$ + 1}-0` : P = `<=${P}`, `${q} ${P}`.trim()), Q = (k, L, q) => {
    for (let j = 0; j < k.length; j++)
      if (!k[j].test(L))
        return !1;
    if (L.prerelease.length && !q.includePrerelease) {
      for (let j = 0; j < k.length; j++)
        if (a(k[j].semver), k[j].semver !== s.ANY && k[j].semver.prerelease.length > 0) {
          const G = k[j].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Al;
}
var Il, Ay;
function Tc() {
  if (Ay) return Il;
  Ay = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], p = l.match(u);
      if (!p)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new o(p[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new o(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Il = t;
  const r = Yd, { safeRe: n, t: i } = oa, s = Kv, a = Sc, o = Et, c = ir();
  return Il;
}
const z3 = ir(), K3 = (e, t, r) => {
  try {
    t = new z3(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Rc = K3;
const W3 = ir(), Y3 = (e, t) => new W3(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var X3 = Y3;
const J3 = Et, Q3 = ir(), Z3 = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new Q3(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new J3(n, r));
  }), n;
};
var eV = Z3;
const tV = Et, rV = ir(), nV = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new rV(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new tV(n, r));
  }), n;
};
var iV = nV;
const Cl = Et, sV = ir(), Iy = Pc, aV = (e, t) => {
  e = new sV(e, t);
  let r = new Cl("0.0.0");
  if (e.test(r) || (r = new Cl("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((a) => {
      const o = new Cl(a.semver.version);
      switch (a.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!s || Iy(o, s)) && (s = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), s && (!r || Iy(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var oV = aV;
const cV = ir(), lV = (e, t) => {
  try {
    return new cV(e, t).range || "*";
  } catch {
    return null;
  }
};
var uV = lV;
const fV = Et, Wv = Tc(), { ANY: dV } = Wv, hV = ir(), pV = Rc, Cy = Pc, Dy = Jd, mV = Zd, yV = Qd, gV = (e, t, r, n) => {
  e = new fV(e, n), t = new hV(t, n);
  let i, s, a, o, c;
  switch (r) {
    case ">":
      i = Cy, s = mV, a = Dy, o = ">", c = ">=";
      break;
    case "<":
      i = Dy, s = yV, a = Cy, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (pV(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, p = null;
    if (l.forEach((h) => {
      h.semver === dV && (h = new Wv(">=0.0.0")), u = u || h, p = p || h, i(h.semver, u.semver, n) ? u = h : a(h.semver, p.semver, n) && (p = h);
    }), u.operator === o || u.operator === c || (!p.operator || p.operator === o) && s(e, p.semver))
      return !1;
    if (p.operator === c && a(e, p.semver))
      return !1;
  }
  return !0;
};
var eh = gV;
const $V = eh, vV = (e, t, r) => $V(e, t, ">", r);
var _V = vV;
const EV = eh, wV = (e, t, r) => EV(e, t, "<", r);
var bV = wV;
const ky = ir(), SV = (e, t, r) => (e = new ky(e, r), t = new ky(t, r), e.intersects(t, r));
var PV = SV;
const TV = Rc, RV = nr;
var NV = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const a = e.sort((l, u) => RV(l, u, r));
  for (const l of a)
    TV(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const o = [];
  for (const [l, u] of n)
    l === u ? o.push(l) : !u && l === a[0] ? o.push("*") : u ? l === a[0] ? o.push(`<=${u}`) : o.push(`${l} - ${u}`) : o.push(`>=${l}`);
  const c = o.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const Ly = ir(), th = Tc(), { ANY: Dl } = th, is = Rc, rh = nr, OV = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Ly(e, r), t = new Ly(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const a = IV(i, s, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, AV = [new th(">=0.0.0-0")], Fy = [new th(">=0.0.0")], IV = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Dl) {
    if (t.length === 1 && t[0].semver === Dl)
      return !0;
    r.includePrerelease ? e = AV : e = Fy;
  }
  if (t.length === 1 && t[0].semver === Dl) {
    if (r.includePrerelease)
      return !0;
    t = Fy;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = jy(i, h, r) : h.operator === "<" || h.operator === "<=" ? s = Uy(s, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && s) {
    if (a = rh(i.semver, s.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !is(h, String(i), r) || s && !is(h, String(s), r))
      return null;
    for (const v of t)
      if (!is(h, String(v), r))
        return !1;
    return !0;
  }
  let o, c, f, l, u = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, p = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && s.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (o = jy(i, h, r), o === h && o !== i)
          return !1;
      } else if (i.operator === ">=" && !is(i.semver, String(h), r))
        return !1;
    }
    if (s) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Uy(s, h, r), c === h && c !== s)
          return !1;
      } else if (s.operator === "<=" && !is(s.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (s || i) && a !== 0)
      return !1;
  }
  return !(i && f && !s && a !== 0 || s && l && !i && a !== 0 || p || u);
}, jy = (e, t, r) => {
  if (!e)
    return t;
  const n = rh(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Uy = (e, t, r) => {
  if (!e)
    return t;
  const n = rh(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var CV = OV;
const kl = oa, My = bc, DV = Et, xy = Gv, kV = Gi, LV = Vx, FV = Gx, jV = zx, UV = Wx, MV = Jx, xV = e3, VV = n3, qV = a3, BV = nr, GV = u3, HV = h3, zV = Xd, KV = g3, WV = _3, YV = Pc, XV = Jd, JV = Hv, QV = zv, ZV = Qd, eq = Zd, tq = Kv, rq = B3, nq = Tc(), iq = ir(), sq = Rc, aq = X3, oq = eV, cq = iV, lq = oV, uq = uV, fq = eh, dq = _V, hq = bV, pq = PV, mq = NV, yq = CV;
var gq = {
  parse: kV,
  valid: LV,
  clean: FV,
  inc: jV,
  diff: UV,
  major: MV,
  minor: xV,
  patch: VV,
  prerelease: qV,
  compare: BV,
  rcompare: GV,
  compareLoose: HV,
  compareBuild: zV,
  sort: KV,
  rsort: WV,
  gt: YV,
  lt: XV,
  eq: JV,
  neq: QV,
  gte: ZV,
  lte: eq,
  cmp: tq,
  coerce: rq,
  Comparator: nq,
  Range: iq,
  satisfies: sq,
  toComparators: aq,
  maxSatisfying: oq,
  minSatisfying: cq,
  minVersion: lq,
  validRange: uq,
  outside: fq,
  gtr: dq,
  ltr: hq,
  intersects: pq,
  simplifyRange: mq,
  subset: yq,
  SemVer: DV,
  re: kl.re,
  src: kl.src,
  tokens: kl.t,
  SEMVER_SPEC_VERSION: My.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: My.RELEASE_TYPES,
  compareIdentifiers: xy.compareIdentifiers,
  rcompareIdentifiers: xy.rcompareIdentifiers
};
const ii = /* @__PURE__ */ Zy(gq), $q = Object.prototype.toString, vq = "[object Uint8Array]", _q = "[object ArrayBuffer]";
function Yv(e, t, r) {
  return e ? e.constructor === t ? !0 : $q.call(e) === r : !1;
}
function Xv(e) {
  return Yv(e, Uint8Array, vq);
}
function Eq(e) {
  return Yv(e, ArrayBuffer, _q);
}
function wq(e) {
  return Xv(e) || Eq(e);
}
function bq(e) {
  if (!Xv(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function Sq(e) {
  if (!wq(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Ll(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, s) => i + s.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    bq(i), r.set(i, n), n += i.length;
  return r;
}
const Qa = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Za(e, t = "utf8") {
  return Sq(e), Qa[t] ?? (Qa[t] = new globalThis.TextDecoder(t)), Qa[t].decode(e);
}
function Pq(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const Tq = new globalThis.TextEncoder();
function eo(e) {
  return Pq(e), Tq.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const Fl = "aes-256-cbc", zr = () => /* @__PURE__ */ Object.create(null), Vy = (e) => e !== void 0, jl = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Wr = "__internal__", Ul = `${Wr}.migrations.version`;
var Qr, Wt, bt, jt, Ln, Fn, bi, cr, ze, Jv, Qv, Zv, e_, t_, r_, n_, i_;
class Rq {
  constructor(t = {}) {
    sr(this, ze);
    Yn(this, "path");
    Yn(this, "events");
    sr(this, Qr);
    sr(this, Wt);
    sr(this, bt);
    sr(this, jt, {});
    sr(this, Ln, !1);
    sr(this, Fn);
    sr(this, bi);
    sr(this, cr);
    Yn(this, "_deserialize", (t) => JSON.parse(t));
    Yn(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = Er(this, ze, Jv).call(this, t);
    It(this, bt, r), Er(this, ze, Qv).call(this, r), Er(this, ze, e_).call(this, r), Er(this, ze, t_).call(this, r), this.events = new EventTarget(), It(this, Wt, r.encryptionKey), this.path = Er(this, ze, r_).call(this, r), Er(this, ze, n_).call(this, r), r.watch && this._watch();
  }
  get(t, r) {
    if (ue(this, bt).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${Wr} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (s, a) => {
      if (jl(s, a), ue(this, bt).accessPropertiesByDotNotation)
        Ca(n, s, a);
      else {
        if (s === "__proto__" || s === "constructor" || s === "prototype")
          return;
        n[s] = a;
      }
    };
    if (typeof t == "object") {
      const s = t;
      for (const [a, o] of Object.entries(s))
        i(a, o);
    } else
      i(t, r);
    this.store = n;
  }
  has(t) {
    return ue(this, bt).accessPropertiesByDotNotation ? gl(this.store, t) : t in this.store;
  }
  appendToArray(t, r) {
    jl(t, r);
    const n = ue(this, bt).accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
    if (!Array.isArray(n))
      throw new TypeError(`The key \`${t}\` is already set to a non-array value`);
    this.set(t, [...n, r]);
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      Vy(ue(this, jt)[r]) && this.set(r, ue(this, jt)[r]);
  }
  delete(t) {
    const { store: r } = this;
    ue(this, bt).accessPropertiesByDotNotation ? MA(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = zr();
    for (const r of Object.keys(ue(this, jt)))
      Vy(ue(this, jt)[r]) && (jl(r, ue(this, jt)[r]), ue(this, bt).accessPropertiesByDotNotation ? Ca(t, r, ue(this, jt)[r]) : t[r] = ue(this, jt)[r]);
    this.store = t;
  }
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleValueChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleStoreChange(t);
  }
  get size() {
    return Object.keys(this.store).filter((r) => !this._isReservedKeyPath(r)).length;
  }
  /**
      Get all the config as an object or replace the current config with an object.
  
      @example
      ```
      console.log(config.store);
      //=> {name: 'John', age: 30}
      ```
  
      @example
      ```
      config.store = {
          hello: 'world'
      };
      ```
      */
  get store() {
    var t;
    try {
      const r = ae.readFileSync(this.path, ue(this, Wt) ? null : "utf8"), n = this._decryptData(r), i = this._deserialize(n);
      return ue(this, Ln) || this._validate(i), Object.assign(zr(), i);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), zr();
      if (ue(this, bt).clearInvalidConfig) {
        const n = r;
        if (n.name === "SyntaxError" || (t = n.message) != null && t.startsWith("Config schema violation:"))
          return zr();
      }
      throw r;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !gl(t, Wr))
      try {
        const r = ae.readFileSync(this.path, ue(this, Wt) ? null : "utf8"), n = this._decryptData(r), i = this._deserialize(n);
        gl(i, Wr) && Ca(t, Wr, vm(i, Wr));
      } catch {
      }
    ue(this, Ln) || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, r]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    ue(this, Fn) && (ue(this, Fn).close(), It(this, Fn, void 0)), ue(this, bi) && (ae.unwatchFile(this.path), It(this, bi, !1)), It(this, cr, void 0);
  }
  _decryptData(t) {
    if (!ue(this, Wt))
      return typeof t == "string" ? t : Za(t);
    try {
      const r = t.slice(0, 16), n = _n.pbkdf2Sync(ue(this, Wt), r, 1e4, 32, "sha512"), i = _n.createDecipheriv(Fl, n, r), s = t.slice(17), a = typeof s == "string" ? eo(s) : s;
      return Za(Ll([i.update(a), i.final()]));
    } catch {
      try {
        const r = t.slice(0, 16), n = _n.pbkdf2Sync(ue(this, Wt), r.toString(), 1e4, 32, "sha512"), i = _n.createDecipheriv(Fl, n, r), s = t.slice(17), a = typeof s == "string" ? eo(s) : s;
        return Za(Ll([i.update(a), i.final()]));
      } catch {
      }
    }
    return typeof t == "string" ? t : Za(t);
  }
  _handleStoreChange(t) {
    let r = this.store;
    const n = () => {
      const i = r, s = this.store;
      wh(s, i) || (r = s, t.call(this, s, i));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _handleValueChange(t, r) {
    let n = t();
    const i = () => {
      const s = n, a = t();
      wh(a, s) || (n = a, r.call(this, a, s));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!ue(this, Qr) || ue(this, Qr).call(this, t) || !ue(this, Qr).errors)
      return;
    const n = ue(this, Qr).errors.map(({ instancePath: i, message: s = "" }) => `\`${i.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ae.mkdirSync(ce.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (ue(this, Wt)) {
      const n = _n.randomBytes(16), i = _n.pbkdf2Sync(ue(this, Wt), n, 1e4, 32, "sha512"), s = _n.createCipheriv(Fl, i, n);
      r = Ll([n, eo(":"), s.update(eo(r)), s.final()]);
    }
    if (Ne.env.SNAP)
      ae.writeFileSync(this.path, r, { mode: ue(this, bt).configFileMode });
    else
      try {
        p$(this.path, r, { mode: ue(this, bt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          ae.writeFileSync(this.path, r, { mode: ue(this, bt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    if (this._ensureDirectory(), ae.existsSync(this.path) || this._write(zr()), Ne.platform === "win32" || Ne.platform === "darwin") {
      ue(this, cr) ?? It(this, cr, Ey(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 }));
      const t = ce.dirname(this.path), r = ce.basename(this.path);
      It(this, Fn, ae.watch(t, { persistent: !1, encoding: "utf8" }, (n, i) => {
        i && i !== r || typeof ue(this, cr) == "function" && ue(this, cr).call(this);
      }));
    } else
      ue(this, cr) ?? It(this, cr, Ey(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 })), ae.watchFile(this.path, { persistent: !1 }, (t, r) => {
        typeof ue(this, cr) == "function" && ue(this, cr).call(this);
      }), It(this, bi, !0);
  }
  _migrate(t, r, n) {
    let i = this._get(Ul, "0.0.0");
    const s = Object.keys(t).filter((o) => this._shouldPerformMigration(o, i, r));
    let a = structuredClone(this.store);
    for (const o of s)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: o,
          finalVersion: r,
          versions: s
        });
        const c = t[o];
        c == null || c(this), this._set(Ul, o), i = o, a = structuredClone(this.store);
      } catch (c) {
        this.store = a;
        try {
          this._write(a);
        } catch {
        }
        const f = c instanceof Error ? c.message : String(c);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
      }
    (this._isVersionInRangeFormat(i) || !ii.eq(i, r)) && this._set(Ul, r);
  }
  _containsReservedKey(t) {
    return typeof t == "string" ? this._isReservedKeyPath(t) : !t || typeof t != "object" ? !1 : this._objectContainsReservedKey(t);
  }
  _objectContainsReservedKey(t) {
    if (!t || typeof t != "object")
      return !1;
    for (const [r, n] of Object.entries(t))
      if (this._isReservedKeyPath(r) || this._objectContainsReservedKey(n))
        return !0;
    return !1;
  }
  _isReservedKeyPath(t) {
    return t === Wr || t.startsWith(`${Wr}.`);
  }
  _isVersionInRangeFormat(t) {
    return ii.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && ii.satisfies(r, t) ? !1 : ii.satisfies(n, t) : !(ii.lte(t, r) || ii.gt(t, n));
  }
  _get(t, r) {
    return vm(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Ca(n, t, r), this.store = n;
  }
}
Qr = new WeakMap(), Wt = new WeakMap(), bt = new WeakMap(), jt = new WeakMap(), Ln = new WeakMap(), Fn = new WeakMap(), bi = new WeakMap(), cr = new WeakMap(), ze = new WeakSet(), Jv = function(t) {
  const r = {
    configName: "config",
    fileExtension: "json",
    projectSuffix: "nodejs",
    clearInvalidConfig: !1,
    accessPropertiesByDotNotation: !0,
    configFileMode: 438,
    ...t
  };
  if (!r.cwd) {
    if (!r.projectName)
      throw new Error("Please specify the `projectName` option.");
    r.cwd = BA(r.projectName, { suffix: r.projectSuffix }).config;
  }
  return typeof r.fileExtension == "string" && (r.fileExtension = r.fileExtension.replace(/^\.+/, "")), r;
}, Qv = function(t) {
  if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
    return;
  if (t.schema && typeof t.schema != "object")
    throw new TypeError("The `schema` option must be an object.");
  const r = gx.default, n = new Gj.Ajv2020({
    allErrors: !0,
    useDefaults: !0,
    ...t.ajvOptions
  });
  r(n);
  const i = {
    ...t.rootSchema,
    type: "object",
    properties: t.schema
  };
  It(this, Qr, n.compile(i)), Er(this, ze, Zv).call(this, t.schema);
}, Zv = function(t) {
  const r = Object.entries(t ?? {});
  for (const [n, i] of r) {
    if (!i || typeof i != "object" || !Object.hasOwn(i, "default"))
      continue;
    const { default: s } = i;
    s !== void 0 && (ue(this, jt)[n] = s);
  }
}, e_ = function(t) {
  t.defaults && Object.assign(ue(this, jt), t.defaults);
}, t_ = function(t) {
  t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
}, r_ = function(t) {
  const r = typeof t.fileExtension == "string" ? t.fileExtension : void 0, n = r ? `.${r}` : "";
  return ce.resolve(t.cwd, `${t.configName ?? "config"}${n}`);
}, n_ = function(t) {
  if (t.migrations) {
    Er(this, ze, i_).call(this, t), this._validate(this.store);
    return;
  }
  const r = this.store, n = Object.assign(zr(), t.defaults ?? {}, r);
  this._validate(n);
  try {
    bh.deepEqual(r, n);
  } catch {
    this.store = n;
  }
}, i_ = function(t) {
  const { migrations: r, projectVersion: n } = t;
  if (r) {
    if (!n)
      throw new Error("Please specify the `projectVersion` option.");
    It(this, Ln, !0);
    try {
      const i = this.store, s = Object.assign(zr(), t.defaults ?? {}, i);
      try {
        bh.deepEqual(i, s);
      } catch {
        this._write(s);
      }
      this._migrate(r, n, t.beforeEachMigration);
    } finally {
      It(this, Ln, !1);
    }
  }
};
const { app: mo, ipcMain: vu, shell: Nq } = Or;
let qy = !1;
const By = () => {
  if (!vu || !mo)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: mo.getPath("userData"),
    appVersion: mo.getVersion()
  };
  return qy || (vu.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), qy = !0), e;
};
let Oq = class extends Rq {
  constructor(t) {
    let r, n;
    if (Ne.type === "renderer") {
      const i = Or.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else vu && mo && ({ defaultCwd: r, appVersion: n } = By());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = ce.isAbsolute(t.cwd) ? t.cwd : ce.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    By();
  }
  async openInEditor() {
    const t = await Nq.openPath(this.path);
    if (t)
      throw new Error(t);
  }
};
class Aq {
  constructor(t) {
    Yn(this, "store");
    this.store = new Oq(t);
  }
  get(t) {
    return this.store.get(t);
  }
  getAll() {
    return this.store.store;
  }
  set(t, r) {
    this.store.set(t, r);
  }
  has(t) {
    return this.store.has(t);
  }
  delete(t) {
    this.store.delete(t);
  }
  clear() {
    this.store.clear();
  }
}
const Iq = {
  checkRobots: {
    type: "boolean",
    default: !0
  },
  downloadPath: {
    type: "string",
    default: ""
  }
}, Nc = new Aq({
  name: "app-config",
  schema: Iq
}), s_ = ce.dirname(pE(import.meta.url));
process.env.APP_ROOT = ce.join(s_, "..");
const _u = process.env.VITE_DEV_SERVER_URL, u9 = ce.join(process.env.APP_ROOT, "dist-electron"), a_ = ce.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = _u ? ce.join(process.env.APP_ROOT, "public") : a_;
let Ie;
const Gy = "https://example.com";
let wi = "";
function Vs() {
  let e = Nc.get("downloadPath");
  if (e == null || e.trim() == "") {
    const t = bs.getPath("downloads");
    return console.log(t), t;
  }
  return nh(e), e;
}
function Hy(e) {
  let t = "";
  wi != "" && (t = new URL(wi).hostname);
  let r = "";
  e != "" && (r = new URL(e).hostname);
  const n = ce.join(Vs(), "webdownloader", t, r);
  return nh(n), n;
}
function nh(e) {
  ae.mkdirSync(e, { recursive: !0 });
}
function Cq(e) {
  var t;
  return e.mimeType || ((t = e.headers) == null ? void 0 : t["content-type"]) || "application/octet-stream";
}
let Uo, qs;
function o_() {
  Ie = new Ky({
    icon: ce.join(process.env.VITE_PUBLIC, "icon.png"),
    title: "QCSiteDownloader",
    width: 1420,
    height: 680,
    webPreferences: {
      preload: ce.join(s_, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), qs = Ie;
  const e = new uE();
  Ie.contentView.addChildView(e), e.webContents.loadURL(Gy), e.setBounds({ x: 0, y: 0, width: 1e3, height: 800 }), e.webContents.setWindowOpenHandler(({ url: i }) => (e.webContents.loadURL(i), { action: "deny" })), e.webContents.on("will-navigate", (i, s) => {
    i.preventDefault(), e.webContents.loadURL(s);
  }), Ie.contentView.addChildView(e), Uo = e, nh(Vs());
  const r = e.webContents.debugger;
  r.attach("1.3"), r.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024
  }), r.sendCommand("Page.enable");
  const n = /* @__PURE__ */ new Map();
  r.on("message", async (i, s, a) => {
    if (s === "Network.requestWillBeSent") {
      n.set(a.requestId, a.request.url);
      return;
    }
    if (s == "Network.loadingFailed") {
      const l = n.get(a.requestId);
      n.delete(a.requestId), Ie == null || Ie.webContents.send("item-add", {
        url: l,
        filepath: "",
        isSuccess: !1
      });
      return;
    }
    if (wi == "" || wi == Gy || wi == "localhost" || s !== "Network.responseReceived") return;
    const { requestId: o, response: c } = a, f = c.url;
    if (f.startsWith("http")) {
      if (c.status >= 400) {
        Ie == null || Ie.webContents.send("item-add", {
          url: f,
          filepath: "",
          isSuccess: !1
        });
        return;
      }
      try {
        const l = await r.sendCommand(
          "Network.getResponseBody",
          { requestId: o }
        ), u = l.base64Encoded ? Buffer.from(l.body, "base64") : Buffer.from(l.body), p = Cq(c), h = Hy(f), v = new URL(f);
        let m = ce.join(h, v.pathname);
        if (m.endsWith("/") && (m += "index"), !ce.extname(m)) {
          const _ = p.includes("html") ? ".html" : p.includes("javascript") ? ".js" : p.includes("css") ? ".css" : p.includes("json") ? ".json" : p.includes("text") ? ".text" : p.includes("webp") ? ".webp" : "";
          m += _;
        }
        ae.mkdirSync(ce.dirname(m), { recursive: !0 }), ae.writeFileSync(m, u), Ie == null || Ie.webContents.send("item-add", {
          url: f,
          filepath: m,
          isSuccess: !0
        });
      } catch {
      }
    }
  }), e.webContents.on("did-finish-load", async () => {
    if (Ie == null || Ie == null) {
      console.error("Window is not defined, cannot save HTML.");
      return;
    }
    try {
      const i = await e.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      );
      if (Ie == null || Ie == null) {
        console.error("Window is not defined, cannot save HTML.");
        return;
      }
      const s = Hy(Ie.webContents.getURL()), a = ce.join(s, "index.html");
      ae.writeFileSync(a, i, "utf-8"), Ie.webContents.send("item-add", {
        url: e.webContents.getURL(),
        filepath: a,
        isSuccess: !0
      }), setTimeout(() => {
        console.log("Capture complete, exiting.");
      }, 15e3);
    } catch (i) {
      console.error("HTML capture failed:", i);
    }
  }), Ie.on("resize", () => {
    wu();
  }), e.webContents.on("did-finish-load", () => {
    wu();
  }), _u ? Ie.loadURL(_u) : Ie.loadFile(ce.join(a_, "index.html"));
}
Dr.handle("update-subview-url", (e, t) => {
  Uo && t && (wi = t, console.log("Updating subView URL to:", t), Uo.webContents.loadURL(t));
});
Dr.handle("select-download-path", async () => {
  const e = await zy.showOpenDialog({
    title: "选择下载文件夹",
    defaultPath: Vs(),
    properties: ["openDirectory", "createDirectory"]
  });
  return Nc.set("downloadPath", e.canceled ? Vs() : e.filePaths[0]), e;
});
Dr.handle("get-download-dir", () => Vs());
Dr.handle("copy-text", (e, t) => {
  cE.writeText(t);
});
Dr.handle("set-robots-checked", (e, t) => {
  Nc.set("checkRobots", t);
});
Dr.handle("get-robots-checked", () => Nc.get("checkRobots"));
let Eu = 480;
function wu() {
  const { width: e, height: t } = qs.getContentBounds();
  Uo.setBounds({
    x: 0,
    y: 0,
    width: e - Eu - 6,
    height: t
  });
}
Dr.on("shell-width-changed", (e, t) => {
  Eu = t, console.log("Shell width changed:", Eu), wu();
});
Dr.handle("resize-window", (e, t) => {
  const r = qs.getBounds().height;
  qs.setSize(Math.ceil(t), r);
});
Dr.handle("open-existing-folder", async (e, t) => {
  try {
    return await lE.openPath(t) === "";
  } catch (r) {
    return console.error(r), !1;
  }
});
bs.on("window-all-closed", () => {
  process.platform !== "darwin" && (bs.quit(), Ie = null);
});
bs.on("activate", () => {
  Ky.getAllWindows().length === 0 && o_();
});
bs.whenReady().then(() => {
  o_(), hr.autoUpdater.setFeedURL({
    provider: "github",
    owner: "dayuqichengbao",
    repo: "slwebpagedownloader"
  }), hr.autoUpdater.checkForUpdatesAndNotify();
});
hr.autoUpdater.on("checking-for-update", () => {
  console.log("Checking..."), Hi("checking");
});
hr.autoUpdater.on("update-available", () => {
  console.log("Update available."), Hi("available");
});
hr.autoUpdater.on("update-not-available", () => {
  console.log("Update not available."), Hi("not-available");
});
hr.autoUpdater.on("download-progress", (e) => {
  console.log(`Download progress: ${Math.round(e.percent)}%`), Hi("progress", Math.round(e.percent));
});
hr.autoUpdater.on("update-downloaded", () => {
  console.log("Update downloaded."), Hi("downloaded"), zy.showMessageBox({
    type: "info",
    title: "更新完成",
    message: "新版本已下载，是否立即重启安装？",
    buttons: ["重启", "稍后"]
  }).then((e) => {
    e.response === 0 && hr.autoUpdater.quitAndInstall();
  });
});
hr.autoUpdater.on("error", (e) => {
  console.error("Update error:", e), Hi("error", e.message);
});
function Hi(e, t) {
  qs.webContents.send("update-status", { type: e, data: t });
}
export {
  u9 as MAIN_DIST,
  a_ as RENDERER_DIST,
  _u as VITE_DEV_SERVER_URL
};
