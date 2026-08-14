'use client';

import { useState } from 'react';
import { Star, X, ExternalLink } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    name: 'prinka thapar',
    rating: 5.0,
    date: '2026-05-12',
    comment: 'Really happy with our car buying experience! Rishabh was kind, professional, and made everything smooth and simple. Thanks again!',
    initial: 'P',
    bgColor: 'bg-slate-500',
  },
  {
    id: 2,
    name: 'Adeeb Raheja',
    rating: 5.0,
    date: '2026-05-12',
    comment: 'Bought my car from Rishabh Pabbi at Gedi Route Cars and had an amazing experience. Super helpful, knowledgeable, and easy to deal with. Highly recommend Rishabh at Gedi Route Cars. Very transparent throughout the process and got me approved quickly with a great deal.',
    initial: 'A',
    bgColor: 'bg-sky-600',
  },
  {
    id: 3,
    name: ' Prabhsimran singh',
    rating: 5.0,
    date: '2026-05-12',
    comment: 'Excellent service from Devin Bajwa. She was professional, knowledgeable, and made the entire car-buying process smooth and hassle-free. We truly appreciate her dedication and support throughout the process. Highly recommended!',
    initial: 'A',
    bgColor: 'bg-sky-600',
  },
  {
    id: 4,
    name: 'Adeeb Raheja',
    rating: 5.0,
    date: '2026-05-12',
    comment: 'Bought my car from Rishabh Pabbi at Gedi Route Cars and had an amazing experience. Super helpful, knowledgeable, and easy to deal with. Highly recommend Rishabh at Gedi Route Cars. Very transparent throughout the process and got me approved quickly with a great deal.',
    initial: 'A',
    bgColor: 'bg-sky-600',
  },
];

export default function GoogleReviewsWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Floating Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex flex-col cursor-pointer items-center justify-center rounded-full bg-white p-4 shadow-xl border border-gray-100 transition-transform duration-200 hover:scale-105"
        >
          {/* Top Right External Icon */}
          <ExternalLink className="absolute top-2.5 right-2.5 h-4 w-4 text-gray-500" />

          {/* Google G Logo */}
          <svg className="h-8 w-8 mb-1" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>

          {/* Rating */}
          <span className="text-3xl font-bold text-gray-800 leading-tight">4.8</span>

          {/* Stars */}
          <div className="flex gap-0.5 my-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
            ))}
          </div>

          {/* Subtext */}
          <span className="text-xs font-semibold text-blue-600">View 1447</span>
          <span className="text-xs font-semibold text-blue-600">Reviews</span>
        </button>
      </div>

      {/* Reviews Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          {/* Modal Container */}
          <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-2xl">
            <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-gray-600 p-1 text-white items-end right-3 top-3 absolute  hover:bg-gray-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 pb-4 mt-6">
                
              <div>
                <h2 className="text-2xl text-gray-900">Gedi Route Cars Inc.</h2>
              </div>
              <div className="flex flex-col items-center gap-1">
                
                <button className="rounded-full bg-primary-greenLight px-12 py-2 text-base text-white shadow-xs hover:bg-blue-600">
                  Write Review
                </button>
                <span className="text-[13px] text-gray-700">Powered By ZOP</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Modal Content - Reviews List */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="relative rounded-lg bg-gray-100 p-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl font-medium text-white ${review.bgColor}`}
                      >
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-amber-400 stroke-amber-400" />
                            ))}
                          </div>
                          <span className="text-base text-gray-500">{review.rating.toFixed(1)}/5</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 rounded-md p-2">{review.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="mt-3 text-lg text-gray-600 max-w-[870px] leading-relaxed">{review.comment}</p>

                  {/* Google Icon Badge */}
                  <svg className="absolute bottom-8 right-6 h-9 w-9" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
              ))}

              {/* Load More Button */}
              <div className="flex justify-center pt-2">
                <button className="rounded-full bg-slate-600 px-4 py-1.5 text-lg text-white hover:bg-slate-700 transition">
                  More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}