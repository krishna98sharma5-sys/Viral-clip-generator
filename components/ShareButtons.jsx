'use client';

export default function ShareButtons({ videoUrl, title }) {
  const shareUrl = videoUrl || typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = title || 'Check out this viral clip!';

  const handleShare = (platform) => {
    let url = '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex gap-4 justify-center my-6 flex-wrap">
      <button
        onClick={() => handleShare('twitter')}
        className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        🐦 Twitter
      </button>

      <button
        onClick={() => handleShare('facebook')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        f Facebook
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        💬 WhatsApp
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        in LinkedIn
      </button>
    </div>
  );
}
