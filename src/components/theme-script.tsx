const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=document.documentElement;var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;if(r==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}d.style.colorScheme=r;}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
