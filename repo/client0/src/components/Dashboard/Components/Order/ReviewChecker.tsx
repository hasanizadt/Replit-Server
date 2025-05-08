
'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { CREATE_REVIEW } from '@/lib/urql/mutations/review';

export default function ReviewChecker({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const [{ fetching }, createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({
        input: {
          productId,
          rating,
          comment
        }
      });
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">ثبت نظر</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">امتیاز شما</label>
          <div className="flex items-center space-x-2 space-x-reverse">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`text-2xl ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">نظر شما</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 h-32"
            placeholder="نظر خود را بنویسید..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={fetching}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          {fetching ? 'در حال ارسال...' : 'ثبت نظر'}
        </button>
      </form>
    </div>
  );
}
