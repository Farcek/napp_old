import * as React from "react";
import { INappInput, INappInputIcon } from "./interface";

export interface NappInputSelectOption {
    value: any, label: string
}
export interface NappInputSelectProps extends INappInput, INappInputIcon {

    Values: NappInputSelectOption[]
    Value: any
}

export class NappInputSelect extends React.Component<NappInputSelectProps, {}> {

    get controlClass() {
        //className="control has-icons-left has-icons-right"
        return `${this.props.Icon ? 'has-icons-left' : ''} ${(this.isError || this.isSuccess) ? 'has-icons-right' : ''}`
    }

    get stateClass() {
        if (this.isError) {
            return "is-danger"
        } else if (this.isSuccess) {
            return "is-success"
        }
        return ""
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
        let icon = this.props.Icon || false;

        return <div className="field">
            <label className="label">{this.props.Label}</label>
            <div className={`control ${this.controlClass}`}>
                <div className={`select ${this.stateClass}  is-fullwidth`}>
                    <select name={this.props.Name} defaultValue={this.props.Value} >
                        {this.props.Placeholder
                            ? <option hidden>{this.props.Placeholder}</option>
                            : null
                        }
                        <option  value="">-- Сонго --</option>
                        {this.props.Values.map((it, i) => {
                            return <option key={i} value={it.value} selected={this.props.Value == it.value}>{it.label}</option>
                        })}

                    </select>
                </div>
                {this.props.Icon
                    ? <span className="icon is-small is-left"><i className={`fa fa-${this.props.Icon}`}></i></span>
                    : null
                }
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

