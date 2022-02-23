import { Element, State, Component, Prop, Host, h } from '@stencil/core'

@Component({
    tag: 'rux-track',
    styleUrl: 'rux-track.scss',
    shadow: true,
})
export class RuxTrack {
    @Element() el!: HTMLRuxTrackElement
    @State() timelineColumns = 0
    @State() trackScrollWidth = 0

    @Prop({ reflect: true }) track?: number | undefined = 0
    @Prop({ reflect: true }) width = 0
    @Prop({ reflect: true }) columns = 0

    connectedCallback() {
        this._handleSlotChange = this._handleSlotChange.bind(this)
    }

    componentWillLoad() {
        this.initializeRows()
        // this._getScrollWidth()

        const timeline = this.el.closest('rux-timeline')

        timeline?.fetchColumns().then((r) => {
            this.timelineColumns = r
        })
    }

    // componentDidLoad() {
    //     // const children = this.el.shadowRoot?.children;
    //     // if(children) {
    //     //     const trackDiv = children[1];
    //     //     this.trackScrollWidth = trackDiv.scrollWidth;
    //     // }
    //     this._getScrollWidth()
    // }

    // componentWillUpdate() {
    //     this._getScrollWidth()
    //     console.log(this.trackScrollWidth, 'Scroll width in will update')
    // }
    componentDidUpdate() {
        this._getScrollWidth()
        console.log(this.trackScrollWidth, 'Scroll width in DID update')
    }

    private _getScrollWidth() {
        const children = this.el.shadowRoot?.children
        if (children) {
            const trackDiv = children[1]
            this.trackScrollWidth = trackDiv.scrollWidth - 200 //? why minus 200?
        }
        return this.trackScrollWidth
    }

    initializeRows() {
        const childNodes = this.el.childNodes
        const children = Array.prototype.filter.call(
            childNodes,
            (node) => node.nodeType == Node.ELEMENT_NODE
        )

        children.forEach((el) => {
            el.track = this.track
        })
    }

    private _handleSlotChange() {
        //TODO
    }

    renderDebug() {
        return (
            <div style={{ display: 'contents' }}>
                {[...Array(this.timelineColumns)].map((_: any, i: any) => (
                    <div
                        style={{
                            gridRow: `${this.track}`,
                            gridColumn: `${i + 2} / ${++i + 2}`,
                        }}
                        class={{
                            cell: true,
                            marker: i % 60 === 0,
                        }}
                        part="cell"
                    ></div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <Host>
                <div
                    class="rux-timeline rux-track"
                    id="rux-track"
                    style={{
                        gridTemplateColumns: `[header] 200px repeat(${this.columns}, ${this.width}px)`,
                    }}
                    part="container"
                >
                    <div
                        class="border"
                        style={{
                            width: `${this.trackScrollWidth}px`,
                        }}
                    ></div>
                    <div
                        class="rux-track__header"
                        style={{
                            gridRow: '1',
                        }}
                    >
                        <slot name="label"></slot>
                    </div>
                    <slot onSlotchange={this._handleSlotChange}></slot>
                </div>
                {/* {this.renderDebug()} */}
            </Host>
        )
    }
}
