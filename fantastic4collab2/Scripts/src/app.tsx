import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IWorkItem, WorkItem } from './workItem';
import {BaseReactPageBasicHandleLoad} from './utility/appBase'


interface IWorkItemsState {
    items: IWorkItem[];
}

class WorkItems extends BaseReactPageBasicHandleLoad<{}, IWorkItemsState>{
    async handleLoad() {
        await setTimeout(() => { }, 1000);
    }
    dummyData: IWorkItem[] = [{
        id: "1",
        title: "Item 1",
        content: "Some content"
    },
    {
        id: "2",
        title: "Item 2",
        content: "Some revised content"
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
    }];
    onRender() {
        let items = this.dummyData;
        items.push({ id: "5", title: "Title", content: "This is a great description" } as IWorkItem);
        return (<div>
            <h2>Welcome to the App</h2>
            {items.map(i => <WorkItem item={i} />)}
        </div>);
    }
}


ReactDOM.render(<WorkItems />, document.getElementById('app'));