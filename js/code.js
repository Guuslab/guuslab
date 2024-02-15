var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Lab = function (o) {
        var u = /\blang(?:uage)?-([\w-]+)\b/i,
            t = 0,
            e = {},
            j = {
                manual: o.Lab && o.Lab.manual,
                disableWorkerMessageHandler: o.Lab && o.Lab.disableWorkerMessageHandler,
                util: {
                    encode: function e(t) {
                        return t instanceof C ? new C(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function n(e, a) {
                        var r, t;
                        switch (a = a || {}, j.util.type(e)) {
                            case "Object":
                                if (t = j.util.objId(e), a[t]) return a[t];
                                for (var s in r = {}, a[t] = r, e) e.hasOwnProperty(s) && (r[s] = n(e[s], a));
                                return r;
                            case "Array":
                                return (t = j.util.objId(e), a[t]) ? a[t] : (r = [], a[t] = r, e.forEach(function (e, t) {
                                    r[t] = n(e, a)
                                }), r);
                            default:
                                return e
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !u.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(u) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (e) {
                            var t = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                            if (t) {
                                var n, a = document.getElementsByTagName("script");
                                for (n in a)
                                    if (a[n].src == t) return a[n]
                            }
                            return null
                        }
                    },
                    isActive: function (e, t, n) {
                        for (var a = "no-" + t; e;) {
                            var r = e.classList;
                            if (r.contains(t)) return !0;
                            if (r.contains(a)) return !1;
                            e = e.parentElement
                        }
                        return !!n
                    }
                },
                languages: {
                    plain: e,
                    plaintext: e,
                    text: e,
                    txt: e,
                    extend: function (e, t) {
                        var n, a = j.util.clone(j.languages[e]);
                        for (n in t) a[n] = t[n];
                        return a
                    },
                    insertBefore: function (n, e, t, a) {
                        var r, s = (a = a || j.languages)[n],
                            i = {};
                        for (r in s)
                            if (s.hasOwnProperty(r)) {
                                if (r == e)
                                    for (var l in t) t.hasOwnProperty(l) && (i[l] = t[l]);
                                t.hasOwnProperty(r) || (i[r] = s[r])
                            } var o = a[n];
                        return a[n] = i, j.languages.DFS(j.languages, function (e, t) {
                            t === o && e != n && (this[e] = i)
                        }), i
                    },
                    DFS: function e(t, n, a, r) {
                        r = r || {};
                        var s, i, l, o = j.util.objId;
                        for (s in t) t.hasOwnProperty(s) && (n.call(t, s, t[s], a || s), i = t[s], "Object" !== (l = j.util.type(i)) || r[o(i)] ? "Array" !== l || r[o(i)] || (r[o(i)] = !0, e(i, n, s, r)) : (r[o(i)] = !0, e(i, n, null, r)))
                    }
                },
                plugins: {},
                highlightAll: function (e, t) {
                    j.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function (e, t, n) {
                    var a = {
                        callback: n,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    j.hooks.run("before-highlightall", a), a.elements = Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)), j.hooks.run("before-all-elements-highlight", a);
                    for (var r, s = 0; r = a.elements[s++];) j.highlightElement(r, !0 === t, a.callback)
                },
                highlightElement: function (e, t, n) {
                    var a = j.util.getLanguage(e),
                        r = j.languages[a];
                    e.className = e.className.replace(u, "").replace(/\s+/g, " ") + " language-" + a;
                    var s = e.parentElement;
                    s && "pre" === s.nodeName.toLowerCase() && (s.className = s.className.replace(u, "").replace(/\s+/g, " ") + " language-" + a);
                    var i = {
                        element: e,
                        language: a,
                        grammar: r,
                        code: e.textContent
                    };

                    function l(e) {
                        i.highlightedCode = e, j.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, j.hooks.run("after-highlight", i), j.hooks.run("complete", i), n && n.call(i.element)
                    }
                    if (j.hooks.run("before-sanity-check", i), (s = i.element.parentElement) && "pre" === s.nodeName.toLowerCase() && !s.hasAttribute("tabindex") && s.setAttribute("tabindex", "0"), !i.code) return j.hooks.run("complete", i), void (n && n.call(i.element));
                    j.hooks.run("before-highlight", i), i.grammar ? t && o.Worker ? ((t = new Worker(j.filename)).onmessage = function (e) {
                        l(e.data)
                    }, t.postMessage(JSON.stringify({
                        language: i.language,
                        code: i.code,
                        immediateClose: !0
                    }))) : l(j.highlight(i.code, i.grammar, i.language)) : l(j.util.encode(i.code))
                },
                highlight: function (e, t, n) {
                    n = {
                        code: e,
                        grammar: t,
                        language: n
                    };
                    return j.hooks.run("before-tokenize", n), n.tokens = j.tokenize(n.code, n.grammar), j.hooks.run("after-tokenize", n), C.stringify(j.util.encode(n.tokens), n.language)
                },
                tokenize: function (e, t) {
                    var n = t.rest;
                    if (n) {
                        for (var a in n) t[a] = n[a];
                        delete t.rest
                    }
                    var r = new s;
                    return z(r, r.head, e),
                        function e(t, n, a, r, s, i) {
                            for (var l in a)
                                if (a.hasOwnProperty(l) && a[l]) {
                                    var o = a[l];
                                    o = Array.isArray(o) ? o : [o];
                                    for (var u = 0; u < o.length; ++u) {
                                        if (i && i.cause == l + "," + u) return;
                                        var c, g = o[u],
                                            d = g.inside,
                                            p = !!g.lookbehind,
                                            m = !!g.greedy,
                                            h = g.alias;
                                        m && !g.pattern.global && (c = g.pattern.toString().match(/[imsuy]*$/)[0], g.pattern = RegExp(g.pattern.source, c + "g"));
                                        for (var f = g.pattern || g, b = r.next, y = s; b !== n.tail && !(i && y >= i.reach); y += b.value.length, b = b.next) {
                                            var v = b.value;
                                            if (n.length > t.length) return;
                                            if (!(v instanceof C)) {
                                                var F, k = 1;
                                                if (m) {
                                                    if (!(F = O(f, y, t, p))) break;
                                                    var x = F.index,
                                                        w = F.index + F[0].length,
                                                        P = y;
                                                    for (P += b.value.length; P <= x;) b = b.next, P += b.value.length;
                                                    if (P -= b.value.length, y = P, b.value instanceof C) continue;
                                                    for (var A = b; A !== n.tail && (P < w || "string" == typeof A.value); A = A.next) k++, P += A.value.length;
                                                    k--, v = t.slice(y, P), F.index -= y
                                                } else if (!(F = O(f, 0, v, p))) continue;
                                                var x = F.index,
                                                    $ = F[0],
                                                    S = v.slice(0, x),
                                                    E = v.slice(x + $.length),
                                                    _ = y + v.length;
                                                i && _ > i.reach && (i.reach = _);
                                                v = b.prev;
                                                S && (v = z(n, v, S), y += S.length), T(n, v, k);
                                                $ = new C(l, d ? j.tokenize($, d) : $, h, $);
                                                b = z(n, v, $), E && z(n, b, E), 1 < k && (_ = {
                                                    cause: l + "," + u,
                                                    reach: _
                                                }, e(t, n, a, b.prev, y, _), i && _.reach > i.reach && (i.reach = _.reach))
                                            }
                                        }
                                    }
                                }
                        }(e, r, t, r.head, 0),
                        function (e) {
                            var t = [],
                                n = e.head.next;
                            for (; n !== e.tail;) t.push(n.value), n = n.next;
                            return t
                        }(r)
                },
                hooks: {
                    all: {},
                    add: function (e, t) {
                        var n = j.hooks.all;
                        n[e] = n[e] || [], n[e].push(t)
                    },
                    run: function (e, t) {
                        var n = j.hooks.all[e];
                        if (n && n.length)
                            for (var a, r = 0; a = n[r++];) a(t)
                    }
                },
                Token: C
            };

        function C(e, t, n, a) {
            this.type = e, this.content = t, this.alias = n, this.length = 0 | (a || "").length
        }

        function O(e, t, n, a) {
            e.lastIndex = t;
            n = e.exec(n);
            return n && a && n[1] && (a = n[1].length, n.index += a, n[0] = n[0].slice(a)), n
        }

        function s() {
            var e = {
                value: null,
                prev: null,
                next: null
            },
                t = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = t, this.head = e, this.tail = t, this.length = 0
        }

        function z(e, t, n) {
            var a = t.next,
                n = {
                    value: n,
                    prev: t,
                    next: a
                };
            return t.next = n, a.prev = n, e.length++, n
        }

        function T(e, t, n) {
            for (var a = t.next, r = 0; r < n && a !== e.tail; r++) a = a.next;
            (t.next = a).prev = t, e.length -= r
        }
        if (o.Lab = j, C.stringify = function t(e, n) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e)) {
                var a = "";
                return e.forEach(function (e) {
                    a += t(e, n)
                }), a
            }
            var r = {
                type: e.type,
                content: t(e.content, n),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: n
            },
                e = e.alias;
            e && (Array.isArray(e) ? Array.prototype.push.apply(r.classes, e) : r.classes.push(e)), j.hooks.run("wrap", r);
            var s, i = "";
            for (s in r.attributes) i += " " + s + '="' + (r.attributes[s] || "").replace(/"/g, "&quot;") + '"';
            return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + i + ">" + r.content + "</" + r.tag + ">"
        }, !o.document) return o.addEventListener && (j.disableWorkerMessageHandler || o.addEventListener("message", function (e) {
            var t = JSON.parse(e.data),
                n = t.language,
                e = t.code,
                t = t.immediateClose;
            o.postMessage(j.highlight(e, j.languages[n], n)), t && o.close()
        }, !1)), j;
        var n = j.util.currentScript();

        function a() {
            j.manual || j.highlightAll()
        }
        return n && (j.filename = n.src, n.hasAttribute("data-manual") && (j.manual = !0)), j.manual || ("loading" === (e = document.readyState) || "interactive" === e && n && n.defer ? document.addEventListener("DOMContentLoaded", a) : window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.setTimeout(a, 16)), j
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Lab), "undefined" != typeof global && (global.Lab = Lab), Lab.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/,
            name: /[^\s<>'"]+/
        }
    },
    cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, /"|'/]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
}, Lab.languages.markup.tag.inside["attr-value"].inside.entity = Lab.languages.markup.entity, Lab.languages.markup.doctype.inside["internal-subset"].inside = Lab.languages.markup, Lab.hooks.add("wrap", function (e) {
    "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Lab.languages.markup.tag, "addInlined", {
    value: function (e, t) {
        var n = {};
        n["language-" + t] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Lab.languages[t]
        }, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
        n = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: n
            }
        };
        n["language-" + t] = {
            pattern: /[\s\S]+/,
            inside: Lab.languages[t]
        };
        t = {};
        t[e] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
                return e
            }), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, Lab.languages.insertBefore("markup", "cdata", t)
    }
}), Object.defineProperty(Lab.languages.markup.tag, "addAttribute", {
    value: function (e, t) {
        Lab.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(/(^|["'\s])/.source + "(?:" + e + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
            lookbehind: !0,
            inside: {
                "attr-name": /^[^\s=]+/,
                "attr-value": {
                    pattern: /=[\s\S]+/,
                    inside: {
                        value: {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: !0,
                            alias: [t, "language-" + t],
                            inside: Lab.languages[t]
                        },
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, /"|'/]
                    }
                }
            }
        })
    }
}), Lab.languages.html = Lab.languages.markup, Lab.languages.mathml = Lab.languages.markup, Lab.languages.svg = Lab.languages.markup, Lab.languages.xml = Lab.languages.extend("markup", {}), Lab.languages.ssml = Lab.languages.xml, Lab.languages.atom = Lab.languages.xml, Lab.languages.rss = Lab.languages.xml,
    function (e) {
        var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: {
                pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
                lookbehind: !0
            },
            string: {
                pattern: t,
                greedy: !0
            },
            property: {
                pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                lookbehind: !0
            },
            important: /!important\b/i,
            function: {
                pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                lookbehind: !0
            },
            punctuation: /[(){};:,]/
        }, e.languages.css.atrule.inside.rest = e.languages.css;
        e = e.languages.markup;
        e && (e.tag.addInlined("style", "css"), e.tag.addAttribute("style", "css"))
    }(Lab), Lab.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "class-name": {
            pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    }, Lab.languages.javascript = Lab.languages.extend("clike", {
        "class-name": [Lab.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Lab.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Lab.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Lab.languages.regex
                },
                "regex-delimiter": /^\/|\/$/,
                "regex-flags": /^[a-z]+$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Lab.languages.javascript
        }, {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: Lab.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Lab.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Lab.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Lab.languages.insertBefore("javascript", "string", {
        hashbang: {
            pattern: /^#!.*/,
            greedy: !0,
            alias: "comment"
        },
        "template-string": {
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\$\{|\}$/,
                            alias: "punctuation"
                        },
                        rest: Lab.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        }
    }), Lab.languages.markup && (Lab.languages.markup.tag.addInlined("script", "javascript"), Lab.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript")), Lab.languages.js = Lab.languages.javascript,
    function () {
        var i, l, o, u, a, e;

        function c(e, t) {
            var n = (n = e.className).replace(a, " ") + " language-" + t;
            e.className = n.replace(/\s+/g, " ").trim()
        }
        void 0 !== Lab && "undefined" != typeof document && (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), i = {
            js: "javascript",
            py: "python",
            rb: "ruby",
            ps1: "powershell",
            psm1: "powershell",
            sh: "bash",
            bat: "batch",
            h: "c",
            tex: "latex"
        }, u = "pre[data-src]:not([" + (l = "data-src-status") + '="loaded"]):not([' + l + '="' + (o = "loading") + '"])', a = /\blang(?:uage)?-([\w-]+)\b/i, Lab.hooks.add("before-highlightall", function (e) {
            e.selector += ", " + u
        }), Lab.hooks.add("before-sanity-check", function (e) {
            var t, n, a, r, s = e.element;
            s.matches(u) && (e.code = "", s.setAttribute(l, o), (t = s.appendChild(document.createElement("CODE"))).textContent = "Loading…", n = s.getAttribute("data-src"), "none" === (e = e.language) && (a = (/\.(\w+)$/.exec(n) || [, "none"])[1], e = i[a] || a), c(t, e), c(s, e), (a = Lab.plugins.autoloader) && a.loadLanguages(e), (r = new XMLHttpRequest).open("GET", n, !0), r.onreadystatechange = function () {
                4 == r.readyState && (r.status < 400 && r.responseText ? (s.setAttribute(l, "loaded"), t.textContent = r.responseText, Lab.highlightElement(t)) : (s.setAttribute(l, "failed"), 400 <= r.status ? t.textContent = "✖ Error " + r.status + " while fetching file: " + r.statusText : t.textContent = "✖ Error: File does not exist or is empty"))
            }, r.send(null))
        }), e = !(Lab.plugins.fileHighlight = {
            highlight: function (e) {
                for (var t, n = (e || document).querySelectorAll(u), a = 0; t = n[a++];) Lab.highlightElement(t)
            }
        }), Lab.fileHighlight = function () {
            e || (console.warn("Lab.fileHighlight is deprecated. Use `Lab.plugins.fileHighlight.highlight` instead."), e = !0), Lab.plugins.fileHighlight.highlight.apply(this, arguments)
        })
    }();