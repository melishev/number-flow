import { defineComponent as x, provide as F, renderSlot as A, watch as L, nextTick as S, onUnmounted as N, ref as v, computed as y, inject as j, openBlock as V, createElementBlock as X, mergeProps as G, unref as T, onMounted as z, watchEffect as H, toValue as P } from "vue";
import o, { formatToData as R, renderInnerHTML as U, define as W, canAnimate as I, prefersReducedMotion as b } from "number-flow/lite";
import { default as oe } from "number-flow/lite";
import { BROWSER as h } from "esm-env";
export * from "number-flow/plugins";
const k = String.raw;
h && (() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
})();
h && typeof CSS < "u" && CSS.supports && CSS.supports("line-height", "mod(1,1)");
h && typeof matchMedia < "u" && matchMedia("(prefers-reduced-motion: reduce)");
const C = "--_number-flow-d-opacity", M = "--_number-flow-d-width", w = "--_number-flow-dx", _ = "--_number-flow-d";
(() => {
  try {
    return CSS.registerProperty({
      name: C,
      syntax: "<number>",
      inherits: !1,
      initialValue: "0"
    }), CSS.registerProperty({
      name: w,
      syntax: "<length>",
      inherits: !0,
      initialValue: "0px"
    }), CSS.registerProperty({
      name: M,
      syntax: "<number>",
      inherits: !1,
      initialValue: "0"
    }), CSS.registerProperty({
      name: _,
      syntax: "<number>",
      inherits: !0,
      initialValue: "0"
    }), !0;
  } catch {
    return !1;
  }
})();
const g = "round(nearest, calc(var(--number-flow-mask-height, 0.25em) / 2), 1px)", s = `calc(${g} * 2)`, $ = "var(--number-flow-mask-width, 0.5em)", c = `calc(${$} / var(--scale-x))`, p = "#000 0, transparent 71%", Y = k`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:1}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${M}) / var(--width));transform:translateX(var(${w})) scaleX(var(--scale-x));margin:0 calc(-1 * ${$});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${c},#000 calc(100% - ${c}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${s},#000 calc(100% - ${s}),transparent 100% ),radial-gradient(at bottom right,${p}),radial-gradient(at bottom left,${p}),radial-gradient(at top left,${p}),radial-gradient(at top right,${p});-webkit-mask-size:100% calc(100% - ${s} * 2),calc(100% - ${c} * 2) 100%,${c} ${s},${c} ${s},${c} ${s},${c} ${s};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${g} ${$};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${w})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${_})}.digit__num,.number .section::after{padding:${g} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${C}))}`, D = k`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${g} 0}.symbol{white-space:pre}`, O = (e = "") => k`:where(number-flow${e}){line-height:1}number-flow${e} > span{font-kerning:none;display:inline-block;padding:${s} 0}`, q = (e) => [D, O(e), Y], E = Symbol(), ee = /* @__PURE__ */ x({
  __name: "NumberFlowGroup",
  setup(e) {
    const l = /* @__PURE__ */ new Set();
    let a = !1;
    return F(E, (i, m) => {
      l.add(i), L(
        m,
        async () => {
          a || (a = !0, l.forEach(async (t) => {
            var d;
            !t.value || !t.value.created || (t.value.willUpdate(), await S(), (d = t.value) == null || d.didUpdate());
          }), await S(), a = !1);
        }
        // { flush: 'pre' } // default
      ), N(() => {
        l.delete(i);
      });
    }), (i, m) => A(i.$slots, "default");
  }
}), J = ["batched", "trend", "plugins", "animated", "transformTiming", "spinTiming", "opacityTiming", "respectMotionPreference", "nonce", "data-will-change", "digits", "innerHTML", "data"], te = /* @__PURE__ */ x({
  inheritAttrs: !1,
  __name: "index",
  props: {
    transformTiming: { default: () => o.defaultProps.transformTiming },
    spinTiming: { default: () => o.defaultProps.spinTiming },
    opacityTiming: { default: () => o.defaultProps.opacityTiming },
    animated: { type: Boolean, default: () => o.defaultProps.animated },
    respectMotionPreference: { type: Boolean, default: () => o.defaultProps.respectMotionPreference },
    trend: { type: [Number, Function], default: () => o.defaultProps.trend },
    plugins: { default: () => o.defaultProps.plugins },
    digits: { default: () => o.defaultProps.digits },
    locales: {},
    format: {},
    value: {},
    prefix: {},
    suffix: {},
    nonce: {},
    willChange: { type: Boolean, default: !1 },
    transformParts: { type: Function }
  },
  emits: ["animationsstart", "animationsfinish"],
  setup(e, { expose: l, emit: a }) {
    const r = v();
    l({ el: r });
    const i = a, m = y(() => new Intl.NumberFormat(e.locales, e.format)), t = y(() => R(e.value, m.value, e.prefix, e.suffix, e.transformParts)), d = h ? void 0 : U(t.value, { nonce: e.nonce, elementSuffix: "-vue" }), u = j(E, void 0);
    return u == null || u(r, t), (n, f) => (V(), X("number-flow-vue", G({
      ref_key: "el",
      ref: r
    }, n.$attrs, {
      batched: !!T(u),
      trend: n.trend,
      plugins: n.plugins,
      animated: n.animated,
      transformTiming: n.transformTiming,
      spinTiming: n.spinTiming,
      opacityTiming: n.opacityTiming,
      respectMotionPreference: n.respectMotionPreference,
      nonce: n.nonce,
      "data-will-change": n.willChange ? "" : void 0,
      digits: n.digits,
      innerHTML: T(d),
      "data-allow-mismatch": "",
      onAnimationsstart: f[0] || (f[0] = (B) => i("animationsstart")),
      onAnimationsfinish: f[1] || (f[1] = (B) => i("animationsfinish")),
      data: t.value
    }), null, 16, J));
  }
}), ne = q("-vue");
W("number-flow-vue", o);
function ie({
  respectMotionPreference: e = !0
} = {}) {
  const l = v(!1), a = v(!1);
  return z(() => {
    var r;
    l.value = I, a.value = ((r = b) == null ? void 0 : r.matches) ?? !1;
  }), H((r) => {
    var m;
    if (!P(e)) return;
    const i = ({ matches: t }) => {
      a.value = t;
    };
    (m = b) == null || m.addEventListener("change", i), r(() => {
      var t;
      (t = b) == null || t.removeEventListener("change", i);
    });
  }), y(
    () => l.value && (!P(e) || !a.value)
  );
}
export {
  oe as NumberFlowElement,
  ee as NumberFlowGroup,
  te as default,
  ne as styles,
  ie as useCanAnimate
};
