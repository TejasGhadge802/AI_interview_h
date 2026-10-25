import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { 
  BsArrowLeft, 
  BsClock, 
  BsCheck2, 
  BsCopy, 
  BsExclamationTriangle, 
  BsLightbulb, 
  BsArrowRight, 
  BsShare, 
  BsCheckCircleFill,
  BsJournalBookmark,
  BsListUl
} from 'react-icons/bs'
import { FaReact, FaJsSquare, FaUserTie } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getArticleBySlug, preparationArticles } from '../data/preparationArticles'

const ArticleDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = getArticleBySlug(slug)

  const [copiedCodeId, setCopiedCodeId] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  if (!article) {
    return (
      <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex flex-col'>
        <Navbar />
        <div className='flex-1 flex flex-col items-center justify-center p-6 text-center'>
          <h1 className='text-3xl font-bold mb-3'>Guide Not Found</h1>
          <p className='text-slate-600 dark:text-slate-300 mb-6'>The preparation guide you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/preparation')}
            className='bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-500 transition cursor-pointer'
          >
            Back to Preparation Library
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleCopyCode = (codeText, id) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCodeId(id)
    setTimeout(() => setCopiedCodeId(null), 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const currentIndex = preparationArticles.findIndex(a => a.slug === slug)
  const nextArticle = currentIndex < preparationArticles.length - 1 ? preparationArticles[currentIndex + 1] : null
  const prevArticle = currentIndex > 0 ? preparationArticles[currentIndex - 1] : null

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'JavaScript':
        return <FaJsSquare className="text-amber-500" size={20} />
      case 'React':
        return <FaReact className="text-cyan-500" size={20} />
      case 'HR & Behavioral':
        return <FaUserTie className="text-emerald-500" size={18} />
      default:
        return <BsJournalBookmark className="text-emerald-500" size={18} />
    }
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200'>
      <Navbar />

      <main className='flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* Navigation Breadcrumbs & Back */}
        <div className='flex flex-wrap items-center justify-between gap-4 mb-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
          <div className='flex items-center gap-2'>
            <Link to="/preparation" className='hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1 font-semibold'>
              <BsArrowLeft size={16} />
              <span>All Guides</span>
            </Link>
            <span>/</span>
            <span className='text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-xs sm:max-w-md'>
              {article.shortTitle}
            </span>
          </div>

          <button
            onClick={handleShare}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/40 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition cursor-pointer'
          >
            {copiedLink ? <BsCheck2 className='text-emerald-500' size={14} /> : <BsShare size={13} />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
          </button>
        </div>

        {/* Article Header Card */}
        <header className='bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700/80 shadow-sm mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-4'>
            <span className='inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'>
              {getCategoryIcon(article.category)}
              <span>{article.category}</span>
            </span>

            <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium'>
              <BsClock size={13} />
              {article.readTime}
            </span>

            <span className='text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold'>
              {article.difficulty}
            </span>
          </div>

          <h1 className='text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4'>
            {article.title}
          </h1>

          <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl'>
            {article.summary}
          </p>

          <div className='mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400'>
            <span>Published by: <strong className='text-slate-700 dark:text-slate-200'>{article.author}</strong></span>
            <span>Last Updated: <strong className='text-slate-700 dark:text-slate-200'>{article.publishDate}</strong></span>
          </div>
        </header>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
          {/* Main Article Body (8 cols) */}
          <div className='lg:col-span-8 space-y-12'>
            {article.sections.map((section, idx) => (
              <section 
                key={section.id} 
                id={section.id}
                className='scroll-mt-24 bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-700/80 shadow-xs'
              >
                {/* Section Header */}
                <div className='border-b border-slate-100 dark:border-slate-700/60 pb-4 mb-6'>
                  <span className='text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1'>
                    Section {idx + 1}
                  </span>
                  <h2 className='text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug'>
                    {section.title}
                  </h2>
                </div>

                {/* Question Box */}
                <div className='bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 rounded-2xl p-4 sm:p-5 mb-6'>
                  <span className='text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1'>
                    Typical Interview Question:
                  </span>
                  <h3 className='text-base sm:text-lg font-bold text-slate-900 dark:text-white'>
                    "{section.question}"
                  </h3>
                </div>

                {/* Explanation Content */}
                <div className='prose dark:prose-invert max-w-none mb-6'>
                  <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2'>
                    In-Depth Explanation & Mental Model:
                  </h4>
                  <div className='text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line'>
                    {section.explanation}
                  </div>
                </div>

                {/* Code Example (if present) */}
                {section.codeExample && (
                  <div className='mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 shadow-md'>
                    <div className='px-4 py-2.5 bg-slate-950 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800'>
                      <span className='font-mono font-medium'>Example Implementation</span>
                      <button
                        onClick={() => handleCopyCode(section.codeExample, section.id)}
                        className='inline-flex items-center gap-1.5 hover:text-white transition cursor-pointer text-xs'
                      >
                        {copiedCodeId === section.id ? (
                          <>
                            <BsCheck2 className='text-emerald-400' size={14} />
                            <span className='text-emerald-400 font-semibold'>Copied!</span>
                          </>
                        ) : (
                          <>
                            <BsCopy size={13} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className='p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-emerald-300'>
                      <code>{section.codeExample}</code>
                    </pre>
                  </div>
                )}

                {/* Callout Cards: Common Mistake & Evaluator Tip */}
                <div className='grid grid-cols-1 gap-4 pt-2'>
                  {section.commonMistake && (
                    <div className='bg-red-50/80 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3'>
                      <BsExclamationTriangle className='text-red-500 shrink-0 mt-0.5' size={18} />
                      <div className='text-xs sm:text-sm'>
                        <strong className='text-red-700 dark:text-red-400 block font-bold mb-1 uppercase tracking-wider text-[11px]'>
                          Common Mistake to Avoid:
                        </strong>
                        <p className='text-slate-700 dark:text-slate-300 leading-relaxed'>
                          {section.commonMistake}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.evaluatorTip && (
                    <div className='bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3'>
                      <BsLightbulb className='text-amber-500 shrink-0 mt-0.5' size={18} />
                      <div className='text-xs sm:text-sm'>
                        <strong className='text-amber-700 dark:text-amber-400 block font-bold mb-1 uppercase tracking-wider text-[11px]'>
                          What the Interviewer Evaluates:
                        </strong>
                        <p className='text-slate-700 dark:text-slate-300 leading-relaxed'>
                          {section.evaluatorTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Bottom Article Navigation */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
              {prevArticle ? (
                <button
                  onClick={() => navigate(`/preparation/${prevArticle.slug}`)}
                  className='p-5 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 text-left transition shadow-xs cursor-pointer group'
                >
                  <span className='text-xs font-semibold text-slate-400 flex items-center gap-1 mb-1'>
                    <BsArrowLeft size={13} /> Previous Guide
                  </span>
                  <span className='font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-sm block truncate'>
                    {prevArticle.shortTitle}
                  </span>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  onClick={() => navigate(`/preparation/${nextArticle.slug}`)}
                  className='p-5 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 text-right transition shadow-xs cursor-pointer group'
                >
                  <span className='text-xs font-semibold text-slate-400 inline-flex items-center gap-1 mb-1 justify-end'>
                    Next Guide <BsArrowRight size={13} />
                  </span>
                  <span className='font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-sm block truncate'>
                    {nextArticle.shortTitle}
                  </span>
                </button>
              ) : <div />}
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <aside className='lg:col-span-4 space-y-6 lg:sticky lg:top-24'>
            {/* Table of Contents Card */}
            <div className='bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 shadow-xs'>
              <div className='flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60'>
                <BsListUl className='text-emerald-500' size={16} />
                <span>Table of Contents</span>
              </div>

              <nav className='space-y-1.5 text-xs sm:text-sm'>
                {article.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className='block py-1.5 px-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition truncate'
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* AI Simulator Practice Card */}
            <div className='bg-linear-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 border border-emerald-500/30 shadow-lg text-center'>
              <div className='w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30'>
                <BsCheckCircleFill size={22} />
              </div>

              <h3 className='font-bold text-lg mb-2 text-white'>
                Test Yourself Live
              </h3>

              <p className='text-xs text-slate-300 mb-5 leading-relaxed'>
                Reading theory is great, but real fluency comes from vocal practice under time limits. Let our AI interview you on these exact topics.
              </p>

              <button
                onClick={() => navigate('/interview')}
                className='w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md'
              >
                Start AI Mock Session
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ArticleDetail

