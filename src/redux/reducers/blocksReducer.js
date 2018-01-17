import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const blocksInitState = {
  loading: true,
  data: [],
  pageNum: 1,
  maxPageNum: 1,
};

const blockInitState = {
  loading: true,
  data: {
    blockDetail: {},
    blockTx: []
  },
  pageNum: 1,
  maxPageNum: 1,
};

const initialState = {
    blocks: blocksInitState,
    block: blockInitState
}

export function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getBlocks: {
      console.log(action.payload)
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: true,
          pageNum: action.payload || 1
        }
      }
    }

    case actionTypes.getBlocksFulfilled: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false,
          maxPageNum: calcMaxPageNum(action.payload.totalData, 20),
          data : action.payload.data
        }
      }
    }

    case actionTypes.getBlocksRejected: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false
        }
      }
    }

    case actionTypes.getBlock: {
      return {
        ...state,
        block : {
          ...state.block,
          loading: true,
          pageNum: action.payload.pageId || 1
        }
      }
    }

    case actionTypes.getBlockFulfilled: {
      return {
        ...state,
        block : {
          ...state.block,
          loading: false,
          data : {
            ...state.block.data,
            blockDetail: action.payload.blockDetail,
            blockTx: action.payload.txInBlock
          },
          maxPageNum: calcMaxPageNum(action.payload.blockDetail.txCount, 10)
        }
      }
    }

    case actionTypes.getBlockRejected: {
      return {
        ...state,
        block : {
          ...state.block,
          loading: false
        }
      }
    }

    case actionTypes.resetBlocksReducer: {
      return {
        ...state,
        blocks: blocksInitState
      }
    }

    case actionTypes.resetBlockReducer: {
      return {
        ...state,
        block: blockInitState
      }
    }

    default: {
      return state
    }
  }
}
