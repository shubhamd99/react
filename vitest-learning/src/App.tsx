import { useState, useEffect } from 'react';
import { 
  Sun, Moon, Code, TestTube, Play, Copy, Check, Info, 
  Terminal, ChevronRight, RefreshCw, Layers, Cpu, CheckCircle2, 
  Clock, FastForward, UserCheck, BookOpen 
} from 'lucide-react';

// Import examples & data
import { codeExamples } from './examples/codeData';
import type { CodeExample } from './examples/codeData';
import { FeedbackForm } from './examples/components';
import { useCounter } from './examples/hooks';
import { add, subtract, reverseString, calculateDiscount } from './examples/basic';

// Simple Code Highlighter Component
const CodeViewer = ({ code }: { code: string }) => {
  const highlightToken = (token: string, idx: number) => {
    // Comments
    if (token.startsWith('//') || token.startsWith('/*')) {
      return <span key={idx} className="text-slate-400 dark:text-slate-500 italic">{token}</span>;
    }
    // Strings
    if ((token.startsWith('"') && token.endsWith('"')) || 
        (token.startsWith("'") && token.endsWith("'")) || 
        (token.startsWith('`') && token.endsWith('`'))) {
      return <span key={idx} className="text-amber-600 dark:text-amber-400">{token}</span>;
    }
    // JS Keywords
    const keywords = ['import', 'export', 'from', 'const', 'let', 'function', 'return', 'switch', 'case', 'default', 'if', 'else', 'throw', 'new', 'try', 'catch', 'async', 'await', 'interface', 'type'];
    if (keywords.includes(token)) {
      return <span key={idx} className="text-violet-600 dark:text-violet-400 font-semibold">{token}</span>;
    }
    // Vitest Keywords
    const testKeywords = ['describe', 'it', 'test', 'expect', 'vi', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll', 'render', 'screen', 'fireEvent', 'renderHook', 'act', 'toBe', 'toEqual', 'toThrow', 'toBeCloseTo', 'resolves', 'rejects', 'toMatchSnapshot', 'toMatchInlineSnapshot'];
    if (testKeywords.includes(token)) {
      return <span key={idx} className="text-sky-600 dark:text-sky-400 font-semibold">{token}</span>;
    }
    // Numbers
    if (!isNaN(Number(token)) && token.trim() !== '') {
      return <span key={idx} className="text-teal-600 dark:text-teal-400">{token}</span>;
    }
    return <span key={idx}>{token}</span>;
  };

  // Regex to split comments, strings, and keywords
  const regex = /(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`|\b[a-zA-Z_]\w*\b)/gm;
  const tokens = code.split(regex);

  return (
    <pre className="text-xs md:text-sm font-mono overflow-auto p-4 md:p-6 bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-slate-200 rounded-lg shadow-inner max-h-[500px] leading-relaxed select-text text-left">
      <code>
        {tokens.map((token, index) => highlightToken(token, index))}
      </code>
    </pre>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeCategory, setActiveCategory] = useState<string>('basic');
  const [activeTab, setActiveTab] = useState<'source' | 'test' | 'interactive' | 'concepts'>('source');
  const [copied, setCopied] = useState<boolean>(false);

  // Live basic values
  const [calcA, setCalcA] = useState<number>(5);
  const [calcB, setCalcB] = useState<number>(3);
  const [stringToReverse, setStringToReverse] = useState<string>('Hello Vitest');
  const price = 100;
  const [discountCode, setDiscountCode] = useState<string>('SAVE20');

  // Live Component Submissions Log
  const [submissionLog, setSubmissionLog] = useState<{ rating: number; comment: string; time: string }[]>([]);

  // Live Hooks State
  const counter = useCounter(10, { min: 0, max: 20, step: 2 });
  const [simulatedFetchUrl, setSimulatedFetchUrl] = useState<string>('https://api.example.com/todo');
  const [simulatedFetchState, setSimulatedFetchState] = useState<{ data: unknown; loading: boolean; error: string | null }>({
    data: null,
    loading: false,
    error: null
  });

  // Live Mocking State
  const [mockWeatherCity, setMockWeatherCity] = useState<string>('Miami');
  const [mockWeatherTemp, setMockWeatherTemp] = useState<number>(30);
  const [mockWeatherCondition, setMockWeatherCondition] = useState<string>('Sunny');
  const [mockRecommendation, setMockRecommendation] = useState<string>('');
  const [weatherLog, setWeatherLog] = useState<string[]>([]);
  const [alertStatus, setAlertStatus] = useState<'idle' | 'scheduled' | 'triggered'>('idle');
  const [alertDelay, setAlertDelay] = useState<number>(5); // seconds
  const [alertProgress, setAlertProgress] = useState<number>(0);

  // Live Async & Snapshot State
  const [snapshotUser, setSnapshotUser] = useState({
    name: 'Sarah Connor',
    email: 'sconnor@resistance.net',
    role: 'admin' as 'admin' | 'editor' | 'subscriber',
    status: 'active' as 'active' | 'suspended'
  });
  const [asyncValue, setAsyncValue] = useState<string>('Vitest');
  const [asyncResult, setAsyncResult] = useState<string>('');
  const [asyncLoading, setAsyncLoading] = useState<boolean>(false);

  // Dark Mode Toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Alert Timer Simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (alertStatus === 'scheduled') {
      interval = setInterval(() => {
        setAlertProgress(prev => {
          if (prev >= 100) {
            setAlertStatus('triggered');
            clearInterval(interval);
            return 100;
          }
          return prev + (100 / alertDelay);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [alertStatus, alertDelay]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run Mock Recommendation
  const runMockWeatherRecommend = () => {
    setWeatherLog(prev => [
      ...prev,
      `[API Fetch] GET https://api.weather.local/v1/${mockWeatherCity}`,
      `[Mock Inject] Returning temp: ${mockWeatherTemp}°C, condition: "${mockWeatherCondition}"`,
    ]);

    let recommendation = '';
    if (mockWeatherTemp < 10) {
      recommendation = 'Stay indoors and drink hot chocolate';
    } else if (mockWeatherCondition.toLowerCase().includes('rain')) {
      recommendation = 'Bring an umbrella for a light walk';
    } else if (mockWeatherTemp > 25) {
      recommendation = 'Perfect day for swimming!';
    } else {
      recommendation = 'Great day for a jog in the park';
    }

    setMockRecommendation(recommendation);
    setWeatherLog(prev => [...prev, `[Result] recommendation: "${recommendation}"`]);
  };

  // Run Async Delay Action
  const runAsyncDelay = () => {
    setAsyncLoading(true);
    setAsyncResult('');
    setTimeout(() => {
      if (!asyncValue) {
        setAsyncResult('Error: Value cannot be empty');
      } else {
        setAsyncResult(`Resolved Result: "Data: ${asyncValue}"`);
      }
      setAsyncLoading(false);
    }, 1500);
  };

  const currentExample: CodeExample = codeExamples[activeCategory] || codeExamples.basic;

  // CodeViewer is declared outside the App component to follow React best practices

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Premium Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 glass shadow-sm py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-extrabold text-xl tracking-tight">
            V
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent m-0">
              Vitest Sandbox
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Interactive Testing Workspace & Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Categories & Run Tests Guide */}
        <section className="lg:col-span-4 flex flex-col gap-6" aria-label="Sidebar navigation">
          
          {/* Runner Commands */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={18} className="text-indigo-500" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 m-0">
                Run Real Tests
              </h2>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Vitest is configured! Copy and run these commands in your project folder:
            </p>

            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Run CLI test suite', cmd: 'npm run test:run' },
                { label: 'Start Vitest UI Runner', cmd: 'npm run test:ui' },
                { label: 'Check code coverage', cmd: 'npm run coverage' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">{item.label}</span>
                    <code className="text-xs bg-transparent p-0 text-slate-800 dark:text-slate-200 font-mono mt-0.5">{item.cmd}</code>
                  </div>
                  <button
                    onClick={() => handleCopy(item.cmd)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200 dark:hover:bg-slate-850"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Examples Navigation */}
          <nav className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-3 px-1">
              <BookOpen size={18} className="text-indigo-500" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 m-0">
                Testing Modules
              </h2>
            </div>

            {Object.keys(codeExamples).map((key) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setActiveTab('source');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isActive 
                      ? 'border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-650 dark:text-slate-350'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm">{codeExamples[key].title}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {codeExamples[key].description}
                    </span>
                  </div>
                  <ChevronRight size={14} className={`opacity-65 transition-transform ${isActive ? 'rotate-90 text-indigo-500' : ''}`} />
                </button>
              );
            })}
          </nav>
        </section>

        {/* Right column: Content Viewer (Source, Test, Interactive, Key concepts) */}
        <section className="lg:col-span-8 flex flex-col gap-6" aria-label="Content viewer">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col min-h-[500px]">
            
            {/* Category Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 m-0">
                  {currentExample.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  {currentExample.description}
                </p>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
              {[
                { id: 'source', label: 'Implementation Code', icon: Code },
                { id: 'test', label: 'Vitest Code', icon: TestTube },
                { id: 'interactive', label: 'Interactive Runner', icon: Play },
                { id: 'concepts', label: 'Key API Concepts', icon: Info }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'source' | 'test' | 'interactive' | 'concepts')}
                    className={`flex items-center gap-2 pb-3 px-3 text-sm border-b-2 font-medium transition-colors ${
                      isActive 
                        ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
                        : 'border-transparent text-slate-400 hover:text-slate-650 hover:border-slate-300 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 flex flex-col">
              
              {/* PANEL: Source Code */}
              {activeTab === 'source' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{currentExample.sourcePath}</span>
                    <button
                      onClick={() => handleCopy(currentExample.sourceCode)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <CodeViewer code={currentExample.sourceCode} />
                </div>
              )}

              {/* PANEL: Test Code */}
              {activeTab === 'test' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{currentExample.testPath}</span>
                    <button
                      onClick={() => handleCopy(currentExample.testCode)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <CodeViewer code={currentExample.testCode} />
                </div>
              )}

              {/* PANEL: Key Concepts */}
              {activeTab === 'concepts' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                        <th className="py-3 px-4 font-semibold">Vitest API / Method</th>
                        <th className="py-3 px-4 font-semibold">Purpose & Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {currentExample.keyConcepts.map((concept, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                          <td className="py-4 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{concept.name}</td>
                          <td className="py-4 px-4 text-slate-550 dark:text-slate-450">{concept.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PANEL: Interactive Sandbox */}
              {activeTab === 'interactive' && (
                <div className="flex-1 flex flex-col gap-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-150 dark:border-slate-900">
                  
                  {/* Category 1: Basic Math & Discount sandbox */}
                  {activeCategory === 'basic' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Math box */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <Layers size={15} /> Math Operations Calculator
                          </h4>
                          <div className="flex items-center gap-3 mb-4">
                            <input
                              type="number"
                              value={calcA}
                              onChange={(e) => setCalcA(Number(e.target.value))}
                              className="w-16 p-1.5 border border-slate-300 rounded dark:bg-slate-950 text-sm text-center"
                            />
                            <span className="font-bold text-slate-400">+ / -</span>
                            <input
                              type="number"
                              value={calcB}
                              onChange={(e) => setCalcB(Number(e.target.value))}
                              className="w-16 p-1.5 border border-slate-300 rounded dark:bg-slate-950 text-sm text-center"
                            />
                          </div>
                          <div className="flex flex-col gap-2 text-xs font-mono">
                            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                              <span>add(a, b):</span>
                              <span className="font-bold text-indigo-600 dark:text-indigo-400">{add(calcA, calcB)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span>subtract(a, b):</span>
                              <span className="font-bold text-indigo-600 dark:text-indigo-400">{subtract(calcA, calcB)}</span>
                            </div>
                          </div>
                        </div>

                        {/* String & Discount box */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <RefreshCw size={15} /> String & Discount Actions
                          </h4>
                          <div className="mb-4">
                            <label className="block text-[11px] text-slate-400 font-semibold mb-1">String to reverse:</label>
                            <input
                              type="text"
                              value={stringToReverse}
                              onChange={(e) => setStringToReverse(e.target.value)}
                              className="w-full p-1.5 border border-slate-300 rounded dark:bg-slate-950 text-sm"
                            />
                            <span className="block text-[11px] text-indigo-500 font-mono mt-1">
                              Result: "{reverseString(stringToReverse)}"
                            </span>
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 font-semibold mb-1">Discount Code (SAVE10, SAVE20, WELCOME):</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="w-full p-1.5 border border-slate-300 rounded dark:bg-slate-950 text-sm"
                              />
                            </div>
                            <span className="block text-[11px] text-indigo-500 font-mono mt-1">
                              calculateDiscount(100, "{discountCode}"): ${calculateDiscount(price, discountCode)}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Category 2: React component test simulation */}
                  {activeCategory === 'components' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7">
                        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3">
                          Rendered Component
                        </h4>
                        <FeedbackForm 
                          onSubmit={(data) => {
                            setSubmissionLog(prev => [
                              ...prev,
                              { ...data, time: new Date().toLocaleTimeString() }
                            ]);
                          }} 
                        />
                      </div>
                      
                      <div className="md:col-span-5 flex flex-col gap-4">
                        <div>
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3">
                            Mock Callback trigger log
                          </h4>
                          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[150px] text-xs font-mono">
                            {submissionLog.length === 0 ? (
                              <p className="text-slate-400 italic">No onSubmit logs yet. Try submit the form.</p>
                            ) : (
                              <div className="flex flex-col gap-2">
                                {submissionLog.map((log, index) => (
                                  <div key={index} className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded">
                                    <div className="flex justify-between font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                                      <span>Trigger {index + 1}</span>
                                      <span>{log.time}</span>
                                    </div>
                                    <pre className="text-[10px] text-slate-600 dark:text-slate-300">
                                      {JSON.stringify({ rating: log.rating, comment: log.comment }, null, 2)}
                                    </pre>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category 3: Hook testing simulation */}
                  {activeCategory === 'hooks' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* useCounter container */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                          <Cpu size={15} /> useCounter Hook Simulator
                        </h4>
                        
                        <div className="flex-1 flex flex-col items-center justify-center py-6">
                          <div className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Hook State</div>
                          <div className="text-5xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-6">
                            {counter.count}
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={counter.decrement}
                              className="px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 font-bold"
                            >
                              - Decrement (Step 2)
                            </button>
                            <button 
                              onClick={counter.increment}
                              className="px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 font-bold"
                            >
                              + Increment (Step 2)
                            </button>
                          </div>
                          <button 
                            onClick={counter.reset}
                            className="mt-4 text-xs text-slate-500 hover:underline"
                          >
                            Reset to Initial (10)
                          </button>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-100 dark:border-slate-900 text-[11px]">
                          <span className="font-bold text-slate-650 dark:text-slate-350">Tip:</span> In hooks testing, state changes are triggered with `result.current.increment()` wrapped in `act()` to trigger react reconciliation cycle.
                        </div>
                      </div>

                      {/* useFetch container */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                          <RefreshCw size={15} /> useFetch Mock Simulator
                        </h4>

                        <div className="mb-4">
                          <label className="block text-[11px] text-slate-400 font-semibold mb-1">Simulated Fetch URL:</label>
                          <div className="flex gap-2">
                            <select 
                              value={simulatedFetchUrl}
                              onChange={(e) => setSimulatedFetchUrl(e.target.value)}
                              className="flex-1 p-1.5 border border-slate-300 rounded text-xs dark:bg-slate-950"
                            >
                              <option value="https://api.example.com/todo">https://api.example.com/todo (Success)</option>
                              <option value="https://api.example.com/notfound">https://api.example.com/notfound (404 Error)</option>
                            </select>
                            <button
                              onClick={() => {
                                setSimulatedFetchState({ data: null, loading: true, error: null });
                                setTimeout(() => {
                                  if (simulatedFetchUrl.includes('notfound')) {
                                    setSimulatedFetchState({ data: null, loading: false, error: 'HTTP error! status: 404' });
                                  } else {
                                    setSimulatedFetchState({ data: { id: 1, title: 'Learn Vitest' }, loading: false, error: null });
                                  }
                                }, 1200);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 rounded flex items-center gap-1"
                            >
                              Fetch
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 font-mono text-xs overflow-auto min-h-[120px]">
                          {simulatedFetchState.loading && (
                            <div className="flex items-center gap-2 text-indigo-500 py-3">
                              <RefreshCw size={14} className="animate-spin" />
                              <span>Fetching from API...</span>
                            </div>
                          )}
                          {!simulatedFetchState.loading && !simulatedFetchState.data && !simulatedFetchState.error && (
                            <span className="text-slate-450 italic">Click "Fetch" to run fetch hook simulation.</span>
                          )}
                          {!!simulatedFetchState.data && (
                            <div>
                              <div className="text-[10px] text-emerald-500 font-semibold mb-1">200 OK</div>
                              <pre className="text-[11px] text-slate-700 dark:text-slate-300">
                                {JSON.stringify(simulatedFetchState.data, null, 2)}
                              </pre>
                            </div>
                          )}
                          {simulatedFetchState.error && (
                            <div>
                              <div className="text-[10px] text-rose-500 font-semibold mb-1">FETCH ERROR</div>
                              <div className="text-rose-650 dark:text-rose-400">{simulatedFetchState.error}</div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Category 4: Mocking & Spies sandbox */}
                  {activeCategory === 'mocking' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* API Mocks */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <Layers size={15} /> Simulated API & Module Mocking
                          </h4>

                          <div className="flex flex-col gap-3 mb-4">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">City Input:</label>
                              <select 
                                value={mockWeatherCity}
                                onChange={(e) => setMockWeatherCity(e.target.value)}
                                className="w-full p-1.5 border border-slate-300 rounded text-xs dark:bg-slate-950"
                              >
                                <option value="Miami">Miami (Hot weather mock)</option>
                                <option value="Oslo">Oslo (Cold weather mock)</option>
                                <option value="London">London (Rainy weather mock)</option>
                                <option value="Unknown">Unknown (Error weather mock)</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Mock Temp (°C):</label>
                                <input
                                  type="number"
                                  value={mockWeatherTemp}
                                  onChange={(e) => setMockWeatherTemp(Number(e.target.value))}
                                  className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Mock Condition:</label>
                                <input
                                  type="text"
                                  value={mockWeatherCondition}
                                  onChange={(e) => setMockWeatherCondition(e.target.value)}
                                  className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                                />
                              </div>
                            </div>

                            <button
                              onClick={runMockWeatherRecommend}
                              className="w-full mt-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded shadow-sm"
                            >
                              Run recommendActivity("{mockWeatherCity}")
                            </button>
                          </div>

                          <div className="flex-1 p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 font-mono text-xs min-h-[110px]">
                            {weatherLog.length === 0 ? (
                              <span className="text-slate-400 italic">No output yet. Trigger the recommendation function.</span>
                            ) : (
                              <div className="flex flex-col gap-1">
                                {weatherLog.map((log, i) => (
                                  <div key={i} className={
                                    log.startsWith('[API') ? 'text-indigo-500' :
                                    log.startsWith('[Mock') ? 'text-purple-500' : 'text-emerald-500'
                                  }>
                                    {log}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {mockRecommendation && (
                            <div className="mt-3 p-2.5 rounded bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                              Recommendation: "{mockRecommendation}"
                            </div>
                          )}
                        </div>

                        {/* Fake Timers */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <Clock size={15} /> Fake Timers Simulation
                          </h4>

                          <p className="text-xs text-slate-500 mb-4">
                            In Vitest, `vi.useFakeTimers()` intercepts JS timer APIs so you don't have to wait during tests.
                          </p>

                          <div className="flex gap-2 items-center mb-4">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Delay:</label>
                            <input
                              type="number"
                              min={1}
                              max={60}
                              value={alertDelay}
                              onChange={(e) => setAlertDelay(Math.max(1, Number(e.target.value)))}
                              className="w-16 p-1 border border-slate-350 rounded text-xs dark:bg-slate-950 text-center"
                              disabled={alertStatus === 'scheduled'}
                            />
                            <span className="text-xs text-slate-500">seconds</span>
                          </div>

                          <div className="flex gap-2.5 mb-6">
                            <button
                              onClick={() => {
                                setAlertStatus('scheduled');
                                setAlertProgress(0);
                              }}
                              disabled={alertStatus === 'scheduled'}
                              className="flex-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-350 text-white font-semibold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5"
                            >
                              <Play size={13} />
                              <span>Schedule Alert ({alertDelay}s)</span>
                            </button>

                            <button
                              onClick={() => {
                                if (alertStatus === 'scheduled') {
                                  setAlertProgress(100);
                                  setAlertStatus('triggered');
                                }
                              }}
                              disabled={alertStatus !== 'scheduled'}
                              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <FastForward size={13} />
                              <span>Fast-Forward (vi.advanceTimers)</span>
                            </button>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center py-2">
                            {alertStatus === 'idle' && (
                              <div className="text-slate-400 italic text-xs">Waiting for schedule...</div>
                            )}

                            {alertStatus === 'scheduled' && (
                              <div className="w-full flex flex-col items-center">
                                <div className="text-xs text-indigo-500 animate-pulse font-semibold mb-2">
                                  Running simulated timer... ({Math.ceil((100 - alertProgress) * alertDelay / 100)}s left)
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2">
                                  <div 
                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${alertProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            {alertStatus === 'triggered' && (
                              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-150 dark:border-emerald-900/50 rounded font-semibold animate-bounce">
                                <CheckCircle2 size={16} />
                                <span>Alert Callback Successfully Triggered!</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Category 5: Async & Snapshots sandbox */}
                  {activeCategory === 'asyncSnapshots' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Async Data Fetch */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <Clock size={15} /> Async Promise Assertions
                          </h4>
                          
                          <p className="text-xs text-slate-500 mb-4">
                            Test promise resolutions/rejections using Vitest's `resolves` and `rejects` matchers.
                          </p>

                          <div className="flex flex-col gap-3 mb-4">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Mock Payload Value:</label>
                              <input
                                type="text"
                                value={asyncValue}
                                onChange={(e) => setAsyncValue(e.target.value)}
                                className="w-full p-1.5 border border-slate-300 rounded text-xs dark:bg-slate-950"
                                placeholder="Enter string payload"
                              />
                            </div>

                            <button
                              onClick={runAsyncDelay}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded shadow-sm"
                            >
                              Trigger Async Action
                            </button>
                          </div>

                          <div className="flex-1 p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 font-mono text-xs flex items-center justify-center min-h-[90px]">
                            {asyncLoading && (
                              <div className="flex items-center gap-2 text-indigo-500">
                                <RefreshCw size={14} className="animate-spin" />
                                <span>Waiting 1.5 seconds (Simulated Delay)...</span>
                              </div>
                            )}
                            {!asyncLoading && !asyncResult && (
                              <span className="text-slate-400 italic">No output yet. Run the action.</span>
                            )}
                            {!asyncLoading && asyncResult && (
                              <div className={asyncResult.startsWith('Error') ? 'text-rose-500 font-semibold' : 'text-emerald-500 font-semibold'}>
                                {asyncResult}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Snapshot Testing */}
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350 mb-3 flex items-center gap-1.5">
                            <UserCheck size={15} /> Interactive UI Snapshot Testing
                          </h4>

                          <p className="text-xs text-slate-500 mb-4">
                            Adjust variables to change the rendered UserCard component, and view its HTML output block.
                          </p>

                          <div className="grid grid-cols-2 gap-2.5 mb-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Name:</label>
                              <input
                                type="text"
                                value={snapshotUser.name}
                                onChange={(e) => setSnapshotUser(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Email:</label>
                              <input
                                type="text"
                                value={snapshotUser.email}
                                onChange={(e) => setSnapshotUser(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Role:</label>
                              <select
                                value={snapshotUser.role}
                                onChange={(e) => setSnapshotUser(prev => ({ ...prev, role: e.target.value as 'admin' | 'editor' | 'subscriber' }))}
                                className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                              >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="subscriber">Subscriber</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 mb-1">Status:</label>
                              <select
                                value={snapshotUser.status}
                                onChange={(e) => setSnapshotUser(prev => ({ ...prev, status: e.target.value as 'active' | 'suspended' }))}
                                className="w-full p-1 border border-slate-300 rounded text-xs dark:bg-slate-950"
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col gap-3">
                            <div className="text-[11px] font-semibold text-slate-450 uppercase">HTML Snapshot Output</div>
                            <pre className="p-3 rounded bg-slate-900 dark:bg-slate-950 text-emerald-450 font-mono text-[9px] overflow-auto leading-relaxed border border-slate-800 text-left max-h-[140px]">
{`<div class="p-4 rounded-lg border border-slate-200 bg-white shadow-sm max-w-sm">
  <div class="flex justify-between items-start mb-2">
    <h4 class="font-bold text-slate-800">${snapshotUser.name}</h4>
    <span class="px-2 py-0.5 rounded text-xs font-semibold ${snapshotUser.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
      ${snapshotUser.status}
    </span>
  </div>
  <p class="text-sm text-slate-500 mb-2">${snapshotUser.email}</p>
  <div class="flex gap-2">
    <span class="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium capitalize">
      Role: ${snapshotUser.role}
    </span>
  </div>
</div>`}
                            </pre>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </section>

      </main>

      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 px-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900">
        <p>© 2026 Vitest Learning Sandbox. Built with React 19, TypeScript, and Tailwind CSS v4.</p>
      </footer>
    </div>
  );
}
