import Script from 'next/script';

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=document.documentElement;var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;if(r==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}d.style.colorScheme=r;}catch(e){}})();`;

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
