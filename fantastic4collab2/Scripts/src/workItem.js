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
var Modal_1 = require("office-ui-fabric-react/lib/Modal");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Spinner_1 = require("office-ui-fabric-react/lib/components/Spinner");
var WorkItem = /** @class */ (function (_super) {
    __extends(WorkItem, _super);
    function WorkItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._contentPlaceholder = "";
        _this._showModal = function () { return __awaiter(_this, void 0, void 0, function () {
            var isShowing, _a, checkCanEdit, onOpen, locked;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isShowing = this.state.showModal;
                        _a = this.props, checkCanEdit = _a.checkCanEdit, onOpen = _a.onOpen;
                        if (!!isShowing) return [3 /*break*/, 4];
                        if (!checkCanEdit) return [3 /*break*/, 2];
                        return [4 /*yield*/, checkCanEdit()];
                    case 1:
                        locked = _b.sent();
                        this.setState({ showModal: true, locked: locked });
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ showModal: true });
                        _b.label = 3;
                    case 3:
                        if (onOpen)
                            onOpen();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //private _showModal = async () => {
        //    let { showModal: isShowing } = this.state;
        //    if (!isShowing)
        //        this.setState({ showModal: true });
        //}
        _this._closeModal = function () {
            var isShowing = _this.state.showModal;
            if (isShowing) {
                if (_this.props.onClose)
                    _this.props.onClose();
                setTimeout(function () {
                    _this.setState({ showModal: false });
                }, 300);
            }
        };
        _this._onChange = function (value, item) {
            _this._contentPlaceholder = value;
            _this.setState({ loading: true });
            setTimeout(function () {
                if (value === _this._contentPlaceholder) {
                    console.log("changing... " + _this._contentPlaceholder);
                    item.content = _this._contentPlaceholder;
                    if (_this.props.onChange) {
                        _this.props.onChange(item).then(function (updated) {
                            _this.setState({ loading: false });
                        });
                    }
                    else
                        _this.setState({ loading: false });
                }
            }, 300);
        };
        return _this;
    }
    WorkItem.prototype.render = function () {
        var _this = this;
        var item = this.props.item;
        var locked = !(this.state && this.state.locked);
        var loading = this.state.loading;
        return (React.createElement("div", null,
            React.createElement("div", { onDoubleClick: this._showModal, style: { margin: '10px', color: 'rgb(0, 120, 212)', border: '1px solid lightgray', borderRadius: '5px' } },
                React.createElement("div", { className: "commentBox", style: { margin: "10px" } }, item && item.name),
                React.createElement("div", { style: { display: "inline-block", width: "100%", backgroundColor: "lightgray" } },
                    React.createElement("p", { style: { margin: "10px" } }, item && item.content))),
            React.createElement(Modal_1.Modal, { titleAriaId: "titleId", subtitleAriaId: "subtitleId", isOpen: this.state.showModal, onDismiss: this._closeModal, isBlocking: false, containerClassName: "ms-modalExample-container" },
                React.createElement("div", { className: "ms-modalExample-header" },
                    React.createElement("span", { id: "titleId" }, item.name)),
                React.createElement("div", { id: "subtitleId", className: "ms-modalExample-body" },
                    React.createElement("div", { style: { margin: "20px" } },
                        React.createElement(TextField_1.TextField, { styles: { root: {} }, disabled: locked, onChange: function (e, val) { return _this._onChange(val, item); }, multiline: true, rows: 10, value: this._contentPlaceholder }),
                        loading && React.createElement(Spinner_1.Spinner, { label: "Saving...", styles: { root: { float: "left" } }, size: Spinner_1.SpinnerSize.small, labelPosition: "left" }),
                        React.createElement(Button_1.DefaultButton, { onClick: this._closeModal, text: "Close", style: { position: "absolute", right: "45", bottom: "30" } }))))));
    };
    WorkItem.prototype.componentWillMount = function () {
        this._contentPlaceholder = this.props.item && this.props.item.content;
        this.setState({ showModal: false });
    };
    return WorkItem;
}(React.Component));
exports.WorkItem = WorkItem;
