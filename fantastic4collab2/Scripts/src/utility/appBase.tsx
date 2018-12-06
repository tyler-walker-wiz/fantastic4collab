import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { Overlay } from 'office-ui-fabric-react/lib/components/Overlay';

export abstract class BaseReactPage<P, S> extends React.Component<P, S>
{
    wrapRefreshPage = (promise:Promise<any>) => {
        return async () => {
            try {
                await promise;
            }
            catch (e) {
                alert(e);
                console.error(e);
            }
        }
    }
    abstract onRender(): React.ReactNode;

    public render() {
        if (!this.state)
            return <Spinner size={SpinnerSize.large} />
        return this.onRender();
    }
}

interface LoadingState { loaded: boolean, loading?: boolean }
export abstract class BaseReactPageLoaded<P={}, S = {}> extends BaseReactPage<P, S extends LoadingState ? S : (LoadingState & S)>
{
    defaultProps = { spinnerSize: SpinnerSize.large, loadingText: "Loading...", spinnerMarginTop: 40 };
    abstract onLoad?(): void;
    async componentWillMount() {
        if (this.onLoad)
            await this.onLoad();
    }

    public render() {
        if (!this.state || !this.state.loaded) {
            let { loadingText, spinnerMarginTop, spinnerSize } = this.defaultProps;
            return <div style={{ marginTop: spinnerMarginTop }}><Spinner label={loadingText} size={spinnerSize} /></div>;
        }
        let { loading } = this.state;
        let contents: React.ReactNode;
        try {
            contents = this.onRender();
        } catch (e) {
            alert(e);
            loading = true;
            console.error(e);
        }
        if (loading)
            return <div>{contents}<Overlay style={{ zIndex: 200 }} isDarkThemed={false}></Overlay></div>;
        return contents;
    }
}

export abstract class BaseReactPageBasicHandleLoad<P = {}, S = {}> extends BaseReactPageLoaded<P, S extends { loaded?: boolean } ? S : (S & { loaded?: boolean })>
{
    abstract handleLoad(): Promise<boolean | void> | void;
    async onLoad() {
        let result = await this.handleLoad();
        if (result != false && !this.state || !this.state.loaded)
            this.setState({ loaded: true });
    }
}