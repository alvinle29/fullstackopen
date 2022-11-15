import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { addNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(addNotification(`you voted ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default AnecdoteList