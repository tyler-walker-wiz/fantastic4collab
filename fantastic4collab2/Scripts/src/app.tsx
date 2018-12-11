import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TagPicker, ITag } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import 'jquery';
import { IWorkItem, WorkItem } from './workItem';
import { BaseReactPageBasicHandleLoad } from './utility/appBase'
import { HubHandler } from './utility/hubHandler';
import { ListHeaderWrapper } from './itemHeader';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
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
}

class WorkItems extends BaseReactPageBasicHandleLoad<{}, IWorkItemsState>{
    async handleLoad() {
        await setTimeout(() => { }, 1000);
        let hub = new HubHandler(this.onConnected, this.onReceive, "broadcastMessage", { "getEverything": this.retrieveInit });
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
        this.setState({ items });
    }
    onItemChange = (item: IWorkItem) => {
        this.state.hub.update(item.groupId, item.id, item.name, item.content);
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
                <PrimaryButton onClick={this._onClosePanel} style={{ marginRight: '8px' }}>
                    Save
        </PrimaryButton>
                <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
            </div>
        );
    };
    onRender() {
        let { items, headers } = this.state;
        if (!headers)
            headers = [{ name: "Good one", onClick: () => alert("clicked"), url: "#" }];
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
            <ListHeaderWrapper items={headers}>
                <div className="ms-Grid" dir="ltr">
                    <div className="col-Grid-row">
                        {items.map((v, i) => <div key={i} className="ms-Grid-col ms-sm3 ms-lg3"><WorkItem onChange={this.onItemChange} locked={false} item={v} /></div>)}
                    </div>
                </div>
                <DefaultButton secondaryText="Opens the Create Panel" text="Add" onClick={this._onShowPanel} iconProps={{ iconName: "Add" }} styles={{ root: { float: "right", backgroundColor: "#0078d4", color: "white", position: "absolute", top: "50", right: "50" } }} />
                <Panel
                    isOpen={this.state.showPanel}
                    type={PanelType.smallFixedFar}
                    onDismiss={this._onClosePanel}
                    headerText="Panel - Small, right-aligned, fixed, with footer"
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <TextField required={true} label="Title" />
                    <TextField required={true} label="Description" multiline rows={10} />
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