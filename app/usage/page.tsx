export default function UsagePage() {
  return (
    <div className="bg-gradient-to-b from-disney-light dark:from-gray-900 to-white dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-disney-navy dark:text-disney-blue dark:text-disney-blue mb-8">Using Open Source Software</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Getting Started</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Using open source software in your projects can accelerate development and leverage 
            community innovation. This guide outlines best practices for incorporating open source 
            into Disney projects.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Before Using Open Source</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>License Review:</strong> Review the license of any open source software you 
              plan to use. Ensure it's compatible with your project's requirements and Disney's policies.
            </li>
            <li>
              <strong>Security Assessment:</strong> Evaluate the security posture of the open source 
              project, including recent vulnerability reports and maintenance activity.
            </li>
            <li>
              <strong>Quality Check:</strong> Assess code quality, documentation, and community support.
            </li>
            <li>
              <strong>Approval Process:</strong> Obtain necessary approvals through your team's 
              standard process for introducing new dependencies.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Best Practices</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">Dependency Management</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Pin dependency versions to ensure reproducible builds</li>
                <li>Regularly update dependencies to receive security patches</li>
                <li>Maintain an inventory of all open source dependencies</li>
                <li>Use dependency scanning tools to identify vulnerabilities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">License Compliance</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Include proper license notices and attributions</li>
                <li>Understand copyleft vs. permissive license implications</li>
                <li>Document license compatibility in your project</li>
                <li>Comply with all license requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-disney-navy dark:text-disney-blue mb-2">Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Monitor for security advisories related to your dependencies</li>
                <li>Implement automated security scanning in CI/CD pipelines</li>
                <li>Keep dependencies up to date with security patches</li>
                <li>Report security issues responsibly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Common License Types</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">Permissive Licenses</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Examples: MIT, Apache 2.0, BSD</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Generally allow use with minimal restrictions. Usually require attribution and 
                inclusion of license text.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-disney-navy dark:text-disney-blue mb-2">Copyleft Licenses</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Examples: GPL, AGPL, LGPL</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Require derivative works to be released under the same license. Requires careful 
                consideration for proprietary projects.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-disney-light dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-disney-navy dark:text-disney-blue mb-4">Resources</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>License compatibility matrix and guidelines</li>
            <li>Approved open source software list</li>
            <li>Dependency scanning tools and processes</li>
            <li>Contact information for the Open Source Program Office</li>
          </ul>
        </section>
      </div>
      </div>
    </div>
  )
}

