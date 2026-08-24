import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <p className="text-sm tracking-widest text-[#c9a96e] uppercase mb-4">
        Your next great read, found for you
      </p>
      <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
        Discover books that actually fit your mood
      </h1>
      <p className="text-[#d8d0c4] text-lg mb-10 max-w-xl mx-auto">
        Answer a few quick questions and get personalized book recommendations,
        powered by AI. No endless scrolling, no generic bestseller lists —
        just books picked for how you're feeling right now.
      </p>

      <div className="flex gap-4 justify-center flex-wrap mb-16">
        <Link
          to="/recommend"
          className="px-8 py-3 rounded-lg bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors"
        >
          Get Recommendations
        </Link>
        <Link
          to="/signup"
          className="px-8 py-3 rounded-lg border border-[#3a352d] text-[#f4ede1] hover:border-[#c9a96e] transition-colors"
        >
          Create an Account
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div>
          <p className="text-[#c9a96e] text-2xl font-medium mb-2">01</p>
          <h3 className="font-medium mb-1">Answer a few questions</h3>
          <p className="text-sm text-[#9a9186]">Tell us your mood, time available, and what you've loved before.</p>
        </div>
        <div>
          <p className="text-[#c9a96e] text-2xl font-medium mb-2">02</p>
          <h3 className="font-medium mb-1">Get personalized picks</h3>
          <p className="text-sm text-[#9a9186]">Our AI matches your answers to books that actually fit.</p>
        </div>
        <div>
          <p className="text-[#c9a96e] text-2xl font-medium mb-2">03</p>
          <h3 className="font-medium mb-1">Track your reading</h3>
          <p className="text-sm text-[#9a9186]">Save books to your library and track your progress as you read.</p>
        </div>
      </div>
    </div>
  )
}

export default Home