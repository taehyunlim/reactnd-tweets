import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  // The middleware is called in the order it is listed in this function. 
  thunk,
  logger, 
)
