import React, { useState } from 'react';
import { Brain, Zap, Target, Shield, Sparkles, ExternalLink, Star } from 'lucide-react';
import ModelDetail from './components/ModelDetail';

const getOfficialLink = (modelId: string): string => {
  const links: Record<string, string> = {
    'claude-sonnet-4': 'https://www.anthropic.com/claude',
    'claude-opus-41': 'https://www.anthropic.com/claude',
    'gemini-25-pro': 'https://gemini.google/overview/',
    'chatgpt-5': 'https://openai.com/vi-VN/',
    'grok-4': 'https://x.ai/'
  };
  return links[modelId] || '#';
};

interface ModelData {
  id: string;
  name: string;
  company: string;
  version: string;
  releaseDate: string;
  description: string;
  strengths: string[];
  pricing: string;
  contextWindow: string;
  multimodal: boolean;
  codeGeneration: number;
  reasoning: number;
  creativity: number;
  safety: number;
  speed: number;
  color: string;
  gradient: string;
}

const models: ModelData[] = [
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    company: 'Anthropic',
    version: '4.0',
    releaseDate: '2025',
    description: 'The balanced powerhouse combining exceptional performance with efficiency for everyday use.',
    strengths: ['Excellent reasoning', 'Code generation', 'Content creation', 'Safety-focused'],
    pricing: '$3/1M tokens',
    contextWindow: '200K tokens',
    multimodal: true,
    codeGeneration: 95,
    reasoning: 93,
    creativity: 90,
    safety: 98,
    speed: 88,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'claude-opus-41',
    name: 'Claude Opus 4.1',
    company: 'Anthropic',
    version: '4.1',
    releaseDate: '2025',
    description: 'The most capable model in the Claude family, designed for complex reasoning and analysis.',
    strengths: ['Superior reasoning', 'Complex analysis', 'Research assistance', 'Academic writing'],
    pricing: '$15/1M tokens',
    contextWindow: '200K tokens',
    multimodal: true,
    codeGeneration: 97,
    reasoning: 98,
    creativity: 94,
    safety: 99,
    speed: 75,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'gemini-25-pro',
    name: 'Gemini 2.5 Pro',
    company: 'Google',
    version: '2.5',
    releaseDate: '2025',
    description: 'Google\'s most advanced multimodal AI with exceptional performance across all domains.',
    strengths: ['Multimodal excellence', 'Fast processing', 'Integration with Google services', 'Long context'],
    pricing: '$7/1M tokens',
    contextWindow: '2M tokens',
    multimodal: true,
    codeGeneration: 92,
    reasoning: 94,
    creativity: 88,
    safety: 92,
    speed: 95,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'chatgpt-5',
    name: 'ChatGPT 5',
    company: 'OpenAI',
    version: '5.0',
    releaseDate: '2025',
    description: 'The latest iteration of ChatGPT with revolutionary capabilities and enhanced reasoning.',
    strengths: ['Conversational AI', 'General knowledge', 'Problem solving', 'Wide accessibility'],
    pricing: '$10/1M tokens',
    contextWindow: '128K tokens',
    multimodal: true,
    codeGeneration: 90,
    reasoning: 91,
    creativity: 95,
    safety: 90,
    speed: 92,
    color: 'green',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    company: 'xAI',
    version: '4.0',
    releaseDate: '2025',
    description: 'xAI\'s rebellious and witty AI with real-time information and unique personality.',
    strengths: ['Real-time data', 'Wit and humor', 'Current events', 'Unconventional responses'],
    pricing: '$5/1M tokens',
    contextWindow: '100K tokens',
    multimodal: true,
    codeGeneration: 85,
    reasoning: 87,
    creativity: 92,
    safety: 85,
    speed: 90,
    color: 'gray',
    gradient: 'from-gray-600 to-gray-800'
  }
];

function App() {
  const [selectedComparison, setSelectedComparison] = useState('overview');
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (selectedModel) {
    return <ModelDetail model={selectedModel} onBack={() => setSelectedModel(null)} />;
  }

  const SkillBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-gradient-to-r ${color === 'orange' ? 'from-orange-500 to-red-500' :
            color === 'purple' ? 'from-purple-500 to-indigo-500' :
            color === 'blue' ? 'from-blue-500 to-cyan-500' :
            color === 'green' ? 'from-green-500 to-teal-500' :
            'from-gray-600 to-gray-800'
          } h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Comparison Hub</h1>
                <p className="text-sm text-gray-600">Compare the world's leading AI models</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('models-section')} className="text-gray-600 hover:text-gray-900 transition-colors">Models</button>
              <button onClick={() => scrollToSection('comparison-section')} className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('comparison-section')} className="text-gray-600 hover:text-gray-900 transition-colors">Benchmarks</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            Latest AI Models Comparison 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Compare Claude Sonnet 4, Opus 4.1, Gemini 2.5 Pro, ChatGPT 5, and Grok 4. 
            Discover which AI model best suits your needs with detailed analysis and benchmarks.
          </p>
          <p className="text-sm text-gray-400 mb-10 max-w-3xl mx-auto">
            Lưu ý : Đây là ý kiến cá nhân , không phải thông tin chính thức. Xin vui lòng kiểm tra thông tin. Góp ý qua đường linl "https://github.com/manhtien-2k14/AI-Comparison-Hub.git"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => scrollToSection('models-section')}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Compare Models
            </button>
            <button 
              onClick={() => scrollToSection('comparison-section')}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              View Benchmarks
            </button>
          </div>
        </div>
      </section>

      {/* Model Cards Grid */}
      <section id="models-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leading AI Models</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the capabilities of the most advanced AI models available today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <div
                key={model.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${model.gradient}`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="font-medium">{model.company}</span>
                        <span>•</span>
                        <span>{model.version}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{model.description}</p>

                  <div className="space-y-3 mb-6">
                    <SkillBar label="Code Generation" value={model.codeGeneration} color={model.color} />
                    <SkillBar label="Reasoning" value={model.reasoning} color={model.color} />
                    <SkillBar label="Creativity" value={model.creativity} color={model.color} />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting at</p>
                      <p className="text-lg font-bold text-gray-900">{model.pricing}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <a
                        href={getOfficialLink(model.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 bg-gradient-to-r ${model.gradient} text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center space-x-1 text-sm`}
                      >
                        <span>Try Now</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <button 
                        onClick={() => setSelectedModel(model)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Access to Official Sites</h2>
            <p className="text-gray-300">Jump directly to each AI model's official website</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {models.map((model) => (
              <a
                key={model.id}
                href={getOfficialLink(model.id)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-4`}
                style={{
                  borderLeftColor: hoveredModel === model.id ? 
                    (model.color === 'orange' ? '#f97316' :
                     model.color === 'purple' ? '#a855f7' :
                     model.color === 'blue' ? '#3b82f6' :
                     model.color === 'green' ? '#10b981' : '#6b7280') : 'transparent'
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
              >
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{model.company}</p>
                  <div className="flex items-center justify-center space-x-1 text-gray-500 group-hover:text-gray-700">
                    <span className="text-sm">Visit Site</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section id="comparison-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Detailed Comparison</h2>
            <p className="text-xl text-gray-600">Side-by-side comparison of key features and capabilities</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Feature</th>
                    {models.map((model) => (
                      <th key={model.id} className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        <div className="flex flex-col items-center">
                          <span className="mb-1">{model.name}</span>
                          <span className="text-xs text-gray-500 normal-case">{model.company}</span>
                          <a
                            href={getOfficialLink(model.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <span>Official Site</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Context Window</td>
                    {models.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-center text-gray-700">{model.contextWindow}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Multimodal</td>
                    {models.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          model.multimodal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {model.multimodal ? 'Yes' : 'No'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Pricing</td>
                    {models.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-center font-semibold text-gray-900">{model.pricing}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Release Date</td>
                    {models.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-center text-gray-700">{model.releaseDate}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Official Website</td>
                    {models.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-center">
                        <a
                          href={getOfficialLink(model.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${model.gradient} text-white rounded-full text-sm font-medium hover:opacity-90 transition-all space-x-1`}
                        >
                          <span>Visit</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose These Models?</h2>
            <p className="text-xl text-gray-600">Each model excels in different areas to meet your specific needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Get responses in milliseconds with optimized processing power</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Reasoning</h3>
              <p className="text-gray-600">Complex problem solving with human-like reasoning capabilities</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Precision Accuracy</h3>
              <p className="text-gray-600">Highly accurate results across multiple domains and use cases</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600">Built with advanced safety measures and ethical guidelines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI Comparison Hub</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted source for AI model comparisons and insights.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Models</h3>
              <ul className="space-y-2 text-gray-400">
                {models.map((model) => (
                  <li key={model.id}>
                    <a 
                      href={getOfficialLink(model.id)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <span>{model.name}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Mã nguồn mở</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="https://github.com/manhtien-2k14/AI-Comparison-Hub.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 AI Comparison Hub. All rights reserved. Made by Zweyx.
            </p>
                  </div>
                </div>
              </footer>
    </div>
  );
}

export default App;