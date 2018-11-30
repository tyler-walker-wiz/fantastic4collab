import * as React from 'react';
import * as ReactDOM from 'react-dom'


interface IWorkItemsState {
    items: IWorkItem[];
}

interface IWorkItem {
    id: string;
    name: string;
    description: string;
}

class WorkItems extends React.Component<{}, IWorkItemsState>{
    render() {
        let items = [];
        items.push({ id: "1", name: "Title", description: "This is a great description" } as IWorkItem);
        return (<div>
            <h2>Welcome to the App</h2>
            {items.map(i => <WorkItem item={i} />)}
        </div>);
    }
}

interface ICommentBoxProps {
    item: IWorkItem;
}

class WorkItem extends React.Component<ICommentBoxProps, {}> {
    render() {
        let { item } = this.props;
        return (
            <div style={{ margin: '10px', padding: '10px', border: '1px solid gray', backgroundColor: 'lightred' }}>
                <div className="commentBox">{item && item.name}</div>
                <p>{item && item.description}</p>
            </div>
        );
    }
}

ReactDOM.render(<WorkItems />, document.getElementById('app'));