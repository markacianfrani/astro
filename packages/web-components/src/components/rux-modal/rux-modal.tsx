import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Element,
    Listen,
    Host,
    Watch,
} from '@stencil/core'

/**
 * @part modal-wrapper - the modal wrapper overlay
 * @part modal-header - The header container of modal
 * @part modal-content - The message container of modal
 * @part modal-footer - The footer container of modal
 *
 * @slot header - the header of the modal
 * @slot (default) - the content of the modal
 * @slot footer - the footer of the modal
 */
@Component({
    tag: 'rux-modal',
    styleUrl: 'rux-modal.scss',
    shadow: { delegatesFocus: true },
})
export class RuxModal {
    /**
     * Shows and hides modal
     */
    @Prop({ reflect: true, mutable: true }) open: boolean = false
    /**
     * Allows modal to close by clicking off of it
     */
    @Prop() clickToClose: boolean = false
    /**
     * Modal body message
     */
    @Prop() modalMessage?: string
    /**
     * Modal header title
     */
    @Prop() modalTitle?: string
    /**
     * Text for confirmation button
     */
    @Prop() confirmText: string = 'Confirm'
    /**
     * Text for close button
     */
    @Prop() denyText: string = 'Cancel'
    /**
     * Event that is fired when modal closes
     */

    /**
     * Event that is fired when modal closes
     */
    @Event({
        eventName: 'ruxmodalclosed',
        composed: true,
        bubbles: true,
    })
    ruxModalClosed!: EventEmitter<boolean>

    /**
     * Event that is fired when modal opens
     */
    @Event({
        eventName: 'ruxmodalopened',
        composed: true,
        bubbles: true,
    })
    ruxModalOpened!: EventEmitter<boolean>

    @Element() element!: HTMLRuxModalElement

    @Watch('open')
    handleOpenChange(newValue: boolean) {
        // This will only toggle between true and false.
        // If the new value is true, that means open. Emit open event
        if (newValue) {
            this.ruxModalOpened.emit(true)
            if (this.modalMessage) {
                this._getDefaultButton()
            }
        } else {
            this.ruxModalClosed.emit(true)
        }
    }

    // close modal if click happens outside of dialog
    @Listen('click', { target: 'window' })
    handleClick(ev: MouseEvent) {
        if (this.clickToClose) {
            const wrapper = this._getWrapper()
            if (ev.composedPath()[0] === wrapper) {
                this.ruxModalClosed.emit(false)
                this.open = false
            }
        }
    }

    connectedCallback() {
        this._focusDefaultButton()
        this._handleModalChoice = this._handleModalChoice.bind(this)
    }
    componentDidLoad() {
        this._focusDefaultButton()
    }
    private _focusDefaultButton() {
        if (this.modalMessage) {
            setTimeout(() => {
                const button = this._getDefaultButton()
                button && button.focus()
            })
        }
    }

    private _handleModalChoice(e: MouseEvent) {
        // convert string value to boolean
        const target = e.currentTarget as HTMLElement
        const choice = target.dataset.value === 'true'
        this.ruxModalClosed.emit(choice)
        this.open = false
    }

    private _getDefaultButton(): HTMLElement | null {
        const buttonSet = this.element?.shadowRoot?.querySelectorAll(
            'rux-button:not([hidden])'
        ) as NodeListOf<HTMLElement>

        if (buttonSet.length > 0) {
            const defaultButton = buttonSet[buttonSet.length - 1]
            return defaultButton
        }

        return null
    }

    private _getWrapper(): HTMLElement | null {
        const wrapper = this.element?.shadowRoot?.querySelector(
            '.rux-modal__wrapper'
        ) as HTMLElement

        if (wrapper) {
            return wrapper
        }
        return null
    }

    connectedCallback() {
        setTimeout(() => {
            const button = this._getDefaultButton()
            button && button.focus()
        })
        this._handleModalChoice = this._handleModalChoice.bind(this)
    }

    // componentDidLoad() {
    //     setTimeout(() => {
    //         const button = this._getDefaultButton()
    //         button && button.focus()
    //     })
    // }

    render() {
        const {
            open,
            modalMessage,
            modalTitle,
            confirmText,
            denyText,
            _handleModalChoice,
        } = this
        return (
            open && (
                <Host>
                    <div part="modal-wrapper" class="rux-modal__wrapper">
                        <dialog class="rux-modal__dialog" role="dialog">
                            {modalTitle ? (
                                <header class="rux-modal__props-titlebar">
                                    <div>{modalTitle}</div>
                                </header>
                            ) : (
                                <header
                                    part="modal-header"
                                    class="rux-modal__titlebar"
                                >
                                    <slot name="header"></slot>
                                </header>
                            )}
                            {modalMessage ? (
                                <div class="rux-modal__props-content">
                                    <div class="rux-modal__props-message">
                                        {modalMessage}
                                    </div>
                                    <rux-button-group
                                        class="props-button-group"
                                        h-align="right"
                                    >
                                        <rux-button
                                            secondary={confirmText.length > 0}
                                            onClick={_handleModalChoice}
                                            data-value="false"
                                            hidden={!denyText}
                                            tabindex="-1"
                                        >
                                            {denyText}
                                        </rux-button>
                                        <rux-button
                                            onClick={_handleModalChoice}
                                            data-value="true"
                                            hidden={!confirmText}
                                            tabindex="0"
                                        >
                                            {confirmText}
                                        </rux-button>
                                    </rux-button-group>
                                </div>
                            ) : (
                                <div>
                                    <div
                                        part="modal-content"
                                        class="rux-modal__content"
                                    >
                                        <slot></slot>
                                    </div>
                                    <footer
                                        part="modal-footer"
                                        class="rux-modal__footer"
                                    >
                                        <slot name="footer"></slot>
                                    </footer>
                                </div>
                            )}
                        </dialog>
                    </div>
                </Host>
            )
        )
    }
}

/*
{modalTitle && (
     <header class="rux-modal__titlebar">
        <div>{modalTitle}</div>
    </header>
)}
<div class="rux-modal__message">
                                    {modalMessage}
                                </div>
<rux-button-group h-align="right">
                                    <rux-button
                                        secondary={confirmText.length > 0}
                                        onClick={_handleModalChoice}
                                        data-value="false"
                                        hidden={!denyText}
                                        tabindex="-1"
                                    >
                                        {denyText}
                                    </rux-button>
                                    <rux-button
                                        onClick={_handleModalChoice}
                                        data-value="true"
                                        hidden={!confirmText}
                                        tabindex="0"
                                    >
                                        {confirmText}
                                    </rux-button>
                                </rux-button-group>
*/
