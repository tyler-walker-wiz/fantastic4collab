"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
require("jquery");
var workItem_1 = require("./workItem");
var appBase_1 = require("./utility/appBase");
var hubHandler_1 = require("./utility/hubHandler");
var itemHeader_1 = require("./itemHeader");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var icons_1 = require("@uifabric/icons");
icons_1.initializeIcons();
var WorkItems = /** @class */ (function (_super) {
    __extends(WorkItems, _super);
    function WorkItems() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onConnected = function (e) {
            console.log("Connected!");
        };
        _this.retrieveInit = function (items) {
            console.log(JSON.stringify(items));
            _this.setState({ items: items });
        };
        _this.onItemChange = function (item) {
            _this.state.hub.update(item.groupId, item.id, item.name, item.content);
        };
        _this.dummyData = [{
                id: "1",
                name: "Item 1",
                content: "Some content",
                groupId: "2"
            },
            {
                id: "2",
                name: "Item 2",
                content: "Some revised content Some revised content Some revised content Some revised content Some revised content\n        Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content",
                groupId: "2"
            },
            {
                id: "3",
                name: "Item 3",
                content: "Car",
                groupId: "2"
            },
            {
                id: "4",
                name: "Item 4",
                content: "Plane",
                groupId: "2"
            },
            { id: "5", name: "Title", content: "This is a great description", groupId: "3" }
        ];
        _this._onFilterChanged = function (filterText, tags) {
            return tags ?
                tags.filter(function (t) { return _this.state.items.some(function (i) { return i.name.indexOf(t.name) > -1; }); }) : [];
        };
        _this._onShowPanel = function () {
            _this.setState({ showPanel: true });
        };
        _this._onClosePanel = function () {
            _this.setState({ showPanel: false });
        };
        _this._onRenderFooterContent = function () {
            return (React.createElement("div", null,
                React.createElement(Button_1.PrimaryButton, { onClick: function () {
                        _this._onClosePanel;
                        _this.state.hub.createItem("1", "Test name", "Test description");
                    }, style: { marginRight: '8px' } }, "Save"),
                React.createElement(Button_1.DefaultButton, { onClick: _this._onClosePanel }, "Cancel")));
        };
        return _this;
    }
    WorkItems.prototype.handleLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hub, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setTimeout(function () { }, 1000)];
                    case 1:
                        _a.sent();
                        hub = new hubHandler_1.HubHandler(this.onConnected, this.onReceive, "broadcastMessage", { "getEverything": this.retrieveInit });
                        name = "tempName";
                        this.setState({ hub: hub, name: name, items: [] });
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkItems.prototype.onReceive = function (responses) {
        if (typeof responses === "string") {
            alert(responses);
            return;
        }
        var grouped = responses.groupBy("Id");
        var data = grouped.map(function (g) {
            return g.map(function (d) {
                var ret = d;
                return ret;
            });
        });
        alert(data);
    };
    WorkItems.prototype._getTextFromItem = function (item) {
        return item.name;
    };
    WorkItems.prototype.onRender = function () {
        var _this = this;
        var _a = this.state, items = _a.items, headers = _a.headers;
        if (!headers)
            headers = [{ name: "Good one", onClick: function () { return alert("clicked"); }, url: "#" }];
        return (React.createElement("div", null,
            React.createElement("h2", { className: "ms-app-header" }, "Fantastic 4 Collab Workspace"),
            React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                React.createElement("div", { className: "col-Grid-row" })),
            React.createElement(itemHeader_1.ListHeaderWrapper, { items: headers },
                React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                    React.createElement("div", { className: "col-Grid-row" }, items.map(function (v, i) { return React.createElement("div", { key: i, className: "ms-Grid-col ms-sm3 ms-lg3" },
                        React.createElement(workItem_1.WorkItem, { onChange: _this.onItemChange, locked: false, item: v })); }))),
                React.createElement(Button_1.DefaultButton, { secondaryText: "Opens the Create Panel", text: "Add", onClick: this._onShowPanel, iconProps: { iconName: "Add" }, styles: { root: { float: "right", backgroundColor: "#0078d4", color: "white", position: "absolute", top: "50", right: "50" } } }),
                React.createElement(Panel_1.Panel, { isOpen: this.state.showPanel, type: Panel_1.PanelType.smallFixedFar, onDismiss: this._onClosePanel, headerText: "What would you like to say?", closeButtonAriaLabel: "Close", onRenderFooterContent: this._onRenderFooterContent },
                    React.createElement(TextField_1.TextField, { required: true, label: "Title", id: "newItemNameField" }),
                    React.createElement(TextField_1.TextField, { required: true, label: "Description", multiline: true, rows: 10, id: "newItemDescField" })))));
    };
    return WorkItems;
}(appBase_1.BaseReactPageBasicHandleLoad));
ReactDOM.render(React.createElement(WorkItems, null), document.getElementById('app'));
Array.prototype.groupBy = function (key) {
    return this.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, []);
};
