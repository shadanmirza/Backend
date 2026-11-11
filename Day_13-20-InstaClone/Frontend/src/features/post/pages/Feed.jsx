import { useEffect } from 'react'
import { Heart, Users } from 'lucide-react'
import { useNavigate } from 'react-router'
import Post from '../components/Post'
import { usePost } from '../hook/post.hook'
import Navbar from '../../../components/Navbar'

const following = [
  { name: 'Leo Martin', username: '@leomakes', color: 'bg-violet-400' },
  { name: 'Sofia Kim', username: '@sofiakim', color: 'bg-emerald-400' },
  { name: 'Ethan Brooks', username: '@ethan.frames', color: 'bg-orange-400' },
]

function PeopleSection({ title, people }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <Users size={16} className="text-pink-400" /> {title}
      </div>
      <ul className="space-y-4">
        {people.map(person => (
          <li key={person.username} className="flex items-center gap-3">
            <img
              src={person.profileImage}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-100">{person.username}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-500">Preview only</p>
    </section>
  )
}

export default function Feed() {
  const { feed, handleGetFeed, loading, error, handleLike, handleUnlike, followers, handleFollowers } = usePost()
  const navigate = useNavigate()

  useEffect(() => {
    handleGetFeed()
    handleFollowers()
  }, [handleGetFeed, handleFollowers])

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <header className="border-b border-white/10">
        <Navbar />
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-4">
            <PeopleSection title="Followers" people={followers} />
          </div>
          <div className="sticky top-75 space-y-4 mt-3  ">
            <PeopleSection title="Following" people={following} />
          </div>
        </aside>

        <main className="mx-auto w-full max-w-md">
          {loading && feed.length === 0 ? (
            <div className="rounded-2xl border border-white/10 p-8 text-center text-sm text-zinc-400">Loading your feed…</div>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-200">Could not load feed: {error}</div>
          ) : feed.length ? (
            <div className="flex flex-col gap-5">
              {feed.map(post => <Post key={post._id} post={post} handleLike={handleLike} handleUnlike={handleUnlike} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/10 text-pink-300"><Heart size={22} /></div>
              <h1 className="font-semibold">Your feed is waiting</h1>
              <p className="mt-2 text-sm text-zinc-400">Create the first post and share a moment.</p>
              <button onClick={() => navigate('/create-post')} className="mt-5 rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold hover:bg-pink-400">Create a post</button>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}
