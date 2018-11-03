import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets' // ACTION TYPES

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET :
      const { tweet } = action

      let parentTweet = {}
      if (tweet.replyingTo) {
        // If replyingTo exists: Update the parentTweet tweet object by copying from state using spread operator
        parentTweet = {
          // Set the key using literal notation
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: [...state[tweet.replyingTo].replies, tweet.id]
            // (OR) replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...parentTweet
      }
    default :
      return state
  }
}