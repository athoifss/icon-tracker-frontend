import React, { Component } from 'react'
import { SEARCH_TYPE, IRC_VERSION, POPUP_TYPE} from '../../../utils/const'
import { numberWithCommas } from '../../../utils/utils'

class SearchTableDesc extends Component {
    render() {
        const { searchType, listSize, totalSize } = this.props
        console.log(this.props, "search page props")

        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            const _totalSize = numberWithCommas(totalSize || 0)
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <span className="cont right" onClick={() => {this.props.setPopup({ type: POPUP_TYPE.VERIFICATION })}}>
                            <i className="img"></i>
                            A total of {_listSize} verified contract source
                            codes found. [+] Contract Verification
                            
                        </span>
                        
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <span className="cont right">
                            A total of {listSize} {IRC_VERSION[2]} IRC2 Token
                            Contract(s) found
                        </span>
                    )
                default:
                    return <p />
            }
        }
        return Content()
    }
}

export default SearchTableDesc
