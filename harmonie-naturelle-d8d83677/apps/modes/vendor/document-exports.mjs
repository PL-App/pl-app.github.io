var Ip = Object.create, sl = Object.defineProperty, _p = Object.getOwnPropertyDescriptor, xp = Object.getOwnPropertyNames, Tp = Object.getPrototypeOf, Sp = Object.prototype.hasOwnProperty, Hp = (A, i) => () => (i || (A((i = { exports: {} }).exports, i), A = null), i.exports), Lp = (A, i, r, c) => {
  if (i && typeof i == "object" || typeof i == "function")
    for (var h = xp(i), f = 0, s = h.length, o; f < s; f++)
      o = h[f], !Sp.call(A, o) && o !== r && sl(A, o, {
        get: ((d) => i[d]).bind(null, o),
        enumerable: !(c = _p(i, o)) || c.enumerable
      });
  return A;
}, Dp = (A, i, r) => (r = A != null ? Ip(Tp(A)) : {}, Lp(i || !A || !A.__esModule ? sl(r, "default", {
  value: A,
  enumerable: !0
}) : r, A)), rr = /* @__PURE__ */ ((A) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(A, { get: (i, r) => (typeof require < "u" ? require : i)[r] }) : A)(function(A) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + A + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), Rp = Object.create, ol = Object.defineProperty, Op = Object.getOwnPropertyDescriptor, Np = Object.getOwnPropertyNames, kp = Object.getPrototypeOf, Kp = Object.prototype.hasOwnProperty, ll = (A, i) => () => (A && (i = A(A = 0)), i), FA = (A, i) => () => (i || (A((i = { exports: {} }).exports, i), A = null), i.exports), Mp = (A, i, r, c) => {
  if (i && typeof i == "object" || typeof i == "function") for (var h = Np(i), f = 0, s = h.length, o; f < s; f++)
    o = h[f], !Kp.call(A, o) && o !== r && ol(A, o, {
      get: ((d) => i[d]).bind(null, o),
      enumerable: !(c = Op(i, o)) || c.enumerable
    });
  return A;
}, Ba = (A, i, r) => (r = A != null ? Rp(kp(A)) : {}, Mp(i || !A || !A.__esModule ? ol(r, "default", {
  value: A,
  enumerable: !0
}) : r, A)), Dn = /* @__PURE__ */ ((A) => typeof rr < "u" ? rr : typeof Proxy < "u" ? new Proxy(A, { get: (i, r) => (typeof rr < "u" ? rr : i)[r] }) : A)(function(A) {
  if (typeof rr < "u") return rr.apply(this, arguments);
  throw Error('Calling `require` for "' + A + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function Wr(A) {
  "@babel/helpers - typeof";
  return Wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Wr(A);
}
function Pp(A, i) {
  if (Wr(A) != "object" || !A) return A;
  var r = A[Symbol.toPrimitive];
  if (r !== void 0) {
    var c = r.call(A, i || "default");
    if (Wr(c) != "object") return c;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(A);
}
function Gp(A) {
  var i = Pp(A, "string");
  return Wr(i) == "symbol" ? i : i + "";
}
function hA(A, i, r) {
  return (i = Gp(i)) in A ? Object.defineProperty(A, i, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : A[i] = r, A;
}
var Vn = class {
  constructor(A) {
    hA(this, "rootKey", void 0), this.rootKey = A;
  }
}, Vp = Object.seal({}), mA = class extends Vn {
  constructor(A) {
    super(A), hA(this, "root", void 0), this.root = new Array();
  }
  prepForXml(A) {
    var i;
    A.stack.push(this);
    const r = this.root.map((c) => c instanceof Vn ? c.prepForXml(A) : c).filter((c) => c !== void 0);
    return A.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((i = r[0]) === null || i === void 0) && i._attr) ? r[0] : r : Vp };
  }
  addChildElement(A) {
    return this.root.push(A), this;
  }
}, vt = class extends mA {
  constructor(A, i) {
    super(A), hA(this, "includeIfEmpty", void 0), this.includeIfEmpty = i;
  }
  prepForXml(A) {
    const i = super.prepForXml(A);
    if (this.includeIfEmpty || i && (typeof i[this.rootKey] != "object" || Object.keys(i[this.rootKey]).length)) return i;
  }
};
function xo(A, i) {
  var r = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(A);
    i && (c = c.filter(function(h) {
      return Object.getOwnPropertyDescriptor(A, h).enumerable;
    })), r.push.apply(r, c);
  }
  return r;
}
function UA(A) {
  for (var i = 1; i < arguments.length; i++) {
    var r = arguments[i] != null ? arguments[i] : {};
    i % 2 ? xo(Object(r), !0).forEach(function(c) {
      hA(A, c, r[c]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(r)) : xo(Object(r)).forEach(function(c) {
      Object.defineProperty(A, c, Object.getOwnPropertyDescriptor(r, c));
    });
  }
  return A;
}
var NA = class extends Vn {
  constructor(A) {
    super("_attr"), hA(this, "root", void 0), hA(this, "xmlKeys", void 0), this.root = A;
  }
  prepForXml(A) {
    const i = {};
    return Object.entries(this.root).forEach(([r, c]) => {
      if (c !== void 0) {
        const h = this.xmlKeys && this.xmlKeys[r] || r;
        i[h] = c;
      }
    }), { _attr: i };
  }
}, ul = class extends Vn {
  constructor(A) {
    super("_attr"), hA(this, "root", void 0), this.root = A;
  }
  prepForXml(A) {
    return { _attr: Object.values(this.root).filter(({ value: i }) => i !== void 0).reduce((i, { key: r, value: c }) => UA(UA({}, i), {}, { [r]: c }), {}) };
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
}, ma = /* @__PURE__ */ FA(((A, i) => {
  var r = typeof Reflect == "object" ? Reflect : null, c = r && typeof r.apply == "function" ? r.apply : function(O, M, I) {
    return Function.prototype.apply.call(O, M, I);
  }, h;
  r && typeof r.ownKeys == "function" ? h = r.ownKeys : Object.getOwnPropertySymbols ? h = function(O) {
    return Object.getOwnPropertyNames(O).concat(Object.getOwnPropertySymbols(O));
  } : h = function(O) {
    return Object.getOwnPropertyNames(O);
  };
  function f(g) {
    console && console.warn && console.warn(g);
  }
  var s = Number.isNaN || function(O) {
    return O !== O;
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
      if (typeof g != "number" || g < 0 || s(g)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + g + ".");
      d = g;
    }
  }), o.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, o.prototype.setMaxListeners = function(O) {
    if (typeof O != "number" || O < 0 || s(O)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + O + ".");
    return this._maxListeners = O, this;
  };
  function F(g) {
    return g._maxListeners === void 0 ? o.defaultMaxListeners : g._maxListeners;
  }
  o.prototype.getMaxListeners = function() {
    return F(this);
  }, o.prototype.emit = function(O) {
    for (var M = [], I = 1; I < arguments.length; I++) M.push(arguments[I]);
    var Z = O === "error", uA = this._events;
    if (uA !== void 0) Z = Z && uA.error === void 0;
    else if (!Z) return !1;
    if (Z) {
      var k;
      if (M.length > 0 && (k = M[0]), k instanceof Error) throw k;
      var q = /* @__PURE__ */ new Error("Unhandled error." + (k ? " (" + k.message + ")" : ""));
      throw q.context = k, q;
    }
    var L = uA[O];
    if (L === void 0) return !1;
    if (typeof L == "function") c(L, this, M);
    else
      for (var $ = L.length, lA = b(L, $), I = 0; I < $; ++I) c(lA[I], this, M);
    return !0;
  };
  function B(g, O, M, I) {
    var Z, uA, k;
    if (U(M), uA = g._events, uA === void 0 ? (uA = g._events = /* @__PURE__ */ Object.create(null), g._eventsCount = 0) : (uA.newListener !== void 0 && (g.emit("newListener", O, M.listener ? M.listener : M), uA = g._events), k = uA[O]), k === void 0)
      k = uA[O] = M, ++g._eventsCount;
    else if (typeof k == "function" ? k = uA[O] = I ? [M, k] : [k, M] : I ? k.unshift(M) : k.push(M), Z = F(g), Z > 0 && k.length > Z && !k.warned) {
      k.warned = !0;
      var q = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + k.length + " " + String(O) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      q.name = "MaxListenersExceededWarning", q.emitter = g, q.type = O, q.count = k.length, f(q);
    }
    return g;
  }
  o.prototype.addListener = function(O, M) {
    return B(this, O, M, !1);
  }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(O, M) {
    return B(this, O, M, !0);
  };
  function _() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function E(g, O, M) {
    var I = {
      fired: !1,
      wrapFn: void 0,
      target: g,
      type: O,
      listener: M
    }, Z = _.bind(I);
    return Z.listener = M, I.wrapFn = Z, Z;
  }
  o.prototype.once = function(O, M) {
    return U(M), this.on(O, E(this, O, M)), this;
  }, o.prototype.prependOnceListener = function(O, M) {
    return U(M), this.prependListener(O, E(this, O, M)), this;
  }, o.prototype.removeListener = function(O, M) {
    var I, Z, uA, k, q;
    if (U(M), Z = this._events, Z === void 0) return this;
    if (I = Z[O], I === void 0) return this;
    if (I === M || I.listener === M) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete Z[O], Z.removeListener && this.emit("removeListener", O, I.listener || M));
    else if (typeof I != "function") {
      for (uA = -1, k = I.length - 1; k >= 0; k--) if (I[k] === M || I[k].listener === M) {
        q = I[k].listener, uA = k;
        break;
      }
      if (uA < 0) return this;
      uA === 0 ? I.shift() : T(I, uA), I.length === 1 && (Z[O] = I[0]), Z.removeListener !== void 0 && this.emit("removeListener", O, q || M);
    }
    return this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(O) {
    var M, I = this._events, Z;
    if (I === void 0) return this;
    if (I.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : I[O] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete I[O]), this;
    if (arguments.length === 0) {
      var uA = Object.keys(I), k;
      for (Z = 0; Z < uA.length; ++Z)
        k = uA[Z], k !== "removeListener" && this.removeAllListeners(k);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (M = I[O], typeof M == "function") this.removeListener(O, M);
    else if (M !== void 0) for (Z = M.length - 1; Z >= 0; Z--) this.removeListener(O, M[Z]);
    return this;
  };
  function v(g, O, M) {
    var I = g._events;
    if (I === void 0) return [];
    var Z = I[O];
    return Z === void 0 ? [] : typeof Z == "function" ? M ? [Z.listener || Z] : [Z] : M ? x(Z) : b(Z, Z.length);
  }
  o.prototype.listeners = function(O) {
    return v(this, O, !0);
  }, o.prototype.rawListeners = function(O) {
    return v(this, O, !1);
  }, o.listenerCount = function(g, O) {
    return typeof g.listenerCount == "function" ? g.listenerCount(O) : w.call(g, O);
  }, o.prototype.listenerCount = w;
  function w(g) {
    var O = this._events;
    if (O !== void 0) {
      var M = O[g];
      if (typeof M == "function") return 1;
      if (M !== void 0) return M.length;
    }
    return 0;
  }
  o.prototype.eventNames = function() {
    return this._eventsCount > 0 ? h(this._events) : [];
  };
  function b(g, O) {
    for (var M = new Array(O), I = 0; I < O; ++I) M[I] = g[I];
    return M;
  }
  function T(g, O) {
    for (; O + 1 < g.length; O++) g[O] = g[O + 1];
    g.pop();
  }
  function x(g) {
    for (var O = new Array(g.length), M = 0; M < O.length; ++M) O[M] = g[M].listener || g[M];
    return O;
  }
  function N(g, O) {
    return new Promise(function(M, I) {
      function Z(k) {
        g.removeListener(O, uA), I(k);
      }
      function uA() {
        typeof g.removeListener == "function" && g.removeListener("error", Z), M([].slice.call(arguments));
      }
      C(g, O, uA, { once: !0 }), O !== "error" && R(g, Z, { once: !0 });
    });
  }
  function R(g, O, M) {
    typeof g.on == "function" && C(g, "error", O, M);
  }
  function C(g, O, M, I) {
    if (typeof g.on == "function") I.once ? g.once(O, M) : g.on(O, M);
    else if (typeof g.addEventListener == "function") g.addEventListener(O, function Z(uA) {
      I.once && g.removeEventListener(O, Z), M(uA);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof g);
  }
})), yt = /* @__PURE__ */ FA(((A, i) => {
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
})), me, wr = ll((() => {
  me = globalThis || self;
}));
function Wp(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
function sa() {
  throw new Error("setTimeout has not been defined");
}
function oa() {
  throw new Error("clearTimeout has not been defined");
}
function cl(A) {
  if (Ge === setTimeout) return setTimeout(A, 0);
  if ((Ge === sa || !Ge) && setTimeout)
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
function Xp(A) {
  if (Ve === clearTimeout) return clearTimeout(A);
  if ((Ve === oa || !Ve) && clearTimeout)
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
function jp() {
  !Kt || !kt || (Kt = !1, kt.length ? Xe = kt.concat(Xe) : Gr = -1, Xe.length && hl());
}
function hl() {
  if (!Kt) {
    var A = cl(jp);
    Kt = !0;
    for (var i = Xe.length; i; ) {
      for (kt = Xe, Xe = []; ++Gr < i; ) kt && kt[Gr].run();
      Gr = -1, i = Xe.length;
    }
    kt = null, Kt = !1, Xp(A);
  }
}
function To(A, i) {
  this.fun = A, this.array = i;
}
function et() {
}
var Vi, ne, Ge, Ve, Xe, Kt, kt, Gr, So, MA, Ct = ll((() => {
  Vi = { exports: {} }, ne = Vi.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? Ge = setTimeout : Ge = sa;
    } catch {
      Ge = sa;
    }
    try {
      typeof clearTimeout == "function" ? Ve = clearTimeout : Ve = oa;
    } catch {
      Ve = oa;
    }
  })(), Xe = [], Kt = !1, Gr = -1, ne.nextTick = function(A) {
    var i = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
    Xe.push(new To(A, i)), Xe.length === 1 && !Kt && cl(hl);
  }, To.prototype.run = function() {
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
  }, So = Vi.exports, MA = /* @__PURE__ */ Wp(So);
})), fl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = ma().EventEmitter;
})), zp = /* @__PURE__ */ FA(((A) => {
  A.byteLength = d, A.toByteArray = F, A.fromByteArray = E;
  for (var i = [], r = [], c = typeof Uint8Array < "u" ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, s = h.length; f < s; ++f)
    i[f] = h[f], r[h.charCodeAt(f)] = f;
  r[45] = 62, r[95] = 63;
  function o(v) {
    var w = v.length;
    if (w % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var b = v.indexOf("=");
    b === -1 && (b = w);
    var T = b === w ? 0 : 4 - b % 4;
    return [b, T];
  }
  function d(v) {
    var w = o(v), b = w[0], T = w[1];
    return (b + T) * 3 / 4 - T;
  }
  function U(v, w, b) {
    return (w + b) * 3 / 4 - b;
  }
  function F(v) {
    var w, b = o(v), T = b[0], x = b[1], N = new c(U(v, T, x)), R = 0, C = x > 0 ? T - 4 : T, g;
    for (g = 0; g < C; g += 4)
      w = r[v.charCodeAt(g)] << 18 | r[v.charCodeAt(g + 1)] << 12 | r[v.charCodeAt(g + 2)] << 6 | r[v.charCodeAt(g + 3)], N[R++] = w >> 16 & 255, N[R++] = w >> 8 & 255, N[R++] = w & 255;
    return x === 2 && (w = r[v.charCodeAt(g)] << 2 | r[v.charCodeAt(g + 1)] >> 4, N[R++] = w & 255), x === 1 && (w = r[v.charCodeAt(g)] << 10 | r[v.charCodeAt(g + 1)] << 4 | r[v.charCodeAt(g + 2)] >> 2, N[R++] = w >> 8 & 255, N[R++] = w & 255), N;
  }
  function B(v) {
    return i[v >> 18 & 63] + i[v >> 12 & 63] + i[v >> 6 & 63] + i[v & 63];
  }
  function _(v, w, b) {
    for (var T, x = [], N = w; N < b; N += 3)
      T = (v[N] << 16 & 16711680) + (v[N + 1] << 8 & 65280) + (v[N + 2] & 255), x.push(B(T));
    return x.join("");
  }
  function E(v) {
    for (var w, b = v.length, T = b % 3, x = [], N = 16383, R = 0, C = b - T; R < C; R += N) x.push(_(v, R, R + N > C ? C : R + N));
    return T === 1 ? (w = v[b - 1], x.push(i[w >> 2] + i[w << 4 & 63] + "==")) : T === 2 && (w = (v[b - 2] << 8) + v[b - 1], x.push(i[w >> 10] + i[w >> 4 & 63] + i[w << 2 & 63] + "=")), x.join("");
  }
})), Jp = /* @__PURE__ */ FA(((A) => {
  A.read = function(i, r, c, h, f) {
    var s, o, d = f * 8 - h - 1, U = (1 << d) - 1, F = U >> 1, B = -7, _ = c ? f - 1 : 0, E = c ? -1 : 1, v = i[r + _];
    for (_ += E, s = v & (1 << -B) - 1, v >>= -B, B += d; B > 0; s = s * 256 + i[r + _], _ += E, B -= 8) ;
    for (o = s & (1 << -B) - 1, s >>= -B, B += h; B > 0; o = o * 256 + i[r + _], _ += E, B -= 8) ;
    if (s === 0) s = 1 - F;
    else {
      if (s === U) return o ? NaN : (v ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, h), s = s - F;
    }
    return (v ? -1 : 1) * o * Math.pow(2, s - h);
  }, A.write = function(i, r, c, h, f, s) {
    var o, d, U, F = s * 8 - f - 1, B = (1 << F) - 1, _ = B >> 1, E = f === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, v = h ? 0 : s - 1, w = h ? 1 : -1, b = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (d = isNaN(r) ? 1 : 0, o = B) : (o = Math.floor(Math.log(r) / Math.LN2), r * (U = Math.pow(2, -o)) < 1 && (o--, U *= 2), o + _ >= 1 ? r += E / U : r += E * Math.pow(2, 1 - _), r * U >= 2 && (o++, U /= 2), o + _ >= B ? (d = 0, o = B) : o + _ >= 1 ? (d = (r * U - 1) * Math.pow(2, f), o = o + _) : (d = r * Math.pow(2, _ - 1) * Math.pow(2, f), o = 0)); f >= 8; i[c + v] = d & 255, v += w, d /= 256, f -= 8) ;
    for (o = o << f | d, F += f; F > 0; i[c + v] = o & 255, v += w, o /= 256, F -= 8) ;
    i[c + v - w] |= b * 128;
  };
})), Jn = /* @__PURE__ */ FA(((A) => {
  var i = zp(), r = Jp(), c = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
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
  function s(D) {
    if (D > h) throw new RangeError('The value "' + D + '" is invalid for option "size"');
    var l = new Uint8Array(D);
    return Object.setPrototypeOf(l, o.prototype), l;
  }
  function o(D, l, u) {
    if (typeof D == "number") {
      if (typeof l == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return B(D);
    }
    return d(D, l, u);
  }
  o.poolSize = 8192;
  function d(D, l, u) {
    if (typeof D == "string") return _(D, l);
    if (ArrayBuffer.isView(D)) return v(D);
    if (D == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof D);
    if (V(D, ArrayBuffer) || D && V(D.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (V(D, SharedArrayBuffer) || D && V(D.buffer, SharedArrayBuffer))) return w(D, l, u);
    if (typeof D == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var Q = D.valueOf && D.valueOf();
    if (Q != null && Q !== D) return o.from(Q, l, u);
    var j = b(D);
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
  function F(D, l, u) {
    return U(D), D <= 0 ? s(D) : l !== void 0 ? typeof u == "string" ? s(D).fill(l, u) : s(D).fill(l) : s(D);
  }
  o.alloc = function(D, l, u) {
    return F(D, l, u);
  };
  function B(D) {
    return U(D), s(D < 0 ? 0 : T(D) | 0);
  }
  o.allocUnsafe = function(D) {
    return B(D);
  }, o.allocUnsafeSlow = function(D) {
    return B(D);
  };
  function _(D, l) {
    if ((typeof l != "string" || l === "") && (l = "utf8"), !o.isEncoding(l)) throw new TypeError("Unknown encoding: " + l);
    var u = N(D, l) | 0, Q = s(u), j = Q.write(D, l);
    return j !== u && (Q = Q.slice(0, j)), Q;
  }
  function E(D) {
    for (var l = D.length < 0 ? 0 : T(D.length) | 0, u = s(l), Q = 0; Q < l; Q += 1) u[Q] = D[Q] & 255;
    return u;
  }
  function v(D) {
    if (V(D, Uint8Array)) {
      var l = new Uint8Array(D);
      return w(l.buffer, l.byteOffset, l.byteLength);
    }
    return E(D);
  }
  function w(D, l, u) {
    if (l < 0 || D.byteLength < l) throw new RangeError('"offset" is outside of buffer bounds');
    if (D.byteLength < l + (u || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var Q;
    return l === void 0 && u === void 0 ? Q = new Uint8Array(D) : u === void 0 ? Q = new Uint8Array(D, l) : Q = new Uint8Array(D, l, u), Object.setPrototypeOf(Q, o.prototype), Q;
  }
  function b(D) {
    if (o.isBuffer(D)) {
      var l = T(D.length) | 0, u = s(l);
      return u.length === 0 || D.copy(u, 0, 0, l), u;
    }
    if (D.length !== void 0)
      return typeof D.length != "number" || m(D.length) ? s(0) : E(D);
    if (D.type === "Buffer" && Array.isArray(D.data)) return E(D.data);
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
    if (V(l, Uint8Array) && (l = o.from(l, l.offset, l.byteLength)), V(u, Uint8Array) && (u = o.from(u, u.offset, u.byteLength)), !o.isBuffer(l) || !o.isBuffer(u)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
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
      if (V(Y, Uint8Array)) AA + Y.length > j.length ? o.from(Y).copy(j, AA) : Uint8Array.prototype.set.call(j, Y, AA);
      else if (o.isBuffer(Y)) Y.copy(j, AA);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      AA += Y.length;
    }
    return j;
  };
  function N(D, l) {
    if (o.isBuffer(D)) return D.length;
    if (ArrayBuffer.isView(D) || V(D, ArrayBuffer)) return D.byteLength;
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
  function R(D, l, u) {
    var Q = !1;
    if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((u === void 0 || u > this.length) && (u = this.length), u <= 0) || (u >>>= 0, l >>>= 0, u <= l)) return "";
    for (D || (D = "utf8"); ; ) switch (D) {
      case "hex":
        return aA(this, l, u);
      case "utf8":
      case "utf-8":
        return L(this, l, u);
      case "ascii":
        return rA(this, l, u);
      case "latin1":
      case "binary":
        return vA(this, l, u);
      case "base64":
        return q(this, l, u);
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
  function C(D, l, u) {
    var Q = D[l];
    D[l] = D[u], D[u] = Q;
  }
  o.prototype.swap16 = function() {
    var l = this.length;
    if (l % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var u = 0; u < l; u += 2) C(this, u, u + 1);
    return this;
  }, o.prototype.swap32 = function() {
    var l = this.length;
    if (l % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var u = 0; u < l; u += 4)
      C(this, u, u + 3), C(this, u + 1, u + 2);
    return this;
  }, o.prototype.swap64 = function() {
    var l = this.length;
    if (l % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var u = 0; u < l; u += 8)
      C(this, u, u + 7), C(this, u + 1, u + 6), C(this, u + 2, u + 5), C(this, u + 3, u + 4);
    return this;
  }, o.prototype.toString = function() {
    var l = this.length;
    return l === 0 ? "" : arguments.length === 0 ? L(this, 0, l) : R.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(l) {
    if (!o.isBuffer(l)) throw new TypeError("Argument must be a Buffer");
    return this === l ? !0 : o.compare(this, l) === 0;
  }, o.prototype.inspect = function() {
    var l = "", u = A.INSPECT_MAX_BYTES;
    return l = this.toString("hex", 0, u).replace(/(.{2})/g, "$1 ").trim(), this.length > u && (l += " ... "), "<Buffer " + l + ">";
  }, c && (o.prototype[c] = o.prototype.inspect), o.prototype.compare = function(l, u, Q, j, AA) {
    if (V(l, Uint8Array) && (l = o.from(l, l.offset, l.byteLength)), !o.isBuffer(l)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof l);
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
    if (typeof u == "string" ? (Q = u, u = 0) : u > 2147483647 ? u = 2147483647 : u < -2147483648 && (u = -2147483648), u = +u, m(u) && (u = j ? 0 : D.length - 1), u < 0 && (u = D.length + u), u >= D.length) {
      if (j) return -1;
      u = D.length - 1;
    } else if (u < 0) if (j) u = 0;
    else return -1;
    if (typeof l == "string" && (l = o.from(l, Q)), o.isBuffer(l))
      return l.length === 0 ? -1 : O(D, l, u, Q, j);
    if (typeof l == "number")
      return l = l & 255, typeof Uint8Array.prototype.indexOf == "function" ? j ? Uint8Array.prototype.indexOf.call(D, l, u) : Uint8Array.prototype.lastIndexOf.call(D, l, u) : O(D, [l], u, Q, j);
    throw new TypeError("val must be string, number or Buffer");
  }
  function O(D, l, u, Q, j) {
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
  function M(D, l, u, Q) {
    u = Number(u) || 0;
    var j = D.length - u;
    Q ? (Q = Number(Q), Q > j && (Q = j)) : Q = j;
    var AA = l.length;
    Q > AA / 2 && (Q = AA / 2);
    for (var Y = 0; Y < Q; ++Y) {
      var gA = parseInt(l.substr(Y * 2, 2), 16);
      if (m(gA)) return Y;
      D[u + Y] = gA;
    }
    return Y;
  }
  function I(D, l, u, Q) {
    return P(y(l, D.length - u), D, u, Q);
  }
  function Z(D, l, u, Q) {
    return P(J(l), D, u, Q);
  }
  function uA(D, l, u, Q) {
    return P(pA(l), D, u, Q);
  }
  function k(D, l, u, Q) {
    return P(z(l, D.length - u), D, u, Q);
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
        return M(this, l, u, Q);
      case "utf8":
      case "utf-8":
        return I(this, l, u, Q);
      case "ascii":
      case "latin1":
      case "binary":
        return Z(this, l, u, Q);
      case "base64":
        return uA(this, l, u, Q);
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
  function q(D, l, u) {
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
    return lA(Q);
  }
  var $ = 4096;
  function lA(D) {
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
  function aA(D, l, u) {
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
    return l = l >>> 0, u || tA(l, 4, this.length), r.read(this, l, !0, 23, 4);
  }, o.prototype.readFloatBE = function(l, u) {
    return l = l >>> 0, u || tA(l, 4, this.length), r.read(this, l, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(l, u) {
    return l = l >>> 0, u || tA(l, 8, this.length), r.read(this, l, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(l, u) {
    return l = l >>> 0, u || tA(l, 8, this.length), r.read(this, l, !1, 52, 8);
  };
  function G(D, l, u, Q, j, AA) {
    if (!o.isBuffer(D)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > j || l < AA) throw new RangeError('"value" argument is out of bounds');
    if (u + Q > D.length) throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, Q = Q >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q) - 1;
      G(this, l, u, Q, AA, 0);
    }
    var Y = 1, gA = 0;
    for (this[u] = l & 255; ++gA < Q && (Y *= 256); ) this[u + gA] = l / Y & 255;
    return u + Q;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, Q = Q >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q) - 1;
      G(this, l, u, Q, AA, 0);
    }
    var Y = Q - 1, gA = 1;
    for (this[u + Y] = l & 255; --Y >= 0 && (gA *= 256); ) this[u + Y] = l / gA & 255;
    return u + Q;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 1, 255, 0), this[u] = l & 255, u + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 2, 65535, 0), this[u] = l & 255, this[u + 1] = l >>> 8, u + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 2, 65535, 0), this[u] = l >>> 8, this[u + 1] = l & 255, u + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 4, 4294967295, 0), this[u + 3] = l >>> 24, this[u + 2] = l >>> 16, this[u + 1] = l >>> 8, this[u] = l & 255, u + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 4, 4294967295, 0), this[u] = l >>> 24, this[u + 1] = l >>> 16, this[u + 2] = l >>> 8, this[u + 3] = l & 255, u + 4;
  }, o.prototype.writeIntLE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q - 1);
      G(this, l, u, Q, AA - 1, -AA);
    }
    var Y = 0, gA = 1, yA = 0;
    for (this[u] = l & 255; ++Y < Q && (gA *= 256); )
      l < 0 && yA === 0 && this[u + Y - 1] !== 0 && (yA = 1), this[u + Y] = (l / gA >> 0) - yA & 255;
    return u + Q;
  }, o.prototype.writeIntBE = function(l, u, Q, j) {
    if (l = +l, u = u >>> 0, !j) {
      var AA = Math.pow(2, 8 * Q - 1);
      G(this, l, u, Q, AA - 1, -AA);
    }
    var Y = Q - 1, gA = 1, yA = 0;
    for (this[u + Y] = l & 255; --Y >= 0 && (gA *= 256); )
      l < 0 && yA === 0 && this[u + Y + 1] !== 0 && (yA = 1), this[u + Y] = (l / gA >> 0) - yA & 255;
    return u + Q;
  }, o.prototype.writeInt8 = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 1, 127, -128), l < 0 && (l = 255 + l + 1), this[u] = l & 255, u + 1;
  }, o.prototype.writeInt16LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 2, 32767, -32768), this[u] = l & 255, this[u + 1] = l >>> 8, u + 2;
  }, o.prototype.writeInt16BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 2, 32767, -32768), this[u] = l >>> 8, this[u + 1] = l & 255, u + 2;
  }, o.prototype.writeInt32LE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 4, 2147483647, -2147483648), this[u] = l & 255, this[u + 1] = l >>> 8, this[u + 2] = l >>> 16, this[u + 3] = l >>> 24, u + 4;
  }, o.prototype.writeInt32BE = function(l, u, Q) {
    return l = +l, u = u >>> 0, Q || G(this, l, u, 4, 2147483647, -2147483648), l < 0 && (l = 4294967295 + l + 1), this[u] = l >>> 24, this[u + 1] = l >>> 16, this[u + 2] = l >>> 8, this[u + 3] = l & 255, u + 4;
  };
  function iA(D, l, u, Q, j, AA) {
    if (u + Q > D.length) throw new RangeError("Index out of range");
    if (u < 0) throw new RangeError("Index out of range");
  }
  function sA(D, l, u, Q, j) {
    return l = +l, u = u >>> 0, j || iA(D, l, u, 4, 34028234663852886e22, -34028234663852886e22), r.write(D, l, u, Q, 23, 4), u + 4;
  }
  o.prototype.writeFloatLE = function(l, u, Q) {
    return sA(this, l, u, !0, Q);
  }, o.prototype.writeFloatBE = function(l, u, Q) {
    return sA(this, l, u, !1, Q);
  };
  function fA(D, l, u, Q, j) {
    return l = +l, u = u >>> 0, j || iA(D, l, u, 8, 17976931348623157e292, -17976931348623157e292), r.write(D, l, u, Q, 52, 8), u + 8;
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
  function P(D, l, u, Q) {
    for (var j = 0; j < Q && !(j + u >= l.length || j >= D.length); ++j)
      l[j + u] = D[j];
    return j;
  }
  function V(D, l) {
    return D instanceof l || D != null && D.constructor != null && D.constructor.name != null && D.constructor.name === l.name;
  }
  function m(D) {
    return D !== D;
  }
  var eA = (function() {
    for (var D = "0123456789abcdef", l = new Array(256), u = 0; u < 16; ++u)
      for (var Q = u * 16, j = 0; j < 16; ++j) l[Q + j] = D[u] + D[j];
    return l;
  })();
})), dl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var c = {}, h = /* @__PURE__ */ Symbol("test"), f = Object(h);
    if (typeof h == "string" || Object.prototype.toString.call(h) !== "[object Symbol]" || Object.prototype.toString.call(f) !== "[object Symbol]") return !1;
    var s = 42;
    c[h] = s;
    for (var o in c) return !1;
    if (typeof Object.keys == "function" && Object.keys(c).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(c).length !== 0) return !1;
    var d = Object.getOwnPropertySymbols(c);
    if (d.length !== 1 || d[0] !== h || !Object.prototype.propertyIsEnumerable.call(c, h)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var U = Object.getOwnPropertyDescriptor(c, h);
      if (U.value !== s || U.enumerable !== !0) return !1;
    }
    return !0;
  };
})), va = /* @__PURE__ */ FA(((A, i) => {
  var r = dl();
  i.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), pl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Object;
})), Yp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Error;
})), qp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = EvalError;
})), Zp = /* @__PURE__ */ FA(((A, i) => {
  i.exports = RangeError;
})), $p = /* @__PURE__ */ FA(((A, i) => {
  i.exports = ReferenceError;
})), gl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = SyntaxError;
})), Yn = /* @__PURE__ */ FA(((A, i) => {
  i.exports = TypeError;
})), Ag = /* @__PURE__ */ FA(((A, i) => {
  i.exports = URIError;
})), eg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.abs;
})), tg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.floor;
})), rg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.max;
})), ng = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.min;
})), ig = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.pow;
})), ag = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Math.round;
})), sg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Number.isNaN || function(c) {
    return c !== c;
  };
})), og = /* @__PURE__ */ FA(((A, i) => {
  var r = sg();
  i.exports = function(h) {
    return r(h) || h === 0 ? h : h < 0 ? -1 : 1;
  };
})), lg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Object.getOwnPropertyDescriptor;
})), jr = /* @__PURE__ */ FA(((A, i) => {
  var r = lg();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  i.exports = r;
})), qn = /* @__PURE__ */ FA(((A, i) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  i.exports = r;
})), ug = /* @__PURE__ */ FA(((A, i) => {
  var r = typeof Symbol < "u" && Symbol, c = dl();
  i.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : c();
  };
})), wl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), Bl = /* @__PURE__ */ FA(((A, i) => {
  i.exports = pl().getPrototypeOf || null;
})), cg = /* @__PURE__ */ FA(((A, i) => {
  var r = "Function.prototype.bind called on incompatible ", c = Object.prototype.toString, h = Math.max, f = "[object Function]", s = function(F, B) {
    for (var _ = [], E = 0; E < F.length; E += 1) _[E] = F[E];
    for (var v = 0; v < B.length; v += 1) _[v + F.length] = B[v];
    return _;
  }, o = function(F, B) {
    for (var _ = [], E = B || 0, v = 0; E < F.length; E += 1, v += 1) _[v] = F[E];
    return _;
  }, d = function(U, F) {
    for (var B = "", _ = 0; _ < U.length; _ += 1)
      B += U[_], _ + 1 < U.length && (B += F);
    return B;
  };
  i.exports = function(F) {
    var B = this;
    if (typeof B != "function" || c.apply(B) !== f) throw new TypeError(r + B);
    for (var _ = o(arguments, 1), E, v = function() {
      if (this instanceof E) {
        var N = B.apply(this, s(_, arguments));
        return Object(N) === N ? N : this;
      }
      return B.apply(F, s(_, arguments));
    }, w = h(0, B.length - _.length), b = [], T = 0; T < w; T++) b[T] = "$" + T;
    if (E = Function("binder", "return function (" + d(b, ",") + "){ return binder.apply(this,arguments); }")(v), B.prototype) {
      var x = function() {
      };
      x.prototype = B.prototype, E.prototype = new x(), x.prototype = null;
    }
    return E;
  };
})), zr = /* @__PURE__ */ FA(((A, i) => {
  var r = cg();
  i.exports = Function.prototype.bind || r;
})), ya = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Function.prototype.call;
})), Ca = /* @__PURE__ */ FA(((A, i) => {
  i.exports = Function.prototype.apply;
})), hg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), ml = /* @__PURE__ */ FA(((A, i) => {
  var r = zr(), c = Ca(), h = ya();
  i.exports = hg() || r.call(h, c);
})), Fa = /* @__PURE__ */ FA(((A, i) => {
  var r = zr(), c = Yn(), h = ya(), f = ml();
  i.exports = function(o) {
    if (o.length < 1 || typeof o[0] != "function") throw new c("a function is required");
    return f(r, h, o);
  };
})), fg = /* @__PURE__ */ FA(((A, i) => {
  var r = Fa(), c = jr(), h;
  try {
    h = [].__proto__ === Array.prototype;
  } catch (d) {
    if (!d || typeof d != "object" || !("code" in d) || d.code !== "ERR_PROTO_ACCESS") throw d;
  }
  var f = !!h && c && c(Object.prototype, "__proto__"), s = Object, o = s.getPrototypeOf;
  i.exports = f && typeof f.get == "function" ? r([f.get]) : typeof o == "function" ? function(U) {
    return o(U == null ? U : s(U));
  } : !1;
})), vl = /* @__PURE__ */ FA(((A, i) => {
  var r = wl(), c = Bl(), h = fg();
  i.exports = r ? function(s) {
    return r(s);
  } : c ? function(s) {
    if (!s || typeof s != "object" && typeof s != "function") throw new TypeError("getProto: not an object");
    return c(s);
  } : h ? function(s) {
    return h(s);
  } : null;
})), dg = /* @__PURE__ */ FA(((A, i) => {
  var r = Function.prototype.call, c = Object.prototype.hasOwnProperty;
  i.exports = zr().call(r, c);
})), yl = /* @__PURE__ */ FA(((A, i) => {
  var r, c = pl(), h = Yp(), f = qp(), s = Zp(), o = $p(), d = gl(), U = Yn(), F = Ag(), B = eg(), _ = tg(), E = rg(), v = ng(), w = ig(), b = ag(), T = og(), x = Function, N = function(z) {
    try {
      return x('"use strict"; return (' + z + ").constructor;")();
    } catch {
    }
  }, R = jr(), C = qn(), g = function() {
    throw new U();
  }, O = R ? (function() {
    try {
      return arguments.callee, g;
    } catch {
      try {
        return R(arguments, "callee").get;
      } catch {
        return g;
      }
    }
  })() : g, M = ug()(), I = vl(), Z = Bl(), uA = wl(), k = Ca(), q = ya(), L = {}, $ = typeof Uint8Array > "u" || !I ? r : I(Uint8Array), lA = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": M && I ? I([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": L,
    "%AsyncGenerator%": L,
    "%AsyncGeneratorFunction%": L,
    "%AsyncIteratorPrototype%": L,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": h,
    "%eval%": eval,
    "%EvalError%": f,
    "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": x,
    "%GeneratorFunction%": L,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": M && I ? I(I([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !M || !I ? r : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": c,
    "%Object.getOwnPropertyDescriptor%": R,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": s,
    "%ReferenceError%": o,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !M || !I ? r : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": M && I ? I(""[Symbol.iterator]()) : r,
    "%Symbol%": M ? Symbol : r,
    "%SyntaxError%": d,
    "%ThrowTypeError%": O,
    "%TypedArray%": $,
    "%TypeError%": U,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": F,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": q,
    "%Function.prototype.apply%": k,
    "%Object.defineProperty%": C,
    "%Object.getPrototypeOf%": Z,
    "%Math.abs%": B,
    "%Math.floor%": _,
    "%Math.max%": E,
    "%Math.min%": v,
    "%Math.pow%": w,
    "%Math.round%": b,
    "%Math.sign%": T,
    "%Reflect.getPrototypeOf%": uA
  };
  if (I) try {
    null.error;
  } catch (z) {
    lA["%Error.prototype%"] = I(I(z));
  }
  var rA = function z(pA) {
    var P;
    if (pA === "%AsyncFunction%") P = N("async function () {}");
    else if (pA === "%GeneratorFunction%") P = N("function* () {}");
    else if (pA === "%AsyncGeneratorFunction%") P = N("async function* () {}");
    else if (pA === "%AsyncGenerator%") {
      var V = z("%AsyncGeneratorFunction%");
      V && (P = V.prototype);
    } else if (pA === "%AsyncIteratorPrototype%") {
      var m = z("%AsyncGenerator%");
      m && I && (P = I(m.prototype));
    }
    return lA[pA] = P, P;
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
  }, aA = zr(), dA = dg(), tA = aA.call(q, Array.prototype.concat), G = aA.call(k, Array.prototype.splice), iA = aA.call(q, String.prototype.replace), sA = aA.call(q, String.prototype.slice), fA = aA.call(q, RegExp.prototype.exec), _A = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, H = /\\(\\)?/g, y = function(pA) {
    var P = sA(pA, 0, 1), V = sA(pA, -1);
    if (P === "%" && V !== "%") throw new d("invalid intrinsic syntax, expected closing `%`");
    if (V === "%" && P !== "%") throw new d("invalid intrinsic syntax, expected opening `%`");
    var m = [];
    return iA(pA, _A, function(eA, D, l, u) {
      m[m.length] = l ? iA(u, H, "$1") : D || eA;
    }), m;
  }, J = function(pA, P) {
    var V = pA, m;
    if (dA(vA, V) && (m = vA[V], V = "%" + m[0] + "%"), dA(lA, V)) {
      var eA = lA[V];
      if (eA === L && (eA = rA(V)), typeof eA > "u" && !P) throw new U("intrinsic " + pA + " exists, but is not available. Please file an issue!");
      return {
        alias: m,
        name: V,
        value: eA
      };
    }
    throw new d("intrinsic " + pA + " does not exist!");
  };
  i.exports = function(pA, P) {
    if (typeof pA != "string" || pA.length === 0) throw new U("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof P != "boolean") throw new U('"allowMissing" argument must be a boolean');
    if (fA(/^%?[^%]*%?$/, pA) === null) throw new d("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var V = y(pA), m = V.length > 0 ? V[0] : "", eA = J("%" + m + "%", P), D = eA.name, l = eA.value, u = !1, Q = eA.alias;
    Q && (m = Q[0], G(V, tA([0, 1], Q)));
    for (var j = 1, AA = !0; j < V.length; j += 1) {
      var Y = V[j], gA = sA(Y, 0, 1), yA = sA(Y, -1);
      if ((gA === '"' || gA === "'" || gA === "`" || yA === '"' || yA === "'" || yA === "`") && gA !== yA) throw new d("property names with quotes must have matching quotes");
      if ((Y === "constructor" || !AA) && (u = !0), m += "." + Y, D = "%" + m + "%", dA(lA, D)) l = lA[D];
      else if (l != null) {
        if (!(Y in l)) {
          if (!P) throw new U("base intrinsic for " + pA + " exists, but the property is not available.");
          return;
        }
        if (R && j + 1 >= V.length) {
          var BA = R(l, Y);
          AA = !!BA, AA && "get" in BA && !("originalValue" in BA.get) ? l = BA.get : l = l[Y];
        } else
          AA = dA(l, Y), l = l[Y];
        AA && !u && (lA[D] = l);
      }
    }
    return l;
  };
})), Cl = /* @__PURE__ */ FA(((A, i) => {
  var r = yl(), c = Fa(), h = c([r("%String.prototype.indexOf%")]);
  i.exports = function(s, o) {
    var d = r(s, !!o);
    return typeof d == "function" && h(s, ".prototype.") > -1 ? c([d]) : d;
  };
})), pg = /* @__PURE__ */ FA(((A, i) => {
  var r = va()(), c = Cl()("Object.prototype.toString"), h = function(d) {
    return r && d && typeof d == "object" && Symbol.toStringTag in d ? !1 : c(d) === "[object Arguments]";
  }, f = function(d) {
    return h(d) ? !0 : d !== null && typeof d == "object" && "length" in d && typeof d.length == "number" && d.length >= 0 && c(d) !== "[object Array]" && "callee" in d && c(d.callee) === "[object Function]";
  }, s = (function() {
    return h(arguments);
  })();
  h.isLegacyArguments = f, i.exports = s ? h : f;
})), gg = /* @__PURE__ */ FA(((A, i) => {
  var r = Object.prototype.toString, c = Function.prototype.toString, h = /^\s*(?:function)?\*/, f = va()(), s = Object.getPrototypeOf, o = function() {
    if (!f) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, d;
  i.exports = function(F) {
    if (typeof F != "function") return !1;
    if (h.test(c.call(F))) return !0;
    if (!f) return r.call(F) === "[object GeneratorFunction]";
    if (!s) return !1;
    if (typeof d > "u") {
      var B = o();
      d = B ? s(B) : !1;
    }
    return s(F) === d;
  };
})), wg = /* @__PURE__ */ FA(((A, i) => {
  var r = Function.prototype.toString, c = typeof Reflect == "object" && Reflect !== null && Reflect.apply, h, f;
  if (typeof c == "function" && typeof Object.defineProperty == "function") try {
    h = Object.defineProperty({}, "length", { get: function() {
      throw f;
    } }), f = {}, c(function() {
      throw 42;
    }, null, h);
  } catch (R) {
    R !== f && (c = null);
  }
  else c = null;
  var s = /^\s*class\b/, o = function(C) {
    try {
      var g = r.call(C);
      return s.test(g);
    } catch {
      return !1;
    }
  }, d = function(C) {
    try {
      return o(C) ? !1 : (r.call(C), !0);
    } catch {
      return !1;
    }
  }, U = Object.prototype.toString, F = "[object Object]", B = "[object Function]", _ = "[object GeneratorFunction]", E = "[object HTMLAllCollection]", v = "[object HTML document.all class]", w = "[object HTMLCollection]", b = typeof Symbol == "function" && !!Symbol.toStringTag, T = !(0 in [,]), x = function() {
    return !1;
  };
  if (typeof document == "object") {
    var N = document.all;
    U.call(N) === U.call(document.all) && (x = function(C) {
      if ((T || !C) && (typeof C > "u" || typeof C == "object")) try {
        var g = U.call(C);
        return (g === E || g === v || g === w || g === F) && C("") == null;
      } catch {
      }
      return !1;
    });
  }
  i.exports = c ? function(C) {
    if (x(C)) return !0;
    if (!C || typeof C != "function" && typeof C != "object") return !1;
    try {
      c(C, null, h);
    } catch (g) {
      if (g !== f) return !1;
    }
    return !o(C) && d(C);
  } : function(C) {
    if (x(C)) return !0;
    if (!C || typeof C != "function" && typeof C != "object") return !1;
    if (b) return d(C);
    if (o(C)) return !1;
    var g = U.call(C);
    return g !== B && g !== _ && !/^\[object HTML/.test(g) ? !1 : d(C);
  };
})), Bg = /* @__PURE__ */ FA(((A, i) => {
  var r = wg(), c = Object.prototype.toString, h = Object.prototype.hasOwnProperty, f = function(F, B, _) {
    for (var E = 0, v = F.length; E < v; E++) h.call(F, E) && (_ == null ? B(F[E], E, F) : B.call(_, F[E], E, F));
  }, s = function(F, B, _) {
    for (var E = 0, v = F.length; E < v; E++) _ == null ? B(F.charAt(E), E, F) : B.call(_, F.charAt(E), E, F);
  }, o = function(F, B, _) {
    for (var E in F) h.call(F, E) && (_ == null ? B(F[E], E, F) : B.call(_, F[E], E, F));
  };
  function d(U) {
    return c.call(U) === "[object Array]";
  }
  i.exports = function(F, B, _) {
    if (!r(B)) throw new TypeError("iterator must be a function");
    var E;
    arguments.length >= 3 && (E = _), d(F) ? f(F, B, E) : typeof F == "string" ? s(F, B, E) : o(F, B, E);
  };
})), mg = /* @__PURE__ */ FA(((A, i) => {
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
})), vg = /* @__PURE__ */ FA(((A, i) => {
  wr();
  var r = mg(), c = typeof globalThis > "u" ? me : globalThis;
  i.exports = function() {
    for (var f = [], s = 0; s < r.length; s++) typeof c[r[s]] == "function" && (f[f.length] = r[s]);
    return f;
  };
})), yg = /* @__PURE__ */ FA(((A, i) => {
  var r = qn(), c = gl(), h = Yn(), f = jr();
  i.exports = function(o, d, U) {
    if (!o || typeof o != "object" && typeof o != "function") throw new h("`obj` must be an object or a function`");
    if (typeof d != "string" && typeof d != "symbol") throw new h("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new h("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new h("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new h("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new h("`loose`, if provided, must be a boolean");
    var F = arguments.length > 3 ? arguments[3] : null, B = arguments.length > 4 ? arguments[4] : null, _ = arguments.length > 5 ? arguments[5] : null, E = arguments.length > 6 ? arguments[6] : !1, v = !!f && f(o, d);
    if (r) r(o, d, {
      configurable: _ === null && v ? v.configurable : !_,
      enumerable: F === null && v ? v.enumerable : !F,
      value: U,
      writable: B === null && v ? v.writable : !B
    });
    else if (E || !F && !B && !_) o[d] = U;
    else throw new c("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), Cg = /* @__PURE__ */ FA(((A, i) => {
  var r = qn(), c = function() {
    return !!r;
  };
  c.hasArrayLengthDefineBug = function() {
    if (!r) return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, i.exports = c;
})), Fg = /* @__PURE__ */ FA(((A, i) => {
  var r = yl(), c = yg(), h = Cg()(), f = jr(), s = Yn(), o = r("%Math.floor%");
  i.exports = function(U, F) {
    if (typeof U != "function") throw new s("`fn` is not a function");
    if (typeof F != "number" || F < 0 || F > 4294967295 || o(F) !== F) throw new s("`length` must be a positive 32-bit integer");
    var B = arguments.length > 2 && !!arguments[2], _ = !0, E = !0;
    if ("length" in U && f) {
      var v = f(U, "length");
      v && !v.configurable && (_ = !1), v && !v.writable && (E = !1);
    }
    return (_ || E || !B) && (h ? c(U, "length", F, !0, !0) : c(U, "length", F)), U;
  };
})), Eg = /* @__PURE__ */ FA(((A, i) => {
  var r = zr(), c = Ca(), h = ml();
  i.exports = function() {
    return h(r, c, arguments);
  };
})), Qg = /* @__PURE__ */ FA(((A, i) => {
  var r = Fg(), c = qn(), h = Fa(), f = Eg();
  i.exports = function(o) {
    var d = h(arguments), U = o.length - (arguments.length - 1);
    return r(d, 1 + (U > 0 ? U : 0), !0);
  }, c ? c(i.exports, "apply", { value: f }) : i.exports.apply = f;
})), Fl = /* @__PURE__ */ FA(((A, i) => {
  wr();
  var r = Bg(), c = vg(), h = Qg(), f = Cl(), s = jr(), o = vl(), d = f("Object.prototype.toString"), U = va()(), F = typeof globalThis > "u" ? me : globalThis, B = c(), _ = f("String.prototype.slice"), E = f("Array.prototype.indexOf", !0) || function(x, N) {
    for (var R = 0; R < x.length; R += 1) if (x[R] === N) return R;
    return -1;
  }, v = { __proto__: null };
  U && s && o ? r(B, function(T) {
    var x = new F[T]();
    if (Symbol.toStringTag in x && o) {
      var N = o(x), R = s(N, Symbol.toStringTag);
      !R && N && (R = s(o(N), Symbol.toStringTag)), v["$" + T] = h(R.get);
    }
  }) : r(B, function(T) {
    var x = new F[T](), N = x.slice || x.set;
    N && (v["$" + T] = h(N));
  });
  var w = function(x) {
    var N = !1;
    return r(v, function(R, C) {
      if (!N) try {
        "$" + R(x) === C && (N = _(C, 1));
      } catch {
      }
    }), N;
  }, b = function(x) {
    var N = !1;
    return r(v, function(R, C) {
      if (!N) try {
        R(x), N = _(C, 1);
      } catch {
      }
    }), N;
  };
  i.exports = function(x) {
    if (!x || typeof x != "object") return !1;
    if (!U) {
      var N = _(d(x), 8, -1);
      return E(B, N) > -1 ? N : N !== "Object" ? !1 : b(x);
    }
    return s ? w(x) : null;
  };
})), Ug = /* @__PURE__ */ FA(((A, i) => {
  var r = Fl();
  i.exports = function(h) {
    return !!r(h);
  };
})), bg = /* @__PURE__ */ FA(((A) => {
  var i = pg(), r = gg(), c = Fl(), h = Ug();
  function f(Q) {
    return Q.call.bind(Q);
  }
  var s = typeof BigInt < "u", o = typeof Symbol < "u", d = f(Object.prototype.toString), U = f(Number.prototype.valueOf), F = f(String.prototype.valueOf), B = f(Boolean.prototype.valueOf);
  if (s) var _ = f(BigInt.prototype.valueOf);
  if (o) var E = f(Symbol.prototype.valueOf);
  function v(Q, j) {
    if (typeof Q != "object") return !1;
    try {
      return j(Q), !0;
    } catch {
      return !1;
    }
  }
  A.isArgumentsObject = i, A.isGeneratorFunction = r, A.isTypedArray = h;
  function w(Q) {
    return typeof Promise < "u" && Q instanceof Promise || Q !== null && typeof Q == "object" && typeof Q.then == "function" && typeof Q.catch == "function";
  }
  A.isPromise = w;
  function b(Q) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(Q) : h(Q) || iA(Q);
  }
  A.isArrayBufferView = b;
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
  function R(Q) {
    return c(Q) === "Uint32Array";
  }
  A.isUint32Array = R;
  function C(Q) {
    return c(Q) === "Int8Array";
  }
  A.isInt8Array = C;
  function g(Q) {
    return c(Q) === "Int16Array";
  }
  A.isInt16Array = g;
  function O(Q) {
    return c(Q) === "Int32Array";
  }
  A.isInt32Array = O;
  function M(Q) {
    return c(Q) === "Float32Array";
  }
  A.isFloat32Array = M;
  function I(Q) {
    return c(Q) === "Float64Array";
  }
  A.isFloat64Array = I;
  function Z(Q) {
    return c(Q) === "BigInt64Array";
  }
  A.isBigInt64Array = Z;
  function uA(Q) {
    return c(Q) === "BigUint64Array";
  }
  A.isBigUint64Array = uA;
  function k(Q) {
    return d(Q) === "[object Map]";
  }
  k.working = typeof Map < "u" && k(/* @__PURE__ */ new Map());
  function q(Q) {
    return typeof Map > "u" ? !1 : k.working ? k(Q) : Q instanceof Map;
  }
  A.isMap = q;
  function L(Q) {
    return d(Q) === "[object Set]";
  }
  L.working = typeof Set < "u" && L(/* @__PURE__ */ new Set());
  function $(Q) {
    return typeof Set > "u" ? !1 : L.working ? L(Q) : Q instanceof Set;
  }
  A.isSet = $;
  function lA(Q) {
    return d(Q) === "[object WeakMap]";
  }
  lA.working = typeof WeakMap < "u" && lA(/* @__PURE__ */ new WeakMap());
  function rA(Q) {
    return typeof WeakMap > "u" ? !1 : lA.working ? lA(Q) : Q instanceof WeakMap;
  }
  A.isWeakMap = rA;
  function vA(Q) {
    return d(Q) === "[object WeakSet]";
  }
  vA.working = typeof WeakSet < "u" && vA(/* @__PURE__ */ new WeakSet());
  function aA(Q) {
    return vA(Q);
  }
  A.isWeakSet = aA;
  function dA(Q) {
    return d(Q) === "[object ArrayBuffer]";
  }
  dA.working = typeof ArrayBuffer < "u" && dA(/* @__PURE__ */ new ArrayBuffer());
  function tA(Q) {
    return typeof ArrayBuffer > "u" ? !1 : dA.working ? dA(Q) : Q instanceof ArrayBuffer;
  }
  A.isArrayBuffer = tA;
  function G(Q) {
    return d(Q) === "[object DataView]";
  }
  G.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && G(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function iA(Q) {
    return typeof DataView > "u" ? !1 : G.working ? G(Q) : Q instanceof DataView;
  }
  A.isDataView = iA;
  var sA = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function fA(Q) {
    return d(Q) === "[object SharedArrayBuffer]";
  }
  function _A(Q) {
    return typeof sA > "u" ? !1 : (typeof fA.working > "u" && (fA.working = fA(new sA())), fA.working ? fA(Q) : Q instanceof sA);
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
  function P(Q) {
    return v(Q, U);
  }
  A.isNumberObject = P;
  function V(Q) {
    return v(Q, F);
  }
  A.isStringObject = V;
  function m(Q) {
    return v(Q, B);
  }
  A.isBooleanObject = m;
  function eA(Q) {
    return s && v(Q, _);
  }
  A.isBigIntObject = eA;
  function D(Q) {
    return o && v(Q, E);
  }
  A.isSymbolObject = D;
  function l(Q) {
    return P(Q) || V(Q) || m(Q) || eA(Q) || D(Q);
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
})), Ig = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function(c) {
    return c && typeof c == "object" && typeof c.copy == "function" && typeof c.fill == "function" && typeof c.readUInt8 == "function";
  };
})), El = /* @__PURE__ */ FA(((A) => {
  Ct();
  var i = Object.getOwnPropertyDescriptors || function(iA) {
    for (var sA = Object.keys(iA), fA = {}, _A = 0; _A < sA.length; _A++) fA[sA[_A]] = Object.getOwnPropertyDescriptor(iA, sA[_A]);
    return fA;
  }, r = /%[sdj%]/g;
  A.format = function(G) {
    if (!C(G)) {
      for (var iA = [], sA = 0; sA < arguments.length; sA++) iA.push(s(arguments[sA]));
      return iA.join(" ");
    }
    for (var sA = 1, fA = arguments, _A = fA.length, H = String(G).replace(r, function(J) {
      if (J === "%%") return "%";
      if (sA >= _A) return J;
      switch (J) {
        case "%s":
          return String(fA[sA++]);
        case "%d":
          return Number(fA[sA++]);
        case "%j":
          try {
            return JSON.stringify(fA[sA++]);
          } catch {
            return "[Circular]";
          }
        default:
          return J;
      }
    }), y = fA[sA]; sA < _A; y = fA[++sA]) x(y) || !I(y) ? H += " " + y : H += " " + s(y);
    return H;
  }, A.deprecate = function(G, iA) {
    if (typeof MA < "u" && MA.noDeprecation === !0) return G;
    if (typeof MA > "u") return function() {
      return A.deprecate(G, iA).apply(this, arguments);
    };
    var sA = !1;
    function fA() {
      if (!sA) {
        if (MA.throwDeprecation) throw new Error(iA);
        MA.traceDeprecation ? console.trace(iA) : console.error(iA), sA = !0;
      }
      return G.apply(this, arguments);
    }
    return fA;
  };
  var c = {}, h = /^$/;
  if (MA.env.NODE_DEBUG) {
    var f = MA.env.NODE_DEBUG;
    f = f.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), h = new RegExp("^" + f + "$", "i");
  }
  A.debuglog = function(G) {
    if (G = G.toUpperCase(), !c[G]) if (h.test(G)) {
      var iA = MA.pid;
      c[G] = function() {
        var sA = A.format.apply(A, arguments);
        console.error("%s %d: %s", G, iA, sA);
      };
    } else c[G] = function() {
    };
    return c[G];
  };
  function s(G, iA) {
    var sA = {
      seen: [],
      stylize: d
    };
    return arguments.length >= 3 && (sA.depth = arguments[2]), arguments.length >= 4 && (sA.colors = arguments[3]), T(iA) ? sA.showHidden = iA : iA && A._extend(sA, iA), O(sA.showHidden) && (sA.showHidden = !1), O(sA.depth) && (sA.depth = 2), O(sA.colors) && (sA.colors = !1), O(sA.customInspect) && (sA.customInspect = !0), sA.colors && (sA.stylize = o), F(sA, G, sA.depth);
  }
  A.inspect = s, s.colors = {
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
  }, s.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };
  function o(G, iA) {
    var sA = s.styles[iA];
    return sA ? "\x1B[" + s.colors[sA][0] + "m" + G + "\x1B[" + s.colors[sA][1] + "m" : G;
  }
  function d(G, iA) {
    return G;
  }
  function U(G) {
    var iA = {};
    return G.forEach(function(sA, fA) {
      iA[sA] = !0;
    }), iA;
  }
  function F(G, iA, sA) {
    if (G.customInspect && iA && k(iA.inspect) && iA.inspect !== A.inspect && !(iA.constructor && iA.constructor.prototype === iA)) {
      var fA = iA.inspect(sA, G);
      return C(fA) || (fA = F(G, fA, sA)), fA;
    }
    var _A = B(G, iA);
    if (_A) return _A;
    var H = Object.keys(iA), y = U(H);
    if (G.showHidden && (H = Object.getOwnPropertyNames(iA)), uA(iA) && (H.indexOf("message") >= 0 || H.indexOf("description") >= 0)) return _(iA);
    if (H.length === 0) {
      if (k(iA)) {
        var J = iA.name ? ": " + iA.name : "";
        return G.stylize("[Function" + J + "]", "special");
      }
      if (M(iA)) return G.stylize(RegExp.prototype.toString.call(iA), "regexp");
      if (Z(iA)) return G.stylize(Date.prototype.toString.call(iA), "date");
      if (uA(iA)) return _(iA);
    }
    var z = "", pA = !1, P = ["{", "}"];
    if (b(iA) && (pA = !0, P = ["[", "]"]), k(iA) && (z = " [Function" + (iA.name ? ": " + iA.name : "") + "]"), M(iA) && (z = " " + RegExp.prototype.toString.call(iA)), Z(iA) && (z = " " + Date.prototype.toUTCString.call(iA)), uA(iA) && (z = " " + _(iA)), H.length === 0 && (!pA || iA.length == 0)) return P[0] + z + P[1];
    if (sA < 0) return M(iA) ? G.stylize(RegExp.prototype.toString.call(iA), "regexp") : G.stylize("[Object]", "special");
    G.seen.push(iA);
    var V;
    return pA ? V = E(G, iA, sA, y, H) : V = H.map(function(m) {
      return v(G, iA, sA, y, m, pA);
    }), G.seen.pop(), w(V, z, P);
  }
  function B(G, iA) {
    if (O(iA)) return G.stylize("undefined", "undefined");
    if (C(iA)) {
      var sA = "'" + JSON.stringify(iA).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return G.stylize(sA, "string");
    }
    if (R(iA)) return G.stylize("" + iA, "number");
    if (T(iA)) return G.stylize("" + iA, "boolean");
    if (x(iA)) return G.stylize("null", "null");
  }
  function _(G) {
    return "[" + Error.prototype.toString.call(G) + "]";
  }
  function E(G, iA, sA, fA, _A) {
    for (var H = [], y = 0, J = iA.length; y < J; ++y) vA(iA, String(y)) ? H.push(v(G, iA, sA, fA, String(y), !0)) : H.push("");
    return _A.forEach(function(z) {
      z.match(/^\d+$/) || H.push(v(G, iA, sA, fA, z, !0));
    }), H;
  }
  function v(G, iA, sA, fA, _A, H) {
    var y, J, z = Object.getOwnPropertyDescriptor(iA, _A) || { value: iA[_A] };
    if (z.get ? z.set ? J = G.stylize("[Getter/Setter]", "special") : J = G.stylize("[Getter]", "special") : z.set && (J = G.stylize("[Setter]", "special")), vA(fA, _A) || (y = "[" + _A + "]"), J || (G.seen.indexOf(z.value) < 0 ? (x(sA) ? J = F(G, z.value, null) : J = F(G, z.value, sA - 1), J.indexOf(`
`) > -1 && (H ? J = J.split(`
`).map(function(pA) {
      return "  " + pA;
    }).join(`
`).slice(2) : J = `
` + J.split(`
`).map(function(pA) {
      return "   " + pA;
    }).join(`
`))) : J = G.stylize("[Circular]", "special")), O(y)) {
      if (H && _A.match(/^\d+$/)) return J;
      y = JSON.stringify("" + _A), y.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (y = y.slice(1, -1), y = G.stylize(y, "name")) : (y = y.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), y = G.stylize(y, "string"));
    }
    return y + ": " + J;
  }
  function w(G, iA, sA) {
    var fA = 0;
    return G.reduce(function(_A, H) {
      return fA++, H.indexOf(`
`) >= 0 && fA++, _A + H.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? sA[0] + (iA === "" ? "" : iA + `
 `) + " " + G.join(`,
  `) + " " + sA[1] : sA[0] + iA + " " + G.join(", ") + " " + sA[1];
  }
  A.types = bg();
  function b(G) {
    return Array.isArray(G);
  }
  A.isArray = b;
  function T(G) {
    return typeof G == "boolean";
  }
  A.isBoolean = T;
  function x(G) {
    return G === null;
  }
  A.isNull = x;
  function N(G) {
    return G == null;
  }
  A.isNullOrUndefined = N;
  function R(G) {
    return typeof G == "number";
  }
  A.isNumber = R;
  function C(G) {
    return typeof G == "string";
  }
  A.isString = C;
  function g(G) {
    return typeof G == "symbol";
  }
  A.isSymbol = g;
  function O(G) {
    return G === void 0;
  }
  A.isUndefined = O;
  function M(G) {
    return I(G) && L(G) === "[object RegExp]";
  }
  A.isRegExp = M, A.types.isRegExp = M;
  function I(G) {
    return typeof G == "object" && G !== null;
  }
  A.isObject = I;
  function Z(G) {
    return I(G) && L(G) === "[object Date]";
  }
  A.isDate = Z, A.types.isDate = Z;
  function uA(G) {
    return I(G) && (L(G) === "[object Error]" || G instanceof Error);
  }
  A.isError = uA, A.types.isNativeError = uA;
  function k(G) {
    return typeof G == "function";
  }
  A.isFunction = k;
  function q(G) {
    return G === null || typeof G == "boolean" || typeof G == "number" || typeof G == "string" || typeof G == "symbol" || typeof G > "u";
  }
  A.isPrimitive = q, A.isBuffer = Ig();
  function L(G) {
    return Object.prototype.toString.call(G);
  }
  function $(G) {
    return G < 10 ? "0" + G.toString(10) : G.toString(10);
  }
  var lA = [
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
    var G = /* @__PURE__ */ new Date(), iA = [
      $(G.getHours()),
      $(G.getMinutes()),
      $(G.getSeconds())
    ].join(":");
    return [
      G.getDate(),
      lA[G.getMonth()],
      iA
    ].join(" ");
  }
  A.log = function() {
    console.log("%s - %s", rA(), A.format.apply(A, arguments));
  }, A.inherits = yt(), A._extend = function(G, iA) {
    if (!iA || !I(iA)) return G;
    for (var sA = Object.keys(iA), fA = sA.length; fA--; ) G[sA[fA]] = iA[sA[fA]];
    return G;
  };
  function vA(G, iA) {
    return Object.prototype.hasOwnProperty.call(G, iA);
  }
  var aA = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
  A.promisify = function(iA) {
    if (typeof iA != "function") throw new TypeError('The "original" argument must be of type Function');
    if (aA && iA[aA]) {
      var sA = iA[aA];
      if (typeof sA != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(sA, aA, {
        value: sA,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), sA;
    }
    function sA() {
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
    return Object.setPrototypeOf(sA, Object.getPrototypeOf(iA)), aA && Object.defineProperty(sA, aA, {
      value: sA,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(sA, i(iA));
  }, A.promisify.custom = aA;
  function dA(G, iA) {
    if (!G) {
      var sA = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      sA.reason = G, G = sA;
    }
    return iA(G);
  }
  function tA(G) {
    if (typeof G != "function") throw new TypeError('The "original" argument must be of type Function');
    function iA() {
      for (var sA = [], fA = 0; fA < arguments.length; fA++) sA.push(arguments[fA]);
      var _A = sA.pop();
      if (typeof _A != "function") throw new TypeError("The last argument must be of type Function");
      var H = this, y = function() {
        return _A.apply(H, arguments);
      };
      G.apply(this, sA).then(function(J) {
        MA.nextTick(y.bind(null, null, J));
      }, function(J) {
        MA.nextTick(dA.bind(null, J, y));
      });
    }
    return Object.setPrototypeOf(iA, Object.getPrototypeOf(G)), Object.defineProperties(iA, i(G)), iA;
  }
  A.callbackify = tA;
})), _g = /* @__PURE__ */ FA(((A, i) => {
  function r(v, w) {
    var b = Object.keys(v);
    if (Object.getOwnPropertySymbols) {
      var T = Object.getOwnPropertySymbols(v);
      w && (T = T.filter(function(x) {
        return Object.getOwnPropertyDescriptor(v, x).enumerable;
      })), b.push.apply(b, T);
    }
    return b;
  }
  function c(v) {
    for (var w = 1; w < arguments.length; w++) {
      var b = arguments[w] != null ? arguments[w] : {};
      w % 2 ? r(Object(b), !0).forEach(function(T) {
        h(v, T, b[T]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(v, Object.getOwnPropertyDescriptors(b)) : r(Object(b)).forEach(function(T) {
        Object.defineProperty(v, T, Object.getOwnPropertyDescriptor(b, T));
      });
    }
    return v;
  }
  function h(v, w, b) {
    return w = d(w), w in v ? Object.defineProperty(v, w, {
      value: b,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : v[w] = b, v;
  }
  function f(v, w) {
    if (!(v instanceof w)) throw new TypeError("Cannot call a class as a function");
  }
  function s(v, w) {
    for (var b = 0; b < w.length; b++) {
      var T = w[b];
      T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(v, d(T.key), T);
    }
  }
  function o(v, w, b) {
    return w && s(v.prototype, w), b && s(v, b), Object.defineProperty(v, "prototype", { writable: !1 }), v;
  }
  function d(v) {
    var w = U(v, "string");
    return typeof w == "symbol" ? w : String(w);
  }
  function U(v, w) {
    if (typeof v != "object" || v === null) return v;
    var b = v[Symbol.toPrimitive];
    if (b !== void 0) {
      var T = b.call(v, w || "default");
      if (typeof T != "object") return T;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (w === "string" ? String : Number)(v);
  }
  var F = Jn().Buffer, B = El().inspect, _ = B && B.custom || "inspect";
  function E(v, w, b) {
    F.prototype.copy.call(v, w, b);
  }
  i.exports = /* @__PURE__ */ (function() {
    function v() {
      f(this, v), this.head = null, this.tail = null, this.length = 0;
    }
    return o(v, [
      {
        key: "push",
        value: function(b) {
          var T = {
            data: b,
            next: null
          };
          this.length > 0 ? this.tail.next = T : this.head = T, this.tail = T, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(b) {
          var T = {
            data: b,
            next: this.head
          };
          this.length === 0 && (this.tail = T), this.head = T, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var b = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, b;
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
        value: function(b) {
          if (this.length === 0) return "";
          for (var T = this.head, x = "" + T.data; T = T.next; ) x += b + T.data;
          return x;
        }
      },
      {
        key: "concat",
        value: function(b) {
          if (this.length === 0) return F.alloc(0);
          for (var T = F.allocUnsafe(b >>> 0), x = this.head, N = 0; x; )
            E(x.data, T, N), N += x.data.length, x = x.next;
          return T;
        }
      },
      {
        key: "consume",
        value: function(b, T) {
          var x;
          return b < this.head.data.length ? (x = this.head.data.slice(0, b), this.head.data = this.head.data.slice(b)) : b === this.head.data.length ? x = this.shift() : x = T ? this._getString(b) : this._getBuffer(b), x;
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
        value: function(b) {
          var T = this.head, x = 1, N = T.data;
          for (b -= N.length; T = T.next; ) {
            var R = T.data, C = b > R.length ? R.length : b;
            if (C === R.length ? N += R : N += R.slice(0, b), b -= C, b === 0) {
              C === R.length ? (++x, T.next ? this.head = T.next : this.head = this.tail = null) : (this.head = T, T.data = R.slice(C));
              break;
            }
            ++x;
          }
          return this.length -= x, N;
        }
      },
      {
        key: "_getBuffer",
        value: function(b) {
          var T = F.allocUnsafe(b), x = this.head, N = 1;
          for (x.data.copy(T), b -= x.data.length; x = x.next; ) {
            var R = x.data, C = b > R.length ? R.length : b;
            if (R.copy(T, T.length - b, 0, C), b -= C, b === 0) {
              C === R.length ? (++N, x.next ? this.head = x.next : this.head = this.tail = null) : (this.head = x, x.data = R.slice(C));
              break;
            }
            ++N;
          }
          return this.length -= N, T;
        }
      },
      {
        key: _,
        value: function(b, T) {
          return B(this, c(c({}, T), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), v;
  })();
})), Ql = /* @__PURE__ */ FA(((A, i) => {
  Ct();
  function r(d, U) {
    var F = this, B = this._readableState && this._readableState.destroyed, _ = this._writableState && this._writableState.destroyed;
    return B || _ ? (U ? U(d) : d && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, MA.nextTick(s, this, d)) : MA.nextTick(s, this, d)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(d || null, function(E) {
      !U && E ? F._writableState ? F._writableState.errorEmitted ? MA.nextTick(h, F) : (F._writableState.errorEmitted = !0, MA.nextTick(c, F, E)) : MA.nextTick(c, F, E) : U ? (MA.nextTick(h, F), U(E)) : MA.nextTick(h, F);
    }), this);
  }
  function c(d, U) {
    s(d, U), h(d);
  }
  function h(d) {
    d._writableState && !d._writableState.emitClose || d._readableState && !d._readableState.emitClose || d.emit("close");
  }
  function f() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function s(d, U) {
    d.emit("error", U);
  }
  function o(d, U) {
    var F = d._readableState, B = d._writableState;
    F && F.autoDestroy || B && B.autoDestroy ? d.destroy(U) : d.emit("error", U);
  }
  i.exports = {
    destroy: r,
    undestroy: f,
    errorOrDestroy: o
  };
})), Br = /* @__PURE__ */ FA(((A, i) => {
  function r(U, F) {
    U.prototype = Object.create(F.prototype), U.prototype.constructor = U, U.__proto__ = F;
  }
  var c = {};
  function h(U, F, B) {
    B || (B = Error);
    function _(v, w, b) {
      return typeof F == "string" ? F : F(v, w, b);
    }
    var E = /* @__PURE__ */ (function(v) {
      r(w, v);
      function w(b, T, x) {
        return v.call(this, _(b, T, x)) || this;
      }
      return w;
    })(B);
    E.prototype.name = B.name, E.prototype.code = U, c[U] = E;
  }
  function f(U, F) {
    if (Array.isArray(U)) {
      var B = U.length;
      return U = U.map(function(_) {
        return String(_);
      }), B > 2 ? "one of ".concat(F, " ").concat(U.slice(0, B - 1).join(", "), ", or ") + U[B - 1] : B === 2 ? "one of ".concat(F, " ").concat(U[0], " or ").concat(U[1]) : "of ".concat(F, " ").concat(U[0]);
    } else return "of ".concat(F, " ").concat(String(U));
  }
  function s(U, F, B) {
    return U.substr(!B || B < 0 ? 0 : +B, F.length) === F;
  }
  function o(U, F, B) {
    return (B === void 0 || B > U.length) && (B = U.length), U.substring(B - F.length, B) === F;
  }
  function d(U, F, B) {
    return typeof B != "number" && (B = 0), B + F.length > U.length ? !1 : U.indexOf(F, B) !== -1;
  }
  h("ERR_INVALID_OPT_VALUE", function(U, F) {
    return 'The value "' + F + '" is invalid for option "' + U + '"';
  }, TypeError), h("ERR_INVALID_ARG_TYPE", function(U, F, B) {
    var _;
    typeof F == "string" && s(F, "not ") ? (_ = "must not be", F = F.replace(/^not /, "")) : _ = "must be";
    var E;
    if (o(U, " argument")) E = "The ".concat(U, " ").concat(_, " ").concat(f(F, "type"));
    else {
      var v = d(U, ".") ? "property" : "argument";
      E = 'The "'.concat(U, '" ').concat(v, " ").concat(_, " ").concat(f(F, "type"));
    }
    return E += ". Received type ".concat(typeof B), E;
  }, TypeError), h("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), h("ERR_METHOD_NOT_IMPLEMENTED", function(U) {
    return "The " + U + " method is not implemented";
  }), h("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), h("ERR_STREAM_DESTROYED", function(U) {
    return "Cannot call " + U + " after a stream was destroyed";
  }), h("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), h("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), h("ERR_STREAM_WRITE_AFTER_END", "write after end"), h("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), h("ERR_UNKNOWN_ENCODING", function(U) {
    return "Unknown encoding: " + U;
  }, TypeError), h("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), i.exports.codes = c;
})), Ul = /* @__PURE__ */ FA(((A, i) => {
  var r = Br().codes.ERR_INVALID_OPT_VALUE;
  function c(f, s, o) {
    return f.highWaterMark != null ? f.highWaterMark : s ? f[o] : null;
  }
  function h(f, s, o, d) {
    var U = c(s, d, o);
    if (U != null) {
      if (!(isFinite(U) && Math.floor(U) === U) || U < 0) throw new r(d ? o : "highWaterMark", U);
      return Math.floor(U);
    }
    return f.objectMode ? 16 : 16 * 1024;
  }
  i.exports = { getHighWaterMark: h };
})), xg = /* @__PURE__ */ FA(((A, i) => {
  wr(), i.exports = r;
  function r(h, f) {
    if (c("noDeprecation")) return h;
    var s = !1;
    function o() {
      if (!s) {
        if (c("throwDeprecation")) throw new Error(f);
        c("traceDeprecation") ? console.trace(f) : console.warn(f), s = !0;
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
})), bl = /* @__PURE__ */ FA(((A, i) => {
  wr(), Ct(), i.exports = I;
  function r(H) {
    var y = this;
    this.next = null, this.entry = null, this.finish = function() {
      _A(y, H);
    };
  }
  var c;
  I.WritableState = O;
  var h = { deprecate: xg() }, f = fl(), s = Jn().Buffer, o = (typeof me < "u" ? me : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function d(H) {
    return s.from(H);
  }
  function U(H) {
    return s.isBuffer(H) || H instanceof o;
  }
  var F = Ql(), B = Ul().getHighWaterMark, _ = Br().codes, E = _.ERR_INVALID_ARG_TYPE, v = _.ERR_METHOD_NOT_IMPLEMENTED, w = _.ERR_MULTIPLE_CALLBACK, b = _.ERR_STREAM_CANNOT_PIPE, T = _.ERR_STREAM_DESTROYED, x = _.ERR_STREAM_NULL_VALUES, N = _.ERR_STREAM_WRITE_AFTER_END, R = _.ERR_UNKNOWN_ENCODING, C = F.errorOrDestroy;
  yt()(I, f);
  function g() {
  }
  function O(H, y, J) {
    c = c || hr(), H = H || {}, typeof J != "boolean" && (J = y instanceof c), this.objectMode = !!H.objectMode, J && (this.objectMode = this.objectMode || !!H.writableObjectMode), this.highWaterMark = B(this, H, "writableHighWaterMark", J), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var z = H.decodeStrings === !1;
    this.decodeStrings = !z, this.defaultEncoding = H.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(pA) {
      rA(y, pA);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = H.emitClose !== !1, this.autoDestroy = !!H.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  O.prototype.getBuffer = function() {
    for (var y = this.bufferedRequest, J = []; y; )
      J.push(y), y = y.next;
    return J;
  }, (function() {
    try {
      Object.defineProperty(O.prototype, "buffer", { get: h.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var M;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (M = Function.prototype[Symbol.hasInstance], Object.defineProperty(I, Symbol.hasInstance, { value: function(y) {
    return M.call(this, y) ? !0 : this !== I ? !1 : y && y._writableState instanceof O;
  } })) : M = function(y) {
    return y instanceof this;
  };
  function I(H) {
    c = c || hr();
    var y = this instanceof c;
    if (!y && !M.call(I, this)) return new I(H);
    this._writableState = new O(H, this, y), this.writable = !0, H && (typeof H.write == "function" && (this._write = H.write), typeof H.writev == "function" && (this._writev = H.writev), typeof H.destroy == "function" && (this._destroy = H.destroy), typeof H.final == "function" && (this._final = H.final)), f.call(this);
  }
  I.prototype.pipe = function() {
    C(this, new b());
  };
  function Z(H, y) {
    var J = new N();
    C(H, J), MA.nextTick(y, J);
  }
  function uA(H, y, J, z) {
    var pA;
    return J === null ? pA = new x() : typeof J != "string" && !y.objectMode && (pA = new E("chunk", ["string", "Buffer"], J)), pA ? (C(H, pA), MA.nextTick(z, pA), !1) : !0;
  }
  I.prototype.write = function(H, y, J) {
    var z = this._writableState, pA = !1, P = !z.objectMode && U(H);
    return P && !s.isBuffer(H) && (H = d(H)), typeof y == "function" && (J = y, y = null), P ? y = "buffer" : y || (y = z.defaultEncoding), typeof J != "function" && (J = g), z.ending ? Z(this, J) : (P || uA(this, z, H, J)) && (z.pendingcb++, pA = q(this, z, P, H, y, J)), pA;
  }, I.prototype.cork = function() {
    this._writableState.corked++;
  }, I.prototype.uncork = function() {
    var H = this._writableState;
    H.corked && (H.corked--, !H.writing && !H.corked && !H.bufferProcessing && H.bufferedRequest && dA(this, H));
  }, I.prototype.setDefaultEncoding = function(y) {
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
    ].indexOf((y + "").toLowerCase()) > -1)) throw new R(y);
    return this._writableState.defaultEncoding = y, this;
  }, Object.defineProperty(I.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function k(H, y, J) {
    return !H.objectMode && H.decodeStrings !== !1 && typeof y == "string" && (y = s.from(y, J)), y;
  }
  Object.defineProperty(I.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function q(H, y, J, z, pA, P) {
    if (!J) {
      var V = k(y, z, pA);
      z !== V && (J = !0, pA = "buffer", z = V);
    }
    var m = y.objectMode ? 1 : z.length;
    y.length += m;
    var eA = y.length < y.highWaterMark;
    if (eA || (y.needDrain = !0), y.writing || y.corked) {
      var D = y.lastBufferedRequest;
      y.lastBufferedRequest = {
        chunk: z,
        encoding: pA,
        isBuf: J,
        callback: P,
        next: null
      }, D ? D.next = y.lastBufferedRequest : y.bufferedRequest = y.lastBufferedRequest, y.bufferedRequestCount += 1;
    } else L(H, y, !1, m, z, pA, P);
    return eA;
  }
  function L(H, y, J, z, pA, P, V) {
    y.writelen = z, y.writecb = V, y.writing = !0, y.sync = !0, y.destroyed ? y.onwrite(new T("write")) : J ? H._writev(pA, y.onwrite) : H._write(pA, P, y.onwrite), y.sync = !1;
  }
  function $(H, y, J, z, pA) {
    --y.pendingcb, J ? (MA.nextTick(pA, z), MA.nextTick(sA, H, y), H._writableState.errorEmitted = !0, C(H, z)) : (pA(z), H._writableState.errorEmitted = !0, C(H, z), sA(H, y));
  }
  function lA(H) {
    H.writing = !1, H.writecb = null, H.length -= H.writelen, H.writelen = 0;
  }
  function rA(H, y) {
    var J = H._writableState, z = J.sync, pA = J.writecb;
    if (typeof pA != "function") throw new w();
    if (lA(J), y) $(H, J, z, y, pA);
    else {
      var P = tA(J) || H.destroyed;
      !P && !J.corked && !J.bufferProcessing && J.bufferedRequest && dA(H, J), z ? MA.nextTick(vA, H, J, P, pA) : vA(H, J, P, pA);
    }
  }
  function vA(H, y, J, z) {
    J || aA(H, y), y.pendingcb--, z(), sA(H, y);
  }
  function aA(H, y) {
    y.length === 0 && y.needDrain && (y.needDrain = !1, H.emit("drain"));
  }
  function dA(H, y) {
    y.bufferProcessing = !0;
    var J = y.bufferedRequest;
    if (H._writev && J && J.next) {
      var z = y.bufferedRequestCount, pA = new Array(z), P = y.corkedRequestsFree;
      P.entry = J;
      for (var V = 0, m = !0; J; )
        pA[V] = J, J.isBuf || (m = !1), J = J.next, V += 1;
      pA.allBuffers = m, L(H, y, !0, y.length, pA, "", P.finish), y.pendingcb++, y.lastBufferedRequest = null, P.next ? (y.corkedRequestsFree = P.next, P.next = null) : y.corkedRequestsFree = new r(y), y.bufferedRequestCount = 0;
    } else {
      for (; J; ) {
        var eA = J.chunk, D = J.encoding, l = J.callback;
        if (L(H, y, !1, y.objectMode ? 1 : eA.length, eA, D, l), J = J.next, y.bufferedRequestCount--, y.writing) break;
      }
      J === null && (y.lastBufferedRequest = null);
    }
    y.bufferedRequest = J, y.bufferProcessing = !1;
  }
  I.prototype._write = function(H, y, J) {
    J(new v("_write()"));
  }, I.prototype._writev = null, I.prototype.end = function(H, y, J) {
    var z = this._writableState;
    return typeof H == "function" ? (J = H, H = null, y = null) : typeof y == "function" && (J = y, y = null), H != null && this.write(H, y), z.corked && (z.corked = 1, this.uncork()), z.ending || fA(this, z, J), this;
  }, Object.defineProperty(I.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function tA(H) {
    return H.ending && H.length === 0 && H.bufferedRequest === null && !H.finished && !H.writing;
  }
  function G(H, y) {
    H._final(function(J) {
      y.pendingcb--, J && C(H, J), y.prefinished = !0, H.emit("prefinish"), sA(H, y);
    });
  }
  function iA(H, y) {
    !y.prefinished && !y.finalCalled && (typeof H._final == "function" && !y.destroyed ? (y.pendingcb++, y.finalCalled = !0, MA.nextTick(G, H, y)) : (y.prefinished = !0, H.emit("prefinish")));
  }
  function sA(H, y) {
    var J = tA(y);
    if (J && (iA(H, y), y.pendingcb === 0 && (y.finished = !0, H.emit("finish"), y.autoDestroy))) {
      var z = H._readableState;
      (!z || z.autoDestroy && z.endEmitted) && H.destroy();
    }
    return J;
  }
  function fA(H, y, J) {
    y.ending = !0, sA(H, y), J && (y.finished ? MA.nextTick(J) : H.once("finish", J)), y.ended = !0, H.writable = !1;
  }
  function _A(H, y, J) {
    var z = H.entry;
    for (H.entry = null; z; ) {
      var pA = z.callback;
      y.pendingcb--, pA(J), z = z.next;
    }
    y.corkedRequestsFree.next = H;
  }
  Object.defineProperty(I.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(y) {
      this._writableState && (this._writableState.destroyed = y);
    }
  }), I.prototype.destroy = F.destroy, I.prototype._undestroy = F.undestroy, I.prototype._destroy = function(H, y) {
    y(H);
  };
})), hr = /* @__PURE__ */ FA(((A, i) => {
  Ct();
  var r = Object.keys || function(B) {
    var _ = [];
    for (var E in B) _.push(E);
    return _;
  };
  i.exports = d;
  var c = Il(), h = bl();
  yt()(d, c);
  for (var f = r(h.prototype), s = 0; s < f.length; s++) {
    var o = f[s];
    d.prototype[o] || (d.prototype[o] = h.prototype[o]);
  }
  function d(B) {
    if (!(this instanceof d)) return new d(B);
    c.call(this, B), h.call(this, B), this.allowHalfOpen = !0, B && (B.readable === !1 && (this.readable = !1), B.writable === !1 && (this.writable = !1), B.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", U)));
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
    this._writableState.ended || MA.nextTick(F, this);
  }
  function F(B) {
    B.end();
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
})), Tg = /* @__PURE__ */ FA(((A, i) => {
  var r = Jn(), c = r.Buffer;
  function h(s, o) {
    for (var d in s) o[d] = s[d];
  }
  c.from && c.alloc && c.allocUnsafe && c.allocUnsafeSlow ? i.exports = r : (h(r, A), A.Buffer = f);
  function f(s, o, d) {
    return c(s, o, d);
  }
  h(c, f), f.from = function(s, o, d) {
    if (typeof s == "number") throw new TypeError("Argument must not be a number");
    return c(s, o, d);
  }, f.alloc = function(s, o, d) {
    if (typeof s != "number") throw new TypeError("Argument must be a number");
    var U = c(s);
    return o !== void 0 ? typeof d == "string" ? U.fill(o, d) : U.fill(o) : U.fill(0), U;
  }, f.allocUnsafe = function(s) {
    if (typeof s != "number") throw new TypeError("Argument must be a number");
    return c(s);
  }, f.allocUnsafeSlow = function(s) {
    if (typeof s != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(s);
  };
})), la = /* @__PURE__ */ FA(((A) => {
  var i = Tg().Buffer, r = i.isEncoding || function(x) {
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
    if (typeof N != "string" && (i.isEncoding === r || !r(x))) throw new Error("Unknown encoding: " + x);
    return N || x;
  }
  A.StringDecoder = f;
  function f(x) {
    this.encoding = h(x);
    var N;
    switch (this.encoding) {
      case "utf16le":
        this.text = _, this.end = E, N = 4;
        break;
      case "utf8":
        this.fillLast = U, N = 4;
        break;
      case "base64":
        this.text = v, this.end = w, N = 3;
        break;
      default:
        this.write = b, this.end = T;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(N);
  }
  f.prototype.write = function(x) {
    if (x.length === 0) return "";
    var N, R;
    if (this.lastNeed) {
      if (N = this.fillLast(x), N === void 0) return "";
      R = this.lastNeed, this.lastNeed = 0;
    } else R = 0;
    return R < x.length ? N ? N + this.text(x, R) : this.text(x, R) : N || "";
  }, f.prototype.end = B, f.prototype.text = F, f.prototype.fillLast = function(x) {
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, x.length), this.lastNeed -= x.length;
  };
  function s(x) {
    return x <= 127 ? 0 : x >> 5 === 6 ? 2 : x >> 4 === 14 ? 3 : x >> 3 === 30 ? 4 : x >> 6 === 2 ? -1 : -2;
  }
  function o(x, N, R) {
    var C = N.length - 1;
    if (C < R) return 0;
    var g = s(N[C]);
    return g >= 0 ? (g > 0 && (x.lastNeed = g - 1), g) : --C < R || g === -2 ? 0 : (g = s(N[C]), g >= 0 ? (g > 0 && (x.lastNeed = g - 2), g) : --C < R || g === -2 ? 0 : (g = s(N[C]), g >= 0 ? (g > 0 && (g === 2 ? g = 0 : x.lastNeed = g - 3), g) : 0));
  }
  function d(x, N, R) {
    if ((N[0] & 192) !== 128)
      return x.lastNeed = 0, "\uFFFD";
    if (x.lastNeed > 1 && N.length > 1) {
      if ((N[1] & 192) !== 128)
        return x.lastNeed = 1, "\uFFFD";
      if (x.lastNeed > 2 && N.length > 2 && (N[2] & 192) !== 128)
        return x.lastNeed = 2, "\uFFFD";
    }
  }
  function U(x) {
    var N = this.lastTotal - this.lastNeed, R = d(this, x, N);
    if (R !== void 0) return R;
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, N, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, N, 0, x.length), this.lastNeed -= x.length;
  }
  function F(x, N) {
    var R = o(this, x, N);
    if (!this.lastNeed) return x.toString("utf8", N);
    this.lastTotal = R;
    var C = x.length - (R - this.lastNeed);
    return x.copy(this.lastChar, 0, C), x.toString("utf8", N, C);
  }
  function B(x) {
    var N = x && x.length ? this.write(x) : "";
    return this.lastNeed ? N + "\uFFFD" : N;
  }
  function _(x, N) {
    if ((x.length - N) % 2 === 0) {
      var R = x.toString("utf16le", N);
      if (R) {
        var C = R.charCodeAt(R.length - 1);
        if (C >= 55296 && C <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1], R.slice(0, -1);
      }
      return R;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = x[x.length - 1], x.toString("utf16le", N, x.length - 1);
  }
  function E(x) {
    var N = x && x.length ? this.write(x) : "";
    if (this.lastNeed) {
      var R = this.lastTotal - this.lastNeed;
      return N + this.lastChar.toString("utf16le", 0, R);
    }
    return N;
  }
  function v(x, N) {
    var R = (x.length - N) % 3;
    return R === 0 ? x.toString("base64", N) : (this.lastNeed = 3 - R, this.lastTotal = 3, R === 1 ? this.lastChar[0] = x[x.length - 1] : (this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1]), x.toString("base64", N, x.length - R));
  }
  function w(x) {
    var N = x && x.length ? this.write(x) : "";
    return this.lastNeed ? N + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : N;
  }
  function b(x) {
    return x.toString(this.encoding);
  }
  function T(x) {
    return x && x.length ? this.write(x) : "";
  }
})), Ea = /* @__PURE__ */ FA(((A, i) => {
  var r = Br().codes.ERR_STREAM_PREMATURE_CLOSE;
  function c(o) {
    var d = !1;
    return function() {
      if (!d) {
        d = !0;
        for (var U = arguments.length, F = new Array(U), B = 0; B < U; B++) F[B] = arguments[B];
        o.apply(this, F);
      }
    };
  }
  function h() {
  }
  function f(o) {
    return o.setHeader && typeof o.abort == "function";
  }
  function s(o, d, U) {
    if (typeof d == "function") return s(o, null, d);
    d || (d = {}), U = c(U || h);
    var F = d.readable || d.readable !== !1 && o.readable, B = d.writable || d.writable !== !1 && o.writable, _ = function() {
      o.writable || v();
    }, E = o._writableState && o._writableState.finished, v = function() {
      B = !1, E = !0, F || U.call(o);
    }, w = o._readableState && o._readableState.endEmitted, b = function() {
      F = !1, w = !0, B || U.call(o);
    }, T = function(C) {
      U.call(o, C);
    }, x = function() {
      var C;
      if (F && !w)
        return (!o._readableState || !o._readableState.ended) && (C = new r()), U.call(o, C);
      if (B && !E)
        return (!o._writableState || !o._writableState.ended) && (C = new r()), U.call(o, C);
    }, N = function() {
      o.req.on("finish", v);
    };
    return f(o) ? (o.on("complete", v), o.on("abort", x), o.req ? N() : o.on("request", N)) : B && !o._writableState && (o.on("end", _), o.on("close", _)), o.on("end", b), o.on("finish", v), d.error !== !1 && o.on("error", T), o.on("close", x), function() {
      o.removeListener("complete", v), o.removeListener("abort", x), o.removeListener("request", N), o.req && o.req.removeListener("finish", v), o.removeListener("end", _), o.removeListener("close", _), o.removeListener("finish", v), o.removeListener("end", b), o.removeListener("error", T), o.removeListener("close", x);
    };
  }
  i.exports = s;
})), Sg = /* @__PURE__ */ FA(((A, i) => {
  Ct();
  var r;
  function c(R, C, g) {
    return C = h(C), C in R ? Object.defineProperty(R, C, {
      value: g,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : R[C] = g, R;
  }
  function h(R) {
    var C = f(R, "string");
    return typeof C == "symbol" ? C : String(C);
  }
  function f(R, C) {
    if (typeof R != "object" || R === null) return R;
    var g = R[Symbol.toPrimitive];
    if (g !== void 0) {
      var O = g.call(R, C || "default");
      if (typeof O != "object") return O;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (C === "string" ? String : Number)(R);
  }
  var s = Ea(), o = /* @__PURE__ */ Symbol("lastResolve"), d = /* @__PURE__ */ Symbol("lastReject"), U = /* @__PURE__ */ Symbol("error"), F = /* @__PURE__ */ Symbol("ended"), B = /* @__PURE__ */ Symbol("lastPromise"), _ = /* @__PURE__ */ Symbol("handlePromise"), E = /* @__PURE__ */ Symbol("stream");
  function v(R, C) {
    return {
      value: R,
      done: C
    };
  }
  function w(R) {
    var C = R[o];
    if (C !== null) {
      var g = R[E].read();
      g !== null && (R[B] = null, R[o] = null, R[d] = null, C(v(g, !1)));
    }
  }
  function b(R) {
    MA.nextTick(w, R);
  }
  function T(R, C) {
    return function(g, O) {
      R.then(function() {
        if (C[F]) {
          g(v(void 0, !0));
          return;
        }
        C[_](g, O);
      }, O);
    };
  }
  var x = Object.getPrototypeOf(function() {
  }), N = Object.setPrototypeOf((r = {
    get stream() {
      return this[E];
    },
    next: function() {
      var C = this, g = this[U];
      if (g !== null) return Promise.reject(g);
      if (this[F]) return Promise.resolve(v(void 0, !0));
      if (this[E].destroyed) return new Promise(function(Z, uA) {
        MA.nextTick(function() {
          C[U] ? uA(C[U]) : Z(v(void 0, !0));
        });
      });
      var O = this[B], M;
      if (O) M = new Promise(T(O, this));
      else {
        var I = this[E].read();
        if (I !== null) return Promise.resolve(v(I, !1));
        M = new Promise(this[_]);
      }
      return this[B] = M, M;
    }
  }, c(r, Symbol.asyncIterator, function() {
    return this;
  }), c(r, "return", function() {
    var C = this;
    return new Promise(function(g, O) {
      C[E].destroy(null, function(M) {
        if (M) {
          O(M);
          return;
        }
        g(v(void 0, !0));
      });
    });
  }), r), x);
  i.exports = function(C) {
    var g, O = Object.create(N, (g = {}, c(g, E, {
      value: C,
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
    }), c(g, F, {
      value: C._readableState.endEmitted,
      writable: !0
    }), c(g, _, {
      value: function(I, Z) {
        var uA = O[E].read();
        uA ? (O[B] = null, O[o] = null, O[d] = null, I(v(uA, !1))) : (O[o] = I, O[d] = Z);
      },
      writable: !0
    }), g));
    return O[B] = null, s(C, function(M) {
      if (M && M.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var I = O[d];
        I !== null && (O[B] = null, O[o] = null, O[d] = null, I(M)), O[U] = M;
        return;
      }
      var Z = O[o];
      Z !== null && (O[B] = null, O[o] = null, O[d] = null, Z(v(void 0, !0))), O[F] = !0;
    }), C.on("readable", b.bind(null, O)), O;
  };
})), Hg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), Il = /* @__PURE__ */ FA(((A, i) => {
  wr(), Ct(), i.exports = Z;
  var r;
  Z.ReadableState = I, ma().EventEmitter;
  var c = function(V, m) {
    return V.listeners(m).length;
  }, h = fl(), f = Jn().Buffer, s = (typeof me < "u" ? me : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function o(P) {
    return f.from(P);
  }
  function d(P) {
    return f.isBuffer(P) || P instanceof s;
  }
  var U = El(), F;
  U && U.debuglog ? F = U.debuglog("stream") : F = function() {
  };
  var B = _g(), _ = Ql(), E = Ul().getHighWaterMark, v = Br().codes, w = v.ERR_INVALID_ARG_TYPE, b = v.ERR_STREAM_PUSH_AFTER_EOF, T = v.ERR_METHOD_NOT_IMPLEMENTED, x = v.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, N, R, C;
  yt()(Z, h);
  var g = _.errorOrDestroy, O = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function M(P, V, m) {
    if (typeof P.prependListener == "function") return P.prependListener(V, m);
    !P._events || !P._events[V] ? P.on(V, m) : Array.isArray(P._events[V]) ? P._events[V].unshift(m) : P._events[V] = [m, P._events[V]];
  }
  function I(P, V, m) {
    r = r || hr(), P = P || {}, typeof m != "boolean" && (m = V instanceof r), this.objectMode = !!P.objectMode, m && (this.objectMode = this.objectMode || !!P.readableObjectMode), this.highWaterMark = E(this, P, "readableHighWaterMark", m), this.buffer = new B(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = P.emitClose !== !1, this.autoDestroy = !!P.autoDestroy, this.destroyed = !1, this.defaultEncoding = P.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, P.encoding && (N || (N = la().StringDecoder), this.decoder = new N(P.encoding), this.encoding = P.encoding);
  }
  function Z(P) {
    if (r = r || hr(), !(this instanceof Z)) return new Z(P);
    var V = this instanceof r;
    this._readableState = new I(P, this, V), this.readable = !0, P && (typeof P.read == "function" && (this._read = P.read), typeof P.destroy == "function" && (this._destroy = P.destroy)), h.call(this);
  }
  Object.defineProperty(Z.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(V) {
      this._readableState && (this._readableState.destroyed = V);
    }
  }), Z.prototype.destroy = _.destroy, Z.prototype._undestroy = _.undestroy, Z.prototype._destroy = function(P, V) {
    V(P);
  }, Z.prototype.push = function(P, V) {
    var m = this._readableState, eA;
    return m.objectMode ? eA = !0 : typeof P == "string" && (V = V || m.defaultEncoding, V !== m.encoding && (P = f.from(P, V), V = ""), eA = !0), uA(this, P, V, !1, eA);
  }, Z.prototype.unshift = function(P) {
    return uA(this, P, null, !0, !1);
  };
  function uA(P, V, m, eA, D) {
    F("readableAddChunk", V);
    var l = P._readableState;
    if (V === null)
      l.reading = !1, rA(P, l);
    else {
      var u;
      if (D || (u = q(l, V)), u) g(P, u);
      else if (l.objectMode || V && V.length > 0)
        if (typeof V != "string" && !l.objectMode && Object.getPrototypeOf(V) !== f.prototype && (V = o(V)), eA) l.endEmitted ? g(P, new x()) : k(P, l, V, !0);
        else if (l.ended) g(P, new b());
        else {
          if (l.destroyed) return !1;
          l.reading = !1, l.decoder && !m ? (V = l.decoder.write(V), l.objectMode || V.length !== 0 ? k(P, l, V, !1) : dA(P, l)) : k(P, l, V, !1);
        }
      else eA || (l.reading = !1, dA(P, l));
    }
    return !l.ended && (l.length < l.highWaterMark || l.length === 0);
  }
  function k(P, V, m, eA) {
    V.flowing && V.length === 0 && !V.sync ? (V.awaitDrain = 0, P.emit("data", m)) : (V.length += V.objectMode ? 1 : m.length, eA ? V.buffer.unshift(m) : V.buffer.push(m), V.needReadable && vA(P)), dA(P, V);
  }
  function q(P, V) {
    var m;
    return !d(V) && typeof V != "string" && V !== void 0 && !P.objectMode && (m = new w("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], V)), m;
  }
  Z.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, Z.prototype.setEncoding = function(P) {
    N || (N = la().StringDecoder);
    var V = new N(P);
    this._readableState.decoder = V, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var m = this._readableState.buffer.head, eA = ""; m !== null; )
      eA += V.write(m.data), m = m.next;
    return this._readableState.buffer.clear(), eA !== "" && this._readableState.buffer.push(eA), this._readableState.length = eA.length, this;
  };
  var L = 1073741824;
  function $(P) {
    return P >= L ? P = L : (P--, P |= P >>> 1, P |= P >>> 2, P |= P >>> 4, P |= P >>> 8, P |= P >>> 16, P++), P;
  }
  function lA(P, V) {
    return P <= 0 || V.length === 0 && V.ended ? 0 : V.objectMode ? 1 : P !== P ? V.flowing && V.length ? V.buffer.head.data.length : V.length : (P > V.highWaterMark && (V.highWaterMark = $(P)), P <= V.length ? P : V.ended ? V.length : (V.needReadable = !0, 0));
  }
  Z.prototype.read = function(P) {
    F("read", P), P = parseInt(P, 10);
    var V = this._readableState, m = P;
    if (P !== 0 && (V.emittedReadable = !1), P === 0 && V.needReadable && ((V.highWaterMark !== 0 ? V.length >= V.highWaterMark : V.length > 0) || V.ended))
      return F("read: emitReadable", V.length, V.ended), V.length === 0 && V.ended ? J(this) : vA(this), null;
    if (P = lA(P, V), P === 0 && V.ended)
      return V.length === 0 && J(this), null;
    var eA = V.needReadable;
    F("need readable", eA), (V.length === 0 || V.length - P < V.highWaterMark) && (eA = !0, F("length less than watermark", eA)), V.ended || V.reading ? (eA = !1, F("reading or ended", eA)) : eA && (F("do read"), V.reading = !0, V.sync = !0, V.length === 0 && (V.needReadable = !0), this._read(V.highWaterMark), V.sync = !1, V.reading || (P = lA(m, V)));
    var D;
    return P > 0 ? D = y(P, V) : D = null, D === null ? (V.needReadable = V.length <= V.highWaterMark, P = 0) : (V.length -= P, V.awaitDrain = 0), V.length === 0 && (V.ended || (V.needReadable = !0), m !== P && V.ended && J(this)), D !== null && this.emit("data", D), D;
  };
  function rA(P, V) {
    if (F("onEofChunk"), !V.ended) {
      if (V.decoder) {
        var m = V.decoder.end();
        m && m.length && (V.buffer.push(m), V.length += V.objectMode ? 1 : m.length);
      }
      V.ended = !0, V.sync ? vA(P) : (V.needReadable = !1, V.emittedReadable || (V.emittedReadable = !0, aA(P)));
    }
  }
  function vA(P) {
    var V = P._readableState;
    F("emitReadable", V.needReadable, V.emittedReadable), V.needReadable = !1, V.emittedReadable || (F("emitReadable", V.flowing), V.emittedReadable = !0, MA.nextTick(aA, P));
  }
  function aA(P) {
    var V = P._readableState;
    F("emitReadable_", V.destroyed, V.length, V.ended), !V.destroyed && (V.length || V.ended) && (P.emit("readable"), V.emittedReadable = !1), V.needReadable = !V.flowing && !V.ended && V.length <= V.highWaterMark, H(P);
  }
  function dA(P, V) {
    V.readingMore || (V.readingMore = !0, MA.nextTick(tA, P, V));
  }
  function tA(P, V) {
    for (; !V.reading && !V.ended && (V.length < V.highWaterMark || V.flowing && V.length === 0); ) {
      var m = V.length;
      if (F("maybeReadMore read 0"), P.read(0), m === V.length) break;
    }
    V.readingMore = !1;
  }
  Z.prototype._read = function(P) {
    g(this, new T("_read()"));
  }, Z.prototype.pipe = function(P, V) {
    var m = this, eA = this._readableState;
    switch (eA.pipesCount) {
      case 0:
        eA.pipes = P;
        break;
      case 1:
        eA.pipes = [eA.pipes, P];
        break;
      default:
        eA.pipes.push(P);
        break;
    }
    eA.pipesCount += 1, F("pipe count=%d opts=%j", eA.pipesCount, V);
    var D = (!V || V.end !== !1) && P !== MA.stdout && P !== MA.stderr ? u : QA;
    eA.endEmitted ? MA.nextTick(D) : m.once("end", D), P.on("unpipe", l);
    function l(xA, RA) {
      F("onunpipe"), xA === m && RA && RA.hasUnpiped === !1 && (RA.hasUnpiped = !0, AA());
    }
    function u() {
      F("onend"), P.end();
    }
    var Q = G(m);
    P.on("drain", Q);
    var j = !1;
    function AA() {
      F("cleanup"), P.removeListener("close", yA), P.removeListener("finish", BA), P.removeListener("drain", Q), P.removeListener("error", gA), P.removeListener("unpipe", l), m.removeListener("end", u), m.removeListener("end", QA), m.removeListener("data", Y), j = !0, eA.awaitDrain && (!P._writableState || P._writableState.needDrain) && Q();
    }
    m.on("data", Y);
    function Y(xA) {
      F("ondata");
      var RA = P.write(xA);
      F("dest.write", RA), RA === !1 && ((eA.pipesCount === 1 && eA.pipes === P || eA.pipesCount > 1 && pA(eA.pipes, P) !== -1) && !j && (F("false write response, pause", eA.awaitDrain), eA.awaitDrain++), m.pause());
    }
    function gA(xA) {
      F("onerror", xA), QA(), P.removeListener("error", gA), c(P, "error") === 0 && g(P, xA);
    }
    M(P, "error", gA);
    function yA() {
      P.removeListener("finish", BA), QA();
    }
    P.once("close", yA);
    function BA() {
      F("onfinish"), P.removeListener("close", yA), QA();
    }
    P.once("finish", BA);
    function QA() {
      F("unpipe"), m.unpipe(P);
    }
    return P.emit("pipe", m), eA.flowing || (F("pipe resume"), m.resume()), P;
  };
  function G(P) {
    return function() {
      var m = P._readableState;
      F("pipeOnDrain", m.awaitDrain), m.awaitDrain && m.awaitDrain--, m.awaitDrain === 0 && c(P, "data") && (m.flowing = !0, H(P));
    };
  }
  Z.prototype.unpipe = function(P) {
    var V = this._readableState, m = { hasUnpiped: !1 };
    if (V.pipesCount === 0) return this;
    if (V.pipesCount === 1)
      return P && P !== V.pipes ? this : (P || (P = V.pipes), V.pipes = null, V.pipesCount = 0, V.flowing = !1, P && P.emit("unpipe", this, m), this);
    if (!P) {
      var eA = V.pipes, D = V.pipesCount;
      V.pipes = null, V.pipesCount = 0, V.flowing = !1;
      for (var l = 0; l < D; l++) eA[l].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var u = pA(V.pipes, P);
    return u === -1 ? this : (V.pipes.splice(u, 1), V.pipesCount -= 1, V.pipesCount === 1 && (V.pipes = V.pipes[0]), P.emit("unpipe", this, m), this);
  }, Z.prototype.on = function(P, V) {
    var m = h.prototype.on.call(this, P, V), eA = this._readableState;
    return P === "data" ? (eA.readableListening = this.listenerCount("readable") > 0, eA.flowing !== !1 && this.resume()) : P === "readable" && !eA.endEmitted && !eA.readableListening && (eA.readableListening = eA.needReadable = !0, eA.flowing = !1, eA.emittedReadable = !1, F("on readable", eA.length, eA.reading), eA.length ? vA(this) : eA.reading || MA.nextTick(sA, this)), m;
  }, Z.prototype.addListener = Z.prototype.on, Z.prototype.removeListener = function(P, V) {
    var m = h.prototype.removeListener.call(this, P, V);
    return P === "readable" && MA.nextTick(iA, this), m;
  }, Z.prototype.removeAllListeners = function(P) {
    var V = h.prototype.removeAllListeners.apply(this, arguments);
    return (P === "readable" || P === void 0) && MA.nextTick(iA, this), V;
  };
  function iA(P) {
    var V = P._readableState;
    V.readableListening = P.listenerCount("readable") > 0, V.resumeScheduled && !V.paused ? V.flowing = !0 : P.listenerCount("data") > 0 && P.resume();
  }
  function sA(P) {
    F("readable nexttick read 0"), P.read(0);
  }
  Z.prototype.resume = function() {
    var P = this._readableState;
    return P.flowing || (F("resume"), P.flowing = !P.readableListening, fA(this, P)), P.paused = !1, this;
  };
  function fA(P, V) {
    V.resumeScheduled || (V.resumeScheduled = !0, MA.nextTick(_A, P, V));
  }
  function _A(P, V) {
    F("resume", V.reading), V.reading || P.read(0), V.resumeScheduled = !1, P.emit("resume"), H(P), V.flowing && !V.reading && P.read(0);
  }
  Z.prototype.pause = function() {
    return F("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (F("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function H(P) {
    var V = P._readableState;
    for (F("flow", V.flowing); V.flowing && P.read() !== null; ) ;
  }
  Z.prototype.wrap = function(P) {
    var V = this, m = this._readableState, eA = !1;
    P.on("end", function() {
      if (F("wrapped end"), m.decoder && !m.ended) {
        var u = m.decoder.end();
        u && u.length && V.push(u);
      }
      V.push(null);
    }), P.on("data", function(u) {
      F("wrapped data"), m.decoder && (u = m.decoder.write(u)), !(m.objectMode && u == null) && (!m.objectMode && (!u || !u.length) || V.push(u) || (eA = !0, P.pause()));
    });
    for (var D in P) this[D] === void 0 && typeof P[D] == "function" && (this[D] = /* @__PURE__ */ (function(Q) {
      return function() {
        return P[Q].apply(P, arguments);
      };
    })(D));
    for (var l = 0; l < O.length; l++) P.on(O[l], this.emit.bind(this, O[l]));
    return this._read = function(u) {
      F("wrapped _read", u), eA && (eA = !1, P.resume());
    }, this;
  }, typeof Symbol == "function" && (Z.prototype[Symbol.asyncIterator] = function() {
    return R === void 0 && (R = Sg()), R(this);
  }), Object.defineProperty(Z.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(Z.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(Z.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(V) {
      this._readableState && (this._readableState.flowing = V);
    }
  }), Z._fromList = y, Object.defineProperty(Z.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function y(P, V) {
    if (V.length === 0) return null;
    var m;
    return V.objectMode ? m = V.buffer.shift() : !P || P >= V.length ? (V.decoder ? m = V.buffer.join("") : V.buffer.length === 1 ? m = V.buffer.first() : m = V.buffer.concat(V.length), V.buffer.clear()) : m = V.buffer.consume(P, V.decoder), m;
  }
  function J(P) {
    var V = P._readableState;
    F("endReadable", V.endEmitted), V.endEmitted || (V.ended = !0, MA.nextTick(z, V, P));
  }
  function z(P, V) {
    if (F("endReadableNT", P.endEmitted, P.length), !P.endEmitted && P.length === 0 && (P.endEmitted = !0, V.readable = !1, V.emit("end"), P.autoDestroy)) {
      var m = V._writableState;
      (!m || m.autoDestroy && m.finished) && V.destroy();
    }
  }
  typeof Symbol == "function" && (Z.from = function(P, V) {
    return C === void 0 && (C = Hg()), C(Z, P, V);
  });
  function pA(P, V) {
    for (var m = 0, eA = P.length; m < eA; m++) if (P[m] === V) return m;
    return -1;
  }
})), _l = /* @__PURE__ */ FA(((A, i) => {
  i.exports = U;
  var r = Br().codes, c = r.ERR_METHOD_NOT_IMPLEMENTED, h = r.ERR_MULTIPLE_CALLBACK, f = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, s = r.ERR_TRANSFORM_WITH_LENGTH_0, o = hr();
  yt()(U, o);
  function d(_, E) {
    var v = this._transformState;
    v.transforming = !1;
    var w = v.writecb;
    if (w === null) return this.emit("error", new h());
    v.writechunk = null, v.writecb = null, E != null && this.push(E), w(_);
    var b = this._readableState;
    b.reading = !1, (b.needReadable || b.length < b.highWaterMark) && this._read(b.highWaterMark);
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
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, _ && (typeof _.transform == "function" && (this._transform = _.transform), typeof _.flush == "function" && (this._flush = _.flush)), this.on("prefinish", F);
  }
  function F() {
    var _ = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(E, v) {
      B(_, E, v);
    }) : B(this, null, null);
  }
  U.prototype.push = function(_, E) {
    return this._transformState.needTransform = !1, o.prototype.push.call(this, _, E);
  }, U.prototype._transform = function(_, E, v) {
    v(new c("_transform()"));
  }, U.prototype._write = function(_, E, v) {
    var w = this._transformState;
    if (w.writecb = v, w.writechunk = _, w.writeencoding = E, !w.transforming) {
      var b = this._readableState;
      (w.needTransform || b.needReadable || b.length < b.highWaterMark) && this._read(b.highWaterMark);
    }
  }, U.prototype._read = function(_) {
    var E = this._transformState;
    E.writechunk !== null && !E.transforming ? (E.transforming = !0, this._transform(E.writechunk, E.writeencoding, E.afterTransform)) : E.needTransform = !0;
  }, U.prototype._destroy = function(_, E) {
    o.prototype._destroy.call(this, _, function(v) {
      E(v);
    });
  };
  function B(_, E, v) {
    if (E) return _.emit("error", E);
    if (v != null && _.push(v), _._writableState.length) throw new s();
    if (_._transformState.transforming) throw new f();
    return _.push(null);
  }
})), Lg = /* @__PURE__ */ FA(((A, i) => {
  i.exports = c;
  var r = _l();
  yt()(c, r);
  function c(h) {
    if (!(this instanceof c)) return new c(h);
    r.call(this, h);
  }
  c.prototype._transform = function(h, f, s) {
    s(null, h);
  };
})), Dg = /* @__PURE__ */ FA(((A, i) => {
  var r;
  function c(v) {
    var w = !1;
    return function() {
      w || (w = !0, v.apply(void 0, arguments));
    };
  }
  var h = Br().codes, f = h.ERR_MISSING_ARGS, s = h.ERR_STREAM_DESTROYED;
  function o(v) {
    if (v) throw v;
  }
  function d(v) {
    return v.setHeader && typeof v.abort == "function";
  }
  function U(v, w, b, T) {
    T = c(T);
    var x = !1;
    v.on("close", function() {
      x = !0;
    }), r === void 0 && (r = Ea()), r(v, {
      readable: w,
      writable: b
    }, function(R) {
      if (R) return T(R);
      x = !0, T();
    });
    var N = !1;
    return function(R) {
      if (!x && !N) {
        if (N = !0, d(v)) return v.abort();
        if (typeof v.destroy == "function") return v.destroy();
        T(R || new s("pipe"));
      }
    };
  }
  function F(v) {
    v();
  }
  function B(v, w) {
    return v.pipe(w);
  }
  function _(v) {
    return !v.length || typeof v[v.length - 1] != "function" ? o : v.pop();
  }
  function E() {
    for (var v = arguments.length, w = new Array(v), b = 0; b < v; b++) w[b] = arguments[b];
    var T = _(w);
    if (Array.isArray(w[0]) && (w = w[0]), w.length < 2) throw new f("streams");
    var x, N = w.map(function(R, C) {
      var g = C < w.length - 1;
      return U(R, g, C > 0, function(O) {
        x || (x = O), O && N.forEach(F), !g && (N.forEach(F), T(x));
      });
    });
    return w.reduce(B);
  }
  i.exports = E;
})), Qa = /* @__PURE__ */ FA(((A, i) => {
  i.exports = c;
  var r = ma().EventEmitter;
  yt()(c, r), c.Readable = Il(), c.Writable = bl(), c.Duplex = hr(), c.Transform = _l(), c.PassThrough = Lg(), c.finished = Ea(), c.pipeline = Dg(), c.Stream = c;
  function c() {
    r.call(this);
  }
  c.prototype.pipe = function(h, f) {
    var s = this;
    function o(v) {
      h.writable && h.write(v) === !1 && s.pause && s.pause();
    }
    s.on("data", o);
    function d() {
      s.readable && s.resume && s.resume();
    }
    h.on("drain", d), !h._isStdio && (!f || f.end !== !1) && (s.on("end", F), s.on("close", B));
    var U = !1;
    function F() {
      U || (U = !0, h.end());
    }
    function B() {
      U || (U = !0, typeof h.destroy == "function" && h.destroy());
    }
    function _(v) {
      if (E(), r.listenerCount(this, "error") === 0) throw v;
    }
    s.on("error", _), h.on("error", _);
    function E() {
      s.removeListener("data", o), h.removeListener("drain", d), s.removeListener("end", F), s.removeListener("close", B), s.removeListener("error", _), h.removeListener("error", _), s.removeListener("end", E), s.removeListener("close", E), h.removeListener("close", E);
    }
    return s.on("end", E), s.on("close", E), h.on("close", E), h.emit("pipe", s), h;
  };
})), Rg = /* @__PURE__ */ FA(((A) => {
  (function(i) {
    i.parser = function(H, y) {
      return new c(H, y);
    }, i.SAXParser = c, i.SAXStream = F, i.createStream = U, i.MAX_BUFFER_LENGTH = 64 * 1024;
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
      f(J), J.q = J.c = "", J.bufferCheckPosition = i.MAX_BUFFER_LENGTH, J.opt = y || {}, J.opt.lowercase = J.opt.lowercase || J.opt.lowercasetags, J.looseCase = J.opt.lowercase ? "toLowerCase" : "toUpperCase", J.tags = [], J.closed = J.closedRoot = J.sawRoot = !1, J.tag = J.error = null, J.strict = !!H, J.noscript = !!(H || J.opt.noscript), J.state = I.BEGIN, J.strictEntities = J.opt.strictEntities, J.ENTITIES = J.strictEntities ? Object.create(i.XML_ENTITIES) : Object.create(i.ENTITIES), J.attribList = [], J.opt.xmlns && (J.ns = Object.create(w)), J.trackPosition = J.opt.position !== !1, J.trackPosition && (J.position = J.line = J.column = 0), uA(J, "onready");
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
      for (var y = Math.max(i.MAX_BUFFER_LENGTH, 10), J = 0, z = 0, pA = r.length; z < pA; z++) {
        var P = H[r[z]].length;
        if (P > y) switch (r[z]) {
          case "textNode":
            q(H);
            break;
          case "cdata":
            k(H, "oncdata", H.cdata), H.cdata = "";
            break;
          case "script":
            k(H, "onscript", H.script), H.script = "";
            break;
          default:
            $(H, "Max buffer length exceeded: " + r[z]);
        }
        J = Math.max(J, P);
      }
      H.bufferCheckPosition = i.MAX_BUFFER_LENGTH - J + H.position;
    }
    function f(H) {
      for (var y = 0, J = r.length; y < J; y++) H[r[y]] = "";
    }
    function s(H) {
      q(H), H.cdata !== "" && (k(H, "oncdata", H.cdata), H.cdata = ""), H.script !== "" && (k(H, "onscript", H.script), H.script = "");
    }
    c.prototype = {
      end: function() {
        lA(this);
      },
      write: _A,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var o;
    try {
      o = Qa().Stream;
    } catch {
      o = function() {
      };
    }
    var d = i.EVENTS.filter(function(H) {
      return H !== "error" && H !== "end";
    });
    function U(H, y) {
      return new F(H, y);
    }
    function F(H, y) {
      if (!(this instanceof F)) return new F(H, y);
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
    F.prototype = Object.create(o.prototype, { constructor: { value: F } }), F.prototype.write = function(H) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(H)) {
        if (!this._decoder) {
          var y = la().StringDecoder;
          this._decoder = new y("utf8");
        }
        H = this._decoder.write(H);
      }
      return this._parser.write(H.toString()), this.emit("data", H), !0;
    }, F.prototype.end = function(H) {
      return H && H.length && this.write(H), this._parser.end(), !0;
    }, F.prototype.on = function(H, y) {
      var J = this;
      return !J._parser["on" + H] && d.indexOf(H) !== -1 && (J._parser["on" + H] = function() {
        var z = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        z.splice(0, 0, H), J.emit.apply(J, z);
      }), o.prototype.on.call(J, H, y);
    };
    var B = "[CDATA[", _ = "DOCTYPE", E = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", w = {
      xml: E,
      xmlns: v
    }, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(H) {
      return H === " " || H === `
` || H === "\r" || H === "	";
    }
    function C(H) {
      return H === '"' || H === "'";
    }
    function g(H) {
      return H === ">" || R(H);
    }
    function O(H, y) {
      return H.test(y);
    }
    function M(H, y) {
      return !O(H, y);
    }
    var I = 0;
    i.STATE = {
      BEGIN: I++,
      BEGIN_WHITESPACE: I++,
      TEXT: I++,
      TEXT_ENTITY: I++,
      OPEN_WAKA: I++,
      SGML_DECL: I++,
      SGML_DECL_QUOTED: I++,
      DOCTYPE: I++,
      DOCTYPE_QUOTED: I++,
      DOCTYPE_DTD: I++,
      DOCTYPE_DTD_QUOTED: I++,
      COMMENT_STARTING: I++,
      COMMENT: I++,
      COMMENT_ENDING: I++,
      COMMENT_ENDED: I++,
      CDATA: I++,
      CDATA_ENDING: I++,
      CDATA_ENDING_2: I++,
      PROC_INST: I++,
      PROC_INST_BODY: I++,
      PROC_INST_ENDING: I++,
      OPEN_TAG: I++,
      OPEN_TAG_SLASH: I++,
      ATTRIB: I++,
      ATTRIB_NAME: I++,
      ATTRIB_NAME_SAW_WHITE: I++,
      ATTRIB_VALUE: I++,
      ATTRIB_VALUE_QUOTED: I++,
      ATTRIB_VALUE_CLOSED: I++,
      ATTRIB_VALUE_UNQUOTED: I++,
      ATTRIB_VALUE_ENTITY_Q: I++,
      ATTRIB_VALUE_ENTITY_U: I++,
      CLOSE_TAG: I++,
      CLOSE_TAG_SAW_WHITE: I++,
      SCRIPT: I++,
      SCRIPT_ENDING: I++
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
    for (var Z in i.STATE) i.STATE[i.STATE[Z]] = Z;
    I = i.STATE;
    function uA(H, y, J) {
      H[y] && H[y](J);
    }
    function k(H, y, J) {
      H.textNode && q(H), uA(H, y, J);
    }
    function q(H) {
      H.textNode = L(H.opt, H.textNode), H.textNode && uA(H, "ontext", H.textNode), H.textNode = "";
    }
    function L(H, y) {
      return H.trim && (y = y.trim()), H.normalize && (y = y.replace(/\s+/g, " ")), y;
    }
    function $(H, y) {
      return q(H), H.trackPosition && (y += `
Line: ` + H.line + `
Column: ` + H.column + `
Char: ` + H.c), y = new Error(y), H.error = y, uA(H, "onerror", y), H;
    }
    function lA(H) {
      return H.sawRoot && !H.closedRoot && rA(H, "Unclosed root tag"), H.state !== I.BEGIN && H.state !== I.BEGIN_WHITESPACE && H.state !== I.TEXT && $(H, "Unexpected end"), q(H), H.c = "", H.closed = !0, uA(H, "onend"), c.call(H, H.strict, H.opt), H;
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
    function aA(H, y) {
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
        var y = aA(H.attribName, !0), J = y.prefix, z = y.local;
        if (J === "xmlns") if (z === "xml" && H.attribValue !== E) rA(H, "xml: prefix must be bound to " + E + `
Actual: ` + H.attribValue);
        else if (z === "xmlns" && H.attribValue !== v) rA(H, "xmlns: prefix must be bound to " + v + `
Actual: ` + H.attribValue);
        else {
          var pA = H.tag, P = H.tags[H.tags.length - 1] || H;
          pA.ns === P.ns && (pA.ns = Object.create(P.ns)), pA.ns[z] = H.attribValue;
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
        var J = H.tag, z = aA(H.tagName);
        J.prefix = z.prefix, J.local = z.local, J.uri = J.ns[z.prefix] || "", J.prefix && !J.uri && (rA(H, "Unbound namespace prefix: " + JSON.stringify(H.tagName)), J.uri = z.prefix);
        var pA = H.tags[H.tags.length - 1] || H;
        J.ns && pA.ns !== J.ns && Object.keys(J.ns).forEach(function(Y) {
          k(H, "onopennamespace", {
            prefix: Y,
            uri: J.ns[Y]
          });
        });
        for (var P = 0, V = H.attribList.length; P < V; P++) {
          var m = H.attribList[P], eA = m[0], D = m[1], l = aA(eA, !0), u = l.prefix, Q = l.local, j = u === "" ? "" : J.ns[u] || "", AA = {
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
      H.tag.isSelfClosing = !!y, H.sawRoot = !0, H.tags.push(H.tag), k(H, "onopentag", H.tag), y || (!H.noscript && H.tagName.toLowerCase() === "script" ? H.state = I.SCRIPT : H.state = I.TEXT, H.tag = null, H.tagName = ""), H.attribName = H.attribValue = "", H.attribList.length = 0;
    }
    function G(H) {
      if (!H.tagName) {
        rA(H, "Weird empty close tag."), H.textNode += "</>", H.state = I.TEXT;
        return;
      }
      if (H.script) {
        if (H.tagName !== "script") {
          H.script += "</" + H.tagName + ">", H.tagName = "", H.state = I.SCRIPT;
          return;
        }
        k(H, "onscript", H.script), H.script = "";
      }
      var y = H.tags.length, J = H.tagName;
      H.strict || (J = J[H.looseCase]());
      for (var z = J; y-- && H.tags[y].name !== z; ) rA(H, "Unexpected close tag");
      if (y < 0) {
        rA(H, "Unmatched closing tag: " + H.tagName), H.textNode += "</" + H.tagName + ">", H.state = I.TEXT;
        return;
      }
      H.tagName = J;
      for (var pA = H.tags.length; pA-- > y; ) {
        var P = H.tag = H.tags.pop();
        H.tagName = H.tag.name, k(H, "onclosetag", H.tagName);
        var V = {};
        for (var m in P.ns) V[m] = P.ns[m];
        var eA = H.tags[H.tags.length - 1] || H;
        H.opt.xmlns && P.ns !== eA.ns && Object.keys(P.ns).forEach(function(D) {
          var l = P.ns[D];
          k(H, "onclosenamespace", {
            prefix: D,
            uri: l
          });
        });
      }
      y === 0 && (H.closedRoot = !0), H.tagName = H.attribValue = H.attribName = "", H.attribList.length = 0, H.state = I.TEXT;
    }
    function iA(H) {
      var y = H.entity, J = y.toLowerCase(), z, pA = "";
      return H.ENTITIES[y] ? H.ENTITIES[y] : H.ENTITIES[J] ? H.ENTITIES[J] : (y = J, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), z = parseInt(y, 16), pA = z.toString(16)) : (y = y.slice(1), z = parseInt(y, 10), pA = z.toString(10))), y = y.replace(/^0+/, ""), isNaN(z) || pA.toLowerCase() !== y ? (rA(H, "Invalid character entity"), "&" + H.entity + ";") : String.fromCodePoint(z));
    }
    function sA(H, y) {
      y === "<" ? (H.state = I.OPEN_WAKA, H.startTagPosition = H.position) : R(y) || (rA(H, "Non-whitespace before first tag."), H.textNode = y, H.state = I.TEXT);
    }
    function fA(H, y) {
      var J = "";
      return y < H.length && (J = H.charAt(y)), J;
    }
    function _A(H) {
      var y = this;
      if (this.error) throw this.error;
      if (y.closed) return $(y, "Cannot write after close. Assign an onready handler.");
      if (H === null) return lA(y);
      typeof H == "object" && (H = H.toString());
      for (var J = 0, z = ""; z = fA(H, J++), y.c = z, !!z; )
        switch (y.trackPosition && (y.position++, z === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
          case I.BEGIN:
            if (y.state = I.BEGIN_WHITESPACE, z === "\uFEFF") continue;
            sA(y, z);
            continue;
          case I.BEGIN_WHITESPACE:
            sA(y, z);
            continue;
          case I.TEXT:
            if (y.sawRoot && !y.closedRoot) {
              for (var pA = J - 1; z && z !== "<" && z !== "&"; )
                z = fA(H, J++), z && y.trackPosition && (y.position++, z === `
` ? (y.line++, y.column = 0) : y.column++);
              y.textNode += H.substring(pA, J - 1);
            }
            z === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = I.OPEN_WAKA, y.startTagPosition = y.position) : (!R(z) && (!y.sawRoot || y.closedRoot) && rA(y, "Text data outside of root node."), z === "&" ? y.state = I.TEXT_ENTITY : y.textNode += z);
            continue;
          case I.SCRIPT:
            z === "<" ? y.state = I.SCRIPT_ENDING : y.script += z;
            continue;
          case I.SCRIPT_ENDING:
            z === "/" ? y.state = I.CLOSE_TAG : (y.script += "<" + z, y.state = I.SCRIPT);
            continue;
          case I.OPEN_WAKA:
            if (z === "!")
              y.state = I.SGML_DECL, y.sgmlDecl = "";
            else if (!R(z))
              if (O(b, z))
                y.state = I.OPEN_TAG, y.tagName = z;
              else if (z === "/")
                y.state = I.CLOSE_TAG, y.tagName = "";
              else if (z === "?")
                y.state = I.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (rA(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var P = y.position - y.startTagPosition;
                  z = new Array(P).join(" ") + z;
                }
                y.textNode += "<" + z, y.state = I.TEXT;
              }
            continue;
          case I.SGML_DECL:
            (y.sgmlDecl + z).toUpperCase() === B ? (k(y, "onopencdata"), y.state = I.CDATA, y.sgmlDecl = "", y.cdata = "") : y.sgmlDecl + z === "--" ? (y.state = I.COMMENT, y.comment = "", y.sgmlDecl = "") : (y.sgmlDecl + z).toUpperCase() === _ ? (y.state = I.DOCTYPE, (y.doctype || y.sawRoot) && rA(y, "Inappropriately located doctype declaration"), y.doctype = "", y.sgmlDecl = "") : z === ">" ? (k(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = I.TEXT) : (C(z) && (y.state = I.SGML_DECL_QUOTED), y.sgmlDecl += z);
            continue;
          case I.SGML_DECL_QUOTED:
            z === y.q && (y.state = I.SGML_DECL, y.q = ""), y.sgmlDecl += z;
            continue;
          case I.DOCTYPE:
            z === ">" ? (y.state = I.TEXT, k(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += z, z === "[" ? y.state = I.DOCTYPE_DTD : C(z) && (y.state = I.DOCTYPE_QUOTED, y.q = z));
            continue;
          case I.DOCTYPE_QUOTED:
            y.doctype += z, z === y.q && (y.q = "", y.state = I.DOCTYPE);
            continue;
          case I.DOCTYPE_DTD:
            y.doctype += z, z === "]" ? y.state = I.DOCTYPE : C(z) && (y.state = I.DOCTYPE_DTD_QUOTED, y.q = z);
            continue;
          case I.DOCTYPE_DTD_QUOTED:
            y.doctype += z, z === y.q && (y.state = I.DOCTYPE_DTD, y.q = "");
            continue;
          case I.COMMENT:
            z === "-" ? y.state = I.COMMENT_ENDING : y.comment += z;
            continue;
          case I.COMMENT_ENDING:
            z === "-" ? (y.state = I.COMMENT_ENDED, y.comment = L(y.opt, y.comment), y.comment && k(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + z, y.state = I.COMMENT);
            continue;
          case I.COMMENT_ENDED:
            z !== ">" ? (rA(y, "Malformed comment"), y.comment += "--" + z, y.state = I.COMMENT) : y.state = I.TEXT;
            continue;
          case I.CDATA:
            z === "]" ? y.state = I.CDATA_ENDING : y.cdata += z;
            continue;
          case I.CDATA_ENDING:
            z === "]" ? y.state = I.CDATA_ENDING_2 : (y.cdata += "]" + z, y.state = I.CDATA);
            continue;
          case I.CDATA_ENDING_2:
            z === ">" ? (y.cdata && k(y, "oncdata", y.cdata), k(y, "onclosecdata"), y.cdata = "", y.state = I.TEXT) : z === "]" ? y.cdata += "]" : (y.cdata += "]]" + z, y.state = I.CDATA);
            continue;
          case I.PROC_INST:
            z === "?" ? y.state = I.PROC_INST_ENDING : R(z) ? y.state = I.PROC_INST_BODY : y.procInstName += z;
            continue;
          case I.PROC_INST_BODY:
            if (!y.procInstBody && R(z)) continue;
            z === "?" ? y.state = I.PROC_INST_ENDING : y.procInstBody += z;
            continue;
          case I.PROC_INST_ENDING:
            z === ">" ? (k(y, "onprocessinginstruction", {
              name: y.procInstName,
              body: y.procInstBody
            }), y.procInstName = y.procInstBody = "", y.state = I.TEXT) : (y.procInstBody += "?" + z, y.state = I.PROC_INST_BODY);
            continue;
          case I.OPEN_TAG:
            O(T, z) ? y.tagName += z : (vA(y), z === ">" ? tA(y) : z === "/" ? y.state = I.OPEN_TAG_SLASH : (R(z) || rA(y, "Invalid character in tag name"), y.state = I.ATTRIB));
            continue;
          case I.OPEN_TAG_SLASH:
            z === ">" ? (tA(y, !0), G(y)) : (rA(y, "Forward-slash in opening tag not followed by >"), y.state = I.ATTRIB);
            continue;
          case I.ATTRIB:
            if (R(z)) continue;
            z === ">" ? tA(y) : z === "/" ? y.state = I.OPEN_TAG_SLASH : O(b, z) ? (y.attribName = z, y.attribValue = "", y.state = I.ATTRIB_NAME) : rA(y, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME:
            z === "=" ? y.state = I.ATTRIB_VALUE : z === ">" ? (rA(y, "Attribute without value"), y.attribValue = y.attribName, dA(y), tA(y)) : R(z) ? y.state = I.ATTRIB_NAME_SAW_WHITE : O(T, z) ? y.attribName += z : rA(y, "Invalid attribute name");
            continue;
          case I.ATTRIB_NAME_SAW_WHITE:
            if (z === "=") y.state = I.ATTRIB_VALUE;
            else {
              if (R(z)) continue;
              rA(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", k(y, "onattribute", {
                name: y.attribName,
                value: ""
              }), y.attribName = "", z === ">" ? tA(y) : O(b, z) ? (y.attribName = z, y.state = I.ATTRIB_NAME) : (rA(y, "Invalid attribute name"), y.state = I.ATTRIB);
            }
            continue;
          case I.ATTRIB_VALUE:
            if (R(z)) continue;
            C(z) ? (y.q = z, y.state = I.ATTRIB_VALUE_QUOTED) : (rA(y, "Unquoted attribute value"), y.state = I.ATTRIB_VALUE_UNQUOTED, y.attribValue = z);
            continue;
          case I.ATTRIB_VALUE_QUOTED:
            if (z !== y.q) {
              z === "&" ? y.state = I.ATTRIB_VALUE_ENTITY_Q : y.attribValue += z;
              continue;
            }
            dA(y), y.q = "", y.state = I.ATTRIB_VALUE_CLOSED;
            continue;
          case I.ATTRIB_VALUE_CLOSED:
            R(z) ? y.state = I.ATTRIB : z === ">" ? tA(y) : z === "/" ? y.state = I.OPEN_TAG_SLASH : O(b, z) ? (rA(y, "No whitespace between attributes"), y.attribName = z, y.attribValue = "", y.state = I.ATTRIB_NAME) : rA(y, "Invalid attribute name");
            continue;
          case I.ATTRIB_VALUE_UNQUOTED:
            if (!g(z)) {
              z === "&" ? y.state = I.ATTRIB_VALUE_ENTITY_U : y.attribValue += z;
              continue;
            }
            dA(y), z === ">" ? tA(y) : y.state = I.ATTRIB;
            continue;
          case I.CLOSE_TAG:
            if (y.tagName) z === ">" ? G(y) : O(T, z) ? y.tagName += z : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = I.SCRIPT) : (R(z) || rA(y, "Invalid tagname in closing tag"), y.state = I.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(z)) continue;
              M(b, z) ? y.script ? (y.script += "</" + z, y.state = I.SCRIPT) : rA(y, "Invalid tagname in closing tag.") : y.tagName = z;
            }
            continue;
          case I.CLOSE_TAG_SAW_WHITE:
            if (R(z)) continue;
            z === ">" ? G(y) : rA(y, "Invalid characters in closing tag");
            continue;
          case I.TEXT_ENTITY:
          case I.ATTRIB_VALUE_ENTITY_Q:
          case I.ATTRIB_VALUE_ENTITY_U:
            var V, m;
            switch (y.state) {
              case I.TEXT_ENTITY:
                V = I.TEXT, m = "textNode";
                break;
              case I.ATTRIB_VALUE_ENTITY_Q:
                V = I.ATTRIB_VALUE_QUOTED, m = "attribValue";
                break;
              case I.ATTRIB_VALUE_ENTITY_U:
                V = I.ATTRIB_VALUE_UNQUOTED, m = "attribValue";
                break;
            }
            z === ";" ? (y[m] += iA(y), y.entity = "", y.state = V) : O(y.entity.length ? N : x, z) ? y.entity += z : (rA(y, "Invalid character in entity name"), y[m] += "&" + y.entity + z, y.entity = "", y.state = V);
            continue;
          default:
            throw new Error(y, "Unknown state: " + y.state);
        }
      return y.position >= y.bufferCheckPosition && h(y), y;
    }
    String.fromCodePoint || (function() {
      var H = String.fromCharCode, y = Math.floor, J = function() {
        var z = 16384, pA = [], P, V, m = -1, eA = arguments.length;
        if (!eA) return "";
        for (var D = ""; ++m < eA; ) {
          var l = Number(arguments[m]);
          if (!isFinite(l) || l < 0 || l > 1114111 || y(l) !== l) throw RangeError("Invalid code point: " + l);
          l <= 65535 ? pA.push(l) : (l -= 65536, P = (l >> 10) + 55296, V = l % 1024 + 56320, pA.push(P, V)), (m + 1 === eA || pA.length > z) && (D += H.apply(null, pA), pA.length = 0);
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
})), Ua = /* @__PURE__ */ FA(((A, i) => {
  i.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), ba = /* @__PURE__ */ FA(((A, i) => {
  var r = Ua().isArray;
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
      (!("alwaysArray" in c) || typeof c.alwaysArray != "boolean" && !r(c.alwaysArray)) && (c.alwaysArray = !1);
    },
    ensureKeyExists: function(c, h) {
      (!(c + "Key" in h) || typeof h[c + "Key"] != "string") && (h[c + "Key"] = h.compact ? "_" + c : c);
    },
    checkFnExists: function(c, h) {
      return c + "Fn" in h;
    }
  };
})), xl = /* @__PURE__ */ FA(((A, i) => {
  var r = Rg(), c = {
    on: function() {
    },
    parse: function() {
    }
  }, h = ba(), f = Ua().isArray, s, o = !0, d;
  function U(C) {
    return s = h.copyOptions(C), h.ensureFlagExists("ignoreDeclaration", s), h.ensureFlagExists("ignoreInstruction", s), h.ensureFlagExists("ignoreAttributes", s), h.ensureFlagExists("ignoreText", s), h.ensureFlagExists("ignoreComment", s), h.ensureFlagExists("ignoreCdata", s), h.ensureFlagExists("ignoreDoctype", s), h.ensureFlagExists("compact", s), h.ensureFlagExists("alwaysChildren", s), h.ensureFlagExists("addParent", s), h.ensureFlagExists("trim", s), h.ensureFlagExists("nativeType", s), h.ensureFlagExists("nativeTypeAttributes", s), h.ensureFlagExists("sanitize", s), h.ensureFlagExists("instructionHasAttributes", s), h.ensureFlagExists("captureSpacesBetweenElements", s), h.ensureAlwaysArrayExists(s), h.ensureKeyExists("declaration", s), h.ensureKeyExists("instruction", s), h.ensureKeyExists("attributes", s), h.ensureKeyExists("text", s), h.ensureKeyExists("comment", s), h.ensureKeyExists("cdata", s), h.ensureKeyExists("doctype", s), h.ensureKeyExists("type", s), h.ensureKeyExists("name", s), h.ensureKeyExists("elements", s), h.ensureKeyExists("parent", s), h.checkFnExists("doctype", s), h.checkFnExists("instruction", s), h.checkFnExists("cdata", s), h.checkFnExists("comment", s), h.checkFnExists("text", s), h.checkFnExists("instructionName", s), h.checkFnExists("elementName", s), h.checkFnExists("attributeName", s), h.checkFnExists("attributeValue", s), h.checkFnExists("attributes", s), s;
  }
  function F(C) {
    var g = Number(C);
    if (!isNaN(g)) return g;
    var O = C.toLowerCase();
    return O === "true" ? !0 : O === "false" ? !1 : C;
  }
  function B(C, g) {
    var O;
    if (s.compact) {
      if (!d[s[C + "Key"]] && (f(s.alwaysArray) ? s.alwaysArray.indexOf(s[C + "Key"]) !== -1 : s.alwaysArray) && (d[s[C + "Key"]] = []), d[s[C + "Key"]] && !f(d[s[C + "Key"]]) && (d[s[C + "Key"]] = [d[s[C + "Key"]]]), C + "Fn" in s && typeof g == "string" && (g = s[C + "Fn"](g, d)), C === "instruction" && ("instructionFn" in s || "instructionNameFn" in s)) {
        for (O in g) if (g.hasOwnProperty(O)) if ("instructionFn" in s) g[O] = s.instructionFn(g[O], O, d);
        else {
          var M = g[O];
          delete g[O], g[s.instructionNameFn(O, M, d)] = M;
        }
      }
      f(d[s[C + "Key"]]) ? d[s[C + "Key"]].push(g) : d[s[C + "Key"]] = g;
    } else {
      d[s.elementsKey] || (d[s.elementsKey] = []);
      var I = {};
      if (I[s.typeKey] = C, C === "instruction") {
        for (O in g) if (g.hasOwnProperty(O)) break;
        I[s.nameKey] = "instructionNameFn" in s ? s.instructionNameFn(O, g, d) : O, s.instructionHasAttributes ? (I[s.attributesKey] = g[O][s.attributesKey], "instructionFn" in s && (I[s.attributesKey] = s.instructionFn(I[s.attributesKey], O, d))) : ("instructionFn" in s && (g[O] = s.instructionFn(g[O], O, d)), I[s.instructionKey] = g[O]);
      } else
        C + "Fn" in s && (g = s[C + "Fn"](g, d)), I[s[C + "Key"]] = g;
      s.addParent && (I[s.parentKey] = d), d[s.elementsKey].push(I);
    }
  }
  function _(C) {
    if ("attributesFn" in s && C && (C = s.attributesFn(C, d)), (s.trim || "attributeValueFn" in s || "attributeNameFn" in s || s.nativeTypeAttributes) && C) {
      var g;
      for (g in C) if (C.hasOwnProperty(g) && (s.trim && (C[g] = C[g].trim()), s.nativeTypeAttributes && (C[g] = F(C[g])), "attributeValueFn" in s && (C[g] = s.attributeValueFn(C[g], g, d)), "attributeNameFn" in s)) {
        var O = C[g];
        delete C[g], C[s.attributeNameFn(g, C[g], d)] = O;
      }
    }
    return C;
  }
  function E(C) {
    var g = {};
    if (C.body && (C.name.toLowerCase() === "xml" || s.instructionHasAttributes)) {
      for (var O = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, M; (M = O.exec(C.body)) !== null; ) g[M[1]] = M[2] || M[3] || M[4];
      g = _(g);
    }
    if (C.name.toLowerCase() === "xml") {
      if (s.ignoreDeclaration) return;
      d[s.declarationKey] = {}, Object.keys(g).length && (d[s.declarationKey][s.attributesKey] = g), s.addParent && (d[s.declarationKey][s.parentKey] = d);
    } else {
      if (s.ignoreInstruction) return;
      s.trim && (C.body = C.body.trim());
      var I = {};
      s.instructionHasAttributes && Object.keys(g).length ? (I[C.name] = {}, I[C.name][s.attributesKey] = g) : I[C.name] = C.body, B("instruction", I);
    }
  }
  function v(C, g) {
    var O;
    if (typeof C == "object" && (g = C.attributes, C = C.name), g = _(g), "elementNameFn" in s && (C = s.elementNameFn(C, d)), s.compact) {
      if (O = {}, !s.ignoreAttributes && g && Object.keys(g).length) {
        O[s.attributesKey] = {};
        var M;
        for (M in g) g.hasOwnProperty(M) && (O[s.attributesKey][M] = g[M]);
      }
      !(C in d) && (f(s.alwaysArray) ? s.alwaysArray.indexOf(C) !== -1 : s.alwaysArray) && (d[C] = []), d[C] && !f(d[C]) && (d[C] = [d[C]]), f(d[C]) ? d[C].push(O) : d[C] = O;
    } else
      d[s.elementsKey] || (d[s.elementsKey] = []), O = {}, O[s.typeKey] = "element", O[s.nameKey] = C, !s.ignoreAttributes && g && Object.keys(g).length && (O[s.attributesKey] = g), s.alwaysChildren && (O[s.elementsKey] = []), d[s.elementsKey].push(O);
    O[s.parentKey] = d, d = O;
  }
  function w(C) {
    s.ignoreText || !C.trim() && !s.captureSpacesBetweenElements || (s.trim && (C = C.trim()), s.nativeType && (C = F(C)), s.sanitize && (C = C.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), B("text", C));
  }
  function b(C) {
    s.ignoreComment || (s.trim && (C = C.trim()), B("comment", C));
  }
  function T(C) {
    var g = d[s.parentKey];
    s.addParent || delete d[s.parentKey], d = g;
  }
  function x(C) {
    s.ignoreCdata || (s.trim && (C = C.trim()), B("cdata", C));
  }
  function N(C) {
    s.ignoreDoctype || (C = C.replace(/^ /, ""), s.trim && (C = C.trim()), B("doctype", C));
  }
  function R(C) {
    C.note = C;
  }
  i.exports = function(C, g) {
    var O = o ? r.parser(!0, {}) : O = new c.Parser("UTF-8"), M = {};
    if (d = M, s = U(g), o ? (O.opt = { strictEntities: !0 }, O.onopentag = v, O.ontext = w, O.oncomment = b, O.onclosetag = T, O.onerror = R, O.oncdata = x, O.ondoctype = N, O.onprocessinginstruction = E) : (O.on("startElement", v), O.on("text", w), O.on("comment", b), O.on("endElement", T), O.on("error", R)), o) O.write(C).close();
    else if (!O.parse(C)) throw new Error("XML parsing error: " + O.getError());
    if (M[s.elementsKey]) {
      var I = M[s.elementsKey];
      delete M[s.elementsKey], M[s.elementsKey] = I, delete M.text;
    }
    return M;
  };
})), Og = /* @__PURE__ */ FA(((A, i) => {
  var r = ba(), c = xl();
  function h(f) {
    var s = r.copyOptions(f);
    return r.ensureSpacesExists(s), s;
  }
  i.exports = function(f, s) {
    var o = h(s), d = c(f, o), U, F = "compact" in o && o.compact ? "_parent" : "parent";
    return "addParent" in o && o.addParent ? U = JSON.stringify(d, function(B, _) {
      return B === F ? "_" : _;
    }, o.spaces) : U = JSON.stringify(d, null, o.spaces), U.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), Tl = /* @__PURE__ */ FA(((A, i) => {
  var r = ba(), c = Ua().isArray, h, f;
  function s(C) {
    var g = r.copyOptions(C);
    return r.ensureFlagExists("ignoreDeclaration", g), r.ensureFlagExists("ignoreInstruction", g), r.ensureFlagExists("ignoreAttributes", g), r.ensureFlagExists("ignoreText", g), r.ensureFlagExists("ignoreComment", g), r.ensureFlagExists("ignoreCdata", g), r.ensureFlagExists("ignoreDoctype", g), r.ensureFlagExists("compact", g), r.ensureFlagExists("indentText", g), r.ensureFlagExists("indentCdata", g), r.ensureFlagExists("indentAttributes", g), r.ensureFlagExists("indentInstruction", g), r.ensureFlagExists("fullTagEmptyElement", g), r.ensureFlagExists("noQuotesForNativeAttributes", g), r.ensureSpacesExists(g), typeof g.spaces == "number" && (g.spaces = Array(g.spaces + 1).join(" ")), r.ensureKeyExists("declaration", g), r.ensureKeyExists("instruction", g), r.ensureKeyExists("attributes", g), r.ensureKeyExists("text", g), r.ensureKeyExists("comment", g), r.ensureKeyExists("cdata", g), r.ensureKeyExists("doctype", g), r.ensureKeyExists("type", g), r.ensureKeyExists("name", g), r.ensureKeyExists("elements", g), r.checkFnExists("doctype", g), r.checkFnExists("instruction", g), r.checkFnExists("cdata", g), r.checkFnExists("comment", g), r.checkFnExists("text", g), r.checkFnExists("instructionName", g), r.checkFnExists("elementName", g), r.checkFnExists("attributeName", g), r.checkFnExists("attributeValue", g), r.checkFnExists("attributes", g), r.checkFnExists("fullTagEmptyElement", g), g;
  }
  function o(C, g, O) {
    return (!O && C.spaces ? `
` : "") + Array(g + 1).join(C.spaces);
  }
  function d(C, g, O) {
    if (g.ignoreAttributes) return "";
    "attributesFn" in g && (C = g.attributesFn(C, f, h));
    var M, I, Z, uA, k = [];
    for (M in C) C.hasOwnProperty(M) && C[M] !== null && C[M] !== void 0 && (uA = g.noQuotesForNativeAttributes && typeof C[M] != "string" ? "" : '"', I = "" + C[M], I = I.replace(/"/g, "&quot;"), Z = "attributeNameFn" in g ? g.attributeNameFn(M, I, f, h) : M, k.push(g.spaces && g.indentAttributes ? o(g, O + 1, !1) : " "), k.push(Z + "=" + uA + ("attributeValueFn" in g ? g.attributeValueFn(I, M, f, h) : I) + uA));
    return C && Object.keys(C).length && g.spaces && g.indentAttributes && k.push(o(g, O, !1)), k.join("");
  }
  function U(C, g, O) {
    return h = C, f = "xml", g.ignoreDeclaration ? "" : "<?xml" + d(C[g.attributesKey], g, O) + "?>";
  }
  function F(C, g, O) {
    if (g.ignoreInstruction) return "";
    var M;
    for (M in C) if (C.hasOwnProperty(M)) break;
    var I = "instructionNameFn" in g ? g.instructionNameFn(M, C[M], f, h) : M;
    if (typeof C[M] == "object")
      return h = C, f = I, "<?" + I + d(C[M][g.attributesKey], g, O) + "?>";
    var Z = C[M] ? C[M] : "";
    return "instructionFn" in g && (Z = g.instructionFn(Z, M, f, h)), "<?" + I + (Z ? " " + Z : "") + "?>";
  }
  function B(C, g) {
    return g.ignoreComment ? "" : "<!--" + ("commentFn" in g ? g.commentFn(C, f, h) : C) + "-->";
  }
  function _(C, g) {
    return g.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in g ? g.cdataFn(C, f, h) : C.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function E(C, g) {
    return g.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in g ? g.doctypeFn(C, f, h) : C) + ">";
  }
  function v(C, g) {
    return g.ignoreText ? "" : (C = "" + C, C = C.replace(/&amp;/g, "&"), C = C.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in g ? g.textFn(C, f, h) : C);
  }
  function w(C, g) {
    var O;
    if (C.elements && C.elements.length) for (O = 0; O < C.elements.length; ++O) switch (C.elements[O][g.typeKey]) {
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
  function b(C, g, O) {
    h = C, f = C.name;
    var M = [], I = "elementNameFn" in g ? g.elementNameFn(C.name, C) : C.name;
    M.push("<" + I), C[g.attributesKey] && M.push(d(C[g.attributesKey], g, O));
    var Z = C[g.elementsKey] && C[g.elementsKey].length || C[g.attributesKey] && C[g.attributesKey]["xml:space"] === "preserve";
    return Z || ("fullTagEmptyElementFn" in g ? Z = g.fullTagEmptyElementFn(C.name, C) : Z = g.fullTagEmptyElement), Z ? (M.push(">"), C[g.elementsKey] && C[g.elementsKey].length && (M.push(T(C[g.elementsKey], g, O + 1)), h = C, f = C.name), M.push(g.spaces && w(C, g) ? `
` + Array(O + 1).join(g.spaces) : ""), M.push("</" + I + ">")) : M.push("/>"), M.join("");
  }
  function T(C, g, O, M) {
    return C.reduce(function(I, Z) {
      var uA = o(g, O, M && !I);
      switch (Z.type) {
        case "element":
          return I + uA + b(Z, g, O);
        case "comment":
          return I + uA + B(Z[g.commentKey], g);
        case "doctype":
          return I + uA + E(Z[g.doctypeKey], g);
        case "cdata":
          return I + (g.indentCdata ? uA : "") + _(Z[g.cdataKey], g);
        case "text":
          return I + (g.indentText ? uA : "") + v(Z[g.textKey], g);
        case "instruction":
          var k = {};
          return k[Z[g.nameKey]] = Z[g.attributesKey] ? Z : Z[g.instructionKey], I + (g.indentInstruction ? uA : "") + F(k, g, O);
      }
    }, "");
  }
  function x(C, g, O) {
    var M;
    for (M in C) if (C.hasOwnProperty(M)) switch (M) {
      case g.parentKey:
      case g.attributesKey:
        break;
      case g.textKey:
        if (g.indentText || O) return !0;
        break;
      case g.cdataKey:
        if (g.indentCdata || O) return !0;
        break;
      case g.instructionKey:
        if (g.indentInstruction || O) return !0;
        break;
      case g.doctypeKey:
      case g.commentKey:
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function N(C, g, O, M, I) {
    h = C, f = g;
    var Z = "elementNameFn" in O ? O.elementNameFn(g, C) : g;
    if (typeof C > "u" || C === null || C === "") return "fullTagEmptyElementFn" in O && O.fullTagEmptyElementFn(g, C) || O.fullTagEmptyElement ? "<" + Z + "></" + Z + ">" : "<" + Z + "/>";
    var uA = [];
    if (g) {
      if (uA.push("<" + Z), typeof C != "object")
        return uA.push(">" + v(C, O) + "</" + Z + ">"), uA.join("");
      C[O.attributesKey] && uA.push(d(C[O.attributesKey], O, M));
      var k = x(C, O, !0) || C[O.attributesKey] && C[O.attributesKey]["xml:space"] === "preserve";
      if (k || ("fullTagEmptyElementFn" in O ? k = O.fullTagEmptyElementFn(g, C) : k = O.fullTagEmptyElement), k) uA.push(">");
      else
        return uA.push("/>"), uA.join("");
    }
    return uA.push(R(C, O, M + 1, !1)), h = C, f = g, g && uA.push((I ? o(O, M, !1) : "") + "</" + Z + ">"), uA.join("");
  }
  function R(C, g, O, M) {
    var I, Z, uA, k = [];
    for (Z in C) if (C.hasOwnProperty(Z))
      for (uA = c(C[Z]) ? C[Z] : [C[Z]], I = 0; I < uA.length; ++I) {
        switch (Z) {
          case g.declarationKey:
            k.push(U(uA[I], g, O));
            break;
          case g.instructionKey:
            k.push((g.indentInstruction ? o(g, O, M) : "") + F(uA[I], g, O));
            break;
          case g.attributesKey:
          case g.parentKey:
            break;
          case g.textKey:
            k.push((g.indentText ? o(g, O, M) : "") + v(uA[I], g));
            break;
          case g.cdataKey:
            k.push((g.indentCdata ? o(g, O, M) : "") + _(uA[I], g));
            break;
          case g.doctypeKey:
            k.push(o(g, O, M) + E(uA[I], g));
            break;
          case g.commentKey:
            k.push(o(g, O, M) + B(uA[I], g));
            break;
          default:
            k.push(o(g, O, M) + N(uA[I], Z, g, O, x(uA[I], g)));
        }
        M = M && !k.length;
      }
    return k.join("");
  }
  i.exports = function(C, g) {
    g = s(g);
    var O = [];
    return h = C, f = "_root_", g.compact ? O.push(R(C, g, 0, !0)) : (C[g.declarationKey] && O.push(U(C[g.declarationKey], g, 0)), C[g.elementsKey] && C[g.elementsKey].length && O.push(T(C[g.elementsKey], g, 0, !O.length))), O.join("");
  };
})), Ng = /* @__PURE__ */ FA(((A, i) => {
  var r = Tl();
  i.exports = function(c, h) {
    c instanceof Buffer && (c = c.toString());
    var f = null;
    if (typeof c == "string") try {
      f = JSON.parse(c);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else f = c;
    return r(f, h);
  };
})), Zn = (/* @__PURE__ */ FA(((A, i) => {
  i.exports = {
    xml2js: xl(),
    xml2json: Og(),
    js2xml: Tl(),
    json2xml: Ng()
  };
})))(), Ia = (A) => {
  switch (A.type) {
    case void 0:
    case "element":
      const i = new Kg(A.name, A.attributes), r = A.elements || [];
      for (const c of r) {
        const h = Ia(c);
        h !== void 0 && i.push(h);
      }
      return i;
    case "text":
      return A.text;
    default:
      return;
  }
}, kg = class extends NA {
}, Kg = class extends mA {
  static fromXmlString(A) {
    return Ia((0, Zn.xml2js)(A, { compact: !1 }));
  }
  constructor(A, i) {
    super(A), i && this.root.push(new kg(i));
  }
  push(A) {
    this.root.push(A);
  }
}, Mg = class extends mA {
  constructor(A) {
    super(""), hA(this, "_attr", void 0), this._attr = A;
  }
  prepForXml(A) {
    return { _attr: this._attr };
  }
}, Sl = class extends mA {
  constructor(A, i) {
    super(A), i && (this.root = i.root);
  }
}, pe = (A) => {
  if (isNaN(A)) throw new Error(`Invalid value '${A}' specified. Must be an integer.`);
  return Math.floor(A);
}, $n = (A) => {
  const i = pe(A);
  if (i < 0) throw new Error(`Invalid value '${A}' specified. Must be a positive integer.`);
  return i;
}, Hl = (A, i) => {
  const r = i * 2;
  if (A.length !== r || isNaN(+`0x${A}`)) throw new Error(`Invalid hex value '${A}'. Expected ${r} digit hex value`);
  return A;
}, Ho = (A) => Hl(A, 1), _a = (A) => {
  const i = A.slice(-2), r = A.substring(0, A.length - 2);
  return `${Number(r)}${i}`;
}, Ll = (A) => {
  const i = _a(A);
  if (parseFloat(i) < 0) throw new Error(`Invalid value '${i}' specified. Expected a positive number.`);
  return i;
}, fr = (A) => A === "auto" ? A : Hl(A.charAt(0) === "#" ? A.substring(1) : A, 3), nt = (A) => typeof A == "string" ? _a(A) : pe(A), Pg = (A) => typeof A == "string" ? Ll(A) : $n(A), de = (A) => typeof A == "string" ? Ll(A) : $n(A), Gg = (A) => {
  const i = A.substring(0, A.length - 1);
  return `${Number(i)}%`;
}, Dl = (A) => typeof A == "number" ? pe(A) : A.slice(-1) === "%" ? Gg(A) : _a(A), Vg = $n, Wg = $n, Xg = (A) => A.toISOString(), CA = class extends mA {
  constructor(A, i = !0) {
    super(A), i !== !0 && this.root.push(new ge({ val: i }));
  }
}, Wi = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: Pg(i) }));
  }
}, jg = class extends mA {
}, Mt = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: i }));
  }
}, Nr = (A, i) => new bA({
  name: A,
  attributes: { value: {
    key: "w:val",
    value: i
  } }
}), Vr = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(new ge({ val: i }));
  }
}, Dt = class extends mA {
  constructor(A, i) {
    super(A), this.root.push(i);
  }
}, bA = class extends mA {
  constructor({ name: A, attributes: i, children: r }) {
    super(A), i && this.root.push(new ul(i)), r && this.root.push(...r);
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
}, Rl = (A) => new bA({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), re = (A, { color: i, size: r, space: c, style: h }) => new bA({
  name: A,
  attributes: {
    style: {
      key: "w:val",
      value: h
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : fr(i)
    },
    size: {
      key: "w:sz",
      value: r === void 0 ? void 0 : Vg(r)
    },
    space: {
      key: "w:space",
      value: c === void 0 ? void 0 : Wg(c)
    }
  }
}), mr = {
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
}, zg = class extends vt {
  constructor(A) {
    super("w:pBdr"), A.top && this.root.push(re("w:top", A.top)), A.bottom && this.root.push(re("w:bottom", A.bottom)), A.left && this.root.push(re("w:left", A.left)), A.right && this.root.push(re("w:right", A.right)), A.between && this.root.push(re("w:between", A.between));
  }
}, Jg = class extends mA {
  constructor() {
    super("w:pBdr");
    const A = re("w:bottom", {
      color: "auto",
      space: 1,
      style: mr.SINGLE,
      size: 6
    });
    this.root.push(A);
  }
}, Yg = ({ start: A, end: i, left: r, right: c, hanging: h, firstLine: f, firstLineChars: s }) => new bA({
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
      value: r === void 0 ? void 0 : nt(r)
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
      value: s === void 0 ? void 0 : pe(s)
    }
  }
}), qg = () => new bA({ name: "w:br" }), xa = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Ta = (A, i) => new bA({
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
}), Rn = (A) => Ta(xa.BEGIN, A), On = (A) => Ta(xa.SEPARATE, A), Nn = (A) => Ta(xa.END, A), dr = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, pr = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { space: "xml:space" });
  }
}, Zg = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new pr({ space: dr.PRESERVE })), this.root.push("PAGE");
  }
}, $g = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new pr({ space: dr.PRESERVE })), this.root.push("NUMPAGES");
  }
}, Aw = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new pr({ space: dr.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, ew = class extends mA {
  constructor() {
    super("w:instrText"), this.root.push(new pr({ space: dr.PRESERVE })), this.root.push("SECTION");
  }
}, Ai = ({ fill: A, color: i, type: r }) => new bA({
  name: "w:shd",
  attributes: {
    fill: {
      key: "w:fill",
      value: A === void 0 ? void 0 : fr(A)
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : fr(i)
    },
    type: {
      key: "w:val",
      value: r
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
}, tw = class extends mA {
  constructor(A) {
    super("w:del"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, rw = class extends mA {
  constructor(A) {
    super("w:ins"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, nw = { DOT: "dot" }, iw = (A = nw.DOT) => new bA({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), aw = class extends mA {
  constructor(A) {
    super("w:spacing"), this.root.push(new ge({ val: nt(A) }));
  }
}, sw = class extends mA {
  constructor(A) {
    super("w:color"), this.root.push(new ge({ val: fr(A) }));
  }
}, ow = class extends mA {
  constructor(A) {
    super("w:highlight"), this.root.push(new ge({ val: A }));
  }
}, lw = class extends mA {
  constructor(A) {
    super("w:highlightCs"), this.root.push(new ge({ val: A }));
  }
}, uw = (A) => new bA({
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
}), Xi = (A, i) => {
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
  const r = A;
  return new bA({
    name: "w:rFonts",
    attributes: {
      ascii: {
        key: "w:ascii",
        value: r.ascii
      },
      cs: {
        key: "w:cs",
        value: r.cs
      },
      eastAsia: {
        key: "w:eastAsia",
        value: r.eastAsia
      },
      hAnsi: {
        key: "w:hAnsi",
        value: r.hAnsi
      },
      hint: {
        key: "w:hint",
        value: r.hint
      }
    }
  });
}, Ol = (A) => new bA({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), cw = () => Ol("superscript"), hw = () => Ol("subscript"), Nl = {
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
}, fw = (A = Nl.SINGLE, i) => new bA({
  name: "w:u",
  attributes: {
    val: {
      key: "w:val",
      value: A
    },
    color: {
      key: "w:color",
      value: i === void 0 ? void 0 : fr(i)
    }
  }
}), Ft = class extends vt {
  constructor(A) {
    if (super("w:rPr"), !A) return;
    if (A.style && this.push(new Mt("w:rStyle", A.style)), A.font && (typeof A.font == "string" ? this.push(Xi(A.font)) : "name" in A.font ? this.push(Xi(A.font.name, A.font.hint)) : this.push(Xi(A.font))), A.bold !== void 0 && this.push(new CA("w:b", A.bold)), A.boldComplexScript === void 0 && A.bold !== void 0 || A.boldComplexScript) {
      var i;
      this.push(new CA("w:bCs", (i = A.boldComplexScript) !== null && i !== void 0 ? i : A.bold));
    }
    if (A.italics !== void 0 && this.push(new CA("w:i", A.italics)), A.italicsComplexScript === void 0 && A.italics !== void 0 || A.italicsComplexScript) {
      var r;
      this.push(new CA("w:iCs", (r = A.italicsComplexScript) !== null && r !== void 0 ? r : A.italics));
    }
    A.smallCaps !== void 0 ? this.push(new CA("w:smallCaps", A.smallCaps)) : A.allCaps !== void 0 && this.push(new CA("w:caps", A.allCaps)), A.strike !== void 0 && this.push(new CA("w:strike", A.strike)), A.doubleStrike !== void 0 && this.push(new CA("w:dstrike", A.doubleStrike)), A.emboss !== void 0 && this.push(new CA("w:emboss", A.emboss)), A.imprint !== void 0 && this.push(new CA("w:imprint", A.imprint)), A.noProof !== void 0 && this.push(new CA("w:noProof", A.noProof)), A.snapToGrid !== void 0 && this.push(new CA("w:snapToGrid", A.snapToGrid)), A.vanish && this.push(new CA("w:vanish", A.vanish)), A.color && this.push(new sw(A.color)), A.characterSpacing && this.push(new aw(A.characterSpacing)), A.scale !== void 0 && this.push(new Vr("w:w", A.scale)), A.kern && this.push(new Wi("w:kern", A.kern)), A.position && this.push(new Mt("w:position", A.position)), A.size !== void 0 && this.push(new Wi("w:sz", A.size));
    const c = A.sizeComplexScript === void 0 || A.sizeComplexScript === !0 ? A.size : A.sizeComplexScript;
    c && this.push(new Wi("w:szCs", c)), A.highlight && this.push(new ow(A.highlight));
    const h = A.highlightComplexScript === void 0 || A.highlightComplexScript === !0 ? A.highlight : A.highlightComplexScript;
    h && this.push(new lw(h)), A.underline && this.push(fw(A.underline.type, A.underline.color)), A.effect && this.push(new Mt("w:effect", A.effect)), A.border && this.push(re("w:bdr", A.border)), A.shading && this.push(Ai(A.shading)), A.subScript && this.push(hw()), A.superScript && this.push(cw()), A.rightToLeft !== void 0 && this.push(new CA("w:rtl", A.rightToLeft)), A.emphasisMark && this.push(iw(A.emphasisMark.type)), A.language && this.push(uw(A.language)), A.specVanish && this.push(new CA("w:specVanish", A.vanish)), A.math && this.push(new CA("w:oMath", A.math)), A.revision && this.push(new pw(A.revision));
  }
  push(A) {
    this.root.push(A);
  }
}, dw = class extends Ft {
  constructor(A) {
    super(A), A?.insertion && this.push(new rw(A.insertion)), A?.deletion && this.push(new tw(A.deletion));
  }
}, pw = class extends mA {
  constructor(A) {
    super("w:rPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.addChildElement(new Ft(A));
  }
}, ua = class extends mA {
  constructor(A) {
    if (super("w:t"), typeof A == "string")
      this.root.push(new pr({ space: dr.PRESERVE })), this.root.push(A);
    else {
      var i;
      this.root.push(new pr({ space: (i = A.space) !== null && i !== void 0 ? i : dr.DEFAULT })), this.root.push(A.text);
    }
  }
}, kn = {
  CURRENT: "CURRENT",
  TOTAL_PAGES: "TOTAL_PAGES",
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  CURRENT_SECTION: "SECTION"
}, Vt = class extends mA {
  constructor(A) {
    if (super("w:r"), hA(this, "properties", void 0), this.properties = new Ft(A), this.root.push(this.properties), A.break) for (let i = 0; i < A.break; i++) this.root.push(qg());
    if (A.children) for (const i of A.children) {
      if (typeof i == "string") {
        switch (i) {
          case kn.CURRENT:
            this.root.push(Rn()), this.root.push(new Zg()), this.root.push(On()), this.root.push(Nn());
            break;
          case kn.TOTAL_PAGES:
            this.root.push(Rn()), this.root.push(new $g()), this.root.push(On()), this.root.push(Nn());
            break;
          case kn.TOTAL_PAGES_IN_SECTION:
            this.root.push(Rn()), this.root.push(new Aw()), this.root.push(On()), this.root.push(Nn());
            break;
          case kn.CURRENT_SECTION:
            this.root.push(Rn()), this.root.push(new ew()), this.root.push(On()), this.root.push(Nn());
            break;
          default:
            this.root.push(new ua(i));
            break;
        }
        continue;
      }
      this.root.push(i);
    }
    else A.text !== void 0 && this.root.push(new ua(A.text));
  }
}, je = class extends Vt {
  constructor(A) {
    super(typeof A == "string" ? { text: A } : A);
  }
}, Jr = /* @__PURE__ */ FA(((A, i) => {
  i.exports = r;
  function r(c, h) {
    if (!c) throw new Error(h || "Assertion failed");
  }
  r.equal = function(h, f, s) {
    if (h != f) throw new Error(s || "Assertion failed: " + h + " != " + f);
  };
})), ze = /* @__PURE__ */ FA(((A) => {
  var i = Jr();
  A.inherits = yt();
  function r(k, q) {
    return (k.charCodeAt(q) & 64512) !== 55296 || q < 0 || q + 1 >= k.length ? !1 : (k.charCodeAt(q + 1) & 64512) === 56320;
  }
  function c(k, q) {
    if (Array.isArray(k)) return k.slice();
    if (!k) return [];
    var L = [];
    if (typeof k == "string")
      if (q) {
        if (q === "hex")
          for (k = k.replace(/[^a-z0-9]+/gi, ""), k.length % 2 !== 0 && (k = "0" + k), lA = 0; lA < k.length; lA += 2) L.push(parseInt(k[lA] + k[lA + 1], 16));
      } else for (var $ = 0, lA = 0; lA < k.length; lA++) {
        var rA = k.charCodeAt(lA);
        rA < 128 ? L[$++] = rA : rA < 2048 ? (L[$++] = rA >> 6 | 192, L[$++] = rA & 63 | 128) : r(k, lA) ? (rA = 65536 + ((rA & 1023) << 10) + (k.charCodeAt(++lA) & 1023), L[$++] = rA >> 18 | 240, L[$++] = rA >> 12 & 63 | 128, L[$++] = rA >> 6 & 63 | 128, L[$++] = rA & 63 | 128) : (L[$++] = rA >> 12 | 224, L[$++] = rA >> 6 & 63 | 128, L[$++] = rA & 63 | 128);
      }
    else for (lA = 0; lA < k.length; lA++) L[lA] = k[lA] | 0;
    return L;
  }
  A.toArray = c;
  function h(k) {
    for (var q = "", L = 0; L < k.length; L++) q += o(k[L].toString(16));
    return q;
  }
  A.toHex = h;
  function f(k) {
    return (k >>> 24 | k >>> 8 & 65280 | k << 8 & 16711680 | (k & 255) << 24) >>> 0;
  }
  A.htonl = f;
  function s(k, q) {
    for (var L = "", $ = 0; $ < k.length; $++) {
      var lA = k[$];
      q === "little" && (lA = f(lA)), L += d(lA.toString(16));
    }
    return L;
  }
  A.toHex32 = s;
  function o(k) {
    return k.length === 1 ? "0" + k : k;
  }
  A.zero2 = o;
  function d(k) {
    return k.length === 7 ? "0" + k : k.length === 6 ? "00" + k : k.length === 5 ? "000" + k : k.length === 4 ? "0000" + k : k.length === 3 ? "00000" + k : k.length === 2 ? "000000" + k : k.length === 1 ? "0000000" + k : k;
  }
  A.zero8 = d;
  function U(k, q, L, $) {
    var lA = L - q;
    i(lA % 4 === 0);
    for (var rA = new Array(lA / 4), vA = 0, aA = q; vA < rA.length; vA++, aA += 4) {
      var dA;
      $ === "big" ? dA = k[aA] << 24 | k[aA + 1] << 16 | k[aA + 2] << 8 | k[aA + 3] : dA = k[aA + 3] << 24 | k[aA + 2] << 16 | k[aA + 1] << 8 | k[aA], rA[vA] = dA >>> 0;
    }
    return rA;
  }
  A.join32 = U;
  function F(k, q) {
    for (var L = new Array(k.length * 4), $ = 0, lA = 0; $ < k.length; $++, lA += 4) {
      var rA = k[$];
      q === "big" ? (L[lA] = rA >>> 24, L[lA + 1] = rA >>> 16 & 255, L[lA + 2] = rA >>> 8 & 255, L[lA + 3] = rA & 255) : (L[lA + 3] = rA >>> 24, L[lA + 2] = rA >>> 16 & 255, L[lA + 1] = rA >>> 8 & 255, L[lA] = rA & 255);
    }
    return L;
  }
  A.split32 = F;
  function B(k, q) {
    return k >>> q | k << 32 - q;
  }
  A.rotr32 = B;
  function _(k, q) {
    return k << q | k >>> 32 - q;
  }
  A.rotl32 = _;
  function E(k, q) {
    return k + q >>> 0;
  }
  A.sum32 = E;
  function v(k, q, L) {
    return k + q + L >>> 0;
  }
  A.sum32_3 = v;
  function w(k, q, L, $) {
    return k + q + L + $ >>> 0;
  }
  A.sum32_4 = w;
  function b(k, q, L, $, lA) {
    return k + q + L + $ + lA >>> 0;
  }
  A.sum32_5 = b;
  function T(k, q, L, $) {
    var lA = k[q], rA = $ + k[q + 1] >>> 0;
    k[q] = (rA < $ ? 1 : 0) + L + lA >>> 0, k[q + 1] = rA;
  }
  A.sum64 = T;
  function x(k, q, L, $) {
    return (q + $ >>> 0 < q ? 1 : 0) + k + L >>> 0;
  }
  A.sum64_hi = x;
  function N(k, q, L, $) {
    return q + $ >>> 0;
  }
  A.sum64_lo = N;
  function R(k, q, L, $, lA, rA, vA, aA) {
    var dA = 0, tA = q;
    return tA = tA + $ >>> 0, dA += tA < q ? 1 : 0, tA = tA + rA >>> 0, dA += tA < rA ? 1 : 0, tA = tA + aA >>> 0, dA += tA < aA ? 1 : 0, k + L + lA + vA + dA >>> 0;
  }
  A.sum64_4_hi = R;
  function C(k, q, L, $, lA, rA, vA, aA) {
    return q + $ + rA + aA >>> 0;
  }
  A.sum64_4_lo = C;
  function g(k, q, L, $, lA, rA, vA, aA, dA, tA) {
    var G = 0, iA = q;
    return iA = iA + $ >>> 0, G += iA < q ? 1 : 0, iA = iA + rA >>> 0, G += iA < rA ? 1 : 0, iA = iA + aA >>> 0, G += iA < aA ? 1 : 0, iA = iA + tA >>> 0, G += iA < tA ? 1 : 0, k + L + lA + vA + dA + G >>> 0;
  }
  A.sum64_5_hi = g;
  function O(k, q, L, $, lA, rA, vA, aA, dA, tA) {
    return q + $ + rA + aA + tA >>> 0;
  }
  A.sum64_5_lo = O;
  function M(k, q, L) {
    return (q << 32 - L | k >>> L) >>> 0;
  }
  A.rotr64_hi = M;
  function I(k, q, L) {
    return (k << 32 - L | q >>> L) >>> 0;
  }
  A.rotr64_lo = I;
  function Z(k, q, L) {
    return k >>> L;
  }
  A.shr64_hi = Z;
  function uA(k, q, L) {
    return (k << 32 - L | q >>> L) >>> 0;
  }
  A.shr64_lo = uA;
})), Yr = /* @__PURE__ */ FA(((A) => {
  var i = ze(), r = Jr();
  function c() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  A.BlockHash = c, c.prototype.update = function(f, s) {
    if (f = i.toArray(f, s), this.pending ? this.pending = this.pending.concat(f) : this.pending = f, this.pendingTotal += f.length, this.pending.length >= this._delta8) {
      f = this.pending;
      var o = f.length % this._delta8;
      this.pending = f.slice(f.length - o, f.length), this.pending.length === 0 && (this.pending = null), f = i.join32(f, 0, f.length - o, this.endian);
      for (var d = 0; d < f.length; d += this._delta32) this._update(f, d, d + this._delta32);
    }
    return this;
  }, c.prototype.digest = function(f) {
    return this.update(this._pad()), r(this.pending === null), this._digest(f);
  }, c.prototype._pad = function() {
    var f = this.pendingTotal, s = this._delta8, o = s - (f + this.padLength) % s, d = new Array(o + this.padLength);
    d[0] = 128;
    for (var U = 1; U < o; U++) d[U] = 0;
    if (f <<= 3, this.endian === "big") {
      for (var F = 8; F < this.padLength; F++) d[U++] = 0;
      d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = f >>> 24 & 255, d[U++] = f >>> 16 & 255, d[U++] = f >>> 8 & 255, d[U++] = f & 255;
    } else
      for (d[U++] = f & 255, d[U++] = f >>> 8 & 255, d[U++] = f >>> 16 & 255, d[U++] = f >>> 24 & 255, d[U++] = 0, d[U++] = 0, d[U++] = 0, d[U++] = 0, F = 8; F < this.padLength; F++) d[U++] = 0;
    return d;
  };
})), kl = /* @__PURE__ */ FA(((A) => {
  var i = ze().rotr32;
  function r(F, B, _, E) {
    if (F === 0) return c(B, _, E);
    if (F === 1 || F === 3) return f(B, _, E);
    if (F === 2) return h(B, _, E);
  }
  A.ft_1 = r;
  function c(F, B, _) {
    return F & B ^ ~F & _;
  }
  A.ch32 = c;
  function h(F, B, _) {
    return F & B ^ F & _ ^ B & _;
  }
  A.maj32 = h;
  function f(F, B, _) {
    return F ^ B ^ _;
  }
  A.p32 = f;
  function s(F) {
    return i(F, 2) ^ i(F, 13) ^ i(F, 22);
  }
  A.s0_256 = s;
  function o(F) {
    return i(F, 6) ^ i(F, 11) ^ i(F, 25);
  }
  A.s1_256 = o;
  function d(F) {
    return i(F, 7) ^ i(F, 18) ^ F >>> 3;
  }
  A.g0_256 = d;
  function U(F) {
    return i(F, 17) ^ i(F, 19) ^ F >>> 10;
  }
  A.g1_256 = U;
})), gw = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Yr(), h = kl(), f = r.rotl32, s = r.sum32, o = r.sum32_5, d = h.ft_1, U = c.BlockHash, F = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function B() {
    if (!(this instanceof B)) return new B();
    U.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(B, U), i.exports = B, B.blockSize = 512, B.outSize = 160, B.hmacStrength = 80, B.padLength = 64, B.prototype._update = function(E, v) {
    for (var w = this.W, b = 0; b < 16; b++) w[b] = E[v + b];
    for (; b < w.length; b++) w[b] = f(w[b - 3] ^ w[b - 8] ^ w[b - 14] ^ w[b - 16], 1);
    var T = this.h[0], x = this.h[1], N = this.h[2], R = this.h[3], C = this.h[4];
    for (b = 0; b < w.length; b++) {
      var g = ~~(b / 20), O = o(f(T, 5), d(g, x, N, R), C, w[b], F[g]);
      C = R, R = N, N = f(x, 30), x = T, T = O;
    }
    this.h[0] = s(this.h[0], T), this.h[1] = s(this.h[1], x), this.h[2] = s(this.h[2], N), this.h[3] = s(this.h[3], R), this.h[4] = s(this.h[4], C);
  }, B.prototype._digest = function(E) {
    return E === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), Kl = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Yr(), h = kl(), f = Jr(), s = r.sum32, o = r.sum32_4, d = r.sum32_5, U = h.ch32, F = h.maj32, B = h.s0_256, _ = h.s1_256, E = h.g0_256, v = h.g1_256, w = c.BlockHash, b = [
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
    ], this.k = b, this.W = new Array(64);
  }
  r.inherits(T, w), i.exports = T, T.blockSize = 512, T.outSize = 256, T.hmacStrength = 192, T.padLength = 64, T.prototype._update = function(N, R) {
    for (var C = this.W, g = 0; g < 16; g++) C[g] = N[R + g];
    for (; g < C.length; g++) C[g] = o(v(C[g - 2]), C[g - 7], E(C[g - 15]), C[g - 16]);
    var O = this.h[0], M = this.h[1], I = this.h[2], Z = this.h[3], uA = this.h[4], k = this.h[5], q = this.h[6], L = this.h[7];
    for (f(this.k.length === C.length), g = 0; g < C.length; g++) {
      var $ = d(L, _(uA), U(uA, k, q), this.k[g], C[g]), lA = s(B(O), F(O, M, I));
      L = q, q = k, k = uA, uA = s(Z, $), Z = I, I = M, M = O, O = s($, lA);
    }
    this.h[0] = s(this.h[0], O), this.h[1] = s(this.h[1], M), this.h[2] = s(this.h[2], I), this.h[3] = s(this.h[3], Z), this.h[4] = s(this.h[4], uA), this.h[5] = s(this.h[5], k), this.h[6] = s(this.h[6], q), this.h[7] = s(this.h[7], L);
  }, T.prototype._digest = function(N) {
    return N === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), ww = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Kl();
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
  r.inherits(h, c), i.exports = h, h.blockSize = 512, h.outSize = 224, h.hmacStrength = 192, h.padLength = 64, h.prototype._digest = function(s) {
    return s === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), Ml = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Yr(), h = Jr(), f = r.rotr64_hi, s = r.rotr64_lo, o = r.shr64_hi, d = r.shr64_lo, U = r.sum64, F = r.sum64_hi, B = r.sum64_lo, _ = r.sum64_4_hi, E = r.sum64_4_lo, v = r.sum64_5_hi, w = r.sum64_5_lo, b = c.BlockHash, T = [
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
    b.call(this), this.h = [
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
  r.inherits(x, b), i.exports = x, x.blockSize = 1024, x.outSize = 512, x.hmacStrength = 192, x.padLength = 128, x.prototype._prepareBlock = function(lA, rA) {
    for (var vA = this.W, aA = 0; aA < 32; aA++) vA[aA] = lA[rA + aA];
    for (; aA < vA.length; aA += 2) {
      var dA = q(vA[aA - 4], vA[aA - 3]), tA = L(vA[aA - 4], vA[aA - 3]), G = vA[aA - 14], iA = vA[aA - 13], sA = uA(vA[aA - 30], vA[aA - 29]), fA = k(vA[aA - 30], vA[aA - 29]), _A = vA[aA - 32], H = vA[aA - 31];
      vA[aA] = _(dA, tA, G, iA, sA, fA, _A, H), vA[aA + 1] = E(dA, tA, G, iA, sA, fA, _A, H);
    }
  }, x.prototype._update = function(lA, rA) {
    this._prepareBlock(lA, rA);
    var vA = this.W, aA = this.h[0], dA = this.h[1], tA = this.h[2], G = this.h[3], iA = this.h[4], sA = this.h[5], fA = this.h[6], _A = this.h[7], H = this.h[8], y = this.h[9], J = this.h[10], z = this.h[11], pA = this.h[12], P = this.h[13], V = this.h[14], m = this.h[15];
    h(this.k.length === vA.length);
    for (var eA = 0; eA < vA.length; eA += 2) {
      var D = V, l = m, u = I(H, y), Q = Z(H, y), j = N(H, y, J, z, pA, P), AA = R(H, y, J, z, pA, P), Y = this.k[eA], gA = this.k[eA + 1], yA = vA[eA], BA = vA[eA + 1], QA = v(D, l, u, Q, j, AA, Y, gA, yA, BA), xA = w(D, l, u, Q, j, AA, Y, gA, yA, BA);
      D = O(aA, dA), l = M(aA, dA), u = C(aA, dA, tA, G, iA, sA), Q = g(aA, dA, tA, G, iA, sA);
      var RA = F(D, l, u, Q), Ae = B(D, l, u, Q);
      V = pA, m = P, pA = J, P = z, J = H, z = y, H = F(fA, _A, QA, xA), y = B(_A, _A, QA, xA), fA = iA, _A = sA, iA = tA, sA = G, tA = aA, G = dA, aA = F(QA, xA, RA, Ae), dA = B(QA, xA, RA, Ae);
    }
    U(this.h, 0, aA, dA), U(this.h, 2, tA, G), U(this.h, 4, iA, sA), U(this.h, 6, fA, _A), U(this.h, 8, H, y), U(this.h, 10, J, z), U(this.h, 12, pA, P), U(this.h, 14, V, m);
  }, x.prototype._digest = function(lA) {
    return lA === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function N($, lA, rA, vA, aA) {
    var dA = $ & rA ^ ~$ & aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function R($, lA, rA, vA, aA, dA) {
    var tA = lA & vA ^ ~lA & dA;
    return tA < 0 && (tA += 4294967296), tA;
  }
  function C($, lA, rA, vA, aA) {
    var dA = $ & rA ^ $ & aA ^ rA & aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function g($, lA, rA, vA, aA, dA) {
    var tA = lA & vA ^ lA & dA ^ vA & dA;
    return tA < 0 && (tA += 4294967296), tA;
  }
  function O($, lA) {
    var rA = f($, lA, 28), vA = f(lA, $, 2), aA = f(lA, $, 7), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function M($, lA) {
    var rA = s($, lA, 28), vA = s(lA, $, 2), aA = s(lA, $, 7), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function I($, lA) {
    var rA = f($, lA, 14), vA = f($, lA, 18), aA = f(lA, $, 9), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function Z($, lA) {
    var rA = s($, lA, 14), vA = s($, lA, 18), aA = s(lA, $, 9), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function uA($, lA) {
    var rA = f($, lA, 1), vA = f($, lA, 8), aA = o($, lA, 7), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function k($, lA) {
    var rA = s($, lA, 1), vA = s($, lA, 8), aA = d($, lA, 7), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function q($, lA) {
    var rA = f($, lA, 19), vA = f(lA, $, 29), aA = o($, lA, 6), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
  function L($, lA) {
    var rA = s($, lA, 19), vA = s(lA, $, 29), aA = d($, lA, 6), dA = rA ^ vA ^ aA;
    return dA < 0 && (dA += 4294967296), dA;
  }
})), Bw = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Ml();
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
  r.inherits(h, c), i.exports = h, h.blockSize = 1024, h.outSize = 384, h.hmacStrength = 192, h.padLength = 128, h.prototype._digest = function(s) {
    return s === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), mw = /* @__PURE__ */ FA(((A) => {
  A.sha1 = gw(), A.sha224 = ww(), A.sha256 = Kl(), A.sha384 = Bw(), A.sha512 = Ml();
})), vw = /* @__PURE__ */ FA(((A) => {
  var i = ze(), r = Yr(), c = i.rotl32, h = i.sum32, f = i.sum32_3, s = i.sum32_4, o = r.BlockHash;
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
    for (var N = this.h[0], R = this.h[1], C = this.h[2], g = this.h[3], O = this.h[4], M = N, I = R, Z = C, uA = g, k = O, q = 0; q < 80; q++) {
      var L = h(c(s(N, U(q, R, C, g), T[_[q] + x], F(q)), v[q]), O);
      N = O, O = g, g = c(C, 10), C = R, R = L, L = h(c(s(M, U(79 - q, I, Z, uA), T[E[q] + x], B(q)), w[q]), k), M = k, k = uA, uA = c(Z, 10), Z = I, I = L;
    }
    L = f(this.h[1], C, uA), this.h[1] = f(this.h[2], g, k), this.h[2] = f(this.h[3], O, M), this.h[3] = f(this.h[4], N, I), this.h[4] = f(this.h[0], R, Z), this.h[0] = L;
  }, d.prototype._digest = function(T) {
    return T === "hex" ? i.toHex32(this.h, "little") : i.split32(this.h, "little");
  };
  function U(b, T, x, N) {
    return b <= 15 ? T ^ x ^ N : b <= 31 ? T & x | ~T & N : b <= 47 ? (T | ~x) ^ N : b <= 63 ? T & N | x & ~N : T ^ (x | ~N);
  }
  function F(b) {
    return b <= 15 ? 0 : b <= 31 ? 1518500249 : b <= 47 ? 1859775393 : b <= 63 ? 2400959708 : 2840853838;
  }
  function B(b) {
    return b <= 15 ? 1352829926 : b <= 31 ? 1548603684 : b <= 47 ? 1836072691 : b <= 63 ? 2053994217 : 0;
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
  ], E = [
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
  ], v = [
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
})), yw = /* @__PURE__ */ FA(((A, i) => {
  var r = ze(), c = Jr();
  function h(f, s, o) {
    if (!(this instanceof h)) return new h(f, s, o);
    this.Hash = f, this.blockSize = f.blockSize / 8, this.outSize = f.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(s, o));
  }
  i.exports = h, h.prototype._init = function(s) {
    s.length > this.blockSize && (s = new this.Hash().update(s).digest()), c(s.length <= this.blockSize);
    for (var o = s.length; o < this.blockSize; o++) s.push(0);
    for (o = 0; o < s.length; o++) s[o] ^= 54;
    for (this.inner = new this.Hash().update(s), o = 0; o < s.length; o++) s[o] ^= 106;
    this.outer = new this.Hash().update(s);
  }, h.prototype.update = function(s, o) {
    return this.inner.update(s, o), this;
  }, h.prototype.digest = function(s) {
    return this.outer.update(this.inner.digest()), this.outer.digest(s);
  };
})), Cw = /* @__PURE__ */ Ba((/* @__PURE__ */ FA(((A) => {
  var i = A;
  i.utils = ze(), i.common = Yr(), i.sha = mw(), i.ripemd = vw(), i.hmac = yw(), i.sha1 = i.sha.sha1, i.sha256 = i.sha.sha256, i.sha224 = i.sha.sha224, i.sha384 = i.sha.sha384, i.sha512 = i.sha.sha512, i.ripemd160 = i.ripemd.ripemd160;
})))(), 1), Fw = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Ew = (A, i = 21) => (r = i) => {
  let c = "", h = r | 0;
  for (; h--; ) c += A[Math.random() * A.length | 0];
  return c;
}, Qw = (A = 21) => {
  let i = "", r = A | 0;
  for (; r--; ) i += Fw[Math.random() * 64 | 0];
  return i;
}, Re = (A) => Math.floor(A * 72 * 20), ei = (A = 0) => {
  let i = A;
  return () => ++i;
}, Uw = () => ei(), bw = () => ei(1), Iw = () => ei(), _w = () => ei(), Pl = () => Qw().toLowerCase(), Lo = (A) => Cw.default.sha1().update(A instanceof ArrayBuffer ? new Uint8Array(A) : A).digest("hex"), kr = (A) => Ew("1234567890abcdef", A)(), xw = () => `${kr(8)}-${kr(4)}-${kr(4)}-${kr(4)}-${kr(12)}`, Gn = (A) => new Uint8Array(new TextEncoder().encode(A)), Tw = {
  CHARACTER: "character",
  COLUMN: "column",
  INSIDE_MARGIN: "insideMargin",
  LEFT_MARGIN: "leftMargin",
  MARGIN: "margin",
  OUTSIDE_MARGIN: "outsideMargin",
  PAGE: "page",
  RIGHT_MARGIN: "rightMargin"
}, Sw = {
  BOTTOM_MARGIN: "bottomMargin",
  INSIDE_MARGIN: "insideMargin",
  LINE: "line",
  MARGIN: "margin",
  OUTSIDE_MARGIN: "outsideMargin",
  PAGE: "page",
  PARAGRAPH: "paragraph",
  TOP_MARGIN: "topMargin"
}, Hw = () => new bA({
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
}), Gl = (A) => new bA({
  name: "wp:align",
  children: [A]
}), Vl = (A) => new bA({
  name: "wp:posOffset",
  children: [A.toString()]
}), Lw = ({ relative: A, align: i, offset: r }) => new bA({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: A ?? Tw.PAGE
  } },
  children: [(() => {
    if (i) return Gl(i);
    if (r !== void 0) return Vl(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Dw = ({ relative: A, align: i, offset: r }) => new bA({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: A ?? Sw.PAGE
  } },
  children: [(() => {
    if (i) return Gl(i);
    if (r !== void 0) return Vl(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Rw = (A = {}) => {
  var i, r, c, h;
  return new bA({
    name: "wps:bodyPr",
    attributes: {
      lIns: {
        key: "lIns",
        value: (i = A.margins) === null || i === void 0 ? void 0 : i.left
      },
      rIns: {
        key: "rIns",
        value: (r = A.margins) === null || r === void 0 ? void 0 : r.right
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
}, Ow = (A = { txBox: "1" }) => new bA({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: A.txBox
  } }
}), Nw = (A) => new bA({
  name: "w:txbxContent",
  children: [...A]
}), kw = (A) => new bA({
  name: "wps:txbx",
  children: [Nw(A)]
}), Kw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, Mw = class extends mA {
  constructor(A, i) {
    super("a:ext"), hA(this, "attributes", void 0), this.attributes = new Kw({
      cx: A,
      cy: i
    }), this.root.push(this.attributes);
  }
}, Pw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, Gw = class extends mA {
  constructor(A, i) {
    super("a:off"), this.root.push(new Pw({
      x: A ?? 0,
      y: i ?? 0
    }));
  }
}, Vw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, Wl = class extends mA {
  constructor(A) {
    var i, r, c, h;
    super("a:xfrm"), hA(this, "extents", void 0), hA(this, "offset", void 0), this.root.push(new Vw({
      flipVertical: (i = A.flip) === null || i === void 0 ? void 0 : i.vertical,
      flipHorizontal: (r = A.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: A.rotation
    })), this.offset = new Gw((c = A.offset) === null || c === void 0 || (c = c.emus) === null || c === void 0 ? void 0 : c.x, (h = A.offset) === null || h === void 0 || (h = h.emus) === null || h === void 0 ? void 0 : h.y), this.extents = new Mw(A.emus.x, A.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, Xl = () => new bA({ name: "a:noFill" }), Ww = (A) => new bA({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: A.value
  } }
}), Xw = (A) => new bA({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: A.value
  } }
}), ca = (A) => new bA({
  name: "a:solidFill",
  children: [A.type === "rgb" ? Ww(A) : Xw(A)]
}), jw = (A) => new bA({
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
  children: [A.type === "noFill" ? Xl() : A.solidFillType === "rgb" ? ca({
    type: "rgb",
    value: A.value
  }) : ca({
    type: "scheme",
    value: A.value
  })]
}), zw = class extends mA {
  constructor() {
    super("a:avLst");
  }
}, Jw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { prst: "prst" });
  }
}, Yw = class extends mA {
  constructor() {
    super("a:prstGeom"), this.root.push(new Jw({ prst: "rect" })), this.root.push(new zw());
  }
}, qw = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, jl = class extends mA {
  constructor({ element: A, outline: i, solidFill: r, transform: c }) {
    super(`${A}:spPr`), hA(this, "form", void 0), this.root.push(new qw({ bwMode: "auto" })), this.form = new Wl(c), this.root.push(this.form), this.root.push(new Yw()), i && (this.root.push(Xl()), this.root.push(jw(i))), r && this.root.push(ca(r));
  }
}, Do = (A) => new bA({
  name: "wps:wsp",
  children: [
    Ow(A.nonVisualProperties),
    new jl({
      element: "wps",
      transform: A.transformation,
      outline: A.outline,
      solidFill: A.solidFill
    }),
    kw(A.children),
    Rw(A.bodyProperties)
  ]
}), ji = class extends NA {
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
}), $w = (A) => new bA({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [Zw(A)]
}), AB = (A) => new bA({
  name: "a:extLst",
  children: [$w(A)]
}), eB = (A) => new bA({
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
  children: A.type === "svg" ? [AB(A)] : []
}), tB = class extends mA {
  constructor() {
    super("a:srcRect");
  }
}, rB = class extends mA {
  constructor() {
    super("a:fillRect");
  }
}, nB = class extends mA {
  constructor() {
    super("a:stretch"), this.root.push(new rB());
  }
}, iB = class extends mA {
  constructor(A) {
    super("pic:blipFill"), this.root.push(eB(A)), this.root.push(new tB()), this.root.push(new nB());
  }
}, aB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, sB = class extends mA {
  constructor() {
    super("a:picLocks"), this.root.push(new aB({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, oB = class extends mA {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new sB());
  }
}, zl = (A, i) => new bA({
  name: "a:hlinkClick",
  attributes: UA(UA({}, i ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${A}`
  } })
}), lB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, uB = class extends mA {
  constructor() {
    super("pic:cNvPr"), this.root.push(new lB({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(A) {
    for (let i = A.stack.length - 1; i >= 0; i--) {
      const r = A.stack[i];
      if (r instanceof ti) {
        this.root.push(zl(r.linkId, !1));
        break;
      }
    }
    return super.prepForXml(A);
  }
}, cB = class extends mA {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new uB()), this.root.push(new oB());
  }
}, hB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, Ro = class extends mA {
  constructor({ mediaData: A, transform: i, outline: r }) {
    super("pic:pic"), this.root.push(new hB({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new cB()), this.root.push(new iB(A)), this.root.push(new jl({
      element: "pic",
      transform: i,
      outline: r
    }));
  }
}, fB = (A) => new bA({
  name: "wpg:grpSpPr",
  children: [new Wl(A)]
}), dB = () => new bA({ name: "wpg:cNvGrpSpPr" }), pB = (A) => new bA({
  name: "wpg:wgp",
  children: [
    dB(),
    fB(A.transformation),
    ...A.children
  ]
}), gB = class extends mA {
  constructor({ mediaData: A, transform: i, outline: r, solidFill: c }) {
    if (super("a:graphicData"), A.type === "wps") {
      this.root.push(new ji({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const h = Do(UA(UA({}, A.data), {}, {
        transformation: i,
        outline: r,
        solidFill: c
      }));
      this.root.push(h);
    } else if (A.type === "wpg") {
      this.root.push(new ji({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const h = pB({
        children: A.children.map((f) => f.type === "wps" ? Do(UA(UA({}, f.data), {}, {
          transformation: f.transformation,
          outline: f.outline,
          solidFill: f.solidFill
        })) : new Ro({
          mediaData: f,
          transform: f.transformation,
          outline: f.outline
        })),
        transformation: i
      });
      this.root.push(h);
    } else {
      this.root.push(new ji({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const h = new Ro({
        mediaData: A,
        transform: i,
        outline: r
      });
      this.root.push(h);
    }
  }
}, wB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { a: "xmlns:a" });
  }
}, Jl = class extends mA {
  constructor({ mediaData: A, transform: i, outline: r, solidFill: c }) {
    super("a:graphic"), hA(this, "data", void 0), this.root.push(new wB({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new gB({
      mediaData: A,
      transform: i,
      outline: r,
      solidFill: c
    }), this.root.push(this.data);
  }
}, Kn = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
}, BB = {
  BOTH_SIDES: "bothSides",
  LEFT: "left",
  RIGHT: "right",
  LARGEST: "largest"
}, Oo = () => new bA({ name: "wp:wrapNone" }), mB = (A, i = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new bA({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: A.side || BB.BOTH_SIDES
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
}), vB = (A = {
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
}), yB = (A = {
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
}), Yl = class extends mA {
  constructor({ name: A, description: i, title: r, id: c } = {
    name: "",
    description: "",
    title: ""
  }) {
    super("wp:docPr"), hA(this, "docPropertiesUniqueNumericId", Iw());
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
    }), r != null && (h.title = {
      key: "title",
      value: r
    }), this.root.push(new ul(h));
  }
  prepForXml(A) {
    for (let i = A.stack.length - 1; i >= 0; i--) {
      const r = A.stack[i];
      if (r instanceof ti) {
        this.root.push(zl(r.linkId, !0));
        break;
      }
    }
    return super.prepForXml(A);
  }
}, ql = ({ top: A, right: i, bottom: r, left: c }) => new bA({
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
      value: r
    },
    left: {
      key: "l",
      value: c
    }
  }
}), Zl = ({ x: A, y: i }) => new bA({
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
}), CB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, FB = class extends mA {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new CB({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, $l = () => new bA({
  name: "wp:cNvGraphicFramePr",
  children: [new FB()]
}), EB = class extends NA {
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
}, QB = class extends mA {
  constructor({ mediaData: A, transform: i, drawingOptions: r }) {
    super("wp:anchor");
    const c = UA({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new EB({
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
    })), this.root.push(Hw()), this.root.push(Lw(c.horizontalPosition)), this.root.push(Dw(c.verticalPosition)), this.root.push(Zl({
      x: i.emus.x,
      y: i.emus.y
    })), this.root.push(ql({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Kn.SQUARE:
        this.root.push(mB(r.floating.wrap, r.floating.margins));
        break;
      case Kn.TIGHT:
        this.root.push(vB(r.floating.margins));
        break;
      case Kn.TOP_AND_BOTTOM:
        this.root.push(yB(r.floating.margins));
        break;
      case Kn.NONE:
      default:
        this.root.push(Oo());
    }
    else this.root.push(Oo());
    this.root.push(new Yl(r.docProperties)), this.root.push($l()), this.root.push(new Jl({
      mediaData: A,
      transform: i,
      outline: r.outline,
      solidFill: r.solidFill
    }));
  }
}, UB = ({ mediaData: A, transform: i, docProperties: r, outline: c, solidFill: h }) => {
  var f, s, o, d;
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
      Zl({
        x: i.emus.x,
        y: i.emus.y
      }),
      ql(c ? {
        top: ((f = c.width) !== null && f !== void 0 ? f : 9525) * 2,
        right: ((s = c.width) !== null && s !== void 0 ? s : 9525) * 2,
        bottom: ((o = c.width) !== null && o !== void 0 ? o : 9525) * 2,
        left: ((d = c.width) !== null && d !== void 0 ? d : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }),
      new Yl(r),
      $l(),
      new Jl({
        mediaData: A,
        transform: i,
        outline: c,
        solidFill: h
      })
    ]
  });
}, bB = class extends mA {
  constructor(A, i = {}) {
    super("w:drawing"), i.floating ? this.root.push(new QB({
      mediaData: A,
      transform: A.transformation,
      drawingOptions: i
    })) : this.root.push(UB({
      mediaData: A,
      transform: A.transformation,
      docProperties: i.docProperties,
      outline: i.outline,
      solidFill: i.solidFill
    }));
  }
}, IB = (A) => {
  const i = A.indexOf(";base64,"), r = i === -1 ? 0 : i + 8;
  return new Uint8Array(atob(A.substring(r)).split("").map((c) => c.charCodeAt(0)));
}, _B = (A) => typeof A == "string" ? IB(A) : A, zi = (A, i) => ({
  data: _B(A.data),
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
}), xB = class extends mA {
  constructor(A) {
    var i = (...s) => (super(...s), hA(this, "imageData", void 0), this);
    const r = `${Lo(A.data)}.${A.type}`, c = A.type === "svg" ? UA(UA({ type: A.type }, zi(A, r)), {}, { fallback: UA({ type: A.fallback.type }, zi(UA(UA({}, A.fallback), {}, { transformation: A.transformation }), `${Lo(A.fallback.data)}.${A.fallback.type}`)) }) : UA({ type: A.type }, zi(A, r)), h = new bB(c, {
      floating: A.floating,
      docProperties: A.altText,
      outline: A.outline
    }), f = new Vt({ children: [h] });
    A.insertion ? (i("w:ins"), this.root.push(new Qe({
      id: A.insertion.id,
      author: A.insertion.author,
      date: A.insertion.date
    })), this.addChildElement(f)) : A.deletion ? (i("w:del"), this.root.push(new Qe({
      id: A.deletion.id,
      author: A.deletion.author,
      date: A.deletion.date
    })), this.addChildElement(f)) : (i("w:r"), this.root.push(new Ft({})), this.root.push(h)), this.imageData = c;
  }
  prepForXml(A) {
    return A.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && A.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(A);
  }
}, TB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Au = { EXTERNAL: "External" }, SB = (A, i, r, c) => new bA({
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
      value: r
    },
    targetMode: {
      key: "TargetMode",
      value: c
    }
  }
}), Et = class extends mA {
  constructor() {
    super("Relationships"), this.root.push(new TB({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  addRelationship(A, i, r, c) {
    this.root.push(SB(`rId${A}`, i, r, c));
  }
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, HB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, LB = class extends NA {
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
}, No = class extends mA {
  constructor({ id: A, initials: i, author: r, date: c = /* @__PURE__ */ new Date(), children: h }, f) {
    super("w:comment"), hA(this, "paraId", void 0), this.paraId = f, this.root.push(new HB({
      id: A,
      initials: i,
      author: r,
      date: c.toISOString()
    }));
    for (const s of h) this.root.push(s);
  }
  prepForXml(A) {
    const i = super.prepForXml(A);
    if (!i || !this.paraId) return i;
    const r = i["w:comment"];
    if (!Array.isArray(r)) return i;
    for (let c = r.length - 1; c >= 0; c--) {
      const h = r[c];
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
}, DB = (A) => (A + 1).toString(16).toUpperCase().padStart(8, "0"), RB = class extends mA {
  constructor({ children: A }) {
    if (super("w:comments"), hA(this, "relationships", void 0), hA(this, "threadData", void 0), this.root.push(new LB({
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
      const i = new Map(A.map((r) => [r.id, DB(r.id)]));
      for (const r of A) this.root.push(new No(r, i.get(r.id)));
      this.threadData = A.map((r) => ({
        paraId: i.get(r.id),
        parentParaId: r.parentId !== void 0 ? i.get(r.parentId) : void 0,
        done: r.resolved
      }));
    } else for (const i of A) this.root.push(new No(i));
    this.relationships = new Et();
  }
  get Relationships() {
    return this.relationships;
  }
  get ThreadData() {
    return this.threadData;
  }
}, OB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, NB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, kB = class extends mA {
  constructor(A) {
    super("w15:commentEx"), this.root.push(new NB({
      paraId: A.paraId,
      paraIdParent: A.parentParaId,
      done: A.done !== void 0 ? A.done ? "1" : "0" : void 0
    }));
  }
}, KB = class extends mA {
  constructor(A) {
    super("w15:commentsEx"), this.root.push(new OB({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const i of A) this.root.push(new kB(i));
  }
}, MB = class extends jg {
  constructor() {
    super("w:endnoteRef");
  }
}, PB = {
  COLUMN: "column",
  PAGE: "page"
}, GB = class extends mA {
  constructor(A) {
    super("w:br"), this.root.push(new ge({ type: A }));
  }
}, VB = class extends Vt {
  constructor() {
    super({}), this.root.push(new GB(PB.PAGE));
  }
}, WB = class extends mA {
  constructor() {
    super("w:pageBreakBefore");
  }
}, gr = {
  AT_LEAST: "atLeast",
  EXACTLY: "exactly",
  EXACT: "exact",
  AUTO: "auto"
}, XB = ({ after: A, before: i, line: r, lineRule: c, beforeAutoSpacing: h, afterAutoSpacing: f }) => new bA({
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
      value: r
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
}), nr = {
  HEADING_1: "Heading1",
  HEADING_2: "Heading2",
  HEADING_3: "Heading3",
  HEADING_4: "Heading4",
  HEADING_5: "Heading5",
  HEADING_6: "Heading6",
  TITLE: "Title"
}, Pr = (A) => new bA({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), ko = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
  BAR: "bar",
  CLEAR: "clear",
  DECIMAL: "decimal",
  END: "end",
  NUM: "num",
  START: "start"
}, jB = ({ type: A, position: i, leader: r }) => new bA({
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
      value: r
    }
  }
}), zB = (A) => new bA({
  name: "w:tabs",
  children: A.map((i) => jB(i))
}), Ji = class extends mA {
  constructor(A, i) {
    super("w:numPr"), this.root.push(new JB(i)), this.root.push(new YB(A));
  }
}, JB = class extends mA {
  constructor(A) {
    if (super("w:ilvl"), A > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new ge({ val: A }));
  }
}, YB = class extends mA {
  constructor(A) {
    super("w:numId"), this.root.push(new ge({ val: typeof A == "string" ? `{${A}}` : A }));
  }
}, eu = class extends mA {
  constructor(...A) {
    super(...A), hA(this, "fileChild", /* @__PURE__ */ Symbol());
  }
}, qB = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, ti = class extends mA {
  constructor(A, i, r) {
    super("w:hyperlink"), hA(this, "linkId", void 0), this.linkId = i;
    const c = new qB({
      history: 1,
      anchor: r || void 0,
      id: r ? void 0 : `rId${this.linkId}`
    });
    this.root.push(c), A.forEach((h) => {
      this.root.push(h);
    });
  }
}, tu = class extends mA {
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
}, $B = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { id: "w:id" });
  }
}, Am = class {
  constructor(A) {
    hA(this, "bookmarkUniqueNumericId", _w()), hA(this, "start", void 0), hA(this, "children", void 0), hA(this, "end", void 0);
    const i = this.bookmarkUniqueNumericId();
    this.start = new em(A.id, i), this.children = A.children, this.end = new tm(i);
  }
}, em = class extends mA {
  constructor(A, i) {
    super("w:bookmarkStart");
    const r = new ZB({
      name: A,
      id: i
    });
    this.root.push(r);
  }
}, tm = class extends mA {
  constructor(A) {
    super("w:bookmarkEnd");
    const i = new $B({ id: A });
    this.root.push(i);
  }
}, rm = (A) => new bA({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), Mn = ({ id: A, fontKey: i, subsetted: r }, c) => new bA({
  name: c,
  attributes: UA({ id: {
    key: "r:id",
    value: A
  } }, i ? { fontKey: {
    key: "w:fontKey",
    value: `{${i}}`
  } } : {}),
  children: [...r ? [new CA("w:subsetted", r)] : []]
}), nm = ({ name: A, altName: i, panose1: r, charset: c, family: h, notTrueType: f, pitch: s, sig: o, embedRegular: d, embedBold: U, embedItalic: F, embedBoldItalic: B }) => new bA({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: A
  } },
  children: [
    ...i ? [Nr("w:altName", i)] : [],
    ...r ? [Nr("w:panose1", r)] : [],
    ...c ? [Nr("w:charset", c)] : [],
    ...h ? [Nr("w:family", h)] : [],
    ...f ? [new CA("w:notTrueType", f)] : [],
    ...s ? [Nr("w:pitch", s)] : [],
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
    ...d ? [Mn(d, "w:embedRegular")] : [],
    ...U ? [Mn(U, "w:embedBold")] : [],
    ...F ? [Mn(F, "w:embedItalic")] : [],
    ...B ? [Mn(B, "w:embedBoldItalic")] : []
  ]
}), im = ({ name: A, index: i, fontKey: r, characterSet: c }) => nm({
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
    fontKey: r,
    id: `rId${i}`
  }
}), am = (A) => new bA({
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
  children: A.map((i, r) => im({
    name: i.name,
    index: r + 1,
    fontKey: i.fontKey,
    characterSet: i.characterSet
  }))
}), ru = class {
  constructor(A) {
    hA(this, "options", void 0), hA(this, "fontTable", void 0), hA(this, "relationships", void 0), hA(this, "fontOptionsWithKey", []), this.options = A, this.fontOptionsWithKey = A.map((i) => UA(UA({}, i), {}, { fontKey: xw() })), this.fontTable = am(this.fontOptionsWithKey), this.relationships = new Et();
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
}), om = (A) => {
  var i, r;
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
        value: (r = A.space) === null || r === void 0 ? void 0 : r.vertical
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
}, Pt = class extends vt {
  constructor(A) {
    if (super("w:pPr", A?.includeIfEmpty), hA(this, "numberingReferences", []), !A) return this;
    if (A.heading && this.push(Pr(A.heading)), A.bullet && this.push(Pr("ListParagraph")), A.numbering && !A.style && !A.heading && (A.numbering.custom || this.push(Pr("ListParagraph"))), A.style && this.push(Pr(A.style)), A.keepNext !== void 0 && this.push(new CA("w:keepNext", A.keepNext)), A.keepLines !== void 0 && this.push(new CA("w:keepLines", A.keepLines)), A.pageBreakBefore && this.push(new WB()), A.frame && this.push(om(A.frame)), A.widowControl !== void 0 && this.push(new CA("w:widowControl", A.widowControl)), A.bullet && this.push(new Ji(1, A.bullet.level)), A.numbering) {
      var i, r;
      this.numberingReferences.push({
        reference: A.numbering.reference,
        instance: (i = A.numbering.instance) !== null && i !== void 0 ? i : 0
      }), this.push(new Ji(`${A.numbering.reference}-${(r = A.numbering.instance) !== null && r !== void 0 ? r : 0}`, A.numbering.level));
    } else A.numbering === !1 && this.push(new Ji(0, 0));
    A.border && this.push(new zg(A.border)), A.thematicBreak && this.push(new Jg()), A.shading && this.push(Ai(A.shading)), A.wordWrap && this.push(sm()), A.overflowPunctuation && this.push(new CA("w:overflowPunct", A.overflowPunctuation));
    const c = [
      ...A.rightTabStop !== void 0 ? [{
        type: ko.RIGHT,
        position: A.rightTabStop
      }] : [],
      ...A.tabStops ? A.tabStops : [],
      ...A.leftTabStop !== void 0 ? [{
        type: ko.LEFT,
        position: A.leftTabStop
      }] : []
    ];
    c.length > 0 && this.push(zB(c)), A.bidirectional !== void 0 && this.push(new CA("w:bidi", A.bidirectional)), A.spacing && this.push(XB(A.spacing)), A.indent && this.push(Yg(A.indent)), A.contextualSpacing !== void 0 && this.push(new CA("w:contextualSpacing", A.contextualSpacing)), A.alignment && this.push(Rl(A.alignment)), A.outlineLevel !== void 0 && this.push(rm(A.outlineLevel)), A.suppressLineNumbers !== void 0 && this.push(new CA("w:suppressLineNumbers", A.suppressLineNumbers)), A.autoSpaceEastAsianText !== void 0 && this.push(new CA("w:autoSpaceDN", A.autoSpaceEastAsianText)), A.run && this.push(new dw(A.run)), A.revision && this.push(new lm(A.revision));
  }
  push(A) {
    this.root.push(A);
  }
  prepForXml(A) {
    if (!(A.viewWrapper instanceof ru)) for (const i of this.numberingReferences) A.file.Numbering.createConcreteNumberingInstance(i.reference, i.instance);
    return super.prepForXml(A);
  }
}, lm = class extends mA {
  constructor(A) {
    super("w:pPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new Pt(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, Le = class extends eu {
  constructor(A) {
    if (super("w:p"), hA(this, "properties", void 0), typeof A == "string")
      return this.properties = new Pt({}), this.root.push(this.properties), this.root.push(new je(A)), this;
    if (this.properties = new Pt(A), this.root.push(this.properties), A.text && this.root.push(new je(A.text)), A.children) for (const i of A.children) {
      if (i instanceof Am) {
        this.root.push(i.start);
        for (const r of i.children) this.root.push(r);
        this.root.push(i.end);
        continue;
      }
      this.root.push(i);
    }
  }
  prepForXml(A) {
    for (const i of this.root) if (i instanceof tu) {
      const r = this.root.indexOf(i), c = new ti(i.options.children, Pl());
      A.viewWrapper.Relationships.addRelationship(c.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", i.options.link, Au.EXTERNAL), this.root[r] = c;
    }
    return super.prepForXml(A);
  }
  addRunToFront(A) {
    return this.root.splice(1, 0, A), this;
  }
}, um = (A) => new bA({
  name: "w:gridCol",
  attributes: A !== void 0 ? { width: {
    key: "w:w",
    value: de(A)
  } } : void 0
}), nu = class extends mA {
  constructor(A, i) {
    super("w:tblGrid");
    for (const r of A) this.root.push(um(r));
    i && this.root.push(new hm(i));
  }
}, cm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { id: "w:id" });
  }
}, hm = class extends mA {
  constructor(A) {
    super("w:tblGridChange"), this.root.push(new cm({ id: A.id })), this.root.push(new nu(A.columnWidths));
  }
}, fm = class extends mA {
  constructor(A) {
    super("w:ins"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, dm = class extends mA {
  constructor(A) {
    super("w:del"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, pm = class extends mA {
  constructor(A) {
    super("w:cellIns"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, gm = class extends mA {
  constructor(A) {
    super("w:cellDel"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    }));
  }
}, wm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, Bm = class extends mA {
  constructor(A) {
    super("w:cellMerge"), this.root.push(new wm(A));
  }
}, iu = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, Iy = UA(UA({}, iu), {}, { BOTH: "both" }), au = (A) => new bA({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: A
  } }
}), su = ({ marginUnitType: A = Gt.DXA, top: i, left: r, bottom: c, right: h }) => [
  {
    name: "w:top",
    size: i
  },
  {
    name: "w:left",
    size: r
  },
  {
    name: "w:bottom",
    size: c
  },
  {
    name: "w:right",
    size: h
  }
].filter((f) => f.size !== void 0).map(({ name: f, size: s }) => Wn(f, {
  type: A,
  size: s
})), mm = (A) => {
  const i = su(A);
  if (i.length !== 0)
    return new bA({
      name: "w:tblCellMar",
      children: i
    });
}, vm = (A) => {
  const i = su(A);
  if (i.length !== 0)
    return new bA({
      name: "w:tcMar",
      children: i
    });
}, Gt = {
  AUTO: "auto",
  DXA: "dxa",
  NIL: "nil",
  PERCENTAGE: "pct"
}, Wn = (A, { type: i = Gt.AUTO, size: r }) => {
  let c = r;
  return i === Gt.PERCENTAGE && typeof r == "number" && (c = `${r}%`), new bA({
    name: A,
    attributes: {
      type: {
        key: "w:type",
        value: i
      },
      size: {
        key: "w:w",
        value: Dl(c)
      }
    }
  });
}, ym = class extends vt {
  constructor(A) {
    super("w:tcBorders"), A.top && this.root.push(re("w:top", A.top)), A.start && this.root.push(re("w:start", A.start)), A.left && this.root.push(re("w:left", A.left)), A.bottom && this.root.push(re("w:bottom", A.bottom)), A.end && this.root.push(re("w:end", A.end)), A.right && this.root.push(re("w:right", A.right));
  }
}, Cm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Fm = class extends mA {
  constructor(A) {
    super("w:gridSpan"), this.root.push(new Cm({ val: pe(A) }));
  }
}, ou = {
  CONTINUE: "continue",
  RESTART: "restart"
}, Em = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Ko = class extends mA {
  constructor(A) {
    super("w:vMerge"), this.root.push(new Em({ val: A }));
  }
}, Qm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Um = class extends mA {
  constructor(A) {
    super("w:textDirection"), this.root.push(new Qm({ val: A }));
  }
}, lu = class extends vt {
  constructor(A) {
    if (super("w:tcPr", A.includeIfEmpty), A.width && this.root.push(Wn("w:tcW", A.width)), A.columnSpan && this.root.push(new Fm(A.columnSpan)), A.verticalMerge ? this.root.push(new Ko(A.verticalMerge)) : A.rowSpan && A.rowSpan > 1 && this.root.push(new Ko(ou.RESTART)), A.borders && this.root.push(new ym(A.borders)), A.shading && this.root.push(Ai(A.shading)), A.margins) {
      const i = vm(A.margins);
      i && this.root.push(i);
    }
    A.textDirection && this.root.push(new Um(A.textDirection)), A.verticalAlign && this.root.push(au(A.verticalAlign)), A.insertion && this.root.push(new pm(A.insertion)), A.deletion && this.root.push(new gm(A.deletion)), A.revision && this.root.push(new bm(A.revision)), A.cellMerge && this.root.push(new Bm(A.cellMerge));
  }
}, bm = class extends mA {
  constructor(A) {
    super("w:tcPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new lu(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, Sa = class extends mA {
  constructor(A) {
    super("w:tc"), hA(this, "options", void 0), this.options = A, this.root.push(new lu(A));
    for (const i of A.children) this.root.push(i);
  }
  prepForXml(A) {
    return this.root[this.root.length - 1] instanceof Le || this.root.push(new Le({})), super.prepForXml(A);
  }
}, ir = {
  style: mr.NONE,
  size: 0,
  color: "auto"
}, ar = {
  style: mr.SINGLE,
  size: 4,
  color: "auto"
}, uu = class extends mA {
  constructor(A) {
    var i, r, c, h, f, s;
    super("w:tblBorders"), this.root.push(re("w:top", (i = A.top) !== null && i !== void 0 ? i : ar)), this.root.push(re("w:left", (r = A.left) !== null && r !== void 0 ? r : ar)), this.root.push(re("w:bottom", (c = A.bottom) !== null && c !== void 0 ? c : ar)), this.root.push(re("w:right", (h = A.right) !== null && h !== void 0 ? h : ar)), this.root.push(re("w:insideH", (f = A.insideHorizontal) !== null && f !== void 0 ? f : ar)), this.root.push(re("w:insideV", (s = A.insideVertical) !== null && s !== void 0 ? s : ar));
  }
};
hA(uu, "NONE", {
  top: ir,
  bottom: ir,
  left: ir,
  right: ir,
  insideHorizontal: ir,
  insideVertical: ir
});
var Im = (A) => new bA({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), _m = ({ horizontalAnchor: A, verticalAnchor: i, absoluteHorizontalPosition: r, relativeHorizontalPosition: c, absoluteVerticalPosition: h, relativeVerticalPosition: f, bottomFromText: s, topFromText: o, leftFromText: d, rightFromText: U, overlap: F }) => new bA({
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
      value: s === void 0 ? void 0 : de(s)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : nt(r)
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
  children: F ? [Im(F)] : void 0
}), cu = {
  AUTOFIT: "autofit",
  FIXED: "fixed"
}, xm = (A) => new bA({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: A
  } }
}), Tm = {
  DXA: "dxa",
  NIL: "nil"
}, hu = ({ type: A = Tm.DXA, value: i }) => new bA({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: A
    },
    value: {
      key: "w:w",
      value: Dl(i)
    }
  }
}), Sm = ({ firstRow: A, lastRow: i, firstColumn: r, lastColumn: c, noHBand: h, noVBand: f }) => new bA({
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
      value: r
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
}), fu = class extends vt {
  constructor(A) {
    if (super("w:tblPr", A.includeIfEmpty), A.style && this.root.push(new Mt("w:tblStyle", A.style)), A.float && this.root.push(_m(A.float)), A.visuallyRightToLeft !== void 0 && this.root.push(new CA("w:bidiVisual", A.visuallyRightToLeft)), A.width && this.root.push(Wn("w:tblW", A.width)), A.alignment && this.root.push(Rl(A.alignment)), A.indent && this.root.push(Wn("w:tblInd", A.indent)), A.borders && this.root.push(new uu(A.borders)), A.shading && this.root.push(Ai(A.shading)), A.layout && this.root.push(xm(A.layout)), A.cellMargin) {
      const i = mm(A.cellMargin);
      i && this.root.push(i);
    }
    A.tableLook && this.root.push(Sm(A.tableLook)), A.cellSpacing && this.root.push(hu(A.cellSpacing)), A.revision && this.root.push(new Hm(A.revision));
  }
}, Hm = class extends mA {
  constructor(A) {
    super("w:tblPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new fu(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, du = class extends eu {
  constructor({ rows: A, width: i, columnWidths: r = Array(Math.max(...A.map((w) => w.CellCount))).fill(100), columnWidthsRevision: c, margins: h, indent: f, float: s, layout: o, style: d, borders: U, alignment: F, visuallyRightToLeft: B, tableLook: _, cellSpacing: E, revision: v }) {
    super("w:tbl"), this.root.push(new fu({
      borders: U ?? {},
      width: i ?? { size: 100 },
      indent: f,
      float: s,
      layout: o,
      style: d,
      alignment: F,
      cellMargin: h,
      visuallyRightToLeft: B,
      tableLook: _,
      cellSpacing: E,
      revision: v
    })), this.root.push(new nu(r, c));
    for (const w of A) this.root.push(w);
    A.forEach((w, b) => {
      if (b === A.length - 1) return;
      let T = 0;
      w.cells.forEach((x) => {
        if (x.options.rowSpan && x.options.rowSpan > 1) {
          const N = new Sa({
            rowSpan: x.options.rowSpan - 1,
            columnSpan: x.options.columnSpan,
            borders: x.options.borders,
            children: [],
            verticalMerge: ou.CONTINUE
          });
          A[b + 1].addCellToColumnIndex(N, T);
        }
        T += x.options.columnSpan || 1;
      });
    });
  }
}, Lm = (A, i) => new bA({
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
}), pu = class extends vt {
  constructor(A) {
    super("w:trPr", A.includeIfEmpty), A.cantSplit !== void 0 && this.root.push(new CA("w:cantSplit", A.cantSplit)), A.tableHeader !== void 0 && this.root.push(new CA("w:tblHeader", A.tableHeader)), A.height && this.root.push(Lm(A.height.value, A.height.rule)), A.cellSpacing && this.root.push(hu(A.cellSpacing)), A.insertion && this.root.push(new fm(A.insertion)), A.deletion && this.root.push(new dm(A.deletion)), A.revision && this.root.push(new Dm(A.revision));
  }
}, Dm = class extends mA {
  constructor(A) {
    super("w:trPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new pu(UA(UA({}, A), {}, { includeIfEmpty: !0 })));
  }
}, Ha = class extends mA {
  constructor(A) {
    super("w:tr"), hA(this, "options", void 0), this.options = A, this.root.push(new pu(A));
    for (const i of A.children) this.root.push(i);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((A) => A instanceof Sa);
  }
  addCellToIndex(A, i) {
    this.root.splice(i + 1, 0, A);
  }
  addCellToColumnIndex(A, i) {
    const r = this.columnIndexToRootIndex(i, !0);
    this.addCellToIndex(A, r - 1);
  }
  rootIndexToColumnIndex(A) {
    if (A < 1 || A >= this.root.length) throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let i = 0;
    for (let r = 1; r < A; r++) {
      const c = this.root[r];
      i += c.options.columnSpan || 1;
    }
    return i;
  }
  columnIndexToRootIndex(A, i = !1) {
    if (A < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let r = 0, c = 1;
    for (; r <= A; ) {
      if (c >= this.root.length) {
        if (i) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${r - 1}`);
      }
      const h = this.root[c];
      c += 1, r += h && h.options.columnSpan || 1;
    }
    return c - 1;
  }
}, Rm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Om = class extends mA {
  constructor() {
    super("Properties"), this.root.push(new Rm({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, Nm = class extends NA {
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
}), km = class extends mA {
  constructor() {
    super("Types"), this.root.push(new Nm({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(tt("image/png", "png")), this.root.push(tt("image/jpeg", "jpeg")), this.root.push(tt("image/jpeg", "jpg")), this.root.push(tt("image/bmp", "bmp")), this.root.push(tt("image/gif", "gif")), this.root.push(tt("image/svg+xml", "svg")), this.root.push(tt("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(tt("application/xml", "xml")), this.root.push(tt("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ee("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(Ee("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
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
}, ha = {
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
}, ri = class extends NA {
  constructor(A, i) {
    super(UA({ Ignorable: i }, Object.fromEntries(A.map((r) => [r, ha[r]])))), hA(this, "xmlKeys", UA({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(ha).map((r) => [r, `xmlns:${r}`]))));
  }
}, Km = class extends mA {
  constructor(A) {
    super("cp:coreProperties"), this.root.push(new ri([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), A.title && this.root.push(new Dt("dc:title", A.title)), A.subject && this.root.push(new Dt("dc:subject", A.subject)), A.creator && this.root.push(new Dt("dc:creator", A.creator)), A.keywords && this.root.push(new Dt("cp:keywords", A.keywords)), A.description && this.root.push(new Dt("dc:description", A.description)), A.lastModifiedBy && this.root.push(new Dt("cp:lastModifiedBy", A.lastModifiedBy)), A.revision && this.root.push(new Dt("cp:revision", String(A.revision))), this.root.push(new Mo("dcterms:created")), this.root.push(new Mo("dcterms:modified"));
  }
}, Mm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { type: "xsi:type" });
  }
}, Mo = class extends mA {
  constructor(A) {
    super(A), this.root.push(new Mm({ type: "dcterms:W3CDTF" })), this.root.push(Xg(/* @__PURE__ */ new Date()));
  }
}, Pm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Gm = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, Vm = class extends mA {
  constructor(A, i) {
    super("property"), this.root.push(new Gm({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: A.toString(),
      name: i.name
    })), this.root.push(new Wm(i.value));
  }
}, Wm = class extends mA {
  constructor(A) {
    super("vt:lpwstr"), this.root.push(A);
  }
}, Xm = class extends mA {
  constructor(A) {
    super("Properties"), hA(this, "nextId", void 0), hA(this, "properties", []), this.root.push(new Pm({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const i of A) this.addCustomProperty(i);
  }
  prepForXml(A) {
    return this.properties.forEach((i) => this.root.push(i)), super.prepForXml(A);
  }
  addCustomProperty(A) {
    this.properties.push(new Vm(this.nextId++, A));
  }
}, jm = ({ space: A, count: i, separate: r, equalWidth: c, children: h }) => new bA({
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
      value: r
    },
    equalWidth: {
      key: "w:equalWidth",
      value: c
    }
  },
  children: !c && h ? h : void 0
}), zm = ({ type: A, linePitch: i, charSpace: r }) => new bA({
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
      value: r ? pe(r) : void 0
    }
  }
}), lr = {
  DEFAULT: "default",
  FIRST: "first",
  EVEN: "even"
}, Po = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, Yi = (A, i) => new bA({
  name: A,
  attributes: {
    type: {
      key: "w:type",
      value: i.type || lr.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${i.id}`
    }
  }
}), Jm = ({ countBy: A, start: i, restart: r, distance: c }) => new bA({
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
      value: r
    },
    distance: {
      key: "w:distance",
      value: c === void 0 ? void 0 : de(c)
    }
  }
}), Go = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, Ym = class extends vt {
  constructor(A) {
    if (super("w:pgBorders"), !A) return this;
    A.pageBorders ? this.root.push(new Go({
      display: A.pageBorders.display,
      offsetFrom: A.pageBorders.offsetFrom,
      zOrder: A.pageBorders.zOrder
    })) : this.root.push(new Go({})), A.pageBorderTop && this.root.push(re("w:top", A.pageBorderTop)), A.pageBorderLeft && this.root.push(re("w:left", A.pageBorderLeft)), A.pageBorderBottom && this.root.push(re("w:bottom", A.pageBorderBottom)), A.pageBorderRight && this.root.push(re("w:right", A.pageBorderRight));
  }
}, qm = (A, i, r, c, h, f, s) => new bA({
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
      value: nt(r)
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
      value: de(s)
    }
  }
}), Zm = ({ start: A, formatType: i, separator: r }) => new bA({
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
      value: r
    }
  }
}), Xn = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape"
}, $m = ({ width: A, height: i, orientation: r, code: c }) => {
  const h = de(A), f = de(i);
  return new bA({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === Xn.LANDSCAPE ? f : h
      },
      height: {
        key: "w:h",
        value: r === Xn.LANDSCAPE ? h : f
      },
      orientation: {
        key: "w:orient",
        value: r
      },
      code: {
        key: "w:code",
        value: c
      }
    }
  });
}, Av = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, ev = class extends mA {
  constructor(A) {
    super("w:textDirection"), this.root.push(new Av({ val: A }));
  }
}, tv = (A) => new bA({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: A
  } }
}), Rt = {
  TOP: 1440,
  RIGHT: 1440,
  BOTTOM: 1440,
  LEFT: 1440,
  HEADER: 708,
  FOOTER: 708,
  GUTTER: 0
}, qi = {
  WIDTH: 11906,
  HEIGHT: 16838,
  ORIENTATION: Xn.PORTRAIT
}, gu = class extends mA {
  constructor({ page: { size: { width: A = qi.WIDTH, height: i = qi.HEIGHT, orientation: r = qi.ORIENTATION, code: c } = {}, margin: { top: h = Rt.TOP, right: f = Rt.RIGHT, bottom: s = Rt.BOTTOM, left: o = Rt.LEFT, header: d = Rt.HEADER, footer: U = Rt.FOOTER, gutter: F = Rt.GUTTER } = {}, pageNumbers: B = {}, borders: _, textDirection: E } = {}, grid: { linePitch: v = 360, charSpace: w, type: b } = {}, headerWrapperGroup: T = {}, footerWrapperGroup: x = {}, lineNumbers: N, titlePage: R, verticalAlign: C, column: g, type: O, revision: M } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(Po.HEADER, T), this.addHeaderFooterGroup(Po.FOOTER, x), O && this.root.push(tv(O)), this.root.push($m({
      width: A,
      height: i,
      orientation: r,
      code: c
    })), this.root.push(qm(h, f, s, o, d, U, F)), _ && this.root.push(new Ym(_)), N && this.root.push(Jm(N)), this.root.push(Zm(B)), g && this.root.push(jm(g)), C && this.root.push(au(C)), R !== void 0 && this.root.push(new CA("w:titlePg", R)), E && this.root.push(new ev(E)), M && this.root.push(new rv(M)), this.root.push(zm({
      linePitch: v,
      charSpace: w,
      type: b
    }));
  }
  addHeaderFooterGroup(A, i) {
    i.default && this.root.push(Yi(A, {
      type: lr.DEFAULT,
      id: i.default.View.ReferenceId
    })), i.first && this.root.push(Yi(A, {
      type: lr.FIRST,
      id: i.first.View.ReferenceId
    })), i.even && this.root.push(Yi(A, {
      type: lr.EVEN,
      id: i.even.View.ReferenceId
    }));
  }
}, rv = class extends mA {
  constructor(A) {
    super("w:sectPrChange"), this.root.push(new Qe({
      id: A.id,
      author: A.author,
      date: A.date
    })), this.root.push(new gu(A));
  }
}, nv = class extends mA {
  constructor() {
    super("w:body"), hA(this, "sections", []);
  }
  addSection(A) {
    const i = this.sections.pop();
    this.root.push(this.createSectionParagraph(i)), this.sections.push(new gu(A));
  }
  prepForXml(A) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(A);
  }
  push(A) {
    this.root.push(A);
  }
  createSectionParagraph(A) {
    const i = new Le({}), r = new Pt({});
    return r.push(A), i.addChildElement(r), i;
  }
}, iv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}, av = class extends mA {
  constructor(A) {
    super("w:background"), this.root.push(new iv({
      color: A.color === void 0 ? void 0 : fr(A.color),
      themeColor: A.themeColor,
      themeShade: A.themeShade === void 0 ? void 0 : Ho(A.themeShade),
      themeTint: A.themeTint === void 0 ? void 0 : Ho(A.themeTint)
    }));
  }
}, sv = class extends mA {
  constructor(A) {
    super("w:document"), hA(this, "body", void 0), this.root.push(new ri([
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
    ], "w14 w15 wp14")), this.body = new nv(), A.background && this.root.push(new av(A.background)), this.root.push(this.body);
  }
  add(A) {
    return this.body.push(A), this;
  }
  get Body() {
    return this.body;
  }
}, ov = class {
  constructor(A) {
    hA(this, "document", void 0), hA(this, "relationships", void 0), this.document = new sv(A), this.relationships = new Et();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, lv = class extends NA {
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
}, uv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, cv = class extends Vt {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new MB());
  }
}, Vo = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Zi = class extends mA {
  constructor(A) {
    super("w:endnote"), this.root.push(new uv({
      type: A.type,
      id: A.id
    }));
    for (let i = 0; i < A.children.length; i++) {
      const r = A.children[i];
      i === 0 && r.addRunToFront(new cv()), this.root.push(r);
    }
  }
}, hv = class extends mA {
  constructor() {
    super("w:continuationSeparator");
  }
}, wu = class extends Vt {
  constructor() {
    super({}), this.root.push(new hv());
  }
}, fv = class extends mA {
  constructor() {
    super("w:separator");
  }
}, Bu = class extends Vt {
  constructor() {
    super({}), this.root.push(new fv());
  }
}, dv = class extends mA {
  constructor() {
    super("w:endnotes"), this.root.push(new lv({
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
      type: Vo.SEPARATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: gr.AUTO
        },
        children: [new Bu()]
      })]
    });
    this.root.push(A);
    const i = new Zi({
      id: 0,
      type: Vo.CONTINUATION_SEPARATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: gr.AUTO
        },
        children: [new wu()]
      })]
    });
    this.root.push(i);
  }
  createEndnote(A, i) {
    const r = new Zi({
      id: A,
      children: i
    });
    this.root.push(r);
  }
}, pv = class {
  constructor() {
    hA(this, "endnotes", void 0), hA(this, "relationships", void 0), this.endnotes = new dv(), this.relationships = new Et();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, gv = class extends NA {
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
}, wv = class extends Sl {
  constructor(A, i) {
    super("w:ftr", i), hA(this, "refId", void 0), this.refId = A, i || this.root.push(new gv({
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
}, Bv = class {
  constructor(A, i, r) {
    hA(this, "media", void 0), hA(this, "footer", void 0), hA(this, "relationships", void 0), this.media = A, this.footer = new wv(i, r), this.relationships = new Et();
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
}, mv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, vv = class extends mA {
  constructor() {
    super("w:footnoteRef");
  }
}, yv = class extends Vt {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new vv());
  }
}, Wo = {
  SEPERATOR: "separator",
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, $i = class extends mA {
  constructor(A) {
    super("w:footnote"), this.root.push(new mv({
      type: A.type,
      id: A.id
    }));
    for (let i = 0; i < A.children.length; i++) {
      const r = A.children[i];
      i === 0 && r.addRunToFront(new yv()), this.root.push(r);
    }
  }
}, Cv = class extends NA {
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
}, Fv = class extends mA {
  constructor() {
    super("w:footnotes"), this.root.push(new Cv({
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
    const A = new $i({
      id: -1,
      type: Wo.SEPERATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: gr.AUTO
        },
        children: [new Bu()]
      })]
    });
    this.root.push(A);
    const i = new $i({
      id: 0,
      type: Wo.CONTINUATION_SEPERATOR,
      children: [new Le({
        spacing: {
          after: 0,
          line: 240,
          lineRule: gr.AUTO
        },
        children: [new wu()]
      })]
    });
    this.root.push(i);
  }
  createFootNote(A, i) {
    const r = new $i({
      id: A,
      children: i
    });
    this.root.push(r);
  }
}, Ev = class {
  constructor() {
    hA(this, "footnotess", void 0), hA(this, "relationships", void 0), this.footnotess = new Fv(), this.relationships = new Et();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, Qv = class extends NA {
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
}, Uv = class extends Sl {
  constructor(A, i) {
    super("w:hdr", i), hA(this, "refId", void 0), this.refId = A, i || this.root.push(new Qv({
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
}, bv = class {
  constructor(A, i, r) {
    hA(this, "media", void 0), hA(this, "header", void 0), hA(this, "relationships", void 0), this.media = A, this.header = new Uv(i, r), this.relationships = new Et();
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
}, mu = class {
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
}, Iv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}, _v = class extends mA {
  constructor(A) {
    super("w:numFmt"), this.root.push(new ge({ val: A }));
  }
}, xv = class extends mA {
  constructor(A) {
    super("w:lvlText"), this.root.push(new ge({ val: A }));
  }
}, Tv = class extends mA {
  constructor(A) {
    super("w:lvlJc"), this.root.push(new ge({ val: A }));
  }
}, Sv = class extends mA {
  constructor(A) {
    super("w:suff"), this.root.push(new ge({ val: A }));
  }
}, Hv = class extends mA {
  constructor() {
    super("w:isLgl");
  }
}, Lv = class extends mA {
  constructor({ level: A, format: i, text: r, alignment: c = fe.START, start: h = 1, style: f, suffix: s, isLegalNumberingStyle: o }) {
    if (super("w:lvl"), hA(this, "paragraphProperties", void 0), hA(this, "runProperties", void 0), this.root.push(new Vr("w:start", pe(h))), i && this.root.push(new _v(i)), s && this.root.push(new Sv(s)), o && this.root.push(new Hv()), r && this.root.push(new xv(r)), this.root.push(new Tv(c)), f?.style && this.root.push(Pr(f.style)), this.paragraphProperties = new Pt(f && f.paragraph), this.runProperties = new Ft(f && f.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), A > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Iv({
      ilvl: pe(A),
      tentative: 1
    }));
  }
}, Dv = class extends Lv {
}, Rv = class extends mA {
  constructor(A) {
    super("w:multiLevelType"), this.root.push(new ge({ val: A }));
  }
}, Ov = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, Xo = class extends mA {
  constructor(A, i) {
    super("w:abstractNum"), hA(this, "id", void 0), this.root.push(new Ov({
      abstractNumId: pe(A),
      restartNumberingAfterBreak: 0
    })), this.root.push(new Rv("hybridMultilevel")), this.id = A;
    for (const r of i) this.root.push(new Dv(r));
  }
}, Nv = class extends mA {
  constructor(A) {
    super("w:abstractNumId"), this.root.push(new ge({ val: A }));
  }
}, kv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { numId: "w:numId" });
  }
}, jo = class extends mA {
  constructor(A) {
    if (super("w:num"), hA(this, "numId", void 0), hA(this, "reference", void 0), hA(this, "instance", void 0), this.numId = A.numId, this.reference = A.reference, this.instance = A.instance, this.root.push(new kv({ numId: pe(A.numId) })), this.root.push(new Nv(pe(A.abstractNumId))), A.overrideLevels && A.overrideLevels.length) for (const i of A.overrideLevels) this.root.push(new Mv(i.num, i.start));
  }
}, Kv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, Mv = class extends mA {
  constructor(A, i) {
    super("w:lvlOverride"), this.root.push(new Kv({ ilvl: A })), i !== void 0 && this.root.push(new Gv(i));
  }
}, Pv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Gv = class extends mA {
  constructor(A) {
    super("w:startOverride"), this.root.push(new Pv({ val: A }));
  }
}, Vv = class extends mA {
  constructor(A) {
    super("w:numbering"), hA(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), hA(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), hA(this, "referenceConfigMap", /* @__PURE__ */ new Map()), hA(this, "abstractNumUniqueNumericId", Uw()), hA(this, "concreteNumUniqueNumericId", bw()), this.root.push(new ri([
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
    const i = new Xo(this.abstractNumUniqueNumericId(), [
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
    this.concreteNumberingMap.set("default-bullet-numbering", new jo({
      numId: 1,
      abstractNumId: i.id,
      reference: "default-bullet-numbering",
      instance: 0,
      overrideLevels: [{
        num: 0,
        start: 1
      }]
    })), this.abstractNumberingMap.set("default-bullet-numbering", i);
    for (const r of A.config)
      this.abstractNumberingMap.set(r.reference, new Xo(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
  }
  prepForXml(A) {
    for (const i of this.abstractNumberingMap.values()) this.root.push(i);
    for (const i of this.concreteNumberingMap.values()) this.root.push(i);
    return super.prepForXml(A);
  }
  createConcreteNumberingInstance(A, i) {
    const r = this.abstractNumberingMap.get(A);
    if (!r) return;
    const c = `${A}-${i}`;
    if (this.concreteNumberingMap.has(c)) return;
    const h = this.referenceConfigMap.get(A), f = h && h[0].start, s = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: r.id,
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
    this.concreteNumberingMap.set(c, new jo(s));
  }
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}, Wv = (A) => new bA({
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
}), Xv = class extends mA {
  constructor(A) {
    super("w:compat"), A.version && this.root.push(Wv(A.version)), A.useSingleBorderforContiguousCells && this.root.push(new CA("w:useSingleBorderforContiguousCells", A.useSingleBorderforContiguousCells)), A.wordPerfectJustification && this.root.push(new CA("w:wpJustification", A.wordPerfectJustification)), A.noTabStopForHangingIndent && this.root.push(new CA("w:noTabHangInd", A.noTabStopForHangingIndent)), A.noLeading && this.root.push(new CA("w:noLeading", A.noLeading)), A.spaceForUnderline && this.root.push(new CA("w:spaceForUL", A.spaceForUnderline)), A.noColumnBalance && this.root.push(new CA("w:noColumnBalance", A.noColumnBalance)), A.balanceSingleByteDoubleByteWidth && this.root.push(new CA("w:balanceSingleByteDoubleByteWidth", A.balanceSingleByteDoubleByteWidth)), A.noExtraLineSpacing && this.root.push(new CA("w:noExtraLineSpacing", A.noExtraLineSpacing)), A.doNotLeaveBackslashAlone && this.root.push(new CA("w:doNotLeaveBackslashAlone", A.doNotLeaveBackslashAlone)), A.underlineTrailingSpaces && this.root.push(new CA("w:ulTrailSpace", A.underlineTrailingSpaces)), A.doNotExpandShiftReturn && this.root.push(new CA("w:doNotExpandShiftReturn", A.doNotExpandShiftReturn)), A.spacingInWholePoints && this.root.push(new CA("w:spacingInWholePoints", A.spacingInWholePoints)), A.lineWrapLikeWord6 && this.root.push(new CA("w:lineWrapLikeWord6", A.lineWrapLikeWord6)), A.printBodyTextBeforeHeader && this.root.push(new CA("w:printBodyTextBeforeHeader", A.printBodyTextBeforeHeader)), A.printColorsBlack && this.root.push(new CA("w:printColBlack", A.printColorsBlack)), A.spaceWidth && this.root.push(new CA("w:wpSpaceWidth", A.spaceWidth)), A.showBreaksInFrames && this.root.push(new CA("w:showBreaksInFrames", A.showBreaksInFrames)), A.subFontBySize && this.root.push(new CA("w:subFontBySize", A.subFontBySize)), A.suppressBottomSpacing && this.root.push(new CA("w:suppressBottomSpacing", A.suppressBottomSpacing)), A.suppressTopSpacing && this.root.push(new CA("w:suppressTopSpacing", A.suppressTopSpacing)), A.suppressSpacingAtTopOfPage && this.root.push(new CA("w:suppressSpacingAtTopOfPage", A.suppressSpacingAtTopOfPage)), A.suppressTopSpacingWP && this.root.push(new CA("w:suppressTopSpacingWP", A.suppressTopSpacingWP)), A.suppressSpBfAfterPgBrk && this.root.push(new CA("w:suppressSpBfAfterPgBrk", A.suppressSpBfAfterPgBrk)), A.swapBordersFacingPages && this.root.push(new CA("w:swapBordersFacingPages", A.swapBordersFacingPages)), A.convertMailMergeEsc && this.root.push(new CA("w:convMailMergeEsc", A.convertMailMergeEsc)), A.truncateFontHeightsLikeWP6 && this.root.push(new CA("w:truncateFontHeightsLikeWP6", A.truncateFontHeightsLikeWP6)), A.macWordSmallCaps && this.root.push(new CA("w:mwSmallCaps", A.macWordSmallCaps)), A.usePrinterMetrics && this.root.push(new CA("w:usePrinterMetrics", A.usePrinterMetrics)), A.doNotSuppressParagraphBorders && this.root.push(new CA("w:doNotSuppressParagraphBorders", A.doNotSuppressParagraphBorders)), A.wrapTrailSpaces && this.root.push(new CA("w:wrapTrailSpaces", A.wrapTrailSpaces)), A.footnoteLayoutLikeWW8 && this.root.push(new CA("w:footnoteLayoutLikeWW8", A.footnoteLayoutLikeWW8)), A.shapeLayoutLikeWW8 && this.root.push(new CA("w:shapeLayoutLikeWW8", A.shapeLayoutLikeWW8)), A.alignTablesRowByRow && this.root.push(new CA("w:alignTablesRowByRow", A.alignTablesRowByRow)), A.forgetLastTabAlignment && this.root.push(new CA("w:forgetLastTabAlignment", A.forgetLastTabAlignment)), A.adjustLineHeightInTable && this.root.push(new CA("w:adjustLineHeightInTable", A.adjustLineHeightInTable)), A.autoSpaceLikeWord95 && this.root.push(new CA("w:autoSpaceLikeWord95", A.autoSpaceLikeWord95)), A.noSpaceRaiseLower && this.root.push(new CA("w:noSpaceRaiseLower", A.noSpaceRaiseLower)), A.doNotUseHTMLParagraphAutoSpacing && this.root.push(new CA("w:doNotUseHTMLParagraphAutoSpacing", A.doNotUseHTMLParagraphAutoSpacing)), A.layoutRawTableWidth && this.root.push(new CA("w:layoutRawTableWidth", A.layoutRawTableWidth)), A.layoutTableRowsApart && this.root.push(new CA("w:layoutTableRowsApart", A.layoutTableRowsApart)), A.useWord97LineBreakRules && this.root.push(new CA("w:useWord97LineBreakRules", A.useWord97LineBreakRules)), A.doNotBreakWrappedTables && this.root.push(new CA("w:doNotBreakWrappedTables", A.doNotBreakWrappedTables)), A.doNotSnapToGridInCell && this.root.push(new CA("w:doNotSnapToGridInCell", A.doNotSnapToGridInCell)), A.selectFieldWithFirstOrLastCharacter && this.root.push(new CA("w:selectFldWithFirstOrLastChar", A.selectFieldWithFirstOrLastCharacter)), A.applyBreakingRules && this.root.push(new CA("w:applyBreakingRules", A.applyBreakingRules)), A.doNotWrapTextWithPunctuation && this.root.push(new CA("w:doNotWrapTextWithPunct", A.doNotWrapTextWithPunctuation)), A.doNotUseEastAsianBreakRules && this.root.push(new CA("w:doNotUseEastAsianBreakRules", A.doNotUseEastAsianBreakRules)), A.useWord2002TableStyleRules && this.root.push(new CA("w:useWord2002TableStyleRules", A.useWord2002TableStyleRules)), A.growAutofit && this.root.push(new CA("w:growAutofit", A.growAutofit)), A.useFELayout && this.root.push(new CA("w:useFELayout", A.useFELayout)), A.useNormalStyleForList && this.root.push(new CA("w:useNormalStyleForList", A.useNormalStyleForList)), A.doNotUseIndentAsNumberingTabStop && this.root.push(new CA("w:doNotUseIndentAsNumberingTabStop", A.doNotUseIndentAsNumberingTabStop)), A.useAlternateEastAsianLineBreakRules && this.root.push(new CA("w:useAltKinsokuLineBreakRules", A.useAlternateEastAsianLineBreakRules)), A.allowSpaceOfSameStyleInTable && this.root.push(new CA("w:allowSpaceOfSameStyleInTable", A.allowSpaceOfSameStyleInTable)), A.doNotSuppressIndentation && this.root.push(new CA("w:doNotSuppressIndentation", A.doNotSuppressIndentation)), A.doNotAutofitConstrainedTables && this.root.push(new CA("w:doNotAutofitConstrainedTables", A.doNotAutofitConstrainedTables)), A.autofitToFirstFixedWidthCell && this.root.push(new CA("w:autofitToFirstFixedWidthCell", A.autofitToFirstFixedWidthCell)), A.underlineTabInNumberingList && this.root.push(new CA("w:underlineTabInNumList", A.underlineTabInNumberingList)), A.displayHangulFixedWidth && this.root.push(new CA("w:displayHangulFixedWidth", A.displayHangulFixedWidth)), A.splitPgBreakAndParaMark && this.root.push(new CA("w:splitPgBreakAndParaMark", A.splitPgBreakAndParaMark)), A.doNotVerticallyAlignCellWithSp && this.root.push(new CA("w:doNotVertAlignCellWithSp", A.doNotVerticallyAlignCellWithSp)), A.doNotBreakConstrainedForcedTable && this.root.push(new CA("w:doNotBreakConstrainedForcedTable", A.doNotBreakConstrainedForcedTable)), A.ignoreVerticalAlignmentInTextboxes && this.root.push(new CA("w:doNotVertAlignInTxbx", A.ignoreVerticalAlignmentInTextboxes)), A.useAnsiKerningPairs && this.root.push(new CA("w:useAnsiKerningPairs", A.useAnsiKerningPairs)), A.cachedColumnBalance && this.root.push(new CA("w:cachedColBalance", A.cachedColumnBalance));
  }
}, jv = class extends NA {
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
}, zv = class extends mA {
  constructor(A) {
    var i, r, c, h, f, s, o, d;
    super("w:settings"), this.root.push(new jv({
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
    })), this.root.push(new CA("w:displayBackgroundShape", !0)), A.trackRevisions !== void 0 && this.root.push(new CA("w:trackRevisions", A.trackRevisions)), A.evenAndOddHeaders !== void 0 && this.root.push(new CA("w:evenAndOddHeaders", A.evenAndOddHeaders)), A.updateFields !== void 0 && this.root.push(new CA("w:updateFields", A.updateFields)), A.defaultTabStop !== void 0 && this.root.push(new Vr("w:defaultTabStop", A.defaultTabStop)), ((i = A.hyphenation) === null || i === void 0 ? void 0 : i.autoHyphenation) !== void 0 && this.root.push(new CA("w:autoHyphenation", A.hyphenation.autoHyphenation)), ((r = A.hyphenation) === null || r === void 0 ? void 0 : r.hyphenationZone) !== void 0 && this.root.push(new Vr("w:hyphenationZone", A.hyphenation.hyphenationZone)), ((c = A.hyphenation) === null || c === void 0 ? void 0 : c.consecutiveHyphenLimit) !== void 0 && this.root.push(new Vr("w:consecutiveHyphenLimit", A.hyphenation.consecutiveHyphenLimit)), ((h = A.hyphenation) === null || h === void 0 ? void 0 : h.doNotHyphenateCaps) !== void 0 && this.root.push(new CA("w:doNotHyphenateCaps", A.hyphenation.doNotHyphenateCaps)), this.root.push(new Xv(UA(UA({}, (f = A.compatibility) !== null && f !== void 0 ? f : {}), {}, { version: (s = (o = (d = A.compatibility) === null || d === void 0 ? void 0 : d.version) !== null && o !== void 0 ? o : A.compatibilityModeVersion) !== null && s !== void 0 ? s : 15 })));
  }
}, vu = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", { val: "w:val" });
  }
}, Jv = class extends mA {
  constructor(A) {
    super("w:name"), this.root.push(new vu({ val: A }));
  }
}, Yv = class extends mA {
  constructor(A) {
    super("w:uiPriority"), this.root.push(new vu({ val: pe(A) }));
  }
}, qv = class extends NA {
  constructor(...A) {
    super(...A), hA(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, yu = class extends mA {
  constructor(A, i) {
    super("w:style"), this.root.push(new qv(A)), i.name && this.root.push(new Jv(i.name)), i.basedOn && this.root.push(new Mt("w:basedOn", i.basedOn)), i.next && this.root.push(new Mt("w:next", i.next)), i.link && this.root.push(new Mt("w:link", i.link)), i.uiPriority !== void 0 && this.root.push(new Yv(i.uiPriority)), i.semiHidden !== void 0 && this.root.push(new CA("w:semiHidden", i.semiHidden)), i.unhideWhenUsed !== void 0 && this.root.push(new CA("w:unhideWhenUsed", i.unhideWhenUsed)), i.quickFormat !== void 0 && this.root.push(new CA("w:qFormat", i.quickFormat));
  }
}, qr = class extends yu {
  constructor(A) {
    super({
      type: "paragraph",
      styleId: A.id
    }, A), hA(this, "paragraphProperties", void 0), hA(this, "runProperties", void 0), this.paragraphProperties = new Pt(A.paragraph), this.runProperties = new Ft(A.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, vr = class extends yu {
  constructor(A) {
    super({
      type: "character",
      styleId: A.id
    }, UA({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, A)), hA(this, "runProperties", void 0), this.runProperties = new Ft(A.run), this.root.push(this.runProperties);
  }
}, Qt = class extends qr {
  constructor(A) {
    super(UA({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, A));
  }
}, Zv = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Title",
      name: "Title"
    }, A));
  }
}, $v = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading1",
      name: "Heading 1"
    }, A));
  }
}, A0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading2",
      name: "Heading 2"
    }, A));
  }
}, e0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading3",
      name: "Heading 3"
    }, A));
  }
}, t0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading4",
      name: "Heading 4"
    }, A));
  }
}, r0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading5",
      name: "Heading 5"
    }, A));
  }
}, n0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Heading6",
      name: "Heading 6"
    }, A));
  }
}, i0 = class extends Qt {
  constructor(A) {
    super(UA({
      id: "Strong",
      name: "Strong"
    }, A));
  }
}, a0 = class extends qr {
  constructor(A) {
    super(UA({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, A));
  }
}, s0 = class extends qr {
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
        lineRule: gr.AUTO
      } },
      run: { size: 20 }
    }, A));
  }
}, o0 = class extends vr {
  constructor(A) {
    super(UA({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, A));
  }
}, l0 = class extends vr {
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
}, u0 = class extends qr {
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
        lineRule: gr.AUTO
      } },
      run: { size: 20 }
    }, A));
  }
}, c0 = class extends vr {
  constructor(A) {
    super(UA({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, A));
  }
}, h0 = class extends vr {
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
}, f0 = class extends vr {
  constructor(A) {
    super(UA({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: Nl.SINGLE }
      }
    }, A));
  }
}, Aa = class extends mA {
  constructor(A) {
    if (super("w:styles"), A.initialStyles && this.root.push(A.initialStyles), A.importedStyles) for (const i of A.importedStyles) this.root.push(i);
    if (A.paragraphStyles) for (const i of A.paragraphStyles) this.root.push(new qr(i));
    if (A.characterStyles) for (const i of A.characterStyles) this.root.push(new vr(i));
  }
}, d0 = class extends mA {
  constructor(A) {
    super("w:pPrDefault"), this.root.push(new Pt(A));
  }
}, p0 = class extends mA {
  constructor(A) {
    super("w:rPrDefault"), this.root.push(new Ft(A));
  }
}, g0 = class extends mA {
  constructor(A) {
    super("w:docDefaults"), hA(this, "runPropertiesDefaults", void 0), hA(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new p0(A.run), this.paragraphPropertiesDefaults = new d0(A.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, w0 = class {
  newInstance(A) {
    const i = (0, Zn.xml2js)(A, { compact: !1 });
    let r;
    for (const h of i.elements || []) h.name === "w:styles" && (r = h);
    if (r === void 0) throw new Error("can not find styles element");
    const c = r.elements || [];
    return {
      initialStyles: new Mg(r.attributes),
      importedStyles: c.map((h) => Ia(h))
    };
  }
}, ea = class {
  newInstance(A = {}) {
    var i;
    return {
      initialStyles: new ri([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: [
        new g0((i = A.document) !== null && i !== void 0 ? i : {}),
        new Zv(UA({ run: { size: 56 } }, A.title)),
        new $v(UA({ run: {
          color: "2E74B5",
          size: 32
        } }, A.heading1)),
        new A0(UA({ run: {
          color: "2E74B5",
          size: 26
        } }, A.heading2)),
        new e0(UA({ run: {
          color: "1F4D78",
          size: 24
        } }, A.heading3)),
        new t0(UA({ run: {
          color: "2E74B5",
          italics: !0
        } }, A.heading4)),
        new r0(UA({ run: { color: "2E74B5" } }, A.heading5)),
        new n0(UA({ run: { color: "1F4D78" } }, A.heading6)),
        new i0(UA({ run: { bold: !0 } }, A.strong)),
        new a0(A.listParagraph || {}),
        new f0(A.hyperlink || {}),
        new o0(A.footnoteReference || {}),
        new s0(A.footnoteText || {}),
        new l0(A.footnoteTextChar || {}),
        new c0(A.endnoteReference || {}),
        new u0(A.endnoteText || {}),
        new h0(A.endnoteTextChar || {})
      ]
    };
  }
}, B0 = class {
  constructor(A) {
    var i, r, c, h, f, s, o, d, U, F, B, _;
    if (hA(this, "currentRelationshipId", 1), hA(this, "documentWrapper", void 0), hA(this, "headers", []), hA(this, "footers", []), hA(this, "coreProperties", void 0), hA(this, "numbering", void 0), hA(this, "media", void 0), hA(this, "fileRelationships", void 0), hA(this, "footnotesWrapper", void 0), hA(this, "endnotesWrapper", void 0), hA(this, "settings", void 0), hA(this, "contentTypes", void 0), hA(this, "customProperties", void 0), hA(this, "appProperties", void 0), hA(this, "styles", void 0), hA(this, "comments", void 0), hA(this, "commentsExtended", void 0), hA(this, "fontWrapper", void 0), this.coreProperties = new Km(UA(UA({}, A), {}, {
      creator: (i = A.creator) !== null && i !== void 0 ? i : "Un-named",
      revision: (r = A.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (c = A.lastModifiedBy) !== null && c !== void 0 ? c : "Un-named"
    })), this.numbering = new Vv(A.numbering ? A.numbering : { config: [] }), this.comments = new RB((h = A.comments) !== null && h !== void 0 ? h : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new KB(this.comments.ThreadData)), this.fileRelationships = new Et(), this.customProperties = new Xm((f = A.customProperties) !== null && f !== void 0 ? f : []), this.appProperties = new Om(), this.footnotesWrapper = new Ev(), this.endnotesWrapper = new pv(), this.contentTypes = new km(), this.documentWrapper = new ov({ background: A.background }), this.settings = new zv({
      compatibilityModeVersion: A.compatabilityModeVersion,
      compatibility: A.compatibility,
      evenAndOddHeaders: !!A.evenAndOddHeaderAndFooters,
      trackRevisions: (s = A.features) === null || s === void 0 ? void 0 : s.trackRevisions,
      updateFields: (o = A.features) === null || o === void 0 ? void 0 : o.updateFields,
      defaultTabStop: A.defaultTabStop,
      hyphenation: {
        autoHyphenation: (d = A.hyphenation) === null || d === void 0 ? void 0 : d.autoHyphenation,
        hyphenationZone: (U = A.hyphenation) === null || U === void 0 ? void 0 : U.hyphenationZone,
        consecutiveHyphenLimit: (F = A.hyphenation) === null || F === void 0 ? void 0 : F.consecutiveHyphenLimit,
        doNotHyphenateCaps: (B = A.hyphenation) === null || B === void 0 ? void 0 : B.doNotHyphenateCaps
      }
    }), this.media = new mu(), A.externalStyles !== void 0) {
      var E;
      const v = new ea().newInstance((E = A.styles) === null || E === void 0 ? void 0 : E.default), w = new w0().newInstance(A.externalStyles);
      this.styles = new Aa(UA(UA({}, w), {}, { importedStyles: [...v.importedStyles, ...w.importedStyles] }));
    } else if (A.styles) {
      const v = new ea().newInstance(A.styles.default);
      this.styles = new Aa(UA(UA({}, v), A.styles));
    } else {
      const v = new ea();
      this.styles = new Aa(v.newInstance());
    }
    this.addDefaultRelationships();
    for (const v of A.sections) this.addSection(v);
    if (A.footnotes) for (const v in A.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(v), A.footnotes[v].children);
    if (A.endnotes) for (const v in A.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(v), A.endnotes[v].children);
    this.fontWrapper = new ru((_ = A.fonts) !== null && _ !== void 0 ? _ : []);
  }
  addSection({ headers: A = {}, footers: i = {}, children: r, properties: c }) {
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
    for (const h of r) this.documentWrapper.View.add(h);
  }
  createHeader(A) {
    const i = new bv(this.media, this.currentRelationshipId++);
    for (const r of A.options.children) i.add(r);
    return this.addHeaderToDocument(i), i;
  }
  createFooter(A) {
    const i = new Bv(this.media, this.currentRelationshipId++);
    for (const r of A.options.children) i.add(r);
    return this.addFooterToDocument(i), i;
  }
  addHeaderToDocument(A, i = lr.DEFAULT) {
    this.headers.push({
      header: A,
      type: i
    }), this.documentWrapper.Relationships.addRelationship(A.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(A, i = lr.DEFAULT) {
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
}, m0 = /* @__PURE__ */ FA(((A, i) => {
  wr(), Ct(), (function(r) {
    typeof A == "object" && typeof i < "u" ? i.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof me < "u" ? me : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(c, h, f) {
      function s(U, F) {
        if (!h[U]) {
          if (!c[U]) {
            var B = typeof Dn == "function" && Dn;
            if (!F && B) return B(U, !0);
            if (o) return o(U, !0);
            var _ = /* @__PURE__ */ new Error("Cannot find module '" + U + "'");
            throw _.code = "MODULE_NOT_FOUND", _;
          }
          var E = h[U] = { exports: {} };
          c[U][0].call(E.exports, function(v) {
            var w = c[U][1][v];
            return s(w || v);
          }, E, E.exports, r, c, h, f);
        }
        return h[U].exports;
      }
      for (var o = typeof Dn == "function" && Dn, d = 0; d < f.length; d++) s(f[d]);
      return s;
    })({
      1: [function(r, c, h) {
        "use strict";
        var f = r("./utils"), s = r("./support"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        h.encode = function(d) {
          for (var U, F, B, _, E, v, w, b = [], T = 0, x = d.length, N = x, R = f.getTypeOf(d) !== "string"; T < d.length; ) N = x - T, B = R ? (U = d[T++], F = T < x ? d[T++] : 0, T < x ? d[T++] : 0) : (U = d.charCodeAt(T++), F = T < x ? d.charCodeAt(T++) : 0, T < x ? d.charCodeAt(T++) : 0), _ = U >> 2, E = (3 & U) << 4 | F >> 4, v = 1 < N ? (15 & F) << 2 | B >> 6 : 64, w = 2 < N ? 63 & B : 64, b.push(o.charAt(_) + o.charAt(E) + o.charAt(v) + o.charAt(w));
          return b.join("");
        }, h.decode = function(d) {
          var U, F, B, _, E, v, w = 0, b = 0, T = "data:";
          if (d.substr(0, T.length) === T) throw new Error("Invalid base64 input, it looks like a data url.");
          var x, N = 3 * (d = d.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (d.charAt(d.length - 1) === o.charAt(64) && N--, d.charAt(d.length - 2) === o.charAt(64) && N--, N % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (x = s.uint8array ? new Uint8Array(0 | N) : new Array(0 | N); w < d.length; ) U = o.indexOf(d.charAt(w++)) << 2 | (_ = o.indexOf(d.charAt(w++))) >> 4, F = (15 & _) << 4 | (E = o.indexOf(d.charAt(w++))) >> 2, B = (3 & E) << 6 | (v = o.indexOf(d.charAt(w++))), x[b++] = U, E !== 64 && (x[b++] = F), v !== 64 && (x[b++] = B);
          return x;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, c, h) {
        "use strict";
        var f = r("./external"), s = r("./stream/DataWorker"), o = r("./stream/Crc32Probe"), d = r("./stream/DataLengthProbe");
        function U(F, B, _, E, v) {
          this.compressedSize = F, this.uncompressedSize = B, this.crc32 = _, this.compression = E, this.compressedContent = v;
        }
        U.prototype = {
          getContentWorker: function() {
            var F = new s(f.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")), B = this;
            return F.on("end", function() {
              if (this.streamInfo.data_length !== B.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), F;
          },
          getCompressedWorker: function() {
            return new s(f.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, U.createWorkerFrom = function(F, B, _) {
          return F.pipe(new o()).pipe(new d("uncompressedSize")).pipe(B.compressWorker(_)).pipe(new d("compressedSize")).withStreamInfo("compression", B);
        }, c.exports = U;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, c, h) {
        "use strict";
        var f = r("./stream/GenericWorker");
        h.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new f("STORE compression");
          },
          uncompressWorker: function() {
            return new f("STORE decompression");
          }
        }, h.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, c, h) {
        "use strict";
        var f = r("./utils"), s = (function() {
          for (var o, d = [], U = 0; U < 256; U++) {
            o = U;
            for (var F = 0; F < 8; F++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
            d[U] = o;
          }
          return d;
        })();
        c.exports = function(o, d) {
          return o !== void 0 && o.length ? f.getTypeOf(o) !== "string" ? (function(U, F, B, _) {
            var E = s, v = _ + B;
            U ^= -1;
            for (var w = _; w < v; w++) U = U >>> 8 ^ E[255 & (U ^ F[w])];
            return -1 ^ U;
          })(0 | d, o, o.length, 0) : (function(U, F, B, _) {
            var E = s, v = _ + B;
            U ^= -1;
            for (var w = _; w < v; w++) U = U >>> 8 ^ E[255 & (U ^ F.charCodeAt(w))];
            return -1 ^ U;
          })(0 | d, o, o.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, c, h) {
        "use strict";
        h.base64 = !1, h.binary = !1, h.dir = !1, h.createFolders = !0, h.date = null, h.compression = null, h.compressionOptions = null, h.comment = null, h.unixPermissions = null, h.dosPermissions = null;
      }, {}],
      6: [function(r, c, h) {
        "use strict";
        var f = null;
        f = typeof Promise < "u" ? Promise : r("lie"), c.exports = { Promise: f };
      }, { lie: 37 }],
      7: [function(r, c, h) {
        "use strict";
        var f = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = r("pako"), o = r("./utils"), d = r("./stream/GenericWorker"), U = f ? "uint8array" : "array";
        function F(B, _) {
          d.call(this, "FlateWorker/" + B), this._pako = null, this._pakoAction = B, this._pakoOptions = _, this.meta = {};
        }
        h.magic = "\b\0", o.inherits(F, d), F.prototype.processChunk = function(B) {
          this.meta = B.meta, this._pako === null && this._createPako(), this._pako.push(o.transformTo(U, B.data), !1);
        }, F.prototype.flush = function() {
          d.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, F.prototype.cleanUp = function() {
          d.prototype.cleanUp.call(this), this._pako = null;
        }, F.prototype._createPako = function() {
          this._pako = new s[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var B = this;
          this._pako.onData = function(_) {
            B.push({
              data: _,
              meta: B.meta
            });
          };
        }, h.compressWorker = function(B) {
          return new F("Deflate", B);
        }, h.uncompressWorker = function() {
          return new F("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, c, h) {
        "use strict";
        function f(E, v) {
          var w, b = "";
          for (w = 0; w < v; w++) b += String.fromCharCode(255 & E), E >>>= 8;
          return b;
        }
        function s(E, v, w, b, T, x) {
          var N, R, C = E.file, g = E.compression, O = x !== U.utf8encode, M = o.transformTo("string", x(C.name)), I = o.transformTo("string", U.utf8encode(C.name)), Z = C.comment, uA = o.transformTo("string", x(Z)), k = o.transformTo("string", U.utf8encode(Z)), q = I.length !== C.name.length, L = k.length !== Z.length, $ = "", lA = "", rA = "", vA = C.dir, aA = C.date, dA = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          v && !w || (dA.crc32 = E.crc32, dA.compressedSize = E.compressedSize, dA.uncompressedSize = E.uncompressedSize);
          var tA = 0;
          v && (tA |= 8), O || !q && !L || (tA |= 2048);
          var G = 0, iA = 0;
          vA && (G |= 16), T === "UNIX" ? (iA = 798, G |= (function(fA, _A) {
            var H = fA;
            return fA || (H = _A ? 16893 : 33204), (65535 & H) << 16;
          })(C.unixPermissions, vA)) : (iA = 20, G |= (function(fA) {
            return 63 & (fA || 0);
          })(C.dosPermissions)), N = aA.getUTCHours(), N <<= 6, N |= aA.getUTCMinutes(), N <<= 5, N |= aA.getUTCSeconds() / 2, R = aA.getUTCFullYear() - 1980, R <<= 4, R |= aA.getUTCMonth() + 1, R <<= 5, R |= aA.getUTCDate(), q && (lA = f(1, 1) + f(F(M), 4) + I, $ += "up" + f(lA.length, 2) + lA), L && (rA = f(1, 1) + f(F(uA), 4) + k, $ += "uc" + f(rA.length, 2) + rA);
          var sA = "";
          return sA += `
\0`, sA += f(tA, 2), sA += g.magic, sA += f(N, 2), sA += f(R, 2), sA += f(dA.crc32, 4), sA += f(dA.compressedSize, 4), sA += f(dA.uncompressedSize, 4), sA += f(M.length, 2), sA += f($.length, 2), {
            fileRecord: B.LOCAL_FILE_HEADER + sA + M + $,
            dirRecord: B.CENTRAL_FILE_HEADER + f(iA, 2) + sA + f(uA.length, 2) + "\0\0\0\0" + f(G, 4) + f(b, 4) + M + $ + uA
          };
        }
        var o = r("../utils"), d = r("../stream/GenericWorker"), U = r("../utf8"), F = r("../crc32"), B = r("../signature");
        function _(E, v, w, b) {
          d.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = v, this.zipPlatform = w, this.encodeFileName = b, this.streamFiles = E, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        o.inherits(_, d), _.prototype.push = function(E) {
          var v = E.meta.percent || 0, w = this.entriesCount, b = this._sources.length;
          this.accumulate ? this.contentBuffer.push(E) : (this.bytesWritten += E.data.length, d.prototype.push.call(this, {
            data: E.data,
            meta: {
              currentFile: this.currentFile,
              percent: w ? (v + 100 * (w - b - 1)) / w : 100
            }
          }));
        }, _.prototype.openedSource = function(E) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = E.file.name;
          var v = this.streamFiles && !E.file.dir;
          if (v) {
            var w = s(E, v, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: w.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, _.prototype.closedSource = function(E) {
          this.accumulate = !1;
          var v = this.streamFiles && !E.file.dir, w = s(E, v, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(w.dirRecord), v) this.push({
            data: (function(b) {
              return B.DATA_DESCRIPTOR + f(b.crc32, 4) + f(b.compressedSize, 4) + f(b.uncompressedSize, 4);
            })(E),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: w.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, _.prototype.flush = function() {
          for (var E = this.bytesWritten, v = 0; v < this.dirRecords.length; v++) this.push({
            data: this.dirRecords[v],
            meta: { percent: 100 }
          });
          var w = this.bytesWritten - E, b = (function(T, x, N, R, C) {
            var g = o.transformTo("string", C(R));
            return B.CENTRAL_DIRECTORY_END + "\0\0\0\0" + f(T, 2) + f(T, 2) + f(x, 4) + f(N, 4) + f(g.length, 2) + g;
          })(this.dirRecords.length, w, E, this.zipComment, this.encodeFileName);
          this.push({
            data: b,
            meta: { percent: 100 }
          });
        }, _.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, _.prototype.registerPrevious = function(E) {
          this._sources.push(E);
          var v = this;
          return E.on("data", function(w) {
            v.processChunk(w);
          }), E.on("end", function() {
            v.closedSource(v.previous.streamInfo), v._sources.length ? v.prepareNextSource() : v.end();
          }), E.on("error", function(w) {
            v.error(w);
          }), this;
        }, _.prototype.resume = function() {
          return !!d.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, _.prototype.error = function(E) {
          var v = this._sources;
          if (!d.prototype.error.call(this, E)) return !1;
          for (var w = 0; w < v.length; w++) try {
            v[w].error(E);
          } catch {
          }
          return !0;
        }, _.prototype.lock = function() {
          d.prototype.lock.call(this);
          for (var E = this._sources, v = 0; v < E.length; v++) E[v].lock();
        }, c.exports = _;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, c, h) {
        "use strict";
        var f = r("../compressions"), s = r("./ZipFileWorker");
        h.generateWorker = function(o, d, U) {
          var F = new s(d.streamFiles, U, d.platform, d.encodeFileName), B = 0;
          try {
            o.forEach(function(_, E) {
              B++;
              var v = (function(x, N) {
                var R = x || N, C = f[R];
                if (!C) throw new Error(R + " is not a valid compression method !");
                return C;
              })(E.options.compression, d.compression), w = E.options.compressionOptions || d.compressionOptions || {}, b = E.dir, T = E.date;
              E._compressWorker(v, w).withStreamInfo("file", {
                name: _,
                dir: b,
                date: T,
                comment: E.comment || "",
                unixPermissions: E.unixPermissions,
                dosPermissions: E.dosPermissions
              }).pipe(F);
            }), F.entriesCount = B;
          } catch (_) {
            F.error(_);
          }
          return F;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(r, c, h) {
        "use strict";
        function f() {
          if (!(this instanceof f)) return new f();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var s = new f();
            for (var o in this) typeof this[o] != "function" && (s[o] = this[o]);
            return s;
          };
        }
        (f.prototype = r("./object")).loadAsync = r("./load"), f.support = r("./support"), f.defaults = r("./defaults"), f.version = "3.10.1", f.loadAsync = function(s, o) {
          return new f().loadAsync(s, o);
        }, f.external = r("./external"), c.exports = f;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(r, c, h) {
        "use strict";
        var f = r("./utils"), s = r("./external"), o = r("./utf8"), d = r("./zipEntries"), U = r("./stream/Crc32Probe"), F = r("./nodejsUtils");
        function B(_) {
          return new s.Promise(function(E, v) {
            var w = _.decompressed.getContentWorker().pipe(new U());
            w.on("error", function(b) {
              v(b);
            }).on("end", function() {
              w.streamInfo.crc32 !== _.decompressed.crc32 ? v(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : E();
            }).resume();
          });
        }
        c.exports = function(_, E) {
          var v = this;
          return E = f.extend(E || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: o.utf8decode
          }), F.isNode && F.isStream(_) ? s.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : f.prepareContent("the loaded zip file", _, !0, E.optimizedBinaryString, E.base64).then(function(w) {
            var b = new d(E);
            return b.load(w), b;
          }).then(function(w) {
            var b = [s.Promise.resolve(w)], T = w.files;
            if (E.checkCRC32) for (var x = 0; x < T.length; x++) b.push(B(T[x]));
            return s.Promise.all(b);
          }).then(function(w) {
            for (var b = w.shift(), T = b.files, x = 0; x < T.length; x++) {
              var N = T[x], R = N.fileNameStr, C = f.resolve(N.fileNameStr);
              v.file(C, N.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: N.date,
                dir: N.dir,
                comment: N.fileCommentStr.length ? N.fileCommentStr : null,
                unixPermissions: N.unixPermissions,
                dosPermissions: N.dosPermissions,
                createFolders: E.createFolders
              }), N.dir || (v.file(C).unsafeOriginalName = R);
            }
            return b.zipComment.length && (v.comment = b.zipComment), v;
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
      12: [function(r, c, h) {
        "use strict";
        var f = r("../utils"), s = r("../stream/GenericWorker");
        function o(d, U) {
          s.call(this, "Nodejs stream input adapter for " + d), this._upstreamEnded = !1, this._bindStream(U);
        }
        f.inherits(o, s), o.prototype._bindStream = function(d) {
          var U = this;
          (this._stream = d).pause(), d.on("data", function(F) {
            U.push({
              data: F,
              meta: { percent: 0 }
            });
          }).on("error", function(F) {
            U.isPaused ? this.generatedError = F : U.error(F);
          }).on("end", function() {
            U.isPaused ? U._upstreamEnded = !0 : U.end();
          });
        }, o.prototype.pause = function() {
          return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, o.prototype.resume = function() {
          return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, c.exports = o;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(r, c, h) {
        "use strict";
        var f = r("readable-stream").Readable;
        function s(o, d, U) {
          f.call(this, d), this._helper = o;
          var F = this;
          o.on("data", function(B, _) {
            F.push(B) || F._helper.pause(), U && U(_);
          }).on("error", function(B) {
            F.emit("error", B);
          }).on("end", function() {
            F.push(null);
          });
        }
        r("../utils").inherits(s, f), s.prototype._read = function() {
          this._helper.resume();
        }, c.exports = s;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(r, c, h) {
        "use strict";
        c.exports = {
          isNode: typeof Buffer < "u",
          newBufferFrom: function(f, s) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(f, s);
            if (typeof f == "number") throw new Error('The "data" argument must not be a number');
            return new Buffer(f, s);
          },
          allocBuffer: function(f) {
            if (Buffer.alloc) return Buffer.alloc(f);
            var s = new Buffer(f);
            return s.fill(0), s;
          },
          isBuffer: function(f) {
            return Buffer.isBuffer(f);
          },
          isStream: function(f) {
            return f && typeof f.on == "function" && typeof f.pause == "function" && typeof f.resume == "function";
          }
        };
      }, {}],
      15: [function(r, c, h) {
        "use strict";
        function f(R, C, g) {
          var O, M = o.getTypeOf(C), I = o.extend(g || {}, F);
          I.date = I.date || /* @__PURE__ */ new Date(), I.compression !== null && (I.compression = I.compression.toUpperCase()), typeof I.unixPermissions == "string" && (I.unixPermissions = parseInt(I.unixPermissions, 8)), I.unixPermissions && 16384 & I.unixPermissions && (I.dir = !0), I.dosPermissions && 16 & I.dosPermissions && (I.dir = !0), I.dir && (R = T(R)), I.createFolders && (O = b(R)) && x.call(this, O, !0);
          var Z = M === "string" && I.binary === !1 && I.base64 === !1;
          g && g.binary !== void 0 || (I.binary = !Z), (C instanceof B && C.uncompressedSize === 0 || I.dir || !C || C.length === 0) && (I.base64 = !1, I.binary = !0, C = "", I.compression = "STORE", M = "string");
          var uA = null;
          uA = C instanceof B || C instanceof d ? C : v.isNode && v.isStream(C) ? new w(R, C) : o.prepareContent(R, C, I.binary, I.optimizedBinaryString, I.base64);
          var k = new _(R, uA, I);
          this.files[R] = k;
        }
        var s = r("./utf8"), o = r("./utils"), d = r("./stream/GenericWorker"), U = r("./stream/StreamHelper"), F = r("./defaults"), B = r("./compressedObject"), _ = r("./zipObject"), E = r("./generate"), v = r("./nodejsUtils"), w = r("./nodejs/NodejsStreamInputAdapter"), b = function(R) {
          R.slice(-1) === "/" && (R = R.substring(0, R.length - 1));
          var C = R.lastIndexOf("/");
          return 0 < C ? R.substring(0, C) : "";
        }, T = function(R) {
          return R.slice(-1) !== "/" && (R += "/"), R;
        }, x = function(R, C) {
          return C = C !== void 0 ? C : F.createFolders, R = T(R), this.files[R] || f.call(this, R, null, {
            dir: !0,
            createFolders: C
          }), this.files[R];
        };
        function N(R) {
          return Object.prototype.toString.call(R) === "[object RegExp]";
        }
        c.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(R) {
            var C, g, O;
            for (C in this.files) O = this.files[C], (g = C.slice(this.root.length, C.length)) && C.slice(0, this.root.length) === this.root && R(g, O);
          },
          filter: function(R) {
            var C = [];
            return this.forEach(function(g, O) {
              R(g, O) && C.push(O);
            }), C;
          },
          file: function(R, C, g) {
            if (arguments.length !== 1) return R = this.root + R, f.call(this, R, C, g), this;
            if (N(R)) {
              var O = R;
              return this.filter(function(I, Z) {
                return !Z.dir && O.test(I);
              });
            }
            var M = this.files[this.root + R];
            return M && !M.dir ? M : null;
          },
          folder: function(R) {
            if (!R) return this;
            if (N(R)) return this.filter(function(M, I) {
              return I.dir && R.test(M);
            });
            var C = this.root + R, g = x.call(this, C), O = this.clone();
            return O.root = g.name, O;
          },
          remove: function(R) {
            R = this.root + R;
            var C = this.files[R];
            if (C || (R.slice(-1) !== "/" && (R += "/"), C = this.files[R]), C && !C.dir) delete this.files[R];
            else for (var g = this.filter(function(M, I) {
              return I.name.slice(0, R.length) === R;
            }), O = 0; O < g.length; O++) delete this.files[g[O].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(R) {
            var C, g = {};
            try {
              if ((g = o.extend(R || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: s.utf8encode
              })).type = g.type.toLowerCase(), g.compression = g.compression.toUpperCase(), g.type === "binarystring" && (g.type = "string"), !g.type) throw new Error("No output type specified.");
              o.checkSupport(g.type), g.platform !== "darwin" && g.platform !== "freebsd" && g.platform !== "linux" && g.platform !== "sunos" || (g.platform = "UNIX"), g.platform === "win32" && (g.platform = "DOS");
              var O = g.comment || this.comment || "";
              C = E.generateWorker(this, g, O);
            } catch (M) {
              (C = new d("error")).error(M);
            }
            return new U(C, g.type || "string", g.mimeType);
          },
          generateAsync: function(R, C) {
            return this.generateInternalStream(R).accumulate(C);
          },
          generateNodeStream: function(R, C) {
            return (R = R || {}).type || (R.type = "nodebuffer"), this.generateInternalStream(R).toNodejsStream(C);
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
      16: [function(r, c, h) {
        "use strict";
        c.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, c, h) {
        "use strict";
        var f = r("./DataReader");
        function s(o) {
          f.call(this, o);
          for (var d = 0; d < this.data.length; d++) o[d] = 255 & o[d];
        }
        r("../utils").inherits(s, f), s.prototype.byteAt = function(o) {
          return this.data[this.zero + o];
        }, s.prototype.lastIndexOfSignature = function(o) {
          for (var d = o.charCodeAt(0), U = o.charCodeAt(1), F = o.charCodeAt(2), B = o.charCodeAt(3), _ = this.length - 4; 0 <= _; --_) if (this.data[_] === d && this.data[_ + 1] === U && this.data[_ + 2] === F && this.data[_ + 3] === B) return _ - this.zero;
          return -1;
        }, s.prototype.readAndCheckSignature = function(o) {
          var d = o.charCodeAt(0), U = o.charCodeAt(1), F = o.charCodeAt(2), B = o.charCodeAt(3), _ = this.readData(4);
          return d === _[0] && U === _[1] && F === _[2] && B === _[3];
        }, s.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return [];
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = s;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, c, h) {
        "use strict";
        var f = r("../utils");
        function s(o) {
          this.data = o, this.length = o.length, this.index = 0, this.zero = 0;
        }
        s.prototype = {
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
        }, c.exports = s;
      }, { "../utils": 32 }],
      19: [function(r, c, h) {
        "use strict";
        var f = r("./Uint8ArrayReader");
        function s(o) {
          f.call(this, o);
        }
        r("../utils").inherits(s, f), s.prototype.readData = function(o) {
          this.checkOffset(o);
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = s;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(r, c, h) {
        "use strict";
        var f = r("./DataReader");
        function s(o) {
          f.call(this, o);
        }
        r("../utils").inherits(s, f), s.prototype.byteAt = function(o) {
          return this.data.charCodeAt(this.zero + o);
        }, s.prototype.lastIndexOfSignature = function(o) {
          return this.data.lastIndexOf(o) - this.zero;
        }, s.prototype.readAndCheckSignature = function(o) {
          return o === this.readData(4);
        }, s.prototype.readData = function(o) {
          this.checkOffset(o);
          var d = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = s;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(r, c, h) {
        "use strict";
        var f = r("./ArrayReader");
        function s(o) {
          f.call(this, o);
        }
        r("../utils").inherits(s, f), s.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return new Uint8Array(0);
          var d = this.data.subarray(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, d;
        }, c.exports = s;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(r, c, h) {
        "use strict";
        var f = r("../utils"), s = r("../support"), o = r("./ArrayReader"), d = r("./StringReader"), U = r("./NodeBufferReader"), F = r("./Uint8ArrayReader");
        c.exports = function(B) {
          var _ = f.getTypeOf(B);
          return f.checkSupport(_), _ !== "string" || s.uint8array ? _ === "nodebuffer" ? new U(B) : s.uint8array ? new F(f.transformTo("uint8array", B)) : new o(f.transformTo("array", B)) : new d(B);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, c, h) {
        "use strict";
        h.LOCAL_FILE_HEADER = "PK", h.CENTRAL_FILE_HEADER = "PK", h.CENTRAL_DIRECTORY_END = "PK", h.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", h.ZIP64_CENTRAL_DIRECTORY_END = "PK", h.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, c, h) {
        "use strict";
        var f = r("./GenericWorker"), s = r("../utils");
        function o(d) {
          f.call(this, "ConvertWorker to " + d), this.destType = d;
        }
        s.inherits(o, f), o.prototype.processChunk = function(d) {
          this.push({
            data: s.transformTo(this.destType, d.data),
            meta: d.meta
          });
        }, c.exports = o;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(r, c, h) {
        "use strict";
        var f = r("./GenericWorker"), s = r("../crc32");
        function o() {
          f.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(o, f), o.prototype.processChunk = function(d) {
          this.streamInfo.crc32 = s(d.data, this.streamInfo.crc32 || 0), this.push(d);
        }, c.exports = o;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(r, c, h) {
        "use strict";
        var f = r("../utils"), s = r("./GenericWorker");
        function o(d) {
          s.call(this, "DataLengthProbe for " + d), this.propName = d, this.withStreamInfo(d, 0);
        }
        f.inherits(o, s), o.prototype.processChunk = function(d) {
          if (d) {
            var U = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = U + d.data.length;
          }
          s.prototype.processChunk.call(this, d);
        }, c.exports = o;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, c, h) {
        "use strict";
        var f = r("../utils"), s = r("./GenericWorker");
        function o(d) {
          s.call(this, "DataWorker");
          var U = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, d.then(function(F) {
            U.dataIsReady = !0, U.data = F, U.max = F && F.length || 0, U.type = f.getTypeOf(F), U.isPaused || U._tickAndRepeat();
          }, function(F) {
            U.error(F);
          });
        }
        f.inherits(o, s), o.prototype.cleanUp = function() {
          s.prototype.cleanUp.call(this), this.data = null;
        }, o.prototype.resume = function() {
          return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, f.delay(this._tickAndRepeat, [], this)), !0);
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
      28: [function(r, c, h) {
        "use strict";
        function f(s) {
          this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        f.prototype = {
          push: function(s) {
            this.emit("data", s);
          },
          end: function() {
            if (this.isFinished) return !1;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = !0;
            } catch (s) {
              this.emit("error", s);
            }
            return !0;
          },
          error: function(s) {
            return !this.isFinished && (this.isPaused ? this.generatedError = s : (this.isFinished = !0, this.emit("error", s), this.previous && this.previous.error(s), this.cleanUp()), !0);
          },
          on: function(s, o) {
            return this._listeners[s].push(o), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(s, o) {
            if (this._listeners[s]) for (var d = 0; d < this._listeners[s].length; d++) this._listeners[s][d].call(this, o);
          },
          pipe: function(s) {
            return s.registerPrevious(this);
          },
          registerPrevious: function(s) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
            var o = this;
            return s.on("data", function(d) {
              o.processChunk(d);
            }), s.on("end", function() {
              o.end();
            }), s.on("error", function(d) {
              o.error(d);
            }), this;
          },
          pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
          },
          resume: function() {
            if (!this.isPaused || this.isFinished) return !1;
            var s = this.isPaused = !1;
            return this.generatedError && (this.error(this.generatedError), s = !0), this.previous && this.previous.resume(), !s;
          },
          flush: function() {
          },
          processChunk: function(s) {
            this.push(s);
          },
          withStreamInfo: function(s, o) {
            return this.extraStreamInfo[s] = o, this.mergeStreamInfo(), this;
          },
          mergeStreamInfo: function() {
            for (var s in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s]);
          },
          lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = !0, this.previous && this.previous.lock();
          },
          toString: function() {
            var s = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + s : s;
          }
        }, c.exports = f;
      }, {}],
      29: [function(r, c, h) {
        "use strict";
        var f = r("../utils"), s = r("./ConvertWorker"), o = r("./GenericWorker"), d = r("../base64"), U = r("../support"), F = r("../external"), B = null;
        if (U.nodestream) try {
          B = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function _(v, w) {
          return new F.Promise(function(b, T) {
            var x = [], N = v._internalType, R = v._outputType, C = v._mimeType;
            v.on("data", function(g, O) {
              x.push(g), w && w(O);
            }).on("error", function(g) {
              x = [], T(g);
            }).on("end", function() {
              try {
                b((function(g, O, M) {
                  switch (g) {
                    case "blob":
                      return f.newBlob(f.transformTo("arraybuffer", O), M);
                    case "base64":
                      return d.encode(O);
                    default:
                      return f.transformTo(g, O);
                  }
                })(R, (function(g, O) {
                  var M, I = 0, Z = null, uA = 0;
                  for (M = 0; M < O.length; M++) uA += O[M].length;
                  switch (g) {
                    case "string":
                      return O.join("");
                    case "array":
                      return Array.prototype.concat.apply([], O);
                    case "uint8array":
                      for (Z = new Uint8Array(uA), M = 0; M < O.length; M++) Z.set(O[M], I), I += O[M].length;
                      return Z;
                    case "nodebuffer":
                      return Buffer.concat(O);
                    default:
                      throw new Error("concat : unsupported type '" + g + "'");
                  }
                })(N, x), C));
              } catch (g) {
                T(g);
              }
              x = [];
            }).resume();
          });
        }
        function E(v, w, b) {
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
            this._internalType = T, this._outputType = w, this._mimeType = b, f.checkSupport(T), this._worker = v.pipe(new s(T)), v.lock();
          } catch (x) {
            this._worker = new o("error"), this._worker.error(x);
          }
        }
        E.prototype = {
          accumulate: function(v) {
            return _(this, v);
          },
          on: function(v, w) {
            var b = this;
            return v === "data" ? this._worker.on(v, function(T) {
              w.call(b, T.data, T.meta);
            }) : this._worker.on(v, function() {
              f.delay(w, arguments, b);
            }), this;
          },
          resume: function() {
            return f.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(v) {
            if (f.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new B(this, { objectMode: this._outputType !== "nodebuffer" }, v);
          }
        }, c.exports = E;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(r, c, h) {
        "use strict";
        if (h.base64 = !0, h.array = !0, h.string = !0, h.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", h.nodebuffer = typeof Buffer < "u", h.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") h.blob = !1;
        else {
          var f = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            h.blob = new Blob([f], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              s.append(f), h.blob = s.getBlob("application/zip").size === 0;
            } catch {
              h.blob = !1;
            }
          }
        }
        try {
          h.nodestream = !!r("readable-stream").Readable;
        } catch {
          h.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(r, c, h) {
        "use strict";
        for (var f = r("./utils"), s = r("./support"), o = r("./nodejsUtils"), d = r("./stream/GenericWorker"), U = new Array(256), F = 0; F < 256; F++) U[F] = 252 <= F ? 6 : 248 <= F ? 5 : 240 <= F ? 4 : 224 <= F ? 3 : 192 <= F ? 2 : 1;
        U[254] = U[254] = 1;
        function B() {
          d.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function _() {
          d.call(this, "utf-8 encode");
        }
        h.utf8encode = function(E) {
          return s.nodebuffer ? o.newBufferFrom(E, "utf-8") : (function(v) {
            var w, b, T, x, N, R = v.length, C = 0;
            for (x = 0; x < R; x++) (64512 & (b = v.charCodeAt(x))) == 55296 && x + 1 < R && (64512 & (T = v.charCodeAt(x + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (T - 56320), x++), C += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
            for (w = s.uint8array ? new Uint8Array(C) : new Array(C), x = N = 0; N < C; x++) (64512 & (b = v.charCodeAt(x))) == 55296 && x + 1 < R && (64512 & (T = v.charCodeAt(x + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (T - 56320), x++), b < 128 ? w[N++] = b : (b < 2048 ? w[N++] = 192 | b >>> 6 : (b < 65536 ? w[N++] = 224 | b >>> 12 : (w[N++] = 240 | b >>> 18, w[N++] = 128 | b >>> 12 & 63), w[N++] = 128 | b >>> 6 & 63), w[N++] = 128 | 63 & b);
            return w;
          })(E);
        }, h.utf8decode = function(E) {
          return s.nodebuffer ? f.transformTo("nodebuffer", E).toString("utf-8") : (function(v) {
            var w, b, T, x, N = v.length, R = new Array(2 * N);
            for (w = b = 0; w < N; ) if ((T = v[w++]) < 128) R[b++] = T;
            else if (4 < (x = U[T])) R[b++] = 65533, w += x - 1;
            else {
              for (T &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && w < N; ) T = T << 6 | 63 & v[w++], x--;
              1 < x ? R[b++] = 65533 : T < 65536 ? R[b++] = T : (T -= 65536, R[b++] = 55296 | T >> 10 & 1023, R[b++] = 56320 | 1023 & T);
            }
            return R.length !== b && (R.subarray ? R = R.subarray(0, b) : R.length = b), f.applyFromCharCode(R);
          })(E = f.transformTo(s.uint8array ? "uint8array" : "array", E));
        }, f.inherits(B, d), B.prototype.processChunk = function(E) {
          var v = f.transformTo(s.uint8array ? "uint8array" : "array", E.data);
          if (this.leftOver && this.leftOver.length) {
            if (s.uint8array) {
              var w = v;
              (v = new Uint8Array(w.length + this.leftOver.length)).set(this.leftOver, 0), v.set(w, this.leftOver.length);
            } else v = this.leftOver.concat(v);
            this.leftOver = null;
          }
          var b = (function(x, N) {
            var R;
            for ((N = N || x.length) > x.length && (N = x.length), R = N - 1; 0 <= R && (192 & x[R]) == 128; ) R--;
            return R < 0 || R === 0 ? N : R + U[x[R]] > N ? R : N;
          })(v), T = v;
          b !== v.length && (s.uint8array ? (T = v.subarray(0, b), this.leftOver = v.subarray(b, v.length)) : (T = v.slice(0, b), this.leftOver = v.slice(b, v.length))), this.push({
            data: h.utf8decode(T),
            meta: E.meta
          });
        }, B.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: h.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, h.Utf8DecodeWorker = B, f.inherits(_, d), _.prototype.processChunk = function(E) {
          this.push({
            data: h.utf8encode(E.data),
            meta: E.meta
          });
        }, h.Utf8EncodeWorker = _;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, c, h) {
        "use strict";
        var f = r("./support"), s = r("./base64"), o = r("./nodejsUtils"), d = r("./external");
        function U(w) {
          return w;
        }
        function F(w, b) {
          for (var T = 0; T < w.length; ++T) b[T] = 255 & w.charCodeAt(T);
          return b;
        }
        r("setimmediate"), h.newBlob = function(w, b) {
          h.checkSupport("blob");
          try {
            return new Blob([w], { type: b });
          } catch {
            try {
              var T = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return T.append(w), T.getBlob(b);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var B = {
          stringifyByChunk: function(w, b, T) {
            var x = [], N = 0, R = w.length;
            if (R <= T) return String.fromCharCode.apply(null, w);
            for (; N < R; ) b === "array" || b === "nodebuffer" ? x.push(String.fromCharCode.apply(null, w.slice(N, Math.min(N + T, R)))) : x.push(String.fromCharCode.apply(null, w.subarray(N, Math.min(N + T, R)))), N += T;
            return x.join("");
          },
          stringifyByChar: function(w) {
            for (var b = "", T = 0; T < w.length; T++) b += String.fromCharCode(w[T]);
            return b;
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
          var b = 65536, T = h.getTypeOf(w), x = !0;
          if (T === "uint8array" ? x = B.applyCanBeUsed.uint8array : T === "nodebuffer" && (x = B.applyCanBeUsed.nodebuffer), x) for (; 1 < b; ) try {
            return B.stringifyByChunk(w, T, b);
          } catch {
            b = Math.floor(b / 2);
          }
          return B.stringifyByChar(w);
        }
        function E(w, b) {
          for (var T = 0; T < w.length; T++) b[T] = w[T];
          return b;
        }
        h.applyFromCharCode = _;
        var v = {};
        v.string = {
          string: U,
          array: function(w) {
            return F(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return v.string.uint8array(w).buffer;
          },
          uint8array: function(w) {
            return F(w, new Uint8Array(w.length));
          },
          nodebuffer: function(w) {
            return F(w, o.allocBuffer(w.length));
          }
        }, v.array = {
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
        }, v.arraybuffer = {
          string: function(w) {
            return _(new Uint8Array(w));
          },
          array: function(w) {
            return E(new Uint8Array(w), new Array(w.byteLength));
          },
          arraybuffer: U,
          uint8array: function(w) {
            return new Uint8Array(w);
          },
          nodebuffer: function(w) {
            return o.newBufferFrom(new Uint8Array(w));
          }
        }, v.uint8array = {
          string: _,
          array: function(w) {
            return E(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return w.buffer;
          },
          uint8array: U,
          nodebuffer: function(w) {
            return o.newBufferFrom(w);
          }
        }, v.nodebuffer = {
          string: _,
          array: function(w) {
            return E(w, new Array(w.length));
          },
          arraybuffer: function(w) {
            return v.nodebuffer.uint8array(w).buffer;
          },
          uint8array: function(w) {
            return E(w, new Uint8Array(w.length));
          },
          nodebuffer: U
        }, h.transformTo = function(w, b) {
          return b = b || "", w ? (h.checkSupport(w), v[h.getTypeOf(b)][w](b)) : b;
        }, h.resolve = function(w) {
          for (var b = w.split("/"), T = [], x = 0; x < b.length; x++) {
            var N = b[x];
            N === "." || N === "" && x !== 0 && x !== b.length - 1 || (N === ".." ? T.pop() : T.push(N));
          }
          return T.join("/");
        }, h.getTypeOf = function(w) {
          return typeof w == "string" ? "string" : Object.prototype.toString.call(w) === "[object Array]" ? "array" : f.nodebuffer && o.isBuffer(w) ? "nodebuffer" : f.uint8array && w instanceof Uint8Array ? "uint8array" : f.arraybuffer && w instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, h.checkSupport = function(w) {
          if (!f[w.toLowerCase()]) throw new Error(w + " is not supported by this platform");
        }, h.MAX_VALUE_16BITS = 65535, h.MAX_VALUE_32BITS = -1, h.pretty = function(w) {
          var b, T, x = "";
          for (T = 0; T < (w || "").length; T++) x += "\\x" + ((b = w.charCodeAt(T)) < 16 ? "0" : "") + b.toString(16).toUpperCase();
          return x;
        }, h.delay = function(w, b, T) {
          setImmediate(function() {
            w.apply(T || null, b || []);
          });
        }, h.inherits = function(w, b) {
          function T() {
          }
          T.prototype = b.prototype, w.prototype = new T();
        }, h.extend = function() {
          var w, b, T = {};
          for (w = 0; w < arguments.length; w++) for (b in arguments[w]) Object.prototype.hasOwnProperty.call(arguments[w], b) && T[b] === void 0 && (T[b] = arguments[w][b]);
          return T;
        }, h.prepareContent = function(w, b, T, x, N) {
          return d.Promise.resolve(b).then(function(R) {
            return f.blob && (R instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(R)) !== -1) && typeof FileReader < "u" ? new d.Promise(function(C, g) {
              var O = new FileReader();
              O.onload = function(M) {
                C(M.target.result);
              }, O.onerror = function(M) {
                g(M.target.error);
              }, O.readAsArrayBuffer(R);
            }) : R;
          }).then(function(R) {
            var C = h.getTypeOf(R);
            return C ? (C === "arraybuffer" ? R = h.transformTo("uint8array", R) : C === "string" && (N ? R = s.decode(R) : T && x !== !0 && (R = (function(g) {
              return F(g, f.uint8array ? new Uint8Array(g.length) : new Array(g.length));
            })(R))), R) : d.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + w + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(r, c, h) {
        "use strict";
        var f = r("./reader/readerFor"), s = r("./utils"), o = r("./signature"), d = r("./zipEntry"), U = r("./support");
        function F(B) {
          this.files = [], this.loadOptions = B;
        }
        F.prototype = {
          checkSignature: function(B) {
            if (!this.reader.readAndCheckSignature(B)) {
              this.reader.index -= 4;
              var _ = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(_) + ", expected " + s.pretty(B) + ")");
            }
          },
          isSignature: function(B, _) {
            var E = this.reader.index;
            this.reader.setIndex(B);
            var v = this.reader.readString(4) === _;
            return this.reader.setIndex(E), v;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var B = this.reader.readData(this.zipCommentLength), _ = U.uint8array ? "uint8array" : "array", E = s.transformTo(_, B);
            this.zipComment = this.loadOptions.decodeFileName(E);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var B, _, E, v = this.zip64EndOfCentralSize - 44; 0 < v; ) B = this.reader.readInt(2), _ = this.reader.readInt(4), E = this.reader.readData(_), this.zip64ExtensibleData[B] = {
              id: B,
              length: _,
              value: E
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            var B, _;
            for (B = 0; B < this.files.length; B++) _ = this.files[B], this.reader.setIndex(_.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), _.readLocalPart(this.reader), _.handleUTF8(), _.processAttributes();
          },
          readCentralDir: function() {
            var B;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER); ) (B = new d({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(B);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var B = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
            if (B < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(B);
            var _ = B;
            if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (B = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(B), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var E = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (E += 20, E += 12 + this.zip64EndOfCentralSize);
            var v = _ - E;
            if (0 < v) this.isSignature(_, o.CENTRAL_FILE_HEADER) || (this.reader.zero = v);
            else if (v < 0) throw new Error("Corrupted zip: missing " + Math.abs(v) + " bytes.");
          },
          prepareReader: function(B) {
            this.reader = f(B);
          },
          load: function(B) {
            this.prepareReader(B), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, c.exports = F;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(r, c, h) {
        "use strict";
        var f = r("./reader/readerFor"), s = r("./utils"), o = r("./compressedObject"), d = r("./crc32"), U = r("./utf8"), F = r("./compressions"), B = r("./support");
        function _(E, v) {
          this.options = E, this.loadOptions = v;
        }
        _.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(E) {
            var v, w;
            if (E.skip(22), this.fileNameLength = E.readInt(2), w = E.readInt(2), this.fileName = E.readData(this.fileNameLength), E.skip(w), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((v = (function(b) {
              for (var T in F) if (Object.prototype.hasOwnProperty.call(F, T) && F[T].magic === b) return F[T];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, v, E.readData(this.compressedSize));
          },
          readCentralPart: function(E) {
            this.versionMadeBy = E.readInt(2), E.skip(2), this.bitFlag = E.readInt(2), this.compressionMethod = E.readString(2), this.date = E.readDate(), this.crc32 = E.readInt(4), this.compressedSize = E.readInt(4), this.uncompressedSize = E.readInt(4);
            var v = E.readInt(2);
            if (this.extraFieldsLength = E.readInt(2), this.fileCommentLength = E.readInt(2), this.diskNumberStart = E.readInt(2), this.internalFileAttributes = E.readInt(2), this.externalFileAttributes = E.readInt(4), this.localHeaderOffset = E.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            E.skip(v), this.readExtraFields(E), this.parseZIP64ExtraField(E), this.fileComment = E.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var E = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), E == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), E == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var E = f(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = E.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = E.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = E.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = E.readInt(4));
            }
          },
          readExtraFields: function(E) {
            var v, w, b, T = E.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); E.index + 4 < T; ) v = E.readInt(2), w = E.readInt(2), b = E.readData(w), this.extraFields[v] = {
              id: v,
              length: w,
              value: b
            };
            E.setIndex(T);
          },
          handleUTF8: function() {
            var E = B.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = U.utf8decode(this.fileName), this.fileCommentStr = U.utf8decode(this.fileComment);
            else {
              var v = this.findExtraFieldUnicodePath();
              if (v !== null) this.fileNameStr = v;
              else {
                var w = s.transformTo(E, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(w);
              }
              var b = this.findExtraFieldUnicodeComment();
              if (b !== null) this.fileCommentStr = b;
              else {
                var T = s.transformTo(E, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(T);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var E = this.extraFields[28789];
            if (E) {
              var v = f(E.value);
              return v.readInt(1) !== 1 || d(this.fileName) !== v.readInt(4) ? null : U.utf8decode(v.readData(E.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var E = this.extraFields[25461];
            if (E) {
              var v = f(E.value);
              return v.readInt(1) !== 1 || d(this.fileComment) !== v.readInt(4) ? null : U.utf8decode(v.readData(E.length - 5));
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
      35: [function(r, c, h) {
        "use strict";
        function f(v, w, b) {
          this.name = v, this.dir = b.dir, this.date = b.date, this.comment = b.comment, this.unixPermissions = b.unixPermissions, this.dosPermissions = b.dosPermissions, this._data = w, this._dataBinary = b.binary, this.options = {
            compression: b.compression,
            compressionOptions: b.compressionOptions
          };
        }
        var s = r("./stream/StreamHelper"), o = r("./stream/DataWorker"), d = r("./utf8"), U = r("./compressedObject"), F = r("./stream/GenericWorker");
        f.prototype = {
          internalStream: function(v) {
            var w = null, b = "string";
            try {
              if (!v) throw new Error("No output type specified.");
              var T = (b = v.toLowerCase()) === "string" || b === "text";
              b !== "binarystring" && b !== "text" || (b = "string"), w = this._decompressWorker();
              var x = !this._dataBinary;
              x && !T && (w = w.pipe(new d.Utf8EncodeWorker())), !x && T && (w = w.pipe(new d.Utf8DecodeWorker()));
            } catch (N) {
              (w = new F("error")).error(N);
            }
            return new s(w, b, "");
          },
          async: function(v, w) {
            return this.internalStream(v).accumulate(w);
          },
          nodeStream: function(v, w) {
            return this.internalStream(v || "nodebuffer").toNodejsStream(w);
          },
          _compressWorker: function(v, w) {
            if (this._data instanceof U && this._data.compression.magic === v.magic) return this._data.getCompressedWorker();
            var b = this._decompressWorker();
            return this._dataBinary || (b = b.pipe(new d.Utf8EncodeWorker())), U.createWorkerFrom(b, v, w);
          },
          _decompressWorker: function() {
            return this._data instanceof U ? this._data.getContentWorker() : this._data instanceof F ? this._data : new o(this._data);
          }
        };
        for (var B = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], _ = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, E = 0; E < B.length; E++) f.prototype[B[E]] = _;
        c.exports = f;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(r, c, h) {
        (function(f) {
          "use strict";
          var s, o, d = f.MutationObserver || f.WebKitMutationObserver;
          if (d) {
            var U = 0, F = new d(v), B = f.document.createTextNode("");
            F.observe(B, { characterData: !0 }), s = function() {
              B.data = U = ++U % 2;
            };
          } else if (f.setImmediate || f.MessageChannel === void 0) s = "document" in f && "onreadystatechange" in f.document.createElement("script") ? function() {
            var w = f.document.createElement("script");
            w.onreadystatechange = function() {
              v(), w.onreadystatechange = null, w.parentNode.removeChild(w), w = null;
            }, f.document.documentElement.appendChild(w);
          } : function() {
            setTimeout(v, 0);
          };
          else {
            var _ = new f.MessageChannel();
            _.port1.onmessage = v, s = function() {
              _.port2.postMessage(0);
            };
          }
          var E = [];
          function v() {
            var w, b;
            o = !0;
            for (var T = E.length; T; ) {
              for (b = E, E = [], w = -1; ++w < T; ) b[w]();
              T = E.length;
            }
            o = !1;
          }
          c.exports = function(w) {
            E.push(w) !== 1 || o || s();
          };
        }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, c, h) {
        "use strict";
        var f = r("immediate");
        function s() {
        }
        var o = {}, d = ["REJECTED"], U = ["FULFILLED"], F = ["PENDING"];
        function B(T) {
          if (typeof T != "function") throw new TypeError("resolver must be a function");
          this.state = F, this.queue = [], this.outcome = void 0, T !== s && w(this, T);
        }
        function _(T, x, N) {
          this.promise = T, typeof x == "function" && (this.onFulfilled = x, this.callFulfilled = this.otherCallFulfilled), typeof N == "function" && (this.onRejected = N, this.callRejected = this.otherCallRejected);
        }
        function E(T, x, N) {
          f(function() {
            var R;
            try {
              R = x(N);
            } catch (C) {
              return o.reject(T, C);
            }
            R === T ? o.reject(T, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : o.resolve(T, R);
          });
        }
        function v(T) {
          var x = T && T.then;
          if (T && (typeof T == "object" || typeof T == "function") && typeof x == "function") return function() {
            x.apply(T, arguments);
          };
        }
        function w(T, x) {
          var N = !1;
          function R(O) {
            N || (N = !0, o.reject(T, O));
          }
          function C(O) {
            N || (N = !0, o.resolve(T, O));
          }
          var g = b(function() {
            x(C, R);
          });
          g.status === "error" && R(g.value);
        }
        function b(T, x) {
          var N = {};
          try {
            N.value = T(x), N.status = "success";
          } catch (R) {
            N.status = "error", N.value = R;
          }
          return N;
        }
        (c.exports = B).prototype.finally = function(T) {
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
        }, B.prototype.catch = function(T) {
          return this.then(null, T);
        }, B.prototype.then = function(T, x) {
          if (typeof T != "function" && this.state === U || typeof x != "function" && this.state === d) return this;
          var N = new this.constructor(s);
          return this.state !== F ? E(N, this.state === U ? T : x, this.outcome) : this.queue.push(new _(N, T, x)), N;
        }, _.prototype.callFulfilled = function(T) {
          o.resolve(this.promise, T);
        }, _.prototype.otherCallFulfilled = function(T) {
          E(this.promise, this.onFulfilled, T);
        }, _.prototype.callRejected = function(T) {
          o.reject(this.promise, T);
        }, _.prototype.otherCallRejected = function(T) {
          E(this.promise, this.onRejected, T);
        }, o.resolve = function(T, x) {
          var N = b(v, x);
          if (N.status === "error") return o.reject(T, N.value);
          var R = N.value;
          if (R) w(T, R);
          else {
            T.state = U, T.outcome = x;
            for (var C = -1, g = T.queue.length; ++C < g; ) T.queue[C].callFulfilled(x);
          }
          return T;
        }, o.reject = function(T, x) {
          T.state = d, T.outcome = x;
          for (var N = -1, R = T.queue.length; ++N < R; ) T.queue[N].callRejected(x);
          return T;
        }, B.resolve = function(T) {
          return T instanceof this ? T : o.resolve(new this(s), T);
        }, B.reject = function(T) {
          var x = new this(s);
          return o.reject(x, T);
        }, B.all = function(T) {
          var x = this;
          if (Object.prototype.toString.call(T) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var N = T.length, R = !1;
          if (!N) return this.resolve([]);
          for (var C = new Array(N), g = 0, O = -1, M = new this(s); ++O < N; ) I(T[O], O);
          return M;
          function I(Z, uA) {
            x.resolve(Z).then(function(k) {
              C[uA] = k, ++g !== N || R || (R = !0, o.resolve(M, C));
            }, function(k) {
              R || (R = !0, o.reject(M, k));
            });
          }
        }, B.race = function(T) {
          var x = this;
          if (Object.prototype.toString.call(T) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var N = T.length, R = !1;
          if (!N) return this.resolve([]);
          for (var C = -1, g = new this(s); ++C < N; ) O = T[C], x.resolve(O).then(function(M) {
            R || (R = !0, o.resolve(g, M));
          }, function(M) {
            R || (R = !0, o.reject(g, M));
          });
          var O;
          return g;
        };
      }, { immediate: 36 }],
      38: [function(r, c, h) {
        "use strict";
        var f = {};
        (0, r("./lib/utils/common").assign)(f, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), c.exports = f;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, c, h) {
        "use strict";
        var f = r("./zlib/deflate"), s = r("./utils/common"), o = r("./utils/strings"), d = r("./zlib/messages"), U = r("./zlib/zstream"), F = Object.prototype.toString, B = 0, _ = -1, E = 0, v = 8;
        function w(T) {
          if (!(this instanceof w)) return new w(T);
          this.options = s.assign({
            level: _,
            method: v,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: E,
            to: ""
          }, T || {});
          var x = this.options;
          x.raw && 0 < x.windowBits ? x.windowBits = -x.windowBits : x.gzip && 0 < x.windowBits && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new U(), this.strm.avail_out = 0;
          var N = f.deflateInit2(this.strm, x.level, x.method, x.windowBits, x.memLevel, x.strategy);
          if (N !== B) throw new Error(d[N]);
          if (x.header && f.deflateSetHeader(this.strm, x.header), x.dictionary) {
            var R;
            if (R = typeof x.dictionary == "string" ? o.string2buf(x.dictionary) : F.call(x.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(x.dictionary) : x.dictionary, (N = f.deflateSetDictionary(this.strm, R)) !== B) throw new Error(d[N]);
            this._dict_set = !0;
          }
        }
        function b(T, x) {
          var N = new w(x);
          if (N.push(T, !0), N.err) throw N.msg || d[N.err];
          return N.result;
        }
        w.prototype.push = function(T, x) {
          var N, R, C = this.strm, g = this.options.chunkSize;
          if (this.ended) return !1;
          R = x === ~~x ? x : x === !0 ? 4 : 0, typeof T == "string" ? C.input = o.string2buf(T) : F.call(T) === "[object ArrayBuffer]" ? C.input = new Uint8Array(T) : C.input = T, C.next_in = 0, C.avail_in = C.input.length;
          do {
            if (C.avail_out === 0 && (C.output = new s.Buf8(g), C.next_out = 0, C.avail_out = g), (N = f.deflate(C, R)) !== 1 && N !== B) return this.onEnd(N), !(this.ended = !0);
            C.avail_out !== 0 && (C.avail_in !== 0 || R !== 4 && R !== 2) || (this.options.to === "string" ? this.onData(o.buf2binstring(s.shrinkBuf(C.output, C.next_out))) : this.onData(s.shrinkBuf(C.output, C.next_out)));
          } while ((0 < C.avail_in || C.avail_out === 0) && N !== 1);
          return R === 4 ? (N = f.deflateEnd(this.strm), this.onEnd(N), this.ended = !0, N === B) : R !== 2 || (this.onEnd(B), !(C.avail_out = 0));
        }, w.prototype.onData = function(T) {
          this.chunks.push(T);
        }, w.prototype.onEnd = function(T) {
          T === B && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
        }, h.Deflate = w, h.deflate = b, h.deflateRaw = function(T, x) {
          return (x = x || {}).raw = !0, b(T, x);
        }, h.gzip = function(T, x) {
          return (x = x || {}).gzip = !0, b(T, x);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, c, h) {
        "use strict";
        var f = r("./zlib/inflate"), s = r("./utils/common"), o = r("./utils/strings"), d = r("./zlib/constants"), U = r("./zlib/messages"), F = r("./zlib/zstream"), B = r("./zlib/gzheader"), _ = Object.prototype.toString;
        function E(w) {
          if (!(this instanceof E)) return new E(w);
          this.options = s.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, w || {});
          var b = this.options;
          b.raw && 0 <= b.windowBits && b.windowBits < 16 && (b.windowBits = -b.windowBits, b.windowBits === 0 && (b.windowBits = -15)), !(0 <= b.windowBits && b.windowBits < 16) || w && w.windowBits || (b.windowBits += 32), 15 < b.windowBits && b.windowBits < 48 && (15 & b.windowBits) == 0 && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new F(), this.strm.avail_out = 0;
          var T = f.inflateInit2(this.strm, b.windowBits);
          if (T !== d.Z_OK) throw new Error(U[T]);
          this.header = new B(), f.inflateGetHeader(this.strm, this.header);
        }
        function v(w, b) {
          var T = new E(b);
          if (T.push(w, !0), T.err) throw T.msg || U[T.err];
          return T.result;
        }
        E.prototype.push = function(w, b) {
          var T, x, N, R, C, g, O = this.strm, M = this.options.chunkSize, I = this.options.dictionary, Z = !1;
          if (this.ended) return !1;
          x = b === ~~b ? b : b === !0 ? d.Z_FINISH : d.Z_NO_FLUSH, typeof w == "string" ? O.input = o.binstring2buf(w) : _.call(w) === "[object ArrayBuffer]" ? O.input = new Uint8Array(w) : O.input = w, O.next_in = 0, O.avail_in = O.input.length;
          do {
            if (O.avail_out === 0 && (O.output = new s.Buf8(M), O.next_out = 0, O.avail_out = M), (T = f.inflate(O, d.Z_NO_FLUSH)) === d.Z_NEED_DICT && I && (g = typeof I == "string" ? o.string2buf(I) : _.call(I) === "[object ArrayBuffer]" ? new Uint8Array(I) : I, T = f.inflateSetDictionary(this.strm, g)), T === d.Z_BUF_ERROR && Z === !0 && (T = d.Z_OK, Z = !1), T !== d.Z_STREAM_END && T !== d.Z_OK) return this.onEnd(T), !(this.ended = !0);
            O.next_out && (O.avail_out !== 0 && T !== d.Z_STREAM_END && (O.avail_in !== 0 || x !== d.Z_FINISH && x !== d.Z_SYNC_FLUSH) || (this.options.to === "string" ? (N = o.utf8border(O.output, O.next_out), R = O.next_out - N, C = o.buf2string(O.output, N), O.next_out = R, O.avail_out = M - R, R && s.arraySet(O.output, O.output, N, R, 0), this.onData(C)) : this.onData(s.shrinkBuf(O.output, O.next_out)))), O.avail_in === 0 && O.avail_out === 0 && (Z = !0);
          } while ((0 < O.avail_in || O.avail_out === 0) && T !== d.Z_STREAM_END);
          return T === d.Z_STREAM_END && (x = d.Z_FINISH), x === d.Z_FINISH ? (T = f.inflateEnd(this.strm), this.onEnd(T), this.ended = !0, T === d.Z_OK) : x !== d.Z_SYNC_FLUSH || (this.onEnd(d.Z_OK), !(O.avail_out = 0));
        }, E.prototype.onData = function(w) {
          this.chunks.push(w);
        }, E.prototype.onEnd = function(w) {
          w === d.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
        }, h.Inflate = E, h.inflate = v, h.inflateRaw = function(w, b) {
          return (b = b || {}).raw = !0, v(w, b);
        }, h.ungzip = v;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, c, h) {
        "use strict";
        var f = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        h.assign = function(d) {
          for (var U = Array.prototype.slice.call(arguments, 1); U.length; ) {
            var F = U.shift();
            if (F) {
              if (typeof F != "object") throw new TypeError(F + "must be non-object");
              for (var B in F) F.hasOwnProperty(B) && (d[B] = F[B]);
            }
          }
          return d;
        }, h.shrinkBuf = function(d, U) {
          return d.length === U ? d : d.subarray ? d.subarray(0, U) : (d.length = U, d);
        };
        var s = {
          arraySet: function(d, U, F, B, _) {
            if (U.subarray && d.subarray) d.set(U.subarray(F, F + B), _);
            else for (var E = 0; E < B; E++) d[_ + E] = U[F + E];
          },
          flattenChunks: function(d) {
            var U, F, B, _, E, v;
            for (U = B = 0, F = d.length; U < F; U++) B += d[U].length;
            for (v = new Uint8Array(B), U = _ = 0, F = d.length; U < F; U++) E = d[U], v.set(E, _), _ += E.length;
            return v;
          }
        }, o = {
          arraySet: function(d, U, F, B, _) {
            for (var E = 0; E < B; E++) d[_ + E] = U[F + E];
          },
          flattenChunks: function(d) {
            return [].concat.apply([], d);
          }
        };
        h.setTyped = function(d) {
          d ? (h.Buf8 = Uint8Array, h.Buf16 = Uint16Array, h.Buf32 = Int32Array, h.assign(h, s)) : (h.Buf8 = Array, h.Buf16 = Array, h.Buf32 = Array, h.assign(h, o));
        }, h.setTyped(f);
      }, {}],
      42: [function(r, c, h) {
        "use strict";
        var f = r("./common"), s = !0, o = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          s = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          o = !1;
        }
        for (var d = new f.Buf8(256), U = 0; U < 256; U++) d[U] = 252 <= U ? 6 : 248 <= U ? 5 : 240 <= U ? 4 : 224 <= U ? 3 : 192 <= U ? 2 : 1;
        function F(B, _) {
          if (_ < 65537 && (B.subarray && o || !B.subarray && s)) return String.fromCharCode.apply(null, f.shrinkBuf(B, _));
          for (var E = "", v = 0; v < _; v++) E += String.fromCharCode(B[v]);
          return E;
        }
        d[254] = d[254] = 1, h.string2buf = function(B) {
          var _, E, v, w, b, T = B.length, x = 0;
          for (w = 0; w < T; w++) (64512 & (E = B.charCodeAt(w))) == 55296 && w + 1 < T && (64512 & (v = B.charCodeAt(w + 1))) == 56320 && (E = 65536 + (E - 55296 << 10) + (v - 56320), w++), x += E < 128 ? 1 : E < 2048 ? 2 : E < 65536 ? 3 : 4;
          for (_ = new f.Buf8(x), w = b = 0; b < x; w++) (64512 & (E = B.charCodeAt(w))) == 55296 && w + 1 < T && (64512 & (v = B.charCodeAt(w + 1))) == 56320 && (E = 65536 + (E - 55296 << 10) + (v - 56320), w++), E < 128 ? _[b++] = E : (E < 2048 ? _[b++] = 192 | E >>> 6 : (E < 65536 ? _[b++] = 224 | E >>> 12 : (_[b++] = 240 | E >>> 18, _[b++] = 128 | E >>> 12 & 63), _[b++] = 128 | E >>> 6 & 63), _[b++] = 128 | 63 & E);
          return _;
        }, h.buf2binstring = function(B) {
          return F(B, B.length);
        }, h.binstring2buf = function(B) {
          for (var _ = new f.Buf8(B.length), E = 0, v = _.length; E < v; E++) _[E] = B.charCodeAt(E);
          return _;
        }, h.buf2string = function(B, _) {
          var E, v, w, b, T = _ || B.length, x = new Array(2 * T);
          for (E = v = 0; E < T; ) if ((w = B[E++]) < 128) x[v++] = w;
          else if (4 < (b = d[w])) x[v++] = 65533, E += b - 1;
          else {
            for (w &= b === 2 ? 31 : b === 3 ? 15 : 7; 1 < b && E < T; ) w = w << 6 | 63 & B[E++], b--;
            1 < b ? x[v++] = 65533 : w < 65536 ? x[v++] = w : (w -= 65536, x[v++] = 55296 | w >> 10 & 1023, x[v++] = 56320 | 1023 & w);
          }
          return F(x, v);
        }, h.utf8border = function(B, _) {
          var E;
          for ((_ = _ || B.length) > B.length && (_ = B.length), E = _ - 1; 0 <= E && (192 & B[E]) == 128; ) E--;
          return E < 0 || E === 0 ? _ : E + d[B[E]] > _ ? E : _;
        };
      }, { "./common": 41 }],
      43: [function(r, c, h) {
        "use strict";
        c.exports = function(f, s, o, d) {
          for (var U = 65535 & f | 0, F = f >>> 16 & 65535 | 0, B = 0; o !== 0; ) {
            for (o -= B = 2e3 < o ? 2e3 : o; F = F + (U = U + s[d++] | 0) | 0, --B; ) ;
            U %= 65521, F %= 65521;
          }
          return U | F << 16 | 0;
        };
      }, {}],
      44: [function(r, c, h) {
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
      45: [function(r, c, h) {
        "use strict";
        var f = (function() {
          for (var s, o = [], d = 0; d < 256; d++) {
            s = d;
            for (var U = 0; U < 8; U++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            o[d] = s;
          }
          return o;
        })();
        c.exports = function(s, o, d, U) {
          var F = f, B = U + d;
          s ^= -1;
          for (var _ = U; _ < B; _++) s = s >>> 8 ^ F[255 & (s ^ o[_])];
          return -1 ^ s;
        };
      }, {}],
      46: [function(r, c, h) {
        "use strict";
        var f, s = r("../utils/common"), o = r("./trees"), d = r("./adler32"), U = r("./crc32"), F = r("./messages"), B = 0, _ = 4, E = 0, v = -2, w = -1, b = 4, T = 2, x = 8, N = 9, R = 286, C = 30, g = 19, O = 2 * R + 1, M = 15, I = 3, Z = 258, uA = Z + I + 1, k = 42, q = 113, L = 1, $ = 2, lA = 3, rA = 4;
        function vA(m, eA) {
          return m.msg = F[eA], eA;
        }
        function aA(m) {
          return (m << 1) - (4 < m ? 9 : 0);
        }
        function dA(m) {
          for (var eA = m.length; 0 <= --eA; ) m[eA] = 0;
        }
        function tA(m) {
          var eA = m.state, D = eA.pending;
          D > m.avail_out && (D = m.avail_out), D !== 0 && (s.arraySet(m.output, eA.pending_buf, eA.pending_out, D, m.next_out), m.next_out += D, eA.pending_out += D, m.total_out += D, m.avail_out -= D, eA.pending -= D, eA.pending === 0 && (eA.pending_out = 0));
        }
        function G(m, eA) {
          o._tr_flush_block(m, 0 <= m.block_start ? m.block_start : -1, m.strstart - m.block_start, eA), m.block_start = m.strstart, tA(m.strm);
        }
        function iA(m, eA) {
          m.pending_buf[m.pending++] = eA;
        }
        function sA(m, eA) {
          m.pending_buf[m.pending++] = eA >>> 8 & 255, m.pending_buf[m.pending++] = 255 & eA;
        }
        function fA(m, eA) {
          var D, l, u = m.max_chain_length, Q = m.strstart, j = m.prev_length, AA = m.nice_match, Y = m.strstart > m.w_size - uA ? m.strstart - (m.w_size - uA) : 0, gA = m.window, yA = m.w_mask, BA = m.prev, QA = m.strstart + Z, xA = gA[Q + j - 1], RA = gA[Q + j];
          m.prev_length >= m.good_match && (u >>= 2), AA > m.lookahead && (AA = m.lookahead);
          do
            if (gA[(D = eA) + j] === RA && gA[D + j - 1] === xA && gA[D] === gA[Q] && gA[++D] === gA[Q + 1]) {
              Q += 2, D++;
              do
                ;
              while (gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && gA[++Q] === gA[++D] && Q < QA);
              if (l = Z - (QA - Q), Q = QA - Z, j < l) {
                if (m.match_start = eA, AA <= (j = l)) break;
                xA = gA[Q + j - 1], RA = gA[Q + j];
              }
            }
          while ((eA = BA[eA & yA]) > Y && --u != 0);
          return j <= m.lookahead ? j : m.lookahead;
        }
        function _A(m) {
          var eA, D, l, u, Q, j, AA, Y, gA, yA, BA = m.w_size;
          do {
            if (u = m.window_size - m.lookahead - m.strstart, m.strstart >= BA + (BA - uA)) {
              for (s.arraySet(m.window, m.window, BA, BA, 0), m.match_start -= BA, m.strstart -= BA, m.block_start -= BA, eA = D = m.hash_size; l = m.head[--eA], m.head[eA] = BA <= l ? l - BA : 0, --D; ) ;
              for (eA = D = BA; l = m.prev[--eA], m.prev[eA] = BA <= l ? l - BA : 0, --D; ) ;
              u += BA;
            }
            if (m.strm.avail_in === 0) break;
            if (j = m.strm, AA = m.window, Y = m.strstart + m.lookahead, gA = u, yA = void 0, yA = j.avail_in, gA < yA && (yA = gA), D = yA === 0 ? 0 : (j.avail_in -= yA, s.arraySet(AA, j.input, j.next_in, yA, Y), j.state.wrap === 1 ? j.adler = d(j.adler, AA, yA, Y) : j.state.wrap === 2 && (j.adler = U(j.adler, AA, yA, Y)), j.next_in += yA, j.total_in += yA, yA), m.lookahead += D, m.lookahead + m.insert >= I) for (Q = m.strstart - m.insert, m.ins_h = m.window[Q], m.ins_h = (m.ins_h << m.hash_shift ^ m.window[Q + 1]) & m.hash_mask; m.insert && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[Q + I - 1]) & m.hash_mask, m.prev[Q & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = Q, Q++, m.insert--, !(m.lookahead + m.insert < I)); ) ;
          } while (m.lookahead < uA && m.strm.avail_in !== 0);
        }
        function H(m, eA) {
          for (var D, l; ; ) {
            if (m.lookahead < uA) {
              if (_A(m), m.lookahead < uA && eA === B) return L;
              if (m.lookahead === 0) break;
            }
            if (D = 0, m.lookahead >= I && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + I - 1]) & m.hash_mask, D = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), D !== 0 && m.strstart - D <= m.w_size - uA && (m.match_length = fA(m, D)), m.match_length >= I) if (l = o._tr_tally(m, m.strstart - m.match_start, m.match_length - I), m.lookahead -= m.match_length, m.match_length <= m.max_lazy_match && m.lookahead >= I) {
              for (m.match_length--; m.strstart++, m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + I - 1]) & m.hash_mask, D = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart, --m.match_length != 0; ) ;
              m.strstart++;
            } else m.strstart += m.match_length, m.match_length = 0, m.ins_h = m.window[m.strstart], m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + 1]) & m.hash_mask;
            else l = o._tr_tally(m, 0, m.window[m.strstart]), m.lookahead--, m.strstart++;
            if (l && (G(m, !1), m.strm.avail_out === 0)) return L;
          }
          return m.insert = m.strstart < I - 1 ? m.strstart : I - 1, eA === _ ? (G(m, !0), m.strm.avail_out === 0 ? lA : rA) : m.last_lit && (G(m, !1), m.strm.avail_out === 0) ? L : $;
        }
        function y(m, eA) {
          for (var D, l, u; ; ) {
            if (m.lookahead < uA) {
              if (_A(m), m.lookahead < uA && eA === B) return L;
              if (m.lookahead === 0) break;
            }
            if (D = 0, m.lookahead >= I && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + I - 1]) & m.hash_mask, D = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), m.prev_length = m.match_length, m.prev_match = m.match_start, m.match_length = I - 1, D !== 0 && m.prev_length < m.max_lazy_match && m.strstart - D <= m.w_size - uA && (m.match_length = fA(m, D), m.match_length <= 5 && (m.strategy === 1 || m.match_length === I && 4096 < m.strstart - m.match_start) && (m.match_length = I - 1)), m.prev_length >= I && m.match_length <= m.prev_length) {
              for (u = m.strstart + m.lookahead - I, l = o._tr_tally(m, m.strstart - 1 - m.prev_match, m.prev_length - I), m.lookahead -= m.prev_length - 1, m.prev_length -= 2; ++m.strstart <= u && (m.ins_h = (m.ins_h << m.hash_shift ^ m.window[m.strstart + I - 1]) & m.hash_mask, D = m.prev[m.strstart & m.w_mask] = m.head[m.ins_h], m.head[m.ins_h] = m.strstart), --m.prev_length != 0; ) ;
              if (m.match_available = 0, m.match_length = I - 1, m.strstart++, l && (G(m, !1), m.strm.avail_out === 0)) return L;
            } else if (m.match_available) {
              if ((l = o._tr_tally(m, 0, m.window[m.strstart - 1])) && G(m, !1), m.strstart++, m.lookahead--, m.strm.avail_out === 0) return L;
            } else m.match_available = 1, m.strstart++, m.lookahead--;
          }
          return m.match_available && (l = o._tr_tally(m, 0, m.window[m.strstart - 1]), m.match_available = 0), m.insert = m.strstart < I - 1 ? m.strstart : I - 1, eA === _ ? (G(m, !0), m.strm.avail_out === 0 ? lA : rA) : m.last_lit && (G(m, !1), m.strm.avail_out === 0) ? L : $;
        }
        function J(m, eA, D, l, u) {
          this.good_length = m, this.max_lazy = eA, this.nice_length = D, this.max_chain = l, this.func = u;
        }
        function z() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * O), this.dyn_dtree = new s.Buf16(2 * (2 * C + 1)), this.bl_tree = new s.Buf16(2 * (2 * g + 1)), dA(this.dyn_ltree), dA(this.dyn_dtree), dA(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(M + 1), this.heap = new s.Buf16(2 * R + 1), dA(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * R + 1), dA(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function pA(m) {
          var eA;
          return m && m.state ? (m.total_in = m.total_out = 0, m.data_type = T, (eA = m.state).pending = 0, eA.pending_out = 0, eA.wrap < 0 && (eA.wrap = -eA.wrap), eA.status = eA.wrap ? k : q, m.adler = eA.wrap === 2 ? 0 : 1, eA.last_flush = B, o._tr_init(eA), E) : vA(m, v);
        }
        function P(m) {
          var eA = pA(m);
          return eA === E && (function(D) {
            D.window_size = 2 * D.w_size, dA(D.head), D.max_lazy_match = f[D.level].max_lazy, D.good_match = f[D.level].good_length, D.nice_match = f[D.level].nice_length, D.max_chain_length = f[D.level].max_chain, D.strstart = 0, D.block_start = 0, D.lookahead = 0, D.insert = 0, D.match_length = D.prev_length = I - 1, D.match_available = 0, D.ins_h = 0;
          })(m.state), eA;
        }
        function V(m, eA, D, l, u, Q) {
          if (!m) return v;
          var j = 1;
          if (eA === w && (eA = 6), l < 0 ? (j = 0, l = -l) : 15 < l && (j = 2, l -= 16), u < 1 || N < u || D !== x || l < 8 || 15 < l || eA < 0 || 9 < eA || Q < 0 || b < Q) return vA(m, v);
          l === 8 && (l = 9);
          var AA = new z();
          return (m.state = AA).strm = m, AA.wrap = j, AA.gzhead = null, AA.w_bits = l, AA.w_size = 1 << AA.w_bits, AA.w_mask = AA.w_size - 1, AA.hash_bits = u + 7, AA.hash_size = 1 << AA.hash_bits, AA.hash_mask = AA.hash_size - 1, AA.hash_shift = ~~((AA.hash_bits + I - 1) / I), AA.window = new s.Buf8(2 * AA.w_size), AA.head = new s.Buf16(AA.hash_size), AA.prev = new s.Buf16(AA.w_size), AA.lit_bufsize = 1 << u + 6, AA.pending_buf_size = 4 * AA.lit_bufsize, AA.pending_buf = new s.Buf8(AA.pending_buf_size), AA.d_buf = 1 * AA.lit_bufsize, AA.l_buf = 3 * AA.lit_bufsize, AA.level = eA, AA.strategy = Q, AA.method = D, P(m);
        }
        f = [
          new J(0, 0, 0, 0, function(m, eA) {
            var D = 65535;
            for (D > m.pending_buf_size - 5 && (D = m.pending_buf_size - 5); ; ) {
              if (m.lookahead <= 1) {
                if (_A(m), m.lookahead === 0 && eA === B) return L;
                if (m.lookahead === 0) break;
              }
              m.strstart += m.lookahead, m.lookahead = 0;
              var l = m.block_start + D;
              if ((m.strstart === 0 || m.strstart >= l) && (m.lookahead = m.strstart - l, m.strstart = l, G(m, !1), m.strm.avail_out === 0) || m.strstart - m.block_start >= m.w_size - uA && (G(m, !1), m.strm.avail_out === 0)) return L;
            }
            return m.insert = 0, eA === _ ? (G(m, !0), m.strm.avail_out === 0 ? lA : rA) : (m.strstart > m.block_start && (G(m, !1), m.strm.avail_out), L);
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
        ], h.deflateInit = function(m, eA) {
          return V(m, eA, x, 15, 8, 0);
        }, h.deflateInit2 = V, h.deflateReset = P, h.deflateResetKeep = pA, h.deflateSetHeader = function(m, eA) {
          return m && m.state ? m.state.wrap !== 2 ? v : (m.state.gzhead = eA, E) : v;
        }, h.deflate = function(m, eA) {
          var D, l, u, Q;
          if (!m || !m.state || 5 < eA || eA < 0) return m ? vA(m, v) : v;
          if (l = m.state, !m.output || !m.input && m.avail_in !== 0 || l.status === 666 && eA !== _) return vA(m, m.avail_out === 0 ? -5 : v);
          if (l.strm = m, D = l.last_flush, l.last_flush = eA, l.status === k) if (l.wrap === 2) m.adler = 0, iA(l, 31), iA(l, 139), iA(l, 8), l.gzhead ? (iA(l, (l.gzhead.text ? 1 : 0) + (l.gzhead.hcrc ? 2 : 0) + (l.gzhead.extra ? 4 : 0) + (l.gzhead.name ? 8 : 0) + (l.gzhead.comment ? 16 : 0)), iA(l, 255 & l.gzhead.time), iA(l, l.gzhead.time >> 8 & 255), iA(l, l.gzhead.time >> 16 & 255), iA(l, l.gzhead.time >> 24 & 255), iA(l, l.level === 9 ? 2 : 2 <= l.strategy || l.level < 2 ? 4 : 0), iA(l, 255 & l.gzhead.os), l.gzhead.extra && l.gzhead.extra.length && (iA(l, 255 & l.gzhead.extra.length), iA(l, l.gzhead.extra.length >> 8 & 255)), l.gzhead.hcrc && (m.adler = U(m.adler, l.pending_buf, l.pending, 0)), l.gzindex = 0, l.status = 69) : (iA(l, 0), iA(l, 0), iA(l, 0), iA(l, 0), iA(l, 0), iA(l, l.level === 9 ? 2 : 2 <= l.strategy || l.level < 2 ? 4 : 0), iA(l, 3), l.status = q);
          else {
            var j = x + (l.w_bits - 8 << 4) << 8;
            j |= (2 <= l.strategy || l.level < 2 ? 0 : l.level < 6 ? 1 : l.level === 6 ? 2 : 3) << 6, l.strstart !== 0 && (j |= 32), j += 31 - j % 31, l.status = q, sA(l, j), l.strstart !== 0 && (sA(l, m.adler >>> 16), sA(l, 65535 & m.adler)), m.adler = 1;
          }
          if (l.status === 69) if (l.gzhead.extra) {
            for (u = l.pending; l.gzindex < (65535 & l.gzhead.extra.length) && (l.pending !== l.pending_buf_size || (l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), tA(m), u = l.pending, l.pending !== l.pending_buf_size)); ) iA(l, 255 & l.gzhead.extra[l.gzindex]), l.gzindex++;
            l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), l.gzindex === l.gzhead.extra.length && (l.gzindex = 0, l.status = 73);
          } else l.status = 73;
          if (l.status === 73) if (l.gzhead.name) {
            u = l.pending;
            do {
              if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), tA(m), u = l.pending, l.pending === l.pending_buf_size)) {
                Q = 1;
                break;
              }
              Q = l.gzindex < l.gzhead.name.length ? 255 & l.gzhead.name.charCodeAt(l.gzindex++) : 0, iA(l, Q);
            } while (Q !== 0);
            l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), Q === 0 && (l.gzindex = 0, l.status = 91);
          } else l.status = 91;
          if (l.status === 91) if (l.gzhead.comment) {
            u = l.pending;
            do {
              if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), tA(m), u = l.pending, l.pending === l.pending_buf_size)) {
                Q = 1;
                break;
              }
              Q = l.gzindex < l.gzhead.comment.length ? 255 & l.gzhead.comment.charCodeAt(l.gzindex++) : 0, iA(l, Q);
            } while (Q !== 0);
            l.gzhead.hcrc && l.pending > u && (m.adler = U(m.adler, l.pending_buf, l.pending - u, u)), Q === 0 && (l.status = 103);
          } else l.status = 103;
          if (l.status === 103 && (l.gzhead.hcrc ? (l.pending + 2 > l.pending_buf_size && tA(m), l.pending + 2 <= l.pending_buf_size && (iA(l, 255 & m.adler), iA(l, m.adler >> 8 & 255), m.adler = 0, l.status = q)) : l.status = q), l.pending !== 0) {
            if (tA(m), m.avail_out === 0) return l.last_flush = -1, E;
          } else if (m.avail_in === 0 && aA(eA) <= aA(D) && eA !== _) return vA(m, -5);
          if (l.status === 666 && m.avail_in !== 0) return vA(m, -5);
          if (m.avail_in !== 0 || l.lookahead !== 0 || eA !== B && l.status !== 666) {
            var AA = l.strategy === 2 ? (function(Y, gA) {
              for (var yA; ; ) {
                if (Y.lookahead === 0 && (_A(Y), Y.lookahead === 0)) {
                  if (gA === B) return L;
                  break;
                }
                if (Y.match_length = 0, yA = o._tr_tally(Y, 0, Y.window[Y.strstart]), Y.lookahead--, Y.strstart++, yA && (G(Y, !1), Y.strm.avail_out === 0)) return L;
              }
              return Y.insert = 0, gA === _ ? (G(Y, !0), Y.strm.avail_out === 0 ? lA : rA) : Y.last_lit && (G(Y, !1), Y.strm.avail_out === 0) ? L : $;
            })(l, eA) : l.strategy === 3 ? (function(Y, gA) {
              for (var yA, BA, QA, xA, RA = Y.window; ; ) {
                if (Y.lookahead <= Z) {
                  if (_A(Y), Y.lookahead <= Z && gA === B) return L;
                  if (Y.lookahead === 0) break;
                }
                if (Y.match_length = 0, Y.lookahead >= I && 0 < Y.strstart && (BA = RA[QA = Y.strstart - 1]) === RA[++QA] && BA === RA[++QA] && BA === RA[++QA]) {
                  xA = Y.strstart + Z;
                  do
                    ;
                  while (BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && BA === RA[++QA] && QA < xA);
                  Y.match_length = Z - (xA - QA), Y.match_length > Y.lookahead && (Y.match_length = Y.lookahead);
                }
                if (Y.match_length >= I ? (yA = o._tr_tally(Y, 1, Y.match_length - I), Y.lookahead -= Y.match_length, Y.strstart += Y.match_length, Y.match_length = 0) : (yA = o._tr_tally(Y, 0, Y.window[Y.strstart]), Y.lookahead--, Y.strstart++), yA && (G(Y, !1), Y.strm.avail_out === 0)) return L;
              }
              return Y.insert = 0, gA === _ ? (G(Y, !0), Y.strm.avail_out === 0 ? lA : rA) : Y.last_lit && (G(Y, !1), Y.strm.avail_out === 0) ? L : $;
            })(l, eA) : f[l.level].func(l, eA);
            if (AA !== lA && AA !== rA || (l.status = 666), AA === L || AA === lA) return m.avail_out === 0 && (l.last_flush = -1), E;
            if (AA === $ && (eA === 1 ? o._tr_align(l) : eA !== 5 && (o._tr_stored_block(l, 0, 0, !1), eA === 3 && (dA(l.head), l.lookahead === 0 && (l.strstart = 0, l.block_start = 0, l.insert = 0))), tA(m), m.avail_out === 0)) return l.last_flush = -1, E;
          }
          return eA !== _ ? E : l.wrap <= 0 ? 1 : (l.wrap === 2 ? (iA(l, 255 & m.adler), iA(l, m.adler >> 8 & 255), iA(l, m.adler >> 16 & 255), iA(l, m.adler >> 24 & 255), iA(l, 255 & m.total_in), iA(l, m.total_in >> 8 & 255), iA(l, m.total_in >> 16 & 255), iA(l, m.total_in >> 24 & 255)) : (sA(l, m.adler >>> 16), sA(l, 65535 & m.adler)), tA(m), 0 < l.wrap && (l.wrap = -l.wrap), l.pending !== 0 ? E : 1);
        }, h.deflateEnd = function(m) {
          var eA;
          return m && m.state ? (eA = m.state.status) !== k && eA !== 69 && eA !== 73 && eA !== 91 && eA !== 103 && eA !== q && eA !== 666 ? vA(m, v) : (m.state = null, eA === q ? vA(m, -3) : E) : v;
        }, h.deflateSetDictionary = function(m, eA) {
          var D, l, u, Q, j, AA, Y, gA, yA = eA.length;
          if (!m || !m.state || (Q = (D = m.state).wrap) === 2 || Q === 1 && D.status !== k || D.lookahead) return v;
          for (Q === 1 && (m.adler = d(m.adler, eA, yA, 0)), D.wrap = 0, yA >= D.w_size && (Q === 0 && (dA(D.head), D.strstart = 0, D.block_start = 0, D.insert = 0), gA = new s.Buf8(D.w_size), s.arraySet(gA, eA, yA - D.w_size, D.w_size, 0), eA = gA, yA = D.w_size), j = m.avail_in, AA = m.next_in, Y = m.input, m.avail_in = yA, m.next_in = 0, m.input = eA, _A(D); D.lookahead >= I; ) {
            for (l = D.strstart, u = D.lookahead - (I - 1); D.ins_h = (D.ins_h << D.hash_shift ^ D.window[l + I - 1]) & D.hash_mask, D.prev[l & D.w_mask] = D.head[D.ins_h], D.head[D.ins_h] = l, l++, --u; ) ;
            D.strstart = l, D.lookahead = I - 1, _A(D);
          }
          return D.strstart += D.lookahead, D.block_start = D.strstart, D.insert = D.lookahead, D.lookahead = 0, D.match_length = D.prev_length = I - 1, D.match_available = 0, m.next_in = AA, m.input = Y, m.avail_in = j, D.wrap = Q, E;
        }, h.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, c, h) {
        "use strict";
        c.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, c, h) {
        "use strict";
        c.exports = function(f, s) {
          var o = f.state, d = f.next_in, U, F, B, _, E, v, w, b, T, x, N, R, C, g, O, M, I, Z, uA, k, q, L = f.input, $;
          U = d + (f.avail_in - 5), F = f.next_out, $ = f.output, B = F - (s - f.avail_out), _ = F + (f.avail_out - 257), E = o.dmax, v = o.wsize, w = o.whave, b = o.wnext, T = o.window, x = o.hold, N = o.bits, R = o.lencode, C = o.distcode, g = (1 << o.lenbits) - 1, O = (1 << o.distbits) - 1;
          A: do {
            N < 15 && (x += L[d++] << N, N += 8, x += L[d++] << N, N += 8), M = R[x & g];
            e: for (; ; ) {
              if (x >>>= I = M >>> 24, N -= I, (I = M >>> 16 & 255) === 0) $[F++] = 65535 & M;
              else {
                if (!(16 & I)) {
                  if ((64 & I) == 0) {
                    M = R[(65535 & M) + (x & (1 << I) - 1)];
                    continue e;
                  }
                  if (32 & I) {
                    o.mode = 12;
                    break A;
                  }
                  f.msg = "invalid literal/length code", o.mode = 30;
                  break A;
                }
                Z = 65535 & M, (I &= 15) && (N < I && (x += L[d++] << N, N += 8), Z += x & (1 << I) - 1, x >>>= I, N -= I), N < 15 && (x += L[d++] << N, N += 8, x += L[d++] << N, N += 8), M = C[x & O];
                t: for (; ; ) {
                  if (x >>>= I = M >>> 24, N -= I, !(16 & (I = M >>> 16 & 255))) {
                    if ((64 & I) == 0) {
                      M = C[(65535 & M) + (x & (1 << I) - 1)];
                      continue t;
                    }
                    f.msg = "invalid distance code", o.mode = 30;
                    break A;
                  }
                  if (uA = 65535 & M, N < (I &= 15) && (x += L[d++] << N, (N += 8) < I && (x += L[d++] << N, N += 8)), E < (uA += x & (1 << I) - 1)) {
                    f.msg = "invalid distance too far back", o.mode = 30;
                    break A;
                  }
                  if (x >>>= I, N -= I, (I = F - B) < uA) {
                    if (w < (I = uA - I) && o.sane) {
                      f.msg = "invalid distance too far back", o.mode = 30;
                      break A;
                    }
                    if (q = T, (k = 0) === b) {
                      if (k += v - I, I < Z) {
                        for (Z -= I; $[F++] = T[k++], --I; ) ;
                        k = F - uA, q = $;
                      }
                    } else if (b < I) {
                      if (k += v + b - I, (I -= b) < Z) {
                        for (Z -= I; $[F++] = T[k++], --I; ) ;
                        if (k = 0, b < Z) {
                          for (Z -= I = b; $[F++] = T[k++], --I; ) ;
                          k = F - uA, q = $;
                        }
                      }
                    } else if (k += b - I, I < Z) {
                      for (Z -= I; $[F++] = T[k++], --I; ) ;
                      k = F - uA, q = $;
                    }
                    for (; 2 < Z; ) $[F++] = q[k++], $[F++] = q[k++], $[F++] = q[k++], Z -= 3;
                    Z && ($[F++] = q[k++], 1 < Z && ($[F++] = q[k++]));
                  } else {
                    for (k = F - uA; $[F++] = $[k++], $[F++] = $[k++], $[F++] = $[k++], 2 < (Z -= 3); ) ;
                    Z && ($[F++] = $[k++], 1 < Z && ($[F++] = $[k++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (d < U && F < _);
          d -= Z = N >> 3, x &= (1 << (N -= Z << 3)) - 1, f.next_in = d, f.next_out = F, f.avail_in = d < U ? U - d + 5 : 5 - (d - U), f.avail_out = F < _ ? _ - F + 257 : 257 - (F - _), o.hold = x, o.bits = N;
        };
      }, {}],
      49: [function(r, c, h) {
        "use strict";
        var f = r("../utils/common"), s = r("./adler32"), o = r("./crc32"), d = r("./inffast"), U = r("./inftrees"), F = 1, B = 2, _ = 0, E = -2, v = 1, w = 852, b = 592;
        function T(k) {
          return (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24);
        }
        function x() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new f.Buf16(320), this.work = new f.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function N(k) {
          var q;
          return k && k.state ? (q = k.state, k.total_in = k.total_out = q.total = 0, k.msg = "", q.wrap && (k.adler = 1 & q.wrap), q.mode = v, q.last = 0, q.havedict = 0, q.dmax = 32768, q.head = null, q.hold = 0, q.bits = 0, q.lencode = q.lendyn = new f.Buf32(w), q.distcode = q.distdyn = new f.Buf32(b), q.sane = 1, q.back = -1, _) : E;
        }
        function R(k) {
          var q;
          return k && k.state ? ((q = k.state).wsize = 0, q.whave = 0, q.wnext = 0, N(k)) : E;
        }
        function C(k, q) {
          var L, $;
          return k && k.state ? ($ = k.state, q < 0 ? (L = 0, q = -q) : (L = 1 + (q >> 4), q < 48 && (q &= 15)), q && (q < 8 || 15 < q) ? E : ($.window !== null && $.wbits !== q && ($.window = null), $.wrap = L, $.wbits = q, R(k))) : E;
        }
        function g(k, q) {
          var L, $;
          return k ? ($ = new x(), (k.state = $).window = null, (L = C(k, q)) !== _ && (k.state = null), L) : E;
        }
        var O, M, I = !0;
        function Z(k) {
          if (I) {
            var q;
            for (O = new f.Buf32(512), M = new f.Buf32(32), q = 0; q < 144; ) k.lens[q++] = 8;
            for (; q < 256; ) k.lens[q++] = 9;
            for (; q < 280; ) k.lens[q++] = 7;
            for (; q < 288; ) k.lens[q++] = 8;
            for (U(F, k.lens, 0, 288, O, 0, k.work, { bits: 9 }), q = 0; q < 32; ) k.lens[q++] = 5;
            U(B, k.lens, 0, 32, M, 0, k.work, { bits: 5 }), I = !1;
          }
          k.lencode = O, k.lenbits = 9, k.distcode = M, k.distbits = 5;
        }
        function uA(k, q, L, $) {
          var lA, rA = k.state;
          return rA.window === null && (rA.wsize = 1 << rA.wbits, rA.wnext = 0, rA.whave = 0, rA.window = new f.Buf8(rA.wsize)), $ >= rA.wsize ? (f.arraySet(rA.window, q, L - rA.wsize, rA.wsize, 0), rA.wnext = 0, rA.whave = rA.wsize) : ($ < (lA = rA.wsize - rA.wnext) && (lA = $), f.arraySet(rA.window, q, L - $, lA, rA.wnext), ($ -= lA) ? (f.arraySet(rA.window, q, L - $, $, 0), rA.wnext = $, rA.whave = rA.wsize) : (rA.wnext += lA, rA.wnext === rA.wsize && (rA.wnext = 0), rA.whave < rA.wsize && (rA.whave += lA))), 0;
        }
        h.inflateReset = R, h.inflateReset2 = C, h.inflateResetKeep = N, h.inflateInit = function(k) {
          return g(k, 15);
        }, h.inflateInit2 = g, h.inflate = function(k, q) {
          var L, $, lA, rA, vA, aA, dA, tA, G, iA, sA, fA, _A, H, y, J, z, pA, P, V, m, eA, D, l, u = 0, Q = new f.Buf8(4), j = [
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
          if (!k || !k.state || !k.output || !k.input && k.avail_in !== 0) return E;
          (L = k.state).mode === 12 && (L.mode = 13), vA = k.next_out, lA = k.output, dA = k.avail_out, rA = k.next_in, $ = k.input, aA = k.avail_in, tA = L.hold, G = L.bits, iA = aA, sA = dA, eA = _;
          A: for (; ; ) switch (L.mode) {
            case v:
              if (L.wrap === 0) {
                L.mode = 13;
                break;
              }
              for (; G < 16; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if (2 & L.wrap && tA === 35615) {
                Q[L.check = 0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0), G = tA = 0, L.mode = 2;
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
              if (G -= 4, m = 8 + (15 & (tA >>>= 4)), L.wbits === 0) L.wbits = m;
              else if (m > L.wbits) {
                k.msg = "invalid window size", L.mode = 30;
                break;
              }
              L.dmax = 1 << m, k.adler = L.check = 1, L.mode = 512 & tA ? 10 : 12, G = tA = 0;
              break;
            case 2:
              for (; G < 16; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if (L.flags = tA, (255 & L.flags) != 8) {
                k.msg = "unknown compression method", L.mode = 30;
                break;
              }
              if (57344 & L.flags) {
                k.msg = "unknown header flags set", L.mode = 30;
                break;
              }
              L.head && (L.head.text = tA >> 8 & 1), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), G = tA = 0, L.mode = 3;
            case 3:
              for (; G < 32; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              L.head && (L.head.time = tA), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, Q[2] = tA >>> 16 & 255, Q[3] = tA >>> 24 & 255, L.check = o(L.check, Q, 4, 0)), G = tA = 0, L.mode = 4;
            case 4:
              for (; G < 16; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              L.head && (L.head.xflags = 255 & tA, L.head.os = tA >> 8), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), G = tA = 0, L.mode = 5;
            case 5:
              if (1024 & L.flags) {
                for (; G < 16; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                L.length = tA, L.head && (L.head.extra_len = tA), 512 & L.flags && (Q[0] = 255 & tA, Q[1] = tA >>> 8 & 255, L.check = o(L.check, Q, 2, 0)), G = tA = 0;
              } else L.head && (L.head.extra = null);
              L.mode = 6;
            case 6:
              if (1024 & L.flags && (aA < (fA = L.length) && (fA = aA), fA && (L.head && (m = L.head.extra_len - L.length, L.head.extra || (L.head.extra = new Array(L.head.extra_len)), f.arraySet(L.head.extra, $, rA, fA, m)), 512 & L.flags && (L.check = o(L.check, $, fA, rA)), aA -= fA, rA += fA, L.length -= fA), L.length)) break A;
              L.length = 0, L.mode = 7;
            case 7:
              if (2048 & L.flags) {
                if (aA === 0) break A;
                for (fA = 0; m = $[rA + fA++], L.head && m && L.length < 65536 && (L.head.name += String.fromCharCode(m)), m && fA < aA; ) ;
                if (512 & L.flags && (L.check = o(L.check, $, fA, rA)), aA -= fA, rA += fA, m) break A;
              } else L.head && (L.head.name = null);
              L.length = 0, L.mode = 8;
            case 8:
              if (4096 & L.flags) {
                if (aA === 0) break A;
                for (fA = 0; m = $[rA + fA++], L.head && m && L.length < 65536 && (L.head.comment += String.fromCharCode(m)), m && fA < aA; ) ;
                if (512 & L.flags && (L.check = o(L.check, $, fA, rA)), aA -= fA, rA += fA, m) break A;
              } else L.head && (L.head.comment = null);
              L.mode = 9;
            case 9:
              if (512 & L.flags) {
                for (; G < 16; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                if (tA !== (65535 & L.check)) {
                  k.msg = "header crc mismatch", L.mode = 30;
                  break;
                }
                G = tA = 0;
              }
              L.head && (L.head.hcrc = L.flags >> 9 & 1, L.head.done = !0), k.adler = L.check = 0, L.mode = 12;
              break;
            case 10:
              for (; G < 32; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              k.adler = L.check = T(tA), G = tA = 0, L.mode = 11;
            case 11:
              if (L.havedict === 0) return k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = aA, L.hold = tA, L.bits = G, 2;
              k.adler = L.check = 1, L.mode = 12;
            case 12:
              if (q === 5 || q === 6) break A;
            case 13:
              if (L.last) {
                tA >>>= 7 & G, G -= 7 & G, L.mode = 27;
                break;
              }
              for (; G < 3; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              switch (L.last = 1 & tA, G -= 1, 3 & (tA >>>= 1)) {
                case 0:
                  L.mode = 14;
                  break;
                case 1:
                  if (Z(L), L.mode = 20, q !== 6) break;
                  tA >>>= 2, G -= 2;
                  break A;
                case 2:
                  L.mode = 17;
                  break;
                case 3:
                  k.msg = "invalid block type", L.mode = 30;
              }
              tA >>>= 2, G -= 2;
              break;
            case 14:
              for (tA >>>= 7 & G, G -= 7 & G; G < 32; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if ((65535 & tA) != (tA >>> 16 ^ 65535)) {
                k.msg = "invalid stored block lengths", L.mode = 30;
                break;
              }
              if (L.length = 65535 & tA, G = tA = 0, L.mode = 15, q === 6) break A;
            case 15:
              L.mode = 16;
            case 16:
              if (fA = L.length) {
                if (aA < fA && (fA = aA), dA < fA && (fA = dA), fA === 0) break A;
                f.arraySet(lA, $, rA, fA, vA), aA -= fA, rA += fA, dA -= fA, vA += fA, L.length -= fA;
                break;
              }
              L.mode = 12;
              break;
            case 17:
              for (; G < 14; ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if (L.nlen = 257 + (31 & tA), tA >>>= 5, G -= 5, L.ndist = 1 + (31 & tA), tA >>>= 5, G -= 5, L.ncode = 4 + (15 & tA), tA >>>= 4, G -= 4, 286 < L.nlen || 30 < L.ndist) {
                k.msg = "too many length or distance symbols", L.mode = 30;
                break;
              }
              L.have = 0, L.mode = 18;
            case 18:
              for (; L.have < L.ncode; ) {
                for (; G < 3; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                L.lens[j[L.have++]] = 7 & tA, tA >>>= 3, G -= 3;
              }
              for (; L.have < 19; ) L.lens[j[L.have++]] = 0;
              if (L.lencode = L.lendyn, L.lenbits = 7, D = { bits: L.lenbits }, eA = U(0, L.lens, 0, 19, L.lencode, 0, L.work, D), L.lenbits = D.bits, eA) {
                k.msg = "invalid code lengths set", L.mode = 30;
                break;
              }
              L.have = 0, L.mode = 19;
            case 19:
              for (; L.have < L.nlen + L.ndist; ) {
                for (; J = (u = L.lencode[tA & (1 << L.lenbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= G); ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                if (z < 16) tA >>>= y, G -= y, L.lens[L.have++] = z;
                else {
                  if (z === 16) {
                    for (l = y + 2; G < l; ) {
                      if (aA === 0) break A;
                      aA--, tA += $[rA++] << G, G += 8;
                    }
                    if (tA >>>= y, G -= y, L.have === 0) {
                      k.msg = "invalid bit length repeat", L.mode = 30;
                      break;
                    }
                    m = L.lens[L.have - 1], fA = 3 + (3 & tA), tA >>>= 2, G -= 2;
                  } else if (z === 17) {
                    for (l = y + 3; G < l; ) {
                      if (aA === 0) break A;
                      aA--, tA += $[rA++] << G, G += 8;
                    }
                    G -= y, m = 0, fA = 3 + (7 & (tA >>>= y)), tA >>>= 3, G -= 3;
                  } else {
                    for (l = y + 7; G < l; ) {
                      if (aA === 0) break A;
                      aA--, tA += $[rA++] << G, G += 8;
                    }
                    G -= y, m = 0, fA = 11 + (127 & (tA >>>= y)), tA >>>= 7, G -= 7;
                  }
                  if (L.have + fA > L.nlen + L.ndist) {
                    k.msg = "invalid bit length repeat", L.mode = 30;
                    break;
                  }
                  for (; fA--; ) L.lens[L.have++] = m;
                }
              }
              if (L.mode === 30) break;
              if (L.lens[256] === 0) {
                k.msg = "invalid code -- missing end-of-block", L.mode = 30;
                break;
              }
              if (L.lenbits = 9, D = { bits: L.lenbits }, eA = U(F, L.lens, 0, L.nlen, L.lencode, 0, L.work, D), L.lenbits = D.bits, eA) {
                k.msg = "invalid literal/lengths set", L.mode = 30;
                break;
              }
              if (L.distbits = 6, L.distcode = L.distdyn, D = { bits: L.distbits }, eA = U(B, L.lens, L.nlen, L.ndist, L.distcode, 0, L.work, D), L.distbits = D.bits, eA) {
                k.msg = "invalid distances set", L.mode = 30;
                break;
              }
              if (L.mode = 20, q === 6) break A;
            case 20:
              L.mode = 21;
            case 21:
              if (6 <= aA && 258 <= dA) {
                k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = aA, L.hold = tA, L.bits = G, d(k, sA), vA = k.next_out, lA = k.output, dA = k.avail_out, rA = k.next_in, $ = k.input, aA = k.avail_in, tA = L.hold, G = L.bits, L.mode === 12 && (L.back = -1);
                break;
              }
              for (L.back = 0; J = (u = L.lencode[tA & (1 << L.lenbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= G); ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if (J && (240 & J) == 0) {
                for (pA = y, P = J, V = z; J = (u = L.lencode[V + ((tA & (1 << pA + P) - 1) >> pA)]) >>> 16 & 255, z = 65535 & u, !(pA + (y = u >>> 24) <= G); ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                tA >>>= pA, G -= pA, L.back += pA;
              }
              if (tA >>>= y, G -= y, L.back += y, L.length = z, J === 0) {
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
                for (l = L.extra; G < l; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                L.length += tA & (1 << L.extra) - 1, tA >>>= L.extra, G -= L.extra, L.back += L.extra;
              }
              L.was = L.length, L.mode = 23;
            case 23:
              for (; J = (u = L.distcode[tA & (1 << L.distbits) - 1]) >>> 16 & 255, z = 65535 & u, !((y = u >>> 24) <= G); ) {
                if (aA === 0) break A;
                aA--, tA += $[rA++] << G, G += 8;
              }
              if ((240 & J) == 0) {
                for (pA = y, P = J, V = z; J = (u = L.distcode[V + ((tA & (1 << pA + P) - 1) >> pA)]) >>> 16 & 255, z = 65535 & u, !(pA + (y = u >>> 24) <= G); ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                tA >>>= pA, G -= pA, L.back += pA;
              }
              if (tA >>>= y, G -= y, L.back += y, 64 & J) {
                k.msg = "invalid distance code", L.mode = 30;
                break;
              }
              L.offset = z, L.extra = 15 & J, L.mode = 24;
            case 24:
              if (L.extra) {
                for (l = L.extra; G < l; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                L.offset += tA & (1 << L.extra) - 1, tA >>>= L.extra, G -= L.extra, L.back += L.extra;
              }
              if (L.offset > L.dmax) {
                k.msg = "invalid distance too far back", L.mode = 30;
                break;
              }
              L.mode = 25;
            case 25:
              if (dA === 0) break A;
              if (fA = sA - dA, L.offset > fA) {
                if ((fA = L.offset - fA) > L.whave && L.sane) {
                  k.msg = "invalid distance too far back", L.mode = 30;
                  break;
                }
                _A = fA > L.wnext ? (fA -= L.wnext, L.wsize - fA) : L.wnext - fA, fA > L.length && (fA = L.length), H = L.window;
              } else H = lA, _A = vA - L.offset, fA = L.length;
              for (dA < fA && (fA = dA), dA -= fA, L.length -= fA; lA[vA++] = H[_A++], --fA; ) ;
              L.length === 0 && (L.mode = 21);
              break;
            case 26:
              if (dA === 0) break A;
              lA[vA++] = L.length, dA--, L.mode = 21;
              break;
            case 27:
              if (L.wrap) {
                for (; G < 32; ) {
                  if (aA === 0) break A;
                  aA--, tA |= $[rA++] << G, G += 8;
                }
                if (sA -= dA, k.total_out += sA, L.total += sA, sA && (k.adler = L.check = L.flags ? o(L.check, lA, sA, vA - sA) : s(L.check, lA, sA, vA - sA)), sA = dA, (L.flags ? tA : T(tA)) !== L.check) {
                  k.msg = "incorrect data check", L.mode = 30;
                  break;
                }
                G = tA = 0;
              }
              L.mode = 28;
            case 28:
              if (L.wrap && L.flags) {
                for (; G < 32; ) {
                  if (aA === 0) break A;
                  aA--, tA += $[rA++] << G, G += 8;
                }
                if (tA !== (4294967295 & L.total)) {
                  k.msg = "incorrect length check", L.mode = 30;
                  break;
                }
                G = tA = 0;
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
              return E;
          }
          return k.next_out = vA, k.avail_out = dA, k.next_in = rA, k.avail_in = aA, L.hold = tA, L.bits = G, (L.wsize || sA !== k.avail_out && L.mode < 30 && (L.mode < 27 || q !== 4)) && uA(k, k.output, k.next_out, sA - k.avail_out) ? (L.mode = 31, -4) : (iA -= k.avail_in, sA -= k.avail_out, k.total_in += iA, k.total_out += sA, L.total += sA, L.wrap && sA && (k.adler = L.check = L.flags ? o(L.check, lA, sA, k.next_out - sA) : s(L.check, lA, sA, k.next_out - sA)), k.data_type = L.bits + (L.last ? 64 : 0) + (L.mode === 12 ? 128 : 0) + (L.mode === 20 || L.mode === 15 ? 256 : 0), (iA == 0 && sA === 0 || q === 4) && eA === _ && (eA = -5), eA);
        }, h.inflateEnd = function(k) {
          if (!k || !k.state) return E;
          var q = k.state;
          return q.window && (q.window = null), k.state = null, _;
        }, h.inflateGetHeader = function(k, q) {
          var L;
          return k && k.state ? (2 & (L = k.state).wrap) == 0 ? E : ((L.head = q).done = !1, _) : E;
        }, h.inflateSetDictionary = function(k, q) {
          var L, $ = q.length;
          return k && k.state ? (L = k.state).wrap !== 0 && L.mode !== 11 ? E : L.mode === 11 && s(1, q, $, 0) !== L.check ? -3 : uA(k, q, $, $) ? (L.mode = 31, -4) : (L.havedict = 1, _) : E;
        }, h.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, c, h) {
        "use strict";
        var f = r("../utils/common"), s = [
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
        c.exports = function(F, B, _, E, v, w, b, T) {
          var x, N, R, C, g, O, M, I, Z, uA = T.bits, k = 0, q = 0, L = 0, $ = 0, lA = 0, rA = 0, vA = 0, aA = 0, dA = 0, tA = 0, G = null, iA = 0, sA = new f.Buf16(16), fA = new f.Buf16(16), _A = null, H = 0;
          for (k = 0; k <= 15; k++) sA[k] = 0;
          for (q = 0; q < E; q++) sA[B[_ + q]]++;
          for (lA = uA, $ = 15; 1 <= $ && sA[$] === 0; $--) ;
          if ($ < lA && (lA = $), $ === 0) return v[w++] = 20971520, v[w++] = 20971520, T.bits = 1, 0;
          for (L = 1; L < $ && sA[L] === 0; L++) ;
          for (lA < L && (lA = L), k = aA = 1; k <= 15; k++) if (aA <<= 1, (aA -= sA[k]) < 0) return -1;
          if (0 < aA && (F === 0 || $ !== 1)) return -1;
          for (fA[1] = 0, k = 1; k < 15; k++) fA[k + 1] = fA[k] + sA[k];
          for (q = 0; q < E; q++) B[_ + q] !== 0 && (b[fA[B[_ + q]]++] = q);
          if (O = F === 0 ? (G = _A = b, 19) : F === 1 ? (G = s, iA -= 257, _A = o, H -= 257, 256) : (G = d, _A = U, -1), k = L, g = w, vA = q = tA = 0, R = -1, C = (dA = 1 << (rA = lA)) - 1, F === 1 && 852 < dA || F === 2 && 592 < dA) return 1;
          for (; ; ) {
            for (M = k - vA, Z = b[q] < O ? (I = 0, b[q]) : b[q] > O ? (I = _A[H + b[q]], G[iA + b[q]]) : (I = 96, 0), x = 1 << k - vA, L = N = 1 << rA; v[g + (tA >> vA) + (N -= x)] = M << 24 | I << 16 | Z | 0, N !== 0; ) ;
            for (x = 1 << k - 1; tA & x; ) x >>= 1;
            if (x !== 0 ? (tA &= x - 1, tA += x) : tA = 0, q++, --sA[k] == 0) {
              if (k === $) break;
              k = B[_ + b[q]];
            }
            if (lA < k && (tA & C) !== R) {
              for (vA === 0 && (vA = lA), g += L, aA = 1 << (rA = k - vA); rA + vA < $ && !((aA -= sA[rA + vA]) <= 0); ) rA++, aA <<= 1;
              if (dA += 1 << rA, F === 1 && 852 < dA || F === 2 && 592 < dA) return 1;
              v[R = tA & C] = lA << 24 | rA << 16 | g - w | 0;
            }
          }
          return tA !== 0 && (v[g + tA] = k - vA << 24 | 4194304), T.bits = lA, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, c, h) {
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
      52: [function(r, c, h) {
        "use strict";
        var f = r("../utils/common"), s = 0, o = 1;
        function d(u) {
          for (var Q = u.length; 0 <= --Q; ) u[Q] = 0;
        }
        var U = 0, F = 29, B = 256, _ = B + 1 + F, E = 30, v = 19, w = 2 * _ + 1, b = 15, T = 16, x = 7, N = 256, R = 16, C = 17, g = 18, O = [
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
        ], M = [
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
        ], I = [
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
        ], Z = [
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
        ], uA = new Array(2 * (_ + 2));
        d(uA);
        var k = new Array(2 * E);
        d(k);
        var q = new Array(512);
        d(q);
        var L = new Array(256);
        d(L);
        var $ = new Array(F);
        d($);
        var lA, rA, vA, aA = new Array(E);
        function dA(u, Q, j, AA, Y) {
          this.static_tree = u, this.extra_bits = Q, this.extra_base = j, this.elems = AA, this.max_length = Y, this.has_stree = u && u.length;
        }
        function tA(u, Q) {
          this.dyn_tree = u, this.max_code = 0, this.stat_desc = Q;
        }
        function G(u) {
          return u < 256 ? q[u] : q[256 + (u >>> 7)];
        }
        function iA(u, Q) {
          u.pending_buf[u.pending++] = 255 & Q, u.pending_buf[u.pending++] = Q >>> 8 & 255;
        }
        function sA(u, Q, j) {
          u.bi_valid > T - j ? (u.bi_buf |= Q << u.bi_valid & 65535, iA(u, u.bi_buf), u.bi_buf = Q >> T - u.bi_valid, u.bi_valid += j - T) : (u.bi_buf |= Q << u.bi_valid & 65535, u.bi_valid += j);
        }
        function fA(u, Q, j) {
          sA(u, j[2 * Q], j[2 * Q + 1]);
        }
        function _A(u, Q) {
          for (var j = 0; j |= 1 & u, u >>>= 1, j <<= 1, 0 < --Q; ) ;
          return j >>> 1;
        }
        function H(u, Q, j) {
          var AA, Y, gA = new Array(b + 1), yA = 0;
          for (AA = 1; AA <= b; AA++) gA[AA] = yA = yA + j[AA - 1] << 1;
          for (Y = 0; Y <= Q; Y++) {
            var BA = u[2 * Y + 1];
            BA !== 0 && (u[2 * Y] = _A(gA[BA]++, BA));
          }
        }
        function y(u) {
          var Q;
          for (Q = 0; Q < _; Q++) u.dyn_ltree[2 * Q] = 0;
          for (Q = 0; Q < E; Q++) u.dyn_dtree[2 * Q] = 0;
          for (Q = 0; Q < v; Q++) u.bl_tree[2 * Q] = 0;
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
        function P(u, Q, j) {
          var AA, Y, gA, yA, BA = 0;
          if (u.last_lit !== 0) for (; AA = u.pending_buf[u.d_buf + 2 * BA] << 8 | u.pending_buf[u.d_buf + 2 * BA + 1], Y = u.pending_buf[u.l_buf + BA], BA++, AA === 0 ? fA(u, Y, Q) : (fA(u, (gA = L[Y]) + B + 1, Q), (yA = O[gA]) !== 0 && sA(u, Y -= $[gA], yA), fA(u, gA = G(--AA), j), (yA = M[gA]) !== 0 && sA(u, AA -= aA[gA], yA)), BA < u.last_lit; ) ;
          fA(u, N, Q);
        }
        function V(u, Q) {
          var j, AA, Y, gA = Q.dyn_tree, yA = Q.stat_desc.static_tree, BA = Q.stat_desc.has_stree, QA = Q.stat_desc.elems, xA = -1;
          for (u.heap_len = 0, u.heap_max = w, j = 0; j < QA; j++) gA[2 * j] !== 0 ? (u.heap[++u.heap_len] = xA = j, u.depth[j] = 0) : gA[2 * j + 1] = 0;
          for (; u.heap_len < 2; ) gA[2 * (Y = u.heap[++u.heap_len] = xA < 2 ? ++xA : 0)] = 1, u.depth[Y] = 0, u.opt_len--, BA && (u.static_len -= yA[2 * Y + 1]);
          for (Q.max_code = xA, j = u.heap_len >> 1; 1 <= j; j--) pA(u, gA, j);
          for (Y = QA; j = u.heap[1], u.heap[1] = u.heap[u.heap_len--], pA(u, gA, 1), AA = u.heap[1], u.heap[--u.heap_max] = j, u.heap[--u.heap_max] = AA, gA[2 * Y] = gA[2 * j] + gA[2 * AA], u.depth[Y] = (u.depth[j] >= u.depth[AA] ? u.depth[j] : u.depth[AA]) + 1, gA[2 * j + 1] = gA[2 * AA + 1] = Y, u.heap[1] = Y++, pA(u, gA, 1), 2 <= u.heap_len; ) ;
          u.heap[--u.heap_max] = u.heap[1], (function(RA, Ae) {
            var Be, _e, Ue, te, Je, st, be = Ae.dyn_tree, Wt = Ae.max_code, yr = Ae.stat_desc.static_tree, Ut = Ae.stat_desc.has_stree, Cr = Ae.stat_desc.extra_bits, bt = Ae.stat_desc.extra_base, Oe = Ae.stat_desc.max_length, ot = 0;
            for (te = 0; te <= b; te++) RA.bl_count[te] = 0;
            for (be[2 * RA.heap[RA.heap_max] + 1] = 0, Be = RA.heap_max + 1; Be < w; Be++) Oe < (te = be[2 * be[2 * (_e = RA.heap[Be]) + 1] + 1] + 1) && (te = Oe, ot++), be[2 * _e + 1] = te, Wt < _e || (RA.bl_count[te]++, Je = 0, bt <= _e && (Je = Cr[_e - bt]), st = be[2 * _e], RA.opt_len += st * (te + Je), Ut && (RA.static_len += st * (yr[2 * _e + 1] + Je)));
            if (ot !== 0) {
              do {
                for (te = Oe - 1; RA.bl_count[te] === 0; ) te--;
                RA.bl_count[te]--, RA.bl_count[te + 1] += 2, RA.bl_count[Oe]--, ot -= 2;
              } while (0 < ot);
              for (te = Oe; te !== 0; te--) for (_e = RA.bl_count[te]; _e !== 0; ) Wt < (Ue = RA.heap[--Be]) || (be[2 * Ue + 1] !== te && (RA.opt_len += (te - be[2 * Ue + 1]) * be[2 * Ue], be[2 * Ue + 1] = te), _e--);
            }
          })(u, Q), H(gA, xA, u.bl_count);
        }
        function m(u, Q, j) {
          var AA, Y, gA = -1, yA = Q[1], BA = 0, QA = 7, xA = 4;
          for (yA === 0 && (QA = 138, xA = 3), Q[2 * (j + 1) + 1] = 65535, AA = 0; AA <= j; AA++) Y = yA, yA = Q[2 * (AA + 1) + 1], ++BA < QA && Y === yA || (BA < xA ? u.bl_tree[2 * Y] += BA : Y !== 0 ? (Y !== gA && u.bl_tree[2 * Y]++, u.bl_tree[2 * R]++) : BA <= 10 ? u.bl_tree[2 * C]++ : u.bl_tree[2 * g]++, gA = Y, xA = (BA = 0) === yA ? (QA = 138, 3) : Y === yA ? (QA = 6, 3) : (QA = 7, 4));
        }
        function eA(u, Q, j) {
          var AA, Y, gA = -1, yA = Q[1], BA = 0, QA = 7, xA = 4;
          for (yA === 0 && (QA = 138, xA = 3), AA = 0; AA <= j; AA++) if (Y = yA, yA = Q[2 * (AA + 1) + 1], !(++BA < QA && Y === yA)) {
            if (BA < xA) for (; fA(u, Y, u.bl_tree), --BA != 0; ) ;
            else Y !== 0 ? (Y !== gA && (fA(u, Y, u.bl_tree), BA--), fA(u, R, u.bl_tree), sA(u, BA - 3, 2)) : BA <= 10 ? (fA(u, C, u.bl_tree), sA(u, BA - 3, 3)) : (fA(u, g, u.bl_tree), sA(u, BA - 11, 7));
            gA = Y, xA = (BA = 0) === yA ? (QA = 138, 3) : Y === yA ? (QA = 6, 3) : (QA = 7, 4);
          }
        }
        d(aA);
        var D = !1;
        function l(u, Q, j, AA) {
          sA(u, (U << 1) + (AA ? 1 : 0), 3), (function(Y, gA, yA, BA) {
            J(Y), BA && (iA(Y, yA), iA(Y, ~yA)), f.arraySet(Y.pending_buf, Y.window, gA, yA, Y.pending), Y.pending += yA;
          })(u, Q, j, !0);
        }
        h._tr_init = function(u) {
          D || ((function() {
            var Q, j, AA, Y, gA, yA = new Array(b + 1);
            for (Y = AA = 0; Y < F - 1; Y++) for ($[Y] = AA, Q = 0; Q < 1 << O[Y]; Q++) L[AA++] = Y;
            for (L[AA - 1] = Y, Y = gA = 0; Y < 16; Y++) for (aA[Y] = gA, Q = 0; Q < 1 << M[Y]; Q++) q[gA++] = Y;
            for (gA >>= 7; Y < E; Y++) for (aA[Y] = gA << 7, Q = 0; Q < 1 << M[Y] - 7; Q++) q[256 + gA++] = Y;
            for (j = 0; j <= b; j++) yA[j] = 0;
            for (Q = 0; Q <= 143; ) uA[2 * Q + 1] = 8, Q++, yA[8]++;
            for (; Q <= 255; ) uA[2 * Q + 1] = 9, Q++, yA[9]++;
            for (; Q <= 279; ) uA[2 * Q + 1] = 7, Q++, yA[7]++;
            for (; Q <= 287; ) uA[2 * Q + 1] = 8, Q++, yA[8]++;
            for (H(uA, _ + 1, yA), Q = 0; Q < E; Q++) k[2 * Q + 1] = 5, k[2 * Q] = _A(Q, 5);
            lA = new dA(uA, O, B + 1, _, b), rA = new dA(k, M, 0, E, b), vA = new dA(new Array(0), I, 0, v, x);
          })(), D = !0), u.l_desc = new tA(u.dyn_ltree, lA), u.d_desc = new tA(u.dyn_dtree, rA), u.bl_desc = new tA(u.bl_tree, vA), u.bi_buf = 0, u.bi_valid = 0, y(u);
        }, h._tr_stored_block = l, h._tr_flush_block = function(u, Q, j, AA) {
          var Y, gA, yA = 0;
          0 < u.level ? (u.strm.data_type === 2 && (u.strm.data_type = (function(BA) {
            var QA, xA = 4093624447;
            for (QA = 0; QA <= 31; QA++, xA >>>= 1) if (1 & xA && BA.dyn_ltree[2 * QA] !== 0) return s;
            if (BA.dyn_ltree[18] !== 0 || BA.dyn_ltree[20] !== 0 || BA.dyn_ltree[26] !== 0) return o;
            for (QA = 32; QA < B; QA++) if (BA.dyn_ltree[2 * QA] !== 0) return o;
            return s;
          })(u)), V(u, u.l_desc), V(u, u.d_desc), yA = (function(BA) {
            var QA;
            for (m(BA, BA.dyn_ltree, BA.l_desc.max_code), m(BA, BA.dyn_dtree, BA.d_desc.max_code), V(BA, BA.bl_desc), QA = v - 1; 3 <= QA && BA.bl_tree[2 * Z[QA] + 1] === 0; QA--) ;
            return BA.opt_len += 3 * (QA + 1) + 5 + 5 + 4, QA;
          })(u), Y = u.opt_len + 3 + 7 >>> 3, (gA = u.static_len + 3 + 7 >>> 3) <= Y && (Y = gA)) : Y = gA = j + 5, j + 4 <= Y && Q !== -1 ? l(u, Q, j, AA) : u.strategy === 4 || gA === Y ? (sA(u, 2 + (AA ? 1 : 0), 3), P(u, uA, k)) : (sA(u, 4 + (AA ? 1 : 0), 3), (function(BA, QA, xA, RA) {
            var Ae;
            for (sA(BA, QA - 257, 5), sA(BA, xA - 1, 5), sA(BA, RA - 4, 4), Ae = 0; Ae < RA; Ae++) sA(BA, BA.bl_tree[2 * Z[Ae] + 1], 3);
            eA(BA, BA.dyn_ltree, QA - 1), eA(BA, BA.dyn_dtree, xA - 1);
          })(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, yA + 1), P(u, u.dyn_ltree, u.dyn_dtree)), y(u), AA && J(u);
        }, h._tr_tally = function(u, Q, j) {
          return u.pending_buf[u.d_buf + 2 * u.last_lit] = Q >>> 8 & 255, u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & Q, u.pending_buf[u.l_buf + u.last_lit] = 255 & j, u.last_lit++, Q === 0 ? u.dyn_ltree[2 * j]++ : (u.matches++, Q--, u.dyn_ltree[2 * (L[j] + B + 1)]++, u.dyn_dtree[2 * G(Q)]++), u.last_lit === u.lit_bufsize - 1;
        }, h._tr_align = function(u) {
          sA(u, 2, 3), fA(u, N, uA), (function(Q) {
            Q.bi_valid === 16 ? (iA(Q, Q.bi_buf), Q.bi_buf = 0, Q.bi_valid = 0) : 8 <= Q.bi_valid && (Q.pending_buf[Q.pending++] = 255 & Q.bi_buf, Q.bi_buf >>= 8, Q.bi_valid -= 8);
          })(u);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, c, h) {
        "use strict";
        c.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, c, h) {
        (function(f) {
          (function(s, o) {
            "use strict";
            if (!s.setImmediate) {
              var d, U, F, B, _ = 1, E = {}, v = !1, w = s.document, b = Object.getPrototypeOf && Object.getPrototypeOf(s);
              b = b && b.setTimeout ? b : s, d = {}.toString.call(s.process) === "[object process]" ? function(R) {
                MA.nextTick(function() {
                  x(R);
                });
              } : (function() {
                if (s.postMessage && !s.importScripts) {
                  var R = !0, C = s.onmessage;
                  return s.onmessage = function() {
                    R = !1;
                  }, s.postMessage("", "*"), s.onmessage = C, R;
                }
              })() ? (B = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", N, !1) : s.attachEvent("onmessage", N), function(R) {
                s.postMessage(B + R, "*");
              }) : s.MessageChannel ? ((F = new MessageChannel()).port1.onmessage = function(R) {
                x(R.data);
              }, function(R) {
                F.port2.postMessage(R);
              }) : w && "onreadystatechange" in w.createElement("script") ? (U = w.documentElement, function(R) {
                var C = w.createElement("script");
                C.onreadystatechange = function() {
                  x(R), C.onreadystatechange = null, U.removeChild(C), C = null;
                }, U.appendChild(C);
              }) : function(R) {
                setTimeout(x, 0, R);
              }, b.setImmediate = function(R) {
                typeof R != "function" && (R = new Function("" + R));
                for (var C = new Array(arguments.length - 1), g = 0; g < C.length; g++) C[g] = arguments[g + 1];
                return E[_] = {
                  callback: R,
                  args: C
                }, d(_), _++;
              }, b.clearImmediate = T;
            }
            function T(R) {
              delete E[R];
            }
            function x(R) {
              if (v) setTimeout(x, 0, R);
              else {
                var C = E[R];
                if (C) {
                  v = !0;
                  try {
                    (function(g) {
                      var O = g.callback, M = g.args;
                      switch (M.length) {
                        case 0:
                          O();
                          break;
                        case 1:
                          O(M[0]);
                          break;
                        case 2:
                          O(M[0], M[1]);
                          break;
                        case 3:
                          O(M[0], M[1], M[2]);
                          break;
                        default:
                          O.apply(o, M);
                      }
                    })(C);
                  } finally {
                    T(R), v = !1;
                  }
                }
              }
            }
            function N(R) {
              R.source === s && typeof R.data == "string" && R.data.indexOf(B) === 0 && x(+R.data.slice(B.length));
            }
          })(typeof self > "u" ? f === void 0 ? this : f : self);
        }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), v0 = /* @__PURE__ */ FA(((A, i) => {
  var r = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function c(h) {
    return h && h.replace ? h.replace(/([&"<>'])/g, function(f, s) {
      return r[s];
    }) : h;
  }
  i.exports = c;
})), y0 = /* @__PURE__ */ FA(((A, i) => {
  Ct();
  var r = v0(), c = Qa().Stream, h = "    ";
  function f(B, _) {
    typeof _ != "object" && (_ = { indent: _ });
    var E = _.stream ? new c() : null, v = "", w = !1, b = _.indent ? _.indent === !0 ? h : _.indent : "", T = !0;
    function x(O) {
      T ? MA.nextTick(O) : O();
    }
    function N(O, M) {
      if (M !== void 0 && (v += M), O && !w && (E = E || new c(), w = !0), O && w) {
        var I = v;
        x(function() {
          E.emit("data", I);
        }), v = "";
      }
    }
    function R(O, M) {
      U(N, d(O, b, b ? 1 : 0), M);
    }
    function C() {
      if (E) {
        var O = v;
        x(function() {
          E.emit("data", O), E.emit("end"), E.readable = !1, E.emit("close");
        });
      }
    }
    function g(O) {
      var M = {
        version: "1.0",
        encoding: O.encoding || "UTF-8"
      };
      O.standalone && (M.standalone = O.standalone), R({ "?xml": { _attr: M } }), v = v.replace("/>", "?>");
    }
    return x(function() {
      T = !1;
    }), _.declaration && g(_.declaration), B && B.forEach ? B.forEach(function(O, M) {
      var I;
      M + 1 === B.length && (I = C), R(O, I);
    }) : R(B, C), E ? (E.readable = !0, E) : v;
  }
  function s() {
    var B = { _elem: d(Array.prototype.slice.call(arguments)) };
    return B.push = function(_) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var E = this, v = this._elem.indent;
      U(this.append, d(_, v, this._elem.icount + (v ? 1 : 0)), function() {
        E.append(!0);
      });
    }, B.close = function(_) {
      _ !== void 0 && this.push(_), this.end && this.end();
    }, B;
  }
  function o(B, _) {
    return new Array(_ || 0).join(B || "");
  }
  function d(B, _, E) {
    E = E || 0;
    var v = o(_, E), w, b = B, T = !1;
    if (typeof B == "object" && (w = Object.keys(B)[0], b = B[w], b && b._elem))
      return b._elem.name = w, b._elem.icount = E, b._elem.indent = _, b._elem.indents = v, b._elem.interrupt = b, b._elem;
    var x = [], N = [], R;
    function C(g) {
      Object.keys(g).forEach(function(O) {
        x.push(F(O, g[O]));
      });
    }
    switch (typeof b) {
      case "object":
        if (b === null) break;
        b._attr && C(b._attr), b._cdata && N.push(("<![CDATA[" + b._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), b.forEach && (R = !1, N.push(""), b.forEach(function(g) {
          typeof g == "object" ? Object.keys(g)[0] == "_attr" ? C(g._attr) : N.push(d(g, _, E + 1)) : (N.pop(), R = !0, N.push(r(g)));
        }), R || N.push(""));
        break;
      default:
        N.push(r(b));
    }
    return {
      name: w,
      interrupt: T,
      attributes: x,
      content: N,
      icount: E,
      indents: v,
      indent: _
    };
  }
  function U(B, _, E) {
    if (typeof _ != "object") return B(!1, _);
    var v = _.interrupt ? 1 : _.content.length;
    function w() {
      for (; _.content.length; ) {
        var T = _.content.shift();
        if (T !== void 0) {
          if (b(T)) return;
          U(B, T);
        }
      }
      B(!1, (v > 1 ? _.indents : "") + (_.name ? "</" + _.name + ">" : "") + (_.indent && !E ? `
` : "")), E && E();
    }
    function b(T) {
      return T.interrupt ? (T.interrupt.append = B, T.interrupt.end = w, T.interrupt = !1, B(!0), !0) : !1;
    }
    if (B(!1, _.indents + (_.name ? "<" + _.name : "") + (_.attributes.length ? " " + _.attributes.join(" ") : "") + (v ? _.name ? ">" : "" : _.name ? "/>" : "") + (_.indent && v > 1 ? `
` : "")), !v) return B(!1, _.indent ? `
` : "");
    b(_) || w();
  }
  function F(B, _) {
    return B + '="' + r(_) + '"';
  }
  i.exports = f, i.exports.element = i.exports.Element = s;
})), C0 = Qa(), ur = /* @__PURE__ */ Ba(m0(), 1), qA = /* @__PURE__ */ Ba(y0(), 1), Kr = 0, ta = 32, F0 = 32, E0 = (A, i) => {
  const r = i.replace(/-/g, "");
  if (r.length !== F0) throw new Error(`Error: Cannot extract GUID from font filename: ${i}`);
  const c = r.replace(/(..)/g, "$1 ").trim().split(" ").map((s) => parseInt(s, 16));
  c.reverse();
  const h = A.slice(Kr, ta).map((s, o) => s ^ c[o % c.length]), f = new Uint8Array(Kr + h.length + Math.max(0, A.length - ta));
  return f.set(A.slice(0, Kr)), f.set(h, Kr), f.set(A.slice(ta), Kr + h.length), f;
}, La = class {
  format(A, i = { stack: [] }) {
    const r = A.prepForXml(i);
    if (r) return r;
    throw Error("XMLComponent did not format correctly");
  }
}, Cu = class {
  replace(A, i, r) {
    let c = A;
    return i.forEach((h, f) => {
      c = c.replace(new RegExp(`{${h.fileName}}`, "g"), (r + f).toString());
    }), c;
  }
  getMediaData(A, i) {
    return i.Array.filter((r) => A.search(`{${r.fileName}}`) > 0);
  }
}, Q0 = class {
  replace(A, i) {
    let r = A;
    for (const c of i) r = r.replace(new RegExp(`{${c.reference}-${c.instance}}`, "g"), c.numId.toString());
    return r;
  }
}, U0 = class {
  constructor() {
    hA(this, "formatter", void 0), hA(this, "imageReplacer", void 0), hA(this, "numberingReplacer", void 0), this.formatter = new La(), this.imageReplacer = new Cu(), this.numberingReplacer = new Q0();
  }
  compile(A, i, r = []) {
    const c = new ur.default(), h = this.xmlifyFile(A, i), f = new Map(Object.entries(h));
    for (const [, s] of f) if (Array.isArray(s)) for (const o of s) c.file(o.path, Gn(o.data));
    else c.file(s.path, Gn(s.data));
    for (const s of r) c.file(s.path, Gn(s.data));
    for (const s of A.Media.Array) s.type !== "svg" ? c.file(`word/media/${s.fileName}`, s.data) : (c.file(`word/media/${s.fileName}`, s.data), c.file(`word/media/${s.fallback.fileName}`, s.fallback.data));
    for (const [s, { data: o, fontKey: d }] of A.FontTable.fontOptionsWithKey.entries()) c.file(`word/fonts/font${s + 1}.odttf`, E0(o, d));
    return c;
  }
  xmlifyFile(A, i) {
    const r = A.Document.Relationships.RelationshipCount + 1, c = (0, qA.default)(this.formatter.format(A.Document.View, {
      viewWrapper: A.Document,
      file: A,
      stack: []
    }), {
      indent: i,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), h = A.Comments.Relationships.RelationshipCount + 1, f = (0, qA.default)(this.formatter.format(A.Comments, {
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
    }), s = A.FootNotes.Relationships.RelationshipCount + 1, o = (0, qA.default)(this.formatter.format(A.FootNotes.View, {
      viewWrapper: A.FootNotes,
      file: A,
      stack: []
    }), {
      indent: i,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), d = this.imageReplacer.getMediaData(c, A.Media), U = this.imageReplacer.getMediaData(f, A.Media), F = this.imageReplacer.getMediaData(o, A.Media);
    return UA(UA({
      Relationships: {
        data: (d.forEach((B, _) => {
          A.Document.Relationships.addRelationship(r + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${B.fileName}`);
        }), A.Document.Relationships.addRelationship(A.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, qA.default)(this.formatter.format(A.Document.Relationships, {
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
          const B = this.imageReplacer.replace(c, d, r);
          return this.numberingReplacer.replace(B, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const B = (0, qA.default)(this.formatter.format(A.Styles, {
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
          return this.numberingReplacer.replace(B, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: (0, qA.default)(this.formatter.format(A.CoreProperties, {
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
        data: (0, qA.default)(this.formatter.format(A.Numbering, {
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
        data: (0, qA.default)(this.formatter.format(A.FileRelationships, {
          viewWrapper: A.Document,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: A.Headers.map((B, _) => {
        const E = (0, qA.default)(this.formatter.format(B.View, {
          viewWrapper: B,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(E, A.Media).forEach((v, w) => {
          B.Relationships.addRelationship(w, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), {
          data: (0, qA.default)(this.formatter.format(B.Relationships, {
            viewWrapper: B,
            file: A,
            stack: []
          }), {
            indent: i,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${_ + 1}.xml.rels`
        };
      }),
      FooterRelationships: A.Footers.map((B, _) => {
        const E = (0, qA.default)(this.formatter.format(B.View, {
          viewWrapper: B,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(E, A.Media).forEach((v, w) => {
          B.Relationships.addRelationship(w, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), {
          data: (0, qA.default)(this.formatter.format(B.Relationships, {
            viewWrapper: B,
            file: A,
            stack: []
          }), {
            indent: i,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${_ + 1}.xml.rels`
        };
      }),
      Headers: A.Headers.map((B, _) => {
        const E = (0, qA.default)(this.formatter.format(B.View, {
          viewWrapper: B,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }), v = this.imageReplacer.getMediaData(E, A.Media), w = this.imageReplacer.replace(E, v, 0);
        return {
          data: this.numberingReplacer.replace(w, A.Numbering.ConcreteNumbering),
          path: `word/header${_ + 1}.xml`
        };
      }),
      Footers: A.Footers.map((B, _) => {
        const E = (0, qA.default)(this.formatter.format(B.View, {
          viewWrapper: B,
          file: A,
          stack: []
        }), {
          indent: i,
          declaration: { encoding: "UTF-8" }
        }), v = this.imageReplacer.getMediaData(E, A.Media), w = this.imageReplacer.replace(E, v, 0);
        return {
          data: this.numberingReplacer.replace(w, A.Numbering.ConcreteNumbering),
          path: `word/footer${_ + 1}.xml`
        };
      }),
      ContentTypes: {
        data: (0, qA.default)(this.formatter.format(A.ContentTypes, {
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
        data: (0, qA.default)(this.formatter.format(A.CustomProperties, {
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
        data: (0, qA.default)(this.formatter.format(A.AppProperties, {
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
          const B = this.imageReplacer.replace(o, F, s);
          return this.numberingReplacer.replace(B, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (F.forEach((B, _) => {
          A.FootNotes.Relationships.addRelationship(s + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${B.fileName}`);
        }), (0, qA.default)(this.formatter.format(A.FootNotes.Relationships, {
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
        data: (0, qA.default)(this.formatter.format(A.Endnotes.View, {
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
        data: (0, qA.default)(this.formatter.format(A.Endnotes.Relationships, {
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
        data: (0, qA.default)(this.formatter.format(A.Settings, {
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
          const B = this.imageReplacer.replace(f, U, h);
          return this.numberingReplacer.replace(B, A.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (U.forEach((B, _) => {
          A.Comments.Relationships.addRelationship(h + _, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${B.fileName}`);
        }), (0, qA.default)(this.formatter.format(A.Comments.Relationships, {
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
      data: (0, qA.default)(this.formatter.format(A.CommentsExtended, {
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
        data: (0, qA.default)(this.formatter.format(A.FontTable.View, {
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
        data: (0, qA.default)(this.formatter.format(A.FontTable.Relationships, {
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
function zo(A, i, r, c, h, f, s) {
  try {
    var o = A[f](s), d = o.value;
  } catch (U) {
    r(U);
    return;
  }
  o.done ? i(d) : Promise.resolve(d).then(c, h);
}
function Da(A) {
  return function() {
    var i = this, r = arguments;
    return new Promise(function(c, h) {
      var f = A.apply(i, r);
      function s(d) {
        zo(f, c, h, s, o, "next", d);
      }
      function o(d) {
        zo(f, c, h, s, o, "throw", d);
      }
      s(void 0);
    });
  };
}
var b0 = {
  NONE: "",
  WITH_2_BLANKS: "  ",
  WITH_4_BLANKS: "    ",
  WITH_TAB: "	"
}, Jo = (A) => A === !0 ? b0.WITH_2_BLANKS : A === !1 ? void 0 : A, Fu = class or {
  static pack(i, r, c) {
    var h = this;
    return Da(function* (f, s, o, d = []) {
      return h.compiler.compile(f, Jo(o), d).generateAsync({
        type: s,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    }).apply(this, arguments);
  }
  static toString(i, r, c = []) {
    return or.pack(i, "string", r, c);
  }
  static toBuffer(i, r, c = []) {
    return or.pack(i, "nodebuffer", r, c);
  }
  static toBase64String(i, r, c = []) {
    return or.pack(i, "base64", r, c);
  }
  static toBlob(i, r, c = []) {
    return or.pack(i, "blob", r, c);
  }
  static toArrayBuffer(i, r, c = []) {
    return or.pack(i, "arraybuffer", r, c);
  }
  static toStream(i, r, c = []) {
    const h = new C0.Stream();
    return this.compiler.compile(i, Jo(r), c).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((f) => {
      h.emit("data", f), h.emit("end");
    }), h;
  }
};
hA(Fu, "compiler", new U0());
var I0 = new La(), ni = (A) => (0, Zn.xml2js)(A, {
  compact: !1,
  captureSpacesBetweenElements: !0
}), Eu = (A) => {
  var i;
  return (i = ni((0, qA.default)(I0.format(new ua({ text: A })))).elements[0].elements) !== null && i !== void 0 ? i : [];
}, Qu = (A) => UA(UA({}, A), {}, { attributes: { "xml:space": "preserve" } }), Ra = (A, i) => {
  var r, c;
  return (r = (c = A.elements) === null || c === void 0 ? void 0 : c.filter((h) => h.name === i)[0].elements) !== null && r !== void 0 ? r : [];
}, sr = (A, i, r) => {
  const c = Ra(A, "Types");
  c.some((h) => {
    var f, s;
    return h.type === "element" && h.name === "Default" && (h == null || (f = h.attributes) === null || f === void 0 ? void 0 : f.ContentType) === i && (h == null || (s = h.attributes) === null || s === void 0 ? void 0 : s.Extension) === r;
  }) || c.push({
    attributes: {
      ContentType: i,
      Extension: r
    },
    name: "Default",
    type: "element"
  });
}, _0 = (A) => {
  const i = parseInt(A.substring(3), 10);
  return isNaN(i) ? 0 : i;
}, x0 = (A) => Ra(A, "Relationships").map((i) => {
  var r, c;
  return _0((r = (c = i.attributes) === null || c === void 0 || (c = c.Id) === null || c === void 0 ? void 0 : c.toString()) !== null && r !== void 0 ? r : "");
}).reduce((i, r) => Math.max(i, r), 0) + 1, Yo = (A, i, r, c, h) => {
  const f = Ra(A, "Relationships");
  return f.push({
    attributes: {
      Id: `rId${i}`,
      Type: r,
      Target: c,
      TargetMode: h
    },
    name: "Relationship",
    type: "element"
  }), f;
}, T0 = class extends Error {
  constructor(A) {
    super(`Token ${A} not found`), this.name = "TokenNotFoundError";
  }
}, S0 = (A, i) => {
  var r;
  for (let s = 0; s < ((r = A.elements) !== null && r !== void 0 ? r : []).length; s++) {
    const o = A.elements[s];
    if (o.type === "element" && o.name === "w:r") {
      var c;
      const d = ((c = o.elements) !== null && c !== void 0 ? c : []).filter((U) => U.type === "element" && U.name === "w:t");
      for (const U of d) {
        var h, f;
        if (!((h = U.elements) === null || h === void 0) && h[0] && !((f = U.elements[0].text) === null || f === void 0) && f.includes(i))
          return s;
      }
    }
  }
  throw new T0(i);
}, H0 = (A, i) => {
  var r, c;
  let h = -1;
  const f = (r = (c = A.elements) === null || c === void 0 ? void 0 : c.map((s, o) => {
    if (h !== -1) return s;
    if (s.type === "element" && s.name === "w:t") {
      var d, U;
      const F = ((d = (U = s.elements) === null || U === void 0 || (U = U[0]) === null || U === void 0 ? void 0 : U.text) !== null && d !== void 0 ? d : "").split(i), B = F.map((_) => UA(UA(UA({}, s), Qu(s)), {}, { elements: Eu(_) }));
      return F.length > 1 && (h = o), B;
    } else return s;
  }).flat()) !== null && r !== void 0 ? r : [];
  return {
    left: UA(UA({}, JSON.parse(JSON.stringify(A))), {}, { elements: f.slice(0, h + 1) }),
    right: UA(UA({}, JSON.parse(JSON.stringify(A))), {}, { elements: f.slice(h + 1) })
  };
}, Mr = {
  START: 0,
  MIDDLE: 1,
  END: 2
}, L0 = ({ paragraphElement: A, renderedParagraph: i, originalText: r, replacementText: c }) => {
  const h = i.text.indexOf(r), f = h + r.length - 1;
  let s = Mr.START;
  for (const o of i.runs) for (const { text: d, index: U, start: F, end: B } of o.parts) switch (s) {
    case Mr.START:
      if (h >= F && h <= B) {
        const _ = h - F, E = Math.min(f, B) - F, v = o.text.substring(_, E + 1);
        if (v === "") continue;
        const w = d.replace(v, c);
        ra(A.elements[o.index].elements[U], w), s = Mr.MIDDLE;
        continue;
      }
      break;
    case Mr.MIDDLE:
      if (f <= B) {
        const _ = d.substring(f - F + 1);
        ra(A.elements[o.index].elements[U], _);
        const E = A.elements[o.index].elements[U];
        A.elements[o.index].elements[U] = Qu(E), s = Mr.END;
      } else ra(A.elements[o.index].elements[U], "");
      break;
    default:
  }
  return A;
}, ra = (A, i) => (A.elements = Eu(i), A), D0 = (A) => {
  if (A.element.name !== "w:p") throw new Error(`Invalid node type: ${A.element.name}`);
  if (!A.element.elements) return {
    text: "",
    runs: [],
    index: -1,
    pathToParagraph: []
  };
  let i = 0;
  const r = A.element.elements.map((c, h) => ({
    element: c,
    i: h
  })).filter(({ element: c }) => c.name === "w:r").map(({ element: c, i: h }) => {
    const f = R0(c, h, i);
    return i += f.text.length, f;
  }).filter((c) => !!c);
  return {
    text: r.reduce((c, h) => c + h.text, ""),
    runs: r,
    index: A.index,
    pathToParagraph: Uu(A)
  };
}, R0 = (A, i, r) => {
  if (!A.elements) return {
    text: "",
    parts: [],
    index: -1,
    start: r,
    end: r
  };
  let c = r;
  const h = A.elements.map((f, s) => {
    var o, d;
    return f.name === "w:t" && f.elements && f.elements.length > 0 ? {
      text: (o = (d = f.elements[0].text) === null || d === void 0 ? void 0 : d.toString()) !== null && o !== void 0 ? o : "",
      index: s,
      start: c,
      end: (() => {
        var U, F;
        return c += ((U = (F = f.elements[0].text) === null || F === void 0 ? void 0 : F.toString()) !== null && U !== void 0 ? U : "").length - 1, c;
      })()
    } : void 0;
  }).filter((f) => !!f).map((f) => f);
  return {
    text: h.reduce((f, s) => f + s.text, ""),
    parts: h,
    index: i,
    start: r,
    end: c
  };
}, Uu = (A) => A.parent ? [...Uu(A.parent), A.index] : [A.index], qo = (A) => {
  var i, r;
  return (i = (r = A.element.elements) === null || r === void 0 ? void 0 : r.map((c, h) => ({
    element: c,
    index: h,
    parent: A
  }))) !== null && i !== void 0 ? i : [];
}, bu = (A) => {
  let i = [];
  const r = [...qo({
    element: A,
    index: 0,
    parent: void 0
  })];
  let c;
  for (; r.length > 0; )
    c = r.shift(), c.element.name === "w:p" && (i = [...i, D0(c)]), r.push(...qo(c));
  return i;
}, O0 = (A, i) => bu(A).filter((r) => r.text.includes(i)), N0 = new La(), na = "ɵ", k0 = ({ json: A, patch: i, patchText: r, context: c, keepOriginalStyles: h = !0 }) => {
  const f = O0(A, r);
  if (f.length === 0) return {
    element: A,
    didFindOccurrence: !1
  };
  for (const s of f) {
    const o = i.children.map((d) => ni((0, qA.default)(N0.format(d, c)))).map((d) => d.elements[0]);
    switch (i.type) {
      case Zo.DOCUMENT: {
        const d = K0(A, s.pathToParagraph), U = M0(s.pathToParagraph);
        d.elements.splice(U, 1, ...o);
        break;
      }
      case Zo.PARAGRAPH:
      default: {
        const d = Iu(A, s.pathToParagraph);
        L0({
          paragraphElement: d,
          renderedParagraph: s,
          originalText: r,
          replacementText: na
        });
        const U = S0(d, na), F = d.elements[U], { left: B, right: _ } = H0(F, na);
        let E = o, v = _;
        if (h) {
          const w = F.elements.filter((b) => b.type === "element" && b.name === "w:rPr");
          E = o.map((b) => {
            var T;
            return UA(UA({}, b), {}, { elements: [...w, ...(T = b.elements) !== null && T !== void 0 ? T : []] });
          }), v = UA(UA({}, _), {}, { elements: [...w, ..._.elements] });
        }
        d.elements.splice(U, 1, B, ...E, v);
        break;
      }
    }
  }
  return {
    element: A,
    didFindOccurrence: !0
  };
}, Iu = (A, i) => {
  let r = A;
  for (let c = 1; c < i.length; c++) {
    const h = i[c];
    r = r.elements[h];
  }
  return r;
}, K0 = (A, i) => Iu(A, i.slice(0, i.length - 1)), M0 = (A) => A[A.length - 1], Zo = {
  DOCUMENT: "file",
  PARAGRAPH: "paragraph"
}, $o = new Cu(), P0 = new Uint8Array([255, 254]), G0 = new Uint8Array([254, 255]), Al = (A, i) => {
  if (A.length !== i.length) return !1;
  for (let r = 0; r < A.length; r++) if (A[r] !== i[r]) return !1;
  return !0;
}, _y = (function() {
  var A = Da(function* ({ outputType: i, data: r, patches: c, keepOriginalStyles: h, placeholderDelimiters: f = {
    start: "{{",
    end: "}}"
  }, recursive: s = !0 }) {
    const o = r instanceof ur.default ? r : yield ur.default.loadAsync(r), d = /* @__PURE__ */ new Map(), U = { Media: new mu() }, F = /* @__PURE__ */ new Map(), B = [], _ = [];
    let E = !1;
    const v = /* @__PURE__ */ new Map();
    for (const [N, R] of Object.entries(o.files)) {
      const C = yield R.async("uint8array"), g = C.slice(0, 2);
      if (Al(g, P0) || Al(g, G0)) {
        v.set(N, C);
        continue;
      }
      if (!N.endsWith(".xml") && !N.endsWith(".rels")) {
        v.set(N, C);
        continue;
      }
      const O = ni(yield R.async("text"));
      if (N === "word/document.xml") {
        var w;
        const M = (w = O.elements) === null || w === void 0 ? void 0 : w.find((I) => I.name === "w:document");
        if (M && M.attributes) {
          for (const I of [
            "mc",
            "wp",
            "r",
            "w15",
            "m"
          ]) M.attributes[`xmlns:${I}`] = ha[I];
          M.attributes["mc:Ignorable"] = `${M.attributes["mc:Ignorable"] || ""} w15`.trim();
        }
      }
      if (N.startsWith("word/") && !N.endsWith(".xml.rels")) {
        const M = {
          file: U,
          viewWrapper: { Relationships: { addRelationship: (k, q, L, $) => {
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
        if (d.set(N, M), !f?.start.trim() || !f?.end.trim()) throw new Error("Both start and end delimiters must be non-empty strings.");
        const { start: I, end: Z } = f;
        for (const [k, q] of Object.entries(c)) {
          const L = `${I}${k}${Z}`;
          for (; ; ) {
            const { didFindOccurrence: $ } = k0({
              json: O,
              patch: UA(UA({}, q), {}, { children: q.children.map((lA) => {
                if (lA instanceof tu) {
                  const rA = new ti(lA.options.children, Pl());
                  return _.push({
                    key: N,
                    hyperlink: {
                      id: rA.linkId,
                      link: lA.options.link
                    }
                  }), rA;
                } else return lA;
              }) }),
              patchText: L,
              context: M,
              keepOriginalStyles: h
            });
            if (!s || !$) break;
          }
        }
        const uA = $o.getMediaData(JSON.stringify(O), M.file.Media);
        uA.length > 0 && (E = !0, B.push({
          key: N,
          mediaDatas: uA
        }));
      }
      F.set(N, O);
    }
    for (const { key: N, mediaDatas: R } of B) {
      var b;
      const C = `word/_rels/${N.split("/").pop()}.rels`, g = (b = F.get(C)) !== null && b !== void 0 ? b : el();
      F.set(C, g);
      const O = x0(g), M = $o.replace(JSON.stringify(F.get(N)), R, O);
      F.set(N, JSON.parse(M));
      for (let I = 0; I < R.length; I++) {
        const { fileName: Z } = R[I];
        Yo(g, O + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${Z}`);
      }
    }
    for (const { key: N, hyperlink: R } of _) {
      var T;
      const C = `word/_rels/${N.split("/").pop()}.rels`, g = (T = F.get(C)) !== null && T !== void 0 ? T : el();
      F.set(C, g), Yo(g, R.id, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", R.link, Au.EXTERNAL);
    }
    if (E) {
      const N = F.get("[Content_Types].xml");
      if (!N) throw new Error("Could not find content types file");
      sr(N, "image/png", "png"), sr(N, "image/jpeg", "jpeg"), sr(N, "image/jpeg", "jpg"), sr(N, "image/bmp", "bmp"), sr(N, "image/gif", "gif"), sr(N, "image/svg+xml", "svg");
    }
    const x = new ur.default();
    for (const [N, R] of F) {
      const C = V0(R);
      x.file(N, Gn(C));
    }
    for (const [N, R] of v) x.file(N, R);
    for (const { data: N, fileName: R } of U.Media.Array) x.file(`word/media/${R}`, N);
    return x.generateAsync({
      type: i,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    });
  });
  return function(r) {
    return A.apply(this, arguments);
  };
})(), V0 = (A) => (0, Zn.js2xml)(A, { attributeValueFn: (i) => String(i).replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") }), el = () => ({
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
}), xy = (function() {
  var A = Da(function* ({ data: i }) {
    const r = i instanceof ur.default ? i : yield ur.default.loadAsync(i), c = /* @__PURE__ */ new Set();
    for (const [h, f] of Object.entries(r.files))
      !h.endsWith(".xml") && !h.endsWith(".rels") || h.startsWith("word/") && !h.endsWith(".xml.rels") && bu(ni(yield f.async("text"))).forEach((s) => W0(s.text).forEach((o) => c.add(o)));
    return Array.from(c);
  });
  return function(r) {
    return A.apply(this, arguments);
  };
})(), W0 = (A) => {
  var i;
  const r = /* @__PURE__ */ new RegExp("(?<=\\{\\{).+?(?=\\}\\})", "gs");
  return (i = A.match(r)) !== null && i !== void 0 ? i : [];
}, X0 = /* @__PURE__ */ Hp(((A, i) => {
  (function(r, c) {
    typeof A == "object" && typeof i < "u" ? i.exports = c() : typeof define == "function" && define.amd ? define(c) : (r = typeof globalThis < "u" ? globalThis : r || self, r.html2canvas = c());
  })(A, (function() {
    "use strict";
    var r = function(t, e) {
      return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a, n) {
        a.__proto__ = n;
      } || function(a, n) {
        for (var p in n) Object.prototype.hasOwnProperty.call(n, p) && (a[p] = n[p]);
      }, r(t, e);
    };
    function c(t, e) {
      if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
      r(t, e);
      function a() {
        this.constructor = t;
      }
      t.prototype = e === null ? Object.create(e) : (a.prototype = e.prototype, new a());
    }
    var h = function() {
      return h = Object.assign || function(e) {
        for (var a, n = 1, p = arguments.length; n < p; n++) {
          a = arguments[n];
          for (var S in a) Object.prototype.hasOwnProperty.call(a, S) && (e[S] = a[S]);
        }
        return e;
      }, h.apply(this, arguments);
    };
    function f(t, e, a, n) {
      function p(S) {
        return S instanceof a ? S : new a(function(K) {
          K(S);
        });
      }
      return new (a || (a = Promise))(function(S, K) {
        function W(oA) {
          try {
            nA(n.next(oA));
          } catch (cA) {
            K(cA);
          }
        }
        function X(oA) {
          try {
            nA(n.throw(oA));
          } catch (cA) {
            K(cA);
          }
        }
        function nA(oA) {
          oA.done ? S(oA.value) : p(oA.value).then(W, X);
        }
        nA((n = n.apply(t, e || [])).next());
      });
    }
    function s(t, e) {
      var a = {
        label: 0,
        sent: function() {
          if (S[0] & 1) throw S[1];
          return S[1];
        },
        trys: [],
        ops: []
      }, n, p, S, K;
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
        if (n) throw new TypeError("Generator is already executing.");
        for (; a; ) try {
          if (n = 1, p && (S = nA[0] & 2 ? p.return : nA[0] ? p.throw || ((S = p.return) && S.call(p), 0) : p.next) && !(S = S.call(p, nA[1])).done) return S;
          switch (p = 0, S && (nA = [nA[0] & 2, S.value]), nA[0]) {
            case 0:
            case 1:
              S = nA;
              break;
            case 4:
              return a.label++, {
                value: nA[1],
                done: !1
              };
            case 5:
              a.label++, p = nA[1], nA = [0];
              continue;
            case 7:
              nA = a.ops.pop(), a.trys.pop();
              continue;
            default:
              if (S = a.trys, !(S = S.length > 0 && S[S.length - 1]) && (nA[0] === 6 || nA[0] === 2)) {
                a = 0;
                continue;
              }
              if (nA[0] === 3 && (!S || nA[1] > S[0] && nA[1] < S[3])) {
                a.label = nA[1];
                break;
              }
              if (nA[0] === 6 && a.label < S[1]) {
                a.label = S[1], S = nA;
                break;
              }
              if (S && a.label < S[2]) {
                a.label = S[2], a.ops.push(nA);
                break;
              }
              S[2] && a.ops.pop(), a.trys.pop();
              continue;
          }
          nA = e.call(t, a);
        } catch (oA) {
          nA = [6, oA], p = 0;
        } finally {
          n = S = 0;
        }
        if (nA[0] & 5) throw nA[1];
        return {
          value: nA[0] ? nA[1] : void 0,
          done: !0
        };
      }
    }
    function o(t, e, a) {
      if (a || arguments.length === 2)
        for (var n = 0, p = e.length, S; n < p; n++) (S || !(n in e)) && (S || (S = Array.prototype.slice.call(e, 0, n)), S[n] = e[n]);
      return t.concat(S || e);
    }
    for (var d = (function() {
      function t(e, a, n, p) {
        this.left = e, this.top = a, this.width = n, this.height = p;
      }
      return t.prototype.add = function(e, a, n, p) {
        return new t(this.left + e, this.top + a, this.width + n, this.height + p);
      }, t.fromClientRect = function(e, a) {
        return new t(a.left + e.windowBounds.left, a.top + e.windowBounds.top, a.width, a.height);
      }, t.fromDOMRectList = function(e, a) {
        var n = Array.from(a).find(function(p) {
          return p.width !== 0;
        });
        return n ? new t(n.left + e.windowBounds.left, n.top + e.windowBounds.top, n.width, n.height) : t.EMPTY;
      }, t.EMPTY = new t(0, 0, 0, 0), t;
    })(), U = function(t, e) {
      return d.fromClientRect(t, e.getBoundingClientRect());
    }, F = function(t) {
      var e = t.body, a = t.documentElement;
      if (!e || !a) throw new Error("Unable to get document size");
      return new d(0, 0, Math.max(Math.max(e.scrollWidth, a.scrollWidth), Math.max(e.offsetWidth, a.offsetWidth), Math.max(e.clientWidth, a.clientWidth)), Math.max(Math.max(e.scrollHeight, a.scrollHeight), Math.max(e.offsetHeight, a.offsetHeight), Math.max(e.clientHeight, a.clientHeight)));
    }, B = function(t) {
      for (var e = [], a = 0, n = t.length; a < n; ) {
        var p = t.charCodeAt(a++);
        if (p >= 55296 && p <= 56319 && a < n) {
          var S = t.charCodeAt(a++);
          (S & 64512) === 56320 ? e.push(((p & 1023) << 10) + (S & 1023) + 65536) : (e.push(p), a--);
        } else e.push(p);
      }
      return e;
    }, _ = function() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, t);
      var a = t.length;
      if (!a) return "";
      for (var n = [], p = -1, S = ""; ++p < a; ) {
        var K = t[p];
        K <= 65535 ? n.push(K) : (K -= 65536, n.push((K >> 10) + 55296, K % 1024 + 56320)), (p + 1 === a || n.length > 16384) && (S += String.fromCharCode.apply(String, n), n.length = 0);
      }
      return S;
    }, E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", v = typeof Uint8Array > "u" ? [] : new Uint8Array(256), w = 0; w < E.length; w++) v[E.charCodeAt(w)] = w;
    for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", T = typeof Uint8Array > "u" ? [] : new Uint8Array(256), x = 0; x < b.length; x++) T[b.charCodeAt(x)] = x;
    for (var N = function(t) {
      var e = t.length * 0.75, a = t.length, n, p = 0, S, K, W, X;
      t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
      var nA = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), oA = Array.isArray(nA) ? nA : new Uint8Array(nA);
      for (n = 0; n < a; n += 4)
        S = T[t.charCodeAt(n)], K = T[t.charCodeAt(n + 1)], W = T[t.charCodeAt(n + 2)], X = T[t.charCodeAt(n + 3)], oA[p++] = S << 2 | K >> 4, oA[p++] = (K & 15) << 4 | W >> 2, oA[p++] = (W & 3) << 6 | X & 63;
      return nA;
    }, R = function(t) {
      for (var e = t.length, a = [], n = 0; n < e; n += 2) a.push(t[n + 1] << 8 | t[n]);
      return a;
    }, C = function(t) {
      for (var e = t.length, a = [], n = 0; n < e; n += 4) a.push(t[n + 3] << 24 | t[n + 2] << 16 | t[n + 1] << 8 | t[n]);
      return a;
    }, g = 5, O = 11, M = 2, I = O - g, Z = 65536 >> g, uA = (1 << g) - 1, k = Z + (1024 >> g) + 32, q = 65536 >> O, L = (1 << I) - 1, $ = function(t, e, a) {
      return t.slice ? t.slice(e, a) : new Uint16Array(Array.prototype.slice.call(t, e, a));
    }, lA = function(t, e, a) {
      return t.slice ? t.slice(e, a) : new Uint32Array(Array.prototype.slice.call(t, e, a));
    }, rA = function(t, e) {
      var a = N(t), n = Array.isArray(a) ? C(a) : new Uint32Array(a), p = Array.isArray(a) ? R(a) : new Uint16Array(a), S = 24, K = $(p, S / 2, n[4] / 2), W = n[5] === 2 ? $(p, (S + n[4]) / 2) : lA(n, Math.ceil((S + n[4]) / 4));
      return new vA(n[0], n[1], n[2], n[3], K, W);
    }, vA = (function() {
      function t(e, a, n, p, S, K) {
        this.initialValue = e, this.errorValue = a, this.highStart = n, this.highValueIndex = p, this.index = S, this.data = K;
      }
      return t.prototype.get = function(e) {
        var a;
        if (e >= 0) {
          if (e < 55296 || e > 56319 && e <= 65535)
            return a = this.index[e >> g], a = (a << M) + (e & uA), this.data[a];
          if (e <= 65535)
            return a = this.index[Z + (e - 55296 >> g)], a = (a << M) + (e & uA), this.data[a];
          if (e < this.highStart)
            return a = k - q + (e >> O), a = this.index[a], a += e >> g & L, a = this.index[a], a = (a << M) + (e & uA), this.data[a];
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, t;
    })(), aA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", dA = typeof Uint8Array > "u" ? [] : new Uint8Array(256), tA = 0; tA < aA.length; tA++) dA[aA.charCodeAt(tA)] = tA;
    var G = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", iA = 50, sA = 1, fA = 2, _A = 3, H = 4, y = 5, J = 7, z = 8, pA = 9, P = 10, V = 11, m = 12, eA = 13, D = 14, l = 15, u = 16, Q = 17, j = 18, AA = 19, Y = 20, gA = 21, yA = 22, BA = 23, QA = 24, xA = 25, RA = 26, Ae = 27, Be = 28, _e = 29, Ue = 30, te = 31, Je = 32, st = 33, be = 34, Wt = 35, yr = 36, Ut = 37, Cr = 38, bt = 39, Oe = 40, ot = 41, Ka = 42, Du = 43, Ru = [9001, 65288], Ma = "!", GA = "×", Zr = "÷", oi = rA(G), Ye = [Ue, yr], li = [
      sA,
      fA,
      _A,
      y
    ], Pa = [P, z], Ga = [Ae, RA], Ou = li.concat(Pa), Va = [
      Cr,
      bt,
      Oe,
      be,
      Wt
    ], Nu = [l, eA], ku = function(t, e) {
      e === void 0 && (e = "strict");
      var a = [], n = [], p = [];
      return t.forEach(function(S, K) {
        var W = oi.get(S);
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
          return n.push(K), a.push(u);
        if (W === H || W === V) {
          if (K === 0)
            return n.push(K), a.push(Ue);
          var X = a[K - 1];
          return Ou.indexOf(X) === -1 ? (n.push(n[K - 1]), a.push(X)) : (n.push(K), a.push(Ue));
        }
        if (n.push(K), W === te) return a.push(e === "strict" ? gA : Ut);
        if (W === Ka || W === _e) return a.push(Ue);
        if (W === Du) return S >= 131072 && S <= 196605 || S >= 196608 && S <= 262141 ? a.push(Ut) : a.push(Ue);
        a.push(W);
      }), [
        n,
        a,
        p
      ];
    }, ui = function(t, e, a, n) {
      var p = n[a];
      if (Array.isArray(t) ? t.indexOf(p) !== -1 : t === p)
        for (var S = a; S <= n.length; ) {
          S++;
          var K = n[S];
          if (K === e) return !0;
          if (K !== P) break;
        }
      if (p === P)
        for (var S = a; S > 0; ) {
          S--;
          var W = n[S];
          if (Array.isArray(t) ? t.indexOf(W) !== -1 : t === W)
            for (var X = a; X <= n.length; ) {
              X++;
              var K = n[X];
              if (K === e) return !0;
              if (K !== P) break;
            }
          if (W !== P) break;
        }
      return !1;
    }, Wa = function(t, e) {
      for (var a = t; a >= 0; ) {
        var n = e[a];
        if (n === P) a--;
        else return n;
      }
      return 0;
    }, Ku = function(t, e, a, n, p) {
      if (a[n] === 0) return GA;
      var S = n - 1;
      if (Array.isArray(p) && p[S] === !0) return GA;
      var K = S - 1, W = S + 1, X = e[S], nA = K >= 0 ? e[K] : 0, oA = e[W];
      if (X === fA && oA === _A) return GA;
      if (li.indexOf(X) !== -1) return Ma;
      if (li.indexOf(oA) !== -1 || Pa.indexOf(oA) !== -1) return GA;
      if (Wa(S, e) === z) return Zr;
      if (oi.get(t[S]) === V || (X === Je || X === st) && oi.get(t[W]) === V || X === J || oA === J || X === pA || [
        P,
        eA,
        l
      ].indexOf(X) === -1 && oA === pA || [
        Q,
        j,
        AA,
        QA,
        Be
      ].indexOf(oA) !== -1 || Wa(S, e) === yA || ui(BA, yA, S, e) || ui([Q, j], gA, S, e) || ui(m, m, S, e)) return GA;
      if (X === P) return Zr;
      if (X === BA || oA === BA) return GA;
      if (oA === u || X === u) return Zr;
      if ([
        eA,
        l,
        gA
      ].indexOf(oA) !== -1 || X === D || nA === yr && Nu.indexOf(X) !== -1 || X === Be && oA === yr || oA === Y || Ye.indexOf(oA) !== -1 && X === xA || Ye.indexOf(X) !== -1 && oA === xA || X === Ae && [
        Ut,
        Je,
        st
      ].indexOf(oA) !== -1 || [
        Ut,
        Je,
        st
      ].indexOf(X) !== -1 && oA === RA || Ye.indexOf(X) !== -1 && Ga.indexOf(oA) !== -1 || Ga.indexOf(X) !== -1 && Ye.indexOf(oA) !== -1 || [Ae, RA].indexOf(X) !== -1 && (oA === xA || [yA, l].indexOf(oA) !== -1 && e[W + 1] === xA) || [yA, l].indexOf(X) !== -1 && oA === xA || X === xA && [
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
      if (Cr === X && [
        Cr,
        bt,
        be,
        Wt
      ].indexOf(oA) !== -1 || [bt, be].indexOf(X) !== -1 && [bt, Oe].indexOf(oA) !== -1 || [Oe, Wt].indexOf(X) !== -1 && oA === Oe || Va.indexOf(X) !== -1 && [Y, RA].indexOf(oA) !== -1 || Va.indexOf(oA) !== -1 && X === Ae || Ye.indexOf(X) !== -1 && Ye.indexOf(oA) !== -1 || X === QA && Ye.indexOf(oA) !== -1 || Ye.concat(xA).indexOf(X) !== -1 && oA === yA && Ru.indexOf(t[W]) === -1 || Ye.concat(xA).indexOf(oA) !== -1 && X === j) return GA;
      if (X === ot && oA === ot) {
        for (var TA = a[S], EA = 1; TA > 0 && (TA--, e[TA] === ot); )
          EA++;
        if (EA % 2 !== 0) return GA;
      }
      return X === Je && oA === st ? GA : Zr;
    }, Mu = function(t, e) {
      e || (e = {
        lineBreak: "normal",
        wordBreak: "normal"
      });
      var a = ku(t, e.lineBreak), n = a[0], p = a[1], S = a[2];
      (e.wordBreak === "break-all" || e.wordBreak === "break-word") && (p = p.map(function(W) {
        return [
          xA,
          Ue,
          Ka
        ].indexOf(W) !== -1 ? Ut : W;
      }));
      var K = e.wordBreak === "keep-all" ? S.map(function(W, X) {
        return W && t[X] >= 19968 && t[X] <= 40959;
      }) : void 0;
      return [
        n,
        p,
        K
      ];
    }, Pu = (function() {
      function t(e, a, n, p) {
        this.codePoints = e, this.required = a === Ma, this.start = n, this.end = p;
      }
      return t.prototype.slice = function() {
        return _.apply(void 0, this.codePoints.slice(this.start, this.end));
      }, t;
    })(), Gu = function(t, e) {
      var a = B(t), n = Mu(a, e), p = n[0], S = n[1], K = n[2], W = a.length, X = 0, nA = 0;
      return { next: function() {
        if (nA >= W) return {
          done: !0,
          value: null
        };
        for (var oA = GA; nA < W && (oA = Ku(a, S, p, ++nA, K)) === GA; ) ;
        if (oA !== GA || nA === W) {
          var cA = new Pu(a, oA, X, nA);
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
    }, Vu = 1, Wu = 2, Fr = 4, Xa = 8, $r = 10, ja = 47, Er = 92, Xu = 9, ju = 32, An = 34, Qr = 61, zu = 35, Ju = 36, Yu = 37, en = 39, tn = 40, Ur = 41, qu = 95, ve = 45, Zu = 33, $u = 60, Ac = 62, ec = 64, tc = 91, rc = 93, nc = 61, ic = 123, rn = 63, ac = 125, za = 124, sc = 126, oc = 128, Ja = 65533, ci = 42, It = 43, lc = 44, uc = 58, cc = 59, br = 46, hc = 0, fc = 8, dc = 11, pc = 14, gc = 31, wc = 127, Ne = -1, Ya = 48, qa = 97, Za = 101, Bc = 102, mc = 117, vc = 122, $a = 65, As = 69, es = 70, yc = 85, Cc = 90, we = function(t) {
      return t >= Ya && t <= 57;
    }, Fc = function(t) {
      return t >= 55296 && t <= 57343;
    }, Xt = function(t) {
      return we(t) || t >= $a && t <= es || t >= qa && t <= Bc;
    }, Ec = function(t) {
      return t >= qa && t <= vc;
    }, Qc = function(t) {
      return t >= $a && t <= Cc;
    }, Uc = function(t) {
      return Ec(t) || Qc(t);
    }, bc = function(t) {
      return t >= oc;
    }, nn = function(t) {
      return t === $r || t === Xu || t === ju;
    }, an = function(t) {
      return Uc(t) || bc(t) || t === qu;
    }, ts = function(t) {
      return an(t) || we(t) || t === ve;
    }, Ic = function(t) {
      return t >= hc && t <= fc || t === dc || t >= pc && t <= gc || t === wc;
    }, lt = function(t, e) {
      return t !== Er ? !1 : e !== $r;
    }, sn = function(t, e, a) {
      return t === ve ? an(e) || lt(e, a) : an(t) ? !0 : !!(t === Er && lt(t, e));
    }, hi = function(t, e, a) {
      return t === It || t === ve ? we(e) ? !0 : e === br && we(a) : we(t === br ? e : t);
    }, _c = function(t) {
      var e = 0, a = 1;
      (t[e] === It || t[e] === ve) && (t[e] === ve && (a = -1), e++);
      for (var n = []; we(t[e]); ) n.push(t[e++]);
      var p = n.length ? parseInt(_.apply(void 0, n), 10) : 0;
      t[e] === br && e++;
      for (var S = []; we(t[e]); ) S.push(t[e++]);
      var K = S.length, W = K ? parseInt(_.apply(void 0, S), 10) : 0;
      (t[e] === As || t[e] === Za) && e++;
      var X = 1;
      (t[e] === It || t[e] === ve) && (t[e] === ve && (X = -1), e++);
      for (var nA = []; we(t[e]); ) nA.push(t[e++]);
      var oA = nA.length ? parseInt(_.apply(void 0, nA), 10) : 0;
      return a * (p + W * Math.pow(10, -K)) * Math.pow(10, X * oA);
    }, xc = { type: 2 }, Tc = { type: 3 }, Sc = { type: 4 }, Hc = { type: 13 }, Lc = { type: 8 }, Dc = { type: 21 }, Rc = { type: 9 }, Oc = { type: 10 }, Nc = { type: 11 }, kc = { type: 12 }, Kc = { type: 14 }, on = { type: 23 }, Mc = { type: 1 }, Pc = { type: 25 }, Gc = { type: 24 }, Vc = { type: 26 }, Wc = { type: 27 }, Xc = { type: 28 }, jc = { type: 29 }, zc = { type: 31 }, fi = { type: 32 }, rs = (function() {
      function t() {
        this._value = [];
      }
      return t.prototype.write = function(e) {
        this._value = this._value.concat(B(e));
      }, t.prototype.read = function() {
        for (var e = [], a = this.consumeToken(); a !== fi; )
          e.push(a), a = this.consumeToken();
        return e;
      }, t.prototype.consumeToken = function() {
        var e = this.consumeCodePoint();
        switch (e) {
          case An:
            return this.consumeStringToken(An);
          case zu:
            var a = this.peekCodePoint(0), n = this.peekCodePoint(1), p = this.peekCodePoint(2);
            if (ts(a) || lt(n, p)) {
              var S = sn(a, n, p) ? Wu : Vu, K = this.consumeName();
              return {
                type: 5,
                value: K,
                flags: S
              };
            }
            break;
          case Ju:
            if (this.peekCodePoint(0) === Qr)
              return this.consumeCodePoint(), Hc;
            break;
          case en:
            return this.consumeStringToken(en);
          case tn:
            return xc;
          case Ur:
            return Tc;
          case ci:
            if (this.peekCodePoint(0) === Qr)
              return this.consumeCodePoint(), Kc;
            break;
          case It:
            if (hi(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case lc:
            return Sc;
          case ve:
            var W = e, X = this.peekCodePoint(0), nA = this.peekCodePoint(1);
            if (hi(W, X, nA))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            if (sn(W, X, nA))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            if (X === ve && nA === Ac)
              return this.consumeCodePoint(), this.consumeCodePoint(), Gc;
            break;
          case br:
            if (hi(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case ja:
            if (this.peekCodePoint(0) === ci)
              for (this.consumeCodePoint(); ; ) {
                var oA = this.consumeCodePoint();
                if (oA === ci && (oA = this.consumeCodePoint(), oA === ja))
                  return this.consumeToken();
                if (oA === Ne) return this.consumeToken();
              }
            break;
          case uc:
            return Vc;
          case cc:
            return Wc;
          case $u:
            if (this.peekCodePoint(0) === Zu && this.peekCodePoint(1) === ve && this.peekCodePoint(2) === ve)
              return this.consumeCodePoint(), this.consumeCodePoint(), Pc;
            break;
          case ec:
            if (sn(this.peekCodePoint(0), this.peekCodePoint(1), this.peekCodePoint(2))) {
              var K = this.consumeName();
              return {
                type: 7,
                value: K
              };
            }
            break;
          case tc:
            return Xc;
          case Er:
            if (lt(e, this.peekCodePoint(0)))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            break;
          case rc:
            return jc;
          case nc:
            if (this.peekCodePoint(0) === Qr)
              return this.consumeCodePoint(), Lc;
            break;
          case ic:
            return Nc;
          case ac:
            return kc;
          case mc:
          case yc:
            var cA = this.peekCodePoint(0), wA = this.peekCodePoint(1);
            return cA === It && (Xt(wA) || wA === rn) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
          case za:
            if (this.peekCodePoint(0) === Qr)
              return this.consumeCodePoint(), Rc;
            if (this.peekCodePoint(0) === za)
              return this.consumeCodePoint(), Dc;
            break;
          case sc:
            if (this.peekCodePoint(0) === Qr)
              return this.consumeCodePoint(), Oc;
            break;
          case Ne:
            return fi;
        }
        return nn(e) ? (this.consumeWhiteSpace(), zc) : we(e) ? (this.reconsumeCodePoint(e), this.consumeNumericToken()) : an(e) ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken()) : {
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
        for (var e = [], a = this.consumeCodePoint(); Xt(a) && e.length < 6; )
          e.push(a), a = this.consumeCodePoint();
        for (var n = !1; a === rn && e.length < 6; )
          e.push(a), a = this.consumeCodePoint(), n = !0;
        if (n) {
          var p = parseInt(_.apply(void 0, e.map(function(X) {
            return X === rn ? Ya : X;
          })), 16), S = parseInt(_.apply(void 0, e.map(function(X) {
            return X === rn ? es : X;
          })), 16);
          return {
            type: 30,
            start: p,
            end: S
          };
        }
        var K = parseInt(_.apply(void 0, e), 16);
        if (this.peekCodePoint(0) === ve && Xt(this.peekCodePoint(1))) {
          this.consumeCodePoint(), a = this.consumeCodePoint();
          for (var W = []; Xt(a) && W.length < 6; )
            W.push(a), a = this.consumeCodePoint();
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
        return e.toLowerCase() === "url" && this.peekCodePoint(0) === tn ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === tn ? (this.consumeCodePoint(), {
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
        var a = this.peekCodePoint(0);
        if (a === en || a === An) {
          var n = this.consumeStringToken(this.consumeCodePoint());
          return n.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === Ne || this.peekCodePoint(0) === Ur) ? (this.consumeCodePoint(), {
            type: 22,
            value: n.value
          }) : (this.consumeBadUrlRemnants(), on);
        }
        for (; ; ) {
          var p = this.consumeCodePoint();
          if (p === Ne || p === Ur) return {
            type: 22,
            value: _.apply(void 0, e)
          };
          if (nn(p))
            return this.consumeWhiteSpace(), this.peekCodePoint(0) === Ne || this.peekCodePoint(0) === Ur ? (this.consumeCodePoint(), {
              type: 22,
              value: _.apply(void 0, e)
            }) : (this.consumeBadUrlRemnants(), on);
          if (p === An || p === en || p === tn || Ic(p))
            return this.consumeBadUrlRemnants(), on;
          if (p === Er) if (lt(p, this.peekCodePoint(0))) e.push(this.consumeEscapedCodePoint());
          else
            return this.consumeBadUrlRemnants(), on;
          else e.push(p);
        }
      }, t.prototype.consumeWhiteSpace = function() {
        for (; nn(this.peekCodePoint(0)); ) this.consumeCodePoint();
      }, t.prototype.consumeBadUrlRemnants = function() {
        for (; ; ) {
          var e = this.consumeCodePoint();
          if (e === Ur || e === Ne) return;
          lt(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
        }
      }, t.prototype.consumeStringSlice = function(e) {
        for (var a = 5e4, n = ""; e > 0; ) {
          var p = Math.min(a, e);
          n += _.apply(void 0, this._value.splice(0, p)), e -= p;
        }
        return this._value.shift(), n;
      }, t.prototype.consumeStringToken = function(e) {
        var a = "", n = 0;
        do {
          var p = this._value[n];
          if (p === Ne || p === void 0 || p === e)
            return a += this.consumeStringSlice(n), {
              type: 0,
              value: a
            };
          if (p === $r)
            return this._value.splice(0, n), Mc;
          if (p === Er) {
            var S = this._value[n + 1];
            S !== Ne && S !== void 0 && (S === $r ? (a += this.consumeStringSlice(n), n = -1, this._value.shift()) : lt(p, S) && (a += this.consumeStringSlice(n), a += _(this.consumeEscapedCodePoint()), n = -1));
          }
          n++;
        } while (!0);
      }, t.prototype.consumeNumber = function() {
        var e = [], a = Fr, n = this.peekCodePoint(0);
        for ((n === It || n === ve) && e.push(this.consumeCodePoint()); we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        n = this.peekCodePoint(0);
        var p = this.peekCodePoint(1);
        if (n === br && we(p))
          for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), a = Xa; we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        n = this.peekCodePoint(0), p = this.peekCodePoint(1);
        var S = this.peekCodePoint(2);
        if ((n === As || n === Za) && ((p === It || p === ve) && we(S) || we(p)))
          for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), a = Xa; we(this.peekCodePoint(0)); ) e.push(this.consumeCodePoint());
        return [_c(e), a];
      }, t.prototype.consumeNumericToken = function() {
        var e = this.consumeNumber(), a = e[0], n = e[1], p = this.peekCodePoint(0);
        return sn(p, this.peekCodePoint(1), this.peekCodePoint(2)) ? {
          type: 15,
          number: a,
          flags: n,
          unit: this.consumeName()
        } : p === Yu ? (this.consumeCodePoint(), {
          type: 16,
          number: a,
          flags: n
        }) : {
          type: 17,
          number: a,
          flags: n
        };
      }, t.prototype.consumeEscapedCodePoint = function() {
        var e = this.consumeCodePoint();
        if (Xt(e)) {
          for (var a = _(e); Xt(this.peekCodePoint(0)) && a.length < 6; ) a += _(this.consumeCodePoint());
          nn(this.peekCodePoint(0)) && this.consumeCodePoint();
          var n = parseInt(a, 16);
          return n === 0 || Fc(n) || n > 1114111 ? Ja : n;
        }
        return e === Ne ? Ja : e;
      }, t.prototype.consumeName = function() {
        for (var e = ""; ; ) {
          var a = this.consumeCodePoint();
          if (ts(a)) e += _(a);
          else if (lt(a, this.peekCodePoint(0))) e += _(this.consumeEscapedCodePoint());
          else
            return this.reconsumeCodePoint(a), e;
        }
      }, t;
    })(), ns = (function() {
      function t(e) {
        this._tokens = e;
      }
      return t.create = function(e) {
        var a = new rs();
        return a.write(e), new t(a.read());
      }, t.parseValue = function(e) {
        return t.create(e).parseComponentValue();
      }, t.parseValues = function(e) {
        return t.create(e).parseComponentValues();
      }, t.prototype.parseComponentValue = function() {
        for (var e = this.consumeToken(); e.type === 31; ) e = this.consumeToken();
        if (e.type === 32) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        this.reconsumeToken(e);
        var a = this.consumeComponentValue();
        do
          e = this.consumeToken();
        while (e.type === 31);
        if (e.type === 32) return a;
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      }, t.prototype.parseComponentValues = function() {
        for (var e = []; ; ) {
          var a = this.consumeComponentValue();
          if (a.type === 32) return e;
          e.push(a), e.push();
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
        for (var a = {
          type: e,
          values: []
        }, n = this.consumeToken(); ; ) {
          if (n.type === 32 || Yc(n, e)) return a;
          this.reconsumeToken(n), a.values.push(this.consumeComponentValue()), n = this.consumeToken();
        }
      }, t.prototype.consumeFunction = function(e) {
        for (var a = {
          name: e.value,
          values: [],
          type: 18
        }; ; ) {
          var n = this.consumeToken();
          if (n.type === 32 || n.type === 3) return a;
          this.reconsumeToken(n), a.values.push(this.consumeComponentValue());
        }
      }, t.prototype.consumeToken = function() {
        var e = this._tokens.shift();
        return typeof e > "u" ? fi : e;
      }, t.prototype.reconsumeToken = function(e) {
        this._tokens.unshift(e);
      }, t;
    })(), Ir = function(t) {
      return t.type === 15;
    }, jt = function(t) {
      return t.type === 17;
    }, JA = function(t) {
      return t.type === 20;
    }, Jc = function(t) {
      return t.type === 0;
    }, di = function(t, e) {
      return JA(t) && t.value === e;
    }, is = function(t) {
      return t.type !== 31;
    }, zt = function(t) {
      return t.type !== 31 && t.type !== 4;
    }, ke = function(t) {
      var e = [], a = [];
      return t.forEach(function(n) {
        if (n.type === 4) {
          if (a.length === 0) throw new Error("Error parsing function args, zero tokens for arg");
          e.push(a), a = [];
          return;
        }
        n.type !== 31 && a.push(n);
      }), a.length && e.push(a), e;
    }, Yc = function(t, e) {
      return e === 11 && t.type === 12 || e === 28 && t.type === 29 ? !0 : e === 2 && t.type === 3;
    }, ut = function(t) {
      return t.type === 17 || t.type === 15;
    }, ae = function(t) {
      return t.type === 16 || ut(t);
    }, as = function(t) {
      return t.length > 1 ? [t[0], t[1]] : [t[0]];
    }, ue = {
      type: 17,
      number: 0,
      flags: Fr
    }, pi = {
      type: 16,
      number: 50,
      flags: Fr
    }, ct = {
      type: 16,
      number: 100,
      flags: Fr
    }, _r = function(t, e, a) {
      var n = t[0], p = t[1];
      return [ZA(n, e), ZA(typeof p < "u" ? p : n, a)];
    }, ZA = function(t, e) {
      if (t.type === 16) return t.number / 100 * e;
      if (Ir(t)) switch (t.unit) {
        case "rem":
        case "em":
          return 16 * t.number;
        default:
          return t.number;
      }
      return t.number;
    }, ss = "deg", os = "grad", ls = "rad", us = "turn", ln = {
      name: "angle",
      parse: function(t, e) {
        if (e.type === 15) switch (e.unit) {
          case ss:
            return Math.PI * e.number / 180;
          case os:
            return Math.PI / 200 * e.number;
          case ls:
            return e.number;
          case us:
            return Math.PI * 2 * e.number;
        }
        throw new Error("Unsupported angle type");
      }
    }, cs = function(t) {
      return t.type === 15 && (t.unit === ss || t.unit === os || t.unit === ls || t.unit === us);
    }, hs = function(t) {
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
          return [ue, ct];
        case "to right":
        case "left":
          return xe(90);
        case "to top left":
        case "to left top":
        case "right bottom":
        case "bottom right":
          return [ct, ct];
        case "to bottom":
        case "top":
          return xe(180);
        case "to top right":
        case "to right top":
        case "left bottom":
        case "bottom left":
          return [ct, ue];
        case "to left":
        case "right":
          return xe(270);
      }
      return 0;
    }, xe = function(t) {
      return Math.PI * t / 180;
    }, ht = {
      name: "color",
      parse: function(t, e) {
        if (e.type === 18) {
          var a = qc[e.name];
          if (typeof a > "u") throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
          return a(t, e.values);
        }
        if (e.type === 5) {
          if (e.value.length === 3) {
            var n = e.value.substring(0, 1), p = e.value.substring(1, 2), S = e.value.substring(2, 3);
            return dt(parseInt(n + n, 16), parseInt(p + p, 16), parseInt(S + S, 16), 1);
          }
          if (e.value.length === 4) {
            var n = e.value.substring(0, 1), p = e.value.substring(1, 2), S = e.value.substring(2, 3), K = e.value.substring(3, 4);
            return dt(parseInt(n + n, 16), parseInt(p + p, 16), parseInt(S + S, 16), parseInt(K + K, 16) / 255);
          }
          if (e.value.length === 6) {
            var n = e.value.substring(0, 2), p = e.value.substring(2, 4), S = e.value.substring(4, 6);
            return dt(parseInt(n, 16), parseInt(p, 16), parseInt(S, 16), 1);
          }
          if (e.value.length === 8) {
            var n = e.value.substring(0, 2), p = e.value.substring(2, 4), S = e.value.substring(4, 6), K = e.value.substring(6, 8);
            return dt(parseInt(n, 16), parseInt(p, 16), parseInt(S, 16), parseInt(K, 16) / 255);
          }
        }
        if (e.type === 20) {
          var W = qe[e.value.toUpperCase()];
          if (typeof W < "u") return W;
        }
        return qe.TRANSPARENT;
      }
    }, ft = function(t) {
      return (255 & t) === 0;
    }, le = function(t) {
      var e = 255 & t, a = 255 & t >> 8, n = 255 & t >> 16, p = 255 & t >> 24;
      return e < 255 ? "rgba(" + p + "," + n + "," + a + "," + e / 255 + ")" : "rgb(" + p + "," + n + "," + a + ")";
    }, dt = function(t, e, a, n) {
      return (t << 24 | e << 16 | a << 8 | Math.round(n * 255) << 0) >>> 0;
    }, fs = function(t, e) {
      if (t.type === 17) return t.number;
      if (t.type === 16) {
        var a = e === 3 ? 1 : 255;
        return e === 3 ? t.number / 100 * a : Math.round(t.number / 100 * a);
      }
      return 0;
    }, ds = function(t, e) {
      var a = e.filter(zt);
      if (a.length === 3) {
        var n = a.map(fs), p = n[0], S = n[1], K = n[2];
        return dt(p, S, K, 1);
      }
      if (a.length === 4) {
        var W = a.map(fs), p = W[0], S = W[1], K = W[2], X = W[3];
        return dt(p, S, K, X);
      }
      return 0;
    };
    function gi(t, e, a) {
      return a < 0 && (a += 1), a >= 1 && (a -= 1), a < 1 / 6 ? (e - t) * a * 6 + t : a < 1 / 2 ? e : a < 2 / 3 ? (e - t) * 6 * (2 / 3 - a) + t : t;
    }
    var ps = function(t, e) {
      var a = e.filter(zt), n = a[0], p = a[1], S = a[2], K = a[3], W = (n.type === 17 ? xe(n.number) : ln.parse(t, n)) / (Math.PI * 2), X = ae(p) ? p.number / 100 : 0, nA = ae(S) ? S.number / 100 : 0, oA = typeof K < "u" && ae(K) ? ZA(K, 1) : 1;
      if (X === 0) return dt(nA * 255, nA * 255, nA * 255, 1);
      var cA = nA <= 0.5 ? nA * (X + 1) : nA + X - nA * X, wA = nA * 2 - cA, TA = gi(wA, cA, W + 1 / 3), EA = gi(wA, cA, W), IA = gi(wA, cA, W - 1 / 3);
      return dt(TA * 255, EA * 255, IA * 255, oA);
    }, qc = {
      hsl: ps,
      hsla: ps,
      rgb: ds,
      rgba: ds
    }, xr = function(t, e) {
      return ht.parse(t, ns.create(e).parseComponentValue());
    }, qe = {
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
        return e.map(function(a) {
          if (JA(a)) switch (a.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, $c = {
      name: "background-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, un = function(t, e) {
      var a = ht.parse(t, e[0]), n = e[1];
      return n && ae(n) ? {
        color: a,
        stop: n
      } : {
        color: a,
        stop: null
      };
    }, gs = function(t, e) {
      var a = t[0], n = t[t.length - 1];
      a.stop === null && (a.stop = ue), n.stop === null && (n.stop = ct);
      for (var p = [], S = 0, K = 0; K < t.length; K++) {
        var W = t[K].stop;
        if (W !== null) {
          var X = ZA(W, e);
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
    }, Ah = function(t, e, a) {
      var n = e / 2, p = a / 2, S = ZA(t[0], e) - n, K = p - ZA(t[1], a);
      return (Math.atan2(K, S) + Math.PI * 2) % (Math.PI * 2);
    }, eh = function(t, e, a) {
      var n = typeof t == "number" ? t : Ah(t, e, a), p = Math.abs(e * Math.sin(n)) + Math.abs(a * Math.cos(n)), S = e / 2, K = a / 2, W = p / 2, X = Math.sin(n - Math.PI / 2) * W, nA = Math.cos(n - Math.PI / 2) * W;
      return [
        p,
        S - nA,
        S + nA,
        K - X,
        K + X
      ];
    }, De = function(t, e) {
      return Math.sqrt(t * t + e * e);
    }, ws = function(t, e, a, n, p) {
      return [
        [0, 0],
        [0, e],
        [t, 0],
        [t, e]
      ].reduce(function(S, K) {
        var W = K[0], X = K[1], nA = De(a - W, n - X);
        return (p ? nA < S.optimumDistance : nA > S.optimumDistance) ? {
          optimumCorner: K,
          optimumDistance: nA
        } : S;
      }, {
        optimumDistance: p ? 1 / 0 : -1 / 0,
        optimumCorner: null
      }).optimumCorner;
    }, th = function(t, e, a, n, p) {
      var S = 0, K = 0;
      switch (t.size) {
        case 0:
          t.shape === 0 ? S = K = Math.min(Math.abs(e), Math.abs(e - n), Math.abs(a), Math.abs(a - p)) : t.shape === 1 && (S = Math.min(Math.abs(e), Math.abs(e - n)), K = Math.min(Math.abs(a), Math.abs(a - p)));
          break;
        case 2:
          if (t.shape === 0) S = K = Math.min(De(e, a), De(e, a - p), De(e - n, a), De(e - n, a - p));
          else if (t.shape === 1) {
            var W = Math.min(Math.abs(a), Math.abs(a - p)) / Math.min(Math.abs(e), Math.abs(e - n)), X = ws(n, p, e, a, !0), nA = X[0], oA = X[1];
            S = De(nA - e, (oA - a) / W), K = W * S;
          }
          break;
        case 1:
          t.shape === 0 ? S = K = Math.max(Math.abs(e), Math.abs(e - n), Math.abs(a), Math.abs(a - p)) : t.shape === 1 && (S = Math.max(Math.abs(e), Math.abs(e - n)), K = Math.max(Math.abs(a), Math.abs(a - p)));
          break;
        case 3:
          if (t.shape === 0) S = K = Math.max(De(e, a), De(e, a - p), De(e - n, a), De(e - n, a - p));
          else if (t.shape === 1) {
            var W = Math.max(Math.abs(a), Math.abs(a - p)) / Math.max(Math.abs(e), Math.abs(e - n)), cA = ws(n, p, e, a, !1), nA = cA[0], oA = cA[1];
            S = De(nA - e, (oA - a) / W), K = W * S;
          }
          break;
      }
      return Array.isArray(t.size) && (S = ZA(t.size[0], n), K = t.size.length === 2 ? ZA(t.size[1], p) : S), [S, K];
    }, rh = function(t, e) {
      var a = xe(180), n = [];
      return ke(e).forEach(function(p, S) {
        if (S === 0) {
          var K = p[0];
          if (K.type === 20 && K.value === "to") {
            a = hs(p);
            return;
          } else if (cs(K)) {
            a = ln.parse(t, K);
            return;
          }
        }
        var W = un(t, p);
        n.push(W);
      }), {
        angle: a,
        stops: n,
        type: 1
      };
    }, cn = function(t, e) {
      var a = xe(180), n = [];
      return ke(e).forEach(function(p, S) {
        if (S === 0) {
          var K = p[0];
          if (K.type === 20 && [
            "top",
            "left",
            "right",
            "bottom"
          ].indexOf(K.value) !== -1) {
            a = hs(p);
            return;
          } else if (cs(K)) {
            a = (ln.parse(t, K) + xe(270)) % xe(360);
            return;
          }
        }
        var W = un(t, p);
        n.push(W);
      }), {
        angle: a,
        stops: n,
        type: 1
      };
    }, nh = function(t, e) {
      var a = xe(180), n = [], p = 1, S = 0, K = 3, W = [];
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
            var cA = ht.parse(t, oA.values[0]);
            n.push({
              stop: ue,
              color: cA
            });
          } else if (oA.name === "to") {
            var cA = ht.parse(t, oA.values[0]);
            n.push({
              stop: ct,
              color: cA
            });
          } else if (oA.name === "color-stop") {
            var wA = oA.values.filter(zt);
            if (wA.length === 2) {
              var cA = ht.parse(t, wA[1]), TA = wA[0];
              jt(TA) && n.push({
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
        angle: (a + xe(180)) % xe(360),
        stops: n,
        type: p
      } : {
        size: K,
        shape: S,
        stops: n,
        position: W,
        type: p
      };
    }, Bs = "closest-side", ms = "farthest-side", vs = "closest-corner", ys = "farthest-corner", Cs = "circle", Fs = "ellipse", Es = "cover", Qs = "contain", ih = function(t, e) {
      var a = 0, n = 3, p = [], S = [];
      return ke(e).forEach(function(K, W) {
        var X = !0;
        if (W === 0) {
          var nA = !1;
          X = K.reduce(function(cA, wA) {
            if (nA)
              if (JA(wA)) switch (wA.value) {
                case "center":
                  return S.push(pi), cA;
                case "top":
                case "left":
                  return S.push(ue), cA;
                case "right":
                case "bottom":
                  return S.push(ct), cA;
              }
              else (ae(wA) || ut(wA)) && S.push(wA);
            else if (JA(wA)) switch (wA.value) {
              case Cs:
                return a = 0, !1;
              case Fs:
                return a = 1, !1;
              case "at":
                return nA = !0, !1;
              case Bs:
                return n = 0, !1;
              case Es:
              case ms:
                return n = 1, !1;
              case Qs:
              case vs:
                return n = 2, !1;
              case ys:
                return n = 3, !1;
            }
            else if (ut(wA) || ae(wA))
              return Array.isArray(n) || (n = []), n.push(wA), !1;
            return cA;
          }, X);
        }
        if (X) {
          var oA = un(t, K);
          p.push(oA);
        }
      }), {
        size: n,
        shape: a,
        stops: p,
        position: S,
        type: 2
      };
    }, hn = function(t, e) {
      var a = 0, n = 3, p = [], S = [];
      return ke(e).forEach(function(K, W) {
        var X = !0;
        if (W === 0 ? X = K.reduce(function(oA, cA) {
          if (JA(cA)) switch (cA.value) {
            case "center":
              return S.push(pi), !1;
            case "top":
            case "left":
              return S.push(ue), !1;
            case "right":
            case "bottom":
              return S.push(ct), !1;
          }
          else if (ae(cA) || ut(cA))
            return S.push(cA), !1;
          return oA;
        }, X) : W === 1 && (X = K.reduce(function(oA, cA) {
          if (JA(cA)) switch (cA.value) {
            case Cs:
              return a = 0, !1;
            case Fs:
              return a = 1, !1;
            case Qs:
            case Bs:
              return n = 0, !1;
            case ms:
              return n = 1, !1;
            case vs:
              return n = 2, !1;
            case Es:
            case ys:
              return n = 3, !1;
          }
          else if (ut(cA) || ae(cA))
            return Array.isArray(n) || (n = []), n.push(cA), !1;
          return oA;
        }, X)), X) {
          var nA = un(t, K);
          p.push(nA);
        }
      }), {
        size: n,
        shape: a,
        stops: p,
        position: S,
        type: 2
      };
    }, ah = function(t) {
      return t.type === 1;
    }, sh = function(t) {
      return t.type === 2;
    }, wi = {
      name: "image",
      parse: function(t, e) {
        if (e.type === 22) {
          var a = {
            url: e.value,
            type: 0
          };
          return t.cache.addImage(e.value), a;
        }
        if (e.type === 18) {
          var n = Us[e.name];
          if (typeof n > "u") throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
          return n(t, e.values);
        }
        throw new Error("Unsupported image type " + e.type);
      }
    };
    function oh(t) {
      return !(t.type === 20 && t.value === "none") && (t.type !== 18 || !!Us[t.name]);
    }
    var Us = {
      "linear-gradient": rh,
      "-moz-linear-gradient": cn,
      "-ms-linear-gradient": cn,
      "-o-linear-gradient": cn,
      "-webkit-linear-gradient": cn,
      "radial-gradient": ih,
      "-moz-radial-gradient": hn,
      "-ms-radial-gradient": hn,
      "-o-radial-gradient": hn,
      "-webkit-radial-gradient": hn,
      "-webkit-gradient": nh
    }, lh = {
      name: "background-image",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        var a = e[0];
        return a.type === 20 && a.value === "none" ? [] : e.filter(function(n) {
          return zt(n) && oh(n);
        }).map(function(n) {
          return wi.parse(t, n);
        });
      }
    }, uh = {
      name: "background-origin",
      initialValue: "border-box",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.map(function(a) {
          if (JA(a)) switch (a.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, ch = {
      name: "background-position",
      initialValue: "0% 0%",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return ke(e).map(function(a) {
          return a.filter(ae);
        }).map(as);
      }
    }, hh = {
      name: "background-repeat",
      initialValue: "repeat",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return ke(e).map(function(a) {
          return a.filter(JA).map(function(n) {
            return n.value;
          }).join(" ");
        }).map(fh);
      }
    }, fh = function(t) {
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
    }, Jt;
    (function(t) {
      t.AUTO = "auto", t.CONTAIN = "contain", t.COVER = "cover";
    })(Jt || (Jt = {}));
    var dh = {
      name: "background-size",
      initialValue: "0",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return ke(e).map(function(a) {
          return a.filter(ph);
        });
      }
    }, ph = function(t) {
      return JA(t) || ae(t);
    }, fn = function(t) {
      return {
        name: "border-" + t + "-color",
        initialValue: "transparent",
        prefix: !1,
        type: 3,
        format: "color"
      };
    }, gh = fn("top"), wh = fn("right"), Bh = fn("bottom"), mh = fn("left"), dn = function(t) {
      return {
        name: "border-radius-" + t,
        initialValue: "0 0",
        prefix: !1,
        type: 1,
        parse: function(e, a) {
          return as(a.filter(ae));
        }
      };
    }, vh = dn("top-left"), yh = dn("top-right"), Ch = dn("bottom-right"), Fh = dn("bottom-left"), pn = function(t) {
      return {
        name: "border-" + t + "-style",
        initialValue: "solid",
        prefix: !1,
        type: 2,
        parse: function(e, a) {
          switch (a) {
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
    }, Eh = pn("top"), Qh = pn("right"), Uh = pn("bottom"), bh = pn("left"), gn = function(t) {
      return {
        name: "border-" + t + "-width",
        initialValue: "0",
        type: 0,
        prefix: !1,
        parse: function(e, a) {
          return Ir(a) ? a.number : 0;
        }
      };
    }, Ih = gn("top"), _h = gn("right"), xh = gn("bottom"), Th = gn("left"), Sh = {
      name: "color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, Hh = {
      name: "direction",
      initialValue: "ltr",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "rtl" ? 1 : 0;
      }
    }, Lh = {
      name: "display",
      initialValue: "inline-block",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).reduce(function(a, n) {
          return a | Dh(n.value);
        }, 0);
      }
    }, Dh = function(t) {
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
    }, Rh = {
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
    }, Oh = {
      name: "letter-spacing",
      initialValue: "0",
      prefix: !1,
      type: 0,
      parse: function(t, e) {
        return e.type === 20 && e.value === "normal" ? 0 : e.type === 17 || e.type === 15 ? e.number : 0;
      }
    }, wn;
    (function(t) {
      t.NORMAL = "normal", t.STRICT = "strict";
    })(wn || (wn = {}));
    var Nh = {
      name: "line-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "strict" ? wn.STRICT : wn.NORMAL;
      }
    }, kh = {
      name: "line-height",
      initialValue: "normal",
      prefix: !1,
      type: 4
    }, bs = function(t, e) {
      return JA(t) && t.value === "normal" ? 1.2 * e : t.type === 17 ? e * t.number : ae(t) ? ZA(t, e) : e;
    }, Kh = {
      name: "list-style-image",
      initialValue: "none",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return e.type === 20 && e.value === "none" ? null : wi.parse(t, e);
      }
    }, Mh = {
      name: "list-style-position",
      initialValue: "outside",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "inside" ? 0 : 1;
      }
    }, Bi = {
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
    }, Bn = function(t) {
      return {
        name: "margin-" + t,
        initialValue: "0",
        prefix: !1,
        type: 4
      };
    }, Ph = Bn("top"), Gh = Bn("right"), Vh = Bn("bottom"), Wh = Bn("left"), Xh = {
      name: "overflow",
      initialValue: "visible",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).map(function(a) {
          switch (a.value) {
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
    }, jh = {
      name: "overflow-wrap",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        return e === "break-word" ? "break-word" : "normal";
      }
    }, mn = function(t) {
      return {
        name: "padding-" + t,
        initialValue: "0",
        prefix: !1,
        type: 3,
        format: "length-percentage"
      };
    }, zh = mn("top"), Jh = mn("right"), Yh = mn("bottom"), qh = mn("left"), Zh = {
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
    }, $h = {
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
    }, Af = {
      name: "text-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.length === 1 && di(e[0], "none") ? [] : ke(e).map(function(a) {
          for (var n = {
            color: qe.TRANSPARENT,
            offsetX: ue,
            offsetY: ue,
            blur: ue
          }, p = 0, S = 0; S < a.length; S++) {
            var K = a[S];
            ut(K) ? (p === 0 ? n.offsetX = K : p === 1 ? n.offsetY = K : n.blur = K, p++) : n.color = ht.parse(t, K);
          }
          return n;
        });
      }
    }, ef = {
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
    }, tf = {
      name: "transform",
      initialValue: "none",
      prefix: !0,
      type: 0,
      parse: function(t, e) {
        if (e.type === 20 && e.value === "none") return null;
        if (e.type === 18) {
          var a = af[e.name];
          if (typeof a > "u") throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
          return a(e.values);
        }
        return null;
      }
    }, rf = function(t) {
      var e = t.filter(function(a) {
        return a.type === 17;
      }).map(function(a) {
        return a.number;
      });
      return e.length === 6 ? e : null;
    }, nf = function(t) {
      var e = t.filter(function(X) {
        return X.type === 17;
      }).map(function(X) {
        return X.number;
      }), a = e[0], n = e[1];
      e[2], e[3];
      var p = e[4], S = e[5];
      e[6], e[7], e[8], e[9], e[10], e[11];
      var K = e[12], W = e[13];
      return e[14], e[15], e.length === 16 ? [
        a,
        n,
        p,
        S,
        K,
        W
      ] : null;
    }, af = {
      matrix: rf,
      matrix3d: nf
    }, Is = {
      type: 16,
      number: 50,
      flags: Fr
    }, sf = [Is, Is], of = {
      name: "transform-origin",
      initialValue: "50% 50%",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        var a = e.filter(ae);
        return a.length !== 2 ? sf : [a[0], a[1]];
      }
    }, lf = {
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
    }, Tr;
    (function(t) {
      t.NORMAL = "normal", t.BREAK_ALL = "break-all", t.KEEP_ALL = "keep-all";
    })(Tr || (Tr = {}));
    for (var uf = {
      name: "word-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(t, e) {
        switch (e) {
          case "break-all":
            return Tr.BREAK_ALL;
          case "keep-all":
            return Tr.KEEP_ALL;
          default:
            return Tr.NORMAL;
        }
      }
    }, cf = {
      name: "z-index",
      initialValue: "auto",
      prefix: !1,
      type: 0,
      parse: function(t, e) {
        if (e.type === 20) return {
          auto: !0,
          order: 0
        };
        if (jt(e)) return {
          auto: !1,
          order: e.number
        };
        throw new Error("Invalid z-index number parsed");
      }
    }, _s = {
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
    }, hf = {
      name: "opacity",
      initialValue: "1",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return jt(e) ? e.number : 1;
      }
    }, ff = {
      name: "text-decoration-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, df = {
      name: "text-decoration-line",
      initialValue: "none",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(JA).map(function(a) {
          switch (a.value) {
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
        }).filter(function(a) {
          return a !== 0;
        });
      }
    }, pf = {
      name: "font-family",
      initialValue: "",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        var a = [], n = [];
        return e.forEach(function(p) {
          switch (p.type) {
            case 20:
            case 0:
              a.push(p.value);
              break;
            case 17:
              a.push(p.number.toString());
              break;
            case 4:
              n.push(a.join(" ")), a.length = 0;
              break;
          }
        }), a.length && n.push(a.join(" ")), n.map(function(p) {
          return p.indexOf(" ") === -1 ? p : "'" + p + "'";
        });
      }
    }, gf = {
      name: "font-size",
      initialValue: "0",
      prefix: !1,
      type: 3,
      format: "length"
    }, wf = {
      name: "font-weight",
      initialValue: "normal",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return jt(e) ? e.number : JA(e) && e.value === "bold" ? 700 : 400;
      }
    }, Bf = {
      name: "font-variant",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.filter(JA).map(function(a) {
          return a.value;
        });
      }
    }, mf = {
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
    }, vf = {
      name: "content",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        var a = e[0];
        return a.type === 20 && a.value === "none" ? [] : e;
      }
    }, yf = {
      name: "counter-increment",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return null;
        var a = e[0];
        if (a.type === 20 && a.value === "none") return null;
        for (var n = [], p = e.filter(is), S = 0; S < p.length; S++) {
          var K = p[S], W = p[S + 1];
          if (K.type === 20) {
            var X = W && jt(W) ? W.number : 1;
            n.push({
              counter: K.value,
              increment: X
            });
          }
        }
        return n;
      }
    }, Cf = {
      name: "counter-reset",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return [];
        for (var a = [], n = e.filter(is), p = 0; p < n.length; p++) {
          var S = n[p], K = n[p + 1];
          if (JA(S) && S.value !== "none") {
            var W = K && jt(K) ? K.number : 0;
            a.push({
              counter: S.value,
              reset: W
            });
          }
        }
        return a;
      }
    }, Ff = {
      name: "duration",
      initialValue: "0s",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        return e.filter(Ir).map(function(a) {
          return _s.parse(t, a);
        });
      }
    }, Ef = {
      name: "quotes",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(t, e) {
        if (e.length === 0) return null;
        var a = e[0];
        if (a.type === 20 && a.value === "none") return null;
        var n = [], p = e.filter(Jc);
        if (p.length % 2 !== 0) return null;
        for (var S = 0; S < p.length; S += 2) {
          var K = p[S].value, W = p[S + 1].value;
          n.push({
            open: K,
            close: W
          });
        }
        return n;
      }
    }, xs = function(t, e, a) {
      if (!t) return "";
      var n = t[Math.min(e, t.length - 1)];
      return n ? a ? n.open : n.close : "";
    }, Qf = {
      name: "box-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(t, e) {
        return e.length === 1 && di(e[0], "none") ? [] : ke(e).map(function(a) {
          for (var n = {
            color: 255,
            offsetX: ue,
            offsetY: ue,
            blur: ue,
            spread: ue,
            inset: !1
          }, p = 0, S = 0; S < a.length; S++) {
            var K = a[S];
            di(K, "inset") ? n.inset = !0 : ut(K) ? (p === 0 ? n.offsetX = K : p === 1 ? n.offsetY = K : p === 2 ? n.blur = K : n.spread = K, p++) : n.color = ht.parse(t, K);
          }
          return n;
        });
      }
    }, Uf = {
      name: "paint-order",
      initialValue: "normal",
      prefix: !1,
      type: 1,
      parse: function(t, e) {
        var a = [
          0,
          1,
          2
        ], n = [];
        return e.filter(JA).forEach(function(p) {
          switch (p.value) {
            case "stroke":
              n.push(1);
              break;
            case "fill":
              n.push(0);
              break;
            case "markers":
              n.push(2);
              break;
          }
        }), a.forEach(function(p) {
          n.indexOf(p) === -1 && n.push(p);
        }), n;
      }
    }, bf = {
      name: "-webkit-text-stroke-color",
      initialValue: "currentcolor",
      prefix: !1,
      type: 3,
      format: "color"
    }, If = {
      name: "-webkit-text-stroke-width",
      initialValue: "0",
      type: 0,
      prefix: !1,
      parse: function(t, e) {
        return Ir(e) ? e.number : 0;
      }
    }, _f = (function() {
      function t(e, a) {
        var n, p;
        this.animationDuration = LA(e, Ff, a.animationDuration), this.backgroundClip = LA(e, Zc, a.backgroundClip), this.backgroundColor = LA(e, $c, a.backgroundColor), this.backgroundImage = LA(e, lh, a.backgroundImage), this.backgroundOrigin = LA(e, uh, a.backgroundOrigin), this.backgroundPosition = LA(e, ch, a.backgroundPosition), this.backgroundRepeat = LA(e, hh, a.backgroundRepeat), this.backgroundSize = LA(e, dh, a.backgroundSize), this.borderTopColor = LA(e, gh, a.borderTopColor), this.borderRightColor = LA(e, wh, a.borderRightColor), this.borderBottomColor = LA(e, Bh, a.borderBottomColor), this.borderLeftColor = LA(e, mh, a.borderLeftColor), this.borderTopLeftRadius = LA(e, vh, a.borderTopLeftRadius), this.borderTopRightRadius = LA(e, yh, a.borderTopRightRadius), this.borderBottomRightRadius = LA(e, Ch, a.borderBottomRightRadius), this.borderBottomLeftRadius = LA(e, Fh, a.borderBottomLeftRadius), this.borderTopStyle = LA(e, Eh, a.borderTopStyle), this.borderRightStyle = LA(e, Qh, a.borderRightStyle), this.borderBottomStyle = LA(e, Uh, a.borderBottomStyle), this.borderLeftStyle = LA(e, bh, a.borderLeftStyle), this.borderTopWidth = LA(e, Ih, a.borderTopWidth), this.borderRightWidth = LA(e, _h, a.borderRightWidth), this.borderBottomWidth = LA(e, xh, a.borderBottomWidth), this.borderLeftWidth = LA(e, Th, a.borderLeftWidth), this.boxShadow = LA(e, Qf, a.boxShadow), this.color = LA(e, Sh, a.color), this.direction = LA(e, Hh, a.direction), this.display = LA(e, Lh, a.display), this.float = LA(e, Rh, a.cssFloat), this.fontFamily = LA(e, pf, a.fontFamily), this.fontSize = LA(e, gf, a.fontSize), this.fontStyle = LA(e, mf, a.fontStyle), this.fontVariant = LA(e, Bf, a.fontVariant), this.fontWeight = LA(e, wf, a.fontWeight), this.letterSpacing = LA(e, Oh, a.letterSpacing), this.lineBreak = LA(e, Nh, a.lineBreak), this.lineHeight = LA(e, kh, a.lineHeight), this.listStyleImage = LA(e, Kh, a.listStyleImage), this.listStylePosition = LA(e, Mh, a.listStylePosition), this.listStyleType = LA(e, Bi, a.listStyleType), this.marginTop = LA(e, Ph, a.marginTop), this.marginRight = LA(e, Gh, a.marginRight), this.marginBottom = LA(e, Vh, a.marginBottom), this.marginLeft = LA(e, Wh, a.marginLeft), this.opacity = LA(e, hf, a.opacity);
        var S = LA(e, Xh, a.overflow);
        this.overflowX = S[0], this.overflowY = S[S.length > 1 ? 1 : 0], this.overflowWrap = LA(e, jh, a.overflowWrap), this.paddingTop = LA(e, zh, a.paddingTop), this.paddingRight = LA(e, Jh, a.paddingRight), this.paddingBottom = LA(e, Yh, a.paddingBottom), this.paddingLeft = LA(e, qh, a.paddingLeft), this.paintOrder = LA(e, Uf, a.paintOrder), this.position = LA(e, $h, a.position), this.textAlign = LA(e, Zh, a.textAlign), this.textDecorationColor = LA(e, ff, (n = a.textDecorationColor) !== null && n !== void 0 ? n : a.color), this.textDecorationLine = LA(e, df, (p = a.textDecorationLine) !== null && p !== void 0 ? p : a.textDecoration), this.textShadow = LA(e, Af, a.textShadow), this.textTransform = LA(e, ef, a.textTransform), this.transform = LA(e, tf, a.transform), this.transformOrigin = LA(e, of, a.transformOrigin), this.visibility = LA(e, lf, a.visibility), this.webkitTextStrokeColor = LA(e, bf, a.webkitTextStrokeColor), this.webkitTextStrokeWidth = LA(e, If, a.webkitTextStrokeWidth), this.wordBreak = LA(e, uf, a.wordBreak), this.zIndex = LA(e, cf, a.zIndex);
      }
      return t.prototype.isVisible = function() {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      }, t.prototype.isTransparent = function() {
        return ft(this.backgroundColor);
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
    })(), xf = /* @__PURE__ */ (function() {
      function t(e, a) {
        this.content = LA(e, vf, a.content), this.quotes = LA(e, Ef, a.quotes);
      }
      return t;
    })(), Ts = /* @__PURE__ */ (function() {
      function t(e, a) {
        this.counterIncrement = LA(e, yf, a.counterIncrement), this.counterReset = LA(e, Cf, a.counterReset);
      }
      return t;
    })(), LA = function(t, e, a) {
      var n = new rs(), p = a !== null && typeof a < "u" ? a.toString() : e.initialValue;
      n.write(p);
      var S = new ns(n.read());
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
              return ln.parse(t, S.parseComponentValue());
            case "color":
              return ht.parse(t, S.parseComponentValue());
            case "image":
              return wi.parse(t, S.parseComponentValue());
            case "length":
              var W = S.parseComponentValue();
              return ut(W) ? W : ue;
            case "length-percentage":
              var X = S.parseComponentValue();
              return ae(X) ? X : ue;
            case "time":
              return _s.parse(t, S.parseComponentValue());
          }
          break;
      }
    }, Tf = "data-html2canvas-debug", Sf = function(t) {
      switch (t.getAttribute(Tf)) {
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
    }, mi = function(t, e) {
      var a = Sf(t);
      return a === 1 || e === a;
    }, Ke = /* @__PURE__ */ (function() {
      function t(e, a) {
        if (this.context = e, this.textNodes = [], this.elements = [], this.flags = 0, mi(a, 3)) debugger;
        this.styles = new _f(e, window.getComputedStyle(a, null)), Hi(a) && (this.styles.animationDuration.some(function(n) {
          return n > 0;
        }) && (a.style.animationDuration = "0s"), this.styles.transform !== null && (a.style.transform = "none")), this.bounds = U(this.context, a), mi(a, 4) && (this.flags |= 16);
      }
      return t;
    })(), Hf = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", Ss = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Sr = typeof Uint8Array > "u" ? [] : new Uint8Array(256), vn = 0; vn < Ss.length; vn++) Sr[Ss.charCodeAt(vn)] = vn;
    for (var Lf = function(t) {
      var e = t.length * 0.75, a = t.length, n, p = 0, S, K, W, X;
      t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
      var nA = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), oA = Array.isArray(nA) ? nA : new Uint8Array(nA);
      for (n = 0; n < a; n += 4)
        S = Sr[t.charCodeAt(n)], K = Sr[t.charCodeAt(n + 1)], W = Sr[t.charCodeAt(n + 2)], X = Sr[t.charCodeAt(n + 3)], oA[p++] = S << 2 | K >> 4, oA[p++] = (K & 15) << 4 | W >> 2, oA[p++] = (W & 3) << 6 | X & 63;
      return nA;
    }, Df = function(t) {
      for (var e = t.length, a = [], n = 0; n < e; n += 2) a.push(t[n + 1] << 8 | t[n]);
      return a;
    }, Rf = function(t) {
      for (var e = t.length, a = [], n = 0; n < e; n += 4) a.push(t[n + 3] << 24 | t[n + 2] << 16 | t[n + 1] << 8 | t[n]);
      return a;
    }, _t = 5, vi = 11, yi = 2, Of = vi - _t, Hs = 65536 >> _t, Ci = (1 << _t) - 1, Nf = Hs + (1024 >> _t) + 32, kf = 65536 >> vi, Kf = (1 << Of) - 1, Ls = function(t, e, a) {
      return t.slice ? t.slice(e, a) : new Uint16Array(Array.prototype.slice.call(t, e, a));
    }, Mf = function(t, e, a) {
      return t.slice ? t.slice(e, a) : new Uint32Array(Array.prototype.slice.call(t, e, a));
    }, Pf = function(t, e) {
      var a = Lf(t), n = Array.isArray(a) ? Rf(a) : new Uint32Array(a), p = Array.isArray(a) ? Df(a) : new Uint16Array(a), S = 24, K = Ls(p, S / 2, n[4] / 2), W = n[5] === 2 ? Ls(p, (S + n[4]) / 2) : Mf(n, Math.ceil((S + n[4]) / 4));
      return new Gf(n[0], n[1], n[2], n[3], K, W);
    }, Gf = (function() {
      function t(e, a, n, p, S, K) {
        this.initialValue = e, this.errorValue = a, this.highStart = n, this.highValueIndex = p, this.index = S, this.data = K;
      }
      return t.prototype.get = function(e) {
        var a;
        if (e >= 0) {
          if (e < 55296 || e > 56319 && e <= 65535)
            return a = this.index[e >> _t], a = (a << yi) + (e & Ci), this.data[a];
          if (e <= 65535)
            return a = this.index[Hs + (e - 55296 >> _t)], a = (a << yi) + (e & Ci), this.data[a];
          if (e < this.highStart)
            return a = Nf - kf + (e >> vi), a = this.index[a], a += e >> _t & Kf, a = this.index[a], a = (a << yi) + (e & Ci), this.data[a];
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, t;
    })(), Ds = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Vf = typeof Uint8Array > "u" ? [] : new Uint8Array(256), yn = 0; yn < Ds.length; yn++) Vf[Ds.charCodeAt(yn)] = yn;
    var Wf = 1, Fi = 2, Ei = 3, Rs = 4, Os = 5, Xf = 7, Ns = 8, Qi = 9, Ui = 10, ks = 11, Ks = 12, Ms = 13, Ps = 14, bi = 15, jf = function(t) {
      for (var e = [], a = 0, n = t.length; a < n; ) {
        var p = t.charCodeAt(a++);
        if (p >= 55296 && p <= 56319 && a < n) {
          var S = t.charCodeAt(a++);
          (S & 64512) === 56320 ? e.push(((p & 1023) << 10) + (S & 1023) + 65536) : (e.push(p), a--);
        } else e.push(p);
      }
      return e;
    }, zf = function() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, t);
      var a = t.length;
      if (!a) return "";
      for (var n = [], p = -1, S = ""; ++p < a; ) {
        var K = t[p];
        K <= 65535 ? n.push(K) : (K -= 65536, n.push((K >> 10) + 55296, K % 1024 + 56320)), (p + 1 === a || n.length > 16384) && (S += String.fromCharCode.apply(String, n), n.length = 0);
      }
      return S;
    }, Jf = Pf(Hf), Te = "×", Ii = "÷", Yf = function(t) {
      return Jf.get(t);
    }, qf = function(t, e, a) {
      var n = a - 2, p = e[n], S = e[a - 1], K = e[a];
      if (S === Fi && K === Ei) return Te;
      if (S === Fi || S === Ei || S === Rs || K === Fi || K === Ei || K === Rs) return Ii;
      if (S === Ns && [
        Ns,
        Qi,
        ks,
        Ks
      ].indexOf(K) !== -1 || (S === ks || S === Qi) && (K === Qi || K === Ui) || (S === Ks || S === Ui) && K === Ui || K === Ms || K === Os || K === Xf || S === Wf) return Te;
      if (S === Ms && K === Ps) {
        for (; p === Os; ) p = e[--n];
        if (p === Ps) return Te;
      }
      if (S === bi && K === bi) {
        for (var W = 0; p === bi; )
          W++, p = e[--n];
        if (W % 2 === 0) return Te;
      }
      return Ii;
    }, Zf = function(t) {
      var e = jf(t), a = e.length, n = 0, p = 0, S = e.map(Yf);
      return { next: function() {
        if (n >= a) return {
          done: !0,
          value: null
        };
        for (var K = Te; n < a && (K = qf(e, S, ++n)) === Te; ) ;
        if (K !== Te || n === a) {
          var W = zf.apply(null, e.slice(p, n));
          return p = n, {
            value: W,
            done: !1
          };
        }
        return {
          done: !0,
          value: null
        };
      } };
    }, $f = function(t) {
      for (var e = Zf(t), a = [], n; !(n = e.next()).done; ) n.value && a.push(n.value.slice());
      return a;
    }, Ad = function(t) {
      var e = 123;
      if (t.createRange) {
        var a = t.createRange();
        if (a.getBoundingClientRect) {
          var n = t.createElement("boundtest");
          n.style.height = e + "px", n.style.display = "block", t.body.appendChild(n), a.selectNode(n);
          var p = a.getBoundingClientRect(), S = Math.round(p.height);
          if (t.body.removeChild(n), S === e) return !0;
        }
      }
      return !1;
    }, ed = function(t) {
      var e = t.createElement("boundtest");
      e.style.width = "50px", e.style.display = "block", e.style.fontSize = "12px", e.style.letterSpacing = "0px", e.style.wordSpacing = "0px", t.body.appendChild(e);
      var a = t.createRange();
      e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
      var n = e.firstChild, p = B(n.data).map(function(X) {
        return _(X);
      }), S = 0, K = {}, W = p.every(function(X, nA) {
        a.setStart(n, S), a.setEnd(n, S + X.length);
        var oA = a.getBoundingClientRect();
        S += X.length;
        var cA = oA.x > K.x || oA.y > K.y;
        return K = oA, nA === 0 ? !0 : cA;
      });
      return t.body.removeChild(e), W;
    }, td = function() {
      return typeof new Image().crossOrigin < "u";
    }, rd = function() {
      return typeof new XMLHttpRequest().responseType == "string";
    }, nd = function(t) {
      var e = new Image(), a = t.createElement("canvas"), n = a.getContext("2d");
      if (!n) return !1;
      e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
        n.drawImage(e, 0, 0), a.toDataURL();
      } catch {
        return !1;
      }
      return !0;
    }, Gs = function(t) {
      return t[0] === 0 && t[1] === 255 && t[2] === 0 && t[3] === 255;
    }, id = function(t) {
      var e = t.createElement("canvas"), a = 100;
      e.width = a, e.height = a;
      var n = e.getContext("2d");
      if (!n) return Promise.reject(!1);
      n.fillStyle = "rgb(0, 255, 0)", n.fillRect(0, 0, a, a);
      var p = new Image(), S = e.toDataURL();
      p.src = S;
      var K = _i(a, a, 0, 0, p);
      return n.fillStyle = "red", n.fillRect(0, 0, a, a), Vs(K).then(function(W) {
        n.drawImage(W, 0, 0);
        var X = n.getImageData(0, 0, a, a).data;
        n.fillStyle = "red", n.fillRect(0, 0, a, a);
        var nA = t.createElement("div");
        return nA.style.backgroundImage = "url(" + S + ")", nA.style.height = a + "px", Gs(X) ? Vs(_i(a, a, 0, 0, nA)) : Promise.reject(!1);
      }).then(function(W) {
        return n.drawImage(W, 0, 0), Gs(n.getImageData(0, 0, a, a).data);
      }).catch(function() {
        return !1;
      });
    }, _i = function(t, e, a, n, p) {
      var S = "http://www.w3.org/2000/svg", K = document.createElementNS(S, "svg"), W = document.createElementNS(S, "foreignObject");
      return K.setAttributeNS(null, "width", t.toString()), K.setAttributeNS(null, "height", e.toString()), W.setAttributeNS(null, "width", "100%"), W.setAttributeNS(null, "height", "100%"), W.setAttributeNS(null, "x", a.toString()), W.setAttributeNS(null, "y", n.toString()), W.setAttributeNS(null, "externalResourcesRequired", "true"), K.appendChild(W), W.appendChild(p), K;
    }, Vs = function(t) {
      return new Promise(function(e, a) {
        var n = new Image();
        n.onload = function() {
          return e(n);
        }, n.onerror = a, n.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(t));
      });
    }, ce = {
      get SUPPORT_RANGE_BOUNDS() {
        var t = Ad(document);
        return Object.defineProperty(ce, "SUPPORT_RANGE_BOUNDS", { value: t }), t;
      },
      get SUPPORT_WORD_BREAKING() {
        var t = ce.SUPPORT_RANGE_BOUNDS && ed(document);
        return Object.defineProperty(ce, "SUPPORT_WORD_BREAKING", { value: t }), t;
      },
      get SUPPORT_SVG_DRAWING() {
        var t = nd(document);
        return Object.defineProperty(ce, "SUPPORT_SVG_DRAWING", { value: t }), t;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var t = typeof Array.from == "function" && typeof window.fetch == "function" ? id(document) : Promise.resolve(!1);
        return Object.defineProperty(ce, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: t }), t;
      },
      get SUPPORT_CORS_IMAGES() {
        var t = td();
        return Object.defineProperty(ce, "SUPPORT_CORS_IMAGES", { value: t }), t;
      },
      get SUPPORT_RESPONSE_TYPE() {
        var t = rd();
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
    }, Hr = /* @__PURE__ */ (function() {
      function t(e, a) {
        this.text = e, this.bounds = a;
      }
      return t;
    })(), ad = function(t, e, a, n) {
      var p = ld(e, a), S = [], K = 0;
      return p.forEach(function(W) {
        if (a.textDecorationLine.length || W.trim().length > 0) if (ce.SUPPORT_RANGE_BOUNDS) {
          var X = Ws(n, K, W.length).getClientRects();
          if (X.length > 1) {
            var nA = xi(W), oA = 0;
            nA.forEach(function(wA) {
              S.push(new Hr(wA, d.fromDOMRectList(t, Ws(n, oA + K, wA.length).getClientRects()))), oA += wA.length;
            });
          } else S.push(new Hr(W, d.fromDOMRectList(t, X)));
        } else {
          var cA = n.splitText(W.length);
          S.push(new Hr(W, sd(t, n))), n = cA;
        }
        else ce.SUPPORT_RANGE_BOUNDS || (n = n.splitText(W.length));
        K += W.length;
      }), S;
    }, sd = function(t, e) {
      var a = e.ownerDocument;
      if (a) {
        var n = a.createElement("html2canvaswrapper");
        n.appendChild(e.cloneNode(!0));
        var p = e.parentNode;
        if (p) {
          p.replaceChild(n, e);
          var S = U(t, n);
          return n.firstChild && p.replaceChild(n.firstChild, n), S;
        }
      }
      return d.EMPTY;
    }, Ws = function(t, e, a) {
      var n = t.ownerDocument;
      if (!n) throw new Error("Node has no owner document");
      var p = n.createRange();
      return p.setStart(t, e), p.setEnd(t, e + a), p;
    }, xi = function(t) {
      if (ce.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
        return Array.from(e.segment(t)).map(function(a) {
          return a.segment;
        });
      }
      return $f(t);
    }, od = function(t, e) {
      if (ce.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var a = new Intl.Segmenter(void 0, { granularity: "word" });
        return Array.from(a.segment(t)).map(function(n) {
          return n.segment;
        });
      }
      return cd(t, e);
    }, ld = function(t, e) {
      return e.letterSpacing !== 0 ? xi(t) : od(t, e);
    }, ud = [
      32,
      160,
      4961,
      65792,
      65793,
      4153,
      4241
    ], cd = function(t, e) {
      for (var a = Gu(t, {
        lineBreak: e.lineBreak,
        wordBreak: e.overflowWrap === "break-word" ? "break-word" : e.wordBreak
      }), n = [], p, S = function() {
        if (p.value) {
          var K = B(p.value.slice()), W = "";
          K.forEach(function(X) {
            ud.indexOf(X) === -1 ? W += _(X) : (W.length && n.push(W), n.push(_(X)), W = "");
          }), W.length && n.push(W);
        }
      }; !(p = a.next()).done; ) S();
      return n;
    }, hd = /* @__PURE__ */ (function() {
      function t(e, a, n) {
        this.text = fd(a.data, n.textTransform), this.textBounds = ad(e, this.text, n, a);
      }
      return t;
    })(), fd = function(t, e) {
      switch (e) {
        case 1:
          return t.toLowerCase();
        case 3:
          return t.replace(dd, pd);
        case 2:
          return t.toUpperCase();
        default:
          return t;
      }
    }, dd = /(^|\s|:|-|\(|\))([a-z])/g, pd = function(t, e, a) {
      return t.length > 0 ? e + a.toUpperCase() : t;
    }, Xs = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.src = n.currentSrc || n.src, p.intrinsicWidth = n.naturalWidth, p.intrinsicHeight = n.naturalHeight, p.context.cache.addImage(p.src), p;
      }
      return e;
    })(Ke), js = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.canvas = n, p.intrinsicWidth = n.width, p.intrinsicHeight = n.height, p;
      }
      return e;
    })(Ke), zs = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this, S = new XMLSerializer(), K = U(a, n);
        return n.setAttribute("width", K.width + "px"), n.setAttribute("height", K.height + "px"), p.svg = "data:image/svg+xml," + encodeURIComponent(S.serializeToString(n)), p.intrinsicWidth = n.width.baseVal.value, p.intrinsicHeight = n.height.baseVal.value, p.context.cache.addImage(p.svg), p;
      }
      return e;
    })(Ke), Js = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.value = n.value, p;
      }
      return e;
    })(Ke), Ti = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.start = n.start, p.reversed = typeof n.reversed == "boolean" && n.reversed === !0, p;
      }
      return e;
    })(Ke), gd = [{
      type: 15,
      flags: 0,
      unit: "px",
      number: 3
    }], wd = [{
      type: 16,
      flags: 0,
      number: 50
    }], Bd = function(t) {
      return t.width > t.height ? new d(t.left + (t.width - t.height) / 2, t.top, t.height, t.height) : t.width < t.height ? new d(t.left, t.top + (t.height - t.width) / 2, t.width, t.width) : t;
    }, md = function(t) {
      var e = t.type === vd ? new Array(t.value.length + 1).join("•") : t.value;
      return e.length === 0 ? t.placeholder || "" : e;
    }, Cn = "checkbox", Fn = "radio", vd = "password", Ys = 707406591, Si = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        switch (p.type = n.type.toLowerCase(), p.checked = n.checked, p.value = md(n), (p.type === Cn || p.type === Fn) && (p.styles.backgroundColor = 3739148031, p.styles.borderTopColor = p.styles.borderRightColor = p.styles.borderBottomColor = p.styles.borderLeftColor = 2779096575, p.styles.borderTopWidth = p.styles.borderRightWidth = p.styles.borderBottomWidth = p.styles.borderLeftWidth = 1, p.styles.borderTopStyle = p.styles.borderRightStyle = p.styles.borderBottomStyle = p.styles.borderLeftStyle = 1, p.styles.backgroundClip = [0], p.styles.backgroundOrigin = [0], p.bounds = Bd(p.bounds)), p.type) {
          case Cn:
            p.styles.borderTopRightRadius = p.styles.borderTopLeftRadius = p.styles.borderBottomRightRadius = p.styles.borderBottomLeftRadius = gd;
            break;
          case Fn:
            p.styles.borderTopRightRadius = p.styles.borderTopLeftRadius = p.styles.borderBottomRightRadius = p.styles.borderBottomLeftRadius = wd;
            break;
        }
        return p;
      }
      return e;
    })(Ke), qs = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this, S = n.options[n.selectedIndex || 0];
        return p.value = S && S.text || "", p;
      }
      return e;
    })(Ke), Zs = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.value = n.value, p;
      }
      return e;
    })(Ke), $s = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        p.src = n.src, p.width = parseInt(n.width, 10) || 0, p.height = parseInt(n.height, 10) || 0, p.backgroundColor = p.styles.backgroundColor;
        try {
          if (n.contentWindow && n.contentWindow.document && n.contentWindow.document.documentElement) {
            p.tree = eo(a, n.contentWindow.document.documentElement);
            var S = n.contentWindow.document.documentElement ? xr(a, getComputedStyle(n.contentWindow.document.documentElement).backgroundColor) : qe.TRANSPARENT, K = n.contentWindow.document.body ? xr(a, getComputedStyle(n.contentWindow.document.body).backgroundColor) : qe.TRANSPARENT;
            p.backgroundColor = ft(S) ? ft(K) ? p.styles.backgroundColor : K : S;
          }
        } catch {
        }
        return p;
      }
      return e;
    })(Ke), yd = [
      "OL",
      "UL",
      "MENU"
    ], En = function(t, e, a, n) {
      for (var p = e.firstChild, S = void 0; p; p = S)
        if (S = p.nextSibling, to(p) && p.data.trim().length > 0) a.textNodes.push(new hd(t, p, a.styles));
        else if (Yt(p)) if (oo(p) && p.assignedNodes) p.assignedNodes().forEach(function(W) {
          return En(t, W, a, n);
        });
        else {
          var K = Ao(t, p);
          K.styles.isVisible() && (Cd(p, K, n) ? K.flags |= 4 : Fd(K.styles) && (K.flags |= 2), yd.indexOf(p.tagName) !== -1 && (K.flags |= 8), a.elements.push(K), p.slot, p.shadowRoot ? En(t, p.shadowRoot, K, n) : !Un(p) && !ro(p) && !bn(p) && En(t, p, K, n));
        }
    }, Ao = function(t, e) {
      return Di(e) ? new Xs(t, e) : no(e) ? new js(t, e) : ro(e) ? new zs(t, e) : Ed(e) ? new Js(t, e) : Qd(e) ? new Ti(t, e) : Ud(e) ? new Si(t, e) : bn(e) ? new qs(t, e) : Un(e) ? new Zs(t, e) : ao(e) ? new $s(t, e) : new Ke(t, e);
    }, eo = function(t, e) {
      var a = Ao(t, e);
      return a.flags |= 4, En(t, e, a, a), a;
    }, Cd = function(t, e, a) {
      return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || Li(t) && a.styles.isTransparent();
    }, Fd = function(t) {
      return t.isPositioned() || t.isFloating();
    }, to = function(t) {
      return t.nodeType === Node.TEXT_NODE;
    }, Yt = function(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }, Hi = function(t) {
      return Yt(t) && typeof t.style < "u" && !Qn(t);
    }, Qn = function(t) {
      return typeof t.className == "object";
    }, Ed = function(t) {
      return t.tagName === "LI";
    }, Qd = function(t) {
      return t.tagName === "OL";
    }, Ud = function(t) {
      return t.tagName === "INPUT";
    }, bd = function(t) {
      return t.tagName === "HTML";
    }, ro = function(t) {
      return t.tagName === "svg";
    }, Li = function(t) {
      return t.tagName === "BODY";
    }, no = function(t) {
      return t.tagName === "CANVAS";
    }, io = function(t) {
      return t.tagName === "VIDEO";
    }, Di = function(t) {
      return t.tagName === "IMG";
    }, ao = function(t) {
      return t.tagName === "IFRAME";
    }, so = function(t) {
      return t.tagName === "STYLE";
    }, Id = function(t) {
      return t.tagName === "SCRIPT";
    }, Un = function(t) {
      return t.tagName === "TEXTAREA";
    }, bn = function(t) {
      return t.tagName === "SELECT";
    }, oo = function(t) {
      return t.tagName === "SLOT";
    }, lo = function(t) {
      return t.tagName.indexOf("-") > 0;
    }, _d = (function() {
      function t() {
        this.counters = {};
      }
      return t.prototype.getCounterValue = function(e) {
        var a = this.counters[e];
        return a && a.length ? a[a.length - 1] : 1;
      }, t.prototype.getCounterValues = function(e) {
        var a = this.counters[e];
        return a || [];
      }, t.prototype.pop = function(e) {
        var a = this;
        e.forEach(function(n) {
          return a.counters[n].pop();
        });
      }, t.prototype.parse = function(e) {
        var a = this, n = e.counterIncrement, p = e.counterReset, S = !0;
        n !== null && n.forEach(function(W) {
          var X = a.counters[W.counter];
          X && W.increment !== 0 && (S = !1, X.length || X.push(1), X[Math.max(0, X.length - 1)] += W.increment);
        });
        var K = [];
        return S && p.forEach(function(W) {
          var X = a.counters[W.counter];
          K.push(W.counter), X || (X = a.counters[W.counter] = []), X.push(W.reset);
        }), K;
      }, t;
    })(), uo = {
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
    }, co = {
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
    }, Td = {
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
    }, qt = function(t, e, a, n, p, S) {
      return t < e || t > a ? Dr(t, p, S.length > 0) : n.integers.reduce(function(K, W, X) {
        for (; t >= W; )
          t -= W, K += n.values[X];
        return K;
      }, "") + S;
    }, ho = function(t, e, a, n) {
      var p = "";
      do
        a || t--, p = n(t) + p, t /= e;
      while (t * e >= e);
      return p;
    }, ie = function(t, e, a, n, p) {
      var S = a - e + 1;
      return (t < 0 ? "-" : "") + (ho(Math.abs(t), S, n, function(K) {
        return _(Math.floor(K % S) + e);
      }) + p);
    }, xt = function(t, e, a) {
      a === void 0 && (a = ". ");
      var n = e.length;
      return ho(Math.abs(t), n, !1, function(p) {
        return e[Math.floor(p % n)];
      }) + a;
    }, Zt = 1, pt = 2, gt = 4, Lr = 8, Ze = function(t, e, a, n, p, S) {
      if (t < -9999 || t > 9999) return Dr(t, 4, p.length > 0);
      var K = Math.abs(t), W = p;
      if (K === 0) return e[0] + W;
      for (var X = 0; K > 0 && X <= 4; X++) {
        var nA = K % 10;
        nA === 0 && oe(S, Zt) && W !== "" ? W = e[nA] + W : nA > 1 || nA === 1 && X === 0 || nA === 1 && X === 1 && oe(S, pt) || nA === 1 && X === 1 && oe(S, gt) && t > 100 || nA === 1 && X > 1 && oe(S, Lr) ? W = e[nA] + (X > 0 ? a[X - 1] : "") + W : nA === 1 && X > 0 && (W = a[X - 1] + W), K = Math.floor(K / 10);
      }
      return (t < 0 ? n : "") + W;
    }, fo = "十百千萬", po = "拾佰仟萬", go = "マイナス", Ri = "마이너스", Dr = function(t, e, a) {
      var n = a ? ". " : "", p = a ? "、" : "", S = a ? ", " : "", K = a ? " " : "";
      switch (e) {
        case 0:
          return "•" + K;
        case 1:
          return "◦" + K;
        case 2:
          return "◾" + K;
        case 5:
          var W = ie(t, 48, 57, !0, n);
          return W.length < 4 ? "0" + W : W;
        case 4:
          return xt(t, "〇一二三四五六七八九", p);
        case 6:
          return qt(t, 1, 3999, uo, 3, n).toLowerCase();
        case 7:
          return qt(t, 1, 3999, uo, 3, n);
        case 8:
          return ie(t, 945, 969, !1, n);
        case 9:
          return ie(t, 97, 122, !1, n);
        case 10:
          return ie(t, 65, 90, !1, n);
        case 11:
          return ie(t, 1632, 1641, !0, n);
        case 12:
        case 49:
          return qt(t, 1, 9999, co, 3, n);
        case 35:
          return qt(t, 1, 9999, co, 3, n).toLowerCase();
        case 13:
          return ie(t, 2534, 2543, !0, n);
        case 14:
        case 30:
          return ie(t, 6112, 6121, !0, n);
        case 15:
          return xt(t, "子丑寅卯辰巳午未申酉戌亥", p);
        case 16:
          return xt(t, "甲乙丙丁戊己庚辛壬癸", p);
        case 17:
        case 48:
          return Ze(t, "零一二三四五六七八九", fo, "負", p, pt | gt | Lr);
        case 47:
          return Ze(t, "零壹貳參肆伍陸柒捌玖", po, "負", p, Zt | pt | gt | Lr);
        case 42:
          return Ze(t, "零一二三四五六七八九", fo, "负", p, pt | gt | Lr);
        case 41:
          return Ze(t, "零壹贰叁肆伍陆柒捌玖", po, "负", p, Zt | pt | gt | Lr);
        case 26:
          return Ze(t, "〇一二三四五六七八九", "十百千万", go, p, 0);
        case 25:
          return Ze(t, "零壱弐参四伍六七八九", "拾百千万", go, p, Zt | pt | gt);
        case 31:
          return Ze(t, "영일이삼사오육칠팔구", "십백천만", Ri, S, Zt | pt | gt);
        case 33:
          return Ze(t, "零一二三四五六七八九", "十百千萬", Ri, S, 0);
        case 32:
          return Ze(t, "零壹貳參四五六七八九", "拾百千", Ri, S, Zt | pt | gt);
        case 18:
          return ie(t, 2406, 2415, !0, n);
        case 20:
          return qt(t, 1, 19999, Td, 3, n);
        case 21:
          return ie(t, 2790, 2799, !0, n);
        case 22:
          return ie(t, 2662, 2671, !0, n);
        case 22:
          return qt(t, 1, 10999, xd, 3, n);
        case 23:
          return xt(t, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
        case 24:
          return xt(t, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
        case 27:
          return ie(t, 3302, 3311, !0, n);
        case 28:
          return xt(t, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", p);
        case 29:
          return xt(t, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", p);
        case 34:
          return ie(t, 3792, 3801, !0, n);
        case 37:
          return ie(t, 6160, 6169, !0, n);
        case 38:
          return ie(t, 4160, 4169, !0, n);
        case 39:
          return ie(t, 2918, 2927, !0, n);
        case 40:
          return ie(t, 1776, 1785, !0, n);
        case 43:
          return ie(t, 3046, 3055, !0, n);
        case 44:
          return ie(t, 3174, 3183, !0, n);
        case 45:
          return ie(t, 3664, 3673, !0, n);
        case 46:
          return ie(t, 3872, 3881, !0, n);
        default:
          return ie(t, 48, 57, !0, n);
      }
    }, wo = "data-html2canvas-ignore", Bo = (function() {
      function t(e, a, n) {
        if (this.context = e, this.options = n, this.scrolledElements = [], this.referenceElement = a, this.counters = new _d(), this.quoteDepth = 0, !a.ownerDocument) throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(a.ownerDocument.documentElement, !1);
      }
      return t.prototype.toIFrame = function(e, a) {
        var n = this, p = Sd(e, a);
        if (!p.contentWindow) return Promise.reject("Unable to find iframe window");
        var S = e.defaultView.pageXOffset, K = e.defaultView.pageYOffset, W = p.contentWindow, X = W.document, nA = Dd(p).then(function() {
          return f(n, void 0, void 0, function() {
            var oA, cA;
            return s(this, function(wA) {
              switch (wA.label) {
                case 0:
                  return this.scrolledElements.forEach(kd), W && (W.scrollTo(a.left, a.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (W.scrollY !== a.top || W.scrollX !== a.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(W.scrollX - a.left, W.scrollY - a.top, 0, 0))), oA = this.options.onclone, cA = this.clonedReferenceElement, typeof cA > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : X.fonts && X.fonts.ready ? [4, X.fonts.ready] : [3, 2];
                case 1:
                  wA.sent(), wA.label = 2;
                case 2:
                  return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, Ld(X)] : [3, 4];
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
        return X.open(), X.write(Od(document.doctype) + "<html></html>"), Nd(this.referenceElement.ownerDocument, S, K), X.replaceChild(X.adoptNode(this.documentElement), X.documentElement), X.close(), nA;
      }, t.prototype.createElementClone = function(e) {
        if (mi(e, 2)) debugger;
        if (no(e)) return this.createCanvasClone(e);
        if (io(e)) return this.createVideoClone(e);
        if (so(e)) return this.createStyleClone(e);
        var a = e.cloneNode(!1);
        return Di(a) && (Di(e) && e.currentSrc && e.currentSrc !== e.src && (a.src = e.currentSrc, a.srcset = ""), a.loading === "lazy" && (a.loading = "eager")), lo(a) ? this.createCustomElementClone(a) : a;
      }, t.prototype.createCustomElementClone = function(e) {
        var a = document.createElement("html2canvascustomelement");
        return Oi(e.style, a), a;
      }, t.prototype.createStyleClone = function(e) {
        try {
          var a = e.sheet;
          if (a && a.cssRules) {
            var n = [].slice.call(a.cssRules, 0).reduce(function(S, K) {
              return K && typeof K.cssText == "string" ? S + K.cssText : S;
            }, ""), p = e.cloneNode(!1);
            return p.textContent = n, p;
          }
        } catch (S) {
          if (this.context.logger.error("Unable to access cssRules property", S), S.name !== "SecurityError") throw S;
        }
        return e.cloneNode(!1);
      }, t.prototype.createCanvasClone = function(e) {
        var a;
        if (this.options.inlineImages && e.ownerDocument) {
          var n = e.ownerDocument.createElement("img");
          try {
            return n.src = e.toDataURL(), n;
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
            var W = (a = e.getContext("webgl2")) !== null && a !== void 0 ? a : e.getContext("webgl");
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
        var a = e.ownerDocument.createElement("canvas");
        a.width = e.offsetWidth, a.height = e.offsetHeight;
        var n = a.getContext("2d");
        try {
          return n && (n.drawImage(e, 0, 0, a.width, a.height), this.options.allowTaint || n.getImageData(0, 0, a.width, a.height)), a;
        } catch {
          this.context.logger.info("Unable to clone video as it is tainted", e);
        }
        var p = e.ownerDocument.createElement("canvas");
        return p.width = e.offsetWidth, p.height = e.offsetHeight, p;
      }, t.prototype.appendChildNode = function(e, a, n) {
        (!Yt(a) || !Id(a) && !a.hasAttribute(wo) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(a))) && (!this.options.copyStyles || !Yt(a) || !so(a)) && e.appendChild(this.cloneNode(a, n));
      }, t.prototype.cloneChildNodes = function(e, a, n) {
        for (var p = this, S = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild; S; S = S.nextSibling) if (Yt(S) && oo(S) && typeof S.assignedNodes == "function") {
          var K = S.assignedNodes();
          K.length && K.forEach(function(W) {
            return p.appendChildNode(a, W, n);
          });
        } else this.appendChildNode(a, S, n);
      }, t.prototype.cloneNode = function(e, a) {
        if (to(e)) return document.createTextNode(e.data);
        if (!e.ownerDocument) return e.cloneNode(!1);
        var n = e.ownerDocument.defaultView;
        if (n && Yt(e) && (Hi(e) || Qn(e))) {
          var p = this.createElementClone(e);
          p.style.transitionProperty = "none";
          var S = n.getComputedStyle(e), K = n.getComputedStyle(e, ":before"), W = n.getComputedStyle(e, ":after");
          this.referenceElement === e && Hi(p) && (this.clonedReferenceElement = p), Li(p) && Pd(p);
          var X = this.counters.parse(new Ts(this.context, S)), nA = this.resolvePseudoContent(e, p, K, Rr.BEFORE);
          lo(e) && (a = !0), io(e) || this.cloneChildNodes(e, p, a), nA && p.insertBefore(nA, p.firstChild);
          var oA = this.resolvePseudoContent(e, p, W, Rr.AFTER);
          return oA && p.appendChild(oA), this.counters.pop(X), (S && (this.options.copyStyles || Qn(e)) && !ao(e) || a) && Oi(S, p), (e.scrollTop !== 0 || e.scrollLeft !== 0) && this.scrolledElements.push([
            p,
            e.scrollLeft,
            e.scrollTop
          ]), (Un(e) || bn(e)) && (Un(p) || bn(p)) && (p.value = e.value), p;
        }
        return e.cloneNode(!1);
      }, t.prototype.resolvePseudoContent = function(e, a, n, p) {
        var S = this;
        if (n) {
          var K = n.content, W = a.ownerDocument;
          if (!(!W || !K || K === "none" || K === "-moz-alt-content" || n.display === "none")) {
            this.counters.parse(new Ts(this.context, n));
            var X = new xf(this.context, n), nA = W.createElement("html2canvaspseudoelement");
            Oi(n, nA), X.content.forEach(function(cA) {
              if (cA.type === 0) nA.appendChild(W.createTextNode(cA.value));
              else if (cA.type === 22) {
                var wA = W.createElement("img");
                wA.src = cA.value, wA.style.opacity = "1", nA.appendChild(wA);
              } else if (cA.type === 18) {
                if (cA.name === "attr") {
                  var TA = cA.values.filter(JA);
                  TA.length && nA.appendChild(W.createTextNode(e.getAttribute(TA[0].value) || ""));
                } else if (cA.name === "counter") {
                  var EA = cA.values.filter(zt), IA = EA[0], PA = EA[1];
                  if (IA && JA(IA)) {
                    var OA = S.counters.getCounterValue(IA.value), DA = PA && JA(PA) ? Bi.parse(S.context, PA.value) : 3;
                    nA.appendChild(W.createTextNode(Dr(OA, DA, !1)));
                  }
                } else if (cA.name === "counters") {
                  var $A = cA.values.filter(zt), IA = $A[0], jA = $A[1], PA = $A[2];
                  if (IA && JA(IA)) {
                    var kA = S.counters.getCounterValues(IA.value), HA = PA && JA(PA) ? Bi.parse(S.context, PA.value) : 3, WA = jA && jA.type === 0 ? jA.value : "", XA = kA.map(function(ye) {
                      return Dr(ye, HA, !1);
                    }).join(WA);
                    nA.appendChild(W.createTextNode(XA));
                  }
                }
              } else if (cA.type === 20) switch (cA.value) {
                case "open-quote":
                  nA.appendChild(W.createTextNode(xs(X.quotes, S.quoteDepth++, !0)));
                  break;
                case "close-quote":
                  nA.appendChild(W.createTextNode(xs(X.quotes, --S.quoteDepth, !1)));
                  break;
                default:
                  nA.appendChild(W.createTextNode(cA.value));
              }
            }), nA.className = Ni + " " + ki;
            var oA = p === Rr.BEFORE ? " " + Ni : " " + ki;
            return Qn(a) ? a.className.baseValue += oA : a.className += oA, nA;
          }
        }
      }, t.destroy = function(e) {
        return e.parentNode ? (e.parentNode.removeChild(e), !0) : !1;
      }, t;
    })(), Rr;
    (function(t) {
      t[t.BEFORE = 0] = "BEFORE", t[t.AFTER = 1] = "AFTER";
    })(Rr || (Rr = {}));
    var Sd = function(t, e) {
      var a = t.createElement("iframe");
      return a.className = "html2canvas-container", a.style.visibility = "hidden", a.style.position = "fixed", a.style.left = "-10000px", a.style.top = "0px", a.style.border = "0", a.width = e.width.toString(), a.height = e.height.toString(), a.scrolling = "no", a.setAttribute(wo, "true"), t.body.appendChild(a), a;
    }, Hd = function(t) {
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
    }, Ld = function(t) {
      return Promise.all([].slice.call(t.images, 0).map(Hd));
    }, Dd = function(t) {
      return new Promise(function(e, a) {
        var n = t.contentWindow;
        if (!n) return a("No window assigned for iframe");
        var p = n.document;
        n.onload = t.onload = function() {
          n.onload = t.onload = null;
          var S = setInterval(function() {
            p.body.childNodes.length > 0 && p.readyState === "complete" && (clearInterval(S), e(t));
          }, 50);
        };
      });
    }, Rd = [
      "all",
      "d",
      "content"
    ], Oi = function(t, e) {
      for (var a = t.length - 1; a >= 0; a--) {
        var n = t.item(a);
        Rd.indexOf(n) === -1 && e.style.setProperty(n, t.getPropertyValue(n));
      }
      return e;
    }, Od = function(t) {
      var e = "";
      return t && (e += "<!DOCTYPE ", t.name && (e += t.name), t.internalSubset && (e += t.internalSubset), t.publicId && (e += '"' + t.publicId + '"'), t.systemId && (e += '"' + t.systemId + '"'), e += ">"), e;
    }, Nd = function(t, e, a) {
      t && t.defaultView && (e !== t.defaultView.pageXOffset || a !== t.defaultView.pageYOffset) && t.defaultView.scrollTo(e, a);
    }, kd = function(t) {
      var e = t[0], a = t[1], n = t[2];
      e.scrollLeft = a, e.scrollTop = n;
    }, Kd = ":before", Md = ":after", Ni = "___html2canvas___pseudoelement_before", ki = "___html2canvas___pseudoelement_after", mo = `{
    content: "" !important;
    display: none !important;
}`, Pd = function(t) {
      Gd(t, "." + Ni + Kd + mo + `
         .` + ki + Md + mo);
    }, Gd = function(t, e) {
      var a = t.ownerDocument;
      if (a) {
        var n = a.createElement("style");
        n.textContent = e, t.appendChild(n);
      }
    }, vo = (function() {
      function t() {
      }
      return t.getOrigin = function(e) {
        var a = t._link;
        return a ? (a.href = e, a.href = a.href, a.protocol + a.hostname + a.port) : "about:blank";
      }, t.isSameOrigin = function(e) {
        return t.getOrigin(e) === t._origin;
      }, t.setContext = function(e) {
        t._link = e.document.createElement("a"), t._origin = t.getOrigin(e.location.href);
      }, t._origin = "about:blank", t;
    })(), Vd = (function() {
      function t(e, a) {
        this.context = e, this._options = a, this._cache = {};
      }
      return t.prototype.addImage = function(e) {
        var a = Promise.resolve();
        return this.has(e) || (Mi(e) || zd(e)) && (this._cache[e] = this.loadImage(e)).catch(function() {
        }), a;
      }, t.prototype.match = function(e) {
        return this._cache[e];
      }, t.prototype.loadImage = function(e) {
        return f(this, void 0, void 0, function() {
          var a, n, p, S, K = this;
          return s(this, function(W) {
            switch (W.label) {
              case 0:
                return a = vo.isSameOrigin(e), n = !Ki(e) && this._options.useCORS === !0 && ce.SUPPORT_CORS_IMAGES && !a, p = !Ki(e) && !a && !Mi(e) && typeof this._options.proxy == "string" && ce.SUPPORT_CORS_XHR && !n, !a && this._options.allowTaint === !1 && !Ki(e) && !Mi(e) && !p && !n ? [2] : (S = e, p ? [4, this.proxy(S)] : [3, 2]);
              case 1:
                S = W.sent(), W.label = 2;
              case 2:
                return this.context.logger.debug("Added image " + e.substring(0, 256)), [4, new Promise(function(X, nA) {
                  var oA = new Image();
                  oA.onload = function() {
                    return X(oA);
                  }, oA.onerror = nA, (Jd(S) || n) && (oA.crossOrigin = "anonymous"), oA.src = S, oA.complete === !0 && setTimeout(function() {
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
        var a = this, n = this._options.proxy;
        if (!n) throw new Error("No proxy defined");
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
          var nA = n.indexOf("?") > -1 ? "&" : "?";
          if (X.open("GET", "" + n + nA + "url=" + encodeURIComponent(e) + "&responseType=" + W), W !== "text" && X instanceof XMLHttpRequest && (X.responseType = W), a._options.imageTimeout) {
            var oA = a._options.imageTimeout;
            X.timeout = oA, X.ontimeout = function() {
              return K("Timed out (" + oA + "ms) proxying " + p);
            };
          }
          X.send();
        });
      }, t;
    })(), Wd = /^data:image\/svg\+xml/i, Xd = /^data:image\/.*;base64,/i, jd = /^data:image\/.*/i, zd = function(t) {
      return ce.SUPPORT_SVG_DRAWING || !Yd(t);
    }, Ki = function(t) {
      return jd.test(t);
    }, Jd = function(t) {
      return Xd.test(t);
    }, Mi = function(t) {
      return t.substr(0, 4) === "blob";
    }, Yd = function(t) {
      return t.substr(-3).toLowerCase() === "svg" || Wd.test(t);
    }, SA = (function() {
      function t(e, a) {
        this.type = 0, this.x = e, this.y = a;
      }
      return t.prototype.add = function(e, a) {
        return new t(this.x + e, this.y + a);
      }, t;
    })(), $t = function(t, e, a) {
      return new SA(t.x + (e.x - t.x) * a, t.y + (e.y - t.y) * a);
    }, In = (function() {
      function t(e, a, n, p) {
        this.type = 1, this.start = e, this.startControl = a, this.endControl = n, this.end = p;
      }
      return t.prototype.subdivide = function(e, a) {
        var n = $t(this.start, this.startControl, e), p = $t(this.startControl, this.endControl, e), S = $t(this.endControl, this.end, e), K = $t(n, p, e), W = $t(p, S, e), X = $t(K, W, e);
        return a ? new t(this.start, n, K, X) : new t(X, W, S, this.end);
      }, t.prototype.add = function(e, a) {
        return new t(this.start.add(e, a), this.startControl.add(e, a), this.endControl.add(e, a), this.end.add(e, a));
      }, t.prototype.reverse = function() {
        return new t(this.end, this.endControl, this.startControl, this.start);
      }, t;
    })(), Se = function(t) {
      return t.type === 1;
    }, qd = /* @__PURE__ */ (function() {
      function t(e) {
        var a = e.styles, n = e.bounds, p = _r(a.borderTopLeftRadius, n.width, n.height), S = p[0], K = p[1], W = _r(a.borderTopRightRadius, n.width, n.height), X = W[0], nA = W[1], oA = _r(a.borderBottomRightRadius, n.width, n.height), cA = oA[0], wA = oA[1], TA = _r(a.borderBottomLeftRadius, n.width, n.height), EA = TA[0], IA = TA[1], PA = [];
        PA.push((S + X) / n.width), PA.push((EA + cA) / n.width), PA.push((K + IA) / n.height), PA.push((nA + wA) / n.height);
        var OA = Math.max.apply(Math, PA);
        OA > 1 && (S /= OA, K /= OA, X /= OA, nA /= OA, cA /= OA, wA /= OA, EA /= OA, IA /= OA);
        var DA = n.width - X, $A = n.height - wA, jA = n.width - cA, kA = n.height - IA, HA = a.borderTopWidth, WA = a.borderRightWidth, XA = a.borderBottomWidth, KA = a.borderLeftWidth, se = ZA(a.paddingTop, e.bounds.width), ye = ZA(a.paddingRight, e.bounds.width), Ie = ZA(a.paddingBottom, e.bounds.width), YA = ZA(a.paddingLeft, e.bounds.width);
        this.topLeftBorderDoubleOuterBox = S > 0 || K > 0 ? ee(n.left + KA / 3, n.top + HA / 3, S - KA / 3, K - HA / 3, zA.TOP_LEFT) : new SA(n.left + KA / 3, n.top + HA / 3), this.topRightBorderDoubleOuterBox = S > 0 || K > 0 ? ee(n.left + DA, n.top + HA / 3, X - WA / 3, nA - HA / 3, zA.TOP_RIGHT) : new SA(n.left + n.width - WA / 3, n.top + HA / 3), this.bottomRightBorderDoubleOuterBox = cA > 0 || wA > 0 ? ee(n.left + jA, n.top + $A, cA - WA / 3, wA - XA / 3, zA.BOTTOM_RIGHT) : new SA(n.left + n.width - WA / 3, n.top + n.height - XA / 3), this.bottomLeftBorderDoubleOuterBox = EA > 0 || IA > 0 ? ee(n.left + KA / 3, n.top + kA, EA - KA / 3, IA - XA / 3, zA.BOTTOM_LEFT) : new SA(n.left + KA / 3, n.top + n.height - XA / 3), this.topLeftBorderDoubleInnerBox = S > 0 || K > 0 ? ee(n.left + KA * 2 / 3, n.top + HA * 2 / 3, S - KA * 2 / 3, K - HA * 2 / 3, zA.TOP_LEFT) : new SA(n.left + KA * 2 / 3, n.top + HA * 2 / 3), this.topRightBorderDoubleInnerBox = S > 0 || K > 0 ? ee(n.left + DA, n.top + HA * 2 / 3, X - WA * 2 / 3, nA - HA * 2 / 3, zA.TOP_RIGHT) : new SA(n.left + n.width - WA * 2 / 3, n.top + HA * 2 / 3), this.bottomRightBorderDoubleInnerBox = cA > 0 || wA > 0 ? ee(n.left + jA, n.top + $A, cA - WA * 2 / 3, wA - XA * 2 / 3, zA.BOTTOM_RIGHT) : new SA(n.left + n.width - WA * 2 / 3, n.top + n.height - XA * 2 / 3), this.bottomLeftBorderDoubleInnerBox = EA > 0 || IA > 0 ? ee(n.left + KA * 2 / 3, n.top + kA, EA - KA * 2 / 3, IA - XA * 2 / 3, zA.BOTTOM_LEFT) : new SA(n.left + KA * 2 / 3, n.top + n.height - XA * 2 / 3), this.topLeftBorderStroke = S > 0 || K > 0 ? ee(n.left + KA / 2, n.top + HA / 2, S - KA / 2, K - HA / 2, zA.TOP_LEFT) : new SA(n.left + KA / 2, n.top + HA / 2), this.topRightBorderStroke = S > 0 || K > 0 ? ee(n.left + DA, n.top + HA / 2, X - WA / 2, nA - HA / 2, zA.TOP_RIGHT) : new SA(n.left + n.width - WA / 2, n.top + HA / 2), this.bottomRightBorderStroke = cA > 0 || wA > 0 ? ee(n.left + jA, n.top + $A, cA - WA / 2, wA - XA / 2, zA.BOTTOM_RIGHT) : new SA(n.left + n.width - WA / 2, n.top + n.height - XA / 2), this.bottomLeftBorderStroke = EA > 0 || IA > 0 ? ee(n.left + KA / 2, n.top + kA, EA - KA / 2, IA - XA / 2, zA.BOTTOM_LEFT) : new SA(n.left + KA / 2, n.top + n.height - XA / 2), this.topLeftBorderBox = S > 0 || K > 0 ? ee(n.left, n.top, S, K, zA.TOP_LEFT) : new SA(n.left, n.top), this.topRightBorderBox = X > 0 || nA > 0 ? ee(n.left + DA, n.top, X, nA, zA.TOP_RIGHT) : new SA(n.left + n.width, n.top), this.bottomRightBorderBox = cA > 0 || wA > 0 ? ee(n.left + jA, n.top + $A, cA, wA, zA.BOTTOM_RIGHT) : new SA(n.left + n.width, n.top + n.height), this.bottomLeftBorderBox = EA > 0 || IA > 0 ? ee(n.left, n.top + kA, EA, IA, zA.BOTTOM_LEFT) : new SA(n.left, n.top + n.height), this.topLeftPaddingBox = S > 0 || K > 0 ? ee(n.left + KA, n.top + HA, Math.max(0, S - KA), Math.max(0, K - HA), zA.TOP_LEFT) : new SA(n.left + KA, n.top + HA), this.topRightPaddingBox = X > 0 || nA > 0 ? ee(n.left + Math.min(DA, n.width - WA), n.top + HA, DA > n.width + WA ? 0 : Math.max(0, X - WA), Math.max(0, nA - HA), zA.TOP_RIGHT) : new SA(n.left + n.width - WA, n.top + HA), this.bottomRightPaddingBox = cA > 0 || wA > 0 ? ee(n.left + Math.min(jA, n.width - KA), n.top + Math.min($A, n.height - XA), Math.max(0, cA - WA), Math.max(0, wA - XA), zA.BOTTOM_RIGHT) : new SA(n.left + n.width - WA, n.top + n.height - XA), this.bottomLeftPaddingBox = EA > 0 || IA > 0 ? ee(n.left + KA, n.top + Math.min(kA, n.height - XA), Math.max(0, EA - KA), Math.max(0, IA - XA), zA.BOTTOM_LEFT) : new SA(n.left + KA, n.top + n.height - XA), this.topLeftContentBox = S > 0 || K > 0 ? ee(n.left + KA + YA, n.top + HA + se, Math.max(0, S - (KA + YA)), Math.max(0, K - (HA + se)), zA.TOP_LEFT) : new SA(n.left + KA + YA, n.top + HA + se), this.topRightContentBox = X > 0 || nA > 0 ? ee(n.left + Math.min(DA, n.width + KA + YA), n.top + HA + se, DA > n.width + KA + YA ? 0 : X - KA + YA, nA - (HA + se), zA.TOP_RIGHT) : new SA(n.left + n.width - (WA + ye), n.top + HA + se), this.bottomRightContentBox = cA > 0 || wA > 0 ? ee(n.left + Math.min(jA, n.width - (KA + YA)), n.top + Math.min($A, n.height + HA + se), Math.max(0, cA - (WA + ye)), wA - (XA + Ie), zA.BOTTOM_RIGHT) : new SA(n.left + n.width - (WA + ye), n.top + n.height - (XA + Ie)), this.bottomLeftContentBox = EA > 0 || IA > 0 ? ee(n.left + KA + YA, n.top + kA, Math.max(0, EA - (KA + YA)), IA - (XA + Ie), zA.BOTTOM_LEFT) : new SA(n.left + KA + YA, n.top + n.height - (XA + Ie));
      }
      return t;
    })(), zA;
    (function(t) {
      t[t.TOP_LEFT = 0] = "TOP_LEFT", t[t.TOP_RIGHT = 1] = "TOP_RIGHT", t[t.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", t[t.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
    })(zA || (zA = {}));
    var ee = function(t, e, a, n, p) {
      var S = 4 * ((Math.sqrt(2) - 1) / 3), K = a * S, W = n * S, X = t + a, nA = e + n;
      switch (p) {
        case zA.TOP_LEFT:
          return new In(new SA(t, nA), new SA(t, nA - W), new SA(X - K, e), new SA(X, e));
        case zA.TOP_RIGHT:
          return new In(new SA(t, e), new SA(t + K, e), new SA(X, nA - W), new SA(X, nA));
        case zA.BOTTOM_RIGHT:
          return new In(new SA(X, e), new SA(X, e + W), new SA(t + K, nA), new SA(t, nA));
        case zA.BOTTOM_LEFT:
        default:
          return new In(new SA(X, nA), new SA(X - K, nA), new SA(t, e + W), new SA(t, e));
      }
    }, _n = function(t) {
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
    }, xn = function(t) {
      return [
        t.topLeftPaddingBox,
        t.topRightPaddingBox,
        t.bottomRightPaddingBox,
        t.bottomLeftPaddingBox
      ];
    }, $d = /* @__PURE__ */ (function() {
      function t(e, a, n) {
        this.offsetX = e, this.offsetY = a, this.matrix = n, this.type = 0, this.target = 6;
      }
      return t;
    })(), Tn = /* @__PURE__ */ (function() {
      function t(e, a) {
        this.path = e, this.target = a, this.type = 1;
      }
      return t;
    })(), Ap = /* @__PURE__ */ (function() {
      function t(e) {
        this.opacity = e, this.type = 2, this.target = 6;
      }
      return t;
    })(), ep = function(t) {
      return t.type === 0;
    }, yo = function(t) {
      return t.type === 1;
    }, tp = function(t) {
      return t.type === 2;
    }, Co = function(t, e) {
      return t.length === e.length ? t.some(function(a, n) {
        return a === e[n];
      }) : !1;
    }, rp = function(t, e, a, n, p) {
      return t.map(function(S, K) {
        switch (K) {
          case 0:
            return S.add(e, a);
          case 1:
            return S.add(e + n, a);
          case 2:
            return S.add(e + n, a + p);
          case 3:
            return S.add(e, a + p);
        }
        return S;
      });
    }, Fo = /* @__PURE__ */ (function() {
      function t(e) {
        this.element = e, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
      }
      return t;
    })(), Eo = (function() {
      function t(e, a) {
        if (this.container = e, this.parent = a, this.effects = [], this.curves = new qd(this.container), this.container.styles.opacity < 1 && this.effects.push(new Ap(this.container.styles.opacity)), this.container.styles.transform !== null) {
          var n = this.container.bounds.left + this.container.styles.transformOrigin[0].number, p = this.container.bounds.top + this.container.styles.transformOrigin[1].number, S = this.container.styles.transform;
          this.effects.push(new $d(n, p, S));
        }
        if (this.container.styles.overflowX !== 0) {
          var K = _n(this.curves), W = xn(this.curves);
          Co(K, W) ? this.effects.push(new Tn(K, 6)) : (this.effects.push(new Tn(K, 2)), this.effects.push(new Tn(W, 4)));
        }
      }
      return t.prototype.getEffects = function(e) {
        for (var a = [2, 3].indexOf(this.container.styles.position) === -1, n = this.parent, p = this.effects.slice(0); n; ) {
          var S = n.effects.filter(function(X) {
            return !yo(X);
          });
          if (a || n.container.styles.position !== 0 || !n.parent) {
            if (p.unshift.apply(p, S), a = [2, 3].indexOf(n.container.styles.position) === -1, n.container.styles.overflowX !== 0) {
              var K = _n(n.curves), W = xn(n.curves);
              Co(K, W) || p.unshift(new Tn(W, 6));
            }
          } else p.unshift.apply(p, S);
          n = n.parent;
        }
        return p.filter(function(X) {
          return oe(X.target, e);
        });
      }, t;
    })(), Pi = function(t, e, a, n) {
      t.container.elements.forEach(function(p) {
        var S = oe(p.flags, 4), K = oe(p.flags, 2), W = new Eo(p, t);
        oe(p.styles.display, 2048) && n.push(W);
        var X = oe(p.flags, 8) ? [] : n;
        if (S || K) {
          var nA = S || p.styles.isPositioned() ? a : e, oA = new Fo(W);
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
          Pi(W, oA, S ? oA : a, X);
        } else
          p.styles.isInlineLevel() ? e.inlineLevel.push(W) : e.nonInlineLevel.push(W), Pi(W, e, a, X);
        oe(p.flags, 8) && Qo(p, X);
      });
    }, Qo = function(t, e) {
      for (var a = t instanceof Ti ? t.start : 1, n = t instanceof Ti ? t.reversed : !1, p = 0; p < e.length; p++) {
        var S = e[p];
        S.container instanceof Js && typeof S.container.value == "number" && S.container.value !== 0 && (a = S.container.value), S.listValue = Dr(a, S.container.styles.listStyleType, !0), a += n ? -1 : 1;
      }
    }, np = function(t) {
      var e = new Eo(t, null), a = new Fo(e), n = [];
      return Pi(e, a, a, n), Qo(e.container, n), a;
    }, Uo = function(t, e) {
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
    }, ip = function(t, e) {
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
    }, ap = function(t, e) {
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
          return Sn(t.topLeftBorderStroke, t.topRightBorderStroke);
        case 1:
          return Sn(t.topRightBorderStroke, t.bottomRightBorderStroke);
        case 2:
          return Sn(t.bottomRightBorderStroke, t.bottomLeftBorderStroke);
        default:
          return Sn(t.bottomLeftBorderStroke, t.topLeftBorderStroke);
      }
    }, Sn = function(t, e) {
      var a = [];
      return Se(t) ? a.push(t.subdivide(0.5, !1)) : a.push(t), Se(e) ? a.push(e.subdivide(0.5, !0)) : a.push(e), a;
    }, He = function(t, e, a, n) {
      var p = [];
      return Se(t) ? p.push(t.subdivide(0.5, !1)) : p.push(t), Se(a) ? p.push(a.subdivide(0.5, !0)) : p.push(a), Se(n) ? p.push(n.subdivide(0.5, !0).reverse()) : p.push(n), Se(e) ? p.push(e.subdivide(0.5, !1).reverse()) : p.push(e), p;
    }, bo = function(t) {
      var e = t.bounds, a = t.styles;
      return e.add(a.borderLeftWidth, a.borderTopWidth, -(a.borderRightWidth + a.borderLeftWidth), -(a.borderTopWidth + a.borderBottomWidth));
    }, Hn = function(t) {
      var e = t.styles, a = t.bounds, n = ZA(e.paddingLeft, a.width), p = ZA(e.paddingRight, a.width), S = ZA(e.paddingTop, a.width), K = ZA(e.paddingBottom, a.width);
      return a.add(n + e.borderLeftWidth, S + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + n + p), -(e.borderTopWidth + e.borderBottomWidth + S + K));
    }, op = function(t, e) {
      return t === 0 ? e.bounds : t === 2 ? Hn(e) : bo(e);
    }, lp = function(t, e) {
      return t === 0 ? e.bounds : t === 2 ? Hn(e) : bo(e);
    }, Gi = function(t, e, a) {
      var n = op(er(t.styles.backgroundOrigin, e), t), p = lp(er(t.styles.backgroundClip, e), t), S = up(er(t.styles.backgroundSize, e), a, n), K = S[0], W = S[1], X = _r(er(t.styles.backgroundPosition, e), n.width - K, n.height - W);
      return [
        cp(er(t.styles.backgroundRepeat, e), X, S, n, p),
        Math.round(n.left + X[0]),
        Math.round(n.top + X[1]),
        K,
        W
      ];
    }, Ar = function(t) {
      return JA(t) && t.value === Jt.AUTO;
    }, Ln = function(t) {
      return typeof t == "number";
    }, up = function(t, e, a) {
      var n = e[0], p = e[1], S = e[2], K = t[0], W = t[1];
      if (!K) return [0, 0];
      if (ae(K) && W && ae(W)) return [ZA(K, a.width), ZA(W, a.height)];
      var X = Ln(S);
      if (JA(K) && (K.value === Jt.CONTAIN || K.value === Jt.COVER))
        return Ln(S) ? a.width / a.height < S != (K.value === Jt.COVER) ? [a.width, a.width / S] : [a.height * S, a.height] : [a.width, a.height];
      var nA = Ln(n), oA = Ln(p), cA = nA || oA;
      if (Ar(K) && (!W || Ar(W)))
        return nA && oA ? [n, p] : !X && !cA ? [a.width, a.height] : cA && X ? [nA ? n : p * S, oA ? p : n / S] : [nA ? n : a.width, oA ? p : a.height];
      if (X) {
        var wA = 0, TA = 0;
        return ae(K) ? wA = ZA(K, a.width) : ae(W) && (TA = ZA(W, a.height)), Ar(K) ? wA = TA * S : (!W || Ar(W)) && (TA = wA / S), [wA, TA];
      }
      var EA = null, IA = null;
      if (ae(K) ? EA = ZA(K, a.width) : W && ae(W) && (IA = ZA(W, a.height)), EA !== null && (!W || Ar(W)) && (IA = nA && oA ? EA / n * p : a.height), IA !== null && Ar(K) && (EA = nA && oA ? IA / p * n : a.width), EA !== null && IA !== null) return [EA, IA];
      throw new Error("Unable to calculate background-size for element");
    }, er = function(t, e) {
      var a = t[e];
      return typeof a > "u" ? t[0] : a;
    }, cp = function(t, e, a, n, p) {
      var S = e[0], K = e[1], W = a[0], X = a[1];
      switch (t) {
        case 2:
          return [
            new SA(Math.round(n.left), Math.round(n.top + K)),
            new SA(Math.round(n.left + n.width), Math.round(n.top + K)),
            new SA(Math.round(n.left + n.width), Math.round(X + n.top + K)),
            new SA(Math.round(n.left), Math.round(X + n.top + K))
          ];
        case 3:
          return [
            new SA(Math.round(n.left + S), Math.round(n.top)),
            new SA(Math.round(n.left + S + W), Math.round(n.top)),
            new SA(Math.round(n.left + S + W), Math.round(n.height + n.top)),
            new SA(Math.round(n.left + S), Math.round(n.height + n.top))
          ];
        case 1:
          return [
            new SA(Math.round(n.left + S), Math.round(n.top + K)),
            new SA(Math.round(n.left + S + W), Math.round(n.top + K)),
            new SA(Math.round(n.left + S + W), Math.round(n.top + K + X)),
            new SA(Math.round(n.left + S), Math.round(n.top + K + X))
          ];
        default:
          return [
            new SA(Math.round(p.left), Math.round(p.top)),
            new SA(Math.round(p.left + p.width), Math.round(p.top)),
            new SA(Math.round(p.left + p.width), Math.round(p.height + p.top)),
            new SA(Math.round(p.left), Math.round(p.height + p.top))
          ];
      }
    }, hp = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", Io = "Hidden Text", fp = (function() {
      function t(e) {
        this._data = {}, this._document = e;
      }
      return t.prototype.parseMetrics = function(e, a) {
        var n = this._document.createElement("div"), p = this._document.createElement("img"), S = this._document.createElement("span"), K = this._document.body;
        n.style.visibility = "hidden", n.style.fontFamily = e, n.style.fontSize = a, n.style.margin = "0", n.style.padding = "0", n.style.whiteSpace = "nowrap", K.appendChild(n), p.src = hp, p.width = 1, p.height = 1, p.style.margin = "0", p.style.padding = "0", p.style.verticalAlign = "baseline", S.style.fontFamily = e, S.style.fontSize = a, S.style.margin = "0", S.style.padding = "0", S.appendChild(this._document.createTextNode(Io)), n.appendChild(S), n.appendChild(p);
        var W = p.offsetTop - S.offsetTop + 2;
        n.removeChild(S), n.appendChild(this._document.createTextNode(Io)), n.style.lineHeight = "normal", p.style.verticalAlign = "super";
        var X = p.offsetTop - n.offsetTop + 2;
        return K.removeChild(n), {
          baseline: W,
          middle: X
        };
      }, t.prototype.getMetrics = function(e, a) {
        var n = e + " " + a;
        return typeof this._data[n] > "u" && (this._data[n] = this.parseMetrics(e, a)), this._data[n];
      }, t;
    })(), _o = /* @__PURE__ */ (function() {
      function t(e, a) {
        this.context = e, this.options = a;
      }
      return t;
    })(), dp = 1e4, pp = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p._activeEffects = [], p.canvas = n.canvas ? n.canvas : document.createElement("canvas"), p.ctx = p.canvas.getContext("2d"), n.canvas || (p.canvas.width = Math.floor(n.width * n.scale), p.canvas.height = Math.floor(n.height * n.scale), p.canvas.style.width = n.width + "px", p.canvas.style.height = n.height + "px"), p.fontMetrics = new fp(document), p.ctx.scale(p.options.scale, p.options.scale), p.ctx.translate(-n.x, -n.y), p.ctx.textBaseline = "bottom", p._activeEffects = [], p.context.logger.debug("Canvas renderer initialized (" + n.width + "x" + n.height + ") with scale " + n.scale), p;
      }
      return e.prototype.applyEffects = function(a) {
        for (var n = this; this._activeEffects.length; ) this.popEffect();
        a.forEach(function(p) {
          return n.applyEffect(p);
        });
      }, e.prototype.applyEffect = function(a) {
        this.ctx.save(), tp(a) && (this.ctx.globalAlpha = a.opacity), ep(a) && (this.ctx.translate(a.offsetX, a.offsetY), this.ctx.transform(a.matrix[0], a.matrix[1], a.matrix[2], a.matrix[3], a.matrix[4], a.matrix[5]), this.ctx.translate(-a.offsetX, -a.offsetY)), yo(a) && (this.path(a.path), this.ctx.clip()), this._activeEffects.push(a);
      }, e.prototype.popEffect = function() {
        this._activeEffects.pop(), this.ctx.restore();
      }, e.prototype.renderStack = function(a) {
        return f(this, void 0, void 0, function() {
          var n;
          return s(this, function(p) {
            switch (p.label) {
              case 0:
                return n = a.element.container.styles, n.isVisible() ? [4, this.renderStackContent(a)] : [3, 2];
              case 1:
                p.sent(), p.label = 2;
              case 2:
                return [2];
            }
          });
        });
      }, e.prototype.renderNode = function(a) {
        return f(this, void 0, void 0, function() {
          return s(this, function(n) {
            switch (n.label) {
              case 0:
                if (oe(a.container.flags, 16)) debugger;
                return a.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(a)] : [3, 3];
              case 1:
                return n.sent(), [4, this.renderNodeContent(a)];
              case 2:
                n.sent(), n.label = 3;
              case 3:
                return [2];
            }
          });
        });
      }, e.prototype.renderTextWithLetterSpacing = function(a, n, p) {
        var S = this;
        n === 0 ? this.ctx.fillText(a.text, a.bounds.left, a.bounds.top + p) : xi(a.text).reduce(function(K, W) {
          return S.ctx.fillText(W, K, a.bounds.top + p), K + S.ctx.measureText(W).width;
        }, a.bounds.left);
      }, e.prototype.createFontStyle = function(a) {
        var n = a.fontVariant.filter(function(K) {
          return K === "normal" || K === "small-caps";
        }).join(""), p = vp(a.fontFamily).join(", "), S = Ir(a.fontSize) ? "" + a.fontSize.number + a.fontSize.unit : a.fontSize.number + "px";
        return [
          [
            a.fontStyle,
            n,
            a.fontWeight,
            S,
            p
          ].join(" "),
          p,
          S
        ];
      }, e.prototype.renderTextNode = function(a, n) {
        return f(this, void 0, void 0, function() {
          var p, S, K, W, X, nA, oA, cA, wA = this;
          return s(this, function(TA) {
            return p = this.createFontStyle(n), S = p[0], K = p[1], W = p[2], this.ctx.font = S, this.ctx.direction = n.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", X = this.fontMetrics.getMetrics(K, W), nA = X.baseline, oA = X.middle, cA = n.paintOrder, a.textBounds.forEach(function(EA) {
              cA.forEach(function(IA) {
                switch (IA) {
                  case 0:
                    wA.ctx.fillStyle = le(n.color), wA.renderTextWithLetterSpacing(EA, n.letterSpacing, nA);
                    var PA = n.textShadow;
                    PA.length && EA.text.trim().length && (PA.slice(0).reverse().forEach(function(OA) {
                      wA.ctx.shadowColor = le(OA.color), wA.ctx.shadowOffsetX = OA.offsetX.number * wA.options.scale, wA.ctx.shadowOffsetY = OA.offsetY.number * wA.options.scale, wA.ctx.shadowBlur = OA.blur.number, wA.renderTextWithLetterSpacing(EA, n.letterSpacing, nA);
                    }), wA.ctx.shadowColor = "", wA.ctx.shadowOffsetX = 0, wA.ctx.shadowOffsetY = 0, wA.ctx.shadowBlur = 0), n.textDecorationLine.length && (wA.ctx.fillStyle = le(n.textDecorationColor || n.color), n.textDecorationLine.forEach(function(OA) {
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
                    n.webkitTextStrokeWidth && EA.text.trim().length && (wA.ctx.strokeStyle = le(n.webkitTextStrokeColor), wA.ctx.lineWidth = n.webkitTextStrokeWidth, wA.ctx.lineJoin = window.chrome ? "miter" : "round", wA.ctx.strokeText(EA.text, EA.bounds.left, EA.bounds.top + nA)), wA.ctx.strokeStyle = "", wA.ctx.lineWidth = 0, wA.ctx.lineJoin = "miter";
                    break;
                }
              });
            }), [2];
          });
        });
      }, e.prototype.renderReplacedElement = function(a, n, p) {
        if (p && a.intrinsicWidth > 0 && a.intrinsicHeight > 0) {
          var S = Hn(a), K = xn(n);
          this.path(K), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(p, 0, 0, a.intrinsicWidth, a.intrinsicHeight, S.left, S.top, S.width, S.height), this.ctx.restore();
        }
      }, e.prototype.renderNodeContent = function(a) {
        return f(this, void 0, void 0, function() {
          var n, p, S, K, W, X, DA, DA, nA, oA, cA, wA, jA, TA, EA, kA, IA, PA, OA, DA, $A, jA, kA;
          return s(this, function(HA) {
            switch (HA.label) {
              case 0:
                this.applyEffects(a.getEffects(4)), n = a.container, p = a.curves, S = n.styles, K = 0, W = n.textNodes, HA.label = 1;
              case 1:
                return K < W.length ? (X = W[K], [4, this.renderTextNode(X, S)]) : [3, 4];
              case 2:
                HA.sent(), HA.label = 3;
              case 3:
                return K++, [3, 1];
              case 4:
                if (!(n instanceof Xs)) return [3, 8];
                HA.label = 5;
              case 5:
                return HA.trys.push([
                  5,
                  7,
                  ,
                  8
                ]), [4, this.context.cache.match(n.src)];
              case 6:
                return DA = HA.sent(), this.renderReplacedElement(n, p, DA), [3, 8];
              case 7:
                return HA.sent(), this.context.logger.error("Error loading image " + n.src), [3, 8];
              case 8:
                if (n instanceof js && this.renderReplacedElement(n, p, n.canvas), !(n instanceof zs)) return [3, 12];
                HA.label = 9;
              case 9:
                return HA.trys.push([
                  9,
                  11,
                  ,
                  12
                ]), [4, this.context.cache.match(n.svg)];
              case 10:
                return DA = HA.sent(), this.renderReplacedElement(n, p, DA), [3, 12];
              case 11:
                return HA.sent(), this.context.logger.error("Error loading svg " + n.svg.substring(0, 255)), [3, 12];
              case 12:
                return n instanceof $s && n.tree ? (nA = new e(this.context, {
                  scale: this.options.scale,
                  backgroundColor: n.backgroundColor,
                  x: 0,
                  y: 0,
                  width: n.width,
                  height: n.height
                }), [4, nA.render(n.tree)]) : [3, 14];
              case 13:
                oA = HA.sent(), n.width && n.height && this.ctx.drawImage(oA, 0, 0, n.width, n.height, n.bounds.left, n.bounds.top, n.bounds.width, n.bounds.height), HA.label = 14;
              case 14:
                if (n instanceof Si && (cA = Math.min(n.bounds.width, n.bounds.height), n.type === Cn ? n.checked && (this.ctx.save(), this.path([
                  new SA(n.bounds.left + cA * 0.39363, n.bounds.top + cA * 0.79),
                  new SA(n.bounds.left + cA * 0.16, n.bounds.top + cA * 0.5549),
                  new SA(n.bounds.left + cA * 0.27347, n.bounds.top + cA * 0.44071),
                  new SA(n.bounds.left + cA * 0.39694, n.bounds.top + cA * 0.5649),
                  new SA(n.bounds.left + cA * 0.72983, n.bounds.top + cA * 0.23),
                  new SA(n.bounds.left + cA * 0.84, n.bounds.top + cA * 0.34085),
                  new SA(n.bounds.left + cA * 0.39363, n.bounds.top + cA * 0.79)
                ]), this.ctx.fillStyle = le(Ys), this.ctx.fill(), this.ctx.restore()) : n.type === Fn && n.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(n.bounds.left + cA / 2, n.bounds.top + cA / 2, cA / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = le(Ys), this.ctx.fill(), this.ctx.restore())), gp(n) && n.value.length) {
                  switch (wA = this.createFontStyle(S), jA = wA[0], TA = wA[1], EA = this.fontMetrics.getMetrics(jA, TA).baseline, this.ctx.font = jA, this.ctx.fillStyle = le(S.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = Bp(n.styles.textAlign), kA = Hn(n), IA = 0, n.styles.textAlign) {
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
                  ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new Hr(n.value, PA), S.letterSpacing, EA), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
                }
                if (!oe(n.styles.display, 2048)) return [3, 20];
                if (n.styles.listStyleImage === null) return [3, 19];
                if (OA = n.styles.listStyleImage, OA.type !== 0) return [3, 18];
                DA = void 0, $A = OA.url, HA.label = 15;
              case 15:
                return HA.trys.push([
                  15,
                  17,
                  ,
                  18
                ]), [4, this.context.cache.match($A)];
              case 16:
                return DA = HA.sent(), this.ctx.drawImage(DA, n.bounds.left - (DA.width + 10), n.bounds.top), [3, 18];
              case 17:
                return HA.sent(), this.context.logger.error("Error loading list-style-image " + $A), [3, 18];
              case 18:
                return [3, 20];
              case 19:
                a.listValue && n.styles.listStyleType !== -1 && (jA = this.createFontStyle(S)[0], this.ctx.font = jA, this.ctx.fillStyle = le(S.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", kA = new d(n.bounds.left, n.bounds.top + ZA(n.styles.paddingTop, n.bounds.width), n.bounds.width, bs(S.lineHeight, S.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new Hr(a.listValue, kA), S.letterSpacing, bs(S.lineHeight, S.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), HA.label = 20;
              case 20:
                return [2];
            }
          });
        });
      }, e.prototype.renderStackContent = function(a) {
        return f(this, void 0, void 0, function() {
          var n, p, OA, S, K, OA, W, X, OA, nA, oA, OA, cA, wA, OA, TA, EA, OA, IA, PA, OA;
          return s(this, function(DA) {
            switch (DA.label) {
              case 0:
                if (oe(a.element.container.flags, 16)) debugger;
                return [4, this.renderNodeBackgroundAndBorders(a.element)];
              case 1:
                DA.sent(), n = 0, p = a.negativeZIndex, DA.label = 2;
              case 2:
                return n < p.length ? (OA = p[n], [4, this.renderStack(OA)]) : [3, 5];
              case 3:
                DA.sent(), DA.label = 4;
              case 4:
                return n++, [3, 2];
              case 5:
                return [4, this.renderNodeContent(a.element)];
              case 6:
                DA.sent(), S = 0, K = a.nonInlineLevel, DA.label = 7;
              case 7:
                return S < K.length ? (OA = K[S], [4, this.renderNode(OA)]) : [3, 10];
              case 8:
                DA.sent(), DA.label = 9;
              case 9:
                return S++, [3, 7];
              case 10:
                W = 0, X = a.nonPositionedFloats, DA.label = 11;
              case 11:
                return W < X.length ? (OA = X[W], [4, this.renderStack(OA)]) : [3, 14];
              case 12:
                DA.sent(), DA.label = 13;
              case 13:
                return W++, [3, 11];
              case 14:
                nA = 0, oA = a.nonPositionedInlineLevel, DA.label = 15;
              case 15:
                return nA < oA.length ? (OA = oA[nA], [4, this.renderStack(OA)]) : [3, 18];
              case 16:
                DA.sent(), DA.label = 17;
              case 17:
                return nA++, [3, 15];
              case 18:
                cA = 0, wA = a.inlineLevel, DA.label = 19;
              case 19:
                return cA < wA.length ? (OA = wA[cA], [4, this.renderNode(OA)]) : [3, 22];
              case 20:
                DA.sent(), DA.label = 21;
              case 21:
                return cA++, [3, 19];
              case 22:
                TA = 0, EA = a.zeroOrAutoZIndexOrTransformedOrOpacity, DA.label = 23;
              case 23:
                return TA < EA.length ? (OA = EA[TA], [4, this.renderStack(OA)]) : [3, 26];
              case 24:
                DA.sent(), DA.label = 25;
              case 25:
                return TA++, [3, 23];
              case 26:
                IA = 0, PA = a.positiveZIndex, DA.label = 27;
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
      }, e.prototype.mask = function(a) {
        this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(a.slice(0).reverse()), this.ctx.closePath();
      }, e.prototype.path = function(a) {
        this.ctx.beginPath(), this.formatPath(a), this.ctx.closePath();
      }, e.prototype.formatPath = function(a) {
        var n = this;
        a.forEach(function(p, S) {
          var K = Se(p) ? p.start : p;
          S === 0 ? n.ctx.moveTo(K.x, K.y) : n.ctx.lineTo(K.x, K.y), Se(p) && n.ctx.bezierCurveTo(p.startControl.x, p.startControl.y, p.endControl.x, p.endControl.y, p.end.x, p.end.y);
        });
      }, e.prototype.renderRepeat = function(a, n, p, S) {
        this.path(a), this.ctx.fillStyle = n, this.ctx.translate(p, S), this.ctx.fill(), this.ctx.translate(-p, -S);
      }, e.prototype.resizeImage = function(a, n, p) {
        var S;
        if (a.width === n && a.height === p) return a;
        var K = ((S = this.canvas.ownerDocument) !== null && S !== void 0 ? S : document).createElement("canvas");
        return K.width = Math.max(1, n), K.height = Math.max(1, p), K.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, n, p), K;
      }, e.prototype.renderBackgroundImage = function(a) {
        return f(this, void 0, void 0, function() {
          var n, p, S, K, W, X;
          return s(this, function(nA) {
            switch (nA.label) {
              case 0:
                n = a.styles.backgroundImage.length - 1, p = function(oA) {
                  var cA, wA, TA, se, Ce, Fe, YA, he, XA, EA, se, Ce, Fe, YA, he, IA, PA, OA, DA, $A, jA, kA, HA, WA, XA, KA, se, ye, Ie, YA, he, wt, Ce, Fe, Tt, Me, Bt, St, Ht, $e, Lt, At;
                  return s(this, function(tr) {
                    switch (tr.label) {
                      case 0:
                        if (oA.type !== 0) return [3, 5];
                        cA = void 0, wA = oA.url, tr.label = 1;
                      case 1:
                        return tr.trys.push([
                          1,
                          3,
                          ,
                          4
                        ]), [4, S.context.cache.match(wA)];
                      case 2:
                        return cA = tr.sent(), [3, 4];
                      case 3:
                        return tr.sent(), S.context.logger.error("Error loading background-image " + wA), [3, 4];
                      case 4:
                        return cA && (TA = Gi(a, n, [
                          cA.width,
                          cA.height,
                          cA.width / cA.height
                        ]), se = TA[0], Ce = TA[1], Fe = TA[2], YA = TA[3], he = TA[4], XA = S.ctx.createPattern(S.resizeImage(cA, YA, he), "repeat"), S.renderRepeat(se, XA, Ce, Fe)), [3, 6];
                      case 5:
                        ah(oA) ? (EA = Gi(a, n, [
                          null,
                          null,
                          null
                        ]), se = EA[0], Ce = EA[1], Fe = EA[2], YA = EA[3], he = EA[4], IA = eh(oA.angle, YA, he), PA = IA[0], OA = IA[1], DA = IA[2], $A = IA[3], jA = IA[4], kA = document.createElement("canvas"), kA.width = YA, kA.height = he, HA = kA.getContext("2d"), WA = HA.createLinearGradient(OA, $A, DA, jA), gs(oA.stops, PA).forEach(function(Or) {
                          return WA.addColorStop(Or.stop, le(Or.color));
                        }), HA.fillStyle = WA, HA.fillRect(0, 0, YA, he), YA > 0 && he > 0 && (XA = S.ctx.createPattern(kA, "repeat"), S.renderRepeat(se, XA, Ce, Fe))) : sh(oA) && (KA = Gi(a, n, [
                          null,
                          null,
                          null
                        ]), se = KA[0], ye = KA[1], Ie = KA[2], YA = KA[3], he = KA[4], wt = oA.position.length === 0 ? [pi] : oA.position, Ce = ZA(wt[0], YA), Fe = ZA(wt[wt.length - 1], he), Tt = th(oA, Ce, Fe, YA, he), Me = Tt[0], Bt = Tt[1], Me > 0 && Bt > 0 && (St = S.ctx.createRadialGradient(ye + Ce, Ie + Fe, 0, ye + Ce, Ie + Fe, Me), gs(oA.stops, Me * 2).forEach(function(Or) {
                          return St.addColorStop(Or.stop, le(Or.color));
                        }), S.path(se), S.ctx.fillStyle = St, Me !== Bt ? (Ht = a.bounds.left + 0.5 * a.bounds.width, $e = a.bounds.top + 0.5 * a.bounds.height, Lt = Bt / Me, At = 1 / Lt, S.ctx.save(), S.ctx.translate(Ht, $e), S.ctx.transform(1, 0, 0, Lt, 0, 0), S.ctx.translate(-Ht, -$e), S.ctx.fillRect(ye, At * (Ie - $e) + $e, YA, he * At), S.ctx.restore()) : S.ctx.fill())), tr.label = 6;
                      case 6:
                        return n--, [2];
                    }
                  });
                }, S = this, K = 0, W = a.styles.backgroundImage.slice(0).reverse(), nA.label = 1;
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
      }, e.prototype.renderSolidBorder = function(a, n, p) {
        return f(this, void 0, void 0, function() {
          return s(this, function(S) {
            return this.path(Uo(p, n)), this.ctx.fillStyle = le(a), this.ctx.fill(), [2];
          });
        });
      }, e.prototype.renderDoubleBorder = function(a, n, p, S) {
        return f(this, void 0, void 0, function() {
          var K, W;
          return s(this, function(X) {
            switch (X.label) {
              case 0:
                return n < 3 ? [4, this.renderSolidBorder(a, p, S)] : [3, 2];
              case 1:
                return X.sent(), [2];
              case 2:
                return K = ip(S, p), this.path(K), this.ctx.fillStyle = le(a), this.ctx.fill(), W = ap(S, p), this.path(W), this.ctx.fill(), [2];
            }
          });
        });
      }, e.prototype.renderNodeBackgroundAndBorders = function(a) {
        return f(this, void 0, void 0, function() {
          var n, p, S, K, W, X, nA, oA, cA = this;
          return s(this, function(wA) {
            switch (wA.label) {
              case 0:
                return this.applyEffects(a.getEffects(2)), n = a.container.styles, p = !ft(n.backgroundColor) || n.backgroundImage.length, S = [
                  {
                    style: n.borderTopStyle,
                    color: n.borderTopColor,
                    width: n.borderTopWidth
                  },
                  {
                    style: n.borderRightStyle,
                    color: n.borderRightColor,
                    width: n.borderRightWidth
                  },
                  {
                    style: n.borderBottomStyle,
                    color: n.borderBottomColor,
                    width: n.borderBottomWidth
                  },
                  {
                    style: n.borderLeftStyle,
                    color: n.borderLeftColor,
                    width: n.borderLeftWidth
                  }
                ], K = wp(er(n.backgroundClip, 0), a.curves), p || n.boxShadow.length ? (this.ctx.save(), this.path(K), this.ctx.clip(), ft(n.backgroundColor) || (this.ctx.fillStyle = le(n.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(a.container)]) : [3, 2];
              case 1:
                wA.sent(), this.ctx.restore(), n.boxShadow.slice(0).reverse().forEach(function(TA) {
                  cA.ctx.save();
                  var EA = _n(a.curves), IA = TA.inset ? 0 : dp, PA = rp(EA, -IA + (TA.inset ? 1 : -1) * TA.spread.number, (TA.inset ? 1 : -1) * TA.spread.number, TA.spread.number * (TA.inset ? -2 : 2), TA.spread.number * (TA.inset ? -2 : 2));
                  TA.inset ? (cA.path(EA), cA.ctx.clip(), cA.mask(PA)) : (cA.mask(EA), cA.ctx.clip(), cA.path(PA)), cA.ctx.shadowOffsetX = TA.offsetX.number + IA, cA.ctx.shadowOffsetY = TA.offsetY.number, cA.ctx.shadowColor = le(TA.color), cA.ctx.shadowBlur = TA.blur.number, cA.ctx.fillStyle = TA.inset ? le(TA.color) : "rgba(0,0,0,1)", cA.ctx.fill(), cA.ctx.restore();
                }), wA.label = 2;
              case 2:
                W = 0, X = 0, nA = S, wA.label = 3;
              case 3:
                return X < nA.length ? (oA = nA[X], oA.style !== 0 && !ft(oA.color) && oA.width > 0 ? oA.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(oA.color, oA.width, W, a.curves, 2)] : [3, 11]) : [3, 13];
              case 4:
                return wA.sent(), [3, 11];
              case 5:
                return oA.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(oA.color, oA.width, W, a.curves, 3)];
              case 6:
                return wA.sent(), [3, 11];
              case 7:
                return oA.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(oA.color, oA.width, W, a.curves)];
              case 8:
                return wA.sent(), [3, 11];
              case 9:
                return [4, this.renderSolidBorder(oA.color, W, a.curves)];
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
      }, e.prototype.renderDashedDottedBorder = function(a, n, p, S, K) {
        return f(this, void 0, void 0, function() {
          var W, X, nA, oA, cA, wA, TA, EA, IA, PA, OA, DA, $A, jA, kA, HA, kA, HA;
          return s(this, function(WA) {
            return this.ctx.save(), W = sp(S, p), X = Uo(S, p), K === 2 && (this.path(X), this.ctx.clip()), Se(X[0]) ? (nA = X[0].start.x, oA = X[0].start.y) : (nA = X[0].x, oA = X[0].y), Se(X[1]) ? (cA = X[1].end.x, wA = X[1].end.y) : (cA = X[1].x, wA = X[1].y), p === 0 || p === 2 ? TA = Math.abs(nA - cA) : TA = Math.abs(oA - wA), this.ctx.beginPath(), K === 3 ? this.formatPath(W) : this.formatPath(X.slice(0, 2)), EA = n < 3 ? n * 3 : n * 2, IA = n < 3 ? n * 2 : n, K === 3 && (EA = n, IA = n), PA = !0, TA <= EA * 2 ? PA = !1 : TA <= EA * 2 + IA ? (OA = TA / (2 * EA + IA), EA *= OA, IA *= OA) : (DA = Math.floor((TA + IA) / (EA + IA)), $A = (TA - DA * EA) / (DA - 1), jA = (TA - (DA + 1) * EA) / DA, IA = jA <= 0 || Math.abs(IA - $A) < Math.abs(IA - jA) ? $A : jA), PA && (K === 3 ? this.ctx.setLineDash([0, EA + IA]) : this.ctx.setLineDash([EA, IA])), K === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = n) : this.ctx.lineWidth = n * 2 + 1.1, this.ctx.strokeStyle = le(a), this.ctx.stroke(), this.ctx.setLineDash([]), K === 2 && (Se(X[0]) && (kA = X[3], HA = X[0], this.ctx.beginPath(), this.formatPath([new SA(kA.end.x, kA.end.y), new SA(HA.start.x, HA.start.y)]), this.ctx.stroke()), Se(X[1]) && (kA = X[1], HA = X[2], this.ctx.beginPath(), this.formatPath([new SA(kA.end.x, kA.end.y), new SA(HA.start.x, HA.start.y)]), this.ctx.stroke())), this.ctx.restore(), [2];
          });
        });
      }, e.prototype.render = function(a) {
        return f(this, void 0, void 0, function() {
          var n;
          return s(this, function(p) {
            switch (p.label) {
              case 0:
                return this.options.backgroundColor && (this.ctx.fillStyle = le(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), n = np(a), [4, this.renderStack(n)];
              case 1:
                return p.sent(), this.applyEffects([]), [2, this.canvas];
            }
          });
        });
      }, e;
    })(_o), gp = function(t) {
      return t instanceof Zs || t instanceof qs ? !0 : t instanceof Si && t.type !== Fn && t.type !== Cn;
    }, wp = function(t, e) {
      switch (t) {
        case 0:
          return _n(e);
        case 2:
          return Zd(e);
        default:
          return xn(e);
      }
    }, Bp = function(t) {
      switch (t) {
        case 1:
          return "center";
        case 2:
          return "right";
        default:
          return "left";
      }
    }, mp = ["-apple-system", "system-ui"], vp = function(t) {
      return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? t.filter(function(e) {
        return mp.indexOf(e) === -1;
      }) : t;
    }, yp = (function(t) {
      c(e, t);
      function e(a, n) {
        var p = t.call(this, a, n) || this;
        return p.canvas = n.canvas ? n.canvas : document.createElement("canvas"), p.ctx = p.canvas.getContext("2d"), p.options = n, p.canvas.width = Math.floor(n.width * n.scale), p.canvas.height = Math.floor(n.height * n.scale), p.canvas.style.width = n.width + "px", p.canvas.style.height = n.height + "px", p.ctx.scale(p.options.scale, p.options.scale), p.ctx.translate(-n.x, -n.y), p.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + n.width + "x" + n.height + " at " + n.x + "," + n.y + ") with scale " + n.scale), p;
      }
      return e.prototype.render = function(a) {
        return f(this, void 0, void 0, function() {
          var n, p;
          return s(this, function(S) {
            switch (S.label) {
              case 0:
                return n = _i(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, a), [4, Cp(n)];
              case 1:
                return p = S.sent(), this.options.backgroundColor && (this.ctx.fillStyle = le(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(p, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
            }
          });
        });
      }, e;
    })(_o), Cp = function(t) {
      return new Promise(function(e, a) {
        var n = new Image();
        n.onload = function() {
          e(n);
        }, n.onerror = a, n.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(t));
      });
    }, Fp = (function() {
      function t(e) {
        var a = e.id, n = e.enabled;
        this.id = a, this.enabled = n, this.start = Date.now();
      }
      return t.prototype.debug = function() {
        for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
        this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.prototype.getTime = function() {
        return Date.now() - this.start;
      }, t.prototype.info = function() {
        for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
        this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, o([this.id, this.getTime() + "ms"], e));
      }, t.prototype.warn = function() {
        for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
        this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.prototype.error = function() {
        for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
        this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, o([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
      }, t.instances = {}, t;
    })(), Ep = (function() {
      function t(e, a) {
        var n;
        this.windowBounds = a, this.instanceName = "#" + t.instanceCount++, this.logger = new Fp({
          id: this.instanceName,
          enabled: e.logging
        }), this.cache = (n = e.cache) !== null && n !== void 0 ? n : new Vd(this, e);
      }
      return t.instanceCount = 1, t;
    })(), Qp = function(t, e) {
      return e === void 0 && (e = {}), Up(t, e);
    };
    typeof window < "u" && vo.setContext(window);
    var Up = function(t, e) {
      return f(void 0, void 0, void 0, function() {
        var a, n, p, S, K, W, X, nA, oA, cA, wA, TA, EA, IA, PA, OA, DA, $A, jA, kA, WA, HA, WA, XA, KA, se, ye, Ie, YA, he, wt, Ce, Fe, Tt, Me, Bt, St, Ht, $e, Lt;
        return s(this, function(At) {
          switch (At.label) {
            case 0:
              if (!t || typeof t != "object") return [2, Promise.reject("Invalid element provided as first argument")];
              if (a = t.ownerDocument, !a) throw new Error("Element is not attached to a Document");
              if (n = a.defaultView, !n) throw new Error("Document is not attached to a Window");
              return p = {
                allowTaint: (XA = e.allowTaint) !== null && XA !== void 0 ? XA : !1,
                imageTimeout: (KA = e.imageTimeout) !== null && KA !== void 0 ? KA : 15e3,
                proxy: e.proxy,
                useCORS: (se = e.useCORS) !== null && se !== void 0 ? se : !1
              }, S = h({
                logging: (ye = e.logging) !== null && ye !== void 0 ? ye : !0,
                cache: e.cache
              }, p), K = {
                windowWidth: (Ie = e.windowWidth) !== null && Ie !== void 0 ? Ie : n.innerWidth,
                windowHeight: (YA = e.windowHeight) !== null && YA !== void 0 ? YA : n.innerHeight,
                scrollX: (he = e.scrollX) !== null && he !== void 0 ? he : n.pageXOffset,
                scrollY: (wt = e.scrollY) !== null && wt !== void 0 ? wt : n.pageYOffset
              }, W = new d(K.scrollX, K.scrollY, K.windowWidth, K.windowHeight), X = new Ep(S, W), nA = (Ce = e.foreignObjectRendering) !== null && Ce !== void 0 ? Ce : !1, oA = {
                allowTaint: (Fe = e.allowTaint) !== null && Fe !== void 0 ? Fe : !1,
                onclone: e.onclone,
                ignoreElements: e.ignoreElements,
                inlineImages: nA,
                copyStyles: nA
              }, X.logger.debug("Starting document clone with size " + W.width + "x" + W.height + " scrolled to " + -W.left + "," + -W.top), cA = new Bo(X, t, oA), wA = cA.clonedReferenceElement, wA ? [4, cA.toIFrame(a, W)] : [2, Promise.reject("Unable to find element in cloned iframe")];
            case 1:
              return TA = At.sent(), EA = Li(wA) || bd(wA) ? F(wA.ownerDocument) : U(X, wA), IA = EA.width, PA = EA.height, OA = EA.left, DA = EA.top, $A = bp(X, wA, e.backgroundColor), jA = {
                canvas: e.canvas,
                backgroundColor: $A,
                scale: (Me = (Tt = e.scale) !== null && Tt !== void 0 ? Tt : n.devicePixelRatio) !== null && Me !== void 0 ? Me : 1,
                x: ((Bt = e.x) !== null && Bt !== void 0 ? Bt : 0) + OA,
                y: ((St = e.y) !== null && St !== void 0 ? St : 0) + DA,
                width: (Ht = e.width) !== null && Ht !== void 0 ? Ht : Math.ceil(IA),
                height: ($e = e.height) !== null && $e !== void 0 ? $e : Math.ceil(PA)
              }, nA ? (X.logger.debug("Document cloned, using foreign object rendering"), WA = new yp(X, jA), [4, WA.render(wA)]) : [3, 3];
            case 2:
              return kA = At.sent(), [3, 5];
            case 3:
              return X.logger.debug("Document cloned, element located at " + OA + "," + DA + " with size " + IA + "x" + PA + " using computed rendering"), X.logger.debug("Starting DOM parsing"), HA = eo(X, wA), $A === HA.styles.backgroundColor && (HA.styles.backgroundColor = qe.TRANSPARENT), X.logger.debug("Starting renderer for element at " + jA.x + "," + jA.y + " with size " + jA.width + "x" + jA.height), WA = new pp(X, jA), [4, WA.render(HA)];
            case 4:
              kA = At.sent(), At.label = 5;
            case 5:
              return (!((Lt = e.removeContainer) !== null && Lt !== void 0) || Lt) && (Bo.destroy(TA) || X.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), X.logger.debug("Finished rendering"), [2, kA];
          }
        });
      });
    }, bp = function(t, e, a) {
      var n = e.ownerDocument, p = n.documentElement ? xr(t, getComputedStyle(n.documentElement).backgroundColor) : qe.TRANSPARENT, S = n.body ? xr(t, getComputedStyle(n.body).backgroundColor) : qe.TRANSPARENT, K = typeof a == "string" ? xr(t, a) : a === null ? qe.TRANSPARENT : 4294967295;
      return e === n.documentElement ? ft(p) ? ft(S) ? K : S : p : K;
    };
    return Qp;
  }));
})), j0 = /* @__PURE__ */ Dp(X0(), 1), Ot = Object.freeze({
  red: "C42C2C",
  blue: "5060F8",
  orange: "DC8938",
  magenta: "992899",
  green: "2F9C2F",
  olive: "A7A728",
  teal: "288383"
}), Pe = (A, i) => `<a:${A}><a:srgbClr val="${i}"/></a:${A}>`, z0 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Traité">
  <a:themeElements>
    <a:clrScheme name="Traité">
      <a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>
      <a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>
      ${Pe("dk2", Ot.red)}
      ${Pe("lt2", "E7E6E6")}
      ${Pe("accent1", Ot.blue)}
      ${Pe("accent2", Ot.orange)}
      ${Pe("accent3", Ot.magenta)}
      ${Pe("accent4", Ot.green)}
      ${Pe("accent5", Ot.olive)}
      ${Pe("accent6", Ot.teal)}
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
function J0(A) {
  A.Document.Relationships.addRelationship("TraiteTheme", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml");
  const i = new mA("Override");
  return i.addChildElement(new NA({
    PartName: "/word/theme/theme1.xml",
    ContentType: "application/vnd.openxmlformats-officedocument.theme+xml"
  })), A.ContentTypes.addChildElement(i), [{
    path: "word/theme/theme1.xml",
    data: z0
  }];
}
var mt = "HEJI2Text", We = "Roboto Slab", Xr = "Roboto Slab Light", at = "Inter Light", tl = "Calibri Light", Y0 = "Arial Unicode MS", q0 = {
  5: "C42C2C",
  7: "5060F8",
  11: "DC8938",
  13: "992899"
}, _u = 12240, xu = 15840, fa = 1134, da = 1440, Tu = _u - fa * 2, Oa = xu - da * 2, Z0 = Math.round(Tu * 96 / 1440), ia = Math.round(Oa * 96 / 1440), $0 = Math.round(15.5 / 2.54 * 96), Ay = 8842, ii = Tu - 120, ey = ii / Ay, ty = ii / 812, ry = [
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
], cr, ny = [
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
].join(", "), Nt = 28, VA = {
  style: mr.SINGLE,
  size: 4,
  color: "000000"
}, iy = {
  style: mr.DASHED,
  size: 6,
  color: "000000"
}, it = {
  style: mr.NONE,
  size: 0,
  color: "auto"
}, pa = {
  top: VA,
  bottom: VA,
  left: VA,
  right: VA,
  insideHorizontal: VA,
  insideVertical: VA
};
function ga() {
  return new Promise((A) => requestAnimationFrame(() => requestAnimationFrame(A)));
}
function ai(A) {
  return String(A ?? "").replace(/\s+/g, " ");
}
function jn(A) {
  return ai(A).trim().replaceAll("♭", "b").replaceAll("♯", "#");
}
function Na(A) {
  return cr ||= document.createElement("canvas").getContext("2d"), cr.font = `300 10pt "${at}"`, cr.measureText(jn(A)).width * 15;
}
function Su(A, i) {
  const r = A.reduce((f, s) => f + s, 0) || 1;
  let c = 0, h = 0;
  return A.map((f, s) => {
    c += f;
    const o = s === A.length - 1 ? i : Math.round(c * i / r), d = o - h;
    return h = o, d;
  });
}
function ay(A) {
  const i = String(A ?? "").trim();
  if (/^#[0-9a-f]{6}$/i.test(i)) return i.slice(1).toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(i)) return i.slice(1).split("").map((c) => c.repeat(2)).join("").toUpperCase();
  const r = i.match(/^rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)/i);
  if (r)
    return r.slice(1, 4).map((c) => Number(c).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function sy(A, i = {}) {
  const r = { ...i }, c = ay(A.style?.color);
  return c && (r.color = c), A.matches("strong, b") && (r.bold = !0), A.classList.contains("is-characteristic") && (r.bold = !0), A.matches("em, i, .summary-empty") && (r.italics = !0), A.matches("sup") && (r.superScript = !0), A.matches("sub") && (r.subScript = !0), A.classList.contains("degree-accidental") ? (r.font = Y0, r.size = 20, r.noProof = !0) : A.classList.contains("degree-text") && (r.font = at, r.size = 20, r.noProof = !0), A.classList.contains("mode-chord-suffix") && (r.superScript = !0, r.font = at, r.size = 20, r.noProof = !0), A.classList.contains("heji-accidental") ? (r.style = "SummaryHejiAccidental", r.font = mt, r.size = 28, r.bold = !1, r.noProof = !0) : A.classList.contains("heji-note") ? (r.size = 28, r.bold = !1, r.noProof = !0) : A.classList.contains("cents-label") && (r.size = 28, r.noProof = !0, r.subScript = !0), A.classList.contains("discordant-proportion") && (r.color = "FF0000"), r;
}
function ka(A, i = {}) {
  if (A.nodeType === Node.TEXT_NODE) {
    const c = A.parentElement?.closest?.(".mode-chord-name") ? jn(A.textContent) : ai(A.textContent);
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
  const r = sy(A, i);
  return A.classList.contains("mode-chord-suffix") ? [new je({
    ...r,
    text: jn(A.textContent)
  })] : [...A.childNodes].flatMap((c, h) => [...h > 0 && c instanceof Element && c.classList.contains("mode-chord-name-line") ? [new je({
    break: 1,
    text: ""
  })] : [], ...ka(c, r)]);
}
function oy(A, i) {
  const r = ai(A).trim().replace(/#(?=\d)/g, "♯").replace(/b(?=\d)/g, "♭").replace(/^m\(maj(7|9)\)$/, "mmaj$1"), c = r.match(/^(add)([♭♯]\d+)$/) || r.match(/^((?:sm|m))(add[♭♯]?\d+)$/) || r.match(/^((?:sm|m))(6)$/) || r.match(/^((?:sm|m))(maj\d+)$/) || r.match(/^((?:sm|m|maj\d+|m\d+|sm\d+|7|9|Fr|Gr|Fr\/Ger))([♭♯]\d+|\+6|no\d+)$/), h = (o, d = !1) => new je({
    ...i,
    font: at,
    ...d ? {
      size: 20,
      superScript: !0
    } : {},
    noProof: !0,
    text: jn(o)
  });
  if (!c) return [h(r)];
  const [, f, s] = c;
  return [h(f), h(s, !0)];
}
function Hu(A, i = {}) {
  const r = ka(A, i.run ?? {});
  return new Le({
    children: r.length ? r : [new je("")],
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
function ly(A, { explicitPageBreakBefore: i = !1 } = {}) {
  const r = Number(A.tagName.slice(1)), c = [
    nr.TITLE,
    nr.HEADING_1,
    nr.HEADING_2,
    nr.HEADING_3,
    nr.HEADING_4,
    nr.HEADING_5
  ][Math.max(0, Math.min(5, r - 1))], h = [
    36,
    32,
    28,
    24,
    20,
    20
  ], f = [
    Xr,
    Xr,
    We,
    We,
    We,
    We
  ], s = [
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
  ], o = Math.max(0, Math.min(5, r - 1)), d = {
    bold: !1,
    color: "000000",
    font: f[o],
    italics: !1,
    noProof: !0,
    size: h[o]
  }, U = r === 1 ? ai(A.textContent).split(/(\d+)/).filter(Boolean).map((F) => new je({
    ...d,
    color: q0[F] ?? d.color,
    text: F
  })) : ka(A, d);
  return new Le({
    heading: c,
    children: i ? [new VB(), ...U] : U,
    keepNext: !0,
    keepLines: !0,
    spacing: s[o]
  });
}
function si(A, { alignment: i = fe.CENTER, columnSpan: r = 1, borderless: c = !1, borders: h, margins: f, run: s, keepNext: o = !1 } = {}) {
  const d = {
    font: at,
    size: 20,
    noProof: !0,
    ...s
  };
  return new Sa({
    children: [A.matches("th:first-child") && A.closest(".summary-chord-matrix") ? new Le({
      children: oy(A.textContent, d),
      alignment: i,
      keepNext: o,
      keepLines: !0,
      style: "SummaryTableCell",
      spacing: {
        before: 0,
        after: 0,
        line: 240
      }
    }) : Hu(A, {
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
    columnSpan: r,
    verticalAlign: iu.CENTER,
    borders: c ? {
      top: it,
      bottom: it,
      left: it,
      right: it
    } : h,
    margins: f
  });
}
var Lu = 800;
function uy(A) {
  return 400 + A.reduce((i, r) => i + 380 * Math.max(1, ...[...r.cells].map((c) => c.querySelectorAll(":scope > .heji-pitch, :scope > .heji-with-cents").length)), 0);
}
function cy(A, i = 0) {
  const r = [...A.querySelectorAll(":scope > colgroup > col")], c = A.classList.contains("summary-chord-matrix") ? 84 : A.classList.contains("summary-tetrachord-synthesis") ? 124 : 56, h = r.length ? r.map((B, _) => _ === 0 ? c : 56) : Array.from({ length: Math.max(1, A.rows[0]?.cells.length ?? 1) }, () => 1), f = h.reduce((B, _) => B + _, 0), s = Math.min(ii, Math.round(f * ty)), o = Su(h, s), d = A.classList.contains("summary-fixed-degree-table"), U = [...A.rows], F = uy(U) + i <= Oa - Lu;
  return new du({
    rows: U.map((B, _) => new Ha({
      children: [...B.cells].map((E, v, w) => {
        const b = d ? {
          top: VA,
          bottom: VA,
          left: v === 0 || E.classList.contains("is-family-start") ? VA : it,
          right: v === w.length - 1 || E.classList.contains("is-family-end") ? VA : it,
          ...v === 0 ? { start: VA } : {},
          ...v === w.length - 1 ? { end: VA } : {}
        } : {
          ...v === 0 ? {
            left: VA,
            start: VA
          } : {},
          ...v === w.length - 1 ? {
            right: VA,
            end: VA
          } : {}
        };
        return si(E, {
          alignment: fe.CENTER,
          columnSpan: Math.max(1, Number(E.colSpan) || 1),
          borders: b,
          keepNext: F ? _ < U.length - 1 : _ === 0 || B.parentElement?.tagName === "THEAD"
        });
      }),
      cantSplit: !0,
      tableHeader: B.parentElement?.tagName === "THEAD"
    })),
    width: {
      size: s,
      type: Gt.DXA
    },
    columnWidths: o,
    layout: cu.FIXED,
    margins: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    },
    borders: d ? {
      ...pa,
      insideVertical: it
    } : pa,
    alignment: fe.LEFT,
    indent: {
      size: 0,
      type: Gt.DXA
    }
  });
}
function wa(A) {
  const i = (A.style.gridColumn || `${A.style.gridColumnStart} / ${A.style.gridColumnEnd}`).match(/(\d+)\s*\/\s*(\d+)/);
  if (!i) return null;
  const r = Number(i[1]), c = Number(i[2]);
  return Number.isInteger(r) && Number.isInteger(c) && c > r ? {
    start: r,
    end: c
  } : null;
}
function zn(A = 1, i = !1, r = !1, c) {
  return si(document.createElement("span"), {
    columnSpan: A,
    borderless: i,
    borders: c,
    keepNext: r,
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
function rl(A, i, r) {
  const c = r.reduce((f, s) => f + s, 0) || 1, h = [];
  return r.slice(0, -1).reduce((f, s, o) => {
    const d = f + s;
    return h.push({
      column: o + 1,
      percentage: d * 100 / c
    }), d;
  }, 0), new Set([...A.querySelectorAll(i)].map((f) => {
    const s = Number.parseFloat(f.style.left);
    return !Number.isFinite(s) || !h.length ? null : h.reduce((o, d) => Math.abs(d.percentage - s) < Math.abs(o.percentage - s) ? d : o).column;
  }).filter(Number.isInteger));
}
function nl(A, { top: i = !1, bottom: r = !1, left: c = !1, right: h = !1 } = {}, f, s) {
  const o = {};
  return i && (o.top = VA), r && (o.bottom = VA), c && (o.left = VA, o.start = VA), h ? (o.right = VA, o.end = VA) : s.has(A) ? o.right = iy : f.has(A) && (o.right = VA), Object.keys(o).length ? o : void 0;
}
function hy(A, i, { columnLines: r, blankBoundaries: c = /* @__PURE__ */ new Set(), keepNext: h = !1, tableHeader: f = !1, top: s = !1, bottom: o = !1, solidBoundaries: d = /* @__PURE__ */ new Set(), dashedBoundaries: U = /* @__PURE__ */ new Set() } = {}) {
  const F = [...A.children].filter((w) => !w.matches(".visually-hidden, .mode-family-boundary, .mode-tetrachord-start")).map((w) => {
    const b = wa(w);
    return {
      element: w,
      range: b && r ? {
        start: r[b.start],
        end: r[b.end]
      } : b
    };
  }).filter(({ range: w }) => w).sort((w, b) => w.range.start - b.range.start), B = [], _ = [.../* @__PURE__ */ new Set([
    ...c,
    ...d,
    ...U
  ])].filter((w) => w > 0 && w < i).sort((w, b) => w - b), E = (w, b) => {
    if (b < w) return;
    let T = w;
    for (const x of [..._.filter((N) => N >= w && N < b), b])
      B.push(zn(x - T + 1, !1, h, nl(x, {
        top: s,
        bottom: o,
        left: T === 1,
        right: x === i
      }, d, U))), T = x + 1;
  };
  let v = 1;
  return F.forEach(({ element: w, range: b }) => {
    if (b.start < v) return;
    b.start > v && E(v, b.start - 1);
    const T = Math.min(i + 1, b.end) - b.start;
    B.push(si(w, {
      borders: nl(b.start + T - 1, {
        top: s,
        bottom: o,
        left: b.start === 1,
        right: b.start + T - 1 === i
      }, d, U),
      columnSpan: T,
      keepNext: h
    })), v = b.start + T;
  }), v <= i && E(v, i), new Ha({
    children: B.length ? B : [zn(i, !1, h, {
      ...s ? { top: VA } : {},
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
function fy(A, i) {
  const r = Number.parseFloat(A.style.left);
  return Number.isFinite(r) ? Math.max(0, Math.min(i, Math.round(r * i / 100))) : 0;
}
function dy(A) {
  cr ||= document.createElement("canvas").getContext("2d");
  const i = (f, s) => (cr.font = f, cr.measureText(s).width * 15), r = [...A.querySelectorAll(".heji-accidental")].map((f) => f.textContent).join(""), c = [...A.querySelectorAll(".heji-note")].map((f) => f.textContent).join(""), h = [...A.querySelectorAll(".cents-label")].map((f) => f.textContent).join("");
  return !r && !c ? Na(A.textContent) : i('14pt "HEJI2Text"', r) + i(`300 14pt "${at}"`, c) + i(`300 9.3pt "${at}"`, h);
}
function py(A, i, r) {
  const c = i.filter(({ range: s }) => s && s.end <= A.length + 1), h = new Set(c.flatMap(({ range: s }) => Array.from({ length: s.end - s.start }, (o, d) => s.start + d - 1))), f = [...A];
  return c.forEach(({ range: s, contentDxa: o }) => {
    const d = Math.ceil(o * 1.13 + 2 * r), U = f.slice(s.start - 1, s.end - 1).reduce((B, _) => B + _, 0);
    let F = Math.max(0, d - U);
    [{
      donor: s.end - 1,
      receiver: s.end - 2
    }, {
      donor: s.start - 2,
      receiver: s.start - 1
    }].filter(({ donor: B }) => B >= 0 && B < f.length && !h.has(B)).sort((B, _) => f[_.donor] - f[B.donor]).forEach(({ donor: B, receiver: _ }) => {
      if (!F) return;
      const E = Math.min(F, Math.max(0, f[B] - 120));
      f[B] -= E, f[_] += E, F -= E;
    });
  }), f;
}
function gy(A, i) {
  const r = A ? [...A.querySelectorAll(":scope > .mode-chord-name")].map((h) => {
    const f = [...h.querySelectorAll(":scope > .mode-chord-name-line")];
    return {
      range: wa(h),
      contentDxa: Math.max(...(f.length ? f : [h]).map((s) => Na(s.textContent)))
    };
  }) : [], c = i.flatMap((h) => [...h.querySelectorAll(":scope > .mode-heji-cell")]).map((h) => ({
    range: wa(h),
    contentDxa: dy(h)
  }));
  return [...r, ...c];
}
function wy(A, i, r) {
  const c = i.findIndex((s) => s > A), h = c < 0 ? i.length - 2 : Math.max(0, c - 1), f = i[h + 1] - i[h] || 1;
  return Math.round(r[h] + (A - i[h]) * (r[h + 1] - r[h]) / f);
}
function By(A, i, r, c, h) {
  const f = Su(A, r), s = py(f, c, h), o = [0];
  f.forEach((v) => o.push(o.at(-1) + v));
  const d = [0];
  s.forEach((v) => d.push(d.at(-1) + v));
  const U = /* @__PURE__ */ new Map();
  i.forEach((v) => {
    const w = [...v.querySelectorAll(":scope > .proportion-label")].map((b) => ({
      label: b,
      center: Math.max(1, Math.min(r - 1, wy(fy(b, r), o, d))),
      requiredHalfWidth: Math.ceil(Na(b.textContent) * 1.22 / 2) + 12
    })).sort((b, T) => b.center - T.center);
    w.forEach(({ label: b, center: T, requiredHalfWidth: x }, N) => {
      const R = N ? T - w[N - 1].center : 1 / 0, C = N < w.length - 1 ? w[N + 1].center - T : 1 / 0, g = N ? R - w[N - 1].requiredHalfWidth - 12 : 1 / 0, O = N < w.length - 1 ? C - w[N + 1].requiredHalfWidth - 12 : 1 / 0, M = Math.min(520, R * 0.44, C * 0.44), I = Math.max(1, Math.floor(Math.min(Math.max(M, x), g, O, T, r - T)));
      U.set(b, {
        left: T - I,
        right: T + I
      });
    });
  });
  const F = [...d], B = new Map(d.map((v) => [v, v]));
  [...U.values()].flatMap(({ left: v, right: w }) => [v, w]).sort((v, w) => v - w).forEach((v) => {
    if (B.has(v)) return;
    const w = F.reduce((T, x) => Math.abs(x - v) < Math.abs(T - v) ? x : T), b = Math.abs(w - v) <= 45 ? w : v;
    B.set(v, b), b === v && F.push(v);
  });
  const _ = [...new Set(F)].sort((v, w) => v - w), E = new Map(_.map((v, w) => [v, w + 1]));
  return {
    columnCount: _.length - 1,
    columnWidths: _.slice(1).map((v, w) => v - _[w]),
    columnLines: [null, ...d.map((v) => E.get(v))],
    labelRanges: new Map([...U].map(([v, { left: w, right: b }]) => [v, {
      start: E.get(B.get(w)),
      end: E.get(B.get(b))
    }]))
  };
}
function my(A, i, { keepNext: r = !1, top: c = !1, bottom: h = !1 } = {}) {
  const f = [...A.querySelectorAll(":scope > .proportion-label")].map((F) => ({
    label: F,
    range: i.labelRanges.get(F)
  })).filter(({ range: F }) => F).sort((F, B) => F.range.start - B.range.start), s = [], o = (F, B) => ({
    ...c ? { top: VA } : {},
    ...h ? { bottom: VA } : {},
    ...F === 1 ? {
      left: VA,
      start: VA
    } : {},
    ...B === i.columnCount ? {
      right: VA,
      end: VA
    } : {}
  }), d = (F, B) => {
    B < F || s.push(zn(B - F + 1, !1, r, o(F, B)));
  };
  let U = 1;
  return f.forEach(({ label: F, range: B }) => {
    B.start < U || (d(U, B.start - 1), s.push(si(F, {
      alignment: fe.CENTER,
      borders: o(B.start, B.end - 1),
      columnSpan: B.end - B.start,
      keepNext: r,
      margins: {
        top: Nt,
        right: 0,
        bottom: Nt,
        left: 0
      }
    })), U = B.end);
  }), d(U, i.columnCount), new Ha({
    children: s.length ? s : [zn(i.columnCount, !1, r, o(1, i.columnCount))],
    cantSplit: !0
  });
}
function vy(A) {
  return 400 + A.reduce((i, { role: r, row: c }) => {
    if (r === "chord-name") {
      const h = [...c.querySelectorAll(":scope > .mode-chord-name")];
      return i + 380 * Math.max(1, ...h.map((f) => f.querySelectorAll(":scope > .mode-chord-name-line").length));
    }
    return r === "heji" ? i + 420 : i + 350;
  }, 0);
}
function yy(A, i, r = 0) {
  const c = A.style.getPropertyValue("--mode-table-grid").trim().split(/\s+/).map((M) => Number.parseFloat(M)).filter((M) => Number.isFinite(M) && M > 0), h = c.reduce((M, I) => M + I, 0) || 1, f = Math.min(ii, Math.max(1, Math.round(h * ey))), s = rl(A, ".mode-family-boundary", c), o = i.tetrachords ? rl(A, ".mode-tetrachord-start", c) : /* @__PURE__ */ new Set(), d = [];
  [
    [".mode-chord-function-row", "function"],
    [".mode-chord-name-row", "chord-name"],
    [".mode-degree-row", "degree"]
  ].forEach(([M, I]) => {
    if (!i.chords && (I === "function" || I === "chord-name")) return;
    const Z = A.querySelector(`:scope > ${M}`);
    Z && d.push({
      role: I,
      row: Z
    });
  });
  const U = A.querySelector(":scope > .mode-pitch-body"), F = U?.querySelector(":scope > .mode-ratio-row");
  i.ratios && F && d.push({
    role: "ratio",
    row: F
  }), U?.querySelectorAll(":scope > .summary-heji-rows > .summary-heji-row").forEach((M) => {
    d.push({
      role: "heji",
      row: M
    });
  }), i.intervals && A.querySelectorAll(":scope > .mode-proportions > .proportion-row:not(.is-empty)").forEach((M) => {
    d.push({
      role: "proportion",
      row: M
    });
  });
  const B = By(c.length ? c : [1], d.filter(({ role: M }) => M === "proportion").map(({ row: M }) => M), f, gy(d.find(({ role: M }) => M === "chord-name")?.row, d.filter(({ role: M }) => M === "heji").map(({ row: M }) => M)), Nt), { columnCount: _, columnWidths: E, columnLines: v } = B, w = new Set(ry.map((M) => v[M] - 1).filter((M) => Number.isInteger(M) && M > 0 && M < _)), b = (M) => new Set([...M].map((I) => v[I + 1] - 1)), T = b(s), x = b(o), N = T, R = vy(d) + r <= Oa - Lu, C = /* @__PURE__ */ new Set([
    "function",
    "chord-name",
    "degree",
    "ratio"
  ]), g = d.findIndex(({ role: M }) => M === "proportion"), O = d.findLastIndex(({ role: M }) => M === "heji");
  return new du({
    rows: d.map(({ role: M, row: I }, Z) => {
      const uA = !R && C.has(M), k = R ? Z < d.length - 1 : uA || M === "heji" && Z === O && g >= 0 || M === "proportion" && Z < d.length - 1;
      return M === "proportion" ? my(I, B, {
        keepNext: k,
        top: Z === g,
        bottom: Z === d.length - 1
      }) : hy(I, _, {
        columnLines: v,
        blankBoundaries: w,
        top: Z === 0,
        bottom: M === "chord-name" || M === "degree" || Z === d.length - 1,
        dashedBoundaries: M === "ratio" || M === "heji" ? x : /* @__PURE__ */ new Set(),
        keepNext: k,
        solidBoundaries: M === "degree" ? N : M === "function" || M === "chord-name" ? T : /* @__PURE__ */ new Set(),
        tableHeader: uA
      });
    }),
    width: {
      size: f,
      type: Gt.DXA
    },
    columnWidths: E,
    layout: cu.FIXED,
    margins: {
      top: Nt,
      right: Nt,
      bottom: Nt,
      left: Nt
    },
    borders: {
      ...pa,
      insideHorizontal: it,
      insideVertical: it
    },
    alignment: fe.LEFT,
    indent: {
      size: 0,
      type: Gt.DXA
    }
  });
}
function Cy(A, i) {
  for (const r of document.styleSheets) {
    let c;
    try {
      c = r.cssRules;
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
async function Pn(A, i) {
  const r = await fetch(Cy(A, i));
  if (!r.ok) throw new Error(`Police ${A} indisponible (${r.status}).`);
  return {
    name: A,
    data: new Uint8Array(await r.arrayBuffer())
  };
}
async function Fy() {
  return Promise.all([
    Pn(mt, "/assets/HEJI2Text.otf"),
    Pn(at, "/assets/Inter-Light.ttf"),
    Pn(We, "/assets/RobotoSlab-Regular.ttf"),
    Pn(Xr, "/assets/RobotoSlab-Light.ttf")
  ]);
}
function Ey(A) {
  const i = atob(A.split(",")[1] ?? ""), r = new Uint8Array(i.length);
  for (let c = 0; c < i.length; c += 1) r[c] = i.charCodeAt(c);
  return r;
}
async function Qy(A, i) {
  if (!A.length) return /* @__PURE__ */ new Map();
  const r = A.map((d) => {
    const U = Number(d.dataset.exportCaptureWidth);
    return U > 0 ? U : 1040;
  }), c = Math.ceil(Math.max(...r)), h = 3, f = "#fffefb", s = document.createElement("div");
  Object.assign(s.style, {
    position: "fixed",
    left: "-20000px",
    top: "0",
    width: `${c}px`,
    background: f,
    pointerEvents: "none"
  });
  const o = A.map((d, U) => {
    const F = r[U], B = document.createElement("div");
    Object.assign(B.style, {
      width: `${F}px`,
      position: "relative",
      overflow: "hidden",
      background: f
    });
    const _ = d.cloneNode(!0);
    return Object.assign(_.style, {
      width: `${F}px`,
      margin: "0",
      contentVisibility: "visible"
    }), _.querySelector("figcaption")?.remove(), B.append(_), s.append(B), {
      figure: d,
      wrapper: B,
      clone: _
    };
  });
  document.body.append(s);
  try {
    if (typeof FontFace == "function" && document.fonts && i) {
      const B = new FontFace(mt, i);
      await B.load(), document.fonts.add(B), await document.fonts.load(`32px "${mt}"`);
    }
    document.fonts?.ready && await document.fonts.ready, await ga(), o.forEach(({ wrapper: B, clone: _ }) => {
      const E = B.getBoundingClientRect();
      _.querySelectorAll("foreignObject").forEach((v) => {
        const w = v.getBoundingClientRect(), b = v.firstElementChild ? getComputedStyle(v.firstElementChild) : null, T = b?.fontSize, x = b?.alignItems, N = document.createElement("div");
        Object.assign(N.style, {
          position: "absolute",
          left: `${w.left - E.left}px`,
          top: `${w.top - E.top}px`,
          width: `${w.width}px`,
          height: `${w.height}px`,
          overflow: "visible"
        }), [...v.children].forEach((R) => {
          T && (R.style.fontSize = T), x && (R.style.alignItems = x), N.append(R);
        }), B.append(N), v.remove();
      });
    }), await ga();
    const d = o.map(({ wrapper: B }) => ({
      top: B.offsetTop,
      height: Math.max(1, B.offsetHeight)
    })), U = await (0, j0.default)(s, {
      backgroundColor: f,
      logging: !1,
      scale: h,
      useCORS: !0,
      width: c,
      height: Math.max(1, Math.ceil(s.scrollHeight)),
      windowWidth: c,
      onclone: async (B) => {
        const _ = B.defaultView?.FontFace;
        if (!_ || !B.fonts || !i) return;
        const E = new _(mt, i);
        await E.load(), B.fonts.add(E), await B.fonts.load(`32px "${mt}"`), await B.fonts.ready;
      }
    }), F = U.width / c;
    return new Map(o.map(({ figure: B }, _) => {
      const E = Math.round(d[_].top * F), v = Math.max(1, Math.round(d[_].height * F)), w = document.createElement("canvas");
      w.width = U.width, w.height = v;
      const b = w.getContext("2d", { alpha: !1 });
      b.fillStyle = f, b.fillRect(0, 0, w.width, w.height), b.drawImage(U, 0, E, U.width, v, 0, 0, w.width, v);
      const T = b.getImageData(0, 0, w.width, w.height).data;
      let x = w.width, N = w.height, R = -1, C = -1;
      for (let M = 0; M < w.height; M += 1) for (let I = 0; I < w.width; I += 1) {
        const Z = (M * w.width + I) * 4;
        Math.abs(T[Z] - 255) + Math.abs(T[Z + 1] - 254) + Math.abs(T[Z + 2] - 251) < 18 || (x = Math.min(x, I), N = Math.min(N, M), R = Math.max(R, I), C = Math.max(C, M));
      }
      if (R >= x && C >= N) {
        const M = Math.round(12 * F);
        x = Math.max(0, x - M), N = Math.max(0, N - M), R = Math.min(w.width - 1, R + M), C = Math.min(w.height - 1, C + M);
        const I = document.createElement("canvas");
        I.width = R - x + 1, I.height = C - N + 1, I.getContext("2d", { alpha: !1 }).drawImage(w, x, N, I.width, I.height, 0, 0, I.width, I.height), w.width = I.width, w.height = I.height, w.getContext("2d", { alpha: !1 }).drawImage(I, 0, 0);
      }
      let g = Math.min(Z0, $0), O = Math.max(1, Math.round(g * w.height / w.width));
      return O > ia && (g = Math.max(1, Math.round(g * ia / O)), O = ia), [B, {
        bytes: Ey(w.toDataURL("image/png")),
        height: O,
        width: g
      }];
    }));
  } finally {
    s.remove();
  }
}
function Uy(A) {
  const i = [], r = (c) => {
    [...c.children].forEach((h) => {
      if (!(h.hidden || h.closest("[hidden]"))) {
        if (h.matches(ny)) {
          i.push(h);
          return;
        }
        r(h);
      }
    });
  };
  return r(A), i;
}
function il(A, i, r, c) {
  A?.({
    completed: i,
    total: r,
    label: c
  });
}
function aa() {
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
function by(A, i) {
  if (/^H[1-6]$/.test(A[i - 1]?.tagName ?? "")) return !1;
  for (let r = i; r < A.length && /^H[1-6]$/.test(A[r].tagName); r += 1) if (A[r].tagName === "H2" || A[r].tagName === "H3") return !0;
  return !1;
}
function al(A, i) {
  let r = 0;
  for (let c = i - 1; c >= 0 && /^H[1-6]$/.test(A[c].tagName); c -= 1) r += 800;
  return r;
}
async function Ty(A, { title: i = "Sommaire", onProgress: r } = {}) {
  if (!(A instanceof Element)) throw new Error("Le Sommaire n’est pas disponible.");
  const c = Uy(A);
  if (!c.length) throw new Error("Le Sommaire filtré est vide.");
  const h = {
    chords: A.dataset.showChords !== "false",
    ratios: A.dataset.showRatios !== "false",
    tetrachords: A.dataset.showTetrachords !== "false",
    intervals: A.dataset.showIntervals !== "false"
  }, f = [], s = Fy(), o = c.filter((F) => F.classList.contains("summary-network-figure")), d = s.then((F) => Qy(o, F.find((B) => B.name === mt)?.data));
  for (let F = 0; F < c.length; F += 1) {
    const B = c[F];
    let _ = "contenu";
    if (/^H[1-6]$/.test(B.tagName)) {
      const E = by(c, F);
      f.push(ly(B, { explicitPageBreakBefore: E && f.length > 0 })), _ = "titres";
    } else if (B.classList.contains("summary-network-figure")) {
      const E = (await d).get(B);
      if (!E) throw new Error("Le graphique du réseau n’a pas pu être préparé.");
      f.push(new Le({
        children: [new xB({
          data: E.bytes,
          type: "png",
          transformation: {
            width: E.width,
            height: E.height
          },
          altText: {
            title: B.querySelector("figcaption")?.textContent?.trim() || i,
            description: B.querySelector("svg")?.getAttribute("aria-label") || i,
            name: `Graphique ${F + 1}`
          }
        })],
        alignment: fe.CENTER,
        keepLines: !0,
        spacing: {
          before: 0,
          after: 0
        }
      })), c[F + 1]?.classList.contains("summary-network-figure") && f.push(aa()), _ = "graphiques";
    } else if (B.classList.contains("summary-analysis-wrap")) {
      const E = B.querySelector(".summary-pattern-model");
      E && (f.push(yy(E, h, al(c, F))), F < c.length - 1 && f.push(aa())), _ = "tableaux détaillés";
    } else if (B.classList.contains("summary-synthesis-wrap")) {
      const E = B.querySelector("table");
      E && (f.push(cy(E, al(c, F))), F < c.length - 1 && f.push(aa())), _ = "tableaux de synthèse";
    } else {
      const E = c[F + 1];
      f.push(Hu(B, {
        keepNext: !!E?.matches(".summary-analysis-wrap, .summary-synthesis-wrap"),
        run: {
          color: "000000",
          font: tl,
          size: 24
        },
        spacing: {
          before: 0,
          after: 0,
          line: 276
        }
      }));
    }
    il(r, F + 1, c.length, _), (F + 1) % 20 === 0 && await ga();
  }
  const U = new B0({
    creator: "Harmonie naturelle",
    title: i,
    description: "Sommaire du réseau harmonique sélectionné",
    fonts: await s,
    styles: {
      default: {
        document: {
          run: {
            color: "000000",
            font: tl,
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
            font: Xr,
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
            font: Xr,
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
          font: at,
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
        run: { font: mt }
      }]
    },
    sections: [{
      properties: { page: {
        size: {
          width: _u,
          height: xu,
          orientation: Xn.PORTRAIT
        },
        margin: {
          top: da,
          right: fa,
          bottom: da,
          left: fa
        }
      } },
      children: f
    }]
  });
  return il(r, c.length, c.length, "création du fichier"), Fu.toBlob(U, !1, J0(U));
}
export {
  Ty as createSummaryDocx
};
