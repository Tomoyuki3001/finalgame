/*!
 * VERSION: beta 1.9.2
 * DATE: 2013-03-25
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, easing.EasePack, plugins.CSSPlugin, plugins.RoundPropsPlugin, plugins.BezierPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function () {
  "use strict";
  window._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (a, b, c) {
      var d = function (a, b, d) {
          c.call(this, a, b, d),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._dirty = !0);
        },
        e = function (a) {
          return (
            a.jquery ||
            ("function" == typeof a.each && a[0] && a[0].nodeType && a[0].style)
          );
        },
        f = function (a) {
          var b = [];
          return (
            a.each(function () {
              b.push(this);
            }),
            b
          );
        },
        g = (d.prototype = c.to({}, 0.1, {})),
        h = [];
      (d.version = "1.9.2"),
        (g.constructor = d),
        (g.kill()._gc = !1),
        (d.killTweensOf = d.killDelayedCallsTo = c.killTweensOf),
        (d.getTweensOf = c.getTweensOf),
        (d.ticker = c.ticker),
        (g.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            c.prototype.invalidate.call(this)
          );
        }),
        (g.updateTo = function (a, b) {
          var e,
            d = this.ratio;
          b &&
            this.timeline &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (e in a) this.vars[e] = a[e];
          if (this._initted)
            if (b) this._initted = !1;
            else if (
              (this._notifyPluginsOfEnabled &&
                this._firstPT &&
                c._onPluginEvent("_onDisable", this),
              this._time / this._duration > 0.998)
            ) {
              var f = this._time;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(f, !0, !1);
            } else if (this._time > 0) {
              (this._initted = !1), this._init();
              for (var i, g = 1 / (1 - d), h = this._firstPT; h; )
                (i = h.s + h.c), (h.c *= g), (h.s = i - h.c), (h = h._next);
            }
          return this;
        }),
        (g.render = function (a, b, c) {
          var i,
            j,
            k,
            l,
            m,
            n,
            o,
            d = this._dirty ? this.totalDuration() : this._totalDuration,
            e = this._time,
            f = this._totalTime,
            g = this._cycle;
          if (
            (a >= d
              ? ((this._totalTime = d),
                (this._cycle = this._repeat),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = this._duration),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed || ((i = !0), (j = "onComplete")),
                0 === this._duration &&
                  ((0 === a || 0 > this._rawPrevTime) &&
                    this._rawPrevTime !== a &&
                    (c = !0),
                  (this._rawPrevTime = a)))
              : 1e-7 > a
              ? ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== f || (0 === this._duration && this._rawPrevTime > 0)) &&
                  ((j = "onReverseComplete"), (i = this._reversed)),
                0 > a
                  ? ((this._active = !1),
                    0 === this._duration &&
                      (this._rawPrevTime >= 0 && (c = !0),
                      (this._rawPrevTime = a)))
                  : this._initted || (c = !0))
              : ((this._totalTime = this._time = a),
                0 !== this._repeat &&
                  ((l = this._duration + this._repeatDelay),
                  (this._cycle = (this._totalTime / l) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / l &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * l),
                  this._yoyo &&
                    0 !== (1 & this._cycle) &&
                    (this._time = this._duration - this._time),
                  this._time > this._duration
                    ? (this._time = this._duration)
                    : 0 > this._time && (this._time = 0)),
                this._easeType
                  ? ((m = this._time / this._duration),
                    (n = this._easeType),
                    (o = this._easePower),
                    (1 === n || (3 === n && m >= 0.5)) && (m = 1 - m),
                    3 === n && (m *= 2),
                    1 === o
                      ? (m *= m)
                      : 2 === o
                      ? (m *= m * m)
                      : 3 === o
                      ? (m *= m * m * m)
                      : 4 === o && (m *= m * m * m * m),
                    (this.ratio =
                      1 === n
                        ? 1 - m
                        : 2 === n
                        ? m
                        : 0.5 > this._time / this._duration
                        ? m / 2
                        : 1 - m / 2))
                  : (this.ratio = this._ease.getRatio(
                      this._time / this._duration
                    ))),
            e === this._time && !c)
          )
            return (
              f !== this._totalTime &&
                this._onUpdate &&
                (b ||
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || h
                  )),
              void 0
            );
          if (!this._initted) {
            if ((this._init(), !this._initted)) return;
            this._time && !i
              ? (this.ratio = this._ease.getRatio(this._time / this._duration))
              : i &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._active || this._paused || (this._active = !0),
              0 === f &&
                (this._startAt &&
                  (a >= 0
                    ? this._startAt.render(a, b, c)
                    : j || (j = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._totalTime || 0 === this._duration) &&
                  (b ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || h
                    ))),
              k = this._firstPT;
            k;

          )
            k.f
              ? k.t[k.p](k.c * this.ratio + k.s)
              : (k.t[k.p] = k.c * this.ratio + k.s),
              (k = k._next);
          this._onUpdate &&
            (0 > a && this._startAt && this._startAt.render(a, b, c),
            b ||
              this._onUpdate.apply(
                this.vars.onUpdateScope || this,
                this.vars.onUpdateParams || h
              )),
            this._cycle !== g &&
              (b ||
                this._gc ||
                (this.vars.onRepeat &&
                  this.vars.onRepeat.apply(
                    this.vars.onRepeatScope || this,
                    this.vars.onRepeatParams || h
                  ))),
            j &&
              (this._gc ||
                (0 > a &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startAt.render(a, b, c),
                i &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !b &&
                  this.vars[j] &&
                  this.vars[j].apply(
                    this.vars[j + "Scope"] || this,
                    this.vars[j + "Params"] || h
                  )));
        }),
        (d.to = function (a, b, c) {
          return new d(a, b, c);
        }),
        (d.from = function (a, b, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            new d(a, b, c)
          );
        }),
        (d.fromTo = function (a, b, c, e) {
          return (
            (e.startAt = c),
            (e.immediateRender =
              0 != e.immediateRender && 0 != c.immediateRender),
            new d(a, b, e)
          );
        }),
        (d.staggerTo = d.allTo =
          function (a, b, g, i, j, k, l) {
            i = i || 0;
            var p,
              q,
              r,
              s,
              m = g.delay || 0,
              n = [],
              o = function () {
                g.onComplete &&
                  g.onComplete.apply(
                    g.onCompleteScope || this,
                    g.onCompleteParams || h
                  ),
                  j.apply(l || this, k || h);
              };
            for (
              a instanceof Array ||
                ("string" == typeof a && (a = c.selector(a) || a),
                e(a) && (a = f(a))),
                p = a.length,
                r = 0;
              p > r;
              r++
            ) {
              q = {};
              for (s in g) q[s] = g[s];
              (q.delay = m),
                r === p - 1 && j && (q.onComplete = o),
                (n[r] = new d(a[r], b, q)),
                (m += i);
            }
            return n;
          }),
        (d.staggerFrom = d.allFrom =
          function (a, b, c, e, f, g, h) {
            return (
              (c.runBackwards = !0),
              (c.immediateRender = 0 != c.immediateRender),
              d.staggerTo(a, b, c, e, f, g, h)
            );
          }),
        (d.staggerFromTo = d.allFromTo =
          function (a, b, c, e, f, g, h, i) {
            return (
              (e.startAt = c),
              (e.immediateRender =
                0 != e.immediateRender && 0 != c.immediateRender),
              d.staggerTo(a, b, e, f, g, h, i)
            );
          }),
        (d.delayedCall = function (a, b, c, e, f) {
          return new d(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            onCompleteScope: e,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            onReverseCompleteScope: e,
            immediateRender: !1,
            useFrames: f,
            overwrite: 0,
          });
        }),
        (d.set = function (a, b) {
          return new d(a, 0, b);
        }),
        (d.isTweening = function (a) {
          for (var e, b = c.getTweensOf(a), d = b.length; --d > -1; )
            if (
              ((e = b[d]),
              e._active ||
                (e._startTime === e._timeline._time && e._timeline._active))
            )
              return !0;
          return !1;
        });
      var i = function (a, b) {
          for (var d = [], e = 0, f = a._first; f; )
            f instanceof c
              ? (d[e++] = f)
              : (b && (d[e++] = f), (d = d.concat(i(f, b))), (e = d.length)),
              (f = f._next);
          return d;
        },
        j = (d.getAllTweens = function (b) {
          return i(a._rootTimeline, b).concat(i(a._rootFramesTimeline, b));
        });
      (d.killAll = function (a, c, d, e) {
        null == c && (c = !0), null == d && (d = !0);
        var i,
          k,
          l,
          f = j(0 != e),
          g = f.length,
          h = c && d && e;
        for (l = 0; g > l; l++)
          (k = f[l]),
            (h ||
              k instanceof b ||
              ((i = k.target === k.vars.onComplete) && d) ||
              (c && !i)) &&
              (a ? k.totalTime(k.totalDuration()) : k._enabled(!1, !1));
      }),
        (d.killChildTweensOf = function (a, b) {
          if (null != a) {
            var h,
              i,
              j,
              k,
              l,
              g = c._tweenLookup;
            if (
              ("string" == typeof a && (a = c.selector(a) || a),
              e(a) && (a = f(a)),
              a instanceof Array)
            )
              for (k = a.length; --k > -1; ) d.killChildTweensOf(a[k], b);
            else {
              h = [];
              for (j in g)
                for (i = g[j].target.parentNode; i; )
                  i === a && (h = h.concat(g[j].tweens)), (i = i.parentNode);
              for (l = h.length, k = 0; l > k; k++)
                b && h[k].totalTime(h[k].totalDuration()),
                  h[k]._enabled(!1, !1);
            }
          }
        });
      var k = function (a, c, d, e) {
        void 0 === c && (c = !0), void 0 === d && (d = !0);
        for (var i, k, f = j(e), g = c && d && e, h = f.length; --h > -1; )
          (k = f[h]),
            (g ||
              k instanceof b ||
              ((i = k.target === k.vars.onComplete) && d) ||
              (c && !i)) &&
              k.paused(a);
      };
      return (
        (d.pauseAll = function (a, b, c) {
          k(!0, a, b, c);
        }),
        (d.resumeAll = function (a, b, c) {
          k(!1, a, b, c);
        }),
        (g.progress = function (a) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                  this._cycle * (this._duration + this._repeatDelay),
                !1
              )
            : this._time / this.duration();
        }),
        (g.totalProgress = function (a) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * a, !1)
            : this._totalTime / this.totalDuration();
        }),
        (g.time = function (a, b) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              a > this._duration && (a = this._duration),
              this._yoyo && 0 !== (1 & this._cycle)
                ? (a =
                    this._duration -
                    a +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (a += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(a, b))
            : this._time;
        }),
        (g.duration = function (b) {
          return arguments.length
            ? a.prototype.duration.call(this, b)
            : this._duration;
        }),
        (g.totalDuration = function (a) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (a - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (g.repeat = function (a) {
          return arguments.length
            ? ((this._repeat = a), this._uncache(!0))
            : this._repeat;
        }),
        (g.repeatDelay = function (a) {
          return arguments.length
            ? ((this._repeatDelay = a), this._uncache(!0))
            : this._repeatDelay;
        }),
        (g.yoyo = function (a) {
          return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
        }),
        d
      );
    },
    !0
  ),
    window._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (a, b, c) {
        var d = function (a) {
            b.call(this, a),
              (this._labels = {}),
              (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
              (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            for (var f, g, c = this.vars, d = e.length; --d > -1; )
              if ((g = c[e[d]]))
                for (f = g.length; --f > -1; )
                  "{self}" === g[f] &&
                    ((g = c[e[d]] = g.concat()), (g[f] = this));
            c.tweens instanceof Array &&
              this.add(c.tweens, 0, c.align, c.stagger);
          },
          e = [
            "onStartParams",
            "onUpdateParams",
            "onCompleteParams",
            "onReverseCompleteParams",
            "onRepeatParams",
          ],
          f = [],
          g = function (a) {
            var c,
              b = {};
            for (c in a) b[c] = a[c];
            return b;
          },
          h = (d.prototype = new b());
        return (
          (d.version = "1.9.2"),
          (h.constructor = d),
          (h.kill()._gc = !1),
          (h.to = function (a, b, d, e) {
            return this.add(new c(a, b, d), e);
          }),
          (h.from = function (a, b, d, e) {
            return this.add(c.from(a, b, d), e);
          }),
          (h.fromTo = function (a, b, d, e, f) {
            return this.add(c.fromTo(a, b, d, e), f);
          }),
          (h.staggerTo = function (a, b, e, f, h, i, j, k) {
            var m,
              n,
              l = new d({
                onComplete: i,
                onCompleteParams: j,
                onCompleteScope: k,
              });
            for (
              "string" == typeof a && (a = c.selector(a) || a),
                !(a instanceof Array) &&
                  "function" == typeof a.each &&
                  a[0] &&
                  a[0].nodeType &&
                  a[0].style &&
                  ((n = []),
                  a.each(function () {
                    n.push(this);
                  }),
                  (a = n)),
                f = f || 0,
                m = 0;
              a.length > m;
              m++
            )
              e.startAt && (e.startAt = g(e.startAt)),
                l.add(new c(a[m], b, g(e)), m * f);
            return this.add(l, h);
          }),
          (h.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return (
              (c.immediateRender = 0 != c.immediateRender),
              (c.runBackwards = !0),
              this.staggerTo(a, b, c, d, e, f, g, h)
            );
          }),
          (h.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return (
              (d.startAt = c),
              (d.immediateRender =
                0 != d.immediateRender && 0 != c.immediateRender),
              this.staggerTo(a, b, d, e, f, g, h, i)
            );
          }),
          (h.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e);
          }),
          (h.set = function (a, b, d) {
            return (
              (d = this._parseTimeOrLabel(d, 0, !0)),
              null == b.immediateRender &&
                (b.immediateRender = d === this._time && !this._paused),
              this.add(new c(a, 0, b), d)
            );
          }),
          (d.exportRoot = function (a, b) {
            (a = a || {}),
              null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var g,
              h,
              e = new d(a),
              f = e._timeline;
            for (
              null == b && (b = !0),
                f._remove(e, !0),
                e._startTime = 0,
                e._rawPrevTime = e._time = e._totalTime = f._time,
                g = f._first;
              g;

            )
              (h = g._next),
                (b && g instanceof c && g.target === g.vars.onComplete) ||
                  e.add(g, g._startTime - g._delay),
                (g = h);
            return f.add(e, 0), e;
          }),
          (h.add = function (e, f, g, h) {
            var i, j, k, l, m;
            if (
              ("number" != typeof f &&
                (f = this._parseTimeOrLabel(f, 0, !0, e)),
              !(e instanceof a))
            ) {
              if (e instanceof Array) {
                for (
                  g = g || "normal", h = h || 0, i = f, j = e.length, k = 0;
                  j > k;
                  k++
                )
                  (l = e[k]) instanceof Array && (l = new d({ tweens: l })),
                    this.add(l, i),
                    "string" != typeof l &&
                      "function" != typeof l &&
                      ("sequence" === g
                        ? (i = l._startTime + l.totalDuration() / l._timeScale)
                        : "start" === g && (l._startTime -= l.delay())),
                    (i += h);
                return this._uncache(!0);
              }
              if ("string" == typeof e) return this.addLabel(e, f);
              if ("function" != typeof e)
                throw (
                  "Cannot add " +
                  e +
                  " into the timeline: it is neither a tween, timeline, function, nor a string."
                );
              e = c.delayedCall(0, e);
            }
            if (
              (b.prototype.add.call(this, e, f),
              this._gc &&
                !this._paused &&
                this._time === this._duration &&
                this._time < this.duration())
            )
              for (m = this; m._gc && m._timeline; )
                m._timeline.smoothChildTiming
                  ? m.totalTime(m._totalTime, !0)
                  : m._enabled(!0, !1),
                  (m = m._timeline);
            return this;
          }),
          (h.remove = function (b) {
            if (b instanceof a) return this._remove(b, !1);
            if (b instanceof Array) {
              for (var c = b.length; --c > -1; ) this.remove(b[c]);
              return this;
            }
            return "string" == typeof b
              ? this.removeLabel(b)
              : this.kill(null, b);
          }),
          (h.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
          }),
          (h.insert = h.insertMultiple =
            function (a, b, c, d) {
              return this.add(a, b || 0, c, d);
            }),
          (h.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d);
          }),
          (h.addLabel = function (a, b) {
            return (this._labels[a] = this._parseTimeOrLabel(b)), this;
          }),
          (h.removeLabel = function (a) {
            return delete this._labels[a], this;
          }),
          (h.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1;
          }),
          (h._parseTimeOrLabel = function (b, c, d, e) {
            var f;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e instanceof Array)
              for (f = e.length; --f > -1; )
                e[f] instanceof a &&
                  e[f].timeline === this &&
                  this.remove(e[f]);
            if ("string" == typeof c)
              return this._parseTimeOrLabel(
                c,
                d && "number" == typeof b && null == this._labels[c]
                  ? b - this.duration()
                  : 0,
                d
              );
            if (
              ((c = c || 0),
              "string" != typeof b || (!isNaN(b) && null == this._labels[b]))
            )
              null == b && (b = this.duration());
            else {
              if (((f = b.indexOf("=")), -1 === f))
                return null == this._labels[b]
                  ? d
                    ? (this._labels[b] = this.duration() + c)
                    : c
                  : this._labels[b] + c;
              (c =
                parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1))),
                (b =
                  f > 1
                    ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d)
                    : this.duration());
            }
            return Number(b) + c;
          }),
          (h.seek = function (a, b) {
            return this.totalTime(
              "number" == typeof a ? a : this._parseTimeOrLabel(a),
              b !== !1
            );
          }),
          (h.stop = function () {
            return this.paused(!0);
          }),
          (h.gotoAndPlay = function (a, b) {
            return this.play(a, b);
          }),
          (h.gotoAndStop = function (a, b) {
            return this.pause(a, b);
          }),
          (h.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1), (this._active = !this._paused);
            var j,
              k,
              l,
              m,
              n,
              d = this._dirty ? this.totalDuration() : this._totalDuration,
              e = this._time,
              g = this._startTime,
              h = this._timeScale,
              i = this._paused;
            if (
              (a >= d
                ? ((this._totalTime = this._time = d),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((k = !0),
                    (m = "onComplete"),
                    0 === this._duration &&
                      (0 === a || 0 > this._rawPrevTime) &&
                      this._rawPrevTime !== a &&
                      (n = !0)),
                  (this._rawPrevTime = a),
                  (a = d + 1e-6))
                : 1e-7 > a
                ? ((this._totalTime = this._time = 0),
                  (0 !== e ||
                    (0 === this._duration && this._rawPrevTime > 0)) &&
                    ((m = "onReverseComplete"), (k = this._reversed)),
                  0 > a
                    ? ((this._active = !1),
                      0 === this._duration &&
                        this._rawPrevTime >= 0 &&
                        (n = !0))
                    : this._initted || (n = !0),
                  (this._rawPrevTime = a))
                : (this._totalTime = this._time = this._rawPrevTime = a),
              this._time !== e || c || n)
            ) {
              if (
                (this._initted || (this._initted = !0),
                0 === e &&
                  this.vars.onStart &&
                  0 !== this._time &&
                  (b ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || f
                    )),
                this._time >= e)
              )
                for (
                  j = this._first;
                  j && ((l = j._next), !this._paused || i);

                )
                  (j._active ||
                    (j._startTime <= this._time && !j._paused && !j._gc)) &&
                    (j._reversed
                      ? j.render(
                          (j._dirty ? j.totalDuration() : j._totalDuration) -
                            (a - j._startTime) * j._timeScale,
                          b,
                          c
                        )
                      : j.render((a - j._startTime) * j._timeScale, b, c)),
                    (j = l);
              else
                for (j = this._last; j && ((l = j._prev), !this._paused || i); )
                  (j._active || (e >= j._startTime && !j._paused && !j._gc)) &&
                    (j._reversed
                      ? j.render(
                          (j._dirty ? j.totalDuration() : j._totalDuration) -
                            (a - j._startTime) * j._timeScale,
                          b,
                          c
                        )
                      : j.render((a - j._startTime) * j._timeScale, b, c)),
                    (j = l);
              this._onUpdate &&
                (b ||
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || f
                  )),
                m &&
                  (this._gc ||
                    ((g === this._startTime || h !== this._timeScale) &&
                      (0 === this._time || d >= this.totalDuration()) &&
                      (k &&
                        (this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !b &&
                        this.vars[m] &&
                        this.vars[m].apply(
                          this.vars[m + "Scope"] || this,
                          this.vars[m + "Params"] || f
                        ))));
            }
          }),
          (h._hasPausedChild = function () {
            for (var a = this._first; a; ) {
              if (a._paused || (a instanceof d && a._hasPausedChild()))
                return !0;
              a = a._next;
            }
            return !1;
          }),
          (h.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g; )
              e > g._startTime ||
                (g instanceof c
                  ? b !== !1 && (f[h++] = g)
                  : (d !== !1 && (f[h++] = g),
                    a !== !1 &&
                      ((f = f.concat(g.getChildren(!0, b, d))),
                      (h = f.length)))),
                (g = g._next);
            return f;
          }),
          (h.getTweensOf = function (a, b) {
            for (
              var d = c.getTweensOf(a), e = d.length, f = [], g = 0;
              --e > -1;

            )
              (d[e].timeline === this || (b && this._contains(d[e]))) &&
                (f[g++] = d[e]);
            return f;
          }),
          (h._contains = function (a) {
            for (var b = a.timeline; b; ) {
              if (b === this) return !0;
              b = b.timeline;
            }
            return !1;
          }),
          (h.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var f, d = this._first, e = this._labels; d; )
              d._startTime >= c && (d._startTime += a), (d = d._next);
            if (b) for (f in e) e[f] >= c && (e[f] += a);
            return this._uncache(!0);
          }),
          (h._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (
              var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1),
                d = c.length,
                e = !1;
              --d > -1;

            )
              c[d]._kill(a, b) && (e = !0);
            return e;
          }),
          (h.clear = function (a) {
            var b = this.getChildren(!1, !0, !0),
              c = b.length;
            for (this._time = this._totalTime = 0; --c > -1; )
              b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (h.invalidate = function () {
            for (var a = this._first; a; ) a.invalidate(), (a = a._next);
            return this;
          }),
          (h._enabled = function (a, c) {
            if (a === this._gc)
              for (var d = this._first; d; ) d._enabled(a, !0), (d = d._next);
            return b.prototype._enabled.call(this, a, c);
          }),
          (h.progress = function (a) {
            return arguments.length
              ? this.totalTime(this.duration() * a, !1)
              : this._time / this.duration();
          }),
          (h.duration = function (a) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== a &&
                  this.timeScale(this._duration / a),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (h.totalDuration = function (a) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var e, f, b = 0, c = this._last, d = 999999999999; c; )
                  (e = c._prev),
                    c._dirty && c.totalDuration(),
                    c._startTime > d && this._sortChildren && !c._paused
                      ? this.add(c, c._startTime - c._delay)
                      : (d = c._startTime),
                    0 > c._startTime &&
                      !c._paused &&
                      ((b -= c._startTime),
                      this._timeline.smoothChildTiming &&
                        (this._startTime += c._startTime / this._timeScale),
                      this.shiftChildren(-c._startTime, !1, -9999999999),
                      (d = 0)),
                    (f = c._startTime + c._totalDuration / c._timeScale),
                    f > b && (b = f),
                    (c = e);
                (this._duration = this._totalDuration = b), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return (
              0 !== this.totalDuration() &&
                0 !== a &&
                this.timeScale(this._totalDuration / a),
              this
            );
          }),
          (h.usesFrames = function () {
            for (var b = this._timeline; b._timeline; ) b = b._timeline;
            return b === a._rootFramesTimeline;
          }),
          (h.rawTime = function () {
            return this._paused ||
              (0 !== this._totalTime && this._totalTime !== this._totalDuration)
              ? this._totalTime
              : (this._timeline.rawTime() - this._startTime) * this._timeScale;
          }),
          d
        );
      },
      !0
    ),
    window._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (a, b, c) {
        var d = function (b) {
            a.call(this, b),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = this.vars.yoyo === !0),
              (this._dirty = !0);
          },
          e = [],
          f = new c(null, null, 1, 0),
          g = function (a) {
            for (; a; ) {
              if (a._paused) return !0;
              a = a._timeline;
            }
            return !1;
          },
          h = (d.prototype = new a());
        return (
          (h.constructor = d),
          (h.kill()._gc = !1),
          (d.version = "1.9.2"),
          (h.invalidate = function () {
            return (
              (this._yoyo = this.vars.yoyo === !0),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              a.prototype.invalidate.call(this)
            );
          }),
          (h.addCallback = function (a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c);
          }),
          (h.removeCallback = function (a, b) {
            if (null == b) this._kill(null, a);
            else
              for (
                var c = this.getTweensOf(a, !1),
                  d = c.length,
                  e = this._parseTimeOrLabel(b);
                --d > -1;

              )
                c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this;
          }),
          (h.tweenTo = function (a, c) {
            c = c || {};
            var g,
              h,
              d = {
                ease: f,
                overwrite: 2,
                useFrames: this.usesFrames(),
                immediateRender: !1,
              };
            for (g in c) d[g] = c[g];
            return (
              (d.time = this._parseTimeOrLabel(a)),
              (h = new b(
                this,
                Math.abs(Number(d.time) - this._time) / this._timeScale ||
                  0.001,
                d
              )),
              (d.onStart = function () {
                h.target.paused(!0),
                  h.vars.time !== h.target.time() &&
                    h.duration(
                      Math.abs(h.vars.time - h.target.time()) /
                        h.target._timeScale
                    ),
                  c.onStart &&
                    c.onStart.apply(c.onStartScope || h, c.onStartParams || e);
              }),
              h
            );
          }),
          (h.tweenFromTo = function (a, b, c) {
            (c = c || {}), (c.startAt = { time: this._parseTimeOrLabel(a) });
            var d = this.tweenTo(b, c);
            return d.duration(
              Math.abs(d.vars.time - d.vars.startAt.time) / this._timeScale ||
                0.001
            );
          }),
          (h.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1), (this._active = !this._paused);
            var n,
              o,
              p,
              q,
              r,
              s,
              d = this._dirty ? this.totalDuration() : this._totalDuration,
              f = this._duration,
              g = this._time,
              h = this._totalTime,
              i = this._startTime,
              j = this._timeScale,
              k = this._rawPrevTime,
              l = this._paused,
              m = this._cycle;
            if (
              (a >= d
                ? (this._locked ||
                    ((this._totalTime = d), (this._cycle = this._repeat)),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((o = !0),
                    (q = "onComplete"),
                    0 === f &&
                      (0 === a || 0 > this._rawPrevTime) &&
                      this._rawPrevTime !== a &&
                      (r = !0)),
                  (this._rawPrevTime = a),
                  this._yoyo && 0 !== (1 & this._cycle)
                    ? (this._time = a = 0)
                    : ((this._time = f), (a = f + 1e-6)))
                : 1e-7 > a
                ? (this._locked || (this._totalTime = this._cycle = 0),
                  (this._time = 0),
                  (0 !== g ||
                    (0 === f && this._rawPrevTime > 0 && !this._locked)) &&
                    ((q = "onReverseComplete"), (o = this._reversed)),
                  0 > a
                    ? ((this._active = !1),
                      0 === f && this._rawPrevTime >= 0 && (r = !0))
                    : this._initted || (r = !0),
                  (this._rawPrevTime = a),
                  (a = 0))
                : ((this._time = this._rawPrevTime = a),
                  this._locked ||
                    ((this._totalTime = a),
                    0 !== this._repeat &&
                      ((s = f + this._repeatDelay),
                      (this._cycle = (this._totalTime / s) >> 0),
                      0 !== this._cycle &&
                        this._cycle === this._totalTime / s &&
                        this._cycle--,
                      (this._time = this._totalTime - this._cycle * s),
                      this._yoyo &&
                        0 !== (1 & this._cycle) &&
                        (this._time = f - this._time),
                      this._time > f
                        ? ((this._time = f), (a = f + 1e-6))
                        : 0 > this._time
                        ? (this._time = a = 0)
                        : (a = this._time)))),
              this._cycle !== m && !this._locked)
            ) {
              var t = this._yoyo && 0 !== (1 & m),
                u = t === (this._yoyo && 0 !== (1 & this._cycle)),
                v = this._totalTime,
                w = this._cycle,
                x = this._rawPrevTime,
                y = this._time;
              (this._totalTime = m * f),
                m > this._cycle ? (t = !t) : (this._totalTime += f),
                (this._time = g),
                (this._rawPrevTime = 0 === f ? k - 1e-5 : k),
                (this._cycle = m),
                (this._locked = !0),
                (g = t ? 0 : f),
                this.render(g, b, 0 === f),
                b ||
                  this._gc ||
                  (this.vars.onRepeat &&
                    this.vars.onRepeat.apply(
                      this.vars.onRepeatScope || this,
                      this.vars.onRepeatParams || e
                    )),
                u && ((g = t ? f + 1e-6 : -1e-6), this.render(g, !0, !1)),
                (this._time = y),
                (this._totalTime = v),
                (this._cycle = w),
                (this._rawPrevTime = x),
                (this._locked = !1);
            }
            if (this._time === g && !c && !r)
              return (
                h !== this._totalTime &&
                  this._onUpdate &&
                  (b ||
                    this._onUpdate.apply(
                      this.vars.onUpdateScope || this,
                      this.vars.onUpdateParams || e
                    )),
                void 0
              );
            if (
              (this._initted || (this._initted = !0),
              0 === h &&
                this.vars.onStart &&
                0 !== this._totalTime &&
                (b ||
                  this.vars.onStart.apply(
                    this.vars.onStartScope || this,
                    this.vars.onStartParams || e
                  )),
              this._time >= g)
            )
              for (n = this._first; n && ((p = n._next), !this._paused || l); )
                (n._active ||
                  (n._startTime <= this._time && !n._paused && !n._gc)) &&
                  (n._reversed
                    ? n.render(
                        (n._dirty ? n.totalDuration() : n._totalDuration) -
                          (a - n._startTime) * n._timeScale,
                        b,
                        c
                      )
                    : n.render((a - n._startTime) * n._timeScale, b, c)),
                  (n = p);
            else
              for (n = this._last; n && ((p = n._prev), !this._paused || l); )
                (n._active || (g >= n._startTime && !n._paused && !n._gc)) &&
                  (n._reversed
                    ? n.render(
                        (n._dirty ? n.totalDuration() : n._totalDuration) -
                          (a - n._startTime) * n._timeScale,
                        b,
                        c
                      )
                    : n.render((a - n._startTime) * n._timeScale, b, c)),
                  (n = p);
            this._onUpdate &&
              (b ||
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || e
                )),
              q &&
                (this._locked ||
                  this._gc ||
                  ((i === this._startTime || j !== this._timeScale) &&
                    (0 === this._time || d >= this.totalDuration()) &&
                    (o &&
                      (this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !b &&
                      this.vars[q] &&
                      this.vars[q].apply(
                        this.vars[q + "Scope"] || this,
                        this.vars[q + "Params"] || e
                      ))));
          }),
          (h.getActive = function (a, b, c) {
            null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
            var i,
              j,
              d = [],
              e = this.getChildren(a, b, c),
              f = 0,
              h = e.length;
            for (i = 0; h > i; i++)
              (j = e[i]),
                j._paused ||
                  (j._timeline._time >= j._startTime &&
                    j._timeline._time <
                      j._startTime + j._totalDuration / j._timeScale &&
                    (g(j._timeline) || (d[f++] = j)));
            return d;
          }),
          (h.getLabelAfter = function (a) {
            a || (0 !== a && (a = this._time));
            var d,
              b = this.getLabelsArray(),
              c = b.length;
            for (d = 0; c > d; d++) if (b[d].time > a) return b[d].name;
            return null;
          }),
          (h.getLabelBefore = function (a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1; )
              if (a > b[c].time) return b[c].name;
            return null;
          }),
          (h.getLabelsArray = function () {
            var c,
              a = [],
              b = 0;
            for (c in this._labels) a[b++] = { time: this._labels[c], name: c };
            return (
              a.sort(function (a, b) {
                return a.time - b.time;
              }),
              a
            );
          }),
          (h.progress = function (a) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                    this._cycle * (this._duration + this._repeatDelay),
                  !1
                )
              : this._time / this.duration();
          }),
          (h.totalProgress = function (a) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * a, !1)
              : this._totalTime / this.totalDuration();
          }),
          (h.totalDuration = function (b) {
            return arguments.length
              ? -1 === this._repeat
                ? this
                : this.duration(
                    (b - this._repeat * this._repeatDelay) / (this._repeat + 1)
                  )
              : (this._dirty &&
                  (a.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (h.time = function (a, b) {
            return arguments.length
              ? (this._dirty && this.totalDuration(),
                a > this._duration && (a = this._duration),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? (a =
                      this._duration -
                      a +
                      this._cycle * (this._duration + this._repeatDelay))
                  : 0 !== this._repeat &&
                    (a += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(a, b))
              : this._time;
          }),
          (h.repeat = function (a) {
            return arguments.length
              ? ((this._repeat = a), this._uncache(!0))
              : this._repeat;
          }),
          (h.repeatDelay = function (a) {
            return arguments.length
              ? ((this._repeatDelay = a), this._uncache(!0))
              : this._repeatDelay;
          }),
          (h.yoyo = function (a) {
            return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
          }),
          (h.currentLabel = function (a) {
            return arguments.length
              ? this.seek(a, !0)
              : this.getLabelBefore(this._time + 1e-8);
          }),
          d
        );
      },
      !0
    ),
    (function () {
      var a = 180 / Math.PI,
        b = Math.PI / 180,
        c = [],
        d = [],
        e = [],
        f = {},
        g = function (a, b, c, d) {
          (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.da = d - a),
            (this.ca = c - a),
            (this.ba = b - a);
        },
        h =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        i = function (a, b, c, d) {
          var e = { a: a },
            f = {},
            g = {},
            h = { c: d },
            i = (a + b) / 2,
            j = (b + c) / 2,
            k = (c + d) / 2,
            l = (i + j) / 2,
            m = (j + k) / 2,
            n = (m - l) / 8;
          return (
            (e.b = i + (a - i) / 4),
            (f.b = l + n),
            (e.c = f.a = (e.b + f.b) / 2),
            (f.c = g.a = (l + m) / 2),
            (g.b = m - n),
            (h.b = k + (d - k) / 4),
            (g.c = h.a = (g.b + h.b) / 2),
            [e, f, g, h]
          );
        },
        j = function (a, b, f, g, h) {
          var m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            j = a.length - 1,
            k = 0,
            l = a[0].a;
          for (m = 0; j > m; m++)
            (q = a[k]),
              (n = q.a),
              (o = q.d),
              (p = a[k + 1].d),
              h
                ? ((w = c[m]),
                  (x = d[m]),
                  (y = (0.25 * (x + w) * b) / (g ? 0.5 : e[m] || 0.5)),
                  (r = o - (o - n) * (g ? 0.5 * b : y / w)),
                  (s = o + (p - o) * (g ? 0.5 * b : y / x)),
                  (t = o - (r + ((s - r) * ((3 * w) / (w + x) + 0.5)) / 4)))
                : ((r = o - 0.5 * (o - n) * b),
                  (s = o + 0.5 * (p - o) * b),
                  (t = o - (r + s) / 2)),
              (r += t),
              (s += t),
              (q.c = u = r),
              (q.b = 0 !== m ? l : (l = q.a + 0.6 * (q.c - q.a))),
              (q.da = o - n),
              (q.ca = u - n),
              (q.ba = l - n),
              f
                ? ((v = i(n, l, u, o)),
                  a.splice(k, 1, v[0], v[1], v[2], v[3]),
                  (k += 4))
                : k++,
              (l = s);
          (q = a[k]),
            (q.b = l),
            (q.c = l + 0.4 * (q.d - l)),
            (q.da = q.d - q.a),
            (q.ca = q.c - q.a),
            (q.ba = l - q.a),
            f &&
              ((v = i(q.a, l, q.c, q.d)),
              a.splice(k, 1, v[0], v[1], v[2], v[3]));
        },
        k = function (a, b, e, f) {
          var i,
            j,
            k,
            l,
            m,
            n,
            h = [];
          if (f)
            for (a = [f].concat(a), j = a.length; --j > -1; )
              "string" == typeof (n = a[j][b]) &&
                "=" === n.charAt(1) &&
                (a[j][b] = f[b] + Number(n.charAt(0) + n.substr(2)));
          if (((i = a.length - 2), 0 > i))
            return (h[0] = new g(a[0][b], 0, 0, a[-1 > i ? 0 : 1][b])), h;
          for (j = 0; i > j; j++)
            (k = a[j][b]),
              (l = a[j + 1][b]),
              (h[j] = new g(k, 0, 0, l)),
              e &&
                ((m = a[j + 2][b]),
                (c[j] = (c[j] || 0) + (l - k) * (l - k)),
                (d[j] = (d[j] || 0) + (m - l) * (m - l)));
          return (h[j] = new g(a[j][b], 0, 0, a[j + 1][b])), h;
        },
        l = function (a, b, g, i, l, m) {
          var q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            n = {},
            o = [],
            p = m || a[0];
          (l = "string" == typeof l ? "," + l + "," : h), null == b && (b = 1);
          for (r in a[0]) o.push(r);
          if (a.length > 1) {
            for (x = a[a.length - 1], w = !0, q = o.length; --q > -1; )
              if (((r = o[q]), Math.abs(p[r] - x[r]) > 0.05)) {
                w = !1;
                break;
              }
            w &&
              ((a = a.concat()),
              m && a.unshift(m),
              a.push(a[1]),
              (m = a[a.length - 3]));
          }
          for (c.length = d.length = e.length = 0, q = o.length; --q > -1; )
            (r = o[q]),
              (f[r] = -1 !== l.indexOf("," + r + ",")),
              (n[r] = k(a, r, f[r], m));
          for (q = c.length; --q > -1; )
            (c[q] = Math.sqrt(c[q])), (d[q] = Math.sqrt(d[q]));
          if (!i) {
            for (q = o.length; --q > -1; )
              if (f[r])
                for (s = n[o[q]], v = s.length - 1, t = 0; v > t; t++)
                  (u = s[t + 1].da / d[t] + s[t].da / c[t]),
                    (e[t] = (e[t] || 0) + u * u);
            for (q = e.length; --q > -1; ) e[q] = Math.sqrt(e[q]);
          }
          for (q = o.length, t = g ? 4 : 1; --q > -1; )
            (r = o[q]),
              (s = n[r]),
              j(s, b, g, i, f[r]),
              w && (s.splice(0, t), s.splice(s.length - t, t));
          return n;
        },
        m = function (a, b, c) {
          b = b || "soft";
          var i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            d = {},
            e = "cubic" === b ? 3 : 2,
            f = "soft" === b,
            h = [];
          if ((f && c && (a = [c].concat(a)), null == a || e + 1 > a.length))
            throw "invalid Bezier data";
          for (q in a[0]) h.push(q);
          for (n = h.length; --n > -1; ) {
            for (
              q = h[n], d[q] = m = [], r = 0, p = a.length, o = 0;
              p > o;
              o++
            )
              (i =
                null == c
                  ? a[o][q]
                  : "string" == typeof (s = a[o][q]) && "=" === s.charAt(1)
                  ? c[q] + Number(s.charAt(0) + s.substr(2))
                  : Number(s)),
                f && o > 1 && p - 1 > o && (m[r++] = (i + m[r - 2]) / 2),
                (m[r++] = i);
            for (p = r - e + 1, r = 0, o = 0; p > o; o += e)
              (i = m[o]),
                (j = m[o + 1]),
                (k = m[o + 2]),
                (l = 2 === e ? 0 : m[o + 3]),
                (m[r++] = s =
                  3 === e
                    ? new g(i, j, k, l)
                    : new g(i, (2 * j + i) / 3, (2 * j + k) / 3, k));
            m.length = r;
          }
          return d;
        },
        n = function (a, b, c) {
          for (
            var f, g, h, i, j, k, l, m, n, o, p, d = 1 / c, e = a.length;
            --e > -1;

          )
            for (
              o = a[e],
                h = o.a,
                i = o.d - h,
                j = o.c - h,
                k = o.b - h,
                f = g = 0,
                m = 1;
              c >= m;
              m++
            )
              (l = d * m),
                (n = 1 - l),
                (f = g - (g = (l * l * i + 3 * n * (l * j + n * k)) * l)),
                (p = e * c + m - 1),
                (b[p] = (b[p] || 0) + f * f);
        },
        o = function (a, b) {
          b = b >> 0 || 6;
          var j,
            k,
            l,
            m,
            c = [],
            d = [],
            e = 0,
            f = 0,
            g = b - 1,
            h = [],
            i = [];
          for (j in a) n(a[j], c, b);
          for (l = c.length, k = 0; l > k; k++)
            (e += Math.sqrt(c[k])),
              (m = k % b),
              (i[m] = e),
              m === g &&
                ((f += e),
                (m = (k / b) >> 0),
                (h[m] = i),
                (d[m] = f),
                (e = 0),
                (i = []));
          return { length: f, lengths: d, segments: h };
        },
        p = window._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          API: 2,
          init: function (a, b, c) {
            (this._target = a),
              b instanceof Array && (b = { values: b }),
              (this._func = {}),
              (this._round = {}),
              (this._props = []),
              (this._timeRes =
                null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10));
            var h,
              i,
              j,
              k,
              n,
              d = b.values || [],
              e = {},
              f = d[0],
              g = b.autoRotate || c.vars.orientToBezier;
            this._autoRotate = g
              ? g instanceof Array
                ? g
                : [["x", "y", "rotation", g === !0 ? 0 : Number(g) || 0]]
              : null;
            for (h in f) this._props.push(h);
            for (j = this._props.length; --j > -1; )
              (h = this._props[j]),
                this._overwriteProps.push(h),
                (i = this._func[h] = "function" == typeof a[h]),
                (e[h] = i
                  ? a[
                      h.indexOf("set") ||
                      "function" != typeof a["get" + h.substr(3)]
                        ? h
                        : "get" + h.substr(3)
                    ]()
                  : parseFloat(a[h])),
                n || (e[h] !== d[0][h] && (n = e));
            if (
              ((this._beziers =
                "cubic" !== b.type &&
                "quadratic" !== b.type &&
                "soft" !== b.type
                  ? l(
                      d,
                      isNaN(b.curviness) ? 1 : b.curviness,
                      !1,
                      "thruBasic" === b.type,
                      b.correlate,
                      n
                    )
                  : m(d, b.type, e)),
              (this._segCount = this._beziers[h].length),
              this._timeRes)
            ) {
              var p = o(this._beziers, this._timeRes);
              (this._length = p.length),
                (this._lengths = p.lengths),
                (this._segments = p.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((g = this._autoRotate))
              for (
                g[0] instanceof Array || (this._autoRotate = g = [g]),
                  j = g.length;
                --j > -1;

              )
                for (k = 0; 3 > k; k++)
                  (h = g[j][k]),
                    (this._func[h] =
                      "function" == typeof a[h]
                        ? a[
                            h.indexOf("set") ||
                            "function" != typeof a["get" + h.substr(3)]
                              ? h
                              : "get" + h.substr(3)
                          ]
                        : !1);
            return !0;
          },
          set: function (b) {
            var f,
              g,
              h,
              i,
              j,
              k,
              l,
              m,
              n,
              o,
              c = this._segCount,
              d = this._func,
              e = this._target;
            if (this._timeRes) {
              if (
                ((n = this._lengths),
                (o = this._curSeg),
                (b *= this._length),
                (h = this._li),
                b > this._l2 && c - 1 > h)
              ) {
                for (m = c - 1; m > h && b >= (this._l2 = n[++h]); );
                (this._l1 = n[h - 1]),
                  (this._li = h),
                  (this._curSeg = o = this._segments[h]),
                  (this._s2 = o[(this._s1 = this._si = 0)]);
              } else if (this._l1 > b && h > 0) {
                for (; h > 0 && (this._l1 = n[--h]) >= b; );
                0 === h && this._l1 > b ? (this._l1 = 0) : h++,
                  (this._l2 = n[h]),
                  (this._li = h),
                  (this._curSeg = o = this._segments[h]),
                  (this._s1 = o[(this._si = o.length - 1) - 1] || 0),
                  (this._s2 = o[this._si]);
              }
              if (
                ((f = h),
                (b -= this._l1),
                (h = this._si),
                b > this._s2 && o.length - 1 > h)
              ) {
                for (m = o.length - 1; m > h && b >= (this._s2 = o[++h]); );
                (this._s1 = o[h - 1]), (this._si = h);
              } else if (this._s1 > b && h > 0) {
                for (; h > 0 && (this._s1 = o[--h]) >= b; );
                0 === h && this._s1 > b ? (this._s1 = 0) : h++,
                  (this._s2 = o[h]),
                  (this._si = h);
              }
              k = (h + (b - this._s1) / (this._s2 - this._s1)) * this._prec;
            } else
              (f = 0 > b ? 0 : b >= 1 ? c - 1 : (c * b) >> 0),
                (k = (b - f * (1 / c)) * c);
            for (g = 1 - k, h = this._props.length; --h > -1; )
              (i = this._props[h]),
                (j = this._beziers[i][f]),
                (l = (k * k * j.da + 3 * g * (k * j.ca + g * j.ba)) * k + j.a),
                this._round[i] && (l = (l + (l > 0 ? 0.5 : -0.5)) >> 0),
                d[i] ? e[i](l) : (e[i] = l);
            if (this._autoRotate) {
              var q,
                r,
                s,
                t,
                u,
                v,
                w,
                p = this._autoRotate;
              for (h = p.length; --h > -1; )
                (i = p[h][2]),
                  (v = p[h][3] || 0),
                  (w = p[h][4] === !0 ? 1 : a),
                  (j = this._beziers[p[h][0]][f]),
                  (q = this._beziers[p[h][1]][f]),
                  (r = j.a + (j.b - j.a) * k),
                  (t = j.b + (j.c - j.b) * k),
                  (r += (t - r) * k),
                  (t += (j.c + (j.d - j.c) * k - t) * k),
                  (s = q.a + (q.b - q.a) * k),
                  (u = q.b + (q.c - q.b) * k),
                  (s += (u - s) * k),
                  (u += (q.c + (q.d - q.c) * k - u) * k),
                  (l = Math.atan2(u - s, t - r) * w + v),
                  d[i] ? e[i](l) : (e[i] = l);
            }
          },
        }),
        q = p.prototype;
      (p.bezierThrough = l),
        (p.cubicToQuadratic = i),
        (p._autoCSS = !0),
        (p.quadraticToCubic = function (a, b, c) {
          return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
        }),
        (p._cssRegister = function () {
          var a = window._gsDefine.globals.CSSPlugin;
          if (a) {
            var c = a._internals,
              d = c._parseToProxy,
              e = c._setPluginRatio,
              f = c.CSSPropTween;
            c._registerComplexSpecialProp("bezier", {
              parser: function (a, c, g, h, i, j) {
                c instanceof Array && (c = { values: c }), (j = new p());
                var o,
                  q,
                  r,
                  k = c.values,
                  l = k.length - 1,
                  m = [],
                  n = {};
                if (0 > l) return i;
                for (o = 0; l >= o; o++)
                  (r = d(a, k[o], h, i, j, l !== o)), (m[o] = r.end);
                for (q in c) n[q] = c[q];
                return (
                  (n.values = m),
                  (i = new f(a, "bezier", 0, 0, r.pt, 2)),
                  (i.data = r),
                  (i.plugin = j),
                  (i.setRatio = e),
                  0 === n.autoRotate && (n.autoRotate = !0),
                  !n.autoRotate ||
                    n.autoRotate instanceof Array ||
                    ((o = n.autoRotate === !0 ? 0 : Number(n.autoRotate) * b),
                    (n.autoRotate =
                      null != r.end.left
                        ? [["left", "top", "rotation", o, !0]]
                        : null != r.end.x
                        ? [["x", "y", "rotation", o, !0]]
                        : !1)),
                  n.autoRotate &&
                    (h._transform || h._enableTransforms(!1),
                    (r.autoRotate = h._target._gsTransform)),
                  j._onInitTween(r.proxy, n, h._tween),
                  i
                );
              },
            });
          }
        }),
        (q._roundProps = function (a, b) {
          for (var c = this._overwriteProps, d = c.length; --d > -1; )
            (a[c[d]] || a.bezier || a.bezierThrough) && (this._round[c[d]] = b);
        }),
        (q._kill = function (a) {
          var c,
            d,
            b = this._props;
          for (c in this._beziers)
            if (c in a)
              for (
                delete this._beziers[c], delete this._func[c], d = b.length;
                --d > -1;

              )
                b[d] === c && b.splice(d, 1);
          return this._super._kill.call(this, a);
        });
    })(),
    window._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (a, b) {
        var d,
          e,
          f,
          g,
          c = function () {
            a.call(this, "css"), (this._overwriteProps.length = 0);
          },
          h = {},
          i = (c.prototype = new a("css"));
        (i.constructor = c),
          (c.version = "1.9.2"),
          (c.API = 2),
          (c.defaultTransformPerspective = 0),
          (i = "px"),
          (c.suffixMap = {
            top: i,
            right: i,
            bottom: i,
            left: i,
            width: i,
            height: i,
            fontSize: i,
            padding: i,
            margin: i,
            perspective: i,
          });
        var H,
          I,
          J,
          K,
          L,
          M,
          j = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
          k = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          l = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          m = /[^\d\-\.]/g,
          n = /(?:\d|\-|\+|=|#|\.)*/g,
          o = /opacity *= *([^)]*)/,
          p = /opacity:([^;]*)/,
          q = /alpha\(opacity *=.+?\)/i,
          r = /([A-Z])/g,
          s = /-([a-z])/gi,
          t = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          u = function (a, b) {
            return b.toUpperCase();
          },
          v = /(?:Left|Right|Width)/i,
          w = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          x = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          y = /,(?=[^\)]*(?:\(|$))/gi,
          z = Math.PI / 180,
          A = 180 / Math.PI,
          B = {},
          C = document,
          D = C.createElement("div"),
          E = C.createElement("img"),
          F = (c._internals = { _specialProps: h }),
          G = navigator.userAgent,
          N = (function () {
            var c,
              a = G.indexOf("Android"),
              b = C.createElement("div");
            return (
              (J =
                -1 !== G.indexOf("Safari") &&
                -1 === G.indexOf("Chrome") &&
                (-1 === a || Number(G.substr(a + 8, 1)) > 3)),
              (L = J && 6 > Number(G.substr(G.indexOf("Version/") + 8, 1))),
              (K = -1 !== G.indexOf("Firefox")),
              /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G),
              (M = parseFloat(RegExp.$1)),
              (b.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>"),
              (c = b.getElementsByTagName("a")[0]),
              c ? /^0.55/.test(c.style.opacity) : !1
            );
          })(),
          O = function (a) {
            return o.test(
              "string" == typeof a
                ? a
                : (a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                    ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          P = function (a) {
            window.console && console.log(a);
          },
          Q = "",
          R = "",
          S = function (a, b) {
            b = b || D;
            var d,
              e,
              c = b.style;
            if (void 0 !== c[a]) return a;
            for (
              a = a.charAt(0).toUpperCase() + a.substr(1),
                d = ["O", "Moz", "ms", "Ms", "Webkit"],
                e = 5;
              --e > -1 && void 0 === c[d[e] + a];

            );
            return e >= 0
              ? ((R = 3 === e ? "ms" : d[e]),
                (Q = "-" + R.toLowerCase() + "-"),
                R + a)
              : null;
          },
          T = C.defaultView ? C.defaultView.getComputedStyle : function () {},
          U = (c.getStyle = function (a, b, c, d, e) {
            var f;
            return N || "opacity" !== b
              ? (!d && a.style[b]
                  ? (f = a.style[b])
                  : (c = c || T(a, null))
                  ? ((a = c.getPropertyValue(
                      b.replace(r, "-$1").toLowerCase()
                    )),
                    (f = a || c.length ? a : c[b]))
                  : a.currentStyle && ((c = a.currentStyle), (f = c[b])),
                null == e ||
                (f && "none" !== f && "auto" !== f && "auto auto" !== f)
                  ? f
                  : e)
              : O(a);
          }),
          V = function (a, b, c) {
            var f,
              g,
              d = {},
              e = a._gsOverwrittenClassNamePT;
            if (e && !c) {
              for (; e; ) e.setRatio(0), (e = e._next);
              a._gsOverwrittenClassNamePT = null;
            }
            if ((b = b || T(a, null)))
              if ((f = b.length))
                for (; --f > -1; )
                  d[b[f].replace(s, u)] = b.getPropertyValue(b[f]);
              else for (f in b) d[f] = b[f];
            else if ((b = a.currentStyle || a.style))
              for (f in b) d[f.replace(s, u)] = b[f];
            return (
              N || (d.opacity = O(a)),
              (g = xb(a, b, !1)),
              (d.rotation = g.rotation * A),
              (d.skewX = g.skewX * A),
              (d.scaleX = g.scaleX),
              (d.scaleY = g.scaleY),
              (d.x = g.x),
              (d.y = g.y),
              wb &&
                ((d.z = g.z),
                (d.rotationX = g.rotationX * A),
                (d.rotationY = g.rotationY * A),
                (d.scaleZ = g.scaleZ)),
              d.filters && delete d.filters,
              d
            );
          },
          W = function (a, b, c, d) {
            var g,
              h,
              i,
              e = {},
              f = a.style;
            for (h in c)
              "cssText" !== h &&
                "length" !== h &&
                isNaN(h) &&
                b[h] !== (g = c[h]) &&
                -1 === h.indexOf("Origin") &&
                ("number" == typeof g || "string" == typeof g) &&
                ((e[h] =
                  ("" !== g && "auto" !== g && "none" !== g) ||
                  "string" != typeof b[h] ||
                  "" === b[h].replace(m, "")
                    ? g
                    : 0),
                void 0 !== f[h] && (i = new kb(f, h, f[h], i)));
            if (d) for (h in d) "className" !== h && (e[h] = d[h]);
            return { difs: e, firstMPT: i };
          },
          X = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          Y = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          Z = function (a, b, c) {
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
              e = X[b],
              f = e.length;
            for (c = c || T(a, null); --f > -1; )
              (d -= parseFloat(U(a, "padding" + e[f], c, !0)) || 0),
                (d -= parseFloat(U(a, "border" + e[f] + "Width", c, !0)) || 0);
            return d;
          },
          $ = function (a, b, c, d, e) {
            if ("px" === d || !d) return c;
            if ("auto" === d || !c) return 0;
            var j,
              f = v.test(b),
              g = a,
              h = D.style,
              i = 0 > c;
            return (
              i && (c = -c),
              "%" === d && -1 !== b.indexOf("border")
                ? (j = (c / 100) * (f ? a.clientWidth : a.clientHeight))
                : ((h.cssText =
                    "border-style:solid; border-width:0; position:absolute; line-height:0;"),
                  "%" !== d && g.appendChild
                    ? (h[f ? "borderLeftWidth" : "borderTopWidth"] = c + d)
                    : ((g = a.parentNode || C.body),
                      (h[f ? "width" : "height"] = c + d)),
                  g.appendChild(D),
                  (j = parseFloat(D[f ? "offsetWidth" : "offsetHeight"])),
                  g.removeChild(D),
                  0 !== j || e || (j = $(a, b, c, d, !0))),
              i ? -j : j
            );
          },
          _ = function (a, b) {
            (null == a || "" === a || "auto" === a || "auto auto" === a) &&
              (a = "0 0");
            var c = a.split(" "),
              d =
                -1 !== a.indexOf("left")
                  ? "0%"
                  : -1 !== a.indexOf("right")
                  ? "100%"
                  : c[0],
              e =
                -1 !== a.indexOf("top")
                  ? "0%"
                  : -1 !== a.indexOf("bottom")
                  ? "100%"
                  : c[1];
            return (
              null == e ? (e = "0") : "center" === e && (e = "50%"),
              ("center" === d || isNaN(parseFloat(d))) && (d = "50%"),
              b &&
                ((b.oxp = -1 !== d.indexOf("%")),
                (b.oyp = -1 !== e.indexOf("%")),
                (b.oxr = "=" === d.charAt(1)),
                (b.oyr = "=" === e.charAt(1)),
                (b.ox = parseFloat(d.replace(m, ""))),
                (b.oy = parseFloat(e.replace(m, "")))),
              d + " " + e + (c.length > 2 ? " " + c[2] : "")
            );
          },
          ab = function (a, b) {
            return "string" == typeof a && "=" === a.charAt(1)
              ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2))
              : parseFloat(a) - parseFloat(b);
          },
          bb = function (a, b) {
            return null == a
              ? b
              : "string" == typeof a && "=" === a.charAt(1)
              ? parseInt(a.charAt(0) + "1", 10) * Number(a.substr(2)) + b
              : parseFloat(a);
          },
          cb = function (a, b, c, d) {
            var f,
              g,
              h,
              i,
              j,
              e = 1e-6;
            return (
              null == a
                ? (j = b)
                : "number" == typeof a
                ? (j = a * z)
                : ((f = 2 * Math.PI),
                  (g = a.split("_")),
                  (h =
                    Number(g[0].replace(m, "")) *
                      (-1 === a.indexOf("rad") ? z : 1) -
                    ("=" === a.charAt(1) ? 0 : b)),
                  (i = g[1]),
                  i && d && (d[c] = b + h),
                  "short" === i
                    ? ((h %= f),
                      h !== h % (f / 2) && (h = 0 > h ? h + f : h - f))
                    : "cw" === i && 0 > h
                    ? (h = ((h + 9999999999 * f) % f) - (0 | (h / f)) * f)
                    : "ccw" === i &&
                      h > 0 &&
                      (h = ((h - 9999999999 * f) % f) - (0 | (h / f)) * f),
                  (j = b + h)),
              e > j && j > -e && (j = 0),
              j
            );
          },
          db = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          eb = function (a, b, c) {
            return (
              (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
              0 |
                (255 *
                  (1 > 6 * a
                    ? b + 6 * (c - b) * a
                    : 0.5 > a
                    ? c
                    : 2 > 3 * a
                    ? b + 6 * (c - b) * (2 / 3 - a)
                    : b) +
                  0.5)
            );
          },
          fb = function (a) {
            var b, c, d, e, f, g;
            return a && "" !== a
              ? "number" == typeof a
                ? [a >> 16, 255 & (a >> 8), 255 & a]
                : ("," === a.charAt(a.length - 1) &&
                    (a = a.substr(0, a.length - 1)),
                  db[a]
                    ? db[a]
                    : "#" === a.charAt(0)
                    ? (4 === a.length &&
                        ((b = a.charAt(1)),
                        (c = a.charAt(2)),
                        (d = a.charAt(3)),
                        (a = "#" + b + b + c + c + d + d)),
                      (a = parseInt(a.substr(1), 16)),
                      [a >> 16, 255 & (a >> 8), 255 & a])
                    : "hsl" === a.substr(0, 3)
                    ? ((a = a.match(j)),
                      (e = (Number(a[0]) % 360) / 360),
                      (f = Number(a[1]) / 100),
                      (g = Number(a[2]) / 100),
                      (c = 0.5 >= g ? g * (f + 1) : g + f - g * f),
                      (b = 2 * g - c),
                      a.length > 3 && (a[3] = Number(a[3])),
                      (a[0] = eb(e + 1 / 3, b, c)),
                      (a[1] = eb(e, b, c)),
                      (a[2] = eb(e - 1 / 3, b, c)),
                      a)
                    : ((a = a.match(j) || db.transparent),
                      (a[0] = Number(a[0])),
                      (a[1] = Number(a[1])),
                      (a[2] = Number(a[2])),
                      a.length > 3 && (a[3] = Number(a[3])),
                      a))
              : db.black;
          },
          gb = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (i in db) gb += "|" + i + "\\b";
        gb = RegExp(gb + ")", "gi");
        var hb = function (a, b, c, d) {
            if (null == a)
              return function (a) {
                return a;
              };
            var n,
              e = b ? (a.match(gb) || [""])[0] : "",
              f = a.split(e).join("").match(l) || [],
              g = a.substr(0, a.indexOf(f[0])),
              h = ")" === a.charAt(a.length - 1) ? ")" : "",
              i = -1 !== a.indexOf(" ") ? " " : ",",
              k = f.length,
              m = k > 0 ? f[0].replace(j, "") : "";
            return k
              ? (n = b
                  ? function (a) {
                      var b, j, o, p;
                      if ("number" == typeof a) a += m;
                      else if (d && y.test(a)) {
                        for (
                          p = a.replace(y, "|").split("|"), o = 0;
                          p.length > o;
                          o++
                        )
                          p[o] = n(p[o]);
                        return p.join(",");
                      }
                      if (
                        ((b = (a.match(gb) || [e])[0]),
                        (j = a.split(b).join("").match(l) || []),
                        (o = j.length),
                        k > o--)
                      )
                        for (; k > ++o; )
                          j[o] = c ? j[((o - 1) / 2) >> 0] : f[o];
                      return (
                        g +
                        j.join(i) +
                        i +
                        b +
                        h +
                        (-1 !== a.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (a) {
                      var b, e, j;
                      if ("number" == typeof a) a += m;
                      else if (d && y.test(a)) {
                        for (
                          e = a.replace(y, "|").split("|"), j = 0;
                          e.length > j;
                          j++
                        )
                          e[j] = n(e[j]);
                        return e.join(",");
                      }
                      if (((b = a.match(l) || []), (j = b.length), k > j--))
                        for (; k > ++j; )
                          b[j] = c ? b[((j - 1) / 2) >> 0] : f[j];
                      return g + b.join(i) + h;
                    })
              : function (a) {
                  return a;
                };
          },
          ib = function (a) {
            return (
              (a = a.split(",")),
              function (b, c, d, e, f, g, h) {
                var j,
                  i = (c + "").split(" ");
                for (h = {}, j = 0; 4 > j; j++)
                  h[a[j]] = i[j] = i[j] || i[((j - 1) / 2) >> 0];
                return e.parse(b, h, f, g);
              }
            );
          },
          kb =
            ((F._setPluginRatio = function (a) {
              this.plugin.setRatio(a);
              for (
                var f,
                  g,
                  h,
                  i,
                  b = this.data,
                  c = b.proxy,
                  d = b.firstMPT,
                  e = 1e-6;
                d;

              )
                (f = c[d.v]),
                  d.r
                    ? (f = f > 0 ? (f + 0.5) >> 0 : (f - 0.5) >> 0)
                    : e > f && f > -e && (f = 0),
                  (d.t[d.p] = f),
                  (d = d._next);
              if (
                (b.autoRotate && (b.autoRotate.rotation = c.rotation), 1 === a)
              )
                for (d = b.firstMPT; d; ) {
                  if (((g = d.t), g.type)) {
                    if (1 === g.type) {
                      for (i = g.xs0 + g.s + g.xs1, h = 1; g.l > h; h++)
                        i += g["xn" + h] + g["xs" + (h + 1)];
                      g.e = i;
                    }
                  } else g.e = g.s + g.xs0;
                  d = d._next;
                }
            }),
            function (a, b, c, d, e) {
              (this.t = a),
                (this.p = b),
                (this.v = c),
                (this.r = e),
                d && ((d._prev = this), (this._next = d));
            }),
          mb =
            ((F._parseToProxy = function (a, b, c, d, e, f) {
              var l,
                m,
                n,
                o,
                p,
                g = d,
                h = {},
                i = {},
                j = c._transform,
                k = B;
              for (
                c._transform = null,
                  B = b,
                  d = p = c.parse(a, b, d, e),
                  B = k,
                  f &&
                    ((c._transform = j),
                    g && ((g._prev = null), g._prev && (g._prev._next = null)));
                d && d !== g;

              ) {
                if (
                  1 >= d.type &&
                  ((m = d.p),
                  (i[m] = d.s + d.c),
                  (h[m] = d.s),
                  f || ((o = new kb(d, "s", m, o, d.r)), (d.c = 0)),
                  1 === d.type)
                )
                  for (l = d.l; --l > 0; )
                    (n = "xn" + l),
                      (m = d.p + "_" + n),
                      (i[m] = d.data[n]),
                      (h[m] = d[n]),
                      f || (o = new kb(d, n, m, o, d.rxp[n]));
                d = d._next;
              }
              return { proxy: h, end: i, firstMPT: o, pt: p };
            }),
            (F.CSSPropTween = function (a, b, c, e, f, h, i, j, k, l, m) {
              (this.t = a),
                (this.p = b),
                (this.s = c),
                (this.c = e),
                (this.n = i || "css_" + b),
                a instanceof mb || g.push(this.n),
                (this.r = j),
                (this.type = h || 0),
                k && ((this.pr = k), (d = !0)),
                (this.b = void 0 === l ? c : l),
                (this.e = void 0 === m ? c + e : m),
                f && ((this._next = f), (f._prev = this));
            })),
          nb = (c.parseComplex = function (a, b, c, d, e, f, g, h, i, l) {
            (g = new mb(a, b, 0, 0, g, l ? 2 : 1, null, !1, h, c, d)),
              (d += "");
            var q,
              r,
              s,
              t,
              u,
              v,
              w,
              x,
              z,
              A,
              B,
              C,
              m = c.split(", ").join(",").split(" "),
              n = d.split(", ").join(",").split(" "),
              o = m.length,
              p = H !== !1;
            for (
              (-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
                ((m = m.join(" ").replace(y, ", ").split(" ")),
                (n = n.join(" ").replace(y, ", ").split(" ")),
                (o = m.length)),
                o !== n.length && ((m = (f || "").split(" ")), (o = m.length)),
                g.plugin = i,
                g.setRatio = l,
                q = 0;
              o > q;
              q++
            )
              if (((t = m[q]), (u = n[q]), (x = parseFloat(t)), x || 0 === x))
                g.appendXtra(
                  "",
                  x,
                  ab(u, x),
                  u.replace(k, ""),
                  p && -1 !== u.indexOf("px"),
                  !0
                );
              else if (
                e &&
                ("#" === t.charAt(0) ||
                  0 === t.indexOf("rgb") ||
                  db[t] ||
                  0 === t.indexOf("hsl"))
              )
                (C = "," === u.charAt(u.length - 1) ? ")," : ")"),
                  (t = fb(t)),
                  (u = fb(u)),
                  (z = t.length + u.length > 6),
                  z && !N && 0 === u[3]
                    ? ((g["xs" + g.l] += g.l ? " transparent" : "transparent"),
                      (g.e = g.e.split(n[q]).join("transparent")))
                    : (N || (z = !1),
                      g
                        .appendXtra(
                          z ? "rgba(" : "rgb(",
                          t[0],
                          u[0] - t[0],
                          ",",
                          !0,
                          !0
                        )
                        .appendXtra("", t[1], u[1] - t[1], ",", !0)
                        .appendXtra("", t[2], u[2] - t[2], z ? "," : C, !0),
                      z &&
                        ((t = 4 > t.length ? 1 : t[3]),
                        g.appendXtra(
                          "",
                          t,
                          (4 > u.length ? 1 : u[3]) - t,
                          C,
                          !1
                        )));
              else if ((v = t.match(j))) {
                if (((w = u.match(k)), !w || w.length !== v.length)) return g;
                for (s = 0, r = 0; v.length > r; r++)
                  (B = v[r]),
                    (A = t.indexOf(B, s)),
                    g.appendXtra(
                      t.substr(s, A - s),
                      Number(B),
                      ab(w[r], B),
                      "",
                      p && "px" === t.substr(A + B.length, 2),
                      0 === r
                    ),
                    (s = A + B.length);
                g["xs" + g.l] += t.substr(s);
              } else g["xs" + g.l] += g.l ? " " + t : t;
            if (-1 !== d.indexOf("=") && g.data) {
              for (C = g.xs0 + g.data.s, q = 1; g.l > q; q++)
                C += g["xs" + q] + g.data["xn" + q];
              g.e = C + g["xs" + q];
            }
            return g.l || ((g.type = -1), (g.xs0 = g.e)), g.xfirst || g;
          }),
          ob = 9;
        for (i = mb.prototype, i.l = i.pr = 0; --ob > 0; )
          (i["xn" + ob] = 0), (i["xs" + ob] = "");
        (i.xs0 = ""),
          (i._next =
            i._prev =
            i.xfirst =
            i.data =
            i.plugin =
            i.setRatio =
            i.rxp =
              null),
          (i.appendXtra = function (a, b, c, d, e, f) {
            var g = this,
              h = g.l;
            return (
              (g["xs" + h] += f && h ? " " + a : a || ""),
              c || 0 === h || g.plugin
                ? (g.l++,
                  (g.type = g.setRatio ? 2 : 1),
                  (g["xs" + g.l] = d || ""),
                  h > 0
                    ? ((g.data["xn" + h] = b + c),
                      (g.rxp["xn" + h] = e),
                      (g["xn" + h] = b),
                      g.plugin ||
                        ((g.xfirst = new mb(
                          g,
                          "xn" + h,
                          b,
                          c,
                          g.xfirst || g,
                          0,
                          g.n,
                          e,
                          g.pr
                        )),
                        (g.xfirst.xs0 = 0)),
                      g)
                    : ((g.data = { s: b + c }),
                      (g.rxp = {}),
                      (g.s = b),
                      (g.c = c),
                      (g.r = e),
                      g))
                : ((g["xs" + h] += b + (d || "")), g)
            );
          });
        var pb = function (a, b) {
            (b = b || {}),
              (this.p = b.prefix ? S(a) || a : a),
              (h[a] = h[this.p] = this),
              (this.format =
                b.formatter ||
                hb(b.defaultValue, b.color, b.collapsible, b.multi)),
              b.parser && (this.parse = b.parser),
              (this.clrs = b.color),
              (this.multi = b.multi),
              (this.keyword = b.keyword),
              (this.dflt = b.defaultValue),
              (this.pr = b.priority || 0);
          },
          qb = (F._registerComplexSpecialProp = function (a, b, c) {
            "object" != typeof b && (b = { parser: c });
            var f,
              g,
              d = a.split(","),
              e = b.defaultValue;
            for (c = c || [e], f = 0; d.length > f; f++)
              (b.prefix = 0 === f && b.prefix),
                (b.defaultValue = c[f] || e),
                (g = new pb(d[f], b));
          }),
          rb = function (a) {
            if (!h[a]) {
              var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
              qb(a, {
                parser: function (a, c, d, e, f, g, i) {
                  var j = (window.GreenSockGlobals || window).com.greensock
                    .plugins[b];
                  return j
                    ? (j._cssRegister(), h[d].parse(a, c, d, e, f, g, i))
                    : (P("Error: " + b + " js file not loaded."), f);
                },
              });
            }
          };
        (i = pb.prototype),
          (i.parseComplex = function (a, b, c, d, e, f) {
            var h,
              i,
              j,
              k,
              l,
              m,
              g = this.keyword;
            if (
              (this.multi &&
                (y.test(c) || y.test(b)
                  ? ((i = b.replace(y, "|").split("|")),
                    (j = c.replace(y, "|").split("|")))
                  : g && ((i = [b]), (j = [c]))),
              j)
            ) {
              for (
                k = j.length > i.length ? j.length : i.length, h = 0;
                k > h;
                h++
              )
                (b = i[h] = i[h] || this.dflt),
                  (c = j[h] = j[h] || this.dflt),
                  g &&
                    ((l = b.indexOf(g)),
                    (m = c.indexOf(g)),
                    l !== m && ((c = -1 === m ? j : i), (c[h] += " " + g)));
              (b = i.join(", ")), (c = j.join(", "));
            }
            return nb(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
          }),
          (i.parse = function (a, b, c, d, e, g) {
            return this.parseComplex(
              a.style,
              this.format(U(a, this.p, f, !1, this.dflt)),
              this.format(b),
              e,
              g
            );
          }),
          (c.registerSpecialProp = function (a, b, c) {
            qb(a, {
              parser: function (a, d, e, f, g, h) {
                var j = new mb(a, e, 0, 0, g, 2, e, !1, c);
                return (j.plugin = h), (j.setRatio = b(a, d, f._tween, e)), j;
              },
              priority: c,
            });
          });
        var sb =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(
              ","
            ),
          tb = S("transform"),
          ub = Q + "transform",
          vb = S("transformOrigin"),
          wb = null !== S("perspective"),
          xb = function (a, b, d) {
            var l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v,
              x,
              y,
              e = d ? a._gsTransform || { skewY: 0 } : { skewY: 0 },
              f = 0 > e.scaleX,
              g = 2e-5,
              h = 1e5,
              i = -Math.PI + 1e-4,
              j = Math.PI - 1e-4,
              k = wb
                ? parseFloat(U(a, vb, b, !1, "0 0 0").split(" ")[2]) ||
                  e.zOrigin ||
                  0
                : 0;
            for (
              tb
                ? (l = U(a, ub, b, !0))
                : a.currentStyle &&
                  ((l = a.currentStyle.filter.match(w)),
                  (l =
                    l && 4 === l.length
                      ? l[0].substr(4) +
                        "," +
                        Number(l[2].substr(4)) +
                        "," +
                        Number(l[1].substr(4)) +
                        "," +
                        l[3].substr(4) +
                        "," +
                        (e ? e.x : 0) +
                        "," +
                        (e ? e.y : 0)
                      : null)),
                m = (l || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                n = m.length;
              --n > -1;

            )
              (o = Number(m[n])),
                (m[n] = (p = o - (o |= 0))
                  ? (0 | (p * h + (0 > p ? -0.5 : 0.5))) / h + o
                  : o);
            if (16 === m.length) {
              var z = m[8],
                A = m[9],
                B = m[10],
                C = m[12],
                D = m[13],
                E = m[14];
              if (
                (e.zOrigin &&
                  ((E = -e.zOrigin),
                  (C = z * E - m[12]),
                  (D = A * E - m[13]),
                  (E = B * E + e.zOrigin - m[14])),
                !d || C !== e.x || D !== e.y || E !== e.z)
              ) {
                var Q,
                  R,
                  S,
                  T,
                  V,
                  W,
                  X,
                  Y,
                  F = m[0],
                  G = m[1],
                  H = m[2],
                  I = m[3],
                  J = m[4],
                  K = m[5],
                  L = m[6],
                  M = m[7],
                  N = m[11],
                  O = (e.rotationX = Math.atan2(L, B)),
                  P = i > O || O > j;
                O &&
                  ((V = Math.cos(-O)),
                  (W = Math.sin(-O)),
                  (Q = J * V + z * W),
                  (R = K * V + A * W),
                  (S = L * V + B * W),
                  (T = M * V + N * W),
                  (z = J * -W + z * V),
                  (A = K * -W + A * V),
                  (B = L * -W + B * V),
                  (N = M * -W + N * V),
                  (J = Q),
                  (K = R),
                  (L = S)),
                  (O = e.rotationY = Math.atan2(z, F)),
                  O &&
                    ((X = i > O || O > j),
                    (V = Math.cos(-O)),
                    (W = Math.sin(-O)),
                    (Q = F * V - z * W),
                    (R = G * V - A * W),
                    (S = H * V - B * W),
                    (T = I * V - N * W),
                    (A = G * W + A * V),
                    (B = H * W + B * V),
                    (N = I * W + N * V),
                    (F = Q),
                    (G = R),
                    (H = S)),
                  (O = e.rotation = Math.atan2(G, K)),
                  O &&
                    ((Y = i > O || O > j),
                    (V = Math.cos(-O)),
                    (W = Math.sin(-O)),
                    (F = F * V + J * W),
                    (R = G * V + K * W),
                    (K = G * -W + K * V),
                    (L = H * -W + L * V),
                    (G = R)),
                  Y && P
                    ? (e.rotation = e.rotationX = 0)
                    : Y && X
                    ? (e.rotation = e.rotationY = 0)
                    : X && P && (e.rotationY = e.rotationX = 0),
                  (e.scaleX = ((Math.sqrt(F * F + G * G) * h + 0.5) >> 0) / h),
                  (e.scaleY = ((Math.sqrt(K * K + A * A) * h + 0.5) >> 0) / h),
                  (e.scaleZ = ((Math.sqrt(L * L + B * B) * h + 0.5) >> 0) / h),
                  (e.skewX = 0),
                  (e.perspective = N ? 1 / (0 > N ? -N : N) : 0),
                  (e.x = C),
                  (e.y = D),
                  (e.z = E);
              }
            } else if (
              !wb ||
              0 === m.length ||
              e.x !== m[4] ||
              e.y !== m[5] ||
              (!e.rotationX && !e.rotationY)
            ) {
              var Z = m.length >= 6,
                $ = Z ? m[0] : 1,
                _ = m[1] || 0,
                ab = m[2] || 0,
                bb = Z ? m[3] : 1;
              (e.x = m[4] || 0),
                (e.y = m[5] || 0),
                (q = Math.sqrt($ * $ + _ * _)),
                (r = Math.sqrt(bb * bb + ab * ab)),
                (s = $ || _ ? Math.atan2(_, $) : e.rotation || 0),
                (t = ab || bb ? Math.atan2(ab, bb) + s : e.skewX || 0),
                (u = q - Math.abs(e.scaleX || 0)),
                (v = r - Math.abs(e.scaleY || 0)),
                Math.abs(t) > Math.PI / 2 &&
                  Math.abs(t) < 1.5 * Math.PI &&
                  (f
                    ? ((q *= -1),
                      (t += 0 >= s ? Math.PI : -Math.PI),
                      (s += 0 >= s ? Math.PI : -Math.PI))
                    : ((r *= -1), (t += 0 >= t ? Math.PI : -Math.PI))),
                (x = (s - e.rotation) % Math.PI),
                (y = (t - e.skewX) % Math.PI),
                (void 0 === e.skewX ||
                  u > g ||
                  -g > u ||
                  v > g ||
                  -g > v ||
                  (x > i && j > x && 0 !== (x * h) >> 0) ||
                  (y > i && j > y && 0 !== (y * h) >> 0)) &&
                  ((e.scaleX = q),
                  (e.scaleY = r),
                  (e.rotation = s),
                  (e.skewX = t)),
                wb &&
                  ((e.rotationX = e.rotationY = e.z = 0),
                  (e.perspective =
                    parseFloat(c.defaultTransformPerspective) || 0),
                  (e.scaleZ = 1));
            }
            e.zOrigin = k;
            for (n in e) g > e[n] && e[n] > -g && (e[n] = 0);
            return d && (a._gsTransform = e), e;
          },
          yb = function (a) {
            var l,
              m,
              b = this.data,
              c = -b.rotation,
              d = c + b.skewX,
              e = 1e5,
              f = ((Math.cos(c) * b.scaleX * e) >> 0) / e,
              g = ((Math.sin(c) * b.scaleX * e) >> 0) / e,
              h = ((Math.sin(d) * -b.scaleY * e) >> 0) / e,
              i = ((Math.cos(d) * b.scaleY * e) >> 0) / e,
              j = this.t.style,
              k = this.t.currentStyle;
            if (k) {
              (m = g), (g = -h), (h = -m), (l = k.filter), (j.filter = "");
              var v,
                w,
                p = this.t.offsetWidth,
                q = this.t.offsetHeight,
                r = "absolute" !== k.position,
                s =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  f +
                  ", M12=" +
                  g +
                  ", M21=" +
                  h +
                  ", M22=" +
                  i,
                t = b.x,
                u = b.y;
              if (
                (null != b.ox &&
                  ((v = (b.oxp ? 0.01 * p * b.ox : b.ox) - p / 2),
                  (w = (b.oyp ? 0.01 * q * b.oy : b.oy) - q / 2),
                  (t += v - (v * f + w * g)),
                  (u += w - (v * h + w * i))),
                r)
              )
                (v = p / 2),
                  (w = q / 2),
                  (s +=
                    ", Dx=" +
                    (v - (v * f + w * g) + t) +
                    ", Dy=" +
                    (w - (v * h + w * i) + u) +
                    ")");
              else {
                var z,
                  A,
                  B,
                  y = 8 > M ? 1 : -1;
                for (
                  v = b.ieOffsetX || 0,
                    w = b.ieOffsetY || 0,
                    b.ieOffsetX = Math.round(
                      (p - ((0 > f ? -f : f) * p + (0 > g ? -g : g) * q)) / 2 +
                        t
                    ),
                    b.ieOffsetY = Math.round(
                      (q - ((0 > i ? -i : i) * q + (0 > h ? -h : h) * p)) / 2 +
                        u
                    ),
                    ob = 0;
                  4 > ob;
                  ob++
                )
                  (A = Y[ob]),
                    (z = k[A]),
                    (m =
                      -1 !== z.indexOf("px")
                        ? parseFloat(z)
                        : $(this.t, A, parseFloat(z), z.replace(n, "")) || 0),
                    (B =
                      m !== b[A]
                        ? 2 > ob
                          ? -b.ieOffsetX
                          : -b.ieOffsetY
                        : 2 > ob
                        ? v - b.ieOffsetX
                        : w - b.ieOffsetY),
                    (j[A] =
                      (b[A] = Math.round(
                        m - B * (0 === ob || 2 === ob ? 1 : y)
                      )) + "px");
                s += ", sizingMethod='auto expand')";
              }
              (j.filter =
                -1 !== l.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? l.replace(x, s)
                  : s + " " + l),
                (0 === a || 1 === a) &&
                  1 === f &&
                  0 === g &&
                  0 === h &&
                  1 === i &&
                  ((r && -1 === s.indexOf("Dx=0, Dy=0")) ||
                    (o.test(l) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === l.indexOf("gradient(") &&
                      j.removeAttribute("filter")));
            }
          },
          zb = function () {
            var x,
              y,
              z,
              A,
              B,
              C,
              D,
              E,
              F,
              b = this.data,
              c = this.t.style,
              d = b.perspective,
              e = b.scaleX,
              f = 0,
              g = 0,
              h = 0,
              i = 0,
              j = b.scaleY,
              k = 0,
              l = 0,
              m = 0,
              n = 0,
              o = b.scaleZ,
              p = 0,
              q = 0,
              r = 0,
              s = d ? -1 / d : 0,
              t = b.rotation,
              u = b.zOrigin,
              v = ",",
              w = 1e5;
            K &&
              ((D = c.top
                ? "top"
                : c.bottom
                ? "bottom"
                : parseFloat(U(this.t, "top", null, !1))
                ? "bottom"
                : "top"),
              (z = U(this.t, D, null, !1)),
              (E = parseFloat(z) || 0),
              (F = z.substr((E + "").length) || "px"),
              (b._ffFix = !b._ffFix),
              (c[D] = (b._ffFix ? E + 0.05 : E - 0.05) + F)),
              (t || b.skewX) &&
                ((z = e * Math.cos(t)),
                (A = j * Math.sin(t)),
                (t -= b.skewX),
                (f = e * -Math.sin(t)),
                (j *= Math.cos(t)),
                (e = z),
                (i = A)),
              (t = b.rotationY),
              t &&
                ((x = Math.cos(t)),
                (y = Math.sin(t)),
                (z = e * x),
                (A = i * x),
                (B = o * -y),
                (C = s * -y),
                (g = e * y),
                (k = i * y),
                (o *= x),
                (s *= x),
                (e = z),
                (i = A),
                (m = B),
                (q = C)),
              (t = b.rotationX),
              t &&
                ((x = Math.cos(t)),
                (y = Math.sin(t)),
                (z = f * x + g * y),
                (A = j * x + k * y),
                (B = n * x + o * y),
                (C = r * x + s * y),
                (g = f * -y + g * x),
                (k = j * -y + k * x),
                (o = n * -y + o * x),
                (s = r * -y + s * x),
                (f = z),
                (j = A),
                (n = B),
                (r = C)),
              u && ((p -= u), (h = g * p), (l = k * p), (p = o * p + u)),
              (h = (z = (h += b.x) - (h |= 0))
                ? (0 | (z * w + (0 > z ? -0.5 : 0.5))) / w + h
                : h),
              (l = (z = (l += b.y) - (l |= 0))
                ? (0 | (z * w + (0 > z ? -0.5 : 0.5))) / w + l
                : l),
              (p = (z = (p += b.z) - (p |= 0))
                ? (0 | (z * w + (0 > z ? -0.5 : 0.5))) / w + p
                : p),
              (c[tb] =
                "matrix3d(" +
                ((e * w) >> 0) / w +
                v +
                ((i * w) >> 0) / w +
                v +
                ((m * w) >> 0) / w +
                v +
                ((q * w) >> 0) / w +
                v +
                ((f * w) >> 0) / w +
                v +
                ((j * w) >> 0) / w +
                v +
                ((n * w) >> 0) / w +
                v +
                ((r * w) >> 0) / w +
                v +
                ((g * w) >> 0) / w +
                v +
                ((k * w) >> 0) / w +
                v +
                ((o * w) >> 0) / w +
                v +
                ((s * w) >> 0) / w +
                v +
                h +
                v +
                l +
                v +
                p +
                v +
                (d ? 1 + -p / d : 1) +
                ")");
          },
          Ab = function () {
            var e,
              f,
              g,
              h,
              i,
              j,
              k,
              l,
              m,
              b = this.data,
              c = this.t,
              d = c.style;
            K &&
              ((e = d.top
                ? "top"
                : d.bottom
                ? "bottom"
                : parseFloat(U(c, "top", null, !1))
                ? "bottom"
                : "top"),
              (f = U(c, e, null, !1)),
              (g = parseFloat(f) || 0),
              (h = f.substr((g + "").length) || "px"),
              (b._ffFix = !b._ffFix),
              (d[e] = (b._ffFix ? g + 0.05 : g - 0.05) + h)),
              b.rotation || b.skewX
                ? ((i = b.rotation),
                  (j = i - b.skewX),
                  (k = 1e5),
                  (l = b.scaleX * k),
                  (m = b.scaleY * k),
                  (d[tb] =
                    "matrix(" +
                    ((Math.cos(i) * l) >> 0) / k +
                    "," +
                    ((Math.sin(i) * l) >> 0) / k +
                    "," +
                    ((Math.sin(j) * -m) >> 0) / k +
                    "," +
                    ((Math.cos(j) * m) >> 0) / k +
                    "," +
                    b.x +
                    "," +
                    b.y +
                    ")"))
                : (d[tb] =
                    "matrix(" +
                    b.scaleX +
                    ",0,0," +
                    b.scaleY +
                    "," +
                    b.x +
                    "," +
                    b.y +
                    ")");
          };
        qb(
          "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation",
          {
            parser: function (a, b, c, d, e, g, h) {
              if (d._transform) return e;
              var o,
                p,
                q,
                r,
                s,
                t,
                u,
                i = (d._transform = xb(a, f, !0)),
                j = a.style,
                k = 1e-6,
                l = sb.length,
                m = h,
                n = {};
              if ("string" == typeof m.transform && tb)
                (q = j.cssText),
                  (j[tb] = m.transform),
                  (j.display = "block"),
                  (o = xb(a, null, !1)),
                  (j.cssText = q);
              else if ("object" == typeof m) {
                if (
                  ((o = {
                    scaleX: bb(null != m.scaleX ? m.scaleX : m.scale, i.scaleX),
                    scaleY: bb(null != m.scaleY ? m.scaleY : m.scale, i.scaleY),
                    scaleZ: bb(null != m.scaleZ ? m.scaleZ : m.scale, i.scaleZ),
                    x: bb(m.x, i.x),
                    y: bb(m.y, i.y),
                    z: bb(m.z, i.z),
                    perspective: bb(m.transformPerspective, i.perspective),
                  }),
                  (u = m.directionalRotation),
                  null != u)
                )
                  if ("object" == typeof u) for (q in u) m[q] = u[q];
                  else m.rotation = u;
                (o.rotation = cb(
                  "rotation" in m
                    ? m.rotation
                    : "shortRotation" in m
                    ? m.shortRotation + "_short"
                    : "rotationZ" in m
                    ? m.rotationZ
                    : i.rotation * A,
                  i.rotation,
                  "rotation",
                  n
                )),
                  wb &&
                    ((o.rotationX = cb(
                      "rotationX" in m
                        ? m.rotationX
                        : "shortRotationX" in m
                        ? m.shortRotationX + "_short"
                        : i.rotationX * A || 0,
                      i.rotationX,
                      "rotationX",
                      n
                    )),
                    (o.rotationY = cb(
                      "rotationY" in m
                        ? m.rotationY
                        : "shortRotationY" in m
                        ? m.shortRotationY + "_short"
                        : i.rotationY * A || 0,
                      i.rotationY,
                      "rotationY",
                      n
                    ))),
                  (o.skewX = null == m.skewX ? i.skewX : cb(m.skewX, i.skewX)),
                  (o.skewY = null == m.skewY ? i.skewY : cb(m.skewY, i.skewY)),
                  (p = o.skewY - i.skewY) &&
                    ((o.skewX += p), (o.rotation += p));
              }
              for (
                s =
                  i.z ||
                  i.rotationX ||
                  i.rotationY ||
                  o.z ||
                  o.rotationX ||
                  o.rotationY ||
                  o.perspective,
                  s || null == m.scale || (o.scaleZ = 1);
                --l > -1;

              )
                (c = sb[l]),
                  (r = o[c] - i[c]),
                  (r > k || -k > r || null != B[c]) &&
                    ((t = !0),
                    (e = new mb(i, c, i[c], r, e)),
                    c in n && (e.e = n[c]),
                    (e.xs0 = 0),
                    (e.plugin = g),
                    d._overwriteProps.push(e.n));
              return (
                (r = m.transformOrigin),
                (r || (wb && s && i.zOrigin)) &&
                  (tb
                    ? ((t = !0),
                      (r = (r || U(a, c, f, !1, "50% 50%")) + ""),
                      (c = vb),
                      (e = new mb(j, c, 0, 0, e, -1, "css_transformOrigin")),
                      (e.b = j[c]),
                      (e.plugin = g),
                      wb
                        ? ((q = i.zOrigin),
                          (r = r.split(" ")),
                          (i.zOrigin =
                            (r.length > 2 ? parseFloat(r[2]) : q) || 0),
                          (e.xs0 =
                            e.e =
                            j[c] =
                              r[0] + " " + (r[1] || "50%") + " 0px"),
                          (e = new mb(i, "zOrigin", 0, 0, e, -1, e.n)),
                          (e.b = q),
                          (e.xs0 = e.e = i.zOrigin))
                        : (e.xs0 = e.e = j[c] = r))
                    : _(r + "", i)),
                t &&
                  (d._transformType = s || 3 === this._transformType ? 3 : 2),
                e
              );
            },
            prefix: !0,
          }
        ),
          qb("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          qb("borderRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, d, g) {
              b = this.format(b);
              var k,
                l,
                m,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                w,
                x,
                y,
                z,
                i = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                j = a.style;
              for (
                s = parseFloat(a.offsetWidth),
                  t = parseFloat(a.offsetHeight),
                  k = b.split(" "),
                  l = 0;
                i.length > l;
                l++
              )
                this.p.indexOf("border") && (i[l] = S(i[l])),
                  (o = n = U(a, i[l], f, !1, "0px")),
                  -1 !== o.indexOf(" ") &&
                    ((n = o.split(" ")), (o = n[0]), (n = n[1])),
                  (p = m = k[l]),
                  (q = parseFloat(o)),
                  (v = o.substr((q + "").length)),
                  (w = "=" === p.charAt(1)),
                  w
                    ? ((r = parseInt(p.charAt(0) + "1", 10)),
                      (p = p.substr(2)),
                      (r *= parseFloat(p)),
                      (u = p.substr((r + "").length - (0 > r ? 1 : 0)) || ""))
                    : ((r = parseFloat(p)), (u = p.substr((r + "").length))),
                  "" === u && (u = e[c] || v),
                  u !== v &&
                    ((x = $(a, "borderLeft", q, v)),
                    (y = $(a, "borderTop", q, v)),
                    "%" === u
                      ? ((o = 100 * (x / s) + "%"), (n = 100 * (y / t) + "%"))
                      : "em" === u
                      ? ((z = $(a, "borderLeft", 1, "em")),
                        (o = x / z + "em"),
                        (n = y / z + "em"))
                      : ((o = x + "px"), (n = y + "px")),
                    w &&
                      ((p = parseFloat(o) + r + u),
                      (m = parseFloat(n) + r + u))),
                  (g = nb(j, i[l], o + " " + n, p + " " + m, !1, "0px", g));
              return g;
            },
            prefix: !0,
            formatter: hb("0px 0px 0px 0px", !1, !0),
          }),
          qb("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (a, b, c, d, e, g) {
              var l,
                m,
                n,
                o,
                p,
                q,
                h = "background-position",
                i = f || T(a, null),
                j = this.format(
                  (i
                    ? M
                      ? i.getPropertyValue(h + "-x") +
                        " " +
                        i.getPropertyValue(h + "-y")
                      : i.getPropertyValue(h)
                    : a.currentStyle.backgroundPositionX +
                      " " +
                      a.currentStyle.backgroundPositionY) || "0 0"
                ),
                k = this.format(b);
              if (
                (-1 !== j.indexOf("%")) != (-1 !== k.indexOf("%")) &&
                ((q = U(a, "backgroundImage").replace(t, "")),
                q && "none" !== q)
              ) {
                for (
                  l = j.split(" "),
                    m = k.split(" "),
                    E.setAttribute("src", q),
                    n = 2;
                  --n > -1;

                )
                  (j = l[n]),
                    (o = -1 !== j.indexOf("%")),
                    o !== (-1 !== m[n].indexOf("%")) &&
                      ((p =
                        0 === n
                          ? a.offsetWidth - E.width
                          : a.offsetHeight - E.height),
                      (l[n] = o
                        ? (parseFloat(j) / 100) * p + "px"
                        : 100 * (parseFloat(j) / p) + "%"));
                j = l.join(" ");
              }
              return this.parseComplex(a.style, j, k, e, g);
            },
            formatter: _,
          }),
          qb("backgroundSize", { defaultValue: "0 0", formatter: _ }),
          qb("perspective", { defaultValue: "0px", prefix: !0 }),
          qb("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          qb("transformStyle", { prefix: !0 }),
          qb("backfaceVisibility", { prefix: !0 }),
          qb("margin", {
            parser: ib("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          qb("padding", {
            parser: ib("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          qb("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, e, g) {
              var h, i, j;
              return (
                9 > M
                  ? ((i = a.currentStyle),
                    (j = 8 > M ? " " : ","),
                    (h =
                      "rect(" +
                      i.clipTop +
                      j +
                      i.clipRight +
                      j +
                      i.clipBottom +
                      j +
                      i.clipLeft +
                      ")"),
                    (b = this.format(b).split(",").join(j)))
                  : ((h = this.format(U(a, this.p, f, !1, this.dflt))),
                    (b = this.format(b))),
                this.parseComplex(a.style, h, b, e, g)
              );
            },
          }),
          qb("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          qb("autoRound,strictUnits", {
            parser: function (a, b, c, d, e) {
              return e;
            },
          }),
          qb("border", {
            defaultValue: "0px solid #000",
            parser: function (a, b, c, d, e, g) {
              return this.parseComplex(
                a.style,
                this.format(
                  U(a, "borderTopWidth", f, !1, "0px") +
                    " " +
                    U(a, "borderTopStyle", f, !1, "solid") +
                    " " +
                    U(a, "borderTopColor", f, !1, "#000")
                ),
                this.format(b),
                e,
                g
              );
            },
            color: !0,
            formatter: function (a) {
              var b = a.split(" ");
              return (
                b[0] +
                " " +
                (b[1] || "solid") +
                " " +
                (a.match(gb) || ["#000"])[0]
              );
            },
          }),
          qb("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e) {
              var g = a.style,
                h = "cssFloat" in g ? "cssFloat" : "styleFloat";
              return new mb(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
            },
          });
        var Bb = function (a) {
          var e,
            b = this.t,
            c = b.filter,
            d = (this.s + this.c * a) >> 0;
          100 === d &&
            (-1 === c.indexOf("atrix(") && -1 === c.indexOf("radient(")
              ? (b.removeAttribute("filter"), (e = !U(this.data, "filter")))
              : ((b.filter = c.replace(q, "")), (e = !0))),
            e ||
              (this.xn1 && (b.filter = c = c || "alpha(opacity=100)"),
              -1 === c.indexOf("opacity")
                ? (b.filter += " alpha(opacity=" + d + ")")
                : (b.filter = c.replace(o, "opacity=" + d)));
        };
        qb("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (a, b, c, d, e, g) {
            var j,
              h = parseFloat(U(a, "opacity", f, !1, "1")),
              i = a.style;
            return (
              (b = parseFloat(b)),
              "autoAlpha" === c &&
                ((j = U(a, "visibility", f)),
                1 === h && "hidden" === j && 0 !== b && (h = 0),
                (e = new mb(
                  i,
                  "visibility",
                  0,
                  0,
                  e,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== h ? "visible" : "hidden",
                  0 === b ? "hidden" : "visible"
                )),
                (e.xs0 = "visible"),
                d._overwriteProps.push(e.n)),
              N
                ? (e = new mb(i, "opacity", h, b - h, e))
                : ((e = new mb(i, "opacity", 100 * h, 100 * (b - h), e)),
                  (e.xn1 = "autoAlpha" === c ? 1 : 0),
                  (i.zoom = 1),
                  (e.type = 2),
                  (e.b = "alpha(opacity=" + e.s + ")"),
                  (e.e = "alpha(opacity=" + (e.s + e.c) + ")"),
                  (e.data = a),
                  (e.plugin = g),
                  (e.setRatio = Bb)),
              e
            );
          },
        });
        var Cb = function (a) {
          if (1 === a || 0 === a) {
            this.t.className = 1 === a ? this.e : this.b;
            for (
              var b = this.data,
                c = this.t.style,
                d = c.removeProperty ? "removeProperty" : "removeAttribute";
              b;

            )
              b.v ? (c[b.p] = b.v) : c[d](b.p.replace(r, "-$1").toLowerCase()),
                (b = b._next);
          } else this.t.className !== this.b && (this.t.className = this.b);
        };
        qb("className", {
          parser: function (a, b, c, e, g, h, i) {
            var l,
              m,
              j = a.className,
              k = a.style.cssText;
            return (
              (g = e._classNamePT = new mb(a, c, 0, 0, g, 2)),
              (g.setRatio = Cb),
              (g.pr = -11),
              (d = !0),
              (g.b = j),
              (g.e =
                "=" !== b.charAt(1)
                  ? b
                  : "+" === b.charAt(0)
                  ? j + " " + b.substr(2)
                  : j.split(b.substr(2)).join("")),
              e._tween._duration &&
                ((m = V(a, f, !0)),
                (a.className = g.e),
                (l = W(a, m, V(a), i)),
                (a.className = j),
                (g.data = l.firstMPT),
                (a.style.cssText = k),
                (g = g.xfirst = e.parse(a, l.difs, g, h))),
              g
            );
          },
        });
        var Db = function (a) {
          if (
            (1 === a || 0 === a) &&
            this.data._totalTime === this.data._totalDuration
          )
            for (
              var i,
                b = "all" === this.e,
                c = this.t.style,
                d = b ? c.cssText.split(";") : this.e.split(","),
                e = c.removeProperty ? "removeProperty" : "removeAttribute",
                f = d.length,
                g = h.transform.parse;
              --f > -1;

            )
              (i = d[f]),
                b && (i = i.substr(0, i.indexOf(":")).split(" ").join("")),
                h[i] && (i = h[i].parse === g ? tb : h[i].p),
                i && c[e](i.replace(r, "-$1").toLowerCase());
        };
        for (
          qb("clearProps", {
            parser: function (a, b, c, e, f) {
              return (
                (f = new mb(a, c, 0, 0, f, 2)),
                (f.setRatio = Db),
                (f.e = b),
                (f.pr = -10),
                (f.data = e._tween),
                (d = !0),
                f
              );
            },
          }),
            i = "bezier,throwProps,physicsProps,physics2D".split(","),
            ob = i.length;
          ob--;

        )
          rb(i[ob]);
        (i = c.prototype),
          (i._firstPT = null),
          (i._onInitTween = function (a, b, h) {
            if (!a.nodeType) return !1;
            (this._target = a),
              (this._tween = h),
              (this._vars = b),
              (H = b.autoRound),
              (d = !1),
              (e = b.suffixMap || c.suffixMap),
              (f = T(a, "")),
              (g = this._overwriteProps);
            var j,
              k,
              l,
              m,
              n,
              o,
              q,
              r,
              s,
              i = a.style;
            if (
              (I &&
                "" === i.zIndex &&
                ((j = U(a, "zIndex", f)),
                ("auto" === j || "" === j) && (i.zIndex = 0)),
              "string" == typeof b &&
                ((m = i.cssText),
                (j = V(a, f)),
                (i.cssText = m + ";" + b),
                (j = W(a, j, V(a)).difs),
                !N && p.test(b) && (j.opacity = parseFloat(RegExp.$1)),
                (b = j),
                (i.cssText = m)),
              (this._firstPT = k = this.parse(a, b, null)),
              this._transformType)
            ) {
              for (
                s = 3 === this._transformType,
                  tb
                    ? J &&
                      ((I = !0),
                      "" === i.zIndex &&
                        ((q = U(a, "zIndex", f)),
                        ("auto" === q || "" === q) && (i.zIndex = 0)),
                      L &&
                        (i.WebkitBackfaceVisibility =
                          this._vars.WebkitBackfaceVisibility ||
                          (s ? "visible" : "hidden")))
                    : (i.zoom = 1),
                  l = k;
                l && l._next;

              )
                l = l._next;
              (r = new mb(a, "transform", 0, 0, null, 2)),
                this._linkCSSP(r, null, l),
                (r.setRatio = s && wb ? zb : tb ? Ab : yb),
                (r.data = this._transform || xb(a, f, !0)),
                g.pop();
            }
            if (d) {
              for (; k; ) {
                for (o = k._next, l = m; l && l.pr > k.pr; ) l = l._next;
                (k._prev = l ? l._prev : n) ? (k._prev._next = k) : (m = k),
                  (k._next = l) ? (l._prev = k) : (n = k),
                  (k = o);
              }
              this._firstPT = m;
            }
            return !0;
          }),
          (i.parse = function (a, b, c, d) {
            var i,
              j,
              k,
              l,
              m,
              o,
              p,
              q,
              r,
              s,
              g = a.style;
            for (i in b)
              (o = b[i]),
                (j = h[i]),
                j
                  ? (c = j.parse(a, o, i, this, c, d, b))
                  : ((m = U(a, i, f) + ""),
                    (r = "string" == typeof o),
                    "color" === i ||
                    "fill" === i ||
                    "stroke" === i ||
                    -1 !== i.indexOf("Color") ||
                    (r && !o.indexOf("rgb"))
                      ? (r ||
                          ((o = fb(o)),
                          (o =
                            (o.length > 3 ? "rgba(" : "rgb(") +
                            o.join(",") +
                            ")")),
                        (c = nb(g, i, m, o, !0, "transparent", c, 0, d)))
                      : !r || (-1 === o.indexOf(" ") && -1 === o.indexOf(","))
                      ? ((k = parseFloat(m)),
                        (p = k || 0 === k ? m.substr((k + "").length) : ""),
                        ("" === m || "auto" === m) &&
                          ("width" === i || "height" === i
                            ? ((k = Z(a, i, f)), (p = "px"))
                            : ((k = "opacity" !== i ? 0 : 1), (p = ""))),
                        (s = r && "=" === o.charAt(1)),
                        s
                          ? ((l = parseInt(o.charAt(0) + "1", 10)),
                            (o = o.substr(2)),
                            (l *= parseFloat(o)),
                            (q = o.replace(n, "")))
                          : ((l = parseFloat(o)),
                            (q = r ? o.substr((l + "").length) || "" : "")),
                        "" === q && (q = e[i] || p),
                        (o = l || 0 === l ? (s ? l + k : l) + q : b[i]),
                        p !== q &&
                          "" !== q &&
                          (l || 0 === l) &&
                          (k || 0 === k) &&
                          ((k = $(a, i, k, p)),
                          "%" === q
                            ? ((k /= $(a, i, 100, "%") / 100),
                              k > 100 && (k = 100),
                              b.strictUnits !== !0 && (m = k + "%"))
                            : "em" === q
                            ? (k /= $(a, i, 1, "em"))
                            : ((l = $(a, i, l, q)), (q = "px")),
                          s && (l || 0 === l) && (o = l + k + q)),
                        s && (l += k),
                        (!k && 0 !== k) || (!l && 0 !== l)
                          ? o || ("NaN" != o + "" && null != o)
                            ? ((c = new mb(
                                g,
                                i,
                                l || k || 0,
                                0,
                                c,
                                -1,
                                "css_" + i,
                                !1,
                                0,
                                m,
                                o
                              )),
                              (c.xs0 = "display" === i && "none" === o ? m : o))
                            : P("invalid " + i + " tween value: " + b[i])
                          : ((c = new mb(
                              g,
                              i,
                              k,
                              l - k,
                              c,
                              0,
                              "css_" + i,
                              H !== !1 && ("px" === q || "zIndex" === i),
                              0,
                              m,
                              o
                            )),
                            (c.xs0 = q)))
                      : (c = nb(g, i, m, o, !0, null, c, 0, d))),
                d && c && !c.plugin && (c.plugin = d);
            return c;
          }),
          (i.setRatio = function (a) {
            var d,
              e,
              f,
              b = this._firstPT,
              c = 1e-6;
            if (
              1 !== a ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                a ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; b; ) {
                  if (
                    ((d = b.c * a + b.s),
                    b.r
                      ? (d = d > 0 ? (d + 0.5) >> 0 : (d - 0.5) >> 0)
                      : c > d && d > -c && (d = 0),
                    b.type)
                  )
                    if (1 === b.type)
                      if (((f = b.l), 2 === f))
                        b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2;
                      else if (3 === f)
                        b.t[b.p] =
                          b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3;
                      else if (4 === f)
                        b.t[b.p] =
                          b.xs0 +
                          d +
                          b.xs1 +
                          b.xn1 +
                          b.xs2 +
                          b.xn2 +
                          b.xs3 +
                          b.xn3 +
                          b.xs4;
                      else if (5 === f)
                        b.t[b.p] =
                          b.xs0 +
                          d +
                          b.xs1 +
                          b.xn1 +
                          b.xs2 +
                          b.xn2 +
                          b.xs3 +
                          b.xn3 +
                          b.xs4 +
                          b.xn4 +
                          b.xs5;
                      else {
                        for (e = b.xs0 + d + b.xs1, f = 1; b.l > f; f++)
                          e += b["xn" + f] + b["xs" + (f + 1)];
                        b.t[b.p] = e;
                      }
                    else
                      -1 === b.type
                        ? (b.t[b.p] = b.xs0)
                        : b.setRatio && b.setRatio(a);
                  else b.t[b.p] = d + b.xs0;
                  b = b._next;
                }
              else
                for (; b; )
                  2 !== b.type ? (b.t[b.p] = b.b) : b.setRatio(a),
                    (b = b._next);
            else
              for (; b; )
                2 !== b.type ? (b.t[b.p] = b.e) : b.setRatio(a), (b = b._next);
          }),
          (i._enableTransforms = function (a) {
            this._transformType = a || 3 === this._transformType ? 3 : 2;
          }),
          (i._linkCSSP = function (a, b, c, d) {
            return (
              a &&
                (b && (b._prev = a),
                a._next && (a._next._prev = a._prev),
                c
                  ? (c._next = a)
                  : d || null !== this._firstPT || (this._firstPT = a),
                a._prev
                  ? (a._prev._next = a._next)
                  : this._firstPT === a && (this._firstPT = a._next),
                (a._next = b),
                (a._prev = c)),
              a
            );
          }),
          (i._kill = function (b) {
            var e,
              f,
              g,
              c = b,
              d = !1;
            if (b.css_autoAlpha || b.css_alpha) {
              c = {};
              for (f in b) c[f] = b[f];
              (c.css_opacity = 1), c.css_autoAlpha && (c.css_visibility = 1);
            }
            return (
              b.css_className &&
                (e = this._classNamePT) &&
                ((g = e.xfirst),
                g && g._prev
                  ? this._linkCSSP(g._prev, e._next, g._prev._prev)
                  : g === this._firstPT && (this._firstPT = null),
                e._next && this._linkCSSP(e._next, e._next._next, g._prev),
                (this._target._gsOverwrittenClassNamePT = this._linkCSSP(
                  e,
                  this._target._gsOverwrittenClassNamePT
                )),
                (this._classNamePT = null),
                (d = !0)),
              a.prototype._kill.call(this, c) || d
            );
          });
        var Eb = function (a, b, c) {
          var d, e, f, g;
          if (a.slice) for (e = a.length; --e > -1; ) Eb(a[e], b, c);
          else
            for (d = a.childNodes, e = d.length; --e > -1; )
              (f = d[e]),
                (g = f.type),
                f.style && (b.push(V(f)), c && c.push(f)),
                (1 !== g && 9 !== g && 11 !== g) ||
                  !f.childNodes.length ||
                  Eb(f, b, c);
        };
        return (
          (c.cascadeTo = function (a, c, d) {
            var k,
              l,
              m,
              e = b.to(a, c, d),
              f = [e],
              g = [],
              h = [],
              i = [],
              j = b._internals.reservedProps;
            for (
              a = e._targets || e.target,
                Eb(a, g, i),
                e.render(c, !0),
                Eb(a, h),
                e.render(0, !0),
                e._enabled(!0),
                k = i.length;
              --k > -1;

            )
              if (((l = W(i[k], g[k], h[k])), l.firstMPT)) {
                l = l.difs;
                for (m in d) j[m] && (l[m] = d[m]);
                f.push(b.to(i[k], c, l));
              }
            return f;
          }),
          a.activate([c]),
          c
        );
      },
      !0
    ),
    (function () {
      var a = window._gsDefine.plugin({
          propName: "roundProps",
          priority: -1,
          API: 2,
          init: function (a, b, c) {
            return (this._tween = c), !0;
          },
        }),
        b = a.prototype;
      (b._onInitAllProps = function () {
        for (
          var f,
            g,
            h,
            a = this._tween,
            b =
              a.vars.roundProps instanceof Array
                ? a.vars.roundProps
                : a.vars.roundProps.split(","),
            c = b.length,
            d = {},
            e = a._propLookup.roundProps;
          --c > -1;

        )
          d[b[c]] = 1;
        for (c = b.length; --c > -1; )
          for (f = b[c], g = a._firstPT; g; )
            (h = g._next),
              g.pg
                ? g.t._roundProps(d, !0)
                : g.n === f &&
                  (this._add(g.t, f, g.s, g.c),
                  h && (h._prev = g._prev),
                  g._prev
                    ? (g._prev._next = h)
                    : a._firstPT === g && (a._firstPT = h),
                  (g._next = g._prev = null),
                  (a._propLookup[f] = e)),
              (g = h);
        return !1;
      }),
        (b._add = function (a, b, c, d) {
          this._addTween(a, b, c, c + d, b, !0), this._overwriteProps.push(b);
        });
    })(),
    window._gsDefine.plugin({
      propName: "attr",
      API: 2,
      init: function (a, b) {
        var d;
        if ("function" != typeof a.setAttribute) return !1;
        (this._target = a), (this._proxy = {});
        for (d in b)
          this._addTween(
            this._proxy,
            d,
            parseFloat(a.getAttribute(d)),
            b[d],
            d
          ),
            this._overwriteProps.push(d);
        return !0;
      },
      set: function (a) {
        this._super.setRatio.call(this, a);
        for (var d, b = this._overwriteProps, c = b.length; --c > -1; )
          (d = b[c]), this._target.setAttribute(d, this._proxy[d] + "");
      },
    }),
    (window._gsDefine.plugin({
      propName: "directionalRotation",
      API: 2,
      init: function (a, b) {
        "object" != typeof b && (b = { rotation: b }), (this.finals = {});
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          d = b.useRadians === !0 ? 2 * Math.PI : 360;
        for (e in b)
          "useRadians" !== e &&
            ((j = (b[e] + "").split("_")),
            (f = j[0]),
            (k = j[1]),
            (g = parseFloat(
              "function" != typeof a[e]
                ? a[e]
                : a[
                    e.indexOf("set") ||
                    "function" != typeof a["get" + e.substr(3)]
                      ? e
                      : "get" + e.substr(3)
                  ]()
            )),
            (h = this.finals[e] =
              "string" == typeof f && "=" === f.charAt(1)
                ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2))
                : Number(f) || 0),
            (i = h - g),
            "short" === k
              ? ((i %= d), i !== i % (d / 2) && (i = 0 > i ? i + d : i - d))
              : "cw" === k && 0 > i
              ? (i = ((i + 9999999999 * d) % d) - (0 | (i / d)) * d)
              : "ccw" === k &&
                i > 0 &&
                (i = ((i - 9999999999 * d) % d) - (0 | (i / d)) * d),
            this._addTween(a, e, g, g + i, e),
            this._overwriteProps.push(e));
        return !0;
      },
      set: function (a) {
        var b;
        if (1 !== a) this._super.setRatio.call(this, a);
        else
          for (b = this._firstPT; b; )
            b.f ? b.t[b.p](this.finals[b.p]) : (b.t[b.p] = this.finals[b.p]),
              (b = b._next);
      },
    })._autoCSS = !0),
    window._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (a) {
        var n,
          o,
          b = window.GreenSockGlobals || window,
          c = b.com.greensock,
          d = 2 * Math.PI,
          e = Math.PI / 2,
          f = c._class,
          g = function (b, c) {
            var d = f("easing." + b, function () {}, !0),
              e = (d.prototype = new a());
            return (e.constructor = d), (e.getRatio = c), d;
          },
          h = a.register || function () {},
          i = function (a, b, c, d) {
            var g = f(
              "easing." + a,
              { easeOut: new b(), easeIn: new c(), easeInOut: new d() },
              !0
            );
            return h(g, a), g;
          },
          j = function (b, c) {
            var d = f(
                "easing." + b,
                function (a) {
                  (this._p1 = a || 0 === a ? a : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              e = (d.prototype = new a());
            return (
              (e.constructor = d),
              (e.getRatio = c),
              (e.config = function (a) {
                return new d(a);
              }),
              d
            );
          },
          k = i(
            "Back",
            j("BackOut", function (a) {
              return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
            }),
            j("BackIn", function (a) {
              return a * a * ((this._p1 + 1) * a - this._p1);
            }),
            j("BackInOut", function (a) {
              return 1 > (a *= 2)
                ? 0.5 * a * a * ((this._p2 + 1) * a - this._p2)
                : 0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
            })
          ),
          l = f(
            "easing.SlowMo",
            function (a, b, c) {
              (b = b || 0 === b ? b : 0.7),
                null == a ? (a = 0.7) : a > 1 && (a = 1),
                (this._p = 1 !== a ? b : 0),
                (this._p1 = (1 - a) / 2),
                (this._p2 = a),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = c === !0);
            },
            !0
          ),
          m = (l.prototype = new a());
        return (
          (m.constructor = l),
          (m.getRatio = function (a) {
            var b = a + (0.5 - a) * this._p;
            return this._p1 > a
              ? this._calcEnd
                ? 1 - (a = 1 - a / this._p1) * a
                : b - (a = 1 - a / this._p1) * a * a * a * b
              : a > this._p3
              ? this._calcEnd
                ? 1 - (a = (a - this._p3) / this._p1) * a
                : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a
              : this._calcEnd
              ? 1
              : b;
          }),
          (l.ease = new l(0.7, 0.7)),
          (m.config = l.config =
            function (a, b, c) {
              return new l(a, b, c);
            }),
          (n = f(
            "easing.SteppedEase",
            function (a) {
              (a = a || 1), (this._p1 = 1 / a), (this._p2 = a + 1);
            },
            !0
          )),
          (m = n.prototype = new a()),
          (m.constructor = n),
          (m.getRatio = function (a) {
            return (
              0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
              ((this._p2 * a) >> 0) * this._p1
            );
          }),
          (m.config = n.config =
            function (a) {
              return new n(a);
            }),
          i(
            "Bounce",
            g("BounceOut", function (a) {
              return 1 / 2.75 > a
                ? 7.5625 * a * a
                : 2 / 2.75 > a
                ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                : 2.5 / 2.75 > a
                ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            }),
            g("BounceIn", function (a) {
              return 1 / 2.75 > (a = 1 - a)
                ? 1 - 7.5625 * a * a
                : 2 / 2.75 > a
                ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
                : 2.5 / 2.75 > a
                ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
                : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
            }),
            g("BounceInOut", function (a) {
              var b = 0.5 > a;
              return (
                (a = b ? 1 - 2 * a : 2 * a - 1),
                (a =
                  1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                    : 2.5 / 2.75 > a
                    ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                    : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375),
                b ? 0.5 * (1 - a) : 0.5 * a + 0.5
              );
            })
          ),
          i(
            "Circ",
            g("CircOut", function (a) {
              return Math.sqrt(1 - (a -= 1) * a);
            }),
            g("CircIn", function (a) {
              return -(Math.sqrt(1 - a * a) - 1);
            }),
            g("CircInOut", function (a) {
              return 1 > (a *= 2)
                ? -0.5 * (Math.sqrt(1 - a * a) - 1)
                : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            })
          ),
          (o = function (b, c, e) {
            var g = f(
                "easing." + b,
                function (a, b) {
                  (this._p1 = a || 1),
                    (this._p2 = b || e),
                    (this._p3 =
                      (this._p2 / d) * (Math.asin(1 / this._p1) || 0));
                },
                !0
              ),
              h = (g.prototype = new a());
            return (
              (h.constructor = g),
              (h.getRatio = c),
              (h.config = function (a, b) {
                return new g(a, b);
              }),
              g
            );
          }),
          i(
            "Elastic",
            o(
              "ElasticOut",
              function (a) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * a) *
                    Math.sin(((a - this._p3) * d) / this._p2) +
                  1
                );
              },
              0.3
            ),
            o(
              "ElasticIn",
              function (a) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (a -= 1)) *
                  Math.sin(((a - this._p3) * d) / this._p2)
                );
              },
              0.3
            ),
            o(
              "ElasticInOut",
              function (a) {
                return 1 > (a *= 2)
                  ? -0.5 *
                      this._p1 *
                      Math.pow(2, 10 * (a -= 1)) *
                      Math.sin(((a - this._p3) * d) / this._p2)
                  : 0.5 *
                      this._p1 *
                      Math.pow(2, -10 * (a -= 1)) *
                      Math.sin(((a - this._p3) * d) / this._p2) +
                      1;
              },
              0.45
            )
          ),
          i(
            "Expo",
            g("ExpoOut", function (a) {
              return 1 - Math.pow(2, -10 * a);
            }),
            g("ExpoIn", function (a) {
              return Math.pow(2, 10 * (a - 1)) - 0.001;
            }),
            g("ExpoInOut", function (a) {
              return 1 > (a *= 2)
                ? 0.5 * Math.pow(2, 10 * (a - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (a - 1)));
            })
          ),
          i(
            "Sine",
            g("SineOut", function (a) {
              return Math.sin(a * e);
            }),
            g("SineIn", function (a) {
              return -Math.cos(a * e) + 1;
            }),
            g("SineInOut", function (a) {
              return -0.5 * (Math.cos(Math.PI * a) - 1);
            })
          ),
          f(
            "easing.EaseLookup",
            {
              find: function (b) {
                return a.map[b];
              },
            },
            !0
          ),
          h(b.SlowMo, "SlowMo", "ease,"),
          h(n, "SteppedEase", "ease,"),
          k
        );
      },
      !0
    );
}),
  (function (a) {
    "use strict";
    var f,
      g,
      h,
      i,
      j,
      b = a.GreenSockGlobals || a,
      c = function (a) {
        var e,
          c = a.split("."),
          d = b;
        for (e = 0; c.length > e; e++) d[c[e]] = d = d[c[e]] || {};
        return d;
      },
      d = c("com.greensock"),
      e = function () {},
      k = {},
      l = function (d, e, f, g) {
        (this.sc = k[d] ? k[d].sc : []),
          (k[d] = this),
          (this.gsClass = null),
          (this.func = f);
        var h = [];
        (this.check = function (i) {
          for (var n, o, p, q, j = e.length, m = j; --j > -1; )
            (n = k[e[j]] || new l(e[j], [])).gsClass
              ? ((h[j] = n.gsClass), m--)
              : i && n.sc.push(this);
          if (0 === m && f)
            for (
              o = ("com.greensock." + d).split("."),
                p = o.pop(),
                q = c(o.join("."))[p] = this.gsClass = f.apply(f, h),
                g &&
                  ((b[p] = q),
                  "function" == typeof define && define.amd
                    ? define(
                        (a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") +
                          d.split(".").join("/"),
                        [],
                        function () {
                          return q;
                        }
                      )
                    : "undefined" != typeof module &&
                      module.exports &&
                      (module.exports = q)),
                j = 0;
              this.sc.length > j;
              j++
            )
              this.sc[j].check();
        }),
          this.check(!0);
      },
      m = (a._gsDefine = function (a, b, c, d) {
        return new l(a, b, c, d);
      }),
      n = (d._class = function (a, b, c) {
        return (
          (b = b || function () {}),
          m(
            a,
            [],
            function () {
              return b;
            },
            c
          ),
          b
        );
      });
    m.globals = b;
    var o = [0, 0, 1, 1],
      p = [],
      q = n(
        "easing.Ease",
        function (a, b, c, d) {
          (this._func = a),
            (this._type = c || 0),
            (this._power = d || 0),
            (this._params = b ? o.concat(b) : o);
        },
        !0
      ),
      r = (q.map = {}),
      s = (q.register = function (a, b, c, e) {
        for (
          var i,
            j,
            k,
            l,
            f = b.split(","),
            g = f.length,
            h = (c || "easeIn,easeOut,easeInOut").split(",");
          --g > -1;

        )
          for (
            j = f[g],
              i = e ? n("easing." + j, null, !0) : d.easing[j] || {},
              k = h.length;
            --k > -1;

          )
            (l = h[k]),
              (r[j + "." + l] =
                r[l + j] =
                i[l] =
                  a.getRatio ? a : a[l] || new a());
      });
    for (
      h = q.prototype,
        h._calcEnd = !1,
        h.getRatio = function (a) {
          if (this._func)
            return (this._params[0] = a), this._func.apply(null, this._params);
          var b = this._type,
            c = this._power,
            d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
          return (
            1 === c
              ? (d *= d)
              : 2 === c
              ? (d *= d * d)
              : 3 === c
              ? (d *= d * d * d)
              : 4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
          );
        },
        f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        g = f.length;
      --g > -1;

    )
      (h = f[g] + ",Power" + g),
        s(new q(null, null, 1, g), h, "easeOut", !0),
        s(new q(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")),
        s(new q(null, null, 3, g), h, "easeInOut");
    (r.linear = d.easing.Linear.easeIn), (r.swing = d.easing.Quad.easeInOut);
    var t = n("events.EventDispatcher", function (a) {
      (this._listeners = {}), (this._eventTarget = a || this);
    });
    (h = t.prototype),
      (h.addEventListener = function (a, b, c, d, e) {
        e = e || 0;
        var h,
          k,
          f = this._listeners[a],
          g = 0;
        for (
          null == f && (this._listeners[a] = f = []), k = f.length;
          --k > -1;

        )
          (h = f[k]),
            h.c === b && h.s === c
              ? f.splice(k, 1)
              : 0 === g && e > h.pr && (g = k + 1);
        f.splice(g, 0, { c: b, s: c, up: d, pr: e }),
          this !== i || j || i.wake();
      }),
      (h.removeEventListener = function (a, b) {
        var d,
          c = this._listeners[a];
        if (c)
          for (d = c.length; --d > -1; )
            if (c[d].c === b) return c.splice(d, 1), void 0;
      }),
      (h.dispatchEvent = function (a) {
        var c,
          d,
          e,
          b = this._listeners[a];
        if (b)
          for (c = b.length, d = this._eventTarget; --c > -1; )
            (e = b[c]),
              e.up
                ? e.c.call(e.s || d, { type: a, target: d })
                : e.c.call(e.s || d);
      });
    var u = a.requestAnimationFrame,
      v = a.cancelAnimationFrame,
      w =
        Date.now ||
        function () {
          return new Date().getTime();
        };
    for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !u; )
      (u = a[f[g] + "RequestAnimationFrame"]),
        (v =
          a[f[g] + "CancelAnimationFrame"] ||
          a[f[g] + "CancelRequestAnimationFrame"]);
    n("Ticker", function (a, b) {
      var g,
        h,
        k,
        l,
        m,
        c = this,
        d = w(),
        f = b !== !1 && u,
        n = function (a) {
          (c.time = (w() - d) / 1e3),
            (!g || c.time >= m || a === !0) &&
              (c.frame++, (m = c.time + l), c.dispatchEvent("tick")),
            a !== !0 && (k = h(n));
        };
      t.call(c),
        (this.time = this.frame = 0),
        (this.tick = function () {
          n(!0);
        }),
        (this.sleep = function () {
          null != k &&
            (f && v ? v(k) : clearTimeout(k),
            (h = e),
            (k = null),
            c === i && (j = !1));
        }),
        (this.wake = function () {
          k && c.sleep(),
            (h =
              0 === g
                ? e
                : f && u
                ? u
                : function (a) {
                    return setTimeout(a, 1e3 * l);
                  }),
            c === i && (j = !0),
            n();
        }),
        (this.fps = function (a) {
          return arguments.length
            ? ((g = a),
              (l = 1 / (g || 60)),
              (m = this.time + l),
              c.wake(),
              void 0)
            : g;
        }),
        (this.useRAF = function (a) {
          return arguments.length ? ((f = a), c.fps(g), void 0) : f;
        }),
        c.fps(a),
        setTimeout(function () {
          f && !k && c.useRAF(!1);
        }, 1e3);
    }),
      (h = d.Ticker.prototype = new d.events.EventDispatcher()),
      (h.constructor = d.Ticker);
    var x = n("core.Animation", function (a, b) {
      if (
        ((this.vars = b || {}),
        (this._duration = this._totalDuration = a || 0),
        (this._delay = Number(this.vars.delay) || 0),
        (this._timeScale = 1),
        (this._active = this.vars.immediateRender === !0),
        (this.data = this.vars.data),
        (this._reversed = this.vars.reversed === !0),
        K)
      ) {
        j || i.wake();
        var c = this.vars.useFrames ? J : K;
        c.add(this, c._time), this.vars.paused && this.paused(!0);
      }
    });
    (i = x.ticker = new d.Ticker()),
      (h = x.prototype),
      (h._dirty = h._gc = h._initted = h._paused = !1),
      (h._totalTime = h._time = 0),
      (h._rawPrevTime = -1),
      (h._next = h._last = h._onUpdate = h._timeline = h.timeline = null),
      (h._paused = !1),
      (h.play = function (a, b) {
        return (
          arguments.length && this.seek(a, b),
          this.reversed(!1),
          this.paused(!1)
        );
      }),
      (h.pause = function (a, b) {
        return arguments.length && this.seek(a, b), this.paused(!0);
      }),
      (h.resume = function (a, b) {
        return arguments.length && this.seek(a, b), this.paused(!1);
      }),
      (h.seek = function (a, b) {
        return this.totalTime(Number(a), b !== !1);
      }),
      (h.restart = function (a, b) {
        return (
          this.reversed(!1),
          this.paused(!1),
          this.totalTime(a ? -this._delay : 0, b !== !1)
        );
      }),
      (h.reverse = function (a, b) {
        return (
          arguments.length && this.seek(a || this.totalDuration(), b),
          this.reversed(!0),
          this.paused(!1)
        );
      }),
      (h.render = function () {}),
      (h.invalidate = function () {
        return this;
      }),
      (h._enabled = function (a, b) {
        return (
          j || i.wake(),
          (this._gc = !a),
          (this._active =
            a &&
            !this._paused &&
            this._totalTime > 0 &&
            this._totalTime < this._totalDuration),
          b !== !0 &&
            (a && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !a && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (h._kill = function () {
        return this._enabled(!1, !1);
      }),
      (h.kill = function (a, b) {
        return this._kill(a, b), this;
      }),
      (h._uncache = function (a) {
        for (var b = a ? this : this.timeline; b; )
          (b._dirty = !0), (b = b.timeline);
        return this;
      }),
      (h.eventCallback = function (a, b, c, d) {
        if (null == a) return null;
        if ("on" === a.substr(0, 2)) {
          var f,
            e = this.vars;
          if (1 === arguments.length) return e[a];
          if (null == b) delete e[a];
          else if (((e[a] = b), (e[a + "Params"] = c), (e[a + "Scope"] = d), c))
            for (f = c.length; --f > -1; )
              "{self}" === c[f] &&
                ((c = e[a + "Params"] = c.concat()), (c[f] = this));
          "onUpdate" === a && (this._onUpdate = b);
        }
        return this;
      }),
      (h.delay = function (a) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + a - this._delay),
            (this._delay = a),
            this)
          : this._delay;
      }),
      (h.duration = function (a) {
        return arguments.length
          ? ((this._duration = this._totalDuration = a),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== a &&
              this.totalTime(this._totalTime * (a / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (h.totalDuration = function (a) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(a) : this._totalDuration
        );
      }),
      (h.time = function (a, b) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            a > this._duration && (a = this._duration),
            this.totalTime(a, b))
          : this._time;
      }),
      (h.totalTime = function (a, b) {
        if ((j || i.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > a && (a += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var c = this._totalDuration,
              d = this._timeline;
            if (
              (a > c && (a = c),
              (this._startTime =
                (this._paused ? this._pauseTime : d._time) -
                (this._reversed ? c - a : a) / this._timeScale),
              d._dirty || this._uncache(!1),
              !d._active)
            )
              for (; d._timeline; )
                d.totalTime(d._totalTime, !0), (d = d._timeline);
          }
          this._gc && this._enabled(!0, !1),
            this._totalTime !== a && this.render(a, b, !1);
        }
        return this;
      }),
      (h.startTime = function (a) {
        return arguments.length
          ? (a !== this._startTime &&
              ((this._startTime = a),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, a - this._delay)),
            this)
          : this._startTime;
      }),
      (h.timeScale = function (a) {
        if (!arguments.length) return this._timeScale;
        if (
          ((a = a || 1e-6), this._timeline && this._timeline.smoothChildTiming)
        ) {
          var b = this._pauseTime,
            c = b || 0 === b ? b : this._timeline.totalTime();
          this._startTime = c - ((c - this._startTime) * this._timeScale) / a;
        }
        return (this._timeScale = a), this._uncache(!1);
      }),
      (h.reversed = function (a) {
        return arguments.length
          ? (a != this._reversed &&
              ((this._reversed = a), this.totalTime(this._totalTime, !0)),
            this)
          : this._reversed;
      }),
      (h.paused = function (a) {
        if (!arguments.length) return this._paused;
        if (a != this._paused && this._timeline) {
          j || a || i.wake();
          var b = this._timeline.rawTime(),
            c = b - this._pauseTime;
          !a &&
            this._timeline.smoothChildTiming &&
            ((this._startTime += c), this._uncache(!1)),
            (this._pauseTime = a ? b : null),
            (this._paused = a),
            (this._active =
              !a &&
              this._totalTime > 0 &&
              this._totalTime < this._totalDuration),
            a || 0 === c || this.render(this._time, !0, !0);
        }
        return this._gc && !a && this._enabled(!0, !1), this;
      });
    var y = n("core.SimpleTimeline", function (a) {
      x.call(this, 0, a),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (h = y.prototype = new x()),
      (h.constructor = y),
      (h.kill()._gc = !1),
      (h._first = h._last = null),
      (h._sortChildren = !1),
      (h.add = function (a, b) {
        var e, f;
        if (
          ((a._startTime = Number(b || 0) + a._delay),
          a._paused &&
            this !== a._timeline &&
            (a._pauseTime =
              a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
          a.timeline && a.timeline._remove(a, !0),
          (a.timeline = a._timeline = this),
          a._gc && a._enabled(!0, !0),
          (e = this._last),
          this._sortChildren)
        )
          for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
        return (
          e
            ? ((a._next = e._next), (e._next = a))
            : ((a._next = this._first), (this._first = a)),
          a._next ? (a._next._prev = a) : (this._last = a),
          (a._prev = e),
          this._timeline && this._uncache(!0),
          this
        );
      }),
      (h.insert = h.add),
      (h._remove = function (a, b) {
        return (
          a.timeline === this &&
            (b || a._enabled(!1, !0),
            (a.timeline = null),
            a._prev
              ? (a._prev._next = a._next)
              : this._first === a && (this._first = a._next),
            a._next
              ? (a._next._prev = a._prev)
              : this._last === a && (this._last = a._prev),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (h.render = function (a, b, c) {
        var e,
          d = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; d; )
          (e = d._next),
            (d._active || (a >= d._startTime && !d._paused)) &&
              (d._reversed
                ? d.render(
                    (d._dirty ? d.totalDuration() : d._totalDuration) -
                      (a - d._startTime) * d._timeScale,
                    b,
                    c
                  )
                : d.render((a - d._startTime) * d._timeScale, b, c)),
            (d = e);
      }),
      (h.rawTime = function () {
        return j || i.wake(), this._totalTime;
      });
    var z = n(
        "TweenLite",
        function (a, b, c) {
          if ((x.call(this, b, c), null == a))
            throw "Cannot tween a null target.";
          this.target = a = "string" != typeof a ? a : z.selector(a) || a;
          var f,
            g,
            h,
            d =
              a.jquery ||
              ("function" == typeof a.each &&
                a[0] &&
                a[0].nodeType &&
                a[0].style),
            e = this.vars.overwrite;
          if (
            ((this._overwrite = e =
              null == e
                ? I[z.defaultOverwrite]
                : "number" == typeof e
                ? e >> 0
                : I[e]),
            (d || a instanceof Array) && "number" != typeof a[0])
          )
            for (
              this._targets = h = d && !a.slice ? B(a) : a.slice(0),
                this._propLookup = [],
                this._siblings = [],
                f = 0;
              h.length > f;
              f++
            )
              (g = h[f]),
                g
                  ? "string" != typeof g
                    ? "function" == typeof g.each &&
                      g[0] &&
                      g[0].nodeType &&
                      g[0].style
                      ? (h.splice(f--, 1), (this._targets = h = h.concat(B(g))))
                      : ((this._siblings[f] = L(g, this, !1)),
                        1 === e &&
                          this._siblings[f].length > 1 &&
                          M(g, this, null, 1, this._siblings[f]))
                    : ((g = h[f--] = z.selector(g)),
                      "string" == typeof g && h.splice(f + 1, 1))
                  : h.splice(f--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = L(a, this, !1)),
              1 === e &&
                this._siblings.length > 1 &&
                M(a, this, null, 1, this._siblings);
          (this.vars.immediateRender ||
            (0 === b &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            this.render(-this._delay, !1, !0);
        },
        !0
      ),
      A = function (a) {
        return (
          "function" == typeof a.each && a[0] && a[0].nodeType && a[0].style
        );
      },
      B = function (a) {
        var b = [];
        return (
          a.each(function () {
            b.push(this);
          }),
          b
        );
      },
      C = function (a, b) {
        var d,
          c = {};
        for (d in a)
          H[d] ||
            (d in b &&
              "x" !== d &&
              "y" !== d &&
              "width" !== d &&
              "height" !== d &&
              "className" !== d) ||
            !(!E[d] || (E[d] && E[d]._autoCSS)) ||
            ((c[d] = a[d]), delete a[d]);
        a.css = c;
      };
    (h = z.prototype = new x()),
      (h.constructor = z),
      (h.kill()._gc = !1),
      (h.ratio = 0),
      (h._firstPT = h._targets = h._overwrittenProps = h._startAt = null),
      (h._notifyPluginsOfEnabled = !1),
      (z.version = "1.9.2"),
      (z.defaultEase = h._ease = new q(null, null, 1, 1)),
      (z.defaultOverwrite = "auto"),
      (z.ticker = i),
      (z.autoSleep = !0),
      (z.selector =
        a.$ ||
        a.jQuery ||
        function (b) {
          return a.$
            ? ((z.selector = a.$), a.$(b))
            : a.document
            ? a.document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
            : b;
        });
    var D = (z._internals = {}),
      E = (z._plugins = {}),
      F = (z._tweenLookup = {}),
      G = 0,
      H = (D.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        orientToBezier: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
      }),
      I = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      J = (x._rootFramesTimeline = new y()),
      K = (x._rootTimeline = new y());
    (K._startTime = i.time),
      (J._startTime = i.frame),
      (K._active = J._active = !0),
      (x._updateRoot = function () {
        if (
          (K.render((i.time - K._startTime) * K._timeScale, !1, !1),
          J.render((i.frame - J._startTime) * J._timeScale, !1, !1),
          !(i.frame % 120))
        ) {
          var a, b, c;
          for (c in F) {
            for (b = F[c].tweens, a = b.length; --a > -1; )
              b[a]._gc && b.splice(a, 1);
            0 === b.length && delete F[c];
          }
          if (
            ((c = K._first),
            (!c || c._paused) &&
              z.autoSleep &&
              !J._first &&
              1 === i._listeners.tick.length)
          ) {
            for (; c && c._paused; ) c = c._next;
            c || i.sleep();
          }
        }
      }),
      i.addEventListener("tick", x._updateRoot);
    var L = function (a, b, c) {
        var e,
          f,
          d = a._gsTweenID;
        if (
          (F[d || (a._gsTweenID = d = "t" + G++)] ||
            (F[d] = { target: a, tweens: [] }),
          b && ((e = F[d].tweens), (e[(f = e.length)] = b), c))
        )
          for (; --f > -1; ) e[f] === b && e.splice(f, 1);
        return F[d].tweens;
      },
      M = function (a, b, c, d, e) {
        var f, g, h, i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++)
            if ((h = e[f]) !== b) h._gc || (h._enabled(!1, !1) && (g = !0));
            else if (5 === d) break;
          return g;
        }
        var n,
          j = b._startTime + 1e-10,
          k = [],
          l = 0,
          m = 0 === b._duration;
        for (f = e.length; --f > -1; )
          (h = e[f]) === b ||
            h._gc ||
            h._paused ||
            (h._timeline !== b._timeline
              ? ((n = n || N(b, 0, m)), 0 === N(h, n, m) && (k[l++] = h))
              : j >= h._startTime &&
                h._startTime + h.totalDuration() / h._timeScale + 1e-10 > j &&
                (((m || !h._initted) && 2e-10 >= j - h._startTime) ||
                  (k[l++] = h)));
        for (f = l; --f > -1; )
          (h = k[f]),
            2 === d && h._kill(c, a) && (g = !0),
            (2 !== d || (!h._firstPT && h._initted)) &&
              h._enabled(!1, !1) &&
              (g = !0);
        return g;
      },
      N = function (a, b, c) {
        for (
          var d = a._timeline, e = d._timeScale, f = a._startTime;
          d._timeline;

        ) {
          if (((f += d._startTime), (e *= d._timeScale), d._paused))
            return -100;
          d = d._timeline;
        }
        return (
          (f /= e),
          f > b
            ? f - b
            : (c && f === b) || (!a._initted && 2e-10 > f - b)
            ? 1e-10
            : (f += a.totalDuration() / a._timeScale / e) > b
            ? 0
            : f - b - 1e-10
        );
      };
    (h._init = function () {
      var e,
        f,
        g,
        a = this.vars,
        b = this._overwrittenProps,
        c = this._duration,
        d = a.ease;
      if (a.startAt) {
        if (
          ((a.startAt.overwrite = 0),
          (a.startAt.immediateRender = !0),
          (this._startAt = z.to(this.target, 0, a.startAt)),
          a.immediateRender &&
            ((this._startAt = null), 0 === this._time && 0 !== c))
        )
          return;
      } else if (a.runBackwards && a.immediateRender && 0 !== c)
        if (this._startAt) this._startAt.render(-1, !0), (this._startAt = null);
        else if (0 === this._time)
          return (
            (a.overwrite = a.delay = 0),
            (a.runBackwards = !1),
            (this._startAt = z.to(this.target, 0, a)),
            (a.overwrite = this._overwrite),
            (a.runBackwards = !0),
            (a.delay = this._delay),
            void 0
          );
      if (
        ((this._ease = d
          ? d instanceof q
            ? a.easeParams instanceof Array
              ? d.config.apply(d, a.easeParams)
              : d
            : "function" == typeof d
            ? new q(d, a.easeParams)
            : r[d] || z.defaultEase
          : z.defaultEase),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (e = this._targets.length; --e > -1; )
          this._initProps(
            this._targets[e],
            (this._propLookup[e] = {}),
            this._siblings[e],
            b ? b[e] : null
          ) && (f = !0);
      else
        f = this._initProps(this.target, this._propLookup, this._siblings, b);
      if (
        (f && z._onPluginEvent("_onInitAllProps", this),
        b &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        a.runBackwards)
      )
        for (g = this._firstPT; g; ) (g.s += g.c), (g.c = -g.c), (g = g._next);
      (this._onUpdate = a.onUpdate), (this._initted = !0);
    }),
      (h._initProps = function (a, b, c, d) {
        var e, f, g, h, i, j, k;
        if (null == a) return !1;
        this.vars.css ||
          (a.style &&
            a.nodeType &&
            E.css &&
            this.vars.autoCSS !== !1 &&
            C(this.vars, a));
        for (e in this.vars) {
          if (H[e]) {
            if (
              ("onStartParams" === e ||
                "onUpdateParams" === e ||
                "onCompleteParams" === e ||
                "onReverseCompleteParams" === e ||
                "onRepeatParams" === e) &&
              (i = this.vars[e])
            )
              for (f = i.length; --f > -1; )
                "{self}" === i[f] &&
                  ((i = this.vars[e] = i.concat()), (i[f] = this));
          } else if (
            E[e] &&
            (h = new E[e]())._onInitTween(a, this.vars[e], this)
          ) {
            for (
              this._firstPT = j =
                {
                  _next: this._firstPT,
                  t: h,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: !0,
                  n: e,
                  pg: !0,
                  pr: h._priority,
                },
                f = h._overwriteProps.length;
              --f > -1;

            )
              b[h._overwriteProps[f]] = this._firstPT;
            (h._priority || h._onInitAllProps) && (g = !0),
              (h._onDisable || h._onEnable) &&
                (this._notifyPluginsOfEnabled = !0);
          } else
            (this._firstPT =
              b[e] =
              j =
                {
                  _next: this._firstPT,
                  t: a,
                  p: e,
                  f: "function" == typeof a[e],
                  n: e,
                  pg: !1,
                  pr: 0,
                }),
              (j.s = j.f
                ? a[
                    e.indexOf("set") ||
                    "function" != typeof a["get" + e.substr(3)]
                      ? e
                      : "get" + e.substr(3)
                  ]()
                : parseFloat(a[e])),
              (k = this.vars[e]),
              (j.c =
                "string" == typeof k && "=" === k.charAt(1)
                  ? parseInt(k.charAt(0) + "1", 10) * Number(k.substr(2))
                  : Number(k) - j.s || 0);
          j && j._next && (j._next._prev = j);
        }
        return d && this._kill(d, a)
          ? this._initProps(a, b, c, d)
          : this._overwrite > 1 &&
            this._firstPT &&
            c.length > 1 &&
            M(a, this, b, this._overwrite, c)
          ? (this._kill(b, a), this._initProps(a, b, c, d))
          : g;
      }),
      (h.render = function (a, b, c) {
        var e,
          f,
          g,
          d = this._time;
        if (a >= this._duration)
          (this._totalTime = this._time = this._duration),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || ((e = !0), (f = "onComplete")),
            0 === this._duration &&
              ((0 === a || 0 > this._rawPrevTime) &&
                this._rawPrevTime !== a &&
                (c = !0),
              (this._rawPrevTime = a));
        else if (1e-7 > a)
          (this._totalTime = this._time = 0),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
            (0 !== d || (0 === this._duration && this._rawPrevTime > 0)) &&
              ((f = "onReverseComplete"), (e = this._reversed)),
            0 > a
              ? ((this._active = !1),
                0 === this._duration &&
                  (this._rawPrevTime >= 0 && (c = !0), (this._rawPrevTime = a)))
              : this._initted || (c = !0);
        else if (((this._totalTime = this._time = a), this._easeType)) {
          var h = a / this._duration,
            i = this._easeType,
            j = this._easePower;
          (1 === i || (3 === i && h >= 0.5)) && (h = 1 - h),
            3 === i && (h *= 2),
            1 === j
              ? (h *= h)
              : 2 === j
              ? (h *= h * h)
              : 3 === j
              ? (h *= h * h * h)
              : 4 === j && (h *= h * h * h * h),
            (this.ratio =
              1 === i
                ? 1 - h
                : 2 === i
                ? h
                : 0.5 > a / this._duration
                ? h / 2
                : 1 - h / 2);
        } else this.ratio = this._ease.getRatio(a / this._duration);
        if (this._time !== d || c) {
          if (!this._initted) {
            if ((this._init(), !this._initted)) return;
            this._time && !e
              ? (this.ratio = this._ease.getRatio(this._time / this._duration))
              : e &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._active || this._paused || (this._active = !0),
              0 === d &&
                (this._startAt &&
                  (a >= 0
                    ? this._startAt.render(a, b, c)
                    : f || (f = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._time || 0 === this._duration) &&
                  (b ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || p
                    ))),
              g = this._firstPT;
            g;

          )
            g.f
              ? g.t[g.p](g.c * this.ratio + g.s)
              : (g.t[g.p] = g.c * this.ratio + g.s),
              (g = g._next);
          this._onUpdate &&
            (0 > a && this._startAt && this._startAt.render(a, b, c),
            b ||
              this._onUpdate.apply(
                this.vars.onUpdateScope || this,
                this.vars.onUpdateParams || p
              )),
            f &&
              (this._gc ||
                (0 > a &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startAt.render(a, b, c),
                e &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !b &&
                  this.vars[f] &&
                  this.vars[f].apply(
                    this.vars[f + "Scope"] || this,
                    this.vars[f + "Params"] || p
                  )));
        }
      }),
      (h._kill = function (a, b) {
        if (
          ("all" === a && (a = null),
          null == a && (null == b || b === this.target))
        )
          return this._enabled(!1, !1);
        b =
          "string" != typeof b
            ? b || this._targets || this.target
            : z.selector(b) || b;
        var c, d, e, f, g, h, i, j;
        if ((b instanceof Array || A(b)) && "number" != typeof b[0])
          for (c = b.length; --c > -1; ) this._kill(a, b[c]) && (h = !0);
        else {
          if (this._targets) {
            for (c = this._targets.length; --c > -1; )
              if (b === this._targets[c]) {
                (g = this._propLookup[c] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (d = this._overwrittenProps[c] =
                    a ? this._overwrittenProps[c] || {} : "all");
                break;
              }
          } else {
            if (b !== this.target) return !1;
            (g = this._propLookup),
              (d = this._overwrittenProps =
                a ? this._overwrittenProps || {} : "all");
          }
          if (g) {
            (i = a || g),
              (j =
                a !== d &&
                "all" !== d &&
                a !== g &&
                (null == a || a._tempKill !== !0));
            for (e in i)
              (f = g[e]) &&
                (f.pg && f.t._kill(i) && (h = !0),
                (f.pg && 0 !== f.t._overwriteProps.length) ||
                  (f._prev
                    ? (f._prev._next = f._next)
                    : f === this._firstPT && (this._firstPT = f._next),
                  f._next && (f._next._prev = f._prev),
                  (f._next = f._prev = null)),
                delete g[e]),
                j && (d[e] = 1);
            this._firstPT || this._enabled(!1, !1);
          }
        }
        return h;
      }),
      (h.invalidate = function () {
        return (
          this._notifyPluginsOfEnabled && z._onPluginEvent("_onDisable", this),
          (this._firstPT = null),
          (this._overwrittenProps = null),
          (this._onUpdate = null),
          (this._startAt = null),
          (this._initted = this._active = this._notifyPluginsOfEnabled = !1),
          (this._propLookup = this._targets ? {} : []),
          this
        );
      }),
      (h._enabled = function (a, b) {
        if ((j || i.wake(), a && this._gc)) {
          var d,
            c = this._targets;
          if (c)
            for (d = c.length; --d > -1; )
              this._siblings[d] = L(c[d], this, !0);
          else this._siblings = L(this.target, this, !0);
        }
        return (
          x.prototype._enabled.call(this, a, b),
          this._notifyPluginsOfEnabled && this._firstPT
            ? z._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
            : !1
        );
      }),
      (z.to = function (a, b, c) {
        return new z(a, b, c);
      }),
      (z.from = function (a, b, c) {
        return (
          (c.runBackwards = !0),
          (c.immediateRender = 0 != c.immediateRender),
          new z(a, b, c)
        );
      }),
      (z.fromTo = function (a, b, c, d) {
        return (
          (d.startAt = c),
          (d.immediateRender =
            0 != d.immediateRender && 0 != c.immediateRender),
          new z(a, b, d)
        );
      }),
      (z.delayedCall = function (a, b, c, d, e) {
        return new z(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          onCompleteScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          onReverseCompleteScope: d,
          immediateRender: !1,
          useFrames: e,
          overwrite: 0,
        });
      }),
      (z.set = function (a, b) {
        return new z(a, 0, b);
      }),
      (z.killTweensOf = z.killDelayedCallsTo =
        function (a, b) {
          for (var c = z.getTweensOf(a), d = c.length; --d > -1; )
            c[d]._kill(b, a);
        }),
      (z.getTweensOf = function (a) {
        if (null != a) {
          a = "string" != typeof a ? a : z.selector(a) || a;
          var b, c, d, e;
          if ((a instanceof Array || A(a)) && "number" != typeof a[0]) {
            for (b = a.length, c = []; --b > -1; )
              c = c.concat(z.getTweensOf(a[b]));
            for (b = c.length; --b > -1; )
              for (e = c[b], d = b; --d > -1; ) e === c[d] && c.splice(b, 1);
          } else
            for (c = L(a).concat(), b = c.length; --b > -1; )
              c[b]._gc && c.splice(b, 1);
          return c;
        }
      });
    var O = n(
      "plugins.TweenPlugin",
      function (a, b) {
        (this._overwriteProps = (a || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = b || 0),
          (this._super = O.prototype);
      },
      !0
    );
    if (
      ((h = O.prototype),
      (O.version = "1.9.1"),
      (O.API = 2),
      (h._firstPT = null),
      (h._addTween = function (a, b, c, d, e, f) {
        var g, h;
        null != d &&
          (g =
            "number" == typeof d || "=" !== d.charAt(1)
              ? Number(d) - c
              : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2))) &&
          ((this._firstPT = h =
            {
              _next: this._firstPT,
              t: a,
              p: b,
              s: c,
              c: g,
              f: "function" == typeof a[b],
              n: e || b,
              r: f,
            }),
          h._next && (h._next._prev = h));
      }),
      (h.setRatio = function (a) {
        for (var d, b = this._firstPT, c = 1e-6; b; )
          (d = b.c * a + b.s),
            b.r
              ? (d = (d + (d > 0 ? 0.5 : -0.5)) >> 0)
              : c > d && d > -c && (d = 0),
            b.f ? b.t[b.p](d) : (b.t[b.p] = d),
            (b = b._next);
      }),
      (h._kill = function (a) {
        var d,
          b = this._overwriteProps,
          c = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else for (d = b.length; --d > -1; ) null != a[b[d]] && b.splice(d, 1);
        for (; c; )
          null != a[c.n] &&
            (c._next && (c._next._prev = c._prev),
            c._prev
              ? ((c._prev._next = c._next), (c._prev = null))
              : this._firstPT === c && (this._firstPT = c._next)),
            (c = c._next);
        return !1;
      }),
      (h._roundProps = function (a, b) {
        for (var c = this._firstPT; c; )
          (a[this._propName] ||
            (null != c.n && a[c.n.split(this._propName + "_").join("")])) &&
            (c.r = b),
            (c = c._next);
      }),
      (z._onPluginEvent = function (a, b) {
        var d,
          e,
          f,
          g,
          h,
          c = b._firstPT;
        if ("_onInitAllProps" === a) {
          for (; c; ) {
            for (h = c._next, e = f; e && e.pr > c.pr; ) e = e._next;
            (c._prev = e ? e._prev : g) ? (c._prev._next = c) : (f = c),
              (c._next = e) ? (e._prev = c) : (g = c),
              (c = h);
          }
          c = b._firstPT = f;
        }
        for (; c; )
          c.pg && "function" == typeof c.t[a] && c.t[a]() && (d = !0),
            (c = c._next);
        return d;
      }),
      (O.activate = function (a) {
        for (var b = a.length; --b > -1; )
          a[b].API === O.API && (E[new a[b]()._propName] = a[b]);
        return !0;
      }),
      (m.plugin = function (a) {
        if (!(a && a.propName && a.init && a.API))
          throw "illegal plugin definition.";
        var h,
          b = a.propName,
          c = a.priority || 0,
          d = a.overwriteProps,
          e = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_roundProps",
            initAll: "_onInitAllProps",
          },
          f = n(
            "plugins." + b.charAt(0).toUpperCase() + b.substr(1) + "Plugin",
            function () {
              O.call(this, b, c), (this._overwriteProps = d || []);
            },
            a.global === !0
          ),
          g = (f.prototype = new O(b));
        (g.constructor = f), (f.API = a.API);
        for (h in e) "function" == typeof a[h] && (g[e[h]] = a[h]);
        return (f.version = a.version), O.activate([f]), f;
      }),
      (f = a._gsQueue))
    ) {
      for (g = 0; f.length > g; g++) f[g]();
      for (h in k)
        k[h].func ||
          a.console.log(
            "GSAP encountered missing dependency: com.greensock." + h
          );
    }
    j = !1;
  })(window);
