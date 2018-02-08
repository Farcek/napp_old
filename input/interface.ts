import {IFormError} from '../interface';
export interface INappInput {
    Name: string
    Label: string

    Value: any

    Placeholder?: string

    Distabled?: boolean
    Readonly?: boolean

    Error? : IFormError

}

export interface INappInputIcon {
    Icon?: string
}
