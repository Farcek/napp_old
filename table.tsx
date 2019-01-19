import * as React from "react";
import { NappPagination, PNappPaginationProps } from "./pagination";


export interface PNappTableColumn<T> {

    key?: string
    title?: string

    align?: 'center' | 'right'
    size?: string
    render?: (row: T, i: number, array: T[]) => React.ReactNode
}

export interface PNappTableAction {
    label: string;
    icon?: string;
    url?: string;
    type?: string;
}
export interface PNappTable<T> {
    title?: string;
    items: T[];

    paging?: PNappPaginationProps;

    actions?: PNappTableAction[];

    columns: PNappTableColumn<T>[];

}

export class NappTable<T> extends React.Component<PNappTable<T>, {}> {

    render() {
        let columns = this.props.columns || [];
        let paging = this.props.paging;
        let items = this.props.items;
        let actions = this.props.actions;
        let title = this.props.title;
        return <div>
            <div className="level">
                <div className="level-left">
                    {title
                        ? <div className="level-item">{title}</div>
                        : null
                    }
                </div>
                {actions && actions.length
                    ? <div className="level-right">
                        <div className="level-item">
                            <div className="buttons is-right">
                                {actions.map((it, i) => {
                                    return <a key={i} href={it.url || '#'}
                                        className={`button ${it.type ? 'is-' + it.type : 'is-success'}`}>
                                        {it.icon
                                            ? <span className="icon"><i className={`fa fa-${it.icon}`} /> </span>
                                            : null
                                        }
                                        <span>{it.label}</span>
                                    </a>
                                })}
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            <table className="table is-bordered is-fullwidth">
                <thead>
                    {columns.map((it, i) => {
                        return <th key={`h${i}`} style={it.size ? { width: it.size } : {}}>
                            {it.title || it.key}
                        </th>
                    })}
                </thead>
                <tbody>
                    {items.map((row, i, arr) => {
                        return <tr key={`r${i}`}>
                            {columns.map((col, j) => {
                                let tdClass = `${col.align == 'center' ? 'has-text-centered' : ''} ${col.align == 'right' ? 'has-text-right' : ''}`;
                                return <td key={`c${j}`} className={tdClass}>
                                    {col.render ? col.render(row, i, arr) : (row as any)[col.key || '']}
                                </td>
                            })}
                        </tr>
                    })}
                    {items.length == 0
                        ? <tr><td colSpan={columns.length}>
                            Мэдээлэл алга байна
                    </td></tr>
                        : null
                    }
                </tbody>
                <tfoot>
                    {paging
                        ? <tr><td colSpan={columns.length}>
                            <NappPagination
                                total={paging.total}
                                limit={paging.limit}
                                page={paging.page}
                                uri={paging.uri}
                            />
                        </td></tr>
                        : null
                    }
                </tfoot>
            </table>
        </div>
    }
}


