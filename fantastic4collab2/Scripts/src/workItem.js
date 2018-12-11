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
var WorkItem = /** @class */ (function (_super) {
    __extends(WorkItem, _super);
    function WorkItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._showModal = function () {
            var isShowing = _this.state.showModal;
            if (!isShowing)
                _this.setState({ showModal: true });
        };
        _this._closeModal = function () {
            var isShowing = _this.state.showModal;
            if (isShowing)
                _this.setState({ showModal: false });
        };
        _this.onChange = function (value, item) {
            item.content = value;
            if (_this.props.onChange)
                _this.props.onChange(item);
        };
        return _this;
    }
    WorkItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, item = _a.item, locked = _a.locked;
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
                        React.createElement(TextField_1.TextField, { styles: { field: {} }, disabled: locked, onChange: function (e, val) { return _this.onChange(val, item); }, multiline: true, rows: 10, value: item && item.content }),
                        React.createElement(Button_1.DefaultButton, { onClick: this._closeModal, text: "Close", style: { float: "right" } }))))));
    };
    WorkItem.prototype.componentWillMount = function () {
        this.setState({ showModal: false });
    };
    return WorkItem;
}(React.Component));
exports.WorkItem = WorkItem;
