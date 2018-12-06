import * as React from 'react';

export interface IWorkItem {
    id: string;
    title: string;
    content: string;
}

export class WorkItem extends React.Component<IWorkItemProps, {}> {
    render() {
        let { item } = this.props;
        return (
            <div style={{ margin: '10px', padding: '10px', border: '1px solid gray', backgroundColor: 'lightred' }}>
                <div className="commentBox">{item && item.title}</div>
                <p>{item && item.content}</p>
            </div>
        );
    }
}
interface IWorkItemProps {
    item: IWorkItem;
}
