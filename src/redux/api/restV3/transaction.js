import { makeUrl } from 'utils/utils'
import { trackerApi } from './config'

export function transactionRecentTx(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/recentTx', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionTxDetail(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/txDetail', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionEventLogList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/eventLogList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionInternalTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/internalTxList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}