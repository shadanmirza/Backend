import { createContext, useState } from 'react'

export const PostContext = createContext(null)

export const PostContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState([])
    const [error, setError] = useState(null)
    const [followers, setFollowers] = useState([])

    return (
        <PostContext.Provider value={{ loading, setLoading, post, setPost, feed, setFeed, error, setError, followers, setFollowers }}>
            {children}
        </PostContext.Provider>
    )
}
