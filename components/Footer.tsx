import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-disney-navy dark:bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Disney Open Source Program Office</h3>
            <p className="text-gray-300 text-sm">
              Supporting open source initiatives at The Walt Disney Company.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies" className="text-gray-300 hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <p className="text-gray-300 text-sm">
              All content is subject to The Walt Disney Company's policies and brand guidelines.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Walt Disney Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

