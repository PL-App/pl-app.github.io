var bp = Object.create, nl = Object.defineProperty, Ip = Object.getOwnPropertyDescriptor, _p = Object.getOwnPropertyNames, xp = Object.getPrototypeOf, Tp = Object.prototype.hasOwnProperty, Sp = (A, i) => () => (i || (A((i = { exports: {} }).exports, i), A = null), i.exports), Hp = (A, i, n, c) => {
  if (i && typeof i == "object" || typeof i == "function")
    for (var h = _p(i), f = 0, a = h.length, o; f < a; f++)
      o = h[f], !Tp.call(A, o) && o !== n && nl(A, o, {
        get: ((d) => i[d]).bind(null, o),
        enumerable: !(c = Ip(i, o)) || c.enumerable
      });
  return A;
}, Lp = (A, i, n) => (n = A != null ? bp(xp(A)) : {}, Hp(i || !A || !A.__esModule ? nl(n, "default", {
  value: A,
  enumerable: !0
}) : n, A)), tr = /* @__PURE__ */ ((A) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(A, { get: (i, n) => (typeof require < "u" ? require : i)[n] }) : A)(function(A) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + A + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), Dp = Object.create, il = Object.defineProperty, Rp = Object.getOwnPropertyDescriptor, Op = Object.getOwnPropertyNames, Np = Object.getPrototypeOf, kp = Object.prototype.hasOwnProperty, sl = (A, i) => () => (A && (i = A(A = 0)), i), FA = (A, i) => () => (i || (A((i = { exports: {} }).exports, i), A = null), i.exports), Kp = (A, i, n, c) => {
  if (i && typeof i == "object" || typeof i == "function") for (var h = Op(i), f = 0, a = h.length, o; f < a; f++)
    o = h[f], !kp.call(A, o) && o !== n && il(A, o, {
      get: ((d) => i[d]).bind(null, o),
      enumerable: !(c = Rp(i, o)) || c.enumerable
    });
  return A;
}, gs = (A, i, n) => (n = A != null ? Dp(Np(A)) : {}, Kp(i || !A || !A.__esModule ? il(n, "default", {
  value: A,
  enumerable: !0
}) : n, A)), Hn = /* @__PURE__ */ ((A) => typeof tr < "u" ? tr : typeof Proxy < "u" ? new Proxy(A, { get: (i, n) => (typeof tr < "u" ? tr : i)[n] }) : A)(function(A) {
  if (typeof tr < "u") return tr.apply(this, arguments);
  throw Error('Calling `require` for "' + A + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function Gr(A) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Gr(A);
}
function Mp(A, i) {
  if (Gr(A) != "object" || !A) return A;
  var n = A[Symbol.toPrimitive];
  if (n !== void 0) {
    var c = n.call(A, i || "default");
    if (Gr(c) != "object") return c;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(A);
}
function Pp(A) {
  var i = Mp(A, "string");
  return Gr(i) == "symbol" ? i : i + "";
}
function hA(A, i, n) {
  return (i = Pp(i)) in A ? Object.defineProperty(A, i, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : A[i] = n, A;
}
var Pn = class {
  constructor(A) {
    hA(this, "rootKey", void 0), this.rootKey = A;
  }
}, Gp = Object.seal({}), mA = class extends Pn {
  constructor(A) {
    super(A), hA(this, "root", void 0), this.root = new Array();
  }
  prepForXml(A) {
    var i;
    A.stack.push(this);
    const n = this.root.map((c) => c instanceof Pn ? c.prepForXml(A) : c).filter((c) => c !== void 0);
    return A.stack.pop(), { [this.rootKey]: n.length ? n.length === 1 && (!((i = n[0]) === null || i === void 0) && i._attr) ? n[0] : n : Gp };
  }
  addChildElement(A) {
    return this.root.push(A), this;
  }
}, mt = class extends mA {
  constructor(A, i) {
    super(A), hA(this, "includeIfEmpty", void 0), this.includeIfEmpty = i;
  }
  prepForXml(A) {
    const i = super.prepForXml(A);
    if (this.includeIfEmpty || i && (typeof i[this.rootKey] != "object" || Object.keys(i[this.rootKey]).length)) return i;
  }
};
function bo(A, i) {
  var n = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(A);
    i && (c = c.filter(function(h) {
      return Object.getOwnPropertyDescriptor(A, h).enumerable;
    })), n.push.apply(n, c);
  }
  return n;
}
function UA(A) {
  for (var i = 1; i < arguments.length; i++) {
    var n = arguments[i] != null ? arguments[i] : {};
    i % 2 ? bo(Object(n), !0).forEach(function(c) {
      hA(A, c, n[c]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(n)) : bo(Object(n)).forEach(function(c) {
      Object.defineProperty(A, c, Object.getOwnPropertyDescriptor(n, c));
    });
  }
  return A;
}
var NA = class extends Pn {
  constructor(A) {
    super("_attr"), hA(this, "root", void 0), hA(this, "xmlKeys", void 0), this.root = A;
  }
  prepForXml(A) {
    const i = {};
    return Object.entries(this.root).forEach(([n, c]) => {
      if (c !== void 0) {
        const h = this.xmlKeys && this.xmlKeys[n] || n;
        i[h] = c;
      }
    }), { _attr: i };
  }
}, al = class extends Pn {
  constructor(A) {
    super("_attr"), hA(this, "root", void 0), this.root = A;
  }
  prepForXml(A) {
    return { _attr: Object.values(this.root).filter(({ value: i }) => i !== void 0).reduce((i, { key: n, value: c }) => UA(UA({}, i), {}, { [n]: c }), {}) };
  }
}, ge = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      val: "w:val",
      color: "w:color",
      fill: "w:fill",
      space: "w:space",
      sz: "w:sz",
      type: "w:type",
      rsidR: "w:rsidR",
      rsidRPr: "w:rsidRPr",
      rsidSect: "w:rsidSect",
      w: "w:w",
      h: "w:h",
      top: "w:top",
      right: "w:right",
      bottom: "w:bottom",
      left: "w:left",
      header: "w:header",
      footer: "w:footer",
      gutter: "w:gutter",
      linePitch: "w:linePitch",
      pos: "w:pos"
    });
  }
}, ws = /* @__PURE__ */ FA(((A, i) => {
  var n = typeof Reflect == "object" ? Reflect : null, c = n && typeof n.apply == "function" ? n.apply : function(R, V, E) {
    return Function.prototype.apply.call(R, V, E);
  }, h;
  n && typeof n.ownKeys == "function" ? h = n.ownKeys : Object.getOwnPropertySymbols ? h = function(R) {
    return Object.getOwnPropertyNames(R).concat(Object.getOwnPropertySymbols(R));
  } : h = function(R) {
    return Object.getOwnPropertyNames(R);
  };
  function f(g) {
    console && console.warn && console.warn(g);
  }
  var a = Number.isNaN || function(R) {
    return R !== R;
  };
  function o() {
    o.init.call(this);
  }
  i.exports = o, i.exports.once = N, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
  var d = 10;
  function U(g) {
    if (typeof g != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof g);
  }
  Object.defineProperty(o, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return d;
    },
    set: function(g) {
      if (typeof g != "number" || g < 0 || a(g)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + g + ".");
      d = g;
    }
  }), o.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, o.prototype.setMaxListeners = function(R) {
    if (typeof R != "number" || R < 0 || a(R)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + R + ".");
    return this._maxListeners = R, this;
  };
  function b(g) {
    return g._maxListeners === void 0 ? o.defaultMaxListeners : g._maxListeners;
  }
  o.prototype.getMaxListeners = function() {
    return b(this);
  }, o.prototype.emit = function(R) {
    for (var V = [], E = 1; E < arguments.length; E++) V.push(arguments[E]);
    var q = R === "error", lA = this._events;
    if (lA !== void 0) q = q && lA.error === void 0;
    else if (!q) return !1;
    if (q) {
      var k;
      if (V.length > 0 && (k = V[0]), k instanceof Error) throw k;
      var Z = /* @__PURE__ */ new Error("Unhandled error." + (k ? " (" + k.message + ")" : ""));
      throw Z.context = k, Z;
    }
    var L = lA[R];
    if (L === void 0) return !1;
    if (typeof L == "function") c(L, this, V);
    else
      for (var $ = L.length, uA = I(L, $), E = 0; E < $; ++E) c(uA[E], this, V);
    return !0;
  };
  function v(g, R, V, E) {
    var q, lA, k;
    if (U(V), lA = g._events, lA === void 0 ? (lA = g._events = /* @__PURE__ */ Object.create(null), g._eventsCount = 0) : (lA.newListener !== void 0 && (g.emit("newListener", R, V.listener ? V.listener : V), lA = g._events), k = lA[R]), k === void 0)
      k = lA[R] = V, ++g._eventsCount;
    else if (typeof k == "function" ? k = lA[R] = E ? [V, k] : [k, V] : E ? k.unshift(V) : k.push(V), q = b(g), q > 0 && k.length > q && !k.warned) {
      k.warned = !0;
      var Z = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + k.length + " " + String(R) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      Z.name = "MaxListenersExceededWarning", Z.emitter = g, Z.type = R, Z.count = k.length, f(Z);
    }
    return g;
  }
  o.prototype.addListener = function(R, V) {
    return v(this, R, V, !1);
  }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(R, V) {
    return v(this, R, V, !0);
  };
  function _() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function C(g, R, V) {
    var E = {
      fired: !1,
      wrapFn: void 0,
      target: g,
      type: R,
      listener: V
    }, q = _.bind(E);
    return q.listener = V, E.wrapFn = q, q;
  }
  o.prototype.once = function(R, V) {
    return U(V), this.on(R, C(this, R, V)), this;
  }, o.prototype.prependOnceListener = function(R, V) {
    return U(V), this.prependListener(R, C(this, R, V)), this;
  }, o.prototype.removeListener = function(R, V) {
    var E, q, lA, k, Z;
    if (U(V), q = this._events, q === void 0) return this;
    if (E = q[R], E === void 0) return this;
    if (E === V || E.listener === V) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete q[R], q.removeListener && this.emit("removeListener", R, E.listener || V));
    else if (typeof E != "function") {
      for (lA = -1, k = E.length - 1; k >= 0; k--) if (E[k] === V || E[k].listener === V) {
        Z = E[k].listener, lA = k;
        break;
      }
      if (lA < 0) return this;
      lA === 0 ? E.shift() : T(E, lA), E.length === 1 && (q[R] = E[0]), q.removeListener !== void 0 && this.emit("removeListener", R, Z || V);
    }
    return this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(R) {
    var V, E = this._events, q;
    if (E === void 0) return this;
    if (E.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : E[R] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete E[R]), this;
    if (arguments.length === 0) {
      var lA = Object.keys(E), k;
      for (q = 0; q < lA.length; ++q)
        k = lA[q], k !== "removeListener" && this.removeAllListeners(k);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (V = E[R], typeof V == "function") this.removeListener(R, V);
    else if (V !== void 0) for (q = V.length - 1; q >= 0; q--) this.removeListener(R, V[q]);
    return this;
  };
  function m(g, R, V) {
    var E = g._events;
    if (E === void 0) return [];
    var q = E[R];
    return q === void 0 ? [] : typeof q == "function" ? V ? [q.listener || q] : [q] : V ? x(q) : I(q, q.length);
  }
  o.prototype.listeners = function(R) {
    return m(this, R, !0);
  }, o.prototype.rawListeners = function(R) {
    return m(this, R, !1);
  }, o.listenerCount = function(g, R) {
    return typeof g.listenerCount == "function" ? g.listenerCount(R) : w.call(g, R);
  }, o.prototype.listenerCount = w;
  function w(g) {
    var R = this._events;
    if (R !== void 0) {
      var V = R[g];
      if (typeof V == "function") return 1;
      if (V !== void 0) return V.length;
    }
    return 0;
  }
  o.prototype.eventNames = function() {
    return this._eventsCount > 0 ? h(this._events) : [];
  };
  function I(g, R) {
    for (var V = new Array(R), E = 0; E < R; ++E) V[E] = g[E];
    return V;
  }
  function T(g, R) {
    for (; R + 1 < g.length; R++) g[R] = g[R + 1];
    g.pop();
  }
  function x(g) {
    for (var R = new Array(g.length), V = 0; V < R.length; ++V) R[V] = g[V].listener || g[V];
    return R;
  }
  function N(g, R) {
    return new Promise(function(V, E) {
      function q(k) {
        g.removeListener(R, lA), E(k);
      }
      function lA() {
        typeof g.removeListener == "function" && g.removeListener("error", q), V([].slice.call(arguments));
      }
      F(g, R, lA, { once: !0 }), R !== "error" && O(g, q, { once: !0 });
    });
  }
  function O(g, R, V) {
    typeof g.on == "function" && F(g, "error", R, V);
  }
  function F(g, R, V, E) {
    if (typeof g.on == "function") E.once ? g.once(R, V) : g.on(R, V);
    else if (typeof g.addEventListener == "function") g.addEventListener(R, function q(lA) {
      E.once && g.removeEventListener(R, q), V(lA);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof g);
  }
})), vt = /* @__PURE__ */ FA(((A, i) => {
  typeof Object.create == "function" ? i.exports = function(c, h) {
    h && (c.super_ = h, c.prototype = Object.create(h.prototype, { constructor: {
      value: c,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : i.exports = function(c, h) {
    if (h) {
      c.super_ = h;
      var f = function() {
      };
      f.prototype = h.prototype, c.prototype = new f(), c.prototype.constructor = c;
    }
  };
})), me, pr = sl((() => {
  me = globalThis || self;
}));
function Vp(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
function ss() {
  throw new Error("setTimeout has not been defined");
}
function as() {
  throw new Error("clearTimeout has not been defined");
}
function ol(A) {
  if (Ge === setTimeout) return setTimeout(A, 0);
  if ((Ge === ss || !Ge) && setTimeout)
    return Ge = setTimeout, setTimeout(A, 0);
  try {
    return Ge(A, 0);
  } catch {
    try {
      return Ge.call(null, A, 0);
    } catch {
      return Ge.call(this, A, 0);
    }
  }
}
function Wp(A) {
  if (Ve === clearTimeout) return clearTimeout(A);
  if ((Ve === as || !Ve) && clearTimeout)
    return Ve = clearTimeout, clearTimeout(A);
  try {
    return Ve(A);
  } catch {
    try {
      return Ve.call(null, A);
    } catch {
      return Ve.call(this, A);
    }
  }
}
function Xp() {
  !Nt || !Ot || (Nt = !1, Ot.length ? Xe = Ot.concat(Xe) : Mr = -1, Xe.length && ll());
}
function ll() {
  if (!Nt) {
    var A = ol(Xp);
    Nt = !0;
    for (var i = Xe.length; i; ) {
      for (Ot = Xe, Xe = []; ++Mr < i; ) Ot && Ot[Mr].run();
      Mr = -1, i = Xe.length;
    }
    Ot = null, Nt = !1, Wp(A);
  }
}
function Io(A, i) {
  this.fun = A, this.array = i;
}
function et() {
}
var Pi, ne, Ge, Ve, Xe, Nt, Ot, Mr, _o, MA, yt = sl((() => {
  Pi = { exports: {} }, ne = Pi.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? Ge = setTimeout : Ge = ss;
    } catch {
      Ge = ss;
    }
    try {
      typeof clearTimeout == "function" ? Ve = clearTimeout : Ve = as;
    } catch {
      Ve = as;
    }
  })(), Xe = [], Nt = !1, Mr = -1, ne.nextTick = function(A) {
    var i = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
    Xe.push(new Io(A, i)), Xe.length === 1 && !Nt && ol(ll);
  }, Io.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, ne.title = "browser", ne.browser = !0, ne.env = {}, ne.argv = [], ne.version = "", ne.versions = {}, ne.on = et, ne.addListener = et, ne.once = et, ne.off = et, ne.removeListener = et, ne.removeAllListeners = et, ne.emit = et, ne.prependListener = et, ne.prependOnceListener = et, ne.listeners = function(A) {
    return [];
  }, ne.binding = function(A) {
    throw new Error("process.binding is not supported");
  }, ne.cwd = function() {
    return "/";
  }, ne.chdir = function(A) {
    throw new Error("process.chdir is not supported");
  }, ne.umask = function() {
    return 0;
  }, _o = Pi.exports, MA = /* @__PURE__ */ Vp(_o);
})), ul = /* @__PURE__ */ FA(((A, i) => {
  i.exports = ws().EventEmitter;
})), jp = /* @__PURE__ */ FA(((A) => {
  A.byteLength = d, A.toByteArray = b, A.fromByteArray = C;
  for (var i = [], n = [], c = typeof Uint8Array < "u" ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, a = h.length; f < a; ++f)
    i[f] = h[f], n[h.charCodeAt(f)] = f;
  n[45] = 62, n[95] = 63;
  function o(m) {
    var w = m.length;
    if (w % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var I = m.indexOf("=");
    I === -1 && (I = w);
    var T = I === w ? 0 : 4 - I % 4;
    return [I, T];
  }
  function d(m) {
    var w = o(m), I = w[0], T = w[1];
    return (I + T) * 3 / 4 - T;
  }
  function U(m, w, I) {
    return (w + I) * 3 / 4 - I;
  }
  function b(m) {
    var w, I = o(m), T = I[0], x = I[1], N = new c(U(m, T, x)), O = 0, F = x > 0 ? T - 4 : T, g;
    for (g = 0; g < F; g += 4)
      w = n[m.charCodeAt(g)] << 18 | n[m.charCodeAt(g + 1)] << 12 | n[m.charCodeAt(g + 2)] << 6 | n[m.charCodeAt(g + 3)], N[O++] = w >> 16 & 255, N[O++] = w >> 8 & 255, N[O++] = w & 255;
    return x === 2 && (w = n[m.charCodeAt(g)] << 2 | n[m.charCodeAt(g + 1)] >> 4, N[O++] = w & 255), x === 1 && (w = n[m.charCodeAt(g)] << 10 | n[m.charCodeAt(g + 1)] << 4 | n[m.charCodeAt(g + 2)] >> 2, N[O++] = w >> 8 & 255, N[O++] = w & 255), N;
  }
  function v(m) {
    return i[m >> 18 & 63] + i[m >> 12 & 63] + i[m >> 6 & 63] + i[m & 63];
  }
  function _(m, w, I) {
    for (var T, x = [], N = w; N < I; N += 3)
      T = (m[N] << 16 & 16711680) + (m[N + 1] << 8 & 65280) + (m[N + 2] & 255), x.push(v(T));
    return x.join("");
  }
  function C(m) {
    for (var w, I = m.length, T = I % 3, x = [], N = 16383, O = 0, F = I - T; O < F; O += N) x.push(_(m, O, O + N > F ? F : O + N));
    return T === 1 ? (w = m[I - 1], x.push(i[w >> 2] + i[w << 4 & 63] + "==")) : T === 2 && (w = (m[I - 2] << 8) + m[I - 1], x.push(i[w >> 10] + i[w >> 4 & 63] + i[w << 2 & 63] + "=")), x.join("");
  }
})), zp = /* @__PURE__ */ FA(((A) => {
  A.read = function(i, n, c, h, f) {
    var a, o, d = f * 8 - h - 1, U = (1 << d) - 1, b = U >> 1, v = -7, _ = c ? f - 1 : 0, C = c ? -1 : 1, m = i[n + _];
    for (_ += C, a = m & (1 << -v) - 1, m >>= -v, v += d; v > 0; a = a * 256 + i[n + _], _ += C, v -= 8) ;
    for (o = a & (1 << -v) - 1, a >>= -v, v += h; v > 0; o = o * 256 + i[n + _], _ += C, v -= 8) ;
    if (a === 0) a = 1 - b;
    else {
      if (a === U) return o ? NaN : (m ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, h), a = a - b;
    }
    return (m ? -1 : 1) * o * Math.pow(2, a - h);
  }, A.write = function(i, n, c, h, f, a) {
    var o, d, U, b = a * 8 - f - 1, v = (1 << b) - 1, _ = v >> 1, C = f === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = h ? 0 : a - 1, w = h ? 1 : -1, I = n < 0 || n === 0 && 1 / n < 0 ? 1 : 0;
    for (n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (d = isNaN(n) ? 1 : 0, o = v) : (o = Math.floor(Math.log(n) / Math.LN2), n * (U = Math.pow(2, -o)) < 1 && (o--, U *= 2), o + _ >= 1 ? n += C / U : n += C * Math.pow(2, 1 - _), n * U >= 2 && (o++, U /= 2), o + _ >= v ? (d = 0, o = v) : o + _ >= 1 ? (d = (n * U - 1) * Math.pow(2, f), o = o + _) : (d = n * Math.pow(2, _ - 1) * Math.pow(2, f), o = 0)); f >= 8; i[c + m] = d & 255, m += w, d /= 256, f -= 8) ;
    for (o = o << f | d, b += f; b > 0; i[c + m] = o & 255, m += w, o /= 256, b -= 8) ;
    i[c + m - w] |= I * 128;
  };
})), jn = /* @__PURE__ */ FA(((A) => {
  var i = jp(), n = zp(), c = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  A.Buffer = o, A.SlowBuffer = x, A.INSPECT_MAX_BYTES = 50;
  var h = 2147483647;
  A.kMaxLength = h, o.TYPED_ARRAY_SUPPORT = f(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function f() {
    try {
      var D = new Uint8Array(1), l = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(l, Uint8Array.prototype), Object.setPrototypeOf(D, l), D.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function a(D) {
    if (D > h) throw new RangeError('The value "' + D + '" is invalid for option "size"');
    var l = new Uint8Array(D);
    return Object.setPrototypeOf(l, o.prototype), l;
  }
  function o(D, l, u) {
    if (typeof D == "number") {
      if (typeof l == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return v(D);
    }
    return d(D, l, u);
  }
  o.poolSize = 8192;
  function d(D, l, u) {
    if (typeof D == "string") return _(D, l);
    if (ArrayBuffer.isView(D)) return m(D);
    if (D == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof D);
    if (G(D, ArrayBuffer) || D && G(D.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (G(D, SharedArrayBuffer) || D && G(D.buffer, SharedArrayBuffer))) return w(D, l, u);
    if (typeof D == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var Q = D.valueOf && D.valueOf();
    if (Q != null && Q !== D) return o.from(Q, l, u);
    var j = I(D);
    if (j) return j;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof D[Symbol.toPrimitive] == "function") return o.from(D[Symbol.toPrimitive]("string"), l, u);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof D);
  }
  o.from = function(D, l, u) {
    return d(D, l, u);
  }, Object.setPrototypeOf(o.prototype, Uint8Array.prototype), Object.setPrototypeOf(o, Uint8Array);
  function U(D) {
    if (typeof D != "number") throw new TypeError('"size" argument must be of type number');
    if (D < 0) throw new RangeError('The value "' + D + '" is invalid for option "size"');
  }
  function b(D, l, u) {
    return U(D), D <= 0 ? a(D) : l !== void 0 ? typeof u == "string" ? a(D).fill(l, u) : a(D).fill(l) : a(D);
  }
  o.alloc = function(D, l, u) {
    return b(D, l, u);
  };
  function v(D) {
    return U(D), a(D < 0 ? 0 : T(D) | 0);
  }
  o.allocUnsafe = function(D) {
    return v(D);
  }, o.allocUnsafeSlow = function(D) {
    return v(D);
  };
  function _(D, l) {
    if ((typeof l != "string" || l === "") && (l = "utf8"), !o.isEncoding(l)) throw new TypeError("Unknown encoding: " + l);
    var u = N(D, l) | 0, Q = a(u), j = Q.write(D, l);
    return j !== u && (Q = Q.slice(0, j)), Q;
  }
  function C(D) {
    for (var l = D.length < 0 ? 0 : T(D.length) | 0, u = a(l), Q = 0; Q < l; Q += 1) u[Q] = D[Q] & 255;
    return u;
  }
  function m(D) {
    if (G(D, Uint8Array)) {
      var l = new Uint8Array(D);
      return w(l.buffer, l.byteOffset, l.byteLength);
    }
    return C(D);
  }
  function w(D, l, u) {
    if (l < 0 || D.byteLength < l) throw new RangeError('"offset" is outside of buffer bounds');
    if (D.byteLength < l + (u || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var Q;
    return l === void 0 && u === void 0 ? Q = new Uint8Array(D) : u === void 0 ? Q = new Uint8Array(D, l) : Q = new Uint8Array(D, l, u), Object.setPrototypeOf(Q, o.prototype), Q;
  }
  function I(D) {
    if (o.isBuffer(D)) {
      var l = T(D.length) | 0, u = a(l);
      return u.length === 0 || D.copy(u, 0, 0, l), u;
    }
    if (D.length !== void 0)
      return typeof D.length != "number" || B(D.length) ? a(0) : C(D);
    if (D.type === "Buffer" && Array.isArray(D.data)) return C(D.data);
  }
  function T(D) {
    if (D >= h) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + h.toString(16) + " bytes");
    return D | 0;
  }
  function x(D) {
    return +D != D && (D = 0), o.alloc(+D);
  }
  o.isBuffer = function(l) {
    return l != null && l._isBuffer === !0 && l !== o.prototype;
  }, o.compare = function(l, u) {
    if (G(l, Uint8Array) && (l = o.from(l, l.offset, l.byteLength)), G(u, Uint8Array) && (u = o.from(u, u.offset, u.byteLength)), !o.isBuffer(l) || !o.isBuffer(u)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (l === u) return 0;
    for (var Q = l.length, j = u.length, AA = 0, Y = Math.min(Q, j); AA < Y; ++AA) if (l[AA] !== u[AA]) {
      Q = l[AA], j = u[AA];
      break;
    }
    return Q < j ? -1 : j < Q ? 1 : 0;
  }, o.isEncoding = function(l) {
    switch (String(l).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, o.concat = function(l, u) {
    if (!Array.isArray(l)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (l.length === 0) return o.alloc(0);
    var Q;
    if (u === void 0)
      for (u = 0, Q = 0; Q < l.length; ++Q) u += l[Q].length;
    var j = o.allocUnsafe(u), AA = 0;
    for (Q = 0; Q < l.length; ++Q) {
      var Y = l[Q];
      if (G(Y, Uint8Array)) AA + Y.length > j.length ? o.from(Y).copy(j, AA) : Uint8Array.prototype.set.call(j, Y, AA);
      else if (o.isBuffer(Y)) Y.copy(j, AA);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      AA += Y.length;
    }
    return j;
  };
  function N(D, l) {
    if (o.isBuffer(D)) return D.length;
    if (ArrayBuffer.isView(D) || G(D, ArrayBuffer)) return D.byteLength;
    if (typeof D != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof D);
    var u = D.length, Q = arguments.length > 2 && arguments[2] === !0;
    if (!Q && u === 0) return 0;
    for (var j = !1; ; ) switch (l) {
      case "ascii":
      case "latin1":
      case "binary":
        return u;
      case "utf8":
      case "utf-8":
        return y(D).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return u * 2;
      case "hex":
        return u >>> 1;
      case "base64":
        return pA(D).length;
      default:
        if (j) return Q ? -1 : y(D).length;
        l = ("" + l).toLowerCase(), j = !0;
    }
  }
  o.byteLength = N;
  function O(D, l, u) {
    var Q = !1;
    if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((u === void 0 || u > this.length) && (u = this.length), u <= 0) || (u >>>= 0, l >>>= 0, u <= l)) return "";
    for (D || (D = "utf8"); ; ) switch (D) {
      case "hex":
        return sA(this, l, u);
      case "utf8":
      case "utf-8":
        return L(this, l, u);
      case "ascii":
        return rA(this, l, u);
      case "latin1":
      case "binary":
        return vA(this, l, u);
      case "base64":
        return Z(this, l, u);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return dA(this, l, u);
      default:
        if (Q) throw new TypeError("Unknown encoding: " + D);
        D = (D + "").toLowerCase(), Q = !0;
    }
  }
  o.prototype._isBuffer = !0;
  function F(D, l, u) {
    var Q = D[l];
    D[l] = D[u], D[u] = Q;
  }
  o.prototype.swap16 = function() {
    var l = this.length;
    if (l % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var u = 0; u < l; u += 2) F(this, u, u + 1);
    return this;
  }, o.prototype.swap32 = function() {
    var l = this.length;
    if (l % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var u = 0; u < l; u += 4)
      F(this, u, u + 3), F(this, u + 1, u + 2);
    return this;
  }, o.prototype.swap64 = function() {
    var l = this.length;
    if (l % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var u = 0; u < l; u += 8)
      F(this, u, u + 7), F(this, u + 1, u + 6), F(this, u + 2, u + 5), F(this, u + 3, u + 4);
    return this;
  }, o.prototype.toString = function() {
    var l = this.length;
    return l === 0 ? "" : arguments.length === 0 ? L(this, 0, l) : O.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(l) {
    if (!o.isBuffer(l)) throw new TypeError("Argument must be a Buffer");
    return this === l ? !0 : o.compare(this, l) === 0;
  }, o.prototype.inspect = function() {
    var l = "", u = A.INSPECT_MAX_BYTES;
    return l = this.toString("hex", 0, u).replace(/(.{2})/g, "$1 ").trim(), this.length > u && (l += " ... "), "<Buffer " + l + ">";
  }, c && (o.prototype[c] = o.prototype.inspect), o.prototype.compare = function(l, u, Q, j, AA) {
    if (G(l, Uint8Array) && (l = o.from(l, l.offset, l.byteLength)), !o.isBuffer(l)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof l);
    if (u === void 0 && (u = 0), Q === void 0 && (Q = l ? l.length : 0), j === void 0 && (j = 0), AA === void 0 && (AA = this.length), u < 0 || Q > l.length || j < 0 || AA > this.length) throw new RangeError("out of range index");
    if (j >= AA && u >= Q) return 0;
    if (j >= AA) return -1;
    if (u >= Q) return 1;
    if (u >>>= 0, Q >>>= 0, j >>>= 0, AA >>>= 0, this === l) return 0;
    for (var Y = AA - j, gA = Q - u, yA = Math.min(Y, gA), BA = this.slice(j, AA), QA = l.slice(u, Q), xA = 0; xA < yA; ++xA) if (BA[xA] !== QA[xA]) {
      Y = BA[xA], gA = QA[xA];
      break;
    }
    return Y < gA ? -1 : gA < Y ? 1 : 0;
  };
  function g(D, l, u, Q, j) {
    if (D.length === 0) return -1;
    if (typeof u == "string" ? (Q = u, u = 0) : u > 2147483647 ? u = 2147483647 : u < -2147483648 && (u = -2147483648), u = +u, B(u) && (u = j ? 0 : D.length - 1), u < 0 && (u = D.length + u), u >= D.length) {
      if (j) return -1;
      u = D.length - 1;
    } else if (u < 0) if (j) u = 0;
    else return -1;
    if (typeof l == "string" && (l = o.from(l, Q)), o.isBuffer(l))
      return l.length === 0 ? -1 : R(D, l, u, Q, j);
    if (typeof l == "number")
      return l = l & 255, typeof Uint8Array.prototype.indexOf == "function" ? j ? Uint8Array.prototype.indexOf.call(D, l, u) : Uint8Array.prototype.lastIndexOf.call(D, l, u) : R(D, [l], u, Q, j);
    throw new TypeError("val must be string, number or Buffer");
  }
  function R(D, l, u, Q, j) {
    var AA = 1, Y = D.length, gA = l.length;
    if (Q !== void 0 && (Q = String(Q).toLowerCase(), Q === "ucs2" || Q === "ucs-2" || Q === "utf16le" || Q === "utf-16le")) {
      if (D.length < 2 || l.length < 2) return -1;
      AA = 2, Y /= 2, gA /= 2, u /= 2;
    }
    function yA(Ae, Be) {
      return AA === 1 ? Ae[Be] : Ae.readUInt16BE(Be * AA);
    }
    var BA;
    if (j) {
      var QA = -1;
      for (BA = u; BA < Y; BA++) if (yA(D, BA) === yA(l, QA === -1 ? 0 : BA - QA)) {
        if (QA === -1 && (QA = BA), BA - QA + 1 === gA) return QA * AA;
      } else
        QA !== -1 && (BA -= BA - QA), QA = -1;
    } else
      for (u + gA > Y && (u = Y - gA), BA = u; BA >= 0; BA--) {
        for (var xA = !0, RA = 0; RA < gA; RA++) if (yA(D, BA + RA) !== yA(l, RA)) {
          xA = !1;
          break;
        }
        if (xA) return BA;
      }
    return -1;
  }
  o.prototype.includes = function(l, u, Q) {
    return this.indexOf(l, u, Q) !== -1;
  }, o.prototype.indexOf = function(l, u, Q) {
    return g(this, l, u, Q, !0);
  }, o.prototype.lastIndexOf = function(l, u, Q) {
    return g(this, l, u, Q, !1);
  };
  function V(D, l, u, Q) {
    u = Number(u) || 0;
    var j = D.length - u;
    Q ? (Q = Number(Q), Q > j && (Q = j)) : Q = j;
    var AA = l.length;
    Q > AA / 2 && (Q = AA / 2);
    for (var Y = 0; Y < Q; ++Y) {
      var gA = parseInt(l.substr(Y * 2, 2), 16);
      if (B(gA)) return Y;
      D[u + Y] = gA;
    }
    return Y;
  }
  function E(D, l, u, Q) {
    return M(y(l, D.length - u), D, u, Q);
  }
  function q(D, l, u, Q) {
    return M(J(l), D, u, Q);
  }
  function lA(D, l, u, Q) {
    return M(pA(l), D, u, Q);
  }
  function k(D, l, u, Q) {
    return M(z(l, D.length - u), D, u, Q);
  }
  o.prototype.write = function(l, u, Q, j) {
    if (u === void 0)
      j = "utf8", Q = this.length, u = 0;
    else if (Q === void 0 && typeof u == "string")
      j = u, Q = this.length, u = 0;
    else if (isFinite(u))
      u = u >>> 0, isFinite(Q) ? (Q = Q >>> 0, j === void 0 && (j = "utf8")) : (j = Q, Q = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var AA = this.length - u;
    if ((Q === void 0 || Q > AA) && (Q = AA), l.length > 0 && (Q < 0 || u < 0) || u > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    j || (j = "utf8");
    for (var Y = !1; ; ) switch (j) {
      case "hex":
        return V(this, l, u, Q);
      case "utf8":
      case "utf-8":
        return E(this, l, u, Q);
      case "ascii":
      case "latin1":
      case "binary":
        return q(this, l, u, Q);
      case "base64":
        return lA(this, l, u, Q);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return k(this, l, u, Q);
      default:
        if (Y) throw new TypeError("Unknown encoding: " + j);
        j = ("" + j).toLowerCase(), Y = !0;
    }
  }, o.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Z(D, l, u) {
    return l === 0 && u === D.length ? i.fromByteArray(D) : i.fromByteArray(D.slice(l, u));
  }
  function L(D, l, u) {
    u = Math.min(D.length, u);
    for (var Q = [], j = l; j < u; ) {
      var AA = D[j], Y = null, gA = AA > 239 ? 4 : AA > 223 ? 3 : AA > 191 ? 2 : 1;
      if (j + gA <= u) {
        var yA, BA, QA, xA;
        switch (gA) {
          case 1:
            AA < 128 && (Y = AA);
            break;
          case 2:
            yA = D[j + 1], (yA & 192) === 128 && (xA = (AA & 31) << 6 | yA & 63, xA > 127 && (Y = xA));
            break;
          case 3:
            yA = D[j + 1], BA = D[j + 2], (yA & 192) === 128 && (BA & 192) === 128 && (xA = (AA & 15) << 12 | (yA & 63) << 6 | BA & 63, xA > 2047 && (xA < 55296 || xA > 57343) && (Y = xA));
            break;
          case 4:
            yA = D[j + 1], BA = D[j + 2], QA = D[j + 3], (yA & 192) === 128 && (BA & 192) === 128 && (QA & 192) === 128 && (xA = (AA & 15) << 18 | (yA & 63) << 12 | (BA & 63) << 6 | QA & 63, xA > 65535 && xA < 1114112 && (Y = xA));
        }
      }
      Y === null ? (Y = 65533, gA = 1) : Y > 65535 && (Y -= 65536, Q.push(Y >>> 10 & 1023 | 55296), Y = 56320 | Y & 1023), Q.push(Y), j += gA;
    }
    return uA(Q);
  }
  var $ = 4096;
  function uA(D) {
    var l = D.length;
    if (l <= $) return String.fromCharCode.apply(String, D);
    for (var u = "", Q = 0; Q < l; ) u += String.fromCharCode.apply(String, D.slice(Q, Q += $));
    return u;
  }
  function rA(D, l, u) {
    var Q = "";
    u = Math.min(D.length, u);
    for (var j = l; j < u; ++j) Q += String.fromCharCode(D[j] & 127);
    return Q;
  }
  function vA(D, l, u) {
    var Q = "";
    u = Math.min(D.length, u);
    for (var j = l; j < u; ++j) Q += String.fromCharCode(D[j]);
    return Q;
  }
  function sA(D, l, u) {
    var Q = D.length;
    (!l || l < 0) && (l = 0), (!u || u < 0 || u > Q) && (u = Q);
    for (var j = "", AA = l; AA < u; ++AA) j += eA[D[AA]];
    return j;
  }
  function dA(D, l, u) {
    for (var Q = D.slice(l, u), j = "", AA = 0; AA < Q.length - 1; AA += 2) j += String.fromCharCode(Q[AA] + Q[AA + 1] * 256);
    return j;
  }
  o.prototype.slice = function(l, u) {
    var Q = this.length;
    l = ~~l, u = u === void 0 ? Q : ~~u, l < 0 ? (l += Q, l < 0 && (l = 0)) : l > Q && (l = Q), u < 0 ? (u += Q, u < 0 && (u = 0)) : u > Q && (u = Q), u < l && (u = l);
    var j = this.subarray(l, u);
    return Object.setPrototypeOf(j, o.prototype), j;
  };
  function tA(D, l, u) {
    if (D % 1 !== 0 || D < 0) throw new RangeError("offset is not uint");
    if (D + l > u) throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(l, u, Q) {
    l = l >>> 0, u = u >>> 0, Q || tA(l, u, this.length);
    for (var j = this[l], AA = 1, Y = 0; ++Y < u && (AA *= 256); ) j += this[l + Y] * AA;
    return j;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(l, u, Q) {
    l = l >>> 0, u = u >>> 0, Q || tA(l, u, this.length);
    for (var j = this[l + --u], AA = 1; u > 0 && (AA *= 256); ) j += this[l + --u] * AA;
    return j;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(l, u) {
    return l = l >>> 0, u || tA(l, 1, this.length), this[l];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(l, u) {
    return l = l >>> 0, u || tA(l, 2, this.length), this[l] | this[l + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(l, u) {
    return l = l >>> 0, u || tA(l, 2, this.length), this[l] << 8 | this[l + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), (this[l] | this[l + 1] << 8 | this[l + 2] << 16) + this[l + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), this[l] * 16777216 + (this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3]);
  }, o.prototype.readIntLE = function(l, u, Q) {
    l = l >>> 0, u = u >>> 0, Q || tA(l, u, this.length);
    for (var j = this[l], AA = 1, Y = 0; ++Y < u && (AA *= 256); ) j += this[l + Y] * AA;
    return AA *= 128, j >= AA && (j -= Math.pow(2, 8 * u)), j;
  }, o.prototype.readIntBE = function(l, u, Q) {
    l = l >>> 0, u = u >>> 0, Q || tA(l, u, this.length);
    for (var j = u, AA = 1, Y = this[l + --j]; j > 0 && (AA *= 256); ) Y += this[l + --j] * AA;
    return AA *= 128, Y >= AA && (Y -= Math.pow(2, 8 * u)), Y;
  }, o.prototype.readInt8 = function(l, u) {
    return l = l >>> 0, u || tA(l, 1, this.length), this[l] & 128 ? (255 - this[l] + 1) * -1 : this[l];
  }, o.prototype.readInt16LE = function(l, u) {
    l = l >>> 0, u || tA(l, 2, this.length);
    var Q = this[l] | this[l + 1] << 8;
    return Q & 32768 ? Q | 4294901760 : Q;
  }, o.prototype.readInt16BE = function(l, u) {
    l = l >>> 0, u || tA(l, 2, this.length);
    var Q = this[l + 1] | this[l] << 8;
    return Q & 32768 ? Q | 4294901760 : Q;
  }, o.prototype.readInt32LE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), this[l] | this[l + 1] << 8 | this[l + 2] << 16 | this[l + 3] << 24;
  }, o.prototype.readInt32BE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), this[l] << 24 | this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3];
  }, o.prototype.readFloatLE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), n.read(this, l, !0, 23, 4);
  }, o.prototype.readFloatBE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), n.read(this, l, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(l, u) {
    return l = l >>> 0, u || tA(l, 8, this.length), n.read(this, l, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(l, u) {
    return l = l >>> 0, u || tA(l, 8, this.length), n.read(this, l, !1, 52, 8);
  };
  function P(D, l, u, Q, j, AA) {
    if (!o.isBuffer(D)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > j || l < AA) throw new RangeError('"value" argument is out of bounds');
    if (u + Q > D.length) throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, Q = Q >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q) - 1;
      P(this, l, u, Q, AA, 0);
    }
    var Y = 1, gA = 0;
    for (this[u] = l & 255; ++gA < Q && (Y *= 256); ) this[u + gA] = l / Y & 255;
    return u + Q;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, Q = Q >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q) - 1;
      P(this, l, u, Q, AA, 0);
    }
    var Y = Q - 1, gA = 1;
    for (this[u + Y] = l & 255; --Y >= 0 && (gA *= 256); ) this[u + Y] = l / gA & 255;
    return u + Q;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 1, 255, 0), this[u] = l & 255, u + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 2, 65535, 0), this[u] = l & 255, this[u + 1] = l >>> 8, u + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 2, 65535, 0), this[u] = l >>> 8, this[u + 1] = l & 255, u + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 4, 4294967295, 0), this[u + 3] = l >>> 24, this[u + 2] = l >>> 16, this[u + 1] = l >>> 8, this[u] = l & 255, u + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 4, 4294967295, 0), this[u] = l >>> 24, this[u + 1] = l >>> 16, this[u + 2] = l >>> 8, this[u + 3] = l & 255, u + 4;
  }, o.prototype.writeIntLE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q - 1);
      P(this, l, u, Q, AA - 1, -AA);
    }
    var Y = 0, gA = 1, yA = 0;
    for (this[u] = l & 255; ++Y < Q && (gA *= 256); )
      l < 0 && yA === 0 && this[u + Y - 1] !== 0 && (yA = 1), this[u + Y] = (l / gA >> 0) - yA & 255;
    return u + Q;
  }, o.prototype.writeIntBE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q - 1);
      P(this, l, u, Q, AA - 1, -AA);
    }
    var Y = Q - 1, gA = 1, yA = 0;
    for (this[u + Y] = l & 255; --Y >= 0 && (gA *= 256); )
      l < 0 && yA === 0 && this[u + Y + 1] !== 0 && (yA = 1), this[u + Y] = (l / gA >> 0) - yA & 255;
    return u + Q;
  }, o.prototype.writeInt8 = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 1, 127, -128), l < 0 && (l = 255 + l + 1), this[u] = l & 255, u + 1;
  }, o.prototype.writeInt16LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 2, 32767, -32768), this[u] = l & 255, this[u + 1] = l >>> 8, u + 2;
  }, o.prototype.writeInt16BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 2, 32767, -32768), this[u] = l >>> 8, this[u + 1] = l & 255, u + 2;
  }, o.prototype.writeInt32LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 4, 2147483647, -2147483648), this[u] = l & 255, this[u + 1] = l >>> 8, this[u + 2] = l >>> 16, this[u + 3] = l >>> 24, u + 4;
  }, o.prototype.writeInt32BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || P(this, l, u, 4, 2147483647, -2147483648), l < 0 && (l = 4294967295 + l + 1), this[u] = l >>> 24, this[u + 1] = l >>> 16, this[u + 2] = l >>> 8, this[u + 3] = l & 255, u + 4;
  };
  function iA(D, l, u, Q, j, AA) {
    if (u + Q > D.length) throw new RangeError("Index out of range");
    if (u < 0) throw new RangeError("Index out of range");
  }
  function aA(D, l, u, Q, j) {
    return l = +l, u = u >>> 0, j || iA(D, l, u, 4, 34028234663852886e22, -34028234663852886e22), n.write(D, l, u, Q, 23, 4), u + 4;
  }
  o.prototype.writeFloatLE = function(l, u, Q) {
    return aA(this, l, u, !0, Q);
  }, o.prototype.writeFloatBE = function(l, u, Q) {
    return aA(this, l, u, !1, Q);
  };
  function fA(D, l, u, Q, j) {
    return l = +l, u = u >>> 0, j || iA(D, l, u, 8, 17976931348623157e292, -17976931348623157e292), n.write(D, l, u, Q, 52, 8), u + 8;
  }
  o.prototype.writeDoubleLE = function(l, u, Q) {
    return fA(this, l, u, !0, Q);
  }, o.prototype.writeDoubleBE = function(l, u, Q) {
    return fA(this, l, u, !1, Q);
  }, o.prototype.copy = function(l, u, Q, j) {
    if (!o.isBuffer(l)) throw new TypeError("argument should be a Buffer");
    if (Q || (Q = 0), !j && j !== 0 && (j = this.length), u >= l.length && (u = l.length), u || (u = 0), j > 0 && j < Q && (j = Q), j === Q || l.length === 0 || this.length === 0) return 0;
    if (u < 0) throw new RangeError("targetStart out of bounds");
    if (Q < 0 || Q >= this.length) throw new RangeError("Index out of range");
    if (j < 0) throw new RangeError("sourceEnd out of bounds");
    j > this.length && (j = this.length), l.length - u < j - Q && (j = l.length - u + Q);
    var AA = j - Q;
    return this === l && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(u, Q, j) : Uint8Array.prototype.set.call(l, this.subarray(Q, j), u), AA;
  }, o.prototype.fill = function(l, u, Q, j) {
    if (typeof l == "string") {
      if (typeof u == "string" ? (j = u, u = 0, Q = this.length) : typeof Q == "string" && (j = Q, Q = this.length), j !== void 0 && typeof j != "string") throw new TypeError("encoding must be a string");
      if (typeof j == "string" && !o.isEncoding(j)) throw new TypeError("Unknown encoding: " + j);
      if (l.length === 1) {
        var AA = l.charCodeAt(0);
        (j === "utf8" && AA < 128 || j === "latin1") && (l = AA);
      }
    } else typeof l == "number" ? l = l & 255 : typeof l == "boolean" && (l = Number(l));
    if (u < 0 || this.length < u || this.length < Q) throw new RangeError("Out of range index");
    if (Q <= u) return this;
    u = u >>> 0, Q = Q === void 0 ? this.length : Q >>> 0, l || (l = 0);
    var Y;
    if (typeof l == "number") for (Y = u; Y < Q; ++Y) this[Y] = l;
    else {
      var gA = o.isBuffer(l) ? l : o.from(l, j), yA = gA.length;
      if (yA === 0) throw new TypeError('The value "' + l + '" is invalid for argument "value"');
      for (Y = 0; Y < Q - u; ++Y) this[Y + u] = gA[Y % yA];
    }
    return this;
  };
  var _A = /[^+/0-9A-Za-z-_]/g;
  function H(D) {
    if (D = D.split("=")[0], D = D.trim().replace(_A, ""), D.length < 2) return "";
    for (; D.length % 4 !== 0; ) D = D + "=";
    return D;
  }
  function y(D, l) {
    l = l || 1 / 0;
    for (var u, Q = D.length, j = null, AA = [], Y = 0; Y < Q; ++Y) {
      if (u = D.charCodeAt(Y), u > 55295 && u < 57344) {
        if (!j) {
          if (u > 56319) {
            (l -= 3) > -1 && AA.push(239, 191, 189);
            continue;
          } else if (Y + 1 === Q) {
            (l -= 3) > -1 && AA.push(239, 191, 189);
            continue;
          }
          j = u;
          continue;
        }
        if (u < 56320) {
          (l -= 3) > -1 && AA.push(239, 191, 189), j = u;
          continue;
        }
        u = (j - 55296 << 10 | u - 56320) + 65536;
      } else j && (l -= 3) > -1 && AA.push(239, 191, 189);
      if (j = null, u < 128) {
        if ((l -= 1) < 0) break;
        AA.push(u);
      } else if (u < 2048) {
        if ((l -= 2) < 0) break;
        AA.push(u >> 6 | 192, u & 63 | 128);
      } else if (u < 65536) {
        if ((l -= 3) < 0) break;
        AA.push(u >> 12 | 224, u >> 6 & 63 | 128, u & 63 | 128);
      } else if (u < 1114112) {
        if ((l -= 4) < 0) break;
        AA.push(u >> 18 | 240, u >> 12 & 63 | 128, u >> 6 & 63 | 128, u & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return AA;
  }
  function J(D) {
    for (var l = [], u = 0; u < D.length; ++u) l.push(D.charCodeAt(u) & 255);
    return l;
  }
  function z(D, l) {
    for (var u, Q, j, AA = [], Y = 0; Y < D.length && !((l -= 2) < 0); ++Y)
      u = D.charCodeAt(Y), Q = u >> 8, j = u % 256, AA.push(j), AA.push(Q);
    return AA;
  }
  function pA(D) {
    return i.toByteArray(H(D));
  }
  function M(D, l, u, Q) {
    for (var j = 0; j < Q && !(j + u >= l.length || j >= D.length); ++j)
      l[j + u] = D[j];
    return j;
  }
  function G(D, l) {
    return D instanceof l || D != null && D.constructor != null && D.constructor.name != null && D.constructor.name === l.name;
  }
  function B(D) {
    return D !== D;
  }
  var eA = (function() {
    for (var D = "0123456789abcdef", l = new Array(256), u = 0; u < 16; ++u)
      for (var Q = u * 16, j = 0; j < 16; ++j) l[Q + j] = D[u] + D[j];
    return l;
  })();
})), cl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var c = {}, h = /* @__PURE__ */ Symbol("test"), f = Object(h);
    if (typeof h == "string" || Object.prototype.toString.call(h) !== "[object Symbol]" || Object.prototype.toString.call(f) !== "[object Symbol]") return !1;
    var a = 42;
    c[h] = a;
    for (var o in c) return !1;
    if (typeof Object.keys == "function" && Object.keys(c).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(c).length !== 0) return !1;
    var d = Object.getOwnPropertySymbols(c);
    if (d.length !== 1 || d[0] !== h || !Object.prototype.propertyIsEnumerable.call(c, h)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var U = Object.getOwnPropertyDescriptor(c, h);
      if (U.value !== a || U.enumerable !== !0) return !1;
    }
    return !0;
  };
})), Bs = /* @__PURE__ */ FA(((A, i) => {
  var n = cl();
  i.exports = function() {
    return n() && !!Symbol.toStringTag;
  };
})), hl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Object;
})), Jp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Error;
})), Yp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = EvalError;
})), Zp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = RangeError;
})), qp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = ReferenceError;
})), fl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = SyntaxError;
})), zn = /* @__PURE__ */ FA(((A, i) => {
  i.exports = TypeError;
})), $p = /* @__PURE__ */ FA(((A, i) => {
  i.exports = URIError;
})), Ag = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.abs;
})), eg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.floor;
})), tg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.max;
})), rg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.min;
})), ng = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.pow;
})), ig = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.round;
})), sg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Number.isNaN || function(c) {
    return c !== c;
  };
})), ag = /* @__PURE__ */ FA(((A, i) => {
  var n = sg();
  i.exports = function(h) {
    return n(h) || h === 0 ? h : h < 0 ? -1 : 1;
  };
})), og = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Object.getOwnPropertyDescriptor;
})), Wr = /* @__PURE__ */ FA(((A, i) => {
  var n = og();
  if (n) try {
    n([], "length");
  } catch {
    n = null;
  }
  i.exports = n;
})), Jn = /* @__PURE__ */ FA(((A, i) => {
  var n = Object.defineProperty || !1;
  if (n) try {
    n({}, "a", { value: 1 });
  } catch {
    n = !1;
  }
  i.exports = n;
})), lg = /* @__PURE__ */ FA(((A, i) => {
  var n = typeof Symbol < "u" && Symbol, c = cl();
  i.exports = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : c();
  };
})), dl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), pl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = hl().getPrototypeOf || null;
})), ug = /* @__PURE__ */ FA(((A, i) => {
  var n = "Function.prototype.bind called on incompatible ", c = Object.prototype.toString, h = Math.max, f = "[object Function]", a = function(b, v) {
    for (var _ = [], C = 0; C < b.length; C += 1) _[C] = b[C];
    for (var m = 0; m < v.length; m += 1) _[m + b.length] = v[m];
    return _;
  }, o = function(b, v) {
    for (var _ = [], C = v || 0, m = 0; C < b.length; C += 1, m += 1) _[m] = b[C];
    return _;
  }, d = function(U, b) {
    for (var v = "", _ = 0; _ < U.length; _ += 1)
      v += U[_], _ + 1 < U.length && (v += b);
    return v;
  };
  i.exports = function(b) {
    var v = this;
    if (typeof v != "function" || c.apply(v) !== f) throw new TypeError(n + v);
    for (var _ = o(arguments, 1), C, m = function() {
      if (this instanceof C) {
        var N = v.apply(this, a(_, arguments));
        return Object(N) === N ? N : this;
      }
      return v.apply(b, a(_, arguments));
    }, w = h(0, v.length - _.length), I = [], T = 0; T < w; T++) I[T] = "$" + T;
    if (C = Function("binder", "return function (" + d(I, ",") + "){ return binder.apply(this,arguments); }")(m), v.prototype) {
      var x = function() {
      };
      x.prototype = v.prototype, C.prototype = new x(), x.prototype = null;
    }
    return C;
  };
})), Xr = /* @__PURE__ */ FA(((A, i) => {
  var n = ug();
  i.exports = Function.prototype.bind || n;
})), ms = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Function.prototype.call;
})), vs = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Function.prototype.apply;
})), cg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), gl = /* @__PURE__ */ FA(((A, i) => {
  var n = Xr(), c = vs(), h = ms();
  i.exports = cg() || n.call(h, c);
})), ys = /* @__PURE__ */ FA(((A, i) => {
  var n = Xr(), c = zn(), h = ms(), f = gl();
  i.exports = function(o) {
    if (o.length < 1 || typeof o[0] != "function") throw new c("a function is required");
    return f(n, h, o);
  };
})), hg = /* @__PURE__ */ FA(((A, i) => {
  var n = ys(), c = Wr(), h;
  try {
    h = [].__proto__ === Array.prototype;
  } catch (d) {
    if (!d || typeof d != "object" || !("code" in d) || d.code !== "ERR_PROTO_ACCESS") throw d;
  }
  var f = !!h && c && c(Object.prototype, "__proto__"), a = Object, o = a.getPrototypeOf;
  i.exports = f && typeof f.get == "function" ? n([f.get]) : typeof o == "function" ? function(U) {
    return o(U == null ? U : a(U));
  } : !1;
})), wl = /* @__PURE__ */ FA(((A, i) => {
  var n = dl(), c = pl(), h = hg();
  i.exports = n ? function(a) {
    return n(a);
  } : c ? function(a) {
    if (!a || typeof a != "object" && typeof a != "function") throw new TypeError("getProto: not an object");
    return c(a);
  } : h ? function(a) {
    return h(a);
  } : null;
})), fg = /* @__PURE__ */ FA(((A, i) => {
  var n = Function.prototype.call, c = Object.prototype.hasOwnProperty;
  i.exports = Xr().call(n, c);
})), Bl = /* @__PURE__ */ FA(((A, i) => {
  var n, c = hl(), h = Jp(), f = Yp(), a = Zp(), o = qp(), d = fl(), U = zn(), b = $p(), v = Ag(), _ = eg(), C = tg(), m = rg(), w = ng(), I = ig(), T = ag(), x = Function, N = function(z) {
    try {
      return x('"use strict"; return (' + z + ").constructor;")();
    } catch {
    }
  }, O = Wr(), F = Jn(), g = function() {
    throw new U();
  }, R = O ? (function() {
    try {
      return arguments.callee, g;
    } catch {
      try {
        return O(arguments, "callee").get;
      } catch {
        return g;
      }
    }
  })() : g, V = lg()(), E = wl(), q = pl(), lA = dl(), k = vs(), Z = ms(), L = {}, $ = typeof Uint8Array > "u" || !E ? n : E(Uint8Array), uA = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": V && E ? E([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": L,
    "%AsyncGenerator%": L,
    "%AsyncGeneratorFunction%": L,
    "%AsyncIteratorPrototype%": L,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": h,
    "%eval%": eval,
    "%EvalError%": f,
    "%Float16Array%": typeof Float16Array > "u" ? n : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": x,
    "%GeneratorFunction%": L,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": V && E ? E(E([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !V || !E ? n : E((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": c,
    "%Object.getOwnPropertyDescriptor%": O,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": a,
    "%ReferenceError%": o,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !V || !E ? n : E((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": V && E ? E(""[Symbol.iterator]()) : n,
    "%Symbol%": V ? Symbol : n,
    "%SyntaxError%": d,
    "%ThrowTypeError%": R,
    "%TypedArray%": $,
    "%TypeError%": U,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": b,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet,
    "%Function.prototype.call%": Z,
    "%Function.prototype.apply%": k,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": q,
    "%Math.abs%": v,
    "%Math.floor%": _,
    "%Math.max%": C,
    "%Math.min%": m,
    "%Math.pow%": w,
    "%Math.round%": I,
    "%Math.sign%": T,
    "%Reflect.getPrototypeOf%": lA
  };
  if (E) try {
    null.error;
  } catch (z) {
    uA["%Error.prototype%"] = E(E(z));
  }
  var rA = function z(pA) {
    var M;
    if (pA === "%AsyncFunction%") M = N("async function () {}");
    else if (pA === "%GeneratorFunction%") M = N("function* () {}");
    else if (pA === "%AsyncGeneratorFunction%") M = N("async function* () {}");
    else if (pA === "%AsyncGenerator%") {
      var G = z("%AsyncGeneratorFunction%");
      G && (M = G.prototype);
    } else if (pA === "%AsyncIteratorPrototype%") {
      var B = z("%AsyncGenerator%");
      B && E && (M = E(B.prototype));
    }
    return uA[pA] = M, M;
  }, vA = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": [
      "Array",
      "prototype",
      "entries"
    ],
    "%ArrayProto_forEach%": [
      "Array",
      "prototype",
      "forEach"
    ],
    "%ArrayProto_keys%": [
      "Array",
      "prototype",
      "keys"
    ],
    "%ArrayProto_values%": [
      "Array",
      "prototype",
      "values"
    ],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": [
      "AsyncGeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": [
      "GeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": [
      "Object",
      "prototype",
      "toString"
    ],
    "%ObjProto_valueOf%": [
      "Object",
      "prototype",
      "valueOf"
    ],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": [
      "Promise",
      "prototype",
      "then"
    ],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, sA = Xr(), dA = fg(), tA = sA.call(Z, Array.prototype.concat), P = sA.call(k, Array.prototype.splice), iA = sA.call(Z, String.prototype.replace), aA = sA.call(Z, String.prototype.slice), fA = sA.call(Z, RegExp.prototype.exec), _A = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, H = /\\(\\)?/g, y = function(pA) {
    var M = aA(pA, 0, 1), G = aA(pA, -1);
    if (M === "%" && G !== "%") throw new d("invalid intrinsic syntax, expected closing `%`");
    if (G === "%" && M !== "%") throw new d("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return iA(pA, _A, function(eA, D, l, u) {
      B[B.length] = l ? iA(u, H, "$1") : D || eA;
    }), B;
  }, J = function(pA, M) {
    var G = pA, B;
    if (dA(vA, G) && (B = vA[G], G = "%" + B[0] + "%"), dA(uA, G)) {
      var eA = uA[G];
      if (eA === L && (eA = rA(G)), typeof eA > "u" && !M) throw new U("intrinsic " + pA + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: G,
        value: eA
      };
    }
    throw new d("intrinsic " + pA + " does not exist!");
  };
  i.exports = function(pA, M) {
    if (typeof pA != "string" || pA.length === 0) throw new U("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof M != "boolean") throw new U('"allowMissing" argument must be a boolean');
    if (fA(/^%?[^%]*%?$/, pA) === null) throw new d("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var G = y(pA), B = G.length > 0 ? G[0] : "", eA = J("%" + B + "%", M), D = eA.name, l = eA.value, u = !1, Q = eA.alias;
    Q && (B = Q[0], P(G, tA([0, 1], Q)));
    for (var j = 1, AA = !0; j < G.length; j += 1) {
      var Y = G[j], gA = aA(Y, 0, 1), yA = aA(Y, -1);
      if ((gA === '"' || gA === "'" || gA === "`" || yA === '"' || yA === "'" || yA === "`") && gA !== yA) throw new d("property names with quotes must have matching quotes");
      if ((Y === "constructor" || !AA) && (u = !0), B += "." + Y, D = "%" + B + "%", dA(uA, D)) l = uA[D];
      else if (l != null) {
        if (!(Y in l)) {
          if (!M) throw new U("base intrinsic for " + pA + " exists, but the property is not available.");
          return;
        }
        if (O && j + 1 >= G.length) {
          var BA = O(l, Y);
          AA = !!BA, AA && "get" in BA && !("originalValue" in BA.get) ? l = BA.get : l = l[Y];
        } else
          AA = dA(l, Y), l = l[Y];
        AA && !u && (uA[D] = l);
      }
    }
    return l;
  };
})), ml = /* @__PURE__ */ FA(((A, i) => {
  var n = Bl(), c = ys(), h = c([n("%String.prototype.indexOf%")]);
  i.exports = function(a, o) {
    var d = n(a, !!o);
    return typeof d == "function" && h(a, ".prototype.") > -1 ? c([d]) : d;
  };
})), dg = /* @__PURE__ */ FA(((A, i) => {
  var n = Bs()(), c = ml()("Object.prototype.toString"), h = function(d) {
    return n && d && typeof d == "object" && Symbol.toStringTag in d ? !1 : c(d) === "[object Arguments]";
  }, f = function(d) {
    return h(d) ? !0 : d !== null && typeof d == "object" && "length" in d && typeof d.length == "number" && d.length >= 0 && c(d) !== "[object Array]" && "callee" in d && c(d.callee) === "[object Function]";
  }, a = (function() {
    return h(arguments);
  })();
  h.isLegacyArguments = f, i.exports = a ? h : f;
})), pg = /* @__PURE__ */ FA(((A, i) => {
  var n = Object.prototype.toString, c = Function.prototype.toString, h = /^\s*(?:function)?\*/, f = Bs()(), a = Object.getPrototypeOf, o = function() {
    if (!f) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, d;
  i.exports = function(b) {
    if (typeof b != "function") return !1;
    if (h.test(c.call(b))) return !0;
    if (!f) return n.call(b) === "[object GeneratorFunction]";
    if (!a) return !1;
    if (typeof d > "u") {
      var v = o();
      d = v ? a(v) : !1;
    }
    return a(b) === d;
  };
})), gg = /* @__PURE__ */ FA(((A, i) => {
  var n = Function.prototype.toString, c = typeof Reflect == "object" && Reflect !== null && Reflect.apply, h, f;
  if (typeof c == "function" && typeof Object.defineProperty == "function") try {
    h = Object.defineProperty({}, "length", { get: function() {
      throw f;
    } }), f = {}, c(function() {
      throw 42;
    }, null, h);
  } catch (O) {
    O !== f && (c = null);
  }
  else c = null;
  var a = /^\s*class\b/, o = function(F) {
    try {
      var g = n.call(F);
      return a.test(g);
    } catch {
      return !1;
    }
  }, d = function(F) {
    try {
      return o(F) ? !1 : (n.call(F), !0);
    } catch {
      return !1;
    }
  }, U = Object.prototype.toString, b = "[object Object]", v = "[object Function]", _ = "[object GeneratorFunction]", C = "[object HTMLAllCollection]", m = "[object HTML document.all class]", w = "[object HTMLCollection]", I = typeof Symbol == "function" && !!Symbol.toStringTag, T = !(0 in [,]), x = function() {
    return !1;
  };
  if (typeof document == "object") {
    var N = document.all;
    U.call(N) === U.call(document.all) && (x = function(F) {
      if ((T || !F) && (typeof F > "u" || typeof F == "object")) try {
        var g = U.call(F);
        return (g === C || g === m || g === w || g === b) && F("") == null;
      } catch {
      }
      return !1;
    });
  }
  i.exports = c ? function(F) {
    if (x(F)) return !0;
    if (!F || typeof F != "function" && typeof F != "object") return !1;
    try {
      c(F, null, h);
    } catch (g) {
      if (g !== f) return !1;
    }
    return !o(F) && d(F);
  } : function(F) {
    if (x(F)) return !0;
    if (!F || typeof F != "function" && typeof F != "object") return !1;
    if (I) return d(F);
    if (o(F)) return !1;
    var g = U.call(F);
    return g !== v && g !== _ && !/^\[object HTML/.test(g) ? !1 : d(F);
  };
})), wg = /* @__PURE__ */ FA(((A, i) => {
  var n = gg(), c = Object.prototype.toString, h = Object.prototype.hasOwnProperty, f = function(b, v, _) {
    for (var C = 0, m = b.length; C < m; C++) h.call(b, C) && (_ == null ? v(b[C], C, b) : v.call(_, b[C], C, b));
  }, a = function(b, v, _) {
    for (var C = 0, m = b.length; C < m; C++) _ == null ? v(b.charAt(C), C, b) : v.call(_, b.charAt(C), C, b);
  }, o = function(b, v, _) {
    for (var C in b) h.call(b, C) && (_ == null ? v(b[C], C, b) : v.call(_, b[C], C, b));
  };
  function d(U) {
    return c.call(U) === "[object Array]";
  }
  i.exports = function(b, v, _) {
    if (!n(v)) throw new TypeError("iterator must be a function");
    var C;
    arguments.length >= 3 && (C = _), d(b) ? f(b, v, C) : typeof b == "string" ? a(b, v, C) : o(b, v, C);
  };
})), Bg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
})), mg = /* @__PURE__ */ FA(((A, i) => {
  pr();
  var n = Bg(), c = typeof globalThis > "u" ? me : globalThis;
  i.exports = function() {
    for (var f = [], a = 0; a < n.length; a++) typeof c[n[a]] == "function" && (f[f.length] = n[a]);
    return f;
  };
})), vg = /* @__PURE__ */ FA(((A, i) => {
  var n = Jn(), c = fl(), h = zn(), f = Wr();
  i.exports = function(o, d, U) {
    if (!o || typeof o != "object" && typeof o != "function") throw new h("`obj` must be an object or a function`");
    if (typeof d != "string" && typeof d != "symbol") throw new h("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new h("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new h("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new h("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new h("`loose`, if provided, must be a boolean");
    var b = arguments.length > 3 ? arguments[3] : null, v = arguments.length > 4 ? arguments[4] : null, _ = arguments.length > 5 ? arguments[5] : null, C = arguments.length > 6 ? arguments[6] : !1, m = !!f && f(o, d);
    if (n) n(o, d, {
      configurable: _ === null && m ? m.configurable : !_,
      enumerable: b === null && m ? m.enumerable : !b,
      value: U,
      writable: v === null && m ? m.writable : !v
    });
    else if (C || !b && !v && !_) o[d] = U;
    else throw new c("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), yg = /* @__PURE__ */ FA(((A, i) => {
  var n = Jn(), c = function() {
    return !!n;
  };
  c.hasArrayLengthDefineBug = function() {
    if (!n) return null;
    try {
      return n([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, i.exports = c;
})), Cg = /* @__PURE__ */ FA(((A, i) => {
  var n = Bl(), c = vg(), h = yg()(), f = Wr(), a = zn(), o = n("%Math.floor%");
  i.exports = function(U, b) {
    if (typeof U != "function") throw new a("`fn` is not a function");
    if (typeof b != "number" || b < 0 || b > 4294967295 || o(b) !== b) throw new a("`length` must be a positive 32-bit integer");
    var v = arguments.length > 2 && !!arguments[2], _ = !0, C = !0;
    if ("length" in U && f) {
      var m = f(U, "length");
      m && !m.configurable && (_ = !1), m && !m.writable && (C = !1);
    }
    return (_ || C || !v) && (h ? c(U, "length", b, !0, !0) : c(U, "length", b)), U;
  };
})), Fg = /* @__PURE__ */ FA(((A, i) => {
  var n = Xr(), c = vs(), h = gl();
  i.exports = function() {
    return h(n, c, arguments);
  };
})), Eg = /* @__PURE__ */ FA(((A, i) => {
  var n = Cg(), c = Jn(), h = ys(), f = Fg();
  i.exports = function(o) {
    var d = h(arguments), U = o.length - (arguments.length - 1);
    return n(d, 1 + (U > 0 ? U : 0), !0);
  }, c ? c(i.exports, "apply", { value: f }) : i.exports.apply = f;
})), vl = /* @__PURE__ */ FA(((A, i) => {
  pr();
  var n = wg(), c = mg(), h = Eg(), f = ml(), a = Wr(), o = wl(), d = f("Object.prototype.toString"), U = Bs()(), b = typeof globalThis > "u" ? me : globalThis, v = c(), _ = f("String.prototype.slice"), C = f("Array.prototype.indexOf", !0) || function(x, N) {
    for (var O = 0; O < x.length; O += 1) if (x[O] === N) return O;
    return -1;
  }, m = { __proto__: null };
  U && a && o ? n(v, function(T) {
    var x = new b[T]();
    if (Symbol.toStringTag in x && o) {
      var N = o(x), O = a(N, Symbol.toStringTag);
      !O && N && (O = a(o(N), Symbol.toStringTag)), m["$" + T] = h(O.get);
    }
  }) : n(v, function(T) {
    var x = new b[T](), N = x.slice || x.set;
    N && (m["$" + T] = h(N));
  });
  var w = function(x) {
    var N = !1;
    return n(m, function(O, F) {
      if (!N) try {
        "$" + O(x) === F && (N = _(F, 1));
      } catch {
      }
    }), N;
  }, I = function(x) {
    var N = !1;
    return n(m, function(O, F) {
      if (!N) try {
        O(x), N = _(F, 1);
      } catch {
      }
    }), N;
  };
  i.exports = function(x) {
    if (!x || typeof x != "object") return !1;
    if (!U) {
      var N = _(d(x), 8, -1);
      return C(v, N) > -1 ? N : N !== "Object" ? !1 : I(x);
    }
    return a ? w(x) : null;
  };
})), Qg = /* @__PURE__ */ FA(((A, i) => {
  var n = vl();
  i.exports = function(h) {
    return !!n(h);
  };
})), Ug = /* @__PURE__ */ FA(((A) => {
  var i = dg(), n = pg(), c = vl(), h = Qg();
  function f(Q) {
    return Q.call.bind(Q);
  }
  var a = typeof BigInt < "u", o = typeof Symbol < "u", d = f(Object.prototype.toString), U = f(Number.prototype.valueOf), b = f(String.prototype.valueOf), v = f(Boolean.prototype.valueOf);
  if (a) var _ = f(BigInt.prototype.valueOf);
  if (o) var C = f(Symbol.prototype.valueOf);
  function m(Q, j) {
    if (typeof Q != "object") return !1;
    try {
      return j(Q), !0;
    } catch {
      return !1;
    }
  }
  A.isArgumentsObject = i, A.isGeneratorFunction = n, A.isTypedArray = h;
  function w(Q) {
    return typeof Promise < "u" && Q instanceof Promise || Q !== null && typeof Q == "object" && typeof Q.then == "function" && typeof Q.catch == "function";
  }
  A.isPromise = w;
  function I(Q) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(Q) : h(Q) || iA(Q);
  }
  A.isArrayBufferView = I;
  function T(Q) {
    return c(Q) === "Uint8Array";
  }
  A.isUint8Array = T;
  function x(Q) {
    return c(Q) === "Uint8ClampedArray";
  }
  A.isUint8ClampedArray = x;
  function N(Q) {
    return c(Q) === "Uint16Array";
  }
  A.isUint16Array = N;
  function O(Q) {
    return c(Q) === "Uint32Array";
  }
  A.isUint32Array = O;
  function F(Q) {
    return c(Q) === "Int8Array";
  }
  A.isInt8Array = F;
  function g(Q) {
    return c(Q) === "Int16Array";
  }
  A.isInt16Array = g;
  function R(Q) {
    return c(Q) === "Int32Array";
  }
  A.isInt32Array = R;
  function V(Q) {
    return c(Q) === "Float32Array";
  }
  A.isFloat32Array = V;
  function E(Q) {
    return c(Q) === "Float64Array";
  }
  A.isFloat64Array = E;
  function q(Q) {
    return c(Q) === "BigInt64Array";
  }
  A.isBigInt64Array = q;
  function lA(Q) {
    return c(Q) === "BigUint64Array";
  }
  A.isBigUint64Array = lA;
  function k(Q) {
    return d(Q) === "[object Map]";
  }
  k.working = typeof Map < "u" && k(/* @__PURE__ */ new Map());
  function Z(Q) {
    return typeof Map > "u" ? !1 : k.working ? k(Q) : Q instanceof Map;
  }
  A.isMap = Z;
  function L(Q) {
    return d(Q) === "[object Set]";
  }
  L.working = typeof Set < "u" && L(/* @__PURE__ */ new Set());
  function $(Q) {
    return typeof Set > "u" ? !1 : L.working ? L(Q) : Q instanceof Set;
  }
  A.isSet = $;
  function uA(Q) {
    return d(Q) === "[object WeakMap]";
  }
  uA.working = typeof WeakMap < "u" && uA(/* @__PURE__ */ new WeakMap());
  function rA(Q) {
    return typeof WeakMap > "u" ? !1 : uA.working ? uA(Q) : Q instanceof WeakMap;
  }
  A.isWeakMap = rA;
  function vA(Q) {
    return d(Q) === "[object WeakSet]";
  }
  vA.working = typeof WeakSet < "u" && vA(/* @__PURE__ */ new WeakSet());
  function sA(Q) {
    return vA(Q);
  }
  A.isWeakSet = sA;
  function dA(Q) {
    return d(Q) === "[object ArrayBuffer]";
  }
  dA.working = typeof ArrayBuffer < "u" && dA(/* @__PURE__ */ new ArrayBuffer());
  function tA(Q) {
    return typeof ArrayBuffer > "u" ? !1 : dA.working ? dA(Q) : Q instanceof ArrayBuffer;
  }
  A.isArrayBuffer = tA;
  function P(Q) {
    return d(Q) === "[object DataView]";
  }
  P.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && P(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function iA(Q) {
    return typeof DataView > "u" ? !1 : P.working ? P(Q) : Q instanceof DataView;
  }
  A.isDataView = iA;
  var aA = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function fA(Q) {
    return d(Q) === "[object SharedArrayBuffer]";
  }
  function _A(Q) {
    return typeof aA > "u" ? !1 : (typeof fA.working > "u" && (fA.working = fA(new aA())), fA.working ? fA(Q) : Q instanceof aA);
  }
  A.isSharedArrayBuffer = _A;
  function H(Q) {
    return d(Q) === "[object AsyncFunction]";
  }
  A.isAsyncFunction = H;
  function y(Q) {
    return d(Q) === "[object Map Iterator]";
  }
  A.isMapIterator = y;
  function J(Q) {
    return d(Q) === "[object Set Iterator]";
  }
  A.isSetIterator = J;
  function z(Q) {
    return d(Q) === "[object Generator]";
  }
  A.isGeneratorObject = z;
  function pA(Q) {
    return d(Q) === "[object WebAssembly.Module]";
  }
  A.isWebAssemblyCompiledModule = pA;
  function M(Q) {
    return m(Q, U);
  }
  A.isNumberObject = M;
  function G(Q) {
    return m(Q, b);
  }
  A.isStringObject = G;
  function B(Q) {
    return m(Q, v);
  }
  A.isBooleanObject = B;
  function eA(Q) {
    return a && m(Q, _);
  }
  A.isBigIntObject = eA;
  function D(Q) {
    return o && m(Q, C);
  }
  A.isSymbolObject = D;
  function l(Q) {
    return M(Q) || G(Q) || B(Q) || eA(Q) || D(Q);
  }
  A.isBoxedPrimitive = l;
  function u(Q) {
    return typeof Uint8Array < "u" && (tA(Q) || _A(Q));
  }
  A.isAnyArrayBuffer = u, [
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
  ].forEach(function(Q) {
    Object.defineProperty(A, Q, {
      enumerable: !1,
      value: function() {
        throw new Error(Q + " is not supported in userland");
      }
    });
  });
})), bg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function(c) {
    return c && typeof c == "object" && typeof c.copy == "function" && typeof c.fill == "function" && typeof c.readUInt8 == "function";
  };
})), yl = /* @__PURE__ */ FA(((A) => {
  yt();
  var i = Object.getOwnPropertyDescriptors || function(iA) {
    for (var aA = Object.keys(iA), fA = {}, _A = 0; _A < aA.length; _A++) fA[aA[_A]] = Object.getOwnPropertyDescriptor(iA, aA[_A]);
    return fA;
  }, n = /%[sdj%]/g;
  A.format = function(P) {
    if (!F(P)) {
      for (var iA = [], aA = 0; aA < arguments.length; aA++) iA.push(a(arguments[aA]));
      return iA.join(" ");
    }
    for (var aA = 1, fA = arguments, _A = fA.length, H = String(P).replace(n, function(J) {
      if (J === "%%") return "%";
      if (aA >= _A) return J;
      switch (J) {
        case "%s":
          return String(fA[aA++]);
        case "%d":
          return Number(fA[aA++]);
        case "%j":
          try {
            return JSON.stringify(fA[aA++]);
          } catch {
            return "[Circular]";
          }
        default:
          return J;
      }
    }), y = fA[aA]; aA < _A; y = fA[++aA]) x(y) || !E(y) ? H += " " + y : H += " " + a(y);
    return H;
  }, A.deprecate = function(P, iA) {
    if (typeof MA < "u" && MA.noDeprecation === !0) return P;
    if (typeof MA > "u") return function() {
      return A.deprecate(P, iA).apply(this, arguments);
    };
    var aA = !1;
    function fA() {
      if (!aA) {
        if (MA.throwDeprecation) throw new Error(iA);
        MA.traceDeprecation ? console.trace(iA) : console.error(iA), aA = !0;
      }
      return P.apply(this, arguments);
    }
    return fA;
  };
  var c = {}, h = /^$/;
  if (MA.env.NODE_DEBUG) {
    var f = MA.env.NODE_DEBUG;
    f = f.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), h = new RegExp("^" + f + "$", "i");
  }
  A.debuglog = function(P) {
    if (P = P.toUpperCase(), !c[P]) if (h.test(P)) {
      var iA = MA.pid;
      c[P] = function() {
        var aA = A.format.apply(A, arguments);
        console.error("%s %d: %s", P, iA, aA);
      };
    } else c[P] = function() {
    };
    return c[P];
  };
  function a(P, iA) {
    var aA = {
      seen: [],
      stylize: d
    };
    return arguments.length >= 3 && (aA.depth = arguments[2]), arguments.length >= 4 && (aA.colors = arguments[3]), T(iA) ? aA.showHidden = iA : iA && A._extend(aA, iA), R(aA.showHidden) && (aA.showHidden = !1), R(aA.depth) && (aA.depth = 2), R(aA.colors) && (aA.colors = !1), R(aA.customInspect) && (aA.customInspect = !0), aA.colors && (aA.stylize = o), b(aA, P, aA.depth);
  }
  A.inspect = a, a.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  }, a.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };
  function o(P, iA) {
    var aA = a.styles[iA];
    return aA ? "\x1B[" + a.colors[aA][0] + "m" + P + "\x1B[" + a.colors[aA][1] + "m" : P;
  }
  function d(P, iA) {
    return P;
  }
  function U(P) {
    var iA = {};
    return P.forEach(function(aA, fA) {
      iA[aA] = !0;
    }), iA;
  }
  function b(P, iA, aA) {
    if (P.customInspect && iA && k(iA.inspect) && iA.inspect !== A.inspect && !(iA.constructor && iA.constructor.prototype === iA)) {
      var fA = iA.inspect(aA, P);
      return F(fA) || (fA = b(P, fA, aA)), fA;
    }
    var _A = v(P, iA);
    if (_A) return _A;
    var H = Object.keys(iA), y = U(H);
    if (P.showHidden && (H = Object.getOwnPropertyNames(iA)), lA(iA) && (H.indexOf("message") >= 0 || H.indexOf("description") >= 0)) return _(iA);
    if (H.length === 0) {
      if (k(iA)) {
        var J = iA.name ? ": " + iA.name : "";
        return P.stylize("[Function" + J + "]", "special");
      }
      if (V(iA)) return P.stylize(RegExp.prototype.toString.call(iA), "regexp");
      if (q(iA)) return P.stylize(Date.prototype.toString.call(iA), "date");
      if (lA(iA)) return _(iA);
    }
    var z = "", pA = !1, M = ["{", "}"];
    if (I(iA) && (pA = !0, M = ["[", "]"]), k(iA) && (z = " [Function" + (iA.name ? ": " + iA.name : "") + "]"), V(iA) && (z = " " + RegExp.prototype.toString.call(iA)), q(iA) && (z = " " + Date.prototype.toUTCString.call(iA)), lA(iA) && (z = " " + _(iA)), H.length === 0 && (!pA || iA.length == 0)) return M[0] + z + M[1];
    if (aA < 0) return V(iA) ? P.stylize(RegExp.prototype.toString.call(iA), "regexp") : P.stylize("[Object]", "special");
    P.seen.push(iA);
    var G;
    return pA ? G = C(P, iA, aA, y, H) : G = H.map(function(B) {
      return m(P, iA, aA, y, B, pA);
    }), P.seen.pop(), w(G, z, M);
  }
  function v(P, iA) {
    if (R(iA)) return P.stylize("undefined", "undefined");
    if (F(iA)) {
      var aA = "'" + JSON.stringify(iA).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return P.stylize(aA, "string");
    }
    if (O(iA)) return P.stylize("" + iA, "number");
    if (T(iA)) return P.stylize("" + iA, "boolean");
    if (x(iA)) return P.stylize("null", "null");
  }
  function _(P) {
    return "[" + Error.prototype.toString.call(P) + "]";
  }
  function C(P, iA, aA, fA, _A) {
    for (var H = [], y = 0, J = iA.length; y < J; ++y) vA(iA, String(y)) ? H.push(m(P, iA, aA, fA, String(y), !0)) : H.push("");
    return _A.forEach(function(z) {
      z.match(/^\d+$/) || H.push(m(P, iA, aA, fA, z, !0));
    }), H;
  }
  function m(P, iA, aA, fA, _A, H) {
    var y, J, z = Object.getOwnPropertyDescriptor(iA, _A) || { value: iA[_A] };
    if (z.get ? z.set ? J = P.stylize("[Getter/Setter]", "special") : J = P.stylize("[Getter]", "special") : z.set && (J = P.stylize("[Setter]", "special")), vA(fA, _A) || (y = "[" + _A + "]"), J || (P.seen.indexOf(z.value) < 0 ? (x(aA) ? J = b(P, z.value, null) : J = b(P, z.value, aA - 1), J.indexOf(`
`) > -1 && (H ? J = J.split(`
`).map(function(pA) {
      return "  " + pA;
    }).join(`
`).slice(2) : J = `
` + J.split(`
`).map(function(pA) {
      return "   " + pA;
    }).join(`
`))) : J = P.stylize("[Circular]", "special")), R(y)) {
      if (H && _A.match(/^\d+$/)) return J;
      y = JSON.stringify("" + _A), y.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (y = y.slice(1, -1), y = P.stylize(y, "name")) : (y = y.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), y = P.stylize(y, "string"));
    }
    return y + ": " + J;
  }
  function w(P, iA, aA) {
    var fA = 0;
    return P.reduce(function(_A, H) {
      return fA++, H.indexOf(`
`) >= 0 && fA++, _A + H.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? aA[0] + (iA === "" ? "" : iA + `
 `) + " " + P.join(`,
  `) + " " + aA[1] : aA[0] + iA + " " + P.join(", ") + " " + aA[1];
  }
  A.types = Ug();
  function I(P) {
    return Array.isArray(P);
  }
  A.isArray = I;
  function T(P) {
    return typeof P == "boolean";
  }
  A.isBoolean = T;
  function x(P) {
    return P === null;
  }
  A.isNull = x;
  function N(P) {
    return P == null;
  }
  A.isNullOrUndefined = N;
  function O(P) {
    return typeof P == "number";
  }
  A.isNumber = O;
  function F(P) {
    return typeof P == "string";
  }
  A.isString = F;
  function g(P) {
    return typeof P == "symbol";
  }
  A.isSymbol = g;
  function R(P) {
    return P === void 0;
  }
  A.isUndefined = R;
  function V(P) {
    return E(P) && L(P) === "[object RegExp]";
  }
  A.isRegExp = V, A.types.isRegExp = V;
  function E(P) {
    return typeof P == "object" && P !== null;
  }
  A.isObject = E;
  function q(P) {
    return E(P) && L(P) === "[object Date]";
  }
  A.isDate = q, A.types.isDate = q;
  function lA(P) {
    return E(P) && (L(P) === "[object Error]" || P instanceof Error);
  }
  A.isError = lA, A.types.isNativeError = lA;
  function k(P) {
    return typeof P == "function";
  }
  A.isFunction = k;
  function Z(P) {
    return P === null || typeof P == "boolean" || typeof P == "number" || typeof P == "string" || typeof P == "symbol" || typeof P > "u";
  }
  A.isPrimitive = Z, A.isBuffer = bg();
  function L(P) {
    return Object.prototype.toString.call(P);
  }
  function $(P) {
    return P < 10 ? "0" + P.toString(10) : P.toString(10);
  }
  var uA = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function rA() {
    var P = /* @__PURE__ */ new Date(), iA = [
      $(P.getHours()),
      $(P.getMinutes()),
      $(P.getSeconds())
    ].join(":");
    return [
      P.getDate(),
      uA[P.getMonth()],
      iA
    ].join(" ");
  }
  A.log = function() {
    console.log("%s - %s", rA(), A.format.apply(A, arguments));
  }, A.inherits = vt(), A._extend = function(P, iA) {
    if (!iA || !E(iA)) return P;
    for (var aA = Object.keys(iA), fA = aA.length; fA--; ) P[aA[fA]] = iA[aA[fA]];
    return P;
  };
  function vA(P, iA) {
    return Object.prototype.hasOwnProperty.call(P, iA);
  }
  var sA = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
  A.promisify = function(iA) {
    if (typeof iA != "function") throw new TypeError('The "original" argument must be of type Function');
    if (sA && iA[sA]) {
      var aA = iA[sA];
      if (typeof aA != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(aA, sA, {
        value: aA,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), aA;
    }
    function aA() {
      for (var fA, _A, H = new Promise(function(z, pA) {
        fA = z, _A = pA;
      }), y = [], J = 0; J < arguments.length; J++) y.push(arguments[J]);
      y.push(function(z, pA) {
        z ? _A(z) : fA(pA);
      });
      try {
        iA.apply(this, y);
      } catch (z) {
        _A(z);
      }
      return H;
    }
    return Object.setPrototypeOf(aA, Object.getPrototypeOf(iA)), sA && Object.defineProperty(aA, sA, {
      value: aA,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(aA, i(iA));
  }, A.promisify.custom = sA;
  function dA(P, iA) {
    if (!P) {
      var aA = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      aA.reason = P, P = aA;
    }
    return iA(P);
  }
  function tA(P) {
    if (typeof P != "function") throw new TypeError('The "original" argument must be of type Function');
    function iA() {
      for (var aA = [], fA = 0; fA < arguments.length; fA++) aA.push(arguments[fA]);
      var _A = aA.pop();
      if (typeof _A != "function") throw new TypeError("The last argument must be of type Function");
      var H = this, y = function() {
        return _A.apply(H, arguments);
      };
      P.apply(this, aA).then(function(J) {
        MA.nextTick(y.bind(null, null, J));
      }, function(J) {
        MA.nextTick(dA.bind(null, J, y));
      });
    }
    return Object.setPrototypeOf(iA, Object.getPrototypeOf(P)), Object.defineProperties(iA, i(P)), iA;
  }
  A.callbackify = tA;
})), Ig = /* @__PURE__ */ FA(((A, i) => {
  function n(m, w) {
    var I = Object.keys(m);
    if (Object.getOwnPropertySymbols) {
      var T = Object.getOwnPropertySymbols(m);
      w && (T = T.filter(function(x) {
        return Object.getOwnPropertyDescriptor(m, x).enumerable;
      })), I.push.apply(I, T);
    }
    return I;
  }
  function c(m) {
    for (var w = 1; w < arguments.length; w++) {
      var I = arguments[w] != null ? arguments[w] : {};
      w % 2 ? n(Object(I), !0).forEach(function(T) {
        h(m, T, I[T]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(m, Object.getOwnPropertyDescriptors(I)) : n(Object(I)).forEach(function(T) {
        Object.defineProperty(m, T, Object.getOwnPropertyDescriptor(I, T));
      });
    }
    return m;
  }
  function h(m, w, I) {
    return w = d(w), w in m ? Object.defineProperty(m, w, {
      value: I,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : m[w] = I, m;
  }
  function f(m, w) {
    if (!(m instanceof w)) throw new TypeError("Cannot call a class as a function");
  }
  function a(m, w) {
    for (var I = 0; I < w.length; I++) {
      var T = w[I];
      T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(m, d(T.key), T);
    }
  }
  function o(m, w, I) {
    return w && a(m.prototype, w), I && a(m, I), Object.defineProperty(m, "prototype", { writable: !1 }), m;
  }
  function d(m) {
    var w = U(m, "string");
    return typeof w == "symbol" ? w : String(w);
  }
  function U(m, w) {
    if (typeof m != "object" || m === null) return m;
    var I = m[Symbol.toPrimitive];
    if (I !== void 0) {
      var T = I.call(m, w || "default");
      if (typeof T != "object") return T;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (w === "string" ? String : Number)(m);
  }
  var b = jn().Buffer, v = yl().inspect, _ = v && v.custom || "inspect";
  function C(m, w, I) {
    b.prototype.copy.call(m, w, I);
  }
  i.exports = /* @__PURE__ */ (function() {
    function m() {
      f(this, m), this.head = null, this.tail = null, this.length = 0;
    }
    return o(m, [
      {
        key: "push",
        value: function(I) {
          var T = {
            data: I,
            next: null
          };
          this.length > 0 ? this.tail.next = T : this.head = T, this.tail = T, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(I) {
          var T = {
            data: I,
            next: this.head
          };
          this.length === 0 && (this.tail = T), this.head = T, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var I = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, I;
          }
        }
      },
      {
        key: "clear",
        value: function() {
          this.head = this.tail = null, this.length = 0;
        }
      },
      {
        key: "join",
        value: function(I) {
          if (this.length === 0) return "";
          for (var T = this.head, x = "" + T.data; T = T.next; ) x += I + T.data;
          return x;
        }
      },
      {
        key: "concat",
        value: function(I) {
          if (this.length === 0) return b.alloc(0);
          for (var T = b.allocUnsafe(I >>> 0), x = this.head, N = 0; x; )
            C(x.data, T, N), N += x.data.length, x = x.next;
          return T;
        }
      },
      {
        key: "consume",
        value: function(I, T) {
          var x;
          return I < this.head.data.length ? (x = this.head.data.slice(0, I), this.head.data = this.head.data.slice(I)) : I === this.head.data.length ? x = this.shift() : x = T ? this._getString(I) : this._getBuffer(I), x;
        }
      },
      {
        key: "first",
        value: function() {
          return this.head.data;
        }
      },
      {
        key: "_getString",
        value: function(I) {
          var T = this.head, x = 1, N = T.data;
          for (I -= N.length; T = T.next; ) {
            var O = T.data, F = I > O.length ? O.length : I;
            if (F === O.length ? N += O : N += O.slice(0, I), I -= F, I === 0) {
              F === O.length ? (++x, T.next ? this.head = T.next : this.head = this.tail = null) : (this.head = T, T.data = O.slice(F));
              break;
            }
            ++x;
          }
          return this.length -= x, N;
        }
      },
      {
        key: "_getBuffer",
        value: function(I) {
          var T = b.allocUnsafe(I), x = this.head, N = 1;
          for (x.data.copy(T), I -= x.data.length; x = x.next; ) {
            var O = x.data, F = I > O.length ? O.length : I;
            if (O.copy(T, T.length - I, 0, F), I -= F, I === 0) {
              F === O.length ? (++N, x.next ? this.head = x.next : this.head = this.tail = null) : (this.head = x, x.data = O.slice(F));
              break;
            }
            ++N;
          }
          return this.length -= N, T;
        }
      },
      {
        key: _,
        value: function(I, T) {
          return v(this, c(c({}, T), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), m;
  })();
})), Cl = /* @__PURE__ */ FA(((A, i) => {
  yt();
  function n(d, U) {
    var b = this, v = this._readableState && this._readableState.destroyed, _ = this._writableState && this._writableState.destroyed;
    return v || _ ? (U ? U(d) : d && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, MA.nextTick(a, this, d)) : MA.nextTick(a, this, d)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(d || null, function(C) {
      !U && C ? b._writableState ? b._writableState.errorEmitted ? MA.nextTick(h, b) : (b._writableState.errorEmitted = !0, MA.nextTick(c, b, C)) : MA.nextTick(c, b, C) : U ? (MA.nextTick(h, b), U(C)) : MA.nextTick(h, b);
    }), this);
  }
  function c(d, U) {
    a(d, U), h(d);
  }
  function h(d) {
    d._writableState && !d._writableState.emitClose || d._readableState && !d._readableState.emitClose || d.emit("close");
  }
  function f() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function a(d, U) {
    d.emit("error", U);
  }
  function o(d, U) {
    var b = d._readableState, v = d._writableState;
    b && b.autoDestroy || v && v.autoDestroy ? d.destroy(U) : d.emit("error", U);
  }
  i.exports = {
    destroy: n,
    undestroy: f,
    errorOrDestroy: o
  };
})), gr = /* @__PURE__ */ FA(((A, i) => {
  function n(U, b) {
    U.prototype = Object.create(b.prototype), U.prototype.constructor = U, U.__proto__ = b;
  }
  var c = {};
  function h(U, b, v) {
    v || (v = Error);
    function _(m, w, I) {
      return typeof b == "string" ? b : b(m, w, I);
    }
    var C = /* @__PURE__ */ (function(m) {
      n(w, m);
      function w(I, T, x) {
        return m.call(this, _(I, T, x)) || this;
      }
      return w;
    })(v);
    C.prototype.name = v.name, C.prototype.code = U, c[U] = C;
  }
  function f(U, b) {
    if (Array.isArray(U)) {
      var v = U.length;
      return U = U.map(function(_) {
        return String(_);
      }), v > 2 ? "one of ".concat(b, " ").concat(U.slice(0, v - 1).join(", "), ", or ") + U[v - 1] : v === 2 ? "one of ".concat(b, " ").concat(U[0], " or ").concat(U[1]) : "of ".concat(b, " ").concat(U[0]);
    } else return "of ".concat(b, " ").concat(String(U));
  }
  function a(U, b, v) {
    return U.substr(!v || v < 0 ? 0 : +v, b.length) === b;
  }
  function o(U, b, v) {
    return (v === void 0 || v > U.length) && (v = U.length), U.substring(v - b.length, v) === b;
  }
  function d(U, b, v) {
    return typeof v != "number" && (v = 0), v + b.length > U.length ? !1 : U.indexOf(b, v) !== -1;
  }
  h("ERR_INVALID_OPT_VALUE", function(U, b) {
    return 'The value "' + b + '" is invalid for option "' + U + '"';
  }, TypeError), h("ERR_INVALID_ARG_TYPE", function(U, b, v) {
    var _;
    typeof b == "string" && a(b, "not ") ? (_ = "must not be", b = b.replace(/^not /, "")) : _ = "must be";
    var C;
    if (o(U, " argument")) C = "The ".concat(U, " ").concat(_, " ").concat(f(b, "type"));
    else {
      var m = d(U, ".") ? "property" : "argument";
      C = 'The "'.concat(U, '" ').concat(m, " ").concat(_, " ").concat(f(b, "type"));
    }
    return C += ". Received type ".concat(typeof v), C;
  }, TypeError), h("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), h("ERR_METHOD_NOT_IMPLEMENTED", function(U) {
    return "The " + U + " method is not implemented";
  }), h("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), h("ERR_STREAM_DESTROYED", function(U) {
    return "Cannot call " + U + " after a stream was destroyed";
  }), h("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), h("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), h("ERR_STREAM_WRITE_AFTER_END", "write after end"), h("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), h("ERR_UNKNOWN_ENCODING", function(U) {
    return "Unknown encoding: " + U;
  }, TypeError), h("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), i.exports.codes = c;
})), Fl = /* @__PURE__ */ FA(((A, i) => {
  var n = gr().codes.ERR_INVALID_OPT_VALUE;
  function c(f, a, o) {
    return f.highWaterMark != null ? f.highWaterMark : a ? f[o] : null;
  }
  function h(f, a, o, d) {
    var U = c(a, d, o);
    if (U != null) {
      if (!(isFinite(U) && Math.floor(U) === U) || U < 0) throw new n(d ? o : "highWaterMark", U);
      return Math.floor(U);
    }
    return f.objectMode ? 16 : 16 * 1024;
  }
  i.exports = { getHighWaterMark: h };
})), _g = /* @__PURE__ */ FA(((A, i) => {
  pr(), i.exports = n;
  function n(h, f) {
    if (c("noDeprecation")) return h;
    var a = !1;
    function o() {
      if (!a) {
        if (c("throwDeprecation")) throw new Error(f);
        c("traceDeprecation") ? console.trace(f) : console.warn(f), a = !0;
      }
      return h.apply(this, arguments);
    }
    return o;
  }
  function c(h) {
    try {
      if (!me.localStorage) return !1;
    } catch {
      return !1;
    }
    var f = me.localStorage[h];
    return f == null ? !1 : String(f).toLowerCase() === "true";
  }
})), El = /* @__PURE__ */ FA(((A, i) => {
  pr(), yt(), i.exports = E;
  function n(H) {
    var y = this;
    this.next = null, this.entry = null, this.finish = function() {
      _A(y, H);
    };
  }
  var c;
  E.WritableState = R;
  var h = { deprecate: _g() }, f = ul(), a = jn().Buffer, o = (typeof me < "u" ? me : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function d(H) {
    return a.from(H);
  }
  function U(H) {
    return a.isBuffer(H) || H instanceof o;
  }
  var b = Cl(), v = Fl().getHighWaterMark, _ = gr().codes, C = _.ERR_INVALID_ARG_TYPE, m = _.ERR_METHOD_NOT_IMPLEMENTED, w = _.ERR_MULTIPLE_CALLBACK, I = _.ERR_STREAM_CANNOT_PIPE, T = _.ERR_STREAM_DESTROYED, x = _.ERR_STREAM_NULL_VALUES, N = _.ERR_STREAM_WRITE_AFTER_END, O = _.ERR_UNKNOWN_ENCODING, F = b.errorOrDestroy;
  vt()(E, f);
  function g() {
  }
  function R(H, y, J) {
    c = c || ur(), H = H || {}, typeof J != "boolean" && (J = y instanceof c), this.objectMode = !!H.objectMode, J && (this.objectMode = this.objectMode || !!H.writableObjectMode), this.highWaterMark = v(this, H, "writableHighWaterMark", J), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var z = H.decodeStrings === !1;
    this.decodeStrings = !z, this.defaultEncoding = H.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(pA) {
      rA(y, pA);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = H.emitClose !== !1, this.autoDestroy = !!H.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new n(this);
  }
  R.prototype.getBuffer = function() {
    for (var y = this.bufferedRequest, J = []; y; )
      J.push(y), y = y.next;
    return J;
  }, (function() {
    try {
      Object.defineProperty(R.prototype, "buffer", { get: h.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var V;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (V = Function.prototype[Symbol.hasInstance], Object.defineProperty(E, Symbol.hasInstance, { value: function(y) {
    return V.call(this, y) ? !0 : this !== E ? !1 : y && y._writableState instanceof R;
  } })) : V = function(y) {
    return y instanceof this;
  };
  function E(H) {
    c = c || ur();
    var y = this instanceof c;
    if (!y && !V.call(E, this)) return new E(H);
    this._writableState = new R(H, this, y), this.writable = !0, H && (typeof H.write == "function" && (this._write = H.write), typeof H.writev == "function" && (this._writev = H.writev), typeof H.destroy == "function" && (this._destroy = H.destroy), typeof H.final == "function" && (this._final = H.final)), f.call(this);
  }
  E.prototype.pipe = function() {
    F(this, new I());
  };
  function q(H, y) {
    var J = new N();
    F(H, J), MA.nextTick(y, J);
  }
  function lA(H, y, J, z) {
    var pA;
    return J === null ? pA = new x() : typeof J != "string" && !y.objectMode && (pA = new C("chunk", ["string", "Buffer"], J)), pA ? (F(H, pA), MA.nextTick(z, pA), !1) : !0;
  }
  E.prototype.write = function(H, y, J) {
    var z = this._writableState, pA = !1, M = !z.objectMode && U(H);
    return M && !a.isBuffer(H) && (H = d(H)), typeof y == "function" && (J = y, y = null), M ? y = "buffer" : y || (y = z.defaultEncoding), typeof J != "function" && (J = g), z.ending ? q(this, J) : (M || lA(this, z, H, J)) && (z.pendingcb++, pA = Z(this, z, M, H, y, J)), pA;
  }, E.prototype.cork = function() {
    this._writableState.corked++;
  }, E.prototype.uncork = function() {
    var H = this._writableState;
    H.corked && (H.corked--, !H.writing && !H.corked && !H.bufferProcessing && H.bufferedRequest && dA(this, H));
  }, E.prototype.setDefaultEncoding = function(y) {
    if (typeof y == "string" && (y = y.toLowerCase()), !([
      "hex",
      "utf8",
      "utf-8",
      "ascii",
      "binary",
      "base64",
      "ucs2",
      "ucs-2",
      "utf16le",
      "utf-16le",
      "raw"
    ].indexOf((y + "").toLowerCase()) > -1)) throw new O(y);
    return this._writableState.defaultEncoding = y, this;
  }, Object.defineProperty(E.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function k(H, y, J) {
    return !H.objectMode && H.decodeStrings !== !1 && typeof y == "string" && (y = a.from(y, J)), y;
  }
  Object.defineProperty(E.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function Z(H, y, J, z, pA, M) {
    if (!J) {
      var G = k(y, z, pA);
      z !== G && (J = !0, pA = "buffer", z = G);
    }
    var B = y.objectMode ? 1 : z.length;
    y.length += B;
    var eA = y.length < y.highWaterMark;
    if (eA || (y.needDrain = !0), y.writing || y.corked) {
      var D = y.lastBufferedRequest;
      y.lastBufferedRequest = {
        chunk: z,
        encoding: pA,
        isBuf: J,
        callback: M,
        next: null
      }, D ? D.next = y.lastBufferedRequest : y.bufferedRequest = y.lastBufferedRequest, y.bufferedRequestCount += 1;
    } else L(H, y, !1, B, z, pA, M);
    return eA;
  }
  function L(H, y, J, z, pA, M, G) {
    y.writelen = z, y.writecb = G, y.writing = !0, y.sync = !0, y.destroyed ? y.onwrite(new T("write")) : J ? H._writev(pA, y.onwrite) : H._write(pA, M, y.onwrite), y.sync = !1;
  }
  function $(H, y, J, z, pA) {
    --y.pendingcb, J ? (MA.nextTick(pA, z), MA.nextTick(aA, H, y), H._writableState.errorEmitted = !0, F(H, z)) : (pA(z), H._writableState.errorEmitted = !0, F(H, z), aA(H, y));
  }
  function uA(H) {
    H.writing = !1, H.writecb = null, H.length -= H.writelen, H.writelen = 0;
  }
  function rA(H, y) {
    var J = H._writableState, z = J.sync, pA = J.writecb;
    if (typeof pA != "function") throw new w();
    if (uA(J), y) $(H, J, z, y, pA);
    else {
      var M = tA(J) || H.destroyed;
      !M && !J.corked && !J.bufferProcessing && J.bufferedRequest && dA(H, J), z ? MA.nextTick(vA, H, J, M, pA) : vA(H, J, M, pA);
    }
  }
  function vA(H, y, J, z) {
    J || sA(H, y), y.pendingcb--, z(), aA(H, y);
  }
  function sA(H, y) {
    y.length === 0 && y.needDrain && (y.needDrain = !1, H.emit("drain"));
  }
  function dA(H, y) {
    y.bufferProcessing = !0;
    var J = y.bufferedRequest;
    if (H._writev && J && J.next) {
      var z = y.bufferedRequestCount, pA = new Array(z), M = y.corkedRequestsFree;
      M.entry = J;
      for (var G = 0, B = !0; J; )
        pA[G] = J, J.isBuf || (B = !1), J = J.next, G += 1;
      pA.allBuffers = B, L(H, y, !0, y.length, pA, "", M.finish), y.pendingcb++, y.lastBufferedRequest = null, M.next ? (y.corkedRequestsFree = M.next, M.next = null) : y.corkedRequestsFree = new n(y), y.bufferedRequestCount = 0;
    } else {
      for (; J; ) {
        var eA = J.chunk, D = J.encoding, l = J.callback;
        if (L(H, y, !1, y.objectMode ? 1 : eA.length, eA, D, l), J = J.next, y.bufferedRequestCount--, y.writing) break;
      }
      J === null && (y.lastBufferedRequest = null);
    }
    y.bufferedRequest = J, y.bufferProcessing = !1;
  }
  E.prototype._write = function(H, y, J) {
    J(new m("_write()"));
  }, E.prototype._writev = null, E.prototype.end = function(H, y, J) {
    var z = this._writableState;
    return typeof H == "function" ? (J = H, H = null, y = null) : typeof y == "function" && (J = y, y = null), H != null && this.write(H, y), z.corked && (z.corked = 1, this.uncork()), z.ending || fA(this, z, J), this;
  }, Object.defineProperty(E.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function tA(H) {
    return H.ending && H.length === 0 && H.bufferedRequest === null && !H.finished && !H.writing;
  }
  function P(H, y) {
    H._final(function(J) {
      y.pendingcb--, J && F(H, J), y.prefinished = !0, H.emit("prefinish"), aA(H, y);
    });
  }
  function iA(H, y) {
    !y.prefinished && !y.finalCalled && (typeof H._final == "function" && !y.destroyed ? (y.pendingcb++, y.finalCalled = !0, MA.nextTick(P, H, y)) : (y.prefinished = !0, H.emit("prefinish")));
  }
  function aA(H, y) {
    var J = tA(y);
    if (J && (iA(H, y), y.pendingcb === 0 && (y.finished = !0, H.emit("finish"), y.autoDestroy))) {
      var z = H._readableState;
      (!z || z.autoDestroy && z.endEmitted) && H.destroy();
    }
    return J;
  }
  function fA(H, y, J) {
    y.ending = !0, aA(H, y), J && (y.finished ? MA.nextTick(J) : H.once("finish", J)), y.ended = !0, H.writable = !1;
  }
  function _A(H, y, J) {
    var z = H.entry;
    for (H.entry = null; z; ) {
      var pA = z.callback;
      y.pendingcb--, pA(J), z = z.next;
    }
    y.corkedRequestsFree.next = H;
  }
  Object.defineProperty(E.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(y) {
      this._writableState && (this._writableState.destroyed = y);
    }
  }), E.prototype.destroy = b.destroy, E.prototype._undestroy = b.undestroy, E.prototype._destroy = function(H, y) {
    y(H);
  };
})), ur = /* @__PURE__ */ FA(((A, i) => {
  yt();
  var n = Object.keys || function(v) {
    var _ = [];
    for (var C in v) _.push(C);
    return _;
  };
  i.exports = d;
  var c = Ql(), h = El();
  vt()(d, c);
  for (var f = n(h.prototype), a = 0; a < f.length; a++) {
    var o = f[a];
    d.prototype[o] || (d.prototype[o] = h.prototype[o]);
  }
  function d(v) {
    if (!(this instanceof d)) return new d(v);
    c.call(this, v), h.call(this, v), this.allowHalfOpen = !0, v && (v.readable === !1 && (this.readable = !1), v.writable === !1 && (this.writable = !1), v.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", U)));
  }
  Object.defineProperty(d.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(d.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(d.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function U() {
    this._writableState.ended || MA.nextTick(b, this);
  }
  function b(v) {
    v.end();
  }
  Object.defineProperty(d.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(_) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = _, this._writableState.destroyed = _);
    }
  });
})), xg = /* @__PURE__ */ FA(((A, i) => {
  var n = jn(), c = n.Buffer;
  function h(a, o) {
    for (var d in a) o[d] = a[d];
  }
  c.from && c.alloc && c.allocUnsafe && c.allocUnsafeSlow ? i.exports = n : (h(n, A), A.Buffer = f);
  function f(a, o, d) {
    return c(a, o, d);
  }
  h(c, f), f.from = function(a, o, d) {
    if (typeof a == "number") throw new TypeError("Argument must not be a number");
    return c(a, o, d);
  }, f.alloc = function(a, o, d) {
    if (typeof a != "number") throw new TypeError("Argument must be a number");
    var U = c(a);
    return o !== void 0 ? typeof d == "string" ? U.fill(o, d) : U.fill(o) : U.fill(0), U;
  }, f.allocUnsafe = function(a) {
    if (typeof a != "number") throw new TypeError("Argument must be a number");
    return c(a);
  }, f.allocUnsafeSlow = function(a) {
    if (typeof a != "number") throw new TypeError("Argument must be a number");
    return n.SlowBuffer(a);
  };
})), os = /* @__PURE__ */ FA(((A) => {
  var i = xg().Buffer, n = i.isEncoding || function(x) {
    switch (x = "" + x, x && x.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function c(x) {
    if (!x) return "utf8";
    for (var N; ; ) switch (x) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return x;
      default:
        if (N) return;
        x = ("" + x).toLowerCase(), N = !0;
    }
  }
  function h(x) {
    var N = c(x);
    if (typeof N != "string" && (i.isEncoding === n || !n(x))) throw new Error("Unknown encoding: " + x);
    return N || x;
  }
  A.StringDecoder = f;
  function f(x) {
    this.encoding = h(x);
    var N;
    switch (this.encoding) {
      case "utf16le":
        this.text = _, this.end = C, N = 4;
        break;
      case "utf8":
        this.fillLast = U, N = 4;
        break;
      case "base64":
        this.text = m, this.end = w, N = 3;
        break;
      default:
        this.write = I, this.end = T;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(N);
  }
  f.prototype.write = function(x) {
    if (x.length === 0) return "";
    var N, O;
    if (this.lastNeed) {
      if (N = this.fillLast(x), N === void 0) return "";
      O = this.lastNeed, this.lastNeed = 0;
    } else O = 0;
    return O < x.length ? N ? N + this.text(x, O) : this.text(x, O) : N || "";
  }, f.prototype.end = v, f.prototype.text = b, f.prototype.fillLast = function(x) {
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, x.length), this.lastNeed -= x.length;
  };
  function a(x) {
    return x <= 127 ? 0 : x >> 5 === 6 ? 2 : x >> 4 === 14 ? 3 : x >> 3 === 30 ? 4 : x >> 6 === 2 ? -1 : -2;
  }
  function o(x, N, O) {
    var F = N.length - 1;
    if (F < O) return 0;
    var g = a(N[F]);
    return g >= 0 ? (g > 0 && (x.lastNeed = g - 1), g) : --F < O || g === -2 ? 0 : (g = a(N[F]), g >= 0 ? (g > 0 && (x.lastNeed = g - 2), g) : --F < O || g === -2 ? 0 : (g = a(N[F]), g >= 0 ? (g > 0 && (g === 2 ? g = 0 : x.lastNeed = g - 3), g) : 0));
  }
  function d(x, N, O) {
    if ((N[0] & 192) !== 128)
      return x.lastNeed = 0, "�";
    if (x.lastNeed > 1 && N.length > 1) {
      if ((N[1] & 192) !== 128)
        return x.lastNeed = 1, "�";
      if (x.lastNeed > 2 && N.length > 2 && (N[2] & 192) !== 128)
        return x.lastNeed = 2, "�";
    }
  }
  function U(x) {
    var N = this.lastTotal - this.lastNeed, O = d(this, x, N);
    if (O !== void 0) return O;
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, N, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, N, 0, x.length), this.lastNeed -= x.length;
  }
  function b(x, N) {
    var O = o(this, x, N);
    if (!this.lastNeed) return x.toString("utf8", N);
    this.lastTotal = O;
    var F = x.length - (O - this.lastNeed);
    return x.copy(this.lastChar, 0, F), x.toString("utf8", N, F);
  }
  function v(x) {
    var N = x && x.length ? this.write(x) : "";
    return this.lastNeed ? N + "�" : N;
  }
  function _(x, N) {
    if ((x.length - N) % 2 === 0) {
      var O = x.toString("utf16le", N);
      if (O) {
        var F = O.charCodeAt(O.length - 1);
        if (F >= 55296 && F <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1], O.slice(0, -1);
      }
      return O;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = x[x.length - 1], x.toString("utf16le", N, x.length - 1);
  }
  function C(x) {
    var N = x && x.length ? this.write(x) : "";
    if (this.lastNeed) {
      var O = this.lastTotal - this.lastNeed;
      return N + this.lastChar.toString("utf16le", 0, O);
    }
    return N;
  }
  function m(x, N) {
    var O = (x.length - N) % 3;
    return O === 0 ? x.toString("base64", N) : (this.lastNeed = 3 - O, this.lastTotal = 3, O === 1 ? this.lastChar[0] = x[x.length - 1] : (this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1]), x.toString("base64", N, x.length - O));
  }
  function w(x) {
    var N = x && x.length ? this.write(x) : "";
    return this.lastNeed ? N + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : N;
  }
  function I(x) {
    return x.toString(this.encoding);
  }
  function T(x) {
    return x && x.length ? this.write(x) : "";
  }
})), Cs = /* @__PURE__ */ FA(((A, i) => {
  var n = gr().codes.ERR_STREAM_PREMATURE_CLOSE;
  function c(o) {
    var d = !1;
    return function() {
      if (!d) {
        d = !0;
        for (var U = arguments.length, b = new Array(U), v = 0; v < U; v++) b[v] = arguments[v];
        o.apply(this, b);
      }
    };
  }
  function h() {
  }
  function f(o) {
    return o.setHeader && typeof o.abort == "function";
  }
  function a(o, d, U) {
    if (typeof d == "function") return a(o, null, d);
    d || (d = {}), U = c(U || h);
    var b = d.readable || d.readable !== !1 && o.readable, v = d.writable || d.writable !== !1 && o.writable, _ = function() {
      o.writable || m();
    }, C = o._writableState && o._writableState.finished, m = function() {
      v = !1, C = !0, b || U.call(o);
    }, w = o._readableState && o._readableState.endEmitted, I = function() {
      b = !1, w = !0, v || U.call(o);
    }, T = function(F) {
      U.call(o, F);
    }, x = function() {
      var F;
      if (b && !w)
        return (!o._readableState || !o._readableState.ended) && (F = new n()), U.call(o, F);
      if (v && !C)
        return (!o._writableState || !o._writableState.ended) && (F = new n()), U.call(o, F);
    }, N = function() {
      o.req.on("finish", m);
    };
    return f(o) ? (o.on("complete", m), o.on("abort", x), o.req ? N() : o.on("request", N)) : v && !o._writableState && (o.on("end", _), o.on("close", _)), o.on("end", I), o.on("finish", m), d.error !== !1 && o.on("error", T), o.on("close", x), function() {
      o.removeListener("complete", m), o.removeListener("abort", x), o.removeListener("request", N), o.req && o.req.removeListener("finish", m), o.removeListener("end", _), o.removeListener("close", _), o.removeListener("finish", m), o.removeListener("end", I), o.removeListener("error", T), o.removeListener("close", x);
    };
  }
  i.exports = a;
})), Tg = /* @__PURE__ */ FA(((A, i) => {
  yt();
  var n;
  function c(O, F, g) {
    return F = h(F), F in O ? Object.defineProperty(O, F, {
      value: g,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : O[F] = g, O;
  }
  function h(O) {
    var F = f(O, "string");
    return typeof F == "symbol" ? F : String(F);
  }
  function f(O, F) {
    if (typeof O != "object" || O === null) return O;
    var g = O[Symbol.toPrimitive];
    if (g !== void 0) {
      var R = g.call(O, F || "default");
      if (typeof R != "object") return R;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (F === "string" ? String : Number)(O);
  }
  var a = Cs(), o = /* @__PURE__ */ Symbol("lastResolve"), d = /* @__PURE__ */ Symbol("lastReject"), U = /* @__PURE__ */ Symbol("error"), b = /* @__PURE__ */ Symbol("ended"), v = /* @__PURE__ */ Symbol("lastPromise"), _ = /* @__PURE__ */ Symbol("handlePromise"), C = /* @__PURE__ */ Symbol("stream");
  function m(O, F) {
    return {
      value: O,
      done: F
    };
  }
  function w(O) {
    var F = O[o];
    if (F !== null) {
      var g = O[C].read();
      g !== null && (O[v] = null, O[o] = null, O[d] = null, F(m(g, !1)));
    }
  }
  function I(O) {
    MA.nextTick(w, O);
  }
  function T(O, F) {
    return function(g, R) {
      O.then(function() {
        if (F[b]) {
          g(m(void 0, !0));
          return;
        }
        F[_](g, R);
      }, R);
    };
  }
  var x = Object.getPrototypeOf(function() {
  }), N = Object.setPrototypeOf((n = {
    get stream() {
      return this[C];
    },
    next: function() {
      var F = this, g = this[U];
      if (g !== null) return Promise.reject(g);
      if (this[b]) return Promise.resolve(m(void 0, !0));
      if (this[C].destroyed) return new Promise(function(q, lA) {
        MA.nextTick(function() {
          F[U] ? lA(F[U]) : q(m(void 0, !0));
        });
      });
      var R = this[v], V;
      if (R) V = new Promise(T(R, this));
      else {
        var E = this[C].read();
        if (E !== null) return Promise.resolve(m(E, !1));
        V = new Promise(this[_]);
      }
      return this[v] = V, V;
    }
  }, c(n, Symbol.asyncIterator, function() {
    return this;
  }), c(n, "return", function() {
    var F = this;
    return new Promise(function(g, R) {
      F[C].destroy(null, function(V) {
        if (V) {
          R(V);
          return;
        }
        g(m(void 0, !0));
      });
    });
  }), n), x);
  i.exports = function(F) {
    var g, R = Object.create(N, (g = {}, c(g, C, {
      value: F,
      writable: !0
    }), c(g, o, {
      value: null,
      writable: !0
    }), c(g, d, {
      value: null,
      writable: !0
    }), c(g, U, {
      value: null,
      writable: !0
    }), c(g, b, {
      value: F._readableState.endEmitted,
      writable: !0
    }), c(g, _, {
      value: function(E, q) {
        var lA = R[C].read();
        lA ? (R[v] = null, R[o] = null, R[d] = null, E(m(lA, !1))) : (R[o] = E, R[d] = q);
      },
      writable: !0
    }), g));
    return R[v] = null, a(F, function(V) {
      if (V && V.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var E = R[d];
        E !== null && (R[v] = null, R[o] = null, R[d] = null, E(V)), R[U] = V;
        return;
      }
      var q = R[o];
      q !== null && (R[v] = null, R[o] = null, R[d] = null, q(m(void 0, !0))), R[b] = !0;
    }), F.on("readable", I.bind(null, R)), R;
  };
})), Sg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), Ql = /* @__PURE__ */ FA(((A, i) => {
  pr(), yt(), i.exports = q;
  var n;
  q.ReadableState = E, ws().EventEmitter;
  var c = function(G, B) {
    return G.listeners(B).length;
  }, h = ul(), f = jn().Buffer, a = (typeof me < "u" ? me : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function o(M) {
    return f.from(M);
  }
  function d(M) {
    return f.isBuffer(M) || M instanceof a;
  }
  var U = yl(), b;
  U && U.debuglog ? b = U.debuglog("stream") : b = function() {
  };
  var v = Ig(), _ = Cl(), C = Fl().getHighWaterMark, m = gr().codes, w = m.ERR_INVALID_ARG_TYPE, I = m.ERR_STREAM_PUSH_AFTER_EOF, T = m.ERR_METHOD_NOT_IMPLEMENTED, x = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, N, O, F;
  vt()(q, h);
  var g = _.errorOrDestroy, R = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function V(M, G, B) {
    if (typeof M.prependListener == "function") return M.prependListener(G, B);
    !M._events || !M._events[G] ? M.on(G, B) : Array.isArray(M._events[G]) ? M._events[G].unshift(B) : M._events[G] = [B, M._events[G]];
  }
  function E(M, G, B) {
    n = n || ur(), M = M || {}, typeof B != "boolean" && (B = G instanceof n), this.objectMode = !!M.objectMode, B && (this.objectMode = this.objectMode || !!M.readableObjectMode), this.highWaterMark = C(this, M, "readableHighWaterMark", B), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = M.emitClose !== !1, this.autoDestroy = !!M.autoDestroy, this.destroyed = !1, this.defaultEncoding = M.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, M.encoding && (N || (N = os().StringDecoder), this.decoder = new N(M.encoding), this.encoding = M.encoding);
  }
  function q(M) {
    if (n = n || ur(), !(this instanceof q)) return new q(M);
    var G = this instanceof n;
    this._readableState = new E(M, this, G), this.readable = !0, M && (typeof M.read == "function" && (this._read = M.read), typeof M.destroy == "function" && (this._destroy = M.destroy)), h.call(this);
  }
  Object.defineProperty(q.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(G) {
      this._readableState && (this._readableState.destroyed = G);
    }
  }), q.prototype.destroy = _.destroy, q.prototype._undestroy = _.undestroy, q.prototype._destroy = function(M, G) {
    G(M);
  }, q.prototype.push = function(M, G) {
    var B = this._readableState, eA;
    return B.objectMode ? eA = !0 : typeof M == "string" && (G = G || B.defaultEncoding, G !== B.encoding && (M = f.from(M, G), G = ""), eA = !0), lA(this, M, G, !1, eA);
  }, q.prototype.unshift = function(M) {
    return lA(this, M, null, !0, !1);
  };
  function lA(M, G, B, eA, D) {
    b("readableAddChunk", G);
    var l = M._readableState;
    if (G === null)
      l.reading = !1, rA(M, l);
    else {
      var u;
      if (D || (u = Z(l, G)), u) g(M, u);
      else if (l.objectMode || G && G.length > 0)
        if (typeof G != "string" && !l.objectMode && Object.getPrototypeOf(G) !== f.prototype && (G = o(G)), eA) l.endEmitted ? g(M, new x()) : k(M, l, G, !0);
        else if (l.ended) g(M, new I());
        else {
          if (l.destroyed) return !1;
          l.reading = !1, l.decoder && !B ? (G = l.decoder.write(G), l.objectMode || G.length !== 0 ? k(M, l, G, !1) : dA(M, l)) : k(M, l, G, !1);
        }
      else eA || (l.reading = !1, dA(M, l));
    }
    return !l.ended && (l.length < l.highWaterMark || l.length === 0);
  }
  function k(M, G, B, eA) {
    G.flowing && G.length === 0 && !G.sync ? (G.awaitDrain = 0, M.emit("data", B)) : (G.length += G.objectMode ? 1 : B.length, eA ? G.buffer.unshift(B) : G.buffer.push(B), G.needReadable && vA(M)), dA(M, G);
  }
  function Z(M, G) {
    var B;
    return !d(G) && typeof G != "string" && G !== void 0 && !M.objectMode && (B = new w("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], G)), B;
  }
  q.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, q.prototype.setEncoding = function(M) {
    N || (N = os().StringDecoder);
    var G = new N(M);
    this._readableState.decoder = G, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var B = this._readableState.buffer.head, eA = ""; B !== null; )
      eA += G.write(B.data), B = B.next;
    return this._readableState.buffer.clear(), eA !== "" && this._readableState.buffer.push(eA), this._readableState.length = eA.length, this;
  };
  var L = 1073741824;
  function $(M) {
    return M >= L ? M = L : (M--, M |= M >>> 1, M |= M >>> 2, M |= M >>> 4, M |= M >>> 8, M |= M >>> 16, M++), M;
  }
  function uA(M, G) {
    return M <= 0 || G.length === 0 && G.ended ? 0 : G.objectMode ? 1 : M !== M ? G.flowing && G.length ? G.buffer.head.data.length : G.length : (M > G.highWaterMark && (G.highWaterMark = $(M)), M <= G.length ? M : G.ended ? G.length : (G.needReadable = !0, 0));
  }
  q.prototype.read = function(M) {
    b("read", M), M = parseInt(M, 10);
    var G = this._readableState, B = M;
    if (M !== 0 && (G.emittedReadable = !1), M === 0 && G.needReadable && ((G.highWaterMark !== 0 ? G.length >= G.highWaterMark : G.length > 0) || G.ended))
      return b("read: emitReadable", G.length, G.ended), G.length === 0 && G.ended ? J(this) : vA(this), null;
    if (M = uA(M, G), M === 0 && G.ended)
      return G.length === 0 && J(this), null;
    var eA = G.needReadable;
    b("need readable", eA), (G.length === 0 || G.length - M < G.highWaterMark) && (eA = !0, b("length less than watermark", eA)), G.ended || G.reading ? (eA = !1, b("reading or ended", eA)) : eA && (b("do read"), G.reading = !0, G.sync = !0, G.length === 0 && (G.needReadable = !0), this._read(G.highWaterMark), G.sync = !1, G.reading || (M = uA(B, G)));
    var D;
    return M > 0 ? D = y(M, G) : D = null, D === null ? (G.needReadable = G.length <= G.highWaterMark, M = 0) : (G.length -= M, G.awaitDrain = 0), G.length === 0 && (G.ended || (G.needReadable = !0), B !== M && G.ended && J(this)), D !== null && this.emit("data", D), D;
  };
  function rA(M, G) {
    if (b("onEofChunk"), !G.ended) {
      if (G.decoder) {
        var B = G.decoder.end();
        B && B.length && (G.buffer.push(B), G.length += G.objectMode ? 1 : B.length);
      }
      G.ended = !0, G.sync ? vA(M) : (G.needReadable = !1, G.emittedReadable || (G.emittedReadable = !0, sA(M)));
    }
  }
  function vA(M) {
    var G = M._readableState;
    b("emitReadable", G.needReadable, G.emittedReadable), G.needReadable = !1, G.emittedReadable || (b("emitReadable", G.flowing), G.emittedReadable = !0, MA.nextTick(sA, M));
  }
  function sA(M) {
    var G = M._readableState;
    b("emitReadable_", G.destroyed, G.length, G.ended), !G.destroyed && (G.length || G.ended) && (M.emit("readable"), G.emittedReadable = !1), G.needReadable = !G.flowing && !G.ended && G.length <= G.highWaterMark, H(M);
  }
  function dA(M, G) {
    G.readingMore || (G.readingMore = !0, MA.nextTick(tA, M, G));
  }
  function tA(M, G) {
    for (; !G.reading && !G.ended && (G.length < G.highWaterMark || G.flowing && G.length === 0); ) {
      var B = G.length;
      if (b("maybeReadMore read 0"), M.read(0), B === G.length) break;
    }
    G.readingMore = !1;
  }
  q.prototype._read = function(M) {
    g(this, new T("_read()"));
  }, q.prototype.pipe = function(M, G) {
    var B = this, eA = this._readableState;
    switch (eA.pipesCount) {
      case 0:
        eA.pipes = M;
        break;
      case 1:
        eA.pipes = [eA.pipes, M];
        break;
      default:
        eA.pipes.push(M);
        break;
    }
    eA.pipesCount += 1, b("pipe count=%d opts=%j", eA.pipesCount, G);
    var D = (!G || G.end !== !1) && M !== MA.stdout && M !== MA.stderr ? u : QA;
    eA.endEmitted ? MA.nextTick(D) : B.once("end", D), M.on("unpipe", l);
    function l(xA, RA) {
      b("onunpipe"), xA === B && RA && RA.hasUnpiped === !1 && (RA.hasUnpiped = !0, AA());
    }
    function u() {
      b("onend"), M.end();
    }
    var Q = P(B);
    M.on("drain", Q);
    var j = !1;
    function AA() {
      b("cleanup"), M.removeListener("close", yA), M.removeListener("finish", BA), M.removeListener("drain", Q), M.removeListener("error", gA), M.removeListener("unpipe", l), B.removeListener("end", u), B.removeListener("end", QA), B.removeListener("data", Y), j = !0, eA.awaitDrain && (!M._writableState || M._writableState.needDrain) && Q();
    }
    B.on("data", Y);
    function Y(xA) {
      b("ondata");
      var RA = M.write(xA);
      b("dest.write", RA), RA === !1 && ((eA.pipesCount === 1 && eA.pipes === M || eA.pipesCount > 1 && pA(eA.pipes, M) !== -1) && !j && (b("false write response, pause", eA.awaitDrain), eA.awaitDrain++), B.pause());
    }
    function gA(xA) {
      b("onerror", xA), QA(), M.removeListener("error", gA), c(M, "error") === 0 && g(M, xA);
    }
    V(M, "error", gA);
    function yA() {
      M.removeListener("finish", BA), QA();
    }
    M.once("close", yA);
    function BA() {
      b("onfinish"), M.removeListener("close", yA), QA();
    }
    M.once("finish", BA);
    function QA() {
      b("unpipe"), B.unpipe(M);
    }
    return M.emit("pipe", B), eA.flowing || (b("pipe resume"), B.resume()), M;
  };
  function P(M) {
    return function() {
      var B = M._readableState;
      b("pipeOnDrain", B.awaitDrain), B.awaitDrain && B.awaitDrain--, B.awaitDrain === 0 && c(M, "data") && (B.flowing = !0, H(M));
    };
  }
  q.prototype.unpipe = function(M) {
    var G = this._readableState, B = { hasUnpiped: !1 };
    if (G.pipesCount === 0) return this;
    if (G.pipesCount === 1)
      return M && M !== G.pipes ? this : (M || (M = G.pipes), G.pipes = null, G.pipesCount = 0, G.flowing = !1, M && M.emit("unpipe", this, B), this);
    if (!M) {
      var eA = G.pipes, D = G.pipesCount;
      G.pipes = null, G.pipesCount = 0, G.flowing = !1;
      for (var l = 0; l < D; l++) eA[l].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var u = pA(G.pipes, M);
    return u === -1 ? this : (G.pipes.splice(u, 1), G.pipesCount -= 1, G.pipesCount === 1 && (G.pipes = G.pipes[0]), M.emit("unpipe", this, B), this);
  }, q.prototype.on = function(M, G) {
    var B = h.prototype.on.call(this, M, G), eA = this._readableState;
    return M === "data" ? (eA.readableListening = this.listenerCount("readable") > 0, eA.flowing !== !1 && this.resume()) : M === "readable" && !eA.endEmitted && !eA.readableListening && (eA.readableListening = eA.needReadable = !0, eA.flowing = !1, eA.emittedReadable = !1, b("on readable", eA.length, eA.reading), eA.length ? vA(this) : eA.reading || MA.nextTick(aA, this)), B;
  }, q.prototype.addListener = q.prototype.on, q.prototype.removeListener = function(M, G) {
    var B = h.prototype.removeListener.call(this, M, G);
    return M === "readable" && MA.nextTick(iA, this), B;
  }, q.prototype.removeAllListeners = function(M) {
    var G = h.prototype.removeAllListeners.apply(this, arguments);
    return (M === "readable" || M === void 0) && MA.nextTick(iA, this), G;
  };
  function iA(M) {
    var G = M._readableState;
    G.readableListening = M.listenerCount("readable") > 0, G.resumeScheduled && !G.paused ? G.flowing = !0 : M.listenerCount("data") > 0 && M.resume();
  }
  function aA(M) {
    b("readable nexttick read 0"), M.read(0);
  }
  q.prototype.resume = function() {
    var M = this._readableState;
    return M.flowing || (b("resume"), M.flowing = !M.readableListening, fA(this, M)), M.paused = !1, this;
  };
  function fA(M, G) {
    G.resumeScheduled || (G.resumeScheduled = !0, MA.nextTick(_A, M, G));
  }
  function _A(M, G) {
    b("resume", G.reading), G.reading || M.read(0), G.resumeScheduled = !1, M.emit("resume"), H(M), G.flowing && !G.reading && M.read(0);
  }
  q.prototype.pause = function() {
    return b("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (b("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function H(M) {
    var G = M._readableState;
    for (b("flow", G.flowing); G.flowing && M.read() !== null; ) ;
  }
  q.prototype.wrap = function(M) {
    var G = this, B = this._readableState, eA = !1;
    M.on("end", function() {
      if (b("wrapped end"), B.decoder && !B.ended) {
        var u = B.decoder.end();
        u && u.length && G.push(u);
      }
      G.push(null);
    }), M.on("data", function(u) {
      b("wrapped data"), B.decoder && (u = B.decoder.write(u)), !(B.objectMode && u == null) && (!B.objectMode && (!u || !u.length) || G.push(u) || (eA = !0, M.pause()));
    });
    for (var D in M) this[D] === void 0 && typeof M[D] == "function" && (this[D] = /* @__PURE__ */ (function(Q) {
      return function() {
        return M[Q].apply(M, arguments);
      };
    })(D));
    for (var l = 0; l < R.length; l++) M.on(R[l], this.emit.bind(this, R[l]));
    return this._read = function(u) {
      b("wrapped _read", u), eA && (eA = !1, M.resume());
    }, this;
  }, typeof Symbol == "function" && (q.prototype[Symbol.asyncIterator] = function() {
    return O === void 0 && (O = Tg()), O(this);
  }), Object.defineProperty(q.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(q.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(q.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(G) {
      this._readableState && (this._readableState.flowing = G);
    }
  }), q._fromList = y, Object.defineProperty(q.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function y(M, G) {
    if (G.length === 0) return null;
    var B;
    return G.objectMode ? B = G.buffer.shift() : !M || M >= G.length ? (G.decoder ? B = G.buffer.join("") : G.buffer.length === 1 ? B = G.buffer.first() : B = G.buffer.concat(G.length), G.buffer.clear()) : B = G.buffer.consume(M, G.decoder), B;
  }
  function J(M) {
    var G = M._readableState;
    b("endReadable", G.endEmitted), G.endEmitted || (G.ended = !0, MA.nextTick(z, G, M));
  }
  function z(M, G) {
    if (b("endReadableNT", M.endEmitted, M.length), !M.endEmitted && M.length === 0 && (M.endEmitted = !0, G.readable = !1, G.emit("end"), M.autoDestroy)) {
      var B = G._writableState;
      (!B || B.autoDestroy && B.finished) && G.destroy();
    }
  }
  typeof Symbol == "function" && (q.from = function(M, G) {
    return F === void 0 && (F = Sg()), F(q, M, G);
  });
  function pA(M, G) {
    for (var B = 0, eA = M.length; B < eA; B++) if (M[B] === G) return B;
    return -1;
  }
})), Ul = /* @__PURE__ */ FA(((A, i) => {
  i.exports = U;
  var n = gr().codes, c = n.ERR_METHOD_NOT_IMPLEMENTED, h = n.ERR_MULTIPLE_CALLBACK, f = n.ERR_TRANSFORM_ALREADY_TRANSFORMING, a = n.ERR_TRANSFORM_WITH_LENGTH_0, o = ur();
  vt()(U, o);
  function d(_, C) {
    var m = this._transformState;
    m.transforming = !1;
    var w = m.writecb;
    if (w === null) return this.emit("error", new h());
    m.writechunk = null, m.writecb = null, C != null && this.push(C), w(_);
    var I = this._readableState;
    I.reading = !1, (I.needReadable || I.length < I.highWaterMark) && this._read(I.highWaterMark);
  }
  function U(_) {
    if (!(this instanceof U)) return new U(_);
    o.call(this, _), this._transformState = {
      afterTransform: d.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, _ && (typeof _.transform == "function" && (this._transform = _.transform), typeof _.flush == "function" && (this._flush = _.flush)), this.on("prefinish", b);
  }
  function b() {
    var _ = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(C, m) {
      v(_, C, m);
    }) : v(this, null, null);
  }
  U.prototype.push = function(_, C) {
    return this._transformState.needTransform = !1, o.prototype.push.call(this, _, C);
  }, U.prototype._transform = function(_, C, m) {
    m(new c("_transform()"));
  }, U.prototype._write = function(_, C, m) {
    var w = this._transformState;
    if (w.writecb = m, w.writechunk = _, w.writeencoding = C, !w.transforming) {
      var I = this._readableState;
      (w.needTransform || I.needReadable || I.length < I.highWaterMark) && this._read(I.highWaterMark);
    }
  }, U.prototype._read = function(_) {
    var C = this._transformState;
    C.writechunk !== null && !C.transforming ? (C.transforming = !0, this._transform(C.writechunk, C.writeencoding, C.afterTransform)) : C.needTransform = !0;
  }, U.prototype._destroy = function(_, C) {
    o.prototype._destroy.call(this, _, function(m) {
      C(m);
    });
  };
  function v(_, C, m) {
    if (C) return _.emit("error", C);
    if (m != null && _.push(m), _._writableState.length) throw new a();
    if (_._transformState.transforming) throw new f();
    return _.push(null);
  }
})), Hg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = c;
  var n = Ul();
  vt()(c, n);
  function c(h) {
    if (!(this instanceof c)) return new c(h);
    n.call(this, h);
  }
  c.prototype._transform = function(h, f, a) {
    a(null, h);
  };
})), Lg = /* @__PURE__ */ FA(((A, i) => {
  var n;
  function c(m) {
    var w = !1;
    return function() {
      w || (w = !0, m.apply(void 0, arguments));
    };
  }
  var h = gr().codes, f = h.ERR_MISSING_ARGS, a = h.ERR_STREAM_DESTROYED;
  function o(m) {
    if (m) throw m;
  }
  function d(m) {
    return m.setHeader && typeof m.abort == "function";
  }
  function U(m, w, I, T) {
    T = c(T);
    var x = !1;
    m.on("close", function() {
      x = !0;
    }), n === void 0 && (n = Cs()), n(m, {
      readable: w,
      writable: I
    }, function(O) {
      if (O) return T(O);
      x = !0, T();
    });
    var N = !1;
    return function(O) {
      if (!x && !N) {
        if (N = !0, d(m)) return m.abort();
        if (typeof m.destroy == "function") return m.destroy();
        T(O || new a("pipe"));
      }
    };
  }
  function b(m) {
    m();
  }
  function v(m, w) {
    return m.pipe(w);
  }
  function _(m) {
    return !m.length || typeof m[m.length - 1] != "function" ? o : m.pop();
  }
  function C() {
    for (var m = arguments.length, w = new Array(m), I = 0; I < m; I++) w[I] = arguments[I];
    var T = _(w);
    if (Array.isArray(w[0]) && (w = w[0]), w.length < 2) throw new f("streams");
    var x, N = w.map(function(O, F) {
      var g = F < w.length - 1;
      return U(O, g, F > 0, function(R) {
        x || (x = R), R && N.forEach(b), !g && (N.forEach(b), T(x));
      });
    });
    return w.reduce(v);
  }
  i.exports = C;
})), Fs = /* @__PURE__ */ FA(((A, i) => {
  i.exports = c;
  var n = ws().EventEmitter;
  vt()(c, n), c.Readable = Ql(), c.Writable = El(), c.Duplex = ur(), c.Transform = Ul(), c.PassThrough = Hg(), c.finished = Cs(), c.pipeline = Lg(), c.Stream = c;
  function c() {
    n.call(this);
  }
  c.prototype.pipe = function(h, f) {
    var a = this;
    function o(m) {
      h.writable && h.write(m) === !1 && a.pause && a.pause();
    }
    a.on("data", o);
    function d() {
      a.readable && a.resume && a.resume();
    }
    h.on("drain", d), !h._isStdio && (!f || f.end !== !1) && (a.on("end", b), a.on("close", v));
    var U = !1;
    function b() {
      U || (U = !0, h.end());
    }
    function v() {
      U || (U = !0, typeof h.destroy == "function" && h.destroy());
    }
    function _(m) {
      if (C(), n.listenerCount(this, "error") === 0) throw m;
    }
    a.on("error", _), h.on("error", _);
    function C() {
      a.removeListener("data", o), h.removeListener("drain", d), a.removeListener("end", b), a.removeListener("close", v), a.removeListener("error", _), h.removeListener("error", _), a.removeListener("end", C), a.removeListener("close", C), h.removeListener("close", C);
    }
    return a.on("end", C), a.on("close", C), h.on("close", C), h.emit("pipe", a), h;
  };
})), Dg = /* @__PURE__ */ FA(((A) => {
  (function(i) {
    i.parser = function(H, y) {
      return new c(H, y);
    }, i.SAXParser = c, i.SAXStream = b, i.createStream = U, i.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
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
    i.EVENTS = [
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
    function c(H, y) {
      if (!(this instanceof c)) return new c(H, y);
      var J = this;
      f(J), J.q = J.c = "", J.bufferCheckPosition = i.MAX_BUFFER_LENGTH, J.opt = y || {}, J.opt.lowercase = J.opt.lowercase || J.opt.lowercasetags, J.looseCase = J.opt.lowercase ? "toLowerCase" : "toUpperCase", J.tags = [], J.closed = J.closedRoot = J.sawRoot = !1, J.tag = J.error = null, J.strict = !!H, J.noscript = !!(H || J.opt.noscript), J.state = E.BEGIN, J.strictEntities = J.opt.strictEntities, J.ENTITIES = J.strictEntities ? Object.create(i.XML_ENTITIES) : Object.create(i.ENTITIES), J.attribList = [], J.opt.xmlns && (J.ns = Object.create(w)), J.trackPosition = J.opt.position !== !1, J.trackPosition && (J.position = J.line = J.column = 0), lA(J, "onready");
    }
    Object.create || (Object.create = function(H) {
      function y() {
      }
      return y.prototype = H, new y();
    }), Object.keys || (Object.keys = function(H) {
      var y = [];
      for (var J in H) H.hasOwnProperty(J) && y.push(J);
      return y;
    });
    function h(H) {
      for (var y = Math.max(i.MAX_BUFFER_LENGTH, 10), J = 0, z = 0, pA = n.length; z < pA; z++) {
        var M = H[n[z]].length;
        if (M > y) switch (n[z]) {
          case "textNode":
            Z(H);
            break;
          case "cdata":
            k(H, "oncdata", H.cdata), H.cdata = "";
            break;
          case "script":
            k(H, "onscript", H.script), H.script = "";
            break;
          default:
            $(H, "Max buffer length exceeded: " + n[z]);
        }
        J = Math.max(J, M);
      }
      H.bufferCheckPosition = i.MAX_BUFFER_LENGTH - J + H.position;
    }
    function f(H) {
      for (var y = 0, J = n.length; y < J; y++) H[n[y]] = "";
    }
    function a(H) {
      Z(H), H.cdata !== "" && (k(H, "oncdata", H.cdata), H.cdata = ""), H.script !== "" && (k(H, "onscript", H.script), H.script = "");
    }
    c.prototype = {
      end: function() {
        uA(this);
      },
      write: _A,
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
      o = Fs().Stream;
    } catch {
      o = function() {
      };
    }
    var d = i.EVENTS.filter(function(H) {
      return H !== "error" && H !== "end";
    });
    function U(H, y) {
      return new b(H, y);
    }
    function b(H, y) {
      if (!(this instanceof b)) return new b(H, y);
      o.apply(this), this._parser = new c(H, y), this.writable = !0, this.readable = !0;
      var J = this;
      this._parser.onend = function() {
        J.emit("end");
      }, this._parser.onerror = function(z) {
        J.emit("error", z), J._parser.error = null;
      }, this._decoder = null, d.forEach(function(z) {
        Object.defineProperty(J, "on" + z, {
          get: function() {
            return J._parser["on" + z];
          },
          set: function(pA) {
            if (!pA)
              return J.removeAllListeners(z), J._parser["on" + z] = pA, pA;
            J.on(z, pA);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    b.prototype = Object.create(o.prototype, { constructor: { value: b } }), b.prototype.write = function(H) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(H)) {
        if (!this._decoder) {
          var y = os().StringDecoder;
          this._decoder = new y("utf8");
        }
        H = this._decoder.write(H);
      }
      return this._parser.write(H.toString()), this.emit("data", H), !0;
    }, b.prototype.end = function(H) {
      return H && H.length && this.write(H), this._parser.end(), !0;
    }, b.prototype.on = function(H, y) {
      var J = this;
      return !J._parser["on" + H] && d.indexOf(H) !== -1 && (J._parser["on" + H] = function() {
        var z = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        z.splice(0, 0, H), J.emit.apply(J, z);
      }), o.prototype.on.call(J, H, y);
    };
    var v = "[CDATA[", _ = "DOCTYPE", C = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", w = {
      xml: C,
      xmlns: m
    }, I = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function O(H) {
      return H === " " || H === `
` || H === "\r" || H === "	";
    }
    function F(H) {
      return H === '"' || H === "'";
    }
    function g(H) {
      return H === ">" || O(H);
    }
    function R(H, y) {
      return H.test(y);
    }
    function V(H, y) {
      return !R(H, y);
    }
    var E = 0;
    i.STATE = {
      BEGIN: E++,
      BEGIN_WHITESPACE: E++,
      TEXT: E++,
      TEXT_ENTITY: E++,
      OPEN_WAKA: E++,
      SGML_DECL: E++,
      SGML_DECL_QUOTED: E++,
      DOCTYPE: E++,
      DOCTYPE_QUOTED: E++,
      DOCTYPE_DTD: E++,
      DOCTYPE_DTD_QUOTED: E++,
      COMMENT_STARTING: E++,
      COMMENT: E++,
      COMMENT_ENDING: E++,
      COMMENT_ENDED: E++,
      CDATA: E++,
      CDATA_ENDING: E++,
      CDATA_ENDING_2: E++,
      PROC_INST: E++,
      PROC_INST_BODY: E++,
      PROC_INST_ENDING: E++,
      OPEN_TAG: E++,
      OPEN_TAG_SLASH: E++,
      ATTRIB: E++,
      ATTRIB_NAME: E++,
      ATTRIB_NAME_SAW_WHITE: E++,
      ATTRIB_VALUE: E++,
      ATTRIB_VALUE_QUOTED: E++,
      ATTRIB_VALUE_CLOSED: E++,
      ATTRIB_VALUE_UNQUOTED: E++,
      ATTRIB_VALUE_ENTITY_Q: E++,
      ATTRIB_VALUE_ENTITY_U: E++,
      CLOSE_TAG: E++,
      CLOSE_TAG_SAW_WHITE: E++,
      SCRIPT: E++,
      SCRIPT_ENDING: E++
    }, i.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, i.ENTITIES = {
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
    }, Object.keys(i.ENTITIES).forEach(function(H) {
      var y = i.ENTITIES[H], J = typeof y == "number" ? String.fromCharCode(y) : y;
      i.ENTITIES[H] = J;
    });
    for (var q in i.STATE) i.STATE[i.STATE[q]] = q;
    E = i.STATE;
    function lA(H, y, J) {
      H[y] && H[y](J);
    }
    function k(H, y, J) {
      H.textNode && Z(H), lA(H, y, J);
    }
    function Z(H) {
      H.textNode = L(H.opt, H.textNode), H.textNode && lA(H, "ontext", H.textNode), H.textNode = "";
    }
    function L(H, y) {
      return H.trim && (y = y.trim()), H.normalize && (y = y.replace(/\s+/g, " ")), y;
    }
    function $(H, y) {
      return Z(H), H.trackPosition && (y += `
Line: ` + H.line + `
Column: ` + H.column + `
Char: ` + H.c), y = new Error(y), H.error = y, lA(H, "onerror", y), H;
    }
    function uA(H) {
      return H.sawRoot && !H.closedRoot && rA(H, "Unclosed root tag"), H.state !== E.BEGIN && H.state !== E.BEGIN_WHITESPACE && H.state !== E.TEXT && $(H, "Unexpected end"), Z(H), H.c = "", H.closed = !0, lA(H, "onend"), c.call(H, H.strict, H.opt), H;
    }
    function rA(H, y) {
      if (typeof H != "object" || !(H instanceof c)) throw new Error("bad call to strictFail");
      H.strict && $(H, y);
    }
    function vA(H) {
      H.strict || (H.tagName = H.tagName[H.looseCase]());
      var y = H.tags[H.tags.length - 1] || H, J = H.tag = {
        name: H.tagName,
        attributes: {}
      };
      H.opt.xmlns && (J.ns = y.ns), H.attribList.length = 0, k(H, "onopentagstart", J);
    }
    function sA(H, y) {
      var J = H.indexOf(":") < 0 ? ["", H] : H.split(":"), z = J[0], pA = J[1];
      return y && H === "xmlns" && (z = "xmlns", pA = ""), {
        prefix: z,
        local: pA
      };
    }
    function dA(H) {
      if (H.strict || (H.attribName = H.attribName[H.looseCase]()), H.attribList.indexOf(H.attribName) !== -1 || H.tag.attributes.hasOwnProperty(H.attribName)) {
        H.attribName = H.attribValue = "";
        return;
      }
      if (H.opt.xmlns) {
        var y = sA(H.attribName, !0), J = y.prefix, z = y.local;
        if (J === "xmlns") if (z === "xml" && H.attribValue !== C) rA(H, "xml: prefix must be bound to " + C + `
Actual: ` + H.attribValue);
        else if (z === "xmlns" && H.attribValue !== m) rA(H, "xmlns: prefix must be bound to " + m + `
Actual: ` + H.attribValue);
        else {
          var pA = H.tag, M = H.tags[H.tags.length - 1] || H;
          pA.ns === M.ns && (pA.ns = Object.create(M.ns)), pA.ns[z] = H.attribValue;
        }
        H.attribList.push([H.attribName, H.attribValue]);
      } else
        H.tag.attributes[H.attribName] = H.attribValue, k(H, "onattribute", {
          name: H.attribName,
          value: H.attribValue
        });
      H.attribName = H.attribValue = "";
    }
    function tA(H, y) {
      if (H.opt.xmlns) {
        var J = H.tag, z = sA(H.tagName);
        J.prefix = z.prefix, J.local = z.local, J.uri = J.ns[z.prefix] || "", J.prefix && !J.uri && (rA(H, "Unbound namespace prefix: " + JSON.stringify(H.tagName)), J.uri = z.prefix);
        var pA = H.tags[H.tags.length - 1] || H;
        J.ns && pA.ns !== J.ns && Object.keys(J.ns).forEach(function(Y) {
          k(H, "onopennamespace", {
            prefix: Y,
            uri: J.ns[Y]
          });
        });
        for (var M = 0, G = H.attribList.length; M < G; M++) {
          var B = H.attribList[M], eA = B[0], D = B[1], l = sA(eA, !0), u = l.prefix, Q = l.local, j = u === "" ? "" : J.ns[u] || "", AA = {
            name: eA,
            value: D,
            prefix: u,
            local: Q,
            uri: j
          };
          u && u !== "xmlns" && !j && (rA(H, "Unbound namespace prefix: " + JSON.stringify(u)), AA.uri = u), H.tag.attributes[eA] = AA, k(H, "onattribute", AA);
        }
        H.attribList.length = 0;
      }
      H.tag.isSelfClosing = !!y, H.sawRoot = !0, H.tags.push(H.tag), k(H, "onopentag", H.tag), y || (!H.noscript && H.tagName.toLowerCase() === "script" ? H.state = E.SCRIPT : H.state = E.TEXT, H.tag = null, H.tagName = ""), H.attribName = H.attribValue = "", H.attribList.length = 0;
    }
    function P(H) {
      if (!H.tagName) {
        rA(H, "Weird empty close tag."), H.textNode += "</>", H.state = E.TEXT;
        return;
      }
      if (H.script) {
        if (H.tagName !== "script") {
          H.script += "</" + H.tagName + ">", H.tagName = "", H.state = E.SCRIPT;
          return;
        }
        k(H, "onscript", H.script), H.script = "";
      }
      var y = H.tags.length, J = H.tagName;
      H.strict || (J = J[H.looseCase]());
      for (var z = J; y-- && H.tags[y].name !== z; ) rA(H, "Unexpected close tag");
      if (y < 0) {
        rA(H, "Unmatched closing tag: " + H.tagName), H.textNode += "</" + H.tagName + ">", H.state = E.TEXT;
        return;
      }
      H.tagName = J;
      for (var pA = H.tags.length; pA-- > y; ) {
        var M = H.tag = H.tags.pop();
        H.tagName = H.tag.name, k(H, "onclosetag", H.tagName);
        var G = {};
        for (var B in M.ns) G[B] = M.ns[B];
        var eA = H.tags[H.tags.length - 1] || H;
        H.opt.xmlns && M.ns !== eA.ns && Object.keys(M.ns).forEach(function(D) {
          var l = M.ns[D];
          k(H, "onclosenamespace", {
            prefix: D,
            uri: l
          });
        });
      }
      y === 0 && (H.closedRoot = !0), H.tagName = H.attribValue = H.attribName = "", H.attribList.length = 0, H.state = E.TEXT;
    }
    function iA(H) {
      var y = H.entity, J = y.toLowerCase(), z, pA = "";
      return H.ENTITIES[y] ? H.ENTITIES[y] : H.ENTITIES[J] ? H.ENTITIES[J] : (y = J, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), z = parseInt(y, 16), pA = z.toString(16)) : (y = y.slice(1), z = parseInt(y, 10), pA = z.toString(10))), y = y.replace(/^0+/, ""), isNaN(z) || pA.toLowerCase() !== y ? (rA(H, "Invalid character entity"), "&" + H.entity + ";") : String.fromCodePoint(z));
    }
    function aA(H, y) {
      y === "<" ? (H.state = E.OPEN_WAKA, H.startTagPosition = H.position) : O(y) || (rA(H, "Non-whitespace before first tag."), H.textNode = y, H.state = E.TEXT);
    }
    function fA(H, y) {
      var J = "";
      return y < H.length && (J = H.charAt(y)), J;
    }
    function _A(H) {
      var y = this;
      if (this.error) throw this.error;
      if (y.closed) return $(y, "Cannot write after close. Assign an onready handler.");
      if (H === null) return uA(y);
      typeof H == "object" && (H = H.toString());
      for (var J = 0, z = ""; z = fA(H, J++), y.c = z, !!z; )
        switch (y.trackPosition && (y.position++, z === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
          case E.BEGIN:
            if (y.state = E.BEGIN_WHITESPACE, z === "\uFEFF") continue;
            aA(y, z);
            continue;
          case E.BEGIN_WHITESPACE:
            aA(y, z);
            continue;
          case E.TEXT:
            if (y.sawRoot && !y.closedRoot) {
              for (var pA = J - 1; z && z !== "<" && z !== "&"; )
                z = fA(H, J++), z && y.trackPosition && (y.position++, z === `
` ? (y.line++, y.column = 0) : y.column++);
              y.textNode += H.substring(pA, J - 1);
            }
            z === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = E.OPEN_WAKA, y.startTagPosition = y.position) : (!O(z) && (!y.sawRoot || y.closedRoot) && rA(y, "Text data outside of root node."), z === "&" ? y.state = E.TEXT_ENTITY : y.textNode += z);
            continue;
          case E.SCRIPT:
            z === "<" ? y.state = E.SCRIPT_ENDING : y.script += z;
            continue;
          case E.SCRIPT_ENDING:
            z === "/" ? y.state = E.CLOSE_TAG : (y.script += "<" + z, y.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (z === "!")
              y.state = E.SGML_DECL, y.sgmlDecl = "";
            else if (!O(z))
              if (R(I, z))
                y.state = E.OPEN_TAG, y.tagName = z;
              else if (z === "/")
                y.state = E.CLOSE_TAG, y.tagName = "";
              else if (z === "?")
                y.state = E.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (rA(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var M = y.position - y.startTagPosition;
                  z = new Array(M).join(" ") + z;
                }
                y.textNode += "<" + z, y.state = E.TEXT;
              }
            continue;
          case E.SGML_DECL:
            (y.sgmlDecl + z).toUpperCase() === v ? (k(y, "onopencdata"), y.state = E.CDATA, y.sgmlDecl = "", y.cdata = "") : y.sgmlDecl + z === "--" ? (y.state = E.COMMENT, y.comment = "", y.sgmlDecl = "") : (y.sgmlDecl + z).toUpperCase() === _ ? (y.state = E.DOCTYPE, (y.doctype || y.sawRoot) && rA(y, "Inappropriately located doctype declaration"), y.doctype = "", y.sgmlDecl = "") : z === ">" ? (k(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = E.TEXT) : (F(z) && (y.state = E.SGML_DECL_QUOTED), y.sgmlDecl += z);
            continue;
          case E.SGML_DECL_QUOTED:
            z === y.q && (y.state = E.SGML_DECL, y.q = ""), y.sgmlDecl += z;
            continue;
          case E.DOCTYPE:
            z === ">" ? (y.state = E.TEXT, k(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += z, z === "[" ? y.state = E.DOCTYPE_DTD : F(z) && (y.state = E.DOCTYPE_QUOTED, y.q = z));
            continue;
          case E.DOCTYPE_QUOTED:
            y.doctype += z, z === y.q && (y.q = "", y.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            y.doctype += z, z === "]" ? y.state = E.DOCTYPE : F(z) && (y.state = E.DOCTYPE_DTD_QUOTED, y.q = z);
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            y.doctype += z, z === y.q && (y.state = E.DOCTYPE_DTD, y.q = "");
            continue;
          case E.COMMENT:
            z === "-" ? y.state = E.COMMENT_ENDING : y.comment += z;
            continue;
          case E.COMMENT_ENDING:
            z === "-" ? (y.state = E.COMMENT_ENDED, y.comment = L(y.opt, y.comment), y.comment && k(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + z, y.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            z !== ">" ? (rA(y, "Malformed comment"), y.comment += "--" + z, y.state = E.COMMENT) : y.state = E.TEXT;
            continue;
          case E.CDATA:
            z === "]" ? y.state = E.CDATA_ENDING : y.cdata += z;
            continue;
          case E.CDATA_ENDING:
            z === "]" ? y.state = E.CDATA_ENDING_2 : (y.cdata += "]" + z, y.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            z === ">" ? (y.cdata && k(y, "oncdata", y.cdata), k(y, "onclosecdata"), y.cdata = "", y.state = E.TEXT) : z === "]" ? y.cdata += "]" : (y.cdata += "]]" + z, y.state = E.CDATA);
            continue;
          case E.PROC_INST:
            z === "?" ? y.state = E.PROC_INST_ENDING : O(z) ? y.state = E.PROC_INST_BODY : y.procInstName += z;
            continue;
          case E.PROC_INST_BODY:
            if (!y.procInstBody && O(z)) continue;
            z === "?" ? y.state = E.PROC_INST_ENDING : y.procInstBody += z;
            continue;
          case E.PROC_INST_ENDING:
            z === ">" ? (k(y, "onprocessinginstruction", {
              name: y.procInstName,
              body: y.procInstBody
            }), y.procInstName = y.procInstBody = "", y.state = E.TEXT) : (y.procInstBody += "?" + z, y.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            R(T, z) ? y.tagName += z : (vA(y), z === ">" ? tA(y) : z === "/" ? y.state = E.OPEN_TAG_SLASH : (O(z) || rA(y, "Invalid character in tag name"), y.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            z === ">" ? (tA(y, !0), P(y)) : (rA(y, "Forward-slash in opening tag not followed by >"), y.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (O(z)) continue;
            z === ">" ? tA(y) : z === "/" ? y.state = E.OPEN_TAG_SLASH : R(I, z) ? (y.attribName = z, y.attribValue = "", y.state = E.ATTRIB_NAME) : rA(y, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            z === "=" ? y.state = E.ATTRIB_VALUE : z === ">" ? (rA(y, "Attribute without value"), y.attribValue = y.attribName, dA(y), tA(y)) : O(z) ? y.state = E.ATTRIB_NAME_SAW_WHITE : R(T, z) ? y.attribName += z : rA(y, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (z === "=") y.state = E.ATTRIB_VALUE;
            else {
              if (O(z)) continue;
              rA(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", k(y, "onattribute", {
                name: y.attribName,
                value: ""
              }), y.attribName = "", z === ">" ? tA(y) : R(I, z) ? (y.attribName = z, y.state = E.ATTRIB_NAME) : (rA(y, "Invalid attribute name"), y.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (O(z)) continue;
            F(z) ? (y.q = z, y.state = E.ATTRIB_VALUE_QUOTED) : (rA(y, "Unquoted attribute value"), y.state = E.ATTRIB_VALUE_UNQUOTED, y.attribValue = z);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (z !== y.q) {
              z === "&" ? y.state = E.ATTRIB_VALUE_ENTITY_Q : y.attribValue += z;
              continue;
            }
            dA(y), y.q = "", y.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            O(z) ? y.state = E.ATTRIB : z === ">" ? tA(y) : z === "/" ? y.state = E.OPEN_TAG_SLASH : R(I, z) ? (rA(y, "No whitespace between attributes"), y.attribName = z, y.attribValue = "", y.state = E.ATTRIB_NAME) : rA(y, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!g(z)) {
              z === "&" ? y.state = E.ATTRIB_VALUE_ENTITY_U : y.attribValue += z;
              continue;
            }
            dA(y), z === ">" ? tA(y) : y.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (y.tagName) z === ">" ? P(y) : R(T, z) ? y.tagName += z : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = E.SCRIPT) : (O(z) || rA(y, "Invalid tagname in closing tag"), y.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (O(z)) continue;
              V(I, z) ? y.script ? (y.script += "</" + z, y.state = E.SCRIPT) : rA(y, "Invalid tagname in closing tag.") : y.tagName = z;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (O(z)) continue;
            z === ">" ? P(y) : rA(y, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var G, B;
            switch (y.state) {
              case E.TEXT_ENTITY:
                G = E.TEXT, B = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                G = E.ATTRIB_VALUE_QUOTED, B = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                G = E.ATTRIB_VALUE_UNQUOTED, B = "attribValue";
                break;
            }
            z === ";" ? (y[B] += iA(y), y.entity = "", y.state = G) : R(y.entity.length ? N : x, z) ? y.entity += z : (rA(y, "Invalid character in entity name"), y[B] += "&" + y.entity + z, y.entity = "", y.state = G);
            continue;
          default:
            throw new Error(y, "Unknown state: " + y.state);
        }
      return y.position >= y.bufferCheckPosition && h(y), y;
    }
    String.fromCodePoint || (function() {
      var H = String.fromCharCode, y = Math.floor, J = function() {
        var z = 16384, pA = [], M, G, B = -1, eA = arguments.length;
        if (!eA) return "";
        for (var D = ""; ++B < eA; ) {
          var l = Number(arguments[B]);
          if (!isFinite(l) || l < 0 || l > 1114111 || y(l) !== l) throw RangeError("Invalid code point: " + l);
          l <= 65535 ? pA.push(l) : (l -= 65536, M = (l >> 10) + 55296, G = l % 1024 + 56320, pA.push(M, G)), (B + 1 === eA || pA.length > z) && (D += H.apply(null, pA), pA.length = 0);
        }
        return D;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: J,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = J;
    })();
  })(typeof A > "u" ? A.sax = {} : A);
})), Es = /* @__PURE__ */ FA(((A, i) => {
  i.exports = { isArray: function(n) {
    return Array.isArray ? Array.isArray(n) : Object.prototype.toString.call(n) === "[object Array]";
  } };
})), Qs = /* @__PURE__ */ FA(((A, i) => {
  var n = Es().isArray;
  i.exports = {
    copyOptions: function(c) {
      var h, f = {};
      for (h in c) c.hasOwnProperty(h) && (f[h] = c[h]);
      return f;
    },
    ensureFlagExists: function(c, h) {
      (!(c in h) || typeof h[c] != "boolean") && (h[c] = !1);
    },
    ensureSpacesExists: function(c) {
      (!("spaces" in c) || typeof c.spaces != "number" && typeof c.spaces != "string") && (c.spaces = 0);
    },
    ensureAlwaysArrayExists: function(c) {
      (!("alwaysArray" in c) || typeof c.alwaysArray != "boolean" && !n(c.alwaysArray)) && (c.alwaysArray = !1);
    },
    ensureKeyExists: function(c, h) {
      (!(c + "Key" in h) || typeof h[c + "Key"] != "string") && (h[c + "Key"] = h.compact ? "_" + c : c);
    },
    checkFnExists: function(c, h) {
      return c + "Fn" in h;
    }
  };
})), bl = /* @__PURE__ */ FA(((A, i) => {
  var n = Dg(), c = {
    on: function() {
    },
    parse: function() {
    }
  }, h = Qs(), f = Es().isArray, a, o = !0, d;
  function U(F) {
    return a = h.copyOptions(F), h.ensureFlagExists("ignoreDeclaration", a), h.ensureFlagExists("ignoreInstruction", a), h.ensureFlagExists("ignoreAttributes", a), h.ensureFlagExists("ignoreText", a), h.ensureFlagExists("ignoreComment", a), h.ensureFlagExists("ignoreCdata", a), h.ensureFlagExists("ignoreDoctype", a), h.ensureFlagExists("compact", a), h.ensureFlagExists("alwaysChildren", a), h.ensureFlagExists("addParent", a), h.ensureFlagExists("trim", a), h.ensureFlagExists("nativeType", a), h.ensureFlagExists("nativeTypeAttributes", a), h.ensureFlagExists("sanitize", a), h.ensureFlagExists("instructionHasAttributes", a), h.ensureFlagExists("captureSpacesBetweenElements", a), h.ensureAlwaysArrayExists(a), h.ensureKeyExists("declaration", a), h.ensureKeyExists("instruction", a), h.ensureKeyExists("attributes", a), h.ensureKeyExists("text", a), h.ensureKeyExists("comment", a), h.ensureKeyExists("cdata", a), h.ensureKeyExists("doctype", a), h.ensureKeyExists("type", a), h.ensureKeyExists("name", a), h.ensureKeyExists("elements", a), h.ensureKeyExists("parent", a), h.checkFnExists("doctype", a), h.checkFnExists("instruction", a), h.checkFnExists("cdata", a), h.checkFnExists("comment", a), h.checkFnExists("text", a), h.checkFnExists("instructionName", a), h.checkFnExists("elementName", a), h.checkFnExists("attributeName", a), h.checkFnExists("attributeValue", a), h.checkFnExists("attributes", a), a;
  }
  function b(F) {
    var g = Number(F);
    if (!isNaN(g)) return g;
    var R = F.toLowerCase();
    return R === "true" ? !0 : R === "false" ? !1 : F;
  }
  function v(F, g) {
    var R;
    if (a.compact) {
      if (!d[a[F + "Key"]] && (f(a.alwaysArray) ? a.alwaysArray.indexOf(a[F + "Key"]) !== -1 : a.alwaysArray) && (d[a[F + "Key"]] = []), d[a[F + "Key"]] && !f(d[a[F + "Key"]]) && (d[a[F + "Key"]] = [d[a[F + "Key"]]]), F + "Fn" in a && typeof g == "string" && (g = a[F + "Fn"](g, d)), F === "instruction" && ("instructionFn" in a || "instructionNameFn" in a)) {
        for (R in g) if (g.hasOwnProperty(R)) if ("instructionFn" in a) g[R] = a.instructionFn(g[R], R, d);
        else {
          var V = g[R];
          delete g[R], g[a.instructionNameFn(R, V, d)] = V;
        }
      }
      f(d[a[F + "Key"]]) ? d[a[F + "Key"]].push(g) : d[a[F + "Key"]] = g;
    } else {
      d[a.elementsKey] || (d[a.elementsKey] = []);
      var E = {};
      if (E[a.typeKey] = F, F === "instruction") {
        for (R in g) if (g.hasOwnProperty(R)) break;
        E[a.nameKey] = "instructionNameFn" in a ? a.instructionNameFn(R, g, d) : R, a.instructionHasAttributes ? (E[a.attributesKey] = g[R][a.attributesKey], "instructionFn" in a && (E[a.attributesKey] = a.instructionFn(E[a.attributesKey], R, d))) : ("instructionFn" in a && (g[R] = a.instructionFn(g[R], R, d)), E[a.instructionKey] = g[R]);
      } else
        F + "Fn" in a && (g = a[F + "Fn"](g, d)), E[a[F + "Key"]] = g;
      a.addParent && (E[a.parentKey] = d), d[a.elementsKey].push(E);
    }
  }
  function _(F) {
    if ("attributesFn" in a && F && (F = a.attributesFn(F, d)), (a.trim || "attributeValueFn" in a || "attributeNameFn" in a || a.nativeTypeAttributes) && F) {
      var g;
      for (g in F) if (F.hasOwnProperty(g) && (a.trim && (F[g] = F[g].trim()), a.nativeTypeAttributes && (F[g] = b(F[g])), "attributeValueFn" in a && (F[g] = a.attributeValueFn(F[g], g, d)), "attributeNameFn" in a)) {
        var R = F[g];
        delete F[g], F[a.attributeNameFn(g, F[g], d)] = R;
      }
    }
    return F;
  }
  function C(F) {
    var g = {};
    if (F.body && (F.name.toLowerCase() === "xml" || a.instructionHasAttributes)) {
      for (var R = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, V; (V = R.exec(F.body)) !== null; ) g[V[1]] = V[2] || V[3] || V[4];
      g = _(g);
    }
    if (F.name.toLowerCase() === "xml") {
      if (a.ignoreDeclaration) return;
      d[a.declarationKey] = {}, Object.keys(g).length && (d[a.declarationKey][a.attributesKey] = g), a.addParent && (d[a.declarationKey][a.parentKey] = d);
    } else {
      if (a.ignoreInstruction) return;
      a.trim && (F.body = F.body.trim());
      var E = {};
      a.instructionHasAttributes && Object.keys(g).length ? (E[F.name] = {}, E[F.name][a.attributesKey] = g) : E[F.name] = F.body, v("instruction", E);
    }
  }
  function m(F, g) {
    var R;
    if (typeof F == "object" && (g = F.attributes, F = F.name), g = _(g), "elementNameFn" in a && (F = a.elementNameFn(F, d)), a.compact) {
      if (R = {}, !a.ignoreAttributes && g && Object.keys(g).length) {
        R[a.attributesKey] = {};
        var V;
        for (V in g) g.hasOwnProperty(V) && (R[a.attributesKey][V] = g[V]);
      }
      !(F in d) && (f(a.alwaysArray) ? a.alwaysArray.indexOf(F) !== -1 : a.alwaysArray) && (d[F] = []), d[F] && !f(d[F]) && (d[F] = [d[F]]), f(d[F]) ? d[F].push(R) : d[F] = R;
    } else
      d[a.elementsKey] || (d[a.elementsKey] = []), R = {}, R[a.typeKey] = "element", R[a.nameKey] = F, !a.ignoreAttributes && g && Object.keys(g).length && (R[a.attributesKey] = g), a.alwaysChildren && (R[a.elementsKey] = []), d[a.elementsKey].push(R);
    R[a.parentKey] = d, d = R;
  }
  function w(F) {
    a.ignoreText || !F.trim() && !a.captureSpacesBetweenElements || (a.trim && (F = F.trim()), a.nativeType && (F = b(F)), a.sanitize && (F = F.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), v("text", F));
  }
  function I(F) {
    a.ignoreComment || (a.trim && (F = F.trim()), v("comment", F));
  }
  function T(F) {
    var g = d[a.parentKey];
    a.addParent || delete d[a.parentKey], d = g;
  }
  function x(F) {
    a.ignoreCdata || (a.trim && (F = F.trim()), v("cdata", F));
  }
  function N(F) {
    a.ignoreDoctype || (F = F.replace(/^ /, ""), a.trim && (F = F.trim()), v("doctype", F));
  }
  function O(F) {
    F.note = F;
  }
  i.exports = function(F, g) {
    var R = o ? n.parser(!0, {}) : R = new c.Parser("UTF-8"), V = {};
    if (d = V, a = U(g), o ? (R.opt = { strictEntities: !0 }, R.onopentag = m, R.ontext = w, R.oncomment = I, R.onclosetag = T, R.onerror = O, R.oncdata = x, R.ondoctype = N, R.onprocessinginstruction = C) : (R.on("startElement", m), R.on("text", w), R.on("comment", I), R.on("endElement", T), R.on("error", O)), o) R.write(F).close();
    else if (!R.parse(F)) throw new Error("XML parsing error: " + R.getError());
    if (V[a.elementsKey]) {
      var E = V[a.elementsKey];
      delete V[a.elementsKey], V[a.elementsKey] = E, delete V.text;
    }
    return V;
  };
})), Rg = /* @__PURE__ */ FA(((A, i) => {
  var n = Qs(), c = bl();
  function h(f) {
    var a = n.copyOptions(f);
    return n.ensureSpacesExists(a), a;
  }
  i.exports = function(f, a) {
    var o = h(a), d = c(f, o), U, b = "compact" in o && o.compact ? "_parent" : "parent";
    return "addParent" in o && o.addParent ? U = JSON.stringify(d, function(v, _) {
      return v === b ? "_" : _;
    }, o.spaces) : U = JSON.stringify(d, null, o.spaces), U.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), Il = /* @__PURE__ */ FA(((A, i) => {
  var n = Qs(), c = Es().isArray, h, f;
  function a(F) {
    var g = n.copyOptions(F);
    return n.ensureFlagExists("ignoreDeclaration", g), n.ensureFlagExists("ignoreInstruction", g), n.ensureFlagExists("ignoreAttributes", g), n.ensureFlagExists("ignoreText", g), n.ensureFlagExists("ignoreComment", g), n.ensureFlagExists("ignoreCdata", g), n.ensureFlagExists("ignoreDoctype", g), n.ensureFlagExists("compact", g), n.ensureFlagExists("indentText", g), n.ensureFlagExists("indentCdata", g), n.ensureFlagExists("indentAttributes", g), n.ensureFlagExists("indentInstruction", g), n.ensureFlagExists("fullTagEmptyElement", g), n.ensureFlagExists("noQuotesForNativeAttributes", g), n.ensureSpacesExists(g), typeof g.spaces == "number" && (g.spaces = Array(g.spaces + 1).join(" ")), n.ensureKeyExists("declaration", g), n.ensureKeyExists("instruction", g), n.ensureKeyExists("attributes", g), n.ensureKeyExists("text", g), n.ensureKeyExists("comment", g), n.ensureKeyExists("cdata", g), n.ensureKeyExists("doctype", g), n.ensureKeyExists("type", g), n.ensureKeyExists("name", g), n.ensureKeyExists("elements", g), n.checkFnExists("doctype", g), n.checkFnExists("instruction", g), n.checkFnExists("cdata", g), n.checkFnExists("comment", g), n.checkFnExists("text", g), n.checkFnExists("instructionName", g), n.checkFnExists("elementName", g), n.checkFnExists("attributeName", g), n.checkFnExists("attributeValue", g), n.checkFnExists("attributes", g), n.checkFnExists("fullTagEmptyElement", g), g;
  }
  function o(F, g, R) {
    return (!R && F.spaces ? `
` : "") + Array(g + 1).join(F.spaces);
  }
  function d(F, g, R) {
    if (g.ignoreAttributes) return "";
    "attributesFn" in g && (F = g.attributesFn(F, f, h));
    var V, E, q, lA, k = [];
    for (V in F) F.hasOwnProperty(V) && F[V] !== null && F[V] !== void 0 && (lA = g.noQuotesForNativeAttributes && typeof F[V] != "string" ? "" : '"', E = "" + F[V], E = E.replace(/"/g, "&quot;"), q = "attributeNameFn" in g ? g.attributeNameFn(V, E, f, h) : V, k.push(g.spaces && g.indentAttributes ? o(g, R + 1, !1) : " "), k.push(q + "=" + lA + ("attributeValueFn" in g ? g.attributeValueFn(E, V, f, h) : E) + lA));
    return F && Object.keys(F).length && g.spaces && g.indentAttributes && k.push(o(g, R, !1)), k.join("");
  }
  function U(F, g, R) {
    return h = F, f = "xml", g.ignoreDeclaration ? "" : "<?xml" + d(F[g.attributesKey], g, R) + "?>";
  }
  function b(F, g, R) {
    if (g.ignoreInstruction) return "";
    var V;
    for (V in F) if (F.hasOwnProperty(V)) break;
    var E = "instructionNameFn" in g ? g.instructionNameFn(V, F[V], f, h) : V;
    if (typeof F[V] == "object")
      return h = F, f = E, "<?" + E + d(F[V][g.attributesKey], g, R) + "?>";
    var q = F[V] ? F[V] : "";
    return "instructionFn" in g && (q = g.instructionFn(q, V, f, h)), "<?" + E + (q ? " " + q : "") + "?>";
  }
  function v(F, g) {
    return g.ignoreComment ? "" : "<!--" + ("commentFn" in g ? g.commentFn(F, f, h) : F) + "-->";
  }
  function _(F, g) {
    return g.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in g ? g.cdataFn(F, f, h) : F.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function C(F, g) {
    return g.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in g ? g.doctypeFn(F, f, h) : F) + ">";
  }
  function m(F, g) {
    return g.ignoreText ? "" : (F = "" + F, F = F.replace(/&amp;/g, "&"), F = F.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in g ? g.textFn(F, f, h) : F);
  }
  function w(F, g) {
    var R;
    if (F.elements && F.elements.length) for (R = 0; R < F.elements.length; ++R) switch (F.elements[R][g.typeKey]) {
      case "text":
        if (g.indentText) return !0;
        break;
      case "cdata":
        if (g.indentCdata) return !0;
        break;
      case "instruction":
        if (g.indentInstruction) return !0;
        break;
      case "doctype":
      case "comment":
      case "element":
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function I(F, g, R) {
    h = F, f = F.name;
    var V = [], E = "elementNameFn" in g ? g.elementNameFn(F.name, F) : F.name;
    V.push("<" + E), F[g.attributesKey] && V.push(d(F[g.attributesKey], g, R));
    var q = F[g.elementsKey] && F[g.elementsKey].length || F[g.attributesKey] && F[g.attributesKey]["xml:space"] === "preserve";
    return q || ("fullTagEmptyElementFn" in g ? q = g.fullTagEmptyElementFn(F.name, F) : q = g.fullTagEmptyElement), q ? (V.push(">"), F[g.elementsKey] && F[g.elementsKey].length && (V.push(T(F[g.elementsKey], g, R + 1)), h = F, f = F.name), V.push(g.spaces && w(F, g) ? `
` + Array(R + 1).join(g.spaces) : ""), V.push("</" + E + ">")) : V.push("/>"), V.join("");
  }
  function T(F, g, R, V) {
    return F.reduce(function(E, q) {
      var lA = o(g, R, V && !E);
      switch (q.type) {
        case "element":
          return E + lA + I(q, g, R);
        case "comment":
          return E + lA + v(q[g.commentKey], g);
        case "doctype":
          return E + lA + C(q[g.doctypeKey], g);
        case "cdata":
          return E + (g.indentCdata ? lA : "") + _(q[g.cdataKey], g);
        case "text":
          return E + (g.indentText ? lA : "") + m(q[g.textKey], g);
        case "instruction":
          var k = {};
          return k[q[g.nameKey]] = q[g.attributesKey] ? q : q[g.instructionKey], E + (g.indentInstruction ? lA : "") + b(k, g, R);
      }
    }, "");
  }
  function x(F, g, R) {
    var V;
    for (V in F) if (F.hasOwnProperty(V)) switch (V) {
      case g.parentKey:
      case g.attributesKey:
        break;
      case g.textKey:
        if (g.indentText || R) return !0;
        break;
      case g.cdataKey:
        if (g.indentCdata || R) return !0;
        break;
      case g.instructionKey:
        if (g.indentInstruction || R) return !0;
        break;
      case g.doctypeKey:
      case g.commentKey:
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function N(F, g, R, V, E) {
    h = F, f = g;
    var q = "elementNameFn" in R ? R.elementNameFn(g, F) : g;
    if (typeof F > "u" || F === null || F === "") return "fullTagEmptyElementFn" in R && R.fullTagEmptyElementFn(g, F) || R.fullTagEmptyElement ? "<" + q + "></" + q + ">" : "<" + q + "/>";
    var lA = [];
    if (g) {
      if (lA.push("<" + q), typeof F != "object")
        return lA.push(">" + m(F, R) + "</" + q + ">"), lA.join("");
      F[R.attributesKey] && lA.push(d(F[R.attributesKey], R, V));
      var k = x(F, R, !0) || F[R.attributesKey] && F[R.attributesKey]["xml:space"] === "preserve";
      if (k || ("fullTagEmptyElementFn" in R ? k = R.fullTagEmptyElementFn(g, F) : k = R.fullTagEmptyElement), k) lA.push(">");
      else
        return lA.push("/>"), lA.join("");
    }
    return lA.push(O(F, R, V + 1, !1)), h = F, f = g, g && lA.push((E ? o(R, V, !1) : "") + "</" + q + ">"), lA.join("");
  }
  function O(F, g, R, V) {
    var E, q, lA, k = [];
    for (q in F) if (F.hasOwnProperty(q))
      for (lA = c(F[q]) ? F[q] : [F[q]], E = 0; E < lA.length; ++E) {
        switch (q) {
          case g.declarationKey:
            k.push(U(lA[E], g, R));
            break;
          case g.instructionKey:
            k.push((g.indentInstruction ? o(g, R, V) : "") + b(lA[E], g, R));
            break;
          case g.attributesKey:
          case g.parentKey:
            break;
          case g.textKey:
            k.push((g.indentText ? o(g, R, V) : "") + m(lA[E], g));
            break;
          case g.cdataKey:
            k.push((g.indentCdata ? o(g, R, V) : "") + _(lA[E], g));
            break;
          case g.doctypeKey:
            k.push(o(g, R, V) + C(lA[E], g));
            break;
          case g.commentKey:
            k.push(o(g, R, V) + v(lA[E], g));
            break;
          default:
            k.push(o(g, R, V) + N(lA[E], q, g, R, x(lA[E], g)));
        }
        V = V && !k.length;
      }
    return k.join("");
  }
  i.exports = function(F, g) {
    g = a(g);
    var R = [];
    return h = F, f = "_root_", g.compact ? R.push(O(F, g, 0, !0)) : (F[g.declarationKey] && R.push(U(F[g.declarationKey], g, 0)), F[g.elementsKey] && F[g.elementsKey].length && R.push(T(F[g.elementsKey], g, 0, !R.length))), R.join("");
  };
})), Og = /* @__PURE__ */ FA(((A, i) => {
  var n = Il();
  i.exports = function(c, h) {
    c instanceof Buffer && (c = c.toString());
    var f = null;
    if (typeof c == "string") try {
      f = JSON.parse(c);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else f = c;
    return n(f, h);
  };
})), Yn = (/* @__PURE__ */ FA(((A, i) => {
  i.exports = {
    xml2js: bl(),
    xml2json: Rg(),
    js2xml: Il(),
    json2xml: Og()
  };
})))(), Us = (A) => {
  switch (A.type) {
    case void 0:
    case "element":
      const i = new kg(A.name, A.attributes), n = A.elements || [];
      for (const c of n) {
        const h = Us(c);
        h !== void 0 && i.push(h);
      }
      return i;
    case "text":
      return A.text;
    default:
      return;
  }
}, Ng = class extends NA {
}, kg = class extends mA {
  static fromXmlString(A) {
    return Us((0, Yn.xml2js)(A, { compact: !1 }));
  }
  constructor(A, i) {
    super(A), i && this.root.push(new Ng(i));
  }
  push(A) {
    this.root.push(A);
  }
}, Kg = class extends mA {
  constructor(A) {
    super(""), hA(this, "_attr", void 0), this._attr = A;
  }
  prepForXml(A) {
    return { _attr: this._attr };
  }
}, _l = class extends mA {
  constructor(A, i) {
    super(A), i && (this.root = i.root);
  }
}, pe = (A) => {
  if (isNaN(A)) throw new Error(`Invalid value '${A}' specified. Must be an integer.`);
  return Math.floor(A);
}, Zn = (A) => {
  const i = pe(A);
  if (i < 0) throw new Error(`Invalid value '${A}' specified. Must be a positive integer.`);
  return i;
}, xl = (A, i) => {
  const n = i * 2;
  if (A.length !== n || isNaN(+`0x${A}`)) throw new Error(`Invalid hex value '${A}'. Expected ${n} digit hex value`);
  return A;
}, xo = (A) => xl(A, 1), bs = (A) => {
  const i = A.slice(-2), n = A.substring(0, A.length - 2);
  return `${Number(n)}${i}`;
}, Tl = (A) => {
  const i = bs(A);
  if (parseFloat(i) < 0) throw new Error(`Invalid value '${i}' specified. Expected a positive number.`);
  return i;
}, cr = (A) => A === "auto" ? A : xl(A.charAt(0) === "#" ? A.substring(1) : A, 3), nt = (A) => typeof A == "string" ? bs(A) : pe(A), Mg = (A) => typeof A == "string" ? Tl(A) : Zn(A), de = (A) => typeof A == "string" ? Tl(A) : Zn(A), Pg = (A) => {
  const i = A.substring(0, A.length - 1);
  return `${Number(i)}%`;
}, Sl = (A) => typeof A == "number" ? pe(A) : A.slice(-1) === "%" ? Pg(A) : bs(A), Gg = Zn, Vg = Zn, Wg = (A) => A.toISOString(), CA = class extends mA {
  constructor(A, i = !0) {
    super(A), i !== !0 && this.root.push(new ge({ val: i }));
  }
}, Gi = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: Mg(i) }));
  }
}, Xg = class extends mA {
}, kt = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: i }));
  }
}, Rr = (A, i) => new bA({
  name: A,
  attributes: { value: {
    key: "w:val",
    value: i
  } }
}), Pr = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: i }));
  }
}, Lt = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(i);
  }
}, bA = class extends mA {
  constructor({ name: A, attributes: i, children: n }) {
    super(A), i && this.root.push(new al(i)), n && this.root.push(...n);
  }
}, fe = {
  START: "start",
  CENTER: "center",
  END: "end",
  BOTH: "both",
  MEDIUM_KASHIDA: "mediumKashida",
  DISTRIBUTE: "distribute",
  NUM_TAB: "numTab",
  HIGH_KASHIDA: "highKashida",
  LOW_KASHIDA: "lowKashida",
  THAI_DISTRIBUTE: "thaiDistribute",
  LEFT: "left",
  RIGHT: "right",
  JUSTIFIED: "both"
}, Hl = (A) => new bA({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), re = (A, { color: i, size: n, space: c, style: h }) => new bA({
  name: A,
  attributes: {
    style: {
      key: "w:val",
      value: h
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : cr(i)
    },
    size: {
      key: "w:sz",
      value: n === void 0 ? void 0 : Gg(n)
    },
    space: {
      key: "w:space",
      value: c === void 0 ? void 0 : Vg(c)
    }
  }
}), wr = {
  SINGLE: "single",
  DASH_DOT_STROKED: "dashDotStroked",
  DASHED: "dashed",
  DASH_SMALL_GAP: "dashSmallGap",
  DOT_DASH: "dotDash",
  DOT_DOT_DASH: "dotDotDash",
  DOTTED: "dotted",
  DOUBLE: "double",
  DOUBLE_WAVE: "doubleWave",
  INSET: "inset",
  NIL: "nil",
  NONE: "none",
  OUTSET: "outset",
  THICK: "thick",
  THICK_THIN_LARGE_GAP: "thickThinLargeGap",
  THICK_THIN_MEDIUM_GAP: "thickThinMediumGap",
  THICK_THIN_SMALL_GAP: "thickThinSmallGap",
  THIN_THICK_LARGE_GAP: "thinThickLargeGap",
  THIN_THICK_MEDIUM_GAP: "thinThickMediumGap",
  THIN_THICK_SMALL_GAP: "thinThickSmallGap",
  THIN_THICK_THIN_LARGE_GAP: "thinThickThinLargeGap",
  THIN_THICK_THIN_MEDIUM_GAP: "thinThickThinMediumGap",
  THIN_THICK_THIN_SMALL_GAP: "thinThickThinSmallGap",
  THREE_D_EMBOSS: "threeDEmboss",
  THREE_D_ENGRAVE: "threeDEngrave",
  TRIPLE: "triple",
  WAVE: "wave"
}, jg = class extends mt {
  constructor(A) {
    super("w:pBdr"), A.top && this.root.push(re("w:top", A.top)), A.bottom && this.root.push(re("w:bottom", A.bottom)), A.left && this.root.push(re("w:left", A.left)), A.right && this.root.push(re("w:right", A.right)), A.between && this.root.push(re("w:between", A.between));
  }
}, zg = class extends mA {
  constructor() {
    super("w:pBdr");
    const A = re("w:bottom", {
      color: "auto",
      space: 1,
      style: wr.SINGLE,
      size: 6
    });
    this.root.push(A);
  }
}, Jg = ({ start: A, end: i, left: n, right: c, hanging: h, firstLine: f, firstLineChars: a }) => new bA({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: A === void 0 ? void 0 : nt(A)
    },
    end: {
      key: "w:end",
      value: i === void 0 ? void 0 : nt(i)
    },
    left: {
      key: "w:left",
      value: n === void 0 ? void 0 : nt(n)
    },
    right: {
      key: "w:right",
      value: c === void 0 ? void 0 : nt(c)
    },
    hanging: {
      key: "w:hanging",
      value: h === void 0 ? void 0 : de(h)
    },
    firstLine: {
      key: "w:firstLine",
      value: f === void 0 ? void 0 : de(f)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: a === void 0 ? void 0 : pe(a)
    }
  }
}), Yg = () => new bA({ name: "w:br" }), Is = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, _s = (A, i) => new bA({
  name: "w:fldChar",
  attributes: {
    type: {
      key: "w:fldCharType",
      value: A
    },
    dirty: {
      key: "w:dirty",
      value: i
    }
  }
}), Ln = (A) => _s(Is.BEGIN, A), Dn = (A) => _s(Is.SEPARATE, A), Rn = (A) => _s(Is.END, A), hr = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, fr = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { space: "xml:space" });
  }
}, Zg = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new fr({ space: hr.PRESERVE })), this.root.push("PAGE");
  }
}, qg = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new fr({ space: hr.PRESERVE })), this.root.push("NUMPAGES");
  }
}, $g = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new fr({ space: hr.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, Aw = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new fr({ space: hr.PRESERVE })), this.root.push("SECTION");
  }
}, qn = ({ fill: A, color: i, type: n }) => new bA({
  name: "w:shd",
  attributes: {
    fill: {
      key: "w:fill",
      value: A === void 0 ? void 0 : cr(A)
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : cr(i)
    },
    type: {
      key: "w:val",
      value: n
    }
  }
}), Qe = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, ew = class extends mA {
  constructor(A) {
    super("w:del"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, tw = class extends mA {
  constructor(A) {
    super("w:ins"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, rw = { DOT: "dot" }, nw = (A = rw.DOT) => new bA({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), iw = class extends mA {
  constructor(A) {
    super("w:spacing"), this.root.push(new ge({ val: nt(A) }));
  }
}, sw = class extends mA {
  constructor(A) {
    super("w:color"), this.root.push(new ge({ val: cr(A) }));
  }
}, aw = class extends mA {
  constructor(A) {
    super("w:highlight"), this.root.push(new ge({ val: A }));
  }
}, ow = class extends mA {
  constructor(A) {
    super("w:highlightCs"), this.root.push(new ge({ val: A }));
  }
}, lw = (A) => new bA({
  name: "w:lang",
  attributes: {
    value: {
      key: "w:val",
      value: A.value
    },
    eastAsia: {
      key: "w:eastAsia",
      value: A.eastAsia
    },
    bidirectional: {
      key: "w:bidi",
      value: A.bidirectional
    }
  }
}), Vi = (A, i) => {
  if (typeof A == "string") {
    const c = A;
    return new bA({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:ascii",
          value: c
        },
        cs: {
          key: "w:cs",
          value: c
        },
        eastAsia: {
          key: "w:eastAsia",
          value: c
        },
        hAnsi: {
          key: "w:hAnsi",
          value: c
        },
        hint: {
          key: "w:hint",
          value: i
        }
      }
    });
  }
  const n = A;
  return new bA({
    name: "w:rFonts",
    attributes: {
      ascii: {
        key: "w:ascii",
        value: n.ascii
      },
      cs: {
        key: "w:cs",
        value: n.cs
      },
      eastAsia: {
        key: "w:eastAsia",
        value: n.eastAsia
      },
      hAnsi: {
        key: "w:hAnsi",
        value: n.hAnsi
      },
      hint: {
        key: "w:hint",
        value: n.hint
      }
    }
  });
}, Ll = (A) => new bA({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), uw = () => Ll("superscript"), cw = () => Ll("subscript"), Dl = {
  SINGLE: "single",
  WORDS: "words",
  DOUBLE: "double",
  THICK: "thick",
  DOTTED: "dotted",
  DOTTEDHEAVY: "dottedHeavy",
  DASH: "dash",
  DASHEDHEAVY: "dashedHeavy",
  DASHLONG: "dashLong",
  DASHLONGHEAVY: "dashLongHeavy",
  DOTDASH: "dotDash",
  DASHDOTHEAVY: "dashDotHeavy",
  DOTDOTDASH: "dotDotDash",
  DASHDOTDOTHEAVY: "dashDotDotHeavy",
  WAVE: "wave",
  WAVYHEAVY: "wavyHeavy",
  WAVYDOUBLE: "wavyDouble",
  NONE: "none"
}, hw = (A = Dl.SINGLE, i) => new bA({
  name: "w:u",
  attributes: {
    val: {
      key: "w:val",
      value: A
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : cr(i)
    }
  }
}), Ct = class extends mt {
  constructor(A) {
    if (super("w:rPr"), !A) return;
    if (A.style && this.push(new kt("w:rStyle", A.style)), A.font && (typeof A.font == "string" ? this.push(Vi(A.font)) : "name" in A.font ? this.push(Vi(A.font.name, A.font.hint)) : this.push(Vi(A.font))), A.bold !== void 0 && this.push(new CA("w:b", A.bold)), A.boldComplexScript === void 0 && A.bold !== void 0 || A.boldComplexScript) {
      var i;
      this.push(new CA("w:bCs", (i = A.boldComplexScript) !== null && i !== void 0 ? i : A.bold));
    }
    if (A.italics !== void 0 && this.push(new CA("w:i", A.italics)), A.italicsComplexScript === void 0 && A.italics !== void 0 || A.italicsComplexScript) {
      var n;
      this.push(new CA("w:iCs", (n = A.italicsComplexScript) !== null && n !== void 0 ? n : A.italics));
    }
    A.smallCaps !== void 0 ? this.push(new CA("w:smallCaps", A.smallCaps)) : A.allCaps !== void 0 && this.push(new CA("w:caps", A.allCaps)), A.strike !== void 0 && this.push(new CA("w:strike", A.strike)), A.doubleStrike !== void 0 && this.push(new CA("w:dstrike", A.doubleStrike)), A.emboss !== void 0 && this.push(new CA("w:emboss", A.emboss)), A.imprint !== void 0 && this.push(new CA("w:imprint", A.imprint)), A.noProof !== void 0 && this.push(new CA("w:noProof", A.noProof)), A.snapToGrid !== void 0 && this.push(new CA("w:snapToGrid", A.snapToGrid)), A.vanish && this.push(new CA("w:vanish", A.vanish)), A.color && this.push(new sw(A.color)), A.characterSpacing && this.push(new iw(A.characterSpacing)), A.scale !== void 0 && this.push(new Pr("w:w", A.scale)), A.kern && this.push(new Gi("w:kern", A.kern)), A.position && this.push(new kt("w:position", A.position)), A.size !== void 0 && this.push(new Gi("w:sz", A.size));
    const c = A.sizeComplexScript === void 0 || A.sizeComplexScript === !0 ? A.size : A.sizeComplexScript;
    c && this.push(new Gi("w:szCs", c)), A.highlight && this.push(new aw(A.highlight));
    const h = A.highlightComplexScript === void 0 || A.highlightComplexScript === !0 ? A.highlight : A.highlightComplexScript;
    h && this.push(new ow(h)), A.underline && this.push(hw(A.underline.type, A.underline.color)), A.effect && this.push(new kt("w:effect", A.effect)), A.border && this.push(re("w:bdr", A.border)), A.shading && this.push(qn(A.shading)), A.subScript && this.push(cw()), A.superScript && this.push(uw()), A.rightToLeft !== void 0 && this.push(new CA("w:rtl", A.rightToLeft)), A.emphasisMark && this.push(nw(A.emphasisMark.type)), A.language && this.push(lw(A.language)), A.specVanish && this.push(new CA("w:specVanish", A.vanish)), A.math && this.push(new CA("w:oMath", A.math)), A.revision && this.push(new dw(A.revision));
  }
  push(A) {
    this.root.push(A);
  }
}, fw = class extends Ct {
  constructor(A) {
    super(A), A?.insertion && this.push(new tw(A.insertion)), A?.deletion && this.push(new ew(A.deletion));
  }
}, dw = class extends mA {
  constructor(A) {
    super("w:rPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.addChildElement(new Ct(A));
  }
}, ls = class extends mA {
  constructor(A) {
    if (super("w:t"), typeof A == "string")
      this.root.push(new fr({ space: hr.PRESERVE })), this.root.push(A);
    else {
      var i;
      this.root.push(new fr({ space: (i = A.space) !== null && i !== void 0 ? i : hr.DEFAULT })), this.root.push(A.text);
    }
  }
}, On = {
  CURRENT: "CURRENT",
  TOTAL_PAGES: "TOTAL_PAGES",
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  CURRENT_SECTION: "SECTION"
}, Gt = class extends mA {
  constructor(A) {
    if (super("w:r"), hA(this, "properties", void 0), this.properties = new Ct(A), this.root.push(this.properties), A.break) for (let i = 0; i < A.break; i++) this.root.push(Yg());
    if (A.children) for (const i of A.children) {
      if (typeof i == "string") {
        switch (i) {
          case On.CURRENT:
            this.root.push(Ln()), this.root.push(new Zg()), this.root.push(Dn()), this.root.push(Rn());
            break;
          case On.TOTAL_PAGES:
            this.root.push(Ln()), this.root.push(new qg()), this.root.push(Dn()), this.root.push(Rn());
            break;
          case On.TOTAL_PAGES_IN_SECTION:
            this.root.push(Ln()), this.root.push(new $g()), this.root.push(Dn()), this.root.push(Rn());
            break;
          case On.CURRENT_SECTION:
            this.root.push(Ln()), this.root.push(new Aw()), this.root.push(Dn()), this.root.push(Rn());
            break;
          default:
            this.root.push(new ls(i));
            break;
        }
        continue;
      }
      this.root.push(i);
    }
    else A.text !== void 0 && this.root.push(new ls(A.text));
  }
}, je = class extends Gt {
  constructor(A) {
    super(typeof A == "string" ? { text: A } : A);
  }
}, jr = /* @__PURE__ */ FA(((A, i) => {
  i.exports = n;
  function n(c, h) {
    if (!c) throw new Error(h || "Assertion failed");
  }
  n.equal = function(h, f, a) {
    if (h != f) throw new Error(a || "Assertion failed: " + h + " != " + f);
  };
})), ze = /* @__PURE__ */ FA(((A) => {
  var i = jr();
  A.inherits = vt();
  function n(k, Z) {
    return (k.charCodeAt(Z) & 64512) !== 55296 || Z < 0 || Z + 1 >= k.length ? !1 : (k.charCodeAt(Z + 1) & 64512) === 56320;
  }
  function c(k, Z) {
    if (Array.isArray(k)) return k.slice();
    if (!k) return [];
    var L = [];
    if (typeof k == "string")
      if (Z) {
        if (Z === "hex")
          for (k = k.replace(/[^a-z0-9]+/gi, ""), k.length % 2 !== 0 && (k = "0" + k), uA = 0; uA < k.length; uA += 2) L.push(parseInt(k[uA] + k[uA + 1], 16));
      } else for (var $ = 0, uA = 0; uA < k.length; uA++) {
        var rA = k.charCodeAt(uA);
        rA < 128 ? L[$++] = rA : rA < 2048 ? (L[$++] = rA >> 6 | 192, L[$++] = rA & 63 | 128) : n(k, uA) ? (rA = 65536 + ((rA & 1023) << 10) + (k.charCodeAt(++uA) & 1023), L[$++] = rA >> 18 | 240, L[$++] = rA >> 12 & 63 | 128, L[$++] = rA >> 6 & 63 | 128, L[$++] = rA & 63 | 128) : (L[$++] = rA >> 12 | 224, L[$++] = rA >> 6 & 63 | 128, L[$++] = rA & 63 | 128);
      }
    else for (uA = 0; uA < k.length; uA++) L[uA] = k[uA] | 0;
    return L;
  }
  A.toArray = c;
  function h(k) {
    for (var Z = "", L = 0; L < k.length; L++) Z += o(k[L].toString(16));
    return Z;
  }
  A.toHex = h;
  function f(k) {
    return (k >>> 24 | k >>> 8 & 65280 | k << 8 & 16711680 | (k & 255) << 24) >>> 0;
  }
  A.htonl = f;
  function a(k, Z) {
    for (var L = "", $ = 0; $ < k.length; $++) {
      var uA = k[$];
      Z === "little" && (uA = f(uA)), L += d(uA.toString(16));
    }
    return L;
  }
  A.toHex32 = a;
  function o(k) {
    return k.length === 1 ? "0" + k : k;
  }
  A.zero2 = o;
  function d(k) {
    return k.length === 7 ? "0" + k : k.length === 6 ? "00" + k : k.length === 5 ? "000" + k : k.length === 4 ? "0000" + k : k.length === 3 ? "00000" + k : k.length === 2 ? "000000" + k : k.length === 1 ? "0000000" + k : k;
  }
  A.zero8 = d;
  function U(k, Z, L, $) {
    var uA = L - Z;
    i(uA % 4 === 0);
    for (var rA = new Array(uA / 4), vA = 0, sA = Z; vA < rA.length; vA++, sA += 4) {
      var dA;
      $ === "big" ? dA = k[sA] << 24 | k[sA + 1] << 16 | k[sA + 2] << 8 | k[sA + 3] : dA = k[sA + 3] << 24 | k[sA + 2] << 16 | k[sA + 1] << 8 | k[sA], rA[vA] = dA >>> 0;
    }
    return rA;
  }
  A.join32 = U;
  function b(k, Z) {
    for (var L = new Array(k.length * 4), $ = 0, uA = 0; $ < k.length; $++, uA += 4) {
      var rA = k[$];
      Z === "big" ? (L[uA] = rA >>> 24, L[uA + 1] = rA >>> 16 & 255, L[uA + 2] = rA >>> 8 & 255, L[uA + 3] = rA & 255) : (L[uA + 3] = rA >>> 24, L[uA + 2] = rA >>> 16 & 255, L[uA + 1] = rA >>> 8 & 255, L[uA] = rA & 255);
    }
    return L;
  }
  A.split32 = b;
  function v(k, Z) {
    return k >>> Z | k << 32 - Z;
  }
  A.rotr32 = v;
  function _(k, Z) {
    return k << Z | k >>> 32 - Z;
  }
  A.rotl32 = _;
  function C(k, Z) {
    return k + Z >>> 0;
  }
  A.sum32 = C;
  function m(k, Z, L) {
    return k + Z + L >>> 0;
  }
  A.sum32_3 = m;
  function w(k, Z, L, $) {
    return k + Z + L + $ >>> 0;
  }
  A.sum32_4 = w;
  function I(k, Z, L, $, uA) {
    return k + Z + L + $ + uA >>> 0;
  }
  A.sum32_5 = I;
  function T(k, Z, L, $) {
    var uA = k[Z], rA = $ + k[Z + 1] >>> 0;
    k[Z] = (rA < $ ? 1 : 0) + L + uA >>> 0, k[Z + 1] = rA;
  }
  A.sum64 = T;
  function x(k, Z, L, $) {
    return (Z + $ >>> 0 < Z ? 1 : 0) + k + L >>> 0;
  }
  A.sum64_hi = x;
  function N(k, Z, L, $) {
    return Z + $ >>> 0;
  }
  A.sum64_lo = N;
  function O(k, Z, L, $, uA, rA, vA, sA) {
    var dA = 0, tA = Z;
    return tA = tA + $ >>> 0, dA += tA < Z ? 1 : 0, tA = tA + rA >>> 0, dA += tA < rA ? 1 : 0, tA = tA + sA >>> 0, dA += tA < sA ? 1 : 0, k + L + uA + vA + dA >>> 0;
  }
  A.sum64_4_hi = O;
  function F(k, Z, L, $, uA, rA, vA, sA) {
    return Z + $ + rA + sA >>> 0;
  }
  A.sum64_4_lo = F;
  function g(k, Z, L, $, uA, rA, vA, sA, dA, tA) {
    var P = 0, iA = Z;
    return iA = iA + $ >>> 0, P += iA < Z ? 1 : 0, iA = iA + rA >>> 0, P += iA < rA ? 1 : 0, iA = iA + sA >>> 0, P += iA < sA ? 1 : 0, iA = iA + tA >>> 0, P += iA < tA ? 1 : 0, k + L + uA + vA + dA + P >>> 0;
  }
  A.sum64_5_hi = g;
  function R(k, Z, L, $, uA, rA, vA, sA, dA, tA) {
    return Z + $ + rA + sA + tA >>> 0;
  }
  A.sum64_5_lo = R;
  function V(k, Z, L) {
    return (Z << 32 - L | k >>> L) >>> 0;
  }
  A.rotr64_hi = V;
  function E(k, Z, L) {
    return (k << 32 - L | Z >>> L) >>> 0;
  }
  A.rotr64_lo = E;
  function q(k, Z, L) {
    return k >>> L;
  }
  A.shr64_hi = q;
  function lA(k, Z, L) {
    return (k << 32 - L | Z >>> L) >>> 0;
  }
  A.shr64_lo = lA;
})), zr = /* @__PURE__ */ FA(((A) => {
  var i = ze(), n = jr();
  function c() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  A.BlockHash = c, c.prototype.update = function(f, a) {
    if (f = i.toArray(f, a), this.pending ? this.pending = this.pending.concat(f) : this.pending = f, this.pendingTotal += f.length, this.pending.length >= this._delta8) {
      f = this.pending;
      var o = f.length % this._delta8;
      this.pending = f.slice(f.length - o, f.length), this.pending.length === 0 && (this.pending = null), f = i.join32(f, 0, f.length - o, this.endian);
      for (var d = 0; d < f.length; d += this._delta32) this._update(f, d, d + this._delta32);
    }
    return this;
  }, c.prototype.digest = function(f) {
    return this.update(this._pad()), n(this.pending === null), this._digest(f);
  }, c.prototype._pad = function() {
    var f = this.pendingTotal, a = this._delta8, o = a - (f + this.padLength) % a, d = new Array(o + this.padLength);
    d[0] = 128;
    for (var U = 1; U < o; U++) d[U] = 0;
    if (f <<= 3, this.endian === "big") {
      for (var b = 8; b < this.padLength; b++) d[U++] = 0;
      d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = f >>> 24 & 255, d[U++] = f >>> 16 & 255, d[U++] = f >>> 8 & 255, d[U++] = f & 255;
    } else
      for (d[U++] = f & 255, d[U++] = f >>> 8 & 255, d[U++] = f >>> 16 & 255, d[U++] = f >>> 24 & 255, d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = 0, b = 8; b < this.padLength; b++) d[U++] = 0;
    return d;
  };
})), Rl = /* @__PURE__ */ FA(((A) => {
  var i = ze().rotr32;
  function n(b, v, _, C) {
    if (b === 0) return c(v, _, C);
    if (b === 1 || b === 3) return f(v, _, C);
    if (b === 2) return h(v, _, C);
  }
  A.ft_1 = n;
  function c(b, v, _) {
    return b & v ^ ~b & _;
  }
  A.ch32 = c;
  function h(b, v, _) {
    return b & v ^ b & _ ^ v & _;
  }
  A.maj32 = h;
  function f(b, v, _) {
    return b ^ v ^ _;
  }
  A.p32 = f;
  function a(b) {
    return i(b, 2) ^ i(b, 13) ^ i(b, 22);
  }
  A.s0_256 = a;
  function o(b) {
    return i(b, 6) ^ i(b, 11) ^ i(b, 25);
  }
  A.s1_256 = o;
  function d(b) {
    return i(b, 7) ^ i(b, 18) ^ b >>> 3;
  }
  A.g0_256 = d;
  function U(b) {
    return i(b, 17) ^ i(b, 19) ^ b >>> 10;
  }
  A.g1_256 = U;
})), pw = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = zr(), h = Rl(), f = n.rotl32, a = n.sum32, o = n.sum32_5, d = h.ft_1, U = c.BlockHash, b = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function v() {
    if (!(this instanceof v)) return new v();
    U.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  n.inherits(v, U), i.exports = v, v.blockSize = 512, v.outSize = 160, v.hmacStrength = 80, v.padLength = 64, v.prototype._update = function(C, m) {
    for (var w = this.W, I = 0; I < 16; I++) w[I] = C[m + I];
    for (; I < w.length; I++) w[I] = f(w[I - 3] ^ w[I - 8] ^ w[I - 14] ^ w[I - 16], 1);
    var T = this.h[0], x = this.h[1], N = this.h[2], O = this.h[3], F = this.h[4];
    for (I = 0; I < w.length; I++) {
      var g = ~~(I / 20), R = o(f(T, 5), d(g, x, N, O), F, w[I], b[g]);
      F = O, O = N, N = f(x, 30), x = T, T = R;
    }
    this.h[0] = a(this.h[0], T), this.h[1] = a(this.h[1], x), this.h[2] = a(this.h[2], N), this.h[3] = a(this.h[3], O), this.h[4] = a(this.h[4], F);
  }, v.prototype._digest = function(C) {
    return C === "hex" ? n.toHex32(this.h, "big") : n.split32(this.h, "big");
  };
})), Ol = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = zr(), h = Rl(), f = jr(), a = n.sum32, o = n.sum32_4, d = n.sum32_5, U = h.ch32, b = h.maj32, v = h.s0_256, _ = h.s1_256, C = h.g0_256, m = h.g1_256, w = c.BlockHash, I = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function T() {
    if (!(this instanceof T)) return new T();
    w.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = I, this.W = new Array(64);
  }
  n.inherits(T, w), i.exports = T, T.blockSize = 512, T.outSize = 256, T.hmacStrength = 192, T.padLength = 64, T.prototype._update = function(N, O) {
    for (var F = this.W, g = 0; g < 16; g++) F[g] = N[O + g];
    for (; g < F.length; g++) F[g] = o(m(F[g - 2]), F[g - 7], C(F[g - 15]), F[g - 16]);
    var R = this.h[0], V = this.h[1], E = this.h[2], q = this.h[3], lA = this.h[4], k = this.h[5], Z = this.h[6], L = this.h[7];
    for (f(this.k.length === F.length), g = 0; g < F.length; g++) {
      var $ = d(L, _(lA), U(lA, k, Z), this.k[g], F[g]), uA = a(v(R), b(R, V, E));
      L = Z, Z = k, k = lA, lA = a(q, $), q = E, E = V, V = R, R = a($, uA);
    }
    this.h[0] = a(this.h[0], R), this.h[1] = a(this.h[1], V), this.h[2] = a(this.h[2], E), this.h[3] = a(this.h[3], q), this.h[4] = a(this.h[4], lA), this.h[5] = a(this.h[5], k), this.h[6] = a(this.h[6], Z), this.h[7] = a(this.h[7], L);
  }, T.prototype._digest = function(N) {
    return N === "hex" ? n.toHex32(this.h, "big") : n.split32(this.h, "big");
  };
})), gw = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = Ol();
  function h() {
    if (!(this instanceof h)) return new h();
    c.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  n.inherits(h, c), i.exports = h, h.blockSize = 512, h.outSize = 224, h.hmacStrength = 192, h.padLength = 64, h.prototype._digest = function(a) {
    return a === "hex" ? n.toHex32(this.h.slice(0, 7), "big") : n.split32(this.h.slice(0, 7), "big");
  };
})), Nl = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = zr(), h = jr(), f = n.rotr64_hi, a = n.rotr64_lo, o = n.shr64_hi, d = n.shr64_lo, U = n.sum64, b = n.sum64_hi, v = n.sum64_lo, _ = n.sum64_4_hi, C = n.sum64_4_lo, m = n.sum64_5_hi, w = n.sum64_5_lo, I = c.BlockHash, T = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function x() {
    if (!(this instanceof x)) return new x();
    I.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = T, this.W = new Array(160);
  }
  n.inherits(x, I), i.exports = x, x.blockSize = 1024, x.outSize = 512, x.hmacStrength = 192, x.padLength = 128, x.prototype._prepareBlock = function(uA, rA) {
    for (var vA = this.W, sA = 0; sA < 32; sA++) vA[sA] = uA[rA + sA];
    for (; sA < vA.length; sA += 2) {
      var dA = Z(vA[sA - 4], vA[sA - 3]), tA = L(vA[sA - 4], vA[sA - 3]), P = vA[sA - 14], iA = vA[sA - 13], aA = lA(vA[sA - 30], vA[sA - 29]), fA = k(vA[sA - 30], vA[sA - 29]), _A = vA[sA - 32], H = vA[sA - 31];
      vA[sA] = _(dA, tA, P, iA, aA, fA, _A, H), vA[sA + 1] = C(dA, tA, P, iA, aA, fA, _A, H);
    }
  }, x.prototype._update = function(uA, rA) {
    this._prepareBlock(uA, rA);
    var vA = this.W, sA = this.h[0], dA = this.h[1], tA = this.h[2], P = this.h[3], iA = this.h[4], aA = this.h[5], fA = this.h[6], _A = this.h[7], H = this.h[8], y = this.h[9], J = this.h[10], z = this.h[11], pA = this.h[12], M = this.h[13], G = this.h[14], B = this.h[15];
    h(this.k.length === vA.length);
    for (var eA = 0; eA < vA.length; eA += 2) {
      var D = G, l = B, u = E(H, y), Q = q(H, y), j = N(H, y, J, z, pA, M), AA = O(H, y, J, z, pA, M), Y = this.k[eA], gA = this.k[eA + 1], yA = vA[eA], BA = vA[eA + 1], QA = m(D, l, u, Q, j, AA, Y, gA, yA, BA), xA = w(D, l, u, Q, j, AA, Y, gA, yA, BA);
      D = R(sA, dA), l = V(sA, dA), u = F(sA, dA, tA, P, iA, aA), Q = g(sA, dA, tA, P, iA, aA);
      var RA = b(D, l, u, Q), Ae = v(D, l, u, Q);
      G = pA, B = M, pA = J, M = z, J = H, z = y, H = b(fA, _A, QA, xA), y = v(_A, _A, QA, xA), fA = iA, _A = aA, iA = tA, aA = P, tA = sA, P = dA, sA = b(QA, xA, RA, Ae), dA = v(QA, xA, RA, Ae);
    }
    U(this.h, 0, sA, dA), U(this.h, 2, tA, P), U(this.h, 4, iA, aA), U(this.h, 6, fA, _A), U(this.h, 8, H, y), U(this.h, 10, J, z), U(this.h, 12, pA, M), U(this.h, 14, G, B);
  }, x.prototype._digest = function(uA) {
    return uA === "hex" ? n.toHex32(this.h, "big") : n.split32(this.h, "big");
  };
  function N($, uA, rA, vA, sA) {
    var dA = $ & rA ^ ~$ & sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function O($, uA, rA, vA, sA, dA) {
    var tA = uA & vA ^ ~uA & dA;
    return tA < 0 && (tA += 4294967296), tA;
  }
  function F($, uA, rA, vA, sA) {
    var dA = $ & rA ^ $ & sA ^ rA & sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function g($, uA, rA, vA, sA, dA) {
    var tA = uA & vA ^ uA & dA ^ vA & dA;
    return tA < 0 && (tA += 4294967296), tA;
  }
  function R($, uA) {
    var rA = f($, uA, 28), vA = f(uA, $, 2), sA = f(uA, $, 7), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function V($, uA) {
    var rA = a($, uA, 28), vA = a(uA, $, 2), sA = a(uA, $, 7), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function E($, uA) {
    var rA = f($, uA, 14), vA = f($, uA, 18), sA = f(uA, $, 9), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function q($, uA) {
    var rA = a($, uA, 14), vA = a($, uA, 18), sA = a(uA, $, 9), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function lA($, uA) {
    var rA = f($, uA, 1), vA = f($, uA, 8), sA = o($, uA, 7), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function k($, uA) {
    var rA = a($, uA, 1), vA = a($, uA, 8), sA = d($, uA, 7), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function Z($, uA) {
    var rA = f($, uA, 19), vA = f(uA, $, 29), sA = o($, uA, 6), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function L($, uA) {
    var rA = a($, uA, 19), vA = a(uA, $, 29), sA = d($, uA, 6), dA = rA ^ vA ^ sA;
    return dA < 0 && (dA += 4294967296), dA;
  }
})), ww = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = Nl();
  function h() {
    if (!(this instanceof h)) return new h();
    c.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  n.inherits(h, c), i.exports = h, h.blockSize = 1024, h.outSize = 384, h.hmacStrength = 192, h.padLength = 128, h.prototype._digest = function(a) {
    return a === "hex" ? n.toHex32(this.h.slice(0, 12), "big") : n.split32(this.h.slice(0, 12), "big");
  };
})), Bw = /* @__PURE__ */ FA(((A) => {
  A.sha1 = pw(), A.sha224 = gw(), A.sha256 = Ol(), A.sha384 = ww(), A.sha512 = Nl();
})), mw = /* @__PURE__ */ FA(((A) => {
  var i = ze(), n = zr(), c = i.rotl32, h = i.sum32, f = i.sum32_3, a = i.sum32_4, o = n.BlockHash;
  function d() {
    if (!(this instanceof d)) return new d();
    o.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.endian = "little";
  }
  i.inherits(d, o), A.ripemd160 = d, d.blockSize = 512, d.outSize = 160, d.hmacStrength = 192, d.padLength = 64, d.prototype._update = function(T, x) {
    for (var N = this.h[0], O = this.h[1], F = this.h[2], g = this.h[3], R = this.h[4], V = N, E = O, q = F, lA = g, k = R, Z = 0; Z < 80; Z++) {
      var L = h(c(a(N, U(Z, O, F, g), T[_[Z] + x], b(Z)), m[Z]), R);
      N = R, R = g, g = c(F, 10), F = O, O = L, L = h(c(a(V, U(79 - Z, E, q, lA), T[C[Z] + x], v(Z)), w[Z]), k), V = k, k = lA, lA = c(q, 10), q = E, E = L;
    }
    L = f(this.h[1], F, lA), this.h[1] = f(this.h[2], g, k), this.h[2] = f(this.h[3], R, V), this.h[3] = f(this.h[4], N, E), this.h[4] = f(this.h[0], O, q), this.h[0] = L;
  }, d.prototype._digest = function(T) {
    return T === "hex" ? i.toHex32(this.h, "little") : i.split32(this.h, "little");
  };
  function U(I, T, x, N) {
    return I <= 15 ? T ^ x ^ N : I <= 31 ? T & x | ~T & N : I <= 47 ? (T | ~x) ^ N : I <= 63 ? T & N | x & ~N : T ^ (x | ~N);
  }
  function b(I) {
    return I <= 15 ? 0 : I <= 31 ? 1518500249 : I <= 47 ? 1859775393 : I <= 63 ? 2400959708 : 2840853838;
  }
  function v(I) {
    return I <= 15 ? 1352829926 : I <= 31 ? 1548603684 : I <= 47 ? 1836072691 : I <= 63 ? 2053994217 : 0;
  }
  var _ = [
    0,
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
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], C = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], m = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], w = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
})), vw = /* @__PURE__ */ FA(((A, i) => {
  var n = ze(), c = jr();
  function h(f, a, o) {
    if (!(this instanceof h)) return new h(f, a, o);
    this.Hash = f, this.blockSize = f.blockSize / 8, this.outSize = f.outSize / 8, this.inner = null, this.outer = null, this._init(n.toArray(a, o));
  }
  i.exports = h, h.prototype._init = function(a) {
    a.length > this.blockSize && (a = new this.Hash().update(a).digest()), c(a.length <= this.blockSize);
    for (var o = a.length; o < this.blockSize; o++) a.push(0);
    for (o = 0; o < a.length; o++) a[o] ^= 54;
    for (this.inner = new this.Hash().update(a), o = 0; o < a.length; o++) a[o] ^= 106;
    this.outer = new this.Hash().update(a);
  }, h.prototype.update = function(a, o) {
    return this.inner.update(a, o), this;
  }, h.prototype.digest = function(a) {
    return this.outer.update(this.inner.digest()), this.outer.digest(a);
  };
})), yw = /* @__PURE__ */ gs((/* @__PURE__ */ FA(((A) => {
  var i = A;
  i.utils = ze(), i.common = zr(), i.sha = Bw(), i.ripemd = mw(), i.hmac = vw(), i.sha1 = i.sha.sha1, i.sha256 = i.sha.sha256, i.sha224 = i.sha.sha224, i.sha384 = i.sha.sha384, i.sha512 = i.sha.sha512, i.ripemd160 = i.ripemd.ripemd160;
})))(), 1), Cw = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Fw = (A, i = 21) => (n = i) => {
  let c = "", h = n | 0;
  for (; h--; ) c += A[Math.random() * A.length | 0];
  return c;
}, Ew = (A = 21) => {
  let i = "", n = A | 0;
  for (; n--; ) i += Cw[Math.random() * 64 | 0];
  return i;
}, Re = (A) => Math.floor(A * 72 * 20), $n = (A = 0) => {
  let i = A;
  return () => ++i;
}, Qw = () => $n(), Uw = () => $n(1), bw = () => $n(), Iw = () => $n(), kl = () => Ew().toLowerCase(), To = (A) => yw.default.sha1().update(A instanceof ArrayBuffer ? new Uint8Array(A) : A).digest("hex"), Or = (A) => Fw("1234567890abcdef", A)(), _w = () => `${Or(8)}-${Or(4)}-${Or(4)}-${Or(4)}-${Or(12)}`, Mn = (A) => new Uint8Array(new TextEncoder().encode(A)), xw = {
  CHARACTER: "character",
  COLUMN: "column",
  INSIDE_MARGIN: "insideMargin",
  LEFT_MARGIN: "leftMargin",
  MARGIN: "margin",
  OUTSIDE_MARGIN: "outsideMargin",
  PAGE: "page",
  RIGHT_MARGIN: "rightMargin"
}, Tw = {
  BOTTOM_MARGIN: "bottomMargin",
  INSIDE_MARGIN: "insideMargin",
  LINE: "line",
  MARGIN: "margin",
  OUTSIDE_MARGIN: "outsideMargin",
  PAGE: "page",
  PARAGRAPH: "paragraph",
  TOP_MARGIN: "topMargin"
}, Sw = () => new bA({
  name: "wp:simplePos",
  attributes: {
    x: {
      key: "x",
      value: 0
    },
    y: {
      key: "y",
      value: 0
    }
  }
}), Kl = (A) => new bA({
  name: "wp:align",
  children: [A]
}), Ml = (A) => new bA({
  name: "wp:posOffset",
  children: [A.toString()]
}), Hw = ({ relative: A, align: i, offset: n }) => new bA({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: A ?? xw.PAGE
  } },
  children: [(() => {
    if (i) return Kl(i);
    if (n !== void 0) return Ml(n);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Lw = ({ relative: A, align: i, offset: n }) => new bA({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: A ?? Tw.PAGE
  } },
  children: [(() => {
    if (i) return Kl(i);
    if (n !== void 0) return Ml(n);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Dw = (A = {}) => {
  var i, n, c, h;
  return new bA({
    name: "wps:bodyPr",
    attributes: {
      lIns: {
        key: "lIns",
        value: (i = A.margins) === null || i === void 0 ? void 0 : i.left
      },
      rIns: {
        key: "rIns",
        value: (n = A.margins) === null || n === void 0 ? void 0 : n.right
      },
      tIns: {
        key: "tIns",
        value: (c = A.margins) === null || c === void 0 ? void 0 : c.top
      },
      bIns: {
        key: "bIns",
        value: (h = A.margins) === null || h === void 0 ? void 0 : h.bottom
      },
      anchor: {
        key: "anchor",
        value: A.verticalAnchor
      }
    },
    children: [...A.noAutoFit ? [new CA("a:noAutofit", A.noAutoFit)] : []]
  });
}, Rw = (A = { txBox: "1" }) => new bA({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: A.txBox
  } }
}), Ow = (A) => new bA({
  name: "w:txbxContent",
  children: [...A]
}), Nw = (A) => new bA({
  name: "wps:txbx",
  children: [Ow(A)]
}), kw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, Kw = class extends mA {
  constructor(A, i) {
    super("a:ext"), hA(this, "attributes", void 0), this.attributes = new kw({
      cx: A,
      cy: i
    }), this.root.push(this.attributes);
  }
}, Mw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, Pw = class extends mA {
  constructor(A, i) {
    super("a:off"), this.root.push(new Mw({
      x: A ?? 0,
      y: i ?? 0
    }));
  }
}, Gw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, Pl = class extends mA {
  constructor(A) {
    var i, n, c, h;
    super("a:xfrm"), hA(this, "extents", void 0), hA(this, "offset", void 0), this.root.push(new Gw({
      flipVertical: (i = A.flip) === null || i === void 0 ? void 0 : i.vertical,
      flipHorizontal: (n = A.flip) === null || n === void 0 ? void 0 : n.horizontal,
      rotation: A.rotation
    })), this.offset = new Pw((c = A.offset) === null || c === void 0 || (c = c.emus) === null || c === void 0 ? void 0 : c.x, (h = A.offset) === null || h === void 0 || (h = h.emus) === null || h === void 0 ? void 0 : h.y), this.extents = new Kw(A.emus.x, A.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, Gl = () => new bA({ name: "a:noFill" }), Vw = (A) => new bA({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: A.value
  } }
}), Ww = (A) => new bA({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: A.value
  } }
}), us = (A) => new bA({
  name: "a:solidFill",
  children: [A.type === "rgb" ? Vw(A) : Ww(A)]
}), Xw = (A) => new bA({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: A.width
    },
    cap: {
      key: "cap",
      value: A.cap
    },
    compoundLine: {
      key: "cmpd",
      value: A.compoundLine
    },
    align: {
      key: "algn",
      value: A.align
    }
  },
  children: [A.type === "noFill" ? Gl() : A.solidFillType === "rgb" ? us({
    type: "rgb",
    value: A.value
  }) : us({
    type: "scheme",
    value: A.value
  })]
}), jw = class extends mA {
  constructor() {
    super("a:avLst");
  }
}, zw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { prst: "prst" });
  }
}, Jw = class extends mA {
  constructor() {
    super("a:prstGeom"), this.root.push(new zw({ prst: "rect" })), this.root.push(new jw());
  }
}, Yw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, Vl = class extends mA {
  constructor({ element: A, outline: i, solidFill: n, transform: c }) {
    super(`${A}:spPr`), hA(this, "form", void 0), this.root.push(new Yw({ bwMode: "auto" })), this.form = new Pl(c), this.root.push(this.form), this.root.push(new Jw()), i && (this.root.push(Gl()), this.root.push(Xw(i))), n && this.root.push(us(n));
  }
}, So = (A) => new bA({
  name: "wps:wsp",
  children: [
    Rw(A.nonVisualProperties),
    new Vl({
      element: "wps",
      transform: A.transformation,
      outline: A.outline,
      solidFill: A.solidFill
    }),
    Nw(A.children),
    Dw(A.bodyProperties)
  ]
}), Wi = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { uri: "uri" });
  }
}, Zw = (A) => new bA({
  name: "asvg:svgBlip",
  attributes: {
    asvg: {
      key: "xmlns:asvg",
      value: "http://schemas.microsoft.com/office/drawing/2016/SVG/main"
    },
    embed: {
      key: "r:embed",
      value: `rId{${A.fileName}}`
    }
  }
}), qw = (A) => new bA({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [Zw(A)]
}), $w = (A) => new bA({
  name: "a:extLst",
  children: [qw(A)]
}), AB = (A) => new bA({
  name: "a:blip",
  attributes: {
    embed: {
      key: "r:embed",
      value: `rId{${A.type === "svg" ? A.fallback.fileName : A.fileName}}`
    },
    cstate: {
      key: "cstate",
      value: "none"
    }
  },
  children: A.type === "svg" ? [$w(A)] : []
}), eB = class extends mA {
  constructor() {
    super("a:srcRect");
  }
}, tB = class extends mA {
  constructor() {
    super("a:fillRect");
  }
}, rB = class extends mA {
  constructor() {
    super("a:stretch"), this.root.push(new tB());
  }
}, nB = class extends mA {
  constructor(A) {
    super("pic:blipFill"), this.root.push(AB(A)), this.root.push(new eB()), this.root.push(new rB());
  }
}, iB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, sB = class extends mA {
  constructor() {
    super("a:picLocks"), this.root.push(new iB({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, aB = class extends mA {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new sB());
  }
}, Wl = (A, i) => new bA({
  name: "a:hlinkClick",
  attributes: UA(UA({}, i ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${A}`
  } })
}), oB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, lB = class extends mA {
  constructor() {
    super("pic:cNvPr"), this.root.push(new oB({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(A) {
    for (let i = A.stack.length - 1; i >= 0; i--) {
      const n = A.stack[i];
      if (n instanceof Ai) {
        this.root.push(Wl(n.linkId, !1));
        break;
      }
    }
    return super.prepForXml(A);
  }
}, uB = class extends mA {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new lB()), this.root.push(new aB());
  }
}, cB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, Ho = class extends mA {
  constructor({ mediaData: A, transform: i, outline: n }) {
    super("pic:pic"), this.root.push(new cB({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new uB()), this.root.push(new nB(A)), this.root.push(new Vl({
      element: "pic",
      transform: i,
      outline: n
    }));
  }
}, hB = (A) => new bA({
  name: "wpg:grpSpPr",
  children: [new Pl(A)]
}), fB = () => new bA({ name: "wpg:cNvGrpSpPr" }), dB = (A) => new bA({
  name: "wpg:wgp",
  children: [
    fB(),
    hB(A.transformation),
    ...A.children
  ]
}), pB = class extends mA {
  constructor({ mediaData: A, transform: i, outline: n, solidFill: c }) {
    if (super("a:graphicData"), A.type === "wps") {
      this.root.push(new Wi({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const h = So(UA(UA({}, A.data), {}, {
        transformation: i,
        outline: n,
        solidFill: c
      }));
      this.root.push(h);
    } else if (A.type === "wpg") {
      this.root.push(new Wi({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const h = dB({
        children: A.children.map((f) => f.type === "wps" ? So(UA(UA({}, f.data), {}, {
          transformation: f.transformation,
          outline: f.outline,
          solidFill: f.solidFill
        })) : new Ho({
          mediaData: f,
          transform: f.transformation,
          outline: f.outline
        })),
        transformation: i
      });
      this.root.push(h);
    } else {
      this.root.push(new Wi({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const h = new Ho({
        mediaData: A,
        transform: i,
        outline: n
      });
      this.root.push(h);
    }
  }
}, gB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { a: "xmlns:a" });
  }
}, Xl = class extends mA {
  constructor({ mediaData: A, transform: i, outline: n, solidFill: c }) {
    super("a:graphic"), hA(this, "data", void 0), this.root.push(new gB({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new pB({
      mediaData: A,
      transform: i,
      outline: n,
      solidFill: c
    }), this.root.push(this.data);
  }
}, Nn = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
}, wB = {
  BOTH_SIDES: "bothSides",
  LEFT: "left",
  RIGHT: "right",
  LARGEST: "largest"
}, Lo = () => new bA({ name: "wp:wrapNone" }), BB = (A, i = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new bA({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: A.side || wB.BOTH_SIDES
    },
    distT: {
      key: "distT",
      value: i.top
    },
    distB: {
      key: "distB",
      value: i.bottom
    },
    distL: {
      key: "distL",
      value: i.left
    },
    distR: {
      key: "distR",
      value: i.right
    }
  }
}), mB = (A = {
  top: 0,
  bottom: 0
}) => new bA({
  name: "wp:wrapTight",
  attributes: {
    distT: {
      key: "distT",
      value: A.top
    },
    distB: {
      key: "distB",
      value: A.bottom
    }
  }
}), vB = (A = {
  top: 0,
  bottom: 0
}) => new bA({
  name: "wp:wrapTopAndBottom",
  attributes: {
    distT: {
      key: "distT",
      value: A.top
    },
    distB: {
      key: "distB",
      value: A.bottom
    }
  }
}), jl = class extends mA {
  constructor({ name: A, description: i, title: n, id: c } = {
    name: "",
    description: "",
    title: ""
  }) {
    super("wp:docPr"), hA(this, "docPropertiesUniqueNumericId", bw());
    const h = {
      id: {
        key: "id",
        value: c ?? this.docPropertiesUniqueNumericId()
      },
      name: {
        key: "name",
        value: A
      }
    };
    i != null && (h.description = {
      key: "descr",
      value: i
    }), n != null && (h.title = {
      key: "title",
      value: n
    }), this.root.push(new al(h));
  }
  prepForXml(A) {
    for (let i = A.stack.length - 1; i >= 0; i--) {
      const n = A.stack[i];
      if (n instanceof Ai) {
        this.root.push(Wl(n.linkId, !0));
        break;
      }
    }
    return super.prepForXml(A);
  }
}, zl = ({ top: A, right: i, bottom: n, left: c }) => new bA({
  name: "wp:effectExtent",
  attributes: {
    top: {
      key: "t",
      value: A
    },
    right: {
      key: "r",
      value: i
    },
    bottom: {
      key: "b",
      value: n
    },
    left: {
      key: "l",
      value: c
    }
  }
}), Jl = ({ x: A, y: i }) => new bA({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: A
    },
    y: {
      key: "cy",
      value: i
    }
  }
}), yB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, CB = class extends mA {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new yB({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, Yl = () => new bA({
  name: "wp:cNvGraphicFramePr",
  children: [new CB()]
}), FB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      distT: "distT",
      distB: "distB",
      distL: "distL",
      distR: "distR",
      allowOverlap: "allowOverlap",
      behindDoc: "behindDoc",
      layoutInCell: "layoutInCell",
      locked: "locked",
      relativeHeight: "relativeHeight",
      simplePos: "simplePos"
    });
  }
}, EB = class extends mA {
  constructor({ mediaData: A, transform: i, drawingOptions: n }) {
    super("wp:anchor");
    const c = UA({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, n.floating);
    if (this.root.push(new FB({
      distT: c.margins && c.margins.top || 0,
      distB: c.margins && c.margins.bottom || 0,
      distL: c.margins && c.margins.left || 0,
      distR: c.margins && c.margins.right || 0,
      simplePos: "0",
      allowOverlap: c.allowOverlap === !0 ? "1" : "0",
      behindDoc: c.behindDocument === !0 ? "1" : "0",
      locked: c.lockAnchor === !0 ? "1" : "0",
      layoutInCell: c.layoutInCell === !0 ? "1" : "0",
      relativeHeight: c.zIndex ? c.zIndex : i.emus.y
    })), this.root.push(Sw()), this.root.push(Hw(c.horizontalPosition)), this.root.push(Lw(c.verticalPosition)), this.root.push(Jl({
      x: i.emus.x,
      y: i.emus.y
    })), this.root.push(zl({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), n.floating !== void 0 && n.floating.wrap !== void 0) switch (n.floating.wrap.type) {
      case Nn.SQUARE:
        this.root.push(BB(n.floating.wrap, n.floating.margins));
        break;
      case Nn.TIGHT:
        this.root.push(mB(n.floating.margins));
        break;
      case Nn.TOP_AND_BOTTOM:
        this.root.push(vB(n.floating.margins));
        break;
      case Nn.NONE:
      default:
        this.root.push(Lo());
    }
    else this.root.push(Lo());
    this.root.push(new jl(n.docProperties)), this.root.push(Yl()), this.root.push(new Xl({
      mediaData: A,
      transform: i,
      outline: n.outline,
      solidFill: n.solidFill
    }));
  }
}, QB = ({ mediaData: A, transform: i, docProperties: n, outline: c, solidFill: h }) => {
  var f, a, o, d;
  return new bA({
    name: "wp:inline",
    attributes: {
      distanceTop: {
        key: "distT",
        value: 0
      },
      distanceBottom: {
        key: "distB",
        value: 0
      },
      distanceLeft: {
        key: "distL",
        value: 0
      },
      distanceRight: {
        key: "distR",
        value: 0
      }
    },
    children: [
      Jl({
        x: i.emus.x,
        y: i.emus.y
      }),
      zl(c ? {
        top: ((f = c.width) !== null && f !== void 0 ? f : 9525) * 2,
        right: ((a = c.width) !== null && a !== void 0 ? a : 9525) * 2,
        bottom: ((o = c.width) !== null && o !== void 0 ? o : 9525) * 2,
        left: ((d = c.width) !== null && d !== void 0 ? d : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }),
      new jl(n),
      Yl(),
      new Xl({
        mediaData: A,
        transform: i,
        outline: c,
        solidFill: h
      })
    ]
  });
}, UB = class extends mA {
  constructor(A, i = {}) {
    super("w:drawing"), i.floating ? this.root.push(new EB({
      mediaData: A,
      transform: A.transformation,
      drawingOptions: i
    })) : this.root.push(QB({
      mediaData: A,
      transform: A.transformation,
      docProperties: i.docProperties,
      outline: i.outline,
      solidFill: i.solidFill
    }));
  }
}, bB = (A) => {
  const i = A.indexOf(";base64,"), n = i === -1 ? 0 : i + 8;
  return new Uint8Array(atob(A.substring(n)).split("").map((c) => c.charCodeAt(0)));
}, IB = (A) => typeof A == "string" ? bB(A) : A, Xi = (A, i) => ({
  data: IB(A.data),
  fileName: i,
  transformation: {
    pixels: {
      x: Math.round(A.transformation.width),
      y: Math.round(A.transformation.height)
    },
    emus: {
      x: Math.round(A.transformation.width * 9525),
      y: Math.round(A.transformation.height * 9525)
    },
    flip: A.transformation.flip,
    rotation: A.transformation.rotation ? A.transformation.rotation * 6e4 : void 0
  }
}), _B = class extends mA {
  constructor(A) {
    var i = (...a) => (super(...a), hA(this, "imageData", void 0), this);
    const n = `${To(A.data)}.${A.type}`, c = A.type === "svg" ? UA(UA({ type: A.type }, Xi(A, n)), {}, { fallback: UA({ type: A.fallback.type }, Xi(UA(UA({}, A.fallback), {}, { transformation: A.transformation }), `${To(A.fallback.data)}.${A.fallback.type}`)) }) : UA({ type: A.type }, Xi(A, n)), h = new UB(c, {
      floating: A.floating,
      docProperties: A.altText,
      outline: A.outline
    }), f = new Gt({ children: [h] });
    A.insertion ? (i("w:ins"), this.root.push(new Qe({
      id: A.insertion.id,
      author: A.insertion.author,
      date: A.insertion.date
    })), this.addChildElement(f)) : A.deletion ? (i("w:del"), this.root.push(new Qe({
      id: A.deletion.id,
      author: A.deletion.author,
      date: A.deletion.date
    })), this.addChildElement(f)) : (i("w:r"), this.root.push(new Ct({})), this.root.push(h)), this.imageData = c;
  }
  prepForXml(A) {
    return A.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && A.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(A);
  }
}, xB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Zl = { EXTERNAL: "External" }, TB = (A, i, n, c) => new bA({
  name: "Relationship",
  attributes: {
    id: {
      key: "Id",
      value: A
    },
    type: {
      key: "Type",
      value: i
    },
    target: {
      key: "Target",
      value: n
    },
    targetMode: {
      key: "TargetMode",
      value: c
    }
  }
}), Ft = class extends mA {
  constructor() {
    super("Relationships"), this.root.push(new xB({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  addRelationship(A, i, n, c) {
    this.root.push(TB(`rId${A}`, i, n, c));
  }
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, SB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, HB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      "xmlns:cx": "xmlns:cx",
      "xmlns:cx1": "xmlns:cx1",
      "xmlns:cx2": "xmlns:cx2",
      "xmlns:cx3": "xmlns:cx3",
      "xmlns:cx4": "xmlns:cx4",
      "xmlns:cx5": "xmlns:cx5",
      "xmlns:cx6": "xmlns:cx6",
      "xmlns:cx7": "xmlns:cx7",
      "xmlns:cx8": "xmlns:cx8",
      "xmlns:mc": "xmlns:mc",
      "xmlns:aink": "xmlns:aink",
      "xmlns:am3d": "xmlns:am3d",
      "xmlns:o": "xmlns:o",
      "xmlns:r": "xmlns:r",
      "xmlns:m": "xmlns:m",
      "xmlns:v": "xmlns:v",
      "xmlns:wp14": "xmlns:wp14",
      "xmlns:wp": "xmlns:wp",
      "xmlns:w10": "xmlns:w10",
      "xmlns:w": "xmlns:w",
      "xmlns:w14": "xmlns:w14",
      "xmlns:w15": "xmlns:w15",
      "xmlns:w16cex": "xmlns:w16cex",
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:w16": "xmlns:w16",
      "xmlns:w16sdtdh": "xmlns:w16sdtdh",
      "xmlns:w16se": "xmlns:w16se",
      "xmlns:wpg": "xmlns:wpg",
      "xmlns:wpi": "xmlns:wpi",
      "xmlns:wne": "xmlns:wne",
      "xmlns:wps": "xmlns:wps"
    });
  }
}, Do = class extends mA {
  constructor({ id: A, initials: i, author: n, date: c = /* @__PURE__ */ new Date(), children: h }, f) {
    super("w:comment"), hA(this, "paraId", void 0), this.paraId = f, this.root.push(new SB({
      id: A,
      initials: i,
      author: n,
      date: c.toISOString()
    }));
    for (const a of h) this.root.push(a);
  }
  prepForXml(A) {
    const i = super.prepForXml(A);
    if (!i || !this.paraId) return i;
    const n = i["w:comment"];
    if (!Array.isArray(n)) return i;
    for (let c = n.length - 1; c >= 0; c--) {
      const h = n[c];
      if (h && typeof h == "object" && "w:p" in h) {
        const f = h["w:p"];
        Array.isArray(f) && f.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return i;
  }
}, LB = (A) => (A + 1).toString(16).toUpperCase().padStart(8, "0"), DB = class extends mA {
  constructor({ children: A }) {
    if (super("w:comments"), hA(this, "relationships", void 0), hA(this, "threadData", void 0), this.root.push(new HB({
      "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
      "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
      "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
      "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
      "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
      "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
      "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
      "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
      "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
      "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
      "xmlns:o": "urn:schemas-microsoft-com:office:office",
      "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      "xmlns:w10": "urn:schemas-microsoft-com:office:word",
      "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml",
      "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
      "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
      "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
      "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    })), A.some((i) => i.parentId !== void 0)) {
      const i = new Map(A.map((n) => [n.id, LB(n.id)]));
      for (const n of A) this.root.push(new Do(n, i.get(n.id)));
      this.threadData = A.map((n) => ({
        paraId: i.get(n.id),
        parentParaId: n.parentId !== void 0 ? i.get(n.parentId) : void 0,
        done: n.resolved
      }));
    } else for (const i of A) this.root.push(new Do(i));
    this.relationships = new Ft();
  }
  get Relationships() {
    return this.relationships;
  }
  get ThreadData() {
    return this.threadData;
  }
}, RB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, OB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, NB = class extends mA {
  constructor(A) {
    super("w15:commentEx"), this.root.push(new OB({
      paraId: A.paraId,
      paraIdParent: A.parentParaId,
      done: A.done !== void 0 ? A.done ? "1" : "0" : void 0
    }));
  }
}, kB = class extends mA {
  constructor(A) {
    super("w15:commentsEx"), this.root.push(new RB({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const i of A) this.root.push(new NB(i));
  }
}, KB = class extends Xg {
  constructor() {
    super("w:endnoteRef");
  }
}, MB = {
  COLUMN: "column",
  PAGE: "page"
}, PB = class extends mA {
  constructor(A) {
    super("w:br"), this.root.push(new ge({ type: A }));
  }
}, GB = class extends Gt {
  constructor() {
    super({}), this.root.push(new PB(MB.PAGE));
  }
}, VB = class extends mA {
  constructor() {
    super("w:pageBreakBefore");
  }
}, dr = {
  AT_LEAST: "atLeast",
  EXACTLY: "exactly",
  EXACT: "exact",
  AUTO: "auto"
}, WB = ({ after: A, before: i, line: n, lineRule: c, beforeAutoSpacing: h, afterAutoSpacing: f }) => new bA({
  name: "w:spacing",
  attributes: {
    after: {
      key: "w:after",
      value: A
    },
    before: {
      key: "w:before",
      value: i
    },
    line: {
      key: "w:line",
      value: n
    },
    lineRule: {
      key: "w:lineRule",
      value: c
    },
    beforeAutoSpacing: {
      key: "w:beforeAutospacing",
      value: h
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: f
    }
  }
}), rr = {
  HEADING_1: "Heading1",
  HEADING_2: "Heading2",
  HEADING_3: "Heading3",
  HEADING_4: "Heading4",
  HEADING_5: "Heading5",
  HEADING_6: "Heading6",
  TITLE: "Title"
}, Kr = (A) => new bA({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), Ro = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
  BAR: "bar",
  CLEAR: "clear",
  DECIMAL: "decimal",
  END: "end",
  NUM: "num",
  START: "start"
}, XB = ({ type: A, position: i, leader: n }) => new bA({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: A
    },
    pos: {
      key: "w:pos",
      value: i
    },
    leader: {
      key: "w:leader",
      value: n
    }
  }
}), jB = (A) => new bA({
  name: "w:tabs",
  children: A.map((i) => XB(i))
}), ji = class extends mA {
  constructor(A, i) {
    super("w:numPr"), this.root.push(new zB(i)), this.root.push(new JB(A));
  }
}, zB = class extends mA {
  constructor(A) {
    if (super("w:ilvl"), A > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new ge({ val: A }));
  }
}, JB = class extends mA {
  constructor(A) {
    super("w:numId"), this.root.push(new ge({ val: typeof A == "string" ? `{${A}}` : A }));
  }
}, ql = class extends mA {
  constructor(...A) {
    super(...A), hA(this, "fileChild", /* @__PURE__ */ Symbol());
  }
}, YB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, Ai = class extends mA {
  constructor(A, i, n) {
    super("w:hyperlink"), hA(this, "linkId", void 0), this.linkId = i;
    const c = new YB({
      history: 1,
      anchor: n || void 0,
      id: n ? void 0 : `rId${this.linkId}`
    });
    this.root.push(c), A.forEach((h) => {
      this.root.push(h);
    });
  }
}, $l = class extends mA {
  constructor(A) {
    super("w:externalHyperlink"), hA(this, "options", void 0), this.options = A;
  }
}, ZB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, qB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { id: "w:id" });
  }
}, $B = class {
  constructor(A) {
    hA(this, "bookmarkUniqueNumericId", Iw()), hA(this, "start", void 0), hA(this, "children", void 0), hA(this, "end", void 0);
    const i = this.bookmarkUniqueNumericId();
    this.start = new Am(A.id, i), this.children = A.children, this.end = new em(i);
  }
}, Am = class extends mA {
  constructor(A, i) {
    super("w:bookmarkStart");
    const n = new ZB({
      name: A,
      id: i
    });
    this.root.push(n);
  }
}, em = class extends mA {
  constructor(A) {
    super("w:bookmarkEnd");
    const i = new qB({ id: A });
    this.root.push(i);
  }
}, tm = (A) => new bA({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), kn = ({ id: A, fontKey: i, subsetted: n }, c) => new bA({
  name: c,
  attributes: UA({ id: {
    key: "r:id",
    value: A
  } }, i ? { fontKey: {
    key: "w:fontKey",
    value: `{${i}}`
  } } : {}),
  children: [...n ? [new CA("w:subsetted", n)] : []]
}), rm = ({ name: A, altName: i, panose1: n, charset: c, family: h, notTrueType: f, pitch: a, sig: o, embedRegular: d, embedBold: U, embedItalic: b, embedBoldItalic: v }) => new bA({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: A
  } },
  children: [
    ...i ? [Rr("w:altName", i)] : [],
    ...n ? [Rr("w:panose1", n)] : [],
    ...c ? [Rr("w:charset", c)] : [],
    ...h ? [Rr("w:family", h)] : [],
    ...f ? [new CA("w:notTrueType", f)] : [],
    ...a ? [Rr("w:pitch", a)] : [],
    ...o ? [new bA({
      name: "w:sig",
      attributes: {
        usb0: {
          key: "w:usb0",
          value: o.usb0
        },
        usb1: {
          key: "w:usb1",
          value: o.usb1
        },
        usb2: {
          key: "w:usb2",
          value: o.usb2
        },
        usb3: {
          key: "w:usb3",
          value: o.usb3
        },
        csb0: {
          key: "w:csb0",
          value: o.csb0
        },
        csb1: {
          key: "w:csb1",
          value: o.csb1
        }
      }
    })] : [],
    ...d ? [kn(d, "w:embedRegular")] : [],
    ...U ? [kn(U, "w:embedBold")] : [],
    ...b ? [kn(b, "w:embedItalic")] : [],
    ...v ? [kn(v, "w:embedBoldItalic")] : []
  ]
}), nm = ({ name: A, index: i, fontKey: n, characterSet: c }) => rm({
  name: A,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: c,
  family: "auto",
  pitch: "variable",
  embedRegular: {
    fontKey: n,
    id: `rId${i}`
  }
}), im = (A) => new bA({
  name: "w:fonts",
  attributes: {
    mc: {
      key: "xmlns:mc",
      value: "http://schemas.openxmlformats.org/markup-compatibility/2006"
    },
    r: {
      key: "xmlns:r",
      value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    },
    w: {
      key: "xmlns:w",
      value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    },
    w14: {
      key: "xmlns:w14",
      value: "http://schemas.microsoft.com/office/word/2010/wordml"
    },
    w15: {
      key: "xmlns:w15",
      value: "http://schemas.microsoft.com/office/word/2012/wordml"
    },
    w16cex: {
      key: "xmlns:w16cex",
      value: "http://schemas.microsoft.com/office/word/2018/wordml/cex"
    },
    w16cid: {
      key: "xmlns:w16cid",
      value: "http://schemas.microsoft.com/office/word/2016/wordml/cid"
    },
    w16: {
      key: "xmlns:w16",
      value: "http://schemas.microsoft.com/office/word/2018/wordml"
    },
    w16sdtdh: {
      key: "xmlns:w16sdtdh",
      value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash"
    },
    w16se: {
      key: "xmlns:w16se",
      value: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
    },
    Ignorable: {
      key: "mc:Ignorable",
      value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh"
    }
  },
  children: A.map((i, n) => nm({
    name: i.name,
    index: n + 1,
    fontKey: i.fontKey,
    characterSet: i.characterSet
  }))
}), Au = class {
  constructor(A) {
    hA(this, "options", void 0), hA(this, "fontTable", void 0), hA(this, "relationships", void 0), hA(this, "fontOptionsWithKey", []), this.options = A, this.fontOptionsWithKey = A.map((i) => UA(UA({}, i), {}, { fontKey: _w() })), this.fontTable = im(this.fontOptionsWithKey), this.relationships = new Ft();
    for (let i = 0; i < A.length; i++) this.relationships.addRelationship(i + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${i + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, sm = () => new bA({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), am = (A) => {
  var i, n;
  return new bA({
    name: "w:framePr",
    attributes: {
      anchorLock: {
        key: "w:anchorLock",
        value: A.anchorLock
      },
      dropCap: {
        key: "w:dropCap",
        value: A.dropCap
      },
      width: {
        key: "w:w",
        value: A.width
      },
      height: {
        key: "w:h",
        value: A.height
      },
      x: {
        key: "w:x",
        value: A.position ? A.position.x : void 0
      },
      y: {
        key: "w:y",
        value: A.position ? A.position.y : void 0
      },
      anchorHorizontal: {
        key: "w:hAnchor",
        value: A.anchor.horizontal
      },
      anchorVertical: {
        key: "w:vAnchor",
        value: A.anchor.vertical
      },
      spaceHorizontal: {
        key: "w:hSpace",
        value: (i = A.space) === null || i === void 0 ? void 0 : i.horizontal
      },
      spaceVertical: {
        key: "w:vSpace",
        value: (n = A.space) === null || n === void 0 ? void 0 : n.vertical
      },
      rule: {
        key: "w:hRule",
        value: A.rule
      },
      alignmentX: {
        key: "w:xAlign",
        value: A.alignment ? A.alignment.x : void 0
      },
      alignmentY: {
        key: "w:yAlign",
        value: A.alignment ? A.alignment.y : void 0
      },
      lines: {
        key: "w:lines",
        value: A.lines
      },
      wrap: {
        key: "w:wrap",
        value: A.wrap
      }
    }
  });
}, Kt = class extends mt {
  constructor(A) {
    if (super("w:pPr", A?.includeIfEmpty), hA(this, "numberingReferences", []), !A) return this;
    if (A.heading && this.push(Kr(A.heading)), A.bullet && this.push(Kr("ListParagraph")), A.numbering && !A.style && !A.heading && (A.numbering.custom || this.push(Kr("ListParagraph"))), A.style && this.push(Kr(A.style)), A.keepNext !== void 0 && this.push(new CA("w:keepNext", A.keepNext)), A.keepLines !== void 0 && this.push(new CA("w:keepLines", A.keepLines)), A.pageBreakBefore && this.push(new VB()), A.frame && this.push(am(A.frame)), A.widowControl !== void 0 && this.push(new CA("w:widowControl", A.widowControl)), A.bullet && this.push(new ji(1, A.bullet.level)), A.numbering) {
      var i, n;
      this.numberingReferences.push({
        reference: A.numbering.reference,
        instance: (i = A.numbering.instance) !== null && i !== void 0 ? i : 0
      }), this.push(new ji(`${A.numbering.reference}-${(n = A.numbering.instance) !== null && n !== void 0 ? n : 0}`, A.numbering.level));
    } else A.numbering === !1 && this.push(new ji(0, 0));
    A.border && this.push(new jg(A.border)), A.thematicBreak && this.push(new zg()), A.shading && this.push(qn(A.shading)), A.wordWrap && this.push(sm()), A.overflowPunctuation && this.push(new CA("w:overflowPunct", A.overflowPunctuation));
    const c = [
      ...A.rightTabStop !== void 0 ? [{
        type: Ro.RIGHT,
        position: A.rightTabStop
      }] : [],
      ...A.tabStops ? A.tabStops : [],
      ...A.leftTabStop !== void 0 ? [{
        type: Ro.LEFT,
        position: A.leftTabStop
      }] : []
    ];
    c.length > 0 && this.push(jB(c)), A.bidirectional !== void 0 && this.push(new CA("w:bidi", A.bidirectional)), A.spacing && this.push(WB(A.spacing)), A.indent && this.push(Jg(A.indent)), A.contextualSpacing !== void 0 && this.push(new CA("w:contextualSpacing", A.contextualSpacing)), A.alignment && this.push(Hl(A.alignment)), A.outlineLevel !== void 0 && this.push(tm(A.outlineLevel)), A.suppressLineNumbers !== void 0 && this.push(new CA("w:suppressLineNumbers", A.suppressLineNumbers)), A.autoSpaceEastAsianText !== void 0 && this.push(new CA("w:autoSpaceDN", A.autoSpaceEastAsianText)), A.run && this.push(new fw(A.run)), A.revision && this.push(new om(A.revision));
  }
  push(A) {
    this.root.push(A);
  }
  prepForXml(A) {
    if (!(A.viewWrapper instanceof Au)) for (const i of this.numberingReferences) A.file.Numbering.createConcreteNumberingInstance(i.reference, i.instance);
    return super.prepForXml(A);
  }
}, om = class extends mA {
  constructor(A) {
    super("w:pPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new Kt(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, Le = class extends ql {
  constructor(A) {
    if (super("w:p"), hA(this, "properties", void 0), typeof A == "string")
      return this.properties = new Kt({}), this.root.push(this.properties), this.root.push(new je(A)), this;
    if (this.properties = new Kt(A), this.root.push(this.properties), A.text && this.root.push(new je(A.text)), A.children) for (const i of A.children) {
      if (i instanceof $B) {
        this.root.push(i.start);
        for (const n of i.children) this.root.push(n);
        this.root.push(i.end);
        continue;
      }
      this.root.push(i);
    }
  }
  prepForXml(A) {
    for (const i of this.root) if (i instanceof $l) {
      const n = this.root.indexOf(i), c = new Ai(i.options.children, kl());
      A.viewWrapper.Relationships.addRelationship(c.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", i.options.link, Zl.EXTERNAL), this.root[n] = c;
    }
    return super.prepForXml(A);
  }
  addRunToFront(A) {
    return this.root.splice(1, 0, A), this;
  }
}, lm = (A) => new bA({
  name: "w:gridCol",
  attributes: A !== void 0 ? { width: {
    key: "w:w",
    value: de(A)
  } } : void 0
}), eu = class extends mA {
  constructor(A, i) {
    super("w:tblGrid");
    for (const n of A) this.root.push(lm(n));
    i && this.root.push(new cm(i));
  }
}, um = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { id: "w:id" });
  }
}, cm = class extends mA {
  constructor(A) {
    super("w:tblGridChange"), this.root.push(new um({ id: A.id })), this.root.push(new eu(A.columnWidths));
  }
}, hm = class extends mA {
  constructor(A) {
    super("w:ins"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, fm = class extends mA {
  constructor(A) {
    super("w:del"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, dm = class extends mA {
  constructor(A) {
    super("w:cellIns"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, pm = class extends mA {
  constructor(A) {
    super("w:cellDel"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, gm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, wm = class extends mA {
  constructor(A) {
    super("w:cellMerge"), this.root.push(new gm(A));
  }
}, tu = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, Qy = UA(UA({}, tu), {}, { BOTH: "both" }), ru = (A) => new bA({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: A
  } }
}), nu = ({ marginUnitType: A = Mt.DXA, top: i, left: n, bottom: c, right: h }) => [
  {
    name: "w:top",
    size: i
  },
  {
    name: "w:left",
    size: n
  },
  {
    name: "w:bottom",
    size: c
  },
  {
    name: "w:right",
    size: h
  }
].filter((f) => f.size !== void 0).map(({ name: f, size: a }) => Gn(f, {
  type: A,
  size: a
})), Bm = (A) => {
  const i = nu(A);
  if (i.length !== 0)
    return new bA({
      name: "w:tblCellMar",
      children: i
    });
}, mm = (A) => {
  const i = nu(A);
  if (i.length !== 0)
    return new bA({
      name: "w:tcMar",
      children: i
    });
}, Mt = {
  AUTO: "auto",
  DXA: "dxa",
  NIL: "nil",
  PERCENTAGE: "pct"
}, Gn = (A, { type: i = Mt.AUTO, size: n }) => {
  let c = n;
  return i === Mt.PERCENTAGE && typeof n == "number" && (c = `${n}%`), new bA({
    name: A,
    attributes: {
      type: {
        key: "w:type",
        value: i
      },
      size: {
        key: "w:w",
        value: Sl(c)
      }
    }
  });
}, vm = class extends mt {
  constructor(A) {
    super("w:tcBorders"), A.top && this.root.push(re("w:top", A.top)), A.start && this.root.push(re("w:start", A.start)), A.left && this.root.push(re("w:left", A.left)), A.bottom && this.root.push(re("w:bottom", A.bottom)), A.end && this.root.push(re("w:end", A.end)), A.right && this.root.push(re("w:right", A.right));
  }
}, ym = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Cm = class extends mA {
  constructor(A) {
    super("w:gridSpan"), this.root.push(new ym({ val: pe(A) }));
  }
}, iu = {
  CONTINUE: "continue",
  RESTART: "restart"
}, Fm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Oo = class extends mA {
  constructor(A) {
    super("w:vMerge"), this.root.push(new Fm({ val: A }));
  }
}, Em = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Qm = class extends mA {
  constructor(A) {
    super("w:textDirection"), this.root.push(new Em({ val: A }));
  }
}, su = class extends mt {
  constructor(A) {
    if (super("w:tcPr", A.includeIfEmpty), A.width && this.root.push(Gn("w:tcW", A.width)), A.columnSpan && this.root.push(new Cm(A.columnSpan)), A.verticalMerge ? this.root.push(new Oo(A.verticalMerge)) : A.rowSpan && A.rowSpan > 1 && this.root.push(new Oo(iu.RESTART)), A.borders && this.root.push(new vm(A.borders)), A.shading && this.root.push(qn(A.shading)), A.margins) {
      const i = mm(A.margins);
      i && this.root.push(i);
    }
    A.textDirection && this.root.push(new Qm(A.textDirection)), A.verticalAlign && this.root.push(ru(A.verticalAlign)), A.insertion && this.root.push(new dm(A.insertion)), A.deletion && this.root.push(new pm(A.deletion)), A.revision && this.root.push(new Um(A.revision)), A.cellMerge && this.root.push(new wm(A.cellMerge));
  }
}, Um = class extends mA {
  constructor(A) {
    super("w:tcPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new su(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, xs = class extends mA {
  constructor(A) {
    super("w:tc"), hA(this, "options", void 0), this.options = A, this.root.push(new su(A));
    for (const i of A.children) this.root.push(i);
  }
  prepForXml(A) {
    return this.root[this.root.length - 1] instanceof Le || this.root.push(new Le({})), super.prepForXml(A);
  }
}, nr = {
  style: wr.NONE,
  size: 0,
  color: "auto"
}, ir = {
  style: wr.SINGLE,
  size: 4,
  color: "auto"
}, au = class extends mA {
  constructor(A) {
    var i, n, c, h, f, a;
    super("w:tblBorders"), this.root.push(re("w:top", (i = A.top) !== null && i !== void 0 ? i : ir)), this.root.push(re("w:left", (n = A.left) !== null && n !== void 0 ? n : ir)), this.root.push(re("w:bottom", (c = A.bottom) !== null && c !== void 0 ? c : ir)), this.root.push(re("w:right", (h = A.right) !== null && h !== void 0 ? h : ir)), this.root.push(re("w:insideH", (f = A.insideHorizontal) !== null && f !== void 0 ? f : ir)), this.root.push(re("w:insideV", (a = A.insideVertical) !== null && a !== void 0 ? a : ir));
  }
};
hA(au, "NONE", {
  top: nr,
  bottom: nr,
  left: nr,
  right: nr,
  insideHorizontal: nr,
  insideVertical: nr
});
var bm = (A) => new bA({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), Im = ({ horizontalAnchor: A, verticalAnchor: i, absoluteHorizontalPosition: n, relativeHorizontalPosition: c, absoluteVerticalPosition: h, relativeVerticalPosition: f, bottomFromText: a, topFromText: o, leftFromText: d, rightFromText: U, overlap: b }) => new bA({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: d === void 0 ? void 0 : de(d)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: U === void 0 ? void 0 : de(U)
    },
    topFromText: {
      key: "w:topFromText",
      value: o === void 0 ? void 0 : de(o)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: a === void 0 ? void 0 : de(a)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: n === void 0 ? void 0 : nt(n)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: h === void 0 ? void 0 : nt(h)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: A
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: c
    },
    relativeVerticalPosition: {
      key: "w:tblpYSpec",
      value: f
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: i
    }
  },
  children: b ? [bm(b)] : void 0
}), ou = {
  AUTOFIT: "autofit",
  FIXED: "fixed"
}, _m = (A) => new bA({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: A
  } }
}), xm = {
  DXA: "dxa",
  NIL: "nil"
}, lu = ({ type: A = xm.DXA, value: i }) => new bA({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: A
    },
    value: {
      key: "w:w",
      value: Sl(i)
    }
  }
}), Tm = ({ firstRow: A, lastRow: i, firstColumn: n, lastColumn: c, noHBand: h, noVBand: f }) => new bA({
  name: "w:tblLook",
  attributes: {
    firstRow: {
      key: "w:firstRow",
      value: A
    },
    lastRow: {
      key: "w:lastRow",
      value: i
    },
    firstColumn: {
      key: "w:firstColumn",
      value: n
    },
    lastColumn: {
      key: "w:lastColumn",
      value: c
    },
    noHBand: {
      key: "w:noHBand",
      value: h
    },
    noVBand: {
      key: "w:noVBand",
      value: f
    }
  }
}), uu = class extends mt {
  constructor(A) {
    if (super("w:tblPr", A.includeIfEmpty), A.style && this.root.push(new kt("w:tblStyle", A.style)), A.float && this.root.push(Im(A.float)), A.visuallyRightToLeft !== void 0 && this.root.push(new CA("w:bidiVisual", A.visuallyRightToLeft)), A.width && this.root.push(Gn("w:tblW", A.width)), A.alignment && this.root.push(Hl(A.alignment)), A.indent && this.root.push(Gn("w:tblInd", A.indent)), A.borders && this.root.push(new au(A.borders)), A.shading && this.root.push(qn(A.shading)), A.layout && this.root.push(_m(A.layout)), A.cellMargin) {
      const i = Bm(A.cellMargin);
      i && this.root.push(i);
    }
    A.tableLook && this.root.push(Tm(A.tableLook)), A.cellSpacing && this.root.push(lu(A.cellSpacing)), A.revision && this.root.push(new Sm(A.revision));
  }
}, Sm = class extends mA {
  constructor(A) {
    super("w:tblPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new uu(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, cu = class extends ql {
  constructor({ rows: A, width: i, columnWidths: n = Array(Math.max(...A.map((w) => w.CellCount))).fill(100), columnWidthsRevision: c, margins: h, indent: f, float: a, layout: o, style: d, borders: U, alignment: b, visuallyRightToLeft: v, tableLook: _, cellSpacing: C, revision: m }) {
    super("w:tbl"), this.root.push(new uu({
      borders: U ?? {},
      width: i ?? { size: 100 },
      indent: f,
      float: a,
      layout: o,
      style: d,
      alignment: b,
      cellMargin: h,
      visuallyRightToLeft: v,
      tableLook: _,
      cellSpacing: C,
      revision: m
    })), this.root.push(new eu(n, c));
    for (const w of A) this.root.push(w);
    A.forEach((w, I) => {
      if (I === A.length - 1) return;
      let T = 0;
      w.cells.forEach((x) => {
        if (x.options.rowSpan && x.options.rowSpan > 1) {
          const N = new xs({
            rowSpan: x.options.rowSpan - 1,
            columnSpan: x.options.columnSpan,
            borders: x.options.borders,
            children: [],
            verticalMerge: iu.CONTINUE
          });
          A[I + 1].addCellToColumnIndex(N, T);
        }
        T += x.options.columnSpan || 1;
      });
    });
  }
}, Hm = (A, i) => new bA({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: de(A)
    },
    rule: {
      key: "w:hRule",
      value: i
    }
  }
}), hu = class extends mt {
  constructor(A) {
    super("w:trPr", A.includeIfEmpty), A.cantSplit !== void 0 && this.root.push(new CA("w:cantSplit", A.cantSplit)), A.tableHeader !== void 0 && this.root.push(new CA("w:tblHeader", A.tableHeader)), A.height && this.root.push(Hm(A.height.value, A.height.rule)), A.cellSpacing && this.root.push(lu(A.cellSpacing)), A.insertion && this.root.push(new hm(A.insertion)), A.deletion && this.root.push(new fm(A.deletion)), A.revision && this.root.push(new Lm(A.revision));
  }
}, Lm = class extends mA {
  constructor(A) {
    super("w:trPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new hu(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, Ts = class extends mA {
  constructor(A) {
    super("w:tr"), hA(this, "options", void 0), this.options = A, this.root.push(new hu(A));
    for (const i of A.children) this.root.push(i);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((A) => A instanceof xs);
  }
  addCellToIndex(A, i) {
    this.root.splice(i + 1, 0, A);
  }
  addCellToColumnIndex(A, i) {
    const n = this.columnIndexToRootIndex(i, !0);
    this.addCellToIndex(A, n - 1);
  }
  rootIndexToColumnIndex(A) {
    if (A < 1 || A >= this.root.length) throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let i = 0;
    for (let n = 1; n < A; n++) {
      const c = this.root[n];
      i += c.options.columnSpan || 1;
    }
    return i;
  }
  columnIndexToRootIndex(A, i = !1) {
    if (A < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let n = 0, c = 1;
    for (; n <= A; ) {
      if (c >= this.root.length) {
        if (i) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${n - 1}`);
      }
      const h = this.root[c];
      c += 1, n += h && h.options.columnSpan || 1;
    }
    return c - 1;
  }
}, Dm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Rm = class extends mA {
  constructor() {
    super("Properties"), this.root.push(new Dm({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, Om = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, tt = (A, i) => new bA({
  name: "Default",
  attributes: {
    contentType: {
      key: "ContentType",
      value: A
    },
    extension: {
      key: "Extension",
      value: i
    }
  }
}), Ee = (A, i) => new bA({
  name: "Override",
  attributes: {
    contentType: {
      key: "ContentType",
      value: A
    },
    partName: {
      key: "PartName",
      value: i
    }
  }
}), Nm = class extends mA {
  constructor() {
    super("Types"), this.root.push(new Om({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(tt("image/png", "png")), this.root.push(tt("image/jpeg", "jpeg")), this.root.push(tt("image/jpeg", "jpg")), this.root.push(tt("image/bmp", "bmp")), this.root.push(tt("image/gif", "gif")), this.root.push(tt("image/svg+xml", "svg")), this.root.push(tt("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(tt("application/xml", "xml")), this.root.push(tt("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ee("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  addCommentsExtended() {
    this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  addFooter(A) {
    this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${A}.xml`));
  }
  addHeader(A) {
    this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${A}.xml`));
  }
}, cs = {
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  o: "urn:schemas-microsoft-com:office:office",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  v: "urn:schemas-microsoft-com:vml",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  w10: "urn:schemas-microsoft-com:office:word",
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
  cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
  cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
  cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
  cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
  cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
  cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
  cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
  aink: "http://schemas.microsoft.com/office/drawing/2016/ink",
  am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d",
  w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex",
  w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
  w16: "http://schemas.microsoft.com/office/word/2018/wordml",
  w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
  w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
}, ei = class extends NA {
  constructor(A, i) {
    super(UA({ Ignorable: i }, Object.fromEntries(A.map((n) => [n, cs[n]])))), hA(this, "xmlKeys", UA({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(cs).map((n) => [n, `xmlns:${n}`]))));
  }
}, km = class extends mA {
  constructor(A) {
    super("cp:coreProperties"), this.root.push(new ei([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), A.title && this.root.push(new Lt("dc:title", A.title)), A.subject && this.root.push(new Lt("dc:subject", A.subject)), A.creator && this.root.push(new Lt("dc:creator", A.creator)), A.keywords && this.root.push(new Lt("cp:keywords", A.keywords)), A.description && this.root.push(new Lt("dc:description", A.description)), A.lastModifiedBy && this.root.push(new Lt("cp:lastModifiedBy", A.lastModifiedBy)), A.revision && this.root.push(new Lt("cp:revision", String(A.revision))), this.root.push(new No("dcterms:created")), this.root.push(new No("dcterms:modified"));
  }
}, Km = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { type: "xsi:type" });
  }
}, No = class extends mA {
  constructor(A) {
    super(A), this.root.push(new Km({ type: "dcterms:W3CDTF" })), this.root.push(Wg(/* @__PURE__ */ new Date()));
  }
}, Mm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Pm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, Gm = class extends mA {
  constructor(A, i) {
    super("property"), this.root.push(new Pm({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: A.toString(),
      name: i.name
    })), this.root.push(new Vm(i.value));
  }
}, Vm = class extends mA {
  constructor(A) {
    super("vt:lpwstr"), this.root.push(A);
  }
}, Wm = class extends mA {
  constructor(A) {
    super("Properties"), hA(this, "nextId", void 0), hA(this, "properties", []), this.root.push(new Mm({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const i of A) this.addCustomProperty(i);
  }
  prepForXml(A) {
    return this.properties.forEach((i) => this.root.push(i)), super.prepForXml(A);
  }
  addCustomProperty(A) {
    this.properties.push(new Gm(this.nextId++, A));
  }
}, Xm = ({ space: A, count: i, separate: n, equalWidth: c, children: h }) => new bA({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: A === void 0 ? void 0 : de(A)
    },
    count: {
      key: "w:num",
      value: i === void 0 ? void 0 : pe(i)
    },
    separate: {
      key: "w:sep",
      value: n
    },
    equalWidth: {
      key: "w:equalWidth",
      value: c
    }
  },
  children: !c && h ? h : void 0
}), jm = ({ type: A, linePitch: i, charSpace: n }) => new bA({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: A
    },
    linePitch: {
      key: "w:linePitch",
      value: pe(i)
    },
    charSpace: {
      key: "w:charSpace",
      value: n ? pe(n) : void 0
    }
  }
}), or = {
  DEFAULT: "default",
  FIRST: "first",
  EVEN: "even"
}, ko = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, zi = (A, i) => new bA({
  name: A,
  attributes: {
    type: {
      key: "w:type",
      value: i.type || or.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${i.id}`
    }
  }
}), zm = ({ countBy: A, start: i, restart: n, distance: c }) => new bA({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: A === void 0 ? void 0 : pe(A)
    },
    start: {
      key: "w:start",
      value: i === void 0 ? void 0 : pe(i)
    },
    restart: {
      key: "w:restart",
      value: n
    },
    distance: {
      key: "w:distance",
      value: c === void 0 ? void 0 : de(c)
    }
  }
}), Ko = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, Jm = class extends mt {
  constructor(A) {
    if (super("w:pgBorders"), !A) return this;
    A.pageBorders ? this.root.push(new Ko({
      display: A.pageBorders.display,
      offsetFrom: A.pageBorders.offsetFrom,
      zOrder: A.pageBorders.zOrder
    })) : this.root.push(new Ko({})), A.pageBorderTop && this.root.push(re("w:top", A.pageBorderTop)), A.pageBorderLeft && this.root.push(re("w:left", A.pageBorderLeft)), A.pageBorderBottom && this.root.push(re("w:bottom", A.pageBorderBottom)), A.pageBorderRight && this.root.push(re("w:right", A.pageBorderRight));
  }
}, Ym = (A, i, n, c, h, f, a) => new bA({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: nt(A)
    },
    right: {
      key: "w:right",
      value: de(i)
    },
    bottom: {
      key: "w:bottom",
      value: nt(n)
    },
    left: {
      key: "w:left",
      value: de(c)
    },
    header: {
      key: "w:header",
      value: de(h)
    },
    footer: {
      key: "w:footer",
      value: de(f)
    },
    gutter: {
      key: "w:gutter",
      value: de(a)
    }
  }
}), Zm = ({ start: A, formatType: i, separator: n }) => new bA({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: A === void 0 ? void 0 : pe(A)
    },
    formatType: {
      key: "w:fmt",
      value: i
    },
    separator: {
      key: "w:chapSep",
      value: n
    }
  }
}), Vn = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape"
}, qm = ({ width: A, height: i, orientation: n, code: c }) => {
  const h = de(A), f = de(i);
  return new bA({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: n === Vn.LANDSCAPE ? f : h
      },
      height: {
        key: "w:h",
        value: n === Vn.LANDSCAPE ? h : f
      },
      orientation: {
        key: "w:orient",
        value: n
      },
      code: {
        key: "w:code",
        value: c
      }
    }
  });
}, $m = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Av = class extends mA {
  constructor(A) {
    super("w:textDirection"), this.root.push(new $m({ val: A }));
  }
}, ev = (A) => new bA({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), Dt = {
  TOP: 1440,
  RIGHT: 1440,
  BOTTOM: 1440,
  LEFT: 1440,
  HEADER: 708,
  FOOTER: 708,
  GUTTER: 0
}, Ji = {
  WIDTH: 11906,
  HEIGHT: 16838,
  ORIENTATION: Vn.PORTRAIT
}, fu = class extends mA {
  constructor({ page: { size: { width: A = Ji.WIDTH, height: i = Ji.HEIGHT, orientation: n = Ji.ORIENTATION, code: c } = {}, margin: { top: h = Dt.TOP, right: f = Dt.RIGHT, bottom: a = Dt.BOTTOM, left: o = Dt.LEFT, header: d = Dt.HEADER, footer: U = Dt.FOOTER, gutter: b = Dt.GUTTER } = {}, pageNumbers: v = {}, borders: _, textDirection: C } = {}, grid: { linePitch: m = 360, charSpace: w, type: I } = {}, headerWrapperGroup: T = {}, footerWrapperGroup: x = {}, lineNumbers: N, titlePage: O, verticalAlign: F, column: g, type: R, revision: V } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(ko.HEADER, T), this.addHeaderFooterGroup(ko.FOOTER, x), R && this.root.push(ev(R)), this.root.push(qm({
      width: A,
      height: i,
      orientation: n,
      code: c
    })), this.root.push(Ym(h, f, a, o, d, U, b)), _ && this.root.push(new Jm(_)), N && this.root.push(zm(N)), this.root.push(Zm(v)), g && this.root.push(Xm(g)), F && this.root.push(ru(F)), O !== void 0 && this.root.push(new CA("w:titlePg", O)), C && this.root.push(new Av(C)), V && this.root.push(new tv(V)), this.root.push(jm({
      linePitch: m,
      charSpace: w,
      type: I
    }));
  }
  addHeaderFooterGroup(A, i) {
    i.default && this.root.push(zi(A, {
      type: or.DEFAULT,
      id: i.default.View.ReferenceId
    })), i.first && this.root.push(zi(A, {
      type: or.FIRST,
      id: i.first.View.ReferenceId
    })), i.even && this.root.push(zi(A, {
      type: or.EVEN,
      id: i.even.View.ReferenceId
    }));
  }
}, tv = class extends mA {
  constructor(A) {
    super("w:sectPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new fu(A));
  }
}, rv = class extends mA {
  constructor() {
    super("w:body"), hA(this, "sections", []);
  }
  addSection(A) {
    const i = this.sections.pop();
    this.root.push(this.createSectionParagraph(i)), this.sections.push(new fu(A));
  }
  prepForXml(A) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(A);
  }
  push(A) {
    this.root.push(A);
  }
  createSectionParagraph(A) {
    const i = new Le({}), n = new Kt({});
    return n.push(A), i.addChildElement(n), i;
  }
}, nv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}, iv = class extends mA {
  constructor(A) {
    super("w:background"), this.root.push(new nv({
      color: A.color === void 0 ? void 0 : cr(A.color),
      themeColor: A.themeColor,
      themeShade: A.themeShade === void 0 ? void 0 : xo(A.themeShade),
      themeTint: A.themeTint === void 0 ? void 0 : xo(A.themeTint)
    }));
  }
}, sv = class extends mA {
  constructor(A) {
    super("w:document"), hA(this, "body", void 0), this.root.push(new ei([
      "wpc",
      "mc",
      "o",
      "r",
      "m",
      "v",
      "wp14",
      "wp",
      "w10",
      "w",
      "w14",
      "w15",
      "wpg",
      "wpi",
      "wne",
      "wps",
      "cx",
      "cx1",
      "cx2",
      "cx3",
      "cx4",
      "cx5",
      "cx6",
      "cx7",
      "cx8",
      "aink",
      "am3d",
      "w16cex",
      "w16cid",
      "w16",
      "w16sdtdh",
      "w16se"
    ], "w14 w15 wp14")), this.body = new rv(), A.background && this.root.push(new iv(A.background)), this.root.push(this.body);
  }
  add(A) {
    return this.body.push(A), this;
  }
  get Body() {
    return this.body;
  }
}, av = class {
  constructor(A) {
    hA(this, "document", void 0), hA(this, "relationships", void 0), this.document = new sv(A), this.relationships = new Ft();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, ov = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}, lv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, uv = class extends Gt {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new KB());
  }
}, Mo = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Yi = class extends mA {
  constructor(A) {
    super("w:endnote"), this.root.push(new lv({
      type: A.type,
      id: A.id
    }));
    for (let i = 0; i < A.children.length; i++) {
      const n = A.children[i];
      i === 0 && n.addRunToFront(new uv()), this.root.push(n);
    }
  }
}, cv = class extends mA {
  constructor() {
    super("w:continuationSeparator");
  }
}, du = class extends Gt {
  constructor() {
    super({}), this.root.push(new cv());
  }
}, hv = class extends mA {
  constructor() {
    super("w:separator");
  }
}, pu = class extends Gt {
  constructor() {
    super({}), this.root.push(new hv());
  }
}, fv = class extends mA {
  constructor() {
    super("w:endnotes"), this.root.push(new ov({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    }));
    const A = new Yi({
      id: -1,
      type: Mo.SEPARATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: dr.AUTO
        },
        children: [new pu()]
      })]
    });
    this.root.push(A);
    const i = new Yi({
      id: 0,
      type: Mo.CONTINUATION_SEPARATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: dr.AUTO
        },
        children: [new du()]
      })]
    });
    this.root.push(i);
  }
  createEndnote(A, i) {
    const n = new Yi({
      id: A,
      children: i
    });
    this.root.push(n);
  }
}, dv = class {
  constructor() {
    hA(this, "endnotes", void 0), hA(this, "relationships", void 0), this.endnotes = new fv(), this.relationships = new Ft();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, pv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type"
    });
  }
}, gv = class extends _l {
  constructor(A, i) {
    super("w:ftr", i), hA(this, "refId", void 0), this.refId = A, i || this.root.push(new pv({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(A) {
    this.root.push(A);
  }
}, wv = class {
  constructor(A, i, n) {
    hA(this, "media", void 0), hA(this, "footer", void 0), hA(this, "relationships", void 0), this.media = A, this.footer = new gv(i, n), this.relationships = new Ft();
  }
  add(A) {
    this.footer.add(A);
  }
  addChildElement(A) {
    this.footer.addChildElement(A);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}, Bv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, mv = class extends mA {
  constructor() {
    super("w:footnoteRef");
  }
}, vv = class extends Gt {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new mv());
  }
}, Po = {
  SEPERATOR: "separator",
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, Zi = class extends mA {
  constructor(A) {
    super("w:footnote"), this.root.push(new Bv({
      type: A.type,
      id: A.id
    }));
    for (let i = 0; i < A.children.length; i++) {
      const n = A.children[i];
      i === 0 && n.addRunToFront(new vv()), this.root.push(n);
    }
  }
}, yv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}, Cv = class extends mA {
  constructor() {
    super("w:footnotes"), this.root.push(new yv({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    }));
    const A = new Zi({
      id: -1,
      type: Po.SEPERATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: dr.AUTO
        },
        children: [new pu()]
      })]
    });
    this.root.push(A);
    const i = new Zi({
      id: 0,
      type: Po.CONTINUATION_SEPERATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: dr.AUTO
        },
        children: [new du()]
      })]
    });
    this.root.push(i);
  }
  createFootNote(A, i) {
    const n = new Zi({
      id: A,
      children: i
    });
    this.root.push(n);
  }
}, Fv = class {
  constructor() {
    hA(this, "footnotess", void 0), hA(this, "relationships", void 0), this.footnotess = new Cv(), this.relationships = new Ft();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Ev = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type",
      cx: "xmlns:cx",
      cx1: "xmlns:cx1",
      cx2: "xmlns:cx2",
      cx3: "xmlns:cx3",
      cx4: "xmlns:cx4",
      cx5: "xmlns:cx5",
      cx6: "xmlns:cx6",
      cx7: "xmlns:cx7",
      cx8: "xmlns:cx8",
      w16cid: "xmlns:w16cid",
      w16se: "xmlns:w16se"
    });
  }
}, Qv = class extends _l {
  constructor(A, i) {
    super("w:hdr", i), hA(this, "refId", void 0), this.refId = A, i || this.root.push(new Ev({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
      cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
      cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
      cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
      cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
      cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
      cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
      cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
      cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
      w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(A) {
    this.root.push(A);
  }
}, Uv = class {
  constructor(A, i, n) {
    hA(this, "media", void 0), hA(this, "header", void 0), hA(this, "relationships", void 0), this.media = A, this.header = new Qv(i, n), this.relationships = new Ft();
  }
  add(A) {
    return this.header.add(A), this;
  }
  addChildElement(A) {
    this.header.addChildElement(A);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}, gu = class {
  constructor() {
    hA(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
  }
  addImage(A, i) {
    this.map.set(A, i);
  }
  get Array() {
    return Array.from(this.map.values());
  }
}, rt = {
  DECIMAL: "decimal",
  UPPER_ROMAN: "upperRoman",
  LOWER_ROMAN: "lowerRoman",
  UPPER_LETTER: "upperLetter",
  LOWER_LETTER: "lowerLetter",
  ORDINAL: "ordinal",
  CARDINAL_TEXT: "cardinalText",
  ORDINAL_TEXT: "ordinalText",
  HEX: "hex",
  CHICAGO: "chicago",
  IDEOGRAPH__DIGITAL: "ideographDigital",
  JAPANESE_COUNTING: "japaneseCounting",
  AIUEO: "aiueo",
  IROHA: "iroha",
  DECIMAL_FULL_WIDTH: "decimalFullWidth",
  DECIMAL_HALF_WIDTH: "decimalHalfWidth",
  JAPANESE_LEGAL: "japaneseLegal",
  JAPANESE_DIGITAL_TEN_THOUSAND: "japaneseDigitalTenThousand",
  DECIMAL_ENCLOSED_CIRCLE: "decimalEnclosedCircle",
  DECIMAL_FULL_WIDTH2: "decimalFullWidth2",
  AIUEO_FULL_WIDTH: "aiueoFullWidth",
  IROHA_FULL_WIDTH: "irohaFullWidth",
  DECIMAL_ZERO: "decimalZero",
  BULLET: "bullet",
  GANADA: "ganada",
  CHOSUNG: "chosung",
  DECIMAL_ENCLOSED_FULLSTOP: "decimalEnclosedFullstop",
  DECIMAL_ENCLOSED_PARENTHESES: "decimalEnclosedParen",
  DECIMAL_ENCLOSED_CIRCLE_CHINESE: "decimalEnclosedCircleChinese",
  IDEOGRAPH_ENCLOSED_CIRCLE: "ideographEnclosedCircle",
  IDEOGRAPH_TRADITIONAL: "ideographTraditional",
  IDEOGRAPH_ZODIAC: "ideographZodiac",
  IDEOGRAPH_ZODIAC_TRADITIONAL: "ideographZodiacTraditional",
  TAIWANESE_COUNTING: "taiwaneseCounting",
  IDEOGRAPH_LEGAL_TRADITIONAL: "ideographLegalTraditional",
  TAIWANESE_COUNTING_THOUSAND: "taiwaneseCountingThousand",
  TAIWANESE_DIGITAL: "taiwaneseDigital",
  CHINESE_COUNTING: "chineseCounting",
  CHINESE_LEGAL_SIMPLIFIED: "chineseLegalSimplified",
  CHINESE_COUNTING_THOUSAND: "chineseCountingThousand",
  KOREAN_DIGITAL: "koreanDigital",
  KOREAN_COUNTING: "koreanCounting",
  KOREAN_LEGAL: "koreanLegal",
  KOREAN_DIGITAL2: "koreanDigital2",
  VIETNAMESE_COUNTING: "vietnameseCounting",
  RUSSIAN_LOWER: "russianLower",
  RUSSIAN_UPPER: "russianUpper",
  NONE: "none",
  NUMBER_IN_DASH: "numberInDash",
  HEBREW1: "hebrew1",
  HEBREW2: "hebrew2",
  ARABIC_ALPHA: "arabicAlpha",
  ARABIC_ABJAD: "arabicAbjad",
  HINDI_VOWELS: "hindiVowels",
  HINDI_CONSONANTS: "hindiConsonants",
  HINDI_NUMBERS: "hindiNumbers",
  HINDI_COUNTING: "hindiCounting",
  THAI_LETTERS: "thaiLetters",
  THAI_NUMBERS: "thaiNumbers",
  THAI_COUNTING: "thaiCounting",
  BAHT_TEXT: "bahtText",
  DOLLAR_TEXT: "dollarText",
  CUSTOM: "custom"
}, bv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}, Iv = class extends mA {
  constructor(A) {
    super("w:numFmt"), this.root.push(new ge({ val: A }));
  }
}, _v = class extends mA {
  constructor(A) {
    super("w:lvlText"), this.root.push(new ge({ val: A }));
  }
}, xv = class extends mA {
  constructor(A) {
    super("w:lvlJc"), this.root.push(new ge({ val: A }));
  }
}, Tv = class extends mA {
  constructor(A) {
    super("w:suff"), this.root.push(new ge({ val: A }));
  }
}, Sv = class extends mA {
  constructor() {
    super("w:isLgl");
  }
}, Hv = class extends mA {
  constructor({ level: A, format: i, text: n, alignment: c = fe.START, start: h = 1, style: f, suffix: a, isLegalNumberingStyle: o }) {
    if (super("w:lvl"), hA(this, "paragraphProperties", void 0), hA(this, "runProperties", void 0), this.root.push(new Pr("w:start", pe(h))), i && this.root.push(new Iv(i)), a && this.root.push(new Tv(a)), o && this.root.push(new Sv()), n && this.root.push(new _v(n)), this.root.push(new xv(c)), f?.style && this.root.push(Kr(f.style)), this.paragraphProperties = new Kt(f && f.paragraph), this.runProperties = new Ct(f && f.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), A > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new bv({
      ilvl: pe(A),
      tentative: 1
    }));
  }
}, Lv = class extends Hv {
}, Dv = class extends mA {
  constructor(A) {
    super("w:multiLevelType"), this.root.push(new ge({ val: A }));
  }
}, Rv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, Go = class extends mA {
  constructor(A, i) {
    super("w:abstractNum"), hA(this, "id", void 0), this.root.push(new Rv({
      abstractNumId: pe(A),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Dv("hybridMultilevel")), this.id = A;
    for (const n of i) this.root.push(new Lv(n));
  }
}, Ov = class extends mA {
  constructor(A) {
    super("w:abstractNumId"), this.root.push(new ge({ val: A }));
  }
}, Nv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { numId: "w:numId" });
  }
}, Vo = class extends mA {
  constructor(A) {
    if (super("w:num"), hA(this, "numId", void 0), hA(this, "reference", void 0), hA(this, "instance", void 0), this.numId = A.numId, this.reference = A.reference, this.instance = A.instance, this.root.push(new Nv({ numId: pe(A.numId) })), this.root.push(new Ov(pe(A.abstractNumId))), A.overrideLevels && A.overrideLevels.length) for (const i of A.overrideLevels) this.root.push(new Kv(i.num, i.start));
  }
}, kv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, Kv = class extends mA {
  constructor(A, i) {
    super("w:lvlOverride"), this.root.push(new kv({ ilvl: A })), i !== void 0 && this.root.push(new Pv(i));
  }
}, Mv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Pv = class extends mA {
  constructor(A) {
    super("w:startOverride"), this.root.push(new Mv({ val: A }));
  }
}, Gv = class extends mA {
  constructor(A) {
    super("w:numbering"), hA(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), hA(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), hA(this, "referenceConfigMap", /* @__PURE__ */ new Map()), hA(this, "abstractNumUniqueNumericId", Qw()), hA(this, "concreteNumUniqueNumericId", Uw()), this.root.push(new ei([
      "wpc",
      "mc",
      "o",
      "r",
      "m",
      "v",
      "wp14",
      "wp",
      "w10",
      "w",
      "w14",
      "w15",
      "wpg",
      "wpi",
      "wne",
      "wps"
    ], "w14 w15 wp14"));
    const i = new Go(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: rt.BULLET,
        text: "●",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: Re(0.5),
          hanging: Re(0.25)
        } } }
      },
      {
        level: 1,
        format: rt.BULLET,
        text: "○",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: Re(1),
          hanging: Re(0.25)
        } } }
      },
      {
        level: 2,
        format: rt.BULLET,
        text: "■",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 3,
        format: rt.BULLET,
        text: "●",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 4,
        format: rt.BULLET,
        text: "○",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 5,
        format: rt.BULLET,
        text: "■",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 6,
        format: rt.BULLET,
        text: "●",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 7,
        format: rt.BULLET,
        text: "●",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: Re(0.25)
        } } }
      },
      {
        level: 8,
        format: rt.BULLET,
        text: "●",
        alignment: fe.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: Re(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new Vo({
      numId: 1,
      abstractNumId: i.id,
      reference: "default-bullet-numbering",
      instance: 0,
      overrideLevels: [{
        num: 0,
        start: 1
      }]
    })), this.abstractNumberingMap.set("default-bullet-numbering", i);
    for (const n of A.config)
      this.abstractNumberingMap.set(n.reference, new Go(this.abstractNumUniqueNumericId(), n.levels)), this.referenceConfigMap.set(n.reference, n.levels);
  }
  prepForXml(A) {
    for (const i of this.abstractNumberingMap.values()) this.root.push(i);
    for (const i of this.concreteNumberingMap.values()) this.root.push(i);
    return super.prepForXml(A);
  }
  createConcreteNumberingInstance(A, i) {
    const n = this.abstractNumberingMap.get(A);
    if (!n) return;
    const c = `${A}-${i}`;
    if (this.concreteNumberingMap.has(c)) return;
    const h = this.referenceConfigMap.get(A), f = h && h[0].start, a = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: n.id,
      reference: A,
      instance: i,
      overrideLevels: [typeof f == "number" && Number.isInteger(f) ? {
        num: 0,
        start: f
      } : {
        num: 0,
        start: 1
      }]
    };
    this.concreteNumberingMap.set(c, new Vo(a));
  }
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}, Vv = (A) => new bA({
  name: "w:compatSetting",
  attributes: {
    version: {
      key: "w:val",
      value: A
    },
    name: {
      key: "w:name",
      value: "compatibilityMode"
    },
    uri: {
      key: "w:uri",
      value: "http://schemas.microsoft.com/office/word"
    }
  }
}), Wv = class extends mA {
  constructor(A) {
    super("w:compat"), A.version && this.root.push(Vv(A.version)), A.useSingleBorderforContiguousCells && this.root.push(new CA("w:useSingleBorderforContiguousCells", A.useSingleBorderforContiguousCells)), A.wordPerfectJustification && this.root.push(new CA("w:wpJustification", A.wordPerfectJustification)), A.noTabStopForHangingIndent && this.root.push(new CA("w:noTabHangInd", A.noTabStopForHangingIndent)), A.noLeading && this.root.push(new CA("w:noLeading", A.noLeading)), A.spaceForUnderline && this.root.push(new CA("w:spaceForUL", A.spaceForUnderline)), A.noColumnBalance && this.root.push(new CA("w:noColumnBalance", A.noColumnBalance)), A.balanceSingleByteDoubleByteWidth && this.root.push(new CA("w:balanceSingleByteDoubleByteWidth", A.balanceSingleByteDoubleByteWidth)), A.noExtraLineSpacing && this.root.push(new CA("w:noExtraLineSpacing", A.noExtraLineSpacing)), A.doNotLeaveBackslashAlone && this.root.push(new CA("w:doNotLeaveBackslashAlone", A.doNotLeaveBackslashAlone)), A.underlineTrailingSpaces && this.root.push(new CA("w:ulTrailSpace", A.underlineTrailingSpaces)), A.doNotExpandShiftReturn && this.root.push(new CA("w:doNotExpandShiftReturn", A.doNotExpandShiftReturn)), A.spacingInWholePoints && this.root.push(new CA("w:spacingInWholePoints", A.spacingInWholePoints)), A.lineWrapLikeWord6 && this.root.push(new CA("w:lineWrapLikeWord6", A.lineWrapLikeWord6)), A.printBodyTextBeforeHeader && this.root.push(new CA("w:printBodyTextBeforeHeader", A.printBodyTextBeforeHeader)), A.printColorsBlack && this.root.push(new CA("w:printColBlack", A.printColorsBlack)), A.spaceWidth && this.root.push(new CA("w:wpSpaceWidth", A.spaceWidth)), A.showBreaksInFrames && this.root.push(new CA("w:showBreaksInFrames", A.showBreaksInFrames)), A.subFontBySize && this.root.push(new CA("w:subFontBySize", A.subFontBySize)), A.suppressBottomSpacing && this.root.push(new CA("w:suppressBottomSpacing", A.suppressBottomSpacing)), A.suppressTopSpacing && this.root.push(new CA("w:suppressTopSpacing", A.suppressTopSpacing)), A.suppressSpacingAtTopOfPage && this.root.push(new CA("w:suppressSpacingAtTopOfPage", A.suppressSpacingAtTopOfPage)), A.suppressTopSpacingWP && this.root.push(new CA("w:suppressTopSpacingWP", A.suppressTopSpacingWP)), A.suppressSpBfAfterPgBrk && this.root.push(new CA("w:suppressSpBfAfterPgBrk", A.suppressSpBfAfterPgBrk)), A.swapBordersFacingPages && this.root.push(new CA("w:swapBordersFacingPages", A.swapBordersFacingPages)), A.convertMailMergeEsc && this.root.push(new CA("w:convMailMergeEsc", A.convertMailMergeEsc)), A.truncateFontHeightsLikeWP6 && this.root.push(new CA("w:truncateFontHeightsLikeWP6", A.truncateFontHeightsLikeWP6)), A.macWordSmallCaps && this.root.push(new CA("w:mwSmallCaps", A.macWordSmallCaps)), A.usePrinterMetrics && this.root.push(new CA("w:usePrinterMetrics", A.usePrinterMetrics)), A.doNotSuppressParagraphBorders && this.root.push(new CA("w:doNotSuppressParagraphBorders", A.doNotSuppressParagraphBorders)), A.wrapTrailSpaces && this.root.push(new CA("w:wrapTrailSpaces", A.wrapTrailSpaces)), A.footnoteLayoutLikeWW8 && this.root.push(new CA("w:footnoteLayoutLikeWW8", A.footnoteLayoutLikeWW8)), A.shapeLayoutLikeWW8 && this.root.push(new CA("w:shapeLayoutLikeWW8", A.shapeLayoutLikeWW8)), A.alignTablesRowByRow && this.root.push(new CA("w:alignTablesRowByRow", A.alignTablesRowByRow)), A.forgetLastTabAlignment && this.root.push(new CA("w:forgetLastTabAlignment", A.forgetLastTabAlignment)), A.adjustLineHeightInTable && this.root.push(new CA("w:adjustLineHeightInTable", A.adjustLineHeightInTable)), A.autoSpaceLikeWord95 && this.root.push(new CA("w:autoSpaceLikeWord95", A.autoSpaceLikeWord95)), A.noSpaceRaiseLower && this.root.push(new CA("w:noSpaceRaiseLower", A.noSpaceRaiseLower)), A.doNotUseHTMLParagraphAutoSpacing && this.root.push(new CA("w:doNotUseHTMLParagraphAutoSpacing", A.doNotUseHTMLParagraphAutoSpacing)), A.layoutRawTableWidth && this.root.push(new CA("w:layoutRawTableWidth", A.layoutRawTableWidth)), A.layoutTableRowsApart && this.root.push(new CA("w:layoutTableRowsApart", A.layoutTableRowsApart)), A.useWord97LineBreakRules && this.root.push(new CA("w:useWord97LineBreakRules", A.useWord97LineBreakRules)), A.doNotBreakWrappedTables && this.root.push(new CA("w:doNotBreakWrappedTables", A.doNotBreakWrappedTables)), A.doNotSnapToGridInCell && this.root.push(new CA("w:doNotSnapToGridInCell", A.doNotSnapToGridInCell)), A.selectFieldWithFirstOrLastCharacter && this.root.push(new CA("w:selectFldWithFirstOrLastChar", A.selectFieldWithFirstOrLastCharacter)), A.applyBreakingRules && this.root.push(new CA("w:applyBreakingRules", A.applyBreakingRules)), A.doNotWrapTextWithPunctuation && this.root.push(new CA("w:doNotWrapTextWithPunct", A.doNotWrapTextWithPunctuation)), A.doNotUseEastAsianBreakRules && this.root.push(new CA("w:doNotUseEastAsianBreakRules", A.doNotUseEastAsianBreakRules)), A.useWord2002TableStyleRules && this.root.push(new CA("w:useWord2002TableStyleRules", A.useWord2002TableStyleRules)), A.growAutofit && this.root.push(new CA("w:growAutofit", A.growAutofit)), A.useFELayout && this.root.push(new CA("w:useFELayout", A.useFELayout)), A.useNormalStyleForList && this.root.push(new CA("w:useNormalStyleForList", A.useNormalStyleForList)), A.doNotUseIndentAsNumberingTabStop && this.root.push(new CA("w:doNotUseIndentAsNumberingTabStop", A.doNotUseIndentAsNumberingTabStop)), A.useAlternateEastAsianLineBreakRules && this.root.push(new CA("w:useAltKinsokuLineBreakRules", A.useAlternateEastAsianLineBreakRules)), A.allowSpaceOfSameStyleInTable && this.root.push(new CA("w:allowSpaceOfSameStyleInTable", A.allowSpaceOfSameStyleInTable)), A.doNotSuppressIndentation && this.root.push(new CA("w:doNotSuppressIndentation", A.doNotSuppressIndentation)), A.doNotAutofitConstrainedTables && this.root.push(new CA("w:doNotAutofitConstrainedTables", A.doNotAutofitConstrainedTables)), A.autofitToFirstFixedWidthCell && this.root.push(new CA("w:autofitToFirstFixedWidthCell", A.autofitToFirstFixedWidthCell)), A.underlineTabInNumberingList && this.root.push(new CA("w:underlineTabInNumList", A.underlineTabInNumberingList)), A.displayHangulFixedWidth && this.root.push(new CA("w:displayHangulFixedWidth", A.displayHangulFixedWidth)), A.splitPgBreakAndParaMark && this.root.push(new CA("w:splitPgBreakAndParaMark", A.splitPgBreakAndParaMark)), A.doNotVerticallyAlignCellWithSp && this.root.push(new CA("w:doNotVertAlignCellWithSp", A.doNotVerticallyAlignCellWithSp)), A.doNotBreakConstrainedForcedTable && this.root.push(new CA("w:doNotBreakConstrainedForcedTable", A.doNotBreakConstrainedForcedTable)), A.ignoreVerticalAlignmentInTextboxes && this.root.push(new CA("w:doNotVertAlignInTxbx", A.ignoreVerticalAlignmentInTextboxes)), A.useAnsiKerningPairs && this.root.push(new CA("w:useAnsiKerningPairs", A.useAnsiKerningPairs)), A.cachedColumnBalance && this.root.push(new CA("w:cachedColBalance", A.cachedColumnBalance));
  }
}, Xv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}, jv = class extends mA {
  constructor(A) {
    var i, n, c, h, f, a, o, d;
    super("w:settings"), this.root.push(new Xv({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    })), this.root.push(new CA("w:displayBackgroundShape", !0)), A.trackRevisions !== void 0 && this.root.push(new CA("w:trackRevisions", A.trackRevisions)), A.evenAndOddHeaders !== void 0 && this.root.push(new CA("w:evenAndOddHeaders", A.evenAndOddHeaders)), A.updateFields !== void 0 && this.root.push(new CA("w:updateFields", A.updateFields)), A.defaultTabStop !== void 0 && this.root.push(new Pr("w:defaultTabStop", A.defaultTabStop)), ((i = A.hyphenation) === null || i === void 0 ? void 0 : i.autoHyphenation) !== void 0 && this.root.push(new CA("w:autoHyphenation", A.hyphenation.autoHyphenation)), ((n = A.hyphenation) === null || n === void 0 ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new Pr("w:hyphenationZone", A.hyphenation.hyphenationZone)), ((c = A.hyphenation) === null || c === void 0 ? void 0 : c.consecutiveHyphenLimit) !== void 0 && this.root.push(new Pr("w:consecutiveHyphenLimit", A.hyphenation.consecutiveHyphenLimit)), ((h = A.hyphenation) === null || h === void 0 ? void 0 : h.doNotHyphenateCaps) !== void 0 && this.root.push(new CA("w:doNotHyphenateCaps", A.hyphenation.doNotHyphenateCaps)), this.root.push(new Wv(UA(UA({}, (f = A.compatibility) !== null && f !== void 0 ? f : {}), {}, { version: (a = (o = (d = A.compatibility) === null || d === void 0 ? void 0 : d.version) !== null && o !== void 0 ? o : A.compatibilityModeVersion) !== null && a !== void 0 ? a : 15 })));
  }
}, wu = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, zv = class extends mA {
  constructor(A) {
    super("w:name"), this.root.push(new wu({ val: A }));
  }
}, Jv = class extends mA {
  constructor(A) {
    super("w:uiPriority"), this.root.push(new wu({ val: pe(A) }));
  }
}, Yv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, Bu = class extends mA {
  constructor(A, i) {
    super("w:style"), this.root.push(new Yv(A)), i.name && this.root.push(new zv(i.name)), i.basedOn && this.root.push(new kt("w:basedOn", i.basedOn)), i.next && this.root.push(new kt("w:next", i.next)), i.link && this.root.push(new kt("w:link", i.link)), i.uiPriority !== void 0 && this.root.push(new Jv(i.uiPriority)), i.semiHidden !== void 0 && this.root.push(new CA("w:semiHidden", i.semiHidden)), i.unhideWhenUsed !== void 0 && this.root.push(new CA("w:unhideWhenUsed", i.unhideWhenUsed)), i.quickFormat !== void 0 && this.root.push(new CA("w:qFormat", i.quickFormat));
  }
}, Jr = class extends Bu {
  constructor(A) {
    super({
      type: "paragraph",
      styleId: A.id
    }, A), hA(this, "paragraphProperties", void 0), hA(this, "runProperties", void 0), this.paragraphProperties = new Kt(A.paragraph), this.runProperties = new Ct(A.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, Br = class extends Bu {
  constructor(A) {
    super({
      type: "character",
      styleId: A.id
    }, UA({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, A)), hA(this, "runProperties", void 0), this.runProperties = new Ct(A.run), this.root.push(this.runProperties);
  }
}, Et = class extends Jr {
  constructor(A) {
    super(UA({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, A));
  }
}, Zv = class extends Et {
  constructor(A) {
    super(UA({
      id: "Title",
      name: "Title"
    }, A));
  }
}, qv = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading1",
      name: "Heading 1"
    }, A));
  }
}, $v = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading2",
      name: "Heading 2"
    }, A));
  }
}, A0 = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading3",
      name: "Heading 3"
    }, A));
  }
}, e0 = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading4",
      name: "Heading 4"
    }, A));
  }
}, t0 = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading5",
      name: "Heading 5"
    }, A));
  }
}, r0 = class extends Et {
  constructor(A) {
    super(UA({
      id: "Heading6",
      name: "Heading 6"
    }, A));
  }
}, n0 = class extends Et {
  constructor(A) {
    super(UA({
      id: "Strong",
      name: "Strong"
    }, A));
  }
}, i0 = class extends Jr {
  constructor(A) {
    super(UA({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, A));
  }
}, s0 = class extends Jr {
  constructor(A) {
    super(UA({
      id: "FootnoteText",
      name: "footnote text",
      link: "FootnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: dr.AUTO
      } },
      run: { size: 20 }
    }, A));
  }
}, a0 = class extends Br {
  constructor(A) {
    super(UA({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, A));
  }
}, o0 = class extends Br {
  constructor(A) {
    super(UA({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, A));
  }
}, l0 = class extends Jr {
  constructor(A) {
    super(UA({
      id: "EndnoteText",
      name: "endnote text",
      link: "EndnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: dr.AUTO
      } },
      run: { size: 20 }
    }, A));
  }
}, u0 = class extends Br {
  constructor(A) {
    super(UA({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, A));
  }
}, c0 = class extends Br {
  constructor(A) {
    super(UA({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, A));
  }
}, h0 = class extends Br {
  constructor(A) {
    super(UA({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: Dl.SINGLE }
      }
    }, A));
  }
}, qi = class extends mA {
  constructor(A) {
    if (super("w:styles"), A.initialStyles && this.root.push(A.initialStyles), A.importedStyles) for (const i of A.importedStyles) this.root.push(i);
    if (A.paragraphStyles) for (const i of A.paragraphStyles) this.root.push(new Jr(i));
    if (A.characterStyles) for (const i of A.characterStyles) this.root.push(new Br(i));
  }
}, f0 = class extends mA {
  constructor(A) {
    super("w:pPrDefault"), this.root.push(new Kt(A));
  }
}, d0 = class extends mA {
  constructor(A) {
    super("w:rPrDefault"), this.root.push(new Ct(A));
  }
}, p0 = class extends mA {
  constructor(A) {
    super("w:docDefaults"), hA(this, "runPropertiesDefaults", void 0), hA(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new d0(A.run), this.paragraphPropertiesDefaults = new f0(A.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, g0 = class {
  newInstance(A) {
    const i = (0, Yn.xml2js)(A, { compact: !1 });
    let n;
    for (const h of i.elements || []) h.name === "w:styles" && (n = h);
    if (n === void 0) throw new Error("can not find styles element");
    const c = n.elements || [];
    return {
      initialStyles: new Kg(n.attributes),
      importedStyles: c.map((h) => Us(h))
    };
  }
}, $i = class {
  newInstance(A = {}) {
    var i;
    return {
      initialStyles: new ei([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: [
        new p0((i = A.document) !== null && i !== void 0 ? i : {}),
        new Zv(UA({ run: { size: 56 } }, A.title)),
        new qv(UA({ run: {
          color: "2E74B5",
          size: 32
        } }, A.heading1)),
        new $v(UA({ run: {
          color: "2E74B5",
          size: 26
        } }, A.heading2)),
        new A0(UA({ run: {
          color: "1F4D78",
          size: 24
        } }, A.heading3)),
        new e0(UA({ run: {
          color: "2E74B5",
          italics: !0
        } }, A.heading4)),
        new t0(UA({ run: { color: "2E74B5" } }, A.heading5)),
        new r0(UA({ run: { color: "1F4D78" } }, A.heading6)),
        new n0(UA({ run: { bold: !0 } }, A.strong)),
        new i0(A.listParagraph || {}),
        new h0(A.hyperlink || {}),
        new a0(A.footnoteReference || {}),
        new s0(A.footnoteText || {}),
        new o0(A.footnoteTextChar || {}),
        new u0(A.endnoteReference || {}),
        new l0(A.endnoteText || {}),
        new c0(A.endnoteTextChar || {})
      ]
    };
  }
}, w0 = class {
  constructor(A) {
    var i, n, c, h, f, a, o, d, U, b, v, _;
    if (hA(this, "currentRelationshipId", 1), hA(this, "documentWrapper", void 0), hA(this, "headers", []), hA(this, "footers", []), hA(this, "coreProperties", void 0), hA(this, "numbering", void 0), hA(this, "media", void 0), hA(this, "fileRelationships", void 0), hA(this, "footnotesWrapper", void 0), hA(this, "endnotesWrapper", void 0), hA(this, "settings", void 0), hA(this, "contentTypes", void 0), hA(this, "customProperties", void 0), hA(this, "appProperties", void 0), hA(this, "styles", void 0), hA(this, "comments", void 0), hA(this, "commentsExtended", void 0), hA(this, "fontWrapper", void 0), this.coreProperties = new km(UA(UA({}, A), {}, {
      creator: (i = A.creator) !== null && i !== void 0 ? i : "Un-named",
      revision: (n = A.revision) !== null && n !== void 0 ? n : 1,
      lastModifiedBy: (c = A.lastModifiedBy) !== null && c !== void 0 ? c : "Un-named"
    })), this.numbering = new Gv(A.numbering ? A.numbering : { config: [] }), this.comments = new DB((h = A.comments) !== null && h !== void 0 ? h : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new kB(this.comments.ThreadData)), this.fileRelationships = new Ft(), this.customProperties = new Wm((f = A.customProperties) !== null && f !== void 0 ? f : []), this.appProperties = new Rm(), this.footnotesWrapper = new Fv(), this.endnotesWrapper = new dv(), this.contentTypes = new Nm(), this.documentWrapper = new av({ background: A.background }), this.settings = new jv({
      compatibilityModeVersion: A.compatabilityModeVersion,
      compatibility: A.compatibility,
      evenAndOddHeaders: !!A.evenAndOddHeaderAndFooters,
      trackRevisions: (a = A.features) === null || a === void 0 ? void 0 : a.trackRevisions,
      updateFields: (o = A.features) === null || o === void 0 ? void 0 : o.updateFields,
      defaultTabStop: A.defaultTabStop,
      hyphenation: {
        autoHyphenation: (d = A.hyphenation) === null || d === void 0 ? void 0 : d.autoHyphenation,
        hyphenationZone: (U = A.hyphenation) === null || U === void 0 ? void 0 : U.hyphenationZone,
        consecutiveHyphenLimit: (b = A.hyphenation) === null || b === void 0 ? void 0 : b.consecutiveHyphenLimit,
        doNotHyphenateCaps: (v = A.hyphenation) === null || v === void 0 ? void 0 : v.doNotHyphenateCaps
      }
    }), this.media = new gu(), A.externalStyles !== void 0) {
      var C;
      const m = new $i().newInstance((C = A.styles) === null || C === void 0 ? void 0 : C.default), w = new g0().newInstance(A.externalStyles);
      this.styles = new qi(UA(UA({}, w), {}, { importedStyles: [...m.importedStyles, ...w.importedStyles] }));
    } else if (A.styles) {
      const m = new $i().newInstance(A.styles.default);
      this.styles = new qi(UA(UA({}, m), A.styles));
    } else {
      const m = new $i();
      this.styles = new qi(m.newInstance());
    }
    this.addDefaultRelationships();
    for (const m of A.sections) this.addSection(m);
    if (A.footnotes) for (const m in A.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(m), A.footnotes[m].children);
    if (A.endnotes) for (const m in A.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(m), A.endnotes[m].children);
    this.fontWrapper = new Au((_ = A.fonts) !== null && _ !== void 0 ? _ : []);
  }
  addSection({ headers: A = {}, footers: i = {}, children: n, properties: c }) {
    this.documentWrapper.View.Body.addSection(UA(UA({}, c), {}, {
      headerWrapperGroup: {
        default: A.default ? this.createHeader(A.default) : void 0,
        first: A.first ? this.createHeader(A.first) : void 0,
        even: A.even ? this.createHeader(A.even) : void 0
      },
      footerWrapperGroup: {
        default: i.default ? this.createFooter(i.default) : void 0,
        first: i.first ? this.createFooter(i.first) : void 0,
        even: i.even ? this.createFooter(i.even) : void 0
      }
    }));
    for (const h of n) this.documentWrapper.View.add(h);
  }
  createHeader(A) {
    const i = new Uv(this.media, this.currentRelationshipId++);
    for (const n of A.options.children) i.add(n);
    return this.addHeaderToDocument(i), i;
  }
  createFooter(A) {
    const i = new wv(this.media, this.currentRelationshipId++);
    for (const n of A.options.children) i.add(n);
    return this.addFooterToDocument(i), i;
  }
  addHeaderToDocument(A, i = or.DEFAULT) {
    this.headers.push({
      header: A,
      type: i
    }), this.documentWrapper.Relationships.addRelationship(A.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(A, i = or.DEFAULT) {
    this.footers.push({
      footer: A,
      type: i
    }), this.documentWrapper.Relationships.addRelationship(A.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml"), this.fileRelationships.addRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), this.fileRelationships.addRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml"), this.fileRelationships.addRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", "endnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml"), this.commentsExtended && (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", "commentsExtended.xml"), this.contentTypes.addCommentsExtended());
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((A) => A.header);
  }
  get Footers() {
    return this.footers.map((A) => A.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Endnotes() {
    return this.endnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  get CommentsExtended() {
    return this.commentsExtended;
  }
  get FontTable() {
    return this.fontWrapper;
  }
}, B0 = /* @__PURE__ */ FA(((A, i) => {
  pr(), yt(), (function(n) {
    typeof A == "object" && typeof i < "u" ? i.exports = n() : typeof define == "function" && define.amd ? define([], n) : (typeof window < "u" ? window : typeof me < "u" ? me : typeof self < "u" ? self : this).JSZip = n();
  })(function() {
    return (function n(c, h, f) {
      function a(U, b) {
        if (!h[U]) {
          if (!c[U]) {
            var v = typeof Hn == "function" && Hn;
            if (!b && v) return v(U, !0);
            if (o) return o(U, !0);
            var _ = /* @__PURE__ */ new Error("Cannot find module '" + U + "'");
            throw _.code = "MODULE_NOT_FOUND", _;
          }
          var C = h[U] = { exports: {} };
          c[U][0].call(C.exports, function(m) {
            var w = c[U][1][m];
            return a(w || m);
          }, C, C.exports, n, c, h, f);
        }
        return h[U].exports;
      }
      for (var o = typeof Hn == "function" && Hn, d = 0; d < f.length; d++) a(f[d]);
      return a;
    })({
      1: [function(n, c, h) {
        "use strict";
        var f = n("./utils"), a = n("./support"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        h.encode = function(d) {
          for (var U, b, v, _, C, m, w, I = [], T = 0, x = d.length, N = x, O = f.getTypeOf(d) !== "string"; T < d.length; ) N = x - T, v = O ? (U = d[T++], b = T < x ? d[T++] : 0, T < x ? d[T++] : 0) : (U = d.charCodeAt(T++), b = T < x ? d.charCodeAt(T++) : 0, T < x ? d.charCodeAt(T++) : 0), _ = U >> 2, C = (3 & U) << 4 | b >> 4, m = 1 < N ? (15 & b) << 2 | v >> 6 : 64, w = 2 < N ? 63 & v : 64, I.push(o.charAt(_) + o.charAt(C) + o.charAt(m) + o.charAt(w));
          return I.join("");
        }, h.decode = function(d) {
          var U, b, v, _, C, m, w = 0, I = 0, T = "data:";
          if (d.substr(0, T.length) === T) throw new Error("Invalid base64 input, it looks like a data url.");
          var x, N = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (d.charAt(d.length - 1) === o.charAt(64) && N--, d.charAt(d.length - 2) === o.charAt(64) && N--, N % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (x = a.uint8array ? new Uint8Array(0 | N) : new Array(0 | N); w < d.length; ) U = o.indexOf(d.charAt(w++)) << 2 | (_ = o.indexOf(d.charAt(w++))) >> 4, b = (15 & _) << 4 | (C = o.indexOf(d.charAt(w++))) >> 2, v = (3 & C) << 6 | (m = o.indexOf(d.charAt(w++))), x[I++] = U, C !== 64 && (x[I++] = b), m !== 64 && (x[I++] = v);
          return x;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(n, c, h) {
        "use strict";
        var f = n("./external"), a = n("./stream/DataWorker"), o = n("./stream/Crc32Probe"), d = n("./stream/DataLengthProbe");
        function U(b, v, _, C, m) {
          this.compressedSize = b, this.uncompressedSize = v, this.crc32 = _, this.compression = C, this.compressedContent = m;
        }
        U.prototype = {
          getContentWorker: function() {
            var b = new a(f.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), v = this;
            return b.on("end", function() {
              if (this.streamInfo.data_length !== v.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), b;
          },
          getCompressedWorker: function() {
            return new a(f.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, U.createWorkerFrom = function(b, v, _) {
          return b.pipe(new o()).pipe(new d("uncompressedSize")).pipe(v.compressWorker(_)).pipe(new d("compressedSize")).withStreamInfo("compression", v);
        }, c.exports = U;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(n, c, h) {
        "use strict";
        var f = n("./stream/GenericWorker");
        h.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new f("STORE compression");
          },
          uncompressWorker: function() {
            return new f("STORE decompression");
          }
        }, h.DEFLATE = n("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(n, c, h) {
        "use strict";
        var f = n("./utils"), a = (function() {
          for (var o, d = [], U = 0; U < 256; U++) {
            o = U;
            for (var b = 0; b < 8; b++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
            d[U] = o;
          }
          return d;
        })();
        c.exports = function(o, d) {
          return o !== void 0 && o.length ? f.getTypeOf(o) !== "string" ? (function(U, b, v, _) {
            var C = a, m = _ + v;
            U ^= -1;
            for (var w = _; w < m; w++) U = U >>> 8 ^ C[255 & (U ^ b[w])];
            return -1 ^ U;
          })(0 | d, o, o.length, 0) : (function(U, b, v, _) {
            var C = a, m = _ + v;
            U ^= -1;
            for (var w = _; w < m; w++) U = U >>> 8 ^ C[255 & (U ^ b.charCodeAt(w))];
            return -1 ^ U;
          })(0 | d, o, o.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(n, c, h) {
        "use strict";
        h.base64 = !1, h.binary = !1, h.dir = !1, h.createFolders = !0, h.date = null, h.compression = null, h.compressionOptions = null, h.comment = null, h.unixPermissions = null, h.dosPermissions = null;
      }, {}],
      6: [function(n, c, h) {
        "use strict";
        var f = null;
        f = typeof Promise < "u" ? Promise : n("lie"), c.exports = { Promise: f };
      }, { lie: 37 }],
      7: [function(n, c, h) {
        "use strict";
        var f = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", a = n("pako"), o = n("./utils"), d = n("./stream/GenericWorker"), U = f ? "uint8array" : "array";
        function b(v, _) {
          d.call(this, "FlateWorker/" + v), this._pako = null, this._pakoAction = v, this._pakoOptions = _, this.meta = {};
        }
        h.magic = "\b\0", o.inherits(b, d), b.prototype.processChunk = function(v) {
          this.meta = v.meta, this._pako === null && this._createPako(), this._pako.push(o.transformTo(U, v.data), !1);
        }, b.prototype.flush = function() {
          d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, b.prototype.cleanUp = function() {
          d.prototype.cleanUp.call(this), this._pako = null;
        }, b.prototype._createPako = function() {
          this._pako = new a[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var v = this;
          this._pako.onData = function(_) {
            v.push({
              data: _,
              meta: v.meta
            });
          };
        }, h.compressWorker = function(v) {
          return new b("Deflate", v);
        }, h.uncompressWorker = function() {
          return new b("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(n, c, h) {
        "use strict";
        function f(C, m) {
          var w, I = "";
          for (w = 0; w < m; w++) I += String.fromCharCode(255 & C), C >>>= 8;
          return I;
        }
        function a(C, m, w, I, T, x) {
          var N, O, F = C.file, g = C.compression, R = x !== U.utf8encode, V = o.transformTo("string", x(F.name)), E = o.transformTo("string", U.utf8encode(F.name)), q = F.comment, lA = o.transformTo("string", x(q)), k = o.transformTo("string", U.utf8encode(q)), Z = E.length !== F.name.length, L = k.length !== q.length, $ = "", uA = "", rA = "", vA = F.dir, sA = F.date, dA = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          m && !w || (dA.crc32 = C.crc32, dA.compressedSize = C.compressedSize, dA.uncompressedSize = C.uncompressedSize);
          var tA = 0;
          m && (tA |= 8), R || !Z && !L || (tA |= 2048);
          var P = 0, iA = 0;
          vA && (P |= 16), T === "UNIX" ? (iA = 798, P |= (function(fA, _A) {
            var H = fA;
            return fA || (H = _A ? 16893 : 33204), (65535 & H) << 16;
          })(F.unixPermissions, vA)) : (iA = 20, P |= (function(fA) {
            return 63 & (fA || 0);
          })(F.dosPermissions)), N = sA.getUTCHours(), N <<= 6, N |= sA.getUTCMinutes(), N <<= 5, N |= sA.getUTCSeconds() / 2, O = sA.getUTCFullYear() - 1980, O <<= 4, O |= sA.getUTCMonth() + 1, O <<= 5, O |= sA.getUTCDate(), Z && (uA = f(1, 1) + f(b(V), 4) + E, $ += "up" + f(uA.length, 2) + uA), L && (rA = f(1, 1) + f(b(lA), 4) + k, $ += "uc" + f(rA.length, 2) + rA);
          var aA = "";
          return aA += `
\0`, aA += f(tA, 2), aA += g.magic, aA += f(N, 2), aA += f(O, 2), aA += f(dA.crc32, 4), aA += f(dA.compressedSize, 4), aA += f(dA.uncompressedSize, 4), aA += f(V.length, 2), aA += f($.length, 2), {
            fileRecord: v.LOCAL_FILE_HEADER + aA + V + $,
            dirRecord: v.CENTRAL_FILE_HEADER + f(iA, 2) + aA + f(lA.length, 2) + "\0\0\0\0" + f(P, 4) + f(I, 4) + V + $ + lA
          };
        }
        var o = n("../utils"), d = n("../stream/GenericWorker"), U = n("../utf8"), b = n("../crc32"), v = n("../signature");
        function _(C, m, w, I) {
          d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = m, this.zipPlatform = w, this.encodeFileName = I, this.streamFiles = C, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        o.inherits(_, d), _.prototype.push = function(C) {
          var m = C.meta.percent || 0, w = this.entriesCount, I = this._sources.length;
          this.accumulate ? this.contentBuffer.push(C) : (this.bytesWritten += C.data.length, d.prototype.push.call(this, {
            data: C.data,
            meta: {
              currentFile: this.currentFile,
              percent: w ? (m + 100 * (w - I - 1)) / w : 100
            }
          }));
        }, _.prototype.openedSource = function(C) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = C.file.name;
          var m = this.streamFiles && !C.file.dir;
          if (m) {
            var w = a(C, m, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: w.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, _.prototype.closedSource = function(C) {
          this.accumulate = !1;
          var m = this.streamFiles && !C.file.dir, w = a(C, m, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(w.dirRecord), m) this.push({
            data: (function(I) {
              return v.DATA_DESCRIPTOR + f(I.crc32, 4) + f(I.compressedSize, 4) + f(I.uncompressedSize, 4);
            })(C),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: w.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, _.prototype.flush = function() {
          for (var C = this.bytesWritten, m = 0; m < this.dirRecords.length; m++) this.push({
            data: this.dirRecords[m],
            meta: { percent: 100 }
          });
          var w = this.bytesWritten - C, I = (function(T, x, N, O, F) {
            var g = o.transformTo("string", F(O));
            return v.CENTRAL_DIRECTORY_END + "\0\0\0\0" + f(T, 2) + f(T, 2) + f(x, 4) + f(N, 4) + f(g.length, 2) + g;
          })(this.dirRecords.length, w, C, this.zipComment, this.encodeFileName);
          this.push({
            data: I,
            meta: { percent: 100 }
          });
        }, _.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, _.prototype.registerPrevious = function(C) {
          this._sources.push(C);
          var m = this;
          return C.on("data", function(w) {
            m.processChunk(w);
          }), C.on("end", function() {
            m.closedSource(m.previous.streamInfo), m._sources.length ? m.prepareNextSource() : m.end();
          }), C.on("error", function(w) {
            m.error(w);
          }), this;
        }, _.prototype.resume = function() {
          return !!d.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, _.prototype.error = function(C) {
          var m = this._sources;
          if (!d.prototype.error.call(this, C)) return !1;
          for (var w = 0; w < m.length; w++) try {
            m[w].error(C);
          } catch {
          }
          return !0;
        }, _.prototype.lock = function() {
          d.prototype.lock.call(this);
          for (var C = this._sources, m = 0; m < C.length; m++) C[m].lock();
        }, c.exports = _;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(n, c, h) {
        "use strict";
        var f = n("../compressions"), a = n("./ZipFileWorker");
        h.generateWorker = function(o, d, U) {
          var b = new a(d.streamFiles, U, d.platform, d.encodeFileName), v = 0;
          try {
            o.forEach(function(_, C) {
              v++;
              var m = (function(x, N) {
                var O = x || N, F = f[O];
                if (!F) throw new Error(O + " is not a valid compression method !");
                return F;
              })(C.options.compression, d.compression), w = C.options.compressionOptions || d.compressionOptions || {}, I = C.dir, T = C.date;
              C._compressWorker(m, w).withStreamInfo("file", {
                name: _,
                dir: I,
                date: T,
                comment: C.comment || "",
                unixPermissions: C.unixPermissions,
                dosPermissions: C.dosPermissions
              }).pipe(b);
            }), b.entriesCount = v;
          } catch (_) {
            b.error(_);
          }
          return b;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(n, c, h) {
        "use strict";
        function f() {
          if (!(this instanceof f)) return new f();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var a = new f();
            for (var o in this) typeof this[o] != "function" && (a[o] = this[o]);
            return a;
          };
        }
        (f.prototype = n("./object")).loadAsync = n("./load"), f.support = n("./support"), f.defaults = n("./defaults"), f.version = "3.10.1", f.loadAsync = function(a, o) {
          return new f().loadAsync(a, o);
        }, f.external = n("./external"), c.exports = f;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(n, c, h) {
        "use strict";
        var f = n("./utils"), a = n("./external"), o = n("./utf8"), d = n("./zipEntries"), U = n("./stream/Crc32Probe"), b = n("./nodejsUtils");
        function v(_) {
          return new a.Promise(function(C, m) {
            var w = _.decompressed.getContentWorker().pipe(new U());
            w.on("error", function(I) {
              m(I);
            }).on("end", function() {
              w.streamInfo.crc32 !== _.decompressed.crc32 ? m(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : C();
            }).resume();
          });
        }
        c.exports = function(_, C) {
          var m = this;
          return C = f.extend(C || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: o.utf8decode
          }), b.isNode && b.isStream(_) ? a.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : f.prepareContent("the loaded zip file", _, !0, C.optimizedBinaryString, C.base64).then(function(w) {
            var I = new d(C);
            return I.load(w), I;
          }).then(function(w) {
            var I = [a.Promise.resolve(w)], T = w.files;
            if (C.checkCRC32) for (var x = 0; x < T.length; x++) I.push(v(T[x]));
            return a.Promise.all(I);
          }).then(function(w) {
            for (var I = w.shift(), T = I.files, x = 0; x < T.length; x++) {
              var N = T[x], O = N.fileNameStr, F = f.resolve(N.fileNameStr);
              m.file(F, N.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: N.date,
                dir: N.dir,
                comment: N.fileCommentStr.length ? N.fileCommentStr : null,
                unixPermissions: N.unixPermissions,
                dosPermissions: N.dosPermissions,
                createFolders: C.createFolders
              }), N.dir || (m.file(F).unsafeOriginalName = O);
            }
            return I.zipComment.length && (m.comment = I.zipComment), m;
          });
        };
      }, {
        "./external": 6,
        "./nodejsUtils": 14,
        "./stream/Crc32Probe": 25,
        "./utf8": 31,
        "./utils": 32,
        "./zipEntries": 33
      }],
      12: [function(n, c, h) {
        "use strict";
        var f = n("../utils"), a = n("../stream/GenericWorker");
        function o(d, U) {
          a.call(this, "Nodejs stream input adapter for " + d), this._upstreamEnded = !1, this._bindStream(U);
        }
        f.inherits(o, a), o.prototype._bindStream = function(d) {
          var U = this;
          (this._stream = d).pause(), d.on("data", function(b) {
            U.push({
              data: b,
              meta: { percent: 0 }
            });
          }).on("error", function(b) {
            U.isPaused ? this.generatedError = b : U.error(b);
          }).on("end", function() {
            U.isPaused ? U._upstreamEnded = !0 : U.end();
          });
        }, o.prototype.pause = function() {
          return !!a.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, o.prototype.resume = function() {
          return !!a.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, c.exports = o;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(n, c, h) {
        "use strict";
        var f = n("readable-stream").Readable;
        function a(o, d, U) {
          f.call(this, d), this._helper = o;
          var b = this;
          o.on("data", function(v, _) {
            b.push(v) || b._helper.pause(), U && U(_);
          }).on("error", function(v) {
            b.emit("error", v);
          }).on("end", function() {
            b.push(null);
          });
        }
        n("../utils").inherits(a, f), a.prototype._read = function() {
          this._helper.resume();
        }, c.exports = a;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(n, c, h) {
        "use strict";
        c.exports = {
          isNode: typeof Buffer < "u",
          newBufferFrom: function(f, a) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(f, a);
            if (typeof f == "number") throw new Error('The "data" argument must not be a number');
            return new Buffer(f, a);
          },
          allocBuffer: function(f) {
            if (Buffer.alloc) return Buffer.alloc(f);
            var a = new Buffer(f);
            return a.fill(0), a;
          },
          isBuffer: function(f) {
            return Buffer.isBuffer(f);
          },
          isStream: function(f) {
            return f && typeof f.on == "function" && typeof f.pause == "function" && typeof f.resume == "function";
          }
        };
      }, {}],
      15: [function(n, c, h) {
        "use strict";
        function f(O, F, g) {
          var R, V = o.getTypeOf(F), E = o.extend(g || {}, b);
          E.date = E.date || /* @__PURE__ */ new Date(), E.compression !== null && (E.compression = E.compression.toUpperCase()), typeof E.unixPermissions == "string" && (E.unixPermissions = parseInt(E.unixPermissions, 8)), E.unixPermissions && 16384 & E.unixPermissions && (E.dir = !0), E.dosPermissions && 16 & E.dosPermissions && (E.dir = !0), E.dir && (O = T(O)), E.createFolders && (R = I(O)) && x.call(this, R, !0);
          var q = V === "string" && E.binary === !1 && E.base64 === !1;
          g && g.binary !== void 0 || (E.binary = !q), (F instanceof v && F.uncompressedSize === 0 || E.dir || !F || F.length === 0) && (E.base64 = !1, E.binary = !0, F = "", E.compression = "STORE", V = "string");
          var lA = null;
          lA = F instanceof v || F instanceof d ? F : m.isNode && m.isStream(F) ? new w(O, F) : o.prepareContent(O, F, E.binary, E.optimizedBinaryString, E.base64);
          var k = new _(O, lA, E);
          this.files[O] = k;
        }
        var a = n("./utf8"), o = n("./utils"), d = n("./stream/GenericWorker"), U = n("./stream/StreamHelper"), b = n("./defaults"), v = n("./compressedObject"), _ = n("./zipObject"), C = n("./generate"), m = n("./nodejsUtils"), w = n("./nodejs/NodejsStreamInputAdapter"), I = function(O) {
          O.slice(-1) === "/" && (O = O.substring(0, O.length - 1));
          var F = O.lastIndexOf("/");
          return 0 < F ? O.substring(0, F) : "";
        }, T = function(O) {
          return O.slice(-1) !== "/" && (O += "/"), O;
        }, x = function(O, F) {
          return F = F !== void 0 ? F : b.createFolders, O = T(O), this.files[O] || f.call(this, O, null, {
            dir: !0,
            createFolders: F
          }), this.files[O];
        };
        function N(O) {
          return Object.prototype.toString.call(O) === "[object RegExp]";
        }
        c.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(O) {
            var F, g, R;
            for (F in this.files) R = this.files[F], (g = F.slice(this.root.length, F.length)) && F.slice(0, this.root.length) === this.root && O(g, R);
          },
          filter: function(O) {
            var F = [];
            return this.forEach(function(g, R) {
              O(g, R) && F.push(R);
            }), F;
          },
          file: function(O, F, g) {
            if (arguments.length !== 1) return O = this.root + O, f.call(this, O, F, g), this;
            if (N(O)) {
              var R = O;
              return this.filter(function(E, q) {
                return !q.dir && R.test(E);
              });
            }
            var V = this.files[this.root + O];
            return V && !V.dir ? V : null;
          },
          folder: function(O) {
            if (!O) return this;
            if (N(O)) return this.filter(function(V, E) {
              return E.dir && O.test(V);
            });
            var F = this.root + O, g = x.call(this, F), R = this.clone();
            return R.root = g.name, R;
          },
          remove: function(O) {
            O = this.root + O;
            var F = this.files[O];
            if (F || (O.slice(-1) !== "/" && (O += "/"), F = this.files[O]), F && !F.dir) delete this.files[O];
            else for (var g = this.filter(function(V, E) {
              return E.name.slice(0, O.length) === O;
            }), R = 0; R < g.length; R++) delete this.files[g[R].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(O) {
            var F, g = {};
            try {
              if ((g = o.extend(O || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: a.utf8encode
              })).type = g.type.toLowerCase(), g.compression = g.compression.toUpperCase(), g.type === "binarystring" && (g.type = "string"), !g.type) throw new Error("No output type specified.");
              o.checkSupport(g.type), g.platform !== "darwin" && g.platform !== "freebsd" && g.platform !== "linux" && g.platform !== "sunos" || (g.platform = "UNIX"), g.platform === "win32" && (g.platform = "DOS");
              var R = g.comment || this.comment || "";
              F = C.generateWorker(this, g, R);
            } catch (V) {
              (F = new d("error")).error(V);
            }
            return new U(F, g.type || "string", g.mimeType);
          },
          generateAsync: function(O, F) {
            return this.generateInternalStream(O).accumulate(F);
          },
          generateNodeStream: function(O, F) {
            return (O = O || {}).type || (O.type = "nodebuffer"), this.generateInternalStream(O).toNodejsStream(F);
          }
        };
      }, {
        "./compressedObject": 2,
        "./defaults": 5,
        "./generate": 9,
        "./nodejs/NodejsStreamInputAdapter": 12,
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31,
        "./utils": 32,
        "./zipObject": 35
      }],
      16: [function(n, c, h) {
        "use strict";
        c.exports = n("stream");
      }, { stream: void 0 }],
      17: [function(n, c, h) {
        "use strict";
        var f = n("./DataReader");
        function a(o) {
          f.call(this, o);
          for (var d = 0; d < this.data.length; d++) o[d] = 255 & o[d];
        }
        n("../utils").inherits(a, f), a.prototype.byteAt = function(o) {
          return this.data[this.zero + o];
        }, a.prototype.lastIndexOfSignature = function(o) {
          for (var d = o.charCodeAt(0), U = o.charCodeAt(1), b = o.charCodeAt(2), v = o.charCodeAt(3), _ = this.length - 4; 0 <= _; --_) if (this.data[_] === d && this.data[_ + 1] === U && this.data[_ + 2] === b && this.data[_ + 3] === v) return _ - this.zero;
          return -1;
        }, a.prototype.readAndCheckSignature = function(o) {
          var d = o.charCodeAt(0), U = o.charCodeAt(1), b = o.charCodeAt(2), v = o.charCodeAt(3), _ = this.readData(4);
          return d === _[0] && U === _[1] && b === _[2] && v === _[3];
        }, a.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return [];
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = a;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(n, c, h) {
        "use strict";
        var f = n("../utils");
        function a(o) {
          this.data = o, this.length = o.length, this.index = 0, this.zero = 0;
        }
        a.prototype = {
          checkOffset: function(o) {
            this.checkIndex(this.index + o);
          },
          checkIndex: function(o) {
            if (this.length < this.zero + o || o < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + o + "). Corrupted zip ?");
          },
          setIndex: function(o) {
            this.checkIndex(o), this.index = o;
          },
          skip: function(o) {
            this.setIndex(this.index + o);
          },
          byteAt: function() {
          },
          readInt: function(o) {
            var d, U = 0;
            for (this.checkOffset(o), d = this.index + o - 1; d >= this.index; d--) U = (U << 8) + this.byteAt(d);
            return this.index += o, U;
          },
          readString: function(o) {
            return f.transformTo("string", this.readData(o));
          },
          readData: function() {
          },
          lastIndexOfSignature: function() {
          },
          readAndCheckSignature: function() {
          },
          readDate: function() {
            var o = this.readInt(4);
            return new Date(Date.UTC(1980 + (o >> 25 & 127), (o >> 21 & 15) - 1, o >> 16 & 31, o >> 11 & 31, o >> 5 & 63, (31 & o) << 1));
          }
        }, c.exports = a;
      }, { "../utils": 32 }],
      19: [function(n, c, h) {
        "use strict";
        var f = n("./Uint8ArrayReader");
        function a(o) {
          f.call(this, o);
        }
        n("../utils").inherits(a, f), a.prototype.readData = function(o) {
          this.checkOffset(o);
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = a;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(n, c, h) {
        "use strict";
        var f = n("./DataReader");
        function a(o) {
          f.call(this, o);
        }
        n("../utils").inherits(a, f), a.prototype.byteAt = function(o) {
          return this.data.charCodeAt(this.zero + o);
        }, a.prototype.lastIndexOfSignature = function(o) {
          return this.data.lastIndexOf(o) - this.zero;
        }, a.prototype.readAndCheckSignature = function(o) {
          return o === this.readData(4);
        }, a.prototype.readData = function(o) {
          this.checkOffset(o);
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = a;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(n, c, h) {
        "use strict";
        var f = n("./ArrayReader");
        function a(o) {
          f.call(this, o);
        }
        n("../utils").inherits(a, f), a.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return new Uint8Array(0);
          var d = this.data.subarray(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = a;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(n, c, h) {
        "use strict";
        var f = n("../utils"), a = n("../support"), o = n("./ArrayReader"), d = n("./StringReader"), U = n("./NodeBufferReader"), b = n("./Uint8ArrayReader");
        c.exports = function(v) {
          var _ = f.getTypeOf(v);
          return f.checkSupport(_), _ !== "string" || a.uint8array ? _ === "nodebuffer" ? new U(v) : a.uint8array ? new b(f.transformTo("uint8array", v)) : new o(f.transformTo("array", v)) : new d(v);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(n, c, h) {
        "use strict";
        h.LOCAL_FILE_HEADER = "PK", h.CENTRAL_FILE_HEADER = "PK", h.CENTRAL_DIRECTORY_END = "PK", h.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", h.ZIP64_CENTRAL_DIRECTORY_END = "PK", h.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(n, c, h) {
        "use strict";
        var f = n("./GenericWorker"), a = n("../utils");
        function o(d) {
          f.call(this, "ConvertWorker to " + d), this.destType = d;
        }
        a.inherits(o, f), o.prototype.processChunk = function(d) {
          this.push({
            data: a.transformTo(this.destType, d.data),
            meta: d.meta
          });
        }, c.exports = o;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(n, c, h) {
        "use strict";
        var f = n("./GenericWorker"), a = n("../crc32");
        function o() {
          f.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        n("../utils").inherits(o, f), o.prototype.processChunk = function(d) {
          this.streamInfo.crc32 = a(d.data, this.streamInfo.crc32 || 0), this.push(d);
        }, c.exports = o;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(n, c, h) {
        "use strict";
        var f = n("../utils"), a = n("./GenericWorker");
        function o(d) {
          a.call(this, "DataLengthProbe for " + d), this.propName = d, this.withStreamInfo(d, 0);
        }
        f.inherits(o, a), o.prototype.processChunk = function(d) {
          if (d) {
            var U = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = U + d.data.length;
          }
          a.prototype.processChunk.call(this, d);
        }, c.exports = o;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(n, c, h) {
        "use strict";
        var f = n("../utils"), a = n("./GenericWorker");
        function o(d) {
          a.call(this, "DataWorker");
          var U = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, d.then(function(b) {
            U.dataIsReady = !0, U.data = b, U.max = b && b.length || 0, U.type = f.getTypeOf(b), U.isPaused || U._tickAndRepeat();
          }, function(b) {
            U.error(b);
          });
        }
        f.inherits(o, a), o.prototype.cleanUp = function() {
          a.prototype.cleanUp.call(this), this.data = null;
        }, o.prototype.resume = function() {
          return !!a.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, f.delay(this._tickAndRepeat, [], this)), !0);
        }, o.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (f.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, o.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var d = null, U = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              d = this.data.substring(this.index, U);
              break;
            case "uint8array":
              d = this.data.subarray(this.index, U);
              break;
            case "array":
            case "nodebuffer":
              d = this.data.slice(this.index, U);
          }
          return this.index = U, this.push({
            data: d,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, c.exports = o;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(n, c, h) {
        "use strict";
        function f(a) {
          this.name = a || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        f.prototype = {
          push: function(a) {
            this.emit("data", a);
          },
          end: function() {
            if (this.isFinished) return !1;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = !0;
            } catch (a) {
              this.emit("error", a);
            }
            return !0;
          },
          error: function(a) {
            return !this.isFinished && (this.isPaused ? this.generatedError = a : (this.isFinished = !0, this.emit("error", a), this.previous && this.previous.error(a), this.cleanUp()), !0);
          },
          on: function(a, o) {
            return this._listeners[a].push(o), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(a, o) {
            if (this._listeners[a]) for (var d = 0; d < this._listeners[a].length; d++) this._listeners[a][d].call(this, o);
          },
          pipe: function(a) {
            return a.registerPrevious(this);
          },
          registerPrevious: function(a) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = a.streamInfo, this.mergeStreamInfo(), this.previous = a;
            var o = this;
            return a.on("data", function(d) {
              o.processChunk(d);
            }), a.on("end", function() {
              o.end();
            }), a.on("error", function(d) {
              o.error(d);
            }), this;
          },
          pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
          },
          resume: function() {
            if (!this.isPaused || this.isFinished) return !1;
            var a = this.isPaused = !1;
            return this.generatedError && (this.error(this.generatedError), a = !0), this.previous && this.previous.resume(), !a;
          },
          flush: function() {
          },
          processChunk: function(a) {
            this.push(a);
          },
          withStreamInfo: function(a, o) {
            return this.extraStreamInfo[a] = o, this.mergeStreamInfo(), this;
          },
          mergeStreamInfo: function() {
            for (var a in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, a) && (this.streamInfo[a] = this.extraStreamInfo[a]);
          },
          lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = !0, this.previous && this.previous.lock();
          },
          toString: function() {
            var a = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + a : a;
          }
        }, c.exports = f;
      }, {}],
      29: [function(n, c, h) {
        "use strict";
        var f = n("../utils"), a = n("./ConvertWorker"), o = n("./GenericWorker"), d = n("../base64"), U = n("../support"), b = n("../external"), v = null;
        if (U.nodestream) try {
          v = n("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function _(m, w) {
          return new b.Promise(function(I, T) {
            var x = [], N = m._internalType, O = m._outputType, F = m._mimeType;
            m.on("data", function(g, R) {
              x.push(g), w && w(R);
            }).on("error", function(g) {
              x = [], T(g);
            }).on("end", function() {
              try {
                I((function(g, R, V) {
                  switch (g) {
                    case "blob":
                      return f.newBlob(f.transformTo("arraybuffer", R), V);
                    case "base64":
                      return d.encode(R);
                    default:
                      return f.transformTo(g, R);
                  }
                })(O, (function(g, R) {
                  var V, E = 0, q = null, lA = 0;
                  for (V = 0; V < R.length; V++) lA += R[V].length;
                  switch (g) {
                    case "string":
                      return R.join("");
                    case "array":
                      return Array.prototype.concat.apply([], R);
                    case "uint8array":
                      for (q = new Uint8Array(lA), V = 0; V < R.length; V++) q.set(R[V], E), E += R[V].length;
                      return q;
                    case "nodebuffer":
                      return Buffer.concat(R);
                    default:
                      throw new Error("concat : unsupported type '" + g + "'");
                  }
                })(N, x), F));
              } catch (g) {
                T(g);
              }
              x = [];
            }).resume();
          });
        }
        function C(m, w, I) {
          var T = w;
          switch (w) {
            case "blob":
            case "arraybuffer":
              T = "uint8array";
              break;
            case "base64":
              T = "string";
          }
          try {
            this._internalType = T, this._outputType = w, this._mimeType = I, f.checkSupport(T), this._worker = m.pipe(new a(T)), m.lock();
          } catch (x) {
            this._worker = new o("error"), this._worker.error(x);
          }
        }
        C.prototype = {
          accumulate: function(m) {
            return _(this, m);
          },
          on: function(m, w) {
            var I = this;
            return m === "data" ? this._worker.on(m, function(T) {
              w.call(I, T.data, T.meta);
            }) : this._worker.on(m, function() {
              f.delay(w, arguments, I);
            }), this;
          },
          resume: function() {
            return f.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(m) {
            if (f.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new v(this, { objectMode: this._outputType !== "nodebuffer" }, m);
          }
        }, c.exports = C;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(n, c, h) {
        "use strict";
        if (h.base64 = !0, h.array = !0, h.string = !0, h.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", h.nodebuffer = typeof Buffer < "u", h.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") h.blob = !1;
        else {
          var f = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            h.blob = new Blob([f], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var a = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              a.append(f), h.blob = a.getBlob("application/zip").size === 0;
            } catch {
              h.blob = !1;
            }
          }
        }
        try {
          h.nodestream = !!n("readable-stream").Readable;
        } catch {
          h.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(n, c, h) {
        "use strict";
        for (var f = n("./utils"), a = n("./support"), o = n("./nodejsUtils"), d = n("./stream/GenericWorker"), U = new Array(256), b = 0; b < 256; b++) U[b] = 252 <= b ? 6 : 248 <= b ? 5 : 240 <= b ? 4 : 224 <= b ? 3 : 192 <= b ? 2 : 1;
        U[254] = U[254] = 1;
        function v() {
          d.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function _() {
          d.call(this, "utf-8 encode");
        }
        h.utf8encode = function(C) {
          return a.nodebuffer ? o.newBufferFrom(C, "utf-8") : (function(m) {
            var w, I, T, x, N, O = m.length, F = 0;
            for (x = 0; x < O; x++) (64512 & (I = m.charCodeAt(x))) == 55296 && x + 1 < O && (64512 & (T = m.charCodeAt(x + 1))) == 56320 && (I = 65536 + (I - 55296 << 10) + (T - 56320), x++), F += I < 128 ? 1 : I < 2048 ? 2 : I < 65536 ? 3 : 4;
            for (w = a.uint8array ? new Uint8Array(F) : new Array(F), x = N = 0; N < F; x++) (64512 & (I = m.charCodeAt(x))) == 55296 && x + 1 < O && (64512 & (T = m.charCodeAt(x + 1))) == 56320 && (I = 65536 + (I - 55296 << 10) + (T - 56320), x++), I < 128 ? w[N++] = I : (I < 2048 ? w[N++] = 192 | I >>> 6 : (I < 65536 ? w[N++] = 224 | I >>> 12 : (w[N++] = 240 | I >>> 18, w[N++] = 128 | I >>> 12 & 63), w[N++] = 128 | I >>> 6 & 63), w[N++] = 128 | 63 & I);
            return w;
          })(C);
        }, h.utf8decode = function(C) {
          return a.nodebuffer ? f.transformTo("nodebuffer", C).toString("utf-8") : (function(m) {
            var w, I, T, x, N = m.length, O = new Array(2 * N);
            for (w = I = 0; w < N; ) if ((T = m[w++]) < 128) O[I++] = T;
            else if (4 < (x = U[T])) O[I++] = 65533, w += x - 1;
            else {
              for (T &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && w < N; ) T = T << 6 | 63 & m[w++], x--;
              1 < x ? O[I++] = 65533 : T < 65536 ? O[I++] = T : (T -= 65536, O[I++] = 55296 | T >> 10 & 1023, O[I++] = 56320 | 1023 & T);
            }
            return O.length !== I && (O.subarray ? O = O.subarray(0, I) : O.length = I), f.applyFromCharCode(O);
          })(C = f.transformTo(a.uint8array ? "uint8array" : "array", C));
        }, f.inherits(v, d), v.prototype.processChunk = function(C) {
          var m = f.transformTo(a.uint8array ? "uint8array" : "array", C.data);
          if (this.leftOver && this.leftOver.length) {
            if (a.uint8array) {
              var w = m;
              (m = new Uint8Array(w.length + this.leftOver.length)).set(this.leftOver, 0), m.set(w, this.leftOver.length);
            } else m = this.leftOver.concat(m);
            this.leftOver = null;
          }
          var I = (function(x, N) {
            var O;
            for ((N = N || x.length) > x.length && (N = x.length), O = N - 1; 0 <= O && (192 & x[O]) == 128; ) O--;
            return O < 0 || O === 0 ? N : O + U[x[O]] > N ? O : N;
          })(m), T = m;
          I !== m.length && (a.uint8array ? (T = m.subarray(0, I), this.leftOver = m.subarray(I, m.length)) : (T = m.slice(0, I), this.leftOver = m.slice(I, m.length))), this.push({
            data: h.utf8decode(T),
            meta: C.meta
          });
        }, v.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: h.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, h.Utf8DecodeWorker = v, f.inherits(_, d), _.prototype.processChunk = function(C) {
          this.push({
            data: h.utf8encode(C.data),
            meta: C.meta
          });
        }, h.Utf8EncodeWorker = _;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(n, c, h) {
        "use strict";
        var f = n("./support"), a = n("./base64"), o = n("./nodejsUtils"), d = n("./external");
        function U(w) {
          return w;
        }
        function b(w, I) {
          for (var T = 0; T < w.length; ++T) I[T] = 255 & w.charCodeAt(T);
          return I;
        }
        n("setimmediate"), h.newBlob = function(w, I) {
          h.checkSupport("blob");
          try {
            return new Blob([w], { type: I });
          } catch {
            try {
              var T = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return T.append(w), T.getBlob(I);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var v = {
          stringifyByChunk: function(w, I, T) {
            var x = [], N = 0, O = w.length;
            if (O <= T) return String.fromCharCode.apply(null, w);
            for (; N < O; ) I === "array" || I === "nodebuffer" ? x.push(String.fromCharCode.apply(null, w.slice(N, Math.min(N + T, O)))) : x.push(String.fromCharCode.apply(null, w.subarray(N, Math.min(N + T, O)))), N += T;
            return x.join("");
          },
          stringifyByChar: function(w) {
            for (var I = "", T = 0; T < w.length; T++) I += String.fromCharCode(w[T]);
            return I;
          },
          applyCanBeUsed: {
            uint8array: (function() {
              try {
                return f.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
              } catch {
                return !1;
              }
            })(),
            nodebuffer: (function() {
              try {
                return f.nodebuffer && String.fromCharCode.apply(null, o.allocBuffer(1)).length === 1;
              } catch {
                return !1;
              }
            })()
          }
        };
        function _(w) {
          var I = 65536, T = h.getTypeOf(w), x = !0;
          if (T === "uint8array" ? x = v.applyCanBeUsed.uint8array : T === "nodebuffer" && (x = v.applyCanBeUsed.nodebuffer), x) for (; 1 < I; ) try {
            return v.stringifyByChunk(w, T, I);
          } catch {
            I = Math.floor(I / 2);
          }
          return v.stringifyByChar(w);
        }
        function C(w, I) {
          for (var T = 0; T < w.length; T++) I[T] = w[T];
          return I;
        }
        h.applyFromCharCode = _;
        var m = {};
        m.string = {
          string: U,
          array: function(w) {
            return b(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return m.string.uint8array(w).buffer;
          },
          uint8array: function(w) {
            return b(w, new Uint8Array(w.length));
          },
          nodebuffer: function(w) {
            return b(w, o.allocBuffer(w.length));
          }
        }, m.array = {
          string: _,
          array: U,
          arraybuffer: function(w) {
            return new Uint8Array(w).buffer;
          },
          uint8array: function(w) {
            return new Uint8Array(w);
          },
          nodebuffer: function(w) {
            return o.newBufferFrom(w);
          }
        }, m.arraybuffer = {
          string: function(w) {
            return _(new Uint8Array(w));
          },
          array: function(w) {
            return C(new Uint8Array(w), new Array(w.byteLength));
          },
          arraybuffer: U,
          uint8array: function(w) {
            return new Uint8Array(w);
          },
          nodebuffer: function(w) {
            return o.newBufferFrom(new Uint8Array(w));
          }
        }, m.uint8array = {
          string: _,
          array: function(w) {
            return C(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return w.buffer;
          },
          uint8array: U,
          nodebuffer: function(w) {
            return o.newBufferFrom(w);
          }
        }, m.nodebuffer = {
          string: _,
          array: function(w) {
            return C(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return m.nodebuffer.uint8array(w).buffer;
          },
          uint8array: function(w) {
            return C(w, new Uint8Array(w.length));
          },
          nodebuffer: U
        }, h.transformTo = function(w, I) {
          return I = I || "", w ? (h.checkSupport(w), m[h.getTypeOf(I)][w](I)) : I;
        }, h.resolve = function(w) {
          for (var I = w.split("/"), T = [], x = 0; x < I.length; x++) {
            var N = I[x];
            N === "." || N === "" && x !== 0 && x !== I.length - 1 || (N === ".." ? T.pop() : T.push(N));
          }
          return T.join("/");
        }, h.getTypeOf = function(w) {
          return typeof w == "string" ? "string" : Object.prototype.toString.call(w) === "[object Array]" ? "array" : f.nodebuffer && o.isBuffer(w) ? "nodebuffer" : f.uint8array && w instanceof Uint8Array ? "uint8array" : f.arraybuffer && w instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, h.checkSupport = function(w) {
          if (!f[w.toLowerCase()]) throw new Error(w + " is not supported by this platform");
        }, h.MAX_VALUE_16BITS = 65535, h.MAX_VALUE_32BITS = -1, h.pretty = function(w) {
          var I, T, x = "";
          for (T = 0; T < (w || "").length; T++) x += "\\x" + ((I = w.charCodeAt(T)) < 16 ? "0" : "") + I.toString(16).toUpperCase();
          return x;
        }, h.delay = function(w, I, T) {
          setImmediate(function() {
            w.apply(T || null, I || []);
          });
        }, h.inherits = function(w, I) {
          function T() {
          }
          T.prototype = I.prototype, w.prototype = new T();
        }, h.extend = function() {
          var w, I, T = {};
          for (w = 0; w < arguments.length; w++) for (I in arguments[w]) Object.prototype.hasOwnProperty.call(arguments[w], I) && T[I] === void 0 && (T[I] = arguments[w][I]);
          return T;
        }, h.prepareContent = function(w, I, T, x, N) {
          return d.Promise.resolve(I).then(function(O) {
            return f.blob && (O instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(O)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(F, g) {
              var R = new FileReader();
              R.onload = function(V) {
                F(V.target.result);
              }, R.onerror = function(V) {
                g(V.target.error);
              }, R.readAsArrayBuffer(O);
            }) : O;
          }).then(function(O) {
            var F = h.getTypeOf(O);
            return F ? (F === "arraybuffer" ? O = h.transformTo("uint8array", O) : F === "string" && (N ? O = a.decode(O) : T && x !== !0 && (O = (function(g) {
              return b(g, f.uint8array ? new Uint8Array(g.length) : new Array(g.length));
            })(O))), O) : d.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + w + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(n, c, h) {
        "use strict";
        var f = n("./reader/readerFor"), a = n("./utils"), o = n("./signature"), d = n("./zipEntry"), U = n("./support");
        function b(v) {
          this.files = [], this.loadOptions = v;
        }
        b.prototype = {
          checkSignature: function(v) {
            if (!this.reader.readAndCheckSignature(v)) {
              this.reader.index -= 4;
              var _ = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + a.pretty(_) + ", expected " + a.pretty(v) + ")");
            }
          },
          isSignature: function(v, _) {
            var C = this.reader.index;
            this.reader.setIndex(v);
            var m = this.reader.readString(4) === _;
            return this.reader.setIndex(C), m;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var v = this.reader.readData(this.zipCommentLength), _ = U.uint8array ? "uint8array" : "array", C = a.transformTo(_, v);
            this.zipComment = this.loadOptions.decodeFileName(C);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var v, _, C, m = this.zip64EndOfCentralSize - 44; 0 < m; ) v = this.reader.readInt(2), _ = this.reader.readInt(4), C = this.reader.readData(_), this.zip64ExtensibleData[v] = {
              id: v,
              length: _,
              value: C
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            var v, _;
            for (v = 0; v < this.files.length; v++) _ = this.files[v], this.reader.setIndex(_.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), _.readLocalPart(this.reader), _.handleUTF8(), _.processAttributes();
          },
          readCentralDir: function() {
            var v;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER); ) (v = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(v);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var v = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
            if (v < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(v);
            var _ = v;
            if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === a.MAX_VALUE_16BITS || this.diskWithCentralDirStart === a.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === a.MAX_VALUE_16BITS || this.centralDirRecords === a.MAX_VALUE_16BITS || this.centralDirSize === a.MAX_VALUE_32BITS || this.centralDirOffset === a.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (v = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(v), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var C = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (C += 20, C += 12 + this.zip64EndOfCentralSize);
            var m = _ - C;
            if (0 < m) this.isSignature(_, o.CENTRAL_FILE_HEADER) || (this.reader.zero = m);
            else if (m < 0) throw new Error("Corrupted zip: missing " + Math.abs(m) + " bytes.");
          },
          prepareReader: function(v) {
            this.reader = f(v);
          },
          load: function(v) {
            this.prepareReader(v), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, c.exports = b;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(n, c, h) {
        "use strict";
        var f = n("./reader/readerFor"), a = n("./utils"), o = n("./compressedObject"), d = n("./crc32"), U = n("./utf8"), b = n("./compressions"), v = n("./support");
        function _(C, m) {
          this.options = C, this.loadOptions = m;
        }
        _.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(C) {
            var m, w;
            if (C.skip(22), this.fileNameLength = C.readInt(2), w = C.readInt(2), this.fileName = C.readData(this.fileNameLength), C.skip(w), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((m = (function(I) {
              for (var T in b) if (Object.prototype.hasOwnProperty.call(b, T) && b[T].magic === I) return b[T];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + a.transformTo("string", this.fileName) + ")");
            this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, m, C.readData(this.compressedSize));
          },
          readCentralPart: function(C) {
            this.versionMadeBy = C.readInt(2), C.skip(2), this.bitFlag = C.readInt(2), this.compressionMethod = C.readString(2), this.date = C.readDate(), this.crc32 = C.readInt(4), this.compressedSize = C.readInt(4), this.uncompressedSize = C.readInt(4);
            var m = C.readInt(2);
            if (this.extraFieldsLength = C.readInt(2), this.fileCommentLength = C.readInt(2), this.diskNumberStart = C.readInt(2), this.internalFileAttributes = C.readInt(2), this.externalFileAttributes = C.readInt(4), this.localHeaderOffset = C.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            C.skip(m), this.readExtraFields(C), this.parseZIP64ExtraField(C), this.fileComment = C.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var C = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), C == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), C == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var C = f(this.extraFields[1].value);
              this.uncompressedSize === a.MAX_VALUE_32BITS && (this.uncompressedSize = C.readInt(8)), this.compressedSize === a.MAX_VALUE_32BITS && (this.compressedSize = C.readInt(8)), this.localHeaderOffset === a.MAX_VALUE_32BITS && (this.localHeaderOffset = C.readInt(8)), this.diskNumberStart === a.MAX_VALUE_32BITS && (this.diskNumberStart = C.readInt(4));
            }
          },
          readExtraFields: function(C) {
            var m, w, I, T = C.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); C.index + 4 < T; ) m = C.readInt(2), w = C.readInt(2), I = C.readData(w), this.extraFields[m] = {
              id: m,
              length: w,
              value: I
            };
            C.setIndex(T);
          },
          handleUTF8: function() {
            var C = v.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = U.utf8decode(this.fileName), this.fileCommentStr = U.utf8decode(this.fileComment);
            else {
              var m = this.findExtraFieldUnicodePath();
              if (m !== null) this.fileNameStr = m;
              else {
                var w = a.transformTo(C, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(w);
              }
              var I = this.findExtraFieldUnicodeComment();
              if (I !== null) this.fileCommentStr = I;
              else {
                var T = a.transformTo(C, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(T);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var C = this.extraFields[28789];
            if (C) {
              var m = f(C.value);
              return m.readInt(1) !== 1 || d(this.fileName) !== m.readInt(4) ? null : U.utf8decode(m.readData(C.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var C = this.extraFields[25461];
            if (C) {
              var m = f(C.value);
              return m.readInt(1) !== 1 || d(this.fileComment) !== m.readInt(4) ? null : U.utf8decode(m.readData(C.length - 5));
            }
            return null;
          }
        }, c.exports = _;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(n, c, h) {
        "use strict";
        function f(m, w, I) {
          this.name = m, this.dir = I.dir, this.date = I.date, this.comment = I.comment, this.unixPermissions = I.unixPermissions, this.dosPermissions = I.dosPermissions, this._data = w, this._dataBinary = I.binary, this.options = {
            compression: I.compression,
            compressionOptions: I.compressionOptions
          };
        }
        var a = n("./stream/StreamHelper"), o = n("./stream/DataWorker"), d = n("./utf8"), U = n("./compressedObject"), b = n("./stream/GenericWorker");
        f.prototype = {
          internalStream: function(m) {
            var w = null, I = "string";
            try {
              if (!m) throw new Error("No output type specified.");
              var T = (I = m.toLowerCase()) === "string" || I === "text";
              I !== "binarystring" && I !== "text" || (I = "string"), w = this._decompressWorker();
              var x = !this._dataBinary;
              x && !T && (w = w.pipe(new d.Utf8EncodeWorker())), !x && T && (w = w.pipe(new d.Utf8DecodeWorker()));
            } catch (N) {
              (w = new b("error")).error(N);
            }
            return new a(w, I, "");
          },
          async: function(m, w) {
            return this.internalStream(m).accumulate(w);
          },
          nodeStream: function(m, w) {
            return this.internalStream(m || "nodebuffer").toNodejsStream(w);
          },
          _compressWorker: function(m, w) {
            if (this._data instanceof U && this._data.compression.magic === m.magic) return this._data.getCompressedWorker();
            var I = this._decompressWorker();
            return this._dataBinary || (I = I.pipe(new d.Utf8EncodeWorker())), U.createWorkerFrom(I, m, w);
          },
          _decompressWorker: function() {
            return this._data instanceof U ? this._data.getContentWorker() : this._data instanceof b ? this._data : new o(this._data);
          }
        };
        for (var v = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], _ = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, C = 0; C < v.length; C++) f.prototype[v[C]] = _;
        c.exports = f;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(n, c, h) {
        (function(f) {
          "use strict";
          var a, o, d = f.MutationObserver || f.WebKitMutationObserver;
          if (d) {
            var U = 0, b = new d(m), v = f.document.createTextNode("");
            b.observe(v, { characterData: !0 }), a = function() {
              v.data = U = ++U % 2;
            };
          } else if (f.setImmediate || f.MessageChannel === void 0) a = "document" in f && "onreadystatechange" in f.document.createElement("script") ? function() {
            var w = f.document.createElement("script");
            w.onreadystatechange = function() {
              m(), w.onreadystatechange = null, w.parentNode.removeChild(w), w = null;
            }, f.document.documentElement.appendChild(w);
          } : function() {
            setTimeout(m, 0);
          };
          else {
            var _ = new f.MessageChannel();
            _.port1.onmessage = m, a = function() {
              _.port2.postMessage(0);
            };
          }
          var C = [];
          function m() {
            var w, I;
            o = !0;
            for (var T = C.length; T; ) {
              for (I = C, C = [], w = -1; ++w < T; ) I[w]();
              T = C.length;
            }
            o = !1;
          }
          c.exports = function(w) {
            C.push(w) !== 1 || o || a();
          };
        }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(n, c, h) {
        "use strict";
        var f = n("immediate");
        function a() {
        }
        var o = {}, d = ["REJECTED"], U = ["FULFILLED"], b = ["PENDING"];
        function v(T) {
          if (typeof T != "function") throw new TypeError("resolver must be a function");
          this.state = b, this.queue = [], this.outcome = void 0, T !== a && w(this, T);
        }
        function _(T, x, N) {
          this.promise = T, typeof x == "function" && (this.onFulfilled = x, this.callFulfilled = this.otherCallFulfilled), typeof N == "function" && (this.onRejected = N, this.callRejected = this.otherCallRejected);
        }
        function C(T, x, N) {
          f(function() {
            var O;
            try {
              O = x(N);
            } catch (F) {
              return o.reject(T, F);
            }
            O === T ? o.reject(T, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : o.resolve(T, O);
          });
        }
        function m(T) {
          var x = T && T.then;
          if (T && (typeof T == "object" || typeof T == "function") && typeof x == "function") return function() {
            x.apply(T, arguments);
          };
        }
        function w(T, x) {
          var N = !1;
          function O(R) {
            N || (N = !0, o.reject(T, R));
          }
          function F(R) {
            N || (N = !0, o.resolve(T, R));
          }
          var g = I(function() {
            x(F, O);
          });
          g.status === "error" && O(g.value);
        }
        function I(T, x) {
          var N = {};
          try {
            N.value = T(x), N.status = "success";
          } catch (O) {
            N.status = "error", N.value = O;
          }
          return N;
        }
        (c.exports = v).prototype.finally = function(T) {
          if (typeof T != "function") return this;
          var x = this.constructor;
          return this.then(function(N) {
            return x.resolve(T()).then(function() {
              return N;
            });
          }, function(N) {
            return x.resolve(T()).then(function() {
              throw N;
            });
          });
        }, v.prototype.catch = function(T) {
          return this.then(null, T);
        }, v.prototype.then = function(T, x) {
          if (typeof T != "function" && this.state === U || typeof x != "function" && this.state === d) return this;
          var N = new this.constructor(a);
          return this.state !== b ? C(N, this.state === U ? T : x, this.outcome) : this.queue.push(new _(N, T, x)), N;
        }, _.prototype.callFulfilled = function(T) {
          o.resolve(this.promise, T);
        }, _.prototype.otherCallFulfilled = function(T) {
          C(this.promise, this.onFulfilled, T);
        }, _.prototype.callRejected = function(T) {
          o.reject(this.promise, T);
        }, _.prototype.otherCallRejected = function(T) {
          C(this.promise, this.onRejected, T);
        }, o.resolve = function(T, x) {
          var N = I(m, x);
          if (N.status === "error") return o.reject(T, N.value);
          var O = N.value;
          if (O) w(T, O);
          else {
            T.state = U, T.outcome = x;
            for (var F = -1, g = T.queue.length; ++F < g; ) T.queue[F].callFulfilled(x);
          }
          return T;
        }, o.reject = function(T, x) {
          T.state = d, T.outcome = x;
          for (var N = -1, O = T.queue.length; ++N < O; ) T.queue[N].callRejected(x);
          return T;
        }, v.resolve = function(T) {
          return T instanceof this ? T : o.resolve(new this(a), T);
        }, v.reject = function(T) {
          var x = new this(a);
          return o.reject(x, T);
        }, v.all = function(T) {
          var x = this;
          if (Object.prototype.toString.call(T) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var N = T.length, O = !1;
          if (!N) return this.resolve([]);
          for (var F = new Array(N), g = 0, R = -1, V = new this(a); ++R < N; ) E(T[R], R);
          return V;
          function E(q, lA) {
            x.resolve(q).then(function(k) {
              F[lA] = k, ++g !== N || O || (O = !0, o.resolve(V, F));
            }, function(k) {
              O || (O = !0, o.reject(V, k));
            });
          }
        }, v.race = function(T) {
          var x = this;
          if (Object.prototype.toString.call(T) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var N = T.length, O = !1;
          if (!N) return this.resolve([]);
          for (var F = -1, g = new this(a); ++F < N; ) R = T[F], x.resolve(R).then(function(V) {
            O || (O = !0, o.resolve(g, V));
          }, function(V) {
            O || (O = !0, o.reject(g, V));
          });
          var R;
          return g;
        };
      }, { immediate: 36 }],
      38: [function(n, c, h) {
        "use strict";
        var f = {};
        (0, n("./lib/utils/common").assign)(f, n("./lib/deflate"), n("./lib/inflate"), n("./lib/zlib/constants")), c.exports = f;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(n, c, h) {
        "use strict";
        var f = n("./zlib/deflate"), a = n("./utils/common"), o = n("./utils/strings"), d = n("./zlib/messages"), U = n("./zlib/zstream"), b = Object.prototype.toString, v = 0, _ = -1, C = 0, m = 8;
        function w(T) {
          if (!(this instanceof w)) return new w(T);
          this.options = a.assign({
            level: _,
            method: m,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: C,
            to: ""
          }, T || {});
          var x = this.options;
          x.raw && 0 < x.windowBits ? x.windowBits = -x.windowBits : x.gzip && 0 < x.windowBits && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new U(), this.strm.avail_out = 0;
          var N = f.deflateInit2(this.strm, x.level, x.method, x.windowBits, x.memLevel, x.strategy);
          if (N !== v) throw new Error(d[N]);
          if (x.header && f.deflateSetHeader(this.strm, x.header), x.dictionary) {
            var O;
            if (O = typeof x.dictionary == "string" ? o.string2buf(x.dictionary) : b.call(x.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(x.dictionary) : x.dictionary, (N = f.deflateSetDictionary(this.strm, O)) !== v) throw new Error(d[N]);
            this._dict_set = !0;
          }
        }
        function I(T, x) {
          var N = new w(x);
          if (N.push(T, !0), N.err) throw N.msg || d[N.err];
          return N.result;
        }
        w.prototype.push = function(T, x) {
          var N, O, F = this.strm, g = this.options.chunkSize;
          if (this.ended) return !1;
          O = x === ~~x ? x : x === !0 ? 4 : 0, typeof T == "string" ? F.input = o.string2buf(T) : b.call(T) === "[object ArrayBuffer]" ? F.input = new Uint8Array(T) : F.input = T, F.next_in = 0, F.avail_in = F.input.length;
          do {
            if (F.avail_out === 0 && (F.output = new a.Buf8(g), F.next_out = 0, F.avail_out = g), (N = f.deflate(F, O)) !== 1 && N !== v) return this.onEnd(N), !(this.ended = !0);
            F.avail_out !== 0 && (F.avail_in !== 0 || O !== 4 && O !== 2) || (this.options.to === "string" ? this.onData(o.buf2binstring(a.shrinkBuf(F.output, F.next_out))) : this.onData(a.shrinkBuf(F.output, F.next_out)));
          } while ((0 < F.avail_in || F.avail_out === 0) && N !== 1);
          return O === 4 ? (N = f.deflateEnd(this.strm), this.onEnd(N), this.ended = !0, N === v) : O !== 2 || (this.onEnd(v), !(F.avail_out = 0));
        }, w.prototype.onData = function(T) {
          this.chunks.push(T);
        }, w.prototype.onEnd = function(T) {
          T === v && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
        }, h.Deflate = w, h.deflate = I, h.deflateRaw = function(T, x) {
          return (x = x || {}).raw = !0, I(T, x);
        }, h.gzip = function(T, x) {
          return (x = x || {}).gzip = !0, I(T, x);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(n, c, h) {
        "use strict";
        var f = n("./zlib/inflate"), a = n("./utils/common"), o = n("./utils/strings"), d = n("./zlib/constants"), U = n("./zlib/messages"), b = n("./zlib/zstream"), v = n("./zlib/gzheader"), _ = Object.prototype.toString;
        function C(w) {
          if (!(this instanceof C)) return new C(w);
          this.options = a.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, w || {});
          var I = this.options;
          I.raw && 0 <= I.windowBits && I.windowBits < 16 && (I.windowBits = -I.windowBits, I.windowBits === 0 && (I.windowBits = -15)), !(0 <= I.windowBits && I.windowBits < 16) || w && w.windowBits || (I.windowBits += 32), 15 < I.windowBits && I.windowBits < 48 && (15 & I.windowBits) == 0 && (I.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new b(), this.strm.avail_out = 0;
          var T = f.inflateInit2(this.strm, I.windowBits);
          if (T !== d.Z_OK) throw new Error(U[T]);
          this.header = new v(), f.inflateGetHeader(this.strm, this.header);
        }
        function m(w, I) {
          var T = new C(I);
          if (T.push(w, !0), T.err) throw T.msg || U[T.err];
          return T.result;
        }
        C.prototype.push = function(w, I) {
          var T, x, N, O, F, g, R = this.strm, V = this.options.chunkSize, E = this.options.dictionary, q = !1;
          if (this.ended) return !1;
          x = I === ~~I ? I : I === !0 ? d.Z_FINISH : d.Z_NO_FLUSH, typeof w == "string" ? R.input = o.binstring2buf(w) : _.call(w) === "[object ArrayBuffer]" ? R.input = new Uint8Array(w) : R.input = w, R.next_in = 0, R.avail_in = R.input.length;
          do {
            if (R.avail_out === 0 && (R.output = new a.Buf8(V), R.next_out = 0, R.avail_out = V), (T = f.inflate(R, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && E && (g = typeof E == "string" ? o.string2buf(E) : _.call(E) === "[object ArrayBuffer]" ? new Uint8Array(E) : E, T = f.inflateSetDictionary(this.strm, g)), T === d.Z_BUF_ERROR && q === !0 && (T = d.Z_OK, q = !1), T !== d.Z_STREAM_END && T !== d.Z_OK) return this.onEnd(T), !(this.ended = !0);
            R.next_out && (R.avail_out !== 0 && T !== d.Z_STREAM_END && (R.avail_in !== 0 || x !== d.Z_FINISH && x !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (N = o.utf8border(R.output, R.next_out), O = R.next_out - N, F = o.buf2string(R.output, N), R.next_out = O, R.avail_out = V - O, O && a.arraySet(R.output, R.output, N, O, 0), this.onData(F)) : this.onData(a.shrinkBuf(R.output, R.next_out)))), R.avail_in === 0 && R.avail_out === 0 && (q = !0);
          } while ((0 < R.avail_in || R.avail_out === 0) && T !== d.Z_STREAM_END);
          return T === d.Z_STREAM_END && (x = d.Z_FINISH), x === d.Z_FINISH ? (T = f.inflateEnd(this.strm), this.onEnd(T), this.ended = !0, T === d.Z_OK) : x !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(R.avail_out = 0));
        }, C.prototype.onData = function(w) {
          this.chunks.push(w);
        }, C.prototype.onEnd = function(w) {
          w === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
        }, h.Inflate = C, h.inflate = m, h.inflateRaw = function(w, I) {
          return (I = I || {}).raw = !0, m(w, I);
        }, h.ungzip = m;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(n, c, h) {
        "use strict";
        var f = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        h.assign = function(d) {
          for (var U = Array.prototype.slice.call(arguments, 1); U.length; ) {
            var b = U.shift();
            if (b) {
              if (typeof b != "object") throw new TypeError(b + "must be non-object");
              for (var v in b) b.hasOwnProperty(v) && (d[v] = b[v]);
            }
          }
          return d;
        }, h.shrinkBuf = function(d, U) {
          return d.length === U ? d : d.subarray ? d.subarray(0, U) : (d.length = U, d);
        };
        var a = {
          arraySet: function(d, U, b, v, _) {
            if (U.subarray && d.subarray) d.set(U.subarray(b, b + v), _);
            else for (var C = 0; C < v; C++) d[_ + C] = U[b + C];
          },
          flattenChunks: function(d) {
            var U, b, v, _, C, m;
            for (U = v = 0, b = d.length; U < b; U++) v += d[U].length;
            for (m = new Uint8Array(v), U = _ = 0, b = d.length; U < b; U++) C = d[U], m.set(C, _), _ += C.length;
            return m;
          }
        }, o = {
          arraySet: function(d, U, b, v, _) {
            for (var C = 0; C < v; C++) d[_ + C] = U[b + C];
          },
          flattenChunks: function(d) {
            return [].concat.apply([], d);
          }
        };
        h.setTyped = function(d) {
          d ? (h.Buf8 = Uint8Array, h.Buf16 = Uint16Array, h.Buf32 = Int32Array, h.assign(h, a)) : (h.Buf8 = Array, h.Buf16 = Array, h.Buf32 = Array, h.assign(h, o));
        }, h.setTyped(f);
      }, {}],
      42: [function(n, c, h) {
        "use strict";
        var f = n("./common"), a = !0, o = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          a = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          o = !1;
        }
        for (var d = new f.Buf8(256), U = 0; U < 256; U++) d[U] = 252 <= U ? 6 : 248 <= U ? 5 : 240 <= U ? 4 : 224 <= U ? 3 : 192 <= U ? 2 : 1;
        function b(v, _) {
          if (_ < 65537 && (v.subarray && o || !v.subarray && a)) return String.fromCharCode.apply(null, f.shrinkBuf(v, _));
          for (var C = "", m = 0; m < _; m++) C += String.fromCharCode(v[m]);
          return C;
        }
        d[254] = d[254] = 1, h.string2buf = function(v) {
          var _, C, m, w, I, T = v.length, x = 0;
          for (w = 0; w < T; w++) (64512 & (C = v.charCodeAt(w))) == 55296 && w + 1 < T && (64512 & (m = v.charCodeAt(w + 1))) == 56320 && (C = 65536 + (C - 55296 << 10) + (m - 56320), w++), x += C < 128 ? 1 : C < 2048 ? 2 : C < 65536 ? 3 : 4;
          for (_ = new f.Buf8(x), w = I = 0; I < x; w++) (64512 & (C = v.charCodeAt(w))) == 55296 && w + 1 < T && (64512 & (m = v.charCodeAt(w + 1))) == 56320 && (C = 65536 + (C - 55296 << 10) + (m - 56320), w++), C < 128 ? _[I++] = C : (C < 2048 ? _[I++] = 192 | C >>> 6 : (C < 65536 ? _[I++] = 224 | C >>> 12 : (_[I++] = 240 | C >>> 18, _[I++] = 128 | C >>> 12 & 63), _[I++] = 128 | C >>> 6 & 63), _[I++] = 128 | 63 & C);
          return _;
        }, h.buf2binstring = function(v) {
          return b(v, v.length);
        }, h.binstring2buf = function(v) {
          for (var _ = new f.Buf8(v.length), C = 0, m = _.length; C < m; C++) _[C] = v.charCodeAt(C);
          return _;
        }, h.buf2string = function(v, _) {
          var C, m, w, I, T = _ || v.length, x = new Array(2 * T);
          for (C = m = 0; C < T; ) if ((w = v[C++]) < 128) x[m++] = w;
          else if (4 < (I = d[w])) x[m++] = 65533, C += I - 1;
          else {
            for (w &= I === 2 ? 31 : I === 3 ? 15 : 7; 1 < I && C < T; ) w = w << 6 | 63 & v[C++], I--;
            1 < I ? x[m++] = 65533 : w < 65536 ? x[m++] = w : (w -= 65536, x[m++] = 55296 | w >> 10 & 1023, x[m++] = 56320 | 1023 & w);
          }
          return b(x, m);
        }, h.utf8border = function(v, _) {
          var C;
          for ((_ = _ || v.length) > v.length && (_ = v.length), C = _ - 1; 0 <= C && (192 & v[C]) == 128; ) C--;
          return C < 0 || C === 0 ? _ : C + d[v[C]] > _ ? C : _;
        };
      }, { "./common": 41 }],
      43: [function(n, c, h) {
        "use strict";
        c.exports = function(f, a, o, d) {
          for (var U = 65535 & f | 0, b = f >>> 16 & 65535 | 0, v = 0; o !== 0; ) {
            for (o -= v = 2e3 < o ? 2e3 : o; b = b + (U = U + a[d++] | 0) | 0, --v; ) ;
            U %= 65521, b %= 65521;
          }
          return U | b << 16 | 0;
        };
      }, {}],
      44: [function(n, c, h) {
        "use strict";
        c.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8
        };
      }, {}],
      45: [function(n, c, h) {
        "use strict";
        var f = (function() {
          for (var a, o = [], d = 0; d < 256; d++) {
            a = d;
            for (var U = 0; U < 8; U++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            o[d] = a;
          }
          return o;
        })();
        c.exports = function(a, o, d, U) {
          var b = f, v = U + d;
          a ^= -1;
          for (var _ = U; _ < v; _++) a = a >>> 8 ^ b[255 & (a ^ o[_])];
          return -1 ^ a;
        };
      }, {}],
      46: [function(n, c, h) {
        "use strict";
        var f, a = n("../utils/common"), o = n("./trees"), d = n("./adler32"), U = n("./crc32"), b = n("./messages"), v = 0, _ = 4, C = 0, m = -2, w = -1, I = 4, T = 2, x = 8, N = 9, O = 286, F = 30, g = 19, R = 2 * O + 1, V = 15, E = 3, q = 258, lA = q + E + 1, k = 42, Z = 113, L = 1, $ = 2, uA = 3, rA = 4;
        function vA(B, eA) {
          return B.msg = b[eA], eA;
        }
        function sA(B) {
          return (B << 1) - (4 < B ? 9 : 0);
        }
        function dA(B) {
          for (var eA = B.length; 0 <= --eA; ) B[eA] = 0;
        }
        function tA(B) {
          var eA = B.state, D = eA.pending;
          D > B.avail_out && (D = B.avail_out), D !== 0 && (a.arraySet(B.output, eA.pending_buf, eA.pending_out, D, B.next_out), B.next_out += D, eA.pending_out += D, B.total_out += D, B.avail_out -= D, eA.pending -= D, eA.pending === 0 && (eA.pending_out = 0));
        }
        function P(B, eA) {
          o._tr_flush_block(B, 0 <= B.block_start ? B.block_start : -1, B.strstart - B.block_start, eA), B.block_start = B.strstart, tA(B.strm);
        }
        function iA(B, eA) {
          B.pending_buf[B.pending++] = eA;
        }
        function aA(B, eA) {
          B.pending_buf[B.pending++] = eA >>> 8 & 255, B.pending_buf[B.pending++] = 255 & eA;
        }
        function fA(B, eA) {
          var D, l, u = B.max_chain_length, Q = B.strstart, j = B.prev_length, AA = B.nice_match, Y = B.strstart > B.w_size - lA ? B.strstart - (B.w_size - lA) : 0, gA = B.window, yA = B.w_mask, BA = B.prev, QA = B.strstart + q, xA = gA[Q + j - 1], RA = gA[Q + j];
          B.prev_length >= B.good_match && (u >>= 2), AA > B.lookahead && (AA = B.lookahead);
          do
            if (gA[(D = eA) + j] === RA && gA[D + j - 1] === xA && gA[D] === gA[Q] && gA[++D] === gA[Q + 1]) {
              Q += 2, D++;
              do
                ;
              while (gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && Q < QA);
              if (l = q - (QA - Q), Q = QA - q, j < l) {
                if (B.match_start = eA, AA <= (j = l)) break;
                xA = gA[Q + j - 1], RA = gA[Q + j];
              }
            }
          while ((eA = BA[eA & yA]) > Y && --u != 0);
          return j <= B.lookahead ? j : B.lookahead;
        }
        function _A(B) {
          var eA, D, l, u, Q, j, AA, Y, gA, yA, BA = B.w_size;
          do {
            if (u = B.window_size - B.lookahead - B.strstart, B.strstart >= BA + (BA - lA)) {
              for (a.arraySet(B.window, B.window, BA, BA, 0), B.match_start -= BA, B.strstart -= BA, B.block_start -= BA, eA = D = B.hash_size; l = B.head[--eA], B.head[eA] = BA <= l ? l - BA : 0, --D; ) ;
              for (eA = D = BA; l = B.prev[--eA], B.prev[eA] = BA <= l ? l - BA : 0, --D; ) ;
              u += BA;
            }
            if (B.strm.avail_in === 0) break;
            if (j = B.strm, AA = B.window, Y = B.strstart + B.lookahead, gA = u, yA = void 0, yA = j.avail_in, gA < yA && (yA = gA), D = yA === 0 ? 0 : (j.avail_in -= yA, a.arraySet(AA, j.input, j.next_in, yA, Y), j.state.wrap === 1 ? j.adler = d(j.adler, AA, yA, Y) : j.state.wrap === 2 && (j.adler = U(j.adler, AA, yA, Y)), j.next_in += yA, j.total_in += yA, yA), B.lookahead += D, B.lookahead + B.insert >= E) for (Q = B.strstart - B.insert, B.ins_h = B.window[Q], B.ins_h = (B.ins_h << B.hash_shift ^ B.window[Q + 1]) & B.hash_mask; B.insert && (B.ins_h = (B.ins_h << B.hash_shift ^ B.window[Q + E - 1]) & B.hash_mask, B.prev[Q & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = Q, Q++, B.insert--, !(B.lookahead + B.insert < E)); ) ;
          } while (B.lookahead < lA && B.strm.avail_in !== 0);
        }
        function H(B, eA) {
          for (var D, l; ; ) {
            if (B.lookahead < lA) {
              if (_A(B), B.lookahead < lA && eA === v) return L;
              if (B.lookahead === 0) break;
            }
            if (D = 0, B.lookahead >= E && (B.ins_h = (B.ins_h << B.hash_shift ^ B.window[B.strstart + E - 1]) & B.hash_mask, D = B.prev[B.strstart & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = B.strstart), D !== 0 && B.strstart - D <= B.w_size - lA && (B.match_length = fA(B, D)), B.match_length >= E) if (l = o._tr_tally(B, B.strstart - B.match_start, B.match_length - E), B.lookahead -= B.match_length, B.match_length <= B.max_lazy_match && B.lookahead >= E) {
              for (B.match_length--; B.strstart++, B.ins_h = (B.ins_h << B.hash_shift ^ B.window[B.strstart + E - 1]) & B.hash_mask, D = B.prev[B.strstart & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = B.strstart, --B.match_length != 0; ) ;
              B.strstart++;
            } else B.strstart += B.match_length, B.match_length = 0, B.ins_h = B.window[B.strstart], B.ins_h = (B.ins_h << B.hash_shift ^ B.window[B.strstart + 1]) & B.hash_mask;
            else l = o._tr_tally(B, 0, B.window[B.strstart]), B.lookahead--, B.strstart++;
            if (l && (P(B, !1), B.strm.avail_out === 0)) return L;
          }
          return B.insert = B.strstart < E - 1 ? B.strstart : E - 1, eA === _ ? (P(B, !0), B.strm.avail_out === 0 ? uA : rA) : B.last_lit && (P(B, !1), B.strm.avail_out === 0) ? L : $;
        }
        function y(B, eA) {
          for (var D, l, u; ; ) {
            if (B.lookahead < lA) {
              if (_A(B), B.lookahead < lA && eA === v) return L;
              if (B.lookahead === 0) break;
            }
            if (D = 0, B.lookahead >= E && (B.ins_h = (B.ins_h << B.hash_shift ^ B.window[B.strstart + E - 1]) & B.hash_mask, D = B.prev[B.strstart & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = B.strstart), B.prev_length = B.match_length, B.prev_match = B.match_start, B.match_length = E - 1, D !== 0 && B.prev_length < B.max_lazy_match && B.strstart - D <= B.w_size - lA && (B.match_length = fA(B, D), B.match_length <= 5 && (B.strategy === 1 || B.match_length === E && 4096 < B.strstart - B.match_start) && (B.match_length = E - 1)), B.prev_length >= E && B.match_length <= B.prev_length) {
              for (u = B.strstart + B.lookahead - E, l = o._tr_tally(B, B.strstart - 1 - B.prev_match, B.prev_length - E), B.lookahead -= B.prev_length - 1, B.prev_length -= 2; ++B.strstart <= u && (B.ins_h = (B.ins_h << B.hash_shift ^ B.window[B.strstart + E - 1]) & B.hash_mask, D = B.prev[B.strstart & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = B.strstart), --B.prev_length != 0; ) ;
              if (B.match_available = 0, B.match_length = E - 1, B.strstart++, l && (P(B, !1), B.strm.avail_out === 0)) return L;
            } else if (B.match_available) {
              if ((l = o._tr_tally(B, 0, B.window[B.strstart - 1])) && P(B, !1), B.strstart++, B.lookahead--, B.strm.avail_out === 0) return L;
            } else B.match_available = 1, B.strstart++, B.lookahead--;
          }
          return B.match_available && (l = o._tr_tally(B, 0, B.window[B.strstart - 1]), B.match_available = 0), B.insert = B.strstart < E - 1 ? B.strstart : E - 1, eA === _ ? (P(B, !0), B.strm.avail_out === 0 ? uA : rA) : B.last_lit && (P(B, !1), B.strm.avail_out === 0) ? L : $;
        }
        function J(B, eA, D, l, u) {
          this.good_length = B, this.max_lazy = eA, this.nice_length = D, this.max_chain = l, this.func = u;
        }
        function z() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new a.Buf16(2 * R), this.dyn_dtree = new a.Buf16(2 * (2 * F + 1)), this.bl_tree = new a.Buf16(2 * (2 * g + 1)), dA(this.dyn_ltree), dA(this.dyn_dtree), dA(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new a.Buf16(V + 1), this.heap = new a.Buf16(2 * O + 1), dA(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new a.Buf16(2 * O + 1), dA(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function pA(B) {
          var eA;
          return B && B.state ? (B.total_in = B.total_out = 0, B.data_type = T, (eA = B.state).pending = 0, eA.pending_out = 0, eA.wrap < 0 && (eA.wrap = -eA.wrap), eA.status = eA.wrap ? k : Z, B.adler = eA.wrap === 2 ? 0 : 1, eA.last_flush = v, o._tr_init(eA), C) : vA(B, m);
        }
        function M(B) {
          var eA = pA(B);
          return eA === C && (function(D) {
            D.window_size = 2 * D.w_size, dA(D.head), D.max_lazy_match = f[D.level].max_lazy, D.good_match = f[D.level].good_length, D.nice_match = f[D.level].nice_length, D.max_chain_length = f[D.level].max_chain, D.strstart = 0, D.block_start = 0, D.lookahead = 0, D.insert = 0, D.match_length = D.prev_length = E - 1, D.match_available = 0, D.ins_h = 0;
          })(B.state), eA;
        }
        function G(B, eA, D, l, u, Q) {
          if (!B) return m;
          var j = 1;
          if (eA === w && (eA = 6), l < 0 ? (j = 0, l = -l) : 15 < l && (j = 2, l -= 16), u < 1 || N < u || D !== x || l < 8 || 15 < l || eA < 0 || 9 < eA || Q < 0 || I < Q) return vA(B, m);
          l === 8 && (l = 9);
          var AA = new z();
          return (B.state = AA).strm = B, AA.wrap = j, AA.gzhead = null, AA.w_bits = l, AA.w_size = 1 << AA.w_bits, AA.w_mask = AA.w_size - 1, AA.hash_bits = u + 7, AA.hash_size = 1 << AA.hash_bits, AA.hash_mask = AA.hash_size - 1, AA.hash_shift = ~~((AA.hash_bits + E - 1) / E), AA.window = new a.Buf8(2 * AA.w_size), AA.head = new a.Buf16(AA.hash_size), AA.prev = new a.Buf16(AA.w_size), AA.lit_bufsize = 1 << u + 6, AA.pending_buf_size = 4 * AA.lit_bufsize, AA.pending_buf = new a.Buf8(AA.pending_buf_size), AA.d_buf = 1 * AA.lit_bufsize, AA.l_buf = 3 * AA.lit_bufsize, AA.level = eA, AA.strategy = Q, AA.method = D, M(B);
        }
        f = [
          new J(0, 0, 0, 0, function(B, eA) {
            var D = 65535;
            for (D > B.pending_buf_size - 5 && (D = B.pending_buf_size - 5); ; ) {
              if (B.lookahead <= 1) {
                if (_A(B), B.lookahead === 0 && eA === v) return L;
                if (B.lookahead === 0) break;
              }
              B.strstart += B.lookahead, B.lookahead = 0;
              var l = B.block_start + D;
              if ((B.strstart === 0 || B.strstart >= l) && (B.lookahead = B.strstart - l, B.strstart = l, P(B, !1), B.strm.avail_out === 0) || B.strstart - B.block_start >= B.w_size - lA && (P(B, !1), B.strm.avail_out === 0)) return L;
            }
            return B.insert = 0, eA === _ ? (P(B, !0), B.strm.avail_out === 0 ? uA : rA) : (B.strstart > B.block_start && (P(B, !1), B.strm.avail_out), L);
          }),
          new J(4, 4, 8, 4, H),
          new J(4, 5, 16, 8, H),
          new J(4, 6, 32, 32, H),
          new J(4, 4, 16, 16, y),
          new J(8, 16, 32, 32, y),
          new J(8, 16, 128, 128, y),
          new J(8, 32, 128, 256, y),
          new J(32, 128, 258, 1024, y),
          new J(32, 258, 258, 4096, y)
        ], h.deflateInit = function(B, eA) {
          return G(B, eA, x, 15, 8, 0);
        }, h.deflateInit2 = G, h.deflateReset = M, h.deflateResetKeep = pA, h.deflateSetHeader = function(B, eA) {
          return B && B.state ? B.state.wrap !== 2 ? m : (B.state.gzhead = eA, C) : m;
        }, h.deflate = function(B, eA) {
          var D, l, u, Q;
          if (!B || !B.state || 5 < eA || eA < 0) return B ? vA(B, m) : m;
          if (l = B.state, !B.output || !B.input && B.avail_in !== 0 || l.status === 666 && eA !== _) return vA(B, B.avail_out === 0 ? -5 : m);
          if (l.strm = B, D = l.last_flush, l.last_flush = eA, l.status === k) if (l.wrap === 2) B.adler = 0, iA(l, 31), iA(l, 139), iA(l, 8), l.gzhead ? (iA(l, (l.gzhead.text ? 1 : 0) + (l.gzhead.hcrc ? 2 : 0) + (l.gzhead.extra ? 4 : 0) + (l.gzhead.name ? 8 : 0) + (l.gzhead.comment ? 16 : 0)), iA(l, 255 & l.gzhead.time), iA(l, l.gzhead.time >> 8 & 255), iA(l, l.gzhead.time >> 16 & 255), iA(l, l.gzhead.time >> 24 & 255), iA(l, l.level === 9 ? 2 : 2 <= l.strategy || l.level < 2 ? 4 : 0), iA(l, 255 & l.gzhead.os), l.gzhead.extra && l.gzhead.extra.length && (iA(l, 255 & l.gzhead.extra.length), iA(l, l.gzhead.extra.length >> 8 & 255)), l.gzhead.hcrc && (B.adler = U(B.adler, l.pending_buf, l.pending, 0)), l.gzindex = 0, l.status = 69) : (iA(l, 0), iA(l, 0), iA(l, 0), iA(l, 0), iA(l, 0), iA(l, l.level === 9 ? 2 : 2 <= l.strategy || l.level < 2 ? 4 : 0), iA(l, 3), l.status = Z);
          else {
            var j = x + (l.w_bits - 8 << 4) << 8;
            j |= (2 <= l.strategy || l.level < 2 ? 0 : l.level < 6 ? 1 : l.level === 6 ? 2 : 3) << 6, l.strstart !== 0 && (j |= 32), j += 31 - j % 31, l.status = Z, aA(l, j), l.strstart !== 0 && (aA(l, B.adler >>> 16), aA(l, 65535 & B.adler)), B.adler = 1;
          }
          if (l.status === 69) if (l.gzhead.extra) {
            for (u = l.pending; l.gzindex < (65535 & l.gzhead.extra.length) && (l.pending !== l.pending_buf_size || (l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), tA(B), u = l.pending, l.pending !== l.pending_buf_size)); ) iA(l, 255 & l.gzhead.extra[l.gzindex]), l.gzindex++;
            l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), l.gzindex === l.gzhead.extra.length && (l.gzindex = 0, l.status = 73);
          } else l.status = 73;
          if (l.status === 73) if (l.gzhead.name) {
            u = l.pending;
            do {
              if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), tA(B), u = l.pending, l.pending === l.pending_buf_size)) {
                Q = 1;
                break;
              }
              Q = l.gzindex < l.gzhead.name.length ? 255 & l.gzhead.name.charCodeAt(l.gzindex++) : 0, iA(l, Q);
            } while (Q !== 0);
            l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), Q === 0 && (l.gzindex = 0, l.status = 91);
          } else l.status = 91;
          if (l.status === 91) if (l.gzhead.comment) {
            u = l.pending;
            do {
              if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), tA(B), u = l.pending, l.pending === l.pending_buf_size)) {
                Q = 1;
                break;
              }
              Q = l.gzindex < l.gzhead.comment.length ? 255 & l.gzhead.comment.charCodeAt(l.gzindex++) : 0, iA(l, Q);
            } while (Q !== 0);
            l.gzhead.hcrc && l.pending > u && (B.adler = U(B.adler, l.pending_buf, l.pending - u, u)), Q === 0 && (l.status = 103);
          } else l.status = 103;
          if (l.status === 103 && (l.gzhead.hcrc ? (l.pending + 2 > l.pending_buf_size && tA(B), l.pending + 2 <= l.pending_buf_size && (iA(l, 255 & B.adler), iA(l, B.adler >> 8 & 255), B.adler = 0, l.status = Z)) : l.status = Z), l.pending !== 0) {
            if (tA(B), B.avail_out === 0) return l.last_flush = -1, C;
          } else if (B.avail_in === 0 && sA(eA) <= sA(D) && eA !== _) return vA(B, -5);
          if (l.status === 666 && B.avail_in !== 0) return vA(B, -5);
          if (B.avail_in !== 0 || l.lookahead !== 0 || eA !== v && l.status !== 666) {
            var AA = l.strategy === 2 ? (function(Y, gA) {
              for (var yA; ; ) {
                if (Y.lookahead === 0 && (_A(Y), Y.lookahead === 0)) {
                  if (gA === v) return L;
                  break;
                }
                if (Y.match_length = 0, yA = o._tr_tally(Y, 0, Y.window[Y.strstart]), Y.lookahead--, Y.strstart++, yA && (P(Y, !1), Y.strm.avail_out === 0)) return L;
              }
              return Y.insert = 0, gA === _ ? (P(Y, !0), Y.strm.avail_out === 0 ? uA : rA) : Y.last_lit && (P(Y, !1), Y.strm.avail_out === 0) ? L : $;
            })(l, eA) : l.strategy === 3 ? (function(Y, gA) {
              for (var yA, BA, QA, xA, RA = Y.window; ; ) {
                if (Y.lookahead <= q) {
                  if (_A(Y), Y.lookahead <= q && gA === v) return L;
                  if (Y.lookahead === 0) break;
                }
                if (Y.match_length = 0, Y.lookahead >= E && 0 < Y.strstart && (BA = RA[QA = Y.strstart - 1]) === RA[++QA] && BA === RA[++QA] && BA === RA[++QA]) {
                  xA = Y.strstart + q;
                  do
                    ;
                  while (BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && QA < xA);
                  Y.match_length = q - (xA - QA), Y.match_length > Y.lookahead && (Y.match_length = Y.lookahead);
                }
                if (Y.match_length >= E ? (yA = o._tr_tally(Y, 1, Y.match_length - E), Y.lookahead -= Y.match_length, Y.strstart += Y.match_length, Y.match_length = 0) : (yA = o._tr_tally(Y, 0, Y.window[Y.strstart]), Y.lookahead--, Y.strstart++), yA && (P(Y, !1), Y.strm.avail_out === 0)) return L;
              }
              return Y.insert = 0, gA === _ ? (P(Y, !0), Y.strm.avail_out === 0 ? uA : rA) : Y.last_lit && (P(Y, !1), Y.strm.avail_out === 0) ? L : $;
            })(l, eA) : f[l.level].func(l, eA);
            if (AA !== uA && AA !== rA || (l.status = 666), AA === L || AA === uA) return B.avail_out === 0 && (l.last_flush = -1), C;
            if (AA === $ && (eA === 1 ? o._tr_align(l) : eA !== 5 && (o._tr_stored_block(l, 0, 0, !1), eA === 3 && (dA(l.head), l.lookahead === 0 && (l.strstart = 0, l.block_start = 0, l.insert = 0))), tA(B), B.avail_out === 0)) return l.last_flush = -1, C;
          }
          return eA !== _ ? C : l.wrap <= 0 ? 1 : (l.wrap === 2 ? (iA(l, 255 & B.adler), iA(l, B.adler >> 8 & 255), iA(l, B.adler >> 16 & 255), iA(l, B.adler >> 24 & 255), iA(l, 255 & B.total_in), iA(l, B.total_in >> 8 & 255), iA(l, B.total_in >> 16 & 255), iA(l, B.total_in >> 24 & 255)) : (aA(l, B.adler >>> 16), aA(l, 65535 & B.adler)), tA(B), 0 < l.wrap && (l.wrap = -l.wrap), l.pending !== 0 ? C : 1);
        }, h.deflateEnd = function(B) {
          var eA;
          return B && B.state ? (eA = B.state.status) !== k && eA !== 69 && eA !== 73 && eA !== 91 && eA !== 103 && eA !== Z && eA !== 666 ? vA(B, m) : (B.state = null, eA === Z ? vA(B, -3) : C) : m;
        }, h.deflateSetDictionary = function(B, eA) {
          var D, l, u, Q, j, AA, Y, gA, yA = eA.length;
          if (!B || !B.state || (Q = (D = B.state).wrap) === 2 || Q === 1 && D.status !== k || D.lookahead) return m;
          for (Q === 1 && (B.adler = d(B.adler, eA, yA, 0)), D.wrap = 0, yA >= D.w_size && (Q === 0 && (dA(D.head), D.strstart = 0, D.block_start = 0, D.insert = 0), gA = new a.Buf8(D.w_size), a.arraySet(gA, eA, yA - D.w_size, D.w_size, 0), eA = gA, yA = D.w_size), j = B.avail_in, AA = B.next_in, Y = B.input, B.avail_in = yA, B.next_in = 0, B.input = eA, _A(D); D.lookahead >= E; ) {
            for (l = D.strstart, u = D.lookahead - (E - 1); D.ins_h = (D.ins_h << D.hash_shift ^ D.window[l + E - 1]) & D.hash_mask, D.prev[l & D.w_mask] = D.head[D.ins_h], D.head[D.ins_h] = l, l++, --u; ) ;
            D.strstart = l, D.lookahead = E - 1, _A(D);
          }
          return D.strstart += D.lookahead, D.block_start = D.strstart, D.insert = D.lookahead, D.lookahead = 0, D.match_length = D.prev_length = E - 1, D.match_available = 0, B.next_in = AA, B.input = Y, B.avail_in = j, D.wrap = Q, C;
        }, h.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(n, c, h) {
        "use strict";
        c.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(n, c, h) {
        "use strict";
        c.exports = function(f, a) {
          var o = f.state, d = f.next_in, U, b, v, _, C, m, w, I, T, x, N, O, F, g, R, V, E, q, lA, k, Z, L = f.input, $;
          U = d + (f.avail_in - 5), b = f.next_out, $ = f.output, v = b - (a - f.avail_out), _ = b + (f.avail_out - 257), C = o.dmax, m = o.wsize, w = o.whave, I = o.wnext, T = o.window, x = o.hold, N = o.bits, O = o.lencode, F = o.distcode, g = (1 << o.lenbits) - 1, R = (1 << o.distbits) - 1;
          A: do {
            N < 15 && (x += L[d++] << N, N += 8, x += L[d++] << N, N += 8), V = O[x & g];
            e: for (; ; ) {
              if (x >>>= E = V >>> 24, N -= E, (E = V >>> 16 & 255) === 0) $[b++] = 65535 & V;
              else {
                if (!(16 & E)) {
                  if ((64 & E) == 0) {
                    V = O[(65535 & V) + (x & (1 << E) - 1)];
                    continue e;
                  }
                  if (32 & E) {
                    o.mode = 12;
                    break A;
                  }
                  f.msg = "invalid literal/length code", o.mode = 30;
                  break A;
                }
                q = 65535 & V, (E &= 15) && (N < E && (x += L[d++] << N, N += 8), q += x & (1 << E) - 1, x >>>= E, N -= E), N < 15 && (x += L[d++] << N, N += 8, x += L[d++] << N, N += 8), V = F[x & R];
                t: for (; ; ) {
                  if (x >>>= E = V >>> 24, N -= E, !(16 & (E = V >>> 16 & 255))) {
                    if ((64 & E) == 0) {
                      V = F[(65535 & V) + (x & (1 << E) - 1)];
                      continue t;
                    }
                    f.msg = "invalid distance code", o.mode = 30;
                    break A;
                  }
                  if (lA = 65535 & V, N < (E &= 15) && (x += L[d++] << N, (N += 8) < E && (x += L[d++] << N, N += 8)), C < (lA += x & (1 << E) - 1)) {
                    f.msg = "invalid distance too far back", o.mode = 30;
                    break A;
                  }
                  if (x >>>= E, N -= E, (E = b - v) < lA) {
                    if (w < (E = lA - E) && o.sane) {
                      f.msg = "invalid distance too far back", o.mode = 30;
                      break A;
                    }
                    if (Z = T, (k = 0) === I) {
                      if (k += m - E, E < q) {
                        for (q -= E; $[b++] = T[k++], --E; ) ;
                        k = b - lA, Z = $;
                      }
                    } else if (I < E) {
                      if (k += m + I - E, (E -= I) < q) {
                        for (q -= E; $[b++] = T[k++], --E; ) ;
                        if (k = 0, I < q) {
                          for (q -= E = I; $[b++] = T[k++], --E; ) ;
                          k = b - lA, Z = $;
                        }
                      }
                    } else if (k += I - E, E < q) {
                      for (q -= E; $[b++] = T[k++], --E; ) ;
                      k = b - lA, Z = $;
                    }
                    for (; 2 < q; ) $[b++] = Z[k++], $[b++] = Z[k++], $[b++] = Z[k++], q -= 3;
                    q && ($[b++] = Z[k++], 1 < q && ($[b++] = Z[k++]));
                  } else {
                    for (k = b - lA; $[b++] = $[k++], $[b++] = $[k++], $[b++] = $[k++], 2 < (q -= 3); ) ;
                    q && ($[b++] = $[k++], 1 < q && ($[b++] = $[k++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (d < U && b < _);
          d -= q = N >> 3, x &= (1 << (N -= q << 3)) - 1, f.next_in = d, f.next_out = b, f.avail_in = d < U ? U - d + 5 : 5 - (d - U), f.avail_out = b < _ ? _ - b + 257 : 257 - (b - _), o.hold = x, o.bits = N;
        };
      }, {}],
      49: [function(n, c, h) {
        "use strict";
        var f = n("../utils/common"), a = n("./adler32"), o = n("./crc32"), d = n("./inffast"), U = n("./inftrees"), b = 1, v = 2, _ = 0, C = -2, m = 1, w = 852, I = 592;
        function T(k) {
          return (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24);
        }
        function x() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new f.Buf16(320), this.work = new f.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function N(k) {
          var Z;
          return k && k.state ? (Z = k.state, k.total_in = k.total_out = Z.total = 0, k.msg = "", Z.wrap && (k.adler = 1 & Z.wrap), Z.mode = m, Z.last = 0, Z.havedict = 0, Z.dmax = 32768, Z.head = null, Z.hold = 0, Z.bits = 0, Z.lencode = Z.lendyn = new f.Buf32(w), Z.distcode = Z.distdyn = new f.Buf32(I), Z.sane = 1, Z.back = -1, _) : C;
        }
        function O(k) {
          var Z;
          return k && k.state ? ((Z = k.state).wsize = 0, Z.whave = 0, Z.wnext = 0, N(k)) : C;
        }
        function F(k, Z) {
          var L, $;
          return k && k.state ? ($ = k.state, Z < 0 ? (L = 0, Z = -Z) : (L = 1 + (Z >> 4), Z < 48 && (Z &= 15)), Z && (Z < 8 || 15 < Z) ? C : ($.window !== null && $.wbits !== Z && ($.window = null), $.wrap = L, $.wbits = Z, O(k))) : C;
        }
        function g(k, Z) {
          var L, $;
          return k ? ($ = new x(), (k.state = $).window = null, (L = F(k, Z)) !== _ && (k.state = null), L) : C;
        }
        var R, V, E = !0;
        function q(k) {
          if (E) {
            var Z;
            for (R = new f.Buf32(512), V = new f.Buf32(32), Z = 0; Z < 144; ) k.lens[Z++] = 8;
            for (; Z < 256; ) k.lens[Z++] = 9;
            for (; Z < 280; ) k.lens[Z++] = 7;
            for (; Z < 288; ) k.lens[Z++] = 8;
            for (U(b, k.lens, 0, 288, R, 0, k.work, { bits: 9 }), Z = 0; Z < 32; ) k.lens[Z++] = 5;
            U(v, k.lens, 0, 32, V, 0, k.work, { bits: 5 }), E = !1;
          }
          k.lencode = R, k.lenbits = 9, k.distcode = V, k.distbits = 5;
        }
        function lA(k, Z, L, $) {
          var uA, rA = k.state;
          return rA.window === null && (rA.wsize = 1 << rA.wbits, rA.wnext = 0, rA.whave = 0, rA.window = new f.Buf8(rA.wsize)), $ >= rA.wsize ? (f.arraySet(rA.window, Z, L - rA.wsize, rA.wsize, 0), rA.wnext = 0, rA.whave = rA.wsize) : ($ < (uA = rA.wsize - rA.wnext) && (uA = $), f.arraySet(rA.window, Z, L - $, uA, rA.wnext), ($ -= uA) ? (f.arraySet(rA.window, Z, L - $, $, 0), rA.wnext = $, rA.whave = rA.wsize) : (rA.wnext += uA, rA.wnext === rA.wsize && (rA.wnext = 0), rA.whave < rA.wsize && (rA.whave += uA))), 0;
        }
        h.inflateReset = O, h.inflateReset2 = F, h.inflateResetKeep = N, h.inflateInit = function(k) {
          return g(k, 15);
        }, h.inflateInit2 = g, h.inflate = function(k, Z) {
          var L, $, uA, rA, vA, sA, dA, tA, P, iA, aA, fA, _A, H, y, J, z, pA, M, G, B, eA, D, l, u = 0, Q = new f.Buf8(4), j = [
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15
          ];
          if (!k || !k.state || !k.output || !k.input && k.avail_in !== 0) return C;
          (L = k.state).mode === 12 && (L.mode = 13), vA = k.next_out, uA = k.output, dA = k.avail_out, rA = k.next_in, $ = k.input, sA = k.avail_in, tA = L.hold, P = L.bits, iA = sA, aA = dA, eA = _;
          A: for (; ; ) switch (L.mode) {
            case m:
              if (L.wrap === 0) {
                L.mode = 13;
                break;
              }
              for (; P < 16; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if (2 & L.wrap && tA === 35615) {
                Q[L.check = 0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0), P = tA = 0, L.mode = 2;
                break;
              }
              if (L.flags = 0, L.head && (L.head.done = !1), !(1 & L.wrap) || (((255 & tA) << 8) + (tA >> 8)) % 31) {
                k.msg = "incorrect header check", L.mode = 30;
                break;
              }
              if ((15 & tA) != 8) {
                k.msg = "unknown compression method", L.mode = 30;
                break;
              }
              if (P -= 4, B = 8 + (15 & (tA >>>= 4)), L.wbits === 0) L.wbits = B;
              else if (B > L.wbits) {
                k.msg = "invalid window size", L.mode = 30;
                break;
              }
              L.dmax = 1 << B, k.adler = L.check = 1, L.mode = 512 & tA ? 10 : 12, P = tA = 0;
              break;
            case 2:
              for (; P < 16; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if (L.flags = tA, (255 & L.flags) != 8) {
                k.msg = "unknown compression method", L.mode = 30;
                break;
              }
              if (57344 & L.flags) {
                k.msg = "unknown header flags set", L.mode = 30;
                break;
              }
              L.head && (L.head.text = tA >> 8 & 1), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), P = tA = 0, L.mode = 3;
            case 3:
              for (; P < 32; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              L.head && (L.head.time = tA), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, Q[2] = tA >>> 16 & 255, Q[3] = tA >>> 24 & 255, L.check = o(L.check, Q, 4, 0)), P = tA = 0, L.mode = 4;
            case 4:
              for (; P < 16; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              L.head && (L.head.xflags = 255 & tA, L.head.os = tA >> 8), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), P = tA = 0, L.mode = 5;
            case 5:
              if (1024 & L.flags) {
                for (; P < 16; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                L.length = tA, L.head && (L.head.extra_len = tA), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), P = tA = 0;
              } else L.head && (L.head.extra = null);
              L.mode = 6;
            case 6:
              if (1024 & L.flags && (sA < (fA = L.length) && (fA = sA), fA && (L.head && (B = L.head.extra_len - L.length, L.head.extra || (L.head.extra = new Array(L.head.extra_len)), f.arraySet(L.head.extra, $, rA, fA, B)), 512 & L.flags && (L.check = o(L.check, $, fA, rA)), sA -= fA, rA += fA, L.length -= fA), L.length)) break A;
              L.length = 0, L.mode = 7;
            case 7:
              if (2048 & L.flags) {
                if (sA === 0) break A;
                for (fA = 0; B = $[rA + fA++], L.head && B && L.length < 65536 && (L.head.name += String.fromCharCode(B)), B && fA < sA; ) ;
                if (512 & L.flags && (L.check = o(L.check, $, fA, rA)), sA -= fA, rA += fA, B) break A;
              } else L.head && (L.head.name = null);
              L.length = 0, L.mode = 8;
            case 8:
              if (4096 & L.flags) {
                if (sA === 0) break A;
                for (fA = 0; B = $[rA + fA++], L.head && B && L.length < 65536 && (L.head.comment += String.fromCharCode(B)), B && fA < sA; ) ;
                if (512 & L.flags && (L.check = o(L.check, $, fA, rA)), sA -= fA, rA += fA, B) break A;
              } else L.head && (L.head.comment = null);
              L.mode = 9;
            case 9:
              if (512 & L.flags) {
                for (; P < 16; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                if (tA !== (65535 & L.check)) {
                  k.msg = "header crc mismatch", L.mode = 30;
                  break;
                }
                P = tA = 0;
              }
              L.head && (L.head.hcrc = L.flags >> 9 & 1, L.head.done = !0), k.adler = L.check = 0, L.mode = 12;
              break;
            case 10:
              for (; P < 32; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              k.adler = L.check = T(tA), P = tA = 0, L.mode = 11;
            case 11:
              if (L.havedict === 0) return k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = sA, L.hold = tA, L.bits = P, 2;
              k.adler = L.check = 1, L.mode = 12;
            case 12:
              if (Z === 5 || Z === 6) break A;
            case 13:
              if (L.last) {
                tA >>>= 7 & P, P -= 7 & P, L.mode = 27;
                break;
              }
              for (; P < 3; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              switch (L.last = 1 & tA, P -= 1, 3 & (tA >>>= 1)) {
                case 0:
                  L.mode = 14;
                  break;
                case 1:
                  if (q(L), L.mode = 20, Z !== 6) break;
                  tA >>>= 2, P -= 2;
                  break A;
                case 2:
                  L.mode = 17;
                  break;
                case 3:
                  k.msg = "invalid block type", L.mode = 30;
              }
              tA >>>= 2, P -= 2;
              break;
            case 14:
              for (tA >>>= 7 & P, P -= 7 & P; P < 32; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if ((65535 & tA) != (tA >>> 16 ^ 65535)) {
                k.msg = "invalid stored block lengths", L.mode = 30;
                break;
              }
              if (L.length = 65535 & tA, P = tA = 0, L.mode = 15, Z === 6) break A;
            case 15:
              L.mode = 16;
            case 16:
              if (fA = L.length) {
                if (sA < fA && (fA = sA), dA < fA && (fA = dA), fA === 0) break A;
                f.arraySet(uA, $, rA, fA, vA), sA -= fA, rA += fA, dA -= fA, vA += fA, L.length -= fA;
                break;
              }
              L.mode = 12;
              break;
            case 17:
              for (; P < 14; ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if (L.nlen = 257 + (31 & tA), tA >>>= 5, P -= 5, L.ndist = 1 + (31 & tA), tA >>>= 5, P -= 5, L.ncode = 4 + (15 & tA), tA >>>= 4, P -= 4, 286 < L.nlen || 30 < L.ndist) {
                k.msg = "too many length or distance symbols", L.mode = 30;
                break;
              }
              L.have = 0, L.mode = 18;
            case 18:
              for (; L.have < L.ncode; ) {
                for (; P < 3; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                L.lens[j[L.have++]] = 7 & tA, tA >>>= 3, P -= 3;
              }
              for (; L.have < 19; ) L.lens[j[L.have++]] = 0;
              if (L.lencode = L.lendyn, L.lenbits = 7, D = { bits: L.lenbits }, eA = U(0, L.lens, 0, 19, L.lencode, 0, L.work, D), L.lenbits = D.bits, eA) {
                k.msg = "invalid code lengths set", L.mode = 30;
                break;
              }
              L.have = 0, L.mode = 19;
            case 19:
              for (; L.have < L.nlen + L.ndist; ) {
                for (; J = (u = L.lencode[tA & (1 << L.lenbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= P); ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                if (z < 16) tA >>>= y, P -= y, L.lens[L.have++] = z;
                else {
                  if (z === 16) {
                    for (l = y + 2; P < l; ) {
                      if (sA === 0) break A;
                      sA--, tA += $[rA++] << P, P += 8;
                    }
                    if (tA >>>= y, P -= y, L.have === 0) {
                      k.msg = "invalid bit length repeat", L.mode = 30;
                      break;
                    }
                    B = L.lens[L.have - 1], fA = 3 + (3 & tA), tA >>>= 2, P -= 2;
                  } else if (z === 17) {
                    for (l = y + 3; P < l; ) {
                      if (sA === 0) break A;
                      sA--, tA += $[rA++] << P, P += 8;
                    }
                    P -= y, B = 0, fA = 3 + (7 & (tA >>>= y)), tA >>>= 3, P -= 3;
                  } else {
                    for (l = y + 7; P < l; ) {
                      if (sA === 0) break A;
                      sA--, tA += $[rA++] << P, P += 8;
                    }
                    P -= y, B = 0, fA = 11 + (127 & (tA >>>= y)), tA >>>= 7, P -= 7;
                  }
                  if (L.have + fA > L.nlen + L.ndist) {
                    k.msg = "invalid bit length repeat", L.mode = 30;
                    break;
                  }
                  for (; fA--; ) L.lens[L.have++] = B;
                }
              }
              if (L.mode === 30) break;
              if (L.lens[256] === 0) {
                k.msg = "invalid code -- missing end-of-block", L.mode = 30;
                break;
              }
              if (L.lenbits = 9, D = { bits: L.lenbits }, eA = U(b, L.lens, 0, L.nlen, L.lencode, 0, L.work, D), L.lenbits = D.bits, eA) {
                k.msg = "invalid literal/lengths set", L.mode = 30;
                break;
              }
              if (L.distbits = 6, L.distcode = L.distdyn, D = { bits: L.distbits }, eA = U(v, L.lens, L.nlen, L.ndist, L.distcode, 0, L.work, D), L.distbits = D.bits, eA) {
                k.msg = "invalid distances set", L.mode = 30;
                break;
              }
              if (L.mode = 20, Z === 6) break A;
            case 20:
              L.mode = 21;
            case 21:
              if (6 <= sA && 258 <= dA) {
                k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = sA, L.hold = tA, L.bits = P, d(k, aA), vA = k.next_out, uA = k.output, dA = k.avail_out, rA = k.next_in, $ = k.input, sA = k.avail_in, tA = L.hold, P = L.bits, L.mode === 12 && (L.back = -1);
                break;
              }
              for (L.back = 0; J = (u = L.lencode[tA & (1 << L.lenbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= P); ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if (J && (240 & J) == 0) {
                for (pA = y, M = J, G = z; J = (u = L.lencode[G + ((tA & (1 << pA + M) - 1) >> pA)]) >>> 16 & 255, z = 65535 & u, !(pA + (y = u >>> 24) <= P); ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                tA >>>= pA, P -= pA, L.back += pA;
              }
              if (tA >>>= y, P -= y, L.back += y, L.length = z, J === 0) {
                L.mode = 26;
                break;
              }
              if (32 & J) {
                L.back = -1, L.mode = 12;
                break;
              }
              if (64 & J) {
                k.msg = "invalid literal/length code", L.mode = 30;
                break;
              }
              L.extra = 15 & J, L.mode = 22;
            case 22:
              if (L.extra) {
                for (l = L.extra; P < l; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                L.length += tA & (1 << L.extra) - 1, tA >>>= L.extra, P -= L.extra, L.back += L.extra;
              }
              L.was = L.length, L.mode = 23;
            case 23:
              for (; J = (u = L.distcode[tA & (1 << L.distbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= P); ) {
                if (sA === 0) break A;
                sA--, tA += $[rA++] << P, P += 8;
              }
              if ((240 & J) == 0) {
                for (pA = y, M = J, G = z; J = (u = L.distcode[G + ((tA & (1 << pA + M) - 1) >> pA)]) >>> 16 & 255, z = 65535 & u, !(pA + (y = u >>> 24) <= P); ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                tA >>>= pA, P -= pA, L.back += pA;
              }
              if (tA >>>= y, P -= y, L.back += y, 64 & J) {
                k.msg = "invalid distance code", L.mode = 30;
                break;
              }
              L.offset = z, L.extra = 15 & J, L.mode = 24;
            case 24:
              if (L.extra) {
                for (l = L.extra; P < l; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                L.offset += tA & (1 << L.extra) - 1, tA >>>= L.extra, P -= L.extra, L.back += L.extra;
              }
              if (L.offset > L.dmax) {
                k.msg = "invalid distance too far back", L.mode = 30;
                break;
              }
              L.mode = 25;
            case 25:
              if (dA === 0) break A;
              if (fA = aA - dA, L.offset > fA) {
                if ((fA = L.offset - fA) > L.whave && L.sane) {
                  k.msg = "invalid distance too far back", L.mode = 30;
                  break;
                }
                _A = fA > L.wnext ? (fA -= L.wnext, L.wsize - fA) : L.wnext - fA, fA > L.length && (fA = L.length), H = L.window;
              } else H = uA, _A = vA - L.offset, fA = L.length;
              for (dA < fA && (fA = dA), dA -= fA, L.length -= fA; uA[vA++] = H[_A++], --fA; ) ;
              L.length === 0 && (L.mode = 21);
              break;
            case 26:
              if (dA === 0) break A;
              uA[vA++] = L.length, dA--, L.mode = 21;
              break;
            case 27:
              if (L.wrap) {
                for (; P < 32; ) {
                  if (sA === 0) break A;
                  sA--, tA |= $[rA++] << P, P += 8;
                }
                if (aA -= dA, k.total_out += aA, L.total += aA, aA && (k.adler = L.check = L.flags ? o(L.check, uA, aA, vA - aA) : a(L.check, uA, aA, vA - aA)), aA = dA, (L.flags ? tA : T(tA)) !== L.check) {
                  k.msg = "incorrect data check", L.mode = 30;
                  break;
                }
                P = tA = 0;
              }
              L.mode = 28;
            case 28:
              if (L.wrap && L.flags) {
                for (; P < 32; ) {
                  if (sA === 0) break A;
                  sA--, tA += $[rA++] << P, P += 8;
                }
                if (tA !== (4294967295 & L.total)) {
                  k.msg = "incorrect length check", L.mode = 30;
                  break;
                }
                P = tA = 0;
              }
              L.mode = 29;
            case 29:
              eA = 1;
              break A;
            case 30:
              eA = -3;
              break A;
            case 31:
              return -4;
            default:
              return C;
          }
          return k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = sA, L.hold = tA, L.bits = P, (L.wsize || aA !== k.avail_out && L.mode < 30 && (L.mode < 27 || Z !== 4)) && lA(k, k.output, k.next_out, aA - k.avail_out) ? (L.mode = 31, -4) : (iA -= k.avail_in, aA -= k.avail_out, k.total_in += iA, k.total_out += aA, L.total += aA, L.wrap && aA && (k.adler = L.check = L.flags ? o(L.check, uA, aA, k.next_out - aA) : a(L.check, uA, aA, k.next_out - aA)), k.data_type = L.bits + (L.last ? 64 : 0) + (L.mode === 12 ? 128 : 0) + (L.mode === 20 || L.mode === 15 ? 256 : 0), (iA == 0 && aA === 0 || Z === 4) && eA === _ && (eA = -5), eA);
        }, h.inflateEnd = function(k) {
          if (!k || !k.state) return C;
          var Z = k.state;
          return Z.window && (Z.window = null), k.state = null, _;
        }, h.inflateGetHeader = function(k, Z) {
          var L;
          return k && k.state ? (2 & (L = k.state).wrap) == 0 ? C : ((L.head = Z).done = !1, _) : C;
        }, h.inflateSetDictionary = function(k, Z) {
          var L, $ = Z.length;
          return k && k.state ? (L = k.state).wrap !== 0 && L.mode !== 11 ? C : L.mode === 11 && a(1, Z, $, 0) !== L.check ? -3 : lA(k, Z, $, $) ? (L.mode = 31, -4) : (L.havedict = 1, _) : C;
        }, h.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(n, c, h) {
        "use strict";
        var f = n("../utils/common"), a = [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          13,
          15,
          17,
          19,
          23,
          27,
          31,
          35,
          43,
          51,
          59,
          67,
          83,
          99,
          115,
          131,
          163,
          195,
          227,
          258,
          0,
          0
        ], o = [
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          17,
          17,
          17,
          17,
          18,
          18,
          18,
          18,
          19,
          19,
          19,
          19,
          20,
          20,
          20,
          20,
          21,
          21,
          21,
          21,
          16,
          72,
          78
        ], d = [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          13,
          17,
          25,
          33,
          49,
          65,
          97,
          129,
          193,
          257,
          385,
          513,
          769,
          1025,
          1537,
          2049,
          3073,
          4097,
          6145,
          8193,
          12289,
          16385,
          24577,
          0,
          0
        ], U = [
          16,
          16,
          16,
          16,
          17,
          17,
          18,
          18,
          19,
          19,
          20,
          20,
          21,
          21,
          22,
          22,
          23,
          23,
          24,
          24,
          25,
          25,
          26,
          26,
          27,
          27,
          28,
          28,
          29,
          29,
          64,
          64
        ];
        c.exports = function(b, v, _, C, m, w, I, T) {
          var x, N, O, F, g, R, V, E, q, lA = T.bits, k = 0, Z = 0, L = 0, $ = 0, uA = 0, rA = 0, vA = 0, sA = 0, dA = 0, tA = 0, P = null, iA = 0, aA = new f.Buf16(16), fA = new f.Buf16(16), _A = null, H = 0;
          for (k = 0; k <= 15; k++) aA[k] = 0;
          for (Z = 0; Z < C; Z++) aA[v[_ + Z]]++;
          for (uA = lA, $ = 15; 1 <= $ && aA[$] === 0; $--) ;
          if ($ < uA && (uA = $), $ === 0) return m[w++] = 20971520, m[w++] = 20971520, T.bits = 1, 0;
          for (L = 1; L < $ && aA[L] === 0; L++) ;
          for (uA < L && (uA = L), k = sA = 1; k <= 15; k++) if (sA <<= 1, (sA -= aA[k]) < 0) return -1;
          if (0 < sA && (b === 0 || $ !== 1)) return -1;
          for (fA[1] = 0, k = 1; k < 15; k++) fA[k + 1] = fA[k] + aA[k];
          for (Z = 0; Z < C; Z++) v[_ + Z] !== 0 && (I[fA[v[_ + Z]]++] = Z);
          if (R = b === 0 ? (P = _A = I, 19) : b === 1 ? (P = a, iA -= 257, _A = o, H -= 257, 256) : (P = d, _A = U, -1), k = L, g = w, vA = Z = tA = 0, O = -1, F = (dA = 1 << (rA = uA)) - 1, b === 1 && 852 < dA || b === 2 && 592 < dA) return 1;
          for (; ; ) {
            for (V = k - vA, q = I[Z] < R ? (E = 0, I[Z]) : I[Z] > R ? (E = _A[H + I[Z]], P[iA + I[Z]]) : (E = 96, 0), x = 1 << k - vA, L = N = 1 << rA; m[g + (tA >> vA) + (N -= x)] = V << 24 | E << 16 | q | 0, N !== 0; ) ;
            for (x = 1 << k - 1; tA & x; ) x >>= 1;
            if (x !== 0 ? (tA &= x - 1, tA += x) : tA = 0, Z++, --aA[k] == 0) {
              if (k === $) break;
              k = v[_ + I[Z]];
            }
            if (uA < k && (tA & F) !== O) {
              for (vA === 0 && (vA = uA), g += L, sA = 1 << (rA = k - vA); rA + vA < $ && !((sA -= aA[rA + vA]) <= 0); ) rA++, sA <<= 1;
              if (dA += 1 << rA, b === 1 && 852 < dA || b === 2 && 592 < dA) return 1;
              m[O = tA & F] = uA << 24 | rA << 16 | g - w | 0;
            }
          }
          return tA !== 0 && (m[g + tA] = k - vA << 24 | 4194304), T.bits = uA, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(n, c, h) {
        "use strict";
        c.exports = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version"
        };
      }, {}],
      52: [function(n, c, h) {
        "use strict";
        var f = n("../utils/common"), a = 0, o = 1;
        function d(u) {
          for (var Q = u.length; 0 <= --Q; ) u[Q] = 0;
        }
        var U = 0, b = 29, v = 256, _ = v + 1 + b, C = 30, m = 19, w = 2 * _ + 1, I = 15, T = 16, x = 7, N = 256, O = 16, F = 17, g = 18, R = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4,
          5,
          5,
          5,
          5,
          0
        ], V = [
          0,
          0,
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          3,
          4,
          4,
          5,
          5,
          6,
          6,
          7,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13
        ], E = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2,
          3,
          7
        ], q = [
          16,
          17,
          18,
          0,
          8,
          7,
          9,
          6,
          10,
          5,
          11,
          4,
          12,
          3,
          13,
          2,
          14,
          1,
          15
        ], lA = new Array(2 * (_ + 2));
        d(lA);
        var k = new Array(2 * C);
        d(k);
        var Z = new Array(512);
        d(Z);
        var L = new Array(256);
        d(L);
        var $ = new Array(b);
        d($);
        var uA, rA, vA, sA = new Array(C);
        function dA(u, Q, j, AA, Y) {
          this.static_tree = u, this.extra_bits = Q, this.extra_base = j, this.elems = AA, this.max_length = Y, this.has_stree = u && u.length;
        }
        function tA(u, Q) {
          this.dyn_tree = u, this.max_code = 0, this.stat_desc = Q;
        }
        function P(u) {
          return u < 256 ? Z[u] : Z[256 + (u >>> 7)];
        }
        function iA(u, Q) {
          u.pending_buf[u.pending++] = 255 & Q, u.pending_buf[u.pending++] = Q >>> 8 & 255;
        }
        function aA(u, Q, j) {
          u.bi_valid > T - j ? (u.bi_buf |= Q << u.bi_valid & 65535, iA(u, u.bi_buf), u.bi_buf = Q >> T - u.bi_valid, u.bi_valid += j - T) : (u.bi_buf |= Q << u.bi_valid & 65535, u.bi_valid += j);
        }
        function fA(u, Q, j) {
          aA(u, j[2 * Q], j[2 * Q + 1]);
        }
        function _A(u, Q) {
          for (var j = 0; j |= 1 & u, u >>>= 1, j <<= 1, 0 < --Q; ) ;
          return j >>> 1;
        }
        function H(u, Q, j) {
          var AA, Y, gA = new Array(I + 1), yA = 0;
          for (AA = 1; AA <= I; AA++) gA[AA] = yA = yA + j[AA - 1] << 1;
          for (Y = 0; Y <= Q; Y++) {
            var BA = u[2 * Y + 1];
            BA !== 0 && (u[2 * Y] = _A(gA[BA]++, BA));
          }
        }
        function y(u) {
          var Q;
          for (Q = 0; Q < _; Q++) u.dyn_ltree[2 * Q] = 0;
          for (Q = 0; Q < C; Q++) u.dyn_dtree[2 * Q] = 0;
          for (Q = 0; Q < m; Q++) u.bl_tree[2 * Q] = 0;
          u.dyn_ltree[2 * N] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
        }
        function J(u) {
          8 < u.bi_valid ? iA(u, u.bi_buf) : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
        }
        function z(u, Q, j, AA) {
          var Y = 2 * Q, gA = 2 * j;
          return u[Y] < u[gA] || u[Y] === u[gA] && AA[Q] <= AA[j];
        }
        function pA(u, Q, j) {
          for (var AA = u.heap[j], Y = j << 1; Y <= u.heap_len && (Y < u.heap_len && z(Q, u.heap[Y + 1], u.heap[Y], u.depth) && Y++, !z(Q, AA, u.heap[Y], u.depth)); ) u.heap[j] = u.heap[Y], j = Y, Y <<= 1;
          u.heap[j] = AA;
        }
        function M(u, Q, j) {
          var AA, Y, gA, yA, BA = 0;
          if (u.last_lit !== 0) for (; AA = u.pending_buf[u.d_buf + 2 * BA] << 8 | u.pending_buf[u.d_buf + 2 * BA + 1], Y = u.pending_buf[u.l_buf + BA], BA++, AA === 0 ? fA(u, Y, Q) : (fA(u, (gA = L[Y]) + v + 1, Q), (yA = R[gA]) !== 0 && aA(u, Y -= $[gA], yA), fA(u, gA = P(--AA), j), (yA = V[gA]) !== 0 && aA(u, AA -= sA[gA], yA)), BA < u.last_lit; ) ;
          fA(u, N, Q);
        }
        function G(u, Q) {
          var j, AA, Y, gA = Q.dyn_tree, yA = Q.stat_desc.static_tree, BA = Q.stat_desc.has_stree, QA = Q.stat_desc.elems, xA = -1;
          for (u.heap_len = 0, u.heap_max = w, j = 0; j < QA; j++) gA[2 * j] !== 0 ? (u.heap[++u.heap_len] = xA = j, u.depth[j] = 0) : gA[2 * j + 1] = 0;
          for (; u.heap_len < 2; ) gA[2 * (Y = u.heap[++u.heap_len] = xA < 2 ? ++xA : 0)] = 1, u.depth[Y] = 0, u.opt_len--, BA && (u.static_len -= yA[2 * Y + 1]);
          for (Q.max_code = xA, j = u.heap_len >> 1; 1 <= j; j--) pA(u, gA, j);
          for (Y = QA; j = u.heap[1], u.heap[1] = u.heap[u.heap_len--], pA(u, gA, 1), AA = u.heap[1], u.heap[--u.heap_max] = j, u.heap[--u.heap_max] = AA, gA[2 * Y] = gA[2 * j] + gA[2 * AA], u.depth[Y] = (u.depth[j] >= u.depth[AA] ? u.depth[j] : u.depth[AA]) + 1, gA[2 * j + 1] = gA[2 * AA + 1] = Y, u.heap[1] = Y++, pA(u, gA, 1), 2 <= u.heap_len; ) ;
          u.heap[--u.heap_max] = u.heap[1], (function(RA, Ae) {
            var Be, _e, Ue, te, Je, st, be = Ae.dyn_tree, Vt = Ae.max_code, mr = Ae.stat_desc.static_tree, Qt = Ae.stat_desc.has_stree, vr = Ae.stat_desc.extra_bits, Ut = Ae.stat_desc.extra_base, Oe = Ae.stat_desc.max_length, at = 0;
            for (te = 0; te <= I; te++) RA.bl_count[te] = 0;
            for (be[2 * RA.heap[RA.heap_max] + 1] = 0, Be = RA.heap_max + 1; Be < w; Be++) Oe < (te = be[2 * be[2 * (_e = RA.heap[Be]) + 1] + 1] + 1) && (te = Oe, at++), be[2 * _e + 1] = te, Vt < _e || (RA.bl_count[te]++, Je = 0, Ut <= _e && (Je = vr[_e - Ut]), st = be[2 * _e], RA.opt_len += st * (te + Je), Qt && (RA.static_len += st * (mr[2 * _e + 1] + Je)));
            if (at !== 0) {
              do {
                for (te = Oe - 1; RA.bl_count[te] === 0; ) te--;
                RA.bl_count[te]--, RA.bl_count[te + 1] += 2, RA.bl_count[Oe]--, at -= 2;
              } while (0 < at);
              for (te = Oe; te !== 0; te--) for (_e = RA.bl_count[te]; _e !== 0; ) Vt < (Ue = RA.heap[--Be]) || (be[2 * Ue + 1] !== te && (RA.opt_len += (te - be[2 * Ue + 1]) * be[2 * Ue], be[2 * Ue + 1] = te), _e--);
            }
          })(u, Q), H(gA, xA, u.bl_count);
        }
        function B(u, Q, j) {
          var AA, Y, gA = -1, yA = Q[1], BA = 0, QA = 7, xA = 4;
          for (yA === 0 && (QA = 138, xA = 3), Q[2 * (j + 1) + 1] = 65535, AA = 0; AA <= j; AA++) Y = yA, yA = Q[2 * (AA + 1) + 1], ++BA < QA && Y === yA || (BA < xA ? u.bl_tree[2 * Y] += BA : Y !== 0 ? (Y !== gA && u.bl_tree[2 * Y]++, u.bl_tree[2 * O]++) : BA <= 10 ? u.bl_tree[2 * F]++ : u.bl_tree[2 * g]++, gA = Y, xA = (BA = 0) === yA ? (QA = 138, 3) : Y === yA ? (QA = 6, 3) : (QA = 7, 4));
        }
        function eA(u, Q, j) {
          var AA, Y, gA = -1, yA = Q[1], BA = 0, QA = 7, xA = 4;
          for (yA === 0 && (QA = 138, xA = 3), AA = 0; AA <= j; AA++) if (Y = yA, yA = Q[2 * (AA + 1) + 1], !(++BA < QA && Y === yA)) {
            if (BA < xA) for (; fA(u, Y, u.bl_tree), --BA != 0; ) ;
            else Y !== 0 ? (Y !== gA && (fA(u, Y, u.bl_tree), BA--), fA(u, O, u.bl_tree), aA(u, BA - 3, 2)) : BA <= 10 ? (fA(u, F, u.bl_tree), aA(u, BA - 3, 3)) : (fA(u, g, u.bl_tree), aA(u, BA - 11, 7));
            gA = Y, xA = (BA = 0) === yA ? (QA = 138, 3) : Y === yA ? (QA = 6, 3) : (QA = 7, 4);
          }
        }
        d(sA);
        var D = !1;
        function l(u, Q, j, AA) {
          aA(u, (U << 1) + (AA ? 1 : 0), 3), (function(Y, gA, yA, BA) {
            J(Y), BA && (iA(Y, yA), iA(Y, ~yA)), f.arraySet(Y.pending_buf, Y.window, gA, yA, Y.pending), Y.pending += yA;
          })(u, Q, j, !0);
        }
        h._tr_init = function(u) {
          D || ((function() {
            var Q, j, AA, Y, gA, yA = new Array(I + 1);
            for (Y = AA = 0; Y < b - 1; Y++) for ($[Y] = AA, Q = 0; Q < 1 << R[Y]; Q++) L[AA++] = Y;
            for (L[AA - 1] = Y, Y = gA = 0; Y < 16; Y++) for (sA[Y] = gA, Q = 0; Q < 1 << V[Y]; Q++) Z[gA++] = Y;
            for (gA >>= 7; Y < C; Y++) for (sA[Y] = gA << 7, Q = 0; Q < 1 << V[Y] - 7; Q++) Z[256 + gA++] = Y;
            for (j = 0; j <= I; j++) yA[j] = 0;
            for (Q = 0; Q <= 143; ) lA[2 * Q + 1] = 8, Q++, yA[8]++;
            for (; Q <= 255; ) lA[2 * Q + 1] = 9, Q++, yA[9]++;
            for (; Q <= 279; ) lA[2 * Q + 1] = 7, Q++, yA[7]++;
            for (; Q <= 287; ) lA[2 * Q + 1] = 8, Q++, yA[8]++;
            for (H(lA, _ + 1, yA), Q = 0; Q < C; Q++) k[2 * Q + 1] = 5, k[2 * Q] = _A(Q, 5);
            uA = new dA(lA, R, v + 1, _, I), rA = new dA(k, V, 0, C, I), vA = new dA(new Array(0), E, 0, m, x);
          })(), D = !0), u.l_desc = new tA(u.dyn_ltree, uA), u.d_desc = new tA(u.dyn_dtree, rA), u.bl_desc = new tA(u.bl_tree, vA), u.bi_buf = 0, u.bi_valid = 0, y(u);
        }, h._tr_stored_block = l, h._tr_flush_block = function(u, Q, j, AA) {
          var Y, gA, yA = 0;
          0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = (function(BA) {
            var QA, xA = 4093624447;
            for (QA = 0; QA <= 31; QA++, xA >>>= 1) if (1 & xA && BA.dyn_ltree[2 * QA] !== 0) return a;
            if (BA.dyn_ltree[18] !== 0 || BA.dyn_ltree[20] !== 0 || BA.dyn_ltree[26] !== 0) return o;
            for (QA = 32; QA < v; QA++) if (BA.dyn_ltree[2 * QA] !== 0) return o;
            return a;
          })(u)), G(u, u.l_desc), G(u, u.d_desc), yA = (function(BA) {
            var QA;
            for (B(BA, BA.dyn_ltree, BA.l_desc.max_code), B(BA, BA.dyn_dtree, BA.d_desc.max_code), G(BA, BA.bl_desc), QA = m - 1; 3 <= QA && BA.bl_tree[2 * q[QA] + 1] === 0; QA--) ;
            return BA.opt_len += 3 * (QA + 1) + 5 + 5 + 4, QA;
          })(u), Y = u.opt_len + 3 + 7 >>> 3, (gA = u.static_len + 3 + 7 >>> 3) <= Y && (Y = gA)) : Y = gA = j + 5, j + 4 <= Y && Q !== -1 ? l(u, Q, j, AA) : u.strategy === 4 || gA === Y ? (aA(u, 2 + (AA ? 1 : 0), 3), M(u, lA, k)) : (aA(u, 4 + (AA ? 1 : 0), 3), (function(BA, QA, xA, RA) {
            var Ae;
            for (aA(BA, QA - 257, 5), aA(BA, xA - 1, 5), aA(BA, RA - 4, 4), Ae = 0; Ae < RA; Ae++) aA(BA, BA.bl_tree[2 * q[Ae] + 1], 3);
            eA(BA, BA.dyn_ltree, QA - 1), eA(BA, BA.dyn_dtree, xA - 1);
          })(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, yA + 1), M(u, u.dyn_ltree, u.dyn_dtree)), y(u), AA && J(u);
        }, h._tr_tally = function(u, Q, j) {
          return u.pending_buf[u.d_buf + 2 * u.last_lit] = Q >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & Q, u.pending_buf[u.l_buf + u.last_lit] = 255 & j, u.last_lit++, Q === 0 ? u.dyn_ltree[2 * j]++ : (u.matches++, Q--, u.dyn_ltree[2 * (L[j] + v + 1)]++, u.dyn_dtree[2 * P(Q)]++), u.last_lit === u.lit_bufsize - 1;
        }, h._tr_align = function(u) {
          aA(u, 2, 3), fA(u, N, lA), (function(Q) {
            Q.bi_valid === 16 ? (iA(Q, Q.bi_buf), Q.bi_buf = 0, Q.bi_valid = 0) : 8 <= Q.bi_valid && (Q.pending_buf[Q.pending++] = 255 & Q.bi_buf, Q.bi_buf >>= 8, Q.bi_valid -= 8);
          })(u);
        };
      }, { "../utils/common": 41 }],
      53: [function(n, c, h) {
        "use strict";
        c.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(n, c, h) {
        (function(f) {
          (function(a, o) {
            "use strict";
            if (!a.setImmediate) {
              var d, U, b, v, _ = 1, C = {}, m = !1, w = a.document, I = Object.getPrototypeOf && Object.getPrototypeOf(a);
              I = I && I.setTimeout ? I : a, d = {}.toString.call(a.process) === "[object process]" ? function(O) {
                MA.nextTick(function() {
                  x(O);
                });
              } : (function() {
                if (a.postMessage && !a.importScripts) {
                  var O = !0, F = a.onmessage;
                  return a.onmessage = function() {
                    O = !1;
                  }, a.postMessage("", "*"), a.onmessage = F, O;
                }
              })() ? (v = "setImmediate$" + Math.random() + "$", a.addEventListener ? a.addEventListener("message", N, !1) : a.attachEvent("onmessage", N), function(O) {
                a.postMessage(v + O, "*");
              }) : a.MessageChannel ? ((b = new MessageChannel()).port1.onmessage = function(O) {
                x(O.data);
              }, function(O) {
                b.port2.postMessage(O);
              }) : w && "onreadystatechange" in w.createElement("script") ? (U = w.documentElement, function(O) {
                var F = w.createElement("script");
                F.onreadystatechange = function() {
                  x(O), F.onreadystatechange = null, U.removeChild(F), F = null;
                }, U.appendChild(F);
              }) : function(O) {
                setTimeout(x, 0, O);
              }, I.setImmediate = function(O) {
                typeof O != "function" && (O = new Function("" + O));
                for (var F = new Array(arguments.length - 1), g = 0; g < F.length; g++) F[g] = arguments[g + 1];
                return C[_] = {
                  callback: O,
                  args: F
                }, d(_), _++;
              }, I.clearImmediate = T;
            }
            function T(O) {
              delete C[O];
            }
            function x(O) {
              if (m) setTimeout(x, 0, O);
              else {
                var F = C[O];
                if (F) {
                  m = !0;
                  try {
                    (function(g) {
                      var R = g.callback, V = g.args;
                      switch (V.length) {
                        case 0:
                          R();
                          break;
                        case 1:
                          R(V[0]);
                          break;
                        case 2:
                          R(V[0], V[1]);
                          break;
                        case 3:
                          R(V[0], V[1], V[2]);
                          break;
                        default:
                          R.apply(o, V);
                      }
                    })(F);
                  } finally {
                    T(O), m = !1;
                  }
                }
              }
            }
            function N(O) {
              O.source === a && typeof O.data == "string" && O.data.indexOf(v) === 0 && x(+O.data.slice(v.length));
            }
          })(typeof self > "u" ? f === void 0 ? this : f : self);
        }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), m0 = /* @__PURE__ */ FA(((A, i) => {
  var n = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function c(h) {
    return h && h.replace ? h.replace(/([&"<>'])/g, function(f, a) {
      return n[a];
    }) : h;
  }
  i.exports = c;
})), v0 = /* @__PURE__ */ FA(((A, i) => {
  yt();
  var n = m0(), c = Fs().Stream, h = "    ";
  function f(v, _) {
    typeof _ != "object" && (_ = { indent: _ });
    var C = _.stream ? new c() : null, m = "", w = !1, I = _.indent ? _.indent === !0 ? h : _.indent : "", T = !0;
    function x(R) {
      T ? MA.nextTick(R) : R();
    }
    function N(R, V) {
      if (V !== void 0 && (m += V), R && !w && (C = C || new c(), w = !0), R && w) {
        var E = m;
        x(function() {
          C.emit("data", E);
        }), m = "";
      }
    }
    function O(R, V) {
      U(N, d(R, I, I ? 1 : 0), V);
    }
    function F() {
      if (C) {
        var R = m;
        x(function() {
          C.emit("data", R), C.emit("end"), C.readable = !1, C.emit("close");
        });
      }
    }
    function g(R) {
      var V = {
        version: "1.0",
        encoding: R.encoding || "UTF-8"
      };
      R.standalone && (V.standalone = R.standalone), O({ "?xml": { _attr: V } }), m = m.replace("/>", "?>");
    }
    return x(function() {
      T = !1;
    }), _.declaration && g(_.declaration), v && v.forEach ? v.forEach(function(R, V) {
      var E;
      V + 1 === v.length && (E = F), O(R, E);
    }) : O(v, F), C ? (C.readable = !0, C) : m;
  }
  function a() {
    var v = { _elem: d(Array.prototype.slice.call(arguments)) };
    return v.push = function(_) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var C = this, m = this._elem.indent;
      U(this.append, d(_, m, this._elem.icount + (m ? 1 : 0)), function() {
        C.append(!0);
      });
    }, v.close = function(_) {
      _ !== void 0 && this.push(_), this.end && this.end();
    }, v;
  }
  function o(v, _) {
    return new Array(_ || 0).join(v || "");
  }
  function d(v, _, C) {
    C = C || 0;
    var m = o(_, C), w, I = v, T = !1;
    if (typeof v == "object" && (w = Object.keys(v)[0], I = v[w], I && I._elem))
      return I._elem.name = w, I._elem.icount = C, I._elem.indent = _, I._elem.indents = m, I._elem.interrupt = I, I._elem;
    var x = [], N = [], O;
    function F(g) {
      Object.keys(g).forEach(function(R) {
        x.push(b(R, g[R]));
      });
    }
    switch (typeof I) {
      case "object":
        if (I === null) break;
        I._attr && F(I._attr), I._cdata && N.push(("<![CDATA[" + I._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), I.forEach && (O = !1, N.push(""), I.forEach(function(g) {
          typeof g == "object" ? Object.keys(g)[0] == "_attr" ? F(g._attr) : N.push(d(g, _, C + 1)) : (N.pop(), O = !0, N.push(n(g)));
        }), O || N.push(""));
        break;
      default:
        N.push(n(I));
    }
    return {
      name: w,
      interrupt: T,
      attributes: x,
      content: N,
      icount: C,
      indents: m,
      indent: _
    };
  }
  function U(v, _, C) {
    if (typeof _ != "object") return v(!1, _);
    var m = _.interrupt ? 1 : _.content.length;
    function w() {
      for (; _.content.length; ) {
        var T = _.content.shift();
        if (T !== void 0) {
          if (I(T)) return;
          U(v, T);
        }
      }
      v(!1, (m > 1 ? _.indents : "") + (_.name ? "</" + _.name + ">" : "") + (_.indent && !C ? `
` : "")), C && C();
    }
    function I(T) {
      return T.interrupt ? (T.interrupt.append = v, T.interrupt.end = w, T.interrupt = !1, v(!0), !0) : !1;
    }
    if (v(!1, _.indents + (_.name ? "<" + _.name : "") + (_.attributes.length ? " " + _.attributes.join(" ") : "") + (m ? _.name ? ">" : "" : _.name ? "/>" : "") + (_.indent && m > 1 ? `
` : "")), !m) return v(!1, _.indent ? `
` : "");
    I(_) || w();
  }
  function b(v, _) {
    return v + '="' + n(_) + '"';
  }
  i.exports = f, i.exports.element = i.exports.Element = a;
})), y0 = Fs(), lr = /* @__PURE__ */ gs(B0(), 1), ZA = /* @__PURE__ */ gs(v0(), 1), Nr = 0, As = 32, C0 = 32, F0 = (A, i) => {
  const n = i.replace(/-/g, "");
  if (n.length !== C0) throw new Error(`Error: Cannot extract GUID from font filename: ${i}`);
  const c = n.replace(/(..)/g, "$1 ").trim().split(" ").map((a) => parseInt(a, 16));
  c.reverse();
  const h = A.slice(Nr, As).map((a, o) => a ^ c[o % c.length]), f = new Uint8Array(Nr + h.length + Math.max(0, A.length - As));
  return f.set(A.slice(0, Nr)), f.set(h, Nr), f.set(A.slice(As), Nr + h.length), f;
}, Ss = class {
  format(A, i = { stack: [] }) {
    const n = A.prepForXml(i);
    if (n) return n;
    throw Error("XMLComponent did not format correctly");
  }
}, mu = class {
  replace(A, i, n) {
    let c = A;
    return i.forEach((h, f) => {
      c = c.replace(new RegExp(`{${h.fileName}}`, "g"), (n + f).toString());
    }), c;
  }
  getMediaData(A, i) {
    return i.Array.filter((n) => A.search(`{${n.fileName}}`) > 0);
  }
}, E0 = class {
  replace(A, i) {
    let n = A;
    for (const c of i) n = n.replace(new RegExp(`{${c.reference}-${c.instance}}`, "g"), c.numId.toString());
    return n;
  }
}, Q0 = class {
  constructor() {
    hA(this, "formatter", void 0), hA(this, "imageReplacer", void 0), hA(this, "numberingReplacer", void 0), this.formatter = new Ss(), this.imageReplacer = new mu(), this.numberingReplacer = new E0();
  }
  compile(A, i, n = []) {
    const c = new lr.default(), h = this.xmlifyFile(A, i), f = new Map(Object.entries(h));
    for (const [, a] of f) if (Array.isArray(a)) for (const o of a) c.file(o.path, Mn(o.data));
    else c.file(a.path, Mn(a.data));
    for (const a of n) c.file(a.path, Mn(a.data));
    for (const a of A.Media.Array) a.type !== "svg" ? c.file(`word/media/${a.fileName}`, a.data) : (c.file(`word/media/${a.fileName}`, a.data), c.file(`word/media/${a.fallback.fileName}`, a.fallback.data));
    for (const [a, { data: o, fontKey: d }] of A.FontTable.fontOptionsWithKey.entries()) c.file(`word/fonts/font${a + 1}.odttf`, F0(o, d));
    return c;
  }
  xmlifyFile(A, i) {
    const n = A.Document.Relationships.RelationshipCount + 1, c = (0, ZA.default)(this.formatter.format(A.Document.View, {
      viewWrapper: A.Document,
      file: A,
      stack: []
    }), {
      indent: i,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), h = A.Comments.Relationships.RelationshipCount + 1, f = (0, ZA.default)(this.formatter.format(A.Comments, {
      viewWrapper: {
        View: A.Comments,
        Relationships: A.Comments.Relationships
      },
      file: A,
      stack: []
    }), {
      indent: i,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), a = A.FootNotes.Relationships.RelationshipCount + 1, o = (0, ZA.default)(this.formatter.format(A.FootNotes.View, {
      viewWrapper: A.FootNotes,
      file: A,
      stack: []
    }), {
      indent: i,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), d = this.imageReplacer.getMediaData(c, A.Media), U = this.imageReplacer.getMediaData(f, A.Media), b = this.imageReplacer.getMediaData(o, A.Media);
    return UA(UA({
      Relationships: {
        data: (d.forEach((v, _) => {
          A.Document.Relationships.addRelationship(n + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), A.Document.Relationships.addRelationship(A.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, ZA.default)(this.formatter.format(A.Document.Relationships, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const v = this.imageReplacer.replace(c, d, n);
          return this.numberingReplacer.replace(v, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const v = (0, ZA.default)(this.formatter.format(A.Styles, {
            viewWrapper: A.Document,
            file: A,
            stack: []
          }), {
            indent: i,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          });
          return this.numberingReplacer.replace(v, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: (0, ZA.default)(this.formatter.format(A.CoreProperties, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/core.xml"
      },
      Numbering: {
        data: (0, ZA.default)(this.formatter.format(A.Numbering, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/numbering.xml"
      },
      FileRelationships: {
        data: (0, ZA.default)(this.formatter.format(A.FileRelationships, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: A.Headers.map((v, _) => {
        const C = (0, ZA.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(C, A.Media).forEach((m, w) => {
          v.Relationships.addRelationship(w, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
        }), {
          data: (0, ZA.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: A,
            stack: []
          }), {
            indent: i,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${_ + 1}.xml.rels`
        };
      }),
      FooterRelationships: A.Footers.map((v, _) => {
        const C = (0, ZA.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(C, A.Media).forEach((m, w) => {
          v.Relationships.addRelationship(w, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${m.fileName}`);
        }), {
          data: (0, ZA.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: A,
            stack: []
          }), {
            indent: i,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${_ + 1}.xml.rels`
        };
      }),
      Headers: A.Headers.map((v, _) => {
        const C = (0, ZA.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }), m = this.imageReplacer.getMediaData(C, A.Media), w = this.imageReplacer.replace(C, m, 0);
        return {
          data: this.numberingReplacer.replace(w, A.Numbering.ConcreteNumbering),
          path: `word/header${_ + 1}.xml`
        };
      }),
      Footers: A.Footers.map((v, _) => {
        const C = (0, ZA.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }), m = this.imageReplacer.getMediaData(C, A.Media), w = this.imageReplacer.replace(C, m, 0);
        return {
          data: this.numberingReplacer.replace(w, A.Numbering.ConcreteNumbering),
          path: `word/footer${_ + 1}.xml`
        };
      }),
      ContentTypes: {
        data: (0, ZA.default)(this.formatter.format(A.ContentTypes, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "[Content_Types].xml"
      },
      CustomProperties: {
        data: (0, ZA.default)(this.formatter.format(A.CustomProperties, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/custom.xml"
      },
      AppProperties: {
        data: (0, ZA.default)(this.formatter.format(A.AppProperties, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/app.xml"
      },
      FootNotes: {
        data: (() => {
          const v = this.imageReplacer.replace(o, b, a);
          return this.numberingReplacer.replace(v, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (b.forEach((v, _) => {
          A.FootNotes.Relationships.addRelationship(a + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), (0, ZA.default)(this.formatter.format(A.FootNotes.Relationships, {
          viewWrapper: A.FootNotes,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/footnotes.xml.rels"
      },
      Endnotes: {
        data: (0, ZA.default)(this.formatter.format(A.Endnotes.View, {
          viewWrapper: A.Endnotes,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (0, ZA.default)(this.formatter.format(A.Endnotes.Relationships, {
          viewWrapper: A.Endnotes,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/endnotes.xml.rels"
      },
      Settings: {
        data: (0, ZA.default)(this.formatter.format(A.Settings, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/settings.xml"
      },
      Comments: {
        data: (() => {
          const v = this.imageReplacer.replace(f, U, h);
          return this.numberingReplacer.replace(v, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (U.forEach((v, _) => {
          A.Comments.Relationships.addRelationship(h + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), (0, ZA.default)(this.formatter.format(A.Comments.Relationships, {
          viewWrapper: {
            View: A.Comments,
            Relationships: A.Comments.Relationships
          },
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/comments.xml.rels"
      }
    }, A.CommentsExtended ? { CommentsExtended: {
      data: (0, ZA.default)(this.formatter.format(A.CommentsExtended, {
        viewWrapper: {
          View: A.CommentsExtended,
          Relationships: A.Comments.Relationships
        },
        file: A,
        stack: []
      }), {
        indent: i,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }),
      path: "word/commentsExtended.xml"
    } } : {}), {}, {
      FontTable: {
        data: (0, ZA.default)(this.formatter.format(A.FontTable.View, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/fontTable.xml"
      },
      FontTableRelationships: {
        data: (0, ZA.default)(this.formatter.format(A.FontTable.Relationships, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/fontTable.xml.rels"
      }
    });
  }
};
function Wo(A, i, n, c, h, f, a) {
  try {
    var o = A[f](a), d = o.value;
  } catch (U) {
    n(U);
    return;
  }
  o.done ? i(d) : Promise.resolve(d).then(c, h);
}
function Hs(A) {
  return function() {
    var i = this, n = arguments;
    return new Promise(function(c, h) {
      var f = A.apply(i, n);
      function a(d) {
        Wo(f, c, h, a, o, "next", d);
      }
      function o(d) {
        Wo(f, c, h, a, o, "throw", d);
      }
      a(void 0);
    });
  };
}
var U0 = {
  NONE: "",
  WITH_2_BLANKS: "  ",
  WITH_4_BLANKS: "    ",
  WITH_TAB: "	"
}, Xo = (A) => A === !0 ? U0.WITH_2_BLANKS : A === !1 ? void 0 : A, vu = class ar {
  static pack(i, n, c) {
    var h = this;
    return Hs(function* (f, a, o, d = []) {
      return h.compiler.compile(f, Xo(o), d).generateAsync({
        type: a,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    }).apply(this, arguments);
  }
  static toString(i, n, c = []) {
    return ar.pack(i, "string", n, c);
  }
  static toBuffer(i, n, c = []) {
    return ar.pack(i, "nodebuffer", n, c);
  }
  static toBase64String(i, n, c = []) {
    return ar.pack(i, "base64", n, c);
  }
  static toBlob(i, n, c = []) {
    return ar.pack(i, "blob", n, c);
  }
  static toArrayBuffer(i, n, c = []) {
    return ar.pack(i, "arraybuffer", n, c);
  }
  static toStream(i, n, c = []) {
    const h = new y0.Stream();
    return this.compiler.compile(i, Xo(n), c).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((f) => {
      h.emit("data", f), h.emit("end");
    }), h;
  }
};
hA(vu, "compiler", new Q0());
var b0 = new Ss(), ti = (A) => (0, Yn.xml2js)(A, {
  compact: !1,
  captureSpacesBetweenElements: !0
}), yu = (A) => {
  var i;
  return (i = ti((0, ZA.default)(b0.format(new ls({ text: A })))).elements[0].elements) !== null && i !== void 0 ? i : [];
}, Cu = (A) => UA(UA({}, A), {}, { attributes: { "xml:space": "preserve" } }), Ls = (A, i) => {
  var n, c;
  return (n = (c = A.elements) === null || c === void 0 ? void 0 : c.filter((h) => h.name === i)[0].elements) !== null && n !== void 0 ? n : [];
}, sr = (A, i, n) => {
  const c = Ls(A, "Types");
  c.some((h) => {
    var f, a;
    return h.type === "element" && h.name === "Default" && (h == null || (f = h.attributes) === null || f === void 0 ? void 0 : f.ContentType) === i && (h == null || (a = h.attributes) === null || a === void 0 ? void 0 : a.Extension) === n;
  }) || c.push({
    attributes: {
      ContentType: i,
      Extension: n
    },
    name: "Default",
    type: "element"
  });
}, I0 = (A) => {
  const i = parseInt(A.substring(3), 10);
  return isNaN(i) ? 0 : i;
}, _0 = (A) => Ls(A, "Relationships").map((i) => {
  var n, c;
  return I0((n = (c = i.attributes) === null || c === void 0 || (c = c.Id) === null || c === void 0 ? void 0 : c.toString()) !== null && n !== void 0 ? n : "");
}).reduce((i, n) => Math.max(i, n), 0) + 1, jo = (A, i, n, c, h) => {
  const f = Ls(A, "Relationships");
  return f.push({
    attributes: {
      Id: `rId${i}`,
      Type: n,
      Target: c,
      TargetMode: h
    },
    name: "Relationship",
    type: "element"
  }), f;
}, x0 = class extends Error {
  constructor(A) {
    super(`Token ${A} not found`), this.name = "TokenNotFoundError";
  }
}, T0 = (A, i) => {
  var n;
  for (let a = 0; a < ((n = A.elements) !== null && n !== void 0 ? n : []).length; a++) {
    const o = A.elements[a];
    if (o.type === "element" && o.name === "w:r") {
      var c;
      const d = ((c = o.elements) !== null && c !== void 0 ? c : []).filter((U) => U.type === "element" && U.name === "w:t");
      for (const U of d) {
        var h, f;
        if (!((h = U.elements) === null || h === void 0) && h[0] && !((f = U.elements[0].text) === null || f === void 0) && f.includes(i))
          return a;
      }
    }
  }
  throw new x0(i);
}, S0 = (A, i) => {
  var n, c;
  let h = -1;
  const f = (n = (c = A.elements) === null || c === void 0 ? void 0 : c.map((a, o) => {
    if (h !== -1) return a;
    if (a.type === "element" && a.name === "w:t") {
      var d, U;
      const b = ((d = (U = a.elements) === null || U === void 0 || (U = U[0]) === null || U === void 0 ? void 0 : U.text) !== null && d !== void 0 ? d : "").split(i), v = b.map((_) => UA(UA(UA({}, a), Cu(a)), {}, { elements: yu(_) }));
      return b.length > 1 && (h = o), v;
    } else return a;
  }).flat()) !== null && n !== void 0 ? n : [];
  return {
    left: UA(UA({}, JSON.parse(JSON.stringify(A))), {}, { elements: f.slice(0, h + 1) }),
    right: UA(UA({}, JSON.parse(JSON.stringify(A))), {}, { elements: f.slice(h + 1) })
  };
}, kr = {
  START: 0,
  MIDDLE: 1,
  END: 2
}, H0 = ({ paragraphElement: A, renderedParagraph: i, originalText: n, replacementText: c }) => {
  const h = i.text.indexOf(n), f = h + n.length - 1;
  let a = kr.START;
  for (const o of i.runs) for (const { text: d, index: U, start: b, end: v } of o.parts) switch (a) {
    case kr.START:
      if (h >= b && h <= v) {
        const _ = h - b, C = Math.min(f, v) - b, m = o.text.substring(_, C + 1);
        if (m === "") continue;
        const w = d.replace(m, c);
        es(A.elements[o.index].elements[U], w), a = kr.MIDDLE;
        continue;
      }
      break;
    case kr.MIDDLE:
      if (f <= v) {
        const _ = d.substring(f - b + 1);
        es(A.elements[o.index].elements[U], _);
        const C = A.elements[o.index].elements[U];
        A.elements[o.index].elements[U] = Cu(C), a = kr.END;
      } else es(A.elements[o.index].elements[U], "");
      break;
    default:
  }
  return A;
}, es = (A, i) => (A.elements = yu(i), A), L0 = (A) => {
  if (A.element.name !== "w:p") throw new Error(`Invalid node type: ${A.element.name}`);
  if (!A.element.elements) return {
    text: "",
    runs: [],
    index: -1,
    pathToParagraph: []
  };
  let i = 0;
  const n = A.element.elements.map((c, h) => ({
    element: c,
    i: h
  })).filter(({ element: c }) => c.name === "w:r").map(({ element: c, i: h }) => {
    const f = D0(c, h, i);
    return i += f.text.length, f;
  }).filter((c) => !!c);
  return {
    text: n.reduce((c, h) => c + h.text, ""),
    runs: n,
    index: A.index,
    pathToParagraph: Fu(A)
  };
}, D0 = (A, i, n) => {
  if (!A.elements) return {
    text: "",
    parts: [],
    index: -1,
    start: n,
    end: n
  };
  let c = n;
  const h = A.elements.map((f, a) => {
    var o, d;
    return f.name === "w:t" && f.elements && f.elements.length > 0 ? {
      text: (o = (d = f.elements[0].text) === null || d === void 0 ? void 0 : d.toString()) !== null && o !== void 0 ? o : "",
      index: a,
      start: c,
      end: (() => {
        var U, b;
        return c += ((U = (b = f.elements[0].text) === null || b === void 0 ? void 0 : b.toString()) !== null && U !== void 0 ? U : "").length - 1, c;
      })()
    } : void 0;
  }).filter((f) => !!f).map((f) => f);
  return {
    text: h.reduce((f, a) => f + a.text, ""),
    parts: h,
    index: i,
    start: n,
    end: c
  };
}, Fu = (A) => A.parent ? [...Fu(A.parent), A.index] : [A.index], zo = (A) => {
  var i, n;
  return (i = (n = A.element.elements) === null || n === void 0 ? void 0 : n.map((c, h) => ({
    element: c,
    index: h,
    parent: A
  }))) !== null && i !== void 0 ? i : [];
}, Eu = (A) => {
  let i = [];
  const n = [...zo({
    element: A,
    index: 0,
    parent: void 0
  })];
  let c;
  for (; n.length > 0; )
    c = n.shift(), c.element.name === "w:p" && (i = [...i, L0(c)]), n.push(...zo(c));
  return i;
}, R0 = (A, i) => Eu(A).filter((n) => n.text.includes(i)), O0 = new Ss(), ts = "ɵ", N0 = ({ json: A, patch: i, patchText: n, context: c, keepOriginalStyles: h = !0 }) => {
  const f = R0(A, n);
  if (f.length === 0) return {
    element: A,
    didFindOccurrence: !1
  };
  for (const a of f) {
    const o = i.children.map((d) => ti((0, ZA.default)(O0.format(d, c)))).map((d) => d.elements[0]);
    switch (i.type) {
      case Jo.DOCUMENT: {
        const d = k0(A, a.pathToParagraph), U = K0(a.pathToParagraph);
        d.elements.splice(U, 1, ...o);
        break;
      }
      case Jo.PARAGRAPH:
      default: {
        const d = Qu(A, a.pathToParagraph);
        H0({
          paragraphElement: d,
          renderedParagraph: a,
          originalText: n,
          replacementText: ts
        });
        const U = T0(d, ts), b = d.elements[U], { left: v, right: _ } = S0(b, ts);
        let C = o, m = _;
        if (h) {
          const w = b.elements.filter((I) => I.type === "element" && I.name === "w:rPr");
          C = o.map((I) => {
            var T;
            return UA(UA({}, I), {}, { elements: [...w, ...(T = I.elements) !== null && T !== void 0 ? T : []] });
          }), m = UA(UA({}, _), {}, { elements: [...w, ..._.elements] });
        }
        d.elements.splice(U, 1, v, ...C, m);
        break;
      }
    }
  }
  return {
    element: A,
    didFindOccurrence: !0
  };
}, Qu = (A, i) => {
  let n = A;
  for (let c = 1; c < i.length; c++) {
    const h = i[c];
    n = n.elements[h];
  }
  return n;
}, k0 = (A, i) => Qu(A, i.slice(0, i.length - 1)), K0 = (A) => A[A.length - 1], Jo = {
  DOCUMENT: "file",
  PARAGRAPH: "paragraph"
}, Yo = new mu(), M0 = new Uint8Array([255, 254]), P0 = new Uint8Array([254, 255]), Zo = (A, i) => {
  if (A.length !== i.length) return !1;
  for (let n = 0; n < A.length; n++) if (A[n] !== i[n]) return !1;
  return !0;
}, Uy = (function() {
  var A = Hs(function* ({ outputType: i, data: n, patches: c, keepOriginalStyles: h, placeholderDelimiters: f = {
    start: "{{",
    end: "}}"
  }, recursive: a = !0 }) {
    const o = n instanceof lr.default ? n : yield lr.default.loadAsync(n), d = /* @__PURE__ */ new Map(), U = { Media: new gu() }, b = /* @__PURE__ */ new Map(), v = [], _ = [];
    let C = !1;
    const m = /* @__PURE__ */ new Map();
    for (const [N, O] of Object.entries(o.files)) {
      const F = yield O.async("uint8array"), g = F.slice(0, 2);
      if (Zo(g, M0) || Zo(g, P0)) {
        m.set(N, F);
        continue;
      }
      if (!N.endsWith(".xml") && !N.endsWith(".rels")) {
        m.set(N, F);
        continue;
      }
      const R = ti(yield O.async("text"));
      if (N === "word/document.xml") {
        var w;
        const V = (w = R.elements) === null || w === void 0 ? void 0 : w.find((E) => E.name === "w:document");
        if (V && V.attributes) {
          for (const E of [
            "mc",
            "wp",
            "r",
            "w15",
            "m"
          ]) V.attributes[`xmlns:${E}`] = cs[E];
          V.attributes["mc:Ignorable"] = `${V.attributes["mc:Ignorable"] || ""} w15`.trim();
        }
      }
      if (N.startsWith("word/") && !N.endsWith(".xml.rels")) {
        const V = {
          file: U,
          viewWrapper: { Relationships: { addRelationship: (k, Z, L, $) => {
            _.push({
              key: N,
              hyperlink: {
                id: k,
                link: L
              }
            });
          } } },
          stack: []
        };
        if (d.set(N, V), !f?.start.trim() || !f?.end.trim()) throw new Error("Both start and end delimiters must be non-empty strings.");
        const { start: E, end: q } = f;
        for (const [k, Z] of Object.entries(c)) {
          const L = `${E}${k}${q}`;
          for (; ; ) {
            const { didFindOccurrence: $ } = N0({
              json: R,
              patch: UA(UA({}, Z), {}, { children: Z.children.map((uA) => {
                if (uA instanceof $l) {
                  const rA = new Ai(uA.options.children, kl());
                  return _.push({
                    key: N,
                    hyperlink: {
                      id: rA.linkId,
                      link: uA.options.link
                    }
                  }), rA;
                } else return uA;
              }) }),
              patchText: L,
              context: V,
              keepOriginalStyles: h
            });
            if (!a || !$) break;
          }
        }
        const lA = Yo.getMediaData(JSON.stringify(R), V.file.Media);
        lA.length > 0 && (C = !0, v.push({
          key: N,
          mediaDatas: lA
        }));
      }
      b.set(N, R);
    }
    for (const { key: N, mediaDatas: O } of v) {
      var I;
      const F = `word/_rels/${N.split("/").pop()}.rels`, g = (I = b.get(F)) !== null && I !== void 0 ? I : qo();
      b.set(F, g);
      const R = _0(g), V = Yo.replace(JSON.stringify(b.get(N)), O, R);
      b.set(N, JSON.parse(V));
      for (let E = 0; E < O.length; E++) {
        const { fileName: q } = O[E];
        jo(g, R + E, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${q}`);
      }
    }
    for (const { key: N, hyperlink: O } of _) {
      var T;
      const F = `word/_rels/${N.split("/").pop()}.rels`, g = (T = b.get(F)) !== null && T !== void 0 ? T : qo();
      b.set(F, g), jo(g, O.id, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", O.link, Zl.EXTERNAL);
    }
    if (C) {
      const N = b.get("[Content_Types].xml");
      if (!N) throw new Error("Could not find content types file");
      sr(N, "image/png", "png"), sr(N, "image/jpeg", "jpeg"), sr(N, "image/jpeg", "jpg"), sr(N, "image/bmp", "bmp"), sr(N, "image/gif", "gif"), sr(N, "image/svg+xml", "svg");
    }
    const x = new lr.default();
    for (const [N, O] of b) {
      const F = G0(O);
      x.file(N, Mn(F));
    }
    for (const [N, O] of m) x.file(N, O);
    for (const { data: N, fileName: O } of U.Media.Array) x.file(`word/media/${O}`, N);
    return x.generateAsync({
      type: i,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    });
  });
  return function(n) {
    return A.apply(this, arguments);
  };
})(), G0 = (A) => (0, Yn.js2xml)(A, { attributeValueFn: (i) => String(i).replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") }), qo = () => ({
  declaration: { attributes: {
    version: "1.0",
    encoding: "UTF-8",
    standalone: "yes"
  } },
  elements: [{
    type: "element",
    name: "Relationships",
    attributes: { xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" },
    elements: []
  }]
}), by = (function() {
  var A = Hs(function* ({ data: i }) {
    const n = i instanceof lr.default ? i : yield lr.default.loadAsync(i), c = /* @__PURE__ */ new Set();
    for (const [h, f] of Object.entries(n.files))
      !h.endsWith(".xml") && !h.endsWith(".rels") || h.startsWith("word/") && !h.endsWith(".xml.rels") && Eu(ti(yield f.async("text"))).forEach((a) => V0(a.text).forEach((o) => c.add(o)));
    return Array.from(c);
  });
  return function(n) {
    return A.apply(this, arguments);
  };
})(), V0 = (A) => {
  var i;
  const n = /* @__PURE__ */ new RegExp("(?<=\\{\\{).+?(?=\\}\\})", "gs");
  return (i = A.match(n)) !== null && i !== void 0 ? i : [];
}, W0 = /* @__PURE__ */ Sp(((A, i) => {
  (function(n, c) {
    typeof A == "object" && typeof i < "u" ? i.exports = c() : typeof define == "function" && define.amd ? define(c) : (n = typeof globalThis < "u" ? globalThis : n || self, n.html2canvas = c());
  })(A, (function() {
    "use strict";
    var n = function(t, e) {
      return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, r) {
        s.__proto__ = r;
      } || function(s, r) {
        for (var p in r) Object.prototype.hasOwnProperty.call(r, p) && (s[p] = r[p]);
      }, n(t, e);
    };
    function c(t, e) {
      if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
      n(t, e);
      function s() {
        this.constructor = t;
      }
      t.prototype = e === null ? Object.create(e) : (s.prototype = e.prototype, new s());
    }
    var h = function() {
      return h = Object.assign || function(e) {
        for (var s, r = 1, p = arguments.length; r < p; r++) {
          s = arguments[r];
          for (var S in s) Object.prototype.hasOwnProperty.call(s, S) && (e[S] = s[S]);
        }
        return e;
      }, h.apply(this, arguments);
    };
    function f(t, e, s, r) {
      function p(S) {
        return S instanceof s ? S : new s(function(K) {
          K(S);
        });
      }
      return new (s || (s = Promise))(function(S, K) {
        function W(oA) {
          try {
            nA(r.next(oA));
          } catch (cA) {
            K(cA);
          }
        }
        function X(oA) {
          try {
            nA(r.throw(oA));
          } catch (cA) {
            K(cA);
          }
        }
        function nA(oA) {
          oA.done ? S(oA.value) : p(oA.value).then(W, X);
        }
        nA((r = r.apply(t, e || [])).next());
      });
    }
    function a(t, e) {
      var s = {
        label: 0,
        sent: function() {
          if (S[0] & 1) throw S[1];
          return S[1];
        },
        trys: [],
        ops: []
      }, r, p, S, K;
      return K = {
        next: W(0),
        throw: W(1),
        return: W(2)
      }, typeof Symbol == "function" && (K[Symbol.iterator] = function() {
        return this;
      }), K;
      function W(nA) {
        return function(oA) {
          return X([nA, oA]);
        };
      }
      function X(nA) {
        if (r) throw new TypeError("Generator is already executing.");
        for (; s; ) try {
          if (r = 1, p && (S = nA[0] & 2 ? p.return : nA[0] ? p.throw || ((S = p.return) && S.call(p), 0) : p.next) && !(S = S.call(p, nA[1])).done) return S;
          switch (p = 0, S && (nA = [nA[0] & 2, S.value]), nA[0]) {
            case 0:
            case 1:
              S = nA;
              break;
            case 4:
              return s.label++, {
                value: nA[1],
                done: !1
              };
            case 5:
              s.label++, p = nA[1], nA = [0];
              continue;
            case 7:
              nA = s.ops.pop(), s.trys.pop();
              continue;
            default:
              if (S = s.trys, !(S = S.length > 0 && S[S.length - 1]) && (nA[0] === 6 || nA[0] === 2)) {
                s = 0;
                continue;
              }
              if (nA[0] === 3 && (!S || nA[1] > S[0] && nA[1] < S[3])) {
                s.label = nA[1];
                break;
              }
              if (nA[0] === 6 && s.label < S[1]) {
                s.label = S[1], S = nA;
                break;
              }
              if (S && s.label < S[2]) {
                s.label = S[2], s.ops.push(nA);
                break;
              }
              S[2] && s.ops.pop(), s.trys.pop();
              continue;
          }
          nA = e.call(t, s);
        } catch (oA) {
          nA = [6, oA], p = 0;
        } finally {
          r = S = 0;
        }
        if (nA[0] & 5) throw nA[1];
        return {
          value: nA[0] ? nA[1] : void 0,
          done: !0
        };
      }
    }
    function o(t, e, s) {
      if (s || arguments.length === 2)
        for (var r = 0, p = e.length, S; r < p; r++) (S || !(r in e)) && (S || (S = Array.prototype.slice.call(e, 0, r)), S[r] = e[r]);
      return t.concat(S || e);
    }
    for (var d = (function() {
      function t(e, s, r, p) {
        this.left = e, this.top = s, this.width = r, this.height = p;
      }
      return t.prototype.add = function(e, s, r, p) {
        return new t(this.left + e, this.top + s, this.width + r, this.height + p);
      }, t.fromClientRect = function(e, s) {
        return new t(s.left + e.windowBounds.left, s.top + e.windowBounds.top, s.width, s.height);
      }, t.fromDOMRectList = function(e, s) {
        var r = Array.from(s).find(function(p) {
          return p.width !== 0;
        });
        return r ? new t(r.left + e.windowBounds.left, r.top + e.windowBounds.top, r.width, r.height) : t.EMPTY;
      }, t.EMPTY = new t(0, 0, 0, 0), t;
    })(), U = function(t, e) {
      return d.fromClientRect(t, e.getBoundingClientRect());
    }, b = function(t) {
      var e = t.body, s = t.documentElement;
      if (!e || !s) throw new Error("Unable to get document size");
      return new d(0, 0, Math.max(Math.max(e.scrollWidth, s.scrollWidth), Math.max(e.offsetWidth, s.offsetWidth), Math.max(e.clientWidth, s.clientWidth)), Math.max(Math.max(e.scrollHeight, s.scrollHeight), Math.max(e.offsetHeight, s.offsetHeight), Math.max(e.clientHeight, s.clientHeight)));
    }, v = function(t) {
      for (var e = [], s = 0, r = t.length; s < r; ) {
        var p = t.charCodeAt(s++);
        if (p >= 55296 && p <= 56319 && s < r) {
          var S = t.charCodeAt(s++);
          (S & 64512) === 56320 ? e.push(((p & 1023) << 10) + (S & 1023) + 65536) : (e.push(p), s--);
        } else e.push(p);
      }
      return e;
    }, _ = function() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, t);
      var s = t.length;
      if (!s) return "";
      for (var r = [], p = -1, S = ""; ++p < s; ) {
        var K = t[p];
        K <= 65535 ? r.push(K) : (K -= 65536, r.push((K >> 10) + 55296, K % 1024 + 56320)), (p + 1 === s || r.length > 16384) && (S += String.fromCharCode.apply(String, r), r.length = 0);
      }
      return S;
    }, C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", m = typeof Uint8Array > "u" ? [] : new Uint8Array(256), w = 0; w < C.length; w++) m[C.charCodeAt(w)] = w;
    for (var I = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", T = typeof Uint8Array > "u" ? [] : new Uint8Array(256), x = 0; x < I.length; x++) T[I.charCodeAt(x)] = x;
    for (var N = function(t) {
      var e = t.length * 0.75, s = t.length, r, p = 0, S, K, W, X;
      t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
      var nA = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), oA = Array.isArray(nA) ? nA : new Uint8Array(nA);
      for (r = 0; r < s; r += 4)
        S = T[t.charCodeAt(r)], K = T[t.charCodeAt(r + 1)], W = T[t.charCodeAt(r + 2)], X = T[t.charCodeAt(r + 3)], oA[p++] = S << 2 | K >> 4, oA[p++] = (K & 15) << 4 | W >> 2, oA[p++] = (W & 3) << 6 | X & 63;
      return nA;
    }, O = function(t) {
      for (var e = t.length, s = [], r = 0; r < e; r += 2) s.push(t[r + 1] << 8 | t[r]);
      return s;
    }, F = function(t) {
      for (var e = t.length, s = [], r = 0; r < e; r += 4) s.push(t[r + 3] << 24 | t[r + 2] << 16 | t[r + 1] << 8 | t[r]);
      return s;
    }, g = 5, R = 11, V = 2, E = R - g, q = 65536 >> g, lA = (1 << g) - 1, k = q + (1024 >> g) + 32, Z = 65536 >> R, L = (1 << E) - 1, $ = function(t, e, s) {
      return t.slice ? t.slice(e, s) : new Uint16Array(Array.prototype.slice.call(t, e, s));
    }, uA = function(t, e, s) {
      return t.slice ? t.slice(e, s) : new Uint32Array(Array.prototype.slice.call(t, e, s));
    }, rA = function(t, e) {
      var s = N(t), r = Array.isArray(s) ? F(s) : new Uint32Array(s), p = Array.isArray(s) ? O(s) : new Uint16Array(s), S = 24, K = $(p, S / 2, r[4] / 2), W = r[5] === 2 ? $(p, (S + r[4]) / 2) : uA(r, Math.ceil((S + r[4]) / 4));
      return new vA(r[0], r[1], r[2], r[3], K, W);
    }, vA = (function() {
      function t(e, s, r, p, S, K) {
        this.initialValue = e, this.errorValue = s, this.highStart = r, this.highValueIndex = p, this.index = S, this.data = K;
      }
      return t.prototype.get = function(e) {
        var s;
        if (e >= 0) {
          if (e < 55296 || e > 56319 && e <= 65535)
            return s = this.index[e >> g], s = (s << V) + (e & lA), this.data[s];
          if (e <= 65535)
            return s = this.index[q + (e - 55296 >> g)], s = (s << V) + (e & lA), this.data[s];
          if (e < this.highStart)
            return s = k - Z + (e >> R), s = this.index[s], s += e >> g & L, s = this.index[s], s = (s << V) + (e & lA), this.data[s];
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, t;
    })(), sA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", dA = typeof Uint8Array > "u" ? [] : new Uint8Array(256), tA = 0; tA < sA.length; tA++) dA[sA.charCodeAt(tA)] = tA;
    var P = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", iA = 50, aA = 1, fA = 2, _A = 3, H = 4, y = 5, J = 7, z = 8, pA = 9, M = 10, G = 11, B = 12, eA = 13, D = 14, l = 15, u = 16, Q = 17, j = 18, AA = 19, Y = 20, gA = 21, yA = 22, BA = 23, QA = 24, xA = 25, RA = 26, Ae = 27, Be = 28, _e = 29, Ue = 30, te = 31, Je = 32, st = 33, be = 34, Vt = 35, mr = 36, Qt = 37, vr = 38, Ut = 39, Oe = 40, at = 41, Os = 42, Lu = 43, Du = [9001, 65288], Ns = "!", GA = "×", Yr = "÷", si = rA(P), Ye = [Ue, mr], ai = [
      aA,
      fA,
      _A,
      y
    ], ks = [M, z], Ks = [Ae, RA], Ru = ai.concat(ks), Ms = [
      vr,
      Ut,
      Oe,
      be,
      Vt
    ], Ou = [l, eA], Nu = function(t, e) {
      e === void 0 && (e = "strict");
      var s = [], r = [], p = [];
      return t.forEach(function(S, K) {
        var W = si.get(S);
        if (W > iA ? (p.push(!0), W -= iA) : p.push(!1), [
          "normal",
          "auto",
          "loose"
        ].indexOf(e) !== -1 && [
          8208,
          8211,
          12316,
          12448
        ].indexOf(S) !== -1)
          return r.push(K), s.push(u);
        if (W === H || W === G) {
          if (K === 0)
            return r.push(K), s.push(Ue);
          var X = s[K - 1];
          return Ru.indexOf(X) === -1 ? (r.push(r[K - 1]), s.push(X)) : (r.push(K), s.push(Ue));
        }
        if (r.push(K), W === te) return s.push(e === "strict" ? gA : Qt);
        if (W === Os || W === _e) return s.push(Ue);
        if (W === Lu) return S >= 131072 && S <= 196605 || S >= 196608 && S <= 262141 ? s.push(Qt) : s.push(Ue);
        s.push(W);
      }), [
        r,
        s,
        p
      ];
    }, oi = function(t, e, s, r) {
      var p = r[s];
      if (Array.isArray(t) ? t.indexOf(p) !== -1 : t === p)
        for (var S = s; S <= r.length; ) {
          S++;
          var K = r[S];
          if (K === e) return !0;
          if (K !== M) break;
        }
      if (p === M)
        for (var S = s; S > 0; ) {
          S--;
          var W = r[S];
          if (Array.isArray(t) ? t.indexOf(W) !== -1 : t === W)
            for (var X = s; X <= r.length; ) {
              X++;
              var K = r[X];
              if (K === e) return !0;
              if (K !== M) break;
            }
          if (W !== M) break;
        }
      return !1;
    }, Ps = function(t, e) {
      for (var s = t; s >= 0; ) {
        var r = e[s];
        if (r === M) s--;
        else return r;
      }
      return 0;
    }, ku = function(t, e, s, r, p) {
      if (s[r] === 0) return GA;
      var S = r - 1;
      if (Array.isArray(p) && p[S] === !0) return GA;
      var K = S - 1, W = S + 1, X = e[S], nA = K >= 0 ? e[K] : 0, oA = e[W];
      if (X === fA && oA === _A) return GA;
      if (ai.indexOf(X) !== -1) return Ns;
      if (ai.indexOf(oA) !== -1 || ks.indexOf(oA) !== -1) return GA;
      if (Ps(S, e) === z) return Yr;
      if (si.get(t[S]) === G || (X === Je || X === st) && si.get(t[W]) === G || X === J || oA === J || X === pA || [
        M,
        eA,
        l
      ].indexOf(X) === -1 && oA === pA || [
        Q,
        j,
        AA,
        QA,
        Be
      ].indexOf(oA) !== -1 || Ps(S, e) === yA || oi(BA, yA, S, e) || oi([Q, j], gA, S, e) || oi(B, B, S, e)) return GA;
      if (X === M) return Yr;
      if (X === BA || oA === BA) return GA;
      if (oA === u || X === u) return Yr;
      if ([
        eA,
        l,
        gA
      ].indexOf(oA) !== -1 || X === D || nA === mr && Ou.indexOf(X) !== -1 || X === Be && oA === mr || oA === Y || Ye.indexOf(oA) !== -1 && X === xA || Ye.indexOf(X) !== -1 && oA === xA || X === Ae && [
        Qt,
        Je,
        st
      ].indexOf(oA) !== -1 || [
        Qt,
        Je,
        st
      ].indexOf(X) !== -1 && oA === RA || Ye.indexOf(X) !== -1 && Ks.indexOf(oA) !== -1 || Ks.indexOf(X) !== -1 && Ye.indexOf(oA) !== -1 || [Ae, RA].indexOf(X) !== -1 && (oA === xA || [yA, l].indexOf(oA) !== -1 && e[W + 1] === xA) || [yA, l].indexOf(X) !== -1 && oA === xA || X === xA && [
        xA,
        Be,
        QA
      ].indexOf(oA) !== -1) return GA;
      if ([
        xA,
        Be,
        QA,
        Q,
        j
      ].indexOf(oA) !== -1)
        for (var cA = S; cA >= 0; ) {
          var wA = e[cA];
          if (wA === xA) return GA;
          if ([Be, QA].indexOf(wA) !== -1) cA--;
          else break;
        }
      if ([Ae, RA].indexOf(oA) !== -1)
        for (var cA = [Q, j].indexOf(X) !== -1 ? K : S; cA >= 0; ) {
          var wA = e[cA];
          if (wA === xA) return GA;
          if ([Be, QA].indexOf(wA) !== -1) cA--;
          else break;
        }
      if (vr === X && [
        vr,
        Ut,
        be,
        Vt
      ].indexOf(oA) !== -1 || [Ut, be].indexOf(X) !== -1 && [Ut, Oe].indexOf(oA) !== -1 || [Oe, Vt].indexOf(X) !== -1 && oA === Oe || Ms.indexOf(X) !== -1 && [Y, RA].indexOf(oA) !== -1 || Ms.indexOf(oA) !== -1 && X === Ae || Ye.indexOf(X) !== -1 && Ye.indexOf(oA) !== -1 || X === QA && Ye.indexOf(oA) !== -1 || Ye.concat(xA).indexOf(X) !== -1 && oA === yA && Du.indexOf(t[W]) === -1 || Ye.concat(xA).indexOf(oA) !== -1 && X === j) return GA;
      if (X === at && oA === at) {
        for (var TA = s[S], EA = 1; TA > 0 && (TA--, e[TA] === at); )
          EA++;
        if (EA % 2 !== 0) return GA;
      }
      return X === Je && oA === st ? GA : Yr;
    }, Ku = function(t, e) {
      e || (e = {
        lineBreak: "normal",
        wordBreak: "normal"
      });
      var s = Nu(t, e.lineBreak), r = s[0], p = s[1], S = s[2];
      (e.wordBreak === "break-all" || e.wordBreak === "break-word") && (p = p.map(function(W) {
        return [
          xA,
          Ue,
          Os
        ].indexOf(W) !== -1 ? Qt : W;
      }));
      var K = e.wordBreak === "keep-all" ? S.map(function(W, X) {
        return W && t[X] >= 19968 && t[X] <= 40959;
      }) : void 0;
      return [
        r,
        p,
        K
      ];
    }, Mu = (function() {
      function t(e, s, r, p) {
        this.codePoints = e, this.required = s === Ns, this.start = r, this.end = p;
      }
      return t.prototype.slice = function() {
        return _.apply(void 0, this.codePoints.slice(this.start, this.end));
      }, t;
    })(), Pu = function(t, e) {
      var s = v(t), r = Ku(s, e), p = r[0], S = r[1], K = r[2], W = s.length, X = 0, nA = 0;
      return { next: function() {
        if (nA >= W) return {
          done: !0,
          value: null
        };
        for (var oA = GA; nA < W && (oA = ku(s, S, p, ++nA, K)) === GA; ) ;
        if (oA !== GA || nA === W) {
          var cA = new Mu(s, oA, X, nA);
          return X = nA, {
            value: cA,
            done: !1
          };
        }
        return {
          done: !0,
          value: null
        };
      } };
    }, Gu = 1, Vu = 2, yr = 4, Gs = 8, Zr = 10, Vs = 47, Cr = 92, Wu = 9, Xu = 32, qr = 34, Fr = 61, ju = 35, zu = 36, Ju = 37, $r = 39, An = 40, Er = 41, Yu = 95, ve = 45, Zu = 33, qu = 60, $u = 62, Ac = 64, ec = 91, tc = 93, rc = 61, nc = 123, en = 63, ic = 125, Ws = 124, sc = 126, ac = 128, Xs = 65533, li = 42, bt = 43, oc = 44, lc = 58, uc = 59, Qr = 46, cc = 0, hc = 8, fc = 11, dc = 14, pc = 31, gc = 127, Ne = -1, js = 48, zs = 97, Js = 101, wc = 102, Bc = 117, mc = 122, Ys = 65, Zs = 69, qs = 70, vc = 85, yc = 90, we = function(t) {
      return t >= js && t <= 57;
    }, Cc = function(t) {
      return t >= 55296 && t <= 57343;
    }, Wt = function(t) {
      return we(t) || t >= Ys && t <= qs || t >= zs && t <= wc;
    }, Fc = function(t) {
      return t >= zs && t <= mc;
    }, Ec = function(t) {
      return t >= Ys && t <= yc;
    }, Qc = function(t) {
      return Fc(t) || Ec(t);
    }, Uc = function(t) {
      return t >= ac;
    }, tn = function(t) {
      return t === Zr || t === Wu || t === Xu;
    }, rn = function(t) {
      return Qc(t) || Uc(t) || t === Yu;
    }, $s = function(t) {
      return rn(t) || we(t) || t === ve;
    }, bc = function(t) {
      return t >= cc && t <= hc || t === fc || t >= dc && t <= pc || t === gc;
    }, ot = function(t, e) {
      return t !== Cr ? !1 : e !== Zr;
    }, nn = function(t, e, s) {
      return t === ve ? rn(e) || ot(e, s) : rn(t) ? !0 : !!(t === Cr && ot(t, e));
    }, ui = function(t, e, s) {
      return t === bt || t === ve ? we(e) ? !0 : e === Qr && we(s) : we(t === Qr ? e : t);
    }, Ic = function(t) {
      var e = 0, s = 1;
      (t[e] === bt || t[e] === ve) && (t[e] === ve && (s = -1), e++);
      for (var r = []; we(t[e]); ) r.push(t[e++]);
      var p = r.length ? parseInt(_.apply(void 0, r), 10) : 0;
      t[e] === Qr && e++;
      for (var S = []; we(t[e]); ) S.push(t[e++]);
      var K = S.length, W = K ? parseInt(_.apply(void 0, S), 10) : 0;
      (t[e] === Zs || t[e] === Js) && e++;
      var X = 1;
      (t[e] === bt || t[e] === ve) && (t[e] === ve && (X = -1), e++);
      for (var nA = []; we(t[e]); ) nA.push(t[e++]);
      var oA = nA.length ? parseInt(_.apply(void 0, nA), 10) : 0;
      return s * (p + W * Math.pow(10, -K)) * Math.pow(10, X * oA);
    }, _c = { type: 2 }, xc = { type: 3 }, Tc = { type: 4 }, Sc = { type: 13 }, Hc = { type: 8 }, Lc = { type: 21 }, Dc = { type: 9 }, Rc = { type: 10 }, Oc = { type: 11 }, Nc = { type: 12 }, kc = { type: 14 }, sn = { type: 23 }, Kc = { type: 1 }, Mc = { type: 25 }, Pc = { type: 24 }, Gc = { type: 26 }, Vc = { type: 27 }, Wc = { type: 28 }, Xc = { type: 29 }, jc = { type: 31 }, ci = { type: 32 }, Aa = (function() {
      function t() {
        this._value = [];
      }
      return t.prototype.write = function(e) {
        this._value = this._value.concat(v(e));
      }, t.prototype.read = function() {
        for (var e = [], s = this.consumeToken(); s !== ci; )
          e.push(s), s = this.consumeToken();
        return e;
      }, t.prototype.consumeToken = function() {
        var e = this.consumeCodePoint();
        switch (e) {
          case qr:
            return this.consumeStringToken(qr);
          case ju:
            var s = this.peekCodePoint(0), r = this.peekCodePoint(1), p = this.peekCodePoint(2);
            if ($s(s) || ot(r, p)) {
              var S = nn(s, r, p) ? Vu : Gu, K = this.consumeName();
              return {
                type: 5,
                value: K,
                flags: S
              };
            }
            break;
          case zu:
            if (this.peekCodePoint(0) === Fr)
              return this.consumeCodePoint(), Sc;
            break;
          case $r:
            return this.consumeStringToken($r);
          case An:
            return _c;
          case Er:
            return xc;
          case li:
            if (this.peekCodePoint(0) === Fr)
              return this.consumeCodePoint(), kc;
            break;
          case bt:
            if (ui(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case oc:
            return Tc;
          case ve:
            var W = e, X = this.peekCodePoint(0), nA = this.peekCodePoint(1);
            if (ui(W, X, nA))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            if (nn(W, X, nA))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            if (X === ve && nA === $u)
              return this.consumeCodePoint(), this.consumeCodePoint(), Pc;
            break;
          case Qr:
            if (ui(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case Vs:
            if (this.peekCodePoint(0) === li)
              for (this.consumeCodePoint(); ; ) {
                var oA = this.consumeCodePoint();
                if (oA === li && (oA = this.consumeCodePoint(), oA === Vs))
                  return this.consumeToken();
                if (oA === Ne) return this.consumeToken();
              }
            break;
          case lc:
            return Gc;
          case uc:
            return Vc;
          case qu:
            if (this.peekCodePoint(0) === Zu && this.peekCodePoint(1) === ve && this.peekCodePoint(2) === ve)
              return this.consumeCodePoint(), this.consumeCodePoint(), Mc;
            break;
          case Ac:
            if (nn(this.peekCodePoint(0), this.peekCodePoint(1), this.peekCodePoint(2))) {
              var K = this.consumeName();
              return {
                type: 7,
                value: K
              };
            }
            break;
          case ec:
            return Wc;
          case Cr:
            if (ot(e, this.peekCodePoint(0)))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            break;
          case tc:
            return Xc;
          case rc:
            if (this.peekCodePoint(0) === Fr)
              return this.consumeCodePoint(), Hc;
            break;
          case nc:
            return Oc;
          case ic:
            return Nc;
          case Bc:
          case vc:
            var cA = this.peekCodePoint(0), wA = this.peekCodePoint(1);
            return cA === bt && (Wt(wA) || wA === en) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          case Ws:
            if (this.peekCodePoint(0) === Fr)
              return this.consumeCodePoint(), Dc;
            if (this.peekCodePoint(0) === Ws)
              return this.consumeCodePoint(), Lc;
            break;
          case sc:
            if (this.peekCodePoint(0) === Fr)
              return this.consumeCodePoint(), Rc;
            break;
          case Ne:
            return ci;
        }
        return tn(e) ? (this.consumeWhiteSpace(), jc) : we(e) ? (this.reconsumeCodePoint(e), this.consumeNumericToken()) : rn(e) ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken()) : {
          type: 6,
          value: _(e)
        };
      }, t.prototype.consumeCodePoint = function() {
        var e = this._value.shift();
        return typeof e > "u" ? -1 : e;
      }, t.prototype.reconsumeCodePoint = function(e) {
        this._value.unshift(e);
      }, t.prototype.peekCodePoint = function(e) {
        return e >= this._value.length ? -1 : this._value[e];
      }, t.prototype.consumeUnicodeRangeToken = function() {
        for (var e = [], s = this.consumeCodePoint(); Wt(s) && e.length < 6; )
          e.push(s), s = this.consumeCodePoint();
        for (var r = !1; s === en && e.length < 6; )
          e.push(s), s = this.consumeCodePoint(), r = !0;
        if (r) {
          var p = parseInt(_.apply(void 0, e.map(function(X) {
            return X === en ? js : X;
          })), 16), S = parseInt(_.apply(void 0, e.map(function(X) {
            return X === en ? qs : X;
          })), 16);
          return {
            type: 30,
            start: p,
            end: S
          };
        }
        var K = parseInt(_.apply(void 0, e), 16);
        if (this.peekCodePoint(0) === ve && Wt(this.peekCodePoint(1))) {
          this.consumeCodePoint(), s = this.consumeCodePoint();
          for (var W = []; Wt(s) && W.length < 6; )
            W.push(s), s = this.consumeCodePoint();
          var S = parseInt(_.apply(void 0, W), 16);
          return {
            type: 30,
            start: K,
            end: S
          };
        } else return {
          type: 30,
          start: K,
          end: K
        };
      }, t.prototype.consumeIdentLikeToken = function() {
        var e = this.consumeName();
        return e.toLowerCase() === "url" && this.peekCodePoint(0) === An ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === An ? (this.consumeCodePoint(), {
          type: 19,
          value: e
        }) : {
          type: 20,
          value: e
        };
      }, t.prototype.consumeUrlToken = function() {
        var e = [];
        if (this.consumeWhiteSpace(), this.peekCodePoint(0) === Ne) return {
          type: 22,
          value: ""
        };
        var s = this.peekCodePoint(0);
        if (s === $r || s === qr) {
          var r = this.consumeStringToken(this.consumeCodePoint());
          return r.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === Ne || this.peekCodePoint(0) === Er) ? (this.consumeCodePoint(), {
            type: 22,
            value: r.value
          }) : (this.consumeBadUrlRemnants(), sn);
        }
        for (; ; ) {
          var p = this.consumeCodePoint();
          if (p === Ne || p === Er) return {
            type: 22,
            value: _.apply(void 0, e)
          };
          if (tn(p))
            return this.consumeWhiteSpace(), this.peekCodePoint(0) === Ne || this.peekCodePoint(0) === Er ? (this.consumeCodePoint(), {
              type: 22,
              value: _.apply(void 0, e)
            }) : (this.consumeBadUrlRemnants(), sn);
          if (p === qr || p === $r || p === An || bc(p))
            return this.consumeBadUrlRemnants(), sn;
          if (p === Cr) if (ot(p, this.peekCodePoint(0))) e.push(this.consumeEscapedCodePoint());
          else
            return this.consumeBadUrlRemnants(), sn;
          else e.push(p);
        }
      }, t.prototype.consumeWhiteSpace = function() {
        for (; tn(this.peekCodePoint(0)); ) this.consumeCodePoint();
      }, t.prototype.consumeBadUrlRemnants = function() {
        for (; ; ) {
          var e = this.consumeCodePoint();
          if (e === Er || e === Ne) return;
          ot(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
        }
      }, t.prototype.consumeStringSlice = function(e) {
        for (var s = 5e4, r = ""; e > 0; ) {
          var p = Math.min(s, e);
          r += _.apply(void 0, this._value.splice(0, p)), e -= p;
        }
        return this._value.shift(), r;
      }, t.prototype.consumeStringToken = function(e) {
        var s = "", r = 0;
        do {
          var p = this._value[r];
          if (p === Ne || p === void 0 || p === e)
            return s += this.consumeStringSlice(r), {
              type: 0,
              value: s
            };
          if (p === Zr)
            return this._value.splice(0, r), Kc;
          if (p === Cr) {
            var S = this._value[r + 1];
            S !== Ne && S !== void 0 && (S === Zr ? (s += this.consumeStringSlice(r), r = -1, this._value.shift()) : ot(p, S) && (s += this.consumeStringSlice(r), s += _(this.consumeEscapedCodePoint()), r = -1));
          }
          r++;
        } while (!0);
      }, t.prototype.consumeNumber = function() {
        var e = [], s = yr, r = this.peekCodePoint(0);
        for ((r === bt || r === ve) && e.push(this.consumeCodePoint()); we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        r = this.peekCodePoint(0);
        var p = this.peekCodePoint(1);
        if (r === Qr && we(p))
          for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), s = Gs; we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        r = this.peekCodePoint(0), p = this.peekCodePoint(1);
        var S = this.peekCodePoint(2);
        if ((r === Zs || r === Js) && ((p === bt || p === ve) && we(S) || we(p)))
          for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), s = Gs; we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        return [Ic(e), s];
      }, t.prototype.consumeNumericToken = function() {
        var e = this.consumeNumber(), s = e[0], r = e[1], p = this.peekCodePoint(0);
        return nn(p, this.peekCodePoint(1), this.peekCodePoint(2)) ? {
          type: 15,
          number: s,
          flags: r,
          unit: this.consumeName()
        } : p === Ju ? (this.consumeCodePoint(), {
          type: 16,
          number: s,
          flags: r
        }) : {
          type: 17,
          number: s,
          flags: r
        };
      }, t.prototype.consumeEscapedCodePoint = function() {
        var e = this.consumeCodePoint();
        if (Wt(e)) {
          for (var s = _(e); Wt(this.peekCodePoint(0)) && s.length < 6; ) s += _(this.consumeCodePoint());
          tn(this.peekCodePoint(0)) && this.consumeCodePoint();
          var r = parseInt(s, 16);
          return r === 0 || Cc(r) || r > 1114111 ? Xs : r;
        }
        return e === Ne ? Xs : e;
      }, t.prototype.consumeName = function() {
        for (var e = ""; ; ) {
          var s = this.consumeCodePoint();
          if ($s(s)) e += _(s);
          else if (ot(s, this.peekCodePoint(0))) e += _(this.consumeEscapedCodePoint());
          else
            return this.reconsumeCodePoint(s), e;
        }
      }, t;
    })(), ea = (function() {
      function t(e) {
        this._tokens = e;
      }
      return t.create = function(e) {
        var s = new Aa();
        return s.write(e), new t(s.read());
      }, t.parseValue = function(e) {
        return t.create(e).parseComponentValue();
      }, t.parseValues = function(e) {
        return t.create(e).parseComponentValues();
      }, t.prototype.parseComponentValue = function() {
        for (var e = this.consumeToken(); e.type === 31; ) e = this.consumeToken();
        if (e.type === 32) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        this.reconsumeToken(e);
        var s = this.consumeComponentValue();
        do
          e = this.consumeToken();
        while (e.type === 31);
        if (e.type === 32) return s;
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      }, t.prototype.parseComponentValues = function() {
        for (var e = []; ; ) {
          var s = this.consumeComponentValue();
          if (s.type === 32) return e;
          e.push(s), e.push();
        }
      }, t.prototype.consumeComponentValue = function() {
        var e = this.consumeToken();
        switch (e.type) {
          case 11:
          case 28:
          case 2:
            return this.consumeSimpleBlock(e.type);
          case 19:
            return this.consumeFunction(e);
        }
        return e;
      }, t.prototype.consumeSimpleBlock = function(e) {
        for (var s = {
          type: e,
          values: []
        }, r = this.consumeToken(); ; ) {
          if (r.type === 32 || Jc(r, e)) return s;
          this.reconsumeToken(r), s.values.push(this.consumeComponentValue()), r = this.consumeToken();
        }
      }, t.prototype.consumeFunction = function(e) {
        for (var s = {
          name: e.value,
          values: [],
          type: 18
        }; ; ) {
          var r = this.consumeToken();
          if (r.type === 32 || r.type === 3) return s;
          this.reconsumeToken(r), s.values.push(this.consumeComponentValue());
        }
      }, t.prototype.consumeToken = function() {
        var e = this._tokens.shift();
        return typeof e > "u" ? ci : e;
      }, t.prototype.reconsumeToken = function(e) {
        this._tokens.unshift(e);
      }, t;
    })(), Ur = function(t) {
      return t.type === 15;
    }, Xt = function(t) {
      return t.type === 17;
    }, JA = function(t) {
      return t.type === 20;
    }, zc = function(t) {
      return t.type === 0;
    }, hi = function(t, e) {
      return JA(t) && t.value === e;
    }, ta = function(t) {
      return t.type !== 31;
    }, jt = function(t) {
      return t.type !== 31 && t.type !== 4;
    }, ke = function(t) {
      var e = [], s = [];
      return t.forEach(function(r) {
        if (r.type === 4) {
          if (s.length === 0) throw new Error("Error parsing function args, zero tokens for arg");
          e.push(s), s = [];
          return;
        }
        r.type !== 31 && s.push(r);
      }), s.length && e.push(s), e;
    }, Jc = function(t, e) {
      return e === 11 && t.type === 12 || e === 28 && t.type === 29 ? !0 : e === 2 && t.type === 3;
    }, lt = function(t) {
      return t.type === 17 || t.type === 15;
    }, se = function(t) {
      return t.type === 16 || lt(t);
    }, ra = function(t) {
      return t.length > 1 ? [t[0], t[1]] : [t[0]];
    }, ue = {
      type: 17,
      number: 0,
      flags: yr
    }, fi = {
      type: 16,
      number: 50,
      flags: yr
    }, ut = {
      type: 16,
      number: 100,
      flags: yr
    }, br = function(t, e, s) {
      var r = t[0], p = t[1];
      return [qA(r, e), qA(typeof p < "u" ? p : r, s)];
    }, qA = function(t, e) {
      if (t.type === 16) return t.number / 100 * e;
      if (Ur(t)) switch (t.unit) {
        case "rem":
        case "em":
          return 16 * t.number;
        default:
          return t.number;
      }
      return t.number;
    }, na = "deg", ia = "grad", sa = "rad", aa = "turn", an = {
      name: "angle",
      parse: function(t, e) {
        if (e.type === 15) switch (e.unit) {
          case na:
            return Math.PI * e.number / 180;
          case ia:
            return Math.PI / 200 * e.number;
          case sa:
            return e.number;
          case aa:
            return Math.PI * 2 * e.number;
        }
        throw new Error("Unsupported angle type");
      }
    }, oa = function(t) {
      return t.type === 15 && (t.unit === na || t.unit === ia || t.unit === sa || t.unit === aa);
    }, la = function(t) {
      switch (t.filter(JA).map(function(e) {
        return e.value;
      }).join(" ")) {
        case "to bottom right":
        case "to right bottom":
        case "left top":
        case "top left":
          return [ue, ue];
        case "to top":
        case "bottom":
          return xe(0);
        case "to bottom left":
        case "to left bottom":
        case "right top":
        case "top right":
          return [ue, ut];
        case "to right":
        case "left":
          return xe(90);
        case "to top left":
        case "to left top":
        case "right bottom":
        case "bottom right":
          return [ut, ut];
        case "to bottom":
        case "top":
          return xe(180);
        case "to top right":
        case "to right top":
        case "left bottom":
        case "bottom left":
          return [ut, ue];
        case "to left":
        case "right":
          return xe(270);
      }
      return 0;
    }, xe = function(t) {
      return Math.PI * t / 180;
    }, ct = {
      name: "color",
      parse: function(t, e) {
        if (e.type === 18) {
          var s = Yc[e.name];
          if (typeof s > "u") throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
          return s(t, e.values);
        }
        if (e.type === 5) {
          if (e.value.length === 3) {
            var r = e.value.substring(0, 1), p = e.value.substring(1, 2), S = e.value.substring(2, 3);
            return ft(parseInt(r + r, 16), parseInt(p + p, 16), parseInt(S + S, 16), 1);
          }
          if (e.value.length === 4) {
            var r = e.value.substring(0, 1), p = e.value.substring(1, 2), S = e.value.substring(2, 3), K = e.value.substring(3, 4);
            return ft(parseInt(r + r, 16), parseInt(p + p, 16), parseInt(S + S, 16), parseInt(K + K, 16) / 255);
          }
          if (e.value.length === 6) {
            var r = e.value.substring(0, 2), p = e.value.substring(2, 4), S = e.value.substring(4, 6);
            return ft(parseInt(r, 16), parseInt(p, 16), parseInt(S, 16), 1);
          }
          if (e.value.length === 8) {
            var r = e.value.substring(0, 2), p = e.value.substring(2, 4), S = e.value.substring(4, 6), K = e.value.substring(6, 8);
            return ft(parseInt(r, 16), parseInt(p, 16), parseInt(S, 16), parseInt(K, 16) / 255);
          }
        }
        if (e.type === 20) {
          var W = Ze[e.value.toUpperCase()];
          if (typeof W < "u") return W;
        }
        return Ze.TRANSPARENT;
      }
    }, ht = function(t) {
      return (255 & t) === 0;
    }, le = function(t) {
      var e = 255 & t, s = 255 & t >> 8, r = 255 & t >> 16, p = 255 & t >> 24;
      return e < 255 ? "rgba(" + p + "," + r + "," + s + "," + e / 255 + ")" : "rgb(" + p + "," + r + "," + s + ")";
    }, ft = function(t, e, s, r) {
      return (t << 24 | e << 16 | s << 8 | Math.round(r * 255) << 0) >>> 0;
    }, ua = function(t, e) {
      if (t.type === 17) return t.number;
      if (t.type === 16) {
        var s = e === 3 ? 1 : 255;
        return e === 3 ? t.number / 100 * s : Math.round(t.number / 100 * s);
      }
      return 0;
    }, ca = function(t, e) {
      var s = e.filter(jt);
      if (s.length === 3) {
        var r = s.map(ua), p = r[0], S = r[1], K = r[2];
        return ft(p, S, K, 1);
      }
      if (s.length === 4) {
        var W = s.map(ua), p = W[0], S = W[1], K = W[2], X = W[3];
        return ft(p, S, K, X);
      }
      return 0;
    };
    function di(t, e, s) {
      return s < 0 && (s += 1), s >= 1 && (s -= 1), s < 1 / 6 ? (e - t) * s * 6 + t : s < 1 / 2 ? e : s < 2 / 3 ? (e - t) * 6 * (2 / 3 - s) + t : t;
    }
    var ha = function(t, e) {
      var s = e.filter(jt), r = s[0], p = s[1], S = s[2], K = s[3], W = (r.type === 17 ? xe(r.number) : an.parse(t, r)) / (Math.PI * 2), X = se(p) ? p.number / 100 : 0, nA = se(S) ? S.number / 100 : 0, oA = typeof K < "u" && se(K) ? qA(K, 1) : 1;
      if (X === 0) return ft(nA * 255, nA * 255, nA * 255, 1);
      var cA = nA <= 0.5 ? nA * (X + 1) : nA + X - nA * X, wA = nA * 2 - cA, TA = di(wA, cA, W + 1 / 3), EA = di(wA, cA, W), IA = di(wA, cA, W - 1 / 3);
      return ft(TA * 255, EA * 255, IA * 255, oA);
    }, Yc = {
      hsl: ha,
      hsla: ha,
      rgb: ca,
      rgba: ca
    }, Ir = function(t, e) {
      return ct.parse(t, ea.create(e).parseComponentValue());
    }, Ze = {
      ALICEBLUE: 4042850303,
      ANTIQUEWHITE: 4209760255,
      AQUA: 16777215,
      AQUAMARINE: 2147472639,
      AZURE: 4043309055,
      BEIGE: 4126530815,
      BISQUE: 4293182719,
      BLACK: 255,
      BLANCHEDALMOND: 4293643775,
      BLUE: 65535,
      BLUEVIOLET: 2318131967,
      BROWN: 2771004159,
      BURLYWOOD: 3736635391,
      CADETBLUE: 1604231423,
      CHARTREUSE: 2147418367,
      CHOCOLATE: 3530104575,
      CORAL: 4286533887,
      CORNFLOWERBLUE: 1687547391,
      CORNSILK: 4294499583,
      CRIMSON: 3692313855,
      CYAN: 16777215,
      DARKBLUE: 35839,
      DARKCYAN: 9145343,
      DARKGOLDENROD: 3095837695,
      DARKGRAY: 2846468607,
      DARKGREEN: 6553855,
      DARKGREY: 2846468607,
      DARKKHAKI: 3182914559,
      DARKMAGENTA: 2332068863,
      DARKOLIVEGREEN: 1433087999,
      DARKORANGE: 4287365375,
      DARKORCHID: 2570243327,
      DARKRED: 2332033279,
      DARKSALMON: 3918953215,
      DARKSEAGREEN: 2411499519,
      DARKSLATEBLUE: 1211993087,
      DARKSLATEGRAY: 793726975,
      DARKSLATEGREY: 793726975,
      DARKTURQUOISE: 13554175,
      DARKVIOLET: 2483082239,
      DEEPPINK: 4279538687,
      DEEPSKYBLUE: 12582911,
      DIMGRAY: 1768516095,
      DIMGREY: 1768516095,
      DODGERBLUE: 512819199,
      FIREBRICK: 2988581631,
      FLORALWHITE: 4294635775,
      FORESTGREEN: 579543807,
      FUCHSIA: 4278255615,
      GAINSBORO: 3705462015,
      GHOSTWHITE: 4177068031,
      GOLD: 4292280575,
      GOLDENROD: 3668254975,
      GRAY: 2155905279,
      GREEN: 8388863,
      GREENYELLOW: 2919182335,
      GREY: 2155905279,
      HONEYDEW: 4043305215,
      HOTPINK: 4285117695,
      INDIANRED: 3445382399,
      INDIGO: 1258324735,
      IVORY: 4294963455,
      KHAKI: 4041641215,
      LAVENDER: 3873897215,
      LAVENDERBLUSH: 4293981695,
      LAWNGREEN: 2096890111,
      LEMONCHIFFON: 4294626815,
      LIGHTBLUE: 2916673279,
      LIGHTCORAL: 4034953471,
      LIGHTCYAN: 3774873599,
      LIGHTGOLDENRODYELLOW: 4210742015,
      LIGHTGRAY: 3553874943,
      LIGHTGREEN: 2431553791,
      LIGHTGREY: 3553874943,
      LIGHTPINK: 4290167295,
      LIGHTSALMON: 4288707327,
      LIGHTSEAGREEN: 548580095,
      LIGHTSKYBLUE: 2278488831,
      LIGHTSLATEGRAY: 2005441023,
      LIGHTSLATEGREY: 2005441023,
      LIGHTSTEELBLUE: 2965692159,
      LIGHTYELLOW: 4294959359,
      LIME: 16711935,
      LIMEGREEN: 852308735,
      LINEN: 4210091775,
      MAGENTA: 4278255615,
      MAROON: 2147483903,
      MEDIUMAQUAMARINE: 1724754687,
      MEDIUMBLUE: 52735,
      MEDIUMORCHID: 3126187007,
      MEDIUMPURPLE: 2473647103,
      MEDIUMSEAGREEN: 1018393087,
      MEDIUMSLATEBLUE: 2070474495,
      MEDIUMSPRINGGREEN: 16423679,
      MEDIUMTURQUOISE: 1221709055,
      MEDIUMVIOLETRED: 3340076543,
      MIDNIGHTBLUE: 421097727,
      MINTCREAM: 4127193855,
      MISTYROSE: 4293190143,
      MOCCASIN: 4293178879,
      NAVAJOWHITE: 4292783615,
      NAVY: 33023,
      OLDLACE: 4260751103,
      OLIVE: 2155872511,
      OLIVEDRAB: 1804477439,
      ORANGE: 4289003775,
      ORANGERED: 4282712319,
      ORCHID: 3664828159,
      PALEGOLDENROD: 4008225535,
      PALEGREEN: 2566625535,
      PALETURQUOISE: 2951671551,
      PALEVIOLETRED: 3681588223,
      PAPAYAWHIP: 4293907967,
      PEACHPUFF: 4292524543,
      PERU: 3448061951,
      PINK: 4290825215,
      PLUM: 3718307327,
      POWDERBLUE: 2967529215,
      PURPLE: 2147516671,
      REBECCAPURPLE: 1714657791,
      RED: 4278190335,
      ROSYBROWN: 3163525119,
      ROYALBLUE: 1097458175,
      SADDLEBROWN: 2336560127,
      SALMON: 4202722047,
      SANDYBROWN: 4104413439,
      SEAGREEN: 780883967,
      SEASHELL: 4294307583,
      SIENNA: 2689740287,
      SILVER: 3233857791,
      SKYBLUE: 2278484991,
      SLATEBLUE: 1784335871,
      SLATEGRAY: 1887473919,
      SLATEGREY: 1887473919,
      SNOW: 4294638335,
      SPRINGGREEN: 16744447,
      STEELBLUE: 1182971135,
      TAN: 3535047935,
      TEAL: 8421631,
      THISTLE: 3636451583,
      TOMATO: 4284696575,
      TRANSPARENT: 0,
      TURQUOISE: 1088475391,
      VIOLET: 4001558271,
      WHEAT: 4125012991,
      WHITE: 4294967295,
      WHITESMOKE: 4126537215,
      YELLOW: 4294902015,
      YELLOWGREEN: 2597139199
    }, Zc = {
      name: "background-clip",
      initialValue: "border-box",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.map(function(s) {
          if (JA(s)) switch (s.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, qc = {
      name: "background-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, on = function(t, e) {
      var s = ct.parse(t, e[0]), r = e[1];
      return r && se(r) ? {
        color: s,
        stop: r
      } : {
        color: s,
        stop: null
      };
    }, fa = function(t, e) {
      var s = t[0], r = t[t.length - 1];
      s.stop === null && (s.stop = ue), r.stop === null && (r.stop = ut);
      for (var p = [], S = 0, K = 0; K < t.length; K++) {
        var W = t[K].stop;
        if (W !== null) {
          var X = qA(W, e);
          X > S ? p.push(X) : p.push(S), S = X;
        } else p.push(null);
      }
      for (var nA = null, K = 0; K < p.length; K++) {
        var oA = p[K];
        if (oA === null)
          nA === null && (nA = K);
        else if (nA !== null) {
          for (var cA = K - nA, wA = (oA - p[nA - 1]) / (cA + 1), TA = 1; TA <= cA; TA++) p[nA + TA - 1] = wA * TA;
          nA = null;
        }
      }
      return t.map(function(EA, IA) {
        return {
          color: EA.color,
          stop: Math.max(Math.min(1, p[IA] / e), 0)
        };
      });
    }, $c = function(t, e, s) {
      var r = e / 2, p = s / 2, S = qA(t[0], e) - r, K = p - qA(t[1], s);
      return (Math.atan2(K, S) + Math.PI * 2) % (Math.PI * 2);
    }, Ah = function(t, e, s) {
      var r = typeof t == "number" ? t : $c(t, e, s), p = Math.abs(e * Math.sin(r)) + Math.abs(s * Math.cos(r)), S = e / 2, K = s / 2, W = p / 2, X = Math.sin(r - Math.PI / 2) * W, nA = Math.cos(r - Math.PI / 2) * W;
      return [
        p,
        S - nA,
        S + nA,
        K - X,
        K + X
      ];
    }, De = function(t, e) {
      return Math.sqrt(t * t + e * e);
    }, da = function(t, e, s, r, p) {
      return [
        [0, 0],
        [0, e],
        [t, 0],
        [t, e]
      ].reduce(function(S, K) {
        var W = K[0], X = K[1], nA = De(s - W, r - X);
        return (p ? nA < S.optimumDistance : nA > S.optimumDistance) ? {
          optimumCorner: K,
          optimumDistance: nA
        } : S;
      }, {
        optimumDistance: p ? 1 / 0 : -1 / 0,
        optimumCorner: null
      }).optimumCorner;
    }, eh = function(t, e, s, r, p) {
      var S = 0, K = 0;
      switch (t.size) {
        case 0:
          t.shape === 0 ? S = K = Math.min(Math.abs(e), Math.abs(e - r), Math.abs(s), Math.abs(s - p)) : t.shape === 1 && (S = Math.min(Math.abs(e), Math.abs(e - r)), K = Math.min(Math.abs(s), Math.abs(s - p)));
          break;
        case 2:
          if (t.shape === 0) S = K = Math.min(De(e, s), De(e, s - p), De(e - r, s), De(e - r, s - p));
          else if (t.shape === 1) {
            var W = Math.min(Math.abs(s), Math.abs(s - p)) / Math.min(Math.abs(e), Math.abs(e - r)), X = da(r, p, e, s, !0), nA = X[0], oA = X[1];
            S = De(nA - e, (oA - s) / W), K = W * S;
          }
          break;
        case 1:
          t.shape === 0 ? S = K = Math.max(Math.abs(e), Math.abs(e - r), Math.abs(s), Math.abs(s - p)) : t.shape === 1 && (S = Math.max(Math.abs(e), Math.abs(e - r)), K = Math.max(Math.abs(s), Math.abs(s - p)));
          break;
        case 3:
          if (t.shape === 0) S = K = Math.max(De(e, s), De(e, s - p), De(e - r, s), De(e - r, s - p));
          else if (t.shape === 1) {
            var W = Math.max(Math.abs(s), Math.abs(s - p)) / Math.max(Math.abs(e), Math.abs(e - r)), cA = da(r, p, e, s, !1), nA = cA[0], oA = cA[1];
            S = De(nA - e, (oA - s) / W), K = W * S;
          }
          break;
      }
      return Array.isArray(t.size) && (S = qA(t.size[0], r), K = t.size.length === 2 ? qA(t.size[1], p) : S), [S, K];
    }, th = function(t, e) {
      var s = xe(180), r = [];
      return ke(e).forEach(function(p, S) {
        if (S === 0) {
          var K = p[0];
          if (K.type === 20 && K.value === "to") {
            s = la(p);
            return;
          } else if (oa(K)) {
            s = an.parse(t, K);
            return;
          }
        }
        var W = on(t, p);
        r.push(W);
      }), {
        angle: s,
        stops: r,
        type: 1
      };
    }, ln = function(t, e) {
      var s = xe(180), r = [];
      return ke(e).forEach(function(p, S) {
        if (S === 0) {
          var K = p[0];
          if (K.type === 20 && [
            "top",
            "left",
            "right",
            "bottom"
          ].indexOf(K.value) !== -1) {
            s = la(p);
            return;
          } else if (oa(K)) {
            s = (an.parse(t, K) + xe(270)) % xe(360);
            return;
          }
        }
        var W = on(t, p);
        r.push(W);
      }), {
        angle: s,
        stops: r,
        type: 1
      };
    }, rh = function(t, e) {
      var s = xe(180), r = [], p = 1, S = 0, K = 3, W = [];
      return ke(e).forEach(function(X, nA) {
        var oA = X[0];
        if (nA === 0) {
          if (JA(oA) && oA.value === "linear") {
            p = 1;
            return;
          } else if (JA(oA) && oA.value === "radial") {
            p = 2;
            return;
          }
        }
        if (oA.type === 18) {
          if (oA.name === "from") {
            var cA = ct.parse(t, oA.values[0]);
            r.push({
              stop: ue,
              color: cA
            });
          } else if (oA.name === "to") {
            var cA = ct.parse(t, oA.values[0]);
            r.push({
              stop: ut,
              color: cA
            });
          } else if (oA.name === "color-stop") {
            var wA = oA.values.filter(jt);
            if (wA.length === 2) {
              var cA = ct.parse(t, wA[1]), TA = wA[0];
              Xt(TA) && r.push({
                stop: {
                  type: 16,
                  number: TA.number * 100,
                  flags: TA.flags
                },
                color: cA
              });
            }
          }
        }
      }), p === 1 ? {
        angle: (s + xe(180)) % xe(360),
        stops: r,
        type: p
      } : {
        size: K,
        shape: S,
        stops: r,
        position: W,
        type: p
      };
    }, pa = "closest-side", ga = "farthest-side", wa = "closest-corner", Ba = "farthest-corner", ma = "circle", va = "ellipse", ya = "cover", Ca = "contain", nh = function(t, e) {
      var s = 0, r = 3, p = [], S = [];
      return ke(e).forEach(function(K, W) {
        var X = !0;
        if (W === 0) {
          var nA = !1;
          X = K.reduce(function(cA, wA) {
            if (nA)
              if (JA(wA)) switch (wA.value) {
                case "center":
                  return S.push(fi), cA;
                case "top":
                case "left":
                  return S.push(ue), cA;
                case "right":
                case "bottom":
                  return S.push(ut), cA;
              }
              else (se(wA) || lt(wA)) && S.push(wA);
            else if (JA(wA)) switch (wA.value) {
              case ma:
                return s = 0, !1;
              case va:
                return s = 1, !1;
              case "at":
                return nA = !0, !1;
              case pa:
                return r = 0, !1;
              case ya:
              case ga:
                return r = 1, !1;
              case Ca:
              case wa:
                return r = 2, !1;
              case Ba:
                return r = 3, !1;
            }
            else if (lt(wA) || se(wA))
              return Array.isArray(r) || (r = []), r.push(wA), !1;
            return cA;
          }, X);
        }
        if (X) {
          var oA = on(t, K);
          p.push(oA);
        }
      }), {
        size: r,
        shape: s,
        stops: p,
        position: S,
        type: 2
      };
    }, un = function(t, e) {
      var s = 0, r = 3, p = [], S = [];
      return ke(e).forEach(function(K, W) {
        var X = !0;
        if (W === 0 ? X = K.reduce(function(oA, cA) {
          if (JA(cA)) switch (cA.value) {
            case "center":
              return S.push(fi), !1;
            case "top":
            case "left":
              return S.push(ue), !1;
            case "right":
            case "bottom":
              return S.push(ut), !1;
          }
          else if (se(cA) || lt(cA))
            return S.push(cA), !1;
          return oA;
        }, X) : W === 1 && (X = K.reduce(function(oA, cA) {
          if (JA(cA)) switch (cA.value) {
            case ma:
              return s = 0, !1;
            case va:
              return s = 1, !1;
            case Ca:
            case pa:
              return r = 0, !1;
            case ga:
              return r = 1, !1;
            case wa:
              return r = 2, !1;
            case ya:
            case Ba:
              return r = 3, !1;
          }
          else if (lt(cA) || se(cA))
            return Array.isArray(r) || (r = []), r.push(cA), !1;
          return oA;
        }, X)), X) {
          var nA = on(t, K);
          p.push(nA);
        }
      }), {
        size: r,
        shape: s,
        stops: p,
        position: S,
        type: 2
      };
    }, ih = function(t) {
      return t.type === 1;
    }, sh = function(t) {
      return t.type === 2;
    }, pi = {
      name: "image",
      parse: function(t, e) {
        if (e.type === 22) {
          var s = {
            url: e.value,
            type: 0
          };
          return t.cache.addImage(e.value), s;
        }
        if (e.type === 18) {
          var r = Fa[e.name];
          if (typeof r > "u") throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
          return r(t, e.values);
        }
        throw new Error("Unsupported image type " + e.type);
      }
    };
    function ah(t) {
      return !(t.type === 20 && t.value === "none") && (t.type !== 18 || !!Fa[t.name]);
    }
    var Fa = {
      "linear-gradient": th,
      "-moz-linear-gradient": ln,
      "-ms-linear-gradient": ln,
      "-o-linear-gradient": ln,
      "-webkit-linear-gradient": ln,
      "radial-gradient": nh,
      "-moz-radial-gradient": un,
      "-ms-radial-gradient": un,
      "-o-radial-gradient": un,
      "-webkit-radial-gradient": un,
      "-webkit-gradient": rh
    }, oh = {
      name: "background-image",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        var s = e[0];
        return s.type === 20 && s.value === "none" ? [] : e.filter(function(r) {
          return jt(r) && ah(r);
        }).map(function(r) {
          return pi.parse(t, r);
        });
      }
    }, lh = {
      name: "background-origin",
      initialValue: "border-box",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.map(function(s) {
          if (JA(s)) switch (s.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, uh = {
      name: "background-position",
      initialValue: "0% 0%",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return ke(e).map(function(s) {
          return s.filter(se);
        }).map(ra);
      }
    }, ch = {
      name: "background-repeat",
      initialValue: "repeat",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return ke(e).map(function(s) {
          return s.filter(JA).map(function(r) {
            return r.value;
          }).join(" ");
        }).map(hh);
      }
    }, hh = function(t) {
      switch (t) {
        case "no-repeat":
          return 1;
        case "repeat-x":
        case "repeat no-repeat":
          return 2;
        case "repeat-y":
        case "no-repeat repeat":
          return 3;
        default:
          return 0;
      }
    }, zt;
    (function(t) {
      t.AUTO = "auto", t.CONTAIN = "contain", t.COVER = "cover";
    })(zt || (zt = {}));
    var fh = {
      name: "background-size",
      initialValue: "0",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return ke(e).map(function(s) {
          return s.filter(dh);
        });
      }
    }, dh = function(t) {
      return JA(t) || se(t);
    }, cn = function(t) {
      return {
        name: "border-" + t + "-color",
        initialValue: "transparent",
        prefix: !1,
        type: 3,
        format: "color"
      };
    }, ph = cn("top"), gh = cn("right"), wh = cn("bottom"), Bh = cn("left"), hn = function(t) {
      return {
        name: "border-radius-" + t,
        initialValue: "0 0",
        prefix: !1,
        type: 1,
        parse: function(e, s) {
          return ra(s.filter(se));
        }
      };
    }, mh = hn("top-left"), vh = hn("top-right"), yh = hn("bottom-right"), Ch = hn("bottom-left"), fn = function(t) {
      return {
        name: "border-" + t + "-style",
        initialValue: "solid",
        prefix: !1,
        type: 2,
        parse: function(e, s) {
          switch (s) {
            case "none":
              return 0;
            case "dashed":
              return 2;
            case "dotted":
              return 3;
            case "double":
              return 4;
          }
          return 1;
        }
      };
    }, Fh = fn("top"), Eh = fn("right"), Qh = fn("bottom"), Uh = fn("left"), dn = function(t) {
      return {
        name: "border-" + t + "-width",
        initialValue: "0",
        type: 0,
        prefix: !1,
        parse: function(e, s) {
          return Ur(s) ? s.number : 0;
        }
      };
    }, bh = dn("top"), Ih = dn("right"), _h = dn("bottom"), xh = dn("left"), Th = {
      name: "color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, Sh = {
      name: "direction",
      initialValue: "ltr",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "rtl" ? 1 : 0;
      }
    }, Hh = {
      name: "display",
      initialValue: "inline-block",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).reduce(function(s, r) {
          return s | Lh(r.value);
        }, 0);
      }
    }, Lh = function(t) {
      switch (t) {
        case "block":
        case "-webkit-box":
          return 2;
        case "inline":
          return 4;
        case "run-in":
          return 8;
        case "flow":
          return 16;
        case "flow-root":
          return 32;
        case "table":
          return 64;
        case "flex":
        case "-webkit-flex":
          return 128;
        case "grid":
        case "-ms-grid":
          return 256;
        case "ruby":
          return 512;
        case "subgrid":
          return 1024;
        case "list-item":
          return 2048;
        case "table-row-group":
          return 4096;
        case "table-header-group":
          return 8192;
        case "table-footer-group":
          return 16384;
        case "table-row":
          return 32768;
        case "table-cell":
          return 65536;
        case "table-column-group":
          return 131072;
        case "table-column":
          return 262144;
        case "table-caption":
          return 524288;
        case "ruby-base":
          return 1048576;
        case "ruby-text":
          return 2097152;
        case "ruby-base-container":
          return 4194304;
        case "ruby-text-container":
          return 8388608;
        case "contents":
          return 16777216;
        case "inline-block":
          return 33554432;
        case "inline-list-item":
          return 67108864;
        case "inline-table":
          return 134217728;
        case "inline-flex":
          return 268435456;
        case "inline-grid":
          return 536870912;
      }
      return 0;
    }, Dh = {
      name: "float",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "left":
            return 1;
          case "right":
            return 2;
          case "inline-start":
            return 3;
          case "inline-end":
            return 4;
        }
        return 0;
      }
    }, Rh = {
      name: "letter-spacing",
      initialValue: "0",
      prefix: !1,
      type: 0,
      parse: function(t, e) {
        return e.type === 20 && e.value === "normal" ? 0 : e.type === 17 || e.type === 15 ? e.number : 0;
      }
    }, pn;
    (function(t) {
      t.NORMAL = "normal", t.STRICT = "strict";
    })(pn || (pn = {}));
    var Oh = {
      name: "line-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "strict" ? pn.STRICT : pn.NORMAL;
      }
    }, Nh = {
      name: "line-height",
      initialValue: "normal",
      prefix: !1,
      type: 4
    }, Ea = function(t, e) {
      return JA(t) && t.value === "normal" ? 1.2 * e : t.type === 17 ? e * t.number : se(t) ? qA(t, e) : e;
    }, kh = {
      name: "list-style-image",
      initialValue: "none",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return e.type === 20 && e.value === "none" ? null : pi.parse(t, e);
      }
    }, Kh = {
      name: "list-style-position",
      initialValue: "outside",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "inside" ? 0 : 1;
      }
    }, gi = {
      name: "list-style-type",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "disc":
            return 0;
          case "circle":
            return 1;
          case "square":
            return 2;
          case "decimal":
            return 3;
          case "cjk-decimal":
            return 4;
          case "decimal-leading-zero":
            return 5;
          case "lower-roman":
            return 6;
          case "upper-roman":
            return 7;
          case "lower-greek":
            return 8;
          case "lower-alpha":
            return 9;
          case "upper-alpha":
            return 10;
          case "arabic-indic":
            return 11;
          case "armenian":
            return 12;
          case "bengali":
            return 13;
          case "cambodian":
            return 14;
          case "cjk-earthly-branch":
            return 15;
          case "cjk-heavenly-stem":
            return 16;
          case "cjk-ideographic":
            return 17;
          case "devanagari":
            return 18;
          case "ethiopic-numeric":
            return 19;
          case "georgian":
            return 20;
          case "gujarati":
            return 21;
          case "gurmukhi":
            return 22;
          case "hebrew":
            return 22;
          case "hiragana":
            return 23;
          case "hiragana-iroha":
            return 24;
          case "japanese-formal":
            return 25;
          case "japanese-informal":
            return 26;
          case "kannada":
            return 27;
          case "katakana":
            return 28;
          case "katakana-iroha":
            return 29;
          case "khmer":
            return 30;
          case "korean-hangul-formal":
            return 31;
          case "korean-hanja-formal":
            return 32;
          case "korean-hanja-informal":
            return 33;
          case "lao":
            return 34;
          case "lower-armenian":
            return 35;
          case "malayalam":
            return 36;
          case "mongolian":
            return 37;
          case "myanmar":
            return 38;
          case "oriya":
            return 39;
          case "persian":
            return 40;
          case "simp-chinese-formal":
            return 41;
          case "simp-chinese-informal":
            return 42;
          case "tamil":
            return 43;
          case "telugu":
            return 44;
          case "thai":
            return 45;
          case "tibetan":
            return 46;
          case "trad-chinese-formal":
            return 47;
          case "trad-chinese-informal":
            return 48;
          case "upper-armenian":
            return 49;
          case "disclosure-open":
            return 50;
          case "disclosure-closed":
            return 51;
          default:
            return -1;
        }
      }
    }, gn = function(t) {
      return {
        name: "margin-" + t,
        initialValue: "0",
        prefix: !1,
        type: 4
      };
    }, Mh = gn("top"), Ph = gn("right"), Gh = gn("bottom"), Vh = gn("left"), Wh = {
      name: "overflow",
      initialValue: "visible",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).map(function(s) {
          switch (s.value) {
            case "hidden":
              return 1;
            case "scroll":
              return 2;
            case "clip":
              return 3;
            case "auto":
              return 4;
            default:
              return 0;
          }
        });
      }
    }, Xh = {
      name: "overflow-wrap",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "break-word" ? "break-word" : "normal";
      }
    }, wn = function(t) {
      return {
        name: "padding-" + t,
        initialValue: "0",
        prefix: !1,
        type: 3,
        format: "length-percentage"
      };
    }, jh = wn("top"), zh = wn("right"), Jh = wn("bottom"), Yh = wn("left"), Zh = {
      name: "text-align",
      initialValue: "left",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "right":
            return 2;
          case "center":
          case "justify":
            return 1;
          default:
            return 0;
        }
      }
    }, qh = {
      name: "position",
      initialValue: "static",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "relative":
            return 1;
          case "absolute":
            return 2;
          case "fixed":
            return 3;
          case "sticky":
            return 4;
        }
        return 0;
      }
    }, $h = {
      name: "text-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.length === 1 && hi(e[0], "none") ? [] : ke(e).map(function(s) {
          for (var r = {
            color: Ze.TRANSPARENT,
            offsetX: ue,
            offsetY: ue,
            blur: ue
          }, p = 0, S = 0; S < s.length; S++) {
            var K = s[S];
            lt(K) ? (p === 0 ? r.offsetX = K : p === 1 ? r.offsetY = K : r.blur = K, p++) : r.color = ct.parse(t, K);
          }
          return r;
        });
      }
    }, Af = {
      name: "text-transform",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "uppercase":
            return 2;
          case "lowercase":
            return 1;
          case "capitalize":
            return 3;
        }
        return 0;
      }
    }, ef = {
      name: "transform",
      initialValue: "none",
      prefix: !0,
      type: 0,
      parse: function(t, e) {
        if (e.type === 20 && e.value === "none") return null;
        if (e.type === 18) {
          var s = nf[e.name];
          if (typeof s > "u") throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
          return s(e.values);
        }
        return null;
      }
    }, tf = function(t) {
      var e = t.filter(function(s) {
        return s.type === 17;
      }).map(function(s) {
        return s.number;
      });
      return e.length === 6 ? e : null;
    }, rf = function(t) {
      var e = t.filter(function(X) {
        return X.type === 17;
      }).map(function(X) {
        return X.number;
      }), s = e[0], r = e[1];
      e[2], e[3];
      var p = e[4], S = e[5];
      e[6], e[7], e[8], e[9], e[10], e[11];
      var K = e[12], W = e[13];
      return e[14], e[15], e.length === 16 ? [
        s,
        r,
        p,
        S,
        K,
        W
      ] : null;
    }, nf = {
      matrix: tf,
      matrix3d: rf
    }, Qa = {
      type: 16,
      number: 50,
      flags: yr
    }, sf = [Qa, Qa], af = {
      name: "transform-origin",
      initialValue: "50% 50%",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        var s = e.filter(se);
        return s.length !== 2 ? sf : [s[0], s[1]];
      }
    }, of = {
      name: "visible",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "hidden":
            return 1;
          case "collapse":
            return 2;
          default:
            return 0;
        }
      }
    }, _r;
    (function(t) {
      t.NORMAL = "normal", t.BREAK_ALL = "break-all", t.KEEP_ALL = "keep-all";
    })(_r || (_r = {}));
    for (var lf = {
      name: "word-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "break-all":
            return _r.BREAK_ALL;
          case "keep-all":
            return _r.KEEP_ALL;
          default:
            return _r.NORMAL;
        }
      }
    }, uf = {
      name: "z-index",
      initialValue: "auto",
      prefix: !1,
      type: 0,
      parse: function(t, e) {
        if (e.type === 20) return {
          auto: !0,
          order: 0
        };
        if (Xt(e)) return {
          auto: !1,
          order: e.number
        };
        throw new Error("Invalid z-index number parsed");
      }
    }, Ua = {
      name: "time",
      parse: function(t, e) {
        if (e.type === 15) switch (e.unit.toLowerCase()) {
          case "s":
            return 1e3 * e.number;
          case "ms":
            return e.number;
        }
        throw new Error("Unsupported time type");
      }
    }, cf = {
      name: "opacity",
      initialValue: "1",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return Xt(e) ? e.number : 1;
      }
    }, hf = {
      name: "text-decoration-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, ff = {
      name: "text-decoration-line",
      initialValue: "none",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).map(function(s) {
          switch (s.value) {
            case "underline":
              return 1;
            case "overline":
              return 2;
            case "line-through":
              return 3;
            case "none":
              return 4;
          }
          return 0;
        }).filter(function(s) {
          return s !== 0;
        });
      }
    }, df = {
      name: "font-family",
      initialValue: "",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        var s = [], r = [];
        return e.forEach(function(p) {
          switch (p.type) {
            case 20:
            case 0:
              s.push(p.value);
              break;
            case 17:
              s.push(p.number.toString());
              break;
            case 4:
              r.push(s.join(" ")), s.length = 0;
              break;
          }
        }), s.length && r.push(s.join(" ")), r.map(function(p) {
          return p.indexOf(" ") === -1 ? p : "'" + p + "'";
        });
      }
    }, pf = {
      name: "font-size",
      initialValue: "0",
      prefix: !1,
      type: 3,
      format: "length"
    }, gf = {
      name: "font-weight",
      initialValue: "normal",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return Xt(e) ? e.number : JA(e) && e.value === "bold" ? 700 : 400;
      }
    }, wf = {
      name: "font-variant",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.filter(JA).map(function(s) {
          return s.value;
        });
      }
    }, Bf = {
      name: "font-style",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "oblique":
            return "oblique";
          case "italic":
            return "italic";
          default:
            return "normal";
        }
      }
    }, oe = function(t, e) {
      return (t & e) !== 0;
    }, mf = {
      name: "content",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        var s = e[0];
        return s.type === 20 && s.value === "none" ? [] : e;
      }
    }, vf = {
      name: "counter-increment",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return null;
        var s = e[0];
        if (s.type === 20 && s.value === "none") return null;
        for (var r = [], p = e.filter(ta), S = 0; S < p.length; S++) {
          var K = p[S], W = p[S + 1];
          if (K.type === 20) {
            var X = W && Xt(W) ? W.number : 1;
            r.push({
              counter: K.value,
              increment: X
            });
          }
        }
        return r;
      }
    }, yf = {
      name: "counter-reset",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        for (var s = [], r = e.filter(ta), p = 0; p < r.length; p++) {
          var S = r[p], K = r[p + 1];
          if (JA(S) && S.value !== "none") {
            var W = K && Xt(K) ? K.number : 0;
            s.push({
              counter: S.value,
              reset: W
            });
          }
        }
        return s;
      }
    }, Cf = {
      name: "duration",
      initialValue: "0s",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(Ur).map(function(s) {
          return Ua.parse(t, s);
        });
      }
    }, Ff = {
      name: "quotes",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return null;
        var s = e[0];
        if (s.type === 20 && s.value === "none") return null;
        var r = [], p = e.filter(zc);
        if (p.length % 2 !== 0) return null;
        for (var S = 0; S < p.length; S += 2) {
          var K = p[S].value, W = p[S + 1].value;
          r.push({
            open: K,
            close: W
          });
        }
        return r;
      }
    }, ba = function(t, e, s) {
      if (!t) return "";
      var r = t[Math.min(e, t.length - 1)];
      return r ? s ? r.open : r.close : "";
    }, Ef = {
      name: "box-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.length === 1 && hi(e[0], "none") ? [] : ke(e).map(function(s) {
          for (var r = {
            color: 255,
            offsetX: ue,
            offsetY: ue,
            blur: ue,
            spread: ue,
            inset: !1
          }, p = 0, S = 0; S < s.length; S++) {
            var K = s[S];
            hi(K, "inset") ? r.inset = !0 : lt(K) ? (p === 0 ? r.offsetX = K : p === 1 ? r.offsetY = K : p === 2 ? r.blur = K : r.spread = K, p++) : r.color = ct.parse(t, K);
          }
          return r;
        });
      }
    }, Qf = {
      name: "paint-order",
      initialValue: "normal",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        var s = [
          0,
          1,
          2
        ], r = [];
        return e.filter(JA).forEach(function(p) {
          switch (p.value) {
            case "stroke":
              r.push(1);
              break;
            case "fill":
              r.push(0);
              break;
            case "markers":
              r.push(2);
              break;
          }
        }), s.forEach(function(p) {
          r.indexOf(p) === -1 && r.push(p);
        }), r;
      }
    }, Uf = {
      name: "-webkit-text-stroke-color",
      initialValue: "currentcolor",
      prefix: !1,
      type: 3,
      format: "color"
    }, bf = {
      name: "-webkit-text-stroke-width",
      initialValue: "0",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return Ur(e) ? e.number : 0;
      }
    }, If = (function() {
      function t(e, s) {
        var r, p;
        this.animationDuration = LA(e, Cf, s.animationDuration), this.backgroundClip = LA(e, Zc, s.backgroundClip), this.backgroundColor = LA(e, qc, s.backgroundColor), this.backgroundImage = LA(e, oh, s.backgroundImage), this.backgroundOrigin = LA(e, lh, s.backgroundOrigin), this.backgroundPosition = LA(e, uh, s.backgroundPosition), this.backgroundRepeat = LA(e, ch, s.backgroundRepeat), this.backgroundSize = LA(e, fh, s.backgroundSize), this.borderTopColor = LA(e, ph, s.borderTopColor), this.borderRightColor = LA(e, gh, s.borderRightColor), this.borderBottomColor = LA(e, wh, s.borderBottomColor), this.borderLeftColor = LA(e, Bh, s.borderLeftColor), this.borderTopLeftRadius = LA(e, mh, s.borderTopLeftRadius), this.borderTopRightRadius = LA(e, vh, s.borderTopRightRadius), this.borderBottomRightRadius = LA(e, yh, s.borderBottomRightRadius), this.borderBottomLeftRadius = LA(e, Ch, s.borderBottomLeftRadius), this.borderTopStyle = LA(e, Fh, s.borderTopStyle), this.borderRightStyle = LA(e, Eh, s.borderRightStyle), this.borderBottomStyle = LA(e, Qh, s.borderBottomStyle), this.borderLeftStyle = LA(e, Uh, s.borderLeftStyle), this.borderTopWidth = LA(e, bh, s.borderTopWidth), this.borderRightWidth = LA(e, Ih, s.borderRightWidth), this.borderBottomWidth = LA(e, _h, s.borderBottomWidth), this.borderLeftWidth = LA(e, xh, s.borderLeftWidth), this.boxShadow = LA(e, Ef, s.boxShadow), this.color = LA(e, Th, s.color), this.direction = LA(e, Sh, s.direction), this.display = LA(e, Hh, s.display), this.float = LA(e, Dh, s.cssFloat), this.fontFamily = LA(e, df, s.fontFamily), this.fontSize = LA(e, pf, s.fontSize), this.fontStyle = LA(e, Bf, s.fontStyle), this.fontVariant = LA(e, wf, s.fontVariant), this.fontWeight = LA(e, gf, s.fontWeight), this.letterSpacing = LA(e, Rh, s.letterSpacing), this.lineBreak = LA(e, Oh, s.lineBreak), this.lineHeight = LA(e, Nh, s.lineHeight), this.listStyleImage = LA(e, kh, s.listStyleImage), this.listStylePosition = LA(e, Kh, s.listStylePosition), this.listStyleType = LA(e, gi, s.listStyleType), this.marginTop = LA(e, Mh, s.marginTop), this.marginRight = LA(e, Ph, s.marginRight), this.marginBottom = LA(e, Gh, s.marginBottom), this.marginLeft = LA(e, Vh, s.marginLeft), this.opacity = LA(e, cf, s.opacity);
        var S = LA(e, Wh, s.overflow);
        this.overflowX = S[0], this.overflowY = S[S.length > 1 ? 1 : 0], this.overflowWrap = LA(e, Xh, s.overflowWrap), this.paddingTop = LA(e, jh, s.paddingTop), this.paddingRight = LA(e, zh, s.paddingRight), this.paddingBottom = LA(e, Jh, s.paddingBottom), this.paddingLeft = LA(e, Yh, s.paddingLeft), this.paintOrder = LA(e, Qf, s.paintOrder), this.position = LA(e, qh, s.position), this.textAlign = LA(e, Zh, s.textAlign), this.textDecorationColor = LA(e, hf, (r = s.textDecorationColor) !== null && r !== void 0 ? r : s.color), this.textDecorationLine = LA(e, ff, (p = s.textDecorationLine) !== null && p !== void 0 ? p : s.textDecoration), this.textShadow = LA(e, $h, s.textShadow), this.textTransform = LA(e, Af, s.textTransform), this.transform = LA(e, ef, s.transform), this.transformOrigin = LA(e, af, s.transformOrigin), this.visibility = LA(e, of, s.visibility), this.webkitTextStrokeColor = LA(e, Uf, s.webkitTextStrokeColor), this.webkitTextStrokeWidth = LA(e, bf, s.webkitTextStrokeWidth), this.wordBreak = LA(e, lf, s.wordBreak), this.zIndex = LA(e, uf, s.zIndex);
      }
      return t.prototype.isVisible = function() {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      }, t.prototype.isTransparent = function() {
        return ht(this.backgroundColor);
      }, t.prototype.isTransformed = function() {
        return this.transform !== null;
      }, t.prototype.isPositioned = function() {
        return this.position !== 0;
      }, t.prototype.isPositionedWithZIndex = function() {
        return this.isPositioned() && !this.zIndex.auto;
      }, t.prototype.isFloating = function() {
        return this.float !== 0;
      }, t.prototype.isInlineLevel = function() {
        return oe(this.display, 4) || oe(this.display, 33554432) || oe(this.display, 268435456) || oe(this.display, 536870912) || oe(this.display, 67108864) || oe(this.display, 134217728);
      }, t;
    })(), _f = /* @__PURE__ */ (function() {
      function t(e, s) {
        this.content = LA(e, mf, s.content), this.quotes = LA(e, Ff, s.quotes);
      }
      return t;
    })(), Ia = /* @__PURE__ */ (function() {
      function t(e, s) {
        this.counterIncrement = LA(e, vf, s.counterIncrement), this.counterReset = LA(e, yf, s.counterReset);
      }
      return t;
    })(), LA = function(t, e, s) {
      var r = new Aa(), p = s !== null && typeof s < "u" ? s.toString() : e.initialValue;
      r.write(p);
      var S = new ea(r.read());
      switch (e.type) {
        case 2:
          var K = S.parseComponentValue();
          return e.parse(t, JA(K) ? K.value : e.initialValue);
        case 0:
          return e.parse(t, S.parseComponentValue());
        case 1:
          return e.parse(t, S.parseComponentValues());
        case 4:
          return S.parseComponentValue();
        case 3:
          switch (e.format) {
            case "angle":
              return an.parse(t, S.parseComponentValue());
            case "color":
              return ct.parse(t, S.parseComponentValue());
            case "image":
              return pi.parse(t, S.parseComponentValue());
            case "length":
              var W = S.parseComponentValue();
              return lt(W) ? W : ue;
            case "length-percentage":
              var X = S.parseComponentValue();
              return se(X) ? X : ue;
            case "time":
              return Ua.parse(t, S.parseComponentValue());
          }
          break;
      }
    }, xf = "data-html2canvas-debug", Tf = function(t) {
      switch (t.getAttribute(xf)) {
        case "all":
          return 1;
        case "clone":
          return 2;
        case "parse":
          return 3;
        case "render":
          return 4;
        default:
          return 0;
      }
    }, wi = function(t, e) {
      var s = Tf(t);
      return s === 1 || e === s;
    }, Ke = /* @__PURE__ */ (function() {
      function t(e, s) {
        if (this.context = e, this.textNodes = [], this.elements = [], this.flags = 0, wi(s, 3)) debugger;
        this.styles = new If(e, window.getComputedStyle(s, null)), Ti(s) && (this.styles.animationDuration.some(function(r) {
          return r > 0;
        }) && (s.style.animationDuration = "0s"), this.styles.transform !== null && (s.style.transform = "none")), this.bounds = U(this.context, s), wi(s, 4) && (this.flags |= 16);
      }
      return t;
    })(), Sf = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", _a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", xr = typeof Uint8Array > "u" ? [] : new Uint8Array(256), Bn = 0; Bn < _a.length; Bn++) xr[_a.charCodeAt(Bn)] = Bn;
    for (var Hf = function(t) {
      var e = t.length * 0.75, s = t.length, r, p = 0, S, K, W, X;
      t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
      var nA = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), oA = Array.isArray(nA) ? nA : new Uint8Array(nA);
      for (r = 0; r < s; r += 4)
        S = xr[t.charCodeAt(r)], K = xr[t.charCodeAt(r + 1)], W = xr[t.charCodeAt(r + 2)], X = xr[t.charCodeAt(r + 3)], oA[p++] = S << 2 | K >> 4, oA[p++] = (K & 15) << 4 | W >> 2, oA[p++] = (W & 3) << 6 | X & 63;
      return nA;
    }, Lf = function(t) {
      for (var e = t.length, s = [], r = 0; r < e; r += 2) s.push(t[r + 1] << 8 | t[r]);
      return s;
    }, Df = function(t) {
      for (var e = t.length, s = [], r = 0; r < e; r += 4) s.push(t[r + 3] << 24 | t[r + 2] << 16 | t[r + 1] << 8 | t[r]);
      return s;
    }, It = 5, Bi = 11, mi = 2, Rf = Bi - It, xa = 65536 >> It, vi = (1 << It) - 1, Of = xa + (1024 >> It) + 32, Nf = 65536 >> Bi, kf = (1 << Rf) - 1, Ta = function(t, e, s) {
      return t.slice ? t.slice(e, s) : new Uint16Array(Array.prototype.slice.call(t, e, s));
    }, Kf = function(t, e, s) {
      return t.slice ? t.slice(e, s) : new Uint32Array(Array.prototype.slice.call(t, e, s));
    }, Mf = function(t, e) {
      var s = Hf(t), r = Array.isArray(s) ? Df(s) : new Uint32Array(s), p = Array.isArray(s) ? Lf(s) : new Uint16Array(s), S = 24, K = Ta(p, S / 2, r[4] / 2), W = r[5] === 2 ? Ta(p, (S + r[4]) / 2) : Kf(r, Math.ceil((S + r[4]) / 4));
      return new Pf(r[0], r[1], r[2], r[3], K, W);
    }, Pf = (function() {
      function t(e, s, r, p, S, K) {
        this.initialValue = e, this.errorValue = s, this.highStart = r, this.highValueIndex = p, this.index = S, this.data = K;
      }
      return t.prototype.get = function(e) {
        var s;
        if (e >= 0) {
          if (e < 55296 || e > 56319 && e <= 65535)
            return s = this.index[e >> It], s = (s << mi) + (e & vi), this.data[s];
          if (e <= 65535)
            return s = this.index[xa + (e - 55296 >> It)], s = (s << mi) + (e & vi), this.data[s];
          if (e < this.highStart)
            return s = Of - Nf + (e >> Bi), s = this.index[s], s += e >> It & kf, s = this.index[s], s = (s << mi) + (e & vi), this.data[s];
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, t;
    })(), Sa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Gf = typeof Uint8Array > "u" ? [] : new Uint8Array(256), mn = 0; mn < Sa.length; mn++) Gf[Sa.charCodeAt(mn)] = mn;
    var Vf = 1, yi = 2, Ci = 3, Ha = 4, La = 5, Wf = 7, Da = 8, Fi = 9, Ei = 10, Ra = 11, Oa = 12, Na = 13, ka = 14, Qi = 15, Xf = function(t) {
      for (var e = [], s = 0, r = t.length; s < r; ) {
        var p = t.charCodeAt(s++);
        if (p >= 55296 && p <= 56319 && s < r) {
          var S = t.charCodeAt(s++);
          (S & 64512) === 56320 ? e.push(((p & 1023) << 10) + (S & 1023) + 65536) : (e.push(p), s--);
        } else e.push(p);
      }
      return e;
    }, jf = function() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, t);
      var s = t.length;
      if (!s) return "";
      for (var r = [], p = -1, S = ""; ++p < s; ) {
        var K = t[p];
        K <= 65535 ? r.push(K) : (K -= 65536, r.push((K >> 10) + 55296, K % 1024 + 56320)), (p + 1 === s || r.length > 16384) && (S += String.fromCharCode.apply(String, r), r.length = 0);
      }
      return S;
    }, zf = Mf(Sf), Te = "×", Ui = "÷", Jf = function(t) {
      return zf.get(t);
    }, Yf = function(t, e, s) {
      var r = s - 2, p = e[r], S = e[s - 1], K = e[s];
      if (S === yi && K === Ci) return Te;
      if (S === yi || S === Ci || S === Ha || K === yi || K === Ci || K === Ha) return Ui;
      if (S === Da && [
        Da,
        Fi,
        Ra,
        Oa
      ].indexOf(K) !== -1 || (S === Ra || S === Fi) && (K === Fi || K === Ei) || (S === Oa || S === Ei) && K === Ei || K === Na || K === La || K === Wf || S === Vf) return Te;
      if (S === Na && K === ka) {
        for (; p === La; ) p = e[--r];
        if (p === ka) return Te;
      }
      if (S === Qi && K === Qi) {
        for (var W = 0; p === Qi; )
          W++, p = e[--r];
        if (W % 2 === 0) return Te;
      }
      return Ui;
    }, Zf = function(t) {
      var e = Xf(t), s = e.length, r = 0, p = 0, S = e.map(Jf);
      return { next: function() {
        if (r >= s) return {
          done: !0,
          value: null
        };
        for (var K = Te; r < s && (K = Yf(e, S, ++r)) === Te; ) ;
        if (K !== Te || r === s) {
          var W = jf.apply(null, e.slice(p, r));
          return p = r, {
            value: W,
            done: !1
          };
        }
        return {
          done: !0,
          value: null
        };
      } };
    }, qf = function(t) {
      for (var e = Zf(t), s = [], r; !(r = e.next()).done; ) r.value && s.push(r.value.slice());
      return s;
    }, $f = function(t) {
      var e = 123;
      if (t.createRange) {
        var s = t.createRange();
        if (s.getBoundingClientRect) {
          var r = t.createElement("boundtest");
          r.style.height = e + "px", r.style.display = "block", t.body.appendChild(r), s.selectNode(r);
          var p = s.getBoundingClientRect(), S = Math.round(p.height);
          if (t.body.removeChild(r), S === e) return !0;
        }
      }
      return !1;
    }, Ad = function(t) {
      var e = t.createElement("boundtest");
      e.style.width = "50px", e.style.display = "block", e.style.fontSize = "12px", e.style.letterSpacing = "0px", e.style.wordSpacing = "0px", t.body.appendChild(e);
      var s = t.createRange();
      e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
      var r = e.firstChild, p = v(r.data).map(function(X) {
        return _(X);
      }), S = 0, K = {}, W = p.every(function(X, nA) {
        s.setStart(r, S), s.setEnd(r, S + X.length);
        var oA = s.getBoundingClientRect();
        S += X.length;
        var cA = oA.x > K.x || oA.y > K.y;
        return K = oA, nA === 0 ? !0 : cA;
      });
      return t.body.removeChild(e), W;
    }, ed = function() {
      return typeof new Image().crossOrigin < "u";
    }, td = function() {
      return typeof new XMLHttpRequest().responseType == "string";
    }, rd = function(t) {
      var e = new Image(), s = t.createElement("canvas"), r = s.getContext("2d");
      if (!r) return !1;
      e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
        r.drawImage(e, 0, 0), s.toDataURL();
      } catch {
        return !1;
      }
      return !0;
    }, Ka = function(t) {
      return t[0] === 0 && t[1] === 255 && t[2] === 0 && t[3] === 255;
    }, nd = function(t) {
      var e = t.createElement("canvas"), s = 100;
      e.width = s, e.height = s;
      var r = e.getContext("2d");
      if (!r) return Promise.reject(!1);
      r.fillStyle = "rgb(0, 255, 0)", r.fillRect(0, 0, s, s);
      var p = new Image(), S = e.toDataURL();
      p.src = S;
      var K = bi(s, s, 0, 0, p);
      return r.fillStyle = "red", r.fillRect(0, 0, s, s), Ma(K).then(function(W) {
        r.drawImage(W, 0, 0);
        var X = r.getImageData(0, 0, s, s).data;
        r.fillStyle = "red", r.fillRect(0, 0, s, s);
        var nA = t.createElement("div");
        return nA.style.backgroundImage = "url(" + S + ")", nA.style.height = s + "px", Ka(X) ? Ma(bi(s, s, 0, 0, nA)) : Promise.reject(!1);
      }).then(function(W) {
        return r.drawImage(W, 0, 0), Ka(r.getImageData(0, 0, s, s).data);
      }).catch(function() {
        return !1;
      });
    }, bi = function(t, e, s, r, p) {
      var S = "http://www.w3.org/2000/svg", K = document.createElementNS(S, "svg"), W = document.createElementNS(S, "foreignObject");
      return K.setAttributeNS(null, "width", t.toString()), K.setAttributeNS(null, "height", e.toString()), W.setAttributeNS(null, "width", "100%"), W.setAttributeNS(null, "height", "100%"), W.setAttributeNS(null, "x", s.toString()), W.setAttributeNS(null, "y", r.toString()), W.setAttributeNS(null, "externalResourcesRequired", "true"), K.appendChild(W), W.appendChild(p), K;
    }, Ma = function(t) {
      return new Promise(function(e, s) {
        var r = new Image();
        r.onload = function() {
          return e(r);
        }, r.onerror = s, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(t));
      });
    }, ce = {
      get SUPPORT_RANGE_BOUNDS() {
        var t = $f(document);
        return Object.defineProperty(ce, "SUPPORT_RANGE_BOUNDS", { value: t }), t;
      },
      get SUPPORT_WORD_BREAKING() {
        var t = ce.SUPPORT_RANGE_BOUNDS && Ad(document);
        return Object.defineProperty(ce, "SUPPORT_WORD_BREAKING", { value: t }), t;
      },
      get SUPPORT_SVG_DRAWING() {
        var t = rd(document);
        return Object.defineProperty(ce, "SUPPORT_SVG_DRAWING", { value: t }), t;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var t = typeof Array.from == "function" && typeof window.fetch == "function" ? nd(document) : Promise.resolve(!1);
        return Object.defineProperty(ce, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: t }), t;
      },
      get SUPPORT_CORS_IMAGES() {
        var t = ed();
        return Object.defineProperty(ce, "SUPPORT_CORS_IMAGES", { value: t }), t;
      },
      get SUPPORT_RESPONSE_TYPE() {
        var t = td();
        return Object.defineProperty(ce, "SUPPORT_RESPONSE_TYPE", { value: t }), t;
      },
      get SUPPORT_CORS_XHR() {
        var t = "withCredentials" in new XMLHttpRequest();
        return Object.defineProperty(ce, "SUPPORT_CORS_XHR", { value: t }), t;
      },
      get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
        var t = !!(typeof Intl < "u" && Intl.Segmenter);
        return Object.defineProperty(ce, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: t }), t;
      }
    }, Tr = /* @__PURE__ */ (function() {
      function t(e, s) {
        this.text = e, this.bounds = s;
      }
      return t;
    })(), id = function(t, e, s, r) {
      var p = od(e, s), S = [], K = 0;
      return p.forEach(function(W) {
        if (s.textDecorationLine.length || W.trim().length > 0) if (ce.SUPPORT_RANGE_BOUNDS) {
          var X = Pa(r, K, W.length).getClientRects();
          if (X.length > 1) {
            var nA = Ii(W), oA = 0;
            nA.forEach(function(wA) {
              S.push(new Tr(wA, d.fromDOMRectList(t, Pa(r, oA + K, wA.length).getClientRects()))), oA += wA.length;
            });
          } else S.push(new Tr(W, d.fromDOMRectList(t, X)));
        } else {
          var cA = r.splitText(W.length);
          S.push(new Tr(W, sd(t, r))), r = cA;
        }
        else ce.SUPPORT_RANGE_BOUNDS || (r = r.splitText(W.length));
        K += W.length;
      }), S;
    }, sd = function(t, e) {
      var s = e.ownerDocument;
      if (s) {
        var r = s.createElement("html2canvaswrapper");
        r.appendChild(e.cloneNode(!0));
        var p = e.parentNode;
        if (p) {
          p.replaceChild(r, e);
          var S = U(t, r);
          return r.firstChild && p.replaceChild(r.firstChild, r), S;
        }
      }
      return d.EMPTY;
    }, Pa = function(t, e, s) {
      var r = t.ownerDocument;
      if (!r) throw new Error("Node has no owner document");
      var p = r.createRange();
      return p.setStart(t, e), p.setEnd(t, e + s), p;
    }, Ii = function(t) {
      if (ce.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
        return Array.from(e.segment(t)).map(function(s) {
          return s.segment;
        });
      }
      return qf(t);
    }, ad = function(t, e) {
      if (ce.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var s = new Intl.Segmenter(void 0, { granularity: "word" });
        return Array.from(s.segment(t)).map(function(r) {
          return r.segment;
        });
      }
      return ud(t, e);
    }, od = function(t, e) {
      return e.letterSpacing !== 0 ? Ii(t) : ad(t, e);
    }, ld = [
      32,
      160,
      4961,
      65792,
      65793,
      4153,
      4241
    ], ud = function(t, e) {
      for (var s = Pu(t, {
        lineBreak: e.lineBreak,
        wordBreak: e.overflowWrap === "break-word" ? "break-word" : e.wordBreak
      }), r = [], p, S = function() {
        if (p.value) {
          var K = v(p.value.slice()), W = "";
          K.forEach(function(X) {
            ld.indexOf(X) === -1 ? W += _(X) : (W.length && r.push(W), r.push(_(X)), W = "");
          }), W.length && r.push(W);
        }
      }; !(p = s.next()).done; ) S();
      return r;
    }, cd = /* @__PURE__ */ (function() {
      function t(e, s, r) {
        this.text = hd(s.data, r.textTransform), this.textBounds = id(e, this.text, r, s);
      }
      return t;
    })(), hd = function(t, e) {
      switch (e) {
        case 1:
          return t.toLowerCase();
        case 3:
          return t.replace(fd, dd);
        case 2:
          return t.toUpperCase();
        default:
          return t;
      }
    }, fd = /(^|\s|:|-|\(|\))([a-z])/g, dd = function(t, e, s) {
      return t.length > 0 ? e + s.toUpperCase() : t;
    }, Ga = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.src = r.currentSrc || r.src, p.intrinsicWidth = r.naturalWidth, p.intrinsicHeight = r.naturalHeight, p.context.cache.addImage(p.src), p;
      }
      return e;
    })(Ke), Va = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.canvas = r, p.intrinsicWidth = r.width, p.intrinsicHeight = r.height, p;
      }
      return e;
    })(Ke), Wa = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this, S = new XMLSerializer(), K = U(s, r);
        return r.setAttribute("width", K.width + "px"), r.setAttribute("height", K.height + "px"), p.svg = "data:image/svg+xml," + encodeURIComponent(S.serializeToString(r)), p.intrinsicWidth = r.width.baseVal.value, p.intrinsicHeight = r.height.baseVal.value, p.context.cache.addImage(p.svg), p;
      }
      return e;
    })(Ke), Xa = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.value = r.value, p;
      }
      return e;
    })(Ke), _i = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.start = r.start, p.reversed = typeof r.reversed == "boolean" && r.reversed === !0, p;
      }
      return e;
    })(Ke), pd = [{
      type: 15,
      flags: 0,
      unit: "px",
      number: 3
    }], gd = [{
      type: 16,
      flags: 0,
      number: 50
    }], wd = function(t) {
      return t.width > t.height ? new d(t.left + (t.width - t.height) / 2, t.top, t.height, t.height) : t.width < t.height ? new d(t.left, t.top + (t.height - t.width) / 2, t.width, t.width) : t;
    }, Bd = function(t) {
      var e = t.type === md ? new Array(t.value.length + 1).join("•") : t.value;
      return e.length === 0 ? t.placeholder || "" : e;
    }, vn = "checkbox", yn = "radio", md = "password", ja = 707406591, xi = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        switch (p.type = r.type.toLowerCase(), p.checked = r.checked, p.value = Bd(r), (p.type === vn || p.type === yn) && (p.styles.backgroundColor = 3739148031, p.styles.borderTopColor = p.styles.borderRightColor = p.styles.borderBottomColor = p.styles.borderLeftColor = 2779096575, p.styles.borderTopWidth = p.styles.borderRightWidth = p.styles.borderBottomWidth = p.styles.borderLeftWidth = 1, p.styles.borderTopStyle = p.styles.borderRightStyle = p.styles.borderBottomStyle = p.styles.borderLeftStyle = 1, p.styles.backgroundClip = [0], p.styles.backgroundOrigin = [0], p.bounds = wd(p.bounds)), p.type) {
          case vn:
            p.styles.borderTopRightRadius = p.styles.borderTopLeftRadius = p.styles.borderBottomRightRadius = p.styles.borderBottomLeftRadius = pd;
            break;
          case yn:
            p.styles.borderTopRightRadius = p.styles.borderTopLeftRadius = p.styles.borderBottomRightRadius = p.styles.borderBottomLeftRadius = gd;
            break;
        }
        return p;
      }
      return e;
    })(Ke), za = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this, S = r.options[r.selectedIndex || 0];
        return p.value = S && S.text || "", p;
      }
      return e;
    })(Ke), Ja = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.value = r.value, p;
      }
      return e;
    })(Ke), Ya = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        p.src = r.src, p.width = parseInt(r.width, 10) || 0, p.height = parseInt(r.height, 10) || 0, p.backgroundColor = p.styles.backgroundColor;
        try {
          if (r.contentWindow && r.contentWindow.document && r.contentWindow.document.documentElement) {
            p.tree = qa(s, r.contentWindow.document.documentElement);
            var S = r.contentWindow.document.documentElement ? Ir(s, getComputedStyle(r.contentWindow.document.documentElement).backgroundColor) : Ze.TRANSPARENT, K = r.contentWindow.document.body ? Ir(s, getComputedStyle(r.contentWindow.document.body).backgroundColor) : Ze.TRANSPARENT;
            p.backgroundColor = ht(S) ? ht(K) ? p.styles.backgroundColor : K : S;
          }
        } catch {
        }
        return p;
      }
      return e;
    })(Ke), vd = [
      "OL",
      "UL",
      "MENU"
    ], Cn = function(t, e, s, r) {
      for (var p = e.firstChild, S = void 0; p; p = S)
        if (S = p.nextSibling, $a(p) && p.data.trim().length > 0) s.textNodes.push(new cd(t, p, s.styles));
        else if (Jt(p)) if (io(p) && p.assignedNodes) p.assignedNodes().forEach(function(W) {
          return Cn(t, W, s, r);
        });
        else {
          var K = Za(t, p);
          K.styles.isVisible() && (yd(p, K, r) ? K.flags |= 4 : Cd(K.styles) && (K.flags |= 2), vd.indexOf(p.tagName) !== -1 && (K.flags |= 8), s.elements.push(K), p.slot, p.shadowRoot ? Cn(t, p.shadowRoot, K, r) : !En(p) && !Ao(p) && !Qn(p) && Cn(t, p, K, r));
        }
    }, Za = function(t, e) {
      return Hi(e) ? new Ga(t, e) : eo(e) ? new Va(t, e) : Ao(e) ? new Wa(t, e) : Fd(e) ? new Xa(t, e) : Ed(e) ? new _i(t, e) : Qd(e) ? new xi(t, e) : Qn(e) ? new za(t, e) : En(e) ? new Ja(t, e) : ro(e) ? new Ya(t, e) : new Ke(t, e);
    }, qa = function(t, e) {
      var s = Za(t, e);
      return s.flags |= 4, Cn(t, e, s, s), s;
    }, yd = function(t, e, s) {
      return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || Si(t) && s.styles.isTransparent();
    }, Cd = function(t) {
      return t.isPositioned() || t.isFloating();
    }, $a = function(t) {
      return t.nodeType === Node.TEXT_NODE;
    }, Jt = function(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }, Ti = function(t) {
      return Jt(t) && typeof t.style < "u" && !Fn(t);
    }, Fn = function(t) {
      return typeof t.className == "object";
    }, Fd = function(t) {
      return t.tagName === "LI";
    }, Ed = function(t) {
      return t.tagName === "OL";
    }, Qd = function(t) {
      return t.tagName === "INPUT";
    }, Ud = function(t) {
      return t.tagName === "HTML";
    }, Ao = function(t) {
      return t.tagName === "svg";
    }, Si = function(t) {
      return t.tagName === "BODY";
    }, eo = function(t) {
      return t.tagName === "CANVAS";
    }, to = function(t) {
      return t.tagName === "VIDEO";
    }, Hi = function(t) {
      return t.tagName === "IMG";
    }, ro = function(t) {
      return t.tagName === "IFRAME";
    }, no = function(t) {
      return t.tagName === "STYLE";
    }, bd = function(t) {
      return t.tagName === "SCRIPT";
    }, En = function(t) {
      return t.tagName === "TEXTAREA";
    }, Qn = function(t) {
      return t.tagName === "SELECT";
    }, io = function(t) {
      return t.tagName === "SLOT";
    }, so = function(t) {
      return t.tagName.indexOf("-") > 0;
    }, Id = (function() {
      function t() {
        this.counters = {};
      }
      return t.prototype.getCounterValue = function(e) {
        var s = this.counters[e];
        return s && s.length ? s[s.length - 1] : 1;
      }, t.prototype.getCounterValues = function(e) {
        var s = this.counters[e];
        return s || [];
      }, t.prototype.pop = function(e) {
        var s = this;
        e.forEach(function(r) {
          return s.counters[r].pop();
        });
      }, t.prototype.parse = function(e) {
        var s = this, r = e.counterIncrement, p = e.counterReset, S = !0;
        r !== null && r.forEach(function(W) {
          var X = s.counters[W.counter];
          X && W.increment !== 0 && (S = !1, X.length || X.push(1), X[Math.max(0, X.length - 1)] += W.increment);
        });
        var K = [];
        return S && p.forEach(function(W) {
          var X = s.counters[W.counter];
          K.push(W.counter), X || (X = s.counters[W.counter] = []), X.push(W.reset);
        }), K;
      }, t;
    })(), ao = {
      integers: [
        1e3,
        900,
        500,
        400,
        100,
        90,
        50,
        40,
        10,
        9,
        5,
        4,
        1
      ],
      values: [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I"
      ]
    }, oo = {
      integers: [
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        900,
        800,
        700,
        600,
        500,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "Ք",
        "Փ",
        "Ւ",
        "Ց",
        "Ր",
        "Տ",
        "Վ",
        "Ս",
        "Ռ",
        "Ջ",
        "Պ",
        "Չ",
        "Ո",
        "Շ",
        "Ն",
        "Յ",
        "Մ",
        "Ճ",
        "Ղ",
        "Ձ",
        "Հ",
        "Կ",
        "Ծ",
        "Խ",
        "Լ",
        "Ի",
        "Ժ",
        "Թ",
        "Ը",
        "Է",
        "Զ",
        "Ե",
        "Դ",
        "Գ",
        "Բ",
        "Ա"
      ]
    }, _d = {
      integers: [
        1e4,
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        19,
        18,
        17,
        16,
        15,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "י׳",
        "ט׳",
        "ח׳",
        "ז׳",
        "ו׳",
        "ה׳",
        "ד׳",
        "ג׳",
        "ב׳",
        "א׳",
        "ת",
        "ש",
        "ר",
        "ק",
        "צ",
        "פ",
        "ע",
        "ס",
        "נ",
        "מ",
        "ל",
        "כ",
        "יט",
        "יח",
        "יז",
        "טז",
        "טו",
        "י",
        "ט",
        "ח",
        "ז",
        "ו",
        "ה",
        "ד",
        "ג",
        "ב",
        "א"
      ]
    }, xd = {
      integers: [
        1e4,
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        900,
        800,
        700,
        600,
        500,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "ჵ",
        "ჰ",
        "ჯ",
        "ჴ",
        "ხ",
        "ჭ",
        "წ",
        "ძ",
        "ც",
        "ჩ",
        "შ",
        "ყ",
        "ღ",
        "ქ",
        "ფ",
        "ჳ",
        "ტ",
        "ს",
        "რ",
        "ჟ",
        "პ",
        "ო",
        "ჲ",
        "ნ",
        "მ",
        "ლ",
        "კ",
        "ი",
        "თ",
        "ჱ",
        "ზ",
        "ვ",
        "ე",
        "დ",
        "გ",
        "ბ",
        "ა"
      ]
    }, Yt = function(t, e, s, r, p, S) {
      return t < e || t > s ? Hr(t, p, S.length > 0) : r.integers.reduce(function(K, W, X) {
        for (; t >= W; )
          t -= W, K += r.values[X];
        return K;
      }, "") + S;
    }, lo = function(t, e, s, r) {
      var p = "";
      do
        s || t--, p = r(t) + p, t /= e;
      while (t * e >= e);
      return p;
    }, ie = function(t, e, s, r, p) {
      var S = s - e + 1;
      return (t < 0 ? "-" : "") + (lo(Math.abs(t), S, r, function(K) {
        return _(Math.floor(K % S) + e);
      }) + p);
    }, _t = function(t, e, s) {
      s === void 0 && (s = ". ");
      var r = e.length;
      return lo(Math.abs(t), r, !1, function(p) {
        return e[Math.floor(p % r)];
      }) + s;
    }, Zt = 1, dt = 2, pt = 4, Sr = 8, qe = function(t, e, s, r, p, S) {
      if (t < -9999 || t > 9999) return Hr(t, 4, p.length > 0);
      var K = Math.abs(t), W = p;
      if (K === 0) return e[0] + W;
      for (var X = 0; K > 0 && X <= 4; X++) {
        var nA = K % 10;
        nA === 0 && oe(S, Zt) && W !== "" ? W = e[nA] + W : nA > 1 || nA === 1 && X === 0 || nA === 1 && X === 1 && oe(S, dt) || nA === 1 && X === 1 && oe(S, pt) && t > 100 || nA === 1 && X > 1 && oe(S, Sr) ? W = e[nA] + (X > 0 ? s[X - 1] : "") + W : nA === 1 && X > 0 && (W = s[X - 1] + W), K = Math.floor(K / 10);
      }
      return (t < 0 ? r : "") + W;
    }, uo = "十百千萬", co = "拾佰仟萬", ho = "マイナス", Li = "마이너스", Hr = function(t, e, s) {
      var r = s ? ". " : "", p = s ? "、" : "", S = s ? ", " : "", K = s ? " " : "";
      switch (e) {
        case 0:
          return "•" + K;
        case 1:
          return "◦" + K;
        case 2:
          return "◾" + K;
        case 5:
          var W = ie(t, 48, 57, !0, r);
          return W.length < 4 ? "0" + W : W;
        case 4:
          return _t(t, "〇一二三四五六七八九", p);
        case 6:
          return Yt(t, 1, 3999, ao, 3, r).toLowerCase();
        case 7:
          return Yt(t, 1, 3999, ao, 3, r);
        case 8:
          return ie(t, 945, 969, !1, r);
        case 9:
          return ie(t, 97, 122, !1, r);
        case 10:
          return ie(t, 65, 90, !1, r);
        case 11:
          return ie(t, 1632, 1641, !0, r);
        case 12:
        case 49:
          return Yt(t, 1, 9999, oo, 3, r);
        case 35:
          return Yt(t, 1, 9999, oo, 3, r).toLowerCase();
        case 13:
          return ie(t, 2534, 2543, !0, r);
        case 14:
        case 30:
          return ie(t, 6112, 6121, !0, r);
        case 15:
          return _t(t, "子丑寅卯辰巳午未申酉戌亥", p);
        case 16:
          return _t(t, "甲乙丙丁戊己庚辛壬癸", p);
        case 17:
        case 48:
          return qe(t, "零一二三四五六七八九", uo, "負", p, dt | pt | Sr);
        case 47:
          return qe(t, "零壹貳參肆伍陸柒捌玖", co, "負", p, Zt | dt | pt | Sr);
        case 42:
          return qe(t, "零一二三四五六七八九", uo, "负", p, dt | pt | Sr);
        case 41:
          return qe(t, "零壹贰叁肆伍陆柒捌玖", co, "负", p, Zt | dt | pt | Sr);
        case 26:
          return qe(t, "〇一二三四五六七八九", "十百千万", ho, p, 0);
        case 25:
          return qe(t, "零壱弐参四伍六七八九", "拾百千万", ho, p, Zt | dt | pt);
        case 31:
          return qe(t, "영일이삼사오육칠팔구", "십백천만", Li, S, Zt | dt | pt);
        case 33:
          return qe(t, "零一二三四五六七八九", "十百千萬", Li, S, 0);
        case 32:
          return qe(t, "零壹貳參四五六七八九", "拾百千", Li, S, Zt | dt | pt);
        case 18:
          return ie(t, 2406, 2415, !0, r);
        case 20:
          return Yt(t, 1, 19999, xd, 3, r);
        case 21:
          return ie(t, 2790, 2799, !0, r);
        case 22:
          return ie(t, 2662, 2671, !0, r);
        case 22:
          return Yt(t, 1, 10999, _d, 3, r);
        case 23:
          return _t(t, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
        case 24:
          return _t(t, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
        case 27:
          return ie(t, 3302, 3311, !0, r);
        case 28:
          return _t(t, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", p);
        case 29:
          return _t(t, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", p);
        case 34:
          return ie(t, 3792, 3801, !0, r);
        case 37:
          return ie(t, 6160, 6169, !0, r);
        case 38:
          return ie(t, 4160, 4169, !0, r);
        case 39:
          return ie(t, 2918, 2927, !0, r);
        case 40:
          return ie(t, 1776, 1785, !0, r);
        case 43:
          return ie(t, 3046, 3055, !0, r);
        case 44:
          return ie(t, 3174, 3183, !0, r);
        case 45:
          return ie(t, 3664, 3673, !0, r);
        case 46:
          return ie(t, 3872, 3881, !0, r);
        default:
          return ie(t, 48, 57, !0, r);
      }
    }, fo = "data-html2canvas-ignore", po = (function() {
      function t(e, s, r) {
        if (this.context = e, this.options = r, this.scrolledElements = [], this.referenceElement = s, this.counters = new Id(), this.quoteDepth = 0, !s.ownerDocument) throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(s.ownerDocument.documentElement, !1);
      }
      return t.prototype.toIFrame = function(e, s) {
        var r = this, p = Td(e, s);
        if (!p.contentWindow) return Promise.reject("Unable to find iframe window");
        var S = e.defaultView.pageXOffset, K = e.defaultView.pageYOffset, W = p.contentWindow, X = W.document, nA = Ld(p).then(function() {
          return f(r, void 0, void 0, function() {
            var oA, cA;
            return a(this, function(wA) {
              switch (wA.label) {
                case 0:
                  return this.scrolledElements.forEach(Nd), W && (W.scrollTo(s.left, s.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (W.scrollY !== s.top || W.scrollX !== s.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(W.scrollX - s.left, W.scrollY - s.top, 0, 0))), oA = this.options.onclone, cA = this.clonedReferenceElement, typeof cA > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : X.fonts && X.fonts.ready ? [4, X.fonts.ready] : [3, 2];
                case 1:
                  wA.sent(), wA.label = 2;
                case 2:
                  return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, Hd(X)] : [3, 4];
                case 3:
                  wA.sent(), wA.label = 4;
                case 4:
                  return typeof oA == "function" ? [2, Promise.resolve().then(function() {
                    return oA(X, cA);
                  }).then(function() {
                    return p;
                  })] : [2, p];
              }
            });
          });
        });
        return X.open(), X.write(Rd(document.doctype) + "<html></html>"), Od(this.referenceElement.ownerDocument, S, K), X.replaceChild(X.adoptNode(this.documentElement), X.documentElement), X.close(), nA;
      }, t.prototype.createElementClone = function(e) {
        if (wi(e, 2)) debugger;
        if (eo(e)) return this.createCanvasClone(e);
        if (to(e)) return this.createVideoClone(e);
        if (no(e)) return this.createStyleClone(e);
        var s = e.cloneNode(!1);
        return Hi(s) && (Hi(e) && e.currentSrc && e.currentSrc !== e.src && (s.src = e.currentSrc, s.srcset = ""), s.loading === "lazy" && (s.loading = "eager")), so(s) ? this.createCustomElementClone(s) : s;
      }, t.prototype.createCustomElementClone = function(e) {
        var s = document.createElement("html2canvascustomelement");
        return Di(e.style, s), s;
      }, t.prototype.createStyleClone = function(e) {
        try {
          var s = e.sheet;
          if (s && s.cssRules) {
            var r = [].slice.call(s.cssRules, 0).reduce(function(S, K) {
              return K && typeof K.cssText == "string" ? S + K.cssText : S;
            }, ""), p = e.cloneNode(!1);
            return p.textContent = r, p;
          }
        } catch (S) {
          if (this.context.logger.error("Unable to access cssRules property", S), S.name !== "SecurityError") throw S;
        }
        return e.cloneNode(!1);
      }, t.prototype.createCanvasClone = function(e) {
        var s;
        if (this.options.inlineImages && e.ownerDocument) {
          var r = e.ownerDocument.createElement("img");
          try {
            return r.src = e.toDataURL(), r;
          } catch {
            this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
          }
        }
        var p = e.cloneNode(!1);
        try {
          p.width = e.width, p.height = e.height;
          var S = e.getContext("2d"), K = p.getContext("2d");
          if (K) if (!this.options.allowTaint && S) K.putImageData(S.getImageData(0, 0, e.width, e.height), 0, 0);
          else {
            var W = (s = e.getContext("webgl2")) !== null && s !== void 0 ? s : e.getContext("webgl");
            if (W) {
              var X = W.getContextAttributes();
              X?.preserveDrawingBuffer === !1 && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e);
            }
            K.drawImage(e, 0, 0);
          }
          return p;
        } catch {
          this.context.logger.info("Unable to clone canvas as it is tainted", e);
        }
        return p;
      }, t.prototype.createVideoClone = function(e) {
        var s = e.ownerDocument.createElement("canvas");
        s.width = e.offsetWidth, s.height = e.offsetHeight;
        var r = s.getContext("2d");
        try {
          return r && (r.drawImage(e, 0, 0, s.width, s.height), this.options.allowTaint || r.getImageData(0, 0, s.width, s.height)), s;
        } catch {
          this.context.logger.info("Unable to clone video as it is tainted", e);
        }
        var p = e.ownerDocument.createElement("canvas");
        return p.width = e.offsetWidth, p.height = e.offsetHeight, p;
      }, t.prototype.appendChildNode = function(e, s, r) {
        (!Jt(s) || !bd(s) && !s.hasAttribute(fo) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(s))) && (!this.options.copyStyles || !Jt(s) || !no(s)) && e.appendChild(this.cloneNode(s, r));
      }, t.prototype.cloneChildNodes = function(e, s, r) {
        for (var p = this, S = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild; S; S = S.nextSibling) if (Jt(S) && io(S) && typeof S.assignedNodes == "function") {
          var K = S.assignedNodes();
          K.length && K.forEach(function(W) {
            return p.appendChildNode(s, W, r);
          });
        } else this.appendChildNode(s, S, r);
      }, t.prototype.cloneNode = function(e, s) {
        if ($a(e)) return document.createTextNode(e.data);
        if (!e.ownerDocument) return e.cloneNode(!1);
        var r = e.ownerDocument.defaultView;
        if (r && Jt(e) && (Ti(e) || Fn(e))) {
          var p = this.createElementClone(e);
          p.style.transitionProperty = "none";
          var S = r.getComputedStyle(e), K = r.getComputedStyle(e, ":before"), W = r.getComputedStyle(e, ":after");
          this.referenceElement === e && Ti(p) && (this.clonedReferenceElement = p), Si(p) && Md(p);
          var X = this.counters.parse(new Ia(this.context, S)), nA = this.resolvePseudoContent(e, p, K, Lr.BEFORE);
          so(e) && (s = !0), to(e) || this.cloneChildNodes(e, p, s), nA && p.insertBefore(nA, p.firstChild);
          var oA = this.resolvePseudoContent(e, p, W, Lr.AFTER);
          return oA && p.appendChild(oA), this.counters.pop(X), (S && (this.options.copyStyles || Fn(e)) && !ro(e) || s) && Di(S, p), (e.scrollTop !== 0 || e.scrollLeft !== 0) && this.scrolledElements.push([
            p,
            e.scrollLeft,
            e.scrollTop
          ]), (En(e) || Qn(e)) && (En(p) || Qn(p)) && (p.value = e.value), p;
        }
        return e.cloneNode(!1);
      }, t.prototype.resolvePseudoContent = function(e, s, r, p) {
        var S = this;
        if (r) {
          var K = r.content, W = s.ownerDocument;
          if (!(!W || !K || K === "none" || K === "-moz-alt-content" || r.display === "none")) {
            this.counters.parse(new Ia(this.context, r));
            var X = new _f(this.context, r), nA = W.createElement("html2canvaspseudoelement");
            Di(r, nA), X.content.forEach(function(cA) {
              if (cA.type === 0) nA.appendChild(W.createTextNode(cA.value));
              else if (cA.type === 22) {
                var wA = W.createElement("img");
                wA.src = cA.value, wA.style.opacity = "1", nA.appendChild(wA);
              } else if (cA.type === 18) {
                if (cA.name === "attr") {
                  var TA = cA.values.filter(JA);
                  TA.length && nA.appendChild(W.createTextNode(e.getAttribute(TA[0].value) || ""));
                } else if (cA.name === "counter") {
                  var EA = cA.values.filter(jt), IA = EA[0], PA = EA[1];
                  if (IA && JA(IA)) {
                    var OA = S.counters.getCounterValue(IA.value), DA = PA && JA(PA) ? gi.parse(S.context, PA.value) : 3;
                    nA.appendChild(W.createTextNode(Hr(OA, DA, !1)));
                  }
                } else if (cA.name === "counters") {
                  var $A = cA.values.filter(jt), IA = $A[0], jA = $A[1], PA = $A[2];
                  if (IA && JA(IA)) {
                    var kA = S.counters.getCounterValues(IA.value), HA = PA && JA(PA) ? gi.parse(S.context, PA.value) : 3, WA = jA && jA.type === 0 ? jA.value : "", XA = kA.map(function(ye) {
                      return Hr(ye, HA, !1);
                    }).join(WA);
                    nA.appendChild(W.createTextNode(XA));
                  }
                }
              } else if (cA.type === 20) switch (cA.value) {
                case "open-quote":
                  nA.appendChild(W.createTextNode(ba(X.quotes, S.quoteDepth++, !0)));
                  break;
                case "close-quote":
                  nA.appendChild(W.createTextNode(ba(X.quotes, --S.quoteDepth, !1)));
                  break;
                default:
                  nA.appendChild(W.createTextNode(cA.value));
              }
            }), nA.className = Ri + " " + Oi;
            var oA = p === Lr.BEFORE ? " " + Ri : " " + Oi;
            return Fn(s) ? s.className.baseValue += oA : s.className += oA, nA;
          }
        }
      }, t.destroy = function(e) {
        return e.parentNode ? (e.parentNode.removeChild(e), !0) : !1;
      }, t;
    })(), Lr;
    (function(t) {
      t[t.BEFORE = 0] = "BEFORE", t[t.AFTER = 1] = "AFTER";
    })(Lr || (Lr = {}));
    var Td = function(t, e) {
      var s = t.createElement("iframe");
      return s.className = "html2canvas-container", s.style.visibility = "hidden", s.style.position = "fixed", s.style.left = "-10000px", s.style.top = "0px", s.style.border = "0", s.width = e.width.toString(), s.height = e.height.toString(), s.scrolling = "no", s.setAttribute(fo, "true"), t.body.appendChild(s), s;
    }, Sd = function(t) {
      return new Promise(function(e) {
        if (t.complete) {
          e();
          return;
        }
        if (!t.src) {
          e();
          return;
        }
        t.onload = e, t.onerror = e;
      });
    }, Hd = function(t) {
      return Promise.all([].slice.call(t.images, 0).map(Sd));
    }, Ld = function(t) {
      return new Promise(function(e, s) {
        var r = t.contentWindow;
        if (!r) return s("No window assigned for iframe");
        var p = r.document;
        r.onload = t.onload = function() {
          r.onload = t.onload = null;
          var S = setInterval(function() {
            p.body.childNodes.length > 0 && p.readyState === "complete" && (clearInterval(S), e(t));
          }, 50);
        };
      });
    }, Dd = [
      "all",
      "d",
      "content"
    ], Di = function(t, e) {
      for (var s = t.length - 1; s >= 0; s--) {
        var r = t.item(s);
        Dd.indexOf(r) === -1 && e.style.setProperty(r, t.getPropertyValue(r));
      }
      return e;
    }, Rd = function(t) {
      var e = "";
      return t && (e += "<!DOCTYPE ", t.name && (e += t.name), t.internalSubset && (e += t.internalSubset), t.publicId && (e += '"' + t.publicId + '"'), t.systemId && (e += '"' + t.systemId + '"'), e += ">"), e;
    }, Od = function(t, e, s) {
      t && t.defaultView && (e !== t.defaultView.pageXOffset || s !== t.defaultView.pageYOffset) && t.defaultView.scrollTo(e, s);
    }, Nd = function(t) {
      var e = t[0], s = t[1], r = t[2];
      e.scrollLeft = s, e.scrollTop = r;
    }, kd = ":before", Kd = ":after", Ri = "___html2canvas___pseudoelement_before", Oi = "___html2canvas___pseudoelement_after", go = `{
    content: "" !important;
    display: none !important;
}`, Md = function(t) {
      Pd(t, "." + Ri + kd + go + `
         .` + Oi + Kd + go);
    }, Pd = function(t, e) {
      var s = t.ownerDocument;
      if (s) {
        var r = s.createElement("style");
        r.textContent = e, t.appendChild(r);
      }
    }, wo = (function() {
      function t() {
      }
      return t.getOrigin = function(e) {
        var s = t._link;
        return s ? (s.href = e, s.href = s.href, s.protocol + s.hostname + s.port) : "about:blank";
      }, t.isSameOrigin = function(e) {
        return t.getOrigin(e) === t._origin;
      }, t.setContext = function(e) {
        t._link = e.document.createElement("a"), t._origin = t.getOrigin(e.location.href);
      }, t._origin = "about:blank", t;
    })(), Gd = (function() {
      function t(e, s) {
        this.context = e, this._options = s, this._cache = {};
      }
      return t.prototype.addImage = function(e) {
        var s = Promise.resolve();
        return this.has(e) || (ki(e) || jd(e)) && (this._cache[e] = this.loadImage(e)).catch(function() {
        }), s;
      }, t.prototype.match = function(e) {
        return this._cache[e];
      }, t.prototype.loadImage = function(e) {
        return f(this, void 0, void 0, function() {
          var s, r, p, S, K = this;
          return a(this, function(W) {
            switch (W.label) {
              case 0:
                return s = wo.isSameOrigin(e), r = !Ni(e) && this._options.useCORS === !0 && ce.SUPPORT_CORS_IMAGES && !s, p = !Ni(e) && !s && !ki(e) && typeof this._options.proxy == "string" && ce.SUPPORT_CORS_XHR && !r, !s && this._options.allowTaint === !1 && !Ni(e) && !ki(e) && !p && !r ? [2] : (S = e, p ? [4, this.proxy(S)] : [3, 2]);
              case 1:
                S = W.sent(), W.label = 2;
              case 2:
                return this.context.logger.debug("Added image " + e.substring(0, 256)), [4, new Promise(function(X, nA) {
                  var oA = new Image();
                  oA.onload = function() {
                    return X(oA);
                  }, oA.onerror = nA, (zd(S) || r) && (oA.crossOrigin = "anonymous"), oA.src = S, oA.complete === !0 && setTimeout(function() {
                    return X(oA);
                  }, 500), K._options.imageTimeout > 0 && setTimeout(function() {
                    return nA("Timed out (" + K._options.imageTimeout + "ms) loading image");
                  }, K._options.imageTimeout);
                })];
              case 3:
                return [2, W.sent()];
            }
          });
        });
      }, t.prototype.has = function(e) {
        return typeof this._cache[e] < "u";
      }, t.prototype.keys = function() {
        return Promise.resolve(Object.keys(this._cache));
      }, t.prototype.proxy = function(e) {
        var s = this, r = this._options.proxy;
        if (!r) throw new Error("No proxy defined");
        var p = e.substring(0, 256);
        return new Promise(function(S, K) {
          var W = ce.SUPPORT_RESPONSE_TYPE ? "blob" : "text", X = new XMLHttpRequest();
          X.onload = function() {
            if (X.status === 200) if (W === "text") S(X.response);
            else {
              var cA = new FileReader();
              cA.addEventListener("load", function() {
                return S(cA.result);
              }, !1), cA.addEventListener("error", function(wA) {
                return K(wA);
              }, !1), cA.readAsDataURL(X.response);
            }
            else K("Failed to proxy resource " + p + " with status code " + X.status);
          }, X.onerror = K;
          var nA = r.indexOf("?") > -1 ? "&" : "?";
          if (X.open("GET", "" + r + nA + "url=" + encodeURIComponent(e) + "&responseType=" + W), W !== "text" && X instanceof XMLHttpRequest && (X.responseType = W), s._options.imageTimeout) {
            var oA = s._options.imageTimeout;
            X.timeout = oA, X.ontimeout = function() {
              return K("Timed out (" + oA + "ms) proxying " + p);
            };
          }
          X.send();
        });
      }, t;
    })(), Vd = /^data:image\/svg\+xml/i, Wd = /^data:image\/.*;base64,/i, Xd = /^data:image\/.*/i, jd = function(t) {
      return ce.SUPPORT_SVG_DRAWING || !Jd(t);
    }, Ni = function(t) {
      return Xd.test(t);
    }, zd = function(t) {
      return Wd.test(t);
    }, ki = function(t) {
      return t.substr(0, 4) === "blob";
    }, Jd = function(t) {
      return t.substr(-3).toLowerCase() === "svg" || Vd.test(t);
    }, SA = (function() {
      function t(e, s) {
        this.type = 0, this.x = e, this.y = s;
      }
      return t.prototype.add = function(e, s) {
        return new t(this.x + e, this.y + s);
      }, t;
    })(), qt = function(t, e, s) {
      return new SA(t.x + (e.x - t.x) * s, t.y + (e.y - t.y) * s);
    }, Un = (function() {
      function t(e, s, r, p) {
        this.type = 1, this.start = e, this.startControl = s, this.endControl = r, this.end = p;
      }
      return t.prototype.subdivide = function(e, s) {
        var r = qt(this.start, this.startControl, e), p = qt(this.startControl, this.endControl, e), S = qt(this.endControl, this.end, e), K = qt(r, p, e), W = qt(p, S, e), X = qt(K, W, e);
        return s ? new t(this.start, r, K, X) : new t(X, W, S, this.end);
      }, t.prototype.add = function(e, s) {
        return new t(this.start.add(e, s), this.startControl.add(e, s), this.endControl.add(e, s), this.end.add(e, s));
      }, t.prototype.reverse = function() {
        return new t(this.end, this.endControl, this.startControl, this.start);
      }, t;
    })(), Se = function(t) {
      return t.type === 1;
    }, Yd = /* @__PURE__ */ (function() {
      function t(e) {
        var s = e.styles, r = e.bounds, p = br(s.borderTopLeftRadius, r.width, r.height), S = p[0], K = p[1], W = br(s.borderTopRightRadius, r.width, r.height), X = W[0], nA = W[1], oA = br(s.borderBottomRightRadius, r.width, r.height), cA = oA[0], wA = oA[1], TA = br(s.borderBottomLeftRadius, r.width, r.height), EA = TA[0], IA = TA[1], PA = [];
        PA.push((S + X) / r.width), PA.push((EA + cA) / r.width), PA.push((K + IA) / r.height), PA.push((nA + wA) / r.height);
        var OA = Math.max.apply(Math, PA);
        OA > 1 && (S /= OA, K /= OA, X /= OA, nA /= OA, cA /= OA, wA /= OA, EA /= OA, IA /= OA);
        var DA = r.width - X, $A = r.height - wA, jA = r.width - cA, kA = r.height - IA, HA = s.borderTopWidth, WA = s.borderRightWidth, XA = s.borderBottomWidth, KA = s.borderLeftWidth, ae = qA(s.paddingTop, e.bounds.width), ye = qA(s.paddingRight, e.bounds.width), Ie = qA(s.paddingBottom, e.bounds.width), YA = qA(s.paddingLeft, e.bounds.width);
        this.topLeftBorderDoubleOuterBox = S > 0 || K > 0 ? ee(r.left + KA / 3, r.top + HA / 3, S - KA / 3, K - HA / 3, zA.TOP_LEFT) : new SA(r.left + KA / 3, r.top + HA / 3), this.topRightBorderDoubleOuterBox = S > 0 || K > 0 ? ee(r.left + DA, r.top + HA / 3, X - WA / 3, nA - HA / 3, zA.TOP_RIGHT) : new SA(r.left + r.width - WA / 3, r.top + HA / 3), this.bottomRightBorderDoubleOuterBox = cA > 0 || wA > 0 ? ee(r.left + jA, r.top + $A, cA - WA / 3, wA - XA / 3, zA.BOTTOM_RIGHT) : new SA(r.left + r.width - WA / 3, r.top + r.height - XA / 3), this.bottomLeftBorderDoubleOuterBox = EA > 0 || IA > 0 ? ee(r.left + KA / 3, r.top + kA, EA - KA / 3, IA - XA / 3, zA.BOTTOM_LEFT) : new SA(r.left + KA / 3, r.top + r.height - XA / 3), this.topLeftBorderDoubleInnerBox = S > 0 || K > 0 ? ee(r.left + KA * 2 / 3, r.top + HA * 2 / 3, S - KA * 2 / 3, K - HA * 2 / 3, zA.TOP_LEFT) : new SA(r.left + KA * 2 / 3, r.top + HA * 2 / 3), this.topRightBorderDoubleInnerBox = S > 0 || K > 0 ? ee(r.left + DA, r.top + HA * 2 / 3, X - WA * 2 / 3, nA - HA * 2 / 3, zA.TOP_RIGHT) : new SA(r.left + r.width - WA * 2 / 3, r.top + HA * 2 / 3), this.bottomRightBorderDoubleInnerBox = cA > 0 || wA > 0 ? ee(r.left + jA, r.top + $A, cA - WA * 2 / 3, wA - XA * 2 / 3, zA.BOTTOM_RIGHT) : new SA(r.left + r.width - WA * 2 / 3, r.top + r.height - XA * 2 / 3), this.bottomLeftBorderDoubleInnerBox = EA > 0 || IA > 0 ? ee(r.left + KA * 2 / 3, r.top + kA, EA - KA * 2 / 3, IA - XA * 2 / 3, zA.BOTTOM_LEFT) : new SA(r.left + KA * 2 / 3, r.top + r.height - XA * 2 / 3), this.topLeftBorderStroke = S > 0 || K > 0 ? ee(r.left + KA / 2, r.top + HA / 2, S - KA / 2, K - HA / 2, zA.TOP_LEFT) : new SA(r.left + KA / 2, r.top + HA / 2), this.topRightBorderStroke = S > 0 || K > 0 ? ee(r.left + DA, r.top + HA / 2, X - WA / 2, nA - HA / 2, zA.TOP_RIGHT) : new SA(r.left + r.width - WA / 2, r.top + HA / 2), this.bottomRightBorderStroke = cA > 0 || wA > 0 ? ee(r.left + jA, r.top + $A, cA - WA / 2, wA - XA / 2, zA.BOTTOM_RIGHT) : new SA(r.left + r.width - WA / 2, r.top + r.height - XA / 2), this.bottomLeftBorderStroke = EA > 0 || IA > 0 ? ee(r.left + KA / 2, r.top + kA, EA - KA / 2, IA - XA / 2, zA.BOTTOM_LEFT) : new SA(r.left + KA / 2, r.top + r.height - XA / 2), this.topLeftBorderBox = S > 0 || K > 0 ? ee(r.left, r.top, S, K, zA.TOP_LEFT) : new SA(r.left, r.top), this.topRightBorderBox = X > 0 || nA > 0 ? ee(r.left + DA, r.top, X, nA, zA.TOP_RIGHT) : new SA(r.left + r.width, r.top), this.bottomRightBorderBox = cA > 0 || wA > 0 ? ee(r.left + jA, r.top + $A, cA, wA, zA.BOTTOM_RIGHT) : new SA(r.left + r.width, r.top + r.height), this.bottomLeftBorderBox = EA > 0 || IA > 0 ? ee(r.left, r.top + kA, EA, IA, zA.BOTTOM_LEFT) : new SA(r.left, r.top + r.height), this.topLeftPaddingBox = S > 0 || K > 0 ? ee(r.left + KA, r.top + HA, Math.max(0, S - KA), Math.max(0, K - HA), zA.TOP_LEFT) : new SA(r.left + KA, r.top + HA), this.topRightPaddingBox = X > 0 || nA > 0 ? ee(r.left + Math.min(DA, r.width - WA), r.top + HA, DA > r.width + WA ? 0 : Math.max(0, X - WA), Math.max(0, nA - HA), zA.TOP_RIGHT) : new SA(r.left + r.width - WA, r.top + HA), this.bottomRightPaddingBox = cA > 0 || wA > 0 ? ee(r.left + Math.min(jA, r.width - KA), r.top + Math.min($A, r.height - XA), Math.max(0, cA - WA), Math.max(0, wA - XA), zA.BOTTOM_RIGHT) : new SA(r.left + r.width - WA, r.top + r.height - XA), this.bottomLeftPaddingBox = EA > 0 || IA > 0 ? ee(r.left + KA, r.top + Math.min(kA, r.height - XA), Math.max(0, EA - KA), Math.max(0, IA - XA), zA.BOTTOM_LEFT) : new SA(r.left + KA, r.top + r.height - XA), this.topLeftContentBox = S > 0 || K > 0 ? ee(r.left + KA + YA, r.top + HA + ae, Math.max(0, S - (KA + YA)), Math.max(0, K - (HA + ae)), zA.TOP_LEFT) : new SA(r.left + KA + YA, r.top + HA + ae), this.topRightContentBox = X > 0 || nA > 0 ? ee(r.left + Math.min(DA, r.width + KA + YA), r.top + HA + ae, DA > r.width + KA + YA ? 0 : X - KA + YA, nA - (HA + ae), zA.TOP_RIGHT) : new SA(r.left + r.width - (WA + ye), r.top + HA + ae), this.bottomRightContentBox = cA > 0 || wA > 0 ? ee(r.left + Math.min(jA, r.width - (KA + YA)), r.top + Math.min($A, r.height + HA + ae), Math.max(0, cA - (WA + ye)), wA - (XA + Ie), zA.BOTTOM_RIGHT) : new SA(r.left + r.width - (WA + ye), r.top + r.height - (XA + Ie)), this.bottomLeftContentBox = EA > 0 || IA > 0 ? ee(r.left + KA + YA, r.top + kA, Math.max(0, EA - (KA + YA)), IA - (XA + Ie), zA.BOTTOM_LEFT) : new SA(r.left + KA + YA, r.top + r.height - (XA + Ie));
      }
      return t;
    })(), zA;
    (function(t) {
      t[t.TOP_LEFT = 0] = "TOP_LEFT", t[t.TOP_RIGHT = 1] = "TOP_RIGHT", t[t.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", t[t.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
    })(zA || (zA = {}));
    var ee = function(t, e, s, r, p) {
      var S = 4 * ((Math.sqrt(2) - 1) / 3), K = s * S, W = r * S, X = t + s, nA = e + r;
      switch (p) {
        case zA.TOP_LEFT:
          return new Un(new SA(t, nA), new SA(t, nA - W), new SA(X - K, e), new SA(X, e));
        case zA.TOP_RIGHT:
          return new Un(new SA(t, e), new SA(t + K, e), new SA(X, nA - W), new SA(X, nA));
        case zA.BOTTOM_RIGHT:
          return new Un(new SA(X, e), new SA(X, e + W), new SA(t + K, nA), new SA(t, nA));
        case zA.BOTTOM_LEFT:
        default:
          return new Un(new SA(X, nA), new SA(X - K, nA), new SA(t, e + W), new SA(t, e));
      }
    }, bn = function(t) {
      return [
        t.topLeftBorderBox,
        t.topRightBorderBox,
        t.bottomRightBorderBox,
        t.bottomLeftBorderBox
      ];
    }, Zd = function(t) {
      return [
        t.topLeftContentBox,
        t.topRightContentBox,
        t.bottomRightContentBox,
        t.bottomLeftContentBox
      ];
    }, In = function(t) {
      return [
        t.topLeftPaddingBox,
        t.topRightPaddingBox,
        t.bottomRightPaddingBox,
        t.bottomLeftPaddingBox
      ];
    }, qd = /* @__PURE__ */ (function() {
      function t(e, s, r) {
        this.offsetX = e, this.offsetY = s, this.matrix = r, this.type = 0, this.target = 6;
      }
      return t;
    })(), _n = /* @__PURE__ */ (function() {
      function t(e, s) {
        this.path = e, this.target = s, this.type = 1;
      }
      return t;
    })(), $d = /* @__PURE__ */ (function() {
      function t(e) {
        this.opacity = e, this.type = 2, this.target = 6;
      }
      return t;
    })(), Ap = function(t) {
      return t.type === 0;
    }, Bo = function(t) {
      return t.type === 1;
    }, ep = function(t) {
      return t.type === 2;
    }, mo = function(t, e) {
      return t.length === e.length ? t.some(function(s, r) {
        return s === e[r];
      }) : !1;
    }, tp = function(t, e, s, r, p) {
      return t.map(function(S, K) {
        switch (K) {
          case 0:
            return S.add(e, s);
          case 1:
            return S.add(e + r, s);
          case 2:
            return S.add(e + r, s + p);
          case 3:
            return S.add(e, s + p);
        }
        return S;
      });
    }, vo = /* @__PURE__ */ (function() {
      function t(e) {
        this.element = e, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
      }
      return t;
    })(), yo = (function() {
      function t(e, s) {
        if (this.container = e, this.parent = s, this.effects = [], this.curves = new Yd(this.container), this.container.styles.opacity < 1 && this.effects.push(new $d(this.container.styles.opacity)), this.container.styles.transform !== null) {
          var r = this.container.bounds.left + this.container.styles.transformOrigin[0].number, p = this.container.bounds.top + this.container.styles.transformOrigin[1].number, S = this.container.styles.transform;
          this.effects.push(new qd(r, p, S));
        }
        if (this.container.styles.overflowX !== 0) {
          var K = bn(this.curves), W = In(this.curves);
          mo(K, W) ? this.effects.push(new _n(K, 6)) : (this.effects.push(new _n(K, 2)), this.effects.push(new _n(W, 4)));
        }
      }
      return t.prototype.getEffects = function(e) {
        for (var s = [2, 3].indexOf(this.container.styles.position) === -1, r = this.parent, p = this.effects.slice(0); r; ) {
          var S = r.effects.filter(function(X) {
            return !Bo(X);
          });
          if (s || r.container.styles.position !== 0 || !r.parent) {
            if (p.unshift.apply(p, S), s = [2, 3].indexOf(r.container.styles.position) === -1, r.container.styles.overflowX !== 0) {
              var K = bn(r.curves), W = In(r.curves);
              mo(K, W) || p.unshift(new _n(W, 6));
            }
          } else p.unshift.apply(p, S);
          r = r.parent;
        }
        return p.filter(function(X) {
          return oe(X.target, e);
        });
      }, t;
    })(), Ki = function(t, e, s, r) {
      t.container.elements.forEach(function(p) {
        var S = oe(p.flags, 4), K = oe(p.flags, 2), W = new yo(p, t);
        oe(p.styles.display, 2048) && r.push(W);
        var X = oe(p.flags, 8) ? [] : r;
        if (S || K) {
          var nA = S || p.styles.isPositioned() ? s : e, oA = new vo(W);
          if (p.styles.isPositioned() || p.styles.opacity < 1 || p.styles.isTransformed()) {
            var cA = p.styles.zIndex.order;
            if (cA < 0) {
              var wA = 0;
              nA.negativeZIndex.some(function(EA, IA) {
                return cA > EA.element.container.styles.zIndex.order ? (wA = IA, !1) : wA > 0;
              }), nA.negativeZIndex.splice(wA, 0, oA);
            } else if (cA > 0) {
              var TA = 0;
              nA.positiveZIndex.some(function(EA, IA) {
                return cA >= EA.element.container.styles.zIndex.order ? (TA = IA + 1, !1) : TA > 0;
              }), nA.positiveZIndex.splice(TA, 0, oA);
            } else nA.zeroOrAutoZIndexOrTransformedOrOpacity.push(oA);
          } else p.styles.isFloating() ? nA.nonPositionedFloats.push(oA) : nA.nonPositionedInlineLevel.push(oA);
          Ki(W, oA, S ? oA : s, X);
        } else
          p.styles.isInlineLevel() ? e.inlineLevel.push(W) : e.nonInlineLevel.push(W), Ki(W, e, s, X);
        oe(p.flags, 8) && Co(p, X);
      });
    }, Co = function(t, e) {
      for (var s = t instanceof _i ? t.start : 1, r = t instanceof _i ? t.reversed : !1, p = 0; p < e.length; p++) {
        var S = e[p];
        S.container instanceof Xa && typeof S.container.value == "number" && S.container.value !== 0 && (s = S.container.value), S.listValue = Hr(s, S.container.styles.listStyleType, !0), s += r ? -1 : 1;
      }
    }, rp = function(t) {
      var e = new yo(t, null), s = new vo(e), r = [];
      return Ki(e, s, s, r), Co(e.container, r), s;
    }, Fo = function(t, e) {
      switch (e) {
        case 0:
          return He(t.topLeftBorderBox, t.topLeftPaddingBox, t.topRightBorderBox, t.topRightPaddingBox);
        case 1:
          return He(t.topRightBorderBox, t.topRightPaddingBox, t.bottomRightBorderBox, t.bottomRightPaddingBox);
        case 2:
          return He(t.bottomRightBorderBox, t.bottomRightPaddingBox, t.bottomLeftBorderBox, t.bottomLeftPaddingBox);
        default:
          return He(t.bottomLeftBorderBox, t.bottomLeftPaddingBox, t.topLeftBorderBox, t.topLeftPaddingBox);
      }
    }, np = function(t, e) {
      switch (e) {
        case 0:
          return He(t.topLeftBorderBox, t.topLeftBorderDoubleOuterBox, t.topRightBorderBox, t.topRightBorderDoubleOuterBox);
        case 1:
          return He(t.topRightBorderBox, t.topRightBorderDoubleOuterBox, t.bottomRightBorderBox, t.bottomRightBorderDoubleOuterBox);
        case 2:
          return He(t.bottomRightBorderBox, t.bottomRightBorderDoubleOuterBox, t.bottomLeftBorderBox, t.bottomLeftBorderDoubleOuterBox);
        default:
          return He(t.bottomLeftBorderBox, t.bottomLeftBorderDoubleOuterBox, t.topLeftBorderBox, t.topLeftBorderDoubleOuterBox);
      }
    }, ip = function(t, e) {
      switch (e) {
        case 0:
          return He(t.topLeftBorderDoubleInnerBox, t.topLeftPaddingBox, t.topRightBorderDoubleInnerBox, t.topRightPaddingBox);
        case 1:
          return He(t.topRightBorderDoubleInnerBox, t.topRightPaddingBox, t.bottomRightBorderDoubleInnerBox, t.bottomRightPaddingBox);
        case 2:
          return He(t.bottomRightBorderDoubleInnerBox, t.bottomRightPaddingBox, t.bottomLeftBorderDoubleInnerBox, t.bottomLeftPaddingBox);
        default:
          return He(t.bottomLeftBorderDoubleInnerBox, t.bottomLeftPaddingBox, t.topLeftBorderDoubleInnerBox, t.topLeftPaddingBox);
      }
    }, sp = function(t, e) {
      switch (e) {
        case 0:
          return xn(t.topLeftBorderStroke, t.topRightBorderStroke);
        case 1:
          return xn(t.topRightBorderStroke, t.bottomRightBorderStroke);
        case 2:
          return xn(t.bottomRightBorderStroke, t.bottomLeftBorderStroke);
        default:
          return xn(t.bottomLeftBorderStroke, t.topLeftBorderStroke);
      }
    }, xn = function(t, e) {
      var s = [];
      return Se(t) ? s.push(t.subdivide(0.5, !1)) : s.push(t), Se(e) ? s.push(e.subdivide(0.5, !0)) : s.push(e), s;
    }, He = function(t, e, s, r) {
      var p = [];
      return Se(t) ? p.push(t.subdivide(0.5, !1)) : p.push(t), Se(s) ? p.push(s.subdivide(0.5, !0)) : p.push(s), Se(r) ? p.push(r.subdivide(0.5, !0).reverse()) : p.push(r), Se(e) ? p.push(e.subdivide(0.5, !1).reverse()) : p.push(e), p;
    }, Eo = function(t) {
      var e = t.bounds, s = t.styles;
      return e.add(s.borderLeftWidth, s.borderTopWidth, -(s.borderRightWidth + s.borderLeftWidth), -(s.borderTopWidth + s.borderBottomWidth));
    }, Tn = function(t) {
      var e = t.styles, s = t.bounds, r = qA(e.paddingLeft, s.width), p = qA(e.paddingRight, s.width), S = qA(e.paddingTop, s.width), K = qA(e.paddingBottom, s.width);
      return s.add(r + e.borderLeftWidth, S + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + r + p), -(e.borderTopWidth + e.borderBottomWidth + S + K));
    }, ap = function(t, e) {
      return t === 0 ? e.bounds : t === 2 ? Tn(e) : Eo(e);
    }, op = function(t, e) {
      return t === 0 ? e.bounds : t === 2 ? Tn(e) : Eo(e);
    }, Mi = function(t, e, s) {
      var r = ap(Ar(t.styles.backgroundOrigin, e), t), p = op(Ar(t.styles.backgroundClip, e), t), S = lp(Ar(t.styles.backgroundSize, e), s, r), K = S[0], W = S[1], X = br(Ar(t.styles.backgroundPosition, e), r.width - K, r.height - W);
      return [
        up(Ar(t.styles.backgroundRepeat, e), X, S, r, p),
        Math.round(r.left + X[0]),
        Math.round(r.top + X[1]),
        K,
        W
      ];
    }, $t = function(t) {
      return JA(t) && t.value === zt.AUTO;
    }, Sn = function(t) {
      return typeof t == "number";
    }, lp = function(t, e, s) {
      var r = e[0], p = e[1], S = e[2], K = t[0], W = t[1];
      if (!K) return [0, 0];
      if (se(K) && W && se(W)) return [qA(K, s.width), qA(W, s.height)];
      var X = Sn(S);
      if (JA(K) && (K.value === zt.CONTAIN || K.value === zt.COVER))
        return Sn(S) ? s.width / s.height < S != (K.value === zt.COVER) ? [s.width, s.width / S] : [s.height * S, s.height] : [s.width, s.height];
      var nA = Sn(r), oA = Sn(p), cA = nA || oA;
      if ($t(K) && (!W || $t(W)))
        return nA && oA ? [r, p] : !X && !cA ? [s.width, s.height] : cA && X ? [nA ? r : p * S, oA ? p : r / S] : [nA ? r : s.width, oA ? p : s.height];
      if (X) {
        var wA = 0, TA = 0;
        return se(K) ? wA = qA(K, s.width) : se(W) && (TA = qA(W, s.height)), $t(K) ? wA = TA * S : (!W || $t(W)) && (TA = wA / S), [wA, TA];
      }
      var EA = null, IA = null;
      if (se(K) ? EA = qA(K, s.width) : W && se(W) && (IA = qA(W, s.height)), EA !== null && (!W || $t(W)) && (IA = nA && oA ? EA / r * p : s.height), IA !== null && $t(K) && (EA = nA && oA ? IA / p * r : s.width), EA !== null && IA !== null) return [EA, IA];
      throw new Error("Unable to calculate background-size for element");
    }, Ar = function(t, e) {
      var s = t[e];
      return typeof s > "u" ? t[0] : s;
    }, up = function(t, e, s, r, p) {
      var S = e[0], K = e[1], W = s[0], X = s[1];
      switch (t) {
        case 2:
          return [
            new SA(Math.round(r.left), Math.round(r.top + K)),
            new SA(Math.round(r.left + r.width), Math.round(r.top + K)),
            new SA(Math.round(r.left + r.width), Math.round(X + r.top + K)),
            new SA(Math.round(r.left), Math.round(X + r.top + K))
          ];
        case 3:
          return [
            new SA(Math.round(r.left + S), Math.round(r.top)),
            new SA(Math.round(r.left + S + W), Math.round(r.top)),
            new SA(Math.round(r.left + S + W), Math.round(r.height + r.top)),
            new SA(Math.round(r.left + S), Math.round(r.height + r.top))
          ];
        case 1:
          return [
            new SA(Math.round(r.left + S), Math.round(r.top + K)),
            new SA(Math.round(r.left + S + W), Math.round(r.top + K)),
            new SA(Math.round(r.left + S + W), Math.round(r.top + K + X)),
            new SA(Math.round(r.left + S), Math.round(r.top + K + X))
          ];
        default:
          return [
            new SA(Math.round(p.left), Math.round(p.top)),
            new SA(Math.round(p.left + p.width), Math.round(p.top)),
            new SA(Math.round(p.left + p.width), Math.round(p.height + p.top)),
            new SA(Math.round(p.left), Math.round(p.height + p.top))
          ];
      }
    }, cp = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", Qo = "Hidden Text", hp = (function() {
      function t(e) {
        this._data = {}, this._document = e;
      }
      return t.prototype.parseMetrics = function(e, s) {
        var r = this._document.createElement("div"), p = this._document.createElement("img"), S = this._document.createElement("span"), K = this._document.body;
        r.style.visibility = "hidden", r.style.fontFamily = e, r.style.fontSize = s, r.style.margin = "0", r.style.padding = "0", r.style.whiteSpace = "nowrap", K.appendChild(r), p.src = cp, p.width = 1, p.height = 1, p.style.margin = "0", p.style.padding = "0", p.style.verticalAlign = "baseline", S.style.fontFamily = e, S.style.fontSize = s, S.style.margin = "0", S.style.padding = "0", S.appendChild(this._document.createTextNode(Qo)), r.appendChild(S), r.appendChild(p);
        var W = p.offsetTop - S.offsetTop + 2;
        r.removeChild(S), r.appendChild(this._document.createTextNode(Qo)), r.style.lineHeight = "normal", p.style.verticalAlign = "super";
        var X = p.offsetTop - r.offsetTop + 2;
        return K.removeChild(r), {
          baseline: W,
          middle: X
        };
      }, t.prototype.getMetrics = function(e, s) {
        var r = e + " " + s;
        return typeof this._data[r] > "u" && (this._data[r] = this.parseMetrics(e, s)), this._data[r];
      }, t;
    })(), Uo = /* @__PURE__ */ (function() {
      function t(e, s) {
        this.context = e, this.options = s;
      }
      return t;
    })(), fp = 1e4, dp = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p._activeEffects = [], p.canvas = r.canvas ? r.canvas : document.createElement("canvas"), p.ctx = p.canvas.getContext("2d"), r.canvas || (p.canvas.width = Math.floor(r.width * r.scale), p.canvas.height = Math.floor(r.height * r.scale), p.canvas.style.width = r.width + "px", p.canvas.style.height = r.height + "px"), p.fontMetrics = new hp(document), p.ctx.scale(p.options.scale, p.options.scale), p.ctx.translate(-r.x, -r.y), p.ctx.textBaseline = "bottom", p._activeEffects = [], p.context.logger.debug("Canvas renderer initialized (" + r.width + "x" + r.height + ") with scale " + r.scale), p;
      }
      return e.prototype.applyEffects = function(s) {
        for (var r = this; this._activeEffects.length; ) this.popEffect();
        s.forEach(function(p) {
          return r.applyEffect(p);
        });
      }, e.prototype.applyEffect = function(s) {
        this.ctx.save(), ep(s) && (this.ctx.globalAlpha = s.opacity), Ap(s) && (this.ctx.translate(s.offsetX, s.offsetY), this.ctx.transform(s.matrix[0], s.matrix[1], s.matrix[2], s.matrix[3], s.matrix[4], s.matrix[5]), this.ctx.translate(-s.offsetX, -s.offsetY)), Bo(s) && (this.path(s.path), this.ctx.clip()), this._activeEffects.push(s);
      }, e.prototype.popEffect = function() {
        this._activeEffects.pop(), this.ctx.restore();
      }, e.prototype.renderStack = function(s) {
        return f(this, void 0, void 0, function() {
          var r;
          return a(this, function(p) {
            switch (p.label) {
              case 0:
                return r = s.element.container.styles, r.isVisible() ? [4, this.renderStackContent(s)] : [3, 2];
              case 1:
                p.sent(), p.label = 2;
              case 2:
                return [2];
            }
          });
        });
      }, e.prototype.renderNode = function(s) {
        return f(this, void 0, void 0, function() {
          return a(this, function(r) {
            switch (r.label) {
              case 0:
                if (oe(s.container.flags, 16)) debugger;
                return s.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(s)] : [3, 3];
              case 1:
                return r.sent(), [4, this.renderNodeContent(s)];
              case 2:
                r.sent(), r.label = 3;
              case 3:
                return [2];
            }
          });
        });
      }, e.prototype.renderTextWithLetterSpacing = function(s, r, p) {
        var S = this;
        r === 0 ? this.ctx.fillText(s.text, s.bounds.left, s.bounds.top + p) : Ii(s.text).reduce(function(K, W) {
          return S.ctx.fillText(W, K, s.bounds.top + p), K + S.ctx.measureText(W).width;
        }, s.bounds.left);
      }, e.prototype.createFontStyle = function(s) {
        var r = s.fontVariant.filter(function(K) {
          return K === "normal" || K === "small-caps";
        }).join(""), p = mp(s.fontFamily).join(", "), S = Ur(s.fontSize) ? "" + s.fontSize.number + s.fontSize.unit : s.fontSize.number + "px";
        return [
          [
            s.fontStyle,
            r,
            s.fontWeight,
            S,
            p
          ].join(" "),
          p,
          S
        ];
      }, e.prototype.renderTextNode = function(s, r) {
        return f(this, void 0, void 0, function() {
          var p, S, K, W, X, nA, oA, cA, wA = this;
          return a(this, function(TA) {
            return p = this.createFontStyle(r), S = p[0], K = p[1], W = p[2], this.ctx.font = S, this.ctx.direction = r.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", X = this.fontMetrics.getMetrics(K, W), nA = X.baseline, oA = X.middle, cA = r.paintOrder, s.textBounds.forEach(function(EA) {
              cA.forEach(function(IA) {
                switch (IA) {
                  case 0:
                    wA.ctx.fillStyle = le(r.color), wA.renderTextWithLetterSpacing(EA, r.letterSpacing, nA);
                    var PA = r.textShadow;
                    PA.length && EA.text.trim().length && (PA.slice(0).reverse().forEach(function(OA) {
                      wA.ctx.shadowColor = le(OA.color), wA.ctx.shadowOffsetX = OA.offsetX.number * wA.options.scale, wA.ctx.shadowOffsetY = OA.offsetY.number * wA.options.scale, wA.ctx.shadowBlur = OA.blur.number, wA.renderTextWithLetterSpacing(EA, r.letterSpacing, nA);
                    }), wA.ctx.shadowColor = "", wA.ctx.shadowOffsetX = 0, wA.ctx.shadowOffsetY = 0, wA.ctx.shadowBlur = 0), r.textDecorationLine.length && (wA.ctx.fillStyle = le(r.textDecorationColor || r.color), r.textDecorationLine.forEach(function(OA) {
                      switch (OA) {
                        case 1:
                          wA.ctx.fillRect(EA.bounds.left, Math.round(EA.bounds.top + nA), EA.bounds.width, 1);
                          break;
                        case 2:
                          wA.ctx.fillRect(EA.bounds.left, Math.round(EA.bounds.top), EA.bounds.width, 1);
                          break;
                        case 3:
                          wA.ctx.fillRect(EA.bounds.left, Math.ceil(EA.bounds.top + oA), EA.bounds.width, 1);
                          break;
                      }
                    }));
                    break;
                  case 1:
                    r.webkitTextStrokeWidth && EA.text.trim().length && (wA.ctx.strokeStyle = le(r.webkitTextStrokeColor), wA.ctx.lineWidth = r.webkitTextStrokeWidth, wA.ctx.lineJoin = window.chrome ? "miter" : "round", wA.ctx.strokeText(EA.text, EA.bounds.left, EA.bounds.top + nA)), wA.ctx.strokeStyle = "", wA.ctx.lineWidth = 0, wA.ctx.lineJoin = "miter";
                    break;
                }
              });
            }), [2];
          });
        });
      }, e.prototype.renderReplacedElement = function(s, r, p) {
        if (p && s.intrinsicWidth > 0 && s.intrinsicHeight > 0) {
          var S = Tn(s), K = In(r);
          this.path(K), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(p, 0, 0, s.intrinsicWidth, s.intrinsicHeight, S.left, S.top, S.width, S.height), this.ctx.restore();
        }
      }, e.prototype.renderNodeContent = function(s) {
        return f(this, void 0, void 0, function() {
          var r, p, S, K, W, X, DA, DA, nA, oA, cA, wA, jA, TA, EA, kA, IA, PA, OA, DA, $A, jA, kA;
          return a(this, function(HA) {
            switch (HA.label) {
              case 0:
                this.applyEffects(s.getEffects(4)), r = s.container, p = s.curves, S = r.styles, K = 0, W = r.textNodes, HA.label = 1;
              case 1:
                return K < W.length ? (X = W[K], [4, this.renderTextNode(X, S)]) : [3, 4];
              case 2:
                HA.sent(), HA.label = 3;
              case 3:
                return K++, [3, 1];
              case 4:
                if (!(r instanceof Ga)) return [3, 8];
                HA.label = 5;
              case 5:
                return HA.trys.push([
                  5,
                  7,
                  ,
                  8
                ]), [4, this.context.cache.match(r.src)];
              case 6:
                return DA = HA.sent(), this.renderReplacedElement(r, p, DA), [3, 8];
              case 7:
                return HA.sent(), this.context.logger.error("Error loading image " + r.src), [3, 8];
              case 8:
                if (r instanceof Va && this.renderReplacedElement(r, p, r.canvas), !(r instanceof Wa)) return [3, 12];
                HA.label = 9;
              case 9:
                return HA.trys.push([
                  9,
                  11,
                  ,
                  12
                ]), [4, this.context.cache.match(r.svg)];
              case 10:
                return DA = HA.sent(), this.renderReplacedElement(r, p, DA), [3, 12];
              case 11:
                return HA.sent(), this.context.logger.error("Error loading svg " + r.svg.substring(0, 255)), [3, 12];
              case 12:
                return r instanceof Ya && r.tree ? (nA = new e(this.context, {
                  scale: this.options.scale,
                  backgroundColor: r.backgroundColor,
                  x: 0,
                  y: 0,
                  width: r.width,
                  height: r.height
                }), [4, nA.render(r.tree)]) : [3, 14];
              case 13:
                oA = HA.sent(), r.width && r.height && this.ctx.drawImage(oA, 0, 0, r.width, r.height, r.bounds.left, r.bounds.top, r.bounds.width, r.bounds.height), HA.label = 14;
              case 14:
                if (r instanceof xi && (cA = Math.min(r.bounds.width, r.bounds.height), r.type === vn ? r.checked && (this.ctx.save(), this.path([
                  new SA(r.bounds.left + cA * 0.39363, r.bounds.top + cA * 0.79),
                  new SA(r.bounds.left + cA * 0.16, r.bounds.top + cA * 0.5549),
                  new SA(r.bounds.left + cA * 0.27347, r.bounds.top + cA * 0.44071),
                  new SA(r.bounds.left + cA * 0.39694, r.bounds.top + cA * 0.5649),
                  new SA(r.bounds.left + cA * 0.72983, r.bounds.top + cA * 0.23),
                  new SA(r.bounds.left + cA * 0.84, r.bounds.top + cA * 0.34085),
                  new SA(r.bounds.left + cA * 0.39363, r.bounds.top + cA * 0.79)
                ]), this.ctx.fillStyle = le(ja), this.ctx.fill(), this.ctx.restore()) : r.type === yn && r.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(r.bounds.left + cA / 2, r.bounds.top + cA / 2, cA / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = le(ja), this.ctx.fill(), this.ctx.restore())), pp(r) && r.value.length) {
                  switch (wA = this.createFontStyle(S), jA = wA[0], TA = wA[1], EA = this.fontMetrics.getMetrics(jA, TA).baseline, this.ctx.font = jA, this.ctx.fillStyle = le(S.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = wp(r.styles.textAlign), kA = Tn(r), IA = 0, r.styles.textAlign) {
                    case 1:
                      IA += kA.width / 2;
                      break;
                    case 2:
                      IA += kA.width;
                      break;
                  }
                  PA = kA.add(IA, 0, 0, -kA.height / 2 + 1), this.ctx.save(), this.path([
                    new SA(kA.left, kA.top),
                    new SA(kA.left + kA.width, kA.top),
                    new SA(kA.left + kA.width, kA.top + kA.height),
                    new SA(kA.left, kA.top + kA.height)
                  ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new Tr(r.value, PA), S.letterSpacing, EA), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
                }
                if (!oe(r.styles.display, 2048)) return [3, 20];
                if (r.styles.listStyleImage === null) return [3, 19];
                if (OA = r.styles.listStyleImage, OA.type !== 0) return [3, 18];
                DA = void 0, $A = OA.url, HA.label = 15;
              case 15:
                return HA.trys.push([
                  15,
                  17,
                  ,
                  18
                ]), [4, this.context.cache.match($A)];
              case 16:
                return DA = HA.sent(), this.ctx.drawImage(DA, r.bounds.left - (DA.width + 10), r.bounds.top), [3, 18];
              case 17:
                return HA.sent(), this.context.logger.error("Error loading list-style-image " + $A), [3, 18];
              case 18:
                return [3, 20];
              case 19:
                s.listValue && r.styles.listStyleType !== -1 && (jA = this.createFontStyle(S)[0], this.ctx.font = jA, this.ctx.fillStyle = le(S.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", kA = new d(r.bounds.left, r.bounds.top + qA(r.styles.paddingTop, r.bounds.width), r.bounds.width, Ea(S.lineHeight, S.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new Tr(s.listValue, kA), S.letterSpacing, Ea(S.lineHeight, S.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), HA.label = 20;
              case 20:
                return [2];
            }
          });
        });
      }, e.prototype.renderStackContent = function(s) {
        return f(this, void 0, void 0, function() {
          var r, p, OA, S, K, OA, W, X, OA, nA, oA, OA, cA, wA, OA, TA, EA, OA, IA, PA, OA;
          return a(this, function(DA) {
            switch (DA.label) {
              case 0:
                if (oe(s.element.container.flags, 16)) debugger;
                return [4, this.renderNodeBackgroundAndBorders(s.element)];
              case 1:
                DA.sent(), r = 0, p = s.negativeZIndex, DA.label = 2;
              case 2:
                return r < p.length ? (OA = p[r], [4, this.renderStack(OA)]) : [3, 5];
              case 3:
                DA.sent(), DA.label = 4;
              case 4:
                return r++, [3, 2];
              case 5:
                return [4, this.renderNodeContent(s.element)];
              case 6:
                DA.sent(), S = 0, K = s.nonInlineLevel, DA.label = 7;
              case 7:
                return S < K.length ? (OA = K[S], [4, this.renderNode(OA)]) : [3, 10];
              case 8:
                DA.sent(), DA.label = 9;
              case 9:
                return S++, [3, 7];
              case 10:
                W = 0, X = s.nonPositionedFloats, DA.label = 11;
              case 11:
                return W < X.length ? (OA = X[W], [4, this.renderStack(OA)]) : [3, 14];
              case 12:
                DA.sent(), DA.label = 13;
              case 13:
                return W++, [3, 11];
              case 14:
                nA = 0, oA = s.nonPositionedInlineLevel, DA.label = 15;
              case 15:
                return nA < oA.length ? (OA = oA[nA], [4, this.renderStack(OA)]) : [3, 18];
              case 16:
                DA.sent(), DA.label = 17;
              case 17:
                return nA++, [3, 15];
              case 18:
                cA = 0, wA = s.inlineLevel, DA.label = 19;
              case 19:
                return cA < wA.length ? (OA = wA[cA], [4, this.renderNode(OA)]) : [3, 22];
              case 20:
                DA.sent(), DA.label = 21;
              case 21:
                return cA++, [3, 19];
              case 22:
                TA = 0, EA = s.zeroOrAutoZIndexOrTransformedOrOpacity, DA.label = 23;
              case 23:
                return TA < EA.length ? (OA = EA[TA], [4, this.renderStack(OA)]) : [3, 26];
              case 24:
                DA.sent(), DA.label = 25;
              case 25:
                return TA++, [3, 23];
              case 26:
                IA = 0, PA = s.positiveZIndex, DA.label = 27;
              case 27:
                return IA < PA.length ? (OA = PA[IA], [4, this.renderStack(OA)]) : [3, 30];
              case 28:
                DA.sent(), DA.label = 29;
              case 29:
                return IA++, [3, 27];
              case 30:
                return [2];
            }
          });
        });
      }, e.prototype.mask = function(s) {
        this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(s.slice(0).reverse()), this.ctx.closePath();
      }, e.prototype.path = function(s) {
        this.ctx.beginPath(), this.formatPath(s), this.ctx.closePath();
      }, e.prototype.formatPath = function(s) {
        var r = this;
        s.forEach(function(p, S) {
          var K = Se(p) ? p.start : p;
          S === 0 ? r.ctx.moveTo(K.x, K.y) : r.ctx.lineTo(K.x, K.y), Se(p) && r.ctx.bezierCurveTo(p.startControl.x, p.startControl.y, p.endControl.x, p.endControl.y, p.end.x, p.end.y);
        });
      }, e.prototype.renderRepeat = function(s, r, p, S) {
        this.path(s), this.ctx.fillStyle = r, this.ctx.translate(p, S), this.ctx.fill(), this.ctx.translate(-p, -S);
      }, e.prototype.resizeImage = function(s, r, p) {
        var S;
        if (s.width === r && s.height === p) return s;
        var K = ((S = this.canvas.ownerDocument) !== null && S !== void 0 ? S : document).createElement("canvas");
        return K.width = Math.max(1, r), K.height = Math.max(1, p), K.getContext("2d").drawImage(s, 0, 0, s.width, s.height, 0, 0, r, p), K;
      }, e.prototype.renderBackgroundImage = function(s) {
        return f(this, void 0, void 0, function() {
          var r, p, S, K, W, X;
          return a(this, function(nA) {
            switch (nA.label) {
              case 0:
                r = s.styles.backgroundImage.length - 1, p = function(oA) {
                  var cA, wA, TA, ae, Ce, Fe, YA, he, XA, EA, ae, Ce, Fe, YA, he, IA, PA, OA, DA, $A, jA, kA, HA, WA, XA, KA, ae, ye, Ie, YA, he, gt, Ce, Fe, xt, Me, wt, Tt, St, $e, Ht, At;
                  return a(this, function(er) {
                    switch (er.label) {
                      case 0:
                        if (oA.type !== 0) return [3, 5];
                        cA = void 0, wA = oA.url, er.label = 1;
                      case 1:
                        return er.trys.push([
                          1,
                          3,
                          ,
                          4
                        ]), [4, S.context.cache.match(wA)];
                      case 2:
                        return cA = er.sent(), [3, 4];
                      case 3:
                        return er.sent(), S.context.logger.error("Error loading background-image " + wA), [3, 4];
                      case 4:
                        return cA && (TA = Mi(s, r, [
                          cA.width,
                          cA.height,
                          cA.width / cA.height
                        ]), ae = TA[0], Ce = TA[1], Fe = TA[2], YA = TA[3], he = TA[4], XA = S.ctx.createPattern(S.resizeImage(cA, YA, he), "repeat"), S.renderRepeat(ae, XA, Ce, Fe)), [3, 6];
                      case 5:
                        ih(oA) ? (EA = Mi(s, r, [
                          null,
                          null,
                          null
                        ]), ae = EA[0], Ce = EA[1], Fe = EA[2], YA = EA[3], he = EA[4], IA = Ah(oA.angle, YA, he), PA = IA[0], OA = IA[1], DA = IA[2], $A = IA[3], jA = IA[4], kA = document.createElement("canvas"), kA.width = YA, kA.height = he, HA = kA.getContext("2d"), WA = HA.createLinearGradient(OA, $A, DA, jA), fa(oA.stops, PA).forEach(function(Dr) {
                          return WA.addColorStop(Dr.stop, le(Dr.color));
                        }), HA.fillStyle = WA, HA.fillRect(0, 0, YA, he), YA > 0 && he > 0 && (XA = S.ctx.createPattern(kA, "repeat"), S.renderRepeat(ae, XA, Ce, Fe))) : sh(oA) && (KA = Mi(s, r, [
                          null,
                          null,
                          null
                        ]), ae = KA[0], ye = KA[1], Ie = KA[2], YA = KA[3], he = KA[4], gt = oA.position.length === 0 ? [fi] : oA.position, Ce = qA(gt[0], YA), Fe = qA(gt[gt.length - 1], he), xt = eh(oA, Ce, Fe, YA, he), Me = xt[0], wt = xt[1], Me > 0 && wt > 0 && (Tt = S.ctx.createRadialGradient(ye + Ce, Ie + Fe, 0, ye + Ce, Ie + Fe, Me), fa(oA.stops, Me * 2).forEach(function(Dr) {
                          return Tt.addColorStop(Dr.stop, le(Dr.color));
                        }), S.path(ae), S.ctx.fillStyle = Tt, Me !== wt ? (St = s.bounds.left + 0.5 * s.bounds.width, $e = s.bounds.top + 0.5 * s.bounds.height, Ht = wt / Me, At = 1 / Ht, S.ctx.save(), S.ctx.translate(St, $e), S.ctx.transform(1, 0, 0, Ht, 0, 0), S.ctx.translate(-St, -$e), S.ctx.fillRect(ye, At * (Ie - $e) + $e, YA, he * At), S.ctx.restore()) : S.ctx.fill())), er.label = 6;
                      case 6:
                        return r--, [2];
                    }
                  });
                }, S = this, K = 0, W = s.styles.backgroundImage.slice(0).reverse(), nA.label = 1;
              case 1:
                return K < W.length ? (X = W[K], [5, p(X)]) : [3, 4];
              case 2:
                nA.sent(), nA.label = 3;
              case 3:
                return K++, [3, 1];
              case 4:
                return [2];
            }
          });
        });
      }, e.prototype.renderSolidBorder = function(s, r, p) {
        return f(this, void 0, void 0, function() {
          return a(this, function(S) {
            return this.path(Fo(p, r)), this.ctx.fillStyle = le(s), this.ctx.fill(), [2];
          });
        });
      }, e.prototype.renderDoubleBorder = function(s, r, p, S) {
        return f(this, void 0, void 0, function() {
          var K, W;
          return a(this, function(X) {
            switch (X.label) {
              case 0:
                return r < 3 ? [4, this.renderSolidBorder(s, p, S)] : [3, 2];
              case 1:
                return X.sent(), [2];
              case 2:
                return K = np(S, p), this.path(K), this.ctx.fillStyle = le(s), this.ctx.fill(), W = ip(S, p), this.path(W), this.ctx.fill(), [2];
            }
          });
        });
      }, e.prototype.renderNodeBackgroundAndBorders = function(s) {
        return f(this, void 0, void 0, function() {
          var r, p, S, K, W, X, nA, oA, cA = this;
          return a(this, function(wA) {
            switch (wA.label) {
              case 0:
                return this.applyEffects(s.getEffects(2)), r = s.container.styles, p = !ht(r.backgroundColor) || r.backgroundImage.length, S = [
                  {
                    style: r.borderTopStyle,
                    color: r.borderTopColor,
                    width: r.borderTopWidth
                  },
                  {
                    style: r.borderRightStyle,
                    color: r.borderRightColor,
                    width: r.borderRightWidth
                  },
                  {
                    style: r.borderBottomStyle,
                    color: r.borderBottomColor,
                    width: r.borderBottomWidth
                  },
                  {
                    style: r.borderLeftStyle,
                    color: r.borderLeftColor,
                    width: r.borderLeftWidth
                  }
                ], K = gp(Ar(r.backgroundClip, 0), s.curves), p || r.boxShadow.length ? (this.ctx.save(), this.path(K), this.ctx.clip(), ht(r.backgroundColor) || (this.ctx.fillStyle = le(r.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(s.container)]) : [3, 2];
              case 1:
                wA.sent(), this.ctx.restore(), r.boxShadow.slice(0).reverse().forEach(function(TA) {
                  cA.ctx.save();
                  var EA = bn(s.curves), IA = TA.inset ? 0 : fp, PA = tp(EA, -IA + (TA.inset ? 1 : -1) * TA.spread.number, (TA.inset ? 1 : -1) * TA.spread.number, TA.spread.number * (TA.inset ? -2 : 2), TA.spread.number * (TA.inset ? -2 : 2));
                  TA.inset ? (cA.path(EA), cA.ctx.clip(), cA.mask(PA)) : (cA.mask(EA), cA.ctx.clip(), cA.path(PA)), cA.ctx.shadowOffsetX = TA.offsetX.number + IA, cA.ctx.shadowOffsetY = TA.offsetY.number, cA.ctx.shadowColor = le(TA.color), cA.ctx.shadowBlur = TA.blur.number, cA.ctx.fillStyle = TA.inset ? le(TA.color) : "rgba(0,0,0,1)", cA.ctx.fill(), cA.ctx.restore();
                }), wA.label = 2;
              case 2:
                W = 0, X = 0, nA = S, wA.label = 3;
              case 3:
                return X < nA.length ? (oA = nA[X], oA.style !== 0 && !ht(oA.color) && oA.width > 0 ? oA.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(oA.color, oA.width, W, s.curves, 2)] : [3, 11]) : [3, 13];
              case 4:
                return wA.sent(), [3, 11];
              case 5:
                return oA.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(oA.color, oA.width, W, s.curves, 3)];
              case 6:
                return wA.sent(), [3, 11];
              case 7:
                return oA.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(oA.color, oA.width, W, s.curves)];
              case 8:
                return wA.sent(), [3, 11];
              case 9:
                return [4, this.renderSolidBorder(oA.color, W, s.curves)];
              case 10:
                wA.sent(), wA.label = 11;
              case 11:
                W++, wA.label = 12;
              case 12:
                return X++, [3, 3];
              case 13:
                return [2];
            }
          });
        });
      }, e.prototype.renderDashedDottedBorder = function(s, r, p, S, K) {
        return f(this, void 0, void 0, function() {
          var W, X, nA, oA, cA, wA, TA, EA, IA, PA, OA, DA, $A, jA, kA, HA, kA, HA;
          return a(this, function(WA) {
            return this.ctx.save(), W = sp(S, p), X = Fo(S, p), K === 2 && (this.path(X), this.ctx.clip()), Se(X[0]) ? (nA = X[0].start.x, oA = X[0].start.y) : (nA = X[0].x, oA = X[0].y), Se(X[1]) ? (cA = X[1].end.x, wA = X[1].end.y) : (cA = X[1].x, wA = X[1].y), p === 0 || p === 2 ? TA = Math.abs(nA - cA) : TA = Math.abs(oA - wA), this.ctx.beginPath(), K === 3 ? this.formatPath(W) : this.formatPath(X.slice(0, 2)), EA = r < 3 ? r * 3 : r * 2, IA = r < 3 ? r * 2 : r, K === 3 && (EA = r, IA = r), PA = !0, TA <= EA * 2 ? PA = !1 : TA <= EA * 2 + IA ? (OA = TA / (2 * EA + IA), EA *= OA, IA *= OA) : (DA = Math.floor((TA + IA) / (EA + IA)), $A = (TA - DA * EA) / (DA - 1), jA = (TA - (DA + 1) * EA) / DA, IA = jA <= 0 || Math.abs(IA - $A) < Math.abs(IA - jA) ? $A : jA), PA && (K === 3 ? this.ctx.setLineDash([0, EA + IA]) : this.ctx.setLineDash([EA, IA])), K === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = r) : this.ctx.lineWidth = r * 2 + 1.1, this.ctx.strokeStyle = le(s), this.ctx.stroke(), this.ctx.setLineDash([]), K === 2 && (Se(X[0]) && (kA = X[3], HA = X[0], this.ctx.beginPath(), this.formatPath([new SA(kA.end.x, kA.end.y), new SA(HA.start.x, HA.start.y)]), this.ctx.stroke()), Se(X[1]) && (kA = X[1], HA = X[2], this.ctx.beginPath(), this.formatPath([new SA(kA.end.x, kA.end.y), new SA(HA.start.x, HA.start.y)]), this.ctx.stroke())), this.ctx.restore(), [2];
          });
        });
      }, e.prototype.render = function(s) {
        return f(this, void 0, void 0, function() {
          var r;
          return a(this, function(p) {
            switch (p.label) {
              case 0:
                return this.options.backgroundColor && (this.ctx.fillStyle = le(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), r = rp(s), [4, this.renderStack(r)];
              case 1:
                return p.sent(), this.applyEffects([]), [2, this.canvas];
            }
          });
        });
      }, e;
    })(Uo), pp = function(t) {
      return t instanceof Ja || t instanceof za ? !0 : t instanceof xi && t.type !== yn && t.type !== vn;
    }, gp = function(t, e) {
      switch (t) {
        case 0:
          return bn(e);
        case 2:
          return Zd(e);
        default:
          return In(e);
      }
    }, wp = function(t) {
      switch (t) {
        case 1:
          return "center";
        case 2:
          return "right";
        default:
          return "left";
      }
    }, Bp = ["-apple-system", "system-ui"], mp = function(t) {
      return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? t.filter(function(e) {
        return Bp.indexOf(e) === -1;
      }) : t;
    }, vp = (function(t) {
      c(e, t);
      function e(s, r) {
        var p = t.call(this, s, r) || this;
        return p.canvas = r.canvas ? r.canvas : document.createElement("canvas"), p.ctx = p.canvas.getContext("2d"), p.options = r, p.canvas.width = Math.floor(r.width * r.scale), p.canvas.height = Math.floor(r.height * r.scale), p.canvas.style.width = r.width + "px", p.canvas.style.height = r.height + "px", p.ctx.scale(p.options.scale, p.options.scale), p.ctx.translate(-r.x, -r.y), p.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + r.width + "x" + r.height + " at " + r.x + "," + r.y + ") with scale " + r.scale), p;
      }
      return e.prototype.render = function(s) {
        return f(this, void 0, void 0, function() {
          var r, p;
          return a(this, function(S) {
            switch (S.label) {
              case 0:
                return r = bi(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, s), [4, yp(r)];
              case 1:
                return p = S.sent(), this.options.backgroundColor && (this.ctx.fillStyle = le(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(p, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
            }
          });
        });
      }, e;
    })(Uo), yp = function(t) {
      return new Promise(function(e, s) {
        var r = new Image();
        r.onload = function() {
          e(r);
        }, r.onerror = s, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(t));
      });
    }, Cp = (function() {
      function t(e) {
        var s = e.id, r = e.enabled;
        this.id = s, this.enabled = r, this.start = Date.now();
      }
      return t.prototype.debug = function() {
        for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
        this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.prototype.getTime = function() {
        return Date.now() - this.start;
      }, t.prototype.info = function() {
        for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
        this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, o([this.id, this.getTime() + "ms"], e));
      }, t.prototype.warn = function() {
        for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
        this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.prototype.error = function() {
        for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
        this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.instances = {}, t;
    })(), Fp = (function() {
      function t(e, s) {
        var r;
        this.windowBounds = s, this.instanceName = "#" + t.instanceCount++, this.logger = new Cp({
          id: this.instanceName,
          enabled: e.logging
        }), this.cache = (r = e.cache) !== null && r !== void 0 ? r : new Gd(this, e);
      }
      return t.instanceCount = 1, t;
    })(), Ep = function(t, e) {
      return e === void 0 && (e = {}), Qp(t, e);
    };
    typeof window < "u" && wo.setContext(window);
    var Qp = function(t, e) {
      return f(void 0, void 0, void 0, function() {
        var s, r, p, S, K, W, X, nA, oA, cA, wA, TA, EA, IA, PA, OA, DA, $A, jA, kA, WA, HA, WA, XA, KA, ae, ye, Ie, YA, he, gt, Ce, Fe, xt, Me, wt, Tt, St, $e, Ht;
        return a(this, function(At) {
          switch (At.label) {
            case 0:
              if (!t || typeof t != "object") return [2, Promise.reject("Invalid element provided as first argument")];
              if (s = t.ownerDocument, !s) throw new Error("Element is not attached to a Document");
              if (r = s.defaultView, !r) throw new Error("Document is not attached to a Window");
              return p = {
                allowTaint: (XA = e.allowTaint) !== null && XA !== void 0 ? XA : !1,
                imageTimeout: (KA = e.imageTimeout) !== null && KA !== void 0 ? KA : 15e3,
                proxy: e.proxy,
                useCORS: (ae = e.useCORS) !== null && ae !== void 0 ? ae : !1
              }, S = h({
                logging: (ye = e.logging) !== null && ye !== void 0 ? ye : !0,
                cache: e.cache
              }, p), K = {
                windowWidth: (Ie = e.windowWidth) !== null && Ie !== void 0 ? Ie : r.innerWidth,
                windowHeight: (YA = e.windowHeight) !== null && YA !== void 0 ? YA : r.innerHeight,
                scrollX: (he = e.scrollX) !== null && he !== void 0 ? he : r.pageXOffset,
                scrollY: (gt = e.scrollY) !== null && gt !== void 0 ? gt : r.pageYOffset
              }, W = new d(K.scrollX, K.scrollY, K.windowWidth, K.windowHeight), X = new Fp(S, W), nA = (Ce = e.foreignObjectRendering) !== null && Ce !== void 0 ? Ce : !1, oA = {
                allowTaint: (Fe = e.allowTaint) !== null && Fe !== void 0 ? Fe : !1,
                onclone: e.onclone,
                ignoreElements: e.ignoreElements,
                inlineImages: nA,
                copyStyles: nA
              }, X.logger.debug("Starting document clone with size " + W.width + "x" + W.height + " scrolled to " + -W.left + "," + -W.top), cA = new po(X, t, oA), wA = cA.clonedReferenceElement, wA ? [4, cA.toIFrame(s, W)] : [2, Promise.reject("Unable to find element in cloned iframe")];
            case 1:
              return TA = At.sent(), EA = Si(wA) || Ud(wA) ? b(wA.ownerDocument) : U(X, wA), IA = EA.width, PA = EA.height, OA = EA.left, DA = EA.top, $A = Up(X, wA, e.backgroundColor), jA = {
                canvas: e.canvas,
                backgroundColor: $A,
                scale: (Me = (xt = e.scale) !== null && xt !== void 0 ? xt : r.devicePixelRatio) !== null && Me !== void 0 ? Me : 1,
                x: ((wt = e.x) !== null && wt !== void 0 ? wt : 0) + OA,
                y: ((Tt = e.y) !== null && Tt !== void 0 ? Tt : 0) + DA,
                width: (St = e.width) !== null && St !== void 0 ? St : Math.ceil(IA),
                height: ($e = e.height) !== null && $e !== void 0 ? $e : Math.ceil(PA)
              }, nA ? (X.logger.debug("Document cloned, using foreign object rendering"), WA = new vp(X, jA), [4, WA.render(wA)]) : [3, 3];
            case 2:
              return kA = At.sent(), [3, 5];
            case 3:
              return X.logger.debug("Document cloned, element located at " + OA + "," + DA + " with size " + IA + "x" + PA + " using computed rendering"), X.logger.debug("Starting DOM parsing"), HA = qa(X, wA), $A === HA.styles.backgroundColor && (HA.styles.backgroundColor = Ze.TRANSPARENT), X.logger.debug("Starting renderer for element at " + jA.x + "," + jA.y + " with size " + jA.width + "x" + jA.height), WA = new dp(X, jA), [4, WA.render(HA)];
            case 4:
              kA = At.sent(), At.label = 5;
            case 5:
              return (!((Ht = e.removeContainer) !== null && Ht !== void 0) || Ht) && (po.destroy(TA) || X.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), X.logger.debug("Finished rendering"), [2, kA];
          }
        });
      });
    }, Up = function(t, e, s) {
      var r = e.ownerDocument, p = r.documentElement ? Ir(t, getComputedStyle(r.documentElement).backgroundColor) : Ze.TRANSPARENT, S = r.body ? Ir(t, getComputedStyle(r.body).backgroundColor) : Ze.TRANSPARENT, K = typeof s == "string" ? Ir(t, s) : s === null ? Ze.TRANSPARENT : 4294967295;
      return e === r.documentElement ? ht(p) ? ht(S) ? K : S : p : K;
    };
    return Ep;
  }));
})), X0 = /* @__PURE__ */ Lp(W0(), 1), Rt = Object.freeze({
  red: "C42C2C",
  blue: "5060F8",
  orange: "DC8938",
  magenta: "992899",
  green: "2F9C2F",
  olive: "A7A728",
  teal: "288383"
}), Pe = (A, i) => `<a:${A}><a:srgbClr val="${i}"/></a:${A}>`, j0 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Traité">
  <a:themeElements>
    <a:clrScheme name="Traité">
      <a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>
      <a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>
      ${Pe("dk2", Rt.red)}
      ${Pe("lt2", "E7E6E6")}
      ${Pe("accent1", Rt.blue)}
      ${Pe("accent2", Rt.orange)}
      ${Pe("accent3", Rt.magenta)}
      ${Pe("accent4", Rt.green)}
      ${Pe("accent5", Rt.olive)}
      ${Pe("accent6", Rt.teal)}
      ${Pe("hlink", "0563C1")}
      ${Pe("folHlink", "954F72")}
    </a:clrScheme>
    <a:fontScheme name="Traité">
      <a:majorFont><a:latin typeface="Calibri Light"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>
      <a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Traité">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>`;
function z0(A) {
  A.Document.Relationships.addRelationship("TraiteTheme", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml");
  const i = new mA("Override");
  return i.addChildElement(new NA({
    PartName: "/word/theme/theme1.xml",
    ContentType: "application/vnd.openxmlformats-officedocument.theme+xml"
  })), A.ContentTypes.addChildElement(i), [{
    path: "word/theme/theme1.xml",
    data: j0
  }];
}
var Bt = "HEJI2Text", We = "Roboto Slab", Vr = "Roboto Slab Light", Pt = "Inter Light", $o = "Calibri Light", J0 = "Arial Unicode MS", Y0 = {
  5: "C42C2C",
  7: "5060F8",
  11: "DC8938",
  13: "992899"
}, Uu = 12240, bu = 15840, hs = 1134, fs = 1440, Iu = Uu - hs * 2, Ds = bu - fs * 2, Z0 = Math.round(Iu * 96 / 1440), rs = Math.round(Ds * 96 / 1440), q0 = Math.round(15.5 / 2.54 * 96), $0 = 8842, ri = Iu - 120, Ay = ri / $0, ey = ri / 812, ty = [
  3,
  5,
  6,
  8,
  9,
  11,
  12,
  13,
  15,
  16,
  18,
  19
], ns, ry = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  ".summary-empty",
  ".summary-network-figure",
  ".summary-analysis-wrap",
  ".summary-synthesis-wrap"
].join(", "), VA = {
  style: wr.SINGLE,
  size: 6,
  color: "000000"
}, ny = {
  style: wr.DASHED,
  size: 6,
  color: "000000"
}, it = {
  style: wr.NONE,
  size: 0,
  color: "auto"
}, ds = {
  top: VA,
  bottom: VA,
  left: VA,
  right: VA,
  insideHorizontal: VA,
  insideVertical: VA
};
function ps() {
  return new Promise((A) => requestAnimationFrame(() => requestAnimationFrame(A)));
}
function ni(A) {
  return String(A ?? "").replace(/\s+/g, " ");
}
function Wn(A) {
  return ni(A).trim().replaceAll("♭", "b").replaceAll("♯", "#");
}
function _u(A) {
  return ns ||= document.createElement("canvas").getContext("2d"), ns.font = `300 10pt "${Pt}"`, ns.measureText(Wn(A)).width * 15;
}
function xu(A, i) {
  const n = A.reduce((f, a) => f + a, 0) || 1;
  let c = 0, h = 0;
  return A.map((f, a) => {
    c += f;
    const o = a === A.length - 1 ? i : Math.round(c * i / n), d = o - h;
    return h = o, d;
  });
}
function iy(A) {
  const i = String(A ?? "").trim();
  if (/^#[0-9a-f]{6}$/i.test(i)) return i.slice(1).toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(i)) return i.slice(1).split("").map((c) => c.repeat(2)).join("").toUpperCase();
  const n = i.match(/^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i);
  if (n)
    return n.slice(1, 4).map((c) => Number(c).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function sy(A, i = {}) {
  const n = { ...i }, c = iy(A.style?.color);
  return c && (n.color = c), A.matches("strong, b") && (n.bold = !0), A.classList.contains("is-characteristic") && (n.bold = !0), A.matches("em, i, .summary-empty") && (n.italics = !0), A.matches("sup") && (n.superScript = !0), A.matches("sub") && (n.subScript = !0), A.classList.contains("degree-accidental") ? (n.font = J0, n.size = 20, n.noProof = !0) : A.classList.contains("degree-text") && (n.font = Pt, n.size = 20, n.noProof = !0), A.classList.contains("mode-chord-suffix") && (n.superScript = !0, n.font = Pt, n.size = 20, n.noProof = !0), A.classList.contains("heji-accidental") ? (n.style = "SummaryHejiAccidental", n.font = Bt, n.size = 28, n.bold = !1, n.noProof = !0) : A.classList.contains("heji-note") ? (n.size = 28, n.bold = !1, n.noProof = !0) : A.classList.contains("cents-label") && (n.size = 28, n.noProof = !0, n.subScript = !0), A.classList.contains("discordant-proportion") && (n.color = "FF0000"), n;
}
function Rs(A, i = {}) {
  if (A.nodeType === Node.TEXT_NODE) {
    const c = A.parentElement?.closest?.(".mode-chord-name") ? Wn(A.textContent) : ni(A.textContent);
    return c ? [new je({
      ...i,
      text: c
    })] : [];
  }
  if (!(A instanceof Element) || A.hidden || A.classList.contains("visually-hidden")) return [];
  if (A.tagName === "BR") return [new je({
    break: 1,
    text: ""
  })];
  const n = sy(A, i);
  return A.classList.contains("mode-chord-suffix") ? [new je({
    ...n,
    text: Wn(A.textContent)
  })] : [...A.childNodes].flatMap((c, h) => [...h > 0 && c instanceof Element && c.classList.contains("mode-chord-name-line") ? [new je({
    break: 1,
    text: ""
  })] : [], ...Rs(c, n)]);
}
function ay(A, i) {
  const n = ni(A).trim().replace(/#(?=\d)/g, "♯").replace(/b(?=\d)/g, "♭").replace(/^m\(maj(7|9)\)$/, "mmaj$1"), c = n.match(/^(add)([♭♯]\d+)$/) || n.match(/^((?:sm|m))(add[♭♯]?\d+)$/) || n.match(/^((?:sm|m))(6)$/) || n.match(/^((?:sm|m))(maj\d+)$/) || n.match(/^((?:sm|m|maj\d+|m\d+|sm\d+|7|9|Fr|Gr|Fr\/Ger))([♭♯]\d+|\+6|no\d+)$/), h = (o, d = !1) => new je({
    ...i,
    font: Pt,
    ...d ? {
      size: 20,
      superScript: !0
    } : {},
    noProof: !0,
    text: Wn(o)
  });
  if (!c) return [h(n)];
  const [, f, a] = c;
  return [h(f), h(a, !0)];
}
function Tu(A, i = {}) {
  const n = Rs(A, i.run ?? {});
  return new Le({
    children: n.length ? n : [new je("")],
    alignment: i.alignment ?? fe.LEFT,
    keepNext: i.keepNext ?? !1,
    keepLines: !0,
    style: i.style,
    spacing: i.spacing === null ? void 0 : i.spacing ?? {
      after: 80,
      line: 260
    }
  });
}
function oy(A, { explicitPageBreakBefore: i = !1 } = {}) {
  const n = Number(A.tagName.slice(1)), c = [
    rr.TITLE,
    rr.HEADING_1,
    rr.HEADING_2,
    rr.HEADING_3,
    rr.HEADING_4,
    rr.HEADING_5
  ][Math.max(0, Math.min(5, n - 1))], h = [
    36,
    32,
    28,
    24,
    20,
    20
  ], f = [
    Vr,
    Vr,
    We,
    We,
    We,
    We
  ], a = [
    {
      before: 0,
      after: 160
    },
    {
      before: 240,
      after: 140
    },
    {
      before: 200,
      after: 120
    },
    {
      before: 60,
      after: 60
    },
    {
      before: 160,
      after: 60
    },
    {
      before: 160,
      after: 60
    }
  ], o = Math.max(0, Math.min(5, n - 1)), d = {
    bold: !1,
    color: "000000",
    font: f[o],
    italics: !1,
    noProof: !0,
    size: h[o]
  }, U = n === 1 ? ni(A.textContent).split(/(\d+)/).filter(Boolean).map((b) => new je({
    ...d,
    color: Y0[b] ?? d.color,
    text: b
  })) : Rs(A, d);
  return new Le({
    heading: c,
    children: i ? [new GB(), ...U] : U,
    keepNext: !0,
    keepLines: !0,
    spacing: a[o]
  });
}
function ii(A, { alignment: i = fe.CENTER, columnSpan: n = 1, borderless: c = !1, borders: h, margins: f, run: a, keepNext: o = !1 } = {}) {
  const d = {
    font: Pt,
    size: 20,
    noProof: !0,
    ...a
  };
  return new xs({
    children: [A.matches("th:first-child") && A.closest(".summary-chord-matrix") ? new Le({
      children: ay(A.textContent, d),
      alignment: i,
      keepNext: o,
      keepLines: !0,
      style: "SummaryTableCell",
      spacing: {
        before: 0,
        after: 0,
        line: 240
      }
    }) : Tu(A, {
      alignment: i,
      keepNext: o,
      style: "SummaryTableCell",
      run: d,
      spacing: {
        before: 0,
        after: 0,
        line: 240
      }
    })],
    columnSpan: n,
    verticalAlign: tu.CENTER,
    borders: c ? {
      top: it,
      bottom: it,
      left: it,
      right: it
    } : h,
    margins: f
  });
}
var Su = 800;
function ly(A) {
  return 400 + A.reduce((i, n) => i + 380 * Math.max(1, ...[...n.cells].map((c) => c.querySelectorAll(":scope > .heji-pitch, :scope > .heji-with-cents").length)), 0);
}
function uy(A, i = 0) {
  const n = [...A.querySelectorAll(":scope > colgroup > col")], c = A.classList.contains("summary-chord-matrix") ? 84 : A.classList.contains("summary-tetrachord-synthesis") ? 124 : 56, h = n.length ? n.map((v, _) => _ === 0 ? c : 56) : Array.from({ length: Math.max(1, A.rows[0]?.cells.length ?? 1) }, () => 1), f = h.reduce((v, _) => v + _, 0), a = Math.min(ri, Math.round(f * ey)), o = xu(h, a), d = A.classList.contains("summary-fixed-degree-table"), U = [...A.rows], b = ly(U) + i <= Ds - Su;
  return new cu({
    rows: U.map((v, _) => new Ts({
      children: [...v.cells].map((C, m, w) => {
        const I = d ? {
          top: VA,
          bottom: VA,
          left: m === 0 || C.classList.contains("is-family-start") ? VA : it,
          right: m === w.length - 1 || C.classList.contains("is-family-end") ? VA : it,
          ...m === 0 ? { start: VA } : {},
          ...m === w.length - 1 ? { end: VA } : {}
        } : {
          ...m === 0 ? {
            left: VA,
            start: VA
          } : {},
          ...m === w.length - 1 ? {
            right: VA,
            end: VA
          } : {}
        };
        return ii(C, {
          alignment: fe.CENTER,
          columnSpan: Math.max(1, Number(C.colSpan) || 1),
          borders: I,
          keepNext: b ? _ < U.length - 1 : _ === 0 || v.parentElement?.tagName === "THEAD"
        });
      }),
      cantSplit: !0,
      tableHeader: v.parentElement?.tagName === "THEAD"
    })),
    width: {
      size: a,
      type: Mt.DXA
    },
    columnWidths: o,
    layout: ou.FIXED,
    margins: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    },
    borders: d ? {
      ...ds,
      insideVertical: it
    } : ds,
    alignment: fe.LEFT,
    indent: {
      size: 0,
      type: Mt.DXA
    }
  });
}
function Hu(A) {
  const i = (A.style.gridColumn || `${A.style.gridColumnStart} / ${A.style.gridColumnEnd}`).match(/(\d+)\s*\/\s*(\d+)/);
  if (!i) return null;
  const n = Number(i[1]), c = Number(i[2]);
  return Number.isInteger(n) && Number.isInteger(c) && c > n ? {
    start: n,
    end: c
  } : null;
}
function Xn(A = 1, i = !1, n = !1, c) {
  return ii(document.createElement("span"), {
    columnSpan: A,
    borderless: i,
    borders: c,
    keepNext: n,
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
function Al(A, i, n) {
  const c = n.reduce((f, a) => f + a, 0) || 1, h = [];
  return n.slice(0, -1).reduce((f, a, o) => {
    const d = f + a;
    return h.push({
      column: o + 1,
      percentage: d * 100 / c
    }), d;
  }, 0), new Set([...A.querySelectorAll(i)].map((f) => {
    const a = Number.parseFloat(f.style.left);
    return !Number.isFinite(a) || !h.length ? null : h.reduce((o, d) => Math.abs(d.percentage - a) < Math.abs(o.percentage - a) ? d : o).column;
  }).filter(Number.isInteger));
}
function el(A, { top: i = !1, bottom: n = !1, left: c = !1, right: h = !1 } = {}, f, a) {
  const o = {};
  return i && (o.top = VA), n && (o.bottom = VA), c && (o.left = VA, o.start = VA), h ? (o.right = VA, o.end = VA) : a.has(A) ? o.right = ny : f.has(A) && (o.right = VA), Object.keys(o).length ? o : void 0;
}
function cy(A, i, { columnLines: n, blankBoundaries: c = /* @__PURE__ */ new Set(), keepNext: h = !1, tableHeader: f = !1, top: a = !1, bottom: o = !1, solidBoundaries: d = /* @__PURE__ */ new Set(), dashedBoundaries: U = /* @__PURE__ */ new Set() } = {}) {
  const b = [...A.children].filter((w) => !w.matches(".visually-hidden, .mode-family-boundary, .mode-tetrachord-start")).map((w) => {
    const I = Hu(w);
    return {
      element: w,
      range: I && n ? {
        start: n[I.start],
        end: n[I.end]
      } : I
    };
  }).filter(({ range: w }) => w).sort((w, I) => w.range.start - I.range.start), v = [], _ = [.../* @__PURE__ */ new Set([
    ...c,
    ...d,
    ...U
  ])].filter((w) => w > 0 && w < i).sort((w, I) => w - I), C = (w, I) => {
    if (I < w) return;
    let T = w;
    for (const x of [..._.filter((N) => N >= w && N < I), I])
      v.push(Xn(x - T + 1, !1, h, el(x, {
        top: a,
        bottom: o,
        left: T === 1,
        right: x === i
      }, d, U))), T = x + 1;
  };
  let m = 1;
  return b.forEach(({ element: w, range: I }) => {
    if (I.start < m) return;
    I.start > m && C(m, I.start - 1);
    const T = Math.min(i + 1, I.end) - I.start;
    v.push(ii(w, {
      borders: el(I.start + T - 1, {
        top: a,
        bottom: o,
        left: I.start === 1,
        right: I.start + T - 1 === i
      }, d, U),
      columnSpan: T,
      keepNext: h
    })), m = I.start + T;
  }), m <= i && C(m, i), new Ts({
    children: v.length ? v : [Xn(i, !1, h, {
      ...a ? { top: VA } : {},
      ...o ? { bottom: VA } : {},
      left: VA,
      start: VA,
      right: VA,
      end: VA
    })],
    cantSplit: !0,
    tableHeader: f
  });
}
function hy(A, i) {
  const n = Number.parseFloat(A.style.left);
  return Number.isFinite(n) ? Math.max(0, Math.min(i, Math.round(n * i / 100))) : 0;
}
function fy(A, i, n) {
  if (!i) return A;
  const c = [...i.querySelectorAll(":scope > .mode-chord-name")].map((a) => ({
    element: a,
    range: Hu(a)
  })).filter(({ range: a }) => a && a.end <= A.length + 1), h = new Set(c.flatMap(({ range: a }) => Array.from({ length: a.end - a.start }, (o, d) => a.start + d - 1))), f = [...A];
  return c.forEach(({ element: a, range: o }) => {
    const d = [...a.querySelectorAll(":scope > .mode-chord-name-line")], U = Math.max(...(d.length ? d : [a]).map((C) => _u(C.textContent))), b = Math.ceil(U * 1.13 + 2 * n), v = f.slice(o.start - 1, o.end - 1).reduce((C, m) => C + m, 0);
    let _ = Math.max(0, b - v);
    [{
      donor: o.end - 1,
      receiver: o.end - 2
    }, {
      donor: o.start - 2,
      receiver: o.start - 1
    }].filter(({ donor: C }) => C >= 0 && C < f.length && !h.has(C)).sort((C, m) => f[m.donor] - f[C.donor]).forEach(({ donor: C, receiver: m }) => {
      if (!_) return;
      const w = Math.min(_, Math.max(0, f[C] - 120));
      f[C] -= w, f[m] += w, _ -= w;
    });
  }), f;
}
function dy(A, i, n) {
  const c = i.findIndex((a) => a > A), h = c < 0 ? i.length - 2 : Math.max(0, c - 1), f = i[h + 1] - i[h] || 1;
  return Math.round(n[h] + (A - i[h]) * (n[h + 1] - n[h]) / f);
}
function py(A, i, n, c, h) {
  const f = xu(A, n), a = fy(f, c, h), o = [0];
  f.forEach((m) => o.push(o.at(-1) + m));
  const d = [0];
  a.forEach((m) => d.push(d.at(-1) + m));
  const U = /* @__PURE__ */ new Map();
  i.forEach((m) => {
    const w = [...m.querySelectorAll(":scope > .proportion-label")].map((I) => ({
      label: I,
      center: Math.max(1, Math.min(n - 1, dy(hy(I, n), o, d))),
      requiredHalfWidth: Math.ceil(_u(I.textContent) * 1.22 / 2) + 12
    })).sort((I, T) => I.center - T.center);
    w.forEach(({ label: I, center: T, requiredHalfWidth: x }, N) => {
      const O = N ? T - w[N - 1].center : 1 / 0, F = N < w.length - 1 ? w[N + 1].center - T : 1 / 0, g = N ? O - w[N - 1].requiredHalfWidth - 12 : 1 / 0, R = N < w.length - 1 ? F - w[N + 1].requiredHalfWidth - 12 : 1 / 0, V = Math.min(520, O * 0.44, F * 0.44), E = Math.max(1, Math.floor(Math.min(Math.max(V, x), g, R, T, n - T)));
      U.set(I, {
        left: T - E,
        right: T + E
      });
    });
  });
  const b = [...d], v = new Map(d.map((m) => [m, m]));
  [...U.values()].flatMap(({ left: m, right: w }) => [m, w]).sort((m, w) => m - w).forEach((m) => {
    if (v.has(m)) return;
    const w = b.reduce((T, x) => Math.abs(x - m) < Math.abs(T - m) ? x : T), I = Math.abs(w - m) <= 45 ? w : m;
    v.set(m, I), I === m && b.push(m);
  });
  const _ = [...new Set(b)].sort((m, w) => m - w), C = new Map(_.map((m, w) => [m, w + 1]));
  return {
    columnCount: _.length - 1,
    columnWidths: _.slice(1).map((m, w) => m - _[w]),
    columnLines: [null, ...d.map((m) => C.get(m))],
    labelRanges: new Map([...U].map(([m, { left: w, right: I }]) => [m, {
      start: C.get(v.get(w)),
      end: C.get(v.get(I))
    }]))
  };
}
function gy(A, i, { keepNext: n = !1, top: c = !1, bottom: h = !1 } = {}) {
  const f = [...A.querySelectorAll(":scope > .proportion-label")].map((b) => ({
    label: b,
    range: i.labelRanges.get(b)
  })).filter(({ range: b }) => b).sort((b, v) => b.range.start - v.range.start), a = [], o = (b, v) => ({
    ...c ? { top: VA } : {},
    ...h ? { bottom: VA } : {},
    ...b === 1 ? {
      left: VA,
      start: VA
    } : {},
    ...v === i.columnCount ? {
      right: VA,
      end: VA
    } : {}
  }), d = (b, v) => {
    v < b || a.push(Xn(v - b + 1, !1, n, o(b, v)));
  };
  let U = 1;
  return f.forEach(({ label: b, range: v }) => {
    v.start < U || (d(U, v.start - 1), a.push(ii(b, {
      alignment: fe.CENTER,
      borders: o(v.start, v.end - 1),
      columnSpan: v.end - v.start,
      keepNext: n,
      margins: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })), U = v.end);
  }), d(U, i.columnCount), new Ts({
    children: a.length ? a : [Xn(i.columnCount, !1, n, o(1, i.columnCount))],
    cantSplit: !0
  });
}
function wy(A) {
  return 400 + A.reduce((i, { role: n, row: c }) => {
    if (n === "chord-name") {
      const h = [...c.querySelectorAll(":scope > .mode-chord-name")];
      return i + 380 * Math.max(1, ...h.map((f) => f.querySelectorAll(":scope > .mode-chord-name-line").length));
    }
    return n === "heji" ? i + 420 : i + 350;
  }, 0);
}
function By(A, i, n = 0) {
  const c = A.style.getPropertyValue("--mode-table-grid").trim().split(/\s+/).map((E) => Number.parseFloat(E)).filter((E) => Number.isFinite(E) && E > 0), h = c.reduce((E, q) => E + q, 0) || 1, f = Number(A.dataset.summaryPatternWidth) || 760, a = Math.min(ri, Math.max(1, Math.round(h * Ay))), o = Al(A, ".mode-family-boundary", c), d = i.tetrachords ? Al(A, ".mode-tetrachord-start", c) : /* @__PURE__ */ new Set(), U = [];
  [
    [".mode-chord-function-row", "function"],
    [".mode-chord-name-row", "chord-name"],
    [".mode-degree-row", "degree"]
  ].forEach(([E, q]) => {
    if (!i.chords && (q === "function" || q === "chord-name")) return;
    const lA = A.querySelector(`:scope > ${E}`);
    lA && U.push({
      role: q,
      row: lA
    });
  });
  const b = A.querySelector(":scope > .mode-pitch-body"), v = b?.querySelector(":scope > .mode-ratio-row");
  i.ratios && v && U.push({
    role: "ratio",
    row: v
  }), b?.querySelectorAll(":scope > .summary-heji-rows > .summary-heji-row").forEach((E) => {
    U.push({
      role: "heji",
      row: E
    });
  }), i.intervals && A.querySelectorAll(":scope > .mode-proportions > .proportion-row:not(.is-empty)").forEach((E) => {
    U.push({
      role: "proportion",
      row: E
    });
  });
  const _ = py(c.length ? c : [1], U.filter(({ role: E }) => E === "proportion").map(({ row: E }) => E), a, U.find(({ role: E }) => E === "chord-name")?.row, f >= 700 ? 40 : 25), { columnCount: C, columnWidths: m, columnLines: w } = _, I = new Set(ty.map((E) => w[E] - 1).filter((E) => Number.isInteger(E) && E > 0 && E < C)), T = (E) => new Set([...E].map((q) => w[q + 1] - 1)), x = T(o), N = T(d), O = x, F = wy(U) + n <= Ds - Su, g = /* @__PURE__ */ new Set([
    "function",
    "chord-name",
    "degree",
    "ratio"
  ]), R = U.findIndex(({ role: E }) => E === "proportion"), V = U.findLastIndex(({ role: E }) => E === "heji");
  return new cu({
    rows: U.map(({ role: E, row: q }, lA) => {
      const k = !F && g.has(E), Z = F ? lA < U.length - 1 : k || E === "heji" && lA === V && R >= 0 || E === "proportion" && lA < U.length - 1;
      return E === "proportion" ? gy(q, _, {
        keepNext: Z,
        top: lA === R,
        bottom: lA === U.length - 1
      }) : cy(q, C, {
        columnLines: w,
        blankBoundaries: I,
        top: lA === 0,
        bottom: E === "chord-name" || E === "degree" || lA === U.length - 1,
        dashedBoundaries: E === "ratio" || E === "heji" ? N : /* @__PURE__ */ new Set(),
        keepNext: Z,
        solidBoundaries: E === "degree" ? O : E === "function" || E === "chord-name" ? x : /* @__PURE__ */ new Set(),
        tableHeader: k
      });
    }),
    width: {
      size: a,
      type: Mt.DXA
    },
    columnWidths: m,
    layout: ou.FIXED,
    margins: {
      top: 25,
      right: f >= 700 ? 40 : 25,
      bottom: 25,
      left: f >= 700 ? 40 : 25
    },
    borders: {
      ...ds,
      insideHorizontal: it,
      insideVertical: it
    },
    alignment: fe.LEFT,
    indent: {
      size: 0,
      type: Mt.DXA
    }
  });
}
function my(A, i) {
  for (const n of document.styleSheets) {
    let c;
    try {
      c = n.cssRules;
    } catch {
      continue;
    }
    for (const h of c ?? []) {
      if (h.type !== CSSRule.FONT_FACE_RULE || h.style.getPropertyValue("font-family").replace(/["']/g, "").trim() !== A) continue;
      const f = h.style.getPropertyValue("src").match(/url\(["']?([^"')]+)["']?\)/)?.[1];
      if (f) return f;
    }
  }
  return new URL(i, document.baseURI).href;
}
async function Kn(A, i) {
  const n = await fetch(my(A, i));
  if (!n.ok) throw new Error(`Police ${A} indisponible (${n.status}).`);
  return {
    name: A,
    data: new Uint8Array(await n.arrayBuffer())
  };
}
async function vy() {
  return Promise.all([
    Kn(Bt, "/assets/HEJI2Text.otf"),
    Kn(Pt, "/assets/Inter-Light.ttf"),
    Kn(We, "/assets/RobotoSlab-Regular.ttf"),
    Kn(Vr, "/assets/RobotoSlab-Light.ttf")
  ]);
}
function yy(A) {
  const i = atob(A.split(",")[1] ?? ""), n = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c += 1) n[c] = i.charCodeAt(c);
  return n;
}
async function Cy(A, i) {
  if (!A.length) return /* @__PURE__ */ new Map();
  const n = A.map((d) => {
    const U = Number(d.dataset.exportCaptureWidth);
    return U > 0 ? U : 1040;
  }), c = Math.ceil(Math.max(...n)), h = 3, f = "#fffefb", a = document.createElement("div");
  Object.assign(a.style, {
    position: "fixed",
    left: "-20000px",
    top: "0",
    width: `${c}px`,
    background: f,
    pointerEvents: "none"
  });
  const o = A.map((d, U) => {
    const b = n[U], v = document.createElement("div");
    Object.assign(v.style, {
      width: `${b}px`,
      position: "relative",
      overflow: "hidden",
      background: f
    });
    const _ = d.cloneNode(!0);
    return Object.assign(_.style, {
      width: `${b}px`,
      margin: "0",
      contentVisibility: "visible"
    }), _.querySelector("figcaption")?.remove(), v.append(_), a.append(v), {
      figure: d,
      wrapper: v,
      clone: _
    };
  });
  document.body.append(a);
  try {
    if (typeof FontFace == "function" && document.fonts && i) {
      const v = new FontFace(Bt, i);
      await v.load(), document.fonts.add(v), await document.fonts.load(`32px "${Bt}"`);
    }
    document.fonts?.ready && await document.fonts.ready, await ps(), o.forEach(({ wrapper: v, clone: _ }) => {
      const C = v.getBoundingClientRect();
      _.querySelectorAll("foreignObject").forEach((m) => {
        const w = m.getBoundingClientRect(), I = m.firstElementChild ? getComputedStyle(m.firstElementChild) : null, T = I?.fontSize, x = I?.alignItems, N = document.createElement("div");
        Object.assign(N.style, {
          position: "absolute",
          left: `${w.left - C.left}px`,
          top: `${w.top - C.top}px`,
          width: `${w.width}px`,
          height: `${w.height}px`,
          overflow: "visible"
        }), [...m.children].forEach((O) => {
          T && (O.style.fontSize = T), x && (O.style.alignItems = x), N.append(O);
        }), v.append(N), m.remove();
      });
    }), await ps();
    const d = o.map(({ wrapper: v }) => ({
      top: v.offsetTop,
      height: Math.max(1, v.offsetHeight)
    })), U = await (0, X0.default)(a, {
      backgroundColor: f,
      logging: !1,
      scale: h,
      useCORS: !0,
      width: c,
      height: Math.max(1, Math.ceil(a.scrollHeight)),
      windowWidth: c,
      onclone: async (v) => {
        const _ = v.defaultView?.FontFace;
        if (!_ || !v.fonts || !i) return;
        const C = new _(Bt, i);
        await C.load(), v.fonts.add(C), await v.fonts.load(`32px "${Bt}"`), await v.fonts.ready;
      }
    }), b = U.width / c;
    return new Map(o.map(({ figure: v }, _) => {
      const C = Math.round(d[_].top * b), m = Math.max(1, Math.round(d[_].height * b)), w = document.createElement("canvas");
      w.width = U.width, w.height = m;
      const I = w.getContext("2d", { alpha: !1 });
      I.fillStyle = f, I.fillRect(0, 0, w.width, w.height), I.drawImage(U, 0, C, U.width, m, 0, 0, w.width, m);
      const T = I.getImageData(0, 0, w.width, w.height).data;
      let x = w.width, N = w.height, O = -1, F = -1;
      for (let V = 0; V < w.height; V += 1) for (let E = 0; E < w.width; E += 1) {
        const q = (V * w.width + E) * 4;
        Math.abs(T[q] - 255) + Math.abs(T[q + 1] - 254) + Math.abs(T[q + 2] - 251) < 18 || (x = Math.min(x, E), N = Math.min(N, V), O = Math.max(O, E), F = Math.max(F, V));
      }
      if (O >= x && F >= N) {
        const V = Math.round(12 * b);
        x = Math.max(0, x - V), N = Math.max(0, N - V), O = Math.min(w.width - 1, O + V), F = Math.min(w.height - 1, F + V);
        const E = document.createElement("canvas");
        E.width = O - x + 1, E.height = F - N + 1, E.getContext("2d", { alpha: !1 }).drawImage(w, x, N, E.width, E.height, 0, 0, E.width, E.height), w.width = E.width, w.height = E.height, w.getContext("2d", { alpha: !1 }).drawImage(E, 0, 0);
      }
      let g = Math.min(Z0, q0), R = Math.max(1, Math.round(g * w.height / w.width));
      return R > rs && (g = Math.max(1, Math.round(g * rs / R)), R = rs), [v, {
        bytes: yy(w.toDataURL("image/png")),
        height: R,
        width: g
      }];
    }));
  } finally {
    a.remove();
  }
}
function Fy(A) {
  const i = [], n = (c) => {
    [...c.children].forEach((h) => {
      if (!(h.hidden || h.closest("[hidden]"))) {
        if (h.matches(ry)) {
          i.push(h);
          return;
        }
        n(h);
      }
    });
  };
  return n(A), i;
}
function tl(A, i, n, c) {
  A?.({
    completed: i,
    total: n,
    label: c
  });
}
function is() {
  return new Le({
    children: [new je("")],
    keepNext: !1,
    keepLines: !0,
    spacing: {
      before: 0,
      after: 0,
      line: 240
    }
  });
}
function Ey(A, i) {
  if (/^H[1-6]$/.test(A[i - 1]?.tagName ?? "")) return !1;
  for (let n = i; n < A.length && /^H[1-6]$/.test(A[n].tagName); n += 1) if (A[n].tagName === "H2" || A[n].tagName === "H3") return !0;
  return !1;
}
function rl(A, i) {
  let n = 0;
  for (let c = i - 1; c >= 0 && /^H[1-6]$/.test(A[c].tagName); c -= 1) n += 800;
  return n;
}
async function Iy(A, { title: i = "Sommaire", onProgress: n } = {}) {
  if (!(A instanceof Element)) throw new Error("Le Sommaire n’est pas disponible.");
  const c = Fy(A);
  if (!c.length) throw new Error("Le Sommaire filtré est vide.");
  const h = {
    chords: A.dataset.showChords !== "false",
    ratios: A.dataset.showRatios !== "false",
    tetrachords: A.dataset.showTetrachords !== "false",
    intervals: A.dataset.showIntervals !== "false"
  }, f = [], a = vy(), o = c.filter((b) => b.classList.contains("summary-network-figure")), d = a.then((b) => Cy(o, b.find((v) => v.name === Bt)?.data));
  for (let b = 0; b < c.length; b += 1) {
    const v = c[b];
    let _ = "contenu";
    if (/^H[1-6]$/.test(v.tagName)) {
      const C = Ey(c, b);
      f.push(oy(v, { explicitPageBreakBefore: C && f.length > 0 })), _ = "titres";
    } else if (v.classList.contains("summary-network-figure")) {
      const C = (await d).get(v);
      if (!C) throw new Error("Le graphique du réseau n’a pas pu être préparé.");
      f.push(new Le({
        children: [new _B({
          data: C.bytes,
          type: "png",
          transformation: {
            width: C.width,
            height: C.height
          },
          altText: {
            title: v.querySelector("figcaption")?.textContent?.trim() || i,
            description: v.querySelector("svg")?.getAttribute("aria-label") || i,
            name: `Graphique ${b + 1}`
          }
        })],
        alignment: fe.CENTER,
        keepLines: !0,
        spacing: {
          before: 0,
          after: 0
        }
      })), c[b + 1]?.classList.contains("summary-network-figure") && f.push(is()), _ = "graphiques";
    } else if (v.classList.contains("summary-analysis-wrap")) {
      const C = v.querySelector(".summary-pattern-model");
      C && (f.push(By(C, h, rl(c, b))), b < c.length - 1 && f.push(is())), _ = "tableaux détaillés";
    } else if (v.classList.contains("summary-synthesis-wrap")) {
      const C = v.querySelector("table");
      C && (f.push(uy(C, rl(c, b))), b < c.length - 1 && f.push(is())), _ = "tableaux de synthèse";
    } else {
      const C = c[b + 1];
      f.push(Tu(v, {
        keepNext: !!C?.matches(".summary-analysis-wrap, .summary-synthesis-wrap"),
        run: {
          color: "000000",
          font: $o,
          size: 24
        },
        spacing: {
          before: 0,
          after: 0,
          line: 276
        }
      }));
    }
    tl(n, b + 1, c.length, _), (b + 1) % 20 === 0 && await ps();
  }
  const U = new w0({
    creator: "Harmonie naturelle",
    title: i,
    description: "Sommaire du réseau harmonique sélectionné",
    fonts: await a,
    styles: {
      default: {
        document: {
          run: {
            color: "000000",
            font: $o,
            size: 24
          },
          paragraph: { spacing: {
            before: 0,
            after: 0,
            line: 276
          } }
        },
        title: {
          run: {
            color: "000000",
            font: Vr,
            size: 36,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 0,
              after: 160
            }
          }
        },
        heading1: {
          run: {
            color: "000000",
            font: Vr,
            size: 32,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 240,
              after: 140
            }
          }
        },
        heading2: {
          run: {
            color: "000000",
            font: We,
            size: 28,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 200,
              after: 120
            }
          }
        },
        heading3: {
          run: {
            color: "000000",
            font: We,
            size: 24,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 60,
              after: 60
            }
          }
        },
        heading4: {
          run: {
            color: "000000",
            font: We,
            size: 20,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 160,
              after: 60
            }
          }
        },
        heading5: {
          run: {
            color: "000000",
            font: We,
            size: 20,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 160,
              after: 60
            }
          }
        },
        heading6: {
          run: {
            color: "000000",
            font: We,
            size: 20,
            bold: !1,
            italics: !1
          },
          paragraph: {
            keepNext: !0,
            keepLines: !0,
            spacing: {
              before: 160,
              after: 60
            }
          }
        }
      },
      paragraphStyles: [{
        id: "SummaryTableCell",
        name: "Cellule de tableau du sommaire",
        basedOn: "Normal",
        next: "SummaryTableCell",
        run: {
          color: "000000",
          font: Pt,
          size: 20
        },
        paragraph: {
          keepLines: !0,
          spacing: {
            before: 0,
            after: 0,
            line: 240
          }
        }
      }],
      characterStyles: [{
        id: "SummaryHejiAccidental",
        name: "Accidentelle HEJI du sommaire",
        run: { font: Bt }
      }]
    },
    sections: [{
      properties: { page: {
        size: {
          width: Uu,
          height: bu,
          orientation: Vn.PORTRAIT
        },
        margin: {
          top: fs,
          right: hs,
          bottom: fs,
          left: hs
        }
      } },
      children: f
    }]
  });
  return tl(n, c.length, c.length, "création du fichier"), vu.toBlob(U, !1, z0(U));
}
export {
  Iy as createSummaryDocx
};
