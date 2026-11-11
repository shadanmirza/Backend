import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true 
})

export async function getFeed(){
    const response = await api.get('/posts/feed')
    return response.data
}


export async function createPost(imageFile, caption) {
    
    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const response = await api.post("/posts/", formData)

    return response.data

}


export async function likePost(postId){
    const response = await api.post(`/posts/like/${postId}`)
    
    return response.data
}

export async function unlikePost(postId) {
    const response = await api.delete(`/posts/unlike/${postId}`)

    return response.data
}


// GET /api/users/followersList
export async function getFollowersList(){
    const response = await api.get('/users/followersList')
    return response.data 
}