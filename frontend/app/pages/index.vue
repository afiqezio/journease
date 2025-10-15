import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Utensils, Map, Download, Share2, Save, Sparkles, Clock, Navigation, Camera } from 'lucide-react';

export default function TripPlannerApp() {
  const [tripDescription, setTripDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const generateItinerary = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setItinerary({
        destination: 'Japan',
        duration: '5 days',
        budget: 'RM 3,000',
        theme: ['Nature', 'Food'],
        days: [
          {
            day: 1,
            title: 'Arrival & Tokyo Exploration',
            activities: [
              { time: '09:00', name: 'Arrive at Narita Airport', type: 'transport', cost: 0 },
              { time: '11:00', name: 'Narita Express to Tokyo', type: 'transport', cost: 50 },
              { time: '13:00', name: 'Lunch at Tsukiji Outer Market', type: 'food', cost: 25 },
              { time: '15:00', name: 'Senso-ji Temple Visit', type: 'attraction', cost: 0 },
              { time: '18:00', name: 'Dinner at Ramen Alley', type: 'food', cost: 15 }
            ]
          },
          {
            day: 2,
            title: 'Mt. Fuji & Hakone Nature Day',
            activities: [
              { time: '07:00', name: 'Train to Hakone', type: 'transport', cost: 40 },
              { time: '10:00', name: 'Lake Ashi Boat Cruise', type: 'attraction', cost: 30 },
              { time: '13:00', name: 'Traditional Kaiseki Lunch', type: 'food', cost: 45 },
              { time: '15:00', name: 'Hakone Open-Air Museum', type: 'attraction', cost: 20 },
              { time: '19:00', name: 'Return to Tokyo', type: 'transport', cost: 40 }
            ]
          },
          {
            day: 3,
            title: 'Kyoto Cultural Experience',
            activities: [
              { time: '08:00', name: 'Shinkansen to Kyoto', type: 'transport', cost: 120 },
              { time: '11:00', name: 'Fushimi Inari Shrine Hike', type: 'attraction', cost: 0 },
              { time: '14:00', name: 'Lunch at Nishiki Market', type: 'food', cost: 20 },
              { time: '16:00', name: 'Arashiyama Bamboo Grove', type: 'attraction', cost: 0 },
              { time: '19:00', name: 'Traditional Izakaya Dinner', type: 'food', cost: 30 }
            ]
          }
        ],
        budgetBreakdown: {
          accommodation: 600,
          food: 450,
          transport: 380,
          attractions: 270,
          miscellaneous: 300
        },
        restaurants: [
          { name: 'Tsukiji Outer Market', cuisine: 'Seafood', budget: 'RM 25', rating: 4.8 },
          { name: 'Ichiran Ramen', cuisine: 'Ramen', budget: 'RM 15', rating: 4.7 },
          { name: 'Nishiki Market Stalls', cuisine: 'Street Food', budget: 'RM 20', rating: 4.6 }
        ],
        places: [
          { name: 'Senso-ji Temple', type: 'Cultural', duration: '2 hours', cost: 'Free' },
          { name: 'Lake Ashi', type: 'Nature', duration: '3 hours', cost: 'RM 30' },
          { name: 'Fushimi Inari', type: 'Cultural & Nature', duration: '3 hours', cost: 'Free' }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  const exportPDF = () => {
    alert('PDF export would be generated here using jsPDF or similar library');
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(itinerary, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trip-itinerary.json';
    link.click();
  };

  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Trip to Japan',
        text: 'Check out my AI-generated trip itinerary!',
        url: window.location.href
      });
    } else {
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TripGenius AI
                </h1>
                <p className="text-xs text-gray-500">Your intelligent travel companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                My Trips
              </button>
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!itinerary ? (
          /* Input Section */
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Describe Your Dream Trip
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your travel plans and let AI create the perfect itinerary for you
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Description
                </label>
                <textarea
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  placeholder="e.g., 5 days in Japan under RM3000, I love nature and food"
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">Auto-detected</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Budget</p>
                  <p className="text-sm font-semibold text-gray-900">Smart allocation</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <Sparkles className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Preferences</p>
                  <p className="text-sm font-semibold text-gray-900">Personalized</p>
                </div>
              </div>

              <button
                onClick={generateItinerary}
                disabled={!tripDescription || isGenerating}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Your Perfect Trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Itinerary with AI
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Trips Planned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-1">180+</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div>
            {/* Trip Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{itinerary.destination} Adventure</h2>
                  <div className="flex items-center gap-4 text-indigo-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {itinerary.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {itinerary.budget}
                    </span>
                    <div className="flex gap-2">
                      {itinerary.theme.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={shareTrip} className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Save className="w-5 h-5" />
                  </button>
                  <button onClick={exportPDF} className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
              {['overview', 'itinerary', 'budget', 'map'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      Top Places to Visit
                    </h3>
                    <div className="space-y-3">
                      {itinerary.places.map((place, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <Camera className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{place.name}</h4>
                            <p className="text-sm text-gray-600">{place.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{place.cost}</p>
                            <p className="text-xs text-gray-500">{place.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-purple-600" />
                      Recommended Restaurants
                    </h3>
                    <div className="space-y-3">
                      {itinerary.restaurants.map((restaurant, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{restaurant.budget}</p>
                            <p className="text-xs text-yellow-600">★ {restaurant.rating}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Overview</h3>
                    <div className="space-y-3">
                      {Object.entries(itinerary.budgetBreakdown).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 capitalize">{key}</span>
                            <span className="text-sm font-semibold text-gray-900">RM {value}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${(value / 2000) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          RM {Object.values(itinerary.budgetBreakdown).reduce((a, b) => a + b, 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                    <h3 className="font-bold text-gray-900 mb-2">💡 Travel Tips</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• JR Pass saves 30% on transport</li>
                      <li>• Visit temples before 9 AM</li>
                      <li>• Cash is king in Japan</li>
                      <li>• Download offline maps</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                {itinerary.days.map((day, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                      <h3 className="text-xl font-bold">Day {day.day}</h3>
                      <p className="text-indigo-100">{day.title}</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {day.activities.map((activity, j) => (
                          <div key={j} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                                {activity.time}
                              </div>
                              {j < day.activities.length - 1 && (
                                <div className="w-0.5 h-12 bg-indigo-200 my-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                                  <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {activity.cost > 0 ? `RM ${activity.cost}` : 'Free'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Budget Breakdown</h3>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(itinerary.budgetBreakdown).map(([category, amount]) => (
                    <div key={category} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 capitalize mb-2">{category}</h4>
                      <p className="text-3xl font-bold text-indigo-600 mb-3">RM {amount}</p>
                      <div className="w-full bg-gray-300 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                          style={{ width: `${(amount / 2000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <button onClick={exportJSON} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Export as JSON
                  </button>
                  <button onClick={exportPDF} className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all">
                    Download PDF
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">
                      Route visualization would integrate with Google Maps, Mapbox, or GeoServer
                    </p>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Open in Maps
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setItinerary(null)}
              className="mt-6 w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Create New Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}