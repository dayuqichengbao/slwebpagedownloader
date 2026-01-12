var IE = Object.defineProperty;
var Ch = (e) => {
  throw TypeError(e);
};
var CE = (e, t, r) => t in e ? IE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ei = (e, t, r) => CE(e, typeof t != "symbol" ? t + "" : t, r), Gc = (e, t, r) => t.has(e) || Ch("Cannot " + r);
var ae = (e, t, r) => (Gc(e, t, "read from private field"), r ? r.call(e) : t.get(e)), or = (e, t, r) => t.has(e) ? Ch("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), At = (e, t, r, n) => (Gc(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), Tr = (e, t, r) => (Gc(e, t, "access private method"), r);
import Dr, { ipcMain as jr, dialog as rg, clipboard as DE, shell as kE, app as Is, BrowserWindow as ng, WebContentsView as LE } from "electron";
import yn from "fs";
import FE from "constants";
import Js from "stream";
import Du from "util";
import ig from "assert";
import Ie from "path";
import Yo from "child_process";
import sg from "events";
import Qs from "crypto";
import ag from "tty";
import Zs from "os";
import gn from "url";
import jE from "string_decoder";
import og from "zlib";
import UE from "http";
import { fileURLToPath as ME } from "node:url";
import se from "node:path";
import re from "node:fs";
import Re from "node:process";
import { promisify as Ze, isDeepStrictEqual as Dh } from "node:util";
import Pn from "node:crypto";
import kh from "node:assert";
import cg from "node:os";
import "node:events";
import "node:stream";
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gr = {}, Yn = {}, mt = {};
mt.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, s) => i != null ? n(i) : r(s)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
mt.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var qr = FE, xE = process.cwd, uo = null, VE = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return uo || (uo = xE.call(process)), uo;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Lh = process.chdir;
  process.chdir = function(e) {
    uo = null, Lh.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Lh);
}
var qE = BE;
function BE(e) {
  qr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = o(e.stat), e.fstat = o(e.fstat), e.lstat = o(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, p, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), VE === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(p, h, _) {
      var m = Date.now(), v = 0;
      l(p, h, function y(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(h, function(R, C) {
              R && R.code === "ENOENT" ? l(p, h, y) : _(w);
            });
          }, v), v < 100 && (v += 10);
          return;
        }
        _ && _(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(p, h, _, m, v, y) {
      var w;
      if (y && typeof y == "function") {
        var R = 0;
        w = function(C, M, H) {
          if (C && C.code === "EAGAIN" && R < 10)
            return R++, l.call(e, p, h, _, m, v, w);
          y.apply(this, arguments);
        };
      }
      return l.call(e, p, h, _, m, v, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, p, h, _, m) {
      for (var v = 0; ; )
        try {
          return l.call(e, f, p, h, _, m);
        } catch (y) {
          if (y.code === "EAGAIN" && v < 10) {
            v++;
            continue;
          }
          throw y;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, p, h) {
      l.open(
        f,
        qr.O_WRONLY | qr.O_SYMLINK,
        p,
        function(_, m) {
          if (_) {
            h && h(_);
            return;
          }
          l.fchmod(m, p, function(v) {
            l.close(m, function(y) {
              h && h(v || y);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, p) {
      var h = l.openSync(f, qr.O_WRONLY | qr.O_SYMLINK, p), _ = !0, m;
      try {
        m = l.fchmodSync(h, p), _ = !1;
      } finally {
        if (_)
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
    qr.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, p, h, _) {
      l.open(f, qr.O_SYMLINK, function(m, v) {
        if (m) {
          _ && _(m);
          return;
        }
        l.futimes(v, p, h, function(y) {
          l.close(v, function(w) {
            _ && _(y || w);
          });
        });
      });
    }, l.lutimesSync = function(f, p, h) {
      var _ = l.openSync(f, qr.O_SYMLINK), m, v = !0;
      try {
        m = l.futimesSync(_, p, h), v = !1;
      } finally {
        if (v)
          try {
            l.closeSync(_);
          } catch {
          }
        else
          l.closeSync(_);
      }
      return m;
    }) : l.futimes && (l.lutimes = function(f, p, h, _) {
      _ && process.nextTick(_);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(f, p, h) {
      return l.call(e, f, p, function(_) {
        u(_) && (_ = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(f, p) {
      try {
        return l.call(e, f, p);
      } catch (h) {
        if (!u(h)) throw h;
      }
    };
  }
  function s(l) {
    return l && function(f, p, h, _) {
      return l.call(e, f, p, h, function(m) {
        u(m) && (m = null), _ && _.apply(this, arguments);
      });
    };
  }
  function a(l) {
    return l && function(f, p, h) {
      try {
        return l.call(e, f, p, h);
      } catch (_) {
        if (!u(_)) throw _;
      }
    };
  }
  function o(l) {
    return l && function(f, p, h) {
      typeof p == "function" && (h = p, p = null);
      function _(m, v) {
        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return p ? l.call(e, f, p, _) : l.call(e, f, _);
    };
  }
  function c(l) {
    return l && function(f, p) {
      var h = p ? l.call(e, f, p) : l.call(e, f);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function u(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Fh = Js.Stream, GE = HE;
function HE(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Fh.call(this);
    var s = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), o = 0, c = a.length; o < c; o++) {
      var u = a[o];
      this[u] = i[u];
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
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        s.emit("error", l), s.readable = !1;
        return;
      }
      s.fd = f, s.emit("open", f), s._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Fh.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
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
var zE = WE, KE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function WE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: KE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Ae = yn, YE = qE, XE = GE, JE = zE, Pa = Du, Ye, Po;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ye = Symbol.for("graceful-fs.queue"), Po = Symbol.for("graceful-fs.previous")) : (Ye = "___graceful-fs.queue", Po = "___graceful-fs.previous");
function QE() {
}
function ug(e, t) {
  Object.defineProperty(e, Ye, {
    get: function() {
      return t;
    }
  });
}
var qn = QE;
Pa.debuglog ? qn = Pa.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (qn = function() {
  var e = Pa.format.apply(Pa, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ae[Ye]) {
  var ZE = dt[Ye] || [];
  ug(Ae, ZE), Ae.close = function(e) {
    function t(r, n) {
      return e.call(Ae, r, function(i) {
        i || jh(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Po, {
      value: e
    }), t;
  }(Ae.close), Ae.closeSync = function(e) {
    function t(r) {
      e.apply(Ae, arguments), jh();
    }
    return Object.defineProperty(t, Po, {
      value: e
    }), t;
  }(Ae.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    qn(Ae[Ye]), ig.equal(Ae[Ye].length, 0);
  });
}
dt[Ye] || ug(dt, Ae[Ye]);
var yt = ku(JE(Ae));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ae.__patched && (yt = ku(Ae), Ae.__patched = !0);
function ku(e) {
  YE(e), e.gracefulify = ku, e.createReadStream = M, e.createWriteStream = H;
  var t = e.readFile;
  e.readFile = r;
  function r(I, Q, B) {
    return typeof Q == "function" && (B = Q, Q = null), G(I, Q, B);
    function G(J, k, D, x) {
      return t(J, k, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? ti([G, [J, k, D], F, x || Date.now(), Date.now()]) : typeof D == "function" && D.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(I, Q, B, G) {
    return typeof B == "function" && (G = B, B = null), J(I, Q, B, G);
    function J(k, D, x, F, V) {
      return n(k, D, x, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? ti([J, [k, D, x, F], U, V || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = a);
  function a(I, Q, B, G) {
    return typeof B == "function" && (G = B, B = null), J(I, Q, B, G);
    function J(k, D, x, F, V) {
      return s(k, D, x, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? ti([J, [k, D, x, F], U, V || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var o = e.copyFile;
  o && (e.copyFile = c);
  function c(I, Q, B, G) {
    return typeof B == "function" && (G = B, B = 0), J(I, Q, B, G);
    function J(k, D, x, F, V) {
      return o(k, D, x, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? ti([J, [k, D, x, F], U, V || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var u = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(I, Q, B) {
    typeof Q == "function" && (B = Q, Q = null);
    var G = l.test(process.version) ? function(D, x, F, V) {
      return u(D, J(
        D,
        x,
        F,
        V
      ));
    } : function(D, x, F, V) {
      return u(D, x, J(
        D,
        x,
        F,
        V
      ));
    };
    return G(I, Q, B);
    function J(k, D, x, F) {
      return function(V, U) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? ti([
          G,
          [k, D, x],
          V,
          F || Date.now(),
          Date.now()
        ]) : (U && U.sort && U.sort(), typeof x == "function" && x.call(this, V, U));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = XE(e);
    y = p.ReadStream, R = p.WriteStream;
  }
  var h = e.ReadStream;
  h && (y.prototype = Object.create(h.prototype), y.prototype.open = w);
  var _ = e.WriteStream;
  _ && (R.prototype = Object.create(_.prototype), R.prototype.open = C), Object.defineProperty(e, "ReadStream", {
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
      return R;
    },
    set: function(I) {
      R = I;
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
  var v = R;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return v;
    },
    set: function(I) {
      v = I;
    },
    enumerable: !0,
    configurable: !0
  });
  function y(I, Q) {
    return this instanceof y ? (h.apply(this, arguments), this) : y.apply(Object.create(y.prototype), arguments);
  }
  function w() {
    var I = this;
    he(I.path, I.flags, I.mode, function(Q, B) {
      Q ? (I.autoClose && I.destroy(), I.emit("error", Q)) : (I.fd = B, I.emit("open", B), I.read());
    });
  }
  function R(I, Q) {
    return this instanceof R ? (_.apply(this, arguments), this) : R.apply(Object.create(R.prototype), arguments);
  }
  function C() {
    var I = this;
    he(I.path, I.flags, I.mode, function(Q, B) {
      Q ? (I.destroy(), I.emit("error", Q)) : (I.fd = B, I.emit("open", B));
    });
  }
  function M(I, Q) {
    return new e.ReadStream(I, Q);
  }
  function H(I, Q) {
    return new e.WriteStream(I, Q);
  }
  var z = e.open;
  e.open = he;
  function he(I, Q, B, G) {
    return typeof B == "function" && (G = B, B = null), J(I, Q, B, G);
    function J(k, D, x, F, V) {
      return z(k, D, x, function(U, O) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? ti([J, [k, D, x, F], U, V || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  return e;
}
function ti(e) {
  qn("ENQUEUE", e[0].name, e[1]), Ae[Ye].push(e), Lu();
}
var Ta;
function jh() {
  for (var e = Date.now(), t = 0; t < Ae[Ye].length; ++t)
    Ae[Ye][t].length > 2 && (Ae[Ye][t][3] = e, Ae[Ye][t][4] = e);
  Lu();
}
function Lu() {
  if (clearTimeout(Ta), Ta = void 0, Ae[Ye].length !== 0) {
    var e = Ae[Ye].shift(), t = e[0], r = e[1], n = e[2], i = e[3], s = e[4];
    if (i === void 0)
      qn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      qn("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var o = Date.now() - s, c = Math.max(s - i, 1), u = Math.min(c * 1.2, 100);
      o >= u ? (qn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Ae[Ye].push(e);
    }
    Ta === void 0 && (Ta = setTimeout(Lu, 0));
  }
}
(function(e) {
  const t = mt.fromCallback, r = yt, n = [
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
  }, e.read = function(i, s, a, o, c, u) {
    return typeof u == "function" ? r.read(i, s, a, o, c, u) : new Promise((l, f) => {
      r.read(i, s, a, o, c, (p, h, _) => {
        if (p) return f(p);
        l({ bytesRead: h, buffer: _ });
      });
    });
  }, e.write = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, s, ...a) : new Promise((o, c) => {
      r.write(i, s, ...a, (u, l, f) => {
        if (u) return c(u);
        o({ bytesWritten: l, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, s, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, s, ...a) : new Promise((o, c) => {
      r.writev(i, s, ...a, (u, l, f) => {
        if (u) return c(u);
        o({ bytesWritten: l, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Yn);
var Fu = {}, fg = {};
const ew = Ie;
fg.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(ew.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const dg = Yn, { checkPath: hg } = fg, pg = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Fu.makeDir = async (e, t) => (hg(e), dg.mkdir(e, {
  mode: pg(t),
  recursive: !0
}));
Fu.makeDirSync = (e, t) => (hg(e), dg.mkdirSync(e, {
  mode: pg(t),
  recursive: !0
}));
const tw = mt.fromPromise, { makeDir: rw, makeDirSync: Hc } = Fu, zc = tw(rw);
var $r = {
  mkdirs: zc,
  mkdirsSync: Hc,
  // alias
  mkdirp: zc,
  mkdirpSync: Hc,
  ensureDir: zc,
  ensureDirSync: Hc
};
const nw = mt.fromPromise, mg = Yn;
function iw(e) {
  return mg.access(e).then(() => !0).catch(() => !1);
}
var Xn = {
  pathExists: nw(iw),
  pathExistsSync: mg.existsSync
};
const wi = yt;
function sw(e, t, r, n) {
  wi.open(e, "r+", (i, s) => {
    if (i) return n(i);
    wi.futimes(s, t, r, (a) => {
      wi.close(s, (o) => {
        n && n(a || o);
      });
    });
  });
}
function aw(e, t, r) {
  const n = wi.openSync(e, "r+");
  return wi.futimesSync(n, t, r), wi.closeSync(n);
}
var yg = {
  utimesMillis: sw,
  utimesMillisSync: aw
};
const Ai = Yn, qe = Ie, ow = Du;
function cw(e, t, r) {
  const n = r.dereference ? (i) => Ai.stat(i, { bigint: !0 }) : (i) => Ai.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function lw(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Ai.statSync(a, { bigint: !0 }) : (a) => Ai.lstatSync(a, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: s, destStat: null };
    throw a;
  }
  return { srcStat: s, destStat: n };
}
function uw(e, t, r, n, i) {
  ow.callbackify(cw)(e, t, n, (s, a) => {
    if (s) return i(s);
    const { srcStat: o, destStat: c } = a;
    if (c) {
      if (ea(o, c)) {
        const u = qe.basename(e), l = qe.basename(t);
        return r === "move" && u !== l && u.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: o, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (o.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!o.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return o.isDirectory() && ju(e, t) ? i(new Error(Xo(e, t, r))) : i(null, { srcStat: o, destStat: c });
  });
}
function fw(e, t, r, n) {
  const { srcStat: i, destStat: s } = lw(e, t, n);
  if (s) {
    if (ea(i, s)) {
      const a = qe.basename(e), o = qe.basename(t);
      if (r === "move" && a !== o && a.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && ju(e, t))
    throw new Error(Xo(e, t, r));
  return { srcStat: i, destStat: s };
}
function gg(e, t, r, n, i) {
  const s = qe.resolve(qe.dirname(e)), a = qe.resolve(qe.dirname(r));
  if (a === s || a === qe.parse(a).root) return i();
  Ai.stat(a, { bigint: !0 }, (o, c) => o ? o.code === "ENOENT" ? i() : i(o) : ea(t, c) ? i(new Error(Xo(e, r, n))) : gg(e, t, a, n, i));
}
function $g(e, t, r, n) {
  const i = qe.resolve(qe.dirname(e)), s = qe.resolve(qe.dirname(r));
  if (s === i || s === qe.parse(s).root) return;
  let a;
  try {
    a = Ai.statSync(s, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (ea(t, a))
    throw new Error(Xo(e, r, n));
  return $g(e, t, s, n);
}
function ea(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function ju(e, t) {
  const r = qe.resolve(e).split(qe.sep).filter((i) => i), n = qe.resolve(t).split(qe.sep).filter((i) => i);
  return r.reduce((i, s, a) => i && n[a] === s, !0);
}
function Xo(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Ui = {
  checkPaths: uw,
  checkPathsSync: fw,
  checkParentPaths: gg,
  checkParentPathsSync: $g,
  isSrcSubdir: ju,
  areIdentical: ea
};
const Pt = yt, Cs = Ie, dw = $r.mkdirs, hw = Xn.pathExists, pw = yg.utimesMillis, Ds = Ui;
function mw(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Ds.checkPaths(e, t, "copy", r, (i, s) => {
    if (i) return n(i);
    const { srcStat: a, destStat: o } = s;
    Ds.checkParentPaths(e, a, t, "copy", (c) => c ? n(c) : r.filter ? vg(Uh, o, e, t, r, n) : Uh(o, e, t, r, n));
  });
}
function Uh(e, t, r, n, i) {
  const s = Cs.dirname(r);
  hw(s, (a, o) => {
    if (a) return i(a);
    if (o) return To(e, t, r, n, i);
    dw(s, (c) => c ? i(c) : To(e, t, r, n, i));
  });
}
function vg(e, t, r, n, i, s) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, s) : s(), (a) => s(a));
}
function yw(e, t, r, n, i) {
  return n.filter ? vg(To, e, t, r, n, i) : To(e, t, r, n, i);
}
function To(e, t, r, n, i) {
  (n.dereference ? Pt.stat : Pt.lstat)(t, (a, o) => a ? i(a) : o.isDirectory() ? bw(o, e, t, r, n, i) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? gw(o, e, t, r, n, i) : o.isSymbolicLink() ? Tw(e, t, r, n, i) : o.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : o.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function gw(e, t, r, n, i, s) {
  return t ? $w(e, r, n, i, s) : _g(e, r, n, i, s);
}
function $w(e, t, r, n, i) {
  if (n.overwrite)
    Pt.unlink(r, (s) => s ? i(s) : _g(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function _g(e, t, r, n, i) {
  Pt.copyFile(t, r, (s) => s ? i(s) : n.preserveTimestamps ? vw(e.mode, t, r, i) : Jo(r, e.mode, i));
}
function vw(e, t, r, n) {
  return _w(e) ? Ew(r, e, (i) => i ? n(i) : Mh(e, t, r, n)) : Mh(e, t, r, n);
}
function _w(e) {
  return (e & 128) === 0;
}
function Ew(e, t, r) {
  return Jo(e, t | 128, r);
}
function Mh(e, t, r, n) {
  ww(t, r, (i) => i ? n(i) : Jo(r, e, n));
}
function Jo(e, t, r) {
  return Pt.chmod(e, t, r);
}
function ww(e, t, r) {
  Pt.stat(e, (n, i) => n ? r(n) : pw(t, i.atime, i.mtime, r));
}
function bw(e, t, r, n, i, s) {
  return t ? Eg(r, n, i, s) : Sw(e.mode, r, n, i, s);
}
function Sw(e, t, r, n, i) {
  Pt.mkdir(r, (s) => {
    if (s) return i(s);
    Eg(t, r, n, (a) => a ? i(a) : Jo(r, e, i));
  });
}
function Eg(e, t, r, n) {
  Pt.readdir(e, (i, s) => i ? n(i) : wg(s, e, t, r, n));
}
function wg(e, t, r, n, i) {
  const s = e.pop();
  return s ? Pw(e, s, t, r, n, i) : i();
}
function Pw(e, t, r, n, i, s) {
  const a = Cs.join(r, t), o = Cs.join(n, t);
  Ds.checkPaths(a, o, "copy", i, (c, u) => {
    if (c) return s(c);
    const { destStat: l } = u;
    yw(l, a, o, i, (f) => f ? s(f) : wg(e, r, n, i, s));
  });
}
function Tw(e, t, r, n, i) {
  Pt.readlink(t, (s, a) => {
    if (s) return i(s);
    if (n.dereference && (a = Cs.resolve(process.cwd(), a)), e)
      Pt.readlink(r, (o, c) => o ? o.code === "EINVAL" || o.code === "UNKNOWN" ? Pt.symlink(a, r, i) : i(o) : (n.dereference && (c = Cs.resolve(process.cwd(), c)), Ds.isSrcSubdir(a, c) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Ds.isSrcSubdir(c, a) ? i(new Error(`Cannot overwrite '${c}' with '${a}'.`)) : Rw(a, r, i)));
    else
      return Pt.symlink(a, r, i);
  });
}
function Rw(e, t, r) {
  Pt.unlink(t, (n) => n ? r(n) : Pt.symlink(e, t, r));
}
var Nw = mw;
const st = yt, ks = Ie, Ow = $r.mkdirsSync, Aw = yg.utimesMillisSync, Ls = Ui;
function Iw(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Ls.checkPathsSync(e, t, "copy", r);
  return Ls.checkParentPathsSync(e, n, t, "copy"), Cw(i, e, t, r);
}
function Cw(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = ks.dirname(r);
  return st.existsSync(i) || Ow(i), bg(e, t, r, n);
}
function Dw(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return bg(e, t, r, n);
}
function bg(e, t, r, n) {
  const s = (n.dereference ? st.statSync : st.lstatSync)(t);
  if (s.isDirectory()) return xw(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return kw(s, e, t, r, n);
  if (s.isSymbolicLink()) return Bw(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function kw(e, t, r, n, i) {
  return t ? Lw(e, r, n, i) : Sg(e, r, n, i);
}
function Lw(e, t, r, n) {
  if (n.overwrite)
    return st.unlinkSync(r), Sg(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Sg(e, t, r, n) {
  return st.copyFileSync(t, r), n.preserveTimestamps && Fw(e.mode, t, r), Uu(r, e.mode);
}
function Fw(e, t, r) {
  return jw(e) && Uw(r, e), Mw(t, r);
}
function jw(e) {
  return (e & 128) === 0;
}
function Uw(e, t) {
  return Uu(e, t | 128);
}
function Uu(e, t) {
  return st.chmodSync(e, t);
}
function Mw(e, t) {
  const r = st.statSync(e);
  return Aw(t, r.atime, r.mtime);
}
function xw(e, t, r, n, i) {
  return t ? Pg(r, n, i) : Vw(e.mode, r, n, i);
}
function Vw(e, t, r, n) {
  return st.mkdirSync(r), Pg(t, r, n), Uu(r, e);
}
function Pg(e, t, r) {
  st.readdirSync(e).forEach((n) => qw(n, e, t, r));
}
function qw(e, t, r, n) {
  const i = ks.join(t, e), s = ks.join(r, e), { destStat: a } = Ls.checkPathsSync(i, s, "copy", n);
  return Dw(a, i, s, n);
}
function Bw(e, t, r, n) {
  let i = st.readlinkSync(t);
  if (n.dereference && (i = ks.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = st.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return st.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (s = ks.resolve(process.cwd(), s)), Ls.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (st.statSync(r).isDirectory() && Ls.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return Gw(i, r);
  } else
    return st.symlinkSync(i, r);
}
function Gw(e, t) {
  return st.unlinkSync(t), st.symlinkSync(e, t);
}
var Hw = Iw;
const zw = mt.fromCallback;
var Mu = {
  copy: zw(Nw),
  copySync: Hw
};
const xh = yt, Tg = Ie, Ee = ig, Fs = process.platform === "win32";
function Rg(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || xh[r], r = r + "Sync", e[r] = e[r] || xh[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function xu(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Ee(e, "rimraf: missing path"), Ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), Ee.strictEqual(typeof r, "function", "rimraf: callback function required"), Ee(t, "rimraf: invalid options argument provided"), Ee.strictEqual(typeof t, "object", "rimraf: options should be object"), Rg(t), Vh(e, t, function i(s) {
    if (s) {
      if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Vh(e, t, i), a);
      }
      s.code === "ENOENT" && (s = null);
    }
    r(s);
  });
}
function Vh(e, t, r) {
  Ee(e), Ee(t), Ee(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Fs)
      return qh(e, t, n, r);
    if (i && i.isDirectory())
      return fo(e, t, n, r);
    t.unlink(e, (s) => {
      if (s) {
        if (s.code === "ENOENT")
          return r(null);
        if (s.code === "EPERM")
          return Fs ? qh(e, t, s, r) : fo(e, t, s, r);
        if (s.code === "EISDIR")
          return fo(e, t, s, r);
      }
      return r(s);
    });
  });
}
function qh(e, t, r, n) {
  Ee(e), Ee(t), Ee(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (s, a) => {
      s ? n(s.code === "ENOENT" ? null : r) : a.isDirectory() ? fo(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Bh(e, t, r) {
  let n;
  Ee(e), Ee(t);
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
  n.isDirectory() ? ho(e, t, r) : t.unlinkSync(e);
}
function fo(e, t, r, n) {
  Ee(e), Ee(t), Ee(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Kw(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function Kw(e, t, r) {
  Ee(e), Ee(t), Ee(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let s = i.length, a;
    if (s === 0) return t.rmdir(e, r);
    i.forEach((o) => {
      xu(Tg.join(e, o), t, (c) => {
        if (!a) {
          if (c) return r(a = c);
          --s === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Ng(e, t) {
  let r;
  t = t || {}, Rg(t), Ee(e, "rimraf: missing path"), Ee.strictEqual(typeof e, "string", "rimraf: path should be a string"), Ee(t, "rimraf: missing options"), Ee.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Fs && Bh(e, t, n);
  }
  try {
    r && r.isDirectory() ? ho(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Fs ? Bh(e, t, n) : ho(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    ho(e, t, n);
  }
}
function ho(e, t, r) {
  Ee(e), Ee(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      Ww(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function Ww(e, t) {
  if (Ee(e), Ee(t), t.readdirSync(e).forEach((r) => Ng(Tg.join(e, r), t)), Fs) {
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
var Yw = xu;
xu.sync = Ng;
const Ro = yt, Xw = mt.fromCallback, Og = Yw;
function Jw(e, t) {
  if (Ro.rm) return Ro.rm(e, { recursive: !0, force: !0 }, t);
  Og(e, t);
}
function Qw(e) {
  if (Ro.rmSync) return Ro.rmSync(e, { recursive: !0, force: !0 });
  Og.sync(e);
}
var Qo = {
  remove: Xw(Jw),
  removeSync: Qw
};
const Zw = mt.fromPromise, Ag = Yn, Ig = Ie, Cg = $r, Dg = Qo, Gh = Zw(async function(t) {
  let r;
  try {
    r = await Ag.readdir(t);
  } catch {
    return Cg.mkdirs(t);
  }
  return Promise.all(r.map((n) => Dg.remove(Ig.join(t, n))));
});
function Hh(e) {
  let t;
  try {
    t = Ag.readdirSync(e);
  } catch {
    return Cg.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Ig.join(e, r), Dg.removeSync(r);
  });
}
var eb = {
  emptyDirSync: Hh,
  emptydirSync: Hh,
  emptyDir: Gh,
  emptydir: Gh
};
const tb = mt.fromCallback, kg = Ie, nn = yt, Lg = $r;
function rb(e, t) {
  function r() {
    nn.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  nn.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const s = kg.dirname(e);
    nn.stat(s, (a, o) => {
      if (a)
        return a.code === "ENOENT" ? Lg.mkdirs(s, (c) => {
          if (c) return t(c);
          r();
        }) : t(a);
      o.isDirectory() ? r() : nn.readdir(s, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function nb(e) {
  let t;
  try {
    t = nn.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = kg.dirname(e);
  try {
    nn.statSync(r).isDirectory() || nn.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Lg.mkdirsSync(r);
    else throw n;
  }
  nn.writeFileSync(e, "");
}
var ib = {
  createFile: tb(rb),
  createFileSync: nb
};
const sb = mt.fromCallback, Fg = Ie, en = yt, jg = $r, ab = Xn.pathExists, { areIdentical: Ug } = Ui;
function ob(e, t, r) {
  function n(i, s) {
    en.link(i, s, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  en.lstat(t, (i, s) => {
    en.lstat(e, (a, o) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (s && Ug(o, s)) return r(null);
      const c = Fg.dirname(t);
      ab(c, (u, l) => {
        if (u) return r(u);
        if (l) return n(e, t);
        jg.mkdirs(c, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function cb(e, t) {
  let r;
  try {
    r = en.lstatSync(t);
  } catch {
  }
  try {
    const s = en.lstatSync(e);
    if (r && Ug(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = Fg.dirname(t);
  return en.existsSync(n) || jg.mkdirsSync(n), en.linkSync(e, t);
}
var lb = {
  createLink: sb(ob),
  createLinkSync: cb
};
const sn = Ie, gs = yt, ub = Xn.pathExists;
function fb(e, t, r) {
  if (sn.isAbsolute(e))
    return gs.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = sn.dirname(t), i = sn.join(n, e);
    return ub(i, (s, a) => s ? r(s) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : gs.lstat(e, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), r(o)) : r(null, {
      toCwd: e,
      toDst: sn.relative(n, e)
    })));
  }
}
function db(e, t) {
  let r;
  if (sn.isAbsolute(e)) {
    if (r = gs.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = sn.dirname(t), i = sn.join(n, e);
    if (r = gs.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = gs.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: sn.relative(n, e)
    };
  }
}
var hb = {
  symlinkPaths: fb,
  symlinkPathsSync: db
};
const Mg = yt;
function pb(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Mg.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function mb(e, t) {
  let r;
  if (t) return t;
  try {
    r = Mg.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var yb = {
  symlinkType: pb,
  symlinkTypeSync: mb
};
const gb = mt.fromCallback, xg = Ie, Xt = Yn, Vg = $r, $b = Vg.mkdirs, vb = Vg.mkdirsSync, qg = hb, _b = qg.symlinkPaths, Eb = qg.symlinkPathsSync, Bg = yb, wb = Bg.symlinkType, bb = Bg.symlinkTypeSync, Sb = Xn.pathExists, { areIdentical: Gg } = Ui;
function Pb(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Xt.lstat(t, (i, s) => {
    !i && s.isSymbolicLink() ? Promise.all([
      Xt.stat(e),
      Xt.stat(t)
    ]).then(([a, o]) => {
      if (Gg(a, o)) return n(null);
      zh(e, t, r, n);
    }) : zh(e, t, r, n);
  });
}
function zh(e, t, r, n) {
  _b(e, t, (i, s) => {
    if (i) return n(i);
    e = s.toDst, wb(s.toCwd, r, (a, o) => {
      if (a) return n(a);
      const c = xg.dirname(t);
      Sb(c, (u, l) => {
        if (u) return n(u);
        if (l) return Xt.symlink(e, t, o, n);
        $b(c, (f) => {
          if (f) return n(f);
          Xt.symlink(e, t, o, n);
        });
      });
    });
  });
}
function Tb(e, t, r) {
  let n;
  try {
    n = Xt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const o = Xt.statSync(e), c = Xt.statSync(t);
    if (Gg(o, c)) return;
  }
  const i = Eb(e, t);
  e = i.toDst, r = bb(i.toCwd, r);
  const s = xg.dirname(t);
  return Xt.existsSync(s) || vb(s), Xt.symlinkSync(e, t, r);
}
var Rb = {
  createSymlink: gb(Pb),
  createSymlinkSync: Tb
};
const { createFile: Kh, createFileSync: Wh } = ib, { createLink: Yh, createLinkSync: Xh } = lb, { createSymlink: Jh, createSymlinkSync: Qh } = Rb;
var Nb = {
  // file
  createFile: Kh,
  createFileSync: Wh,
  ensureFile: Kh,
  ensureFileSync: Wh,
  // link
  createLink: Yh,
  createLinkSync: Xh,
  ensureLink: Yh,
  ensureLinkSync: Xh,
  // symlink
  createSymlink: Jh,
  createSymlinkSync: Qh,
  ensureSymlink: Jh,
  ensureSymlinkSync: Qh
};
function Ob(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const s = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
}
function Ab(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Vu = { stringify: Ob, stripBom: Ab };
let Ii;
try {
  Ii = yt;
} catch {
  Ii = yn;
}
const Zo = mt, { stringify: Hg, stripBom: zg } = Vu;
async function Ib(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ii, n = "throws" in t ? t.throws : !0;
  let i = await Zo.fromCallback(r.readFile)(e, t);
  i = zg(i);
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
const Cb = Zo.fromPromise(Ib);
function Db(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ii, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = zg(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function kb(e, t, r = {}) {
  const n = r.fs || Ii, i = Hg(t, r);
  await Zo.fromCallback(n.writeFile)(e, i, r);
}
const Lb = Zo.fromPromise(kb);
function Fb(e, t, r = {}) {
  const n = r.fs || Ii, i = Hg(t, r);
  return n.writeFileSync(e, i, r);
}
var jb = {
  readFile: Cb,
  readFileSync: Db,
  writeFile: Lb,
  writeFileSync: Fb
};
const Ra = jb;
var Ub = {
  // jsonfile exports
  readJson: Ra.readFile,
  readJsonSync: Ra.readFileSync,
  writeJson: Ra.writeFile,
  writeJsonSync: Ra.writeFileSync
};
const Mb = mt.fromCallback, $s = yt, Kg = Ie, Wg = $r, xb = Xn.pathExists;
function Vb(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Kg.dirname(e);
  xb(i, (s, a) => {
    if (s) return n(s);
    if (a) return $s.writeFile(e, t, r, n);
    Wg.mkdirs(i, (o) => {
      if (o) return n(o);
      $s.writeFile(e, t, r, n);
    });
  });
}
function qb(e, ...t) {
  const r = Kg.dirname(e);
  if ($s.existsSync(r))
    return $s.writeFileSync(e, ...t);
  Wg.mkdirsSync(r), $s.writeFileSync(e, ...t);
}
var qu = {
  outputFile: Mb(Vb),
  outputFileSync: qb
};
const { stringify: Bb } = Vu, { outputFile: Gb } = qu;
async function Hb(e, t, r = {}) {
  const n = Bb(t, r);
  await Gb(e, n, r);
}
var zb = Hb;
const { stringify: Kb } = Vu, { outputFileSync: Wb } = qu;
function Yb(e, t, r) {
  const n = Kb(t, r);
  Wb(e, n, r);
}
var Xb = Yb;
const Jb = mt.fromPromise, pt = Ub;
pt.outputJson = Jb(zb);
pt.outputJsonSync = Xb;
pt.outputJSON = pt.outputJson;
pt.outputJSONSync = pt.outputJsonSync;
pt.writeJSON = pt.writeJson;
pt.writeJSONSync = pt.writeJsonSync;
pt.readJSON = pt.readJson;
pt.readJSONSync = pt.readJsonSync;
var Qb = pt;
const Zb = yt, Yl = Ie, eS = Mu.copy, Yg = Qo.remove, tS = $r.mkdirp, rS = Xn.pathExists, Zh = Ui;
function nS(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Zh.checkPaths(e, t, "move", r, (s, a) => {
    if (s) return n(s);
    const { srcStat: o, isChangingCase: c = !1 } = a;
    Zh.checkParentPaths(e, o, t, "move", (u) => {
      if (u) return n(u);
      if (iS(t)) return ep(e, t, i, c, n);
      tS(Yl.dirname(t), (l) => l ? n(l) : ep(e, t, i, c, n));
    });
  });
}
function iS(e) {
  const t = Yl.dirname(e);
  return Yl.parse(t).root === t;
}
function ep(e, t, r, n, i) {
  if (n) return Kc(e, t, r, i);
  if (r)
    return Yg(t, (s) => s ? i(s) : Kc(e, t, r, i));
  rS(t, (s, a) => s ? i(s) : a ? i(new Error("dest already exists.")) : Kc(e, t, r, i));
}
function Kc(e, t, r, n) {
  Zb.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : sS(e, t, r, n) : n());
}
function sS(e, t, r, n) {
  eS(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (s) => s ? n(s) : Yg(e, n));
}
var aS = nS;
const Xg = yt, Xl = Ie, oS = Mu.copySync, Jg = Qo.removeSync, cS = $r.mkdirpSync, tp = Ui;
function lS(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = tp.checkPathsSync(e, t, "move", r);
  return tp.checkParentPathsSync(e, i, t, "move"), uS(t) || cS(Xl.dirname(t)), fS(e, t, n, s);
}
function uS(e) {
  const t = Xl.dirname(e);
  return Xl.parse(t).root === t;
}
function fS(e, t, r, n) {
  if (n) return Wc(e, t, r);
  if (r)
    return Jg(t), Wc(e, t, r);
  if (Xg.existsSync(t)) throw new Error("dest already exists.");
  return Wc(e, t, r);
}
function Wc(e, t, r) {
  try {
    Xg.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return dS(e, t, r);
  }
}
function dS(e, t, r) {
  return oS(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Jg(e);
}
var hS = lS;
const pS = mt.fromCallback;
var mS = {
  move: pS(aS),
  moveSync: hS
}, $n = {
  // Export promiseified graceful-fs:
  ...Yn,
  // Export extra methods:
  ...Mu,
  ...eb,
  ...Nb,
  ...Qb,
  ...$r,
  ...mS,
  ...qu,
  ...Xn,
  ...Qo
}, Jn = {}, fn = {}, xe = {}, dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.CancellationError = dn.CancellationToken = void 0;
const yS = sg;
class gS extends yS.EventEmitter {
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
      return Promise.reject(new Jl());
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
          s(new Jl());
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
dn.CancellationToken = gS;
class Jl extends Error {
  constructor() {
    super("cancelled");
  }
}
dn.CancellationError = Jl;
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.newError = $S;
function $S(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var ht = {}, Ql = { exports: {} }, Na = { exports: {} }, Yc, rp;
function vS() {
  if (rp) return Yc;
  rp = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, s = n * 365.25;
  Yc = function(l, f) {
    f = f || {};
    var p = typeof l;
    if (p === "string" && l.length > 0)
      return a(l);
    if (p === "number" && isFinite(l))
      return f.long ? c(l) : o(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function a(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var p = parseFloat(f[1]), h = (f[2] || "ms").toLowerCase();
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
    var f = Math.abs(l);
    return f >= n ? Math.round(l / n) + "d" : f >= r ? Math.round(l / r) + "h" : f >= t ? Math.round(l / t) + "m" : f >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n ? u(l, f, n, "day") : f >= r ? u(l, f, r, "hour") : f >= t ? u(l, f, t, "minute") : f >= e ? u(l, f, e, "second") : l + " ms";
  }
  function u(l, f, p, h) {
    var _ = f >= p * 1.5;
    return Math.round(l / p) + " " + h + (_ ? "s" : "");
  }
  return Yc;
}
var Xc, np;
function Qg() {
  if (np) return Xc;
  np = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = u, n.disable = o, n.enable = s, n.enabled = c, n.humanize = vS(), n.destroy = l, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let p = 0;
      for (let h = 0; h < f.length; h++)
        p = (p << 5) - p + f.charCodeAt(h), p |= 0;
      return n.colors[Math.abs(p) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let p, h = null, _, m;
      function v(...y) {
        if (!v.enabled)
          return;
        const w = v, R = Number(/* @__PURE__ */ new Date()), C = R - (p || R);
        w.diff = C, w.prev = p, w.curr = R, p = R, y[0] = n.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        let M = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, (z, he) => {
          if (z === "%%")
            return "%";
          M++;
          const I = n.formatters[he];
          if (typeof I == "function") {
            const Q = y[M];
            z = I.call(w, Q), y.splice(M, 1), M--;
          }
          return z;
        }), n.formatArgs.call(w, y), (w.log || n.log).apply(w, y);
      }
      return v.namespace = f, v.useColors = n.useColors(), v.color = n.selectColor(f), v.extend = i, v.destroy = n.destroy, Object.defineProperty(v, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (_ !== n.namespaces && (_ = n.namespaces, m = n.enabled(f)), m),
        set: (y) => {
          h = y;
        }
      }), typeof n.init == "function" && n.init(v), v;
    }
    function i(f, p) {
      const h = n(this.namespace + (typeof p > "u" ? ":" : p) + f);
      return h.log = this.log, h;
    }
    function s(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const p = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of p)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(f, p) {
      let h = 0, _ = 0, m = -1, v = 0;
      for (; h < f.length; )
        if (_ < p.length && (p[_] === f[h] || p[_] === "*"))
          p[_] === "*" ? (m = _, v = h, _++) : (h++, _++);
        else if (m !== -1)
          _ = m + 1, v++, h = v;
        else
          return !1;
      for (; _ < p.length && p[_] === "*"; )
        _++;
      return _ === p.length;
    }
    function o() {
      const f = [
        ...n.names,
        ...n.skips.map((p) => "-" + p)
      ].join(",");
      return n.enable(""), f;
    }
    function c(f) {
      for (const p of n.skips)
        if (a(f, p))
          return !1;
      for (const p of n.names)
        if (a(f, p))
          return !0;
      return !1;
    }
    function u(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Xc = e, Xc;
}
var ip;
function _S() {
  return ip || (ip = 1, function(e, t) {
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
      const u = "color: " + this.color;
      c.splice(1, 0, u, "color: inherit");
      let l = 0, f = 0;
      c[0].replace(/%[a-zA-Z%]/g, (p) => {
        p !== "%%" && (l++, p === "%c" && (f = l));
      }), c.splice(f, 0, u);
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
    e.exports = Qg()(t);
    const { formatters: o } = e.exports;
    o.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  }(Na, Na.exports)), Na.exports;
}
var Oa = { exports: {} }, Jc, sp;
function ES() {
  return sp || (sp = 1, Jc = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Jc;
}
var Qc, ap;
function wS() {
  if (ap) return Qc;
  ap = 1;
  const e = Zs, t = ag, r = ES(), { env: n } = process;
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
  function a(c, u) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !u && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function o(c) {
    const u = a(c, c && c.isTTY);
    return s(u);
  }
  return Qc = {
    supportsColor: o,
    stdout: s(a(!0, t.isatty(1))),
    stderr: s(a(!0, t.isatty(2)))
  }, Qc;
}
var op;
function bS() {
  return op || (op = 1, function(e, t) {
    const r = ag, n = Du;
    t.init = l, t.log = o, t.formatArgs = s, t.save = c, t.load = u, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const p = wS();
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
      const _ = h.substring(6).toLowerCase().replace(/_([a-z])/g, (v, y) => y.toUpperCase());
      let m = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(m) ? m = !0 : /^(no|off|false|disabled)$/i.test(m) ? m = !1 : m === "null" ? m = null : m = Number(m), p[_] = m, p;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function s(p) {
      const { namespace: h, useColors: _ } = this;
      if (_) {
        const m = this.color, v = "\x1B[3" + (m < 8 ? m : "8;5;" + m), y = `  ${v};1m${h} \x1B[0m`;
        p[0] = y + p[0].split(`
`).join(`
` + y), p.push(v + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
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
    function u() {
      return process.env.DEBUG;
    }
    function l(p) {
      p.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < h.length; _++)
        p.inspectOpts[h[_]] = t.inspectOpts[h[_]];
    }
    e.exports = Qg()(t);
    const { formatters: f } = e.exports;
    f.o = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, f.O = function(p) {
      return this.inspectOpts.colors = this.useColors, n.inspect(p, this.inspectOpts);
    };
  }(Oa, Oa.exports)), Oa.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ql.exports = _S() : Ql.exports = bS();
var SS = Ql.exports, ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
ta.ProgressCallbackTransform = void 0;
const PS = Js;
class TS extends PS.Transform {
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
ta.ProgressCallbackTransform = TS;
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.DigestTransform = ht.HttpExecutor = ht.HttpError = void 0;
ht.createHttpError = eu;
ht.parseJson = kS;
ht.configureRequestOptionsFromUrl = e0;
ht.configureRequestUrl = Gu;
ht.safeGetHeader = bi;
ht.configureRequestOptions = No;
ht.safeStringifyJson = Oo;
const RS = Qs, NS = SS, OS = yn, AS = Js, Zl = gn, IS = dn, cp = Mi, CS = ta, Tn = (0, NS.default)("electron-builder");
function eu(e, t = null) {
  return new Bu(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Oo(e.headers), t);
}
const DS = /* @__PURE__ */ new Map([
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
class Bu extends Error {
  constructor(t, r = `HTTP error: ${DS.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
ht.HttpError = Bu;
function kS(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class pi {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new IS.CancellationToken(), n) {
    No(t);
    const i = n == null ? void 0 : JSON.stringify(n), s = i ? Buffer.from(i) : void 0;
    if (s != null) {
      Tn(i);
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
    return Tn.enabled && Tn(`Request: ${Oo(t)}`), r.createPromise((s, a, o) => {
      const c = this.createRequest(t, (u) => {
        try {
          this.handleResponse(u, t, r, s, a, i, n);
        } catch (l) {
          a(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, a, t.timeout), this.addRedirectHandlers(c, t, a, i, (u) => {
        this.doApiRequest(u, r, n, i).then(s).catch(a);
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
    if (Tn.enabled && Tn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Oo(r)}`), t.statusCode === 404) {
      s(eu(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const u = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = u >= 300 && u < 400, f = bi(t, "location");
    if (l && f != null) {
      if (a > this.maxRedirects) {
        s(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(pi.prepareRedirectUrlOptions(f, r), n, o, a).then(i).catch(s);
      return;
    }
    t.setEncoding("utf8");
    let p = "";
    t.on("error", s), t.on("data", (h) => p += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = bi(t, "content-type"), _ = h != null && (Array.isArray(h) ? h.find((m) => m.includes("json")) != null : h.includes("json"));
          s(eu(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${_ ? JSON.stringify(JSON.parse(p)) : p}
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
      Gu(t, o), No(o), this.doDownload(o, {
        destination: null,
        options: r,
        onCancel: s,
        callback: (c) => {
          c == null ? n(Buffer.concat(a)) : i(c);
        },
        responseHandler: (c, u) => {
          let l = 0;
          c.on("data", (f) => {
            if (l += f.length, l > 524288e3) {
              u(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(f);
          }), c.on("end", () => {
            u(null);
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
      const a = bi(s, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(pi.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? FS(r, s) : r.responseHandler(s, r.callback);
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
    const n = e0(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const s = pi.reconstructOriginalUrl(r), a = Zg(t, r);
      pi.isCrossOriginRedirect(s, a) && (Tn.enabled && Tn(`Given the cross-origin redirect (from ${s.host} to ${a.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", s = t.path || "/";
    return new Zl.URL(`${r}//${n}${i}${s}`);
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
        if (n < r && (i instanceof Bu && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
ht.HttpExecutor = pi;
function Zg(e, t) {
  try {
    return new Zl.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", s = `${n}//${r}${i}`;
    return new Zl.URL(e, s);
  }
}
function e0(e, t) {
  const r = No(t), n = Zg(e, t);
  return Gu(n, r), r;
}
function Gu(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class tu extends AS.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, RS.createHash)(r);
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
      throw (0, cp.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, cp.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
ht.DigestTransform = tu;
function LS(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function bi(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function FS(e, t) {
  if (!LS(bi(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = bi(t, "content-length");
    a != null && r.push(new CS.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new tu(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new tu(e.options.sha2, "sha256", "hex"));
  const i = (0, OS.createWriteStream)(e.destination);
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
function No(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Oo(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var ec = {};
Object.defineProperty(ec, "__esModule", { value: !0 });
ec.MemoLazy = void 0;
class jS {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && t0(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
ec.MemoLazy = jS;
function t0(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), s = Object.keys(t);
    return i.length === s.length && i.every((a) => t0(e[a], t[a]));
  }
  return e === t;
}
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.githubUrl = US;
ra.githubTagPrefix = MS;
ra.getS3LikeProviderBaseUrl = xS;
function US(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function MS(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function xS(e) {
  const t = e.provider;
  if (t === "s3")
    return VS(e);
  if (t === "spaces")
    return qS(e);
  throw new Error(`Not supported provider: ${t}`);
}
function VS(e) {
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
  return r0(t, e.path);
}
function r0(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function qS(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return r0(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Hu = {};
Object.defineProperty(Hu, "__esModule", { value: !0 });
Hu.retry = n0;
const BS = dn;
async function n0(e, t) {
  var r;
  const { retries: n, interval: i, backoff: s = 0, attempt: a = 0, shouldRetry: o, cancellationToken: c = new BS.CancellationToken() } = t;
  try {
    return await e();
  } catch (u) {
    if (await Promise.resolve((r = o == null ? void 0 : o(u)) !== null && r !== void 0 ? r : !0) && n > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + s * a)), await n0(e, { ...t, retries: n - 1, attempt: a + 1 });
    throw u;
  }
}
var zu = {};
Object.defineProperty(zu, "__esModule", { value: !0 });
zu.parseDn = GS;
function GS(e) {
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
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.nil = Ci.UUID = void 0;
const i0 = Qs, s0 = Mi, HS = "options.name must be either a string or a Buffer", lp = (0, i0.randomBytes)(16);
lp[0] = lp[0] | 1;
const po = {}, ye = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  po[t] = e, ye[e] = t;
}
class Gn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Gn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return zS(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = KS(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (po[t[14] + t[15]] & 240) >> 4,
        variant: up((po[t[19] + t[20]] & 224) >> 5),
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
        variant: up((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, s0.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = po[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Ci.UUID = Gn;
Gn.OID = Gn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function up(e) {
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
var vs;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(vs || (vs = {}));
function zS(e, t, r, n, i = vs.ASCII) {
  const s = (0, i0.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, s0.newError)(HS, "ERR_INVALID_UUID_NAME");
  s.update(n), s.update(e);
  const o = s.digest();
  let c;
  switch (i) {
    case vs.BINARY:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = o;
      break;
    case vs.OBJECT:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = new Gn(o);
      break;
    default:
      c = ye[o[0]] + ye[o[1]] + ye[o[2]] + ye[o[3]] + "-" + ye[o[4]] + ye[o[5]] + "-" + ye[o[6] & 15 | r] + ye[o[7]] + "-" + ye[o[8] & 63 | 128] + ye[o[9]] + "-" + ye[o[10]] + ye[o[11]] + ye[o[12]] + ye[o[13]] + ye[o[14]] + ye[o[15]];
      break;
  }
  return c;
}
function KS(e) {
  return ye[e[0]] + ye[e[1]] + ye[e[2]] + ye[e[3]] + "-" + ye[e[4]] + ye[e[5]] + "-" + ye[e[6]] + ye[e[7]] + "-" + ye[e[8]] + ye[e[9]] + "-" + ye[e[10]] + ye[e[11]] + ye[e[12]] + ye[e[13]] + ye[e[14]] + ye[e[15]];
}
Ci.nil = new Gn("00000000-0000-0000-0000-000000000000");
var na = {}, a0 = {};
(function(e) {
  (function(t) {
    t.parser = function(E, g) {
      return new n(E, g);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = u, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
      var j = this;
      s(j), j.q = j.c = "", j.bufferCheckPosition = t.MAX_BUFFER_LENGTH, j.opt = g || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!E, j.noscript = !!(E || j.opt.noscript), j.state = I.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(m)), j.opt.unquotedAttributeValues === void 0 && (j.opt.unquotedAttributeValues = !E), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), B(j, "onready");
    }
    Object.create || (Object.create = function(E) {
      function g() {
      }
      g.prototype = E;
      var j = new g();
      return j;
    }), Object.keys || (Object.keys = function(E) {
      var g = [];
      for (var j in E) E.hasOwnProperty(j) && g.push(j);
      return g;
    });
    function i(E) {
      for (var g = Math.max(t.MAX_BUFFER_LENGTH, 10), j = 0, A = 0, W = r.length; A < W; A++) {
        var de = E[r[A]].length;
        if (de > g)
          switch (r[A]) {
            case "textNode":
              J(E);
              break;
            case "cdata":
              G(E, "oncdata", E.cdata), E.cdata = "";
              break;
            case "script":
              G(E, "onscript", E.script), E.script = "";
              break;
            default:
              D(E, "Max buffer length exceeded: " + r[A]);
          }
        j = Math.max(j, de);
      }
      var ge = t.MAX_BUFFER_LENGTH - j;
      E.bufferCheckPosition = ge + E.position;
    }
    function s(E) {
      for (var g = 0, j = r.length; g < j; g++)
        E[r[g]] = "";
    }
    function a(E) {
      J(E), E.cdata !== "" && (G(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (G(E, "onscript", E.script), E.script = "");
    }
    n.prototype = {
      end: function() {
        x(this);
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
    function u(E, g) {
      return new l(E, g);
    }
    function l(E, g) {
      if (!(this instanceof l))
        return new l(E, g);
      o.apply(this), this._parser = new n(E, g), this.writable = !0, this.readable = !0;
      var j = this;
      this._parser.onend = function() {
        j.emit("end");
      }, this._parser.onerror = function(A) {
        j.emit("error", A), j._parser.error = null;
      }, this._decoder = null, c.forEach(function(A) {
        Object.defineProperty(j, "on" + A, {
          get: function() {
            return j._parser["on" + A];
          },
          set: function(W) {
            if (!W)
              return j.removeAllListeners(A), j._parser["on" + A] = W, W;
            j.on(A, W);
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
          var g = jE.StringDecoder;
          this._decoder = new g("utf8");
        }
        E = this._decoder.write(E);
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, l.prototype.end = function(E) {
      return E && E.length && this.write(E), this._parser.end(), !0;
    }, l.prototype.on = function(E, g) {
      var j = this;
      return !j._parser["on" + E] && c.indexOf(E) !== -1 && (j._parser["on" + E] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, E), j.emit.apply(j, A);
      }), o.prototype.on.call(j, E, g);
    };
    var f = "[CDATA[", p = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", _ = "http://www.w3.org/2000/xmlns/", m = { xml: h, xmlns: _ }, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function C(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function M(E) {
      return E === '"' || E === "'";
    }
    function H(E) {
      return E === ">" || C(E);
    }
    function z(E, g) {
      return E.test(g);
    }
    function he(E, g) {
      return !z(E, g);
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
      var g = t.ENTITIES[E], j = typeof g == "number" ? String.fromCharCode(g) : g;
      t.ENTITIES[E] = j;
    });
    for (var Q in t.STATE)
      t.STATE[t.STATE[Q]] = Q;
    I = t.STATE;
    function B(E, g, j) {
      E[g] && E[g](j);
    }
    function G(E, g, j) {
      E.textNode && J(E), B(E, g, j);
    }
    function J(E) {
      E.textNode = k(E.opt, E.textNode), E.textNode && B(E, "ontext", E.textNode), E.textNode = "";
    }
    function k(E, g) {
      return E.trim && (g = g.trim()), E.normalize && (g = g.replace(/\s+/g, " ")), g;
    }
    function D(E, g) {
      return J(E), E.trackPosition && (g += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), g = new Error(g), E.error = g, B(E, "onerror", g), E;
    }
    function x(E) {
      return E.sawRoot && !E.closedRoot && F(E, "Unclosed root tag"), E.state !== I.BEGIN && E.state !== I.BEGIN_WHITESPACE && E.state !== I.TEXT && D(E, "Unexpected end"), J(E), E.c = "", E.closed = !0, B(E, "onend"), n.call(E, E.strict, E.opt), E;
    }
    function F(E, g) {
      if (typeof E != "object" || !(E instanceof n))
        throw new Error("bad call to strictFail");
      E.strict && D(E, g);
    }
    function V(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var g = E.tags[E.tags.length - 1] || E, j = E.tag = { name: E.tagName, attributes: {} };
      E.opt.xmlns && (j.ns = g.ns), E.attribList.length = 0, G(E, "onopentagstart", j);
    }
    function U(E, g) {
      var j = E.indexOf(":"), A = j < 0 ? ["", E] : E.split(":"), W = A[0], de = A[1];
      return g && E === "xmlns" && (W = "xmlns", de = ""), { prefix: W, local: de };
    }
    function O(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var g = U(E.attribName, !0), j = g.prefix, A = g.local;
        if (j === "xmlns")
          if (A === "xml" && E.attribValue !== h)
            F(
              E,
              "xml: prefix must be bound to " + h + `
Actual: ` + E.attribValue
            );
          else if (A === "xmlns" && E.attribValue !== _)
            F(
              E,
              "xmlns: prefix must be bound to " + _ + `
Actual: ` + E.attribValue
            );
          else {
            var W = E.tag, de = E.tags[E.tags.length - 1] || E;
            W.ns === de.ns && (W.ns = Object.create(de.ns)), W.ns[A] = E.attribValue;
          }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, G(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function b(E, g) {
      if (E.opt.xmlns) {
        var j = E.tag, A = U(E.tagName);
        j.prefix = A.prefix, j.local = A.local, j.uri = j.ns[A.prefix] || "", j.prefix && !j.uri && (F(
          E,
          "Unbound namespace prefix: " + JSON.stringify(E.tagName)
        ), j.uri = A.prefix);
        var W = E.tags[E.tags.length - 1] || E;
        j.ns && W.ns !== j.ns && Object.keys(j.ns).forEach(function(kt) {
          G(E, "onopennamespace", {
            prefix: kt,
            uri: j.ns[kt]
          });
        });
        for (var de = 0, ge = E.attribList.length; de < ge; de++) {
          var we = E.attribList[de], Te = we[0], Je = we[1], $e = U(Te, !0), je = $e.prefix, Vt = $e.local, Dt = je === "" ? "" : j.ns[je] || "", Rt = {
            name: Te,
            value: Je,
            prefix: je,
            local: Vt,
            uri: Dt
          };
          je && je !== "xmlns" && !Dt && (F(
            E,
            "Unbound namespace prefix: " + JSON.stringify(je)
          ), Rt.uri = je), E.tag.attributes[Te] = Rt, G(E, "onattribute", Rt);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!g, E.sawRoot = !0, E.tags.push(E.tag), G(E, "onopentag", E.tag), g || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = I.SCRIPT : E.state = I.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function P(E) {
      if (!E.tagName) {
        F(E, "Weird empty close tag."), E.textNode += "</>", E.state = I.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = I.SCRIPT;
          return;
        }
        G(E, "onscript", E.script), E.script = "";
      }
      var g = E.tags.length, j = E.tagName;
      E.strict || (j = j[E.looseCase]());
      for (var A = j; g--; ) {
        var W = E.tags[g];
        if (W.name !== A)
          F(E, "Unexpected close tag");
        else
          break;
      }
      if (g < 0) {
        F(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = I.TEXT;
        return;
      }
      E.tagName = j;
      for (var de = E.tags.length; de-- > g; ) {
        var ge = E.tag = E.tags.pop();
        E.tagName = E.tag.name, G(E, "onclosetag", E.tagName);
        var we = {};
        for (var Te in ge.ns)
          we[Te] = ge.ns[Te];
        var Je = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && ge.ns !== Je.ns && Object.keys(ge.ns).forEach(function($e) {
          var je = ge.ns[$e];
          G(E, "onclosenamespace", { prefix: $e, uri: je });
        });
      }
      g === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = I.TEXT;
    }
    function S(E) {
      var g = E.entity, j = g.toLowerCase(), A, W = "";
      return E.ENTITIES[g] ? E.ENTITIES[g] : E.ENTITIES[j] ? E.ENTITIES[j] : (g = j, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), A = parseInt(g, 16), W = A.toString(16)) : (g = g.slice(1), A = parseInt(g, 10), W = A.toString(10))), g = g.replace(/^0+/, ""), isNaN(A) || W.toLowerCase() !== g || A < 0 || A > 1114111 ? (F(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(A));
    }
    function d(E, g) {
      g === "<" ? (E.state = I.OPEN_WAKA, E.startTagPosition = E.position) : C(g) || (F(E, "Non-whitespace before first tag."), E.textNode = g, E.state = I.TEXT);
    }
    function $(E, g) {
      var j = "";
      return g < E.length && (j = E.charAt(g)), j;
    }
    function N(E) {
      var g = this;
      if (this.error)
        throw this.error;
      if (g.closed)
        return D(
          g,
          "Cannot write after close. Assign an onready handler."
        );
      if (E === null)
        return x(g);
      typeof E == "object" && (E = E.toString());
      for (var j = 0, A = ""; A = $(E, j++), g.c = A, !!A; )
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
              for (var de = j - 1; A && A !== "<" && A !== "&"; )
                A = $(E, j++), A && g.trackPosition && (g.position++, A === `
` ? (g.line++, g.column = 0) : g.column++);
              g.textNode += E.substring(de, j - 1);
            }
            A === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = I.OPEN_WAKA, g.startTagPosition = g.position) : (!C(A) && (!g.sawRoot || g.closedRoot) && F(g, "Text data outside of root node."), A === "&" ? g.state = I.TEXT_ENTITY : g.textNode += A);
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
            else if (!C(A)) if (z(v, A))
              g.state = I.OPEN_TAG, g.tagName = A;
            else if (A === "/")
              g.state = I.CLOSE_TAG, g.tagName = "";
            else if (A === "?")
              g.state = I.PROC_INST, g.procInstName = g.procInstBody = "";
            else {
              if (F(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                var W = g.position - g.startTagPosition;
                A = new Array(W).join(" ") + A;
              }
              g.textNode += "<" + A, g.state = I.TEXT;
            }
            continue;
          case I.SGML_DECL:
            if (g.sgmlDecl + A === "--") {
              g.state = I.COMMENT, g.comment = "", g.sgmlDecl = "";
              continue;
            }
            g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = I.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + A, g.sgmlDecl = "") : (g.sgmlDecl + A).toUpperCase() === f ? (G(g, "onopencdata"), g.state = I.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + A).toUpperCase() === p ? (g.state = I.DOCTYPE, (g.doctype || g.sawRoot) && F(
              g,
              "Inappropriately located doctype declaration"
            ), g.doctype = "", g.sgmlDecl = "") : A === ">" ? (G(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = I.TEXT) : (M(A) && (g.state = I.SGML_DECL_QUOTED), g.sgmlDecl += A);
            continue;
          case I.SGML_DECL_QUOTED:
            A === g.q && (g.state = I.SGML_DECL, g.q = ""), g.sgmlDecl += A;
            continue;
          case I.DOCTYPE:
            A === ">" ? (g.state = I.TEXT, G(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += A, A === "[" ? g.state = I.DOCTYPE_DTD : M(A) && (g.state = I.DOCTYPE_QUOTED, g.q = A));
            continue;
          case I.DOCTYPE_QUOTED:
            g.doctype += A, A === g.q && (g.q = "", g.state = I.DOCTYPE);
            continue;
          case I.DOCTYPE_DTD:
            A === "]" ? (g.doctype += A, g.state = I.DOCTYPE) : A === "<" ? (g.state = I.OPEN_WAKA, g.startTagPosition = g.position) : M(A) ? (g.doctype += A, g.state = I.DOCTYPE_DTD_QUOTED, g.q = A) : g.doctype += A;
            continue;
          case I.DOCTYPE_DTD_QUOTED:
            g.doctype += A, A === g.q && (g.state = I.DOCTYPE_DTD, g.q = "");
            continue;
          case I.COMMENT:
            A === "-" ? g.state = I.COMMENT_ENDING : g.comment += A;
            continue;
          case I.COMMENT_ENDING:
            A === "-" ? (g.state = I.COMMENT_ENDED, g.comment = k(g.opt, g.comment), g.comment && G(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + A, g.state = I.COMMENT);
            continue;
          case I.COMMENT_ENDED:
            A !== ">" ? (F(g, "Malformed comment"), g.comment += "--" + A, g.state = I.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = I.DOCTYPE_DTD : g.state = I.TEXT;
            continue;
          case I.CDATA:
            for (var de = j - 1; A && A !== "]"; )
              A = $(E, j++), A && g.trackPosition && (g.position++, A === `
` ? (g.line++, g.column = 0) : g.column++);
            g.cdata += E.substring(de, j - 1), A === "]" && (g.state = I.CDATA_ENDING);
            continue;
          case I.CDATA_ENDING:
            A === "]" ? g.state = I.CDATA_ENDING_2 : (g.cdata += "]" + A, g.state = I.CDATA);
            continue;
          case I.CDATA_ENDING_2:
            A === ">" ? (g.cdata && G(g, "oncdata", g.cdata), G(g, "onclosecdata"), g.cdata = "", g.state = I.TEXT) : A === "]" ? g.cdata += "]" : (g.cdata += "]]" + A, g.state = I.CDATA);
            continue;
          case I.PROC_INST:
            A === "?" ? g.state = I.PROC_INST_ENDING : C(A) ? g.state = I.PROC_INST_BODY : g.procInstName += A;
            continue;
          case I.PROC_INST_BODY:
            if (!g.procInstBody && C(A))
              continue;
            A === "?" ? g.state = I.PROC_INST_ENDING : g.procInstBody += A;
            continue;
          case I.PROC_INST_ENDING:
            A === ">" ? (G(g, "onprocessinginstruction", {
              name: g.procInstName,
              body: g.procInstBody
            }), g.procInstName = g.procInstBody = "", g.state = I.TEXT) : (g.procInstBody += "?" + A, g.state = I.PROC_INST_BODY);
            continue;
          case I.OPEN_TAG:
            z(y, A) ? g.tagName += A : (V(g), A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : (C(A) || F(g, "Invalid character in tag name"), g.state = I.ATTRIB));
            continue;
          case I.OPEN_TAG_SLASH:
            A === ">" ? (b(g, !0), P(g)) : (F(
              g,
              "Forward-slash in opening tag not followed by >"
            ), g.state = I.ATTRIB);
            continue;
          case I.ATTRIB:
            if (C(A))
              continue;
            A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : z(v, A) ? (g.attribName = A, g.attribValue = "", g.state = I.ATTRIB_NAME) : F(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME:
            A === "=" ? g.state = I.ATTRIB_VALUE : A === ">" ? (F(g, "Attribute without value"), g.attribValue = g.attribName, O(g), b(g)) : C(A) ? g.state = I.ATTRIB_NAME_SAW_WHITE : z(y, A) ? g.attribName += A : F(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              g.state = I.ATTRIB_VALUE;
            else {
              if (C(A))
                continue;
              F(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", G(g, "onattribute", {
                name: g.attribName,
                value: ""
              }), g.attribName = "", A === ">" ? b(g) : z(v, A) ? (g.attribName = A, g.state = I.ATTRIB_NAME) : (F(g, "Invalid attribute name"), g.state = I.ATTRIB);
            }
            continue;
          case I.ATTRIB_VALUE:
            if (C(A))
              continue;
            M(A) ? (g.q = A, g.state = I.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || D(g, "Unquoted attribute value"), g.state = I.ATTRIB_VALUE_UNQUOTED, g.attribValue = A);
            continue;
          case I.ATTRIB_VALUE_QUOTED:
            if (A !== g.q) {
              A === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_Q : g.attribValue += A;
              continue;
            }
            O(g), g.q = "", g.state = I.ATTRIB_VALUE_CLOSED;
            continue;
          case I.ATTRIB_VALUE_CLOSED:
            C(A) ? g.state = I.ATTRIB : A === ">" ? b(g) : A === "/" ? g.state = I.OPEN_TAG_SLASH : z(v, A) ? (F(g, "No whitespace between attributes"), g.attribName = A, g.attribValue = "", g.state = I.ATTRIB_NAME) : F(g, "Invalid attribute name");
            continue;
          case I.ATTRIB_VALUE_UNQUOTED:
            if (!H(A)) {
              A === "&" ? g.state = I.ATTRIB_VALUE_ENTITY_U : g.attribValue += A;
              continue;
            }
            O(g), A === ">" ? b(g) : g.state = I.ATTRIB;
            continue;
          case I.CLOSE_TAG:
            if (g.tagName)
              A === ">" ? P(g) : z(y, A) ? g.tagName += A : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = I.SCRIPT) : (C(A) || F(g, "Invalid tagname in closing tag"), g.state = I.CLOSE_TAG_SAW_WHITE);
            else {
              if (C(A))
                continue;
              he(v, A) ? g.script ? (g.script += "</" + A, g.state = I.SCRIPT) : F(g, "Invalid tagname in closing tag.") : g.tagName = A;
            }
            continue;
          case I.CLOSE_TAG_SAW_WHITE:
            if (C(A))
              continue;
            A === ">" ? P(g) : F(g, "Invalid characters in closing tag");
            continue;
          case I.TEXT_ENTITY:
          case I.ATTRIB_VALUE_ENTITY_Q:
          case I.ATTRIB_VALUE_ENTITY_U:
            var ge, we;
            switch (g.state) {
              case I.TEXT_ENTITY:
                ge = I.TEXT, we = "textNode";
                break;
              case I.ATTRIB_VALUE_ENTITY_Q:
                ge = I.ATTRIB_VALUE_QUOTED, we = "attribValue";
                break;
              case I.ATTRIB_VALUE_ENTITY_U:
                ge = I.ATTRIB_VALUE_UNQUOTED, we = "attribValue";
                break;
            }
            if (A === ";") {
              var Te = S(g);
              g.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Te) ? (g.entity = "", g.state = ge, g.write(Te)) : (g[we] += Te, g.entity = "", g.state = ge);
            } else z(g.entity.length ? R : w, A) ? g.entity += A : (F(g, "Invalid character in entity name"), g[we] += "&" + g.entity + A, g.entity = "", g.state = ge);
            continue;
          default:
            throw new Error(g, "Unknown state: " + g.state);
        }
      return g.position >= g.bufferCheckPosition && i(g), g;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var E = String.fromCharCode, g = Math.floor, j = function() {
        var A = 16384, W = [], de, ge, we = -1, Te = arguments.length;
        if (!Te)
          return "";
        for (var Je = ""; ++we < Te; ) {
          var $e = Number(arguments[we]);
          if (!isFinite($e) || // `NaN`, `+Infinity`, or `-Infinity`
          $e < 0 || // not a valid Unicode code point
          $e > 1114111 || // not a valid Unicode code point
          g($e) !== $e)
            throw RangeError("Invalid code point: " + $e);
          $e <= 65535 ? W.push($e) : ($e -= 65536, de = ($e >> 10) + 55296, ge = $e % 1024 + 56320, W.push(de, ge)), (we + 1 === Te || W.length > A) && (Je += E.apply(null, W), W.length = 0);
        }
        return Je;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: j,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = j;
    }();
  })(e);
})(a0);
Object.defineProperty(na, "__esModule", { value: !0 });
na.XElement = void 0;
na.parseXml = JS;
const WS = a0, Aa = Mi;
class o0 {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Aa.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!XS(t))
      throw (0, Aa.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Aa.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Aa.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (fp(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => fp(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
na.XElement = o0;
const YS = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function XS(e) {
  return YS.test(e);
}
function fp(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function JS(e) {
  let t = null;
  const r = WS.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const s = new o0(i.name);
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
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = dn;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Mi;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = ht;
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
  var i = ec;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var s = ta;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var a = ra;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return a.githubTagPrefix;
  } });
  var o = Hu;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return o.retry;
  } });
  var c = zu;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var u = Ci;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return u.UUID;
  } });
  var l = na;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(p) {
    return p == null ? [] : Array.isArray(p) ? p : [p];
  }
})(xe);
var Xe = {}, Ku = {}, tr = {};
function c0(e) {
  return typeof e > "u" || e === null;
}
function QS(e) {
  return typeof e == "object" && e !== null;
}
function ZS(e) {
  return Array.isArray(e) ? e : c0(e) ? [] : [e];
}
function eP(e, t) {
  var r, n, i, s;
  if (t)
    for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1)
      i = s[r], e[i] = t[i];
  return e;
}
function tP(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function rP(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
tr.isNothing = c0;
tr.isObject = QS;
tr.toArray = ZS;
tr.repeat = tP;
tr.isNegativeZero = rP;
tr.extend = eP;
function l0(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function js(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = l0(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
js.prototype = Object.create(Error.prototype);
js.prototype.constructor = js;
js.prototype.toString = function(t) {
  return this.name + ": " + l0(this, t);
};
var ia = js, ds = tr;
function Zc(e, t, r, n, i) {
  var s = "", a = "", o = Math.floor(i / 2) - 1;
  return n - t > o && (s = " ... ", t = n - o + s.length), r - n > o && (a = " ...", r = n + o - a.length), {
    str: s + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + s.length
    // relative position
  };
}
function el(e, t) {
  return ds.repeat(" ", t - e.length) + e;
}
function nP(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], s, a = -1; s = r.exec(e.buffer); )
    i.push(s.index), n.push(s.index + s[0].length), e.position <= s.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var o = "", c, u, l = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(a - c < 0); c++)
    u = Zc(
      e.buffer,
      n[a - c],
      i[a - c],
      e.position - (n[a] - n[a - c]),
      f
    ), o = ds.repeat(" ", t.indent) + el((e.line - c + 1).toString(), l) + " | " + u.str + `
` + o;
  for (u = Zc(e.buffer, n[a], i[a], e.position, f), o += ds.repeat(" ", t.indent) + el((e.line + 1).toString(), l) + " | " + u.str + `
`, o += ds.repeat("-", t.indent + l + 3 + u.pos) + `^
`, c = 1; c <= t.linesAfter && !(a + c >= i.length); c++)
    u = Zc(
      e.buffer,
      n[a + c],
      i[a + c],
      e.position - (n[a] - n[a + c]),
      f
    ), o += ds.repeat(" ", t.indent) + el((e.line + c + 1).toString(), l) + " | " + u.str + `
`;
  return o.replace(/\n$/, "");
}
var iP = nP, dp = ia, sP = [
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
], aP = [
  "scalar",
  "sequence",
  "mapping"
];
function oP(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function cP(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (sP.indexOf(r) === -1)
      throw new dp('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = oP(t.styleAliases || null), aP.indexOf(this.kind) === -1)
    throw new dp('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var gt = cP, ns = ia, tl = gt;
function hp(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(s, a) {
      s.tag === n.tag && s.kind === n.kind && s.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function lP() {
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
function ru(e) {
  return this.extend(e);
}
ru.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof tl)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new ns("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(s) {
    if (!(s instanceof tl))
      throw new ns("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new ns("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new ns("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(s) {
    if (!(s instanceof tl))
      throw new ns("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(ru.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = hp(i, "implicit"), i.compiledExplicit = hp(i, "explicit"), i.compiledTypeMap = lP(i.compiledImplicit, i.compiledExplicit), i;
};
var u0 = ru, uP = gt, f0 = new uP("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), fP = gt, d0 = new fP("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), dP = gt, h0 = new dP("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), hP = u0, p0 = new hP({
  explicit: [
    f0,
    d0,
    h0
  ]
}), pP = gt;
function mP(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function yP() {
  return null;
}
function gP(e) {
  return e === null;
}
var m0 = new pP("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: mP,
  construct: yP,
  predicate: gP,
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
}), $P = gt;
function vP(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function _P(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function EP(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var y0 = new $P("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: vP,
  construct: _P,
  predicate: EP,
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
}), wP = tr, bP = gt;
function SP(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function PP(e) {
  return 48 <= e && e <= 55;
}
function TP(e) {
  return 48 <= e && e <= 57;
}
function RP(e) {
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
          if (!SP(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!PP(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!TP(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function NP(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function OP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !wP.isNegativeZero(e);
}
var g0 = new bP("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: RP,
  construct: NP,
  predicate: OP,
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
}), $0 = tr, AP = gt, IP = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function CP(e) {
  return !(e === null || !IP.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function DP(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var kP = /^[-+]?[0-9]+e/;
function LP(e, t) {
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
  else if ($0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), kP.test(r) ? r.replace("e", ".e") : r;
}
function FP(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || $0.isNegativeZero(e));
}
var v0 = new AP("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: CP,
  construct: DP,
  predicate: FP,
  represent: LP,
  defaultStyle: "lowercase"
}), _0 = p0.extend({
  implicit: [
    m0,
    y0,
    g0,
    v0
  ]
}), E0 = _0, jP = gt, w0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), b0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function UP(e) {
  return e === null ? !1 : w0.exec(e) !== null || b0.exec(e) !== null;
}
function MP(e) {
  var t, r, n, i, s, a, o, c = 0, u = null, l, f, p;
  if (t = w0.exec(e), t === null && (t = b0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (s = +t[4], a = +t[5], o = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], f = +(t[11] || 0), u = (l * 60 + f) * 6e4, t[9] === "-" && (u = -u)), p = new Date(Date.UTC(r, n, i, s, a, o, c)), u && p.setTime(p.getTime() - u), p;
}
function xP(e) {
  return e.toISOString();
}
var S0 = new jP("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: UP,
  construct: MP,
  instanceOf: Date,
  represent: xP
}), VP = gt;
function qP(e) {
  return e === "<<" || e === null;
}
var P0 = new VP("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: qP
}), BP = gt, Wu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function GP(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, s = Wu;
  for (r = 0; r < i; r++)
    if (t = s.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function HP(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, s = Wu, a = 0, o = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)), a = a << 6 | s.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (o.push(a >> 16 & 255), o.push(a >> 8 & 255), o.push(a & 255)) : r === 18 ? (o.push(a >> 10 & 255), o.push(a >> 2 & 255)) : r === 12 && o.push(a >> 4 & 255), new Uint8Array(o);
}
function zP(e) {
  var t = "", r = 0, n, i, s = e.length, a = Wu;
  for (n = 0; n < s; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = s % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function KP(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var T0 = new BP("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: GP,
  construct: HP,
  predicate: KP,
  represent: zP
}), WP = gt, YP = Object.prototype.hasOwnProperty, XP = Object.prototype.toString;
function JP(e) {
  if (e === null) return !0;
  var t = [], r, n, i, s, a, o = e;
  for (r = 0, n = o.length; r < n; r += 1) {
    if (i = o[r], a = !1, XP.call(i) !== "[object Object]") return !1;
    for (s in i)
      if (YP.call(i, s))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(s) === -1) t.push(s);
    else return !1;
  }
  return !0;
}
function QP(e) {
  return e !== null ? e : [];
}
var R0 = new WP("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: JP,
  construct: QP
}), ZP = gt, e1 = Object.prototype.toString;
function t1(e) {
  if (e === null) return !0;
  var t, r, n, i, s, a = e;
  for (s = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], e1.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    s[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function r1(e) {
  if (e === null) return [];
  var t, r, n, i, s, a = e;
  for (s = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), s[t] = [i[0], n[i[0]]];
  return s;
}
var N0 = new ZP("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: t1,
  construct: r1
}), n1 = gt, i1 = Object.prototype.hasOwnProperty;
function s1(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (i1.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function a1(e) {
  return e !== null ? e : {};
}
var O0 = new n1("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: s1,
  construct: a1
}), Yu = E0.extend({
  implicit: [
    S0,
    P0
  ],
  explicit: [
    T0,
    R0,
    N0,
    O0
  ]
}), In = tr, A0 = ia, o1 = iP, c1 = Yu, hn = Object.prototype.hasOwnProperty, Ao = 1, I0 = 2, C0 = 3, Io = 4, rl = 1, l1 = 2, pp = 3, u1 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, f1 = /[\x85\u2028\u2029]/, d1 = /[,\[\]\{\}]/, D0 = /^(?:!|!!|![a-z\-]+!)$/i, k0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function mp(e) {
  return Object.prototype.toString.call(e);
}
function yr(e) {
  return e === 10 || e === 13;
}
function Bn(e) {
  return e === 9 || e === 32;
}
function Tt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function mi(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function h1(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function p1(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function m1(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function yp(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function y1(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function L0(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var F0 = new Array(256), j0 = new Array(256);
for (var ri = 0; ri < 256; ri++)
  F0[ri] = yp(ri) ? 1 : 0, j0[ri] = yp(ri);
function g1(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || c1, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function U0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = o1(r), new A0(t, r);
}
function te(e, t) {
  throw U0(e, t);
}
function Co(e, t) {
  e.onWarning && e.onWarning.call(null, U0(e, t));
}
var gp = {
  YAML: function(t, r, n) {
    var i, s, a;
    t.version !== null && te(t, "duplication of %YAML directive"), n.length !== 1 && te(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && te(t, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), a = parseInt(i[2], 10), s !== 1 && te(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && Co(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, s;
    n.length !== 2 && te(t, "TAG directive accepts exactly two arguments"), i = n[0], s = n[1], D0.test(i) || te(t, "ill-formed tag handle (first argument) of the TAG directive"), hn.call(t.tagMap, i) && te(t, 'there is a previously declared suffix for "' + i + '" tag handle'), k0.test(s) || te(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      te(t, "tag prefix is malformed: " + s);
    }
    t.tagMap[i] = s;
  }
};
function cn(e, t, r, n) {
  var i, s, a, o;
  if (t < r) {
    if (o = e.input.slice(t, r), n)
      for (i = 0, s = o.length; i < s; i += 1)
        a = o.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || te(e, "expected valid JSON character");
    else u1.test(o) && te(e, "the stream contains non-printable characters");
    e.result += o;
  }
}
function $p(e, t, r, n) {
  var i, s, a, o;
  for (In.isObject(r) || te(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, o = i.length; a < o; a += 1)
    s = i[a], hn.call(t, s) || (L0(t, s, r[s]), n[s] = !0);
}
function yi(e, t, r, n, i, s, a, o, c) {
  var u, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), u = 0, l = i.length; u < l; u += 1)
      Array.isArray(i[u]) && te(e, "nested arrays are not supported inside keys"), typeof i == "object" && mp(i[u]) === "[object Object]" && (i[u] = "[object Object]");
  if (typeof i == "object" && mp(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (u = 0, l = s.length; u < l; u += 1)
        $p(e, t, s[u], r);
    else
      $p(e, t, s, r);
  else
    !e.json && !hn.call(r, i) && hn.call(t, i) && (e.line = a || e.line, e.lineStart = o || e.lineStart, e.position = c || e.position, te(e, "duplicated mapping key")), L0(t, i, s), delete r[i];
  return t;
}
function Xu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : te(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Le(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Bn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (yr(i))
      for (Xu(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Co(e, "deficient indentation"), n;
}
function tc(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Tt(r)));
}
function Ju(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += In.repeat(`
`, t - 1));
}
function $1(e, t, r) {
  var n, i, s, a, o, c, u, l, f = e.kind, p = e.result, h;
  if (h = e.input.charCodeAt(e.position), Tt(h) || mi(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), Tt(i) || r && mi(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", s = a = e.position, o = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Tt(i) || r && mi(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Tt(n))
        break;
    } else {
      if (e.position === e.lineStart && tc(e) || r && mi(h))
        break;
      if (yr(h))
        if (c = e.line, u = e.lineStart, l = e.lineIndent, Le(e, !1, -1), e.lineIndent >= t) {
          o = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = c, e.lineStart = u, e.lineIndent = l;
          break;
        }
    }
    o && (cn(e, s, a, !1), Ju(e, e.line - c), s = a = e.position, o = !1), Bn(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return cn(e, s, a, !1), e.result ? !0 : (e.kind = f, e.result = p, !1);
}
function v1(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (cn(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else yr(r) ? (cn(e, n, i, !0), Ju(e, Le(e, !1, t)), n = i = e.position) : e.position === e.lineStart && tc(e) ? te(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  te(e, "unexpected end of the stream within a single quoted scalar");
}
function _1(e, t) {
  var r, n, i, s, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return cn(e, r, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (cn(e, r, e.position, !0), o = e.input.charCodeAt(++e.position), yr(o))
        Le(e, !1, t);
      else if (o < 256 && F0[o])
        e.result += j0[o], e.position++;
      else if ((a = p1(o)) > 0) {
        for (i = a, s = 0; i > 0; i--)
          o = e.input.charCodeAt(++e.position), (a = h1(o)) >= 0 ? s = (s << 4) + a : te(e, "expected hexadecimal character");
        e.result += y1(s), e.position++;
      } else
        te(e, "unknown escape sequence");
      r = n = e.position;
    } else yr(o) ? (cn(e, r, n, !0), Ju(e, Le(e, !1, t)), r = n = e.position) : e.position === e.lineStart && tc(e) ? te(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  te(e, "unexpected end of the stream within a double quoted scalar");
}
function E1(e, t) {
  var r = !0, n, i, s, a = e.tag, o, c = e.anchor, u, l, f, p, h, _ = /* @__PURE__ */ Object.create(null), m, v, y, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    l = 93, h = !1, o = [];
  else if (w === 123)
    l = 125, h = !0, o = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Le(e, !0, t), w = e.input.charCodeAt(e.position), w === l)
      return e.position++, e.tag = a, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = o, !0;
    r ? w === 44 && te(e, "expected the node content, but found ','") : te(e, "missed comma between flow collection entries"), v = m = y = null, f = p = !1, w === 63 && (u = e.input.charCodeAt(e.position + 1), Tt(u) && (f = p = !0, e.position++, Le(e, !0, t))), n = e.line, i = e.lineStart, s = e.position, Di(e, t, Ao, !1, !0), v = e.tag, m = e.result, Le(e, !0, t), w = e.input.charCodeAt(e.position), (p || e.line === n) && w === 58 && (f = !0, w = e.input.charCodeAt(++e.position), Le(e, !0, t), Di(e, t, Ao, !1, !0), y = e.result), h ? yi(e, o, _, v, m, y, n, i, s) : f ? o.push(yi(e, null, _, v, m, y, n, i, s)) : o.push(m), Le(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  te(e, "unexpected end of the stream within a flow collection");
}
function w1(e, t) {
  var r, n, i = rl, s = !1, a = !1, o = t, c = 0, u = !1, l, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      rl === i ? i = f === 43 ? pp : l1 : te(e, "repeat of a chomping mode identifier");
    else if ((l = m1(f)) >= 0)
      l === 0 ? te(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? te(e, "repeat of an indentation width identifier") : (o = t + l - 1, a = !0);
    else
      break;
  if (Bn(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Bn(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!yr(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Xu(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < o) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > o && (o = e.lineIndent), yr(f)) {
      c++;
      continue;
    }
    if (e.lineIndent < o) {
      i === pp ? e.result += In.repeat(`
`, s ? 1 + c : c) : i === rl && s && (e.result += `
`);
      break;
    }
    for (n ? Bn(f) ? (u = !0, e.result += In.repeat(`
`, s ? 1 + c : c)) : u ? (u = !1, e.result += In.repeat(`
`, c + 1)) : c === 0 ? s && (e.result += " ") : e.result += In.repeat(`
`, c) : e.result += In.repeat(`
`, s ? 1 + c : c), s = !0, a = !0, c = 0, r = e.position; !yr(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    cn(e, r, e.position, !1);
  }
  return !0;
}
function vp(e, t) {
  var r, n = e.tag, i = e.anchor, s = [], a, o = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), !(c !== 45 || (a = e.input.charCodeAt(e.position + 1), !Tt(a)))); ) {
    if (o = !0, e.position++, Le(e, !0, -1) && e.lineIndent <= t) {
      s.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Di(e, t, C0, !1, !0), s.push(e.result), Le(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      te(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = s, !0) : !1;
}
function b1(e, t, r) {
  var n, i, s, a, o, c, u = e.tag, l = e.anchor, f = {}, p = /* @__PURE__ */ Object.create(null), h = null, _ = null, m = null, v = !1, y = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), s = e.line, (w === 63 || w === 58) && Tt(n))
      w === 63 ? (v && (yi(e, f, p, h, _, null, a, o, c), h = _ = m = null), y = !0, v = !0, i = !0) : v ? (v = !1, i = !0) : te(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (a = e.line, o = e.lineStart, c = e.position, !Di(e, r, I0, !1, !0))
        break;
      if (e.line === s) {
        for (w = e.input.charCodeAt(e.position); Bn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), Tt(w) || te(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (yi(e, f, p, h, _, null, a, o, c), h = _ = m = null), y = !0, v = !1, i = !1, h = e.tag, _ = e.result;
        else if (y)
          te(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = u, e.anchor = l, !0;
      } else if (y)
        te(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = u, e.anchor = l, !0;
    }
    if ((e.line === s || e.lineIndent > t) && (v && (a = e.line, o = e.lineStart, c = e.position), Di(e, t, Io, !0, i) && (v ? _ = e.result : m = e.result), v || (yi(e, f, p, h, _, m, a, o, c), h = _ = m = null), Le(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === s || e.lineIndent > t) && w !== 0)
      te(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return v && yi(e, f, p, h, _, null, a, o, c), y && (e.tag = u, e.anchor = l, e.kind = "mapping", e.result = f), y;
}
function S1(e) {
  var t, r = !1, n = !1, i, s, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && te(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (s = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : te(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Tt(a); )
      a === 33 && (n ? te(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), D0.test(i) || te(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    s = e.input.slice(t, e.position), d1.test(s) && te(e, "tag suffix cannot contain flow indicator characters");
  }
  s && !k0.test(s) && te(e, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    te(e, "tag name is malformed: " + s);
  }
  return r ? e.tag = s : hn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + s : i === "!" ? e.tag = "!" + s : i === "!!" ? e.tag = "tag:yaml.org,2002:" + s : te(e, 'undeclared tag handle "' + i + '"'), !0;
}
function P1(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && te(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Tt(r) && !mi(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function T1(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Tt(n) && !mi(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), hn.call(e.anchorMap, r) || te(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Le(e, !0, -1), !0;
}
function Di(e, t, r, n, i) {
  var s, a, o, c = 1, u = !1, l = !1, f, p, h, _, m, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, s = a = o = Io === r || C0 === r, n && Le(e, !0, -1) && (u = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; S1(e) || P1(e); )
      Le(e, !0, -1) ? (u = !0, o = s, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : o = !1;
  if (o && (o = u || i), (c === 1 || Io === r) && (Ao === r || I0 === r ? m = t : m = t + 1, v = e.position - e.lineStart, c === 1 ? o && (vp(e, v) || b1(e, v, m)) || E1(e, m) ? l = !0 : (a && w1(e, m) || v1(e, m) || _1(e, m) ? l = !0 : T1(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && te(e, "alias node should not have any properties")) : $1(e, m, Ao === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = o && vp(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && te(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, p = e.implicitTypes.length; f < p; f += 1)
      if (_ = e.implicitTypes[f], _.resolve(e.result)) {
        e.result = _.construct(e.result), e.tag = _.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (hn.call(e.typeMap[e.kind || "fallback"], e.tag))
      _ = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (_ = null, h = e.typeMap.multi[e.kind || "fallback"], f = 0, p = h.length; f < p; f += 1)
        if (e.tag.slice(0, h[f].tag.length) === h[f].tag) {
          _ = h[f];
          break;
        }
    _ || te(e, "unknown tag !<" + e.tag + ">"), e.result !== null && _.kind !== e.kind && te(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'), _.resolve(e.result, e.tag) ? (e.result = _.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : te(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function R1(e) {
  var t = e.position, r, n, i, s = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (Le(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (s = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Tt(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && te(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Bn(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !yr(a));
        break;
      }
      if (yr(a)) break;
      for (r = e.position; a !== 0 && !Tt(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Xu(e), hn.call(gp, n) ? gp[n](e, n, i) : Co(e, 'unknown document directive "' + n + '"');
  }
  if (Le(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Le(e, !0, -1)) : s && te(e, "directives end mark is expected"), Di(e, e.lineIndent - 1, Io, !1, !0), Le(e, !0, -1), e.checkLineBreaks && f1.test(e.input.slice(t, e.position)) && Co(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && tc(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Le(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    te(e, "end of the stream or a document separator is expected");
  else
    return;
}
function M0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new g1(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, te(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    R1(r);
  return r.documents;
}
function N1(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = M0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, s = n.length; i < s; i += 1)
    t(n[i]);
}
function O1(e, t) {
  var r = M0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new A0("expected a single document in the stream, but found more");
  }
}
Ku.loadAll = N1;
Ku.load = O1;
var x0 = {}, rc = tr, sa = ia, A1 = Yu, V0 = Object.prototype.toString, q0 = Object.prototype.hasOwnProperty, Qu = 65279, I1 = 9, Us = 10, C1 = 13, D1 = 32, k1 = 33, L1 = 34, nu = 35, F1 = 37, j1 = 38, U1 = 39, M1 = 42, B0 = 44, x1 = 45, Do = 58, V1 = 61, q1 = 62, B1 = 63, G1 = 64, G0 = 91, H0 = 93, H1 = 96, z0 = 123, z1 = 124, K0 = 125, at = {};
at[0] = "\\0";
at[7] = "\\a";
at[8] = "\\b";
at[9] = "\\t";
at[10] = "\\n";
at[11] = "\\v";
at[12] = "\\f";
at[13] = "\\r";
at[27] = "\\e";
at[34] = '\\"';
at[92] = "\\\\";
at[133] = "\\N";
at[160] = "\\_";
at[8232] = "\\L";
at[8233] = "\\P";
var K1 = [
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
], W1 = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Y1(e, t) {
  var r, n, i, s, a, o, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
    a = n[i], o = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), c = e.compiledTypeMap.fallback[a], c && q0.call(c.styleAliases, o) && (o = c.styleAliases[o]), r[a] = o;
  return r;
}
function X1(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new sa("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + rc.repeat("0", n - t.length) + t;
}
var J1 = 1, Ms = 2;
function Q1(e) {
  this.schema = e.schema || A1, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = rc.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Y1(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ms : J1, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function _p(e, t) {
  for (var r = rc.repeat(" ", t), n = 0, i = -1, s = "", a, o = e.length; n < o; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = o) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (s += r), s += a;
  return s;
}
function iu(e, t) {
  return `
` + rc.repeat(" ", e.indent * t);
}
function Z1(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function ko(e) {
  return e === D1 || e === I1;
}
function xs(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Qu || 65536 <= e && e <= 1114111;
}
function Ep(e) {
  return xs(e) && e !== Qu && e !== C1 && e !== Us;
}
function wp(e, t, r) {
  var n = Ep(e), i = n && !ko(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== B0 && e !== G0 && e !== H0 && e !== z0 && e !== K0) && e !== nu && !(t === Do && !i) || Ep(t) && !ko(t) && e === nu || t === Do && i
  );
}
function eT(e) {
  return xs(e) && e !== Qu && !ko(e) && e !== x1 && e !== B1 && e !== Do && e !== B0 && e !== G0 && e !== H0 && e !== z0 && e !== K0 && e !== nu && e !== j1 && e !== M1 && e !== k1 && e !== z1 && e !== V1 && e !== q1 && e !== U1 && e !== L1 && e !== F1 && e !== G1 && e !== H1;
}
function tT(e) {
  return !ko(e) && e !== Do;
}
function hs(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function W0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Y0 = 1, su = 2, X0 = 3, J0 = 4, fi = 5;
function rT(e, t, r, n, i, s, a, o) {
  var c, u = 0, l = null, f = !1, p = !1, h = n !== -1, _ = -1, m = eT(hs(e, 0)) && tT(hs(e, e.length - 1));
  if (t || a)
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = hs(e, c), !xs(u))
        return fi;
      m = m && wp(u, l, o), l = u;
    }
  else {
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = hs(e, c), u === Us)
        f = !0, h && (p = p || // Foldable line = too long, and not more-indented.
        c - _ - 1 > n && e[_ + 1] !== " ", _ = c);
      else if (!xs(u))
        return fi;
      m = m && wp(u, l, o), l = u;
    }
    p = p || h && c - _ - 1 > n && e[_ + 1] !== " ";
  }
  return !f && !p ? m && !a && !i(e) ? Y0 : s === Ms ? fi : su : r > 9 && W0(e) ? fi : a ? s === Ms ? fi : su : p ? J0 : X0;
}
function nT(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ms ? '""' : "''";
    if (!e.noCompatMode && (K1.indexOf(t) !== -1 || W1.test(t)))
      return e.quotingType === Ms ? '"' + t + '"' : "'" + t + "'";
    var s = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s), o = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(u) {
      return Z1(e, u);
    }
    switch (rT(
      t,
      o,
      e.indent,
      a,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Y0:
        return t;
      case su:
        return "'" + t.replace(/'/g, "''") + "'";
      case X0:
        return "|" + bp(t, e.indent) + Sp(_p(t, s));
      case J0:
        return ">" + bp(t, e.indent) + Sp(_p(iT(t, a), s));
      case fi:
        return '"' + sT(t) + '"';
      default:
        throw new sa("impossible error: invalid scalar style");
    }
  }();
}
function bp(e, t) {
  var r = W0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), s = i ? "+" : n ? "" : "-";
  return r + s + `
`;
}
function Sp(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function iT(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var u = e.indexOf(`
`);
    return u = u !== -1 ? u : e.length, r.lastIndex = u, Pp(e.slice(0, u), t);
  }(), i = e[0] === `
` || e[0] === " ", s, a; a = r.exec(e); ) {
    var o = a[1], c = a[2];
    s = c[0] === " ", n += o + (!i && !s && c !== "" ? `
` : "") + Pp(c, t), i = s;
  }
  return n;
}
function Pp(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, s, a = 0, o = 0, c = ""; n = r.exec(e); )
    o = n.index, o - i > t && (s = a > i ? a : o, c += `
` + e.slice(i, s), i = s + 1), a = o;
  return c += `
`, e.length - i > t && a > i ? c += e.slice(i, a) + `
` + e.slice(a + 1) : c += e.slice(i), c.slice(1);
}
function sT(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = hs(e, i), n = at[r], !n && xs(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || X1(r);
  return t;
}
function aT(e, t, r) {
  var n = "", i = e.tag, s, a, o;
  for (s = 0, a = r.length; s < a; s += 1)
    o = r[s], e.replacer && (o = e.replacer.call(r, String(s), o)), (kr(e, t, o, !1, !1) || typeof o > "u" && kr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Tp(e, t, r, n) {
  var i = "", s = e.tag, a, o, c;
  for (a = 0, o = r.length; a < o; a += 1)
    c = r[a], e.replacer && (c = e.replacer.call(r, String(a), c)), (kr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && kr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += iu(e, t)), e.dump && Us === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = s, e.dump = i || "[]";
}
function oT(e, t, r) {
  var n = "", i = e.tag, s = Object.keys(r), a, o, c, u, l;
  for (a = 0, o = s.length; a < o; a += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = s[a], u = r[c], e.replacer && (u = e.replacer.call(r, c, u)), kr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), kr(e, t, u, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function cT(e, t, r, n) {
  var i = "", s = e.tag, a = Object.keys(r), o, c, u, l, f, p;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new sa("sortKeys must be a boolean or a function");
  for (o = 0, c = a.length; o < c; o += 1)
    p = "", (!n || i !== "") && (p += iu(e, t)), u = a[o], l = r[u], e.replacer && (l = e.replacer.call(r, u, l)), kr(e, t + 1, u, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Us === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, f && (p += iu(e, t)), kr(e, t + 1, l, !0, f) && (e.dump && Us === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p));
  e.tag = s, e.dump = i || "{}";
}
function Rp(e, t, r) {
  var n, i, s, a, o, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, s = 0, a = i.length; s < a; s += 1)
    if (o = i[s], (o.instanceOf || o.predicate) && (!o.instanceOf || typeof t == "object" && t instanceof o.instanceOf) && (!o.predicate || o.predicate(t))) {
      if (r ? o.multi && o.representName ? e.tag = o.representName(t) : e.tag = o.tag : e.tag = "?", o.represent) {
        if (c = e.styleMap[o.tag] || o.defaultStyle, V0.call(o.represent) === "[object Function]")
          n = o.represent(t, c);
        else if (q0.call(o.represent, c))
          n = o.represent[c](t, c);
        else
          throw new sa("!<" + o.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function kr(e, t, r, n, i, s, a) {
  e.tag = null, e.dump = r, Rp(e, r, !1) || Rp(e, r, !0);
  var o = V0.call(e.dump), c = n, u;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = o === "[object Object]" || o === "[object Array]", f, p;
  if (l && (f = e.duplicates.indexOf(r), p = f !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && t > 0) && (i = !1), p && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (l && p && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), o === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (cT(e, t, e.dump, i), p && (e.dump = "&ref_" + f + e.dump)) : (oT(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
    else if (o === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? Tp(e, t - 1, e.dump, i) : Tp(e, t, e.dump, i), p && (e.dump = "&ref_" + f + e.dump)) : (aT(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
    else if (o === "[object String]")
      e.tag !== "?" && nT(e, e.dump, t, s, c);
    else {
      if (o === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new sa("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (u = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? u = "!" + u : u.slice(0, 18) === "tag:yaml.org,2002:" ? u = "!!" + u.slice(18) : u = "!<" + u + ">", e.dump = u + " " + e.dump);
  }
  return !0;
}
function lT(e, t) {
  var r = [], n = [], i, s;
  for (au(e, r, n), i = 0, s = n.length; i < s; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(s);
}
function au(e, t, r) {
  var n, i, s;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, s = e.length; i < s; i += 1)
        au(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1)
        au(e[n[i]], t, r);
}
function uT(e, t) {
  t = t || {};
  var r = new Q1(t);
  r.noRefs || lT(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), kr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
x0.dump = uT;
var Q0 = Ku, fT = x0;
function Zu(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Xe.Type = gt;
Xe.Schema = u0;
Xe.FAILSAFE_SCHEMA = p0;
Xe.JSON_SCHEMA = _0;
Xe.CORE_SCHEMA = E0;
Xe.DEFAULT_SCHEMA = Yu;
Xe.load = Q0.load;
Xe.loadAll = Q0.loadAll;
Xe.dump = fT.dump;
Xe.YAMLException = ia;
Xe.types = {
  binary: T0,
  float: v0,
  map: h0,
  null: m0,
  pairs: N0,
  set: O0,
  timestamp: S0,
  bool: y0,
  int: g0,
  merge: P0,
  omap: R0,
  seq: d0,
  str: f0
};
Xe.safeLoad = Zu("safeLoad", "load");
Xe.safeLoadAll = Zu("safeLoadAll", "loadAll");
Xe.safeDump = Zu("safeDump", "dump");
var nc = {};
Object.defineProperty(nc, "__esModule", { value: !0 });
nc.Lazy = void 0;
class dT {
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
nc.Lazy = dT;
var ou = { exports: {} };
const hT = "2.0.0", Z0 = 256, pT = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, mT = 16, yT = Z0 - 6, gT = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ic = {
  MAX_LENGTH: Z0,
  MAX_SAFE_COMPONENT_LENGTH: mT,
  MAX_SAFE_BUILD_LENGTH: yT,
  MAX_SAFE_INTEGER: pT,
  RELEASE_TYPES: gT,
  SEMVER_SPEC_VERSION: hT,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const $T = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var sc = $T;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = ic, s = sc;
  t = e.exports = {};
  const a = t.re = [], o = t.safeRe = [], c = t.src = [], u = t.safeSrc = [], l = t.t = {};
  let f = 0;
  const p = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [p, n]
  ], _ = (v) => {
    for (const [y, w] of h)
      v = v.split(`${y}*`).join(`${y}{0,${w}}`).split(`${y}+`).join(`${y}{1,${w}}`);
    return v;
  }, m = (v, y, w) => {
    const R = _(y), C = f++;
    s(v, C, y), l[v] = C, c[C] = y, u[C] = R, a[C] = new RegExp(y, w ? "g" : void 0), o[C] = new RegExp(R, w ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), m("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${p}+`), m("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), m("FULL", `^${c[l.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), m("LOOSE", `^${c[l.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), m("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), m("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", c[l.COERCE], !0), m("COERCERTLFULL", c[l.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ou, ou.exports);
var aa = ou.exports;
const vT = Object.freeze({ loose: !0 }), _T = Object.freeze({}), ET = (e) => e ? typeof e != "object" ? vT : e : _T;
var ef = ET;
const Np = /^[0-9]+$/, e$ = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Np.test(e), n = Np.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, wT = (e, t) => e$(t, e);
var t$ = {
  compareIdentifiers: e$,
  rcompareIdentifiers: wT
};
const Ia = sc, { MAX_LENGTH: Op, MAX_SAFE_INTEGER: Ca } = ic, { safeRe: Da, t: ka } = aa, bT = ef, { compareIdentifiers: nl } = t$;
let ST = class cr {
  constructor(t, r) {
    if (r = bT(r), t instanceof cr) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Op)
      throw new TypeError(
        `version is longer than ${Op} characters`
      );
    Ia("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Da[ka.LOOSE] : Da[ka.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Ca || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ca || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ca || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < Ca)
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
    if (Ia("SemVer.compare", this.version, this.options, t), !(t instanceof cr)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new cr(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof cr || (t = new cr(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof cr || (t = new cr(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Ia("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return nl(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof cr || (t = new cr(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Ia("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return nl(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Da[ka.PRERELEASELOOSE] : Da[ka.PRERELEASE]);
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
          n === !1 && (s = [r]), nl(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var $t = ST;
const Ap = $t, PT = (e, t, r = !1) => {
  if (e instanceof Ap)
    return e;
  try {
    return new Ap(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var xi = PT;
const TT = xi, RT = (e, t) => {
  const r = TT(e, t);
  return r ? r.version : null;
};
var NT = RT;
const OT = xi, AT = (e, t) => {
  const r = OT(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var IT = AT;
const Ip = $t, CT = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Ip(
      e instanceof Ip ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var DT = CT;
const Cp = xi, kT = (e, t) => {
  const r = Cp(e, null, !0), n = Cp(t, null, !0), i = r.compare(n);
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
var LT = kT;
const FT = $t, jT = (e, t) => new FT(e, t).major;
var UT = jT;
const MT = $t, xT = (e, t) => new MT(e, t).minor;
var VT = xT;
const qT = $t, BT = (e, t) => new qT(e, t).patch;
var GT = BT;
const HT = xi, zT = (e, t) => {
  const r = HT(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var KT = zT;
const Dp = $t, WT = (e, t, r) => new Dp(e, r).compare(new Dp(t, r));
var rr = WT;
const YT = rr, XT = (e, t, r) => YT(t, e, r);
var JT = XT;
const QT = rr, ZT = (e, t) => QT(e, t, !0);
var eR = ZT;
const kp = $t, tR = (e, t, r) => {
  const n = new kp(e, r), i = new kp(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var tf = tR;
const rR = tf, nR = (e, t) => e.sort((r, n) => rR(r, n, t));
var iR = nR;
const sR = tf, aR = (e, t) => e.sort((r, n) => sR(n, r, t));
var oR = aR;
const cR = rr, lR = (e, t, r) => cR(e, t, r) > 0;
var ac = lR;
const uR = rr, fR = (e, t, r) => uR(e, t, r) < 0;
var rf = fR;
const dR = rr, hR = (e, t, r) => dR(e, t, r) === 0;
var r$ = hR;
const pR = rr, mR = (e, t, r) => pR(e, t, r) !== 0;
var n$ = mR;
const yR = rr, gR = (e, t, r) => yR(e, t, r) >= 0;
var nf = gR;
const $R = rr, vR = (e, t, r) => $R(e, t, r) <= 0;
var sf = vR;
const _R = r$, ER = n$, wR = ac, bR = nf, SR = rf, PR = sf, TR = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return _R(e, r, n);
    case "!=":
      return ER(e, r, n);
    case ">":
      return wR(e, r, n);
    case ">=":
      return bR(e, r, n);
    case "<":
      return SR(e, r, n);
    case "<=":
      return PR(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var i$ = TR;
const RR = $t, NR = xi, { safeRe: La, t: Fa } = aa, OR = (e, t) => {
  if (e instanceof RR)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? La[Fa.COERCEFULL] : La[Fa.COERCE]);
  else {
    const c = t.includePrerelease ? La[Fa.COERCERTLFULL] : La[Fa.COERCERTL];
    let u;
    for (; (u = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), c.lastIndex = u.index + u[1].length + u[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return NR(`${n}.${i}.${s}${a}${o}`, t);
};
var AR = OR;
let IR = class {
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
var CR = IR, il, Lp;
function nr() {
  if (Lp) return il;
  Lp = 1;
  const e = /\s+/g;
  class t {
    constructor(D, x) {
      if (x = i(x), D instanceof t)
        return D.loose === !!x.loose && D.includePrerelease === !!x.includePrerelease ? D : new t(D.raw, x);
      if (D instanceof s)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = x, this.loose = !!x.loose, this.includePrerelease = !!x.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((F) => this.parseRange(F.trim())).filter((F) => F.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const F = this.set[0];
        if (this.set = this.set.filter((V) => !m(V[0])), this.set.length === 0)
          this.set = [F];
        else if (this.set.length > 1) {
          for (const V of this.set)
            if (V.length === 1 && v(V[0])) {
              this.set = [V];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const x = this.set[D];
          for (let F = 0; F < x.length; F++)
            F > 0 && (this.formatted += " "), this.formatted += x[F].toString().trim();
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
    parseRange(D) {
      const F = ((this.options.includePrerelease && h) | (this.options.loose && _)) + ":" + D, V = n.get(F);
      if (V)
        return V;
      const U = this.options.loose, O = U ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
      D = D.replace(O, G(this.options.includePrerelease)), a("hyphen replace", D), D = D.replace(c[u.COMPARATORTRIM], l), a("comparator trim", D), D = D.replace(c[u.TILDETRIM], f), a("tilde trim", D), D = D.replace(c[u.CARETTRIM], p), a("caret trim", D);
      let b = D.split(" ").map(($) => w($, this.options)).join(" ").split(/\s+/).map(($) => B($, this.options));
      U && (b = b.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(c[u.COMPARATORLOOSE])))), a("range list", b);
      const P = /* @__PURE__ */ new Map(), S = b.map(($) => new s($, this.options));
      for (const $ of S) {
        if (m($))
          return [$];
        P.set($.value, $);
      }
      P.size > 1 && P.has("") && P.delete("");
      const d = [...P.values()];
      return n.set(F, d), d;
    }
    intersects(D, x) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((F) => y(F, x) && D.set.some((V) => y(V, x) && F.every((U) => V.every((O) => U.intersects(O, x)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new o(D, this.options);
        } catch {
          return !1;
        }
      for (let x = 0; x < this.set.length; x++)
        if (J(this.set[x], D, this.options))
          return !0;
      return !1;
    }
  }
  il = t;
  const r = CR, n = new r(), i = ef, s = oc(), a = sc, o = $t, {
    safeRe: c,
    t: u,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: p
  } = aa, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: _ } = ic, m = (k) => k.value === "<0.0.0-0", v = (k) => k.value === "", y = (k, D) => {
    let x = !0;
    const F = k.slice();
    let V = F.pop();
    for (; x && F.length; )
      x = F.every((U) => V.intersects(U, D)), V = F.pop();
    return x;
  }, w = (k, D) => (k = k.replace(c[u.BUILD], ""), a("comp", k, D), k = H(k, D), a("caret", k), k = C(k, D), a("tildes", k), k = he(k, D), a("xrange", k), k = Q(k, D), a("stars", k), k), R = (k) => !k || k.toLowerCase() === "x" || k === "*", C = (k, D) => k.trim().split(/\s+/).map((x) => M(x, D)).join(" "), M = (k, D) => {
    const x = D.loose ? c[u.TILDELOOSE] : c[u.TILDE];
    return k.replace(x, (F, V, U, O, b) => {
      a("tilde", k, F, V, U, O, b);
      let P;
      return R(V) ? P = "" : R(U) ? P = `>=${V}.0.0 <${+V + 1}.0.0-0` : R(O) ? P = `>=${V}.${U}.0 <${V}.${+U + 1}.0-0` : b ? (a("replaceTilde pr", b), P = `>=${V}.${U}.${O}-${b} <${V}.${+U + 1}.0-0`) : P = `>=${V}.${U}.${O} <${V}.${+U + 1}.0-0`, a("tilde return", P), P;
    });
  }, H = (k, D) => k.trim().split(/\s+/).map((x) => z(x, D)).join(" "), z = (k, D) => {
    a("caret", k, D);
    const x = D.loose ? c[u.CARETLOOSE] : c[u.CARET], F = D.includePrerelease ? "-0" : "";
    return k.replace(x, (V, U, O, b, P) => {
      a("caret", k, V, U, O, b, P);
      let S;
      return R(U) ? S = "" : R(O) ? S = `>=${U}.0.0${F} <${+U + 1}.0.0-0` : R(b) ? U === "0" ? S = `>=${U}.${O}.0${F} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.0${F} <${+U + 1}.0.0-0` : P ? (a("replaceCaret pr", P), U === "0" ? O === "0" ? S = `>=${U}.${O}.${b}-${P} <${U}.${O}.${+b + 1}-0` : S = `>=${U}.${O}.${b}-${P} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.${b}-${P} <${+U + 1}.0.0-0`) : (a("no pr"), U === "0" ? O === "0" ? S = `>=${U}.${O}.${b}${F} <${U}.${O}.${+b + 1}-0` : S = `>=${U}.${O}.${b}${F} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.${b} <${+U + 1}.0.0-0`), a("caret return", S), S;
    });
  }, he = (k, D) => (a("replaceXRanges", k, D), k.split(/\s+/).map((x) => I(x, D)).join(" ")), I = (k, D) => {
    k = k.trim();
    const x = D.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
    return k.replace(x, (F, V, U, O, b, P) => {
      a("xRange", k, F, V, U, O, b, P);
      const S = R(U), d = S || R(O), $ = d || R(b), N = $;
      return V === "=" && N && (V = ""), P = D.includePrerelease ? "-0" : "", S ? V === ">" || V === "<" ? F = "<0.0.0-0" : F = "*" : V && N ? (d && (O = 0), b = 0, V === ">" ? (V = ">=", d ? (U = +U + 1, O = 0, b = 0) : (O = +O + 1, b = 0)) : V === "<=" && (V = "<", d ? U = +U + 1 : O = +O + 1), V === "<" && (P = "-0"), F = `${V + U}.${O}.${b}${P}`) : d ? F = `>=${U}.0.0${P} <${+U + 1}.0.0-0` : $ && (F = `>=${U}.${O}.0${P} <${U}.${+O + 1}.0-0`), a("xRange return", F), F;
    });
  }, Q = (k, D) => (a("replaceStars", k, D), k.trim().replace(c[u.STAR], "")), B = (k, D) => (a("replaceGTE0", k, D), k.trim().replace(c[D.includePrerelease ? u.GTE0PRE : u.GTE0], "")), G = (k) => (D, x, F, V, U, O, b, P, S, d, $, N) => (R(F) ? x = "" : R(V) ? x = `>=${F}.0.0${k ? "-0" : ""}` : R(U) ? x = `>=${F}.${V}.0${k ? "-0" : ""}` : O ? x = `>=${x}` : x = `>=${x}${k ? "-0" : ""}`, R(S) ? P = "" : R(d) ? P = `<${+S + 1}.0.0-0` : R($) ? P = `<${S}.${+d + 1}.0-0` : N ? P = `<=${S}.${d}.${$}-${N}` : k ? P = `<${S}.${d}.${+$ + 1}-0` : P = `<=${P}`, `${x} ${P}`.trim()), J = (k, D, x) => {
    for (let F = 0; F < k.length; F++)
      if (!k[F].test(D))
        return !1;
    if (D.prerelease.length && !x.includePrerelease) {
      for (let F = 0; F < k.length; F++)
        if (a(k[F].semver), k[F].semver !== s.ANY && k[F].semver.prerelease.length > 0) {
          const V = k[F].semver;
          if (V.major === D.major && V.minor === D.minor && V.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return il;
}
var sl, Fp;
function oc() {
  if (Fp) return sl;
  Fp = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, f) {
      if (f = r(f), l instanceof t) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], p = l.match(f);
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
    intersects(l, f) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  sl = t;
  const r = ef, { safeRe: n, t: i } = aa, s = i$, a = sc, o = $t, c = nr();
  return sl;
}
const DR = nr(), kR = (e, t, r) => {
  try {
    t = new DR(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var cc = kR;
const LR = nr(), FR = (e, t) => new LR(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var jR = FR;
const UR = $t, MR = nr(), xR = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new MR(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new UR(n, r));
  }), n;
};
var VR = xR;
const qR = $t, BR = nr(), GR = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new BR(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new qR(n, r));
  }), n;
};
var HR = GR;
const al = $t, zR = nr(), jp = ac, KR = (e, t) => {
  e = new zR(e, t);
  let r = new al("0.0.0");
  if (e.test(r) || (r = new al("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((a) => {
      const o = new al(a.semver.version);
      switch (a.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!s || jp(o, s)) && (s = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), s && (!r || jp(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var WR = KR;
const YR = nr(), XR = (e, t) => {
  try {
    return new YR(e, t).range || "*";
  } catch {
    return null;
  }
};
var JR = XR;
const QR = $t, s$ = oc(), { ANY: ZR } = s$, eN = nr(), tN = cc, Up = ac, Mp = rf, rN = sf, nN = nf, iN = (e, t, r, n) => {
  e = new QR(e, n), t = new eN(t, n);
  let i, s, a, o, c;
  switch (r) {
    case ">":
      i = Up, s = rN, a = Mp, o = ">", c = ">=";
      break;
    case "<":
      i = Mp, s = nN, a = Up, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (tN(e, t, n))
    return !1;
  for (let u = 0; u < t.set.length; ++u) {
    const l = t.set[u];
    let f = null, p = null;
    if (l.forEach((h) => {
      h.semver === ZR && (h = new s$(">=0.0.0")), f = f || h, p = p || h, i(h.semver, f.semver, n) ? f = h : a(h.semver, p.semver, n) && (p = h);
    }), f.operator === o || f.operator === c || (!p.operator || p.operator === o) && s(e, p.semver))
      return !1;
    if (p.operator === c && a(e, p.semver))
      return !1;
  }
  return !0;
};
var af = iN;
const sN = af, aN = (e, t, r) => sN(e, t, ">", r);
var oN = aN;
const cN = af, lN = (e, t, r) => cN(e, t, "<", r);
var uN = lN;
const xp = nr(), fN = (e, t, r) => (e = new xp(e, r), t = new xp(t, r), e.intersects(t, r));
var dN = fN;
const hN = cc, pN = rr;
var mN = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const a = e.sort((l, f) => pN(l, f, r));
  for (const l of a)
    hN(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const o = [];
  for (const [l, f] of n)
    l === f ? o.push(l) : !f && l === a[0] ? o.push("*") : f ? l === a[0] ? o.push(`<=${f}`) : o.push(`${l} - ${f}`) : o.push(`>=${l}`);
  const c = o.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < u.length ? c : t;
};
const Vp = nr(), of = oc(), { ANY: ol } = of, is = cc, cf = rr, yN = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Vp(e, r), t = new Vp(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const a = $N(i, s, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, gN = [new of(">=0.0.0-0")], qp = [new of(">=0.0.0")], $N = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ol) {
    if (t.length === 1 && t[0].semver === ol)
      return !0;
    r.includePrerelease ? e = gN : e = qp;
  }
  if (t.length === 1 && t[0].semver === ol) {
    if (r.includePrerelease)
      return !0;
    t = qp;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Bp(i, h, r) : h.operator === "<" || h.operator === "<=" ? s = Gp(s, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && s) {
    if (a = cf(i.semver, s.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !is(h, String(i), r) || s && !is(h, String(s), r))
      return null;
    for (const _ of t)
      if (!is(h, String(_), r))
        return !1;
    return !0;
  }
  let o, c, u, l, f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, p = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", u = u || h.operator === "<" || h.operator === "<=", i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (o = Bp(i, h, r), o === h && o !== i)
          return !1;
      } else if (i.operator === ">=" && !is(i.semver, String(h), r))
        return !1;
    }
    if (s) {
      if (f && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === f.major && h.semver.minor === f.minor && h.semver.patch === f.patch && (f = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Gp(s, h, r), c === h && c !== s)
          return !1;
      } else if (s.operator === "<=" && !is(s.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (s || i) && a !== 0)
      return !1;
  }
  return !(i && u && !s && a !== 0 || s && l && !i && a !== 0 || p || f);
}, Bp = (e, t, r) => {
  if (!e)
    return t;
  const n = cf(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Gp = (e, t, r) => {
  if (!e)
    return t;
  const n = cf(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var vN = yN;
const cl = aa, Hp = ic, _N = $t, zp = t$, EN = xi, wN = NT, bN = IT, SN = DT, PN = LT, TN = UT, RN = VT, NN = GT, ON = KT, AN = rr, IN = JT, CN = eR, DN = tf, kN = iR, LN = oR, FN = ac, jN = rf, UN = r$, MN = n$, xN = nf, VN = sf, qN = i$, BN = AR, GN = oc(), HN = nr(), zN = cc, KN = jR, WN = VR, YN = HR, XN = WR, JN = JR, QN = af, ZN = oN, eO = uN, tO = dN, rO = mN, nO = vN;
var a$ = {
  parse: EN,
  valid: wN,
  clean: bN,
  inc: SN,
  diff: PN,
  major: TN,
  minor: RN,
  patch: NN,
  prerelease: ON,
  compare: AN,
  rcompare: IN,
  compareLoose: CN,
  compareBuild: DN,
  sort: kN,
  rsort: LN,
  gt: FN,
  lt: jN,
  eq: UN,
  neq: MN,
  gte: xN,
  lte: VN,
  cmp: qN,
  coerce: BN,
  Comparator: GN,
  Range: HN,
  satisfies: zN,
  toComparators: KN,
  maxSatisfying: WN,
  minSatisfying: YN,
  minVersion: XN,
  validRange: JN,
  outside: QN,
  gtr: ZN,
  ltr: eO,
  intersects: tO,
  simplifyRange: rO,
  subset: nO,
  SemVer: _N,
  re: cl.re,
  src: cl.src,
  tokens: cl.t,
  SEMVER_SPEC_VERSION: Hp.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Hp.RELEASE_TYPES,
  compareIdentifiers: zp.compareIdentifiers,
  rcompareIdentifiers: zp.rcompareIdentifiers
}, oa = {}, Lo = { exports: {} };
Lo.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, s = 2, a = 9007199254740991, o = "[object Arguments]", c = "[object Array]", u = "[object AsyncFunction]", l = "[object Boolean]", f = "[object Date]", p = "[object Error]", h = "[object Function]", _ = "[object GeneratorFunction]", m = "[object Map]", v = "[object Number]", y = "[object Null]", w = "[object Object]", R = "[object Promise]", C = "[object Proxy]", M = "[object RegExp]", H = "[object Set]", z = "[object String]", he = "[object Symbol]", I = "[object Undefined]", Q = "[object WeakMap]", B = "[object ArrayBuffer]", G = "[object DataView]", J = "[object Float32Array]", k = "[object Float64Array]", D = "[object Int8Array]", x = "[object Int16Array]", F = "[object Int32Array]", V = "[object Uint8Array]", U = "[object Uint8ClampedArray]", O = "[object Uint16Array]", b = "[object Uint32Array]", P = /[\\^$.*+?()[\]{}|]/g, S = /^\[object .+?Constructor\]$/, d = /^(?:0|[1-9]\d*)$/, $ = {};
  $[J] = $[k] = $[D] = $[x] = $[F] = $[V] = $[U] = $[O] = $[b] = !0, $[o] = $[c] = $[B] = $[l] = $[G] = $[f] = $[p] = $[h] = $[m] = $[v] = $[w] = $[M] = $[H] = $[z] = $[Q] = !1;
  var N = typeof dt == "object" && dt && dt.Object === Object && dt, E = typeof self == "object" && self && self.Object === Object && self, g = N || E || Function("return this")(), j = t && !t.nodeType && t, A = j && !0 && e && !e.nodeType && e, W = A && A.exports === j, de = W && N.process, ge = function() {
    try {
      return de && de.binding && de.binding("util");
    } catch {
    }
  }(), we = ge && ge.isTypedArray;
  function Te(T, L) {
    for (var q = -1, X = T == null ? 0 : T.length, be = 0, ce = []; ++q < X; ) {
      var Ce = T[q];
      L(Ce, q, T) && (ce[be++] = Ce);
    }
    return ce;
  }
  function Je(T, L) {
    for (var q = -1, X = L.length, be = T.length; ++q < X; )
      T[be + q] = L[q];
    return T;
  }
  function $e(T, L) {
    for (var q = -1, X = T == null ? 0 : T.length; ++q < X; )
      if (L(T[q], q, T))
        return !0;
    return !1;
  }
  function je(T, L) {
    for (var q = -1, X = Array(T); ++q < T; )
      X[q] = L(q);
    return X;
  }
  function Vt(T) {
    return function(L) {
      return T(L);
    };
  }
  function Dt(T, L) {
    return T.has(L);
  }
  function Rt(T, L) {
    return T == null ? void 0 : T[L];
  }
  function kt(T) {
    var L = -1, q = Array(T.size);
    return T.forEach(function(X, be) {
      q[++L] = [be, X];
    }), q;
  }
  function _r(T, L) {
    return function(q) {
      return T(L(q));
    };
  }
  function Er(T) {
    var L = -1, q = Array(T.size);
    return T.forEach(function(X) {
      q[++L] = X;
    }), q;
  }
  var wr = Array.prototype, Nt = Function.prototype, Lt = Object.prototype, br = g["__core-js_shared__"], Ur = Nt.toString, _t = Lt.hasOwnProperty, mh = function() {
    var T = /[^.]+$/.exec(br && br.keys && br.keys.IE_PROTO || "");
    return T ? "Symbol(src)_1." + T : "";
  }(), yh = Lt.toString, D_ = RegExp(
    "^" + Ur.call(_t).replace(P, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), gh = W ? g.Buffer : void 0, $a = g.Symbol, $h = g.Uint8Array, vh = Lt.propertyIsEnumerable, k_ = wr.splice, _n = $a ? $a.toStringTag : void 0, _h = Object.getOwnPropertySymbols, L_ = gh ? gh.isBuffer : void 0, F_ = _r(Object.keys, Object), Uc = Zn(g, "DataView"), Zi = Zn(g, "Map"), Mc = Zn(g, "Promise"), xc = Zn(g, "Set"), Vc = Zn(g, "WeakMap"), es = Zn(Object, "create"), j_ = bn(Uc), U_ = bn(Zi), M_ = bn(Mc), x_ = bn(xc), V_ = bn(Vc), Eh = $a ? $a.prototype : void 0, qc = Eh ? Eh.valueOf : void 0;
  function En(T) {
    var L = -1, q = T == null ? 0 : T.length;
    for (this.clear(); ++L < q; ) {
      var X = T[L];
      this.set(X[0], X[1]);
    }
  }
  function q_() {
    this.__data__ = es ? es(null) : {}, this.size = 0;
  }
  function B_(T) {
    var L = this.has(T) && delete this.__data__[T];
    return this.size -= L ? 1 : 0, L;
  }
  function G_(T) {
    var L = this.__data__;
    if (es) {
      var q = L[T];
      return q === n ? void 0 : q;
    }
    return _t.call(L, T) ? L[T] : void 0;
  }
  function H_(T) {
    var L = this.__data__;
    return es ? L[T] !== void 0 : _t.call(L, T);
  }
  function z_(T, L) {
    var q = this.__data__;
    return this.size += this.has(T) ? 0 : 1, q[T] = es && L === void 0 ? n : L, this;
  }
  En.prototype.clear = q_, En.prototype.delete = B_, En.prototype.get = G_, En.prototype.has = H_, En.prototype.set = z_;
  function Sr(T) {
    var L = -1, q = T == null ? 0 : T.length;
    for (this.clear(); ++L < q; ) {
      var X = T[L];
      this.set(X[0], X[1]);
    }
  }
  function K_() {
    this.__data__ = [], this.size = 0;
  }
  function W_(T) {
    var L = this.__data__, q = _a(L, T);
    if (q < 0)
      return !1;
    var X = L.length - 1;
    return q == X ? L.pop() : k_.call(L, q, 1), --this.size, !0;
  }
  function Y_(T) {
    var L = this.__data__, q = _a(L, T);
    return q < 0 ? void 0 : L[q][1];
  }
  function X_(T) {
    return _a(this.__data__, T) > -1;
  }
  function J_(T, L) {
    var q = this.__data__, X = _a(q, T);
    return X < 0 ? (++this.size, q.push([T, L])) : q[X][1] = L, this;
  }
  Sr.prototype.clear = K_, Sr.prototype.delete = W_, Sr.prototype.get = Y_, Sr.prototype.has = X_, Sr.prototype.set = J_;
  function wn(T) {
    var L = -1, q = T == null ? 0 : T.length;
    for (this.clear(); ++L < q; ) {
      var X = T[L];
      this.set(X[0], X[1]);
    }
  }
  function Q_() {
    this.size = 0, this.__data__ = {
      hash: new En(),
      map: new (Zi || Sr)(),
      string: new En()
    };
  }
  function Z_(T) {
    var L = Ea(this, T).delete(T);
    return this.size -= L ? 1 : 0, L;
  }
  function eE(T) {
    return Ea(this, T).get(T);
  }
  function tE(T) {
    return Ea(this, T).has(T);
  }
  function rE(T, L) {
    var q = Ea(this, T), X = q.size;
    return q.set(T, L), this.size += q.size == X ? 0 : 1, this;
  }
  wn.prototype.clear = Q_, wn.prototype.delete = Z_, wn.prototype.get = eE, wn.prototype.has = tE, wn.prototype.set = rE;
  function va(T) {
    var L = -1, q = T == null ? 0 : T.length;
    for (this.__data__ = new wn(); ++L < q; )
      this.add(T[L]);
  }
  function nE(T) {
    return this.__data__.set(T, n), this;
  }
  function iE(T) {
    return this.__data__.has(T);
  }
  va.prototype.add = va.prototype.push = nE, va.prototype.has = iE;
  function Mr(T) {
    var L = this.__data__ = new Sr(T);
    this.size = L.size;
  }
  function sE() {
    this.__data__ = new Sr(), this.size = 0;
  }
  function aE(T) {
    var L = this.__data__, q = L.delete(T);
    return this.size = L.size, q;
  }
  function oE(T) {
    return this.__data__.get(T);
  }
  function cE(T) {
    return this.__data__.has(T);
  }
  function lE(T, L) {
    var q = this.__data__;
    if (q instanceof Sr) {
      var X = q.__data__;
      if (!Zi || X.length < r - 1)
        return X.push([T, L]), this.size = ++q.size, this;
      q = this.__data__ = new wn(X);
    }
    return q.set(T, L), this.size = q.size, this;
  }
  Mr.prototype.clear = sE, Mr.prototype.delete = aE, Mr.prototype.get = oE, Mr.prototype.has = cE, Mr.prototype.set = lE;
  function uE(T, L) {
    var q = wa(T), X = !q && PE(T), be = !q && !X && Bc(T), ce = !q && !X && !be && Ah(T), Ce = q || X || be || ce, Ve = Ce ? je(T.length, String) : [], Ge = Ve.length;
    for (var Ne in T)
      _t.call(T, Ne) && !(Ce && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Ne == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      be && (Ne == "offset" || Ne == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ce && (Ne == "buffer" || Ne == "byteLength" || Ne == "byteOffset") || // Skip index properties.
      _E(Ne, Ge))) && Ve.push(Ne);
    return Ve;
  }
  function _a(T, L) {
    for (var q = T.length; q--; )
      if (Th(T[q][0], L))
        return q;
    return -1;
  }
  function fE(T, L, q) {
    var X = L(T);
    return wa(T) ? X : Je(X, q(T));
  }
  function ts(T) {
    return T == null ? T === void 0 ? I : y : _n && _n in Object(T) ? $E(T) : SE(T);
  }
  function wh(T) {
    return rs(T) && ts(T) == o;
  }
  function bh(T, L, q, X, be) {
    return T === L ? !0 : T == null || L == null || !rs(T) && !rs(L) ? T !== T && L !== L : dE(T, L, q, X, bh, be);
  }
  function dE(T, L, q, X, be, ce) {
    var Ce = wa(T), Ve = wa(L), Ge = Ce ? c : xr(T), Ne = Ve ? c : xr(L);
    Ge = Ge == o ? w : Ge, Ne = Ne == o ? w : Ne;
    var Ot = Ge == w, qt = Ne == w, Qe = Ge == Ne;
    if (Qe && Bc(T)) {
      if (!Bc(L))
        return !1;
      Ce = !0, Ot = !1;
    }
    if (Qe && !Ot)
      return ce || (ce = new Mr()), Ce || Ah(T) ? Sh(T, L, q, X, be, ce) : yE(T, L, Ge, q, X, be, ce);
    if (!(q & i)) {
      var Ft = Ot && _t.call(T, "__wrapped__"), jt = qt && _t.call(L, "__wrapped__");
      if (Ft || jt) {
        var Vr = Ft ? T.value() : T, Pr = jt ? L.value() : L;
        return ce || (ce = new Mr()), be(Vr, Pr, q, X, ce);
      }
    }
    return Qe ? (ce || (ce = new Mr()), gE(T, L, q, X, be, ce)) : !1;
  }
  function hE(T) {
    if (!Oh(T) || wE(T))
      return !1;
    var L = Rh(T) ? D_ : S;
    return L.test(bn(T));
  }
  function pE(T) {
    return rs(T) && Nh(T.length) && !!$[ts(T)];
  }
  function mE(T) {
    if (!bE(T))
      return F_(T);
    var L = [];
    for (var q in Object(T))
      _t.call(T, q) && q != "constructor" && L.push(q);
    return L;
  }
  function Sh(T, L, q, X, be, ce) {
    var Ce = q & i, Ve = T.length, Ge = L.length;
    if (Ve != Ge && !(Ce && Ge > Ve))
      return !1;
    var Ne = ce.get(T);
    if (Ne && ce.get(L))
      return Ne == L;
    var Ot = -1, qt = !0, Qe = q & s ? new va() : void 0;
    for (ce.set(T, L), ce.set(L, T); ++Ot < Ve; ) {
      var Ft = T[Ot], jt = L[Ot];
      if (X)
        var Vr = Ce ? X(jt, Ft, Ot, L, T, ce) : X(Ft, jt, Ot, T, L, ce);
      if (Vr !== void 0) {
        if (Vr)
          continue;
        qt = !1;
        break;
      }
      if (Qe) {
        if (!$e(L, function(Pr, Sn) {
          if (!Dt(Qe, Sn) && (Ft === Pr || be(Ft, Pr, q, X, ce)))
            return Qe.push(Sn);
        })) {
          qt = !1;
          break;
        }
      } else if (!(Ft === jt || be(Ft, jt, q, X, ce))) {
        qt = !1;
        break;
      }
    }
    return ce.delete(T), ce.delete(L), qt;
  }
  function yE(T, L, q, X, be, ce, Ce) {
    switch (q) {
      case G:
        if (T.byteLength != L.byteLength || T.byteOffset != L.byteOffset)
          return !1;
        T = T.buffer, L = L.buffer;
      case B:
        return !(T.byteLength != L.byteLength || !ce(new $h(T), new $h(L)));
      case l:
      case f:
      case v:
        return Th(+T, +L);
      case p:
        return T.name == L.name && T.message == L.message;
      case M:
      case z:
        return T == L + "";
      case m:
        var Ve = kt;
      case H:
        var Ge = X & i;
        if (Ve || (Ve = Er), T.size != L.size && !Ge)
          return !1;
        var Ne = Ce.get(T);
        if (Ne)
          return Ne == L;
        X |= s, Ce.set(T, L);
        var Ot = Sh(Ve(T), Ve(L), X, be, ce, Ce);
        return Ce.delete(T), Ot;
      case he:
        if (qc)
          return qc.call(T) == qc.call(L);
    }
    return !1;
  }
  function gE(T, L, q, X, be, ce) {
    var Ce = q & i, Ve = Ph(T), Ge = Ve.length, Ne = Ph(L), Ot = Ne.length;
    if (Ge != Ot && !Ce)
      return !1;
    for (var qt = Ge; qt--; ) {
      var Qe = Ve[qt];
      if (!(Ce ? Qe in L : _t.call(L, Qe)))
        return !1;
    }
    var Ft = ce.get(T);
    if (Ft && ce.get(L))
      return Ft == L;
    var jt = !0;
    ce.set(T, L), ce.set(L, T);
    for (var Vr = Ce; ++qt < Ge; ) {
      Qe = Ve[qt];
      var Pr = T[Qe], Sn = L[Qe];
      if (X)
        var Ih = Ce ? X(Sn, Pr, Qe, L, T, ce) : X(Pr, Sn, Qe, T, L, ce);
      if (!(Ih === void 0 ? Pr === Sn || be(Pr, Sn, q, X, ce) : Ih)) {
        jt = !1;
        break;
      }
      Vr || (Vr = Qe == "constructor");
    }
    if (jt && !Vr) {
      var ba = T.constructor, Sa = L.constructor;
      ba != Sa && "constructor" in T && "constructor" in L && !(typeof ba == "function" && ba instanceof ba && typeof Sa == "function" && Sa instanceof Sa) && (jt = !1);
    }
    return ce.delete(T), ce.delete(L), jt;
  }
  function Ph(T) {
    return fE(T, NE, vE);
  }
  function Ea(T, L) {
    var q = T.__data__;
    return EE(L) ? q[typeof L == "string" ? "string" : "hash"] : q.map;
  }
  function Zn(T, L) {
    var q = Rt(T, L);
    return hE(q) ? q : void 0;
  }
  function $E(T) {
    var L = _t.call(T, _n), q = T[_n];
    try {
      T[_n] = void 0;
      var X = !0;
    } catch {
    }
    var be = yh.call(T);
    return X && (L ? T[_n] = q : delete T[_n]), be;
  }
  var vE = _h ? function(T) {
    return T == null ? [] : (T = Object(T), Te(_h(T), function(L) {
      return vh.call(T, L);
    }));
  } : OE, xr = ts;
  (Uc && xr(new Uc(new ArrayBuffer(1))) != G || Zi && xr(new Zi()) != m || Mc && xr(Mc.resolve()) != R || xc && xr(new xc()) != H || Vc && xr(new Vc()) != Q) && (xr = function(T) {
    var L = ts(T), q = L == w ? T.constructor : void 0, X = q ? bn(q) : "";
    if (X)
      switch (X) {
        case j_:
          return G;
        case U_:
          return m;
        case M_:
          return R;
        case x_:
          return H;
        case V_:
          return Q;
      }
    return L;
  });
  function _E(T, L) {
    return L = L ?? a, !!L && (typeof T == "number" || d.test(T)) && T > -1 && T % 1 == 0 && T < L;
  }
  function EE(T) {
    var L = typeof T;
    return L == "string" || L == "number" || L == "symbol" || L == "boolean" ? T !== "__proto__" : T === null;
  }
  function wE(T) {
    return !!mh && mh in T;
  }
  function bE(T) {
    var L = T && T.constructor, q = typeof L == "function" && L.prototype || Lt;
    return T === q;
  }
  function SE(T) {
    return yh.call(T);
  }
  function bn(T) {
    if (T != null) {
      try {
        return Ur.call(T);
      } catch {
      }
      try {
        return T + "";
      } catch {
      }
    }
    return "";
  }
  function Th(T, L) {
    return T === L || T !== T && L !== L;
  }
  var PE = wh(/* @__PURE__ */ function() {
    return arguments;
  }()) ? wh : function(T) {
    return rs(T) && _t.call(T, "callee") && !vh.call(T, "callee");
  }, wa = Array.isArray;
  function TE(T) {
    return T != null && Nh(T.length) && !Rh(T);
  }
  var Bc = L_ || AE;
  function RE(T, L) {
    return bh(T, L);
  }
  function Rh(T) {
    if (!Oh(T))
      return !1;
    var L = ts(T);
    return L == h || L == _ || L == u || L == C;
  }
  function Nh(T) {
    return typeof T == "number" && T > -1 && T % 1 == 0 && T <= a;
  }
  function Oh(T) {
    var L = typeof T;
    return T != null && (L == "object" || L == "function");
  }
  function rs(T) {
    return T != null && typeof T == "object";
  }
  var Ah = we ? Vt(we) : pE;
  function NE(T) {
    return TE(T) ? uE(T) : mE(T);
  }
  function OE() {
    return [];
  }
  function AE() {
    return !1;
  }
  e.exports = RE;
})(Lo, Lo.exports);
var iO = Lo.exports;
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.DownloadedUpdateHelper = void 0;
oa.createTempUpdateFile = lO;
const sO = Qs, aO = yn, Kp = iO, On = $n, _s = Ie;
class oO {
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
    return _s.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Kp(this.versionInfo, r) && Kp(this.fileInfo.info, n.info) && await (0, On.pathExists)(t) ? t : null;
    const s = await this.getValidCachedUpdateFile(n, i);
    return s === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = s, s);
  }
  async setDownloadedFile(t, r, n, i, s, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: s,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, On.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, On.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, On.pathExists)(n))
      return null;
    let s;
    try {
      s = await (0, On.readJson)(n);
    } catch (u) {
      let l = "No cached update info available";
      return u.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${u.message})`), r.info(l), null;
    }
    if (!((s == null ? void 0 : s.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== s.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const o = _s.join(this.cacheDirForPendingUpdate, s.fileName);
    if (!await (0, On.pathExists)(o))
      return r.info("Cached update file doesn't exist"), null;
    const c = await cO(o);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = s, o);
  }
  getUpdateInfoFile() {
    return _s.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
oa.DownloadedUpdateHelper = oO;
function cO(e, t = "sha512", r = "base64", n) {
  return new Promise((i, s) => {
    const a = (0, sO.createHash)(t);
    a.on("error", s).setEncoding(r), (0, aO.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", s).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function lO(e, t, r) {
  let n = 0, i = _s.join(t, e);
  for (let s = 0; s < 3; s++)
    try {
      return await (0, On.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = _s.join(t, `${n++}-${e}`);
    }
  return i;
}
var lc = {}, lf = {};
Object.defineProperty(lf, "__esModule", { value: !0 });
lf.getAppCacheDir = fO;
const ll = Ie, uO = Zs;
function fO() {
  const e = (0, uO.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || ll.join(e, "AppData", "Local") : process.platform === "darwin" ? t = ll.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || ll.join(e, ".cache"), t;
}
Object.defineProperty(lc, "__esModule", { value: !0 });
lc.ElectronAppAdapter = void 0;
const Wp = Ie, dO = lf;
class hO {
  constructor(t = Dr.app) {
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
    return this.isPackaged ? Wp.join(process.resourcesPath, "app-update.yml") : Wp.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, dO.getAppCacheDir)();
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
lc.ElectronAppAdapter = hO;
var o$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = xe;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Dr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(s) {
      super(), this.proxyLoginCallback = s, this.cachedSession = null;
    }
    async download(s, a, o) {
      return await o.cancellationToken.createPromise((c, u, l) => {
        const f = {
          headers: o.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(s, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: a,
          options: o,
          onCancel: l,
          callback: (p) => {
            p == null ? c(a) : u(p);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(s, a) {
      s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const o = Dr.net.request({
        ...s,
        session: this.cachedSession
      });
      return o.on("response", a), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
    }
    addRedirectHandlers(s, a, o, c, u) {
      s.on("redirect", (l, f, p) => {
        s.abort(), c > this.maxRedirects ? o(this.createMaxRedirectError()) : u(t.HttpExecutor.prepareRedirectUrlOptions(p, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(o$);
var ca = {}, ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.newBaseUrl = pO;
ir.newUrlFromBase = mO;
ir.getChannelFilename = yO;
const c$ = gn;
function pO(e) {
  const t = new c$.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function mO(e, t, r = !1) {
  const n = new c$.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function yO(e) {
  return `${e}.yml`;
}
var Fe = {}, gO = "[object Symbol]", l$ = /[\\^$.*+?()[\]{}|]/g, $O = RegExp(l$.source), vO = typeof dt == "object" && dt && dt.Object === Object && dt, _O = typeof self == "object" && self && self.Object === Object && self, EO = vO || _O || Function("return this")(), wO = Object.prototype, bO = wO.toString, Yp = EO.Symbol, Xp = Yp ? Yp.prototype : void 0, Jp = Xp ? Xp.toString : void 0;
function SO(e) {
  if (typeof e == "string")
    return e;
  if (TO(e))
    return Jp ? Jp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function PO(e) {
  return !!e && typeof e == "object";
}
function TO(e) {
  return typeof e == "symbol" || PO(e) && bO.call(e) == gO;
}
function RO(e) {
  return e == null ? "" : SO(e);
}
function NO(e) {
  return e = RO(e), e && $O.test(e) ? e.replace(l$, "\\$&") : e;
}
var u$ = NO;
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.Provider = void 0;
Fe.findFile = DO;
Fe.parseUpdateInfo = kO;
Fe.getFileList = f$;
Fe.resolveFiles = LO;
const pn = xe, OO = Xe, AO = gn, Fo = ir, IO = u$;
class CO {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const s = (0, Fo.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Fo.newUrlFromBase)(`${t.pathname.replace(new RegExp(IO(n), "g"), r)}.blockmap`, i ? new AO.URL(i) : t), s];
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
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, pn.configureRequestUrl)(t, n), n;
  }
}
Fe.Provider = CO;
function DO(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, pn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((a) => a.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), s = (n = i.find((a) => [a.url.pathname, a.info.url].some((o) => o.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return s || (r == null ? e[0] : e.find((a) => !r.some((o) => a.url.pathname.toLowerCase().endsWith(`.${o.toLowerCase()}`))));
}
function kO(e, t, r) {
  if (e == null)
    throw (0, pn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, OO.load)(e);
  } catch (i) {
    throw (0, pn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function f$(e) {
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
  throw (0, pn.newError)(`No files provided: ${(0, pn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function LO(e, t, r = (n) => n) {
  const i = f$(e).map((o) => {
    if (o.sha2 == null && o.sha512 == null)
      throw (0, pn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, pn.safeStringifyJson)(o)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Fo.newUrlFromBase)(r(o.url), t),
      info: o
    };
  }), s = e.packages, a = s == null ? null : s[process.arch] || s.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Fo.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(ca, "__esModule", { value: !0 });
ca.GenericProvider = void 0;
const Qp = xe, ul = ir, fl = Fe;
class FO extends fl.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, ul.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, ul.getChannelFilename)(this.channel), r = (0, ul.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, fl.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Qp.HttpError && i.statusCode === 404)
          throw (0, Qp.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, fl.resolveFiles)(t, this.baseUrl);
  }
}
ca.GenericProvider = FO;
var uc = {}, fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
fc.BitbucketProvider = void 0;
const Zp = xe, dl = ir, hl = Fe;
class jO extends hl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: s } = t;
    this.baseUrl = (0, dl.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${s}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Zp.CancellationToken(), r = (0, dl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, dl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, hl.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Zp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, hl.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
fc.BitbucketProvider = jO;
var mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.GitHubProvider = mn.BaseGitHubProvider = void 0;
mn.computeReleaseNotes = h$;
const Nr = xe, gi = a$, UO = gn, $i = ir, cu = Fe, pl = /\/tag\/([^/]+)$/;
class d$ extends cu.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, $i.newBaseUrl)((0, Nr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, $i.newBaseUrl)((0, Nr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
mn.BaseGitHubProvider = d$;
class MO extends d$ {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, s;
    const a = new Nr.CancellationToken(), o = await this.httpRequest((0, $i.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), c = (0, Nr.parseXml)(o);
    let u = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const v = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = gi.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (v === null)
          l = pl.exec(u.element("link").attribute("href"))[1];
        else
          for (const y of c.getElements("entry")) {
            const w = pl.exec(y.element("link").attribute("href"));
            if (w === null)
              continue;
            const R = w[1], C = ((n = gi.prerelease(R)) === null || n === void 0 ? void 0 : n[0]) || null, M = !v || ["alpha", "beta"].includes(v), H = C !== null && !["alpha", "beta"].includes(String(C));
            if (M && !H && !(v === "beta" && C === "alpha")) {
              l = R;
              break;
            }
            if (C && C === v) {
              l = R;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(a);
        for (const v of c.getElements("entry"))
          if (pl.exec(v.element("link").attribute("href"))[1] === l) {
            u = v;
            break;
          }
      }
    } catch (v) {
      throw (0, Nr.newError)(`Cannot parse releases feed: ${v.stack || v.message},
XML:
${o}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Nr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, p = "", h = "";
    const _ = async (v) => {
      p = (0, $i.getChannelFilename)(v), h = (0, $i.newUrlFromBase)(this.getBaseDownloadPath(String(l), p), this.baseUrl);
      const y = this.createRequestOptions(h);
      try {
        return await this.executor.request(y, a);
      } catch (w) {
        throw w instanceof Nr.HttpError && w.statusCode === 404 ? (0, Nr.newError)(`Cannot find ${p} in the latest release artifacts (${h}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let v = this.channel;
      this.updater.allowPrerelease && (!((i = gi.prerelease(l)) === null || i === void 0) && i[0]) && (v = this.getCustomChannelName(String((s = gi.prerelease(l)) === null || s === void 0 ? void 0 : s[0]))), f = await _(v);
    } catch (v) {
      if (this.updater.allowPrerelease)
        f = await _(this.getDefaultChannelName());
      else
        throw v;
    }
    const m = (0, cu.parseUpdateInfo)(f, p, h);
    return m.releaseName == null && (m.releaseName = u.elementValueOrEmpty("title")), m.releaseNotes == null && (m.releaseNotes = h$(this.updater.currentVersion, this.updater.fullChangelog, c, u)), {
      tag: l,
      ...m
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, $i.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new UO.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Nr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, cu.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
mn.GitHubProvider = MO;
function em(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function h$(e, t, r, n) {
  if (!t)
    return em(n);
  const i = [];
  for (const s of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
    gi.lt(e, a) && i.push({
      version: a,
      note: em(s)
    });
  }
  return i.sort((s, a) => gi.rcompare(s.version, a.version));
}
var dc = {};
Object.defineProperty(dc, "__esModule", { value: !0 });
dc.GitLabProvider = void 0;
const ot = xe, ml = gn, xO = u$, ja = ir, yl = Fe;
class VO extends yl.Provider {
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
    this.baseApiUrl = (0, ja.newBaseUrl)(`https://${s}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new ot.CancellationToken(), r = (0, ja.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const p = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, h = await this.httpRequest(r, p, t);
      if (!h)
        throw (0, ot.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(h);
    } catch (p) {
      throw (0, ot.newError)(`Unable to find latest release on GitLab (${r}): ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let s = null, a = "", o = null;
    const c = async (p) => {
      a = (0, ja.getChannelFilename)(p);
      const h = n.assets.links.find((m) => m.name === a);
      if (!h)
        throw (0, ot.newError)(`Cannot find ${a} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      o = new ml.URL(h.direct_asset_url);
      const _ = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const m = await this.httpRequest(o, _, t);
        if (!m)
          throw (0, ot.newError)(`Empty response from ${o}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return m;
      } catch (m) {
        throw m instanceof ot.HttpError && m.statusCode === 404 ? (0, ot.newError)(`Cannot find ${a} in the latest release artifacts (${o}): ${m.stack || m.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : m;
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
      throw (0, ot.newError)(`Unable to parse channel data from ${a}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const u = (0, yl.parseUpdateInfo)(s, a, o);
    u.releaseName == null && (u.releaseName = n.name), u.releaseNotes == null && (u.releaseNotes = n.description || null);
    const l = /* @__PURE__ */ new Map();
    for (const p of n.assets.links)
      l.set(this.normalizeFilename(p.name), p.direct_asset_url);
    const f = {
      tag: i,
      assets: l,
      ...u
    };
    return this.cachedLatestVersion = f, f;
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
        return new ml.URL(s);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new ot.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const s = (0, ja.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const a = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, o = await this.httpRequest(s, a, r);
        if (o)
          return JSON.parse(o);
      } catch (a) {
        if (a instanceof ot.HttpError && a.statusCode === 404)
          continue;
        throw (0, ot.newError)(`Unable to find release ${i} on GitLab (${s}): ${a.stack || a.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, ot.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
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
      const c = n.replace(new RegExp(xO(r), "g"), t);
      s = this.findBlockMapInAssets(o, c);
    }
    return [s, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const s = t.pathname.split("/").pop() || "", [a, o] = await this.findBlockMapUrlsFromAssets(r, n, s);
      if (!o)
        throw (0, ot.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!a)
        throw (0, ot.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [a, o];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, yl.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((a) => t.assets.has(a)), s = i ? t.assets.get(i) : void 0;
      if (!s)
        throw (0, ot.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new ml.URL(s),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
dc.GitLabProvider = VO;
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
hc.KeygenProvider = void 0;
const tm = xe, gl = ir, $l = Fe;
class qO extends $l.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, gl.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new tm.CancellationToken(), r = (0, gl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, gl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, $l.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, tm.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, $l.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
hc.KeygenProvider = qO;
var pc = {};
Object.defineProperty(pc, "__esModule", { value: !0 });
pc.PrivateGitHubProvider = void 0;
const ni = xe, BO = Xe, GO = Ie, rm = gn, nm = ir, HO = mn, zO = Fe;
class KO extends HO.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new ni.CancellationToken(), r = (0, nm.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((o) => o.name === r);
    if (i == null)
      throw (0, ni.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const s = new rm.URL(i.url);
    let a;
    try {
      a = (0, BO.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
    } catch (o) {
      throw o instanceof ni.HttpError && o.statusCode === 404 ? (0, ni.newError)(`Cannot find ${r} in the latest release artifacts (${s}): ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : o;
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
    const i = (0, nm.newUrlFromBase)(n, this.baseUrl);
    try {
      const s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? s.find((a) => a.prerelease) || s[0] : s;
    } catch (s) {
      throw (0, ni.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, zO.getFileList)(t).map((r) => {
      const n = GO.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((s) => s != null && s.name === n);
      if (i == null)
        throw (0, ni.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new rm.URL(i.url),
        info: r
      };
    });
  }
}
pc.PrivateGitHubProvider = KO;
Object.defineProperty(uc, "__esModule", { value: !0 });
uc.isUrlProbablySupportMultiRangeRequests = p$;
uc.createClient = ZO;
const Ua = xe, WO = fc, im = ca, YO = mn, XO = dc, JO = hc, QO = pc;
function p$(e) {
  return !e.includes("s3.amazonaws.com");
}
function ZO(e, t, r) {
  if (typeof e == "string")
    throw (0, Ua.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return s == null ? new YO.GitHubProvider(i, t, r) : new QO.PrivateGitHubProvider(i, t, s, r);
    }
    case "bitbucket":
      return new WO.BitbucketProvider(e, t, r);
    case "gitlab":
      return new XO.GitLabProvider(e, t, r);
    case "keygen":
      return new JO.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new im.GenericProvider({
        provider: "generic",
        url: (0, Ua.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new im.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && p$(i.url)
      });
    }
    case "custom": {
      const i = e, s = i.updateProvider;
      if (!s)
        throw (0, Ua.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new s(i, t, r);
    }
    default:
      throw (0, Ua.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var mc = {}, la = {}, Vi = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.OperationKind = void 0;
Qn.computeOperations = eA;
var Mn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Mn || (Qn.OperationKind = Mn = {}));
function eA(e, t, r) {
  const n = am(e.files), i = am(t.files);
  let s = null;
  const a = t.files[0], o = [], c = a.name, u = n.get(c);
  if (u == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let f = 0;
  const { checksumToOffset: p, checksumToOldSize: h } = rA(n.get(c), u.offset, r);
  let _ = a.offset;
  for (let m = 0; m < l.checksums.length; _ += l.sizes[m], m++) {
    const v = l.sizes[m], y = l.checksums[m];
    let w = p.get(y);
    w != null && h.get(y) !== v && (r.warn(`Checksum ("${y}") matches, but size differs (old: ${h.get(y)}, new: ${v})`), w = void 0), w === void 0 ? (f++, s != null && s.kind === Mn.DOWNLOAD && s.end === _ ? s.end += v : (s = {
      kind: Mn.DOWNLOAD,
      start: _,
      end: _ + v
      // oldBlocks: null,
    }, sm(s, o, y, m))) : s != null && s.kind === Mn.COPY && s.end === w ? s.end += v : (s = {
      kind: Mn.COPY,
      start: w,
      end: w + v
      // oldBlocks: [checksum]
    }, sm(s, o, y, m));
  }
  return f > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${f} changed blocks`), o;
}
const tA = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function sm(e, t, r, n) {
  if (tA && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const s = [i.start, i.end, e.start, e.end].reduce((a, o) => a < o ? a : o);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Mn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - s} until ${i.end - s} and ${e.start - s} until ${e.end - s}`);
    }
  }
  t.push(e);
}
function rA(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let s = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const o = e.checksums[a], c = e.sizes[a], u = i.get(o);
    if (u === void 0)
      n.set(o, s), i.set(o, c);
    else if (r.debug != null) {
      const l = u === c ? "(same size)" : `(size: ${u}, this size: ${c})`;
      r.debug(`${o} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    s += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function am(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.DataSplitter = void 0;
Vi.copyData = m$;
const Ma = xe, nA = yn, iA = Js, sA = Qn, om = Buffer.from(`\r
\r
`);
var Zr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Zr || (Zr = {}));
function m$(e, t, r, n, i) {
  const s = (0, nA.createReadStream)("", {
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
class aA extends iA.Writable {
  constructor(t, r, n, i, s, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = s, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = Zr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, Ma.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Zr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Zr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Zr.BODY)
          this.readState = Zr.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Ma.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const o = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (o < a)
            await this.copyExistingData(o, a);
          else if (o > a)
            throw (0, Ma.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Zr.HEADER;
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
        if (a.kind !== sA.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        m$(a, this.out, this.options.oldFileFd, i, () => {
          t++, s();
        });
      };
      s();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(om, r);
    if (n !== -1)
      return n + om.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ma.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
Vi.DataSplitter = aA;
var yc = {};
Object.defineProperty(yc, "__esModule", { value: !0 });
yc.executeTasksUsingMultipleRangeRequests = oA;
yc.checkIsRangesSupported = uu;
const lu = xe, cm = Vi, lm = Qn;
function oA(e, t, r, n, i) {
  const s = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const o = a + 1e3;
    cA(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, o),
      oldFileFd: n
    }, r, () => s(o), i);
  };
  return s;
}
function cA(e, t, r, n, i) {
  let s = "bytes=", a = 0;
  const o = /* @__PURE__ */ new Map(), c = [];
  for (let f = t.start; f < t.end; f++) {
    const p = t.tasks[f];
    p.kind === lm.OperationKind.DOWNLOAD && (s += `${p.start}-${p.end - 1}, `, o.set(a, f), a++, c.push(p.end - p.start));
  }
  if (a <= 1) {
    const f = (p) => {
      if (p >= t.end) {
        n();
        return;
      }
      const h = t.tasks[p++];
      if (h.kind === lm.OperationKind.COPY)
        (0, cm.copyData)(h, r, t.oldFileFd, i, () => f(p));
      else {
        const _ = e.createRequestOptions();
        _.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const m = e.httpExecutor.createRequest(_, (v) => {
          v.on("error", i), uu(v, i) && (v.pipe(r, {
            end: !1
          }), v.once("end", () => f(p)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
      }
    };
    f(t.start);
    return;
  }
  const u = e.createRequestOptions();
  u.headers.Range = s.substring(0, s.length - 2);
  const l = e.httpExecutor.createRequest(u, (f) => {
    if (!uu(f, i))
      return;
    const p = (0, lu.safeGetHeader)(f, "content-type"), h = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(p);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${p}"`));
      return;
    }
    const _ = new cm.DataSplitter(r, t, o, h[1] || h[2], c, n);
    _.on("error", i), f.pipe(_), f.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function uu(e, t) {
  if (e.statusCode >= 400)
    return t((0, lu.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, lu.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var gc = {};
Object.defineProperty(gc, "__esModule", { value: !0 });
gc.ProgressDifferentialDownloadCallbackTransform = void 0;
const lA = Js;
var vi;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(vi || (vi = {}));
class uA extends lA.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = vi.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == vi.COPY) {
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
    this.operationType = vi.COPY;
  }
  beginRangeDownload() {
    this.operationType = vi.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
gc.ProgressDifferentialDownloadCallbackTransform = uA;
Object.defineProperty(la, "__esModule", { value: !0 });
la.DifferentialDownloader = void 0;
const ss = xe, vl = $n, fA = yn, dA = Vi, hA = gn, xa = Qn, um = yc, pA = gc;
class mA {
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
    return (0, ss.configureRequestUrl)(this.options.newUrl, t), (0, ss.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, xa.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let s = 0, a = 0;
    for (const c of i) {
      const u = c.end - c.start;
      c.kind === xa.OperationKind.DOWNLOAD ? s += u : a += u;
    }
    const o = this.blockAwareFileInfo.size;
    if (s + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== o)
      throw new Error(`Internal error, size mismatch: downloadSize: ${s}, copySize: ${a}, newSize: ${o}`);
    return n.info(`Full: ${fm(o)}, To download: ${fm(s)} (${Math.round(s / (o / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, vl.close)(i.descriptor).catch((s) => {
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
    const n = await (0, vl.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, vl.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const s = (0, fA.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, o) => {
      const c = [];
      let u;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const y = [];
        let w = 0;
        for (const C of t)
          C.kind === xa.OperationKind.DOWNLOAD && (y.push(C.end - C.start), w += C.end - C.start);
        const R = {
          expectedByteCounts: y,
          grandTotal: w
        };
        u = new pA.ProgressDifferentialDownloadCallbackTransform(R, this.options.cancellationToken, this.options.onProgress), c.push(u);
      }
      const l = new ss.DigestTransform(this.blockAwareFileInfo.sha512);
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
      let f = null;
      for (const y of c)
        y.on("error", o), f == null ? f = y : f = f.pipe(y);
      const p = c[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, um.executeTasksUsingMultipleRangeRequests)(this, t, p, n, o), h(0);
        return;
      }
      let _ = 0, m = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const v = this.createRequestOptions();
      v.redirect = "manual", h = (y) => {
        var w, R;
        if (y >= t.length) {
          this.fileMetadataBuffer != null && p.write(this.fileMetadataBuffer), p.end();
          return;
        }
        const C = t[y++];
        if (C.kind === xa.OperationKind.COPY) {
          u && u.beginFileCopy(), (0, dA.copyData)(C, p, n, o, () => h(y));
          return;
        }
        const M = `bytes=${C.start}-${C.end - 1}`;
        v.headers.range = M, (R = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || R === void 0 || R.call(w, `download range: ${M}`), u && u.beginRangeDownload();
        const H = this.httpExecutor.createRequest(v, (z) => {
          z.on("error", o), z.on("aborted", () => {
            o(new Error("response has been aborted by the server"));
          }), z.statusCode >= 400 && o((0, ss.createHttpError)(z)), z.pipe(p, {
            end: !1
          }), z.once("end", () => {
            u && u.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => h(y), 1e3)) : h(y);
          });
        });
        H.on("redirect", (z, he, I) => {
          this.logger.info(`Redirect to ${yA(I)}`), m = I, (0, ss.configureRequestUrl)(new hA.URL(m), v), H.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(H, o), H.end();
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
        (0, um.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
    });
  }
}
la.DifferentialDownloader = mA;
function fm(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function yA(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(mc, "__esModule", { value: !0 });
mc.GenericDifferentialDownloader = void 0;
const gA = la;
class $A extends gA.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
mc.GenericDifferentialDownloader = $A;
var vn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = xe;
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
})(vn);
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.NoOpLogger = fn.AppUpdater = void 0;
const ct = xe, vA = Qs, _A = Zs, EA = sg, Bt = $n, wA = Xe, _l = nc, Gt = Ie, An = a$, dm = oa, bA = lc, hm = o$, SA = ca, El = uc, wl = og, PA = mc, ii = vn;
class uf extends EA.EventEmitter {
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
        throw (0, ct.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, ct.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
    return (0, hm.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new y$();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new _l.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new ii.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (s) => this.checkIfUpdateSupported(s), this._isUserWithinRollout = (s) => this.isStagingMatch(s), this.clientPromise = null, this.stagingUserIdPromise = new _l.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new _l.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (s) => {
      this._logger.error(`Error: ${s.stack || s.message}`);
    }), r == null ? (this.app = new bA.ElectronAppAdapter(), this.httpExecutor = new hm.ElectronHttpExecutor((s, a) => this.emit("login", s, a))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, An.parse)(n);
    if (i == null)
      throw (0, ct.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = TA(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    typeof t == "string" ? n = new SA.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, El.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, El.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
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
      const n = uf.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Dr.Notification(n).show();
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
    const i = await this.stagingUserIdPromise.value, a = ct.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${a}, user id: ${i}`), a < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, An.parse)(t.version);
    if (r == null)
      throw (0, ct.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, An.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const s = (0, An.gt)(r, n), a = (0, An.lt)(r, n);
    return s ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, _A.release)();
    if (r)
      try {
        if ((0, An.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, El.createClient)(n, this, this.createProviderRuntimeOptions())));
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
    const n = new ct.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, ct.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new ct.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, ct.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof ct.CancellationError))
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
    this.emit(ii.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, wA.load)(await (0, Bt.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const t = Gt.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Bt.readFile)(t, "utf-8");
      if (ct.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = ct.UUID.v5((0, vA.randomBytes)(4096), ct.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Bt.outputFile)(t, r);
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
      const i = Gt.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new dm.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(ii.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (w) => this.emit(ii.DOWNLOAD_PROGRESS, w));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, s = i.version, a = r.packageInfo;
    function o() {
      const w = decodeURIComponent(t.fileInfo.url.pathname);
      return w.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? Gt.basename(w) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), u = c.cacheDirForPendingUpdate;
    await (0, Bt.mkdir)(u, { recursive: !0 });
    const l = o();
    let f = Gt.join(u, l);
    const p = a == null ? null : Gt.join(u, `package-${s}${Gt.extname(a.path) || ".7z"}`), h = async (w) => {
      await c.setDownloadedFile(f, p, i, r, l, w), await t.done({
        ...i,
        downloadedFile: f
      });
      const R = Gt.join(u, "current.blockmap");
      return await (0, Bt.pathExists)(R) && await (0, Bt.copyFile)(R, Gt.join(c.cacheDir, "current.blockmap")), p == null ? [f] : [f, p];
    }, _ = this._logger, m = await c.validateDownloadedPath(f, i, r, _);
    if (m != null)
      return f = m, await h(!1);
    const v = async () => (await c.clear().catch(() => {
    }), await (0, Bt.unlink)(f).catch(() => {
    })), y = await (0, dm.createTempUpdateFile)(`temp-${l}`, u, _);
    try {
      await t.task(y, n, p, v), await (0, ct.retry)(() => (0, Bt.rename)(y, f), {
        retries: 60,
        interval: 500,
        shouldRetry: (w) => w instanceof Error && /^EBUSY:/.test(w.message) ? !0 : (_.warn(`Cannot rename temp file to final file: ${w.message || w.stack}`), !1)
      });
    } catch (w) {
      throw await v(), w instanceof ct.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), w;
    }
    return _.info(`New version ${s} has been downloaded to ${f}`), await h(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, s) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = r.updateInfoAndProvider.provider, o = await a.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const c = async (_) => {
        const m = await this.httpExecutor.downloadToBuffer(_, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (m == null || m.length === 0)
          throw new Error(`Blockmap "${_.href}" is empty`);
        try {
          return JSON.parse((0, wl.gunzipSync)(m).toString());
        } catch (v) {
          throw new Error(`Cannot parse blockmap "${_.href}", error: ${v}`);
        }
      }, u = {
        newUrl: t.url,
        oldFile: Gt.join(this.downloadedUpdateHelper.cacheDir, s),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(ii.DOWNLOAD_PROGRESS) > 0 && (u.onProgress = (_) => this.emit(ii.DOWNLOAD_PROGRESS, _));
      const l = async (_, m) => {
        const v = Gt.join(m, "current.blockmap");
        await (0, Bt.outputFile)(v, (0, wl.gzipSync)(JSON.stringify(_)));
      }, f = async (_) => {
        const m = Gt.join(_, "current.blockmap");
        try {
          if (await (0, Bt.pathExists)(m))
            return JSON.parse((0, wl.gunzipSync)(await (0, Bt.readFile)(m)).toString());
        } catch (v) {
          this._logger.warn(`Cannot parse blockmap "${m}", error: ${v}`);
        }
        return null;
      }, p = await c(o[1]);
      await l(p, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let h = await f(this.downloadedUpdateHelper.cacheDir);
      return h == null && (h = await c(o[0])), await new PA.GenericDifferentialDownloader(t.info, this.httpExecutor, u).download(h, p), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
fn.AppUpdater = uf;
function TA(e) {
  const t = (0, An.prerelease)(e);
  return t != null && t.length > 0;
}
class y$ {
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
fn.NoOpLogger = y$;
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.BaseUpdater = void 0;
const pm = Yo, RA = fn;
class NA extends RA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Dr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
    const i = (0, pm.spawnSync)(t, r, {
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
        const o = { stdio: i, env: n, detached: !0 }, c = (0, pm.spawn)(t, r, o);
        c.on("error", (u) => {
          a(u);
        }), c.unref(), c.pid !== void 0 && s(!0);
      } catch (o) {
        a(o);
      }
    });
  }
}
Jn.BaseUpdater = NA;
var Vs = {}, ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
ua.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const si = $n, OA = la, AA = og;
class IA extends OA.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = g$(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await CA(this.options.oldFile), i);
  }
}
ua.FileWithEmbeddedBlockMapDifferentialDownloader = IA;
function g$(e) {
  return JSON.parse((0, AA.inflateRawSync)(e).toString());
}
async function CA(e) {
  const t = await (0, si.open)(e, "r");
  try {
    const r = (await (0, si.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, si.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, si.read)(t, i, 0, i.length, r - n.length - i.length), await (0, si.close)(t), g$(i);
  } catch (r) {
    throw await (0, si.close)(t), r;
  }
}
Object.defineProperty(Vs, "__esModule", { value: !0 });
Vs.AppImageUpdater = void 0;
const mm = xe, ym = Yo, DA = $n, kA = yn, as = Ie, LA = Jn, FA = ua, jA = Fe, gm = vn;
class UA extends LA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, jA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, mm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, a, i, r, t)) && await this.httpExecutor.download(n.url, i, s), await (0, DA.chmod)(i, 493);
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
      return this.listenerCount(gm.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(gm.DOWNLOAD_PROGRESS, o)), await new FA.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, mm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, kA.unlinkSync)(r);
    let n;
    const i = as.basename(r), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    as.basename(s) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = as.join(as.dirname(r), as.basename(s)), (0, ym.execFileSync)("mv", ["-f", s, n]), n !== r && this.emit("appimage-filename-updated", n);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, ym.execFileSync)(n, [], { env: a })), !0;
  }
}
Vs.AppImageUpdater = UA;
var qs = {}, qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.LinuxUpdater = void 0;
const MA = Jn;
class xA extends MA.BaseUpdater {
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
qi.LinuxUpdater = xA;
Object.defineProperty(qs, "__esModule", { value: !0 });
qs.DebUpdater = void 0;
const VA = Fe, $m = vn, qA = qi;
class ff extends qA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, VA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount($m.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit($m.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
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
      ff.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
qs.DebUpdater = ff;
var Bs = {};
Object.defineProperty(Bs, "__esModule", { value: !0 });
Bs.PacmanUpdater = void 0;
const vm = vn, BA = Fe, GA = qi;
class df extends GA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, BA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(vm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(vm.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      df.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Bs.PacmanUpdater = df;
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
Gs.RpmUpdater = void 0;
const _m = vn, HA = Fe, zA = qi;
class hf extends zA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, HA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(_m.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(_m.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      hf.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Gs.RpmUpdater = hf;
var Hs = {};
Object.defineProperty(Hs, "__esModule", { value: !0 });
Hs.MacUpdater = void 0;
const Em = xe, bl = $n, KA = yn, wm = Ie, WA = UE, YA = fn, XA = Fe, bm = Yo, Sm = Qs;
class JA extends YA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Dr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
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
      this.debug("Checking for macOS Rosetta environment"), s = (0, bm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${s})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const p = (0, bm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${p}`), a = a || p;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    a = a || process.arch === "arm64" || s;
    const o = (f) => {
      var p;
      return f.url.pathname.includes("arm64") || ((p = f.info.url) === null || p === void 0 ? void 0 : p.includes("arm64"));
    };
    a && r.some(o) ? r = r.filter((f) => a === o(f)) : r = r.filter((f) => !o(f));
    const c = (0, XA.findFile)(r, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, Em.newError)(`ZIP file not provided: ${(0, Em.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const u = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (f, p) => {
        const h = wm.join(this.downloadedUpdateHelper.cacheDir, l), _ = () => (0, bl.pathExistsSync)(h) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        _() && (m = await this.differentialDownloadInstaller(c, t, f, u, l)), m && await this.httpExecutor.download(c.url, f, p);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const p = wm.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, bl.copyFile)(f.downloadedFile, p);
          } catch (p) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${p.message}`);
          }
        return this.updateDownloaded(c, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, bl.stat)(i)).size, a = this._logger, o = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${o})`), this.server = (0, WA.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${o})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${o})`);
    });
    const c = (u) => {
      const l = u.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((u, l) => {
      const f = (0, Sm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), p = Buffer.from(`autoupdater:${f}`, "ascii"), h = `/${(0, Sm.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, m) => {
        const v = _.url;
        if (a.info(`${v} requested`), v === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), a.warn("No authenthication info");
            return;
          }
          const R = _.headers.authorization.split(" ")[1], C = Buffer.from(R, "base64").toString("ascii"), [M, H] = C.split(":");
          if (M !== "autoupdater" || H !== f) {
            m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const z = Buffer.from(`{ "url": "${c(this.server)}${h}" }`);
          m.writeHead(200, { "Content-Type": "application/json", "Content-Length": z.length }), m.end(z);
          return;
        }
        if (!v.startsWith(h)) {
          a.warn(`${v} requested, but not supported`), m.writeHead(404), m.end();
          return;
        }
        a.info(`${h} requested by Squirrel.Mac, pipe ${i}`);
        let y = !1;
        m.on("finish", () => {
          y || (this.nativeUpdater.removeListener("error", l), u([]));
        });
        const w = (0, KA.createReadStream)(i);
        w.on("error", (R) => {
          try {
            m.end();
          } catch (C) {
            a.warn(`cannot end response: ${C}`);
          }
          y = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${R}`));
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
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : u([]);
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
Hs.MacUpdater = JA;
var zs = {}, pf = {};
Object.defineProperty(pf, "__esModule", { value: !0 });
pf.verifySignature = ZA;
const Pm = xe, $$ = Yo, QA = Zs, Tm = Ie;
function v$(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function ZA(e, t, r) {
  return new Promise((n, i) => {
    const s = t.replace(/'/g, "''");
    r.info(`Verifying signature ${s}`), (0, $$.execFile)(...v$(`"Get-AuthenticodeSignature -LiteralPath '${s}' | ConvertTo-Json -Compress"`, 20 * 1e3), (a, o, c) => {
      var u;
      try {
        if (a != null || c) {
          Sl(r, a, c, i), n(null);
          return;
        }
        const l = eI(o);
        if (l.Status === 0) {
          try {
            const _ = Tm.normalize(l.Path), m = Tm.normalize(t);
            if (r.info(`LiteralPath: ${_}. Update Path: ${m}`), _ !== m) {
              Sl(r, new Error(`LiteralPath of ${_} is different than ${m}`), c, i), n(null);
              return;
            }
          } catch (_) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(u = _.message) !== null && u !== void 0 ? u : _.stack}`);
          }
          const p = (0, Pm.parseDn)(l.SignerCertificate.Subject);
          let h = !1;
          for (const _ of e) {
            const m = (0, Pm.parseDn)(_);
            if (m.size ? h = Array.from(m.keys()).every((y) => m.get(y) === p.get(y)) : _ === p.get("CN") && (r.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (p, h) => p === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (l) {
        Sl(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function eI(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Sl(e, t, r, n) {
  if (tI()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, $$.execFileSync)(...v$("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function tI() {
  const e = QA.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.NsisUpdater = void 0;
const Va = xe, Rm = Ie, rI = Jn, nI = ua, Nm = vn, iI = Fe, sI = $n, aI = pf, Om = gn;
class oI extends rI.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, aI.verifySignature)(n, i, this._logger);
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
    const r = t.updateInfoAndProvider.provider, n = (0, iI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, s, a, o) => {
        const c = n.packageInfo, u = c != null && a != null;
        if (u && t.disableWebInstaller)
          throw (0, Va.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !u && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (u || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, Va.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, s);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await o(), (0, Va.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (u && await this.differentialDownloadWebPackage(t, c, a, r))
          try {
            await this.httpExecutor.download(new Om.URL(c.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (f) {
            try {
              await (0, sI.unlink)(a);
            } catch {
            }
            throw f;
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
      this.spawnLog(Rm.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), s(), !0) : (this.spawnLog(r, n).catch((a) => {
      const o = a.code;
      this._logger.info(`Cannot run installer: error code: ${o}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), o === "UNKNOWN" || o === "EACCES" ? s() : o === "ENOENT" ? Dr.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const s = {
        newUrl: new Om.URL(r.path),
        oldFile: Rm.join(this.downloadedUpdateHelper.cacheDir, Va.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Nm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Nm.DOWNLOAD_PROGRESS, a)), await new nI.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "win32";
    }
    return !1;
  }
}
zs.NsisUpdater = oI;
(function(e) {
  var t = dt && dt.__createBinding || (Object.create ? function(v, y, w, R) {
    R === void 0 && (R = w);
    var C = Object.getOwnPropertyDescriptor(y, w);
    (!C || ("get" in C ? !y.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return y[w];
    } }), Object.defineProperty(v, R, C);
  } : function(v, y, w, R) {
    R === void 0 && (R = w), v[R] = y[w];
  }), r = dt && dt.__exportStar || function(v, y) {
    for (var w in v) w !== "default" && !Object.prototype.hasOwnProperty.call(y, w) && t(y, v, w);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = $n, i = Ie;
  var s = Jn;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return s.BaseUpdater;
  } });
  var a = fn;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var o = Fe;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return o.Provider;
  } });
  var c = Vs;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var u = qs;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return u.DebUpdater;
  } });
  var l = Bs;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var f = Gs;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var p = Hs;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return p.MacUpdater;
  } });
  var h = zs;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return h.NsisUpdater;
  } }), r(vn, e);
  let _;
  function m() {
    if (process.platform === "win32")
      _ = new zs.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new Hs.MacUpdater();
    else {
      _ = new Vs.AppImageUpdater();
      try {
        const v = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(v))
          return _;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const y = (0, n.readFileSync)(v).toString().trim();
        switch (console.info("Found package-type:", y), y) {
          case "deb":
            _ = new qs.DebUpdater();
            break;
          case "rpm":
            _ = new Gs.RpmUpdater();
            break;
          case "pacman":
            _ = new Bs.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (v) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", v.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || m()
  });
})(gr);
const Hn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, _$ = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), E$ = 1e6, cI = (e) => e >= "0" && e <= "9";
function w$(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= E$;
  }
  return !1;
}
function Pl(e, t) {
  return _$.has(e) ? !1 : (e && w$(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function lI(e) {
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
        if (!Pl(r, t))
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
          if ((r || n === "property") && !Pl(r, t))
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
            !Number.isNaN(o) && Number.isFinite(o) && o >= 0 && o <= Number.MAX_SAFE_INTEGER && o <= E$ && r === String(o) ? t.push(o) : t.push(r), r = "", n = "indexEnd";
          }
          break;
        }
        if (n === "indexEnd")
          throw new Error(`Invalid character '${a}' after an index at position ${s}`);
        r += a;
        break;
      }
      default: {
        if (n === "index" && !cI(a))
          throw new Error(`Invalid character '${a}' in an index at position ${s}`);
        if (n === "indexEnd")
          throw new Error(`Invalid character '${a}' after an index at position ${s}`);
        n === "start" && (n = "property"), r += a;
      }
    }
  }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (!Pl(r, t))
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
function $c(e) {
  if (typeof e == "string")
    return lI(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [r, n] of e.entries()) {
      if (typeof n != "string" && typeof n != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${r}, got ${typeof n}`);
      if (typeof n == "number" && !Number.isFinite(n))
        throw new TypeError(`Path segment at index ${r} must be a finite number, got ${n}`);
      if (_$.has(n))
        return [];
      typeof n == "string" && w$(n) ? t.push(Number.parseInt(n, 10)) : t.push(n);
    }
    return t;
  }
  return [];
}
function Am(e, t, r) {
  if (!Hn(e) || typeof t != "string" && !Array.isArray(t))
    return r === void 0 ? e : r;
  const n = $c(t);
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
function qa(e, t, r) {
  if (!Hn(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const n = e, i = $c(t);
  if (i.length === 0)
    return e;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    if (s === i.length - 1)
      e[a] = r;
    else if (!Hn(e[a])) {
      const c = typeof i[s + 1] == "number";
      e[a] = c ? [] : {};
    }
    e = e[a];
  }
  return n;
}
function uI(e, t) {
  if (!Hn(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = $c(t);
  if (r.length === 0)
    return !1;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (n === r.length - 1)
      return Object.hasOwn(e, i) ? (delete e[i], !0) : !1;
    if (e = e[i], !Hn(e))
      return !1;
  }
}
function Tl(e, t) {
  if (!Hn(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = $c(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Hn(e) || !(n in e))
      return !1;
    e = e[n];
  }
  return !0;
}
const tn = cg.homedir(), mf = cg.tmpdir(), { env: _i } = Re, fI = (e) => {
  const t = se.join(tn, "Library");
  return {
    data: se.join(t, "Application Support", e),
    config: se.join(t, "Preferences", e),
    cache: se.join(t, "Caches", e),
    log: se.join(t, "Logs", e),
    temp: se.join(mf, e)
  };
}, dI = (e) => {
  const t = _i.APPDATA || se.join(tn, "AppData", "Roaming"), r = _i.LOCALAPPDATA || se.join(tn, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: se.join(r, e, "Data"),
    config: se.join(t, e, "Config"),
    cache: se.join(r, e, "Cache"),
    log: se.join(r, e, "Log"),
    temp: se.join(mf, e)
  };
}, hI = (e) => {
  const t = se.basename(tn);
  return {
    data: se.join(_i.XDG_DATA_HOME || se.join(tn, ".local", "share"), e),
    config: se.join(_i.XDG_CONFIG_HOME || se.join(tn, ".config"), e),
    cache: se.join(_i.XDG_CACHE_HOME || se.join(tn, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: se.join(_i.XDG_STATE_HOME || se.join(tn, ".local", "state"), e),
    temp: se.join(mf, t, e)
  };
};
function pI(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), Re.platform === "darwin" ? fI(e) : Re.platform === "win32" ? dI(e) : hI(e);
}
const Br = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    return e.apply(void 0, i).catch(r);
  };
}, Rr = (e, t) => {
  const { onError: r } = t;
  return function(...i) {
    try {
      return e.apply(void 0, i);
    } catch (s) {
      return r(s);
    }
  };
}, mI = 250, Gr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, a = i.interval ?? mI, o = Date.now() + s;
    return function c(...u) {
      return e.apply(void 0, u).catch((l) => {
        if (!r(l) || Date.now() >= o)
          throw l;
        const f = Math.round(a * Math.random());
        return f > 0 ? new Promise((h) => setTimeout(h, f)).then(() => c.apply(void 0, u)) : c.apply(void 0, u);
      });
    };
  };
}, Hr = (e, t) => {
  const { isRetriable: r } = t;
  return function(i) {
    const { timeout: s } = i, a = Date.now() + s;
    return function(...c) {
      for (; ; )
        try {
          return e.apply(void 0, c);
        } catch (u) {
          if (!r(u) || Date.now() >= a)
            throw u;
          continue;
        }
    };
  };
}, Ei = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Ei.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !yI && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Ei.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Ei.isNodeError(e))
      throw e;
    if (!Ei.isChangeErrorOk(e))
      throw e;
  }
}, Ba = {
  onError: Ei.onChangeError
}, It = {
  onError: () => {
  }
}, yI = Re.getuid ? !Re.getuid() : !1, et = {
  isRetriable: Ei.isRetriableError
}, nt = {
  attempt: {
    /* ASYNC */
    chmod: Br(Ze(re.chmod), Ba),
    chown: Br(Ze(re.chown), Ba),
    close: Br(Ze(re.close), It),
    fsync: Br(Ze(re.fsync), It),
    mkdir: Br(Ze(re.mkdir), It),
    realpath: Br(Ze(re.realpath), It),
    stat: Br(Ze(re.stat), It),
    unlink: Br(Ze(re.unlink), It),
    /* SYNC */
    chmodSync: Rr(re.chmodSync, Ba),
    chownSync: Rr(re.chownSync, Ba),
    closeSync: Rr(re.closeSync, It),
    existsSync: Rr(re.existsSync, It),
    fsyncSync: Rr(re.fsync, It),
    mkdirSync: Rr(re.mkdirSync, It),
    realpathSync: Rr(re.realpathSync, It),
    statSync: Rr(re.statSync, It),
    unlinkSync: Rr(re.unlinkSync, It)
  },
  retry: {
    /* ASYNC */
    close: Gr(Ze(re.close), et),
    fsync: Gr(Ze(re.fsync), et),
    open: Gr(Ze(re.open), et),
    readFile: Gr(Ze(re.readFile), et),
    rename: Gr(Ze(re.rename), et),
    stat: Gr(Ze(re.stat), et),
    write: Gr(Ze(re.write), et),
    writeFile: Gr(Ze(re.writeFile), et),
    /* SYNC */
    closeSync: Hr(re.closeSync, et),
    fsyncSync: Hr(re.fsyncSync, et),
    openSync: Hr(re.openSync, et),
    readFileSync: Hr(re.readFileSync, et),
    renameSync: Hr(re.renameSync, et),
    statSync: Hr(re.statSync, et),
    writeSync: Hr(re.writeSync, et),
    writeFileSync: Hr(re.writeFileSync, et)
  }
}, gI = "utf8", Im = 438, $I = 511, vI = {}, _I = Re.geteuid ? Re.geteuid() : -1, EI = Re.getegid ? Re.getegid() : -1, wI = 1e3, bI = !!Re.getuid;
Re.getuid && Re.getuid();
const Cm = 128, SI = (e) => e instanceof Error && "code" in e, Dm = (e) => typeof e == "string", Rl = (e) => e === void 0, PI = Re.platform === "linux", b$ = Re.platform === "win32", yf = ["SIGHUP", "SIGINT", "SIGTERM"];
b$ || yf.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
PI && yf.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class TI {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (b$ && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? Re.kill(Re.pid, "SIGTERM") : Re.kill(Re.pid, t));
      }
    }, this.hook = () => {
      Re.once("exit", () => this.exit());
      for (const t of yf)
        try {
          Re.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const RI = new TI(), NI = RI.register, it = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = it.truncate(t(e));
    return n in it.store ? it.get(e, t, r) : (it.store[n] = r, [n, () => delete it.store[n]]);
  },
  purge: (e) => {
    it.store[e] && (delete it.store[e], nt.attempt.unlink(e));
  },
  purgeSync: (e) => {
    it.store[e] && (delete it.store[e], nt.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in it.store)
      it.purgeSync(e);
  },
  truncate: (e) => {
    const t = se.basename(e);
    if (t.length <= Cm)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Cm;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
NI(it.purgeSyncAll);
function S$(e, t, r = vI) {
  if (Dm(r))
    return S$(e, t, { encoding: r });
  const i = { timeout: r.timeout ?? wI };
  let s = null, a = null, o = null;
  try {
    const c = nt.attempt.realpathSync(e), u = !!c;
    e = c || e, [a, s] = it.get(e, r.tmpCreate || it.create, r.tmpPurge !== !1);
    const l = bI && Rl(r.chown), f = Rl(r.mode);
    if (u && (l || f)) {
      const p = nt.attempt.statSync(e);
      p && (r = { ...r }, l && (r.chown = { uid: p.uid, gid: p.gid }), f && (r.mode = p.mode));
    }
    if (!u) {
      const p = se.dirname(e);
      nt.attempt.mkdirSync(p, {
        mode: $I,
        recursive: !0
      });
    }
    o = nt.retry.openSync(i)(a, "w", r.mode || Im), r.tmpCreated && r.tmpCreated(a), Dm(t) ? nt.retry.writeSync(i)(o, t, 0, r.encoding || gI) : Rl(t) || nt.retry.writeSync(i)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? nt.retry.fsyncSync(i)(o) : nt.attempt.fsync(o)), nt.retry.closeSync(i)(o), o = null, r.chown && (r.chown.uid !== _I || r.chown.gid !== EI) && nt.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== Im && nt.attempt.chmodSync(a, r.mode);
    try {
      nt.retry.renameSync(i)(a, e);
    } catch (p) {
      if (!SI(p) || p.code !== "ENAMETOOLONG")
        throw p;
      nt.retry.renameSync(i)(a, it.truncate(e));
    }
    s(), a = null;
  } finally {
    o && nt.attempt.closeSync(o), a && it.purge(a);
  }
}
var fu = { exports: {} }, P$ = {}, Zt = {}, ki = {}, fa = {}, oe = {}, Ks = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((R, C) => `${R}${C}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((R, C) => (C instanceof r && (R[C.str] = (R[C.str] || 0) + 1), R), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(y, ...w) {
    const R = [y[0]];
    let C = 0;
    for (; C < w.length; )
      o(R, w[C]), R.push(y[++C]);
    return new n(R);
  }
  e._ = i;
  const s = new n("+");
  function a(y, ...w) {
    const R = [h(y[0])];
    let C = 0;
    for (; C < w.length; )
      R.push(s), o(R, w[C]), R.push(s, h(y[++C]));
    return c(R), new n(R);
  }
  e.str = a;
  function o(y, w) {
    w instanceof n ? y.push(...w._items) : w instanceof r ? y.push(w) : y.push(f(w));
  }
  e.addCodeArg = o;
  function c(y) {
    let w = 1;
    for (; w < y.length - 1; ) {
      if (y[w] === s) {
        const R = u(y[w - 1], y[w + 1]);
        if (R !== void 0) {
          y.splice(w - 1, 3, R);
          continue;
        }
        y[w++] = "+";
      }
      w++;
    }
  }
  function u(y, w) {
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
  function f(y) {
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
  function _(y) {
    return typeof y == "string" && e.IDENTIFIER.test(y) ? new n(`.${y}`) : i`[${y}]`;
  }
  e.getProperty = _;
  function m(y) {
    if (typeof y == "string" && e.IDENTIFIER.test(y))
      return new n(`${y}`);
    throw new Error(`CodeGen: invalid export name: ${y}, use explicit $id name mapping`);
  }
  e.getEsmExportName = m;
  function v(y) {
    return new n(y.toString());
  }
  e.regexpCode = v;
})(Ks);
var du = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Ks;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
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
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const a = (0, t._)`\n`;
  class o extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(u), { prefix: h } = p, _ = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let m = this._values[h];
      if (m) {
        const w = m.get(_);
        if (w)
          return w;
      } else
        m = this._values[h] = /* @__PURE__ */ new Map();
      m.set(_, p);
      const v = this._scope[h] || (this._scope[h] = []), y = v.length;
      return v[y] = l.ref, p.setValue(l, { property: h, itemIndex: y }), p;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, p) {
      let h = t.nil;
      for (const _ in u) {
        const m = u[_];
        if (!m)
          continue;
        const v = f[_] = f[_] || /* @__PURE__ */ new Map();
        m.forEach((y) => {
          if (v.has(y))
            return;
          v.set(y, n.Started);
          let w = l(y);
          if (w) {
            const R = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${R} ${y} = ${w};${this.opts._n}`;
          } else if (w = p == null ? void 0 : p(y))
            h = (0, t._)`${h}${w}${this.opts._n}`;
          else
            throw new r(y);
          v.set(y, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(du);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Ks, r = du;
  var n = Ks;
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
  var i = du;
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
      return J(d, this.rhs);
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
  class u extends s {
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
  class f extends s {
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
        g.optimizeNames(d, $) || (D(d, g.names), N.splice(E, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => G(d, $.names), {});
    }
  }
  class _ extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class m extends h {
  }
  class v extends _ {
  }
  v.kind = "else";
  class y extends _ {
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
        $ = this.else = Array.isArray(N) ? new v(N) : N;
      }
      if ($)
        return d === !1 ? $ instanceof y ? $ : $.nodes : this.nodes.length ? this : new y(x(d), $ instanceof y ? [$] : $.nodes);
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
      return J(d, this.condition), this.else && G(d, this.else.names), d;
    }
  }
  y.kind = "if";
  class w extends _ {
  }
  w.kind = "for";
  class R extends w {
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
      return G(super.names, this.iteration.names);
    }
  }
  class C extends w {
    constructor(d, $, N, E) {
      super(), this.varKind = d, this.name = $, this.from = N, this.to = E;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: N, from: E, to: g } = this;
      return `for(${$} ${N}=${E}; ${N}<${g}; ${N}++)` + super.render(d);
    }
    get names() {
      const d = J(super.names, this.from);
      return J(d, this.to);
    }
  }
  class M extends w {
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
      return G(super.names, this.iterable.names);
    }
  }
  class H extends _ {
    constructor(d, $, N) {
      super(), this.name = d, this.args = $, this.async = N;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class he extends _ {
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
      return this.catch && G(d, this.catch.names), this.finally && G(d, this.finally.names), d;
    }
  }
  class I extends _ {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  I.kind = "catch";
  class Q extends _ {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Q.kind = "finally";
  class B {
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
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(y, v);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new R(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, N, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const j = this._scope.toName(d);
      return this._for(new C(g, j, $, N), () => E(j));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, N, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const j = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${j}.length`, (A) => {
          this.var(g, (0, t._)`${j}[${A}]`), N(g);
        });
      }
      return this._for(new M("of", E, g, $), () => N(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, N, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, N);
      const g = this._scope.toName(d);
      return this._for(new M("in", E, g, $), () => N(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new z();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, $, N) {
      if (!$ && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new he();
      if (this._blockNode(E), this.code(d), $) {
        const g = this.name("e");
        this._currNode = E.catch = new I(g), $(g);
      }
      return N && (this._currNode = E.finally = new Q(), this.code(N)), this._endBlockNode(I, Q);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
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
      return this._blockNode(new H(d, $, N)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
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
  e.CodeGen = B;
  function G(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) + (d[$] || 0);
    return S;
  }
  function J(S, d) {
    return d instanceof t._CodeOrName ? G(S, d.names) : S;
  }
  function k(S, d, $) {
    if (S instanceof t.Name)
      return N(S);
    if (!E(S))
      return S;
    return new t._Code(S._items.reduce((g, j) => (j instanceof t.Name && (j = N(j)), j instanceof t._Code ? g.push(...j._items) : g.push(j), g), []));
    function N(g) {
      const j = $[g.str];
      return j === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], j);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((j) => j instanceof t.Name && d[j.str] === 1 && $[j.str] !== void 0);
    }
  }
  function D(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) - (d[$] || 0);
  }
  function x(S) {
    return typeof S == "boolean" || typeof S == "number" || S === null ? !S : (0, t._)`!${P(S)}`;
  }
  e.not = x;
  const F = b(e.operators.AND);
  function V(...S) {
    return S.reduce(F);
  }
  e.and = V;
  const U = b(e.operators.OR);
  function O(...S) {
    return S.reduce(U);
  }
  e.or = O;
  function b(S) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${P(d)} ${S} ${P($)}`;
  }
  function P(S) {
    return S instanceof t.Name ? S : (0, t._)`(${S})`;
  }
})(oe);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const ve = oe, OI = Ks;
function AI(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = AI;
function II(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (T$(e, t), !R$(t, e.self.RULES.all));
}
K.alwaysValidSchema = II;
function T$(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || A$(e, `unknown keyword: "${s}"`);
}
K.checkUnknownRules = T$;
function R$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = R$;
function CI(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = CI;
function DI({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ve._)`${r}`;
  }
  return (0, ve._)`${e}${t}${(0, ve.getProperty)(n)}`;
}
K.schemaRefOrVal = DI;
function kI(e) {
  return N$(decodeURIComponent(e));
}
K.unescapeFragment = kI;
function LI(e) {
  return encodeURIComponent(gf(e));
}
K.escapeFragment = LI;
function gf(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = gf;
function N$(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = N$;
function FI(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = FI;
function km({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, a, o) => {
    const c = a === void 0 ? s : a instanceof ve.Name ? (s instanceof ve.Name ? e(i, s, a) : t(i, s, a), a) : s instanceof ve.Name ? (t(i, a, s), s) : r(s, a);
    return o === ve.Name && !(c instanceof ve.Name) ? n(i, c) : c;
  };
}
K.mergeEvaluated = {
  props: km({
    mergeNames: (e, t, r) => e.if((0, ve._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ve._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ve._)`${r} || {}`).code((0, ve._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ve._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ve._)`${r} || {}`), $f(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: O$
  }),
  items: km({
    mergeNames: (e, t, r) => e.if((0, ve._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ve._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ve._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ve._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function O$(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ve._)`{}`);
  return t !== void 0 && $f(e, r, t), r;
}
K.evaluatedPropsToName = O$;
function $f(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ve._)`${t}${(0, ve.getProperty)(n)}`, !0));
}
K.setEvaluated = $f;
const Lm = {};
function jI(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Lm[t.code] || (Lm[t.code] = new OI._Code(t.code))
  });
}
K.useFunc = jI;
var hu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(hu || (K.Type = hu = {}));
function UI(e, t, r) {
  if (e instanceof ve.Name) {
    const n = t === hu.Num;
    return r ? n ? (0, ve._)`"[" + ${e} + "]"` : (0, ve._)`"['" + ${e} + "']"` : n ? (0, ve._)`"/" + ${e}` : (0, ve._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ve.getProperty)(e).toString() : "/" + gf(e);
}
K.getErrorPath = UI;
function A$(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = A$;
var Ct = {};
Object.defineProperty(Ct, "__esModule", { value: !0 });
const tt = oe, MI = {
  // validation function arguments
  data: new tt.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new tt.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new tt.Name("instancePath"),
  parentData: new tt.Name("parentData"),
  parentDataProperty: new tt.Name("parentDataProperty"),
  rootData: new tt.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new tt.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new tt.Name("vErrors"),
  // null or array of validation errors
  errors: new tt.Name("errors"),
  // counter of validation errors
  this: new tt.Name("this"),
  // "globals"
  self: new tt.Name("self"),
  scope: new tt.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new tt.Name("json"),
  jsonPos: new tt.Name("jsonPos"),
  jsonLen: new tt.Name("jsonLen"),
  jsonPart: new tt.Name("jsonPart")
};
Ct.default = MI;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = oe, r = K, n = Ct;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: y }) => y ? (0, t.str)`"${v}" keyword must be ${y} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function i(v, y = e.keywordError, w, R) {
    const { it: C } = v, { gen: M, compositeRule: H, allErrors: z } = C, he = f(v, y, w);
    R ?? (H || z) ? c(M, he) : u(C, (0, t._)`[${he}]`);
  }
  e.reportError = i;
  function s(v, y = e.keywordError, w) {
    const { it: R } = v, { gen: C, compositeRule: M, allErrors: H } = R, z = f(v, y, w);
    c(C, z), M || H || u(R, n.default.vErrors);
  }
  e.reportExtraError = s;
  function a(v, y) {
    v.assign(n.default.errors, y), v.if((0, t._)`${n.default.vErrors} !== null`, () => v.if(y, () => v.assign((0, t._)`${n.default.vErrors}.length`, y), () => v.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function o({ gen: v, keyword: y, schemaValue: w, data: R, errsCount: C, it: M }) {
    if (C === void 0)
      throw new Error("ajv implementation error");
    const H = v.name("err");
    v.forRange("i", C, n.default.errors, (z) => {
      v.const(H, (0, t._)`${n.default.vErrors}[${z}]`), v.if((0, t._)`${H}.instancePath === undefined`, () => v.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, M.errorPath))), v.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${M.errSchemaPath}/${y}`), M.opts.verbose && (v.assign((0, t._)`${H}.schema`, w), v.assign((0, t._)`${H}.data`, R));
    });
  }
  e.extendErrors = o;
  function c(v, y) {
    const w = v.const("err", y);
    v.if((0, t._)`${n.default.vErrors} === null`, () => v.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), v.code((0, t._)`${n.default.errors}++`);
  }
  function u(v, y) {
    const { gen: w, validateName: R, schemaEnv: C } = v;
    C.$async ? w.throw((0, t._)`new ${v.ValidationError}(${y})`) : (w.assign((0, t._)`${R}.errors`, y), w.return(!1));
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
  function f(v, y, w) {
    const { createErrors: R } = v.it;
    return R === !1 ? (0, t._)`{}` : p(v, y, w);
  }
  function p(v, y, w = {}) {
    const { gen: R, it: C } = v, M = [
      h(C, w),
      _(v, w)
    ];
    return m(v, y, M), R.object(...M);
  }
  function h({ errorPath: v }, { instancePath: y }) {
    const w = y ? (0, t.str)`${v}${(0, r.getErrorPath)(y, r.Type.Str)}` : v;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function _({ keyword: v, it: { errSchemaPath: y } }, { schemaPath: w, parentSchema: R }) {
    let C = R ? y : (0, t.str)`${y}/${v}`;
    return w && (C = (0, t.str)`${C}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, C];
  }
  function m(v, { params: y, message: w }, R) {
    const { keyword: C, data: M, schemaValue: H, it: z } = v, { opts: he, propertyName: I, topSchemaRef: Q, schemaPath: B } = z;
    R.push([l.keyword, C], [l.params, typeof y == "function" ? y(v) : y || (0, t._)`{}`]), he.messages && R.push([l.message, typeof w == "function" ? w(v) : w]), he.verbose && R.push([l.schema, H], [l.parentSchema, (0, t._)`${Q}${B}`], [n.default.data, M]), I && R.push([l.propertyName, I]);
  }
})(fa);
Object.defineProperty(ki, "__esModule", { value: !0 });
ki.boolOrEmptySchema = ki.topBoolOrEmptySchema = void 0;
const xI = fa, VI = oe, qI = Ct, BI = {
  message: "boolean schema is false"
};
function GI(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? I$(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(qI.default.data) : (t.assign((0, VI._)`${n}.errors`, null), t.return(!0));
}
ki.topBoolOrEmptySchema = GI;
function HI(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), I$(e)) : r.var(t, !0);
}
ki.boolOrEmptySchema = HI;
function I$(e, t) {
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
  (0, xI.reportError)(i, BI, void 0, t);
}
var Ue = {}, zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.getRules = zn.isJSONType = void 0;
const zI = ["string", "number", "integer", "boolean", "null", "object", "array"], KI = new Set(zI);
function WI(e) {
  return typeof e == "string" && KI.has(e);
}
zn.isJSONType = WI;
function YI() {
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
zn.getRules = YI;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.shouldUseRule = Or.shouldUseGroup = Or.schemaHasRulesForType = void 0;
function XI({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && C$(e, n);
}
Or.schemaHasRulesForType = XI;
function C$(e, t) {
  return t.rules.some((r) => D$(e, r));
}
Or.shouldUseGroup = C$;
function D$(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Or.shouldUseRule = D$;
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.reportTypeError = Ue.checkDataTypes = Ue.checkDataType = Ue.coerceAndCheckDataType = Ue.getJSONTypes = Ue.getSchemaTypes = Ue.DataType = void 0;
const JI = zn, QI = Or, ZI = fa, le = oe, k$ = K;
var Si;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Si || (Ue.DataType = Si = {}));
function eC(e) {
  const t = L$(e.type);
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
Ue.getSchemaTypes = eC;
function L$(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(JI.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ue.getJSONTypes = L$;
function tC(e, t) {
  const { gen: r, data: n, opts: i } = e, s = rC(t, i.coerceTypes), a = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, QI.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const o = vf(t, n, i.strictNumbers, Si.Wrong);
    r.if(o, () => {
      s.length ? nC(e, t, s) : _f(e);
    });
  }
  return a;
}
Ue.coerceAndCheckDataType = tC;
const F$ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function rC(e, t) {
  return t ? e.filter((r) => F$.has(r) || t === "array" && r === "array") : [];
}
function nC(e, t, r) {
  const { gen: n, data: i, opts: s } = e, a = n.let("dataType", (0, le._)`typeof ${i}`), o = n.let("coerced", (0, le._)`undefined`);
  s.coerceTypes === "array" && n.if((0, le._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, le._)`${i}[0]`).assign(a, (0, le._)`typeof ${i}`).if(vf(t, i, s.strictNumbers), () => n.assign(o, i))), n.if((0, le._)`${o} !== undefined`);
  for (const u of r)
    (F$.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), _f(e), n.endIf(), n.if((0, le._)`${o} !== undefined`, () => {
    n.assign(i, o), iC(e, o);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, le._)`${a} == "number" || ${a} == "boolean"`).assign(o, (0, le._)`"" + ${i}`).elseIf((0, le._)`${i} === null`).assign(o, (0, le._)`""`);
        return;
      case "number":
        n.elseIf((0, le._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, le._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, le._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, le._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, le._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, le._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, le._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, le._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(o, (0, le._)`[${i}]`);
    }
  }
}
function iC({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, le._)`${t} !== undefined`, () => e.assign((0, le._)`${t}[${r}]`, n));
}
function pu(e, t, r, n = Si.Correct) {
  const i = n === Si.Correct ? le.operators.EQ : le.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, le._)`${t} ${i} null`;
    case "array":
      s = (0, le._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, le._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = a((0, le._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = a();
      break;
    default:
      return (0, le._)`typeof ${t} ${i} ${e}`;
  }
  return n === Si.Correct ? s : (0, le.not)(s);
  function a(o = le.nil) {
    return (0, le.and)((0, le._)`typeof ${t} == "number"`, o, r ? (0, le._)`isFinite(${t})` : le.nil);
  }
}
Ue.checkDataType = pu;
function vf(e, t, r, n) {
  if (e.length === 1)
    return pu(e[0], t, r, n);
  let i;
  const s = (0, k$.toHash)(e);
  if (s.array && s.object) {
    const a = (0, le._)`typeof ${t} != "object"`;
    i = s.null ? a : (0, le._)`!${t} || ${a}`, delete s.null, delete s.array, delete s.object;
  } else
    i = le.nil;
  s.number && delete s.integer;
  for (const a in s)
    i = (0, le.and)(i, pu(a, t, r, n));
  return i;
}
Ue.checkDataTypes = vf;
const sC = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, le._)`{type: ${e}}` : (0, le._)`{type: ${t}}`
};
function _f(e) {
  const t = aC(e);
  (0, ZI.reportError)(t, sC);
}
Ue.reportTypeError = _f;
function aC(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, k$.schemaRefOrVal)(e, n, "type");
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
var vc = {};
Object.defineProperty(vc, "__esModule", { value: !0 });
vc.assignDefaults = void 0;
const ai = oe, oC = K;
function cC(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Fm(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => Fm(e, s, i.default));
}
vc.assignDefaults = cC;
function Fm(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: a } = e;
  if (r === void 0)
    return;
  const o = (0, ai._)`${s}${(0, ai.getProperty)(t)}`;
  if (i) {
    (0, oC.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, ai._)`${o} === undefined`;
  a.useDefaults === "empty" && (c = (0, ai._)`${c} || ${o} === null || ${o} === ""`), n.if(c, (0, ai._)`${o} = ${(0, ai.stringify)(r)}`);
}
var hr = {}, pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.validateUnion = pe.validateArray = pe.usePattern = pe.callValidateCode = pe.schemaProperties = pe.allSchemaProperties = pe.noPropertyInData = pe.propertyInData = pe.isOwnProperty = pe.hasPropFunc = pe.reportMissingProp = pe.checkMissingProp = pe.checkReportMissingProp = void 0;
const Se = oe, Ef = K, zr = Ct, lC = K;
function uC(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(bf(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Se._)`${t}` }, !0), e.error();
  });
}
pe.checkReportMissingProp = uC;
function fC({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Se.or)(...n.map((s) => (0, Se.and)(bf(e, t, s, r.ownProperties), (0, Se._)`${i} = ${s}`)));
}
pe.checkMissingProp = fC;
function dC(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
pe.reportMissingProp = dC;
function j$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Se._)`Object.prototype.hasOwnProperty`
  });
}
pe.hasPropFunc = j$;
function wf(e, t, r) {
  return (0, Se._)`${j$(e)}.call(${t}, ${r})`;
}
pe.isOwnProperty = wf;
function hC(e, t, r, n) {
  const i = (0, Se._)`${t}${(0, Se.getProperty)(r)} !== undefined`;
  return n ? (0, Se._)`${i} && ${wf(e, t, r)}` : i;
}
pe.propertyInData = hC;
function bf(e, t, r, n) {
  const i = (0, Se._)`${t}${(0, Se.getProperty)(r)} === undefined`;
  return n ? (0, Se.or)(i, (0, Se.not)(wf(e, t, r))) : i;
}
pe.noPropertyInData = bf;
function U$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
pe.allSchemaProperties = U$;
function pC(e, t) {
  return U$(t).filter((r) => !(0, Ef.alwaysValidSchema)(e, t[r]));
}
pe.schemaProperties = pC;
function mC({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: a }, o, c, u) {
  const l = u ? (0, Se._)`${e}, ${t}, ${n}${i}` : t, f = [
    [zr.default.instancePath, (0, Se.strConcat)(zr.default.instancePath, s)],
    [zr.default.parentData, a.parentData],
    [zr.default.parentDataProperty, a.parentDataProperty],
    [zr.default.rootData, zr.default.rootData]
  ];
  a.opts.dynamicRef && f.push([zr.default.dynamicAnchors, zr.default.dynamicAnchors]);
  const p = (0, Se._)`${l}, ${r.object(...f)}`;
  return c !== Se.nil ? (0, Se._)`${o}.call(${c}, ${p})` : (0, Se._)`${o}(${p})`;
}
pe.callValidateCode = mC;
const yC = (0, Se._)`new RegExp`;
function gC({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Se._)`${i.code === "new RegExp" ? yC : (0, lC.useFunc)(e, i)}(${r}, ${n})`
  });
}
pe.usePattern = gC;
function $C(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return a(() => t.assign(o, !1)), o;
  }
  return t.var(s, !0), a(() => t.break()), s;
  function a(o) {
    const c = t.const("len", (0, Se._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: Ef.Type.Num
      }, s), t.if((0, Se.not)(s), o);
    });
  }
}
pe.validateArray = $C;
function vC(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Ef.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, o);
    t.assign(a, (0, Se._)`${a} || ${o}`), e.mergeValidEvaluated(l, o) || t.if((0, Se.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
pe.validateUnion = vC;
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.validateKeywordUsage = hr.validSchemaType = hr.funcKeywordCode = hr.macroKeywordCode = void 0;
const lt = oe, Cn = Ct, _C = pe, EC = fa;
function wC(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: a } = e, o = t.macro.call(a.self, i, s, a), c = M$(r, n, o);
  a.opts.validateSchema !== !1 && a.self.validateSchema(o, !0);
  const u = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: lt.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
hr.macroKeywordCode = wC;
function bC(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: a, $data: o, it: c } = e;
  PC(c, t);
  const u = !o && t.compile ? t.compile.call(c.self, s, a, c) : t.validate, l = M$(n, i, u), f = n.let("valid");
  e.block$data(f, p), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function p() {
    if (t.errors === !1)
      m(), t.modifying && jm(e), v(() => e.error());
    else {
      const y = t.async ? h() : _();
      t.modifying && jm(e), v(() => SC(e, y));
    }
  }
  function h() {
    const y = n.let("ruleErrs", null);
    return n.try(() => m((0, lt._)`await `), (w) => n.assign(f, !1).if((0, lt._)`${w} instanceof ${c.ValidationError}`, () => n.assign(y, (0, lt._)`${w}.errors`), () => n.throw(w))), y;
  }
  function _() {
    const y = (0, lt._)`${l}.errors`;
    return n.assign(y, null), m(lt.nil), y;
  }
  function m(y = t.async ? (0, lt._)`await ` : lt.nil) {
    const w = c.opts.passContext ? Cn.default.this : Cn.default.self, R = !("compile" in t && !o || t.schema === !1);
    n.assign(f, (0, lt._)`${y}${(0, _C.callValidateCode)(e, l, w, R)}`, t.modifying);
  }
  function v(y) {
    var w;
    n.if((0, lt.not)((w = t.valid) !== null && w !== void 0 ? w : f), y);
  }
}
hr.funcKeywordCode = bC;
function jm(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, lt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function SC(e, t) {
  const { gen: r } = e;
  r.if((0, lt._)`Array.isArray(${t})`, () => {
    r.assign(Cn.default.vErrors, (0, lt._)`${Cn.default.vErrors} === null ? ${t} : ${Cn.default.vErrors}.concat(${t})`).assign(Cn.default.errors, (0, lt._)`${Cn.default.vErrors}.length`), (0, EC.extendErrors)(e);
  }, () => e.error());
}
function PC({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function M$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, lt.stringify)(r) });
}
function TC(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
hr.validSchemaType = TC;
function RC({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
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
hr.validateKeywordUsage = RC;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.extendSubschemaMode = ln.extendSubschemaData = ln.getSubschema = void 0;
const fr = oe, x$ = K;
function NC(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, fr._)`${e.schemaPath}${(0, fr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, fr._)`${e.schemaPath}${(0, fr.getProperty)(t)}${(0, fr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, x$.escapeFragment)(r)}`
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
ln.getSubschema = NC;
function OC(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, p = o.let("data", (0, fr._)`${t.data}${(0, fr.getProperty)(r)}`, !0);
    c(p), e.errorPath = (0, fr.str)`${u}${(0, x$.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, fr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof fr.Name ? i : o.let("data", i, !0);
    c(u), a !== void 0 && (e.propertyName = a);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
ln.extendSubschemaData = OC;
function AC(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
ln.extendSubschemaMode = AC;
var Ke = {}, _c = function e(t, r) {
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
}, V$ = { exports: {} }, an = V$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  mo(t, n, i, e, "", e);
};
an.keywords = {
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
an.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
an.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
an.skipKeywords = {
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
function mo(e, t, r, n, i, s, a, o, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, a, o, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in an.arrayKeywords)
          for (var p = 0; p < f.length; p++)
            mo(e, t, r, f[p], i + "/" + l + "/" + p, s, i, l, n, p);
      } else if (l in an.propsKeywords) {
        if (f && typeof f == "object")
          for (var h in f)
            mo(e, t, r, f[h], i + "/" + l + "/" + IC(h), s, i, l, n, h);
      } else (l in an.keywords || e.allKeys && !(l in an.skipKeywords)) && mo(e, t, r, f, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, a, o, c, u);
  }
}
function IC(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var CC = V$.exports;
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.getSchemaRefs = Ke.resolveUrl = Ke.normalizeId = Ke._getFullPath = Ke.getFullPath = Ke.inlineRef = void 0;
const DC = K, kC = _c, LC = CC, FC = /* @__PURE__ */ new Set([
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
function jC(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !mu(e) : t ? q$(e) <= t : !1;
}
Ke.inlineRef = jC;
const UC = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function mu(e) {
  for (const t in e) {
    if (UC.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(mu) || typeof r == "object" && mu(r))
      return !0;
  }
  return !1;
}
function q$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !FC.has(r) && (typeof e[r] == "object" && (0, DC.eachItem)(e[r], (n) => t += q$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function B$(e, t = "", r) {
  r !== !1 && (t = Pi(t));
  const n = e.parse(t);
  return G$(e, n);
}
Ke.getFullPath = B$;
function G$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ke._getFullPath = G$;
const MC = /#\/?$/;
function Pi(e) {
  return e ? e.replace(MC, "") : "";
}
Ke.normalizeId = Pi;
function xC(e, t, r) {
  return r = Pi(r), e.resolve(t, r);
}
Ke.resolveUrl = xC;
const VC = /^[a-z_][-a-z0-9._]*$/i;
function qC(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Pi(e[r] || t), s = { "": i }, a = B$(n, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return LC(e, { allKeys: !0 }, (f, p, h, _) => {
    if (_ === void 0)
      return;
    const m = a + p;
    let v = s[_];
    typeof f[r] == "string" && (v = y.call(this, f[r])), w.call(this, f.$anchor), w.call(this, f.$dynamicAnchor), s[p] = v;
    function y(R) {
      const C = this.opts.uriResolver.resolve;
      if (R = Pi(v ? C(v, R) : R), c.has(R))
        throw l(R);
      c.add(R);
      let M = this.refs[R];
      return typeof M == "string" && (M = this.refs[M]), typeof M == "object" ? u(f, M.schema, R) : R !== Pi(m) && (R[0] === "#" ? (u(f, o[R], R), o[R] = f) : this.refs[R] = m), R;
    }
    function w(R) {
      if (typeof R == "string") {
        if (!VC.test(R))
          throw new Error(`invalid anchor "${R}"`);
        y.call(this, `#${R}`);
      }
    }
  }), o;
  function u(f, p, h) {
    if (p !== void 0 && !kC(f, p))
      throw l(h);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Ke.getSchemaRefs = qC;
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.getData = Zt.KeywordCxt = Zt.validateFunctionCode = void 0;
const H$ = ki, Um = Ue, Sf = Or, jo = Ue, BC = vc, Es = hr, Nl = ln, Z = oe, ne = Ct, GC = Ke, Ar = K, os = fa;
function HC(e) {
  if (W$(e) && (Y$(e), K$(e))) {
    WC(e);
    return;
  }
  z$(e, () => (0, H$.topBoolOrEmptySchema)(e));
}
Zt.validateFunctionCode = HC;
function z$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, Z._)`${ne.default.data}, ${ne.default.valCxt}`, n.$async, () => {
    e.code((0, Z._)`"use strict"; ${Mm(r, i)}`), KC(e, i), e.code(s);
  }) : e.func(t, (0, Z._)`${ne.default.data}, ${zC(i)}`, n.$async, () => e.code(Mm(r, i)).code(s));
}
function zC(e) {
  return (0, Z._)`{${ne.default.instancePath}="", ${ne.default.parentData}, ${ne.default.parentDataProperty}, ${ne.default.rootData}=${ne.default.data}${e.dynamicRef ? (0, Z._)`, ${ne.default.dynamicAnchors}={}` : Z.nil}}={}`;
}
function KC(e, t) {
  e.if(ne.default.valCxt, () => {
    e.var(ne.default.instancePath, (0, Z._)`${ne.default.valCxt}.${ne.default.instancePath}`), e.var(ne.default.parentData, (0, Z._)`${ne.default.valCxt}.${ne.default.parentData}`), e.var(ne.default.parentDataProperty, (0, Z._)`${ne.default.valCxt}.${ne.default.parentDataProperty}`), e.var(ne.default.rootData, (0, Z._)`${ne.default.valCxt}.${ne.default.rootData}`), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, Z._)`${ne.default.valCxt}.${ne.default.dynamicAnchors}`);
  }, () => {
    e.var(ne.default.instancePath, (0, Z._)`""`), e.var(ne.default.parentData, (0, Z._)`undefined`), e.var(ne.default.parentDataProperty, (0, Z._)`undefined`), e.var(ne.default.rootData, ne.default.data), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, Z._)`{}`);
  });
}
function WC(e) {
  const { schema: t, opts: r, gen: n } = e;
  z$(e, () => {
    r.$comment && t.$comment && J$(e), ZC(e), n.let(ne.default.vErrors, null), n.let(ne.default.errors, 0), r.unevaluated && YC(e), X$(e), rD(e);
  });
}
function YC(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Z._)`${r}.evaluated`), t.if((0, Z._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Z._)`${e.evaluated}.props`, (0, Z._)`undefined`)), t.if((0, Z._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Z._)`${e.evaluated}.items`, (0, Z._)`undefined`));
}
function Mm(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Z._)`/*# sourceURL=${r} */` : Z.nil;
}
function XC(e, t) {
  if (W$(e) && (Y$(e), K$(e))) {
    JC(e, t);
    return;
  }
  (0, H$.boolOrEmptySchema)(e, t);
}
function K$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function W$(e) {
  return typeof e.schema != "boolean";
}
function JC(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && J$(e), eD(e), tD(e);
  const s = n.const("_errs", ne.default.errors);
  X$(e, s), n.var(t, (0, Z._)`${s} === ${ne.default.errors}`);
}
function Y$(e) {
  (0, Ar.checkUnknownRules)(e), QC(e);
}
function X$(e, t) {
  if (e.opts.jtd)
    return xm(e, [], !1, t);
  const r = (0, Um.getSchemaTypes)(e.schema), n = (0, Um.coerceAndCheckDataType)(e, r);
  xm(e, r, !n, t);
}
function QC(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Ar.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function ZC(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Ar.checkStrictMode)(e, "default is ignored in the schema root");
}
function eD(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, GC.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function tD(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function J$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, Z._)`${ne.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const a = (0, Z.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, Z._)`${ne.default.self}.opts.$comment(${s}, ${a}, ${o}.schema)`);
  }
}
function rD(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, Z._)`${ne.default.errors} === 0`, () => t.return(ne.default.data), () => t.throw((0, Z._)`new ${i}(${ne.default.vErrors})`)) : (t.assign((0, Z._)`${n}.errors`, ne.default.vErrors), s.unevaluated && nD(e), t.return((0, Z._)`${ne.default.errors} === 0`));
}
function nD({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Z.Name && e.assign((0, Z._)`${t}.props`, r), n instanceof Z.Name && e.assign((0, Z._)`${t}.items`, n);
}
function xm(e, t, r, n) {
  const { gen: i, schema: s, data: a, allErrors: o, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, Ar.schemaHasRulesButRef)(s, l))) {
    i.block(() => ev(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || iD(e, t), i.block(() => {
    for (const p of l.rules)
      f(p);
    f(l.post);
  });
  function f(p) {
    (0, Sf.shouldUseGroup)(s, p) && (p.type ? (i.if((0, jo.checkDataType)(p.type, a, c.strictNumbers)), Vm(e, p), t.length === 1 && t[0] === p.type && r && (i.else(), (0, jo.reportTypeError)(e)), i.endIf()) : Vm(e, p), o || i.if((0, Z._)`${ne.default.errors} === ${n || 0}`));
  }
}
function Vm(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, BC.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, Sf.shouldUseRule)(n, s) && ev(e, s.keyword, s.definition, t.type);
  });
}
function iD(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (sD(e, t), e.opts.allowUnionTypes || aD(e, t), oD(e, e.dataTypes));
}
function sD(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Q$(e.dataTypes, r) || Pf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), lD(e, t);
  }
}
function aD(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Pf(e, "use allowUnionTypes to allow union type keyword");
}
function oD(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, Sf.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((a) => cD(t, a)) && Pf(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function cD(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Q$(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function lD(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Q$(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Pf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Ar.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Z$ = class {
  constructor(t, r, n) {
    if ((0, Es.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Ar.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", tv(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Es.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ne.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Z.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Z.not)(t), void 0, r);
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
    this.fail((0, Z._)`${r} !== undefined && (${(0, Z.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? os.reportExtraError : os.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, os.reportError)(this, this.def.$dataError || os.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, os.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = Z.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Z.nil, r = Z.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: a } = this;
    n.if((0, Z.or)((0, Z._)`${i} === undefined`, r)), t !== Z.nil && n.assign(t, !0), (s.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Z.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, Z.or)(a(), o());
    function a() {
      if (n.length) {
        if (!(r instanceof Z.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, Z._)`${(0, jo.checkDataTypes)(c, r, s.opts.strictNumbers, jo.DataType.Wrong)}`;
      }
      return Z.nil;
    }
    function o() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, Z._)`!${c}(${r})`;
      }
      return Z.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Nl.getSubschema)(this.it, t);
    (0, Nl.extendSubschemaData)(n, this.it, t), (0, Nl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return XC(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Ar.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Ar.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, Z.Name)), !0;
  }
};
Zt.KeywordCxt = Z$;
function ev(e, t, r, n) {
  const i = new Z$(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Es.funcKeywordCode)(i, r) : "macro" in r ? (0, Es.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Es.funcKeywordCode)(i, r);
}
const uD = /^\/(?:[^~]|~0|~1)*$/, fD = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function tv(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ne.default.rootData;
  if (e[0] === "/") {
    if (!uD.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ne.default.rootData;
  } else {
    const u = fD.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
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
  for (const u of o)
    u && (s = (0, Z._)`${s}${(0, Z.getProperty)((0, Ar.unescapeJsonPointer)(u))}`, a = (0, Z._)`${a} && ${s}`);
  return a;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
Zt.getData = tv;
var da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
let dD = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
da.default = dD;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
const Ol = Ke;
let hD = class extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ol.resolveUrl)(t, r, n), this.missingSchema = (0, Ol.normalizeId)((0, Ol.getFullPath)(t, this.missingRef));
  }
};
Bi.default = hD;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.resolveSchema = ft.getCompilingSchema = ft.resolveRef = ft.compileSchema = ft.SchemaEnv = void 0;
const Ht = oe, pD = da, Rn = Ct, Jt = Ke, qm = K, mD = Zt;
let Ec = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Jt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
ft.SchemaEnv = Ec;
function Tf(e) {
  const t = rv.call(this, e);
  if (t)
    return t;
  const r = (0, Jt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, a = new Ht.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let o;
  e.$async && (o = a.scopeValue("Error", {
    ref: pD.default,
    code: (0, Ht._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Rn.default.data,
    parentData: Rn.default.parentData,
    parentDataProperty: Rn.default.parentDataProperty,
    dataNames: [Rn.default.data],
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
    this._compilations.add(e), (0, mD.validateFunctionCode)(u), a.optimize(this.opts.code.optimize);
    const f = a.toString();
    l = `${a.scopeRefs(Rn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${Rn.default.self}`, `${Rn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: f, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: _, items: m } = u;
      h.evaluated = {
        props: _ instanceof Ht.Name ? void 0 : _,
        items: m instanceof Ht.Name ? void 0 : m,
        dynamicProps: _ instanceof Ht.Name,
        dynamicItems: m instanceof Ht.Name
      }, h.source && (h.source.evaluated = (0, Ht.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
ft.compileSchema = Tf;
function yD(e, t, r) {
  var n;
  r = (0, Jt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = vD.call(this, e, r);
  if (s === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    a && (s = new Ec({ schema: a, schemaId: o, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = gD.call(this, s);
}
ft.resolveRef = yD;
function gD(e) {
  return (0, Jt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Tf.call(this, e);
}
function rv(e) {
  for (const t of this._compilations)
    if ($D(t, e))
      return t;
}
ft.getCompilingSchema = rv;
function $D(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function vD(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || wc.call(this, e, t);
}
function wc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Jt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Jt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Al.call(this, r, e);
  const s = (0, Jt.normalizeId)(n), a = this.refs[s] || this.schemas[s];
  if (typeof a == "string") {
    const o = wc.call(this, e, a);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : Al.call(this, r, o);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Tf.call(this, a), s === (0, Jt.normalizeId)(t)) {
      const { schema: o } = a, { schemaId: c } = this.opts, u = o[c];
      return u && (i = (0, Jt.resolveUrl)(this.opts.uriResolver, i, u)), new Ec({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return Al.call(this, r, a);
  }
}
ft.resolveSchema = wc;
const _D = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Al(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, qm.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !_D.has(o) && u && (t = (0, Jt.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, qm.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Jt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = wc.call(this, n, o);
  }
  const { schemaId: a } = this.opts;
  if (s = s || new Ec({ schema: r, schemaId: a, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const ED = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", wD = "Meta-schema for $data reference (JSON AnySchema extension proposal)", bD = "object", SD = [
  "$data"
], PD = {
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
}, TD = !1, RD = {
  $id: ED,
  description: wD,
  type: bD,
  required: SD,
  properties: PD,
  additionalProperties: TD
};
var Rf = {}, bc = { exports: {} };
const ND = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), nv = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function iv(e) {
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
const OD = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Bm(e) {
  return e.length = 0, !0;
}
function AD(e, t, r) {
  if (e.length) {
    const n = iv(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function ID(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let s = !1, a = !1, o = AD;
  for (let c = 0; c < e.length; c++) {
    const u = e[c];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (s === !0 && (a = !0), !o(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (s = !0), n.push(":");
        continue;
      } else if (u === "%") {
        if (!o(i, n, r))
          break;
        o = Bm;
      } else {
        i.push(u);
        continue;
      }
  }
  return i.length && (o === Bm ? r.zone = i.join("") : a ? n.push(i.join("")) : n.push(iv(i))), r.address = n.join(""), r;
}
function sv(e) {
  if (CD(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = ID(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function CD(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function DD(e) {
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
function kD(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function LD(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!nv(r)) {
      const n = sv(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var av = {
  nonSimpleDomain: OD,
  recomposeAuthority: LD,
  normalizeComponentEncoding: kD,
  removeDotSegments: DD,
  isIPv4: nv,
  isUUID: ND,
  normalizeIPv6: sv
};
const { isUUID: FD } = av, jD = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function ov(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function cv(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function lv(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function UD(e) {
  return e.secure = ov(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function MD(e) {
  if ((e.port === (ov(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function xD(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(jD);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, s = Nf(i);
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function VD(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, s = Nf(i);
  s && (e = s.serialize(e, t));
  const a = e, o = e.nss;
  return a.path = `${n || t.nid}:${o}`, t.skipEscape = !0, a;
}
function qD(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !FD(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function BD(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const uv = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: cv,
    serialize: lv
  }
), GD = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: uv.domainHost,
    parse: cv,
    serialize: lv
  }
), yo = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: UD,
    serialize: MD
  }
), HD = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: yo.domainHost,
    parse: yo.parse,
    serialize: yo.serialize
  }
), zD = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: xD,
    serialize: VD,
    skipNormalize: !0
  }
), KD = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: qD,
    serialize: BD,
    skipNormalize: !0
  }
), Uo = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: uv,
    https: GD,
    ws: yo,
    wss: HD,
    urn: zD,
    "urn:uuid": KD
  }
);
Object.setPrototypeOf(Uo, null);
function Nf(e) {
  return e && (Uo[
    /** @type {SchemeName} */
    e
  ] || Uo[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var WD = {
  SCHEMES: Uo,
  getSchemeHandler: Nf
};
const { normalizeIPv6: YD, removeDotSegments: ps, recomposeAuthority: XD, normalizeComponentEncoding: Ga, isIPv4: JD, nonSimpleDomain: QD } = av, { SCHEMES: ZD, getSchemeHandler: fv } = WD;
function ek(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  pr(Lr(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Lr(pr(e, t), t)), e;
}
function tk(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = dv(Lr(e, n), Lr(t, n), n, !0);
  return n.skipEscape = !0, pr(i, n);
}
function dv(e, t, r, n) {
  const i = {};
  return n || (e = Lr(pr(e, r), r), t = Lr(pr(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = ps(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = ps(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = ps(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = ps(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function rk(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = pr(Ga(Lr(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = pr(Ga(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = pr(Ga(Lr(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = pr(Ga(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function pr(e, t) {
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
  }, n = Object.assign({}, t), i = [], s = fv(n.scheme || r.scheme);
  s && s.serialize && s.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const a = XD(r);
  if (a !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(a), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!s || !s.absolutePath) && (o = ps(o)), a === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), i.push(o);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const nk = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Lr(e, t) {
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
  const s = e.match(nk);
  if (s) {
    if (n.scheme = s[1], n.userinfo = s[3], n.host = s[4], n.port = parseInt(s[5], 10), n.path = s[6] || "", n.query = s[7], n.fragment = s[8], isNaN(n.port) && (n.port = s[5]), n.host)
      if (JD(n.host) === !1) {
        const c = YD(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const a = fv(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!a || !a.unicodeSupport) && n.host && (r.domainHost || a && a.domainHost) && i === !1 && QD(n.host))
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
const Of = {
  SCHEMES: ZD,
  normalize: ek,
  resolve: tk,
  resolveComponent: dv,
  equal: rk,
  serialize: pr,
  parse: Lr
};
bc.exports = Of;
bc.exports.default = Of;
bc.exports.fastUri = Of;
var hv = bc.exports;
Object.defineProperty(Rf, "__esModule", { value: !0 });
const pv = hv;
pv.code = 'require("ajv/dist/runtime/uri").default';
Rf.default = pv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Zt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = oe;
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
  const n = da, i = Bi, s = zn, a = ft, o = oe, c = Ke, u = Ue, l = K, f = RD, p = Rf, h = (O, b) => new RegExp(O, b);
  h.code = "new RegExp";
  const _ = ["removeAdditional", "useDefaults", "coerceTypes"], m = /* @__PURE__ */ new Set([
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
  ]), v = {
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
  function R(O) {
    var b, P, S, d, $, N, E, g, j, A, W, de, ge, we, Te, Je, $e, je, Vt, Dt, Rt, kt, _r, Er, wr;
    const Nt = O.strict, Lt = (b = O.code) === null || b === void 0 ? void 0 : b.optimize, br = Lt === !0 || Lt === void 0 ? 1 : Lt || 0, Ur = (S = (P = O.code) === null || P === void 0 ? void 0 : P.regExp) !== null && S !== void 0 ? S : h, _t = (d = O.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (N = ($ = O.strictSchema) !== null && $ !== void 0 ? $ : Nt) !== null && N !== void 0 ? N : !0,
      strictNumbers: (g = (E = O.strictNumbers) !== null && E !== void 0 ? E : Nt) !== null && g !== void 0 ? g : !0,
      strictTypes: (A = (j = O.strictTypes) !== null && j !== void 0 ? j : Nt) !== null && A !== void 0 ? A : "log",
      strictTuples: (de = (W = O.strictTuples) !== null && W !== void 0 ? W : Nt) !== null && de !== void 0 ? de : "log",
      strictRequired: (we = (ge = O.strictRequired) !== null && ge !== void 0 ? ge : Nt) !== null && we !== void 0 ? we : !1,
      code: O.code ? { ...O.code, optimize: br, regExp: Ur } : { optimize: br, regExp: Ur },
      loopRequired: (Te = O.loopRequired) !== null && Te !== void 0 ? Te : w,
      loopEnum: (Je = O.loopEnum) !== null && Je !== void 0 ? Je : w,
      meta: ($e = O.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (je = O.messages) !== null && je !== void 0 ? je : !0,
      inlineRefs: (Vt = O.inlineRefs) !== null && Vt !== void 0 ? Vt : !0,
      schemaId: (Dt = O.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Rt = O.addUsedSchema) !== null && Rt !== void 0 ? Rt : !0,
      validateSchema: (kt = O.validateSchema) !== null && kt !== void 0 ? kt : !0,
      validateFormats: (_r = O.validateFormats) !== null && _r !== void 0 ? _r : !0,
      unicodeRegExp: (Er = O.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (wr = O.int32range) !== null && wr !== void 0 ? wr : !0,
      uriResolver: _t
    };
  }
  class C {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...R(b) };
      const { es5: P, lines: S } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: m, es5: P, lines: S }), this.logger = G(b.logger);
      const d = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), M.call(this, v, b, "NOT SUPPORTED"), M.call(this, y, b, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), b.formats && he.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && I.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), z.call(this), b.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: P, schemaId: S } = this.opts;
      let d = f;
      S === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), P && b && this.addMetaSchema(d, d[S], !1);
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
      async function d(A, W) {
        await $.call(this, A.$schema);
        const de = this._addSchema(A, W);
        return de.validate || N.call(this, de);
      }
      async function $(A) {
        A && !this.getSchema(A) && await d.call(this, { $ref: A }, !0);
      }
      async function N(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return E.call(this, W), await g.call(this, W.missingSchema), N.call(this, A);
        }
      }
      function E({ missingSchema: A, missingRef: W }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${W} cannot be resolved`);
      }
      async function g(A) {
        const W = await j.call(this, A);
        this.refs[A] || await $.call(this, W.$schema), this.refs[A] || this.addSchema(W, A, P);
      }
      async function j(A) {
        const W = this._loading[A];
        if (W)
          return W;
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
      for (; typeof (P = H.call(this, b)) == "string"; )
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
          const P = H.call(this, b);
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
        return (0, l.eachItem)(S, ($) => D.call(this, $)), this;
      F.call(this, P);
      const d = {
        ...P,
        type: (0, u.getJSONTypes)(P.type),
        schemaType: (0, u.getJSONTypes)(P.schemaType)
      };
      return (0, l.eachItem)(S, d.type.length === 0 ? ($) => D.call(this, $, d) : ($) => d.type.forEach((N) => D.call(this, $, d, N))), this;
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
          const { $data: j } = g.definition, A = N[E];
          j && A && (N[E] = U(A));
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
      const j = c.getSchemaRefs.call(this, b, S);
      return g = new a.SchemaEnv({ schema: b, schemaId: E, meta: P, baseId: S, localRefs: j }), this._cache.set(g.schema, g), $ && !S.startsWith("#") && (S && this._checkUnique(S), this.refs[S] = g), d && this.validateSchema(b, !0), g;
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
  C.ValidationError = n.default, C.MissingRefError = i.default, e.default = C;
  function M(O, b, P, S = "error") {
    for (const d in O) {
      const $ = d;
      $ in b && this.logger[S](`${P}: option ${d}. ${O[$]}`);
    }
  }
  function H(O) {
    return O = (0, c.normalizeId)(O), this.schemas[O] || this.refs[O];
  }
  function z() {
    const O = this.opts.schemas;
    if (O)
      if (Array.isArray(O))
        this.addSchema(O);
      else
        for (const b in O)
          this.addSchema(O[b], b);
  }
  function he() {
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
  function Q() {
    const O = { ...this.opts };
    for (const b of _)
      delete O[b];
    return O;
  }
  const B = { log() {
  }, warn() {
  }, error() {
  } };
  function G(O) {
    if (O === !1)
      return B;
    if (O === void 0)
      return console;
    if (O.log && O.warn && O.error)
      return O;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(O, b) {
    const { RULES: P } = this;
    if ((0, l.eachItem)(O, (S) => {
      if (P.keywords[S])
        throw new Error(`Keyword ${S} is already defined`);
      if (!J.test(S))
        throw new Error(`Keyword ${S} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(O, b, P) {
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
        type: (0, u.getJSONTypes)(b.type),
        schemaType: (0, u.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? x.call(this, N, E, b.before) : N.rules.push(E), $.all[O] = E, (S = b.implements) === null || S === void 0 || S.forEach((g) => this.addKeyword(g));
  }
  function x(O, b, P) {
    const S = O.rules.findIndex((d) => d.keyword === P);
    S >= 0 ? O.rules.splice(S, 0, b) : (O.rules.push(b), this.logger.warn(`rule ${P} is not defined`));
  }
  function F(O) {
    let { metaSchema: b } = O;
    b !== void 0 && (O.$data && this.opts.$data && (b = U(b)), O.validateSchema = this.compile(b, !0));
  }
  const V = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function U(O) {
    return { anyOf: [O, V] };
  }
})(P$);
var Af = {}, If = {}, Cf = {};
Object.defineProperty(Cf, "__esModule", { value: !0 });
const ik = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Cf.default = ik;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.callRef = Fr.getValidate = void 0;
const sk = Bi, Gm = pe, wt = oe, oi = Ct, Hm = ft, Ha = K, ak = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: a, opts: o, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = Hm.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new sk.default(n.opts.uriResolver, i, r);
    if (l instanceof Hm.SchemaEnv)
      return p(l);
    return h(l);
    function f() {
      if (s === u)
        return go(e, a, s, s.$async);
      const _ = t.scopeValue("root", { ref: u });
      return go(e, (0, wt._)`${_}.validate`, u, u.$async);
    }
    function p(_) {
      const m = mv(e, _);
      go(e, m, _, _.$async);
    }
    function h(_) {
      const m = t.scopeValue("schema", o.code.source === !0 ? { ref: _, code: (0, wt.stringify)(_) } : { ref: _ }), v = t.name("valid"), y = e.subschema({
        schema: _,
        dataTypes: [],
        schemaPath: wt.nil,
        topSchemaRef: m,
        errSchemaPath: r
      }, v);
      e.mergeEvaluated(y), e.ok(v);
    }
  }
};
function mv(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, wt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Fr.getValidate = mv;
function go(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: a, schemaEnv: o, opts: c } = s, u = c.passContext ? oi.default.this : wt.nil;
  n ? l() : f();
  function l() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const _ = i.let("valid");
    i.try(() => {
      i.code((0, wt._)`await ${(0, Gm.callValidateCode)(e, t, u)}`), h(t), a || i.assign(_, !0);
    }, (m) => {
      i.if((0, wt._)`!(${m} instanceof ${s.ValidationError})`, () => i.throw(m)), p(m), a || i.assign(_, !1);
    }), e.ok(_);
  }
  function f() {
    e.result((0, Gm.callValidateCode)(e, t, u), () => h(t), () => p(t));
  }
  function p(_) {
    const m = (0, wt._)`${_}.errors`;
    i.assign(oi.default.vErrors, (0, wt._)`${oi.default.vErrors} === null ? ${m} : ${oi.default.vErrors}.concat(${m})`), i.assign(oi.default.errors, (0, wt._)`${oi.default.vErrors}.length`);
  }
  function h(_) {
    var m;
    if (!s.opts.unevaluated)
      return;
    const v = (m = r == null ? void 0 : r.validate) === null || m === void 0 ? void 0 : m.evaluated;
    if (s.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (s.props = Ha.mergeEvaluated.props(i, v.props, s.props));
      else {
        const y = i.var("props", (0, wt._)`${_}.evaluated.props`);
        s.props = Ha.mergeEvaluated.props(i, y, s.props, wt.Name);
      }
    if (s.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (s.items = Ha.mergeEvaluated.items(i, v.items, s.items));
      else {
        const y = i.var("items", (0, wt._)`${_}.evaluated.items`);
        s.items = Ha.mergeEvaluated.items(i, y, s.items, wt.Name);
      }
  }
}
Fr.callRef = go;
Fr.default = ak;
Object.defineProperty(If, "__esModule", { value: !0 });
const ok = Cf, ck = Fr, lk = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  ok.default,
  ck.default
];
If.default = lk;
var Df = {}, kf = {};
Object.defineProperty(kf, "__esModule", { value: !0 });
const Mo = oe, Kr = Mo.operators, xo = {
  maximum: { okStr: "<=", ok: Kr.LTE, fail: Kr.GT },
  minimum: { okStr: ">=", ok: Kr.GTE, fail: Kr.LT },
  exclusiveMaximum: { okStr: "<", ok: Kr.LT, fail: Kr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Kr.GT, fail: Kr.LTE }
}, uk = {
  message: ({ keyword: e, schemaCode: t }) => (0, Mo.str)`must be ${xo[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Mo._)`{comparison: ${xo[e].okStr}, limit: ${t}}`
}, fk = {
  keyword: Object.keys(xo),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: uk,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Mo._)`${r} ${xo[t].fail} ${n} || isNaN(${r})`);
  }
};
kf.default = fk;
var Lf = {};
Object.defineProperty(Lf, "__esModule", { value: !0 });
const ws = oe, dk = {
  message: ({ schemaCode: e }) => (0, ws.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, ws._)`{multipleOf: ${e}}`
}, hk = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: dk,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, a = t.let("res"), o = s ? (0, ws._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}` : (0, ws._)`${a} !== parseInt(${a})`;
    e.fail$data((0, ws._)`(${n} === 0 || (${a} = ${r}/${n}, ${o}))`);
  }
};
Lf.default = hk;
var Ff = {}, jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
function yv(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
jf.default = yv;
yv.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ff, "__esModule", { value: !0 });
const Dn = oe, pk = K, mk = jf, yk = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Dn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Dn._)`{limit: ${e}}`
}, gk = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: yk,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Dn.operators.GT : Dn.operators.LT, a = i.opts.unicode === !1 ? (0, Dn._)`${r}.length` : (0, Dn._)`${(0, pk.useFunc)(e.gen, mk.default)}(${r})`;
    e.fail$data((0, Dn._)`${a} ${s} ${n}`);
  }
};
Ff.default = gk;
var Uf = {};
Object.defineProperty(Uf, "__esModule", { value: !0 });
const $k = pe, Vo = oe, vk = {
  message: ({ schemaCode: e }) => (0, Vo.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Vo._)`{pattern: ${e}}`
}, _k = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: vk,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, a = s.opts.unicodeRegExp ? "u" : "", o = r ? (0, Vo._)`(new RegExp(${i}, ${a}))` : (0, $k.usePattern)(e, n);
    e.fail$data((0, Vo._)`!${o}.test(${t})`);
  }
};
Uf.default = _k;
var Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const bs = oe, Ek = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, bs.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, bs._)`{limit: ${e}}`
}, wk = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Ek,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? bs.operators.GT : bs.operators.LT;
    e.fail$data((0, bs._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Mf.default = wk;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const cs = pe, Ss = oe, bk = K, Sk = {
  message: ({ params: { missingProperty: e } }) => (0, Ss.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Ss._)`{missingProperty: ${e}}`
}, Pk = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Sk,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: a } = e, { opts: o } = a;
    if (!s && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (a.allErrors ? u() : l(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: _ } = e.it;
      for (const m of r)
        if ((h == null ? void 0 : h[m]) === void 0 && !_.has(m)) {
          const v = a.schemaEnv.baseId + a.errSchemaPath, y = `required property "${m}" is not defined at "${v}" (strictRequired)`;
          (0, bk.checkStrictMode)(a, y, a.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(Ss.nil, f);
      else
        for (const h of r)
          (0, cs.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || s) {
        const _ = t.let("valid", !0);
        e.block$data(_, () => p(h, _)), e.ok(_);
      } else
        t.if((0, cs.checkMissingProp)(e, r, h)), (0, cs.reportMissingProp)(e, h), t.else();
    }
    function f() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, cs.noPropertyInData)(t, i, h, o.ownProperties), () => e.error());
      });
    }
    function p(h, _) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(_, (0, cs.propertyInData)(t, i, h, o.ownProperties)), t.if((0, Ss.not)(_), () => {
          e.error(), t.break();
        });
      }, Ss.nil);
    }
  }
};
xf.default = Pk;
var Vf = {};
Object.defineProperty(Vf, "__esModule", { value: !0 });
const Ps = oe, Tk = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Ps.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Ps._)`{limit: ${e}}`
}, Rk = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Tk,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Ps.operators.GT : Ps.operators.LT;
    e.fail$data((0, Ps._)`${r}.length ${i} ${n}`);
  }
};
Vf.default = Rk;
var qf = {}, ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const gv = _c;
gv.code = 'require("ajv/dist/runtime/equal").default';
ha.default = gv;
Object.defineProperty(qf, "__esModule", { value: !0 });
const Il = Ue, He = oe, Nk = K, Ok = ha, Ak = {
  message: ({ params: { i: e, j: t } }) => (0, He.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, He._)`{i: ${e}, j: ${t}}`
}, Ik = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Ak,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: a, it: o } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, Il.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, He._)`${a} === false`), e.ok(c);
    function l() {
      const _ = t.let("i", (0, He._)`${r}.length`), m = t.let("j");
      e.setParams({ i: _, j: m }), t.assign(c, !0), t.if((0, He._)`${_} > 1`, () => (f() ? p : h)(_, m));
    }
    function f() {
      return u.length > 0 && !u.some((_) => _ === "object" || _ === "array");
    }
    function p(_, m) {
      const v = t.name("item"), y = (0, Il.checkDataTypes)(u, v, o.opts.strictNumbers, Il.DataType.Wrong), w = t.const("indices", (0, He._)`{}`);
      t.for((0, He._)`;${_}--;`, () => {
        t.let(v, (0, He._)`${r}[${_}]`), t.if(y, (0, He._)`continue`), u.length > 1 && t.if((0, He._)`typeof ${v} == "string"`, (0, He._)`${v} += "_"`), t.if((0, He._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign(m, (0, He._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, He._)`${w}[${v}] = ${_}`);
      });
    }
    function h(_, m) {
      const v = (0, Nk.useFunc)(t, Ok.default), y = t.name("outer");
      t.label(y).for((0, He._)`;${_}--;`, () => t.for((0, He._)`${m} = ${_}; ${m}--;`, () => t.if((0, He._)`${v}(${r}[${_}], ${r}[${m}])`, () => {
        e.error(), t.assign(c, !1).break(y);
      })));
    }
  }
};
qf.default = Ik;
var Bf = {};
Object.defineProperty(Bf, "__esModule", { value: !0 });
const yu = oe, Ck = K, Dk = ha, kk = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, yu._)`{allowedValue: ${e}}`
}, Lk = {
  keyword: "const",
  $data: !0,
  error: kk,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, yu._)`!${(0, Ck.useFunc)(t, Dk.default)}(${r}, ${i})`) : e.fail((0, yu._)`${s} !== ${r}`);
  }
};
Bf.default = Lk;
var Gf = {};
Object.defineProperty(Gf, "__esModule", { value: !0 });
const ms = oe, Fk = K, jk = ha, Uk = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, ms._)`{allowedValues: ${e}}`
}, Mk = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Uk,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= a.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, Fk.useFunc)(t, jk.default));
    let l;
    if (o || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", s);
      l = (0, ms.or)(...i.map((_, m) => p(h, m)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (h) => t.if((0, ms._)`${u()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, _) {
      const m = i[_];
      return typeof m == "object" && m !== null ? (0, ms._)`${u()}(${r}, ${h}[${_}])` : (0, ms._)`${r} === ${m}`;
    }
  }
};
Gf.default = Mk;
Object.defineProperty(Df, "__esModule", { value: !0 });
const xk = kf, Vk = Lf, qk = Ff, Bk = Uf, Gk = Mf, Hk = xf, zk = Vf, Kk = qf, Wk = Bf, Yk = Gf, Xk = [
  // number
  xk.default,
  Vk.default,
  // string
  qk.default,
  Bk.default,
  // object
  Gk.default,
  Hk.default,
  // array
  zk.default,
  Kk.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Wk.default,
  Yk.default
];
Df.default = Xk;
var Hf = {}, Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.validateAdditionalItems = void 0;
const kn = oe, gu = K, Jk = {
  message: ({ params: { len: e } }) => (0, kn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, kn._)`{limit: ${e}}`
}, Qk = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Jk,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, gu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    $v(e, n);
  }
};
function $v(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: a } = e;
  a.items = !0;
  const o = r.const("len", (0, kn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, kn._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, gu.alwaysValidSchema)(a, n)) {
    const u = r.var("valid", (0, kn._)`${o} <= ${t.length}`);
    r.if((0, kn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, o, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: gu.Type.Num }, u), a.allErrors || r.if((0, kn.not)(u), () => r.break());
    });
  }
}
Gi.validateAdditionalItems = $v;
Gi.default = Qk;
var zf = {}, Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.validateTuple = void 0;
const zm = oe, $o = K, Zk = pe, eL = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return vv(e, "additionalItems", t);
    r.items = !0, !(0, $o.alwaysValidSchema)(r, t) && e.ok((0, Zk.validateArray)(e));
  }
};
function vv(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: a, it: o } = e;
  l(i), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = $o.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), u = n.const("len", (0, zm._)`${s}.length`);
  r.forEach((f, p) => {
    (0, $o.alwaysValidSchema)(o, f) || (n.if((0, zm._)`${u} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: p, errSchemaPath: h } = o, _ = r.length, m = _ === f.minItems && (_ === f.maxItems || f[t] === !1);
    if (p.strictTuples && !m) {
      const v = `"${a}" is ${_}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, $o.checkStrictMode)(o, v, p.strictTuples);
    }
  }
}
Hi.validateTuple = vv;
Hi.default = eL;
Object.defineProperty(zf, "__esModule", { value: !0 });
const tL = Hi, rL = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, tL.validateTuple)(e, "items")
};
zf.default = rL;
var Kf = {};
Object.defineProperty(Kf, "__esModule", { value: !0 });
const Km = oe, nL = K, iL = pe, sL = Gi, aL = {
  message: ({ params: { len: e } }) => (0, Km.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Km._)`{limit: ${e}}`
}, oL = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: aL,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, nL.alwaysValidSchema)(n, t) && (i ? (0, sL.validateAdditionalItems)(e, i) : e.ok((0, iL.validateArray)(e)));
  }
};
Kf.default = oL;
var Wf = {};
Object.defineProperty(Wf, "__esModule", { value: !0 });
const Mt = oe, za = K, cL = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Mt.str)`must contain at least ${e} valid item(s)` : (0, Mt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Mt._)`{minContains: ${e}}` : (0, Mt._)`{minContains: ${e}, maxContains: ${t}}`
}, lL = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: cL,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let a, o;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (a = c === void 0 ? 1 : c, o = u) : a = 1;
    const l = t.const("len", (0, Mt._)`${i}.length`);
    if (e.setParams({ min: a, max: o }), o === void 0 && a === 0) {
      (0, za.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && a > o) {
      (0, za.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, za.alwaysValidSchema)(s, r)) {
      let m = (0, Mt._)`${l} >= ${a}`;
      o !== void 0 && (m = (0, Mt._)`${m} && ${l} <= ${o}`), e.pass(m);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    o === void 0 && a === 1 ? h(f, () => t.if(f, () => t.break())) : a === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, Mt._)`${i}.length > 0`, p)) : (t.let(f, !1), p()), e.result(f, () => e.reset());
    function p() {
      const m = t.name("_valid"), v = t.let("count", 0);
      h(m, () => t.if(m, () => _(v)));
    }
    function h(m, v) {
      t.forRange("i", 0, l, (y) => {
        e.subschema({
          keyword: "contains",
          dataProp: y,
          dataPropType: za.Type.Num,
          compositeRule: !0
        }, m), v();
      });
    }
    function _(m) {
      t.code((0, Mt._)`${m}++`), o === void 0 ? t.if((0, Mt._)`${m} >= ${a}`, () => t.assign(f, !0).break()) : (t.if((0, Mt._)`${m} > ${o}`, () => t.assign(f, !1).break()), a === 1 ? t.assign(f, !0) : t.if((0, Mt._)`${m} >= ${a}`, () => t.assign(f, !0)));
    }
  }
};
Wf.default = lL;
var Sc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = K, n = pe;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      a(c, u), o(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const p = Array.isArray(c[f]) ? u : l;
      p[f] = c[f];
    }
    return [u, l];
  }
  function a(c, u = c.schema) {
    const { gen: l, data: f, it: p } = c;
    if (Object.keys(u).length === 0)
      return;
    const h = l.let("missing");
    for (const _ in u) {
      const m = u[_];
      if (m.length === 0)
        continue;
      const v = (0, n.propertyInData)(l, f, _, p.opts.ownProperties);
      c.setParams({
        property: _,
        depsCount: m.length,
        deps: m.join(", ")
      }), p.allErrors ? l.if(v, () => {
        for (const y of m)
          (0, n.checkReportMissingProp)(c, y);
      }) : (l.if((0, t._)`${v} && (${(0, n.checkMissingProp)(c, m, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function o(c, u = c.schema) {
    const { gen: l, data: f, keyword: p, it: h } = c, _ = l.name("valid");
    for (const m in u)
      (0, r.alwaysValidSchema)(h, u[m]) || (l.if(
        (0, n.propertyInData)(l, f, m, h.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: p, schemaProp: m }, _);
          c.mergeValidEvaluated(v, _);
        },
        () => l.var(_, !0)
        // TODO var
      ), c.ok(_));
  }
  e.validateSchemaDeps = o, e.default = i;
})(Sc);
var Yf = {};
Object.defineProperty(Yf, "__esModule", { value: !0 });
const _v = oe, uL = K, fL = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, _v._)`{propertyName: ${e.propertyName}}`
}, dL = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: fL,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, uL.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, s), t.if((0, _v.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Yf.default = dL;
var Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
const Ka = pe, Kt = oe, hL = Ct, Wa = K, pL = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Kt._)`{additionalProperty: ${e.additionalProperty}}`
}, mL = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: pL,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Wa.alwaysValidSchema)(a, r))
      return;
    const u = (0, Ka.allSchemaProperties)(n.properties), l = (0, Ka.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Kt._)`${s} === ${hL.default.errors}`);
    function f() {
      t.forIn("key", i, (v) => {
        !u.length && !l.length ? _(v) : t.if(p(v), () => _(v));
      });
    }
    function p(v) {
      let y;
      if (u.length > 8) {
        const w = (0, Wa.schemaRefOrVal)(a, n.properties, "properties");
        y = (0, Ka.isOwnProperty)(t, w, v);
      } else u.length ? y = (0, Kt.or)(...u.map((w) => (0, Kt._)`${v} === ${w}`)) : y = Kt.nil;
      return l.length && (y = (0, Kt.or)(y, ...l.map((w) => (0, Kt._)`${(0, Ka.usePattern)(e, w)}.test(${v})`))), (0, Kt.not)(y);
    }
    function h(v) {
      t.code((0, Kt._)`delete ${i}[${v}]`);
    }
    function _(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(v);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: v }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Wa.alwaysValidSchema)(a, r)) {
        const y = t.name("valid");
        c.removeAdditional === "failing" ? (m(v, y, !1), t.if((0, Kt.not)(y), () => {
          e.reset(), h(v);
        })) : (m(v, y), o || t.if((0, Kt.not)(y), () => t.break()));
      }
    }
    function m(v, y, w) {
      const R = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: Wa.Type.Str
      };
      w === !1 && Object.assign(R, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(R, y);
    }
  }
};
Pc.default = mL;
var Xf = {};
Object.defineProperty(Xf, "__esModule", { value: !0 });
const yL = Zt, Wm = pe, Cl = K, Ym = Pc, gL = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ym.default.code(new yL.KeywordCxt(s, Ym.default, "additionalProperties"));
    const a = (0, Wm.allSchemaProperties)(r);
    for (const f of a)
      s.definedProperties.add(f);
    s.opts.unevaluated && a.length && s.props !== !0 && (s.props = Cl.mergeEvaluated.props(t, (0, Cl.toHash)(a), s.props));
    const o = a.filter((f) => !(0, Cl.alwaysValidSchema)(s, r[f]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const f of o)
      u(f) ? l(f) : (t.if((0, Wm.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Xf.default = gL;
var Jf = {};
Object.defineProperty(Jf, "__esModule", { value: !0 });
const Xm = pe, Ya = oe, Jm = K, Qm = K, $L = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: a } = s, o = (0, Xm.allSchemaProperties)(r), c = o.filter((m) => (0, Jm.alwaysValidSchema)(s, r[m]));
    if (o.length === 0 || c.length === o.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof Ya.Name) && (s.props = (0, Qm.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    p();
    function p() {
      for (const m of o)
        u && h(m), s.allErrors ? _(m) : (t.var(l, !0), _(m), t.if(l));
    }
    function h(m) {
      for (const v in u)
        new RegExp(m).test(v) && (0, Jm.checkStrictMode)(s, `property ${v} matches pattern ${m} (use allowMatchingProperties)`);
    }
    function _(m) {
      t.forIn("key", n, (v) => {
        t.if((0, Ya._)`${(0, Xm.usePattern)(e, m)}.test(${v})`, () => {
          const y = c.includes(m);
          y || e.subschema({
            keyword: "patternProperties",
            schemaProp: m,
            dataProp: v,
            dataPropType: Qm.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, Ya._)`${f}[${v}]`, !0) : !y && !s.allErrors && t.if((0, Ya.not)(l), () => t.break());
        });
      });
    }
  }
};
Jf.default = $L;
var Qf = {};
Object.defineProperty(Qf, "__esModule", { value: !0 });
const vL = K, _L = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, vL.alwaysValidSchema)(n, r)) {
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
Qf.default = _L;
var Zf = {};
Object.defineProperty(Zf, "__esModule", { value: !0 });
const EL = pe, wL = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: EL.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Zf.default = wL;
var ed = {};
Object.defineProperty(ed, "__esModule", { value: !0 });
const vo = oe, bL = K, SL = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, vo._)`{passingSchemas: ${e.passing}}`
}, PL = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: SL,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, a = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(u), e.result(a, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let p;
        (0, bL.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, vo._)`${c} && ${a}`).assign(a, !1).assign(o, (0, vo._)`[${o}, ${f}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(o, f), p && e.mergeEvaluated(p, vo.Name);
        });
      });
    }
  }
};
ed.default = PL;
var td = {};
Object.defineProperty(td, "__esModule", { value: !0 });
const TL = K, RL = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, a) => {
      if ((0, TL.alwaysValidSchema)(n, s))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
td.default = RL;
var rd = {};
Object.defineProperty(rd, "__esModule", { value: !0 });
const qo = oe, Ev = K, NL = {
  message: ({ params: e }) => (0, qo.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, qo._)`{failingKeyword: ${e.ifClause}}`
}, OL = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: NL,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Ev.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Zm(n, "then"), s = Zm(n, "else");
    if (!i && !s)
      return;
    const a = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(o, u("then", l), u("else", l));
    } else i ? t.if(o, u("then")) : t.if((0, qo.not)(o), u("else"));
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
    function u(l, f) {
      return () => {
        const p = e.subschema({ keyword: l }, o);
        t.assign(a, o), e.mergeValidEvaluated(p, a), f ? t.assign(f, (0, qo._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Zm(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Ev.alwaysValidSchema)(e, r);
}
rd.default = OL;
var nd = {};
Object.defineProperty(nd, "__esModule", { value: !0 });
const AL = K, IL = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, AL.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
nd.default = IL;
Object.defineProperty(Hf, "__esModule", { value: !0 });
const CL = Gi, DL = zf, kL = Hi, LL = Kf, FL = Wf, jL = Sc, UL = Yf, ML = Pc, xL = Xf, VL = Jf, qL = Qf, BL = Zf, GL = ed, HL = td, zL = rd, KL = nd;
function WL(e = !1) {
  const t = [
    // any
    qL.default,
    BL.default,
    GL.default,
    HL.default,
    zL.default,
    KL.default,
    // object
    UL.default,
    ML.default,
    jL.default,
    xL.default,
    VL.default
  ];
  return e ? t.push(DL.default, LL.default) : t.push(CL.default, kL.default), t.push(FL.default), t;
}
Hf.default = WL;
var id = {}, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.dynamicAnchor = void 0;
const Dl = oe, YL = Ct, ey = ft, XL = Fr, JL = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => wv(e, e.schema)
};
function wv(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Dl._)`${YL.default.dynamicAnchors}${(0, Dl.getProperty)(t)}`, s = n.errSchemaPath === "#" ? n.validateName : QL(e);
  r.if((0, Dl._)`!${i}`, () => r.assign(i, s));
}
zi.dynamicAnchor = wv;
function QL(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: s, localRefs: a, meta: o } = t.root, { schemaId: c } = n.opts, u = new ey.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: s, localRefs: a, meta: o });
  return ey.compileSchema.call(n, u), (0, XL.getValidate)(e, u);
}
zi.default = JL;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
Ki.dynamicRef = void 0;
const ty = oe, ZL = Ct, ry = Fr, eF = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => bv(e, e.schema)
};
function bv(e, t) {
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
      const u = r.let("_v", (0, ty._)`${ZL.default.dynamicAnchors}${(0, ty.getProperty)(s)}`);
      r.if(u, o(u, c), o(i.validateName, c));
    } else
      o(i.validateName, c)();
  }
  function o(c, u) {
    return u ? () => r.block(() => {
      (0, ry.callRef)(e, c), r.let(u, !0);
    }) : () => (0, ry.callRef)(e, c);
  }
}
Ki.dynamicRef = bv;
Ki.default = eF;
var sd = {};
Object.defineProperty(sd, "__esModule", { value: !0 });
const tF = zi, rF = K, nF = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, tF.dynamicAnchor)(e, "") : (0, rF.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
sd.default = nF;
var ad = {};
Object.defineProperty(ad, "__esModule", { value: !0 });
const iF = Ki, sF = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, iF.dynamicRef)(e, e.schema)
};
ad.default = sF;
Object.defineProperty(id, "__esModule", { value: !0 });
const aF = zi, oF = Ki, cF = sd, lF = ad, uF = [aF.default, oF.default, cF.default, lF.default];
id.default = uF;
var od = {}, cd = {};
Object.defineProperty(cd, "__esModule", { value: !0 });
const ny = Sc, fF = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: ny.error,
  code: (e) => (0, ny.validatePropertyDeps)(e)
};
cd.default = fF;
var ld = {};
Object.defineProperty(ld, "__esModule", { value: !0 });
const dF = Sc, hF = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, dF.validateSchemaDeps)(e)
};
ld.default = hF;
var ud = {};
Object.defineProperty(ud, "__esModule", { value: !0 });
const pF = K, mF = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, pF.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
ud.default = mF;
Object.defineProperty(od, "__esModule", { value: !0 });
const yF = cd, gF = ld, $F = ud, vF = [yF.default, gF.default, $F.default];
od.default = vF;
var fd = {}, dd = {};
Object.defineProperty(dd, "__esModule", { value: !0 });
const Jr = oe, iy = K, _F = Ct, EF = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Jr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, wF = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: EF,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: s } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: a, props: o } = s;
    o instanceof Jr.Name ? t.if((0, Jr._)`${o} !== true`, () => t.forIn("key", n, (f) => t.if(u(o, f), () => c(f)))) : o !== !0 && t.forIn("key", n, (f) => o === void 0 ? c(f) : t.if(l(o, f), () => c(f))), s.props = !0, e.ok((0, Jr._)`${i} === ${_F.default.errors}`);
    function c(f) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: f }), e.error(), a || t.break();
        return;
      }
      if (!(0, iy.alwaysValidSchema)(s, r)) {
        const p = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: f,
          dataPropType: iy.Type.Str
        }, p), a || t.if((0, Jr.not)(p), () => t.break());
      }
    }
    function u(f, p) {
      return (0, Jr._)`!${f} || !${f}[${p}]`;
    }
    function l(f, p) {
      const h = [];
      for (const _ in f)
        f[_] === !0 && h.push((0, Jr._)`${p} !== ${_}`);
      return (0, Jr.and)(...h);
    }
  }
};
dd.default = wF;
var hd = {};
Object.defineProperty(hd, "__esModule", { value: !0 });
const Ln = oe, sy = K, bF = {
  message: ({ params: { len: e } }) => (0, Ln.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ln._)`{limit: ${e}}`
}, SF = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: bF,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, s = i.items || 0;
    if (s === !0)
      return;
    const a = t.const("len", (0, Ln._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: s }), e.fail((0, Ln._)`${a} > ${s}`);
    else if (typeof r == "object" && !(0, sy.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, Ln._)`${a} <= ${s}`);
      t.if((0, Ln.not)(c), () => o(c, s)), e.ok(c);
    }
    i.items = !0;
    function o(c, u) {
      t.forRange("i", u, a, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: sy.Type.Num }, c), i.allErrors || t.if((0, Ln.not)(c), () => t.break());
      });
    }
  }
};
hd.default = SF;
Object.defineProperty(fd, "__esModule", { value: !0 });
const PF = dd, TF = hd, RF = [PF.default, TF.default];
fd.default = RF;
var pd = {}, md = {};
Object.defineProperty(md, "__esModule", { value: !0 });
const De = oe, NF = {
  message: ({ schemaCode: e }) => (0, De.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, De._)`{format: ${e}}`
}, OF = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: NF,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: a, it: o } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = o;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const _ = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), m = r.const("fDef", (0, De._)`${_}[${a}]`), v = r.let("fType"), y = r.let("format");
      r.if((0, De._)`typeof ${m} == "object" && !(${m} instanceof RegExp)`, () => r.assign(v, (0, De._)`${m}.type || "string"`).assign(y, (0, De._)`${m}.validate`), () => r.assign(v, (0, De._)`"string"`).assign(y, m)), e.fail$data((0, De.or)(w(), R()));
      function w() {
        return c.strictSchema === !1 ? De.nil : (0, De._)`${a} && !${y}`;
      }
      function R() {
        const C = l.$async ? (0, De._)`(${m}.async ? await ${y}(${n}) : ${y}(${n}))` : (0, De._)`${y}(${n})`, M = (0, De._)`(typeof ${y} == "function" ? ${C} : ${y}.test(${n}))`;
        return (0, De._)`${y} && ${y} !== true && ${v} === ${t} && !${M}`;
      }
    }
    function h() {
      const _ = f.formats[s];
      if (!_) {
        w();
        return;
      }
      if (_ === !0)
        return;
      const [m, v, y] = R(_);
      m === t && e.pass(C());
      function w() {
        if (c.strictSchema === !1) {
          f.logger.warn(M());
          return;
        }
        throw new Error(M());
        function M() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function R(M) {
        const H = M instanceof RegExp ? (0, De.regexpCode)(M) : c.code.formats ? (0, De._)`${c.code.formats}${(0, De.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: M, code: H });
        return typeof M == "object" && !(M instanceof RegExp) ? [M.type || "string", M.validate, (0, De._)`${z}.validate`] : ["string", M, z];
      }
      function C() {
        if (typeof _ == "object" && !(_ instanceof RegExp) && _.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, De._)`await ${y}(${n})`;
        }
        return typeof v == "function" ? (0, De._)`${y}(${n})` : (0, De._)`${y}.test(${n})`;
      }
    }
  }
};
md.default = OF;
Object.defineProperty(pd, "__esModule", { value: !0 });
const AF = md, IF = [AF.default];
pd.default = IF;
var Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
Li.contentVocabulary = Li.metadataVocabulary = void 0;
Li.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Li.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Af, "__esModule", { value: !0 });
const CF = If, DF = Df, kF = Hf, LF = id, FF = od, jF = fd, UF = pd, ay = Li, MF = [
  LF.default,
  CF.default,
  DF.default,
  (0, kF.default)(!0),
  UF.default,
  ay.metadataVocabulary,
  ay.contentVocabulary,
  FF.default,
  jF.default
];
Af.default = MF;
var yd = {}, Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
Tc.DiscrError = void 0;
var oy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(oy || (Tc.DiscrError = oy = {}));
Object.defineProperty(yd, "__esModule", { value: !0 });
const di = oe, $u = Tc, cy = ft, xF = Bi, VF = K, qF = {
  message: ({ params: { discrError: e, tagName: t } }) => e === $u.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, di._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, BF = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: qF,
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
    const c = t.let("valid", !1), u = t.const("tag", (0, di._)`${r}${(0, di.getProperty)(o)}`);
    t.if((0, di._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: $u.DiscrError.Tag, tag: u, tagName: o })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const _ in h)
        t.elseIf((0, di._)`${u} === ${_}`), t.assign(c, f(h[_]));
      t.else(), e.error(!1, { discrError: $u.DiscrError.Mapping, tag: u, tagName: o }), t.endIf();
    }
    function f(h) {
      const _ = t.name("valid"), m = e.subschema({ keyword: "oneOf", schemaProp: h }, _);
      return e.mergeEvaluated(m, di.Name), _;
    }
    function p() {
      var h;
      const _ = {}, m = y(i);
      let v = !0;
      for (let C = 0; C < a.length; C++) {
        let M = a[C];
        if (M != null && M.$ref && !(0, VF.schemaHasRulesButRef)(M, s.self.RULES)) {
          const z = M.$ref;
          if (M = cy.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), M instanceof cy.SchemaEnv && (M = M.schema), M === void 0)
            throw new xF.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (h = M == null ? void 0 : M.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        v = v && (m || y(M)), w(H, C);
      }
      if (!v)
        throw new Error(`discriminator: "${o}" must be required`);
      return _;
      function y({ required: C }) {
        return Array.isArray(C) && C.includes(o);
      }
      function w(C, M) {
        if (C.const)
          R(C.const, M);
        else if (C.enum)
          for (const H of C.enum)
            R(H, M);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function R(C, M) {
        if (typeof C != "string" || C in _)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        _[C] = M;
      }
    }
  }
};
yd.default = BF;
var gd = {};
const GF = "https://json-schema.org/draft/2020-12/schema", HF = "https://json-schema.org/draft/2020-12/schema", zF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, KF = "meta", WF = "Core and Validation specifications meta-schema", YF = [
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
], XF = [
  "object",
  "boolean"
], JF = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", QF = {
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
}, ZF = {
  $schema: GF,
  $id: HF,
  $vocabulary: zF,
  $dynamicAnchor: KF,
  title: WF,
  allOf: YF,
  type: XF,
  $comment: JF,
  properties: QF
}, ej = "https://json-schema.org/draft/2020-12/schema", tj = "https://json-schema.org/draft/2020-12/meta/applicator", rj = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, nj = "meta", ij = "Applicator vocabulary meta-schema", sj = [
  "object",
  "boolean"
], aj = {
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
}, oj = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
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
}, lj = "https://json-schema.org/draft/2020-12/schema", uj = "https://json-schema.org/draft/2020-12/meta/unevaluated", fj = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, dj = "meta", hj = "Unevaluated applicator vocabulary meta-schema", pj = [
  "object",
  "boolean"
], mj = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, yj = {
  $schema: lj,
  $id: uj,
  $vocabulary: fj,
  $dynamicAnchor: dj,
  title: hj,
  type: pj,
  properties: mj
}, gj = "https://json-schema.org/draft/2020-12/schema", $j = "https://json-schema.org/draft/2020-12/meta/content", vj = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, _j = "meta", Ej = "Content vocabulary meta-schema", wj = [
  "object",
  "boolean"
], bj = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, Sj = {
  $schema: gj,
  $id: $j,
  $vocabulary: vj,
  $dynamicAnchor: _j,
  title: Ej,
  type: wj,
  properties: bj
}, Pj = "https://json-schema.org/draft/2020-12/schema", Tj = "https://json-schema.org/draft/2020-12/meta/core", Rj = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, Nj = "meta", Oj = "Core vocabulary meta-schema", Aj = [
  "object",
  "boolean"
], Ij = {
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
}, Cj = {
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
}, Dj = {
  $schema: Pj,
  $id: Tj,
  $vocabulary: Rj,
  $dynamicAnchor: Nj,
  title: Oj,
  type: Aj,
  properties: Ij,
  $defs: Cj
}, kj = "https://json-schema.org/draft/2020-12/schema", Lj = "https://json-schema.org/draft/2020-12/meta/format-annotation", Fj = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, jj = "meta", Uj = "Format vocabulary meta-schema for annotation results", Mj = [
  "object",
  "boolean"
], xj = {
  format: {
    type: "string"
  }
}, Vj = {
  $schema: kj,
  $id: Lj,
  $vocabulary: Fj,
  $dynamicAnchor: jj,
  title: Uj,
  type: Mj,
  properties: xj
}, qj = "https://json-schema.org/draft/2020-12/schema", Bj = "https://json-schema.org/draft/2020-12/meta/meta-data", Gj = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, Hj = "meta", zj = "Meta-data vocabulary meta-schema", Kj = [
  "object",
  "boolean"
], Wj = {
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
}, Yj = {
  $schema: qj,
  $id: Bj,
  $vocabulary: Gj,
  $dynamicAnchor: Hj,
  title: zj,
  type: Kj,
  properties: Wj
}, Xj = "https://json-schema.org/draft/2020-12/schema", Jj = "https://json-schema.org/draft/2020-12/meta/validation", Qj = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, Zj = "meta", eU = "Validation vocabulary meta-schema", tU = [
  "object",
  "boolean"
], rU = {
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
}, nU = {
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
}, iU = {
  $schema: Xj,
  $id: Jj,
  $vocabulary: Qj,
  $dynamicAnchor: Zj,
  title: eU,
  type: tU,
  properties: rU,
  $defs: nU
};
Object.defineProperty(gd, "__esModule", { value: !0 });
const sU = ZF, aU = cj, oU = yj, cU = Sj, lU = Dj, uU = Vj, fU = Yj, dU = iU, hU = ["/properties"];
function pU(e) {
  return [
    sU,
    aU,
    oU,
    cU,
    lU,
    t(this, uU),
    fU,
    t(this, dU)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, hU) : n;
  }
}
gd.default = pU;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = P$, n = Af, i = yd, s = gd, a = "https://json-schema.org/draft/2020-12/schema";
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
      const { $data: h, meta: _ } = this.opts;
      _ && (s.default.call(this, h), this.refs["http://json-schema.org/schema"] = a);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv2020 = o, e.exports = t = o, e.exports.Ajv2020 = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  var c = Zt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var u = oe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var l = da;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var f = Bi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(fu, fu.exports);
var mU = fu.exports, vu = { exports: {} }, Sv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(B, G) {
    return { validate: B, compare: G };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), u),
    "date-time": t(p(!0), h),
    "iso-time": t(c(), l),
    "iso-date-time": t(p(), _),
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
    regex: Q,
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
    byte: R,
    // signed 32 bit integer
    int32: { type: "number", validate: H },
    // signed 64 bit integer
    int64: { type: "number", validate: z },
    // C-type float
    float: { type: "number", validate: he },
    // C-type double
    double: { type: "number", validate: he },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, _),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(B) {
    return B % 4 === 0 && (B % 100 !== 0 || B % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(B) {
    const G = n.exec(B);
    if (!G)
      return !1;
    const J = +G[1], k = +G[2], D = +G[3];
    return k >= 1 && k <= 12 && D >= 1 && D <= (k === 2 && r(J) ? 29 : i[k]);
  }
  function a(B, G) {
    if (B && G)
      return B > G ? 1 : B < G ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(B) {
    return function(J) {
      const k = o.exec(J);
      if (!k)
        return !1;
      const D = +k[1], x = +k[2], F = +k[3], V = k[4], U = k[5] === "-" ? -1 : 1, O = +(k[6] || 0), b = +(k[7] || 0);
      if (O > 23 || b > 59 || B && !V)
        return !1;
      if (D <= 23 && x <= 59 && F < 60)
        return !0;
      const P = x - b * U, S = D - O * U - (P < 0 ? 1 : 0);
      return (S === 23 || S === -1) && (P === 59 || P === -1) && F < 61;
    };
  }
  function u(B, G) {
    if (!(B && G))
      return;
    const J = (/* @__PURE__ */ new Date("2020-01-01T" + B)).valueOf(), k = (/* @__PURE__ */ new Date("2020-01-01T" + G)).valueOf();
    if (J && k)
      return J - k;
  }
  function l(B, G) {
    if (!(B && G))
      return;
    const J = o.exec(B), k = o.exec(G);
    if (J && k)
      return B = J[1] + J[2] + J[3], G = k[1] + k[2] + k[3], B > G ? 1 : B < G ? -1 : 0;
  }
  const f = /t|\s/i;
  function p(B) {
    const G = c(B);
    return function(k) {
      const D = k.split(f);
      return D.length === 2 && s(D[0]) && G(D[1]);
    };
  }
  function h(B, G) {
    if (!(B && G))
      return;
    const J = new Date(B).valueOf(), k = new Date(G).valueOf();
    if (J && k)
      return J - k;
  }
  function _(B, G) {
    if (!(B && G))
      return;
    const [J, k] = B.split(f), [D, x] = G.split(f), F = a(J, D);
    if (F !== void 0)
      return F || u(k, x);
  }
  const m = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function y(B) {
    return m.test(B) && v.test(B);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function R(B) {
    return w.lastIndex = 0, w.test(B);
  }
  const C = -2147483648, M = 2 ** 31 - 1;
  function H(B) {
    return Number.isInteger(B) && B <= M && B >= C;
  }
  function z(B) {
    return Number.isInteger(B);
  }
  function he() {
    return !0;
  }
  const I = /[^\\]\\Z/;
  function Q(B) {
    if (I.test(B))
      return !1;
    try {
      return new RegExp(B), !0;
    } catch {
      return !1;
    }
  }
})(Sv);
var Pv = {}, _u = { exports: {} }, Tv = {}, er = {}, Fi = {}, pa = {}, fe = {}, Ws = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((R, C) => `${R}${C}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((R, C) => (C instanceof r && (R[C.str] = (R[C.str] || 0) + 1), R), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(y, ...w) {
    const R = [y[0]];
    let C = 0;
    for (; C < w.length; )
      o(R, w[C]), R.push(y[++C]);
    return new n(R);
  }
  e._ = i;
  const s = new n("+");
  function a(y, ...w) {
    const R = [h(y[0])];
    let C = 0;
    for (; C < w.length; )
      R.push(s), o(R, w[C]), R.push(s, h(y[++C]));
    return c(R), new n(R);
  }
  e.str = a;
  function o(y, w) {
    w instanceof n ? y.push(...w._items) : w instanceof r ? y.push(w) : y.push(f(w));
  }
  e.addCodeArg = o;
  function c(y) {
    let w = 1;
    for (; w < y.length - 1; ) {
      if (y[w] === s) {
        const R = u(y[w - 1], y[w + 1]);
        if (R !== void 0) {
          y.splice(w - 1, 3, R);
          continue;
        }
        y[w++] = "+";
      }
      w++;
    }
  }
  function u(y, w) {
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
  function f(y) {
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
  function _(y) {
    return typeof y == "string" && e.IDENTIFIER.test(y) ? new n(`.${y}`) : i`[${y}]`;
  }
  e.getProperty = _;
  function m(y) {
    if (typeof y == "string" && e.IDENTIFIER.test(y))
      return new n(`${y}`);
    throw new Error(`CodeGen: invalid export name: ${y}, use explicit $id name mapping`);
  }
  e.getEsmExportName = m;
  function v(y) {
    return new n(y.toString());
  }
  e.regexpCode = v;
})(Ws);
var Eu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Ws;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
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
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const a = (0, t._)`\n`;
  class o extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(u), { prefix: h } = p, _ = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let m = this._values[h];
      if (m) {
        const w = m.get(_);
        if (w)
          return w;
      } else
        m = this._values[h] = /* @__PURE__ */ new Map();
      m.set(_, p);
      const v = this._scope[h] || (this._scope[h] = []), y = v.length;
      return v[y] = l.ref, p.setValue(l, { property: h, itemIndex: y }), p;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, p) {
      let h = t.nil;
      for (const _ in u) {
        const m = u[_];
        if (!m)
          continue;
        const v = f[_] = f[_] || /* @__PURE__ */ new Map();
        m.forEach((y) => {
          if (v.has(y))
            return;
          v.set(y, n.Started);
          let w = l(y);
          if (w) {
            const R = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${R} ${y} = ${w};${this.opts._n}`;
          } else if (w = p == null ? void 0 : p(y))
            h = (0, t._)`${h}${w}${this.opts._n}`;
          else
            throw new r(y);
          v.set(y, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = o;
})(Eu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Ws, r = Eu;
  var n = Ws;
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
  var i = Eu;
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
      return J(d, this.rhs);
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
  class u extends s {
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
  class f extends s {
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
        g.optimizeNames(d, $) || (D(d, g.names), N.splice(E, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, $) => G(d, $.names), {});
    }
  }
  class _ extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class m extends h {
  }
  class v extends _ {
  }
  v.kind = "else";
  class y extends _ {
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
        $ = this.else = Array.isArray(N) ? new v(N) : N;
      }
      if ($)
        return d === !1 ? $ instanceof y ? $ : $.nodes : this.nodes.length ? this : new y(x(d), $ instanceof y ? [$] : $.nodes);
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
      return J(d, this.condition), this.else && G(d, this.else.names), d;
    }
  }
  y.kind = "if";
  class w extends _ {
  }
  w.kind = "for";
  class R extends w {
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
      return G(super.names, this.iteration.names);
    }
  }
  class C extends w {
    constructor(d, $, N, E) {
      super(), this.varKind = d, this.name = $, this.from = N, this.to = E;
    }
    render(d) {
      const $ = d.es5 ? r.varKinds.var : this.varKind, { name: N, from: E, to: g } = this;
      return `for(${$} ${N}=${E}; ${N}<${g}; ${N}++)` + super.render(d);
    }
    get names() {
      const d = J(super.names, this.from);
      return J(d, this.to);
    }
  }
  class M extends w {
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
      return G(super.names, this.iterable.names);
    }
  }
  class H extends _ {
    constructor(d, $, N) {
      super(), this.name = d, this.args = $, this.async = N;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class he extends _ {
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
      return this.catch && G(d, this.catch.names), this.finally && G(d, this.finally.names), d;
    }
  }
  class I extends _ {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  I.kind = "catch";
  class Q extends _ {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Q.kind = "finally";
  class B {
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
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(y, v);
    }
    _for(d, $) {
      return this._blockNode(d), $ && this.code($).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, $) {
      return this._for(new R(d), $);
    }
    // `for` statement for a range of values
    forRange(d, $, N, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const j = this._scope.toName(d);
      return this._for(new C(g, j, $, N), () => E(j));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, $, N, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const j = $ instanceof t.Name ? $ : this.var("_arr", $);
        return this.forRange("_i", 0, (0, t._)`${j}.length`, (A) => {
          this.var(g, (0, t._)`${j}[${A}]`), N(g);
        });
      }
      return this._for(new M("of", E, g, $), () => N(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, $, N, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${$})`, N);
      const g = this._scope.toName(d);
      return this._for(new M("in", E, g, $), () => N(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const $ = new z();
      if (this._blockNode($), this.code(d), $.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, $, N) {
      if (!$ && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new he();
      if (this._blockNode(E), this.code(d), $) {
        const g = this.name("e");
        this._currNode = E.catch = new I(g), $(g);
      }
      return N && (this._currNode = E.finally = new Q(), this.code(N)), this._endBlockNode(I, Q);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
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
      return this._blockNode(new H(d, $, N)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
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
  e.CodeGen = B;
  function G(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) + (d[$] || 0);
    return S;
  }
  function J(S, d) {
    return d instanceof t._CodeOrName ? G(S, d.names) : S;
  }
  function k(S, d, $) {
    if (S instanceof t.Name)
      return N(S);
    if (!E(S))
      return S;
    return new t._Code(S._items.reduce((g, j) => (j instanceof t.Name && (j = N(j)), j instanceof t._Code ? g.push(...j._items) : g.push(j), g), []));
    function N(g) {
      const j = $[g.str];
      return j === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], j);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((j) => j instanceof t.Name && d[j.str] === 1 && $[j.str] !== void 0);
    }
  }
  function D(S, d) {
    for (const $ in d)
      S[$] = (S[$] || 0) - (d[$] || 0);
  }
  function x(S) {
    return typeof S == "boolean" || typeof S == "number" || S === null ? !S : (0, t._)`!${P(S)}`;
  }
  e.not = x;
  const F = b(e.operators.AND);
  function V(...S) {
    return S.reduce(F);
  }
  e.and = V;
  const U = b(e.operators.OR);
  function O(...S) {
    return S.reduce(U);
  }
  e.or = O;
  function b(S) {
    return (d, $) => d === t.nil ? $ : $ === t.nil ? d : (0, t._)`${P(d)} ${S} ${P($)}`;
  }
  function P(S) {
    return S instanceof t.Name ? S : (0, t._)`(${S})`;
  }
})(fe);
var Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.checkStrictMode = Y.getErrorPath = Y.Type = Y.useFunc = Y.setEvaluated = Y.evaluatedPropsToName = Y.mergeEvaluated = Y.eachItem = Y.unescapeJsonPointer = Y.escapeJsonPointer = Y.escapeFragment = Y.unescapeFragment = Y.schemaRefOrVal = Y.schemaHasRulesButRef = Y.schemaHasRules = Y.checkUnknownRules = Y.alwaysValidSchema = Y.toHash = void 0;
const _e = fe, yU = Ws;
function gU(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Y.toHash = gU;
function $U(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Rv(e, t), !Nv(t, e.self.RULES.all));
}
Y.alwaysValidSchema = $U;
function Rv(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || Iv(e, `unknown keyword: "${s}"`);
}
Y.checkUnknownRules = Rv;
function Nv(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Y.schemaHasRules = Nv;
function vU(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Y.schemaHasRulesButRef = vU;
function _U({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, _e._)`${r}`;
  }
  return (0, _e._)`${e}${t}${(0, _e.getProperty)(n)}`;
}
Y.schemaRefOrVal = _U;
function EU(e) {
  return Ov(decodeURIComponent(e));
}
Y.unescapeFragment = EU;
function wU(e) {
  return encodeURIComponent($d(e));
}
Y.escapeFragment = wU;
function $d(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Y.escapeJsonPointer = $d;
function Ov(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Y.unescapeJsonPointer = Ov;
function bU(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Y.eachItem = bU;
function ly({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, a, o) => {
    const c = a === void 0 ? s : a instanceof _e.Name ? (s instanceof _e.Name ? e(i, s, a) : t(i, s, a), a) : s instanceof _e.Name ? (t(i, a, s), s) : r(s, a);
    return o === _e.Name && !(c instanceof _e.Name) ? n(i, c) : c;
  };
}
Y.mergeEvaluated = {
  props: ly({
    mergeNames: (e, t, r) => e.if((0, _e._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, _e._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, _e._)`${r} || {}`).code((0, _e._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, _e._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, _e._)`${r} || {}`), vd(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Av
  }),
  items: ly({
    mergeNames: (e, t, r) => e.if((0, _e._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, _e._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, _e._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, _e._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Av(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, _e._)`{}`);
  return t !== void 0 && vd(e, r, t), r;
}
Y.evaluatedPropsToName = Av;
function vd(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, _e._)`${t}${(0, _e.getProperty)(n)}`, !0));
}
Y.setEvaluated = vd;
const uy = {};
function SU(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: uy[t.code] || (uy[t.code] = new yU._Code(t.code))
  });
}
Y.useFunc = SU;
var wu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(wu || (Y.Type = wu = {}));
function PU(e, t, r) {
  if (e instanceof _e.Name) {
    const n = t === wu.Num;
    return r ? n ? (0, _e._)`"[" + ${e} + "]"` : (0, _e._)`"['" + ${e} + "']"` : n ? (0, _e._)`"/" + ${e}` : (0, _e._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, _e.getProperty)(e).toString() : "/" + $d(e);
}
Y.getErrorPath = PU;
function Iv(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Y.checkStrictMode = Iv;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
const rt = fe, TU = {
  // validation function arguments
  data: new rt.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new rt.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new rt.Name("instancePath"),
  parentData: new rt.Name("parentData"),
  parentDataProperty: new rt.Name("parentDataProperty"),
  rootData: new rt.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new rt.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new rt.Name("vErrors"),
  // null or array of validation errors
  errors: new rt.Name("errors"),
  // counter of validation errors
  this: new rt.Name("this"),
  // "globals"
  self: new rt.Name("self"),
  scope: new rt.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new rt.Name("json"),
  jsonPos: new rt.Name("jsonPos"),
  jsonLen: new rt.Name("jsonLen"),
  jsonPart: new rt.Name("jsonPart")
};
vr.default = TU;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = fe, r = Y, n = vr;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: y }) => y ? (0, t.str)`"${v}" keyword must be ${y} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function i(v, y = e.keywordError, w, R) {
    const { it: C } = v, { gen: M, compositeRule: H, allErrors: z } = C, he = f(v, y, w);
    R ?? (H || z) ? c(M, he) : u(C, (0, t._)`[${he}]`);
  }
  e.reportError = i;
  function s(v, y = e.keywordError, w) {
    const { it: R } = v, { gen: C, compositeRule: M, allErrors: H } = R, z = f(v, y, w);
    c(C, z), M || H || u(R, n.default.vErrors);
  }
  e.reportExtraError = s;
  function a(v, y) {
    v.assign(n.default.errors, y), v.if((0, t._)`${n.default.vErrors} !== null`, () => v.if(y, () => v.assign((0, t._)`${n.default.vErrors}.length`, y), () => v.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function o({ gen: v, keyword: y, schemaValue: w, data: R, errsCount: C, it: M }) {
    if (C === void 0)
      throw new Error("ajv implementation error");
    const H = v.name("err");
    v.forRange("i", C, n.default.errors, (z) => {
      v.const(H, (0, t._)`${n.default.vErrors}[${z}]`), v.if((0, t._)`${H}.instancePath === undefined`, () => v.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, M.errorPath))), v.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${M.errSchemaPath}/${y}`), M.opts.verbose && (v.assign((0, t._)`${H}.schema`, w), v.assign((0, t._)`${H}.data`, R));
    });
  }
  e.extendErrors = o;
  function c(v, y) {
    const w = v.const("err", y);
    v.if((0, t._)`${n.default.vErrors} === null`, () => v.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), v.code((0, t._)`${n.default.errors}++`);
  }
  function u(v, y) {
    const { gen: w, validateName: R, schemaEnv: C } = v;
    C.$async ? w.throw((0, t._)`new ${v.ValidationError}(${y})`) : (w.assign((0, t._)`${R}.errors`, y), w.return(!1));
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
  function f(v, y, w) {
    const { createErrors: R } = v.it;
    return R === !1 ? (0, t._)`{}` : p(v, y, w);
  }
  function p(v, y, w = {}) {
    const { gen: R, it: C } = v, M = [
      h(C, w),
      _(v, w)
    ];
    return m(v, y, M), R.object(...M);
  }
  function h({ errorPath: v }, { instancePath: y }) {
    const w = y ? (0, t.str)`${v}${(0, r.getErrorPath)(y, r.Type.Str)}` : v;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function _({ keyword: v, it: { errSchemaPath: y } }, { schemaPath: w, parentSchema: R }) {
    let C = R ? y : (0, t.str)`${y}/${v}`;
    return w && (C = (0, t.str)`${C}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, C];
  }
  function m(v, { params: y, message: w }, R) {
    const { keyword: C, data: M, schemaValue: H, it: z } = v, { opts: he, propertyName: I, topSchemaRef: Q, schemaPath: B } = z;
    R.push([l.keyword, C], [l.params, typeof y == "function" ? y(v) : y || (0, t._)`{}`]), he.messages && R.push([l.message, typeof w == "function" ? w(v) : w]), he.verbose && R.push([l.schema, H], [l.parentSchema, (0, t._)`${Q}${B}`], [n.default.data, M]), I && R.push([l.propertyName, I]);
  }
})(pa);
Object.defineProperty(Fi, "__esModule", { value: !0 });
Fi.boolOrEmptySchema = Fi.topBoolOrEmptySchema = void 0;
const RU = pa, NU = fe, OU = vr, AU = {
  message: "boolean schema is false"
};
function IU(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Cv(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(OU.default.data) : (t.assign((0, NU._)`${n}.errors`, null), t.return(!0));
}
Fi.topBoolOrEmptySchema = IU;
function CU(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Cv(e)) : r.var(t, !0);
}
Fi.boolOrEmptySchema = CU;
function Cv(e, t) {
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
  (0, RU.reportError)(i, AU, void 0, t);
}
var Me = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.getRules = Kn.isJSONType = void 0;
const DU = ["string", "number", "integer", "boolean", "null", "object", "array"], kU = new Set(DU);
function LU(e) {
  return typeof e == "string" && kU.has(e);
}
Kn.isJSONType = LU;
function FU() {
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
Kn.getRules = FU;
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.shouldUseRule = Ir.shouldUseGroup = Ir.schemaHasRulesForType = void 0;
function jU({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Dv(e, n);
}
Ir.schemaHasRulesForType = jU;
function Dv(e, t) {
  return t.rules.some((r) => kv(e, r));
}
Ir.shouldUseGroup = Dv;
function kv(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Ir.shouldUseRule = kv;
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.reportTypeError = Me.checkDataTypes = Me.checkDataType = Me.coerceAndCheckDataType = Me.getJSONTypes = Me.getSchemaTypes = Me.DataType = void 0;
const UU = Kn, MU = Ir, xU = pa, ue = fe, Lv = Y;
var Ti;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Ti || (Me.DataType = Ti = {}));
function VU(e) {
  const t = Fv(e.type);
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
Me.getSchemaTypes = VU;
function Fv(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(UU.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Me.getJSONTypes = Fv;
function qU(e, t) {
  const { gen: r, data: n, opts: i } = e, s = BU(t, i.coerceTypes), a = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, MU.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const o = _d(t, n, i.strictNumbers, Ti.Wrong);
    r.if(o, () => {
      s.length ? GU(e, t, s) : Ed(e);
    });
  }
  return a;
}
Me.coerceAndCheckDataType = qU;
const jv = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function BU(e, t) {
  return t ? e.filter((r) => jv.has(r) || t === "array" && r === "array") : [];
}
function GU(e, t, r) {
  const { gen: n, data: i, opts: s } = e, a = n.let("dataType", (0, ue._)`typeof ${i}`), o = n.let("coerced", (0, ue._)`undefined`);
  s.coerceTypes === "array" && n.if((0, ue._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ue._)`${i}[0]`).assign(a, (0, ue._)`typeof ${i}`).if(_d(t, i, s.strictNumbers), () => n.assign(o, i))), n.if((0, ue._)`${o} !== undefined`);
  for (const u of r)
    (jv.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), Ed(e), n.endIf(), n.if((0, ue._)`${o} !== undefined`, () => {
    n.assign(i, o), HU(e, o);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, ue._)`${a} == "number" || ${a} == "boolean"`).assign(o, (0, ue._)`"" + ${i}`).elseIf((0, ue._)`${i} === null`).assign(o, (0, ue._)`""`);
        return;
      case "number":
        n.elseIf((0, ue._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, ue._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ue._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, ue._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ue._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, ue._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, ue._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, ue._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(o, (0, ue._)`[${i}]`);
    }
  }
}
function HU({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ue._)`${t} !== undefined`, () => e.assign((0, ue._)`${t}[${r}]`, n));
}
function bu(e, t, r, n = Ti.Correct) {
  const i = n === Ti.Correct ? ue.operators.EQ : ue.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, ue._)`${t} ${i} null`;
    case "array":
      s = (0, ue._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, ue._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = a((0, ue._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = a();
      break;
    default:
      return (0, ue._)`typeof ${t} ${i} ${e}`;
  }
  return n === Ti.Correct ? s : (0, ue.not)(s);
  function a(o = ue.nil) {
    return (0, ue.and)((0, ue._)`typeof ${t} == "number"`, o, r ? (0, ue._)`isFinite(${t})` : ue.nil);
  }
}
Me.checkDataType = bu;
function _d(e, t, r, n) {
  if (e.length === 1)
    return bu(e[0], t, r, n);
  let i;
  const s = (0, Lv.toHash)(e);
  if (s.array && s.object) {
    const a = (0, ue._)`typeof ${t} != "object"`;
    i = s.null ? a : (0, ue._)`!${t} || ${a}`, delete s.null, delete s.array, delete s.object;
  } else
    i = ue.nil;
  s.number && delete s.integer;
  for (const a in s)
    i = (0, ue.and)(i, bu(a, t, r, n));
  return i;
}
Me.checkDataTypes = _d;
const zU = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ue._)`{type: ${e}}` : (0, ue._)`{type: ${t}}`
};
function Ed(e) {
  const t = KU(e);
  (0, xU.reportError)(t, zU);
}
Me.reportTypeError = Ed;
function KU(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Lv.schemaRefOrVal)(e, n, "type");
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
var Rc = {};
Object.defineProperty(Rc, "__esModule", { value: !0 });
Rc.assignDefaults = void 0;
const ci = fe, WU = Y;
function YU(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      fy(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => fy(e, s, i.default));
}
Rc.assignDefaults = YU;
function fy(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: a } = e;
  if (r === void 0)
    return;
  const o = (0, ci._)`${s}${(0, ci.getProperty)(t)}`;
  if (i) {
    (0, WU.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, ci._)`${o} === undefined`;
  a.useDefaults === "empty" && (c = (0, ci._)`${c} || ${o} === null || ${o} === ""`), n.if(c, (0, ci._)`${o} = ${(0, ci.stringify)(r)}`);
}
var mr = {}, me = {};
Object.defineProperty(me, "__esModule", { value: !0 });
me.validateUnion = me.validateArray = me.usePattern = me.callValidateCode = me.schemaProperties = me.allSchemaProperties = me.noPropertyInData = me.propertyInData = me.isOwnProperty = me.hasPropFunc = me.reportMissingProp = me.checkMissingProp = me.checkReportMissingProp = void 0;
const Pe = fe, wd = Y, Wr = vr, XU = Y;
function JU(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Sd(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Pe._)`${t}` }, !0), e.error();
  });
}
me.checkReportMissingProp = JU;
function QU({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Pe.or)(...n.map((s) => (0, Pe.and)(Sd(e, t, s, r.ownProperties), (0, Pe._)`${i} = ${s}`)));
}
me.checkMissingProp = QU;
function ZU(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
me.reportMissingProp = ZU;
function Uv(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Pe._)`Object.prototype.hasOwnProperty`
  });
}
me.hasPropFunc = Uv;
function bd(e, t, r) {
  return (0, Pe._)`${Uv(e)}.call(${t}, ${r})`;
}
me.isOwnProperty = bd;
function e2(e, t, r, n) {
  const i = (0, Pe._)`${t}${(0, Pe.getProperty)(r)} !== undefined`;
  return n ? (0, Pe._)`${i} && ${bd(e, t, r)}` : i;
}
me.propertyInData = e2;
function Sd(e, t, r, n) {
  const i = (0, Pe._)`${t}${(0, Pe.getProperty)(r)} === undefined`;
  return n ? (0, Pe.or)(i, (0, Pe.not)(bd(e, t, r))) : i;
}
me.noPropertyInData = Sd;
function Mv(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
me.allSchemaProperties = Mv;
function t2(e, t) {
  return Mv(t).filter((r) => !(0, wd.alwaysValidSchema)(e, t[r]));
}
me.schemaProperties = t2;
function r2({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: a }, o, c, u) {
  const l = u ? (0, Pe._)`${e}, ${t}, ${n}${i}` : t, f = [
    [Wr.default.instancePath, (0, Pe.strConcat)(Wr.default.instancePath, s)],
    [Wr.default.parentData, a.parentData],
    [Wr.default.parentDataProperty, a.parentDataProperty],
    [Wr.default.rootData, Wr.default.rootData]
  ];
  a.opts.dynamicRef && f.push([Wr.default.dynamicAnchors, Wr.default.dynamicAnchors]);
  const p = (0, Pe._)`${l}, ${r.object(...f)}`;
  return c !== Pe.nil ? (0, Pe._)`${o}.call(${c}, ${p})` : (0, Pe._)`${o}(${p})`;
}
me.callValidateCode = r2;
const n2 = (0, Pe._)`new RegExp`;
function i2({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Pe._)`${i.code === "new RegExp" ? n2 : (0, XU.useFunc)(e, i)}(${r}, ${n})`
  });
}
me.usePattern = i2;
function s2(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return a(() => t.assign(o, !1)), o;
  }
  return t.var(s, !0), a(() => t.break()), s;
  function a(o) {
    const c = t.const("len", (0, Pe._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: wd.Type.Num
      }, s), t.if((0, Pe.not)(s), o);
    });
  }
}
me.validateArray = s2;
function a2(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, wd.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, o);
    t.assign(a, (0, Pe._)`${a} || ${o}`), e.mergeValidEvaluated(l, o) || t.if((0, Pe.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
me.validateUnion = a2;
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.validateKeywordUsage = mr.validSchemaType = mr.funcKeywordCode = mr.macroKeywordCode = void 0;
const ut = fe, Fn = vr, o2 = me, c2 = pa;
function l2(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: a } = e, o = t.macro.call(a.self, i, s, a), c = xv(r, n, o);
  a.opts.validateSchema !== !1 && a.self.validateSchema(o, !0);
  const u = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: ut.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
mr.macroKeywordCode = l2;
function u2(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: a, $data: o, it: c } = e;
  d2(c, t);
  const u = !o && t.compile ? t.compile.call(c.self, s, a, c) : t.validate, l = xv(n, i, u), f = n.let("valid");
  e.block$data(f, p), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function p() {
    if (t.errors === !1)
      m(), t.modifying && dy(e), v(() => e.error());
    else {
      const y = t.async ? h() : _();
      t.modifying && dy(e), v(() => f2(e, y));
    }
  }
  function h() {
    const y = n.let("ruleErrs", null);
    return n.try(() => m((0, ut._)`await `), (w) => n.assign(f, !1).if((0, ut._)`${w} instanceof ${c.ValidationError}`, () => n.assign(y, (0, ut._)`${w}.errors`), () => n.throw(w))), y;
  }
  function _() {
    const y = (0, ut._)`${l}.errors`;
    return n.assign(y, null), m(ut.nil), y;
  }
  function m(y = t.async ? (0, ut._)`await ` : ut.nil) {
    const w = c.opts.passContext ? Fn.default.this : Fn.default.self, R = !("compile" in t && !o || t.schema === !1);
    n.assign(f, (0, ut._)`${y}${(0, o2.callValidateCode)(e, l, w, R)}`, t.modifying);
  }
  function v(y) {
    var w;
    n.if((0, ut.not)((w = t.valid) !== null && w !== void 0 ? w : f), y);
  }
}
mr.funcKeywordCode = u2;
function dy(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ut._)`${n.parentData}[${n.parentDataProperty}]`));
}
function f2(e, t) {
  const { gen: r } = e;
  r.if((0, ut._)`Array.isArray(${t})`, () => {
    r.assign(Fn.default.vErrors, (0, ut._)`${Fn.default.vErrors} === null ? ${t} : ${Fn.default.vErrors}.concat(${t})`).assign(Fn.default.errors, (0, ut._)`${Fn.default.vErrors}.length`), (0, c2.extendErrors)(e);
  }, () => e.error());
}
function d2({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function xv(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ut.stringify)(r) });
}
function h2(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
mr.validSchemaType = h2;
function p2({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
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
mr.validateKeywordUsage = p2;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
un.extendSubschemaMode = un.extendSubschemaData = un.getSubschema = void 0;
const dr = fe, Vv = Y;
function m2(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}${(0, dr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Vv.escapeFragment)(r)}`
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
un.getSubschema = m2;
function y2(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, p = o.let("data", (0, dr._)`${t.data}${(0, dr.getProperty)(r)}`, !0);
    c(p), e.errorPath = (0, dr.str)`${u}${(0, Vv.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, dr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof dr.Name ? i : o.let("data", i, !0);
    c(u), a !== void 0 && (e.propertyName = a);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
un.extendSubschemaData = y2;
function g2(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
un.extendSubschemaMode = g2;
var We = {}, qv = { exports: {} }, on = qv.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  _o(t, n, i, e, "", e);
};
on.keywords = {
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
on.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
on.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
on.skipKeywords = {
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
function _o(e, t, r, n, i, s, a, o, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, a, o, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in on.arrayKeywords)
          for (var p = 0; p < f.length; p++)
            _o(e, t, r, f[p], i + "/" + l + "/" + p, s, i, l, n, p);
      } else if (l in on.propsKeywords) {
        if (f && typeof f == "object")
          for (var h in f)
            _o(e, t, r, f[h], i + "/" + l + "/" + $2(h), s, i, l, n, h);
      } else (l in on.keywords || e.allKeys && !(l in on.skipKeywords)) && _o(e, t, r, f, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, a, o, c, u);
  }
}
function $2(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var v2 = qv.exports;
Object.defineProperty(We, "__esModule", { value: !0 });
We.getSchemaRefs = We.resolveUrl = We.normalizeId = We._getFullPath = We.getFullPath = We.inlineRef = void 0;
const _2 = Y, E2 = _c, w2 = v2, b2 = /* @__PURE__ */ new Set([
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
function S2(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Su(e) : t ? Bv(e) <= t : !1;
}
We.inlineRef = S2;
const P2 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Su(e) {
  for (const t in e) {
    if (P2.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Su) || typeof r == "object" && Su(r))
      return !0;
  }
  return !1;
}
function Bv(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !b2.has(r) && (typeof e[r] == "object" && (0, _2.eachItem)(e[r], (n) => t += Bv(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Gv(e, t = "", r) {
  r !== !1 && (t = Ri(t));
  const n = e.parse(t);
  return Hv(e, n);
}
We.getFullPath = Gv;
function Hv(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
We._getFullPath = Hv;
const T2 = /#\/?$/;
function Ri(e) {
  return e ? e.replace(T2, "") : "";
}
We.normalizeId = Ri;
function R2(e, t, r) {
  return r = Ri(r), e.resolve(t, r);
}
We.resolveUrl = R2;
const N2 = /^[a-z_][-a-z0-9._]*$/i;
function O2(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Ri(e[r] || t), s = { "": i }, a = Gv(n, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return w2(e, { allKeys: !0 }, (f, p, h, _) => {
    if (_ === void 0)
      return;
    const m = a + p;
    let v = s[_];
    typeof f[r] == "string" && (v = y.call(this, f[r])), w.call(this, f.$anchor), w.call(this, f.$dynamicAnchor), s[p] = v;
    function y(R) {
      const C = this.opts.uriResolver.resolve;
      if (R = Ri(v ? C(v, R) : R), c.has(R))
        throw l(R);
      c.add(R);
      let M = this.refs[R];
      return typeof M == "string" && (M = this.refs[M]), typeof M == "object" ? u(f, M.schema, R) : R !== Ri(m) && (R[0] === "#" ? (u(f, o[R], R), o[R] = f) : this.refs[R] = m), R;
    }
    function w(R) {
      if (typeof R == "string") {
        if (!N2.test(R))
          throw new Error(`invalid anchor "${R}"`);
        y.call(this, `#${R}`);
      }
    }
  }), o;
  function u(f, p, h) {
    if (p !== void 0 && !E2(f, p))
      throw l(h);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
We.getSchemaRefs = O2;
Object.defineProperty(er, "__esModule", { value: !0 });
er.getData = er.KeywordCxt = er.validateFunctionCode = void 0;
const zv = Fi, hy = Me, Pd = Ir, Bo = Me, A2 = Rc, Ts = mr, kl = un, ee = fe, ie = vr, I2 = We, Cr = Y, ls = pa;
function C2(e) {
  if (Yv(e) && (Xv(e), Wv(e))) {
    L2(e);
    return;
  }
  Kv(e, () => (0, zv.topBoolOrEmptySchema)(e));
}
er.validateFunctionCode = C2;
function Kv({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, ee._)`${ie.default.data}, ${ie.default.valCxt}`, n.$async, () => {
    e.code((0, ee._)`"use strict"; ${py(r, i)}`), k2(e, i), e.code(s);
  }) : e.func(t, (0, ee._)`${ie.default.data}, ${D2(i)}`, n.$async, () => e.code(py(r, i)).code(s));
}
function D2(e) {
  return (0, ee._)`{${ie.default.instancePath}="", ${ie.default.parentData}, ${ie.default.parentDataProperty}, ${ie.default.rootData}=${ie.default.data}${e.dynamicRef ? (0, ee._)`, ${ie.default.dynamicAnchors}={}` : ee.nil}}={}`;
}
function k2(e, t) {
  e.if(ie.default.valCxt, () => {
    e.var(ie.default.instancePath, (0, ee._)`${ie.default.valCxt}.${ie.default.instancePath}`), e.var(ie.default.parentData, (0, ee._)`${ie.default.valCxt}.${ie.default.parentData}`), e.var(ie.default.parentDataProperty, (0, ee._)`${ie.default.valCxt}.${ie.default.parentDataProperty}`), e.var(ie.default.rootData, (0, ee._)`${ie.default.valCxt}.${ie.default.rootData}`), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, ee._)`${ie.default.valCxt}.${ie.default.dynamicAnchors}`);
  }, () => {
    e.var(ie.default.instancePath, (0, ee._)`""`), e.var(ie.default.parentData, (0, ee._)`undefined`), e.var(ie.default.parentDataProperty, (0, ee._)`undefined`), e.var(ie.default.rootData, ie.default.data), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, ee._)`{}`);
  });
}
function L2(e) {
  const { schema: t, opts: r, gen: n } = e;
  Kv(e, () => {
    r.$comment && t.$comment && Qv(e), x2(e), n.let(ie.default.vErrors, null), n.let(ie.default.errors, 0), r.unevaluated && F2(e), Jv(e), B2(e);
  });
}
function F2(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, ee._)`${r}.evaluated`), t.if((0, ee._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ee._)`${e.evaluated}.props`, (0, ee._)`undefined`)), t.if((0, ee._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ee._)`${e.evaluated}.items`, (0, ee._)`undefined`));
}
function py(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, ee._)`/*# sourceURL=${r} */` : ee.nil;
}
function j2(e, t) {
  if (Yv(e) && (Xv(e), Wv(e))) {
    U2(e, t);
    return;
  }
  (0, zv.boolOrEmptySchema)(e, t);
}
function Wv({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Yv(e) {
  return typeof e.schema != "boolean";
}
function U2(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && Qv(e), V2(e), q2(e);
  const s = n.const("_errs", ie.default.errors);
  Jv(e, s), n.var(t, (0, ee._)`${s} === ${ie.default.errors}`);
}
function Xv(e) {
  (0, Cr.checkUnknownRules)(e), M2(e);
}
function Jv(e, t) {
  if (e.opts.jtd)
    return my(e, [], !1, t);
  const r = (0, hy.getSchemaTypes)(e.schema), n = (0, hy.coerceAndCheckDataType)(e, r);
  my(e, r, !n, t);
}
function M2(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Cr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function x2(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Cr.checkStrictMode)(e, "default is ignored in the schema root");
}
function V2(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, I2.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function q2(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Qv({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, ee._)`${ie.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const a = (0, ee.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, ee._)`${ie.default.self}.opts.$comment(${s}, ${a}, ${o}.schema)`);
  }
}
function B2(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, ee._)`${ie.default.errors} === 0`, () => t.return(ie.default.data), () => t.throw((0, ee._)`new ${i}(${ie.default.vErrors})`)) : (t.assign((0, ee._)`${n}.errors`, ie.default.vErrors), s.unevaluated && G2(e), t.return((0, ee._)`${ie.default.errors} === 0`));
}
function G2({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof ee.Name && e.assign((0, ee._)`${t}.props`, r), n instanceof ee.Name && e.assign((0, ee._)`${t}.items`, n);
}
function my(e, t, r, n) {
  const { gen: i, schema: s, data: a, allErrors: o, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, Cr.schemaHasRulesButRef)(s, l))) {
    i.block(() => t_(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || H2(e, t), i.block(() => {
    for (const p of l.rules)
      f(p);
    f(l.post);
  });
  function f(p) {
    (0, Pd.shouldUseGroup)(s, p) && (p.type ? (i.if((0, Bo.checkDataType)(p.type, a, c.strictNumbers)), yy(e, p), t.length === 1 && t[0] === p.type && r && (i.else(), (0, Bo.reportTypeError)(e)), i.endIf()) : yy(e, p), o || i.if((0, ee._)`${ie.default.errors} === ${n || 0}`));
  }
}
function yy(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, A2.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, Pd.shouldUseRule)(n, s) && t_(e, s.keyword, s.definition, t.type);
  });
}
function H2(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (z2(e, t), e.opts.allowUnionTypes || K2(e, t), W2(e, e.dataTypes));
}
function z2(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Zv(e.dataTypes, r) || Td(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), X2(e, t);
  }
}
function K2(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Td(e, "use allowUnionTypes to allow union type keyword");
}
function W2(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, Pd.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((a) => Y2(t, a)) && Td(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function Y2(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Zv(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function X2(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Zv(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Td(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Cr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class e_ {
  constructor(t, r, n) {
    if ((0, Ts.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Cr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", r_(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ts.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ie.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, ee.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, ee.not)(t), void 0, r);
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
    this.fail((0, ee._)`${r} !== undefined && (${(0, ee.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? ls.reportExtraError : ls.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, ls.reportError)(this, this.def.$dataError || ls.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, ls.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = ee.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = ee.nil, r = ee.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: a } = this;
    n.if((0, ee.or)((0, ee._)`${i} === undefined`, r)), t !== ee.nil && n.assign(t, !0), (s.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== ee.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, ee.or)(a(), o());
    function a() {
      if (n.length) {
        if (!(r instanceof ee.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, ee._)`${(0, Bo.checkDataTypes)(c, r, s.opts.strictNumbers, Bo.DataType.Wrong)}`;
      }
      return ee.nil;
    }
    function o() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ee._)`!${c}(${r})`;
      }
      return ee.nil;
    }
  }
  subschema(t, r) {
    const n = (0, kl.getSubschema)(this.it, t);
    (0, kl.extendSubschemaData)(n, this.it, t), (0, kl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return j2(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Cr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Cr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, ee.Name)), !0;
  }
}
er.KeywordCxt = e_;
function t_(e, t, r, n) {
  const i = new e_(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Ts.funcKeywordCode)(i, r) : "macro" in r ? (0, Ts.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Ts.funcKeywordCode)(i, r);
}
const J2 = /^\/(?:[^~]|~0|~1)*$/, Q2 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function r_(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ie.default.rootData;
  if (e[0] === "/") {
    if (!J2.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ie.default.rootData;
  } else {
    const u = Q2.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
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
  for (const u of o)
    u && (s = (0, ee._)`${s}${(0, ee.getProperty)((0, Cr.unescapeJsonPointer)(u))}`, a = (0, ee._)`${a} && ${s}`);
  return a;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
er.getData = r_;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
class Z2 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
ma.default = Z2;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const Ll = We;
class eM extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ll.resolveUrl)(t, r, n), this.missingSchema = (0, Ll.normalizeId)((0, Ll.getFullPath)(t, this.missingRef));
  }
}
Wi.default = eM;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.resolveSchema = St.getCompilingSchema = St.resolveRef = St.compileSchema = St.SchemaEnv = void 0;
const zt = fe, tM = ma, Nn = vr, Qt = We, gy = Y, rM = er;
class Nc {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
St.SchemaEnv = Nc;
function Rd(e) {
  const t = n_.call(this, e);
  if (t)
    return t;
  const r = (0, Qt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, a = new zt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let o;
  e.$async && (o = a.scopeValue("Error", {
    ref: tM.default,
    code: (0, zt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Nn.default.data,
    parentData: Nn.default.parentData,
    parentDataProperty: Nn.default.parentDataProperty,
    dataNames: [Nn.default.data],
    dataPathArr: [zt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, zt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: zt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, zt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, rM.validateFunctionCode)(u), a.optimize(this.opts.code.optimize);
    const f = a.toString();
    l = `${a.scopeRefs(Nn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${Nn.default.self}`, `${Nn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: f, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: _, items: m } = u;
      h.evaluated = {
        props: _ instanceof zt.Name ? void 0 : _,
        items: m instanceof zt.Name ? void 0 : m,
        dynamicProps: _ instanceof zt.Name,
        dynamicItems: m instanceof zt.Name
      }, h.source && (h.source.evaluated = (0, zt.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
St.compileSchema = Rd;
function nM(e, t, r) {
  var n;
  r = (0, Qt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = aM.call(this, e, r);
  if (s === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    a && (s = new Nc({ schema: a, schemaId: o, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = iM.call(this, s);
}
St.resolveRef = nM;
function iM(e) {
  return (0, Qt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Rd.call(this, e);
}
function n_(e) {
  for (const t of this._compilations)
    if (sM(t, e))
      return t;
}
St.getCompilingSchema = n_;
function sM(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function aM(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Oc.call(this, e, t);
}
function Oc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Qt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Fl.call(this, r, e);
  const s = (0, Qt.normalizeId)(n), a = this.refs[s] || this.schemas[s];
  if (typeof a == "string") {
    const o = Oc.call(this, e, a);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : Fl.call(this, r, o);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Rd.call(this, a), s === (0, Qt.normalizeId)(t)) {
      const { schema: o } = a, { schemaId: c } = this.opts, u = o[c];
      return u && (i = (0, Qt.resolveUrl)(this.opts.uriResolver, i, u)), new Nc({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return Fl.call(this, r, a);
  }
}
St.resolveSchema = Oc;
const oM = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Fl(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, gy.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !oM.has(o) && u && (t = (0, Qt.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, gy.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Qt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = Oc.call(this, n, o);
  }
  const { schemaId: a } = this.opts;
  if (s = s || new Nc({ schema: r, schemaId: a, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const cM = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", lM = "Meta-schema for $data reference (JSON AnySchema extension proposal)", uM = "object", fM = [
  "$data"
], dM = {
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
}, hM = !1, pM = {
  $id: cM,
  description: lM,
  type: uM,
  required: fM,
  properties: dM,
  additionalProperties: hM
};
var Nd = {};
Object.defineProperty(Nd, "__esModule", { value: !0 });
const i_ = hv;
i_.code = 'require("ajv/dist/runtime/uri").default';
Nd.default = i_;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = er;
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
  const n = ma, i = Wi, s = Kn, a = St, o = fe, c = We, u = Me, l = Y, f = pM, p = Nd, h = (O, b) => new RegExp(O, b);
  h.code = "new RegExp";
  const _ = ["removeAdditional", "useDefaults", "coerceTypes"], m = /* @__PURE__ */ new Set([
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
  ]), v = {
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
  function R(O) {
    var b, P, S, d, $, N, E, g, j, A, W, de, ge, we, Te, Je, $e, je, Vt, Dt, Rt, kt, _r, Er, wr;
    const Nt = O.strict, Lt = (b = O.code) === null || b === void 0 ? void 0 : b.optimize, br = Lt === !0 || Lt === void 0 ? 1 : Lt || 0, Ur = (S = (P = O.code) === null || P === void 0 ? void 0 : P.regExp) !== null && S !== void 0 ? S : h, _t = (d = O.uriResolver) !== null && d !== void 0 ? d : p.default;
    return {
      strictSchema: (N = ($ = O.strictSchema) !== null && $ !== void 0 ? $ : Nt) !== null && N !== void 0 ? N : !0,
      strictNumbers: (g = (E = O.strictNumbers) !== null && E !== void 0 ? E : Nt) !== null && g !== void 0 ? g : !0,
      strictTypes: (A = (j = O.strictTypes) !== null && j !== void 0 ? j : Nt) !== null && A !== void 0 ? A : "log",
      strictTuples: (de = (W = O.strictTuples) !== null && W !== void 0 ? W : Nt) !== null && de !== void 0 ? de : "log",
      strictRequired: (we = (ge = O.strictRequired) !== null && ge !== void 0 ? ge : Nt) !== null && we !== void 0 ? we : !1,
      code: O.code ? { ...O.code, optimize: br, regExp: Ur } : { optimize: br, regExp: Ur },
      loopRequired: (Te = O.loopRequired) !== null && Te !== void 0 ? Te : w,
      loopEnum: (Je = O.loopEnum) !== null && Je !== void 0 ? Je : w,
      meta: ($e = O.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (je = O.messages) !== null && je !== void 0 ? je : !0,
      inlineRefs: (Vt = O.inlineRefs) !== null && Vt !== void 0 ? Vt : !0,
      schemaId: (Dt = O.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Rt = O.addUsedSchema) !== null && Rt !== void 0 ? Rt : !0,
      validateSchema: (kt = O.validateSchema) !== null && kt !== void 0 ? kt : !0,
      validateFormats: (_r = O.validateFormats) !== null && _r !== void 0 ? _r : !0,
      unicodeRegExp: (Er = O.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (wr = O.int32range) !== null && wr !== void 0 ? wr : !0,
      uriResolver: _t
    };
  }
  class C {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...R(b) };
      const { es5: P, lines: S } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: m, es5: P, lines: S }), this.logger = G(b.logger);
      const d = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), M.call(this, v, b, "NOT SUPPORTED"), M.call(this, y, b, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), b.formats && he.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && I.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), z.call(this), b.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: P, schemaId: S } = this.opts;
      let d = f;
      S === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), P && b && this.addMetaSchema(d, d[S], !1);
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
      async function d(A, W) {
        await $.call(this, A.$schema);
        const de = this._addSchema(A, W);
        return de.validate || N.call(this, de);
      }
      async function $(A) {
        A && !this.getSchema(A) && await d.call(this, { $ref: A }, !0);
      }
      async function N(A) {
        try {
          return this._compileSchemaEnv(A);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return E.call(this, W), await g.call(this, W.missingSchema), N.call(this, A);
        }
      }
      function E({ missingSchema: A, missingRef: W }) {
        if (this.refs[A])
          throw new Error(`AnySchema ${A} is loaded but ${W} cannot be resolved`);
      }
      async function g(A) {
        const W = await j.call(this, A);
        this.refs[A] || await $.call(this, W.$schema), this.refs[A] || this.addSchema(W, A, P);
      }
      async function j(A) {
        const W = this._loading[A];
        if (W)
          return W;
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
      for (; typeof (P = H.call(this, b)) == "string"; )
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
          const P = H.call(this, b);
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
        return (0, l.eachItem)(S, ($) => D.call(this, $)), this;
      F.call(this, P);
      const d = {
        ...P,
        type: (0, u.getJSONTypes)(P.type),
        schemaType: (0, u.getJSONTypes)(P.schemaType)
      };
      return (0, l.eachItem)(S, d.type.length === 0 ? ($) => D.call(this, $, d) : ($) => d.type.forEach((N) => D.call(this, $, d, N))), this;
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
          const { $data: j } = g.definition, A = N[E];
          j && A && (N[E] = U(A));
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
      const j = c.getSchemaRefs.call(this, b, S);
      return g = new a.SchemaEnv({ schema: b, schemaId: E, meta: P, baseId: S, localRefs: j }), this._cache.set(g.schema, g), $ && !S.startsWith("#") && (S && this._checkUnique(S), this.refs[S] = g), d && this.validateSchema(b, !0), g;
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
  C.ValidationError = n.default, C.MissingRefError = i.default, e.default = C;
  function M(O, b, P, S = "error") {
    for (const d in O) {
      const $ = d;
      $ in b && this.logger[S](`${P}: option ${d}. ${O[$]}`);
    }
  }
  function H(O) {
    return O = (0, c.normalizeId)(O), this.schemas[O] || this.refs[O];
  }
  function z() {
    const O = this.opts.schemas;
    if (O)
      if (Array.isArray(O))
        this.addSchema(O);
      else
        for (const b in O)
          this.addSchema(O[b], b);
  }
  function he() {
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
  function Q() {
    const O = { ...this.opts };
    for (const b of _)
      delete O[b];
    return O;
  }
  const B = { log() {
  }, warn() {
  }, error() {
  } };
  function G(O) {
    if (O === !1)
      return B;
    if (O === void 0)
      return console;
    if (O.log && O.warn && O.error)
      return O;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(O, b) {
    const { RULES: P } = this;
    if ((0, l.eachItem)(O, (S) => {
      if (P.keywords[S])
        throw new Error(`Keyword ${S} is already defined`);
      if (!J.test(S))
        throw new Error(`Keyword ${S} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(O, b, P) {
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
        type: (0, u.getJSONTypes)(b.type),
        schemaType: (0, u.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? x.call(this, N, E, b.before) : N.rules.push(E), $.all[O] = E, (S = b.implements) === null || S === void 0 || S.forEach((g) => this.addKeyword(g));
  }
  function x(O, b, P) {
    const S = O.rules.findIndex((d) => d.keyword === P);
    S >= 0 ? O.rules.splice(S, 0, b) : (O.rules.push(b), this.logger.warn(`rule ${P} is not defined`));
  }
  function F(O) {
    let { metaSchema: b } = O;
    b !== void 0 && (O.$data && this.opts.$data && (b = U(b)), O.validateSchema = this.compile(b, !0));
  }
  const V = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function U(O) {
    return { anyOf: [O, V] };
  }
})(Tv);
var Od = {}, Ad = {}, Id = {};
Object.defineProperty(Id, "__esModule", { value: !0 });
const mM = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Id.default = mM;
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.callRef = Wn.getValidate = void 0;
const yM = Wi, $y = me, bt = fe, li = vr, vy = St, Xa = Y, gM = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: a, opts: o, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = vy.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new yM.default(n.opts.uriResolver, i, r);
    if (l instanceof vy.SchemaEnv)
      return p(l);
    return h(l);
    function f() {
      if (s === u)
        return Eo(e, a, s, s.$async);
      const _ = t.scopeValue("root", { ref: u });
      return Eo(e, (0, bt._)`${_}.validate`, u, u.$async);
    }
    function p(_) {
      const m = s_(e, _);
      Eo(e, m, _, _.$async);
    }
    function h(_) {
      const m = t.scopeValue("schema", o.code.source === !0 ? { ref: _, code: (0, bt.stringify)(_) } : { ref: _ }), v = t.name("valid"), y = e.subschema({
        schema: _,
        dataTypes: [],
        schemaPath: bt.nil,
        topSchemaRef: m,
        errSchemaPath: r
      }, v);
      e.mergeEvaluated(y), e.ok(v);
    }
  }
};
function s_(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, bt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Wn.getValidate = s_;
function Eo(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: a, schemaEnv: o, opts: c } = s, u = c.passContext ? li.default.this : bt.nil;
  n ? l() : f();
  function l() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const _ = i.let("valid");
    i.try(() => {
      i.code((0, bt._)`await ${(0, $y.callValidateCode)(e, t, u)}`), h(t), a || i.assign(_, !0);
    }, (m) => {
      i.if((0, bt._)`!(${m} instanceof ${s.ValidationError})`, () => i.throw(m)), p(m), a || i.assign(_, !1);
    }), e.ok(_);
  }
  function f() {
    e.result((0, $y.callValidateCode)(e, t, u), () => h(t), () => p(t));
  }
  function p(_) {
    const m = (0, bt._)`${_}.errors`;
    i.assign(li.default.vErrors, (0, bt._)`${li.default.vErrors} === null ? ${m} : ${li.default.vErrors}.concat(${m})`), i.assign(li.default.errors, (0, bt._)`${li.default.vErrors}.length`);
  }
  function h(_) {
    var m;
    if (!s.opts.unevaluated)
      return;
    const v = (m = r == null ? void 0 : r.validate) === null || m === void 0 ? void 0 : m.evaluated;
    if (s.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (s.props = Xa.mergeEvaluated.props(i, v.props, s.props));
      else {
        const y = i.var("props", (0, bt._)`${_}.evaluated.props`);
        s.props = Xa.mergeEvaluated.props(i, y, s.props, bt.Name);
      }
    if (s.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (s.items = Xa.mergeEvaluated.items(i, v.items, s.items));
      else {
        const y = i.var("items", (0, bt._)`${_}.evaluated.items`);
        s.items = Xa.mergeEvaluated.items(i, y, s.items, bt.Name);
      }
  }
}
Wn.callRef = Eo;
Wn.default = gM;
Object.defineProperty(Ad, "__esModule", { value: !0 });
const $M = Id, vM = Wn, _M = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  $M.default,
  vM.default
];
Ad.default = _M;
var Cd = {}, Dd = {};
Object.defineProperty(Dd, "__esModule", { value: !0 });
const Go = fe, Yr = Go.operators, Ho = {
  maximum: { okStr: "<=", ok: Yr.LTE, fail: Yr.GT },
  minimum: { okStr: ">=", ok: Yr.GTE, fail: Yr.LT },
  exclusiveMaximum: { okStr: "<", ok: Yr.LT, fail: Yr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Yr.GT, fail: Yr.LTE }
}, EM = {
  message: ({ keyword: e, schemaCode: t }) => (0, Go.str)`must be ${Ho[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Go._)`{comparison: ${Ho[e].okStr}, limit: ${t}}`
}, wM = {
  keyword: Object.keys(Ho),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: EM,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Go._)`${r} ${Ho[t].fail} ${n} || isNaN(${r})`);
  }
};
Dd.default = wM;
var kd = {};
Object.defineProperty(kd, "__esModule", { value: !0 });
const Rs = fe, bM = {
  message: ({ schemaCode: e }) => (0, Rs.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Rs._)`{multipleOf: ${e}}`
}, SM = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: bM,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, a = t.let("res"), o = s ? (0, Rs._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}` : (0, Rs._)`${a} !== parseInt(${a})`;
    e.fail$data((0, Rs._)`(${n} === 0 || (${a} = ${r}/${n}, ${o}))`);
  }
};
kd.default = SM;
var Ld = {}, Fd = {};
Object.defineProperty(Fd, "__esModule", { value: !0 });
function a_(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Fd.default = a_;
a_.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ld, "__esModule", { value: !0 });
const jn = fe, PM = Y, TM = Fd, RM = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, jn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, jn._)`{limit: ${e}}`
}, NM = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: RM,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? jn.operators.GT : jn.operators.LT, a = i.opts.unicode === !1 ? (0, jn._)`${r}.length` : (0, jn._)`${(0, PM.useFunc)(e.gen, TM.default)}(${r})`;
    e.fail$data((0, jn._)`${a} ${s} ${n}`);
  }
};
Ld.default = NM;
var jd = {};
Object.defineProperty(jd, "__esModule", { value: !0 });
const OM = me, zo = fe, AM = {
  message: ({ schemaCode: e }) => (0, zo.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, zo._)`{pattern: ${e}}`
}, IM = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: AM,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, a = s.opts.unicodeRegExp ? "u" : "", o = r ? (0, zo._)`(new RegExp(${i}, ${a}))` : (0, OM.usePattern)(e, n);
    e.fail$data((0, zo._)`!${o}.test(${t})`);
  }
};
jd.default = IM;
var Ud = {};
Object.defineProperty(Ud, "__esModule", { value: !0 });
const Ns = fe, CM = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ns.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ns._)`{limit: ${e}}`
}, DM = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: CM,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Ns.operators.GT : Ns.operators.LT;
    e.fail$data((0, Ns._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Ud.default = DM;
var Md = {};
Object.defineProperty(Md, "__esModule", { value: !0 });
const us = me, Os = fe, kM = Y, LM = {
  message: ({ params: { missingProperty: e } }) => (0, Os.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Os._)`{missingProperty: ${e}}`
}, FM = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: LM,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: a } = e, { opts: o } = a;
    if (!s && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (a.allErrors ? u() : l(), o.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: _ } = e.it;
      for (const m of r)
        if ((h == null ? void 0 : h[m]) === void 0 && !_.has(m)) {
          const v = a.schemaEnv.baseId + a.errSchemaPath, y = `required property "${m}" is not defined at "${v}" (strictRequired)`;
          (0, kM.checkStrictMode)(a, y, a.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(Os.nil, f);
      else
        for (const h of r)
          (0, us.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || s) {
        const _ = t.let("valid", !0);
        e.block$data(_, () => p(h, _)), e.ok(_);
      } else
        t.if((0, us.checkMissingProp)(e, r, h)), (0, us.reportMissingProp)(e, h), t.else();
    }
    function f() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, us.noPropertyInData)(t, i, h, o.ownProperties), () => e.error());
      });
    }
    function p(h, _) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(_, (0, us.propertyInData)(t, i, h, o.ownProperties)), t.if((0, Os.not)(_), () => {
          e.error(), t.break();
        });
      }, Os.nil);
    }
  }
};
Md.default = FM;
var xd = {};
Object.defineProperty(xd, "__esModule", { value: !0 });
const As = fe, jM = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, As.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, As._)`{limit: ${e}}`
}, UM = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: jM,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? As.operators.GT : As.operators.LT;
    e.fail$data((0, As._)`${r}.length ${i} ${n}`);
  }
};
xd.default = UM;
var Vd = {}, ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const o_ = _c;
o_.code = 'require("ajv/dist/runtime/equal").default';
ya.default = o_;
Object.defineProperty(Vd, "__esModule", { value: !0 });
const jl = Me, ze = fe, MM = Y, xM = ya, VM = {
  message: ({ params: { i: e, j: t } }) => (0, ze.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ze._)`{i: ${e}, j: ${t}}`
}, qM = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: VM,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: a, it: o } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, jl.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, ze._)`${a} === false`), e.ok(c);
    function l() {
      const _ = t.let("i", (0, ze._)`${r}.length`), m = t.let("j");
      e.setParams({ i: _, j: m }), t.assign(c, !0), t.if((0, ze._)`${_} > 1`, () => (f() ? p : h)(_, m));
    }
    function f() {
      return u.length > 0 && !u.some((_) => _ === "object" || _ === "array");
    }
    function p(_, m) {
      const v = t.name("item"), y = (0, jl.checkDataTypes)(u, v, o.opts.strictNumbers, jl.DataType.Wrong), w = t.const("indices", (0, ze._)`{}`);
      t.for((0, ze._)`;${_}--;`, () => {
        t.let(v, (0, ze._)`${r}[${_}]`), t.if(y, (0, ze._)`continue`), u.length > 1 && t.if((0, ze._)`typeof ${v} == "string"`, (0, ze._)`${v} += "_"`), t.if((0, ze._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign(m, (0, ze._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, ze._)`${w}[${v}] = ${_}`);
      });
    }
    function h(_, m) {
      const v = (0, MM.useFunc)(t, xM.default), y = t.name("outer");
      t.label(y).for((0, ze._)`;${_}--;`, () => t.for((0, ze._)`${m} = ${_}; ${m}--;`, () => t.if((0, ze._)`${v}(${r}[${_}], ${r}[${m}])`, () => {
        e.error(), t.assign(c, !1).break(y);
      })));
    }
  }
};
Vd.default = qM;
var qd = {};
Object.defineProperty(qd, "__esModule", { value: !0 });
const Pu = fe, BM = Y, GM = ya, HM = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Pu._)`{allowedValue: ${e}}`
}, zM = {
  keyword: "const",
  $data: !0,
  error: HM,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, Pu._)`!${(0, BM.useFunc)(t, GM.default)}(${r}, ${i})`) : e.fail((0, Pu._)`${s} !== ${r}`);
  }
};
qd.default = zM;
var Bd = {};
Object.defineProperty(Bd, "__esModule", { value: !0 });
const ys = fe, KM = Y, WM = ya, YM = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, ys._)`{allowedValues: ${e}}`
}, XM = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: YM,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= a.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, KM.useFunc)(t, WM.default));
    let l;
    if (o || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", s);
      l = (0, ys.or)(...i.map((_, m) => p(h, m)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (h) => t.if((0, ys._)`${u()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function p(h, _) {
      const m = i[_];
      return typeof m == "object" && m !== null ? (0, ys._)`${u()}(${r}, ${h}[${_}])` : (0, ys._)`${r} === ${m}`;
    }
  }
};
Bd.default = XM;
Object.defineProperty(Cd, "__esModule", { value: !0 });
const JM = Dd, QM = kd, ZM = Ld, ex = jd, tx = Ud, rx = Md, nx = xd, ix = Vd, sx = qd, ax = Bd, ox = [
  // number
  JM.default,
  QM.default,
  // string
  ZM.default,
  ex.default,
  // object
  tx.default,
  rx.default,
  // array
  nx.default,
  ix.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  sx.default,
  ax.default
];
Cd.default = ox;
var Gd = {}, Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.validateAdditionalItems = void 0;
const Un = fe, Tu = Y, cx = {
  message: ({ params: { len: e } }) => (0, Un.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Un._)`{limit: ${e}}`
}, lx = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: cx,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Tu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    c_(e, n);
  }
};
function c_(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: a } = e;
  a.items = !0;
  const o = r.const("len", (0, Un._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Un._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Tu.alwaysValidSchema)(a, n)) {
    const u = r.var("valid", (0, Un._)`${o} <= ${t.length}`);
    r.if((0, Un.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, o, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: Tu.Type.Num }, u), a.allErrors || r.if((0, Un.not)(u), () => r.break());
    });
  }
}
Yi.validateAdditionalItems = c_;
Yi.default = lx;
var Hd = {}, Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.validateTuple = void 0;
const _y = fe, wo = Y, ux = me, fx = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return l_(e, "additionalItems", t);
    r.items = !0, !(0, wo.alwaysValidSchema)(r, t) && e.ok((0, ux.validateArray)(e));
  }
};
function l_(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: a, it: o } = e;
  l(i), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = wo.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), u = n.const("len", (0, _y._)`${s}.length`);
  r.forEach((f, p) => {
    (0, wo.alwaysValidSchema)(o, f) || (n.if((0, _y._)`${u} > ${p}`, () => e.subschema({
      keyword: a,
      schemaProp: p,
      dataProp: p
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: p, errSchemaPath: h } = o, _ = r.length, m = _ === f.minItems && (_ === f.maxItems || f[t] === !1);
    if (p.strictTuples && !m) {
      const v = `"${a}" is ${_}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, wo.checkStrictMode)(o, v, p.strictTuples);
    }
  }
}
Xi.validateTuple = l_;
Xi.default = fx;
Object.defineProperty(Hd, "__esModule", { value: !0 });
const dx = Xi, hx = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, dx.validateTuple)(e, "items")
};
Hd.default = hx;
var zd = {};
Object.defineProperty(zd, "__esModule", { value: !0 });
const Ey = fe, px = Y, mx = me, yx = Yi, gx = {
  message: ({ params: { len: e } }) => (0, Ey.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ey._)`{limit: ${e}}`
}, $x = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: gx,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, px.alwaysValidSchema)(n, t) && (i ? (0, yx.validateAdditionalItems)(e, i) : e.ok((0, mx.validateArray)(e)));
  }
};
zd.default = $x;
var Kd = {};
Object.defineProperty(Kd, "__esModule", { value: !0 });
const xt = fe, Ja = Y, vx = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, xt.str)`must contain at least ${e} valid item(s)` : (0, xt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, xt._)`{minContains: ${e}}` : (0, xt._)`{minContains: ${e}, maxContains: ${t}}`
}, _x = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: vx,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let a, o;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (a = c === void 0 ? 1 : c, o = u) : a = 1;
    const l = t.const("len", (0, xt._)`${i}.length`);
    if (e.setParams({ min: a, max: o }), o === void 0 && a === 0) {
      (0, Ja.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && a > o) {
      (0, Ja.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Ja.alwaysValidSchema)(s, r)) {
      let m = (0, xt._)`${l} >= ${a}`;
      o !== void 0 && (m = (0, xt._)`${m} && ${l} <= ${o}`), e.pass(m);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    o === void 0 && a === 1 ? h(f, () => t.if(f, () => t.break())) : a === 0 ? (t.let(f, !0), o !== void 0 && t.if((0, xt._)`${i}.length > 0`, p)) : (t.let(f, !1), p()), e.result(f, () => e.reset());
    function p() {
      const m = t.name("_valid"), v = t.let("count", 0);
      h(m, () => t.if(m, () => _(v)));
    }
    function h(m, v) {
      t.forRange("i", 0, l, (y) => {
        e.subschema({
          keyword: "contains",
          dataProp: y,
          dataPropType: Ja.Type.Num,
          compositeRule: !0
        }, m), v();
      });
    }
    function _(m) {
      t.code((0, xt._)`${m}++`), o === void 0 ? t.if((0, xt._)`${m} >= ${a}`, () => t.assign(f, !0).break()) : (t.if((0, xt._)`${m} > ${o}`, () => t.assign(f, !1).break()), a === 1 ? t.assign(f, !0) : t.if((0, xt._)`${m} >= ${a}`, () => t.assign(f, !0)));
    }
  }
};
Kd.default = _x;
var u_ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = fe, r = Y, n = me;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      a(c, u), o(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const p = Array.isArray(c[f]) ? u : l;
      p[f] = c[f];
    }
    return [u, l];
  }
  function a(c, u = c.schema) {
    const { gen: l, data: f, it: p } = c;
    if (Object.keys(u).length === 0)
      return;
    const h = l.let("missing");
    for (const _ in u) {
      const m = u[_];
      if (m.length === 0)
        continue;
      const v = (0, n.propertyInData)(l, f, _, p.opts.ownProperties);
      c.setParams({
        property: _,
        depsCount: m.length,
        deps: m.join(", ")
      }), p.allErrors ? l.if(v, () => {
        for (const y of m)
          (0, n.checkReportMissingProp)(c, y);
      }) : (l.if((0, t._)`${v} && (${(0, n.checkMissingProp)(c, m, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function o(c, u = c.schema) {
    const { gen: l, data: f, keyword: p, it: h } = c, _ = l.name("valid");
    for (const m in u)
      (0, r.alwaysValidSchema)(h, u[m]) || (l.if(
        (0, n.propertyInData)(l, f, m, h.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: p, schemaProp: m }, _);
          c.mergeValidEvaluated(v, _);
        },
        () => l.var(_, !0)
        // TODO var
      ), c.ok(_));
  }
  e.validateSchemaDeps = o, e.default = i;
})(u_);
var Wd = {};
Object.defineProperty(Wd, "__esModule", { value: !0 });
const f_ = fe, Ex = Y, wx = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, f_._)`{propertyName: ${e.propertyName}}`
}, bx = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: wx,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, Ex.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, s), t.if((0, f_.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Wd.default = bx;
var Ac = {};
Object.defineProperty(Ac, "__esModule", { value: !0 });
const Qa = me, Wt = fe, Sx = vr, Za = Y, Px = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Wt._)`{additionalProperty: ${e.additionalProperty}}`
}, Tx = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Px,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Za.alwaysValidSchema)(a, r))
      return;
    const u = (0, Qa.allSchemaProperties)(n.properties), l = (0, Qa.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Wt._)`${s} === ${Sx.default.errors}`);
    function f() {
      t.forIn("key", i, (v) => {
        !u.length && !l.length ? _(v) : t.if(p(v), () => _(v));
      });
    }
    function p(v) {
      let y;
      if (u.length > 8) {
        const w = (0, Za.schemaRefOrVal)(a, n.properties, "properties");
        y = (0, Qa.isOwnProperty)(t, w, v);
      } else u.length ? y = (0, Wt.or)(...u.map((w) => (0, Wt._)`${v} === ${w}`)) : y = Wt.nil;
      return l.length && (y = (0, Wt.or)(y, ...l.map((w) => (0, Wt._)`${(0, Qa.usePattern)(e, w)}.test(${v})`))), (0, Wt.not)(y);
    }
    function h(v) {
      t.code((0, Wt._)`delete ${i}[${v}]`);
    }
    function _(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h(v);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: v }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Za.alwaysValidSchema)(a, r)) {
        const y = t.name("valid");
        c.removeAdditional === "failing" ? (m(v, y, !1), t.if((0, Wt.not)(y), () => {
          e.reset(), h(v);
        })) : (m(v, y), o || t.if((0, Wt.not)(y), () => t.break()));
      }
    }
    function m(v, y, w) {
      const R = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: Za.Type.Str
      };
      w === !1 && Object.assign(R, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(R, y);
    }
  }
};
Ac.default = Tx;
var Yd = {};
Object.defineProperty(Yd, "__esModule", { value: !0 });
const Rx = er, wy = me, Ul = Y, by = Ac, Nx = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && by.default.code(new Rx.KeywordCxt(s, by.default, "additionalProperties"));
    const a = (0, wy.allSchemaProperties)(r);
    for (const f of a)
      s.definedProperties.add(f);
    s.opts.unevaluated && a.length && s.props !== !0 && (s.props = Ul.mergeEvaluated.props(t, (0, Ul.toHash)(a), s.props));
    const o = a.filter((f) => !(0, Ul.alwaysValidSchema)(s, r[f]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const f of o)
      u(f) ? l(f) : (t.if((0, wy.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Yd.default = Nx;
var Xd = {};
Object.defineProperty(Xd, "__esModule", { value: !0 });
const Sy = me, eo = fe, Py = Y, Ty = Y, Ox = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: a } = s, o = (0, Sy.allSchemaProperties)(r), c = o.filter((m) => (0, Py.alwaysValidSchema)(s, r[m]));
    if (o.length === 0 || c.length === o.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof eo.Name) && (s.props = (0, Ty.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    p();
    function p() {
      for (const m of o)
        u && h(m), s.allErrors ? _(m) : (t.var(l, !0), _(m), t.if(l));
    }
    function h(m) {
      for (const v in u)
        new RegExp(m).test(v) && (0, Py.checkStrictMode)(s, `property ${v} matches pattern ${m} (use allowMatchingProperties)`);
    }
    function _(m) {
      t.forIn("key", n, (v) => {
        t.if((0, eo._)`${(0, Sy.usePattern)(e, m)}.test(${v})`, () => {
          const y = c.includes(m);
          y || e.subschema({
            keyword: "patternProperties",
            schemaProp: m,
            dataProp: v,
            dataPropType: Ty.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, eo._)`${f}[${v}]`, !0) : !y && !s.allErrors && t.if((0, eo.not)(l), () => t.break());
        });
      });
    }
  }
};
Xd.default = Ox;
var Jd = {};
Object.defineProperty(Jd, "__esModule", { value: !0 });
const Ax = Y, Ix = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Ax.alwaysValidSchema)(n, r)) {
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
Jd.default = Ix;
var Qd = {};
Object.defineProperty(Qd, "__esModule", { value: !0 });
const Cx = me, Dx = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Cx.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Qd.default = Dx;
var Zd = {};
Object.defineProperty(Zd, "__esModule", { value: !0 });
const bo = fe, kx = Y, Lx = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, bo._)`{passingSchemas: ${e.passing}}`
}, Fx = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Lx,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, a = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(u), e.result(a, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let p;
        (0, kx.alwaysValidSchema)(i, l) ? t.var(c, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, bo._)`${c} && ${a}`).assign(a, !1).assign(o, (0, bo._)`[${o}, ${f}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(o, f), p && e.mergeEvaluated(p, bo.Name);
        });
      });
    }
  }
};
Zd.default = Fx;
var eh = {};
Object.defineProperty(eh, "__esModule", { value: !0 });
const jx = Y, Ux = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, a) => {
      if ((0, jx.alwaysValidSchema)(n, s))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
eh.default = Ux;
var th = {};
Object.defineProperty(th, "__esModule", { value: !0 });
const Ko = fe, d_ = Y, Mx = {
  message: ({ params: e }) => (0, Ko.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ko._)`{failingKeyword: ${e.ifClause}}`
}, xx = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Mx,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, d_.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Ry(n, "then"), s = Ry(n, "else");
    if (!i && !s)
      return;
    const a = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(o, u("then", l), u("else", l));
    } else i ? t.if(o, u("then")) : t.if((0, Ko.not)(o), u("else"));
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
    function u(l, f) {
      return () => {
        const p = e.subschema({ keyword: l }, o);
        t.assign(a, o), e.mergeValidEvaluated(p, a), f ? t.assign(f, (0, Ko._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ry(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, d_.alwaysValidSchema)(e, r);
}
th.default = xx;
var rh = {};
Object.defineProperty(rh, "__esModule", { value: !0 });
const Vx = Y, qx = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Vx.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
rh.default = qx;
Object.defineProperty(Gd, "__esModule", { value: !0 });
const Bx = Yi, Gx = Hd, Hx = Xi, zx = zd, Kx = Kd, Wx = u_, Yx = Wd, Xx = Ac, Jx = Yd, Qx = Xd, Zx = Jd, e3 = Qd, t3 = Zd, r3 = eh, n3 = th, i3 = rh;
function s3(e = !1) {
  const t = [
    // any
    Zx.default,
    e3.default,
    t3.default,
    r3.default,
    n3.default,
    i3.default,
    // object
    Yx.default,
    Xx.default,
    Wx.default,
    Jx.default,
    Qx.default
  ];
  return e ? t.push(Gx.default, zx.default) : t.push(Bx.default, Hx.default), t.push(Kx.default), t;
}
Gd.default = s3;
var nh = {}, ih = {};
Object.defineProperty(ih, "__esModule", { value: !0 });
const ke = fe, a3 = {
  message: ({ schemaCode: e }) => (0, ke.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ke._)`{format: ${e}}`
}, o3 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: a3,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: a, it: o } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = o;
    if (!c.validateFormats)
      return;
    i ? p() : h();
    function p() {
      const _ = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), m = r.const("fDef", (0, ke._)`${_}[${a}]`), v = r.let("fType"), y = r.let("format");
      r.if((0, ke._)`typeof ${m} == "object" && !(${m} instanceof RegExp)`, () => r.assign(v, (0, ke._)`${m}.type || "string"`).assign(y, (0, ke._)`${m}.validate`), () => r.assign(v, (0, ke._)`"string"`).assign(y, m)), e.fail$data((0, ke.or)(w(), R()));
      function w() {
        return c.strictSchema === !1 ? ke.nil : (0, ke._)`${a} && !${y}`;
      }
      function R() {
        const C = l.$async ? (0, ke._)`(${m}.async ? await ${y}(${n}) : ${y}(${n}))` : (0, ke._)`${y}(${n})`, M = (0, ke._)`(typeof ${y} == "function" ? ${C} : ${y}.test(${n}))`;
        return (0, ke._)`${y} && ${y} !== true && ${v} === ${t} && !${M}`;
      }
    }
    function h() {
      const _ = f.formats[s];
      if (!_) {
        w();
        return;
      }
      if (_ === !0)
        return;
      const [m, v, y] = R(_);
      m === t && e.pass(C());
      function w() {
        if (c.strictSchema === !1) {
          f.logger.warn(M());
          return;
        }
        throw new Error(M());
        function M() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function R(M) {
        const H = M instanceof RegExp ? (0, ke.regexpCode)(M) : c.code.formats ? (0, ke._)`${c.code.formats}${(0, ke.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: M, code: H });
        return typeof M == "object" && !(M instanceof RegExp) ? [M.type || "string", M.validate, (0, ke._)`${z}.validate`] : ["string", M, z];
      }
      function C() {
        if (typeof _ == "object" && !(_ instanceof RegExp) && _.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, ke._)`await ${y}(${n})`;
        }
        return typeof v == "function" ? (0, ke._)`${y}(${n})` : (0, ke._)`${y}.test(${n})`;
      }
    }
  }
};
ih.default = o3;
Object.defineProperty(nh, "__esModule", { value: !0 });
const c3 = ih, l3 = [c3.default];
nh.default = l3;
var ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.contentVocabulary = ji.metadataVocabulary = void 0;
ji.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
ji.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Od, "__esModule", { value: !0 });
const u3 = Ad, f3 = Cd, d3 = Gd, h3 = nh, Ny = ji, p3 = [
  u3.default,
  f3.default,
  (0, d3.default)(),
  h3.default,
  Ny.metadataVocabulary,
  Ny.contentVocabulary
];
Od.default = p3;
var sh = {}, Ic = {};
Object.defineProperty(Ic, "__esModule", { value: !0 });
Ic.DiscrError = void 0;
var Oy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Oy || (Ic.DiscrError = Oy = {}));
Object.defineProperty(sh, "__esModule", { value: !0 });
const hi = fe, Ru = Ic, Ay = St, m3 = Wi, y3 = Y, g3 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ru.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hi._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, $3 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: g3,
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
    const c = t.let("valid", !1), u = t.const("tag", (0, hi._)`${r}${(0, hi.getProperty)(o)}`);
    t.if((0, hi._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: Ru.DiscrError.Tag, tag: u, tagName: o })), e.ok(c);
    function l() {
      const h = p();
      t.if(!1);
      for (const _ in h)
        t.elseIf((0, hi._)`${u} === ${_}`), t.assign(c, f(h[_]));
      t.else(), e.error(!1, { discrError: Ru.DiscrError.Mapping, tag: u, tagName: o }), t.endIf();
    }
    function f(h) {
      const _ = t.name("valid"), m = e.subschema({ keyword: "oneOf", schemaProp: h }, _);
      return e.mergeEvaluated(m, hi.Name), _;
    }
    function p() {
      var h;
      const _ = {}, m = y(i);
      let v = !0;
      for (let C = 0; C < a.length; C++) {
        let M = a[C];
        if (M != null && M.$ref && !(0, y3.schemaHasRulesButRef)(M, s.self.RULES)) {
          const z = M.$ref;
          if (M = Ay.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), M instanceof Ay.SchemaEnv && (M = M.schema), M === void 0)
            throw new m3.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (h = M == null ? void 0 : M.properties) === null || h === void 0 ? void 0 : h[o];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        v = v && (m || y(M)), w(H, C);
      }
      if (!v)
        throw new Error(`discriminator: "${o}" must be required`);
      return _;
      function y({ required: C }) {
        return Array.isArray(C) && C.includes(o);
      }
      function w(C, M) {
        if (C.const)
          R(C.const, M);
        else if (C.enum)
          for (const H of C.enum)
            R(H, M);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function R(C, M) {
        if (typeof C != "string" || C in _)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        _[C] = M;
      }
    }
  }
};
sh.default = $3;
const v3 = "http://json-schema.org/draft-07/schema#", _3 = "http://json-schema.org/draft-07/schema#", E3 = "Core schema meta-schema", w3 = {
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
}, b3 = [
  "object",
  "boolean"
], S3 = {
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
}, P3 = {
  $schema: v3,
  $id: _3,
  title: E3,
  definitions: w3,
  type: b3,
  properties: S3,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Tv, n = Od, i = sh, s = P3, a = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((_) => this.addVocabulary(_)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const _ = this.opts.$data ? this.$dataMetaSchema(s, a) : s;
      this.addMetaSchema(_, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var u = er;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var l = fe;
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
  var f = ma;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var p = Wi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(_u, _u.exports);
var T3 = _u.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = T3, r = fe, n = r.operators, i = {
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
      const { gen: c, data: u, schemaCode: l, keyword: f, it: p } = o, { opts: h, self: _ } = p;
      if (!h.validateFormats)
        return;
      const m = new t.KeywordCxt(p, _.RULES.all.format.definition, "format");
      m.$data ? v() : y();
      function v() {
        const R = c.scopeValue("formats", {
          ref: _.formats,
          code: h.code.formats
        }), C = c.const("fmt", (0, r._)`${R}[${m.schemaCode}]`);
        o.fail$data((0, r.or)((0, r._)`typeof ${C} != "object"`, (0, r._)`${C} instanceof RegExp`, (0, r._)`typeof ${C}.compare != "function"`, w(C)));
      }
      function y() {
        const R = m.schema, C = _.formats[R];
        if (!C || C === !0)
          return;
        if (typeof C != "object" || C instanceof RegExp || typeof C.compare != "function")
          throw new Error(`"${f}": format "${R}" does not define "compare" function`);
        const M = c.scopeValue("formats", {
          key: R,
          ref: C,
          code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(R)}` : void 0
        });
        o.fail$data(w(M));
      }
      function w(R) {
        return (0, r._)`${R}.compare(${u}, ${l}) ${i[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = a;
})(Pv);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Sv, n = Pv, i = fe, s = new i.Name("fullFormats"), a = new i.Name("fastFormats"), o = (u, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(u, l, r.fullFormats, s), u;
    const [f, p] = l.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, s], h = l.formats || r.formatNames;
    return c(u, h, f, p), l.keywords && (0, n.default)(u), u;
  };
  o.get = (u, l = "full") => {
    const p = (l === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!p)
      throw new Error(`Unknown format "${u}"`);
    return p;
  };
  function c(u, l, f, p) {
    var h, _;
    (h = (_ = u.opts.code).formats) !== null && h !== void 0 || (_.formats = (0, i._)`require("ajv-formats/dist/formats").${p}`);
    for (const m of l)
      u.addFormat(m, f[m]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(vu, vu.exports);
var R3 = vu.exports;
const N3 = /* @__PURE__ */ lg(R3), O3 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !A3(i, s) && n || Object.defineProperty(e, r, s);
}, A3 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, I3 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, C3 = (e, t) => `/* Wrapped ${e}*/
${t}`, D3 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), k3 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), L3 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = C3.bind(null, n, t.toString());
  Object.defineProperty(i, "name", k3);
  const { writable: s, enumerable: a, configurable: o } = D3;
  Object.defineProperty(e, "toString", { value: i, writable: s, enumerable: a, configurable: o });
};
function F3(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    O3(e, t, i, r);
  return I3(e, t), L3(e, t, n), e;
}
const Iy = (e, t = {}) => {
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
  const u = function(...l) {
    const f = this, p = () => {
      a = void 0, o && (clearTimeout(o), o = void 0), s && (c = e.apply(f, l));
    }, h = () => {
      o = void 0, a && (clearTimeout(a), a = void 0), s && (c = e.apply(f, l));
    }, _ = i && !a;
    return clearTimeout(a), a = setTimeout(p, r), n > 0 && n !== Number.POSITIVE_INFINITY && !o && (o = setTimeout(h, n)), _ && (c = e.apply(f, l)), c;
  };
  return F3(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0), o && (clearTimeout(o), o = void 0);
  }, u;
};
var Nu = { exports: {} };
const j3 = "2.0.0", h_ = 256, U3 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, M3 = 16, x3 = h_ - 6, V3 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Cc = {
  MAX_LENGTH: h_,
  MAX_SAFE_COMPONENT_LENGTH: M3,
  MAX_SAFE_BUILD_LENGTH: x3,
  MAX_SAFE_INTEGER: U3,
  RELEASE_TYPES: V3,
  SEMVER_SPEC_VERSION: j3,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const q3 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Dc = q3;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Cc, s = Dc;
  t = e.exports = {};
  const a = t.re = [], o = t.safeRe = [], c = t.src = [], u = t.safeSrc = [], l = t.t = {};
  let f = 0;
  const p = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [p, n]
  ], _ = (v) => {
    for (const [y, w] of h)
      v = v.split(`${y}*`).join(`${y}{0,${w}}`).split(`${y}+`).join(`${y}{1,${w}}`);
    return v;
  }, m = (v, y, w) => {
    const R = _(y), C = f++;
    s(v, C, y), l[v] = C, c[C] = y, u[C] = R, a[C] = new RegExp(y, w ? "g" : void 0), o[C] = new RegExp(R, w ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), m("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${p}+`), m("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), m("FULL", `^${c[l.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), m("LOOSE", `^${c[l.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), m("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), m("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", c[l.COERCE], !0), m("COERCERTLFULL", c[l.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Nu, Nu.exports);
var ga = Nu.exports;
const B3 = Object.freeze({ loose: !0 }), G3 = Object.freeze({}), H3 = (e) => e ? typeof e != "object" ? B3 : e : G3;
var ah = H3;
const Cy = /^[0-9]+$/, p_ = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Cy.test(e), n = Cy.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, z3 = (e, t) => p_(t, e);
var m_ = {
  compareIdentifiers: p_,
  rcompareIdentifiers: z3
};
const to = Dc, { MAX_LENGTH: Dy, MAX_SAFE_INTEGER: ro } = Cc, { safeRe: no, t: io } = ga, K3 = ah, { compareIdentifiers: Ml } = m_;
let W3 = class lr {
  constructor(t, r) {
    if (r = K3(r), t instanceof lr) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Dy)
      throw new TypeError(
        `version is longer than ${Dy} characters`
      );
    to("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? no[io.LOOSE] : no[io.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > ro || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ro || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ro || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < ro)
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
    if (to("SemVer.compare", this.version, this.options, t), !(t instanceof lr)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new lr(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof lr || (t = new lr(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof lr || (t = new lr(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (to("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ml(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof lr || (t = new lr(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (to("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ml(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? no[io.PRERELEASELOOSE] : no[io.PRERELEASE]);
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
          n === !1 && (s = [r]), Ml(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var vt = W3;
const ky = vt, Y3 = (e, t, r = !1) => {
  if (e instanceof ky)
    return e;
  try {
    return new ky(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ji = Y3;
const X3 = Ji, J3 = (e, t) => {
  const r = X3(e, t);
  return r ? r.version : null;
};
var Q3 = J3;
const Z3 = Ji, eV = (e, t) => {
  const r = Z3(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var tV = eV;
const Ly = vt, rV = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Ly(
      e instanceof Ly ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var nV = rV;
const Fy = Ji, iV = (e, t) => {
  const r = Fy(e, null, !0), n = Fy(t, null, !0), i = r.compare(n);
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
var sV = iV;
const aV = vt, oV = (e, t) => new aV(e, t).major;
var cV = oV;
const lV = vt, uV = (e, t) => new lV(e, t).minor;
var fV = uV;
const dV = vt, hV = (e, t) => new dV(e, t).patch;
var pV = hV;
const mV = Ji, yV = (e, t) => {
  const r = mV(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var gV = yV;
const jy = vt, $V = (e, t, r) => new jy(e, r).compare(new jy(t, r));
var sr = $V;
const vV = sr, _V = (e, t, r) => vV(t, e, r);
var EV = _V;
const wV = sr, bV = (e, t) => wV(e, t, !0);
var SV = bV;
const Uy = vt, PV = (e, t, r) => {
  const n = new Uy(e, r), i = new Uy(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var oh = PV;
const TV = oh, RV = (e, t) => e.sort((r, n) => TV(r, n, t));
var NV = RV;
const OV = oh, AV = (e, t) => e.sort((r, n) => OV(n, r, t));
var IV = AV;
const CV = sr, DV = (e, t, r) => CV(e, t, r) > 0;
var kc = DV;
const kV = sr, LV = (e, t, r) => kV(e, t, r) < 0;
var ch = LV;
const FV = sr, jV = (e, t, r) => FV(e, t, r) === 0;
var y_ = jV;
const UV = sr, MV = (e, t, r) => UV(e, t, r) !== 0;
var g_ = MV;
const xV = sr, VV = (e, t, r) => xV(e, t, r) >= 0;
var lh = VV;
const qV = sr, BV = (e, t, r) => qV(e, t, r) <= 0;
var uh = BV;
const GV = y_, HV = g_, zV = kc, KV = lh, WV = ch, YV = uh, XV = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return GV(e, r, n);
    case "!=":
      return HV(e, r, n);
    case ">":
      return zV(e, r, n);
    case ">=":
      return KV(e, r, n);
    case "<":
      return WV(e, r, n);
    case "<=":
      return YV(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var $_ = XV;
const JV = vt, QV = Ji, { safeRe: so, t: ao } = ga, ZV = (e, t) => {
  if (e instanceof JV)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? so[ao.COERCEFULL] : so[ao.COERCE]);
  else {
    const c = t.includePrerelease ? so[ao.COERCERTLFULL] : so[ao.COERCERTL];
    let u;
    for (; (u = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), c.lastIndex = u.index + u[1].length + u[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return QV(`${n}.${i}.${s}${a}${o}`, t);
};
var e9 = ZV;
class t9 {
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
var r9 = t9, xl, My;
function ar() {
  if (My) return xl;
  My = 1;
  const e = /\s+/g;
  class t {
    constructor(D, x) {
      if (x = i(x), D instanceof t)
        return D.loose === !!x.loose && D.includePrerelease === !!x.includePrerelease ? D : new t(D.raw, x);
      if (D instanceof s)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = x, this.loose = !!x.loose, this.includePrerelease = !!x.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((F) => this.parseRange(F.trim())).filter((F) => F.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const F = this.set[0];
        if (this.set = this.set.filter((V) => !m(V[0])), this.set.length === 0)
          this.set = [F];
        else if (this.set.length > 1) {
          for (const V of this.set)
            if (V.length === 1 && v(V[0])) {
              this.set = [V];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const x = this.set[D];
          for (let F = 0; F < x.length; F++)
            F > 0 && (this.formatted += " "), this.formatted += x[F].toString().trim();
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
    parseRange(D) {
      const F = ((this.options.includePrerelease && h) | (this.options.loose && _)) + ":" + D, V = n.get(F);
      if (V)
        return V;
      const U = this.options.loose, O = U ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
      D = D.replace(O, G(this.options.includePrerelease)), a("hyphen replace", D), D = D.replace(c[u.COMPARATORTRIM], l), a("comparator trim", D), D = D.replace(c[u.TILDETRIM], f), a("tilde trim", D), D = D.replace(c[u.CARETTRIM], p), a("caret trim", D);
      let b = D.split(" ").map(($) => w($, this.options)).join(" ").split(/\s+/).map(($) => B($, this.options));
      U && (b = b.filter(($) => (a("loose invalid filter", $, this.options), !!$.match(c[u.COMPARATORLOOSE])))), a("range list", b);
      const P = /* @__PURE__ */ new Map(), S = b.map(($) => new s($, this.options));
      for (const $ of S) {
        if (m($))
          return [$];
        P.set($.value, $);
      }
      P.size > 1 && P.has("") && P.delete("");
      const d = [...P.values()];
      return n.set(F, d), d;
    }
    intersects(D, x) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((F) => y(F, x) && D.set.some((V) => y(V, x) && F.every((U) => V.every((O) => U.intersects(O, x)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new o(D, this.options);
        } catch {
          return !1;
        }
      for (let x = 0; x < this.set.length; x++)
        if (J(this.set[x], D, this.options))
          return !0;
      return !1;
    }
  }
  xl = t;
  const r = r9, n = new r(), i = ah, s = Lc(), a = Dc, o = vt, {
    safeRe: c,
    t: u,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: p
  } = ga, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: _ } = Cc, m = (k) => k.value === "<0.0.0-0", v = (k) => k.value === "", y = (k, D) => {
    let x = !0;
    const F = k.slice();
    let V = F.pop();
    for (; x && F.length; )
      x = F.every((U) => V.intersects(U, D)), V = F.pop();
    return x;
  }, w = (k, D) => (k = k.replace(c[u.BUILD], ""), a("comp", k, D), k = H(k, D), a("caret", k), k = C(k, D), a("tildes", k), k = he(k, D), a("xrange", k), k = Q(k, D), a("stars", k), k), R = (k) => !k || k.toLowerCase() === "x" || k === "*", C = (k, D) => k.trim().split(/\s+/).map((x) => M(x, D)).join(" "), M = (k, D) => {
    const x = D.loose ? c[u.TILDELOOSE] : c[u.TILDE];
    return k.replace(x, (F, V, U, O, b) => {
      a("tilde", k, F, V, U, O, b);
      let P;
      return R(V) ? P = "" : R(U) ? P = `>=${V}.0.0 <${+V + 1}.0.0-0` : R(O) ? P = `>=${V}.${U}.0 <${V}.${+U + 1}.0-0` : b ? (a("replaceTilde pr", b), P = `>=${V}.${U}.${O}-${b} <${V}.${+U + 1}.0-0`) : P = `>=${V}.${U}.${O} <${V}.${+U + 1}.0-0`, a("tilde return", P), P;
    });
  }, H = (k, D) => k.trim().split(/\s+/).map((x) => z(x, D)).join(" "), z = (k, D) => {
    a("caret", k, D);
    const x = D.loose ? c[u.CARETLOOSE] : c[u.CARET], F = D.includePrerelease ? "-0" : "";
    return k.replace(x, (V, U, O, b, P) => {
      a("caret", k, V, U, O, b, P);
      let S;
      return R(U) ? S = "" : R(O) ? S = `>=${U}.0.0${F} <${+U + 1}.0.0-0` : R(b) ? U === "0" ? S = `>=${U}.${O}.0${F} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.0${F} <${+U + 1}.0.0-0` : P ? (a("replaceCaret pr", P), U === "0" ? O === "0" ? S = `>=${U}.${O}.${b}-${P} <${U}.${O}.${+b + 1}-0` : S = `>=${U}.${O}.${b}-${P} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.${b}-${P} <${+U + 1}.0.0-0`) : (a("no pr"), U === "0" ? O === "0" ? S = `>=${U}.${O}.${b}${F} <${U}.${O}.${+b + 1}-0` : S = `>=${U}.${O}.${b}${F} <${U}.${+O + 1}.0-0` : S = `>=${U}.${O}.${b} <${+U + 1}.0.0-0`), a("caret return", S), S;
    });
  }, he = (k, D) => (a("replaceXRanges", k, D), k.split(/\s+/).map((x) => I(x, D)).join(" ")), I = (k, D) => {
    k = k.trim();
    const x = D.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
    return k.replace(x, (F, V, U, O, b, P) => {
      a("xRange", k, F, V, U, O, b, P);
      const S = R(U), d = S || R(O), $ = d || R(b), N = $;
      return V === "=" && N && (V = ""), P = D.includePrerelease ? "-0" : "", S ? V === ">" || V === "<" ? F = "<0.0.0-0" : F = "*" : V && N ? (d && (O = 0), b = 0, V === ">" ? (V = ">=", d ? (U = +U + 1, O = 0, b = 0) : (O = +O + 1, b = 0)) : V === "<=" && (V = "<", d ? U = +U + 1 : O = +O + 1), V === "<" && (P = "-0"), F = `${V + U}.${O}.${b}${P}`) : d ? F = `>=${U}.0.0${P} <${+U + 1}.0.0-0` : $ && (F = `>=${U}.${O}.0${P} <${U}.${+O + 1}.0-0`), a("xRange return", F), F;
    });
  }, Q = (k, D) => (a("replaceStars", k, D), k.trim().replace(c[u.STAR], "")), B = (k, D) => (a("replaceGTE0", k, D), k.trim().replace(c[D.includePrerelease ? u.GTE0PRE : u.GTE0], "")), G = (k) => (D, x, F, V, U, O, b, P, S, d, $, N) => (R(F) ? x = "" : R(V) ? x = `>=${F}.0.0${k ? "-0" : ""}` : R(U) ? x = `>=${F}.${V}.0${k ? "-0" : ""}` : O ? x = `>=${x}` : x = `>=${x}${k ? "-0" : ""}`, R(S) ? P = "" : R(d) ? P = `<${+S + 1}.0.0-0` : R($) ? P = `<${S}.${+d + 1}.0-0` : N ? P = `<=${S}.${d}.${$}-${N}` : k ? P = `<${S}.${d}.${+$ + 1}-0` : P = `<=${P}`, `${x} ${P}`.trim()), J = (k, D, x) => {
    for (let F = 0; F < k.length; F++)
      if (!k[F].test(D))
        return !1;
    if (D.prerelease.length && !x.includePrerelease) {
      for (let F = 0; F < k.length; F++)
        if (a(k[F].semver), k[F].semver !== s.ANY && k[F].semver.prerelease.length > 0) {
          const V = k[F].semver;
          if (V.major === D.major && V.minor === D.minor && V.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return xl;
}
var Vl, xy;
function Lc() {
  if (xy) return Vl;
  xy = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, f) {
      if (f = r(f), l instanceof t) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], p = l.match(f);
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
    intersects(l, f) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Vl = t;
  const r = ah, { safeRe: n, t: i } = ga, s = $_, a = Dc, o = vt, c = ar();
  return Vl;
}
const n9 = ar(), i9 = (e, t, r) => {
  try {
    t = new n9(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Fc = i9;
const s9 = ar(), a9 = (e, t) => new s9(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var o9 = a9;
const c9 = vt, l9 = ar(), u9 = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new l9(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new c9(n, r));
  }), n;
};
var f9 = u9;
const d9 = vt, h9 = ar(), p9 = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new h9(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    s.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new d9(n, r));
  }), n;
};
var m9 = p9;
const ql = vt, y9 = ar(), Vy = kc, g9 = (e, t) => {
  e = new y9(e, t);
  let r = new ql("0.0.0");
  if (e.test(r) || (r = new ql("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((a) => {
      const o = new ql(a.semver.version);
      switch (a.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!s || Vy(o, s)) && (s = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), s && (!r || Vy(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var $9 = g9;
const v9 = ar(), _9 = (e, t) => {
  try {
    return new v9(e, t).range || "*";
  } catch {
    return null;
  }
};
var E9 = _9;
const w9 = vt, v_ = Lc(), { ANY: b9 } = v_, S9 = ar(), P9 = Fc, qy = kc, By = ch, T9 = uh, R9 = lh, N9 = (e, t, r, n) => {
  e = new w9(e, n), t = new S9(t, n);
  let i, s, a, o, c;
  switch (r) {
    case ">":
      i = qy, s = T9, a = By, o = ">", c = ">=";
      break;
    case "<":
      i = By, s = R9, a = qy, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (P9(e, t, n))
    return !1;
  for (let u = 0; u < t.set.length; ++u) {
    const l = t.set[u];
    let f = null, p = null;
    if (l.forEach((h) => {
      h.semver === b9 && (h = new v_(">=0.0.0")), f = f || h, p = p || h, i(h.semver, f.semver, n) ? f = h : a(h.semver, p.semver, n) && (p = h);
    }), f.operator === o || f.operator === c || (!p.operator || p.operator === o) && s(e, p.semver))
      return !1;
    if (p.operator === c && a(e, p.semver))
      return !1;
  }
  return !0;
};
var fh = N9;
const O9 = fh, A9 = (e, t, r) => O9(e, t, ">", r);
var I9 = A9;
const C9 = fh, D9 = (e, t, r) => C9(e, t, "<", r);
var k9 = D9;
const Gy = ar(), L9 = (e, t, r) => (e = new Gy(e, r), t = new Gy(t, r), e.intersects(t, r));
var F9 = L9;
const j9 = Fc, U9 = sr;
var M9 = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const a = e.sort((l, f) => U9(l, f, r));
  for (const l of a)
    j9(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const o = [];
  for (const [l, f] of n)
    l === f ? o.push(l) : !f && l === a[0] ? o.push("*") : f ? l === a[0] ? o.push(`<=${f}`) : o.push(`${l} - ${f}`) : o.push(`>=${l}`);
  const c = o.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < u.length ? c : t;
};
const Hy = ar(), dh = Lc(), { ANY: Bl } = dh, fs = Fc, hh = sr, x9 = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Hy(e, r), t = new Hy(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const a = q9(i, s, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, V9 = [new dh(">=0.0.0-0")], zy = [new dh(">=0.0.0")], q9 = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Bl) {
    if (t.length === 1 && t[0].semver === Bl)
      return !0;
    r.includePrerelease ? e = V9 : e = zy;
  }
  if (t.length === 1 && t[0].semver === Bl) {
    if (r.includePrerelease)
      return !0;
    t = zy;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Ky(i, h, r) : h.operator === "<" || h.operator === "<=" ? s = Wy(s, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && s) {
    if (a = hh(i.semver, s.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !fs(h, String(i), r) || s && !fs(h, String(s), r))
      return null;
    for (const _ of t)
      if (!fs(h, String(_), r))
        return !1;
    return !0;
  }
  let o, c, u, l, f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, p = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", u = u || h.operator === "<" || h.operator === "<=", i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (o = Ky(i, h, r), o === h && o !== i)
          return !1;
      } else if (i.operator === ">=" && !fs(i.semver, String(h), r))
        return !1;
    }
    if (s) {
      if (f && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === f.major && h.semver.minor === f.minor && h.semver.patch === f.patch && (f = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Wy(s, h, r), c === h && c !== s)
          return !1;
      } else if (s.operator === "<=" && !fs(s.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (s || i) && a !== 0)
      return !1;
  }
  return !(i && u && !s && a !== 0 || s && l && !i && a !== 0 || p || f);
}, Ky = (e, t, r) => {
  if (!e)
    return t;
  const n = hh(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Wy = (e, t, r) => {
  if (!e)
    return t;
  const n = hh(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var B9 = x9;
const Gl = ga, Yy = Cc, G9 = vt, Xy = m_, H9 = Ji, z9 = Q3, K9 = tV, W9 = nV, Y9 = sV, X9 = cV, J9 = fV, Q9 = pV, Z9 = gV, eq = sr, tq = EV, rq = SV, nq = oh, iq = NV, sq = IV, aq = kc, oq = ch, cq = y_, lq = g_, uq = lh, fq = uh, dq = $_, hq = e9, pq = Lc(), mq = ar(), yq = Fc, gq = o9, $q = f9, vq = m9, _q = $9, Eq = E9, wq = fh, bq = I9, Sq = k9, Pq = F9, Tq = M9, Rq = B9;
var Nq = {
  parse: H9,
  valid: z9,
  clean: K9,
  inc: W9,
  diff: Y9,
  major: X9,
  minor: J9,
  patch: Q9,
  prerelease: Z9,
  compare: eq,
  rcompare: tq,
  compareLoose: rq,
  compareBuild: nq,
  sort: iq,
  rsort: sq,
  gt: aq,
  lt: oq,
  eq: cq,
  neq: lq,
  gte: uq,
  lte: fq,
  cmp: dq,
  coerce: hq,
  Comparator: pq,
  Range: mq,
  satisfies: yq,
  toComparators: gq,
  maxSatisfying: $q,
  minSatisfying: vq,
  minVersion: _q,
  validRange: Eq,
  outside: wq,
  gtr: bq,
  ltr: Sq,
  intersects: Pq,
  simplifyRange: Tq,
  subset: Rq,
  SemVer: G9,
  re: Gl.re,
  src: Gl.src,
  tokens: Gl.t,
  SEMVER_SPEC_VERSION: Yy.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Yy.RELEASE_TYPES,
  compareIdentifiers: Xy.compareIdentifiers,
  rcompareIdentifiers: Xy.rcompareIdentifiers
};
const ui = /* @__PURE__ */ lg(Nq), Oq = Object.prototype.toString, Aq = "[object Uint8Array]", Iq = "[object ArrayBuffer]";
function __(e, t, r) {
  return e ? e.constructor === t ? !0 : Oq.call(e) === r : !1;
}
function E_(e) {
  return __(e, Uint8Array, Aq);
}
function Cq(e) {
  return __(e, ArrayBuffer, Iq);
}
function Dq(e) {
  return E_(e) || Cq(e);
}
function kq(e) {
  if (!E_(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function Lq(e) {
  if (!Dq(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Hl(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, s) => i + s.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    kq(i), r.set(i, n), n += i.length;
  return r;
}
const oo = {
  utf8: new globalThis.TextDecoder("utf8")
};
function co(e, t = "utf8") {
  return Lq(e), oo[t] ?? (oo[t] = new globalThis.TextDecoder(t)), oo[t].decode(e);
}
function Fq(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const jq = new globalThis.TextEncoder();
function lo(e) {
  return Fq(e), jq.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const zl = "aes-256-cbc", Xr = () => /* @__PURE__ */ Object.create(null), Jy = (e) => e !== void 0, Kl = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Qr = "__internal__", Wl = `${Qr}.migrations.version`;
var rn, Yt, Et, Ut, xn, Vn, Oi, ur, Be, w_, b_, S_, P_, T_, R_, N_, O_;
class Uq {
  constructor(t = {}) {
    or(this, Be);
    ei(this, "path");
    ei(this, "events");
    or(this, rn);
    or(this, Yt);
    or(this, Et);
    or(this, Ut, {});
    or(this, xn, !1);
    or(this, Vn);
    or(this, Oi);
    or(this, ur);
    ei(this, "_deserialize", (t) => JSON.parse(t));
    ei(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = Tr(this, Be, w_).call(this, t);
    At(this, Et, r), Tr(this, Be, b_).call(this, r), Tr(this, Be, P_).call(this, r), Tr(this, Be, T_).call(this, r), this.events = new EventTarget(), At(this, Yt, r.encryptionKey), this.path = Tr(this, Be, R_).call(this, r), Tr(this, Be, N_).call(this, r), r.watch && this._watch();
  }
  get(t, r) {
    if (ae(this, Et).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${Qr} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (s, a) => {
      if (Kl(s, a), ae(this, Et).accessPropertiesByDotNotation)
        qa(n, s, a);
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
    return ae(this, Et).accessPropertiesByDotNotation ? Tl(this.store, t) : t in this.store;
  }
  appendToArray(t, r) {
    Kl(t, r);
    const n = ae(this, Et).accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
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
      Jy(ae(this, Ut)[r]) && this.set(r, ae(this, Ut)[r]);
  }
  delete(t) {
    const { store: r } = this;
    ae(this, Et).accessPropertiesByDotNotation ? uI(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = Xr();
    for (const r of Object.keys(ae(this, Ut)))
      Jy(ae(this, Ut)[r]) && (Kl(r, ae(this, Ut)[r]), ae(this, Et).accessPropertiesByDotNotation ? qa(t, r, ae(this, Ut)[r]) : t[r] = ae(this, Ut)[r]);
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
      const r = re.readFileSync(this.path, ae(this, Yt) ? null : "utf8"), n = this._decryptData(r), i = this._deserialize(n);
      return ae(this, xn) || this._validate(i), Object.assign(Xr(), i);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), Xr();
      if (ae(this, Et).clearInvalidConfig) {
        const n = r;
        if (n.name === "SyntaxError" || (t = n.message) != null && t.startsWith("Config schema violation:"))
          return Xr();
      }
      throw r;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !Tl(t, Qr))
      try {
        const r = re.readFileSync(this.path, ae(this, Yt) ? null : "utf8"), n = this._decryptData(r), i = this._deserialize(n);
        Tl(i, Qr) && qa(t, Qr, Am(i, Qr));
      } catch {
      }
    ae(this, xn) || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, r]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    ae(this, Vn) && (ae(this, Vn).close(), At(this, Vn, void 0)), ae(this, Oi) && (re.unwatchFile(this.path), At(this, Oi, !1)), At(this, ur, void 0);
  }
  _decryptData(t) {
    if (!ae(this, Yt))
      return typeof t == "string" ? t : co(t);
    try {
      const r = t.slice(0, 16), n = Pn.pbkdf2Sync(ae(this, Yt), r, 1e4, 32, "sha512"), i = Pn.createDecipheriv(zl, n, r), s = t.slice(17), a = typeof s == "string" ? lo(s) : s;
      return co(Hl([i.update(a), i.final()]));
    } catch {
      try {
        const r = t.slice(0, 16), n = Pn.pbkdf2Sync(ae(this, Yt), r.toString(), 1e4, 32, "sha512"), i = Pn.createDecipheriv(zl, n, r), s = t.slice(17), a = typeof s == "string" ? lo(s) : s;
        return co(Hl([i.update(a), i.final()]));
      } catch {
      }
    }
    return typeof t == "string" ? t : co(t);
  }
  _handleStoreChange(t) {
    let r = this.store;
    const n = () => {
      const i = r, s = this.store;
      Dh(s, i) || (r = s, t.call(this, s, i));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _handleValueChange(t, r) {
    let n = t();
    const i = () => {
      const s = n, a = t();
      Dh(a, s) || (n = a, r.call(this, a, s));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!ae(this, rn) || ae(this, rn).call(this, t) || !ae(this, rn).errors)
      return;
    const n = ae(this, rn).errors.map(({ instancePath: i, message: s = "" }) => `\`${i.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    re.mkdirSync(se.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (ae(this, Yt)) {
      const n = Pn.randomBytes(16), i = Pn.pbkdf2Sync(ae(this, Yt), n, 1e4, 32, "sha512"), s = Pn.createCipheriv(zl, i, n);
      r = Hl([n, lo(":"), s.update(lo(r)), s.final()]);
    }
    if (Re.env.SNAP)
      re.writeFileSync(this.path, r, { mode: ae(this, Et).configFileMode });
    else
      try {
        S$(this.path, r, { mode: ae(this, Et).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          re.writeFileSync(this.path, r, { mode: ae(this, Et).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    if (this._ensureDirectory(), re.existsSync(this.path) || this._write(Xr()), Re.platform === "win32" || Re.platform === "darwin") {
      ae(this, ur) ?? At(this, ur, Iy(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 }));
      const t = se.dirname(this.path), r = se.basename(this.path);
      At(this, Vn, re.watch(t, { persistent: !1, encoding: "utf8" }, (n, i) => {
        i && i !== r || typeof ae(this, ur) == "function" && ae(this, ur).call(this);
      }));
    } else
      ae(this, ur) ?? At(this, ur, Iy(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 })), re.watchFile(this.path, { persistent: !1 }, (t, r) => {
        typeof ae(this, ur) == "function" && ae(this, ur).call(this);
      }), At(this, Oi, !0);
  }
  _migrate(t, r, n) {
    let i = this._get(Wl, "0.0.0");
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
        c == null || c(this), this._set(Wl, o), i = o, a = structuredClone(this.store);
      } catch (c) {
        this.store = a;
        try {
          this._write(a);
        } catch {
        }
        const u = c instanceof Error ? c.message : String(c);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${u}`);
      }
    (this._isVersionInRangeFormat(i) || !ui.eq(i, r)) && this._set(Wl, r);
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
    return t === Qr || t.startsWith(`${Qr}.`);
  }
  _isVersionInRangeFormat(t) {
    return ui.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && ui.satisfies(r, t) ? !1 : ui.satisfies(n, t) : !(ui.lte(t, r) || ui.gt(t, n));
  }
  _get(t, r) {
    return Am(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    qa(n, t, r), this.store = n;
  }
}
rn = new WeakMap(), Yt = new WeakMap(), Et = new WeakMap(), Ut = new WeakMap(), xn = new WeakMap(), Vn = new WeakMap(), Oi = new WeakMap(), ur = new WeakMap(), Be = new WeakSet(), w_ = function(t) {
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
    r.cwd = pI(r.projectName, { suffix: r.projectSuffix }).config;
  }
  return typeof r.fileExtension == "string" && (r.fileExtension = r.fileExtension.replace(/^\.+/, "")), r;
}, b_ = function(t) {
  if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
    return;
  if (t.schema && typeof t.schema != "object")
    throw new TypeError("The `schema` option must be an object.");
  const r = N3.default, n = new mU.Ajv2020({
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
  At(this, rn, n.compile(i)), Tr(this, Be, S_).call(this, t.schema);
}, S_ = function(t) {
  const r = Object.entries(t ?? {});
  for (const [n, i] of r) {
    if (!i || typeof i != "object" || !Object.hasOwn(i, "default"))
      continue;
    const { default: s } = i;
    s !== void 0 && (ae(this, Ut)[n] = s);
  }
}, P_ = function(t) {
  t.defaults && Object.assign(ae(this, Ut), t.defaults);
}, T_ = function(t) {
  t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
}, R_ = function(t) {
  const r = typeof t.fileExtension == "string" ? t.fileExtension : void 0, n = r ? `.${r}` : "";
  return se.resolve(t.cwd, `${t.configName ?? "config"}${n}`);
}, N_ = function(t) {
  if (t.migrations) {
    Tr(this, Be, O_).call(this, t), this._validate(this.store);
    return;
  }
  const r = this.store, n = Object.assign(Xr(), t.defaults ?? {}, r);
  this._validate(n);
  try {
    kh.deepEqual(r, n);
  } catch {
    this.store = n;
  }
}, O_ = function(t) {
  const { migrations: r, projectVersion: n } = t;
  if (r) {
    if (!n)
      throw new Error("Please specify the `projectVersion` option.");
    At(this, xn, !0);
    try {
      const i = this.store, s = Object.assign(Xr(), t.defaults ?? {}, i);
      try {
        kh.deepEqual(i, s);
      } catch {
        this._write(s);
      }
      this._migrate(r, n, t.beforeEachMigration);
    } finally {
      At(this, xn, !1);
    }
  }
};
const { app: So, ipcMain: Ou, shell: Mq } = Dr;
let Qy = !1;
const Zy = () => {
  if (!Ou || !So)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: So.getPath("userData"),
    appVersion: So.getVersion()
  };
  return Qy || (Ou.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Qy = !0), e;
};
let xq = class extends Uq {
  constructor(t) {
    let r, n;
    if (Re.type === "renderer") {
      const i = Dr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else Ou && So && ({ defaultCwd: r, appVersion: n } = Zy());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = se.isAbsolute(t.cwd) ? t.cwd : se.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Zy();
  }
  async openInEditor() {
    const t = await Mq.openPath(this.path);
    if (t)
      throw new Error(t);
  }
};
class Vq {
  constructor(t) {
    ei(this, "store");
    this.store = new xq(t);
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
const qq = {
  checkRobots: {
    type: "boolean",
    default: !0
  },
  downloadPath: {
    type: "string",
    default: ""
  }
}, jc = new Vq({
  name: "app-config",
  schema: qq
}), A_ = se.dirname(ME(import.meta.url));
process.env.APP_ROOT = se.join(A_, "..");
const Au = process.env.VITE_DEV_SERVER_URL, bB = se.join(process.env.APP_ROOT, "dist-electron"), I_ = se.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Au ? se.join(process.env.APP_ROOT, "public") : I_;
let Oe;
const eg = "https://example.com";
let Ni = "";
function Ys() {
  let e = jc.get("downloadPath");
  return e == null || e.trim() == "" ? Zs.platform() === "win32" ? "C:\\Users\\Public\\Downloads" : "~/Downloads" : (ph(e), e);
}
function tg(e) {
  let t = "";
  Ni != "" && (t = new URL(Ni).hostname);
  let r = "";
  e != "" && (r = new URL(e).hostname);
  const n = se.join(Ys(), "webdownloader", t, r);
  return ph(n), n;
}
function ph(e) {
  re.mkdirSync(e, { recursive: !0 });
}
function Bq(e) {
  var t;
  return e.mimeType || ((t = e.headers) == null ? void 0 : t["content-type"]) || "application/octet-stream";
}
let Wo, Xs;
function C_() {
  Oe = new ng({
    icon: se.join(process.env.VITE_PUBLIC, "icon.png"),
    title: "QCSiteDownloader",
    width: 1420,
    height: 680,
    webPreferences: {
      preload: se.join(A_, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), Xs = Oe;
  const e = new LE();
  Oe.contentView.addChildView(e), e.webContents.loadURL(eg), e.setBounds({ x: 0, y: 0, width: 1e3, height: 800 }), e.webContents.setWindowOpenHandler(({ url: i }) => (e.webContents.loadURL(i), { action: "deny" })), e.webContents.on("will-navigate", (i, s) => {
    i.preventDefault(), e.webContents.loadURL(s);
  }), Oe.contentView.addChildView(e), Wo = e, ph(Ys());
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
      n.delete(a.requestId), Oe == null || Oe.webContents.send("item-add", {
        url: l,
        filepath: "",
        isSuccess: !1
      });
      return;
    }
    if (Ni == "" || Ni == eg || Ni == "localhost" || s !== "Network.responseReceived") return;
    const { requestId: o, response: c } = a, u = c.url;
    if (u.startsWith("http")) {
      if (c.status >= 400) {
        Oe == null || Oe.webContents.send("item-add", {
          url: u,
          filepath: "",
          isSuccess: !1
        });
        return;
      }
      try {
        const l = await r.sendCommand(
          "Network.getResponseBody",
          { requestId: o }
        ), f = l.base64Encoded ? Buffer.from(l.body, "base64") : Buffer.from(l.body), p = Bq(c), h = tg(u), _ = new URL(u);
        let m = se.join(h, _.pathname);
        if (m.endsWith("/") && (m += "index"), !se.extname(m)) {
          const v = p.includes("html") ? ".html" : p.includes("javascript") ? ".js" : p.includes("css") ? ".css" : p.includes("json") ? ".json" : p.includes("text") ? ".text" : p.includes("webp") ? ".webp" : "";
          m += v;
        }
        re.mkdirSync(se.dirname(m), { recursive: !0 }), re.writeFileSync(m, f), Oe == null || Oe.webContents.send("item-add", {
          url: u,
          filepath: m,
          isSuccess: !0
        });
      } catch {
      }
    }
  }), e.webContents.on("did-finish-load", async () => {
    if (Oe == null || Oe == null) {
      console.error("Window is not defined, cannot save HTML.");
      return;
    }
    try {
      const i = await e.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      );
      if (Oe == null || Oe == null) {
        console.error("Window is not defined, cannot save HTML.");
        return;
      }
      const s = tg(Oe.webContents.getURL()), a = se.join(s, "index.html");
      re.writeFileSync(a, i, "utf-8"), Oe.webContents.send("item-add", {
        url: e.webContents.getURL(),
        filepath: a,
        isSuccess: !0
      }), setTimeout(() => {
        console.log("Capture complete, exiting.");
      }, 15e3);
    } catch (i) {
      console.error("HTML capture failed:", i);
    }
  }), Oe.on("resize", () => {
    Cu();
  }), e.webContents.on("did-finish-load", () => {
    Cu();
  }), Au ? Oe.loadURL(Au) : Oe.loadFile(se.join(I_, "index.html"));
}
jr.handle("update-subview-url", (e, t) => {
  Wo && t && (Ni = t, console.log("Updating subView URL to:", t), Wo.webContents.loadURL(t));
});
jr.handle("select-download-path", async () => {
  const e = await rg.showOpenDialog({
    title: "选择下载文件夹",
    defaultPath: Ys(),
    properties: ["openDirectory", "createDirectory"]
  });
  return jc.set("downloadPath", e.canceled ? Ys() : e.filePaths[0]), e;
});
jr.handle("get-download-dir", () => Ys());
jr.handle("copy-text", (e, t) => {
  DE.writeText(t);
});
jr.handle("set-robots-checked", (e, t) => {
  jc.set("checkRobots", t);
});
jr.handle("get-robots-checked", () => jc.get("checkRobots"));
let Iu = 480;
function Cu() {
  const { width: e, height: t } = Xs.getContentBounds();
  Wo.setBounds({
    x: 0,
    y: 0,
    width: e - Iu - 6,
    height: t
  });
}
jr.on("shell-width-changed", (e, t) => {
  Iu = t, console.log("Shell width changed:", Iu), Cu();
});
jr.handle("resize-window", (e, t) => {
  const r = Xs.getBounds().height;
  Xs.setSize(Math.ceil(t), r);
});
jr.handle("open-existing-folder", async (e, t) => {
  try {
    return await kE.openPath(t) === "";
  } catch (r) {
    return console.error(r), !1;
  }
});
Is.on("window-all-closed", () => {
  process.platform !== "darwin" && (Is.quit(), Oe = null);
});
Is.on("activate", () => {
  ng.getAllWindows().length === 0 && C_();
});
Is.whenReady().then(() => {
  C_(), Is.isPackaged && (gr.autoUpdater.setFeedURL({
    provider: "github",
    owner: "dayuqichengbao",
    repo: "slwebpagedownloader"
  }), gr.autoUpdater.checkForUpdatesAndNotify());
});
gr.autoUpdater.on("checking-for-update", () => {
  Qi("checking");
});
gr.autoUpdater.on("update-available", () => {
  Qi("available");
});
gr.autoUpdater.on("update-not-available", () => {
  Qi("not-available");
});
gr.autoUpdater.on("download-progress", (e) => {
  Qi("progress", Math.round(e.percent));
});
gr.autoUpdater.on("update-downloaded", () => {
  Qi("downloaded"), rg.showMessageBox({
    type: "info",
    title: "更新完成",
    message: "新版本已下载，是否立即重启安装？",
    buttons: ["重启", "稍后"]
  }).then((e) => {
    e.response === 0 && gr.autoUpdater.quitAndInstall();
  });
});
gr.autoUpdater.on("error", (e) => {
  Qi("error", e.message);
});
function Qi(e, t) {
  Xs.webContents.send("update-status", { type: e, data: t });
}
export {
  bB as MAIN_DIST,
  I_ as RENDERER_DIST,
  Au as VITE_DEV_SERVER_URL
};
