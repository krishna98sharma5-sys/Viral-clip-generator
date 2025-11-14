'use client';

export default function ShareButtons({ videoUrl, title }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
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
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareButtons = [
    { platform: 'twitter', emoji: '𝕏', name: 'Twitter', color: 'bg-black hover:bg-gray-800' },
    { platform: 'facebook', emoji: 'f', name: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
    { platform: 'whatsapp', emoji: '💬', name: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600' },
    { platform: 'linkedin', emoji: 'in', name: 'LinkedIn', color: 'bg-blue-700 hover:bg-blue-800' },
    { platform: 'telegram', emoji: '✈️', name: 'Telegram', color: 'bg-blue-400 hover:bg-blue-500' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {shareButtons.map(({ platform, emoji, name, color }) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className={`${color} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 shadow-md flex items-center gap-2`}
          >
            <span className="text-xl">{emoji}</span>
            <span className="hidden sm:inline">{name}</span>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-700 text-sm">
          💡 <strong>Tip:</strong> Click any button above to share this page with your viral clip on social media!
        </p>
      </div>
    </div>
  );
}
