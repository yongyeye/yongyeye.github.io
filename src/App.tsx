/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, Clock, ChevronRight, RefreshCw, ArrowLeft, Trees } from 'lucide-react';

type Step = 'intro' | 'input' | 'result';

function Illustration() {
  return (
    <div className="relative w-full aspect-[16/9] illustration-card rounded-lg flex items-end justify-center group">
      {/* Hills */}
      <div className="absolute bottom-0 left-[-10%] w-[60%] h-[40%] bg-moss rounded-full opacity-80 blur-[2px]" />
      <div className="absolute bottom-0 right-[-10%] w-[70%] h-[50%] bg-ochre/60 rounded-full opacity-80 blur-[1px]" />
      <div className="absolute bottom-[-10%] left-[10%] w-[80%] h-[60%] bg-moss/90 rounded-full" />
      
      {/* Window/Door Frame */}
      <div className="absolute inset-4 border-[12px] border-earth rounded-sm pointer-events-none z-10" />
      
      {/* Figure on Stool (Simple shapes) */}
      <div className="relative z-0 mb-4 scale-75 sm:scale-100 flex flex-col items-center">
        {/* Head */}
        <div className="w-6 h-7 bg-ink rounded-full mb-[-4px]" />
        {/* Body */}
        <div className="w-12 h-16 bg-ink rounded-t-3xl" />
        {/* Stool */}
        <div className="w-14 h-4 bg-earth rounded-full mt-[-2px]" />
        <div className="flex gap-6 mt-[-2px]">
          <div className="w-2 h-6 bg-earth transform -rotate-12" />
          <div className="w-2 h-6 bg-earth transform rotate-12" />
        </div>
      </div>

      {/* Red Accent (Phone/Icon) */}
      <div className="absolute right-12 bottom-12 w-4 h-4 bg-berry rounded-sm shadow-sm rotate-12 z-20" />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [parentAge, setParentAge] = useState<string>('65');
  const [expectancy, setExpectancy] = useState<string>('85');
  const [visitFrequency, setVisitFrequency] = useState<string>('1'); 
  const [daysPerVisit, setDaysPerVisit] = useState<string>('3');

  const results = useMemo(() => {
    const pAge = parseInt(parentAge) || 0;
    const exp = parseInt(expectancy) || 0;
    const freq = parseInt(visitFrequency) || 0;
    const days = parseInt(daysPerVisit) || 0;

    const remainingYears = Math.max(0, exp - pAge);
    const totalVisits = remainingYears * freq;
    const totalDays = totalVisits * days;

    return {
      remainingYears,
      totalVisits,
      totalDays,
      months: (totalDays / 30).toFixed(1)
    };
  }, [parentAge, expectancy, visitFrequency, daysPerVisit]);

  return (
    <div className="grain-texture min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-moss/30">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-lg w-full text-center space-y-10"
            id="intro-container"
          >
            <Illustration />
            
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-ink">
                寂静的木头
              </h1>
              <p className="text-xl text-ink/60 font-serif leading-relaxed px-4 italic">
                “岁月漫长，如林间静木。<br />
                我们总以为来日方长，却忘了林深时见鹿，见你亦有期。”
              </p>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('input')}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-earth text-paper rounded-sm font-serif font-medium tracking-widest shadow-[8px_8px_0px_rgba(44,41,38,0.2)] hover:shadow-none transition-all uppercase"
              id="start-button"
            >
              <span>计算余期</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full bg-paper border-4 border-earth p-8 sm:p-12 shadow-[12px_12px_0px_rgba(74,58,42,0.1)] space-y-12"
            id="input-container"
          >
            <div className="space-y-4 border-b-2 border-earth/10 pb-6">
              <h2 className="text-4xl font-serif font-bold text-earth lowercase">数字的重量</h2>
              <p className="text-ink/60 italic font-serif">填写这些数字，如同在岁月的年轮上刻下印记。</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/80 uppercase tracking-widest block font-sans">父母当前的年纪</label>
                <div className="relative">
                  <input
                    type="number"
                    value={parentAge}
                    onChange={(e) => setParentAge(e.target.value)}
                    className="w-full bg-paper border-b-2 border-earth px-2 py-4 text-3xl focus:border-moss transition-all outline-none font-serif text-ink"
                  />
                  <span className="absolute right-0 bottom-4 text-earth/40 font-serif italic text-sm">岁</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/80 uppercase tracking-widest block font-sans">预想的离开时间</label>
                <div className="relative">
                  <input
                    type="number"
                    value={expectancy}
                    onChange={(e) => setExpectancy(e.target.value)}
                    className="w-full bg-paper border-b-2 border-earth px-2 py-4 text-3xl focus:border-moss transition-all outline-none font-serif text-ink"
                  />
                  <span className="absolute right-0 bottom-4 text-earth/40 font-serif italic text-sm">岁</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/80 uppercase tracking-widest block font-sans">每岁相见的频次</label>
                <div className="relative">
                  <input
                    type="number"
                    value={visitFrequency}
                    onChange={(e) => setVisitFrequency(e.target.value)}
                    className="w-full bg-paper border-b-2 border-earth px-2 py-4 text-3xl focus:border-moss transition-all outline-none font-serif text-ink"
                  />
                  <span className="absolute right-0 bottom-4 text-earth/40 font-serif italic text-sm">次/年</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-earth/80 uppercase tracking-widest block font-sans">每面停留的日长</label>
                <div className="relative">
                  <input
                    type="number"
                    value={daysPerVisit}
                    onChange={(e) => setDaysPerVisit(e.target.value)}
                    className="w-full bg-paper border-b-2 border-earth px-2 py-4 text-3xl focus:border-moss transition-all outline-none font-serif text-ink"
                  />
                  <span className="absolute right-0 bottom-4 text-earth/40 font-serif italic text-sm">天</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button
                onClick={() => setStep('intro')}
                className="flex-1 px-8 py-4 border-2 border-earth text-earth font-bold hover:bg-earth/5 transition-colors uppercase tracking-widest flex items-center justify-center gap-3 text-sm"
                id="back-button"
              >
                <ArrowLeft className="w-4 h-4" />
                折返
              </button>
              <button
                onClick={() => setStep('result')}
                className="flex-[2] px-8 py-4 bg-earth text-paper font-bold shadow-[6px_6px_0px_rgba(44,41,38,0.2)] hover:shadow-none transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 text-sm"
                id="calculate-button"
              >
                刻入年轮
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-4xl w-full space-y-12"
            id="result-container"
          >
            <div className="bg-paper border-4 border-earth p-10 sm:p-20 shadow-[16px_16px_0px_rgba(74,58,42,0.1)] text-center space-y-16 relative">
              <div className="space-y-6">
                <p className="text-moss font-serif tracking-[0.3em] uppercase text-sm border-b border-moss/20 pb-4 inline-block">余晖之下的相见</p>
                <div className="flex flex-col items-center justify-center py-4">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                  >
                    <span className="text-[10rem] sm:text-[12rem] font-serif font-black text-ink leading-none block">
                      {results.totalVisits}
                    </span>
                  </motion.div>
                  <span className="text-4xl font-serif text-earth/50 italic mt-[-2rem]">面的重逢</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t-2 border-earth/10 pt-16">
                <div className="space-y-3">
                  <Trees className="w-6 h-6 mx-auto text-moss opacity-60" />
                  <p className="text-xs text-earth/40 uppercase tracking-widest font-bold">静默的岁月</p>
                  <p className="text-4xl font-serif text-ink">{results.remainingYears}<span className="text-sm italic ml-1">载</span></p>
                </div>
                <div className="space-y-3">
                  <Mail className="w-6 h-6 mx-auto text-ochre opacity-80" />
                  <p className="text-xs text-earth/40 uppercase tracking-widest font-bold">总计的日长</p>
                  <p className="text-4xl font-serif text-ink">{results.totalDays}<span className="text-sm italic ml-1">昼</span></p>
                </div>
                <div className="space-y-3">
                  <Clock className="w-6 h-6 mx-auto text-berry opacity-70" />
                  <p className="text-xs text-earth/40 uppercase tracking-widest font-bold">折算的孤月</p>
                  <p className="text-4xl font-serif text-ink">{results.months}<span className="text-sm italic ml-1">轮</span></p>
                </div>
              </div>

              <div className="space-y-8 pt-8 opacity-80">
                <blockquote className="text-2xl text-earth/80 font-serif italic leading-relaxed max-w-2xl mx-auto">
                  “如果每一刻的相处都是林间的静木，<br />
                  不言不语，却是扎根最深的挂念。”
                </blockquote>
                <div className="h-px w-24 bg-earth/20 mx-auto" />
                <p className="text-ink/40 text-xs tracking-widest">
                  生命有限，唯情不朽。请珍惜下一次重逢。
                </p>
              </div>
            </div>

            {/* Visual Forest Representation */}
            <div className="space-y-6">
              <p className="text-center text-earth/30 text-xs uppercase tracking-[0.4em]">每一面皆为林中一木</p>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 max-w-2xl mx-auto px-4 opacity-70">
                {Array.from({ length: Math.min(results.totalVisits, 150) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 0.005 * i }}
                    style={{ height: `${12 + Math.random() * 12}px` }}
                    className="w-1.5 bg-earth/40 rounded-t-full origin-bottom"
                  />
                ))}
                {results.totalVisits > 150 && (
                  <div className="text-[10px] text-earth/20 self-end border-b border-earth/10 pb-1">...</div>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => setStep('input')}
                className="group flex items-center gap-3 text-earth/40 hover:text-earth transition-all uppercase tracking-[0.2em] text-xs font-bold"
                id="reset-button"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                重刻年轮
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-8 text-[9px] text-earth/30 uppercase tracking-[0.5em] pointer-events-none text-center">
        寂静的木头 • 见你一面
      </footer>

      {/* Graduation Credit Line */}
      <div className="fixed bottom-4 left-6 text-[8px] text-earth/20 font-serif tracking-wider pointer-events-none">
        22级视觉传达设计毕业作品衍生品 李刚 12104005
      </div>

      {/* Aesthetic Accents */}
      <div className="fixed top-0 left-0 w-32 h-32 bg-moss/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-48 h-48 bg-ochre/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
