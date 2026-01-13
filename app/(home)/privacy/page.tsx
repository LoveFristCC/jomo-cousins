import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Dr. Jomo Cousins - How we collect, use, and protect your personal information.",
  robots: {
    index: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#3d3d3d] mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Dr. Jomo Cousins ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at www.jomocousins.com (the "Site") and use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our Site, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Make a purchase (name, email address, billing address, shipping address, phone number)</li>
              <li>Subscribe to our newsletter (email address, name)</li>
              <li>Submit a prayer request (name, email address, prayer request content)</li>
              <li>Submit a booking request for speaking engagements (name, email, phone, organization details, event information)</li>
              <li>Contact us through our contact forms (name, email, message content)</li>
              <li>Create an account or interact with our services</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Payment Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment information (credit card numbers, billing information) is processed securely through our third-party payment processor, Stripe. We do not store complete payment card information on our servers. Please review Stripe's Privacy Policy at{ ' ' }
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e31e24] hover:underline">
                stripe.com/privacy
              </a>.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our Site, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Referring URLs and pages visited</li>
              <li>Time and date of visits</li>
              <li>Clickstream data and usage patterns</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our Site and store certain information. Cookies are small data files stored on your device. We use:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the Site to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site through Google Analytics</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>To process your orders:</strong> Fulfill purchases, process payments, arrange shipping, and send order confirmations</li>
              <li><strong>To communicate with you:</strong> Send newsletters, prayer resources, booking confirmations, and respond to inquiries</li>
              <li><strong>To provide prayer ministry:</strong> Respond to prayer requests and provide spiritual guidance</li>
              <li><strong>To improve our services:</strong> Analyze usage patterns, enhance user experience, and develop new features</li>
              <li><strong>To send marketing communications:</strong> Promote products, services, events, and special offers (you can opt-out at any time)</li>
              <li><strong>To ensure security:</strong> Monitor and prevent fraud, unauthorized access, and other illegal activities</li>
              <li><strong>To comply with legal obligations:</strong> Respond to legal requests and prevent harm</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">4. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We share your information with third-party service providers who assist us in operating our Site and providing services:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">Payment Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Stripe:</strong> Processes all payment transactions securely. View their privacy policy at{ ' ' }
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e31e24] hover:underline">
                    stripe.com/privacy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">Analytics</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors use our Site. Google Analytics collects information such as how often users visit the Site, what pages they visit, and what other sites they used prior to coming to our Site. Google uses this data to provide us with reports about traffic and Site usage. You can opt-out of Google Analytics by installing the{ ' ' }
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#e31e24] hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>. View Google's privacy policy at{ ' ' }
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e31e24] hover:underline">
                    policies.google.com/privacy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">Order Fulfillment</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>ShipStation:</strong> Processes and ships physical product orders. They receive shipping addresses and order details.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">Content Management</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Sanity.io:</strong> Hosts our content management system. Some user data may be stored in Sanity for content personalization.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">Email Communications</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Email Service Provider:</strong> We use email services to send newsletters, order confirmations, and other communications.
                </p>
              </div>

            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure payment processing through PCI-compliant providers</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">GDPR Rights (EU Residents)</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Right to Object:</strong> Object to certain types of processing</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">CCPA Rights (California Residents)</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Right to Know:</strong> Request information about data collection and use</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Receive equal service regardless of privacy rights exercise</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise any of these rights, please contact us at{ ' ' }
              <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">
                support@pastorjomo.com
              </a>. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">7. Email Communications and Opt-Out</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may opt-out of receiving promotional emails from us at any time by:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Clicking the "unsubscribe" link at the bottom of any promotional email</li>
              <li>Contacting us at{ ' ' }
                <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">
                  support@pastorjomo.com
                </a>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Please note that even if you opt-out of promotional emails, we may still send you transactional emails related to your orders, account, or services you've requested.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Order Information:</strong> Retained for 7 years for tax and legal compliance</li>
              <li><strong>Newsletter Subscriptions:</strong> Retained until you unsubscribe</li>
              <li><strong>Prayer Requests:</strong> Retained for ministry purposes unless deletion is requested</li>
              <li><strong>Account Information:</strong> Retained until account closure is requested</li>
              <li><strong>Analytics Data:</strong> Retained according to Google Analytics retention settings (typically 26 months)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children under 13 without parental consent, we will take steps to remove that information from our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside the United States and choose to provide information to us, please note that we transfer the data to the United States and process it there. By using our Site, you consent to this transfer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Dr. Jomo Cousins Ministries</strong></p>
              <p className="text-gray-700 mb-2">Email: <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">support@pastorjomo.com</a></p>
              <p className="text-gray-700 mb-2">Phone: <a href="tel:+18136712009" className="text-[#e31e24] hover:underline">(813) 671-2009</a></p>
              <p className="text-gray-700">Website: <a href="https://www.jomocousins.com" className="text-[#e31e24] hover:underline">www.jomocousins.com</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">13. Cookie Policy Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Cookie Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Essential Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Site functionality, shopping cart, authentication</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Google Analytics</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Understand user behavior, improve Site performance</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Preference Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Remember user preferences and settings</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 italic">
            This Privacy Policy was last updated on { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }. By continuing to use our Site after changes are posted, you accept the updated Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
