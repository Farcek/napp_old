import * as React from "react";

export interface PNappPaginationProps {
    total?: number
    page?: number

    limit?: number

    uri?: (page: number, limit: number) => string

    maxpage?: number
}

export class NappPagination extends React.Component<PNappPaginationProps, {}> {

    // @Input('paging-page') private _page: number = 1;
    // @Input('paging-total') private _total: number;
    // @Input('paging-max') private _max: number = 8;
    // @Input('paging-limit') private _limit: number = 10;
    // @Output('paging-on-change-page') onChance = new EventEmitter();

    get page() {
        return this.props.page || 0;
    }

    get maxpage() {
        return this.props.maxpage || 10;
    }

    get limit() {
        return this.props.limit || 10;
    }

    get total() {
        return this.props.total || 0;
    }

    get totalPage() {
        var limit = this.limit;
        return (limit && Math.ceil(this.total / limit)) || 0;
    }

    get startPage() {
        let pr = Math.round(this.maxpage / 2);
        var p = this.page - pr;
        return p < 0 ? 0 : p;
    }
    get endPage() {
        var pr = Math.round(this.maxpage / 2), t = this.totalPage;
        var p = this.page + pr;
        return p > t ? t : p;
    }

    get pages() {
        var r = [];
        for (var i = this.startPage; i < this.endPage; i++) {
            r.push(i);
        }
        return r;
    }

    get hasFirst() {
        return this.startPage > 0;
    }
    get hasFirstRange() {
        return this.startPage > 1;
    }
    get hasLast() {
        return this.endPage < this.totalPage - 1;
    }
    get hasLastRange() {
        return this.endPage < this.totalPage - 2;
    }

    get hasNext() {
        return this.page < this.totalPage - 1
    }
    get hasPrev() {

        return this.page > 0
    }

    get spy() {
        return 'total>' + this.total + typeof (this.total) + 'page>' + this.page + typeof (this.page)
    }

    render() {

        let uri = this.props.uri || ((p: number, l: number) => `?page=${p}&limit=${l}`);
        return <nav className="pagination">
            {this.hasPrev
                ? <a className="pagination-previous" href={uri(this.page - 1, this.limit)} > &laquo; </a>
                : null
            }
            {this.hasNext
                ? <a className="pagination-next" href={uri(this.page + 1, this.limit)} > &raquo; </a>
                : null
            }
            <ul className="pagination-list">
                {this.hasFirst
                    ? <li ><a className="pagination-link" href={uri(0, this.limit)} >1</a></li>
                    : null
                }
                {this.hasFirstRange
                    ? <li ><span className="pagination-ellipsis">&hellip;</span></li>
                    : null
                }

                {this.pages.map((p,i) => {
                    return <li key={i}>
                        <a className={`pagination-link ${p == this.page ? 'is-current' : ''}`} href={uri(p, this.limit)}>{p + 1}</a>
                    </li>;
                })}
                {this.hasLastRange
                    ? <li ><span className="pagination-ellipsis">&hellip;</span></li>
                    : null
                }
                {this.hasLast
                    ? <li ><a className="pagination-link" href={uri(this.totalPage, this.limit)}>{this.totalPage + 1}</a></li>
                    : null
                }
            </ul>
        </nav >;
    }
}
