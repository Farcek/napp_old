import * as React from "react";

export interface PNappMessageProps {
    message: string
}

export class NappMessageInfo extends React.Component<PNappMessageProps, {}> {

    render() {
        if (this.props.message && typeof this.props.message === 'string') {
            return <article className="message is-info">
                <div className="message-body">
                    {this.props.message}
                </div>
            </article>
        }
        return null
    }
}

export class NappMessageError extends React.Component<PNappMessageProps, {}> {

    render() {
        if (this.props.message && typeof this.props.message === 'string') {
            return <article className="message is-danger">
                <div className="message-body">
                    {this.props.message}
                </div>
            </article>
        }
        return null
    }
}

