export default function DistributionPage() {
  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-disney-navy dark:text-disney-blue mb-8">Distributing Open Source Software</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Distributing open source software requires careful attention to license compliance, 
            proper attribution, and adherence to legal requirements. This guide covers the 
            essential steps for distributing open source software at Disney.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">License Compliance</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When distributing software that includes open source components, you must:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Include all required license notices and copyright statements</li>
            <li>Provide source code when required by copyleft licenses (e.g., GPL)</li>
            <li>Maintain accurate attribution for all open source components</li>
            <li>Ensure license compatibility across all included components</li>
            <li>Include a NOTICE file or similar documentation listing all dependencies</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Attribution Requirements</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Most open source licenses require attribution. Common practices include:
          </p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">NOTICE File</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Create a NOTICE or LICENSE file that includes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
              <li>List of all open source components used</li>
              <li>Full license text for each component</li>
              <li>Copyright notices as required by licenses</li>
              <li>Links to original source code repositories</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">In-Code Attribution</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Include license headers in source files when required, and maintain clear 
              separation between your code and open source components.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Source Code Distribution</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Some licenses (particularly copyleft licenses like GPL) require distribution of 
            source code when distributing binaries:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Provide source code in the same distribution package, or</li>
            <li>Offer source code via a written offer that remains valid for at least three years</li>
            <li>Ensure source code is in the preferred form for making modifications</li>
            <li>Include build instructions and necessary build tools</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Distribution Channels</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">Internal Distribution</h3>
              <p className="text-gray-700 dark:text-gray-300">
                For internal tools and applications, ensure license compliance is maintained 
                even for internal-only distribution.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">External Distribution</h3>
              <p className="text-gray-700 dark:text-gray-300">
                For customer-facing or publicly distributed software, additional considerations apply:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Complete license compliance documentation</li>
                <li>Brand guideline compliance review</li>
                <li>Legal review for public distribution</li>
                <li>Security and quality assurance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Automate license compliance checking in your build process</li>
            <li>Maintain an up-to-date inventory of all dependencies</li>
            <li>Regularly audit distributions for compliance</li>
            <li>Document your distribution process and requirements</li>
            <li>Train team members on license compliance requirements</li>
          </ul>
        </section>

        <section className="mb-12 bg-disney-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Need Help?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions about distributing open source software or license compliance, 
            contact the Open Source Program Office for guidance.
          </p>
        </section>
      </div>
      </div>
    </div>
  )
}

