import { useState } from 'react'
import axios from 'axios'

const questions = [
  { id: "world", text: "What kind of world do you want to escape into?", type: "choice", options: ["Fantasy realm", "Sci-fi future", "Real-world drama", "Historical setting", "Mystery/thriller"] },
  { id: "feeling", text: "What do you want to feel when you close the last page?", type: "choice", options: ["Comforted", "Thrilled", "Thoughtful", "Inspired", "Satisfied/complete"] },
  { id: "time", text: "How much time can you commit?", type: "choice", options: ["Quick read (under 300 pages)", "Medium (300-500 pages)", "I'm in it for the long haul"] },
  { id: "loved", text: "Name one book, movie, or show you loved — and why", type: "text" },
  { id: "vibe", text: "What's your current vibe?", type: "choice", options: ["Curious", "Cozy", "Adventurous", "Reflective", "Escapist"] },
  { id: "avoid", text: "Anything you want to avoid? (optional)", type: "text", optional: true }
]

function Recommendation() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const currentQuestion = questions[step]

  async function submitAnswers(finalAnswers) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
const response = await axios.post(
  'http://localhost:5000/api/recommend',
  finalAnswers,
  token ? { headers: { Authorization: `Bearer ${token}` } } : {}
)
      setResult(response.data)
    } catch (error) {
      console.error('Error calling backend:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleChoice(value) {
    const updated = { ...answers, [currentQuestion.id]: value }
    setAnswers(updated)
    if (step + 1 === questions.length) {
      submitAnswers(updated)
    }
    setStep(step + 1)
  }

  function handleTextChange(e) {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
  }

  function handleNext() {
    if (step + 1 === questions.length) {
      submitAnswers(answers)
    }
    setStep(step + 1)
  }

  return (
    <div className="w-full max-w-lg mx-auto py-10">
      {step < questions.length ? (
        <div className="w-full">
          <div className="w-full h-1 bg-[#2a2520] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#c9a96e] transition-all duration-300"
              style={{ width: `${((step) / questions.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-sm tracking-wide text-[#c9a96e] mb-2">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="text-2xl md:text-3xl font-medium mb-6">
            {currentQuestion.text}
          </h2>

          {currentQuestion.type === "choice" && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleChoice(option)}
                  className="text-left px-5 py-3 rounded-lg border border-[#3a352d] bg-[#161310] hover:border-[#c9a96e] hover:bg-[#1f1a15] transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "text" && (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={answers[currentQuestion.id] || ""}
                onChange={handleTextChange}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 rounded-lg bg-[#161310] border border-[#3a352d] text-[#f4ede1] placeholder-[#6b6357] focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button
                onClick={handleNext}
                className="self-start px-6 py-2 rounded-lg bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          {loading && <p className="text-[#c9a96e]">Loading your recommendations...</p>}
          {result && result.recommendations && (
            <div>
              <h2 className="text-2xl font-medium mb-6 text-center">Your Recommendations</h2>
              {result.recommendations.map((book, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#c9a96e] bg-[#161310] px-5 py-4 mb-4 rounded-r-lg text-left"
                >
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-[#c9a96e] text-sm mb-2">by {book.author}</p>
                  <p className="text-[#d8d0c4] mb-2">{book.reason}</p>
                  <p className="text-sm italic text-[#9a9186]">{book.genre} · {book.mood}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Recommendation