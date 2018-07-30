import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	isValidData,
	tokenText,
	isScoreTx
} from 'utils/utils'
import {
	TransactionLink,
	AddressLink,
	BlockLink,
} from 'components'
import {
	TX_TYPE,
	SERVER_TX_TYPE,
} from 'utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else if (isError) {
		_txHash = <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} />
		className = 'icon error on'
	}
	else {
		_txHash = <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} />
		className = 'on'
	}
	return (
		<td className={className}>
			{(_txHash !== '-' && isError) && <i className="img"></i>}
			{_txHash}
		</td>
	)
}

function getClassName (targetAddr, address, txType) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)

	if (_isScoreTx) {
		return "icon calen"
	}

	let className = ""
	if (_isContractAddress) {
		className += "icon"
	}
	
	if (targetAddr !== address) {
		className += " on"
	}
	
	return className
}

function getInnerElements (targetAddr, address, noEllipsis, txType) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)

	if (_isScoreTx) {
		return [<i key="i" className="img"></i>,<span key="span">{SERVER_TX_TYPE[txType]}</span>]
	}

	let elements = []
	if (_isContractAddress) {
		elements.push(<i key="i" className="img"></i>)
	}
	
	if (targetAddr !== address) {
		elements.push(<span key="span" className={noEllipsis ? '' : 'ellipsis'}><AddressLink to={targetAddr} /></span>)
	}
	else {
		elements.push(<span key="span" className={noEllipsis ? '' : 'ellipsis'}>{address}</span>)
	}

	return elements
}

const AddressCell = ({ targetAddr, address, noEllipsis, txType }) => {
	if (!isValidData(targetAddr)) {
		return <td className="no">-</td>
	}
	const className = getClassName(targetAddr, address, txType)
	const innerElements = getInnerElements(targetAddr, address, noEllipsis, txType)
	return <td className={className}>{innerElements}</td>
}

const SignCell = ({ address, fromAddr, toAddr }) => {
	let signItem, className = 'table-sign'
	if (fromAddr === address) {
		signItem = <span>OUT</span>
		className += ' out'
	}
	else if (toAddr === address) {
		signItem = <span>IN</span>
	}
	else {
		signItem = <i className="img"></i>
	}
	return <td className={className}>{signItem}</td>
}

const TokenCell = ({ name, address }) => {
	return <td>{tokenText(name, undefined, address, 'ellipsis')}</td>
}

const DateCell = ({ date, isAge }) => {
	let className, dateText
	if (!isValidData(date)) {
		className = "no"
		dateText = "-"
	}
	else {
		className = "break"
		if (isAge) {
			dateText = calcFromNow(date)
		}
		else {
			dateText = dateToUTC(date)
		}
	}
	return <td className={className}>{dateText}</td>
}

const AmountCell = ({ amount, decimal, symbol }) => {
	return <td><span>{convertNumberToText(amount || "0", decimal || 4)}</span><em>{symbol}</em></td>
}

const BlockCell = ({ height }) => {
	return <td className="on break"><BlockLink to={height} label={numberWithCommas(height)} /></td>
}

class TxTableBody extends Component {
	render() {
		const TableRow = (_props) => {
			const {
				txType,
				data,
				address
			} = this.props

			const addressInData = data.address
			const isError = data.state === 0

			switch (txType) {
				case TX_TYPE.BLOCKS:
					return (
						<tr>
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<td>{numberWithCommas(data.txCount)}</td>
							<td><BlockLink label={data.hash} to={data.height} ellipsis /></td>
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData} txType={data.txType} />
							<AmountCell amount={data.balance} symbol="ICX" />
							<AmountCell amount={data.icxUsd} decimal={2} symbol="USD" />
							<td><span>{data.percentage}</span><em>%</em></td>
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{data.nodeType}</td>
						</tr>
					)
				case TX_TYPE.CONTRACT_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={address} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} />
							<AddressCell targetAddr={data.toAddr} address={address} txType={data.txType} />
							<AmountCell amount={data.quantity} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressCell targetAddr={data.fromAddr} address={address} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} />
							<AddressCell targetAddr={data.toAddr} address={address} txType={data.txType} />
							<AmountCell amount={data.quantity} symbol={data.contractSymbol} />
							<TokenCell name={data.name} address={data.tradeTokenAddr} />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<span className="ellipsis"><TransactionLink to={data.txHash} /></span><br />
								<span><BlockLink label={`# ${data.height}`} to={data.height} /></span>
								<p>{calcFromNow(data.age)}</p>
							</td>
							<td>{data.method}</td>
							<td>{data.eventLog}</td>
						</tr>
					)
				case TX_TYPE.ADDRESS_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={address} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} />
							<AddressCell targetAddr={data.toAddr} address={address} txType={data.txType} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.ADDRESS_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={address} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} />
							<AddressCell targetAddr={data.toAddr} address={address} txType={data.txType} />
							<AmountCell amount={data.quantity} symbol={data.contractSymbol} />
							<TokenCell name={data.contractName} address={data.contractAddr} />
						</tr>
					)
				case TX_TYPE.TRANSACTIONS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} txType={data.txType} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_TRANSFERS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressCell targetAddr={data.fromAddr} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} txType={data.txType} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<TokenCell name={data.tokenName} address={data.contractAddr} />
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<AddressCell targetAddr={data.fromAddr} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} txType={data.txType} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} txType={data.txType} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} txType={data.txType} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{data.rank}</td>
							<AddressCell targetAddr={addressInData} txType={data.txType} noEllipsis />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<td><span>{data.percentage}</span><em>%</em></td>
						</tr>
					)
				case TX_TYPE.TRANSACTION_EVENTS:
					return (
						<tr>
							<td>{data.eventLog}</td>
						</tr>
					)
				default:
					return <tr></tr>
			}
		}

		return TableRow(this.props)
	}
}

export default TxTableBody