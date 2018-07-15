import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  blockInfo,
  blockTxList,
  resetBlockReducer 
} from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    blockDetail: state.blocks.blockDetail,
    blockTx: state.blocks.blockTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockInfo: (payload) => dispatch(blockInfo(payload)),
    blockTxList: (payload) => dispatch(blockTxList(payload)),
    resetReducer: () => dispatch(resetBlockReducer()),

  };
}

const BlockDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage));

export default BlockDetailPageContainer;
