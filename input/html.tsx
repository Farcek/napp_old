import * as React from "react";
import { INappInput, INappInputIcon } from "./interface";

const uuid = require('uuid/v4');
export interface PNappInputHtmlProps extends INappInput {
    Value: string

    ckConfig: any
}

export class NappInputHtml extends React.Component<PNappInputHtmlProps, {}> {

    get controlClass() {
        //className="control has-icons-left has-icons-right"
        return `control ${(this.isError || this.isSuccess) ? 'has-icons-right' : ''}`
    }

    get inputClass() {
        if (this.isError) {
            return "textarea is-danger"
        } else if (this.isSuccess) {
            return "textarea is-success"
        }
        return "textarea"
    }

    get isError() {
        return this.props.Error && this.props.Error.properties && this.props.Name in this.props.Error.properties && this.props.Error.properties[this.props.Name].length > 0
    }
    get isSuccess() {
        if (this.props.Error && this.props.Error.properties) {
            if (this.props.Name in this.props.Error.properties) {
                return this.props.Error.properties[this.props.Name].length < 1
            }
            return true
        }
        return false
    }

    showError() {
        if (this.props.Error && this.props.Error.properties && this.props.Name in this.props.Error.properties) {
            let errors = this.props.Error.properties[this.props.Name];
            return errors.map(err => {
                return <div className="help is-danger">{err}</div>
            })
        }
        return null;
    }

    render() {

        return <div className="field">
            <label className="label">{this.props.Label}</label>
            <div className={this.controlClass} napp-input-html={JSON.stringify(this.props.ckConfig || {})}>
                <textarea hidden={true} name={this.props.Name} defaultValue={this.props.Value}></textarea>
                <div className="textarea content" style={{ height: "auto", minHeight:"800px", maxHeight: "none" }} app-component="html-editor" contentEditable={true} dangerouslySetInnerHTML={{ __html: this.props.Value }}></div>
                {/* <div className="napp-input-html-editor">
                </div> */}
                {this.isError
                    ? <span className="icon is-small is-right has-text-danger" ><i className="fa fa-exclamation-triangle"></i></span>
                    : null
                }
                {this.isSuccess
                    ? <span className="icon is-small is-right has-text-success"><i className="fa fa-check"></i></span>
                    : null
                }
            </div>
            {this.showError()}
            {this.props.children}
        </div>
    }
}

