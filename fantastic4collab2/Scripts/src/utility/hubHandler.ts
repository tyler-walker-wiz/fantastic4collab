import 'signalr';

namespace CS3750 {
    export module BaseHubHandler {
        export class Hub<T> {
            private chat: IHub;
            private connection: SignalR.Hub.Connection;
            constructor(private onStart: (e: any) => void, private onReceive: (responses: T[]) => void, private receiveMessage: string, private otherMessages?: { [index: string]: (e?: any) => void }) {
                //if ($.connection && ($.connection as any).appHub)
                try {
                    this.connection = this.chat = ($.connection as any).appHub || ($.connection as any).AppHub as IHub;
                    // Reference the auto-generated proxy for the hub.  
                    // Create a function that the hub can call back to display messages.
                    if (this.chat && this.chat.client)
                        this.chat.client.broadcastMessage = this.onReceive;
                    $.connection.hub.start().done(this.forStart);
                }
                catch (e) {
                    //alert(e + "\n" + $.connection);
                    this.connection = $.hubConnection();
                    let proxy = this.connection.createHubProxy("appHub");
                    proxy.on(receiveMessage, this.onReceive);
                    if (otherMessages)
                        for (var msg in otherMessages) {
                            proxy.on(msg, otherMessages[msg]);
                        }
                    this.chat = proxy.connection.proxies.apphub;
                    this.connection.start().done(this.forStart);
                }

            }
            init() {

            }
            forStart = (chat: IHub) => {
                //this.chat = chat;
                this.onStart && this.onStart(chat);
            }
            htmlEncode(value: string) {
                var encodedValue = $('<div />').text(value).html();
                return encodedValue;
            }
            sendToServer(data: any, connection?: SignalR.Connection) {
                if (this.chat && this.chat.server && connection)
                    this.chat.server.send(connection, data);
                else
                    this.chat.send(data);

            }
            async update(groupId: string, itemId: string, name: string, content: string) {
                if (this.chat) {
                    let updated = await this.chat.invoke("UpdateItem", groupId, itemId, name, content);
                    return updated;
                }
                return false;
            }
            async lockItem(id: string) {
                if (this.chat) {
                    let canUpdate = await this.chat.invoke("LockItem", id);
                    return canUpdate;
                }
                return false;
            }
            async unlockItem(id: string) {
                if (this.chat) {
                    let canUpdate = await this.chat.invoke("LockItem", id);
                    return canUpdate;
                }
                return false;
            }
            async createItem(id: string) {
                if (this.chat) {
                    let canUpdate = await this.chat.invoke("LockItem", id);
                    return canUpdate;
                }
                return false;
            }
            async createGroup(id: string) {
                if (this.chat) {
                    let canUpdate = await this.chat.invoke("LockItem", id);
                    return canUpdate;
                }
                return false;
            }
        }
    }

}
export interface IHub extends SignalR.Hub.Connection {
    client?: { broadcastMessage: (responses: any[]) => void };
    server?: SignalR.Transport;
    invoke: (method: HubTypes, ...data: any[]) => Promise<any>;
}
export type HubTypes = "UpdateItem" | "LockItem" | "UnlockItem" | "CreateItem" | "CreateGroup";
export class HubHandler<T> extends CS3750.BaseHubHandler.Hub<T> { }
