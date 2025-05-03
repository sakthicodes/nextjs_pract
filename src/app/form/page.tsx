'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface FormData {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export default function Form() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [editing, setEditing] = useState(false);
  const [entries, setEntries] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/form');
      if (res.data.success) setEntries(res.data.data);
    } catch (err) {
      console.error('Error fetching entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing && form._id) {
        await axios.put('/api/form', { id: form._id, updates: form });
      } else {
        await axios.post('/api/form', form);
      }
      setForm(initialForm);
      setEditing(false);
      fetchEntries();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Submission failed.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/api/form', { data: { id } });
      fetchEntries();
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleEdit = (entry: FormData) => {
    setForm(entry);
    setEditing(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {editing ? 'Edit Entry' : 'Submit New Entry'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Company"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            {editing ? 'Update Entry' : 'Submit Entry'}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">All Submissions</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {loading
    ? Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 border border-gray-200 rounded-xl bg-gray-100 animate-pulse shadow-sm"
        >
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          
        </div>
      ))
    : entries.map(entry => (
            <div
              key={entry._id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow hover:shadow-lg transition"
            >
              <div className="mb-3 space-y-2">
                <h4 className="text-lg font-semibold text-gray-900">{entry.name}</h4>
                <p className="text-sm text-gray-600 flex gap-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
{entry.email}</p>
                {entry.phone && (
                  <p className="text-sm text-gray-600 flex gap-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                 {entry.phone}</p>
                )}
                {entry.company && (
                  <p className="text-sm text-gray-600">{entry.company}</p>
                )}
              </div>
              <p className="text-gray-700 mb-4">{entry.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(entry)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <PencilSquareIcon className="w-5 h-5 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry._id!)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="w-5 h-5 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
