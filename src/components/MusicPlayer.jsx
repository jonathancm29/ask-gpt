import React from 'react';
import { Music, ExternalLink } from 'lucide-react';

const MusicPlayer = () => {
  const PLAYLIST_ID = "PLT4ldeonoXOMqNu5VtXnGbcLxNuoCIfP2";

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5">
        
        {/* Header Card */}
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg tracking-tight">Nuestra Playlist</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                Sincronizada con YouTube
              </p>
            </div>
          </div>
          
          <a 
            href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
          >
            Abrir en YouTube <ExternalLink size={12} />
          </a>
        </div>

        {/* Embed Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe 
            src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0&modestbranding=1`}
            title="YouTube Playlist Player"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        {/* Footer/Hint */}
        <div className="p-3 bg-black/40 text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            Usa el icono <span className="inline-block border border-white/30 rounded px-1 mx-1">≡</span> en el video para ver la lista
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
