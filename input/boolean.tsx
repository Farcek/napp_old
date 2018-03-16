import * as React from "react";

import { IFormError } from '../interface';
export interface INappInputBoolean {

    Name: string
    Label: string

    Distabled?: boolean
    Readonly?: boolean

    Error?: IFormError
    Value: boolean | null
}

export class NappInputBoolean extends React.Component<INappInputBoolean, {}> {






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

        let val = !!this.props.Value;

        return <div className="field">

            <label className="checkbox">
                <input type="checkbox" name={this.props.Name} defaultValue="1"
                    checked={val}
                    disabled={(this.props.Readonly || this.props.Distabled) ? true : false} />
                <span>{this.props.Label}</span>
            </label>


            {this.showError()}
            {this.props.children}
        </div>
    }
}

