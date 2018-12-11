import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface IWorkItem {
    id: string;
    name: string;
    content: string;
    groupId: string;
    groupName?: string;
}

interface WorkItemState {
    showModal: boolean;
}

export class WorkItem extends React.Component<IWorkItemProps, WorkItemState> {
    private _showModal = () => {
        let isShowing = this.state.showModal;
        if (!isShowing)
            this.setState({ showModal: true });
    }

    private _closeModal = () => {
        let isShowing = this.state.showModal;
        if (isShowing)
            this.setState({ showModal: false });
    }

    private onChange = (value: string, item: IWorkItem) => {
        item.content = value;
        if (this.props.onChange)
            this.props.onChange(item);
    }

    render() {
        let { item, locked } = this.props;
        return (<div>
            <div onDoubleClick={this._showModal} style={{ margin: '10px', color: 'rgb(0, 120, 212)', border: '1px solid lightgray', borderRadius: '5px' }}>
                <div className="commentBox" style={{ margin: "10px" }}>{item && item.name}</div>
                <div style={{ display: "inline-block", width: "100%", backgroundColor: "lightgray" }}>
                    <p style={{ margin: "10px" }}>{item && item.content}</p>
                </div>
            </div>
            <Modal
                titleAriaId="titleId"
                subtitleAriaId="subtitleId"
                isOpen={this.state.showModal}
                onDismiss={this._closeModal}
                isBlocking={false}
                containerClassName="ms-modalExample-container"
            >
                <div className="ms-modalExample-header">
                    <span id="titleId">{item.name}</span>
                </div>
                <div id="subtitleId" className="ms-modalExample-body">
                    <div style={{ margin: "20px" }}>
                        <TextField styles={{ field: {} }} disabled={locked} onChange={(e, val) => this.onChange(val as string, item)} multiline rows={10} value={item && item.content} />
                        <DefaultButton onClick={this._closeModal} text="Close" style={{ float: "right" }} />
                    </div>
                </div>
            </Modal>
        </div >
        );
    }
    componentWillMount() {
        this.setState({ showModal: false });
    }
}
interface IWorkItemProps {
    item: IWorkItem;
    locked: boolean;
    onChange: (item: IWorkItem) => void;
}
