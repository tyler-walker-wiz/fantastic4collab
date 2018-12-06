import 'signalr';

namespace CS3750 {
    export module BaseHubHandler {
        export class Hub<T> {
            private onStart: () => void;
            private onReceive: (responses: T[]) => void;
            private chat: IHub;
            constructor(onStart: () => void, onReceive: (responses: T[]) => void) {
                //if ($.connection && ($.connection as any).appHub)
                this.onStart = onStart;
                this.onReceive = onReceive;
                try {
                    this.chat = ($.connection as any).appHub || ($.connection as any).AppHub as IHub;
                    // Reference the auto-generated proxy for the hub.  
                    // Create a function that the hub can call back to display messages.
                    if (this.chat && this.chat.client)
                        this.chat.client.broadcastMessage = this.onReceive;
                    $.connection.hub.start().done(this.onStart);
                }
                catch (e) {
                    //alert(e + "\n" + $.connection);
                    let connection = $.hubConnection();
                    let proxy = connection.createHubProxy("appHub");
                    proxy.on("broadcastMessage", this.onReceive);
                    this.chat = proxy.connection.hub;
                    connection.start().done(this.onStart);
                }

            }
            htmlEncode(value: string) {
                var encodedValue = $('<div />').text(value).html();
                return encodedValue;
            }
            sendToServer(connection: SignalR.Connection, data: any) {
                if (this.chat && this.chat.server)
                    this.chat.server.send(connection, data);
                else
                    this.chat.send(data);

            }
        }
    }

}
export interface IHub extends SignalR.Hub.Connection {
    client?: { broadcastMessage: (responses: any[]) => void };
    server?: SignalR.Transport;
}
export class HubHandler<T> extends CS3750.BaseHubHandler.Hub<T> { }
