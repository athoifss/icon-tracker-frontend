import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	LoadingComponent,
	Pagination,
	SortHolder,
	TxTableHead,
	TxTableBody,
	NoBox
} from '../../../components/';
import {
	TX_TYPE,
	TX_TYPE_DATA
} from '../../../utils/const'
import {
	calcMaxPageNum
} from '../../../utils/utils';

class TxPage extends Component {

	constructor(props) {
		super(props);

		this.txType = ''
		this.urlIndex = ''
		this.pageId = 1
		this.getTxList = () => { }
	}

	getTxTypeData = () => {
		return TX_TYPE_DATA[this.txType] || {}
	}

	componentWillMount() {
		this.initPageType(this.props.url.pathname)
	}

	componentWillReceiveProps(nextProps) {
		const current = this.props.url.pathname
		const next = nextProps.url.pathname
		if (current !== next) {
			this.initPageType(next)
		}
	}

	initPageType = (pathname) => {
		this.txType = pathname.split("/")[1] || ''
		this.urlIndex = pathname.split("/")[2] || ''
		this.pageId = pathname.split("/")[3] || 1
		this.getTxList = this.props[this.getTxTypeData()['getTxList']] || (() => { })
		this.getTxListByCount(20)
	}

	getTxListByCount = (count) => {
		switch (this.txType) {
			case TX_TYPE.CONTRACT_TX:
				this.getTxList({ addr: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.ADDRESS_TX:
				this.getTxList({ address: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.ADDRESS_TOKEN_TX:
				this.getTxList({ address: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.TRANSACTIONS:
				this.getTxList({ page: this.pageId, count })
				break
			case TX_TYPE.TOKEN_TRANSFERS:
				this.getTxList({ page: this.pageId, count })
				break
			case TX_TYPE.BLOCK_TX:
				this.getTxList({ height: this.urlIndex, page: this.pageId, count })
				break

			default:
		}
	}

	getTxListByPage = (page) => {
		switch (this.txType) {
			case TX_TYPE.CONTRACT_TX:
				this.props.history.push(`/${this.txType}/${this.urlIndex}/${page}`);
				break
			case TX_TYPE.ADDRESS_TX:
				this.props.history.push(`/${this.txType}/${this.urlIndex}/${page}`);
				break
			case TX_TYPE.ADDRESS_TOKEN_TX:
				this.props.history.push(`/${this.txType}/${this.urlIndex}/${page}`);
				break
			case TX_TYPE.TRANSACTIONS:
				this.props.history.push(`/${this.txType}/${page}`);
				break
			case TX_TYPE.TOKEN_TRANSFERS:
				this.props.history.push(`/${this.txType}/${page}`);
				break
			case TX_TYPE.BLOCK_TX:
				this.props.history.push(`/${this.txType}/${this.urlIndex}/${page}`);
				break

			default:
		}
	}

	render() {
		const tx = this.props[this.getTxTypeData()['tx']] || {}
		const className = this.getTxTypeData()['className'] || ''
		const noBoxText = this.getTxTypeData()['noBoxText'] || ''
		const { loading, page, count, data, listSize } = tx;
		return (
			<div className="content-wrap">
				<div className="screen0">
					{
						loading ?
							<LoadingComponent height='calc(100vh - 120px - 144px)' />
							:
							<div className={`wrap-holder`}>
								<Header txType={this.txType} urlIndex={this.urlIndex} listSize={listSize} />
								{
									(!data || data.length === 0) ?
										<NoBox text={noBoxText} />
										:
										<div className="contents">
											<table className={className}>
												<thead>
													<TxTableHead txType={this.txType} />
												</thead>
												<tbody>
													{
														data.map((item, index) => (
															<TxTableBody key={index} data={item} txType={this.txType} address={this.urlIndex} />
														))
													}
												</tbody>
											</table>
											<SortHolder
												count={count}
												getData={this.getTxListByCount}
											/>
											<Pagination
												pageNum={page}
												maxPageNum={calcMaxPageNum(listSize, count)}
												getData={this.getTxListByPage}
											/>
										</div>
								}
							</div>
					}
				</div>
			</div>
		);
	}
}

const Header = ({ txType, urlIndex, listSize }) => {
	const _listSize = listSize || 0
	switch (txType) {
		case TX_TYPE.CONTRACT_TX:
			return (
				<p className="title"
				>Transactions
					<span>for Contract {urlIndex}</span>
					<span className="right">A total of<em>{_listSize}</em> transactions found</span>
				</p>
			)
		case TX_TYPE.ADDRESS_TX:
			return (
				<p className="title">
					Transactions
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{_listSize}</em> transactions found</span>
				</p>
			)
		case TX_TYPE.ADDRESS_TOKEN_TX:
			return (
				<p className="title">
					Token Transfers
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{_listSize}</em> token transfers found</span>
				</p>
			)
		case TX_TYPE.TRANSACTIONS:
			return (
				<p className="title">
					Transactions
					<span></span>
					<span className="right"><em>{_listSize}</em> total transactions</span>
				</p>
			)
		case TX_TYPE.TOKEN_TRANSFERS:
			return (
				<p className="title">
					Token transfers
					<span>(IRC01)</span>
					<span className="right">A total of<em>{_listSize}</em> token transfers found<em className="gray">(Showing the last {_listSize} records only)</em></span>
				</p>
			)
		case TX_TYPE.BLOCK_TX:
			return (
				<p className="title">Transactions
					<span>for Block Height {urlIndex}</span>
					<span className="right">A total of<em>{_listSize}</em> total transactions found</span>
				</p>
			)
		default:
			return <p></p>
	}
}

export default withRouter(TxPage);
