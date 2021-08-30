/* PrismJS 1.24.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+c+css-extras+diff+git+json+markup-templating+php+powershell+scss&plugins=line-highlight+line-numbers+autolinker+file-highlight+highlight-keywords+inline-color+command-line+data-uri-highlight+toolbar+copy-to-clipboard+diff-highlight+treeview */
var _self =
		"undefined" != typeof window
			? window
			: "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
			? self
			: {},
	Prism = (function (u) {
		var c = /\blang(?:uage)?-([\w-]+)\b/i,
			n = 0,
			e = {},
			M = {
				manual: u.Prism && u.Prism.manual,
				disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
				util: {
					encode: function e(n) {
						return n instanceof W
							? new W(n.type, e(n.content), n.alias)
							: Array.isArray(n)
							? n.map(e)
							: n
									.replace(/&/g, "&amp;")
									.replace(/</g, "&lt;")
									.replace(/\u00a0/g, " ");
					},
					type: function (e) {
						return Object.prototype.toStrincall(e).slice(8, -1);
					},
					objId: function (e) {
						return e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id;
					},
					clone: function t(e, r) {
						var a, n;
						switch (((r = r || {}), M.util.type(e))) {
							case "Object":
								if (((n = M.util.objId(e)), r[n])) return r[n];
								for (var i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
								return a;
							case "Array":
								return (
									(n = M.util.objId(e)),
									r[n]
										? r[n]
										: ((a = []),
										  (r[n] = a),
										  e.forEach(function (e, n) {
												a[n] = t(e, r);
										  }),
										  a)
								);
							default:
								return e;
						}
					},
					getLanguage: function (e) {
						for (; e && !c.test(e.className); ) e = e.parentElement;
						return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none";
					},
					currentScript: function () {
						if ("undefined" == typeof document) return null;
						if ("currentScript" in document) return document.currentScript;
						try {
							throw new Error();
						} catch (e) {
							var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
							if (n) {
								var t = document.getElementsByTagName("script");
								for (var r in t) if (t[r].src == n) return t[r];
							}
							return null;
						}
					},
					isActive: function (e, n, t) {
						for (var r = "no-" + n; e; ) {
							var a = e.classList;
							if (a.contains(n)) return !0;
							if (a.contains(r)) return !1;
							e = e.parentElement;
						}
						return !!t;
					},
				},
				languages: {
					plain: e,
					plaintext: e,
					text: e,
					txt: e,
					extend: function (e, n) {
						var t = M.util.clone(M.languages[e]);
						for (var r in n) t[r] = n[r];
						return t;
					},
					insertBefore: function (t, e, n, r) {
						var a = (r = r || M.languages)[t],
							i = {};
						for (var l in a)
							if (a.hasOwnProperty(l)) {
								if (l == e) for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
								n.hasOwnProperty(l) || (i[l] = a[l]);
							}
						var s = r[t];
						return (
							(r[t] = i),
							M.languages.DFS(M.languages, function (e, n) {
								n === s && e != t && (this[e] = i);
							}),
							i
						);
					},
					DFS: function e(n, t, r, a) {
						a = a || {};
						var i = M.util.objId;
						for (var l in n)
							if (n.hasOwnProperty(l)) {
								t.call(n, l, n[l], r || l);
								var o = n[l],
									s = M.util.type(o);
								"Object" !== s || a[i(o)]
									? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
									: ((a[i(o)] = !0), e(o, t, null, a));
							}
					},
				},
				plugins: {},
				highlightAll: function (e, n) {
					M.highlightAllUnder(document, e, n);
				},
				highlightAllUnder: function (e, n, t) {
					var r = {
						callback: t,
						container: e,
						selector:
							'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
					};
					M.hooks.run("before-highlightall", r),
						(r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
						M.hooks.run("before-all-elements-highlight", r);
					for (var a, i = 0; (a = r.elements[i++]); ) M.highlightElement(a, !0 === n, r.callback);
				},
				highlightElement: function (e, n, t) {
					var r = M.util.getLanguage(e),
						a = M.languages[r];
					e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
					var i = e.parentElement;
					i &&
						"pre" === i.nodeName.toLowerCase() &&
						(i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
					var l = { element: e, language: r, grammar: a, code: e.textContent };
					function o(e) {
						(l.highlightedCode = e),
							M.hooks.run("before-insert", l),
							(l.element.innerHTML = l.highlightedCode),
							M.hooks.run("after-highlight", l),
							M.hooks.run("complete", l),
							t && t.call(l.element);
					}
					if (
						(M.hooks.run("before-sanity-check", l),
						(i = l.element.parentElement) &&
							"pre" === i.nodeName.toLowerCase() &&
							!i.hasAttribute("tabindex") &&
							i.setAttribute("tabindex", "0"),
						!l.code)
					)
						return M.hooks.run("complete", l), void (t && t.call(l.element));
					if ((M.hooks.run("before-highlight", l), l.grammar))
						if (n && u.Worker) {
							var s = new Worker(M.filename);
							(s.onmessage = function (e) {
								o(e.data);
							}),
								s.postMessage(
									JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 })
								);
						} else o(M.highlight(l.code, l.grammar, l.language));
					else o(M.util.encode(l.code));
				},
				highlight: function (e, n, t) {
					var r = { code: e, grammar: n, language: t };
					return (
						M.hooks.run("before-tokenize", r),
						(r.tokens = M.tokenize(r.code, r.grammar)),
						M.hooks.run("after-tokenize", r),
						W.stringify(M.util.encode(r.tokens), r.language)
					);
				},
				tokenize: function (e, n) {
					var t = n.rest;
					if (t) {
						for (var r in t) n[r] = t[r];
						delete n.rest;
					}
					var a = new i();
					return (
						I(a, a.head, e),
						(function e(n, t, r, a, i, l) {
							for (var o in r)
								if (r.hasOwnProperty(o) && r[o]) {
									var s = r[o];
									s = Array.isArray(s) ? s : [s];
									for (var u = 0; u < s.length; ++u) {
										if (l && l.cause == o + "," + u) return;
										var c = s[u],
											g = c.inside,
											f = !!c.lookbehind,
											h = !!c.greedy,
											d = c.alias;
										if (h && !c.pattern.global) {
											var p = c.pattern.toString().match(/[imsuy]*$/)[0];
											c.pattern = RegExp(c.pattern.source, p + "g");
										}
										for (
											var v = c.pattern || c, m = a.next, y = i;
											m !== t.tail && !(l && y >= l.reach);
											y += m.value.length, m = m.next
										) {
											var b = m.value;
											if (t.length > n.length) return;
											if (!(b instanceof W)) {
												var k,
													x = 1;
												if (h) {
													if (!(k = z(v, y, n, f))) break;
													var w = k.index,
														A = k.index + k[0].length,
														P = y;
													for (P += m.value.length; P <= w; ) (m = m.next), (P += m.value.length);
													if (((P -= m.value.length), (y = P), m.value instanceof W)) continue;
													for (
														var E = m;
														E !== t.tail && (P < A || "string" == typeof E.value);
														E = E.next
													)
														x++, (P += E.value.length);
													x--, (b = n.slice(y, P)), (k.index -= y);
												} else if (!(k = z(v, 0, b, f))) continue;
												var w = k.index,
													S = k[0],
													O = b.slice(0, w),
													L = b.slice(w + S.length),
													N = y + b.length;
												l && N > l.reach && (l.reach = N);
												var j = m.prev;
												O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
												var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
												if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
													var _ = { cause: o + "," + u, reach: N };
													e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach);
												}
											}
										}
									}
								}
						})(e, a, n, a.head, 0),
						(function (e) {
							var n = [],
								t = e.head.next;
							for (; t !== e.tail; ) n.push(t.value), (t = t.next);
							return n;
						})(a)
					);
				},
				hooks: {
					all: {},
					add: function (e, n) {
						var t = M.hooks.all;
						(t[e] = t[e] || []), t[e].push(n);
					},
					run: function (e, n) {
						var t = M.hooks.all[e];
						if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
					},
				},
				Token: W,
			};
		function W(e, n, t, r) {
			(this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || "").length);
		}
		function z(e, n, t, r) {
			e.lastIndex = n;
			var a = e.exec(t);
			if (a && r && a[1]) {
				var i = a[1].length;
				(a.index += i), (a[0] = a[0].slice(i));
			}
			return a;
		}
		function i() {
			var e = { value: null, prev: null, next: null },
				n = { value: null, prev: e, next: null };
			(e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
		}
		function I(e, n, t) {
			var r = n.next,
				a = { value: t, prev: n, next: r };
			return (n.next = a), (r.prev = a), e.length++, a;
		}
		function q(e, n, t) {
			for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
			((n.next = r).prev = n), (e.length -= a);
		}
		if (
			((u.Prism = M),
			(W.stringify = function n(e, t) {
				if ("string" == typeof e) return e;
				if (Array.isArray(e)) {
					var r = "";
					return (
						e.forEach(function (e) {
							r += n(e, t);
						}),
						r
					);
				}
				var a = {
						type: e.type,
						content: n(e.content, t),
						tag: "span",
						classes: ["token", e.type],
						attributes: {},
						language: t,
					},
					i = e.alias;
				i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)),
					M.hooks.run("wrap", a);
				var l = "";
				for (var o in a.attributes)
					l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
				return (
					"<" +
					a.tag +
					' class="' +
					a.classes.join(" ") +
					'"' +
					l +
					">" +
					a.content +
					"</" +
					a.tag +
					">"
				);
			}),
			!u.document)
		)
			return (
				u.addEventListener &&
					(M.disableWorkerMessageHandler ||
						u.addEventListener(
							"message",
							function (e) {
								var n = JSON.parse(e.data),
									t = n.language,
									r = n.code,
									a = n.immediateClose;
								u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close();
							},
							!1
						)),
				M
			);
		var t = M.util.currentScript();
		function r() {
			M.manual || M.highlightAll();
		}
		if (
			(t && ((M.filename = t.src), t.hasAttribute("data-manual") && (M.manual = !0)), !M.manual)
		) {
			var a = document.readyState;
			"loading" === a || ("interactive" === a && t && t.defer)
				? document.addEventListener("DOMContentLoaded", r)
				: window.requestAnimationFrame
				? window.requestAnimationFrame(r)
				: window.setTimeout(r, 16);
		}
		return M;
	})(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
	"undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
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
				inside: null,
			},
			string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
			punctuation: /^<!|>$|[[\]]/,
			"doctype-tag": /^DOCTYPE/,
			name: /[^\s<>'"]+/,
		},
	},
	cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i,
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/,
				inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
			},
			"special-attr": [],
			"attr-value": {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] },
			},
			punctuation: /\/?>/,
			"attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
		},
	},
	entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i],
}),
	(Prism.languages.markup.tainside["attr-value"].inside.entity = Prism.languages.markup.entity),
	(Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup),
	Prism.hooks.add("wrap", function (a) {
		"entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
	}),
	Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
		value: function (a, e) {
			var s = {};
			(s["language-" + e] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: !0,
				inside: Prism.languages[e],
			}),
				(s.cdata = /^<!\[CDATA\[|\]\]>$/i);
			var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
			t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
			var n = {};
			(n[a] = {
				pattern: RegExp(
					"(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
						/__/g,
						function () {
							return a;
						}
					),
					"i"
				),
				lookbehind: !0,
				greedy: !0,
				inside: t,
			}),
				Prism.languages.insertBefore("markup", "cdata", n);
		},
	}),
	Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
		value: function (a, e) {
			Prism.languages.markup.tainside["special-attr"].push({
				pattern: RegExp(
					"(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
					"i"
				),
				lookbehind: !0,
				inside: {
					"attr-name": /^[^\s=]+/,
					"attr-value": {
						pattern: /=[\s\S]+/,
						inside: {
							value: {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: !0,
								alias: [e, "language-" + e],
								inside: Prism.languages[e],
							},
							punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
						},
					},
				},
			});
		},
	}),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup),
	(Prism.languages.xml = Prism.languages.extend("markup", {})),
	(Prism.languages.ssml = Prism.languages.xml),
	(Prism.languages.atom = Prism.languages.xml),
	(Prism.languages.rss = Prism.languages.xml);
!(function (s) {
	var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	(s.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				rule: /^@[\w-]+/,
				"selector-function-argument": {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: !0,
					alias: "selector",
				},
				keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
			},
		},
		url: {
			pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
			greedy: !0,
			inside: {
				function: /^url/i,
				punctuation: /^\(|\)$/,
				string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
			},
		},
		selector: {
			pattern: RegExp(
				"(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"
			),
			lookbehind: !0,
		},
		string: { pattern: e, greedy: !0 },
		property: {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: !0,
		},
		important: /!important\b/i,
		function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
		punctuation: /[(){};:,]/,
	}),
		(s.languages.css.atrule.inside.rest = s.languages.css);
	var t = s.languages.markup;
	t && (t.taaddInlined("style", "css"), t.taaddAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
	],
	string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
	"class-name": {
		pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ },
	},
	keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(?:true|false)\b/,
	function: /\b\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
	"class-name": [
		Prism.languages.clike["class-name"],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
			lookbehind: !0,
		},
	],
	keyword: [
		{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: !0,
		},
	],
	function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
	(Prism.languages.javascript[
		"class-name"
	][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
	Prism.languages.insertBefore("javascript", "keyword", {
		regex: {
			pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
			lookbehind: !0,
			greedy: !0,
			inside: {
				"regex-source": {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: !0,
					alias: "language-regex",
					inside: Prism.languages.regex,
				},
				"regex-delimiter": /^\/|\/$/,
				"regex-flags": /^[a-z]+$/,
			},
		},
		"function-variable": {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: "function",
		},
		parameter: [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
	}),
	Prism.languages.insertBefore("javascript", "string", {
		hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
		"template-string": {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: !0,
			inside: {
				"template-punctuation": { pattern: /^`|`$/, alias: "string" },
				interpolation: {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: !0,
					inside: {
						"interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" },
						rest: Prism.languages.javascript,
					},
				},
				string: /[\s\S]+/,
			},
		},
	}),
	Prism.languages.markup &&
		(Prism.languages.markup.taaddInlined("script", "javascript"),
		Prism.languages.markup.taaddAttribute(
			"on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
			"javascript"
		)),
	(Prism.languages.js = Prism.languages.javascript);
!(function (e) {
	var t =
			"\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
		n = {
			pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
			lookbehind: !0,
			alias: "punctuation",
			inside: null,
		},
		a = {
			bash: n,
			environment: { pattern: RegExp("\\$" + t), alias: "constant" },
			variable: [
				{
					pattern: /\$?\(\([\s\S]+?\)\)/,
					greedy: !0,
					inside: {
						variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
						number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
						operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
						punctuation: /\(\(?|\)\)?|,|;/,
					},
				},
				{
					pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
					greedy: !0,
					inside: { variable: /^\$\(|^`|\)$|`$/ },
				},
				{
					pattern: /\$\{[^}]+\}/,
					greedy: !0,
					inside: {
						operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
						punctuation: /[\[\]]/,
						environment: { pattern: RegExp("(\\{)" + t), lookbehind: !0, alias: "constant" },
					},
				},
				/\$(?:\w+|[#?*!@$])/,
			],
			entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
		};
	(e.languages.bash = {
		shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
		comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
		"function-name": [
			{
				pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: !0,
				alias: "function",
			},
			{ pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
		],
		"for-or-select": {
			pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
			alias: "variable",
			lookbehind: !0,
		},
		"assign-left": {
			pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
			inside: {
				environment: {
					pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
					lookbehind: !0,
					alias: "constant",
				},
			},
			alias: "variable",
			lookbehind: !0,
		},
		string: [
			{
				pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
				lookbehind: !0,
				greedy: !0,
				inside: a,
			},
			{
				pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
				lookbehind: !0,
				greedy: !0,
				inside: { bash: n },
			},
			{
				pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
				lookbehind: !0,
				greedy: !0,
				inside: a,
			},
			{ pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
			{ pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: !0, inside: { entity: a.entity } },
		],
		environment: { pattern: RegExp("\\$?" + t), alias: "constant" },
		variable: a.variable,
		function: {
			pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
			lookbehind: !0,
		},
		keyword: {
			pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
			lookbehind: !0,
		},
		builtin: {
			pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
			lookbehind: !0,
			alias: "class-name",
		},
		boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/, lookbehind: !0 },
		"file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
		operator: {
			pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
			inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } },
		},
		punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
		number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
	}),
		(n.inside = e.languages.bash);
	for (
		var s = [
				"comment",
				"function-name",
				"for-or-select",
				"assign-left",
				"string",
				"environment",
				"function",
				"keyword",
				"builtin",
				"boolean",
				"file-descriptor",
				"operator",
				"punctuation",
				"number",
			],
			i = a.variable[1].inside,
			o = 0;
		o < s.length;
		o++
	)
		i[s[o]] = e.languages.bash[s[o]];
	e.languages.shell = e.languages.bash;
})(Prism);
(Prism.languages.c = Prism.languages.extend("clike", {
	comment: {
		pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: !0,
	},
	"class-name": {
		pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
		lookbehind: !0,
	},
	keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
	function: /\b[a-z_]\w*(?=\s*\()/i,
	number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
	operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
	Prism.languages.insertBefore("c", "string", {
		macro: {
			pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
			lookbehind: !0,
			greedy: !0,
			alias: "property",
			inside: {
				string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string],
				comment: Prism.languages.c.comment,
				"macro-name": [
					{ pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
					{ pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: "function" },
				],
				directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: "keyword" },
				"directive-hash": /^#/,
				punctuation: /##|\\(?=[\r\n])/,
				expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
			},
		},
		constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
	}),
	delete Prism.languages.c.boolean;
!(function (e) {
	var a,
		n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
	(e.languages.css.selector = {
		pattern: e.languages.css.selector.pattern,
		lookbehind: !0,
		inside: (a = {
			"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			"pseudo-class": /:[-\w]+/,
			class: /\.[-\w]+/,
			id: /#[-\w]+/,
			attribute: {
				pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
				greedy: !0,
				inside: {
					punctuation: /^\[|\]$/,
					"case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" },
					namespace: {
						pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
						lookbehind: !0,
						inside: { punctuation: /\|$/ },
					},
					"attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
					"attr-value": [
						n,
						{ pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 },
					],
					operator: /[|~*^$]?=/,
				},
			},
			"n-th": [
				{
					pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
					lookbehind: !0,
					inside: { number: /[\dn]+/, operator: /[+-]/ },
				},
				{ pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
			],
			combinator: />|\+|~|\|\|/,
			punctuation: /[(),]/,
		}),
	}),
		(e.languages.css.atrule.inside["selector-function-argument"].inside = a),
		e.languages.insertBefore("css", "property", {
			variable: {
				pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
				lookbehind: !0,
			},
		});
	var r = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 },
		i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
	e.languages.insertBefore("css", "function", {
		operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
		hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" },
		color: [
			/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
			{
				pattern: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
				inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
			},
		],
		entity: /\\[\da-f]{1,8}/i,
		unit: r,
		number: i,
	});
})(Prism);
!(function (i) {
	i.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m] };
	var r = {
		"deleted-sign": "-",
		"deleted-arrow": "<",
		"inserted-sign": "+",
		"inserted-arrow": ">",
		unchanged: " ",
		diff: "!",
	};
	Object.keys(r).forEach(function (e) {
		var n = r[e],
			a = [];
		/^\w+$/.test(e) || a.push(/\w+/.exec(e)[0]),
			"diff" === e && a.push("bold"),
			(i.languages.diff[e] = {
				pattern: RegExp("^(?:[" + n + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
				alias: a,
				inside: {
					line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
					prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(e)[0] },
				},
			});
	}),
		Object.defineProperty(i.languages.diff, "PREFIXES", { value: r });
})(Prism);
Prism.languages.git = {
	comment: /^#.*/m,
	deleted: /^[-–].*/m,
	inserted: /^\+.*/m,
	string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
	command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
	coord: /^@@.*@@$/m,
	"commit-sha1": /^commit \w{40}$/m,
};
(Prism.languages.json = {
	property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
	string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
	comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
	number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	punctuation: /[{}[\],]/,
	operator: /:/,
	boolean: /\b(?:true|false)\b/,
	null: { pattern: /\bnull\b/, alias: "keyword" },
}),
	(Prism.languages.webmanifest = Prism.languages.json);
!(function (h) {
	function v(e, n) {
		return "___" + e.toUpperCase() + n + "___";
	}
	Object.defineProperties((h.languages["markup-templating"] = {}), {
		buildPlaceholders: {
			value: function (a, r, e, o) {
				if (a.language === r) {
					var c = (a.tokenStack = []);
					(a.code = a.code.replace(e, function (e) {
						if ("function" == typeof o && !o(e)) return e;
						for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); ) ++t;
						return (c[t] = e), n;
					})),
						(a.grammar = h.languages.markup);
				}
			},
		},
		tokenizePlaceholders: {
			value: function (p, k) {
				if (p.language === k && p.tokenStack) {
					p.grammar = h.languages[k];
					var m = 0,
						d = Object.keys(p.tokenStack);
					!(function e(n) {
						for (var t = 0; t < n.length && !(m >= d.length); t++) {
							var a = n[t];
							if ("string" == typeof a || (a.content && "string" == typeof a.content)) {
								var r = d[m],
									o = p.tokenStack[r],
									c = "string" == typeof a ? a : a.content,
									i = v(k, r),
									u = c.indexOf(i);
								if (-1 < u) {
									++m;
									var g = c.substring(0, u),
										l = new h.Token(k, h.tokenize(o, p.grammar), "language-" + k, o),
										s = c.substring(u + i.length),
										f = [];
									g && f.push.apply(f, e([g])),
										f.push(l),
										s && f.push.apply(f, e([s])),
										"string" == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : (a.content = f);
								}
							} else a.content && e(a.content);
						}
						return n;
					})(p.tokens);
				}
			},
		},
	});
})(Prism);
!(function (a) {
	var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
		t = [
			{ pattern: /\b(?:false|true)\b/i, alias: "boolean" },
			{ pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 },
			{ pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i, greedy: !0, lookbehind: !0 },
			/\b(?:null)\b/i,
			/\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
		],
		i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
		s = /[{}\[\](),:;]/;
	a.languages.php = {
		delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
		comment: e,
		variable: /\$+(?:\w+\b|(?=\{))/i,
		package: {
			pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
			lookbehind: !0,
			inside: { punctuation: /\\/ },
		},
		"class-name-definition": {
			pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
			lookbehind: !0,
			alias: "class-name",
		},
		"function-definition": {
			pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
			lookbehind: !0,
			alias: "function",
		},
		keyword: [
			{
				pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
				alias: "type-casting",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
				alias: "type-hint",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /([(,?]\s*[\w|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
				alias: "type-hint",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
				alias: "return-type",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?[\w|]\|\s*)(?:null|false)\b/i,
				alias: "return-type",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
				alias: "type-declaration",
				greedy: !0,
			},
			{
				pattern: /(\|\s*)(?:null|false)\b/i,
				alias: "type-declaration",
				greedy: !0,
				lookbehind: !0,
			},
			{ pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: "static-context", greedy: !0 },
			{ pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
			/\bclass\b/i,
			{
				pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
				lookbehind: !0,
			},
		],
		"argument-name": { pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i, lookbehind: !0 },
		"class-name": [
			{
				pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
				greedy: !0,
				lookbehind: !0,
			},
			{ pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
			{ pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
			{
				pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
				alias: "class-name-fully-qualified",
				greedy: !0,
				lookbehind: !0,
				inside: { punctuation: /\\/ },
			},
			{
				pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
				alias: "class-name-fully-qualified",
				greedy: !0,
				inside: { punctuation: /\\/ },
			},
			{
				pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
				alias: "class-name-fully-qualified",
				greedy: !0,
				lookbehind: !0,
				inside: { punctuation: /\\/ },
			},
			{ pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: "type-declaration", greedy: !0 },
			{
				pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
				alias: ["class-name-fully-qualified", "type-declaration"],
				greedy: !0,
				inside: { punctuation: /\\/ },
			},
			{ pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: "static-context", greedy: !0 },
			{
				pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
				alias: ["class-name-fully-qualified", "static-context"],
				greedy: !0,
				inside: { punctuation: /\\/ },
			},
			{ pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: "type-hint", greedy: !0, lookbehind: !0 },
			{
				pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
				alias: ["class-name-fully-qualified", "type-hint"],
				greedy: !0,
				lookbehind: !0,
				inside: { punctuation: /\\/ },
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
				alias: "return-type",
				greedy: !0,
				lookbehind: !0,
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
				alias: ["class-name-fully-qualified", "return-type"],
				greedy: !0,
				lookbehind: !0,
				inside: { punctuation: /\\/ },
			},
		],
		constant: t,
		function: {
			pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
			lookbehind: !0,
			inside: { punctuation: /\\/ },
		},
		property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
		number: i,
		operator: n,
		punctuation: s,
	};
	var l = {
			pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
			lookbehind: !0,
			inside: a.languages.php,
		},
		r = [
			{
				pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
				alias: "nowdoc-string",
				greedy: !0,
				inside: {
					delimiter: {
						pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
						alias: "symbol",
						inside: { punctuation: /^<<<'?|[';]$/ },
					},
				},
			},
			{
				pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
				alias: "heredoc-string",
				greedy: !0,
				inside: {
					delimiter: {
						pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
						alias: "symbol",
						inside: { punctuation: /^<<<"?|[";]$/ },
					},
					interpolation: l,
				},
			},
			{ pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: "backtick-quoted-string", greedy: !0 },
			{ pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: "single-quoted-string", greedy: !0 },
			{
				pattern: /"(?:\\[\s\S]|[^\\"])*"/,
				alias: "double-quoted-string",
				greedy: !0,
				inside: { interpolation: l },
			},
		];
	a.languages.insertBefore("php", "variable", {
		string: r,
		attribute: {
			pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
			greedy: !0,
			inside: {
				"attribute-content": {
					pattern: /^(#\[)[\s\S]+(?=\]$)/,
					lookbehind: !0,
					inside: {
						comment: e,
						string: r,
						"attribute-class-name": [
							{
								pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
								alias: "class-name",
								greedy: !0,
								lookbehind: !0,
							},
							{
								pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
								alias: ["class-name", "class-name-fully-qualified"],
								greedy: !0,
								lookbehind: !0,
								inside: { punctuation: /\\/ },
							},
						],
						constant: t,
						number: i,
						operator: n,
						punctuation: s,
					},
				},
				delimiter: { pattern: /^#\[|\]$/, alias: "punctuation" },
			},
		},
	}),
		a.hooks.add("before-tokenize", function (e) {
			if (/<\?/.test(e.code)) {
				a.languages["markup-templating"].buildPlaceholders(
					e,
					"php",
					/<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
				);
			}
		}),
		a.hooks.add("after-tokenize", function (e) {
			a.languages["markup-templating"].tokenizePlaceholders(e, "php");
		});
})(Prism);
!(function (e) {
	var i = (Prism.languages.powershell = {
			comment: [
				{ pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
				{ pattern: /(^|[^`])#.*/, lookbehind: !0 },
			],
			string: [
				{
					pattern: /"(?:`[\s\S]|[^`"])*"/,
					greedy: !0,
					inside: {
						function: {
							pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
							lookbehind: !0,
							inside: {},
						},
					},
				},
				{ pattern: /'(?:[^']|'')*'/, greedy: !0 },
			],
			namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
			boolean: /\$(?:true|false)\b/i,
			variable: /\$\w+\b/,
			function: [
				/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
				/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
			],
			keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
			operator: {
				pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
				lookbehind: !0,
			},
			punctuation: /[|{}[\];(),.]/,
		}),
		r = i.string[0].inside;
	(r.boolean = i.boolean), (r.variable = i.variable), (r.function.inside = i);
})();
(Prism.languages.scss = Prism.languages.extend("css", {
	comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
	atrule: {
		pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
		inside: { rule: /@[\w-]+/ },
	},
	url: /(?:[-a-z]+-)?url(?=\()/i,
	selector: {
		pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,
		inside: {
			parent: { pattern: /&/, alias: "important" },
			placeholder: /%[-\w]+/,
			variable: /\$[-\w]+|#\{\$[-\w]+\}/,
		},
	},
	property: {
		pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
		inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
	},
})),
	Prism.languages.insertBefore("scss", "atrule", {
		keyword: [
			/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
			{ pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
		],
	}),
	Prism.languages.insertBefore("scss", "important", { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
	Prism.languages.insertBefore("scss", "function", {
		"module-modifier": { pattern: /\b(?:as|with|show|hide)\b/i, alias: "keyword" },
		placeholder: { pattern: /%[-\w]+/, alias: "selector" },
		statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
		boolean: /\b(?:true|false)\b/,
		null: { pattern: /\bnull\b/, alias: "keyword" },
		operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0 },
	}),
	(Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document && document.querySelector) {
		var t,
			o = "line-numbers",
			s = "linkable-line-numbers",
			a = function () {
				if (void 0 === t) {
					var e = document.createElement("div");
					(e.style.fontSize = "13px"),
						(e.style.lineHeight = "1.5"),
						(e.style.padding = "0"),
						(e.style.border = "0"),
						(e.innerHTML = "&nbsp;<br />&nbsp;"),
						document.body.appendChild(e),
						(t = 38 === e.offsetHeight),
						document.body.removeChild(e);
				}
				return t;
			},
			l = !0,
			u = 0;
		Prism.hooks.add("before-sanity-check", function (e) {
			var t = e.element.parentElement;
			if (c(t)) {
				var n = 0;
				v(".line-highlight", t).forEach(function (e) {
					(n += e.textContent.length), e.parentNode.removeChild(e);
				}),
					n && /^(?: \n)+$/.test(e.code.slice(-n)) && (e.code = e.code.slice(0, -n));
			}
		}),
			Prism.hooks.add("complete", function e(t) {
				var n = t.element.parentElement;
				if (c(n)) {
					clearTimeout(u);
					var i = Prism.plugins.lineNumbers,
						r = t.plugins && t.plugins.lineNumbers;
					if (b(n, o) && i && !r) Prism.hooks.add("line-numbers", e);
					else d(n)(), (u = setTimeout(f, 1));
				}
			}),
			window.addEventListener("hashchange", f),
			window.addEventListener("resize", function () {
				v("pre")
					.filter(c)
					.map(function (e) {
						return d(e);
					})
					.forEach(y);
			});
	}
	function v(e, t) {
		return Array.prototype.slice.call((t || document).querySelectorAll(e));
	}
	function b(e, t) {
		return e.classList.contains(t);
	}
	function y(e) {
		e();
	}
	function c(e) {
		return (
			!(!e || !/pre/i.test(e.nodeName)) &&
			(!!e.hasAttribute("data-line") || !(!e.id || !Prism.util.isActive(e, s)))
		);
	}
	function d(u, e, c) {
		var t = (e = "string" == typeof e ? e : u.getAttribute("data-line") || "")
				.replace(/\s+/g, "")
				.split(",")
				.filter(Boolean),
			d = +u.getAttribute("data-line-offset") || 0,
			f = (a() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
			p = Prism.util.isActive(u, o),
			n = u.querySelector("code"),
			h = p ? u : n || u,
			m = [],
			g =
				n && h != n
					? (function (e, t) {
							var n = getComputedStyle(e),
								i = getComputedStyle(t);
							function r(e) {
								return +e.substr(0, e.length - 2);
							}
							return t.offsetTop + r(i.borderTopWidth) + r(i.paddingTop) - r(n.paddingTop);
					  })(u, n)
					: 0;
		t.forEach(function (e) {
			var t = e.split("-"),
				n = +t[0],
				i = +t[1] || n,
				r =
					u.querySelector('.line-highlight[data-range="' + e + '"]') ||
					document.createElement("div");
			if (
				(m.push(function () {
					r.setAttribute("aria-hidden", "true"),
						r.setAttribute("data-range", e),
						(r.className = (c || "") + " line-highlight");
				}),
				p && Prism.plugins.lineNumbers)
			) {
				var o = Prism.plugins.lineNumbers.getLine(u, n),
					s = Prism.plugins.lineNumbers.getLine(u, i);
				if (o) {
					var a = o.offsetTop + g + "px";
					m.push(function () {
						r.style.top = a;
					});
				}
				if (s) {
					var l = s.offsetTop - o.offsetTop + s.offsetHeight + "px";
					m.push(function () {
						r.style.height = l;
					});
				}
			} else
				m.push(function () {
					r.setAttribute("data-start", String(n)),
						n < i && r.setAttribute("data-end", String(i)),
						(r.style.top = (n - d - 1) * f + g + "px"),
						(r.textContent = new Array(i - n + 2).join(" \n"));
				});
			m.push(function () {
				h.appendChild(r);
			});
		});
		var i = u.id;
		if (p && Prism.util.isActive(u, s) && i) {
			b(u, s) ||
				m.push(function () {
					u.classList.add(s);
				});
			var r = parseInt(u.getAttribute("data-start") || "1");
			v(".line-numbers-rows > span", u).forEach(function (e, t) {
				var n = t + r;
				e.onclick = function () {
					var e = i + "." + n;
					(l = !1),
						(location.hash = e),
						setTimeout(function () {
							l = !0;
						}, 1);
				};
			});
		}
		return function () {
			m.forEach(y);
		};
	}
	function f() {
		var e = location.hash.slice(1);
		v(".temporary.line-highlight").forEach(function (e) {
			e.parentNode.removeChild(e);
		});
		var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
		if (t && !document.getElementById(e)) {
			var n = e.slice(0, e.lastIndexOf(".")),
				i = document.getElementById(n);
			if (i)
				i.hasAttribute("data-line") || i.setAttribute("data-line", ""),
					d(i, t, "temporary ")(),
					l && document.querySelector(".temporary.line-highlight").scrollIntoView();
		}
	}
})();
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document) {
		var o = "line-numbers",
			a = /\n(?!$)/g,
			e = (Prism.plugins.lineNumbers = {
				getLine: function (e, n) {
					if ("PRE" === e.tagName && e.classList.contains(o)) {
						var t = e.querySelector(".line-numbers-rows");
						if (t) {
							var i = parseInt(e.getAttribute("data-start"), 10) || 1,
								r = i + (t.children.length - 1);
							n < i && (n = i), r < n && (n = r);
							var s = n - i;
							return t.children[s];
						}
					}
				},
				resize: function (e) {
					u([e]);
				},
				assumeViewportIndependence: !0,
			}),
			n = void 0;
		window.addEventListener("resize", function () {
			(e.assumeViewportIndependence && n === window.innerWidth) ||
				((n = window.innerWidth),
				u(Array.prototype.slice.call(document.querySelectorAll("pre." + o))));
		}),
			Prism.hooks.add("complete", function (e) {
				if (e.code) {
					var n = e.element,
						t = n.parentNode;
					if (
						t &&
						/pre/i.test(t.nodeName) &&
						!n.querySelector(".line-numbers-rows") &&
						Prism.util.isActive(n, o)
					) {
						n.classList.remove(o), t.classList.add(o);
						var i,
							r = e.code.match(a),
							s = r ? r.length + 1 : 1,
							l = new Array(s + 1).join("<span></span>");
						(i = document.createElement("span")).setAttribute("aria-hidden", "true"),
							(i.className = "line-numbers-rows"),
							(i.innerHTML = l),
							t.hasAttribute("data-start") &&
								(t.style.counterReset =
									"linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)),
							e.element.appendChild(i),
							u([t]),
							Prism.hooks.run("line-numbers", e);
					}
				}
			}),
			Prism.hooks.add("line-numbers", function (e) {
				(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
			});
	}
	function u(e) {
		if (
			0 !=
			(e = e.filter(function (e) {
				var n = (function (e) {
					return e
						? window.getComputedStyle
							? getComputedStyle(e)
							: e.currentStyle || null
						: null;
				})(e)["white-space"];
				return "pre-wrap" === n || "pre-line" === n;
			})).length
		) {
			var n = e
				.map(function (e) {
					var n = e.querySelector("code"),
						t = e.querySelector(".line-numbers-rows");
					if (n && t) {
						var i = e.querySelector(".line-numbers-sizer"),
							r = n.textContent.split(a);
						i ||
							(((i = document.createElement("span")).className = "line-numbers-sizer"),
							n.appendChild(i)),
							(i.innerHTML = "0"),
							(i.style.display = "block");
						var s = i.getBoundingClientRect().height;
						return (
							(i.innerHTML = ""),
							{ element: e, lines: r, lineHeights: [], oneLinerHeight: s, sizer: i }
						);
					}
				})
				.filter(Boolean);
			n.forEach(function (e) {
				var i = e.sizer,
					n = e.lines,
					r = e.lineHeights,
					s = e.oneLinerHeight;
				(r[n.length - 1] = void 0),
					n.forEach(function (e, n) {
						if (e && 1 < e.length) {
							var t = i.appendChild(document.createElement("span"));
							(t.style.display = "block"), (t.textContent = e);
						} else r[n] = s;
					});
			}),
				n.forEach(function (e) {
					for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++)
						void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height);
				}),
				n.forEach(function (e) {
					var n = e.sizer,
						t = e.element.querySelector(".line-numbers-rows");
					(n.style.display = "none"),
						(n.innerHTML = ""),
						e.lineHeights.forEach(function (e, n) {
							t.children[n].style.height = e + "px";
						});
				});
		}
	}
})();
!(function () {
	if ("undefined" != typeof Prism) {
		var e = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
			r = /\b\S+@[\w.]+[a-z]{2}/,
			a = /\[([^\]]+)\]\(([^)]+)\)/,
			l = ["comment", "url", "attr-value", "string"];
		(Prism.plugins.autolinker = {
			processGrammar: function (i) {
				i &&
					!i["url-link"] &&
					(Prism.languages.DFS(i, function (i, n, t) {
						-1 < l.indexOf(t) &&
							!Array.isArray(n) &&
							(n.pattern || (n = this[i] = { pattern: n }),
							(n.inside = n.inside || {}),
							"comment" == t && (n.inside["md-link"] = a),
							"attr-value" == t
								? Prism.languages.insertBefore("inside", "punctuation", { "url-link": e }, n)
								: (n.inside["url-link"] = e),
							(n.inside["email-link"] = r));
					}),
					(i["url-link"] = e),
					(i["email-link"] = r));
			},
		}),
			Prism.hooks.add("before-highlight", function (i) {
				Prism.plugins.autolinker.processGrammar(i.grammar);
			}),
			Prism.hooks.add("wrap", function (i) {
				if (/-link$/.test(i.type)) {
					i.tag = "a";
					var n = i.content;
					if ("email-link" == i.type && 0 != n.indexOf("mailto:")) n = "mailto:" + n;
					else if ("md-link" == i.type) {
						var t = i.content.match(a);
						(n = t[2]), (i.content = t[1]);
					}
					i.attributes.href = n;
					try {
						i.content = decodeURIComponent(i.content);
					} catch (i) {}
				}
			});
	}
})();
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document) {
		Element.prototype.matches ||
			(Element.prototype.matches =
				Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
		var o = {
				js: "javascript",
				py: "python",
				rb: "ruby",
				ps1: "powershell",
				psm1: "powershell",
				sh: "bash",
				bat: "batch",
				h: "c",
				tex: "latex",
			},
			h = "data-src-status",
			g = "loading",
			c = "loaded",
			u = "pre[data-src]:not([" + h + '="' + c + '"]):not([' + h + '="' + g + '"])',
			n = /\blang(?:uage)?-([\w-]+)\b/i;
		Prism.hooks.add("before-highlightall", function (e) {
			e.selector += ", " + u;
		}),
			Prism.hooks.add("before-sanity-check", function (e) {
				var t = e.element;
				if (t.matches(u)) {
					(e.code = ""), t.setAttribute(h, g);
					var i = t.appendChild(document.createElement("CODE"));
					i.textContent = "Loading…";
					var n = t.getAttribute("data-src"),
						s = e.language;
					if ("none" === s) {
						var a = (/\.(\w+)$/.exec(n) || [, "none"])[1];
						s = o[a] || a;
					}
					p(i, s), p(t, s);
					var r = Prism.plugins.autoloader;
					r && r.loadLanguages(s);
					var l = new XMLHttpRequest();
					l.open("GET", n, !0),
						(l.onreadystatechange = function () {
							4 == l.readyState &&
								(l.status < 400 && l.responseText
									? (t.setAttribute(h, c),
									  (i.textContent = l.responseText),
									  Prism.highlightElement(i))
									: (t.setAttribute(h, "failed"),
									  400 <= l.status
											? (i.textContent = (function (e, t) {
													return "✖ Error " + e + " while fetching file: " + t;
											  })(l.status, l.statusText))
											: (i.textContent = "✖ Error: File does not exist or is empty")));
						}),
						l.send(null);
				}
			});
		var e = !(Prism.plugins.fileHighlight = {
			highlight: function (e) {
				for (var t, i = (e || document).querySelectorAll(u), n = 0; (t = i[n++]); )
					Prism.highlightElement(t);
			},
		});
		Prism.fileHighlight = function () {
			e ||
				(console.warn(
					"Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."
				),
				(e = !0)),
				Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};
	}
	function p(e, t) {
		var i = e.className;
		(i = i.replace(n, " ") + " language-" + t), (e.className = i.replace(/\s+/g, " ").trim());
	}
})();
"undefined" != typeof Prism &&
	Prism.hooks.add("wrap", function (e) {
		"keyword" === e.type && e.classes.push("keyword-" + e.content);
	});
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document) {
		var a = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
			c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
			l = [
				function (n) {
					var r = c.exec(n);
					if (r) {
						for (
							var o = 6 <= (n = r[1]).length ? 2 : 1,
								s = n.length / o,
								e = 1 == o ? 1 / 15 : 1 / 255,
								t = [],
								i = 0;
							i < s;
							i++
						) {
							var a = parseInt(n.substr(i * o, o), 16);
							t.push(a * e);
						}
						return (
							3 == s && t.push(1),
							"rgba(" +
								t
									.slice(0, 3)
									.map(function (n) {
										return String(Math.round(255 * n));
									})
									.join(",") +
								"," +
								String(Number(t[3].toFixed(3))) +
								")"
						);
					}
				},
				function (n) {
					var r = new Option().style;
					return (r.color = n), r.color ? n : void 0;
				},
			];
		Prism.hooks.add("wrap", function (n) {
			if ("color" === n.type || 0 <= n.classes.indexOf("color")) {
				for (var r, o = n.content, s = o.split(a).join(""), e = 0, t = l.length; e < t && !r; e++)
					r = l[e](s);
				if (!r) return;
				var i =
					'<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
					r +
					';"></span></span>';
				n.content = i + o;
			}
		});
	}
})();
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document) {
		var d = /(?:^|\s)command-line(?:\s|$)/,
			f = "command-line-prompt",
			m = "".startsWith
				? function (e, t) {
						return e.startsWith(t);
				  }
				: function (e, t) {
						return 0 === e.indexOf(t);
				  };
		Prism.hooks.add("before-highlight", function (e) {
			var t = h(e);
			if (!t.complete && e.code) {
				var n = e.element.parentElement;
				if (n && /pre/i.test(n.nodeName) && (d.test(n.className) || d.test(e.element.className))) {
					var a = e.element.querySelector("." + f);
					a && a.remove();
					var s = e.code.split("\n");
					t.numberOfLines = s.length;
					var o = (t.outputLines = []),
						r = n.getAttribute("data-output"),
						i = n.getAttribute("data-filter-output");
					if (null !== r)
						r.split(",").forEach(function (e) {
							var t = e.split("-"),
								n = parseInt(t[0], 10),
								a = 2 === t.length ? parseInt(t[1], 10) : n;
							if (!isNaN(n) && !isNaN(a)) {
								n < 1 && (n = 1), a > s.length && (a = s.length), a--;
								for (var r = --n; r <= a; r++) (o[r] = s[r]), (s[r] = "");
							}
						});
					else if (i)
						for (var l = 0; l < s.length; l++)
							m(s[l], i) && ((o[l] = s[l].slice(i.length)), (s[l] = ""));
					e.code = s.join("\n");
				} else t.complete = !0;
			} else t.complete = !0;
		}),
			Prism.hooks.add("before-insert", function (e) {
				var t = h(e);
				if (!t.complete) {
					for (
						var n = e.highlightedCode.split("\n"), a = t.outputLines || [], r = 0, s = a.length;
						r < s;
						r++
					)
						a.hasOwnProperty(r) && (n[r] = a[r]);
					e.highlightedCode = n.join("\n");
				}
			}),
			Prism.hooks.add("complete", function (e) {
				if (
					(function (e) {
						return "command-line" in (e.vars = e.vars || {});
					})(e)
				) {
					var t = h(e);
					if (!t.complete) {
						var n,
							a = e.element.parentElement;
						d.test(e.element.className) &&
							(e.element.className = e.element.className.replace(d, " ")),
							d.test(a.className) || (a.className += " command-line");
						var r = t.numberOfLines || 0,
							s = c("data-prompt", "");
						if ("" !== s) n = p('<span data-prompt="' + s + '"></span>', r);
						else
							n = p(
								'<span data-user="' +
									c("data-user", "user") +
									'" data-host="' +
									c("data-host", "localhost") +
									'"></span>',
								r
							);
						var o = document.createElement("span");
						(o.className = f), (o.innerHTML = n);
						for (var i = t.outputLines || [], l = 0, m = i.length; l < m; l++)
							if (i.hasOwnProperty(l)) {
								var u = o.children[l];
								u.removeAttribute("data-user"),
									u.removeAttribute("data-host"),
									u.removeAttribute("data-prompt");
							}
						e.element.insertBefore(o, e.element.firstChild), (t.complete = !0);
					}
				}
				function c(e, t) {
					return (a.getAttribute(e) || t).replace(/"/g, "&quot");
				}
			});
	}
	function p(e, t) {
		for (var n = "", a = 0; a < t; a++) n += e;
		return n;
	}
	function h(e) {
		var t = (e.vars = e.vars || {});
		return (t["command-line"] = t["command-line"] || {});
	}
})();
!(function () {
	if ("undefined" != typeof Prism) {
		var e = {
				pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
				lookbehind: !0,
				inside: {
					"language-css": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/, lookbehind: !0 },
					"language-javascript": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
						lookbehind: !0,
					},
					"language-json": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/, lookbehind: !0 },
					"language-markup": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
						lookbehind: !0,
					},
				},
			},
			r = ["url", "attr-value", "string"];
		(Prism.plugins.dataURIHighlight = {
			processGrammar: function (i) {
				i &&
					!i["data-uri"] &&
					(Prism.languages.DFS(i, function (i, a, n) {
						-1 < r.indexOf(n) &&
							!Array.isArray(a) &&
							(a.pattern || (a = this[i] = { pattern: a }),
							(a.inside = a.inside || {}),
							"attr-value" == n
								? Prism.languages.insertBefore(
										"inside",
										a.inside["url-link"] ? "url-link" : "punctuation",
										{ "data-uri": e },
										a
								  )
								: a.inside["url-link"]
								? Prism.languages.insertBefore("inside", "url-link", { "data-uri": e }, a)
								: (a.inside["data-uri"] = e));
					}),
					(i["data-uri"] = e));
			},
		}),
			Prism.hooks.add("before-highlight", function (i) {
				if (e.pattern.test(i.code))
					for (var a in e.inside)
						if (
							e.inside.hasOwnProperty(a) &&
							!e.inside[a].inside &&
							e.inside[a].pattern.test(i.code)
						) {
							var n = a.match(/^language-(.+)/)[1];
							Prism.languages[n] &&
								(e.inside[a].inside = {
									rest:
										((r = Prism.languages[n]),
										Prism.plugins.autolinker && Prism.plugins.autolinker.processGrammar(r),
										r),
								});
						}
				var r;
				Prism.plugins.dataURIHighlight.processGrammar(i.grammar);
			});
	}
})();
!(function () {
	if ("undefined" != typeof Prism && "undefined" != typeof document) {
		var i = [],
			l = {},
			d = function () {};
		Prism.plugins.toolbar = {};
		var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
				var t;
				(t =
					"function" == typeof n
						? n
						: function (e) {
								var t;
								return (
									"function" == typeof n.onClick
										? (((t = document.createElement("button")).type = "button"),
										  t.addEventListener("click", function () {
												n.onClick.call(this, e);
										  }))
										: "string" == typeof n.url
										? ((t = document.createElement("a")).href = n.url)
										: (t = document.createElement("span")),
									n.className && t.classList.add(n.className),
									(t.textContent = n.text),
									t
								);
						  }),
					e in l
						? console.warn('There is a button with the key "' + e + '" registered already.')
						: i.push((l[e] = t));
			}),
			t = (Prism.plugins.toolbar.hook = function (a) {
				var e = a.element.parentNode;
				if (e && /pre/i.test(e.nodeName) && !e.parentNode.classList.contains("code-toolbar")) {
					var t = document.createElement("div");
					t.classList.add("code-toolbar"), e.parentNode.insertBefore(t, e), t.appendChild(e);
					var r = document.createElement("div");
					r.classList.add("toolbar");
					var n = i,
						o = (function (e) {
							for (; e; ) {
								var t = e.getAttribute("data-toolbar-order");
								if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
								e = e.parentElement;
							}
						})(a.element);
					o &&
						(n = o.map(function (e) {
							return l[e] || d;
						})),
						n.forEach(function (e) {
							var t = e(a);
							if (t) {
								var n = document.createElement("div");
								n.classList.add("toolbar-item"), n.appendChild(t), r.appendChild(n);
							}
						}),
						t.appendChild(r);
				}
			});
		e("label", function (e) {
			var t = e.element.parentNode;
			if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
				var n,
					a,
					r = t.getAttribute("data-label");
				try {
					a = document.querySelector("template#" + r);
				} catch (e) {}
				return (
					a
						? (n = a.content)
						: (t.hasAttribute("data-url")
								? ((n = document.createElement("a")).href = t.getAttribute("data-url"))
								: (n = document.createElement("span")),
						  (n.textContent = r)),
					n
				);
			}
		}),
			Prism.hooks.add("complete", t);
	}
})();
!(function () {
	function u(t, e) {
		t.addEventListener("click", function () {
			!(function (t) {
				navigator.clipboard
					? navigator.clipboard.writeText(t.getText()).then(t.success, function () {
							o(t);
					  })
					: o(t);
			})(e);
		});
	}
	function o(e) {
		var t = document.createElement("textarea");
		(t.value = e.getText()),
			(t.style.top = "0"),
			(t.style.left = "0"),
			(t.style.position = "fixed"),
			document.body.appendChild(t),
			t.focus(),
			t.select();
		try {
			var o = document.execCommand("copy");
			setTimeout(function () {
				o ? e.success() : e.error();
			}, 1);
		} catch (t) {
			setTimeout(function () {
				e.error(t);
			}, 1);
		}
		document.body.removeChild(t);
	}
	"undefined" != typeof Prism &&
		"undefined" != typeof document &&
		(Prism.plugins.toolbar
			? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
					var e = t.element,
						o = (function (t) {
							var e = {
								copy: "Copy",
								"copy-error": "Press Ctrl+C to copy",
								"copy-success": "Copied!",
								"copy-timeout": 5e3,
							};
							for (var o in e) {
								for (var n = "data-prismjs-" + o, c = t; c && !c.hasAttribute(n); )
									c = c.parentElement;
								c && (e[o] = c.getAttribute(n));
							}
							return e;
						})(e),
						n = document.createElement("button");
					(n.className = "copy-to-clipboard-button"), n.setAttribute("type", "button");
					var c = document.createElement("span");
					return (
						n.appendChild(c),
						i("copy"),
						u(n, {
							getText: function () {
								return e.textContent;
							},
							success: function () {
								i("copy-success"), r();
							},
							error: function () {
								i("copy-error"),
									setTimeout(function () {
										!(function (t) {
											window.getSelection().selectAllChildren(t);
										})(e);
									}, 1),
									r();
							},
						}),
						n
					);
					function r() {
						setTimeout(function () {
							i("copy");
						}, o["copy-timeout"]);
					}
					function i(t) {
						(c.textContent = o[t]), n.setAttribute("data-copy-state", t);
					}
			  })
			: console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."));
})();
!(function () {
	if ("undefined" != typeof Prism) {
		var m = /^diff-([\w-]+)/i,
			d = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi,
			c = RegExp(
				"(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(/__/g, function () {
					return d.source;
				}),
				"gi"
			),
			a = !1;
		Prism.hooks.add("before-sanity-check", function (e) {
			var i = e.language;
			m.test(i) && !e.grammar && (e.grammar = Prism.languages[i] = Prism.languages.diff);
		}),
			Prism.hooks.add("before-tokenize", function (e) {
				a ||
					Prism.languages.diff ||
					Prism.plugins.autoloader ||
					((a = !0),
					console.warn(
						"Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin."
					));
				var i = e.language;
				m.test(i) && !Prism.languages[i] && (Prism.languages[i] = Prism.languages.diff);
			}),
			Prism.hooks.add("wrap", function (e) {
				var i, a;
				if ("diff" !== e.language) {
					var s = m.exec(e.language);
					if (!s) return;
					(i = s[1]), (a = Prism.languages[i]);
				}
				var r = Prism.languages.diff && Prism.languages.diff.PREFIXES;
				if (r && e.type in r) {
					var n,
						g = e.content.replace(d, "").replace(/&lt;/g, "<").replace(/&amp;/g, "&"),
						f = replace(/(^|[\r\n])./g, "$1");
					n = a ? Prism.highlight(f, a, i) : Prism.util.encode(f);
					var u,
						l = new Prism.Token("prefix", r[e.type], [/\w+/.exec(e.type)[0]]),
						t = Prism.Token.stringify(l, e.language),
						o = [];
					for (c.lastIndex = 0; (u = c.exec(n)); ) o.push(t + u[0]);
					/(?:^|[\r\n]).$/.test(g) && o.push(t),
						(e.content = o.join("")),
						a && e.classes.push("language-" + i);
				}
			});
	}
})();
"undefined" != typeof Prism &&
	((Prism.languages.treeview = {
		"treeview-part": {
			pattern: /^.+/m,
			inside: {
				"entry-line": [
					{ pattern: /\|-- |├── /, alias: "line-h" },
					{ pattern: /\| {3}|│ {3}/, alias: "line-v" },
					{ pattern: /`-- |└── /, alias: "line-v-last" },
					{ pattern: / {4}/, alias: "line-v-gap" },
				],
				"entry-name": { pattern: /.*\S.*/, inside: { operator: / -> / } },
			},
		},
	}),
	Prism.hooks.add("wrap", function (e) {
		if ("treeview" === e.language && "entry-name" === e.type) {
			var t = e.classes,
				n = /(^|[^\\])\/\s*$/;
			if (n.test(e.content)) (e.content = e.content.replace(n, "$1")), t.push("dir");
			else {
				e.content = e.content.replace(/(^|[^\\])[=*|]\s*$/, "$1");
				for (var a = e.content.toLowerCase().replace(/\s+/g, "").split("."); 1 < a.length; )
					a.shift(), t.push("ext-" + a.join("-"));
			}
			"." === e.content[0] && t.push("dotfile");
		}
	}));
