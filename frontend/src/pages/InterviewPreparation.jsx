import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { 
  BsJournalBookmark, 
  BsArrowRight, 
  BsClock, 
  BsCheckCircleFill, 
  BsSearch, 
  BsBook, 
  BsCodeSlash, 
  BsPersonBadge,
  BsLightbulb,
  BsShieldCheck
} from 'react-icons/bs'
import { FaReact, FaJsSquare, FaUserTie } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { preparationArticles } from '../data/preparationArticles'

const InterviewPreparation = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'JavaScript', 'React', 'HR & Behavioral']

  const filteredArticles = preparationArticles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'JavaScript':
        return <FaJsSquare className="text-amber-500" size={22} />
      case 'React':
        return <FaReact className="text-cyan-500" size={22} />
      case 'HR & Behavioral':
        return <FaUserTie className="text-emerald-500" size={20} />
      default:
        return <BsCodeSlash className="text-emerald-500" size={20} />
    }
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200'>
      <Navbar />

      <main className='flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16'>
        {/* Header Breadcrumb & Hero */}
        <div className='text-center max-w-3xl mx-auto mb-12 sm:mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-5'>
            <BsJournalBookmark size={15} />
            <span>Curated Preparation Guides</span>
          </div>

          <h1 className='text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight'>
            Interview Preparation <span className='text-emerald-600 dark:text-emerald-400'>Library</span>
          </h1>

          <p className='text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg leading-relaxed'>
            Master core fundamentals, study word-for-word sample responses, and discover common pitfalls with our comprehensive, free study guides. No signup required.
          </p>

          {/* Search & Filter Bar */}
          <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto'>
            <div className='relative w-full'>
              <BsSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search topics, keywords (e.g., closures, STAR, hooks)...'
                className='w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800/90 text-slate-800 dark:text-white placeholder-slate-400 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xs transition'
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className='flex flex-wrap justify-center items-center gap-2 mt-5'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Guides Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className='bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group'
              >
                <div>
                  {/* Top Meta info */}
                  <div className='flex items-center justify-between gap-2 mb-4'>
                    <div className='flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'>
                      {getCategoryIcon(article.category)}
                      <span>{article.category}</span>
                    </div>

                    <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium'>
                      <BsClock size={13} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    onClick={() => navigate(`/preparation/${article.slug}`)}
                    className='text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer mb-3 leading-snug'
                  >
                    {article.shortTitle}
                  </h2>

                  {/* Summary */}
                  <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6'>
                    {article.summary}
                  </p>

                  {/* Section previews */}
                  <div className='space-y-1.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400'>
                    <span className='font-semibold text-slate-700 dark:text-slate-300 block mb-1 uppercase tracking-wider text-[11px]'>
                      Key Focus Areas:
                    </span>
                    {article.tableOfContents.slice(0, 3).map((toc) => (
                      <div key={toc.id} className='flex items-center gap-1.5 truncate'>
                        <BsCheckCircleFill className='text-emerald-500 shrink-0' size={12} />
                        <span className='truncate'>{toc.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className='pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between'>
                  <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                    Difficulty: <strong className='text-emerald-600 dark:text-emerald-400'>{article.difficulty}</strong>
                  </span>

                  <button
                    onClick={() => navigate(`/preparation/${article.slug}`)}
                    className='inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform cursor-pointer'
                  >
                    <span>Read Guide</span>
                    <BsArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <div className='col-span-3 text-center py-16 bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200 dark:border-slate-700 p-8'>
              <BsBook size={40} className='mx-auto text-slate-400 mb-3' />
              <h3 className='text-lg font-bold text-slate-800 dark:text-white'>No articles matched your search</h3>
              <p className='text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4'>Try clearing filters or searching for terms like "closures", "STAR", or "hooks".</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className='px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition cursor-pointer'
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Practice Banner Callout */}
        <div className='bg-linear-to-br from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='max-w-xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-500/30'>
              <BsLightbulb size={13} />
              <span>Ready for Real Pressure?</span>
            </div>
            <h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight mb-3'>
              Don't Just Read Questions. Practice Them Live.
            </h2>
            <p className='text-slate-300 text-sm sm:text-base leading-relaxed'>
              Reading interview answers is only half the battle. Test your verbal clarity and speed with our conversational AI interviewer in simulated audio and video sessions.
            </p>
          </div>

          <button
            onClick={() => navigate('/interview')}
            className='bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2'
          >
            <span>Launch Mock Interview</span>
            <BsArrowRight size={17} />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default InterviewPreparation

