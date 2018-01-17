import { connect } from 'react-redux';
import { TransactionsPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getTransactions } from '../../redux/actions/transactionAction';

function mapStateToProps(state) {
  return {
    loading: state.transactions.transactions.loading,
    data: state.transactions.transactions.data,
    pageNum: state.transactions.transactions.pageNum,
    maxPageNum: state.transactions.transactions.maxPageNum,
    url: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTransactions : (pageId) => dispatch(getTransactions(pageId))
  };
}

const TransactionsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsPage));

export default TransactionsPageContainer;
