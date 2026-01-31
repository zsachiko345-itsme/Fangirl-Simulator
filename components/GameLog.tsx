import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface Props {
  logs: LogEntry[];
}

const GameLog: React.FC<Props> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white custom-scrollbar pb-32">
      {logs.length === 0 && (
        <div className="text-center text-gray-400 italic mt-10 text-sm">
          你的同人圈生涯开始了... <br/>
          Select an action below.
        </div>
      )}
      {logs.map((log) => (
        <div
          key={log.id}
          className={`
            p-3 text-sm font-serif border-l-4 shadow-sm animate-fadeIn
            ${log.type === 'danger' ? 'bg-red-50 border-red-600 text-red-900' : 
              log.type === 'success' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' :
              log.type === 'event' ? 'bg-blue-50 border-blue-400 text-blue-900' :
              log.type === 'system' ? 'bg-gray-100 border-gray-400 text-gray-500 italic text-center border-l-0 border-b' :
              'bg-white border-[#990000] text-gray-800'}
          `}
        >
          {log.type !== 'system' && (
            <div className="text-[10px] text-gray-400 mb-1 font-sans uppercase tracking-widest">
              {log.time} • {log.type.toUpperCase()}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: log.text }} />
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default GameLog;