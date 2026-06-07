export function getLocalizedPath(locale: string, href: string) {
  return `/${locale}${href === '/' ? '' : href}`;
}

export function isActiveNavLink(pathname: string, locale: string, href: string) {
  const base = `/${locale}`;
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (href === '/') {
    return normalizedPath === base;
  }

  const linkPath = `${base}${href}`;
  return normalizedPath === linkPath || normalizedPath.startsWith(`${linkPath}/`);
}

export function footerLinkClass(isActive: boolean) {
  return isActive
    ? 'text-primary-600 dark:text-primary-400 font-semibold underline decoration-primary-500 decoration-2 underline-offset-4'
    : 'text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline hover:decoration-primary-400/60 hover:underline-offset-4 transition-colors';
}

export function navLinkClass(isActive: boolean) {
  return isActive
    ? 'text-primary-600 dark:text-primary-400 font-semibold after:w-full'
    : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 after:w-0 hover:after:w-full';
}
