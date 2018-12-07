import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TagPicker, ITag } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import 'jquery';
import { IWorkItem, WorkItem } from './workItem';
import { BaseReactPageBasicHandleLoad } from './utility/appBase'
import { HubHandler } from './utility/hubHandler'

interface IResponse {
    item: IWorkItem;
}

interface IWorkItemsState {
    hub: HubHandler<IResponse>;
    name: string;
    id: string;
    items: IWorkItem[];
}

class WorkItems extends BaseReactPageBasicHandleLoad<{}, IWorkItemsState>{
    async handleLoad() {
        await setTimeout(() => { }, 1000);
        let hub = new HubHandler(this.onConnected, this.onReceive, "broadcastMessage", { "getEverything": this.retrieveInit });
        let name = prompt("Enter name: ") as string;
        this.setState({ hub, name, items: this.dummyData });
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
        alert("Connected");
    }
    retrieveInit = (e: any) => {
        alert(JSON.stringify(e));
    }
    dummyData: IWorkItem[] = [{
        id: "1",
        title: "Item 1",
        content: "Some content"
    },
    {
        id: "2",
        title: "Item 2",
        content: `Some revised content Some revised content Some revised content Some revised content Some revised content
        Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content Some revised content`
    },
    {
        id: "3",
        title: "Item 3",
        content: "Car"
    },
    {
        id: "4",
        title: "Item 4",
        content: "Plane"
    },
    { id: "5", title: "Title", content: "This is a great description" }
    ];
    private _getTextFromItem(item: any): any {
        return item.name;
    }
    private _onFilterChanged = (filterText: string, tags: ITag[] | undefined): ITag[] => {
        return tags ?
            tags.filter(t => this.state.items.some(i => i.title.indexOf(t.name) > -1)) : [];
    };
    onRender() {
        let { items } = this.state;
        return (<div>
            <h2>Welcome to the App</h2>
            Group:
            <div className="ms-Grid" dir="ltr">
                <div className="col-Grid-row">
                    <TagPicker
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
                </div>
            </div>
            <div className="ms-Grid" dir="ltr">
                <div className="col-Grid-row">
                    {items.map((v, i) => <div key={i} className="ms-Grid-col ms-sm4 ms-lg4"><WorkItem item={v} /></div>)}
                </div>
            </div>
        </div>);
    }
}

ReactDOM.render(<WorkItems />, document.getElementById('app'));

Array.prototype.groupBy = function (key) {
    return this.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, []);
};