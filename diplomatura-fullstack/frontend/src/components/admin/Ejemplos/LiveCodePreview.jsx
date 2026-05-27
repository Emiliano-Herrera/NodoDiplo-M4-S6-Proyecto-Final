import { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

export function LiveCodePreview({ html, css, javascript }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const generateFullHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding: 1.5rem;
            min-height: 100vh;
            background: #0a0a0a;
            color: #ffffff;
          }
          
          h1, h2, h3, h4, h5, h6, p, span, div, li, a, button, label {
            color: #ffffff;
          }
          
          h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
          h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; }
          h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
          p { line-height: 1.5; margin-bottom: 0.75rem; }
          
          a { color: #60a5fa; text-decoration: none; }
          a:hover { text-decoration: underline; }
          
          code, pre {
            background: #1e1e1e;
            padding: 0.2rem 0.4rem;
            border-radius: 0.375rem;
            font-family: 'Courier New', monospace;
            color: #e5e5e5;
          }
          pre { padding: 1rem; overflow-x: auto; }
          
          button { cursor: pointer; }
          
          ${css || ''}
        </style>
      </head>
      <body>
        ${html || ''}
        <script>
          ${javascript || ''}
        </script>
      </body>
      </html>
    `;
  };

  const handleCopyCode = () => {
    const codeToCopy = html || '';
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card">
      <div className="flex justify-between items-center border-b border-border/50 bg-muted/10 px-2">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-2 text-sm transition-colors ${
              activeTab === 'preview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Vista Previa
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2 text-sm transition-colors ${
              activeTab === 'code'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Código
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            title="Copiar código"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            title="Actualizar vista previa"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="h-[350px]">
        {activeTab === 'preview' ? (
          <iframe
            key={iframeKey}
            srcDoc={generateFullHtml()}
            title="Live Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          />
        ) : (
          <div className="h-full overflow-auto p-4 bg-muted/20">
            <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">
              <code>{html || '// No hay código HTML para mostrar'}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}