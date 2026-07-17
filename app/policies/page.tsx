export default function PoliciesPage() {
  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-disney-navy dark:text-disney-blue dark:text-disney-blue mb-8">Open Source Policies</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue dark:text-disney-blue mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-4">
            The Walt Disney Company is committed to supporting open source software development 
            while ensuring compliance with legal requirements, protecting intellectual property, 
            and maintaining brand integrity. This document outlines our policies for working with 
            open source software.  
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue dark:text-disney-blue mb-4">General Principles</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 dark:text-gray-300">
            <li>All open source usage must comply with applicable licenses</li>
            <li>Open source contributions must align with Disney's values and brand guidelines</li>
            <li>Intellectual property rights must be respected and protected</li>
            <li>All open source activities must be reviewed and approved through proper channels</li>
            <li>Security and quality standards must be maintained for all open source projects</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">License Compliance</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All open source software used in Disney projects must be properly licensed and 
            compliant with applicable license terms. Teams must:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Review and understand license obligations before using open source software</li>
            <li>Maintain accurate records of all open source dependencies</li>
            <li>Ensure license compatibility with project requirements</li>
            <li>Comply with attribution and notice requirements</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Brand Guidelines</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All open source projects and contributions must adhere to Disney's brand guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use of Disney trademarks and logos requires approval</li>
            <li>Content must align with Disney's values and brand voice</li>
            <li>Projects must not conflict with Disney's brand positioning</li>
            <li>All public-facing content must be reviewed for brand compliance</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Security Requirements</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Security is paramount when working with open source software:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Regular security audits of open source dependencies</li>
            <li>Prompt patching of known vulnerabilities</li>
            <li>Secure coding practices in all contributions</li>
            <li>Compliance with Disney's security policies and standards</li>
          </ul>
        </section>

        <section className="mb-12 bg-disney-light dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Questions?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions about open source policies, please contact the Open Source Program Office.
          </p>
        </section>
      </div>
    </div>
    </div>
  )
}

