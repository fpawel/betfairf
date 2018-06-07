/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/reconnectingwebsocket/reconnecting-websocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/reconnectingwebsocket/reconnecting-websocket.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// MIT License:
//
// Copyright (c) 2010-2012, Joe Walnes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This behaves like a WebSocket in every way, except if it fails to connect,
 * or it gets disconnected, it will repeatedly poll until it successfully connects
 * again.
 *
 * It is API compatible, so when you have:
 *   ws = new WebSocket('ws://....');
 * you can replace with:
 *   ws = new ReconnectingWebSocket('ws://....');
 *
 * The event stream will typically look like:
 *  onconnecting
 *  onopen
 *  onmessage
 *  onmessage
 *  onclose // lost connection
 *  onconnecting
 *  onopen  // sometime later...
 *  onmessage
 *  onmessage
 *  etc...
 *
 * It is API compatible with the standard WebSocket API, apart from the following members:
 *
 * - `bufferedAmount`
 * - `extensions`
 * - `binaryType`
 *
 * Latest version: https://github.com/joewalnes/reconnecting-websocket/
 * - Joe Walnes
 *
 * Syntax
 * ======
 * var socket = new ReconnectingWebSocket(url, protocols, options);
 *
 * Parameters
 * ==========
 * url - The url you are connecting to.
 * protocols - Optional string or array of protocols.
 * options - See below
 *
 * Options
 * =======
 * Options can either be passed upon instantiation or set after instantiation:
 *
 * var socket = new ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 4000 });
 *
 * or
 *
 * var socket = new ReconnectingWebSocket(url);
 * socket.debug = true;
 * socket.reconnectInterval = 4000;
 *
 * debug
 * - Whether this instance should log debug messages. Accepts true or false. Default: false.
 *
 * automaticOpen
 * - Whether or not the websocket should attempt to connect immediately upon instantiation. The socket can be manually opened or closed at any time using ws.open() and ws.close().
 *
 * reconnectInterval
 * - The number of milliseconds to delay before attempting to reconnect. Accepts integer. Default: 1000.
 *
 * maxReconnectInterval
 * - The maximum number of milliseconds to delay a reconnection attempt. Accepts integer. Default: 30000.
 *
 * reconnectDecay
 * - The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. Accepts integer or float. Default: 1.5.
 *
 * timeoutInterval
 * - The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. Accepts integer. Default: 2000.
 *
 */
(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function () {

    if (!('WebSocket' in window)) {
        return;
    }

    function ReconnectingWebSocket(url, protocols, options) {

        // Default settings
        var settings = {

            /** Whether this instance should log debug messages. */
            debug: false,

            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            automaticOpen: true,

            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 1000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 30000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,

            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 2000,

            /** The maximum number of reconnection attempts to make. Unlimited if null. */
            maxReconnectAttempts: null
        }
        if (!options) { options = {}; }

        // Overwrite and define settings with options if they exist.
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = settings[key];
            }
        }

        // These should be treated as read-only properties

        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
        this.url = url;

        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
        this.reconnectAttempts = 0;

        /**
         * The current state of the connection.
         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * Read only.
         */
        this.readyState = WebSocket.CONNECTING;

        /**
         * A string indicating the name of the sub-protocol the server selected; this will be one of
         * the strings specified in the protocols parameter when creating the WebSocket object.
         * Read only.
         */
        this.protocol = null;

        // Private state variables

        var self = this;
        var ws;
        var forcedClose = false;
        var timedOut = false;
        var eventTarget = document.createElement('div');

        // Wire up "on*" properties as event handlers

        eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
        eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
        eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
        eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
        eventTarget.addEventListener('error',      function(event) { self.onerror(event); });

        // Expose the API required by EventTarget

        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

        /**
         * This function generates an event that is compatible with standard
         * compliant browsers and IE9 - IE11
         *
         * This will prevent the error:
         * Object doesn't support this action
         *
         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
         * @param s String The name that the event should use
         * @param args Object an optional object that the event will use
         */
        function generateEvent(s, args) {
        	var evt = document.createEvent("CustomEvent");
        	evt.initCustomEvent(s, false, false, args);
        	return evt;
        };

        this.open = function (reconnectAttempt) {
            ws = new WebSocket(self.url, protocols || []);

            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'));
                this.reconnectAttempts = 0;
            }

            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
            }

            var localWs = ws;
            var timeout = setTimeout(function() {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
                }
                timedOut = true;
                localWs.close();
                timedOut = false;
            }, self.timeoutInterval);

            ws.onopen = function(event) {
                clearTimeout(timeout);
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onopen', self.url);
                }
                self.protocol = ws.protocol;
                self.readyState = WebSocket.OPEN;
                self.reconnectAttempts = 0;
                var e = generateEvent('open');
                e.isReconnect = reconnectAttempt;
                reconnectAttempt = false;
                eventTarget.dispatchEvent(e);
            };

            ws.onclose = function(event) {
                clearTimeout(timeout);
                ws = null;
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED;
                    eventTarget.dispatchEvent(generateEvent('close'));
                } else {
                    self.readyState = WebSocket.CONNECTING;
                    var e = generateEvent('connecting');
                    e.code = event.code;
                    e.reason = event.reason;
                    e.wasClean = event.wasClean;
                    eventTarget.dispatchEvent(e);
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || ReconnectingWebSocket.debugAll) {
                            console.debug('ReconnectingWebSocket', 'onclose', self.url);
                        }
                        eventTarget.dispatchEvent(generateEvent('close'));
                    }

                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
                    setTimeout(function() {
                        self.reconnectAttempts++;
                        self.open(true);
                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
                }
            };
            ws.onmessage = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
                }
                var e = generateEvent('message');
                e.data = event.data;
                eventTarget.dispatchEvent(e);
            };
            ws.onerror = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
                }
                eventTarget.dispatchEvent(generateEvent('error'));
            };
        }

        // Whether or not to create a websocket upon instantiation
        if (this.automaticOpen == true) {
            this.open(false);
        }

        /**
         * Transmits data to the server over the WebSocket connection.
         *
         * @param data a text string, ArrayBuffer or Blob to send to the server.
         */
        this.send = function(data) {
            if (ws) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'send', self.url, data);
                }
                return ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        };

        /**
         * Closes the WebSocket connection or connection attempt, if any.
         * If the connection is already CLOSED, this method does nothing.
         */
        this.close = function(code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code == 'undefined') {
                code = 1000;
            }
            forcedClose = true;
            if (ws) {
                ws.close(code, reason);
            }
        };

        /**
         * Additional public API method to refresh the connection if still open (close, re-open).
         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
         */
        this.refresh = function() {
            if (ws) {
                ws.close();
            }
        };
    }

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    ReconnectingWebSocket.prototype.onopen = function(event) {};
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    ReconnectingWebSocket.prototype.onclose = function(event) {};
    /** An event listener to be called when a connection begins being attempted. */
    ReconnectingWebSocket.prototype.onconnecting = function(event) {};
    /** An event listener to be called when a message is received from the server. */
    ReconnectingWebSocket.prototype.onmessage = function(event) {};
    /** An event listener to be called when an error occurs. */
    ReconnectingWebSocket.prototype.onerror = function(event) {};

    /**
     * Whether all instances of ReconnectingWebSocket should log debug messages.
     * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
     */
    ReconnectingWebSocket.debugAll = false;

    ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
    ReconnectingWebSocket.OPEN = WebSocket.OPEN;
    ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
    ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

    return ReconnectingWebSocket;
});


/***/ }),

/***/ "./src/components/Football/Football.tsx":
/*!**********************************************!*\
  !*** ./src/components/Football/Football.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(__webpack_require__(/*! react */ "react"));
var game_1 = __webpack_require__(/*! ./game */ "./src/components/Football/game.ts");
var reconnectingwebsocket_1 = __importDefault(__webpack_require__(/*! reconnectingwebsocket */ "./node_modules/reconnectingwebsocket/reconnecting-websocket.js"));
var utils_1 = __webpack_require__(/*! ../../utils/utils */ "./src/utils/utils.ts");
var react_table_1 = __importDefault(__webpack_require__(/*! react-table */ "react-table"));
var cellMoney = function (row) { return (React.createElement("div", { style: {
        width: '100%',
        fontStyle: 'italic',
        textAlign: 'right',
    } },
    row.value ? row.value : '',
    " ",
    row.value ? '$' : '')); };
var cellCoeff = function (row) { return (React.createElement("div", { style: {
        width: '100%',
        textAlign: 'right',
    } }, row.value ? row.value : '')); };
var columns = [
    {
        Header: '№',
        accessor: 'Order',
        width: 40,
    },
    {
        Header: 'Дома',
        accessor: 'home',
    },
    {
        Header: 'Счёт',
        accessor: 'Score',
        width: 70,
    },
    {
        Header: 'В гостях',
        accessor: 'away',
    },
    {
        Header: 'Чемпионат',
        accessor: 'competition',
        width: 200,
    },
    {
        Header: 'Страна',
        accessor: 'country',
        width: 120,
    },
    {
        Header: 'В паре',
        accessor: 'total_matched',
        Cell: cellMoney,
        width: 70,
    },
    {
        Header: 'Не в паре',
        accessor: 'total_available',
        Cell: cellMoney,
        width: 70,
    },
    {
        Header: 'П1+',
        accessor: 'win_back',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'П1-',
        accessor: 'win_lay',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'Н+',
        accessor: 'draw_back',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'Н-',
        accessor: 'draw_lay',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'П+',
        accessor: 'win_back',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'П2-',
        accessor: 'lose_back',
        Cell: cellCoeff,
        width: 70,
    },
    {
        Header: 'П2+',
        accessor: 'lose_lay',
        Cell: cellCoeff,
        width: 70,
    },
];
var Football = /** @class */ (function (_super) {
    __extends(Football, _super);
    function Football() {
        var _this = this;
        var x = {
            ws: new reconnectingwebsocket_1.default(utils_1.webSocketURL('/football'), [], {
                debug: true,
                automaticOpen: false,
            }),
            games: []
        };
        x.ws.onmessage = function (event) {
            _this.setState(function (prev) {
                return {
                    ws: prev.ws,
                    games: game_1.apply_games_changes(prev.games, new game_1.GamesChanges(JSON.parse(event.data))),
                };
            });
        };
        x.ws.open();
        _this = _super.call(this, x) || this;
        _this.state = x;
        return _this;
    }
    Football.prototype.render = function () {
        var border = 'solid 1px #bababa';
        return React.createElement(react_table_1.default, { className: '-striped', columns: columns, data: this.state.games, getTrProps: function (finalState, rowInfo, column, instance) {
                return {
                    style: {
                        background: (rowInfo && rowInfo.viewIndex % 2) ? "#e4e4e4" : undefined
                    }
                };
            }, getTdProps: function (finalState, rowInfo, column, instance) {
                return {
                    style: {
                        borderLeft: border,
                        borderRight: column && column.id === 'lose_lay' ? border : undefined,
                        borderTop: border,
                        borderBottom: rowInfo && (rowInfo.viewIndex === rowInfo.pageSize - 1) ? border : undefined,
                        padding: '2px 4px',
                    }
                };
            }, getTheadThProps: function (finalState, rowInfo, column, instance) {
                return {
                    style: {
                        borderTop: border,
                        borderLeft: border,
                        borderRight: column && column.id === 'lose_lay' ? 'solid 1px #bababa' : undefined,
                        padding: '2px 4px',
                    }
                };
            }, defaultPageSize: 20, pageSizeOptions: [20, 30, 40, 50, 100], 
            // Text
            previousText: 'Предыдущие', nextText: 'Следующие', loadingText: 'Загрузка данных...', noDataText: 'Нет футбольных игр!', pageText: 'Страница', ofText: 'из', rowsText: 'строк', onResizedChange: function (newResized) {
                console.log(newResized);
            } });
    };
    return Football;
}(React.Component));
exports.Football = Football;


/***/ }),

/***/ "./src/components/Football/game.ts":
/*!*****************************************!*\
  !*** ./src/components/Football/game.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var golang_typescriptify_helpers_1 = __webpack_require__(/*! ../../utils/golang_typescriptify_helpers */ "./src/utils/golang_typescriptify_helpers.ts");
// struct2ts:github.com/fpawel/betfairs/football/football2.Game
var Game = /** @class */ (function () {
    function Game(data) {
        var d = (data && typeof data === 'object') ? golang_typescriptify_helpers_1.ToObject(data) : {};
        this.id = ('id' in d) ? d.id : 0;
        this.order = ('order' in d) ? d.order : 0;
        this.home = ('home' in d) ? d.home : '';
        this.away = ('away' in d) ? d.away : '';
        this.score_home = ('score_home' in d) ? d.score_home : 0;
        this.score_away = ('score_away' in d) ? d.score_away : 0;
        this.in_play = ('in_play' in d) ? d.in_play : false;
        this.time = ('time' in d) ? d.time : '';
        this.competition = ('competition' in d) ? d.competition : '';
        this.country = ('country' in d) ? d.country : '';
        this.open_date = ('open_date' in d) ? golang_typescriptify_helpers_1.ParseDate(d.open_date) : new Date();
        this.win_back = ('win_back' in d) ? d.win_back : 0;
        this.win_lay = ('win_lay' in d) ? d.win_lay : 0;
        this.lose_back = ('lose_back' in d) ? d.lose_back : 0;
        this.lose_lay = ('lose_lay' in d) ? d.lose_lay : 0;
        this.draw_back = ('draw_back' in d) ? d.draw_back : 0;
        this.draw_lay = ('draw_lay' in d) ? d.draw_lay : 0;
        this.total_matched = ('total_matched' in d) ? d.total_matched : 0;
        this.total_available = ('total_available' in d) ? d.total_available : 0;
        this.error = ('error' in d) ? d.error : '';
    }
    Object.defineProperty(Game.prototype, "Score", {
        get: function () {
            return this.in_play ? this.score_home + " - " + this.score_away : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "Order", {
        get: function () {
            return this.order + 1;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.toObject = function () {
        var cfg = {};
        cfg.id = 'number';
        cfg.order = 'number';
        cfg.score_home = 'number';
        cfg.score_away = 'number';
        cfg.open_date = 'string';
        cfg.win_back = 'number';
        cfg.win_lay = 'number';
        cfg.lose_back = 'number';
        cfg.lose_lay = 'number';
        cfg.draw_back = 'number';
        cfg.draw_lay = 'number';
        cfg.total_matched = 'number';
        cfg.total_available = 'number';
        return golang_typescriptify_helpers_1.ToObject(this, cfg);
    };
    Game.prototype.applyGameChanges = function (a) {
        if (a.order)
            this.order = a.order;
        if (a.score_home)
            this.score_home = a.score_home;
        if (a.score_away)
            this.score_away = a.score_away;
        if (a.in_play)
            this.in_play = a.in_play;
        if (a.time)
            this.time = a.time;
        if (a.competition)
            this.competition = a.competition;
        if (a.country)
            this.country = a.country;
        if (a.win_back)
            this.win_back = a.win_back;
        if (a.win_lay)
            this.win_lay = a.win_lay;
        if (a.draw_back)
            this.draw_back = a.draw_back;
        if (a.draw_lay)
            this.draw_lay = a.draw_lay;
        if (a.lose_back)
            this.lose_back = a.lose_back;
        if (a.lose_lay)
            this.lose_lay = a.lose_lay;
        if (a.total_matched)
            this.total_matched = a.total_matched;
        if (a.total_available)
            this.total_available = a.total_available;
        if (a.error)
            this.error = a.error;
    };
    ;
    return Game;
}());
exports.Game = Game;
// struct2ts:github.com/fpawel/betfairs/football/football2.GameChanges
var GameChanges = /** @class */ (function () {
    function GameChanges(data) {
        var d = (data && typeof data === 'object') ? golang_typescriptify_helpers_1.ToObject(data) : {};
        this.id = ('id' in d) ? d.id : 0;
        this.order = ('order' in d) ? d.order : null;
        this.score_home = ('score_home' in d) ? d.score_home : null;
        this.score_away = ('score_away' in d) ? d.score_away : null;
        this.in_play = ('in_play' in d) ? d.in_play : null;
        this.time = ('time' in d) ? d.time : null;
        this.competition = ('competition' in d) ? d.competition : null;
        this.country = ('country' in d) ? d.country : null;
        this.win_back = ('win_back' in d) ? d.win_back : null;
        this.win_lay = ('win_lay' in d) ? d.win_lay : null;
        this.draw_lay = ('draw_lay' in d) ? d.draw_lay : null;
        this.draw_back = ('draw_back' in d) ? d.draw_back : null;
        this.lose_lay = ('lose_lay' in d) ? d.lose_lay : null;
        this.lose_back = ('lose_back' in d) ? d.lose_back : null;
        this.total_matched = ('total_matched' in d) ? d.total_matched : null;
        this.total_available = ('total_available' in d) ? d.total_available : null;
        this.error = ('error' in d) ? d.error : null;
    }
    GameChanges.prototype.toObject = function () {
        var cfg = {};
        cfg.id = 'number';
        cfg.order = 'number';
        cfg.score_home = 'number';
        cfg.score_away = 'number';
        cfg.win_back = 'number';
        cfg.win_lay = 'number';
        cfg.draw_lay = 'number';
        cfg.draw_back = 'number';
        cfg.lose_lay = 'number';
        cfg.lose_back = 'number';
        cfg.total_matched = 'number';
        cfg.total_available = 'number';
        return golang_typescriptify_helpers_1.ToObject(this, cfg);
    };
    return GameChanges;
}());
exports.GameChanges = GameChanges;
// struct2ts:github.com/fpawel/betfairs/football/football2.GamesChanges
var GamesChanges = /** @class */ (function () {
    function GamesChanges(data) {
        var d = (data && typeof data === 'object') ? golang_typescriptify_helpers_1.ToObject(data) : {};
        this.reset = ('reset' in d) ? d.reset : false;
        this.new = Array.isArray(d.new) ? d.new.map(function (v) { return new Game(v); }) : [];
        this.out = ('out' in d) ? d.out : [];
        this.upd = Array.isArray(d.upd) ? d.upd.map(function (v) { return new GameChanges(v); }) : [];
    }
    GamesChanges.prototype.toObject = function () {
        var cfg = {};
        return golang_typescriptify_helpers_1.ToObject(this, cfg);
    };
    return GamesChanges;
}());
exports.GamesChanges = GamesChanges;
function apply_games_changes(games, gamesChanges) {
    var u = getGamesChanges(gamesChanges);
    var nextGames = gamesChanges.new;
    games.filter(function (game) {
        return !(u.out.has(game.id) || u.new.has(game.id));
    }).map(function (game) {
        var gameChanges = u.upd.get(game.id);
        if (gameChanges) {
            game.applyGameChanges(gameChanges);
        }
        return game;
    }).forEach(function (game) { return nextGames.push(game); });
    nextGames.sort(function (x, y) { return x.order - y.order; });
    var id_game = new Map();
    for (var _i = 0, nextGames_1 = nextGames; _i < nextGames_1.length; _i++) {
        var x = nextGames_1[_i];
        var y = id_game.get(x.id);
        if (y) {
            var formatGame = function (x) { return "$" + x.order + " " + x.home + " " + x.away; };
            throw ("Assert unique game id: " + formatGame(x) + " and " + formatGame(y));
        }
        id_game.set(x.id, x);
    }
    return nextGames;
}
exports.apply_games_changes = apply_games_changes;
function getGamesChanges(x) {
    var r = {
        out: new Set(),
        new: new Map(),
        upd: new Map(),
    };
    if (x.out) {
        for (var _i = 0, _a = x.out; _i < _a.length; _i++) {
            var value = _a[_i];
            r.out.add(value);
        }
    }
    if (x.new) {
        for (var _b = 0, _c = x.new; _b < _c.length; _b++) {
            var value = _c[_b];
            r.new.set(value.id, value);
        }
    }
    if (x.upd) {
        for (var _d = 0, _e = x.upd; _d < _e.length; _d++) {
            var value = _e[_d];
            r.upd.set(value.id, value);
        }
    }
    return r;
}


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(__webpack_require__(/*! react */ "react"));
var ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "react-dom"));
var Football_1 = __webpack_require__(/*! ./components/Football/Football */ "./src/components/Football/Football.tsx");
ReactDOM.render(React.createElement(Football_1.Football, null), document.getElementById("app"));


/***/ }),

/***/ "./src/utils/golang_typescriptify_helpers.ts":
/*!***************************************************!*\
  !*** ./src/utils/golang_typescriptify_helpers.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// helpers
var maxUnixTSInSeconds = 9999999999;
exports.maxUnixTSInSeconds = maxUnixTSInSeconds;
function ParseDate(d) {
    if (d instanceof Date)
        return d;
    if (typeof d === 'number') {
        if (d > maxUnixTSInSeconds)
            return new Date(d);
        return new Date(d * 1000); // go ts
    }
    return new Date(d);
}
exports.ParseDate = ParseDate;
function ParseNumber(v, isInt) {
    if (isInt === void 0) { isInt = false; }
    if (!v)
        return 0;
    if (typeof v === 'number')
        return v;
    return (isInt ? parseInt(v) : parseFloat(v)) || 0;
}
exports.ParseNumber = ParseNumber;
function FromArray(Ctor, data, def) {
    if (def === void 0) { def = null; }
    if (!data || !Object.keys(data).length)
        return def;
    var d = Array.isArray(data) ? data : [data];
    return d.map(function (v) { return new Ctor(v); });
}
exports.FromArray = FromArray;
function ToObject(o, typeOrCfg, child) {
    if (typeOrCfg === void 0) { typeOrCfg = {}; }
    if (child === void 0) { child = false; }
    if (!o)
        return null;
    if (typeof o.toObject === 'function' && child)
        return o.toObject();
    switch (typeof o) {
        case 'string':
            return typeOrCfg === 'number' ? ParseNumber(o) : o;
        case 'boolean':
        case 'number':
            return o;
    }
    if (o instanceof Date) {
        return typeOrCfg === 'string' ? o.toISOString() : Math.floor(o.getTime() / 1000);
    }
    if (Array.isArray(o))
        return o.map(function (v) { return ToObject(v, typeOrCfg, true); });
    var d = {};
    for (var _i = 0, _a = Object.keys(o); _i < _a.length; _i++) {
        var k = _a[_i];
        var v = o[k];
        if (!v)
            continue;
        d[k] = ToObject(v, typeOrCfg[k] || {}, true);
    }
    return d;
}
exports.ToObject = ToObject;
//import {maxUnixTSInSeconds, ParseDate, ParseNumber, FromArray, ToObject} from "./golang_typescriptify_helpers";


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function webSocketURL(uri) {
    var proto = document.location.protocol.replace("http", "ws");
    return proto + "//" + document.location.host + uri;
}
exports.webSocketURL = webSocketURL;


/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.tsx */"./src/index.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ "react-table":
/*!*****************************!*\
  !*** external "ReactTable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactTable;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map