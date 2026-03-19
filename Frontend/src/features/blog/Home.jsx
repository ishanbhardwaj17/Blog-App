import React from "react"
import { ImageTrail } from "../../components/Bg1"
import Footer from "../../components/Footer"

const Home = () => {
  return (
    <div className="bg-black text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Animation */}
        <ImageTrail>
          <img src="../src/public/pic7.jpg" className="w-27 rounded-lg opacity-80" />
          <img src="../src/public/pic8.jpg" className="w-27 rounded-lg opacity-80" />
          <img src="../src/public/pic4.jpg" className="w-27 rounded-lg opacity-80" />
          <img src="../src/public/pic9.jpg" className="w-27 rounded-lg opacity-80" />
          <img src="../src/public/pic6.jpg" className="w-27 rounded-lg opacity-80" />
        </ImageTrail>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Write. Organize. <br /> Remember Everything.
          </h1>

          <p className="mt-4 text-gray-400 max-w-xl">
            A modern blogging platform that helps you capture ideas,
            connect thoughts, and never lose knowledge again.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition">
              Start Writing
            </button>

            <button className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-white hover:text-black transition">
              Explore Blogs
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 px-6 md:px-20 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why Choose This Platform?
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition">
            <h3 className="text-xl font-semibold">Smart Organization</h3>
            <p className="text-gray-400 mt-2">
              Automatically organize your blogs with tags, categories,
              and smart suggestions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition">
            <h3 className="text-xl font-semibold">Powerful Editor</h3>
            <p className="text-gray-400 mt-2">
              Write beautifully with a distraction-free editor and markdown support.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition">
            <h3 className="text-xl font-semibold">Search Everything</h3>
            <p className="text-gray-400 mt-2">
              Instantly find your notes, blogs, and ideas with lightning-fast search.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-black to-zinc-900">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Building Your Knowledge Today
        </h2>

        <p className="mt-4 text-gray-400">
          Join thousands of creators organizing their thoughts smarter.
        </p>

        <button className="mt-6 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition">
          Get Started Free
        </button>
      </section>

      <Footer />
    </div>
  )
}

export default Home