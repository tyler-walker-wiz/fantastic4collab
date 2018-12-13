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
var Nav_1 = require("office-ui-fabric-react/lib/Nav");
var ListHeaderWrapper = /** @class */ (function (_super) {
    __extends(ListHeaderWrapper, _super);
    function ListHeaderWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListHeaderWrapper.prototype.render = function () {
        var _a = this.props, items = _a.items, selected = _a.selected, children = _a.children;
        return (React.createElement("div", null,
            React.createElement("div", { style: { clear: "both" } },
                React.createElement("div", { className: "ms-NavExample-LeftPane", style: { width: "208px", height: "100%", border: "1px solid #EEE", float: "left", overflowY: "auto" } },
                    React.createElement(Nav_1.Nav, { groups: [
                            {
                                name: "Group",
                                links: items
                            }
                        ], expandedStateText: 'expanded', collapsedStateText: 'collapsed', selectedKey: (selected && selected.key) || (items && items.length && items[0].key) || "", expandButtonAriaLabel: 'Expand or collapse' }))),
            React.createElement("div", null, children)));
    };
    return ListHeaderWrapper;
}(React.Component));
exports.ListHeaderWrapper = ListHeaderWrapper;
