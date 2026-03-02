import { BROWSER as U } from "esm-env";
import { c as j, d as S, e as T, S as L, b as P, p as M, f as N, w as $, g as V, o as b } from "./ssr-Cre0Q1Ju.mjs";
import { r as G } from "./ssr-Cre0Q1Ju.mjs";
import { continuous as Q } from "./plugins.mjs";
const u = (n, t, e) => {
  const i = document.createElement(n), [s, o] = Array.isArray(t) ? [void 0, t] : [t, e];
  return s && Object.assign(i, s), o == null || o.forEach((a) => i.appendChild(a)), i;
}, W = (n, t) => {
  var e;
  return t === "left" ? n.offsetLeft : (((e = n.offsetParent instanceof HTMLElement ? n.offsetParent : null) == null ? void 0 : e.offsetWidth) ?? 0) - n.offsetWidth - n.offsetLeft;
}, k = (n) => n.offsetWidth > 0 && n.offsetHeight > 0, z = (n, t) => {
  U && !customElements.get(n) && customElements.define(n, t);
};
function B(n, t, { reverse: e = !1 } = {}) {
  const i = n.length;
  for (let s = e ? i - 1 : 0; e ? s >= 0 : s < i; e ? s-- : s++)
    t(n[s], s);
}
function K(n, t, e, i, s) {
  const o = s ? s(t.formatToParts(n)) : t.formatToParts(n);
  e && o.unshift({ type: "prefix", value: e }), i && o.push({ type: "suffix", value: i });
  const a = [], r = [], c = [], d = [], f = {}, p = (l) => `${l}:${f[l] = (f[l] ?? -1) + 1}`;
  let m = "", g = !1, v = !1;
  for (const l of o) {
    m += l.value;
    const h = l.type === "minusSign" || l.type === "plusSign" ? "sign" : l.type;
    h === "integer" ? (g = !0, r.push(...l.value.split("").map((_) => ({ type: h, value: parseInt(_) })))) : h === "group" ? r.push({ type: h, value: l.value }) : h === "decimal" ? (v = !0, c.push({ type: h, value: l.value, key: p(h) })) : h === "fraction" ? c.push(...l.value.split("").map((_) => ({
      type: h,
      value: parseInt(_),
      key: p(h),
      pos: -1 - f[h]
    }))) : (g || v ? d : a).push({
      type: h,
      value: l.value,
      key: p(h)
    });
  }
  const w = [];
  for (let l = r.length - 1; l >= 0; l--) {
    const h = r[l];
    w.unshift(h.type === "integer" ? {
      ...h,
      key: p(h.type),
      pos: f[h.type]
    } : {
      ...h,
      key: p(h.type)
    });
  }
  return {
    pre: a,
    integer: w,
    fraction: c,
    post: d,
    valueAsString: m,
    value: typeof n == "string" ? parseFloat(n) : n
  };
}
const D = j && S && T;
class F extends L {
  constructor() {
    super(), this.created = !1, this.batched = !1;
    const { animated: t, ...e } = this.constructor.defaultProps;
    this._animated = this.computedAnimated = t, Object.assign(this, e);
  }
  get animated() {
    return this._animated;
  }
  set animated(t) {
    var e;
    this.animated !== t && (this._animated = t, (e = this.shadowRoot) == null || e.getAnimations().forEach((i) => i.finish()));
  }
  /**
   * @internal
   */
  set data(t) {
    var r, c;
    if (t == null)
      return;
    const { pre: e, integer: i, fraction: s, post: o, value: a } = t;
    if (this.created) {
      const d = this._data;
      this._data = t, this.computedTrend = typeof this.trend == "function" ? this.trend(d.value, a) : this.trend, this.computedAnimated = D && this._animated && (!this.respectMotionPreference || !((r = M) != null && r.matches)) && // https://github.com/barvian/number-flow/issues/9
      k(this) && // https://github.com/barvian/number-flow/issues/165
      this.ownerDocument.visibilityState === "visible", (c = this.plugins) == null || c.forEach((f) => {
        var p;
        return (p = f.onUpdate) == null ? void 0 : p.call(f, t, d, this);
      }), this.batched || this.willUpdate(), this._pre.update(e), this._num.update({ integer: i, fraction: s }), this._post.update(o), this.batched || this.didUpdate();
    } else {
      this._data = t, this.attachShadow({ mode: "open" });
      try {
        this._internals ?? (this._internals = this.attachInternals()), this._internals.role = "img";
      } catch {
      }
      const d = document.createElement("style");
      this.nonce && (d.nonce = this.nonce), d.textContent = P, this.shadowRoot.appendChild(d), this._pre = new E(this, e, {
        justify: "right",
        part: "left"
      }), this.shadowRoot.appendChild(this._pre.el), this._num = new I(this, i, s), this.shadowRoot.appendChild(this._num.el), this._post = new E(this, o, {
        justify: "left",
        part: "right"
      }), this.shadowRoot.appendChild(this._post.el), this.created = !0;
    }
    try {
      this._internals.ariaLabel = t.valueAsString;
    } catch {
    }
  }
  /**
   * @internal
   */
  willUpdate() {
    this._pre.willUpdate(), this._num.willUpdate(), this._post.willUpdate();
  }
  /**
   * @internal
   */
  didUpdate() {
    if (!this.computedAnimated)
      return;
    this._abortAnimationsFinish ? this._abortAnimationsFinish.abort() : this.dispatchEvent(new Event("animationsstart")), this._pre.didUpdate(), this._num.didUpdate(), this._post.didUpdate();
    const t = new AbortController();
    Promise.all(this.shadowRoot.getAnimations().map((e) => e.finished)).then(() => {
      t.signal.aborted || (this.dispatchEvent(new Event("animationsfinish")), this._abortAnimationsFinish = void 0);
    }), this._abortAnimationsFinish = t;
  }
}
F.defaultProps = {
  transformTiming: {
    duration: 900,
    // Make sure to keep this minified:
    easing: "linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)"
  },
  spinTiming: void 0,
  opacityTiming: { duration: 450, easing: "ease-out" },
  animated: !0,
  trend: (n, t) => Math.sign(t - n),
  respectMotionPreference: !0,
  plugins: void 0,
  digits: void 0
};
class I {
  constructor(t, e, i, { className: s, ...o } = {}) {
    this.flow = t, this._integer = new A(t, e, {
      justify: "right",
      part: "integer"
    }), this._fraction = new A(t, i, {
      justify: "left",
      part: "fraction"
    }), this._inner = u("span", {
      className: "number__inner"
    }, [this._integer.el, this._fraction.el]), this.el = u("span", {
      ...o,
      part: "number",
      className: `number ${s ?? ""}`
    }, [this._inner]);
  }
  willUpdate() {
    this._prevWidth = this.el.offsetWidth, this._prevLeft = this.el.getBoundingClientRect().left, this._integer.willUpdate(), this._fraction.willUpdate();
  }
  update({ integer: t, fraction: e }) {
    this._integer.update(t), this._fraction.update(e);
  }
  didUpdate() {
    const t = this.el.getBoundingClientRect();
    this._integer.didUpdate(), this._fraction.didUpdate();
    const e = this._prevLeft - t.left, i = this.el.offsetWidth, s = this._prevWidth - i;
    this.el.style.setProperty("--width", String(i)), this.el.animate({
      [N]: [`${e}px`, "0px"],
      [$]: [s, 0]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
  }
}
class R {
  constructor(t, e, { justify: i, className: s, ...o }, a) {
    this.flow = t, this.children = /* @__PURE__ */ new Map(), this.onCharRemove = (c) => () => {
      this.children.delete(c);
    }, this.justify = i;
    const r = e.map((c) => this.addChar(c).el);
    this.el = u("span", {
      ...o,
      className: `section section--justify-${i} ${s ?? ""}`
    }, a ? a(r) : r);
  }
  addChar(t, { startDigitsAtZero: e = !1, ...i } = {}) {
    const s = t.type === "integer" || t.type === "fraction" ? new C(this, t.type, e ? 0 : t.value, t.pos, {
      ...i,
      onRemove: this.onCharRemove(t.key)
    }) : new O(this, t.type, t.value, {
      ...i,
      onRemove: this.onCharRemove(t.key)
    });
    return this.children.set(t.key, s), s;
  }
  unpop(t) {
    t.el.removeAttribute("inert"), t.el.style.top = "", t.el.style[this.justify] = "";
  }
  pop(t) {
    t.forEach((e) => {
      e.el.style.top = `${e.el.offsetTop}px`, e.el.style[this.justify] = `${W(e.el, this.justify)}px`;
    }), t.forEach((e) => {
      e.el.setAttribute("inert", ""), e.present = !1;
    });
  }
  addNewAndUpdateExisting(t) {
    const e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = this.justify === "left", o = s ? "prepend" : "append";
    if (B(t, (a) => {
      let r;
      this.children.has(a.key) ? (r = this.children.get(a.key), i.set(a, r), this.unpop(r), r.present = !0) : (r = this.addChar(a, { startDigitsAtZero: !0, animateIn: !0 }), e.set(a, r)), this.el[o](r.el);
    }, { reverse: s }), this.flow.computedAnimated) {
      const a = this.el.getBoundingClientRect();
      e.forEach((r) => {
        r.willUpdate(a);
      });
    }
    e.forEach((a, r) => {
      a.update(r.value);
    }), i.forEach((a, r) => {
      a.update(r.value);
    });
  }
  willUpdate() {
    const t = this.el.getBoundingClientRect();
    this._prevOffset = t[this.justify], this.children.forEach((e) => e.willUpdate(t));
  }
  didUpdate() {
    const t = this.el.getBoundingClientRect();
    this.children.forEach((s) => s.didUpdate(t));
    const e = t[this.justify], i = this._prevOffset - e;
    i && this.children.size && this.el.animate({
      transform: [`translateX(${i}px)`, "none"]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
  }
}
class A extends R {
  update(t) {
    const e = /* @__PURE__ */ new Map();
    this.children.forEach((i, s) => {
      t.find((o) => o.key === s) || e.set(s, i), this.unpop(i);
    }), this.addNewAndUpdateExisting(t), e.forEach((i) => {
      i instanceof C && i.update(0);
    }), this.pop(e);
  }
}
class E extends R {
  update(t) {
    const e = /* @__PURE__ */ new Map();
    this.children.forEach((i, s) => {
      t.find((o) => o.key === s) || e.set(s, i);
    }), this.pop(e), this.addNewAndUpdateExisting(t);
  }
}
class y {
  constructor(t, e, { onRemove: i, animateIn: s = !1 } = {}) {
    this.flow = t, this.el = e, this._present = !0, this._remove = () => {
      var o;
      this.el.remove(), (o = this._onRemove) == null || o.call(this);
    }, this.el.classList.add("animate-presence"), this.flow.computedAnimated && s && this.el.animate({
      [b]: [-0.9999, 0]
    }, {
      ...this.flow.opacityTiming,
      composite: "accumulate"
    }), this._onRemove = i;
  }
  get present() {
    return this._present;
  }
  set present(t) {
    if (this._present !== t) {
      if (this._present = t, t ? this.el.removeAttribute("inert") : this.el.setAttribute("inert", ""), !this.flow.computedAnimated) {
        t || this._remove();
        return;
      }
      this.el.style.setProperty("--_number-flow-d-opacity", t ? "0" : "-.999"), this.el.animate({
        [b]: t ? [-0.9999, 0] : [0.999, 0]
      }, {
        ...this.flow.opacityTiming,
        composite: "accumulate"
      }), t ? this.flow.removeEventListener("animationsfinish", this._remove) : this.flow.addEventListener("animationsfinish", this._remove, {
        once: !0
      });
    }
  }
}
class x extends y {
  constructor(t, e, i, s) {
    super(t.flow, i, s), this.section = t, this.value = e, this.el = i;
  }
}
class C extends x {
  constructor(t, e, i, s, o) {
    var d, f;
    const a = (((f = (d = t.flow.digits) == null ? void 0 : d[s]) == null ? void 0 : f.max) ?? 9) + 1, r = Array.from({ length: a }).map((p, m) => {
      const g = u("span", { className: "digit__num" }, [
        document.createTextNode(String(m))
      ]);
      return m !== i && g.setAttribute("inert", ""), g.style.setProperty("--n", String(m)), g;
    }), c = u("span", {
      part: `digit ${e}-digit`,
      className: "digit"
    }, r);
    c.style.setProperty("--current", String(i)), c.style.setProperty("--length", String(a)), super(t, i, c, o), this.pos = s, this._onAnimationsFinish = () => {
      this.el.classList.remove("is-spinning");
    }, this._numbers = r, this.length = a;
  }
  willUpdate(t) {
    const e = this.el.getBoundingClientRect();
    this._prevValue = this.value;
    const i = e[this.section.justify] - t[this.section.justify], s = e.width / 2;
    this._prevCenter = this.section.justify === "left" ? i + s : i - s;
  }
  update(t) {
    this.el.style.setProperty("--current", String(t)), this._numbers.forEach((e, i) => i === t ? e.removeAttribute("inert") : e.setAttribute("inert", "")), this.value = t;
  }
  didUpdate(t) {
    const e = this.el.getBoundingClientRect(), i = e[this.section.justify] - t[this.section.justify], s = e.width / 2, o = this.section.justify === "left" ? i + s : i - s, a = this._prevCenter - o;
    a && this.el.animate({
      transform: [`translateX(${a}px)`, "none"]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
    const r = this.getDelta();
    r && (this.el.classList.add("is-spinning"), this.el.animate({
      [V]: [-r, 0]
    }, {
      ...this.flow.spinTiming ?? this.flow.transformTiming,
      composite: "accumulate"
    }), this.flow.addEventListener("animationsfinish", this._onAnimationsFinish, { once: !0 }));
  }
  getDelta() {
    var i;
    if (this.flow.plugins)
      for (const s of this.flow.plugins) {
        const o = (i = s.getDelta) == null ? void 0 : i.call(s, this.value, this._prevValue, this);
        if (o != null)
          return o;
      }
    const t = this.value - this._prevValue, e = this.flow.computedTrend || Math.sign(t);
    return e < 0 && this.value > this._prevValue ? this.value - this.length - this._prevValue : e > 0 && this.value < this._prevValue ? this.length - this._prevValue + this.value : t;
  }
}
class O extends x {
  constructor(t, e, i, s) {
    const o = u("span", {
      className: "symbol__value",
      textContent: i
    });
    super(t, i, u("span", {
      part: `symbol ${e}`,
      className: "symbol"
    }, [o]), s), this.type = e, this._children = /* @__PURE__ */ new Map(), this._onChildRemove = (a) => () => {
      this._children.delete(a);
    }, this._children.set(i, new y(this.flow, o, {
      onRemove: this._onChildRemove(i)
    }));
  }
  willUpdate(t) {
    if (this.type === "decimal")
      return;
    const e = this.el.getBoundingClientRect();
    this._prevOffset = e[this.section.justify] - t[this.section.justify];
  }
  update(t) {
    if (this.value !== t) {
      const e = this._children.get(this.value);
      e && (e.present = !1);
      const i = this._children.get(t);
      if (i)
        i.present = !0;
      else {
        const s = u("span", {
          className: "symbol__value",
          textContent: t
        });
        this.el.appendChild(s), this._children.set(t, new y(this.flow, s, {
          animateIn: !0,
          onRemove: this._onChildRemove(t)
        }));
      }
    }
    this.value = t;
  }
  didUpdate(t) {
    if (this.type === "decimal")
      return;
    const i = this.el.getBoundingClientRect()[this.section.justify] - t[this.section.justify], s = this._prevOffset - i;
    s && this.el.animate({
      transform: [`translateX(${s}px)`, "none"]
    }, { ...this.flow.transformTiming, composite: "accumulate" });
  }
}
export {
  C as Digit,
  D as canAnimate,
  Q as continuous,
  F as default,
  z as define,
  K as formatToData,
  M as prefersReducedMotion,
  G as renderInnerHTML
};
