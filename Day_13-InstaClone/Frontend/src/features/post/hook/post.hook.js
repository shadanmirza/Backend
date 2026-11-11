import { getFeed, createPost, likePost, unlikePost, getFollowersList } from '../services/post.api'
import { PostContext } from '../post.context'
import { useCallback, useContext } from "react";


export const usePost = ()=>{

    const context = useContext(PostContext)

    if (!context) {
        throw new Error("usePost must be used within a PostContextProvider")
    }

    const { loading, setLoading, feed, setFeed, post, setPost, error, setError, followers, setFollowers } = context

    const handleGetFeed = useCallback(async ()=>{
        setLoading(true)
        setError(null)
        try {
            const data = await getFeed()
            setFeed(data.posts ?? [])
        } catch (err) {
            setError(err.response?.data?.message ?? err.message ?? "Could not load the feed")
        } finally {
            setLoading(false)
        }
    }, [setError, setFeed, setLoading])

    const handleCreatePost = async (imageFile, caption) =>{
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])
        setLoading(false)
    }

    const handleLike = async (postId) => {
        setLoading(true)

        const data = await likePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    const handleUnlike = async (postId) => {
        setLoading(true)

        const data = await unlikePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    const handleFollowers = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getFollowersList()
            setFollowers(data.followers ?? [])
        } catch (err) {
            setError(err.response?.data?.message ?? err.message ?? "Could not load followers")
        } finally {
            setLoading(false)
        }
    }, [setError, setFollowers, setLoading])
    
    return { loading, feed, post, handleGetFeed, error, handleCreatePost, handleLike, handleUnlike, followers, handleFollowers }
}
