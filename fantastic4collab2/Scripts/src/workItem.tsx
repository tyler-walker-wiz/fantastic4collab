import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';

export interface IWorkItem {
    id: string;
    name: string;
    content: string;
    groupId: string;
    groupName?: string;
    locked?: boolean;
}

interface WorkItemState {
    showModal: boolean;
    locked: boolean;
    loading: boolean;
}

export class WorkItem extends React.Component<IWorkItemProps, WorkItemState> {
    private _contentPlaceholder = "";
    private _showModal = async () => {
        let { showModal: isShowing } = this.state;
        let { checkCanEdit, onOpen } = this.props;
        if (!isShowing) {
            if (checkCanEdit) {
                let locked = await checkCanEdit();
                this.setState({ showModal: true, locked });
            }
            else
                this.setState({ showModal: true });
            if (onOpen)
                onOpen();
        }
    }

    //private _showModal = async () => {
    //    let { showModal: isShowing } = this.state;
    //    if (!isShowing)
    //        this.setState({ showModal: true });
    //}

    private _closeModal = () => {
        let isShowing = this.state.showModal;
        if (isShowing) {
            if (this.props.onClose)
                this.props.onClose();
            setTimeout(() => {
                this.setState({ showModal: false });
            }, 300);
        }
    }

    private _onChange = (value: string, item: IWorkItem) => {
        this._contentPlaceholder = value;
        this.setState({ loading: true });
        setTimeout(() => {
            if (value === this._contentPlaceholder) {
                console.log("changing... " + this._contentPlaceholder)
                item.content = this._contentPlaceholder;
                if (this.props.onChange) {
                    this.props.onChange(item).then((updated) => {
                        this.setState({ loading: false });
                    });
                }
                else
                    this.setState({ loading: false });
            }
        }, 300);
    }

    render() {
        let { item } = this.props;
        let locked = !(this.state && this.state.locked);
        let loading = this.state.loading;
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
                        <TextField styles={{ root: {} }} disabled={locked} onChange={(e, val) => this._onChange(val as string, item)} multiline rows={10} value={this._contentPlaceholder} />
                        {loading && <Spinner label="Saving..." styles={{ root: { float: "left" } }} size={SpinnerSize.small} labelPosition="left" />}
                        <DefaultButton onClick={this._closeModal} text="Close" style={{ position: "absolute", right: "45", bottom: "30" }} />
                    </div>
                </div>
            </Modal>
        </div >
        );
    }
    componentWillMount() {
        this._contentPlaceholder = this.props.item && this.props.item.content;
        this.setState({ showModal: false });
    }
}
interface IWorkItemProps {
    item: IWorkItem;
    onChange: (item: IWorkItem) => Promise<boolean>;
    onOpen?: () => void;
    onClose: () => void;
    checkCanEdit: () => Promise<boolean>;
}
