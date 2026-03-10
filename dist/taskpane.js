"use strict";
(self["webpackChunkoffice_addin_taskpane_react"] = self["webpackChunkoffice_addin_taskpane_react"] || []).push([["taskpane"], {

/***/ "./src/taskpane/services/api.ts":
/*!**************************************!*\
  !*** ./src/taskpane/services/api.ts ***!
  \**************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activateMeeting: function () { return /* binding */ activateMeeting; },
/* harmony export */   validateMapping: function () { return /* binding */ validateMapping; }
        /* harmony export */
      });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/taskpane/services/config.ts");
/* provided dependency */ var Promise = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js")["Promise"];
      var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = undefined && undefined.__generator || function (thisArg, body) {
        var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
          f,
          y,
          t,
          g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;
        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      };

      function validateMapping(projectName, sampleTask) {
        return __awaiter(this, void 0, void 0, function () {
          var resp, data;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, fetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.CONECTADO_BASE_URL, "/api/v1/validate_mapping"), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    project_name: projectName,
                    sample_task: sampleTask
                  })
                })];
              case 1:
                resp = _a.sent();
                return [4 /*yield*/, resp.json()];
              case 2:
                data = _a.sent();
                return [2 /*return*/, data];
              // { valid: bool, errors: [] }
            }
          });
        });
      }
      function activateMeeting(params) {
        return __awaiter(this, void 0, void 0, function () {
          var form, resp, data;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                form = new FormData();
                form.append("meeting_name", params.meetingName);
                form.append("meeting_date", params.meetingDate);
                form.append("meeting_project", params.meetingProject);
                form.append("sample_task", params.sampleTask);
                return [4 /*yield*/, fetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.CONECTADO_BASE_URL, "/api/v1/activate_meeting"), {
                  method: "POST",
                  body: form
                })];
              case 1:
                resp = _a.sent();
                return [4 /*yield*/, resp.json()];
              case 2:
                data = _a.sent();
                if (!resp.ok || !data.success) {
                  throw new Error(Array.isArray(data.detail) ? data.detail.join(", ") : data.detail || data.message || "Activation failed");
                }
                return [2 /*return*/];
            }
          });
        });
      }

      /***/
    }),

/***/ "./src/taskpane/services/config.ts":
/*!*****************************************!*\
  !*** ./src/taskpane/services/config.ts ***!
  \*****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG: function () { return /* binding */ CONFIG; }
        /* harmony export */
      });
      // ─── Central configuration ───────────────────────────────────────────────────
      // Update CONECTADO_BASE_URL to the URL where your FastAPI backend is running.
      // Update MSAL_CLIENT_ID from your Azure App Registration.
      var CONFIG = {
        CONECTADO_BASE_URL: "http://localhost:8000",
        MSAL_CLIENT_ID: "3f3d5015-ea26-4d93-8dfd-0fbf5e9109d3",
        // Azure AD App Registration → Application (client) ID
        MSAL_TENANT_ID: "9ec212c2-2f63-4e82-a59a-5e479388ba2a",
        // 'common' for multi-tenant; replace with your tenant ID if needed
        ONEDRIVE_FILE_PATH: "projects_mapping.json"
      };

      /***/
    }),

/***/ "./src/taskpane/services/graph.ts":
/*!****************************************!*\
  !*** ./src/taskpane/services/graph.ts ***!
  \****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initMsal: function () { return /* binding */ initMsal; },
/* harmony export */   loadMappingFromOneDrive: function () { return /* binding */ loadMappingFromOneDrive; },
/* harmony export */   saveMappingToOneDrive: function () { return /* binding */ saveMappingToOneDrive; }
        /* harmony export */
      });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/taskpane/services/config.ts");
/* provided dependency */ var Promise = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js")["Promise"];
      var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = undefined && undefined.__generator || function (thisArg, body) {
        var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
          f,
          y,
          t,
          g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;
        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      };
      /* eslint-disable @typescript-eslint/no-explicit-any */

      // ─── MSAL setup ──────────────────────────────────────────────────────────────
      var msalApp = null;
      var graphToken = null;
      var GRAPH_BASE = "https://graph.microsoft.com/v1.0";
      function initMsal() {
        // @ts-ignore – msal is loaded from CDN
        if (typeof msal === "undefined") return;
        // @ts-ignore
        msalApp = new msal.PublicClientApplication({
          auth: {
            clientId: _config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.MSAL_CLIENT_ID,
            authority: "https://login.microsoftonline.com/".concat(_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.MSAL_TENANT_ID),
            redirectUri: window.location.origin + window.location.pathname
          },
          cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false
          }
        });
      }
      function acquireGraphToken() {
        return __awaiter(this, void 0, void 0, function () {
          var scopes, accounts, request, resp, _a, resp, e_1, msg;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (!msalApp) return [2 /*return*/, null];
                scopes = ["Files.ReadWrite.AppFolder", "openid", "profile"];
                accounts = msalApp.getAllAccounts();
                request = {
                  scopes: scopes,
                  account: accounts[0] || undefined
                };
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, , 8]);
                return [4 /*yield*/, msalApp.acquireTokenSilent(request)];
              case 2:
                resp = _b.sent();
                return [2 /*return*/, resp.accessToken];
              case 3:
                _a = _b.sent();
                _b.label = 4;
              case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, msalApp.acquireTokenPopup({
                  scopes: scopes
                })];
              case 5:
                resp = _b.sent();
                return [2 /*return*/, resp.accessToken];
              case 6:
                e_1 = _b.sent();
                msg = e_1 instanceof Error ? e_1.message : String(e_1);
                console.warn("Could not obtain MS Graph token:", msg);
                return [2 /*return*/, null];
              case 7:
                return [3 /*break*/, 8];
              case 8:
                return [2 /*return*/];
            }
          });
        });
      }
      // ─── OneDrive helpers (App Folder) ───────────────────────────────────────────
      // Files are stored in: OneDrive › Apps › <your-app-name>
      // Path: /me/drive/special/approot
      function loadMappingFromOneDrive() {
        return __awaiter(this, void 0, void 0, function () {
          var url, resp, e_2, msg;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, acquireGraphToken()];
              case 1:
                graphToken = _a.sent();
                if (!graphToken) return [2 /*return*/, []]; // graceful fallback – no OneDrive access
                _a.label = 2;
              case 2:
                _a.trys.push([2, 5, , 6]);
                url = "".concat(GRAPH_BASE, "/me/drive/special/approot:/").concat(_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.ONEDRIVE_FILE_PATH, ":/content");
                return [4 /*yield*/, fetch(url, {
                  headers: {
                    Authorization: "Bearer ".concat(graphToken)
                  }
                })];
              case 3:
                resp = _a.sent();
                if (resp.status === 404) return [2 /*return*/, []];
                if (!resp.ok) throw new Error("Load mapping: ".concat(resp.status));
                return [4 /*yield*/, resp.json()];
              case 4:
                return [2 /*return*/, _a.sent()];
              case 5:
                e_2 = _a.sent();
                msg = e_2 instanceof Error ? e_2.message : String(e_2);
                console.warn("loadMappingFromOneDrive:", msg);
                return [2 /*return*/, []];
              case 6:
                return [2 /*return*/];
            }
          });
        });
      }
      function saveMappingToOneDrive(rules) {
        return __awaiter(this, void 0, void 0, function () {
          var url, resp, err;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!!graphToken) return [3 /*break*/, 2];
                return [4 /*yield*/, acquireGraphToken()];
              case 1:
                graphToken = _a.sent();
                if (!graphToken) throw new Error("No Microsoft Graph token — cannot save to OneDrive");
                _a.label = 2;
              case 2:
                url = "".concat(GRAPH_BASE, "/me/drive/special/approot:/").concat(_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.ONEDRIVE_FILE_PATH, ":/content");
                return [4 /*yield*/, fetch(url, {
                  method: "PUT",
                  headers: {
                    Authorization: "Bearer ".concat(graphToken),
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(rules, null, 2)
                })];
              case 3:
                resp = _a.sent();
                if (!!resp.ok) return [3 /*break*/, 5];
                return [4 /*yield*/, resp.text()];
              case 4:
                err = _a.sent();
                throw new Error("Save mapping: ".concat(resp.status, " \u2014 ").concat(err));
              case 5:
                return [2 /*return*/];
            }
          });
        });
      }

      /***/
    }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/taskpane/components/App.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/taskpane/components/App.css ***!
  \*******************************************************************************/
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
      // Imports


      var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
      ___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap);"]);
      // Module
      ___CSS_LOADER_EXPORT___.push([module.id, "/* ============================================================\r\n   CONECTADO OUTLOOK ADD-IN — App.css\r\n   Premium dark UI with glassmorphism accents\r\n   ============================================================ */\r\n\r\n/* ── Reset & Base ─────────────────────────────────────────── */\r\n*,\r\n*::before,\r\n*::after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n:root {\r\n    --bg-base: #0f1117;\r\n    --bg-card: #1a1d27;\r\n    --bg-card-hover: #1f2235;\r\n    --bg-input: #13151f;\r\n    --bg-form: #1c1f2e;\r\n\r\n    --accent: #6366f1;\r\n    /* indigo */\r\n    --accent-hover: #4f52d9;\r\n    --accent-glow: rgba(99, 102, 241, .25);\r\n\r\n    --success: #10b981;\r\n    --success-bg: rgba(16, 185, 129, .12);\r\n    --warning: #f59e0b;\r\n    --warning-bg: rgba(245, 158, 11, .12);\r\n    --error: #ef4444;\r\n    --error-bg: rgba(239, 68, 68, .12);\r\n\r\n    --text-primary: #f1f5f9;\r\n    --text-secondary: #8892a4;\r\n    --text-muted: #505a6e;\r\n\r\n    --border: rgba(255, 255, 255, .07);\r\n    --border-focus: rgba(99, 102, 241, .6);\r\n\r\n    --radius: 10px;\r\n    --radius-sm: 6px;\r\n    --radius-lg: 14px;\r\n\r\n    --transition: .15s ease;\r\n    --shadow: 0 4px 24px rgba(0, 0, 0, .4);\r\n}\r\n\r\nhtml,\r\nbody,\r\n#container {\r\n    height: 100%;\r\n    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\r\n    font-size: 13px;\r\n    color: var(--text-primary);\r\n    background: var(--bg-base);\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n/* ── App root ─────────────────────────────────────────────── */\r\n.app-root {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n    overflow: hidden;\r\n}\r\n\r\n/* ── App Header ──────────────────────────────────────────── */\r\n.app-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 10px 16px;\r\n    background: var(--bg-card);\r\n    border-bottom: 1px solid var(--border);\r\n    flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n\r\n.logo-dot {\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius: 50%;\r\n    background: linear-gradient(135deg, var(--accent), #8b5cf6);\r\n    box-shadow: 0 0 8px var(--accent-glow);\r\n}\r\n\r\n.header-title {\r\n    font-size: 14px;\r\n    font-weight: 700;\r\n    letter-spacing: -.3px;\r\n}\r\n\r\n/* ── Tab Bar ─────────────────────────────────────────────── */\r\n.tab-bar {\r\n    display: flex;\r\n    border-bottom: 1px solid var(--border);\r\n    background: var(--bg-card);\r\n    flex-shrink: 0;\r\n}\r\n\r\n.tab {\r\n    flex: 1;\r\n    background: none;\r\n    border: none;\r\n    padding: 10px 0;\r\n    font-size: 12.5px;\r\n    font-weight: 500;\r\n    font-family: inherit;\r\n    color: var(--text-secondary);\r\n    cursor: pointer;\r\n    position: relative;\r\n    transition: color var(--transition);\r\n}\r\n\r\n.tab::after {\r\n    content: '';\r\n    position: absolute;\r\n    bottom: -1px;\r\n    left: 20%;\r\n    right: 20%;\r\n    height: 2px;\r\n    border-radius: 2px 2px 0 0;\r\n    background: var(--accent);\r\n    transform: scaleX(0);\r\n    transition: transform .2s ease;\r\n}\r\n\r\n.tab.active {\r\n    color: var(--text-primary);\r\n}\r\n\r\n.tab.active::after {\r\n    transform: scaleX(1);\r\n}\r\n\r\n/* ── Tab Content Area ────────────────────────────────────── */\r\n.tab-content-area {\r\n    flex: 1;\r\n    overflow-y: auto;\r\n}\r\n\r\n/* ── Tab Panel ───────────────────────────────────────────── */\r\n.tab-panel {\r\n    padding: 14px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n}\r\n\r\n/* ── Card ────────────────────────────────────────────────── */\r\n.card {\r\n    background: var(--bg-card);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius);\r\n    padding: 16px;\r\n}\r\n\r\n/* ── Forms ───────────────────────────────────────────────── */\r\n.form-group {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    width: 100%;\r\n    margin-bottom: 14px;\r\n}\r\n\r\nlabel {\r\n    font-size: 11.5px;\r\n    font-weight: 500;\r\n    color: var(--text-secondary);\r\n    letter-spacing: .2px;\r\n}\r\n\r\ninput[type=\"text\"],\r\ninput[type=\"date\"] {\r\n    width: 100%;\r\n    background: var(--bg-input);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius-sm);\r\n    padding: 9px 12px;\r\n    color: var(--text-primary);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    outline: none;\r\n    transition: border-color var(--transition), box-shadow var(--transition);\r\n}\r\n\r\ninput:focus {\r\n    border-color: var(--border-focus);\r\n    box-shadow: 0 0 0 3px var(--accent-glow);\r\n}\r\n\r\ninput::placeholder {\r\n    color: var(--text-muted);\r\n}\r\n\r\ninput[type=\"date\"]::-webkit-calendar-picker-indicator {\r\n    filter: invert(.5);\r\n}\r\n\r\n/* ── Buttons ─────────────────────────────────────────────── */\r\n.btn {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 6px;\r\n    padding: 9px 16px;\r\n    border-radius: var(--radius-sm);\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n    border: none;\r\n    outline: none;\r\n    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);\r\n}\r\n\r\n.btn:active {\r\n    transform: scale(.98);\r\n}\r\n\r\n.btn:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.btn-primary {\r\n    background: linear-gradient(135deg, var(--accent), #7c3aed);\r\n    color: #fff;\r\n    box-shadow: 0 2px 12px var(--accent-glow);\r\n}\r\n\r\n.btn-primary:hover:not(:disabled) {\r\n    background: linear-gradient(135deg, var(--accent-hover), #6d28d9);\r\n}\r\n\r\n.btn-ghost {\r\n    background: transparent;\r\n    color: var(--text-secondary);\r\n    border: 1px solid var(--border);\r\n}\r\n\r\n.btn-ghost:hover {\r\n    background: var(--bg-card-hover);\r\n    color: var(--text-primary);\r\n}\r\n\r\n.btn-accent {\r\n    background: transparent;\r\n    color: var(--accent);\r\n    border: 1px solid rgba(99, 102, 241, .4);\r\n    padding: 6px 12px;\r\n}\r\n\r\n.btn-accent:hover {\r\n    background: var(--accent-glow);\r\n}\r\n\r\n.btn-sm {\r\n    font-size: 12px;\r\n    padding: 5px 10px;\r\n    border-radius: var(--radius-sm);\r\n}\r\n\r\n.btn-full {\r\n    width: 100%;\r\n    margin-top: 4px;\r\n}\r\n\r\n/* Icon buttons */\r\n.btn-icon-sm {\r\n    background: none;\r\n    border: none;\r\n    color: var(--text-muted);\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n    line-height: 1;\r\n    padding: 2px 5px;\r\n    border-radius: 4px;\r\n}\r\n\r\n.btn-icon-sm:hover {\r\n    color: var(--text-primary);\r\n    background: var(--bg-card-hover);\r\n}\r\n\r\n/* Spinner */\r\n.btn-spinner {\r\n    display: inline-block;\r\n    width: 14px;\r\n    height: 14px;\r\n    border: 2px solid rgba(255, 255, 255, .3);\r\n    border-top-color: #fff;\r\n    border-radius: 50%;\r\n    animation: spin .7s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n    to {\r\n        transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n/* ── Alerts ─────────────────────────────────────────────── */\r\n.alert {\r\n    border-radius: var(--radius-sm);\r\n    padding: 9px 12px;\r\n    font-size: 12px;\r\n    line-height: 1.5;\r\n    margin-top: 10px;\r\n    border: 1px solid transparent;\r\n}\r\n\r\n.alert-error {\r\n    background: var(--error-bg);\r\n    color: var(--error);\r\n    border-color: rgba(239, 68, 68, .25);\r\n}\r\n\r\n.alert-success {\r\n    background: var(--success-bg);\r\n    color: var(--success);\r\n    border-color: rgba(16, 185, 129, .25);\r\n}\r\n\r\n.alert-warning {\r\n    background: var(--warning-bg);\r\n    color: var(--warning);\r\n    border-color: rgba(245, 158, 11, .25);\r\n}\r\n\r\n.alert-info {\r\n    background: var(--accent-glow);\r\n    color: var(--accent);\r\n    border-color: rgba(99, 102, 241, .25);\r\n}\r\n\r\n/* ── Mapping Preview ─────────────────────────────────────── */\r\n.mapping-preview {\r\n    background: var(--bg-input);\r\n    border: 1px solid rgba(99, 102, 241, .3);\r\n    border-radius: var(--radius-sm);\r\n    padding: 10px 12px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.preview-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 3px 0;\r\n}\r\n\r\n.preview-label {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: var(--accent);\r\n    min-width: 44px;\r\n}\r\n\r\n.preview-value {\r\n    font-size: 12px;\r\n    color: var(--text-primary);\r\n}\r\n\r\n/* ── Mapping Panel Toolbar ───────────────────────────────── */\r\n.panel-toolbar {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.panel-count {\r\n    font-size: 12px;\r\n    color: var(--text-muted);\r\n}\r\n\r\n/* ── Rules List ──────────────────────────────────────────── */\r\n.rules-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.empty-state {\r\n    text-align: center;\r\n    color: var(--text-muted);\r\n    font-size: 12px;\r\n    padding: 32px 0;\r\n    line-height: 1.6;\r\n}\r\n\r\n.rule-card {\r\n    background: var(--bg-card);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius);\r\n    padding: 12px 14px;\r\n    transition: border-color var(--transition), background var(--transition);\r\n    position: relative;\r\n}\r\n\r\n.rule-card:hover {\r\n    background: var(--bg-card-hover);\r\n    border-color: rgba(255, 255, 255, .12);\r\n}\r\n\r\n.rule-subject {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    color: var(--text-primary);\r\n    margin-bottom: 5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.rule-meta {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 2px;\r\n}\r\n\r\n.rule-meta-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    font-size: 11px;\r\n    color: var(--text-secondary);\r\n}\r\n\r\n.rule-meta-label {\r\n    font-weight: 600;\r\n    color: var(--text-muted);\r\n    min-width: 38px;\r\n    font-size: 10.5px;\r\n    text-transform: uppercase;\r\n    letter-spacing: .4px;\r\n}\r\n\r\n.rule-actions {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    display: flex;\r\n    gap: 4px;\r\n    opacity: 0;\r\n    transition: opacity var(--transition);\r\n}\r\n\r\n.rule-card:hover .rule-actions {\r\n    opacity: 1;\r\n}\r\n\r\n.rule-action-btn {\r\n    background: var(--bg-base);\r\n    border: 1px solid var(--border);\r\n    border-radius: 5px;\r\n    padding: 3px 7px;\r\n    font-size: 11px;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n    color: var(--text-secondary);\r\n    transition: color var(--transition), border-color var(--transition);\r\n}\r\n\r\n.rule-action-btn.edit:hover {\r\n    color: var(--accent);\r\n    border-color: var(--accent);\r\n}\r\n\r\n.rule-action-btn.delete:hover {\r\n    color: var(--error);\r\n    border-color: var(--error);\r\n}\r\n\r\n/* ── Rule Form ───────────────────────────────────────────── */\r\n.rule-form {\r\n    background: var(--bg-form);\r\n    border: 1px solid rgba(99, 102, 241, .3);\r\n    border-radius: var(--radius);\r\n    padding: 14px;\r\n    margin-top: 4px;\r\n    animation: slideDown .2s ease;\r\n}\r\n\r\n@keyframes slideDown {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(-6px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n.rule-form .form-group {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.rule-form-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 14px;\r\n}\r\n\r\n.rule-form-header span {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n}\r\n\r\n.form-actions {\r\n    display: flex;\r\n    gap: 8px;\r\n    justify-content: flex-end;\r\n    margin-top: 4px;\r\n}\r\n\r\n/* ── Scrollbar ───────────────────────────────────────────── */\r\n::-webkit-scrollbar {\r\n    width: 5px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n    background: transparent;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n    background: var(--bg-card-hover);\r\n    border-radius: 3px;\r\n}", "", { "version": 3, "sources": ["webpack://./src/taskpane/components/App.css"], "names": [], "mappings": "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", "sourcesContent": ["/* ============================================================\r\n   CONECTADO OUTLOOK ADD-IN — App.css\r\n   Premium dark UI with glassmorphism accents\r\n   ============================================================ */\r\n\r\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');\r\n\r\n/* ── Reset & Base ─────────────────────────────────────────── */\r\n*,\r\n*::before,\r\n*::after {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n:root {\r\n    --bg-base: #0f1117;\r\n    --bg-card: #1a1d27;\r\n    --bg-card-hover: #1f2235;\r\n    --bg-input: #13151f;\r\n    --bg-form: #1c1f2e;\r\n\r\n    --accent: #6366f1;\r\n    /* indigo */\r\n    --accent-hover: #4f52d9;\r\n    --accent-glow: rgba(99, 102, 241, .25);\r\n\r\n    --success: #10b981;\r\n    --success-bg: rgba(16, 185, 129, .12);\r\n    --warning: #f59e0b;\r\n    --warning-bg: rgba(245, 158, 11, .12);\r\n    --error: #ef4444;\r\n    --error-bg: rgba(239, 68, 68, .12);\r\n\r\n    --text-primary: #f1f5f9;\r\n    --text-secondary: #8892a4;\r\n    --text-muted: #505a6e;\r\n\r\n    --border: rgba(255, 255, 255, .07);\r\n    --border-focus: rgba(99, 102, 241, .6);\r\n\r\n    --radius: 10px;\r\n    --radius-sm: 6px;\r\n    --radius-lg: 14px;\r\n\r\n    --transition: .15s ease;\r\n    --shadow: 0 4px 24px rgba(0, 0, 0, .4);\r\n}\r\n\r\nhtml,\r\nbody,\r\n#container {\r\n    height: 100%;\r\n    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\r\n    font-size: 13px;\r\n    color: var(--text-primary);\r\n    background: var(--bg-base);\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n/* ── App root ─────────────────────────────────────────────── */\r\n.app-root {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n    overflow: hidden;\r\n}\r\n\r\n/* ── App Header ──────────────────────────────────────────── */\r\n.app-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 10px 16px;\r\n    background: var(--bg-card);\r\n    border-bottom: 1px solid var(--border);\r\n    flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n\r\n.logo-dot {\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius: 50%;\r\n    background: linear-gradient(135deg, var(--accent), #8b5cf6);\r\n    box-shadow: 0 0 8px var(--accent-glow);\r\n}\r\n\r\n.header-title {\r\n    font-size: 14px;\r\n    font-weight: 700;\r\n    letter-spacing: -.3px;\r\n}\r\n\r\n/* ── Tab Bar ─────────────────────────────────────────────── */\r\n.tab-bar {\r\n    display: flex;\r\n    border-bottom: 1px solid var(--border);\r\n    background: var(--bg-card);\r\n    flex-shrink: 0;\r\n}\r\n\r\n.tab {\r\n    flex: 1;\r\n    background: none;\r\n    border: none;\r\n    padding: 10px 0;\r\n    font-size: 12.5px;\r\n    font-weight: 500;\r\n    font-family: inherit;\r\n    color: var(--text-secondary);\r\n    cursor: pointer;\r\n    position: relative;\r\n    transition: color var(--transition);\r\n}\r\n\r\n.tab::after {\r\n    content: '';\r\n    position: absolute;\r\n    bottom: -1px;\r\n    left: 20%;\r\n    right: 20%;\r\n    height: 2px;\r\n    border-radius: 2px 2px 0 0;\r\n    background: var(--accent);\r\n    transform: scaleX(0);\r\n    transition: transform .2s ease;\r\n}\r\n\r\n.tab.active {\r\n    color: var(--text-primary);\r\n}\r\n\r\n.tab.active::after {\r\n    transform: scaleX(1);\r\n}\r\n\r\n/* ── Tab Content Area ────────────────────────────────────── */\r\n.tab-content-area {\r\n    flex: 1;\r\n    overflow-y: auto;\r\n}\r\n\r\n/* ── Tab Panel ───────────────────────────────────────────── */\r\n.tab-panel {\r\n    padding: 14px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n}\r\n\r\n/* ── Card ────────────────────────────────────────────────── */\r\n.card {\r\n    background: var(--bg-card);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius);\r\n    padding: 16px;\r\n}\r\n\r\n/* ── Forms ───────────────────────────────────────────────── */\r\n.form-group {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    width: 100%;\r\n    margin-bottom: 14px;\r\n}\r\n\r\nlabel {\r\n    font-size: 11.5px;\r\n    font-weight: 500;\r\n    color: var(--text-secondary);\r\n    letter-spacing: .2px;\r\n}\r\n\r\ninput[type=\"text\"],\r\ninput[type=\"date\"] {\r\n    width: 100%;\r\n    background: var(--bg-input);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius-sm);\r\n    padding: 9px 12px;\r\n    color: var(--text-primary);\r\n    font-size: 13px;\r\n    font-family: inherit;\r\n    outline: none;\r\n    transition: border-color var(--transition), box-shadow var(--transition);\r\n}\r\n\r\ninput:focus {\r\n    border-color: var(--border-focus);\r\n    box-shadow: 0 0 0 3px var(--accent-glow);\r\n}\r\n\r\ninput::placeholder {\r\n    color: var(--text-muted);\r\n}\r\n\r\ninput[type=\"date\"]::-webkit-calendar-picker-indicator {\r\n    filter: invert(.5);\r\n}\r\n\r\n/* ── Buttons ─────────────────────────────────────────────── */\r\n.btn {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 6px;\r\n    padding: 9px 16px;\r\n    border-radius: var(--radius-sm);\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n    border: none;\r\n    outline: none;\r\n    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);\r\n}\r\n\r\n.btn:active {\r\n    transform: scale(.98);\r\n}\r\n\r\n.btn:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.btn-primary {\r\n    background: linear-gradient(135deg, var(--accent), #7c3aed);\r\n    color: #fff;\r\n    box-shadow: 0 2px 12px var(--accent-glow);\r\n}\r\n\r\n.btn-primary:hover:not(:disabled) {\r\n    background: linear-gradient(135deg, var(--accent-hover), #6d28d9);\r\n}\r\n\r\n.btn-ghost {\r\n    background: transparent;\r\n    color: var(--text-secondary);\r\n    border: 1px solid var(--border);\r\n}\r\n\r\n.btn-ghost:hover {\r\n    background: var(--bg-card-hover);\r\n    color: var(--text-primary);\r\n}\r\n\r\n.btn-accent {\r\n    background: transparent;\r\n    color: var(--accent);\r\n    border: 1px solid rgba(99, 102, 241, .4);\r\n    padding: 6px 12px;\r\n}\r\n\r\n.btn-accent:hover {\r\n    background: var(--accent-glow);\r\n}\r\n\r\n.btn-sm {\r\n    font-size: 12px;\r\n    padding: 5px 10px;\r\n    border-radius: var(--radius-sm);\r\n}\r\n\r\n.btn-full {\r\n    width: 100%;\r\n    margin-top: 4px;\r\n}\r\n\r\n/* Icon buttons */\r\n.btn-icon-sm {\r\n    background: none;\r\n    border: none;\r\n    color: var(--text-muted);\r\n    cursor: pointer;\r\n    font-size: 14px;\r\n    line-height: 1;\r\n    padding: 2px 5px;\r\n    border-radius: 4px;\r\n}\r\n\r\n.btn-icon-sm:hover {\r\n    color: var(--text-primary);\r\n    background: var(--bg-card-hover);\r\n}\r\n\r\n/* Spinner */\r\n.btn-spinner {\r\n    display: inline-block;\r\n    width: 14px;\r\n    height: 14px;\r\n    border: 2px solid rgba(255, 255, 255, .3);\r\n    border-top-color: #fff;\r\n    border-radius: 50%;\r\n    animation: spin .7s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n    to {\r\n        transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n/* ── Alerts ─────────────────────────────────────────────── */\r\n.alert {\r\n    border-radius: var(--radius-sm);\r\n    padding: 9px 12px;\r\n    font-size: 12px;\r\n    line-height: 1.5;\r\n    margin-top: 10px;\r\n    border: 1px solid transparent;\r\n}\r\n\r\n.alert-error {\r\n    background: var(--error-bg);\r\n    color: var(--error);\r\n    border-color: rgba(239, 68, 68, .25);\r\n}\r\n\r\n.alert-success {\r\n    background: var(--success-bg);\r\n    color: var(--success);\r\n    border-color: rgba(16, 185, 129, .25);\r\n}\r\n\r\n.alert-warning {\r\n    background: var(--warning-bg);\r\n    color: var(--warning);\r\n    border-color: rgba(245, 158, 11, .25);\r\n}\r\n\r\n.alert-info {\r\n    background: var(--accent-glow);\r\n    color: var(--accent);\r\n    border-color: rgba(99, 102, 241, .25);\r\n}\r\n\r\n/* ── Mapping Preview ─────────────────────────────────────── */\r\n.mapping-preview {\r\n    background: var(--bg-input);\r\n    border: 1px solid rgba(99, 102, 241, .3);\r\n    border-radius: var(--radius-sm);\r\n    padding: 10px 12px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.preview-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 3px 0;\r\n}\r\n\r\n.preview-label {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: var(--accent);\r\n    min-width: 44px;\r\n}\r\n\r\n.preview-value {\r\n    font-size: 12px;\r\n    color: var(--text-primary);\r\n}\r\n\r\n/* ── Mapping Panel Toolbar ───────────────────────────────── */\r\n.panel-toolbar {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n.panel-count {\r\n    font-size: 12px;\r\n    color: var(--text-muted);\r\n}\r\n\r\n/* ── Rules List ──────────────────────────────────────────── */\r\n.rules-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n}\r\n\r\n.empty-state {\r\n    text-align: center;\r\n    color: var(--text-muted);\r\n    font-size: 12px;\r\n    padding: 32px 0;\r\n    line-height: 1.6;\r\n}\r\n\r\n.rule-card {\r\n    background: var(--bg-card);\r\n    border: 1px solid var(--border);\r\n    border-radius: var(--radius);\r\n    padding: 12px 14px;\r\n    transition: border-color var(--transition), background var(--transition);\r\n    position: relative;\r\n}\r\n\r\n.rule-card:hover {\r\n    background: var(--bg-card-hover);\r\n    border-color: rgba(255, 255, 255, .12);\r\n}\r\n\r\n.rule-subject {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    color: var(--text-primary);\r\n    margin-bottom: 5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.rule-meta {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 2px;\r\n}\r\n\r\n.rule-meta-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    font-size: 11px;\r\n    color: var(--text-secondary);\r\n}\r\n\r\n.rule-meta-label {\r\n    font-weight: 600;\r\n    color: var(--text-muted);\r\n    min-width: 38px;\r\n    font-size: 10.5px;\r\n    text-transform: uppercase;\r\n    letter-spacing: .4px;\r\n}\r\n\r\n.rule-actions {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    display: flex;\r\n    gap: 4px;\r\n    opacity: 0;\r\n    transition: opacity var(--transition);\r\n}\r\n\r\n.rule-card:hover .rule-actions {\r\n    opacity: 1;\r\n}\r\n\r\n.rule-action-btn {\r\n    background: var(--bg-base);\r\n    border: 1px solid var(--border);\r\n    border-radius: 5px;\r\n    padding: 3px 7px;\r\n    font-size: 11px;\r\n    font-family: inherit;\r\n    cursor: pointer;\r\n    color: var(--text-secondary);\r\n    transition: color var(--transition), border-color var(--transition);\r\n}\r\n\r\n.rule-action-btn.edit:hover {\r\n    color: var(--accent);\r\n    border-color: var(--accent);\r\n}\r\n\r\n.rule-action-btn.delete:hover {\r\n    color: var(--error);\r\n    border-color: var(--error);\r\n}\r\n\r\n/* ── Rule Form ───────────────────────────────────────────── */\r\n.rule-form {\r\n    background: var(--bg-form);\r\n    border: 1px solid rgba(99, 102, 241, .3);\r\n    border-radius: var(--radius);\r\n    padding: 14px;\r\n    margin-top: 4px;\r\n    animation: slideDown .2s ease;\r\n}\r\n\r\n@keyframes slideDown {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(-6px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n.rule-form .form-group {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.rule-form-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 14px;\r\n}\r\n\r\n.rule-form-header span {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n}\r\n\r\n.form-actions {\r\n    display: flex;\r\n    gap: 8px;\r\n    justify-content: flex-end;\r\n    margin-top: 4px;\r\n}\r\n\r\n/* ── Scrollbar ───────────────────────────────────────────── */\r\n::-webkit-scrollbar {\r\n    width: 5px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n    background: transparent;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n    background: var(--bg-card-hover);\r\n    border-radius: 3px;\r\n}"], "sourceRoot": "" }]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


      /***/
    }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function (module) {



      /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
      */
      module.exports = function (cssWithMappingToString) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function (item) {
            var content = "";
            var needLayer = typeof item[5] !== "undefined";
            if (item[4]) {
              content += "@supports (".concat(item[4], ") {");
            }
            if (item[2]) {
              content += "@media ".concat(item[2], " {");
            }
            if (needLayer) {
              content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
            }
            content += cssWithMappingToString(item);
            if (needLayer) {
              content += "}";
            }
            if (item[2]) {
              content += "}";
            }
            if (item[4]) {
              content += "}";
            }
            return content;
          }).join("");
        };

        // import a list of modules into the list
        list.i = function i(modules, media, dedupe, supports, layer) {
          if (typeof modules === "string") {
            modules = [[null, modules, undefined]];
          }
          var alreadyImportedModules = {};
          if (dedupe) {
            for (var k = 0; k < this.length; k++) {
              var id = this[k][0];
              if (id != null) {
                alreadyImportedModules[id] = true;
              }
            }
          }
          for (var _k = 0; _k < modules.length; _k++) {
            var item = [].concat(modules[_k]);
            if (dedupe && alreadyImportedModules[item[0]]) {
              continue;
            }
            if (typeof layer !== "undefined") {
              if (typeof item[5] === "undefined") {
                item[5] = layer;
              } else {
                item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
                item[5] = layer;
              }
            }
            if (media) {
              if (!item[2]) {
                item[2] = media;
              } else {
                item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
                item[2] = media;
              }
            }
            if (supports) {
              if (!item[4]) {
                item[4] = "".concat(supports);
              } else {
                item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
                item[4] = supports;
              }
            }
            list.push(item);
          }
        };
        return list;
      };

      /***/
    }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function (module) {



      module.exports = function (item) {
        var content = item[1];
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }
        if (typeof btoa === "function") {
          var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
          var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
          var sourceMapping = "/*# ".concat(data, " */");
          return [content].concat([sourceMapping]).join("\n");
        }
        return [content].join("\n");
      };

      /***/
    }),

/***/ "./src/taskpane/taskpane.html":
/*!************************************!*\
  !*** ./src/taskpane/taskpane.html ***!
  \************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      // Module
      var code = "<!-- Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. -->\n<!-- See LICENSE in the project root for license information -->\n\n<!doctype html>\n<html lang=\"en\" data-framework=\"typescript\">\n\n<head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Conectado</title>\n\n    <!-- Office JavaScript API -->\n    <" + "script type=\"text/javascript\" src=\"https://appsforoffice.microsoft.com/lib/1/hosted/office.js\"><" + "/script>\n    <!-- MSAL for OneDrive / Microsoft Graph -->\n    <" + "script src=\"https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js\"><" + "/script>\n</head>\n\n<body style=\"width: 100%; height: 100%; margin: 0; padding: 0;\">\n    <div id=\"container\"></div>\n\n    <!-- \n        Fluent UI React v. 9 uses modern JavaScript syntax that is not supported in\n        Trident (Internet Explorer) or EdgeHTML (Edge Legacy), so this add-in won't\n        work in Office versions that use these webviews. The script below makes the \n        following div display when an unsupported webview is in use, and hides the \n        React container div. \n    -->\n    <div id=\"tridentmessage\" style=\"display: none; padding: 10;\">\n        This add-in will not run in your version of Office. Please upgrade either to perpetual Office 2021 (or later) \n        or to a Microsoft 365 account.\n    </div>\n    <" + "script>\n        if ((navigator.userAgent.indexOf(\"Trident\") !== -1) || (navigator.userAgent.indexOf(\"Edge\") !== -1)) {\n            var tridentMessage = document.getElementById(\"tridentmessage\");\n            var normalContainer = document.getElementById(\"container\");\n            tridentMessage.style.display = \"block\";\n            normalContainer.style.display = \"none\";\n        } \n    <" + "/script>\n</body>\n\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

      /***/
    }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ (function (__unused_webpack_module, exports, __webpack_require__) {



      var m = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
      if (false) // removed by dead control flow
      { } else {
        var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function (c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function (c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }


      /***/
    }),

/***/ "./src/taskpane/components/App.css":
/*!*****************************************!*\
  !*** ./src/taskpane/components/App.css ***!
  \*****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/taskpane/components/App.css");











      var options = {};

      options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
      options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
      options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
      options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

      var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function (module) {



      var stylesInDOM = [];
      function getIndexByIdentifier(identifier) {
        var result = -1;
        for (var i = 0; i < stylesInDOM.length; i++) {
          if (stylesInDOM[i].identifier === identifier) {
            result = i;
            break;
          }
        }
        return result;
      }
      function modulesToDom(list, options) {
        var idCountMap = {};
        var identifiers = [];
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = options.base ? item[0] + options.base : item[0];
          var count = idCountMap[id] || 0;
          var identifier = "".concat(id, " ").concat(count);
          idCountMap[id] = count + 1;
          var indexByIdentifier = getIndexByIdentifier(identifier);
          var obj = {
            css: item[1],
            media: item[2],
            sourceMap: item[3],
            supports: item[4],
            layer: item[5]
          };
          if (indexByIdentifier !== -1) {
            stylesInDOM[indexByIdentifier].references++;
            stylesInDOM[indexByIdentifier].updater(obj);
          } else {
            var updater = addElementStyle(obj, options);
            options.byIndex = i;
            stylesInDOM.splice(i, 0, {
              identifier: identifier,
              updater: updater,
              references: 1
            });
          }
          identifiers.push(identifier);
        }
        return identifiers;
      }
      function addElementStyle(obj, options) {
        var api = options.domAPI(options);
        api.update(obj);
        var updater = function updater(newObj) {
          if (newObj) {
            if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
              return;
            }
            api.update(obj = newObj);
          } else {
            api.remove();
          }
        };
        return updater;
      }
      module.exports = function (list, options) {
        options = options || {};
        list = list || [];
        var lastIdentifiers = modulesToDom(list, options);
        return function update(newList) {
          newList = newList || [];
          for (var i = 0; i < lastIdentifiers.length; i++) {
            var identifier = lastIdentifiers[i];
            var index = getIndexByIdentifier(identifier);
            stylesInDOM[index].references--;
          }
          var newLastIdentifiers = modulesToDom(newList, options);
          for (var _i = 0; _i < lastIdentifiers.length; _i++) {
            var _identifier = lastIdentifiers[_i];
            var _index = getIndexByIdentifier(_identifier);
            if (stylesInDOM[_index].references === 0) {
              stylesInDOM[_index].updater();
              stylesInDOM.splice(_index, 1);
            }
          }
          lastIdentifiers = newLastIdentifiers;
        };
      };

      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function (module) {



      var memo = {};

      /* istanbul ignore next  */
      function getTarget(target) {
        if (typeof memo[target] === "undefined") {
          var styleTarget = document.querySelector(target);

          // Special case to return head of iframe instead of iframe itself
          if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
            try {
              // This will throw an exception if access to iframe is blocked
              // due to cross-origin restrictions
              styleTarget = styleTarget.contentDocument.head;
            } catch (e) {
              // istanbul ignore next
              styleTarget = null;
            }
          }
          memo[target] = styleTarget;
        }
        return memo[target];
      }

      /* istanbul ignore next  */
      function insertBySelector(insert, style) {
        var target = getTarget(insert);
        if (!target) {
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        }
        target.appendChild(style);
      }
      module.exports = insertBySelector;

      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function (module) {



      /* istanbul ignore next  */
      function insertStyleElement(options) {
        var element = document.createElement("style");
        options.setAttributes(element, options.attributes);
        options.insert(element, options.options);
        return element;
      }
      module.exports = insertStyleElement;

      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function (module, __unused_webpack_exports, __webpack_require__) {



      /* istanbul ignore next  */
      function setAttributesWithoutAttributes(styleElement) {
        var nonce = true ? __webpack_require__.nc : 0;
        if (nonce) {
          styleElement.setAttribute("nonce", nonce);
        }
      }
      module.exports = setAttributesWithoutAttributes;

      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function (module) {



      /* istanbul ignore next  */
      function apply(styleElement, options, obj) {
        var css = "";
        if (obj.supports) {
          css += "@supports (".concat(obj.supports, ") {");
        }
        if (obj.media) {
          css += "@media ".concat(obj.media, " {");
        }
        var needLayer = typeof obj.layer !== "undefined";
        if (needLayer) {
          css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
        }
        css += obj.css;
        if (needLayer) {
          css += "}";
        }
        if (obj.media) {
          css += "}";
        }
        if (obj.supports) {
          css += "}";
        }
        var sourceMap = obj.sourceMap;
        if (sourceMap && typeof btoa !== "undefined") {
          css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
        }

        // For old IE
        /* istanbul ignore if  */
        options.styleTagTransform(css, styleElement, options.options);
      }
      function removeStyleElement(styleElement) {
        // istanbul ignore if
        if (styleElement.parentNode === null) {
          return false;
        }
        styleElement.parentNode.removeChild(styleElement);
      }

      /* istanbul ignore next  */
      function domAPI(options) {
        if (typeof document === "undefined") {
          return {
            update: function update() { },
            remove: function remove() { }
          };
        }
        var styleElement = options.insertStyleElement(options);
        return {
          update: function update(obj) {
            apply(styleElement, options, obj);
          },
          remove: function remove() {
            removeStyleElement(styleElement);
          }
        };
      }
      module.exports = domAPI;

      /***/
    }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function (module) {



      /* istanbul ignore next  */
      function styleTagTransform(css, styleElement) {
        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css;
        } else {
          while (styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css));
        }
      }
      module.exports = styleTagTransform;

      /***/
    }),

/***/ "./src/taskpane/components/ActivateMeetingForm.tsx":
/*!*********************************************************!*\
  !*** ./src/taskpane/components/ActivateMeetingForm.tsx ***!
  \*********************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api */ "./src/taskpane/services/api.ts");
/* provided dependency */ var Promise = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js")["Promise"];
      var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
      };



      var ActivateMeetingForm = function (_a) {
        var rules = _a.rules;
        var today = new Date().toISOString().split("T")[0];
        var _b = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), subject = _b[0], setSubject = _b[1];
        var _c = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(today), date = _c[0], setDate = _c[1];
        var _d = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), loading = _d[0], setLoading = _d[1];
        var _e = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), alert = _e[0], setAlert = _e[1];
        var showAlert = function (msg, type) {
          if (type === void 0) { type = "error"; }
          return setAlert({ msg: msg, type: type });
        };
        var clearAlert = function () { return setAlert(null); };
        // Find matching rule (case-insensitive)
        var matched = rules.find(function (r) { return r.meeting_subject.toLowerCase() === subject.trim().toLowerCase(); });
        var handleSubmit = function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var e_1, msg;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!subject.trim() || !date) {
                    showAlert("Please enter both meeting subject and date.");
                    return [2 /*return*/];
                  }
                  if (!matched) {
                    showAlert("No mapping found for this subject. Add one in the Mapping Editor tab.", "warning");
                    return [2 /*return*/];
                  }
                  clearAlert();
                  setLoading(true);
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 3, 4, 5]);
                  return [4 /*yield*/, (0, _services_api__WEBPACK_IMPORTED_MODULE_1__.activateMeeting)({
                    meetingName: subject.trim(),
                    meetingDate: date,
                    meetingProject: matched.project_name,
                    sampleTask: matched.sample_task,
                  })];
                case 2:
                  _a.sent();
                  showAlert("✓ Meeting activated successfully!", "success");
                  setSubject("");
                  setDate(today);
                  return [3 /*break*/, 5];
                case 3:
                  e_1 = _a.sent();
                  msg = e_1 instanceof Error ? e_1.message : String(e_1);
                  showAlert("Activation failed: ".concat(msg));
                  return [3 /*break*/, 5];
                case 4:
                  setLoading(false);
                  return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
              }
            });
          });
        };
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "tab-panel" },
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "card" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-group" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { htmlFor: "meeting-subject" }, "Meeting Subject"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
                id: "meeting-subject", type: "text", placeholder: "e.g. Scrum Call", value: subject, onChange: function (e) {
                  setSubject(e.target.value);
                  clearAlert();
                }
              })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-group" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { htmlFor: "meeting-date" }, "Meeting Date"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "meeting-date", type: "date", value: date, onChange: function (e) { return setDate(e.target.value); } })),
            subject.trim() && matched && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "mapping-preview" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "preview-row" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "preview-label" }, "Project"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "preview-value" }, matched.project_name)),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "preview-row" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "preview-label" }, "Task"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "preview-value" }, matched.sample_task)))),
            subject.trim() && !matched && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "alert alert-warning", style: { marginBottom: "10px" } }, "No mapping found for this subject. Add one in the Mapping Editor tab.")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "btn btn-primary btn-full", disabled: loading, onClick: handleSubmit }, loading ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "btn-spinner" }) : "Activate Meeting"),
            alert && react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "alert alert-".concat(alert.type) }, alert.msg))));
      };
/* harmony default export */ __webpack_exports__["default"] = (ActivateMeetingForm);


      /***/
    }),

/***/ "./src/taskpane/components/App.tsx":
/*!*****************************************!*\
  !*** ./src/taskpane/components/App.tsx ***!
  \*****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MappingForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MappingForm */ "./src/taskpane/components/MappingForm.tsx");
/* harmony import */ var _ActivateMeetingForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActivateMeetingForm */ "./src/taskpane/components/ActivateMeetingForm.tsx");
/* harmony import */ var _services_graph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/graph */ "./src/taskpane/services/graph.ts");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.css */ "./src/taskpane/components/App.css");






      // Initialize MSAL once (no-op if msal CDN not loaded)
      (0, _services_graph__WEBPACK_IMPORTED_MODULE_3__.initMsal)();
      var App = function () {
        var _a = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)("submit"), activeTab = _a[0], setActiveTab = _a[1];
        // Shared rules state — MappingForm loads & writes, ActivateMeetingForm reads
        var _b = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)([]), rules = _b[0], setRules = _b[1];
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "app-root" },
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", { className: "app-header" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "header-left" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "logo-dot" }),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "header-title" }, "Conectado"))),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", { className: "tab-bar" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "tab".concat(activeTab === "submit" ? " active" : ""), onClick: function () { return setActiveTab("submit"); } }, "Activate Meeting"),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "tab".concat(activeTab === "mapping" ? " active" : ""), onClick: function () { return setActiveTab("mapping"); } }, "Mapping Editor")),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "tab-content-area" }, activeTab === "submit" ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActivateMeetingForm__WEBPACK_IMPORTED_MODULE_2__["default"], { rules: rules })) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MappingForm__WEBPACK_IMPORTED_MODULE_1__["default"], { rules: rules, onRulesChange: setRules })))));
      };
/* harmony default export */ __webpack_exports__["default"] = (App);


      /***/
    }),

/***/ "./src/taskpane/components/MappingForm.tsx":
/*!*************************************************!*\
  !*** ./src/taskpane/components/MappingForm.tsx ***!
  \*************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/graph */ "./src/taskpane/services/graph.ts");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api */ "./src/taskpane/services/api.ts");
/* provided dependency */ var Promise = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js")["Promise"];
      var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };




      var MappingForm = function (_a) {
        var rules = _a.rules, onRulesChange = _a.onRulesChange;
        var _b = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), subject = _b[0], setSubject = _b[1];
        var _c = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), project = _c[0], setProject = _c[1];
        var _d = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), task = _d[0], setTask = _d[1];
        var _e = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), editingId = _e[0], setEditingId = _e[1];
        var _f = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showForm = _f[0], setShowForm = _f[1];
        var _g = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), alert = _g[0], setAlert = _g[1];
        var _h = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), loading = _h[0], setLoading = _h[1];
        var _j = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(true), rulesLoading = _j[0], setRulesLoading = _j[1];
        var showAlert = function (msg, type) {
          if (type === void 0) { type = "error"; }
          return setAlert({ msg: msg, type: type });
        };
        var clearAlert = function () { return setAlert(null); };
        (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
          var cancelled = false;
          setRulesLoading(true);
          (0, _services_graph__WEBPACK_IMPORTED_MODULE_1__.loadMappingFromOneDrive)()
            .then(function (loaded) {
              if (!cancelled) {
                onRulesChange(loaded);
                setRulesLoading(false);
              }
            })
            .catch(function () {
              if (!cancelled)
                setRulesLoading(false);
            });
          return function () {
            cancelled = true;
          };
        }, []);
        var openAdd = function () {
          setEditingId(null);
          setSubject("");
          setProject("");
          setTask("");
          clearAlert();
          setShowForm(true);
        };
        var openEdit = function (rule) {
          setEditingId(rule.id);
          setSubject(rule.meeting_subject);
          setProject(rule.project_name);
          setTask(rule.sample_task);
          clearAlert();
          setShowForm(true);
        };
        var closeForm = function () {
          setShowForm(false);
          setEditingId(null);
          clearAlert();
        };
        var handleSave = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var result, e_1, msg, updated, e_2, msg;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!subject.trim() || !project.trim() || !task.trim()) {
                    showAlert("All fields are required.");
                    return [2 /*return*/];
                  }
                  setLoading(true);
                  showAlert("Validating with server…", "info");
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 3, , 4]);
                  return [4 /*yield*/, (0, _services_api__WEBPACK_IMPORTED_MODULE_2__.validateMapping)(project.trim(), task.trim())];
                case 2:
                  result = _a.sent();
                  if (!result.valid) {
                    showAlert(result.errors.join(" | "));
                    setLoading(false);
                    return [2 /*return*/];
                  }
                  return [3 /*break*/, 4];
                case 3:
                  e_1 = _a.sent();
                  msg = e_1 instanceof Error ? e_1.message : String(e_1);
                  showAlert("Validation failed: ".concat(msg));
                  setLoading(false);
                  return [2 /*return*/];
                case 4:
                  if (editingId) {
                    updated = rules.map(function (r) {
                      return r.id === editingId
                        ? __assign(__assign({}, r), { meeting_subject: subject.trim(), project_name: project.trim(), sample_task: task.trim() }) : r;
                    });
                  }
                  else {
                    updated = __spreadArray(__spreadArray([], rules, true), [
                      {
                        id: crypto.randomUUID(),
                        meeting_subject: subject.trim(),
                        project_name: project.trim(),
                        sample_task: task.trim(),
                      },
                    ], false);
                  }
                  _a.label = 5;
                case 5:
                  _a.trys.push([5, 7, , 8]);
                  return [4 /*yield*/, (0, _services_graph__WEBPACK_IMPORTED_MODULE_1__.saveMappingToOneDrive)(updated)];
                case 6:
                  _a.sent();
                  onRulesChange(updated);
                  setLoading(false);
                  closeForm();
                  return [3 /*break*/, 8];
                case 7:
                  e_2 = _a.sent();
                  msg = e_2 instanceof Error ? e_2.message : String(e_2);
                  showAlert("OneDrive save failed: ".concat(msg), "warning");
                  onRulesChange(updated); // still update locally
                  setLoading(false);
                  return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
              }
            });
          });
        }, [subject, project, task, editingId, rules, onRulesChange]);
        var handleDelete = function (id) {
          return __awaiter(void 0, void 0, void 0, function () {
            var updated, e_3, msg;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  updated = rules.filter(function (r) { return r.id !== id; });
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 3, , 4]);
                  return [4 /*yield*/, (0, _services_graph__WEBPACK_IMPORTED_MODULE_1__.saveMappingToOneDrive)(updated)];
                case 2:
                  _a.sent();
                  return [3 /*break*/, 4];
                case 3:
                  e_3 = _a.sent();
                  msg = e_3 instanceof Error ? e_3.message : String(e_3);
                  console.warn("Delete: OneDrive write failed", msg);
                  return [3 /*break*/, 4];
                case 4:
                  onRulesChange(updated);
                  return [2 /*return*/];
              }
            });
          });
        };
        var escHtml = function (str) {
          return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        };
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "tab-panel" },
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "panel-toolbar" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "panel-count" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, rulesLoading ? "…" : rules.length),
              " rules"),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "btn btn-accent btn-sm", onClick: openAdd }, "+ Add Rule")),
          react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rules-list" }, rulesLoading ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "empty-state" }, "Loading from OneDrive\u2026")) : rules.length === 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "empty-state" },
            "No mapping rules yet.",
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
            "Click \u201C+ Add Rule\u201D to get started.")) : (rules.map(function (r) {
              return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-card", key: r.id },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-subject" }, escHtml(r.meeting_subject)),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-meta" },
                  react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-meta-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "rule-meta-label" }, "Project"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, escHtml(r.project_name))),
                  react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-meta-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "rule-meta-label" }, "Task"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, escHtml(r.sample_task)))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-actions" },
                  react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "rule-action-btn edit", onClick: function () { return openEdit(r); } }, "Edit"),
                  react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "rule-action-btn delete", onClick: function () { return handleDelete(r.id); } }, "Delete"))));
            }))),
          showForm && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-form" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "rule-form-header" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, editingId ? "Edit Rule" : "Add Rule"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "btn-icon-sm", onClick: closeForm }, "\u2715")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-group" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { htmlFor: "f-subject" }, "Meeting Subject"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "f-subject", type: "text", placeholder: "e.g. Scrum Call", value: subject, onChange: function (e) { return setSubject(e.target.value); } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-group" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { htmlFor: "f-project" }, "Project Name"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "f-project", type: "text", placeholder: "e.g. Automation Test Folder", value: project, onChange: function (e) { return setProject(e.target.value); } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-group" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { htmlFor: "f-task" }, "Task ID"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "f-task", type: "text", placeholder: "e.g. PROJ-123", value: task, onChange: function (e) { return setTask(e.target.value); } })),
            alert && react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "alert alert-".concat(alert.type) }, alert.msg),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "form-actions" },
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "btn btn-ghost", onClick: closeForm }, "Cancel"),
              react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "btn btn-primary", disabled: loading, onClick: handleSave }, loading ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "btn-spinner" }) : "Save"))))));
      };
/* harmony default export */ __webpack_exports__["default"] = (MappingForm);


      /***/
    }),

/***/ "./src/taskpane/index.tsx":
/*!********************************!*\
  !*** ./src/taskpane/index.tsx ***!
  \********************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/taskpane/components/App.tsx");



      /* global document, Office, module, require, HTMLElement */
      var rootElement = document.getElementById("container");
      var root = rootElement ? (0, react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement) : undefined;
      /* Render application after Office initializes */
      Office.onReady(function () {
        root === null || root === void 0 ? void 0 : root.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));
      });
      if (false) // removed by dead control flow
      { }


      /***/
    })

},
/******/ function (__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function (moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/taskpane/index.tsx"), __webpack_exec__("./src/taskpane/taskpane.html"));
  /******/
}
]);
//# sourceMappingURL=taskpane.js.map