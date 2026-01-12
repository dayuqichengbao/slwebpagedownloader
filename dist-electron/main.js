var gu = Object.defineProperty;
var ei = (e) => {
  throw TypeError(e);
};
var _u = (e, t, r) => t in e ? gu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var tr = (e, t, r) => _u(e, typeof t != "symbol" ? t + "" : t, r), hs = (e, t, r) => t.has(e) || ei("Cannot " + r);
var te = (e, t, r) => (hs(e, t, "read from private field"), r ? r.call(e) : t.get(e)), it = (e, t, r) => t.has(e) ? ei("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), qe = (e, t, r, n) => (hs(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ft = (e, t, r) => (hs(e, t, "access private method"), r);
import Ac, { ipcMain as Et, dialog as vu, clipboard as wu, shell as Eu, app as Gr, BrowserWindow as Cc, WebContentsView as bu, Tray as Su, Menu as Pu } from "electron";
import { fileURLToPath as Nu } from "node:url";
import Z from "node:path";
import ee from "node:fs";
import Ru from "os";
import ge from "node:process";
import { promisify as Te, isDeepStrictEqual as ti } from "node:util";
import Ft from "node:crypto";
import ri from "node:assert";
import Dc from "node:os";
import "node:events";
import "node:stream";
const Qt = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Mc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Lc = 1e6, Ou = (e) => e >= "0" && e <= "9";
function Vc(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= Lc;
  }
  return !1;
}
function ms(e, t) {
  return Mc.has(e) ? !1 : (e && Vc(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function Iu(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  const t = [];
  let r = "", n = "start", s = !1, a = 0;
  for (const i of e) {
    if (a++, s) {
      r += i, s = !1;
      continue;
    }
    if (i === "\\") {
      if (n === "index")
        throw new Error(`Invalid character '${i}' in an index at position ${a}`);
      if (n === "indexEnd")
        throw new Error(`Invalid character '${i}' after an index at position ${a}`);
      s = !0, n = n === "start" ? "property" : n;
      continue;
    }
    switch (i) {
      case ".": {
        if (n === "index")
          throw new Error(`Invalid character '${i}' in an index at position ${a}`);
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (!ms(r, t))
          return [];
        r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error(`Invalid character '${i}' in an index at position ${a}`);
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (n === "property" || n === "start") {
          if ((r || n === "property") && !ms(r, t))
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
            !Number.isNaN(o) && Number.isFinite(o) && o >= 0 && o <= Number.MAX_SAFE_INTEGER && o <= Lc && r === String(o) ? t.push(o) : t.push(r), r = "", n = "indexEnd";
          }
          break;
        }
        if (n === "indexEnd")
          throw new Error(`Invalid character '${i}' after an index at position ${a}`);
        r += i;
        break;
      }
      default: {
        if (n === "index" && !Ou(i))
          throw new Error(`Invalid character '${i}' in an index at position ${a}`);
        if (n === "indexEnd")
          throw new Error(`Invalid character '${i}' after an index at position ${a}`);
        n === "start" && (n = "property"), r += i;
      }
    }
  }
  switch (s && (r += "\\"), n) {
    case "property": {
      if (!ms(r, t))
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
function Hn(e) {
  if (typeof e == "string")
    return Iu(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [r, n] of e.entries()) {
      if (typeof n != "string" && typeof n != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${r}, got ${typeof n}`);
      if (typeof n == "number" && !Number.isFinite(n))
        throw new TypeError(`Path segment at index ${r} must be a finite number, got ${n}`);
      if (Mc.has(n))
        return [];
      typeof n == "string" && Vc(n) ? t.push(Number.parseInt(n, 10)) : t.push(n);
    }
    return t;
  }
  return [];
}
function ni(e, t, r) {
  if (!Qt(e) || typeof t != "string" && !Array.isArray(t))
    return r === void 0 ? e : r;
  const n = Hn(t);
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
function xr(e, t, r) {
  if (!Qt(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const n = e, s = Hn(t);
  if (s.length === 0)
    return e;
  for (let a = 0; a < s.length; a++) {
    const i = s[a];
    if (a === s.length - 1)
      e[i] = r;
    else if (!Qt(e[i])) {
      const c = typeof s[a + 1] == "number";
      e[i] = c ? [] : {};
    }
    e = e[i];
  }
  return n;
}
function Tu(e, t) {
  if (!Qt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = Hn(t);
  if (r.length === 0)
    return !1;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (n === r.length - 1)
      return Object.hasOwn(e, s) ? (delete e[s], !0) : !1;
    if (e = e[s], !Qt(e))
      return !1;
  }
}
function ps(e, t) {
  if (!Qt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = Hn(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Qt(e) || !(n in e))
      return !1;
    e = e[n];
  }
  return !0;
}
const kt = Dc.homedir(), aa = Dc.tmpdir(), { env: ir } = ge, ju = (e) => {
  const t = Z.join(kt, "Library");
  return {
    data: Z.join(t, "Application Support", e),
    config: Z.join(t, "Preferences", e),
    cache: Z.join(t, "Caches", e),
    log: Z.join(t, "Logs", e),
    temp: Z.join(aa, e)
  };
}, ku = (e) => {
  const t = ir.APPDATA || Z.join(kt, "AppData", "Roaming"), r = ir.LOCALAPPDATA || Z.join(kt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: Z.join(r, e, "Data"),
    config: Z.join(t, e, "Config"),
    cache: Z.join(r, e, "Cache"),
    log: Z.join(r, e, "Log"),
    temp: Z.join(aa, e)
  };
}, Au = (e) => {
  const t = Z.basename(kt);
  return {
    data: Z.join(ir.XDG_DATA_HOME || Z.join(kt, ".local", "share"), e),
    config: Z.join(ir.XDG_CONFIG_HOME || Z.join(kt, ".config"), e),
    cache: Z.join(ir.XDG_CACHE_HOME || Z.join(kt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: Z.join(ir.XDG_STATE_HOME || Z.join(kt, ".local", "state"), e),
    temp: Z.join(aa, t, e)
  };
};
function Cu(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), ge.platform === "darwin" ? ju(e) : ge.platform === "win32" ? ku(e) : Au(e);
}
const bt = (e, t) => {
  const { onError: r } = t;
  return function(...s) {
    return e.apply(void 0, s).catch(r);
  };
}, ht = (e, t) => {
  const { onError: r } = t;
  return function(...s) {
    try {
      return e.apply(void 0, s);
    } catch (a) {
      return r(a);
    }
  };
}, Du = 250, St = (e, t) => {
  const { isRetriable: r } = t;
  return function(s) {
    const { timeout: a } = s, i = s.interval ?? Du, o = Date.now() + a;
    return function c(...d) {
      return e.apply(void 0, d).catch((u) => {
        if (!r(u) || Date.now() >= o)
          throw u;
        const h = Math.round(i * Math.random());
        return h > 0 ? new Promise((p) => setTimeout(p, h)).then(() => c.apply(void 0, d)) : c.apply(void 0, d);
      });
    };
  };
}, Pt = (e, t) => {
  const { isRetriable: r } = t;
  return function(s) {
    const { timeout: a } = s, i = Date.now() + a;
    return function(...c) {
      for (; ; )
        try {
          return e.apply(void 0, c);
        } catch (d) {
          if (!r(d) || Date.now() >= i)
            throw d;
          continue;
        }
    };
  };
}, cr = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!cr.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !Mu && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!cr.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!cr.isNodeError(e))
      throw e;
    if (!cr.isChangeErrorOk(e))
      throw e;
  }
}, en = {
  onError: cr.onChangeError
}, Ke = {
  onError: () => {
  }
}, Mu = ge.getuid ? !ge.getuid() : !1, je = {
  isRetriable: cr.isRetriableError
}, Ae = {
  attempt: {
    /* ASYNC */
    chmod: bt(Te(ee.chmod), en),
    chown: bt(Te(ee.chown), en),
    close: bt(Te(ee.close), Ke),
    fsync: bt(Te(ee.fsync), Ke),
    mkdir: bt(Te(ee.mkdir), Ke),
    realpath: bt(Te(ee.realpath), Ke),
    stat: bt(Te(ee.stat), Ke),
    unlink: bt(Te(ee.unlink), Ke),
    /* SYNC */
    chmodSync: ht(ee.chmodSync, en),
    chownSync: ht(ee.chownSync, en),
    closeSync: ht(ee.closeSync, Ke),
    existsSync: ht(ee.existsSync, Ke),
    fsyncSync: ht(ee.fsync, Ke),
    mkdirSync: ht(ee.mkdirSync, Ke),
    realpathSync: ht(ee.realpathSync, Ke),
    statSync: ht(ee.statSync, Ke),
    unlinkSync: ht(ee.unlinkSync, Ke)
  },
  retry: {
    /* ASYNC */
    close: St(Te(ee.close), je),
    fsync: St(Te(ee.fsync), je),
    open: St(Te(ee.open), je),
    readFile: St(Te(ee.readFile), je),
    rename: St(Te(ee.rename), je),
    stat: St(Te(ee.stat), je),
    write: St(Te(ee.write), je),
    writeFile: St(Te(ee.writeFile), je),
    /* SYNC */
    closeSync: Pt(ee.closeSync, je),
    fsyncSync: Pt(ee.fsyncSync, je),
    openSync: Pt(ee.openSync, je),
    readFileSync: Pt(ee.readFileSync, je),
    renameSync: Pt(ee.renameSync, je),
    statSync: Pt(ee.statSync, je),
    writeSync: Pt(ee.writeSync, je),
    writeFileSync: Pt(ee.writeFileSync, je)
  }
}, Lu = "utf8", si = 438, Vu = 511, Fu = {}, zu = ge.geteuid ? ge.geteuid() : -1, Uu = ge.getegid ? ge.getegid() : -1, qu = 1e3, Ku = !!ge.getuid;
ge.getuid && ge.getuid();
const ai = 128, Gu = (e) => e instanceof Error && "code" in e, oi = (e) => typeof e == "string", ys = (e) => e === void 0, Hu = ge.platform === "linux", Fc = ge.platform === "win32", oa = ["SIGHUP", "SIGINT", "SIGTERM"];
Fc || oa.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
Hu && oa.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class Bu {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Fc && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? ge.kill(ge.pid, "SIGTERM") : ge.kill(ge.pid, t));
      }
    }, this.hook = () => {
      ge.once("exit", () => this.exit());
      for (const t of oa)
        try {
          ge.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Wu = new Bu(), Ju = Wu.register, Ce = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), s = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Ce.truncate(t(e));
    return n in Ce.store ? Ce.get(e, t, r) : (Ce.store[n] = r, [n, () => delete Ce.store[n]]);
  },
  purge: (e) => {
    Ce.store[e] && (delete Ce.store[e], Ae.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ce.store[e] && (delete Ce.store[e], Ae.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ce.store)
      Ce.purgeSync(e);
  },
  truncate: (e) => {
    const t = Z.basename(e);
    if (t.length <= ai)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ai;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
Ju(Ce.purgeSyncAll);
function zc(e, t, r = Fu) {
  if (oi(r))
    return zc(e, t, { encoding: r });
  const s = { timeout: r.timeout ?? qu };
  let a = null, i = null, o = null;
  try {
    const c = Ae.attempt.realpathSync(e), d = !!c;
    e = c || e, [i, a] = Ce.get(e, r.tmpCreate || Ce.create, r.tmpPurge !== !1);
    const u = Ku && ys(r.chown), h = ys(r.mode);
    if (d && (u || h)) {
      const w = Ae.attempt.statSync(e);
      w && (r = { ...r }, u && (r.chown = { uid: w.uid, gid: w.gid }), h && (r.mode = w.mode));
    }
    if (!d) {
      const w = Z.dirname(e);
      Ae.attempt.mkdirSync(w, {
        mode: Vu,
        recursive: !0
      });
    }
    o = Ae.retry.openSync(s)(i, "w", r.mode || si), r.tmpCreated && r.tmpCreated(i), oi(t) ? Ae.retry.writeSync(s)(o, t, 0, r.encoding || Lu) : ys(t) || Ae.retry.writeSync(s)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Ae.retry.fsyncSync(s)(o) : Ae.attempt.fsync(o)), Ae.retry.closeSync(s)(o), o = null, r.chown && (r.chown.uid !== zu || r.chown.gid !== Uu) && Ae.attempt.chownSync(i, r.chown.uid, r.chown.gid), r.mode && r.mode !== si && Ae.attempt.chmodSync(i, r.mode);
    try {
      Ae.retry.renameSync(s)(i, e);
    } catch (w) {
      if (!Gu(w) || w.code !== "ENAMETOOLONG")
        throw w;
      Ae.retry.renameSync(s)(i, Ce.truncate(e));
    }
    a(), i = null;
  } finally {
    o && Ae.attempt.closeSync(o), i && Ce.purge(i);
  }
}
function Uc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ls = { exports: {} }, qc = {}, mt = {}, zt = {}, Jr = {}, re = {}, Hr = {};
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
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((P, T) => `${P}${T}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((P, T) => (T instanceof r && (P[T.str] = (P[T.str] || 0) + 1), P), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...E) {
    const P = [m[0]];
    let T = 0;
    for (; T < E.length; )
      o(P, E[T]), P.push(m[++T]);
    return new n(P);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...E) {
    const P = [p(m[0])];
    let T = 0;
    for (; T < E.length; )
      P.push(a), o(P, E[T]), P.push(a, p(m[++T]));
    return c(P), new n(P);
  }
  e.str = i;
  function o(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = o;
  function c(m) {
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
    return E.emptyStr() ? m : m.emptyStr() ? E : i`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function w(m) {
    return new n(p(m));
  }
  e.stringify = w;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function y(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(Hr);
var Vs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Hr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
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
  const i = (0, t._)`\n`;
  class o extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
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
      const w = this.toName(d), { prefix: p } = w, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let y = this._values[p];
      if (y) {
        const E = y.get(v);
        if (E)
          return E;
      } else
        y = this._values[p] = /* @__PURE__ */ new Map();
      y.set(v, w);
      const _ = this._scope[p] || (this._scope[p] = []), m = _.length;
      return _[m] = u.ref, w.setValue(u, { property: p, itemIndex: m }), w;
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
      let p = t.nil;
      for (const v in d) {
        const y = d[v];
        if (!y)
          continue;
        const _ = h[v] = h[v] || /* @__PURE__ */ new Map();
        y.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = u(m);
          if (E) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${P} ${m} = ${E};${this.opts._n}`;
          } else if (E = w == null ? void 0 : w(m))
            p = (0, t._)`${p}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = o;
})(Vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Hr, r = Vs;
  var n = Hr;
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
  var s = Vs;
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
    optimizeNames(l, f) {
      return this;
    }
  }
  class i extends a {
    constructor(l, f, N) {
      super(), this.varKind = l, this.name = f, this.rhs = N;
    }
    render({ es5: l, _n: f }) {
      const N = l ? r.varKinds.var : this.varKind, C = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${C};` + f;
    }
    optimizeNames(l, f) {
      if (l[this.name.str])
        return this.rhs && (this.rhs = A(this.rhs, l, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(l, f, N) {
      super(), this.lhs = l, this.rhs = f, this.sideEffects = N;
    }
    render({ _n: l }) {
      return `${this.lhs} = ${this.rhs};` + l;
    }
    optimizeNames(l, f) {
      if (!(this.lhs instanceof t.Name && !l[this.lhs.str] && !this.sideEffects))
        return this.rhs = A(this.rhs, l, f), this;
    }
    get names() {
      const l = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return J(l, this.rhs);
    }
  }
  class c extends o {
    constructor(l, f, N, C) {
      super(l, N, C), this.op = f;
    }
    render({ _n: l }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + l;
    }
  }
  class d extends a {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `${this.label}:` + l;
    }
  }
  class u extends a {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `break${this.label ? ` ${this.label}` : ""};` + l;
    }
  }
  class h extends a {
    constructor(l) {
      super(), this.error = l;
    }
    render({ _n: l }) {
      return `throw ${this.error};` + l;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends a {
    constructor(l) {
      super(), this.code = l;
    }
    render({ _n: l }) {
      return `${this.code};` + l;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(l, f) {
      return this.code = A(this.code, l, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends a {
    constructor(l = []) {
      super(), this.nodes = l;
    }
    render(l) {
      return this.nodes.reduce((f, N) => f + N.render(l), "");
    }
    optimizeNodes() {
      const { nodes: l } = this;
      let f = l.length;
      for (; f--; ) {
        const N = l[f].optimizeNodes();
        Array.isArray(N) ? l.splice(f, 1, ...N) : N ? l[f] = N : l.splice(f, 1);
      }
      return l.length > 0 ? this : void 0;
    }
    optimizeNames(l, f) {
      const { nodes: N } = this;
      let C = N.length;
      for (; C--; ) {
        const M = N[C];
        M.optimizeNames(l, f) || (L(l, M.names), N.splice(C, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((l, f) => X(l, f.names), {});
    }
  }
  class v extends p {
    render(l) {
      return "{" + l._n + super.render(l) + "}" + l._n;
    }
  }
  class y extends p {
  }
  class _ extends v {
  }
  _.kind = "else";
  class m extends v {
    constructor(l, f) {
      super(f), this.condition = l;
    }
    render(l) {
      let f = `if(${this.condition})` + super.render(l);
      return this.else && (f += "else " + this.else.render(l)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const l = this.condition;
      if (l === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const N = f.optimizeNodes();
        f = this.else = Array.isArray(N) ? new _(N) : N;
      }
      if (f)
        return l === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(H(l), f instanceof m ? [f] : f.nodes);
      if (!(l === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(l, f) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(l, f), !!(super.optimizeNames(l, f) || this.else))
        return this.condition = A(this.condition, l, f), this;
    }
    get names() {
      const l = super.names;
      return J(l, this.condition), this.else && X(l, this.else.names), l;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class P extends E {
    constructor(l) {
      super(), this.iteration = l;
    }
    render(l) {
      return `for(${this.iteration})` + super.render(l);
    }
    optimizeNames(l, f) {
      if (super.optimizeNames(l, f))
        return this.iteration = A(this.iteration, l, f), this;
    }
    get names() {
      return X(super.names, this.iteration.names);
    }
  }
  class T extends E {
    constructor(l, f, N, C) {
      super(), this.varKind = l, this.name = f, this.from = N, this.to = C;
    }
    render(l) {
      const f = l.es5 ? r.varKinds.var : this.varKind, { name: N, from: C, to: M } = this;
      return `for(${f} ${N}=${C}; ${N}<${M}; ${N}++)` + super.render(l);
    }
    get names() {
      const l = J(super.names, this.from);
      return J(l, this.to);
    }
  }
  class k extends E {
    constructor(l, f, N, C) {
      super(), this.loop = l, this.varKind = f, this.name = N, this.iterable = C;
    }
    render(l) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(l);
    }
    optimizeNames(l, f) {
      if (super.optimizeNames(l, f))
        return this.iterable = A(this.iterable, l, f), this;
    }
    get names() {
      return X(super.names, this.iterable.names);
    }
  }
  class V extends v {
    constructor(l, f, N) {
      super(), this.name = l, this.args = f, this.async = N;
    }
    render(l) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(l);
    }
  }
  V.kind = "func";
  class U extends p {
    render(l) {
      return "return " + super.render(l);
    }
  }
  U.kind = "return";
  class x extends v {
    render(l) {
      let f = "try" + super.render(l);
      return this.catch && (f += this.catch.render(l)), this.finally && (f += this.finally.render(l)), f;
    }
    optimizeNodes() {
      var l, f;
      return super.optimizeNodes(), (l = this.catch) === null || l === void 0 || l.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(l, f) {
      var N, C;
      return super.optimizeNames(l, f), (N = this.catch) === null || N === void 0 || N.optimizeNames(l, f), (C = this.finally) === null || C === void 0 || C.optimizeNames(l, f), this;
    }
    get names() {
      const l = super.names;
      return this.catch && X(l, this.catch.names), this.finally && X(l, this.finally.names), l;
    }
  }
  class ne extends v {
    constructor(l) {
      super(), this.error = l;
    }
    render(l) {
      return `catch(${this.error})` + super.render(l);
    }
  }
  ne.kind = "catch";
  class ce extends v {
    render(l) {
      return "finally" + super.render(l);
    }
  }
  ce.kind = "finally";
  class z {
    constructor(l, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = l, this._scope = new r.Scope({ parent: l }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(l) {
      return this._scope.name(l);
    }
    // reserves unique name in the external scope
    scopeName(l) {
      return this._extScope.name(l);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(l, f) {
      const N = this._extScope.value(l, f);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(l, f) {
      return this._extScope.getValue(l, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(l) {
      return this._extScope.scopeRefs(l, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(l, f, N, C) {
      const M = this._scope.toName(f);
      return N !== void 0 && C && (this._constants[M.str] = N), this._leafNode(new i(l, M, N)), M;
    }
    // `const` declaration (`var` in es5 mode)
    const(l, f, N) {
      return this._def(r.varKinds.const, l, f, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(l, f, N) {
      return this._def(r.varKinds.let, l, f, N);
    }
    // `var` declaration with optional assignment
    var(l, f, N) {
      return this._def(r.varKinds.var, l, f, N);
    }
    // assignment code
    assign(l, f, N) {
      return this._leafNode(new o(l, f, N));
    }
    // `+=` code
    add(l, f) {
      return this._leafNode(new c(l, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(l) {
      return typeof l == "function" ? l() : l !== t.nil && this._leafNode(new w(l)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...l) {
      const f = ["{"];
      for (const [N, C] of l)
        f.length > 1 && f.push(","), f.push(N), (N !== C || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, C));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(l, f, N) {
      if (this._blockNode(new m(l)), f && N)
        this.code(f).else().code(N).endIf();
      else if (f)
        this.code(f).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(l) {
      return this._elseNode(new m(l));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(l, f) {
      return this._blockNode(l), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(l, f) {
      return this._for(new P(l), f);
    }
    // `for` statement for a range of values
    forRange(l, f, N, C, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const Y = this._scope.toName(l);
      return this._for(new T(M, Y, f, N), () => C(Y));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(l, f, N, C = r.varKinds.const) {
      const M = this._scope.toName(l);
      if (this.opts.es5) {
        const Y = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${Y}.length`, (B) => {
          this.var(M, (0, t._)`${Y}[${B}]`), N(M);
        });
      }
      return this._for(new k("of", C, M, f), () => N(M));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(l, f, N, C = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(l, (0, t._)`Object.keys(${f})`, N);
      const M = this._scope.toName(l);
      return this._for(new k("in", C, M, f), () => N(M));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(l) {
      return this._leafNode(new d(l));
    }
    // `break` statement
    break(l) {
      return this._leafNode(new u(l));
    }
    // `return` statement
    return(l) {
      const f = new U();
      if (this._blockNode(f), this.code(l), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(U);
    }
    // `try` statement
    try(l, f, N) {
      if (!f && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const C = new x();
      if (this._blockNode(C), this.code(l), f) {
        const M = this.name("e");
        this._currNode = C.catch = new ne(M), f(M);
      }
      return N && (this._currNode = C.finally = new ce(), this.code(N)), this._endBlockNode(ne, ce);
    }
    // `throw` statement
    throw(l) {
      return this._leafNode(new h(l));
    }
    // start self-balancing block
    block(l, f) {
      return this._blockStarts.push(this._nodes.length), l && this.code(l).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(l) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - f;
      if (N < 0 || l !== void 0 && N !== l)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${l} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(l, f = t.nil, N, C) {
      return this._blockNode(new V(l, f, N)), C && this.code(C).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(V);
    }
    optimize(l = 1) {
      for (; l-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(l) {
      return this._currNode.nodes.push(l), this;
    }
    _blockNode(l) {
      this._currNode.nodes.push(l), this._nodes.push(l);
    }
    _endBlockNode(l, f) {
      const N = this._currNode;
      if (N instanceof l || f && N instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${l.kind}/${f.kind}` : l.kind}"`);
    }
    _elseNode(l) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = l, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const l = this._nodes;
      return l[l.length - 1];
    }
    set _currNode(l) {
      const f = this._nodes;
      f[f.length - 1] = l;
    }
  }
  e.CodeGen = z;
  function X(b, l) {
    for (const f in l)
      b[f] = (b[f] || 0) + (l[f] || 0);
    return b;
  }
  function J(b, l) {
    return l instanceof t._CodeOrName ? X(b, l.names) : b;
  }
  function A(b, l, f) {
    if (b instanceof t.Name)
      return N(b);
    if (!C(b))
      return b;
    return new t._Code(b._items.reduce((M, Y) => (Y instanceof t.Name && (Y = N(Y)), Y instanceof t._Code ? M.push(...Y._items) : M.push(Y), M), []));
    function N(M) {
      const Y = f[M.str];
      return Y === void 0 || l[M.str] !== 1 ? M : (delete l[M.str], Y);
    }
    function C(M) {
      return M instanceof t._Code && M._items.some((Y) => Y instanceof t.Name && l[Y.str] === 1 && f[Y.str] !== void 0);
    }
  }
  function L(b, l) {
    for (const f in l)
      b[f] = (b[f] || 0) - (l[f] || 0);
  }
  function H(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${R(b)}`;
  }
  e.not = H;
  const q = g(e.operators.AND);
  function Q(...b) {
    return b.reduce(q);
  }
  e.and = Q;
  const G = g(e.operators.OR);
  function I(...b) {
    return b.reduce(G);
  }
  e.or = I;
  function g(b) {
    return (l, f) => l === t.nil ? f : f === t.nil ? l : (0, t._)`${R(l)} ${b} ${R(f)}`;
  }
  function R(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(re);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const me = re, Xu = Hr;
function Yu(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = Yu;
function Qu(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Kc(e, t), !Gc(t, e.self.RULES.all));
}
K.alwaysValidSchema = Qu;
function Kc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Wc(e, `unknown keyword: "${a}"`);
}
K.checkUnknownRules = Kc;
function Gc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = Gc;
function Zu(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = Zu;
function xu({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, me._)`${r}`;
  }
  return (0, me._)`${e}${t}${(0, me.getProperty)(n)}`;
}
K.schemaRefOrVal = xu;
function ed(e) {
  return Hc(decodeURIComponent(e));
}
K.unescapeFragment = ed;
function td(e) {
  return encodeURIComponent(ia(e));
}
K.escapeFragment = td;
function ia(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = ia;
function Hc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = Hc;
function rd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = rd;
function ii({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const c = i === void 0 ? a : i instanceof me.Name ? (a instanceof me.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof me.Name ? (t(s, i, a), a) : r(a, i);
    return o === me.Name && !(c instanceof me.Name) ? n(s, c) : c;
  };
}
K.mergeEvaluated = {
  props: ii({
    mergeNames: (e, t, r) => e.if((0, me._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, me._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, me._)`${r} || {}`).code((0, me._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, me._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, me._)`${r} || {}`), ca(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Bc
  }),
  items: ii({
    mergeNames: (e, t, r) => e.if((0, me._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, me._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, me._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, me._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Bc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, me._)`{}`);
  return t !== void 0 && ca(e, r, t), r;
}
K.evaluatedPropsToName = Bc;
function ca(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, me._)`${t}${(0, me.getProperty)(n)}`, !0));
}
K.setEvaluated = ca;
const ci = {};
function nd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ci[t.code] || (ci[t.code] = new Xu._Code(t.code))
  });
}
K.useFunc = nd;
var Fs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Fs || (K.Type = Fs = {}));
function sd(e, t, r) {
  if (e instanceof me.Name) {
    const n = t === Fs.Num;
    return r ? n ? (0, me._)`"[" + ${e} + "]"` : (0, me._)`"['" + ${e} + "']"` : n ? (0, me._)`"/" + ${e}` : (0, me._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, me.getProperty)(e).toString() : "/" + ia(e);
}
K.getErrorPath = sd;
function Wc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = Wc;
var tn = {}, li;
function nt() {
  if (li) return tn;
  li = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  const e = re, t = {
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
  return tn.default = t, tn;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = re, r = K, n = nt();
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function s(_, m = e.keywordError, E, P) {
    const { it: T } = _, { gen: k, compositeRule: V, allErrors: U } = T, x = h(_, m, E);
    P ?? (V || U) ? c(k, x) : d(T, (0, t._)`[${x}]`);
  }
  e.reportError = s;
  function a(_, m = e.keywordError, E) {
    const { it: P } = _, { gen: T, compositeRule: k, allErrors: V } = P, U = h(_, m, E);
    c(T, U), k || V || d(P, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(_, m) {
    _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function o({ gen: _, keyword: m, schemaValue: E, data: P, errsCount: T, it: k }) {
    if (T === void 0)
      throw new Error("ajv implementation error");
    const V = _.name("err");
    _.forRange("i", T, n.default.errors, (U) => {
      _.const(V, (0, t._)`${n.default.vErrors}[${U}]`), _.if((0, t._)`${V}.instancePath === undefined`, () => _.assign((0, t._)`${V}.instancePath`, (0, t.strConcat)(n.default.instancePath, k.errorPath))), _.assign((0, t._)`${V}.schemaPath`, (0, t.str)`${k.errSchemaPath}/${m}`), k.opts.verbose && (_.assign((0, t._)`${V}.schema`, E), _.assign((0, t._)`${V}.data`, P));
    });
  }
  e.extendErrors = o;
  function c(_, m) {
    const E = _.const("err", m);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function d(_, m) {
    const { gen: E, validateName: P, schemaEnv: T } = _;
    T.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${P}.errors`, m), E.return(!1));
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
  function h(_, m, E) {
    const { createErrors: P } = _.it;
    return P === !1 ? (0, t._)`{}` : w(_, m, E);
  }
  function w(_, m, E = {}) {
    const { gen: P, it: T } = _, k = [
      p(T, E),
      v(_, E)
    ];
    return y(_, m, k), P.object(...k);
  }
  function p({ errorPath: _ }, { instancePath: m }) {
    const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: P }) {
    let T = P ? m : (0, t.str)`${m}/${_}`;
    return E && (T = (0, t.str)`${T}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, T];
  }
  function y(_, { params: m, message: E }, P) {
    const { keyword: T, data: k, schemaValue: V, it: U } = _, { opts: x, propertyName: ne, topSchemaRef: ce, schemaPath: z } = U;
    P.push([u.keyword, T], [u.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), x.messages && P.push([u.message, typeof E == "function" ? E(_) : E]), x.verbose && P.push([u.schema, V], [u.parentSchema, (0, t._)`${ce}${z}`], [n.default.data, k]), ne && P.push([u.propertyName, ne]);
  }
})(Jr);
var ui;
function ad() {
  if (ui) return zt;
  ui = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.boolOrEmptySchema = zt.topBoolOrEmptySchema = void 0;
  const e = Jr, t = re, r = nt(), n = {
    message: "boolean schema is false"
  };
  function s(o) {
    const { gen: c, schema: d, validateName: u } = o;
    d === !1 ? i(o, !1) : typeof d == "object" && d.$async === !0 ? c.return(r.default.data) : (c.assign((0, t._)`${u}.errors`, null), c.return(!0));
  }
  zt.topBoolOrEmptySchema = s;
  function a(o, c) {
    const { gen: d, schema: u } = o;
    u === !1 ? (d.var(c, !1), i(o)) : d.var(c, !0);
  }
  zt.boolOrEmptySchema = a;
  function i(o, c) {
    const { gen: d, data: u } = o, h = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(h, n, void 0, c);
  }
  return zt;
}
var be = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.getRules = Zt.isJSONType = void 0;
const od = ["string", "number", "integer", "boolean", "null", "object", "array"], id = new Set(od);
function cd(e) {
  return typeof e == "string" && id.has(e);
}
Zt.isJSONType = cd;
function ld() {
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
Zt.getRules = ld;
var pt = {}, di;
function Jc() {
  if (di) return pt;
  di = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.shouldUseRule = pt.shouldUseGroup = pt.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, a) {
    const i = s.RULES.types[a];
    return i && i !== !0 && t(n, i);
  }
  pt.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((a) => r(n, a));
  }
  pt.shouldUseGroup = t;
  function r(n, s) {
    var a;
    return n[s.keyword] !== void 0 || ((a = s.definition.implements) === null || a === void 0 ? void 0 : a.some((i) => n[i] !== void 0));
  }
  return pt.shouldUseRule = r, pt;
}
Object.defineProperty(be, "__esModule", { value: !0 });
be.reportTypeError = be.checkDataTypes = be.checkDataType = be.coerceAndCheckDataType = be.getJSONTypes = be.getSchemaTypes = be.DataType = void 0;
const ud = Zt, dd = Jc(), fd = Jr, se = re, Xc = K;
var lr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(lr || (be.DataType = lr = {}));
function hd(e) {
  const t = Yc(e.type);
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
be.getSchemaTypes = hd;
function Yc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ud.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
be.getJSONTypes = Yc;
function md(e, t) {
  const { gen: r, data: n, opts: s } = e, a = pd(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, dd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = la(t, n, s.strictNumbers, lr.Wrong);
    r.if(o, () => {
      a.length ? yd(e, t, a) : ua(e);
    });
  }
  return i;
}
be.coerceAndCheckDataType = md;
const Qc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function pd(e, t) {
  return t ? e.filter((r) => Qc.has(r) || t === "array" && r === "array") : [];
}
function yd(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, se._)`typeof ${s}`), o = n.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && n.if((0, se._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(i, (0, se._)`typeof ${s}`).if(la(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, se._)`${o} !== undefined`);
  for (const d of r)
    (Qc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ua(e), n.endIf(), n.if((0, se._)`${o} !== undefined`, () => {
    n.assign(s, o), $d(e, o);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, se._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(o, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, se._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, se._)`[${s}]`);
    }
  }
}
function $d({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${r}]`, n));
}
function zs(e, t, r, n = lr.Correct) {
  const s = n === lr.Correct ? se.operators.EQ : se.operators.NEQ;
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
      a = i((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, se._)`typeof ${t} ${s} ${e}`;
  }
  return n === lr.Correct ? a : (0, se.not)(a);
  function i(o = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, o, r ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
be.checkDataType = zs;
function la(e, t, r, n) {
  if (e.length === 1)
    return zs(e[0], t, r, n);
  let s;
  const a = (0, Xc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, se._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, se._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = se.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, se.and)(s, zs(i, t, r, n));
  return s;
}
be.checkDataTypes = la;
const gd = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function ua(e) {
  const t = _d(e);
  (0, fd.reportError)(t, gd);
}
be.reportTypeError = ua;
function _d(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Xc.schemaRefOrVal)(e, n, "type");
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
var Or = {}, fi;
function vd() {
  if (fi) return Or;
  fi = 1, Object.defineProperty(Or, "__esModule", { value: !0 }), Or.assignDefaults = void 0;
  const e = re, t = K;
  function r(s, a) {
    const { properties: i, items: o } = s.schema;
    if (a === "object" && i)
      for (const c in i)
        n(s, c, i[c].default);
    else a === "array" && Array.isArray(o) && o.forEach((c, d) => n(s, d, c.default));
  }
  Or.assignDefaults = r;
  function n(s, a, i) {
    const { gen: o, compositeRule: c, data: d, opts: u } = s;
    if (i === void 0)
      return;
    const h = (0, e._)`${d}${(0, e.getProperty)(a)}`;
    if (c) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let w = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (w = (0, e._)`${w} || ${h} === null || ${h} === ""`), o.if(w, (0, e._)`${h} = ${(0, e.stringify)(i)}`);
  }
  return Or;
}
var Je = {}, he = {}, hi;
function st() {
  if (hi) return he;
  hi = 1, Object.defineProperty(he, "__esModule", { value: !0 }), he.validateUnion = he.validateArray = he.usePattern = he.callValidateCode = he.schemaProperties = he.allSchemaProperties = he.noPropertyInData = he.propertyInData = he.isOwnProperty = he.hasPropFunc = he.reportMissingProp = he.checkMissingProp = he.checkReportMissingProp = void 0;
  const e = re, t = K, r = nt(), n = K;
  function s(E, P) {
    const { gen: T, data: k, it: V } = E;
    T.if(u(T, k, P, V.opts.ownProperties), () => {
      E.setParams({ missingProperty: (0, e._)`${P}` }, !0), E.error();
    });
  }
  he.checkReportMissingProp = s;
  function a({ gen: E, data: P, it: { opts: T } }, k, V) {
    return (0, e.or)(...k.map((U) => (0, e.and)(u(E, P, U, T.ownProperties), (0, e._)`${V} = ${U}`)));
  }
  he.checkMissingProp = a;
  function i(E, P) {
    E.setParams({ missingProperty: P }, !0), E.error();
  }
  he.reportMissingProp = i;
  function o(E) {
    return E.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  he.hasPropFunc = o;
  function c(E, P, T) {
    return (0, e._)`${o(E)}.call(${P}, ${T})`;
  }
  he.isOwnProperty = c;
  function d(E, P, T, k) {
    const V = (0, e._)`${P}${(0, e.getProperty)(T)} !== undefined`;
    return k ? (0, e._)`${V} && ${c(E, P, T)}` : V;
  }
  he.propertyInData = d;
  function u(E, P, T, k) {
    const V = (0, e._)`${P}${(0, e.getProperty)(T)} === undefined`;
    return k ? (0, e.or)(V, (0, e.not)(c(E, P, T))) : V;
  }
  he.noPropertyInData = u;
  function h(E) {
    return E ? Object.keys(E).filter((P) => P !== "__proto__") : [];
  }
  he.allSchemaProperties = h;
  function w(E, P) {
    return h(P).filter((T) => !(0, t.alwaysValidSchema)(E, P[T]));
  }
  he.schemaProperties = w;
  function p({ schemaCode: E, data: P, it: { gen: T, topSchemaRef: k, schemaPath: V, errorPath: U }, it: x }, ne, ce, z) {
    const X = z ? (0, e._)`${E}, ${P}, ${k}${V}` : P, J = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, U)],
      [r.default.parentData, x.parentData],
      [r.default.parentDataProperty, x.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    x.opts.dynamicRef && J.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const A = (0, e._)`${X}, ${T.object(...J)}`;
    return ce !== e.nil ? (0, e._)`${ne}.call(${ce}, ${A})` : (0, e._)`${ne}(${A})`;
  }
  he.callValidateCode = p;
  const v = (0, e._)`new RegExp`;
  function y({ gen: E, it: { opts: P } }, T) {
    const k = P.unicodeRegExp ? "u" : "", { regExp: V } = P.code, U = V(T, k);
    return E.scopeValue("pattern", {
      key: U.toString(),
      ref: U,
      code: (0, e._)`${V.code === "new RegExp" ? v : (0, n.useFunc)(E, V)}(${T}, ${k})`
    });
  }
  he.usePattern = y;
  function _(E) {
    const { gen: P, data: T, keyword: k, it: V } = E, U = P.name("valid");
    if (V.allErrors) {
      const ne = P.let("valid", !0);
      return x(() => P.assign(ne, !1)), ne;
    }
    return P.var(U, !0), x(() => P.break()), U;
    function x(ne) {
      const ce = P.const("len", (0, e._)`${T}.length`);
      P.forRange("i", 0, ce, (z) => {
        E.subschema({
          keyword: k,
          dataProp: z,
          dataPropType: t.Type.Num
        }, U), P.if((0, e.not)(U), ne);
      });
    }
  }
  he.validateArray = _;
  function m(E) {
    const { gen: P, schema: T, keyword: k, it: V } = E;
    if (!Array.isArray(T))
      throw new Error("ajv implementation error");
    if (T.some((ce) => (0, t.alwaysValidSchema)(V, ce)) && !V.opts.unevaluated)
      return;
    const x = P.let("valid", !1), ne = P.name("_valid");
    P.block(() => T.forEach((ce, z) => {
      const X = E.subschema({
        keyword: k,
        schemaProp: z,
        compositeRule: !0
      }, ne);
      P.assign(x, (0, e._)`${x} || ${ne}`), E.mergeValidEvaluated(X, ne) || P.if((0, e.not)(x));
    })), E.result(x, () => E.reset(), () => E.error(!0));
  }
  return he.validateUnion = m, he;
}
var mi;
function wd() {
  if (mi) return Je;
  mi = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.validateKeywordUsage = Je.validSchemaType = Je.funcKeywordCode = Je.macroKeywordCode = void 0;
  const e = re, t = nt(), r = st(), n = Jr;
  function s(w, p) {
    const { gen: v, keyword: y, schema: _, parentSchema: m, it: E } = w, P = p.macro.call(E.self, _, m, E), T = d(v, y, P);
    E.opts.validateSchema !== !1 && E.self.validateSchema(P, !0);
    const k = v.name("valid");
    w.subschema({
      schema: P,
      schemaPath: e.nil,
      errSchemaPath: `${E.errSchemaPath}/${y}`,
      topSchemaRef: T,
      compositeRule: !0
    }, k), w.pass(k, () => w.error(!0));
  }
  Je.macroKeywordCode = s;
  function a(w, p) {
    var v;
    const { gen: y, keyword: _, schema: m, parentSchema: E, $data: P, it: T } = w;
    c(T, p);
    const k = !P && p.compile ? p.compile.call(T.self, m, E, T) : p.validate, V = d(y, _, k), U = y.let("valid");
    w.block$data(U, x), w.ok((v = p.valid) !== null && v !== void 0 ? v : U);
    function x() {
      if (p.errors === !1)
        z(), p.modifying && i(w), X(() => w.error());
      else {
        const J = p.async ? ne() : ce();
        p.modifying && i(w), X(() => o(w, J));
      }
    }
    function ne() {
      const J = y.let("ruleErrs", null);
      return y.try(() => z((0, e._)`await `), (A) => y.assign(U, !1).if((0, e._)`${A} instanceof ${T.ValidationError}`, () => y.assign(J, (0, e._)`${A}.errors`), () => y.throw(A))), J;
    }
    function ce() {
      const J = (0, e._)`${V}.errors`;
      return y.assign(J, null), z(e.nil), J;
    }
    function z(J = p.async ? (0, e._)`await ` : e.nil) {
      const A = T.opts.passContext ? t.default.this : t.default.self, L = !("compile" in p && !P || p.schema === !1);
      y.assign(U, (0, e._)`${J}${(0, r.callValidateCode)(w, V, A, L)}`, p.modifying);
    }
    function X(J) {
      var A;
      y.if((0, e.not)((A = p.valid) !== null && A !== void 0 ? A : U), J);
    }
  }
  Je.funcKeywordCode = a;
  function i(w) {
    const { gen: p, data: v, it: y } = w;
    p.if(y.parentData, () => p.assign(v, (0, e._)`${y.parentData}[${y.parentDataProperty}]`));
  }
  function o(w, p) {
    const { gen: v } = w;
    v.if((0, e._)`Array.isArray(${p})`, () => {
      v.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(w);
    }, () => w.error());
  }
  function c({ schemaEnv: w }, p) {
    if (p.async && !w.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(w, p, v) {
    if (v === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return w.scopeValue("keyword", typeof v == "function" ? { ref: v } : { ref: v, code: (0, e.stringify)(v) });
  }
  function u(w, p, v = !1) {
    return !p.length || p.some((y) => y === "array" ? Array.isArray(w) : y === "object" ? w && typeof w == "object" && !Array.isArray(w) : typeof w == y || v && typeof w > "u");
  }
  Je.validSchemaType = u;
  function h({ schema: w, opts: p, self: v, errSchemaPath: y }, _, m) {
    if (Array.isArray(_.keyword) ? !_.keyword.includes(m) : _.keyword !== m)
      throw new Error("ajv implementation error");
    const E = _.dependencies;
    if (E != null && E.some((P) => !Object.prototype.hasOwnProperty.call(w, P)))
      throw new Error(`parent schema must have dependencies of ${m}: ${E.join(",")}`);
    if (_.validateSchema && !_.validateSchema(w[m])) {
      const T = `keyword "${m}" value is invalid at path "${y}": ` + v.errorsText(_.validateSchema.errors);
      if (p.validateSchema === "log")
        v.logger.error(T);
      else
        throw new Error(T);
    }
  }
  return Je.validateKeywordUsage = h, Je;
}
var yt = {}, pi;
function Ed() {
  if (pi) return yt;
  pi = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.extendSubschemaMode = yt.extendSubschemaData = yt.getSubschema = void 0;
  const e = re, t = K;
  function r(a, { keyword: i, schemaProp: o, schema: c, schemaPath: d, errSchemaPath: u, topSchemaRef: h }) {
    if (i !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const w = a.schema[i];
      return o === void 0 ? {
        schema: w,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}`
      } : {
        schema: w[o],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (c !== void 0) {
      if (d === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  yt.getSubschema = r;
  function n(a, i, { dataProp: o, dataPropType: c, data: d, dataTypes: u, propertyName: h }) {
    if (d !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: w } = i;
    if (o !== void 0) {
      const { errorPath: v, dataPathArr: y, opts: _ } = i, m = w.let("data", (0, e._)`${i.data}${(0, e.getProperty)(o)}`, !0);
      p(m), a.errorPath = (0, e.str)`${v}${(0, t.getErrorPath)(o, c, _.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${o}`, a.dataPathArr = [...y, a.parentDataProperty];
    }
    if (d !== void 0) {
      const v = d instanceof e.Name ? d : w.let("data", d, !0);
      p(v), h !== void 0 && (a.propertyName = h);
    }
    u && (a.dataTypes = u);
    function p(v) {
      a.data = v, a.dataLevel = i.dataLevel + 1, a.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), a.parentData = i.data, a.dataNames = [...i.dataNames, v];
    }
  }
  yt.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: i, jtdMetadata: o, compositeRule: c, createErrors: d, allErrors: u }) {
    c !== void 0 && (a.compositeRule = c), d !== void 0 && (a.createErrors = d), u !== void 0 && (a.allErrors = u), a.jtdDiscriminator = i, a.jtdMetadata = o;
  }
  return yt.extendSubschemaMode = s, yt;
}
var Oe = {}, Bn = function e(t, r) {
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
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Zc = { exports: {} }, Ct = Zc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Sn(t, n, s, e, "", e);
};
Ct.keywords = {
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
Ct.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ct.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ct.skipKeywords = {
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
function Sn(e, t, r, n, s, a, i, o, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Ct.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            Sn(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in Ct.propsKeywords) {
        if (h && typeof h == "object")
          for (var p in h)
            Sn(e, t, r, h[p], s + "/" + u + "/" + bd(p), a, s, u, n, p);
      } else (u in Ct.keywords || e.allKeys && !(u in Ct.skipKeywords)) && Sn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, o, c, d);
  }
}
function bd(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Sd = Zc.exports;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.getSchemaRefs = Oe.resolveUrl = Oe.normalizeId = Oe._getFullPath = Oe.getFullPath = Oe.inlineRef = void 0;
const Pd = K, Nd = Bn, Rd = Sd, Od = /* @__PURE__ */ new Set([
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
function Id(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Us(e) : t ? xc(e) <= t : !1;
}
Oe.inlineRef = Id;
const Td = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Us(e) {
  for (const t in e) {
    if (Td.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Us) || typeof r == "object" && Us(r))
      return !0;
  }
  return !1;
}
function xc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Od.has(r) && (typeof e[r] == "object" && (0, Pd.eachItem)(e[r], (n) => t += xc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function el(e, t = "", r) {
  r !== !1 && (t = ur(t));
  const n = e.parse(t);
  return tl(e, n);
}
Oe.getFullPath = el;
function tl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Oe._getFullPath = tl;
const jd = /#\/?$/;
function ur(e) {
  return e ? e.replace(jd, "") : "";
}
Oe.normalizeId = ur;
function kd(e, t, r) {
  return r = ur(r), e.resolve(t, r);
}
Oe.resolveUrl = kd;
const Ad = /^[a-z_][-a-z0-9._]*$/i;
function Cd(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = ur(e[r] || t), a = { "": s }, i = el(n, s, !1), o = {}, c = /* @__PURE__ */ new Set();
  return Rd(e, { allKeys: !0 }, (h, w, p, v) => {
    if (v === void 0)
      return;
    const y = i + w;
    let _ = a[v];
    typeof h[r] == "string" && (_ = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[w] = _;
    function m(P) {
      const T = this.opts.uriResolver.resolve;
      if (P = ur(_ ? T(_, P) : P), c.has(P))
        throw u(P);
      c.add(P);
      let k = this.refs[P];
      return typeof k == "string" && (k = this.refs[k]), typeof k == "object" ? d(h, k.schema, P) : P !== ur(y) && (P[0] === "#" ? (d(h, o[P], P), o[P] = h) : this.refs[P] = y), P;
    }
    function E(P) {
      if (typeof P == "string") {
        if (!Ad.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), o;
  function d(h, w, p) {
    if (w !== void 0 && !Nd(h, w))
      throw u(p);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Oe.getSchemaRefs = Cd;
var yi;
function Wn() {
  if (yi) return mt;
  yi = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.getData = mt.KeywordCxt = mt.validateFunctionCode = void 0;
  const e = ad(), t = be, r = Jc(), n = be, s = vd(), a = wd(), i = Ed(), o = re, c = nt(), d = Oe, u = K, h = Jr;
  function w($) {
    if (k($) && (U($), T($))) {
      _($);
      return;
    }
    p($, () => (0, e.topBoolOrEmptySchema)($));
  }
  mt.validateFunctionCode = w;
  function p({ gen: $, validateName: S, schema: O, schemaEnv: j, opts: D }, F) {
    D.code.es5 ? $.func(S, (0, o._)`${c.default.data}, ${c.default.valCxt}`, j.$async, () => {
      $.code((0, o._)`"use strict"; ${E(O, D)}`), y($, D), $.code(F);
    }) : $.func(S, (0, o._)`${c.default.data}, ${v(D)}`, j.$async, () => $.code(E(O, D)).code(F));
  }
  function v($) {
    return (0, o._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${$.dynamicRef ? (0, o._)`, ${c.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function y($, S) {
    $.if(c.default.valCxt, () => {
      $.var(c.default.instancePath, (0, o._)`${c.default.valCxt}.${c.default.instancePath}`), $.var(c.default.parentData, (0, o._)`${c.default.valCxt}.${c.default.parentData}`), $.var(c.default.parentDataProperty, (0, o._)`${c.default.valCxt}.${c.default.parentDataProperty}`), $.var(c.default.rootData, (0, o._)`${c.default.valCxt}.${c.default.rootData}`), S.dynamicRef && $.var(c.default.dynamicAnchors, (0, o._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      $.var(c.default.instancePath, (0, o._)`""`), $.var(c.default.parentData, (0, o._)`undefined`), $.var(c.default.parentDataProperty, (0, o._)`undefined`), $.var(c.default.rootData, c.default.data), S.dynamicRef && $.var(c.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function _($) {
    const { schema: S, opts: O, gen: j } = $;
    p($, () => {
      O.$comment && S.$comment && J($), ce($), j.let(c.default.vErrors, null), j.let(c.default.errors, 0), O.unevaluated && m($), x($), A($);
    });
  }
  function m($) {
    const { gen: S, validateName: O } = $;
    $.evaluated = S.const("evaluated", (0, o._)`${O}.evaluated`), S.if((0, o._)`${$.evaluated}.dynamicProps`, () => S.assign((0, o._)`${$.evaluated}.props`, (0, o._)`undefined`)), S.if((0, o._)`${$.evaluated}.dynamicItems`, () => S.assign((0, o._)`${$.evaluated}.items`, (0, o._)`undefined`));
  }
  function E($, S) {
    const O = typeof $ == "object" && $[S.schemaId];
    return O && (S.code.source || S.code.process) ? (0, o._)`/*# sourceURL=${O} */` : o.nil;
  }
  function P($, S) {
    if (k($) && (U($), T($))) {
      V($, S);
      return;
    }
    (0, e.boolOrEmptySchema)($, S);
  }
  function T({ schema: $, self: S }) {
    if (typeof $ == "boolean")
      return !$;
    for (const O in $)
      if (S.RULES.all[O])
        return !0;
    return !1;
  }
  function k($) {
    return typeof $.schema != "boolean";
  }
  function V($, S) {
    const { schema: O, gen: j, opts: D } = $;
    D.$comment && O.$comment && J($), z($), X($);
    const F = j.const("_errs", c.default.errors);
    x($, F), j.var(S, (0, o._)`${F} === ${c.default.errors}`);
  }
  function U($) {
    (0, u.checkUnknownRules)($), ne($);
  }
  function x($, S) {
    if ($.opts.jtd)
      return H($, [], !1, S);
    const O = (0, t.getSchemaTypes)($.schema), j = (0, t.coerceAndCheckDataType)($, O);
    H($, O, !j, S);
  }
  function ne($) {
    const { schema: S, errSchemaPath: O, opts: j, self: D } = $;
    S.$ref && j.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(S, D.RULES) && D.logger.warn(`$ref: keywords ignored in schema at path "${O}"`);
  }
  function ce($) {
    const { schema: S, opts: O } = $;
    S.default !== void 0 && O.useDefaults && O.strictSchema && (0, u.checkStrictMode)($, "default is ignored in the schema root");
  }
  function z($) {
    const S = $.schema[$.opts.schemaId];
    S && ($.baseId = (0, d.resolveUrl)($.opts.uriResolver, $.baseId, S));
  }
  function X($) {
    if ($.schema.$async && !$.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function J({ gen: $, schemaEnv: S, schema: O, errSchemaPath: j, opts: D }) {
    const F = O.$comment;
    if (D.$comment === !0)
      $.code((0, o._)`${c.default.self}.logger.log(${F})`);
    else if (typeof D.$comment == "function") {
      const le = (0, o.str)`${j}/$comment`, _e = $.scopeValue("root", { ref: S.root });
      $.code((0, o._)`${c.default.self}.opts.$comment(${F}, ${le}, ${_e}.schema)`);
    }
  }
  function A($) {
    const { gen: S, schemaEnv: O, validateName: j, ValidationError: D, opts: F } = $;
    O.$async ? S.if((0, o._)`${c.default.errors} === 0`, () => S.return(c.default.data), () => S.throw((0, o._)`new ${D}(${c.default.vErrors})`)) : (S.assign((0, o._)`${j}.errors`, c.default.vErrors), F.unevaluated && L($), S.return((0, o._)`${c.default.errors} === 0`));
  }
  function L({ gen: $, evaluated: S, props: O, items: j }) {
    O instanceof o.Name && $.assign((0, o._)`${S}.props`, O), j instanceof o.Name && $.assign((0, o._)`${S}.items`, j);
  }
  function H($, S, O, j) {
    const { gen: D, schema: F, data: le, allErrors: _e, opts: de, self: fe } = $, { RULES: ue } = fe;
    if (F.$ref && (de.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(F, ue))) {
      D.block(() => C($, "$ref", ue.all.$ref.definition));
      return;
    }
    de.jtd || Q($, S), D.block(() => {
      for (const ye of ue.rules)
        Ue(ye);
      Ue(ue.post);
    });
    function Ue(ye) {
      (0, r.shouldUseGroup)(F, ye) && (ye.type ? (D.if((0, n.checkDataType)(ye.type, le, de.strictNumbers)), q($, ye), S.length === 1 && S[0] === ye.type && O && (D.else(), (0, n.reportTypeError)($)), D.endIf()) : q($, ye), _e || D.if((0, o._)`${c.default.errors} === ${j || 0}`));
    }
  }
  function q($, S) {
    const { gen: O, schema: j, opts: { useDefaults: D } } = $;
    D && (0, s.assignDefaults)($, S.type), O.block(() => {
      for (const F of S.rules)
        (0, r.shouldUseRule)(j, F) && C($, F.keyword, F.definition, S.type);
    });
  }
  function Q($, S) {
    $.schemaEnv.meta || !$.opts.strictTypes || (G($, S), $.opts.allowUnionTypes || I($, S), g($, $.dataTypes));
  }
  function G($, S) {
    if (S.length) {
      if (!$.dataTypes.length) {
        $.dataTypes = S;
        return;
      }
      S.forEach((O) => {
        b($.dataTypes, O) || f($, `type "${O}" not allowed by context "${$.dataTypes.join(",")}"`);
      }), l($, S);
    }
  }
  function I($, S) {
    S.length > 1 && !(S.length === 2 && S.includes("null")) && f($, "use allowUnionTypes to allow union type keyword");
  }
  function g($, S) {
    const O = $.self.RULES.all;
    for (const j in O) {
      const D = O[j];
      if (typeof D == "object" && (0, r.shouldUseRule)($.schema, D)) {
        const { type: F } = D.definition;
        F.length && !F.some((le) => R(S, le)) && f($, `missing type "${F.join(",")}" for keyword "${j}"`);
      }
    }
  }
  function R($, S) {
    return $.includes(S) || S === "number" && $.includes("integer");
  }
  function b($, S) {
    return $.includes(S) || S === "integer" && $.includes("number");
  }
  function l($, S) {
    const O = [];
    for (const j of $.dataTypes)
      b(S, j) ? O.push(j) : S.includes("integer") && j === "number" && O.push("integer");
    $.dataTypes = O;
  }
  function f($, S) {
    const O = $.schemaEnv.baseId + $.errSchemaPath;
    S += ` at "${O}" (strictTypes)`, (0, u.checkStrictMode)($, S, $.opts.strictTypes);
  }
  class N {
    constructor(S, O, j) {
      if ((0, a.validateKeywordUsage)(S, O, j), this.gen = S.gen, this.allErrors = S.allErrors, this.keyword = j, this.data = S.data, this.schema = S.schema[j], this.$data = O.$data && S.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(S, this.schema, j, this.$data), this.schemaType = O.schemaType, this.parentSchema = S.schema, this.params = {}, this.it = S, this.def = O, this.$data)
        this.schemaCode = S.gen.const("vSchema", B(this.$data, S));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, O.schemaType, O.allowUndefined))
        throw new Error(`${j} value must be ${JSON.stringify(O.schemaType)}`);
      ("code" in O ? O.trackErrors : O.errors !== !1) && (this.errsCount = S.gen.const("_errs", c.default.errors));
    }
    result(S, O, j) {
      this.failResult((0, o.not)(S), O, j);
    }
    failResult(S, O, j) {
      this.gen.if(S), j ? j() : this.error(), O ? (this.gen.else(), O(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(S, O) {
      this.failResult((0, o.not)(S), void 0, O);
    }
    fail(S) {
      if (S === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(S), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(S) {
      if (!this.$data)
        return this.fail(S);
      const { schemaCode: O } = this;
      this.fail((0, o._)`${O} !== undefined && (${(0, o.or)(this.invalid$data(), S)})`);
    }
    error(S, O, j) {
      if (O) {
        this.setParams(O), this._error(S, j), this.setParams({});
        return;
      }
      this._error(S, j);
    }
    _error(S, O) {
      (S ? h.reportExtraError : h.reportError)(this, this.def.error, O);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(S) {
      this.allErrors || this.gen.if(S);
    }
    setParams(S, O) {
      O ? Object.assign(this.params, S) : this.params = S;
    }
    block$data(S, O, j = o.nil) {
      this.gen.block(() => {
        this.check$data(S, j), O();
      });
    }
    check$data(S = o.nil, O = o.nil) {
      if (!this.$data)
        return;
      const { gen: j, schemaCode: D, schemaType: F, def: le } = this;
      j.if((0, o.or)((0, o._)`${D} === undefined`, O)), S !== o.nil && j.assign(S, !0), (F.length || le.validateSchema) && (j.elseIf(this.invalid$data()), this.$dataError(), S !== o.nil && j.assign(S, !1)), j.else();
    }
    invalid$data() {
      const { gen: S, schemaCode: O, schemaType: j, def: D, it: F } = this;
      return (0, o.or)(le(), _e());
      function le() {
        if (j.length) {
          if (!(O instanceof o.Name))
            throw new Error("ajv implementation error");
          const de = Array.isArray(j) ? j : [j];
          return (0, o._)`${(0, n.checkDataTypes)(de, O, F.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function _e() {
        if (D.validateSchema) {
          const de = S.scopeValue("validate$data", { ref: D.validateSchema });
          return (0, o._)`!${de}(${O})`;
        }
        return o.nil;
      }
    }
    subschema(S, O) {
      const j = (0, i.getSubschema)(this.it, S);
      (0, i.extendSubschemaData)(j, this.it, S), (0, i.extendSubschemaMode)(j, S);
      const D = { ...this.it, ...j, items: void 0, props: void 0 };
      return P(D, O), D;
    }
    mergeEvaluated(S, O) {
      const { it: j, gen: D } = this;
      j.opts.unevaluated && (j.props !== !0 && S.props !== void 0 && (j.props = u.mergeEvaluated.props(D, S.props, j.props, O)), j.items !== !0 && S.items !== void 0 && (j.items = u.mergeEvaluated.items(D, S.items, j.items, O)));
    }
    mergeValidEvaluated(S, O) {
      const { it: j, gen: D } = this;
      if (j.opts.unevaluated && (j.props !== !0 || j.items !== !0))
        return D.if(O, () => this.mergeEvaluated(S, o.Name)), !0;
    }
  }
  mt.KeywordCxt = N;
  function C($, S, O, j) {
    const D = new N($, O, S);
    "code" in O ? O.code(D, j) : D.$data && O.validate ? (0, a.funcKeywordCode)(D, O) : "macro" in O ? (0, a.macroKeywordCode)(D, O) : (O.compile || O.validate) && (0, a.funcKeywordCode)(D, O);
  }
  const M = /^\/(?:[^~]|~0|~1)*$/, Y = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function B($, { dataLevel: S, dataNames: O, dataPathArr: j }) {
    let D, F;
    if ($ === "")
      return c.default.rootData;
    if ($[0] === "/") {
      if (!M.test($))
        throw new Error(`Invalid JSON-pointer: ${$}`);
      D = $, F = c.default.rootData;
    } else {
      const fe = Y.exec($);
      if (!fe)
        throw new Error(`Invalid JSON-pointer: ${$}`);
      const ue = +fe[1];
      if (D = fe[2], D === "#") {
        if (ue >= S)
          throw new Error(de("property/index", ue));
        return j[S - ue];
      }
      if (ue > S)
        throw new Error(de("data", ue));
      if (F = O[S - ue], !D)
        return F;
    }
    let le = F;
    const _e = D.split("/");
    for (const fe of _e)
      fe && (F = (0, o._)`${F}${(0, o.getProperty)((0, u.unescapeJsonPointer)(fe))}`, le = (0, o._)`${le} && ${F}`);
    return le;
    function de(fe, ue) {
      return `Cannot access ${fe} ${ue} levels up, current level is ${S}`;
    }
  }
  return mt.getData = B, mt;
}
var Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
class Dd extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Xr.default = Dd;
var $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
const $s = Oe;
let Md = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $s.resolveUrl)(t, r, n), this.missingSchema = (0, $s.normalizeId)((0, $s.getFullPath)(t, this.missingRef));
  }
};
$r.default = Md;
var De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.resolveSchema = De.getCompilingSchema = De.resolveRef = De.compileSchema = De.SchemaEnv = void 0;
const Xe = re, Ld = Xr, Ut = nt(), tt = Oe, $i = K, Vd = Wn();
let Jn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, tt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
De.SchemaEnv = Jn;
function da(e) {
  const t = rl.call(this, e);
  if (t)
    return t;
  const r = (0, tt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: Ld.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Ut.default.data,
    parentData: Ut.default.parentData,
    parentDataProperty: Ut.default.parentDataProperty,
    dataNames: [Ut.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Vd.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(Ut.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const p = new Function(`${Ut.default.self}`, `${Ut.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: y } = d;
      p.evaluated = {
        props: v instanceof Xe.Name ? void 0 : v,
        items: y instanceof Xe.Name ? void 0 : y,
        dynamicProps: v instanceof Xe.Name,
        dynamicItems: y instanceof Xe.Name
      }, p.source && (p.source.evaluated = (0, Xe.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
De.compileSchema = da;
function Fd(e, t, r) {
  var n;
  r = (0, tt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = qd.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new Jn({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = zd.call(this, a);
}
De.resolveRef = Fd;
function zd(e) {
  return (0, tt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : da.call(this, e);
}
function rl(e) {
  for (const t of this._compilations)
    if (Ud(t, e))
      return t;
}
De.getCompilingSchema = rl;
function Ud(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function qd(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Xn.call(this, e, t);
}
function Xn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, tt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, tt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return gs.call(this, r, e);
  const a = (0, tt.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = Xn.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : gs.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || da.call(this, i), a === (0, tt.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: c } = this.opts, d = o[c];
      return d && (s = (0, tt.resolveUrl)(this.opts.uriResolver, s, d)), new Jn({ schema: o, schemaId: c, root: e, baseId: s });
    }
    return gs.call(this, r, i);
  }
}
De.resolveSchema = Xn;
const Kd = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function gs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, $i.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Kd.has(o) && d && (t = (0, tt.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, $i.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, tt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Xn.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Jn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Gd = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Hd = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Bd = "object", Wd = [
  "$data"
], Jd = {
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
}, Xd = !1, Yd = {
  $id: Gd,
  description: Hd,
  type: Bd,
  required: Wd,
  properties: Jd,
  additionalProperties: Xd
};
var fa = {}, Yn = { exports: {} };
const Qd = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), nl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function sl(e) {
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
const Zd = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function gi(e) {
  return e.length = 0, !0;
}
function xd(e, t, r) {
  if (e.length) {
    const n = sl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function ef(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, o = xd;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !o(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!o(s, n, r))
          break;
        o = gi;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (o === gi ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(sl(s))), r.address = n.join(""), r;
}
function al(e) {
  if (tf(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = ef(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function tf(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function rf(e) {
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
function nf(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function sf(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!nl(r)) {
      const n = al(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var ol = {
  nonSimpleDomain: Zd,
  recomposeAuthority: sf,
  normalizeComponentEncoding: nf,
  removeDotSegments: rf,
  isIPv4: nl,
  isUUID: Qd,
  normalizeIPv6: al
};
const { isUUID: af } = ol, of = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function il(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function cl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function ll(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function cf(e) {
  return e.secure = il(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function lf(e) {
  if ((e.port === (il(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function uf(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(of);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = ha(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function df(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = ha(s);
  a && (e = a.serialize(e, t));
  const i = e, o = e.nss;
  return i.path = `${n || t.nid}:${o}`, t.skipEscape = !0, i;
}
function ff(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !af(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function hf(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const ul = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: cl,
    serialize: ll
  }
), mf = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: ul.domainHost,
    parse: cl,
    serialize: ll
  }
), Pn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: cf,
    serialize: lf
  }
), pf = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Pn.domainHost,
    parse: Pn.parse,
    serialize: Pn.serialize
  }
), yf = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: uf,
    serialize: df,
    skipNormalize: !0
  }
), $f = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: ff,
    serialize: hf,
    skipNormalize: !0
  }
), Cn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: ul,
    https: mf,
    ws: Pn,
    wss: pf,
    urn: yf,
    "urn:uuid": $f
  }
);
Object.setPrototypeOf(Cn, null);
function ha(e) {
  return e && (Cn[
    /** @type {SchemeName} */
    e
  ] || Cn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var gf = {
  SCHEMES: Cn,
  getSchemeHandler: ha
};
const { normalizeIPv6: _f, removeDotSegments: Ar, recomposeAuthority: vf, normalizeComponentEncoding: rn, isIPv4: wf, nonSimpleDomain: Ef } = ol, { SCHEMES: bf, getSchemeHandler: dl } = gf;
function Sf(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ut(vt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  vt(ut(e, t), t)), e;
}
function Pf(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = fl(vt(e, n), vt(t, n), n, !0);
  return n.skipEscape = !0, ut(s, n);
}
function fl(e, t, r, n) {
  const s = {};
  return n || (e = vt(ut(e, r), r), t = vt(ut(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ar(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ar(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Ar(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Ar(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Nf(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ut(rn(vt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ut(rn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ut(rn(vt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ut(rn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ut(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = dl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = vf(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = Ar(o)), i === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), s.push(o);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Rf = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function vt(e, t) {
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
  const a = e.match(Rf);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (wf(n.host) === !1) {
        const c = _f(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = dl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Ef(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (o) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + o;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const ma = {
  SCHEMES: bf,
  normalize: Sf,
  resolve: Pf,
  resolveComponent: fl,
  equal: Nf,
  serialize: ut,
  parse: vt
};
Yn.exports = ma;
Yn.exports.default = ma;
Yn.exports.fastUri = ma;
var hl = Yn.exports;
Object.defineProperty(fa, "__esModule", { value: !0 });
const ml = hl;
ml.code = 'require("ajv/dist/runtime/uri").default';
fa.default = ml;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Wn();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = re;
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
  const n = Xr, s = $r, a = Zt, i = De, o = re, c = Oe, d = be, u = K, h = Yd, w = fa, p = (I, g) => new RegExp(I, g);
  p.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function P(I) {
    var g, R, b, l, f, N, C, M, Y, B, $, S, O, j, D, F, le, _e, de, fe, ue, Ue, ye, Mt, Lt;
    const We = I.strict, Vt = (g = I.code) === null || g === void 0 ? void 0 : g.optimize, Nr = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Rr = (b = (R = I.code) === null || R === void 0 ? void 0 : R.regExp) !== null && b !== void 0 ? b : p, fs = (l = I.uriResolver) !== null && l !== void 0 ? l : w.default;
    return {
      strictSchema: (N = (f = I.strictSchema) !== null && f !== void 0 ? f : We) !== null && N !== void 0 ? N : !0,
      strictNumbers: (M = (C = I.strictNumbers) !== null && C !== void 0 ? C : We) !== null && M !== void 0 ? M : !0,
      strictTypes: (B = (Y = I.strictTypes) !== null && Y !== void 0 ? Y : We) !== null && B !== void 0 ? B : "log",
      strictTuples: (S = ($ = I.strictTuples) !== null && $ !== void 0 ? $ : We) !== null && S !== void 0 ? S : "log",
      strictRequired: (j = (O = I.strictRequired) !== null && O !== void 0 ? O : We) !== null && j !== void 0 ? j : !1,
      code: I.code ? { ...I.code, optimize: Nr, regExp: Rr } : { optimize: Nr, regExp: Rr },
      loopRequired: (D = I.loopRequired) !== null && D !== void 0 ? D : E,
      loopEnum: (F = I.loopEnum) !== null && F !== void 0 ? F : E,
      meta: (le = I.meta) !== null && le !== void 0 ? le : !0,
      messages: (_e = I.messages) !== null && _e !== void 0 ? _e : !0,
      inlineRefs: (de = I.inlineRefs) !== null && de !== void 0 ? de : !0,
      schemaId: (fe = I.schemaId) !== null && fe !== void 0 ? fe : "$id",
      addUsedSchema: (ue = I.addUsedSchema) !== null && ue !== void 0 ? ue : !0,
      validateSchema: (Ue = I.validateSchema) !== null && Ue !== void 0 ? Ue : !0,
      validateFormats: (ye = I.validateFormats) !== null && ye !== void 0 ? ye : !0,
      unicodeRegExp: (Mt = I.unicodeRegExp) !== null && Mt !== void 0 ? Mt : !0,
      int32range: (Lt = I.int32range) !== null && Lt !== void 0 ? Lt : !0,
      uriResolver: fs
    };
  }
  class T {
    constructor(g = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), g = this.opts = { ...g, ...P(g) };
      const { es5: R, lines: b } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: y, es5: R, lines: b }), this.logger = X(g.logger);
      const l = g.validateFormats;
      g.validateFormats = !1, this.RULES = (0, a.getRules)(), k.call(this, _, g, "NOT SUPPORTED"), k.call(this, m, g, "DEPRECATED", "warn"), this._metaOpts = ce.call(this), g.formats && x.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), g.keywords && ne.call(this, g.keywords), typeof g.meta == "object" && this.addMetaSchema(g.meta), U.call(this), g.validateFormats = l;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: g, meta: R, schemaId: b } = this.opts;
      let l = h;
      b === "id" && (l = { ...h }, l.id = l.$id, delete l.$id), R && g && this.addMetaSchema(l, l[b], !1);
    }
    defaultMeta() {
      const { meta: g, schemaId: R } = this.opts;
      return this.opts.defaultMeta = typeof g == "object" ? g[R] || g : void 0;
    }
    validate(g, R) {
      let b;
      if (typeof g == "string") {
        if (b = this.getSchema(g), !b)
          throw new Error(`no schema with key or ref "${g}"`);
      } else
        b = this.compile(g);
      const l = b(R);
      return "$async" in b || (this.errors = b.errors), l;
    }
    compile(g, R) {
      const b = this._addSchema(g, R);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(g, R) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return l.call(this, g, R);
      async function l(B, $) {
        await f.call(this, B.$schema);
        const S = this._addSchema(B, $);
        return S.validate || N.call(this, S);
      }
      async function f(B) {
        B && !this.getSchema(B) && await l.call(this, { $ref: B }, !0);
      }
      async function N(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch ($) {
          if (!($ instanceof s.default))
            throw $;
          return C.call(this, $), await M.call(this, $.missingSchema), N.call(this, B);
        }
      }
      function C({ missingSchema: B, missingRef: $ }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${$} cannot be resolved`);
      }
      async function M(B) {
        const $ = await Y.call(this, B);
        this.refs[B] || await f.call(this, $.$schema), this.refs[B] || this.addSchema($, B, R);
      }
      async function Y(B) {
        const $ = this._loading[B];
        if ($)
          return $;
        try {
          return await (this._loading[B] = b(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(g, R, b, l = this.opts.validateSchema) {
      if (Array.isArray(g)) {
        for (const N of g)
          this.addSchema(N, void 0, b, l);
        return this;
      }
      let f;
      if (typeof g == "object") {
        const { schemaId: N } = this.opts;
        if (f = g[N], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return R = (0, c.normalizeId)(R || f), this._checkUnique(R), this.schemas[R] = this._addSchema(g, b, R, l, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(g, R, b = this.opts.validateSchema) {
      return this.addSchema(g, R, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(g, R) {
      if (typeof g == "boolean")
        return !0;
      let b;
      if (b = g.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const l = this.validate(b, g);
      if (!l && R) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return l;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(g) {
      let R;
      for (; typeof (R = V.call(this, g)) == "string"; )
        g = R;
      if (R === void 0) {
        const { schemaId: b } = this.opts, l = new i.SchemaEnv({ schema: {}, schemaId: b });
        if (R = i.resolveSchema.call(this, l, g), !R)
          return;
        this.refs[g] = R;
      }
      return R.validate || this._compileSchemaEnv(R);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(g) {
      if (g instanceof RegExp)
        return this._removeAllSchemas(this.schemas, g), this._removeAllSchemas(this.refs, g), this;
      switch (typeof g) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const R = V.call(this, g);
          return typeof R == "object" && this._cache.delete(R.schema), delete this.schemas[g], delete this.refs[g], this;
        }
        case "object": {
          const R = g;
          this._cache.delete(R);
          let b = g[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(g) {
      for (const R of g)
        this.addKeyword(R);
      return this;
    }
    addKeyword(g, R) {
      let b;
      if (typeof g == "string")
        b = g, typeof R == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), R.keyword = b);
      else if (typeof g == "object" && R === void 0) {
        if (R = g, b = R.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (A.call(this, b, R), !R)
        return (0, u.eachItem)(b, (f) => L.call(this, f)), this;
      q.call(this, R);
      const l = {
        ...R,
        type: (0, d.getJSONTypes)(R.type),
        schemaType: (0, d.getJSONTypes)(R.schemaType)
      };
      return (0, u.eachItem)(b, l.type.length === 0 ? (f) => L.call(this, f, l) : (f) => l.type.forEach((N) => L.call(this, f, l, N))), this;
    }
    getKeyword(g) {
      const R = this.RULES.all[g];
      return typeof R == "object" ? R.definition : !!R;
    }
    // Remove keyword
    removeKeyword(g) {
      const { RULES: R } = this;
      delete R.keywords[g], delete R.all[g];
      for (const b of R.rules) {
        const l = b.rules.findIndex((f) => f.keyword === g);
        l >= 0 && b.rules.splice(l, 1);
      }
      return this;
    }
    // Add format
    addFormat(g, R) {
      return typeof R == "string" && (R = new RegExp(R)), this.formats[g] = R, this;
    }
    errorsText(g = this.errors, { separator: R = ", ", dataVar: b = "data" } = {}) {
      return !g || g.length === 0 ? "No errors" : g.map((l) => `${b}${l.instancePath} ${l.message}`).reduce((l, f) => l + R + f);
    }
    $dataMetaSchema(g, R) {
      const b = this.RULES.all;
      g = JSON.parse(JSON.stringify(g));
      for (const l of R) {
        const f = l.split("/").slice(1);
        let N = g;
        for (const C of f)
          N = N[C];
        for (const C in b) {
          const M = b[C];
          if (typeof M != "object")
            continue;
          const { $data: Y } = M.definition, B = N[C];
          Y && B && (N[C] = G(B));
        }
      }
      return g;
    }
    _removeAllSchemas(g, R) {
      for (const b in g) {
        const l = g[b];
        (!R || R.test(b)) && (typeof l == "string" ? delete g[b] : l && !l.meta && (this._cache.delete(l.schema), delete g[b]));
      }
    }
    _addSchema(g, R, b, l = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let N;
      const { schemaId: C } = this.opts;
      if (typeof g == "object")
        N = g[C];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof g != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get(g);
      if (M !== void 0)
        return M;
      b = (0, c.normalizeId)(N || b);
      const Y = c.getSchemaRefs.call(this, g, b);
      return M = new i.SchemaEnv({ schema: g, schemaId: C, meta: R, baseId: b, localRefs: Y }), this._cache.set(M.schema, M), f && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = M), l && this.validateSchema(g, !0), M;
    }
    _checkUnique(g) {
      if (this.schemas[g] || this.refs[g])
        throw new Error(`schema with key or id "${g}" already exists`);
    }
    _compileSchemaEnv(g) {
      if (g.meta ? this._compileMetaSchema(g) : i.compileSchema.call(this, g), !g.validate)
        throw new Error("ajv implementation error");
      return g.validate;
    }
    _compileMetaSchema(g) {
      const R = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, g);
      } finally {
        this.opts = R;
      }
    }
  }
  T.ValidationError = n.default, T.MissingRefError = s.default, e.default = T;
  function k(I, g, R, b = "error") {
    for (const l in I) {
      const f = l;
      f in g && this.logger[b](`${R}: option ${l}. ${I[f]}`);
    }
  }
  function V(I) {
    return I = (0, c.normalizeId)(I), this.schemas[I] || this.refs[I];
  }
  function U() {
    const I = this.opts.schemas;
    if (I)
      if (Array.isArray(I))
        this.addSchema(I);
      else
        for (const g in I)
          this.addSchema(I[g], g);
  }
  function x() {
    for (const I in this.opts.formats) {
      const g = this.opts.formats[I];
      g && this.addFormat(I, g);
    }
  }
  function ne(I) {
    if (Array.isArray(I)) {
      this.addVocabulary(I);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const g in I) {
      const R = I[g];
      R.keyword || (R.keyword = g), this.addKeyword(R);
    }
  }
  function ce() {
    const I = { ...this.opts };
    for (const g of v)
      delete I[g];
    return I;
  }
  const z = { log() {
  }, warn() {
  }, error() {
  } };
  function X(I) {
    if (I === !1)
      return z;
    if (I === void 0)
      return console;
    if (I.log && I.warn && I.error)
      return I;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function A(I, g) {
    const { RULES: R } = this;
    if ((0, u.eachItem)(I, (b) => {
      if (R.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!J.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!g && g.$data && !("code" in g || "validate" in g))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(I, g, R) {
    var b;
    const l = g == null ? void 0 : g.post;
    if (R && l)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let N = l ? f.post : f.rules.find(({ type: M }) => M === R);
    if (N || (N = { type: R, rules: [] }, f.rules.push(N)), f.keywords[I] = !0, !g)
      return;
    const C = {
      keyword: I,
      definition: {
        ...g,
        type: (0, d.getJSONTypes)(g.type),
        schemaType: (0, d.getJSONTypes)(g.schemaType)
      }
    };
    g.before ? H.call(this, N, C, g.before) : N.rules.push(C), f.all[I] = C, (b = g.implements) === null || b === void 0 || b.forEach((M) => this.addKeyword(M));
  }
  function H(I, g, R) {
    const b = I.rules.findIndex((l) => l.keyword === R);
    b >= 0 ? I.rules.splice(b, 0, g) : (I.rules.push(g), this.logger.warn(`rule ${R} is not defined`));
  }
  function q(I) {
    let { metaSchema: g } = I;
    g !== void 0 && (I.$data && this.opts.$data && (g = G(g)), I.validateSchema = this.compile(g, !0));
  }
  const Q = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function G(I) {
    return { anyOf: [I, Q] };
  }
})(qc);
var pa = {}, ya = {}, $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Of = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
$a.default = Of;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.callRef = wt.getValidate = void 0;
const If = $r, _i = st(), Ve = re, rr = nt(), vi = De, nn = K, Tf = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = vi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new If.default(n.opts.uriResolver, s, r);
    if (u instanceof vi.SchemaEnv)
      return w(u);
    return p(u);
    function h() {
      if (a === d)
        return Nn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Nn(e, (0, Ve._)`${v}.validate`, d, d.$async);
    }
    function w(v) {
      const y = pl(e, v);
      Nn(e, y, v, v.$async);
    }
    function p(v) {
      const y = t.scopeValue("schema", o.code.source === !0 ? { ref: v, code: (0, Ve.stringify)(v) } : { ref: v }), _ = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Ve.nil,
        topSchemaRef: y,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function pl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ve._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
wt.getValidate = pl;
function Nn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: c } = a, d = c.passContext ? rr.default.this : Ve.nil;
  n ? u() : h();
  function u() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Ve._)`await ${(0, _i.callValidateCode)(e, t, d)}`), p(t), i || s.assign(v, !0);
    }, (y) => {
      s.if((0, Ve._)`!(${y} instanceof ${a.ValidationError})`, () => s.throw(y)), w(y), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, _i.callValidateCode)(e, t, d), () => p(t), () => w(t));
  }
  function w(v) {
    const y = (0, Ve._)`${v}.errors`;
    s.assign(rr.default.vErrors, (0, Ve._)`${rr.default.vErrors} === null ? ${y} : ${rr.default.vErrors}.concat(${y})`), s.assign(rr.default.errors, (0, Ve._)`${rr.default.vErrors}.length`);
  }
  function p(v) {
    var y;
    if (!a.opts.unevaluated)
      return;
    const _ = (y = r == null ? void 0 : r.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = nn.mergeEvaluated.props(s, _.props, a.props));
      else {
        const m = s.var("props", (0, Ve._)`${v}.evaluated.props`);
        a.props = nn.mergeEvaluated.props(s, m, a.props, Ve.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = nn.mergeEvaluated.items(s, _.items, a.items));
      else {
        const m = s.var("items", (0, Ve._)`${v}.evaluated.items`);
        a.items = nn.mergeEvaluated.items(s, m, a.items, Ve.Name);
      }
  }
}
wt.callRef = Nn;
wt.default = Tf;
Object.defineProperty(ya, "__esModule", { value: !0 });
const jf = $a, kf = wt, Af = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  jf.default,
  kf.default
];
ya.default = Af;
var ga = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const Dn = re, Nt = Dn.operators, Mn = {
  maximum: { okStr: "<=", ok: Nt.LTE, fail: Nt.GT },
  minimum: { okStr: ">=", ok: Nt.GTE, fail: Nt.LT },
  exclusiveMaximum: { okStr: "<", ok: Nt.LT, fail: Nt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Nt.GT, fail: Nt.LTE }
}, Cf = {
  message: ({ keyword: e, schemaCode: t }) => (0, Dn.str)`must be ${Mn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Dn._)`{comparison: ${Mn[e].okStr}, limit: ${t}}`
}, Df = {
  keyword: Object.keys(Mn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Cf,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Dn._)`${r} ${Mn[t].fail} ${n} || isNaN(${r})`);
  }
};
_a.default = Df;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const Mr = re, Mf = {
  message: ({ schemaCode: e }) => (0, Mr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Mr._)`{multipleOf: ${e}}`
}, Lf = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Mf,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, Mr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Mr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Mr._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
va.default = Lf;
var wa = {}, Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
function yl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ea.default = yl;
yl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(wa, "__esModule", { value: !0 });
const Gt = re, Vf = K, Ff = Ea, zf = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Gt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Gt._)`{limit: ${e}}`
}, Uf = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: zf,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Gt.operators.GT : Gt.operators.LT, i = s.opts.unicode === !1 ? (0, Gt._)`${r}.length` : (0, Gt._)`${(0, Vf.useFunc)(e.gen, Ff.default)}(${r})`;
    e.fail$data((0, Gt._)`${i} ${a} ${n}`);
  }
};
wa.default = Uf;
var ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const qf = st(), Ln = re, Kf = {
  message: ({ schemaCode: e }) => (0, Ln.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ln._)`{pattern: ${e}}`
}, Gf = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Kf,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Ln._)`(new RegExp(${s}, ${i}))` : (0, qf.usePattern)(e, n);
    e.fail$data((0, Ln._)`!${o}.test(${t})`);
  }
};
ba.default = Gf;
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
const Lr = re, Hf = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Lr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Lr._)`{limit: ${e}}`
}, Bf = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Hf,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Lr.operators.GT : Lr.operators.LT;
    e.fail$data((0, Lr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Sa.default = Bf;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const Ir = st(), Vr = re, Wf = K, Jf = {
  message: ({ params: { missingProperty: e } }) => (0, Vr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Vr._)`{missingProperty: ${e}}`
}, Xf = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Jf,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: o } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (i.allErrors ? d() : u(), o.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const y of r)
        if ((p == null ? void 0 : p[y]) === void 0 && !v.has(y)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${y}" is not defined at "${_}" (strictRequired)`;
          (0, Wf.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Vr.nil, h);
      else
        for (const p of r)
          (0, Ir.checkReportMissingProp)(e, p);
    }
    function u() {
      const p = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => w(p, v)), e.ok(v);
      } else
        t.if((0, Ir.checkMissingProp)(e, r, p)), (0, Ir.reportMissingProp)(e, p), t.else();
    }
    function h() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, Ir.noPropertyInData)(t, s, p, o.ownProperties), () => e.error());
      });
    }
    function w(p, v) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(v, (0, Ir.propertyInData)(t, s, p, o.ownProperties)), t.if((0, Vr.not)(v), () => {
          e.error(), t.break();
        });
      }, Vr.nil);
    }
  }
};
Pa.default = Xf;
var Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const Fr = re, Yf = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Fr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Fr._)`{limit: ${e}}`
}, Qf = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Yf,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Fr.operators.GT : Fr.operators.LT;
    e.fail$data((0, Fr._)`${r}.length ${s} ${n}`);
  }
};
Na.default = Qf;
var Ra = {}, Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
const $l = Bn;
$l.code = 'require("ajv/dist/runtime/equal").default';
Yr.default = $l;
Object.defineProperty(Ra, "__esModule", { value: !0 });
const _s = be, Ne = re, Zf = K, xf = Yr, eh = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, th = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: eh,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, _s.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Ne._)`${i} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Ne._)`${r}.length`), y = t.let("j");
      e.setParams({ i: v, j: y }), t.assign(c, !0), t.if((0, Ne._)`${v} > 1`, () => (h() ? w : p)(v, y));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function w(v, y) {
      const _ = t.name("item"), m = (0, _s.checkDataTypes)(d, _, o.opts.strictNumbers, _s.DataType.Wrong), E = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${v}--;`, () => {
        t.let(_, (0, Ne._)`${r}[${v}]`), t.if(m, (0, Ne._)`continue`), d.length > 1 && t.if((0, Ne._)`typeof ${_} == "string"`, (0, Ne._)`${_} += "_"`), t.if((0, Ne._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign(y, (0, Ne._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ne._)`${E}[${_}] = ${v}`);
      });
    }
    function p(v, y) {
      const _ = (0, Zf.useFunc)(t, xf.default), m = t.name("outer");
      t.label(m).for((0, Ne._)`;${v}--;`, () => t.for((0, Ne._)`${y} = ${v}; ${y}--;`, () => t.if((0, Ne._)`${_}(${r}[${v}], ${r}[${y}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Ra.default = th;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const qs = re, rh = K, nh = Yr, sh = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, qs._)`{allowedValue: ${e}}`
}, ah = {
  keyword: "const",
  $data: !0,
  error: sh,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, qs._)`!${(0, rh.useFunc)(t, nh.default)}(${r}, ${s})`) : e.fail((0, qs._)`${a} !== ${r}`);
  }
};
Oa.default = ah;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Cr = re, oh = K, ih = Yr, ch = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Cr._)`{allowedValues: ${e}}`
}, lh = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: ch,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, oh.useFunc)(t, ih.default));
    let u;
    if (o || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", a);
      u = (0, Cr.or)(...s.map((v, y) => w(p, y)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (p) => t.if((0, Cr._)`${d()}(${r}, ${p})`, () => t.assign(u, !0).break()));
    }
    function w(p, v) {
      const y = s[v];
      return typeof y == "object" && y !== null ? (0, Cr._)`${d()}(${r}, ${p}[${v}])` : (0, Cr._)`${r} === ${y}`;
    }
  }
};
Ia.default = lh;
Object.defineProperty(ga, "__esModule", { value: !0 });
const uh = _a, dh = va, fh = wa, hh = ba, mh = Sa, ph = Pa, yh = Na, $h = Ra, gh = Oa, _h = Ia, vh = [
  // number
  uh.default,
  dh.default,
  // string
  fh.default,
  hh.default,
  // object
  mh.default,
  ph.default,
  // array
  yh.default,
  $h.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  gh.default,
  _h.default
];
ga.default = vh;
var Ta = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.validateAdditionalItems = void 0;
const Ht = re, Ks = K, wh = {
  message: ({ params: { len: e } }) => (0, Ht.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ht._)`{limit: ${e}}`
}, Eh = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: wh,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ks.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    gl(e, n);
  }
};
function gl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, Ht._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Ht._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ks.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Ht._)`${o} <= ${t.length}`);
    r.if((0, Ht.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, o, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Ks.Type.Num }, d), i.allErrors || r.if((0, Ht.not)(d), () => r.break());
    });
  }
}
gr.validateAdditionalItems = gl;
gr.default = Eh;
var ja = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.validateTuple = void 0;
const wi = re, Rn = K, bh = st(), Sh = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return _l(e, "additionalItems", t);
    r.items = !0, !(0, Rn.alwaysValidSchema)(r, t) && e.ok((0, bh.validateArray)(e));
  }
};
function _l(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  u(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = Rn.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), d = n.const("len", (0, wi._)`${a}.length`);
  r.forEach((h, w) => {
    (0, Rn.alwaysValidSchema)(o, h) || (n.if((0, wi._)`${d} > ${w}`, () => e.subschema({
      keyword: i,
      schemaProp: w,
      dataProp: w
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: w, errSchemaPath: p } = o, v = r.length, y = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (w.strictTuples && !y) {
      const _ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, Rn.checkStrictMode)(o, _, w.strictTuples);
    }
  }
}
_r.validateTuple = _l;
_r.default = Sh;
Object.defineProperty(ja, "__esModule", { value: !0 });
const Ph = _r, Nh = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Ph.validateTuple)(e, "items")
};
ja.default = Nh;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Ei = re, Rh = K, Oh = st(), Ih = gr, Th = {
  message: ({ params: { len: e } }) => (0, Ei.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ei._)`{limit: ${e}}`
}, jh = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Th,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Rh.alwaysValidSchema)(n, t) && (s ? (0, Ih.validateAdditionalItems)(e, s) : e.ok((0, Oh.validateArray)(e)));
  }
};
ka.default = jh;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const He = re, sn = K, kh = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, Ah = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: kh,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, o = d) : i = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, sn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, sn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, sn.alwaysValidSchema)(a, r)) {
      let y = (0, He._)`${u} >= ${i}`;
      o !== void 0 && (y = (0, He._)`${y} && ${u} <= ${o}`), e.pass(y);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    o === void 0 && i === 1 ? p(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), o !== void 0 && t.if((0, He._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const y = t.name("_valid"), _ = t.let("count", 0);
      p(y, () => t.if(y, () => v(_)));
    }
    function p(y, _) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: sn.Type.Num,
          compositeRule: !0
        }, y), _();
      });
    }
    function v(y) {
      t.code((0, He._)`${y}++`), o === void 0 ? t.if((0, He._)`${y} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${y} > ${o}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, He._)`${y} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Aa.default = Ah;
var Qn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = re, r = K, n = st();
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
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
    code(c) {
      const [d, u] = a(c);
      i(c, d), o(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(c[h]) ? d : u;
      w[h] = c[h];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: h, it: w } = c;
    if (Object.keys(d).length === 0)
      return;
    const p = u.let("missing");
    for (const v in d) {
      const y = d[v];
      if (y.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, v, w.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: y.length,
        deps: y.join(", ")
      }), w.allErrors ? u.if(_, () => {
        for (const m of y)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, y, p)})`), (0, n.reportMissingProp)(c, p), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function o(c, d = c.schema) {
    const { gen: u, data: h, keyword: w, it: p } = c, v = u.name("valid");
    for (const y in d)
      (0, r.alwaysValidSchema)(p, d[y]) || (u.if(
        (0, n.propertyInData)(u, h, y, p.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: w, schemaProp: y }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = o, e.default = s;
})(Qn);
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const vl = re, Ch = K, Dh = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, vl._)`{propertyName: ${e.propertyName}}`
}, Mh = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Dh,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Ch.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, vl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ca.default = Mh;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
const an = st(), Ze = re, Lh = nt(), on = K, Vh = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Fh = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Vh,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, on.alwaysValidSchema)(i, r))
      return;
    const d = (0, an.allSchemaProperties)(n.properties), u = (0, an.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ze._)`${a} === ${Lh.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? v(_) : t.if(w(_), () => v(_));
      });
    }
    function w(_) {
      let m;
      if (d.length > 8) {
        const E = (0, on.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, an.isOwnProperty)(t, E, _);
      } else d.length ? m = (0, Ze.or)(...d.map((E) => (0, Ze._)`${_} === ${E}`)) : m = Ze.nil;
      return u.length && (m = (0, Ze.or)(m, ...u.map((E) => (0, Ze._)`${(0, an.usePattern)(e, E)}.test(${_})`))), (0, Ze.not)(m);
    }
    function p(_) {
      t.code((0, Ze._)`delete ${s}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, on.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (y(_, m, !1), t.if((0, Ze.not)(m), () => {
          e.reset(), p(_);
        })) : (y(_, m), o || t.if((0, Ze.not)(m), () => t.break()));
      }
    }
    function y(_, m, E) {
      const P = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: on.Type.Str
      };
      E === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
Zn.default = Fh;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const zh = Wn(), bi = st(), vs = K, Si = Zn, Uh = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Si.default.code(new zh.KeywordCxt(a, Si.default, "additionalProperties"));
    const i = (0, bi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = vs.mergeEvaluated.props(t, (0, vs.toHash)(i), a.props));
    const o = i.filter((h) => !(0, vs.alwaysValidSchema)(a, r[h]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const h of o)
      d(h) ? u(h) : (t.if((0, bi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Da.default = Uh;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Pi = st(), cn = re, Ni = K, Ri = K, qh = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, Pi.allSchemaProperties)(r), c = o.filter((y) => (0, Ni.alwaysValidSchema)(a, r[y]));
    if (o.length === 0 || c.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof cn.Name) && (a.props = (0, Ri.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const y of o)
        d && p(y), a.allErrors ? v(y) : (t.var(u, !0), v(y), t.if(u));
    }
    function p(y) {
      for (const _ in d)
        new RegExp(y).test(_) && (0, Ni.checkStrictMode)(a, `property ${_} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function v(y) {
      t.forIn("key", n, (_) => {
        t.if((0, cn._)`${(0, Pi.usePattern)(e, y)}.test(${_})`, () => {
          const m = c.includes(y);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: _,
            dataPropType: Ri.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, cn._)`${h}[${_}]`, !0) : !m && !a.allErrors && t.if((0, cn.not)(u), () => t.break());
        });
      });
    }
  }
};
Ma.default = qh;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Kh = K, Gh = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Kh.alwaysValidSchema)(n, r)) {
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
La.default = Gh;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Hh = st(), Bh = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Hh.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Va.default = Bh;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const On = re, Wh = K, Jh = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, On._)`{passingSchemas: ${e.passing}}`
}, Xh = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Jh,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, Wh.alwaysValidSchema)(s, u) ? t.var(c, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, On._)`${c} && ${i}`).assign(i, !1).assign(o, (0, On._)`[${o}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(o, h), w && e.mergeEvaluated(w, On.Name);
        });
      });
    }
  }
};
Fa.default = Xh;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Yh = K, Qh = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Yh.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
za.default = Qh;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Vn = re, wl = K, Zh = {
  message: ({ params: e }) => (0, Vn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Vn._)`{failingKeyword: ${e.ifClause}}`
}, xh = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Zh,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, wl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Oi(n, "then"), a = Oi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(o, d("then", u), d("else", u));
    } else s ? t.if(o, d("then")) : t.if((0, Vn.not)(o), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, o);
        t.assign(i, o), e.mergeValidEvaluated(w, i), h ? t.assign(h, (0, Vn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Oi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, wl.alwaysValidSchema)(e, r);
}
Ua.default = xh;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const em = K, tm = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, em.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
qa.default = tm;
Object.defineProperty(Ta, "__esModule", { value: !0 });
const rm = gr, nm = ja, sm = _r, am = ka, om = Aa, im = Qn, cm = Ca, lm = Zn, um = Da, dm = Ma, fm = La, hm = Va, mm = Fa, pm = za, ym = Ua, $m = qa;
function gm(e = !1) {
  const t = [
    // any
    fm.default,
    hm.default,
    mm.default,
    pm.default,
    ym.default,
    $m.default,
    // object
    cm.default,
    lm.default,
    im.default,
    um.default,
    dm.default
  ];
  return e ? t.push(nm.default, am.default) : t.push(rm.default, sm.default), t.push(om.default), t;
}
Ta.default = gm;
var Ka = {}, vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.dynamicAnchor = void 0;
const ws = re, _m = nt(), Ii = De, vm = wt, wm = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => El(e, e.schema)
};
function El(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const s = (0, ws._)`${_m.default.dynamicAnchors}${(0, ws.getProperty)(t)}`, a = n.errSchemaPath === "#" ? n.validateName : Em(e);
  r.if((0, ws._)`!${s}`, () => r.assign(s, a));
}
vr.dynamicAnchor = El;
function Em(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: s, baseId: a, localRefs: i, meta: o } = t.root, { schemaId: c } = n.opts, d = new Ii.SchemaEnv({ schema: r, schemaId: c, root: s, baseId: a, localRefs: i, meta: o });
  return Ii.compileSchema.call(n, d), (0, vm.getValidate)(e, d);
}
vr.default = wm;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.dynamicRef = void 0;
const Ti = re, bm = nt(), ji = wt, Sm = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => bl(e, e.schema)
};
function bl(e, t) {
  const { gen: r, keyword: n, it: s } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (s.allErrors)
    i();
  else {
    const c = r.let("valid", !1);
    i(c), e.ok(c);
  }
  function i(c) {
    if (s.schemaEnv.root.dynamicAnchors[a]) {
      const d = r.let("_v", (0, Ti._)`${bm.default.dynamicAnchors}${(0, Ti.getProperty)(a)}`);
      r.if(d, o(d, c), o(s.validateName, c));
    } else
      o(s.validateName, c)();
  }
  function o(c, d) {
    return d ? () => r.block(() => {
      (0, ji.callRef)(e, c), r.let(d, !0);
    }) : () => (0, ji.callRef)(e, c);
  }
}
wr.dynamicRef = bl;
wr.default = Sm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Pm = vr, Nm = K, Rm = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, Pm.dynamicAnchor)(e, "") : (0, Nm.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Ga.default = Rm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Om = wr, Im = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, Om.dynamicRef)(e, e.schema)
};
Ha.default = Im;
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Tm = vr, jm = wr, km = Ga, Am = Ha, Cm = [Tm.default, jm.default, km.default, Am.default];
Ka.default = Cm;
var Ba = {}, Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const ki = Qn, Dm = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: ki.error,
  code: (e) => (0, ki.validatePropertyDeps)(e)
};
Wa.default = Dm;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Mm = Qn, Lm = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Mm.validateSchemaDeps)(e)
};
Ja.default = Lm;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Vm = K, Fm = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, Vm.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
Xa.default = Fm;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const zm = Wa, Um = Ja, qm = Xa, Km = [zm.default, Um.default, qm.default];
Ba.default = Km;
var Ya = {}, Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Tt = re, Ai = K, Gm = nt(), Hm = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Tt._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, Bm = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: Hm,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: i, props: o } = a;
    o instanceof Tt.Name ? t.if((0, Tt._)`${o} !== true`, () => t.forIn("key", n, (h) => t.if(d(o, h), () => c(h)))) : o !== !0 && t.forIn("key", n, (h) => o === void 0 ? c(h) : t.if(u(o, h), () => c(h))), a.props = !0, e.ok((0, Tt._)`${s} === ${Gm.default.errors}`);
    function c(h) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: h }), e.error(), i || t.break();
        return;
      }
      if (!(0, Ai.alwaysValidSchema)(a, r)) {
        const w = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: h,
          dataPropType: Ai.Type.Str
        }, w), i || t.if((0, Tt.not)(w), () => t.break());
      }
    }
    function d(h, w) {
      return (0, Tt._)`!${h} || !${h}[${w}]`;
    }
    function u(h, w) {
      const p = [];
      for (const v in h)
        h[v] === !0 && p.push((0, Tt._)`${w} !== ${v}`);
      return (0, Tt.and)(...p);
    }
  }
};
Qa.default = Bm;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Bt = re, Ci = K, Wm = {
  message: ({ params: { len: e } }) => (0, Bt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bt._)`{limit: ${e}}`
}, Jm = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: Wm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e, a = s.items || 0;
    if (a === !0)
      return;
    const i = t.const("len", (0, Bt._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: a }), e.fail((0, Bt._)`${i} > ${a}`);
    else if (typeof r == "object" && !(0, Ci.alwaysValidSchema)(s, r)) {
      const c = t.var("valid", (0, Bt._)`${i} <= ${a}`);
      t.if((0, Bt.not)(c), () => o(c, a)), e.ok(c);
    }
    s.items = !0;
    function o(c, d) {
      t.forRange("i", d, i, (u) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: u, dataPropType: Ci.Type.Num }, c), s.allErrors || t.if((0, Bt.not)(c), () => t.break());
      });
    }
  }
};
Za.default = Jm;
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Xm = Qa, Ym = Za, Qm = [Xm.default, Ym.default];
Ya.default = Qm;
var xa = {}, eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const we = re, Zm = {
  message: ({ schemaCode: e }) => (0, we.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, we._)`{format: ${e}}`
}, xm = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Zm,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = o;
    if (!c.validateFormats)
      return;
    s ? w() : p();
    function w() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), y = r.const("fDef", (0, we._)`${v}[${i}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, we._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => r.assign(_, (0, we._)`${y}.type || "string"`).assign(m, (0, we._)`${y}.validate`), () => r.assign(_, (0, we._)`"string"`).assign(m, y)), e.fail$data((0, we.or)(E(), P()));
      function E() {
        return c.strictSchema === !1 ? we.nil : (0, we._)`${i} && !${m}`;
      }
      function P() {
        const T = u.$async ? (0, we._)`(${y}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, we._)`${m}(${n})`, k = (0, we._)`(typeof ${m} == "function" ? ${T} : ${m}.test(${n}))`;
        return (0, we._)`${m} && ${m} !== true && ${_} === ${t} && !${k}`;
      }
    }
    function p() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [y, _, m] = P(v);
      y === t && e.pass(T());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(k());
          return;
        }
        throw new Error(k());
        function k() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function P(k) {
        const V = k instanceof RegExp ? (0, we.regexpCode)(k) : c.code.formats ? (0, we._)`${c.code.formats}${(0, we.getProperty)(a)}` : void 0, U = r.scopeValue("formats", { key: a, ref: k, code: V });
        return typeof k == "object" && !(k instanceof RegExp) ? [k.type || "string", k.validate, (0, we._)`${U}.validate`] : ["string", k, U];
      }
      function T() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, we._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, we._)`${m}(${n})` : (0, we._)`${m}.test(${n})`;
      }
    }
  }
};
eo.default = xm;
Object.defineProperty(xa, "__esModule", { value: !0 });
const ep = eo, tp = [ep.default];
xa.default = tp;
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.contentVocabulary = pr.metadataVocabulary = void 0;
pr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
pr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(pa, "__esModule", { value: !0 });
const rp = ya, np = ga, sp = Ta, ap = Ka, op = Ba, ip = Ya, cp = xa, Di = pr, lp = [
  ap.default,
  rp.default,
  np.default,
  (0, sp.default)(!0),
  cp.default,
  Di.metadataVocabulary,
  Di.contentVocabulary,
  op.default,
  ip.default
];
pa.default = lp;
var to = {}, xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.DiscrError = void 0;
var Mi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Mi || (xn.DiscrError = Mi = {}));
Object.defineProperty(to, "__esModule", { value: !0 });
const ar = re, Gs = xn, Li = De, up = $r, dp = K, fp = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Gs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ar._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, hp = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: fp,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ar._)`${r}${(0, ar.getProperty)(o)}`);
    t.if((0, ar._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Gs.DiscrError.Tag, tag: d, tagName: o })), e.ok(c);
    function u() {
      const p = w();
      t.if(!1);
      for (const v in p)
        t.elseIf((0, ar._)`${d} === ${v}`), t.assign(c, h(p[v]));
      t.else(), e.error(!1, { discrError: Gs.DiscrError.Mapping, tag: d, tagName: o }), t.endIf();
    }
    function h(p) {
      const v = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: p }, v);
      return e.mergeEvaluated(y, ar.Name), v;
    }
    function w() {
      var p;
      const v = {}, y = m(s);
      let _ = !0;
      for (let T = 0; T < i.length; T++) {
        let k = i[T];
        if (k != null && k.$ref && !(0, dp.schemaHasRulesButRef)(k, a.self.RULES)) {
          const U = k.$ref;
          if (k = Li.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, U), k instanceof Li.SchemaEnv && (k = k.schema), k === void 0)
            throw new up.default(a.opts.uriResolver, a.baseId, U);
        }
        const V = (p = k == null ? void 0 : k.properties) === null || p === void 0 ? void 0 : p[o];
        if (typeof V != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        _ = _ && (y || m(k)), E(V, T);
      }
      if (!_)
        throw new Error(`discriminator: "${o}" must be required`);
      return v;
      function m({ required: T }) {
        return Array.isArray(T) && T.includes(o);
      }
      function E(T, k) {
        if (T.const)
          P(T.const, k);
        else if (T.enum)
          for (const V of T.enum)
            P(V, k);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function P(T, k) {
        if (typeof T != "string" || T in v)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        v[T] = k;
      }
    }
  }
};
to.default = hp;
var ro = {};
const mp = "https://json-schema.org/draft/2020-12/schema", pp = "https://json-schema.org/draft/2020-12/schema", yp = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, $p = "meta", gp = "Core and Validation specifications meta-schema", _p = [
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
], vp = [
  "object",
  "boolean"
], wp = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", Ep = {
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
}, bp = {
  $schema: mp,
  $id: pp,
  $vocabulary: yp,
  $dynamicAnchor: $p,
  title: gp,
  allOf: _p,
  type: vp,
  $comment: wp,
  properties: Ep
}, Sp = "https://json-schema.org/draft/2020-12/schema", Pp = "https://json-schema.org/draft/2020-12/meta/applicator", Np = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, Rp = "meta", Op = "Applicator vocabulary meta-schema", Ip = [
  "object",
  "boolean"
], Tp = {
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
}, jp = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, kp = {
  $schema: Sp,
  $id: Pp,
  $vocabulary: Np,
  $dynamicAnchor: Rp,
  title: Op,
  type: Ip,
  properties: Tp,
  $defs: jp
}, Ap = "https://json-schema.org/draft/2020-12/schema", Cp = "https://json-schema.org/draft/2020-12/meta/unevaluated", Dp = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, Mp = "meta", Lp = "Unevaluated applicator vocabulary meta-schema", Vp = [
  "object",
  "boolean"
], Fp = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, zp = {
  $schema: Ap,
  $id: Cp,
  $vocabulary: Dp,
  $dynamicAnchor: Mp,
  title: Lp,
  type: Vp,
  properties: Fp
}, Up = "https://json-schema.org/draft/2020-12/schema", qp = "https://json-schema.org/draft/2020-12/meta/content", Kp = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, Gp = "meta", Hp = "Content vocabulary meta-schema", Bp = [
  "object",
  "boolean"
], Wp = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, Jp = {
  $schema: Up,
  $id: qp,
  $vocabulary: Kp,
  $dynamicAnchor: Gp,
  title: Hp,
  type: Bp,
  properties: Wp
}, Xp = "https://json-schema.org/draft/2020-12/schema", Yp = "https://json-schema.org/draft/2020-12/meta/core", Qp = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, Zp = "meta", xp = "Core vocabulary meta-schema", ey = [
  "object",
  "boolean"
], ty = {
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
}, ry = {
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
}, ny = {
  $schema: Xp,
  $id: Yp,
  $vocabulary: Qp,
  $dynamicAnchor: Zp,
  title: xp,
  type: ey,
  properties: ty,
  $defs: ry
}, sy = "https://json-schema.org/draft/2020-12/schema", ay = "https://json-schema.org/draft/2020-12/meta/format-annotation", oy = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, iy = "meta", cy = "Format vocabulary meta-schema for annotation results", ly = [
  "object",
  "boolean"
], uy = {
  format: {
    type: "string"
  }
}, dy = {
  $schema: sy,
  $id: ay,
  $vocabulary: oy,
  $dynamicAnchor: iy,
  title: cy,
  type: ly,
  properties: uy
}, fy = "https://json-schema.org/draft/2020-12/schema", hy = "https://json-schema.org/draft/2020-12/meta/meta-data", my = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, py = "meta", yy = "Meta-data vocabulary meta-schema", $y = [
  "object",
  "boolean"
], gy = {
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
}, _y = {
  $schema: fy,
  $id: hy,
  $vocabulary: my,
  $dynamicAnchor: py,
  title: yy,
  type: $y,
  properties: gy
}, vy = "https://json-schema.org/draft/2020-12/schema", wy = "https://json-schema.org/draft/2020-12/meta/validation", Ey = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, by = "meta", Sy = "Validation vocabulary meta-schema", Py = [
  "object",
  "boolean"
], Ny = {
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
}, Ry = {
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
}, Oy = {
  $schema: vy,
  $id: wy,
  $vocabulary: Ey,
  $dynamicAnchor: by,
  title: Sy,
  type: Py,
  properties: Ny,
  $defs: Ry
};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Iy = bp, Ty = kp, jy = zp, ky = Jp, Ay = ny, Cy = dy, Dy = _y, My = Oy, Ly = ["/properties"];
function Vy(e) {
  return [
    Iy,
    Ty,
    jy,
    ky,
    Ay,
    t(this, Cy),
    Dy,
    t(this, My)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, Ly) : n;
  }
}
ro.default = Vy;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = qc, n = pa, s = to, a = ro, i = "https://json-schema.org/draft/2020-12/schema";
  class o extends r.default {
    constructor(p = {}) {
      super({
        ...p,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((p) => this.addVocabulary(p)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: p, meta: v } = this.opts;
      v && (a.default.call(this, p), this.refs["http://json-schema.org/schema"] = i);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
    }
  }
  t.Ajv2020 = o, e.exports = t = o, e.exports.Ajv2020 = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  var c = Wn();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var d = re;
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
  var u = Xr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var h = $r;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return h.default;
  } });
})(Ls, Ls.exports);
var Fy = Ls.exports, Hs = { exports: {} }, Sl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(z, X) {
    return { validate: z, compare: X };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), d),
    "date-time": t(w(!0), p),
    "iso-time": t(c(), u),
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
    regex: ce,
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
    int32: { type: "number", validate: V },
    // signed 64 bit integer
    int64: { type: "number", validate: U },
    // C-type float
    float: { type: "number", validate: x },
    // C-type double
    double: { type: "number", validate: x },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, p),
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
  function r(z) {
    return z % 4 === 0 && (z % 100 !== 0 || z % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(z) {
    const X = n.exec(z);
    if (!X)
      return !1;
    const J = +X[1], A = +X[2], L = +X[3];
    return A >= 1 && A <= 12 && L >= 1 && L <= (A === 2 && r(J) ? 29 : s[A]);
  }
  function i(z, X) {
    if (z && X)
      return z > X ? 1 : z < X ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(z) {
    return function(J) {
      const A = o.exec(J);
      if (!A)
        return !1;
      const L = +A[1], H = +A[2], q = +A[3], Q = A[4], G = A[5] === "-" ? -1 : 1, I = +(A[6] || 0), g = +(A[7] || 0);
      if (I > 23 || g > 59 || z && !Q)
        return !1;
      if (L <= 23 && H <= 59 && q < 60)
        return !0;
      const R = H - g * G, b = L - I * G - (R < 0 ? 1 : 0);
      return (b === 23 || b === -1) && (R === 59 || R === -1) && q < 61;
    };
  }
  function d(z, X) {
    if (!(z && X))
      return;
    const J = (/* @__PURE__ */ new Date("2020-01-01T" + z)).valueOf(), A = (/* @__PURE__ */ new Date("2020-01-01T" + X)).valueOf();
    if (J && A)
      return J - A;
  }
  function u(z, X) {
    if (!(z && X))
      return;
    const J = o.exec(z), A = o.exec(X);
    if (J && A)
      return z = J[1] + J[2] + J[3], X = A[1] + A[2] + A[3], z > X ? 1 : z < X ? -1 : 0;
  }
  const h = /t|\s/i;
  function w(z) {
    const X = c(z);
    return function(A) {
      const L = A.split(h);
      return L.length === 2 && a(L[0]) && X(L[1]);
    };
  }
  function p(z, X) {
    if (!(z && X))
      return;
    const J = new Date(z).valueOf(), A = new Date(X).valueOf();
    if (J && A)
      return J - A;
  }
  function v(z, X) {
    if (!(z && X))
      return;
    const [J, A] = z.split(h), [L, H] = X.split(h), q = i(J, L);
    if (q !== void 0)
      return q || d(A, H);
  }
  const y = /\/|:/, _ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(z) {
    return y.test(z) && _.test(z);
  }
  const E = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function P(z) {
    return E.lastIndex = 0, E.test(z);
  }
  const T = -2147483648, k = 2 ** 31 - 1;
  function V(z) {
    return Number.isInteger(z) && z <= k && z >= T;
  }
  function U(z) {
    return Number.isInteger(z);
  }
  function x() {
    return !0;
  }
  const ne = /[^\\]\\Z/;
  function ce(z) {
    if (ne.test(z))
      return !1;
    try {
      return new RegExp(z), !0;
    } catch {
      return !1;
    }
  }
})(Sl);
var Pl = {}, Bs = { exports: {} }, Nl = {}, $t = {}, qt = {}, Es = {}, oe = {}, Br = {};
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
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((P, T) => `${P}${T}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((P, T) => (T instanceof r && (P[T.str] = (P[T.str] || 0) + 1), P), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...E) {
    const P = [m[0]];
    let T = 0;
    for (; T < E.length; )
      o(P, E[T]), P.push(m[++T]);
    return new n(P);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...E) {
    const P = [p(m[0])];
    let T = 0;
    for (; T < E.length; )
      P.push(a), o(P, E[T]), P.push(a, p(m[++T]));
    return c(P), new n(P);
  }
  e.str = i;
  function o(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = o;
  function c(m) {
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
    return E.emptyStr() ? m : m.emptyStr() ? E : i`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function w(m) {
    return new n(p(m));
  }
  e.stringify = w;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function y(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(Br);
var Ws = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Br;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
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
  const i = (0, t._)`\n`;
  class o extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
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
      const w = this.toName(d), { prefix: p } = w, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let y = this._values[p];
      if (y) {
        const E = y.get(v);
        if (E)
          return E;
      } else
        y = this._values[p] = /* @__PURE__ */ new Map();
      y.set(v, w);
      const _ = this._scope[p] || (this._scope[p] = []), m = _.length;
      return _[m] = u.ref, w.setValue(u, { property: p, itemIndex: m }), w;
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
      let p = t.nil;
      for (const v in d) {
        const y = d[v];
        if (!y)
          continue;
        const _ = h[v] = h[v] || /* @__PURE__ */ new Map();
        y.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = u(m);
          if (E) {
            const P = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${P} ${m} = ${E};${this.opts._n}`;
          } else if (E = w == null ? void 0 : w(m))
            p = (0, t._)`${p}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = o;
})(Ws);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Br, r = Ws;
  var n = Br;
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
  var s = Ws;
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
    optimizeNames(l, f) {
      return this;
    }
  }
  class i extends a {
    constructor(l, f, N) {
      super(), this.varKind = l, this.name = f, this.rhs = N;
    }
    render({ es5: l, _n: f }) {
      const N = l ? r.varKinds.var : this.varKind, C = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${C};` + f;
    }
    optimizeNames(l, f) {
      if (l[this.name.str])
        return this.rhs && (this.rhs = A(this.rhs, l, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor(l, f, N) {
      super(), this.lhs = l, this.rhs = f, this.sideEffects = N;
    }
    render({ _n: l }) {
      return `${this.lhs} = ${this.rhs};` + l;
    }
    optimizeNames(l, f) {
      if (!(this.lhs instanceof t.Name && !l[this.lhs.str] && !this.sideEffects))
        return this.rhs = A(this.rhs, l, f), this;
    }
    get names() {
      const l = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return J(l, this.rhs);
    }
  }
  class c extends o {
    constructor(l, f, N, C) {
      super(l, N, C), this.op = f;
    }
    render({ _n: l }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + l;
    }
  }
  class d extends a {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `${this.label}:` + l;
    }
  }
  class u extends a {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `break${this.label ? ` ${this.label}` : ""};` + l;
    }
  }
  class h extends a {
    constructor(l) {
      super(), this.error = l;
    }
    render({ _n: l }) {
      return `throw ${this.error};` + l;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends a {
    constructor(l) {
      super(), this.code = l;
    }
    render({ _n: l }) {
      return `${this.code};` + l;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(l, f) {
      return this.code = A(this.code, l, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends a {
    constructor(l = []) {
      super(), this.nodes = l;
    }
    render(l) {
      return this.nodes.reduce((f, N) => f + N.render(l), "");
    }
    optimizeNodes() {
      const { nodes: l } = this;
      let f = l.length;
      for (; f--; ) {
        const N = l[f].optimizeNodes();
        Array.isArray(N) ? l.splice(f, 1, ...N) : N ? l[f] = N : l.splice(f, 1);
      }
      return l.length > 0 ? this : void 0;
    }
    optimizeNames(l, f) {
      const { nodes: N } = this;
      let C = N.length;
      for (; C--; ) {
        const M = N[C];
        M.optimizeNames(l, f) || (L(l, M.names), N.splice(C, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((l, f) => X(l, f.names), {});
    }
  }
  class v extends p {
    render(l) {
      return "{" + l._n + super.render(l) + "}" + l._n;
    }
  }
  class y extends p {
  }
  class _ extends v {
  }
  _.kind = "else";
  class m extends v {
    constructor(l, f) {
      super(f), this.condition = l;
    }
    render(l) {
      let f = `if(${this.condition})` + super.render(l);
      return this.else && (f += "else " + this.else.render(l)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const l = this.condition;
      if (l === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const N = f.optimizeNodes();
        f = this.else = Array.isArray(N) ? new _(N) : N;
      }
      if (f)
        return l === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(H(l), f instanceof m ? [f] : f.nodes);
      if (!(l === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(l, f) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(l, f), !!(super.optimizeNames(l, f) || this.else))
        return this.condition = A(this.condition, l, f), this;
    }
    get names() {
      const l = super.names;
      return J(l, this.condition), this.else && X(l, this.else.names), l;
    }
  }
  m.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class P extends E {
    constructor(l) {
      super(), this.iteration = l;
    }
    render(l) {
      return `for(${this.iteration})` + super.render(l);
    }
    optimizeNames(l, f) {
      if (super.optimizeNames(l, f))
        return this.iteration = A(this.iteration, l, f), this;
    }
    get names() {
      return X(super.names, this.iteration.names);
    }
  }
  class T extends E {
    constructor(l, f, N, C) {
      super(), this.varKind = l, this.name = f, this.from = N, this.to = C;
    }
    render(l) {
      const f = l.es5 ? r.varKinds.var : this.varKind, { name: N, from: C, to: M } = this;
      return `for(${f} ${N}=${C}; ${N}<${M}; ${N}++)` + super.render(l);
    }
    get names() {
      const l = J(super.names, this.from);
      return J(l, this.to);
    }
  }
  class k extends E {
    constructor(l, f, N, C) {
      super(), this.loop = l, this.varKind = f, this.name = N, this.iterable = C;
    }
    render(l) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(l);
    }
    optimizeNames(l, f) {
      if (super.optimizeNames(l, f))
        return this.iterable = A(this.iterable, l, f), this;
    }
    get names() {
      return X(super.names, this.iterable.names);
    }
  }
  class V extends v {
    constructor(l, f, N) {
      super(), this.name = l, this.args = f, this.async = N;
    }
    render(l) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(l);
    }
  }
  V.kind = "func";
  class U extends p {
    render(l) {
      return "return " + super.render(l);
    }
  }
  U.kind = "return";
  class x extends v {
    render(l) {
      let f = "try" + super.render(l);
      return this.catch && (f += this.catch.render(l)), this.finally && (f += this.finally.render(l)), f;
    }
    optimizeNodes() {
      var l, f;
      return super.optimizeNodes(), (l = this.catch) === null || l === void 0 || l.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(l, f) {
      var N, C;
      return super.optimizeNames(l, f), (N = this.catch) === null || N === void 0 || N.optimizeNames(l, f), (C = this.finally) === null || C === void 0 || C.optimizeNames(l, f), this;
    }
    get names() {
      const l = super.names;
      return this.catch && X(l, this.catch.names), this.finally && X(l, this.finally.names), l;
    }
  }
  class ne extends v {
    constructor(l) {
      super(), this.error = l;
    }
    render(l) {
      return `catch(${this.error})` + super.render(l);
    }
  }
  ne.kind = "catch";
  class ce extends v {
    render(l) {
      return "finally" + super.render(l);
    }
  }
  ce.kind = "finally";
  class z {
    constructor(l, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = l, this._scope = new r.Scope({ parent: l }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(l) {
      return this._scope.name(l);
    }
    // reserves unique name in the external scope
    scopeName(l) {
      return this._extScope.name(l);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(l, f) {
      const N = this._extScope.value(l, f);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(l, f) {
      return this._extScope.getValue(l, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(l) {
      return this._extScope.scopeRefs(l, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(l, f, N, C) {
      const M = this._scope.toName(f);
      return N !== void 0 && C && (this._constants[M.str] = N), this._leafNode(new i(l, M, N)), M;
    }
    // `const` declaration (`var` in es5 mode)
    const(l, f, N) {
      return this._def(r.varKinds.const, l, f, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(l, f, N) {
      return this._def(r.varKinds.let, l, f, N);
    }
    // `var` declaration with optional assignment
    var(l, f, N) {
      return this._def(r.varKinds.var, l, f, N);
    }
    // assignment code
    assign(l, f, N) {
      return this._leafNode(new o(l, f, N));
    }
    // `+=` code
    add(l, f) {
      return this._leafNode(new c(l, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(l) {
      return typeof l == "function" ? l() : l !== t.nil && this._leafNode(new w(l)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...l) {
      const f = ["{"];
      for (const [N, C] of l)
        f.length > 1 && f.push(","), f.push(N), (N !== C || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, C));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(l, f, N) {
      if (this._blockNode(new m(l)), f && N)
        this.code(f).else().code(N).endIf();
      else if (f)
        this.code(f).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(l) {
      return this._elseNode(new m(l));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(l, f) {
      return this._blockNode(l), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(l, f) {
      return this._for(new P(l), f);
    }
    // `for` statement for a range of values
    forRange(l, f, N, C, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const Y = this._scope.toName(l);
      return this._for(new T(M, Y, f, N), () => C(Y));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(l, f, N, C = r.varKinds.const) {
      const M = this._scope.toName(l);
      if (this.opts.es5) {
        const Y = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${Y}.length`, (B) => {
          this.var(M, (0, t._)`${Y}[${B}]`), N(M);
        });
      }
      return this._for(new k("of", C, M, f), () => N(M));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(l, f, N, C = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(l, (0, t._)`Object.keys(${f})`, N);
      const M = this._scope.toName(l);
      return this._for(new k("in", C, M, f), () => N(M));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(l) {
      return this._leafNode(new d(l));
    }
    // `break` statement
    break(l) {
      return this._leafNode(new u(l));
    }
    // `return` statement
    return(l) {
      const f = new U();
      if (this._blockNode(f), this.code(l), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(U);
    }
    // `try` statement
    try(l, f, N) {
      if (!f && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const C = new x();
      if (this._blockNode(C), this.code(l), f) {
        const M = this.name("e");
        this._currNode = C.catch = new ne(M), f(M);
      }
      return N && (this._currNode = C.finally = new ce(), this.code(N)), this._endBlockNode(ne, ce);
    }
    // `throw` statement
    throw(l) {
      return this._leafNode(new h(l));
    }
    // start self-balancing block
    block(l, f) {
      return this._blockStarts.push(this._nodes.length), l && this.code(l).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(l) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - f;
      if (N < 0 || l !== void 0 && N !== l)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${l} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(l, f = t.nil, N, C) {
      return this._blockNode(new V(l, f, N)), C && this.code(C).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(V);
    }
    optimize(l = 1) {
      for (; l-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(l) {
      return this._currNode.nodes.push(l), this;
    }
    _blockNode(l) {
      this._currNode.nodes.push(l), this._nodes.push(l);
    }
    _endBlockNode(l, f) {
      const N = this._currNode;
      if (N instanceof l || f && N instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${l.kind}/${f.kind}` : l.kind}"`);
    }
    _elseNode(l) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = l, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const l = this._nodes;
      return l[l.length - 1];
    }
    set _currNode(l) {
      const f = this._nodes;
      f[f.length - 1] = l;
    }
  }
  e.CodeGen = z;
  function X(b, l) {
    for (const f in l)
      b[f] = (b[f] || 0) + (l[f] || 0);
    return b;
  }
  function J(b, l) {
    return l instanceof t._CodeOrName ? X(b, l.names) : b;
  }
  function A(b, l, f) {
    if (b instanceof t.Name)
      return N(b);
    if (!C(b))
      return b;
    return new t._Code(b._items.reduce((M, Y) => (Y instanceof t.Name && (Y = N(Y)), Y instanceof t._Code ? M.push(...Y._items) : M.push(Y), M), []));
    function N(M) {
      const Y = f[M.str];
      return Y === void 0 || l[M.str] !== 1 ? M : (delete l[M.str], Y);
    }
    function C(M) {
      return M instanceof t._Code && M._items.some((Y) => Y instanceof t.Name && l[Y.str] === 1 && f[Y.str] !== void 0);
    }
  }
  function L(b, l) {
    for (const f in l)
      b[f] = (b[f] || 0) - (l[f] || 0);
  }
  function H(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${R(b)}`;
  }
  e.not = H;
  const q = g(e.operators.AND);
  function Q(...b) {
    return b.reduce(q);
  }
  e.and = Q;
  const G = g(e.operators.OR);
  function I(...b) {
    return b.reduce(G);
  }
  e.or = I;
  function g(b) {
    return (l, f) => l === t.nil ? f : f === t.nil ? l : (0, t._)`${R(l)} ${b} ${R(f)}`;
  }
  function R(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(oe);
var W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.checkStrictMode = W.getErrorPath = W.Type = W.useFunc = W.setEvaluated = W.evaluatedPropsToName = W.mergeEvaluated = W.eachItem = W.unescapeJsonPointer = W.escapeJsonPointer = W.escapeFragment = W.unescapeFragment = W.schemaRefOrVal = W.schemaHasRulesButRef = W.schemaHasRules = W.checkUnknownRules = W.alwaysValidSchema = W.toHash = void 0;
const pe = oe, zy = Br;
function Uy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
W.toHash = Uy;
function qy(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Rl(e, t), !Ol(t, e.self.RULES.all));
}
W.alwaysValidSchema = qy;
function Rl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || jl(e, `unknown keyword: "${a}"`);
}
W.checkUnknownRules = Rl;
function Ol(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
W.schemaHasRules = Ol;
function Ky(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
W.schemaHasRulesButRef = Ky;
function Gy({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${e}${t}${(0, pe.getProperty)(n)}`;
}
W.schemaRefOrVal = Gy;
function Hy(e) {
  return Il(decodeURIComponent(e));
}
W.unescapeFragment = Hy;
function By(e) {
  return encodeURIComponent(no(e));
}
W.escapeFragment = By;
function no(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
W.escapeJsonPointer = no;
function Il(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
W.unescapeJsonPointer = Il;
function Wy(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
W.eachItem = Wy;
function Vi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, o) => {
    const c = i === void 0 ? a : i instanceof pe.Name ? (a instanceof pe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof pe.Name ? (t(s, i, a), a) : r(a, i);
    return o === pe.Name && !(c instanceof pe.Name) ? n(s, c) : c;
  };
}
W.mergeEvaluated = {
  props: Vi({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, pe._)`${r} || {}`), so(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Tl
  }),
  items: Vi({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Tl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, pe._)`{}`);
  return t !== void 0 && so(e, r, t), r;
}
W.evaluatedPropsToName = Tl;
function so(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, pe._)`${t}${(0, pe.getProperty)(n)}`, !0));
}
W.setEvaluated = so;
const Fi = {};
function Jy(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Fi[t.code] || (Fi[t.code] = new zy._Code(t.code))
  });
}
W.useFunc = Jy;
var Js;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Js || (W.Type = Js = {}));
function Xy(e, t, r) {
  if (e instanceof pe.Name) {
    const n = t === Js.Num;
    return r ? n ? (0, pe._)`"[" + ${e} + "]"` : (0, pe._)`"['" + ${e} + "']"` : n ? (0, pe._)`"/" + ${e}` : (0, pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(e).toString() : "/" + no(e);
}
W.getErrorPath = Xy;
function jl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
W.checkStrictMode = jl;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const ke = oe, Yy = {
  // validation function arguments
  data: new ke.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ke.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ke.Name("instancePath"),
  parentData: new ke.Name("parentData"),
  parentDataProperty: new ke.Name("parentDataProperty"),
  rootData: new ke.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ke.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ke.Name("vErrors"),
  // null or array of validation errors
  errors: new ke.Name("errors"),
  // counter of validation errors
  this: new ke.Name("this"),
  // "globals"
  self: new ke.Name("self"),
  scope: new ke.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ke.Name("json"),
  jsonPos: new ke.Name("jsonPos"),
  jsonLen: new ke.Name("jsonLen"),
  jsonPart: new ke.Name("jsonPart")
};
dt.default = Yy;
var zi;
function es() {
  return zi || (zi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = oe, r = W, n = dt;
    e.keywordError = {
      message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
    };
    function s(_, m = e.keywordError, E, P) {
      const { it: T } = _, { gen: k, compositeRule: V, allErrors: U } = T, x = h(_, m, E);
      P ?? (V || U) ? c(k, x) : d(T, (0, t._)`[${x}]`);
    }
    e.reportError = s;
    function a(_, m = e.keywordError, E) {
      const { it: P } = _, { gen: T, compositeRule: k, allErrors: V } = P, U = h(_, m, E);
      c(T, U), k || V || d(P, n.default.vErrors);
    }
    e.reportExtraError = a;
    function i(_, m) {
      _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = i;
    function o({ gen: _, keyword: m, schemaValue: E, data: P, errsCount: T, it: k }) {
      if (T === void 0)
        throw new Error("ajv implementation error");
      const V = _.name("err");
      _.forRange("i", T, n.default.errors, (U) => {
        _.const(V, (0, t._)`${n.default.vErrors}[${U}]`), _.if((0, t._)`${V}.instancePath === undefined`, () => _.assign((0, t._)`${V}.instancePath`, (0, t.strConcat)(n.default.instancePath, k.errorPath))), _.assign((0, t._)`${V}.schemaPath`, (0, t.str)`${k.errSchemaPath}/${m}`), k.opts.verbose && (_.assign((0, t._)`${V}.schema`, E), _.assign((0, t._)`${V}.data`, P));
      });
    }
    e.extendErrors = o;
    function c(_, m) {
      const E = _.const("err", m);
      _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
    }
    function d(_, m) {
      const { gen: E, validateName: P, schemaEnv: T } = _;
      T.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${P}.errors`, m), E.return(!1));
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
    function h(_, m, E) {
      const { createErrors: P } = _.it;
      return P === !1 ? (0, t._)`{}` : w(_, m, E);
    }
    function w(_, m, E = {}) {
      const { gen: P, it: T } = _, k = [
        p(T, E),
        v(_, E)
      ];
      return y(_, m, k), P.object(...k);
    }
    function p({ errorPath: _ }, { instancePath: m }) {
      const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
    }
    function v({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: P }) {
      let T = P ? m : (0, t.str)`${m}/${_}`;
      return E && (T = (0, t.str)`${T}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, T];
    }
    function y(_, { params: m, message: E }, P) {
      const { keyword: T, data: k, schemaValue: V, it: U } = _, { opts: x, propertyName: ne, topSchemaRef: ce, schemaPath: z } = U;
      P.push([u.keyword, T], [u.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), x.messages && P.push([u.message, typeof E == "function" ? E(_) : E]), x.verbose && P.push([u.schema, V], [u.parentSchema, (0, t._)`${ce}${z}`], [n.default.data, k]), ne && P.push([u.propertyName, ne]);
    }
  }(Es)), Es;
}
var Ui;
function Qy() {
  if (Ui) return qt;
  Ui = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.boolOrEmptySchema = qt.topBoolOrEmptySchema = void 0;
  const e = es(), t = oe, r = dt, n = {
    message: "boolean schema is false"
  };
  function s(o) {
    const { gen: c, schema: d, validateName: u } = o;
    d === !1 ? i(o, !1) : typeof d == "object" && d.$async === !0 ? c.return(r.default.data) : (c.assign((0, t._)`${u}.errors`, null), c.return(!0));
  }
  qt.topBoolOrEmptySchema = s;
  function a(o, c) {
    const { gen: d, schema: u } = o;
    u === !1 ? (d.var(c, !1), i(o)) : d.var(c, !0);
  }
  qt.boolOrEmptySchema = a;
  function i(o, c) {
    const { gen: d, data: u } = o, h = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(h, n, void 0, c);
  }
  return qt;
}
var Se = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const Zy = ["string", "number", "integer", "boolean", "null", "object", "array"], xy = new Set(Zy);
function e$(e) {
  return typeof e == "string" && xy.has(e);
}
xt.isJSONType = e$;
function t$() {
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
xt.getRules = t$;
var gt = {}, qi;
function kl() {
  if (qi) return gt;
  qi = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.shouldUseRule = gt.shouldUseGroup = gt.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, a) {
    const i = s.RULES.types[a];
    return i && i !== !0 && t(n, i);
  }
  gt.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((a) => r(n, a));
  }
  gt.shouldUseGroup = t;
  function r(n, s) {
    var a;
    return n[s.keyword] !== void 0 || ((a = s.definition.implements) === null || a === void 0 ? void 0 : a.some((i) => n[i] !== void 0));
  }
  return gt.shouldUseRule = r, gt;
}
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.reportTypeError = Se.checkDataTypes = Se.checkDataType = Se.coerceAndCheckDataType = Se.getJSONTypes = Se.getSchemaTypes = Se.DataType = void 0;
const r$ = xt, n$ = kl(), s$ = es(), ae = oe, Al = W;
var dr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(dr || (Se.DataType = dr = {}));
function a$(e) {
  const t = Cl(e.type);
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
Se.getSchemaTypes = a$;
function Cl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(r$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Se.getJSONTypes = Cl;
function o$(e, t) {
  const { gen: r, data: n, opts: s } = e, a = i$(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, n$.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const o = ao(t, n, s.strictNumbers, dr.Wrong);
    r.if(o, () => {
      a.length ? c$(e, t, a) : oo(e);
    });
  }
  return i;
}
Se.coerceAndCheckDataType = o$;
const Dl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function i$(e, t) {
  return t ? e.filter((r) => Dl.has(r) || t === "array" && r === "array") : [];
}
function c$(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, ae._)`typeof ${s}`), o = n.let("coerced", (0, ae._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ae._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ae._)`${s}[0]`).assign(i, (0, ae._)`typeof ${s}`).if(ao(t, s, a.strictNumbers), () => n.assign(o, s))), n.if((0, ae._)`${o} !== undefined`);
  for (const d of r)
    (Dl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), oo(e), n.endIf(), n.if((0, ae._)`${o} !== undefined`, () => {
    n.assign(s, o), l$(e, o);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ae._)`${i} == "number" || ${i} == "boolean"`).assign(o, (0, ae._)`"" + ${s}`).elseIf((0, ae._)`${s} === null`).assign(o, (0, ae._)`""`);
        return;
      case "number":
        n.elseIf((0, ae._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(o, (0, ae._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ae._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(o, (0, ae._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ae._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(o, !1).elseIf((0, ae._)`${s} === "true" || ${s} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, ae._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, ae._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(o, (0, ae._)`[${s}]`);
    }
  }
}
function l$({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ae._)`${t} !== undefined`, () => e.assign((0, ae._)`${t}[${r}]`, n));
}
function Xs(e, t, r, n = dr.Correct) {
  const s = n === dr.Correct ? ae.operators.EQ : ae.operators.NEQ;
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
      a = i((0, ae._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, ae._)`typeof ${t} ${s} ${e}`;
  }
  return n === dr.Correct ? a : (0, ae.not)(a);
  function i(o = ae.nil) {
    return (0, ae.and)((0, ae._)`typeof ${t} == "number"`, o, r ? (0, ae._)`isFinite(${t})` : ae.nil);
  }
}
Se.checkDataType = Xs;
function ao(e, t, r, n) {
  if (e.length === 1)
    return Xs(e[0], t, r, n);
  let s;
  const a = (0, Al.toHash)(e);
  if (a.array && a.object) {
    const i = (0, ae._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, ae._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ae.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, ae.and)(s, Xs(i, t, r, n));
  return s;
}
Se.checkDataTypes = ao;
const u$ = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ae._)`{type: ${e}}` : (0, ae._)`{type: ${t}}`
};
function oo(e) {
  const t = d$(e);
  (0, s$.reportError)(t, u$);
}
Se.reportTypeError = oo;
function d$(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Al.schemaRefOrVal)(e, n, "type");
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
var Tr = {}, Ki;
function f$() {
  if (Ki) return Tr;
  Ki = 1, Object.defineProperty(Tr, "__esModule", { value: !0 }), Tr.assignDefaults = void 0;
  const e = oe, t = W;
  function r(s, a) {
    const { properties: i, items: o } = s.schema;
    if (a === "object" && i)
      for (const c in i)
        n(s, c, i[c].default);
    else a === "array" && Array.isArray(o) && o.forEach((c, d) => n(s, d, c.default));
  }
  Tr.assignDefaults = r;
  function n(s, a, i) {
    const { gen: o, compositeRule: c, data: d, opts: u } = s;
    if (i === void 0)
      return;
    const h = (0, e._)`${d}${(0, e.getProperty)(a)}`;
    if (c) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let w = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (w = (0, e._)`${w} || ${h} === null || ${h} === ""`), o.if(w, (0, e._)`${h} = ${(0, e.stringify)(i)}`);
  }
  return Tr;
}
var Ye = {}, ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
const $e = oe, io = W, Rt = dt, h$ = W;
function m$(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(lo(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, $e._)`${t}` }, !0), e.error();
  });
}
ie.checkReportMissingProp = m$;
function p$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, $e.or)(...n.map((a) => (0, $e.and)(lo(e, t, a, r.ownProperties), (0, $e._)`${s} = ${a}`)));
}
ie.checkMissingProp = p$;
function y$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ie.reportMissingProp = y$;
function Ml(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, $e._)`Object.prototype.hasOwnProperty`
  });
}
ie.hasPropFunc = Ml;
function co(e, t, r) {
  return (0, $e._)`${Ml(e)}.call(${t}, ${r})`;
}
ie.isOwnProperty = co;
function $$(e, t, r, n) {
  const s = (0, $e._)`${t}${(0, $e.getProperty)(r)} !== undefined`;
  return n ? (0, $e._)`${s} && ${co(e, t, r)}` : s;
}
ie.propertyInData = $$;
function lo(e, t, r, n) {
  const s = (0, $e._)`${t}${(0, $e.getProperty)(r)} === undefined`;
  return n ? (0, $e.or)(s, (0, $e.not)(co(e, t, r))) : s;
}
ie.noPropertyInData = lo;
function Ll(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ie.allSchemaProperties = Ll;
function g$(e, t) {
  return Ll(t).filter((r) => !(0, io.alwaysValidSchema)(e, t[r]));
}
ie.schemaProperties = g$;
function _$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, o, c, d) {
  const u = d ? (0, $e._)`${e}, ${t}, ${n}${s}` : t, h = [
    [Rt.default.instancePath, (0, $e.strConcat)(Rt.default.instancePath, a)],
    [Rt.default.parentData, i.parentData],
    [Rt.default.parentDataProperty, i.parentDataProperty],
    [Rt.default.rootData, Rt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([Rt.default.dynamicAnchors, Rt.default.dynamicAnchors]);
  const w = (0, $e._)`${u}, ${r.object(...h)}`;
  return c !== $e.nil ? (0, $e._)`${o}.call(${c}, ${w})` : (0, $e._)`${o}(${w})`;
}
ie.callValidateCode = _$;
const v$ = (0, $e._)`new RegExp`;
function w$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, $e._)`${s.code === "new RegExp" ? v$ : (0, h$.useFunc)(e, s)}(${r}, ${n})`
  });
}
ie.usePattern = w$;
function E$(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const o = t.let("valid", !0);
    return i(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(o) {
    const c = t.const("len", (0, $e._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: io.Type.Num
      }, a), t.if((0, $e.not)(a), o);
    });
  }
}
ie.validateArray = E$;
function b$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, io.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, o);
    t.assign(i, (0, $e._)`${i} || ${o}`), e.mergeValidEvaluated(u, o) || t.if((0, $e.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ie.validateUnion = b$;
var Gi;
function S$() {
  if (Gi) return Ye;
  Gi = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.validateKeywordUsage = Ye.validSchemaType = Ye.funcKeywordCode = Ye.macroKeywordCode = void 0;
  const e = oe, t = dt, r = ie, n = es();
  function s(w, p) {
    const { gen: v, keyword: y, schema: _, parentSchema: m, it: E } = w, P = p.macro.call(E.self, _, m, E), T = d(v, y, P);
    E.opts.validateSchema !== !1 && E.self.validateSchema(P, !0);
    const k = v.name("valid");
    w.subschema({
      schema: P,
      schemaPath: e.nil,
      errSchemaPath: `${E.errSchemaPath}/${y}`,
      topSchemaRef: T,
      compositeRule: !0
    }, k), w.pass(k, () => w.error(!0));
  }
  Ye.macroKeywordCode = s;
  function a(w, p) {
    var v;
    const { gen: y, keyword: _, schema: m, parentSchema: E, $data: P, it: T } = w;
    c(T, p);
    const k = !P && p.compile ? p.compile.call(T.self, m, E, T) : p.validate, V = d(y, _, k), U = y.let("valid");
    w.block$data(U, x), w.ok((v = p.valid) !== null && v !== void 0 ? v : U);
    function x() {
      if (p.errors === !1)
        z(), p.modifying && i(w), X(() => w.error());
      else {
        const J = p.async ? ne() : ce();
        p.modifying && i(w), X(() => o(w, J));
      }
    }
    function ne() {
      const J = y.let("ruleErrs", null);
      return y.try(() => z((0, e._)`await `), (A) => y.assign(U, !1).if((0, e._)`${A} instanceof ${T.ValidationError}`, () => y.assign(J, (0, e._)`${A}.errors`), () => y.throw(A))), J;
    }
    function ce() {
      const J = (0, e._)`${V}.errors`;
      return y.assign(J, null), z(e.nil), J;
    }
    function z(J = p.async ? (0, e._)`await ` : e.nil) {
      const A = T.opts.passContext ? t.default.this : t.default.self, L = !("compile" in p && !P || p.schema === !1);
      y.assign(U, (0, e._)`${J}${(0, r.callValidateCode)(w, V, A, L)}`, p.modifying);
    }
    function X(J) {
      var A;
      y.if((0, e.not)((A = p.valid) !== null && A !== void 0 ? A : U), J);
    }
  }
  Ye.funcKeywordCode = a;
  function i(w) {
    const { gen: p, data: v, it: y } = w;
    p.if(y.parentData, () => p.assign(v, (0, e._)`${y.parentData}[${y.parentDataProperty}]`));
  }
  function o(w, p) {
    const { gen: v } = w;
    v.if((0, e._)`Array.isArray(${p})`, () => {
      v.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(w);
    }, () => w.error());
  }
  function c({ schemaEnv: w }, p) {
    if (p.async && !w.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(w, p, v) {
    if (v === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return w.scopeValue("keyword", typeof v == "function" ? { ref: v } : { ref: v, code: (0, e.stringify)(v) });
  }
  function u(w, p, v = !1) {
    return !p.length || p.some((y) => y === "array" ? Array.isArray(w) : y === "object" ? w && typeof w == "object" && !Array.isArray(w) : typeof w == y || v && typeof w > "u");
  }
  Ye.validSchemaType = u;
  function h({ schema: w, opts: p, self: v, errSchemaPath: y }, _, m) {
    if (Array.isArray(_.keyword) ? !_.keyword.includes(m) : _.keyword !== m)
      throw new Error("ajv implementation error");
    const E = _.dependencies;
    if (E != null && E.some((P) => !Object.prototype.hasOwnProperty.call(w, P)))
      throw new Error(`parent schema must have dependencies of ${m}: ${E.join(",")}`);
    if (_.validateSchema && !_.validateSchema(w[m])) {
      const T = `keyword "${m}" value is invalid at path "${y}": ` + v.errorsText(_.validateSchema.errors);
      if (p.validateSchema === "log")
        v.logger.error(T);
      else
        throw new Error(T);
    }
  }
  return Ye.validateKeywordUsage = h, Ye;
}
var _t = {}, Hi;
function P$() {
  if (Hi) return _t;
  Hi = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.extendSubschemaMode = _t.extendSubschemaData = _t.getSubschema = void 0;
  const e = oe, t = W;
  function r(a, { keyword: i, schemaProp: o, schema: c, schemaPath: d, errSchemaPath: u, topSchemaRef: h }) {
    if (i !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const w = a.schema[i];
      return o === void 0 ? {
        schema: w,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}`
      } : {
        schema: w[o],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (c !== void 0) {
      if (d === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  _t.getSubschema = r;
  function n(a, i, { dataProp: o, dataPropType: c, data: d, dataTypes: u, propertyName: h }) {
    if (d !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: w } = i;
    if (o !== void 0) {
      const { errorPath: v, dataPathArr: y, opts: _ } = i, m = w.let("data", (0, e._)`${i.data}${(0, e.getProperty)(o)}`, !0);
      p(m), a.errorPath = (0, e.str)`${v}${(0, t.getErrorPath)(o, c, _.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${o}`, a.dataPathArr = [...y, a.parentDataProperty];
    }
    if (d !== void 0) {
      const v = d instanceof e.Name ? d : w.let("data", d, !0);
      p(v), h !== void 0 && (a.propertyName = h);
    }
    u && (a.dataTypes = u);
    function p(v) {
      a.data = v, a.dataLevel = i.dataLevel + 1, a.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), a.parentData = i.data, a.dataNames = [...i.dataNames, v];
    }
  }
  _t.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: i, jtdMetadata: o, compositeRule: c, createErrors: d, allErrors: u }) {
    c !== void 0 && (a.compositeRule = c), d !== void 0 && (a.createErrors = d), u !== void 0 && (a.allErrors = u), a.jtdDiscriminator = i, a.jtdMetadata = o;
  }
  return _t.extendSubschemaMode = s, _t;
}
var Ie = {}, Vl = { exports: {} }, Dt = Vl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  In(t, n, s, e, "", e);
};
Dt.keywords = {
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
Dt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Dt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Dt.skipKeywords = {
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
function In(e, t, r, n, s, a, i, o, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, o, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Dt.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            In(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in Dt.propsKeywords) {
        if (h && typeof h == "object")
          for (var p in h)
            In(e, t, r, h[p], s + "/" + u + "/" + N$(p), a, s, u, n, p);
      } else (u in Dt.keywords || e.allKeys && !(u in Dt.skipKeywords)) && In(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, o, c, d);
  }
}
function N$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var R$ = Vl.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const O$ = W, I$ = Bn, T$ = R$, j$ = /* @__PURE__ */ new Set([
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
function k$(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ys(e) : t ? Fl(e) <= t : !1;
}
Ie.inlineRef = k$;
const A$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ys(e) {
  for (const t in e) {
    if (A$.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ys) || typeof r == "object" && Ys(r))
      return !0;
  }
  return !1;
}
function Fl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !j$.has(r) && (typeof e[r] == "object" && (0, O$.eachItem)(e[r], (n) => t += Fl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function zl(e, t = "", r) {
  r !== !1 && (t = fr(t));
  const n = e.parse(t);
  return Ul(e, n);
}
Ie.getFullPath = zl;
function Ul(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = Ul;
const C$ = /#\/?$/;
function fr(e) {
  return e ? e.replace(C$, "") : "";
}
Ie.normalizeId = fr;
function D$(e, t, r) {
  return r = fr(r), e.resolve(t, r);
}
Ie.resolveUrl = D$;
const M$ = /^[a-z_][-a-z0-9._]*$/i;
function L$(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = fr(e[r] || t), a = { "": s }, i = zl(n, s, !1), o = {}, c = /* @__PURE__ */ new Set();
  return T$(e, { allKeys: !0 }, (h, w, p, v) => {
    if (v === void 0)
      return;
    const y = i + w;
    let _ = a[v];
    typeof h[r] == "string" && (_ = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[w] = _;
    function m(P) {
      const T = this.opts.uriResolver.resolve;
      if (P = fr(_ ? T(_, P) : P), c.has(P))
        throw u(P);
      c.add(P);
      let k = this.refs[P];
      return typeof k == "string" && (k = this.refs[k]), typeof k == "object" ? d(h, k.schema, P) : P !== fr(y) && (P[0] === "#" ? (d(h, o[P], P), o[P] = h) : this.refs[P] = y), P;
    }
    function E(P) {
      if (typeof P == "string") {
        if (!M$.test(P))
          throw new Error(`invalid anchor "${P}"`);
        m.call(this, `#${P}`);
      }
    }
  }), o;
  function d(h, w, p) {
    if (w !== void 0 && !I$(h, w))
      throw u(p);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = L$;
var Bi;
function ts() {
  if (Bi) return $t;
  Bi = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.getData = $t.KeywordCxt = $t.validateFunctionCode = void 0;
  const e = Qy(), t = Se, r = kl(), n = Se, s = f$(), a = S$(), i = P$(), o = oe, c = dt, d = Ie, u = W, h = es();
  function w($) {
    if (k($) && (U($), T($))) {
      _($);
      return;
    }
    p($, () => (0, e.topBoolOrEmptySchema)($));
  }
  $t.validateFunctionCode = w;
  function p({ gen: $, validateName: S, schema: O, schemaEnv: j, opts: D }, F) {
    D.code.es5 ? $.func(S, (0, o._)`${c.default.data}, ${c.default.valCxt}`, j.$async, () => {
      $.code((0, o._)`"use strict"; ${E(O, D)}`), y($, D), $.code(F);
    }) : $.func(S, (0, o._)`${c.default.data}, ${v(D)}`, j.$async, () => $.code(E(O, D)).code(F));
  }
  function v($) {
    return (0, o._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${$.dynamicRef ? (0, o._)`, ${c.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function y($, S) {
    $.if(c.default.valCxt, () => {
      $.var(c.default.instancePath, (0, o._)`${c.default.valCxt}.${c.default.instancePath}`), $.var(c.default.parentData, (0, o._)`${c.default.valCxt}.${c.default.parentData}`), $.var(c.default.parentDataProperty, (0, o._)`${c.default.valCxt}.${c.default.parentDataProperty}`), $.var(c.default.rootData, (0, o._)`${c.default.valCxt}.${c.default.rootData}`), S.dynamicRef && $.var(c.default.dynamicAnchors, (0, o._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      $.var(c.default.instancePath, (0, o._)`""`), $.var(c.default.parentData, (0, o._)`undefined`), $.var(c.default.parentDataProperty, (0, o._)`undefined`), $.var(c.default.rootData, c.default.data), S.dynamicRef && $.var(c.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function _($) {
    const { schema: S, opts: O, gen: j } = $;
    p($, () => {
      O.$comment && S.$comment && J($), ce($), j.let(c.default.vErrors, null), j.let(c.default.errors, 0), O.unevaluated && m($), x($), A($);
    });
  }
  function m($) {
    const { gen: S, validateName: O } = $;
    $.evaluated = S.const("evaluated", (0, o._)`${O}.evaluated`), S.if((0, o._)`${$.evaluated}.dynamicProps`, () => S.assign((0, o._)`${$.evaluated}.props`, (0, o._)`undefined`)), S.if((0, o._)`${$.evaluated}.dynamicItems`, () => S.assign((0, o._)`${$.evaluated}.items`, (0, o._)`undefined`));
  }
  function E($, S) {
    const O = typeof $ == "object" && $[S.schemaId];
    return O && (S.code.source || S.code.process) ? (0, o._)`/*# sourceURL=${O} */` : o.nil;
  }
  function P($, S) {
    if (k($) && (U($), T($))) {
      V($, S);
      return;
    }
    (0, e.boolOrEmptySchema)($, S);
  }
  function T({ schema: $, self: S }) {
    if (typeof $ == "boolean")
      return !$;
    for (const O in $)
      if (S.RULES.all[O])
        return !0;
    return !1;
  }
  function k($) {
    return typeof $.schema != "boolean";
  }
  function V($, S) {
    const { schema: O, gen: j, opts: D } = $;
    D.$comment && O.$comment && J($), z($), X($);
    const F = j.const("_errs", c.default.errors);
    x($, F), j.var(S, (0, o._)`${F} === ${c.default.errors}`);
  }
  function U($) {
    (0, u.checkUnknownRules)($), ne($);
  }
  function x($, S) {
    if ($.opts.jtd)
      return H($, [], !1, S);
    const O = (0, t.getSchemaTypes)($.schema), j = (0, t.coerceAndCheckDataType)($, O);
    H($, O, !j, S);
  }
  function ne($) {
    const { schema: S, errSchemaPath: O, opts: j, self: D } = $;
    S.$ref && j.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(S, D.RULES) && D.logger.warn(`$ref: keywords ignored in schema at path "${O}"`);
  }
  function ce($) {
    const { schema: S, opts: O } = $;
    S.default !== void 0 && O.useDefaults && O.strictSchema && (0, u.checkStrictMode)($, "default is ignored in the schema root");
  }
  function z($) {
    const S = $.schema[$.opts.schemaId];
    S && ($.baseId = (0, d.resolveUrl)($.opts.uriResolver, $.baseId, S));
  }
  function X($) {
    if ($.schema.$async && !$.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function J({ gen: $, schemaEnv: S, schema: O, errSchemaPath: j, opts: D }) {
    const F = O.$comment;
    if (D.$comment === !0)
      $.code((0, o._)`${c.default.self}.logger.log(${F})`);
    else if (typeof D.$comment == "function") {
      const le = (0, o.str)`${j}/$comment`, _e = $.scopeValue("root", { ref: S.root });
      $.code((0, o._)`${c.default.self}.opts.$comment(${F}, ${le}, ${_e}.schema)`);
    }
  }
  function A($) {
    const { gen: S, schemaEnv: O, validateName: j, ValidationError: D, opts: F } = $;
    O.$async ? S.if((0, o._)`${c.default.errors} === 0`, () => S.return(c.default.data), () => S.throw((0, o._)`new ${D}(${c.default.vErrors})`)) : (S.assign((0, o._)`${j}.errors`, c.default.vErrors), F.unevaluated && L($), S.return((0, o._)`${c.default.errors} === 0`));
  }
  function L({ gen: $, evaluated: S, props: O, items: j }) {
    O instanceof o.Name && $.assign((0, o._)`${S}.props`, O), j instanceof o.Name && $.assign((0, o._)`${S}.items`, j);
  }
  function H($, S, O, j) {
    const { gen: D, schema: F, data: le, allErrors: _e, opts: de, self: fe } = $, { RULES: ue } = fe;
    if (F.$ref && (de.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(F, ue))) {
      D.block(() => C($, "$ref", ue.all.$ref.definition));
      return;
    }
    de.jtd || Q($, S), D.block(() => {
      for (const ye of ue.rules)
        Ue(ye);
      Ue(ue.post);
    });
    function Ue(ye) {
      (0, r.shouldUseGroup)(F, ye) && (ye.type ? (D.if((0, n.checkDataType)(ye.type, le, de.strictNumbers)), q($, ye), S.length === 1 && S[0] === ye.type && O && (D.else(), (0, n.reportTypeError)($)), D.endIf()) : q($, ye), _e || D.if((0, o._)`${c.default.errors} === ${j || 0}`));
    }
  }
  function q($, S) {
    const { gen: O, schema: j, opts: { useDefaults: D } } = $;
    D && (0, s.assignDefaults)($, S.type), O.block(() => {
      for (const F of S.rules)
        (0, r.shouldUseRule)(j, F) && C($, F.keyword, F.definition, S.type);
    });
  }
  function Q($, S) {
    $.schemaEnv.meta || !$.opts.strictTypes || (G($, S), $.opts.allowUnionTypes || I($, S), g($, $.dataTypes));
  }
  function G($, S) {
    if (S.length) {
      if (!$.dataTypes.length) {
        $.dataTypes = S;
        return;
      }
      S.forEach((O) => {
        b($.dataTypes, O) || f($, `type "${O}" not allowed by context "${$.dataTypes.join(",")}"`);
      }), l($, S);
    }
  }
  function I($, S) {
    S.length > 1 && !(S.length === 2 && S.includes("null")) && f($, "use allowUnionTypes to allow union type keyword");
  }
  function g($, S) {
    const O = $.self.RULES.all;
    for (const j in O) {
      const D = O[j];
      if (typeof D == "object" && (0, r.shouldUseRule)($.schema, D)) {
        const { type: F } = D.definition;
        F.length && !F.some((le) => R(S, le)) && f($, `missing type "${F.join(",")}" for keyword "${j}"`);
      }
    }
  }
  function R($, S) {
    return $.includes(S) || S === "number" && $.includes("integer");
  }
  function b($, S) {
    return $.includes(S) || S === "integer" && $.includes("number");
  }
  function l($, S) {
    const O = [];
    for (const j of $.dataTypes)
      b(S, j) ? O.push(j) : S.includes("integer") && j === "number" && O.push("integer");
    $.dataTypes = O;
  }
  function f($, S) {
    const O = $.schemaEnv.baseId + $.errSchemaPath;
    S += ` at "${O}" (strictTypes)`, (0, u.checkStrictMode)($, S, $.opts.strictTypes);
  }
  class N {
    constructor(S, O, j) {
      if ((0, a.validateKeywordUsage)(S, O, j), this.gen = S.gen, this.allErrors = S.allErrors, this.keyword = j, this.data = S.data, this.schema = S.schema[j], this.$data = O.$data && S.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(S, this.schema, j, this.$data), this.schemaType = O.schemaType, this.parentSchema = S.schema, this.params = {}, this.it = S, this.def = O, this.$data)
        this.schemaCode = S.gen.const("vSchema", B(this.$data, S));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, O.schemaType, O.allowUndefined))
        throw new Error(`${j} value must be ${JSON.stringify(O.schemaType)}`);
      ("code" in O ? O.trackErrors : O.errors !== !1) && (this.errsCount = S.gen.const("_errs", c.default.errors));
    }
    result(S, O, j) {
      this.failResult((0, o.not)(S), O, j);
    }
    failResult(S, O, j) {
      this.gen.if(S), j ? j() : this.error(), O ? (this.gen.else(), O(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(S, O) {
      this.failResult((0, o.not)(S), void 0, O);
    }
    fail(S) {
      if (S === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(S), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(S) {
      if (!this.$data)
        return this.fail(S);
      const { schemaCode: O } = this;
      this.fail((0, o._)`${O} !== undefined && (${(0, o.or)(this.invalid$data(), S)})`);
    }
    error(S, O, j) {
      if (O) {
        this.setParams(O), this._error(S, j), this.setParams({});
        return;
      }
      this._error(S, j);
    }
    _error(S, O) {
      (S ? h.reportExtraError : h.reportError)(this, this.def.error, O);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(S) {
      this.allErrors || this.gen.if(S);
    }
    setParams(S, O) {
      O ? Object.assign(this.params, S) : this.params = S;
    }
    block$data(S, O, j = o.nil) {
      this.gen.block(() => {
        this.check$data(S, j), O();
      });
    }
    check$data(S = o.nil, O = o.nil) {
      if (!this.$data)
        return;
      const { gen: j, schemaCode: D, schemaType: F, def: le } = this;
      j.if((0, o.or)((0, o._)`${D} === undefined`, O)), S !== o.nil && j.assign(S, !0), (F.length || le.validateSchema) && (j.elseIf(this.invalid$data()), this.$dataError(), S !== o.nil && j.assign(S, !1)), j.else();
    }
    invalid$data() {
      const { gen: S, schemaCode: O, schemaType: j, def: D, it: F } = this;
      return (0, o.or)(le(), _e());
      function le() {
        if (j.length) {
          if (!(O instanceof o.Name))
            throw new Error("ajv implementation error");
          const de = Array.isArray(j) ? j : [j];
          return (0, o._)`${(0, n.checkDataTypes)(de, O, F.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function _e() {
        if (D.validateSchema) {
          const de = S.scopeValue("validate$data", { ref: D.validateSchema });
          return (0, o._)`!${de}(${O})`;
        }
        return o.nil;
      }
    }
    subschema(S, O) {
      const j = (0, i.getSubschema)(this.it, S);
      (0, i.extendSubschemaData)(j, this.it, S), (0, i.extendSubschemaMode)(j, S);
      const D = { ...this.it, ...j, items: void 0, props: void 0 };
      return P(D, O), D;
    }
    mergeEvaluated(S, O) {
      const { it: j, gen: D } = this;
      j.opts.unevaluated && (j.props !== !0 && S.props !== void 0 && (j.props = u.mergeEvaluated.props(D, S.props, j.props, O)), j.items !== !0 && S.items !== void 0 && (j.items = u.mergeEvaluated.items(D, S.items, j.items, O)));
    }
    mergeValidEvaluated(S, O) {
      const { it: j, gen: D } = this;
      if (j.opts.unevaluated && (j.props !== !0 || j.items !== !0))
        return D.if(O, () => this.mergeEvaluated(S, o.Name)), !0;
    }
  }
  $t.KeywordCxt = N;
  function C($, S, O, j) {
    const D = new N($, O, S);
    "code" in O ? O.code(D, j) : D.$data && O.validate ? (0, a.funcKeywordCode)(D, O) : "macro" in O ? (0, a.macroKeywordCode)(D, O) : (O.compile || O.validate) && (0, a.funcKeywordCode)(D, O);
  }
  const M = /^\/(?:[^~]|~0|~1)*$/, Y = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function B($, { dataLevel: S, dataNames: O, dataPathArr: j }) {
    let D, F;
    if ($ === "")
      return c.default.rootData;
    if ($[0] === "/") {
      if (!M.test($))
        throw new Error(`Invalid JSON-pointer: ${$}`);
      D = $, F = c.default.rootData;
    } else {
      const fe = Y.exec($);
      if (!fe)
        throw new Error(`Invalid JSON-pointer: ${$}`);
      const ue = +fe[1];
      if (D = fe[2], D === "#") {
        if (ue >= S)
          throw new Error(de("property/index", ue));
        return j[S - ue];
      }
      if (ue > S)
        throw new Error(de("data", ue));
      if (F = O[S - ue], !D)
        return F;
    }
    let le = F;
    const _e = D.split("/");
    for (const fe of _e)
      fe && (F = (0, o._)`${F}${(0, o.getProperty)((0, u.unescapeJsonPointer)(fe))}`, le = (0, o._)`${le} && ${F}`);
    return le;
    function de(fe, ue) {
      return `Cannot access ${fe} ${ue} levels up, current level is ${S}`;
    }
  }
  return $t.getData = B, $t;
}
var ln = {}, Wi;
function uo() {
  if (Wi) return ln;
  Wi = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return ln.default = e, ln;
}
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
const bs = Ie;
class V$ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, bs.resolveUrl)(t, r, n), this.missingSchema = (0, bs.normalizeId)((0, bs.getFullPath)(t, this.missingRef));
  }
}
Er.default = V$;
var ze = {};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.resolveSchema = ze.getCompilingSchema = ze.resolveRef = ze.compileSchema = ze.SchemaEnv = void 0;
const Qe = oe, F$ = uo(), Kt = dt, rt = Ie, Ji = W, z$ = ts();
class rs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
ze.SchemaEnv = rs;
function fo(e) {
  const t = ql.call(this, e);
  if (t)
    return t;
  const r = (0, rt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Qe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let o;
  e.$async && (o = i.scopeValue("Error", {
    ref: F$.default,
    code: (0, Qe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Kt.default.data,
    parentData: Kt.default.parentData,
    parentDataProperty: Kt.default.parentDataProperty,
    dataNames: [Kt.default.data],
    dataPathArr: [Qe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Qe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Qe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Qe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, z$.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(Kt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const p = new Function(`${Kt.default.self}`, `${Kt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: y } = d;
      p.evaluated = {
        props: v instanceof Qe.Name ? void 0 : v,
        items: y instanceof Qe.Name ? void 0 : y,
        dynamicProps: v instanceof Qe.Name,
        dynamicItems: y instanceof Qe.Name
      }, p.source && (p.source.evaluated = (0, Qe.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
ze.compileSchema = fo;
function U$(e, t, r) {
  var n;
  r = (0, rt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = G$.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    i && (a = new rs({ schema: i, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = q$.call(this, a);
}
ze.resolveRef = U$;
function q$(e) {
  return (0, rt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : fo.call(this, e);
}
function ql(e) {
  for (const t of this._compilations)
    if (K$(t, e))
      return t;
}
ze.getCompilingSchema = ql;
function K$(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function G$(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ns.call(this, e, t);
}
function ns(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, rt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ss.call(this, r, e);
  const a = (0, rt.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const o = ns.call(this, e, i);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : Ss.call(this, r, o);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || fo.call(this, i), a === (0, rt.normalizeId)(t)) {
      const { schema: o } = i, { schemaId: c } = this.opts, d = o[c];
      return d && (s = (0, rt.resolveUrl)(this.opts.uriResolver, s, d)), new rs({ schema: o, schemaId: c, root: e, baseId: s });
    }
    return Ss.call(this, r, i);
  }
}
ze.resolveSchema = ns;
const H$ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ss(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ji.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !H$.has(o) && d && (t = (0, rt.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ji.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, rt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ns.call(this, n, o);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new rs({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const B$ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", W$ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", J$ = "object", X$ = [
  "$data"
], Y$ = {
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
}, Q$ = !1, Z$ = {
  $id: B$,
  description: W$,
  type: J$,
  required: X$,
  properties: Y$,
  additionalProperties: Q$
};
var ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const Kl = hl;
Kl.code = 'require("ajv/dist/runtime/uri").default';
ho.default = Kl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ts();
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
  const n = uo(), s = Er, a = xt, i = ze, o = oe, c = Ie, d = Se, u = W, h = Z$, w = ho, p = (I, g) => new RegExp(I, g);
  p.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function P(I) {
    var g, R, b, l, f, N, C, M, Y, B, $, S, O, j, D, F, le, _e, de, fe, ue, Ue, ye, Mt, Lt;
    const We = I.strict, Vt = (g = I.code) === null || g === void 0 ? void 0 : g.optimize, Nr = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Rr = (b = (R = I.code) === null || R === void 0 ? void 0 : R.regExp) !== null && b !== void 0 ? b : p, fs = (l = I.uriResolver) !== null && l !== void 0 ? l : w.default;
    return {
      strictSchema: (N = (f = I.strictSchema) !== null && f !== void 0 ? f : We) !== null && N !== void 0 ? N : !0,
      strictNumbers: (M = (C = I.strictNumbers) !== null && C !== void 0 ? C : We) !== null && M !== void 0 ? M : !0,
      strictTypes: (B = (Y = I.strictTypes) !== null && Y !== void 0 ? Y : We) !== null && B !== void 0 ? B : "log",
      strictTuples: (S = ($ = I.strictTuples) !== null && $ !== void 0 ? $ : We) !== null && S !== void 0 ? S : "log",
      strictRequired: (j = (O = I.strictRequired) !== null && O !== void 0 ? O : We) !== null && j !== void 0 ? j : !1,
      code: I.code ? { ...I.code, optimize: Nr, regExp: Rr } : { optimize: Nr, regExp: Rr },
      loopRequired: (D = I.loopRequired) !== null && D !== void 0 ? D : E,
      loopEnum: (F = I.loopEnum) !== null && F !== void 0 ? F : E,
      meta: (le = I.meta) !== null && le !== void 0 ? le : !0,
      messages: (_e = I.messages) !== null && _e !== void 0 ? _e : !0,
      inlineRefs: (de = I.inlineRefs) !== null && de !== void 0 ? de : !0,
      schemaId: (fe = I.schemaId) !== null && fe !== void 0 ? fe : "$id",
      addUsedSchema: (ue = I.addUsedSchema) !== null && ue !== void 0 ? ue : !0,
      validateSchema: (Ue = I.validateSchema) !== null && Ue !== void 0 ? Ue : !0,
      validateFormats: (ye = I.validateFormats) !== null && ye !== void 0 ? ye : !0,
      unicodeRegExp: (Mt = I.unicodeRegExp) !== null && Mt !== void 0 ? Mt : !0,
      int32range: (Lt = I.int32range) !== null && Lt !== void 0 ? Lt : !0,
      uriResolver: fs
    };
  }
  class T {
    constructor(g = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), g = this.opts = { ...g, ...P(g) };
      const { es5: R, lines: b } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: y, es5: R, lines: b }), this.logger = X(g.logger);
      const l = g.validateFormats;
      g.validateFormats = !1, this.RULES = (0, a.getRules)(), k.call(this, _, g, "NOT SUPPORTED"), k.call(this, m, g, "DEPRECATED", "warn"), this._metaOpts = ce.call(this), g.formats && x.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), g.keywords && ne.call(this, g.keywords), typeof g.meta == "object" && this.addMetaSchema(g.meta), U.call(this), g.validateFormats = l;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: g, meta: R, schemaId: b } = this.opts;
      let l = h;
      b === "id" && (l = { ...h }, l.id = l.$id, delete l.$id), R && g && this.addMetaSchema(l, l[b], !1);
    }
    defaultMeta() {
      const { meta: g, schemaId: R } = this.opts;
      return this.opts.defaultMeta = typeof g == "object" ? g[R] || g : void 0;
    }
    validate(g, R) {
      let b;
      if (typeof g == "string") {
        if (b = this.getSchema(g), !b)
          throw new Error(`no schema with key or ref "${g}"`);
      } else
        b = this.compile(g);
      const l = b(R);
      return "$async" in b || (this.errors = b.errors), l;
    }
    compile(g, R) {
      const b = this._addSchema(g, R);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(g, R) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return l.call(this, g, R);
      async function l(B, $) {
        await f.call(this, B.$schema);
        const S = this._addSchema(B, $);
        return S.validate || N.call(this, S);
      }
      async function f(B) {
        B && !this.getSchema(B) && await l.call(this, { $ref: B }, !0);
      }
      async function N(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch ($) {
          if (!($ instanceof s.default))
            throw $;
          return C.call(this, $), await M.call(this, $.missingSchema), N.call(this, B);
        }
      }
      function C({ missingSchema: B, missingRef: $ }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${$} cannot be resolved`);
      }
      async function M(B) {
        const $ = await Y.call(this, B);
        this.refs[B] || await f.call(this, $.$schema), this.refs[B] || this.addSchema($, B, R);
      }
      async function Y(B) {
        const $ = this._loading[B];
        if ($)
          return $;
        try {
          return await (this._loading[B] = b(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(g, R, b, l = this.opts.validateSchema) {
      if (Array.isArray(g)) {
        for (const N of g)
          this.addSchema(N, void 0, b, l);
        return this;
      }
      let f;
      if (typeof g == "object") {
        const { schemaId: N } = this.opts;
        if (f = g[N], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return R = (0, c.normalizeId)(R || f), this._checkUnique(R), this.schemas[R] = this._addSchema(g, b, R, l, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(g, R, b = this.opts.validateSchema) {
      return this.addSchema(g, R, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(g, R) {
      if (typeof g == "boolean")
        return !0;
      let b;
      if (b = g.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const l = this.validate(b, g);
      if (!l && R) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return l;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(g) {
      let R;
      for (; typeof (R = V.call(this, g)) == "string"; )
        g = R;
      if (R === void 0) {
        const { schemaId: b } = this.opts, l = new i.SchemaEnv({ schema: {}, schemaId: b });
        if (R = i.resolveSchema.call(this, l, g), !R)
          return;
        this.refs[g] = R;
      }
      return R.validate || this._compileSchemaEnv(R);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(g) {
      if (g instanceof RegExp)
        return this._removeAllSchemas(this.schemas, g), this._removeAllSchemas(this.refs, g), this;
      switch (typeof g) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const R = V.call(this, g);
          return typeof R == "object" && this._cache.delete(R.schema), delete this.schemas[g], delete this.refs[g], this;
        }
        case "object": {
          const R = g;
          this._cache.delete(R);
          let b = g[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(g) {
      for (const R of g)
        this.addKeyword(R);
      return this;
    }
    addKeyword(g, R) {
      let b;
      if (typeof g == "string")
        b = g, typeof R == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), R.keyword = b);
      else if (typeof g == "object" && R === void 0) {
        if (R = g, b = R.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (A.call(this, b, R), !R)
        return (0, u.eachItem)(b, (f) => L.call(this, f)), this;
      q.call(this, R);
      const l = {
        ...R,
        type: (0, d.getJSONTypes)(R.type),
        schemaType: (0, d.getJSONTypes)(R.schemaType)
      };
      return (0, u.eachItem)(b, l.type.length === 0 ? (f) => L.call(this, f, l) : (f) => l.type.forEach((N) => L.call(this, f, l, N))), this;
    }
    getKeyword(g) {
      const R = this.RULES.all[g];
      return typeof R == "object" ? R.definition : !!R;
    }
    // Remove keyword
    removeKeyword(g) {
      const { RULES: R } = this;
      delete R.keywords[g], delete R.all[g];
      for (const b of R.rules) {
        const l = b.rules.findIndex((f) => f.keyword === g);
        l >= 0 && b.rules.splice(l, 1);
      }
      return this;
    }
    // Add format
    addFormat(g, R) {
      return typeof R == "string" && (R = new RegExp(R)), this.formats[g] = R, this;
    }
    errorsText(g = this.errors, { separator: R = ", ", dataVar: b = "data" } = {}) {
      return !g || g.length === 0 ? "No errors" : g.map((l) => `${b}${l.instancePath} ${l.message}`).reduce((l, f) => l + R + f);
    }
    $dataMetaSchema(g, R) {
      const b = this.RULES.all;
      g = JSON.parse(JSON.stringify(g));
      for (const l of R) {
        const f = l.split("/").slice(1);
        let N = g;
        for (const C of f)
          N = N[C];
        for (const C in b) {
          const M = b[C];
          if (typeof M != "object")
            continue;
          const { $data: Y } = M.definition, B = N[C];
          Y && B && (N[C] = G(B));
        }
      }
      return g;
    }
    _removeAllSchemas(g, R) {
      for (const b in g) {
        const l = g[b];
        (!R || R.test(b)) && (typeof l == "string" ? delete g[b] : l && !l.meta && (this._cache.delete(l.schema), delete g[b]));
      }
    }
    _addSchema(g, R, b, l = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let N;
      const { schemaId: C } = this.opts;
      if (typeof g == "object")
        N = g[C];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof g != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get(g);
      if (M !== void 0)
        return M;
      b = (0, c.normalizeId)(N || b);
      const Y = c.getSchemaRefs.call(this, g, b);
      return M = new i.SchemaEnv({ schema: g, schemaId: C, meta: R, baseId: b, localRefs: Y }), this._cache.set(M.schema, M), f && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = M), l && this.validateSchema(g, !0), M;
    }
    _checkUnique(g) {
      if (this.schemas[g] || this.refs[g])
        throw new Error(`schema with key or id "${g}" already exists`);
    }
    _compileSchemaEnv(g) {
      if (g.meta ? this._compileMetaSchema(g) : i.compileSchema.call(this, g), !g.validate)
        throw new Error("ajv implementation error");
      return g.validate;
    }
    _compileMetaSchema(g) {
      const R = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, g);
      } finally {
        this.opts = R;
      }
    }
  }
  T.ValidationError = n.default, T.MissingRefError = s.default, e.default = T;
  function k(I, g, R, b = "error") {
    for (const l in I) {
      const f = l;
      f in g && this.logger[b](`${R}: option ${l}. ${I[f]}`);
    }
  }
  function V(I) {
    return I = (0, c.normalizeId)(I), this.schemas[I] || this.refs[I];
  }
  function U() {
    const I = this.opts.schemas;
    if (I)
      if (Array.isArray(I))
        this.addSchema(I);
      else
        for (const g in I)
          this.addSchema(I[g], g);
  }
  function x() {
    for (const I in this.opts.formats) {
      const g = this.opts.formats[I];
      g && this.addFormat(I, g);
    }
  }
  function ne(I) {
    if (Array.isArray(I)) {
      this.addVocabulary(I);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const g in I) {
      const R = I[g];
      R.keyword || (R.keyword = g), this.addKeyword(R);
    }
  }
  function ce() {
    const I = { ...this.opts };
    for (const g of v)
      delete I[g];
    return I;
  }
  const z = { log() {
  }, warn() {
  }, error() {
  } };
  function X(I) {
    if (I === !1)
      return z;
    if (I === void 0)
      return console;
    if (I.log && I.warn && I.error)
      return I;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function A(I, g) {
    const { RULES: R } = this;
    if ((0, u.eachItem)(I, (b) => {
      if (R.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!J.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!g && g.$data && !("code" in g || "validate" in g))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(I, g, R) {
    var b;
    const l = g == null ? void 0 : g.post;
    if (R && l)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let N = l ? f.post : f.rules.find(({ type: M }) => M === R);
    if (N || (N = { type: R, rules: [] }, f.rules.push(N)), f.keywords[I] = !0, !g)
      return;
    const C = {
      keyword: I,
      definition: {
        ...g,
        type: (0, d.getJSONTypes)(g.type),
        schemaType: (0, d.getJSONTypes)(g.schemaType)
      }
    };
    g.before ? H.call(this, N, C, g.before) : N.rules.push(C), f.all[I] = C, (b = g.implements) === null || b === void 0 || b.forEach((M) => this.addKeyword(M));
  }
  function H(I, g, R) {
    const b = I.rules.findIndex((l) => l.keyword === R);
    b >= 0 ? I.rules.splice(b, 0, g) : (I.rules.push(g), this.logger.warn(`rule ${R} is not defined`));
  }
  function q(I) {
    let { metaSchema: g } = I;
    g !== void 0 && (I.$data && this.opts.$data && (g = G(g)), I.validateSchema = this.compile(g, !0));
  }
  const Q = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function G(I) {
    return { anyOf: [I, Q] };
  }
})(Nl);
var mo = {}, po = {}, yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const x$ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
yo.default = x$;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const e0 = Er, Xi = ie, Fe = oe, nr = dt, Yi = ze, un = W, t0 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: o, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Yi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new e0.default(n.opts.uriResolver, s, r);
    if (u instanceof Yi.SchemaEnv)
      return w(u);
    return p(u);
    function h() {
      if (a === d)
        return Tn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Tn(e, (0, Fe._)`${v}.validate`, d, d.$async);
    }
    function w(v) {
      const y = Gl(e, v);
      Tn(e, y, v, v.$async);
    }
    function p(v) {
      const y = t.scopeValue("schema", o.code.source === !0 ? { ref: v, code: (0, Fe.stringify)(v) } : { ref: v }), _ = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Fe.nil,
        topSchemaRef: y,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function Gl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Fe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = Gl;
function Tn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: o, opts: c } = a, d = c.passContext ? nr.default.this : Fe.nil;
  n ? u() : h();
  function u() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Fe._)`await ${(0, Xi.callValidateCode)(e, t, d)}`), p(t), i || s.assign(v, !0);
    }, (y) => {
      s.if((0, Fe._)`!(${y} instanceof ${a.ValidationError})`, () => s.throw(y)), w(y), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Xi.callValidateCode)(e, t, d), () => p(t), () => w(t));
  }
  function w(v) {
    const y = (0, Fe._)`${v}.errors`;
    s.assign(nr.default.vErrors, (0, Fe._)`${nr.default.vErrors} === null ? ${y} : ${nr.default.vErrors}.concat(${y})`), s.assign(nr.default.errors, (0, Fe._)`${nr.default.vErrors}.length`);
  }
  function p(v) {
    var y;
    if (!a.opts.unevaluated)
      return;
    const _ = (y = r == null ? void 0 : r.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = un.mergeEvaluated.props(s, _.props, a.props));
      else {
        const m = s.var("props", (0, Fe._)`${v}.evaluated.props`);
        a.props = un.mergeEvaluated.props(s, m, a.props, Fe.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = un.mergeEvaluated.items(s, _.items, a.items));
      else {
        const m = s.var("items", (0, Fe._)`${v}.evaluated.items`);
        a.items = un.mergeEvaluated.items(s, m, a.items, Fe.Name);
      }
  }
}
er.callRef = Tn;
er.default = t0;
Object.defineProperty(po, "__esModule", { value: !0 });
const r0 = yo, n0 = er, s0 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  r0.default,
  n0.default
];
po.default = s0;
var $o = {}, go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const Fn = oe, Ot = Fn.operators, zn = {
  maximum: { okStr: "<=", ok: Ot.LTE, fail: Ot.GT },
  minimum: { okStr: ">=", ok: Ot.GTE, fail: Ot.LT },
  exclusiveMaximum: { okStr: "<", ok: Ot.LT, fail: Ot.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ot.GT, fail: Ot.LTE }
}, a0 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Fn.str)`must be ${zn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Fn._)`{comparison: ${zn[e].okStr}, limit: ${t}}`
}, o0 = {
  keyword: Object.keys(zn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: a0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Fn._)`${r} ${zn[t].fail} ${n} || isNaN(${r})`);
  }
};
go.default = o0;
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
const zr = oe, i0 = {
  message: ({ schemaCode: e }) => (0, zr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, zr._)`{multipleOf: ${e}}`
}, c0 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: i0,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), o = a ? (0, zr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, zr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, zr._)`(${n} === 0 || (${i} = ${r}/${n}, ${o}))`);
  }
};
_o.default = c0;
var vo = {}, wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
function Hl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
wo.default = Hl;
Hl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(vo, "__esModule", { value: !0 });
const Wt = oe, l0 = W, u0 = wo, d0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Wt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Wt._)`{limit: ${e}}`
}, f0 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: d0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Wt.operators.GT : Wt.operators.LT, i = s.opts.unicode === !1 ? (0, Wt._)`${r}.length` : (0, Wt._)`${(0, l0.useFunc)(e.gen, u0.default)}(${r})`;
    e.fail$data((0, Wt._)`${i} ${a} ${n}`);
  }
};
vo.default = f0;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const h0 = ie, Un = oe, m0 = {
  message: ({ schemaCode: e }) => (0, Un.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Un._)`{pattern: ${e}}`
}, p0 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: m0,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, Un._)`(new RegExp(${s}, ${i}))` : (0, h0.usePattern)(e, n);
    e.fail$data((0, Un._)`!${o}.test(${t})`);
  }
};
Eo.default = p0;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Ur = oe, y0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ur.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ur._)`{limit: ${e}}`
}, $0 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: y0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Ur.operators.GT : Ur.operators.LT;
    e.fail$data((0, Ur._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
bo.default = $0;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const jr = ie, qr = oe, g0 = W, _0 = {
  message: ({ params: { missingProperty: e } }) => (0, qr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, qr._)`{missingProperty: ${e}}`
}, v0 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: _0,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: o } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (i.allErrors ? d() : u(), o.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const y of r)
        if ((p == null ? void 0 : p[y]) === void 0 && !v.has(y)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${y}" is not defined at "${_}" (strictRequired)`;
          (0, g0.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(qr.nil, h);
      else
        for (const p of r)
          (0, jr.checkReportMissingProp)(e, p);
    }
    function u() {
      const p = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => w(p, v)), e.ok(v);
      } else
        t.if((0, jr.checkMissingProp)(e, r, p)), (0, jr.reportMissingProp)(e, p), t.else();
    }
    function h() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, jr.noPropertyInData)(t, s, p, o.ownProperties), () => e.error());
      });
    }
    function w(p, v) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(v, (0, jr.propertyInData)(t, s, p, o.ownProperties)), t.if((0, qr.not)(v), () => {
          e.error(), t.break();
        });
      }, qr.nil);
    }
  }
};
So.default = v0;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Kr = oe, w0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Kr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Kr._)`{limit: ${e}}`
}, E0 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: w0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Kr.operators.GT : Kr.operators.LT;
    e.fail$data((0, Kr._)`${r}.length ${s} ${n}`);
  }
};
Po.default = E0;
var No = {}, Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
const Bl = Bn;
Bl.code = 'require("ajv/dist/runtime/equal").default';
Qr.default = Bl;
Object.defineProperty(No, "__esModule", { value: !0 });
const Ps = Se, Re = oe, b0 = W, S0 = Qr, P0 = {
  message: ({ params: { i: e, j: t } }) => (0, Re.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Re._)`{i: ${e}, j: ${t}}`
}, N0 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: P0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: o } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Ps.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Re._)`${i} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Re._)`${r}.length`), y = t.let("j");
      e.setParams({ i: v, j: y }), t.assign(c, !0), t.if((0, Re._)`${v} > 1`, () => (h() ? w : p)(v, y));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function w(v, y) {
      const _ = t.name("item"), m = (0, Ps.checkDataTypes)(d, _, o.opts.strictNumbers, Ps.DataType.Wrong), E = t.const("indices", (0, Re._)`{}`);
      t.for((0, Re._)`;${v}--;`, () => {
        t.let(_, (0, Re._)`${r}[${v}]`), t.if(m, (0, Re._)`continue`), d.length > 1 && t.if((0, Re._)`typeof ${_} == "string"`, (0, Re._)`${_} += "_"`), t.if((0, Re._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign(y, (0, Re._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Re._)`${E}[${_}] = ${v}`);
      });
    }
    function p(v, y) {
      const _ = (0, b0.useFunc)(t, S0.default), m = t.name("outer");
      t.label(m).for((0, Re._)`;${v}--;`, () => t.for((0, Re._)`${y} = ${v}; ${y}--;`, () => t.if((0, Re._)`${_}(${r}[${v}], ${r}[${y}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
No.default = N0;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Qs = oe, R0 = W, O0 = Qr, I0 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Qs._)`{allowedValue: ${e}}`
}, T0 = {
  keyword: "const",
  $data: !0,
  error: I0,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Qs._)`!${(0, R0.useFunc)(t, O0.default)}(${r}, ${s})`) : e.fail((0, Qs._)`${a} !== ${r}`);
  }
};
Ro.default = T0;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Dr = oe, j0 = W, k0 = Qr, A0 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Dr._)`{allowedValues: ${e}}`
}, C0 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: A0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const o = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, j0.useFunc)(t, k0.default));
    let u;
    if (o || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", a);
      u = (0, Dr.or)(...s.map((v, y) => w(p, y)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (p) => t.if((0, Dr._)`${d()}(${r}, ${p})`, () => t.assign(u, !0).break()));
    }
    function w(p, v) {
      const y = s[v];
      return typeof y == "object" && y !== null ? (0, Dr._)`${d()}(${r}, ${p}[${v}])` : (0, Dr._)`${r} === ${y}`;
    }
  }
};
Oo.default = C0;
Object.defineProperty($o, "__esModule", { value: !0 });
const D0 = go, M0 = _o, L0 = vo, V0 = Eo, F0 = bo, z0 = So, U0 = Po, q0 = No, K0 = Ro, G0 = Oo, H0 = [
  // number
  D0.default,
  M0.default,
  // string
  L0.default,
  V0.default,
  // object
  F0.default,
  z0.default,
  // array
  U0.default,
  q0.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  K0.default,
  G0.default
];
$o.default = H0;
var Io = {}, br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.validateAdditionalItems = void 0;
const Jt = oe, Zs = W, B0 = {
  message: ({ params: { len: e } }) => (0, Jt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Jt._)`{limit: ${e}}`
}, W0 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: B0,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Zs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Wl(e, n);
  }
};
function Wl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const o = r.const("len", (0, Jt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Jt._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Zs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Jt._)`${o} <= ${t.length}`);
    r.if((0, Jt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, o, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Zs.Type.Num }, d), i.allErrors || r.if((0, Jt.not)(d), () => r.break());
    });
  }
}
br.validateAdditionalItems = Wl;
br.default = W0;
var To = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.validateTuple = void 0;
const Qi = oe, jn = W, J0 = ie, X0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Jl(e, "additionalItems", t);
    r.items = !0, !(0, jn.alwaysValidSchema)(r, t) && e.ok((0, J0.validateArray)(e));
  }
};
function Jl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: o } = e;
  u(s), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = jn.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), d = n.const("len", (0, Qi._)`${a}.length`);
  r.forEach((h, w) => {
    (0, jn.alwaysValidSchema)(o, h) || (n.if((0, Qi._)`${d} > ${w}`, () => e.subschema({
      keyword: i,
      schemaProp: w,
      dataProp: w
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: w, errSchemaPath: p } = o, v = r.length, y = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (w.strictTuples && !y) {
      const _ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, jn.checkStrictMode)(o, _, w.strictTuples);
    }
  }
}
Sr.validateTuple = Jl;
Sr.default = X0;
Object.defineProperty(To, "__esModule", { value: !0 });
const Y0 = Sr, Q0 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Y0.validateTuple)(e, "items")
};
To.default = Q0;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Zi = oe, Z0 = W, x0 = ie, eg = br, tg = {
  message: ({ params: { len: e } }) => (0, Zi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zi._)`{limit: ${e}}`
}, rg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: tg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Z0.alwaysValidSchema)(n, t) && (s ? (0, eg.validateAdditionalItems)(e, s) : e.ok((0, x0.validateArray)(e)));
  }
};
jo.default = rg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Be = oe, dn = W, ng = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be.str)`must contain at least ${e} valid item(s)` : (0, Be.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be._)`{minContains: ${e}}` : (0, Be._)`{minContains: ${e}, maxContains: ${t}}`
}, sg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: ng,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, o;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, o = d) : i = 1;
    const u = t.const("len", (0, Be._)`${s}.length`);
    if (e.setParams({ min: i, max: o }), o === void 0 && i === 0) {
      (0, dn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && i > o) {
      (0, dn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, dn.alwaysValidSchema)(a, r)) {
      let y = (0, Be._)`${u} >= ${i}`;
      o !== void 0 && (y = (0, Be._)`${y} && ${u} <= ${o}`), e.pass(y);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    o === void 0 && i === 1 ? p(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), o !== void 0 && t.if((0, Be._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const y = t.name("_valid"), _ = t.let("count", 0);
      p(y, () => t.if(y, () => v(_)));
    }
    function p(y, _) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: dn.Type.Num,
          compositeRule: !0
        }, y), _();
      });
    }
    function v(y) {
      t.code((0, Be._)`${y}++`), o === void 0 ? t.if((0, Be._)`${y} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Be._)`${y} > ${o}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Be._)`${y} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
ko.default = sg;
var Xl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = W, n = ie;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
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
    code(c) {
      const [d, u] = a(c);
      i(c, d), o(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(c[h]) ? d : u;
      w[h] = c[h];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: h, it: w } = c;
    if (Object.keys(d).length === 0)
      return;
    const p = u.let("missing");
    for (const v in d) {
      const y = d[v];
      if (y.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, v, w.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: y.length,
        deps: y.join(", ")
      }), w.allErrors ? u.if(_, () => {
        for (const m of y)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, y, p)})`), (0, n.reportMissingProp)(c, p), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function o(c, d = c.schema) {
    const { gen: u, data: h, keyword: w, it: p } = c, v = u.name("valid");
    for (const y in d)
      (0, r.alwaysValidSchema)(p, d[y]) || (u.if(
        (0, n.propertyInData)(u, h, y, p.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: w, schemaProp: y }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = o, e.default = s;
})(Xl);
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Yl = oe, ag = W, og = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Yl._)`{propertyName: ${e.propertyName}}`
}, ig = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: og,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, ag.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Yl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ao.default = ig;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
const fn = ie, xe = oe, cg = dt, hn = W, lg = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, xe._)`{additionalProperty: ${e.additionalProperty}}`
}, ug = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: lg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, hn.alwaysValidSchema)(i, r))
      return;
    const d = (0, fn.allSchemaProperties)(n.properties), u = (0, fn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, xe._)`${a} === ${cg.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? v(_) : t.if(w(_), () => v(_));
      });
    }
    function w(_) {
      let m;
      if (d.length > 8) {
        const E = (0, hn.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, fn.isOwnProperty)(t, E, _);
      } else d.length ? m = (0, xe.or)(...d.map((E) => (0, xe._)`${_} === ${E}`)) : m = xe.nil;
      return u.length && (m = (0, xe.or)(m, ...u.map((E) => (0, xe._)`${(0, fn.usePattern)(e, E)}.test(${_})`))), (0, xe.not)(m);
    }
    function p(_) {
      t.code((0, xe._)`delete ${s}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, hn.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (y(_, m, !1), t.if((0, xe.not)(m), () => {
          e.reset(), p(_);
        })) : (y(_, m), o || t.if((0, xe.not)(m), () => t.break()));
      }
    }
    function y(_, m, E) {
      const P = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: hn.Type.Str
      };
      E === !1 && Object.assign(P, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(P, m);
    }
  }
};
ss.default = ug;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const dg = ts(), xi = ie, Ns = W, ec = ss, fg = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ec.default.code(new dg.KeywordCxt(a, ec.default, "additionalProperties"));
    const i = (0, xi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Ns.mergeEvaluated.props(t, (0, Ns.toHash)(i), a.props));
    const o = i.filter((h) => !(0, Ns.alwaysValidSchema)(a, r[h]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const h of o)
      d(h) ? u(h) : (t.if((0, xi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Co.default = fg;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const tc = ie, mn = oe, rc = W, nc = W, hg = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, o = (0, tc.allSchemaProperties)(r), c = o.filter((y) => (0, rc.alwaysValidSchema)(a, r[y]));
    if (o.length === 0 || c.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof mn.Name) && (a.props = (0, nc.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const y of o)
        d && p(y), a.allErrors ? v(y) : (t.var(u, !0), v(y), t.if(u));
    }
    function p(y) {
      for (const _ in d)
        new RegExp(y).test(_) && (0, rc.checkStrictMode)(a, `property ${_} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function v(y) {
      t.forIn("key", n, (_) => {
        t.if((0, mn._)`${(0, tc.usePattern)(e, y)}.test(${_})`, () => {
          const m = c.includes(y);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: _,
            dataPropType: nc.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, mn._)`${h}[${_}]`, !0) : !m && !a.allErrors && t.if((0, mn.not)(u), () => t.break());
        });
      });
    }
  }
};
Do.default = hg;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const mg = W, pg = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, mg.alwaysValidSchema)(n, r)) {
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
Mo.default = pg;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const yg = ie, $g = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: yg.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Lo.default = $g;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const kn = oe, gg = W, _g = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, kn._)`{passingSchemas: ${e.passing}}`
}, vg = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: _g,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, gg.alwaysValidSchema)(s, u) ? t.var(c, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, kn._)`${c} && ${i}`).assign(i, !1).assign(o, (0, kn._)`[${o}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(o, h), w && e.mergeEvaluated(w, kn.Name);
        });
      });
    }
  }
};
Vo.default = vg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const wg = W, Eg = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, wg.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(o);
    });
  }
};
Fo.default = Eg;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const qn = oe, Ql = W, bg = {
  message: ({ params: e }) => (0, qn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, qn._)`{failingKeyword: ${e.ifClause}}`
}, Sg = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: bg,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Ql.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = sc(n, "then"), a = sc(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(o, d("then", u), d("else", u));
    } else s ? t.if(o, d("then")) : t.if((0, qn.not)(o), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, o);
        t.assign(i, o), e.mergeValidEvaluated(w, i), h ? t.assign(h, (0, qn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function sc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Ql.alwaysValidSchema)(e, r);
}
zo.default = Sg;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const Pg = W, Ng = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Pg.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Uo.default = Ng;
Object.defineProperty(Io, "__esModule", { value: !0 });
const Rg = br, Og = To, Ig = Sr, Tg = jo, jg = ko, kg = Xl, Ag = Ao, Cg = ss, Dg = Co, Mg = Do, Lg = Mo, Vg = Lo, Fg = Vo, zg = Fo, Ug = zo, qg = Uo;
function Kg(e = !1) {
  const t = [
    // any
    Lg.default,
    Vg.default,
    Fg.default,
    zg.default,
    Ug.default,
    qg.default,
    // object
    Ag.default,
    Cg.default,
    kg.default,
    Dg.default,
    Mg.default
  ];
  return e ? t.push(Og.default, Tg.default) : t.push(Rg.default, Ig.default), t.push(jg.default), t;
}
Io.default = Kg;
var qo = {}, Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const Ee = oe, Gg = {
  message: ({ schemaCode: e }) => (0, Ee.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ee._)`{format: ${e}}`
}, Hg = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Gg,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: o } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = o;
    if (!c.validateFormats)
      return;
    s ? w() : p();
    function w() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), y = r.const("fDef", (0, Ee._)`${v}[${i}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, Ee._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => r.assign(_, (0, Ee._)`${y}.type || "string"`).assign(m, (0, Ee._)`${y}.validate`), () => r.assign(_, (0, Ee._)`"string"`).assign(m, y)), e.fail$data((0, Ee.or)(E(), P()));
      function E() {
        return c.strictSchema === !1 ? Ee.nil : (0, Ee._)`${i} && !${m}`;
      }
      function P() {
        const T = u.$async ? (0, Ee._)`(${y}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Ee._)`${m}(${n})`, k = (0, Ee._)`(typeof ${m} == "function" ? ${T} : ${m}.test(${n}))`;
        return (0, Ee._)`${m} && ${m} !== true && ${_} === ${t} && !${k}`;
      }
    }
    function p() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [y, _, m] = P(v);
      y === t && e.pass(T());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(k());
          return;
        }
        throw new Error(k());
        function k() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function P(k) {
        const V = k instanceof RegExp ? (0, Ee.regexpCode)(k) : c.code.formats ? (0, Ee._)`${c.code.formats}${(0, Ee.getProperty)(a)}` : void 0, U = r.scopeValue("formats", { key: a, ref: k, code: V });
        return typeof k == "object" && !(k instanceof RegExp) ? [k.type || "string", k.validate, (0, Ee._)`${U}.validate`] : ["string", k, U];
      }
      function T() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Ee._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, Ee._)`${m}(${n})` : (0, Ee._)`${m}.test(${n})`;
      }
    }
  }
};
Ko.default = Hg;
Object.defineProperty(qo, "__esModule", { value: !0 });
const Bg = Ko, Wg = [Bg.default];
qo.default = Wg;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.contentVocabulary = yr.metadataVocabulary = void 0;
yr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
yr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(mo, "__esModule", { value: !0 });
const Jg = po, Xg = $o, Yg = Io, Qg = qo, ac = yr, Zg = [
  Jg.default,
  Xg.default,
  (0, Yg.default)(),
  Qg.default,
  ac.metadataVocabulary,
  ac.contentVocabulary
];
mo.default = Zg;
var Go = {}, as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.DiscrError = void 0;
var oc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(oc || (as.DiscrError = oc = {}));
Object.defineProperty(Go, "__esModule", { value: !0 });
const or = oe, xs = as, ic = ze, xg = Er, e_ = W, t_ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === xs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, or._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, r_ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: t_,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, or._)`${r}${(0, or.getProperty)(o)}`);
    t.if((0, or._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: xs.DiscrError.Tag, tag: d, tagName: o })), e.ok(c);
    function u() {
      const p = w();
      t.if(!1);
      for (const v in p)
        t.elseIf((0, or._)`${d} === ${v}`), t.assign(c, h(p[v]));
      t.else(), e.error(!1, { discrError: xs.DiscrError.Mapping, tag: d, tagName: o }), t.endIf();
    }
    function h(p) {
      const v = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: p }, v);
      return e.mergeEvaluated(y, or.Name), v;
    }
    function w() {
      var p;
      const v = {}, y = m(s);
      let _ = !0;
      for (let T = 0; T < i.length; T++) {
        let k = i[T];
        if (k != null && k.$ref && !(0, e_.schemaHasRulesButRef)(k, a.self.RULES)) {
          const U = k.$ref;
          if (k = ic.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, U), k instanceof ic.SchemaEnv && (k = k.schema), k === void 0)
            throw new xg.default(a.opts.uriResolver, a.baseId, U);
        }
        const V = (p = k == null ? void 0 : k.properties) === null || p === void 0 ? void 0 : p[o];
        if (typeof V != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        _ = _ && (y || m(k)), E(V, T);
      }
      if (!_)
        throw new Error(`discriminator: "${o}" must be required`);
      return v;
      function m({ required: T }) {
        return Array.isArray(T) && T.includes(o);
      }
      function E(T, k) {
        if (T.const)
          P(T.const, k);
        else if (T.enum)
          for (const V of T.enum)
            P(V, k);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function P(T, k) {
        if (typeof T != "string" || T in v)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        v[T] = k;
      }
    }
  }
};
Go.default = r_;
const n_ = "http://json-schema.org/draft-07/schema#", s_ = "http://json-schema.org/draft-07/schema#", a_ = "Core schema meta-schema", o_ = {
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
}, i_ = [
  "object",
  "boolean"
], c_ = {
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
}, l_ = {
  $schema: n_,
  $id: s_,
  title: a_,
  definitions: o_,
  type: i_,
  properties: c_,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Nl, n = mo, s = Go, a = l_, i = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(v, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = ts();
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
  var h = uo();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = Er;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(Bs, Bs.exports);
var u_ = Bs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = u_, r = oe, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: o, schemaCode: c }) => (0, r.str)`should be ${s[o].okStr} ${c}`,
    params: ({ keyword: o, schemaCode: c }) => (0, r._)`{comparison: ${s[o].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(o) {
      const { gen: c, data: d, schemaCode: u, keyword: h, it: w } = o, { opts: p, self: v } = w;
      if (!p.validateFormats)
        return;
      const y = new t.KeywordCxt(w, v.RULES.all.format.definition, "format");
      y.$data ? _() : m();
      function _() {
        const P = c.scopeValue("formats", {
          ref: v.formats,
          code: p.code.formats
        }), T = c.const("fmt", (0, r._)`${P}[${y.schemaCode}]`);
        o.fail$data((0, r.or)((0, r._)`typeof ${T} != "object"`, (0, r._)`${T} instanceof RegExp`, (0, r._)`typeof ${T}.compare != "function"`, E(T)));
      }
      function m() {
        const P = y.schema, T = v.formats[P];
        if (!T || T === !0)
          return;
        if (typeof T != "object" || T instanceof RegExp || typeof T.compare != "function")
          throw new Error(`"${h}": format "${P}" does not define "compare" function`);
        const k = c.scopeValue("formats", {
          key: P,
          ref: T,
          code: p.code.formats ? (0, r._)`${p.code.formats}${(0, r.getProperty)(P)}` : void 0
        });
        o.fail$data(E(k));
      }
      function E(P) {
        return (0, r._)`${P}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = i;
})(Pl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Sl, n = Pl, s = oe, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), o = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, a), d;
    const [h, w] = u.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], p = u.formats || r.formatNames;
    return c(d, p, h, w), u.keywords && (0, n.default)(d), d;
  };
  o.get = (d, u = "full") => {
    const w = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!w)
      throw new Error(`Unknown format "${d}"`);
    return w;
  };
  function c(d, u, h, w) {
    var p, v;
    (p = (v = d.opts.code).formats) !== null && p !== void 0 || (v.formats = (0, s._)`require("ajv-formats/dist/formats").${w}`);
    for (const y of u)
      d.addFormat(y, h[y]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(Hs, Hs.exports);
var d_ = Hs.exports;
const f_ = /* @__PURE__ */ Uc(d_), h_ = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !m_(s, a) && n || Object.defineProperty(e, r, a);
}, m_ = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, p_ = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, y_ = (e, t) => `/* Wrapped ${e}*/
${t}`, $_ = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), g_ = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), __ = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = y_.bind(null, n, t.toString());
  Object.defineProperty(s, "name", g_);
  const { writable: a, enumerable: i, configurable: o } = $_;
  Object.defineProperty(e, "toString", { value: s, writable: a, enumerable: i, configurable: o });
};
function v_(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    h_(e, t, s, r);
  return p_(e, t), __(e, t, n), e;
}
const cc = (e, t = {}) => {
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
  let i, o, c;
  const d = function(...u) {
    const h = this, w = () => {
      i = void 0, o && (clearTimeout(o), o = void 0), a && (c = e.apply(h, u));
    }, p = () => {
      o = void 0, i && (clearTimeout(i), i = void 0), a && (c = e.apply(h, u));
    }, v = s && !i;
    return clearTimeout(i), i = setTimeout(w, r), n > 0 && n !== Number.POSITIVE_INFINITY && !o && (o = setTimeout(p, n)), v && (c = e.apply(h, u)), c;
  };
  return v_(d, e), d.cancel = () => {
    i && (clearTimeout(i), i = void 0), o && (clearTimeout(o), o = void 0);
  }, d;
};
var ea = { exports: {} };
const w_ = "2.0.0", Zl = 256, E_ = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, b_ = 16, S_ = Zl - 6, P_ = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var os = {
  MAX_LENGTH: Zl,
  MAX_SAFE_COMPONENT_LENGTH: b_,
  MAX_SAFE_BUILD_LENGTH: S_,
  MAX_SAFE_INTEGER: E_,
  RELEASE_TYPES: P_,
  SEMVER_SPEC_VERSION: w_,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const N_ = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var is = N_;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = os, a = is;
  t = e.exports = {};
  const i = t.re = [], o = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const w = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", s],
    [w, n]
  ], v = (_) => {
    for (const [m, E] of p)
      _ = _.split(`${m}*`).join(`${m}{0,${E}}`).split(`${m}+`).join(`${m}{1,${E}}`);
    return _;
  }, y = (_, m, E) => {
    const P = v(m), T = h++;
    a(_, T, m), u[_] = T, c[T] = m, d[T] = P, i[T] = new RegExp(m, E ? "g" : void 0), o[T] = new RegExp(P, E ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${w}*`), y("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${w}+`), y("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), y("FULL", `^${c[u.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), y("LOOSE", `^${c[u.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), y("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", c[u.COERCE], !0), y("COERCERTLFULL", c[u.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ea, ea.exports);
var Zr = ea.exports;
const R_ = Object.freeze({ loose: !0 }), O_ = Object.freeze({}), I_ = (e) => e ? typeof e != "object" ? R_ : e : O_;
var Ho = I_;
const lc = /^[0-9]+$/, xl = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = lc.test(e), n = lc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, T_ = (e, t) => xl(t, e);
var eu = {
  compareIdentifiers: xl,
  rcompareIdentifiers: T_
};
const pn = is, { MAX_LENGTH: uc, MAX_SAFE_INTEGER: yn } = os, { safeRe: $n, t: gn } = Zr, j_ = Ho, { compareIdentifiers: Rs } = eu;
let k_ = class ct {
  constructor(t, r) {
    if (r = j_(r), t instanceof ct) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > uc)
      throw new TypeError(
        `version is longer than ${uc} characters`
      );
    pn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? $n[gn.LOOSE] : $n[gn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > yn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > yn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > yn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < yn)
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
    if (pn("SemVer.compare", this.version, this.options, t), !(t instanceof ct)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ct(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ct || (t = new ct(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ct || (t = new ct(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (pn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Rs(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ct || (t = new ct(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (pn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Rs(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? $n[gn.PRERELEASELOOSE] : $n[gn.PRERELEASE]);
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
          n === !1 && (a = [r]), Rs(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Me = k_;
const dc = Me, A_ = (e, t, r = !1) => {
  if (e instanceof dc)
    return e;
  try {
    return new dc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Pr = A_;
const C_ = Pr, D_ = (e, t) => {
  const r = C_(e, t);
  return r ? r.version : null;
};
var M_ = D_;
const L_ = Pr, V_ = (e, t) => {
  const r = L_(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var F_ = V_;
const fc = Me, z_ = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new fc(
      e instanceof fc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var U_ = z_;
const hc = Pr, q_ = (e, t) => {
  const r = hc(e, null, !0), n = hc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, o = a ? n : r, c = !!i.prerelease.length;
  if (!!o.prerelease.length && !c) {
    if (!o.patch && !o.minor)
      return "major";
    if (o.compareMain(i) === 0)
      return o.minor && !o.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var K_ = q_;
const G_ = Me, H_ = (e, t) => new G_(e, t).major;
var B_ = H_;
const W_ = Me, J_ = (e, t) => new W_(e, t).minor;
var X_ = J_;
const Y_ = Me, Q_ = (e, t) => new Y_(e, t).patch;
var Z_ = Q_;
const x_ = Pr, ev = (e, t) => {
  const r = x_(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var tv = ev;
const mc = Me, rv = (e, t, r) => new mc(e, r).compare(new mc(t, r));
var at = rv;
const nv = at, sv = (e, t, r) => nv(t, e, r);
var av = sv;
const ov = at, iv = (e, t) => ov(e, t, !0);
var cv = iv;
const pc = Me, lv = (e, t, r) => {
  const n = new pc(e, r), s = new pc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Bo = lv;
const uv = Bo, dv = (e, t) => e.sort((r, n) => uv(r, n, t));
var fv = dv;
const hv = Bo, mv = (e, t) => e.sort((r, n) => hv(n, r, t));
var pv = mv;
const yv = at, $v = (e, t, r) => yv(e, t, r) > 0;
var cs = $v;
const gv = at, _v = (e, t, r) => gv(e, t, r) < 0;
var Wo = _v;
const vv = at, wv = (e, t, r) => vv(e, t, r) === 0;
var tu = wv;
const Ev = at, bv = (e, t, r) => Ev(e, t, r) !== 0;
var ru = bv;
const Sv = at, Pv = (e, t, r) => Sv(e, t, r) >= 0;
var Jo = Pv;
const Nv = at, Rv = (e, t, r) => Nv(e, t, r) <= 0;
var Xo = Rv;
const Ov = tu, Iv = ru, Tv = cs, jv = Jo, kv = Wo, Av = Xo, Cv = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Ov(e, r, n);
    case "!=":
      return Iv(e, r, n);
    case ">":
      return Tv(e, r, n);
    case ">=":
      return jv(e, r, n);
    case "<":
      return kv(e, r, n);
    case "<=":
      return Av(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var nu = Cv;
const Dv = Me, Mv = Pr, { safeRe: _n, t: vn } = Zr, Lv = (e, t) => {
  if (e instanceof Dv)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? _n[vn.COERCEFULL] : _n[vn.COERCE]);
  else {
    const c = t.includePrerelease ? _n[vn.COERCERTLFULL] : _n[vn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return Mv(`${n}.${s}.${a}${i}${o}`, t);
};
var Vv = Lv;
class Fv {
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
var zv = Fv, Os, yc;
function ot() {
  if (yc) return Os;
  yc = 1;
  const e = /\s+/g;
  class t {
    constructor(L, H) {
      if (H = s(H), L instanceof t)
        return L.loose === !!H.loose && L.includePrerelease === !!H.includePrerelease ? L : new t(L.raw, H);
      if (L instanceof a)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((q) => this.parseRange(q.trim())).filter((q) => q.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const q = this.set[0];
        if (this.set = this.set.filter((Q) => !y(Q[0])), this.set.length === 0)
          this.set = [q];
        else if (this.set.length > 1) {
          for (const Q of this.set)
            if (Q.length === 1 && _(Q[0])) {
              this.set = [Q];
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
          const H = this.set[L];
          for (let q = 0; q < H.length; q++)
            q > 0 && (this.formatted += " "), this.formatted += H[q].toString().trim();
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
      const q = ((this.options.includePrerelease && p) | (this.options.loose && v)) + ":" + L, Q = n.get(q);
      if (Q)
        return Q;
      const G = this.options.loose, I = G ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      L = L.replace(I, X(this.options.includePrerelease)), i("hyphen replace", L), L = L.replace(c[d.COMPARATORTRIM], u), i("comparator trim", L), L = L.replace(c[d.TILDETRIM], h), i("tilde trim", L), L = L.replace(c[d.CARETTRIM], w), i("caret trim", L);
      let g = L.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => z(f, this.options));
      G && (g = g.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", g);
      const R = /* @__PURE__ */ new Map(), b = g.map((f) => new a(f, this.options));
      for (const f of b) {
        if (y(f))
          return [f];
        R.set(f.value, f);
      }
      R.size > 1 && R.has("") && R.delete("");
      const l = [...R.values()];
      return n.set(q, l), l;
    }
    intersects(L, H) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((q) => m(q, H) && L.set.some((Q) => m(Q, H) && q.every((G) => Q.every((I) => G.intersects(I, H)))));
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
      for (let H = 0; H < this.set.length; H++)
        if (J(this.set[H], L, this.options))
          return !0;
      return !1;
    }
  }
  Os = t;
  const r = zv, n = new r(), s = Ho, a = ls(), i = is, o = Me, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: w
  } = Zr, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: v } = os, y = (A) => A.value === "<0.0.0-0", _ = (A) => A.value === "", m = (A, L) => {
    let H = !0;
    const q = A.slice();
    let Q = q.pop();
    for (; H && q.length; )
      H = q.every((G) => Q.intersects(G, L)), Q = q.pop();
    return H;
  }, E = (A, L) => (A = A.replace(c[d.BUILD], ""), i("comp", A, L), A = V(A, L), i("caret", A), A = T(A, L), i("tildes", A), A = x(A, L), i("xrange", A), A = ce(A, L), i("stars", A), A), P = (A) => !A || A.toLowerCase() === "x" || A === "*", T = (A, L) => A.trim().split(/\s+/).map((H) => k(H, L)).join(" "), k = (A, L) => {
    const H = L.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return A.replace(H, (q, Q, G, I, g) => {
      i("tilde", A, q, Q, G, I, g);
      let R;
      return P(Q) ? R = "" : P(G) ? R = `>=${Q}.0.0 <${+Q + 1}.0.0-0` : P(I) ? R = `>=${Q}.${G}.0 <${Q}.${+G + 1}.0-0` : g ? (i("replaceTilde pr", g), R = `>=${Q}.${G}.${I}-${g} <${Q}.${+G + 1}.0-0`) : R = `>=${Q}.${G}.${I} <${Q}.${+G + 1}.0-0`, i("tilde return", R), R;
    });
  }, V = (A, L) => A.trim().split(/\s+/).map((H) => U(H, L)).join(" "), U = (A, L) => {
    i("caret", A, L);
    const H = L.loose ? c[d.CARETLOOSE] : c[d.CARET], q = L.includePrerelease ? "-0" : "";
    return A.replace(H, (Q, G, I, g, R) => {
      i("caret", A, Q, G, I, g, R);
      let b;
      return P(G) ? b = "" : P(I) ? b = `>=${G}.0.0${q} <${+G + 1}.0.0-0` : P(g) ? G === "0" ? b = `>=${G}.${I}.0${q} <${G}.${+I + 1}.0-0` : b = `>=${G}.${I}.0${q} <${+G + 1}.0.0-0` : R ? (i("replaceCaret pr", R), G === "0" ? I === "0" ? b = `>=${G}.${I}.${g}-${R} <${G}.${I}.${+g + 1}-0` : b = `>=${G}.${I}.${g}-${R} <${G}.${+I + 1}.0-0` : b = `>=${G}.${I}.${g}-${R} <${+G + 1}.0.0-0`) : (i("no pr"), G === "0" ? I === "0" ? b = `>=${G}.${I}.${g}${q} <${G}.${I}.${+g + 1}-0` : b = `>=${G}.${I}.${g}${q} <${G}.${+I + 1}.0-0` : b = `>=${G}.${I}.${g} <${+G + 1}.0.0-0`), i("caret return", b), b;
    });
  }, x = (A, L) => (i("replaceXRanges", A, L), A.split(/\s+/).map((H) => ne(H, L)).join(" ")), ne = (A, L) => {
    A = A.trim();
    const H = L.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return A.replace(H, (q, Q, G, I, g, R) => {
      i("xRange", A, q, Q, G, I, g, R);
      const b = P(G), l = b || P(I), f = l || P(g), N = f;
      return Q === "=" && N && (Q = ""), R = L.includePrerelease ? "-0" : "", b ? Q === ">" || Q === "<" ? q = "<0.0.0-0" : q = "*" : Q && N ? (l && (I = 0), g = 0, Q === ">" ? (Q = ">=", l ? (G = +G + 1, I = 0, g = 0) : (I = +I + 1, g = 0)) : Q === "<=" && (Q = "<", l ? G = +G + 1 : I = +I + 1), Q === "<" && (R = "-0"), q = `${Q + G}.${I}.${g}${R}`) : l ? q = `>=${G}.0.0${R} <${+G + 1}.0.0-0` : f && (q = `>=${G}.${I}.0${R} <${G}.${+I + 1}.0-0`), i("xRange return", q), q;
    });
  }, ce = (A, L) => (i("replaceStars", A, L), A.trim().replace(c[d.STAR], "")), z = (A, L) => (i("replaceGTE0", A, L), A.trim().replace(c[L.includePrerelease ? d.GTE0PRE : d.GTE0], "")), X = (A) => (L, H, q, Q, G, I, g, R, b, l, f, N) => (P(q) ? H = "" : P(Q) ? H = `>=${q}.0.0${A ? "-0" : ""}` : P(G) ? H = `>=${q}.${Q}.0${A ? "-0" : ""}` : I ? H = `>=${H}` : H = `>=${H}${A ? "-0" : ""}`, P(b) ? R = "" : P(l) ? R = `<${+b + 1}.0.0-0` : P(f) ? R = `<${b}.${+l + 1}.0-0` : N ? R = `<=${b}.${l}.${f}-${N}` : A ? R = `<${b}.${l}.${+f + 1}-0` : R = `<=${R}`, `${H} ${R}`.trim()), J = (A, L, H) => {
    for (let q = 0; q < A.length; q++)
      if (!A[q].test(L))
        return !1;
    if (L.prerelease.length && !H.includePrerelease) {
      for (let q = 0; q < A.length; q++)
        if (i(A[q].semver), A[q].semver !== a.ANY && A[q].semver.prerelease.length > 0) {
          const Q = A[q].semver;
          if (Q.major === L.major && Q.minor === L.minor && Q.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Os;
}
var Is, $c;
function ls() {
  if ($c) return Is;
  $c = 1;
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
      u = u.trim().split(/\s+/).join(" "), i("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], w = u.match(h);
      if (!w)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = w[1] !== void 0 ? w[1] : "", this.operator === "=" && (this.operator = ""), w[2] ? this.semver = new o(w[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (i("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new o(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Is = t;
  const r = Ho, { safeRe: n, t: s } = Zr, a = nu, i = is, o = Me, c = ot();
  return Is;
}
const Uv = ot(), qv = (e, t, r) => {
  try {
    t = new Uv(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var us = qv;
const Kv = ot(), Gv = (e, t) => new Kv(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Hv = Gv;
const Bv = Me, Wv = ot(), Jv = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Wv(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new Bv(n, r));
  }), n;
};
var Xv = Jv;
const Yv = Me, Qv = ot(), Zv = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Qv(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new Yv(n, r));
  }), n;
};
var xv = Zv;
const Ts = Me, ew = ot(), gc = cs, tw = (e, t) => {
  e = new ew(e, t);
  let r = new Ts("0.0.0");
  if (e.test(r) || (r = new Ts("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const o = new Ts(i.semver.version);
      switch (i.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!a || gc(o, a)) && (a = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || gc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var rw = tw;
const nw = ot(), sw = (e, t) => {
  try {
    return new nw(e, t).range || "*";
  } catch {
    return null;
  }
};
var aw = sw;
const ow = Me, su = ls(), { ANY: iw } = su, cw = ot(), lw = us, _c = cs, vc = Wo, uw = Xo, dw = Jo, fw = (e, t, r, n) => {
  e = new ow(e, n), t = new cw(t, n);
  let s, a, i, o, c;
  switch (r) {
    case ">":
      s = _c, a = uw, i = vc, o = ">", c = ">=";
      break;
    case "<":
      s = vc, a = dw, i = _c, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (lw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, w = null;
    if (u.forEach((p) => {
      p.semver === iw && (p = new su(">=0.0.0")), h = h || p, w = w || p, s(p.semver, h.semver, n) ? h = p : i(p.semver, w.semver, n) && (w = p);
    }), h.operator === o || h.operator === c || (!w.operator || w.operator === o) && a(e, w.semver))
      return !1;
    if (w.operator === c && i(e, w.semver))
      return !1;
  }
  return !0;
};
var Yo = fw;
const hw = Yo, mw = (e, t, r) => hw(e, t, ">", r);
var pw = mw;
const yw = Yo, $w = (e, t, r) => yw(e, t, "<", r);
var gw = $w;
const wc = ot(), _w = (e, t, r) => (e = new wc(e, r), t = new wc(t, r), e.intersects(t, r));
var vw = _w;
const ww = us, Ew = at;
var bw = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((u, h) => Ew(u, h, r));
  for (const u of i)
    ww(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const o = [];
  for (const [u, h] of n)
    u === h ? o.push(u) : !h && u === i[0] ? o.push("*") : h ? u === i[0] ? o.push(`<=${h}`) : o.push(`${u} - ${h}`) : o.push(`>=${u}`);
  const c = o.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const Ec = ot(), Qo = ls(), { ANY: js } = Qo, kr = us, Zo = at, Sw = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Ec(e, r), t = new Ec(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = Nw(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Pw = [new Qo(">=0.0.0-0")], bc = [new Qo(">=0.0.0")], Nw = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === js) {
    if (t.length === 1 && t[0].semver === js)
      return !0;
    r.includePrerelease ? e = Pw : e = bc;
  }
  if (t.length === 1 && t[0].semver === js) {
    if (r.includePrerelease)
      return !0;
    t = bc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? s = Sc(s, p, r) : p.operator === "<" || p.operator === "<=" ? a = Pc(a, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Zo(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (s && !kr(p, String(s), r) || a && !kr(p, String(a), r))
      return null;
    for (const v of t)
      if (!kr(p, String(v), r))
        return !1;
    return !0;
  }
  let o, c, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, w = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const p of t) {
    if (u = u || p.operator === ">" || p.operator === ">=", d = d || p.operator === "<" || p.operator === "<=", s) {
      if (w && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === w.major && p.semver.minor === w.minor && p.semver.patch === w.patch && (w = !1), p.operator === ">" || p.operator === ">=") {
        if (o = Sc(s, p, r), o === p && o !== s)
          return !1;
      } else if (s.operator === ">=" && !kr(s.semver, String(p), r))
        return !1;
    }
    if (a) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === "<" || p.operator === "<=") {
        if (c = Pc(a, p, r), c === p && c !== a)
          return !1;
      } else if (a.operator === "<=" && !kr(a.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && u && !s && i !== 0 || w || h);
}, Sc = (e, t, r) => {
  if (!e)
    return t;
  const n = Zo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Pc = (e, t, r) => {
  if (!e)
    return t;
  const n = Zo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Rw = Sw;
const ks = Zr, Nc = os, Ow = Me, Rc = eu, Iw = Pr, Tw = M_, jw = F_, kw = U_, Aw = K_, Cw = B_, Dw = X_, Mw = Z_, Lw = tv, Vw = at, Fw = av, zw = cv, Uw = Bo, qw = fv, Kw = pv, Gw = cs, Hw = Wo, Bw = tu, Ww = ru, Jw = Jo, Xw = Xo, Yw = nu, Qw = Vv, Zw = ls(), xw = ot(), eE = us, tE = Hv, rE = Xv, nE = xv, sE = rw, aE = aw, oE = Yo, iE = pw, cE = gw, lE = vw, uE = bw, dE = Rw;
var fE = {
  parse: Iw,
  valid: Tw,
  clean: jw,
  inc: kw,
  diff: Aw,
  major: Cw,
  minor: Dw,
  patch: Mw,
  prerelease: Lw,
  compare: Vw,
  rcompare: Fw,
  compareLoose: zw,
  compareBuild: Uw,
  sort: qw,
  rsort: Kw,
  gt: Gw,
  lt: Hw,
  eq: Bw,
  neq: Ww,
  gte: Jw,
  lte: Xw,
  cmp: Yw,
  coerce: Qw,
  Comparator: Zw,
  Range: xw,
  satisfies: eE,
  toComparators: tE,
  maxSatisfying: rE,
  minSatisfying: nE,
  minVersion: sE,
  validRange: aE,
  outside: oE,
  gtr: iE,
  ltr: cE,
  intersects: lE,
  simplifyRange: uE,
  subset: dE,
  SemVer: Ow,
  re: ks.re,
  src: ks.src,
  tokens: ks.t,
  SEMVER_SPEC_VERSION: Nc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Nc.RELEASE_TYPES,
  compareIdentifiers: Rc.compareIdentifiers,
  rcompareIdentifiers: Rc.rcompareIdentifiers
};
const sr = /* @__PURE__ */ Uc(fE), hE = Object.prototype.toString, mE = "[object Uint8Array]", pE = "[object ArrayBuffer]";
function au(e, t, r) {
  return e ? e.constructor === t ? !0 : hE.call(e) === r : !1;
}
function ou(e) {
  return au(e, Uint8Array, mE);
}
function yE(e) {
  return au(e, ArrayBuffer, pE);
}
function $E(e) {
  return ou(e) || yE(e);
}
function gE(e) {
  if (!ou(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function _E(e) {
  if (!$E(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function As(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((s, a) => s + a.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const s of e)
    gE(s), r.set(s, n), n += s.length;
  return r;
}
const wn = {
  utf8: new globalThis.TextDecoder("utf8")
};
function En(e, t = "utf8") {
  return _E(e), wn[t] ?? (wn[t] = new globalThis.TextDecoder(t)), wn[t].decode(e);
}
function vE(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const wE = new globalThis.TextEncoder();
function bn(e) {
  return vE(e), wE.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const Cs = "aes-256-cbc", It = () => /* @__PURE__ */ Object.create(null), Oc = (e) => e !== void 0, Ds = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, jt = "__internal__", Ms = `${jt}.migrations.version`;
var At, et, Le, Ge, Xt, Yt, mr, lt, Pe, iu, cu, lu, uu, du, fu, hu, mu;
class EE {
  constructor(t = {}) {
    it(this, Pe);
    tr(this, "path");
    tr(this, "events");
    it(this, At);
    it(this, et);
    it(this, Le);
    it(this, Ge, {});
    it(this, Xt, !1);
    it(this, Yt);
    it(this, mr);
    it(this, lt);
    tr(this, "_deserialize", (t) => JSON.parse(t));
    tr(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = ft(this, Pe, iu).call(this, t);
    qe(this, Le, r), ft(this, Pe, cu).call(this, r), ft(this, Pe, uu).call(this, r), ft(this, Pe, du).call(this, r), this.events = new EventTarget(), qe(this, et, r.encryptionKey), this.path = ft(this, Pe, fu).call(this, r), ft(this, Pe, hu).call(this, r), r.watch && this._watch();
  }
  get(t, r) {
    if (te(this, Le).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${jt} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, s = (a, i) => {
      if (Ds(a, i), te(this, Le).accessPropertiesByDotNotation)
        xr(n, a, i);
      else {
        if (a === "__proto__" || a === "constructor" || a === "prototype")
          return;
        n[a] = i;
      }
    };
    if (typeof t == "object") {
      const a = t;
      for (const [i, o] of Object.entries(a))
        s(i, o);
    } else
      s(t, r);
    this.store = n;
  }
  has(t) {
    return te(this, Le).accessPropertiesByDotNotation ? ps(this.store, t) : t in this.store;
  }
  appendToArray(t, r) {
    Ds(t, r);
    const n = te(this, Le).accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
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
      Oc(te(this, Ge)[r]) && this.set(r, te(this, Ge)[r]);
  }
  delete(t) {
    const { store: r } = this;
    te(this, Le).accessPropertiesByDotNotation ? Tu(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = It();
    for (const r of Object.keys(te(this, Ge)))
      Oc(te(this, Ge)[r]) && (Ds(r, te(this, Ge)[r]), te(this, Le).accessPropertiesByDotNotation ? xr(t, r, te(this, Ge)[r]) : t[r] = te(this, Ge)[r]);
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
      const r = ee.readFileSync(this.path, te(this, et) ? null : "utf8"), n = this._decryptData(r), s = this._deserialize(n);
      return te(this, Xt) || this._validate(s), Object.assign(It(), s);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), It();
      if (te(this, Le).clearInvalidConfig) {
        const n = r;
        if (n.name === "SyntaxError" || (t = n.message) != null && t.startsWith("Config schema violation:"))
          return It();
      }
      throw r;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !ps(t, jt))
      try {
        const r = ee.readFileSync(this.path, te(this, et) ? null : "utf8"), n = this._decryptData(r), s = this._deserialize(n);
        ps(s, jt) && xr(t, jt, ni(s, jt));
      } catch {
      }
    te(this, Xt) || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, r]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    te(this, Yt) && (te(this, Yt).close(), qe(this, Yt, void 0)), te(this, mr) && (ee.unwatchFile(this.path), qe(this, mr, !1)), qe(this, lt, void 0);
  }
  _decryptData(t) {
    if (!te(this, et))
      return typeof t == "string" ? t : En(t);
    try {
      const r = t.slice(0, 16), n = Ft.pbkdf2Sync(te(this, et), r, 1e4, 32, "sha512"), s = Ft.createDecipheriv(Cs, n, r), a = t.slice(17), i = typeof a == "string" ? bn(a) : a;
      return En(As([s.update(i), s.final()]));
    } catch {
      try {
        const r = t.slice(0, 16), n = Ft.pbkdf2Sync(te(this, et), r.toString(), 1e4, 32, "sha512"), s = Ft.createDecipheriv(Cs, n, r), a = t.slice(17), i = typeof a == "string" ? bn(a) : a;
        return En(As([s.update(i), s.final()]));
      } catch {
      }
    }
    return typeof t == "string" ? t : En(t);
  }
  _handleStoreChange(t) {
    let r = this.store;
    const n = () => {
      const s = r, a = this.store;
      ti(a, s) || (r = a, t.call(this, a, s));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _handleValueChange(t, r) {
    let n = t();
    const s = () => {
      const a = n, i = t();
      ti(i, a) || (n = i, r.call(this, i, a));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _validate(t) {
    if (!te(this, At) || te(this, At).call(this, t) || !te(this, At).errors)
      return;
    const n = te(this, At).errors.map(({ instancePath: s, message: a = "" }) => `\`${s.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ee.mkdirSync(Z.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (te(this, et)) {
      const n = Ft.randomBytes(16), s = Ft.pbkdf2Sync(te(this, et), n, 1e4, 32, "sha512"), a = Ft.createCipheriv(Cs, s, n);
      r = As([n, bn(":"), a.update(bn(r)), a.final()]);
    }
    if (ge.env.SNAP)
      ee.writeFileSync(this.path, r, { mode: te(this, Le).configFileMode });
    else
      try {
        zc(this.path, r, { mode: te(this, Le).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          ee.writeFileSync(this.path, r, { mode: te(this, Le).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    if (this._ensureDirectory(), ee.existsSync(this.path) || this._write(It()), ge.platform === "win32" || ge.platform === "darwin") {
      te(this, lt) ?? qe(this, lt, cc(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 }));
      const t = Z.dirname(this.path), r = Z.basename(this.path);
      qe(this, Yt, ee.watch(t, { persistent: !1, encoding: "utf8" }, (n, s) => {
        s && s !== r || typeof te(this, lt) == "function" && te(this, lt).call(this);
      }));
    } else
      te(this, lt) ?? qe(this, lt, cc(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 })), ee.watchFile(this.path, { persistent: !1 }, (t, r) => {
        typeof te(this, lt) == "function" && te(this, lt).call(this);
      }), qe(this, mr, !0);
  }
  _migrate(t, r, n) {
    let s = this._get(Ms, "0.0.0");
    const a = Object.keys(t).filter((o) => this._shouldPerformMigration(o, s, r));
    let i = structuredClone(this.store);
    for (const o of a)
      try {
        n && n(this, {
          fromVersion: s,
          toVersion: o,
          finalVersion: r,
          versions: a
        });
        const c = t[o];
        c == null || c(this), this._set(Ms, o), s = o, i = structuredClone(this.store);
      } catch (c) {
        this.store = i;
        try {
          this._write(i);
        } catch {
        }
        const d = c instanceof Error ? c.message : String(c);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${d}`);
      }
    (this._isVersionInRangeFormat(s) || !sr.eq(s, r)) && this._set(Ms, r);
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
    return t === jt || t.startsWith(`${jt}.`);
  }
  _isVersionInRangeFormat(t) {
    return sr.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && sr.satisfies(r, t) ? !1 : sr.satisfies(n, t) : !(sr.lte(t, r) || sr.gt(t, n));
  }
  _get(t, r) {
    return ni(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    xr(n, t, r), this.store = n;
  }
}
At = new WeakMap(), et = new WeakMap(), Le = new WeakMap(), Ge = new WeakMap(), Xt = new WeakMap(), Yt = new WeakMap(), mr = new WeakMap(), lt = new WeakMap(), Pe = new WeakSet(), iu = function(t) {
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
    r.cwd = Cu(r.projectName, { suffix: r.projectSuffix }).config;
  }
  return typeof r.fileExtension == "string" && (r.fileExtension = r.fileExtension.replace(/^\.+/, "")), r;
}, cu = function(t) {
  if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
    return;
  if (t.schema && typeof t.schema != "object")
    throw new TypeError("The `schema` option must be an object.");
  const r = f_.default, n = new Fy.Ajv2020({
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
  qe(this, At, n.compile(s)), ft(this, Pe, lu).call(this, t.schema);
}, lu = function(t) {
  const r = Object.entries(t ?? {});
  for (const [n, s] of r) {
    if (!s || typeof s != "object" || !Object.hasOwn(s, "default"))
      continue;
    const { default: a } = s;
    a !== void 0 && (te(this, Ge)[n] = a);
  }
}, uu = function(t) {
  t.defaults && Object.assign(te(this, Ge), t.defaults);
}, du = function(t) {
  t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
}, fu = function(t) {
  const r = typeof t.fileExtension == "string" ? t.fileExtension : void 0, n = r ? `.${r}` : "";
  return Z.resolve(t.cwd, `${t.configName ?? "config"}${n}`);
}, hu = function(t) {
  if (t.migrations) {
    ft(this, Pe, mu).call(this, t), this._validate(this.store);
    return;
  }
  const r = this.store, n = Object.assign(It(), t.defaults ?? {}, r);
  this._validate(n);
  try {
    ri.deepEqual(r, n);
  } catch {
    this.store = n;
  }
}, mu = function(t) {
  const { migrations: r, projectVersion: n } = t;
  if (r) {
    if (!n)
      throw new Error("Please specify the `projectVersion` option.");
    qe(this, Xt, !0);
    try {
      const s = this.store, a = Object.assign(It(), t.defaults ?? {}, s);
      try {
        ri.deepEqual(s, a);
      } catch {
        this._write(a);
      }
      this._migrate(r, n, t.beforeEachMigration);
    } finally {
      qe(this, Xt, !1);
    }
  }
};
const { app: An, ipcMain: ta, shell: bE } = Ac;
let Ic = !1;
const Tc = () => {
  if (!ta || !An)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: An.getPath("userData"),
    appVersion: An.getVersion()
  };
  return Ic || (ta.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ic = !0), e;
};
let SE = class extends EE {
  constructor(t) {
    let r, n;
    if (ge.type === "renderer") {
      const s = Ac.ipcRenderer.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ta && An && ({ defaultCwd: r, appVersion: n } = Tc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Z.isAbsolute(t.cwd) ? t.cwd : Z.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Tc();
  }
  async openInEditor() {
    const t = await bE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
};
class PE {
  constructor(t) {
    tr(this, "store");
    this.store = new SE(t);
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
const NE = {
  checkRobots: {
    type: "boolean",
    default: !0
  },
  downloadPath: {
    type: "string",
    default: ""
  }
}, ds = new PE({
  name: "app-config",
  schema: NE
}), pu = Z.dirname(Nu(import.meta.url));
process.env.APP_ROOT = Z.join(pu, "..");
const ra = process.env.VITE_DEV_SERVER_URL, HE = Z.join(process.env.APP_ROOT, "dist-electron"), yu = Z.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ra ? Z.join(process.env.APP_ROOT, "public") : yu;
let ve;
const jc = "https://example.com";
let hr = "";
function Wr() {
  let e = ds.get("downloadPath");
  return e == null || e.trim() == "" ? Ru.platform() === "win32" ? "C:\\Users\\Public\\Downloads" : "~/Downloads" : (xo(e), e);
}
function kc(e) {
  let t = "";
  hr != "" && (t = new URL(hr).hostname);
  let r = "";
  e != "" && (r = new URL(e).hostname);
  const n = Z.join(Wr(), "webdownloader", t, r);
  return xo(n), n;
}
function xo(e) {
  ee.mkdirSync(e, { recursive: !0 });
}
function RE(e) {
  var t;
  return e.mimeType || ((t = e.headers) == null ? void 0 : t["content-type"]) || "application/octet-stream";
}
let Kn, Gn;
function OE() {
  console.log("Creating system tray icon.", Z.join(process.env.VITE_PUBLIC, "icon.png"));
  const e = new Su(Z.join(process.env.VITE_PUBLIC, "icon.png")), t = Pu.buildFromTemplate([
    { label: "显示", click: () => {
    } },
    { label: "退出", click: () => Gr.quit() }
  ]);
  e.setToolTip("My App"), e.setContextMenu(t);
}
function $u() {
  console.log("Creating main window.", Z.join(process.env.VITE_PUBLIC, "icon.png")), ve = new Cc({
    icon: Z.join(process.env.VITE_PUBLIC, "icon.png"),
    title: "QCSiteDownloader",
    width: 1420,
    height: 680,
    webPreferences: {
      preload: Z.join(pu, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), Gn = ve;
  const e = new bu();
  ve.contentView.addChildView(e), e.webContents.loadURL(jc), e.setBounds({ x: 0, y: 0, width: 1e3, height: 800 }), e.webContents.setWindowOpenHandler(({ url: s }) => (e.webContents.loadURL(s), { action: "deny" })), e.webContents.on("will-navigate", (s, a) => {
    s.preventDefault(), e.webContents.loadURL(a);
  }), ve.contentView.addChildView(e), Kn = e, xo(Wr());
  const r = e.webContents.debugger;
  r.attach("1.3"), r.sendCommand("Network.enable", {
    maxTotalBufferSize: 100 * 1024 * 1024,
    maxResourceBufferSize: 50 * 1024 * 1024
  }), r.sendCommand("Page.enable");
  const n = /* @__PURE__ */ new Map();
  r.on("message", async (s, a, i) => {
    if (a === "Network.requestWillBeSent") {
      n.set(i.requestId, i.request.url);
      return;
    }
    if (a == "Network.loadingFailed") {
      const u = n.get(i.requestId);
      n.delete(i.requestId), ve == null || ve.webContents.send("item-add", {
        url: u,
        filepath: "",
        isSuccess: !1
      });
      return;
    }
    if (hr == "" || hr == jc || hr == "localhost" || a !== "Network.responseReceived") return;
    const { requestId: o, response: c } = i, d = c.url;
    if (d.startsWith("http")) {
      if (c.status >= 400) {
        ve == null || ve.webContents.send("item-add", {
          url: d,
          filepath: "",
          isSuccess: !1
        });
        return;
      }
      try {
        const u = await r.sendCommand(
          "Network.getResponseBody",
          { requestId: o }
        ), h = u.base64Encoded ? Buffer.from(u.body, "base64") : Buffer.from(u.body), w = RE(c), p = kc(d), v = new URL(d);
        let y = Z.join(p, v.pathname);
        if (y.endsWith("/") && (y += "index"), !Z.extname(y)) {
          const _ = w.includes("html") ? ".html" : w.includes("javascript") ? ".js" : w.includes("css") ? ".css" : w.includes("json") ? ".json" : w.includes("text") ? ".text" : w.includes("webp") ? ".webp" : "";
          y += _;
        }
        ee.mkdirSync(Z.dirname(y), { recursive: !0 }), ee.writeFileSync(y, h), ve == null || ve.webContents.send("item-add", {
          url: d,
          filepath: y,
          isSuccess: !0
        });
      } catch {
      }
    }
  }), e.webContents.on("did-finish-load", async () => {
    if (ve == null || ve == null) {
      console.error("Window is not defined, cannot save HTML.");
      return;
    }
    try {
      const s = await e.webContents.executeJavaScript(
        "document.documentElement.outerHTML"
      );
      if (ve == null || ve == null) {
        console.error("Window is not defined, cannot save HTML.");
        return;
      }
      const a = kc(ve.webContents.getURL()), i = Z.join(a, "index.html");
      ee.writeFileSync(i, s, "utf-8"), ve.webContents.send("item-add", {
        url: e.webContents.getURL(),
        filepath: i,
        isSuccess: !0
      }), setTimeout(() => {
        console.log("Capture complete, exiting.");
      }, 15e3);
    } catch (s) {
      console.error("HTML capture failed:", s);
    }
  }), ve.on("resize", () => {
    sa();
  }), e.webContents.on("did-finish-load", () => {
    sa();
  }), ra ? ve.loadURL(ra) : ve.loadFile(Z.join(yu, "index.html"));
}
Et.handle("update-subview-url", (e, t) => {
  Kn && t && (hr = t, console.log("Updating subView URL to:", t), Kn.webContents.loadURL(t));
});
Et.handle("select-download-path", async () => {
  const e = await vu.showOpenDialog({
    title: "选择下载文件夹",
    defaultPath: Wr(),
    properties: ["openDirectory", "createDirectory"]
  });
  return ds.set("downloadPath", e.canceled ? Wr() : e.filePaths[0]), e;
});
Et.handle("get-download-dir", () => Wr());
Et.handle("copy-text", (e, t) => {
  wu.writeText(t);
});
Et.handle("set-robots-checked", (e, t) => {
  ds.set("checkRobots", t);
});
Et.handle("get-robots-checked", () => ds.get("checkRobots"));
let na = 480;
function sa() {
  const { width: e, height: t } = Gn.getContentBounds();
  Kn.setBounds({
    x: 0,
    y: 0,
    width: e - na - 6,
    height: t
  });
}
Et.on("shell-width-changed", (e, t) => {
  na = t, console.log("Shell width changed:", na), sa();
});
Et.handle("resize-window", (e, t) => {
  const r = Gn.getBounds().height;
  Gn.setSize(Math.ceil(t), r);
});
Et.handle("open-existing-folder", async (e, t) => {
  try {
    return await Eu.openPath(t) === "";
  } catch (r) {
    return console.error(r), !1;
  }
});
Gr.on("window-all-closed", () => {
  process.platform !== "darwin" && (Gr.quit(), ve = null);
});
Gr.on("activate", () => {
  Cc.getAllWindows().length === 0 && $u();
});
Gr.whenReady().then(() => {
  $u(), OE();
});
export {
  HE as MAIN_DIST,
  yu as RENDERER_DIST,
  ra as VITE_DEV_SERVER_URL
};
