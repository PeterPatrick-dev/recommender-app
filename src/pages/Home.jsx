import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-5xl mx-auto py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <span className="inline-block text-sm text-[#a8763a] bg-[#f5e8d3] px-3 py-1 rounded-full mb-4">
            Your next great read, found for you
          </span>
          <h1 className="text-4xl font-medium mb-4 leading-tight text-[#2b2620]">
            Discover books that actually fit your mood
          </h1>
          <p className="text-[#7a7060] text-lg mb-8 max-w-md">
            Answer a few quick questions and get personalized book recommendations,
            powered by AI. No endless scrolling, no generic bestseller lists — just
            books picked for how you're feeling right now.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/recommend"
              className="px-8 py-3 rounded-lg bg-[#a8763a] text-white font-medium hover:bg-[#b8854a] transition-colors"
            >
              Get Recommendations
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg border border-[#e3dcc9] text-[#2b2620] hover:border-[#a8763a] transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>

        <div className="relative h-56 hidden md:block">
          <div className="absolute top-8 left-4 w-28 h-40 bg-[#e8ddf0] rounded-xl -rotate-6 flex items-end p-4">
            <span className="text-2xl">📖</span>
          </div>
          <div className="absolute top-2 left-24 w-28 h-40 bg-[#d9eef0] rounded-xl rotate-3 flex items-end p-4">
            <span className="text-2xl">📖</span>
          </div>
          <div className="absolute top-10 left-44 w-28 h-40 bg-[#f5e8d3] rounded-xl rotate-9 flex items-end p-4">
            <span className="text-2xl">📖</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e3dcc9] pt-10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-2xl font-medium text-[#c4b8a3] mb-2">01</p>
          <h3 className="font-medium mb-1 text-[#2b2620]">Answer a few questions</h3>
          <p className="text-sm text-[#7a7060]">Tell us your mood, time available, and what you've loved before.</p>
        </div>
        <div>
          <p className="text-2xl font-medium text-[#c4b8a3] mb-2">02</p>
          <h3 className="font-medium mb-1 text-[#2b2620]">Get personalized picks</h3>
          <p className="text-sm text-[#7a7060]">Our AI matches your answers to books that actually fit.</p>
        </div>
        <div>
          <p className="text-2xl font-medium text-[#c4b8a3] mb-2">03</p>
          <h3 className="font-medium mb-1 text-[#2b2620]">Track your reading</h3>
          <p className="text-sm text-[#7a7060]">Save books to your library and track your progress as you read.</p>
        </div>
      </div>
    </div>
  )
}

export default Home