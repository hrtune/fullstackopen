import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(createAnecdote(anecdote))
        event.target.anecdote.value = ''
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={e => createNew(e)}>
            <div><input type="text" name="anecdote" /></div>
            <button>create</button>
        </form>
      </div>
    )

}

export default AnecdoteForm