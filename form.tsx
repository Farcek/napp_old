import * as React from "react";
import { IFormError } from "./interface";



export interface INappFormProps {
    action?: string
    method?: string
    error?: IFormError

    
    cancelAction?: string
}

export class NappForm extends React.Component<INappFormProps, {}> {

    showError() {
        if (this.props.error && this.props.error.message) {
            return <article className="message is-danger">
                <div className="message-body">
                    {this.props.error.message}
                </div>
            </article>
        }
        return null
    }

    render() {
        return <form action={this.props.action || ''} method={this.props.method || 'post'} encType="application/x-www-form-urlencoded" >
            {this.showError()}
            {this.props.children}
            <div className="field is-grouped is-grouped-centered">
                <p className="control">
                    <button type="submit" className="button is-primary">
                        <span className="icon"><i className="fa fa-check" /></span><span>Илгээх</span>
                    </button>
                </p>
                {this.props.cancelAction
                    ? <p className="control">
                        <a href={this.props.cancelAction} className="button is-light">
                            <span className="icon"><i className="fa fa-undo" /></span><span>Болих</span>
                        </a>
                    </p>
                    : null
                }
            </div>
            <div style={{padding : "3rem"}}></div>
        </form>;
    }
}

