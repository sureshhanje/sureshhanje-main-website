import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-600 text-white text-2xl font-bold flex items-center justify-center shadow-md">
            ಕ
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found / ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ</h2>
          <p className="text-gray-600 mb-6 text-sm">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
