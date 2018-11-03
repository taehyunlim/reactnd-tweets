import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet} from '../actions/tweets'

class NewTweet extends Component {
  state = {
    text: '',
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = this.state
    const { dispatch, parentId } = this.props


    dispatch(handleAddTweet(text, parentId))

    this.setState(() => ({
      text: ''
    }))

  }

  render() {
    const { text } = this.state
    const tweetLeft = 280 - text.length

    // To Do: Redirect to / if submitted

    return (
      <div>
        <h3 className='center'>Compose New Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 &&
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          }
          <button className='btn' type='submit' disabled={text.length === 0}>
            Submit
          </button>
        </form>
      </div>
    )
  }

}

export default connect()(NewTweet)