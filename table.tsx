import * as React from "react";
import { NappPagination, PNappPaginationProps } from "./pagination";


export interface PNappTableColumn<T> {

    key?: string
    title?: string

    align?: 'center' | 'right'

    render?: (row: T, i: number, array: T[]) => React.ReactNode
}
export interface PNappTable<T> {


    items: T[]

    paging?: PNappPaginationProps

    columns: PNappTableColumn<T>[]

}

export class NappTable<T> extends React.Component<PNappTable<T>, {}> {

    render() {
        let columns = this.props.columns || [];
        let paging = this.props.paging;
        let items = this.props.items;
        return <table className="table is-bordered is-fullwidth">
            <thead>
                {columns.map((it, i) => {
                    return <th key={`h${i}`}>
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
    }
}


