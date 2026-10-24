import { useState } from 'react'
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

  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.noteRetrive)   
  })

  return (    
    <div className='w-full flex p-2'>
      {
        notes.map((note)=>(
          <div className=''>
          <div className=' max-w-60 bg-gray-500 m-3 p-1 border-2 rounded-2xl'>
           <h1 className='font-bold text-2xl'>{note.title}</h1>
           <p>{note.description}</p>
          </div>
          </div>
        ))
      }
    </div>
  )
}

export default App