'use client';

import React, { useState } from 'react';

const TestApiPage = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(`query {
  featuredProducts {
    id
    name
    slug
    price
  }
}`);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://37a855e9-cbad-47b1-aaee-e725b592ee4b-00-25qsdfa2j9uuc.spock.replit.dev/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.errors) {
        setError(data.errors[0]?.message || 'Unknown GraphQL error');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error testing API:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">تست مستقیم API GraphQL</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">کوئری GraphQL:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded font-mono text-sm h-40"
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'در حال ارسال...' : 'ارسال کوئری'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>خطا:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">نتیجه:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestApiPage;