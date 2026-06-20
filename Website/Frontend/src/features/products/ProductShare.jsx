
import React, { useState } from 'react';
import { IconBrandWhatsapp, IconBrandFacebook, IconLink, IconCheck } from '@tabler/icons-react';

const ProductShare = ({ productName }) => {
    
    const [copied, setCopied] = useState(false);

    const shareUrl = window.location.href;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        
        <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                Share with friends
            </p>
            <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a 
                    href={`https://api.whatsapp.com/send?text=Check out this delicious ${productName} on Rural Cravings! ${shareUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all duration-200 cursor-pointer"
                    title="Share on WhatsApp"
                >
                    <IconBrandWhatsapp size={20} />
                </a>

                {/* Facebook */}
                <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 cursor-pointer"
                    title="Share on Facebook"
                >
                    <IconBrandFacebook size={20} />
                </a>

                {/* Copy Link */}
                <button 
                    onClick={handleCopyLink}
                    className={`p-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-sm font-bold cursor-pointer ${
                        copied 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white'
                    }`}
                >
                    {copied ? <IconCheck size={18} /> : <IconLink size={18} />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductShare;