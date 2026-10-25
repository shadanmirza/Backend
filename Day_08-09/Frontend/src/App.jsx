import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([{
    title:"test title 1",
    description:"test description"
  },
  {
    title:"test title 2",
    description:"test description"
  },
  {
    title:"test title 3",
    description:"test description"
  },
  {
    title:"test title 4",
    description:"test description"
  }
  ])
   
  function fetchNotes() {
   axios.get("http://localhost:3000/api/notes")
    .then(res => {
    setNotes(res.data.noteRetrive);    
  })
  }
  

  useEffect(()=>{
    fetchNotes()    
  }, [])
  

  function handelSubmit(e) {
    e.preventDefault()

    const title = e.target.elements.title.value
    const description = e.target.elements.description.value
    
    console.log(title,description);
    
    axios.post("http://localhost:3000/api/notes",{
      title:title,
      description:description
    })
    .then(res=>{
      console.log(res.data);
      
      fetchNotes()
    })
  }
  
  function handleDeleteNote(noteId){
   console.log(noteId)

   axios.delete(`http://localhost:3000/api/notes/${noteId}`)
   .then(res=>{
    console.log(res.data);
    
    fetchNotes()
   })
  }
  
  const [editNote, setEditNote] = useState(null)
  function handleEditNote(note) {
    setEditNote(note)
  }

  function handleUpdateSubmit(e) {
    e.preventDefault()

    axios.patch(`http://localhost:3000/api/notes/${editNote._id}`,{
      description:e.target.elements.description.value
    })
    .then(res => {
      console.log(res.data)

      fetchNotes()

      setEditNote(null)
    })
    
    console.log(e.target.elements.description.value)
  }
 

  return (    
    <div className='w-full'>
      
      <div className='w-full h-90 flex justify-center items-center'>
      <form onSubmit={handelSubmit} 
      className='bg-gray-400 px-3 pb-5 pt-5 justify-center items-center flex-col rounded-2xl gap-2 w-60'>

        <h1 className='ml-13 font-bold mb-3'>Create Notes</h1>
        
        <input className='border-2 p-2 rounded-2xl'
        type="text" name='title' placeholder=' Enter title'/>

        <input className='border-2 p-2 rounded-2xl mt-3 h-20'
         type="text" name='description' placeholder=' Enter description'/>

        <button  
        className='font-bold ml-10 bg-gray-500 border-2 p-1 px-3 pl-3 mt-3 rounded-2xl'>Create Notes</button>
      </form>
      
      <div className='ml-3'>
      {editNote && (
        <form onSubmit={handleUpdateSubmit}
        className='bg-gray-400 p-2 rounded-2xl'>

          <h1 className=' font-bold'>Update Note Description</h1>

          <input name='description' className='border-2 rounded mt-2 p-1' type="text" placeholder='enter description'/>

          <button  
          className='font-bold ml-12 bg-gray-500 border-2 flex  p-1 px-3 pl-3 mt-3 rounded-2xl'>Update</button>
        </form>        
      )}
      </div>
      </div>

      
        

      <div className='max-w-180 mx-auto'>

        <h1 className='ml-3 font-bold text-3xl '>Created Notes</h1> 
      
      <div className=' flex flex-wrap '> 
      {
        notes.map((note, key)=>(
          <div className=''>
          <div  className='w-60 bg-gray-500 m-3 p-2 border-2 rounded-2xl'>
           
           <h1  className='font-bold text-2xl'>{note.title}</h1>
           
           <p>{note.description}</p>
           
           <div className='flex justify-center mt-2 gap-2'>
           <button
             className='font-semibold bg-red-400 border rounded px-2 text-sm'
               onClick={() => handleDeleteNote(note._id)}
             >
             delete
            </button>

            <button
             className='font-semibold bg-red-400 border rounded px-2 text-sm'
               onClick={() => handleEditNote(note)}
             >
             edit
            </button>
            </div>
          </div>
          </div>
        ))
      }
      </div> 
      </div>
      

    </div>
  )
}

export default App