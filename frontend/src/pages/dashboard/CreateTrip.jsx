import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    MapPin,
    DollarSign,
    Users,
    ArrowRight,
    ArrowLeft,
    Check,
    Plus,
    X
} from 'lucide-react';
import { tripsAPI, destinationsAPI } from '../../services/api';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        budget: '',
        travelers: 1,
        selectedDestinations: [],
        notes: ''
    });

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await destinationsAPI.getAll();
            // Handle both potential response structures (direct array or paginated object)
            const destinationsData = response.data.data;
            if (Array.isArray(destinationsData)) {
                setDestinations(destinationsData);
            } else if (destinationsData && Array.isArray(destinationsData.destinations)) {
                setDestinations(destinationsData.destinations);
            } else {
                setDestinations([]);
                console.error('Unexpected destinations data structure:', destinationsData);
            }
        } catch (error) {
            console.error('Error fetching destinations:', error);
            setDestinations([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleDestination = (destId) => {
        setFormData(prev => {
            const isSelected = prev.selectedDestinations.includes(destId);
            if (isSelected) {
                return {
                    ...prev,
                    selectedDestinations: prev.selectedDestinations.filter(id => id !== destId)
                };
            } else {
                return {
                    ...prev,
                    selectedDestinations: [...prev.selectedDestinations, destId]
                };
            }
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const tripData = {
                title: formData.title,
                startDate: formData.startDate,
                endDate: formData.endDate,
                budget: Number(formData.budget),
                travelers: Number(formData.travelers),
                destinations: formData.selectedDestinations,
                notes: formData.notes
            };

            await tripsAPI.create(tripData);
            navigate('/dashboard/trip-planner');
        } catch (error) {
            console.error('Error creating trip:', error);
            alert('Failed to create trip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const renderStep1 = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                        placeholder="e.g., Summer Adventure in Netarhat"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                                placeholder="25000"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="travelers"
                                value={formData.travelers}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => {
        console.log('Rendering Step 2, destinations:', destinations);

        if (!Array.isArray(destinations)) {
            return (
                <div className="text-center py-8 text-red-500">
                    Error loading destinations. Please try again later.
                </div>
            );
        }

        if (destinations.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500">
                    No destinations available.
                </div>
            );
        }

        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {destinations.map(dest => {
                        if (!dest) return null;
                        return (
                            <div
                                key={dest._id || Math.random()}
                                onClick={() => dest._id && toggleDestination(dest._id)}
                                className={`
                  cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-200
                  ${dest._id && formData.selectedDestinations.includes(dest._id)
                                        ? 'border-primary-500 ring-2 ring-primary-200'
                                        : 'border-gray-100 hover:border-primary-200'
                                    }
                `}
                            >
                                <div className="relative h-32">
                                    <img
                                        src={dest.images?.[0] || 'https://via.placeholder.com/300'}
                                        alt={dest.title || 'Destination'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300';
                                        }}
                                    />
                                    {dest._id && formData.selectedDestinations.includes(dest._id) && (
                                        <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-900">{dest.title || 'Untitled'}</h3>
                                    <p className="text-sm text-gray-500 truncate">{dest.location || 'Unknown Location'}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderStep3 = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Trip Summary</h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500">Title:</span>
                        <p className="font-medium text-gray-900">{formData.title}</p>
                    </div>
                    <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium text-gray-900">
                            {new Date(formData.startDate).toLocaleDateString()} - {new Date(formData.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <span className="text-gray-500">Budget:</span>
                        <p className="font-medium text-gray-900">₹{formData.budget}</p>
                    </div>
                    <div>
                        <span className="text-gray-500">Travelers:</span>
                        <p className="font-medium text-gray-900">{formData.travelers}</p>
                    </div>
                </div>

                <div>
                    <span className="text-gray-500 text-sm">Selected Destinations:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {destinations
                            .filter(d => formData.selectedDestinations.includes(d._id))
                            .map(d => (
                                <span key={d._id} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                                    {d.title}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                        placeholder="Any specific preferences or requirements..."
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gray-900">Plan Your Trip</h1>
                <p className="text-gray-500 mt-2">Create your perfect itinerary in just a few steps</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${step >= s ? 'bg-primary-600 text-white shadow-lg scale-110' : 'bg-white text-gray-400 border-2 border-gray-200'}
              `}
                        >
                            {s}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
                    <span>Details</span>
                    <span>Destinations</span>
                    <span>Review</span>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`
            flex items-center px-6 py-3 rounded-xl font-medium transition-all
            ${step === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }
          `}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                {step < 3 ? (
                    <button
                        onClick={nextStep}
                        className="flex items-center px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
                    >
                        Next Step
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                    >
                        {loading ? 'Creating Trip...' : 'Create Trip'}
                        {!loading && <Check className="w-5 h-5 ml-2" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateTrip;
