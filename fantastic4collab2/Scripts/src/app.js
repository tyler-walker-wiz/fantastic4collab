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
var ReactDOM = __importStar(require("react-dom"));
var WorkItems = /** @class */ (function (_super) {
    __extends(WorkItems, _super);
    function WorkItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkItems.prototype.render = function () {
        var items = [];
        items.push({ id: "1", name: "Title", description: "This is a great description" });
        return (React.createElement("div", null,
            React.createElement("h2", null, "Welcome to the App"),
            items.map(function (i) { return React.createElement(WorkItem, { item: i }); })));
    };
    return WorkItems;
}(React.Component));
var WorkItem = /** @class */ (function (_super) {
    __extends(WorkItem, _super);
    function WorkItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkItem.prototype.render = function () {
        var item = this.props.item;
        return (React.createElement("div", { style: { margin: '10px', border: '1px solid gray', backgroundColor: 'lightred' } },
            React.createElement("div", { className: "commentBox" }, item && item.name),
            React.createElement("p", null, item && item.description)));
    };
    return WorkItem;
}(React.Component));
ReactDOM.render(React.createElement(WorkItems, null), document.getElementById('app'));
