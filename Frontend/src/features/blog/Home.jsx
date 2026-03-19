import React from "react"
import { ImageTrail } from "../../components/Bg1"
import Footer from "../../components/Footer"
import { BentoCard, BentoGrid, Feature } from "../../components/Features"
import { SparklesIcon } from "lucide-react"
import DisplayCards from "../../components/DisplayCards"
import BlogPreview from "../../components/BlogPreview"

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
    <Feature>
      <BentoGrid>
        <BentoCard
          name="Smart Organization"
          description="Automatically organize your blogs with tags, categories, and smart suggestions."
          Icon={SparklesIcon}
          className="md:col-span-1"
          background={
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/feature-1.png"
                alt="Smart Organization"
                className="h-full w-full object-cover opacity-20"
              />
            </div>
          }
          href="#"
          cta="Learn more"
        />
        <BentoCard
          name="Powerful Editor"
          description="Write beautifully with a distraction-free editor and markdown support."
          Icon={SparklesIcon}
          className="md:col-span-1"
          background={
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/feature-2.png"
                alt="Powerful Editor"
                className="h-full w-full object-cover opacity-20"
              />
            </div>
          }
          href="#"
          cta="Learn more"
        />
        <BentoCard
          name="Search Everything"
          description="Instantly find your notes, blogs, and ideas with lightning-fast search."
          Icon={SparklesIcon}
          className="md:col-span-1"
          background={
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/feature-3.png"
                alt="Search Everything"
                className="h-full w-full object-cover opacity-20"
              />
            </div>
          }
          href="#"
          cta="Learn more"
        />
      </BentoGrid>
    </Feature>

    {/* <DisplayCards/> */}
    <BlogPreview/>  

      {/* ================= CTA SECTION ================= */}
      {/* <section className="py-20 px-6 text-center bg-gradient-to-b from-black to-zinc-900">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Building Your Knowledge Today
        </h2>

        <p className="mt-4 text-gray-400">
          Join thousands of creators organizing their thoughts smarter.
        </p>

        <button className="mt-6 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition">
          Get Started Free
        </button>
      </section> */}

      <Footer />
    </div>
  )
}

export default Home