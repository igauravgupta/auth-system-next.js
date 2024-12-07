export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Our Project!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is basic project for learning purpose, using Next.js, Tailwind,
          MongoDB, and JWT.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
          >
            SignUp
          </a>
          <a
            href="/login"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
