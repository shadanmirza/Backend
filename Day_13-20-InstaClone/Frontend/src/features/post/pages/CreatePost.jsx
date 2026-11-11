import { useState, useRef } from 'react'
import { usePost } from '../hook/post.hook';
import { useNavigate } from "react-router";

const CreatePost = () => {

  const [caption, setCaption] = useState("")
  const postImageInputFieldRef = useRef(null)

  const {loading, handleCreatePost} = usePost()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const file = postImageInputFieldRef.current.files[0]

    await handleCreatePost(file, caption)

    navigate("/")
  }

  if(loading){
      return( 
      <main className='bg-black w-screen h-screen flex justify-center items-center'>
        <h1 className=' text-shadow-amber-50'>loading.......</h1>
      </main>
  )}

  return (
    <main className='bg-gray-800 w-screen h-screen flex justify-center items-center'>
      <div className='w-100 h-80 rounded-2xl flex flex-col items-center bg-gray-600'>
        <h1 className='text-3xl font-bold mt-2'>Create Post</h1>

        <form onSubmit={handleSubmit}
        className='flex flex-col mt-5'>

          <label className='font-semibold border-2 p-2 rounded-3xl'
          htmlFor="postImage">Select Image</label>
          
          <input className='hidden'
          type="file" ref={postImageInputFieldRef} name='postImage' id='postImage' />

          <input value={caption}
           onChange={(e)=>{setCaption(e.target.value)}}
           className='mt-2 border-2 rounded-2xl h-15 p-2'
           type="text" name='caption' id='caption' placeholder='Write Caption of post'/>

          
            <button className='mt-6 bg-gray-900 text-amber-200 border-2 h-10 rounded-2xl font-bold'>Create Post</button> 
          

        </form>
      </div>
    </main>
  )
}

export default CreatePost