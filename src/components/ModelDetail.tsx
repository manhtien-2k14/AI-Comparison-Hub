import React from 'react';
import { ArrowLeft, ExternalLink, Star, Zap, Brain, Shield, Clock, DollarSign } from 'lucide-react';

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

interface ModelDetailProps {
  model: {
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
  };
  onBack: () => void;
}

const ModelDetail: React.FC<ModelDetailProps> = ({ model, onBack }) => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced Reasoning',
      description: 'Sophisticated problem-solving capabilities with human-like logic',
      score: model.reasoning
    },
    {
      icon: Zap,
      title: 'Code Generation',
      description: 'Generate, debug, and optimize code across multiple programming languages',
      score: model.codeGeneration
    },
    {
      icon: Shield,
      title: 'Safety & Ethics',
      description: 'Built-in safety measures and ethical guidelines for responsible AI',
      score: model.safety
    },
    {
      icon: Clock,
      title: 'Processing Speed',
      description: 'Fast response times for real-time applications and interactions',
      score: model.speed
    }
  ];

  const useCases = [
    'Content Creation & Writing',
    'Code Development & Debugging',
    'Research & Analysis',
    'Creative Projects',
    'Business Automation',
    'Educational Support'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Comparison</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${model.gradient} py-20`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            {model.company} • Version {model.version}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {model.name}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {model.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href={getOfficialLink(model.id)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
            >
              <span>Try {model.name}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a 
              href={getOfficialLink(model.id)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center space-x-2"
            >
              <span>
              View Documentation
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <DollarSign className="h-8 w-8 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.pricing}</h3>
              <p className="text-gray-600">Starting Price</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Brain className="h-8 w-8 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.contextWindow}</h3>
              <p className="text-gray-600">Context Window</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Zap className="h-8 w-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.multimodal ? 'Yes' : 'No'}</h3>
              <p className="text-gray-600">Multimodal</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Clock className="h-8 w-8 mx-auto mb-4 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.releaseDate}</h3>
              <p className="text-gray-600">Release Date</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Capabilities</h2>
            <p className="text-xl text-gray-600">What makes {model.name} exceptional</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${model.gradient} rounded-xl`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Performance</span>
                      <span className="text-sm font-bold text-gray-900">{feature.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`bg-gradient-to-r ${model.gradient} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${feature.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Strengths</h2>
            <p className="text-xl text-gray-600">Areas where {model.name} excels</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {model.strengths.map((strength, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
                <div className={`w-12 h-12 bg-gradient-to-r ${model.gradient} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{strength}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-xl text-gray-600">Common use cases and applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${model.gradient} rounded-lg flex items-center justify-center`}>
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{useCase}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 bg-gradient-to-r ${model.gradient}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to experience {model.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust {model.name} for their AI needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href={getOfficialLink(model.id)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a 
              href={getOfficialLink(model.id)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all inline-flex items-center space-x-2"
            >
              <span>Contact Sales</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;