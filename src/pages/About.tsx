import { useEffect, useState } from 'react';
import { Award, Briefcase, GraduationCap, Loader2 } from 'lucide-react';
import { supabase, type About as AboutType } from '../lib/supabase';

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  async function fetchAbout() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      setAbout(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load about info');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-600 text-lg">About information not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            Get to know more about my background and expertise
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">My Story</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {about.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {about.experience || 'Experience information will be added soon.'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {about.education || 'Education information will be added soon.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {about.skills.length > 0 ? (
              about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-white text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Skills will be added soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
