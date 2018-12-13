import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TagPicker, ITag } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import 'jquery';
import { IWorkItem, WorkItem } from './workItem';
import { BaseReactPageBasicHandleLoad } from './utility/appBase'
import { HubHandler } from './utility/hubHandler';
import { ListHeaderWrapper } from './itemHeader';
import { INavLink, INav } from 'office-ui-fabric-react/lib/Nav';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
import { Icon } from 'office-ui-fabric-react/lib/Icon';

interface IResponse {
    item: IWorkItem;
}


interface IWorkItemsState {
    hub: HubHandler<IResponse>;
    name: string;
    id: string;
    items: IWorkItem[];
    headers: INavLink[];
    showPanel: boolean;
    header: INavLink;
}

class WorkItems extends BaseReactPageBasicHandleLoad<{}, IWorkItemsState>{
    private newItem = {} as IWorkItem;
    async handleLoad() {
        await setTimeout(() => { }, 1000);
        let hub = new HubHandler(this.onConnected, this.onReceive, "broadcastMessage", {
            "getEverything": this.retrieveInit
        });
        //let name = prompt("Enter name: ") as string;
        let name = "tempName";
        this.setState({ hub, name, items: [] });
    }
    onReceive(responses: IResponse[]) {
        if (typeof responses === "string") {
            alert(responses);
            return;
        }
        let grouped = responses.groupBy("Id");
        let data = grouped.map(g => {
            return g.map(d => {
                var ret = d;
                return ret;
            });
        });
        alert(data);
    }
    onConnected = (e: any) => {
        console.log("Connected!");
    }
    retrieveInit = (items: IWorkItem[]) => {
        console.log(JSON.stringify(items));
        let headers = items.groupBy("groupId")
            .map(i => { let group = i[0]; return { id: group.id, key: group.groupId, onClick: (e, i) => this._selectHeader(i), name: group.groupName, url: "#" } as INavLink })
            .filter(i => !!i);
        let header = headers && headers[0];
        this.setState({ items, headers, header });
    }
    onItemChange = async (item: IWorkItem) => {
        return await this.state.hub.update(item.groupId, item.id, item.name, item.content);
    }
    dummyData: IWorkItem[] = [{
        id: "1",
        name: "Item 1",
        content: "Some content",
        groupId: "2"
    },
    {
        id: "2",
        name: "Item 2",
        content: `Some revised content Some revised content Some revised content Some revised content Some revised content
        Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content`,
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
    private _getTextFromItem(item: any): any {
        return item.name;
    }
    private _onFilterChanged = (filterText: string, tags: ITag[] | undefined): ITag[] => {
        return tags ?
            tags.filter(t => this.state.items.some(i => i.name.indexOf(t.name) > -1)) : [];
    };
    private _onShowPanel = () => {
        this.setState({ showPanel: true });
    }
    private _onClosePanel = () => {
        this.setState({ showPanel: false });
    }
    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                <PrimaryButton onClick={() => {
                    let { header } = this.state;
                    this._onClosePanel();
                    if (header && this.newItem)
                        this.state.hub.createItem(header.id, this.newItem && this.newItem.name, this.newItem && this.newItem.content);
                    this.newItem = {} as IWorkItem;
                }} style={{ marginRight: '8px' }}>
                    Save
        </PrimaryButton>
                <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
            </div>
        );
    };

    private _selectHeader = (header: INavLink | undefined) => {
        if (header)
            this.setState({ header });
    }
    onItemClose = (item: IWorkItem) => {
        this.state.hub.unlockItem(item.id);
    }
    onItemOpen = async (item: IWorkItem) => {
        let canEdit = await this.state.hub.lockItem(item.id);
        return canEdit;
    }
    onRender() {
        let { items, headers, header, hub } = this.state;
        if (!headers)
            headers = [{ name: "Good one", onClick: (e, i) => this._selectHeader(i), url: "#", id: "2", key: "2" }];
        if (!header)
            header = headers[0];
        if (header)
            items = $.grep(items, i => i.groupId == header.key);
        return (<div>
            <h2 className="ms-app-header">Fantastic 4 Collab Workspace</h2>
            <div className="ms-Grid" dir="ltr">
                <div className="col-Grid-row">
                    {/*<TagPicker
                        onResolveSuggestions={this._onFilterChanged}
                        getTextFromItem={this._getTextFromItem}
                        pickerSuggestionsProps={{
                            suggestionsHeaderText: 'Suggested Groups',
                            noResultsFoundText: 'No Groups Found',
                        }}
                        itemLimit={2}
                        disabled={false}
                        inputProps={{
                            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
                            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
                            style: { padding: "10px" },
                            'aria-label': 'Group Picker',
                            placeholder: "Start typing to search"
                        }}
                    />
                    */}
                </div>
            </div>
            <ListHeaderWrapper selected={header} items={headers}>
                <div className="ms-Grid" dir="ltr">
                    <div className="col-Grid-row">
                        {items.map((v, i) => <div key={i} className="ms-Grid-col ms-sm3 ms-lg3"><WorkItem onChange={this.onItemChange} onClose={() => hub.unlockItem(v.id)} checkCanEdit={async () => await this.onItemOpen(v)} item={v} /></div>)}
                    </div>
                </div>
                <DefaultButton secondaryText="Opens the Create Panel" text="Add" onClick={this._onShowPanel} iconProps={{ iconName: "Add" }} styles={{ root: { float: "right", backgroundColor: "#0078d4", color: "white", position: "fixed", top: "75", right: "50" } }} />
                <Panel
                    isOpen={this.state.showPanel}
                    type={PanelType.smallFixedFar}
                    onDismiss={this._onClosePanel}
                    headerText="What would you like to say?"
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <TextField required={true} label="Title" id="newItemNameField" onChange={(props, v) => { if (v) this.newItem.name = v }} />
                    <TextField required={true} label="Description" multiline rows={10} id="newItemDescField" onChange={(props, v) => { if (v) this.newItem.content = v }} />
                </Panel>
            </ListHeaderWrapper>
        </div >);
    }
}

ReactDOM.render(<WorkItems />, document.getElementById('app'));

Array.prototype.groupBy = function (key) {
    return this.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, []);
};