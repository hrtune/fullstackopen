import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
            likes: 0
        }

        handleCreate(newBlog)

        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
            <div>
            title:
            <input
                type="text"
                name="Title"
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
            </div>
            <div>
            author:
            <input
                type="text"
                name="Author"
                value={author}
                onChange={({target}) => setAuthor(target.value)}
            />
            </div>
            <div>
            url:
            <input
                type="text"
                name="Url"
                value={url}
                onChange={({target}) => setUrl(target.value)}
            />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm