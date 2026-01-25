import { LitElement as b, html as n, css as f, isServer as S, nothing as h, render as Pr } from "lit";
function a(o, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(o, e, t, r);
  else for (var c = o.length - 1; c >= 0; c--) (l = o[c]) && (s = (i < 3 ? l(s) : i > 3 ? l(e, t, s) : l(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}
const _ = (o) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(o, e);
  }) : customElements.define(o, e);
};
const Ye = globalThis, Gt = Ye.ShadowRoot && (Ye.ShadyCSS === void 0 || Ye.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mr = /* @__PURE__ */ Symbol(), ur = /* @__PURE__ */ new WeakMap();
let _o = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Mr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Gt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = ur.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && ur.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const wo = (o) => new _o(typeof o == "string" ? o : o + "", void 0, Mr), $o = (o, e) => {
  if (Gt) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = Ye.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, o.appendChild(r);
  }
}, fr = Gt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return wo(t);
})(o) : o;
const { is: ko, defineProperty: Co, getOwnPropertyDescriptor: Eo, getOwnPropertyNames: Ao, getOwnPropertySymbols: To, getPrototypeOf: So } = Object, Qe = globalThis, vr = Qe.trustedTypes, Io = vr ? vr.emptyScript : "", zo = Qe.reactiveElementPolyfillSupport, Ce = (o, e) => o, Ge = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Io : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, Xt = (o, e) => !ko(o, e), mr = { attribute: !0, type: String, converter: Ge, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Qe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let we = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = mr) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Co(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = Eo(this.prototype, e) ?? { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: i, set(l) {
      const c = i?.call(this);
      s?.call(this, l), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? mr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ce("elementProperties"))) return;
    const e = So(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ce("properties"))) {
      const t = this.properties, r = [...Ao(t), ...To(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(fr(i));
    } else e !== void 0 && t.push(fr(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $o(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : Ge).toAttribute(t, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ge;
      this._$Em = i;
      const c = l.fromAttribute(t, s.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (s = this[e]), r ??= l.getPropertyOptions(e), !((r.hasChanged ?? Xt)(s, t) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: s }, l) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, l ?? t ?? this[e]), s !== !0 || l !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, s] of r) {
        const { wrapped: l } = s, c = this[i];
        l !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, s, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
we.elementStyles = [], we.shadowRootOptions = { mode: "open" }, we[Ce("elementProperties")] = /* @__PURE__ */ new Map(), we[Ce("finalized")] = /* @__PURE__ */ new Map(), zo?.({ ReactiveElement: we }), (Qe.reactiveElementVersions ??= []).push("2.1.2");
const Oo = { attribute: !0, type: String, converter: Ge, reflect: !1, hasChanged: Xt }, Ro = (o = Oo, e, t) => {
  const { kind: r, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((o = Object.create(o)).wrapped = !0), s.set(t.name, o), r === "accessor") {
    const { name: l } = t;
    return { set(c) {
      const p = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(l, p, o, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(l, void 0, o, c), c;
    } };
  }
  if (r === "setter") {
    const { name: l } = t;
    return function(c) {
      const p = this[l];
      e.call(this, c), this.requestUpdate(l, p, o, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function d(o) {
  return (e, t) => typeof t == "object" ? Ro(o, e, t) : ((r, i, s) => {
    const l = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), l ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(o, e, t);
}
function I(o) {
  return d({ ...o, state: !0, attribute: !1 });
}
const et = (o, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(o, e, t), t);
function w(o, e) {
  return (t, r, i) => {
    const s = (l) => l.renderRoot?.querySelector(o) ?? null;
    return et(t, r, { get() {
      return s(this);
    } });
  };
}
let Do;
function Lo(o) {
  return (e, t) => et(e, t, { get() {
    return (this.renderRoot ?? (Do ??= document.createDocumentFragment())).querySelectorAll(o);
  } });
}
function G(o) {
  return (e, t) => {
    const { slot: r, selector: i } = o ?? {}, s = "slot" + (r ? `[name=${r}]` : ":not([name])");
    return et(e, t, { get() {
      const l = this.renderRoot?.querySelector(s), c = l?.assignedElements(o) ?? [];
      return i === void 0 ? c : c.filter((p) => p.matches(i));
    } });
  };
}
function Fr(o) {
  return (e, t) => {
    const { slot: r } = o ?? {}, i = "slot" + (r ? `[name=${r}]` : ":not([name])");
    return et(e, t, { get() {
      return this.renderRoot?.querySelector(i)?.assignedNodes(o) ?? [];
    } });
  };
}
class Po extends b {
  render() {
    return n`<slot></slot>`;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.getAttribute("aria-hidden") === "false") {
      this.removeAttribute("aria-hidden");
      return;
    }
    this.setAttribute("aria-hidden", "true");
  }
}
const Mo = f`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;
let ht = class extends Po {
};
ht.styles = [Mo];
ht = a([
  _("md-icon")
], ht);
const Br = /* @__PURE__ */ Symbol("attachableController");
let Nr;
S || (Nr = new MutationObserver((o) => {
  for (const e of o)
    e.target[Br]?.hostConnected();
}));
class Ur {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(e) {
    e === null ? this.host.removeAttribute("for") : this.host.setAttribute("for", e);
  }
  get control() {
    return this.host.hasAttribute("for") ? !this.htmlFor || !this.host.isConnected ? null : this.host.getRootNode().querySelector(`#${this.htmlFor}`) : this.currentControl || this.host.parentElement;
  }
  set control(e) {
    e ? this.attach(e) : this.detach();
  }
  /**
   * Creates a new controller for an `Attachable` element.
   *
   * @param host The `Attachable` element.
   * @param onControlChange A callback with two parameters for the previous and
   *     next control. An `Attachable` element may perform setup or teardown
   *     logic whenever the control changes.
   */
  constructor(e, t) {
    this.host = e, this.onControlChange = t, this.currentControl = null, e.addController(this), e[Br] = this, Nr?.observe(e, { attributeFilter: ["for"] });
  }
  attach(e) {
    e !== this.currentControl && (this.setCurrentControl(e), this.host.removeAttribute("for"));
  }
  detach() {
    this.setCurrentControl(null), this.host.setAttribute("for", "");
  }
  /** @private */
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  /** @private */
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(e) {
    this.onControlChange(this.currentControl, e), this.currentControl = e;
  }
}
const Fo = ["focusin", "focusout", "pointerdown"];
class Zt extends b {
  constructor() {
    super(...arguments), this.visible = !1, this.inward = !1, this.attachableController = new Ur(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e) {
    this.attachableController.htmlFor = e;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e) {
    this.attachableController.control = e;
  }
  attach(e) {
    this.attachableController.attach(e);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  /** @private */
  handleEvent(e) {
    if (!e[br]) {
      switch (e.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? !1;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = !1;
          break;
      }
      e[br] = !0;
    }
  }
  onControlChange(e, t) {
    if (!S)
      for (const r of Fo)
        e?.removeEventListener(r, this), t?.addEventListener(r, this);
  }
  update(e) {
    e.has("visible") && this.dispatchEvent(new Event("visibility-changed")), super.update(e);
  }
}
a([
  d({ type: Boolean, reflect: !0 })
], Zt.prototype, "visible", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], Zt.prototype, "inward", void 0);
const br = /* @__PURE__ */ Symbol("handledByFocusRing");
const Bo = f`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;
let ut = class extends Zt {
};
ut.styles = [Bo];
ut = a([
  _("md-focus-ring")
], ut);
const Jt = globalThis, gr = (o) => o, Xe = Jt.trustedTypes, yr = Xe ? Xe.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Vr = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, Hr = "?" + ae, No = `<${Hr}>`, he = document, Ze = () => he.createComment(""), Ae = (o) => o === null || typeof o != "object" && typeof o != "function", Qt = Array.isArray, Uo = (o) => Qt(o) || typeof o?.[Symbol.iterator] == "function", st = `[ 	
\f\r]`, $e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xr = /-->/g, _r = />/g, ce = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wr = /'/g, $r = /"/g, qr = /^(?:script|style|textarea|title)$/i, Vo = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), Ho = Vo(1), K = /* @__PURE__ */ Symbol.for("lit-noChange"), L = /* @__PURE__ */ Symbol.for("lit-nothing"), kr = /* @__PURE__ */ new WeakMap(), pe = he.createTreeWalker(he, 129);
function Wr(o, e) {
  if (!Qt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yr !== void 0 ? yr.createHTML(e) : e;
}
const qo = (o, e) => {
  const t = o.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = $e;
  for (let c = 0; c < t; c++) {
    const p = o[c];
    let m, v, u = -1, g = 0;
    for (; g < p.length && (l.lastIndex = g, v = l.exec(p), v !== null); ) g = l.lastIndex, l === $e ? v[1] === "!--" ? l = xr : v[1] !== void 0 ? l = _r : v[2] !== void 0 ? (qr.test(v[2]) && (i = RegExp("</" + v[2], "g")), l = ce) : v[3] !== void 0 && (l = ce) : l === ce ? v[0] === ">" ? (l = i ?? $e, u = -1) : v[1] === void 0 ? u = -2 : (u = l.lastIndex - v[2].length, m = v[1], l = v[3] === void 0 ? ce : v[3] === '"' ? $r : wr) : l === $r || l === wr ? l = ce : l === xr || l === _r ? l = $e : (l = ce, i = void 0);
    const x = l === ce && o[c + 1].startsWith("/>") ? " " : "";
    s += l === $e ? p + No : u >= 0 ? (r.push(m), p.slice(0, u) + Vr + p.slice(u) + ae + x) : p + ae + (u === -2 ? c : x);
  }
  return [Wr(o, s + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Te {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, l = 0;
    const c = e.length - 1, p = this.parts, [m, v] = qo(e, t);
    if (this.el = Te.createElement(m, r), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = pe.nextNode()) !== null && p.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Vr)) {
          const g = v[l++], x = i.getAttribute(u).split(ae), E = /([.?@])?(.*)/.exec(g);
          p.push({ type: 1, index: s, name: E[2], strings: x, ctor: E[1] === "." ? jo : E[1] === "?" ? Ko : E[1] === "@" ? Yo : rt }), i.removeAttribute(u);
        } else u.startsWith(ae) && (p.push({ type: 6, index: s }), i.removeAttribute(u));
        if (qr.test(i.tagName)) {
          const u = i.textContent.split(ae), g = u.length - 1;
          if (g > 0) {
            i.textContent = Xe ? Xe.emptyScript : "";
            for (let x = 0; x < g; x++) i.append(u[x], Ze()), pe.nextNode(), p.push({ type: 2, index: ++s });
            i.append(u[g], Ze());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Hr) p.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(ae, u + 1)) !== -1; ) p.push({ type: 7, index: s }), u += ae.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = he.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ge(o, e, t = o, r) {
  if (e === K) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const s = Ae(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(o), i._$AT(o, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = ge(o, i._$AS(o, e.values), i, r)), e;
}
class Wo {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? he).importNode(t, !0);
    pe.currentNode = i;
    let s = pe.nextNode(), l = 0, c = 0, p = r[0];
    for (; p !== void 0; ) {
      if (l === p.index) {
        let m;
        p.type === 2 ? m = new tt(s, s.nextSibling, this, e) : p.type === 1 ? m = new p.ctor(s, p.name, p.strings, this, e) : p.type === 6 && (m = new Go(s, this, e)), this._$AV.push(m), p = r[++c];
      }
      l !== p?.index && (s = pe.nextNode(), l++);
    }
    return pe.currentNode = he, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ge(this, e, t), Ae(e) ? e === L || e == null || e === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : e !== this._$AH && e !== K && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Uo(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== L && Ae(this._$AH) ? this._$AA.nextSibling.data = e : this.T(he.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Te.createElement(Wr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const s = new Wo(i, this), l = s.u(this.options);
      s.p(t), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = kr.get(e.strings);
    return t === void 0 && kr.set(e.strings, t = new Te(e)), t;
  }
  k(e) {
    Qt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new tt(this.O(Ze()), this.O(Ze()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = gr(e).nextSibling;
      gr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = L, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = L;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = ge(this, e, t, 0), l = !Ae(e) || e !== this._$AH && e !== K, l && (this._$AH = e);
    else {
      const c = e;
      let p, m;
      for (e = s[0], p = 0; p < s.length - 1; p++) m = ge(this, c[r + p], t, p), m === K && (m = this._$AH[p]), l ||= !Ae(m) || m !== this._$AH[p], m === L ? e = L : e !== L && (e += (m ?? "") + s[p + 1]), this._$AH[p] = m;
    }
    l && !i && this.j(e);
  }
  j(e) {
    e === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class jo extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === L ? void 0 : e;
  }
}
class Ko extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== L);
  }
}
class Yo extends rt {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ge(this, e, t, 0) ?? L) === K) return;
    const r = this._$AH, i = e === L && r !== L || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== L && (r === L || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Go {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ge(this, e);
  }
}
const Xo = Jt.litHtmlPolyfillSupport;
Xo?.(Te, tt), (Jt.litHtmlVersions ??= []).push("3.3.2");
const ie = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, er = (o) => (...e) => ({ _$litDirective$: o, values: e });
let tr = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const H = er(class extends tr {
  constructor(o) {
    if (super(o), o.type !== ie.ATTRIBUTE || o.name !== "class" || o.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return " " + Object.keys(o).filter((e) => o[e]).join(" ") + " ";
  }
  update(o, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), o.strings !== void 0 && (this.nt = new Set(o.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in e) e[r] && !this.nt?.has(r) && this.st.add(r);
      return this.render(e);
    }
    const t = o.element.classList;
    for (const r of this.st) r in e || (t.remove(r), this.st.delete(r));
    for (const r in e) {
      const i = !!e[r];
      i === this.st.has(r) || this.nt?.has(r) || (i ? (t.add(r), this.st.add(r)) : (t.remove(r), this.st.delete(r)));
    }
    return K;
  }
});
const Y = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
  EMPHASIZED: "cubic-bezier(.3,0,0,1)",
  EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)"
};
function Zo() {
  let o = null;
  return {
    start() {
      return o?.abort(), o = new AbortController(), o.signal;
    },
    finish() {
      o = null;
    }
  };
}
const Jo = 450, Cr = 225, Qo = 0.2, ei = 10, ti = 75, ri = 0.35, oi = "::after", ii = "forwards";
var U;
(function(o) {
  o[o.INACTIVE = 0] = "INACTIVE", o[o.TOUCH_DELAY = 1] = "TOUCH_DELAY", o[o.HOLDING = 2] = "HOLDING", o[o.WAITING_FOR_CLICK = 3] = "WAITING_FOR_CLICK";
})(U || (U = {}));
const ai = [
  "click",
  "contextmenu",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointerup"
], si = 150, li = S ? null : window.matchMedia("(forced-colors: active)");
class ze extends b {
  constructor() {
    super(...arguments), this.disabled = !1, this.hovered = !1, this.pressed = !1, this.rippleSize = "", this.rippleScale = "", this.initialSize = 0, this.state = U.INACTIVE, this.attachableController = new Ur(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e) {
    this.attachableController.htmlFor = e;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e) {
    this.attachableController.control = e;
  }
  attach(e) {
    this.attachableController.attach(e);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    const e = {
      hovered: this.hovered,
      pressed: this.pressed
    };
    return n`<div class="surface ${H(e)}"></div>`;
  }
  update(e) {
    e.has("disabled") && this.disabled && (this.hovered = !1, this.pressed = !1), super.update(e);
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerenter(e) {
    this.shouldReactToEvent(e) && (this.hovered = !0);
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerleave(e) {
    this.shouldReactToEvent(e) && (this.hovered = !1, this.state !== U.INACTIVE && this.endPressAnimation());
  }
  handlePointerup(e) {
    if (this.shouldReactToEvent(e)) {
      if (this.state === U.HOLDING) {
        this.state = U.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === U.TOUCH_DELAY) {
        this.state = U.WAITING_FOR_CLICK, this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
  }
  async handlePointerdown(e) {
    if (this.shouldReactToEvent(e)) {
      if (this.rippleStartEvent = e, !this.isTouch(e)) {
        this.state = U.WAITING_FOR_CLICK, this.startPressAnimation(e);
        return;
      }
      this.state = U.TOUCH_DELAY, await new Promise((t) => {
        setTimeout(t, si);
      }), this.state === U.TOUCH_DELAY && (this.state = U.HOLDING, this.startPressAnimation(e));
    }
  }
  handleClick() {
    if (!this.disabled) {
      if (this.state === U.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      this.state === U.INACTIVE && (this.startPressAnimation(), this.endPressAnimation());
    }
  }
  handlePointercancel(e) {
    this.shouldReactToEvent(e) && this.endPressAnimation();
  }
  handleContextmenu() {
    this.disabled || this.endPressAnimation();
  }
  determineRippleSize() {
    const { height: e, width: t } = this.getBoundingClientRect(), r = Math.max(e, t), i = Math.max(ri * r, ti), s = this.currentCSSZoom ?? 1, l = Math.floor(r * Qo / s), p = Math.sqrt(t ** 2 + e ** 2) + ei;
    this.initialSize = l;
    const m = (p + i) / l;
    this.rippleScale = `${m / s}`, this.rippleSize = `${l}px`;
  }
  getNormalizedPointerEventCoords(e) {
    const { scrollX: t, scrollY: r } = window, { left: i, top: s } = this.getBoundingClientRect(), l = t + i, c = r + s, { pageX: p, pageY: m } = e, v = this.currentCSSZoom ?? 1;
    return {
      x: (p - l) / v,
      y: (m - c) / v
    };
  }
  getTranslationCoordinates(e) {
    const { height: t, width: r } = this.getBoundingClientRect(), i = this.currentCSSZoom ?? 1, s = {
      x: (r / i - this.initialSize) / 2,
      y: (t / i - this.initialSize) / 2
    };
    let l;
    return e instanceof PointerEvent ? l = this.getNormalizedPointerEventCoords(e) : l = {
      x: r / i / 2,
      y: t / i / 2
    }, l = {
      x: l.x - this.initialSize / 2,
      y: l.y - this.initialSize / 2
    }, { startPoint: l, endPoint: s };
  }
  startPressAnimation(e) {
    if (!this.mdRoot)
      return;
    this.pressed = !0, this.growAnimation?.cancel(), this.determineRippleSize();
    const { startPoint: t, endPoint: r } = this.getTranslationCoordinates(e), i = `${t.x}px, ${t.y}px`, s = `${r.x}px, ${r.y}px`;
    this.growAnimation = this.mdRoot.animate({
      top: [0, 0],
      left: [0, 0],
      height: [this.rippleSize, this.rippleSize],
      width: [this.rippleSize, this.rippleSize],
      transform: [
        `translate(${i}) scale(1)`,
        `translate(${s}) scale(${this.rippleScale})`
      ]
    }, {
      pseudoElement: oi,
      duration: Jo,
      easing: Y.STANDARD,
      fill: ii
    });
  }
  async endPressAnimation() {
    this.rippleStartEvent = void 0, this.state = U.INACTIVE;
    const e = this.growAnimation;
    let t = 1 / 0;
    if (typeof e?.currentTime == "number" ? t = e.currentTime : e?.currentTime && (t = e.currentTime.to("ms").value), t >= Cr) {
      this.pressed = !1;
      return;
    }
    await new Promise((r) => {
      setTimeout(r, Cr - t);
    }), this.growAnimation === e && (this.pressed = !1);
  }
  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  shouldReactToEvent(e) {
    if (this.disabled || !e.isPrimary || this.rippleStartEvent && this.rippleStartEvent.pointerId !== e.pointerId)
      return !1;
    if (e.type === "pointerenter" || e.type === "pointerleave")
      return !this.isTouch(e);
    const t = e.buttons === 1;
    return this.isTouch(e) || t;
  }
  isTouch({ pointerType: e }) {
    return e === "touch";
  }
  /** @private */
  async handleEvent(e) {
    if (!li?.matches)
      switch (e.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(e);
          break;
        case "pointerdown":
          await this.handlePointerdown(e);
          break;
        case "pointerenter":
          this.handlePointerenter(e);
          break;
        case "pointerleave":
          this.handlePointerleave(e);
          break;
        case "pointerup":
          this.handlePointerup(e);
          break;
      }
  }
  onControlChange(e, t) {
    if (!S)
      for (const r of ai)
        e?.removeEventListener(r, this), t?.addEventListener(r, this);
  }
}
a([
  d({ type: Boolean, reflect: !0 })
], ze.prototype, "disabled", void 0);
a([
  I()
], ze.prototype, "hovered", void 0);
a([
  I()
], ze.prototype, "pressed", void 0);
a([
  w(".surface")
], ze.prototype, "mdRoot", void 0);
const ni = f`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;
let ft = class extends ze {
};
ft.styles = [ni];
ft = a([
  _("md-ripple")
], ft);
const jr = [
  "role",
  "ariaAtomic",
  "ariaAutoComplete",
  "ariaBusy",
  "ariaChecked",
  "ariaColCount",
  "ariaColIndex",
  "ariaColSpan",
  "ariaCurrent",
  "ariaDisabled",
  "ariaExpanded",
  "ariaHasPopup",
  "ariaHidden",
  "ariaInvalid",
  "ariaKeyShortcuts",
  "ariaLabel",
  "ariaLevel",
  "ariaLive",
  "ariaModal",
  "ariaMultiLine",
  "ariaMultiSelectable",
  "ariaOrientation",
  "ariaPlaceholder",
  "ariaPosInSet",
  "ariaPressed",
  "ariaReadOnly",
  "ariaRequired",
  "ariaRoleDescription",
  "ariaRowCount",
  "ariaRowIndex",
  "ariaRowSpan",
  "ariaSelected",
  "ariaSetSize",
  "ariaSort",
  "ariaValueMax",
  "ariaValueMin",
  "ariaValueNow",
  "ariaValueText"
], di = jr.map(Kr);
function lt(o) {
  return di.includes(o);
}
function Kr(o) {
  return o.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
const Pe = /* @__PURE__ */ Symbol("privateIgnoreAttributeChangesFor");
function ee(o) {
  var e;
  if (S)
    return o;
  class t extends o {
    constructor() {
      super(...arguments), this[e] = /* @__PURE__ */ new Set();
    }
    attributeChangedCallback(i, s, l) {
      if (!lt(i)) {
        super.attributeChangedCallback(i, s, l);
        return;
      }
      if (this[Pe].has(i))
        return;
      this[Pe].add(i), this.removeAttribute(i), this[Pe].delete(i);
      const c = mt(i);
      l === null ? delete this.dataset[c] : this.dataset[c] = l, this.requestUpdate(mt(i), s);
    }
    getAttribute(i) {
      return lt(i) ? super.getAttribute(vt(i)) : super.getAttribute(i);
    }
    removeAttribute(i) {
      super.removeAttribute(i), lt(i) && (super.removeAttribute(vt(i)), this.requestUpdate());
    }
  }
  return e = Pe, ci(t), t;
}
function ci(o) {
  for (const e of jr) {
    const t = Kr(e), r = vt(t), i = mt(t);
    o.createProperty(e, {
      attribute: t,
      noAccessor: !0
    }), o.createProperty(Symbol(r), {
      attribute: r,
      noAccessor: !0
    }), Object.defineProperty(o.prototype, e, {
      configurable: !0,
      enumerable: !0,
      get() {
        return this.dataset[i] ?? null;
      },
      set(s) {
        const l = this.dataset[i] ?? null;
        s !== l && (s === null ? delete this.dataset[i] : this.dataset[i] = s, this.requestUpdate(e, l));
      }
    });
  }
}
function vt(o) {
  return `data-${o}`;
}
function mt(o) {
  return o.replace(/-\w/, (e) => e[1].toUpperCase());
}
const Yr = /* @__PURE__ */ Symbol("dispatchHooks");
function pi(o, e) {
  const t = o[Yr];
  if (!t)
    throw new Error(`'${o.type}' event needs setupDispatchHooks().`);
  t.addEventListener("after", e);
}
const Er = /* @__PURE__ */ new WeakMap();
function hi(o, ...e) {
  let t = Er.get(o);
  t || (t = /* @__PURE__ */ new Set(), Er.set(o, t));
  for (const r of e) {
    if (t.has(r))
      continue;
    let i = !1;
    o.addEventListener(r, (s) => {
      if (i)
        return;
      s.stopImmediatePropagation();
      const l = Reflect.construct(s.constructor, [
        s.type,
        s
      ]), c = new EventTarget();
      l[Yr] = c, i = !0;
      const p = o.dispatchEvent(l);
      i = !1, p || s.preventDefault(), c.dispatchEvent(new Event("after"));
    }, {
      // Ensure this listener runs before other listeners.
      // `setupDispatchHooks()` should be called in constructors to also
      // ensure they run before any other externally-added capture listeners.
      capture: !0
    }), t.add(r);
  }
}
function Gr(o) {
  const e = new MouseEvent("click", { bubbles: !0 });
  return o.dispatchEvent(e), e;
}
function Xr(o) {
  return o.currentTarget !== o.target || o.composedPath()[0] !== o.target || o.target.disabled ? !1 : !ui(o);
}
function ui(o) {
  const e = bt;
  return e && (o.preventDefault(), o.stopImmediatePropagation()), fi(), e;
}
let bt = !1;
async function fi() {
  bt = !0, await null, bt = !1;
}
function Oe(o, e) {
  e.bubbles && (!o.shadowRoot || e.composed) && e.stopPropagation();
  const t = Reflect.construct(e.constructor, [e.type, e]), r = o.dispatchEvent(t);
  return r || e.preventDefault(), r;
}
const V = /* @__PURE__ */ Symbol("internals"), nt = /* @__PURE__ */ Symbol("privateInternals");
function Re(o) {
  class e extends o {
    get [V]() {
      return this[nt] || (this[nt] = this.attachInternals()), this[nt];
    }
  }
  return e;
}
const Se = /* @__PURE__ */ Symbol("createValidator"), Ie = /* @__PURE__ */ Symbol("getValidityAnchor"), dt = /* @__PURE__ */ Symbol("privateValidator"), Q = /* @__PURE__ */ Symbol("privateSyncValidity"), Me = /* @__PURE__ */ Symbol("privateCustomValidationMessage");
function rr(o) {
  var e;
  class t extends o {
    constructor() {
      super(...arguments), this[e] = "";
    }
    get validity() {
      return this[Q](), this[V].validity;
    }
    get validationMessage() {
      return this[Q](), this[V].validationMessage;
    }
    get willValidate() {
      return this[Q](), this[V].willValidate;
    }
    checkValidity() {
      return this[Q](), this[V].checkValidity();
    }
    reportValidity() {
      return this[Q](), this[V].reportValidity();
    }
    setCustomValidity(i) {
      this[Me] = i, this[Q]();
    }
    requestUpdate(i, s, l) {
      super.requestUpdate(i, s, l), this[Q]();
    }
    firstUpdated(i) {
      super.firstUpdated(i), this[Q]();
    }
    [(e = Me, Q)]() {
      if (S)
        return;
      this[dt] || (this[dt] = this[Se]());
      const { validity: i, validationMessage: s } = this[dt].getValidity(), l = !!this[Me], c = this[Me] || s;
      this[V].setValidity({ ...i, customError: l }, c, this[Ie]() ?? void 0);
    }
    [Se]() {
      throw new Error("Implement [createValidator]");
    }
    [Ie]() {
      throw new Error("Implement [getValidityAnchor]");
    }
  }
  return t;
}
const be = /* @__PURE__ */ Symbol("getFormValue"), gt = /* @__PURE__ */ Symbol("getFormState");
function or(o) {
  class e extends o {
    get form() {
      return this[V].form;
    }
    get labels() {
      return this[V].labels;
    }
    // Use @property for the `name` and `disabled` properties to add them to the
    // `observedAttributes` array and trigger `attributeChangedCallback()`.
    //
    // We don't use Lit's default getter/setter (`noAccessor: true`) because
    // the attributes need to be updated synchronously to work with synchronous
    // form APIs, and Lit updates attributes async by default.
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(r) {
      this.setAttribute("name", r);
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(r) {
      this.toggleAttribute("disabled", r);
    }
    attributeChangedCallback(r, i, s) {
      if (r === "name" || r === "disabled") {
        const l = r === "disabled" ? i !== null : i;
        this.requestUpdate(r, l);
        return;
      }
      super.attributeChangedCallback(r, i, s);
    }
    requestUpdate(r, i, s) {
      super.requestUpdate(r, i, s), this[V].setFormValue(this[be](), this[gt]());
    }
    [be]() {
      throw new Error("Implement [getFormValue]");
    }
    [gt]() {
      return this[be]();
    }
    formDisabledCallback(r) {
      this.disabled = r;
    }
  }
  return e.formAssociated = !0, a([
    d({ noAccessor: !0 })
  ], e.prototype, "name", null), a([
    d({ type: Boolean, noAccessor: !0 })
  ], e.prototype, "disabled", null), e;
}
class ir {
  /**
   * Creates a new validator.
   *
   * @param getCurrentState A callback that returns the current state of
   *     constraint validation-related properties.
   */
  constructor(e) {
    this.getCurrentState = e, this.currentValidity = {
      validity: {},
      validationMessage: ""
    };
  }
  /**
   * Returns the current `ValidityStateFlags` and validation message for the
   * validator.
   *
   * If the constraint validation state has not changed, this will return a
   * cached result. This is important since `getValidity()` can be called
   * frequently in response to synchronous property changes.
   *
   * @return The current validity and validation message.
   */
  getValidity() {
    const e = this.getCurrentState();
    if (!(!this.prevState || !this.equals(this.prevState, e)))
      return this.currentValidity;
    const { validity: r, validationMessage: i } = this.computeValidity(e);
    return this.prevState = this.copy(e), this.currentValidity = {
      validationMessage: i,
      validity: {
        // Change any `ValidityState` instances into `ValidityStateFlags` since
        // `ValidityState` cannot be easily `{...spread}`.
        badInput: r.badInput,
        customError: r.customError,
        patternMismatch: r.patternMismatch,
        rangeOverflow: r.rangeOverflow,
        rangeUnderflow: r.rangeUnderflow,
        stepMismatch: r.stepMismatch,
        tooLong: r.tooLong,
        tooShort: r.tooShort,
        typeMismatch: r.typeMismatch,
        valueMissing: r.valueMissing
      }
    }, this.currentValidity;
  }
}
class vi extends ir {
  computeValidity(e) {
    return this.checkboxControl || (this.checkboxControl = document.createElement("input"), this.checkboxControl.type = "checkbox"), this.checkboxControl.checked = e.checked, this.checkboxControl.required = e.required, {
      validity: this.checkboxControl.validity,
      validationMessage: this.checkboxControl.validationMessage
    };
  }
  equals(e, t) {
    return e.checked === t.checked && e.required === t.required;
  }
  copy({ checked: e, required: t }) {
    return { checked: e, required: t };
  }
}
const mi = ee(rr(or(Re(b))));
class le extends mi {
  constructor() {
    super(), this.selected = !1, this.icons = !1, this.showOnlySelectedIcon = !1, this.required = !1, this.value = "on", !S && (this.addEventListener("click", (e) => {
      !Xr(e) || !this.input || (this.focus(), Gr(this.input));
    }), hi(this, "keydown"), this.addEventListener("keydown", (e) => {
      pi(e, () => {
        e.defaultPrevented || e.key !== "Enter" || this.disabled || !this.input || this.input.click();
      });
    }));
  }
  render() {
    return n`
      <div class="switch ${H(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel || h}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `;
  }
  getRenderClasses() {
    return {
      selected: this.selected,
      unselected: !this.selected,
      disabled: this.disabled
    };
  }
  renderHandle() {
    const e = {
      "with-icon": this.showOnlySelectedIcon ? this.selected : this.icons
    };
    return n`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${H(e)}">
          ${this.shouldShowIcons() ? this.renderIcons() : n``}
        </span>
      </span>
    `;
  }
  renderIcons() {
    return n`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? n`` : this.renderOffIcon()}
      </div>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOnIcon() {
    return n`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOffIcon() {
    return n`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `;
  }
  renderTouchTarget() {
    return n`<span class="touch"></span>`;
  }
  shouldShowIcons() {
    return this.icons || this.showOnlySelectedIcon;
  }
  handleInput(e) {
    const t = e.target;
    this.selected = t.checked;
  }
  handleChange(e) {
    Oe(this, e);
  }
  [be]() {
    return this.selected ? this.value : null;
  }
  [gt]() {
    return String(this.selected);
  }
  formResetCallback() {
    this.selected = this.hasAttribute("selected");
  }
  formStateRestoreCallback(e) {
    this.selected = e === "true";
  }
  [Se]() {
    return new vi(() => ({
      checked: this.selected,
      required: this.required
    }));
  }
  [Ie]() {
    return this.input;
  }
}
le.shadowRootOptions = {
  mode: "open",
  delegatesFocus: !0
};
a([
  d({ type: Boolean })
], le.prototype, "selected", void 0);
a([
  d({ type: Boolean })
], le.prototype, "icons", void 0);
a([
  d({ type: Boolean, attribute: "show-only-selected-icon" })
], le.prototype, "showOnlySelectedIcon", void 0);
a([
  d({ type: Boolean })
], le.prototype, "required", void 0);
a([
  d()
], le.prototype, "value", void 0);
a([
  w("input")
], le.prototype, "input", void 0);
const bi = f`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:max(100%,var(--md-switch-touch-target-size, 48px));outline:none;margin:0;position:absolute;width:max(100%,var(--md-switch-touch-target-size, 48px));z-index:1;cursor:inherit;top:50%;left:50%;transform:translate(-50%, -50%)}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`;
let yt = class extends le {
};
yt.styles = [bi];
yt = a([
  _("md-switch")
], yt);
class gi extends b {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    return n`<span class="shadow"></span>`;
  }
}
const yi = f`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;
let xt = class extends gi {
};
xt.styles = [yi];
xt = a([
  _("md-elevation")
], xt);
function Zr(o) {
  S || o.addInitializer((e) => {
    const t = e;
    t.addEventListener("click", async (r) => {
      const { type: i, [V]: s } = t, { form: l } = s;
      if (!(!l || i === "button") && (await new Promise((c) => {
        setTimeout(c);
      }), !r.defaultPrevented)) {
        if (i === "reset") {
          l.reset();
          return;
        }
        l.addEventListener("submit", (c) => {
          Object.defineProperty(c, "submitter", {
            configurable: !0,
            enumerable: !0,
            get: () => t
          });
        }, { capture: !0, once: !0 }), s.setFormValue(t.value), l.requestSubmit();
      }
    });
  });
}
const xi = ee(Re(b));
class M extends xi {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this[V].form;
  }
  constructor() {
    super(), this.disabled = !1, this.softDisabled = !1, this.href = "", this.download = "", this.target = "", this.trailingIcon = !1, this.hasIcon = !1, this.type = "submit", this.value = "", S || this.addEventListener("click", this.handleClick.bind(this));
  }
  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }
  render() {
    const e = this.disabled || this.softDisabled, t = this.href ? this.renderLink() : this.renderButton(), r = this.href ? "link" : "button";
    return n`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${r}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${r}
        ?disabled="${e}"></md-ripple>
      ${t}
    `;
  }
  renderButton() {
    const { ariaLabel: e, ariaHasPopup: t, ariaExpanded: r } = this;
    return n`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled || h}
      aria-label="${e || h}"
      aria-haspopup="${t || h}"
      aria-expanded="${r || h}">
      ${this.renderContent()}
    </button>`;
  }
  renderLink() {
    const { ariaLabel: e, ariaHasPopup: t, ariaExpanded: r } = this;
    return n`<a
      id="link"
      class="button"
      aria-label="${e || h}"
      aria-haspopup="${t || h}"
      aria-expanded="${r || h}"
      aria-disabled=${this.disabled || this.softDisabled || h}
      tabindex="${this.disabled && !this.softDisabled ? -1 : h}"
      href=${this.href}
      download=${this.download || h}
      target=${this.target || h}
      >${this.renderContent()}
    </a>`;
  }
  renderContent() {
    const e = n`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;
    return n`
      <span class="touch"></span>
      ${this.trailingIcon ? h : e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon ? e : h}
    `;
  }
  handleClick(e) {
    if (this.softDisabled || this.disabled && this.href) {
      e.stopImmediatePropagation(), e.preventDefault();
      return;
    }
    !Xr(e) || !this.buttonElement || (this.focus(), Gr(this.buttonElement));
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
Zr(M);
M.formAssociated = !0;
M.shadowRootOptions = {
  mode: "open",
  delegatesFocus: !0
};
a([
  d({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", void 0);
a([
  d({ type: Boolean, attribute: "soft-disabled", reflect: !0 })
], M.prototype, "softDisabled", void 0);
a([
  d()
], M.prototype, "href", void 0);
a([
  d()
], M.prototype, "download", void 0);
a([
  d()
], M.prototype, "target", void 0);
a([
  d({ type: Boolean, attribute: "trailing-icon", reflect: !0 })
], M.prototype, "trailingIcon", void 0);
a([
  d({ type: Boolean, attribute: "has-icon", reflect: !0 })
], M.prototype, "hasIcon", void 0);
a([
  d()
], M.prototype, "type", void 0);
a([
  d({ reflect: !0 })
], M.prototype, "value", void 0);
a([
  w(".button")
], M.prototype, "buttonElement", void 0);
a([
  G({ slot: "icon", flatten: !0 })
], M.prototype, "assignedIcons", void 0);
class _i extends M {
  renderElevationOrOutline() {
    return n`<md-elevation part="elevation"></md-elevation>`;
  }
}
const wi = f`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;
const $i = f`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;
const ar = f`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;
let _t = class extends _i {
};
_t.styles = [
  ar,
  $i,
  wi
];
_t = a([
  _("md-filled-button")
], _t);
class ki extends M {
  renderElevationOrOutline() {
    return n`<div class="outline"></div>`;
  }
}
const Ci = f`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;
let wt = class extends ki {
};
wt.styles = [ar, Ci];
wt = a([
  _("md-outlined-button")
], wt);
class Ei extends M {
}
const Ai = f`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;
let $t = class extends Ei {
};
$t.styles = [ar, Ai];
$t = a([
  _("md-text-button")
], $t);
const Jr = /* @__PURE__ */ Symbol.for(""), Ti = (o) => {
  if (o?.r === Jr) return o?._$litStatic$;
}, se = (o, ...e) => ({ _$litStatic$: e.reduce((t, r, i) => t + ((s) => {
  if (s._$litStatic$ !== void 0) return s._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(r) + o[i + 1], o[0]), r: Jr }), Ar = /* @__PURE__ */ new Map(), Si = (o) => (e, ...t) => {
  const r = t.length;
  let i, s;
  const l = [], c = [];
  let p, m = 0, v = !1;
  for (; m < r; ) {
    for (p = e[m]; m < r && (s = t[m], (i = Ti(s)) !== void 0); ) p += i + e[++m], v = !0;
    m !== r && c.push(s), l.push(p), m++;
  }
  if (m === r && l.push(e[r]), v) {
    const u = l.join("$$lit$$");
    (e = Ar.get(u)) === void 0 && (l.raw = l, Ar.set(u, e = l)), t = c;
  }
  return o(e, ...t);
}, sr = Si(Ho);
function Tr(o, e = !0) {
  return e && getComputedStyle(o).getPropertyValue("direction").trim() === "rtl";
}
const Ii = ee(Re(b));
class N extends Ii {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this[V].form;
  }
  /**
   * The labels this element is associated with.
   */
  get labels() {
    return this[V].labels;
  }
  constructor() {
    super(), this.disabled = !1, this.softDisabled = !1, this.flipIconInRtl = !1, this.href = "", this.download = "", this.target = "", this.ariaLabelSelected = "", this.toggle = !1, this.selected = !1, this.type = "submit", this.value = "", this.flipIcon = Tr(this, this.flipIconInRtl), S || this.addEventListener("click", this.handleClick.bind(this));
  }
  willUpdate() {
    this.href && (this.disabled = !1, this.softDisabled = !1);
  }
  render() {
    const e = this.href ? se`div` : se`button`, { ariaLabel: t, ariaHasPopup: r, ariaExpanded: i } = this, s = t && this.ariaLabelSelected, l = this.toggle ? this.selected : h;
    let c = h;
    return this.href || (c = s && this.selected ? this.ariaLabelSelected : t), sr`<${e}
        class="icon-button ${H(this.getRenderClasses())}"
        id="button"
        aria-label="${c || h}"
        aria-haspopup="${!this.href && r || h}"
        aria-expanded="${!this.href && i || h}"
        aria-pressed="${l}"
        aria-disabled=${!this.href && this.softDisabled || h}
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected ? h : this.renderIcon()}
        ${this.selected ? this.renderSelectedIcon() : h}
        ${this.href ? this.renderLink() : this.renderTouchTarget()}
  </${e}>`;
  }
  renderLink() {
    const { ariaLabel: e } = this;
    return n`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download || h}"
        target="${this.target || h}"
        aria-label="${e || h}">
        ${this.renderTouchTarget()}
      </a>
    `;
  }
  getRenderClasses() {
    return {
      "flip-icon": this.flipIcon,
      selected: this.toggle && this.selected
    };
  }
  renderIcon() {
    return n`<span class="icon"><slot></slot></span>`;
  }
  renderSelectedIcon() {
    return n`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`;
  }
  renderTouchTarget() {
    return n`<span class="touch"></span>`;
  }
  renderFocusRing() {
    return n`<md-focus-ring
      part="focus-ring"
      for=${this.href ? "link" : "button"}></md-focus-ring>`;
  }
  renderRipple() {
    const e = !this.href && (this.disabled || this.softDisabled);
    return n`<md-ripple
      for=${this.href ? "link" : h}
      ?disabled="${e}"></md-ripple>`;
  }
  connectedCallback() {
    this.flipIcon = Tr(this, this.flipIconInRtl), super.connectedCallback();
  }
  /** Handles a click on this element. */
  handleClick(e) {
    if (!this.href && this.softDisabled) {
      e.stopImmediatePropagation(), e.preventDefault();
      return;
    }
  }
  /**
   * Handles a click on the child <div> or <button> element within this
   * element's shadow DOM.
   */
  async handleClickOnChild(e) {
    await 0, !(!this.toggle || this.disabled || this.softDisabled || e.defaultPrevented) && (this.selected = !this.selected, this.dispatchEvent(new InputEvent("input", { bubbles: !0, composed: !0 })), this.dispatchEvent(new Event("change", { bubbles: !0 })));
  }
}
Zr(N);
N.formAssociated = !0;
N.shadowRootOptions = {
  mode: "open",
  delegatesFocus: !0
};
a([
  d({ type: Boolean, reflect: !0 })
], N.prototype, "disabled", void 0);
a([
  d({ type: Boolean, attribute: "soft-disabled", reflect: !0 })
], N.prototype, "softDisabled", void 0);
a([
  d({ type: Boolean, attribute: "flip-icon-in-rtl" })
], N.prototype, "flipIconInRtl", void 0);
a([
  d()
], N.prototype, "href", void 0);
a([
  d()
], N.prototype, "download", void 0);
a([
  d()
], N.prototype, "target", void 0);
a([
  d({ attribute: "aria-label-selected" })
], N.prototype, "ariaLabelSelected", void 0);
a([
  d({ type: Boolean })
], N.prototype, "toggle", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], N.prototype, "selected", void 0);
a([
  d()
], N.prototype, "type", void 0);
a([
  d({ reflect: !0 })
], N.prototype, "value", void 0);
a([
  I()
], N.prototype, "flipIcon", void 0);
const zi = f`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;
const Oi = f`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;
let kt = class extends N {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      standard: !0
    };
  }
};
kt.styles = [zi, Oi];
kt = a([
  _("md-icon-button")
], kt);
class T extends b {
  constructor() {
    super(...arguments), this.disabled = !1, this.error = !1, this.focused = !1, this.label = "", this.noAsterisk = !1, this.populated = !1, this.required = !1, this.resizable = !1, this.supportingText = "", this.errorText = "", this.count = -1, this.max = -1, this.hasStart = !1, this.hasEnd = !1, this.isAnimating = !1, this.refreshErrorAlert = !1, this.disableTransitions = !1;
  }
  get counterText() {
    const e = this.count ?? -1, t = this.max ?? -1;
    return e < 0 || t <= 0 ? "" : `${e} / ${t}`;
  }
  get supportingOrErrorText() {
    return this.error && this.errorText ? this.errorText : this.supportingText;
  }
  /**
   * Re-announces the field's error supporting text to screen readers.
   *
   * Error text announces to screen readers anytime it is visible and changes.
   * Use the method to re-announce the message when the text has not changed,
   * but announcement is still needed (such as for `reportValidity()`).
   */
  reannounceError() {
    this.refreshErrorAlert = !0;
  }
  update(e) {
    e.has("disabled") && e.get("disabled") !== void 0 && (this.disableTransitions = !0), this.disabled && this.focused && (e.set("focused", !0), this.focused = !1), this.animateLabelIfNeeded({
      wasFocused: e.get("focused"),
      wasPopulated: e.get("populated")
    }), super.update(e);
  }
  render() {
    const e = this.renderLabel(
      /*isFloating*/
      !0
    ), t = this.renderLabel(
      /*isFloating*/
      !1
    ), r = this.renderOutline?.(e), i = {
      disabled: this.disabled,
      "disable-transitions": this.disableTransitions,
      error: this.error && !this.disabled,
      focused: this.focused,
      "with-start": this.hasStart,
      "with-end": this.hasEnd,
      populated: this.populated,
      resizable: this.resizable,
      required: this.required,
      "no-label": !this.label
    };
    return n`
      <div class="field ${H(i)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${r}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${r ? h : e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
  }
  updated(e) {
    (e.has("supportingText") || e.has("errorText") || e.has("count") || e.has("max")) && this.updateSlottedAriaDescribedBy(), this.refreshErrorAlert && requestAnimationFrame(() => {
      this.refreshErrorAlert = !1;
    }), this.disableTransitions && requestAnimationFrame(() => {
      this.disableTransitions = !1;
    });
  }
  renderSupportingText() {
    const { supportingOrErrorText: e, counterText: t } = this;
    if (!e && !t)
      return h;
    const r = n`<span>${e}</span>`, i = t ? n`<span class="counter">${t}</span>` : h, l = this.error && this.errorText && !this.refreshErrorAlert ? "alert" : h;
    return n`
      <div class="supporting-text" role=${l}>${r}${i}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
  }
  updateSlottedAriaDescribedBy() {
    for (const e of this.slottedAriaDescribedBy)
      Pr(n`${this.supportingOrErrorText} ${this.counterText}`, e), e.setAttribute("hidden", "");
  }
  renderLabel(e) {
    if (!this.label)
      return h;
    let t;
    e ? t = this.focused || this.populated || this.isAnimating : t = !this.focused && !this.populated && !this.isAnimating;
    const r = {
      hidden: !t,
      floating: e,
      resting: !e
    }, i = `${this.label}${this.required && !this.noAsterisk ? "*" : ""}`;
    return n`
      <span class="label ${H(r)}" aria-hidden=${!t}
        >${i}</span
      >
    `;
  }
  animateLabelIfNeeded({ wasFocused: e, wasPopulated: t }) {
    if (!this.label)
      return;
    e ??= this.focused, t ??= this.populated;
    const r = e || t, i = this.focused || this.populated;
    r !== i && (this.isAnimating = !0, this.labelAnimation?.cancel(), this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: Y.STANDARD }), this.labelAnimation?.addEventListener("finish", () => {
      this.isAnimating = !1;
    }));
  }
  getLabelKeyframes() {
    const { floatingLabelEl: e, restingLabelEl: t } = this;
    if (!e || !t)
      return [];
    const { x: r, y: i, height: s } = e.getBoundingClientRect(), { x: l, y: c, height: p } = t.getBoundingClientRect(), m = e.scrollWidth, v = t.scrollWidth, u = v / m, g = l - r, x = c - i + Math.round((p - s * u) / 2), E = `translateX(${g}px) translateY(${x}px) scale(${u})`, $ = "translateX(0) translateY(0) scale(1)", A = t.clientWidth, k = v > A ? `${A / u}px` : "";
    return this.focused || this.populated ? [
      { transform: E, width: k },
      { transform: $, width: k }
    ] : [
      { transform: $, width: k },
      { transform: E, width: k }
    ];
  }
  getSurfacePositionClientRect() {
    return this.containerEl.getBoundingClientRect();
  }
}
a([
  d({ type: Boolean })
], T.prototype, "disabled", void 0);
a([
  d({ type: Boolean })
], T.prototype, "error", void 0);
a([
  d({ type: Boolean })
], T.prototype, "focused", void 0);
a([
  d()
], T.prototype, "label", void 0);
a([
  d({ type: Boolean, attribute: "no-asterisk" })
], T.prototype, "noAsterisk", void 0);
a([
  d({ type: Boolean })
], T.prototype, "populated", void 0);
a([
  d({ type: Boolean })
], T.prototype, "required", void 0);
a([
  d({ type: Boolean })
], T.prototype, "resizable", void 0);
a([
  d({ attribute: "supporting-text" })
], T.prototype, "supportingText", void 0);
a([
  d({ attribute: "error-text" })
], T.prototype, "errorText", void 0);
a([
  d({ type: Number })
], T.prototype, "count", void 0);
a([
  d({ type: Number })
], T.prototype, "max", void 0);
a([
  d({ type: Boolean, attribute: "has-start" })
], T.prototype, "hasStart", void 0);
a([
  d({ type: Boolean, attribute: "has-end" })
], T.prototype, "hasEnd", void 0);
a([
  G({ slot: "aria-describedby" })
], T.prototype, "slottedAriaDescribedBy", void 0);
a([
  I()
], T.prototype, "isAnimating", void 0);
a([
  I()
], T.prototype, "refreshErrorAlert", void 0);
a([
  I()
], T.prototype, "disableTransitions", void 0);
a([
  w(".label.floating")
], T.prototype, "floatingLabelEl", void 0);
a([
  w(".label.resting")
], T.prototype, "restingLabelEl", void 0);
a([
  w(".container")
], T.prototype, "containerEl", void 0);
class Ri extends T {
  renderBackground() {
    return n` <div class="background"></div> `;
  }
  renderStateLayer() {
    return n` <div class="state-layer"></div> `;
  }
  renderIndicator() {
    return n`<div class="active-indicator"></div>`;
  }
}
const Di = f`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;
const Qr = f`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;
let Ct = class extends Ri {
};
Ct.styles = [Qr, Di];
Ct = a([
  _("md-filled-field")
], Ct);
const Li = f`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;
const Pi = (o) => o.strings === void 0, Mi = {}, Fi = (o, e = Mi) => o._$AH = e;
const Sr = er(class extends tr {
  constructor(o) {
    if (super(o), o.type !== ie.PROPERTY && o.type !== ie.ATTRIBUTE && o.type !== ie.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Pi(o)) throw Error("`live` bindings can only contain a single expression");
  }
  render(o) {
    return o;
  }
  update(o, [e]) {
    if (e === K || e === L) return e;
    const t = o.element, r = o.name;
    if (o.type === ie.PROPERTY) {
      if (e === t[r]) return K;
    } else if (o.type === ie.BOOLEAN_ATTRIBUTE) {
      if (!!e === t.hasAttribute(r)) return K;
    } else if (o.type === ie.ATTRIBUTE && t.getAttribute(r) === e + "") return K;
    return Fi(o), e;
  }
});
const eo = "important", Bi = " !" + eo, ye = er(class extends tr {
  constructor(o) {
    if (super(o), o.type !== ie.ATTRIBUTE || o.name !== "style" || o.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return Object.keys(o).reduce((e, t) => {
      const r = o[t];
      return r == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(o, [e]) {
    const { style: t } = o.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? t.removeProperty(r) : t[r] = null);
    for (const r in e) {
      const i = e[r];
      if (i != null) {
        this.ft.add(r);
        const s = typeof i == "string" && i.endsWith(Bi);
        r.includes("-") || s ? t.setProperty(r, s ? i.slice(0, -11) : i, s ? eo : "") : t[r] = i;
      }
    }
    return K;
  }
});
const Ni = {
  fromAttribute(o) {
    return o ?? "";
  },
  toAttribute(o) {
    return o || null;
  }
};
const Je = /* @__PURE__ */ Symbol("onReportValidity"), Fe = /* @__PURE__ */ Symbol("privateCleanupFormListeners"), Be = /* @__PURE__ */ Symbol("privateDoNotReportInvalid"), Ne = /* @__PURE__ */ Symbol("privateIsSelfReportingValidity"), Ue = /* @__PURE__ */ Symbol("privateCallOnReportValidity");
function to(o) {
  var e, t, r;
  class i extends o {
    // Mixins must have a constructor with `...args: any[]`
    // tslint:disable-next-line:no-any
    constructor(...l) {
      super(...l), this[e] = new AbortController(), this[t] = !1, this[r] = !1, !S && this.addEventListener("invalid", (c) => {
        this[Be] || !c.isTrusted || this.addEventListener("invalid", () => {
          this[Ue](c);
        }, { once: !0 });
      }, {
        // Listen during the capture phase, which will happen before the
        // bubbling phase. That way, we can add a final event listener that
        // will run after other event listeners, and we can check if it was
        // default prevented. This works because invalid does not bubble.
        capture: !0
      });
    }
    checkValidity() {
      this[Be] = !0;
      const l = super.checkValidity();
      return this[Be] = !1, l;
    }
    reportValidity() {
      this[Ne] = !0;
      const l = super.reportValidity();
      return l && this[Ue](null), this[Ne] = !1, l;
    }
    [(e = Fe, t = Be, r = Ne, Ue)](l) {
      const c = l?.defaultPrevented;
      c || (this[Je](l), !(!c && l?.defaultPrevented)) || (this[Ne] || Hi(this[V].form, this)) && this.focus();
    }
    [Je](l) {
      throw new Error("Implement [onReportValidity]");
    }
    formAssociatedCallback(l) {
      super.formAssociatedCallback && super.formAssociatedCallback(l), this[Fe].abort(), l && (this[Fe] = new AbortController(), Ui(this, l, () => {
        this[Ue](null);
      }, this[Fe].signal));
    }
  }
  return i;
}
function Ui(o, e, t, r) {
  const i = Vi(e);
  let s = !1, l, c = !1;
  i.addEventListener("before", () => {
    c = !0, l = new AbortController(), s = !1, o.addEventListener("invalid", () => {
      s = !0;
    }, {
      signal: l.signal
    });
  }, { signal: r }), i.addEventListener("after", () => {
    c = !1, l?.abort(), !s && t();
  }, { signal: r }), e.addEventListener("submit", () => {
    c || t();
  }, {
    signal: r
  });
}
const ct = /* @__PURE__ */ new WeakMap();
function Vi(o) {
  if (!ct.has(o)) {
    const e = new EventTarget();
    ct.set(o, e);
    for (const t of ["reportValidity", "requestSubmit"]) {
      const r = o[t];
      o[t] = function() {
        e.dispatchEvent(new Event("before"));
        const i = Reflect.apply(r, this, arguments);
        return e.dispatchEvent(new Event("after")), i;
      };
    }
  }
  return ct.get(o);
}
function Hi(o, e) {
  if (!o)
    return !0;
  let t;
  for (const r of o.elements)
    if (r.matches(":invalid")) {
      t = r;
      break;
    }
  return t === e;
}
class qi extends ir {
  computeValidity({ state: e, renderedControl: t }) {
    let r = t;
    ke(e) && !r ? (r = this.inputControl || document.createElement("input"), this.inputControl = r) : r || (r = this.textAreaControl || document.createElement("textarea"), this.textAreaControl = r);
    const i = ke(e) ? r : null;
    if (i && (i.type = e.type), r.value !== e.value && (r.value = e.value), r.required = e.required, i) {
      const s = e;
      s.pattern ? i.pattern = s.pattern : i.removeAttribute("pattern"), s.min ? i.min = s.min : i.removeAttribute("min"), s.max ? i.max = s.max : i.removeAttribute("max"), s.step ? i.step = s.step : i.removeAttribute("step");
    }
    return (e.minLength ?? -1) > -1 ? r.setAttribute("minlength", String(e.minLength)) : r.removeAttribute("minlength"), (e.maxLength ?? -1) > -1 ? r.setAttribute("maxlength", String(e.maxLength)) : r.removeAttribute("maxlength"), {
      validity: r.validity,
      validationMessage: r.validationMessage
    };
  }
  equals({ state: e }, { state: t }) {
    const r = e.type === t.type && e.value === t.value && e.required === t.required && e.minLength === t.minLength && e.maxLength === t.maxLength;
    return !ke(e) || !ke(t) ? r : r && e.pattern === t.pattern && e.min === t.min && e.max === t.max && e.step === t.step;
  }
  copy({ state: e }) {
    return {
      state: ke(e) ? this.copyInput(e) : this.copyTextArea(e),
      renderedControl: null
    };
  }
  copyInput(e) {
    const { type: t, pattern: r, min: i, max: s, step: l } = e;
    return {
      ...this.copySharedState(e),
      type: t,
      pattern: r,
      min: i,
      max: s,
      step: l
    };
  }
  copyTextArea(e) {
    return {
      ...this.copySharedState(e),
      type: e.type
    };
  }
  copySharedState({ value: e, required: t, minLength: r, maxLength: i }) {
    return { value: e, required: t, minLength: r, maxLength: i };
  }
}
function ke(o) {
  return o.type !== "textarea";
}
const Wi = ee(to(rr(or(Re(b)))));
class y extends Wi {
  constructor() {
    super(...arguments), this.error = !1, this.errorText = "", this.label = "", this.noAsterisk = !1, this.required = !1, this.value = "", this.prefixText = "", this.suffixText = "", this.hasLeadingIcon = !1, this.hasTrailingIcon = !1, this.supportingText = "", this.textDirection = "", this.rows = 2, this.cols = 20, this.inputMode = "", this.max = "", this.maxLength = -1, this.min = "", this.minLength = -1, this.noSpinner = !1, this.pattern = "", this.placeholder = "", this.readOnly = !1, this.multiple = !1, this.step = "", this.type = "text", this.autocomplete = "", this.dirty = !1, this.focused = !1, this.nativeError = !1, this.nativeErrorText = "";
  }
  /**
   * Gets or sets the direction in which selection occurred.
   */
  get selectionDirection() {
    return this.getInputOrTextarea().selectionDirection;
  }
  set selectionDirection(e) {
    this.getInputOrTextarea().selectionDirection = e;
  }
  /**
   * Gets or sets the end position or offset of a text selection.
   */
  get selectionEnd() {
    return this.getInputOrTextarea().selectionEnd;
  }
  set selectionEnd(e) {
    this.getInputOrTextarea().selectionEnd = e;
  }
  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  get selectionStart() {
    return this.getInputOrTextarea().selectionStart;
  }
  set selectionStart(e) {
    this.getInputOrTextarea().selectionStart = e;
  }
  /**
   * The text field's value as a number.
   */
  get valueAsNumber() {
    const e = this.getInput();
    return e ? e.valueAsNumber : NaN;
  }
  set valueAsNumber(e) {
    const t = this.getInput();
    t && (t.valueAsNumber = e, this.value = t.value);
  }
  /**
   * The text field's value as a Date.
   */
  get valueAsDate() {
    const e = this.getInput();
    return e ? e.valueAsDate : null;
  }
  set valueAsDate(e) {
    const t = this.getInput();
    t && (t.valueAsDate = e, this.value = t.value);
  }
  get hasError() {
    return this.error || this.nativeError;
  }
  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   */
  select() {
    this.getInputOrTextarea().select();
  }
  setRangeText(...e) {
    this.getInputOrTextarea().setRangeText(...e), this.value = this.getInputOrTextarea().value;
  }
  /**
   * Sets the start and end positions of a selection in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
   *
   * @param start The offset into the text field for the start of the selection.
   * @param end The offset into the text field for the end of the selection.
   * @param direction The direction in which the selection is performed.
   */
  setSelectionRange(e, t, r) {
    this.getInputOrTextarea().setSelectionRange(e, t, r);
  }
  /**
   * Shows the browser picker for an input element of type "date", "time", etc.
   *
   * For a full list of supported types, see:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker#browser_compatibility
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
   */
  showPicker() {
    const e = this.getInput();
    e && e.showPicker();
  }
  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  stepDown(e) {
    const t = this.getInput();
    t && (t.stepDown(e), this.value = t.value);
  }
  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  stepUp(e) {
    const t = this.getInput();
    t && (t.stepUp(e), this.value = t.value);
  }
  /**
   * Reset the text field to its default value.
   */
  reset() {
    this.dirty = !1, this.value = this.getAttribute("value") ?? "", this.nativeError = !1, this.nativeErrorText = "";
  }
  attributeChangedCallback(e, t, r) {
    e === "value" && this.dirty || super.attributeChangedCallback(e, t, r);
  }
  render() {
    const e = {
      disabled: this.disabled,
      error: !this.disabled && this.hasError,
      textarea: this.type === "textarea",
      "no-spinner": this.noSpinner
    };
    return n`
      <span class="text-field ${H(e)}">
        ${this.renderField()}
      </span>
    `;
  }
  updated(e) {
    const t = this.getInputOrTextarea().value;
    this.value !== t && (this.value = t);
  }
  renderField() {
    return sr`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type === "textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`;
  }
  renderLeadingIcon() {
    return n`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderTrailingIcon() {
    return n`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderInputOrTextarea() {
    const e = { direction: this.textDirection }, t = this.ariaLabel || this.label || h, r = this.autocomplete, i = (this.maxLength ?? -1) > -1, s = (this.minLength ?? -1) > -1;
    if (this.type === "textarea")
      return n`
        <textarea
          class="input"
          style=${ye(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r || h}
          name=${this.name || h}
          ?disabled=${this.disabled}
          maxlength=${i ? this.maxLength : h}
          minlength=${s ? this.minLength : h}
          placeholder=${this.placeholder || h}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${Sr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
    const l = this.renderPrefix(), c = this.renderSuffix(), p = this.inputMode;
    return n`
      <div class="input-wrapper">
        ${l}
        <input
          class="input"
          style=${ye(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${r || h}
          name=${this.name || h}
          ?disabled=${this.disabled}
          inputmode=${p || h}
          max=${this.max || h}
          maxlength=${i ? this.maxLength : h}
          min=${this.min || h}
          minlength=${s ? this.minLength : h}
          pattern=${this.pattern || h}
          placeholder=${this.placeholder || h}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step || h}
          type=${this.type}
          .value=${Sr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${c}
      </div>
    `;
  }
  renderPrefix() {
    return this.renderAffix(
      this.prefixText,
      /* isSuffix */
      !1
    );
  }
  renderSuffix() {
    return this.renderAffix(
      this.suffixText,
      /* isSuffix */
      !0
    );
  }
  renderAffix(e, t) {
    return e ? n`<span class="${H({
      suffix: t,
      prefix: !t
    })}">${e}</span>` : h;
  }
  getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }
  handleFocusChange() {
    this.focused = this.inputOrTextarea?.matches(":focus") ?? !1;
  }
  handleInput(e) {
    this.dirty = !0, this.value = e.target.value;
  }
  redispatchEvent(e) {
    Oe(this, e);
  }
  getInputOrTextarea() {
    return this.inputOrTextarea || (this.connectedCallback(), this.scheduleUpdate()), this.isUpdatePending && this.scheduleUpdate(), this.inputOrTextarea;
  }
  getInput() {
    return this.type === "textarea" ? null : this.getInputOrTextarea();
  }
  handleIconChange() {
    this.hasLeadingIcon = this.leadingIcons.length > 0, this.hasTrailingIcon = this.trailingIcons.length > 0;
  }
  [be]() {
    return this.value;
  }
  formResetCallback() {
    this.reset();
  }
  formStateRestoreCallback(e) {
    this.value = e;
  }
  focus() {
    this.getInputOrTextarea().focus();
  }
  [Se]() {
    return new qi(() => ({
      state: this,
      renderedControl: this.inputOrTextarea
    }));
  }
  [Ie]() {
    return this.inputOrTextarea;
  }
  [Je](e) {
    e?.preventDefault();
    const t = this.getErrorText();
    this.nativeError = !!e, this.nativeErrorText = this.validationMessage, t === this.getErrorText() && this.field?.reannounceError();
  }
}
y.shadowRootOptions = {
  ...b.shadowRootOptions,
  delegatesFocus: !0
};
a([
  d({ type: Boolean, reflect: !0 })
], y.prototype, "error", void 0);
a([
  d({ attribute: "error-text" })
], y.prototype, "errorText", void 0);
a([
  d()
], y.prototype, "label", void 0);
a([
  d({ type: Boolean, attribute: "no-asterisk" })
], y.prototype, "noAsterisk", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], y.prototype, "required", void 0);
a([
  d()
], y.prototype, "value", void 0);
a([
  d({ attribute: "prefix-text" })
], y.prototype, "prefixText", void 0);
a([
  d({ attribute: "suffix-text" })
], y.prototype, "suffixText", void 0);
a([
  d({ type: Boolean, attribute: "has-leading-icon" })
], y.prototype, "hasLeadingIcon", void 0);
a([
  d({ type: Boolean, attribute: "has-trailing-icon" })
], y.prototype, "hasTrailingIcon", void 0);
a([
  d({ attribute: "supporting-text" })
], y.prototype, "supportingText", void 0);
a([
  d({ attribute: "text-direction" })
], y.prototype, "textDirection", void 0);
a([
  d({ type: Number })
], y.prototype, "rows", void 0);
a([
  d({ type: Number })
], y.prototype, "cols", void 0);
a([
  d({ reflect: !0 })
], y.prototype, "inputMode", void 0);
a([
  d()
], y.prototype, "max", void 0);
a([
  d({ type: Number })
], y.prototype, "maxLength", void 0);
a([
  d()
], y.prototype, "min", void 0);
a([
  d({ type: Number })
], y.prototype, "minLength", void 0);
a([
  d({ type: Boolean, attribute: "no-spinner" })
], y.prototype, "noSpinner", void 0);
a([
  d()
], y.prototype, "pattern", void 0);
a([
  d({ reflect: !0, converter: Ni })
], y.prototype, "placeholder", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], y.prototype, "readOnly", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], y.prototype, "multiple", void 0);
a([
  d()
], y.prototype, "step", void 0);
a([
  d({ reflect: !0 })
], y.prototype, "type", void 0);
a([
  d({ reflect: !0 })
], y.prototype, "autocomplete", void 0);
a([
  I()
], y.prototype, "dirty", void 0);
a([
  I()
], y.prototype, "focused", void 0);
a([
  I()
], y.prototype, "nativeError", void 0);
a([
  I()
], y.prototype, "nativeErrorText", void 0);
a([
  w(".input")
], y.prototype, "inputOrTextarea", void 0);
a([
  w(".field")
], y.prototype, "field", void 0);
a([
  G({ slot: "leading-icon" })
], y.prototype, "leadingIcons", void 0);
a([
  G({ slot: "trailing-icon" })
], y.prototype, "trailingIcons", void 0);
class ji extends y {
  constructor() {
    super(...arguments), this.fieldTag = se`md-filled-field`;
  }
}
const ro = f`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;
let Et = class extends ji {
  constructor() {
    super(...arguments), this.fieldTag = se`md-filled-field`;
  }
};
Et.styles = [ro, Li];
Et = a([
  _("md-filled-text-field")
], Et);
class Ki extends T {
  renderOutline(e) {
    return n`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${e}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
  }
}
const Yi = f`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;
let At = class extends Ki {
};
At.styles = [Qr, Yi];
At = a([
  _("md-outlined-field")
], At);
const Gi = f`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;
class Xi extends y {
  constructor() {
    super(...arguments), this.fieldTag = se`md-outlined-field`;
  }
}
let Tt = class extends Xi {
  constructor() {
    super(...arguments), this.fieldTag = se`md-outlined-field`;
  }
};
Tt.styles = [ro, Gi];
Tt = a([
  _("md-outlined-text-field")
], Tt);
function oo(o, e = te) {
  const t = lr(o, e);
  return t && (t.tabIndex = 0, t.focus()), t;
}
function io(o, e = te) {
  const t = ao(o, e);
  return t && (t.tabIndex = 0, t.focus()), t;
}
function Ee(o, e = te) {
  for (let t = 0; t < o.length; t++) {
    const r = o[t];
    if (r.tabIndex === 0 && e(r))
      return {
        item: r,
        index: t
      };
  }
  return null;
}
function lr(o, e = te) {
  for (const t of o)
    if (e(t))
      return t;
  return null;
}
function ao(o, e = te) {
  for (let t = o.length - 1; t >= 0; t--) {
    const r = o[t];
    if (e(r))
      return r;
  }
  return null;
}
function Zi(o, e, t = te, r = !0) {
  for (let i = 1; i < o.length; i++) {
    const s = (i + e) % o.length;
    if (s < e && !r)
      return null;
    const l = o[s];
    if (t(l))
      return l;
  }
  return o[e] ? o[e] : null;
}
function Ji(o, e, t = te, r = !0) {
  for (let i = 1; i < o.length; i++) {
    const s = (e - i + o.length) % o.length;
    if (s > e && !r)
      return null;
    const l = o[s];
    if (t(l))
      return l;
  }
  return o[e] ? o[e] : null;
}
function Ir(o, e, t = te, r = !0) {
  if (e) {
    const i = Zi(o, e.index, t, r);
    return i && (i.tabIndex = 0, i.focus()), i;
  } else
    return oo(o, t);
}
function zr(o, e, t = te, r = !0) {
  if (e) {
    const i = Ji(o, e.index, t, r);
    return i && (i.tabIndex = 0, i.focus()), i;
  } else
    return io(o, t);
}
function te(o) {
  return !o.disabled;
}
const B = {
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  Home: "Home",
  End: "End"
};
class Qi {
  constructor(e) {
    this.handleKeydown = (v) => {
      const u = v.key;
      if (v.defaultPrevented || !this.isNavigableKey(u))
        return;
      const g = this.items;
      if (!g.length)
        return;
      const x = Ee(g, this.isActivatable);
      v.preventDefault();
      const E = this.isRtl(), $ = E ? B.ArrowRight : B.ArrowLeft, A = E ? B.ArrowLeft : B.ArrowRight;
      let R = null;
      switch (u) {
        // Activate the next item
        case B.ArrowDown:
        case A:
          R = Ir(g, x, this.isActivatable, this.wrapNavigation());
          break;
        // Activate the previous item
        case B.ArrowUp:
        case $:
          R = zr(g, x, this.isActivatable, this.wrapNavigation());
          break;
        // Activate the first item
        case B.Home:
          R = oo(g, this.isActivatable);
          break;
        // Activate the last item
        case B.End:
          R = io(g, this.isActivatable);
          break;
      }
      R && x && x.item !== R && (x.item.tabIndex = -1);
    }, this.onDeactivateItems = () => {
      const v = this.items;
      for (const u of v)
        this.deactivateItem(u);
    }, this.onRequestActivation = (v) => {
      this.onDeactivateItems();
      const u = v.target;
      this.activateItem(u), u.focus();
    }, this.onSlotchange = () => {
      const v = this.items;
      let u = !1;
      for (const x of v) {
        if (!x.disabled && x.tabIndex > -1 && !u) {
          u = !0, x.tabIndex = 0;
          continue;
        }
        x.tabIndex = -1;
      }
      if (u)
        return;
      const g = lr(v, this.isActivatable);
      g && (g.tabIndex = 0);
    };
    const { isItem: t, getPossibleItems: r, isRtl: i, deactivateItem: s, activateItem: l, isNavigableKey: c, isActivatable: p, wrapNavigation: m } = e;
    this.isItem = t, this.getPossibleItems = r, this.isRtl = i, this.deactivateItem = s, this.activateItem = l, this.isNavigableKey = c, this.isActivatable = p, this.wrapNavigation = m ?? (() => !0);
  }
  /**
   * The items being managed by the list. Additionally, attempts to see if the
   * object has a sub-item in the `.item` property.
   */
  get items() {
    const e = this.getPossibleItems(), t = [];
    for (const r of e) {
      if (this.isItem(r)) {
        t.push(r);
        continue;
      }
      const s = r.item;
      s && this.isItem(s) && t.push(s);
    }
    return t;
  }
  /**
   * Activates the next item in the list. If at the end of the list, the first
   * item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activateNextItem() {
    const e = this.items, t = Ee(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), Ir(e, t, this.isActivatable, this.wrapNavigation());
  }
  /**
   * Activates the previous item in the list. If at the start of the list, the
   * last item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activatePreviousItem() {
    const e = this.items, t = Ee(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), zr(e, t, this.isActivatable, this.wrapNavigation());
  }
}
function ea(o, e) {
  return new CustomEvent("close-menu", {
    bubbles: !0,
    composed: !0,
    detail: { initiator: o, reason: e, itemPath: [o] }
  });
}
const Or = ea, St = {
  SPACE: "Space",
  ENTER: "Enter"
}, Rr = {
  CLICK_SELECTION: "click-selection",
  KEYDOWN: "keydown"
}, ta = {
  ESCAPE: "Escape",
  SPACE: St.SPACE,
  ENTER: St.ENTER
};
function so(o) {
  return Object.values(ta).some((e) => e === o);
}
function ra(o) {
  return Object.values(St).some((e) => e === o);
}
function It(o, e) {
  const t = new Event("md-contains", { bubbles: !0, composed: !0 });
  let r = [];
  const i = (l) => {
    r = l.composedPath();
  };
  return e.addEventListener("md-contains", i), o.dispatchEvent(t), e.removeEventListener("md-contains", i), r.length > 0;
}
const j = {
  NONE: "none",
  LIST_ROOT: "list-root",
  FIRST_ITEM: "first-item",
  LAST_ITEM: "last-item"
};
const Dr = {
  END_START: "end-start",
  START_START: "start-start"
};
class oa {
  /**
   * @param host The host to connect the controller to.
   * @param getProperties A function that returns the properties for the
   * controller.
   */
  constructor(e, t) {
    this.host = e, this.getProperties = t, this.surfaceStylesInternal = {
      display: "none"
    }, this.lastValues = {
      isOpen: !1
    }, this.host.addController(this);
  }
  /**
   * The StyleInfo map to apply to the surface via Lit's stylemap
   */
  get surfaceStyles() {
    return this.surfaceStylesInternal;
  }
  /**
   * Calculates the surface's new position required so that the surface's
   * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
   * surface inside the window viewport. This positioning also respects RTL by
   * checking `getComputedStyle()` on the surface element.
   */
  async position() {
    const { surfaceEl: e, anchorEl: t, anchorCorner: r, surfaceCorner: i, positioning: s, xOffset: l, yOffset: c, disableBlockFlip: p, disableInlineFlip: m, repositionStrategy: v } = this.getProperties(), u = r.toLowerCase().trim(), g = i.toLowerCase().trim();
    if (!e || !t)
      return;
    const x = window.innerWidth, E = window.innerHeight, $ = document.createElement("div");
    $.style.opacity = "0", $.style.position = "fixed", $.style.display = "block", $.style.inset = "0", document.body.appendChild($);
    const A = $.getBoundingClientRect();
    $.remove();
    const R = window.innerHeight - A.bottom, k = window.innerWidth - A.right;
    this.surfaceStylesInternal = {
      display: "block",
      opacity: "0"
    }, this.host.requestUpdate(), await this.host.updateComplete, e.popover && e.isConnected && e.showPopover();
    const P = e.getSurfacePositionClientRect ? e.getSurfacePositionClientRect() : e.getBoundingClientRect(), F = t.getSurfacePositionClientRect ? t.getSurfacePositionClientRect() : t.getBoundingClientRect(), [D, re] = g.split("-"), [oe, de] = u.split("-"), De = getComputedStyle(e).direction === "ltr";
    let { blockInset: ve, blockOutOfBoundsCorrection: Z, surfaceBlockProperty: pr } = this.calculateBlock({
      surfaceRect: P,
      anchorRect: F,
      anchorBlock: oe,
      surfaceBlock: D,
      yOffset: c,
      positioning: s,
      windowInnerHeight: E,
      blockScrollbarHeight: R
    });
    if (Z && !p) {
      const it = D === "start" ? "end" : "start", at = oe === "start" ? "end" : "start", J = this.calculateBlock({
        surfaceRect: P,
        anchorRect: F,
        anchorBlock: at,
        surfaceBlock: it,
        yOffset: c,
        positioning: s,
        windowInnerHeight: E,
        blockScrollbarHeight: R
      });
      Z > J.blockOutOfBoundsCorrection && (ve = J.blockInset, Z = J.blockOutOfBoundsCorrection, pr = J.surfaceBlockProperty);
    }
    let { inlineInset: Le, inlineOutOfBoundsCorrection: me, surfaceInlineProperty: hr } = this.calculateInline({
      surfaceRect: P,
      anchorRect: F,
      anchorInline: de,
      surfaceInline: re,
      xOffset: l,
      positioning: s,
      isLTR: De,
      windowInnerWidth: x,
      inlineScrollbarWidth: k
    });
    if (me && !m) {
      const it = re === "start" ? "end" : "start", at = de === "start" ? "end" : "start", J = this.calculateInline({
        surfaceRect: P,
        anchorRect: F,
        anchorInline: at,
        surfaceInline: it,
        xOffset: l,
        positioning: s,
        isLTR: De,
        windowInnerWidth: x,
        inlineScrollbarWidth: k
      });
      Math.abs(me) > Math.abs(J.inlineOutOfBoundsCorrection) && (Le = J.inlineInset, me = J.inlineOutOfBoundsCorrection, hr = J.surfaceInlineProperty);
    }
    v === "move" && (ve = ve - Z, Le = Le - me), this.surfaceStylesInternal = {
      display: "block",
      opacity: "1",
      [pr]: `${ve}px`,
      [hr]: `${Le}px`
    }, v === "resize" && (Z && (this.surfaceStylesInternal.height = `${P.height - Z}px`), me && (this.surfaceStylesInternal.width = `${P.width - me}px`)), this.host.requestUpdate();
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the block direction.
   */
  calculateBlock(e) {
    const { surfaceRect: t, anchorRect: r, anchorBlock: i, surfaceBlock: s, yOffset: l, positioning: c, windowInnerHeight: p, blockScrollbarHeight: m } = e, v = c === "fixed" || c === "document" ? 1 : 0, u = c === "document" ? 1 : 0, g = s === "start" ? 1 : 0, x = s === "end" ? 1 : 0, $ = (i !== s ? 1 : 0) * r.height + l, A = g * r.top + x * (p - r.bottom - m), R = g * window.scrollY - x * window.scrollY, k = Math.abs(Math.min(0, p - A - $ - t.height));
    return { blockInset: v * A + u * R + $, blockOutOfBoundsCorrection: k, surfaceBlockProperty: s === "start" ? "inset-block-start" : "inset-block-end" };
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the inline direction.
   */
  calculateInline(e) {
    const { isLTR: t, surfaceInline: r, anchorInline: i, anchorRect: s, surfaceRect: l, xOffset: c, positioning: p, windowInnerWidth: m, inlineScrollbarWidth: v } = e, u = p === "fixed" || p === "document" ? 1 : 0, g = p === "document" ? 1 : 0, x = t ? 1 : 0, E = t ? 0 : 1, $ = r === "start" ? 1 : 0, A = r === "end" ? 1 : 0, k = (i !== r ? 1 : 0) * s.width + c, P = $ * s.left + A * (m - s.right - v), F = $ * (m - s.right - v) + A * s.left, D = x * P + E * F, re = $ * window.scrollX - A * window.scrollX, oe = A * window.scrollX - $ * window.scrollX, de = x * re + E * oe, De = Math.abs(Math.min(0, m - D - k - l.width)), ve = u * D + k + g * de;
    let Z = r === "start" ? "inset-inline-start" : "inset-inline-end";
    return (p === "document" || p === "fixed") && (r === "start" && t || r === "end" && !t ? Z = "left" : Z = "right"), {
      inlineInset: ve,
      inlineOutOfBoundsCorrection: De,
      surfaceInlineProperty: Z
    };
  }
  hostUpdate() {
    this.onUpdate();
  }
  hostUpdated() {
    this.onUpdate();
  }
  /**
   * Checks whether the properties passed into the controller have changed since
   * the last positioning. If so, it will reposition if the surface is open or
   * close it if the surface should close.
   */
  async onUpdate() {
    const e = this.getProperties();
    let t = !1;
    for (const [l, c] of Object.entries(e))
      if (t = t || c !== this.lastValues[l], t)
        break;
    const r = this.lastValues.isOpen !== e.isOpen, i = !!e.anchorEl, s = !!e.surfaceEl;
    t && i && s && (this.lastValues.isOpen = e.isOpen, e.isOpen ? (this.lastValues = e, await this.position(), e.onOpen()) : r && (await e.beforeClose(), this.close(), e.onClose()));
  }
  /**
   * Hides the surface.
   */
  close() {
    this.surfaceStylesInternal = {
      display: "none"
    }, this.host.requestUpdate();
    const e = this.getProperties().surfaceEl;
    e?.popover && e?.isConnected && e.hidePopover();
  }
}
const q = {
  INDEX: 0,
  ITEM: 1,
  TEXT: 2
};
class ia {
  /**
   * @param getProperties A function that returns the options of the typeahead
   * controller:
   *
   * {
   *   getItems: A function that returns an array of menu items to be searched.
   *   typeaheadBufferTime: The maximum time between each keystroke to keep the
   *       current type buffer alive.
   * }
   */
  constructor(e) {
    this.getProperties = e, this.typeaheadRecords = [], this.typaheadBuffer = "", this.cancelTypeaheadTimeout = 0, this.isTypingAhead = !1, this.lastActiveRecord = null, this.onKeydown = (t) => {
      this.isTypingAhead ? this.typeahead(t) : this.beginTypeahead(t);
    }, this.endTypeahead = () => {
      this.isTypingAhead = !1, this.typaheadBuffer = "", this.typeaheadRecords = [];
    };
  }
  get items() {
    return this.getProperties().getItems();
  }
  get active() {
    return this.getProperties().active;
  }
  /**
   * Sets up typingahead
   */
  beginTypeahead(e) {
    this.active && (e.code === "Space" || e.code === "Enter" || e.code.startsWith("Arrow") || e.code === "Escape" || (this.isTypingAhead = !0, this.typeaheadRecords = this.items.map((t, r) => [
      r,
      t,
      t.typeaheadText.trim().toLowerCase()
    ]), this.lastActiveRecord = this.typeaheadRecords.find((t) => t[q.ITEM].tabIndex === 0) ?? null, this.lastActiveRecord && (this.lastActiveRecord[q.ITEM].tabIndex = -1), this.typeahead(e)));
  }
  /**
   * Performs the typeahead. Based on the normalized items and the current text
   * buffer, finds the _next_ item with matching text and activates it.
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: 'o'
   * user types: l
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Orange
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange (active), Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   */
  typeahead(e) {
    if (e.defaultPrevented)
      return;
    if (clearTimeout(this.cancelTypeaheadTimeout), e.code === "Enter" || e.code.startsWith("Arrow") || e.code === "Escape") {
      this.endTypeahead(), this.lastActiveRecord && (this.lastActiveRecord[q.ITEM].tabIndex = -1);
      return;
    }
    e.code === "Space" && e.preventDefault(), this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime), this.typaheadBuffer += e.key.toLowerCase();
    const t = this.lastActiveRecord ? this.lastActiveRecord[q.INDEX] : -1, r = this.typeaheadRecords.length, i = (p) => (p[q.INDEX] + r - t) % r, s = this.typeaheadRecords.filter((p) => !p[q.ITEM].disabled && p[q.TEXT].startsWith(this.typaheadBuffer)).sort((p, m) => i(p) - i(m));
    if (s.length === 0) {
      clearTimeout(this.cancelTypeaheadTimeout), this.lastActiveRecord && (this.lastActiveRecord[q.ITEM].tabIndex = -1), this.endTypeahead();
      return;
    }
    const l = this.typaheadBuffer.length === 1;
    let c;
    this.lastActiveRecord === s[0] && l ? c = s[1] ?? s[0] : c = s[0], this.lastActiveRecord && (this.lastActiveRecord[q.ITEM].tabIndex = -1), this.lastActiveRecord = c, c[q.ITEM].tabIndex = 0, c[q.ITEM].focus();
  }
}
const lo = 200, no = /* @__PURE__ */ new Set([
  B.ArrowDown,
  B.ArrowUp,
  B.Home,
  B.End
]), aa = /* @__PURE__ */ new Set([
  B.ArrowLeft,
  B.ArrowRight,
  ...no
]);
function sa(o = document) {
  let e = o.activeElement;
  for (; e && e?.shadowRoot?.activeElement; )
    e = e.shadowRoot.activeElement;
  return e;
}
class z extends b {
  /**
   * Whether the menu is animating upwards or downwards when opening. This is
   * helpful for calculating some animation calculations.
   */
  get openDirection() {
    return this.menuCorner.split("-")[0] === "start" ? "DOWN" : "UP";
  }
  /**
   * The element which the menu should align to. If `anchor` is set to a
   * non-empty idref string, then `anchorEl` will resolve to the element with
   * the given id in the same root node. Otherwise, `null`.
   */
  get anchorElement() {
    return this.anchor ? this.getRootNode().querySelector(`#${this.anchor}`) : this.currentAnchorElement;
  }
  set anchorElement(e) {
    this.currentAnchorElement = e, this.requestUpdate("anchorElement");
  }
  constructor() {
    super(), this.anchor = "", this.positioning = "absolute", this.quick = !1, this.hasOverflow = !1, this.open = !1, this.xOffset = 0, this.yOffset = 0, this.noHorizontalFlip = !1, this.noVerticalFlip = !1, this.typeaheadDelay = lo, this.anchorCorner = Dr.END_START, this.menuCorner = Dr.START_START, this.stayOpenOnOutsideClick = !1, this.stayOpenOnFocusout = !1, this.skipRestoreFocus = !1, this.defaultFocus = j.FIRST_ITEM, this.noNavigationWrap = !1, this.typeaheadActive = !0, this.isSubmenu = !1, this.pointerPath = [], this.isRepositioning = !1, this.openCloseAnimationSignal = Zo(), this.listController = new Qi({
      isItem: (e) => e.hasAttribute("md-menu-item"),
      getPossibleItems: () => this.slotItems,
      isRtl: () => getComputedStyle(this).direction === "rtl",
      deactivateItem: (e) => {
        e.selected = !1, e.tabIndex = -1;
      },
      activateItem: (e) => {
        e.selected = !0, e.tabIndex = 0;
      },
      isNavigableKey: (e) => {
        if (!this.isSubmenu)
          return aa.has(e);
        const r = getComputedStyle(this).direction === "rtl" ? B.ArrowLeft : B.ArrowRight;
        return e === r ? !0 : no.has(e);
      },
      wrapNavigation: () => !this.noNavigationWrap
    }), this.lastFocusedElement = null, this.typeaheadController = new ia(() => ({
      getItems: () => this.items,
      typeaheadBufferTime: this.typeaheadDelay,
      active: this.typeaheadActive
    })), this.currentAnchorElement = null, this.internals = // Cast needed for closure
    this.attachInternals(), this.menuPositionController = new oa(this, () => ({
      anchorCorner: this.anchorCorner,
      surfaceCorner: this.menuCorner,
      surfaceEl: this.surfaceEl,
      anchorEl: this.anchorElement,
      positioning: this.positioning === "popover" ? "document" : this.positioning,
      isOpen: this.open,
      xOffset: this.xOffset,
      yOffset: this.yOffset,
      disableBlockFlip: this.noVerticalFlip,
      disableInlineFlip: this.noHorizontalFlip,
      onOpen: this.onOpened,
      beforeClose: this.beforeClose,
      onClose: this.onClosed,
      // We can't resize components that have overflow like menus with
      // submenus because the overflow-y will show menu items / content
      // outside the bounds of the menu. Popover API fixes this because each
      // submenu is hoisted to the top-layer and are not considered overflow
      // content.
      repositionStrategy: this.hasOverflow && this.positioning !== "popover" ? "move" : "resize"
    })), this.onWindowResize = () => {
      this.isRepositioning || this.positioning !== "document" && this.positioning !== "fixed" && this.positioning !== "popover" || (this.isRepositioning = !0, this.reposition(), this.isRepositioning = !1);
    }, this.handleFocusout = async (e) => {
      const t = this.anchorElement;
      if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(t))
        return;
      if (e.relatedTarget) {
        if (It(e.relatedTarget, this) || this.pointerPath.length !== 0 && It(e.relatedTarget, t))
          return;
      } else if (this.pointerPath.includes(this))
        return;
      const r = this.skipRestoreFocus;
      this.skipRestoreFocus = !0, this.close(), await this.updateComplete, this.skipRestoreFocus = r;
    }, this.onOpened = async () => {
      this.lastFocusedElement = sa();
      const e = this.items, t = Ee(e);
      t && this.defaultFocus !== j.NONE && (t.item.tabIndex = -1);
      let r = !this.quick;
      switch (this.quick ? this.dispatchEvent(new Event("opening")) : r = !!await this.animateOpen(), this.defaultFocus) {
        case j.FIRST_ITEM:
          const i = lr(e);
          i && (i.tabIndex = 0, i.focus(), await i.updateComplete);
          break;
        case j.LAST_ITEM:
          const s = ao(e);
          s && (s.tabIndex = 0, s.focus(), await s.updateComplete);
          break;
        case j.LIST_ROOT:
          this.focus();
          break;
        default:
        case j.NONE:
          break;
      }
      r || this.dispatchEvent(new Event("opened"));
    }, this.beforeClose = async () => {
      this.open = !1, this.skipRestoreFocus || this.lastFocusedElement?.focus?.(), this.quick || await this.animateClose();
    }, this.onClosed = () => {
      this.quick && (this.dispatchEvent(new Event("closing")), this.dispatchEvent(new Event("closed")));
    }, this.onWindowPointerdown = (e) => {
      this.pointerPath = e.composedPath();
    }, this.onDocumentClick = (e) => {
      if (!this.open)
        return;
      const t = e.composedPath();
      !this.stayOpenOnOutsideClick && !t.includes(this) && !t.includes(this.anchorElement) && (this.open = !1);
    }, S || (this.internals.role = "menu", this.addEventListener("keydown", this.handleKeydown), this.addEventListener("keydown", this.captureKeydown, { capture: !0 }), this.addEventListener("focusout", this.handleFocusout));
  }
  /**
   * The menu items associated with this menu. The items must be `MenuItem`s and
   * have both the `md-menu-item` and `md-list-item` attributes.
   */
  get items() {
    return this.listController.items;
  }
  willUpdate(e) {
    if (e.has("open")) {
      if (this.open) {
        this.removeAttribute("aria-hidden");
        return;
      }
      this.setAttribute("aria-hidden", "true");
    }
  }
  update(e) {
    e.has("open") && (this.open ? this.setUpGlobalEventListeners() : this.cleanUpGlobalEventListeners()), e.has("positioning") && this.positioning === "popover" && // type required for Google JS conformance
    !this.showPopover && (this.positioning = "fixed"), super.update(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.open && this.setUpGlobalEventListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.cleanUpGlobalEventListeners();
  }
  getBoundingClientRect() {
    return this.surfaceEl ? this.surfaceEl.getBoundingClientRect() : super.getBoundingClientRect();
  }
  getClientRects() {
    return this.surfaceEl ? this.surfaceEl.getClientRects() : super.getClientRects();
  }
  render() {
    return this.renderSurface();
  }
  /**
   * Renders the positionable surface element and its contents.
   */
  renderSurface() {
    return n`
      <div
        class="menu ${H(this.getSurfaceClasses())}"
        style=${ye(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning === "popover" ? "manual" : h}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
  }
  /**
   * Renders the menu items' slot
   */
  renderMenuItems() {
    return n`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
  }
  /**
   * Renders the elevation component.
   */
  renderElevation() {
    return n`<md-elevation part="elevation"></md-elevation>`;
  }
  getSurfaceClasses() {
    return {
      open: this.open,
      fixed: this.positioning === "fixed",
      "has-overflow": this.hasOverflow
    };
  }
  captureKeydown(e) {
    e.target === this && !e.defaultPrevented && so(e.code) && (e.preventDefault(), this.close()), this.typeaheadController.onKeydown(e);
  }
  /**
   * Performs the opening animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   *
   * @return A promise that resolve to `true` if the animation was aborted,
   *     `false` if it was not aborted.
   */
  async animateOpen() {
    const e = this.surfaceEl, t = this.slotEl;
    if (!e || !t)
      return !0;
    const r = this.openDirection;
    this.dispatchEvent(new Event("opening")), e.classList.toggle("animating", !0);
    const i = this.openCloseAnimationSignal.start(), s = e.offsetHeight, l = r === "UP", c = this.items, p = 500, m = 50, v = 250, u = (p - v) / c.length, g = e.animate([{ height: "0px" }, { height: `${s}px` }], {
      duration: p,
      easing: Y.EMPHASIZED
    }), x = t.animate([
      { transform: l ? `translateY(-${s}px)` : "" },
      { transform: "" }
    ], { duration: p, easing: Y.EMPHASIZED }), E = e.animate([{ opacity: 0 }, { opacity: 1 }], m), $ = [];
    for (let k = 0; k < c.length; k++) {
      const P = l ? c.length - 1 - k : k, F = c[P], D = F.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: v,
        delay: u * k
      });
      F.classList.toggle("md-menu-hidden", !0), D.addEventListener("finish", () => {
        F.classList.toggle("md-menu-hidden", !1);
      }), $.push([F, D]);
    }
    let A = (k) => {
    };
    const R = new Promise((k) => {
      A = k;
    });
    return i.addEventListener("abort", () => {
      g.cancel(), x.cancel(), E.cancel(), $.forEach(([k, P]) => {
        k.classList.toggle("md-menu-hidden", !1), P.cancel();
      }), A(!0);
    }), g.addEventListener("finish", () => {
      e.classList.toggle("animating", !1), this.openCloseAnimationSignal.finish(), A(!1);
    }), await R;
  }
  /**
   * Performs the closing animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   */
  animateClose() {
    let e;
    const t = new Promise((D) => {
      e = D;
    }), r = this.surfaceEl, i = this.slotEl;
    if (!r || !i)
      return e(!1), t;
    const l = this.openDirection === "UP";
    this.dispatchEvent(new Event("closing")), r.classList.toggle("animating", !0);
    const c = this.openCloseAnimationSignal.start(), p = r.offsetHeight, m = this.items, v = 150, u = 50, g = v - u, x = 50, E = 50, $ = 0.35, A = (v - E - x) / m.length, R = r.animate([
      { height: `${p}px` },
      { height: `${p * $}px` }
    ], {
      duration: v,
      easing: Y.EMPHASIZED_ACCELERATE
    }), k = i.animate([
      { transform: "" },
      {
        transform: l ? `translateY(-${p * (1 - $)}px)` : ""
      }
    ], { duration: v, easing: Y.EMPHASIZED_ACCELERATE }), P = r.animate([{ opacity: 1 }, { opacity: 0 }], { duration: u, delay: g }), F = [];
    for (let D = 0; D < m.length; D++) {
      const re = l ? D : m.length - 1 - D, oe = m[re], de = oe.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: x,
        delay: E + A * D
      });
      de.addEventListener("finish", () => {
        oe.classList.toggle("md-menu-hidden", !0);
      }), F.push([oe, de]);
    }
    return c.addEventListener("abort", () => {
      R.cancel(), k.cancel(), P.cancel(), F.forEach(([D, re]) => {
        re.cancel(), D.classList.toggle("md-menu-hidden", !1);
      }), e(!1);
    }), R.addEventListener("finish", () => {
      r.classList.toggle("animating", !1), F.forEach(([D]) => {
        D.classList.toggle("md-menu-hidden", !1);
      }), this.openCloseAnimationSignal.finish(), this.dispatchEvent(new Event("closed")), e(!0);
    }), t;
  }
  handleKeydown(e) {
    this.pointerPath = [], this.listController.handleKeydown(e);
  }
  setUpGlobalEventListeners() {
    document.addEventListener("click", this.onDocumentClick, { capture: !0 }), window.addEventListener("pointerdown", this.onWindowPointerdown), document.addEventListener("resize", this.onWindowResize, { passive: !0 }), window.addEventListener("resize", this.onWindowResize, { passive: !0 });
  }
  cleanUpGlobalEventListeners() {
    document.removeEventListener("click", this.onDocumentClick, {
      capture: !0
    }), window.removeEventListener("pointerdown", this.onWindowPointerdown), document.removeEventListener("resize", this.onWindowResize), window.removeEventListener("resize", this.onWindowResize);
  }
  onCloseMenu() {
    this.close();
  }
  onDeactivateItems(e) {
    e.stopPropagation(), this.listController.onDeactivateItems();
  }
  onRequestActivation(e) {
    e.stopPropagation(), this.listController.onRequestActivation(e);
  }
  handleDeactivateTypeahead(e) {
    e.stopPropagation(), this.typeaheadActive = !1;
  }
  handleActivateTypeahead(e) {
    e.stopPropagation(), this.typeaheadActive = !0;
  }
  handleStayOpenOnFocusout(e) {
    e.stopPropagation(), this.stayOpenOnFocusout = !0;
  }
  handleCloseOnFocusout(e) {
    e.stopPropagation(), this.stayOpenOnFocusout = !1;
  }
  close() {
    this.open = !1, this.slotItems.forEach((t) => {
      t.close?.();
    });
  }
  show() {
    this.open = !0;
  }
  /**
   * Activates the next item in the menu. If at the end of the menu, the first
   * item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activateNextItem() {
    return this.listController.activateNextItem() ?? null;
  }
  /**
   * Activates the previous item in the menu. If at the start of the menu, the
   * last item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activatePreviousItem() {
    return this.listController.activatePreviousItem() ?? null;
  }
  /**
   * Repositions the menu if it is open.
   *
   * Useful for the case where document or window-positioned menus have their
   * anchors moved while open.
   */
  reposition() {
    this.open && this.menuPositionController.position();
  }
}
a([
  w(".menu")
], z.prototype, "surfaceEl", void 0);
a([
  w("slot")
], z.prototype, "slotEl", void 0);
a([
  d()
], z.prototype, "anchor", void 0);
a([
  d()
], z.prototype, "positioning", void 0);
a([
  d({ type: Boolean })
], z.prototype, "quick", void 0);
a([
  d({ type: Boolean, attribute: "has-overflow" })
], z.prototype, "hasOverflow", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], z.prototype, "open", void 0);
a([
  d({ type: Number, attribute: "x-offset" })
], z.prototype, "xOffset", void 0);
a([
  d({ type: Number, attribute: "y-offset" })
], z.prototype, "yOffset", void 0);
a([
  d({ type: Boolean, attribute: "no-horizontal-flip" })
], z.prototype, "noHorizontalFlip", void 0);
a([
  d({ type: Boolean, attribute: "no-vertical-flip" })
], z.prototype, "noVerticalFlip", void 0);
a([
  d({ type: Number, attribute: "typeahead-delay" })
], z.prototype, "typeaheadDelay", void 0);
a([
  d({ attribute: "anchor-corner" })
], z.prototype, "anchorCorner", void 0);
a([
  d({ attribute: "menu-corner" })
], z.prototype, "menuCorner", void 0);
a([
  d({ type: Boolean, attribute: "stay-open-on-outside-click" })
], z.prototype, "stayOpenOnOutsideClick", void 0);
a([
  d({ type: Boolean, attribute: "stay-open-on-focusout" })
], z.prototype, "stayOpenOnFocusout", void 0);
a([
  d({ type: Boolean, attribute: "skip-restore-focus" })
], z.prototype, "skipRestoreFocus", void 0);
a([
  d({ attribute: "default-focus" })
], z.prototype, "defaultFocus", void 0);
a([
  d({ type: Boolean, attribute: "no-navigation-wrap" })
], z.prototype, "noNavigationWrap", void 0);
a([
  G({ flatten: !0 })
], z.prototype, "slotItems", void 0);
a([
  I()
], z.prototype, "typeaheadActive", void 0);
const la = f`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:var(--md-menu-top-space, 8px) var(--md-menu-bottom-space, 8px)}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;
let zt = class extends z {
};
zt.styles = [la];
zt = a([
  _("md-menu")
], zt);
class na extends ir {
  computeValidity(e) {
    return this.selectControl || (this.selectControl = document.createElement("select")), Pr(n`<option value=${e.value}></option>`, this.selectControl), this.selectControl.value = e.value, this.selectControl.required = e.required, {
      validity: this.selectControl.validity,
      validationMessage: this.selectControl.validationMessage
    };
  }
  equals(e, t) {
    return e.value === t.value && e.required === t.required;
  }
  copy({ value: e, required: t }) {
    return { value: e, required: t };
  }
}
function da(o) {
  const e = [];
  for (let t = 0; t < o.length; t++) {
    const r = o[t];
    r.selected && e.push([r, t]);
  }
  return e;
}
var Lr;
const Ve = /* @__PURE__ */ Symbol("value"), ca = ee(to(rr(or(Re(b)))));
class C extends ca {
  /**
   * The value of the currently selected option.
   *
   * Note: For SSR, set `[selected]` on the requested option and `displayText`
   * rather than setting `value` setting `value` will incur a DOM query.
   */
  get value() {
    return this[Ve];
  }
  set value(e) {
    S || (this.lastUserSetValue = e, this.select(e));
  }
  get options() {
    return this.menu?.items ?? [];
  }
  /**
   * The index of the currently selected option.
   *
   * Note: For SSR, set `[selected]` on the requested option and `displayText`
   * rather than setting `selectedIndex` setting `selectedIndex` will incur a
   * DOM query.
   */
  get selectedIndex() {
    const [e, t] = (this.getSelectedOptions() ?? [])[0] ?? [];
    return t ?? -1;
  }
  set selectedIndex(e) {
    this.lastUserSetSelectedIndex = e, this.selectIndex(e);
  }
  /**
   * Returns an array of selected options.
   *
   * NOTE: md-select only supports single selection.
   */
  get selectedOptions() {
    return (this.getSelectedOptions() ?? []).map(([e]) => e);
  }
  get hasError() {
    return this.error || this.nativeError;
  }
  constructor() {
    super(), this.quick = !1, this.required = !1, this.errorText = "", this.label = "", this.noAsterisk = !1, this.supportingText = "", this.error = !1, this.menuPositioning = "popover", this.clampMenuWidth = !1, this.typeaheadDelay = lo, this.hasLeadingIcon = !1, this.displayText = "", this.menuAlign = "start", this[Lr] = "", this.lastUserSetValue = null, this.lastUserSetSelectedIndex = null, this.lastSelectedOption = null, this.lastSelectedOptionRecords = [], this.nativeError = !1, this.nativeErrorText = "", this.focused = !1, this.open = !1, this.defaultFocus = j.NONE, this.prevOpen = this.open, this.selectWidth = 0, !S && (this.addEventListener("focus", this.handleFocus.bind(this)), this.addEventListener("blur", this.handleBlur.bind(this)));
  }
  /**
   * Selects an option given the value of the option, and updates MdSelect's
   * value.
   */
  select(e) {
    const t = this.options.find((r) => r.value === e);
    t && this.selectItem(t);
  }
  /**
   * Selects an option given the index of the option, and updates MdSelect's
   * value.
   */
  selectIndex(e) {
    const t = this.options[e];
    t && this.selectItem(t);
  }
  /**
   * Reset the select to its default value.
   */
  reset() {
    for (const e of this.options)
      e.selected = e.hasAttribute("selected");
    this.updateValueAndDisplayText(), this.nativeError = !1, this.nativeErrorText = "";
  }
  /** Shows the picker. If it's already open, this is a no-op. */
  showPicker() {
    this.open = !0;
  }
  [(Lr = Ve, Je)](e) {
    e?.preventDefault();
    const t = this.getErrorText();
    this.nativeError = !!e, this.nativeErrorText = this.validationMessage, t === this.getErrorText() && this.field?.reannounceError();
  }
  update(e) {
    if (this.hasUpdated || this.initUserSelection(), this.prevOpen !== this.open && this.open) {
      const t = this.getBoundingClientRect();
      this.selectWidth = t.width;
    }
    this.prevOpen = this.open, super.update(e);
  }
  render() {
    return n`
      <span
        class="select ${H(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `;
  }
  async firstUpdated(e) {
    await this.menu?.updateComplete, this.lastSelectedOptionRecords.length || this.initUserSelection(), !this.lastSelectedOptionRecords.length && !S && !this.options.length && setTimeout(() => {
      this.updateValueAndDisplayText();
    }), super.firstUpdated(e);
  }
  getRenderClasses() {
    return {
      disabled: this.disabled,
      error: this.error,
      open: this.open
    };
  }
  renderField() {
    const e = this.ariaLabel || this.label;
    return sr`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled ? "-1" : "0"}
          aria-label=${e || h}
          aria-describedby="description"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          ?no-asterisk=${this.noAsterisk}
          .focused=${this.focused || this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`;
  }
  renderFieldContent() {
    return [
      this.renderLeadingIcon(),
      this.renderLabel(),
      this.renderTrailingIcon()
    ];
  }
  renderLeadingIcon() {
    return n`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderTrailingIcon() {
    return n`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `;
  }
  renderLabel() {
    return n`<div id="label">${this.displayText || n`&nbsp;`}</div>`;
  }
  renderMenu() {
    const e = this.label || this.ariaLabel;
    return n`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${e || h}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${ye({
      "--__menu-min-width": `${this.selectWidth}px`,
      "--__menu-max-width": this.clampMenuWidth ? `${this.selectWidth}px` : void 0
    })}
        no-navigation-wrap
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign === "start" ? "end-start" : "end-end"}
        .menuCorner=${this.menuAlign === "start" ? "start-start" : "start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`;
  }
  renderMenuContent() {
    return n`<slot></slot>`;
  }
  /**
   * Handles opening the select on keydown and typahead selection when the menu
   * is closed.
   */
  handleKeydown(e) {
    if (this.open || this.disabled || !this.menu)
      return;
    const t = this.menu.typeaheadController, r = e.code === "Space" || e.code === "ArrowDown" || e.code === "ArrowUp" || e.code === "End" || e.code === "Home" || e.code === "Enter";
    if (!t.isTypingAhead && r) {
      switch (e.preventDefault(), this.open = !0, e.code) {
        case "Space":
        case "ArrowDown":
        case "Enter":
          this.defaultFocus = j.NONE;
          break;
        case "End":
          this.defaultFocus = j.LAST_ITEM;
          break;
        case "ArrowUp":
        case "Home":
          this.defaultFocus = j.FIRST_ITEM;
          break;
      }
      return;
    }
    if (e.key.length === 1) {
      t.onKeydown(e), e.preventDefault();
      const { lastActiveRecord: s } = t;
      if (!s)
        return;
      this.labelEl?.setAttribute?.("aria-live", "polite"), this.selectItem(s[q.ITEM]) && this.dispatchInteractionEvents();
    }
  }
  handleClick() {
    this.open = !this.open;
  }
  handleFocus() {
    this.focused = !0;
  }
  handleBlur() {
    this.focused = !1;
  }
  /**
   * Handles closing the menu when the focus leaves the select's subtree.
   */
  handleFocusout(e) {
    e.relatedTarget && It(e.relatedTarget, this) || (this.open = !1);
  }
  /**
   * Gets a list of all selected select options as a list item record array.
   *
   * @return An array of selected list option records.
   */
  getSelectedOptions() {
    if (!this.menu)
      return this.lastSelectedOptionRecords = [], null;
    const e = this.menu.items;
    return this.lastSelectedOptionRecords = da(e), this.lastSelectedOptionRecords;
  }
  async getUpdateComplete() {
    return await this.menu?.updateComplete, super.getUpdateComplete();
  }
  /**
   * Gets the selected options from the DOM, and updates the value and display
   * text to the first selected option's value and headline respectively.
   *
   * @return Whether or not the selected option has changed since last update.
   */
  updateValueAndDisplayText() {
    const e = this.getSelectedOptions() ?? [];
    let t = !1;
    if (e.length) {
      const [r] = e[0];
      t = this.lastSelectedOption !== r, this.lastSelectedOption = r, this[Ve] = r.value, this.displayText = r.displayText;
    } else
      t = this.lastSelectedOption !== null, this.lastSelectedOption = null, this[Ve] = "", this.displayText = "";
    return t;
  }
  /**
   * Focuses and activates the last selected item upon opening, and resets other
   * active items.
   */
  async handleOpening(e) {
    if (this.labelEl?.removeAttribute?.("aria-live"), this.redispatchEvent(e), this.defaultFocus !== j.NONE)
      return;
    const t = this.menu.items, r = Ee(t)?.item;
    let [i] = this.lastSelectedOptionRecords[0] ?? [null];
    r && r !== i && (r.tabIndex = -1), i = i ?? t[0], i && (i.tabIndex = 0, i.focus());
  }
  redispatchEvent(e) {
    Oe(this, e);
  }
  handleClosed(e) {
    this.open = !1, this.redispatchEvent(e);
  }
  /**
   * Determines the reason for closing, and updates the UI accordingly.
   */
  handleCloseMenu(e) {
    const t = e.detail.reason, r = e.detail.itemPath[0];
    this.open = !1;
    let i = !1;
    t.kind === "click-selection" ? i = this.selectItem(r) : t.kind === "keydown" && ra(t.key) ? i = this.selectItem(r) : (r.tabIndex = -1, r.blur()), i && this.dispatchInteractionEvents();
  }
  /**
   * Selects a given option, deselects other options, and updates the UI.
   *
   * @return Whether the last selected option has changed.
   */
  selectItem(e) {
    return (this.getSelectedOptions() ?? []).forEach(([r]) => {
      e !== r && (r.selected = !1);
    }), e.selected = !0, this.updateValueAndDisplayText();
  }
  /**
   * Handles updating selection when an option element requests selection via
   * property / attribute change.
   */
  handleRequestSelection(e) {
    const t = e.target;
    this.lastSelectedOptionRecords.some(([r]) => r === t) || this.selectItem(t);
  }
  /**
   * Handles updating selection when an option element requests deselection via
   * property / attribute change.
   */
  handleRequestDeselection(e) {
    const t = e.target;
    this.lastSelectedOptionRecords.some(([r]) => r === t) && this.updateValueAndDisplayText();
  }
  /**
   * Attempts to initialize the selected option from user-settable values like
   * SSR, setting `value`, or `selectedIndex` at startup.
   */
  initUserSelection() {
    this.lastUserSetValue && !this.lastSelectedOptionRecords.length ? this.select(this.lastUserSetValue) : this.lastUserSetSelectedIndex !== null && !this.lastSelectedOptionRecords.length ? this.selectIndex(this.lastUserSetSelectedIndex) : this.updateValueAndDisplayText();
  }
  handleIconChange() {
    this.hasLeadingIcon = this.leadingIcons.length > 0;
  }
  /**
   * Dispatches the `input` and `change` events.
   */
  dispatchInteractionEvents() {
    this.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })), this.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }
  [be]() {
    return this.value;
  }
  formResetCallback() {
    this.reset();
  }
  formStateRestoreCallback(e) {
    this.value = e;
  }
  click() {
    this.field?.click();
  }
  [Se]() {
    return new na(() => this);
  }
  [Ie]() {
    return this.field;
  }
}
C.shadowRootOptions = {
  ...b.shadowRootOptions,
  delegatesFocus: !0
};
a([
  d({ type: Boolean })
], C.prototype, "quick", void 0);
a([
  d({ type: Boolean })
], C.prototype, "required", void 0);
a([
  d({ type: String, attribute: "error-text" })
], C.prototype, "errorText", void 0);
a([
  d()
], C.prototype, "label", void 0);
a([
  d({ type: Boolean, attribute: "no-asterisk" })
], C.prototype, "noAsterisk", void 0);
a([
  d({ type: String, attribute: "supporting-text" })
], C.prototype, "supportingText", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], C.prototype, "error", void 0);
a([
  d({ attribute: "menu-positioning" })
], C.prototype, "menuPositioning", void 0);
a([
  d({ type: Boolean, attribute: "clamp-menu-width" })
], C.prototype, "clampMenuWidth", void 0);
a([
  d({ type: Number, attribute: "typeahead-delay" })
], C.prototype, "typeaheadDelay", void 0);
a([
  d({ type: Boolean, attribute: "has-leading-icon" })
], C.prototype, "hasLeadingIcon", void 0);
a([
  d({ attribute: "display-text" })
], C.prototype, "displayText", void 0);
a([
  d({ attribute: "menu-align" })
], C.prototype, "menuAlign", void 0);
a([
  d()
], C.prototype, "value", null);
a([
  d({ type: Number, attribute: "selected-index" })
], C.prototype, "selectedIndex", null);
a([
  I()
], C.prototype, "nativeError", void 0);
a([
  I()
], C.prototype, "nativeErrorText", void 0);
a([
  I()
], C.prototype, "focused", void 0);
a([
  I()
], C.prototype, "open", void 0);
a([
  I()
], C.prototype, "defaultFocus", void 0);
a([
  w(".field")
], C.prototype, "field", void 0);
a([
  w("md-menu")
], C.prototype, "menu", void 0);
a([
  w("#label")
], C.prototype, "labelEl", void 0);
a([
  G({ slot: "leading-icon", flatten: !0 })
], C.prototype, "leadingIcons", void 0);
class pa extends C {
  constructor() {
    super(...arguments), this.fieldTag = se`md-filled-field`;
  }
}
const ha = f`:host{--_text-field-active-indicator-color: var(--md-filled-select-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-active-indicator-height: var(--md-filled-select-text-field-active-indicator-height, 1px);--_text-field-container-color: var(--md-filled-select-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_text-field-disabled-active-indicator-color: var(--md-filled-select-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-active-indicator-height: var(--md-filled-select-text-field-disabled-active-indicator-height, 1px);--_text-field-disabled-active-indicator-opacity: var(--md-filled-select-text-field-disabled-active-indicator-opacity, 0.38);--_text-field-disabled-container-color: var(--md-filled-select-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-container-opacity: var(--md-filled-select-text-field-disabled-container-opacity, 0.04);--_text-field-disabled-input-text-color: var(--md-filled-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-filled-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-filled-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-filled-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-filled-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-filled-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-supporting-text-color: var(--md-filled-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-filled-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-filled-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-filled-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-active-indicator-color: var(--md-filled-select-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-active-indicator-color: var(--md-filled-select-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-input-text-color: var(--md-filled-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-filled-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-filled-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-supporting-text-color: var(--md-filled-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-filled-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-active-indicator-color: var(--md-filled-select-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-input-text-color: var(--md-filled-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-filled-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-filled-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-state-layer-color: var(--md-filled-select-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-state-layer-opacity: var(--md-filled-select-text-field-error-hover-state-layer-opacity, 0.08);--_text-field-error-hover-supporting-text-color: var(--md-filled-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-filled-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-filled-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-filled-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-filled-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-supporting-text-color: var(--md-filled-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-filled-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-active-indicator-color: var(--md-filled-select-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-active-indicator-height: var(--md-filled-select-text-field-focus-active-indicator-height, 3px);--_text-field-focus-input-text-color: var(--md-filled-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-filled-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-filled-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-supporting-text-color: var(--md-filled-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-filled-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-active-indicator-color: var(--md-filled-select-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-active-indicator-height: var(--md-filled-select-text-field-hover-active-indicator-height, 1px);--_text-field-hover-input-text-color: var(--md-filled-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-filled-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-filled-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-state-layer-color: var(--md-filled-select-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-state-layer-opacity: var(--md-filled-select-text-field-hover-state-layer-opacity, 0.08);--_text-field-hover-supporting-text-color: var(--md-filled-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-filled-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-filled-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-filled-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-filled-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-filled-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-filled-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-filled-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-filled-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-filled-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-filled-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-filled-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-filled-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-filled-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-filled-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-filled-select-text-field-leading-icon-size, 24px);--_text-field-supporting-text-color: var(--md-filled-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-filled-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-filled-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-filled-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-filled-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-filled-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-filled-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-filled-select-text-field-container-shape-start-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-filled-select-text-field-container-shape-start-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-filled-select-text-field-container-shape-end-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_text-field-container-shape-end-start: var(--md-filled-select-text-field-container-shape-end-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--md-filled-field-active-indicator-color: var(--_text-field-active-indicator-color);--md-filled-field-active-indicator-height: var(--_text-field-active-indicator-height);--md-filled-field-container-color: var(--_text-field-container-color);--md-filled-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-filled-field-content-color: var(--_text-field-input-text-color);--md-filled-field-content-font: var(--_text-field-input-text-font);--md-filled-field-content-line-height: var(--_text-field-input-text-line-height);--md-filled-field-content-size: var(--_text-field-input-text-size);--md-filled-field-content-weight: var(--_text-field-input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_text-field-disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_text-field-disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_text-field-disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_text-field-disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_text-field-disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_text-field-error-active-indicator-color);--md-filled-field-error-content-color: var(--_text-field-error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_text-field-error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_text-field-error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_text-field-error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_text-field-error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-filled-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_text-field-focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_text-field-focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_text-field-hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_text-field-hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_text-field-hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_text-field-hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_text-field-label-text-color);--md-filled-field-label-text-font: var(--_text-field-label-text-font);--md-filled-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-filled-field-label-text-size: var(--_text-field-label-text-size);--md-filled-field-label-text-weight: var(--_text-field-label-text-weight);--md-filled-field-leading-content-color: var(--_text-field-leading-icon-color);--md-filled-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-filled-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-filled-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-filled-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`;
const co = f`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`;
let Ot = class extends pa {
};
Ot.styles = [co, ha];
Ot = a([
  _("md-filled-select")
], Ot);
class ua extends C {
  constructor() {
    super(...arguments), this.fieldTag = se`md-outlined-field`;
  }
}
const fa = f`:host{--_text-field-disabled-input-text-color: var(--md-outlined-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-outlined-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-outlined-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-outlined-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-outlined-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-outlined-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-outline-color: var(--md-outlined-select-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-outline-opacity: var(--md-outlined-select-text-field-disabled-outline-opacity, 0.12);--_text-field-disabled-outline-width: var(--md-outlined-select-text-field-disabled-outline-width, 1px);--_text-field-disabled-supporting-text-color: var(--md-outlined-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-outlined-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-outlined-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-outlined-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-focus-input-text-color: var(--md-outlined-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-outlined-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-outlined-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-outline-color: var(--md-outlined-select-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-supporting-text-color: var(--md-outlined-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-outlined-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-input-text-color: var(--md-outlined-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-outlined-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-outlined-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-outline-color: var(--md-outlined-select-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-supporting-text-color: var(--md-outlined-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-outlined-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-outlined-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-outlined-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-outlined-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-outline-color: var(--md-outlined-select-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-supporting-text-color: var(--md-outlined-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-outlined-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-input-text-color: var(--md-outlined-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-outlined-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-outlined-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-outline-color: var(--md-outlined-select-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-outline-width: var(--md-outlined-select-text-field-focus-outline-width, 3px);--_text-field-focus-supporting-text-color: var(--md-outlined-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-outlined-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-input-text-color: var(--md-outlined-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-outlined-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-outlined-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-outline-color: var(--md-outlined-select-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-outline-width: var(--md-outlined-select-text-field-hover-outline-width, 1px);--_text-field-hover-supporting-text-color: var(--md-outlined-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-outlined-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-outlined-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-outlined-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-outlined-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-outlined-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-outlined-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-outlined-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-outlined-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-outlined-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-outlined-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-outlined-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-outlined-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-outlined-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-outlined-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-outlined-select-text-field-leading-icon-size, 24px);--_text-field-outline-color: var(--md-outlined-select-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_text-field-outline-width: var(--md-outlined-select-text-field-outline-width, 1px);--_text-field-supporting-text-color: var(--md-outlined-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-outlined-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-outlined-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-outlined-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-outlined-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-outlined-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-outlined-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-outlined-select-text-field-container-shape-start-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-outlined-select-text-field-container-shape-start-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-outlined-select-text-field-container-shape-end-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-start: var(--md-outlined-select-text-field-container-shape-end-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--md-outlined-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-outlined-field-content-color: var(--_text-field-input-text-color);--md-outlined-field-content-font: var(--_text-field-input-text-font);--md-outlined-field-content-line-height: var(--_text-field-input-text-line-height);--md-outlined-field-content-size: var(--_text-field-input-text-size);--md-outlined-field-content-weight: var(--_text-field-input-text-weight);--md-outlined-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_text-field-disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_text-field-disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_text-field-disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_text-field-error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_text-field-error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_text-field-error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_text-field-error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_text-field-focus-outline-color);--md-outlined-field-focus-outline-width: var(--_text-field-focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_text-field-hover-outline-color);--md-outlined-field-hover-outline-width: var(--_text-field-hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_text-field-label-text-color);--md-outlined-field-label-text-font: var(--_text-field-label-text-font);--md-outlined-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-outlined-field-label-text-size: var(--_text-field-label-text-size);--md-outlined-field-label-text-weight: var(--_text-field-label-text-weight);--md-outlined-field-leading-content-color: var(--_text-field-leading-icon-color);--md-outlined-field-outline-color: var(--_text-field-outline-color);--md-outlined-field-outline-width: var(--_text-field-outline-width);--md-outlined-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-outlined-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-outlined-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`;
let Rt = class extends ua {
};
Rt.styles = [co, fa];
Rt = a([
  _("md-outlined-select")
], Rt);
const va = f`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;
class nr extends b {
  constructor() {
    super(...arguments), this.multiline = !1;
  }
  render() {
    return n`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
  }
  handleTextSlotChange() {
    let e = !1, t = 0;
    for (const r of this.textSlots)
      if (ma(r) && (t += 1), t > 1) {
        e = !0;
        break;
      }
    this.multiline = e;
  }
}
a([
  d({ type: Boolean, reflect: !0 })
], nr.prototype, "multiline", void 0);
a([
  Lo(".text slot")
], nr.prototype, "textSlots", void 0);
function ma(o) {
  for (const e of o.assignedNodes({ flatten: !0 })) {
    const t = e.nodeType === Node.ELEMENT_NODE, r = e.nodeType === Node.TEXT_NODE && e.textContent?.match(/\S/);
    if (t || r)
      return !0;
  }
  return !1;
}
const ba = f`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;
let Dt = class extends nr {
};
Dt.styles = [ba];
Dt = a([
  _("md-item")
], Dt);
class ga {
  /**
   * @param host The MenuItem in which to attach this controller to.
   * @param config The object that configures this controller's behavior.
   */
  constructor(e, t) {
    this.host = e, this.internalTypeaheadText = null, this.onClick = () => {
      this.host.keepOpen || this.host.dispatchEvent(Or(this.host, {
        kind: Rr.CLICK_SELECTION
      }));
    }, this.onKeydown = (r) => {
      if (this.host.href && r.code === "Enter") {
        const s = this.getInteractiveElement();
        s instanceof HTMLAnchorElement && s.click();
      }
      if (r.defaultPrevented)
        return;
      const i = r.code;
      this.host.keepOpen && i !== "Escape" || so(i) && (r.preventDefault(), this.host.dispatchEvent(Or(this.host, {
        kind: Rr.KEYDOWN,
        key: i
      })));
    }, this.getHeadlineElements = t.getHeadlineElements, this.getSupportingTextElements = t.getSupportingTextElements, this.getDefaultElements = t.getDefaultElements, this.getInteractiveElement = t.getInteractiveElement, this.host.addController(this);
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot, and if there are
   * no slotted elements into headline, then it checks the _default_ slot, and
   * then the `"supporting-text"` slot if nothing is in _default_.
   */
  get typeaheadText() {
    if (this.internalTypeaheadText !== null)
      return this.internalTypeaheadText;
    const e = this.getHeadlineElements(), t = [];
    return e.forEach((r) => {
      r.textContent && r.textContent.trim() && t.push(r.textContent.trim());
    }), t.length === 0 && this.getDefaultElements().forEach((r) => {
      r.textContent && r.textContent.trim() && t.push(r.textContent.trim());
    }), t.length === 0 && this.getSupportingTextElements().forEach((r) => {
      r.textContent && r.textContent.trim() && t.push(r.textContent.trim());
    }), t.join(" ");
  }
  /**
   * The recommended tag name to render as the list item.
   */
  get tagName() {
    switch (this.host.type) {
      case "link":
        return "a";
      case "button":
        return "button";
      default:
      case "menuitem":
      case "option":
        return "li";
    }
  }
  /**
   * The recommended role of the menu item.
   */
  get role() {
    return this.host.type === "option" ? "option" : "menuitem";
  }
  hostConnected() {
    this.host.toggleAttribute("md-menu-item", !0);
  }
  hostUpdate() {
    this.host.href && (this.host.type = "link");
  }
  /**
   * Use to set the typeaheadText when it changes.
   */
  setTypeaheadText(e) {
    this.internalTypeaheadText = e;
  }
}
function ya() {
  return new Event("request-selection", {
    bubbles: !0,
    composed: !0
  });
}
function xa() {
  return new Event("request-deselection", {
    bubbles: !0,
    composed: !0
  });
}
class _a {
  /**
   * The recommended role of the select option.
   */
  get role() {
    return this.menuItemController.role;
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot, and if there are
   * no slotted elements into headline, then it checks the _default_ slot, and
   * then the `"supporting-text"` slot if nothing is in _default_.
   */
  get typeaheadText() {
    return this.menuItemController.typeaheadText;
  }
  setTypeaheadText(e) {
    this.menuItemController.setTypeaheadText(e);
  }
  /**
   * The text that is displayed in the select field when selected. If not set,
   * defaults to the textContent of the item slotted into the `"headline"` slot,
   * and if there are no slotted elements into headline, then it checks the
   * _default_ slot, and then the `"supporting-text"` slot if nothing is in
   * _default_.
   */
  get displayText() {
    return this.internalDisplayText !== null ? this.internalDisplayText : this.menuItemController.typeaheadText;
  }
  setDisplayText(e) {
    this.internalDisplayText = e;
  }
  /**
   * @param host The SelectOption in which to attach this controller to.
   * @param config The object that configures this controller's behavior.
   */
  constructor(e, t) {
    this.host = e, this.internalDisplayText = null, this.firstUpdate = !0, this.onClick = () => {
      this.menuItemController.onClick();
    }, this.onKeydown = (r) => {
      this.menuItemController.onKeydown(r);
    }, this.lastSelected = this.host.selected, this.menuItemController = new ga(e, t), e.addController(this);
  }
  hostUpdate() {
    this.lastSelected !== this.host.selected && (this.host.ariaSelected = this.host.selected ? "true" : "false");
  }
  hostUpdated() {
    this.lastSelected !== this.host.selected && !this.firstUpdate && (this.host.selected ? this.host.dispatchEvent(ya()) : this.host.dispatchEvent(xa())), this.lastSelected = this.host.selected, this.firstUpdate = !1;
  }
}
const wa = ee(b);
class W extends wa {
  constructor() {
    super(...arguments), this.disabled = !1, this.isMenuItem = !0, this.selected = !1, this.value = "", this.type = "option", this.selectOptionController = new _a(this, {
      getHeadlineElements: () => this.headlineElements,
      getSupportingTextElements: () => this.supportingTextElements,
      getDefaultElements: () => this.defaultElements,
      getInteractiveElement: () => this.listItemRoot
    });
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot.
   */
  get typeaheadText() {
    return this.selectOptionController.typeaheadText;
  }
  set typeaheadText(e) {
    this.selectOptionController.setTypeaheadText(e);
  }
  /**
   * The text that is displayed in the select field when selected. If not set,
   * defaults to the textContent of the item slotted into the `"headline"` slot.
   */
  get displayText() {
    return this.selectOptionController.displayText;
  }
  set displayText(e) {
    this.selectOptionController.setDisplayText(e);
  }
  render() {
    return this.renderListItem(n`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
  }
  /**
   * Renders the root list item.
   *
   * @param content the child content of the list item.
   */
  renderListItem(e) {
    return n`
      <li
        id="item"
        tabindex=${this.disabled ? -1 : 0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel || h}
        aria-selected=${this.ariaSelected || h}
        aria-checked=${this.ariaChecked || h}
        aria-expanded=${this.ariaExpanded || h}
        aria-haspopup=${this.ariaHasPopup || h}
        class="list-item ${H(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${e}</li
      >
    `;
  }
  /**
   * Handles rendering of the ripple element.
   */
  renderRipple() {
    return n` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
  }
  /**
   * Handles rendering of the focus ring.
   */
  renderFocusRing() {
    return n` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
  }
  /**
   * Classes applied to the list item root.
   */
  getRenderClasses() {
    return {
      disabled: this.disabled,
      selected: this.selected
    };
  }
  /**
   * Handles rendering the headline and supporting text.
   */
  renderBody() {
    return n`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
  }
  focus() {
    this.listItemRoot?.focus();
  }
}
W.shadowRootOptions = {
  ...b.shadowRootOptions,
  delegatesFocus: !0
};
a([
  d({ type: Boolean, reflect: !0 })
], W.prototype, "disabled", void 0);
a([
  d({ type: Boolean, attribute: "md-menu-item", reflect: !0 })
], W.prototype, "isMenuItem", void 0);
a([
  d({ type: Boolean })
], W.prototype, "selected", void 0);
a([
  d()
], W.prototype, "value", void 0);
a([
  w(".list-item")
], W.prototype, "listItemRoot", void 0);
a([
  G({ slot: "headline" })
], W.prototype, "headlineElements", void 0);
a([
  G({ slot: "supporting-text" })
], W.prototype, "supportingTextElements", void 0);
a([
  Fr({ slot: "" })
], W.prototype, "defaultElements", void 0);
a([
  d({ attribute: "typeahead-text" })
], W.prototype, "typeaheadText", null);
a([
  d({ attribute: "display-text" })
], W.prototype, "displayText", null);
let Lt = class extends W {
};
Lt.styles = [va];
Lt = a([
  _("md-select-option")
], Lt);
const $a = ee(b);
class ne extends $a {
  /**
   * Whether or not the primary ripple is disabled (defaults to `disabled`).
   * Some chip actions such as links cannot be disabled.
   */
  get rippleDisabled() {
    return this.disabled || this.softDisabled;
  }
  constructor() {
    super(), this.disabled = !1, this.softDisabled = !1, this.alwaysFocusable = !1, this.label = "", this.hasIcon = !1, S || this.addEventListener("click", this.handleClick.bind(this));
  }
  focus(e) {
    this.disabled && !this.alwaysFocusable || super.focus(e);
  }
  render() {
    return n`
      <div class="container ${H(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `;
  }
  updated(e) {
    e.has("disabled") && e.get("disabled") !== void 0 && this.dispatchEvent(new Event("update-focus", { bubbles: !0 }));
  }
  getContainerClasses() {
    return {
      disabled: this.disabled || this.softDisabled,
      "has-icon": this.hasIcon
    };
  }
  renderContainerContent() {
    return n`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `;
  }
  renderOutline() {
    return n`<span class="outline"></span>`;
  }
  renderLeadingIcon() {
    return n`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`;
  }
  renderPrimaryContent() {
    return n`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label ? this.label : n`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `;
  }
  handleIconChange(e) {
    const t = e.target;
    this.hasIcon = t.assignedElements({ flatten: !0 }).length > 0;
  }
  handleClick(e) {
    if (this.softDisabled || this.disabled && this.alwaysFocusable) {
      e.stopImmediatePropagation(), e.preventDefault();
      return;
    }
  }
}
ne.shadowRootOptions = {
  ...b.shadowRootOptions,
  delegatesFocus: !0
};
a([
  d({ type: Boolean, reflect: !0 })
], ne.prototype, "disabled", void 0);
a([
  d({ type: Boolean, attribute: "soft-disabled", reflect: !0 })
], ne.prototype, "softDisabled", void 0);
a([
  d({ type: Boolean, attribute: "always-focusable" })
], ne.prototype, "alwaysFocusable", void 0);
a([
  d()
], ne.prototype, "label", void 0);
a([
  d({ type: Boolean, reflect: !0, attribute: "has-icon" })
], ne.prototype, "hasIcon", void 0);
class po extends b {
  get chips() {
    return this.childElements.filter((e) => e instanceof ne);
  }
  constructor() {
    super(), this.internals = // Cast needed for closure
    this.attachInternals(), S || (this.addEventListener("focusin", this.updateTabIndices.bind(this)), this.addEventListener("update-focus", this.updateTabIndices.bind(this)), this.addEventListener("keydown", this.handleKeyDown.bind(this)), this.internals.role = "toolbar");
  }
  render() {
    return n`<slot @slotchange=${this.updateTabIndices}></slot>`;
  }
  handleKeyDown(e) {
    const t = e.key === "ArrowLeft", r = e.key === "ArrowRight", i = e.key === "Home", s = e.key === "End";
    if (!t && !r && !i && !s)
      return;
    const { chips: l } = this;
    if (l.length < 2)
      return;
    if (e.preventDefault(), i || s) {
      const g = i ? 0 : l.length - 1;
      l[g].focus({ trailing: s }), this.updateTabIndices();
      return;
    }
    const p = getComputedStyle(this).direction === "rtl" ? t : r, m = l.find((g) => g.matches(":focus-within"));
    if (!m) {
      (p ? l[0] : l[l.length - 1]).focus({ trailing: !p }), this.updateTabIndices();
      return;
    }
    const v = l.indexOf(m);
    let u = p ? v + 1 : v - 1;
    for (; u !== v; ) {
      u >= l.length ? u = 0 : u < 0 && (u = l.length - 1);
      const g = l[u];
      if (g.disabled && !g.alwaysFocusable) {
        p ? u++ : u--;
        continue;
      }
      g.focus({ trailing: !p }), this.updateTabIndices();
      break;
    }
  }
  updateTabIndices() {
    const { chips: e } = this;
    let t;
    for (const r of e) {
      const i = r.alwaysFocusable || !r.disabled;
      if (r.matches(":focus-within") && i) {
        t = r;
        continue;
      }
      i && !t && (t = r), r.tabIndex = -1;
    }
    t && (t.tabIndex = 0);
  }
}
a([
  G()
], po.prototype, "childElements", void 0);
const ka = f`:host{display:flex;flex-wrap:wrap;gap:8px}
`;
let Pt = class extends po {
};
Pt.styles = [ka];
Pt = a([
  _("md-chip-set")
], Pt);
const Ca = f`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;
const He = "aria-label-remove";
class ho extends ne {
  get ariaLabelRemove() {
    if (this.hasAttribute(He))
      return this.getAttribute(He);
    const { ariaLabel: e } = this;
    return e || this.label ? `Remove ${e || this.label}` : null;
  }
  set ariaLabelRemove(e) {
    const t = this.ariaLabelRemove;
    e !== t && (e === null ? this.removeAttribute(He) : this.setAttribute(He, e), this.requestUpdate());
  }
  constructor() {
    super(), this.handleTrailingActionFocus = this.handleTrailingActionFocus.bind(this), S || this.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  focus(e) {
    if ((this.alwaysFocusable || !this.disabled) && e?.trailing && this.trailingAction) {
      this.trailingAction.focus(e);
      return;
    }
    super.focus(e);
  }
  renderContainerContent() {
    return n`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `;
  }
  handleKeyDown(e) {
    const t = e.key === "ArrowLeft", r = e.key === "ArrowRight";
    if (!t && !r || !this.primaryAction || !this.trailingAction)
      return;
    const s = getComputedStyle(this).direction === "rtl" ? t : r, l = this.primaryAction?.matches(":focus-within"), c = this.trailingAction?.matches(":focus-within");
    if (s && c || !s && l)
      return;
    e.preventDefault(), e.stopPropagation(), (s ? this.trailingAction : this.primaryAction).focus();
  }
  handleTrailingActionFocus() {
    const { primaryAction: e, trailingAction: t } = this;
    !e || !t || (e.tabIndex = -1, t.addEventListener("focusout", () => {
      e.tabIndex = 0;
    }, { once: !0 }));
  }
}
function uo({ ariaLabel: o, disabled: e, focusListener: t, tabbable: r = !1 }) {
  return n`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${o || h}
      aria-labelledby=${o ? h : "remove-label label"}
      tabindex=${r ? h : -1}
      @click=${Ea}
      @focus=${t}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${e}></md-ripple>
      <span class="trailing icon" aria-hidden="true">
        <slot name="remove-trailing-icon">
          <svg viewBox="0 96 960 960">
            <path
              d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </slot>
      </span>
      <span class="touch"></span>
    </button>
  `;
}
function Ea(o) {
  this.disabled || this.softDisabled || (o.stopPropagation(), !this.dispatchEvent(new Event("remove", { cancelable: !0 }))) || this.remove();
}
class ue extends ho {
  constructor() {
    super(...arguments), this.elevated = !1, this.removable = !1, this.selected = !1, this.hasSelectedIcon = !1;
  }
  get primaryId() {
    return "button";
  }
  getContainerClasses() {
    return {
      ...super.getContainerClasses(),
      elevated: this.elevated,
      selected: this.selected,
      "has-trailing": this.removable,
      "has-icon": this.hasIcon || this.selected
    };
  }
  renderPrimaryAction(e) {
    const { ariaLabel: t } = this;
    return n`
      <button
        class="primary action"
        id="button"
        aria-label=${t || h}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled || h}
        ?disabled=${this.disabled && !this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${e}</button
      >
    `;
  }
  renderLeadingIcon() {
    return this.selected ? n`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    ` : super.renderLeadingIcon();
  }
  renderTrailingAction(e) {
    return this.removable ? uo({
      focusListener: e,
      ariaLabel: this.ariaLabelRemove,
      disabled: this.disabled || this.softDisabled
    }) : h;
  }
  renderOutline() {
    return this.elevated ? n`<md-elevation part="elevation"></md-elevation>` : super.renderOutline();
  }
  handleClickOnChild(e) {
    if (this.disabled || this.softDisabled)
      return;
    const t = this.selected;
    if (this.selected = !this.selected, !Oe(this, e)) {
      this.selected = t;
      return;
    }
  }
}
a([
  d({ type: Boolean })
], ue.prototype, "elevated", void 0);
a([
  d({ type: Boolean })
], ue.prototype, "removable", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], ue.prototype, "selected", void 0);
a([
  d({ type: Boolean, reflect: !0, attribute: "has-selected-icon" })
], ue.prototype, "hasSelectedIcon", void 0);
a([
  w(".primary.action")
], ue.prototype, "primaryAction", void 0);
a([
  w(".trailing.action")
], ue.prototype, "trailingAction", void 0);
const Aa = f`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;
const fo = f`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;
const vo = f`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;
const mo = f`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;
let Mt = class extends ue {
};
Mt.styles = [
  vo,
  Ca,
  mo,
  fo,
  Aa
];
Mt = a([
  _("md-filter-chip")
], Mt);
class fe extends ho {
  constructor() {
    super(...arguments), this.avatar = !1, this.href = "", this.target = "", this.removeOnly = !1, this.selected = !1;
  }
  get primaryId() {
    return this.href ? "link" : this.removeOnly ? "" : "button";
  }
  get rippleDisabled() {
    return !this.href && (this.disabled || this.softDisabled);
  }
  get primaryAction() {
    return this.removeOnly ? null : this.renderRoot.querySelector(".primary.action");
  }
  getContainerClasses() {
    return {
      ...super.getContainerClasses(),
      avatar: this.avatar,
      // Link chips cannot be disabled
      disabled: !this.href && (this.disabled || this.softDisabled),
      link: !!this.href,
      selected: this.selected,
      "has-trailing": !0
    };
  }
  renderPrimaryAction(e) {
    const { ariaLabel: t } = this;
    return this.href ? n`
        <a
          class="primary action"
          id="link"
          aria-label=${t || h}
          href=${this.href}
          target=${this.target || h}
          >${e}</a
        >
      ` : this.removeOnly ? n`
        <span class="primary action" aria-label=${t || h}>
          ${e}
        </span>
      ` : n`
      <button
        class="primary action"
        id="button"
        aria-label=${t || h}
        aria-disabled=${this.softDisabled || h}
        ?disabled=${this.disabled && !this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `;
  }
  renderTrailingAction(e) {
    return uo({
      focusListener: e,
      ariaLabel: this.ariaLabelRemove,
      disabled: !this.href && (this.disabled || this.softDisabled),
      tabbable: this.removeOnly
    });
  }
}
a([
  d({ type: Boolean })
], fe.prototype, "avatar", void 0);
a([
  d()
], fe.prototype, "href", void 0);
a([
  d()
], fe.prototype, "target", void 0);
a([
  d({ type: Boolean, attribute: "remove-only" })
], fe.prototype, "removeOnly", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], fe.prototype, "selected", void 0);
a([
  w(".trailing.action")
], fe.prototype, "trailingAction", void 0);
const Ta = f`:host{--_container-height: var(--md-input-chip-container-height, 32px);--_disabled-label-text-color: var(--md-input-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-input-chip-disabled-label-text-opacity, 0.38);--_disabled-selected-container-color: var(--md-input-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-input-chip-disabled-selected-container-opacity, 0.12);--_label-text-font: var(--md-input-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-input-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-input-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-input-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-container-color: var(--md-input-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-focus-label-text-color: var(--md-input-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-input-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-input-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-input-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-input-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-outline-width: var(--md-input-chip-selected-outline-width, 0px);--_selected-pressed-label-text-color: var(--md-input-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-input-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-opacity: var(--md-input-chip-selected-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-input-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-input-chip-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-input-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-input-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-input-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-input-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-input-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-input-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-input-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-input-chip-outline-width, 1px);--_pressed-label-text-color: var(--md-input-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-input-chip-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-input-chip-pressed-state-layer-opacity, 0.12);--_avatar-shape: var(--md-input-chip-avatar-shape, var(--md-sys-shape-corner-full, 9999px));--_avatar-size: var(--md-input-chip-avatar-size, 24px);--_disabled-avatar-opacity: var(--md-input-chip-disabled-avatar-opacity, 0.38);--_disabled-leading-icon-color: var(--md-input-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-input-chip-disabled-leading-icon-opacity, 0.38);--_icon-size: var(--md-input-chip-icon-size, 18px);--_selected-focus-leading-icon-color: var(--md-input-chip-selected-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-leading-icon-color: var(--md-input-chip-selected-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-leading-icon-color: var(--md-input-chip-selected-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-leading-icon-color: var(--md-input-chip-selected-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-input-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-input-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-input-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-input-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-input-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-input-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-input-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-input-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-input-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-input-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-input-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-input-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-input-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-input-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-input-chip-container-shape-start-start, var(--md-input-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-input-chip-container-shape-start-end, var(--md-input-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-input-chip-container-shape-end-end, var(--md-input-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-input-chip-container-shape-end-start, var(--md-input-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-input-chip-leading-space, 16px);--_trailing-space: var(--md-input-chip-trailing-space, 16px);--_icon-label-space: var(--md-input-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-input-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-input-chip-with-trailing-icon-trailing-space, 8px)}:host([avatar]){--_container-shape-start-start: var( --md-input-chip-container-shape-start-start, var(--md-input-chip-container-shape, calc(var(--_container-height) / 2)) );--_container-shape-start-end: var( --md-input-chip-container-shape-start-end, var(--md-input-chip-container-shape, calc(var(--_container-height) / 2)) );--_container-shape-end-end: var( --md-input-chip-container-shape-end-end, var(--md-input-chip-container-shape, calc(var(--_container-height) / 2)) );--_container-shape-end-start: var( --md-input-chip-container-shape-end-start, var(--md-input-chip-container-shape, calc(var(--_container-height) / 2)) )}.avatar .primary.action{padding-inline-start:4px}.avatar .leading.icon ::slotted(:first-child){border-radius:var(--_avatar-shape);height:var(--_avatar-size);width:var(--_avatar-size)}.disabled.avatar .leading.icon{opacity:var(--_disabled-avatar-opacity)}@media(forced-colors: active){.link .outline{border-color:ActiveText}.disabled.avatar .leading.icon{opacity:1}}
`;
let Ft = class extends fe {
};
Ft.styles = [
  vo,
  mo,
  fo,
  Ta
];
Ft = a([
  _("md-input-chip")
], Ft);
class ot extends b {
  constructor() {
    super(...arguments), this.inset = !1, this.insetStart = !1, this.insetEnd = !1;
  }
}
a([
  d({ type: Boolean, reflect: !0 })
], ot.prototype, "inset", void 0);
a([
  d({ type: Boolean, reflect: !0, attribute: "inset-start" })
], ot.prototype, "insetStart", void 0);
a([
  d({ type: Boolean, reflect: !0, attribute: "inset-end" })
], ot.prototype, "insetEnd", void 0);
const Sa = f`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;
let Bt = class extends ot {
};
Bt.styles = [Sa];
Bt = a([
  _("md-divider")
], Bt);
const qe = /* @__PURE__ */ Symbol("isFocusable"), pt = /* @__PURE__ */ Symbol("privateIsFocusable"), We = /* @__PURE__ */ Symbol("externalTabIndex"), je = /* @__PURE__ */ Symbol("isUpdatingTabIndex"), Ke = /* @__PURE__ */ Symbol("updateTabIndex");
function Ia(o) {
  var e, t, r;
  class i extends o {
    constructor() {
      super(...arguments), this[e] = !0, this[t] = null, this[r] = !1;
    }
    get [qe]() {
      return this[pt];
    }
    set [qe](l) {
      this[qe] !== l && (this[pt] = l, this[Ke]());
    }
    connectedCallback() {
      super.connectedCallback(), this[Ke]();
    }
    attributeChangedCallback(l, c, p) {
      if (l !== "tabindex") {
        super.attributeChangedCallback(l, c, p);
        return;
      }
      if (this.requestUpdate("tabIndex", Number(c ?? -1)), !this[je]) {
        if (!this.hasAttribute("tabindex")) {
          this[We] = null, this[Ke]();
          return;
        }
        this[We] = this.tabIndex;
      }
    }
    [(e = pt, t = We, r = je, Ke)]() {
      const l = this[qe] ? 0 : -1, c = this[We] ?? l;
      this[je] = !0, this.tabIndex = c, this[je] = !1;
    }
  }
  return a([
    d({ noAccessor: !0 })
  ], i.prototype, "tabIndex", void 0), i;
}
const bo = /* @__PURE__ */ Symbol("animateIndicator"), za = Ia(b);
class X extends za {
  /**
   * @deprecated use `active`
   */
  get selected() {
    return this.active;
  }
  set selected(e) {
    this.active = e;
  }
  constructor() {
    super(), this.isTab = !0, this.active = !1, this.hasIcon = !1, this.iconOnly = !1, this.fullWidthIndicator = !1, this.internals = // Cast needed for closure
    this.attachInternals(), S || (this.internals.role = "tab", this.addEventListener("keydown", this.handleKeydown.bind(this)));
  }
  render() {
    const e = n`<div class="indicator"></div>`;
    return n`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${H(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator ? h : e}
      </div>
      ${this.fullWidthIndicator ? e : h}
    </div>`;
  }
  getContentClasses() {
    return {
      "has-icon": this.hasIcon,
      "has-label": !this.iconOnly
    };
  }
  updated() {
    this.internals.ariaSelected = String(this.active);
  }
  async handleKeydown(e) {
    await 0, !e.defaultPrevented && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
  }
  handleContentClick(e) {
    e.stopPropagation(), this.click();
  }
  [bo](e) {
    if (!this.indicator)
      return;
    this.indicator.getAnimations().forEach((r) => {
      r.cancel();
    });
    const t = this.getKeyframes(e);
    t !== null && this.indicator.animate(t, {
      duration: 250,
      easing: Y.EMPHASIZED
    });
  }
  getKeyframes(e) {
    const t = Oa();
    if (!this.active)
      return t ? [{ opacity: 1 }, { transform: "none" }] : null;
    const r = {}, i = e.indicator?.getBoundingClientRect() ?? {}, s = i.left, l = i.width, c = this.indicator.getBoundingClientRect(), p = c.left, m = c.width, v = l / m;
    return !t && s !== void 0 && p !== void 0 && !isNaN(v) ? r.transform = `translateX(${(s - p).toFixed(4)}px) scaleX(${v.toFixed(4)})` : r.opacity = 0, [r, { transform: "none" }];
  }
  handleSlotChange() {
    this.iconOnly = !1;
    for (const e of this.assignedDefaultNodes) {
      const t = e.nodeType === Node.TEXT_NODE && !!e.wholeText.match(/\S/);
      if (e.nodeType === Node.ELEMENT_NODE || t)
        return;
    }
    this.iconOnly = !0;
  }
  handleIconSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
a([
  d({ type: Boolean, reflect: !0, attribute: "md-tab" })
], X.prototype, "isTab", void 0);
a([
  d({ type: Boolean, reflect: !0 })
], X.prototype, "active", void 0);
a([
  d({ type: Boolean })
], X.prototype, "selected", null);
a([
  d({ type: Boolean, attribute: "has-icon" })
], X.prototype, "hasIcon", void 0);
a([
  d({ type: Boolean, attribute: "icon-only" })
], X.prototype, "iconOnly", void 0);
a([
  w(".indicator")
], X.prototype, "indicator", void 0);
a([
  I()
], X.prototype, "fullWidthIndicator", void 0);
a([
  Fr({ flatten: !0 })
], X.prototype, "assignedDefaultNodes", void 0);
a([
  G({ slot: "icon", flatten: !0 })
], X.prototype, "assignedIcons", void 0);
function Oa() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
class xe extends b {
  /**
   * The currently selected tab, `null` only when there are no tab children.
   *
   * @export
   */
  get activeTab() {
    return this.tabs.find((e) => e.active) ?? null;
  }
  set activeTab(e) {
    e && this.activateTab(e);
  }
  /**
   * The index of the currently selected tab.
   *
   * @export
   */
  get activeTabIndex() {
    return this.tabs.findIndex((e) => e.active);
  }
  set activeTabIndex(e) {
    const t = () => {
      const r = this.tabs[e];
      r && this.activateTab(r);
    };
    if (!this.slotElement) {
      this.updateComplete.then(t);
      return;
    }
    t();
  }
  get focusedTab() {
    return this.tabs.find((e) => e.matches(":focus-within"));
  }
  constructor() {
    super(), this.autoActivate = !1, this.internals = // Cast needed for closure
    this.attachInternals(), S || (this.internals.role = "tablist", this.addEventListener("keydown", this.handleKeydown.bind(this)), this.addEventListener("keyup", this.handleKeyup.bind(this)), this.addEventListener("focusout", this.handleFocusout.bind(this)));
  }
  /**
   * Scrolls the toolbar, if overflowing, to the active tab, or the provided
   * tab.
   *
   * @param tabToScrollTo The tab that should be scrolled to. Defaults to the
   *     active tab.
   * @return A Promise that resolves after the tab has been scrolled to.
   */
  async scrollToTab(e) {
    await this.updateComplete;
    const { tabs: t } = this;
    if (e ??= this.activeTab, !e || !t.includes(e) || !this.tabsScrollerElement)
      return;
    for (const g of this.tabs)
      await g.updateComplete;
    const r = e.offsetLeft, i = e.offsetWidth, s = this.scrollLeft, l = this.offsetWidth, c = 48, p = r - c, m = r + i - l + c, v = Math.min(p, Math.max(m, s)), u = this.focusedTab ? "auto" : "instant";
    this.tabsScrollerElement.scrollTo({ behavior: u, top: 0, left: v });
  }
  render() {
    return n`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `;
  }
  async handleTabClick(e) {
    const t = e.target;
    await 0, !(e.defaultPrevented || !Ra(t) || t.active) && this.activateTab(t);
  }
  activateTab(e) {
    const { tabs: t } = this, r = this.activeTab;
    if (!(!t.includes(e) || r === e)) {
      for (const i of t)
        i.active = i === e;
      if (r) {
        if (!this.dispatchEvent(new Event("change", { bubbles: !0, cancelable: !0 }))) {
          for (const s of t)
            s.active = s === r;
          return;
        }
        e[bo](r);
      }
      this.updateFocusableTab(e), this.scrollToTab(e);
    }
  }
  updateFocusableTab(e) {
    for (const t of this.tabs)
      t.tabIndex = t === e ? 0 : -1;
  }
  // focus item on keydown and optionally select it
  async handleKeydown(e) {
    await 0;
    const t = e.key === "ArrowLeft", r = e.key === "ArrowRight", i = e.key === "Home", s = e.key === "End";
    if (e.defaultPrevented || !t && !r && !i && !s)
      return;
    const { tabs: l } = this;
    if (l.length < 2)
      return;
    e.preventDefault();
    let c;
    if (i || s)
      c = i ? 0 : l.length - 1;
    else {
      const v = getComputedStyle(this).direction === "rtl" ? t : r, { focusedTab: u } = this;
      if (!u)
        c = v ? 0 : l.length - 1;
      else {
        const g = this.tabs.indexOf(u);
        c = v ? g + 1 : g - 1, c >= l.length ? c = 0 : c < 0 && (c = l.length - 1);
      }
    }
    const p = l[c];
    p.focus(), this.autoActivate ? this.activateTab(p) : this.updateFocusableTab(p);
  }
  // scroll to item on keyup.
  handleKeyup() {
    this.scrollToTab(this.focusedTab ?? this.activeTab);
  }
  handleFocusout() {
    if (this.matches(":focus-within"))
      return;
    const { activeTab: e } = this;
    e && this.updateFocusableTab(e);
  }
  handleSlotChange() {
    const e = this.tabs[0];
    !this.activeTab && e && this.activateTab(e), this.scrollToTab(this.activeTab);
  }
}
a([
  G({ flatten: !0, selector: "[md-tab]" })
], xe.prototype, "tabs", void 0);
a([
  d({ type: Number, attribute: "active-tab-index" })
], xe.prototype, "activeTabIndex", null);
a([
  d({ type: Boolean, attribute: "auto-activate" })
], xe.prototype, "autoActivate", void 0);
a([
  w(".tabs")
], xe.prototype, "tabsScrollerElement", void 0);
a([
  w("slot")
], xe.prototype, "slotElement", void 0);
function Ra(o) {
  return o instanceof HTMLElement && o.hasAttribute("md-tab");
}
const Da = f`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;
let Nt = class extends xe {
};
Nt.styles = [Da];
Nt = a([
  _("md-tabs")
], Nt);
class go extends X {
  constructor() {
    super(...arguments), this.inlineIcon = !1;
  }
  getContentClasses() {
    return {
      ...super.getContentClasses(),
      stacked: !this.inlineIcon
    };
  }
}
a([
  d({ type: Boolean, attribute: "inline-icon" })
], go.prototype, "inlineIcon", void 0);
const La = f`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;
const yo = f`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;
let Ut = class extends go {
};
Ut.styles = [yo, La];
Ut = a([
  _("md-primary-tab")
], Ut);
class Pa extends X {
  constructor() {
    super(...arguments), this.fullWidthIndicator = !0;
  }
}
const Ma = f`:host{--_active-indicator-color: var(--md-secondary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-secondary-tab-active-indicator-height, 2px);--_active-label-text-color: var(--md-secondary-tab-active-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-color: var(--md-secondary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-secondary-tab-container-elevation, 0);--_container-height: var(--md-secondary-tab-container-height, 48px);--_focus-label-text-color: var(--md-secondary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-secondary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-secondary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-secondary-tab-hover-state-layer-opacity, 0.08);--_label-text-font: var(--md-secondary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-secondary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-secondary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-secondary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-secondary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-secondary-tab-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-secondary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-secondary-tab-active-focus-icon-color, );--_active-focus-label-text-color: var(--md-secondary-tab-active-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-icon-color: var(--md-secondary-tab-active-hover-icon-color, );--_active-hover-label-text-color: var(--md-secondary-tab-active-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-state-layer-color: var(--md-secondary-tab-active-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-state-layer-opacity: var(--md-secondary-tab-active-hover-state-layer-opacity, 0.08);--_active-icon-color: var(--md-secondary-tab-active-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_active-indicator-shape: var(--md-secondary-tab-active-indicator-shape, 0);--_active-pressed-icon-color: var(--md-secondary-tab-active-pressed-icon-color, );--_active-pressed-label-text-color: var(--md-secondary-tab-active-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-pressed-state-layer-color: var(--md-secondary-tab-active-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-pressed-state-layer-opacity: var(--md-secondary-tab-active-pressed-state-layer-opacity, 0.12);--_label-text-color: var(--md-secondary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-icon-color: var(--md-secondary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-secondary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-size: var(--md-secondary-tab-icon-size, 24px);--_icon-color: var(--md-secondary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-secondary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-secondary-tab-container-shape-start-start, var(--md-secondary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-secondary-tab-container-shape-start-end, var(--md-secondary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-secondary-tab-container-shape-end-end, var(--md-secondary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-secondary-tab-container-shape-end-start, var(--md-secondary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}
`;
let Vt = class extends Pa {
};
Vt.styles = [yo, Ma];
Vt = a([
  _("md-secondary-tab")
], Vt);
const Fa = {
  dialog: [
    [
      // Dialog slide down
      [{ transform: "translateY(-50px)" }, { transform: "translateY(0)" }],
      { duration: 500, easing: Y.EMPHASIZED }
    ]
  ],
  scrim: [
    [
      // Scrim fade in
      [{ opacity: 0 }, { opacity: 0.32 }],
      { duration: 500, easing: "linear" }
    ]
  ],
  container: [
    [
      // Container fade in
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 50, easing: "linear", pseudoElement: "::before" }
    ],
    [
      // Container grow
      // Note: current spec says to grow from 0dp->100% and shrink from
      // 100%->35%. We change this to 35%->100% to simplify the animation that
      // is supposed to clip content as it grows. From 0dp it's possible to see
      // text/actions appear before the container has fully grown.
      [{ height: "35%" }, { height: "100%" }],
      { duration: 500, easing: Y.EMPHASIZED, pseudoElement: "::before" }
    ]
  ],
  headline: [
    [
      // Headline fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
      { duration: 250, easing: "linear", fill: "forwards" }
    ]
  ],
  content: [
    [
      // Content fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
      { duration: 250, easing: "linear", fill: "forwards" }
    ]
  ],
  actions: [
    [
      // Actions fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }],
      { duration: 300, easing: "linear", fill: "forwards" }
    ]
  ]
}, Ba = {
  dialog: [
    [
      // Dialog slide up
      [{ transform: "translateY(0)" }, { transform: "translateY(-50px)" }],
      { duration: 150, easing: Y.EMPHASIZED_ACCELERATE }
    ]
  ],
  scrim: [
    [
      // Scrim fade out
      [{ opacity: 0.32 }, { opacity: 0 }],
      { duration: 150, easing: "linear" }
    ]
  ],
  container: [
    [
      // Container shrink
      [{ height: "100%" }, { height: "35%" }],
      {
        duration: 150,
        easing: Y.EMPHASIZED_ACCELERATE,
        pseudoElement: "::before"
      }
    ],
    [
      // Container fade out
      [{ opacity: "1" }, { opacity: "0" }],
      { delay: 100, duration: 50, easing: "linear", pseudoElement: "::before" }
    ]
  ],
  headline: [
    [
      // Headline fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: "linear", fill: "forwards" }
    ]
  ],
  content: [
    [
      // Content fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: "linear", fill: "forwards" }
    ]
  ],
  actions: [
    [
      // Actions fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: "linear", fill: "forwards" }
    ]
  ]
};
const Na = ee(b);
class O extends Na {
  // We do not use `delegatesFocus: true` due to a Chromium bug with
  // selecting text.
  // See https://bugs.chromium.org/p/chromium/issues/detail?id=950357
  /**
   * Opens the dialog when set to `true` and closes it when set to `false`.
   */
  get open() {
    return this.isOpen;
  }
  set open(e) {
    e !== this.isOpen && (this.isOpen = e, e ? (this.setAttribute("open", ""), this.show()) : (this.removeAttribute("open"), this.close()));
  }
  constructor() {
    super(), this.quick = !1, this.returnValue = "", this.noFocusTrap = !1, this.getOpenAnimation = () => Fa, this.getCloseAnimation = () => Ba, this.isOpen = !1, this.isOpening = !1, this.isConnectedPromise = this.getIsConnectedPromise(), this.isAtScrollTop = !1, this.isAtScrollBottom = !1, this.nextClickIsFromContent = !1, this.hasHeadline = !1, this.hasActions = !1, this.hasIcon = !1, this.escapePressedWithoutCancel = !1, this.treewalker = S ? null : document.createTreeWalker(this, NodeFilter.SHOW_ELEMENT), S || this.addEventListener("submit", this.handleSubmit);
  }
  /**
   * Opens the dialog and fires a cancelable `open` event. After a dialog's
   * animation, an `opened` event is fired.
   *
   * Add an `autofocus` attribute to a child of the dialog that should
   * receive focus after opening.
   *
   * @return A Promise that resolves after the animation is finished and the
   *     `opened` event was fired.
   */
  async show() {
    this.isOpening = !0, await this.isConnectedPromise, await this.updateComplete;
    const e = this.dialog;
    if (e.open || !this.isOpening) {
      this.isOpening = !1;
      return;
    }
    if (!this.dispatchEvent(new Event("open", { cancelable: !0 }))) {
      this.open = !1, this.isOpening = !1;
      return;
    }
    e.showModal(), this.open = !0, this.scroller && (this.scroller.scrollTop = 0), this.querySelector("[autofocus]")?.focus(), await this.animateDialog(this.getOpenAnimation()), this.dispatchEvent(new Event("opened")), this.isOpening = !1;
  }
  /**
   * Closes the dialog and fires a cancelable `close` event. After a dialog's
   * animation, a `closed` event is fired.
   *
   * @param returnValue A return value usually indicating which button was used
   *     to close a dialog. If a dialog is canceled by clicking the scrim or
   *     pressing Escape, it will not change the return value after closing.
   * @return A Promise that resolves after the animation is finished and the
   *     `closed` event was fired.
   */
  async close(e = this.returnValue) {
    if (this.isOpening = !1, !this.isConnected) {
      this.open = !1;
      return;
    }
    await this.updateComplete;
    const t = this.dialog;
    if (!t.open || this.isOpening) {
      this.open = !1;
      return;
    }
    const r = this.returnValue;
    if (this.returnValue = e, !this.dispatchEvent(new Event("close", { cancelable: !0 }))) {
      this.returnValue = r;
      return;
    }
    await this.animateDialog(this.getCloseAnimation()), t.close(e), this.open = !1, this.dispatchEvent(new Event("closed"));
  }
  connectedCallback() {
    super.connectedCallback(), this.isConnectedPromiseResolve();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.isConnectedPromise = this.getIsConnectedPromise();
  }
  render() {
    const e = this.open && !(this.isAtScrollTop && this.isAtScrollBottom), t = {
      "has-headline": this.hasHeadline,
      "has-actions": this.hasActions,
      "has-icon": this.hasIcon,
      scrollable: e,
      "show-top-divider": e && !this.isAtScrollTop,
      "show-bottom-divider": e && !this.isAtScrollBottom
    }, r = this.open && !this.noFocusTrap, i = n`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `, { ariaLabel: s } = this;
    return n`
      <div class="scrim"></div>
      <dialog
        class=${H(t)}
        aria-label=${s || h}
        aria-labelledby=${this.hasHeadline ? "headline" : h}
        role=${this.type === "alert" ? "alertdialog" : h}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue || h}>
        ${r ? i : h}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline || h}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${r ? i : h}
      </dialog>
    `;
  }
  firstUpdated() {
    this.intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        this.handleAnchorIntersection(t);
    }, { root: this.scroller }), this.intersectionObserver.observe(this.topAnchor), this.intersectionObserver.observe(this.bottomAnchor);
  }
  handleDialogClick() {
    if (this.nextClickIsFromContent) {
      this.nextClickIsFromContent = !1;
      return;
    }
    this.dispatchEvent(new Event("cancel", { cancelable: !0 })) && this.close();
  }
  handleContentClick() {
    this.nextClickIsFromContent = !0;
  }
  handleSubmit(e) {
    const t = e.target, { submitter: r } = e;
    t.getAttribute("method") !== "dialog" || !r || this.close(r.getAttribute("value") ?? this.returnValue);
  }
  handleCancel(e) {
    if (e.target !== this.dialog)
      return;
    this.escapePressedWithoutCancel = !1;
    const t = !Oe(this, e);
    e.preventDefault(), !t && this.close();
  }
  handleClose() {
    this.escapePressedWithoutCancel && (this.escapePressedWithoutCancel = !1, this.dialog?.dispatchEvent(new Event("cancel", { cancelable: !0 })));
  }
  handleKeydown(e) {
    e.key === "Escape" && (this.escapePressedWithoutCancel = !0, setTimeout(() => {
      this.escapePressedWithoutCancel = !1;
    }));
  }
  async animateDialog(e) {
    if (this.cancelAnimations?.abort(), this.cancelAnimations = new AbortController(), this.quick)
      return;
    const { dialog: t, scrim: r, container: i, headline: s, content: l, actions: c } = this;
    if (!t || !r || !i || !s || !l || !c)
      return;
    const { container: p, dialog: m, scrim: v, headline: u, content: g, actions: x } = e, E = [
      [t, m ?? []],
      [r, v ?? []],
      [i, p ?? []],
      [s, u ?? []],
      [l, g ?? []],
      [c, x ?? []]
    ], $ = [];
    for (const [A, R] of E)
      for (const k of R) {
        const P = A.animate(...k);
        this.cancelAnimations.signal.addEventListener("abort", () => {
          P.cancel();
        }), $.push(P);
      }
    await Promise.all($.map((A) => A.finished.catch(() => {
    })));
  }
  handleHeadlineChange(e) {
    const t = e.target;
    this.hasHeadline = t.assignedElements().length > 0;
  }
  handleActionsChange(e) {
    const t = e.target;
    this.hasActions = t.assignedElements().length > 0;
  }
  handleIconChange(e) {
    const t = e.target;
    this.hasIcon = t.assignedElements().length > 0;
  }
  handleAnchorIntersection(e) {
    const { target: t, isIntersecting: r } = e;
    t === this.topAnchor && (this.isAtScrollTop = r), t === this.bottomAnchor && (this.isAtScrollBottom = r);
  }
  getIsConnectedPromise() {
    return new Promise((e) => {
      this.isConnectedPromiseResolve = e;
    });
  }
  handleFocusTrapFocus(e) {
    const [t, r] = this.getFirstAndLastFocusableChildren();
    if (!t || !r) {
      this.dialog?.focus();
      return;
    }
    const i = e.target === this.firstFocusTrap, s = !i, l = e.relatedTarget === t, c = e.relatedTarget === r, p = !l && !c;
    if (s && c || i && p) {
      t.focus();
      return;
    }
    if (i && l || s && p) {
      r.focus();
      return;
    }
  }
  getFirstAndLastFocusableChildren() {
    if (!this.treewalker)
      return [null, null];
    let e = null, t = null;
    for (this.treewalker.currentNode = this.treewalker.root; this.treewalker.nextNode(); ) {
      const r = this.treewalker.currentNode;
      Ua(r) && (e || (e = r), t = r);
    }
    return [e, t];
  }
}
a([
  d({ type: Boolean })
], O.prototype, "open", null);
a([
  d({ type: Boolean })
], O.prototype, "quick", void 0);
a([
  d({ attribute: !1 })
], O.prototype, "returnValue", void 0);
a([
  d()
], O.prototype, "type", void 0);
a([
  d({ type: Boolean, attribute: "no-focus-trap" })
], O.prototype, "noFocusTrap", void 0);
a([
  w("dialog")
], O.prototype, "dialog", void 0);
a([
  w(".scrim")
], O.prototype, "scrim", void 0);
a([
  w(".container")
], O.prototype, "container", void 0);
a([
  w(".headline")
], O.prototype, "headline", void 0);
a([
  w(".content")
], O.prototype, "content", void 0);
a([
  w(".actions")
], O.prototype, "actions", void 0);
a([
  I()
], O.prototype, "isAtScrollTop", void 0);
a([
  I()
], O.prototype, "isAtScrollBottom", void 0);
a([
  w(".scroller")
], O.prototype, "scroller", void 0);
a([
  w(".top.anchor")
], O.prototype, "topAnchor", void 0);
a([
  w(".bottom.anchor")
], O.prototype, "bottomAnchor", void 0);
a([
  w(".focus-trap")
], O.prototype, "firstFocusTrap", void 0);
a([
  I()
], O.prototype, "hasHeadline", void 0);
a([
  I()
], O.prototype, "hasActions", void 0);
a([
  I()
], O.prototype, "hasIcon", void 0);
function Ua(o) {
  const e = ":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])", t = ":not(:disabled,[disabled])";
  return o.matches(e + t + ':not([tabindex^="-"])') ? !0 : !o.localName.includes("-") || !o.matches(t) ? !1 : o.shadowRoot?.delegatesFocus ?? !1;
}
const Va = f`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;
let Ht = class extends O {
};
Ht.styles = [Va];
Ht = a([
  _("md-dialog")
], Ht);
const Ha = ee(b);
class _e extends Ha {
  constructor() {
    super(...arguments), this.value = 0, this.max = 1, this.indeterminate = !1, this.fourColor = !1;
  }
  render() {
    const { ariaLabel: e } = this;
    return n`
      <div
        class="progress ${H(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e || h}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? h : this.value}
        >${this.renderIndicator()}</div
      >
    `;
  }
  getRenderClasses() {
    return {
      indeterminate: this.indeterminate,
      "four-color": this.fourColor
    };
  }
}
a([
  d({ type: Number })
], _e.prototype, "value", void 0);
a([
  d({ type: Number })
], _e.prototype, "max", void 0);
a([
  d({ type: Boolean })
], _e.prototype, "indeterminate", void 0);
a([
  d({ type: Boolean, attribute: "four-color" })
], _e.prototype, "fourColor", void 0);
class qa extends _e {
  renderIndicator() {
    return this.indeterminate ? this.renderIndeterminateContainer() : this.renderDeterminateContainer();
  }
  // Determinate mode is rendered with an svg so the progress arc can be
  // easily animated via stroke-dashoffset.
  renderDeterminateContainer() {
    const e = (1 - this.value / this.max) * 100;
    return n`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `;
  }
  // Indeterminate mode rendered with 2 bordered-divs. The borders are
  // clipped into half circles by their containers. The divs are then carefully
  // animated to produce changes to the spinner arc size.
  // This approach has 4.5x the FPS of rendering via svg on Chrome 111.
  // See https://lit.dev/playground/#gist=febb773565272f75408ab06a0eb49746.
  renderIndeterminateContainer() {
    return n` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`;
  }
}
const Wa = f`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;
let qt = class extends qa {
};
qt.styles = [Wa];
qt = a([
  _("md-circular-progress")
], qt);
class xo extends _e {
  constructor() {
    super(...arguments), this.buffer = 0;
  }
  // Note, the indeterminate animation is rendered with transform %'s
  // Previously, this was optimized to use px calculated with the resizeObserver
  // due to a now fixed Chrome bug: crbug.com/389359.
  renderIndicator() {
    const e = {
      transform: `scaleX(${(this.indeterminate ? 1 : this.value / this.max) * 100}%)`
    }, t = this.buffer ?? 0, r = t > 0, s = {
      transform: `scaleX(${(this.indeterminate || !r ? 1 : t / this.max) * 100}%)`
    }, l = this.indeterminate || !r || t >= this.max || this.value >= this.max;
    return n`
      <div class="dots" ?hidden=${l}></div>
      <div class="inactive-track" style=${ye(s)}></div>
      <div class="bar primary-bar" style=${ye(e)}>
        <div class="bar-inner"></div>
      </div>
      <div class="bar secondary-bar">
        <div class="bar-inner"></div>
      </div>
    `;
  }
}
a([
  d({ type: Number })
], xo.prototype, "buffer", void 0);
const ja = f`:host{--_active-indicator-color: var(--md-linear-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-linear-progress-active-indicator-height, 4px);--_four-color-active-indicator-four-color: var(--md-linear-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-linear-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-linear-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-linear-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_track-color: var(--md-linear-progress-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_track-height: var(--md-linear-progress-track-height, 4px);--_track-shape: var(--md-linear-progress-track-shape, var(--md-sys-shape-corner-none, 0px));border-radius:var(--_track-shape);display:flex;position:relative;min-width:80px;height:var(--_track-height);content-visibility:auto;contain:strict}.progress,.dots,.inactive-track,.bar,.bar-inner{position:absolute}.progress{direction:ltr;inset:0;border-radius:inherit;overflow:hidden;display:flex;align-items:center}.bar{animation:none;width:100%;height:var(--_active-indicator-height);transform-origin:left center;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1)}.secondary-bar{display:none}.bar-inner{inset:0;animation:none;background:var(--_active-indicator-color)}.inactive-track{background:var(--_track-color);inset:0;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1);transform-origin:left center}.dots{inset:0;animation:linear infinite 250ms;animation-name:buffering;background-color:var(--_track-color);background-repeat:repeat-x;-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");z-index:-1}.dots[hidden]{display:none}.indeterminate .bar{transition:none}.indeterminate .primary-bar{inset-inline-start:-145.167%}.indeterminate .secondary-bar{inset-inline-start:-54.8889%;display:block}.indeterminate .primary-bar{animation:linear infinite 2s;animation-name:primary-indeterminate-translate}.indeterminate .primary-bar>.bar-inner{animation:linear infinite 2s primary-indeterminate-scale}.indeterminate.four-color .primary-bar>.bar-inner{animation-name:primary-indeterminate-scale,four-color;animation-duration:2s,4s}.indeterminate .secondary-bar{animation:linear infinite 2s;animation-name:secondary-indeterminate-translate}.indeterminate .secondary-bar>.bar-inner{animation:linear infinite 2s secondary-indeterminate-scale}.indeterminate.four-color .secondary-bar>.bar-inner{animation-name:secondary-indeterminate-scale,four-color;animation-duration:2s,4s}:host(:dir(rtl)){transform:scale(-1)}@keyframes primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes buffering{0%{transform:translateX(calc(var(--_track-height) / 2 * 5))}}@keyframes primary-indeterminate-translate{0%{transform:translateX(0px)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0px)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.6714%)}100%{transform:translateX(200.611%)}}@keyframes secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0px)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.6519%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.3862%)}100%{transform:translateX(160.278%)}}@keyframes four-color{0%{background:var(--_four-color-active-indicator-one-color)}15%{background:var(--_four-color-active-indicator-one-color)}25%{background:var(--_four-color-active-indicator-two-color)}40%{background:var(--_four-color-active-indicator-two-color)}50%{background:var(--_four-color-active-indicator-three-color)}65%{background:var(--_four-color-active-indicator-three-color)}75%{background:var(--_four-color-active-indicator-four-color)}90%{background:var(--_four-color-active-indicator-four-color)}100%{background:var(--_four-color-active-indicator-one-color)}}@media(forced-colors: active){:host{outline:1px solid CanvasText}.bar-inner,.dots{background-color:CanvasText}}
`;
let Wt = class extends xo {
};
Wt.styles = [ja];
Wt = a([
  _("md-linear-progress")
], Wt);
class dr extends b {
  render() {
    return n`
      <md-elevation part="elevation"></md-elevation>
      <div class="background"></div>
      <slot></slot>
      <div class="outline"></div>
    `;
  }
}
const Ka = f`:host{--_container-color: var(--md-elevated-card-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_container-elevation: var(--md-elevated-card-container-elevation, 1);--_container-shadow-color: var(--md-elevated-card-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-elevated-card-container-shape, var(--md-sys-shape-corner-medium, 12px))}
`;
const cr = f`:host{border-radius:var(--_container-shape);box-sizing:border-box;display:flex;flex-direction:column;position:relative;z-index:0}md-elevation,.background,.outline{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color);z-index:-1}.outline{border:1px solid rgba(0,0,0,0);z-index:1}md-elevation{z-index:-1;--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}slot{border-radius:inherit}
`;
let jt = class extends dr {
};
jt.styles = [cr, Ka];
jt = a([
  _("md-elevated-card")
], jt);
const Ya = f`:host{--_container-color: var(--md-filled-card-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_container-elevation: var(--md-filled-card-container-elevation, 0);--_container-shadow-color: var(--md-filled-card-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-filled-card-container-shape, var(--md-sys-shape-corner-medium, 12px))}
`;
let Kt = class extends dr {
};
Kt.styles = [cr, Ya];
Kt = a([
  _("md-filled-card")
], Kt);
const Ga = f`:host{--_container-color: var(--md-outlined-card-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-outlined-card-container-elevation, 0);--_container-shadow-color: var(--md-outlined-card-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-outlined-card-container-shape, var(--md-sys-shape-corner-medium, 12px));--_outline-color: var(--md-outlined-card-outline-color, var(--md-sys-color-outline-variant, #cac4d0));--_outline-width: var(--md-outlined-card-outline-width, 1px)}.outline{border-color:var(--_outline-color);border-width:var(--_outline-width)}
`;
let Yt = class extends dr {
};
Yt.styles = [cr, Ga];
Yt = a([
  _("md-outlined-card")
], Yt);
class Xa extends b {
  static properties = {
    label: { type: String },
    active: { type: Boolean, reflect: !0 },
    count: { type: Number }
  };
  static styles = f`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid var(--md-sys-color-outline-variant, #e5e7eb);
      background-color: transparent;
      color: var(--md-sys-color-on-surface-variant, #64748b);
      user-select: none;
      white-space: nowrap;
      flex-shrink: 0;
    }

    :host(:hover:not([active])) {
      color: var(--md-sys-color-on-surface, #1f2937);
      background-color: var(--md-sys-color-surface-variant, #f9fafb);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--md-sys-color-primary, #2C4C3B);
      outline-offset: 2px;
    }

    :host([active]) {
      background-color: var(--md-sys-color-primary, #2C4C3B);
      color: var(--md-sys-color-on-primary, #FFFFFF);
      border-color: transparent;
      font-weight: 500;
    }

    .count {
      opacity: 0.7;
      font-size: 10px;
    }

    :host([active]) .count {
      opacity: 0.85;
    }
  `;
  render() {
    return n`
      <span>${this.label}</span>
      ${this.count !== void 0 ? n`<span class="count">(${this.count})</span>` : ""}
    `;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "button"), this.setAttribute("tabindex", "0"), this.addEventListener("keydown", this._handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeydown);
  }
  _handleKeydown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
  }
}
customElements.define("wy-filter-chip", Xa);
class Za extends b {
  static properties = {
    viewMode: { type: String, attribute: "view-mode" },
    showDetails: { type: Boolean, attribute: "show-details" },
    activeCategory: { type: String, attribute: "active-category" },
    categories: { type: Array },
    searchValue: { type: String, attribute: "search-value" }
  };
  constructor() {
    super(), this.viewMode = "grid", this.showDetails = !1, this.activeCategory = "all", this.categories = ["Productivity", "Expertise", "Travel & Shopping"], this.searchValue = "";
  }
  static styles = f`
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: block;
      background-color: var(--wy-controls-bar-bg, transparent);
      border-bottom: var(--wy-controls-bar-border, none);
      padding: var(--wy-controls-bar-padding, 8px 32px);
      box-sizing: border-box;
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-variation-settings:
        'FILL' var(--wy-controls-icon-fill, 0),
        'wght' var(--wy-controls-icon-weight, 300),
        'GRAD' var(--wy-controls-icon-grad, 0),
        'opsz' var(--wy-controls-icon-opsz, 24);
      font-size: var(--wy-controls-icon-size, 24px);
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    .controls-container {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 12px;
      max-width: 1600px;
      margin: 0 auto;
    }

    /* Search Section */
    .search-section {
      flex: 0 0 auto;
      width: 192px;
      position: relative;
    }

    .search-input {
      width: 100%;
      height: 32px;
      background-color: var(--wy-controls-search-bg, #f3f4f6);
      border: 1px solid transparent;
      border-radius: 9999px;
      padding: 0 12px 0 36px;
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface, #1f2937);
      box-sizing: border-box;
      transition: all 0.2s;
    }

    .search-input::placeholder {
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
    }

    .search-input:focus {
      outline: none;
      background-color: var(--md-sys-color-surface, #fff);
      border-color: color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 20%, transparent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--md-sys-color-primary, #2C4C3B) 20%, transparent);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
      pointer-events: none;
    }

    .search-input:focus + .search-icon {
      color: var(--md-sys-color-primary, #2C4C3B);
    }

    /* Divider */
    .divider {
      width: 1px;
      height: 24px;
      background-color: var(--md-sys-color-outline-variant, #e5e7eb);
      flex-shrink: 0;
    }

    /* Toggle Section */
    .toggle-section {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }

    /* View Toggle */
    .view-toggle {
      background-color: var(--wy-controls-toggle-bg, #f3f4f6);
      border-radius: 8px;
      display: flex;
      padding: 2px;
    }

    .view-btn {
      border: none;
      background: transparent;
      height: 28px;
      width: 28px;
      padding: 0;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-on-surface-variant, #9ca3af);
      transition: all 0.15s;
    }

    .view-btn:hover:not(.active) {
      color: var(--md-sys-color-on-surface, #1f2937);
    }

    .view-btn.active {
      background-color: var(--md-sys-color-surface, #fff);
      color: var(--md-sys-color-primary, #2C4C3B);
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px var(--md-sys-color-outline-variant, #e5e7eb);
    }

    .view-btn .material-symbols-outlined,
    .view-btn md-icon {
      font-size: 16px;
      --md-icon-size: 16px;
    }

    /* Details Toggle */
    .details-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .toggle-switch {
      position: relative;
      width: 32px;
      height: 16px;
      background-color: var(--wy-controls-switch-off, #e5e7eb);
      border-radius: 9999px;
      transition: background-color 0.2s;
    }

    .toggle-switch.on {
      background-color: var(--md-sys-color-primary, #2C4C3B);
    }

    .toggle-switch::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }

    .toggle-switch.on::after {
      transform: translateX(16px);
    }

    .toggle-label {
      font-family: var(--font-body, 'DM Sans', sans-serif);
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--md-sys-color-on-surface-variant, #64748b);
    }

    /* Category Section */
    .category-section {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      flex: 1;
      padding: 2px 0;
      -ms-overflow-style: none;
      scrollbar-width: none;
      mask-image: linear-gradient(to right, black 90%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
    }

    .category-section::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 768px) {
      .controls-container {
        flex-wrap: wrap;
        gap: 8px;
      }

      .search-section {
        width: 100%;
        order: -1;
      }

      .divider {
        display: none;
      }

      .toggle-section {
        gap: 12px;
      }

      .category-section {
        width: 100%;
        order: 1;
      }
    }
  `;
  render() {
    return n`
      <div class="controls-container" part="controls-container">
        <div class="search-section">
          <input
            type="search"
            class="search-input"
            placeholder="Search prompts..."
            .value="${this.searchValue}"
            @input="${this._handleSearch}"
          >
          <span class="material-symbols-outlined search-icon">search</span>
        </div>

        <div class="divider"></div>

        <div class="toggle-section">
          <div class="view-toggle">
            <button
              class="view-btn ${this.viewMode === "list" ? "active" : ""}"
              @click="${() => this._setViewMode("list")}"
              aria-label="List view"
            >
              <span class="material-symbols-outlined">format_list_bulleted</span>
            </button>
            <button
              class="view-btn ${this.viewMode === "grid" ? "active" : ""}"
              @click="${() => this._setViewMode("grid")}"
              aria-label="Grid view"
            >
              <span class="material-symbols-outlined">grid_view</span>
            </button>
          </div>

          <label class="details-toggle" @click="${this._toggleDetails}">
            <div class="toggle-switch ${this.showDetails ? "on" : ""}"></div>
            <span class="toggle-label">Descriptions</span>
          </label>
        </div>

        <div class="divider"></div>

        <div class="category-section">
          <wy-filter-chip
            label="All"
            ?active="${this.activeCategory === "all"}"
            @click="${() => this._setCategory("all")}"
          ></wy-filter-chip>
          ${this.categories.map((e) => n`
            <wy-filter-chip
              label="${e}"
              ?active="${this.activeCategory === e}"
              @click="${() => this._setCategory(e)}"
            ></wy-filter-chip>
          `)}
        </div>
      </div>
    `;
  }
  _handleSearch(e) {
    this.searchValue = e.target.value, this._notifyChange();
  }
  _setViewMode(e) {
    this.viewMode = e, this._notifyChange();
  }
  _toggleDetails() {
    this.showDetails = !this.showDetails, this._notifyChange();
  }
  _setCategory(e) {
    this.activeCategory = e, this._notifyChange();
  }
  _notifyChange() {
    this.dispatchEvent(new CustomEvent("filter-change", {
      detail: {
        search: this.searchValue,
        viewMode: this.viewMode,
        showDetails: this.showDetails,
        category: this.activeCategory
      },
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("wy-controls-bar", Za);
class Ja extends b {
  static properties = {
    open: { type: Boolean, reflect: !0 },
    heading: { type: String },
    maxWidth: { type: String, attribute: "max-width" },
    fullScreen: { type: Boolean, attribute: "full-screen" }
  };
  constructor() {
    super(), this.open = !1, this.heading = "", this.maxWidth = "560px", this.fullScreen = !1;
  }
  static styles = f`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :host {
      display: block;
    }

    /* Wrap md-dialog to override its internals if needed, 
       but primarily use CSS variables for styling. */
    md-dialog {
      --md-dialog-container-color: var(--md-sys-color-surface);
      --md-dialog-container-shape: 28px;
    }

    /* Soft Modernism Detail: Surface border instead of heavy shadow */
    md-dialog::part(container) {
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    /* Custom slide-up animation overrides for md-dialog */
    /* Note: md-dialog uses standard M3 transitions, 
       we'll inject specific timing for 'Soft Modernism' */
    
    
    ::slotted(.headline-text) {
      font-family: 'Playfair Display', serif !important;
      font-size: 1.75rem !important;
      color: var(--md-sys-color-primary) !important;
      margin: 0 !important;
      padding-top: 24px !important;
      padding-bottom: 8px !important;
      display: block !important;
    }

    .modal-content {
      padding: 12px 4px 24px 4px;
      font-family: var(--font-body);
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .footer-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      width: 100%;
      padding-bottom: 16px;
      padding-top: 8px;
    }

    /* Ensure buttons in footer are capsule-shaped */
    ::slotted(md-filled-button),
    ::slotted(md-outlined-button),
    ::slotted(md-text-button) {
      /* Radius is already global, but ensure layout space */
    }

    @media (max-width: 600px) {
      md-dialog {
        --md-dialog-container-max-width: 100vw;
        --md-dialog-container-max-height: 100vh;
        --md-dialog-container-shape: 28px 28px 0 0;
        margin: 0;
        align-self: flex-end;
      }
    }
  `;
  render() {
    return n`
      <md-dialog 
        ?open="${this.open}"
        @close="${this._handleClose}"
        @cancel="${this._handleCancel}"
        style="--md-dialog-container-max-width: ${this.maxWidth}"
      >
        <div slot="headline" class="headline-text">
          ${this.heading}
        </div>
        <form slot="content" method="dialog" class="modal-content">
          <slot></slot>
        </form>
        <div slot="actions" class="footer-actions">
          <slot name="actions"></slot>
        </div>
      </md-dialog>
    `;
  }
  show() {
    this.open = !0;
  }
  close() {
    this.open = !1;
  }
  _handleClose(e) {
    this.open = !1, this.dispatchEvent(new CustomEvent("close", {
      detail: e.detail,
      bubbles: !0,
      composed: !0
    }));
  }
  _handleCancel(e) {
    this.open = !1;
  }
}
customElements.define("wy-modal", Ja);
class Qa extends b {
  static properties = {
    activeTab: { type: String, attribute: "active-tab" }
  };
  static styles = f`
    :host {
      display: block;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    .tabs-list {
      display: flex;
      gap: 32px; /* Wider gap for cleaner look */
      padding: 0 32px; /* Align with modal content padding */
    }

    .tab-item {
      padding: 12px 0 16px 0; /* More bottom padding for visual balance */
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
      background: none;
      border: none;
      margin: 0;
    }

    .tab-item:hover {
      color: var(--md-sys-color-primary);
    }

    .tab-item.active {
      color: var(--md-sys-color-primary);
      font-weight: 700;
    }

    .tab-item.active::after {
      content: '';
      position: absolute;
      bottom: -1px; /* Overlap the border-bottom */
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--md-sys-color-primary);
    }
  `;
  render() {
    return n`
      <div class="tabs-list" role="tablist">
        <slot></slot>
      </div>
    `;
  }
  constructor() {
    super(), this.addEventListener("click", (e) => {
      const t = e.target.closest('[role="tab"]');
      if (t) {
        const r = t.getAttribute("data-tab");
        this.activeTab = r, this._updateTabs(), this.dispatchEvent(new CustomEvent("tab-change", {
          detail: { tab: r },
          bubbles: !0,
          composed: !0
        }));
      }
    });
  }
  updated(e) {
    e.has("activeTab") && this._updateTabs();
  }
  _updateTabs() {
    this.querySelectorAll('[role="tab"]').forEach((t) => {
      t.getAttribute("data-tab") === this.activeTab ? t.classList.add("active") : t.classList.remove("active");
    });
  }
}
customElements.define("wy-tabs", Qa);
class es extends b {
  static properties = {
    label: { type: String },
    variant: { type: String },
    // 'user-entered' | 'ai-generated'
    removable: { type: Boolean }
  };
  static styles = f`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      transition: all 0.2s;
      user-select: none;
    }

    :host([variant="user-entered"]) {
      background-color: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    :host([variant="ai-generated"]) {
      background-color: transparent;
      color: var(--md-sys-color-primary);
      border: 1px dashed var(--md-sys-color-primary);
    }

    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .remove-btn:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    md-icon {
      font-size: 12px;
      --md-icon-size: 12px;
    }
  `;
  render() {
    return n`
      <span>${this.label}</span>
      ${this.removable ? n`
        <div class="remove-btn" @click="${this._handleRemove}">
          <md-icon>close</md-icon>
        </div>
      ` : ""}
    `;
  }
  _handleRemove(e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("remove", {
      detail: { label: this.label },
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("wy-tag-chip", es);
class ts extends b {
  static properties = {
    tags: { type: Array },
    suggestions: { type: Array },
    placeholder: { type: String },
    disabled: { type: Boolean },
    _inputValue: { type: String, state: !0 },
    _focusedSuggestionIndex: { type: Number, state: !0 },
    _showSuggestions: { type: Boolean, state: !0 }
  };
  constructor() {
    super(), this.tags = [], this.suggestions = [], this.placeholder = "Add tag...", this.disabled = !1, this._inputValue = "", this._focusedSuggestionIndex = -1, this._showSuggestions = !1;
  }
  static styles = f`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 12px;
      background-color: transparent;
      transition: border-color 0.2s, box-shadow 0.2s;
      min-height: 48px;
      box-sizing: border-box;
      position: relative;
    }

    .container:focus-within {
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.1);
    }

    .container.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    input {
      flex: 1;
      min-width: 120px;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--md-sys-color-on-surface);
      padding: 4px 0;
    }

    .suggestions-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 100;
      overflow: hidden;
      max-height: 240px;
      overflow-y: auto;
    }

    .suggestion-item {
      padding: 10px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.1s;
    }

    .suggestion-item:hover,
    .suggestion-item.focused {
      background-color: var(--md-sys-color-surface-variant);
    }

    .suggestion-count {
      opacity: 0.5;
      font-size: 0.75rem;
    }
  `;
  render() {
    const e = this._getFilteredSuggestions();
    return n`
      <div class="container ${this.disabled ? "disabled" : ""}" @click="${this._focusInput}">
        ${this.tags.map((t, r) => n`
          <wy-tag-chip 
            .label="${t.value}" 
            .variant="${t.source || "user-entered"}" 
            removable
            @remove="${() => this._removeTag(r)}">
          </wy-tag-chip>
        `)}
        <input 
          type="text" 
          .value="${this._inputValue}"
          placeholder="${this.tags.length === 0 ? this.placeholder : ""}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeyDown}"
          @blur="${this._handleBlur}"
          @focus="${() => this._showSuggestions = !0}"
        >
        ${this._showSuggestions && e.length > 0 ? n`
          <div class="suggestions-dropdown">
            ${e.map((t, r) => n`
              <div 
                class="suggestion-item ${r === this._focusedSuggestionIndex ? "focused" : ""}"
                @mousedown="${(i) => {
      i.preventDefault(), this._addTag(t.value);
    }}"
                @mouseenter="${() => this._focusedSuggestionIndex = r}"
              >
                <span>${t.value}</span>
                ${t.count ? n`<span class="suggestion-count">(${t.count})</span>` : h}
              </div>
            `)}
          </div>
        ` : h}
      </div>
    `;
  }
  _getFilteredSuggestions() {
    if (!this._inputValue) return this.suggestions.filter((t) => !this.tags.some((r) => r.value === t.value));
    const e = this._inputValue.toLowerCase();
    return this.suggestions.filter((t) => t.value.toLowerCase().includes(e) && !this.tags.some((r) => r.value === t.value)).slice(0, 8);
  }
  _handleInput(e) {
    this._inputValue = e.target.value, this._focusedSuggestionIndex = -1, this._showSuggestions = !0;
  }
  _handleKeyDown(e) {
    const t = this._getFilteredSuggestions();
    e.key === "Enter" ? (e.preventDefault(), this._focusedSuggestionIndex >= 0 && t[this._focusedSuggestionIndex] ? this._addTag(t[this._focusedSuggestionIndex].value) : this._inputValue.trim() && this._addTag(this._inputValue.trim())) : e.key === "Backspace" && !this._inputValue && this.tags.length > 0 ? this._removeTag(this.tags.length - 1) : e.key === "ArrowDown" ? (e.preventDefault(), this._focusedSuggestionIndex = Math.min(this._focusedSuggestionIndex + 1, t.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), this._focusedSuggestionIndex = Math.max(this._focusedSuggestionIndex - 1, -1)) : e.key === "Escape" && (this._showSuggestions = !1);
  }
  _handleBlur() {
    setTimeout(() => {
      this._showSuggestions = !1, this._focusedSuggestionIndex = -1;
    }, 150);
  }
  _addTag(e) {
    this.tags.some((t) => t.value === e) || (this.tags = [...this.tags, { value: e, source: "user-entered" }], this._inputValue = "", this._focusedSuggestionIndex = -1, this.dispatchEvent(new CustomEvent("change", { detail: { tags: this.tags } })));
  }
  _removeTag(e) {
    this.tags = this.tags.filter((t, r) => r !== e), this.dispatchEvent(new CustomEvent("change", { detail: { tags: this.tags } }));
  }
  _focusInput() {
    this.renderRoot.querySelector("input").focus();
  }
}
customElements.define("wy-tag-input", ts);
class rs extends b {
  static properties = {
    label: { type: String },
    id: { type: String },
    description: { type: String },
    error: { type: String },
    required: { type: Boolean }
  };
  static styles = f`
    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 24px;
      width: 100%;
    }

    .label-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    label {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--md-sys-color-primary);
    }

    .required-mark {
      color: #B3261E;
      margin-left: 2px;
    }

    .description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
      margin-bottom: 4px;
    }

    .error {
      font-family: var(--font-body);
      font-size: 0.75rem;
      color: #B3261E;
      margin-top: 4px;
    }

    ::slotted(input),
    ::slotted(textarea),
    ::slotted(select) {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--md-sys-color-on-surface);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    ::slotted(input:focus),
    ::slotted(textarea:focus),
    ::slotted(select:focus) {
      outline: none;
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.1);
    }

    ::slotted([aria-invalid="true"]) {
      border-color: #B3261E;
    }
  `;
  render() {
    return n`
      <div class="label-container">
        ${this.label ? n`<label for="${this.id}">${this.label}${this.required ? n`<span class="required-mark">*</span>` : ""}</label>` : ""}
      </div>
      ${this.description ? n`<div class="description">${this.description}</div>` : ""}
      <slot></slot>
      ${this.error ? n`<div class="error" id="${this.id}-error">${this.error}</div>` : ""}
    `;
  }
}
customElements.define("wy-form-field", rs);
class os extends b {
  static properties = {
    value: { type: String },
    categories: { type: Array },
    placeholder: { type: String },
    disabled: { type: Boolean },
    _inputValue: { type: String, state: !0 },
    _showDropdown: { type: Boolean, state: !0 },
    _focusedIndex: { type: Number, state: !0 }
  };
  constructor() {
    super(), this.value = "", this.categories = [], this.placeholder = "Select category...", this.disabled = !1, this._inputValue = "", this._showDropdown = !1, this._focusedIndex = -1;
  }
  static styles = f`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      position: relative;
      width: 100%;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--md-sys-color-on-surface);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.1);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 100;
      overflow: hidden;
      max-height: 240px;
      overflow-y: auto;
    }

    .item {
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.1s;
    }

    .item:hover,
    .item.focused {
      background-color: var(--md-sys-color-surface-variant);
    }

    .item.selected {
      color: var(--md-sys-color-primary);
      font-weight: 600;
      background-color: rgba(45, 78, 60, 0.05);
    }

    .no-results {
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.6;
      font-style: italic;
    }
  `;
  updated(e) {
    e.has("value") && (this._inputValue = this.value);
  }
  render() {
    const e = this._getFilteredCategories();
    return n`
      <div class="container">
        <input 
          type="text" 
          .value="${this._inputValue}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        >
        ${this._showDropdown ? n`
          <div class="dropdown">
            ${e.length > 0 ? e.map((t, r) => n`
              <div 
                class="item ${t === this.value ? "selected" : ""} ${r === this._focusedIndex ? "focused" : ""}"
                @mousedown="${(i) => {
      i.preventDefault(), this._select(t);
    }}"
                @mouseenter="${() => this._focusedIndex = r}"
              >
                ${t}
              </div>
            `) : n`<div class="no-results">No categories found</div>`}
          </div>
        ` : h}
      </div>
    `;
  }
  _getFilteredCategories() {
    if (!this._inputValue || this._inputValue === this.value) return this.categories;
    const e = this._inputValue.toLowerCase();
    return this.categories.filter((t) => t.toLowerCase().includes(e));
  }
  _handleInput(e) {
    this._inputValue = e.target.value, this._showDropdown = !0, this._focusedIndex = -1;
  }
  _handleFocus() {
    this._showDropdown = !0;
  }
  _handleBlur() {
    setTimeout(() => {
      this._showDropdown = !1, this._inputValue = this.value;
    }, 150);
  }
  _handleKeyDown(e) {
    const t = this._getFilteredCategories();
    e.key === "ArrowDown" ? (e.preventDefault(), this._focusedIndex = Math.min(this._focusedIndex + 1, t.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), this._focusedIndex = Math.max(this._focusedIndex - 1, -1)) : e.key === "Enter" ? (e.preventDefault(), this._focusedIndex >= 0 && t[this._focusedIndex] ? this._select(t[this._focusedIndex]) : this._inputValue.trim() && this._select(this._inputValue.trim())) : e.key === "Escape" && (this._showDropdown = !1, this.renderRoot.querySelector("input").blur());
  }
  _select(e) {
    this.value = e, this._inputValue = e, this._showDropdown = !1, this.dispatchEvent(new CustomEvent("change", { detail: { value: e } }));
  }
}
customElements.define("wy-category-select", os);
class is extends b {
  static properties = {
    label: { type: String },
    description: { type: String },
    icon: { type: String },
    value: { type: String },
    name: { type: String },
    checked: { type: Boolean, reflect: !0 },
    disabled: { type: Boolean }
  };
  static styles = f`
    :host {
      display: block;
      cursor: pointer;
    }

    .card {
      padding: 16px 20px;
      border-radius: 16px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background-color: var(--md-sys-color-surface);
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      height: 100%;
      box-sizing: border-box;
    }

    :host([checked]) .card {
      border-color: var(--md-sys-color-primary);
      background-color: rgba(45, 78, 60, 0.04);
      box-shadow: 0 0 0 1px var(--md-sys-color-primary);
    }

    .card:hover {
      border-color: var(--md-sys-color-primary);
      background-color: var(--md-sys-color-surface-variant);
    }

    .icon-container {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background-color: var(--md-sys-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-primary);
      margin-top: 2px; /* Slight alignment adjust */
    }

    @media (max-width: 600px) {
      .icon-container {
        display: none;
      }
      .card {
        padding: 16px;
      }
    }

    :host([checked]) .icon-container {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .content-stack {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .label {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
    }

    .description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.4;
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* Accessibility focus */
    .card:focus-within {
      outline: none;
      box-shadow: 0 0 0 3px rgba(45, 78, 60, 0.2);
    }
  `;
  render() {
    return n`
      <div 
        class="card" 
        @click="${this._toggleChecked}"
        tabindex="${this.disabled ? -1 : 0}"
      >
        <input 
          type="checkbox" 
          class="radio-input"
          name="${this.name}"
          .value="${this.value}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          tabindex="-1"
        >
        ${this.icon ? n`
          <div class="icon-container">
            <md-icon>${this.icon}</md-icon>
          </div>
        ` : ""}
        <div class="content-stack">
          <div class="label">${this.label}</div>
          ${this.description ? n`<div class="description">${this.description}</div>` : ""}
        </div>
      </div>
    `;
  }
  _toggleChecked(e) {
    if (this.disabled) return;
    const t = !this.checked;
    this.checked = t, this.dispatchEvent(new CustomEvent("change", {
      detail: {
        checked: this.checked,
        value: this.value
      },
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("wy-selection-card", is);
class as extends b {
  static properties = {
    title: { type: String },
    category: { type: String },
    variables: { type: Number },
    description: { type: String },
    showDetails: { type: Boolean, attribute: "show-details" }
  };
  constructor() {
    super(), this.title = "Untitled Prompt", this.category = "General", this.variables = 0, this.description = "", this.showDetails = !1;
  }
  static styles = f`
    :host {
      display: block;
      background-color: var(--md-sys-color-surface-container-low);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid var(--md-sys-color-outline-variant);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host(:hover) {
      background-color: var(--md-sys-color-surface-container-high);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-color: var(--md-sys-color-primary);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .badge-group {
      display: flex;
      gap: 6px;
    }

    .badge {
      font-family: var(--font-body);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .category-badge {
      background-color: var(--badge-bg, var(--md-sys-color-secondary-container));
      color: var(--badge-color, var(--md-sys-color-on-secondary-container));
    }

    .variable-badge {
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-on-surface-variant);
    }

    .card-title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
      line-height: 1.3;
    }

    .card-description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 12px 0 0 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    :host([data-category="Productivity"]) { 
      --badge-bg: var(--wy-color-productivity-container); 
      --badge-color: var(--wy-color-on-productivity-container); 
    }
    :host([data-category="Expertise"]) { 
      --badge-bg: var(--wy-color-expertise-container); 
      --badge-color: var(--wy-color-on-expertise-container); 
    }
    :host([data-category="Travel & Shopping"]) { 
      --badge-bg: var(--wy-color-travel-container); 
      --badge-color: var(--wy-color-on-travel-container); 
    }
  `;
  render() {
    return n`
      <div class="card-header">
        <div class="badge-group">
          <span class="badge category-badge">${this.category}</span>
          <span class="badge variable-badge">${this.variables} variables</span>
        </div>
        <md-icon style="font-size: 18px; color: var(--md-sys-color-outline);">arrow_forward</md-icon>
      </div>
      <h3 class="card-title">${this.title}</h3>
      ${this.showDetails && this.description ? n`
        <p class="card-description">${this.description}</p>
      ` : ""}
    `;
  }
}
class ss extends b {
  static properties = {
    title: { type: String },
    category: { type: String },
    variables: { type: Number },
    description: { type: String },
    showDetails: { type: Boolean, attribute: "show-details" }
  };
  static styles = f`
    :host {
      display: block;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    :host(:hover) {
      background-color: var(--md-sys-color-surface-container-low);
    }

    .row-content {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .row-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row-title {
      font-family: var(--font-body);
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    .row-description {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .badge-group {
      display: flex;
      gap: 8px;
      min-width: 200px;
      justify-content: flex-end;
    }

    .badge {
      font-family: var(--font-body);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .category-badge {
      background-color: var(--badge-bg, var(--md-sys-color-secondary-container));
      color: var(--badge-color, var(--md-sys-color-on-secondary-container));
    }

    .variable-badge {
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-on-surface-variant);
    }

    :host([data-category="Productivity"]) { 
      --badge-bg: var(--wy-color-productivity-container); 
      --badge-color: var(--wy-color-on-productivity-container); 
    }
    :host([data-category="Expertise"]) { 
      --badge-bg: var(--wy-color-expertise-container); 
      --badge-color: var(--wy-color-on-expertise-container); 
    }
    :host([data-category="Travel & Shopping"]) { 
      --badge-bg: var(--wy-color-travel-container); 
      --badge-color: var(--wy-color-on-travel-container); 
    }

    @media (max-width: 600px) {
      .badge-group {
        display: none;
      }
    }
  `;
  render() {
    return n`
      <div class="row-content">
        <div class="row-main">
          <h3 class="row-title">${this.title}</h3>
          ${this.showDetails && this.description ? n`
            <p class="row-description">${this.description}</p>
          ` : ""}
        </div>
        <div class="badge-group">
          <span class="badge category-badge">${this.category}</span>
          <span class="badge variable-badge">${this.variables} v</span>
          <md-icon style="font-size: 18px; color: var(--md-sys-color-outline);">chevron_right</md-icon>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-prompt-card", as);
customElements.define("wy-prompt-row", ss);
class ls extends b {
  static properties = {
    open: { type: Boolean, reflect: !0 },
    title: { type: String },
    category: { type: String },
    description: { type: String },
    template: { type: String },
    variables: { type: Array },
    variations: { type: Array },
    activeVariationIndex: { type: Number, attribute: "active-variation-index" },
    mode: { type: String },
    // 'locked' or 'edit'
    activeTab: { type: String }
    // 'variables' or 'preview'
  };
  constructor() {
    super(), this.open = !1, this.title = "", this.category = "", this.description = "", this.template = "", this.variables = [], this.variations = [], this.activeVariationIndex = 0, this.mode = "locked", this.activeTab = "variables", this._values = {};
  }
  static styles = f`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 2000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      --wy-color-surface-light: #F5F2EA;
      --wy-color-text-primary: #2C4C3B;
      --wy-color-badge-bg: #E8E4D9;
      --wy-color-focus-ring: rgba(44, 76, 59, 0.12);
    }

    :host([open]) {
      pointer-events: auto;
      opacity: 1;
    }

    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3); /* Darker scrim for focus */
      backdrop-filter: blur(4px);
    }

    .modal-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      background: var(--wy-color-surface-light);
      border-radius: 16px; /* 16px radius as per ref */
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%) scale(0.95);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--md-sys-color-outline-variant);
      font-family: var(--font-sans, 'DM Sans', sans-serif);
    }

    :host([open]) .modal-container {
      transform: translate(-50%, -50%) scale(1);
    }

    /* HEADER STYLES */
    .header {
      padding: 32px 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .header-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 24px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--wy-color-badge-bg);
      color: var(--wy-color-text-primary);
      border-radius: 999px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em; /* Wider tracking */
    }

    @media (prefers-color-scheme: dark) {
        :host {
          --wy-color-surface-light: var(--md-sys-color-surface);
          --wy-color-text-primary: var(--md-sys-color-primary);
          --wy-color-badge-bg: rgba(255, 255, 255, 0.12);
          --wy-color-focus-ring: rgba(141, 224, 176, 0.2);
        }
        .badge {
          color: var(--md-sys-color-on-surface);
        }
    }

    .title-group h2 {
      font-family: var(--font-display, 'Playfair Display', serif);
      font-size: 2.5rem; /* Larger Title */
      font-weight: 500;
      margin: 0 0 12px 0;
      color: var(--wy-color-text-primary);
      line-height: 1.1;
    }

    .description-text {
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.6;
      color: var(--md-sys-color-text-muted);
      margin: 0;
      max-width: 500px;
    }

    .customize-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        border: none;
        padding: 10px 20px;
        border-radius: 999px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }

    .customize-btn:hover {
        opacity: 0.9;
    }

    /* TABS */
    .tabs-container {
        padding: 0 32px;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        display: flex;
        gap: 32px;
    }

    .tab-item {
        background: none;
        border: none;
        padding: 12px 0 16px 0;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-on-surface-variant);
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
        margin: 0;
        border-bottom: 2px solid transparent;
    }

    .tab-item:hover {
        color: var(--wy-color-text-primary);
    }

    .tab-item.active {
        color: var(--wy-color-text-primary);
        font-weight: 700;
        border-bottom-color: var(--wy-color-text-primary);
    }
    
    /* CONTENT */
    .content {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .body {
        padding: 32px;
        flex: 1;
    }

    .variation-selector {
        margin: 0 32px 16px;
        padding: 12px;
        background: var(--md-sys-color-surface-container-low);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .variation-label {
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--md-sys-color-on-surface-variant);
    }

    .variation-select {
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface-container-lowest);
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 999px;
        padding: 6px 12px;
    }

    /* FORMS */
    .variables-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .form-group label {
        display: block;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--wy-color-text-primary);
        margin-bottom: 8px;
    }

    .form-group input, .form-group textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 12px 16px;
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 8px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 1rem;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface-container-lowest);
        transition: all 0.2s;
    }

    .form-group input:focus, .form-group textarea:focus {
        outline: none;
        border-color: var(--md-sys-color-primary);
        box-shadow: 0 0 0 2px var(--wy-color-focus-ring);
    }

    .helper-text {
        display: block;
        text-align: right;
        font-size: 0.75rem;
        color: var(--md-sys-color-text-muted);
        margin-top: 4px;
    }

    .preview-area {
      background: var(--md-sys-color-surface-container-highest);
      border-radius: 8px;
      padding: 24px;
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 1rem;
      line-height: 1.7;
      color: var(--md-sys-color-on-surface);
      white-space: pre-wrap;
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    .editor-area {
        width: 100%;
        height: 100%;
        min-height: 300px;
        border: none;
        background: none;
        resize: none;
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--md-sys-color-on-surface);
    }
    .editor-area:focus { outline: none; }

    /* FOOTER */
    .footer {
      padding: 16px 32px 32px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 24px;
      background: var(--md-sys-color-surface); /* Ensure contrast against content bg if needed */
      border-radius: 0 0 16px 16px;
    }

    .text-link {
        background: none;
        border: none;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--md-sys-color-text-muted);
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 4px;
        cursor: pointer;
        transition: color 0.2s;
    }
    .text-link:hover { color: var(--wy-color-text-primary); }

    .primary-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        border: none;
        padding: 12px 24px;
        border-radius: 999px;
        font-family: var(--font-sans, 'DM Sans', sans-serif);
        font-size: 0.875rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: all 0.2s;
    }
    .primary-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    @media (max-width: 600px) {
      .modal-container {
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      .header-main { flex-direction: column; align-items: flex-start; gap: 16px; }
      .footer { flex-direction: column-reverse; width: 100%; }
      .primary-btn, .text-link { width: 100%; justify-content: center; }
    }
    `;
  render() {
    const e = this.variations.length > 0 ? this.variations[this.activeVariationIndex].template : this.template, t = this._compilePrompt(e);
    return n`
      <div class="scrim" @click="${this._close}"></div>
      <div class="modal-container">
        
        <!-- HEADER -->
        <header class="header">
            <div class="header-top">
                <span class="badge category-badge">${this.category}</span>
                <div class="header-actions">
                    ${this.mode === "locked" ? n`
                        <button class="customize-btn" @click="${() => this.mode = "edit"}">
                            <md-icon style="font-size: 18px;">edit</md-icon>
                            Edit Prompt
                        </button>
                    ` : ""}
                    <md-icon-button @click="${this._close}">
                        <md-icon>close</md-icon>
                    </md-icon-button>
                </div>
            </div>
            
            <div class="header-main">
                <div class="title-group">
                    <h2>${this.title}</h2>
                    <p class="description-text">${this.description}</p>
                </div>
                
                ${this.mode === "locked" ? n`` : ""}
            </div>
        </header>

        ${this.mode === "locked" ? n`
          <div class="tabs-container">
              <wy-tabs active-tab="${this.activeTab}" @tab-change="${(r) => this.activeTab = r.detail.tab}">
                <button class="tab-item ${this.activeTab === "variables" ? "active" : ""}" role="tab" data-tab="variables">Variables</button>
                <button class="tab-item ${this.activeTab === "preview" ? "active" : ""}" role="tab" data-tab="preview">Final Preview</button>
              </wy-tabs>
          </div>
        ` : ""}

        <div class="content">
          ${this.mode === "locked" ? n`
            ${this.variations.length > 1 ? n`
              <div class="variation-selector">
                <span class="variation-label">Variation Style:</span>
                <select class="variation-select" @change="${this._handleVariationChange}">
                  ${this.variations.map((r, i) => n`
                    <option value="${i}" ?selected="${this.activeVariationIndex === i}">${r.name}</option>
                  `)}
                </select>
              </div>
            ` : ""}

            <div class="body">
              ${this.activeTab === "variables" ? n`
                <div class="variables-grid">
                  ${this.variables.map((r) => n`
                    <div class="form-group">
                        <label>${r.label}</label>
                        ${r.type === "textarea" ? n`
                            <textarea 
                            placeholder="${r.placeholder || ""}" 
                            @input="${(i) => this._handleInput(r.name, i.target.value)}"
                            .value="${this._values[r.name] || ""}"
                            rows="4"
                            ></textarea>
                            <span class="helper-text">Markdown supported</span>
                        ` : n`
                            <input 
                            type="text" 
                            placeholder="${r.placeholder || ""}" 
                            @input="${(i) => this._handleInput(r.name, i.target.value)}"
                            .value="${this._values[r.name] || ""}"
                            >
                        `}
                    </div>
                  `)}
                </div>
              ` : n`
                <div class="preview-area">${t}</div>
              `}
            </div>
          ` : n`
            <div class="body">
              <textarea 
                class="editor-area" 
                .value="${this.template}"
                @input="${(r) => this.template = r.target.value}"
              ></textarea>
            </div>
          `}
        </div>

        <!-- FOOTER -->
        <footer class="footer">
          ${this.mode === "locked" ? n`
            <button class="text-link" @click="${this._handleDownload}">Download .txt</button>
            <button class="primary-btn" @click="${this._handleCopy}">
                <md-icon style="font-size: 18px;">content_copy</md-icon>
                Copy to Clipboard
            </button>
          ` : n`
            <button class="text-link" @click="${() => this.mode = "locked"}">Cancel</button>
            <button class="primary-btn" @click="${this._handleSave}">Save Template</button>
          `}
        </footer>
      </div>
    `;
  }
  _handleInput(e, t) {
    this._values = { ...this._values, [e]: t }, this.requestUpdate();
  }
  _handleVariationChange(e) {
    this.activeVariationIndex = parseInt(e.target.value);
  }
  _compilePrompt(e) {
    let t = e;
    return Object.keys(this._values).forEach((r) => {
      const i = new RegExp(`{{${r}}}`, "g");
      t = t.replace(i, this._values[r] || `[${r}]`);
    }), t;
  }
  _close() {
    this.open = !1, this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _handleCopy() {
    const e = this._compilePrompt(this.variations.length > 0 ? this.variations[this.activeVariationIndex].template : this.template);
    navigator.clipboard.writeText(e), this.dispatchEvent(new CustomEvent("toast", {
      detail: { message: "Copied to clipboard!" },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleSave() {
    this.mode = "locked", this.dispatchEvent(new CustomEvent("save", {
      detail: { template: this.template },
      bubbles: !0,
      composed: !0
    }));
  }
  _handleDownload() {
  }
}
customElements.define("wy-prompt-modal", ls);
class ns extends b {
  static properties = {
    open: { type: Boolean, reflect: !0 },
    workTitle: { type: String, attribute: "work-title" },
    previewImage: { type: String, attribute: "preview-image" }
  };
  constructor() {
    super(), this.open = !1, this.workTitle = "Untitled Work", this.previewImage = "";
  }
  static styles = f`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :host {
      display: block;
    }

    .export-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      min-height: 400px;
      padding: 0 16px 24px; /* Add breathing room */
    }

    .preview-pane {
      background-color: var(--md-sys-color-surface-container-low);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid var(--md-sys-color-outline-variant);
    }

    .preview-pane img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .controls-pane {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 8px 0;
    }

    .section-title {
      font-family: var(--font-serif, 'Playfair Display', serif);
      font-size: 1.125rem;
      color: var(--md-sys-color-primary);
      margin-bottom: 12px;
    }

    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 800px) {
      .export-container {
        grid-template-columns: 1fr;
      }
      .preview-pane {
        aspect-ratio: 16 / 9;
        min-height: auto;
      }
    }
  `;
  render() {
    return n`
      <wy-modal 
        ?open="${this.open}" 
        heading="Export Plot: ${this.workTitle}"
        max-width="900px"
        @close="${this._handleClose}"
      >
        <div class="export-container">
          <div class="preview-pane">
            ${this.previewImage ? n`<img src="${this.previewImage}" alt="Preview">` : n`<md-icon style="font-size: 48px; opacity: 0.2;">image</md-icon>`}
          </div>

          <div class="controls-pane">
            <div>
              <div class="section-title">Paper Configuration</div>
              <div class="grid-2col">
                <wy-selection-card name="paper" label="A3" value="a3" checked icon="description"></wy-selection-card>
                <wy-selection-card name="paper" label="A4" value="a4" icon="description"></wy-selection-card>
              </div>
            </div>

            <wy-form-field label="Bucket Orientation">
              <select style="width: 100%;">
                <option>Portrait (Standard)</option>
                <option>Landscape (Rotated)</option>
              </select>
            </wy-form-field>

            <wy-form-field label="Export Intensity">
              <div style="display: flex; gap: 8px;">
                <wy-filter-chip label="Draft" active></wy-filter-chip>
                <wy-filter-chip label="Production"></wy-filter-chip>
                <wy-filter-chip label="Archival"></wy-filter-chip>
              </div>
            </wy-form-field>
          </div>
        </div>

        <div slot="actions">
          <md-text-button @click="${this.close}">Cancel</md-text-button>
          <md-filled-button @click="${this._handleExport}">Generate SVG</md-filled-button>
        </div>
      </wy-modal>
    `;
  }
  show() {
    this.open = !0;
  }
  close() {
    this.open = !1;
  }
  _handleClose() {
    this.open = !1;
  }
  _handleExport() {
    this.dispatchEvent(new CustomEvent("export", {
      detail: { status: "success" },
      bubbles: !0,
      composed: !0
    })), this.close();
  }
}
customElements.define("wy-export-modal", ns);
class ds extends b {
  static properties = {
    title: { type: String },
    hideMenu: { type: Boolean, attribute: "hide-menu" }
  };
  constructor() {
    super(), this.title = "Prompt Library", this.hideMenu = !1;
  }
  static styles = f`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: var(--md-sys-color-surface-container-high);
      height: 64px;
      padding: 0 32px;
    }

    .app-bar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }

    .logo {
      width: 32px;
      height: 32px;
      color: var(--md-sys-color-primary);
    }

    .app-title {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      margin: 0;
      white-space: nowrap;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ai-tools-link {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-primary);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 20px;
      transition: background-color 0.2s;
    }

    .ai-tools-link:hover {
      background-color: var(--md-sys-color-primary-container);
    }

    .menu-button {
      display: none;
    }

    @media (max-width: 600px) {
      .menu-button {
        display: block;
      }
      .ai-tools-link {
        display: none;
      }
      .app-title {
        font-size: 1.1rem;
      }
    }
  `;
  render() {
    return n`
      <div class="app-bar-container">
        <div class="left-section">
          ${this.hideMenu ? "" : n`
            <md-icon-button class="menu-button">
              <md-icon>menu</md-icon>
            </md-icon-button>
          `}
          <a href="/" class="logo-container">
            <slot name="logo">
              <md-icon class="logo">auto_awesome</md-icon>
            </slot>
            <h1 class="app-title">${this.title}</h1>
          </a>
        </div>

        <div class="right-section">
          <slot name="actions">
            <a href="#" class="ai-tools-link" @click="${this._handleAiToolsClick}">AI Tools</a>
          </slot>
          <md-icon-button>
            <md-icon>settings</md-icon>
          </md-icon-button>
        </div>
      </div>
    `;
  }
  _handleAiToolsClick(e) {
    e.preventDefault(), this.dispatchEvent(new CustomEvent("ai-tools-click", {
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("wy-app-bar", ds);
class cs extends b {
  static properties = {
    userName: { type: String, attribute: "user-name" },
    userAvatar: { type: String, attribute: "user-avatar" },
    breadcrumb: { type: String },
    searchValue: { type: String, attribute: "search-value" }
  };
  constructor() {
    super(), this.userName = "M. Yuwono", this.userAvatar = "", this.breadcrumb = "Plotter Library", this.searchValue = "";
  }
  static styles = f`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--md-sys-color-surface-container-low);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      padding: 12px 32px;
    }

    .header-container {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .breadcrumb {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--md-sys-color-primary);
      white-space: nowrap;
    }

    .search-container {
      flex: 1;
      max-width: 600px;
      position: relative;
    }

    .search-pill {
      width: 100%;
      height: 48px;
      background-color: var(--md-sys-color-surface-container-high);
      border-radius: 24px;
      border: 1px solid transparent;
      padding: 0 48px 0 20px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--md-sys-color-on-surface);
      box-sizing: border-box;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .search-pill:focus {
      outline: none;
      background-color: var(--md-sys-color-surface);
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 4px rgba(45, 78, 60, 0.1);
    }

    .search-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--md-sys-color-on-surface-variant);
      pointer-events: none;
    }

    .right-section {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 20px;
      border-left: 1px solid var(--md-sys-color-outline-variant);
    }

    .user-info {
      text-align: right;
    }

    .user-name {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
      display: block;
    }

    .user-role {
      font-family: var(--font-body);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 600;
      overflow: hidden;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 800px) {
      .breadcrumb {
        display: none;
      }
      .user-info {
        display: none;
      }
      padding: 12px 16px;
    }
  `;
  render() {
    return n`
      <div class="header-container">
        <div class="left-section">
          <md-icon-button>
            <md-icon>menu</md-icon>
          </md-icon-button>
          <div class="breadcrumb">${this.breadcrumb}</div>
        </div>

        <div class="search-container">
          <input 
            type="text" 
            class="search-pill" 
            placeholder="Search collections, tags, or artists..."
            .value="${this.searchValue}"
            @input="${this._handleSearch}"
          >
          <md-icon class="search-icon">search</md-icon>
        </div>

        <div class="right-section">
          <md-icon-button>
            <md-icon>notifications</md-icon>
          </md-icon-button>
          
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">${this.userName}</span>
              <span class="user-role">Administrator</span>
            </div>
            <div class="avatar">
              ${this.userAvatar ? n`<img src="${this.userAvatar}" alt="${this.userName}">` : n`<span>${this.userName.charAt(0)}</span>`}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _handleSearch(e) {
    this.searchValue = e.target.value, this.dispatchEvent(new CustomEvent("search", {
      detail: { value: this.searchValue },
      bubbles: !0,
      composed: !0
    }));
  }
}
customElements.define("wy-library-header", cs);
class ps extends b {
  static properties = {
    name: { type: String },
    role: { type: String },
    photo: { type: String },
    profileId: { type: String }
  };
  static styles = f`
    :host {
      display: block;
    }
    
    md-elevated-card {
      width: 100%;
      height: 100%;
      --md-elevated-card-container-color: var(--md-sys-color-surface);
      --md-elevated-card-container-shape: var(--md-sys-shape-corner-large);
      border: 1px solid var(--md-sys-color-outline-variant); 
    }

    .card-content {
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 8px;
      background-color: var(--md-sys-color-surface-variant);
    }

    h2 {
      font-family: var(--font-serif);
      font-size: 1.75rem;
      font-weight: 400;
      margin: 0;
      color: var(--md-sys-color-on-surface);
    }

    .role {
      font-family: var(--font-body);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--md-sys-color-secondary);
      font-weight: 500;
      margin: 0;
    }

    .actions {
      margin-top: 16px;
    }
    
    a { text-decoration: none; }
  `;
  render() {
    return n`
      <md-elevated-card>
        <div class="card-content">
          <img class="avatar" src="${this.photo}" alt="${this.name}" />
          <p class="role">${this.role}</p>
          <h2>${this.name}</h2>
          
          <div class="actions">
            <a href="/profile.html?id=${this.profileId}">
              <md-filled-button>View Profile</md-filled-button>
            </a>
          </div>
        </div>
      </md-elevated-card>
    `;
  }
}
customElements.define("wy-profile-card", ps);
class hs extends b {
  static properties = {
    name: { type: String },
    role: { type: String },
    photo: { type: String },
    bio: { type: String }
    // Richer bio from module data
  };
  static styles = f`
    :host { display: block; margin-bottom: 64px; }
    
    .bio-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }

    img {
      width: 100%;
      border-radius: var(--md-sys-shape-corner-large);
      aspect-ratio: 4/5;
      object-fit: cover;
    }

    .content {
      padding-top: 24px;
    }

    h1 {
      font-family: var(--font-serif);
      font-size: 3.5rem;
      margin: 0 0 16px 0;
      color: var(--md-sys-color-on-background);
      line-height: 1.1;
    }

    .role {
      font-family: var(--font-body);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--md-sys-color-secondary);
      display: block;
      margin-bottom: 32px;
    }

    .bio-text {
      font-size: 1.25rem;
      color: var(--md-sys-color-on-surface-variant);
      max-width: 50ch;
      line-height: 1.6;
    }

    @media(max-width: 900px) {
      .bio-container { grid-template-columns: 1fr; gap: 32px; }
      h1 { font-size: 2.5rem; }
    }
  `;
  render() {
    return n`
      <div class="bio-container">
        <img src="${this.photo}" alt="${this.name}" />
        <div class="content">
          <span class="role">${this.role}</span>
          <h1>${this.name}</h1>
          <p class="bio-text">${this.bio}</p>
          
          <div style="margin-top: 32px;">
             <md-icon-button href="#"><md-icon>link</md-icon></md-icon-button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-bio-card", hs);
const us = [
  {
    id: "p1",
    title: "Hudson Yards Development",
    category: "real-estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    summary: "A mixed-use development project redefining the skyline."
  },
  {
    id: "p2",
    title: "Alpha BioTech Fund",
    category: "tech",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
    summary: "Early-stage investment in longevity and synthetic biology."
  },
  {
    id: "p3",
    title: "5th Avenue Restoration",
    category: "real-estate",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    summary: "Historical preservation of a landmark commercial property."
  },
  {
    id: "p4",
    title: "Quantum Computing Seed",
    category: "tech",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    summary: "Strategic stake in next-gen computing infrastructure."
  }
];
class fs extends b {
  static properties = {
    filter: { type: String },
    title: { type: String }
  };
  static styles = f`
    :host { display: block; margin-bottom: 80px; }
    
    h2 {
      font-family: var(--font-serif);
      font-size: 2rem;
      margin-bottom: 40px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px;
    }

    md-elevated-card {
      --md-elevated-card-container-color: var(--md-sys-color-surface);
      --md-elevated-card-container-shape: var(--md-sys-shape-corner-large);
      width: 100%;
      height: 100%;
    }

    .card-content {
      padding: 0;
    }
    
    .card-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: var(--md-sys-shape-corner-large) var(--md-sys-shape-corner-large) 0 0;
    }

    .text-content {
        padding: 24px;
    }

    h3 {
        font-family: var(--font-serif);
        font-size: 1.25rem;
        margin: 0 0 8px 0;
    }
    
    p {
        font-size: 0.875rem;
        color: var(--md-sys-color-on-surface-variant);
        margin: 0 0 16px 0;
    }
  `;
  render() {
    const e = us.filter((t) => t.category === this.filter);
    return n`
      <div>
        <h2>${this.title || "Projects"}</h2>
        <div class="grid">
          ${e.map((t) => n`
            <md-elevated-card href="/project.html?id=${t.id}" clickable>
               <div class="card-content">
                  <img class="card-image" src="${t.image}" alt="${t.title}" />
                  <div class="text-content">
                    <h3>${t.title}</h3>
                    <p>${t.summary}</p>
                    <md-text-button>View Details</md-text-button>
                  </div>
               </div>
            </md-elevated-card>
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define("wy-project-list", fs);
class vs extends b {
  static properties = {
    title: { type: String },
    value: { type: String },
    trend: { type: String },
    icon: { type: String }
  };
  static styles = f`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-border-variant);
      border-radius: var(--md-sys-shape-corner-medium);
      padding: 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      transition: transform 0.2s ease;
    }

    .card:hover {
      transform: translateY(-4px);
    }

    .icon-container {
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-primary);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-family: var(--font-display);
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--md-sys-color-text-muted);
      margin-bottom: 4px;
    }

    .value {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      color: var(--md-sys-color-on-surface);
      margin-bottom: 4px;
    }

    .trend {
      font-family: var(--font-display);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--md-sys-color-primary);
    }

    md-icon {
      font-size: 24px;
    }
  `;
  render() {
    return n`
      <div class="card">
        <div class="icon-container">
          <md-icon>${this.icon}</md-icon>
        </div>
        <div class="content">
          <span class="title">${this.title}</span>
          <span class="value">${this.value}</span>
          ${this.trend ? n`<span class="trend">${this.trend}</span>` : ""}
        </div>
      </div>
    `;
  }
}
customElements.define("wy-metric-card", vs);
class ms extends b {
  static properties = {
    title: { type: String },
    items: { type: Array }
    // [{ label: String, value: Number, color: String }]
  };
  static styles = f`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-border-variant);
      border-radius: var(--md-sys-shape-corner-large);
      padding: 32px;
      height: 100%;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h3 {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      margin: 0;
      color: var(--md-sys-color-on-surface);
    }

    .allocation-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .item {
      cursor: pointer;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 8px;
    }

    .label-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .label {
      font-family: var(--font-display);
      font-weight: 500;
      color: var(--md-sys-color-on-surface);
      font-size: 0.875rem;
    }

    .percentage {
      font-family: var(--font-serif);
      font-weight: 500;
      font-size: 1.125rem;
      color: var(--md-sys-color-on-surface);
    }

    .bar-container {
      width: 100%;
      height: 4px;
      background-color: var(--md-sys-color-surface-variant);
      border-radius: 2px;
      overflow: hidden;
    }

    .bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .footer {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid var(--md-sys-color-outline-variant);
        font-family: var(--font-display);
        font-size: 0.75rem;
        line-height: 1.6;
        color: var(--md-sys-color-text-muted);
    }

    .footer strong {
        color: var(--md-sys-color-primary);
    }
  `;
  render() {
    return n`
      <div class="card">
        <div class="header">
          <h3>${this.title || "Allocation"}</h3>
          <md-icon-button><md-icon>more_horiz</md-icon></md-icon-button>
        </div>
        <div class="allocation-list">
          ${(this.items || []).map((e) => n`
            <div class="item">
              <div class="item-header">
                <div class="label-group">
                  <div class="dot" style="background-color: ${e.color || "var(--md-sys-color-primary)"}"></div>
                  <span class="label">${e.label}</span>
                </div>
                <span class="percentage">${e.value}%</span>
              </div>
              <div class="bar-container">
                <div class="bar" style="width: ${e.value}%; background-color: ${e.color || "var(--md-sys-color-primary)"}"></div>
              </div>
            </div>
          `)}
        </div>
        <div class="footer">
            <slot name="analysis">
                <strong>Analysis:</strong> Portfolio remains within target variance.
            </slot>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-allocation-card", ms);
class bs extends b {
  static properties = {
    image: { type: String },
    category: { type: String },
    title: { type: String },
    icon: { type: String }
  };
  static styles = f`
    :host {
      display: block;
    }
    
    .card {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: var(--md-sys-shape-corner-medium);
      overflow: hidden;
      cursor: pointer;
    }

    .image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: transform 0.7s ease;
    }

    .card:hover .image {
      transform: scale(1.05);
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(45, 78, 60, 0.9) 0%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      box-sizing: border-box;
      color: white;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .category {
      font-family: var(--font-display);
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      line-height: 1.3;
      margin: 0;
    }

    md-icon {
      font-size: 16px;
    }
  `;
  render() {
    return n`
      <div class="card">
        <div class="image" style="background-image: url('${this.image}')"></div>
        <div class="overlay">
          <div class="header">
            ${this.icon ? n`<md-icon>${this.icon}</md-icon>` : ""}
            <span class="category">${this.category}</span>
          </div>
          <h4 class="title">${this.title}</h4>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-insight-card", bs);
class gs extends b {
  static properties = {
    title: { type: String },
    artist: { type: String },
    date: { type: String },
    image: { type: String },
    selected: { type: Boolean, reflect: !0 },
    favorite: { type: Boolean },
    status: { type: String }
    // 'draft', 'ready', 'exported'
  };
  constructor() {
    super(), this.title = "Untitled", this.artist = "Unknown", this.date = "", this.image = "", this.selected = !1, this.favorite = !1, this.status = "";
  }
  static styles = f`
    :host {
      display: block;
      cursor: pointer;
    }

    .card {
      border-radius: 20px;
      overflow: hidden;
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .card:hover {
      border-color: var(--md-sys-color-primary);
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(45, 78, 60, 0.08);
    }

    :host([selected]) .card {
      border-color: var(--md-sys-color-primary);
      box-shadow: 0 0 0 2px var(--md-sys-color-primary);
    }

    .media-container {
      aspect-ratio: 16 / 9;
      background-color: var(--md-sys-color-surface-container-high);
      overflow: hidden;
      position: relative;
    }

    .media-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card:hover .media-container img {
      transform: scale(1.05);
    }

    .info-container {
      padding: 16px;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      color: var(--md-sys-color-primary);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .metadata {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      color: var(--md-sys-color-on-surface-variant);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badges {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
    }

    .badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4px);
    }

    .status-indicator {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-family: var(--font-body);
      font-size: 0.625rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .favorite-toggle {
      color: ${f`var(--md-sys-color-primary)`};
    }

    .favorite-toggle[active] {
      color: #E91E63; /* Accent color for favorites */
    }
  `;
  render() {
    return n`
      <div class="card" @click="${this._toggleSelect}">
        <div class="media-container">
          ${this.image ? n`<img src="${this.image}" alt="${this.title}">` : ""}
          
          <div class="badges">
            <div class="badge" @click="${this._toggleFavorite}">
              <md-icon>${this.favorite ? "favorite" : "favorite_border"}</md-icon>
            </div>
          </div>

          ${this.status ? n`
            <div class="status-indicator">${this.status}</div>
          ` : ""}
        </div>

        <div class="info-container">
          <div class="title">${this.title}</div>
          <div class="metadata">
            <span>${this.artist}</span>
            <span>${this.date}</span>
          </div>
        </div>
      </div>
    `;
  }
  _toggleSelect(e) {
    e.target.closest(".badge") || (this.selected = !this.selected, this.dispatchEvent(new CustomEvent("selection-change", {
      detail: { selected: this.selected, title: this.title },
      bubbles: !0,
      composed: !0
    })));
  }
  _toggleFavorite(e) {
    e.stopPropagation(), this.favorite = !this.favorite, this.requestUpdate();
  }
}
customElements.define("wy-work-card", gs);
class ys extends b {
  static properties = {
    density: { type: String },
    // 'spacious', 'compact'
    empty: { type: Boolean }
  };
  constructor() {
    super(), this.density = "spacious", this.empty = !1;
  }
  static styles = f`
    :host {
      display: block;
      width: 100%;
    }

    .grid-container {
      display: grid;
      gap: 32px;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      transition: all 0.3s ease;
    }

    :host([density="compact"]) .grid-container {
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
      background-color: var(--md-sys-color-surface-container-low);
      border: 2px dashed var(--md-sys-color-outline-variant);
      border-radius: 24px;
      color: var(--md-sys-color-on-surface-variant);
    }

    .empty-state md-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .empty-title {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    .empty-text {
      font-family: var(--font-body);
      font-size: 0.875rem;
      max-width: 400px;
    }

    @media (max-width: 600px) {
      .grid-container {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `;
  render() {
    return this.empty ? n`
        <div class="empty-state">
          <md-icon>hourglass_empty</md-icon>
          <div class="empty-title">No Artwork Found</div>
          <div class="empty-text">Your plotter library is currently empty. Start by importing new plot files or generating configurations.</div>
        </div>
      ` : n`
      <div class="grid-container">
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("wy-works-grid", ys);
class xs extends b {
  static properties = {
    title: { type: String },
    paperSize: { type: String, attribute: "paper-size" },
    bucket: { type: String },
    status: { type: String },
    // 'pending', 'success', 'error'
    timestamp: { type: String }
  };
  constructor() {
    super(), this.title = "Plot Configuration", this.paperSize = "Letter (8.5x11)", this.bucket = "Portrait", this.status = "success", this.timestamp = (/* @__PURE__ */ new Date()).toLocaleDateString();
  }
  static styles = f`
    :host {
      display: block;
    }

    .card {
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    }

    .card:hover {
      background-color: var(--md-sys-color-surface-container-low);
      border-color: var(--md-sys-color-primary);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--md-sys-color-primary);
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status-pending { color: var(--md-sys-color-secondary); }
    .status-success { color: #4CAF50; }
    .status-error { color: #D32F2F; }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      border-top: 1px solid var(--md-sys-color-outline-variant);
      padding-top: 12px;
    }

    .metric-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .metric-icon {
      color: var(--md-sys-color-on-surface-variant);
      font-size: 18px;
    }

    .metric-content {
      display: flex;
      flex-direction: column;
    }

    .metric-label {
      font-family: var(--font-body);
      font-size: 0.625rem;
      color: var(--md-sys-color-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      font-family: var(--font-body);
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
    }

    .timestamp {
      font-family: var(--font-body);
      font-size: 0.75rem;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
    }
  `;
  render() {
    const e = {
      pending: { icon: "sync", label: "Processing" },
      success: { icon: "check_circle", label: "Complete" },
      error: { icon: "error", label: "Failed" }
    }, t = e[this.status] || e.success;
    return n`
      <div class="card">
        <div class="header">
          <div class="title">${this.title}</div>
          <div class="status-badge status-${this.status}">
            <md-icon style="font-size: 14px;">${t.icon}</md-icon>
            <span>${t.label}</span>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-item">
            <md-icon class="metric-icon">description</md-icon>
            <div class="metric-content">
              <span class="metric-label">Format</span>
              <span class="metric-value">${this.paperSize}</span>
            </div>
          </div>
          <div class="metric-item">
            <md-icon class="metric-icon">layers</md-icon>
            <div class="metric-content">
              <span class="metric-label">Orientation</span>
              <span class="metric-value">${this.bucket}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <span class="timestamp">${this.timestamp}</span>
          <md-icon-button>
            <md-icon>more_vert</md-icon>
          </md-icon-button>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-plot-card", xs);
class _s extends b {
  static properties = {
    status: { type: String },
    // 'synced', 'syncing', 'error'
    lastSync: { type: String, attribute: "last-sync" }
  };
  constructor() {
    super(), this.status = "synced", this.lastSync = "2 mins ago";
  }
  static styles = f`
    :host {
      display: inline-block;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 16px;
      border-radius: 9999px;
      background-color: var(--md-sys-color-surface-container-high);
      border: 1px solid var(--md-sys-color-outline-variant);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .pill:hover {
      background-color: var(--md-sys-color-surface-container-highest);
      border-color: var(--md-sys-color-primary);
    }

    .status-icon {
      font-size: 18px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
    }

    .status-text {
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .hint-text {
      font-family: var(--font-body);
      font-size: 0.625rem;
      color: var(--md-sys-color-on-surface-variant);
      line-height: 1.2;
      margin-top: 2px;
    }

    .status-synced { color: #4CAF50; }
    .status-syncing { color: var(--md-sys-color-primary); }
    .status-error { color: #D32F2F; }

    .syncing-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      animation: spin 2s linear infinite;
    }

    .syncing-icon {
      font-size: 18px;
    }
  `;
  render() {
    const e = {
      synced: { icon: "cloud_done", label: "Synced", class: "status-synced" },
      syncing: { icon: "sync", label: "Syncing...", class: "status-syncing" },
      error: { icon: "cloud_off", label: "Offline", class: "status-error" }
    }, t = e[this.status] || e.synced;
    return n`
      <div class="pill" title="Last backup: ${this.lastSync}">
        ${this.status === "syncing" ? n`
          <div class="syncing-container">
            <md-icon class="status-icon ${t.class}">${t.icon}</md-icon>
          </div>
        ` : n`
          <md-icon class="status-icon ${t.class}">${t.icon}</md-icon>
        `}
        <div class="text-container">
          <span class="status-text ${t.class}">${t.label}</span>
          <span class="hint-text">${this.lastSync}</span>
        </div>
      </div>
    `;
  }
}
customElements.define("wy-backup-status", _s);
console.log("[m3-design-v2] Web components registered");
//# sourceMappingURL=web-components.js.map
