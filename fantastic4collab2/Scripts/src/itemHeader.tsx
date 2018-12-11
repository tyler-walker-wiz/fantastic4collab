import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export class ListHeaderWrapper extends React.Component<IListHeaderProps, {}> {
    render() {
        let { items, children } = this.props;
        return (<div>
            <div style={{ clear: "both" }}>
                <div className="ms-NavExample-LeftPane" style={{ width: "208px", height: "500px", border: "1px solid #EEE", float: "left", overflowY: "auto" }}>
                    <Nav
                        groups={[
                            {
                                name: "Group",
                                links: items
                            }
                        ]}
                        expandedStateText={'expanded'}
                        collapsedStateText={'collapsed'}
                        selectedKey={'key3'}
                        expandButtonAriaLabel={'Expand or collapse'}
                    />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>);
    }
}
interface IListHeaderProps {
    items: INavLink[];
    vertical?: boolean;
}