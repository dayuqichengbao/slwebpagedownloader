var Yu = Object.defineProperty;
var yi = (e) => {
  throw TypeError(e);
};
var Qu = (e, t, r) => t in e ? Yu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ir = (e, t, r) => Qu(e, typeof t != "symbol" ? t + "" : t, r), bs = (e, t, r) => t.has(e) || yi("Cannot " + r);
var re = (e, t, r) => (bs(e, t, "read from private field"), r ? r.call(e) : t.get(e)), ut = (e, t, r) => t.has(e) ? yi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), He = (e, t, r, n) => (bs(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), yt = (e, t, r) => (bs(e, t, "access private method"), r);
import Jc, { ipcMain as Pt, dialog as Zu, clipboard as xu, shell as ed, app as xr, BrowserWindow as Xc, WebContentsView as td, Tray as rd, Menu as nd } from "electron";
import { fileURLToPath as sd } from "node:url";
import Z from "node:path";
import x from "node:fs";
import ad from "os";
import pe from "node:process";
import { promisify as ke, isDeepStrictEqual as $i } from "node:util";
import Ht from "node:crypto";
import gi from "node:assert";
import Yc from "node:os";
import "node:events";
import "node:stream";
const nr = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Qc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Zc = 1e6, od = (e) => e >= "0" && e <= "9";
function xc(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= Zc;
  }
  return !1;
}
function Ss(e, t) {
  return Qc.has(e) ? !1 : (e && xc(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function id(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  const t = [];
  let r = "", n = "start", s = !1, a = 0;
  for (const o of e) {
    if (a++, s) {
      r += o, s = !1;
      continue;
    }
    if (o === "\\") {
      if (n === "index")
        throw new Error(`Invalid character '${o}' in an index at position ${a}`);
      if (n === "indexEnd")
        throw new Error(`Invalid character '${o}' after an index at position ${a}`);
      s = !0, n = n === "start" ? "property" : n;
      continue;
    }
    switch (o) {
      case ".": {
        if (n === "index")
          throw new Error(`Invalid character '${o}' in an index at position ${a}`);
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (!Ss(r, t))
          return [];
        r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error(`Invalid character '${o}' in an index at position ${a}`);
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (n === "property" || n === "start") {
          if ((r || n === "property") && !Ss(r, t))
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
            const c = Number.parseInt(r, 10);
            !Number.isNaN(c) && Number.isFinite(c) && c >= 0 && c <= Number.MAX_SAFE_INTEGER && c <= Zc && r === String(c) ? t.push(c) : t.push(r), r = "", n = "indexEnd";
          }
          break;
        }
        if (n === "indexEnd")
          throw new Error(`Invalid character '${o}' after an index at position ${a}`);
        r += o;
        break;
      }
      default: {
        if (n === "index" && !od(o))
          throw new Error(`Invalid character '${o}' in an index at position ${a}`);
        if (n === "indexEnd")
          throw new Error(`Invalid character '${o}' after an index at position ${a}`);
        n === "start" && (n = "property"), r += o;
      }
    }
  }
  switch (s && (r += "\\"), n) {
    case "property": {
      if (!Ss(r, t))
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
function ts(e) {
  if (typeof e == "string")
    return id(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [r, n] of e.entries()) {
      if (typeof n != "string" && typeof n != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${r}, got ${typeof n}`);
      if (typeof n == "number" && !Number.isFinite(n))
        throw new TypeError(`Path segment at index ${r} must be a finite number, got ${n}`);
      if (Qc.has(n))
        return [];
      typeof n == "string" && xc(n) ? t.push(Number.parseInt(n, 10)) : t.push(n);
    }
    return t;
  }
  return [];
}
function _i(e, t, r) {
  if (!nr(e) || typeof t != "string" && !Array.isArray(t))
    return r === void 0 ? e : r;
  const n = ts(t);
  if (n.length === 0)
    return r;
  for (let s = 0; s < n.length; s++) {
    const a = n[s];
    if (e = e[a], e == null) {
      if (s !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function ln(e, t, r) {
  if (!nr(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const n = e, s = ts(t);
  if (s.length === 0)
    return e;
  for (let a = 0; a < s.length; a++) {
    const o = s[a];
    if (a === s.length - 1)
      e[o] = r;
    else if (!nr(e[o])) {
      const l = typeof s[a + 1] == "number";
      e[o] = l ? [] : {};
    }
    e = e[o];
  }
  return n;
}
function cd(e, t) {
  if (!nr(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = ts(t);
  if (r.length === 0)
    return !1;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (n === r.length - 1)
      return Object.hasOwn(e, s) ? (delete e[s], !0) : !1;
    if (e = e[s], !nr(e))
      return !1;
  }
}
function Ps(e, t) {
  if (!nr(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = ts(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!nr(e) || !(n in e))
      return !1;
    e = e[n];
  }
  return !0;
}
const Mt = Yc.homedir(), ya = Yc.tmpdir(), { env: mr } = pe, ld = (e) => {
  const t = Z.join(Mt, "Library");
  return {
    data: Z.join(t, "Application Support", e),
    config: Z.join(t, "Preferences", e),
    cache: Z.join(t, "Caches", e),
    log: Z.join(t, "Logs", e),
    temp: Z.join(ya, e)
  };
}, ud = (e) => {
  const t = mr.APPDATA || Z.join(Mt, "AppData", "Roaming"), r = mr.LOCALAPPDATA || Z.join(Mt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: Z.join(r, e, "Data"),
    config: Z.join(t, e, "Config"),
    cache: Z.join(r, e, "Cache"),
    log: Z.join(r, e, "Log"),
    temp: Z.join(ya, e)
  };
}, dd = (e) => {
  const t = Z.basename(Mt);
  return {
    data: Z.join(mr.XDG_DATA_HOME || Z.join(Mt, ".local", "share"), e),
    config: Z.join(mr.XDG_CONFIG_HOME || Z.join(Mt, ".config"), e),
    cache: Z.join(mr.XDG_CACHE_HOME || Z.join(Mt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: Z.join(mr.XDG_STATE_HOME || Z.join(Mt, ".local", "state"), e),
    temp: Z.join(ya, t, e)
  };
};
function fd(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), pe.platform === "darwin" ? ld(e) : pe.platform === "win32" ? ud(e) : dd(e);
}
const Nt = (e, t) => {
  const { onError: r } = t;
  return function(...s) {
    return e.apply(void 0, s).catch(r);
  };
}, $t = (e, t) => {
  const { onError: r } = t;
  return function(...s) {
    try {
      return e.apply(void 0, s);
    } catch (a) {
      return r(a);
    }
  };
}, hd = 250, Rt = (e, t) => {
  const { isRetriable: r } = t;
  return function(s) {
    const { timeout: a } = s, o = s.interval ?? hd, c = Date.now() + a;
    return function l(...d) {
      return e.apply(void 0, d).catch((u) => {
        if (!r(u) || Date.now() >= c)
          throw u;
        const h = Math.round(o * Math.random());
        return h > 0 ? new Promise((y) => setTimeout(y, h)).then(() => l.apply(void 0, d)) : l.apply(void 0, d);
      });
    };
  };
}, Ot = (e, t) => {
  const { isRetriable: r } = t;
  return function(s) {
    const { timeout: a } = s, o = Date.now() + a;
    return function(...l) {
      for (; ; )
        try {
          return e.apply(void 0, l);
        } catch (d) {
          if (!r(d) || Date.now() >= o)
            throw d;
          continue;
        }
    };
  };
}, pr = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!pr.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !md && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!pr.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!pr.isNodeError(e))
      throw e;
    if (!pr.isChangeErrorOk(e))
      throw e;
  }
}, un = {
  onError: pr.onChangeError
}, Be = {
  onError: () => {
  }
}, md = pe.getuid ? !pe.getuid() : !1, Ae = {
  isRetriable: pr.isRetriableError
}, De = {
  attempt: {
    /* ASYNC */
    chmod: Nt(ke(x.chmod), un),
    chown: Nt(ke(x.chown), un),
    close: Nt(ke(x.close), Be),
    fsync: Nt(ke(x.fsync), Be),
    mkdir: Nt(ke(x.mkdir), Be),
    realpath: Nt(ke(x.realpath), Be),
    stat: Nt(ke(x.stat), Be),
    unlink: Nt(ke(x.unlink), Be),
    /* SYNC */
    chmodSync: $t(x.chmodSync, un),
    chownSync: $t(x.chownSync, un),
    closeSync: $t(x.closeSync, Be),
    existsSync: $t(x.existsSync, Be),
    fsyncSync: $t(x.fsync, Be),
    mkdirSync: $t(x.mkdirSync, Be),
    realpathSync: $t(x.realpathSync, Be),
    statSync: $t(x.statSync, Be),
    unlinkSync: $t(x.unlinkSync, Be)
  },
  retry: {
    /* ASYNC */
    close: Rt(ke(x.close), Ae),
    fsync: Rt(ke(x.fsync), Ae),
    open: Rt(ke(x.open), Ae),
    readFile: Rt(ke(x.readFile), Ae),
    rename: Rt(ke(x.rename), Ae),
    stat: Rt(ke(x.stat), Ae),
    write: Rt(ke(x.write), Ae),
    writeFile: Rt(ke(x.writeFile), Ae),
    /* SYNC */
    closeSync: Ot(x.closeSync, Ae),
    fsyncSync: Ot(x.fsyncSync, Ae),
    openSync: Ot(x.openSync, Ae),
    readFileSync: Ot(x.readFileSync, Ae),
    renameSync: Ot(x.renameSync, Ae),
    statSync: Ot(x.statSync, Ae),
    writeSync: Ot(x.writeSync, Ae),
    writeFileSync: Ot(x.writeFileSync, Ae)
  }
}, pd = "utf8", vi = 438, yd = 511, $d = {}, gd = pe.geteuid ? pe.geteuid() : -1, _d = pe.getegid ? pe.getegid() : -1, vd = 1e3, wd = !!pe.getuid;
pe.getuid && pe.getuid();
const wi = 128, Ed = (e) => e instanceof Error && "code" in e, Ei = (e) => typeof e == "string", Ns = (e) => e === void 0, bd = pe.platform === "linux", el = pe.platform === "win32", $a = ["SIGHUP", "SIGINT", "SIGTERM"];
el || $a.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
bd && $a.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class Sd {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (el && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? pe.kill(pe.pid, "SIGTERM") : pe.kill(pe.pid, t));
      }
    }, this.hook = () => {
      pe.once("exit", () => this.exit());
      for (const t of $a)
        try {
          pe.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Pd = new Sd(), Nd = Pd.register, Me = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), s = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Me.truncate(t(e));
    return n in Me.store ? Me.get(e, t, r) : (Me.store[n] = r, [n, () => delete Me.store[n]]);
  },
  purge: (e) => {
    Me.store[e] && (delete Me.store[e], De.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Me.store[e] && (delete Me.store[e], De.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Me.store)
      Me.purgeSync(e);
  },
  truncate: (e) => {
    const t = Z.basename(e);
    if (t.length <= wi)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - wi;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
Nd(Me.purgeSyncAll);
function tl(e, t, r = $d) {
  if (Ei(r))
    return tl(e, t, { encoding: r });
  const s = { timeout: r.timeout ?? vd };
  let a = null, o = null, c = null;
  try {
    const l = De.attempt.realpathSync(e), d = !!l;
    e = l || e, [o, a] = Me.get(e, r.tmpCreate || Me.create, r.tmpPurge !== !1);
    const u = wd && Ns(r.chown), h = Ns(r.mode);
    if (d && (u || h)) {
      const w = De.attempt.statSync(e);
      w && (r = { ...r }, u && (r.chown = { uid: w.uid, gid: w.gid }), h && (r.mode = w.mode));
    }
    if (!d) {
      const w = Z.dirname(e);
      De.attempt.mkdirSync(w, {
        mode: yd,
        recursive: !0
      });
    }
    c = De.retry.openSync(s)(o, "w", r.mode || vi), r.tmpCreated && r.tmpCreated(o), Ei(t) ? De.retry.writeSync(s)(c, t, 0, r.encoding || pd) : Ns(t) || De.retry.writeSync(s)(c, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? De.retry.fsyncSync(s)(c) : De.attempt.fsync(c)), De.retry.closeSync(s)(c), c = null, r.chown && (r.chown.uid !== gd || r.chown.gid !== _d) && De.attempt.chownSync(o, r.chown.uid, r.chown.gid), r.mode && r.mode !== vi && De.attempt.chmodSync(o, r.mode);
    try {
      De.retry.renameSync(s)(o, e);
    } catch (w) {
      if (!Ed(w) || w.code !== "ENAMETOOLONG")
        throw w;
      De.retry.renameSync(s)(o, Me.truncate(e));
    }
    a(), o = null;
  } finally {
    c && De.attempt.closeSync(c), o && Me.purge(o);
  }
}
function rl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Js = { exports: {} }, nl = {}, ot = {}, Er = {}, nn = {}, ne = {}, en = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((P, O) => `${P}${O}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((P, O) => (O instanceof r && (P[O.str] = (P[O.str] || 0) + 1), P), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...E) {
    const P = [m[0]];
    let O = 0;
    for (; O < E.length; )
      c(P, E[O]), P.push(m[++O]);
    return new n(P);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...E) {
    const P = [y(m[0])];
    let O = 0;
    for (; O < E.length; )
      P.push(a), c(P, E[O]), P.push(a, y(m[++O]));
    return l(P), new n(P);
  }
  e.str = o;
  function c(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = c;
  function l(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const P = d(m[E - 1], m[E + 1]);
        if (P !== void 0) {
          m.splice(E - 1, 3, P);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function d(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function u(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : y(Array.isArray(m) ? m.join(",") : m);
  }
  function w(m) {
    return new n(y(m));
  }
  e.stringify = w;
  function y(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function g(m) {
    return new n(m.toString());
  }
  e.regexpCode = g;
})(en);
var Xs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = en;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class c extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const w = this.toName(d), { prefix: y } = w, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let $ = this._values[y];
      if ($) {
        const E = $.get(v);
        if (E)
          return E;
      } else
        $ = this._values[y] = /* @__PURE__ */ new Map();
      $.set(v, w);
      const g = this._scope[y] || (this._scope[y] = []), m = g.length;
      return g[m] = u.ref, w.setValue(u, { property: y, itemIndex: m }), w;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, w) {
      let y = t.nil;
      for (const v in d) {
        const $ = d[v];
        if (!$)
          continue;
        const g = h[v] = h[v] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (g.has(m))
            return;
          g.set(m, n.Started);
          let E = u(m);
          if (E) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${P} ${m} = ${E};${this.opts._n}`;
          } else if (E = w == null ? void 0 : w(m))
            y = (0, t._)`${y}${E}${this.opts._n}`;
          else
            throw new r(m);
          g.set(m, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = c;
})(Xs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = en, r = Xs;
  var n = en;
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
  var s = Xs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
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
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, b) {
      super(), this.varKind = i, this.name = f, this.rhs = b;
    }
    render({ es5: i, _n: f }) {
      const b = i ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${k};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(i, f, b) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(i, this.rhs);
    }
  }
  class l extends c {
    constructor(i, f, b, k) {
      super(i, b, k), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = j(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, b) => f + b.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const b = i[f].optimizeNodes();
        Array.isArray(b) ? i.splice(f, 1, ...b) : b ? i[f] = b : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: b } = this;
      let k = b.length;
      for (; k--; ) {
        const A = b[k];
        A.optimizeNames(i, f) || (D(i, A.names), b.splice(k, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => X(i, f.names), {});
    }
  }
  class v extends y {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class $ extends y {
  }
  class g extends v {
  }
  g.kind = "else";
  class m extends v {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new g(b) : b;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(U(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = j(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return Q(i, this.condition), this.else && X(i, this.else.names), i;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class P extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = j(this.iteration, i, f), this;
    }
    get names() {
      return X(super.names, this.iteration.names);
    }
  }
  class O extends E {
    constructor(i, f, b, k) {
      super(), this.varKind = i, this.name = f, this.from = b, this.to = k;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: b, from: k, to: A } = this;
      return `for(${f} ${b}=${k}; ${b}<${A}; ${b}++)` + super.render(i);
    }
    get names() {
      const i = Q(super.names, this.from);
      return Q(i, this.to);
    }
  }
  class T extends E {
    constructor(i, f, b, k) {
      super(), this.loop = i, this.varKind = f, this.name = b, this.iterable = k;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = j(this.iterable, i, f), this;
    }
    get names() {
      return X(super.names, this.iterable.names);
    }
  }
  class G extends v {
    constructor(i, f, b) {
      super(), this.name = i, this.args = f, this.async = b;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  G.kind = "func";
  class Y extends y {
    render(i) {
      return "return " + super.render(i);
    }
  }
  Y.kind = "return";
  class le extends v {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var b, k;
      return super.optimizeNames(i, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(i, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && X(i, this.catch.names), this.finally && X(i, this.finally.names), i;
    }
  }
  class fe extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  fe.kind = "catch";
  class ye extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  ye.kind = "finally";
  class K {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const b = this._extScope.value(i, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, b, k) {
      const A = this._scope.toName(f);
      return b !== void 0 && k && (this._constants[A.str] = b), this._leafNode(new o(i, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, b) {
      return this._def(r.varKinds.const, i, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, b) {
      return this._def(r.varKinds.let, i, f, b);
    }
    // `var` declaration with optional assignment
    var(i, f, b) {
      return this._def(r.varKinds.var, i, f, b);
    }
    // assignment code
    assign(i, f, b) {
      return this._leafNode(new c(i, f, b));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new l(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new w(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [b, k] of i)
        f.length > 1 && f.push(","), f.push(b), (b !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, b) {
      if (this._blockNode(new m(i)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new m(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, g);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new P(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, b, k, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const H = this._scope.toName(i);
      return this._for(new O(A, H, f, b), () => k(H));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, b, k = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const H = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${H}.length`, (q) => {
          this.var(A, (0, t._)`${H}[${q}]`), b(A);
        });
      }
      return this._for(new T("of", k, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, b, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(i);
      return this._for(new T("in", k, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new Y();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(i, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new le();
      if (this._blockNode(k), this.code(i), f) {
        const A = this.name("e");
        this._currNode = k.catch = new fe(A), f(A);
      }
      return b && (this._currNode = k.finally = new ye(), this.code(b)), this._endBlockNode(fe, ye);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || i !== void 0 && b !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, b, k) {
      return this._blockNode(new G(i, f, b)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(G);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const b = this._currNode;
      if (b instanceof i || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = K;
  function X(_, i) {
    for (const f in i)
      _[f] = (_[f] || 0) + (i[f] || 0);
    return _;
  }
  function Q(_, i) {
    return i instanceof t._CodeOrName ? X(_, i.names) : _;
  }
  function j(_, i, f) {
    if (_ instanceof t.Name)
      return b(_);
    if (!k(_))
      return _;
    return new t._Code(_._items.reduce((A, H) => (H instanceof t.Name && (H = b(H)), H instanceof t._Code ? A.push(...H._items) : A.push(H), A), []));
    function b(A) {
      const H = f[A.str];
      return H === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], H);
    }
    function k(A) {
      return A instanceof t._Code && A._items.some((H) => H instanceof t.Name && i[H.str] === 1 && f[H.str] !== void 0);
    }
  }
  function D(_, i) {
    for (const f in i)
      _[f] = (_[f] || 0) - (i[f] || 0);
  }
  function U(_) {
    return typeof _ == "boolean" || typeof _ == "number" || _ === null ? !_ : (0, t._)`!${S(_)}`;
  }
  e.not = U;
  const V = p(e.operators.AND);
  function W(..._) {
    return _.reduce(V);
  }
  e.and = W;
  const z = p(e.operators.OR);
  function N(..._) {
    return _.reduce(z);
  }
  e.or = N;
  function p(_) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${_} ${S(f)}`;
  }
  function S(_) {
    return _ instanceof t.Name ? _ : (0, t._)`(${_})`;
  }
})(ne);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ue = ne, Rd = en;
function Od(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = Od;
function Id(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (sl(e, t), !al(t, e.self.RULES.all));
}
L.alwaysValidSchema = Id;
function sl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || cl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = sl;
function al(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = al;
function Td(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = Td;
function jd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ue._)`${r}`;
  }
  return (0, ue._)`${e}${t}${(0, ue.getProperty)(n)}`;
}
L.schemaRefOrVal = jd;
function kd(e) {
  return ol(decodeURIComponent(e));
}
L.unescapeFragment = kd;
function Ad(e) {
  return encodeURIComponent(ga(e));
}
L.escapeFragment = Ad;
function ga(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = ga;
function ol(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = ol;
function Cd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = Cd;
function bi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, c) => {
    const l = o === void 0 ? a : o instanceof ue.Name ? (a instanceof ue.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof ue.Name ? (t(s, o, a), a) : r(a, o);
    return c === ue.Name && !(l instanceof ue.Name) ? n(s, l) : l;
  };
}
L.mergeEvaluated = {
  props: bi({
    mergeNames: (e, t, r) => e.if((0, ue._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ue._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ue._)`${r} || {}`).code((0, ue._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ue._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ue._)`${r} || {}`), _a(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: il
  }),
  items: bi({
    mergeNames: (e, t, r) => e.if((0, ue._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ue._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ue._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ue._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function il(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ue._)`{}`);
  return t !== void 0 && _a(e, r, t), r;
}
L.evaluatedPropsToName = il;
function _a(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ue._)`${t}${(0, ue.getProperty)(n)}`, !0));
}
L.setEvaluated = _a;
const Si = {};
function Dd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Si[t.code] || (Si[t.code] = new Rd._Code(t.code))
  });
}
L.useFunc = Dd;
var Ys;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ys || (L.Type = Ys = {}));
function Md(e, t, r) {
  if (e instanceof ue.Name) {
    const n = t === Ys.Num;
    return r ? n ? (0, ue._)`"[" + ${e} + "]"` : (0, ue._)`"['" + ${e} + "']"` : n ? (0, ue._)`"/" + ${e}` : (0, ue._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ue.getProperty)(e).toString() : "/" + ga(e);
}
L.getErrorPath = Md;
function cl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = cl;
var We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
const Ce = ne, Ld = {
  // validation function arguments
  data: new Ce.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ce.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ce.Name("instancePath"),
  parentData: new Ce.Name("parentData"),
  parentDataProperty: new Ce.Name("parentDataProperty"),
  rootData: new Ce.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ce.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ce.Name("vErrors"),
  // null or array of validation errors
  errors: new Ce.Name("errors"),
  // counter of validation errors
  this: new Ce.Name("this"),
  // "globals"
  self: new Ce.Name("self"),
  scope: new Ce.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ce.Name("json"),
  jsonPos: new Ce.Name("jsonPos"),
  jsonLen: new Ce.Name("jsonLen"),
  jsonPart: new Ce.Name("jsonPart")
};
We.default = Ld;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ne, r = L, n = We;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: m }) => m ? (0, t.str)`"${g}" keyword must be ${m} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function s(g, m = e.keywordError, E, P) {
    const { it: O } = g, { gen: T, compositeRule: G, allErrors: Y } = O, le = h(g, m, E);
    P ?? (G || Y) ? l(T, le) : d(O, (0, t._)`[${le}]`);
  }
  e.reportError = s;
  function a(g, m = e.keywordError, E) {
    const { it: P } = g, { gen: O, compositeRule: T, allErrors: G } = P, Y = h(g, m, E);
    l(O, Y), T || G || d(P, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(g, m) {
    g.assign(n.default.errors, m), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(m, () => g.assign((0, t._)`${n.default.vErrors}.length`, m), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function c({ gen: g, keyword: m, schemaValue: E, data: P, errsCount: O, it: T }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const G = g.name("err");
    g.forRange("i", O, n.default.errors, (Y) => {
      g.const(G, (0, t._)`${n.default.vErrors}[${Y}]`), g.if((0, t._)`${G}.instancePath === undefined`, () => g.assign((0, t._)`${G}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), g.assign((0, t._)`${G}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (g.assign((0, t._)`${G}.schema`, E), g.assign((0, t._)`${G}.data`, P));
    });
  }
  e.extendErrors = c;
  function l(g, m) {
    const E = g.const("err", m);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function d(g, m) {
    const { gen: E, validateName: P, schemaEnv: O } = g;
    O.$async ? E.throw((0, t._)`new ${g.ValidationError}(${m})`) : (E.assign((0, t._)`${P}.errors`, m), E.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h(g, m, E) {
    const { createErrors: P } = g.it;
    return P === !1 ? (0, t._)`{}` : w(g, m, E);
  }
  function w(g, m, E = {}) {
    const { gen: P, it: O } = g, T = [
      y(O, E),
      v(g, E)
    ];
    return $(g, m, T), P.object(...T);
  }
  function y({ errorPath: g }, { instancePath: m }) {
    const E = m ? (0, t.str)`${g}${(0, r.getErrorPath)(m, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: g, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: P }) {
    let O = P ? m : (0, t.str)`${m}/${g}`;
    return E && (O = (0, t.str)`${O}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, O];
  }
  function $(g, { params: m, message: E }, P) {
    const { keyword: O, data: T, schemaValue: G, it: Y } = g, { opts: le, propertyName: fe, topSchemaRef: ye, schemaPath: K } = Y;
    P.push([u.keyword, O], [u.params, typeof m == "function" ? m(g) : m || (0, t._)`{}`]), le.messages && P.push([u.message, typeof E == "function" ? E(g) : E]), le.verbose && P.push([u.schema, G], [u.parentSchema, (0, t._)`${ye}${K}`], [n.default.data, T]), fe && P.push([u.propertyName, fe]);
  }
})(nn);
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.boolOrEmptySchema = Er.topBoolOrEmptySchema = void 0;
const Vd = nn, Fd = ne, zd = We, Ud = {
  message: "boolean schema is false"
};
function qd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ll(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(zd.default.data) : (t.assign((0, Fd._)`${n}.errors`, null), t.return(!0));
}
Er.topBoolOrEmptySchema = qd;
function Kd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ll(e)) : r.var(t, !0);
}
Er.boolOrEmptySchema = Kd;
function ll(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Vd.reportError)(s, Ud, void 0, t);
}
var Ee = {}, sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.getRules = sr.isJSONType = void 0;
const Gd = ["string", "number", "integer", "boolean", "null", "object", "array"], Hd = new Set(Gd);
function Bd(e) {
  return typeof e == "string" && Hd.has(e);
}
sr.isJSONType = Bd;
function Wd() {
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
sr.getRules = Wd;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.shouldUseRule = wt.shouldUseGroup = wt.schemaHasRulesForType = void 0;
function Jd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && ul(e, n);
}
wt.schemaHasRulesForType = Jd;
function ul(e, t) {
  return t.rules.some((r) => dl(e, r));
}
wt.shouldUseGroup = ul;
function dl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
wt.shouldUseRule = dl;
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.reportTypeError = Ee.checkDataTypes = Ee.checkDataType = Ee.coerceAndCheckDataType = Ee.getJSONTypes = Ee.getSchemaTypes = Ee.DataType = void 0;
const Xd = sr, Yd = wt, Qd = nn, se = ne, fl = L;
var yr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(yr || (Ee.DataType = yr = {}));
function Zd(e) {
  const t = hl(e.type);
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
Ee.getSchemaTypes = Zd;
function hl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Xd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ee.getJSONTypes = hl;
function xd(e, t) {
  const { gen: r, data: n, opts: s } = e, a = ef(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Yd.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = va(t, n, s.strictNumbers, yr.Wrong);
    r.if(c, () => {
      a.length ? tf(e, t, a) : wa(e);
    });
  }
  return o;
}
Ee.coerceAndCheckDataType = xd;
const ml = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ef(e, t) {
  return t ? e.filter((r) => ml.has(r) || t === "array" && r === "array") : [];
}
function tf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, se._)`typeof ${s}`), c = n.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && n.if((0, se._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(o, (0, se._)`typeof ${s}`).if(va(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, se._)`${c} !== undefined`);
  for (const d of r)
    (ml.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), wa(e), n.endIf(), n.if((0, se._)`${c} !== undefined`, () => {
    n.assign(s, c), rf(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, se._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(c, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, se._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(c, (0, se._)`[${s}]`);
    }
  }
}
function rf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${r}]`, n));
}
function Qs(e, t, r, n = yr.Correct) {
  const s = n === yr.Correct ? se.operators.EQ : se.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, se._)`${t} ${s} null`;
    case "array":
      a = (0, se._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, se._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = o((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, se._)`typeof ${t} ${s} ${e}`;
  }
  return n === yr.Correct ? a : (0, se.not)(a);
  function o(c = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, c, r ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
Ee.checkDataType = Qs;
function va(e, t, r, n) {
  if (e.length === 1)
    return Qs(e[0], t, r, n);
  let s;
  const a = (0, fl.toHash)(e);
  if (a.array && a.object) {
    const o = (0, se._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, se._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = se.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, se.and)(s, Qs(o, t, r, n));
  return s;
}
Ee.checkDataTypes = va;
const nf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function wa(e) {
  const t = sf(e);
  (0, Qd.reportError)(t, nf);
}
Ee.reportTypeError = wa;
function sf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, fl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.assignDefaults = void 0;
const cr = ne, af = L;
function of(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Pi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Pi(e, a, s.default));
}
rs.assignDefaults = of;
function Pi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const c = (0, cr._)`${a}${(0, cr.getProperty)(t)}`;
  if (s) {
    (0, af.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, cr._)`${c} === undefined`;
  o.useDefaults === "empty" && (l = (0, cr._)`${l} || ${c} === null || ${c} === ""`), n.if(l, (0, cr._)`${c} = ${(0, cr.stringify)(r)}`);
}
var mt = {}, ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
const he = ne, Ea = L, It = We, cf = L;
function lf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Sa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ie.checkReportMissingProp = lf;
function uf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(Sa(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ie.checkMissingProp = uf;
function df(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ie.reportMissingProp = df;
function pl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ie.hasPropFunc = pl;
function ba(e, t, r) {
  return (0, he._)`${pl(e)}.call(${t}, ${r})`;
}
ie.isOwnProperty = ba;
function ff(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${ba(e, t, r)}` : s;
}
ie.propertyInData = ff;
function Sa(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(ba(e, t, r))) : s;
}
ie.noPropertyInData = Sa;
function yl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ie.allSchemaProperties = yl;
function hf(e, t) {
  return yl(t).filter((r) => !(0, Ea.alwaysValidSchema)(e, t[r]));
}
ie.schemaProperties = hf;
function mf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, c, l, d) {
  const u = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [It.default.instancePath, (0, he.strConcat)(It.default.instancePath, a)],
    [It.default.parentData, o.parentData],
    [It.default.parentDataProperty, o.parentDataProperty],
    [It.default.rootData, It.default.rootData]
  ];
  o.opts.dynamicRef && h.push([It.default.dynamicAnchors, It.default.dynamicAnchors]);
  const w = (0, he._)`${u}, ${r.object(...h)}`;
  return l !== he.nil ? (0, he._)`${c}.call(${l}, ${w})` : (0, he._)`${c}(${w})`;
}
ie.callValidateCode = mf;
const pf = (0, he._)`new RegExp`;
function yf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? pf : (0, cf.useFunc)(e, s)}(${r}, ${n})`
  });
}
ie.usePattern = yf;
function $f(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(c) {
    const l = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Ea.Type.Num
      }, a), t.if((0, he.not)(a), c);
    });
  }
}
ie.validateArray = $f;
function gf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, Ea.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, c);
    t.assign(o, (0, he._)`${o} || ${c}`), e.mergeValidEvaluated(u, c) || t.if((0, he.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ie.validateUnion = gf;
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.validateKeywordUsage = mt.validSchemaType = mt.funcKeywordCode = mt.macroKeywordCode = void 0;
const Ve = ne, Xt = We, _f = ie, vf = nn;
function wf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, c = t.macro.call(o.self, s, a, o), l = $l(r, n, c);
  o.opts.validateSchema !== !1 && o.self.validateSchema(c, !0);
  const d = r.name("valid");
  e.subschema({
    schema: c,
    schemaPath: Ve.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
mt.macroKeywordCode = wf;
function Ef(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: c, it: l } = e;
  Sf(l, t);
  const d = !c && t.compile ? t.compile.call(l.self, a, o, l) : t.validate, u = $l(n, s, d), h = n.let("valid");
  e.block$data(h, w), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function w() {
    if (t.errors === !1)
      $(), t.modifying && Ni(e), g(() => e.error());
    else {
      const m = t.async ? y() : v();
      t.modifying && Ni(e), g(() => bf(e, m));
    }
  }
  function y() {
    const m = n.let("ruleErrs", null);
    return n.try(() => $((0, Ve._)`await `), (E) => n.assign(h, !1).if((0, Ve._)`${E} instanceof ${l.ValidationError}`, () => n.assign(m, (0, Ve._)`${E}.errors`), () => n.throw(E))), m;
  }
  function v() {
    const m = (0, Ve._)`${u}.errors`;
    return n.assign(m, null), $(Ve.nil), m;
  }
  function $(m = t.async ? (0, Ve._)`await ` : Ve.nil) {
    const E = l.opts.passContext ? Xt.default.this : Xt.default.self, P = !("compile" in t && !c || t.schema === !1);
    n.assign(h, (0, Ve._)`${m}${(0, _f.callValidateCode)(e, u, E, P)}`, t.modifying);
  }
  function g(m) {
    var E;
    n.if((0, Ve.not)((E = t.valid) !== null && E !== void 0 ? E : h), m);
  }
}
mt.funcKeywordCode = Ef;
function Ni(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ve._)`${n.parentData}[${n.parentDataProperty}]`));
}
function bf(e, t) {
  const { gen: r } = e;
  r.if((0, Ve._)`Array.isArray(${t})`, () => {
    r.assign(Xt.default.vErrors, (0, Ve._)`${Xt.default.vErrors} === null ? ${t} : ${Xt.default.vErrors}.concat(${t})`).assign(Xt.default.errors, (0, Ve._)`${Xt.default.vErrors}.length`), (0, vf.extendErrors)(e);
  }, () => e.error());
}
function Sf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function $l(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ve.stringify)(r) });
}
function Pf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
mt.validSchemaType = Pf;
function Nf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const l = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
mt.validateKeywordUsage = Nf;
var zt = {};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.extendSubschemaMode = zt.extendSubschemaData = zt.getSubschema = void 0;
const ht = ne, gl = L;
function Rf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return r === void 0 ? {
      schema: c,
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[r],
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}${(0, ht.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, gl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
zt.getSubschema = Rf;
function Of(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, w = c.let("data", (0, ht._)`${t.data}${(0, ht.getProperty)(r)}`, !0);
    l(w), e.errorPath = (0, ht.str)`${d}${(0, gl.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ht._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ht.Name ? s : c.let("data", s, !0);
    l(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function l(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
zt.extendSubschemaData = Of;
function If(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
zt.extendSubschemaMode = If;
var Ie = {}, ns = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var o = a[s];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, _l = { exports: {} }, Vt = _l.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  An(t, n, s, e, "", e);
};
Vt.keywords = {
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
Vt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Vt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Vt.skipKeywords = {
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
function An(e, t, r, n, s, a, o, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Vt.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            An(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in Vt.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            An(e, t, r, h[y], s + "/" + u + "/" + Tf(y), a, s, u, n, y);
      } else (u in Vt.keywords || e.allKeys && !(u in Vt.skipKeywords)) && An(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, c, l, d);
  }
}
function Tf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var jf = _l.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const kf = L, Af = ns, Cf = jf, Df = /* @__PURE__ */ new Set([
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
function Mf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Zs(e) : t ? vl(e) <= t : !1;
}
Ie.inlineRef = Mf;
const Lf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Zs(e) {
  for (const t in e) {
    if (Lf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Zs) || typeof r == "object" && Zs(r))
      return !0;
  }
  return !1;
}
function vl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Df.has(r) && (typeof e[r] == "object" && (0, kf.eachItem)(e[r], (n) => t += vl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function wl(e, t = "", r) {
  r !== !1 && (t = $r(t));
  const n = e.parse(t);
  return El(e, n);
}
Ie.getFullPath = wl;
function El(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = El;
const Vf = /#\/?$/;
function $r(e) {
  return e ? e.replace(Vf, "") : "";
}
Ie.normalizeId = $r;
function Ff(e, t, r) {
  return r = $r(r), e.resolve(t, r);
}
Ie.resolveUrl = Ff;
const zf = /^[a-z_][-a-z0-9._]*$/i;
function Uf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = $r(e[r] || t), a = { "": s }, o = wl(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return Cf(e, { allKeys: !0 }, (h, w, y, v) => {
    if (v === void 0)
      return;
    const $ = o + w;
    let g = a[v];
    typeof h[r] == "string" && (g = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[w] = g;
    function m(P) {
      const O = this.opts.uriResolver.resolve;
      if (P = $r(g ? O(g, P) : P), l.has(P))
        throw u(P);
      l.add(P);
      let T = this.refs[P];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(h, T.schema, P) : P !== $r($) && (P[0] === "#" ? (d(h, c[P], P), c[P] = h) : this.refs[P] = $), P;
    }
    function E(P) {
      if (typeof P == "string") {
        if (!zf.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), c;
  function d(h, w, y) {
    if (w !== void 0 && !Af(h, w))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = Uf;
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.getData = ot.KeywordCxt = ot.validateFunctionCode = void 0;
const bl = Er, Ri = Ee, Pa = wt, Kn = Ee, qf = rs, Gr = mt, Rs = zt, J = ne, ee = We, Kf = Ie, Et = L, Mr = nn;
function Gf(e) {
  if (Nl(e) && (Rl(e), Pl(e))) {
    Wf(e);
    return;
  }
  Sl(e, () => (0, bl.topBoolOrEmptySchema)(e));
}
ot.validateFunctionCode = Gf;
function Sl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, J._)`${ee.default.data}, ${ee.default.valCxt}`, n.$async, () => {
    e.code((0, J._)`"use strict"; ${Oi(r, s)}`), Bf(e, s), e.code(a);
  }) : e.func(t, (0, J._)`${ee.default.data}, ${Hf(s)}`, n.$async, () => e.code(Oi(r, s)).code(a));
}
function Hf(e) {
  return (0, J._)`{${ee.default.instancePath}="", ${ee.default.parentData}, ${ee.default.parentDataProperty}, ${ee.default.rootData}=${ee.default.data}${e.dynamicRef ? (0, J._)`, ${ee.default.dynamicAnchors}={}` : J.nil}}={}`;
}
function Bf(e, t) {
  e.if(ee.default.valCxt, () => {
    e.var(ee.default.instancePath, (0, J._)`${ee.default.valCxt}.${ee.default.instancePath}`), e.var(ee.default.parentData, (0, J._)`${ee.default.valCxt}.${ee.default.parentData}`), e.var(ee.default.parentDataProperty, (0, J._)`${ee.default.valCxt}.${ee.default.parentDataProperty}`), e.var(ee.default.rootData, (0, J._)`${ee.default.valCxt}.${ee.default.rootData}`), t.dynamicRef && e.var(ee.default.dynamicAnchors, (0, J._)`${ee.default.valCxt}.${ee.default.dynamicAnchors}`);
  }, () => {
    e.var(ee.default.instancePath, (0, J._)`""`), e.var(ee.default.parentData, (0, J._)`undefined`), e.var(ee.default.parentDataProperty, (0, J._)`undefined`), e.var(ee.default.rootData, ee.default.data), t.dynamicRef && e.var(ee.default.dynamicAnchors, (0, J._)`{}`);
  });
}
function Wf(e) {
  const { schema: t, opts: r, gen: n } = e;
  Sl(e, () => {
    r.$comment && t.$comment && Il(e), Zf(e), n.let(ee.default.vErrors, null), n.let(ee.default.errors, 0), r.unevaluated && Jf(e), Ol(e), th(e);
  });
}
function Jf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, J._)`${r}.evaluated`), t.if((0, J._)`${e.evaluated}.dynamicProps`, () => t.assign((0, J._)`${e.evaluated}.props`, (0, J._)`undefined`)), t.if((0, J._)`${e.evaluated}.dynamicItems`, () => t.assign((0, J._)`${e.evaluated}.items`, (0, J._)`undefined`));
}
function Oi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, J._)`/*# sourceURL=${r} */` : J.nil;
}
function Xf(e, t) {
  if (Nl(e) && (Rl(e), Pl(e))) {
    Yf(e, t);
    return;
  }
  (0, bl.boolOrEmptySchema)(e, t);
}
function Pl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Nl(e) {
  return typeof e.schema != "boolean";
}
function Yf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Il(e), xf(e), eh(e);
  const a = n.const("_errs", ee.default.errors);
  Ol(e, a), n.var(t, (0, J._)`${a} === ${ee.default.errors}`);
}
function Rl(e) {
  (0, Et.checkUnknownRules)(e), Qf(e);
}
function Ol(e, t) {
  if (e.opts.jtd)
    return Ii(e, [], !1, t);
  const r = (0, Ri.getSchemaTypes)(e.schema), n = (0, Ri.coerceAndCheckDataType)(e, r);
  Ii(e, r, !n, t);
}
function Qf(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Zf(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function xf(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Kf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function eh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Il({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, J._)`${ee.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, J.str)`${n}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, J._)`${ee.default.self}.opts.$comment(${a}, ${o}, ${c}.schema)`);
  }
}
function th(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, J._)`${ee.default.errors} === 0`, () => t.return(ee.default.data), () => t.throw((0, J._)`new ${s}(${ee.default.vErrors})`)) : (t.assign((0, J._)`${n}.errors`, ee.default.vErrors), a.unevaluated && rh(e), t.return((0, J._)`${ee.default.errors} === 0`));
}
function rh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof J.Name && e.assign((0, J._)`${t}.props`, r), n instanceof J.Name && e.assign((0, J._)`${t}.items`, n);
}
function Ii(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: c, opts: l, self: d } = e, { RULES: u } = d;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(a, u))) {
    s.block(() => kl(e, "$ref", u.all.$ref.definition));
    return;
  }
  l.jtd || nh(e, t), s.block(() => {
    for (const w of u.rules)
      h(w);
    h(u.post);
  });
  function h(w) {
    (0, Pa.shouldUseGroup)(a, w) && (w.type ? (s.if((0, Kn.checkDataType)(w.type, o, l.strictNumbers)), Ti(e, w), t.length === 1 && t[0] === w.type && r && (s.else(), (0, Kn.reportTypeError)(e)), s.endIf()) : Ti(e, w), c || s.if((0, J._)`${ee.default.errors} === ${n || 0}`));
  }
}
function Ti(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, qf.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Pa.shouldUseRule)(n, a) && kl(e, a.keyword, a.definition, t.type);
  });
}
function nh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (sh(e, t), e.opts.allowUnionTypes || ah(e, t), oh(e, e.dataTypes));
}
function sh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Tl(e.dataTypes, r) || Na(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), ch(e, t);
  }
}
function ah(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Na(e, "use allowUnionTypes to allow union type keyword");
}
function oh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Pa.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => ih(t, o)) && Na(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function ih(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Tl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function ch(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Tl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Na(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
class jl {
  constructor(t, r, n) {
    if ((0, Gr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Al(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Gr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ee.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, J.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, J.not)(t), void 0, r);
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
    this.fail((0, J._)`${r} !== undefined && (${(0, J.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Mr.reportExtraError : Mr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Mr.reportError)(this, this.def.$dataError || Mr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Mr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = J.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = J.nil, r = J.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, J.or)((0, J._)`${s} === undefined`, r)), t !== J.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== J.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, J.or)(o(), c());
    function o() {
      if (n.length) {
        if (!(r instanceof J.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, J._)`${(0, Kn.checkDataTypes)(l, r, a.opts.strictNumbers, Kn.DataType.Wrong)}`;
      }
      return J.nil;
    }
    function c() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, J._)`!${l}(${r})`;
      }
      return J.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Rs.getSubschema)(this.it, t);
    (0, Rs.extendSubschemaData)(n, this.it, t), (0, Rs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Xf(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Et.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Et.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, J.Name)), !0;
  }
}
ot.KeywordCxt = jl;
function kl(e, t, r, n) {
  const s = new jl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Gr.funcKeywordCode)(s, r) : "macro" in r ? (0, Gr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Gr.funcKeywordCode)(s, r);
}
const lh = /^\/(?:[^~]|~0|~1)*$/, uh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Al(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return ee.default.rootData;
  if (e[0] === "/") {
    if (!lh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = ee.default.rootData;
  } else {
    const d = uh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(l("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(l("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const c = s.split("/");
  for (const d of c)
    d && (a = (0, J._)`${a}${(0, J.getProperty)((0, Et.unescapeJsonPointer)(d))}`, o = (0, J._)`${o} && ${a}`);
  return o;
  function l(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
ot.getData = Al;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
class dh extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
sn.default = dh;
var Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
const Os = Ie;
let fh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Os.resolveUrl)(t, r, n), this.missingSchema = (0, Os.normalizeId)((0, Os.getFullPath)(t, this.missingRef));
  }
};
Pr.default = fh;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Ze = ne, hh = sn, Bt = We, st = Ie, ji = L, mh = ot;
let ss = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, st.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = ss;
function Ra(e) {
  const t = Cl.call(this, e);
  if (t)
    return t;
  const r = (0, st.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new Ze.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: hh.default,
    code: (0, Ze._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Bt.default.data,
    parentData: Bt.default.parentData,
    parentDataProperty: Bt.default.parentDataProperty,
    dataNames: [Bt.default.data],
    dataPathArr: [Ze.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ze.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ze.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ze._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, mh.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Bt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${Bt.default.self}`, `${Bt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: l, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: v, items: $ } = d;
      y.evaluated = {
        props: v instanceof Ze.Name ? void 0 : v,
        items: $ instanceof Ze.Name ? void 0 : $,
        dynamicProps: v instanceof Ze.Name,
        dynamicItems: $ instanceof Ze.Name
      }, y.source && (y.source.evaluated = (0, Ze.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = Ra;
function ph(e, t, r) {
  var n;
  r = (0, st.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = gh.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    o && (a = new ss({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = yh.call(this, a);
}
Fe.resolveRef = ph;
function yh(e) {
  return (0, st.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ra.call(this, e);
}
function Cl(e) {
  for (const t of this._compilations)
    if ($h(t, e))
      return t;
}
Fe.getCompilingSchema = Cl;
function $h(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function gh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || as.call(this, e, t);
}
function as(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, st._getFullPath)(this.opts.uriResolver, r);
  let s = (0, st.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Is.call(this, r, e);
  const a = (0, st.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const c = as.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : Is.call(this, r, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Ra.call(this, o), a === (0, st.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, st.resolveUrl)(this.opts.uriResolver, s, d)), new ss({ schema: c, schemaId: l, root: e, baseId: s });
    }
    return Is.call(this, r, o);
  }
}
Fe.resolveSchema = as;
const _h = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Is(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, ji.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !_h.has(c) && d && (t = (0, st.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ji.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, st.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = as.call(this, n, c);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new ss({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const vh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", wh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Eh = "object", bh = [
  "$data"
], Sh = {
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
}, Ph = !1, Nh = {
  $id: vh,
  description: wh,
  type: Eh,
  required: bh,
  properties: Sh,
  additionalProperties: Ph
};
var Oa = {}, os = { exports: {} };
const Rh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Dl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Ml(e) {
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
const Oh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function ki(e) {
  return e.length = 0, !0;
}
function Ih(e, t, r) {
  if (e.length) {
    const n = Ml(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function Th(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, c = Ih;
  for (let l = 0; l < e.length; l++) {
    const d = e[l];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (o = !0), !c(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        l > 0 && e[l - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!c(s, n, r))
          break;
        c = ki;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (c === ki ? r.zone = s.join("") : o ? n.push(s.join("")) : n.push(Ml(s))), r.address = n.join(""), r;
}
function Ll(e) {
  if (jh(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = Th(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function jh(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function kh(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
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
    } else if (s === 3 && t === "/..") {
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
function Ah(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Ch(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Dl(r)) {
      const n = Ll(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Vl = {
  nonSimpleDomain: Oh,
  recomposeAuthority: Ch,
  normalizeComponentEncoding: Ah,
  removeDotSegments: kh,
  isIPv4: Dl,
  isUUID: Rh,
  normalizeIPv6: Ll
};
const { isUUID: Dh } = Vl, Mh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Fl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function zl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Ul(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Lh(e) {
  return e.secure = Fl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Vh(e) {
  if ((e.port === (Fl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Fh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Mh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Ia(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function zh(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Ia(s);
  a && (e = a.serialize(e, t));
  const o = e, c = e.nss;
  return o.path = `${n || t.nid}:${c}`, t.skipEscape = !0, o;
}
function Uh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Dh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function qh(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const ql = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: zl,
    serialize: Ul
  }
), Kh = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: ql.domainHost,
    parse: zl,
    serialize: Ul
  }
), Cn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Lh,
    serialize: Vh
  }
), Gh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Cn.domainHost,
    parse: Cn.parse,
    serialize: Cn.serialize
  }
), Hh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Fh,
    serialize: zh,
    skipNormalize: !0
  }
), Bh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Uh,
    serialize: qh,
    skipNormalize: !0
  }
), Gn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: ql,
    https: Kh,
    ws: Cn,
    wss: Gh,
    urn: Hh,
    "urn:uuid": Bh
  }
);
Object.setPrototypeOf(Gn, null);
function Ia(e) {
  return e && (Gn[
    /** @type {SchemeName} */
    e
  ] || Gn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Wh = {
  SCHEMES: Gn,
  getSchemeHandler: Ia
};
const { normalizeIPv6: Jh, removeDotSegments: Ur, recomposeAuthority: Xh, normalizeComponentEncoding: dn, isIPv4: Yh, nonSimpleDomain: Qh } = Vl, { SCHEMES: Zh, getSchemeHandler: Kl } = Wh;
function xh(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  pt(bt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  bt(pt(e, t), t)), e;
}
function em(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Gl(bt(e, n), bt(t, n), n, !0);
  return n.skipEscape = !0, pt(s, n);
}
function Gl(e, t, r, n) {
  const s = {};
  return n || (e = bt(pt(e, r), r), t = bt(pt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ur(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ur(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Ur(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Ur(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function tm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = pt(dn(bt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = pt(dn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = pt(dn(bt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = pt(dn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function pt(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = Kl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const o = Xh(r);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let c = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (c = Ur(c)), o === void 0 && c[0] === "/" && c[1] === "/" && (c = "/%2F" + c.slice(2)), s.push(c);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const rm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function bt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const a = e.match(rm);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Yh(n.host) === !1) {
        const l = Jh(n.host);
        n.host = l.host.toLowerCase(), s = l.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const o = Kl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!o || !o.unicodeSupport) && n.host && (r.domainHost || o && o.domainHost) && s === !1 && Qh(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!o || o && !o.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), o && o.parse && o.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ta = {
  SCHEMES: Zh,
  normalize: xh,
  resolve: em,
  resolveComponent: Gl,
  equal: tm,
  serialize: pt,
  parse: bt
};
os.exports = Ta;
os.exports.default = Ta;
os.exports.fastUri = Ta;
var Hl = os.exports;
Object.defineProperty(Oa, "__esModule", { value: !0 });
const Bl = Hl;
Bl.code = 'require("ajv/dist/runtime/uri").default';
Oa.default = Bl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ot;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ne;
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
  const n = sn, s = Pr, a = sr, o = Fe, c = ne, l = Ie, d = Ee, u = L, h = Nh, w = Oa, y = (N, p) => new RegExp(N, p);
  y.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
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
  ]), g = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function P(N) {
    var p, S, _, i, f, b, k, A, H, q, R, I, C, M, B, te, ge, Le, Se, Pe, _e, lt, je, qt, Kt;
    const Qe = N.strict, Gt = (p = N.code) === null || p === void 0 ? void 0 : p.optimize, Cr = Gt === !0 || Gt === void 0 ? 1 : Gt || 0, Dr = (_ = (S = N.code) === null || S === void 0 ? void 0 : S.regExp) !== null && _ !== void 0 ? _ : y, Es = (i = N.uriResolver) !== null && i !== void 0 ? i : w.default;
    return {
      strictSchema: (b = (f = N.strictSchema) !== null && f !== void 0 ? f : Qe) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (k = N.strictNumbers) !== null && k !== void 0 ? k : Qe) !== null && A !== void 0 ? A : !0,
      strictTypes: (q = (H = N.strictTypes) !== null && H !== void 0 ? H : Qe) !== null && q !== void 0 ? q : "log",
      strictTuples: (I = (R = N.strictTuples) !== null && R !== void 0 ? R : Qe) !== null && I !== void 0 ? I : "log",
      strictRequired: (M = (C = N.strictRequired) !== null && C !== void 0 ? C : Qe) !== null && M !== void 0 ? M : !1,
      code: N.code ? { ...N.code, optimize: Cr, regExp: Dr } : { optimize: Cr, regExp: Dr },
      loopRequired: (B = N.loopRequired) !== null && B !== void 0 ? B : E,
      loopEnum: (te = N.loopEnum) !== null && te !== void 0 ? te : E,
      meta: (ge = N.meta) !== null && ge !== void 0 ? ge : !0,
      messages: (Le = N.messages) !== null && Le !== void 0 ? Le : !0,
      inlineRefs: (Se = N.inlineRefs) !== null && Se !== void 0 ? Se : !0,
      schemaId: (Pe = N.schemaId) !== null && Pe !== void 0 ? Pe : "$id",
      addUsedSchema: (_e = N.addUsedSchema) !== null && _e !== void 0 ? _e : !0,
      validateSchema: (lt = N.validateSchema) !== null && lt !== void 0 ? lt : !0,
      validateFormats: (je = N.validateFormats) !== null && je !== void 0 ? je : !0,
      unicodeRegExp: (qt = N.unicodeRegExp) !== null && qt !== void 0 ? qt : !0,
      int32range: (Kt = N.int32range) !== null && Kt !== void 0 ? Kt : !0,
      uriResolver: Es
    };
  }
  class O {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...P(p) };
      const { es5: S, lines: _ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: $, es5: S, lines: _ }), this.logger = X(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, g, p, "NOT SUPPORTED"), T.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = ye.call(this), p.formats && le.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && fe.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), Y.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: _ } = this.opts;
      let i = h;
      _ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && p && this.addMetaSchema(i, i[_], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let _;
      if (typeof p == "string") {
        if (_ = this.getSchema(p), !_)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        _ = this.compile(p);
      const i = _(S);
      return "$async" in _ || (this.errors = _.errors), i;
    }
    compile(p, S) {
      const _ = this._addSchema(p, S);
      return _.validate || this._compileSchemaEnv(_);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: _ } = this.opts;
      return i.call(this, p, S);
      async function i(q, R) {
        await f.call(this, q.$schema);
        const I = this._addSchema(q, R);
        return I.validate || b.call(this, I);
      }
      async function f(q) {
        q && !this.getSchema(q) && await i.call(this, { $ref: q }, !0);
      }
      async function b(q) {
        try {
          return this._compileSchemaEnv(q);
        } catch (R) {
          if (!(R instanceof s.default))
            throw R;
          return k.call(this, R), await A.call(this, R.missingSchema), b.call(this, q);
        }
      }
      function k({ missingSchema: q, missingRef: R }) {
        if (this.refs[q])
          throw new Error(`AnySchema ${q} is loaded but ${R} cannot be resolved`);
      }
      async function A(q) {
        const R = await H.call(this, q);
        this.refs[q] || await f.call(this, R.$schema), this.refs[q] || this.addSchema(R, q, S);
      }
      async function H(q) {
        const R = this._loading[q];
        if (R)
          return R;
        try {
          return await (this._loading[q] = _(q));
        } finally {
          delete this._loading[q];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, _, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, _, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, l.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, _, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, _ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, _), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let _;
      if (_ = p.$schema, _ !== void 0 && typeof _ != "string")
        throw new Error("$schema must be a string");
      if (_ = _ || this.opts.defaultMeta || this.defaultMeta(), !_)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate(_, p);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = G.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: _ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: _ });
        if (S = o.resolveSchema.call(this, i, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = G.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let _ = p[this.opts.schemaId];
          return _ && (_ = (0, l.normalizeId)(_), delete this.schemas[_], delete this.refs[_]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let _;
      if (typeof p == "string")
        _ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = _);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, _ = S.keyword, Array.isArray(_) && !_.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, _, S), !S)
        return (0, u.eachItem)(_, (f) => D.call(this, f)), this;
      V.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)(_, i.type.length === 0 ? (f) => D.call(this, f, i) : (f) => i.type.forEach((b) => D.call(this, f, i, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const _ of S.rules) {
        const i = _.rules.findIndex((f) => f.keyword === p);
        i >= 0 && _.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: _ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${_}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(p, S) {
      const _ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let b = p;
        for (const k of f)
          b = b[k];
        for (const k in _) {
          const A = _[k];
          if (typeof A != "object")
            continue;
          const { $data: H } = A.definition, q = b[k];
          H && q && (b[k] = z(q));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const _ in p) {
        const i = p[_];
        (!S || S.test(_)) && (typeof i == "string" ? delete p[_] : i && !i.meta && (this._cache.delete(i.schema), delete p[_]));
      }
    }
    _addSchema(p, S, _, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: k } = this.opts;
      if (typeof p == "object")
        b = p[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      _ = (0, l.normalizeId)(b || _);
      const H = l.getSchemaRefs.call(this, p, _);
      return A = new o.SchemaEnv({ schema: p, schemaId: k, meta: S, baseId: _, localRefs: H }), this._cache.set(A.schema, A), f && !_.startsWith("#") && (_ && this._checkUnique(_), this.refs[_] = A), i && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = s.default, e.default = O;
  function T(N, p, S, _ = "error") {
    for (const i in N) {
      const f = i;
      f in p && this.logger[_](`${S}: option ${i}. ${N[f]}`);
    }
  }
  function G(N) {
    return N = (0, l.normalizeId)(N), this.schemas[N] || this.refs[N];
  }
  function Y() {
    const N = this.opts.schemas;
    if (N)
      if (Array.isArray(N))
        this.addSchema(N);
      else
        for (const p in N)
          this.addSchema(N[p], p);
  }
  function le() {
    for (const N in this.opts.formats) {
      const p = this.opts.formats[N];
      p && this.addFormat(N, p);
    }
  }
  function fe(N) {
    if (Array.isArray(N)) {
      this.addVocabulary(N);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in N) {
      const S = N[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function ye() {
    const N = { ...this.opts };
    for (const p of v)
      delete N[p];
    return N;
  }
  const K = { log() {
  }, warn() {
  }, error() {
  } };
  function X(N) {
    if (N === !1)
      return K;
    if (N === void 0)
      return console;
    if (N.log && N.warn && N.error)
      return N;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(N, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(N, (_) => {
      if (S.keywords[_])
        throw new Error(`Keyword ${_} is already defined`);
      if (!Q.test(_))
        throw new Error(`Keyword ${_} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(N, p, S) {
    var _;
    const i = p == null ? void 0 : p.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[N] = !0, !p)
      return;
    const k = {
      keyword: N,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, k, p.before) : b.rules.push(k), f.all[N] = k, (_ = p.implements) === null || _ === void 0 || _.forEach((A) => this.addKeyword(A));
  }
  function U(N, p, S) {
    const _ = N.rules.findIndex((i) => i.keyword === S);
    _ >= 0 ? N.rules.splice(_, 0, p) : (N.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function V(N) {
    let { metaSchema: p } = N;
    p !== void 0 && (N.$data && this.opts.$data && (p = z(p)), N.validateSchema = this.compile(p, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function z(N) {
    return { anyOf: [N, W] };
  }
})(nl);
var ja = {}, ka = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const nm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Aa.default = nm;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.callRef = St.getValidate = void 0;
const sm = Pr, Ai = ie, qe = ne, lr = We, Ci = Fe, fn = L, am = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Ci.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new sm.default(n.opts.uriResolver, s, r);
    if (u instanceof Ci.SchemaEnv)
      return w(u);
    return y(u);
    function h() {
      if (a === d)
        return Dn(e, o, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Dn(e, (0, qe._)`${v}.validate`, d, d.$async);
    }
    function w(v) {
      const $ = Wl(e, v);
      Dn(e, $, v, v.$async);
    }
    function y(v) {
      const $ = t.scopeValue("schema", c.code.source === !0 ? { ref: v, code: (0, qe.stringify)(v) } : { ref: v }), g = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: qe.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(m), e.ok(g);
    }
  }
};
function Wl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, qe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
St.getValidate = Wl;
function Dn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: c, opts: l } = a, d = l.passContext ? lr.default.this : qe.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, qe._)`await ${(0, Ai.callValidateCode)(e, t, d)}`), y(t), o || s.assign(v, !0);
    }, ($) => {
      s.if((0, qe._)`!(${$} instanceof ${a.ValidationError})`, () => s.throw($)), w($), o || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Ai.callValidateCode)(e, t, d), () => y(t), () => w(t));
  }
  function w(v) {
    const $ = (0, qe._)`${v}.errors`;
    s.assign(lr.default.vErrors, (0, qe._)`${lr.default.vErrors} === null ? ${$} : ${lr.default.vErrors}.concat(${$})`), s.assign(lr.default.errors, (0, qe._)`${lr.default.vErrors}.length`);
  }
  function y(v) {
    var $;
    if (!a.opts.unevaluated)
      return;
    const g = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (a.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (a.props = fn.mergeEvaluated.props(s, g.props, a.props));
      else {
        const m = s.var("props", (0, qe._)`${v}.evaluated.props`);
        a.props = fn.mergeEvaluated.props(s, m, a.props, qe.Name);
      }
    if (a.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (a.items = fn.mergeEvaluated.items(s, g.items, a.items));
      else {
        const m = s.var("items", (0, qe._)`${v}.evaluated.items`);
        a.items = fn.mergeEvaluated.items(s, m, a.items, qe.Name);
      }
  }
}
St.callRef = Dn;
St.default = am;
Object.defineProperty(ka, "__esModule", { value: !0 });
const om = Aa, im = St, cm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  om.default,
  im.default
];
ka.default = cm;
var Ca = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Hn = ne, Tt = Hn.operators, Bn = {
  maximum: { okStr: "<=", ok: Tt.LTE, fail: Tt.GT },
  minimum: { okStr: ">=", ok: Tt.GTE, fail: Tt.LT },
  exclusiveMaximum: { okStr: "<", ok: Tt.LT, fail: Tt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Tt.GT, fail: Tt.LTE }
}, lm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Hn.str)`must be ${Bn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Hn._)`{comparison: ${Bn[e].okStr}, limit: ${t}}`
}, um = {
  keyword: Object.keys(Bn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Hn._)`${r} ${Bn[t].fail} ${n} || isNaN(${r})`);
  }
};
Da.default = um;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Hr = ne, dm = {
  message: ({ schemaCode: e }) => (0, Hr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Hr._)`{multipleOf: ${e}}`
}, fm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: dm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), c = a ? (0, Hr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Hr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Hr._)`(${n} === 0 || (${o} = ${r}/${n}, ${c}))`);
  }
};
Ma.default = fm;
var La = {}, Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
function Jl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Va.default = Jl;
Jl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(La, "__esModule", { value: !0 });
const Yt = ne, hm = L, mm = Va, pm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Yt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Yt._)`{limit: ${e}}`
}, ym = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: pm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Yt.operators.GT : Yt.operators.LT, o = s.opts.unicode === !1 ? (0, Yt._)`${r}.length` : (0, Yt._)`${(0, hm.useFunc)(e.gen, mm.default)}(${r})`;
    e.fail$data((0, Yt._)`${o} ${a} ${n}`);
  }
};
La.default = ym;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const $m = ie, Wn = ne, gm = {
  message: ({ schemaCode: e }) => (0, Wn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Wn._)`{pattern: ${e}}`
}, _m = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: gm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Wn._)`(new RegExp(${s}, ${o}))` : (0, $m.usePattern)(e, n);
    e.fail$data((0, Wn._)`!${c}.test(${t})`);
  }
};
Fa.default = _m;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Br = ne, vm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Br.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Br._)`{limit: ${e}}`
}, wm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: vm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Br.operators.GT : Br.operators.LT;
    e.fail$data((0, Br._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
za.default = wm;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Lr = ie, Wr = ne, Em = L, bm = {
  message: ({ params: { missingProperty: e } }) => (0, Wr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Wr._)`{missingProperty: ${e}}`
}, Sm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: bm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: c } = o;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (o.allErrors ? d() : u(), c.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const $ of r)
        if ((y == null ? void 0 : y[$]) === void 0 && !v.has($)) {
          const g = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${g}" (strictRequired)`;
          (0, Em.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(Wr.nil, h);
      else
        for (const y of r)
          (0, Lr.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (l || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => w(y, v)), e.ok(v);
      } else
        t.if((0, Lr.checkMissingProp)(e, r, y)), (0, Lr.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Lr.noPropertyInData)(t, s, y, c.ownProperties), () => e.error());
      });
    }
    function w(y, v) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(v, (0, Lr.propertyInData)(t, s, y, c.ownProperties)), t.if((0, Wr.not)(v), () => {
          e.error(), t.break();
        });
      }, Wr.nil);
    }
  }
};
Ua.default = Sm;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Jr = ne, Pm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Jr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Jr._)`{limit: ${e}}`
}, Nm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Pm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Jr.operators.GT : Jr.operators.LT;
    e.fail$data((0, Jr._)`${r}.length ${s} ${n}`);
  }
};
qa.default = Nm;
var Ka = {}, an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
const Xl = ns;
Xl.code = 'require("ajv/dist/runtime/equal").default';
an.default = Xl;
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Ts = Ee, Re = ne, Rm = L, Om = an, Im = {
  message: ({ params: { i: e, j: t } }) => (0, Re.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Re._)`{i: ${e}, j: ${t}}`
}, Tm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Im,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, Ts.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, Re._)`${o} === false`), e.ok(l);
    function u() {
      const v = t.let("i", (0, Re._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: v, j: $ }), t.assign(l, !0), t.if((0, Re._)`${v} > 1`, () => (h() ? w : y)(v, $));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function w(v, $) {
      const g = t.name("item"), m = (0, Ts.checkDataTypes)(d, g, c.opts.strictNumbers, Ts.DataType.Wrong), E = t.const("indices", (0, Re._)`{}`);
      t.for((0, Re._)`;${v}--;`, () => {
        t.let(g, (0, Re._)`${r}[${v}]`), t.if(m, (0, Re._)`continue`), d.length > 1 && t.if((0, Re._)`typeof ${g} == "string"`, (0, Re._)`${g} += "_"`), t.if((0, Re._)`typeof ${E}[${g}] == "number"`, () => {
          t.assign($, (0, Re._)`${E}[${g}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Re._)`${E}[${g}] = ${v}`);
      });
    }
    function y(v, $) {
      const g = (0, Rm.useFunc)(t, Om.default), m = t.name("outer");
      t.label(m).for((0, Re._)`;${v}--;`, () => t.for((0, Re._)`${$} = ${v}; ${$}--;`, () => t.if((0, Re._)`${g}(${r}[${v}], ${r}[${$}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
Ka.default = Tm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const xs = ne, jm = L, km = an, Am = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, xs._)`{allowedValue: ${e}}`
}, Cm = {
  keyword: "const",
  $data: !0,
  error: Am,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, xs._)`!${(0, jm.useFunc)(t, km.default)}(${r}, ${s})`) : e.fail((0, xs._)`${a} !== ${r}`);
  }
};
Ga.default = Cm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const qr = ne, Dm = L, Mm = an, Lm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, qr._)`{allowedValues: ${e}}`
}, Vm = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Lm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= o.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, Dm.useFunc)(t, Mm.default));
    let u;
    if (c || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, qr.or)(...s.map((v, $) => w(y, $)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, qr._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function w(y, v) {
      const $ = s[v];
      return typeof $ == "object" && $ !== null ? (0, qr._)`${d()}(${r}, ${y}[${v}])` : (0, qr._)`${r} === ${$}`;
    }
  }
};
Ha.default = Vm;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const Fm = Da, zm = Ma, Um = La, qm = Fa, Km = za, Gm = Ua, Hm = qa, Bm = Ka, Wm = Ga, Jm = Ha, Xm = [
  // number
  Fm.default,
  zm.default,
  // string
  Um.default,
  qm.default,
  // object
  Km.default,
  Gm.default,
  // array
  Hm.default,
  Bm.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Wm.default,
  Jm.default
];
Ca.default = Xm;
var Ba = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.validateAdditionalItems = void 0;
const Qt = ne, ea = L, Ym = {
  message: ({ params: { len: e } }) => (0, Qt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Qt._)`{limit: ${e}}`
}, Qm = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Ym,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ea.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Yl(e, n);
  }
};
function Yl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const c = r.const("len", (0, Qt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Qt._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ea.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, Qt._)`${c} <= ${t.length}`);
    r.if((0, Qt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: ea.Type.Num }, d), o.allErrors || r.if((0, Qt.not)(d), () => r.break());
    });
  }
}
Nr.validateAdditionalItems = Yl;
Nr.default = Qm;
var Wa = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateTuple = void 0;
const Di = ne, Mn = L, Zm = ie, xm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Ql(e, "additionalItems", t);
    r.items = !0, !(0, Mn.alwaysValidSchema)(r, t) && e.ok((0, Zm.validateArray)(e));
  }
};
function Ql(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = Mn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, Di._)`${a}.length`);
  r.forEach((h, w) => {
    (0, Mn.alwaysValidSchema)(c, h) || (n.if((0, Di._)`${d} > ${w}`, () => e.subschema({
      keyword: o,
      schemaProp: w,
      dataProp: w
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: w, errSchemaPath: y } = c, v = r.length, $ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (w.strictTuples && !$) {
      const g = `"${o}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, Mn.checkStrictMode)(c, g, w.strictTuples);
    }
  }
}
Rr.validateTuple = Ql;
Rr.default = xm;
Object.defineProperty(Wa, "__esModule", { value: !0 });
const ep = Rr, tp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, ep.validateTuple)(e, "items")
};
Wa.default = tp;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Mi = ne, rp = L, np = ie, sp = Nr, ap = {
  message: ({ params: { len: e } }) => (0, Mi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Mi._)`{limit: ${e}}`
}, op = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: ap,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, rp.alwaysValidSchema)(n, t) && (s ? (0, sp.validateAdditionalItems)(e, s) : e.ok((0, np.validateArray)(e)));
  }
};
Ja.default = op;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Xe = ne, hn = L, ip = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Xe.str)`must contain at least ${e} valid item(s)` : (0, Xe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Xe._)`{minContains: ${e}}` : (0, Xe._)`{minContains: ${e}, maxContains: ${t}}`
}, cp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: ip,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (o = l === void 0 ? 1 : l, c = d) : o = 1;
    const u = t.const("len", (0, Xe._)`${s}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, hn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, hn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, hn.alwaysValidSchema)(a, r)) {
      let $ = (0, Xe._)`${u} >= ${o}`;
      c !== void 0 && ($ = (0, Xe._)`${$} && ${u} <= ${c}`), e.pass($);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && o === 1 ? y(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, Xe._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const $ = t.name("_valid"), g = t.let("count", 0);
      y($, () => t.if($, () => v(g)));
    }
    function y($, g) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: hn.Type.Num,
          compositeRule: !0
        }, $), g();
      });
    }
    function v($) {
      t.code((0, Xe._)`${$}++`), c === void 0 ? t.if((0, Xe._)`${$} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, Xe._)`${$} > ${c}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, Xe._)`${$} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Xa.default = cp;
var is = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ne, r = L, n = ie;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [d, u] = a(l);
      o(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(l[h]) ? d : u;
      w[h] = l[h];
    }
    return [d, u];
  }
  function o(l, d = l.schema) {
    const { gen: u, data: h, it: w } = l;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const v in d) {
      const $ = d[v];
      if ($.length === 0)
        continue;
      const g = (0, n.propertyInData)(u, h, v, w.opts.ownProperties);
      l.setParams({
        property: v,
        depsCount: $.length,
        deps: $.join(", ")
      }), w.allErrors ? u.if(g, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(l, m);
      }) : (u.if((0, t._)`${g} && (${(0, n.checkMissingProp)(l, $, y)})`), (0, n.reportMissingProp)(l, y), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: w, it: y } = l, v = u.name("valid");
    for (const $ in d)
      (0, r.alwaysValidSchema)(y, d[$]) || (u.if(
        (0, n.propertyInData)(u, h, $, y.opts.ownProperties),
        () => {
          const g = l.subschema({ keyword: w, schemaProp: $ }, v);
          l.mergeValidEvaluated(g, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), l.ok(v));
  }
  e.validateSchemaDeps = c, e.default = s;
})(is);
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Zl = ne, lp = L, up = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Zl._)`{propertyName: ${e.propertyName}}`
}, dp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: up,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, lp.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Zl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ya.default = dp;
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
const mn = ie, tt = ne, fp = We, pn = L, hp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, tt._)`{additionalProperty: ${e.additionalProperty}}`
}, mp = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: hp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, pn.alwaysValidSchema)(o, r))
      return;
    const d = (0, mn.allSchemaProperties)(n.properties), u = (0, mn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, tt._)`${a} === ${fp.default.errors}`);
    function h() {
      t.forIn("key", s, (g) => {
        !d.length && !u.length ? v(g) : t.if(w(g), () => v(g));
      });
    }
    function w(g) {
      let m;
      if (d.length > 8) {
        const E = (0, pn.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, mn.isOwnProperty)(t, E, g);
      } else d.length ? m = (0, tt.or)(...d.map((E) => (0, tt._)`${g} === ${E}`)) : m = tt.nil;
      return u.length && (m = (0, tt.or)(m, ...u.map((E) => (0, tt._)`${(0, mn.usePattern)(e, E)}.test(${g})`))), (0, tt.not)(m);
    }
    function y(g) {
      t.code((0, tt._)`delete ${s}[${g}]`);
    }
    function v(g) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        y(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, pn.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? ($(g, m, !1), t.if((0, tt.not)(m), () => {
          e.reset(), y(g);
        })) : ($(g, m), c || t.if((0, tt.not)(m), () => t.break()));
      }
    }
    function $(g, m, E) {
      const P = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: pn.Type.Str
      };
      E === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
cs.default = mp;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const pp = ot, Li = ie, js = L, Vi = cs, yp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Vi.default.code(new pp.KeywordCxt(a, Vi.default, "additionalProperties"));
    const o = (0, Li.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = js.mergeEvaluated.props(t, (0, js.toHash)(o), a.props));
    const c = o.filter((h) => !(0, js.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, Li.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Qa.default = yp;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Fi = ie, yn = ne, zi = L, Ui = L, $p = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, c = (0, Fi.allSchemaProperties)(r), l = c.filter(($) => (0, zi.alwaysValidSchema)(a, r[$]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof yn.Name) && (a.props = (0, Ui.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const $ of c)
        d && y($), a.allErrors ? v($) : (t.var(u, !0), v($), t.if(u));
    }
    function y($) {
      for (const g in d)
        new RegExp($).test(g) && (0, zi.checkStrictMode)(a, `property ${g} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function v($) {
      t.forIn("key", n, (g) => {
        t.if((0, yn._)`${(0, Fi.usePattern)(e, $)}.test(${g})`, () => {
          const m = l.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: g,
            dataPropType: Ui.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, yn._)`${h}[${g}]`, !0) : !m && !a.allErrors && t.if((0, yn.not)(u), () => t.break());
        });
      });
    }
  }
};
Za.default = $p;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const gp = L, _p = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, gp.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
xa.default = _p;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const vp = ie, wp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: vp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
eo.default = wp;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const Ln = ne, Ep = L, bp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ln._)`{passingSchemas: ${e.passing}}`
}, Sp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: bp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, Ep.alwaysValidSchema)(s, u) ? t.var(l, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, Ln._)`${l} && ${o}`).assign(o, !1).assign(c, (0, Ln._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, h), w && e.mergeEvaluated(w, Ln.Name);
        });
      });
    }
  }
};
to.default = Sp;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Pp = L, Np = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, Pp.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
ro.default = Np;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Jn = ne, xl = L, Rp = {
  message: ({ params: e }) => (0, Jn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Jn._)`{failingKeyword: ${e.ifClause}}`
}, Op = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Rp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, xl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = qi(n, "then"), a = qi(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, Jn.not)(c), d("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, c);
        t.assign(o, c), e.mergeValidEvaluated(w, o), h ? t.assign(h, (0, Jn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function qi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, xl.alwaysValidSchema)(e, r);
}
no.default = Op;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const Ip = L, Tp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Ip.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
so.default = Tp;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const jp = Nr, kp = Wa, Ap = Rr, Cp = Ja, Dp = Xa, Mp = is, Lp = Ya, Vp = cs, Fp = Qa, zp = Za, Up = xa, qp = eo, Kp = to, Gp = ro, Hp = no, Bp = so;
function Wp(e = !1) {
  const t = [
    // any
    Up.default,
    qp.default,
    Kp.default,
    Gp.default,
    Hp.default,
    Bp.default,
    // object
    Lp.default,
    Vp.default,
    Mp.default,
    Fp.default,
    zp.default
  ];
  return e ? t.push(kp.default, Cp.default) : t.push(jp.default, Ap.default), t.push(Dp.default), t;
}
Ba.default = Wp;
var ao = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.dynamicAnchor = void 0;
const ks = ne, Jp = We, Ki = Fe, Xp = St, Yp = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => eu(e, e.schema)
};
function eu(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const s = (0, ks._)`${Jp.default.dynamicAnchors}${(0, ks.getProperty)(t)}`, a = n.errSchemaPath === "#" ? n.validateName : Qp(e);
  r.if((0, ks._)`!${s}`, () => r.assign(s, a));
}
Or.dynamicAnchor = eu;
function Qp(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: s, baseId: a, localRefs: o, meta: c } = t.root, { schemaId: l } = n.opts, d = new Ki.SchemaEnv({ schema: r, schemaId: l, root: s, baseId: a, localRefs: o, meta: c });
  return Ki.compileSchema.call(n, d), (0, Xp.getValidate)(e, d);
}
Or.default = Yp;
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.dynamicRef = void 0;
const Gi = ne, Zp = We, Hi = St, xp = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => tu(e, e.schema)
};
function tu(e, t) {
  const { gen: r, keyword: n, it: s } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (s.allErrors)
    o();
  else {
    const l = r.let("valid", !1);
    o(l), e.ok(l);
  }
  function o(l) {
    if (s.schemaEnv.root.dynamicAnchors[a]) {
      const d = r.let("_v", (0, Gi._)`${Zp.default.dynamicAnchors}${(0, Gi.getProperty)(a)}`);
      r.if(d, c(d, l), c(s.validateName, l));
    } else
      c(s.validateName, l)();
  }
  function c(l, d) {
    return d ? () => r.block(() => {
      (0, Hi.callRef)(e, l), r.let(d, !0);
    }) : () => (0, Hi.callRef)(e, l);
  }
}
Ir.dynamicRef = tu;
Ir.default = xp;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const ey = Or, ty = L, ry = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, ey.dynamicAnchor)(e, "") : (0, ty.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
oo.default = ry;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
const ny = Ir, sy = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, ny.dynamicRef)(e, e.schema)
};
io.default = sy;
Object.defineProperty(ao, "__esModule", { value: !0 });
const ay = Or, oy = Ir, iy = oo, cy = io, ly = [ay.default, oy.default, iy.default, cy.default];
ao.default = ly;
var co = {}, lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const Bi = is, uy = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Bi.error,
  code: (e) => (0, Bi.validatePropertyDeps)(e)
};
lo.default = uy;
var uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
const dy = is, fy = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, dy.validateSchemaDeps)(e)
};
uo.default = fy;
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
const hy = L, my = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, hy.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
fo.default = my;
Object.defineProperty(co, "__esModule", { value: !0 });
const py = lo, yy = uo, $y = fo, gy = [py.default, yy.default, $y.default];
co.default = gy;
var ho = {}, mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
const Ct = ne, Wi = L, _y = We, vy = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Ct._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, wy = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: vy,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: c } = a;
    c instanceof Ct.Name ? t.if((0, Ct._)`${c} !== true`, () => t.forIn("key", n, (h) => t.if(d(c, h), () => l(h)))) : c !== !0 && t.forIn("key", n, (h) => c === void 0 ? l(h) : t.if(u(c, h), () => l(h))), a.props = !0, e.ok((0, Ct._)`${s} === ${_y.default.errors}`);
    function l(h) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: h }), e.error(), o || t.break();
        return;
      }
      if (!(0, Wi.alwaysValidSchema)(a, r)) {
        const w = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: h,
          dataPropType: Wi.Type.Str
        }, w), o || t.if((0, Ct.not)(w), () => t.break());
      }
    }
    function d(h, w) {
      return (0, Ct._)`!${h} || !${h}[${w}]`;
    }
    function u(h, w) {
      const y = [];
      for (const v in h)
        h[v] === !0 && y.push((0, Ct._)`${w} !== ${v}`);
      return (0, Ct.and)(...y);
    }
  }
};
mo.default = wy;
var po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
const Zt = ne, Ji = L, Ey = {
  message: ({ params: { len: e } }) => (0, Zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zt._)`{limit: ${e}}`
}, by = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: Ey,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e, a = s.items || 0;
    if (a === !0)
      return;
    const o = t.const("len", (0, Zt._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: a }), e.fail((0, Zt._)`${o} > ${a}`);
    else if (typeof r == "object" && !(0, Ji.alwaysValidSchema)(s, r)) {
      const l = t.var("valid", (0, Zt._)`${o} <= ${a}`);
      t.if((0, Zt.not)(l), () => c(l, a)), e.ok(l);
    }
    s.items = !0;
    function c(l, d) {
      t.forRange("i", d, o, (u) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: u, dataPropType: Ji.Type.Num }, l), s.allErrors || t.if((0, Zt.not)(l), () => t.break());
      });
    }
  }
};
po.default = by;
Object.defineProperty(ho, "__esModule", { value: !0 });
const Sy = mo, Py = po, Ny = [Sy.default, Py.default];
ho.default = Ny;
var yo = {}, $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
const ve = ne, Ry = {
  message: ({ schemaCode: e }) => (0, ve.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ve._)`{format: ${e}}`
}, Oy = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Ry,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? w() : y();
    function w() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), $ = r.const("fDef", (0, ve._)`${v}[${o}]`), g = r.let("fType"), m = r.let("format");
      r.if((0, ve._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(g, (0, ve._)`${$}.type || "string"`).assign(m, (0, ve._)`${$}.validate`), () => r.assign(g, (0, ve._)`"string"`).assign(m, $)), e.fail$data((0, ve.or)(E(), P()));
      function E() {
        return l.strictSchema === !1 ? ve.nil : (0, ve._)`${o} && !${m}`;
      }
      function P() {
        const O = u.$async ? (0, ve._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, ve._)`${m}(${n})`, T = (0, ve._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${n}))`;
        return (0, ve._)`${m} && ${m} !== true && ${g} === ${t} && !${T}`;
      }
    }
    function y() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [$, g, m] = P(v);
      $ === t && e.pass(O());
      function E() {
        if (l.strictSchema === !1) {
          h.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function P(T) {
        const G = T instanceof RegExp ? (0, ve.regexpCode)(T) : l.code.formats ? (0, ve._)`${l.code.formats}${(0, ve.getProperty)(a)}` : void 0, Y = r.scopeValue("formats", { key: a, ref: T, code: G });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, ve._)`${Y}.validate`] : ["string", T, Y];
      }
      function O() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ve._)`await ${m}(${n})`;
        }
        return typeof g == "function" ? (0, ve._)`${m}(${n})` : (0, ve._)`${m}.test(${n})`;
      }
    }
  }
};
$o.default = Oy;
Object.defineProperty(yo, "__esModule", { value: !0 });
const Iy = $o, Ty = [Iy.default];
yo.default = Ty;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.contentVocabulary = br.metadataVocabulary = void 0;
br.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
br.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ja, "__esModule", { value: !0 });
const jy = ka, ky = Ca, Ay = Ba, Cy = ao, Dy = co, My = ho, Ly = yo, Xi = br, Vy = [
  Cy.default,
  jy.default,
  ky.default,
  (0, Ay.default)(!0),
  Ly.default,
  Xi.metadataVocabulary,
  Xi.contentVocabulary,
  Dy.default,
  My.default
];
ja.default = Vy;
var go = {}, ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.DiscrError = void 0;
var Yi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Yi || (ls.DiscrError = Yi = {}));
Object.defineProperty(go, "__esModule", { value: !0 });
const fr = ne, ta = ls, Qi = Fe, Fy = Pr, zy = L, Uy = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ta.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, fr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, qy = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Uy,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, fr._)`${r}${(0, fr.getProperty)(c)}`);
    t.if((0, fr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: ta.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const y = w();
      t.if(!1);
      for (const v in y)
        t.elseIf((0, fr._)`${d} === ${v}`), t.assign(l, h(y[v]));
      t.else(), e.error(!1, { discrError: ta.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
    }
    function h(y) {
      const v = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: y }, v);
      return e.mergeEvaluated($, fr.Name), v;
    }
    function w() {
      var y;
      const v = {}, $ = m(s);
      let g = !0;
      for (let O = 0; O < o.length; O++) {
        let T = o[O];
        if (T != null && T.$ref && !(0, zy.schemaHasRulesButRef)(T, a.self.RULES)) {
          const Y = T.$ref;
          if (T = Qi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, Y), T instanceof Qi.SchemaEnv && (T = T.schema), T === void 0)
            throw new Fy.default(a.opts.uriResolver, a.baseId, Y);
        }
        const G = (y = T == null ? void 0 : T.properties) === null || y === void 0 ? void 0 : y[c];
        if (typeof G != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        g = g && ($ || m(T)), E(G, O);
      }
      if (!g)
        throw new Error(`discriminator: "${c}" must be required`);
      return v;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(c);
      }
      function E(O, T) {
        if (O.const)
          P(O.const, T);
        else if (O.enum)
          for (const G of O.enum)
            P(G, T);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function P(O, T) {
        if (typeof O != "string" || O in v)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        v[O] = T;
      }
    }
  }
};
go.default = qy;
var _o = {};
const Ky = "https://json-schema.org/draft/2020-12/schema", Gy = "https://json-schema.org/draft/2020-12/schema", Hy = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, By = "meta", Wy = "Core and Validation specifications meta-schema", Jy = [
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
], Xy = [
  "object",
  "boolean"
], Yy = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", Qy = {
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
}, Zy = {
  $schema: Ky,
  $id: Gy,
  $vocabulary: Hy,
  $dynamicAnchor: By,
  title: Wy,
  allOf: Jy,
  type: Xy,
  $comment: Yy,
  properties: Qy
}, xy = "https://json-schema.org/draft/2020-12/schema", e$ = "https://json-schema.org/draft/2020-12/meta/applicator", t$ = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, r$ = "meta", n$ = "Applicator vocabulary meta-schema", s$ = [
  "object",
  "boolean"
], a$ = {
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
}, o$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, i$ = {
  $schema: xy,
  $id: e$,
  $vocabulary: t$,
  $dynamicAnchor: r$,
  title: n$,
  type: s$,
  properties: a$,
  $defs: o$
}, c$ = "https://json-schema.org/draft/2020-12/schema", l$ = "https://json-schema.org/draft/2020-12/meta/unevaluated", u$ = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, d$ = "meta", f$ = "Unevaluated applicator vocabulary meta-schema", h$ = [
  "object",
  "boolean"
], m$ = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, p$ = {
  $schema: c$,
  $id: l$,
  $vocabulary: u$,
  $dynamicAnchor: d$,
  title: f$,
  type: h$,
  properties: m$
}, y$ = "https://json-schema.org/draft/2020-12/schema", $$ = "https://json-schema.org/draft/2020-12/meta/content", g$ = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, _$ = "meta", v$ = "Content vocabulary meta-schema", w$ = [
  "object",
  "boolean"
], E$ = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, b$ = {
  $schema: y$,
  $id: $$,
  $vocabulary: g$,
  $dynamicAnchor: _$,
  title: v$,
  type: w$,
  properties: E$
}, S$ = "https://json-schema.org/draft/2020-12/schema", P$ = "https://json-schema.org/draft/2020-12/meta/core", N$ = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, R$ = "meta", O$ = "Core vocabulary meta-schema", I$ = [
  "object",
  "boolean"
], T$ = {
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
}, j$ = {
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
}, k$ = {
  $schema: S$,
  $id: P$,
  $vocabulary: N$,
  $dynamicAnchor: R$,
  title: O$,
  type: I$,
  properties: T$,
  $defs: j$
}, A$ = "https://json-schema.org/draft/2020-12/schema", C$ = "https://json-schema.org/draft/2020-12/meta/format-annotation", D$ = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, M$ = "meta", L$ = "Format vocabulary meta-schema for annotation results", V$ = [
  "object",
  "boolean"
], F$ = {
  format: {
    type: "string"
  }
}, z$ = {
  $schema: A$,
  $id: C$,
  $vocabulary: D$,
  $dynamicAnchor: M$,
  title: L$,
  type: V$,
  properties: F$
}, U$ = "https://json-schema.org/draft/2020-12/schema", q$ = "https://json-schema.org/draft/2020-12/meta/meta-data", K$ = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, G$ = "meta", H$ = "Meta-data vocabulary meta-schema", B$ = [
  "object",
  "boolean"
], W$ = {
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
}, J$ = {
  $schema: U$,
  $id: q$,
  $vocabulary: K$,
  $dynamicAnchor: G$,
  title: H$,
  type: B$,
  properties: W$
}, X$ = "https://json-schema.org/draft/2020-12/schema", Y$ = "https://json-schema.org/draft/2020-12/meta/validation", Q$ = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, Z$ = "meta", x$ = "Validation vocabulary meta-schema", e0 = [
  "object",
  "boolean"
], t0 = {
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
}, r0 = {
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
}, n0 = {
  $schema: X$,
  $id: Y$,
  $vocabulary: Q$,
  $dynamicAnchor: Z$,
  title: x$,
  type: e0,
  properties: t0,
  $defs: r0
};
Object.defineProperty(_o, "__esModule", { value: !0 });
const s0 = Zy, a0 = i$, o0 = p$, i0 = b$, c0 = k$, l0 = z$, u0 = J$, d0 = n0, f0 = ["/properties"];
function h0(e) {
  return [
    s0,
    a0,
    o0,
    i0,
    c0,
    t(this, l0),
    u0,
    t(this, d0)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, f0) : n;
  }
}
_o.default = h0;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = nl, n = ja, s = go, a = _o, o = "https://json-schema.org/draft/2020-12/schema";
  class c extends r.default {
    constructor(y = {}) {
      super({
        ...y,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: y, meta: v } = this.opts;
      v && (a.default.call(this, y), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv2020 = c, e.exports = t = c, e.exports.Ajv2020 = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var l = ot;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return l.KeywordCxt;
  } });
  var d = ne;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return d._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return d.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return d.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return d.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return d.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return d.CodeGen;
  } });
  var u = sn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var h = Pr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return h.default;
  } });
})(Js, Js.exports);
var m0 = Js.exports, ra = { exports: {} }, ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(K, X) {
    return { validate: K, compare: X };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l(!0), d),
    "date-time": t(w(!0), y),
    "iso-time": t(l(), u),
    "iso-date-time": t(w(), v),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
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
    regex: ye,
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
    byte: P,
    // signed 32 bit integer
    int32: { type: "number", validate: G },
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
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, y),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, v),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(K) {
    return K % 4 === 0 && (K % 100 !== 0 || K % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(K) {
    const X = n.exec(K);
    if (!X)
      return !1;
    const Q = +X[1], j = +X[2], D = +X[3];
    return j >= 1 && j <= 12 && D >= 1 && D <= (j === 2 && r(Q) ? 29 : s[j]);
  }
  function o(K, X) {
    if (K && X)
      return K > X ? 1 : K < X ? -1 : 0;
  }
  const c = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function l(K) {
    return function(Q) {
      const j = c.exec(Q);
      if (!j)
        return !1;
      const D = +j[1], U = +j[2], V = +j[3], W = j[4], z = j[5] === "-" ? -1 : 1, N = +(j[6] || 0), p = +(j[7] || 0);
      if (N > 23 || p > 59 || K && !W)
        return !1;
      if (D <= 23 && U <= 59 && V < 60)
        return !0;
      const S = U - p * z, _ = D - N * z - (S < 0 ? 1 : 0);
      return (_ === 23 || _ === -1) && (S === 59 || S === -1) && V < 61;
    };
  }
  function d(K, X) {
    if (!(K && X))
      return;
    const Q = (/* @__PURE__ */ new Date("2020-01-01T" + K)).valueOf(), j = (/* @__PURE__ */ new Date("2020-01-01T" + X)).valueOf();
    if (Q && j)
      return Q - j;
  }
  function u(K, X) {
    if (!(K && X))
      return;
    const Q = c.exec(K), j = c.exec(X);
    if (Q && j)
      return K = Q[1] + Q[2] + Q[3], X = j[1] + j[2] + j[3], K > X ? 1 : K < X ? -1 : 0;
  }
  const h = /t|\s/i;
  function w(K) {
    const X = l(K);
    return function(j) {
      const D = j.split(h);
      return D.length === 2 && a(D[0]) && X(D[1]);
    };
  }
  function y(K, X) {
    if (!(K && X))
      return;
    const Q = new Date(K).valueOf(), j = new Date(X).valueOf();
    if (Q && j)
      return Q - j;
  }
  function v(K, X) {
    if (!(K && X))
      return;
    const [Q, j] = K.split(h), [D, U] = X.split(h), V = o(Q, D);
    if (V !== void 0)
      return V || d(j, U);
  }
  const $ = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(K) {
    return $.test(K) && g.test(K);
  }
  const E = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function P(K) {
    return E.lastIndex = 0, E.test(K);
  }
  const O = -2147483648, T = 2 ** 31 - 1;
  function G(K) {
    return Number.isInteger(K) && K <= T && K >= O;
  }
  function Y(K) {
    return Number.isInteger(K);
  }
  function le() {
    return !0;
  }
  const fe = /[^\\]\\Z/;
  function ye(K) {
    if (fe.test(K))
      return !1;
    try {
      return new RegExp(K), !0;
    } catch {
      return !1;
    }
  }
})(ru);
var nu = {}, na = { exports: {} }, su = {}, gt = {}, Wt = {}, As = {}, oe = {}, tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((P, O) => `${P}${O}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((P, O) => (O instanceof r && (P[O.str] = (P[O.str] || 0) + 1), P), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...E) {
    const P = [m[0]];
    let O = 0;
    for (; O < E.length; )
      c(P, E[O]), P.push(m[++O]);
    return new n(P);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...E) {
    const P = [y(m[0])];
    let O = 0;
    for (; O < E.length; )
      P.push(a), c(P, E[O]), P.push(a, y(m[++O]));
    return l(P), new n(P);
  }
  e.str = o;
  function c(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = c;
  function l(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const P = d(m[E - 1], m[E + 1]);
        if (P !== void 0) {
          m.splice(E - 1, 3, P);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function d(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function u(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : y(Array.isArray(m) ? m.join(",") : m);
  }
  function w(m) {
    return new n(y(m));
  }
  e.stringify = w;
  function y(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function g(m) {
    return new n(m.toString());
  }
  e.regexpCode = g;
})(tn);
var sa = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = tn;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class c extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const w = this.toName(d), { prefix: y } = w, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let $ = this._values[y];
      if ($) {
        const E = $.get(v);
        if (E)
          return E;
      } else
        $ = this._values[y] = /* @__PURE__ */ new Map();
      $.set(v, w);
      const g = this._scope[y] || (this._scope[y] = []), m = g.length;
      return g[m] = u.ref, w.setValue(u, { property: y, itemIndex: m }), w;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, w) {
      let y = t.nil;
      for (const v in d) {
        const $ = d[v];
        if (!$)
          continue;
        const g = h[v] = h[v] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (g.has(m))
            return;
          g.set(m, n.Started);
          let E = u(m);
          if (E) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${P} ${m} = ${E};${this.opts._n}`;
          } else if (E = w == null ? void 0 : w(m))
            y = (0, t._)`${y}${E}${this.opts._n}`;
          else
            throw new r(m);
          g.set(m, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = c;
})(sa);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = tn, r = sa;
  var n = tn;
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
  var s = sa;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
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
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, b) {
      super(), this.varKind = i, this.name = f, this.rhs = b;
    }
    render({ es5: i, _n: f }) {
      const b = i ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${k};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(i, f, b) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(i, this.rhs);
    }
  }
  class l extends c {
    constructor(i, f, b, k) {
      super(i, b, k), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = j(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, b) => f + b.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const b = i[f].optimizeNodes();
        Array.isArray(b) ? i.splice(f, 1, ...b) : b ? i[f] = b : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: b } = this;
      let k = b.length;
      for (; k--; ) {
        const A = b[k];
        A.optimizeNames(i, f) || (D(i, A.names), b.splice(k, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => X(i, f.names), {});
    }
  }
  class v extends y {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class $ extends y {
  }
  class g extends v {
  }
  g.kind = "else";
  class m extends v {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new g(b) : b;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(U(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = j(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return Q(i, this.condition), this.else && X(i, this.else.names), i;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class P extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = j(this.iteration, i, f), this;
    }
    get names() {
      return X(super.names, this.iteration.names);
    }
  }
  class O extends E {
    constructor(i, f, b, k) {
      super(), this.varKind = i, this.name = f, this.from = b, this.to = k;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: b, from: k, to: A } = this;
      return `for(${f} ${b}=${k}; ${b}<${A}; ${b}++)` + super.render(i);
    }
    get names() {
      const i = Q(super.names, this.from);
      return Q(i, this.to);
    }
  }
  class T extends E {
    constructor(i, f, b, k) {
      super(), this.loop = i, this.varKind = f, this.name = b, this.iterable = k;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = j(this.iterable, i, f), this;
    }
    get names() {
      return X(super.names, this.iterable.names);
    }
  }
  class G extends v {
    constructor(i, f, b) {
      super(), this.name = i, this.args = f, this.async = b;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  G.kind = "func";
  class Y extends y {
    render(i) {
      return "return " + super.render(i);
    }
  }
  Y.kind = "return";
  class le extends v {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var b, k;
      return super.optimizeNames(i, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(i, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && X(i, this.catch.names), this.finally && X(i, this.finally.names), i;
    }
  }
  class fe extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  fe.kind = "catch";
  class ye extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  ye.kind = "finally";
  class K {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const b = this._extScope.value(i, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, b, k) {
      const A = this._scope.toName(f);
      return b !== void 0 && k && (this._constants[A.str] = b), this._leafNode(new o(i, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, b) {
      return this._def(r.varKinds.const, i, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, b) {
      return this._def(r.varKinds.let, i, f, b);
    }
    // `var` declaration with optional assignment
    var(i, f, b) {
      return this._def(r.varKinds.var, i, f, b);
    }
    // assignment code
    assign(i, f, b) {
      return this._leafNode(new c(i, f, b));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new l(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new w(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [b, k] of i)
        f.length > 1 && f.push(","), f.push(b), (b !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, b) {
      if (this._blockNode(new m(i)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new m(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, g);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new P(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, b, k, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const H = this._scope.toName(i);
      return this._for(new O(A, H, f, b), () => k(H));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, b, k = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const H = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${H}.length`, (q) => {
          this.var(A, (0, t._)`${H}[${q}]`), b(A);
        });
      }
      return this._for(new T("of", k, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, b, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(i);
      return this._for(new T("in", k, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new Y();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(i, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new le();
      if (this._blockNode(k), this.code(i), f) {
        const A = this.name("e");
        this._currNode = k.catch = new fe(A), f(A);
      }
      return b && (this._currNode = k.finally = new ye(), this.code(b)), this._endBlockNode(fe, ye);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || i !== void 0 && b !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, b, k) {
      return this._blockNode(new G(i, f, b)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(G);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const b = this._currNode;
      if (b instanceof i || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = K;
  function X(_, i) {
    for (const f in i)
      _[f] = (_[f] || 0) + (i[f] || 0);
    return _;
  }
  function Q(_, i) {
    return i instanceof t._CodeOrName ? X(_, i.names) : _;
  }
  function j(_, i, f) {
    if (_ instanceof t.Name)
      return b(_);
    if (!k(_))
      return _;
    return new t._Code(_._items.reduce((A, H) => (H instanceof t.Name && (H = b(H)), H instanceof t._Code ? A.push(...H._items) : A.push(H), A), []));
    function b(A) {
      const H = f[A.str];
      return H === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], H);
    }
    function k(A) {
      return A instanceof t._Code && A._items.some((H) => H instanceof t.Name && i[H.str] === 1 && f[H.str] !== void 0);
    }
  }
  function D(_, i) {
    for (const f in i)
      _[f] = (_[f] || 0) - (i[f] || 0);
  }
  function U(_) {
    return typeof _ == "boolean" || typeof _ == "number" || _ === null ? !_ : (0, t._)`!${S(_)}`;
  }
  e.not = U;
  const V = p(e.operators.AND);
  function W(..._) {
    return _.reduce(V);
  }
  e.and = W;
  const z = p(e.operators.OR);
  function N(..._) {
    return _.reduce(z);
  }
  e.or = N;
  function p(_) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${_} ${S(f)}`;
  }
  function S(_) {
    return _ instanceof t.Name ? _ : (0, t._)`(${_})`;
  }
})(oe);
var F = {};
Object.defineProperty(F, "__esModule", { value: !0 });
F.checkStrictMode = F.getErrorPath = F.Type = F.useFunc = F.setEvaluated = F.evaluatedPropsToName = F.mergeEvaluated = F.eachItem = F.unescapeJsonPointer = F.escapeJsonPointer = F.escapeFragment = F.unescapeFragment = F.schemaRefOrVal = F.schemaHasRulesButRef = F.schemaHasRules = F.checkUnknownRules = F.alwaysValidSchema = F.toHash = void 0;
const de = oe, p0 = tn;
function y0(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
F.toHash = y0;
function $0(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (au(e, t), !ou(t, e.self.RULES.all));
}
F.alwaysValidSchema = $0;
function au(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || lu(e, `unknown keyword: "${a}"`);
}
F.checkUnknownRules = au;
function ou(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
F.schemaHasRules = ou;
function g0(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
F.schemaHasRulesButRef = g0;
function _0({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, de._)`${r}`;
  }
  return (0, de._)`${e}${t}${(0, de.getProperty)(n)}`;
}
F.schemaRefOrVal = _0;
function v0(e) {
  return iu(decodeURIComponent(e));
}
F.unescapeFragment = v0;
function w0(e) {
  return encodeURIComponent(vo(e));
}
F.escapeFragment = w0;
function vo(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
F.escapeJsonPointer = vo;
function iu(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
F.unescapeJsonPointer = iu;
function E0(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
F.eachItem = E0;
function Zi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, c) => {
    const l = o === void 0 ? a : o instanceof de.Name ? (a instanceof de.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof de.Name ? (t(s, o, a), a) : r(a, o);
    return c === de.Name && !(l instanceof de.Name) ? n(s, l) : l;
  };
}
F.mergeEvaluated = {
  props: Zi({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, de._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, de._)`${r} || {}`).code((0, de._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, de._)`${r} || {}`), wo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: cu
  }),
  items: Zi({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, de._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, de._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function cu(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, de._)`{}`);
  return t !== void 0 && wo(e, r, t), r;
}
F.evaluatedPropsToName = cu;
function wo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, de._)`${t}${(0, de.getProperty)(n)}`, !0));
}
F.setEvaluated = wo;
const xi = {};
function b0(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: xi[t.code] || (xi[t.code] = new p0._Code(t.code))
  });
}
F.useFunc = b0;
var aa;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(aa || (F.Type = aa = {}));
function S0(e, t, r) {
  if (e instanceof de.Name) {
    const n = t === aa.Num;
    return r ? n ? (0, de._)`"[" + ${e} + "]"` : (0, de._)`"['" + ${e} + "']"` : n ? (0, de._)`"/" + ${e}` : (0, de._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, de.getProperty)(e).toString() : "/" + vo(e);
}
F.getErrorPath = S0;
function lu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
F.checkStrictMode = lu;
var $n = {}, ec;
function Ut() {
  if (ec) return $n;
  ec = 1, Object.defineProperty($n, "__esModule", { value: !0 });
  const e = oe, t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return $n.default = t, $n;
}
var tc;
function us() {
  return tc || (tc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = oe, r = F, n = Ut();
    e.keywordError = {
      message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: g, schemaType: m }) => m ? (0, t.str)`"${g}" keyword must be ${m} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
    };
    function s(g, m = e.keywordError, E, P) {
      const { it: O } = g, { gen: T, compositeRule: G, allErrors: Y } = O, le = h(g, m, E);
      P ?? (G || Y) ? l(T, le) : d(O, (0, t._)`[${le}]`);
    }
    e.reportError = s;
    function a(g, m = e.keywordError, E) {
      const { it: P } = g, { gen: O, compositeRule: T, allErrors: G } = P, Y = h(g, m, E);
      l(O, Y), T || G || d(P, n.default.vErrors);
    }
    e.reportExtraError = a;
    function o(g, m) {
      g.assign(n.default.errors, m), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(m, () => g.assign((0, t._)`${n.default.vErrors}.length`, m), () => g.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = o;
    function c({ gen: g, keyword: m, schemaValue: E, data: P, errsCount: O, it: T }) {
      if (O === void 0)
        throw new Error("ajv implementation error");
      const G = g.name("err");
      g.forRange("i", O, n.default.errors, (Y) => {
        g.const(G, (0, t._)`${n.default.vErrors}[${Y}]`), g.if((0, t._)`${G}.instancePath === undefined`, () => g.assign((0, t._)`${G}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), g.assign((0, t._)`${G}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (g.assign((0, t._)`${G}.schema`, E), g.assign((0, t._)`${G}.data`, P));
      });
    }
    e.extendErrors = c;
    function l(g, m) {
      const E = g.const("err", m);
      g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), g.code((0, t._)`${n.default.errors}++`);
    }
    function d(g, m) {
      const { gen: E, validateName: P, schemaEnv: O } = g;
      O.$async ? E.throw((0, t._)`new ${g.ValidationError}(${m})`) : (E.assign((0, t._)`${P}.errors`, m), E.return(!1));
    }
    const u = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function h(g, m, E) {
      const { createErrors: P } = g.it;
      return P === !1 ? (0, t._)`{}` : w(g, m, E);
    }
    function w(g, m, E = {}) {
      const { gen: P, it: O } = g, T = [
        y(O, E),
        v(g, E)
      ];
      return $(g, m, T), P.object(...T);
    }
    function y({ errorPath: g }, { instancePath: m }) {
      const E = m ? (0, t.str)`${g}${(0, r.getErrorPath)(m, r.Type.Str)}` : g;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
    }
    function v({ keyword: g, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: P }) {
      let O = P ? m : (0, t.str)`${m}/${g}`;
      return E && (O = (0, t.str)`${O}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, O];
    }
    function $(g, { params: m, message: E }, P) {
      const { keyword: O, data: T, schemaValue: G, it: Y } = g, { opts: le, propertyName: fe, topSchemaRef: ye, schemaPath: K } = Y;
      P.push([u.keyword, O], [u.params, typeof m == "function" ? m(g) : m || (0, t._)`{}`]), le.messages && P.push([u.message, typeof E == "function" ? E(g) : E]), le.verbose && P.push([u.schema, G], [u.parentSchema, (0, t._)`${ye}${K}`], [n.default.data, T]), fe && P.push([u.propertyName, fe]);
    }
  }(As)), As;
}
var rc;
function P0() {
  if (rc) return Wt;
  rc = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.boolOrEmptySchema = Wt.topBoolOrEmptySchema = void 0;
  const e = us(), t = oe, r = Ut(), n = {
    message: "boolean schema is false"
  };
  function s(c) {
    const { gen: l, schema: d, validateName: u } = c;
    d === !1 ? o(c, !1) : typeof d == "object" && d.$async === !0 ? l.return(r.default.data) : (l.assign((0, t._)`${u}.errors`, null), l.return(!0));
  }
  Wt.topBoolOrEmptySchema = s;
  function a(c, l) {
    const { gen: d, schema: u } = c;
    u === !1 ? (d.var(l, !1), o(c)) : d.var(l, !0);
  }
  Wt.boolOrEmptySchema = a;
  function o(c, l) {
    const { gen: d, data: u } = c, h = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: c
    };
    (0, e.reportError)(h, n, void 0, l);
  }
  return Wt;
}
var be = {}, ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.getRules = ar.isJSONType = void 0;
const N0 = ["string", "number", "integer", "boolean", "null", "object", "array"], R0 = new Set(N0);
function O0(e) {
  return typeof e == "string" && R0.has(e);
}
ar.isJSONType = O0;
function I0() {
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
ar.getRules = I0;
var _t = {}, nc;
function uu() {
  if (nc) return _t;
  nc = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.shouldUseRule = _t.shouldUseGroup = _t.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, a) {
    const o = s.RULES.types[a];
    return o && o !== !0 && t(n, o);
  }
  _t.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((a) => r(n, a));
  }
  _t.shouldUseGroup = t;
  function r(n, s) {
    var a;
    return n[s.keyword] !== void 0 || ((a = s.definition.implements) === null || a === void 0 ? void 0 : a.some((o) => n[o] !== void 0));
  }
  return _t.shouldUseRule = r, _t;
}
Object.defineProperty(be, "__esModule", { value: !0 });
be.reportTypeError = be.checkDataTypes = be.checkDataType = be.coerceAndCheckDataType = be.getJSONTypes = be.getSchemaTypes = be.DataType = void 0;
const T0 = ar, j0 = uu(), k0 = us(), ae = oe, du = F;
var gr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(gr || (be.DataType = gr = {}));
function A0(e) {
  const t = fu(e.type);
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
be.getSchemaTypes = A0;
function fu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(T0.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
be.getJSONTypes = fu;
function C0(e, t) {
  const { gen: r, data: n, opts: s } = e, a = D0(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, j0.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = Eo(t, n, s.strictNumbers, gr.Wrong);
    r.if(c, () => {
      a.length ? M0(e, t, a) : bo(e);
    });
  }
  return o;
}
be.coerceAndCheckDataType = C0;
const hu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function D0(e, t) {
  return t ? e.filter((r) => hu.has(r) || t === "array" && r === "array") : [];
}
function M0(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, ae._)`typeof ${s}`), c = n.let("coerced", (0, ae._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ae._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ae._)`${s}[0]`).assign(o, (0, ae._)`typeof ${s}`).if(Eo(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, ae._)`${c} !== undefined`);
  for (const d of r)
    (hu.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), bo(e), n.endIf(), n.if((0, ae._)`${c} !== undefined`, () => {
    n.assign(s, c), L0(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ae._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, ae._)`"" + ${s}`).elseIf((0, ae._)`${s} === null`).assign(c, (0, ae._)`""`);
        return;
      case "number":
        n.elseIf((0, ae._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, ae._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ae._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, ae._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ae._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, ae._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, ae._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, ae._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(c, (0, ae._)`[${s}]`);
    }
  }
}
function L0({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ae._)`${t} !== undefined`, () => e.assign((0, ae._)`${t}[${r}]`, n));
}
function oa(e, t, r, n = gr.Correct) {
  const s = n === gr.Correct ? ae.operators.EQ : ae.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, ae._)`${t} ${s} null`;
    case "array":
      a = (0, ae._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, ae._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = o((0, ae._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, ae._)`typeof ${t} ${s} ${e}`;
  }
  return n === gr.Correct ? a : (0, ae.not)(a);
  function o(c = ae.nil) {
    return (0, ae.and)((0, ae._)`typeof ${t} == "number"`, c, r ? (0, ae._)`isFinite(${t})` : ae.nil);
  }
}
be.checkDataType = oa;
function Eo(e, t, r, n) {
  if (e.length === 1)
    return oa(e[0], t, r, n);
  let s;
  const a = (0, du.toHash)(e);
  if (a.array && a.object) {
    const o = (0, ae._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, ae._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ae.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, ae.and)(s, oa(o, t, r, n));
  return s;
}
be.checkDataTypes = Eo;
const V0 = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ae._)`{type: ${e}}` : (0, ae._)`{type: ${t}}`
};
function bo(e) {
  const t = F0(e);
  (0, k0.reportError)(t, V0);
}
be.reportTypeError = bo;
function F0(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, du.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Vr = {}, sc;
function z0() {
  if (sc) return Vr;
  sc = 1, Object.defineProperty(Vr, "__esModule", { value: !0 }), Vr.assignDefaults = void 0;
  const e = oe, t = F;
  function r(s, a) {
    const { properties: o, items: c } = s.schema;
    if (a === "object" && o)
      for (const l in o)
        n(s, l, o[l].default);
    else a === "array" && Array.isArray(c) && c.forEach((l, d) => n(s, d, l.default));
  }
  Vr.assignDefaults = r;
  function n(s, a, o) {
    const { gen: c, compositeRule: l, data: d, opts: u } = s;
    if (o === void 0)
      return;
    const h = (0, e._)`${d}${(0, e.getProperty)(a)}`;
    if (l) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let w = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (w = (0, e._)`${w} || ${h} === null || ${h} === ""`), c.if(w, (0, e._)`${h} = ${(0, e.stringify)(o)}`);
  }
  return Vr;
}
var xe = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.validateUnion = ce.validateArray = ce.usePattern = ce.callValidateCode = ce.schemaProperties = ce.allSchemaProperties = ce.noPropertyInData = ce.propertyInData = ce.isOwnProperty = ce.hasPropFunc = ce.reportMissingProp = ce.checkMissingProp = ce.checkReportMissingProp = void 0;
const me = oe, So = F, jt = Ut(), U0 = F;
function q0(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(No(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ce.checkReportMissingProp = q0;
function K0({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((a) => (0, me.and)(No(e, t, a, r.ownProperties), (0, me._)`${s} = ${a}`)));
}
ce.checkMissingProp = K0;
function G0(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ce.reportMissingProp = G0;
function mu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ce.hasPropFunc = mu;
function Po(e, t, r) {
  return (0, me._)`${mu(e)}.call(${t}, ${r})`;
}
ce.isOwnProperty = Po;
function H0(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${Po(e, t, r)}` : s;
}
ce.propertyInData = H0;
function No(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(Po(e, t, r))) : s;
}
ce.noPropertyInData = No;
function pu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ce.allSchemaProperties = pu;
function B0(e, t) {
  return pu(t).filter((r) => !(0, So.alwaysValidSchema)(e, t[r]));
}
ce.schemaProperties = B0;
function W0({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, c, l, d) {
  const u = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [jt.default.instancePath, (0, me.strConcat)(jt.default.instancePath, a)],
    [jt.default.parentData, o.parentData],
    [jt.default.parentDataProperty, o.parentDataProperty],
    [jt.default.rootData, jt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([jt.default.dynamicAnchors, jt.default.dynamicAnchors]);
  const w = (0, me._)`${u}, ${r.object(...h)}`;
  return l !== me.nil ? (0, me._)`${c}.call(${l}, ${w})` : (0, me._)`${c}(${w})`;
}
ce.callValidateCode = W0;
const J0 = (0, me._)`new RegExp`;
function X0({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, me._)`${s.code === "new RegExp" ? J0 : (0, U0.useFunc)(e, s)}(${r}, ${n})`
  });
}
ce.usePattern = X0;
function Y0(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(c) {
    const l = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: So.Type.Num
      }, a), t.if((0, me.not)(a), c);
    });
  }
}
ce.validateArray = Y0;
function Q0(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, So.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, c);
    t.assign(o, (0, me._)`${o} || ${c}`), e.mergeValidEvaluated(u, c) || t.if((0, me.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ce.validateUnion = Q0;
var ac;
function Z0() {
  if (ac) return xe;
  ac = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.validateKeywordUsage = xe.validSchemaType = xe.funcKeywordCode = xe.macroKeywordCode = void 0;
  const e = oe, t = Ut(), r = ce, n = us();
  function s(w, y) {
    const { gen: v, keyword: $, schema: g, parentSchema: m, it: E } = w, P = y.macro.call(E.self, g, m, E), O = d(v, $, P);
    E.opts.validateSchema !== !1 && E.self.validateSchema(P, !0);
    const T = v.name("valid");
    w.subschema({
      schema: P,
      schemaPath: e.nil,
      errSchemaPath: `${E.errSchemaPath}/${$}`,
      topSchemaRef: O,
      compositeRule: !0
    }, T), w.pass(T, () => w.error(!0));
  }
  xe.macroKeywordCode = s;
  function a(w, y) {
    var v;
    const { gen: $, keyword: g, schema: m, parentSchema: E, $data: P, it: O } = w;
    l(O, y);
    const T = !P && y.compile ? y.compile.call(O.self, m, E, O) : y.validate, G = d($, g, T), Y = $.let("valid");
    w.block$data(Y, le), w.ok((v = y.valid) !== null && v !== void 0 ? v : Y);
    function le() {
      if (y.errors === !1)
        K(), y.modifying && o(w), X(() => w.error());
      else {
        const Q = y.async ? fe() : ye();
        y.modifying && o(w), X(() => c(w, Q));
      }
    }
    function fe() {
      const Q = $.let("ruleErrs", null);
      return $.try(() => K((0, e._)`await `), (j) => $.assign(Y, !1).if((0, e._)`${j} instanceof ${O.ValidationError}`, () => $.assign(Q, (0, e._)`${j}.errors`), () => $.throw(j))), Q;
    }
    function ye() {
      const Q = (0, e._)`${G}.errors`;
      return $.assign(Q, null), K(e.nil), Q;
    }
    function K(Q = y.async ? (0, e._)`await ` : e.nil) {
      const j = O.opts.passContext ? t.default.this : t.default.self, D = !("compile" in y && !P || y.schema === !1);
      $.assign(Y, (0, e._)`${Q}${(0, r.callValidateCode)(w, G, j, D)}`, y.modifying);
    }
    function X(Q) {
      var j;
      $.if((0, e.not)((j = y.valid) !== null && j !== void 0 ? j : Y), Q);
    }
  }
  xe.funcKeywordCode = a;
  function o(w) {
    const { gen: y, data: v, it: $ } = w;
    y.if($.parentData, () => y.assign(v, (0, e._)`${$.parentData}[${$.parentDataProperty}]`));
  }
  function c(w, y) {
    const { gen: v } = w;
    v.if((0, e._)`Array.isArray(${y})`, () => {
      v.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${y} : ${t.default.vErrors}.concat(${y})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(w);
    }, () => w.error());
  }
  function l({ schemaEnv: w }, y) {
    if (y.async && !w.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(w, y, v) {
    if (v === void 0)
      throw new Error(`keyword "${y}" failed to compile`);
    return w.scopeValue("keyword", typeof v == "function" ? { ref: v } : { ref: v, code: (0, e.stringify)(v) });
  }
  function u(w, y, v = !1) {
    return !y.length || y.some(($) => $ === "array" ? Array.isArray(w) : $ === "object" ? w && typeof w == "object" && !Array.isArray(w) : typeof w == $ || v && typeof w > "u");
  }
  xe.validSchemaType = u;
  function h({ schema: w, opts: y, self: v, errSchemaPath: $ }, g, m) {
    if (Array.isArray(g.keyword) ? !g.keyword.includes(m) : g.keyword !== m)
      throw new Error("ajv implementation error");
    const E = g.dependencies;
    if (E != null && E.some((P) => !Object.prototype.hasOwnProperty.call(w, P)))
      throw new Error(`parent schema must have dependencies of ${m}: ${E.join(",")}`);
    if (g.validateSchema && !g.validateSchema(w[m])) {
      const O = `keyword "${m}" value is invalid at path "${$}": ` + v.errorsText(g.validateSchema.errors);
      if (y.validateSchema === "log")
        v.logger.error(O);
      else
        throw new Error(O);
    }
  }
  return xe.validateKeywordUsage = h, xe;
}
var vt = {}, oc;
function x0() {
  if (oc) return vt;
  oc = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.extendSubschemaMode = vt.extendSubschemaData = vt.getSubschema = void 0;
  const e = oe, t = F;
  function r(a, { keyword: o, schemaProp: c, schema: l, schemaPath: d, errSchemaPath: u, topSchemaRef: h }) {
    if (o !== void 0 && l !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (o !== void 0) {
      const w = a.schema[o];
      return c === void 0 ? {
        schema: w,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${a.errSchemaPath}/${o}`
      } : {
        schema: w[c],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(o)}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${a.errSchemaPath}/${o}/${(0, t.escapeFragment)(c)}`
      };
    }
    if (l !== void 0) {
      if (d === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: l,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  vt.getSubschema = r;
  function n(a, o, { dataProp: c, dataPropType: l, data: d, dataTypes: u, propertyName: h }) {
    if (d !== void 0 && c !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: w } = o;
    if (c !== void 0) {
      const { errorPath: v, dataPathArr: $, opts: g } = o, m = w.let("data", (0, e._)`${o.data}${(0, e.getProperty)(c)}`, !0);
      y(m), a.errorPath = (0, e.str)`${v}${(0, t.getErrorPath)(c, l, g.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${c}`, a.dataPathArr = [...$, a.parentDataProperty];
    }
    if (d !== void 0) {
      const v = d instanceof e.Name ? d : w.let("data", d, !0);
      y(v), h !== void 0 && (a.propertyName = h);
    }
    u && (a.dataTypes = u);
    function y(v) {
      a.data = v, a.dataLevel = o.dataLevel + 1, a.dataTypes = [], o.definedProperties = /* @__PURE__ */ new Set(), a.parentData = o.data, a.dataNames = [...o.dataNames, v];
    }
  }
  vt.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: o, jtdMetadata: c, compositeRule: l, createErrors: d, allErrors: u }) {
    l !== void 0 && (a.compositeRule = l), d !== void 0 && (a.createErrors = d), u !== void 0 && (a.allErrors = u), a.jtdDiscriminator = o, a.jtdMetadata = c;
  }
  return vt.extendSubschemaMode = s, vt;
}
var Te = {}, yu = { exports: {} }, Ft = yu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Vn(t, n, s, e, "", e);
};
Ft.keywords = {
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
Ft.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ft.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ft.skipKeywords = {
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
function Vn(e, t, r, n, s, a, o, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Ft.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            Vn(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in Ft.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            Vn(e, t, r, h[y], s + "/" + u + "/" + eg(y), a, s, u, n, y);
      } else (u in Ft.keywords || e.allKeys && !(u in Ft.skipKeywords)) && Vn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, c, l, d);
  }
}
function eg(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var tg = yu.exports;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.getSchemaRefs = Te.resolveUrl = Te.normalizeId = Te._getFullPath = Te.getFullPath = Te.inlineRef = void 0;
const rg = F, ng = ns, sg = tg, ag = /* @__PURE__ */ new Set([
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
function og(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ia(e) : t ? $u(e) <= t : !1;
}
Te.inlineRef = og;
const ig = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ia(e) {
  for (const t in e) {
    if (ig.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ia) || typeof r == "object" && ia(r))
      return !0;
  }
  return !1;
}
function $u(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !ag.has(r) && (typeof e[r] == "object" && (0, rg.eachItem)(e[r], (n) => t += $u(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function gu(e, t = "", r) {
  r !== !1 && (t = _r(t));
  const n = e.parse(t);
  return _u(e, n);
}
Te.getFullPath = gu;
function _u(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Te._getFullPath = _u;
const cg = /#\/?$/;
function _r(e) {
  return e ? e.replace(cg, "") : "";
}
Te.normalizeId = _r;
function lg(e, t, r) {
  return r = _r(r), e.resolve(t, r);
}
Te.resolveUrl = lg;
const ug = /^[a-z_][-a-z0-9._]*$/i;
function dg(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = _r(e[r] || t), a = { "": s }, o = gu(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return sg(e, { allKeys: !0 }, (h, w, y, v) => {
    if (v === void 0)
      return;
    const $ = o + w;
    let g = a[v];
    typeof h[r] == "string" && (g = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[w] = g;
    function m(P) {
      const O = this.opts.uriResolver.resolve;
      if (P = _r(g ? O(g, P) : P), l.has(P))
        throw u(P);
      l.add(P);
      let T = this.refs[P];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(h, T.schema, P) : P !== _r($) && (P[0] === "#" ? (d(h, c[P], P), c[P] = h) : this.refs[P] = $), P;
    }
    function E(P) {
      if (typeof P == "string") {
        if (!ug.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), c;
  function d(h, w, y) {
    if (w !== void 0 && !ng(h, w))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Te.getSchemaRefs = dg;
var ic;
function ds() {
  if (ic) return gt;
  ic = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.getData = gt.KeywordCxt = gt.validateFunctionCode = void 0;
  const e = P0(), t = be, r = uu(), n = be, s = z0(), a = Z0(), o = x0(), c = oe, l = Ut(), d = Te, u = F, h = us();
  function w(R) {
    if (T(R) && (Y(R), O(R))) {
      g(R);
      return;
    }
    y(R, () => (0, e.topBoolOrEmptySchema)(R));
  }
  gt.validateFunctionCode = w;
  function y({ gen: R, validateName: I, schema: C, schemaEnv: M, opts: B }, te) {
    B.code.es5 ? R.func(I, (0, c._)`${l.default.data}, ${l.default.valCxt}`, M.$async, () => {
      R.code((0, c._)`"use strict"; ${E(C, B)}`), $(R, B), R.code(te);
    }) : R.func(I, (0, c._)`${l.default.data}, ${v(B)}`, M.$async, () => R.code(E(C, B)).code(te));
  }
  function v(R) {
    return (0, c._)`{${l.default.instancePath}="", ${l.default.parentData}, ${l.default.parentDataProperty}, ${l.default.rootData}=${l.default.data}${R.dynamicRef ? (0, c._)`, ${l.default.dynamicAnchors}={}` : c.nil}}={}`;
  }
  function $(R, I) {
    R.if(l.default.valCxt, () => {
      R.var(l.default.instancePath, (0, c._)`${l.default.valCxt}.${l.default.instancePath}`), R.var(l.default.parentData, (0, c._)`${l.default.valCxt}.${l.default.parentData}`), R.var(l.default.parentDataProperty, (0, c._)`${l.default.valCxt}.${l.default.parentDataProperty}`), R.var(l.default.rootData, (0, c._)`${l.default.valCxt}.${l.default.rootData}`), I.dynamicRef && R.var(l.default.dynamicAnchors, (0, c._)`${l.default.valCxt}.${l.default.dynamicAnchors}`);
    }, () => {
      R.var(l.default.instancePath, (0, c._)`""`), R.var(l.default.parentData, (0, c._)`undefined`), R.var(l.default.parentDataProperty, (0, c._)`undefined`), R.var(l.default.rootData, l.default.data), I.dynamicRef && R.var(l.default.dynamicAnchors, (0, c._)`{}`);
    });
  }
  function g(R) {
    const { schema: I, opts: C, gen: M } = R;
    y(R, () => {
      C.$comment && I.$comment && Q(R), ye(R), M.let(l.default.vErrors, null), M.let(l.default.errors, 0), C.unevaluated && m(R), le(R), j(R);
    });
  }
  function m(R) {
    const { gen: I, validateName: C } = R;
    R.evaluated = I.const("evaluated", (0, c._)`${C}.evaluated`), I.if((0, c._)`${R.evaluated}.dynamicProps`, () => I.assign((0, c._)`${R.evaluated}.props`, (0, c._)`undefined`)), I.if((0, c._)`${R.evaluated}.dynamicItems`, () => I.assign((0, c._)`${R.evaluated}.items`, (0, c._)`undefined`));
  }
  function E(R, I) {
    const C = typeof R == "object" && R[I.schemaId];
    return C && (I.code.source || I.code.process) ? (0, c._)`/*# sourceURL=${C} */` : c.nil;
  }
  function P(R, I) {
    if (T(R) && (Y(R), O(R))) {
      G(R, I);
      return;
    }
    (0, e.boolOrEmptySchema)(R, I);
  }
  function O({ schema: R, self: I }) {
    if (typeof R == "boolean")
      return !R;
    for (const C in R)
      if (I.RULES.all[C])
        return !0;
    return !1;
  }
  function T(R) {
    return typeof R.schema != "boolean";
  }
  function G(R, I) {
    const { schema: C, gen: M, opts: B } = R;
    B.$comment && C.$comment && Q(R), K(R), X(R);
    const te = M.const("_errs", l.default.errors);
    le(R, te), M.var(I, (0, c._)`${te} === ${l.default.errors}`);
  }
  function Y(R) {
    (0, u.checkUnknownRules)(R), fe(R);
  }
  function le(R, I) {
    if (R.opts.jtd)
      return U(R, [], !1, I);
    const C = (0, t.getSchemaTypes)(R.schema), M = (0, t.coerceAndCheckDataType)(R, C);
    U(R, C, !M, I);
  }
  function fe(R) {
    const { schema: I, errSchemaPath: C, opts: M, self: B } = R;
    I.$ref && M.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(I, B.RULES) && B.logger.warn(`$ref: keywords ignored in schema at path "${C}"`);
  }
  function ye(R) {
    const { schema: I, opts: C } = R;
    I.default !== void 0 && C.useDefaults && C.strictSchema && (0, u.checkStrictMode)(R, "default is ignored in the schema root");
  }
  function K(R) {
    const I = R.schema[R.opts.schemaId];
    I && (R.baseId = (0, d.resolveUrl)(R.opts.uriResolver, R.baseId, I));
  }
  function X(R) {
    if (R.schema.$async && !R.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function Q({ gen: R, schemaEnv: I, schema: C, errSchemaPath: M, opts: B }) {
    const te = C.$comment;
    if (B.$comment === !0)
      R.code((0, c._)`${l.default.self}.logger.log(${te})`);
    else if (typeof B.$comment == "function") {
      const ge = (0, c.str)`${M}/$comment`, Le = R.scopeValue("root", { ref: I.root });
      R.code((0, c._)`${l.default.self}.opts.$comment(${te}, ${ge}, ${Le}.schema)`);
    }
  }
  function j(R) {
    const { gen: I, schemaEnv: C, validateName: M, ValidationError: B, opts: te } = R;
    C.$async ? I.if((0, c._)`${l.default.errors} === 0`, () => I.return(l.default.data), () => I.throw((0, c._)`new ${B}(${l.default.vErrors})`)) : (I.assign((0, c._)`${M}.errors`, l.default.vErrors), te.unevaluated && D(R), I.return((0, c._)`${l.default.errors} === 0`));
  }
  function D({ gen: R, evaluated: I, props: C, items: M }) {
    C instanceof c.Name && R.assign((0, c._)`${I}.props`, C), M instanceof c.Name && R.assign((0, c._)`${I}.items`, M);
  }
  function U(R, I, C, M) {
    const { gen: B, schema: te, data: ge, allErrors: Le, opts: Se, self: Pe } = R, { RULES: _e } = Pe;
    if (te.$ref && (Se.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(te, _e))) {
      B.block(() => k(R, "$ref", _e.all.$ref.definition));
      return;
    }
    Se.jtd || W(R, I), B.block(() => {
      for (const je of _e.rules)
        lt(je);
      lt(_e.post);
    });
    function lt(je) {
      (0, r.shouldUseGroup)(te, je) && (je.type ? (B.if((0, n.checkDataType)(je.type, ge, Se.strictNumbers)), V(R, je), I.length === 1 && I[0] === je.type && C && (B.else(), (0, n.reportTypeError)(R)), B.endIf()) : V(R, je), Le || B.if((0, c._)`${l.default.errors} === ${M || 0}`));
    }
  }
  function V(R, I) {
    const { gen: C, schema: M, opts: { useDefaults: B } } = R;
    B && (0, s.assignDefaults)(R, I.type), C.block(() => {
      for (const te of I.rules)
        (0, r.shouldUseRule)(M, te) && k(R, te.keyword, te.definition, I.type);
    });
  }
  function W(R, I) {
    R.schemaEnv.meta || !R.opts.strictTypes || (z(R, I), R.opts.allowUnionTypes || N(R, I), p(R, R.dataTypes));
  }
  function z(R, I) {
    if (I.length) {
      if (!R.dataTypes.length) {
        R.dataTypes = I;
        return;
      }
      I.forEach((C) => {
        _(R.dataTypes, C) || f(R, `type "${C}" not allowed by context "${R.dataTypes.join(",")}"`);
      }), i(R, I);
    }
  }
  function N(R, I) {
    I.length > 1 && !(I.length === 2 && I.includes("null")) && f(R, "use allowUnionTypes to allow union type keyword");
  }
  function p(R, I) {
    const C = R.self.RULES.all;
    for (const M in C) {
      const B = C[M];
      if (typeof B == "object" && (0, r.shouldUseRule)(R.schema, B)) {
        const { type: te } = B.definition;
        te.length && !te.some((ge) => S(I, ge)) && f(R, `missing type "${te.join(",")}" for keyword "${M}"`);
      }
    }
  }
  function S(R, I) {
    return R.includes(I) || I === "number" && R.includes("integer");
  }
  function _(R, I) {
    return R.includes(I) || I === "integer" && R.includes("number");
  }
  function i(R, I) {
    const C = [];
    for (const M of R.dataTypes)
      _(I, M) ? C.push(M) : I.includes("integer") && M === "number" && C.push("integer");
    R.dataTypes = C;
  }
  function f(R, I) {
    const C = R.schemaEnv.baseId + R.errSchemaPath;
    I += ` at "${C}" (strictTypes)`, (0, u.checkStrictMode)(R, I, R.opts.strictTypes);
  }
  class b {
    constructor(I, C, M) {
      if ((0, a.validateKeywordUsage)(I, C, M), this.gen = I.gen, this.allErrors = I.allErrors, this.keyword = M, this.data = I.data, this.schema = I.schema[M], this.$data = C.$data && I.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(I, this.schema, M, this.$data), this.schemaType = C.schemaType, this.parentSchema = I.schema, this.params = {}, this.it = I, this.def = C, this.$data)
        this.schemaCode = I.gen.const("vSchema", q(this.$data, I));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, C.schemaType, C.allowUndefined))
        throw new Error(`${M} value must be ${JSON.stringify(C.schemaType)}`);
      ("code" in C ? C.trackErrors : C.errors !== !1) && (this.errsCount = I.gen.const("_errs", l.default.errors));
    }
    result(I, C, M) {
      this.failResult((0, c.not)(I), C, M);
    }
    failResult(I, C, M) {
      this.gen.if(I), M ? M() : this.error(), C ? (this.gen.else(), C(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(I, C) {
      this.failResult((0, c.not)(I), void 0, C);
    }
    fail(I) {
      if (I === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(I), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(I) {
      if (!this.$data)
        return this.fail(I);
      const { schemaCode: C } = this;
      this.fail((0, c._)`${C} !== undefined && (${(0, c.or)(this.invalid$data(), I)})`);
    }
    error(I, C, M) {
      if (C) {
        this.setParams(C), this._error(I, M), this.setParams({});
        return;
      }
      this._error(I, M);
    }
    _error(I, C) {
      (I ? h.reportExtraError : h.reportError)(this, this.def.error, C);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(I) {
      this.allErrors || this.gen.if(I);
    }
    setParams(I, C) {
      C ? Object.assign(this.params, I) : this.params = I;
    }
    block$data(I, C, M = c.nil) {
      this.gen.block(() => {
        this.check$data(I, M), C();
      });
    }
    check$data(I = c.nil, C = c.nil) {
      if (!this.$data)
        return;
      const { gen: M, schemaCode: B, schemaType: te, def: ge } = this;
      M.if((0, c.or)((0, c._)`${B} === undefined`, C)), I !== c.nil && M.assign(I, !0), (te.length || ge.validateSchema) && (M.elseIf(this.invalid$data()), this.$dataError(), I !== c.nil && M.assign(I, !1)), M.else();
    }
    invalid$data() {
      const { gen: I, schemaCode: C, schemaType: M, def: B, it: te } = this;
      return (0, c.or)(ge(), Le());
      function ge() {
        if (M.length) {
          if (!(C instanceof c.Name))
            throw new Error("ajv implementation error");
          const Se = Array.isArray(M) ? M : [M];
          return (0, c._)`${(0, n.checkDataTypes)(Se, C, te.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return c.nil;
      }
      function Le() {
        if (B.validateSchema) {
          const Se = I.scopeValue("validate$data", { ref: B.validateSchema });
          return (0, c._)`!${Se}(${C})`;
        }
        return c.nil;
      }
    }
    subschema(I, C) {
      const M = (0, o.getSubschema)(this.it, I);
      (0, o.extendSubschemaData)(M, this.it, I), (0, o.extendSubschemaMode)(M, I);
      const B = { ...this.it, ...M, items: void 0, props: void 0 };
      return P(B, C), B;
    }
    mergeEvaluated(I, C) {
      const { it: M, gen: B } = this;
      M.opts.unevaluated && (M.props !== !0 && I.props !== void 0 && (M.props = u.mergeEvaluated.props(B, I.props, M.props, C)), M.items !== !0 && I.items !== void 0 && (M.items = u.mergeEvaluated.items(B, I.items, M.items, C)));
    }
    mergeValidEvaluated(I, C) {
      const { it: M, gen: B } = this;
      if (M.opts.unevaluated && (M.props !== !0 || M.items !== !0))
        return B.if(C, () => this.mergeEvaluated(I, c.Name)), !0;
    }
  }
  gt.KeywordCxt = b;
  function k(R, I, C, M) {
    const B = new b(R, C, I);
    "code" in C ? C.code(B, M) : B.$data && C.validate ? (0, a.funcKeywordCode)(B, C) : "macro" in C ? (0, a.macroKeywordCode)(B, C) : (C.compile || C.validate) && (0, a.funcKeywordCode)(B, C);
  }
  const A = /^\/(?:[^~]|~0|~1)*$/, H = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function q(R, { dataLevel: I, dataNames: C, dataPathArr: M }) {
    let B, te;
    if (R === "")
      return l.default.rootData;
    if (R[0] === "/") {
      if (!A.test(R))
        throw new Error(`Invalid JSON-pointer: ${R}`);
      B = R, te = l.default.rootData;
    } else {
      const Pe = H.exec(R);
      if (!Pe)
        throw new Error(`Invalid JSON-pointer: ${R}`);
      const _e = +Pe[1];
      if (B = Pe[2], B === "#") {
        if (_e >= I)
          throw new Error(Se("property/index", _e));
        return M[I - _e];
      }
      if (_e > I)
        throw new Error(Se("data", _e));
      if (te = C[I - _e], !B)
        return te;
    }
    let ge = te;
    const Le = B.split("/");
    for (const Pe of Le)
      Pe && (te = (0, c._)`${te}${(0, c.getProperty)((0, u.unescapeJsonPointer)(Pe))}`, ge = (0, c._)`${ge} && ${te}`);
    return ge;
    function Se(Pe, _e) {
      return `Cannot access ${Pe} ${_e} levels up, current level is ${I}`;
    }
  }
  return gt.getData = q, gt;
}
var gn = {}, cc;
function Ro() {
  if (cc) return gn;
  cc = 1, Object.defineProperty(gn, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return gn.default = e, gn;
}
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
const Cs = Te;
class fg extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Cs.resolveUrl)(t, r, n), this.missingSchema = (0, Cs.normalizeId)((0, Cs.getFullPath)(t, this.missingRef));
  }
}
Tr.default = fg;
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.resolveSchema = Ge.getCompilingSchema = Ge.resolveRef = Ge.compileSchema = Ge.SchemaEnv = void 0;
const et = oe, hg = Ro(), Jt = Ut(), at = Te, lc = F, mg = ds();
class fs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, at.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ge.SchemaEnv = fs;
function Oo(e) {
  const t = vu.call(this, e);
  if (t)
    return t;
  const r = (0, at.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new et.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: hg.default,
    code: (0, et._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Jt.default.data,
    parentData: Jt.default.parentData,
    parentDataProperty: Jt.default.parentDataProperty,
    dataNames: [Jt.default.data],
    dataPathArr: [et.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, et.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: et.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, et._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, mg.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Jt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${Jt.default.self}`, `${Jt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: l, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: v, items: $ } = d;
      y.evaluated = {
        props: v instanceof et.Name ? void 0 : v,
        items: $ instanceof et.Name ? void 0 : $,
        dynamicProps: v instanceof et.Name,
        dynamicItems: $ instanceof et.Name
      }, y.source && (y.source.evaluated = (0, et.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ge.compileSchema = Oo;
function pg(e, t, r) {
  var n;
  r = (0, at.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = gg.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    o && (a = new fs({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = yg.call(this, a);
}
Ge.resolveRef = pg;
function yg(e) {
  return (0, at.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Oo.call(this, e);
}
function vu(e) {
  for (const t of this._compilations)
    if ($g(t, e))
      return t;
}
Ge.getCompilingSchema = vu;
function $g(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function gg(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || hs.call(this, e, t);
}
function hs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, at._getFullPath)(this.opts.uriResolver, r);
  let s = (0, at.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ds.call(this, r, e);
  const a = (0, at.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const c = hs.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : Ds.call(this, r, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Oo.call(this, o), a === (0, at.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, at.resolveUrl)(this.opts.uriResolver, s, d)), new fs({ schema: c, schemaId: l, root: e, baseId: s });
    }
    return Ds.call(this, r, o);
  }
}
Ge.resolveSchema = hs;
const _g = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ds(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, lc.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !_g.has(c) && d && (t = (0, at.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, lc.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, at.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = hs.call(this, n, c);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new fs({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const vg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", wg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Eg = "object", bg = [
  "$data"
], Sg = {
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
}, Pg = !1, Ng = {
  $id: vg,
  description: wg,
  type: Eg,
  required: bg,
  properties: Sg,
  additionalProperties: Pg
};
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const wu = Hl;
wu.code = 'require("ajv/dist/runtime/uri").default';
Io.default = wu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ds();
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
  const n = Ro(), s = Tr, a = ar, o = Ge, c = oe, l = Te, d = be, u = F, h = Ng, w = Io, y = (N, p) => new RegExp(N, p);
  y.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
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
  ]), g = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function P(N) {
    var p, S, _, i, f, b, k, A, H, q, R, I, C, M, B, te, ge, Le, Se, Pe, _e, lt, je, qt, Kt;
    const Qe = N.strict, Gt = (p = N.code) === null || p === void 0 ? void 0 : p.optimize, Cr = Gt === !0 || Gt === void 0 ? 1 : Gt || 0, Dr = (_ = (S = N.code) === null || S === void 0 ? void 0 : S.regExp) !== null && _ !== void 0 ? _ : y, Es = (i = N.uriResolver) !== null && i !== void 0 ? i : w.default;
    return {
      strictSchema: (b = (f = N.strictSchema) !== null && f !== void 0 ? f : Qe) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (k = N.strictNumbers) !== null && k !== void 0 ? k : Qe) !== null && A !== void 0 ? A : !0,
      strictTypes: (q = (H = N.strictTypes) !== null && H !== void 0 ? H : Qe) !== null && q !== void 0 ? q : "log",
      strictTuples: (I = (R = N.strictTuples) !== null && R !== void 0 ? R : Qe) !== null && I !== void 0 ? I : "log",
      strictRequired: (M = (C = N.strictRequired) !== null && C !== void 0 ? C : Qe) !== null && M !== void 0 ? M : !1,
      code: N.code ? { ...N.code, optimize: Cr, regExp: Dr } : { optimize: Cr, regExp: Dr },
      loopRequired: (B = N.loopRequired) !== null && B !== void 0 ? B : E,
      loopEnum: (te = N.loopEnum) !== null && te !== void 0 ? te : E,
      meta: (ge = N.meta) !== null && ge !== void 0 ? ge : !0,
      messages: (Le = N.messages) !== null && Le !== void 0 ? Le : !0,
      inlineRefs: (Se = N.inlineRefs) !== null && Se !== void 0 ? Se : !0,
      schemaId: (Pe = N.schemaId) !== null && Pe !== void 0 ? Pe : "$id",
      addUsedSchema: (_e = N.addUsedSchema) !== null && _e !== void 0 ? _e : !0,
      validateSchema: (lt = N.validateSchema) !== null && lt !== void 0 ? lt : !0,
      validateFormats: (je = N.validateFormats) !== null && je !== void 0 ? je : !0,
      unicodeRegExp: (qt = N.unicodeRegExp) !== null && qt !== void 0 ? qt : !0,
      int32range: (Kt = N.int32range) !== null && Kt !== void 0 ? Kt : !0,
      uriResolver: Es
    };
  }
  class O {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...P(p) };
      const { es5: S, lines: _ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: $, es5: S, lines: _ }), this.logger = X(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, g, p, "NOT SUPPORTED"), T.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = ye.call(this), p.formats && le.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && fe.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), Y.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: _ } = this.opts;
      let i = h;
      _ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && p && this.addMetaSchema(i, i[_], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let _;
      if (typeof p == "string") {
        if (_ = this.getSchema(p), !_)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        _ = this.compile(p);
      const i = _(S);
      return "$async" in _ || (this.errors = _.errors), i;
    }
    compile(p, S) {
      const _ = this._addSchema(p, S);
      return _.validate || this._compileSchemaEnv(_);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: _ } = this.opts;
      return i.call(this, p, S);
      async function i(q, R) {
        await f.call(this, q.$schema);
        const I = this._addSchema(q, R);
        return I.validate || b.call(this, I);
      }
      async function f(q) {
        q && !this.getSchema(q) && await i.call(this, { $ref: q }, !0);
      }
      async function b(q) {
        try {
          return this._compileSchemaEnv(q);
        } catch (R) {
          if (!(R instanceof s.default))
            throw R;
          return k.call(this, R), await A.call(this, R.missingSchema), b.call(this, q);
        }
      }
      function k({ missingSchema: q, missingRef: R }) {
        if (this.refs[q])
          throw new Error(`AnySchema ${q} is loaded but ${R} cannot be resolved`);
      }
      async function A(q) {
        const R = await H.call(this, q);
        this.refs[q] || await f.call(this, R.$schema), this.refs[q] || this.addSchema(R, q, S);
      }
      async function H(q) {
        const R = this._loading[q];
        if (R)
          return R;
        try {
          return await (this._loading[q] = _(q));
        } finally {
          delete this._loading[q];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, _, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, _, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, l.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, _, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, _ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, _), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let _;
      if (_ = p.$schema, _ !== void 0 && typeof _ != "string")
        throw new Error("$schema must be a string");
      if (_ = _ || this.opts.defaultMeta || this.defaultMeta(), !_)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate(_, p);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = G.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: _ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: _ });
        if (S = o.resolveSchema.call(this, i, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = G.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let _ = p[this.opts.schemaId];
          return _ && (_ = (0, l.normalizeId)(_), delete this.schemas[_], delete this.refs[_]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let _;
      if (typeof p == "string")
        _ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = _);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, _ = S.keyword, Array.isArray(_) && !_.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, _, S), !S)
        return (0, u.eachItem)(_, (f) => D.call(this, f)), this;
      V.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)(_, i.type.length === 0 ? (f) => D.call(this, f, i) : (f) => i.type.forEach((b) => D.call(this, f, i, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const _ of S.rules) {
        const i = _.rules.findIndex((f) => f.keyword === p);
        i >= 0 && _.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: _ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${_}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(p, S) {
      const _ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let b = p;
        for (const k of f)
          b = b[k];
        for (const k in _) {
          const A = _[k];
          if (typeof A != "object")
            continue;
          const { $data: H } = A.definition, q = b[k];
          H && q && (b[k] = z(q));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const _ in p) {
        const i = p[_];
        (!S || S.test(_)) && (typeof i == "string" ? delete p[_] : i && !i.meta && (this._cache.delete(i.schema), delete p[_]));
      }
    }
    _addSchema(p, S, _, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: k } = this.opts;
      if (typeof p == "object")
        b = p[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      _ = (0, l.normalizeId)(b || _);
      const H = l.getSchemaRefs.call(this, p, _);
      return A = new o.SchemaEnv({ schema: p, schemaId: k, meta: S, baseId: _, localRefs: H }), this._cache.set(A.schema, A), f && !_.startsWith("#") && (_ && this._checkUnique(_), this.refs[_] = A), i && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = s.default, e.default = O;
  function T(N, p, S, _ = "error") {
    for (const i in N) {
      const f = i;
      f in p && this.logger[_](`${S}: option ${i}. ${N[f]}`);
    }
  }
  function G(N) {
    return N = (0, l.normalizeId)(N), this.schemas[N] || this.refs[N];
  }
  function Y() {
    const N = this.opts.schemas;
    if (N)
      if (Array.isArray(N))
        this.addSchema(N);
      else
        for (const p in N)
          this.addSchema(N[p], p);
  }
  function le() {
    for (const N in this.opts.formats) {
      const p = this.opts.formats[N];
      p && this.addFormat(N, p);
    }
  }
  function fe(N) {
    if (Array.isArray(N)) {
      this.addVocabulary(N);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in N) {
      const S = N[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function ye() {
    const N = { ...this.opts };
    for (const p of v)
      delete N[p];
    return N;
  }
  const K = { log() {
  }, warn() {
  }, error() {
  } };
  function X(N) {
    if (N === !1)
      return K;
    if (N === void 0)
      return console;
    if (N.log && N.warn && N.error)
      return N;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(N, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(N, (_) => {
      if (S.keywords[_])
        throw new Error(`Keyword ${_} is already defined`);
      if (!Q.test(_))
        throw new Error(`Keyword ${_} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function D(N, p, S) {
    var _;
    const i = p == null ? void 0 : p.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[N] = !0, !p)
      return;
    const k = {
      keyword: N,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, k, p.before) : b.rules.push(k), f.all[N] = k, (_ = p.implements) === null || _ === void 0 || _.forEach((A) => this.addKeyword(A));
  }
  function U(N, p, S) {
    const _ = N.rules.findIndex((i) => i.keyword === S);
    _ >= 0 ? N.rules.splice(_, 0, p) : (N.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function V(N) {
    let { metaSchema: p } = N;
    p !== void 0 && (N.$data && this.opts.$data && (p = z(p)), N.validateSchema = this.compile(p, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function z(N) {
    return { anyOf: [N, W] };
  }
})(su);
var To = {}, jo = {}, ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Rg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ko.default = Rg;
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.callRef = or.getValidate = void 0;
const Og = Tr, uc = ce, Ke = oe, ur = Ut(), dc = Ge, _n = F, Ig = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = dc.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new Og.default(n.opts.uriResolver, s, r);
    if (u instanceof dc.SchemaEnv)
      return w(u);
    return y(u);
    function h() {
      if (a === d)
        return Fn(e, o, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Fn(e, (0, Ke._)`${v}.validate`, d, d.$async);
    }
    function w(v) {
      const $ = Eu(e, v);
      Fn(e, $, v, v.$async);
    }
    function y(v) {
      const $ = t.scopeValue("schema", c.code.source === !0 ? { ref: v, code: (0, Ke.stringify)(v) } : { ref: v }), g = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Ke.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(m), e.ok(g);
    }
  }
};
function Eu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ke._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
or.getValidate = Eu;
function Fn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: c, opts: l } = a, d = l.passContext ? ur.default.this : Ke.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Ke._)`await ${(0, uc.callValidateCode)(e, t, d)}`), y(t), o || s.assign(v, !0);
    }, ($) => {
      s.if((0, Ke._)`!(${$} instanceof ${a.ValidationError})`, () => s.throw($)), w($), o || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, uc.callValidateCode)(e, t, d), () => y(t), () => w(t));
  }
  function w(v) {
    const $ = (0, Ke._)`${v}.errors`;
    s.assign(ur.default.vErrors, (0, Ke._)`${ur.default.vErrors} === null ? ${$} : ${ur.default.vErrors}.concat(${$})`), s.assign(ur.default.errors, (0, Ke._)`${ur.default.vErrors}.length`);
  }
  function y(v) {
    var $;
    if (!a.opts.unevaluated)
      return;
    const g = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (a.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (a.props = _n.mergeEvaluated.props(s, g.props, a.props));
      else {
        const m = s.var("props", (0, Ke._)`${v}.evaluated.props`);
        a.props = _n.mergeEvaluated.props(s, m, a.props, Ke.Name);
      }
    if (a.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (a.items = _n.mergeEvaluated.items(s, g.items, a.items));
      else {
        const m = s.var("items", (0, Ke._)`${v}.evaluated.items`);
        a.items = _n.mergeEvaluated.items(s, m, a.items, Ke.Name);
      }
  }
}
or.callRef = Fn;
or.default = Ig;
Object.defineProperty(jo, "__esModule", { value: !0 });
const Tg = ko, jg = or, kg = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Tg.default,
  jg.default
];
jo.default = kg;
var Ao = {}, Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Xn = oe, kt = Xn.operators, Yn = {
  maximum: { okStr: "<=", ok: kt.LTE, fail: kt.GT },
  minimum: { okStr: ">=", ok: kt.GTE, fail: kt.LT },
  exclusiveMaximum: { okStr: "<", ok: kt.LT, fail: kt.GTE },
  exclusiveMinimum: { okStr: ">", ok: kt.GT, fail: kt.LTE }
}, Ag = {
  message: ({ keyword: e, schemaCode: t }) => (0, Xn.str)`must be ${Yn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Xn._)`{comparison: ${Yn[e].okStr}, limit: ${t}}`
}, Cg = {
  keyword: Object.keys(Yn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Ag,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Xn._)`${r} ${Yn[t].fail} ${n} || isNaN(${r})`);
  }
};
Co.default = Cg;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const Xr = oe, Dg = {
  message: ({ schemaCode: e }) => (0, Xr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Xr._)`{multipleOf: ${e}}`
}, Mg = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Dg,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), c = a ? (0, Xr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Xr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Xr._)`(${n} === 0 || (${o} = ${r}/${n}, ${c}))`);
  }
};
Do.default = Mg;
var Mo = {}, Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
function bu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Lo.default = bu;
bu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Mo, "__esModule", { value: !0 });
const xt = oe, Lg = F, Vg = Lo, Fg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, xt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, xt._)`{limit: ${e}}`
}, zg = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Fg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? xt.operators.GT : xt.operators.LT, o = s.opts.unicode === !1 ? (0, xt._)`${r}.length` : (0, xt._)`${(0, Lg.useFunc)(e.gen, Vg.default)}(${r})`;
    e.fail$data((0, xt._)`${o} ${a} ${n}`);
  }
};
Mo.default = zg;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Ug = ce, Qn = oe, qg = {
  message: ({ schemaCode: e }) => (0, Qn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Qn._)`{pattern: ${e}}`
}, Kg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: qg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Qn._)`(new RegExp(${s}, ${o}))` : (0, Ug.usePattern)(e, n);
    e.fail$data((0, Qn._)`!${c}.test(${t})`);
  }
};
Vo.default = Kg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Yr = oe, Gg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Yr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Yr._)`{limit: ${e}}`
}, Hg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Gg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Yr.operators.GT : Yr.operators.LT;
    e.fail$data((0, Yr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Fo.default = Hg;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const Fr = ce, Qr = oe, Bg = F, Wg = {
  message: ({ params: { missingProperty: e } }) => (0, Qr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Qr._)`{missingProperty: ${e}}`
}, Jg = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Wg,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: c } = o;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (o.allErrors ? d() : u(), c.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const $ of r)
        if ((y == null ? void 0 : y[$]) === void 0 && !v.has($)) {
          const g = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${g}" (strictRequired)`;
          (0, Bg.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(Qr.nil, h);
      else
        for (const y of r)
          (0, Fr.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (l || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => w(y, v)), e.ok(v);
      } else
        t.if((0, Fr.checkMissingProp)(e, r, y)), (0, Fr.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Fr.noPropertyInData)(t, s, y, c.ownProperties), () => e.error());
      });
    }
    function w(y, v) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(v, (0, Fr.propertyInData)(t, s, y, c.ownProperties)), t.if((0, Qr.not)(v), () => {
          e.error(), t.break();
        });
      }, Qr.nil);
    }
  }
};
zo.default = Jg;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const Zr = oe, Xg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Zr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Zr._)`{limit: ${e}}`
}, Yg = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Xg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Zr.operators.GT : Zr.operators.LT;
    e.fail$data((0, Zr._)`${r}.length ${s} ${n}`);
  }
};
Uo.default = Yg;
var qo = {}, on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
const Su = ns;
Su.code = 'require("ajv/dist/runtime/equal").default';
on.default = Su;
Object.defineProperty(qo, "__esModule", { value: !0 });
const Ms = be, Oe = oe, Qg = F, Zg = on, xg = {
  message: ({ params: { i: e, j: t } }) => (0, Oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Oe._)`{i: ${e}, j: ${t}}`
}, e_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: xg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, Ms.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, Oe._)`${o} === false`), e.ok(l);
    function u() {
      const v = t.let("i", (0, Oe._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: v, j: $ }), t.assign(l, !0), t.if((0, Oe._)`${v} > 1`, () => (h() ? w : y)(v, $));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function w(v, $) {
      const g = t.name("item"), m = (0, Ms.checkDataTypes)(d, g, c.opts.strictNumbers, Ms.DataType.Wrong), E = t.const("indices", (0, Oe._)`{}`);
      t.for((0, Oe._)`;${v}--;`, () => {
        t.let(g, (0, Oe._)`${r}[${v}]`), t.if(m, (0, Oe._)`continue`), d.length > 1 && t.if((0, Oe._)`typeof ${g} == "string"`, (0, Oe._)`${g} += "_"`), t.if((0, Oe._)`typeof ${E}[${g}] == "number"`, () => {
          t.assign($, (0, Oe._)`${E}[${g}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Oe._)`${E}[${g}] = ${v}`);
      });
    }
    function y(v, $) {
      const g = (0, Qg.useFunc)(t, Zg.default), m = t.name("outer");
      t.label(m).for((0, Oe._)`;${v}--;`, () => t.for((0, Oe._)`${$} = ${v}; ${$}--;`, () => t.if((0, Oe._)`${g}(${r}[${v}], ${r}[${$}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
qo.default = e_;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const ca = oe, t_ = F, r_ = on, n_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, ca._)`{allowedValue: ${e}}`
}, s_ = {
  keyword: "const",
  $data: !0,
  error: n_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, ca._)`!${(0, t_.useFunc)(t, r_.default)}(${r}, ${s})`) : e.fail((0, ca._)`${a} !== ${r}`);
  }
};
Ko.default = s_;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Kr = oe, a_ = F, o_ = on, i_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Kr._)`{allowedValues: ${e}}`
}, c_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: i_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= o.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, a_.useFunc)(t, o_.default));
    let u;
    if (c || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, Kr.or)(...s.map((v, $) => w(y, $)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, Kr._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function w(y, v) {
      const $ = s[v];
      return typeof $ == "object" && $ !== null ? (0, Kr._)`${d()}(${r}, ${y}[${v}])` : (0, Kr._)`${r} === ${$}`;
    }
  }
};
Go.default = c_;
Object.defineProperty(Ao, "__esModule", { value: !0 });
const l_ = Co, u_ = Do, d_ = Mo, f_ = Vo, h_ = Fo, m_ = zo, p_ = Uo, y_ = qo, $_ = Ko, g_ = Go, __ = [
  // number
  l_.default,
  u_.default,
  // string
  d_.default,
  f_.default,
  // object
  h_.default,
  m_.default,
  // array
  p_.default,
  y_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  $_.default,
  g_.default
];
Ao.default = __;
var Ho = {}, jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.validateAdditionalItems = void 0;
const er = oe, la = F, v_ = {
  message: ({ params: { len: e } }) => (0, er.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, er._)`{limit: ${e}}`
}, w_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: v_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, la.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Pu(e, n);
  }
};
function Pu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const c = r.const("len", (0, er._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, er._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, la.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, er._)`${c} <= ${t.length}`);
    r.if((0, er.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: la.Type.Num }, d), o.allErrors || r.if((0, er.not)(d), () => r.break());
    });
  }
}
jr.validateAdditionalItems = Pu;
jr.default = w_;
var Bo = {}, kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.validateTuple = void 0;
const fc = oe, zn = F, E_ = ce, b_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Nu(e, "additionalItems", t);
    r.items = !0, !(0, zn.alwaysValidSchema)(r, t) && e.ok((0, E_.validateArray)(e));
  }
};
function Nu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = zn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, fc._)`${a}.length`);
  r.forEach((h, w) => {
    (0, zn.alwaysValidSchema)(c, h) || (n.if((0, fc._)`${d} > ${w}`, () => e.subschema({
      keyword: o,
      schemaProp: w,
      dataProp: w
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: w, errSchemaPath: y } = c, v = r.length, $ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (w.strictTuples && !$) {
      const g = `"${o}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, zn.checkStrictMode)(c, g, w.strictTuples);
    }
  }
}
kr.validateTuple = Nu;
kr.default = b_;
Object.defineProperty(Bo, "__esModule", { value: !0 });
const S_ = kr, P_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, S_.validateTuple)(e, "items")
};
Bo.default = P_;
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const hc = oe, N_ = F, R_ = ce, O_ = jr, I_ = {
  message: ({ params: { len: e } }) => (0, hc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, hc._)`{limit: ${e}}`
}, T_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: I_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, N_.alwaysValidSchema)(n, t) && (s ? (0, O_.validateAdditionalItems)(e, s) : e.ok((0, R_.validateArray)(e)));
  }
};
Wo.default = T_;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const Ye = oe, vn = F, j_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye.str)`must contain at least ${e} valid item(s)` : (0, Ye.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye._)`{minContains: ${e}}` : (0, Ye._)`{minContains: ${e}, maxContains: ${t}}`
}, k_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: j_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (o = l === void 0 ? 1 : l, c = d) : o = 1;
    const u = t.const("len", (0, Ye._)`${s}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, vn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, vn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, vn.alwaysValidSchema)(a, r)) {
      let $ = (0, Ye._)`${u} >= ${o}`;
      c !== void 0 && ($ = (0, Ye._)`${$} && ${u} <= ${c}`), e.pass($);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && o === 1 ? y(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, Ye._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const $ = t.name("_valid"), g = t.let("count", 0);
      y($, () => t.if($, () => v(g)));
    }
    function y($, g) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: vn.Type.Num,
          compositeRule: !0
        }, $), g();
      });
    }
    function v($) {
      t.code((0, Ye._)`${$}++`), c === void 0 ? t.if((0, Ye._)`${$} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, Ye._)`${$} > ${c}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, Ye._)`${$} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Jo.default = k_;
var Ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = F, n = ce;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(l) {
      const [d, u] = a(l);
      o(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(l[h]) ? d : u;
      w[h] = l[h];
    }
    return [d, u];
  }
  function o(l, d = l.schema) {
    const { gen: u, data: h, it: w } = l;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const v in d) {
      const $ = d[v];
      if ($.length === 0)
        continue;
      const g = (0, n.propertyInData)(u, h, v, w.opts.ownProperties);
      l.setParams({
        property: v,
        depsCount: $.length,
        deps: $.join(", ")
      }), w.allErrors ? u.if(g, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(l, m);
      }) : (u.if((0, t._)`${g} && (${(0, n.checkMissingProp)(l, $, y)})`), (0, n.reportMissingProp)(l, y), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: w, it: y } = l, v = u.name("valid");
    for (const $ in d)
      (0, r.alwaysValidSchema)(y, d[$]) || (u.if(
        (0, n.propertyInData)(u, h, $, y.opts.ownProperties),
        () => {
          const g = l.subschema({ keyword: w, schemaProp: $ }, v);
          l.mergeValidEvaluated(g, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), l.ok(v));
  }
  e.validateSchemaDeps = c, e.default = s;
})(Ru);
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const Ou = oe, A_ = F, C_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Ou._)`{propertyName: ${e.propertyName}}`
}, D_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: C_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, A_.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Ou.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Xo.default = D_;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
const wn = ce, rt = oe, M_ = Ut(), En = F, L_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, rt._)`{additionalProperty: ${e.additionalProperty}}`
}, V_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: L_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, En.alwaysValidSchema)(o, r))
      return;
    const d = (0, wn.allSchemaProperties)(n.properties), u = (0, wn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, rt._)`${a} === ${M_.default.errors}`);
    function h() {
      t.forIn("key", s, (g) => {
        !d.length && !u.length ? v(g) : t.if(w(g), () => v(g));
      });
    }
    function w(g) {
      let m;
      if (d.length > 8) {
        const E = (0, En.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, wn.isOwnProperty)(t, E, g);
      } else d.length ? m = (0, rt.or)(...d.map((E) => (0, rt._)`${g} === ${E}`)) : m = rt.nil;
      return u.length && (m = (0, rt.or)(m, ...u.map((E) => (0, rt._)`${(0, wn.usePattern)(e, E)}.test(${g})`))), (0, rt.not)(m);
    }
    function y(g) {
      t.code((0, rt._)`delete ${s}[${g}]`);
    }
    function v(g) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        y(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, En.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? ($(g, m, !1), t.if((0, rt.not)(m), () => {
          e.reset(), y(g);
        })) : ($(g, m), c || t.if((0, rt.not)(m), () => t.break()));
      }
    }
    function $(g, m, E) {
      const P = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: En.Type.Str
      };
      E === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
ms.default = V_;
var Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
const F_ = ds(), mc = ce, Ls = F, pc = ms, z_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && pc.default.code(new F_.KeywordCxt(a, pc.default, "additionalProperties"));
    const o = (0, mc.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = Ls.mergeEvaluated.props(t, (0, Ls.toHash)(o), a.props));
    const c = o.filter((h) => !(0, Ls.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, mc.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Yo.default = z_;
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
const yc = ce, bn = oe, $c = F, gc = F, U_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, c = (0, yc.allSchemaProperties)(r), l = c.filter(($) => (0, $c.alwaysValidSchema)(a, r[$]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof bn.Name) && (a.props = (0, gc.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const $ of c)
        d && y($), a.allErrors ? v($) : (t.var(u, !0), v($), t.if(u));
    }
    function y($) {
      for (const g in d)
        new RegExp($).test(g) && (0, $c.checkStrictMode)(a, `property ${g} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function v($) {
      t.forIn("key", n, (g) => {
        t.if((0, bn._)`${(0, yc.usePattern)(e, $)}.test(${g})`, () => {
          const m = l.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: g,
            dataPropType: gc.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, bn._)`${h}[${g}]`, !0) : !m && !a.allErrors && t.if((0, bn.not)(u), () => t.break());
        });
      });
    }
  }
};
Qo.default = U_;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const q_ = F, K_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, q_.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Zo.default = K_;
var xo = {};
Object.defineProperty(xo, "__esModule", { value: !0 });
const G_ = ce, H_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: G_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
xo.default = H_;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const Un = oe, B_ = F, W_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Un._)`{passingSchemas: ${e.passing}}`
}, J_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: W_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, B_.alwaysValidSchema)(s, u) ? t.var(l, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, Un._)`${l} && ${o}`).assign(o, !1).assign(c, (0, Un._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, h), w && e.mergeEvaluated(w, Un.Name);
        });
      });
    }
  }
};
ei.default = J_;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
const X_ = F, Y_ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, X_.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
ti.default = Y_;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
const Zn = oe, Iu = F, Q_ = {
  message: ({ params: e }) => (0, Zn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Zn._)`{failingKeyword: ${e.ifClause}}`
}, Z_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Q_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Iu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = _c(n, "then"), a = _c(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, Zn.not)(c), d("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, c);
        t.assign(o, c), e.mergeValidEvaluated(w, o), h ? t.assign(h, (0, Zn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function _c(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Iu.alwaysValidSchema)(e, r);
}
ri.default = Z_;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
const x_ = F, ev = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, x_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ni.default = ev;
Object.defineProperty(Ho, "__esModule", { value: !0 });
const tv = jr, rv = Bo, nv = kr, sv = Wo, av = Jo, ov = Ru, iv = Xo, cv = ms, lv = Yo, uv = Qo, dv = Zo, fv = xo, hv = ei, mv = ti, pv = ri, yv = ni;
function $v(e = !1) {
  const t = [
    // any
    dv.default,
    fv.default,
    hv.default,
    mv.default,
    pv.default,
    yv.default,
    // object
    iv.default,
    cv.default,
    ov.default,
    lv.default,
    uv.default
  ];
  return e ? t.push(rv.default, sv.default) : t.push(tv.default, nv.default), t.push(av.default), t;
}
Ho.default = $v;
var si = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const we = oe, gv = {
  message: ({ schemaCode: e }) => (0, we.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, we._)`{format: ${e}}`
}, _v = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: gv,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? w() : y();
    function w() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), $ = r.const("fDef", (0, we._)`${v}[${o}]`), g = r.let("fType"), m = r.let("format");
      r.if((0, we._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(g, (0, we._)`${$}.type || "string"`).assign(m, (0, we._)`${$}.validate`), () => r.assign(g, (0, we._)`"string"`).assign(m, $)), e.fail$data((0, we.or)(E(), P()));
      function E() {
        return l.strictSchema === !1 ? we.nil : (0, we._)`${o} && !${m}`;
      }
      function P() {
        const O = u.$async ? (0, we._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, we._)`${m}(${n})`, T = (0, we._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${n}))`;
        return (0, we._)`${m} && ${m} !== true && ${g} === ${t} && !${T}`;
      }
    }
    function y() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [$, g, m] = P(v);
      $ === t && e.pass(O());
      function E() {
        if (l.strictSchema === !1) {
          h.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function P(T) {
        const G = T instanceof RegExp ? (0, we.regexpCode)(T) : l.code.formats ? (0, we._)`${l.code.formats}${(0, we.getProperty)(a)}` : void 0, Y = r.scopeValue("formats", { key: a, ref: T, code: G });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, we._)`${Y}.validate`] : ["string", T, Y];
      }
      function O() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, we._)`await ${m}(${n})`;
        }
        return typeof g == "function" ? (0, we._)`${m}(${n})` : (0, we._)`${m}.test(${n})`;
      }
    }
  }
};
ai.default = _v;
Object.defineProperty(si, "__esModule", { value: !0 });
const vv = ai, wv = [vv.default];
si.default = wv;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.contentVocabulary = Sr.metadataVocabulary = void 0;
Sr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Sr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(To, "__esModule", { value: !0 });
const Ev = jo, bv = Ao, Sv = Ho, Pv = si, vc = Sr, Nv = [
  Ev.default,
  bv.default,
  (0, Sv.default)(),
  Pv.default,
  vc.metadataVocabulary,
  vc.contentVocabulary
];
To.default = Nv;
var oi = {}, ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.DiscrError = void 0;
var wc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(wc || (ps.DiscrError = wc = {}));
Object.defineProperty(oi, "__esModule", { value: !0 });
const hr = oe, ua = ps, Ec = Ge, Rv = Tr, Ov = F, Iv = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ua.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Tv = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Iv,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, hr._)`${r}${(0, hr.getProperty)(c)}`);
    t.if((0, hr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: ua.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const y = w();
      t.if(!1);
      for (const v in y)
        t.elseIf((0, hr._)`${d} === ${v}`), t.assign(l, h(y[v]));
      t.else(), e.error(!1, { discrError: ua.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
    }
    function h(y) {
      const v = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: y }, v);
      return e.mergeEvaluated($, hr.Name), v;
    }
    function w() {
      var y;
      const v = {}, $ = m(s);
      let g = !0;
      for (let O = 0; O < o.length; O++) {
        let T = o[O];
        if (T != null && T.$ref && !(0, Ov.schemaHasRulesButRef)(T, a.self.RULES)) {
          const Y = T.$ref;
          if (T = Ec.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, Y), T instanceof Ec.SchemaEnv && (T = T.schema), T === void 0)
            throw new Rv.default(a.opts.uriResolver, a.baseId, Y);
        }
        const G = (y = T == null ? void 0 : T.properties) === null || y === void 0 ? void 0 : y[c];
        if (typeof G != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        g = g && ($ || m(T)), E(G, O);
      }
      if (!g)
        throw new Error(`discriminator: "${c}" must be required`);
      return v;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(c);
      }
      function E(O, T) {
        if (O.const)
          P(O.const, T);
        else if (O.enum)
          for (const G of O.enum)
            P(G, T);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function P(O, T) {
        if (typeof O != "string" || O in v)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        v[O] = T;
      }
    }
  }
};
oi.default = Tv;
const jv = "http://json-schema.org/draft-07/schema#", kv = "http://json-schema.org/draft-07/schema#", Av = "Core schema meta-schema", Cv = {
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
}, Dv = [
  "object",
  "boolean"
], Mv = {
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
}, Lv = {
  $schema: jv,
  $id: kv,
  title: Av,
  definitions: Cv,
  type: Dv,
  properties: Mv,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = su, n = To, s = oi, a = Lv, o = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(v, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var d = ds();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
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
  var h = Ro();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = Tr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(na, na.exports);
var Vv = na.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Vv, r = oe, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: c, schemaCode: l }) => (0, r.str)`should be ${s[c].okStr} ${l}`,
    params: ({ keyword: c, schemaCode: l }) => (0, r._)`{comparison: ${s[c].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(c) {
      const { gen: l, data: d, schemaCode: u, keyword: h, it: w } = c, { opts: y, self: v } = w;
      if (!y.validateFormats)
        return;
      const $ = new t.KeywordCxt(w, v.RULES.all.format.definition, "format");
      $.$data ? g() : m();
      function g() {
        const P = l.scopeValue("formats", {
          ref: v.formats,
          code: y.code.formats
        }), O = l.const("fmt", (0, r._)`${P}[${$.schemaCode}]`);
        c.fail$data((0, r.or)((0, r._)`typeof ${O} != "object"`, (0, r._)`${O} instanceof RegExp`, (0, r._)`typeof ${O}.compare != "function"`, E(O)));
      }
      function m() {
        const P = $.schema, O = v.formats[P];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${h}": format "${P}" does not define "compare" function`);
        const T = l.scopeValue("formats", {
          key: P,
          ref: O,
          code: y.code.formats ? (0, r._)`${y.code.formats}${(0, r.getProperty)(P)}` : void 0
        });
        c.fail$data(E(T));
      }
      function E(P) {
        return (0, r._)`${P}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (c) => (c.addKeyword(e.formatLimitDefinition), c);
  e.default = o;
})(nu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = ru, n = nu, s = oe, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), c = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return l(d, u, r.fullFormats, a), d;
    const [h, w] = u.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], y = u.formats || r.formatNames;
    return l(d, y, h, w), u.keywords && (0, n.default)(d), d;
  };
  c.get = (d, u = "full") => {
    const w = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!w)
      throw new Error(`Unknown format "${d}"`);
    return w;
  };
  function l(d, u, h, w) {
    var y, v;
    (y = (v = d.opts.code).formats) !== null && y !== void 0 || (v.formats = (0, s._)`require("ajv-formats/dist/formats").${w}`);
    for (const $ of u)
      d.addFormat($, h[$]);
  }
  e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
})(ra, ra.exports);
var Fv = ra.exports;
const zv = /* @__PURE__ */ rl(Fv), Uv = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !qv(s, a) && n || Object.defineProperty(e, r, a);
}, qv = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Kv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Gv = (e, t) => `/* Wrapped ${e}*/
${t}`, Hv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Bv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Wv = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = Gv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", Bv);
  const { writable: a, enumerable: o, configurable: c } = Hv;
  Object.defineProperty(e, "toString", { value: s, writable: a, enumerable: o, configurable: c });
};
function Jv(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    Uv(e, t, s, r);
  return Kv(e, t), Wv(e, t, n), e;
}
const bc = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: s = !1,
    after: a = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!s && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, c, l;
  const d = function(...u) {
    const h = this, w = () => {
      o = void 0, c && (clearTimeout(c), c = void 0), a && (l = e.apply(h, u));
    }, y = () => {
      c = void 0, o && (clearTimeout(o), o = void 0), a && (l = e.apply(h, u));
    }, v = s && !o;
    return clearTimeout(o), o = setTimeout(w, r), n > 0 && n !== Number.POSITIVE_INFINITY && !c && (c = setTimeout(y, n)), v && (l = e.apply(h, u)), l;
  };
  return Jv(d, e), d.cancel = () => {
    o && (clearTimeout(o), o = void 0), c && (clearTimeout(c), c = void 0);
  }, d;
};
var da = { exports: {} };
const Xv = "2.0.0", Tu = 256, Yv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Qv = 16, Zv = Tu - 6, xv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ys = {
  MAX_LENGTH: Tu,
  MAX_SAFE_COMPONENT_LENGTH: Qv,
  MAX_SAFE_BUILD_LENGTH: Zv,
  MAX_SAFE_INTEGER: Yv,
  RELEASE_TYPES: xv,
  SEMVER_SPEC_VERSION: Xv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const ew = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var $s = ew;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = ys, a = $s;
  t = e.exports = {};
  const o = t.re = [], c = t.safeRe = [], l = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const w = "[a-zA-Z0-9-]", y = [
    ["\\s", 1],
    ["\\d", s],
    [w, n]
  ], v = (g) => {
    for (const [m, E] of y)
      g = g.split(`${m}*`).join(`${m}{0,${E}}`).split(`${m}+`).join(`${m}{1,${E}}`);
    return g;
  }, $ = (g, m, E) => {
    const P = v(m), O = h++;
    a(g, O, m), u[g] = O, l[O] = m, d[O] = P, o[O] = new RegExp(m, E ? "g" : void 0), c[O] = new RegExp(P, E ? "g" : void 0);
  };
  $("NUMERICIDENTIFIER", "0|[1-9]\\d*"), $("NUMERICIDENTIFIERLOOSE", "\\d+"), $("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${w}*`), $("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), $("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASEIDENTIFIER", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIER]})`), $("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), $("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), $("BUILDIDENTIFIER", `${w}+`), $("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), $("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), $("FULL", `^${l[u.FULLPLAIN]}$`), $("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), $("LOOSE", `^${l[u.LOOSEPLAIN]}$`), $("GTLT", "((?:<|>)?=?)"), $("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), $("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), $("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), $("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), $("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), $("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), $("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), $("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), $("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), $("COERCERTL", l[u.COERCE], !0), $("COERCERTLFULL", l[u.COERCEFULL], !0), $("LONETILDE", "(?:~>?)"), $("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", $("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), $("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), $("LONECARET", "(?:\\^)"), $("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", $("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), $("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), $("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), $("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), $("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", $("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), $("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), $("STAR", "(<|>)?=?\\s*\\*"), $("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), $("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(da, da.exports);
var cn = da.exports;
const tw = Object.freeze({ loose: !0 }), rw = Object.freeze({}), nw = (e) => e ? typeof e != "object" ? tw : e : rw;
var ii = nw;
const Sc = /^[0-9]+$/, ju = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Sc.test(e), n = Sc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, sw = (e, t) => ju(t, e);
var ku = {
  compareIdentifiers: ju,
  rcompareIdentifiers: sw
};
const Sn = $s, { MAX_LENGTH: Pc, MAX_SAFE_INTEGER: Pn } = ys, { safeRe: Nn, t: Rn } = cn, aw = ii, { compareIdentifiers: Vs } = ku;
let ow = class dt {
  constructor(t, r) {
    if (r = aw(r), t instanceof dt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Pc)
      throw new TypeError(
        `version is longer than ${Pc} characters`
      );
    Sn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Nn[Rn.LOOSE] : Nn[Rn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Pn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Pn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Pn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Pn)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Sn("SemVer.compare", this.version, this.options, t), !(t instanceof dt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new dt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof dt || (t = new dt(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof dt || (t = new dt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (Sn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Vs(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof dt || (t = new dt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Sn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Vs(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Nn[Rn.PRERELEASELOOSE] : Nn[Rn.PRERELEASE]);
        if (!s || s[1] !== r)
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
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), Vs(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ze = ow;
const Nc = ze, iw = (e, t, r = !1) => {
  if (e instanceof Nc)
    return e;
  try {
    return new Nc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ar = iw;
const cw = Ar, lw = (e, t) => {
  const r = cw(e, t);
  return r ? r.version : null;
};
var uw = lw;
const dw = Ar, fw = (e, t) => {
  const r = dw(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var hw = fw;
const Rc = ze, mw = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Rc(
      e instanceof Rc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var pw = mw;
const Oc = Ar, yw = (e, t) => {
  const r = Oc(e, null, !0), n = Oc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, c = a ? n : r, l = !!o.prerelease.length;
  if (!!c.prerelease.length && !l) {
    if (!c.patch && !c.minor)
      return "major";
    if (c.compareMain(o) === 0)
      return c.minor && !c.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var $w = yw;
const gw = ze, _w = (e, t) => new gw(e, t).major;
var vw = _w;
const ww = ze, Ew = (e, t) => new ww(e, t).minor;
var bw = Ew;
const Sw = ze, Pw = (e, t) => new Sw(e, t).patch;
var Nw = Pw;
const Rw = Ar, Ow = (e, t) => {
  const r = Rw(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Iw = Ow;
const Ic = ze, Tw = (e, t, r) => new Ic(e, r).compare(new Ic(t, r));
var it = Tw;
const jw = it, kw = (e, t, r) => jw(t, e, r);
var Aw = kw;
const Cw = it, Dw = (e, t) => Cw(e, t, !0);
var Mw = Dw;
const Tc = ze, Lw = (e, t, r) => {
  const n = new Tc(e, r), s = new Tc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ci = Lw;
const Vw = ci, Fw = (e, t) => e.sort((r, n) => Vw(r, n, t));
var zw = Fw;
const Uw = ci, qw = (e, t) => e.sort((r, n) => Uw(n, r, t));
var Kw = qw;
const Gw = it, Hw = (e, t, r) => Gw(e, t, r) > 0;
var gs = Hw;
const Bw = it, Ww = (e, t, r) => Bw(e, t, r) < 0;
var li = Ww;
const Jw = it, Xw = (e, t, r) => Jw(e, t, r) === 0;
var Au = Xw;
const Yw = it, Qw = (e, t, r) => Yw(e, t, r) !== 0;
var Cu = Qw;
const Zw = it, xw = (e, t, r) => Zw(e, t, r) >= 0;
var ui = xw;
const eE = it, tE = (e, t, r) => eE(e, t, r) <= 0;
var di = tE;
const rE = Au, nE = Cu, sE = gs, aE = ui, oE = li, iE = di, cE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return rE(e, r, n);
    case "!=":
      return nE(e, r, n);
    case ">":
      return sE(e, r, n);
    case ">=":
      return aE(e, r, n);
    case "<":
      return oE(e, r, n);
    case "<=":
      return iE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Du = cE;
const lE = ze, uE = Ar, { safeRe: On, t: In } = cn, dE = (e, t) => {
  if (e instanceof lE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? On[In.COERCEFULL] : On[In.COERCE]);
  else {
    const l = t.includePrerelease ? On[In.COERCERTLFULL] : On[In.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", c = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return uE(`${n}.${s}.${a}${o}${c}`, t);
};
var fE = dE;
class hE {
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
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var mE = hE, Fs, jc;
function ct() {
  if (jc) return Fs;
  jc = 1;
  const e = /\s+/g;
  class t {
    constructor(D, U) {
      if (U = s(U), D instanceof t)
        return D.loose === !!U.loose && D.includePrerelease === !!U.includePrerelease ? D : new t(D.raw, U);
      if (D instanceof a)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((V) => this.parseRange(V.trim())).filter((V) => V.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const V = this.set[0];
        if (this.set = this.set.filter((W) => !$(W[0])), this.set.length === 0)
          this.set = [V];
        else if (this.set.length > 1) {
          for (const W of this.set)
            if (W.length === 1 && g(W[0])) {
              this.set = [W];
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
          const U = this.set[D];
          for (let V = 0; V < U.length; V++)
            V > 0 && (this.formatted += " "), this.formatted += U[V].toString().trim();
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
      const V = ((this.options.includePrerelease && y) | (this.options.loose && v)) + ":" + D, W = n.get(V);
      if (W)
        return W;
      const z = this.options.loose, N = z ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      D = D.replace(N, X(this.options.includePrerelease)), o("hyphen replace", D), D = D.replace(l[d.COMPARATORTRIM], u), o("comparator trim", D), D = D.replace(l[d.TILDETRIM], h), o("tilde trim", D), D = D.replace(l[d.CARETTRIM], w), o("caret trim", D);
      let p = D.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => K(f, this.options));
      z && (p = p.filter((f) => (o("loose invalid filter", f, this.options), !!f.match(l[d.COMPARATORLOOSE])))), o("range list", p);
      const S = /* @__PURE__ */ new Map(), _ = p.map((f) => new a(f, this.options));
      for (const f of _) {
        if ($(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const i = [...S.values()];
      return n.set(V, i), i;
    }
    intersects(D, U) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((V) => m(V, U) && D.set.some((W) => m(W, U) && V.every((z) => W.every((N) => z.intersects(N, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new c(D, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (Q(this.set[U], D, this.options))
          return !0;
      return !1;
    }
  }
  Fs = t;
  const r = mE, n = new r(), s = ii, a = _s(), o = $s, c = ze, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: w
  } = cn, { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: v } = ys, $ = (j) => j.value === "<0.0.0-0", g = (j) => j.value === "", m = (j, D) => {
    let U = !0;
    const V = j.slice();
    let W = V.pop();
    for (; U && V.length; )
      U = V.every((z) => W.intersects(z, D)), W = V.pop();
    return U;
  }, E = (j, D) => (j = j.replace(l[d.BUILD], ""), o("comp", j, D), j = G(j, D), o("caret", j), j = O(j, D), o("tildes", j), j = le(j, D), o("xrange", j), j = ye(j, D), o("stars", j), j), P = (j) => !j || j.toLowerCase() === "x" || j === "*", O = (j, D) => j.trim().split(/\s+/).map((U) => T(U, D)).join(" "), T = (j, D) => {
    const U = D.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return j.replace(U, (V, W, z, N, p) => {
      o("tilde", j, V, W, z, N, p);
      let S;
      return P(W) ? S = "" : P(z) ? S = `>=${W}.0.0 <${+W + 1}.0.0-0` : P(N) ? S = `>=${W}.${z}.0 <${W}.${+z + 1}.0-0` : p ? (o("replaceTilde pr", p), S = `>=${W}.${z}.${N}-${p} <${W}.${+z + 1}.0-0`) : S = `>=${W}.${z}.${N} <${W}.${+z + 1}.0-0`, o("tilde return", S), S;
    });
  }, G = (j, D) => j.trim().split(/\s+/).map((U) => Y(U, D)).join(" "), Y = (j, D) => {
    o("caret", j, D);
    const U = D.loose ? l[d.CARETLOOSE] : l[d.CARET], V = D.includePrerelease ? "-0" : "";
    return j.replace(U, (W, z, N, p, S) => {
      o("caret", j, W, z, N, p, S);
      let _;
      return P(z) ? _ = "" : P(N) ? _ = `>=${z}.0.0${V} <${+z + 1}.0.0-0` : P(p) ? z === "0" ? _ = `>=${z}.${N}.0${V} <${z}.${+N + 1}.0-0` : _ = `>=${z}.${N}.0${V} <${+z + 1}.0.0-0` : S ? (o("replaceCaret pr", S), z === "0" ? N === "0" ? _ = `>=${z}.${N}.${p}-${S} <${z}.${N}.${+p + 1}-0` : _ = `>=${z}.${N}.${p}-${S} <${z}.${+N + 1}.0-0` : _ = `>=${z}.${N}.${p}-${S} <${+z + 1}.0.0-0`) : (o("no pr"), z === "0" ? N === "0" ? _ = `>=${z}.${N}.${p}${V} <${z}.${N}.${+p + 1}-0` : _ = `>=${z}.${N}.${p}${V} <${z}.${+N + 1}.0-0` : _ = `>=${z}.${N}.${p} <${+z + 1}.0.0-0`), o("caret return", _), _;
    });
  }, le = (j, D) => (o("replaceXRanges", j, D), j.split(/\s+/).map((U) => fe(U, D)).join(" ")), fe = (j, D) => {
    j = j.trim();
    const U = D.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return j.replace(U, (V, W, z, N, p, S) => {
      o("xRange", j, V, W, z, N, p, S);
      const _ = P(z), i = _ || P(N), f = i || P(p), b = f;
      return W === "=" && b && (W = ""), S = D.includePrerelease ? "-0" : "", _ ? W === ">" || W === "<" ? V = "<0.0.0-0" : V = "*" : W && b ? (i && (N = 0), p = 0, W === ">" ? (W = ">=", i ? (z = +z + 1, N = 0, p = 0) : (N = +N + 1, p = 0)) : W === "<=" && (W = "<", i ? z = +z + 1 : N = +N + 1), W === "<" && (S = "-0"), V = `${W + z}.${N}.${p}${S}`) : i ? V = `>=${z}.0.0${S} <${+z + 1}.0.0-0` : f && (V = `>=${z}.${N}.0${S} <${z}.${+N + 1}.0-0`), o("xRange return", V), V;
    });
  }, ye = (j, D) => (o("replaceStars", j, D), j.trim().replace(l[d.STAR], "")), K = (j, D) => (o("replaceGTE0", j, D), j.trim().replace(l[D.includePrerelease ? d.GTE0PRE : d.GTE0], "")), X = (j) => (D, U, V, W, z, N, p, S, _, i, f, b) => (P(V) ? U = "" : P(W) ? U = `>=${V}.0.0${j ? "-0" : ""}` : P(z) ? U = `>=${V}.${W}.0${j ? "-0" : ""}` : N ? U = `>=${U}` : U = `>=${U}${j ? "-0" : ""}`, P(_) ? S = "" : P(i) ? S = `<${+_ + 1}.0.0-0` : P(f) ? S = `<${_}.${+i + 1}.0-0` : b ? S = `<=${_}.${i}.${f}-${b}` : j ? S = `<${_}.${i}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), Q = (j, D, U) => {
    for (let V = 0; V < j.length; V++)
      if (!j[V].test(D))
        return !1;
    if (D.prerelease.length && !U.includePrerelease) {
      for (let V = 0; V < j.length; V++)
        if (o(j[V].semver), j[V].semver !== a.ANY && j[V].semver.prerelease.length > 0) {
          const W = j[V].semver;
          if (W.major === D.major && W.minor === D.minor && W.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Fs;
}
var zs, kc;
function _s() {
  if (kc) return zs;
  kc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, h) {
      if (h = r(h), u instanceof t) {
        if (u.loose === !!h.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), o("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], w = u.match(h);
      if (!w)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = w[1] !== void 0 ? w[1] : "", this.operator === "=" && (this.operator = ""), w[2] ? this.semver = new c(w[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new c(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  zs = t;
  const r = ii, { safeRe: n, t: s } = cn, a = Du, o = $s, c = ze, l = ct();
  return zs;
}
const pE = ct(), yE = (e, t, r) => {
  try {
    t = new pE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var vs = yE;
const $E = ct(), gE = (e, t) => new $E(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var _E = gE;
const vE = ze, wE = ct(), EE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new wE(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new vE(n, r));
  }), n;
};
var bE = EE;
const SE = ze, PE = ct(), NE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new PE(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new SE(n, r));
  }), n;
};
var RE = NE;
const Us = ze, OE = ct(), Ac = gs, IE = (e, t) => {
  e = new OE(e, t);
  let r = new Us("0.0.0");
  if (e.test(r) || (r = new Us("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((o) => {
      const c = new Us(o.semver.version);
      switch (o.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!a || Ac(c, a)) && (a = c);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || Ac(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var TE = IE;
const jE = ct(), kE = (e, t) => {
  try {
    return new jE(e, t).range || "*";
  } catch {
    return null;
  }
};
var AE = kE;
const CE = ze, Mu = _s(), { ANY: DE } = Mu, ME = ct(), LE = vs, Cc = gs, Dc = li, VE = di, FE = ui, zE = (e, t, r, n) => {
  e = new CE(e, n), t = new ME(t, n);
  let s, a, o, c, l;
  switch (r) {
    case ">":
      s = Cc, a = VE, o = Dc, c = ">", l = ">=";
      break;
    case "<":
      s = Dc, a = FE, o = Cc, c = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (LE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, w = null;
    if (u.forEach((y) => {
      y.semver === DE && (y = new Mu(">=0.0.0")), h = h || y, w = w || y, s(y.semver, h.semver, n) ? h = y : o(y.semver, w.semver, n) && (w = y);
    }), h.operator === c || h.operator === l || (!w.operator || w.operator === c) && a(e, w.semver))
      return !1;
    if (w.operator === l && o(e, w.semver))
      return !1;
  }
  return !0;
};
var fi = zE;
const UE = fi, qE = (e, t, r) => UE(e, t, ">", r);
var KE = qE;
const GE = fi, HE = (e, t, r) => GE(e, t, "<", r);
var BE = HE;
const Mc = ct(), WE = (e, t, r) => (e = new Mc(e, r), t = new Mc(t, r), e.intersects(t, r));
var JE = WE;
const XE = vs, YE = it;
var QE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const o = e.sort((u, h) => YE(u, h, r));
  for (const u of o)
    XE(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const c = [];
  for (const [u, h] of n)
    u === h ? c.push(u) : !h && u === o[0] ? c.push("*") : h ? u === o[0] ? c.push(`<=${h}`) : c.push(`${u} - ${h}`) : c.push(`>=${u}`);
  const l = c.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const Lc = ct(), hi = _s(), { ANY: qs } = hi, zr = vs, mi = it, ZE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Lc(e, r), t = new Lc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const o = eb(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, xE = [new hi(">=0.0.0-0")], Vc = [new hi(">=0.0.0")], eb = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === qs) {
    if (t.length === 1 && t[0].semver === qs)
      return !0;
    r.includePrerelease ? e = xE : e = Vc;
  }
  if (t.length === 1 && t[0].semver === qs) {
    if (r.includePrerelease)
      return !0;
    t = Vc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const y of e)
    y.operator === ">" || y.operator === ">=" ? s = Fc(s, y, r) : y.operator === "<" || y.operator === "<=" ? a = zc(a, y, r) : n.add(y.semver);
  if (n.size > 1)
    return null;
  let o;
  if (s && a) {
    if (o = mi(s.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const y of n) {
    if (s && !zr(y, String(s), r) || a && !zr(y, String(a), r))
      return null;
    for (const v of t)
      if (!zr(y, String(v), r))
        return !1;
    return !0;
  }
  let c, l, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, w = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const y of t) {
    if (u = u || y.operator === ">" || y.operator === ">=", d = d || y.operator === "<" || y.operator === "<=", s) {
      if (w && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === w.major && y.semver.minor === w.minor && y.semver.patch === w.patch && (w = !1), y.operator === ">" || y.operator === ">=") {
        if (c = Fc(s, y, r), c === y && c !== s)
          return !1;
      } else if (s.operator === ">=" && !zr(s.semver, String(y), r))
        return !1;
    }
    if (a) {
      if (h && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === h.major && y.semver.minor === h.minor && y.semver.patch === h.patch && (h = !1), y.operator === "<" || y.operator === "<=") {
        if (l = zc(a, y, r), l === y && l !== a)
          return !1;
      } else if (a.operator === "<=" && !zr(a.semver, String(y), r))
        return !1;
    }
    if (!y.operator && (a || s) && o !== 0)
      return !1;
  }
  return !(s && d && !a && o !== 0 || a && u && !s && o !== 0 || w || h);
}, Fc = (e, t, r) => {
  if (!e)
    return t;
  const n = mi(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, zc = (e, t, r) => {
  if (!e)
    return t;
  const n = mi(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var tb = ZE;
const Ks = cn, Uc = ys, rb = ze, qc = ku, nb = Ar, sb = uw, ab = hw, ob = pw, ib = $w, cb = vw, lb = bw, ub = Nw, db = Iw, fb = it, hb = Aw, mb = Mw, pb = ci, yb = zw, $b = Kw, gb = gs, _b = li, vb = Au, wb = Cu, Eb = ui, bb = di, Sb = Du, Pb = fE, Nb = _s(), Rb = ct(), Ob = vs, Ib = _E, Tb = bE, jb = RE, kb = TE, Ab = AE, Cb = fi, Db = KE, Mb = BE, Lb = JE, Vb = QE, Fb = tb;
var zb = {
  parse: nb,
  valid: sb,
  clean: ab,
  inc: ob,
  diff: ib,
  major: cb,
  minor: lb,
  patch: ub,
  prerelease: db,
  compare: fb,
  rcompare: hb,
  compareLoose: mb,
  compareBuild: pb,
  sort: yb,
  rsort: $b,
  gt: gb,
  lt: _b,
  eq: vb,
  neq: wb,
  gte: Eb,
  lte: bb,
  cmp: Sb,
  coerce: Pb,
  Comparator: Nb,
  Range: Rb,
  satisfies: Ob,
  toComparators: Ib,
  maxSatisfying: Tb,
  minSatisfying: jb,
  minVersion: kb,
  validRange: Ab,
  outside: Cb,
  gtr: Db,
  ltr: Mb,
  intersects: Lb,
  simplifyRange: Vb,
  subset: Fb,
  SemVer: rb,
  re: Ks.re,
  src: Ks.src,
  tokens: Ks.t,
  SEMVER_SPEC_VERSION: Uc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Uc.RELEASE_TYPES,
  compareIdentifiers: qc.compareIdentifiers,
  rcompareIdentifiers: qc.rcompareIdentifiers
};
const dr = /* @__PURE__ */ rl(zb), Ub = Object.prototype.toString, qb = "[object Uint8Array]", Kb = "[object ArrayBuffer]";
function Lu(e, t, r) {
  return e ? e.constructor === t ? !0 : Ub.call(e) === r : !1;
}
function Vu(e) {
  return Lu(e, Uint8Array, qb);
}
function Gb(e) {
  return Lu(e, ArrayBuffer, Kb);
}
function Hb(e) {
  return Vu(e) || Gb(e);
}
function Bb(e) {
  if (!Vu(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function Wb(e) {
  if (!Hb(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Gs(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((s, a) => s + a.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const s of e)
    Bb(s), r.set(s, n), n += s.length;
  return r;
}
const Tn = {
  utf8: new globalThis.TextDecoder("utf8")
};
function jn(e, t = "utf8") {
  return Wb(e), Tn[t] ?? (Tn[t] = new globalThis.TextDecoder(t)), Tn[t].decode(e);
}
function Jb(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const Xb = new globalThis.TextEncoder();
function kn(e) {
  return Jb(e), Xb.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const Hs = "aes-256-cbc", At = () => /* @__PURE__ */ Object.create(null), Kc = (e) => e !== void 0, Bs = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Dt = "__internal__", Ws = `${Dt}.migrations.version`;
var Lt, nt, Ue, Je, tr, rr, wr, ft, Ne, Fu, zu, Uu, qu, Ku, Gu, Hu, Bu;
class Yb {
  constructor(t = {}) {
    ut(this, Ne);
    ir(this, "path");
    ir(this, "events");
    ut(this, Lt);
    ut(this, nt);
    ut(this, Ue);
    ut(this, Je, {});
    ut(this, tr, !1);
    ut(this, rr);
    ut(this, wr);
    ut(this, ft);
    ir(this, "_deserialize", (t) => JSON.parse(t));
    ir(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = yt(this, Ne, Fu).call(this, t);
    He(this, Ue, r), yt(this, Ne, zu).call(this, r), yt(this, Ne, qu).call(this, r), yt(this, Ne, Ku).call(this, r), this.events = new EventTarget(), He(this, nt, r.encryptionKey), this.path = yt(this, Ne, Gu).call(this, r), yt(this, Ne, Hu).call(this, r), r.watch && this._watch();
  }
  get(t, r) {
    if (re(this, Ue).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${Dt} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, s = (a, o) => {
      if (Bs(a, o), re(this, Ue).accessPropertiesByDotNotation)
        ln(n, a, o);
      else {
        if (a === "__proto__" || a === "constructor" || a === "prototype")
          return;
        n[a] = o;
      }
    };
    if (typeof t == "object") {
      const a = t;
      for (const [o, c] of Object.entries(a))
        s(o, c);
    } else
      s(t, r);
    this.store = n;
  }
  has(t) {
    return re(this, Ue).accessPropertiesByDotNotation ? Ps(this.store, t) : t in this.store;
  }
  appendToArray(t, r) {
    Bs(t, r);
    const n = re(this, Ue).accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
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
      Kc(re(this, Je)[r]) && this.set(r, re(this, Je)[r]);
  }
  delete(t) {
    const { store: r } = this;
    re(this, Ue).accessPropertiesByDotNotation ? cd(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = At();
    for (const r of Object.keys(re(this, Je)))
      Kc(re(this, Je)[r]) && (Bs(r, re(this, Je)[r]), re(this, Ue).accessPropertiesByDotNotation ? ln(t, r, re(this, Je)[r]) : t[r] = re(this, Je)[r]);
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
      const r = x.readFileSync(this.path, re(this, nt) ? null : "utf8"), n = this._decryptData(r), s = this._deserialize(n);
      return re(this, tr) || this._validate(s), Object.assign(At(), s);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), At();
      if (re(this, Ue).clearInvalidConfig) {
        const n = r;
        if (n.name === "SyntaxError" || (t = n.message) != null && t.startsWith("Config schema violation:"))
          return At();
      }
      throw r;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !Ps(t, Dt))
      try {
        const r = x.readFileSync(this.path, re(this, nt) ? null : "utf8"), n = this._decryptData(r), s = this._deserialize(n);
        Ps(s, Dt) && ln(t, Dt, _i(s, Dt));
      } catch {
      }
    re(this, tr) || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, r]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    re(this, rr) && (re(this, rr).close(), He(this, rr, void 0)), re(this, wr) && (x.unwatchFile(this.path), He(this, wr, !1)), He(this, ft, void 0);
  }
  _decryptData(t) {
    if (!re(this, nt))
      return typeof t == "string" ? t : jn(t);
    try {
      const r = t.slice(0, 16), n = Ht.pbkdf2Sync(re(this, nt), r, 1e4, 32, "sha512"), s = Ht.createDecipheriv(Hs, n, r), a = t.slice(17), o = typeof a == "string" ? kn(a) : a;
      return jn(Gs([s.update(o), s.final()]));
    } catch {
      try {
        const r = t.slice(0, 16), n = Ht.pbkdf2Sync(re(this, nt), r.toString(), 1e4, 32, "sha512"), s = Ht.createDecipheriv(Hs, n, r), a = t.slice(17), o = typeof a == "string" ? kn(a) : a;
        return jn(Gs([s.update(o), s.final()]));
      } catch {
      }
    }
    return typeof t == "string" ? t : jn(t);
  }
  _handleStoreChange(t) {
    let r = this.store;
    const n = () => {
      const s = r, a = this.store;
      $i(a, s) || (r = a, t.call(this, a, s));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _handleValueChange(t, r) {
    let n = t();
    const s = () => {
      const a = n, o = t();
      $i(o, a) || (n = o, r.call(this, o, a));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _validate(t) {
    if (!re(this, Lt) || re(this, Lt).call(this, t) || !re(this, Lt).errors)
      return;
    const n = re(this, Lt).errors.map(({ instancePath: s, message: a = "" }) => `\`${s.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    x.mkdirSync(Z.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (re(this, nt)) {
      const n = Ht.randomBytes(16), s = Ht.pbkdf2Sync(re(this, nt), n, 1e4, 32, "sha512"), a = Ht.createCipheriv(Hs, s, n);
      r = Gs([n, kn(":"), a.update(kn(r)), a.final()]);
    }
    if (pe.env.SNAP)
      x.writeFileSync(this.path, r, { mode: re(this, Ue).configFileMode });
    else
      try {
        tl(this.path, r, { mode: re(this, Ue).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          x.writeFileSync(this.path, r, { mode: re(this, Ue).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    if (this._ensureDirectory(), x.existsSync(this.path) || this._write(At()), pe.platform === "win32" || pe.platform === "darwin") {
      re(this, ft) ?? He(this, ft, bc(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 }));
      const t = Z.dirname(this.path), r = Z.basename(this.path);
      He(this, rr, x.watch(t, { persistent: !1, encoding: "utf8" }, (n, s) => {
        s && s !== r || typeof re(this, ft) == "function" && re(this, ft).call(this);
      }));
    } else
      re(this, ft) ?? He(this, ft, bc(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 })), x.watchFile(this.path, { persistent: !1 }, (t, r) => {
        typeof re(this, ft) == "function" && re(this, ft).call(this);
      }), He(this, wr, !0);
  }
  _migrate(t, r, n) {
    let s = this._get(Ws, "0.0.0");
    const a = Object.keys(t).filter((c) => this._shouldPerformMigration(c, s, r));
    let o = structuredClone(this.store);
    for (const c of a)
      try {
        n && n(this, {
          fromVersion: s,
          toVersion: c,
          finalVersion: r,
          versions: a
        });
        const l = t[c];
        l == null || l(this), this._set(Ws, c), s = c, o = structuredClone(this.store);
      } catch (l) {
        this.store = o;
        try {
          this._write(o);
        } catch {
        }
        const d = l instanceof Error ? l.message : String(l);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${d}`);
      }
    (this._isVersionInRangeFormat(s) || !dr.eq(s, r)) && this._set(Ws, r);
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
    return t === Dt || t.startsWith(`${Dt}.`);
  }
  _isVersionInRangeFormat(t) {
    return dr.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && dr.satisfies(r, t) ? !1 : dr.satisfies(n, t) : !(dr.lte(t, r) || dr.gt(t, n));
  }
  _get(t, r) {
    return _i(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    ln(n, t, r), this.store = n;
  }
}
Lt = new WeakMap(), nt = new WeakMap(), Ue = new WeakMap(), Je = new WeakMap(), tr = new WeakMap(), rr = new WeakMap(), wr = new WeakMap(), ft = new WeakMap(), Ne = new WeakSet(), Fu = function(t) {
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
    r.cwd = fd(r.projectName, { suffix: r.projectSuffix }).config;
  }
  return typeof r.fileExtension == "string" && (r.fileExtension = r.fileExtension.replace(/^\.+/, "")), r;
}, zu = function(t) {
  if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
    return;
  if (t.schema && typeof t.schema != "object")
    throw new TypeError("The `schema` option must be an object.");
  const r = zv.default, n = new m0.Ajv2020({
    allErrors: !0,
    useDefaults: !0,
    ...t.ajvOptions
  });
  r(n);
  const s = {
    ...t.rootSchema,
    type: "object",
    properties: t.schema
  };
  He(this, Lt, n.compile(s)), yt(this, Ne, Uu).call(this, t.schema);
}, Uu = function(t) {
  const r = Object.entries(t ?? {});
  for (const [n, s] of r) {
    if (!s || typeof s != "object" || !Object.hasOwn(s, "default"))
      continue;
    const { default: a } = s;
    a !== void 0 && (re(this, Je)[n] = a);
  }
}, qu = function(t) {
  t.defaults && Object.assign(re(this, Je), t.defaults);
}, Ku = function(t) {
  t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
}, Gu = function(t) {
  const r = typeof t.fileExtension == "string" ? t.fileExtension : void 0, n = r ? `.${r}` : "";
  return Z.resolve(t.cwd, `${t.configName ?? "config"}${n}`);
}, Hu = function(t) {
  if (t.migrations) {
    yt(this, Ne, Bu).call(this, t), this._validate(this.store);
    return;
  }
  const r = this.store, n = Object.assign(At(), t.defaults ?? {}, r);
  this._validate(n);
  try {
    gi.deepEqual(r, n);
  } catch {
    this.store = n;
  }
}, Bu = function(t) {
  const { migrations: r, projectVersion: n } = t;
  if (r) {
    if (!n)
      throw new Error("Please specify the `projectVersion` option.");
    He(this, tr, !0);
    try {
      const s = this.store, a = Object.assign(At(), t.defaults ?? {}, s);
      try {
        gi.deepEqual(s, a);
      } catch {
        this._write(a);
      }
      this._migrate(r, n, t.beforeEachMigration);
    } finally {
      He(this, tr, !1);
    }
  }
};
const { app: qn, ipcMain: fa, shell: Qb } = Jc;
let Gc = !1;
const Hc = () => {
  if (!fa || !qn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: qn.getPath("userData"),
    appVersion: qn.getVersion()
  };
  return Gc || (fa.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Gc = !0), e;
};
let Zb = class extends Yb {
  constructor(t) {
    let r, n;
    if (pe.type === "renderer") {
      const s = Jc.ipcRenderer.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else fa && qn && ({ defaultCwd: r, appVersion: n } = Hc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Z.isAbsolute(t.cwd) ? t.cwd : Z.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Hc();
  }
  async openInEditor() {
    const t = await Qb.openPath(this.path);
    if (t)
      throw new Error(t);
  }
};
class xb {
  constructor(t) {
    ir(this, "store");
    this.store = new Zb(t);
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
const eS = {
  checkRobots: {
    type: "boolean",
    default: !0
  },
  downloadPath: {
    type: "string",
    default: ""
  }
}, ws = new xb({
  name: "app-config",
  schema: eS
}), Wu = Z.dirname(sd(import.meta.url));
process.env.APP_ROOT = Z.join(Wu, "..");
const ha = process.env.VITE_DEV_SERVER_URL, _S = Z.join(process.env.APP_ROOT, "dist-electron"), Ju = Z.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ha ? Z.join(process.env.APP_ROOT, "public") : Ju;
let $e;
const Bc = "https://example.com";
let vr = "";
function rn() {
  let e = ws.get("downloadPath");
  return e == null || e.trim() == "" ? ad.platform() === "win32" ? "C:\\Users\\Public\\Downloads" : "~/Downloads" : (pi(e), e);
}
function Wc(e) {
  let t = "";
  vr != "" && (t = new URL(vr).hostname);
  let r = "";
  e != "" && (r = new URL(e).hostname);
  const n = Z.join(rn(), "webdownloader", t, r);
  return pi(n), n;
}
function pi(e) {
  x.mkdirSync(e, { recursive: !0 });
}
function tS(e) {
  var t;
  return e.mimeType || ((t = e.headers) == null ? void 0 : t["content-type"]) || "application/octet-stream";
}
let xn, es;
function rS() {
  console.log("Creating system tray icon.", Z.join(process.env.VITE_PUBLIC, "icon.png"));
  const e = new rd(Z.join(process.env.VITE_PUBLIC, "icon.png")), t = nd.buildFromTemplate([
    { label: "显示", click: () => {
    } },
    { label: "退出", click: () => xr.quit() }
  ]);
  e.setToolTip("My App"), e.setContextMenu(t);
}
function Xu() {
  console.log("Creating main window.", Z.join(process.env.VITE_PUBLIC, "icon.png")), $e = new Xc({
    icon: Z.join(process.env.VITE_PUBLIC, "icon.png"),
    title: "QCSiteDownloader",
    width: 1420,
    height: 680,
    webPreferences: {
      preload: Z.join(Wu, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), es = $e;
  const e = new td();
  $e.contentView.addChildView(e), e.webContents.loadURL(Bc), e.setBounds({ x: 0, y: 0, width: 1e3, height: 800 }), e.webContents.setWindowOpenHandler(({ url: s }) => (e.webContents.loadURL(s), { action: "deny" })), e.webContents.on("will-navigate", (s, a) => {
    s.preventDefault(), e.webContents.loadURL(a);
  }), $e.contentView.addChildView(e), xn = e, pi(rn());
  const r = e.webContents.debugger;
  r.attach("1.3"), r.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024
  }), r.sendCommand("Page.enable");
  const n = /* @__PURE__ */ new Map();
  r.on("message", async (s, a, o) => {
    if (a === "Network.requestWillBeSent") {
      n.set(o.requestId, o.request.url);
      return;
    }
    if (a == "Network.loadingFailed") {
      const u = n.get(o.requestId);
      n.delete(o.requestId), $e == null || $e.webContents.send("item-add", {
        url: u,
        filepath: "",
        isSuccess: !1
      });
      return;
    }
    if (vr == "" || vr == Bc || vr == "localhost" || a !== "Network.responseReceived") return;
    const { requestId: c, response: l } = o, d = l.url;
    if (d.startsWith("http")) {
      if (l.status >= 400) {
        $e == null || $e.webContents.send("item-add", {
          url: d,
          filepath: "",
          isSuccess: !1
        });
        return;
      }
      try {
        const u = await r.sendCommand(
          "Network.getResponseBody",
          { requestId: c }
        ), h = u.base64Encoded ? Buffer.from(u.body, "base64") : Buffer.from(u.body), w = tS(l), y = Wc(d), v = new URL(d);
        let $ = Z.join(y, v.pathname);
        if ($.endsWith("/") && ($ += "index"), !Z.extname($)) {
          const g = w.includes("html") ? ".html" : w.includes("javascript") ? ".js" : w.includes("css") ? ".css" : w.includes("json") ? ".json" : w.includes("text") ? ".text" : w.includes("webp") ? ".webp" : "";
          $ += g;
        }
        x.mkdirSync(Z.dirname($), { recursive: !0 }), x.writeFileSync($, h), $e == null || $e.webContents.send("item-add", {
          url: d,
          filepath: $,
          isSuccess: !0
        });
      } catch {
      }
    }
  }), e.webContents.on("did-finish-load", async () => {
    if ($e == null || $e == null) {
      console.error("Window is not defined, cannot save HTML.");
      return;
    }
    try {
      const s = await e.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      );
      if ($e == null || $e == null) {
        console.error("Window is not defined, cannot save HTML.");
        return;
      }
      const a = Wc($e.webContents.getURL()), o = Z.join(a, "index.html");
      x.writeFileSync(o, s, "utf-8"), $e.webContents.send("item-add", {
        url: e.webContents.getURL(),
        filepath: o,
        isSuccess: !0
      }), setTimeout(() => {
        console.log("Capture complete, exiting.");
      }, 15e3);
    } catch (s) {
      console.error("HTML capture failed:", s);
    }
  }), $e.on("resize", () => {
    pa();
  }), e.webContents.on("did-finish-load", () => {
    pa();
  }), ha ? $e.loadURL(ha) : $e.loadFile(Z.join(Ju, "index.html"));
}
Pt.handle("update-subview-url", (e, t) => {
  xn && t && (vr = t, console.log("Updating subView URL to:", t), xn.webContents.loadURL(t));
});
Pt.handle("select-download-path", async () => {
  const e = await Zu.showOpenDialog({
    title: "选择下载文件夹",
    defaultPath: rn(),
    properties: ["openDirectory", "createDirectory"]
  });
  return ws.set("downloadPath", e.canceled ? rn() : e.filePaths[0]), e;
});
Pt.handle("get-download-dir", () => rn());
Pt.handle("copy-text", (e, t) => {
  xu.writeText(t);
});
Pt.handle("set-robots-checked", (e, t) => {
  ws.set("checkRobots", t);
});
Pt.handle("get-robots-checked", () => ws.get("checkRobots"));
let ma = 480;
function pa() {
  const { width: e, height: t } = es.getContentBounds();
  xn.setBounds({
    x: 0,
    y: 0,
    width: e - ma - 6,
    height: t
  });
}
Pt.on("shell-width-changed", (e, t) => {
  ma = t, console.log("Shell width changed:", ma), pa();
});
Pt.handle("resize-window", (e, t) => {
  const r = es.getBounds().height;
  es.setSize(Math.ceil(t), r);
});
Pt.handle("open-existing-folder", async (e, t) => {
  try {
    return await ed.openPath(t) === "";
  } catch (r) {
    return console.error(r), !1;
  }
});
xr.on("window-all-closed", () => {
  process.platform !== "darwin" && (xr.quit(), $e = null);
});
xr.on("activate", () => {
  Xc.getAllWindows().length === 0 && Xu();
});
xr.whenReady().then(() => {
  Xu(), rS();
});
export {
  _S as MAIN_DIST,
  Ju as RENDERER_DIST,
  ha as VITE_DEV_SERVER_URL
};
