(self["webpackChunk"] = self["webpackChunk"] || []).push([["holder"],{

/***/ "./node_modules/holderjs/holder.js":
/*!*****************************************!*\
  !*** ./node_modules/holderjs/holder.js ***!
  \*****************************************/
/***/ (function(module) {

/*!

Holder - client side image placeholders
Version 2.9.9+jl7z
© 2021 Ivan Malopinsky - https://imsky.co

Site:     http://holderjs.com
Issues:   https://github.com/imsky/holder/issues
License:  MIT

*/
(function (window) {
  if (!window.document) return;
  var document = window.document;

  //https://github.com/inexorabletash/polyfill/blob/master/web.js
    if (!document.querySelectorAll) {
      document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
          element = document._qsa.shift();
          element.style.removeAttribute('x-qsa');
          elements.push(element);
        }
        document._qsa = null;
        return elements;
      };
    }

    if (!document.querySelector) {
      document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return (elements.length) ? elements[0] : null;
      };
    }

    if (!document.getElementsByClassName) {
      document.getElementsByClassName = function (classNames) {
        classNames = String(classNames).replace(/^|\s+/g, '.');
        return document.querySelectorAll(classNames);
      };
    }

  //https://github.com/inexorabletash/polyfill
  // ES5 15.2.3.14 Object.keys ( O )
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = function (o) {
      if (o !== Object(o)) { throw TypeError('Object.keys called on non-object'); }
      var ret = [], p;
      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o, p)) {
          ret.push(p);
        }
      }
      return ret;
    };
  }

  // ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
  // From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /*, thisp */) {
      if (this === void 0 || this === null) { throw TypeError(); }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") { throw TypeError(); }

      var thisp = arguments[1], i;
      for (i = 0; i < len; i++) {
        if (i in t) {
          fun.call(thisp, t[i], i, t);
        }
      }
    };
  }

  //https://github.com/inexorabletash/polyfill/blob/master/web.js
  (function (global) {
    var B64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    global.atob = global.atob || function (input) {
      input = String(input);
      var position = 0,
          output = [],
          buffer = 0, bits = 0, n;

      input = input.replace(/\s/g, '');
      if ((input.length % 4) === 0) { input = input.replace(/=+$/, ''); }
      if ((input.length % 4) === 1) { throw Error('InvalidCharacterError'); }
      if (/[^+/0-9A-Za-z]/.test(input)) { throw Error('InvalidCharacterError'); }

      while (position < input.length) {
        n = B64_ALPHABET.indexOf(input.charAt(position));
        buffer = (buffer << 6) | n;
        bits += 6;

        if (bits === 24) {
          output.push(String.fromCharCode((buffer >> 16) & 0xFF));
          output.push(String.fromCharCode((buffer >>  8) & 0xFF));
          output.push(String.fromCharCode(buffer & 0xFF));
          bits = 0;
          buffer = 0;
        }
        position += 1;
      }

      if (bits === 12) {
        buffer = buffer >> 4;
        output.push(String.fromCharCode(buffer & 0xFF));
      } else if (bits === 18) {
        buffer = buffer >> 2;
        output.push(String.fromCharCode((buffer >> 8) & 0xFF));
        output.push(String.fromCharCode(buffer & 0xFF));
      }

      return output.join('');
    };

    global.btoa = global.btoa || function (input) {
      input = String(input);
      var position = 0,
          out = [],
          o1, o2, o3,
          e1, e2, e3, e4;

      if (/[^\x00-\xFF]/.test(input)) { throw Error('InvalidCharacterError'); }

      while (position < input.length) {
        o1 = input.charCodeAt(position++);
        o2 = input.charCodeAt(position++);
        o3 = input.charCodeAt(position++);

        // 111111 112222 222233 333333
        e1 = o1 >> 2;
        e2 = ((o1 & 0x3) << 4) | (o2 >> 4);
        e3 = ((o2 & 0xf) << 2) | (o3 >> 6);
        e4 = o3 & 0x3f;

        if (position === input.length + 2) {
          e3 = 64; e4 = 64;
        }
        else if (position === input.length + 1) {
          e4 = 64;
        }

        out.push(B64_ALPHABET.charAt(e1),
                 B64_ALPHABET.charAt(e2),
                 B64_ALPHABET.charAt(e3),
                 B64_ALPHABET.charAt(e4));
      }

      return out.join('');
    };
  }(window));

  //https://gist.github.com/jimeh/332357
  if (!Object.prototype.hasOwnProperty){
      /*jshint -W001, -W103 */
      Object.prototype.hasOwnProperty = function(prop) {
      var proto = this.__proto__ || this.constructor.prototype;
      return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
    };
      /*jshint +W001, +W103 */
  }

  // @license http://opensource.org/licenses/MIT
  // copyright Paul Irish 2015


  // Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
  //   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
  // as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

  // if you want values similar to what you'd get with real perf.now, place this towards the head of the page
  // but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed


  (function(){

    if ('performance' in window === false) {
        window.performance = {};
    }
    
    Date.now = (Date.now || function () {  // thanks IE8
      return new Date().getTime();
    });

    if ('now' in window.performance === false){
      
      var nowOffset = Date.now();
      
      if (performance.timing && performance.timing.navigationStart){
        nowOffset = performance.timing.navigationStart;
      }

      window.performance.now = function now(){
        return Date.now() - nowOffset;
      };
    }

  })();

  //requestAnimationFrame polyfill for older Firefox/Chrome versions
  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame && window.webkitCancelAnimationFrame) {
    //https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/requestAnimationFrame/polyfill-webkit.js
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return webkitRequestAnimationFrame(function () {
          callback(global.performance.now());
        });
      };

      global.cancelAnimationFrame = global.webkitCancelAnimationFrame;
    }(window));
    } else if (window.mozRequestAnimationFrame && window.mozCancelAnimationFrame) {
      //https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/requestAnimationFrame/polyfill-moz.js
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return mozRequestAnimationFrame(function () {
          callback(global.performance.now());
        });
      };

      global.cancelAnimationFrame = global.mozCancelAnimationFrame;
    }(window));
    } else {
    (function (global) {
      global.requestAnimationFrame = function (callback) {
        return global.setTimeout(callback, 1000 / 60);
      };

      global.cancelAnimationFrame = global.clearTimeout;
    })(window);
    }
  }
})(this);

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __nested_webpack_require_8420__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_8420__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_8420__.m = modules;

/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_8420__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_8420__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_8420__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_9621__) {

	/*
	Holder.js - client side image placeholders
	(c) 2012-2020 Ivan Malopinsky - https://imsky.co
	*/

	module.exports = __nested_webpack_require_9621__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_9843__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	Holder.js - client side image placeholders
	(c) 2012-2020 Ivan Malopinsky - http://imsky.co
	*/

	//Libraries and functions
	var onDomReady = __nested_webpack_require_9843__(2);
	var querystring = __nested_webpack_require_9843__(3);

	var SceneGraph = __nested_webpack_require_9843__(6);
	var utils = __nested_webpack_require_9843__(7);
	var SVG = __nested_webpack_require_9843__(8);
	var DOM = __nested_webpack_require_9843__(9);
	var Color = __nested_webpack_require_9843__(10);
	var constants = __nested_webpack_require_9843__(11);

	var svgRenderer = __nested_webpack_require_9843__(12);
	var sgCanvasRenderer = __nested_webpack_require_9843__(27);

	var extend = utils.extend;
	var dimensionCheck = utils.dimensionCheck;

	//Constants and definitions
	var SVG_NS = constants.svg_ns;

	var Holder = {
	    version: constants.version,

	    /**
	     * Adds a theme to default settings
	     *
	     * @param {string} name Theme name
	     * @param {Object} theme Theme object, with foreground, background, size, font, and fontweight properties.
	     */
	    addTheme: function(name, theme) {
	        name != null && theme != null && (App.settings.themes[name] = theme);
	        delete App.vars.cache.themeKeys;
	        return this;
	    },

	    /**
	     * Appends a placeholder to an element
	     *
	     * @param {string} src Placeholder URL string
	     * @param el A selector or a reference to a DOM node
	     */
	    addImage: function(src, el) {
	        //todo: use jquery fallback if available for all QSA references
	        var nodes = DOM.getNodeArray(el);
	        nodes.forEach(function (node) {
	            var img = DOM.newEl('img');
	            var domProps = {};
	            domProps[App.setup.dataAttr] = src;
	            DOM.setAttr(img, domProps);
	            node.appendChild(img);
	        });
	        return this;
	    },

	    /**
	     * Sets whether or not an image is updated on resize.
	     * If an image is set to be updated, it is immediately rendered.
	     *
	     * @param {Object} el Image DOM element
	     * @param {Boolean} value Resizable update flag value
	     */
	    setResizeUpdate: function(el, value) {
	        if (el.holderData) {
	            el.holderData.resizeUpdate = !!value;
	            if (el.holderData.resizeUpdate) {
	                updateResizableElements(el);
	            }
	        }
	    },

	    /**
	     * Runs Holder with options. By default runs Holder on all images with "holder.js" in their source attributes.
	     *
	     * @param {Object} userOptions Options object, can contain domain, themes, images, and bgnodes properties
	     */
	    run: function(userOptions) {
	        //todo: split processing into separate queues
	        userOptions = userOptions || {};
	        var engineSettings = {};
	        var options = extend(App.settings, userOptions);

	        App.vars.preempted = true;
	        App.vars.dataAttr = options.dataAttr || App.setup.dataAttr;

	        engineSettings.renderer = options.renderer ? options.renderer : App.setup.renderer;
	        if (App.setup.renderers.join(',').indexOf(engineSettings.renderer) === -1) {
	            engineSettings.renderer = App.setup.supportsSVG ? 'svg' : (App.setup.supportsCanvas ? 'canvas' : 'html');
	        }

	        var images = DOM.getNodeArray(options.images);
	        var bgnodes = DOM.getNodeArray(options.bgnodes);
	        var stylenodes = DOM.getNodeArray(options.stylenodes);
	        var objects = DOM.getNodeArray(options.objects);

	        engineSettings.stylesheets = [];
	        engineSettings.svgXMLStylesheet = true;
	        engineSettings.noFontFallback = !!options.noFontFallback;
	        engineSettings.noBackgroundSize = !!options.noBackgroundSize;

	        stylenodes.forEach(function (styleNode) {
	            if (styleNode.attributes.rel && styleNode.attributes.href && styleNode.attributes.rel.value == 'stylesheet') {
	                var href = styleNode.attributes.href.value;
	                //todo: write isomorphic relative-to-absolute URL function
	                var proxyLink = DOM.newEl('a');
	                proxyLink.href = href;
	                var stylesheetURL = proxyLink.protocol + '//' + proxyLink.host + proxyLink.pathname + proxyLink.search;
	                engineSettings.stylesheets.push(stylesheetURL);
	            }
	        });

	        bgnodes.forEach(function (bgNode) {
	            //Skip processing background nodes if getComputedStyle is unavailable, since only modern browsers would be able to use canvas or SVG to render to background
	            if (!global.getComputedStyle) return;
	            var backgroundImage = global.getComputedStyle(bgNode, null).getPropertyValue('background-image');
	            var dataBackgroundImage = bgNode.getAttribute('data-background-src');
	            var rawURL = dataBackgroundImage || backgroundImage;

	            var holderURL = null;
	            var holderString = options.domain + '/';
	            var holderStringIndex = rawURL.indexOf(holderString);

	            if (holderStringIndex === 0) {
	                holderURL = rawURL;
	            } else if (holderStringIndex === 1 && rawURL[0] === '?') {
	                holderURL = rawURL.slice(1);
	            } else {
	                var fragment = rawURL.substr(holderStringIndex).match(/([^"]*)"?\)/);
	                if (fragment !== null) {
	                    holderURL = fragment[1];
	                } else if (rawURL.indexOf('url(') === 0) {
	                    throw 'Holder: unable to parse background URL: ' + rawURL;
	                }
	            }

	            if (holderURL) {
	                var holderFlags = parseURL(holderURL, options);
	                if (holderFlags) {
	                    prepareDOMElement({
	                        mode: 'background',
	                        el: bgNode,
	                        flags: holderFlags,
	                        engineSettings: engineSettings
	                    });
	                }
	            }
	        });

	        objects.forEach(function (object) {
	            var objectAttr = {};

	            try {
	                objectAttr.data = object.getAttribute('data');
	                objectAttr.dataSrc = object.getAttribute(App.vars.dataAttr);
	            } catch (e) {
	              objectAttr.error = e;
	            }

	            var objectHasSrcURL = objectAttr.data != null && objectAttr.data.indexOf(options.domain) === 0;
	            var objectHasDataSrcURL = objectAttr.dataSrc != null && objectAttr.dataSrc.indexOf(options.domain) === 0;

	            if (objectHasSrcURL) {
	                prepareImageElement(options, engineSettings, objectAttr.data, object);
	            } else if (objectHasDataSrcURL) {
	                prepareImageElement(options, engineSettings, objectAttr.dataSrc, object);
	            }
	        });

	        images.forEach(function (image) {
	            var imageAttr = {};

	            try {
	                imageAttr.src = image.getAttribute('src');
	                imageAttr.dataSrc = image.getAttribute(App.vars.dataAttr);
	                imageAttr.rendered = image.getAttribute('data-holder-rendered');
	            } catch (e) {
	              imageAttr.error = e;
	            }

	            var imageHasSrc = imageAttr.src != null;
	            var imageHasDataSrcURL = imageAttr.dataSrc != null && imageAttr.dataSrc.indexOf(options.domain) === 0;
	            var imageRendered = imageAttr.rendered != null && imageAttr.rendered == 'true';

	            if (imageHasSrc) {
	                if (imageAttr.src.indexOf(options.domain) === 0) {
	                    prepareImageElement(options, engineSettings, imageAttr.src, image);
	                } else if (imageHasDataSrcURL) {
	                    //Image has a valid data-src and an invalid src
	                    if (imageRendered) {
	                        //If the placeholder has already been render, re-render it
	                        prepareImageElement(options, engineSettings, imageAttr.dataSrc, image);
	                    } else {
	                        //If the placeholder has not been rendered, check if the image exists and render a fallback if it doesn't
	                        (function(src, options, engineSettings, dataSrc, image) {
	                            utils.imageExists(src, function(exists) {
	                                if (!exists) {
	                                    prepareImageElement(options, engineSettings, dataSrc, image);
	                                }
	                            });
	                        })(imageAttr.src, options, engineSettings, imageAttr.dataSrc, image);
	                    }
	                }
	            } else if (imageHasDataSrcURL) {
	                prepareImageElement(options, engineSettings, imageAttr.dataSrc, image);
	            }
	        });

	        return this;
	    }
	};

	var App = {
	    settings: {
	        domain: 'holder.js',
	        images: 'img',
	        objects: 'object',
	        bgnodes: 'body .holderjs',
	        stylenodes: 'head link.holderjs',
	        themes: {
	            'gray': {
	                bg: '#EEEEEE',
	                fg: '#AAAAAA'
	            },
	            'social': {
	                bg: '#3a5a97',
	                fg: '#FFFFFF'
	            },
	            'industrial': {
	                bg: '#434A52',
	                fg: '#C2F200'
	            },
	            'sky': {
	                bg: '#0D8FDB',
	                fg: '#FFFFFF'
	            },
	            'vine': {
	                bg: '#39DBAC',
	                fg: '#1E292C'
	            },
	            'lava': {
	                bg: '#F8591A',
	                fg: '#1C2846'
	            }
	        }
	    },
	    defaults: {
	        size: 10,
	        units: 'pt',
	        scale: 1 / 16
	    }
	};

	/**
	 * Processes provided source attribute and sets up the appropriate rendering workflow
	 *
	 * @private
	 * @param options Instance options from Holder.run
	 * @param renderSettings Instance configuration
	 * @param src Image URL
	 * @param el Image DOM element
	 */
	function prepareImageElement(options, engineSettings, src, el) {
	    var holderFlags = parseURL(src.substr(src.lastIndexOf(options.domain)), options);
	    if (holderFlags) {
	        prepareDOMElement({
	            mode: null,
	            el: el,
	            flags: holderFlags,
	            engineSettings: engineSettings
	        });
	    }
	}

	/**
	 * Processes a Holder URL and extracts configuration from query string
	 *
	 * @private
	 * @param url URL
	 * @param instanceOptions Instance options from Holder.run
	 */
	function parseURL(url, instanceOptions) {
	    var holder = {
	        theme: extend(App.settings.themes.gray, null),
	        stylesheets: instanceOptions.stylesheets,
	        instanceOptions: instanceOptions
	    };

	    var firstQuestionMark = url.indexOf('?');
	    var parts = [url];

	    if (firstQuestionMark !== -1) {
	        parts = [url.slice(0, firstQuestionMark), url.slice(firstQuestionMark + 1)];
	    }

	    var basics = parts[0].split('/');

	    holder.holderURL = url;

	    var dimensions = basics[1];
	    var dimensionData = dimensions.match(/([\d]+p?)x([\d]+p?)/);

	    if (!dimensionData) return false;

	    holder.fluid = dimensions.indexOf('p') !== -1;

	    holder.dimensions = {
	        width: dimensionData[1].replace('p', '%'),
	        height: dimensionData[2].replace('p', '%')
	    };

	    if (parts.length === 2) {
	        var options = querystring.parse(parts[1]);

	        // Dimensions

	        if (utils.truthy(options.ratio)) {
	            holder.fluid = true;
	            var ratioWidth = parseFloat(holder.dimensions.width.replace('%', ''));
	            var ratioHeight = parseFloat(holder.dimensions.height.replace('%', ''));

	            ratioHeight = Math.floor(100 * (ratioHeight / ratioWidth));
	            ratioWidth = 100;

	            holder.dimensions.width = ratioWidth + '%';
	            holder.dimensions.height = ratioHeight + '%';
	        }

	        holder.auto = utils.truthy(options.auto);

	        // Colors

	        if (options.bg) {
	            holder.theme.bg = utils.parseColor(options.bg);
	        }

	        if (options.fg) {
	            holder.theme.fg = utils.parseColor(options.fg);
	        }

	        //todo: add automatic foreground to themes without foreground
	        if (options.bg && !options.fg) {
	            holder.autoFg = true;
	        }

	        if (options.theme && Object.prototype.hasOwnProperty.call(holder.instanceOptions.themes, options.theme)) {
	            holder.theme = extend(holder.instanceOptions.themes[options.theme], null);
	        }

	        // Text

	        if (options.text) {
	            holder.text = options.text;
	        }

	        if (options.textmode) {
	            holder.textmode = options.textmode;
	        }

	        if (options.size && parseFloat(options.size)) {
	            holder.size = parseFloat(options.size);
	        }

	        if (options.fixedSize != null) {
	            holder.fixedSize = utils.truthy(options.fixedSize);
	        }

	        if (options.font) {
	            holder.font = options.font;
	        }

	        if (options.align) {
	            holder.align = options.align;
	        }

	        if (options.lineWrap) {
	            holder.lineWrap = options.lineWrap;
	        }

	        holder.nowrap = utils.truthy(options.nowrap);

	        // Miscellaneous

	        holder.outline = utils.truthy(options.outline);

	        if (utils.truthy(options.random)) {
	            App.vars.cache.themeKeys = App.vars.cache.themeKeys || Object.keys(holder.instanceOptions.themes);
	            var _theme = App.vars.cache.themeKeys[0 | Math.random() * App.vars.cache.themeKeys.length];
	            holder.theme = extend(holder.instanceOptions.themes[_theme], null);
	        }
	    }

	    return holder;
	}

	/**
	 * Modifies the DOM to fit placeholders and sets up resizable image callbacks (for fluid and automatically sized placeholders)
	 *
	 * @private
	 * @param settings DOM prep settings
	 */
	function prepareDOMElement(prepSettings) {
	    var mode = prepSettings.mode;
	    var el = prepSettings.el;
	    var flags = prepSettings.flags;
	    var _engineSettings = prepSettings.engineSettings;
	    var dimensions = flags.dimensions,
	        theme = flags.theme;
	    var dimensionsCaption = dimensions.width + 'x' + dimensions.height;
	    mode = mode == null ? (flags.fluid ? 'fluid' : 'image') : mode;
	    var holderTemplateRe = /holder_([a-z]+)/g;
	    var dimensionsInText = false;

	    if (flags.text != null) {
	        theme.text = flags.text;

	        //<object> SVG embedding doesn't parse Unicode properly
	        if (el.nodeName.toLowerCase() === 'object') {
	            var textLines = theme.text.split('\\n');
	            for (var k = 0; k < textLines.length; k++) {
	                textLines[k] = utils.encodeHtmlEntity(textLines[k]);
	            }
	            theme.text = textLines.join('\\n');
	        }
	    }

	    if (theme.text) {
	        var holderTemplateMatches = theme.text.match(holderTemplateRe);

	        if (holderTemplateMatches !== null) {
	            //todo: optimize template replacement
	            holderTemplateMatches.forEach(function (match) {
	                if (match === 'holder_dimensions') {
	                    theme.text = theme.text.replace(match, dimensionsCaption);
	                }
	            });
	        }
	    }

	    var holderURL = flags.holderURL;
	    var engineSettings = extend(_engineSettings, null);

	    if (flags.font) {
	        /*
	        If external fonts are used in a <img> placeholder rendered with SVG, Holder falls back to canvas.

	        This is done because Firefox and Chrome disallow embedded SVGs from referencing external assets.
	        The workaround is either to change the placeholder tag from <img> to <object> or to use the canvas renderer.
	        */
	        theme.font = flags.font;
	        if (!engineSettings.noFontFallback && el.nodeName.toLowerCase() === 'img' && App.setup.supportsCanvas && engineSettings.renderer === 'svg') {
	            engineSettings = extend(engineSettings, {
	                renderer: 'canvas'
	            });
	        }
	    }

	    //Chrome and Opera require a quick 10ms re-render if web fonts are used with canvas
	    if (flags.font && engineSettings.renderer == 'canvas') {
	        engineSettings.reRender = true;
	    }

	    if (mode == 'background') {
	        if (el.getAttribute('data-background-src') == null) {
	            DOM.setAttr(el, {
	                'data-background-src': holderURL
	            });
	        }
	    } else {
	        var domProps = {};
	        domProps[App.vars.dataAttr] = holderURL;
	        DOM.setAttr(el, domProps);
	    }

	    flags.theme = theme;

	    //todo consider using all renderSettings in holderData
	    el.holderData = {
	        flags: flags,
	        engineSettings: engineSettings
	    };

	    if (mode == 'image' || mode == 'fluid') {
	        DOM.setAttr(el, {
	            'alt': theme.text ? (dimensionsInText ? theme.text : theme.text + ' [' + dimensionsCaption + ']') : dimensionsCaption
	        });
	    }

	    var renderSettings = {
	        mode: mode,
	        el: el,
	        holderSettings: {
	            dimensions: dimensions,
	            theme: theme,
	            flags: flags
	        },
	        engineSettings: engineSettings
	    };

	    if (mode == 'image') {
	        if (!flags.auto) {
	            el.style.width = dimensions.width + 'px';
	            el.style.height = dimensions.height + 'px';
	        }

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            render(renderSettings);

	            if (flags.textmode == 'exact') {
	                el.holderData.resizeUpdate = true;
	                App.vars.resizableImages.push(el);
	                updateResizableElements(el);
	            }
	        }
	    } else if (mode == 'background' && engineSettings.renderer != 'html') {
	        render(renderSettings);
	    } else if (mode == 'fluid') {
	        el.holderData.resizeUpdate = true;

	        if (dimensions.height.slice(-1) == '%') {
	            el.style.height = dimensions.height;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.height = dimensions.height + 'px';
	        }
	        if (dimensions.width.slice(-1) == '%') {
	            el.style.width = dimensions.width;
	        } else if (flags.auto == null || !flags.auto) {
	            el.style.width = dimensions.width + 'px';
	        }
	        if (el.style.display == 'inline' || el.style.display === '' || el.style.display == 'none') {
	            el.style.display = 'block';
	        }

	        setInitialDimensions(el);

	        if (engineSettings.renderer == 'html') {
	            el.style.backgroundColor = theme.bg;
	        } else {
	            App.vars.resizableImages.push(el);
	            updateResizableElements(el);
	        }
	    }
	}

	/**
	 * Core function that takes output from renderers and sets it as the source or background-image of the target element
	 *
	 * @private
	 * @param renderSettings Renderer settings
	 */
	function render(renderSettings) {
	    var image = null;
	    var mode = renderSettings.mode;
	    var el = renderSettings.el;
	    var holderSettings = renderSettings.holderSettings;
	    var engineSettings = renderSettings.engineSettings;

	    switch (engineSettings.renderer) {
	        case 'svg':
	            if (!App.setup.supportsSVG) return;
	            break;
	        case 'canvas':
	            if (!App.setup.supportsCanvas) return;
	            break;
	        default:
	            return;
	    }

	    //todo: move generation of scene up to flag generation to reduce extra object creation
	    var scene = {
	        width: holderSettings.dimensions.width,
	        height: holderSettings.dimensions.height,
	        theme: holderSettings.theme,
	        flags: holderSettings.flags
	    };

	    var sceneGraph = buildSceneGraph(scene);

	    function getRenderedImage() {
	        var image = null;
	        switch (engineSettings.renderer) {
	            case 'canvas':
	                image = sgCanvasRenderer(sceneGraph, renderSettings);
	                break;
	            case 'svg':
	                image = svgRenderer(sceneGraph, renderSettings);
	                break;
	            default:
	                throw 'Holder: invalid renderer: ' + engineSettings.renderer;
	        }

	        return image;
	    }

	    image = getRenderedImage();

	    if (image == null) {
	        throw 'Holder: couldn\'t render placeholder';
	    }

	    //todo: add <object> canvas rendering
	    if (mode == 'background') {
	        el.style.backgroundImage = 'url(' + image + ')';

	        if (!engineSettings.noBackgroundSize) {
	            el.style.backgroundSize = scene.width + 'px ' + scene.height + 'px';
	        }
	    } else {
	        if (el.nodeName.toLowerCase() === 'img') {
	            DOM.setAttr(el, {
	                'src': image
	            });
	        } else if (el.nodeName.toLowerCase() === 'object') {
	            DOM.setAttr(el, {
	                'data': image,
	                'type': 'image/svg+xml'
	            });
	        }
	        if (engineSettings.reRender) {
	            global.setTimeout(function () {
	                var image = getRenderedImage();
	                if (image == null) {
	                    throw 'Holder: couldn\'t render placeholder';
	                }
	                //todo: refactor this code into a function
	                if (el.nodeName.toLowerCase() === 'img') {
	                    DOM.setAttr(el, {
	                        'src': image
	                    });
	                } else if (el.nodeName.toLowerCase() === 'object') {
	                    DOM.setAttr(el, {
	                        'data': image,
	                        'type': 'image/svg+xml'
	                    });
	                }
	            }, 150);
	        }
	    }
	    //todo: account for re-rendering
	    DOM.setAttr(el, {
	        'data-holder-rendered': true
	    });
	}

	/**
	 * Core function that takes a Holder scene description and builds a scene graph
	 *
	 * @private
	 * @param scene Holder scene object
	 */
	//todo: make this function reusable
	//todo: merge app defaults and setup properties into the scene argument
	function buildSceneGraph(scene) {
	    var fontSize = App.defaults.size;
	    var fixedSize = scene.flags.fixedSize != null ? scene.flags.fixedSize : scene.theme.fixedSize;
	    if (parseFloat(scene.theme.size)) {
	        fontSize = scene.theme.size;
	    } else if (parseFloat(scene.flags.size)) {
	        fontSize = scene.flags.size;
	    }

	    scene.font = {
	        family: scene.theme.font ? scene.theme.font : 'Arial, Helvetica, Open Sans, sans-serif',
	        size: fixedSize ? fontSize : textSize(scene.width, scene.height, fontSize, App.defaults.scale),
	        units: scene.theme.units ? scene.theme.units : App.defaults.units,
	        weight: scene.theme.fontweight ? scene.theme.fontweight : 'bold'
	    };

	    scene.text = scene.theme.text || Math.floor(scene.width) + 'x' + Math.floor(scene.height);

	    scene.noWrap = scene.theme.nowrap || scene.flags.nowrap;

	    scene.align = scene.theme.align || scene.flags.align || 'center';

	    switch (scene.flags.textmode) {
	        case 'literal':
	            scene.text = scene.flags.dimensions.width + 'x' + scene.flags.dimensions.height;
	            break;
	        case 'exact':
	            if (!scene.flags.exactDimensions) break;
	            scene.text = Math.floor(scene.flags.exactDimensions.width) + 'x' + Math.floor(scene.flags.exactDimensions.height);
	            break;
	    }

	    var lineWrap = scene.flags.lineWrap || App.setup.lineWrapRatio;
	    var sceneMargin = scene.width * lineWrap;
	    var maxLineWidth = sceneMargin;

	    var sceneGraph = new SceneGraph({
	        width: scene.width,
	        height: scene.height
	    });

	    var Shape = sceneGraph.Shape;

	    var holderBg = new Shape.Rect('holderBg', {
	        fill: scene.theme.bg
	    });

	    holderBg.resize(scene.width, scene.height);
	    sceneGraph.root.add(holderBg);

	    if (scene.flags.outline) {
	        var outlineColor = new Color(holderBg.properties.fill);
	        outlineColor = outlineColor.lighten(outlineColor.lighterThan('7f7f7f') ? -0.1 : 0.1);
	        holderBg.properties.outline = {
	            fill: outlineColor.toHex(true),
	            width: 2
	        };
	    }

	    var holderTextColor = scene.theme.fg;

	    if (scene.flags.autoFg) {
	        var holderBgColor = new Color(holderBg.properties.fill);
	        var lightColor = new Color('fff');
	        var darkColor = new Color('000', {
	            'alpha': 0.285714
	        });

	        holderTextColor = holderBgColor.blendAlpha(holderBgColor.lighterThan('7f7f7f') ? darkColor : lightColor).toHex(true);
	    }

	    var holderTextGroup = new Shape.Group('holderTextGroup', {
	        text: scene.text,
	        align: scene.align,
	        font: scene.font,
	        fill: holderTextColor
	    });

	    holderTextGroup.moveTo(null, null, 1);
	    sceneGraph.root.add(holderTextGroup);

	    var tpdata = holderTextGroup.textPositionData = stagingRenderer(sceneGraph);
	    if (!tpdata) {
	        throw 'Holder: staging fallback not supported yet.';
	    }
	    holderTextGroup.properties.leading = tpdata.boundingBox.height;

	    var textNode = null;
	    var line = null;

	    function finalizeLine(parent, line, width, height) {
	        line.width = width;
	        line.height = height;
	        parent.width = Math.max(parent.width, line.width);
	        parent.height += line.height;
	    }

	    if (tpdata.lineCount > 1) {
	        var offsetX = 0;
	        var offsetY = 0;
	        var lineIndex = 0;
	        var lineKey;
	        line = new Shape.Group('line' + lineIndex);

	        //Double margin so that left/right-aligned next is not flush with edge of image
	        if (scene.align === 'left' || scene.align === 'right') {
	            maxLineWidth = scene.width * (1 - (1 - lineWrap) * 2);
	        }

	        for (var i = 0; i < tpdata.words.length; i++) {
	            var word = tpdata.words[i];
	            textNode = new Shape.Text(word.text);
	            var newline = word.text == '\\n';
	            if (!scene.noWrap && (offsetX + word.width >= maxLineWidth || newline === true)) {
	                finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	                holderTextGroup.add(line);
	                offsetX = 0;
	                offsetY += holderTextGroup.properties.leading;
	                lineIndex += 1;
	                line = new Shape.Group('line' + lineIndex);
	                line.y = offsetY;
	            }
	            if (newline === true) {
	                continue;
	            }
	            textNode.moveTo(offsetX, 0);
	            offsetX += tpdata.spaceWidth + word.width;
	            line.add(textNode);
	        }

	        finalizeLine(holderTextGroup, line, offsetX, holderTextGroup.properties.leading);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo(scene.width - line.width, null, null);
	            }

	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            for (lineKey in holderTextGroup.children) {
	                line = holderTextGroup.children[lineKey];
	                line.moveTo((holderTextGroup.width - line.width) / 2, null, null);
	            }

	            holderTextGroup.moveTo((scene.width - holderTextGroup.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - holderTextGroup.height) / 2, null);

	        //If the text exceeds vertical space, move it down so the first line is visible
	        if ((scene.height - holderTextGroup.height) / 2 < 0) {
	            holderTextGroup.moveTo(null, 0, null);
	        }
	    } else {
	        textNode = new Shape.Text(scene.text);
	        line = new Shape.Group('line0');
	        line.add(textNode);
	        holderTextGroup.add(line);

	        if (scene.align === 'left') {
	            holderTextGroup.moveTo(scene.width - sceneMargin, null, null);
	        } else if (scene.align === 'right') {
	            holderTextGroup.moveTo(0 - (scene.width - sceneMargin), null, null);
	        } else {
	            holderTextGroup.moveTo((scene.width - tpdata.boundingBox.width) / 2, null, null);
	        }

	        holderTextGroup.moveTo(null, (scene.height - tpdata.boundingBox.height) / 2, null);
	    }

	    //todo: renderlist
	    return sceneGraph;
	}

	/**
	 * Adaptive text sizing function
	 *
	 * @private
	 * @param width Parent width
	 * @param height Parent height
	 * @param fontSize Requested text size
	 * @param scale Proportional scale of text
	 */
	function textSize(width, height, fontSize, scale) {
	    var stageWidth = parseInt(width, 10);
	    var stageHeight = parseInt(height, 10);

	    var bigSide = Math.max(stageWidth, stageHeight);
	    var smallSide = Math.min(stageWidth, stageHeight);

	    var newHeight = 0.8 * Math.min(smallSide, bigSide * scale);
	    return Math.round(Math.max(fontSize, newHeight));
	}

	/**
	 * Iterates over resizable (fluid or auto) placeholders and renders them
	 *
	 * @private
	 * @param element Optional element selector, specified only if a specific element needs to be re-rendered
	 */
	function updateResizableElements(element) {
	    var images;
	    if (element == null || element.nodeType == null) {
	        images = App.vars.resizableImages;
	    } else {
	        images = [element];
	    }
	    for (var i = 0, l = images.length; i < l; i++) {
	        var el = images[i];
	        if (el.holderData) {
	            var flags = el.holderData.flags;
	            var dimensions = dimensionCheck(el);
	            if (dimensions) {
	                if (!el.holderData.resizeUpdate) {
	                    continue;
	                }

	                if (flags.fluid && flags.auto) {
	                    var fluidConfig = el.holderData.fluidConfig;
	                    switch (fluidConfig.mode) {
	                        case 'width':
	                            dimensions.height = dimensions.width / fluidConfig.ratio;
	                            break;
	                        case 'height':
	                            dimensions.width = dimensions.height * fluidConfig.ratio;
	                            break;
	                    }
	                }

	                var settings = {
	                    mode: 'image',
	                    holderSettings: {
	                        dimensions: dimensions,
	                        theme: flags.theme,
	                        flags: flags
	                    },
	                    el: el,
	                    engineSettings: el.holderData.engineSettings
	                };

	                if (flags.textmode == 'exact') {
	                    flags.exactDimensions = dimensions;
	                    settings.holderSettings.dimensions = flags.dimensions;
	                }

	                render(settings);
	            } else {
	                setInvisible(el);
	            }
	        }
	    }
	}

	/**
	 * Sets up aspect ratio metadata for fluid placeholders, in order to preserve proportions when resizing
	 *
	 * @private
	 * @param el Image DOM element
	 */
	function setInitialDimensions(el) {
	    if (el.holderData) {
	        var dimensions = dimensionCheck(el);
	        if (dimensions) {
	            var flags = el.holderData.flags;

	            var fluidConfig = {
	                fluidHeight: flags.dimensions.height.slice(-1) == '%',
	                fluidWidth: flags.dimensions.width.slice(-1) == '%',
	                mode: null,
	                initialDimensions: dimensions
	            };

	            if (fluidConfig.fluidWidth && !fluidConfig.fluidHeight) {
	                fluidConfig.mode = 'width';
	                fluidConfig.ratio = fluidConfig.initialDimensions.width / parseFloat(flags.dimensions.height);
	            } else if (!fluidConfig.fluidWidth && fluidConfig.fluidHeight) {
	                fluidConfig.mode = 'height';
	                fluidConfig.ratio = parseFloat(flags.dimensions.width) / fluidConfig.initialDimensions.height;
	            }

	            el.holderData.fluidConfig = fluidConfig;
	        } else {
	            setInvisible(el);
	        }
	    }
	}

	/**
	 * Iterates through all current invisible images, and if they're visible, renders them and removes them from further checks. Runs every animation frame.
	 *
	 * @private
	 */
	function visibilityCheck() {
	    var renderableImages = [];
	    var keys = Object.keys(App.vars.invisibleImages);
	    var el;

	    keys.forEach(function (key) {
	        el = App.vars.invisibleImages[key];
	        if (dimensionCheck(el) && el.nodeName.toLowerCase() == 'img') {
	            renderableImages.push(el);
	            delete App.vars.invisibleImages[key];
	        }
	    });

	    if (renderableImages.length) {
	        Holder.run({
	            images: renderableImages
	        });
	    }

	    // Done to prevent 100% CPU usage via aggressive calling of requestAnimationFrame
	    setTimeout(function () {
	        global.requestAnimationFrame(visibilityCheck);
	    }, 10);
	}

	/**
	 * Starts checking for invisible placeholders if not doing so yet. Does nothing otherwise.
	 *
	 * @private
	 */
	function startVisibilityCheck() {
	    if (!App.vars.visibilityCheckStarted) {
	        global.requestAnimationFrame(visibilityCheck);
	        App.vars.visibilityCheckStarted = true;
	    }
	}

	/**
	 * Sets a unique ID for an image detected to be invisible and adds it to the map of invisible images checked by visibilityCheck
	 *
	 * @private
	 * @param el Invisible DOM element
	 */
	function setInvisible(el) {
	    if (!el.holderData.invisibleId) {
	        App.vars.invisibleId += 1;
	        App.vars.invisibleImages['i' + App.vars.invisibleId] = el;
	        el.holderData.invisibleId = App.vars.invisibleId;
	    }
	}

	//todo: see if possible to convert stagingRenderer to use HTML only
	var stagingRenderer = (function() {
	    var svg = null,
	        stagingText = null,
	        stagingTextNode = null;
	    return function(graph) {
	        var rootNode = graph.root;
	        if (App.setup.supportsSVG) {
	            var firstTimeSetup = false;
	            var tnode = function(text) {
	                return document.createTextNode(text);
	            };
	            if (svg == null || svg.parentNode !== document.body) {
	                firstTimeSetup = true;
	            }

	            svg = SVG.initSVG(svg, rootNode.properties.width, rootNode.properties.height);
	            //Show staging element before staging
	            svg.style.display = 'block';

	            if (firstTimeSetup) {
	                stagingText = DOM.newEl('text', SVG_NS);
	                stagingTextNode = tnode(null);
	                DOM.setAttr(stagingText, {
	                    x: 0
	                });
	                stagingText.appendChild(stagingTextNode);
	                svg.appendChild(stagingText);
	                document.body.appendChild(svg);
	                svg.style.visibility = 'hidden';
	                svg.style.position = 'absolute';
	                svg.style.top = '-100%';
	                svg.style.left = '-100%';
	                //todo: workaround for zero-dimension <svg> tag in Opera 12
	                //svg.setAttribute('width', 0);
	                //svg.setAttribute('height', 0);
	            }

	            var holderTextGroup = rootNode.children.holderTextGroup;
	            var htgProps = holderTextGroup.properties;
	            DOM.setAttr(stagingText, {
	                'y': htgProps.font.size,
	                'style': utils.cssProps({
	                    'font-weight': htgProps.font.weight,
	                    'font-size': htgProps.font.size + htgProps.font.units,
	                    'font-family': htgProps.font.family
	                })
	            });

	            //Unescape HTML entities to get approximately the right width
	            var txt = DOM.newEl('textarea');
	            txt.innerHTML = htgProps.text;
	            stagingTextNode.nodeValue = txt.value;

	            //Get bounding box for the whole string (total width and height)
	            var stagingTextBBox = stagingText.getBBox();

	            //Get line count and split the string into words
	            var lineCount = Math.ceil(stagingTextBBox.width / rootNode.properties.width);
	            var words = htgProps.text.split(' ');
	            var newlines = htgProps.text.match(/\\n/g);
	            lineCount += newlines == null ? 0 : newlines.length;

	            //Get bounding box for the string with spaces removed
	            stagingTextNode.nodeValue = htgProps.text.replace(/[ ]+/g, '');
	            var computedNoSpaceLength = stagingText.getComputedTextLength();

	            //Compute average space width
	            var diffLength = stagingTextBBox.width - computedNoSpaceLength;
	            var spaceWidth = Math.round(diffLength / Math.max(1, words.length - 1));

	            //Get widths for every word with space only if there is more than one line
	            var wordWidths = [];
	            if (lineCount > 1) {
	                stagingTextNode.nodeValue = '';
	                for (var i = 0; i < words.length; i++) {
	                    if (words[i].length === 0) continue;
	                    stagingTextNode.nodeValue = utils.decodeHtmlEntity(words[i]);
	                    var bbox = stagingText.getBBox();
	                    wordWidths.push({
	                        text: words[i],
	                        width: bbox.width
	                    });
	                }
	            }

	            //Hide staging element after staging
	            svg.style.display = 'none';

	            return {
	                spaceWidth: spaceWidth,
	                lineCount: lineCount,
	                boundingBox: stagingTextBBox,
	                words: wordWidths
	            };
	        } else {
	            //todo: canvas fallback for measuring text on android 2.3
	            return false;
	        }
	    };
	})();

	//Helpers

	/**
	 * Prevents a function from being called too often, waits until a timer elapses to call it again
	 *
	 * @param fn Function to call
	 */
	function debounce(fn) {
	    if (!App.vars.debounceTimer) fn.call(this);
	    if (App.vars.debounceTimer) global.clearTimeout(App.vars.debounceTimer);
	    App.vars.debounceTimer = global.setTimeout(function() {
	        App.vars.debounceTimer = null;
	        fn.call(this);
	    }, App.setup.debounce);
	}

	/**
	 * Holder-specific resize/orientation change callback, debounced to prevent excessive execution
	 */
	function resizeEvent() {
	    debounce(function() {
	        updateResizableElements(null);
	    });
	}

	//Set up flags

	for (var flag in App.flags) {
	    if (!Object.prototype.hasOwnProperty.call(App.flags, flag)) continue;
	    App.flags[flag].match = function(val) {
	        return val.match(this.regex);
	    };
	}

	//Properties set once on setup

	App.setup = {
	    renderer: 'html',
	    debounce: 100,
	    ratio: 1,
	    supportsCanvas: false,
	    supportsSVG: false,
	    lineWrapRatio: 0.9,
	    dataAttr: 'data-src',
	    renderers: ['html', 'canvas', 'svg']
	};

	//Properties modified during runtime

	App.vars = {
	    preempted: false,
	    resizableImages: [],
	    invisibleImages: {},
	    invisibleId: 0,
	    visibilityCheckStarted: false,
	    debounceTimer: null,
	    cache: {}
	};

	//Pre-flight

	(function() {
	    var canvas = DOM.newEl('canvas');

	    if (canvas.getContext) {
	        if (canvas.toDataURL('image/png').indexOf('data:image/png') != -1) {
	            App.setup.renderer = 'canvas';
	            App.setup.supportsCanvas = true;
	        }
	    }

	    if (!!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect) {
	        App.setup.renderer = 'svg';
	        App.setup.supportsSVG = true;
	    }
	})();

	//Starts checking for invisible placeholders
	startVisibilityCheck();

	if (onDomReady) {
	    onDomReady(function() {
	        if (!App.vars.preempted) {
	            Holder.run();
	        }
	        if (global.addEventListener) {
	            global.addEventListener('resize', resizeEvent, false);
	            global.addEventListener('orientationchange', resizeEvent, false);
	        } else {
	            global.attachEvent('onresize', resizeEvent);
	        }

	        if (typeof global.Turbolinks == 'object') {
	            global.document.addEventListener('page:change', function() {
	                Holder.run();
	            });
	        }
	    });
	}

	module.exports = Holder;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*!
	 * onDomReady.js 1.4.0 (c) 2013 Tubal Martin - MIT license
	 *
	 * Specially modified to work with Holder.js
	 */

	function _onDomReady(win) {
	    //Lazy loading fix for Firefox < 3.6
	    //http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
	    if (document.readyState == null && document.addEventListener) {
	        document.addEventListener("DOMContentLoaded", function DOMContentLoaded() {
	            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
	            document.readyState = "complete";
	        }, false);
	        document.readyState = "loading";
	    }
	    
	    var doc = win.document,
	        docElem = doc.documentElement,
	    
	        LOAD = "load",
	        FALSE = false,
	        ONLOAD = "on"+LOAD,
	        COMPLETE = "complete",
	        READYSTATE = "readyState",
	        ATTACHEVENT = "attachEvent",
	        DETACHEVENT = "detachEvent",
	        ADDEVENTLISTENER = "addEventListener",
	        DOMCONTENTLOADED = "DOMContentLoaded",
	        ONREADYSTATECHANGE = "onreadystatechange",
	        REMOVEEVENTLISTENER = "removeEventListener",
	    
	        // W3C Event model
	        w3c = ADDEVENTLISTENER in doc,
	        _top = FALSE,
	    
	        // isReady: Is the DOM ready to be used? Set to true once it occurs.
	        isReady = FALSE,
	    
	        // Callbacks pending execution until DOM is ready
	        callbacks = [];
	    
	    // Handle when the DOM is ready
	    function ready( fn ) {
	        if ( !isReady ) {
	    
	            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
	            if ( !doc.body ) {
	                return defer( ready );
	            }
	    
	            // Remember that the DOM is ready
	            isReady = true;
	    
	            // Execute all callbacks
	            while ( fn = callbacks.shift() ) {
	                defer( fn );
	            }
	        }
	    }
	    
	    // The ready event handler
	    function completed( event ) {
	        // readyState === "complete" is good enough for us to call the dom ready in oldIE
	        if ( w3c || event.type === LOAD || doc[READYSTATE] === COMPLETE ) {
	            detach();
	            ready();
	        }
	    }
	    
	    // Clean-up method for dom ready events
	    function detach() {
	        if ( w3c ) {
	            doc[REMOVEEVENTLISTENER]( DOMCONTENTLOADED, completed, FALSE );
	            win[REMOVEEVENTLISTENER]( LOAD, completed, FALSE );
	        } else {
	            doc[DETACHEVENT]( ONREADYSTATECHANGE, completed );
	            win[DETACHEVENT]( ONLOAD, completed );
	        }
	    }
	    
	    // Defers a function, scheduling it to run after the current call stack has cleared.
	    function defer( fn, wait ) {
	        // Allow 0 to be passed
	        setTimeout( fn, +wait >= 0 ? wait : 1 );
	    }
	    
	    // Attach the listeners:
	    
	    // Catch cases where onDomReady is called after the browser event has already occurred.
	    // we once tried to use readyState "interactive" here, but it caused issues like the one
	    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	    if ( doc[READYSTATE] === COMPLETE ) {
	        // Handle it asynchronously to allow scripts the opportunity to delay ready
	        defer( ready );
	    
	    // Standards-based browsers support DOMContentLoaded
	    } else if ( w3c ) {
	        // Use the handy event callback
	        doc[ADDEVENTLISTENER]( DOMCONTENTLOADED, completed, FALSE );
	    
	        // A fallback to window.onload, that will always work
	        win[ADDEVENTLISTENER]( LOAD, completed, FALSE );
	    
	    // If IE event model is used
	    } else {
	        // Ensure firing before onload, maybe late but safe also for iframes
	        doc[ATTACHEVENT]( ONREADYSTATECHANGE, completed );
	    
	        // A fallback to window.onload, that will always work
	        win[ATTACHEVENT]( ONLOAD, completed );
	    
	        // If IE and not a frame
	        // continually check to see if the document is ready
	        try {
	            _top = win.frameElement == null && docElem;
	        } catch(e) {}
	    
	        if ( _top && _top.doScroll ) {
	            (function doScrollCheck() {
	                if ( !isReady ) {
	                    try {
	                        // Use the trick by Diego Perini
	                        // http://javascript.nwbox.com/IEContentLoaded/
	                        _top.doScroll("left");
	                    } catch(e) {
	                        return defer( doScrollCheck, 50 );
	                    }
	    
	                    // detach all dom ready events
	                    detach();
	    
	                    // and execute any waiting functions
	                    ready();
	                }
	            })();
	        }
	    }
	    
	    function onDomReady( fn ) {
	        // If DOM is ready, execute the function (async), otherwise wait
	        isReady ? defer( fn ) : callbacks.push( fn );
	    }
	    
	    // Add version
	    onDomReady.version = "1.4.0";
	    // Add method to check if DOM is ready
	    onDomReady.isReady = function(){
	        return isReady;
	    };

	    return onDomReady;
	}

	module.exports = typeof window !== "undefined" && _onDomReady(window);

/***/ }),
/* 3 */
/***/ (function(module, exports, __nested_webpack_require_56630__) {

	//Modified version of component/querystring
	//Changes: updated dependencies, dot notation parsing, JSHint fixes
	//Fork at https://github.com/imsky/querystring

	/**
	 * Module dependencies.
	 */

	var encode = encodeURIComponent;
	var decode = decodeURIComponent;
	var trim = __nested_webpack_require_56630__(4);
	var type = __nested_webpack_require_56630__(5);

	var arrayRegex = /(\w+)\[(\d+)\]/;
	var objectRegex = /\w+\.\w+/;

	/**
	 * Parse the given query `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api public
	 */

	exports.parse = function(str){
	  if ('string' !== typeof str) return {};

	  str = trim(str);
	  if ('' === str) return {};
	  if ('?' === str.charAt(0)) str = str.slice(1);

	  var obj = {};
	  var pairs = str.split('&');
	  for (var i = 0; i < pairs.length; i++) {
	    var parts = pairs[i].split('=');
	    var key = decode(parts[0]);
	    var m, ctx, prop;

	    if (m = arrayRegex.exec(key)) {
	      obj[m[1]] = obj[m[1]] || [];
	      obj[m[1]][m[2]] = decode(parts[1]);
	      continue;
	    }

	    if (m = objectRegex.test(key)) {
	      m = key.split('.');
	      ctx = obj;
	      
	      while (m.length) {
	        prop = m.shift();

	        if (!prop.length) continue;

	        if (!ctx[prop]) {
	          ctx[prop] = {};
	        } else if (ctx[prop] && typeof ctx[prop] !== 'object') {
	          break;
	        }

	        if (!m.length) {
	          ctx[prop] = decode(parts[1]);
	        }

	        ctx = ctx[prop];
	      }

	      continue;
	    }

	    obj[parts[0]] = null == parts[1] ? '' : decode(parts[1]);
	  }

	  return obj;
	};

	/**
	 * Stringify the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api public
	 */

	exports.stringify = function(obj){
	  if (!obj) return '';
	  var pairs = [];

	  for (var key in obj) {
	    var value = obj[key];

	    if ('array' == type(value)) {
	      for (var i = 0; i < value.length; ++i) {
	        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
	      }
	      continue;
	    }

	    pairs.push(encode(key) + '=' + encode(obj[key]));
	  }

	  return pairs.join('&');
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var SceneGraph = function(sceneProperties) {
	    var nodeCount = 1;

	    //todo: move merge to helpers section
	    function merge(parent, child) {
	        for (var prop in child) {
	            parent[prop] = child[prop];
	        }
	        return parent;
	    }

	    var SceneNode = function(name) {
	        nodeCount++;
	        this.parent = null;
	        this.children = {};
	        this.id = nodeCount;
	        this.name = 'n' + nodeCount;
	        if (typeof name !== 'undefined') {
	            this.name = name;
	        }
	        this.x = this.y = this.z = 0;
	        this.width = this.height = 0;
	    };

	    SceneNode.prototype.resize = function(width, height) {
	        if (width != null) {
	            this.width = width;
	        }
	        if (height != null) {
	            this.height = height;
	        }
	    };

	    SceneNode.prototype.moveTo = function(x, y, z) {
	        this.x = x != null ? x : this.x;
	        this.y = y != null ? y : this.y;
	        this.z = z != null ? z : this.z;
	    };

	    SceneNode.prototype.add = function(child) {
	        var name = child.name;
	        if (typeof this.children[name] === 'undefined') {
	            this.children[name] = child;
	            child.parent = this;
	        } else {
	            throw 'SceneGraph: child already exists: ' + name;
	        }
	    };

	    var RootNode = function() {
	        SceneNode.call(this, 'root');
	        this.properties = sceneProperties;
	    };

	    RootNode.prototype = new SceneNode();

	    var Shape = function(name, props) {
	        SceneNode.call(this, name);
	        this.properties = {
	            'fill': '#000000'
	        };
	        if (typeof props !== 'undefined') {
	            merge(this.properties, props);
	        } else if (typeof name !== 'undefined' && typeof name !== 'string') {
	            throw 'SceneGraph: invalid node name';
	        }
	    };

	    Shape.prototype = new SceneNode();

	    var Group = function() {
	        Shape.apply(this, arguments);
	        this.type = 'group';
	    };

	    Group.prototype = new Shape();

	    var Rect = function() {
	        Shape.apply(this, arguments);
	        this.type = 'rect';
	    };

	    Rect.prototype = new Shape();

	    var Text = function(text) {
	        Shape.call(this);
	        this.type = 'text';
	        this.properties.text = text;
	    };

	    Text.prototype = new Shape();

	    var root = new RootNode();

	    this.Shape = {
	        'Rect': Rect,
	        'Text': Text,
	        'Group': Group
	    };

	    this.root = root;
	    return this;
	};

	module.exports = SceneGraph;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Shallow object clone and merge
	 *
	 * @param a Object A
	 * @param b Object B
	 * @returns {Object} New object with all of A's properties, and all of B's properties, overwriting A's properties
	 */
	exports.extend = function(a, b) {
	    var c = {};
	    for (var x in a) {
	        if (Object.prototype.hasOwnProperty.call(a,x)) {
	            c[x] = a[x];
	        }
	    }
	    if (b != null) {
	        for (var y in b) {
	            if (Object.prototype.hasOwnProperty.call(b, y)) {
	                c[y] = b[y];
	            }
	        }
	    }
	    return c;
	};

	/**
	 * Takes a k/v list of CSS properties and returns a rule
	 *
	 * @param props CSS properties object
	 */
	exports.cssProps = function(props) {
	    var ret = [];
	    for (var p in props) {
	        if (Object.prototype.hasOwnProperty.call(props, p)) {
	            ret.push(p + ':' + props[p]);
	        }
	    }
	    return ret.join(';');
	};

	/**
	 * Encodes HTML entities in a string
	 *
	 * @param str Input string
	 */
	exports.encodeHtmlEntity = function(str) {
	    var buf = [];
	    var charCode = 0;
	    for (var i = str.length - 1; i >= 0; i--) {
	        charCode = str.charCodeAt(i);
	        if (charCode > 128) {
	            buf.unshift(['&#', charCode, ';'].join(''));
	        } else {
	            buf.unshift(str[i]);
	        }
	    }
	    return buf.join('');
	};

	/**
	 * Checks if an image exists
	 *
	 * @param src URL of image
	 * @param callback Callback to call once image status has been found
	 */
	exports.imageExists = function(src, callback) {
	    var image = new Image();
	    image.onerror = function() {
	        callback.call(this, false);
	    };
	    image.onload = function() {
	        callback.call(this, true);
	    };
	    image.src = src;
	};

	/**
	 * Decodes HTML entities in a string
	 *
	 * @param str Input string
	 */
	exports.decodeHtmlEntity = function(str) {
	    return str.replace(/&#(\d+);/g, function(match, dec) {
	        return String.fromCharCode(dec);
	    });
	};


	/**
	 * Returns an element's dimensions if it's visible, `false` otherwise.
	 *
	 * @param el DOM element
	 */
	exports.dimensionCheck = function(el) {
	    var dimensions = {
	        height: el.clientHeight,
	        width: el.clientWidth
	    };

	    if (dimensions.height && dimensions.width) {
	        return dimensions;
	    } else {
	        return false;
	    }
	};


	/**
	 * Returns true if value is truthy or if it is "semantically truthy"
	 * @param val
	 */
	exports.truthy = function(val) {
	    if (typeof val === 'string') {
	        return val === 'true' || val === 'yes' || val === '1' || val === 'on' || val === '✓';
	    }
	    return !!val;
	};

	/**
	 * Parses input into a well-formed CSS color
	 * @param val
	 */
	exports.parseColor = function(val) {
	    var hexre = /(^(?:#?)[0-9a-f]{6}$)|(^(?:#?)[0-9a-f]{3}$)/i;
	    var rgbre = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
	    var rgbare = /^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0*\.\d{1,}|1)\)$/;

	    var match = val.match(hexre);
	    var retval;

	    if (match !== null) {
	        retval = match[1] || match[2];
	        if (retval[0] !== '#') {
	            return '#' + retval;
	        } else {
	            return retval;
	        }
	    }

	    match = val.match(rgbre);

	    if (match !== null) {
	        retval = 'rgb(' + match.slice(1).join(',') + ')';
	        return retval;
	    }

	    match = val.match(rgbare);

	    if (match !== null) {
	        var normalizeAlpha = function (a) { return '0.' + a.split('.')[1]; };
	        var fixedMatch = match.slice(1).map(function (e, i) {
	            return (i === 3) ? normalizeAlpha(e) : e;
	        });
	        retval = 'rgba(' + fixedMatch.join(',') + ')';
	        return retval;
	    }

	    return null;
	};

	/**
	 * Provides the correct scaling ratio for canvas drawing operations on HiDPI screens (e.g. Retina displays)
	 */
	exports.canvasRatio = function () {
	    var devicePixelRatio = 1;
	    var backingStoreRatio = 1;

	    if (global.document) {
	        var canvas = global.document.createElement('canvas');
	        if (canvas.getContext) {
	            var ctx = canvas.getContext('2d');
	            devicePixelRatio = global.devicePixelRatio || 1;
	            backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	        }
	    }

	    return devicePixelRatio / backingStoreRatio;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __nested_webpack_require_67337__) {

	/* WEBPACK VAR INJECTION */(function(global) {var DOM = __nested_webpack_require_67337__(9);

	var SVG_NS = 'http://www.w3.org/2000/svg';
	var NODE_TYPE_COMMENT = 8;

	/**
	 * Generic SVG element creation function
	 *
	 * @param svg SVG context, set to null if new
	 * @param width Document width
	 * @param height Document height
	 */
	exports.initSVG = function(svg, width, height) {
	    var defs, style, initialize = false;

	    if (svg && svg.querySelector) {
	        style = svg.querySelector('style');
	        if (style === null) {
	            initialize = true;
	        }
	    } else {
	        svg = DOM.newEl('svg', SVG_NS);
	        initialize = true;
	    }

	    if (initialize) {
	        defs = DOM.newEl('defs', SVG_NS);
	        style = DOM.newEl('style', SVG_NS);
	        DOM.setAttr(style, {
	            'type': 'text/css'
	        });
	        defs.appendChild(style);
	        svg.appendChild(defs);
	    }

	    //IE throws an exception if this is set and Chrome requires it to be set
	    if (svg.webkitMatchesSelector) {
	        svg.setAttribute('xmlns', SVG_NS);
	    }

	    //Remove comment nodes
	    for (var i = 0; i < svg.childNodes.length; i++) {
	        if (svg.childNodes[i].nodeType === NODE_TYPE_COMMENT) {
	            svg.removeChild(svg.childNodes[i]);
	        }
	    }

	    //Remove CSS
	    while (style.childNodes.length) {
	        style.removeChild(style.childNodes[0]);
	    }

	    DOM.setAttr(svg, {
	        'width': width,
	        'height': height,
	        'viewBox': '0 0 ' + width + ' ' + height,
	        'preserveAspectRatio': 'none'
	    });

	    return svg;
	};

	/**
	 * Converts serialized SVG to a string suitable for data URI use
	 * @param svgString Serialized SVG string
	 * @param [base64] Use base64 encoding for data URI
	 */
	exports.svgStringToDataURI = function() {
	    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
	    var base64Prefix = 'data:image/svg+xml;charset=UTF-8;base64,';

	    return function(svgString, base64) {
	        if (base64) {
	            return base64Prefix + btoa(global.unescape(encodeURIComponent(svgString)));
	        } else {
	            return rawPrefix + encodeURIComponent(svgString);
	        }
	    };
	}();

	/**
	 * Returns serialized SVG with XML processing instructions
	 *
	 * @param svg SVG context
	 * @param stylesheets CSS stylesheets to include
	 */
	exports.serializeSVG = function(svg, engineSettings) {
	    if (!global.XMLSerializer) return;
	    var serializer = new XMLSerializer();
	    var svgCSS = '';
	    var stylesheets = engineSettings.stylesheets;

	    //External stylesheets: Processing Instruction method
	    if (engineSettings.svgXMLStylesheet) {
	        var xml = DOM.createXML();
	        //Add <?xml-stylesheet ?> directives
	        for (var i = stylesheets.length - 1; i >= 0; i--) {
	            var csspi = xml.createProcessingInstruction('xml-stylesheet', 'href="' + stylesheets[i] + '" rel="stylesheet"');
	            xml.insertBefore(csspi, xml.firstChild);
	        }

	        xml.removeChild(xml.documentElement);
	        svgCSS = serializer.serializeToString(xml);
	    }

	    var svgText = serializer.serializeToString(svg);
	    svgText = svgText.replace(/&amp;(#[0-9]{2,};)/g, '&$1');
	    return svgCSS + svgText;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Generic new DOM element function
	 *
	 * @param tag Tag to create
	 * @param namespace Optional namespace value
	 */
	exports.newEl = function(tag, namespace) {
	    if (!global.document) return;

	    if (namespace == null) {
	        return global.document.createElement(tag);
	    } else {
	        return global.document.createElementNS(namespace, tag);
	    }
	};

	/**
	 * Generic setAttribute function
	 *
	 * @param el Reference to DOM element
	 * @param attrs Object with attribute keys and values
	 */
	exports.setAttr = function (el, attrs) {
	    for (var a in attrs) {
	        el.setAttribute(a, attrs[a]);
	    }
	};

	/**
	 * Creates a XML document
	 * @private
	 */
	exports.createXML = function() {
	    if (!global.DOMParser) return;
	    return new DOMParser().parseFromString('<xml />', 'application/xml');
	};

	/**
	 * Converts a value into an array of DOM nodes
	 *
	 * @param val A string, a NodeList, a Node, or an HTMLCollection
	 */
	exports.getNodeArray = function(val) {
	    var retval = null;
	    if (typeof(val) == 'string') {
	        retval = document.querySelectorAll(val);
	    } else if (global.NodeList && val instanceof global.NodeList) {
	        retval = val;
	    } else if (global.Node && val instanceof global.Node) {
	        retval = [val];
	    } else if (global.HTMLCollection && val instanceof global.HTMLCollection) {
	        retval = val;
	    } else if (val instanceof Array) {
	        retval = val;
	    } else if (val === null) {
	        retval = [];
	    }

	    retval = Array.prototype.slice.call(retval);

	    return retval;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var Color = function(color, options) {
	    //todo: support rgba, hsla, and rrggbbaa notation
	    //todo: use CIELAB internally
	    //todo: add clamp function (with sign)
	    if (typeof color !== 'string') return;

	    this.original = color;

	    if (color.charAt(0) === '#') {
	        color = color.slice(1);
	    }

	    if (/[^a-f0-9]+/i.test(color)) return;

	    if (color.length === 3) {
	        color = color.replace(/./g, '$&$&');
	    }

	    if (color.length !== 6) return;

	    this.alpha = 1;

	    if (options && options.alpha) {
	        this.alpha = options.alpha;
	    }

	    this.set(parseInt(color, 16));
	};

	//todo: jsdocs
	Color.rgb2hex = function(r, g, b) {
	    function format (decimal) {
	        var hex = (decimal | 0).toString(16);
	        if (decimal < 16) {
	            hex = '0' + hex;
	        }
	        return hex;
	    }

	    return [r, g, b].map(format).join('');
	};

	//todo: jsdocs
	Color.hsl2rgb = function (h, s, l) {
	    var H = h / 60;
	    var C = (1 - Math.abs(2 * l - 1)) * s;
	    var X = C * (1 - Math.abs(parseInt(H) % 2 - 1));
	    var m = l - (C / 2);

	    var r = 0, g = 0, b = 0;

	    if (H >= 0 && H < 1) {
	        r = C;
	        g = X;
	    } else if (H >= 1 && H < 2) {
	        r = X;
	        g = C;
	    } else if (H >= 2 && H < 3) {
	        g = C;
	        b = X;
	    } else if (H >= 3 && H < 4) {
	        g = X;
	        b = C;
	    } else if (H >= 4 && H < 5) {
	        r = X;
	        b = C;
	    } else if (H >= 5 && H < 6) {
	        r = C;
	        b = X;
	    }

	    r += m;
	    g += m;
	    b += m;

	    r = parseInt(r * 255);
	    g = parseInt(g * 255);
	    b = parseInt(b * 255);

	    return [r, g, b];
	};

	/**
	 * Sets the color from a raw RGB888 integer
	 * @param raw RGB888 representation of color
	 */
	//todo: refactor into a static method
	//todo: factor out individual color spaces
	//todo: add HSL, CIELAB, and CIELUV
	Color.prototype.set = function (val) {
	    this.raw = val;

	    var r = (this.raw & 0xFF0000) >> 16;
	    var g = (this.raw & 0x00FF00) >> 8;
	    var b = (this.raw & 0x0000FF);

	    // BT.709
	    var y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	    var u = -0.09991 * r - 0.33609 * g + 0.436 * b;
	    var v = 0.615 * r - 0.55861 * g - 0.05639 * b;

	    this.rgb = {
	        r: r,
	        g: g,
	        b: b
	    };

	    this.yuv = {
	        y: y,
	        u: u,
	        v: v
	    };

	    return this;
	};

	/**
	 * Lighten or darken a color
	 * @param multiplier Amount to lighten or darken (-1 to 1)
	 */
	Color.prototype.lighten = function(multiplier) {
	    var cm = Math.min(1, Math.max(0, Math.abs(multiplier))) * (multiplier < 0 ? -1 : 1);
	    var bm = (255 * cm) | 0;
	    var cr = Math.min(255, Math.max(0, this.rgb.r + bm));
	    var cg = Math.min(255, Math.max(0, this.rgb.g + bm));
	    var cb = Math.min(255, Math.max(0, this.rgb.b + bm));
	    var hex = Color.rgb2hex(cr, cg, cb);
	    return new Color(hex);
	};

	/**
	 * Output color in hex format
	 * @param addHash Add a hash character to the beginning of the output
	 */
	Color.prototype.toHex = function(addHash) {
	    return (addHash ? '#' : '') + this.raw.toString(16);
	};

	/**
	 * Returns whether or not current color is lighter than another color
	 * @param color Color to compare against
	 */
	Color.prototype.lighterThan = function(color) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    return this.yuv.y > color.yuv.y;
	};

	/**
	 * Returns the result of mixing current color with another color
	 * @param color Color to mix with
	 * @param multiplier How much to mix with the other color
	 */
	/*
	Color.prototype.mix = function (color, multiplier) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    var r = this.rgb.r;
	    var g = this.rgb.g;
	    var b = this.rgb.b;
	    var a = this.alpha;

	    var m = typeof multiplier !== 'undefined' ? multiplier : 0.5;

	    //todo: write a lerp function
	    r = r + m * (color.rgb.r - r);
	    g = g + m * (color.rgb.g - g);
	    b = b + m * (color.rgb.b - b);
	    a = a + m * (color.alpha - a);

	    return new Color(Color.rgbToHex(r, g, b), {
	        'alpha': a
	    });
	};
	*/

	/**
	 * Returns the result of blending another color on top of current color with alpha
	 * @param color Color to blend on top of current color, i.e. "Ca"
	 */
	//todo: see if .blendAlpha can be merged into .mix
	Color.prototype.blendAlpha = function(color) {
	    if (!(color instanceof Color)) {
	        color = new Color(color);
	    }

	    var Ca = color;
	    var Cb = this;

	    //todo: write alpha blending function
	    var r = Ca.alpha * Ca.rgb.r + (1 - Ca.alpha) * Cb.rgb.r;
	    var g = Ca.alpha * Ca.rgb.g + (1 - Ca.alpha) * Cb.rgb.g;
	    var b = Ca.alpha * Ca.rgb.b + (1 - Ca.alpha) * Cb.rgb.b;

	    return new Color(Color.rgb2hex(r, g, b));
	};

	module.exports = Color;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = {
	  'version': '2.9.9',
	  'svg_ns': 'http://www.w3.org/2000/svg'
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_77680__) {

	var shaven = __nested_webpack_require_77680__(13).default;

	var SVG = __nested_webpack_require_77680__(8);
	var constants = __nested_webpack_require_77680__(11);
	var utils = __nested_webpack_require_77680__(7);

	var SVG_NS = constants.svg_ns;

	var templates = {
	  'element': function (options) {
	    var tag = options.tag;
	    var content = options.content || '';
	    delete options.tag;
	    delete options.content;
	    return  [tag, content, options];
	  }
	};

	//todo: deprecate tag arg, infer tag from shape object
	function convertShape (shape, tag) {
	  return templates.element({
	    'tag': tag,
	    'width': shape.width,
	    'height': shape.height,
	    'fill': shape.properties.fill
	  });
	}

	function textCss (properties) {
	  return utils.cssProps({
	    'fill': properties.fill,
	    'font-weight': properties.font.weight,
	    'font-family': properties.font.family + ', monospace',
	    'font-size': properties.font.size + properties.font.units
	  });
	}

	function outlinePath (bgWidth, bgHeight, outlineWidth) {
	  var outlineOffsetWidth = outlineWidth / 2;

	  return [
	    'M', outlineOffsetWidth, outlineOffsetWidth,
	    'H', bgWidth - outlineOffsetWidth,
	    'V', bgHeight - outlineOffsetWidth,
	    'H', outlineOffsetWidth,
	    'V', 0,
	    'M', 0, outlineOffsetWidth,
	    'L', bgWidth, bgHeight - outlineOffsetWidth,
	    'M', 0, bgHeight - outlineOffsetWidth,
	    'L', bgWidth, outlineOffsetWidth
	  ].join(' ');
	}

	module.exports = function (sceneGraph, renderSettings) {
	  var engineSettings = renderSettings.engineSettings;
	  var stylesheets = engineSettings.stylesheets;
	  var stylesheetXml = stylesheets.map(function (stylesheet) {
	    return '<?xml-stylesheet rel="stylesheet" href="' + stylesheet + '"?>';
	  }).join('\n');

	  var holderId = 'holder_' + Number(new Date()).toString(16);

	  var root = sceneGraph.root;
	  var textGroup = root.children.holderTextGroup;

	  var css = '#' + holderId + ' text { ' + textCss(textGroup.properties) + ' } ';

	  // push text down to be equally vertically aligned with canvas renderer
	  textGroup.y += textGroup.textPositionData.boundingBox.height * 0.8;

	  var wordTags = [];

	  Object.keys(textGroup.children).forEach(function (lineKey) {
	    var line = textGroup.children[lineKey];

	    Object.keys(line.children).forEach(function (wordKey) {
	      var word = line.children[wordKey];
	      var x = textGroup.x + line.x + word.x;
	      var y = textGroup.y + line.y + word.y;
	      var wordTag = templates.element({
	        'tag': 'text',
	        'content': word.properties.text,
	        'x': x,
	        'y': y
	      });

	      wordTags.push(wordTag);
	    });
	  });

	  var text = templates.element({
	    'tag': 'g',
	    'content': wordTags
	  });

	  var outline = null;

	  if (root.children.holderBg.properties.outline) {
	    var outlineProperties = root.children.holderBg.properties.outline;
	    outline = templates.element({
	      'tag': 'path',
	      'd': outlinePath(root.children.holderBg.width, root.children.holderBg.height, outlineProperties.width),
	      'stroke-width': outlineProperties.width,
	      'stroke': outlineProperties.fill,
	      'fill': 'none'
	    });
	  }

	  var bg = convertShape(root.children.holderBg, 'rect');

	  var sceneContent = [];

	  sceneContent.push(bg);
	  if (outlineProperties) {
	    sceneContent.push(outline);
	  }
	  sceneContent.push(text);

	  var scene = templates.element({
	    'tag': 'g',
	    'id': holderId,
	    'content': sceneContent
	  });

	  var style = templates.element({
	    'tag': 'style',
	    //todo: figure out how to add CDATA directive
	    'content': css,
	    'type': 'text/css'
	  });

	  var defs = templates.element({
	    'tag': 'defs',
	    'content': style
	  });

	  var svg = templates.element({
	    'tag': 'svg',
	    'content': [defs, scene],
	    'width': root.properties.width,
	    'height': root.properties.height,
	    'xmlns': SVG_NS,
	    'viewBox': [0, 0, root.properties.width, root.properties.height].join(' '),
	    'preserveAspectRatio': 'none'
	  });

	  var output = String(shaven(svg));

	  if (/&amp;(x)?#[0-9A-Fa-f]/.test(output[0])) {
	    output = output.replace(/&amp;#/gm, '&#');
	  }

	  output = stylesheetXml + output;

	  var svgString = SVG.svgStringToDataURI(output, renderSettings.mode === 'background');

	  return svgString;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_82078__) {

	// vendored shaven 1.3.0 due to published package.json including an outdated node engine
	module.exports = __nested_webpack_require_82078__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __nested_webpack_require_82289__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = shaven;

	var _parseSugarString = __nested_webpack_require_82289__(15);

	var _parseSugarString2 = _interopRequireDefault(_parseSugarString);

	var _escape = __nested_webpack_require_82289__(16);

	var escape = _interopRequireWildcard(_escape);

	var _defaults = __nested_webpack_require_82289__(17);

	var _defaults2 = _interopRequireDefault(_defaults);

	var _mapAttributeValue = __nested_webpack_require_82289__(18);

	var _mapAttributeValue2 = _interopRequireDefault(_mapAttributeValue);

	var _assert = __nested_webpack_require_82289__(21);

	var _assert2 = _interopRequireDefault(_assert);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function shaven(arrayOrObject) {
	  var isArray = Array.isArray(arrayOrObject);
	  var objType = typeof arrayOrObject === 'undefined' ? 'undefined' : _typeof(arrayOrObject);

	  if (!isArray && objType !== 'object') {
	    throw new Error('Argument must be either an array or an object ' + 'and not ' + JSON.stringify(arrayOrObject));
	  }

	  if (isArray && arrayOrObject.length === 0) {
	    // Ignore empty arrays
	    return {};
	  }

	  var config = {};
	  var elementArray = [];

	  if (Array.isArray(arrayOrObject)) {
	    elementArray = arrayOrObject.slice(0);
	  } else {
	    elementArray = arrayOrObject.elementArray.slice(0);
	    config = Object.assign(config, arrayOrObject);
	    delete config.elementArray;
	  }

	  config = Object.assign({}, _defaults2.default, config, {
	    returnObject: { // Shaven object to return at last
	      ids: {},
	      references: {}
	    }
	  });

	  function createElement(sugarString) {
	    var properties = (0, _parseSugarString2.default)(sugarString);
	    var element = {
	      tag: properties.tag,
	      attr: {},
	      children: []
	    };

	    if (properties.id) {
	      element.attr.id = properties.id;
	      (0, _assert2.default)(!config.returnObject.ids.hasOwnProperty(properties.id), 'Ids must be unique and "' + properties.id + '" is already assigned');
	      config.returnObject.ids[properties.id] = element;
	    }
	    if (properties.class) {
	      element.attr.class = properties.class;
	    }
	    if (properties.reference) {
	      (0, _assert2.default)(!config.returnObject.ids.hasOwnProperty(properties.reference), 'References must be unique and "' + properties.id + '" is already assigned');
	      config.returnObject.references[properties.reference] = element;
	    }

	    config.escapeHTML = properties.escapeHTML != null ? properties.escapeHTML : config.escapeHTML;

	    return element;
	  }

	  function buildDom(elemArray) {
	    if (Array.isArray(elemArray) && elemArray.length === 0) {
	      // Ignore empty arrays
	      return {};
	    }

	    var index = 1;
	    var createdCallback = void 0;
	    var selfClosingHTMLTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
	    // Clone to avoid mutation problems
	    var array = elemArray.slice(0);

	    if (typeof array[0] === 'string') {
	      array[0] = createElement(array[0]);
	    } else if (Array.isArray(array[0])) {
	      index = 0;
	    } else {
	      throw new Error('First element of array must be a string, ' + 'or an array and not ' + JSON.stringify(array[0]));
	    }

	    for (; index < array.length; index++) {

	      // Don't render element if value is false or null
	      if (array[index] === false || array[index] === null) {
	        array[0] = false;
	        break;
	      }

	      // Continue with next array value if current value is undefined or true
	      else if (array[index] === undefined || array[index] === true) {
	          continue;
	        } else if (typeof array[index] === 'string') {
	          if (config.escapeHTML) {
	            // eslint-disable-next-line new-cap
	            array[index] = escape.HTML(array[index]);
	          }

	          array[0].children.push(array[index]);
	        } else if (typeof array[index] === 'number') {

	          array[0].children.push(array[index]);
	        } else if (Array.isArray(array[index])) {

	          if (Array.isArray(array[index][0])) {
	            array[index].reverse().forEach(function (subArray) {
	              // eslint-disable-line no-loop-func
	              array.splice(index + 1, 0, subArray);
	            });

	            if (index !== 0) continue;
	            index++;
	          }

	          array[index] = buildDom(array[index]);

	          if (array[index][0]) {
	            array[0].children.push(array[index][0]);
	          }
	        } else if (typeof array[index] === 'function') {
	          createdCallback = array[index];
	        } else if (_typeof(array[index]) === 'object') {
	          for (var attributeKey in array[index]) {
	            if (!array[index].hasOwnProperty(attributeKey)) continue;

	            var attributeValue = array[index][attributeKey];

	            if (array[index].hasOwnProperty(attributeKey) && attributeValue !== null && attributeValue !== false) {
	              array[0].attr[attributeKey] = (0, _mapAttributeValue2.default)(attributeKey, attributeValue);
	            }
	          }
	        } else {
	          throw new TypeError('"' + array[index] + '" is not allowed as a value');
	        }
	    }

	    if (array[0] !== false) {
	      var HTMLString = '<' + array[0].tag;

	      for (var key in array[0].attr) {
	        if (array[0].attr.hasOwnProperty(key)) {
	          var _attributeValue = escape.attribute(array[0].attr[key]);
	          var value = _attributeValue;

	          if (config.quoteAttributes || /[ "'=<>]/.test(_attributeValue)) {
	            value = config.quotationMark + _attributeValue + config.quotationMark;
	          }

	          HTMLString += ' ' + key + '=' + value;
	        }
	      }

	      HTMLString += '>';

	      if (!(selfClosingHTMLTags.indexOf(array[0].tag) !== -1)) {
	        array[0].children.forEach(function (child) {
	          return HTMLString += child;
	        });

	        HTMLString += '</' + array[0].tag + '>';
	      }

	      array[0] = HTMLString;
	    }

	    // Return root element on index 0
	    config.returnObject[0] = array[0];
	    config.returnObject.rootElement = array[0];

	    config.returnObject.toString = function () {
	      return array[0];
	    };

	    if (createdCallback) createdCallback(array[0]);

	    return config.returnObject;
	  }

	  return buildDom(elementArray);
	}

	shaven.setDefaults = function (object) {
	  Object.assign(_defaults2.default, object);
	  return shaven;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (sugarString) {
	  var tags = sugarString.match(/^[\w-]+/);
	  var properties = {
	    tag: tags ? tags[0] : 'div'
	  };
	  var ids = sugarString.match(/#([\w-]+)/);
	  var classes = sugarString.match(/\.[\w-]+/g);
	  var references = sugarString.match(/\$([\w-]+)/);

	  if (ids) properties.id = ids[1];

	  if (classes) {
	    properties.class = classes.join(' ').replace(/\./g, '');
	  }

	  if (references) properties.reference = references[1];

	  if (sugarString.endsWith('&') || sugarString.endsWith('!')) {
	    properties.escapeHTML = false;
	  }

	  return properties;
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.attribute = attribute;
	exports.HTML = HTML;
	function attribute(string) {
	  return string || string === 0 ? String(string).replace(/&/g, '&amp;').replace(/"/g, '&quot;') : '';
	}

	function HTML(string) {
	  return String(string).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  namespace: 'xhtml',
	  autoNamespacing: true,
	  escapeHTML: true,
	  quotationMark: '"',
	  quoteAttributes: true,
	  convertTransformArray: true
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __nested_webpack_require_91112__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _buildTransformString = __nested_webpack_require_91112__(19);

	var _buildTransformString2 = _interopRequireDefault(_buildTransformString);

	var _stringifyStyleObject = __nested_webpack_require_91112__(20);

	var _stringifyStyleObject2 = _interopRequireDefault(_stringifyStyleObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (key, value) {
	  if (value === undefined) {
	    return '';
	  }

	  if (key === 'style' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	    return (0, _stringifyStyleObject2.default)(value);
	  }

	  if (key === 'transform' && Array.isArray(value)) {
	    return (0, _buildTransformString2.default)(value);
	  }

	  return value;
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// Create transform string from list transform objects

	exports.default = function (transformObjects) {

	  return transformObjects.map(function (transformation) {
	    var values = [];

	    if (transformation.type === 'rotate' && transformation.degrees) {
	      values.push(transformation.degrees);
	    }
	    if (transformation.x) values.push(transformation.x);
	    if (transformation.y) values.push(transformation.y);

	    return transformation.type + '(' + values + ')';
	  }).join(' ');
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function sanitizeProperties(key, value) {
	  if (value === null || value === false || value === undefined) return;
	  if (typeof value === 'string' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return value;

	  return String(value);
	}

	exports.default = function (styleObject) {
	  return JSON.stringify(styleObject, sanitizeProperties).slice(2, -2).replace(/","/g, ';').replace(/":"/g, ':').replace(/\\"/g, '\'');
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __nested_webpack_require_93821__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var objectAssign = __nested_webpack_require_93821__(22);

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:
	// NB: The URL to the CommonJS spec is kept just for tradition.
	//     node-assert has evolved a lot since then, both in API and behavior.

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __nested_webpack_require_93821__(23);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	// Expose a strict only variant of assert
	function strict(value, message) {
	  if (!value) fail(value, true, message, '==', strict);
	}
	assert.strict = objectAssign(strict, assert, {
	  equal: assert.strictEqual,
	  deepEqual: assert.deepStrictEqual,
	  notEqual: assert.notStrictEqual,
	  notDeepEqual: assert.notDeepStrictEqual
	});
	assert.strict.strict = assert.strict;

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __nested_webpack_require_112702__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __nested_webpack_require_112702__(25);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __nested_webpack_require_112702__(26);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __nested_webpack_require_112702__(24)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 27 */
/***/ (function(module, exports, __nested_webpack_require_135660__) {

	var DOM = __nested_webpack_require_135660__(9);
	var utils = __nested_webpack_require_135660__(7);

	module.exports = (function() {
	    var canvas = DOM.newEl('canvas');
	    var ctx = null;

	    return function(sceneGraph) {
	        if (ctx == null) {
	            ctx = canvas.getContext('2d');
	        }

	        var dpr = utils.canvasRatio();
	        var root = sceneGraph.root;
	        canvas.width = dpr * root.properties.width;
	        canvas.height = dpr * root.properties.height ;
	        ctx.textBaseline = 'middle';

	        var bg = root.children.holderBg;
	        var bgWidth = dpr * bg.width;
	        var bgHeight = dpr * bg.height;
	        //todo: parametrize outline width (e.g. in scene object)
	        var outlineWidth = 2;
	        var outlineOffsetWidth = outlineWidth / 2;

	        ctx.fillStyle = bg.properties.fill;
	        ctx.fillRect(0, 0, bgWidth, bgHeight);

	        if (bg.properties.outline) {
	            //todo: abstract this into a method
	            ctx.strokeStyle = bg.properties.outline.fill;
	            ctx.lineWidth = bg.properties.outline.width;
	            ctx.moveTo(outlineOffsetWidth, outlineOffsetWidth);
	            // TL, TR, BR, BL
	            ctx.lineTo(bgWidth - outlineOffsetWidth, outlineOffsetWidth);
	            ctx.lineTo(bgWidth - outlineOffsetWidth, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(outlineOffsetWidth, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(outlineOffsetWidth, outlineOffsetWidth);
	            // Diagonals
	            ctx.moveTo(0, outlineOffsetWidth);
	            ctx.lineTo(bgWidth, bgHeight - outlineOffsetWidth);
	            ctx.moveTo(0, bgHeight - outlineOffsetWidth);
	            ctx.lineTo(bgWidth, outlineOffsetWidth);
	            ctx.stroke();
	        }

	        var textGroup = root.children.holderTextGroup;
	        ctx.font = textGroup.properties.font.weight + ' ' + (dpr * textGroup.properties.font.size) + textGroup.properties.font.units + ' ' + textGroup.properties.font.family + ', monospace';
	        ctx.fillStyle = textGroup.properties.fill;

	        for (var lineKey in textGroup.children) {
	            var line = textGroup.children[lineKey];
	            for (var wordKey in line.children) {
	                var word = line.children[wordKey];
	                var x = dpr * (textGroup.x + line.x + word.x);
	                var y = dpr * (textGroup.y + line.y + word.y + (textGroup.properties.leading / 2));

	                ctx.fillText(word.properties.text, x, y);
	            }
	        }

	        return canvas.toDataURL('image/png');
	    };
	})();

/***/ })
/******/ ])
});
;
(function(ctx, isMeteorPackage) {
    if (isMeteorPackage) {
        Holder = ctx.Holder;
    }
})(this, typeof Meteor !== 'undefined' && typeof Package !== 'undefined');


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./node_modules/holderjs/holder.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaG9sZGVyanMvaG9sZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELDREQUE0RDtBQUM3RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscURBQXFEO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxtQkFBbUI7O0FBRWhFO0FBQ0E7QUFDQSxzQ0FBc0MsbUJBQW1COztBQUV6RDtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGtDQUFrQztBQUN2RSxxQ0FBcUMsc0NBQXNDO0FBQzNFLHlDQUF5QyxzQ0FBc0M7O0FBRS9FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLHNDQUFzQzs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjtBQUNs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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQSw2QkFBNkIsNEJBQTRCLGFBQWEsRUFBRTs7QUFFeEUsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw2QkFBNkIsNEJBQTRCLGFBQWEsRUFBRTs7QUFFeEUsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBLFdBQVcsc0JBQXNCOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7O0FBRVY7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usd0JBQXdCO0FBQzlGOztBQUVBO0FBQ0EsNkNBQTZDLHdCQUF3Qix3QkFBd0Isc0JBQXNCLHNCQUFzQjtBQUN6STs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0EsaUNBQWlDLGdDQUFtQjs7QUFFcEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUYscUdBQXFHLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTNRLDZCQUE2QixnQ0FBbUI7O0FBRWhEOztBQUVBLDZCQUE2QixnQ0FBbUI7O0FBRWhEOztBQUVBLHVDQUF1Qyx1Q0FBdUMsZ0JBQWdCOztBQUU5RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGLHFHQUFxRyxtQkFBbUIsRUFBRSxtQkFBbUIsOEhBQThIOztBQUUzUTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlGQUF5RjtBQUN6Rjs7QUFFQSxPQUFPO0FBQ1A7QUFDQSxpQ0FBaUMsZ0NBQW1COztBQUVwRCwrQ0FBK0M7O0FBRS9DLG9CQUFvQixnQ0FBbUI7O0FBRXZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGdDQUFtQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLG9EQUFvRDs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlEQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBNkMsS0FBSzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osVUFBVTtBQUNWO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixPQUFPO0FBQ1A7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiaG9sZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cbkhvbGRlciAtIGNsaWVudCBzaWRlIGltYWdlIHBsYWNlaG9sZGVyc1xuVmVyc2lvbiAyLjkuOStqbDd6XG7CqSAyMDIxIEl2YW4gTWFsb3BpbnNreSAtIGh0dHBzOi8vaW1za3kuY29cblxuU2l0ZTogICAgIGh0dHA6Ly9ob2xkZXJqcy5jb21cbklzc3VlczogICBodHRwczovL2dpdGh1Yi5jb20vaW1za3kvaG9sZGVyL2lzc3Vlc1xuTGljZW5zZTogIE1JVFxuXG4qL1xuKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgaWYgKCF3aW5kb3cuZG9jdW1lbnQpIHJldHVybjtcbiAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG4gIC8vaHR0cHM6Ly9naXRodWIuY29tL2luZXhvcmFibGV0YXNoL3BvbHlmaWxsL2Jsb2IvbWFzdGVyL3dlYi5qc1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCA9IGZ1bmN0aW9uIChzZWxlY3RvcnMpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZWxlbWVudHMgPSBbXSwgZWxlbWVudDtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICBkb2N1bWVudC5fcXNhID0gW107XG5cbiAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gc2VsZWN0b3JzICsgJ3t4LXFzYTpleHByZXNzaW9uKGRvY3VtZW50Ll9xc2EgJiYgZG9jdW1lbnQuX3FzYS5wdXNoKHRoaXMpKX0nO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgMCk7XG4gICAgICAgIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG4gICAgICAgIHdoaWxlIChkb2N1bWVudC5fcXNhLmxlbmd0aCkge1xuICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5fcXNhLnNoaWZ0KCk7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ3gtcXNhJyk7XG4gICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5fcXNhID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzKTtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50cy5sZW5ndGgpID8gZWxlbWVudHNbMF0gOiBudWxsO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lcykge1xuICAgICAgICBjbGFzc05hbWVzID0gU3RyaW5nKGNsYXNzTmFtZXMpLnJlcGxhY2UoL158XFxzKy9nLCAnLicpO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWVzKTtcbiAgICAgIH07XG4gICAgfVxuXG4gIC8vaHR0cHM6Ly9naXRodWIuY29tL2luZXhvcmFibGV0YXNoL3BvbHlmaWxsXG4gIC8vIEVTNSAxNS4yLjMuMTQgT2JqZWN0LmtleXMgKCBPIClcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcbiAgaWYgKCFPYmplY3Qua2V5cykge1xuICAgIE9iamVjdC5rZXlzID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgIGlmIChvICE9PSBPYmplY3QobykpIHsgdGhyb3cgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdCcpOyB9XG4gICAgICB2YXIgcmV0ID0gW10sIHA7XG4gICAgICBmb3IgKHAgaW4gbykge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSB7XG4gICAgICAgICAgcmV0LnB1c2gocCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEVTNSAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2ggKCBjYWxsYmFja2ZuIFsgLCB0aGlzQXJnIF0gKVxuICAvLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcbiAgaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZ1biAvKiwgdGhpc3AgKi8pIHtcbiAgICAgIGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXG4gICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcbiAgICAgIGlmICh0eXBlb2YgZnVuICE9PSBcImZ1bmN0aW9uXCIpIHsgdGhyb3cgVHlwZUVycm9yKCk7IH1cblxuICAgICAgdmFyIHRoaXNwID0gYXJndW1lbnRzWzFdLCBpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChpIGluIHQpIHtcbiAgICAgICAgICBmdW4uY2FsbCh0aGlzcCwgdFtpXSwgaSwgdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy9odHRwczovL2dpdGh1Yi5jb20vaW5leG9yYWJsZXRhc2gvcG9seWZpbGwvYmxvYi9tYXN0ZXIvd2ViLmpzXG4gIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgdmFyIEI2NF9BTFBIQUJFVCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG4gICAgZ2xvYmFsLmF0b2IgPSBnbG9iYWwuYXRvYiB8fCBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIGlucHV0ID0gU3RyaW5nKGlucHV0KTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IDAsXG4gICAgICAgICAgb3V0cHV0ID0gW10sXG4gICAgICAgICAgYnVmZmVyID0gMCwgYml0cyA9IDAsIG47XG5cbiAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIGlmICgoaW5wdXQubGVuZ3RoICUgNCkgPT09IDApIHsgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89KyQvLCAnJyk7IH1cbiAgICAgIGlmICgoaW5wdXQubGVuZ3RoICUgNCkgPT09IDEpIHsgdGhyb3cgRXJyb3IoJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcicpOyB9XG4gICAgICBpZiAoL1teKy8wLTlBLVphLXpdLy50ZXN0KGlucHV0KSkgeyB0aHJvdyBFcnJvcignSW52YWxpZENoYXJhY3RlckVycm9yJyk7IH1cblxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIG4gPSBCNjRfQUxQSEFCRVQuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcbiAgICAgICAgYnVmZmVyID0gKGJ1ZmZlciA8PCA2KSB8IG47XG4gICAgICAgIGJpdHMgKz0gNjtcblxuICAgICAgICBpZiAoYml0cyA9PT0gMjQpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKChidWZmZXIgPj4gMTYpICYgMHhGRikpO1xuICAgICAgICAgIG91dHB1dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKGJ1ZmZlciA+PiAgOCkgJiAweEZGKSk7XG4gICAgICAgICAgb3V0cHV0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShidWZmZXIgJiAweEZGKSk7XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgYnVmZmVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbiArPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoYml0cyA9PT0gMTIpIHtcbiAgICAgICAgYnVmZmVyID0gYnVmZmVyID4+IDQ7XG4gICAgICAgIG91dHB1dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyICYgMHhGRikpO1xuICAgICAgfSBlbHNlIGlmIChiaXRzID09PSAxOCkge1xuICAgICAgICBidWZmZXIgPSBidWZmZXIgPj4gMjtcbiAgICAgICAgb3V0cHV0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgoYnVmZmVyID4+IDgpICYgMHhGRikpO1xuICAgICAgICBvdXRwdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZmZlciAmIDB4RkYpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgZ2xvYmFsLmJ0b2EgPSBnbG9iYWwuYnRvYSB8fCBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIGlucHV0ID0gU3RyaW5nKGlucHV0KTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IDAsXG4gICAgICAgICAgb3V0ID0gW10sXG4gICAgICAgICAgbzEsIG8yLCBvMyxcbiAgICAgICAgICBlMSwgZTIsIGUzLCBlNDtcblxuICAgICAgaWYgKC9bXlxceDAwLVxceEZGXS8udGVzdChpbnB1dCkpIHsgdGhyb3cgRXJyb3IoJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcicpOyB9XG5cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICBvMSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24rKyk7XG4gICAgICAgIG8yID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbisrKTtcbiAgICAgICAgbzMgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKyspO1xuXG4gICAgICAgIC8vIDExMTExMSAxMTIyMjIgMjIyMjMzIDMzMzMzM1xuICAgICAgICBlMSA9IG8xID4+IDI7XG4gICAgICAgIGUyID0gKChvMSAmIDB4MykgPDwgNCkgfCAobzIgPj4gNCk7XG4gICAgICAgIGUzID0gKChvMiAmIDB4ZikgPDwgMikgfCAobzMgPj4gNik7XG4gICAgICAgIGU0ID0gbzMgJiAweDNmO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gaW5wdXQubGVuZ3RoICsgMikge1xuICAgICAgICAgIGUzID0gNjQ7IGU0ID0gNjQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zaXRpb24gPT09IGlucHV0Lmxlbmd0aCArIDEpIHtcbiAgICAgICAgICBlNCA9IDY0O1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0LnB1c2goQjY0X0FMUEhBQkVULmNoYXJBdChlMSksXG4gICAgICAgICAgICAgICAgIEI2NF9BTFBIQUJFVC5jaGFyQXQoZTIpLFxuICAgICAgICAgICAgICAgICBCNjRfQUxQSEFCRVQuY2hhckF0KGUzKSxcbiAgICAgICAgICAgICAgICAgQjY0X0FMUEhBQkVULmNoYXJBdChlNCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH07XG4gIH0od2luZG93KSk7XG5cbiAgLy9odHRwczovL2dpc3QuZ2l0aHViLmNvbS9qaW1laC8zMzIzNTdcbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KXtcbiAgICAgIC8qanNoaW50IC1XMDAxLCAtVzEwMyAqL1xuICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIHZhciBwcm90byA9IHRoaXMuX19wcm90b19fIHx8IHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgcmV0dXJuIChwcm9wIGluIHRoaXMpICYmICghKHByb3AgaW4gcHJvdG8pIHx8IHByb3RvW3Byb3BdICE9PSB0aGlzW3Byb3BdKTtcbiAgICB9O1xuICAgICAgLypqc2hpbnQgK1cwMDEsICtXMTAzICovXG4gIH1cblxuICAvLyBAbGljZW5zZSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gIC8vIGNvcHlyaWdodCBQYXVsIElyaXNoIDIwMTVcblxuXG4gIC8vIERhdGUubm93KCkgaXMgc3VwcG9ydGVkIGV2ZXJ5d2hlcmUgZXhjZXB0IElFOC4gRm9yIElFOCB3ZSB1c2UgdGhlIERhdGUubm93IHBvbHlmaWxsXG4gIC8vICAgZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvcG9seWZpbGwtc2VydmljZS9ibG9iL21hc3Rlci9wb2x5ZmlsbHMvRGF0ZS5ub3cvcG9seWZpbGwuanNcbiAgLy8gYXMgU2FmYXJpIDYgZG9lc24ndCBoYXZlIHN1cHBvcnQgZm9yIE5hdmlnYXRpb25UaW1pbmcsIHdlIHVzZSBhIERhdGUubm93KCkgdGltZXN0YW1wIGZvciByZWxhdGl2ZSB2YWx1ZXNcblxuICAvLyBpZiB5b3Ugd2FudCB2YWx1ZXMgc2ltaWxhciB0byB3aGF0IHlvdSdkIGdldCB3aXRoIHJlYWwgcGVyZi5ub3csIHBsYWNlIHRoaXMgdG93YXJkcyB0aGUgaGVhZCBvZiB0aGUgcGFnZVxuICAvLyBidXQgaW4gcmVhbGl0eSwgeW91J3JlIGp1c3QgZ2V0dGluZyB0aGUgZGVsdGEgYmV0d2VlbiBub3coKSBjYWxscywgc28gaXQncyBub3QgdGVycmlibHkgaW1wb3J0YW50IHdoZXJlIGl0J3MgcGxhY2VkXG5cblxuICAoZnVuY3Rpb24oKXtcblxuICAgIGlmICgncGVyZm9ybWFuY2UnIGluIHdpbmRvdyA9PT0gZmFsc2UpIHtcbiAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlID0ge307XG4gICAgfVxuICAgIFxuICAgIERhdGUubm93ID0gKERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHsgIC8vIHRoYW5rcyBJRThcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9KTtcblxuICAgIGlmICgnbm93JyBpbiB3aW5kb3cucGVyZm9ybWFuY2UgPT09IGZhbHNlKXtcbiAgICAgIFxuICAgICAgdmFyIG5vd09mZnNldCA9IERhdGUubm93KCk7XG4gICAgICBcbiAgICAgIGlmIChwZXJmb3JtYW5jZS50aW1pbmcgJiYgcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCl7XG4gICAgICAgIG5vd09mZnNldCA9IHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPSBmdW5jdGlvbiBub3coKXtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCkgLSBub3dPZmZzZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICB9KSgpO1xuXG4gIC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsIGZvciBvbGRlciBGaXJlZm94L0Nocm9tZSB2ZXJzaW9uc1xuICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICBpZiAod2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvcG9seWZpbGwtc2VydmljZS9ibG9iL21hc3Rlci9wb2x5ZmlsbHMvcmVxdWVzdEFuaW1hdGlvbkZyYW1lL3BvbHlmaWxsLXdlYmtpdC5qc1xuICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGdsb2JhbC5wZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZ2xvYmFsLndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgIH0od2luZG93KSk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL3BvbHlmaWxsLXNlcnZpY2UvYmxvYi9tYXN0ZXIvcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS9wb2x5ZmlsbC1tb3ouanNcbiAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhnbG9iYWwucGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGdsb2JhbC5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGdsb2JhbC5tb3pDYW5jZWxBbmltYXRpb25GcmFtZTtcbiAgICB9KHdpbmRvdykpO1xuICAgIH0gZWxzZSB7XG4gICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgIGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgfTtcblxuICAgICAgZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZ2xvYmFsLmNsZWFyVGltZW91dDtcbiAgICB9KSh3aW5kb3cpO1xuICAgIH1cbiAgfVxufSkodGhpcyk7XG5cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkhvbGRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJIb2xkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdEhvbGRlci5qcyAtIGNsaWVudCBzaWRlIGltYWdlIHBsYWNlaG9sZGVyc1xuXHQoYykgMjAxMi0yMDIwIEl2YW4gTWFsb3BpbnNreSAtIGh0dHBzOi8vaW1za3kuY29cblx0Ki9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkgey8qXG5cdEhvbGRlci5qcyAtIGNsaWVudCBzaWRlIGltYWdlIHBsYWNlaG9sZGVyc1xuXHQoYykgMjAxMi0yMDIwIEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jb1xuXHQqL1xuXG5cdC8vTGlicmFyaWVzIGFuZCBmdW5jdGlvbnNcblx0dmFyIG9uRG9tUmVhZHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgcXVlcnlzdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBTY2VuZUdyYXBoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIHV0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblx0dmFyIFNWRyA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cdHZhciBET00gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXHR2YXIgQ29sb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblx0dmFyIGNvbnN0YW50cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG5cdHZhciBzdmdSZW5kZXJlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuXHR2YXIgc2dDYW52YXNSZW5kZXJlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpO1xuXG5cdHZhciBleHRlbmQgPSB1dGlscy5leHRlbmQ7XG5cdHZhciBkaW1lbnNpb25DaGVjayA9IHV0aWxzLmRpbWVuc2lvbkNoZWNrO1xuXG5cdC8vQ29uc3RhbnRzIGFuZCBkZWZpbml0aW9uc1xuXHR2YXIgU1ZHX05TID0gY29uc3RhbnRzLnN2Z19ucztcblxuXHR2YXIgSG9sZGVyID0ge1xuXHQgICAgdmVyc2lvbjogY29uc3RhbnRzLnZlcnNpb24sXG5cblx0ICAgIC8qKlxuXHQgICAgICogQWRkcyBhIHRoZW1lIHRvIGRlZmF1bHQgc2V0dGluZ3Ncblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGVtZSBuYW1lXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gdGhlbWUgVGhlbWUgb2JqZWN0LCB3aXRoIGZvcmVncm91bmQsIGJhY2tncm91bmQsIHNpemUsIGZvbnQsIGFuZCBmb250d2VpZ2h0IHByb3BlcnRpZXMuXG5cdCAgICAgKi9cblx0ICAgIGFkZFRoZW1lOiBmdW5jdGlvbihuYW1lLCB0aGVtZSkge1xuXHQgICAgICAgIG5hbWUgIT0gbnVsbCAmJiB0aGVtZSAhPSBudWxsICYmIChBcHAuc2V0dGluZ3MudGhlbWVzW25hbWVdID0gdGhlbWUpO1xuXHQgICAgICAgIGRlbGV0ZSBBcHAudmFycy5jYWNoZS50aGVtZUtleXM7XG5cdCAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICB9LFxuXG5cdCAgICAvKipcblx0ICAgICAqIEFwcGVuZHMgYSBwbGFjZWhvbGRlciB0byBhbiBlbGVtZW50XG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtzdHJpbmd9IHNyYyBQbGFjZWhvbGRlciBVUkwgc3RyaW5nXG5cdCAgICAgKiBAcGFyYW0gZWwgQSBzZWxlY3RvciBvciBhIHJlZmVyZW5jZSB0byBhIERPTSBub2RlXG5cdCAgICAgKi9cblx0ICAgIGFkZEltYWdlOiBmdW5jdGlvbihzcmMsIGVsKSB7XG5cdCAgICAgICAgLy90b2RvOiB1c2UganF1ZXJ5IGZhbGxiYWNrIGlmIGF2YWlsYWJsZSBmb3IgYWxsIFFTQSByZWZlcmVuY2VzXG5cdCAgICAgICAgdmFyIG5vZGVzID0gRE9NLmdldE5vZGVBcnJheShlbCk7XG5cdCAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgICAgICB2YXIgaW1nID0gRE9NLm5ld0VsKCdpbWcnKTtcblx0ICAgICAgICAgICAgdmFyIGRvbVByb3BzID0ge307XG5cdCAgICAgICAgICAgIGRvbVByb3BzW0FwcC5zZXR1cC5kYXRhQXR0cl0gPSBzcmM7XG5cdCAgICAgICAgICAgIERPTS5zZXRBdHRyKGltZywgZG9tUHJvcHMpO1xuXHQgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGltZyk7XG5cdCAgICAgICAgfSk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICB9LFxuXG5cdCAgICAvKipcblx0ICAgICAqIFNldHMgd2hldGhlciBvciBub3QgYW4gaW1hZ2UgaXMgdXBkYXRlZCBvbiByZXNpemUuXG5cdCAgICAgKiBJZiBhbiBpbWFnZSBpcyBzZXQgdG8gYmUgdXBkYXRlZCwgaXQgaXMgaW1tZWRpYXRlbHkgcmVuZGVyZWQuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtPYmplY3R9IGVsIEltYWdlIERPTSBlbGVtZW50XG5cdCAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlIFJlc2l6YWJsZSB1cGRhdGUgZmxhZyB2YWx1ZVxuXHQgICAgICovXG5cdCAgICBzZXRSZXNpemVVcGRhdGU6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuXHQgICAgICAgIGlmIChlbC5ob2xkZXJEYXRhKSB7XG5cdCAgICAgICAgICAgIGVsLmhvbGRlckRhdGEucmVzaXplVXBkYXRlID0gISF2YWx1ZTtcblx0ICAgICAgICAgICAgaWYgKGVsLmhvbGRlckRhdGEucmVzaXplVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB1cGRhdGVSZXNpemFibGVFbGVtZW50cyhlbCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXG5cdCAgICAvKipcblx0ICAgICAqIFJ1bnMgSG9sZGVyIHdpdGggb3B0aW9ucy4gQnkgZGVmYXVsdCBydW5zIEhvbGRlciBvbiBhbGwgaW1hZ2VzIHdpdGggXCJob2xkZXIuanNcIiBpbiB0aGVpciBzb3VyY2UgYXR0cmlidXRlcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlck9wdGlvbnMgT3B0aW9ucyBvYmplY3QsIGNhbiBjb250YWluIGRvbWFpbiwgdGhlbWVzLCBpbWFnZXMsIGFuZCBiZ25vZGVzIHByb3BlcnRpZXNcblx0ICAgICAqL1xuXHQgICAgcnVuOiBmdW5jdGlvbih1c2VyT3B0aW9ucykge1xuXHQgICAgICAgIC8vdG9kbzogc3BsaXQgcHJvY2Vzc2luZyBpbnRvIHNlcGFyYXRlIHF1ZXVlc1xuXHQgICAgICAgIHVzZXJPcHRpb25zID0gdXNlck9wdGlvbnMgfHwge307XG5cdCAgICAgICAgdmFyIGVuZ2luZVNldHRpbmdzID0ge307XG5cdCAgICAgICAgdmFyIG9wdGlvbnMgPSBleHRlbmQoQXBwLnNldHRpbmdzLCB1c2VyT3B0aW9ucyk7XG5cblx0ICAgICAgICBBcHAudmFycy5wcmVlbXB0ZWQgPSB0cnVlO1xuXHQgICAgICAgIEFwcC52YXJzLmRhdGFBdHRyID0gb3B0aW9ucy5kYXRhQXR0ciB8fCBBcHAuc2V0dXAuZGF0YUF0dHI7XG5cblx0ICAgICAgICBlbmdpbmVTZXR0aW5ncy5yZW5kZXJlciA9IG9wdGlvbnMucmVuZGVyZXIgPyBvcHRpb25zLnJlbmRlcmVyIDogQXBwLnNldHVwLnJlbmRlcmVyO1xuXHQgICAgICAgIGlmIChBcHAuc2V0dXAucmVuZGVyZXJzLmpvaW4oJywnKS5pbmRleE9mKGVuZ2luZVNldHRpbmdzLnJlbmRlcmVyKSA9PT0gLTEpIHtcblx0ICAgICAgICAgICAgZW5naW5lU2V0dGluZ3MucmVuZGVyZXIgPSBBcHAuc2V0dXAuc3VwcG9ydHNTVkcgPyAnc3ZnJyA6IChBcHAuc2V0dXAuc3VwcG9ydHNDYW52YXMgPyAnY2FudmFzJyA6ICdodG1sJyk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIGltYWdlcyA9IERPTS5nZXROb2RlQXJyYXkob3B0aW9ucy5pbWFnZXMpO1xuXHQgICAgICAgIHZhciBiZ25vZGVzID0gRE9NLmdldE5vZGVBcnJheShvcHRpb25zLmJnbm9kZXMpO1xuXHQgICAgICAgIHZhciBzdHlsZW5vZGVzID0gRE9NLmdldE5vZGVBcnJheShvcHRpb25zLnN0eWxlbm9kZXMpO1xuXHQgICAgICAgIHZhciBvYmplY3RzID0gRE9NLmdldE5vZGVBcnJheShvcHRpb25zLm9iamVjdHMpO1xuXG5cdCAgICAgICAgZW5naW5lU2V0dGluZ3Muc3R5bGVzaGVldHMgPSBbXTtcblx0ICAgICAgICBlbmdpbmVTZXR0aW5ncy5zdmdYTUxTdHlsZXNoZWV0ID0gdHJ1ZTtcblx0ICAgICAgICBlbmdpbmVTZXR0aW5ncy5ub0ZvbnRGYWxsYmFjayA9ICEhb3B0aW9ucy5ub0ZvbnRGYWxsYmFjaztcblx0ICAgICAgICBlbmdpbmVTZXR0aW5ncy5ub0JhY2tncm91bmRTaXplID0gISFvcHRpb25zLm5vQmFja2dyb3VuZFNpemU7XG5cblx0ICAgICAgICBzdHlsZW5vZGVzLmZvckVhY2goZnVuY3Rpb24gKHN0eWxlTm9kZSkge1xuXHQgICAgICAgICAgICBpZiAoc3R5bGVOb2RlLmF0dHJpYnV0ZXMucmVsICYmIHN0eWxlTm9kZS5hdHRyaWJ1dGVzLmhyZWYgJiYgc3R5bGVOb2RlLmF0dHJpYnV0ZXMucmVsLnZhbHVlID09ICdzdHlsZXNoZWV0Jykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGhyZWYgPSBzdHlsZU5vZGUuYXR0cmlidXRlcy5ocmVmLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgLy90b2RvOiB3cml0ZSBpc29tb3JwaGljIHJlbGF0aXZlLXRvLWFic29sdXRlIFVSTCBmdW5jdGlvblxuXHQgICAgICAgICAgICAgICAgdmFyIHByb3h5TGluayA9IERPTS5uZXdFbCgnYScpO1xuXHQgICAgICAgICAgICAgICAgcHJveHlMaW5rLmhyZWYgPSBocmVmO1xuXHQgICAgICAgICAgICAgICAgdmFyIHN0eWxlc2hlZXRVUkwgPSBwcm94eUxpbmsucHJvdG9jb2wgKyAnLy8nICsgcHJveHlMaW5rLmhvc3QgKyBwcm94eUxpbmsucGF0aG5hbWUgKyBwcm94eUxpbmsuc2VhcmNoO1xuXHQgICAgICAgICAgICAgICAgZW5naW5lU2V0dGluZ3Muc3R5bGVzaGVldHMucHVzaChzdHlsZXNoZWV0VVJMKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgYmdub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChiZ05vZGUpIHtcblx0ICAgICAgICAgICAgLy9Ta2lwIHByb2Nlc3NpbmcgYmFja2dyb3VuZCBub2RlcyBpZiBnZXRDb21wdXRlZFN0eWxlIGlzIHVuYXZhaWxhYmxlLCBzaW5jZSBvbmx5IG1vZGVybiBicm93c2VycyB3b3VsZCBiZSBhYmxlIHRvIHVzZSBjYW52YXMgb3IgU1ZHIHRvIHJlbmRlciB0byBiYWNrZ3JvdW5kXG5cdCAgICAgICAgICAgIGlmICghZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcblx0ICAgICAgICAgICAgdmFyIGJhY2tncm91bmRJbWFnZSA9IGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKGJnTm9kZSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1pbWFnZScpO1xuXHQgICAgICAgICAgICB2YXIgZGF0YUJhY2tncm91bmRJbWFnZSA9IGJnTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmFja2dyb3VuZC1zcmMnKTtcblx0ICAgICAgICAgICAgdmFyIHJhd1VSTCA9IGRhdGFCYWNrZ3JvdW5kSW1hZ2UgfHwgYmFja2dyb3VuZEltYWdlO1xuXG5cdCAgICAgICAgICAgIHZhciBob2xkZXJVUkwgPSBudWxsO1xuXHQgICAgICAgICAgICB2YXIgaG9sZGVyU3RyaW5nID0gb3B0aW9ucy5kb21haW4gKyAnLyc7XG5cdCAgICAgICAgICAgIHZhciBob2xkZXJTdHJpbmdJbmRleCA9IHJhd1VSTC5pbmRleE9mKGhvbGRlclN0cmluZyk7XG5cblx0ICAgICAgICAgICAgaWYgKGhvbGRlclN0cmluZ0luZGV4ID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICBob2xkZXJVUkwgPSByYXdVUkw7XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoaG9sZGVyU3RyaW5nSW5kZXggPT09IDEgJiYgcmF3VVJMWzBdID09PSAnPycpIHtcblx0ICAgICAgICAgICAgICAgIGhvbGRlclVSTCA9IHJhd1VSTC5zbGljZSgxKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IHJhd1VSTC5zdWJzdHIoaG9sZGVyU3RyaW5nSW5kZXgpLm1hdGNoKC8oW15cIl0qKVwiP1xcKS8pO1xuXHQgICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50ICE9PSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaG9sZGVyVVJMID0gZnJhZ21lbnRbMV07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhd1VSTC5pbmRleE9mKCd1cmwoJykgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aHJvdyAnSG9sZGVyOiB1bmFibGUgdG8gcGFyc2UgYmFja2dyb3VuZCBVUkw6ICcgKyByYXdVUkw7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpZiAoaG9sZGVyVVJMKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaG9sZGVyRmxhZ3MgPSBwYXJzZVVSTChob2xkZXJVUkwsIG9wdGlvbnMpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGhvbGRlckZsYWdzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcHJlcGFyZURPTUVsZW1lbnQoe1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnYmFja2dyb3VuZCcsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGVsOiBiZ05vZGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzOiBob2xkZXJGbGFncyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lU2V0dGluZ3M6IGVuZ2luZVNldHRpbmdzXG5cdCAgICAgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblxuXHQgICAgICAgIG9iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAob2JqZWN0KSB7XG5cdCAgICAgICAgICAgIHZhciBvYmplY3RBdHRyID0ge307XG5cblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIG9iamVjdEF0dHIuZGF0YSA9IG9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEnKTtcblx0ICAgICAgICAgICAgICAgIG9iamVjdEF0dHIuZGF0YVNyYyA9IG9iamVjdC5nZXRBdHRyaWJ1dGUoQXBwLnZhcnMuZGF0YUF0dHIpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgb2JqZWN0QXR0ci5lcnJvciA9IGU7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB2YXIgb2JqZWN0SGFzU3JjVVJMID0gb2JqZWN0QXR0ci5kYXRhICE9IG51bGwgJiYgb2JqZWN0QXR0ci5kYXRhLmluZGV4T2Yob3B0aW9ucy5kb21haW4pID09PSAwO1xuXHQgICAgICAgICAgICB2YXIgb2JqZWN0SGFzRGF0YVNyY1VSTCA9IG9iamVjdEF0dHIuZGF0YVNyYyAhPSBudWxsICYmIG9iamVjdEF0dHIuZGF0YVNyYy5pbmRleE9mKG9wdGlvbnMuZG9tYWluKSA9PT0gMDtcblxuXHQgICAgICAgICAgICBpZiAob2JqZWN0SGFzU3JjVVJMKSB7XG5cdCAgICAgICAgICAgICAgICBwcmVwYXJlSW1hZ2VFbGVtZW50KG9wdGlvbnMsIGVuZ2luZVNldHRpbmdzLCBvYmplY3RBdHRyLmRhdGEsIG9iamVjdCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqZWN0SGFzRGF0YVNyY1VSTCkge1xuXHQgICAgICAgICAgICAgICAgcHJlcGFyZUltYWdlRWxlbWVudChvcHRpb25zLCBlbmdpbmVTZXR0aW5ncywgb2JqZWN0QXR0ci5kYXRhU3JjLCBvYmplY3QpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSk7XG5cblx0ICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1hZ2UpIHtcblx0ICAgICAgICAgICAgdmFyIGltYWdlQXR0ciA9IHt9O1xuXG5cdCAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICBpbWFnZUF0dHIuc3JjID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0ICAgICAgICAgICAgICAgIGltYWdlQXR0ci5kYXRhU3JjID0gaW1hZ2UuZ2V0QXR0cmlidXRlKEFwcC52YXJzLmRhdGFBdHRyKTtcblx0ICAgICAgICAgICAgICAgIGltYWdlQXR0ci5yZW5kZXJlZCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1ob2xkZXItcmVuZGVyZWQnKTtcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICAgIGltYWdlQXR0ci5lcnJvciA9IGU7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB2YXIgaW1hZ2VIYXNTcmMgPSBpbWFnZUF0dHIuc3JjICE9IG51bGw7XG5cdCAgICAgICAgICAgIHZhciBpbWFnZUhhc0RhdGFTcmNVUkwgPSBpbWFnZUF0dHIuZGF0YVNyYyAhPSBudWxsICYmIGltYWdlQXR0ci5kYXRhU3JjLmluZGV4T2Yob3B0aW9ucy5kb21haW4pID09PSAwO1xuXHQgICAgICAgICAgICB2YXIgaW1hZ2VSZW5kZXJlZCA9IGltYWdlQXR0ci5yZW5kZXJlZCAhPSBudWxsICYmIGltYWdlQXR0ci5yZW5kZXJlZCA9PSAndHJ1ZSc7XG5cblx0ICAgICAgICAgICAgaWYgKGltYWdlSGFzU3JjKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaW1hZ2VBdHRyLnNyYy5pbmRleE9mKG9wdGlvbnMuZG9tYWluKSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHByZXBhcmVJbWFnZUVsZW1lbnQob3B0aW9ucywgZW5naW5lU2V0dGluZ3MsIGltYWdlQXR0ci5zcmMsIGltYWdlKTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW1hZ2VIYXNEYXRhU3JjVVJMKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy9JbWFnZSBoYXMgYSB2YWxpZCBkYXRhLXNyYyBhbmQgYW4gaW52YWxpZCBzcmNcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VSZW5kZXJlZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGFjZWhvbGRlciBoYXMgYWxyZWFkeSBiZWVuIHJlbmRlciwgcmUtcmVuZGVyIGl0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVJbWFnZUVsZW1lbnQob3B0aW9ucywgZW5naW5lU2V0dGluZ3MsIGltYWdlQXR0ci5kYXRhU3JjLCBpbWFnZSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgcGxhY2Vob2xkZXIgaGFzIG5vdCBiZWVuIHJlbmRlcmVkLCBjaGVjayBpZiB0aGUgaW1hZ2UgZXhpc3RzIGFuZCByZW5kZXIgYSBmYWxsYmFjayBpZiBpdCBkb2Vzbid0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihzcmMsIG9wdGlvbnMsIGVuZ2luZVNldHRpbmdzLCBkYXRhU3JjLCBpbWFnZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuaW1hZ2VFeGlzdHMoc3JjLCBmdW5jdGlvbihleGlzdHMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV4aXN0cykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlSW1hZ2VFbGVtZW50KG9wdGlvbnMsIGVuZ2luZVNldHRpbmdzLCBkYXRhU3JjLCBpbWFnZSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH0pKGltYWdlQXR0ci5zcmMsIG9wdGlvbnMsIGVuZ2luZVNldHRpbmdzLCBpbWFnZUF0dHIuZGF0YVNyYywgaW1hZ2UpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChpbWFnZUhhc0RhdGFTcmNVUkwpIHtcblx0ICAgICAgICAgICAgICAgIHByZXBhcmVJbWFnZUVsZW1lbnQob3B0aW9ucywgZW5naW5lU2V0dGluZ3MsIGltYWdlQXR0ci5kYXRhU3JjLCBpbWFnZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblxuXHQgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgfVxuXHR9O1xuXG5cdHZhciBBcHAgPSB7XG5cdCAgICBzZXR0aW5nczoge1xuXHQgICAgICAgIGRvbWFpbjogJ2hvbGRlci5qcycsXG5cdCAgICAgICAgaW1hZ2VzOiAnaW1nJyxcblx0ICAgICAgICBvYmplY3RzOiAnb2JqZWN0Jyxcblx0ICAgICAgICBiZ25vZGVzOiAnYm9keSAuaG9sZGVyanMnLFxuXHQgICAgICAgIHN0eWxlbm9kZXM6ICdoZWFkIGxpbmsuaG9sZGVyanMnLFxuXHQgICAgICAgIHRoZW1lczoge1xuXHQgICAgICAgICAgICAnZ3JheSc6IHtcblx0ICAgICAgICAgICAgICAgIGJnOiAnI0VFRUVFRScsXG5cdCAgICAgICAgICAgICAgICBmZzogJyNBQUFBQUEnXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICdzb2NpYWwnOiB7XG5cdCAgICAgICAgICAgICAgICBiZzogJyMzYTVhOTcnLFxuXHQgICAgICAgICAgICAgICAgZmc6ICcjRkZGRkZGJ1xuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAnaW5kdXN0cmlhbCc6IHtcblx0ICAgICAgICAgICAgICAgIGJnOiAnIzQzNEE1MicsXG5cdCAgICAgICAgICAgICAgICBmZzogJyNDMkYyMDAnXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICdza3knOiB7XG5cdCAgICAgICAgICAgICAgICBiZzogJyMwRDhGREInLFxuXHQgICAgICAgICAgICAgICAgZmc6ICcjRkZGRkZGJ1xuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAndmluZSc6IHtcblx0ICAgICAgICAgICAgICAgIGJnOiAnIzM5REJBQycsXG5cdCAgICAgICAgICAgICAgICBmZzogJyMxRTI5MkMnXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgICdsYXZhJzoge1xuXHQgICAgICAgICAgICAgICAgYmc6ICcjRjg1OTFBJyxcblx0ICAgICAgICAgICAgICAgIGZnOiAnIzFDMjg0Nidcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkZWZhdWx0czoge1xuXHQgICAgICAgIHNpemU6IDEwLFxuXHQgICAgICAgIHVuaXRzOiAncHQnLFxuXHQgICAgICAgIHNjYWxlOiAxIC8gMTZcblx0ICAgIH1cblx0fTtcblxuXHQvKipcblx0ICogUHJvY2Vzc2VzIHByb3ZpZGVkIHNvdXJjZSBhdHRyaWJ1dGUgYW5kIHNldHMgdXAgdGhlIGFwcHJvcHJpYXRlIHJlbmRlcmluZyB3b3JrZmxvd1xuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gb3B0aW9ucyBJbnN0YW5jZSBvcHRpb25zIGZyb20gSG9sZGVyLnJ1blxuXHQgKiBAcGFyYW0gcmVuZGVyU2V0dGluZ3MgSW5zdGFuY2UgY29uZmlndXJhdGlvblxuXHQgKiBAcGFyYW0gc3JjIEltYWdlIFVSTFxuXHQgKiBAcGFyYW0gZWwgSW1hZ2UgRE9NIGVsZW1lbnRcblx0ICovXG5cdGZ1bmN0aW9uIHByZXBhcmVJbWFnZUVsZW1lbnQob3B0aW9ucywgZW5naW5lU2V0dGluZ3MsIHNyYywgZWwpIHtcblx0ICAgIHZhciBob2xkZXJGbGFncyA9IHBhcnNlVVJMKHNyYy5zdWJzdHIoc3JjLmxhc3RJbmRleE9mKG9wdGlvbnMuZG9tYWluKSksIG9wdGlvbnMpO1xuXHQgICAgaWYgKGhvbGRlckZsYWdzKSB7XG5cdCAgICAgICAgcHJlcGFyZURPTUVsZW1lbnQoe1xuXHQgICAgICAgICAgICBtb2RlOiBudWxsLFxuXHQgICAgICAgICAgICBlbDogZWwsXG5cdCAgICAgICAgICAgIGZsYWdzOiBob2xkZXJGbGFncyxcblx0ICAgICAgICAgICAgZW5naW5lU2V0dGluZ3M6IGVuZ2luZVNldHRpbmdzXG5cdCAgICAgICAgfSk7XG5cdCAgICB9XG5cdH1cblxuXHQvKipcblx0ICogUHJvY2Vzc2VzIGEgSG9sZGVyIFVSTCBhbmQgZXh0cmFjdHMgY29uZmlndXJhdGlvbiBmcm9tIHF1ZXJ5IHN0cmluZ1xuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gdXJsIFVSTFxuXHQgKiBAcGFyYW0gaW5zdGFuY2VPcHRpb25zIEluc3RhbmNlIG9wdGlvbnMgZnJvbSBIb2xkZXIucnVuXG5cdCAqL1xuXHRmdW5jdGlvbiBwYXJzZVVSTCh1cmwsIGluc3RhbmNlT3B0aW9ucykge1xuXHQgICAgdmFyIGhvbGRlciA9IHtcblx0ICAgICAgICB0aGVtZTogZXh0ZW5kKEFwcC5zZXR0aW5ncy50aGVtZXMuZ3JheSwgbnVsbCksXG5cdCAgICAgICAgc3R5bGVzaGVldHM6IGluc3RhbmNlT3B0aW9ucy5zdHlsZXNoZWV0cyxcblx0ICAgICAgICBpbnN0YW5jZU9wdGlvbnM6IGluc3RhbmNlT3B0aW9uc1xuXHQgICAgfTtcblxuXHQgICAgdmFyIGZpcnN0UXVlc3Rpb25NYXJrID0gdXJsLmluZGV4T2YoJz8nKTtcblx0ICAgIHZhciBwYXJ0cyA9IFt1cmxdO1xuXG5cdCAgICBpZiAoZmlyc3RRdWVzdGlvbk1hcmsgIT09IC0xKSB7XG5cdCAgICAgICAgcGFydHMgPSBbdXJsLnNsaWNlKDAsIGZpcnN0UXVlc3Rpb25NYXJrKSwgdXJsLnNsaWNlKGZpcnN0UXVlc3Rpb25NYXJrICsgMSldO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgYmFzaWNzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcblxuXHQgICAgaG9sZGVyLmhvbGRlclVSTCA9IHVybDtcblxuXHQgICAgdmFyIGRpbWVuc2lvbnMgPSBiYXNpY3NbMV07XG5cdCAgICB2YXIgZGltZW5zaW9uRGF0YSA9IGRpbWVuc2lvbnMubWF0Y2goLyhbXFxkXStwPyl4KFtcXGRdK3A/KS8pO1xuXG5cdCAgICBpZiAoIWRpbWVuc2lvbkRhdGEpIHJldHVybiBmYWxzZTtcblxuXHQgICAgaG9sZGVyLmZsdWlkID0gZGltZW5zaW9ucy5pbmRleE9mKCdwJykgIT09IC0xO1xuXG5cdCAgICBob2xkZXIuZGltZW5zaW9ucyA9IHtcblx0ICAgICAgICB3aWR0aDogZGltZW5zaW9uRGF0YVsxXS5yZXBsYWNlKCdwJywgJyUnKSxcblx0ICAgICAgICBoZWlnaHQ6IGRpbWVuc2lvbkRhdGFbMl0ucmVwbGFjZSgncCcsICclJylcblx0ICAgIH07XG5cblx0ICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcblx0ICAgICAgICB2YXIgb3B0aW9ucyA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHBhcnRzWzFdKTtcblxuXHQgICAgICAgIC8vIERpbWVuc2lvbnNcblxuXHQgICAgICAgIGlmICh1dGlscy50cnV0aHkob3B0aW9ucy5yYXRpbykpIHtcblx0ICAgICAgICAgICAgaG9sZGVyLmZsdWlkID0gdHJ1ZTtcblx0ICAgICAgICAgICAgdmFyIHJhdGlvV2lkdGggPSBwYXJzZUZsb2F0KGhvbGRlci5kaW1lbnNpb25zLndpZHRoLnJlcGxhY2UoJyUnLCAnJykpO1xuXHQgICAgICAgICAgICB2YXIgcmF0aW9IZWlnaHQgPSBwYXJzZUZsb2F0KGhvbGRlci5kaW1lbnNpb25zLmhlaWdodC5yZXBsYWNlKCclJywgJycpKTtcblxuXHQgICAgICAgICAgICByYXRpb0hlaWdodCA9IE1hdGguZmxvb3IoMTAwICogKHJhdGlvSGVpZ2h0IC8gcmF0aW9XaWR0aCkpO1xuXHQgICAgICAgICAgICByYXRpb1dpZHRoID0gMTAwO1xuXG5cdCAgICAgICAgICAgIGhvbGRlci5kaW1lbnNpb25zLndpZHRoID0gcmF0aW9XaWR0aCArICclJztcblx0ICAgICAgICAgICAgaG9sZGVyLmRpbWVuc2lvbnMuaGVpZ2h0ID0gcmF0aW9IZWlnaHQgKyAnJSc7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaG9sZGVyLmF1dG8gPSB1dGlscy50cnV0aHkob3B0aW9ucy5hdXRvKTtcblxuXHQgICAgICAgIC8vIENvbG9yc1xuXG5cdCAgICAgICAgaWYgKG9wdGlvbnMuYmcpIHtcblx0ICAgICAgICAgICAgaG9sZGVyLnRoZW1lLmJnID0gdXRpbHMucGFyc2VDb2xvcihvcHRpb25zLmJnKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAob3B0aW9ucy5mZykge1xuXHQgICAgICAgICAgICBob2xkZXIudGhlbWUuZmcgPSB1dGlscy5wYXJzZUNvbG9yKG9wdGlvbnMuZmcpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vdG9kbzogYWRkIGF1dG9tYXRpYyBmb3JlZ3JvdW5kIHRvIHRoZW1lcyB3aXRob3V0IGZvcmVncm91bmRcblx0ICAgICAgICBpZiAob3B0aW9ucy5iZyAmJiAhb3B0aW9ucy5mZykge1xuXHQgICAgICAgICAgICBob2xkZXIuYXV0b0ZnID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAob3B0aW9ucy50aGVtZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG9sZGVyLmluc3RhbmNlT3B0aW9ucy50aGVtZXMsIG9wdGlvbnMudGhlbWUpKSB7XG5cdCAgICAgICAgICAgIGhvbGRlci50aGVtZSA9IGV4dGVuZChob2xkZXIuaW5zdGFuY2VPcHRpb25zLnRoZW1lc1tvcHRpb25zLnRoZW1lXSwgbnVsbCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gVGV4dFxuXG5cdCAgICAgICAgaWYgKG9wdGlvbnMudGV4dCkge1xuXHQgICAgICAgICAgICBob2xkZXIudGV4dCA9IG9wdGlvbnMudGV4dDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAob3B0aW9ucy50ZXh0bW9kZSkge1xuXHQgICAgICAgICAgICBob2xkZXIudGV4dG1vZGUgPSBvcHRpb25zLnRleHRtb2RlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChvcHRpb25zLnNpemUgJiYgcGFyc2VGbG9hdChvcHRpb25zLnNpemUpKSB7XG5cdCAgICAgICAgICAgIGhvbGRlci5zaXplID0gcGFyc2VGbG9hdChvcHRpb25zLnNpemUpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChvcHRpb25zLmZpeGVkU2l6ZSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgIGhvbGRlci5maXhlZFNpemUgPSB1dGlscy50cnV0aHkob3B0aW9ucy5maXhlZFNpemUpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChvcHRpb25zLmZvbnQpIHtcblx0ICAgICAgICAgICAgaG9sZGVyLmZvbnQgPSBvcHRpb25zLmZvbnQ7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pIHtcblx0ICAgICAgICAgICAgaG9sZGVyLmFsaWduID0gb3B0aW9ucy5hbGlnbjtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAob3B0aW9ucy5saW5lV3JhcCkge1xuXHQgICAgICAgICAgICBob2xkZXIubGluZVdyYXAgPSBvcHRpb25zLmxpbmVXcmFwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGhvbGRlci5ub3dyYXAgPSB1dGlscy50cnV0aHkob3B0aW9ucy5ub3dyYXApO1xuXG5cdCAgICAgICAgLy8gTWlzY2VsbGFuZW91c1xuXG5cdCAgICAgICAgaG9sZGVyLm91dGxpbmUgPSB1dGlscy50cnV0aHkob3B0aW9ucy5vdXRsaW5lKTtcblxuXHQgICAgICAgIGlmICh1dGlscy50cnV0aHkob3B0aW9ucy5yYW5kb20pKSB7XG5cdCAgICAgICAgICAgIEFwcC52YXJzLmNhY2hlLnRoZW1lS2V5cyA9IEFwcC52YXJzLmNhY2hlLnRoZW1lS2V5cyB8fCBPYmplY3Qua2V5cyhob2xkZXIuaW5zdGFuY2VPcHRpb25zLnRoZW1lcyk7XG5cdCAgICAgICAgICAgIHZhciBfdGhlbWUgPSBBcHAudmFycy5jYWNoZS50aGVtZUtleXNbMCB8IE1hdGgucmFuZG9tKCkgKiBBcHAudmFycy5jYWNoZS50aGVtZUtleXMubGVuZ3RoXTtcblx0ICAgICAgICAgICAgaG9sZGVyLnRoZW1lID0gZXh0ZW5kKGhvbGRlci5pbnN0YW5jZU9wdGlvbnMudGhlbWVzW190aGVtZV0sIG51bGwpO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIGhvbGRlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb2RpZmllcyB0aGUgRE9NIHRvIGZpdCBwbGFjZWhvbGRlcnMgYW5kIHNldHMgdXAgcmVzaXphYmxlIGltYWdlIGNhbGxiYWNrcyAoZm9yIGZsdWlkIGFuZCBhdXRvbWF0aWNhbGx5IHNpemVkIHBsYWNlaG9sZGVycylcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHNldHRpbmdzIERPTSBwcmVwIHNldHRpbmdzXG5cdCAqL1xuXHRmdW5jdGlvbiBwcmVwYXJlRE9NRWxlbWVudChwcmVwU2V0dGluZ3MpIHtcblx0ICAgIHZhciBtb2RlID0gcHJlcFNldHRpbmdzLm1vZGU7XG5cdCAgICB2YXIgZWwgPSBwcmVwU2V0dGluZ3MuZWw7XG5cdCAgICB2YXIgZmxhZ3MgPSBwcmVwU2V0dGluZ3MuZmxhZ3M7XG5cdCAgICB2YXIgX2VuZ2luZVNldHRpbmdzID0gcHJlcFNldHRpbmdzLmVuZ2luZVNldHRpbmdzO1xuXHQgICAgdmFyIGRpbWVuc2lvbnMgPSBmbGFncy5kaW1lbnNpb25zLFxuXHQgICAgICAgIHRoZW1lID0gZmxhZ3MudGhlbWU7XG5cdCAgICB2YXIgZGltZW5zaW9uc0NhcHRpb24gPSBkaW1lbnNpb25zLndpZHRoICsgJ3gnICsgZGltZW5zaW9ucy5oZWlnaHQ7XG5cdCAgICBtb2RlID0gbW9kZSA9PSBudWxsID8gKGZsYWdzLmZsdWlkID8gJ2ZsdWlkJyA6ICdpbWFnZScpIDogbW9kZTtcblx0ICAgIHZhciBob2xkZXJUZW1wbGF0ZVJlID0gL2hvbGRlcl8oW2Etel0rKS9nO1xuXHQgICAgdmFyIGRpbWVuc2lvbnNJblRleHQgPSBmYWxzZTtcblxuXHQgICAgaWYgKGZsYWdzLnRleHQgIT0gbnVsbCkge1xuXHQgICAgICAgIHRoZW1lLnRleHQgPSBmbGFncy50ZXh0O1xuXG5cdCAgICAgICAgLy88b2JqZWN0PiBTVkcgZW1iZWRkaW5nIGRvZXNuJ3QgcGFyc2UgVW5pY29kZSBwcm9wZXJseVxuXHQgICAgICAgIGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgICB2YXIgdGV4dExpbmVzID0gdGhlbWUudGV4dC5zcGxpdCgnXFxcXG4nKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0ZXh0TGluZXMubGVuZ3RoOyBrKyspIHtcblx0ICAgICAgICAgICAgICAgIHRleHRMaW5lc1trXSA9IHV0aWxzLmVuY29kZUh0bWxFbnRpdHkodGV4dExpbmVzW2tdKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGVtZS50ZXh0ID0gdGV4dExpbmVzLmpvaW4oJ1xcXFxuJyk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBpZiAodGhlbWUudGV4dCkge1xuXHQgICAgICAgIHZhciBob2xkZXJUZW1wbGF0ZU1hdGNoZXMgPSB0aGVtZS50ZXh0Lm1hdGNoKGhvbGRlclRlbXBsYXRlUmUpO1xuXG5cdCAgICAgICAgaWYgKGhvbGRlclRlbXBsYXRlTWF0Y2hlcyAhPT0gbnVsbCkge1xuXHQgICAgICAgICAgICAvL3RvZG86IG9wdGltaXplIHRlbXBsYXRlIHJlcGxhY2VtZW50XG5cdCAgICAgICAgICAgIGhvbGRlclRlbXBsYXRlTWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSAnaG9sZGVyX2RpbWVuc2lvbnMnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhlbWUudGV4dCA9IHRoZW1lLnRleHQucmVwbGFjZShtYXRjaCwgZGltZW5zaW9uc0NhcHRpb24pO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHZhciBob2xkZXJVUkwgPSBmbGFncy5ob2xkZXJVUkw7XG5cdCAgICB2YXIgZW5naW5lU2V0dGluZ3MgPSBleHRlbmQoX2VuZ2luZVNldHRpbmdzLCBudWxsKTtcblxuXHQgICAgaWYgKGZsYWdzLmZvbnQpIHtcblx0ICAgICAgICAvKlxuXHQgICAgICAgIElmIGV4dGVybmFsIGZvbnRzIGFyZSB1c2VkIGluIGEgPGltZz4gcGxhY2Vob2xkZXIgcmVuZGVyZWQgd2l0aCBTVkcsIEhvbGRlciBmYWxscyBiYWNrIHRvIGNhbnZhcy5cblxuXHQgICAgICAgIFRoaXMgaXMgZG9uZSBiZWNhdXNlIEZpcmVmb3ggYW5kIENocm9tZSBkaXNhbGxvdyBlbWJlZGRlZCBTVkdzIGZyb20gcmVmZXJlbmNpbmcgZXh0ZXJuYWwgYXNzZXRzLlxuXHQgICAgICAgIFRoZSB3b3JrYXJvdW5kIGlzIGVpdGhlciB0byBjaGFuZ2UgdGhlIHBsYWNlaG9sZGVyIHRhZyBmcm9tIDxpbWc+IHRvIDxvYmplY3Q+IG9yIHRvIHVzZSB0aGUgY2FudmFzIHJlbmRlcmVyLlxuXHQgICAgICAgICovXG5cdCAgICAgICAgdGhlbWUuZm9udCA9IGZsYWdzLmZvbnQ7XG5cdCAgICAgICAgaWYgKCFlbmdpbmVTZXR0aW5ncy5ub0ZvbnRGYWxsYmFjayAmJiBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW1nJyAmJiBBcHAuc2V0dXAuc3VwcG9ydHNDYW52YXMgJiYgZW5naW5lU2V0dGluZ3MucmVuZGVyZXIgPT09ICdzdmcnKSB7XG5cdCAgICAgICAgICAgIGVuZ2luZVNldHRpbmdzID0gZXh0ZW5kKGVuZ2luZVNldHRpbmdzLCB7XG5cdCAgICAgICAgICAgICAgICByZW5kZXJlcjogJ2NhbnZhcydcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvL0Nocm9tZSBhbmQgT3BlcmEgcmVxdWlyZSBhIHF1aWNrIDEwbXMgcmUtcmVuZGVyIGlmIHdlYiBmb250cyBhcmUgdXNlZCB3aXRoIGNhbnZhc1xuXHQgICAgaWYgKGZsYWdzLmZvbnQgJiYgZW5naW5lU2V0dGluZ3MucmVuZGVyZXIgPT0gJ2NhbnZhcycpIHtcblx0ICAgICAgICBlbmdpbmVTZXR0aW5ncy5yZVJlbmRlciA9IHRydWU7XG5cdCAgICB9XG5cblx0ICAgIGlmIChtb2RlID09ICdiYWNrZ3JvdW5kJykge1xuXHQgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmFja2dyb3VuZC1zcmMnKSA9PSBudWxsKSB7XG5cdCAgICAgICAgICAgIERPTS5zZXRBdHRyKGVsLCB7XG5cdCAgICAgICAgICAgICAgICAnZGF0YS1iYWNrZ3JvdW5kLXNyYyc6IGhvbGRlclVSTFxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBkb21Qcm9wcyA9IHt9O1xuXHQgICAgICAgIGRvbVByb3BzW0FwcC52YXJzLmRhdGFBdHRyXSA9IGhvbGRlclVSTDtcblx0ICAgICAgICBET00uc2V0QXR0cihlbCwgZG9tUHJvcHMpO1xuXHQgICAgfVxuXG5cdCAgICBmbGFncy50aGVtZSA9IHRoZW1lO1xuXG5cdCAgICAvL3RvZG8gY29uc2lkZXIgdXNpbmcgYWxsIHJlbmRlclNldHRpbmdzIGluIGhvbGRlckRhdGFcblx0ICAgIGVsLmhvbGRlckRhdGEgPSB7XG5cdCAgICAgICAgZmxhZ3M6IGZsYWdzLFxuXHQgICAgICAgIGVuZ2luZVNldHRpbmdzOiBlbmdpbmVTZXR0aW5nc1xuXHQgICAgfTtcblxuXHQgICAgaWYgKG1vZGUgPT0gJ2ltYWdlJyB8fCBtb2RlID09ICdmbHVpZCcpIHtcblx0ICAgICAgICBET00uc2V0QXR0cihlbCwge1xuXHQgICAgICAgICAgICAnYWx0JzogdGhlbWUudGV4dCA/IChkaW1lbnNpb25zSW5UZXh0ID8gdGhlbWUudGV4dCA6IHRoZW1lLnRleHQgKyAnIFsnICsgZGltZW5zaW9uc0NhcHRpb24gKyAnXScpIDogZGltZW5zaW9uc0NhcHRpb25cblx0ICAgICAgICB9KTtcblx0ICAgIH1cblxuXHQgICAgdmFyIHJlbmRlclNldHRpbmdzID0ge1xuXHQgICAgICAgIG1vZGU6IG1vZGUsXG5cdCAgICAgICAgZWw6IGVsLFxuXHQgICAgICAgIGhvbGRlclNldHRpbmdzOiB7XG5cdCAgICAgICAgICAgIGRpbWVuc2lvbnM6IGRpbWVuc2lvbnMsXG5cdCAgICAgICAgICAgIHRoZW1lOiB0aGVtZSxcblx0ICAgICAgICAgICAgZmxhZ3M6IGZsYWdzXG5cdCAgICAgICAgfSxcblx0ICAgICAgICBlbmdpbmVTZXR0aW5nczogZW5naW5lU2V0dGluZ3Ncblx0ICAgIH07XG5cblx0ICAgIGlmIChtb2RlID09ICdpbWFnZScpIHtcblx0ICAgICAgICBpZiAoIWZsYWdzLmF1dG8pIHtcblx0ICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBkaW1lbnNpb25zLndpZHRoICsgJ3B4Jztcblx0ICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQgKyAncHgnO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChlbmdpbmVTZXR0aW5ncy5yZW5kZXJlciA9PSAnaHRtbCcpIHtcblx0ICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmc7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmVuZGVyKHJlbmRlclNldHRpbmdzKTtcblxuXHQgICAgICAgICAgICBpZiAoZmxhZ3MudGV4dG1vZGUgPT0gJ2V4YWN0Jykge1xuXHQgICAgICAgICAgICAgICAgZWwuaG9sZGVyRGF0YS5yZXNpemVVcGRhdGUgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgQXBwLnZhcnMucmVzaXphYmxlSW1hZ2VzLnB1c2goZWwpO1xuXHQgICAgICAgICAgICAgICAgdXBkYXRlUmVzaXphYmxlRWxlbWVudHMoZWwpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChtb2RlID09ICdiYWNrZ3JvdW5kJyAmJiBlbmdpbmVTZXR0aW5ncy5yZW5kZXJlciAhPSAnaHRtbCcpIHtcblx0ICAgICAgICByZW5kZXIocmVuZGVyU2V0dGluZ3MpO1xuXHQgICAgfSBlbHNlIGlmIChtb2RlID09ICdmbHVpZCcpIHtcblx0ICAgICAgICBlbC5ob2xkZXJEYXRhLnJlc2l6ZVVwZGF0ZSA9IHRydWU7XG5cblx0ICAgICAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQuc2xpY2UoLTEpID09ICclJykge1xuXHQgICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcblx0ICAgICAgICB9IGVsc2UgaWYgKGZsYWdzLmF1dG8gPT0gbnVsbCB8fCAhZmxhZ3MuYXV0bykge1xuXHQgICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodCArICdweCc7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoLnNsaWNlKC0xKSA9PSAnJScpIHtcblx0ICAgICAgICAgICAgZWwuc3R5bGUud2lkdGggPSBkaW1lbnNpb25zLndpZHRoO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoZmxhZ3MuYXV0byA9PSBudWxsIHx8ICFmbGFncy5hdXRvKSB7XG5cdCAgICAgICAgICAgIGVsLnN0eWxlLndpZHRoID0gZGltZW5zaW9ucy53aWR0aCArICdweCc7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09ICdpbmxpbmUnIHx8IGVsLnN0eWxlLmRpc3BsYXkgPT09ICcnIHx8IGVsLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnKSB7XG5cdCAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHNldEluaXRpYWxEaW1lbnNpb25zKGVsKTtcblxuXHQgICAgICAgIGlmIChlbmdpbmVTZXR0aW5ncy5yZW5kZXJlciA9PSAnaHRtbCcpIHtcblx0ICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmc7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgQXBwLnZhcnMucmVzaXphYmxlSW1hZ2VzLnB1c2goZWwpO1xuXHQgICAgICAgICAgICB1cGRhdGVSZXNpemFibGVFbGVtZW50cyhlbCk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcmUgZnVuY3Rpb24gdGhhdCB0YWtlcyBvdXRwdXQgZnJvbSByZW5kZXJlcnMgYW5kIHNldHMgaXQgYXMgdGhlIHNvdXJjZSBvciBiYWNrZ3JvdW5kLWltYWdlIG9mIHRoZSB0YXJnZXQgZWxlbWVudFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gcmVuZGVyU2V0dGluZ3MgUmVuZGVyZXIgc2V0dGluZ3Ncblx0ICovXG5cdGZ1bmN0aW9uIHJlbmRlcihyZW5kZXJTZXR0aW5ncykge1xuXHQgICAgdmFyIGltYWdlID0gbnVsbDtcblx0ICAgIHZhciBtb2RlID0gcmVuZGVyU2V0dGluZ3MubW9kZTtcblx0ICAgIHZhciBlbCA9IHJlbmRlclNldHRpbmdzLmVsO1xuXHQgICAgdmFyIGhvbGRlclNldHRpbmdzID0gcmVuZGVyU2V0dGluZ3MuaG9sZGVyU2V0dGluZ3M7XG5cdCAgICB2YXIgZW5naW5lU2V0dGluZ3MgPSByZW5kZXJTZXR0aW5ncy5lbmdpbmVTZXR0aW5ncztcblxuXHQgICAgc3dpdGNoIChlbmdpbmVTZXR0aW5ncy5yZW5kZXJlcikge1xuXHQgICAgICAgIGNhc2UgJ3N2Zyc6XG5cdCAgICAgICAgICAgIGlmICghQXBwLnNldHVwLnN1cHBvcnRzU1ZHKSByZXR1cm47XG5cdCAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIGNhc2UgJ2NhbnZhcyc6XG5cdCAgICAgICAgICAgIGlmICghQXBwLnNldHVwLnN1cHBvcnRzQ2FudmFzKSByZXR1cm47XG5cdCAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgIHJldHVybjtcblx0ICAgIH1cblxuXHQgICAgLy90b2RvOiBtb3ZlIGdlbmVyYXRpb24gb2Ygc2NlbmUgdXAgdG8gZmxhZyBnZW5lcmF0aW9uIHRvIHJlZHVjZSBleHRyYSBvYmplY3QgY3JlYXRpb25cblx0ICAgIHZhciBzY2VuZSA9IHtcblx0ICAgICAgICB3aWR0aDogaG9sZGVyU2V0dGluZ3MuZGltZW5zaW9ucy53aWR0aCxcblx0ICAgICAgICBoZWlnaHQ6IGhvbGRlclNldHRpbmdzLmRpbWVuc2lvbnMuaGVpZ2h0LFxuXHQgICAgICAgIHRoZW1lOiBob2xkZXJTZXR0aW5ncy50aGVtZSxcblx0ICAgICAgICBmbGFnczogaG9sZGVyU2V0dGluZ3MuZmxhZ3Ncblx0ICAgIH07XG5cblx0ICAgIHZhciBzY2VuZUdyYXBoID0gYnVpbGRTY2VuZUdyYXBoKHNjZW5lKTtcblxuXHQgICAgZnVuY3Rpb24gZ2V0UmVuZGVyZWRJbWFnZSgpIHtcblx0ICAgICAgICB2YXIgaW1hZ2UgPSBudWxsO1xuXHQgICAgICAgIHN3aXRjaCAoZW5naW5lU2V0dGluZ3MucmVuZGVyZXIpIHtcblx0ICAgICAgICAgICAgY2FzZSAnY2FudmFzJzpcblx0ICAgICAgICAgICAgICAgIGltYWdlID0gc2dDYW52YXNSZW5kZXJlcihzY2VuZUdyYXBoLCByZW5kZXJTZXR0aW5ncyk7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgY2FzZSAnc3ZnJzpcblx0ICAgICAgICAgICAgICAgIGltYWdlID0gc3ZnUmVuZGVyZXIoc2NlbmVHcmFwaCwgcmVuZGVyU2V0dGluZ3MpO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICB0aHJvdyAnSG9sZGVyOiBpbnZhbGlkIHJlbmRlcmVyOiAnICsgZW5naW5lU2V0dGluZ3MucmVuZGVyZXI7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIGltYWdlO1xuXHQgICAgfVxuXG5cdCAgICBpbWFnZSA9IGdldFJlbmRlcmVkSW1hZ2UoKTtcblxuXHQgICAgaWYgKGltYWdlID09IG51bGwpIHtcblx0ICAgICAgICB0aHJvdyAnSG9sZGVyOiBjb3VsZG5cXCd0IHJlbmRlciBwbGFjZWhvbGRlcic7XG5cdCAgICB9XG5cblx0ICAgIC8vdG9kbzogYWRkIDxvYmplY3Q+IGNhbnZhcyByZW5kZXJpbmdcblx0ICAgIGlmIChtb2RlID09ICdiYWNrZ3JvdW5kJykge1xuXHQgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGltYWdlICsgJyknO1xuXG5cdCAgICAgICAgaWYgKCFlbmdpbmVTZXR0aW5ncy5ub0JhY2tncm91bmRTaXplKSB7XG5cdCAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gc2NlbmUud2lkdGggKyAncHggJyArIHNjZW5lLmhlaWdodCArICdweCc7XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ltZycpIHtcblx0ICAgICAgICAgICAgRE9NLnNldEF0dHIoZWwsIHtcblx0ICAgICAgICAgICAgICAgICdzcmMnOiBpbWFnZVxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9IGVsc2UgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgIERPTS5zZXRBdHRyKGVsLCB7XG5cdCAgICAgICAgICAgICAgICAnZGF0YSc6IGltYWdlLFxuXHQgICAgICAgICAgICAgICAgJ3R5cGUnOiAnaW1hZ2Uvc3ZnK3htbCdcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChlbmdpbmVTZXR0aW5ncy5yZVJlbmRlcikge1xuXHQgICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBnZXRSZW5kZXJlZEltYWdlKCk7XG5cdCAgICAgICAgICAgICAgICBpZiAoaW1hZ2UgPT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRocm93ICdIb2xkZXI6IGNvdWxkblxcJ3QgcmVuZGVyIHBsYWNlaG9sZGVyJztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vdG9kbzogcmVmYWN0b3IgdGhpcyBjb2RlIGludG8gYSBmdW5jdGlvblxuXHQgICAgICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgRE9NLnNldEF0dHIoZWwsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ3NyYyc6IGltYWdlXG5cdCAgICAgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgRE9NLnNldEF0dHIoZWwsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiBpbWFnZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnaW1hZ2Uvc3ZnK3htbCdcblx0ICAgICAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSwgMTUwKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICAvL3RvZG86IGFjY291bnQgZm9yIHJlLXJlbmRlcmluZ1xuXHQgICAgRE9NLnNldEF0dHIoZWwsIHtcblx0ICAgICAgICAnZGF0YS1ob2xkZXItcmVuZGVyZWQnOiB0cnVlXG5cdCAgICB9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3JlIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBIb2xkZXIgc2NlbmUgZGVzY3JpcHRpb24gYW5kIGJ1aWxkcyBhIHNjZW5lIGdyYXBoXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSBzY2VuZSBIb2xkZXIgc2NlbmUgb2JqZWN0XG5cdCAqL1xuXHQvL3RvZG86IG1ha2UgdGhpcyBmdW5jdGlvbiByZXVzYWJsZVxuXHQvL3RvZG86IG1lcmdlIGFwcCBkZWZhdWx0cyBhbmQgc2V0dXAgcHJvcGVydGllcyBpbnRvIHRoZSBzY2VuZSBhcmd1bWVudFxuXHRmdW5jdGlvbiBidWlsZFNjZW5lR3JhcGgoc2NlbmUpIHtcblx0ICAgIHZhciBmb250U2l6ZSA9IEFwcC5kZWZhdWx0cy5zaXplO1xuXHQgICAgdmFyIGZpeGVkU2l6ZSA9IHNjZW5lLmZsYWdzLmZpeGVkU2l6ZSAhPSBudWxsID8gc2NlbmUuZmxhZ3MuZml4ZWRTaXplIDogc2NlbmUudGhlbWUuZml4ZWRTaXplO1xuXHQgICAgaWYgKHBhcnNlRmxvYXQoc2NlbmUudGhlbWUuc2l6ZSkpIHtcblx0ICAgICAgICBmb250U2l6ZSA9IHNjZW5lLnRoZW1lLnNpemU7XG5cdCAgICB9IGVsc2UgaWYgKHBhcnNlRmxvYXQoc2NlbmUuZmxhZ3Muc2l6ZSkpIHtcblx0ICAgICAgICBmb250U2l6ZSA9IHNjZW5lLmZsYWdzLnNpemU7XG5cdCAgICB9XG5cblx0ICAgIHNjZW5lLmZvbnQgPSB7XG5cdCAgICAgICAgZmFtaWx5OiBzY2VuZS50aGVtZS5mb250ID8gc2NlbmUudGhlbWUuZm9udCA6ICdBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYnLFxuXHQgICAgICAgIHNpemU6IGZpeGVkU2l6ZSA/IGZvbnRTaXplIDogdGV4dFNpemUoc2NlbmUud2lkdGgsIHNjZW5lLmhlaWdodCwgZm9udFNpemUsIEFwcC5kZWZhdWx0cy5zY2FsZSksXG5cdCAgICAgICAgdW5pdHM6IHNjZW5lLnRoZW1lLnVuaXRzID8gc2NlbmUudGhlbWUudW5pdHMgOiBBcHAuZGVmYXVsdHMudW5pdHMsXG5cdCAgICAgICAgd2VpZ2h0OiBzY2VuZS50aGVtZS5mb250d2VpZ2h0ID8gc2NlbmUudGhlbWUuZm9udHdlaWdodCA6ICdib2xkJ1xuXHQgICAgfTtcblxuXHQgICAgc2NlbmUudGV4dCA9IHNjZW5lLnRoZW1lLnRleHQgfHwgTWF0aC5mbG9vcihzY2VuZS53aWR0aCkgKyAneCcgKyBNYXRoLmZsb29yKHNjZW5lLmhlaWdodCk7XG5cblx0ICAgIHNjZW5lLm5vV3JhcCA9IHNjZW5lLnRoZW1lLm5vd3JhcCB8fCBzY2VuZS5mbGFncy5ub3dyYXA7XG5cblx0ICAgIHNjZW5lLmFsaWduID0gc2NlbmUudGhlbWUuYWxpZ24gfHwgc2NlbmUuZmxhZ3MuYWxpZ24gfHwgJ2NlbnRlcic7XG5cblx0ICAgIHN3aXRjaCAoc2NlbmUuZmxhZ3MudGV4dG1vZGUpIHtcblx0ICAgICAgICBjYXNlICdsaXRlcmFsJzpcblx0ICAgICAgICAgICAgc2NlbmUudGV4dCA9IHNjZW5lLmZsYWdzLmRpbWVuc2lvbnMud2lkdGggKyAneCcgKyBzY2VuZS5mbGFncy5kaW1lbnNpb25zLmhlaWdodDtcblx0ICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgY2FzZSAnZXhhY3QnOlxuXHQgICAgICAgICAgICBpZiAoIXNjZW5lLmZsYWdzLmV4YWN0RGltZW5zaW9ucykgYnJlYWs7XG5cdCAgICAgICAgICAgIHNjZW5lLnRleHQgPSBNYXRoLmZsb29yKHNjZW5lLmZsYWdzLmV4YWN0RGltZW5zaW9ucy53aWR0aCkgKyAneCcgKyBNYXRoLmZsb29yKHNjZW5lLmZsYWdzLmV4YWN0RGltZW5zaW9ucy5oZWlnaHQpO1xuXHQgICAgICAgICAgICBicmVhaztcblx0ICAgIH1cblxuXHQgICAgdmFyIGxpbmVXcmFwID0gc2NlbmUuZmxhZ3MubGluZVdyYXAgfHwgQXBwLnNldHVwLmxpbmVXcmFwUmF0aW87XG5cdCAgICB2YXIgc2NlbmVNYXJnaW4gPSBzY2VuZS53aWR0aCAqIGxpbmVXcmFwO1xuXHQgICAgdmFyIG1heExpbmVXaWR0aCA9IHNjZW5lTWFyZ2luO1xuXG5cdCAgICB2YXIgc2NlbmVHcmFwaCA9IG5ldyBTY2VuZUdyYXBoKHtcblx0ICAgICAgICB3aWR0aDogc2NlbmUud2lkdGgsXG5cdCAgICAgICAgaGVpZ2h0OiBzY2VuZS5oZWlnaHRcblx0ICAgIH0pO1xuXG5cdCAgICB2YXIgU2hhcGUgPSBzY2VuZUdyYXBoLlNoYXBlO1xuXG5cdCAgICB2YXIgaG9sZGVyQmcgPSBuZXcgU2hhcGUuUmVjdCgnaG9sZGVyQmcnLCB7XG5cdCAgICAgICAgZmlsbDogc2NlbmUudGhlbWUuYmdcblx0ICAgIH0pO1xuXG5cdCAgICBob2xkZXJCZy5yZXNpemUoc2NlbmUud2lkdGgsIHNjZW5lLmhlaWdodCk7XG5cdCAgICBzY2VuZUdyYXBoLnJvb3QuYWRkKGhvbGRlckJnKTtcblxuXHQgICAgaWYgKHNjZW5lLmZsYWdzLm91dGxpbmUpIHtcblx0ICAgICAgICB2YXIgb3V0bGluZUNvbG9yID0gbmV3IENvbG9yKGhvbGRlckJnLnByb3BlcnRpZXMuZmlsbCk7XG5cdCAgICAgICAgb3V0bGluZUNvbG9yID0gb3V0bGluZUNvbG9yLmxpZ2h0ZW4ob3V0bGluZUNvbG9yLmxpZ2h0ZXJUaGFuKCc3ZjdmN2YnKSA/IC0wLjEgOiAwLjEpO1xuXHQgICAgICAgIGhvbGRlckJnLnByb3BlcnRpZXMub3V0bGluZSA9IHtcblx0ICAgICAgICAgICAgZmlsbDogb3V0bGluZUNvbG9yLnRvSGV4KHRydWUpLFxuXHQgICAgICAgICAgICB3aWR0aDogMlxuXHQgICAgICAgIH07XG5cdCAgICB9XG5cblx0ICAgIHZhciBob2xkZXJUZXh0Q29sb3IgPSBzY2VuZS50aGVtZS5mZztcblxuXHQgICAgaWYgKHNjZW5lLmZsYWdzLmF1dG9GZykge1xuXHQgICAgICAgIHZhciBob2xkZXJCZ0NvbG9yID0gbmV3IENvbG9yKGhvbGRlckJnLnByb3BlcnRpZXMuZmlsbCk7XG5cdCAgICAgICAgdmFyIGxpZ2h0Q29sb3IgPSBuZXcgQ29sb3IoJ2ZmZicpO1xuXHQgICAgICAgIHZhciBkYXJrQ29sb3IgPSBuZXcgQ29sb3IoJzAwMCcsIHtcblx0ICAgICAgICAgICAgJ2FscGhhJzogMC4yODU3MTRcblx0ICAgICAgICB9KTtcblxuXHQgICAgICAgIGhvbGRlclRleHRDb2xvciA9IGhvbGRlckJnQ29sb3IuYmxlbmRBbHBoYShob2xkZXJCZ0NvbG9yLmxpZ2h0ZXJUaGFuKCc3ZjdmN2YnKSA/IGRhcmtDb2xvciA6IGxpZ2h0Q29sb3IpLnRvSGV4KHRydWUpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgaG9sZGVyVGV4dEdyb3VwID0gbmV3IFNoYXBlLkdyb3VwKCdob2xkZXJUZXh0R3JvdXAnLCB7XG5cdCAgICAgICAgdGV4dDogc2NlbmUudGV4dCxcblx0ICAgICAgICBhbGlnbjogc2NlbmUuYWxpZ24sXG5cdCAgICAgICAgZm9udDogc2NlbmUuZm9udCxcblx0ICAgICAgICBmaWxsOiBob2xkZXJUZXh0Q29sb3Jcblx0ICAgIH0pO1xuXG5cdCAgICBob2xkZXJUZXh0R3JvdXAubW92ZVRvKG51bGwsIG51bGwsIDEpO1xuXHQgICAgc2NlbmVHcmFwaC5yb290LmFkZChob2xkZXJUZXh0R3JvdXApO1xuXG5cdCAgICB2YXIgdHBkYXRhID0gaG9sZGVyVGV4dEdyb3VwLnRleHRQb3NpdGlvbkRhdGEgPSBzdGFnaW5nUmVuZGVyZXIoc2NlbmVHcmFwaCk7XG5cdCAgICBpZiAoIXRwZGF0YSkge1xuXHQgICAgICAgIHRocm93ICdIb2xkZXI6IHN0YWdpbmcgZmFsbGJhY2sgbm90IHN1cHBvcnRlZCB5ZXQuJztcblx0ICAgIH1cblx0ICAgIGhvbGRlclRleHRHcm91cC5wcm9wZXJ0aWVzLmxlYWRpbmcgPSB0cGRhdGEuYm91bmRpbmdCb3guaGVpZ2h0O1xuXG5cdCAgICB2YXIgdGV4dE5vZGUgPSBudWxsO1xuXHQgICAgdmFyIGxpbmUgPSBudWxsO1xuXG5cdCAgICBmdW5jdGlvbiBmaW5hbGl6ZUxpbmUocGFyZW50LCBsaW5lLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdCAgICAgICAgbGluZS53aWR0aCA9IHdpZHRoO1xuXHQgICAgICAgIGxpbmUuaGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgICAgIHBhcmVudC53aWR0aCA9IE1hdGgubWF4KHBhcmVudC53aWR0aCwgbGluZS53aWR0aCk7XG5cdCAgICAgICAgcGFyZW50LmhlaWdodCArPSBsaW5lLmhlaWdodDtcblx0ICAgIH1cblxuXHQgICAgaWYgKHRwZGF0YS5saW5lQ291bnQgPiAxKSB7XG5cdCAgICAgICAgdmFyIG9mZnNldFggPSAwO1xuXHQgICAgICAgIHZhciBvZmZzZXRZID0gMDtcblx0ICAgICAgICB2YXIgbGluZUluZGV4ID0gMDtcblx0ICAgICAgICB2YXIgbGluZUtleTtcblx0ICAgICAgICBsaW5lID0gbmV3IFNoYXBlLkdyb3VwKCdsaW5lJyArIGxpbmVJbmRleCk7XG5cblx0ICAgICAgICAvL0RvdWJsZSBtYXJnaW4gc28gdGhhdCBsZWZ0L3JpZ2h0LWFsaWduZWQgbmV4dCBpcyBub3QgZmx1c2ggd2l0aCBlZGdlIG9mIGltYWdlXG5cdCAgICAgICAgaWYgKHNjZW5lLmFsaWduID09PSAnbGVmdCcgfHwgc2NlbmUuYWxpZ24gPT09ICdyaWdodCcpIHtcblx0ICAgICAgICAgICAgbWF4TGluZVdpZHRoID0gc2NlbmUud2lkdGggKiAoMSAtICgxIC0gbGluZVdyYXApICogMik7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cGRhdGEud29yZHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmQgPSB0cGRhdGEud29yZHNbaV07XG5cdCAgICAgICAgICAgIHRleHROb2RlID0gbmV3IFNoYXBlLlRleHQod29yZC50ZXh0KTtcblx0ICAgICAgICAgICAgdmFyIG5ld2xpbmUgPSB3b3JkLnRleHQgPT0gJ1xcXFxuJztcblx0ICAgICAgICAgICAgaWYgKCFzY2VuZS5ub1dyYXAgJiYgKG9mZnNldFggKyB3b3JkLndpZHRoID49IG1heExpbmVXaWR0aCB8fCBuZXdsaW5lID09PSB0cnVlKSkge1xuXHQgICAgICAgICAgICAgICAgZmluYWxpemVMaW5lKGhvbGRlclRleHRHcm91cCwgbGluZSwgb2Zmc2V0WCwgaG9sZGVyVGV4dEdyb3VwLnByb3BlcnRpZXMubGVhZGluZyk7XG5cdCAgICAgICAgICAgICAgICBob2xkZXJUZXh0R3JvdXAuYWRkKGxpbmUpO1xuXHQgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IDA7XG5cdCAgICAgICAgICAgICAgICBvZmZzZXRZICs9IGhvbGRlclRleHRHcm91cC5wcm9wZXJ0aWVzLmxlYWRpbmc7XG5cdCAgICAgICAgICAgICAgICBsaW5lSW5kZXggKz0gMTtcblx0ICAgICAgICAgICAgICAgIGxpbmUgPSBuZXcgU2hhcGUuR3JvdXAoJ2xpbmUnICsgbGluZUluZGV4KTtcblx0ICAgICAgICAgICAgICAgIGxpbmUueSA9IG9mZnNldFk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKG5ld2xpbmUgPT09IHRydWUpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRleHROb2RlLm1vdmVUbyhvZmZzZXRYLCAwKTtcblx0ICAgICAgICAgICAgb2Zmc2V0WCArPSB0cGRhdGEuc3BhY2VXaWR0aCArIHdvcmQud2lkdGg7XG5cdCAgICAgICAgICAgIGxpbmUuYWRkKHRleHROb2RlKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmaW5hbGl6ZUxpbmUoaG9sZGVyVGV4dEdyb3VwLCBsaW5lLCBvZmZzZXRYLCBob2xkZXJUZXh0R3JvdXAucHJvcGVydGllcy5sZWFkaW5nKTtcblx0ICAgICAgICBob2xkZXJUZXh0R3JvdXAuYWRkKGxpbmUpO1xuXG5cdCAgICAgICAgaWYgKHNjZW5lLmFsaWduID09PSAnbGVmdCcpIHtcblx0ICAgICAgICAgICAgaG9sZGVyVGV4dEdyb3VwLm1vdmVUbyhzY2VuZS53aWR0aCAtIHNjZW5lTWFyZ2luLCBudWxsLCBudWxsKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKHNjZW5lLmFsaWduID09PSAncmlnaHQnKSB7XG5cdCAgICAgICAgICAgIGZvciAobGluZUtleSBpbiBob2xkZXJUZXh0R3JvdXAuY2hpbGRyZW4pIHtcblx0ICAgICAgICAgICAgICAgIGxpbmUgPSBob2xkZXJUZXh0R3JvdXAuY2hpbGRyZW5bbGluZUtleV07XG5cdCAgICAgICAgICAgICAgICBsaW5lLm1vdmVUbyhzY2VuZS53aWR0aCAtIGxpbmUud2lkdGgsIG51bGwsIG51bGwpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgaG9sZGVyVGV4dEdyb3VwLm1vdmVUbygwIC0gKHNjZW5lLndpZHRoIC0gc2NlbmVNYXJnaW4pLCBudWxsLCBudWxsKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBmb3IgKGxpbmVLZXkgaW4gaG9sZGVyVGV4dEdyb3VwLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgICAgICBsaW5lID0gaG9sZGVyVGV4dEdyb3VwLmNoaWxkcmVuW2xpbmVLZXldO1xuXHQgICAgICAgICAgICAgICAgbGluZS5tb3ZlVG8oKGhvbGRlclRleHRHcm91cC53aWR0aCAtIGxpbmUud2lkdGgpIC8gMiwgbnVsbCwgbnVsbCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBob2xkZXJUZXh0R3JvdXAubW92ZVRvKChzY2VuZS53aWR0aCAtIGhvbGRlclRleHRHcm91cC53aWR0aCkgLyAyLCBudWxsLCBudWxsKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBob2xkZXJUZXh0R3JvdXAubW92ZVRvKG51bGwsIChzY2VuZS5oZWlnaHQgLSBob2xkZXJUZXh0R3JvdXAuaGVpZ2h0KSAvIDIsIG51bGwpO1xuXG5cdCAgICAgICAgLy9JZiB0aGUgdGV4dCBleGNlZWRzIHZlcnRpY2FsIHNwYWNlLCBtb3ZlIGl0IGRvd24gc28gdGhlIGZpcnN0IGxpbmUgaXMgdmlzaWJsZVxuXHQgICAgICAgIGlmICgoc2NlbmUuaGVpZ2h0IC0gaG9sZGVyVGV4dEdyb3VwLmhlaWdodCkgLyAyIDwgMCkge1xuXHQgICAgICAgICAgICBob2xkZXJUZXh0R3JvdXAubW92ZVRvKG51bGwsIDAsIG51bGwpO1xuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGV4dE5vZGUgPSBuZXcgU2hhcGUuVGV4dChzY2VuZS50ZXh0KTtcblx0ICAgICAgICBsaW5lID0gbmV3IFNoYXBlLkdyb3VwKCdsaW5lMCcpO1xuXHQgICAgICAgIGxpbmUuYWRkKHRleHROb2RlKTtcblx0ICAgICAgICBob2xkZXJUZXh0R3JvdXAuYWRkKGxpbmUpO1xuXG5cdCAgICAgICAgaWYgKHNjZW5lLmFsaWduID09PSAnbGVmdCcpIHtcblx0ICAgICAgICAgICAgaG9sZGVyVGV4dEdyb3VwLm1vdmVUbyhzY2VuZS53aWR0aCAtIHNjZW5lTWFyZ2luLCBudWxsLCBudWxsKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKHNjZW5lLmFsaWduID09PSAncmlnaHQnKSB7XG5cdCAgICAgICAgICAgIGhvbGRlclRleHRHcm91cC5tb3ZlVG8oMCAtIChzY2VuZS53aWR0aCAtIHNjZW5lTWFyZ2luKSwgbnVsbCwgbnVsbCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaG9sZGVyVGV4dEdyb3VwLm1vdmVUbygoc2NlbmUud2lkdGggLSB0cGRhdGEuYm91bmRpbmdCb3gud2lkdGgpIC8gMiwgbnVsbCwgbnVsbCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaG9sZGVyVGV4dEdyb3VwLm1vdmVUbyhudWxsLCAoc2NlbmUuaGVpZ2h0IC0gdHBkYXRhLmJvdW5kaW5nQm94LmhlaWdodCkgLyAyLCBudWxsKTtcblx0ICAgIH1cblxuXHQgICAgLy90b2RvOiByZW5kZXJsaXN0XG5cdCAgICByZXR1cm4gc2NlbmVHcmFwaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGFwdGl2ZSB0ZXh0IHNpemluZyBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gd2lkdGggUGFyZW50IHdpZHRoXG5cdCAqIEBwYXJhbSBoZWlnaHQgUGFyZW50IGhlaWdodFxuXHQgKiBAcGFyYW0gZm9udFNpemUgUmVxdWVzdGVkIHRleHQgc2l6ZVxuXHQgKiBAcGFyYW0gc2NhbGUgUHJvcG9ydGlvbmFsIHNjYWxlIG9mIHRleHRcblx0ICovXG5cdGZ1bmN0aW9uIHRleHRTaXplKHdpZHRoLCBoZWlnaHQsIGZvbnRTaXplLCBzY2FsZSkge1xuXHQgICAgdmFyIHN0YWdlV2lkdGggPSBwYXJzZUludCh3aWR0aCwgMTApO1xuXHQgICAgdmFyIHN0YWdlSGVpZ2h0ID0gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG5cblx0ICAgIHZhciBiaWdTaWRlID0gTWF0aC5tYXgoc3RhZ2VXaWR0aCwgc3RhZ2VIZWlnaHQpO1xuXHQgICAgdmFyIHNtYWxsU2lkZSA9IE1hdGgubWluKHN0YWdlV2lkdGgsIHN0YWdlSGVpZ2h0KTtcblxuXHQgICAgdmFyIG5ld0hlaWdodCA9IDAuOCAqIE1hdGgubWluKHNtYWxsU2lkZSwgYmlnU2lkZSAqIHNjYWxlKTtcblx0ICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgubWF4KGZvbnRTaXplLCBuZXdIZWlnaHQpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJdGVyYXRlcyBvdmVyIHJlc2l6YWJsZSAoZmx1aWQgb3IgYXV0bykgcGxhY2Vob2xkZXJzIGFuZCByZW5kZXJzIHRoZW1cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIGVsZW1lbnQgT3B0aW9uYWwgZWxlbWVudCBzZWxlY3Rvciwgc3BlY2lmaWVkIG9ubHkgaWYgYSBzcGVjaWZpYyBlbGVtZW50IG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkXG5cdCAqL1xuXHRmdW5jdGlvbiB1cGRhdGVSZXNpemFibGVFbGVtZW50cyhlbGVtZW50KSB7XG5cdCAgICB2YXIgaW1hZ2VzO1xuXHQgICAgaWYgKGVsZW1lbnQgPT0gbnVsbCB8fCBlbGVtZW50Lm5vZGVUeXBlID09IG51bGwpIHtcblx0ICAgICAgICBpbWFnZXMgPSBBcHAudmFycy5yZXNpemFibGVJbWFnZXM7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGltYWdlcyA9IFtlbGVtZW50XTtcblx0ICAgIH1cblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW1hZ2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICAgIHZhciBlbCA9IGltYWdlc1tpXTtcblx0ICAgICAgICBpZiAoZWwuaG9sZGVyRGF0YSkge1xuXHQgICAgICAgICAgICB2YXIgZmxhZ3MgPSBlbC5ob2xkZXJEYXRhLmZsYWdzO1xuXHQgICAgICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGRpbWVuc2lvbkNoZWNrKGVsKTtcblx0ICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghZWwuaG9sZGVyRGF0YS5yZXNpemVVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgaWYgKGZsYWdzLmZsdWlkICYmIGZsYWdzLmF1dG8pIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZmx1aWRDb25maWcgPSBlbC5ob2xkZXJEYXRhLmZsdWlkQ29uZmlnO1xuXHQgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZmx1aWRDb25maWcubW9kZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3aWR0aCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodCA9IGRpbWVuc2lvbnMud2lkdGggLyBmbHVpZENvbmZpZy5yYXRpbztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IGRpbWVuc2lvbnMuaGVpZ2h0ICogZmx1aWRDb25maWcucmF0aW87XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtcblx0ICAgICAgICAgICAgICAgICAgICBtb2RlOiAnaW1hZ2UnLFxuXHQgICAgICAgICAgICAgICAgICAgIGhvbGRlclNldHRpbmdzOiB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IGRpbWVuc2lvbnMsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBmbGFncy50aGVtZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ3M6IGZsYWdzXG5cdCAgICAgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgICAgICBlbDogZWwsXG5cdCAgICAgICAgICAgICAgICAgICAgZW5naW5lU2V0dGluZ3M6IGVsLmhvbGRlckRhdGEuZW5naW5lU2V0dGluZ3Ncblx0ICAgICAgICAgICAgICAgIH07XG5cblx0ICAgICAgICAgICAgICAgIGlmIChmbGFncy50ZXh0bW9kZSA9PSAnZXhhY3QnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZmxhZ3MuZXhhY3REaW1lbnNpb25zID0gZGltZW5zaW9ucztcblx0ICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5ob2xkZXJTZXR0aW5ncy5kaW1lbnNpb25zID0gZmxhZ3MuZGltZW5zaW9ucztcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgcmVuZGVyKHNldHRpbmdzKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHNldEludmlzaWJsZShlbCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB1cCBhc3BlY3QgcmF0aW8gbWV0YWRhdGEgZm9yIGZsdWlkIHBsYWNlaG9sZGVycywgaW4gb3JkZXIgdG8gcHJlc2VydmUgcHJvcG9ydGlvbnMgd2hlbiByZXNpemluZ1xuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gZWwgSW1hZ2UgRE9NIGVsZW1lbnRcblx0ICovXG5cdGZ1bmN0aW9uIHNldEluaXRpYWxEaW1lbnNpb25zKGVsKSB7XG5cdCAgICBpZiAoZWwuaG9sZGVyRGF0YSkge1xuXHQgICAgICAgIHZhciBkaW1lbnNpb25zID0gZGltZW5zaW9uQ2hlY2soZWwpO1xuXHQgICAgICAgIGlmIChkaW1lbnNpb25zKSB7XG5cdCAgICAgICAgICAgIHZhciBmbGFncyA9IGVsLmhvbGRlckRhdGEuZmxhZ3M7XG5cblx0ICAgICAgICAgICAgdmFyIGZsdWlkQ29uZmlnID0ge1xuXHQgICAgICAgICAgICAgICAgZmx1aWRIZWlnaHQ6IGZsYWdzLmRpbWVuc2lvbnMuaGVpZ2h0LnNsaWNlKC0xKSA9PSAnJScsXG5cdCAgICAgICAgICAgICAgICBmbHVpZFdpZHRoOiBmbGFncy5kaW1lbnNpb25zLndpZHRoLnNsaWNlKC0xKSA9PSAnJScsXG5cdCAgICAgICAgICAgICAgICBtb2RlOiBudWxsLFxuXHQgICAgICAgICAgICAgICAgaW5pdGlhbERpbWVuc2lvbnM6IGRpbWVuc2lvbnNcblx0ICAgICAgICAgICAgfTtcblxuXHQgICAgICAgICAgICBpZiAoZmx1aWRDb25maWcuZmx1aWRXaWR0aCAmJiAhZmx1aWRDb25maWcuZmx1aWRIZWlnaHQpIHtcblx0ICAgICAgICAgICAgICAgIGZsdWlkQ29uZmlnLm1vZGUgPSAnd2lkdGgnO1xuXHQgICAgICAgICAgICAgICAgZmx1aWRDb25maWcucmF0aW8gPSBmbHVpZENvbmZpZy5pbml0aWFsRGltZW5zaW9ucy53aWR0aCAvIHBhcnNlRmxvYXQoZmxhZ3MuZGltZW5zaW9ucy5oZWlnaHQpO1xuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKCFmbHVpZENvbmZpZy5mbHVpZFdpZHRoICYmIGZsdWlkQ29uZmlnLmZsdWlkSGVpZ2h0KSB7XG5cdCAgICAgICAgICAgICAgICBmbHVpZENvbmZpZy5tb2RlID0gJ2hlaWdodCc7XG5cdCAgICAgICAgICAgICAgICBmbHVpZENvbmZpZy5yYXRpbyA9IHBhcnNlRmxvYXQoZmxhZ3MuZGltZW5zaW9ucy53aWR0aCkgLyBmbHVpZENvbmZpZy5pbml0aWFsRGltZW5zaW9ucy5oZWlnaHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBlbC5ob2xkZXJEYXRhLmZsdWlkQ29uZmlnID0gZmx1aWRDb25maWc7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgc2V0SW52aXNpYmxlKGVsKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHQvKipcblx0ICogSXRlcmF0ZXMgdGhyb3VnaCBhbGwgY3VycmVudCBpbnZpc2libGUgaW1hZ2VzLCBhbmQgaWYgdGhleSdyZSB2aXNpYmxlLCByZW5kZXJzIHRoZW0gYW5kIHJlbW92ZXMgdGhlbSBmcm9tIGZ1cnRoZXIgY2hlY2tzLiBSdW5zIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIHZpc2liaWxpdHlDaGVjaygpIHtcblx0ICAgIHZhciByZW5kZXJhYmxlSW1hZ2VzID0gW107XG5cdCAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKEFwcC52YXJzLmludmlzaWJsZUltYWdlcyk7XG5cdCAgICB2YXIgZWw7XG5cblx0ICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICAgICAgZWwgPSBBcHAudmFycy5pbnZpc2libGVJbWFnZXNba2V5XTtcblx0ICAgICAgICBpZiAoZGltZW5zaW9uQ2hlY2soZWwpICYmIGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2ltZycpIHtcblx0ICAgICAgICAgICAgcmVuZGVyYWJsZUltYWdlcy5wdXNoKGVsKTtcblx0ICAgICAgICAgICAgZGVsZXRlIEFwcC52YXJzLmludmlzaWJsZUltYWdlc1trZXldO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBpZiAocmVuZGVyYWJsZUltYWdlcy5sZW5ndGgpIHtcblx0ICAgICAgICBIb2xkZXIucnVuKHtcblx0ICAgICAgICAgICAgaW1hZ2VzOiByZW5kZXJhYmxlSW1hZ2VzXG5cdCAgICAgICAgfSk7XG5cdCAgICB9XG5cblx0ICAgIC8vIERvbmUgdG8gcHJldmVudCAxMDAlIENQVSB1c2FnZSB2aWEgYWdncmVzc2l2ZSBjYWxsaW5nIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSh2aXNpYmlsaXR5Q2hlY2spO1xuXHQgICAgfSwgMTApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0cyBjaGVja2luZyBmb3IgaW52aXNpYmxlIHBsYWNlaG9sZGVycyBpZiBub3QgZG9pbmcgc28geWV0LiBEb2VzIG5vdGhpbmcgb3RoZXJ3aXNlLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gc3RhcnRWaXNpYmlsaXR5Q2hlY2soKSB7XG5cdCAgICBpZiAoIUFwcC52YXJzLnZpc2liaWxpdHlDaGVja1N0YXJ0ZWQpIHtcblx0ICAgICAgICBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHZpc2liaWxpdHlDaGVjayk7XG5cdCAgICAgICAgQXBwLnZhcnMudmlzaWJpbGl0eUNoZWNrU3RhcnRlZCA9IHRydWU7XG5cdCAgICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBhIHVuaXF1ZSBJRCBmb3IgYW4gaW1hZ2UgZGV0ZWN0ZWQgdG8gYmUgaW52aXNpYmxlIGFuZCBhZGRzIGl0IHRvIHRoZSBtYXAgb2YgaW52aXNpYmxlIGltYWdlcyBjaGVja2VkIGJ5IHZpc2liaWxpdHlDaGVja1xuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gZWwgSW52aXNpYmxlIERPTSBlbGVtZW50XG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRJbnZpc2libGUoZWwpIHtcblx0ICAgIGlmICghZWwuaG9sZGVyRGF0YS5pbnZpc2libGVJZCkge1xuXHQgICAgICAgIEFwcC52YXJzLmludmlzaWJsZUlkICs9IDE7XG5cdCAgICAgICAgQXBwLnZhcnMuaW52aXNpYmxlSW1hZ2VzWydpJyArIEFwcC52YXJzLmludmlzaWJsZUlkXSA9IGVsO1xuXHQgICAgICAgIGVsLmhvbGRlckRhdGEuaW52aXNpYmxlSWQgPSBBcHAudmFycy5pbnZpc2libGVJZDtcblx0ICAgIH1cblx0fVxuXG5cdC8vdG9kbzogc2VlIGlmIHBvc3NpYmxlIHRvIGNvbnZlcnQgc3RhZ2luZ1JlbmRlcmVyIHRvIHVzZSBIVE1MIG9ubHlcblx0dmFyIHN0YWdpbmdSZW5kZXJlciA9IChmdW5jdGlvbigpIHtcblx0ICAgIHZhciBzdmcgPSBudWxsLFxuXHQgICAgICAgIHN0YWdpbmdUZXh0ID0gbnVsbCxcblx0ICAgICAgICBzdGFnaW5nVGV4dE5vZGUgPSBudWxsO1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uKGdyYXBoKSB7XG5cdCAgICAgICAgdmFyIHJvb3ROb2RlID0gZ3JhcGgucm9vdDtcblx0ICAgICAgICBpZiAoQXBwLnNldHVwLnN1cHBvcnRzU1ZHKSB7XG5cdCAgICAgICAgICAgIHZhciBmaXJzdFRpbWVTZXR1cCA9IGZhbHNlO1xuXHQgICAgICAgICAgICB2YXIgdG5vZGUgPSBmdW5jdGlvbih0ZXh0KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIGlmIChzdmcgPT0gbnVsbCB8fCBzdmcucGFyZW50Tm9kZSAhPT0gZG9jdW1lbnQuYm9keSkge1xuXHQgICAgICAgICAgICAgICAgZmlyc3RUaW1lU2V0dXAgPSB0cnVlO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgc3ZnID0gU1ZHLmluaXRTVkcoc3ZnLCByb290Tm9kZS5wcm9wZXJ0aWVzLndpZHRoLCByb290Tm9kZS5wcm9wZXJ0aWVzLmhlaWdodCk7XG5cdCAgICAgICAgICAgIC8vU2hvdyBzdGFnaW5nIGVsZW1lbnQgYmVmb3JlIHN0YWdpbmdcblx0ICAgICAgICAgICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG5cdCAgICAgICAgICAgIGlmIChmaXJzdFRpbWVTZXR1cCkge1xuXHQgICAgICAgICAgICAgICAgc3RhZ2luZ1RleHQgPSBET00ubmV3RWwoJ3RleHQnLCBTVkdfTlMpO1xuXHQgICAgICAgICAgICAgICAgc3RhZ2luZ1RleHROb2RlID0gdG5vZGUobnVsbCk7XG5cdCAgICAgICAgICAgICAgICBET00uc2V0QXR0cihzdGFnaW5nVGV4dCwge1xuXHQgICAgICAgICAgICAgICAgICAgIHg6IDBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICAgICAgc3RhZ2luZ1RleHQuYXBwZW5kQ2hpbGQoc3RhZ2luZ1RleHROb2RlKTtcblx0ICAgICAgICAgICAgICAgIHN2Zy5hcHBlbmRDaGlsZChzdGFnaW5nVGV4dCk7XG5cdCAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN2Zyk7XG5cdCAgICAgICAgICAgICAgICBzdmcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHQgICAgICAgICAgICAgICAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0ICAgICAgICAgICAgICAgIHN2Zy5zdHlsZS50b3AgPSAnLTEwMCUnO1xuXHQgICAgICAgICAgICAgICAgc3ZnLnN0eWxlLmxlZnQgPSAnLTEwMCUnO1xuXHQgICAgICAgICAgICAgICAgLy90b2RvOiB3b3JrYXJvdW5kIGZvciB6ZXJvLWRpbWVuc2lvbiA8c3ZnPiB0YWcgaW4gT3BlcmEgMTJcblx0ICAgICAgICAgICAgICAgIC8vc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAwKTtcblx0ICAgICAgICAgICAgICAgIC8vc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB2YXIgaG9sZGVyVGV4dEdyb3VwID0gcm9vdE5vZGUuY2hpbGRyZW4uaG9sZGVyVGV4dEdyb3VwO1xuXHQgICAgICAgICAgICB2YXIgaHRnUHJvcHMgPSBob2xkZXJUZXh0R3JvdXAucHJvcGVydGllcztcblx0ICAgICAgICAgICAgRE9NLnNldEF0dHIoc3RhZ2luZ1RleHQsIHtcblx0ICAgICAgICAgICAgICAgICd5JzogaHRnUHJvcHMuZm9udC5zaXplLFxuXHQgICAgICAgICAgICAgICAgJ3N0eWxlJzogdXRpbHMuY3NzUHJvcHMoe1xuXHQgICAgICAgICAgICAgICAgICAgICdmb250LXdlaWdodCc6IGh0Z1Byb3BzLmZvbnQud2VpZ2h0LFxuXHQgICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiBodGdQcm9wcy5mb250LnNpemUgKyBodGdQcm9wcy5mb250LnVuaXRzLFxuXHQgICAgICAgICAgICAgICAgICAgICdmb250LWZhbWlseSc6IGh0Z1Byb3BzLmZvbnQuZmFtaWx5XG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICAvL1VuZXNjYXBlIEhUTUwgZW50aXRpZXMgdG8gZ2V0IGFwcHJveGltYXRlbHkgdGhlIHJpZ2h0IHdpZHRoXG5cdCAgICAgICAgICAgIHZhciB0eHQgPSBET00ubmV3RWwoJ3RleHRhcmVhJyk7XG5cdCAgICAgICAgICAgIHR4dC5pbm5lckhUTUwgPSBodGdQcm9wcy50ZXh0O1xuXHQgICAgICAgICAgICBzdGFnaW5nVGV4dE5vZGUubm9kZVZhbHVlID0gdHh0LnZhbHVlO1xuXG5cdCAgICAgICAgICAgIC8vR2V0IGJvdW5kaW5nIGJveCBmb3IgdGhlIHdob2xlIHN0cmluZyAodG90YWwgd2lkdGggYW5kIGhlaWdodClcblx0ICAgICAgICAgICAgdmFyIHN0YWdpbmdUZXh0QkJveCA9IHN0YWdpbmdUZXh0LmdldEJCb3goKTtcblxuXHQgICAgICAgICAgICAvL0dldCBsaW5lIGNvdW50IGFuZCBzcGxpdCB0aGUgc3RyaW5nIGludG8gd29yZHNcblx0ICAgICAgICAgICAgdmFyIGxpbmVDb3VudCA9IE1hdGguY2VpbChzdGFnaW5nVGV4dEJCb3gud2lkdGggLyByb290Tm9kZS5wcm9wZXJ0aWVzLndpZHRoKTtcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gaHRnUHJvcHMudGV4dC5zcGxpdCgnICcpO1xuXHQgICAgICAgICAgICB2YXIgbmV3bGluZXMgPSBodGdQcm9wcy50ZXh0Lm1hdGNoKC9cXFxcbi9nKTtcblx0ICAgICAgICAgICAgbGluZUNvdW50ICs9IG5ld2xpbmVzID09IG51bGwgPyAwIDogbmV3bGluZXMubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vR2V0IGJvdW5kaW5nIGJveCBmb3IgdGhlIHN0cmluZyB3aXRoIHNwYWNlcyByZW1vdmVkXG5cdCAgICAgICAgICAgIHN0YWdpbmdUZXh0Tm9kZS5ub2RlVmFsdWUgPSBodGdQcm9wcy50ZXh0LnJlcGxhY2UoL1sgXSsvZywgJycpO1xuXHQgICAgICAgICAgICB2YXIgY29tcHV0ZWROb1NwYWNlTGVuZ3RoID0gc3RhZ2luZ1RleHQuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG5cblx0ICAgICAgICAgICAgLy9Db21wdXRlIGF2ZXJhZ2Ugc3BhY2Ugd2lkdGhcblx0ICAgICAgICAgICAgdmFyIGRpZmZMZW5ndGggPSBzdGFnaW5nVGV4dEJCb3gud2lkdGggLSBjb21wdXRlZE5vU3BhY2VMZW5ndGg7XG5cdCAgICAgICAgICAgIHZhciBzcGFjZVdpZHRoID0gTWF0aC5yb3VuZChkaWZmTGVuZ3RoIC8gTWF0aC5tYXgoMSwgd29yZHMubGVuZ3RoIC0gMSkpO1xuXG5cdCAgICAgICAgICAgIC8vR2V0IHdpZHRocyBmb3IgZXZlcnkgd29yZCB3aXRoIHNwYWNlIG9ubHkgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lXG5cdCAgICAgICAgICAgIHZhciB3b3JkV2lkdGhzID0gW107XG5cdCAgICAgICAgICAgIGlmIChsaW5lQ291bnQgPiAxKSB7XG5cdCAgICAgICAgICAgICAgICBzdGFnaW5nVGV4dE5vZGUubm9kZVZhbHVlID0gJyc7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmRzW2ldLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhZ2luZ1RleHROb2RlLm5vZGVWYWx1ZSA9IHV0aWxzLmRlY29kZUh0bWxFbnRpdHkod29yZHNbaV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBiYm94ID0gc3RhZ2luZ1RleHQuZ2V0QkJveCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHdvcmRXaWR0aHMucHVzaCh7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHdvcmRzW2ldLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYmJveC53aWR0aFxuXHQgICAgICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy9IaWRlIHN0YWdpbmcgZWxlbWVudCBhZnRlciBzdGFnaW5nXG5cdCAgICAgICAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdCAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICBzcGFjZVdpZHRoOiBzcGFjZVdpZHRoLFxuXHQgICAgICAgICAgICAgICAgbGluZUNvdW50OiBsaW5lQ291bnQsXG5cdCAgICAgICAgICAgICAgICBib3VuZGluZ0JveDogc3RhZ2luZ1RleHRCQm94LFxuXHQgICAgICAgICAgICAgICAgd29yZHM6IHdvcmRXaWR0aHNcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvL3RvZG86IGNhbnZhcyBmYWxsYmFjayBmb3IgbWVhc3VyaW5nIHRleHQgb24gYW5kcm9pZCAyLjNcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdH0pKCk7XG5cblx0Ly9IZWxwZXJzXG5cblx0LyoqXG5cdCAqIFByZXZlbnRzIGEgZnVuY3Rpb24gZnJvbSBiZWluZyBjYWxsZWQgdG9vIG9mdGVuLCB3YWl0cyB1bnRpbCBhIHRpbWVyIGVsYXBzZXMgdG8gY2FsbCBpdCBhZ2FpblxuXHQgKlxuXHQgKiBAcGFyYW0gZm4gRnVuY3Rpb24gdG8gY2FsbFxuXHQgKi9cblx0ZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcblx0ICAgIGlmICghQXBwLnZhcnMuZGVib3VuY2VUaW1lcikgZm4uY2FsbCh0aGlzKTtcblx0ICAgIGlmIChBcHAudmFycy5kZWJvdW5jZVRpbWVyKSBnbG9iYWwuY2xlYXJUaW1lb3V0KEFwcC52YXJzLmRlYm91bmNlVGltZXIpO1xuXHQgICAgQXBwLnZhcnMuZGVib3VuY2VUaW1lciA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIEFwcC52YXJzLmRlYm91bmNlVGltZXIgPSBudWxsO1xuXHQgICAgICAgIGZuLmNhbGwodGhpcyk7XG5cdCAgICB9LCBBcHAuc2V0dXAuZGVib3VuY2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhvbGRlci1zcGVjaWZpYyByZXNpemUvb3JpZW50YXRpb24gY2hhbmdlIGNhbGxiYWNrLCBkZWJvdW5jZWQgdG8gcHJldmVudCBleGNlc3NpdmUgZXhlY3V0aW9uXG5cdCAqL1xuXHRmdW5jdGlvbiByZXNpemVFdmVudCgpIHtcblx0ICAgIGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHVwZGF0ZVJlc2l6YWJsZUVsZW1lbnRzKG51bGwpO1xuXHQgICAgfSk7XG5cdH1cblxuXHQvL1NldCB1cCBmbGFnc1xuXG5cdGZvciAodmFyIGZsYWcgaW4gQXBwLmZsYWdzKSB7XG5cdCAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChBcHAuZmxhZ3MsIGZsYWcpKSBjb250aW51ZTtcblx0ICAgIEFwcC5mbGFnc1tmbGFnXS5tYXRjaCA9IGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgICAgIHJldHVybiB2YWwubWF0Y2godGhpcy5yZWdleCk7XG5cdCAgICB9O1xuXHR9XG5cblx0Ly9Qcm9wZXJ0aWVzIHNldCBvbmNlIG9uIHNldHVwXG5cblx0QXBwLnNldHVwID0ge1xuXHQgICAgcmVuZGVyZXI6ICdodG1sJyxcblx0ICAgIGRlYm91bmNlOiAxMDAsXG5cdCAgICByYXRpbzogMSxcblx0ICAgIHN1cHBvcnRzQ2FudmFzOiBmYWxzZSxcblx0ICAgIHN1cHBvcnRzU1ZHOiBmYWxzZSxcblx0ICAgIGxpbmVXcmFwUmF0aW86IDAuOSxcblx0ICAgIGRhdGFBdHRyOiAnZGF0YS1zcmMnLFxuXHQgICAgcmVuZGVyZXJzOiBbJ2h0bWwnLCAnY2FudmFzJywgJ3N2ZyddXG5cdH07XG5cblx0Ly9Qcm9wZXJ0aWVzIG1vZGlmaWVkIGR1cmluZyBydW50aW1lXG5cblx0QXBwLnZhcnMgPSB7XG5cdCAgICBwcmVlbXB0ZWQ6IGZhbHNlLFxuXHQgICAgcmVzaXphYmxlSW1hZ2VzOiBbXSxcblx0ICAgIGludmlzaWJsZUltYWdlczoge30sXG5cdCAgICBpbnZpc2libGVJZDogMCxcblx0ICAgIHZpc2liaWxpdHlDaGVja1N0YXJ0ZWQ6IGZhbHNlLFxuXHQgICAgZGVib3VuY2VUaW1lcjogbnVsbCxcblx0ICAgIGNhY2hlOiB7fVxuXHR9O1xuXG5cdC8vUHJlLWZsaWdodFxuXG5cdChmdW5jdGlvbigpIHtcblx0ICAgIHZhciBjYW52YXMgPSBET00ubmV3RWwoJ2NhbnZhcycpO1xuXG5cdCAgICBpZiAoY2FudmFzLmdldENvbnRleHQpIHtcblx0ICAgICAgICBpZiAoY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykuaW5kZXhPZignZGF0YTppbWFnZS9wbmcnKSAhPSAtMSkge1xuXHQgICAgICAgICAgICBBcHAuc2V0dXAucmVuZGVyZXIgPSAnY2FudmFzJztcblx0ICAgICAgICAgICAgQXBwLnNldHVwLnN1cHBvcnRzQ2FudmFzID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmICghIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKS5jcmVhdGVTVkdSZWN0KSB7XG5cdCAgICAgICAgQXBwLnNldHVwLnJlbmRlcmVyID0gJ3N2Zyc7XG5cdCAgICAgICAgQXBwLnNldHVwLnN1cHBvcnRzU1ZHID0gdHJ1ZTtcblx0ICAgIH1cblx0fSkoKTtcblxuXHQvL1N0YXJ0cyBjaGVja2luZyBmb3IgaW52aXNpYmxlIHBsYWNlaG9sZGVyc1xuXHRzdGFydFZpc2liaWxpdHlDaGVjaygpO1xuXG5cdGlmIChvbkRvbVJlYWR5KSB7XG5cdCAgICBvbkRvbVJlYWR5KGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIGlmICghQXBwLnZhcnMucHJlZW1wdGVkKSB7XG5cdCAgICAgICAgICAgIEhvbGRlci5ydW4oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdCAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVFdmVudCwgZmFsc2UpO1xuXHQgICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCByZXNpemVFdmVudCwgZmFsc2UpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb25yZXNpemUnLCByZXNpemVFdmVudCk7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWwuVHVyYm9saW5rcyA9PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFnZTpjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgICAgIEhvbGRlci5ydW4oKTtcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEhvbGRlcjtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qIVxuXHQgKiBvbkRvbVJlYWR5LmpzIDEuNC4wIChjKSAyMDEzIFR1YmFsIE1hcnRpbiAtIE1JVCBsaWNlbnNlXG5cdCAqXG5cdCAqIFNwZWNpYWxseSBtb2RpZmllZCB0byB3b3JrIHdpdGggSG9sZGVyLmpzXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIF9vbkRvbVJlYWR5KHdpbikge1xuXHQgICAgLy9MYXp5IGxvYWRpbmcgZml4IGZvciBGaXJlZm94IDwgMy42XG5cdCAgICAvL2h0dHA6Ly93ZWJyZWZsZWN0aW9uLmJsb2dzcG90LmNvbS8yMDA5LzExLzE5NS1jaGFycy10by1oZWxwLWxhenktbG9hZGluZy5odG1sXG5cdCAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBudWxsICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0ICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiBET01Db250ZW50TG9hZGVkKCkge1xuXHQgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBET01Db250ZW50TG9hZGVkLCBmYWxzZSk7XG5cdCAgICAgICAgICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPSBcImNvbXBsZXRlXCI7XG5cdCAgICAgICAgfSwgZmFsc2UpO1xuXHQgICAgICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPSBcImxvYWRpbmdcIjtcblx0ICAgIH1cblx0ICAgIFxuXHQgICAgdmFyIGRvYyA9IHdpbi5kb2N1bWVudCxcblx0ICAgICAgICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblx0ICAgIFxuXHQgICAgICAgIExPQUQgPSBcImxvYWRcIixcblx0ICAgICAgICBGQUxTRSA9IGZhbHNlLFxuXHQgICAgICAgIE9OTE9BRCA9IFwib25cIitMT0FELFxuXHQgICAgICAgIENPTVBMRVRFID0gXCJjb21wbGV0ZVwiLFxuXHQgICAgICAgIFJFQURZU1RBVEUgPSBcInJlYWR5U3RhdGVcIixcblx0ICAgICAgICBBVFRBQ0hFVkVOVCA9IFwiYXR0YWNoRXZlbnRcIixcblx0ICAgICAgICBERVRBQ0hFVkVOVCA9IFwiZGV0YWNoRXZlbnRcIixcblx0ICAgICAgICBBRERFVkVOVExJU1RFTkVSID0gXCJhZGRFdmVudExpc3RlbmVyXCIsXG5cdCAgICAgICAgRE9NQ09OVEVOVExPQURFRCA9IFwiRE9NQ29udGVudExvYWRlZFwiLFxuXHQgICAgICAgIE9OUkVBRFlTVEFURUNIQU5HRSA9IFwib25yZWFkeXN0YXRlY2hhbmdlXCIsXG5cdCAgICAgICAgUkVNT1ZFRVZFTlRMSVNURU5FUiA9IFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLFxuXHQgICAgXG5cdCAgICAgICAgLy8gVzNDIEV2ZW50IG1vZGVsXG5cdCAgICAgICAgdzNjID0gQURERVZFTlRMSVNURU5FUiBpbiBkb2MsXG5cdCAgICAgICAgX3RvcCA9IEZBTFNFLFxuXHQgICAgXG5cdCAgICAgICAgLy8gaXNSZWFkeTogSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cblx0ICAgICAgICBpc1JlYWR5ID0gRkFMU0UsXG5cdCAgICBcblx0ICAgICAgICAvLyBDYWxsYmFja3MgcGVuZGluZyBleGVjdXRpb24gdW50aWwgRE9NIGlzIHJlYWR5XG5cdCAgICAgICAgY2FsbGJhY2tzID0gW107XG5cdCAgICBcblx0ICAgIC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0ICAgIGZ1bmN0aW9uIHJlYWR5KCBmbiApIHtcblx0ICAgICAgICBpZiAoICFpc1JlYWR5ICkge1xuXHQgICAgXG5cdCAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSBib2R5IGV4aXN0cywgYXQgbGVhc3QsIGluIGNhc2UgSUUgZ2V0cyBhIGxpdHRsZSBvdmVyemVhbG91cyAodGlja2V0ICM1NDQzKS5cblx0ICAgICAgICAgICAgaWYgKCAhZG9jLmJvZHkgKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIoIHJlYWR5ICk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgIFxuXHQgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcblx0ICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG5cdCAgICBcblx0ICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbGwgY2FsbGJhY2tzXG5cdCAgICAgICAgICAgIHdoaWxlICggZm4gPSBjYWxsYmFja3Muc2hpZnQoKSApIHtcblx0ICAgICAgICAgICAgICAgIGRlZmVyKCBmbiApO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgXG5cdCAgICAvLyBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlclxuXHQgICAgZnVuY3Rpb24gY29tcGxldGVkKCBldmVudCApIHtcblx0ICAgICAgICAvLyByZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgaXMgZ29vZCBlbm91Z2ggZm9yIHVzIHRvIGNhbGwgdGhlIGRvbSByZWFkeSBpbiBvbGRJRVxuXHQgICAgICAgIGlmICggdzNjIHx8IGV2ZW50LnR5cGUgPT09IExPQUQgfHwgZG9jW1JFQURZU1RBVEVdID09PSBDT01QTEVURSApIHtcblx0ICAgICAgICAgICAgZGV0YWNoKCk7XG5cdCAgICAgICAgICAgIHJlYWR5KCk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgXG5cdCAgICAvLyBDbGVhbi11cCBtZXRob2QgZm9yIGRvbSByZWFkeSBldmVudHNcblx0ICAgIGZ1bmN0aW9uIGRldGFjaCgpIHtcblx0ICAgICAgICBpZiAoIHczYyApIHtcblx0ICAgICAgICAgICAgZG9jW1JFTU9WRUVWRU5UTElTVEVORVJdKCBET01DT05URU5UTE9BREVELCBjb21wbGV0ZWQsIEZBTFNFICk7XG5cdCAgICAgICAgICAgIHdpbltSRU1PVkVFVkVOVExJU1RFTkVSXSggTE9BRCwgY29tcGxldGVkLCBGQUxTRSApO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGRvY1tERVRBQ0hFVkVOVF0oIE9OUkVBRFlTVEFURUNIQU5HRSwgY29tcGxldGVkICk7XG5cdCAgICAgICAgICAgIHdpbltERVRBQ0hFVkVOVF0oIE9OTE9BRCwgY29tcGxldGVkICk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgXG5cdCAgICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXMgY2xlYXJlZC5cblx0ICAgIGZ1bmN0aW9uIGRlZmVyKCBmbiwgd2FpdCApIHtcblx0ICAgICAgICAvLyBBbGxvdyAwIHRvIGJlIHBhc3NlZFxuXHQgICAgICAgIHNldFRpbWVvdXQoIGZuLCArd2FpdCA+PSAwID8gd2FpdCA6IDEgKTtcblx0ICAgIH1cblx0ICAgIFxuXHQgICAgLy8gQXR0YWNoIHRoZSBsaXN0ZW5lcnM6XG5cdCAgICBcblx0ICAgIC8vIENhdGNoIGNhc2VzIHdoZXJlIG9uRG9tUmVhZHkgaXMgY2FsbGVkIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuXHQgICAgLy8gd2Ugb25jZSB0cmllZCB0byB1c2UgcmVhZHlTdGF0ZSBcImludGVyYWN0aXZlXCIgaGVyZSwgYnV0IGl0IGNhdXNlZCBpc3N1ZXMgbGlrZSB0aGUgb25lXG5cdCAgICAvLyBkaXNjb3ZlcmVkIGJ5IENocmlzUyBoZXJlOiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjI4MiNjb21tZW50OjE1XG5cdCAgICBpZiAoIGRvY1tSRUFEWVNUQVRFXSA9PT0gQ09NUExFVEUgKSB7XG5cdCAgICAgICAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XG5cdCAgICAgICAgZGVmZXIoIHJlYWR5ICk7XG5cdCAgICBcblx0ICAgIC8vIFN0YW5kYXJkcy1iYXNlZCBicm93c2VycyBzdXBwb3J0IERPTUNvbnRlbnRMb2FkZWRcblx0ICAgIH0gZWxzZSBpZiAoIHczYyApIHtcblx0ICAgICAgICAvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdCAgICAgICAgZG9jW0FEREVWRU5UTElTVEVORVJdKCBET01DT05URU5UTE9BREVELCBjb21wbGV0ZWQsIEZBTFNFICk7XG5cdCAgICBcblx0ICAgICAgICAvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHQgICAgICAgIHdpbltBRERFVkVOVExJU1RFTkVSXSggTE9BRCwgY29tcGxldGVkLCBGQUxTRSApO1xuXHQgICAgXG5cdCAgICAvLyBJZiBJRSBldmVudCBtb2RlbCBpcyB1c2VkXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIC8vIEVuc3VyZSBmaXJpbmcgYmVmb3JlIG9ubG9hZCwgbWF5YmUgbGF0ZSBidXQgc2FmZSBhbHNvIGZvciBpZnJhbWVzXG5cdCAgICAgICAgZG9jW0FUVEFDSEVWRU5UXSggT05SRUFEWVNUQVRFQ0hBTkdFLCBjb21wbGV0ZWQgKTtcblx0ICAgIFxuXHQgICAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG5cdCAgICAgICAgd2luW0FUVEFDSEVWRU5UXSggT05MT0FELCBjb21wbGV0ZWQgKTtcblx0ICAgIFxuXHQgICAgICAgIC8vIElmIElFIGFuZCBub3QgYSBmcmFtZVxuXHQgICAgICAgIC8vIGNvbnRpbnVhbGx5IGNoZWNrIHRvIHNlZSBpZiB0aGUgZG9jdW1lbnQgaXMgcmVhZHlcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBfdG9wID0gd2luLmZyYW1lRWxlbWVudCA9PSBudWxsICYmIGRvY0VsZW07XG5cdCAgICAgICAgfSBjYXRjaChlKSB7fVxuXHQgICAgXG5cdCAgICAgICAgaWYgKCBfdG9wICYmIF90b3AuZG9TY3JvbGwgKSB7XG5cdCAgICAgICAgICAgIChmdW5jdGlvbiBkb1Njcm9sbENoZWNrKCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKCAhaXNSZWFkeSApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHRyaWNrIGJ5IERpZWdvIFBlcmluaVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vSUVDb250ZW50TG9hZGVkL1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBfdG9wLmRvU2Nyb2xsKFwibGVmdFwiKTtcblx0ICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyKCBkb1Njcm9sbENoZWNrLCA1MCApO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIC8vIGRldGFjaCBhbGwgZG9tIHJlYWR5IGV2ZW50c1xuXHQgICAgICAgICAgICAgICAgICAgIGRldGFjaCgpO1xuXHQgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGV4ZWN1dGUgYW55IHdhaXRpbmcgZnVuY3Rpb25zXG5cdCAgICAgICAgICAgICAgICAgICAgcmVhZHkoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSkoKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBcblx0ICAgIGZ1bmN0aW9uIG9uRG9tUmVhZHkoIGZuICkge1xuXHQgICAgICAgIC8vIElmIERPTSBpcyByZWFkeSwgZXhlY3V0ZSB0aGUgZnVuY3Rpb24gKGFzeW5jKSwgb3RoZXJ3aXNlIHdhaXRcblx0ICAgICAgICBpc1JlYWR5ID8gZGVmZXIoIGZuICkgOiBjYWxsYmFja3MucHVzaCggZm4gKTtcblx0ICAgIH1cblx0ICAgIFxuXHQgICAgLy8gQWRkIHZlcnNpb25cblx0ICAgIG9uRG9tUmVhZHkudmVyc2lvbiA9IFwiMS40LjBcIjtcblx0ICAgIC8vIEFkZCBtZXRob2QgdG8gY2hlY2sgaWYgRE9NIGlzIHJlYWR5XG5cdCAgICBvbkRvbVJlYWR5LmlzUmVhZHkgPSBmdW5jdGlvbigpe1xuXHQgICAgICAgIHJldHVybiBpc1JlYWR5O1xuXHQgICAgfTtcblxuXHQgICAgcmV0dXJuIG9uRG9tUmVhZHk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgX29uRG9tUmVhZHkod2luZG93KTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly9Nb2RpZmllZCB2ZXJzaW9uIG9mIGNvbXBvbmVudC9xdWVyeXN0cmluZ1xuXHQvL0NoYW5nZXM6IHVwZGF0ZWQgZGVwZW5kZW5jaWVzLCBkb3Qgbm90YXRpb24gcGFyc2luZywgSlNIaW50IGZpeGVzXG5cdC8vRm9yayBhdCBodHRwczovL2dpdGh1Yi5jb20vaW1za3kvcXVlcnlzdHJpbmdcblxuXHQvKipcblx0ICogTW9kdWxlIGRlcGVuZGVuY2llcy5cblx0ICovXG5cblx0dmFyIGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcblx0dmFyIGRlY29kZSA9IGRlY29kZVVSSUNvbXBvbmVudDtcblx0dmFyIHRyaW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgdHlwZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGFycmF5UmVnZXggPSAvKFxcdyspXFxbKFxcZCspXFxdLztcblx0dmFyIG9iamVjdFJlZ2V4ID0gL1xcdytcXC5cXHcrLztcblxuXHQvKipcblx0ICogUGFyc2UgdGhlIGdpdmVuIHF1ZXJ5IGBzdHJgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG5cdCAqIEByZXR1cm4ge09iamVjdH1cblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKHN0cil7XG5cdCAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2Ygc3RyKSByZXR1cm4ge307XG5cblx0ICBzdHIgPSB0cmltKHN0cik7XG5cdCAgaWYgKCcnID09PSBzdHIpIHJldHVybiB7fTtcblx0ICBpZiAoJz8nID09PSBzdHIuY2hhckF0KDApKSBzdHIgPSBzdHIuc2xpY2UoMSk7XG5cblx0ICB2YXIgb2JqID0ge307XG5cdCAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuXHQgICAgdmFyIHBhcnRzID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcblx0ICAgIHZhciBrZXkgPSBkZWNvZGUocGFydHNbMF0pO1xuXHQgICAgdmFyIG0sIGN0eCwgcHJvcDtcblxuXHQgICAgaWYgKG0gPSBhcnJheVJlZ2V4LmV4ZWMoa2V5KSkge1xuXHQgICAgICBvYmpbbVsxXV0gPSBvYmpbbVsxXV0gfHwgW107XG5cdCAgICAgIG9ialttWzFdXVttWzJdXSA9IGRlY29kZShwYXJ0c1sxXSk7XG5cdCAgICAgIGNvbnRpbnVlO1xuXHQgICAgfVxuXG5cdCAgICBpZiAobSA9IG9iamVjdFJlZ2V4LnRlc3Qoa2V5KSkge1xuXHQgICAgICBtID0ga2V5LnNwbGl0KCcuJyk7XG5cdCAgICAgIGN0eCA9IG9iajtcblx0ICAgICAgXG5cdCAgICAgIHdoaWxlIChtLmxlbmd0aCkge1xuXHQgICAgICAgIHByb3AgPSBtLnNoaWZ0KCk7XG5cblx0ICAgICAgICBpZiAoIXByb3AubGVuZ3RoKSBjb250aW51ZTtcblxuXHQgICAgICAgIGlmICghY3R4W3Byb3BdKSB7XG5cdCAgICAgICAgICBjdHhbcHJvcF0gPSB7fTtcblx0ICAgICAgICB9IGVsc2UgaWYgKGN0eFtwcm9wXSAmJiB0eXBlb2YgY3R4W3Byb3BdICE9PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKCFtLmxlbmd0aCkge1xuXHQgICAgICAgICAgY3R4W3Byb3BdID0gZGVjb2RlKHBhcnRzWzFdKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBjdHggPSBjdHhbcHJvcF07XG5cdCAgICAgIH1cblxuXHQgICAgICBjb250aW51ZTtcblx0ICAgIH1cblxuXHQgICAgb2JqW3BhcnRzWzBdXSA9IG51bGwgPT0gcGFydHNbMV0gPyAnJyA6IGRlY29kZShwYXJ0c1sxXSk7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIG9iajtcblx0fTtcblxuXHQvKipcblx0ICogU3RyaW5naWZ5IHRoZSBnaXZlbiBgb2JqYC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqIEBhcGkgcHVibGljXG5cdCAqL1xuXG5cdGV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24ob2JqKXtcblx0ICBpZiAoIW9iaikgcmV0dXJuICcnO1xuXHQgIHZhciBwYWlycyA9IFtdO1xuXG5cdCAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG5cblx0ICAgIGlmICgnYXJyYXknID09IHR5cGUodmFsdWUpKSB7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcblx0ICAgICAgICBwYWlycy5wdXNoKGVuY29kZShrZXkgKyAnWycgKyBpICsgJ10nKSArICc9JyArIGVuY29kZSh2YWx1ZVtpXSkpO1xuXHQgICAgICB9XG5cdCAgICAgIGNvbnRpbnVlO1xuXHQgICAgfVxuXG5cdCAgICBwYWlycy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKG9ialtrZXldKSk7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcblx0fTtcblxuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0ZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHJpbTtcblxuXHRmdW5jdGlvbiB0cmltKHN0cil7XG5cdCAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG5cdH1cblxuXHRleHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuXHQgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJyk7XG5cdH07XG5cblx0ZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG5cdCAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMqJC8sICcnKTtcblx0fTtcblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogdG9TdHJpbmcgcmVmLlxuXHQgKi9cblxuXHR2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHR5cGUgb2YgYHZhbGAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqIEBhcGkgcHVibGljXG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsKXtcblx0ICBzd2l0Y2ggKHRvU3RyaW5nLmNhbGwodmFsKSkge1xuXHQgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6IHJldHVybiAnZGF0ZSc7XG5cdCAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOiByZXR1cm4gJ3JlZ2V4cCc7XG5cdCAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG5cdCAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6IHJldHVybiAnYXJyYXknO1xuXHQgICAgY2FzZSAnW29iamVjdCBFcnJvcl0nOiByZXR1cm4gJ2Vycm9yJztcblx0ICB9XG5cblx0ICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuXHQgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuXHQgIGlmICh2YWwgIT09IHZhbCkgcmV0dXJuICduYW4nO1xuXHQgIGlmICh2YWwgJiYgdmFsLm5vZGVUeXBlID09PSAxKSByZXR1cm4gJ2VsZW1lbnQnO1xuXG5cdCAgdmFsID0gdmFsLnZhbHVlT2Zcblx0ICAgID8gdmFsLnZhbHVlT2YoKVxuXHQgICAgOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuYXBwbHkodmFsKVxuXG5cdCAgcmV0dXJuIHR5cGVvZiB2YWw7XG5cdH07XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIFNjZW5lR3JhcGggPSBmdW5jdGlvbihzY2VuZVByb3BlcnRpZXMpIHtcblx0ICAgIHZhciBub2RlQ291bnQgPSAxO1xuXG5cdCAgICAvL3RvZG86IG1vdmUgbWVyZ2UgdG8gaGVscGVycyBzZWN0aW9uXG5cdCAgICBmdW5jdGlvbiBtZXJnZShwYXJlbnQsIGNoaWxkKSB7XG5cdCAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBjaGlsZCkge1xuXHQgICAgICAgICAgICBwYXJlbnRbcHJvcF0gPSBjaGlsZFtwcm9wXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHBhcmVudDtcblx0ICAgIH1cblxuXHQgICAgdmFyIFNjZW5lTm9kZSA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0ICAgICAgICBub2RlQ291bnQrKztcblx0ICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cdCAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHt9O1xuXHQgICAgICAgIHRoaXMuaWQgPSBub2RlQ291bnQ7XG5cdCAgICAgICAgdGhpcy5uYW1lID0gJ24nICsgbm9kZUNvdW50O1xuXHQgICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy56ID0gMDtcblx0ICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5oZWlnaHQgPSAwO1xuXHQgICAgfTtcblxuXHQgICAgU2NlbmVOb2RlLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdCAgICAgICAgaWYgKHdpZHRoICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoaGVpZ2h0ICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgU2NlbmVOb2RlLnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbih4LCB5LCB6KSB7XG5cdCAgICAgICAgdGhpcy54ID0geCAhPSBudWxsID8geCA6IHRoaXMueDtcblx0ICAgICAgICB0aGlzLnkgPSB5ICE9IG51bGwgPyB5IDogdGhpcy55O1xuXHQgICAgICAgIHRoaXMueiA9IHogIT0gbnVsbCA/IHogOiB0aGlzLno7XG5cdCAgICB9O1xuXG5cdCAgICBTY2VuZU5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG5cdCAgICAgICAgdmFyIG5hbWUgPSBjaGlsZC5uYW1lO1xuXHQgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jaGlsZHJlbltuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltuYW1lXSA9IGNoaWxkO1xuXHQgICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHRocm93ICdTY2VuZUdyYXBoOiBjaGlsZCBhbHJlYWR5IGV4aXN0czogJyArIG5hbWU7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgdmFyIFJvb3ROb2RlID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgU2NlbmVOb2RlLmNhbGwodGhpcywgJ3Jvb3QnKTtcblx0ICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBzY2VuZVByb3BlcnRpZXM7XG5cdCAgICB9O1xuXG5cdCAgICBSb290Tm9kZS5wcm90b3R5cGUgPSBuZXcgU2NlbmVOb2RlKCk7XG5cblx0ICAgIHZhciBTaGFwZSA9IGZ1bmN0aW9uKG5hbWUsIHByb3BzKSB7XG5cdCAgICAgICAgU2NlbmVOb2RlLmNhbGwodGhpcywgbmFtZSk7XG5cdCAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0ge1xuXHQgICAgICAgICAgICAnZmlsbCc6ICcjMDAwMDAwJ1xuXHQgICAgICAgIH07XG5cdCAgICAgICAgaWYgKHR5cGVvZiBwcm9wcyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICAgICAgbWVyZ2UodGhpcy5wcm9wZXJ0aWVzLCBwcm9wcyk7XG5cdCAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgIHRocm93ICdTY2VuZUdyYXBoOiBpbnZhbGlkIG5vZGUgbmFtZSc7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgU2hhcGUucHJvdG90eXBlID0gbmV3IFNjZW5lTm9kZSgpO1xuXG5cdCAgICB2YXIgR3JvdXAgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgIHRoaXMudHlwZSA9ICdncm91cCc7XG5cdCAgICB9O1xuXG5cdCAgICBHcm91cC5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcblxuXHQgICAgdmFyIFJlY3QgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgIHRoaXMudHlwZSA9ICdyZWN0Jztcblx0ICAgIH07XG5cblx0ICAgIFJlY3QucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5cblx0ICAgIHZhciBUZXh0ID0gZnVuY3Rpb24odGV4dCkge1xuXHQgICAgICAgIFNoYXBlLmNhbGwodGhpcyk7XG5cdCAgICAgICAgdGhpcy50eXBlID0gJ3RleHQnO1xuXHQgICAgICAgIHRoaXMucHJvcGVydGllcy50ZXh0ID0gdGV4dDtcblx0ICAgIH07XG5cblx0ICAgIFRleHQucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5cblx0ICAgIHZhciByb290ID0gbmV3IFJvb3ROb2RlKCk7XG5cblx0ICAgIHRoaXMuU2hhcGUgPSB7XG5cdCAgICAgICAgJ1JlY3QnOiBSZWN0LFxuXHQgICAgICAgICdUZXh0JzogVGV4dCxcblx0ICAgICAgICAnR3JvdXAnOiBHcm91cFxuXHQgICAgfTtcblxuXHQgICAgdGhpcy5yb290ID0gcm9vdDtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gU2NlbmVHcmFwaDtcblxuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7LyoqXG5cdCAqIFNoYWxsb3cgb2JqZWN0IGNsb25lIGFuZCBtZXJnZVxuXHQgKlxuXHQgKiBAcGFyYW0gYSBPYmplY3QgQVxuXHQgKiBAcGFyYW0gYiBPYmplY3QgQlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHdpdGggYWxsIG9mIEEncyBwcm9wZXJ0aWVzLCBhbmQgYWxsIG9mIEIncyBwcm9wZXJ0aWVzLCBvdmVyd3JpdGluZyBBJ3MgcHJvcGVydGllc1xuXHQgKi9cblx0ZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbihhLCBiKSB7XG5cdCAgICB2YXIgYyA9IHt9O1xuXHQgICAgZm9yICh2YXIgeCBpbiBhKSB7XG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLHgpKSB7XG5cdCAgICAgICAgICAgIGNbeF0gPSBhW3hdO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmIChiICE9IG51bGwpIHtcblx0ICAgICAgICBmb3IgKHZhciB5IGluIGIpIHtcblx0ICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCB5KSkge1xuXHQgICAgICAgICAgICAgICAgY1t5XSA9IGJbeV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gYztcblx0fTtcblxuXHQvKipcblx0ICogVGFrZXMgYSBrL3YgbGlzdCBvZiBDU1MgcHJvcGVydGllcyBhbmQgcmV0dXJucyBhIHJ1bGVcblx0ICpcblx0ICogQHBhcmFtIHByb3BzIENTUyBwcm9wZXJ0aWVzIG9iamVjdFxuXHQgKi9cblx0ZXhwb3J0cy5jc3NQcm9wcyA9IGZ1bmN0aW9uKHByb3BzKSB7XG5cdCAgICB2YXIgcmV0ID0gW107XG5cdCAgICBmb3IgKHZhciBwIGluIHByb3BzKSB7XG5cdCAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywgcCkpIHtcblx0ICAgICAgICAgICAgcmV0LnB1c2gocCArICc6JyArIHByb3BzW3BdKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmV0LmpvaW4oJzsnKTtcblx0fTtcblxuXHQvKipcblx0ICogRW5jb2RlcyBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSBzdHIgSW5wdXQgc3RyaW5nXG5cdCAqL1xuXHRleHBvcnRzLmVuY29kZUh0bWxFbnRpdHkgPSBmdW5jdGlvbihzdHIpIHtcblx0ICAgIHZhciBidWYgPSBbXTtcblx0ICAgIHZhciBjaGFyQ29kZSA9IDA7XG5cdCAgICBmb3IgKHZhciBpID0gc3RyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICAgICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcblx0ICAgICAgICBpZiAoY2hhckNvZGUgPiAxMjgpIHtcblx0ICAgICAgICAgICAgYnVmLnVuc2hpZnQoWycmIycsIGNoYXJDb2RlLCAnOyddLmpvaW4oJycpKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBidWYudW5zaGlmdChzdHJbaV0pO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBidWYuam9pbignJyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhbiBpbWFnZSBleGlzdHNcblx0ICpcblx0ICogQHBhcmFtIHNyYyBVUkwgb2YgaW1hZ2Vcblx0ICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgb25jZSBpbWFnZSBzdGF0dXMgaGFzIGJlZW4gZm91bmRcblx0ICovXG5cdGV4cG9ydHMuaW1hZ2VFeGlzdHMgPSBmdW5jdGlvbihzcmMsIGNhbGxiYWNrKSB7XG5cdCAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0ICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0ICAgIH07XG5cdCAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHRydWUpO1xuXHQgICAgfTtcblx0ICAgIGltYWdlLnNyYyA9IHNyYztcblx0fTtcblxuXHQvKipcblx0ICogRGVjb2RlcyBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSBzdHIgSW5wdXQgc3RyaW5nXG5cdCAqL1xuXHRleHBvcnRzLmRlY29kZUh0bWxFbnRpdHkgPSBmdW5jdGlvbihzdHIpIHtcblx0ICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uKG1hdGNoLCBkZWMpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShkZWMpO1xuXHQgICAgfSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBlbGVtZW50J3MgZGltZW5zaW9ucyBpZiBpdCdzIHZpc2libGUsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuXHQgKlxuXHQgKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnRcblx0ICovXG5cdGV4cG9ydHMuZGltZW5zaW9uQ2hlY2sgPSBmdW5jdGlvbihlbCkge1xuXHQgICAgdmFyIGRpbWVuc2lvbnMgPSB7XG5cdCAgICAgICAgaGVpZ2h0OiBlbC5jbGllbnRIZWlnaHQsXG5cdCAgICAgICAgd2lkdGg6IGVsLmNsaWVudFdpZHRoXG5cdCAgICB9O1xuXG5cdCAgICBpZiAoZGltZW5zaW9ucy5oZWlnaHQgJiYgZGltZW5zaW9ucy53aWR0aCkge1xuXHQgICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICB9XG5cdH07XG5cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHZhbHVlIGlzIHRydXRoeSBvciBpZiBpdCBpcyBcInNlbWFudGljYWxseSB0cnV0aHlcIlxuXHQgKiBAcGFyYW0gdmFsXG5cdCAqL1xuXHRleHBvcnRzLnRydXRoeSA9IGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgcmV0dXJuIHZhbCA9PT0gJ3RydWUnIHx8IHZhbCA9PT0gJ3llcycgfHwgdmFsID09PSAnMScgfHwgdmFsID09PSAnb24nIHx8IHZhbCA9PT0gJ+Kckyc7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gISF2YWw7XG5cdH07XG5cblx0LyoqXG5cdCAqIFBhcnNlcyBpbnB1dCBpbnRvIGEgd2VsbC1mb3JtZWQgQ1NTIGNvbG9yXG5cdCAqIEBwYXJhbSB2YWxcblx0ICovXG5cdGV4cG9ydHMucGFyc2VDb2xvciA9IGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgdmFyIGhleHJlID0gLyheKD86Iz8pWzAtOWEtZl17Nn0kKXwoXig/OiM/KVswLTlhLWZdezN9JCkvaTtcblx0ICAgIHZhciByZ2JyZSA9IC9ecmdiXFwoKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKlxcKSQvO1xuXHQgICAgdmFyIHJnYmFyZSA9IC9ecmdiYVxcKChcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccyosXFxzKigwKlxcLlxcZHsxLH18MSlcXCkkLztcblxuXHQgICAgdmFyIG1hdGNoID0gdmFsLm1hdGNoKGhleHJlKTtcblx0ICAgIHZhciByZXR2YWw7XG5cblx0ICAgIGlmIChtYXRjaCAhPT0gbnVsbCkge1xuXHQgICAgICAgIHJldHZhbCA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdO1xuXHQgICAgICAgIGlmIChyZXR2YWxbMF0gIT09ICcjJykge1xuXHQgICAgICAgICAgICByZXR1cm4gJyMnICsgcmV0dmFsO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBtYXRjaCA9IHZhbC5tYXRjaChyZ2JyZSk7XG5cblx0ICAgIGlmIChtYXRjaCAhPT0gbnVsbCkge1xuXHQgICAgICAgIHJldHZhbCA9ICdyZ2IoJyArIG1hdGNoLnNsaWNlKDEpLmpvaW4oJywnKSArICcpJztcblx0ICAgICAgICByZXR1cm4gcmV0dmFsO1xuXHQgICAgfVxuXG5cdCAgICBtYXRjaCA9IHZhbC5tYXRjaChyZ2JhcmUpO1xuXG5cdCAgICBpZiAobWF0Y2ggIT09IG51bGwpIHtcblx0ICAgICAgICB2YXIgbm9ybWFsaXplQWxwaGEgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gJzAuJyArIGEuc3BsaXQoJy4nKVsxXTsgfTtcblx0ICAgICAgICB2YXIgZml4ZWRNYXRjaCA9IG1hdGNoLnNsaWNlKDEpLm1hcChmdW5jdGlvbiAoZSwgaSkge1xuXHQgICAgICAgICAgICByZXR1cm4gKGkgPT09IDMpID8gbm9ybWFsaXplQWxwaGEoZSkgOiBlO1xuXHQgICAgICAgIH0pO1xuXHQgICAgICAgIHJldHZhbCA9ICdyZ2JhKCcgKyBmaXhlZE1hdGNoLmpvaW4oJywnKSArICcpJztcblx0ICAgICAgICByZXR1cm4gcmV0dmFsO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gbnVsbDtcblx0fTtcblxuXHQvKipcblx0ICogUHJvdmlkZXMgdGhlIGNvcnJlY3Qgc2NhbGluZyByYXRpbyBmb3IgY2FudmFzIGRyYXdpbmcgb3BlcmF0aW9ucyBvbiBIaURQSSBzY3JlZW5zIChlLmcuIFJldGluYSBkaXNwbGF5cylcblx0ICovXG5cdGV4cG9ydHMuY2FudmFzUmF0aW8gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG5cdCAgICB2YXIgYmFja2luZ1N0b3JlUmF0aW8gPSAxO1xuXG5cdCAgICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG5cdCAgICAgICAgdmFyIGNhbnZhcyA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0ICAgICAgICBpZiAoY2FudmFzLmdldENvbnRleHQpIHtcblx0ICAgICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHQgICAgICAgICAgICBkZXZpY2VQaXhlbFJhdGlvID0gZ2xvYmFsLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblx0ICAgICAgICAgICAgYmFja2luZ1N0b3JlUmF0aW8gPSBjdHgud2Via2l0QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCBjdHgubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCBjdHgubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IGN0eC5vQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCBjdHguYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIGRldmljZVBpeGVsUmF0aW8gLyBiYWNraW5nU3RvcmVSYXRpbztcblx0fTtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihnbG9iYWwpIHt2YXIgRE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblxuXHR2YXIgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblx0dmFyIE5PREVfVFlQRV9DT01NRU5UID0gODtcblxuXHQvKipcblx0ICogR2VuZXJpYyBTVkcgZWxlbWVudCBjcmVhdGlvbiBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gc3ZnIFNWRyBjb250ZXh0LCBzZXQgdG8gbnVsbCBpZiBuZXdcblx0ICogQHBhcmFtIHdpZHRoIERvY3VtZW50IHdpZHRoXG5cdCAqIEBwYXJhbSBoZWlnaHQgRG9jdW1lbnQgaGVpZ2h0XG5cdCAqL1xuXHRleHBvcnRzLmluaXRTVkcgPSBmdW5jdGlvbihzdmcsIHdpZHRoLCBoZWlnaHQpIHtcblx0ICAgIHZhciBkZWZzLCBzdHlsZSwgaW5pdGlhbGl6ZSA9IGZhbHNlO1xuXG5cdCAgICBpZiAoc3ZnICYmIHN2Zy5xdWVyeVNlbGVjdG9yKSB7XG5cdCAgICAgICAgc3R5bGUgPSBzdmcucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcblx0ICAgICAgICBpZiAoc3R5bGUgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgaW5pdGlhbGl6ZSA9IHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBzdmcgPSBET00ubmV3RWwoJ3N2ZycsIFNWR19OUyk7XG5cdCAgICAgICAgaW5pdGlhbGl6ZSA9IHRydWU7XG5cdCAgICB9XG5cblx0ICAgIGlmIChpbml0aWFsaXplKSB7XG5cdCAgICAgICAgZGVmcyA9IERPTS5uZXdFbCgnZGVmcycsIFNWR19OUyk7XG5cdCAgICAgICAgc3R5bGUgPSBET00ubmV3RWwoJ3N0eWxlJywgU1ZHX05TKTtcblx0ICAgICAgICBET00uc2V0QXR0cihzdHlsZSwge1xuXHQgICAgICAgICAgICAndHlwZSc6ICd0ZXh0L2Nzcydcblx0ICAgICAgICB9KTtcblx0ICAgICAgICBkZWZzLmFwcGVuZENoaWxkKHN0eWxlKTtcblx0ICAgICAgICBzdmcuYXBwZW5kQ2hpbGQoZGVmcyk7XG5cdCAgICB9XG5cblx0ICAgIC8vSUUgdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIGlzIHNldCBhbmQgQ2hyb21lIHJlcXVpcmVzIGl0IHRvIGJlIHNldFxuXHQgICAgaWYgKHN2Zy53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcblx0ICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsIFNWR19OUyk7XG5cdCAgICB9XG5cblx0ICAgIC8vUmVtb3ZlIGNvbW1lbnQgbm9kZXNcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBpZiAoc3ZnLmNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT09IE5PREVfVFlQRV9DT01NRU5UKSB7XG5cdCAgICAgICAgICAgIHN2Zy5yZW1vdmVDaGlsZChzdmcuY2hpbGROb2Rlc1tpXSk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvL1JlbW92ZSBDU1Ncblx0ICAgIHdoaWxlIChzdHlsZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuXHQgICAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmNoaWxkTm9kZXNbMF0pO1xuXHQgICAgfVxuXG5cdCAgICBET00uc2V0QXR0cihzdmcsIHtcblx0ICAgICAgICAnd2lkdGgnOiB3aWR0aCxcblx0ICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0LFxuXHQgICAgICAgICd2aWV3Qm94JzogJzAgMCAnICsgd2lkdGggKyAnICcgKyBoZWlnaHQsXG5cdCAgICAgICAgJ3ByZXNlcnZlQXNwZWN0UmF0aW8nOiAnbm9uZSdcblx0ICAgIH0pO1xuXG5cdCAgICByZXR1cm4gc3ZnO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBzZXJpYWxpemVkIFNWRyB0byBhIHN0cmluZyBzdWl0YWJsZSBmb3IgZGF0YSBVUkkgdXNlXG5cdCAqIEBwYXJhbSBzdmdTdHJpbmcgU2VyaWFsaXplZCBTVkcgc3RyaW5nXG5cdCAqIEBwYXJhbSBbYmFzZTY0XSBVc2UgYmFzZTY0IGVuY29kaW5nIGZvciBkYXRhIFVSSVxuXHQgKi9cblx0ZXhwb3J0cy5zdmdTdHJpbmdUb0RhdGFVUkkgPSBmdW5jdGlvbigpIHtcblx0ICAgIHZhciByYXdQcmVmaXggPSAnZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVRGLTgsJztcblx0ICAgIHZhciBiYXNlNjRQcmVmaXggPSAnZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVRGLTg7YmFzZTY0LCc7XG5cblx0ICAgIHJldHVybiBmdW5jdGlvbihzdmdTdHJpbmcsIGJhc2U2NCkge1xuXHQgICAgICAgIGlmIChiYXNlNjQpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NFByZWZpeCArIGJ0b2EoZ2xvYmFsLnVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdmdTdHJpbmcpKSk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHJhd1ByZWZpeCArIGVuY29kZVVSSUNvbXBvbmVudChzdmdTdHJpbmcpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdH0oKTtcblxuXHQvKipcblx0ICogUmV0dXJucyBzZXJpYWxpemVkIFNWRyB3aXRoIFhNTCBwcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuXHQgKlxuXHQgKiBAcGFyYW0gc3ZnIFNWRyBjb250ZXh0XG5cdCAqIEBwYXJhbSBzdHlsZXNoZWV0cyBDU1Mgc3R5bGVzaGVldHMgdG8gaW5jbHVkZVxuXHQgKi9cblx0ZXhwb3J0cy5zZXJpYWxpemVTVkcgPSBmdW5jdGlvbihzdmcsIGVuZ2luZVNldHRpbmdzKSB7XG5cdCAgICBpZiAoIWdsb2JhbC5YTUxTZXJpYWxpemVyKSByZXR1cm47XG5cdCAgICB2YXIgc2VyaWFsaXplciA9IG5ldyBYTUxTZXJpYWxpemVyKCk7XG5cdCAgICB2YXIgc3ZnQ1NTID0gJyc7XG5cdCAgICB2YXIgc3R5bGVzaGVldHMgPSBlbmdpbmVTZXR0aW5ncy5zdHlsZXNoZWV0cztcblxuXHQgICAgLy9FeHRlcm5hbCBzdHlsZXNoZWV0czogUHJvY2Vzc2luZyBJbnN0cnVjdGlvbiBtZXRob2Rcblx0ICAgIGlmIChlbmdpbmVTZXR0aW5ncy5zdmdYTUxTdHlsZXNoZWV0KSB7XG5cdCAgICAgICAgdmFyIHhtbCA9IERPTS5jcmVhdGVYTUwoKTtcblx0ICAgICAgICAvL0FkZCA8P3htbC1zdHlsZXNoZWV0ID8+IGRpcmVjdGl2ZXNcblx0ICAgICAgICBmb3IgKHZhciBpID0gc3R5bGVzaGVldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgdmFyIGNzc3BpID0geG1sLmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbigneG1sLXN0eWxlc2hlZXQnLCAnaHJlZj1cIicgKyBzdHlsZXNoZWV0c1tpXSArICdcIiByZWw9XCJzdHlsZXNoZWV0XCInKTtcblx0ICAgICAgICAgICAgeG1sLmluc2VydEJlZm9yZShjc3NwaSwgeG1sLmZpcnN0Q2hpbGQpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHhtbC5yZW1vdmVDaGlsZCh4bWwuZG9jdW1lbnRFbGVtZW50KTtcblx0ICAgICAgICBzdmdDU1MgPSBzZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKHhtbCk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBzdmdUZXh0ID0gc2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhzdmcpO1xuXHQgICAgc3ZnVGV4dCA9IHN2Z1RleHQucmVwbGFjZSgvJmFtcDsoI1swLTldezIsfTspL2csICcmJDEnKTtcblx0ICAgIHJldHVybiBzdmdDU1MgKyBzdmdUZXh0O1xuXHR9O1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSksXG4vKiA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkgey8qKlxuXHQgKiBHZW5lcmljIG5ldyBET00gZWxlbWVudCBmdW5jdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gdGFnIFRhZyB0byBjcmVhdGVcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBPcHRpb25hbCBuYW1lc3BhY2UgdmFsdWVcblx0ICovXG5cdGV4cG9ydHMubmV3RWwgPSBmdW5jdGlvbih0YWcsIG5hbWVzcGFjZSkge1xuXHQgICAgaWYgKCFnbG9iYWwuZG9jdW1lbnQpIHJldHVybjtcblxuXHQgICAgaWYgKG5hbWVzcGFjZSA9PSBudWxsKSB7XG5cdCAgICAgICAgcmV0dXJuIGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgdGFnKTtcblx0ICAgIH1cblx0fTtcblxuXHQvKipcblx0ICogR2VuZXJpYyBzZXRBdHRyaWJ1dGUgZnVuY3Rpb25cblx0ICpcblx0ICogQHBhcmFtIGVsIFJlZmVyZW5jZSB0byBET00gZWxlbWVudFxuXHQgKiBAcGFyYW0gYXR0cnMgT2JqZWN0IHdpdGggYXR0cmlidXRlIGtleXMgYW5kIHZhbHVlc1xuXHQgKi9cblx0ZXhwb3J0cy5zZXRBdHRyID0gZnVuY3Rpb24gKGVsLCBhdHRycykge1xuXHQgICAgZm9yICh2YXIgYSBpbiBhdHRycykge1xuXHQgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhLCBhdHRyc1thXSk7XG5cdCAgICB9XG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBYTUwgZG9jdW1lbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGV4cG9ydHMuY3JlYXRlWE1MID0gZnVuY3Rpb24oKSB7XG5cdCAgICBpZiAoIWdsb2JhbC5ET01QYXJzZXIpIHJldHVybjtcblx0ICAgIHJldHVybiBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCc8eG1sIC8+JywgJ2FwcGxpY2F0aW9uL3htbCcpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHZhbHVlIGludG8gYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWwgQSBzdHJpbmcsIGEgTm9kZUxpc3QsIGEgTm9kZSwgb3IgYW4gSFRNTENvbGxlY3Rpb25cblx0ICovXG5cdGV4cG9ydHMuZ2V0Tm9kZUFycmF5ID0gZnVuY3Rpb24odmFsKSB7XG5cdCAgICB2YXIgcmV0dmFsID0gbnVsbDtcblx0ICAgIGlmICh0eXBlb2YodmFsKSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgIHJldHZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFsKTtcblx0ICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk5vZGVMaXN0ICYmIHZhbCBpbnN0YW5jZW9mIGdsb2JhbC5Ob2RlTGlzdCkge1xuXHQgICAgICAgIHJldHZhbCA9IHZhbDtcblx0ICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk5vZGUgJiYgdmFsIGluc3RhbmNlb2YgZ2xvYmFsLk5vZGUpIHtcblx0ICAgICAgICByZXR2YWwgPSBbdmFsXTtcblx0ICAgIH0gZWxzZSBpZiAoZ2xvYmFsLkhUTUxDb2xsZWN0aW9uICYmIHZhbCBpbnN0YW5jZW9mIGdsb2JhbC5IVE1MQ29sbGVjdGlvbikge1xuXHQgICAgICAgIHJldHZhbCA9IHZhbDtcblx0ICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0ICAgICAgICByZXR2YWwgPSB2YWw7XG5cdCAgICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuXHQgICAgICAgIHJldHZhbCA9IFtdO1xuXHQgICAgfVxuXG5cdCAgICByZXR2YWwgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyZXR2YWwpO1xuXG5cdCAgICByZXR1cm4gcmV0dmFsO1xuXHR9O1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdHZhciBDb2xvciA9IGZ1bmN0aW9uKGNvbG9yLCBvcHRpb25zKSB7XG5cdCAgICAvL3RvZG86IHN1cHBvcnQgcmdiYSwgaHNsYSwgYW5kIHJyZ2diYmFhIG5vdGF0aW9uXG5cdCAgICAvL3RvZG86IHVzZSBDSUVMQUIgaW50ZXJuYWxseVxuXHQgICAgLy90b2RvOiBhZGQgY2xhbXAgZnVuY3Rpb24gKHdpdGggc2lnbilcblx0ICAgIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cblx0ICAgIHRoaXMub3JpZ2luYWwgPSBjb2xvcjtcblxuXHQgICAgaWYgKGNvbG9yLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG5cdCAgICAgICAgY29sb3IgPSBjb2xvci5zbGljZSgxKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKC9bXmEtZjAtOV0rL2kudGVzdChjb2xvcikpIHJldHVybjtcblxuXHQgICAgaWYgKGNvbG9yLmxlbmd0aCA9PT0gMykge1xuXHQgICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgvLi9nLCAnJCYkJicpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoY29sb3IubGVuZ3RoICE9PSA2KSByZXR1cm47XG5cblx0ICAgIHRoaXMuYWxwaGEgPSAxO1xuXG5cdCAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFscGhhKSB7XG5cdCAgICAgICAgdGhpcy5hbHBoYSA9IG9wdGlvbnMuYWxwaGE7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuc2V0KHBhcnNlSW50KGNvbG9yLCAxNikpO1xuXHR9O1xuXG5cdC8vdG9kbzoganNkb2NzXG5cdENvbG9yLnJnYjJoZXggPSBmdW5jdGlvbihyLCBnLCBiKSB7XG5cdCAgICBmdW5jdGlvbiBmb3JtYXQgKGRlY2ltYWwpIHtcblx0ICAgICAgICB2YXIgaGV4ID0gKGRlY2ltYWwgfCAwKS50b1N0cmluZygxNik7XG5cdCAgICAgICAgaWYgKGRlY2ltYWwgPCAxNikge1xuXHQgICAgICAgICAgICBoZXggPSAnMCcgKyBoZXg7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBoZXg7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBbciwgZywgYl0ubWFwKGZvcm1hdCkuam9pbignJyk7XG5cdH07XG5cblx0Ly90b2RvOiBqc2RvY3Ncblx0Q29sb3IuaHNsMnJnYiA9IGZ1bmN0aW9uIChoLCBzLCBsKSB7XG5cdCAgICB2YXIgSCA9IGggLyA2MDtcblx0ICAgIHZhciBDID0gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKSAqIHM7XG5cdCAgICB2YXIgWCA9IEMgKiAoMSAtIE1hdGguYWJzKHBhcnNlSW50KEgpICUgMiAtIDEpKTtcblx0ICAgIHZhciBtID0gbCAtIChDIC8gMik7XG5cblx0ICAgIHZhciByID0gMCwgZyA9IDAsIGIgPSAwO1xuXG5cdCAgICBpZiAoSCA+PSAwICYmIEggPCAxKSB7XG5cdCAgICAgICAgciA9IEM7XG5cdCAgICAgICAgZyA9IFg7XG5cdCAgICB9IGVsc2UgaWYgKEggPj0gMSAmJiBIIDwgMikge1xuXHQgICAgICAgIHIgPSBYO1xuXHQgICAgICAgIGcgPSBDO1xuXHQgICAgfSBlbHNlIGlmIChIID49IDIgJiYgSCA8IDMpIHtcblx0ICAgICAgICBnID0gQztcblx0ICAgICAgICBiID0gWDtcblx0ICAgIH0gZWxzZSBpZiAoSCA+PSAzICYmIEggPCA0KSB7XG5cdCAgICAgICAgZyA9IFg7XG5cdCAgICAgICAgYiA9IEM7XG5cdCAgICB9IGVsc2UgaWYgKEggPj0gNCAmJiBIIDwgNSkge1xuXHQgICAgICAgIHIgPSBYO1xuXHQgICAgICAgIGIgPSBDO1xuXHQgICAgfSBlbHNlIGlmIChIID49IDUgJiYgSCA8IDYpIHtcblx0ICAgICAgICByID0gQztcblx0ICAgICAgICBiID0gWDtcblx0ICAgIH1cblxuXHQgICAgciArPSBtO1xuXHQgICAgZyArPSBtO1xuXHQgICAgYiArPSBtO1xuXG5cdCAgICByID0gcGFyc2VJbnQociAqIDI1NSk7XG5cdCAgICBnID0gcGFyc2VJbnQoZyAqIDI1NSk7XG5cdCAgICBiID0gcGFyc2VJbnQoYiAqIDI1NSk7XG5cblx0ICAgIHJldHVybiBbciwgZywgYl07XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGNvbG9yIGZyb20gYSByYXcgUkdCODg4IGludGVnZXJcblx0ICogQHBhcmFtIHJhdyBSR0I4ODggcmVwcmVzZW50YXRpb24gb2YgY29sb3Jcblx0ICovXG5cdC8vdG9kbzogcmVmYWN0b3IgaW50byBhIHN0YXRpYyBtZXRob2Rcblx0Ly90b2RvOiBmYWN0b3Igb3V0IGluZGl2aWR1YWwgY29sb3Igc3BhY2VzXG5cdC8vdG9kbzogYWRkIEhTTCwgQ0lFTEFCLCBhbmQgQ0lFTFVWXG5cdENvbG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICB0aGlzLnJhdyA9IHZhbDtcblxuXHQgICAgdmFyIHIgPSAodGhpcy5yYXcgJiAweEZGMDAwMCkgPj4gMTY7XG5cdCAgICB2YXIgZyA9ICh0aGlzLnJhdyAmIDB4MDBGRjAwKSA+PiA4O1xuXHQgICAgdmFyIGIgPSAodGhpcy5yYXcgJiAweDAwMDBGRik7XG5cblx0ICAgIC8vIEJULjcwOVxuXHQgICAgdmFyIHkgPSAwLjIxMjYgKiByICsgMC43MTUyICogZyArIDAuMDcyMiAqIGI7XG5cdCAgICB2YXIgdSA9IC0wLjA5OTkxICogciAtIDAuMzM2MDkgKiBnICsgMC40MzYgKiBiO1xuXHQgICAgdmFyIHYgPSAwLjYxNSAqIHIgLSAwLjU1ODYxICogZyAtIDAuMDU2MzkgKiBiO1xuXG5cdCAgICB0aGlzLnJnYiA9IHtcblx0ICAgICAgICByOiByLFxuXHQgICAgICAgIGc6IGcsXG5cdCAgICAgICAgYjogYlxuXHQgICAgfTtcblxuXHQgICAgdGhpcy55dXYgPSB7XG5cdCAgICAgICAgeTogeSxcblx0ICAgICAgICB1OiB1LFxuXHQgICAgICAgIHY6IHZcblx0ICAgIH07XG5cblx0ICAgIHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBMaWdodGVuIG9yIGRhcmtlbiBhIGNvbG9yXG5cdCAqIEBwYXJhbSBtdWx0aXBsaWVyIEFtb3VudCB0byBsaWdodGVuIG9yIGRhcmtlbiAoLTEgdG8gMSlcblx0ICovXG5cdENvbG9yLnByb3RvdHlwZS5saWdodGVuID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xuXHQgICAgdmFyIGNtID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgTWF0aC5hYnMobXVsdGlwbGllcikpKSAqIChtdWx0aXBsaWVyIDwgMCA/IC0xIDogMSk7XG5cdCAgICB2YXIgYm0gPSAoMjU1ICogY20pIHwgMDtcblx0ICAgIHZhciBjciA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgdGhpcy5yZ2IuciArIGJtKSk7XG5cdCAgICB2YXIgY2cgPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHRoaXMucmdiLmcgKyBibSkpO1xuXHQgICAgdmFyIGNiID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB0aGlzLnJnYi5iICsgYm0pKTtcblx0ICAgIHZhciBoZXggPSBDb2xvci5yZ2IyaGV4KGNyLCBjZywgY2IpO1xuXHQgICAgcmV0dXJuIG5ldyBDb2xvcihoZXgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQgY29sb3IgaW4gaGV4IGZvcm1hdFxuXHQgKiBAcGFyYW0gYWRkSGFzaCBBZGQgYSBoYXNoIGNoYXJhY3RlciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvdXRwdXRcblx0ICovXG5cdENvbG9yLnByb3RvdHlwZS50b0hleCA9IGZ1bmN0aW9uKGFkZEhhc2gpIHtcblx0ICAgIHJldHVybiAoYWRkSGFzaCA/ICcjJyA6ICcnKSArIHRoaXMucmF3LnRvU3RyaW5nKDE2KTtcblx0fTtcblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBjdXJyZW50IGNvbG9yIGlzIGxpZ2h0ZXIgdGhhbiBhbm90aGVyIGNvbG9yXG5cdCAqIEBwYXJhbSBjb2xvciBDb2xvciB0byBjb21wYXJlIGFnYWluc3Rcblx0ICovXG5cdENvbG9yLnByb3RvdHlwZS5saWdodGVyVGhhbiA9IGZ1bmN0aW9uKGNvbG9yKSB7XG5cdCAgICBpZiAoIShjb2xvciBpbnN0YW5jZW9mIENvbG9yKSkge1xuXHQgICAgICAgIGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKTtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHRoaXMueXV2LnkgPiBjb2xvci55dXYueTtcblx0fTtcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIG1peGluZyBjdXJyZW50IGNvbG9yIHdpdGggYW5vdGhlciBjb2xvclxuXHQgKiBAcGFyYW0gY29sb3IgQ29sb3IgdG8gbWl4IHdpdGhcblx0ICogQHBhcmFtIG11bHRpcGxpZXIgSG93IG11Y2ggdG8gbWl4IHdpdGggdGhlIG90aGVyIGNvbG9yXG5cdCAqL1xuXHQvKlxuXHRDb2xvci5wcm90b3R5cGUubWl4ID0gZnVuY3Rpb24gKGNvbG9yLCBtdWx0aXBsaWVyKSB7XG5cdCAgICBpZiAoIShjb2xvciBpbnN0YW5jZW9mIENvbG9yKSkge1xuXHQgICAgICAgIGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIHIgPSB0aGlzLnJnYi5yO1xuXHQgICAgdmFyIGcgPSB0aGlzLnJnYi5nO1xuXHQgICAgdmFyIGIgPSB0aGlzLnJnYi5iO1xuXHQgICAgdmFyIGEgPSB0aGlzLmFscGhhO1xuXG5cdCAgICB2YXIgbSA9IHR5cGVvZiBtdWx0aXBsaWVyICE9PSAndW5kZWZpbmVkJyA/IG11bHRpcGxpZXIgOiAwLjU7XG5cblx0ICAgIC8vdG9kbzogd3JpdGUgYSBsZXJwIGZ1bmN0aW9uXG5cdCAgICByID0gciArIG0gKiAoY29sb3IucmdiLnIgLSByKTtcblx0ICAgIGcgPSBnICsgbSAqIChjb2xvci5yZ2IuZyAtIGcpO1xuXHQgICAgYiA9IGIgKyBtICogKGNvbG9yLnJnYi5iIC0gYik7XG5cdCAgICBhID0gYSArIG0gKiAoY29sb3IuYWxwaGEgLSBhKTtcblxuXHQgICAgcmV0dXJuIG5ldyBDb2xvcihDb2xvci5yZ2JUb0hleChyLCBnLCBiKSwge1xuXHQgICAgICAgICdhbHBoYSc6IGFcblx0ICAgIH0pO1xuXHR9O1xuXHQqL1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYmxlbmRpbmcgYW5vdGhlciBjb2xvciBvbiB0b3Agb2YgY3VycmVudCBjb2xvciB3aXRoIGFscGhhXG5cdCAqIEBwYXJhbSBjb2xvciBDb2xvciB0byBibGVuZCBvbiB0b3Agb2YgY3VycmVudCBjb2xvciwgaS5lLiBcIkNhXCJcblx0ICovXG5cdC8vdG9kbzogc2VlIGlmIC5ibGVuZEFscGhhIGNhbiBiZSBtZXJnZWQgaW50byAubWl4XG5cdENvbG9yLnByb3RvdHlwZS5ibGVuZEFscGhhID0gZnVuY3Rpb24oY29sb3IpIHtcblx0ICAgIGlmICghKGNvbG9yIGluc3RhbmNlb2YgQ29sb3IpKSB7XG5cdCAgICAgICAgY29sb3IgPSBuZXcgQ29sb3IoY29sb3IpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgQ2EgPSBjb2xvcjtcblx0ICAgIHZhciBDYiA9IHRoaXM7XG5cblx0ICAgIC8vdG9kbzogd3JpdGUgYWxwaGEgYmxlbmRpbmcgZnVuY3Rpb25cblx0ICAgIHZhciByID0gQ2EuYWxwaGEgKiBDYS5yZ2IuciArICgxIC0gQ2EuYWxwaGEpICogQ2IucmdiLnI7XG5cdCAgICB2YXIgZyA9IENhLmFscGhhICogQ2EucmdiLmcgKyAoMSAtIENhLmFscGhhKSAqIENiLnJnYi5nO1xuXHQgICAgdmFyIGIgPSBDYS5hbHBoYSAqIENhLnJnYi5iICsgKDEgLSBDYS5hbHBoYSkgKiBDYi5yZ2IuYjtcblxuXHQgICAgcmV0dXJuIG5ldyBDb2xvcihDb2xvci5yZ2IyaGV4KHIsIGcsIGIpKTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IENvbG9yO1xuXG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAndmVyc2lvbic6ICcyLjkuOScsXG5cdCAgJ3N2Z19ucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zydcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBzaGF2ZW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKS5kZWZhdWx0O1xuXG5cdHZhciBTVkcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHR2YXIgY29uc3RhbnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cdHZhciB1dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0dmFyIFNWR19OUyA9IGNvbnN0YW50cy5zdmdfbnM7XG5cblx0dmFyIHRlbXBsYXRlcyA9IHtcblx0ICAnZWxlbWVudCc6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdCAgICB2YXIgdGFnID0gb3B0aW9ucy50YWc7XG5cdCAgICB2YXIgY29udGVudCA9IG9wdGlvbnMuY29udGVudCB8fCAnJztcblx0ICAgIGRlbGV0ZSBvcHRpb25zLnRhZztcblx0ICAgIGRlbGV0ZSBvcHRpb25zLmNvbnRlbnQ7XG5cdCAgICByZXR1cm4gIFt0YWcsIGNvbnRlbnQsIG9wdGlvbnNdO1xuXHQgIH1cblx0fTtcblxuXHQvL3RvZG86IGRlcHJlY2F0ZSB0YWcgYXJnLCBpbmZlciB0YWcgZnJvbSBzaGFwZSBvYmplY3Rcblx0ZnVuY3Rpb24gY29udmVydFNoYXBlIChzaGFwZSwgdGFnKSB7XG5cdCAgcmV0dXJuIHRlbXBsYXRlcy5lbGVtZW50KHtcblx0ICAgICd0YWcnOiB0YWcsXG5cdCAgICAnd2lkdGgnOiBzaGFwZS53aWR0aCxcblx0ICAgICdoZWlnaHQnOiBzaGFwZS5oZWlnaHQsXG5cdCAgICAnZmlsbCc6IHNoYXBlLnByb3BlcnRpZXMuZmlsbFxuXHQgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGV4dENzcyAocHJvcGVydGllcykge1xuXHQgIHJldHVybiB1dGlscy5jc3NQcm9wcyh7XG5cdCAgICAnZmlsbCc6IHByb3BlcnRpZXMuZmlsbCxcblx0ICAgICdmb250LXdlaWdodCc6IHByb3BlcnRpZXMuZm9udC53ZWlnaHQsXG5cdCAgICAnZm9udC1mYW1pbHknOiBwcm9wZXJ0aWVzLmZvbnQuZmFtaWx5ICsgJywgbW9ub3NwYWNlJyxcblx0ICAgICdmb250LXNpemUnOiBwcm9wZXJ0aWVzLmZvbnQuc2l6ZSArIHByb3BlcnRpZXMuZm9udC51bml0c1xuXHQgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gb3V0bGluZVBhdGggKGJnV2lkdGgsIGJnSGVpZ2h0LCBvdXRsaW5lV2lkdGgpIHtcblx0ICB2YXIgb3V0bGluZU9mZnNldFdpZHRoID0gb3V0bGluZVdpZHRoIC8gMjtcblxuXHQgIHJldHVybiBbXG5cdCAgICAnTScsIG91dGxpbmVPZmZzZXRXaWR0aCwgb3V0bGluZU9mZnNldFdpZHRoLFxuXHQgICAgJ0gnLCBiZ1dpZHRoIC0gb3V0bGluZU9mZnNldFdpZHRoLFxuXHQgICAgJ1YnLCBiZ0hlaWdodCAtIG91dGxpbmVPZmZzZXRXaWR0aCxcblx0ICAgICdIJywgb3V0bGluZU9mZnNldFdpZHRoLFxuXHQgICAgJ1YnLCAwLFxuXHQgICAgJ00nLCAwLCBvdXRsaW5lT2Zmc2V0V2lkdGgsXG5cdCAgICAnTCcsIGJnV2lkdGgsIGJnSGVpZ2h0IC0gb3V0bGluZU9mZnNldFdpZHRoLFxuXHQgICAgJ00nLCAwLCBiZ0hlaWdodCAtIG91dGxpbmVPZmZzZXRXaWR0aCxcblx0ICAgICdMJywgYmdXaWR0aCwgb3V0bGluZU9mZnNldFdpZHRoXG5cdCAgXS5qb2luKCcgJyk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzY2VuZUdyYXBoLCByZW5kZXJTZXR0aW5ncykge1xuXHQgIHZhciBlbmdpbmVTZXR0aW5ncyA9IHJlbmRlclNldHRpbmdzLmVuZ2luZVNldHRpbmdzO1xuXHQgIHZhciBzdHlsZXNoZWV0cyA9IGVuZ2luZVNldHRpbmdzLnN0eWxlc2hlZXRzO1xuXHQgIHZhciBzdHlsZXNoZWV0WG1sID0gc3R5bGVzaGVldHMubWFwKGZ1bmN0aW9uIChzdHlsZXNoZWV0KSB7XG5cdCAgICByZXR1cm4gJzw/eG1sLXN0eWxlc2hlZXQgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCInICsgc3R5bGVzaGVldCArICdcIj8+Jztcblx0ICB9KS5qb2luKCdcXG4nKTtcblxuXHQgIHZhciBob2xkZXJJZCA9ICdob2xkZXJfJyArIE51bWJlcihuZXcgRGF0ZSgpKS50b1N0cmluZygxNik7XG5cblx0ICB2YXIgcm9vdCA9IHNjZW5lR3JhcGgucm9vdDtcblx0ICB2YXIgdGV4dEdyb3VwID0gcm9vdC5jaGlsZHJlbi5ob2xkZXJUZXh0R3JvdXA7XG5cblx0ICB2YXIgY3NzID0gJyMnICsgaG9sZGVySWQgKyAnIHRleHQgeyAnICsgdGV4dENzcyh0ZXh0R3JvdXAucHJvcGVydGllcykgKyAnIH0gJztcblxuXHQgIC8vIHB1c2ggdGV4dCBkb3duIHRvIGJlIGVxdWFsbHkgdmVydGljYWxseSBhbGlnbmVkIHdpdGggY2FudmFzIHJlbmRlcmVyXG5cdCAgdGV4dEdyb3VwLnkgKz0gdGV4dEdyb3VwLnRleHRQb3NpdGlvbkRhdGEuYm91bmRpbmdCb3guaGVpZ2h0ICogMC44O1xuXG5cdCAgdmFyIHdvcmRUYWdzID0gW107XG5cblx0ICBPYmplY3Qua2V5cyh0ZXh0R3JvdXAuY2hpbGRyZW4pLmZvckVhY2goZnVuY3Rpb24gKGxpbmVLZXkpIHtcblx0ICAgIHZhciBsaW5lID0gdGV4dEdyb3VwLmNoaWxkcmVuW2xpbmVLZXldO1xuXG5cdCAgICBPYmplY3Qua2V5cyhsaW5lLmNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uICh3b3JkS2V5KSB7XG5cdCAgICAgIHZhciB3b3JkID0gbGluZS5jaGlsZHJlblt3b3JkS2V5XTtcblx0ICAgICAgdmFyIHggPSB0ZXh0R3JvdXAueCArIGxpbmUueCArIHdvcmQueDtcblx0ICAgICAgdmFyIHkgPSB0ZXh0R3JvdXAueSArIGxpbmUueSArIHdvcmQueTtcblx0ICAgICAgdmFyIHdvcmRUYWcgPSB0ZW1wbGF0ZXMuZWxlbWVudCh7XG5cdCAgICAgICAgJ3RhZyc6ICd0ZXh0Jyxcblx0ICAgICAgICAnY29udGVudCc6IHdvcmQucHJvcGVydGllcy50ZXh0LFxuXHQgICAgICAgICd4JzogeCxcblx0ICAgICAgICAneSc6IHlcblx0ICAgICAgfSk7XG5cblx0ICAgICAgd29yZFRhZ3MucHVzaCh3b3JkVGFnKTtcblx0ICAgIH0pO1xuXHQgIH0pO1xuXG5cdCAgdmFyIHRleHQgPSB0ZW1wbGF0ZXMuZWxlbWVudCh7XG5cdCAgICAndGFnJzogJ2cnLFxuXHQgICAgJ2NvbnRlbnQnOiB3b3JkVGFnc1xuXHQgIH0pO1xuXG5cdCAgdmFyIG91dGxpbmUgPSBudWxsO1xuXG5cdCAgaWYgKHJvb3QuY2hpbGRyZW4uaG9sZGVyQmcucHJvcGVydGllcy5vdXRsaW5lKSB7XG5cdCAgICB2YXIgb3V0bGluZVByb3BlcnRpZXMgPSByb290LmNoaWxkcmVuLmhvbGRlckJnLnByb3BlcnRpZXMub3V0bGluZTtcblx0ICAgIG91dGxpbmUgPSB0ZW1wbGF0ZXMuZWxlbWVudCh7XG5cdCAgICAgICd0YWcnOiAncGF0aCcsXG5cdCAgICAgICdkJzogb3V0bGluZVBhdGgocm9vdC5jaGlsZHJlbi5ob2xkZXJCZy53aWR0aCwgcm9vdC5jaGlsZHJlbi5ob2xkZXJCZy5oZWlnaHQsIG91dGxpbmVQcm9wZXJ0aWVzLndpZHRoKSxcblx0ICAgICAgJ3N0cm9rZS13aWR0aCc6IG91dGxpbmVQcm9wZXJ0aWVzLndpZHRoLFxuXHQgICAgICAnc3Ryb2tlJzogb3V0bGluZVByb3BlcnRpZXMuZmlsbCxcblx0ICAgICAgJ2ZpbGwnOiAnbm9uZSdcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIHZhciBiZyA9IGNvbnZlcnRTaGFwZShyb290LmNoaWxkcmVuLmhvbGRlckJnLCAncmVjdCcpO1xuXG5cdCAgdmFyIHNjZW5lQ29udGVudCA9IFtdO1xuXG5cdCAgc2NlbmVDb250ZW50LnB1c2goYmcpO1xuXHQgIGlmIChvdXRsaW5lUHJvcGVydGllcykge1xuXHQgICAgc2NlbmVDb250ZW50LnB1c2gob3V0bGluZSk7XG5cdCAgfVxuXHQgIHNjZW5lQ29udGVudC5wdXNoKHRleHQpO1xuXG5cdCAgdmFyIHNjZW5lID0gdGVtcGxhdGVzLmVsZW1lbnQoe1xuXHQgICAgJ3RhZyc6ICdnJyxcblx0ICAgICdpZCc6IGhvbGRlcklkLFxuXHQgICAgJ2NvbnRlbnQnOiBzY2VuZUNvbnRlbnRcblx0ICB9KTtcblxuXHQgIHZhciBzdHlsZSA9IHRlbXBsYXRlcy5lbGVtZW50KHtcblx0ICAgICd0YWcnOiAnc3R5bGUnLFxuXHQgICAgLy90b2RvOiBmaWd1cmUgb3V0IGhvdyB0byBhZGQgQ0RBVEEgZGlyZWN0aXZlXG5cdCAgICAnY29udGVudCc6IGNzcyxcblx0ICAgICd0eXBlJzogJ3RleHQvY3NzJ1xuXHQgIH0pO1xuXG5cdCAgdmFyIGRlZnMgPSB0ZW1wbGF0ZXMuZWxlbWVudCh7XG5cdCAgICAndGFnJzogJ2RlZnMnLFxuXHQgICAgJ2NvbnRlbnQnOiBzdHlsZVxuXHQgIH0pO1xuXG5cdCAgdmFyIHN2ZyA9IHRlbXBsYXRlcy5lbGVtZW50KHtcblx0ICAgICd0YWcnOiAnc3ZnJyxcblx0ICAgICdjb250ZW50JzogW2RlZnMsIHNjZW5lXSxcblx0ICAgICd3aWR0aCc6IHJvb3QucHJvcGVydGllcy53aWR0aCxcblx0ICAgICdoZWlnaHQnOiByb290LnByb3BlcnRpZXMuaGVpZ2h0LFxuXHQgICAgJ3htbG5zJzogU1ZHX05TLFxuXHQgICAgJ3ZpZXdCb3gnOiBbMCwgMCwgcm9vdC5wcm9wZXJ0aWVzLndpZHRoLCByb290LnByb3BlcnRpZXMuaGVpZ2h0XS5qb2luKCcgJyksXG5cdCAgICAncHJlc2VydmVBc3BlY3RSYXRpbyc6ICdub25lJ1xuXHQgIH0pO1xuXG5cdCAgdmFyIG91dHB1dCA9IFN0cmluZyhzaGF2ZW4oc3ZnKSk7XG5cblx0ICBpZiAoLyZhbXA7KHgpPyNbMC05QS1GYS1mXS8udGVzdChvdXRwdXRbMF0pKSB7XG5cdCAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvJmFtcDsjL2dtLCAnJiMnKTtcblx0ICB9XG5cblx0ICBvdXRwdXQgPSBzdHlsZXNoZWV0WG1sICsgb3V0cHV0O1xuXG5cdCAgdmFyIHN2Z1N0cmluZyA9IFNWRy5zdmdTdHJpbmdUb0RhdGFVUkkob3V0cHV0LCByZW5kZXJTZXR0aW5ncy5tb2RlID09PSAnYmFja2dyb3VuZCcpO1xuXG5cdCAgcmV0dXJuIHN2Z1N0cmluZztcblx0fTtcblxuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8gdmVuZG9yZWQgc2hhdmVuIDEuMy4wIGR1ZSB0byBwdWJsaXNoZWQgcGFja2FnZS5qc29uIGluY2x1ZGluZyBhbiBvdXRkYXRlZCBub2RlIGVuZ2luZVxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xuXG5cbi8qKiovIH0pLFxuLyogMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IHNoYXZlbjtcblxuXHR2YXIgX3BhcnNlU3VnYXJTdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxuXHR2YXIgX3BhcnNlU3VnYXJTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VTdWdhclN0cmluZyk7XG5cblx0dmFyIF9lc2NhcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcblxuXHR2YXIgZXNjYXBlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2VzY2FwZSk7XG5cblx0dmFyIF9kZWZhdWx0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG5cdHZhciBfZGVmYXVsdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdHMpO1xuXG5cdHZhciBfbWFwQXR0cmlidXRlVmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuXHR2YXIgX21hcEF0dHJpYnV0ZVZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hcEF0dHJpYnV0ZVZhbHVlKTtcblxuXHR2YXIgX2Fzc2VydCA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5cdHZhciBfYXNzZXJ0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2VydCk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5cdGZ1bmN0aW9uIHNoYXZlbihhcnJheU9yT2JqZWN0KSB7XG5cdCAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGFycmF5T3JPYmplY3QpO1xuXHQgIHZhciBvYmpUeXBlID0gdHlwZW9mIGFycmF5T3JPYmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFycmF5T3JPYmplY3QpO1xuXG5cdCAgaWYgKCFpc0FycmF5ICYmIG9ialR5cGUgIT09ICdvYmplY3QnKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgZWl0aGVyIGFuIGFycmF5IG9yIGFuIG9iamVjdCAnICsgJ2FuZCBub3QgJyArIEpTT04uc3RyaW5naWZ5KGFycmF5T3JPYmplY3QpKTtcblx0ICB9XG5cblx0ICBpZiAoaXNBcnJheSAmJiBhcnJheU9yT2JqZWN0Lmxlbmd0aCA9PT0gMCkge1xuXHQgICAgLy8gSWdub3JlIGVtcHR5IGFycmF5c1xuXHQgICAgcmV0dXJuIHt9O1xuXHQgIH1cblxuXHQgIHZhciBjb25maWcgPSB7fTtcblx0ICB2YXIgZWxlbWVudEFycmF5ID0gW107XG5cblx0ICBpZiAoQXJyYXkuaXNBcnJheShhcnJheU9yT2JqZWN0KSkge1xuXHQgICAgZWxlbWVudEFycmF5ID0gYXJyYXlPck9iamVjdC5zbGljZSgwKTtcblx0ICB9IGVsc2Uge1xuXHQgICAgZWxlbWVudEFycmF5ID0gYXJyYXlPck9iamVjdC5lbGVtZW50QXJyYXkuc2xpY2UoMCk7XG5cdCAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGNvbmZpZywgYXJyYXlPck9iamVjdCk7XG5cdCAgICBkZWxldGUgY29uZmlnLmVsZW1lbnRBcnJheTtcblx0ICB9XG5cblx0ICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdHMyLmRlZmF1bHQsIGNvbmZpZywge1xuXHQgICAgcmV0dXJuT2JqZWN0OiB7IC8vIFNoYXZlbiBvYmplY3QgdG8gcmV0dXJuIGF0IGxhc3Rcblx0ICAgICAgaWRzOiB7fSxcblx0ICAgICAgcmVmZXJlbmNlczoge31cblx0ICAgIH1cblx0ICB9KTtcblxuXHQgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoc3VnYXJTdHJpbmcpIHtcblx0ICAgIHZhciBwcm9wZXJ0aWVzID0gKDAsIF9wYXJzZVN1Z2FyU3RyaW5nMi5kZWZhdWx0KShzdWdhclN0cmluZyk7XG5cdCAgICB2YXIgZWxlbWVudCA9IHtcblx0ICAgICAgdGFnOiBwcm9wZXJ0aWVzLnRhZyxcblx0ICAgICAgYXR0cjoge30sXG5cdCAgICAgIGNoaWxkcmVuOiBbXVxuXHQgICAgfTtcblxuXHQgICAgaWYgKHByb3BlcnRpZXMuaWQpIHtcblx0ICAgICAgZWxlbWVudC5hdHRyLmlkID0gcHJvcGVydGllcy5pZDtcblx0ICAgICAgKDAsIF9hc3NlcnQyLmRlZmF1bHQpKCFjb25maWcucmV0dXJuT2JqZWN0Lmlkcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzLmlkKSwgJ0lkcyBtdXN0IGJlIHVuaXF1ZSBhbmQgXCInICsgcHJvcGVydGllcy5pZCArICdcIiBpcyBhbHJlYWR5IGFzc2lnbmVkJyk7XG5cdCAgICAgIGNvbmZpZy5yZXR1cm5PYmplY3QuaWRzW3Byb3BlcnRpZXMuaWRdID0gZWxlbWVudDtcblx0ICAgIH1cblx0ICAgIGlmIChwcm9wZXJ0aWVzLmNsYXNzKSB7XG5cdCAgICAgIGVsZW1lbnQuYXR0ci5jbGFzcyA9IHByb3BlcnRpZXMuY2xhc3M7XG5cdCAgICB9XG5cdCAgICBpZiAocHJvcGVydGllcy5yZWZlcmVuY2UpIHtcblx0ICAgICAgKDAsIF9hc3NlcnQyLmRlZmF1bHQpKCFjb25maWcucmV0dXJuT2JqZWN0Lmlkcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzLnJlZmVyZW5jZSksICdSZWZlcmVuY2VzIG11c3QgYmUgdW5pcXVlIGFuZCBcIicgKyBwcm9wZXJ0aWVzLmlkICsgJ1wiIGlzIGFscmVhZHkgYXNzaWduZWQnKTtcblx0ICAgICAgY29uZmlnLnJldHVybk9iamVjdC5yZWZlcmVuY2VzW3Byb3BlcnRpZXMucmVmZXJlbmNlXSA9IGVsZW1lbnQ7XG5cdCAgICB9XG5cblx0ICAgIGNvbmZpZy5lc2NhcGVIVE1MID0gcHJvcGVydGllcy5lc2NhcGVIVE1MICE9IG51bGwgPyBwcm9wZXJ0aWVzLmVzY2FwZUhUTUwgOiBjb25maWcuZXNjYXBlSFRNTDtcblxuXHQgICAgcmV0dXJuIGVsZW1lbnQ7XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gYnVpbGREb20oZWxlbUFycmF5KSB7XG5cdCAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtQXJyYXkpICYmIGVsZW1BcnJheS5sZW5ndGggPT09IDApIHtcblx0ICAgICAgLy8gSWdub3JlIGVtcHR5IGFycmF5c1xuXHQgICAgICByZXR1cm4ge307XG5cdCAgICB9XG5cblx0ICAgIHZhciBpbmRleCA9IDE7XG5cdCAgICB2YXIgY3JlYXRlZENhbGxiYWNrID0gdm9pZCAwO1xuXHQgICAgdmFyIHNlbGZDbG9zaW5nSFRNTFRhZ3MgPSBbJ2FyZWEnLCAnYmFzZScsICdicicsICdjb2wnLCAnY29tbWFuZCcsICdlbWJlZCcsICdocicsICdpbWcnLCAnaW5wdXQnLCAna2V5Z2VuJywgJ2xpbmsnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdwYXJhbScsICdzb3VyY2UnLCAndHJhY2snLCAnd2JyJ107XG5cdCAgICAvLyBDbG9uZSB0byBhdm9pZCBtdXRhdGlvbiBwcm9ibGVtc1xuXHQgICAgdmFyIGFycmF5ID0gZWxlbUFycmF5LnNsaWNlKDApO1xuXG5cdCAgICBpZiAodHlwZW9mIGFycmF5WzBdID09PSAnc3RyaW5nJykge1xuXHQgICAgICBhcnJheVswXSA9IGNyZWF0ZUVsZW1lbnQoYXJyYXlbMF0pO1xuXHQgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFycmF5WzBdKSkge1xuXHQgICAgICBpbmRleCA9IDA7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGVsZW1lbnQgb2YgYXJyYXkgbXVzdCBiZSBhIHN0cmluZywgJyArICdvciBhbiBhcnJheSBhbmQgbm90ICcgKyBKU09OLnN0cmluZ2lmeShhcnJheVswXSkpO1xuXHQgICAgfVxuXG5cdCAgICBmb3IgKDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcblxuXHQgICAgICAvLyBEb24ndCByZW5kZXIgZWxlbWVudCBpZiB2YWx1ZSBpcyBmYWxzZSBvciBudWxsXG5cdCAgICAgIGlmIChhcnJheVtpbmRleF0gPT09IGZhbHNlIHx8IGFycmF5W2luZGV4XSA9PT0gbnVsbCkge1xuXHQgICAgICAgIGFycmF5WzBdID0gZmFsc2U7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIH1cblxuXHQgICAgICAvLyBDb250aW51ZSB3aXRoIG5leHQgYXJyYXkgdmFsdWUgaWYgY3VycmVudCB2YWx1ZSBpcyB1bmRlZmluZWQgb3IgdHJ1ZVxuXHQgICAgICBlbHNlIGlmIChhcnJheVtpbmRleF0gPT09IHVuZGVmaW5lZCB8fCBhcnJheVtpbmRleF0gPT09IHRydWUpIHtcblx0ICAgICAgICAgIGNvbnRpbnVlO1xuXHQgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFycmF5W2luZGV4XSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgIGlmIChjb25maWcuZXNjYXBlSFRNTCkge1xuXHQgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxuXHQgICAgICAgICAgICBhcnJheVtpbmRleF0gPSBlc2NhcGUuSFRNTChhcnJheVtpbmRleF0pO1xuXHQgICAgICAgICAgfVxuXG5cdCAgICAgICAgICBhcnJheVswXS5jaGlsZHJlbi5wdXNoKGFycmF5W2luZGV4XSk7XG5cdCAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJyYXlbaW5kZXhdID09PSAnbnVtYmVyJykge1xuXG5cdCAgICAgICAgICBhcnJheVswXS5jaGlsZHJlbi5wdXNoKGFycmF5W2luZGV4XSk7XG5cdCAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFycmF5W2luZGV4XSkpIHtcblxuXHQgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXlbaW5kZXhdWzBdKSkge1xuXHQgICAgICAgICAgICBhcnJheVtpbmRleF0ucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKHN1YkFycmF5KSB7XG5cdCAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb29wLWZ1bmNcblx0ICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXggKyAxLCAwLCBzdWJBcnJheSk7XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGlmIChpbmRleCAhPT0gMCkgY29udGludWU7XG5cdCAgICAgICAgICAgIGluZGV4Kys7XG5cdCAgICAgICAgICB9XG5cblx0ICAgICAgICAgIGFycmF5W2luZGV4XSA9IGJ1aWxkRG9tKGFycmF5W2luZGV4XSk7XG5cblx0ICAgICAgICAgIGlmIChhcnJheVtpbmRleF1bMF0pIHtcblx0ICAgICAgICAgICAgYXJyYXlbMF0uY2hpbGRyZW4ucHVzaChhcnJheVtpbmRleF1bMF0pO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFycmF5W2luZGV4XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgY3JlYXRlZENhbGxiYWNrID0gYXJyYXlbaW5kZXhdO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoX3R5cGVvZihhcnJheVtpbmRleF0pID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlS2V5IGluIGFycmF5W2luZGV4XSkge1xuXHQgICAgICAgICAgICBpZiAoIWFycmF5W2luZGV4XS5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGVLZXkpKSBjb250aW51ZTtcblxuXHQgICAgICAgICAgICB2YXIgYXR0cmlidXRlVmFsdWUgPSBhcnJheVtpbmRleF1bYXR0cmlidXRlS2V5XTtcblxuXHQgICAgICAgICAgICBpZiAoYXJyYXlbaW5kZXhdLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZUtleSkgJiYgYXR0cmlidXRlVmFsdWUgIT09IG51bGwgJiYgYXR0cmlidXRlVmFsdWUgIT09IGZhbHNlKSB7XG5cdCAgICAgICAgICAgICAgYXJyYXlbMF0uYXR0clthdHRyaWJ1dGVLZXldID0gKDAsIF9tYXBBdHRyaWJ1dGVWYWx1ZTIuZGVmYXVsdCkoYXR0cmlidXRlS2V5LCBhdHRyaWJ1dGVWYWx1ZSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCInICsgYXJyYXlbaW5kZXhdICsgJ1wiIGlzIG5vdCBhbGxvd2VkIGFzIGEgdmFsdWUnKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmIChhcnJheVswXSAhPT0gZmFsc2UpIHtcblx0ICAgICAgdmFyIEhUTUxTdHJpbmcgPSAnPCcgKyBhcnJheVswXS50YWc7XG5cblx0ICAgICAgZm9yICh2YXIga2V5IGluIGFycmF5WzBdLmF0dHIpIHtcblx0ICAgICAgICBpZiAoYXJyYXlbMF0uYXR0ci5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdCAgICAgICAgICB2YXIgX2F0dHJpYnV0ZVZhbHVlID0gZXNjYXBlLmF0dHJpYnV0ZShhcnJheVswXS5hdHRyW2tleV0pO1xuXHQgICAgICAgICAgdmFyIHZhbHVlID0gX2F0dHJpYnV0ZVZhbHVlO1xuXG5cdCAgICAgICAgICBpZiAoY29uZmlnLnF1b3RlQXR0cmlidXRlcyB8fCAvWyBcIic9PD5dLy50ZXN0KF9hdHRyaWJ1dGVWYWx1ZSkpIHtcblx0ICAgICAgICAgICAgdmFsdWUgPSBjb25maWcucXVvdGF0aW9uTWFyayArIF9hdHRyaWJ1dGVWYWx1ZSArIGNvbmZpZy5xdW90YXRpb25NYXJrO1xuXHQgICAgICAgICAgfVxuXG5cdCAgICAgICAgICBIVE1MU3RyaW5nICs9ICcgJyArIGtleSArICc9JyArIHZhbHVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXG5cdCAgICAgIEhUTUxTdHJpbmcgKz0gJz4nO1xuXG5cdCAgICAgIGlmICghKHNlbGZDbG9zaW5nSFRNTFRhZ3MuaW5kZXhPZihhcnJheVswXS50YWcpICE9PSAtMSkpIHtcblx0ICAgICAgICBhcnJheVswXS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuXHQgICAgICAgICAgcmV0dXJuIEhUTUxTdHJpbmcgKz0gY2hpbGQ7XG5cdCAgICAgICAgfSk7XG5cblx0ICAgICAgICBIVE1MU3RyaW5nICs9ICc8LycgKyBhcnJheVswXS50YWcgKyAnPic7XG5cdCAgICAgIH1cblxuXHQgICAgICBhcnJheVswXSA9IEhUTUxTdHJpbmc7XG5cdCAgICB9XG5cblx0ICAgIC8vIFJldHVybiByb290IGVsZW1lbnQgb24gaW5kZXggMFxuXHQgICAgY29uZmlnLnJldHVybk9iamVjdFswXSA9IGFycmF5WzBdO1xuXHQgICAgY29uZmlnLnJldHVybk9iamVjdC5yb290RWxlbWVudCA9IGFycmF5WzBdO1xuXG5cdCAgICBjb25maWcucmV0dXJuT2JqZWN0LnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gYXJyYXlbMF07XG5cdCAgICB9O1xuXG5cdCAgICBpZiAoY3JlYXRlZENhbGxiYWNrKSBjcmVhdGVkQ2FsbGJhY2soYXJyYXlbMF0pO1xuXG5cdCAgICByZXR1cm4gY29uZmlnLnJldHVybk9iamVjdDtcblx0ICB9XG5cblx0ICByZXR1cm4gYnVpbGREb20oZWxlbWVudEFycmF5KTtcblx0fVxuXG5cdHNoYXZlbi5zZXREZWZhdWx0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0ICBPYmplY3QuYXNzaWduKF9kZWZhdWx0czIuZGVmYXVsdCwgb2JqZWN0KTtcblx0ICByZXR1cm4gc2hhdmVuO1xuXHR9O1xuXG5cbi8qKiovIH0pLFxuLyogMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1Z2FyU3RyaW5nKSB7XG5cdCAgdmFyIHRhZ3MgPSBzdWdhclN0cmluZy5tYXRjaCgvXltcXHctXSsvKTtcblx0ICB2YXIgcHJvcGVydGllcyA9IHtcblx0ICAgIHRhZzogdGFncyA/IHRhZ3NbMF0gOiAnZGl2J1xuXHQgIH07XG5cdCAgdmFyIGlkcyA9IHN1Z2FyU3RyaW5nLm1hdGNoKC8jKFtcXHctXSspLyk7XG5cdCAgdmFyIGNsYXNzZXMgPSBzdWdhclN0cmluZy5tYXRjaCgvXFwuW1xcdy1dKy9nKTtcblx0ICB2YXIgcmVmZXJlbmNlcyA9IHN1Z2FyU3RyaW5nLm1hdGNoKC9cXCQoW1xcdy1dKykvKTtcblxuXHQgIGlmIChpZHMpIHByb3BlcnRpZXMuaWQgPSBpZHNbMV07XG5cblx0ICBpZiAoY2xhc3Nlcykge1xuXHQgICAgcHJvcGVydGllcy5jbGFzcyA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL1xcLi9nLCAnJyk7XG5cdCAgfVxuXG5cdCAgaWYgKHJlZmVyZW5jZXMpIHByb3BlcnRpZXMucmVmZXJlbmNlID0gcmVmZXJlbmNlc1sxXTtcblxuXHQgIGlmIChzdWdhclN0cmluZy5lbmRzV2l0aCgnJicpIHx8IHN1Z2FyU3RyaW5nLmVuZHNXaXRoKCchJykpIHtcblx0ICAgIHByb3BlcnRpZXMuZXNjYXBlSFRNTCA9IGZhbHNlO1xuXHQgIH1cblxuXHQgIHJldHVybiBwcm9wZXJ0aWVzO1xuXHR9O1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHQgIHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZTtcblx0ZXhwb3J0cy5IVE1MID0gSFRNTDtcblx0ZnVuY3Rpb24gYXR0cmlidXRlKHN0cmluZykge1xuXHQgIHJldHVybiBzdHJpbmcgfHwgc3RyaW5nID09PSAwID8gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgOiAnJztcblx0fVxuXG5cdGZ1bmN0aW9uIEhUTUwoc3RyaW5nKSB7XG5cdCAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG5cdH1cblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0ZXhwb3J0cy5kZWZhdWx0ID0ge1xuXHQgIG5hbWVzcGFjZTogJ3hodG1sJyxcblx0ICBhdXRvTmFtZXNwYWNpbmc6IHRydWUsXG5cdCAgZXNjYXBlSFRNTDogdHJ1ZSxcblx0ICBxdW90YXRpb25NYXJrOiAnXCInLFxuXHQgIHF1b3RlQXR0cmlidXRlczogdHJ1ZSxcblx0ICBjb252ZXJ0VHJhbnNmb3JtQXJyYXk6IHRydWVcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cblx0dmFyIF9idWlsZFRyYW5zZm9ybVN0cmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG5cdHZhciBfYnVpbGRUcmFuc2Zvcm1TdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYnVpbGRUcmFuc2Zvcm1TdHJpbmcpO1xuXG5cdHZhciBfc3RyaW5naWZ5U3R5bGVPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxuXHR2YXIgX3N0cmluZ2lmeVN0eWxlT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0cmluZ2lmeVN0eWxlT2JqZWN0KTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0ICAgIHJldHVybiAnJztcblx0ICB9XG5cblx0ICBpZiAoa2V5ID09PSAnc3R5bGUnICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG5cdCAgICByZXR1cm4gKDAsIF9zdHJpbmdpZnlTdHlsZU9iamVjdDIuZGVmYXVsdCkodmFsdWUpO1xuXHQgIH1cblxuXHQgIGlmIChrZXkgPT09ICd0cmFuc2Zvcm0nICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICByZXR1cm4gKDAsIF9idWlsZFRyYW5zZm9ybVN0cmluZzIuZGVmYXVsdCkodmFsdWUpO1xuXHQgIH1cblxuXHQgIHJldHVybiB2YWx1ZTtcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHQvLyBDcmVhdGUgdHJhbnNmb3JtIHN0cmluZyBmcm9tIGxpc3QgdHJhbnNmb3JtIG9iamVjdHNcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAodHJhbnNmb3JtT2JqZWN0cykge1xuXG5cdCAgcmV0dXJuIHRyYW5zZm9ybU9iamVjdHMubWFwKGZ1bmN0aW9uICh0cmFuc2Zvcm1hdGlvbikge1xuXHQgICAgdmFyIHZhbHVlcyA9IFtdO1xuXG5cdCAgICBpZiAodHJhbnNmb3JtYXRpb24udHlwZSA9PT0gJ3JvdGF0ZScgJiYgdHJhbnNmb3JtYXRpb24uZGVncmVlcykge1xuXHQgICAgICB2YWx1ZXMucHVzaCh0cmFuc2Zvcm1hdGlvbi5kZWdyZWVzKTtcblx0ICAgIH1cblx0ICAgIGlmICh0cmFuc2Zvcm1hdGlvbi54KSB2YWx1ZXMucHVzaCh0cmFuc2Zvcm1hdGlvbi54KTtcblx0ICAgIGlmICh0cmFuc2Zvcm1hdGlvbi55KSB2YWx1ZXMucHVzaCh0cmFuc2Zvcm1hdGlvbi55KTtcblxuXHQgICAgcmV0dXJuIHRyYW5zZm9ybWF0aW9uLnR5cGUgKyAnKCcgKyB2YWx1ZXMgKyAnKSc7XG5cdCAgfSkuam9pbignICcpO1xuXHR9O1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHQgIHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuXHRmdW5jdGlvbiBzYW5pdGl6ZVByb3BlcnRpZXMoa2V5LCB2YWx1ZSkge1xuXHQgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXHQgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8ICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnKSByZXR1cm4gdmFsdWU7XG5cblx0ICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0fVxuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdHlsZU9iamVjdCkge1xuXHQgIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHlsZU9iamVjdCwgc2FuaXRpemVQcm9wZXJ0aWVzKS5zbGljZSgyLCAtMikucmVwbGFjZSgvXCIsXCIvZywgJzsnKS5yZXBsYWNlKC9cIjpcIi9nLCAnOicpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXFwnJyk7XG5cdH07XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBvYmplY3RBc3NpZ24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcblxuXHQvLyBjb21wYXJlIGFuZCBpc0J1ZmZlciB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuXHQvLyBvcmlnaW5hbCBub3RpY2U6XG5cblx0LyohXG5cdCAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuXHQgKlxuXHQgKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cblx0ICogQGxpY2Vuc2UgIE1JVFxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG5cdCAgaWYgKGEgPT09IGIpIHtcblx0ICAgIHJldHVybiAwO1xuXHQgIH1cblxuXHQgIHZhciB4ID0gYS5sZW5ndGg7XG5cdCAgdmFyIHkgPSBiLmxlbmd0aDtcblxuXHQgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG5cdCAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuXHQgICAgICB4ID0gYVtpXTtcblx0ICAgICAgeSA9IGJbaV07XG5cdCAgICAgIGJyZWFrO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIGlmICh4IDwgeSkge1xuXHQgICAgcmV0dXJuIC0xO1xuXHQgIH1cblx0ICBpZiAoeSA8IHgpIHtcblx0ICAgIHJldHVybiAxO1xuXHQgIH1cblx0ICByZXR1cm4gMDtcblx0fVxuXHRmdW5jdGlvbiBpc0J1ZmZlcihiKSB7XG5cdCAgaWYgKGdsb2JhbC5CdWZmZXIgJiYgdHlwZW9mIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHJldHVybiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKGIpO1xuXHQgIH1cblx0ICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKTtcblx0fVxuXG5cdC8vIGJhc2VkIG9uIG5vZGUgYXNzZXJ0LCBvcmlnaW5hbCBub3RpY2U6XG5cdC8vIE5COiBUaGUgVVJMIHRvIHRoZSBDb21tb25KUyBzcGVjIGlzIGtlcHQganVzdCBmb3IgdHJhZGl0aW9uLlxuXHQvLyAgICAgbm9kZS1hc3NlcnQgaGFzIGV2b2x2ZWQgYSBsb3Qgc2luY2UgdGhlbiwgYm90aCBpbiBBUEkgYW5kIGJlaGF2aW9yLlxuXG5cdC8vIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1VuaXRfVGVzdGluZy8xLjBcblx0Ly9cblx0Ly8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuXHQvL1xuXHQvLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG5cdC8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cblx0Ly9cblx0Ly8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHQvLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cblx0Ly8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcblx0Ly8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG5cdC8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdC8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cdC8vXG5cdC8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5cdC8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXHQvL1xuXHQvLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHQvLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0Ly8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdC8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG5cdC8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cblx0Ly8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblx0dmFyIHV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblx0dmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cdHZhciBmdW5jdGlvbnNIYXZlTmFtZXMgPSAoZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBmdW5jdGlvbiBmb28oKSB7fS5uYW1lID09PSAnZm9vJztcblx0fSgpKTtcblx0ZnVuY3Rpb24gcFRvU3RyaW5nIChvYmopIHtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG5cdH1cblx0ZnVuY3Rpb24gaXNWaWV3KGFycmJ1Zikge1xuXHQgIGlmIChpc0J1ZmZlcihhcnJidWYpKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIGlmICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KGFycmJ1Zik7XG5cdCAgfVxuXHQgIGlmICghYXJyYnVmKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIGlmIChhcnJidWYgaW5zdGFuY2VvZiBEYXRhVmlldykge1xuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfVxuXHQgIGlmIChhcnJidWYuYnVmZmVyICYmIGFycmJ1Zi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfVxuXHQgIHJldHVybiBmYWxzZTtcblx0fVxuXHQvLyAxLiBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuXHQvLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcblx0Ly8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cblx0dmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG5cblx0Ly8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuXHQvLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cblx0dmFyIHJlZ2V4ID0gL1xccypmdW5jdGlvblxccysoW15cXChcXHNdKilcXHMqLztcblx0Ly8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9mdW5jdGlvbi5wcm90b3R5cGUubmFtZS9ibG9iL2FkZWVlZWM4YmZjYzYwNjhiMTg3ZDdkOWZiM2Q1YmIxZDNhMzA4OTkvaW1wbGVtZW50YXRpb24uanNcblx0ZnVuY3Rpb24gZ2V0TmFtZShmdW5jKSB7XG5cdCAgaWYgKCF1dGlsLmlzRnVuY3Rpb24oZnVuYykpIHtcblx0ICAgIHJldHVybjtcblx0ICB9XG5cdCAgaWYgKGZ1bmN0aW9uc0hhdmVOYW1lcykge1xuXHQgICAgcmV0dXJuIGZ1bmMubmFtZTtcblx0ICB9XG5cdCAgdmFyIHN0ciA9IGZ1bmMudG9TdHJpbmcoKTtcblx0ICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocmVnZXgpO1xuXHQgIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXTtcblx0fVxuXHRhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG5cdCAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcblx0ICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuXHQgIHRoaXMuZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuXHQgIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuXHQgIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcblx0ICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcblx0ICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNZXNzYWdlKHRoaXMpO1xuXHQgICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcblx0ICB9XG5cdCAgdmFyIHN0YWNrU3RhcnRGdW5jdGlvbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZ1bmN0aW9uIHx8IGZhaWw7XG5cdCAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG5cdCAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzdGFja1N0YXJ0RnVuY3Rpb24pO1xuXHQgIH0gZWxzZSB7XG5cdCAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG5cdCAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG5cdCAgICBpZiAoZXJyLnN0YWNrKSB7XG5cdCAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cblx0ICAgICAgLy8gdHJ5IHRvIHN0cmlwIHVzZWxlc3MgZnJhbWVzXG5cdCAgICAgIHZhciBmbl9uYW1lID0gZ2V0TmFtZShzdGFja1N0YXJ0RnVuY3Rpb24pO1xuXHQgICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcblx0ICAgICAgaWYgKGlkeCA+PSAwKSB7XG5cdCAgICAgICAgLy8gb25jZSB3ZSBoYXZlIGxvY2F0ZWQgdGhlIGZ1bmN0aW9uIGZyYW1lXG5cdCAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcblx0ICAgICAgICB2YXIgbmV4dF9saW5lID0gb3V0LmluZGV4T2YoJ1xcbicsIGlkeCArIDEpO1xuXHQgICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcobmV4dF9saW5lICsgMSk7XG5cdCAgICAgIH1cblxuXHQgICAgICB0aGlzLnN0YWNrID0gb3V0O1xuXHQgICAgfVxuXHQgIH1cblx0fTtcblxuXHQvLyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgaW5zdGFuY2VvZiBFcnJvclxuXHR1dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5cdGZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcblx0ICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnKSB7XG5cdCAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiBzO1xuXHQgIH1cblx0fVxuXHRmdW5jdGlvbiBpbnNwZWN0KHNvbWV0aGluZykge1xuXHQgIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMgfHwgIXV0aWwuaXNGdW5jdGlvbihzb21ldGhpbmcpKSB7XG5cdCAgICByZXR1cm4gdXRpbC5pbnNwZWN0KHNvbWV0aGluZyk7XG5cdCAgfVxuXHQgIHZhciByYXduYW1lID0gZ2V0TmFtZShzb21ldGhpbmcpO1xuXHQgIHZhciBuYW1lID0gcmF3bmFtZSA/ICc6ICcgKyByYXduYW1lIDogJyc7XG5cdCAgcmV0dXJuICdbRnVuY3Rpb24nICsgIG5hbWUgKyAnXSc7XG5cdH1cblx0ZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG5cdCAgcmV0dXJuIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5hY3R1YWwpLCAxMjgpICsgJyAnICtcblx0ICAgICAgICAgc2VsZi5vcGVyYXRvciArICcgJyArXG5cdCAgICAgICAgIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5leHBlY3RlZCksIDEyOCk7XG5cdH1cblxuXHQvLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuXHQvLyB1bmRlcnN0b29kIGJ5IHRoZSBzcGVjLiBJbXBsZW1lbnRhdGlvbnMgb3Igc3ViIG1vZHVsZXMgY2FuIHBhc3Ncblx0Ly8gb3RoZXIga2V5cyB0byB0aGUgQXNzZXJ0aW9uRXJyb3IncyBjb25zdHJ1Y3RvciAtIHRoZXkgd2lsbCBiZVxuXHQvLyBpZ25vcmVkLlxuXG5cdC8vIDMuIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG5cdC8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG5cdC8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcblx0Ly8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcblx0Ly8gZGlzcGxheSBwdXJwb3Nlcy5cblxuXHRmdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcblx0ICB0aHJvdyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHtcblx0ICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdCAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcblx0ICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG5cdCAgfSk7XG5cdH1cblxuXHQvLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cblx0YXNzZXJ0LmZhaWwgPSBmYWlsO1xuXG5cdC8vIDQuIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcblx0Ly8gYnkgISFndWFyZC5cblx0Ly8gYXNzZXJ0Lm9rKGd1YXJkLCBtZXNzYWdlX29wdCk7XG5cdC8vIFRoaXMgc3RhdGVtZW50IGlzIGVxdWl2YWxlbnQgdG8gYXNzZXJ0LmVxdWFsKHRydWUsICEhZ3VhcmQsXG5cdC8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcblx0Ly8gYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIGd1YXJkLCBtZXNzYWdlX29wdCk7LlxuXG5cdGZ1bmN0aW9uIG9rKHZhbHVlLCBtZXNzYWdlKSB7XG5cdCAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcblx0fVxuXHRhc3NlcnQub2sgPSBvaztcblxuXHQvLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcblx0Ly8gPT0uXG5cdC8vIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cblx0YXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuXHQgIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09JywgYXNzZXJ0LmVxdWFsKTtcblx0fTtcblxuXHQvLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG5cdC8vIHdpdGggIT0gYXNzZXJ0Lm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuXHRhc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG5cdCAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuXHQgICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT0nLCBhc3NlcnQubm90RXF1YWwpO1xuXHQgIH1cblx0fTtcblxuXHQvLyA3LiBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cblx0Ly8gYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cblx0YXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG5cdCAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIGZhbHNlKSkge1xuXHQgICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcEVxdWFsJywgYXNzZXJ0LmRlZXBFcXVhbCk7XG5cdCAgfVxuXHR9O1xuXG5cdGFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBkZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuXHQgIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuXHQgICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcFN0cmljdEVxdWFsJywgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCk7XG5cdCAgfVxuXHR9O1xuXG5cdGZ1bmN0aW9uIF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgc3RyaWN0LCBtZW1vcykge1xuXHQgIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuXHQgIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9IGVsc2UgaWYgKGlzQnVmZmVyKGFjdHVhbCkgJiYgaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG5cdCAgICByZXR1cm4gY29tcGFyZShhY3R1YWwsIGV4cGVjdGVkKSA9PT0gMDtcblxuXHQgIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcblx0ICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBEYXRlIG9iamVjdCB0aGF0IHJlZmVycyB0byB0aGUgc2FtZSB0aW1lLlxuXHQgIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcblx0ICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cblx0ICAvLyA3LjMgSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuXHQgIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG5cdCAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cblx0ICB9IGVsc2UgaWYgKHV0aWwuaXNSZWdFeHAoYWN0dWFsKSAmJiB1dGlsLmlzUmVnRXhwKGV4cGVjdGVkKSkge1xuXHQgICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuXHQgICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuXHQgICAgICAgICAgIGFjdHVhbC5tdWx0aWxpbmUgPT09IGV4cGVjdGVkLm11bHRpbGluZSAmJlxuXHQgICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuXHQgICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG5cdCAgLy8gNy40LiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuXHQgIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG5cdCAgfSBlbHNlIGlmICgoYWN0dWFsID09PSBudWxsIHx8IHR5cGVvZiBhY3R1YWwgIT09ICdvYmplY3QnKSAmJlxuXHQgICAgICAgICAgICAgKGV4cGVjdGVkID09PSBudWxsIHx8IHR5cGVvZiBleHBlY3RlZCAhPT0gJ29iamVjdCcpKSB7XG5cdCAgICByZXR1cm4gc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuXHQgIC8vIElmIGJvdGggdmFsdWVzIGFyZSBpbnN0YW5jZXMgb2YgdHlwZWQgYXJyYXlzLCB3cmFwIHRoZWlyIHVuZGVybHlpbmdcblx0ICAvLyBBcnJheUJ1ZmZlcnMgaW4gYSBCdWZmZXIgZWFjaCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuXHQgIC8vIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoZSBhcnJheXMgdG8gaGF2ZSB0aGUgc2FtZSB0eXBlIGFzIGNoZWNrZWQgYnlcblx0ICAvLyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nIChha2EgcFRvU3RyaW5nKS4gTmV2ZXIgcGVyZm9ybSBiaW5hcnlcblx0ICAvLyBjb21wYXJpc29ucyBmb3IgRmxvYXQqQXJyYXlzLCB0aG91Z2gsIHNpbmNlIGUuZy4gKzAgPT09IC0wIGJ1dCB0aGVpclxuXHQgIC8vIGJpdCBwYXR0ZXJucyBhcmUgbm90IGlkZW50aWNhbC5cblx0ICB9IGVsc2UgaWYgKGlzVmlldyhhY3R1YWwpICYmIGlzVmlldyhleHBlY3RlZCkgJiZcblx0ICAgICAgICAgICAgIHBUb1N0cmluZyhhY3R1YWwpID09PSBwVG9TdHJpbmcoZXhwZWN0ZWQpICYmXG5cdCAgICAgICAgICAgICAhKGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fFxuXHQgICAgICAgICAgICAgICBhY3R1YWwgaW5zdGFuY2VvZiBGbG9hdDY0QXJyYXkpKSB7XG5cdCAgICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhY3R1YWwuYnVmZmVyKSxcblx0ICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGV4cGVjdGVkLmJ1ZmZlcikpID09PSAwO1xuXG5cdCAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcblx0ICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcblx0ICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG5cdCAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuXHQgIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG5cdCAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG5cdCAgfSBlbHNlIGlmIChpc0J1ZmZlcihhY3R1YWwpICE9PSBpc0J1ZmZlcihleHBlY3RlZCkpIHtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2Uge1xuXHQgICAgbWVtb3MgPSBtZW1vcyB8fCB7YWN0dWFsOiBbXSwgZXhwZWN0ZWQ6IFtdfTtcblxuXHQgICAgdmFyIGFjdHVhbEluZGV4ID0gbWVtb3MuYWN0dWFsLmluZGV4T2YoYWN0dWFsKTtcblx0ICAgIGlmIChhY3R1YWxJbmRleCAhPT0gLTEpIHtcblx0ICAgICAgaWYgKGFjdHVhbEluZGV4ID09PSBtZW1vcy5leHBlY3RlZC5pbmRleE9mKGV4cGVjdGVkKSkge1xuXHQgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIG1lbW9zLmFjdHVhbC5wdXNoKGFjdHVhbCk7XG5cdCAgICBtZW1vcy5leHBlY3RlZC5wdXNoKGV4cGVjdGVkKTtcblxuXHQgICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuXHQgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0fVxuXG5cdGZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpIHtcblx0ICBpZiAoYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQpXG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgLy8gaWYgb25lIGlzIGEgcHJpbWl0aXZlLCB0aGUgb3RoZXIgbXVzdCBiZSBzYW1lXG5cdCAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSlcblx0ICAgIHJldHVybiBhID09PSBiO1xuXHQgIGlmIChzdHJpY3QgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYikpXG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKTtcblx0ICB2YXIgYklzQXJncyA9IGlzQXJndW1lbnRzKGIpO1xuXHQgIGlmICgoYUlzQXJncyAmJiAhYklzQXJncykgfHwgKCFhSXNBcmdzICYmIGJJc0FyZ3MpKVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIGlmIChhSXNBcmdzKSB7XG5cdCAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG5cdCAgICBiID0gcFNsaWNlLmNhbGwoYik7XG5cdCAgICByZXR1cm4gX2RlZXBFcXVhbChhLCBiLCBzdHJpY3QpO1xuXHQgIH1cblx0ICB2YXIga2EgPSBvYmplY3RLZXlzKGEpO1xuXHQgIHZhciBrYiA9IG9iamVjdEtleXMoYik7XG5cdCAgdmFyIGtleSwgaTtcblx0ICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG5cdCAgLy8gaGFzT3duUHJvcGVydHkpXG5cdCAgaWYgKGthLmxlbmd0aCAhPT0ga2IubGVuZ3RoKVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG5cdCAga2Euc29ydCgpO1xuXHQgIGtiLnNvcnQoKTtcblx0ICAvL35+fmNoZWFwIGtleSB0ZXN0XG5cdCAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgIGlmIChrYVtpXSAhPT0ga2JbaV0pXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuXHQgIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuXHQgIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICBrZXkgPSBrYVtpXTtcblx0ICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBhY3R1YWxWaXNpdGVkT2JqZWN0cykpXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgcmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cblx0Ly8gYXNzZXJ0Lm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cblx0YXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG5cdCAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG5cdCAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwRXF1YWwnLCBhc3NlcnQubm90RGVlcEVxdWFsKTtcblx0ICB9XG5cdH07XG5cblx0YXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcblx0ZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcblx0ICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuXHQgICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcFN0cmljdEVxdWFsJywgbm90RGVlcFN0cmljdEVxdWFsKTtcblx0ICB9XG5cdH1cblxuXG5cdC8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG5cdC8vIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cblx0YXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuXHQgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG5cdCAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PT0nLCBhc3NlcnQuc3RyaWN0RXF1YWwpO1xuXHQgIH1cblx0fTtcblxuXHQvLyAxMC4gVGhlIHN0cmljdCBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciBzdHJpY3QgaW5lcXVhbGl0eSwgYXNcblx0Ly8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5cdGFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcblx0ICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuXHQgICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcblx0ICB9XG5cdH07XG5cblx0ZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuXHQgIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblxuXHQgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG5cdCAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xuXHQgIH1cblxuXHQgIHRyeSB7XG5cdCAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcblx0ICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICB9XG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgLy8gSWdub3JlLiAgVGhlIGluc3RhbmNlb2YgY2hlY2sgZG9lc24ndCB3b3JrIGZvciBhcnJvdyBmdW5jdGlvbnMuXG5cdCAgfVxuXG5cdCAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWU7XG5cdH1cblxuXHRmdW5jdGlvbiBfdHJ5QmxvY2soYmxvY2spIHtcblx0ICB2YXIgZXJyb3I7XG5cdCAgdHJ5IHtcblx0ICAgIGJsb2NrKCk7XG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgZXJyb3IgPSBlO1xuXHQgIH1cblx0ICByZXR1cm4gZXJyb3I7XG5cdH1cblxuXHRmdW5jdGlvbiBfdGhyb3dzKHNob3VsZFRocm93LCBibG9jaywgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcblx0ICB2YXIgYWN0dWFsO1xuXG5cdCAgaWYgKHR5cGVvZiBibG9jayAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJibG9ja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHQgIH1cblxuXHQgIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnKSB7XG5cdCAgICBtZXNzYWdlID0gZXhwZWN0ZWQ7XG5cdCAgICBleHBlY3RlZCA9IG51bGw7XG5cdCAgfVxuXG5cdCAgYWN0dWFsID0gX3RyeUJsb2NrKGJsb2NrKTtcblxuXHQgIG1lc3NhZ2UgPSAoZXhwZWN0ZWQgJiYgZXhwZWN0ZWQubmFtZSA/ICcgKCcgKyBleHBlY3RlZC5uYW1lICsgJykuJyA6ICcuJykgK1xuXHQgICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG5cdCAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcblx0ICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ01pc3NpbmcgZXhwZWN0ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuXHQgIH1cblxuXHQgIHZhciB1c2VyUHJvdmlkZWRNZXNzYWdlID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnO1xuXHQgIHZhciBpc1Vud2FudGVkRXhjZXB0aW9uID0gIXNob3VsZFRocm93ICYmIHV0aWwuaXNFcnJvcihhY3R1YWwpO1xuXHQgIHZhciBpc1VuZXhwZWN0ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmICFleHBlY3RlZDtcblxuXHQgIGlmICgoaXNVbndhbnRlZEV4Y2VwdGlvbiAmJlxuXHQgICAgICB1c2VyUHJvdmlkZWRNZXNzYWdlICYmXG5cdCAgICAgIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fFxuXHQgICAgICBpc1VuZXhwZWN0ZWRFeGNlcHRpb24pIHtcblx0ICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ0dvdCB1bndhbnRlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG5cdCAgfVxuXG5cdCAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcblx0ICAgICAgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fCAoIXNob3VsZFRocm93ICYmIGFjdHVhbCkpIHtcblx0ICAgIHRocm93IGFjdHVhbDtcblx0ICB9XG5cdH1cblxuXHQvLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG5cdC8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5cdGFzc2VydC50aHJvd3MgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcblx0ICBfdGhyb3dzKHRydWUsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG5cdH07XG5cblx0Ly8gRVhURU5TSU9OISBUaGlzIGlzIGFubm95aW5nIHRvIHdyaXRlIG91dHNpZGUgdGhpcyBtb2R1bGUuXG5cdGFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcblx0ICBfdGhyb3dzKGZhbHNlLCBibG9jaywgZXJyb3IsIG1lc3NhZ2UpO1xuXHR9O1xuXG5cdGFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHRocm93IGVycjsgfTtcblxuXHQvLyBFeHBvc2UgYSBzdHJpY3Qgb25seSB2YXJpYW50IG9mIGFzc2VydFxuXHRmdW5jdGlvbiBzdHJpY3QodmFsdWUsIG1lc3NhZ2UpIHtcblx0ICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBzdHJpY3QpO1xuXHR9XG5cdGFzc2VydC5zdHJpY3QgPSBvYmplY3RBc3NpZ24oc3RyaWN0LCBhc3NlcnQsIHtcblx0ICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuXHQgIGRlZXBFcXVhbDogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCxcblx0ICBub3RFcXVhbDogYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLFxuXHQgIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxuXHR9KTtcblx0YXNzZXJ0LnN0cmljdC5zdHJpY3QgPSBhc3NlcnQuc3RyaWN0O1xuXG5cdHZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuXHQgIHZhciBrZXlzID0gW107XG5cdCAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG5cdCAgfVxuXHQgIHJldHVybiBrZXlzO1xuXHR9O1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSksXG4vKiAyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdG9iamVjdC1hc3NpZ25cblx0KGMpIFNpbmRyZSBTb3JodXNcblx0QGxpY2Vuc2UgTUlUXG5cdCovXG5cblx0J3VzZSBzdHJpY3QnO1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHR2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblx0dmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cdGZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdCh2YWwpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHRcdH1cblx0XHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdFx0dmFyIHRlc3QzID0ge307XG5cdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHRcdHZhciBmcm9tO1xuXHRcdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdFx0dmFyIHN5bWJvbHM7XG5cblx0XHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdG87XG5cdH07XG5cblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihnbG9iYWwsIHByb2Nlc3MpIHsvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cblx0Ly9cblx0Ly8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcblx0Ly8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXHQvLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcblx0Ly8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuXHQvLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG5cdC8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuXHQvLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcblx0Ly9cblx0Ly8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcblx0Ly8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cdC8vXG5cdC8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncblx0Ly8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuXHQvLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG5cdC8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuXHQvLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcblx0Ly8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuXHQvLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5cdHZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuXHRleHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcblx0ICBpZiAoIWlzU3RyaW5nKGYpKSB7XG5cdCAgICB2YXIgb2JqZWN0cyA9IFtdO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG5cdCAgfVxuXG5cdCAgdmFyIGkgPSAxO1xuXHQgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHQgIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblx0ICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG5cdCAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcblx0ICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG5cdCAgICBzd2l0Y2ggKHgpIHtcblx0ICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG5cdCAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuXHQgICAgICBjYXNlICclaic6XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuXHQgICAgICAgIH0gY2F0Y2ggKF8pIHtcblx0ICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG5cdCAgICAgICAgfVxuXHQgICAgICBkZWZhdWx0OlxuXHQgICAgICAgIHJldHVybiB4O1xuXHQgICAgfVxuXHQgIH0pO1xuXHQgIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG5cdCAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuXHQgICAgICBzdHIgKz0gJyAnICsgeDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gc3RyO1xuXHR9O1xuXG5cblx0Ly8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cblx0Ly8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cblx0Ly8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cblx0ZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG5cdCAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cblx0ICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgfTtcblx0ICB9XG5cblx0ICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG5cdCAgICByZXR1cm4gZm47XG5cdCAgfVxuXG5cdCAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuXHQgIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG5cdCAgICBpZiAoIXdhcm5lZCkge1xuXHQgICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG5cdCAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG5cdCAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcblx0ICAgICAgfVxuXHQgICAgICB3YXJuZWQgPSB0cnVlO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG5cdH07XG5cblxuXHR2YXIgZGVidWdzID0ge307XG5cdHZhciBkZWJ1Z0Vudmlyb247XG5cdGV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcblx0ICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcblx0ICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG5cdCAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG5cdCAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuXHQgICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG5cdCAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcblx0ICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcblx0ICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcblx0ICAgICAgfTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIGRlYnVnc1tzZXRdO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcblx0ICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG5cdCAqL1xuXHQvKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5cdGZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG5cdCAgLy8gZGVmYXVsdCBvcHRpb25zXG5cdCAgdmFyIGN0eCA9IHtcblx0ICAgIHNlZW46IFtdLFxuXHQgICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3Jcblx0ICB9O1xuXHQgIC8vIGxlZ2FjeS4uLlxuXHQgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcblx0ICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuXHQgIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcblx0ICAgIC8vIGxlZ2FjeS4uLlxuXHQgICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuXHQgIH0gZWxzZSBpZiAob3B0cykge1xuXHQgICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuXHQgICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG5cdCAgfVxuXHQgIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcblx0ICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuXHQgIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuXHQgIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuXHQgIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcblx0ICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuXHQgIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcblx0fVxuXHRleHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cblx0Ly8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5cdGluc3BlY3QuY29sb3JzID0ge1xuXHQgICdib2xkJyA6IFsxLCAyMl0sXG5cdCAgJ2l0YWxpYycgOiBbMywgMjNdLFxuXHQgICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcblx0ICAnaW52ZXJzZScgOiBbNywgMjddLFxuXHQgICd3aGl0ZScgOiBbMzcsIDM5XSxcblx0ICAnZ3JleScgOiBbOTAsIDM5XSxcblx0ICAnYmxhY2snIDogWzMwLCAzOV0sXG5cdCAgJ2JsdWUnIDogWzM0LCAzOV0sXG5cdCAgJ2N5YW4nIDogWzM2LCAzOV0sXG5cdCAgJ2dyZWVuJyA6IFszMiwgMzldLFxuXHQgICdtYWdlbnRhJyA6IFszNSwgMzldLFxuXHQgICdyZWQnIDogWzMxLCAzOV0sXG5cdCAgJ3llbGxvdycgOiBbMzMsIDM5XVxuXHR9O1xuXG5cdC8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuXHRpbnNwZWN0LnN0eWxlcyA9IHtcblx0ICAnc3BlY2lhbCc6ICdjeWFuJyxcblx0ICAnbnVtYmVyJzogJ3llbGxvdycsXG5cdCAgJ2Jvb2xlYW4nOiAneWVsbG93Jyxcblx0ICAndW5kZWZpbmVkJzogJ2dyZXknLFxuXHQgICdudWxsJzogJ2JvbGQnLFxuXHQgICdzdHJpbmcnOiAnZ3JlZW4nLFxuXHQgICdkYXRlJzogJ21hZ2VudGEnLFxuXHQgIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG5cdCAgJ3JlZ2V4cCc6ICdyZWQnXG5cdH07XG5cblxuXHRmdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG5cdCAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuXHQgIGlmIChzdHlsZSkge1xuXHQgICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuXHQgICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiBzdHI7XG5cdCAgfVxuXHR9XG5cblxuXHRmdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuXHQgIHJldHVybiBzdHI7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG5cdCAgdmFyIGhhc2ggPSB7fTtcblxuXHQgIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcblx0ICAgIGhhc2hbdmFsXSA9IHRydWU7XG5cdCAgfSk7XG5cblx0ICByZXR1cm4gaGFzaDtcblx0fVxuXG5cblx0ZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG5cdCAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuXHQgIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuXHQgIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuXHQgICAgICB2YWx1ZSAmJlxuXHQgICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG5cdCAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuXHQgICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcblx0ICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG5cdCAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcblx0ICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcblx0ICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuXHQgICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXQ7XG5cdCAgfVxuXG5cdCAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcblx0ICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuXHQgIGlmIChwcmltaXRpdmUpIHtcblx0ICAgIHJldHVybiBwcmltaXRpdmU7XG5cdCAgfVxuXG5cdCAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuXHQgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXHQgIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG5cdCAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG5cdCAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuXHQgIH1cblxuXHQgIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcblx0ICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuXHQgIGlmIChpc0Vycm9yKHZhbHVlKVxuXHQgICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcblx0ICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG5cdCAgfVxuXG5cdCAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuXHQgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG5cdCAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG5cdCAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG5cdCAgICB9XG5cdCAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG5cdCAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG5cdCAgICB9XG5cdCAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuXHQgICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG5cdCAgICB9XG5cdCAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcblx0ICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcblx0ICAgIH1cblx0ICB9XG5cblx0ICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG5cdCAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuXHQgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuXHQgICAgYXJyYXkgPSB0cnVlO1xuXHQgICAgYnJhY2VzID0gWydbJywgJ10nXTtcblx0ICB9XG5cblx0ICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcblx0ICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcblx0ICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG5cdCAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcblx0ICB9XG5cblx0ICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuXHQgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcblx0ICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXHQgIH1cblxuXHQgIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuXHQgIGlmIChpc0RhdGUodmFsdWUpKSB7XG5cdCAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG5cdCAgfVxuXG5cdCAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuXHQgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuXHQgICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcblx0ICB9XG5cblx0ICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcblx0ICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuXHQgIH1cblxuXHQgIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG5cdCAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG5cdCAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcblx0ICAgIH1cblx0ICB9XG5cblx0ICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuXHQgIHZhciBvdXRwdXQ7XG5cdCAgaWYgKGFycmF5KSB7XG5cdCAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcblx0ICB9IGVsc2Uge1xuXHQgICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG5cdCAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIGN0eC5zZWVuLnBvcCgpO1xuXG5cdCAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcblx0fVxuXG5cblx0ZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcblx0ICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuXHQgICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG5cdCAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuXHQgICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuXHQgICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuXHQgIH1cblx0ICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuXHQgICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcblx0ICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcblx0ICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuXHQgIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cblx0ICBpZiAoaXNOdWxsKHZhbHVlKSlcblx0ICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG5cdH1cblxuXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG5cdCAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcblx0fVxuXG5cblx0ZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuXHQgIHZhciBvdXRwdXQgPSBbXTtcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuXHQgICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG5cdCAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG5cdCAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG91dHB1dC5wdXNoKCcnKTtcblx0ICAgIH1cblx0ICB9XG5cdCAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHQgICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG5cdCAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG5cdCAgICAgICAgICBrZXksIHRydWUpKTtcblx0ICAgIH1cblx0ICB9KTtcblx0ICByZXR1cm4gb3V0cHV0O1xuXHR9XG5cblxuXHRmdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG5cdCAgdmFyIG5hbWUsIHN0ciwgZGVzYztcblx0ICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG5cdCAgaWYgKGRlc2MuZ2V0KSB7XG5cdCAgICBpZiAoZGVzYy5zZXQpIHtcblx0ICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICBpZiAoZGVzYy5zZXQpIHtcblx0ICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuXHQgICAgbmFtZSA9ICdbJyArIGtleSArICddJztcblx0ICB9XG5cdCAgaWYgKCFzdHIpIHtcblx0ICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuXHQgICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcblx0ICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG5cdCAgICAgICAgaWYgKGFycmF5KSB7XG5cdCAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcblx0ICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG5cdCAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG5cdCAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuXHQgICAgICByZXR1cm4gc3RyO1xuXHQgICAgfVxuXHQgICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcblx0ICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuXHQgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcblx0ICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcblx0ICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG5cdCAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG5cdCAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xuXHR9XG5cblxuXHRmdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuXHQgIHZhciBudW1MaW5lc0VzdCA9IDA7XG5cdCAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG5cdCAgICBudW1MaW5lc0VzdCsrO1xuXHQgICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuXHQgICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuXHQgIH0sIDApO1xuXG5cdCAgaWYgKGxlbmd0aCA+IDYwKSB7XG5cdCAgICByZXR1cm4gYnJhY2VzWzBdICtcblx0ICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcblx0ICAgICAgICAgICAnICcgK1xuXHQgICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG5cdCAgICAgICAgICAgJyAnICtcblx0ICAgICAgICAgICBicmFjZXNbMV07XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcblx0fVxuXG5cblx0Ly8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG5cdC8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuXHRmdW5jdGlvbiBpc0FycmF5KGFyKSB7XG5cdCAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xuXHR9XG5cdGV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cblx0ZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuXHQgIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG5cdH1cblx0ZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cblx0ZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuXHQgIHJldHVybiBhcmcgPT09IG51bGw7XG5cdH1cblx0ZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cblx0ZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG5cdCAgcmV0dXJuIGFyZyA9PSBudWxsO1xuXHR9XG5cdGV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuXHRmdW5jdGlvbiBpc051bWJlcihhcmcpIHtcblx0ICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG5cdH1cblx0ZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5cdGZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuXHQgIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcblx0fVxuXHRleHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cblx0ZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG5cdCAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xuXHR9XG5cdGV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuXHRmdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcblx0ICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG5cdH1cblx0ZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5cdGZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG5cdCAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xuXHR9XG5cdGV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuXHRmdW5jdGlvbiBpc09iamVjdChhcmcpIHtcblx0ICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xuXHR9XG5cdGV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuXHRmdW5jdGlvbiBpc0RhdGUoZCkge1xuXHQgIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuXHR9XG5cdGV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5cdGZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuXHQgIHJldHVybiBpc09iamVjdChlKSAmJlxuXHQgICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcblx0fVxuXHRleHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5cdGZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG5cdCAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG5cdH1cblx0ZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuXHRmdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcblx0ICByZXR1cm4gYXJnID09PSBudWxsIHx8XG5cdCAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuXHQgICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuXHQgICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuXHQgICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuXHQgICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcblx0fVxuXHRleHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cblx0ZXhwb3J0cy5pc0J1ZmZlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdGZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xuXHR9XG5cblxuXHRmdW5jdGlvbiBwYWQobikge1xuXHQgIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xuXHR9XG5cblxuXHR2YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG5cdCAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cblx0Ly8gMjYgRmViIDE2OjE5OjM0XG5cdGZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcblx0ICB2YXIgZCA9IG5ldyBEYXRlKCk7XG5cdCAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG5cdCAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcblx0ICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG5cdCAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcblx0fVxuXG5cblx0Ly8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuXHRleHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuXHQgIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cblx0ICpcblx0ICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuXHQgKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcblx0ICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcblx0ICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG5cdCAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG5cdCAqICAgICBwcm90b3R5cGUuXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuXHQgKi9cblx0ZXhwb3J0cy5pbmhlcml0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpO1xuXG5cdGV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG5cdCAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuXHQgIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG5cdCAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuXHQgIHZhciBpID0ga2V5cy5sZW5ndGg7XG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuXHQgIH1cblx0ICByZXR1cm4gb3JpZ2luO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuXHQgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcblx0fVxuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KSkpXG5cbi8qKiovIH0pLFxuLyogMjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblx0dmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cdC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuXHQvLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcblx0Ly8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuXHQvLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG5cdHZhciBjYWNoZWRTZXRUaW1lb3V0O1xuXHR2YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5cdGZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcblx0fVxuXHRmdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG5cdH1cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuXHQgICAgICAgIH1cblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcblx0ICAgIH1cblx0ICAgIHRyeSB7XG5cdCAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5cdCAgICAgICAgfVxuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5cdCAgICB9XG5cdH0gKCkpXG5cdGZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG5cdCAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuXHQgICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuXHQgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG5cdCAgICB9XG5cdCAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXHQgICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG5cdCAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG5cdCAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcblx0ICAgIH1cblx0ICAgIHRyeSB7XG5cdCAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuXHQgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG5cdCAgICB9IGNhdGNoKGUpe1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuXHQgICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG5cdCAgICAgICAgfSBjYXRjaChlKXtcblx0ICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3Jcblx0ICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXG5cdH1cblx0ZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuXHQgICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG5cdCAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG5cdCAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuXHQgICAgfVxuXHQgICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXHQgICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG5cdCAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuXHQgICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcblx0ICAgIH1cblx0ICAgIHRyeSB7XG5cdCAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuXHQgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcblx0ICAgIH0gY2F0Y2ggKGUpe1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcblx0ICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG5cdCAgICAgICAgfSBjYXRjaCAoZSl7XG5cdCAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuXHQgICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG5cdCAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXG5cblx0fVxuXHR2YXIgcXVldWUgPSBbXTtcblx0dmFyIGRyYWluaW5nID0gZmFsc2U7XG5cdHZhciBjdXJyZW50UXVldWU7XG5cdHZhciBxdWV1ZUluZGV4ID0gLTE7XG5cblx0ZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuXHQgICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgZHJhaW5pbmcgPSBmYWxzZTtcblx0ICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG5cdCAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuXHQgICAgfVxuXHQgICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuXHQgICAgICAgIGRyYWluUXVldWUoKTtcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG5cdCAgICBpZiAoZHJhaW5pbmcpIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcblx0ICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuXHQgICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblx0ICAgIHdoaWxlKGxlbikge1xuXHQgICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuXHQgICAgICAgIHF1ZXVlID0gW107XG5cdCAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuXHQgICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG5cdCAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuXHQgICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblx0ICAgIH1cblx0ICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG5cdCAgICBkcmFpbmluZyA9IGZhbHNlO1xuXHQgICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHR9XG5cblx0cHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcblx0ICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG5cdCAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuXHQgICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG5cdCAgICB9XG5cdH07XG5cblx0Ly8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXHRmdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcblx0ICAgIHRoaXMuZnVuID0gZnVuO1xuXHQgICAgdGhpcy5hcnJheSA9IGFycmF5O1xuXHR9XG5cdEl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xuXHR9O1xuXHRwcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xuXHRwcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xuXHRwcm9jZXNzLmVudiA9IHt9O1xuXHRwcm9jZXNzLmFyZ3YgPSBbXTtcblx0cHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cdHByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuXHRmdW5jdGlvbiBub29wKCkge31cblxuXHRwcm9jZXNzLm9uID0gbm9vcDtcblx0cHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5cdHByb2Nlc3Mub25jZSA9IG5vb3A7XG5cdHByb2Nlc3Mub2ZmID0gbm9vcDtcblx0cHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5cdHByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcblx0cHJvY2Vzcy5lbWl0ID0gbm9vcDtcblx0cHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xuXHRwcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5cdHByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxuXHRwcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHR9O1xuXG5cdHByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5cdHByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHR9O1xuXHRwcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuXHQgIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcblx0ICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG5cdCAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcblx0fVxuXG4vKioqLyB9KSxcbi8qIDI2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcblx0ICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuXHQgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3Jcblx0ICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG5cdCAgICAgIGNvbnN0cnVjdG9yOiB7XG5cdCAgICAgICAgdmFsdWU6IGN0b3IsXG5cdCAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG5cdCAgICAgICAgd3JpdGFibGU6IHRydWUsXG5cdCAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXHQgIH07XG5cdH0gZWxzZSB7XG5cdCAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcblx0ICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuXHQgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3Jcblx0ICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG5cdCAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG5cdCAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG5cdCAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3Jcblx0ICB9XG5cdH1cblxuXG4vKioqLyB9KSxcbi8qIDI3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIERPTSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cdHZhciB1dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG5cdCAgICB2YXIgY2FudmFzID0gRE9NLm5ld0VsKCdjYW52YXMnKTtcblx0ICAgIHZhciBjdHggPSBudWxsO1xuXG5cdCAgICByZXR1cm4gZnVuY3Rpb24oc2NlbmVHcmFwaCkge1xuXHQgICAgICAgIGlmIChjdHggPT0gbnVsbCkge1xuXHQgICAgICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgZHByID0gdXRpbHMuY2FudmFzUmF0aW8oKTtcblx0ICAgICAgICB2YXIgcm9vdCA9IHNjZW5lR3JhcGgucm9vdDtcblx0ICAgICAgICBjYW52YXMud2lkdGggPSBkcHIgKiByb290LnByb3BlcnRpZXMud2lkdGg7XG5cdCAgICAgICAgY2FudmFzLmhlaWdodCA9IGRwciAqIHJvb3QucHJvcGVydGllcy5oZWlnaHQgO1xuXHQgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuXHQgICAgICAgIHZhciBiZyA9IHJvb3QuY2hpbGRyZW4uaG9sZGVyQmc7XG5cdCAgICAgICAgdmFyIGJnV2lkdGggPSBkcHIgKiBiZy53aWR0aDtcblx0ICAgICAgICB2YXIgYmdIZWlnaHQgPSBkcHIgKiBiZy5oZWlnaHQ7XG5cdCAgICAgICAgLy90b2RvOiBwYXJhbWV0cml6ZSBvdXRsaW5lIHdpZHRoIChlLmcuIGluIHNjZW5lIG9iamVjdClcblx0ICAgICAgICB2YXIgb3V0bGluZVdpZHRoID0gMjtcblx0ICAgICAgICB2YXIgb3V0bGluZU9mZnNldFdpZHRoID0gb3V0bGluZVdpZHRoIC8gMjtcblxuXHQgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiZy5wcm9wZXJ0aWVzLmZpbGw7XG5cdCAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGJnV2lkdGgsIGJnSGVpZ2h0KTtcblxuXHQgICAgICAgIGlmIChiZy5wcm9wZXJ0aWVzLm91dGxpbmUpIHtcblx0ICAgICAgICAgICAgLy90b2RvOiBhYnN0cmFjdCB0aGlzIGludG8gYSBtZXRob2Rcblx0ICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYmcucHJvcGVydGllcy5vdXRsaW5lLmZpbGw7XG5cdCAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBiZy5wcm9wZXJ0aWVzLm91dGxpbmUud2lkdGg7XG5cdCAgICAgICAgICAgIGN0eC5tb3ZlVG8ob3V0bGluZU9mZnNldFdpZHRoLCBvdXRsaW5lT2Zmc2V0V2lkdGgpO1xuXHQgICAgICAgICAgICAvLyBUTCwgVFIsIEJSLCBCTFxuXHQgICAgICAgICAgICBjdHgubGluZVRvKGJnV2lkdGggLSBvdXRsaW5lT2Zmc2V0V2lkdGgsIG91dGxpbmVPZmZzZXRXaWR0aCk7XG5cdCAgICAgICAgICAgIGN0eC5saW5lVG8oYmdXaWR0aCAtIG91dGxpbmVPZmZzZXRXaWR0aCwgYmdIZWlnaHQgLSBvdXRsaW5lT2Zmc2V0V2lkdGgpO1xuXHQgICAgICAgICAgICBjdHgubGluZVRvKG91dGxpbmVPZmZzZXRXaWR0aCwgYmdIZWlnaHQgLSBvdXRsaW5lT2Zmc2V0V2lkdGgpO1xuXHQgICAgICAgICAgICBjdHgubGluZVRvKG91dGxpbmVPZmZzZXRXaWR0aCwgb3V0bGluZU9mZnNldFdpZHRoKTtcblx0ICAgICAgICAgICAgLy8gRGlhZ29uYWxzXG5cdCAgICAgICAgICAgIGN0eC5tb3ZlVG8oMCwgb3V0bGluZU9mZnNldFdpZHRoKTtcblx0ICAgICAgICAgICAgY3R4LmxpbmVUbyhiZ1dpZHRoLCBiZ0hlaWdodCAtIG91dGxpbmVPZmZzZXRXaWR0aCk7XG5cdCAgICAgICAgICAgIGN0eC5tb3ZlVG8oMCwgYmdIZWlnaHQgLSBvdXRsaW5lT2Zmc2V0V2lkdGgpO1xuXHQgICAgICAgICAgICBjdHgubGluZVRvKGJnV2lkdGgsIG91dGxpbmVPZmZzZXRXaWR0aCk7XG5cdCAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgdGV4dEdyb3VwID0gcm9vdC5jaGlsZHJlbi5ob2xkZXJUZXh0R3JvdXA7XG5cdCAgICAgICAgY3R4LmZvbnQgPSB0ZXh0R3JvdXAucHJvcGVydGllcy5mb250LndlaWdodCArICcgJyArIChkcHIgKiB0ZXh0R3JvdXAucHJvcGVydGllcy5mb250LnNpemUpICsgdGV4dEdyb3VwLnByb3BlcnRpZXMuZm9udC51bml0cyArICcgJyArIHRleHRHcm91cC5wcm9wZXJ0aWVzLmZvbnQuZmFtaWx5ICsgJywgbW9ub3NwYWNlJztcblx0ICAgICAgICBjdHguZmlsbFN0eWxlID0gdGV4dEdyb3VwLnByb3BlcnRpZXMuZmlsbDtcblxuXHQgICAgICAgIGZvciAodmFyIGxpbmVLZXkgaW4gdGV4dEdyb3VwLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgIHZhciBsaW5lID0gdGV4dEdyb3VwLmNoaWxkcmVuW2xpbmVLZXldO1xuXHQgICAgICAgICAgICBmb3IgKHZhciB3b3JkS2V5IGluIGxpbmUuY2hpbGRyZW4pIHtcblx0ICAgICAgICAgICAgICAgIHZhciB3b3JkID0gbGluZS5jaGlsZHJlblt3b3JkS2V5XTtcblx0ICAgICAgICAgICAgICAgIHZhciB4ID0gZHByICogKHRleHRHcm91cC54ICsgbGluZS54ICsgd29yZC54KTtcblx0ICAgICAgICAgICAgICAgIHZhciB5ID0gZHByICogKHRleHRHcm91cC55ICsgbGluZS55ICsgd29yZC55ICsgKHRleHRHcm91cC5wcm9wZXJ0aWVzLmxlYWRpbmcgLyAyKSk7XG5cblx0ICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh3b3JkLnByb3BlcnRpZXMudGV4dCwgeCwgeSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG5cdCAgICB9O1xuXHR9KSgpO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuKGZ1bmN0aW9uKGN0eCwgaXNNZXRlb3JQYWNrYWdlKSB7XG4gICAgaWYgKGlzTWV0ZW9yUGFja2FnZSkge1xuICAgICAgICBIb2xkZXIgPSBjdHguSG9sZGVyO1xuICAgIH1cbn0pKHRoaXMsIHR5cGVvZiBNZXRlb3IgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBQYWNrYWdlICE9PSAndW5kZWZpbmVkJyk7XG4iXSwic291cmNlUm9vdCI6IiJ9