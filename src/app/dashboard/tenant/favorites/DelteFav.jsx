import { HeartCrack } from 'lucide-react';
import React from 'react';

const DelteFav = () => {
    return (
        <div>
            <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      <HeartCrack size={18} />
                      Dislike
                    </button>
        </div>
    );
};

export default DelteFav;