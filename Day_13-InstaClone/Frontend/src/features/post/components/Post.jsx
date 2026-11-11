import { useState } from "react";
import { Bookmark, Heart, MoreHorizontal, Send } from "lucide-react";


export default function Post({ post, loading, handleLike, handleUnlike }) {
  const user = post.user ?? {};

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  

  return (
    <article className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">

      {/* Profile Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={user.profileImage || "https://i.pravatar.cc/150?img=12"}
            alt={`${user.username || "User"}'s profile`}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-pink-500 ring-offset-2 dark:ring-offset-gray-950"
          />

          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {user.username || "Unknown user"}
              </h3>

            </div>

            {/* <p className="text-xs text-gray-500 dark:text-gray-400">
              {location}
            </p> */}
          </div>
        </div>

        <button
          type="button"
          aria-label="More post options"
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <MoreHorizontal size={22} />
        </button>
      </div>

      {/* Post Image */}
      <div className="w-full bg-gray-100 dark:bg-gray-900">
        <img
          src={post.imgUrl}
          alt="Instagram post"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={()=>{post.isLiked ? handleUnlike(post._id) : handleLike(post._id)}}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className="transition-transform hover:scale-110"
          >
            <Heart
              size={24}
              className={post.isLiked ? "fill-red-500 text-red-500" : "text-gray-800 dark:text-gray-200"}
            />
          </button>

          <button
            type="button"
            aria-label="Share post"
            className="transition-transform hover:scale-110 text-gray-800 dark:text-gray-200"
          >
            <Send size={24} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSaved((prev) => !prev)}
          aria-label={isSaved ? "Remove saved post" : "Save post"}
          className="transition-transform hover:scale-110"
        >
          <Bookmark
            size={24}
            className={
              isSaved
                ? "fill-gray-900 text-gray-900 dark:fill-white dark:text-white"
                : "text-gray-800 dark:text-gray-200"
            }
          />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pt-2">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="mr-2 font-semibold text-gray-900 dark:text-white">
            {user.username || "Unknown user"}
          </span>
          {post.caption}
        </p>
      </div>

      {/* Time */}
      <p className="px-4 pt-2 text-[10px] uppercase tracking-wide text-gray-400">
        Post
      </p>

    </article>
  );
}

