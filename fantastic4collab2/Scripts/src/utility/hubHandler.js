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
Object.defineProperty(exports, "__esModule", { value: true });
require("jquery");
require("signalr");
var CS3750;
(function (CS3750) {
    var BaseHubHandler;
    (function (BaseHubHandler) {
        var Hub = /** @class */ (function () {
            function Hub(onStart, onReceive) {
                //if ($.connection && ($.connection as any).appHub)
                try {
                    this.chat = $.connection.appHub;
                }
                catch (e) {
                    alert(e);
                    throw e;
                }
                //else {
                //    let connection = $.hubConnection();
                //    let proxy = connection..createHubProxy("appHub");
                //    this.chat = proxy.connection.hub.;
                //}
                this.onStart = onStart;
                this.onReceive = onReceive;
                // Reference the auto-generated proxy for the hub.  
                // Create a function that the hub can call back to display messages.
                this.chat.client.addNewMessageToPage = this.onReceive;
                $.connection.hub.start().done(this.onStart);
            }
            Hub.prototype.htmlEncode = function (value) {
                var encodedValue = $('<div />').text(value).html();
                return encodedValue;
            };
            Hub.prototype.sendToServer = function (connection, data) {
                this.chat.server.send(connection, data);
            };
            return Hub;
        }());
        BaseHubHandler.Hub = Hub;
    })(BaseHubHandler = CS3750.BaseHubHandler || (CS3750.BaseHubHandler = {}));
})(CS3750 || (CS3750 = {}));
var HubHandler = /** @class */ (function (_super) {
    __extends(HubHandler, _super);
    function HubHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HubHandler;
}(CS3750.BaseHubHandler.Hub));
exports.HubHandler = HubHandler;
