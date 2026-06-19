
import { IconArrowLeft } from '@tabler/icons-react';

const ErrorComponent = ({ message, onBack }) => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-4 text-sm font-bold">
            {message}
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:underline">
            <IconArrowLeft size={16} /> Go Back
        </button>
    </div>
);

export default ErrorComponent;